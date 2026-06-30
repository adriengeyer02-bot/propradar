'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import FirmLogo from '../components/FirmLogo';
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

type StatusFilter = 'Tous' | 'Active' | 'À surveiller' | 'Fermée';
type MarketFilter = 'Tous' | 'Forex' | 'Futures' | 'Actions';
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

export default function Comparateur() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('Tous');
  const [market, setMarket] = useState<MarketFilter>('Tous');
  const [scoreMin, setScoreMin] = useState<ScoreFilter>('Tous');
  const [priceMax, setPriceMax] = useState<PriceFilter>('Tous');
  const [drawdown, setDrawdown] = useState<DrawdownFilter>('Tous');

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
        .filter((firm) => firm.reviewSignals.redditScore >= 75 && firm.reviewSignals.trustpilotReliability === 'Forte' && firm.reviewSignals.payoutRisk === 'Faible')
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    []
  );

  return (
    <main className="container comparator-page">
      <section className="comparator-hero">
        <h1>Comparateur de Prop Firms</h1>
        <p className="lead">Prop firms, produits, risques et signaux de confiance.</p>

        <div className="comparator-stats">
          <div className="metric metric-wide"><strong>{propFirms.length}</strong><span>firms</span></div>
          <div className="score-cta">
            <span>Score moyen : {averageScore}/100</span>
            <a href="#tableau" className="btn btn-primary">Explorer les firms</a>
          </div>
          <div className="metric metric-wide"><strong>{activeFirms.length}</strong><span>actives</span></div>
        </div>
      </section>

      <section className="signal-dashboard">
        <div className="signal-dashboard-card">
          <div className="eyebrow">Payout Watch</div>
          <h3>Incidents à ne pas ignorer</h3>
          <ul className="compact-signal-list">
            {payoutAlerts.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="signal-dashboard-card">
          <div className="eyebrow">Avis filtrés</div>
          <h3>Risque de signal marketing</h3>
          <ul className="compact-signal-list">
            {reviewWatch.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>{firm.reviewSignals.manipulationRisk}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="signal-dashboard-card">
          <div className="eyebrow">Signal propre</div>
          <h3>Confiance multi-source</h3>
          <ul className="compact-signal-list">
            {strongSignals.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                <span className="badge badge-green">{firm.score}/100</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel comparator-panel" id="tableau">
        <div className="filter-bar">
          <input
            type="search"
            placeholder="Rechercher"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field search-field"
          />

          <div className="filter-pills" aria-label="Filtrer par statut">
            {statusFilters.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-pill ${status === item ? 'filter-pill-active' : ''} ${item === 'Active' ? 'pill-green' : item === 'À surveiller' ? 'pill-amber' : item === 'Fermée' ? 'pill-red' : ''}`}
                onClick={() => setStatus(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <select value={scoreMin} onChange={(event) => setScoreMin(event.target.value as ScoreFilter)} className="field compact-field" aria-label="Score minimum">
            <option value="Tous">Score min.</option>
            <option value="70">70+</option>
            <option value="80">80+</option>
            <option value="90">90+</option>
          </select>

          <select value={priceMax} onChange={(event) => setPriceMax(event.target.value as PriceFilter)} className="field compact-field" aria-label="Prix maximum">
            <option value="Tous">Prix max.</option>
            <option value="50">50$</option>
            <option value="100">100$</option>
            <option value="200">200$</option>
          </select>

          <select value={drawdown} onChange={(event) => setDrawdown(event.target.value as DrawdownFilter)} className="field compact-field" aria-label="Drawdown">
            <option value="Tous">Drawdown max.</option>
            <option value="EOD">EOD</option>
            <option value="Trailing">Trailing</option>
            <option value="Static">Static</option>
            <option value="Hybride">Hybride</option>
          </select>

          <select value={market} onChange={(event) => setMarket(event.target.value as MarketFilter)} className="field compact-field market-field" aria-label="Marché">
            <option>Tous</option>
            <option>Forex</option>
            <option>Futures</option>
            <option>Actions</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Firm</th>
                <th>Statut</th>
                <th>Prix min.</th>
                <th>Score</th>
                <th>Drawdown</th>
                <th>Reddit</th>
                <th>Trustpilot</th>
                <th>Risque payout</th>
                <th>Avis filtrés</th>
                <th>Monétisation</th>
                <th>Produit phare</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFirms.map((firm, index) => (
                <tr key={firm.slug} className={index === 0 ? 'table-row-featured' : undefined}>
                  <td>
                    <div className="firm-cell">
                      <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                      <div>
                        <strong>{firm.name}</strong>
                        <div className="firm-subline">{firm.styles.slice(0, 2).join(' / ')}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`badge ${statusClass(firm.status)}`}>{firm.status}</span></td>
                  <td>{formatUsd(firm.priceFrom)}</td>
                  <td><span className={`badge ${scoreClass(firm.score)}`}>{firm.score}</span></td>
                  <td>{firm.drawdownType}</td>
                  <td><SignalDots score={firm.reviewSignals.redditScore} tone={firm.reviewSignals.redditScore >= 75 ? 'green' : firm.reviewSignals.redditScore >= 55 ? 'orange' : 'red'} /></td>
                  <td>
                    <div className="rating-cell">
                      <SignalDots score={firm.reviewSignals.trustpilotReliabilityScore} tone="orange" />
                      <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{firm.reviewSignals.trustpilotReliability}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</span></td>
                  <td><span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>{firm.reviewSignals.manipulationRisk}</span></td>
                  <td><span className={`badge ${relationshipClass(firm.commercialRelationship)}`}>{firm.commercialRelationship}</span></td>
                  <td>{firm.products[0]?.name ?? 'Aucun produit actif'}</td>
                  <td><Link href={`/firm/${firm.slug}`} className="btn btn-table">Voir la fiche</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>{filteredFirms.length} résultats affichés</span>
          <span>{riskyFirms.length} firms à surveiller restent visibles dans le radar.</span>
        </div>
      </section>
    </main>
  );
}
