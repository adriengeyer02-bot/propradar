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
/** Logo images read on the official site (via a branding scan) that the generic scan misses. */
// Extra candidates: the firm's own logo files, or its logo on its claimed Trustpilot profile.
const EXTRA_LOGOS: Record<string, string[]> = {
  'algo-forex-funds': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/660cb2ed4f9d2754577ca618/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/660cb2ed4f9d2754577ca618-198x149-2x.jpg'],
  'blueberry-funded': ['https://blueberryfunded.com/wp-content/uploads/2025/07/BBF-Favicon-1.png', 'https://s3-eu-west-1.amazonaws.com/tpd/logos/66a2c96e4bade719bbb261cb/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/66a2c96e4bade719bbb261cb-198x149-2x.jpg'],
  'fast-track-trading': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/66527b21598c1c220e38f60b/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/66527b21598c1c220e38f60b-198x149-2x.jpg'],
  'fidelcrest': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/5f523d06c358dd00014b8f46/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/5f523d06c358dd00014b8f46-198x149-2x.jpg'],
  'fundedlions': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/65a901e73582cedc26275320/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/65a901e73582cedc26275320-198x149-2x.jpg'],
  'funder-trading': ['https://fundertrading.com/wp-content/uploads/2022/09/funder-trading_logo_hq-20.png', 'https://s3-eu-west-1.amazonaws.com/tpd/logos/64e7a2299f297316de58cfa0/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/64e7a2299f297316de58cfa0-198x149-2x.jpg'],
  'fundings4u': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/6666533cc8e0a3255da1a914/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/6666533cc8e0a3255da1a914-198x149-2x.jpg'],
  'funds-for-traders': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/65438a5a2f3c7574eedc49b8/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/65438a5a2f3c7574eedc49b8-198x149-2x.jpg'],
  'fxci': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/64b7b1d39abc8aaa57e634a9/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/64b7b1d39abc8aaa57e634a9-198x149-2x.jpg'],
  'fxrk': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/66e9ebe6c3677f772318361d/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/66e9ebe6c3677f772318361d-198x149-2x.jpg'],
  'getcryptofunded': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/67757a5ba908ff6c9daa337c/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/67757a5ba908ff6c9daa337c-198x149-2x.jpg'],
  'glow-node': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/628419c98b0c428e7f3889ce/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/628419c98b0c428e7f3889ce-198x149-2x.jpg'],
  'klein-funding-crypto': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/651d07eaf72c1f4c5c23d4f2/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/651d07eaf72c1f4c5c23d4f2-198x149-2x.jpg'],
  'leveled-up-society': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/6272b38871558c5428edcdee/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/6272b38871558c5428edcdee-198x149-2x.jpg'],
  'mifunder': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/65473fcf92f5c6062d175af2/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/65473fcf92f5c6062d175af2-198x149-2x.jpg'],
  'moneta-funded': ['https://www.monetafunded.com/wp-content/themes/Moneta/images/logo.svg'],
  'myfxcapital': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/5fa934b249970d0001a88ab0/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/5fa934b249970d0001a88ab0-198x149-2x.jpg'],
  'next-step-funded': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/63cfa85ee84db43150abf02e/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/63cfa85ee84db43150abf02e-198x149-2x.jpg'],
  'one-of-one-funding': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/650da9b526a7a9a2fadd2509/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/650da9b526a7a9a2fadd2509-198x149-2x.jpg'],
  'optimal-traders': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/623743bf88982b0e57974c89/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/623743bf88982b0e57974c89-198x149-2x.jpg'],
  'purdia-capital': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/63bbf8c692fe59d1ce884da8/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/63bbf8c692fe59d1ce884da8-198x149-2x.jpg'],
  'rocket21-challenge': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/62e309294a216fae180f1fd3/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/62e309294a216fae180f1fd3-198x149-2x.jpg'],
  'sure-leverage': ['https://sureleveragefunding.com/sureLeverageFunded-Favicon.png', 'https://s3-eu-west-1.amazonaws.com/tpd/logos/66d25135f3f7fe4eab39524f/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/66d25135f3f7fe4eab39524f-198x149-2x.jpg'],
  'the-forex-funder': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/627c810e86d791adf5986fba/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/627c810e86d791adf5986fba-198x149-2x.jpg'],
  'tribe-funded': ['https://s3-eu-west-1.amazonaws.com/tpd/logos/68c1c1909508ecdefef16492/0x0.png', 'https://consumersiteimages.trustpilot.net/business-units/68c1c1909508ecdefef16492-198x149-2x.jpg'],
};
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

async function scan(domain: string): Promise<{ candidates: Candidate[]; finalUrl?: string; error?: string }> {
  const candidates: Candidate[] = [];
  let finalUrl: string | undefined;
  let error: string | undefined;

  try {
    const response = await get(`https://${domain}/`);
    finalUrl = response.url;
    const html = (await response.text()).slice(0, 400_000);
    if (process.env.SAVE_PAGES) writeFileSync(`${OUT}/${domain}__page.html`, html);
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

  return { candidates, finalUrl, error };
}

async function candidatesWithExtras(slug: string, domain: string) {
  const { candidates, finalUrl, error } = await scan(domain);
  for (const url of EXTRA_LOGOS[slug] ?? []) candidates.push({ url, kind: 'logo-img', declared: -1 });
  return rankCandidates(domain, candidates, finalUrl, error);
}

function rankCandidates(domain: string, candidates: Candidate[], finalUrl?: string, error?: string) {
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
  const { candidates, finalUrl, error } = await candidatesWithExtras(slug, domain);
  const saved: Saved[] = [];

  for (const candidate of candidates) {
    try {
      const response = await get(candidate.url);
      const contentType = (response.headers.get('content-type') ?? '').toLowerCase();
      if (candidate.kind === 'logo-img') console.log(`  ${slug} ${response.status} ${contentType} ${candidate.url}`);
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
  const onlyEnv = process.env.ONLY ? new Set(process.env.ONLY.split(',')) : null;
  const only = onlyArg ? new Set((onlyArg.split('=')[1] ?? process.argv[process.argv.indexOf(onlyArg) + 1] ?? '').split(',')) : onlyEnv;
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
