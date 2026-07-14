import Link from 'next/link';
import FirmLogo from './components/FirmLogo';
import {
  partiallyVerifiedFirms,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  scoreClass,
  topFirms,
  verifiedFirms,
} from './lib/propFirms';
import { getSeoGuideDisplay, getSeoGuidePath, seoGuides } from './lib/seoGuides';
import { toEnglishText } from './lib/i18n';

export default function HomePage() {
  const noConflictFirms = propFirms.filter((firm) => firm.commercialRelationship === 'Aucune').length;
  const officialSourceCount = propFirms.reduce((sum, firm) => sum + firm.sources.length, 0);
  const legalMappedCount = propFirms.filter((firm) => firm.legalVerified).length;
  const sourcedFirms = verifiedFirms.length + partiallyVerifiedFirms.length;
  const heroPreviewFirms = topFirms.slice(0, 3);
  const homepageGuides = [
    'prop-firm-sans-challenge',
    'prop-firm-sans-consistency-rule',
    'topstep-vs-apex',
  ].flatMap((slug) => {
    const guide = seoGuides.find((candidate) => candidate.slug === slug);
    return guide ? [{ guide, displayGuide: getSeoGuideDisplay(guide) }] : [];
  });
  const dataUpdatedAt = propFirms.reduce((latest, firm) => {
    const firmLatestDate = firm.regulatoryAudit.lastChecked > firm.lastReviewed
      ? firm.regulatoryAudit.lastChecked
      : firm.lastReviewed;
    return firmLatestDate > latest ? firmLatestDate : latest;
  }, '2026-01-01');
  const dataUpdatedLabel = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${dataUpdatedAt}T00:00:00Z`));

  return (
    <main className="home-v2">
      <section className="container home-v2-hero" aria-labelledby="home-title">
        <div className="home-v2-hero-copy">
          <div className="home-v2-kicker">
            <span aria-hidden="true" />
            Independent. Evidence first.
          </div>
          <h1 id="home-title">The independent prop firm comparator built to protect traders.</h1>
          <p className="home-v2-lead">
            Compare rules, payouts, legal entities and public signals before you pay for a challenge.
          </p>
          <div className="home-v2-proofline" aria-label="PropRadar dataset coverage">
            <span><strong>{propFirms.length}</strong> firms compared</span>
            <span><strong>{noConflictFirms}</strong> with no commercial relationship</span>
            <span>Updated <time dateTime={dataUpdatedAt}>{dataUpdatedLabel}</time></span>
          </div>
          <div className="home-v2-actions">
            <Link href="/comparateur" className="btn btn-primary home-v2-primary-action">
              Open the comparator
            </Link>
            <Link href="/promos" className="btn home-v2-secondary-action">
              View risk-aware deals
            </Link>
          </div>
          <Link href="/guides" className="home-v2-guide-link">
            Explore reliability guides
            <span aria-hidden="true"> &gt;</span>
          </Link>
          <div className="home-v2-trust-line">
            <span>No ranking can be bought.</span>
            <span>Affiliate links stay disclosed.</span>
            <span>Updated <time dateTime={dataUpdatedAt}>{dataUpdatedLabel}</time>.</span>
          </div>
        </div>

        <div className="home-preview" aria-label="Top prop firms comparator preview">
          <div className="home-preview-header">
            <div>
              <span>Comparator preview</span>
              <h2>Top reliability</h2>
            </div>
            <span className="home-preview-live">
              <i aria-hidden="true" /> Live data
            </span>
          </div>

          <div className="home-preview-list">
            {heroPreviewFirms.map((firm, index) => (
              <Link href={`/firm/${firm.slug}`} className="home-preview-row" key={`home-preview-${firm.slug}`}>
                <span className="home-preview-rank">{String(index + 1).padStart(2, '0')}</span>
                <span className="home-preview-identity">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>
                    <strong>{firm.name}</strong>
                    <small>{toEnglishText(firm.bestFor)}</small>
                  </span>
                </span>
                <span className={`home-preview-score ${scoreClass(firm.score)}`}>
                  <small>Score</small>
                  <strong>{firm.score}</strong>
                  <span>/100</span>
                </span>
                <span className="home-preview-signals">
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                    {toEnglishText(firm.reviewSignals.payoutRisk)} payout
                  </span>
                  <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                    {firm.regulatoryAudit.riskLevel} legal
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <Link href="/comparateur" className="home-preview-footer">
            <span>Compare all {propFirms.length} firms</span>
            <strong aria-hidden="true">&gt;</strong>
          </Link>
        </div>
      </section>

      <section className="home-v2-band home-tools-band" aria-labelledby="tools-title">
        <div className="container">
          <div className="home-v2-section-heading">
            <div>
              <div className="eyebrow">Main tools</div>
              <h2 id="tools-title">Choose your next step.</h2>
            </div>
            <p>Three focused paths, with the comparator kept at the center.</p>
          </div>

          <div className="home-tools-grid">
            <Link href="/comparateur" className="home-tool-card home-tool-card-primary">
              <span className="home-tool-label">01 / Comparator</span>
              <strong>Compare {propFirms.length} prop firms side by side.</strong>
              <small>Filter by score, market, payout risk, legal risk, price and trading rules.</small>
              <span className="home-tool-action">Open comparator <b aria-hidden="true">&gt;</b></span>
            </Link>
            <Link href="/promos" className="home-tool-card">
              <span className="home-tool-label">02 / Risk-aware deals</span>
              <strong>Read the risk before the discount.</strong>
              <small>Promotions stay attached to firm scores, payout context and commercial disclosures.</small>
              <span className="home-tool-action">Check current deals <b aria-hidden="true">&gt;</b></span>
            </Link>
            <Link href="/guides" className="home-tool-card">
              <span className="home-tool-label">03 / Reliability guides</span>
              <strong>Understand the rules that change outcomes.</strong>
              <small>Legal checks, payout clauses, review signals and program comparisons in plain English.</small>
              <span className="home-tool-action">Browse guides <b aria-hidden="true">&gt;</b></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-v2-band home-v2-why" aria-labelledby="why-title">
        <div className="container">
          <div className="home-v2-section-heading">
            <div>
              <div className="eyebrow">Why PropRadar</div>
              <h2 id="why-title">Four checks before one decision.</h2>
            </div>
            <p>Clear evidence replaces promotional noise, without hiding uncertainty.</p>
          </div>

          <div className="home-why-grid">
            <article className="home-why-card">
              <span className="home-card-index">01</span>
              <h3>Independent scores</h3>
              <p>{noConflictFirms} firms currently have no commercial relationship with PropRadar.</p>
            </article>
            <article className="home-why-card">
              <span className="home-card-index">02</span>
              <h3>Payout-first analysis</h3>
              <p>Withdrawal incidents and restrictive rules weigh more than headline discounts.</p>
            </article>
            <article className="home-why-card">
              <span className="home-card-index">03</span>
              <h3>Legal evidence</h3>
              <p>{legalMappedCount} legal files map entities, jurisdictions and regulatory signals.</p>
            </article>
            <article className="home-why-card">
              <span className="home-card-index">04</span>
              <h3>Multi-source context</h3>
              <p>Official terms, public reviews and incidents are checked against each other.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="container home-v2-section home-guides-section" aria-labelledby="guides-title">
        <div className="home-v2-section-heading">
          <div>
            <div className="eyebrow">Popular guides</div>
            <h2 id="guides-title">Three useful reads before checkout.</h2>
          </div>
          <Link href="/guides" className="home-v2-heading-link">View all guides</Link>
        </div>

        <div className="home-guide-grid">
          {homepageGuides.map(({ guide, displayGuide }, index) => (
            <Link href={getSeoGuidePath(guide)} className="home-guide-card" key={guide.slug}>
              <span className="home-guide-number">0{index + 1}</span>
              <span className="home-guide-content">
                <small>{displayGuide.eyebrow}</small>
                <strong>{displayGuide.title}</strong>
                <span>{displayGuide.primaryKeywords.slice(0, 2).join(' / ')}</span>
              </span>
              <b aria-hidden="true">&gt;</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-proof-band" id="methodologie" aria-labelledby="proof-title">
        <div className="container">
          <div className="home-proof-heading">
            <div>
              <div className="eyebrow">Trust by the numbers</div>
              <h2 id="proof-title">Evidence you can revisit.</h2>
            </div>
            <p>Dataset updated <time dateTime={dataUpdatedAt}>{dataUpdatedLabel}</time>.</p>
          </div>

          <div className="home-proof-stats">
            <div><strong>{propFirms.length}</strong><span>firms tracked</span></div>
            <div><strong>{officialSourceCount}</strong><span>saved source links</span></div>
            <div><strong>{legalMappedCount}</strong><span>legal files mapped</span></div>
            <div><strong>{sourcedFirms}</strong><span>sourced firm files</span></div>
          </div>

          <div className="home-proof-bottom">
            <div className="home-method-copy">
              <span>How the score works</span>
              <h3>Rules, payouts, legal structure and public signals are weighed together.</h3>
              <p>Every profile shows what is verified, partially verified or still waiting for stronger evidence.</p>
              <div>
                <Link href="/audit">View the evidence log</Link>
                <Link href="/regles">Read rule audits</Link>
              </div>
            </div>

            <div
              className="home-alert-form"
              id="radar-weekly"
              aria-labelledby="home-alert-title"
            >
              <span>Research digest</span>
              <h3 id="home-alert-title">Request the next risk update.</h3>
              <p>Ask for the concise email covering payout incidents, rule changes and newly verified evidence.</p>
              <div className="home-alert-form-actions">
                <a
                  className="btn btn-primary"
                  href="mailto:contact@propradar.tech?subject=PropRadar%20research%20digest&body=Please%20add%20me%20to%20the%20PropRadar%20research%20digest."
                >
                  Request by email
                </a>
              </div>
              <small>Opens your email app. PropRadar does not collect your address on this page.</small>
            </div>
          </div>

          <p className="home-disclaimer" id="risques">
            PropRadar is a research filter, not financial advice. Firm rules and payout conditions can change without notice.
          </p>
        </div>
      </section>
    </main>
  );
}
