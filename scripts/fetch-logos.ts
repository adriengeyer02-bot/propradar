/**
 * Logo fetcher (raw download step).
 *
 * For every listed, non-closed firm with an official domain, collects the
 * icons the firm itself publishes, best first:
 *   1. SVG icons declared in <link rel="icon">
 *   2. icons from the web app manifest (usually 192/512 px)
 *   3. apple-touch-icon (180 px) and other sized <link rel="icon"> PNGs
 *   4. the logo image shown in the site header (<img> with "logo" in it)
 *   5. Google's high-resolution favicon service as a last resort
 *
 * Writes raw candidates to logo-raw/<slug>__<n>.<ext> plus logo-raw/index.json.
 * Nothing is published from here: candidates are reviewed and normalised
 * (scripts/normalize-logos.py) before anything lands in public/logos.
 *
 * Usage: npx tsx scripts/fetch-logos.ts [--only slug1,slug2]
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { propFirms } from '../app/lib/propFirms';

type Candidate = { url: string; kind: 'svg' | 'manifest' | 'touch' | 'icon' | 'logo-img' | 'gstatic'; declared: number };
type Saved = { file: string; url: string; kind: Candidate['kind']; declared: number; bytes: number; contentType: string };

const OUT = 'logo-raw';
const TIMEOUT_MS = 15000;
const CONCURRENCY = 8;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36';

async function get(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { redirect: 'follow', signal: controller.signal, headers: { 'user-agent': UA, accept: '*/*' } });
  } finally {
    clearTimeout(timer);
  }
}

function attr(tag: string, name: string) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match ? (match[2] ?? match[3] ?? match[4] ?? '') : '';
}

function largestSize(sizes: string) {
  return sizes
    .split(/\s+/)
    .map((size) => Number(size.toLowerCase().split('x')[0]))
    .filter((value) => Number.isFinite(value))
    .reduce((max, value) => Math.max(max, value), 0);
}

async function candidatesFor(domain: string): Promise<{ candidates: Candidate[]; finalUrl?: string; error?: string }> {
  const candidates: Candidate[] = [];
  let finalUrl: string | undefined;
  let error: string | undefined;

  try {
    const response = await get(`https://${domain}/`);
    finalUrl = response.url;
    const html = (await response.text()).slice(0, 400_000);
    const base = response.url || `https://${domain}/`;

    for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
      const rel = attr(tag, 'rel').toLowerCase();
      const href = attr(tag, 'href');
      if (!href || href.startsWith('data:')) continue;
      let url: string;
      try {
        url = new URL(href, base).toString();
      } catch {
        continue;
      }

      if (rel.includes('manifest')) {
        try {
          const manifestResponse = await get(url);
          const manifest = (await manifestResponse.json()) as { icons?: { src: string; sizes?: string; type?: string; purpose?: string }[] };
          for (const icon of manifest.icons ?? []) {
            if (icon.purpose && icon.purpose.includes('monochrome')) continue;
            candidates.push({ url: new URL(icon.src, manifestResponse.url || url).toString(), kind: 'manifest', declared: largestSize(icon.sizes ?? '') });
          }
        } catch {
          /* manifest unreadable: ignore */
        }
        continue;
      }

      if (!rel.includes('icon')) continue;
      const type = attr(tag, 'type').toLowerCase();
      if (type.includes('svg') || /\.svg(\?|$)/i.test(url)) {
        candidates.push({ url, kind: 'svg', declared: 1000 });
      } else if (rel.includes('apple-touch')) {
        candidates.push({ url, kind: 'touch', declared: largestSize(attr(tag, 'sizes')) || 180 });
      } else {
        candidates.push({ url, kind: 'icon', declared: largestSize(attr(tag, 'sizes')) });
      }
    }

    // Header logo images, used only when the site publishes no usable icon.
    for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
      const src = attr(tag, 'src');
      if (!src || src.startsWith('data:') || !/logo/i.test(`${src} ${attr(tag, 'alt')} ${attr(tag, 'class')}`)) continue;
      try {
        candidates.push({ url: new URL(src, base).toString(), kind: 'logo-img', declared: -1 });
      } catch {
        /* ignore */
      }
      if (candidates.filter((candidate) => candidate.kind === 'logo-img').length >= 2) break;
    }
  } catch (caught) {
    error = caught instanceof Error ? caught.message : String(caught);
  }

  candidates.push({ url: `https://${domain}/apple-touch-icon.png`, kind: 'touch', declared: 180 });
  candidates.push({
    url: `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=256`,
    kind: 'gstatic',
    declared: 0,
  });

  const seen = new Set<string>();
  const unique = candidates.filter((candidate) => (seen.has(candidate.url) ? false : (seen.add(candidate.url), true)));
  const rank = (candidate: Candidate) => (candidate.kind === 'svg' ? 10_000 : 0) + candidate.declared - (candidate.kind === 'gstatic' ? 5_000 : 0);
  const ranked = unique.sort((a, b) => rank(b) - rank(a));
  const logos = ranked.filter((candidate) => candidate.kind === 'logo-img');
  return { candidates: [...ranked.filter((candidate) => candidate.kind !== 'logo-img').slice(0, 5), ...logos], finalUrl, error };
}

async function processFirm(slug: string, domain: string) {
  const { candidates, finalUrl, error } = await candidatesFor(domain);
  const saved: Saved[] = [];

  for (const candidate of candidates) {
    try {
      const response = await get(candidate.url);
      const contentType = (response.headers.get('content-type') ?? '').toLowerCase();
      if (!response.ok || !(contentType.startsWith('image/') || /\.svg(\?|$)/i.test(candidate.url))) continue;
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 300) continue;
      const ext = contentType.includes('svg') || candidate.kind === 'svg' ? 'svg'
        : contentType.includes('png') ? 'png'
        : contentType.includes('webp') ? 'webp'
        : contentType.includes('jpeg') || contentType.includes('jpg') ? 'jpg'
        : contentType.includes('icon') || contentType.includes('ico') ? 'ico'
        : 'bin';
      const file = `${slug}__${saved.length}.${ext}`;
      writeFileSync(`${OUT}/${file}`, buffer);
      saved.push({ file, url: candidate.url, kind: candidate.kind, declared: candidate.declared, bytes: buffer.length, contentType });
    } catch {
      /* candidate unreachable: try the next one */
    }
  }

  return { slug, domain, finalUrl, error, saved };
}

async function main() {
  const onlyArg = process.argv.find((arg) => arg.startsWith('--only'));
  const only = onlyArg ? new Set((onlyArg.split('=')[1] ?? process.argv[process.argv.indexOf(onlyArg) + 1] ?? '').split(',')) : null;
  const targets = propFirms.filter((firm) => firm.logoDomain && firm.status !== 'Fermée' && !firm.listedDomainWarning && (!only || only.has(firm.slug)));

  mkdirSync(OUT, { recursive: true });
  const results: Awaited<ReturnType<typeof processFirm>>[] = [];
  let cursor = 0;

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < targets.length) {
        const firm = targets[cursor++];
        const result = await processFirm(firm.slug, firm.logoDomain as string);
        results.push(result);
        console.log(`${firm.slug}: ${result.saved.length} candidate(s)${result.error ? ` (page error: ${result.error.slice(0, 80)})` : ''}`);
      }
    }),
  );

  results.sort((a, b) => a.slug.localeCompare(b.slug));
  writeFileSync(`${OUT}/index.json`, JSON.stringify({ fetchedAt: new Date().toISOString(), results }, null, 2));
  console.log(`\n${results.filter((result) => result.saved.length).length}/${results.length} firms with at least one candidate`);
}

main();
