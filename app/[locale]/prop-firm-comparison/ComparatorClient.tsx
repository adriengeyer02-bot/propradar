'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import FirmLogo from '../../components/FirmLogo';
import RiskPip from '../../components/ui/RiskPip';
import FirmRow, { FirmTableHead, type FirmSort, type FirmSortKey } from '../../components/ui/FirmRow';
import ScoreRing from '../../components/ui/ScoreRing';
import type { PropFirm } from '../../lib/propFirms';
import { activeFirms, isProvisional, propFirms, riskyFirms, hasPayoutRiskSignal } from '../../lib/propFirms';
import { entityCountries, jurisdictionByCode } from '../../lib/jurisdictions';
import { findFirmSearchMatch, normalizeFirmSearch } from '../../lib/firmSearch';
import { toEnglishText } from '../../lib/i18n';
import { latestReviewDate, legalTone, payoutTone, reviewTone, scoreTone, statusTone, type Tone } from '../../lib/riskTone';
import { SITE_URL } from '../../lib/site';
import { localePath, type Locale } from '../../lib/locales';
import type { Messages } from '../../lib/messages/en';

export type ComparatorUi = Pick<Messages, 'compare' | 'table' | 'values' | 'styles'>;

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

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

// Queries stay in English: they search the English firm files. Labels come from the messages.
const QUICK_QUERIES = ['futures', 'no consistency rule', 'news allowed', 'instant funding', 'mt5', 'legal watch'] as const;

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
const DEFAULT_DIR: Record<FirmSortKey, 'asc' | 'desc'> = { score: 'desc', price: 'asc', split: 'desc', payout: 'asc', legal: 'asc', trustpilot: 'desc' };

function FirmSearchContext({ firm, query, label }: { firm: PropFirm; query: string; label: string }) {
  const match = findFirmSearchMatch(firm, query);
  if (!match) return null;

  return (
    <div className="firm-search-match">
      <span>{label} {match.label}</span>
      <strong>{match.display}</strong>
    </div>
  );
}

