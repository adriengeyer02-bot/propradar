import Link from 'next/link';
import FirmLogo from '../../components/FirmLogo';
import PageStructuredData from '../../components/PageStructuredData';
import { createPageMetadata } from '../../lib/pageMetadata';
import type { PropFirm } from '../../lib/propFirms';
import {
  auditStatusClass,
  hasReviewEvidence,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  reviewReliabilityClass,
  scoreClass,
  hasPayoutRiskSignal,
} from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';

const TRUSTPILOT_DESCRIPTION =
  'Which prop firms have their Trustpilot rating withheld for a guideline breach, with the dated notice for each, and how raw ratings compare with payout and legal evidence.';

/** Trustpilot's own page on what happens when a business breaches its guidelines. */
const TRUSTPILOT_ACTION_URL = 'https://corporate.trustpilot.com/legal/for-everyone/action-we-take';

type WithheldRow = { firm: PropFirm; checked?: string; url?: string; fakeReviews: boolean };

function withheldRows(): WithheldRow[] {
  return propFirms
    .filter((firm) => firm.reviewSignals.trustpilotRatingWithheld)
    .map((firm) => {
      const note = firm.reviewSignals.trustpilotFlaggedReviewNote ?? '';
      const checked = note.match(/\d{4}-\d{2}-\d{2}/)?.[0];
      const url =
        note.match(/https:\/\/[^\s)]+/)?.[0]?.replace(/[.,]$/, '') ??
        firm.reviewSignals.trustpilotSourceUrl ??
        firm.sources.find((source) => /trustpilot\./i.test(source.url))?.url;
      return { firm, checked, url, fakeReviews: /fake reviews|reviews were removed/i.test(note) };
    })
    .sort((a, b) => b.firm.score - a.firm.score);
}

