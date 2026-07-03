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

export const metadata: Metadata = {
  title: 'Audit des sources',
  description:
    'Suivi transparent des sources PropRadar : firmes vérifiées multi-source, partiellement vérifiées et entrées à auditer.',
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
          <div className="eyebrow">Audit public</div>
          <h1>Sources, limites et fiabilité</h1>
          <p className="lead">
            PropRadar ne mélange pas une fiche entièrement vérifiée avec une entrée ajoutée pour surveillance. Chaque firm garde un niveau d’audit visible, avec les sources consultées et les signaux à renforcer.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Comparer les firms</Link>
            <Link href="/regles" className="btn">Voir les règles</Link>
          </div>
        </div>
        <div className="panel audit-method-panel">
          <div className="eyebrow">Méthode PropRadar</div>
          <ol>
            <li>Sources officielles pour les prix, règles et produits.</li>
            <li>Trustpilot séparé du score commercial, avec réserve sur les faits non vérifiés.</li>
            <li>Reddit, forums et incidents payout traités comme signaux communautaires.</li>
            <li>Les entrées non contrôlées restent visibles, mais non recommandées par défaut.</li>
          </ol>
        </div>
      </section>

      <section className="audit-stat-grid" aria-label="Couverture de l'audit">
        <div className="summary-stat">
          <span>Total suivi</span>
          <strong>{propFirms.length}</strong>
          <small>prop firms</small>
        </div>
        <div className="summary-stat">
          <span>Multi-source</span>
          <strong>{verifiedFirms.length}</strong>
          <small>dossiers solides</small>
        </div>
        <div className="summary-stat">
          <span>Partiel</span>
          <strong>{partiallyVerifiedFirms.length}</strong>
          <small>à enrichir</small>
        </div>
        <div className="summary-stat">
          <span>À auditer</span>
          <strong>{firmsToAudit.length}</strong>
          <small>prudence maximale</small>
        </div>
      </section>

      <section className="section audit-grid">
        <article className="panel">
          <div className="eyebrow">Couverture</div>
          <h2>Ce qui est déjà sourcé</h2>
          <div className="coverage-list">
            <div>
              <span>Site officiel ou source primaire</span>
              <strong>{officialCovered.length}/{propFirms.length}</strong>
            </div>
            <div>
              <span>Trustpilot identifié</span>
              <strong>{trustpilotCovered.length}/{propFirms.length}</strong>
            </div>
            <div>
              <span>Fiches avec incidents payout suivis</span>
              <strong>{propFirms.filter((firm) => firm.incidents > 0).length}/{propFirms.length}</strong>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="eyebrow">Priorité</div>
          <h2>Prochaines fiches à fouiller</h2>
          <ul className="audit-priority-list">
            {priorityAudit.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{firm.auditStatus}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="panel audit-list-panel">
          <div className="panel-title-row">
            <div>
              <div className="eyebrow">Base complète</div>
              <h2>195 fiches, niveau de preuve visible</h2>
            </div>
            <span>Dernière revue : 2026-07-01</span>
          </div>

          <div className="audit-list">
            {propFirms.map((firm) => (
              <article className={`audit-row ${firm.auditStatus === 'Vérifié multi-source' ? 'audit-row-strong' : ''}`} key={firm.slug}>
                <div className="audit-firm-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <div>
                    <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                    <span>{firm.bestFor}</span>
                  </div>
                </div>

                <div className="audit-status-cell">
                  <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{firm.auditStatus}</span>
                  <span className={`badge ${statusClass(firm.status)}`}>{firm.status}</span>
                </div>

                <div className="audit-score-cell">
                  <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
                  <span>{formatUsd(firm.priceFrom)}</span>
                </div>

                <div className="audit-signal-cell">
                  <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>
                    Trustpilot {firm.reviewSignals.trustpilotReliability}
                  </span>
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                    Payout {firm.reviewSignals.payoutRisk}
                  </span>
                </div>

                <div className="audit-source-cell">
                  {firm.auditSourcesChecked.map((source) => (
                    <span key={source}>{source}</span>
                  ))}
                </div>

                <Link href={`/firm/${firm.slug}`} className="btn">Voir</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
