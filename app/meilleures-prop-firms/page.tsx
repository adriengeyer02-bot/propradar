import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import {
  formatUsd,
  payoutRiskClass,
  propFirms,
  relationshipClass,
  reviewReliabilityClass,
  scoreClass,
  topFirms,
} from '../lib/propFirms';

export const metadata: Metadata = {
  title: 'Meilleures prop firms fiables',
  description:
    'Classement PropRadar des prop firms les plus solides : score, prix, payout, Trustpilot filtre, Reddit et transparence commerciale.',
  alternates: {
    canonical: '/meilleures-prop-firms',
  },
};

export default function BestPropFirmsPage() {
  const shortlist = topFirms
    .filter((firm) => firm.reviewSignals.payoutRisk !== 'Critique')
    .slice(0, 12);
  const noConflictCount = propFirms.filter((firm) => firm.commercialRelationship === 'Aucune').length;

  return (
    <main className="container guide-page">
      <section className="guide-hero">
        <div>
          <div className="eyebrow">Guide decision</div>
          <h1>Meilleures prop firms fiables selon PropRadar</h1>
          <p className="lead">
            Le bon choix ne se limite pas au prix du challenge. Ce guide classe les firms avec le score PropRadar, le
            risque payout, les avis filtres, les sources et la transparence commerciale.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Ouvrir le comparateur complet</Link>
            <Link href="/risques-payout" className="btn">Voir les risques payout</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{propFirms.length}</strong><span>firms suivies</span></div>
          <div><strong>{shortlist.length}</strong><span>profils solides affiches ici</span></div>
          <div><strong>{noConflictCount}</strong><span>sans lien commercial</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Classement prudent</div>
            <h2>Top firms a comparer en premier</h2>
          </div>
        </div>

        <div className="guide-ranking-list">
          {shortlist.map((firm, index) => (
            <Link href={`/firm/${firm.slug}`} className="guide-ranking-row" key={firm.slug}>
              <span className="guide-rank">{index + 1}</span>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.bestFor}</span>
                </div>
              </div>
              <div><span>Score</span><strong>{firm.score}/100</strong></div>
              <div><span>Prix min.</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
              <div><span>Payout</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</strong></div>
              <div><span>Trustpilot</span><strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{firm.reviewSignals.trustpilotReliability}</strong></div>
              <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">Pourquoi ce classement</div>
          <h2>Un score utile doit punir les zones floues.</h2>
          <ul className="risk-list">
            <li>Une bonne note publique ne suffit pas si les payouts sont contestes.</li>
            <li>Une promo ne compense pas une regle de drawdown ou consistency dangereuse.</li>
            <li>Une affiliation reste visible et ne protege pas le score.</li>
            <li>Les firms fermees ou a surveiller restent dans le radar pour eviter les angles morts.</li>
          </ul>
        </article>
        <article className="panel">
          <div className="eyebrow">Transparence</div>
          <h2>Liens commerciaux visibles</h2>
          <div className="guide-signal-stack">
            {shortlist.slice(0, 6).map((firm) => (
              <Link href={`/firm/${firm.slug}`} key={firm.slug}>
                <span>{firm.name}</span>
                <strong className={`badge ${relationshipClass(firm.commercialRelationship)}`}>
                  {firm.commercialRelationship === 'Affiliation transparente' ? 'Affilie' : 'Aucun conflit'}
                </strong>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
