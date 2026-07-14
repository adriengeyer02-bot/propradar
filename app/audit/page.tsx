import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import PageStructuredData from '../components/PageStructuredData';
import { createPageMetadata } from '../lib/pageMetadata';
import {
  auditStatusClass,
  firmsToAudit,
  formatUsd,
  partiallyVerifiedFirms,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  reviewReliabilityClass,
  scoreClass,
  statusClass,
  verifiedFirms,
} from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

const AUDIT_DESCRIPTION =
  'Audit PropRadar sources, legal entities, regulator checks and proof depth across verified, partial and watchlist prop-firm profiles.';

export const metadata = createPageMetadata({
  title: 'Prop Firm Source Audit: Evidence and Legal Checks',
  description: AUDIT_DESCRIPTION,
  path: '/audit',
  keywords: ['prop firm audit', 'prop firm legal entity', 'prop firm regulation', 'prop firm sources'],
  category: 'Prop firm due diligence',
});

const priorityAudit = [...propFirms]
  .sort((a, b) => {
    const riskA =
      (a.auditStatus === 'À auditer' ? 90 : a.auditStatus === 'Partiellement vérifié' ? 40 : 0) +
      a.reviewSignals.payoutRiskScore +
      (100 - a.reviewSignals.trustpilotReliabilityScore) +
      (a.status === 'À surveiller' ? 20 : 0) +
      (a.status === 'Fermée' ? 30 : 0);
    const riskB =
      (b.auditStatus === 'À auditer' ? 90 : b.auditStatus === 'Partiellement vérifié' ? 40 : 0) +
      b.reviewSignals.payoutRiskScore +
      (100 - b.reviewSignals.trustpilotReliabilityScore) +
      (b.status === 'À surveiller' ? 20 : 0) +
      (b.status === 'Fermée' ? 30 : 0);

    return riskB - riskA;
  })
  .slice(0, 10);

const trustpilotCovered = propFirms.filter(
  (firm) => firm.trustpilotRating || firm.sources.some((source) => /trustpilot/i.test(`${source.label} ${source.url}`))
);

const officialCovered = propFirms.filter((firm) => firm.sources.some((source) => /site officiel|official|help|faq|programmes/i.test(source.label)));

function legalSourceCount(firm: (typeof propFirms)[number]) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: (typeof propFirms)[number]) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

function legalRiskWeight(firm: (typeof propFirms)[number]) {
  const risk = firm.regulatoryAudit.riskLevel;
  const riskScore =
    risk === 'Critical' ? 100 :
    risk === 'High' ? 86 :
    risk === 'To audit' ? 74 :
    risk === 'Medium to high' ? 64 :
    risk === 'Medium' ? 48 :
    24;

  return riskScore + (firm.legalVerified ? 0 : 18) + (legalSourceCount(firm) < 2 ? 10 : 0);
}

function sourceDepthLabel(firm: (typeof propFirms)[number]) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'Deep sources';
  if (count >= 3) return 'Usable sources';
  if (count >= 1) return 'Thin sources';
  return 'No sources';
}

const legalVerifiedFirms = propFirms.filter((firm) => firm.legalVerified);
const legalWatchFirms = [...propFirms].filter(isLegalWatchFirm).sort((a, b) => legalRiskWeight(b) - legalRiskWeight(a));
const deepSourceFirms = propFirms.filter((firm) => legalSourceCount(firm) >= 5);
const regulatorCheckedFirms = propFirms.filter((firm) =>
  [...firm.auditSourcesChecked, ...firm.regulatoryAudit.regulatoryStatus, ...firm.regulatoryAudit.sources.map((source) => `${source.label} ${source.url}`)].some((item) =>
    /regulator|regulatory|fca|cftc|nfa|cysec|asic|sec|fsa|companies house|warning/i.test(item)
  )
);
const articleNewsCheckedFirms = propFirms.filter((firm) => firm.auditSourcesChecked.some((source) => /article|news|press/i.test(source)));

