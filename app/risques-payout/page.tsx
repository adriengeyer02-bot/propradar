import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import { payoutRiskClass, propFirms, scoreClass } from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

export const metadata: Metadata = {
  title: 'Prop firm payout risks',
  description:
    'Radar for prop firm payout risks: delays, denials, incidents, public ratings to weigh and caution signals before buying.',
  alternates: {
    canonical: '/risques-payout',
  },
};

export default function PayoutRiskPage() {
  const risky = [...propFirms]
    .filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 24);
  const criticalCount = propFirms.filter((firm) => firm.reviewSignals.payoutRisk === 'Critique').length;
  const elevatedCount = propFirms.filter(
    (firm) => firm.reviewSignals.payoutRiskScore >= 65 && firm.reviewSignals.payoutRiskScore < 85
  ).length;

  return (
    <main className="container guide-page">
      <section className="guide-hero">
        <div>
          <div className="eyebrow">Payout watch</div>
          <h1>Prop firm payout risks to check before buying</h1>
          <p className="lead">
            Withdrawal problems cost more than a missed discount. This page isolates firms where payout risk,
            incidents or withdrawal conditions require stricter reading.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Compare with all signals</Link>
            <Link href="/regles" className="btn">Read sensitive clauses</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{risky.length}</strong><span>firms shown in watch mode</span></div>
          <div><strong>{criticalCount}</strong><span>critical risks</span></div>
          <div><strong>{elevatedCount}</strong><span>high risks</span></div>
        </div>
      </section>

      <section className="section">
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
              <div className="guide-risk-score">
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
                <strong>{firm.reviewSignals.payoutRiskScore}/100</strong>
              </div>
              <p>{toEnglishText(firm.reviewSignals.payoutIssues[0] ?? firm.communitySignal)}</p>
              <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={`Overall PropRadar score ${firm.score} out of 100`}>
                <span>Overall</span>
                <strong>{firm.score}</strong>
                <small>/100</small>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
