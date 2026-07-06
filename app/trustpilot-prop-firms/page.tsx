import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import { propFirms, reviewReliabilityClass, scoreClass } from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

export const metadata: Metadata = {
  title: 'Prop firm Trustpilot reviews: how to read them',
  description:
    'PropRadar separates the raw Trustpilot rating from estimated reliability: volume, review alerts, payout incidents and community consistency.',
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
          <div className="eyebrow">Filtered Reviews</div>
          <h1>Trustpilot and prop firms: the raw rating is not enough</h1>
          <p className="lead">
            A prop firm can show a good public rating while still having signals to weigh: invited reviews,
            short history, payout complaints, rule changes or inconsistency with trader feedback.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">View Trustpilot in the comparator</Link>
            <Link href="/audit" className="btn">View proof level</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{propFirms.length}</strong><span>firms tracked</span></div>
          <div><strong>{watchList.length}</strong><span>profiles needing context</span></div>
          <div><strong>{propFirms.filter((firm) => firm.reviewSignals.trustpilotReliability === 'Forte').length}</strong><span>strong reliability</span></div>
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">Method</div>
          <h2>What PropRadar checks</h2>
          <ul className="risk-list">
            <li>Review volume and age, not just the average rating.</li>
            <li>Marketing, invited or overly recent review alerts.</li>
            <li>Consistency with Reddit, forums and payout incidents.</li>
            <li>Official sources and recent rule changes.</li>
          </ul>
        </article>
        <article className="panel">
          <div className="eyebrow">Simple Rule</div>
          <h2>A high rating still needs verification.</h2>
          <p className="lead">
            Trustpilot is a useful signal, but PropRadar treats it as one piece of the file, not final proof of reliability.
          </p>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Review Watchlist</div>
            <h2>Firms where the public rating needs context</h2>
          </div>
        </div>
        <div className="guide-ranking-list">
          {watchList.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="guide-ranking-row trust-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{toEnglishText(firm.reviewSignals.trustpilotNote)}</span>
                </div>
              </div>
              <div><span>Raw rating</span><strong>{firm.trustpilotRating ? `${firm.trustpilotRating}/5` : 'To verify'}</strong></div>
              <div><span>Reviews</span><strong>{firm.reviewSignals.trustpilotReviewCount?.toLocaleString('en-US') ?? 'N/A'}</strong></div>
              <div><span>Alerts</span><strong>{firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0}</strong></div>
              <div><span>Reliability</span><strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</strong></div>
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
