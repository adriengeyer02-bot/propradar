import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import {
  formatUsd,
  getFirmBySlug,
  payoutRiskClass,
  propFirms,
  scoreClass,
} from '../lib/propFirms';
import {
  PROMO_REVIEW_DATE,
  getBestPromoDeals,
  getBudgetPromoShortlist,
  getFuturesPromoShortlist,
  getMegaPromoDeals,
  promoFaq,
} from '../lib/promoResearch';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Méga bons plans prop firms, codes promo et offres du moment',
  description:
    'Radar commercial et prudent des codes promo prop firms : Apex SAVENOW, Blue Guardian, MyFundedFutures BUILDER, FunderPro PROPRADAR, The5ers 1EIJ6PO, FundedNext et Topstep.',
};

const valuePicks = ['the5ers', 'topstep', 'fundingpips', 'funderpro', 'the-trading-pit', 'e8-markets', 'alpha-capital-group', 'take-profit-trader', 'myfundedfutures']
  .map((slug) => getFirmBySlug(slug))
  .filter((firm): firm is NonNullable<ReturnType<typeof getFirmBySlug>> => Boolean(firm));

const bestPromoDeals = getBestPromoDeals(12);
const megaPromoDeals = getMegaPromoDeals(4);
const budgetShortlist = getBudgetPromoShortlist(12);
const futuresShortlist = getFuturesPromoShortlist(8);
const categoryLabels: Record<string, string> = {
  code: 'Code promo',
  affiliate: 'Affiliation',
  'official-discount': 'Remise officielle',
  'price-opportunity': 'Prix bas',
  futures: 'Futures',
};

function isActiveFirm(status: string) {
  return !/ferm/i.test(status);
}

