'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import FirmLogo from '../components/FirmLogo';
import RiskPip from '../components/ui/RiskPip';
import FirmRow, { FirmTableHead, type FirmSort, type FirmSortKey } from '../components/ui/FirmRow';
import ScoreRing from '../components/ui/ScoreRing';
import type { PropFirm } from '../lib/propFirms';
import { activeFirms, isProvisional, propFirms, riskyFirms, hasPayoutRiskSignal } from '../lib/propFirms';
import { entityCountries, jurisdictionByCode } from '../lib/jurisdictions';
import { findFirmSearchMatch, normalizeFirmSearch } from '../lib/firmSearch';
import { toEnglishText } from '../lib/i18n';
import { latestReviewDate, legalTone, payoutTone, reviewTone, scoreTone, statusTone, type Tone } from '../lib/riskTone';
import { SITE_URL } from '../lib/site';

type StatusFilter = 'Tous' | 'Active' | 'À surveiller' | 'Fermée';
type MarketFilter = 'Tous' | 'Forex' | 'Futures' | 'Actions' | 'Crypto';
type ScoreFilter = 'Tous' | '70' | '80' | '90';
type PriceFilter = 'Tous' | '50' | '100' | '200';
type DrawdownFilter = 'Tous' | 'EOD' | 'Trailing' | 'Static' | 'Hybride';
type LegalFilter = 'Tous' | 'verified' | 'watch' | 'deep';

const statusFilters: StatusFilter[] = ['Tous', 'Active', 'À surveiller', 'Fermée'];
const PAGE_SIZE = 20;
const DATA_UPDATED_AT = latestReviewDate(propFirms);

// Countries where at least one tracked firm has a mapped entity, most firms first.
const FIRM_COUNTRIES = new Map(propFirms.map((firm) => [firm.slug, entityCountries(firm.regulatoryAudit.entities).map((c) => c.code)]));
const COUNTRY_OPTIONS = (() => {
  const counts = new Map<string, number>();
  FIRM_COUNTRIES.forEach((codes) => codes.forEach((code) => counts.set(code, (counts.get(code) ?? 0) + 1)));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([code, n]) => ({ code, n, name: jurisdictionByCode(code)?.name ?? code }));
})();

const QUICK_SEARCHES = [
  { label: 'Futures', query: 'futures' },
  { label: 'No consistency rule', query: 'no consistency rule' },
  { label: 'News allowed', query: 'news allowed' },
  { label: 'Instant funding', query: 'instant funding' },
  { label: 'MT5', query: 'mt5' },
  { label: 'Legal watch', query: 'legal watch' },
] as const;

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function legalSourceCount(firm: PropFirm) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: PropFirm) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

function legalRiskWeight(firm: PropFirm) {
  const risk = firm.regulatoryAudit.riskLevel;
  const riskScore =
    risk === 'Critical' ? 100 :
    risk === 'High' ? 85 :
    risk === 'To audit' ? 72 :
    risk === 'Medium to high' ? 62 :
    risk === 'Medium' ? 48 :
    24;

  return riskScore + (firm.legalVerified ? 0 : 18) + (legalSourceCount(firm) < 2 ? 10 : 0);
}

const TONE_ORDER: Record<Tone, number> = { good: 0, watch: 1, risk: 2, none: 3 };

/**
 * Value used to sort a column. Unknown values ("To verify", "Not assessed",
 * "Not checked") always sort last, whatever the direction.
 */
function sortValue(firm: PropFirm, key: FirmSortKey): number | null {
  switch (key) {
    case 'score': return firm.score;
    case 'price': return firm.priceFrom > 0 ? firm.priceFrom : firm.noEntryFee ? 0 : null;
    case 'split': return isProvisional(firm, 'profitSplit') || !(firm.profitSplit > 0) ? null : firm.profitSplit;
    case 'payout': { const tone = payoutTone(firm.reviewSignals.payoutRisk); return tone === 'none' ? null : TONE_ORDER[tone]; }
    case 'legal': { const tone = legalTone(firm.regulatoryAudit.riskLevel); return tone === 'none' ? null : TONE_ORDER[tone]; }
    case 'trustpilot': {
      if (firm.reviewSignals.trustpilotRatingWithheld) return -1;
      return firm.trustpilotRating ? firm.trustpilotRating : null;
    }
  }
}

