'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  formatUsd,
  payoutRiskClass,
  propFirms,
  relationshipClass,
  reviewReliabilityClass,
  scoreClass,
  statusClass,
} from '../lib/propFirms';

type StatusFilter = 'Tous' | 'Active' | 'À surveiller' | 'Fermée';
type MarketFilter = 'Tous' | 'Forex' | 'Futures' | 'Actions';

export default function Comparateur() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('Tous');
  const [market, setMarket] = useState<MarketFilter>('Tous');

  const filteredFirms = useMemo(() => {
    return propFirms
      .filter((firm) => {
        const matchesSearch =
          firm.name.toLowerCase().includes(search.toLowerCase()) ||
          firm.bestFor.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === 'Tous' || firm.status === status;
        const matchesMarket = market === 'Tous' || firm.styles.some((style) => style.toLowerCase().includes(market.toLowerCase()));
        return matchesSearch && matchesStatus && matchesMarket;
      })
      .sort((a, b) => b.score - a.score);
  }, [market, search, status]);

  return (
    <main className="container section">
      <div className="grid-2" style={{ alignItems: 'end', marginBottom: 24 }}>
        <div>
          <div className="eyebrow">Comparateur principal</div>
          <h1>Prop firms, produits, risques et signaux de confiance.</h1>
          <p className="lead">
            Filtre les firms par statut ou marché, puis ouvre une fiche pour voir les produits, règles, sources et points de vigilance.
          </p>
        </div>
        <div className="panel">
          <div className="metric-grid">
            <div className="metric"><strong>{propFirms.length}</strong><span>firms</span></div>
            <div className="metric"><strong>{filteredFirms.length}</strong><span>résultats</span></div>
            <div className="metric"><strong>{Math.round(filteredFirms.reduce((sum, firm) => sum + firm.score, 0) / Math.max(filteredFirms.length, 1))}</strong><span>score moyen</span></div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="toolbar">
          <input
            type="search"
            placeholder="Rechercher une firm, un style, un usage..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field"
          />
          <select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)} className="field" aria-label="Filtrer par statut">
            <option>Tous</option>
            <option>Active</option>
            <option>À surveiller</option>
            <option>Fermée</option>
          </select>
          <select value={market} onChange={(event) => setMarket(event.target.value as MarketFilter)} className="field" aria-label="Filtrer par marché">
            <option>Tous</option>
            <option>Forex</option>
            <option>Futures</option>
            <option>Actions</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Firm</th>
                <th>Score</th>
                <th>Statut</th>
                <th>Prix min.</th>
                <th>Split</th>
                <th>Drawdown</th>
                <th>Reddit</th>
                <th>Trustpilot</th>
                <th>Risque payout</th>
                <th>Monétisation</th>
                <th>Produit phare</th>
                <th>Fiche</th>
              </tr>
            </thead>
            <tbody>
              {filteredFirms.map((firm) => (
                <tr key={firm.slug}>
                  <td>
                    <div className="firm-cell">
                      {firm.logoDomain ? (
                        <img src={`https://logo.clearbit.com/${firm.logoDomain}`} alt="" className="logo" />
                      ) : (
                        <span className="logo fallback-logo">{firm.name.slice(0, 2)}</span>
                      )}
                      <div>
                        <strong>{firm.name}</strong>
                        <div className="muted">{firm.bestFor}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span></td>
                  <td><span className={`badge ${statusClass(firm.status)}`}>{firm.status}</span></td>
                  <td>{formatUsd(firm.priceFrom)}</td>
                  <td>{firm.profitSplit > 0 ? `${firm.profitSplit}%` : 'N/A'}</td>
                  <td>{firm.drawdownType}</td>
                  <td><span className={`badge ${scoreClass(firm.reviewSignals.redditScore)}`}>{firm.reviewSignals.redditScore}/100</span></td>
                  <td><span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{firm.reviewSignals.trustpilotReliability}</span></td>
                  <td><span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</span></td>
                  <td><span className={`badge ${relationshipClass(firm.commercialRelationship)}`}>{firm.commercialRelationship}</span></td>
                  <td>{firm.products[0]?.name ?? 'Aucun produit actif'}</td>
                  <td><Link href={`/firm/${firm.slug}`} className="btn">Voir</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
