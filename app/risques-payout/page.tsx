import FirmRow, { FirmTableHead } from '../components/ui/FirmRow';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import PageStructuredData from '../components/PageStructuredData';
import { createPageMetadata } from '../lib/pageMetadata';
import type { PropFirm } from '../lib/propFirms';
import {
  auditStatusClass,
  documentedIncidents,
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
  const aboveLowCount = propFirms.filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible').length;
  const elevatedCount = propFirms.filter((firm) => firm.reviewSignals.payoutRisk === 'Élevé').length;
  const incidentCount = risky.reduce((total, firm) => total + documentedIncidents(firm).length, 0);
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
        <dl className="pr-hero-stats">
          <div><dt>Firms with payout risk above low</dt><dd>{aboveLowCount}</dd></div>
          <div><dt>of which critical</dt><dd>{criticalCount}</dd></div>
          <div><dt>of which high</dt><dd>{elevatedCount}</dd></div>
          <div><dt>Shown below (most at risk)</dt><dd>{risky.length}</dd></div>
        </dl>
      </section>

      <section className="pr-stat-line" aria-label="Payout risk reading summary">
        <dl>
          <div><dt>Legal watch, in the list below</dt><dd>{legalWatchCount}</dd></div>
          <div><dt>With 5+ sources</dt><dd>{deepSourceRiskCount}</dd></div>
          <div><dt>Press checks recorded</dt><dd>{articleNewsCheckedCount}</dd></div>
        </dl>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Withdrawal Method</div>
            <h2>Payout risk needs proof, not rumor.</h2>
          </div>
        </div>
        <ul className="pr-decision-notes pr-decision-notes-4">
          <li><strong>Incident load</strong><span>Tracked incident count across the current payout watchlist, weighted against score and public signals.</span></li>
          <li><strong>Legal overlap</strong><span>The highest caution zone is payout stress plus unverified entity, regulator warning or thin legal source stack.</span></li>
          <li><strong>Source depth</strong><span>Deeply sourced risk files are more useful than isolated screenshots or unsourced social complaints.</span></li>
          <li><strong>Review filter</strong><span>Trustpilot and community ratings are treated as signals, not proof that a disputed withdrawal is valid.</span></li>
        </ul>
      </section>

      <section className="section" id="priority-alerts">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Priority Alerts</div>
            <h2>Profiles to read twice</h2>
          </div>
        </div>
        <div className="pr-firm-table" role="table" aria-label="Prop firms with payout risk above low">
          <FirmTableHead />
          {risky.map((firm) => (
            <FirmRow
              key={firm.slug}
              firm={firm}
              subline={toEnglishText(firm.reviewSignals.payoutIssues[0] ?? firm.reviewSignals.payoutIncidentStatus)}
            />
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
