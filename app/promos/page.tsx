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
import { toEnglishText } from '../lib/i18n';
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
  title: 'Best prop firm deals, discount codes and current offers',
  description:
    'Commercial but cautious radar for prop firm discount codes: Apex SAVENOW, Blue Guardian, MyFundedFutures BUILDER, FunderPro PROPRADAR, The5ers 1EIJ6PO, FundedNext and Topstep.',
};

const valuePicks = ['the5ers', 'topstep', 'fundingpips', 'funderpro', 'the-trading-pit', 'e8-markets', 'alpha-capital-group', 'take-profit-trader', 'myfundedfutures']
  .map((slug) => getFirmBySlug(slug))
  .filter((firm): firm is NonNullable<ReturnType<typeof getFirmBySlug>> => Boolean(firm));

const bestPromoDeals = getBestPromoDeals(12);
const megaPromoDeals = getMegaPromoDeals(4);
const budgetShortlist = getBudgetPromoShortlist(12);
const futuresShortlist = getFuturesPromoShortlist(8);
const categoryLabels: Record<string, string> = {
  code: 'Discount code',
  affiliate: 'Affiliate link',
  'official-discount': 'Official discount',
  'price-opportunity': 'Low price',
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
          <div className="eyebrow">Best deals right now</div>
          <h1>Prop firm offers worth checking, sorted by real risk.</h1>
          <p className="lead">
            PropRadar highlights discounts that can actually matter: discount code, entry price, transparent affiliate link,
            payout risk and proof level. The goal is simple: find the best deal without buying blind.
          </p>
        </div>
        <div className="promo-principles">
          <div><strong>1</strong><span>Official offers pushed first</span></div>
          <div><strong>2</strong><span>Affiliate codes clearly disclosed</span></div>
          <div><strong>3</strong><span>Payout risk visible before the click</span></div>
        </div>
      </section>

      <section className="section mega-deal-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Hot shortlist - checked on {PROMO_REVIEW_DATE}</div>
            <h2>Mega deals to check first.</h2>
          </div>
          <p className="section-note">
            This section is intentionally commercial: these are the offers that make people want to click. The caution stays visible next to them.
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
                  <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                    <span>Score</span>
                    <strong>{firm.score}</strong>
                    <small>/100</small>
                  </div>
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>Payout {toEnglishText(firm.reviewSignals.payoutRisk)}</span>
                </div>

                <div className="firm-result-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                  <div>
                    <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                    <div className="firm-subline">{toEnglishText(deal.label)}</div>
                  </div>
                </div>

                <div className="mega-deal-value">
                  <span>{deal.value}</span>
                  <strong>{toEnglishText(deal.title)}</strong>
                </div>

                <p>{toEnglishText(deal.commercialHook ?? deal.consumerVerdict)}</p>

                <div className="mega-deal-proof">
                  <div>
                    <span>Code</span>
                    <code>{deal.code}</code>
                  </div>
                  <div>
                    <span>Proof</span>
                    <strong>{toEnglishText(deal.proofLevel)}</strong>
                  </div>
                  <div>
                    <span>Deal score</span>
                    <strong>{deal.dealScore}/100</strong>
                  </div>
                </div>

                <div className="mega-deal-note">
                  <strong>{toEnglishText(deal.urgency ?? 'À vérifier avant achat')}</strong>
                  <span>{toEnglishText(deal.checkoutTip ?? deal.caveats[0])}</span>
                </div>

                <div className="promo-actions">
                  <a href={deal.sourceUrl} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                    Get the offer
                  </a>
                  <Link href={`/firm/${firm.slug}`} className="btn">Read analysis</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Checked on {PROMO_REVIEW_DATE}</div>
            <h2>All PropRadar-ranked offers.</h2>
          </div>
          <p className="section-note">
            Official discounts come before rumors. PropRadar links are marked as affiliate links and do not change the score.
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
                      <div className="firm-subline">{toEnglishText(deal.label)}</div>
                    </div>
                  </div>
                  <div className="promo-score-stack">
                    <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                      <span>Score</span>
                      <strong>{firm.score}</strong>
                      <small>/100</small>
                    </div>
                    <strong>{deal.dealScore}/100 deal</strong>
                  </div>
                </div>

                <div className="promo-value">
                  <span>{deal.value}</span>
                  <strong>{toEnglishText(deal.title)}</strong>
                  <code>{deal.code}</code>
                </div>

                <div className="promo-proof-row">
                  <span>{toEnglishText(deal.proofLevel)}</span>
                  <span>{categoryLabels[deal.category] ?? deal.category}</span>
                </div>

                <p className="muted">{toEnglishText(deal.consumerVerdict)}</p>
                <ul className="risk-list">
                  {deal.caveats.map((caveat) => <li key={caveat}>{toEnglishText(caveat)}</li>)}
                </ul>

                <div className="promo-tags">
                  {deal.bestFor.slice(0, 4).map((tag) => <span key={tag}>{toEnglishText(tag)}</span>)}
                </div>

                <div className="promo-actions">
                  <a href={deal.sourceUrl} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                    Check offer
                  </a>
                  <Link href={`/firm/${firm.slug}`} className="btn">Read profile</Link>
                </div>
                <span className="promo-source">{toEnglishText(deal.sourceNote ?? deal.sourceLabel)}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Price / Risk Deals</div>
            <h2>Low-ticket prop firms to watch this week.</h2>
          </div>
          <p className="section-note">
            Automatic shortlist: entry price below $100, decent score and no critical payout risk.
          </p>
        </div>
        <div className="deal-watch-grid">
          {budgetShortlist.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="deal-watch-card" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{toEnglishText(firm.bestFor)}</span>
                </div>
              </div>
              <div className="deal-watch-metrics">
                <div><span>Min. price</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
                <div><span>Score</span><strong>{firm.score}/100</strong></div>
                <div><span>Payout</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              </div>
              <small>{toEnglishText(firm.products[0]?.name ?? 'Programme à vérifier')}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Good price / risk ratio</div>
            <h2>Evaluations worth comparing even without a discount code.</h2>
          </div>
        </div>
        <div className="value-pick-list">
          {valuePicks.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="value-pick-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{toEnglishText(firm.products[0]?.name ?? 'Programme à vérifier')}</span>
                </div>
              </div>
              <div><span>Min. price</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
              <div><span>Payout</span><strong>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              <div><span>Reddit</span><strong>+{firm.reviewSignals.redditPositiveMentions ?? 0} / -{firm.reviewSignals.redditNegativeMentions ?? 0}</strong></div>
              <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                <span>Score</span>
                <strong>{firm.score}</strong>
                <small>/100</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Futures funding</div>
            <h2>Futures deals to compare.</h2>
          </div>
          <p className="section-note">
            For futures, the real deal often depends on funded-account fees, drawdown and payout caps.
          </p>
        </div>
        <div className="deal-table">
          {futuresShortlist.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="deal-table-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{toEnglishText(firm.products[0]?.name ?? 'Programme futures à vérifier')}</span>
                </div>
              </div>
              <div><span>Min. price</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
              <div><span>Drawdown</span><strong>{toEnglishText(firm.drawdownType)}</strong></div>
              <div><span>Payout</span><strong>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                <span>Score</span>
                <strong>{firm.score}</strong>
                <small>/100</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="promo-api-panel">
          <div>
            <div className="eyebrow">Internal API</div>
            <h2>Deals can now be reused through API endpoints.</h2>
            <p className="lead">
              These endpoints can feed a widget, a newsletter, a Discord bot or a dynamic SEO page.
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
            <div className="eyebrow">Prop firm discount code FAQ</div>
            <h2>Questions to ask before using a discount.</h2>
          </div>
        </div>
        <div className="promo-faq-grid">
          {promoFaq.map((item) => (
            <article className="promo-faq-card" key={item.question}>
              <h3>{toEnglishText(item.question)}</h3>
              <p>{toEnglishText(item.answer)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="panel promo-warning-panel">
          <div>
            <div className="eyebrow">Trap Check</div>
            <h2>A big discount does not offset payout risk.</h2>
            <p className="lead">
              PropRadar keeps these firms visible so traders do not confuse cheaper with better.
              If a deal pushes you to ignore the rules, it is not a good deal.
            </p>
          </div>
          <div className="promo-risk-list">
            {riskyDiscounts.map((firm) => (
              <Link href={`/firm/${firm.slug}`} key={firm.slug}>
                <span>{firm.name}</span>
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
