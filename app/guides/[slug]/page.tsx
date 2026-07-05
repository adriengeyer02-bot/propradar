import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FirmLogo from '../../components/FirmLogo';
import {
  formatUsd,
  payoutRiskClass,
  reviewReliabilityClass,
  scoreClass,
  type Product,
  type PropFirm,
} from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import {
  getGuideLastModified,
  getSeoGuideDisplay,
  getRelatedGuides,
  getSeoGuideBySlug,
  seoGuides,
  selectGuideFirms,
} from '../../lib/seoGuides';

export const revalidate = 86400;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);

  if (!guide) {
    return { title: 'Guide not found - PropRadar' };
  }

  return {
    title: getSeoGuideDisplay(guide).title,
    description: getSeoGuideDisplay(guide).metaDescription,
    keywords: [...getSeoGuideDisplay(guide).primaryKeywords, ...getSeoGuideDisplay(guide).secondaryKeywords],
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: getSeoGuideDisplay(guide).title,
      description: getSeoGuideDisplay(guide).metaDescription,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: 'article',
      siteName: SITE_NAME,
    },
  };
}

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function featuredProduct(firm: PropFirm): Product | undefined {
  return firm.products.find((product) => product.isPopular) ?? firm.products[0];
}

function formatAccountRange(product?: Product) {
  if (!product) return 'To verify';
  if (product.accountSizeMin === product.accountSizeMax) return formatUsd(product.accountSizeMax);
  return `${formatUsd(product.accountSizeMin)} - ${formatUsd(product.accountSizeMax)}`;
}

function formatEntryFee(product?: Product) {
  if (!product?.entryFeeMin) return 'To verify';
  if (product.entryFeeMax && product.entryFeeMax !== product.entryFeeMin) {
    return `${formatUsd(product.entryFeeMin)} - ${formatUsd(product.entryFeeMax)}`;
  }

  return `${formatUsd(product.entryFeeMin)}+`;
}

function polishGuideText(text: string) {
  return text
    .replace(/\bn est\b/g, "n'est")
    .replace(/\bd achat\b/g, "d'achat")
    .replace(/\bd entree\b/g, "d'entrée")
    .replace(/\bd abord\b/g, "d'abord")
    .replace(/\bd autres\b/g, "d'autres")
    .replace(/\bl autorisation\b/g, "l'autorisation")
    .replace(/\bl offre\b/g, "l'offre")
    .replace(/\bl objectif\b/g, "l'objectif")
    .replace(/\bl historique\b/g, "l'historique")
    .replace(/\bl application\b/g, "l'application");
}

