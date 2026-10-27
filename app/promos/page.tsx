import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import RiskPip from '../components/ui/RiskPip';
import ScoreRing from '../components/ui/ScoreRing';
import { legalTone, payoutTone } from '../lib/riskTone';
import PageStructuredData from '../components/PageStructuredData';
import { createPageMetadata } from '../lib/pageMetadata';
import {
  auditStatusClass,
  formatUsd,
  getFirmBySlug,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
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

const PROMOS_DESCRIPTION =
  'Compare current prop-firm deals and discount codes with payout risk, legal evidence, source depth and affiliate disclosure visible before checkout.';

export const metadata = createPageMetadata({
  title: 'Prop Firm Deals and Discount Codes: Risk-Checked',
  description: PROMOS_DESCRIPTION,
  path: '/promos',
  keywords: ['prop firm discount code', 'prop firm deals', 'prop firm promo', 'cheap prop firm challenge'],
  category: 'Prop firm deals',
});

const valuePicks = ['the5ers', 'topstep', 'fundingpips', 'funderpro', 'the-trading-pit', 'e8-markets', 'alpha-capital-group', 'take-profit-trader', 'myfundedfutures']
  .map((slug) => getFirmBySlug(slug))
  .filter((firm): firm is NonNullable<ReturnType<typeof getFirmBySlug>> => Boolean(firm));

const bestPromoDeals = getBestPromoDeals(30);
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

function legalSourceCount(firm: (typeof propFirms)[number]) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function sourceDepthLabel(firm: (typeof propFirms)[number]) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'Deep sources';
  if (count >= 3) return 'Usable sources';
  if (count >= 1) return 'Thin sources';
  return 'No sources';
}

function sourceDepthClass(firm: (typeof propFirms)[number]) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'badge-green';
  if (count >= 2) return 'badge-amber';
  return 'badge-red';
}

function availabilityClass(availability: string) {
  if (availability === 'Active official offer') return 'promo-status-live';
  if (availability === 'Official price') return 'promo-status-price';
  return 'promo-status-check';
}

type RankedDeal = ReturnType<typeof getBestPromoDeals>[number];