export default function AuditPage() {
  return (
    <main className="container audit-page">
      <PageStructuredData
        name="Prop firm source audit"
        description={AUDIT_DESCRIPTION}
        path="/audit"
        breadcrumbLabel="Source audit"
        dateModified="2026-07-13"
        items={priorityAudit.map((firm) => ({
          name: firm.name,
          path: `/firm/${firm.slug}`,
          description: toEnglishText(firm.verdict),
        }))}
      />
      <section className="audit-hero">
        <div>
          <div className="eyebrow">Public Audit</div>
          <h1>Sources, limits and reliability</h1>
          <p className="lead">
            PropRadar does not mix a fully verified profile with an entry added for monitoring. Each firm keeps a visible audit level, consulted sources and signals still needing reinforcement.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Compare firms</Link>
            <Link href="/regles" className="btn">View rules</Link>
            <Link href="/audit-communautaire" className="btn">Audit Reddit/X</Link>
          </div>
        </div>
        <div className="panel audit-method-panel">
          <div className="eyebrow">PropRadar Method</div>
          <ol>
            <li>Official sources for prices, rules and products.</li>
            <li>Trustpilot separated from commercial scoring, with caution on unverified facts.</li>
            <li>Reddit, forums and payout incidents treated as community signals.</li>
            <li>Legal entity, regulator status and press searches tracked separately from marketing claims.</li>
            <li>Unchecked entries remain visible, but are not recommended by default.</li>
          </ol>
        </div>
      </section>

      <section className="audit-stat-grid" aria-label="Audit coverage">
        <div className="summary-stat">
          <span>Total tracked</span>
          <strong>{propFirms.length}</strong>
          <small>prop firms</small>
        </div>
        <div className="summary-stat">
          <span>Multi-source</span>
          <strong>{verifiedFirms.length}</strong>
          <small>solid files</small>
        </div>
        <div className="summary-stat">
          <span>Partial</span>
          <strong>{partiallyVerifiedFirms.length}</strong>
          <small>to enrich</small>
        </div>
        <div className="summary-stat">
          <span>To audit</span>
          <strong>{firmsToAudit.length}</strong>
          <small>maximum caution</small>
        </div>
      </section>

      <section className="page-insight-strip audit-legal-strip" aria-label="Legal audit coverage">
        <Link href="/guides/prop-firm-legal-check">
          <span>Entity mapped</span>
          <strong>{legalVerifiedFirms.length}</strong>
          <small>profiles with a legal entity or official operating structure identified.</small>
        </Link>
        <Link href="/guides/prop-firm-legal-check">
          <span>Legal watch</span>
          <strong>{legalWatchFirms.length}</strong>
          <small>unverified entity, high-risk jurisdiction, regulator warning or thin source stack.</small>
        </Link>
        <Link href="/audit">
          <span>Deep sources</span>
          <strong>{deepSourceFirms.length}</strong>
          <small>profiles with five or more legal/source links available.</small>
        </Link>
        <Link href="/audit">
          <span>Regulator checks</span>
          <strong>{regulatorCheckedFirms.length}</strong>
          <small>files with regulator, warning-list or company-register checks recorded.</small>
        </Link>
        <Link href="/audit">
          <span>Press searches</span>
          <strong>{articleNewsCheckedFirms.length}</strong>
          <small>profiles where exact-name article/news searches were logged.</small>
        </Link>
      </section>

      <section className="section audit-grid">
        <article className="panel">
          <div className="eyebrow">Coverage</div>
          <h2>What is already sourced</h2>
          <div className="coverage-list">
            <div>
              <span>Official website or primary source</span>
              <strong>{officialCovered.length}/{propFirms.length}</strong>
            </div>
            <div>
              <span>Trustpilot identified</span>
              <strong>{trustpilotCovered.length}/{propFirms.length}</strong>
            </div>
            <div>
              <span>Profiles with tracked payout incidents</span>
              <strong>{propFirms.filter((firm) => firm.incidents > 0).length}/{propFirms.length}</strong>
            </div>
            <div>
              <span>Legal entities mapped</span>
              <strong>{legalVerifiedFirms.length}/{propFirms.length}</strong>
            </div>
            <div>
              <span>Exact-name press/news searches logged</span>
              <strong>{articleNewsCheckedFirms.length}/{propFirms.length}</strong>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="eyebrow">Priority</div>
          <h2>Next profiles to investigate</h2>
          <ul className="audit-priority-list">
            {priorityAudit.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{toEnglishText(firm.auditStatus)}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section audit-grid audit-legal-grid">
        <article className="panel">
          <div className="eyebrow">Legal Priority</div>
          <h2>Highest legal files to read first</h2>
          <ul className="audit-priority-list">
            {legalWatchFirms.slice(0, 10).map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}#regulatory`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>{firm.regulatoryAudit.riskLevel}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel audit-legal-method-panel">
          <div className="eyebrow">Legal Reading Order</div>
          <h2>How PropRadar reads a firm file</h2>
          <div className="legal-method-grid">
            <div>
              <span>01</span>
              <strong>Entity</strong>
              <small>Brand name, operating company, address, jurisdiction and registration number.</small>
            </div>
            <div>
              <span>02</span>
              <strong>Regulator</strong>
              <small>Broker status, simulated-trading disclaimer, warning lists and company registers.</small>
            </div>
            <div>
              <span>03</span>
              <strong>Terms</strong>
              <small>Refunds, chargebacks, payout forfeiture, arbitration, restricted countries and KYC.</small>
            </div>
            <div>
              <span>04</span>
              <strong>External checks</strong>
              <small>Independent press, regulator pages, closure notices, lawsuits and exact-name searches.</small>
            </div>
          </div>
        </article>
      </section>

      <section className="section">
        <div className="panel audit-list-panel">
          <div className="panel-title-row">
            <div>
              <div className="eyebrow">Full Base</div>
              <h2>{propFirms.length} profiles, visible proof level</h2>
            </div>
            <span>Last review: 2026-07-10</span>
          </div>

          <div className="audit-list">
            {propFirms.map((firm) => (
              <article className={`audit-row ${firm.auditStatus === 'Vérifié multi-source' ? 'audit-row-strong' : ''}`} key={firm.slug}>
                <div className="audit-firm-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <div>
                    <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                    <span>{toEnglishText(firm.bestFor)}</span>
                  </div>
                </div>

                <div className="audit-status-cell">
                  <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{toEnglishText(firm.auditStatus)}</span>
                  <span className={`badge ${statusClass(firm.status)}`}>{toEnglishText(firm.status)}</span>
                </div>

                <div className="audit-score-cell">
                  <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                    <span>Score</span>
                    <strong>{firm.score}</strong>
                    <small>/100</small>
                  </div>
                  <span>{formatUsd(firm.priceFrom)}</span>
                </div>

                <div className="audit-signal-cell">
                  <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                    Legal {firm.regulatoryAudit.riskLevel}
                  </span>
                  <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>
                    Trustpilot {toEnglishText(firm.reviewSignals.trustpilotReliability)}
                  </span>
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                    Payout {toEnglishText(firm.reviewSignals.payoutRisk)}
                  </span>
                </div>

                <div className="audit-source-cell">
                  <span>{firm.legalVerified ? 'Entity mapped' : 'Entity missing'}</span>
                  <span>{sourceDepthLabel(firm)}</span>
                  <span>{legalSourceCount(firm)} legal/source link(s)</span>
                  {firm.auditSourcesChecked.map((source) => (
                    <span key={source}>{toEnglishText(source)}</span>
                  ))}
                </div>

                <Link href={`/firm/${firm.slug}`} className="btn">View</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