function guideAnswerParagraphs(guide: NonNullable<ReturnType<typeof getSeoGuideBySlug>>, firms: PropFirm[]) {
  const first = firms[0];
  const second = firms[1];
  const firmNames = firms.slice(0, 3).map((firm) => firm.name).join(', ');

  if (guide.intent === 'comparer' && first && second) {
    return [
      `If you are hesitating between ${first.name} and ${second.name}, start with the question that actually matters: which offer can you follow for several weeks without forcing your trading style? The right choice depends on drawdown, funded-stage fees, payout schedule, news/EA rules and platform.`,
      `${first.name} is worth checking first if you want a clearer framework in this comparison. ${second.name} can become better if its flagship offer fits your budget, market or daily constraints more closely. The famous name is reassuring, but the exact program decides.`,
      'Before paying, compare each firm’s best-selling offer: entry fee, account size, target, maximum loss, split, payout delay and recurring fees. A strong discount is not worth much if a rule blocks your withdrawal or makes your plan impossible to follow.',
    ];
  }

  if (guide.intent === 'style') {
    const styleAdvice =
      guide.slug === 'prop-firm-swing-trading'
        ? "For swing trading, the decisive points are overnight holding, weekends, gaps, drawdown type and payout delay. A firm can be excellent for intraday traders and poor for swing traders if it forces you to close too early."
        : guide.slug === 'prop-firm-news-trading'
          ? "For news trading, the word 'allowed' is not enough. Check banned time windows, slippage handling, red-folder events, funded-stage rules and payout clauses after macro releases."
          : guide.slug === 'prop-firm-ea-algo'
            ? "For EA or algo trading, the real issue is not only whether bots are allowed. Read restrictions on copy trading, latency, arbitrage, martingale, VPS, multi-account management and payout validation."
            : "For SMC/ICT, the choice mainly depends on traded sessions, tolerance for multiple entries, spreads, daily drawdown, news rules and how the firm applies rules after a winning trade.";

    return [
      `You are looking for a prop firm that fits a specific method, not a global score that decides everything for you. ${styleAdvice}`,
      firmNames
        ? `${firmNames} stand out as options to compare, but only after checking the exact program. Two offers from the same firm can have different rules on news, overnight holding, drawdown or platforms.`
        : 'The right method is to start from your trading constraints, then remove firms whose rules do not fit your rhythm.',
      'The best reflex is to choose the rule you can respect every day, not the firm that promises the biggest capital on the marketing page.',
    ];
  }

  if (guide.intent === 'risque') {
    return [
      'The danger is passing an evaluation and then discovering a withdrawal condition that is too hard. Payout must be checked before price, before split and even before account size.',
      'Look at the advertised delay, minimum amount, caps, required trading days, lot-size rules, news restrictions and examples of payout denials. A good public rating does not compensate for unclear conditions.',
      'The right decision is to choose a firm whose withdrawal rules are clearly written, dated, easy to find and compatible with the way you actually trade.',
    ];
  }

  if (guide.intent === 'regles') {
    return [
      'You may be looking for one simple rule, but a prop firm can hide difficulty elsewhere: trailing drawdown, strict daily loss, payout minimum, banned news trading, copy-trading limits or funded-stage fees.',
      'No consistency rule is positive only if the rest of the program remains manageable. Always compare the removed rule with the constraints replacing it.',
      'The right reading is to choose the program that reduces operational error risk, not the one with the biggest marketing headline.',
    ];
  }

  if (guide.intent === 'promo') {
    return [
      'Paying less helps, but the real deal is not the biggest discount. It is the offer that keeps total cost reasonable without sacrificing rules, payout or support quality.',
      'Compare price after coupon, resets, funded-stage fees, possible subscriptions, withdrawal caps and drawdown. A cheap challenge can become expensive if the rules push you to rebuy accounts.',
      'The best discount is attached to an offer you could almost have bought without it: it must fit your style, budget and risk level.',
    ];
  }

  return [
    'You want an actionable answer: which firms to check, why they stand out, which program to compare and which detail can change the decision.',
    guide.answer,
    'The right reading order is simple: reliability, rules, total cost, payout, then popularity or discount code.',
  ];
}

function guideDecisionCards(guide: NonNullable<ReturnType<typeof getSeoGuideBySlug>>, firms: PropFirm[]) {
  const first = firms[0];
  const second = firms[1];

  if (guide.intent === 'comparer' && first && second) {
    return [
      {
        label: `Regarder ${first.name}`,
        text: `${first.name} comes first if you want to prioritize a clearer framework, overall risk and perceived stability in this comparison.`,
      },
      {
        label: `Regarder ${second.name}`,
        text: `${second.name} becomes relevant if its flagship offer better fits your budget, market, platform or trading rhythm.`,
      },
      {
        label: 'Decision detail',
        text: 'If the difference comes down to a discount, reread payout, drawdown, news, consistency, funded fees and support before paying.',
      },
    ];
  }

  if (guide.intent === 'style') {
    return [
      {
        label: 'Decisive rule',
        text: 'Check the rule that directly affects your style: overnight for swing, news for macro, EA/copy trading for algo, spread and daily loss for SMC.',
      },
      {
        label: 'Right profile',
        text: 'A good firm for your style must let you execute your normal plan without changing risk management just to survive the rules.',
      },
      {
        label: 'Mistake to avoid',
        text: 'Do not choose a firm because it is popular if its program bans exactly what makes your strategy work.',
      },
    ];
  }

  if (guide.intent === 'promo') {
    return [
      {
        label: 'Real deal',
        text: 'A discount is interesting only if final price, funded-stage fees and rules remain consistent with your budget.',
      },
      {
        label: 'Compare this',
        text: 'Look at total cost: challenge, reset, possible subscription, platform, data, funded activation and withdrawal conditions.',
      },
      {
        label: 'Common trap',
        text: 'Do not take an account size that is too large just because the discount looks strong.',
      },
    ];
  }

  return [
    {
      label: 'First filter',
      text: 'Remove firms with high payout risk, unclear rules, ambiguous status or insufficient sources.',
    },
    {
      label: 'Practical criterion',
      text: 'Compare the program you will actually buy: price, target, drawdown, daily loss, split, fees and platforms.',
    },
    {
      label: 'Classic mistake',
      text: 'Do not choose only on displayed capital or discount. A bad rule costs more than a deal saves.',
    },
  ];
}