export default function PromosPage() {
  const riskyDiscounts = propFirms
    .filter((firm) => isActiveFirm(firm.status) && firm.reviewSignals.payoutRisk !== 'Faible')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 6);

  return (
    <main className="container promos-page">
      <section className="promos-hero">
        <div>
          <div className="eyebrow">Méga bons plans du moment</div>
          <h1>Les offres prop firms à ne pas rater, triées par vrai risque.</h1>
          <p className="lead">
            PropRadar met en avant les réductions qui peuvent vraiment compter : code promo, prix d'appel, lien affilié transparent,
            risque payout et niveau de preuve. Le but est simple : trouver le meilleur deal sans acheter les yeux fermés.
          </p>
        </div>
        <div className="promo-principles">
          <div><strong>1</strong><span>Offres officielles poussées en premier</span></div>
          <div><strong>2</strong><span>Codes affiliés déclarés clairement</span></div>
          <div><strong>3</strong><span>Risque payout visible avant le clic</span></div>
        </div>
      </section>

      <section className="section mega-deal-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Sélection chaude - vérifiée le {PROMO_REVIEW_DATE}</div>
            <h2>Méga deals à regarder en premier.</h2>
          </div>
          <p className="section-note">
            Ici, on assume le côté commercial : ce sont les offres qui donnent envie de cliquer. La prudence reste affichée juste à côté.
          </p>
        </div>
        <div className="mega-deal-grid">
          {megaPromoDeals.map((deal, index) => {
            const firm = getFirmBySlug(deal.slug);
            if (!firm) return null;

            return (
              <article className={`mega-deal-card ${index === 0 ? 'mega-deal-card-featured' : ''}`} key={`mega-${deal.slug}-${deal.code}`}>
                <div className="mega-deal-topline">
                  <span className="mega-rank">#{index + 1}</span>
                  <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100 firm</span>
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>Payout {firm.reviewSignals.payoutRisk}</span>
                </div>

                <div className="firm-result-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                  <div>
                    <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                    <div className="firm-subline">{deal.label}</div>
                  </div>
                </div>

                <div className="mega-deal-value">
                  <span>{deal.value}</span>
                  <strong>{deal.title}</strong>
                </div>

                <p>{deal.commercialHook ?? deal.consumerVerdict}</p>

                <div className="mega-deal-proof">
                  <div>
                    <span>Code</span>
                    <code>{deal.code}</code>
                  </div>
                  <div>
                    <span>Preuve</span>
                    <strong>{deal.proofLevel}</strong>
                  </div>
                  <div>
                    <span>Score deal</span>
                    <strong>{deal.dealScore}/100</strong>
                  </div>
                </div>

                <div className="mega-deal-note">
                  <strong>{deal.urgency ?? 'À vérifier avant achat'}</strong>
                  <span>{deal.checkoutTip ?? deal.caveats[0]}</span>
                </div>

                <div className="promo-actions">
                  <a href={deal.sourceUrl} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                    Profiter de l'offre
                  </a>
                  <Link href={`/firm/${firm.slug}`} className="btn">Lire l'analyse</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Vérifié le {PROMO_REVIEW_DATE}</div>
            <h2>Toutes les offres triées PropRadar.</h2>
          </div>
          <p className="section-note">
            Les remises officielles passent devant les rumeurs. Les liens PropRadar sont marqués comme affiliés et ne changent pas le score.
          </p>
        </div>
        <div className="promo-grid">
          {bestPromoDeals.map((deal) => {
            const firm = getFirmBySlug(deal.slug);
            if (!firm) return null;

            return (
              <article className="promo-card" key={`${deal.slug}-${deal.code}-${deal.value}`}>
                <div className="promo-card-top">
                  <div className="firm-result-main">
                    <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                    <div>
                      <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                      <div className="firm-subline">{deal.label}</div>
                    </div>
                  </div>
                  <div className="promo-score-stack">
                    <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
                    <strong>{deal.dealScore}/100 deal</strong>
                  </div>
                </div>

                <div className="promo-value">
                  <span>{deal.value}</span>
                  <strong>{deal.title}</strong>
                  <code>{deal.code}</code>
                </div>

                <div className="promo-proof-row">
                  <span>{deal.proofLevel}</span>
                  <span>{categoryLabels[deal.category] ?? deal.category}</span>
                </div>

                <p className="muted">{deal.consumerVerdict}</p>
                <ul className="risk-list">
                  {deal.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}
                </ul>

                <div className="promo-tags">
                  {deal.bestFor.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                </div>

                <div className="promo-actions">
                  <a href={deal.sourceUrl} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                    Vérifier l'offre
                  </a>
                  <Link href={`/firm/${firm.slug}`} className="btn">Lire la fiche</Link>
                </div>
                <span className="promo-source">{deal.sourceNote ?? deal.sourceLabel}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Bons plans prix / risque</div>
            <h2>Prop firms à petit ticket à surveiller cette semaine.</h2>
          </div>
          <p className="section-note">
            Sélection automatique : prix d'entrée sous 100$, score correct et pas de risque payout critique.
          </p>
        </div>
        <div className="deal-watch-grid">
          {budgetShortlist.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="deal-watch-card" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.bestFor}</span>
                </div>
              </div>
              <div className="deal-watch-metrics">
                <div><span>Prix min.</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
                <div><span>Score</span><strong>{firm.score}/100</strong></div>
                <div><span>Payout</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</strong></div>
              </div>
              <small>{firm.products[0]?.name ?? 'Programme à vérifier'}</small>
            </Link>
          ))}
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
        <div className="section-heading">
          <div>
            <div className="eyebrow">Futures funding</div>
            <h2>Bons plans futures à comparer.</h2>
          </div>
          <p className="section-note">
            Pour les futures, le vrai bon plan dépend souvent des frais après passage funded, du drawdown et des caps de payout.
          </p>
        </div>
        <div className="deal-table">
          {futuresShortlist.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="deal-table-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.products[0]?.name ?? 'Programme futures à vérifier'}</span>
                </div>
              </div>
              <div><span>Prix min.</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
              <div><span>Drawdown</span><strong>{firm.drawdownType}</strong></div>
              <div><span>Payout</span><strong>{firm.reviewSignals.payoutRisk}</strong></div>
              <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="promo-api-panel">
          <div>
            <div className="eyebrow">API interne</div>
            <h2>Les promos sont maintenant exploitables par API.</h2>
            <p className="lead">
              Ces endpoints peuvent alimenter un widget, une newsletter, un bot Discord ou une page SEO dynamique.
            </p>
          </div>
          <div className="api-chip-list">
            <code>/api/promos</code>
            <code>/api/promos?mega=true&amp;limit=4</code>
            <code>/api/promos?best=true&amp;limit=5</code>
            <code>/api/promos?category=futures</code>
            <code>/api/promos?style=news trading</code>
            <code>/api/promos/best?mega=true</code>
            <code>/api/promos/firm/funderpro</code>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">FAQ codes promo prop firms</div>
            <h2>Les questions à se poser avant d'utiliser une réduction.</h2>
          </div>
        </div>
        <div className="promo-faq-grid">
          {promoFaq.map((item) => (
            <article className="promo-faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="panel promo-warning-panel">
          <div>
            <div className="eyebrow">Anti-piège</div>
            <h2>Une grosse réduction ne compense pas un risque payout.</h2>
            <p className="lead">
              PropRadar garde ces firms visibles pour que les traders ne confondent pas moins cher avec meilleur.
              Si une promo te pousse à ignorer les règles, ce n'est pas une bonne promo.
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
