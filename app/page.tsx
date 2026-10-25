import Link from 'next/link';
import FirmLogo from './components/FirmLogo';
import { TxArrow, TxScore } from './components/TxBits';
import { getEditorialBriefPath, latestEditorialBrief } from './lib/editorialBriefs';
import {
  partiallyVerifiedFirms,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  topFirms,
  verifiedFirms,
} from './lib/propFirms';
import { getSeoGuideDisplay, getSeoGuidePath, seoGuides } from './lib/seoGuides';
import { toEnglishText } from './lib/i18n';
import { formatDate, riskTone } from './lib/tx';

export default function HomePage() {
  const noConflictFirms = propFirms.filter((firm) => firm.commercialRelationship === 'Aucune').length;
  const officialSourceCount = propFirms.reduce((sum, firm) => sum + firm.sources.length, 0);
  const legalMappedCount = propFirms.filter((firm) => firm.legalVerified).length;
  const sourcedFirms = verifiedFirms.length + partiallyVerifiedFirms.length;
  const rankingFirms = topFirms.slice(0, 8);
  const homepageGuides = [
    'prop-firm-sans-challenge',
    'prop-firm-sans-consistency-rule',
    'topstep-vs-apex',
  ].flatMap((slug) => {
    const guide = seoGuides.find((candidate) => candidate.slug === slug);
    return guide ? [{ guide, displayGuide: getSeoGuideDisplay(guide) }] : [];
  });
  const latestBriefPath = getEditorialBriefPath(latestEditorialBrief);
  const latestBriefSourceCount = latestEditorialBrief.sections.reduce(
    (sum, section) => sum + section.sources.length,
    0,
  );
  const dataUpdatedAt = propFirms.reduce((latest, firm) => {
    const firmLatestDate = firm.regulatoryAudit.lastChecked > firm.lastReviewed
      ? firm.regulatoryAudit.lastChecked
      : firm.lastReviewed;
    return firmLatestDate > latest ? firmLatestDate : latest;
  }, '2026-01-01');
  const dataUpdatedLabel = formatDate(dataUpdatedAt);

  return (
    <main className="tx-page tx-home">
      <section className="container tx-hero" aria-labelledby="home-title">
        <div className="tx-hero-copy">
          <p className="tx-label tx-hero-kicker">
            <span className="tx-live" aria-hidden="true" />
            Independent research. Updated {dataUpdatedLabel}
          </p>
          <h1 id="home-title">The independent prop firm comparator built to protect traders.</h1>
          <p className="tx-hero-lead">
            Compare rules, payouts, legal entities and public signals before you pay for a challenge.
          </p>
          <div className="tx-actions">
            <Link href="/comparateur" className="btn btn-primary">
              Open the comparator
            </Link>
            <Link href="/promos" className="btn">
              View risk-aware deals
            </Link>
          </div>
          <ul className="tx-principles" aria-label="Editorial principles">
            <li>No ranking can be bought.</li>
            <li>Affiliate links stay disclosed.</li>
            <li>Every score shows its review date.</li>
          </ul>
        </div>

        <div className="tx-board" aria-labelledby="ranking-title">
          <div className="tx-board-head">
            <h2 id="ranking-title" className="tx-label">Reliability ranking</h2>
            <span className="tx-label">Top 8 of {propFirms.length}</span>
          </div>
          <table className="tx-table tx-board-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Firm</th>
                <th scope="col">Score</th>
                <th scope="col">Payout</th>
                <th scope="col" className="tx-hide-sm">Legal</th>
              </tr>
            </thead>
            <tbody>
              {rankingFirms.map((firm, index) => (
                <tr key={firm.slug}>
                  <td className="tx-rank">{String(index + 1).padStart(2, '0')}</td>
                  <td>
                    <Link href={`/firm/${firm.slug}`} className="tx-firm">
                      <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                      <span>
                        {firm.name}
                        {firm.commercialRelationship === 'Affiliation transparente' ? (
                          <span className="tx-tag tx-tag-accent tx-board-aff" title="Declared affiliate relationship">Aff.</span>
                        ) : null}
                      </span>
                    </Link>
                  </td>
                  <td><TxScore score={firm.score} /></td>
                  <td>
                    <span className={`tx-risk ${riskTone(payoutRiskClass(firm.reviewSignals.payoutRisk))}`}>
                      {toEnglishText(firm.reviewSignals.payoutRisk)}
                    </span>
                  </td>
                  <td className="tx-hide-sm">
                    <span className={`tx-risk ${riskTone(regulatoryRiskClass(firm.regulatoryAudit.riskLevel))}`}>
                      {firm.regulatoryAudit.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/comparateur" className="tx-board-foot">
            <span>Full ranking and filters</span>
            <TxArrow />
          </Link>
        </div>
      </section>

      <div className="container">
        <div className="tx-tape" style={{ ['--tape-cols' as string]: 5 }} aria-label="PropRadar dataset">
          <div><strong>{propFirms.length}</strong><small>firms tracked</small></div>
          <div><strong>{noConflictFirms}</strong><small>with no commercial relationship</small></div>
          <div><strong>{officialSourceCount}</strong><small>saved source links</small></div>
          <div><strong>{legalMappedCount}</strong><small>legal entities mapped</small></div>
          <div><strong>{sourcedFirms}</strong><small>sourced firm files</small></div>
        </div>
      </div>

      <section className="container tx-section tx-section-flush" aria-labelledby="tools-title">
        <div className="tx-section-head">
          <div>
            <p className="tx-label">Start here</p>
            <h2 id="tools-title">Three ways into the data.</h2>
          </div>
        </div>
        <div className="tx-ruled" style={{ ['--cols' as string]: 3 }}>
          <Link href="/comparateur" className="tx-ruled-item">
            <span className="tx-label">01 / Comparator</span>
            <h3>Compare {propFirms.length} prop firms side by side.</h3>
            <p>Filter by score, market, payout risk, legal risk, price and trading rules.</p>
            <span className="tx-link">Open comparator <TxArrow /></span>
          </Link>
          <Link href="/promos" className="tx-ruled-item">
            <span className="tx-label">02 / Deals</span>
            <h3>Read the risk before the discount.</h3>
            <p>Promotions stay attached to firm scores, payout context and commercial disclosures.</p>
            <span className="tx-link">Check current deals <TxArrow /></span>
          </Link>
          <Link href="/guides" className="tx-ruled-item">
            <span className="tx-label">03 / Guides</span>
            <h3>Understand the rules that change outcomes.</h3>
            <p>Legal checks, payout clauses, review signals and program comparisons in plain English.</p>
            <span className="tx-link">Browse guides <TxArrow /></span>
          </Link>
        </div>
      </section>

      <section className="container tx-section" aria-labelledby="method-title" id="methodologie">
        <div className="tx-section-head">
          <div>
            <p className="tx-label">Method</p>
            <h2 id="method-title">Four checks before one decision.</h2>
          </div>
          <Link href="/audit" className="tx-link">View the evidence log <TxArrow /></Link>
        </div>
        <div className="tx-ruled tx-method" style={{ ['--cols' as string]: 4 }}>
          <div>
            <span className="tx-label">Independence</span>
            <h3>Scores no one can buy</h3>
            <p>{noConflictFirms} of {propFirms.length} firms have no commercial relationship with PropRadar. Affiliates get the same penalties.</p>
          </div>
          <div>
            <span className="tx-label">Payouts</span>
            <h3>Payout record first</h3>
            <p>Withdrawal incidents and restrictive rules weigh more than headline discounts.</p>
          </div>
          <div>
            <span className="tx-label">Legal</span>
            <h3>Entities, not slogans</h3>
            <p>{legalMappedCount} legal files map entities, jurisdictions and regulatory signals.</p>
          </div>
          <div>
            <span className="tx-label">Sources</span>
            <h3>Cross-checked context</h3>
            <p>Official terms, public reviews and incidents are checked against each other, with dated sources.</p>
          </div>
        </div>
      </section>

      <section className="container tx-section" aria-labelledby="home-brief-title">
        <div className="tx-brief">
          <div className="tx-brief-intro">
            <p className="tx-label">Risk brief / Issue {String(latestEditorialBrief.issueNumber).padStart(2, '0')}</p>
            <h2 id="home-brief-title">{latestEditorialBrief.shortTitle}</h2>
            <p>{latestEditorialBrief.dek}</p>
            <p className="tx-meta tx-mono">
              <time dateTime={latestEditorialBrief.publishedAt}>{formatDate(latestEditorialBrief.publishedAt)}</time>
              <span>{latestEditorialBrief.readMinutes} min read</span>
              <span>{latestBriefSourceCount} primary sources</span>
            </p>
            <Link href={latestBriefPath} className="btn btn-primary">Read the latest issue</Link>
          </div>
          <div className="tx-rows">
            {latestEditorialBrief.sections.map((section, index) => (
              <Link href={`${latestBriefPath}#${section.id}`} className="tx-row" key={section.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <small className="tx-label">{section.eyebrow}</small>
                  <strong>{section.title}</strong>
                </span>
                <TxArrow />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container tx-section" aria-labelledby="guides-title">
        <div className="tx-section-head">
          <div>
            <p className="tx-label">Guides</p>
            <h2 id="guides-title">Three useful reads before checkout.</h2>
          </div>
          <Link href="/guides" className="tx-link">All guides <TxArrow /></Link>
        </div>
        <div className="tx-rows">
          {homepageGuides.map(({ guide, displayGuide }, index) => (
            <Link href={getSeoGuidePath(guide)} className="tx-row" key={guide.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>
                <small className="tx-label">{displayGuide.eyebrow}</small>
                <strong>{displayGuide.title}</strong>
              </span>
              <TxArrow />
            </Link>
          ))}
        </div>
      </section>

      <section className="container tx-section" aria-labelledby="home-alert-title" id="radar-weekly">
        <div className="tx-digest">
          <div>
            <p className="tx-label">Research digest</p>
            <h2 id="home-alert-title">Follow the next risk update.</h2>
            <p>Read every issue on the site, or request the short email covering payout incidents, rule changes and newly verified evidence.</p>
          </div>
          <div className="tx-digest-actions">
            <a
              className="btn btn-primary"
              href="mailto:contact@propradar.tech?subject=PropRadar%20research%20digest&body=Please%20add%20me%20to%20the%20PropRadar%20research%20digest."
            >
              Request by email
            </a>
            <Link className="btn" href="/radar-brief">Open the archive</Link>
            <small>Opens your email app. PropRadar does not collect your address on this page.</small>
          </div>
        </div>
        <p className="tx-disclaimer" id="risques">
          PropRadar is a research filter, not financial advice. Firm rules and payout conditions can change without notice.
          Dataset updated <time dateTime={dataUpdatedAt}>{dataUpdatedLabel}</time>.
        </p>
      </section>
    </main>
  );
}