function expandedFaqAnswer(answer: string, guide: NonNullable<ReturnType<typeof getSeoGuideBySlug>>) {
  const suffix =
    guide.intent === 'comparer'
      ? ' To decide properly, always compare the flagship offer, payout risk, restrictions and total cost before looking at popularity.'
      : ' The important point is to verify official sources and the exact program conditions before paying.';

  return `${answer}${suffix}`;
}

export default async function SeoGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const firms = selectGuideFirms(guide, 10);
  const displayGuide = getSeoGuideDisplay(guide);
  const relatedGuides = getRelatedGuides(guide.slug, 3);
  const modifiedDate = getGuideLastModified(guide);
  const modifiedDateLabel = modifiedDate.toISOString().slice(0, 10);
  const pageUrl = `${SITE_URL}/guides/${guide.slug}`;
  const answerParagraphs = guideAnswerParagraphs(displayGuide, firms);
  const decisionCards = guideDecisionCards(displayGuide, firms);
  const productRows = firms
    .slice(0, guide.intent === 'comparer' ? 4 : 6)
    .map((firm) => ({ firm, product: featuredProduct(firm) }));
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: displayGuide.h1,
    description: displayGuide.metaDescription,
    dateModified: modifiedDate.toISOString(),
    datePublished: modifiedDate.toISOString(),
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: pageUrl,
    keywords: [...displayGuide.primaryKeywords, ...displayGuide.secondaryKeywords].join(', '),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${SITE_URL}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: displayGuide.title,
        item: pageUrl,
      },
    ],
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: displayGuide.title,
    itemListElement: firms.map((firm, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/firm/${firm.slug}`,
      name: firm.name,
      description: firm.verdict,
    })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: displayGuide.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: expandedFaqAnswer(item.answer, displayGuide),
      },
    })),
  };

  return (
    <main className="container guide-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <section className="guide-hero">
        <div>
          <Link href="/guides" className="btn" style={{ marginBottom: 18 }}>All guides</Link>
          <div className="eyebrow">{displayGuide.eyebrow}</div>
          <h1>{displayGuide.h1}</h1>
          <p className="lead">{displayGuide.answer}</p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Compare firms</Link>
            <Link href="/outils" className="btn">Choose by style</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{firms.length}</strong><span>linked firms</span></div>
          <div><strong>{displayGuide.primaryKeywords.length}</strong><span>main keywords</span></div>
          <div><strong>{modifiedDateLabel}</strong><span>data updated</span></div>
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel seo-answer-panel">
          <div className="eyebrow">Useful Answer</div>
          <h2>What the trader really wants to know.</h2>
          <div className="guide-deep-answer">
            {answerParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="keyword-chip-grid">
            {[...displayGuide.primaryKeywords, ...displayGuide.secondaryKeywords].map((keyword) => <span key={keyword}>{keyword}</span>)}
          </div>
        </article>
        <article className="panel">
          <div className="eyebrow">Pre-Purchase Checklist</div>
          <h2>Points to verify.</h2>
          <ul className="risk-list">
              {displayGuide.checks.map((check) => <li key={check}>{check}</li>)}
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Flagship Offers</div>
            <h2>Comparison table of the programs to check first.</h2>
          </div>
          <p className="section-note">
            This table starts from products highlighted in PropRadar profiles. Amounts and rules must always be rechecked on the official page before purchase.
          </p>
        </div>
        <div className="guide-product-table">
          <div className="guide-product-row guide-product-head">
            <span>Firm</span>
            <span>Flagship offer</span>
            <span>Entry fee</span>
            <span>Account</span>
            <span>Target</span>
            <span>Drawdown</span>
            <span>Split / payout</span>
            <span>Platforms</span>
          </div>
          {productRows.map(({ firm, product }) => (
            <Link href={`/firm/${firm.slug}`} className="guide-product-row" key={`${firm.slug}-${product?.id ?? 'program'}`}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{toEnglishText(firm.bestFor)}</span>
                </div>
              </div>
              <div>
                <strong>{toEnglishText(product?.name ?? 'Program to verify')}</strong>
                  <small>{toEnglishText(polishGuideText(product?.description ?? firm.verdict))}</small>
              </div>
              <div><span>Entry fee</span><strong>{formatEntryFee(product)}</strong></div>
              <div><span>Account</span><strong>{formatAccountRange(product)}</strong></div>
              <div><span>Target</span><strong>{toEnglishText(product?.profitTarget ?? 'To verify')}</strong></div>
              <div><span>Drawdown</span><strong>{toEnglishText(product?.maxDrawdown ?? firm.drawdownType)}</strong></div>
              <div>
                <span>Split / payout</span>
                <strong>{toEnglishText(product?.profitSplit ?? `${firm.profitSplit}%`)}</strong>
                <small className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</small>
              </div>
              <div><span>Platforms</span><strong>{toEnglishText(product?.platforms.slice(0, 3).join(' / ') ?? 'To verify')}</strong></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="guide-profile-grid">
          {decisionCards.map((card) => (
            <article className="panel guide-profile-card" key={card.label}>
              <span>{card.label}</span>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PropRadar Selection</div>
            <h2>Firms to compare for this search.</h2>
          </div>
          <p className="section-note">Selection automatically calculated from PropRadar firm profiles.</p>
        </div>
        <div className="guide-ranking-list">
          {firms.map((firm, index) => (
            <Link href={`/firm/${firm.slug}`} className="guide-ranking-row seo-firm-row" key={firm.slug}>
              <span className="guide-rank">{index + 1}</span>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{toEnglishText(firm.bestFor)}</span>
                </div>
              </div>
              <div><span>Score</span><strong>{firm.score}/100</strong></div>
              <div><span>Min. price</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
              <div><span>Payout</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              <div><span>Trustpilot</span><strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</strong></div>
              <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">FAQ</div>
          <h2>Frequently asked questions.</h2>
          <div className="seo-faq-stack">
            {displayGuide.faq.map((item) => (
              <div key={item.question}>
                <strong>{item.question}</strong>
                <p>{expandedFaqAnswer(item.answer, displayGuide)}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <div className="eyebrow">Continue</div>
          <h2>Related useful pages.</h2>
          <div className="guide-signal-stack">
            {displayGuide.internalLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                <span>{link.label}</span>
                <strong>Open</strong>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Related Guides</div>
            <h2>Other useful searches.</h2>
          </div>
        </div>
        <div className="guide-entry-grid">
          {relatedGuides.map((related) => (
            <Link href={`/guides/${related.slug}`} className="guide-entry-card" key={related.slug}>
              <span>{getSeoGuideDisplay(related).eyebrow}</span>
              <strong>{getSeoGuideDisplay(related).title}</strong>
              <small>{getSeoGuideDisplay(related).answer}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
