'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import FirmLogo from '../components/FirmLogo';
import type { PropFirm } from '../lib/propFirms';
import {
  activeFirms,
  formatUsd,
  manipulationRiskClass,
  payoutRiskClass,
  propFirms,
  relationshipClass,
  reviewReliabilityClass,
  riskyFirms,
  scoreClass,
  statusClass,
} from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

type StatusFilter = 'Tous' | 'Active' | 'À surveiller' | 'Fermée';
type MarketFilter = 'Tous' | 'Forex' | 'Futures' | 'Actions' | 'Crypto';
type ScoreFilter = 'Tous' | '70' | '80' | '90';
type PriceFilter = 'Tous' | '50' | '100' | '200';
type DrawdownFilter = 'Tous' | 'EOD' | 'Trailing' | 'Static' | 'Hybride';

const statusFilters: StatusFilter[] = ['Tous', 'Active', 'À surveiller', 'Fermée'];

function SignalDots({ score, tone = 'blue' }: { score: number; tone?: 'blue' | 'orange' | 'green' | 'red' }) {
  const filled = Math.max(1, Math.min(5, Math.round(score / 20)));

  return (
    <span className="dot-rating" aria-label={`${score}/100`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={`dot ${index < filled ? `dot-${tone}` : ''}`} />
      ))}
    </span>
  );
}

function tradingStyleTags(firm: PropFirm) {
  const tags = new Set<string>();
  const text = `${firm.styles.join(' ')} ${firm.bestFor}`.toLowerCase();

  if (text.includes('swing')) tags.add('Swing');
  if (text.includes('scalping')) tags.add('Scalping');
  if (text.includes('intraday')) tags.add('Intraday');
  if (text.includes('formation')) tags.add('Formation');
  if (text.includes('futures')) tags.add('Futures');
  if (text.includes('crypto')) tags.add('Crypto');
  if (!tags.has('Swing') && firm.drawdownType !== 'Trailing') tags.add('Swing to confirm');
  tags.add('Manual SMC');

  if (firm.newsTrading === 'Autorisé' || firm.newsTrading === 'Allowed') tags.add('News');
  if (firm.newsTrading === 'Restreint' || firm.newsTrading === 'Restricted') tags.add('Restricted news');
  if (firm.newsTrading === 'Non recommandé' || firm.newsTrading === 'Not recommended') tags.add('News blocked');
  if (firm.newsTrading === 'Variable') tags.add('News to verify');

  if (firm.eaAllowed === 'Oui' || firm.eaAllowed === 'Yes') tags.add('EA');
  if (firm.eaAllowed === 'Sur demande' || firm.eaAllowed === 'On request') tags.add('EA on request');
  if (firm.eaAllowed === 'Variable') tags.add('EA to verify');

  return Array.from(tags).slice(0, 6);
}

function scoreToneClass(score: number) {
  if (score >= 75) return 'signal-chip-good';
  if (score >= 55) return 'signal-chip-watch';
  return 'signal-chip-risk';
}

function riskToneClass(score: number) {
  if (score >= 65) return 'signal-chip-risk';
  if (score >= 40) return 'signal-chip-watch';
  return 'signal-chip-good';
}

function rowToneClass(firm: PropFirm) {
  if (firm.score >= 80 && firm.reviewSignals.payoutRiskScore < 40) return 'firm-result-strong';
  if (firm.score < 55 || firm.reviewSignals.payoutRiskScore >= 65) return 'firm-result-risk';
  if (firm.score < 70 || firm.reviewSignals.payoutRiskScore >= 40 || firm.status !== 'Active') return 'firm-result-watch';
  return 'firm-result-neutral';
}

