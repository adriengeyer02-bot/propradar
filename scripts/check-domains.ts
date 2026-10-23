/**
 * Daily official-domain monitor.
 *
 * Fetches every firm's listed official site and classifies what it serves:
 *   ok                  page loads and mentions prop-trading vocabulary
 *   blocked             bot protection (403/429/503 challenge) - inconclusive
 *   redirect-offsite    redirects to a different registrable domain
 *   parked              parked / for-sale domain page
 *   no-trading-content  page loads but has no prop-trading vocabulary
 *   unreachable         DNS/TLS/timeout/5xx
 *
 * Writes app/data/domain-checks.json and prints a Markdown summary of status
 * changes since the previous run (used as the pull-request body).
 *
 * Nothing here changes what visitors see: findings are reviewed by the weekly
 * research agent or a human before a firm-updates.json entry is written.
 *
 * Usage: npx tsx scripts/check-domains.ts [--only slug1,slug2]
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { propFirms } from '../app/lib/propFirms';

type CheckStatus = 'ok' | 'blocked' | 'redirect-offsite' | 'parked' | 'no-trading-content' | 'unreachable';

type CheckResult = {
  url: string;
  status: CheckStatus;
  httpStatus?: number;
  finalUrl?: string;
  title?: string;
  detail?: string;
  checkedAt: string;
  /** First date the current status was observed (kept across runs). */
  since: string;
};

type ChecksFile = {
  checkedAt: string;
  results: Record<string, CheckResult>;
};

const OUTPUT = 'app/data/domain-checks.json';
const TIMEOUT_MS = 15000;
const CONCURRENCY = 8;
const UA = 'Mozilla/5.0 (compatible; PropRadarDomainMonitor/1.0; +https://www.propradar.tech/audit)';

const PARKED_PATTERNS = [
  /this domain (is|may be) for sale/i,
  /buy this domain/i,
  /domain (is )?parked/i,
  /afternic/i,
  /sedo(parking)?\.com/i,
  /hugedomains/i,
  /dan\.com/i,
  /godaddy.*(auction|for sale)/i,
  /parkingcrew|bodis\.com/i,
];

const TRADING_PATTERNS = [
  /prop(rietary)?[\s-]?(firm|trading|trader)/i,
  /funded (trader|account)/i,
  /\bchallenge\b/i,
  /\bevaluation\b/i,
  /\bdrawdown\b/i,
  /profit (split|target|share)/i,
  /\bpayouts?\b/i,
];

function registrableDomain(host: string) {
  const parts = host.replace(/^www\./, '').split('.');
  // Good enough for the TLDs used by prop firms (.com, .io, .co.uk...).
  const twoLevelTld = /^(co|com|org|net)\.[a-z]{2}$/.test(parts.slice(-2).join('.'));
  return parts.slice(twoLevelTld ? -3 : -2).join('.');
}

function listedWebsite(firm: (typeof propFirms)[number]) {
  const source = firm.sources[0];
  if (!source) return undefined;
  if (!/^(official|listed)/i.test(source.label)) return undefined;
  return source.url;
}

async function checkUrl(url: string): Promise<Omit<CheckResult, 'checkedAt' | 'since'>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml' },
    });
    const finalUrl = response.url || url;
    const html = (await response.text()).slice(0, 400_000);
    const title = html.match(/<title[^>]*>([^<]{0,160})/i)?.[1]?.trim();
    const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
    const base = { url, httpStatus: response.status, finalUrl, title };

    if ([403, 429, 503].includes(response.status) || /just a moment|attention required|cf-chl/i.test(html.slice(0, 20_000))) {
      return { ...base, status: 'blocked', detail: 'Bot protection or rate limit: inconclusive.' };
    }
    if (response.status >= 500) return { ...base, status: 'unreachable', detail: `HTTP ${response.status}` };

    const listedDomain = registrableDomain(new URL(url).hostname);
    const finalDomain = registrableDomain(new URL(finalUrl).hostname);
    if (finalDomain !== listedDomain) {
      return { ...base, status: 'redirect-offsite', detail: `Redirects to ${finalDomain}` };
    }
    if (PARKED_PATTERNS.some((pattern) => pattern.test(text))) {
      return { ...base, status: 'parked', detail: 'Parked or for-sale page markers found.' };
    }
    const tradingHits = TRADING_PATTERNS.filter((pattern) => pattern.test(text)).length;
    if (tradingHits < 2) {
      return { ...base, status: 'no-trading-content', detail: `${tradingHits} prop-trading marker(s) found.` };
    }
    return { ...base, status: 'ok' };
  } catch (error) {
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    return { url, status: 'unreachable', detail: message.slice(0, 200) };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const onlyArg = process.argv.indexOf('--only');
  const only = onlyArg > -1 ? new Set(process.argv[onlyArg + 1].split(',')) : undefined;
  const today = new Date().toISOString().slice(0, 10);
  const previous: ChecksFile = existsSync(OUTPUT)
    ? JSON.parse(readFileSync(OUTPUT, 'utf8'))
    : { checkedAt: '', results: {} };

  const targets = propFirms
    .filter((firm) => firm.status !== 'Fermée')
    .filter((firm) => !only || only.has(firm.slug))
    .map((firm) => ({ slug: firm.slug, name: firm.name, url: listedWebsite(firm) }))
    .filter((target): target is { slug: string; name: string; url: string } => Boolean(target.url));

  const results: Record<string, CheckResult> = { ...previous.results };
  const queue = [...targets];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    for (let target = queue.shift(); target; target = queue.shift()) {
      const outcome = await checkUrl(target.url);
      const before = previous.results[target.slug];
      results[target.slug] = {
        ...outcome,
        checkedAt: today,
        since: before && before.status === outcome.status ? before.since : today,
      };
    }
  });
  await Promise.all(workers);

  const sorted = Object.fromEntries(Object.entries(results).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(OUTPUT, `${JSON.stringify({ checkedAt: today, results: sorted }, null, 2)}\n`);

  const changes = targets
    .map((target) => ({ ...target, before: previous.results[target.slug]?.status, after: results[target.slug].status }))
    .filter((change) => change.before !== change.after && change.after !== 'blocked' && !(change.before === undefined && change.after === 'ok'));

  const counts = Object.values(results).reduce<Record<string, number>>((acc, result) => {
    acc[result.status] = (acc[result.status] ?? 0) + 1;
    return acc;
  }, {});

  const lines = [
    `Domain check ${today}: ${targets.length} official sites checked.`,
    '',
    `Totals: ${Object.entries(counts).map(([status, count]) => `${status} ${count}`).join(' · ')}`,
    '',
  ];
  if (changes.length) {
    lines.push('| Firm | Before | Now | Detail |', '|---|---|---|---|');
    for (const change of changes) {
      const result = results[change.slug];
      lines.push(`| ${change.name} (\`${change.slug}\`) | ${change.before ?? 'new'} | **${change.after}** | ${result.detail ?? result.title ?? ''} |`);
    }
    lines.push('', 'These are automated signals only. Confirm manually before changing any public profile.');
  } else {
    lines.push('No status change since the previous run.');
  }
  console.log(lines.join('\n'));
  if (process.env.GITHUB_OUTPUT) {
    writeFileSync(process.env.GITHUB_OUTPUT, `changes=${changes.length}\n`, { flag: 'a' });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
