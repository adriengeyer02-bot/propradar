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
  promoFaq,
} from '../lib/promoResearch';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Codes promo prop firms et meilleurs bons plans du moment',
  description:
    'Radar des codes promo prop firms, liens affilies transparents et offres officielles a verifier : Blue Guardian, Apex, Take Profit Trader, MyFundedFutures, The5ers, FunderPro, FundedNext et Topstep.',
};

const valuePicks = ['the5ers', 'topstep', 'fundingpips', 'funderpro', 'the-trading-pit', 'e8-markets', 'alpha-capital-group', 'take-profit-trader', 'myfundedfutures']
  .map((slug) => getFirmBySlug(slug))
  .filter((firm): firm is NonNullable<ReturnType<typeof getFirmBySlug>> => Boolean(firm));

const bestPromoDeals = getBestPromoDeals(12);
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
          <div className="eyebrow">Promos utiles, pas pieges marketing</div>
          <h1>Les meilleurs bons plans prop firms, classes par risque.</h1>
          <p className="lead">
            PropRadar croise les reductions, les codes, les liens affilies, le score de la firm et le risque payout.
            Une grosse remise peut etre une bonne affaire, mais seulement si les regles restent propres.
          </p>
        </div>
        <div className="promo-principles">
          <div><strong>1</strong><span>Source officielle ou affiliation declaree</span></div>
          <div><strong>2</strong><span>Score deal + risque payout visibles</span></div>
          <div><strong>3</strong><span>Verification checkout avant achat</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Verifie le {PROMO_REVIEW_DATE}</div>
            <h2>Top offres trouvees maintenant.</h2>
          </div>
          <p className="section-note">
            Les remises officielles passent devant les rumeurs. Les liens PropRadar sont marques comme affilies et ne changent pas le score.
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
                    Verifier l'offre
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
            <h2>Prop firms a petit ticket a surveiller cette semaine.</h2>
          </div>
          <p className="section-note">
            Selection automatique : prix d'entree sous 100$, score correct et pas de risque payout critique.
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
              <small>{firm.products[0]?.name ?? 'Programme a verifier'}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Bon rapport prix / risque</div>
            <h2>Evaluations a comparer meme sans code promo.</h2>
          </div>
        </div>
        <div className="value-pick-list">
          {valuePicks.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="value-pick-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.products[0]?.name ?? 'Programme a verifier'}</span>
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
            <h2>Bons plans futures a comparer.</h2>
          </div>
          <p className="section-note">
            Pour les futures, le vrai bon plan depend souvent des frais apres passage funded, du drawdown et des caps de payout.
          </p>
        </div>
        <div className="deal-table">
          {futuresShortlist.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="deal-table-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.products[0]?.name ?? 'Programme futures a verifier'}</span>
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
            <code>/api/promos?best=true&amp;limit=5</code>
            <code>/api/promos?category=futures</code>
            <code>/api/promos?style=news trading</code>
            <code>/api/promos/best</code>
            <code>/api/promos/firm/funderpro</code>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">FAQ codes promo prop firms</div>
            <h2>Les questions a se poser avant d'utiliser une reduction.</h2>
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
            <div className="eyebrow">Anti-piege</div>
            <h2>Une grosse reduction ne compense pas un risque payout.</h2>
            <p className="lead">
              PropRadar garde ces firms visibles pour que les traders ne confondent pas moins cher avec meilleur.
              Si une promo te pousse a ignorer les regles, ce n'est pas une bonne promo.
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
