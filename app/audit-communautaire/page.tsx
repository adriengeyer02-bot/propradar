import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import { getManualCommunityReview, manualCoverageClass } from '../lib/manualCommunityReviews';
import { propFirms, scoreClass, statusClass } from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

export const metadata: Metadata = {
  title: 'Reddit and X community audit',
  description:
    'Manual collection table for Reddit and X/Twitter signals for each prop firm tracked by PropRadar.',
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
          <div className="eyebrow">Community Audit</div>
          <h1>Reddit and X/Twitter, firm by firm</h1>
          <p className="lead">
            This page is a collection register. A ready search does not replace proof: posts must be opened, classified and linked before becoming a partial or solid review.
          </p>
          <div className="actions">
            <Link href="/audit" className="btn">Global audit</Link>
            <Link href="/comparateur" className="btn btn-primary">Compare</Link>
          </div>
        </div>
        <div className="panel audit-method-panel">
          <div className="eyebrow">Proof Rule</div>
          <ol>
            <li>Do not count a post without a verifiable public link.</li>
            <li>Separate complaint, payout proof, neutral review and marketing noise.</li>
            <li>Do not claim “searched everywhere” if X or Reddit blocks results.</li>
            <li>Update the date and coverage level at each review.</li>
          </ol>
        </div>
      </section>

      <section className="audit-stat-grid" aria-label="Community coverage">
        <div className="summary-stat">
          <span>Firms tracked</span>
          <strong>{propFirms.length}</strong>
          <small>to audit</small>
        </div>
        <div className="summary-stat">
          <span>Solid review</span>
          <strong>{solidCount}</strong>
          <small>linked posts</small>
        </div>
        <div className="summary-stat">
          <span>Partial review</span>
          <strong>{partialCount}</strong>
          <small>opened sample</small>
        </div>
        <div className="summary-stat">
          <span>Search ready</span>
          <strong>{readyCount}</strong>
          <small>generated links</small>
        </div>
      </section>

      <section className="section">
        <div className="panel audit-list-panel">
          <div className="panel-title-row">
            <div>
              <div className="eyebrow">Register</div>
              <h2>Reddit/X search queues</h2>
            </div>
            <span>Last structure: 2026-07-04</span>
          </div>

          <div className="community-audit-list">
            {reviewRows.map(({ firm, review }) => (
              <article className="community-audit-row" key={firm.slug}>
                <div className="audit-firm-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <div>
                    <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                    <span>{toEnglishText(firm.bestFor)}</span>
                  </div>
                </div>

                <div className="community-audit-status">
                  <span className={`badge ${manualCoverageClass(review.coverage)}`}>{toEnglishText(review.coverage)}</span>
                  <span className={`badge ${statusClass(firm.status)}`}>{toEnglishText(firm.status)}</span>
                  <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                    <span>Score</span>
                    <strong>{firm.score}</strong>
                    <small>/100</small>
                  </div>
                </div>

                <div className="community-audit-links">
                  <strong>Reddit</strong>
                  {review.reddit.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{toEnglishText(source.label)}</a>
                  ))}
                </div>

                <div className="community-audit-links">
                  <strong>X/Twitter</strong>
                  {review.x.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{toEnglishText(source.label)}</a>
                  ))}
                </div>

                <Link href={`/firm/${firm.slug}#audit`} className="btn">Profile</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
