import Link from 'next/link';
import FirmLogo from '../../components/FirmLogo';
import RiskPip from '../../components/ui/RiskPip';
import ScoreRing from '../../components/ui/ScoreRing';
import { legalTone, payoutTone } from '../../lib/riskTone';
import PageStructuredData from '../../components/PageStructuredData';
import { createPageMetadata } from '../../lib/pageMetadata';
import {
  auditStatusClass,
  priceLabel,
  getFirmBySlug,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  scoreClass,
  drawdownLabel,
  hasPayoutRiskSignal,
} from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import {
  PROMO_REVIEW_DATE,
  getBestPromoDeals,
  getBudgetPromoShortlist,
  getFuturesPromoShortlist,
  getMegaPromoDeals,
  promoFaq,
  withdrawnPromoDeals,
} from '../../lib/promoResearch';
import IntentLink from '../../components/IntentLink';
import type { Metadata } from 'next';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, getMessages, tv, type Messages } from '../../lib/messages';
import { getPageMessages, type PromosMessages } from '../../lib/messages/pages/promos';
import { SITE_URL } from '../../lib/site';

export const revalidate = 86400;

const PATH = '/promos';
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const p = getPageMessages(locale);
  const base = createPageMetadata({
    title: p.metaTitle,
    description: p.metaDescription,
    path: PATH,
    keywords: locale === 'en' ? ['prop firm discount code', 'prop firm deals', 'prop firm promo', 'cheap prop firm challenge'] : [],
    category: 'Prop firm deals',
  });
  return {
    ...base,
    alternates: localeAlternates(locale, PATH),
    openGraph: { ...base.openGraph, url: `${SITE_URL}${localePath(locale, PATH)}`, locale: OG_LOCALE[locale] },
  };
}

/** Everything a deal card or row needs to speak the page language. */
type Ui = { p: PromosMessages; t: Messages; L: (path: string) => string; v: (value: string | undefined | null) => string };

const valuePicks = ['the5ers', 'topstep', 'fundingpips', 'funderpro', 'the-trading-pit', 'e8-markets', 'alpha-capital-group', 'take-profit-trader', 'myfundedfutures']
  .map((slug) => getFirmBySlug(slug))
  .filter((firm): firm is NonNullable<ReturnType<typeof getFirmBySlug>> => Boolean(firm));

const bestPromoDeals = getBestPromoDeals(30);
const megaPromoDeals = getMegaPromoDeals(4);
const budgetShortlist = getBudgetPromoShortlist(12);
const futuresShortlist = getFuturesPromoShortlist(8);

function isActiveFirm(status: string) {
  return !/ferm/i.test(status);
}

