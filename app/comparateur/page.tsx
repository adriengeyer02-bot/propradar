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
  if (!tags.has('Swing') && firm.drawdownType !== 'Trailing') tags.add('Swing à confirmer');
  tags.add('SMC manuel');

  if (firm.newsTrading === 'Autorisé') tags.add('News');
  if (firm.newsTrading === 'Restreint') tags.add('News restreint');
  if (firm.newsTrading === 'Variable') tags.add('News à vérifier');

  if (firm.eaAllowed === 'Oui') tags.add('EA');
  if (firm.eaAllowed === 'Sur demande') tags.add('EA sur demande');
  if (firm.eaAllowed === 'Variable') tags.add('EA à vérifier');

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
            <div className="eyebrow">Radar indépendant</div>
            <h1>Comparateur de Prop Firms</h1>
          <p className="lead">Produits, risques, signaux Reddit, X/Twitter, fiabilité Trustpilot et incidents payout.</p>
        </div>

        <div className="comparator-stats">
          <div className="summary-stat">
            <span>Firms suivies</span>
            <strong>{propFirms.length}</strong>
            <small>Core + universe + {archivedFirmsCount} archives</small>
          </div>
          <div className="summary-stat">
            <span>Actives</span>
            <strong>{activeFirms.length}</strong>
            <small>Marché ouvert</small>
          </div>
          <div className="summary-stat">
            <span>À surveiller</span>
            <strong>{riskyFirms.length}</strong>
            <small>Radar prudent</small>
          </div>
          <div className="summary-score">
            <span>Fiabilite moyenne des resultats</span>
            <strong>{averageScore}/100</strong>
            <small>Calculee sur les firms affichees</small>
            <a href="#tableau" className="btn btn-primary">Voir le tableau</a>
          </div>
        </div>
      </section>

      <section className="signal-dashboard" aria-label="Signaux prioritaires">
        <article className="signal-dashboard-card signal-card-alert">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Payout Watch</div>
              <h3>Incidents à surveiller</h3>
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
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="signal-dashboard-card signal-card-warning">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Avis filtrés</div>
              <h3>Signal marketing</h3>
            </div>
            <span className="signal-card-count">Avis</span>
          </div>
          <ul className="compact-signal-list">
            {reviewWatch.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>{firm.reviewSignals.manipulationRisk ?? 'Moyen'}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="signal-dashboard-card signal-card-positive">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Signal propre</div>
              <h3>Confiance multi-source</h3>
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

      <section className="signal-trustbar" aria-label="Lecture des signaux PropRadar">
        <div>
          <span>Reddit net</span>
          <strong>positif vs négatif</strong>
          <small>Le tableau affiche les mentions positives et négatives, pas seulement une note abstraite.</small>
        </div>
        <div>
          <span>X/Twitter Watch</span>
          <strong>signal rapide</strong>
          <small>Les plaintes virales et retours récents sont séparés du bruit communautaire plus lent.</small>
        </div>
        <div>
          <span>Trustpilot filtré</span>
          <strong>avis suspects séparés</strong>
          <small>Les alertes d’avis restent visibles à côté de la fiabilité estimée.</small>
        </div>
        <div>
          <span>Payout Watch</span>
          <strong>risque opérationnel</strong>
          <small>Retards, refus, seuils de retrait et fermetures pèsent dans le classement.</small>
        </div>
        <div>
          <span>Conflit commercial</span>
          <strong>affiliation affichée</strong>
          <small>Une firm affiliée n’est pas protégée par le score PropRadar.</small>
        </div>
      </section>

      <section className="panel comparator-panel" id="tableau">
        <div className="panel-title-row">
          <div>
            <div className="eyebrow">Recherche</div>
            <h2>Filtrer le radar</h2>
          </div>
          <span>{activeFilterCount > 0 ? `${activeFilterCount} filtre(s) actif(s)` : 'Vue complète'}</span>
        </div>

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
            <option>Crypto</option>
          </select>
        </div>

        <div className="table-actions">
          <div>
            <strong>{filteredFirms.length} prop firms</strong>
            <span>
              {activeFilterCount > 0 ? `${activeFilterCount} filtre(s) actif(s). ` : ''}
              Sur mobile, le tableau se fait glisser horizontalement pour garder les signaux comparables.
            </span>
          </div>
          <button type="button" className="btn table-reset-button" onClick={resetFilters}>Réinitialiser</button>
        </div>

        <div className="firm-results-list">
          {filteredFirms.length === 0 ? (
            <div className="empty-state">
              <strong>Aucune prop firm ne correspond à ces filtres.</strong>
              <span>Réinitialise les filtres ou élargis le prix, score ou marché.</span>
              <button type="button" className="btn" onClick={resetFilters}>Réinitialiser</button>
            </div>
          ) : filteredFirms.map((firm, index) => (
            <article key={firm.slug} className={`firm-result-card ${rowToneClass(firm)} ${index === 0 ? 'firm-result-featured' : ''}`}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                  <div className="firm-subline">{firm.styles.slice(0, 2).join(' / ')} · {firm.bestFor}</div>
                  <div className="strategy-chip-list" aria-label={`Styles de trading pour ${firm.name}`}>
                    {tradingStyleTags(firm).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>

              <div className="firm-result-score">
                <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
                <span className={`badge ${statusClass(firm.status)}`}>{firm.status}</span>
              </div>

              <div className="firm-result-metrics">
                <div className="result-metric"><span>Prix min.</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
                <div className="result-metric"><span>Drawdown</span><strong>{firm.drawdownType}</strong></div>
                <div className="result-metric result-metric-wide"><span>Produit phare</span><strong>{firm.products[0]?.name ?? 'Aucun produit actif'}</strong></div>
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
                  <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{firm.reviewSignals.trustpilotReliability}</span>
                  <small>
                    {firm.trustpilotRating ? `${firm.trustpilotRating}/5 brut · ` : ''}
                    {firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0} alerte(s) avis
                  </small>
                </div>
                <div className={`signal-chip ${riskToneClass(firm.reviewSignals.payoutRiskScore)}`}>
                  <span>Payout</span>
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</span>
                </div>
                <div className={`signal-chip ${riskToneClass(firm.reviewSignals.manipulationRiskScore ?? 50)}`}>
                  <span>Avis</span>
                  <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>{firm.reviewSignals.manipulationRisk ?? 'Moyen'}</span>
                </div>
              </div>

              <div className="firm-result-action">
                <span className={`badge ${relationshipClass(firm.commercialRelationship)}`}>
                  {firm.commercialRelationship === 'Affiliation transparente' ? 'Affilié' : 'Aucun conflit'}
                </span>
                <Link href={`/firm/${firm.slug}`} className="btn btn-primary">Voir la fiche</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="table-footer">
          <span>{filteredFirms.length} résultats affichés</span>
          <span>{riskyFirms.length} firms à surveiller restent visibles dans le radar.</span>
        </div>
      </section>
    </main>
  );
}
