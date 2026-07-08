import Link from 'next/link';
import FirmLogo from './components/FirmLogo';
import { activeFirms, formatUsd, partiallyVerifiedFirms, propFirms, riskyFirms, topFirms, verifiedFirms } from './lib/propFirms';
import { getSeoGuideDisplay, seoGuides, selectGuideFirms } from './lib/seoGuides';
import { toEnglishText } from './lib/i18n';

export default function HomePage() {
  const payoutAlerts = [...propFirms]
    .filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 3);
  const reviewAlerts = [...propFirms]
    .filter((firm) => (firm.reviewSignals.manipulationRiskScore ?? 0) >= 70)
    .sort((a, b) => (b.reviewSignals.manipulationRiskScore ?? 0) - (a.reviewSignals.manipulationRiskScore ?? 0))
    .slice(0, 3);
  const noConflictFirms = propFirms.filter((firm) => firm.commercialRelationship === 'Aucune').length;
  const affiliateFirms = propFirms.length - noConflictFirms;
  const officialSourceCount = propFirms.reduce((sum, firm) => sum + firm.sources.length, 0);
  const payoutTrackedCount = propFirms.filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible').length;
  const trustpilotWatchCount = propFirms.filter((firm) => (firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0) > 0).length;
  const sourcedFirms = verifiedFirms.length + partiallyVerifiedFirms.length;
  const homepageGuides = seoGuides.slice(0, 6).map((guide) => ({ guide, displayGuide: getSeoGuideDisplay(guide) }));
  const heroPreviewFirms = topFirms.slice(0, 3);
  const dataUpdatedAt = '2026-07-07';
  const archivedFirmsCount = propFirms.length - activeFirms.length - riskyFirms.length;
  const archivedSignal = propFirms.find((firm) => !activeFirms.includes(firm) && !riskyFirms.includes(firm));
  const radarSignals = [
    { firm: topFirms[0], label: 'Reliable', className: 'radar-dot-good' },
    { firm: payoutAlerts[0], label: 'Payout watch', className: 'radar-dot-watch' },
    { firm: reviewAlerts[0], label: 'Review caution', className: 'radar-dot-caution' },
    { firm: archivedSignal, label: 'Risk archive', className: 'radar-dot-risk' },
  ];

  return (
    <main>
      <section className="container hero home-hero">
        <div className="hero-copy">
          <div className="eyebrow">Independent prop firm radar</div>
          <h1>PropRadar, the independent prop firm comparator.</h1>
          <p className="lead">
            The prop firm market loves big promises. PropRadar puts rules, payouts, Reddit reviews, Trustpilot reliability and conflicts of interest on the same table.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Compare firms</Link>
            <Link href="#methodologie" className="hero-link-secondary">Understand the score</Link>
          </div>
          <div className="data-freshness">
            <span>Dataset updated</span>
            <strong>{dataUpdatedAt}</strong>
            <small>{propFirms.length} firms, {officialSourceCount} source links, {payoutTrackedCount} payout-watch signal(s).</small>
          </div>
        </div>

        <div className="hero-board">
          <div className="board-topline">
            <span>No hidden conflict of interest</span>
            <strong>Evidence-first radar</strong>
          </div>
          <div className="radar-orbit" aria-label="PropRadar signal examples">
            <span className="radar-ring radar-ring-outer" />
            <span className="radar-ring radar-ring-mid" />
            <span className="radar-ring radar-ring-inner" />
            <span className="radar-sweep" />
            {radarSignals.map((signal) => {
              const firm = signal.firm;
              if (!firm) return null;

              return (
                <Link
                  href={`/firm/${firm.slug}`}
                  className={`radar-dot ${signal.className}`}
                  title={`${signal.label}: ${firm.name} (${firm.score}/100)`}
                  key={`${signal.label}-${firm.slug}`}
                >
                  <span className="sr-only">{signal.label}: {firm.name}, score {firm.score}/100</span>
                </Link>
              );
            })}
          </div>
          <div className="radar-legend">
            {radarSignals.map((signal) => {
              const firm = signal.firm;
              if (!firm) return null;

              return (
                <Link href={`/firm/${firm.slug}`} key={`legend-${signal.label}-${firm.slug}`}>
                  <span className={`legend-dot ${signal.className}`} />
                  <strong>{signal.label}</strong>
                  <small>{firm.name} - {firm.score}/100</small>
                </Link>
              );
            })}
          </div>
          <div className="hero-market-preview" aria-label="Comparator preview">
            <div className="hero-market-preview-head">
              <span>Comparator preview</span>
              <strong>Top reliability</strong>
            </div>
            {heroPreviewFirms.map((firm) => (
              <Link href={`/firm/${firm.slug}`} className="hero-market-row" key={`hero-preview-${firm.slug}`}>
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <span>{firm.name}</span>
                <strong>{firm.score}/100</strong>
              </Link>
            ))}
          </div>
          <div className="metric-grid">
            <div className="metric">
              <strong>{propFirms.length}</strong>
              <span>firms tracked</span>
            </div>
            <div className="metric">
              <strong>{activeFirms.length}</strong>
              <span>active</span>
            </div>
            <div className="metric">
              <strong>{riskyFirms.length}</strong>
              <span>watchlist</span>
            </div>
            <div className="metric">
              <strong>{archivedFirmsCount}</strong>
              <span>closed / archives</span>
            </div>
          </div>
          <ul className="trust-stack">
            <li><span>01</span> Scores independent from affiliate links.</li>
            <li><span>02</span> Closed firms kept visible as warnings.</li>
            <li><span>03</span> Payout risk and public reviews separated from marketing.</li>
            <li><span>04</span> Official sources kept on each profile.</li>
          </ul>
          <div className="hero-proof-strip">
            <span>Manual review when APIs are unavailable</span>
            <span>Affiliate links disclosed</span>
            <span>Risk archives kept visible</span>
          </div>
        </div>
      </section>

      <section className="container page-insight-strip" aria-label="Fast decision shortcuts">
        <Link href="/comparateur">
          <span>Compare first</span>
          <strong>{propFirms.length} firms</strong>
          <small>Score, payout, reviews and conflicts in one table.</small>
        </Link>
        <Link href="/risques-payout">
          <span>Risk check</span>
          <strong>{payoutTrackedCount} alerts</strong>
          <small>Withdrawal and payout risks before checkout.</small>
        </Link>
        <Link href="/audit">
          <span>Proof level</span>
          <strong>{sourcedFirms} sourced</strong>
          <small>Verified and partially verified files separated.</small>
        </Link>
        <Link href="/promos">
          <span>Deals</span>
          <strong>Risk-aware</strong>
          <small>Discounts shown with score and payout context.</small>
        </Link>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Decision Guides</div>
            <h2>Four entry points to choose faster.</h2>
          </div>
          <p className="section-note">
            The comparator is dense. These guides isolate the most important questions before purchase.
          </p>
        </div>
        <div className="guide-entry-grid">
          <Link href="/meilleures-prop-firms" className="guide-entry-card guide-entry-primary">
            <span>Ranking</span>
            <strong>Best reliable prop firms</strong>
            <small>Score, price, payout, filtered Trustpilot and commercial conflict visible together.</small>
          </Link>
          <Link href="/risques-payout" className="guide-entry-card">
            <span>Payout Watch</span>
            <strong>Withdrawal risks to verify</strong>
            <small>Delays, denials, incidents and operational signals before paying for a challenge.</small>
          </Link>
          <Link href="/trustpilot-prop-firms" className="guide-entry-card">
            <span>Public reviews</span>
            <strong>Read Trustpilot without getting trapped</strong>
            <small>The raw rating is separated from PropRadar’s estimated reliability level.</small>
          </Link>
          <Link href="/guides" className="guide-entry-card">
            <span>Library</span>
            <strong>Guides by trader search</strong>
            <small>Futures prop firms, news trading, SMC, fast payout, consistency rule and comparisons.</small>
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Popular Searches</div>
            <h2>Essential guides before paying for a challenge.</h2>
          </div>
          <Link href="/guides" className="btn">View all guides</Link>
        </div>
        <div className="guide-entry-grid seo-guide-grid">
          {homepageGuides.map(({ guide, displayGuide }) => (
            <Link href={`/guides/${guide.slug}`} className="guide-entry-card" key={guide.slug}>
              <span>{displayGuide.eyebrow}</span>
              <strong>{displayGuide.title}</strong>
              <small>{displayGuide.primaryKeywords.join(' / ')}</small>
              <small>{selectGuideFirms(guide, 12).length} linked firm(s)</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section strength-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PropRadar Strengths</div>
            <h2>Independent comparator, visible proof.</h2>
          </div>
          <p className="section-note">
            A useful comparator does not just push a discount. It makes the risks visible before the trader pays.
          </p>
        </div>
        <div className="strength-proof-grid">
          <Link href="/comparateur" className="strength-proof-card strength-proof-primary">
            <span>Wide Coverage</span>
            <strong>{propFirms.length}</strong>
            <small>prop firms tracked, including smaller firms and historical risk archives.</small>
          </Link>
          <Link href="/audit" className="strength-proof-card">
            <span>Sources & Audit</span>
            <strong>{sourcedFirms}</strong>
            <small>files already verified or partially sourced, with reference links preserved.</small>
          </Link>
          <Link href="/comparateur" className="strength-proof-card">
            <span>Conflicts Of Interest</span>
            <strong>{noConflictFirms}</strong>
            <small>firms with no commercial link versus {affiliateFirms} disclosed affiliate relationship(s).</small>
          </Link>
          <Link href="/regles" className="strength-proof-card">
            <span>Official Sources</span>
            <strong>{officialSourceCount}</strong>
            <small>reference links connected to firm pages so rules can be checked again.</small>
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PropRadar Edge</div>
            <h2>The signals affiliate-first comparators often avoid.</h2>
          </div>
        </div>
        <div className="grid-3 radar-value-grid">
          <div className="card">
            <div className="eyebrow">Reddit Score</div>
            <h3>Community noise is filtered</h3>
            <p className="muted">
              The score does not reward positive reviews only. It flags repeated complaints, contradictory feedback and topics that come back too often.
            </p>
            <span className="quality-tag">Forums · Reddit · Discord</span>
          </div>
          <div className="card">
            <div className="eyebrow">Reliable Trustpilot?</div>
            <h3>The raw rating is not enough</h3>
            <p className="muted">
              A high rating can hide invited reviews, marketing pressure or a very recent profile. PropRadar weighs Trustpilot against incidents, Reddit and payout evidence.
            </p>
            <span className="quality-tag">Weighted reviews</span>
          </div>
          <div className="card">
            <div className="eyebrow">Payout Watch</div>
            <h3>Withdrawals matter heavily</h3>
            <p className="muted">
              Delays, denials, consistency rules, withdrawal thresholds and closures are treated as major signals, not footer details.
            </p>
            <span className="quality-tag">Operational alerts</span>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Trader Journey</div>
            <h2>A visit should help people decide, not just click.</h2>
          </div>
        </div>
        <div className="decision-path">
          <Link href="/comparateur" className="decision-step">
            <span>01</span>
            <strong>Compare without blind spots</strong>
            <small>Price, score, drawdown, Reddit, Trustpilot, payout and commercial conflict stay side by side.</small>
          </Link>
          <Link href="/regles" className="decision-step">
            <span>02</span>
            <strong>Read the dangerous clauses</strong>
            <small>News, rollover, trailing drawdown, EA, consistency and payout caps are pulled out of the fine print.</small>
          </Link>
          <Link href="/promos" className="decision-step">
            <span>03</span>
            <strong>Use deals carefully</strong>
            <small>A discount only helps if the rules still make sense for the trader.</small>
          </Link>
          <Link href="/audit" className="decision-step">
            <span>04</span>
            <strong>Check the proof level</strong>
            <small>Each page states what is verified, partial or still waiting for stronger sourcing.</small>
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="grid-2">
          <div className="panel signal-panel signal-panel-payout">
            <div className="eyebrow">Payout Alerts</div>
            <h2>Firms to read twice</h2>
            <p className="muted">The radar tracks {payoutTrackedCount} firm(s) with a payout risk above low.</p>
            <ul className="compact-signal-list large">
              {payoutAlerts.map((firm) => (
                <li key={firm.slug}>
                  <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                  <span className={`badge ${firm.reviewSignals.payoutRiskScore >= 65 ? 'badge-red' : 'badge-amber'}`}>{toEnglishText(firm.reviewSignals.payoutIncidentStatus)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel signal-panel signal-panel-reviews">
            <div className="eyebrow">Filtered Reviews</div>
            <h2>Trustpilot needs context</h2>
            <p className="muted">{trustpilotWatchCount} firm(s) have at least one review or marketing-signal alert.</p>
            <ul className="compact-signal-list large">
              {reviewAlerts.map((firm) => (
                <li key={firm.slug}>
                  <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                  <span className={`badge ${(firm.reviewSignals.manipulationRiskScore ?? 0) >= 80 ? 'badge-red' : 'badge-amber'}`}>{toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Trust Leaders</div>
            <h2>The strongest profiles right now</h2>
          </div>
          <Link href="/comparateur" className="btn">View all {propFirms.length} firms</Link>
        </div>
        <div className="grid-3">
          {topFirms.slice(0, 3).map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="card trust-leader-card" key={firm.slug}>
              <div className="firm-cell">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <h3 style={{ marginBottom: 3 }}>{firm.name}</h3>
                  <span className="muted">{toEnglishText(firm.bestFor)}</span>
                </div>
              </div>
              <div className="trust-leader-scoreline">
                <div className={`score-tile score-tile-row ${firm.score >= 80 ? 'badge-score-excellent' : 'badge-score-good'}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                  <span>Score</span>
                  <strong>{firm.score}</strong>
                  <small>/100</small>
                </div>
                <small>{toEnglishText(firm.reviewSignals.payoutRisk)} payout risk</small>
              </div>
              <div className="stat-strip" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
                <div className="stat"><span>From</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
                <div className="stat"><span>Split</span><strong>{firm.profitSplit}%</strong></div>
                <div className="stat"><span>Trustpilot</span><strong>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</strong></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="grid-3 feature-row">
          <div className="card">
            <div className="eyebrow">Independence</div>
            <h3>The score cannot be bought</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              An affiliate firm can lose points, a non-affiliate firm can rank higher, and closed firms remain visible.
            </p>
          </div>
          <div className="card">
            <div className="eyebrow">Affiliate links</div>
            <h3>Links are disclosed</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              When PropRadar may earn a commission, the firm page says it clearly. The visitor can see what is commercial.
            </p>
          </div>
          <div className="card">
            <div className="eyebrow">Trust</div>
            <h3>Risk matters</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              The radar values stability, sources, credible payouts and clear rules, not just the advertised profit split.
            </p>
          </div>
        </div>
      </section>

      <section className="container section" id="radar-weekly">
        <div className="newsletter-panel">
          <div>
            <div className="eyebrow">Radar Weekly</div>
            <h2>Follow payout alerts and firm changes before buying a challenge.</h2>
            <p className="muted">
              A weekly digest can highlight firms moving up or down, new discount codes, payout-watch changes and rule updates.
            </p>
          </div>
          <form className="newsletter-form" action="mailto:contact@propradar.tech" method="post" encType="text/plain" aria-label="Newsletter signup">
            <input type="email" name="email" placeholder="you@example.com" aria-label="Email address" />
            <button type="submit" className="btn btn-primary">Get alerts</button>
            <small>No spam: weekly signals, discount codes and payout-watch changes only.</small>
          </form>
        </div>
      </section>

      <section className="container section" id="methodologie">
        <div className="grid-2">
          <div>
            <div className="eyebrow">Methodology</div>
            <h2>A score built for trust, not for selling the most profitable challenge.</h2>
            <p className="muted">
              Each score is designed to answer a practical question: can a trader understand the rules, verify the firm, and withdraw without discovering hidden restrictions too late?
            </p>
          </div>
          <div className="panel">
            <div className="score-method-grid">
              <div className="score-method-card score-method-community">
                <span>01</span>
                <strong>Community signal</strong>
                <small>Reddit, X/Twitter, Discord-style complaints and repeated user feedback.</small>
              </div>
              <div className="score-method-card score-method-proof">
                <span>02</span>
                <strong>Proof level</strong>
                <small>Official sources, payout references, archived firms and missing evidence.</small>
              </div>
              <div className="score-method-card score-method-risk">
                <span>03</span>
                <strong>Payout watch</strong>
                <small>Delays, denials, withdrawal rules, closures and operational incidents.</small>
              </div>
              <div className="score-method-card score-method-rules">
                <span>04</span>
                <strong>Rule fit</strong>
                <small>Drawdown, targets, news trading, EA, consistency and platform restrictions.</small>
              </div>
            </div>
            <ul className="risk-list">
              <li>Age, rule stability and legal clarity.</li>
              <li>Payout evidence, advertised average delay and incident history.</li>
              <li>Product quality: drawdown, targets, platforms, restrictions and consistency rules.</li>
              <li>Community signals and official-source links when available.</li>
              <li>Reddit score: community noise, repeated complaints and consistency of feedback.</li>
              <li>X/Twitter Watch: viral complaints, recent feedback and fast-moving signals to cross-check.</li>
              <li>Trustpilot reliability: rating weighted by volume, context, incidents and external proof.</li>
              <li>Payout risk: delays, denials, withdrawal rules, closures and operational alerts.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container section" id="risques">
        <div className="panel">
          <div className="eyebrow">Important</div>
          <h2>The sector moves fast.</h2>
          <p className="lead">
            Deals, fees, news-trading rules, platforms and payout conditions can change without notice. PropRadar should be used as a research filter, not as a promise of results or financial advice.
          </p>
        </div>
      </section>
    </main>
  );
}