export const metadata = createPageMetadata({
  title: 'Prop Firm Trustpilot Reviews: Ratings, Withheld Scores & Evidence',
  description: TRUSTPILOT_DESCRIPTION,
  path: '/trustpilot-prop-firms',
  keywords: ['prop firm Trustpilot', 'prop firm reviews', 'fake Trustpilot reviews', 'Trustpilot rating withheld', 'Trustpilot rating unavailable breach of guidelines', 'reliable prop firm'],
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
  const withheld = withheldRows();
  const withheldOpen = withheld.filter((row) => row.firm.status !== 'Fermée');
  const withheldActive = withheld.filter((row) => row.firm.status === 'Active');
  const withheldFake = withheld.filter((row) => row.fakeReviews);
  const latestCheck = withheld.map((row) => row.checked ?? '').sort().at(-1) || '2026-10-30';
  const trustpilotFaq = [
    {
      question: 'What does "rating unavailable due to a breach of our guidelines" mean on Trustpilot?',
      answer:
        'Trustpilot shows this notice when it has placed a Consumer Warning on a business profile. Trustpilot says that while the warning is active the TrustScore and star rating are hidden, the business keeps only minimal account features and the score is no longer shared with third parties such as search engines. The warning usually stays about six months.',
    },
    {
      question: 'How many prop firms have a withheld Trustpilot rating?',
      answer: `${withheldOpen.length} open prop firms tracked by PropRadar showed no TrustScore and a guideline-breach notice when their Trustpilot page was last checked (latest check ${latestCheck}). ${withheldFake.length} of them also carried Trustpilot's notice that it removed fake reviews. Each firm page links the Trustpilot profile and the date it was read.`,
    },
    {
      question: 'Does a withheld Trustpilot rating mean a prop firm does not pay?',
      answer:
        "No. The notice is about how the firm used Trustpilot, not about payouts. PropRadar records it as a dated incident and lowers the review-reliability part of the score; payout risk is judged separately, from sourced payout incidents and proof. Check the firm's payout and legal file before buying.",
    },
    {
      question: 'Does PropRadar use the old rating of a firm whose rating is withheld?',
      answer:
        'No. When Trustpilot hides the rating, PropRadar stores no rating and no review count for that firm until Trustpilot shows a TrustScore again.',
    },
  ];
  const watchList = [...propFirms]
    // Only firms with a review alert on file or a public rating below 4.0.
    .filter((firm) => firm.status !== 'Fermée' && (hasReviewEvidence(firm) || firm.reviewSignals.trustpilotReliability === 'Faible'))
    .sort((a, b) => Number(hasReviewEvidence(b)) - Number(hasReviewEvidence(a)) || (a.trustpilotRating ?? 0) - (b.trustpilotRating ?? 0))
    .slice(0, 24);
  const strongReliabilityCount = propFirms.filter((firm) => firm.reviewSignals.trustpilotReliability === 'Forte').length;
  const reviewAlertCount = propFirms.filter((firm) => hasReviewEvidence(firm)).length;
  const deepSourceCount = propFirms.filter((firm) => legalSourceCount(firm) >= 5).length;
  const legalWatchReviewCount = watchList.filter(isLegalWatchFirm).length;
  const payoutWatchReviewCount = watchList.filter((firm) => hasPayoutRiskSignal(firm)).length;
  const highRatingNeedsContext = [...propFirms]
    .filter((firm) => (firm.trustpilotRating ?? 0) >= 4.5 && (hasPayoutRiskSignal(firm) || isLegalWatchFirm(firm)))
    .sort((a, b) => (b.trustpilotRating ?? 0) - (a.trustpilotRating ?? 0))
    .slice(0, 8);

  return (
    <main className="container guide-page">
      <PageStructuredData
        name="Prop firm Trustpilot review research"
        description={TRUSTPILOT_DESCRIPTION}
        path="/trustpilot-prop-firms"
        breadcrumbLabel="Trustpilot reviews"
        dateModified={latestCheck}
        faq={trustpilotFaq}
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
            <a href="#rating-withheld" className="btn btn-primary">See the {withheldOpen.length} withheld ratings</a>
            <Link prefetch={false} href="/prop-firm-comparison" className="btn">View Trustpilot in the comparator</Link>
            <Link href="/audit" className="btn">View proof level</Link>
            <Link href="/prop-firm-payout-risk" className="btn">Check payout risk</Link>
          </div>
        </div>
        <dl className="pr-hero-stats">
          <div><dt>Firms tracked</dt><dd>{propFirms.length}</dd></div>
          <div><dt>Rating withheld by Trustpilot</dt><dd>{withheldOpen.length}</dd></div>
          <div><dt>Strong reliability</dt><dd>{strongReliabilityCount}</dd></div>
          <div><dt>Deep source files</dt><dd>{deepSourceCount}</dd></div>
        </dl>
      </section>

      <section className="section" id="rating-withheld" aria-labelledby="withheld-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Trustpilot rating withheld</div>
            <h2 id="withheld-title">{withheldOpen.length} prop firms whose Trustpilot rating is hidden</h2>
          </div>
          <p className="section-note">
            Each firm below showed no TrustScore and Trustpilot&apos;s notice that the rating is unavailable due to a breach of its
            guidelines. Dates are when PropRadar read the page; the link opens it.
          </p>
        </div>
        <div className="pr-withheld-facts">
          <p>
            <strong>What Trustpilot says it means.</strong> A guideline breach can lead Trustpilot to place a Consumer Warning on the
            profile; while it is active the TrustScore and stars are hidden from view and not shared with search engines, usually for about
            six months. <a href={TRUSTPILOT_ACTION_URL} target="_blank" rel="noreferrer">Trustpilot: action we take</a>
          </p>
          <p>
            <strong>What it does not say.</strong> The notice concerns how a firm used Trustpilot, not its payouts. {withheldActive.length} of
            these firms are Active on PropRadar; their payout and legal files are read separately.
          </p>
        </div>
        <div className="pr-table-wrap">
          <table className="pr-withheld-table">
            <thead>
              <tr>
                <th scope="col">Firm</th>
                <th scope="col">PropRadar score</th>
                <th scope="col">Status</th>
                <th scope="col">Fake reviews removed</th>
                <th scope="col">Checked</th>
                <th scope="col">Trustpilot page</th>
              </tr>
            </thead>
            <tbody>
              {withheldOpen.map(({ firm, checked, url, fakeReviews }) => (
                <tr key={firm.slug}>
                  <th scope="row">
                    <Link href={`/firm/${firm.slug}`}>
                      <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                      {firm.name}
                    </Link>
                  </th>
                  <td>{firm.score}/100</td>
                  <td>{toEnglishText(firm.status)}</td>
                  <td>{fakeReviews ? 'Notice shown' : 'Not stated'}</td>
                  <td>{checked ? <time dateTime={checked}>{checked}</time> : 'Not dated'}</td>
                  <td>{url ? <a href={url} target="_blank" rel="noreferrer">Open</a> : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="trustpilot-faq-title">
        <h2 id="trustpilot-faq-title">Trustpilot and prop firms: questions</h2>
        <div className="firm-faq-grid">
          {trustpilotFaq.map((item) => (
            <article className="firm-faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pr-stat-line" aria-label="Trustpilot reading summary">
        <dl>
          <div><dt>Review alerts</dt><dd>{reviewAlertCount}</dd></div>
          <div><dt>Payout overlap</dt><dd>{payoutWatchReviewCount}</dd></div>
          <div><dt>Legal overlap</dt><dd>{legalWatchReviewCount}</dd></div>
        </dl>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">Method</div>
          <h2>What PropRadar checks</h2>
          <ul className="risk-list">
            <li>Review volume and age, not just the average rating.</li>
            <li>Marketing, invited or overly recent review alerts.</li>
            <li>Consistency with documented payout incidents and rule disputes.</li>
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
                  <small>{hasPayoutRiskSignal(firm) ? `Payout ${toEnglishText(firm.reviewSignals.payoutRisk)}` : firm.regulatoryAudit.riskLevel}</small>
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
              <div><span>Counted alerts</span><strong>{typeof firm.reviewSignals.trustpilotFlaggedReviewCount === 'number' ? firm.reviewSignals.trustpilotFlaggedReviewCount : '—'}</strong></div>
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
