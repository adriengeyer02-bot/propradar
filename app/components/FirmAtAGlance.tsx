import type { Locale } from '../lib/locales';
import { getScaleC, SCALE_C_CONTRACT_CODES, isFullyRead, type ScaleCCode } from '../lib/scaleC';
import { scaleCCopy } from '../lib/scaleCI18n';
import firmMarkets from '../data/firm-markets.json';

/**
 * PROPOSAL (2026-11-26, not merged): short "at a glance" card under the firm
 * header, replacing the dense key-facts grid. Four lines a reader can take in
 * at once: what you can trade, four numbers, the worst sourced contract point,
 * and how much of the contract PropRadar read. Markets are shown only when
 * they were read on a source; generic watchlist defaults are never shown.
 * en + fr written; other locales fall back to English until validated.
 */
type Copy = {
  title: string;
  markets: string;
  marketsUnread: string;
  watch: string;
  others: string;
  other1: string;
  cfdPending: string;
  source: string;
  readFull: string;
  readExcerpts: string;
  readNone: string;
  reviewed: string;
  assets: Record<AssetKey, string>;
};

type AssetKey = 'forex' | 'indices' | 'commodities' | 'stocks' | 'crypto' | 'futures' | 'options';

const COPY: Record<string, Copy> = {
  en: {
    title: 'At a glance',
    markets: 'What you can trade',
    marketsUnread: 'Markets not read on an official source yet',
    watch: 'Main point to watch:',
    others: '+{n} more',
    other1: '+1 more',
    cfdPending: '+ CFDs (markets not listed yet)',
    source: 'source',
    readFull: 'Terms read in full by PropRadar',
    readExcerpts: 'Terms read in excerpts only',
    readNone: 'Terms not read yet: score capped at 60',
    reviewed: 'checked {date}',
    assets: { forex: 'Forex', indices: 'Indices', commodities: 'Commodities', stocks: 'Stocks', crypto: 'Crypto', futures: 'Futures', options: 'Options' },
  },
  fr: {
    title: 'En bref',
    markets: 'Ce qu’on peut y trader',
    marketsUnread: 'Marchés pas encore lus sur une source officielle',
    watch: 'Principal point d’attention :',
    others: '+{n} autres',
    other1: '+1 autre',
    cfdPending: '+ CFD (détail des marchés pas encore relevé)',
    source: 'source',
    readFull: 'Conditions lues en entier par PropRadar',
    readExcerpts: 'Conditions lues par extraits seulement',
    readNone: 'Conditions pas encore lues : note plafonnée à 60',
    reviewed: 'vérifié le {date}',
    assets: { forex: 'Forex', indices: 'Indices', commodities: 'Matières premières', stocks: 'Actions', crypto: 'Crypto', futures: 'Futures', options: 'Options' },
  },
};

const ORDER: AssetKey[] = ['forex', 'indices', 'commodities', 'stocks', 'crypto', 'futures', 'options'];

function assetKey(raw: string): AssetKey | null {
  const s = raw.toLowerCase();
  if (/forex|fx|currenc/.test(s)) return 'forex';
  if (/futur/.test(s)) return 'futures';
  if (/option/.test(s)) return 'options';
  if (/indic|index/.test(s)) return 'indices';
  if (/metal|commod|energ|oil|gold|silver/.test(s)) return 'commodities';
  if (/stock|equit|share|action/.test(s)) return 'stocks';
  if (/crypto|bitcoin/.test(s)) return 'crypto';
  return null;
}

type ProductLike = { platforms?: string[]; tradableAssets?: string[]; description?: string };

/** Asset classes read on a source, or null when only generic defaults exist. */
export function readMarkets(products: ProductLike[]): AssetKey[] | null {
  const read = products.filter(
    (p) =>
      p.tradableAssets?.length &&
      !p.tradableAssets.some((a) => /to verify/i.test(a)) &&
      !(p.platforms ?? []).some((a) => /to verify/i.test(a)) &&
      !/not yet audited/i.test(p.description ?? ''),
  );
  if (!read.length) return null;
  const keys = new Set<AssetKey>();
  for (const p of read) for (const a of p.tradableAssets ?? []) {
    const k = assetKey(a);
    if (k) keys.add(k);
  }
  return keys.size ? ORDER.filter((k) => keys.has(k)) : null;
}

const RED: ScaleCCode[] = [...SCALE_C_CONTRACT_CODES, 'E_HARSH', 'CONS'];

export default function FirmAtAGlance({
  slug,
  locale,
  products,
  facts,
}: {
  slug: string;
  locale: Locale;
  products: ProductLike[];
  facts: { label: string; value: string }[];
}) {
  const copy = COPY[locale] ?? COPY.en;
  const cc = scaleCCopy(locale);
  const sourced = (firmMarkets as Record<string, { markets?: string[]; detail?: string; source?: string; locator?: string }>)[slug];
  const markets = sourced?.markets?.length ? ORDER.filter((k) => sourced.markets!.includes(k)) : readMarkets(products);
  const cfdOnly = !sourced && products.some((p) => (p.tradableAssets ?? []).some((a) => /^cfds?$/i.test(a.trim())));
  const entry = getScaleC(slug);
  const flags = (entry?.penalties ?? []).filter((p) => RED.includes(p.code)).sort((a, b) => b.points - a.points);
  const top = flags[0];
  const reading = entry ? (isFullyRead(slug) ? 'full' : 'excerpts') : 'none';
  const readingText = reading === 'full' ? copy.readFull : reading === 'excerpts' ? copy.readExcerpts : copy.readNone;

  return (
    <section className="pr-glance" aria-labelledby={`glance-${slug}`}>
      <h2 id={`glance-${slug}`} className="pr-glance-title">{copy.title}</h2>

      <div className="pr-glance-row">
        <span className="pr-glance-label">{copy.markets}</span>
        {markets ? (
          <ul className="pr-glance-chips">
            {markets.map((m) => <li key={m} className={`pr-glance-chip pr-glance-${m}`}>{copy.assets[m]}</li>)}
          </ul>
        ) : null}
        {markets && sourced?.source ? (
          <a className="pr-glance-muted" href={sourced.source} target="_blank" rel="noreferrer" title={sourced.detail}>{copy.source}</a>
        ) : markets && cfdOnly ? (
          <span className="pr-glance-muted">{copy.cfdPending}</span>
        ) : null}
        {markets ? null : (
          <span className="pr-glance-muted">{copy.marketsUnread}</span>
        )}
      </div>

      <dl className="pr-glance-facts">
        {facts.map((x) => (
          <div key={x.label}><dt>{x.label}</dt><dd>{x.value}</dd></div>
        ))}
      </dl>

      {top ? (
        <p className="pr-glance-watch">
          <span className="pr-glance-icon" aria-hidden="true">!</span>
          <span><strong>{copy.watch}</strong> {cc.codes[top.code]} <span className="pr-glance-pts">−{top.points}</span></span>
          <a href="#contract-audit" className="pr-link">{flags.length === 2 ? copy.other1 : flags.length > 2 ? copy.others.replace('{n}', String(flags.length - 1)) : '→'}</a>
        </p>
      ) : null}

      <p className={`pr-glance-reading pr-glance-reading-${reading}`}>
        <span aria-hidden="true">{reading === 'full' ? '✓' : '◐'}</span> {readingText}
        {entry?.checkedOn ? <span className="pr-glance-muted"> · {copy.reviewed.replace('{date}', entry.checkedOn)}</span> : null}
      </p>
    </section>
  );
}
