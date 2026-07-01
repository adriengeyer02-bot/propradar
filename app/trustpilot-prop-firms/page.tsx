import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import { propFirms, reviewReliabilityClass, scoreClass } from '../lib/propFirms';

export const metadata: Metadata = {
  title: 'Avis Trustpilot prop firms : comment les lire',
  description:
    'PropRadar separe la note Trustpilot brute de sa fiabilite estimee : volume, alertes avis, incidents payout et coherence communautaire.',
  alternates: {
    canonical: '/trustpilot-prop-firms',
  },
};

export default function TrustpilotGuidePage() {
  const watchList = [...propFirms]
    .filter((firm) => (firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0) > 0 || firm.reviewSignals.trustpilotReliability !== 'Forte')
    .sort((a, b) => (b.reviewSignals.trustpilotFlaggedReviewCount ?? 0) - (a.reviewSignals.trustpilotFlaggedReviewCount ?? 0))
    .slice(0, 24);

  return (
    <main className="container guide-page">
      <section className="guide-hero">
        <div>
          <div className="eyebrow">Avis filtres</div>
          <h1>Trustpilot et prop firms : la note brute ne suffit pas</h1>
          <p className="lead">
            Une prop firm peut afficher une bonne note publique tout en ayant des signaux a ponderer : avis invites,
            historique court, plaintes payout, changements de regles ou incoherence avec les retours traders.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Voir Trustpilot dans le comparateur</Link>
            <Link href="/audit" className="btn">Voir le niveau de preuve</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{propFirms.length}</strong><span>firms suivies</span></div>
          <div><strong>{watchList.length}</strong><span>dossiers a ponderer</span></div>
          <div><strong>{propFirms.filter((firm) => firm.reviewSignals.trustpilotReliability === 'Forte').length}</strong><span>fiabilite forte</span></div>
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">Methode</div>
          <h2>Ce que PropRadar regarde</h2>
          <ul className="risk-list">
            <li>Volume et anciennete des avis, pas seulement la moyenne.</li>
            <li>Alertes d avis marketing, invites ou trop recents.</li>
            <li>Coherence avec Reddit, forums et incidents payout.</li>
            <li>Sources officielles et changements de regles recents.</li>
          </ul>
        </article>
        <article className="panel">
          <div className="eyebrow">Regle simple</div>
          <h2>Une note elevee doit etre verifiee.</h2>
          <p className="lead">
            Trustpilot est un signal utile, mais PropRadar le traite comme une piece du dossier, pas comme une preuve
            finale de fiabilite.
          </p>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Watchlist avis</div>
            <h2>Firms ou la note publique demande du contexte</h2>
          </div>
        </div>
        <div className="guide-ranking-list">
          {watchList.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="guide-ranking-row trust-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.reviewSignals.trustpilotNote}</span>
                </div>
              </div>
              <div><span>Note brute</span><strong>{firm.trustpilotRating ? `${firm.trustpilotRating}/5` : 'A verifier'}</strong></div>
              <div><span>Avis</span><strong>{firm.reviewSignals.trustpilotReviewCount?.toLocaleString('fr-FR') ?? 'N/A'}</strong></div>
              <div><span>Alertes</span><strong>{firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0}</strong></div>
              <div><span>Fiabilite</span><strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{firm.reviewSignals.trustpilotReliability}</strong></div>
              <span className={`badge ${scoreClass(firm.reviewSignals.trustpilotReliabilityScore)}`}>
                {firm.reviewSignals.trustpilotReliabilityScore}/100
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
