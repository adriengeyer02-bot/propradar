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

const PAYOUT_RISK_DESCRIPTION =
  'Track prop-firm payout delays, denials, incidents, legal checks and source depth before paying for an evaluation or funded account.';

export const metadata = createPageMetadata({
  title: 'Prop Firm Payout Risks: Delays and Denial Signals',
  description: PAYOUT_RISK_DESCRIPTION,
  path: '/risques-payout',
  keywords: ['prop firm payout problem', 'prop firm payout denial', 'prop firm payout risk', 'prop firm withdrawal'],
  category: 'Prop firm payout risk',
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

export default function PayoutRiskPage() {
  const risky = [...propFirms]
    .filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 24);
  const criticalCount = propFirms.filter((firm) => firm.reviewSignals.payoutRisk === 'Critique').length;
  const elevatedCount = propFirms.filter(
    (firm) => firm.reviewSignals.payoutRiskScore >= 65 && firm.reviewSignals.payoutRiskScore < 85
  ).length;
  const incidentCount = risky.reduce((total, firm) => total + firm.incidents, 0);
  const legalWatchCount = risky.filter(isLegalWatchFirm).length;
  const deepSourceRiskCount = risky.filter((firm) => legalSourceCount(firm) >= 5).length;
  const articleNewsCheckedCount = risky.filter((firm) => firm.auditSourcesChecked.some((source) => /article|news|press/i.test(source))).length;
  const payoutLegalWatch = risky.filter(isLegalWatchFirm).slice(0, 8);

  return (
    <main className="container guide-page">
      <PageStructuredData
        name="Prop firm payout risk watch"
        description={PAYOUT_RISK_DESCRIPTION}
        path="/risques-payout"
        breadcrumbLabel="Payout risks"
        dateModified="2026-07-13"
        items={risky.map((firm) => ({
          name: firm.name,
          path: `/firm/${firm.slug}`,
          description: `Payout risk ${toEnglishText(firm.reviewSignals.payoutRisk).toLowerCase()}. ${toEnglishText(firm.verdict)}`,
        }))}
      />
      <section className="guide-hero">
        <div>
          <div className="eyebrow">Payout watch</div>
          <h1>Prop firm payout risks to check before buying</h1>
          <p className="lead">
            Withdrawal problems cost more than a missed discount. This page isolates firms where payout risk,
            incidents, legal context or withdrawal conditions require stricter reading.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Compare with all signals</Link>
            <Link href="/regles" className="btn">Read sensitive clauses</Link>
            <Link href="/audit" className="btn">Check sources</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{risky.length}</strong><span>firms shown in watch mode</span></div>
          <div><strong>{criticalCount}</strong><span>critical risks</span></div>
          <div><strong>{elevatedCount}</strong><span>high risks</span></div>
          <div><strong>{legalWatchCount}</strong><span>legal watch overlaps</span></div>
        </div>
      </section>

      <section className="page-insight-strip" aria-label="Payout risk reading summary">
        <Link href="#priority-alerts">
          <span>Watch mode</span>
          <strong>{risky.length}</strong>
          <small>Firms shown because payout risk is above low.</small>
        </Link>
        <Link href="/comparateur">
          <span>Critical</span>
          <strong>{criticalCount}</strong>
          <small>Use the full comparator before considering any checkout.</small>
        </Link>
        <Link href="/audit">
          <span>Source depth</span>
          <strong>{deepSourceRiskCount}</strong>
          <small>Watch profiles with five or more saved source links.</small>
        </Link>
        <Link href="/audit">
          <span>Press checks</span>
          <strong>{articleNewsCheckedCount}</strong>
          <small>Risky files where article, news or press searches were recorded.</small>
        </Link>
        <Link href="/regles">
          <span>Rule traps</span>
          <strong>Read terms</strong>
          <small>Consistency, KYC and withdrawal caps matter most.</small>
        </Link>
        <Link href="/trustpilot-prop-firms">
          <span>Review cross-check</span>
          <strong>Required</strong>
          <small>Public ratings do not prove withdrawals.</small>
        </Link>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Withdrawal Method</div>
            <h2>Payout risk needs proof, not rumor.</h2>
          </div>
        </div>
        <div className="best-method-grid">
          <article className="panel best-method-card">
            <span>Incident load</span>
            <strong>{incidentCount}</strong>
            <p>Tracked incident count across the current payout watchlist, weighted against score and public signals.</p>
          </article>
          <article className="panel best-method-card">
            <span>Legal overlap</span>
            <strong>{legalWatchCount}</strong>
            <p>The highest caution zone is payout stress plus unverified entity, regulator warning or thin legal source stack.</p>
          </article>
          <article className="panel best-method-card">
            <span>Source depth</span>
            <strong>{deepSourceRiskCount}</strong>
            <p>Deeply sourced risk files are more useful than isolated screenshots or unsourced social complaints.</p>
          </article>
          <article className="panel best-method-card">
            <span>Review filter</span>
            <strong>Public</strong>
            <p>Trustpilot and community ratings are treated as signals, not proof that a disputed withdrawal is valid.</p>
          </article>
        </div>
      </section>

      <section className="section" id="priority-alerts">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Priority Alerts</div>
            <h2>Profiles to read twice</h2>
          </div>
        </div>
        <div className="guide-risk-grid">
          {risky.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="guide-risk-card" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{toEnglishText(firm.reviewSignals.payoutIncidentStatus)}</span>
                </div>
              </div>
              <div className="ranking-proof-chips" aria-label={`${firm.name} payout proof context`}>
                <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                  Legal {firm.regulatoryAudit.riskLevel}
                </span>
                <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>
                  {toEnglishText(firm.auditStatus)}
                </span>
                <span className={`badge ${sourceDepthClass(firm)}`}>
                  {sourceDepthLabel(firm)}
                </span>
              </div>
              <div className="guide-risk-score">
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
                <strong>{firm.reviewSignals.payoutRiskScore}/100</strong>
              </div>
              <p>{toEnglishText(firm.reviewSignals.payoutIssues[0] ?? firm.communitySignal)}</p>
              <div className="payout-risk-meta">
                <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>
                  Trustpilot {toEnglishText(firm.reviewSignals.trustpilotReliability)}
                </span>
                <small>{legalSourceCount(firm)} source link(s)</small>
              </div>
              <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={`Overall PropRadar score ${firm.score} out of 100`}>
                <span>Overall</span>
                <strong>{firm.score}</strong>
                <small>/100</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">Bad Mix</div>
          <h2>Payout pressure plus legal opacity</h2>
          <div className="guide-signal-stack">
            {(payoutLegalWatch.length ? payoutLegalWatch : risky.slice(0, 8)).map((firm) => (
              <Link href={`/firm/${firm.slug}#regulatory`} key={firm.slug}>
                <span>{firm.name}</span>
                <span className="guide-signal-stack-meta">
                  <strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                    {toEnglishText(firm.reviewSignals.payoutRisk)}
                  </strong>
                  <small>{firm.regulatoryAudit.riskLevel}</small>
                </span>
              </Link>
            ))}
          </div>
        </article>
        <article className="panel">
          <div className="eyebrow">Before paying</div>
          <h2>Read these clauses first</h2>
          <ul className="risk-list">
            <li>Reward review, KYC and prohibited-trading clauses before the first payout.</li>
            <li>Refund and chargeback language after credentials or platform access are delivered.</li>
            <li>Consistency, best-day, max-lot, copy-trading and account-linking restrictions.</li>
            <li>Entity, jurisdiction, dispute venue and whether the account is simulated or broker-linked.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
