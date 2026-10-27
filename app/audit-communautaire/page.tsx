import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import PageStructuredData from '../components/PageStructuredData';
import { createPageMetadata } from '../lib/pageMetadata';
import { getManualCommunityReview } from '../lib/manualCommunityReviews';
import { propFirms } from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

const COMMUNITY_AUDIT_DESCRIPTION =
  'Review the Reddit and X/Twitter research coverage recorded for each prop firm, with source links and evidence levels kept separate.';

export const metadata = createPageMetadata({
  title: 'Prop Firm Community Audit: Reddit and X Signals',
  description: COMMUNITY_AUDIT_DESCRIPTION,
  path: '/audit-communautaire',
  keywords: ['prop firm Reddit', 'prop firm X reviews', 'prop firm community audit', 'prop firm complaints'],
  category: 'Prop firm community research',
});

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
      <PageStructuredData
        name="Prop firm community audit"
        description={COMMUNITY_AUDIT_DESCRIPTION}
        path="/audit-communautaire"
        breadcrumbLabel="Community audit"
        dateModified="2026-07-13"
        items={reviewRows.slice(0, 20).map(({ firm }) => ({
          name: firm.name,
          path: `/firm/${firm.slug}`,
          description: toEnglishText(firm.verdict),
        }))}
      />
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

      <section className="pr-stat-line" aria-label="Community coverage">
        <dl>
          <div><dt>Firms tracked</dt><dd>{propFirms.length}</dd></div>
          <div><dt>Solid review</dt><dd>{solidCount}</dd></div>
          <div><dt>Partial review</dt><dd>{partialCount}</dd></div>
          <div><dt>Search ready only</dt><dd>{readyCount}</dd></div>
        </dl>
        <div className="pr-coverage-stack" role="img" aria-label={`${solidCount} solid, ${partialCount} partial, ${readyCount} search ready out of ${propFirms.length}`}>
          <span className="pr-tone-good" style={{ width: `${(solidCount / propFirms.length) * 100}%` }} />
          <span className="pr-tone-watch" style={{ width: `${(partialCount / propFirms.length) * 100}%` }} />
          <span className="is-ready" style={{ width: `${(readyCount / propFirms.length) * 100}%` }} />
        </div>
        {solidCount + partialCount === 0 ? (
          <p className="pr-fineprint">
            No firm has a counted Reddit or X review yet. Until posts are opened, classified and linked, the Reddit and X figures on firm pages are editorial estimates and are marked as such.
          </p>
        ) : null}
      </section>

      <section className="section">
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">Register</div>
            <h2>Reddit/X search queues</h2>
          </div>
          <div className="pr-section-meta"><span>Last structure: 2026-07-04</span></div>
        </header>
        <p className="pr-section-lead">Each link opens a live public search, newest posts first. Read the posts yourself: a search is a starting point, not evidence.</p>

        <ul className="pr-search-register">
          {reviewRows.map(({ firm, review }) => (
            <li key={firm.slug}>
              <Link href={`/firm/${firm.slug}#audit`} className="pr-search-register-firm">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <span>
                  <strong>{firm.name}</strong>
                  <small>{toEnglishText(review.coverage)} · score {firm.score}</small>
                </span>
              </Link>
              <span className="pr-search-register-links">
                <span>Reddit</span>
                {review.reddit.sources.slice(0, 2).map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer" title={toEnglishText(source.label)}>{/payout/i.test(source.label) ? 'payouts' : 'reviews'}</a>
                ))}
                <span>X</span>
                {review.x.sources.slice(0, 2).map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer" title={toEnglishText(source.label)}>{/payout/i.test(source.label) ? 'payouts' : 'reviews'}</a>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