function DealCard({
  deal,
  firm,
  rank,
  featured = false,
  cta,
}: {
  deal: RankedDeal;
  firm: NonNullable<ReturnType<typeof getFirmBySlug>>;
  rank?: number;
  featured?: boolean;
  cta: string;
}) {
  return (
    <article className={`pr-deal${featured ? ' pr-deal-featured' : ''}`}>
      <header className="pr-deal-head">
        {typeof rank === 'number' ? <span className="pr-deal-rank">#{rank}</span> : null}
        <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="md" />
        <span className="pr-deal-firm">
          <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
          <small>{toEnglishText(deal.label)}</small>
        </span>
        <ScoreRing score={firm.score} size="sm" />
      </header>

      <div className="pr-deal-pips">
        <RiskPip compact label="Payout" value={toEnglishText(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
        <RiskPip compact label="Legal" value={firm.regulatoryAudit.riskLevel} tone={legalTone(firm.regulatoryAudit.riskLevel)} />
      </div>

      <div className="pr-deal-value">
        <strong>{deal.value}</strong>
        <span>{toEnglishText(deal.title)}</span>
      </div>

      <div className="pr-deal-code">
        <span>Code</span>
        <code>{deal.code}</code>
        <em className={availabilityClass(deal.availability)}>{deal.availability}</em>
      </div>

      <p className="pr-deal-verdict">{toEnglishText(featured ? deal.commercialHook ?? deal.consumerVerdict : deal.consumerVerdict)}</p>

      <dl className="pr-deal-facts">
        <div><dt>Eligibility</dt><dd>{deal.eligibility}</dd></div>
        <div><dt>Validity</dt><dd>{deal.validity}</dd></div>
        <div><dt>Proof</dt><dd>{toEnglishText(deal.proofLevel)} · {legalSourceCount(firm)} source link(s) · deal score {deal.dealScore}/100</dd></div>
      </dl>

      {featured ? (
        <p className="pr-deal-note"><strong>{deal.urgency ?? 'Verify before buying'}.</strong> {toEnglishText(deal.checkoutTip ?? deal.caveats[0])}</p>
      ) : deal.caveats.length ? (
        <details className="pr-deal-caveats">
          <summary>{deal.caveats.length} caveat{deal.caveats.length > 1 ? 's' : ''} before checkout</summary>
          <ul>
            {deal.caveats.map((caveat) => <li key={caveat}>{toEnglishText(caveat)}</li>)}
          </ul>
        </details>
      ) : null}

      <footer className="pr-deal-actions">
        <a href={deal.sourceUrl} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">{cta}</a>
        <Link href={`/firm/${firm.slug}`} className="pr-link">{featured ? 'Read analysis' : 'Read profile'} <span aria-hidden="true">→</span></Link>
      </footer>
      {!featured ? <span className="pr-deal-source">{toEnglishText(deal.sourceNote ?? deal.sourceLabel)} · {categoryLabels[deal.category] ?? deal.category}</span> : null}
    </article>
  );
}

export default function PromosPage() {
  const riskyDiscounts = propFirms
    .filter((firm) => isActiveFirm(firm.status) && firm.reviewSignals.payoutRisk !== 'Faible')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 6);
  const dealFirms = bestPromoDeals
    .map((deal) => getFirmBySlug(deal.slug))
    .filter((firm): firm is NonNullable<ReturnType<typeof getFirmBySlug>> => Boolean(firm));
  const megaKeys = new Set(megaPromoDeals.map((deal) => `${deal.slug}-${deal.code}`));
  const uniqueDealFirms = Array.from(new Map(dealFirms.map((firm) => [firm.slug, firm])).values());
  const legalMappedDealCount = uniqueDealFirms.filter((firm) => firm.legalVerified).length;
  const deepSourceDealCount = uniqueDealFirms.filter((firm) => legalSourceCount(firm) >= 5).length;
  const officialOfferCount = bestPromoDeals.filter((deal) => deal.availability === 'Active official offer').length;
  const checkoutVerificationCount = bestPromoDeals.filter((deal) => deal.availability === 'Verify at checkout').length;

  return (
    <main className="container promos-page">
      <PageStructuredData
        name="Risk-checked prop firm deals"
        description={PROMOS_DESCRIPTION}
        path="/promos"
        breadcrumbLabel="Deals"
        dateModified="2026-07-13"
        faq={promoFaq}
        items={uniqueDealFirms.map((firm) => ({
          name: firm.name,
          path: `/firm/${firm.slug}`,
          description: `${firm.score}/100 PropRadar score. ${toEnglishText(firm.verdict)}`,
        }))}
      />
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
          <div><strong>4</strong><span>Legal/source proof checked before price</span></div>
        </div>
      </section>

      <section className="pr-stat-line" aria-label="Deal safety summary">
        <dl>
          <div><dt>Hot deals</dt><dd>{megaPromoDeals.length}</dd></div>
          <div><dt>Official offers</dt><dd>{officialOfferCount}</dd></div>
          <div><dt>Checkout checks</dt><dd>{checkoutVerificationCount}</dd></div>
          <div><dt>Legal mapped</dt><dd>{legalMappedDealCount}</dd></div>
          <div><dt>5+ sources</dt><dd>{deepSourceDealCount}</dd></div>
        </dl>
        <Link href="/comparateur" className="pr-link">Compare rules and reliability before using a code <span aria-hidden="true">→</span></Link>
      </section>

      <section className="section mega-deal-section" id="mega-deals">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Hot shortlist - checked on {PROMO_REVIEW_DATE}</div>
            <h2>Mega deals to check first.</h2>
          </div>
          <p className="section-note">
            This section is intentionally commercial: these are the offers that make people want to click. The caution stays visible next to them.
          </p>
        </div>
        <div className="pr-deal-grid pr-deal-grid-featured">
          {megaPromoDeals.map((deal, index) => {
            const firm = getFirmBySlug(deal.slug);
            if (!firm) return null;
            return <DealCard key={`mega-${deal.slug}-${deal.code}`} deal={deal} firm={firm} rank={index + 1} featured cta="Get the offer" />;
          })}
        </div>
      </section>

      <section className="section" id="all-offers">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Checked on {PROMO_REVIEW_DATE}</div>
            <h2>More PropRadar-ranked offers.</h2>
          </div>
          <p className="section-note">
            Official discounts come before rumors. PropRadar links are marked as affiliate links and do not change the score. Hot deals above are not repeated here.
          </p>
        </div>
        <div className="pr-deal-grid">
          {bestPromoDeals
            .filter((deal) => !megaKeys.has(`${deal.slug}-${deal.code}`))
            .map((deal) => {
              const firm = getFirmBySlug(deal.slug);
              if (!firm) return null;
              return <DealCard key={`${deal.slug}-${deal.code}-${deal.value}`} deal={deal} firm={firm} cta="Check offer" />;
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
                  <div className="ranking-proof-chips" aria-label={`${firm.name} budget deal proof context`}>
                    <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                      Legal {firm.regulatoryAudit.riskLevel}
                    </span>
                    <span className={`badge ${sourceDepthClass(firm)}`}>
                      {sourceDepthLabel(firm)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="deal-watch-metrics">
                <div><span>Min. price</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
                <div><span>Score</span><strong>{firm.score}/100</strong></div>
                <div><span>Payout</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              </div>
              <small>{toEnglishText(firm.products[0]?.name ?? 'Program to verify')}</small>
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
                  <span>{toEnglishText(firm.products[0]?.name ?? 'Program to verify')}</span>
                  <div className="ranking-proof-chips" aria-label={`${firm.name} value pick proof context`}>
                    <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                      Payout {toEnglishText(firm.reviewSignals.payoutRisk)}
                    </span>
                    <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                      Legal {firm.regulatoryAudit.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
              <div><span>Min. price</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
              <div><span>Payout</span><strong>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              <div><span>Trustpilot</span><strong>{firm.trustpilotRating ? `${firm.trustpilotRating}/5` : 'Not rated'}</strong></div>
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
                  <span>{toEnglishText(firm.products[0]?.name ?? 'Futures program to verify')}</span>
                  <div className="ranking-proof-chips" aria-label={`${firm.name} futures deal proof context`}>
                    <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                      Legal {firm.regulatoryAudit.riskLevel}
                    </span>
                    <span className={`badge ${sourceDepthClass(firm)}`}>
                      {sourceDepthLabel(firm)}
                    </span>
                  </div>
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
              These endpoints can feed a widget, a newsletter, a Discord bot or a dynamic SEO page with deal, payout,
              audit, legal risk and source-depth fields.
            </p>
          </div>
          <div className="api-chip-list">
            <code>/api/promos</code>
            <code>/api/promos?mega=true&amp;limit=4</code>
            <code>/api/promos?best=true&amp;limit=5</code>
            <code>/api/promos?availability=active official</code>
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
                <span className="guide-signal-stack-meta">
                  <strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong>
                  <small>{firm.regulatoryAudit.riskLevel}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
