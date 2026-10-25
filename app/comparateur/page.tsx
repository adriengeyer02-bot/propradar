'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import FirmLogo from '../components/FirmLogo';
import { TxArrow, TxScore } from '../components/TxBits';
import { formatDate, riskTone } from '../lib/tx';
import type { PropFirm } from '../lib/propFirms';
import {
  activeFirms,
  formatUsd,
  manipulationRiskClass,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  reviewReliabilityClass,
  riskyFirms,
  statusClass,
} from '../lib/propFirms';
import { findFirmSearchMatch, normalizeFirmSearch } from '../lib/firmSearch';
import { toEnglishText } from '../lib/i18n';
import { SITE_URL } from '../lib/site';

type StatusFilter = 'Tous' | 'Active' | 'À surveiller' | 'Fermée';
type MarketFilter = 'Tous' | 'Forex' | 'Futures' | 'Actions' | 'Crypto';
type ScoreFilter = 'Tous' | '70' | '80' | '90';
type PriceFilter = 'Tous' | '50' | '100' | '200';
type DrawdownFilter = 'Tous' | 'EOD' | 'Trailing' | 'Static' | 'Hybride';
type LegalFilter = 'Tous' | 'verified' | 'watch' | 'deep';

const statusFilters: StatusFilter[] = ['Tous', 'Active', 'À surveiller', 'Fermée'];
const PAGE_SIZE = 20;
const DATA_UPDATED_AT = propFirms.reduce((latest, firm) => {
  const firmLatest = firm.regulatoryAudit.lastChecked > firm.lastReviewed ? firm.regulatoryAudit.lastChecked : firm.lastReviewed;
  return firmLatest > latest ? firmLatest : latest;
}, '2026-01-01');

