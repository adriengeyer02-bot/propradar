import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import PageStructuredData from '../components/PageStructuredData';
import { createPageMetadata } from '../lib/pageMetadata';
import type { PropFirm } from '../lib/propFirms';
import {
  auditStatusClass,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  reviewReliabilityClass,
  scoreClass,
} from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

const TRUSTPILOT_DESCRIPTION =
  'Compare raw prop-firm Trustpilot ratings with review alerts, payout incidents, legal checks, source depth and wider community evidence.';

export const metadata = createPageMetadata({
  title: 'Prop Firm Trustpilot Reviews: Ratings vs Evidence',
  description: TRUSTPILOT_DESCRIPTION,
  path: '/trustpilot-prop-firms',
  keywords: ['prop firm Trustpilot', 'prop firm reviews', 'fake Trustpilot reviews', 'reliable prop firm'],
  category: 'Prop firm review research',
});

function legalSourceCount(firm: PropFirm) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function sourceDepthLabel(firm: PropFirm) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'Deep sources';
  if (count >= 3) return 'Usable sources';
  if (count >= 1) return 'Thin sources';
  return 'No sources';
}

function sourceDepthClass(firm: PropFirm) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'badge-green';
  if (count >= 2) return 'badge-amber';
  return 'badge-red';
}

function isLegalWatchFirm(firm: PropFirm) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

export default function TrustpilotGuidePage() {
  const watchList = [...propFirms]
    .filter((firm) => (firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0) > 0 || firm.reviewSignals.trustpilotReliability !== 'Forte')
    .sort((a, b) => (b.reviewSignals.trustpilotFlaggedReviewCount ?? 0) - (a.reviewSignals.trustpilotFlaggedReviewCount ?? 0))
    .slice(0, 24);
  const strongReliabilityCount = propFirms.filter((firm) => firm.reviewSignals.trustpilotReliability === 'Forte').length;
  const reviewAlertCount = propFirms.filter((firm) => (firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0) > 0).length;
  const deepSourceCount = propFirms.filter((firm) => legalSourceCount(firm) >= 5).length;
  const legalWatchReviewCount = watchList.filter(isLegalWatchFirm).length;
  const payoutWatchReviewCount = watchList.filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible').length;
  const highRatingNeedsContext = [...propFirms]
    .filter((firm) => (firm.trustpilotRating ?? 0) >= 4.5 && (firm.reviewSignals.payoutRisk !== 'Faible' || isLegalWatchFirm(firm)))
    .sort((a, b) => (b.trustpilotRating ?? 0) - (a.trustpilotRating ?? 0))
    .slice(0, 8);

  return (
    <main className="container guide-page">
      <PageStructuredData
        name="Prop firm Trustpilot review research"
        description={TRUSTPILOT_DESCRIPTION}
        path="/trustpilot-prop-firms"
        breadcrumbLabel="Trustpilot reviews"
        dateModified="2026-07-13"
        items={watchList.map((firm) => ({
          name: firm.name,
          path: `/firm/${firm.slug}`,
          description: `Trustpilot reliability ${toEnglishText(firm.reviewSignals.trustpilotReliability).toLowerCase()}. ${toEnglishText(firm.verdict)}`,
        }))}
      />
      <section className="guide-hero">
        <div>
          <div className="eyebrow">Filtered Reviews</div>
          <h1>Trustpilot and prop firms: the raw rating is not enough</h1>
          <p className="lead">
            A prop firm can show a good public rating while still having signals to weigh: invited reviews,
            short history, payout complaints, legal opacity, rule changes or inconsistency with trader feedback.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">View Trustpilot in the comparator</Link>
            <Link href="/audit" className="btn">View proof level</Link>
            <Link href="/risques-payout" className="btn">Check payout risk</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{propFirms.length}</strong><span>firms tracked</span></div>
          <div><strong>{watchList.length}</strong><span>profiles needing context</span></div>
          <div><strong>{strongReliabilityCount}</strong><span>strong reliability</span></div>
          <div><strong>{deepSourceCount}</strong><span>deep source files</span></div>
        </div>
      </section>

      <section className="page-insight-strip" aria-label="Trustpilot reading summary">
        <Link href="#review-watchlist">
          <span>Needs context</span>
          <strong>{watchList.length}</strong>
          <small>Profiles where the raw rating is not enough.</small>
        </Link>
        <Link href="/comparateur">
          <span>Strong reliability</span>
          <strong>{strongReliabilityCount}</strong>
          <small>Still cross-check with payout and rule signals.</small>
        </Link>
        <Link href="/risques-payout">
          <span>Review alerts</span>
          <strong>{reviewAlertCount}</strong>
          <small>Review warnings do not replace payout checks.</small>
        </Link>
        <Link href="/risques-payout">
          <span>Payout overlap</span>
          <strong>{payoutWatchReviewCount}</strong>
          <small>Watchlist profiles where reviews and payout risk must be read together.</small>
        </Link>
        <Link href="/audit">
          <span>Legal overlap</span>
          <strong>{legalWatchReviewCount}</strong>
          <small>Review watchlist profiles with fragile legal or source signals.</small>
        </Link>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">Method</div>
          <h2>What PropRadar checks</h2>
          <ul className="risk-list">
            <li>Review volume and age, not just the average rating.</li>
            <li>Marketing, invited or overly recent review alerts.</li>
            <li>Consistency with Reddit, forums and payout incidents.</li>
            <li>Official sources, legal entity checks and recent rule changes.</li>
          </ul>
        </article>
        <article className="panel">
          <div className="eyebrow">Simple Rule</div>
          <h2>A high rating still needs verification.</h2>
          <p className="lead">
            Trustpilot is a useful signal, but PropRadar treats it as one piece of the file, not final proof of reliability.
          </p>
        </article>
        <article className="panel">
          <div className="eyebrow">Good rating, still check</div>
          <h2>High stars with caution signals</h2>
          <div className="guide-signal-stack">
            {(highRatingNeedsContext.length ? highRatingNeedsContext : watchList.slice(0, 8)).map((firm) => (
              <Link href={`/firm/${firm.slug}`} key={firm.slug}>
                <span>{firm.name}</span>
                <span className="guide-signal-stack-meta">
                  <strong>{firm.trustpilotRating ? `${firm.trustpilotRating}/5` : 'N/A'}</strong>
                  <small>{firm.reviewSignals.payoutRisk !== 'Faible' ? `Payout ${toEnglishText(firm.reviewSignals.payoutRisk)}` : firm.regulatoryAudit.riskLevel}</small>
                </span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="section" id="review-watchlist">
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
                  <div className="ranking-proof-chips" aria-label={`${firm.name} Trustpilot proof context`}>
                    <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                      Payout {toEnglishText(firm.reviewSignals.payoutRisk)}
                    </span>
                    <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                      Legal {firm.regulatoryAudit.riskLevel}
                    </span>
                    <span className={`badge ${sourceDepthClass(firm)}`}>
                      {sourceDepthLabel(firm)}
                    </span>
                  </div>
                </div>
              </div>
              <div><span>Raw rating</span><strong>{firm.trustpilotRating ? `${firm.trustpilotRating}/5` : 'To verify'}</strong></div>
              <div><span>Reviews</span><strong>{firm.reviewSignals.trustpilotReviewCount?.toLocaleString('en-US') ?? 'N/A'}</strong></div>
              <div><span>Alerts</span><strong>{firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0}</strong></div>
              <div>
                <span>Reliability</span>
                <strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</strong>
                <small>{legalSourceCount(firm)} source link(s)</small>
                <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{toEnglishText(firm.auditStatus)}</span>
              </div>
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