/** First click direction: best first (high score, low price, low risk...). */
const SORT_LABEL: Record<FirmSortKey, string> = { score: 'score', price: 'entry price', split: 'profit split', payout: 'payout risk', legal: 'legal risk', trustpilot: 'Trustpilot rating' };

const DEFAULT_DIR: Record<FirmSortKey, 'asc' | 'desc'> = { score: 'desc', price: 'asc', split: 'desc', payout: 'asc', legal: 'asc', trustpilot: 'desc' };

function FirmSearchContext({ firm, query }: { firm: PropFirm; query: string }) {
  const match = findFirmSearchMatch(firm, query);
  if (!match) return null;

  return (
    <div className="firm-search-match">
      <span>Matched by {match.label}</span>
      <strong>{match.display}</strong>
    </div>
  );
}

export default function Comparateur() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('Tous');
  const [market, setMarket] = useState<MarketFilter>('Tous');
  const [scoreMin, setScoreMin] = useState<ScoreFilter>('Tous');
  const [priceMax, setPriceMax] = useState<PriceFilter>('Tous');
  const [drawdown, setDrawdown] = useState<DrawdownFilter>('Tous');
  const [legalFilter, setLegalFilter] = useState<LegalFilter>('Tous');
  const [country, setCountry] = useState<string>('Tous');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLElement>(null);
  const [toolbarHidden, setToolbarHidden] = useState(false);
  const [sort, setSort] = useState<FirmSort | null>(null);
  const [moreFilters, setMoreFilters] = useState(false);

  function toggleSort(key: FirmSortKey) {
    setSort((current) => {
      if (!current || current.key !== key) return { key, dir: DEFAULT_DIR[key] };
      if (current.dir === DEFAULT_DIR[key]) return { key, dir: current.dir === 'asc' ? 'desc' : 'asc' };
      return null;
    });
  }

  const filteredFirms = useMemo(() => {
    const normalizedSearch = normalizeFirmSearch(search);

    return propFirms
      .map((firm) => ({
        firm,
        searchMatch: normalizedSearch ? findFirmSearchMatch(firm, normalizedSearch) : null,
      }))
      .filter(({ firm, searchMatch }) => {
        const matchesSearch = !normalizedSearch || Boolean(searchMatch);
        const matchesStatus = status === 'Tous' || firm.status === status;
        const matchesMarket = market === 'Tous' || firm.styles.some((style) => style.toLowerCase().includes(market.toLowerCase()));
        const matchesScore = scoreMin === 'Tous' || firm.score >= Number(scoreMin);
        const matchesPrice = priceMax === 'Tous' || (firm.priceFrom > 0 && firm.priceFrom <= Number(priceMax));
        const matchesDrawdown = drawdown === 'Tous' || (firm.drawdownType === drawdown && !isProvisional(firm, 'drawdownType'));
        const matchesLegal =
          legalFilter === 'Tous' ||
          (legalFilter === 'verified' && firm.legalVerified && !isLegalWatchFirm(firm)) ||
          (legalFilter === 'watch' && isLegalWatchFirm(firm)) ||
          (legalFilter === 'deep' && legalSourceCount(firm) >= 5);
        const firmCodes = FIRM_COUNTRIES.get(firm.slug) ?? [];
        const matchesCountry = country === 'Tous' || (country === 'none' ? firmCodes.length === 0 : firmCodes.includes(country));
        return matchesSearch && matchesStatus && matchesMarket && matchesScore && matchesPrice && matchesDrawdown && matchesLegal && matchesCountry;
      })
      .sort((a, b) => {
        if (sort) {
          const va = sortValue(a.firm, sort.key);
          const vb = sortValue(b.firm, sort.key);
          if (va === null && vb !== null) return 1;
          if (vb === null && va !== null) return -1;
          if (va !== null && vb !== null && va !== vb) return sort.dir === 'asc' ? va - vb : vb - va;
          return b.firm.score - a.firm.score;
        }
        if (normalizedSearch) {
          const relevanceDifference = (b.searchMatch?.score ?? 0) - (a.searchMatch?.score ?? 0);
          if (relevanceDifference) return relevanceDifference;
        }
        return b.firm.score - a.firm.score;
      })
      .map(({ firm }) => firm);
  }, [country, drawdown, legalFilter, market, priceMax, scoreMin, search, sort, status]);

  // Deep link from the legal map: /comparateur?country=LC
  useEffect(() => {
    try {
      const code = new URLSearchParams(window.location.search).get('country');
      if (code && (code === 'none' || COUNTRY_OPTIONS.some((option) => option.code === code))) {
        setCountry(code);
        setMoreFilters(true);
      }
    } catch {
      /* no query string support: keep the default filter */
    }
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [country, drawdown, legalFilter, market, priceMax, scoreMin, search, status]);

  // Mobile filter sheet: Escape closes it, the page behind does not scroll, focus moves in and back.
  useEffect(() => {
    if (!filtersOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    filtersRef.current?.querySelector<HTMLElement>('button, select')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFiltersOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      filtersButtonRef.current?.focus();
    };
  }, [filtersOpen]);

  // Shows the floating Filters button once the toolbar has scrolled out of view.
  useEffect(() => {
    const node = toolbarRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setToolbarHidden(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visibleFirms = filteredFirms.slice(0, visibleCount);
  const visibleEnd = Math.min(visibleCount, filteredFirms.length);
  const remaining = filteredFirms.length - visibleEnd;
  const comparatorSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'PropRadar Prop Firm Comparator',
      description: 'Independent prop firm comparison using rules, payout risk, legal evidence and public review signals.',
      url: `${SITE_URL}/prop-firm-comparison`,
      dateModified: DATA_UPDATED_AT,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: propFirms.length,
        itemListElement: propFirms.map((firm, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: `${firm.name} prop firm program`,
            description: toEnglishText(firm.verdict),
            url: `${SITE_URL}/firm/${firm.slug}`,
            category: `${firm.styles.map((style) => toEnglishText(style)).join(', ')} prop firm`,
            brand: {
              '@type': 'Brand',
              name: firm.name,
            },
          },
        })),
      },
    }),
    []
  );

  const averageScore = Math.round(filteredFirms.reduce((sum, firm) => sum + firm.score, 0) / Math.max(filteredFirms.length, 1));
  const moreFilterCount = [scoreMin !== 'Tous', market !== 'Tous', legalFilter !== 'Tous', country !== 'Tous'].filter(Boolean).length;
  const filterOnlyCount = [status !== 'Tous', market !== 'Tous', scoreMin !== 'Tous', priceMax !== 'Tous', drawdown !== 'Tous', legalFilter !== 'Tous', country !== 'Tous'].filter(Boolean).length;
  const activeFilterCount = [normalizeFirmSearch(search), status !== 'Tous', market !== 'Tous', scoreMin !== 'Tous', priceMax !== 'Tous', drawdown !== 'Tous', legalFilter !== 'Tous', country !== 'Tous'].filter(Boolean).length;
  const payoutAlerts = useMemo(
    () => [...propFirms].filter((firm) => hasPayoutRiskSignal(firm)).sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore).slice(0, 3),
    []
  );
  const reviewWatch = useMemo(
    () =>
      [...propFirms]
        .filter((firm) => firm.status !== 'Fermée' && firm.reviewSignals.trustpilotRatingWithheld)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    []
  );
  const strongSignals = useMemo(
    () =>
      [...propFirms]
        .filter((firm) => firm.status === 'Active' && firm.reviewSignals.trustpilotReliability === 'Forte' && firm.reviewSignals.payoutRisk === 'Faible' && firm.legalVerified)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    []
  );
  const legalWatch = useMemo(
    () =>
      [...propFirms]
        .filter(isLegalWatchFirm)
        .sort((a, b) => legalRiskWeight(b) - legalRiskWeight(a))
        .slice(0, 3),
    []
  );

  function resetFilters() {
    setSearch('');
    setStatus('Tous');
    setMarket('Tous');
    setScoreMin('Tous');
    setPriceMax('Tous');
    setDrawdown('Tous');
    setLegalFilter('Tous');
    setCountry('Tous');
  }


  const isSearching = Boolean(normalizeFirmSearch(search));

  return (
    <main className="container comparator-page pr-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(comparatorSchema)} />

      <header className="pr-page-head">
        <div className="eyebrow">Independent radar</div>
        <h1>Prop firm comparison</h1>
        <p className="pr-lead">
          Every prop firm we track, ranked by reliability. The score weighs rules, payouts, legal structure and public signals. No firm can buy its position.
        </p>
        <dl className="pr-head-stats">
          <div><dt>Firms tracked</dt><dd>{propFirms.length}</dd></div>
          <div><dt>Active</dt><dd>{activeFirms.length}</dd></div>
          <div><dt>Watchlist</dt><dd>{riskyFirms.length}</dd></div>
          <div><dt>Latest review</dt><dd><time dateTime={DATA_UPDATED_AT}>{DATA_UPDATED_AT}</time></dd></div>
        </dl>
      </header>

      <section ref={toolbarRef} className={`pr-toolbar${filtersOpen ? ' has-sheet' : ''}`} id="tableau" aria-label="Search and filters">
        <div className="pr-search-row">
        <div className="pr-search">
          <label className="sr-only" htmlFor="comparator-search">Search prop firms, entities, programs or rules</label>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m13.5 13.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <input
            id="comparator-search"
            type="search"
            placeholder="Search a firm, entity, platform or rule…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            autoComplete="off"
          />
          {search ? (
            <button type="button" onClick={() => setSearch('')} aria-label="Clear search" title="Clear search">
              <span aria-hidden="true">&#215;</span>
            </button>
          ) : null}
        </div>
          <button
            ref={filtersButtonRef}
            type="button"
            className={`pr-filters-toggle${filterOnlyCount ? ' has-filters' : ''}`}
            onClick={() => setFiltersOpen(true)}
            aria-expanded={filtersOpen}
            aria-controls="comparator-filters"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18"><path d="M3 5h14M6 10h8M8.5 15h3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            Filters{filterOnlyCount ? <b>{filterOnlyCount}</b> : null}
          </button>
        </div>

        <div className="pr-quick" aria-label="Quick searches">
          {QUICK_SEARCHES.map((item) => {
            const active = normalizeFirmSearch(search) === normalizeFirmSearch(item.query);
            return (
              <button key={item.query} type="button" className={active ? 'is-active' : ''} onClick={() => setSearch(active ? '' : item.query)} aria-pressed={active}>
                {item.label}
              </button>
            );
          })}
        </div>

        {filtersOpen ? <div className="pr-sheet-backdrop" onClick={() => setFiltersOpen(false)} aria-hidden="true" /> : null}
        <div
          className={`pr-filters${filtersOpen ? ' is-open' : ''}`}
          id="comparator-filters"
          ref={filtersRef}
          role={filtersOpen ? 'dialog' : undefined}
          aria-modal={filtersOpen ? true : undefined}
          aria-label={filtersOpen ? 'Filters' : undefined}
        >
          <div className="pr-sheet-head">
            <strong>Filters</strong>
            <button type="button" className="pr-sheet-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters">×</button>
          </div>
          <div className="pr-segmented" aria-label="Filter by status">
            {statusFilters.map((item) => (
              <button key={item} type="button" className={status === item ? 'is-active' : ''} onClick={() => setStatus(item)} aria-pressed={status === item}>
                {item === 'Tous' ? 'All' : toEnglishText(item)}
              </button>
            ))}
          </div>

          <select value={priceMax} onChange={(event) => setPriceMax(event.target.value as PriceFilter)} aria-label="Maximum price">
            <option value="Tous">Any price</option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
            <option value="200">Up to $200</option>
          </select>
          <select value={drawdown} onChange={(event) => setDrawdown(event.target.value as DrawdownFilter)} aria-label="Drawdown type">
            <option value="Tous">Any drawdown</option>
            <option value="EOD">EOD</option>
            <option value="Trailing">Trailing</option>
            <option value="Static">Static</option>
            <option value="Hybride">Hybrid</option>
          </select>
          <button
            type="button"
            className={`pr-more-toggle${moreFilters ? ' is-open' : ''}`}
            onClick={() => setMoreFilters((open) => !open)}
            aria-expanded={moreFilters}
            aria-controls="comparator-more-filters"
          >
            {moreFilters ? 'Fewer filters' : 'More filters'}
            {!moreFilters && moreFilterCount ? <b>{moreFilterCount}</b> : null}
          </button>
          <div className={`pr-filters-more${moreFilters ? ' is-shown' : ''}`} id="comparator-more-filters">
            <select value={scoreMin} onChange={(event) => setScoreMin(event.target.value as ScoreFilter)} aria-label="Minimum score">
              <option value="Tous">Any score</option>
              <option value="70">Score 70+</option>
              <option value="80">Score 80+</option>
              <option value="90">Score 90+</option>
            </select>
            <select value={market} onChange={(event) => setMarket(event.target.value as MarketFilter)} aria-label="Market">
              <option value="Tous">All markets</option>
              <option>Forex</option>
              <option>Futures</option>
              <option value="Actions">Stocks</option>
              <option>Crypto</option>
            </select>
            <select value={legalFilter} onChange={(event) => setLegalFilter(event.target.value as LegalFilter)} aria-label="Legal evidence">
              <option value="Tous">Any legal file</option>
              <option value="verified">Entity mapped</option>
              <option value="watch">Legal watch</option>
              <option value="deep">5+ sources</option>
            </select>
            <select value={country} onChange={(event) => setCountry(event.target.value)} aria-label="Entity country">
              <option value="Tous">Any country</option>
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name} ({option.n})
                </option>
              ))}
              <option value="none">Country not identified</option>
            </select>
          </div>
          <div className="pr-sheet-foot">
            <button type="button" className="btn" onClick={resetFilters} disabled={!activeFilterCount}>Reset</button>
            <button type="button" className="btn btn-primary" onClick={() => setFiltersOpen(false)}>
              Show {filteredFirms.length} firm{filteredFirms.length === 1 ? '' : 's'}
            </button>
          </div>
        </div>
      </section>

      {toolbarHidden && !filtersOpen ? (
        <button type="button" className="pr-filters-fab" onClick={() => setFiltersOpen(true)}>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16"><path d="M3 5h14M6 10h8M8.5 15h3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Filters{filterOnlyCount ? <b>{filterOnlyCount}</b> : null} · {filteredFirms.length} firms
        </button>
      ) : null}

      <div className="pr-results-meta" aria-live="polite">
        <p>
          <strong>{filteredFirms.length} firms</strong>
          {filteredFirms.length > visibleEnd ? <span> · showing {visibleEnd}</span> : null}
          {sort ? <span> · sorted by {SORT_LABEL[sort.key]}{sort.key === 'score' ? '' : ', unknown values last'}</span> : isSearching ? <span> · ranked by relevance</span> : <span> · average score {averageScore}</span>}
        </p>
        <div className="pr-results-actions">
          {activeFilterCount > 0 ? <button type="button" className="pr-link-button" onClick={resetFilters}>Reset {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}</button> : null}
          <Link href="/tools#comparatif" className="pr-link">Compare 2–3 side by side <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      {filteredFirms.length === 0 ? (
        <div className="pr-empty">
          <strong>No prop firm matches these filters.</strong>
          <span>Check the spelling, or broaden status, price, score, market and legal filters.</span>
          <button type="button" className="btn" onClick={resetFilters}>Reset filters</button>
        </div>
      ) : (
        <div className="pr-firm-table" role="table" aria-label="Prop firms ranked by PropRadar score" onPointerMove={followPointer}>
          <FirmTableHead sort={sort} onSort={toggleSort} />
          {visibleFirms.map((firm, index) => (
            <FirmRow key={firm.slug} firm={firm} rank={index + 1}>
              {isSearching ? <FirmSearchContext firm={firm} query={search} /> : null}
            </FirmRow>
          ))}
        </div>
      )}

      {remaining > 0 ? (
        <div className="pr-load-more">
          <button type="button" className="btn" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            Show {Math.min(PAGE_SIZE, remaining)} more
          </button>
          <span>{remaining} more firm{remaining === 1 ? '' : 's'} match these filters</span>
        </div>
      ) : null}

      <section className="pr-signal-band" aria-label="Priority signals">
        <h2>Signals to check first</h2>
        <div className="pr-signal-grid">
          <SignalList title="Payout incidents" href="/prop-firm-payout-risk" firms={payoutAlerts} value={(firm) => toEnglishText(firm.reviewSignals.payoutRisk)} tone={(firm) => payoutTone(firm.reviewSignals.payoutRisk)} />
          <SignalList title="Legal watch" href="/audit" anchor="#regulatory" firms={legalWatch} value={(firm) => firm.regulatoryAudit.riskLevel} tone={(firm) => legalTone(firm.regulatoryAudit.riskLevel)} />
          <SignalList title="Trustpilot rating withheld" href="/trustpilot-prop-firms" firms={reviewWatch} value={() => 'Withheld'} tone={() => 'risk'} />
          <SignalList title="Cleanest profiles" href="/best-prop-firms" firms={strongSignals} value={(firm) => `${firm.score}/100`} tone={(firm) => scoreTone(firm.score)} />
        </div>
      </section>

      <details className="pr-method">
        <summary>How to read this comparator</summary>
        <ul>
          <li><span className="pr-pip-dot pr-tone-good" aria-hidden="true" /> Green, amber and red always mean the same thing: low, medium and high risk.</li>
          <li><strong>Score</strong> weighs rules, payout reliability, legal structure, public reviews and proof level.</li>
          <li><strong>Payout</strong> reflects withdrawal incidents, denials, thresholds and closures.</li>
          <li><strong>Legal</strong> reflects entity mapping, regulator status and the depth of saved sources.</li>
          <li><strong>Trustpilot</strong> is the public rating as Trustpilot shows it, or &quot;Withheld&quot; when Trustpilot removed it after a guideline breach.</li>
          <li><strong>Affiliate</strong> marks firms that may pay PropRadar a commission. It never moves the score.</li>
        </ul>
        <Link href="/audit" className="pr-link">Full methodology and sources <span aria-hidden="true">→</span></Link>
      </details>
    </main>
  );
}

function SignalList({
  title,
  href,
  anchor = '',
  firms,
  value,
  tone,
}: {
  title: string;
  href: string;
  anchor?: string;
  firms: PropFirm[];
  value: (firm: PropFirm) => string;
  tone: (firm: PropFirm) => Tone;
}) {
  return (
    <article className="pr-signal-list">
      <h3><Link href={href}>{title}</Link></h3>
      <ul>
        {firms.map((firm) => (
          <li key={firm.slug}>
            <Link href={`/firm/${firm.slug}${anchor}`}>
              <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
              <span>{firm.name}</span>
            </Link>
            <span className={`pr-tag pr-tone-${tone(firm)}`}>{value(firm)}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Feeds the row spotlight (CSS) with the pointer position inside the hovered row. */
function followPointer(event: React.PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== 'mouse') return;
  const row = (event.target as Element).closest<HTMLElement>('.pr-firm-row');
  if (!row) return;
  const rect = row.getBoundingClientRect();
  row.style.setProperty('--pr-mx', `${event.clientX - rect.left}px`);
  row.style.setProperty('--pr-my', `${event.clientY - rect.top}px`);
}