export default function Comparateur() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('Tous');
  const [market, setMarket] = useState<MarketFilter>('Tous');
  const [scoreMin, setScoreMin] = useState<ScoreFilter>('Tous');
  const [priceMax, setPriceMax] = useState<PriceFilter>('Tous');
  const [drawdown, setDrawdown] = useState<DrawdownFilter>('Tous');
  const dataUpdatedAt = '2026-07-05';

  const filteredFirms = useMemo(() => {
    return propFirms
      .filter((firm) => {
        const matchesSearch =
          firm.name.toLowerCase().includes(search.toLowerCase()) ||
          firm.bestFor.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === 'Tous' || firm.status === status;
        const matchesMarket = market === 'Tous' || firm.styles.some((style) => style.toLowerCase().includes(market.toLowerCase()));
        const matchesScore = scoreMin === 'Tous' || firm.score >= Number(scoreMin);
        const matchesPrice = priceMax === 'Tous' || (firm.priceFrom > 0 && firm.priceFrom <= Number(priceMax));
        const matchesDrawdown = drawdown === 'Tous' || firm.drawdownType === drawdown;
        return matchesSearch && matchesStatus && matchesMarket && matchesScore && matchesPrice && matchesDrawdown;
      })
      .sort((a, b) => b.score - a.score);
  }, [drawdown, market, priceMax, scoreMin, search, status]);

  const averageScore = Math.round(filteredFirms.reduce((sum, firm) => sum + firm.score, 0) / Math.max(filteredFirms.length, 1));
  const archivedFirmsCount = propFirms.length - activeFirms.length - riskyFirms.length;
  const activeFilterCount = [search, status !== 'Tous', market !== 'Tous', scoreMin !== 'Tous', priceMax !== 'Tous', drawdown !== 'Tous'].filter(Boolean).length;
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

  function resetFilters() {
    setSearch('');
    setStatus('Tous');
    setMarket('Tous');
    setScoreMin('Tous');
    setPriceMax('Tous');
    setDrawdown('Tous');
  }

  return (
    <main className="container comparator-page">
      <section className="comparator-hero">
          <div className="comparator-title">
          <div className="eyebrow">Independent Radar</div>
          <h1>Prop Firm Comparator</h1>
          <p className="lead">Products, risks, Reddit signals, X/Twitter, Trustpilot reliability and payout incidents.</p>
          <div className="comparator-freshness">
            <span>Data updated</span>
            <strong>{dataUpdatedAt}</strong>
          </div>
        </div>

        <div className="comparator-stats">
          <div className="summary-stat">
            <span>Firms tracked</span>
            <strong>{propFirms.length}</strong>
            <small>Core + universe + {archivedFirmsCount} archives</small>
          </div>
          <div className="summary-stat">
            <span>Active</span>
            <strong>{activeFirms.length}</strong>
            <small>Open market</small>
          </div>
          <div className="summary-stat">
            <span>Watchlist</span>
            <strong>{riskyFirms.length}</strong>
            <small>Cautious radar</small>
          </div>
          <div className="summary-score">
            <span>Average reliability of results</span>
            <strong>{averageScore}/100</strong>
            <small>Calculated from displayed firms</small>
            <a href="#tableau" className="btn btn-primary">View table</a>
          </div>
        </div>
      </section>

      <section className="signal-dashboard" aria-label="Priority signals">
        <article className="signal-dashboard-card signal-card-alert">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Payout Watch</div>
              <h3>Incidents to watch</h3>
            </div>
            <span className="signal-card-count">Top 3</span>
          </div>
          <ul className="compact-signal-list">
            {payoutAlerts.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="signal-dashboard-card signal-card-warning">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Filtered Reviews</div>
              <h3>Signal marketing</h3>
            </div>
            <span className="signal-card-count">Reviews</span>
          </div>
          <ul className="compact-signal-list">
            {reviewWatch.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>{toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="signal-dashboard-card signal-card-positive">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Clean Signal</div>
              <h3>Multi-source trust</h3>
            </div>
            <span className="signal-card-count">Trust</span>
          </div>
          <ul className="compact-signal-list">
            {strongSignals.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className="badge badge-green">{firm.score}/100</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="signal-trustbar" aria-label="PropRadar signal reading">
        <div>
          <span>Net Reddit</span>
          <strong>positive vs negative</strong>
          <small>The table shows positive and negative mentions, not just an abstract score.</small>
        </div>
        <div>
          <span>X/Twitter Watch</span>
          <strong>fast signal</strong>
          <small>Viral complaints and recent feedback are separated from slower community noise.</small>
        </div>
        <div>
          <span>Filtered Trustpilot</span>
          <strong>suspicious reviews separated</strong>
          <small>Review alerts stay visible next to estimated reliability.</small>
        </div>
        <div>
          <span>Payout Watch</span>
          <strong>operational risk</strong>
          <small>Delays, denials, withdrawal thresholds and closures affect ranking.</small>
        </div>
        <div>
          <span>Commercial conflict</span>
          <strong>affiliate status shown</strong>
          <small>An affiliate firm is not protected by the PropRadar score.</small>
        </div>
      </section>

      <section className="panel comparator-panel" id="tableau">
        <div className="panel-title-row">
          <div>
            <div className="eyebrow">Search</div>
            <h2>Filter the radar</h2>
          </div>
          <span>{activeFilterCount > 0 ? `${activeFilterCount} active filter(s)` : 'Full view'}</span>
        </div>

        <div className="score-legend" aria-label="Score color legend">
          <div className="score-legend-item score-legend-good">
            <strong>Reliable</strong>
            <span>High score, low payout risk, cleaner review profile.</span>
          </div>
          <div className="score-legend-item score-legend-watch">
            <strong>Watchlist</strong>
            <span>Readable, but one or more signals need checking.</span>
          </div>
          <div className="score-legend-item score-legend-risk">
            <strong>High risk</strong>
            <span>Payout, status, review or proof signals require caution.</span>
          </div>
        </div>

        <div className="comparator-upgrade-callout">
          <div>
            <strong>Need a side-by-side decision?</strong>
            <span>Select 2 or 3 firms in the tools page to compare rules, payout, price and trading style without reading every row.</span>
          </div>
          <Link href="/outils#comparatif" className="btn btn-primary">Open side-by-side tool</Link>
        </div>

        <div className="filter-bar">
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field search-field"
          />

          <div className="filter-pills" aria-label="Filter by status">
            {statusFilters.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-pill ${status === item ? 'filter-pill-active' : ''} ${item === 'Active' ? 'pill-green' : item === 'À surveiller' ? 'pill-amber' : item === 'Fermée' ? 'pill-red' : ''}`}
                onClick={() => setStatus(item)}
              >
                {toEnglishText(item)}
              </button>
            ))}
          </div>

          <select value={scoreMin} onChange={(event) => setScoreMin(event.target.value as ScoreFilter)} className="field compact-field" aria-label="Minimum score">
            <option value="Tous">Score min.</option>
            <option value="70">70+</option>
            <option value="80">80+</option>
            <option value="90">90+</option>
          </select>

          <select value={priceMax} onChange={(event) => setPriceMax(event.target.value as PriceFilter)} className="field compact-field" aria-label="Maximum price">
            <option value="Tous">Max price</option>
            <option value="50">50$</option>
            <option value="100">100$</option>
            <option value="200">200$</option>
          </select>

          <select value={drawdown} onChange={(event) => setDrawdown(event.target.value as DrawdownFilter)} className="field compact-field" aria-label="Drawdown">
            <option value="Tous">Max drawdown</option>
            <option value="EOD">EOD</option>
            <option value="Trailing">Trailing</option>
            <option value="Static">Static</option>
            <option value="Hybride">Hybrid</option>
          </select>

          <select value={market} onChange={(event) => setMarket(event.target.value as MarketFilter)} className="field compact-field market-field" aria-label="Market">
            <option value="Tous">All</option>
            <option>Forex</option>
            <option>Futures</option>
            <option value="Actions">Stocks</option>
            <option>Crypto</option>
          </select>
        </div>

        <div className="table-actions">
          <div>
            <strong>{filteredFirms.length} prop firms</strong>
            <span>
              {activeFilterCount > 0 ? `${activeFilterCount} active filter(s). ` : ''}
              Desktop keeps the dense radar. Mobile switches to scan-friendly cards.
            </span>
          </div>
          <button type="button" className="btn table-reset-button" onClick={resetFilters}>Reset</button>
        </div>

        <div className="firm-results-list">
          {filteredFirms.length === 0 ? (
            <div className="empty-state">
              <strong>No prop firm matches these filters.</strong>
              <span>Reset the filters or broaden price, score or market.</span>
              <button type="button" className="btn" onClick={resetFilters}>Reset</button>
            </div>
          ) : filteredFirms.map((firm, index) => (
            <article key={firm.slug} className={`firm-result-card ${rowToneClass(firm)} ${index === 0 ? 'firm-result-featured' : ''}`}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                  <div className="firm-subline">{firm.styles.slice(0, 2).map((style) => toEnglishText(style)).join(' / ')} · {toEnglishText(firm.bestFor)}</div>
                  <div className="strategy-chip-list" aria-label={`Trading styles for ${firm.name}`}>
                    {tradingStyleTags(firm).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>

              <div className="firm-result-score">
                <div className={`score-tile ${scoreClass(firm.score)}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                  <span>Score</span>
                  <strong>{firm.score}</strong>
                  <small>/100</small>
                </div>
                <span className={`badge ${statusClass(firm.status)}`}>{toEnglishText(firm.status)}</span>
              </div>

              <div className="firm-result-metrics">
                <div className="result-metric"><span>Min. price</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
                <div className="result-metric"><span>Drawdown</span><strong>{toEnglishText(firm.drawdownType)}</strong></div>
                <div className="result-metric result-metric-wide"><span>Main product</span><strong>{toEnglishText(firm.products[0]?.name ?? 'Aucun produit actif')}</strong></div>
              </div>

              <div className="firm-result-signals">
                <div className={`signal-chip ${scoreToneClass(firm.reviewSignals.redditScore)}`}>
                  <span>Reddit</span>
                  <SignalDots score={firm.reviewSignals.redditScore} tone={firm.reviewSignals.redditScore >= 75 ? 'green' : firm.reviewSignals.redditScore >= 55 ? 'orange' : 'red'} />
                  <small>+{firm.reviewSignals.redditPositiveMentions ?? 0} / -{firm.reviewSignals.redditNegativeMentions ?? 0}</small>
                </div>
                <div className={`signal-chip ${scoreToneClass(firm.reviewSignals.xScore)}`}>
                  <span>X/Twitter</span>
                  <SignalDots score={firm.reviewSignals.xScore} tone={firm.reviewSignals.xScore >= 75 ? 'green' : firm.reviewSignals.xScore >= 55 ? 'orange' : 'red'} />
                  <small>+{firm.reviewSignals.xPositiveMentions ?? 0} / -{firm.reviewSignals.xNegativeMentions ?? 0}</small>
                </div>
                <div className={`signal-chip ${scoreToneClass(firm.reviewSignals.trustpilotReliabilityScore)}`}>
                  <span>Trustpilot</span>
                  <SignalDots score={firm.reviewSignals.trustpilotReliabilityScore} tone={firm.reviewSignals.trustpilotReliabilityScore >= 75 ? 'green' : firm.reviewSignals.trustpilotReliabilityScore >= 55 ? 'orange' : 'red'} />
                  <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</span>
                  <small>
                    {firm.trustpilotRating ? `${firm.trustpilotRating}/5 raw · ` : ''}
                    {firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0} review alert(s)
                  </small>
                </div>
                <div className={`signal-chip ${riskToneClass(firm.reviewSignals.payoutRiskScore)}`}>
                  <span>Payout</span>
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
                </div>
                <div className={`signal-chip ${riskToneClass(firm.reviewSignals.manipulationRiskScore ?? 50)}`}>
                  <span>Reviews</span>
                  <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>{toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')}</span>
                </div>
              </div>

              <div className="firm-result-action">
                <span className={`badge ${relationshipClass(firm.commercialRelationship)}`}>
                  {firm.commercialRelationship === 'Affiliation transparente' ? 'Affiliate' : 'No conflict'}
                </span>
                <Link href={`/firm/${firm.slug}`} className="btn btn-primary">Open profile</Link>
              </div>

              <div className="firm-mobile-summary" aria-label={`Mobile summary for ${firm.name}`}>
                <div>
                  <span>Score</span>
                  <strong>{firm.score}/100</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{toEnglishText(firm.status)}</strong>
                </div>
                <div>
                  <span>Payout</span>
                  <strong>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong>
                </div>
                <div>
                  <span>Trustpilot</span>
                  <strong>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</strong>
                </div>
                <div>
                  <span>Social signal</span>
                  <strong>Reddit {firm.reviewSignals.redditScore}/100</strong>
                </div>
                <div>
                  <span>From</span>
                  <strong>{formatUsd(firm.priceFrom)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="table-footer">
          <span>{filteredFirms.length} result(s) displayed</span>
          <span>{riskyFirms.length} watchlist firm(s) remain visible in the radar.</span>
        </div>
      </section>
    </main>
  );
}
