import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import {
  auditStatusClass,
  firmsToAudit,
  formatUsd,
  partiallyVerifiedFirms,
  payoutRiskClass,
  propFirms,
  reviewReliabilityClass,
  scoreClass,
  statusClass,
  verifiedFirms,
} from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

export const metadata: Metadata = {
  title: 'Source audit',
  description:
    'Transparent tracking of PropRadar sources: multi-source verified firms, partially verified firms and entries to audit.',
};

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

export default function AuditPage() {
  return (
    <main className="container audit-page">
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

      <section className="section">
        <div className="panel audit-list-panel">
          <div className="panel-title-row">
            <div>
              <div className="eyebrow">Full Base</div>
              <h2>195 profiles, visible proof level</h2>
            </div>
            <span>Last review: 2026-07-01</span>
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
                  <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>
                    Trustpilot {toEnglishText(firm.reviewSignals.trustpilotReliability)}
                  </span>
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                    Payout {toEnglishText(firm.reviewSignals.payoutRisk)}
                  </span>
                </div>

                <div className="audit-source-cell">
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
