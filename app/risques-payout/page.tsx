import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import { payoutRiskClass, propFirms, scoreClass } from '../lib/propFirms';

export const metadata: Metadata = {
  title: 'Risques payout des prop firms',
  description:
    'Radar des risques payout prop firms : retards, refus, incidents, notes publiques a ponderer et signaux de prudence avant achat.',
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
          <h1>Prop firms : risques payout a verifier avant achat</h1>
          <p className="lead">
            Les problemes de retrait coutent plus cher qu une reduction ratee. Cette page isole les firms ou le risque
            payout, les incidents ou les conditions de retrait demandent une lecture plus stricte.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Comparer avec tous les signaux</Link>
            <Link href="/regles" className="btn">Lire les clauses sensibles</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{risky.length}</strong><span>firms affichees en surveillance</span></div>
          <div><strong>{criticalCount}</strong><span>risques critiques</span></div>
          <div><strong>{elevatedCount}</strong><span>risques eleves</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Alertes prioritaires</div>
            <h2>Les dossiers a lire deux fois</h2>
          </div>
        </div>
        <div className="guide-risk-grid">
          {risky.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="guide-risk-card" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.reviewSignals.payoutIncidentStatus}</span>
                </div>
              </div>
              <div className="guide-risk-score">
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</span>
                <strong>{firm.reviewSignals.payoutRiskScore}/100</strong>
              </div>
              <p>{firm.reviewSignals.payoutIssues[0] ?? firm.communitySignal}</p>
              <span className={`badge ${scoreClass(firm.score)}`}>Score global {firm.score}/100</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