export default function ComparatorClient({ locale, ui }: { locale: Locale; ui: ComparatorUi }) {
  const c = ui.compare;
  const v = (value: string) => (ui.values as Record<string, string>)[value] ?? value;
  const L = (path: string) => localePath(locale, path);
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
      url: `${SITE_URL}${L('/prop-firm-comparison')}`,
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
            url: `${SITE_URL}${L(`/firm/${firm.slug}`)}`,
            category: `${firm.styles.map((style) => toEnglishText(style)).join(', ')} prop firm`,
            brand: {
              '@type': 'Brand',
              name: firm.name,
            },
          },
        })),
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="eyebrow">{c.eyebrow}</div>
        <h1>{c.h1}</h1>
        <p className="pr-lead">{c.lead}</p>
        <dl className="pr-head-stats">
          <div><dt>{c.statTracked}</dt><dd>{propFirms.length}</dd></div>
          <div><dt>{c.statActive}</dt><dd>{activeFirms.length}</dd></div>
          <div><dt>{c.statWatchlist}</dt><dd>{riskyFirms.length}</dd></div>
          <div><dt>{c.statLatest}</dt><dd><time dateTime={DATA_UPDATED_AT}>{DATA_UPDATED_AT}</time></dd></div>
        </dl>
      </header>

      <section ref={toolbarRef} className={`pr-toolbar${filtersOpen ? ' has-sheet' : ''}`} id="tableau" aria-label={c.toolbarAria}>
        <div className="pr-search-row">
        <div className="pr-search">
          <label className="sr-only" htmlFor="comparator-search">{c.searchLabel}</label>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m13.5 13.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <input
            id="comparator-search"
            type="search"
            placeholder={c.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            autoComplete="off"
          />
          {search ? (
            <button type="button" onClick={() => setSearch('')} aria-label={c.clearSearch} title={c.clearSearch}>
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
            {c.filters}{filterOnlyCount ? <b>{filterOnlyCount}</b> : null}
          </button>
        </div>

        <div className="pr-quick" aria-label={c.quickAria}>
          {QUICK_QUERIES.map((query, index) => {
            const active = normalizeFirmSearch(search) === normalizeFirmSearch(query);
            return (
              <button key={query} type="button" className={active ? 'is-active' : ''} onClick={() => setSearch(active ? '' : query)} aria-pressed={active}>
                {c.quick[index]}
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
          aria-label={filtersOpen ? c.filters : undefined}
        >
          <div className="pr-sheet-head">
            <strong>{c.filters}</strong>
            <button type="button" className="pr-sheet-close" onClick={() => setFiltersOpen(false)} aria-label={c.closeFilters}>×</button>
          </div>
          <div className="pr-segmented" aria-label={c.statusAria}>
            {statusFilters.map((item) => (
              <button key={item} type="button" className={status === item ? 'is-active' : ''} onClick={() => setStatus(item)} aria-pressed={status === item}>
                {item === 'Tous' ? c.all : v(toEnglishText(item))}
              </button>
            ))}
          </div>

          <select value={priceMax} onChange={(event) => setPriceMax(event.target.value as PriceFilter)} aria-label={c.priceAria}>
            <option value="Tous">{c.anyPrice}</option>
            <option value="50">{fill(c.upTo, { n: 50 })}</option>
            <option value="100">{fill(c.upTo, { n: 100 })}</option>
            <option value="200">{fill(c.upTo, { n: 200 })}</option>
          </select>
          <select value={drawdown} onChange={(event) => setDrawdown(event.target.value as DrawdownFilter)} aria-label={c.drawdownAria}>
            <option value="Tous">{c.anyDrawdown}</option>
            <option value="EOD">{v('EOD')}</option>
            <option value="Trailing">{v('Trailing')}</option>
            <option value="Static">{v('Static')}</option>
            <option value="Hybride">{v('Hybrid')}</option>
          </select>
          <button
            type="button"
            className={`pr-more-toggle${moreFilters ? ' is-open' : ''}`}
            onClick={() => setMoreFilters((open) => !open)}
            aria-expanded={moreFilters}
            aria-controls="comparator-more-filters"
          >
            {moreFilters ? c.fewerFilters : c.moreFilters}
            {!moreFilters && moreFilterCount ? <b>{moreFilterCount}</b> : null}
          </button>
          <div className={`pr-filters-more${moreFilters ? ' is-shown' : ''}`} id="comparator-more-filters">
            <select value={scoreMin} onChange={(event) => setScoreMin(event.target.value as ScoreFilter)} aria-label={c.scoreAria}>
              <option value="Tous">{c.anyScore}</option>
              <option value="70">{fill(c.scorePlus, { n: 70 })}</option>
              <option value="80">{fill(c.scorePlus, { n: 80 })}</option>
              <option value="90">{fill(c.scorePlus, { n: 90 })}</option>
            </select>
            <select value={market} onChange={(event) => setMarket(event.target.value as MarketFilter)} aria-label={c.marketAria}>
              <option value="Tous">{c.allMarkets}</option>
              <option value="Forex">{ui.styles.Forex}</option>
              <option value="Futures">{ui.styles.Futures}</option>
              <option value="Actions">{ui.styles.Stocks}</option>
              <option value="Crypto">{ui.styles.Crypto}</option>
            </select>
            <select value={legalFilter} onChange={(event) => setLegalFilter(event.target.value as LegalFilter)} aria-label={c.legalAria}>
              <option value="Tous">{c.anyLegal}</option>
              <option value="verified">{c.entityMapped}</option>
              <option value="watch">{c.legalWatch}</option>
              <option value="deep">{c.sources5}</option>
            </select>
            <select value={country} onChange={(event) => setCountry(event.target.value)} aria-label={c.countryAria}>
              <option value="Tous">{c.anyCountry}</option>
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name} ({option.n})
                </option>
              ))}
              <option value="none">{c.countryUnknown}</option>
            </select>
          </div>
          <div className="pr-sheet-foot">
            <button type="button" className="btn" onClick={resetFilters} disabled={!activeFilterCount}>{c.reset}</button>
            <button type="button" className="btn btn-primary" onClick={() => setFiltersOpen(false)}>
              {filteredFirms.length === 1 ? c.showFirm : fill(c.showFirms, { n: filteredFirms.length })}
            </button>
          </div>
        </div>
      </section>

      {toolbarHidden && !filtersOpen ? (
        <button type="button" className="pr-filters-fab" onClick={() => setFiltersOpen(true)}>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16"><path d="M3 5h14M6 10h8M8.5 15h3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          {c.filters}{filterOnlyCount ? <b>{filterOnlyCount}</b> : null} · {filteredFirms.length === 1 ? c.firmN : fill(c.firmsN, { n: filteredFirms.length })}
        </button>
      ) : null}

      <div className="pr-results-meta" aria-live="polite">
        <p>
          <strong>{filteredFirms.length === 1 ? c.firmN : fill(c.firmsN, { n: filteredFirms.length })}</strong>
          {filteredFirms.length > visibleEnd ? <span> · {fill(c.showing, { n: visibleEnd })}</span> : null}
          {sort ? <span> · {fill(c.sortedBy, { key: c.sort[sort.key] })}{sort.key === 'score' ? '' : c.unknownLast}</span> : isSearching ? <span> · {c.relevance}</span> : <span> · {fill(c.average, { n: averageScore })}</span>}
        </p>
        <div className="pr-results-actions">
          {activeFilterCount > 0 ? <button type="button" className="pr-link-button" onClick={resetFilters}>{activeFilterCount > 1 ? fill(c.resetN, { n: activeFilterCount }) : c.resetOne}</button> : null}
          <Link href={`${L('/tools')}#comparatif`} className="pr-link">{c.sideBySide} <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      {filteredFirms.length === 0 ? (
        <div className="pr-empty">
          <strong>{c.emptyTitle}</strong>
          <span>{c.emptyText}</span>
          <button type="button" className="btn" onClick={resetFilters}>{c.resetFilters}</button>
        </div>
      ) : (
        <div className="pr-firm-table" role="table" aria-label={c.tableAria} onPointerMove={followPointer}>
          <FirmTableHead sort={sort} onSort={toggleSort} ui={ui} />
          {visibleFirms.map((firm, index) => (
            <FirmRow key={firm.slug} firm={firm} rank={index + 1} locale={locale} ui={ui}>
              {isSearching ? <FirmSearchContext firm={firm} query={search} label={c.matchedBy} /> : null}
            </FirmRow>
          ))}
        </div>
      )}

      {remaining > 0 ? (
        <div className="pr-load-more">
          <button type="button" className="btn" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            {fill(c.showMore, { n: Math.min(PAGE_SIZE, remaining) })}
          </button>
          <span>{remaining === 1 ? c.moreMatchOne : fill(c.moreMatch, { n: remaining })}</span>
        </div>
      ) : null}

      <section className="pr-signal-band" aria-label={c.signalsAria}>
        <h2>{c.signalsTitle}</h2>
        <div className="pr-signal-grid">
          <SignalList locale={locale} title={c.signalPayout} href="/prop-firm-payout-risk" firms={payoutAlerts} value={(firm) => v(toEnglishText(firm.reviewSignals.payoutRisk))} tone={(firm) => payoutTone(firm.reviewSignals.payoutRisk)} />
          <SignalList locale={locale} title={c.signalLegal} href="/audit" anchor="#regulatory" firms={legalWatch} value={(firm) => v(firm.regulatoryAudit.riskLevel)} tone={(firm) => legalTone(firm.regulatoryAudit.riskLevel)} />
          <SignalList locale={locale} title={c.signalWithheld} href="/trustpilot-prop-firms" firms={reviewWatch} value={() => v('Withheld')} tone={() => 'risk'} />
          <SignalList locale={locale} title={c.signalClean} href="/best-prop-firms" firms={strongSignals} value={(firm) => `${firm.score}/100`} tone={(firm) => scoreTone(firm.score)} />
        </div>
      </section>

      <details className="pr-method">
        <summary>{c.methodSummary}</summary>
        <ul>
          <li><span className="pr-pip-dot pr-tone-good" aria-hidden="true" /> {c.method0}</li>
          {c.method.map(([lead, text]) => (
            <li key={lead}><strong>{lead}</strong> {text}</li>
          ))}
        </ul>
        <Link href={L('/audit')} className="pr-link">{c.methodLink} <span aria-hidden="true">→</span></Link>
      </details>
    </main>
  );
}

function SignalList({
  locale,
  title,
  href,
  anchor = '',
  firms,
  value,
  tone,
}: {
  locale: Locale;
  title: string;
  href: string;
  anchor?: string;
  firms: PropFirm[];
  value: (firm: PropFirm) => string;
  tone: (firm: PropFirm) => Tone;
}) {
  return (
    <article className="pr-signal-list">
      <h3><Link href={localePath(locale, href)}>{title}</Link></h3>
      <ul>
        {firms.map((firm) => (
          <li key={firm.slug}>
            <Link href={`${localePath(locale, `/firm/${firm.slug}`)}${anchor}`}>
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
