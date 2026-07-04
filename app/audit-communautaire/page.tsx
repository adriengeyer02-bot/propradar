import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import { getManualCommunityReview, manualCoverageClass } from '../lib/manualCommunityReviews';
import { propFirms, scoreClass, statusClass } from '../lib/propFirms';

export const metadata: Metadata = {
  title: 'Audit communautaire Reddit et X',
  description:
    'Tableau de collecte manuelle des signaux Reddit et X/Twitter pour chaque prop firm suivie par PropRadar.',
};

const reviewRows = propFirms.map((firm) => ({
  firm,
  review: getManualCommunityReview(firm),
}));

const solidCount = reviewRows.filter((row) => row.review.coverage === 'Revue solide').length;
const partialCount = reviewRows.filter((row) => row.review.coverage === 'Revue partielle').length;
const readyCount = reviewRows.filter((row) => row.review.coverage === 'Recherche prête').length;

export default function CommunityAuditPage() {
  return (
    <main className="container audit-page community-audit-page">
      <section className="audit-hero">
        <div>
          <div className="eyebrow">Audit communautaire</div>
          <h1>Reddit et X/Twitter, firme par firme</h1>
          <p className="lead">
            Cette page sert de registre de collecte. Une recherche prête ne remplace pas une preuve : les posts doivent être ouverts, classés et reliés avant de devenir une revue partielle ou solide.
          </p>
          <div className="actions">
            <Link href="/audit" className="btn">Audit global</Link>
            <Link href="/comparateur" className="btn btn-primary">Comparer</Link>
          </div>
        </div>
        <div className="panel audit-method-panel">
          <div className="eyebrow">Règle de preuve</div>
          <ol>
            <li>Ne pas compter un post sans lien public vérifiable.</li>
            <li>Séparer plainte, preuve de payout, avis neutre et bruit marketing.</li>
            <li>Ne pas annoncer “fouillé partout” si X ou Reddit bloque des résultats.</li>
            <li>Mettre à jour la date et le niveau de couverture à chaque revue.</li>
          </ol>
        </div>
      </section>

      <section className="audit-stat-grid" aria-label="Couverture communautaire">
        <div className="summary-stat">
          <span>Firms suivies</span>
          <strong>{propFirms.length}</strong>
          <small>à auditer</small>
        </div>
        <div className="summary-stat">
          <span>Revue solide</span>
          <strong>{solidCount}</strong>
          <small>posts reliés</small>
        </div>
        <div className="summary-stat">
          <span>Revue partielle</span>
          <strong>{partialCount}</strong>
          <small>échantillon ouvert</small>
        </div>
        <div className="summary-stat">
          <span>Recherche prête</span>
          <strong>{readyCount}</strong>
          <small>liens générés</small>
        </div>
      </section>

      <section className="section">
        <div className="panel audit-list-panel">
          <div className="panel-title-row">
            <div>
              <div className="eyebrow">Registre</div>
              <h2>Files de recherche Reddit/X</h2>
            </div>
            <span>Dernière structure : 2026-07-04</span>
          </div>

          <div className="community-audit-list">
            {reviewRows.map(({ firm, review }) => (
              <article className="community-audit-row" key={firm.slug}>
                <div className="audit-firm-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <div>
                    <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                    <span>{firm.bestFor}</span>
                  </div>
                </div>

                <div className="community-audit-status">
                  <span className={`badge ${manualCoverageClass(review.coverage)}`}>{review.coverage}</span>
                  <span className={`badge ${statusClass(firm.status)}`}>{firm.status}</span>
                  <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
                </div>

                <div className="community-audit-links">
                  <strong>Reddit</strong>
                  {review.reddit.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
                  ))}
                </div>

                <div className="community-audit-links">
                  <strong>X/Twitter</strong>
                  {review.x.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
                  ))}
                </div>

                <Link href={`/firm/${firm.slug}#audit`} className="btn">Fiche</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
