import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import {
  formatUsd,
  payoutRiskClass,
  propFirms,
  scoreClass,
  statusClass,
} from '../lib/propFirms';

export const metadata: Metadata = {
  title: 'Règles et changements des prop firms',
  description:
    'Suivi des règles sensibles des prop firms : drawdown, news trading, EA, cohérence, payouts et changements récents détectés par PropRadar.',
};

const ruleFamilies = [
  {
    title: 'Drawdown',
    label: 'Ce qui change le plus le risque',
    text: 'Trailing, EOD, static ou hybride : la même taille de compte peut être beaucoup plus dure selon la méthode de calcul.',
  },
  {
    title: 'News trading',
    label: 'À contrôler avant chaque challenge',
    text: 'Certaines firms autorisent les news, d’autres bloquent les entrées/sorties autour des annonces ou appliquent des restrictions au payout.',
  },
  {
    title: 'EA, copy trading et HFT',
    label: 'Zone grise fréquente',
    text: 'Les robots, copieurs, latence, martingale ou arbitrage peuvent être acceptés, limités ou interdits selon le programme.',
  },
  {
    title: 'Payout et cohérence',
    label: 'Le vrai test de confiance',
    text: 'Délais, fréquence, KYC, seuils, consistency rule et règles de retrait pèsent plus lourd qu’un split marketing.',
  },
];

function countBy<T extends string>(values: T[]) {
  return values.reduce<Record<T, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
}

export default function RulesPage() {
  const allChangedFirms = propFirms
    .filter((firm) => firm.recentRuleChange || firm.incidents >= 4 || firm.status === 'Fermée')
    .sort((a, b) => Number(b.status === 'Fermée') - Number(a.status === 'Fermée') || b.incidents - a.incidents || b.score - a.score);
  const changedFirms = allChangedFirms.slice(0, 18);

  const strictNewsCount = propFirms.filter((firm) => firm.newsTrading === 'Restreint' || firm.newsTrading === 'Non recommandé').length;
  const variableEaCount = propFirms.filter((firm) => firm.eaAllowed === 'Variable' || firm.eaAllowed === 'Sur demande').length;
  const drawdownCounts = countBy(propFirms.map((firm) => firm.drawdownType));
  const activeRuleRows = propFirms
    .filter((firm) => firm.status !== 'Fermée')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 16);

  return (
    <main className="container rules-page">
      <section className="rules-hero">
        <div>
          <div className="eyebrow">Règles & changements</div>
          <h1>Les conditions qui changent vraiment le risque.</h1>
          <p className="lead">
            PropRadar sépare les promesses commerciales des règles qui peuvent bloquer un challenge ou un payout :
            drawdown, news trading, EA, cohérence, délais de retrait et changements récents.
          </p>
        </div>
        <div className="rules-hero-panel">
          <div className="summary-stat">
            <span>Firms suivies</span>
            <strong>{propFirms.length}</strong>
            <small>Base PropRadar</small>
          </div>
          <div className="summary-stat">
            <span>Changements / alertes</span>
            <strong>{allChangedFirms.length}</strong>
            <small>À relire avant achat</small>
          </div>
        </div>
      </section>

      <section className="rules-stat-strip" aria-label="Statistiques de règles">
        <div className="rule-stat">
          <span>News strictes</span>
          <strong>{strictNewsCount}</strong>
          <small>Restreint ou non recommandé</small>
        </div>
        <div className="rule-stat">
          <span>EA à vérifier</span>
          <strong>{variableEaCount}</strong>
          <small>Variable ou sur demande</small>
        </div>
        <div className="rule-stat">
          <span>Drawdown hybride</span>
          <strong>{drawdownCounts.Hybride ?? 0}</strong>
          <small>Règles souvent plus complexes</small>
        </div>
        <div className="rule-stat">
          <span>Trailing</span>
          <strong>{drawdownCounts.Trailing ?? 0}</strong>
          <small>À surveiller sur futures</small>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Cartographie</div>
            <h2>Les familles de règles à lire en priorité.</h2>
          </div>
        </div>
        <div className="rule-family-grid">
          {ruleFamilies.map((rule) => (
            <article className="card rule-family-card" key={rule.title}>
              <span>{rule.label}</span>
              <h3>{rule.title}</h3>
              <p className="muted">{rule.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Changements détectés</div>
            <h2>Les fiches à relire avant de payer un challenge.</h2>
          </div>
          <Link href="/comparateur" className="btn">Retour au comparateur</Link>
        </div>

        <div className="rule-change-list">
          {changedFirms.map((firm) => (
            <article className="rule-change-card" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                  <div className="firm-subline">
                    Dernière revue : {firm.lastReviewed} · {firm.reviewSignals.payoutIncidentStatus}
                  </div>
                </div>
              </div>
              <div className="rule-change-badges">
                <span className={`badge ${statusClass(firm.status)}`}>{firm.status}</span>
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>Payout {firm.reviewSignals.payoutRisk}</span>
                {firm.recentRuleChange ? <span className="badge badge-amber">Règle récente</span> : null}
              </div>
              <p className="muted">{firm.incidentsDetails[0] ?? firm.verdict}</p>
              <div className="rule-mini-grid">
                <div><span>Drawdown</span><strong>{firm.drawdownType}</strong></div>
                <div><span>News</span><strong>{firm.newsTrading}</strong></div>
                <div><span>EA</span><strong>{firm.eaAllowed}</strong></div>
                <div><span>Payout</span><strong>{firm.payoutDelay}</strong></div>
              </div>
              <div className="rule-card-actions">
                <Link href={`/firm/${firm.slug}`} className="btn btn-primary">Voir la fiche</Link>
                {firm.sources[0] ? (
                  <a href={firm.sources[0].url} target="_blank" rel="noreferrer" className="btn">Source</a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Matrice rapide</div>
            <h2>Comparer les règles sensibles des firms actives.</h2>
          </div>
        </div>
        <div className="rules-matrix">
          {activeRuleRows.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="rules-matrix-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{formatUsd(firm.priceFrom)} · score {firm.score}/100</span>
                </div>
              </div>
              <div><span>Drawdown</span><strong>{firm.drawdownType}</strong></div>
              <div><span>News</span><strong>{firm.newsTrading}</strong></div>
              <div><span>EA</span><strong>{firm.eaAllowed}</strong></div>
              <div><span>Payout</span><strong>{firm.reviewSignals.payoutRisk}</strong></div>
              <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