function legalSourceCount(firm: (typeof propFirms)[number]) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function sourceDepthLabel(firm: (typeof propFirms)[number], p: PromosMessages) {
  const count = legalSourceCount(firm);
  if (count >= 5) return p.sourceDepth.deep;
  if (count >= 3) return p.sourceDepth.usable;
  if (count >= 1) return p.sourceDepth.thin;
  return p.sourceDepth.none;
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
  ui,
}: {
  deal: RankedDeal;
  firm: NonNullable<ReturnType<typeof getFirmBySlug>>;
  rank?: number;
  featured?: boolean;
  cta: string;
  ui: Ui;
}) {
  const { p, L, v } = ui;
  const c = p.card;
  return (
    <article className={`pr-deal${featured ? ' pr-deal-featured' : ''}`}>
      <header className="pr-deal-head">
        {typeof rank === 'number' ? <span className="pr-deal-rank">#{rank}</span> : null}
        <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="md" />
        <span className="pr-deal-firm">
          <Link href={L(`/firm/${firm.slug}`)}>{firm.name}</Link>
          <small>{toEnglishText(deal.label)}</small>
        </span>
        <ScoreRing score={firm.score} size="sm" label={ui.t.firm.propradarScore} />
      </header>

      <div className="pr-deal-pips">
        <RiskPip compact label={c.payout} value={v(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
        <RiskPip compact label={c.legal} value={v(firm.regulatoryAudit.riskLevel)} tone={legalTone(firm.regulatoryAudit.riskLevel)} />
      </div>

      <div className="pr-deal-value">
        <strong>{deal.value}</strong>
        <span>{toEnglishText(deal.title)}</span>
      </div>

      <div className="pr-deal-code">
        <span>{c.code}</span>
        <code>{deal.code}</code>
        <em className={availabilityClass(deal.availability)}>{p.availability[deal.availability] ?? deal.availability}</em>
      </div>

      <p className="pr-deal-verdict">{toEnglishText(featured ? deal.commercialHook ?? deal.consumerVerdict : deal.consumerVerdict)}</p>

      <dl className="pr-deal-facts">
        <div><dt>{c.eligibility}</dt><dd>{deal.eligibility}</dd></div>
        <div><dt>{c.validity}</dt><dd>{deal.validity}</dd></div>
        <div><dt>{c.proof}</dt><dd>{fmt(c.proofLine, { level: p.proofLevels[deal.proofLevel] ?? toEnglishText(deal.proofLevel), count: legalSourceCount(firm), score: deal.dealScore })}</dd></div>
      </dl>

      {featured ? (
        <p className="pr-deal-note"><strong>{deal.urgency ?? c.verifyBefore}.</strong> {toEnglishText(deal.checkoutTip ?? deal.caveats[0])}</p>
      ) : deal.caveats.length ? (
        <details className="pr-deal-caveats">
          <summary>{deal.caveats.length > 1 ? fmt(c.caveatsMany, { count: deal.caveats.length }) : c.caveatsOne}</summary>
          <ul>
            {deal.caveats.map((caveat) => <li key={caveat}>{toEnglishText(caveat)}</li>)}
          </ul>
        </details>
      ) : null}

      <footer className="pr-deal-actions">
        <a href={deal.sourceUrl} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">{cta}</a>
        <Link href={L(`/firm/${firm.slug}`)} className="pr-link">{featured ? c.readAnalysis : c.readProfile} <span aria-hidden="true">→</span></Link>
      </footer>
      {!featured ? <span className="pr-deal-source">{toEnglishText(deal.sourceNote ?? deal.sourceLabel)} · {p.categories[deal.category] ?? deal.category}</span> : null}
    </article>
  );
}

export default async function PromosPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  const p = getPageMessages(locale);
  const c = p.card;
  const L = (path: string) => localePath(locale, path);
  const v = (value: string | undefined | null) => tv(t, toEnglishText(value ?? ''));
  const ui: Ui = { p, t, L, v };
  const faq = locale === 'en' ? promoFaq : p.faq;
  const riskyDiscounts = propFirms
    .filter((firm) => isActiveFirm(firm.status) && hasPayoutRiskSignal(firm))
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
        name={p.schemaName}
        description={p.metaDescription}
        path={L(PATH)}
        breadcrumbLabel={p.breadcrumb}
        dateModified={PROMO_REVIEW_DATE}
        faq={faq}
        inLanguage={HTML_LANG[locale]}
        home={{ label: t.guide.breadcrumbHome, url: `${SITE_URL}${L('/')}` }}
        items={uniqueDealFirms.map((firm) => ({
          name: firm.name,
          path: L(`/firm/${firm.slug}`),
          description: locale === 'en' ? `${firm.score}/100 PropRadar score. ${toEnglishText(firm.verdict)}` : fmt(p.schemaItem, { score: firm.score }),
        }))}
      />
      <section className="promos-hero">
        <div>
          <div className="eyebrow">{p.eyebrow}</div>
          <h1>{p.h1}</h1>
          <p className="lead">{p.lead}</p>
        </div>
        <div className="promo-principles">
          {p.principles.map((principle, index) => (
            <div key={principle}><strong>{index + 1}</strong><span>{principle}</span></div>
          ))}
        </div>
      </section>

      <section className="pr-stat-line" aria-label={p.summaryAria}>
        <dl>
          <div><dt>{p.statHot}</dt><dd>{megaPromoDeals.length}</dd></div>
          <div><dt>{p.statOfficial}</dt><dd>{officialOfferCount}</dd></div>
          <div><dt>{p.statCheckout}</dt><dd>{checkoutVerificationCount}</dd></div>
          <div><dt>{p.statLegal}</dt><dd>{legalMappedDealCount}</dd></div>
          <div><dt>{p.statDeep}</dt><dd>{deepSourceDealCount}</dd></div>
        </dl>
        <IntentLink href={L('/prop-firm-comparison')} className="pr-link">{p.compareLink} <span aria-hidden="true">→</span></IntentLink>
      </section>

      <section className="section mega-deal-section" id="mega-deals">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{fmt(p.hotEyebrow, { date: PROMO_REVIEW_DATE })}</div>
            <h2>{p.hotTitle}</h2>
          </div>
          <p className="section-note">{p.hotNote}</p>
        </div>
        <div className="pr-deal-grid pr-deal-grid-featured">
          {megaPromoDeals.map((deal, index) => {
            const firm = getFirmBySlug(deal.slug);
            if (!firm) return null;
            return <DealCard key={`mega-${deal.slug}-${deal.code}`} deal={deal} firm={firm} rank={index + 1} featured cta={p.ctaGet} ui={ui} />;
          })}
        </div>
      </section>

      <section className="section" id="all-offers">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{fmt(p.allEyebrow, { date: PROMO_REVIEW_DATE })}</div>
            <h2>{p.allTitle}</h2>
          </div>
          <p className="section-note">{p.allNote}</p>
        </div>
        {p.dataNote ? <p className="pr-fineprint pr-data-note">{p.dataNote}</p> : null}
        <div className="pr-deal-grid">
          {bestPromoDeals
            .filter((deal) => !megaKeys.has(`${deal.slug}-${deal.code}`))
            .map((deal) => {
              const firm = getFirmBySlug(deal.slug);
              if (!firm) return null;
              return <DealCard key={`${deal.slug}-${deal.code}-${deal.value}`} deal={deal} firm={firm} cta={p.ctaCheck} ui={ui} />;
            })}
        </div>
        {withdrawnPromoDeals.length ? (
          <p className="pr-withdrawn-deals">
            <strong>{p.withdrawnLabel}</strong>{' '}
            {withdrawnPromoDeals.map((deal, index) => (
              <span key={`${deal.slug}-${deal.code}`}>
                {index ? ', ' : ''}
                <code>{deal.code}</code> ({fmt(p.withdrawnItem, { firm: getFirmBySlug(deal.slug)?.name ?? deal.slug, date: deal.notSeenOn ?? '' })})
              </span>
            ))}
            . {p.withdrawnNote}
          </p>
        ) : null}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{p.budgetEyebrow}</div>
            <h2>{p.budgetTitle}</h2>
          </div>
          <p className="section-note">{p.budgetNote}</p>
        </div>
        <div className="deal-watch-grid">
          {budgetShortlist.map((firm) => (
            <Link href={L(`/firm/${firm.slug}`)} className="deal-watch-card" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  {locale === 'en' ? <span>{toEnglishText(firm.bestFor)}</span> : null}
                  <div className="ranking-proof-chips" aria-label={fmt(c.ariaBudget, { name: firm.name })}>
                    <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                      {fmt(c.legalBadge, { level: v(firm.regulatoryAudit.riskLevel) })}
                    </span>
                    <span className={`badge ${sourceDepthClass(firm)}`}>
                      {sourceDepthLabel(firm, p)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="deal-watch-metrics">
                <div><span>{c.minPrice}</span><strong>{v(priceLabel(firm))}</strong></div>
                <div><span>{c.score}</span><strong>{firm.score}/100</strong></div>
                <div><span>{c.payout}</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{v(firm.reviewSignals.payoutRisk)}</strong></div>
              </div>
              <small>{firm.products[0]?.name ? toEnglishText(firm.products[0].name) : c.programToVerify}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{p.valueEyebrow}</div>
            <h2>{p.valueTitle}</h2>
          </div>
        </div>
        <div className="value-pick-list">
          {valuePicks.map((firm) => (
            <Link href={L(`/firm/${firm.slug}`)} className="value-pick-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.products[0]?.name ? toEnglishText(firm.products[0].name) : c.programToVerify}</span>
                  <div className="ranking-proof-chips" aria-label={fmt(c.ariaValue, { name: firm.name })}>
                    <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                      {fmt(c.payoutBadge, { level: v(firm.reviewSignals.payoutRisk) })}
                    </span>
                    <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                      {fmt(c.legalBadge, { level: v(firm.regulatoryAudit.riskLevel) })}
                    </span>
                  </div>
                </div>
              </div>
              <div><span>{c.minPrice}</span><strong>{v(priceLabel(firm))}</strong></div>
              <div><span>{c.payout}</span><strong>{v(firm.reviewSignals.payoutRisk)}</strong></div>
              <div><span>{c.trustpilot}</span><strong>{firm.trustpilotRating ? `${firm.trustpilotRating}/5` : c.notRated}</strong></div>
              <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={fmt(c.scoreAria, { score: firm.score })}>
                <span>{c.score}</span>
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
            <div className="eyebrow">{p.futuresEyebrow}</div>
            <h2>{p.futuresTitle}</h2>
          </div>
          <p className="section-note">{p.futuresNote}</p>
        </div>
        <div className="deal-table">
          {futuresShortlist.map((firm) => (
            <Link href={L(`/firm/${firm.slug}`)} className="deal-table-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.products[0]?.name ? toEnglishText(firm.products[0].name) : c.futuresProgramToVerify}</span>
                  <div className="ranking-proof-chips" aria-label={fmt(c.ariaFutures, { name: firm.name })}>
                    <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                      {fmt(c.legalBadge, { level: v(firm.regulatoryAudit.riskLevel) })}
                    </span>
                    <span className={`badge ${sourceDepthClass(firm)}`}>
                      {sourceDepthLabel(firm, p)}
                    </span>
                  </div>
                </div>
              </div>
              <div><span>{c.minPrice}</span><strong>{v(priceLabel(firm))}</strong></div>
              <div><span>{c.drawdown}</span><strong>{v(drawdownLabel(firm, toEnglishText))}</strong></div>
              <div><span>{c.payout}</span><strong>{v(firm.reviewSignals.payoutRisk)}</strong></div>
              <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={fmt(c.scoreAria, { score: firm.score })}>
                <span>{c.score}</span>
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
            <div className="eyebrow">{p.apiEyebrow}</div>
            <h2>{p.apiTitle}</h2>
            <p className="lead">{p.apiLead}</p>
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
            <div className="eyebrow">{p.faqEyebrow}</div>
            <h2>{p.faqTitle}</h2>
          </div>
        </div>
        <div className="promo-faq-grid">
          {faq.map((item) => (
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
            <div className="eyebrow">{p.trapEyebrow}</div>
            <h2>{p.trapTitle}</h2>
            <p className="lead">{p.trapLead}</p>
          </div>
          <div className="promo-risk-list">
            {riskyDiscounts.map((firm) => (
              <Link href={L(`/firm/${firm.slug}`)} key={firm.slug}>
                <span>{firm.name}</span>
                <span className="guide-signal-stack-meta">
                  <strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{v(firm.reviewSignals.payoutRisk)}</strong>
                  <small>{v(firm.regulatoryAudit.riskLevel)}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
