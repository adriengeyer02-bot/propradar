import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import {
  BLUE_GUARDIAN_AFFILIATE_URL,
  FTMO_AFFILIATE_URL,
  FUNDERPRO_AFFILIATE_URL,
  PROPRADAR_PROMO_CODE,
  THE5ERS_AFFILIATE_URL,
  formatUsd,
  getFirmBySlug,
  payoutRiskClass,
  propFirms,
  scoreClass,
} from '../lib/propFirms';

export const metadata: Metadata = {
  title: 'Promos prop firms et bons plans évaluations',
  description:
    'Promos et bons plans prop firms classés pour protéger le consommateur : réduction, conditions, risques payout et transparence affiliation.',
};

const PROMO_REVIEW_DATE = '2026-07-01';

const promoDeals = [
  {
    slug: 'fundednext',
    label: 'Promo vérifiée',
    title: '25% sur certains comptes CFD jusqu’à 50K',
    code: 'NEW25',
    value: '25%',
    sourceUrl: 'https://fundednext.com/#pricing-area',
    sourceLabel: 'Page officielle FundedNext',
    consumerVerdict:
      'Intéressant seulement si tu voulais déjà ce format de challenge. Ne pas monter de taille de compte juste pour utiliser le code.',
    caveats: ['Conditions exactes à confirmer au checkout', 'Offre limitée aux comptes éligibles', 'Règles payout à lire sur la source officielle'],
  },
  {
    slug: 'ftmo',
    label: 'Lien transparent',
    title: 'Pas de code public confirmé, lien affilié PropRadar',
    code: 'Aucun code',
    value: '0%',
    sourceUrl: FTMO_AFFILIATE_URL,
    sourceLabel: 'Lien affilié FTMO PropRadar',
    consumerVerdict:
      'À considérer pour la solidité et la clarté des règles, pas pour une réduction. Le lien est affilié mais le score reste indépendant.',
    caveats: ['Pas une promo de prix', 'Frais plus élevés que certaines alternatives', 'Restrictions news/règles à vérifier'],
  },
  {
    slug: 'the5ers',
    label: 'Affiliation transparente',
    title: 'Code PropRadar disponible au checkout',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'Lien affilié The5ers PropRadar',
    consumerVerdict:
      'Intéressant si tu cherchais déjà un programme à règles strictes et drawdown lisible. Le code ne doit pas remplacer la lecture des conditions High Stakes.',
    caveats: ['Réduction exacte à confirmer au checkout', 'Règles différentes selon programme', 'Lien affilié sans impact sur le score'],
  },
  {
    slug: 'funderpro',
    label: 'Affiliation transparente',
    title: 'Code PropRadar à tester sur les challenges FunderPro',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'Lien affilié FunderPro PropRadar',
    consumerVerdict:
      'À comparer pour le rapport prix / règles, en gardant en tête que la fiche PropRadar reste partielle et doit être confirmée sur les sources officielles.',
    caveats: ['Réduction exacte à confirmer au checkout', 'Fiche universe encore à enrichir', 'Lien affilié sans impact sur le score'],
  },
  {
    slug: 'blue-guardian',
    label: 'Affiliation transparente',
    title: 'Code PropRadar disponible avec le lien Blue Guardian',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Lien affilié Blue Guardian PropRadar',
    consumerVerdict:
      'À traiter comme une promo prudente : Blue Guardian reste à surveiller dans PropRadar, donc le payout et les règles doivent passer avant la réduction.',
    caveats: ['Réduction exacte à confirmer au checkout', 'Score PropRadar prudent', 'Lien affilié sans impact sur le score'],
  },
];

const valuePicks = ['the5ers', 'topstep', 'fundingpips', 'funderpro', 'the-trading-pit']
  .map((slug) => getFirmBySlug(slug))
  .filter((firm): firm is NonNullable<ReturnType<typeof getFirmBySlug>> => Boolean(firm));

export default function PromosPage() {
  const riskyDiscounts = propFirms
    .filter((firm) => firm.status !== 'Fermée' && firm.reviewSignals.payoutRisk !== 'Faible')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 6);

  return (
    <main className="container promos-page">
      <section className="promos-hero">
        <div>
          <div className="eyebrow">Promos utiles, pas pièges marketing</div>
          <h1>Les bons plans d’évaluation qui respectent le trader.</h1>
          <p className="lead">
            Une promo n’est intéressante que si la firm reste lisible, que le payout est crédible et que les règles ne
            te poussent pas à acheter un compte trop gros.
          </p>
        </div>
        <div className="promo-principles">
          <div><strong>1</strong><span>Réduction vérifiable</span></div>
          <div><strong>2</strong><span>Risque payout prioritaire</span></div>
          <div><strong>3</strong><span>Pas de sur-achat conseillé</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Vérifié le {PROMO_REVIEW_DATE}</div>
            <h2>Promos et liens à connaître.</h2>
          </div>
        </div>
        <div className="promo-grid">
          {promoDeals.map((deal) => {
            const firm = getFirmBySlug(deal.slug);
            if (!firm) return null;

            return (
              <article className="promo-card" key={deal.slug}>
                <div className="promo-card-top">
                  <div className="firm-result-main">
                    <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                    <div>
                      <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                      <div className="firm-subline">{deal.label}</div>
                    </div>
                  </div>
                  <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
                </div>
                <div className="promo-value">
                  <span>{deal.value}</span>
                  <strong>{deal.title}</strong>
                  <code>{deal.code}</code>
                </div>
                <p className="muted">{deal.consumerVerdict}</p>
                <ul className="risk-list">
                  {deal.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}
                </ul>
                <div className="promo-actions">
                  <a href={deal.sourceUrl} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                    Vérifier l’offre
                  </a>
                  <Link href={`/firm/${firm.slug}`} className="btn">Lire la fiche</Link>
                </div>
                <span className="promo-source">{deal.sourceLabel}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Bon rapport prix / risque</div>
            <h2>Évaluations à comparer même sans code promo.</h2>
          </div>
        </div>
        <div className="value-pick-list">
          {valuePicks.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="value-pick-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.products[0]?.name ?? 'Programme à vérifier'}</span>
                </div>
              </div>
              <div><span>Prix min.</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
              <div><span>Payout</span><strong>{firm.reviewSignals.payoutRisk}</strong></div>
              <div><span>Reddit</span><strong>+{firm.reviewSignals.redditPositiveMentions ?? 0} / -{firm.reviewSignals.redditNegativeMentions ?? 0}</strong></div>
              <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="panel promo-warning-panel">
          <div>
            <div className="eyebrow">Anti-piège</div>
            <h2>Une grosse réduction ne compense pas un risque payout.</h2>
            <p className="lead">
              PropRadar garde ces firms visibles pour que les traders ne confondent pas “moins cher” avec “meilleur”.
              Si une promo te pousse à ignorer les règles, ce n’est pas une bonne promo.
            </p>
          </div>
          <div className="promo-risk-list">
            {riskyDiscounts.map((firm) => (
              <Link href={`/firm/${firm.slug}`} key={firm.slug}>
                <span>{firm.name}</span>
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
