'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import FirmLogo from '../components/FirmLogo';
import RiskPip from '../components/ui/RiskPip';
import ScoreRing from '../components/ui/ScoreRing';
import type { PropFirm } from '../lib/propFirms';
import { activeFirms, formatUsd, propFirms, riskyFirms } from '../lib/propFirms';
import { findFirmSearchMatch, normalizeFirmSearch } from '../lib/firmSearch';
import { toEnglishText } from '../lib/i18n';
import { latestReviewDate, legalTone, payoutTone, reviewTone, scoreTone, statusTone } from '../lib/riskTone';
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

/** Short, informative trading tags only: no tag that would appear on every firm. */
function firmTags(firm: PropFirm) {
  const tags: string[] = [];
  const text = `${firm.styles.join(' ')} ${firm.bestFor}`.toLowerCase();

  if (text.includes('scalping')) tags.push('Scalping');
  if (firm.newsTrading === 'Autorisé' || firm.newsTrading === 'Allowed') tags.push('News allowed');
  if (firm.eaAllowed === 'Oui' || firm.eaAllowed === 'Yes') tags.push('EA allowed');

  return tags.slice(0, 2);
}

function marketLabel(firm: PropFirm) {
  return firm.styles.slice(0, 2).map((style) => toEnglishText(style)).join(' / ');
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

function shortLegal(level: PropFirm['regulatoryAudit']['riskLevel']) {
  if (level === 'Low to medium') return 'Low–med';
  if (level === 'Medium to high') return 'Med–high';
  return level;
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
        if (normalizedSearch) {
          const relevanceDifference = (b.searchMatch?.score ?? 0) - (a.searchMatch?.score ?? 0);
          if (relevanceDifference) return relevanceDifference;
        }
        return b.firm.score - a.firm.score;
      })
      .map(({ firm }) => firm);
  }, [drawdown, legalFilter, market, priceMax, scoreMin, search, status]);

  useEffect(() => {
    setPage(1);
  }, [drawdown, legalFilter, market, priceMax, scoreMin, search, status]);

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
  const activeFilterCount = [normalizeFirmSearch(search), status !== 'Tous', market !== 'Tous', scoreMin !== 'Tous', priceMax !== 'Tous', drawdown !== 'Tous', legalFilter !== 'Tous'].filter(Boolean).length;
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
  }

  function goToPage(nextPage: number) {
    setPage(Math.max(1, Math.min(totalPages, nextPage)));
    document.getElementById('tableau')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const isSearching = Boolean(normalizeFirmSearch(search));

  return (
    <main className="container comparator-page pr-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(comparatorSchema)} />

      <header className="pr-page-head">
        <div className="eyebrow">Independent radar</div>
        <h1>Prop firm comparator</h1>
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

      <section className="pr-toolbar" id="tableau" aria-label="Search and filters">
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

        <div className="pr-filters">
          <div className="pr-segmented" aria-label="Filter by status">
            {statusFilters.map((item) => (
              <button key={item} type="button" className={status === item ? 'is-active' : ''} onClick={() => setStatus(item)} aria-pressed={status === item}>
                {item === 'Tous' ? 'All' : toEnglishText(item)}
              </button>
            ))}
          </div>

          <select value={scoreMin} onChange={(event) => setScoreMin(event.target.value as ScoreFilter)} aria-label="Minimum score">
            <option value="Tous">Any score</option>
            <option value="70">Score 70+</option>
            <option value="80">Score 80+</option>
            <option value="90">Score 90+</option>
          </select>
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
        </div>
      </section>

      <div className="pr-results-meta" aria-live="polite">
        <p>
          <strong>{filteredFirms.length} firms</strong>
          {filteredFirms.length ? <span> · showing {visibleStart}–{visibleEnd}</span> : null}
          {isSearching ? <span> · ranked by relevance</span> : <span> · average score {averageScore}</span>}
        </p>
        <div className="pr-results-actions">
          {activeFilterCount > 0 ? <button type="button" className="pr-link-button" onClick={resetFilters}>Reset {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}</button> : null}
          <Link href="/outils#comparatif" className="pr-link">Compare 2–3 side by side <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      {filteredFirms.length === 0 ? (
        <div className="pr-empty">
          <strong>No prop firm matches these filters.</strong>
          <span>Check the spelling, or broaden status, price, score, market and legal filters.</span>
          <button type="button" className="btn" onClick={resetFilters}>Reset filters</button>
        </div>
      ) : (
        <div className="pr-firm-table" role="table" aria-label="Prop firms ranked by PropRadar score">
          <div className="pr-firm-head" role="row">
            <span role="columnheader">Firm</span>
            <span role="columnheader">Score</span>
            <span role="columnheader">From</span>
            <span role="columnheader">Drawdown</span>
            <span role="columnheader">Risk signals</span>
            <span role="columnheader"><span className="sr-only">Profile</span></span>
          </div>
          {visibleFirms.map((firm, index) => {
            const tags = firmTags(firm);
            const rank = (currentPage - 1) * PAGE_SIZE + index + 1;
            return (
              <Link key={firm.slug} href={`/firm/${firm.slug}`} className={`pr-firm-row pr-edge-${scoreTone(firm.score)}`} role="row">
                <span className="pr-firm-id" role="cell">
                  <span className="pr-firm-rank" aria-hidden="true">{rank}</span>
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span className="pr-firm-name">
                    <strong>
                      {firm.name}
                      {firm.status !== 'Active' ? <em className={`pr-tag pr-tone-${statusTone(firm.status)}`}>{toEnglishText(firm.status)}</em> : null}
                      {firm.commercialRelationship === 'Affiliation transparente' ? <em className="pr-tag pr-tag-affiliate" title="PropRadar may earn a commission. The score is not affected.">Affiliate</em> : null}
                    </strong>
                    <span>{marketLabel(firm)}{tags.length ? ` · ${tags.join(' · ')}` : ''}</span>
                    {isSearching ? <FirmSearchContext firm={firm} query={search} /> : null}
                  </span>
                </span>
                <span className="pr-firm-score" role="cell"><ScoreRing score={firm.score} size="sm" /></span>
                <span className="pr-firm-fig pr-firm-price" role="cell"><small>From</small>{formatUsd(firm.priceFrom)}</span>
                <span className="pr-firm-fig pr-firm-dd" role="cell"><small>Drawdown</small>{toEnglishText(firm.drawdownType)}</span>
                <span className="pr-firm-pips" role="cell">
                  <RiskPip compact label="Payout" value={toEnglishText(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
                  <RiskPip compact label="Legal" value={shortLegal(firm.regulatoryAudit.riskLevel)} tone={legalTone(firm.regulatoryAudit.riskLevel)} />
                  <RiskPip compact label="Reviews" value={toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')} tone={reviewTone(firm.reviewSignals.manipulationRisk)} />
                </span>
                <span className="pr-firm-go" role="cell" aria-hidden="true">›</span>
              </Link>
            );
          })}
        </div>
      )}

      {filteredFirms.length > PAGE_SIZE ? (
        <nav className="pr-pagination" aria-label="Comparator result pages">
          <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>← Previous</button>
          <span aria-current="page">Page <strong>{currentPage}</strong> of {totalPages}</span>
          <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next →</button>
        </nav>
      ) : null}

      <section className="pr-signal-band" aria-label="Priority signals">
        <h2>Signals to check first</h2>
        <div className="pr-signal-grid">
          <SignalList title="Payout incidents" href="/risques-payout" firms={payoutAlerts} value={(firm) => toEnglishText(firm.reviewSignals.payoutRisk)} tone={(firm) => payoutTone(firm.reviewSignals.payoutRisk)} />
          <SignalList title="Legal watch" href="/audit" anchor="#regulatory" firms={legalWatch} value={(firm) => firm.regulatoryAudit.riskLevel} tone={(firm) => legalTone(firm.regulatoryAudit.riskLevel)} />
          <SignalList title="Review manipulation" href="/trustpilot-prop-firms" firms={reviewWatch} value={(firm) => toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')} tone={(firm) => reviewTone(firm.reviewSignals.manipulationRisk)} />
          <SignalList title="Cleanest multi-source profiles" href="/meilleures-prop-firms" firms={strongSignals} value={(firm) => `${firm.score}/100`} tone={(firm) => scoreTone(firm.score)} />
        </div>
      </section>

      <details className="pr-method">
        <summary>How to read this comparator</summary>
        <ul>
          <li><span className="pr-pip-dot pr-tone-good" aria-hidden="true" /> Green, amber and red always mean the same thing: low, medium and high risk.</li>
          <li><strong>Score</strong> weighs rules, payout reliability, legal structure, public reviews and proof level.</li>
          <li><strong>Payout</strong> reflects withdrawal incidents, denials, thresholds and closures.</li>
          <li><strong>Legal</strong> reflects entity mapping, regulator status and the depth of saved sources.</li>
          <li><strong>Reviews</strong> is the risk that public ratings are inflated or unreliable.</li>
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
  tone: (firm: PropFirm) => 'good' | 'watch' | 'risk';
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