type SortKey = 'score' | 'price' | 'split' | 'name';
type SortDir = 'asc' | 'desc';

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
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

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
        const matchesDrawdown = drawdown === 'Tous' || firm.drawdownType === drawdown;
        const matchesLegal =
          legalFilter === 'Tous' ||
          (legalFilter === 'verified' && firm.legalVerified && !isLegalWatchFirm(firm)) ||
          (legalFilter === 'watch' && isLegalWatchFirm(firm)) ||
          (legalFilter === 'deep' && legalSourceCount(firm) >= 5);
        return matchesSearch && matchesStatus && matchesMarket && matchesScore && matchesPrice && matchesDrawdown && matchesLegal;
      })
      .sort((a, b) => {
        if (normalizedSearch && sortKey === 'score' && sortDir === 'desc') {
          const relevanceDifference = (b.searchMatch?.score ?? 0) - (a.searchMatch?.score ?? 0);
          if (relevanceDifference) return relevanceDifference;
        }
        const direction = sortDir === 'asc' ? 1 : -1;
        if (sortKey === 'name') return direction * a.firm.name.localeCompare(b.firm.name);
        if (sortKey === 'price') {
          // Unknown prices (0) always sink to the bottom.
          if (!a.firm.priceFrom || !b.firm.priceFrom) return (b.firm.priceFrom ? 1 : 0) - (a.firm.priceFrom ? 1 : 0);
          return direction * (a.firm.priceFrom - b.firm.priceFrom);
        }
        if (sortKey === 'split') return direction * (a.firm.profitSplit - b.firm.profitSplit) || b.firm.score - a.firm.score;
        return direction * (a.firm.score - b.firm.score);
      })
      .map(({ firm }) => firm);
  }, [drawdown, legalFilter, market, priceMax, scoreMin, search, sortDir, sortKey, status]);

  useEffect(() => {
    setPage(1);
  }, [drawdown, legalFilter, market, priceMax, scoreMin, search, sortDir, sortKey, status]);

  const totalPages = Math.max(1, Math.ceil(filteredFirms.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleFirms = filteredFirms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const visibleStart = filteredFirms.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const visibleEnd = Math.min(currentPage * PAGE_SIZE, filteredFirms.length);
  const comparatorSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'PropRadar Prop Firm Comparator',
      description: 'Independent prop firm comparison using rules, payout risk, legal evidence and public review signals.',
      url: `${SITE_URL}/comparateur`,
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
  const archivedFirmsCount = propFirms.length - activeFirms.length - riskyFirms.length;
  const activeFilterCount = [normalizeFirmSearch(search), status !== 'Tous', market !== 'Tous', scoreMin !== 'Tous', priceMax !== 'Tous', drawdown !== 'Tous', legalFilter !== 'Tous'].filter(Boolean).length;
  const searchCoverage = useMemo(
    () => ({
      entityRecords: propFirms.reduce((sum, firm) => sum + firm.regulatoryAudit.entities.length, 0),
      programs: propFirms.reduce((sum, firm) => sum + firm.products.length, 0),
      sources: new Set(propFirms.flatMap((firm) => [...firm.regulatoryAudit.sources, ...firm.sources].map((source) => source.url))).size,
    }),
    []
  );
  const payoutAlerts = useMemo(
    () => [...propFirms].filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible').sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore).slice(0, 3),
    []
  );
  const reviewWatch = useMemo(
    () =>
      [...propFirms]
        .filter((firm) => firm.reviewSignals.manipulationRiskScore && firm.reviewSignals.manipulationRiskScore >= 70)
        .sort((a, b) => (b.reviewSignals.manipulationRiskScore ?? 0) - (a.reviewSignals.manipulationRiskScore ?? 0))
        .slice(0, 3),
    []
  );
  const strongSignals = useMemo(
    () =>
      [...propFirms]
        .filter((firm) => firm.reviewSignals.redditScore >= 75 && firm.reviewSignals.xScore >= 65 && firm.reviewSignals.trustpilotReliability === 'Forte' && firm.reviewSignals.payoutRisk === 'Faible')
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
    setSortKey('score');
    setSortDir('desc');
  }

  function goToPage(nextPage: number) {
    setPage(Math.max(1, Math.min(totalPages, nextPage)));
    document.getElementById('tableau')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
      return;
    }
    setSortKey(key);
    setSortDir(key === 'name' || key === 'price' ? 'asc' : 'desc');
  }

  function sortHeader(label: string, sortBy: SortKey, align?: 'right') {
    const active = sortKey === sortBy;
    return (
      <th
        scope="col"
        className={align === 'right' ? 'tx-r' : undefined}
        aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        <button type="button" className={`tx-sort${active ? ' is-active' : ''}`} onClick={() => toggleSort(sortBy)}>
          {label}
          <span aria-hidden="true">{active ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</span>
        </button>
      </th>
    );
  }

  const watchColumns = [
    {
      label: 'Payout watch',
      href: '/risques-payout',
      firms: payoutAlerts.map((firm) => ({ firm, value: toEnglishText(firm.reviewSignals.payoutRisk), tone: riskTone(payoutRiskClass(firm.reviewSignals.payoutRisk)) })),
    },
    {
      label: 'Review manipulation',
      href: '/trustpilot-prop-firms',
      firms: reviewWatch.map((firm) => ({ firm, value: toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen'), tone: riskTone(manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')) })),
    },
    {
      label: 'Legal watch',
      href: '/guides/prop-firm-legal-check',
      firms: legalWatch.map((firm) => ({ firm, value: firm.regulatoryAudit.riskLevel, tone: riskTone(regulatoryRiskClass(firm.regulatoryAudit.riskLevel)) })),
    },
    {
      label: 'Clean multi-source signal',
      href: '/audit',
      firms: strongSignals.map((firm) => ({ firm, value: `${firm.score}/100`, tone: 'tx-risk-pos' })),
    },
  ];

  return (
    <main className="container tx-page tx-comparator">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(comparatorSchema)} />

      <header className="tx-page-head">
        <p className="tx-label">Independent radar</p>
        <h1>Prop Firm Comparator</h1>
        <p className="tx-page-lead">
          Rules, payout risk, legal evidence and public review signals for every tracked prop firm, ranked by the PropRadar score.
        </p>
        <dl className="tx-meta-line">
          <div><dt>Tracked</dt><dd>{propFirms.length}</dd></div>
          <div><dt>Active</dt><dd>{activeFirms.length}</dd></div>
          <div><dt>Watchlist</dt><dd>{riskyFirms.length}</dd></div>
          <div><dt>Archived</dt><dd>{archivedFirmsCount}</dd></div>
          <div><dt>Data updated</dt><dd><time dateTime={DATA_UPDATED_AT}>{formatDate(DATA_UPDATED_AT)}</time></dd></div>
        </dl>
      </header>

      <section className="tx-toolbar" id="tableau" aria-label="Search and filters">
        <div className="tx-toolbar-main">
          <div className="tx-search">
            <label className="sr-only" htmlFor="comparator-search">Search indexed prop firm research</label>
            <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></svg>
            <input
              id="comparator-search"
              type="search"
              placeholder="Firm, legal entity, jurisdiction, platform, payout rule..."
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

          <div className="tx-segment" role="group" aria-label="Filter by status">
            {statusFilters.map((item) => (
              <button
                key={item}
                type="button"
                className={status === item ? 'is-active' : ''}
                onClick={() => setStatus(item)}
                aria-pressed={status === item}
              >
                {item === 'Tous' ? 'All' : toEnglishText(item)}
              </button>
            ))}
          </div>
        </div>

        <div className="tx-toolbar-filters">
          <select value={scoreMin} onChange={(event) => setScoreMin(event.target.value as ScoreFilter)} className="tx-select" aria-label="Minimum score">
            <option value="Tous">Any score</option>
            <option value="70">Score 70+</option>
            <option value="80">Score 80+</option>
            <option value="90">Score 90+</option>
          </select>
          <select value={priceMax} onChange={(event) => setPriceMax(event.target.value as PriceFilter)} className="tx-select" aria-label="Maximum price">
            <option value="Tous">Any price</option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
            <option value="200">Up to $200</option>
          </select>
          <select value={drawdown} onChange={(event) => setDrawdown(event.target.value as DrawdownFilter)} className="tx-select" aria-label="Drawdown type">
            <option value="Tous">Any drawdown</option>
            <option value="EOD">EOD</option>
            <option value="Trailing">Trailing</option>
            <option value="Static">Static</option>
            <option value="Hybride">Hybrid</option>
          </select>
          <select value={market} onChange={(event) => setMarket(event.target.value as MarketFilter)} className="tx-select" aria-label="Market">
            <option value="Tous">All markets</option>
            <option>Forex</option>
            <option>Futures</option>
            <option value="Actions">Stocks</option>
            <option>Crypto</option>
          </select>
          <select value={legalFilter} onChange={(event) => setLegalFilter(event.target.value as LegalFilter)} className="tx-select" aria-label="Legal proof">
            <option value="Tous">Any legal proof</option>
            <option value="verified">Entity mapped</option>
            <option value="watch">Legal watch</option>
            <option value="deep">Deep sources</option>
          </select>
          {activeFilterCount > 0 || sortKey !== 'score' || sortDir !== 'desc' ? (
            <button type="button" className="tx-reset" onClick={resetFilters}>Reset</button>
          ) : null}
        </div>

        <div className="tx-quick" aria-label="Quick searches">
          <span className="tx-label">Quick</span>
          {QUICK_SEARCHES.map((item) => {
            const isActive = normalizeFirmSearch(search) === normalizeFirmSearch(item.query);
            return (
              <button
                key={item.query}
                type="button"
                className={isActive ? 'is-active' : ''}
                onClick={() => setSearch(isActive ? '' : item.query)}
                aria-pressed={isActive}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className="tx-results-bar" aria-live="polite">
        <span>
          <strong className="tx-num">{filteredFirms.length}</strong> firm{filteredFirms.length === 1 ? '' : 's'}
          {filteredFirms.length ? <> &middot; showing {visibleStart}&ndash;{visibleEnd}</> : null}
          {normalizeFirmSearch(search) && sortKey === 'score' && sortDir === 'desc' ? <> &middot; ranked by search relevance</> : null}
          {filteredFirms.length ? <> &middot; average score <span className="tx-num">{averageScore}</span></> : null}
        </span>
        <span className="tx-legend" aria-label="Score colour legend">
          <i className="tx-legend-pos" /> 70+
          <i className="tx-legend-warn" /> 55&ndash;69
          <i className="tx-legend-neg" /> under 55
        </span>
      </div>

      <div className="tx-table-wrap">
        {filteredFirms.length === 0 ? (
          <div className="tx-empty">
            <strong>No prop firm matches this search and these filters.</strong>
            <span>Check the name or acronym, or broaden the status, price, score, market and legal filters.</span>
            <button type="button" className="btn" onClick={resetFilters}>Reset filters</button>
          </div>
        ) : (
          <table className="tx-table tx-table-stack tx-firm-table">
            <thead>
              <tr>
                <th scope="col" className="tx-r">#</th>
                {sortHeader('Firm', 'name')}
                {sortHeader('Score', 'score')}
                <th scope="col">Status</th>
                {sortHeader('From', 'price', 'right')}
                {sortHeader('Split', 'split', 'right')}
                <th scope="col">Drawdown</th>
                <th scope="col">Payout risk</th>
                <th scope="col">Legal file</th>
                <th scope="col">Reviews</th>
                <th scope="col"><span className="sr-only">Commercial relationship</span></th>
              </tr>
            </thead>
            <tbody>
              {visibleFirms.map((firm, index) => (
                <tr key={firm.slug}>
                  <td className="tx-r tx-rank tx-hide-sm">{visibleStart + index}</td>
                  <td className="tx-cell-firm">
                    <Link href={`/firm/${firm.slug}`} className="tx-firm">
                      <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                      <span>
                        {firm.name}
                        <small>{firm.styles.slice(0, 2).map((style) => toEnglishText(style)).join(' / ')}</small>
                      </span>
                    </Link>
                    {normalizeFirmSearch(search) ? <FirmSearchContext firm={firm} query={search} /> : null}
                  </td>
                  <td className="tx-cell-score"><TxScore score={firm.score} /></td>
                  <td data-label="Status">
                    <span className={`tx-risk ${riskTone(statusClass(firm.status))}`}>{toEnglishText(firm.status)}</span>
                  </td>
                  <td data-label="From" className="tx-r tx-num">{firm.priceFrom > 0 ? formatUsd(firm.priceFrom) : <span className="tx-na">n/a</span>}</td>
                  <td data-label="Split" className="tx-r tx-num">{firm.profitSplit > 0 ? `${firm.profitSplit}%` : <span className="tx-na">n/a</span>}</td>
                  <td data-label="Drawdown">{toEnglishText(firm.drawdownType)}</td>
                  <td data-label="Payout risk">
                    <span className={`tx-risk ${riskTone(payoutRiskClass(firm.reviewSignals.payoutRisk))}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
                  </td>
                  <td data-label="Legal file">
                    <span className={`tx-risk ${riskTone(regulatoryRiskClass(firm.regulatoryAudit.riskLevel))}`} title={`${firm.legalVerified ? 'Entity mapped' : 'Entity not confirmed'}, ${legalSourceCount(firm)} source(s)`}>
                      {firm.regulatoryAudit.riskLevel}
                    </span>
                  </td>
                  <td data-label="Reviews">
                    <span
                      className={`tx-risk ${riskTone(reviewReliabilityClass(firm.reviewSignals.trustpilotReliability))}`}
                      title={`Trustpilot reliability${firm.trustpilotRating ? `, raw rating ${firm.trustpilotRating}/5` : ''}`}
                    >
                      {toEnglishText(firm.reviewSignals.trustpilotReliability)}
                    </span>
                  </td>
                  <td className="tx-cell-rel">
                    {firm.commercialRelationship === 'Affiliation transparente' ? (
                      <span className="tx-tag tx-tag-accent" title="Declared affiliate relationship. It never protects the score.">Affiliate</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filteredFirms.length > PAGE_SIZE ? (
        <nav className="tx-pager" aria-label="Comparator result pages">
          <button type="button" className="btn" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span aria-current="page" className="tx-num">Page {currentPage} / {totalPages}</span>
          <button type="button" className="btn" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </nav>
      ) : null}

      <p className="tx-table-note">
        Need a decision between two or three firms?{' '}
        <Link href="/outils#comparatif" className="tx-link">Open the side-by-side tool <TxArrow /></Link>
      </p>

      <section className="tx-section" aria-labelledby="signals-title">
        <div className="tx-section-head">
          <div>
            <p className="tx-label">Priority signals</p>
            <h2 id="signals-title">What to read before comparing discounts.</h2>
          </div>
          <p>
            Searchable index: {searchCoverage.entityRecords} entity records, {searchCoverage.programs} programs and {searchCoverage.sources} evidence links.
          </p>
        </div>
        <div className="tx-ruled tx-watch" style={{ ['--cols' as string]: 4 }}>
          {watchColumns.map((column) => (
            <div key={column.label}>
              <Link href={column.href} className="tx-watch-title">
                <span className="tx-label">{column.label}</span>
                <TxArrow />
              </Link>
              <ul>
                {column.firms.map(({ firm, value, tone }) => (
                  <li key={firm.slug}>
                    <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                    <span className={`tx-risk ${tone}`}>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
