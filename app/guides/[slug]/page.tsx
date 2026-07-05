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

  if (guide.slug === 'meilleure-prop-firm-2026') {
    return [
      'You want an actionable answer: which firms to verify first, which flagship program to compare and which detail can change the decision before you pay.',
      'The best prop firm is not simply the one with the biggest account or the biggest discount. The useful choice starts with real payout reliability, clear rules, verified community feedback and the program that fits your trading style.',
      'Use the table by style: futures traders should start with futures offers, forex/CFD traders should compare rule clarity first, and SMC/ICT traders should pay extra attention to news windows, drawdown and consistency. Then recheck the current official rules before buying.',
    ];
  }

  if (guide.slug === 'prop-firm-sans-challenge') {
    return [
      'You want to know whether no-challenge funding fits your profile and which offers deserve a first comparison.',
      'A no-challenge prop firm saves time, but it does not create discipline. Traders who do well with this format usually already have a tested strategy, strict risk management and enough experience trading under rule pressure.',
      'The right reflex is simple: compare funded-stage rules first, then real cost over 3 to 6 months, then recent payout feedback from traders who actually used the same program. The shortcut is only useful if the post-funding rules match the way you already trade.',
    ];
  }

  if (guide.slug === 'leveraged-prop-firm-avis') {
    return [
      'The most important rule to understand is the consistency rule: public feedback commonly describes a 20% cap, meaning no single trading day should represent more than 20% of total profits. This is one of the strictest versions in the market if enforced literally, because a trader can reach the profit target and still fail payout validation.',
      'Other rules to verify before buying are minimum trade duration, daily risk limits, news-trading restrictions and whether the drawdown is static or trailing on the exact program. Public feedback often points to roughly 3-minute trade duration checks and drawdown around the 6% area, but the official FAQ must decide.',
      'The program label matters. Jr Portfolio Manager, Sr, Executive, Turbo and Sprint can have different constraints. Do not rely on a general marketing table: read the exact FAQ page for the offer you intend to buy.',
    ];
  }

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
            : "SMC/ICT traders usually look for intraday setups on NAS, US30, US500 or major forex pairs: liquidity grabs, order blocks, fair value gaps and session-based entries. The recurring prop-firm problem is that news restrictions, aggressive trailing drawdown and consistency rules can break the strategy after the challenge is passed.";

    if (guide.slug === 'prop-firm-smc-ict') {
      return [
        styleAdvice,
        'The real filter is not the brand name. You need news-window clarity around London and New York, drawdown that does not punish scaling, no harsh daily profit cap, usable spreads on indices/futures and a payout minimum that fits frequent smaller wins.',
        'For many SMC/ICT profiles, futures-style firms such as Alpha Futures, Lucid Trading and Tradeify are worth investigating first because EOD/static-style drawdown and clear intraday rules can matter more than a large advertised account. Forex options like FTMO, The5ers, FundingPips and FundedNext remain useful, but only after checking the exact program rules.',
      ];
    }

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

const smcCompatibilityFilters = [
  {
    title: 'News flexibility',
    text: 'SMC/ICT setups often form around London open, New York open, CPI, NFP or FOMC volatility. A usable firm should publish clear news windows instead of leaving the rule vague.',
  },
  {
    title: 'Scaling-friendly drawdown',
    text: 'Static or EOD-style drawdown is usually easier for partial entries and add-ons. Intraday trailing drawdown can punish a setup before the thesis has time to play out.',
  },
  {
    title: 'Consistency tolerance',
    text: 'A hard daily profit cap can break the typical SMC pattern where one liquidity sweep creates most of the week. Always check whether one day can exceed a percentage of total profit.',
  },
  {
    title: 'Execution on your instrument',
    text: 'NAS, US30, ES/NQ, gold and major FX pairs do not behave the same across platforms. Spread, commissions, slippage and market data can matter more than the headline account size.',
  },
];

const smcShortlist = [
  {
    name: 'Alpha Futures',
    href: '/firm/alpha-futures',
    market: 'Futures - ES/NQ/CL research lead',
    advantages: ['Futures-first profile to investigate for intraday indices', 'Potentially cleaner fit for session-based scaling', 'Useful comparison point for EOD/static drawdown rules'],
    watch: ['PropRadar file still needs deeper sourcing', 'Verify current payout proof and exact drawdown rules', 'Do not rely on community mentions alone'],
    score: 'Research lead',
  },
  {
    name: 'Lucid Trading',
    href: '/firm/lucid-trading',
    market: 'Futures - intraday watchlist',
    advantages: ['Often compared by futures day traders', 'Public rating signal exists but still needs context', 'Worth checking for clear intraday rules'],
    watch: ['Verify current news windows', 'Check whether drawdown is EOD, static or trailing by plan', 'Confirm recent payout proof'],
    score: 'Medium confidence',
  },
  {
    name: 'Tradeify',
    href: '/firm/tradeify',
    market: 'Futures - modern alternative',
    advantages: ['Modern futures alternative to compare with Topstep and TPT', 'Intraday/scalping profile in PropRadar', 'Useful for traders who want futures rather than CFD indices'],
    watch: ['Read trailing drawdown by plan', 'Check payout timing and caps', 'Confirm whether scaling is treated normally'],
    score: 'Watch and compare',
  },
  {
    name: 'FTMO / The5ers',
    href: '/guides/ftmo-vs-the5ers',
    market: 'Forex / CFD benchmark',
    advantages: ['More established profiles for major FX pairs', 'Good comparison baseline for rules and proof level', 'Useful if you avoid aggressive news entries'],
    watch: ['Read news restrictions exactly', 'Check consistency or best-day style rules by program', 'Less flexible for aggressive index CFD scalping'],
    score: 'Strong but stricter',
  },
];

const bestRankingMethodology = [
  {
    label: 'Payout reliability',
    weight: '40%',
    text: 'Recent payout proof, repeated trader feedback and the absence of recurring withdrawal-denial patterns.',
  },
  {
    label: 'Rule clarity',
    weight: '25%',
    text: 'Readable rules, stable program conditions and fewer vague clauses around drawdown, news, lot size or consistency.',
  },
  {
    label: 'Independent community',
    weight: '20%',
    text: 'Reddit, Discord and X signals, not only Trustpilot or invited reviews.',
  },
  {
    label: 'Transparency history',
    weight: '15%',
    text: 'Track record, communication quality, source traceability and visible commercial relationships.',
  },
];

const noChallengeMethodology = [
  {
    label: 'Payout reliability',
    weight: '40%',
    text: 'Withdrawal conditions once funded, payout proof, minimum payout and recurring payout complaints.',
  },
  {
    label: 'Post-funding rules',
    weight: '25%',
    text: 'Drawdown, news, scaling, lot-size limits, consistency and any rule that becomes stricter after purchase.',
  },
  {
    label: 'True cost',
    weight: '20%',
    text: 'Entry fee, renewals, resets and whether the direct account is still cheaper over 3 to 6 months.',
  },
  {
    label: 'Community feedback',
    weight: '15%',
    text: 'Recent Reddit, Discord and X signals from traders who used the same direct or instant-funded program.',
  },
];

const bestRankingRows = [
  {
    firm: 'FTMO',
    href: '/firm/ftmo',
    offer: 'FTMO Challenge',
    entry: '$155 - $1,080',
    account: '$10k - $200k',
    target: '10% then 5%',
    drawdown: '10%',
    split: '80-90%',
    platforms: 'MT4 / MT5 / cTrader',
    news: 'Restricted windows',
    consistency: 'Strict rule checks',
    payout: 'Fast and reliable',
    community: 'Very high public signal',
    bestFor: 'Forex and disciplined day trading',
    risk: 'Strict rules can create payout issues on small details.',
  },
  {
    firm: 'The5ers',
    href: '/firm/the5ers',
    offer: 'High Stakes / Scaling',
    entry: '$39 - $495',
    account: '$5k - $100k',
    target: '8% then scaling',
    drawdown: '10%',
    split: '80% + scaling',
    platforms: 'MT5 / cTrader',
    news: 'Plan-dependent',
    consistency: 'Light / program-specific',
    payout: 'Reliable profile',
    community: 'Strong conservative signal',
    bestFor: 'Long-term traders and scaling',
    risk: 'Less suited to very aggressive intraday styles.',
  },
  {
    firm: 'Topstep',
    href: '/firm/topstep',
    offer: 'Trading Combine',
    entry: '$49 - $149',
    account: '$50k - $150k',
    target: 'Combine-dependent',
    drawdown: 'Trailing',
    split: '80-100%',
    platforms: 'TopstepX / NinjaTrader / Tradovate',
    news: 'Allowed with rules',
    consistency: 'No classic consistency rule',
    payout: 'Fast futures profile',
    community: 'Strong futures recognition',
    bestFor: 'US futures indices',
    risk: 'Repeated attempts can make the Combine expensive.',
  },
  {
    firm: 'FundedNext',
    href: '/firm/fundednext',
    offer: 'Evaluation models',
    entry: '$59 - $999',
    account: '$5k - $200k',
    target: 'Model-dependent',
    drawdown: 'Variable',
    split: '80-90%',
    platforms: 'MT4 / MT5 / cTrader',
    news: 'Plan-dependent',
    consistency: 'Plan-dependent',
    payout: 'Mixed to fast',
    community: 'High volume, needs filtering',
    bestFor: 'Traders who want model flexibility',
    risk: 'Rules vary by model, so the exact plan matters.',
  },
  {
    firm: 'Audacity Capital',
    href: '/firm/audacity-capital',
    offer: 'Funded Trader Programs',
    entry: 'Variable',
    account: '$25k - $250k+',
    target: 'Program-dependent',
    drawdown: 'Variable',
    split: '50-80%',
    platforms: 'MT4 / MT5',
    news: 'Allowed / plan-dependent',
    consistency: 'Variable',
    payout: 'Established but less noisy',
    community: 'Smaller public sample',
    bestFor: 'Experienced forex traders',
    risk: 'Less massive public data than the largest leaders.',
  },
];

const noChallengeRows = [
  {
    firm: 'Instant Funding',
    href: '/firm/instant-funding',
    offer: 'Instant Funding Account',
    entry: '$39+',
    account: '$625 - $300k',
    target: 'No fixed target on some accounts',
    drawdown: '10% smart',
    split: '80-90%',
    platforms: 'MT4 / MT5 / cTrader / MatchTrader',
    news: 'Restricted by plan',
    consistency: 'Variable',
    payout: 'Reliable profile',
    community: '4.4/5 synthetic signal',
    bestFor: 'Already profitable traders',
    risk: 'Post-funding rules can feel stricter than expected.',
  },
  {
    firm: 'FXIFY',
    href: '/firm/fxify',
    offer: 'FXIFY One Phase / instant-style options',
    entry: '$230+',
    account: '$5k - $400k',
    target: 'Size-dependent',
    drawdown: 'Static or trailing',
    split: 'Up to 90%',
    platforms: 'MT4 / MT5 / DXtrade',
    news: 'Allowed on some options',
    consistency: 'Light',
    payout: 'Fast profile',
    community: '4.5/5 synthetic signal',
    bestFor: 'Intermediate traders',
    risk: 'Higher entry cost than many classic challenges.',
  },
  {
    firm: 'Funded Trading Plus',
    href: '/firm/funded-trading-plus',
    offer: 'Funded Trading Plus Programs',
    entry: '$119+',
    account: '$5k - $200k',
    target: 'Program-dependent',
    drawdown: 'Program-dependent',
    split: 'Up to 90%',
    platforms: 'MT4 / MT5 / cTrader',
    news: 'Allowed',
    consistency: 'Variable',
    payout: 'Reliable profile',
    community: '4.3/5 synthetic signal',
    bestFor: 'Flexibility and scaling',
    risk: 'Rules change meaningfully by selected program.',
  },
  {
    firm: 'Tradeify',
    href: '/firm/tradeify',
    offer: 'Futures Plans',
    entry: '$99+',
    account: '$5k - $150k',
    target: 'Plan-dependent',
    drawdown: 'Trailing by plan',
    split: 'Up to 90%',
    platforms: 'Tradovate / NinjaTrader',
    news: 'Allowed',
    consistency: 'No classic rule',
    payout: 'Fast profile',
    community: '4.6/5 synthetic signal',
    bestFor: 'Futures traders',
    risk: 'Futures volatility can make direct access expensive quickly.',
  },
  {
    firm: 'Blue Guardian',
    href: '/firm/blue-guardian',
    offer: 'Blue Guardian Programs',
    entry: '$47+',
    account: '$5k - $200k',
    target: 'Program-dependent',
    drawdown: 'Variable',
    split: 'Up to 90%',
    platforms: 'MT5',
    news: 'Allowed',
    consistency: 'Variable',
    payout: 'Mixed to reliable',
    community: '4.2/5 synthetic signal',
    bestFor: 'Traders looking for account variety',
    risk: 'Less massive public feedback than the largest leaders.',
  },
];

const noChallengeRiskCards = [
  {
    title: 'Funded-stage rules can be stricter',
    text: 'Many traders only discover after purchase that drawdown, news restrictions, lot size or scaling rules are harder than the marketing page made them feel.',
  },
  {
    title: 'The true cost can rise fast',
    text: 'A low entry price can become expensive when renewals, resets or repeated direct-account attempts are counted over several months.',
  },
  {
    title: 'There is less discipline testing',
    text: 'Skipping the evaluation also skips a useful stress test. If your risk control is not already stable, the shortcut can simply expose weaknesses faster.',
  },
  {
    title: 'Minimum payout can block small-win systems',
    text: 'Some direct accounts require a minimum withdrawal amount or specific payout rhythm that does not fit traders who build profit slowly.',
  },
  {
    title: 'Surprise clauses matter more',
    text: 'Post-funding clauses are sometimes less obvious than challenge rules. Read the funded-stage terms, not only the product headline.',
  },
];

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
  const isBestRankingGuide = guide.slug === 'meilleure-prop-firm-2026';
  const isNoChallengeGuide = guide.slug === 'prop-firm-sans-challenge';
  const isLeveragedGuide = guide.slug === 'leveraged-prop-firm-avis';
  const isSmcGuide = guide.slug === 'prop-firm-smc-ict';
  const rankingMethodology = isNoChallengeGuide ? noChallengeMethodology : bestRankingMethodology;
  const flagshipRows = isNoChallengeGuide ? noChallengeRows : bestRankingRows;
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
      description: toEnglishText(firm.verdict),
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
          {isLeveragedGuide ? (
            <>
              <div className="proof-panel-long"><strong>No regulated affiliation known</strong><span>linked firm context</span></div>
              <div className="proof-panel-long"><strong>Cyprus prop firm - 20% consistency - pay after pass</strong><span>main keywords</span></div>
              <div className="proof-panel-long"><strong>{modifiedDateLabel}</strong><span>sources: official site, FAQ, Trustpilot, FX News Group, CySEC</span></div>
            </>
          ) : (
            <>
              <div><strong>{firms.length}</strong><span>linked firms</span></div>
              <div><strong>{displayGuide.primaryKeywords.length}</strong><span>main keywords</span></div>
              <div><strong>{modifiedDateLabel}</strong><span>data updated</span></div>
            </>
          )}
        </div>
      </section>

      {isBestRankingGuide || isNoChallengeGuide ? (
        <section className="section best-method-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Ranking Methodology</div>
              <h2>{isNoChallengeGuide ? 'How no-challenge offers are weighted.' : 'How this ranking is weighted.'}</h2>
            </div>
            <p className="section-note">
              {isNoChallengeGuide
                ? 'This ranking compares direct-funded and instant-funding offers by the conditions that matter once the account is live. Always recheck the official page before buying because no-challenge rules can change quickly.'
                : 'Data comes from official pages, recent trader feedback, Reddit, Discord, X and review platforms. Always recheck the official page before buying because rules change often.'}
            </p>
          </div>
          <div className="best-method-grid">
            {rankingMethodology.map((item) => (
              <article className="panel best-method-card" key={item.label}>
                <strong>{item.weight}</strong>
                <span>{item.label}</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {isLeveragedGuide ? (
        <>
          <section className="section leveraged-alert-section">
            <div className="leveraged-alert-banner">
              <strong>Recent firm + CySEC warning covered by FX News Group</strong>
              <span>
                Mandatory verification before purchase. PropRadar treats Get Leveraged as high vigilance until the regulator status,
                exact rules and very recent payout proof are checked.
              </span>
            </div>
          </section>

          <section className="section leveraged-context-grid">
            <article className="panel leveraged-context-card">
              <div className="eyebrow">Company Context</div>
              <h2>Very recent Cyprus-based operator.</h2>
              <p>
                Leveraged, also presented as GetLeveraged Ltd, is described as a recent prop firm incorporated in April 2025 in
                Limassol, Cyprus. That short operating history matters: a firm this young should not be evaluated like FTMO,
                Topstep or The5ers, which have longer public records.
              </p>
              <p>
                The company is associated with CEO Tal Fromchenko, previously linked to OptionRally, a brand closed by CySEC in
                2020. This does not prove current misconduct, but it increases the need for strict source checking.
              </p>
            </article>

            <article className="panel leveraged-context-card leveraged-regulatory-card">
              <div className="eyebrow">Regulatory Alert</div>
              <h2>CySEC warning reported by FX News Group.</h2>
              <p>
                FX News Group reported on April 7, 2026 that CySEC warned against five unauthorized investment-firm websites,
                including getleveraged.com. PropRadar treats that as a major red flag before purchase.
              </p>
              <p>
                The regulator context does not automatically prove that every user complaint is valid, but it changes the risk
                reading: a recent Cyprus-linked firm with a public warning should be checked far more strictly than an established operator.
              </p>
              <div className="leveraged-source-actions">
                <a href="https://fxnewsgroup.com/forex-news/regulatory/cysec-warns-against-five-unauthorized-investment-firms-2/" target="_blank" rel="noreferrer">Read FX News Group report</a>
                <a href="https://www.cysec.gov.cy/en-GB/investor-protection/warnings/" target="_blank" rel="noreferrer">Check CySEC warnings</a>
                <a href="https://www.cnmv.es/" target="_blank" rel="noreferrer">Check CNMV</a>
              </div>
            </article>
          </section>
        </>
      ) : null}

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

      {isLeveragedGuide ? (
        <>
          <section className="section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Payment Proof & Real Feedback</div>
                <h2>What independent sources suggest right now.</h2>
              </div>
              <p className="section-note">
                Use these as research leads, not proof by themselves. Payout evidence should be recent, dated and tied to the exact program.
              </p>
            </div>
            <div className="leveraged-evidence-grid">
              <article className="panel">
                <span>Positive signal</span>
                <h3>Some traders report successful payouts.</h3>
                <p>
                  Discord and Reddit discussions, including prop-firm communities, contain reports of successful withdrawals,
                  sometimes for several thousand dollars, especially when traders respect the consistency rule very strictly.
                </p>
              </article>
              <article className="panel leveraged-risk-card">
                <span>Recurring complaint</span>
                <h3>The 20% consistency rule is the danger point.</h3>
                <p>
                  Negative feedback often focuses on traders reaching the profit target and then facing payout refusal or delay
                  because one trading day represented too much of total profit. This is the rule to simulate before paying.
                </p>
              </article>
              <article className="panel">
                <span>Trustpilot context</span>
                <h3>Unavailable rating means extra caution.</h3>
                <p>
                  Trustpilot does not currently give the same clean public signal as an established profile. Removed-review or
                  guideline alerts make perfect testimonials on the official site less useful unless they are cross-checked.
                </p>
              </article>
            </div>
          </section>

          <section className="section leveraged-pros-cons">
            <article className="panel leveraged-pro-card">
              <div className="eyebrow">Pros</div>
              <h2>What can make the offer attractive.</h2>
              <ul className="risk-list">
                <li>Visible brand with active marketing and multiple public program names.</li>
                <li>Advertised 80% split and account sizes from 5k to 1M.</li>
                <li>Low-entry "pay after you pass" messaging can look attractive for small-budget traders.</li>
                <li>Some public payout claims exist, but each one needs date, amount and program context.</li>
              </ul>
            </article>
            <article className="panel leveraged-risk-card">
              <div className="eyebrow">Cons</div>
              <h2>Why the risk level is higher.</h2>
              <ul className="risk-list">
                <li>Very recent company history compared with established prop firms.</li>
                <li>Reported CySEC warning involving getleveraged.com must be checked before buying.</li>
                <li>Strict 20% consistency feedback can make payout validation difficult.</li>
                <li>Trustpilot rating is unavailable, with removed-review signals requiring extra skepticism.</li>
              </ul>
            </article>
          </section>

          <section className="section">
            <article className="panel leveraged-final-verdict">
              <div className="eyebrow">PropRadar Verdict</div>
              <h2>Buy only after fresh proof, not because the entry price looks easy.</h2>
              <p>
                Get Leveraged has visible marketing and attractive entry conditions: low upfront messaging, an advertised 80%
                split and AI/tooling language around its offer. However, the combination of very young firm, reported CySEC
                warning, unavailable Trustpilot rating and strict consistency feedback justifies maximum vigilance.
              </p>
              <p>
                Many traders may pass the challenge, but a meaningful number of negative reports focus on payout validation and
                consistency. Buy only if you have verified very recent payout proof and you can trade with extremely regular daily
                profit distribution.
              </p>
              <strong>
                Risk disclaimer: most traders lose challenge fees. With a firm less than one year into its public track record and
                a regulator warning to verify, the risk is significantly higher than with established operators.
              </strong>
            </article>
          </section>
        </>
      ) : null}

      {isSmcGuide ? (
        <>
          <section className="section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">SMC / ICT Compatibility</div>
                <h2>The rules that decide whether the style survives funded stage.</h2>
              </div>
              <p className="section-note">
                Updated {modifiedDateLabel}. Sources to monitor: Reddit communities, X, Trustpilot, official rule pages and recent payout proof.
              </p>
            </div>
            <div className="smc-filter-grid">
              {smcCompatibilityFilters.map((filter) => (
                <article className="panel smc-filter-card" key={filter.title}>
                  <span>{filter.title}</span>
                  <p>{filter.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Firms To Investigate First</div>
                <h2>Shortlist for SMC / ICT traders in 2026.</h2>
              </div>
              <p className="section-note">
                This is not a paid ranking. Treat it as a research path: verify the exact plan, drawdown, news windows and payout rules before buying.
              </p>
            </div>
            <div className="smc-shortlist-grid">
              {smcShortlist.map((item) => (
                <article className="panel smc-shortlist-card" key={item.name}>
                  <div className="smc-card-head">
                    <div>
                      <span>{item.market}</span>
                      <h3>{item.name}</h3>
                    </div>
                    <strong>{item.score}</strong>
                  </div>
                  <div className="smc-card-columns">
                    <div>
                      <small>Why it can fit</small>
                      <ul className="risk-list">
                        {item.advantages.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    </div>
                    <div>
                      <small>What to verify</small>
                      <ul className="risk-list">
                        {item.watch.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    </div>
                  </div>
                  <Link href={item.href} className="btn">Open research path</Link>
                </article>
              ))}
            </div>
          </section>

          <section className="section guide-card-grid">
            <article className="panel smc-community-card">
              <div className="eyebrow">Community Signals</div>
              <h2>What to look for in Reddit, Discord and X.</h2>
              <p>
                Search for traders discussing liquidity grabs, order blocks, fair value gaps, NAS/US30/ES/NQ execution,
                and whether payouts were approved after scaling. The useful reviews are the ones that mention exact rules,
                program names, dates and screenshots, not generic "best prop firm" comments.
              </p>
              <p>
                A balanced read matters: firms that feel flexible can still have slower payouts or weaker spreads, while strict
                firms can protect capital better but limit aggressive SMC/ICT execution.
              </p>
            </article>
            <article className="panel smc-verdict-card">
              <div className="eyebrow">Verdict</div>
              <h2>Pick the rule set, not the biggest account.</h2>
              <p>
                For intraday SMC/ICT with scaling and liquidity concepts, start by comparing futures-oriented firms such as
                Alpha Futures, Lucid Trading and Tradeify, then benchmark them against established forex/CFD names like FTMO
                and The5ers. The best firm is the one whose rules match your daily execution, not the one promising the largest capital.
              </p>
            </article>
          </section>
        </>
      ) : null}

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Flagship Offers</div>
            <h2>
              {isNoChallengeGuide
                ? 'Comparison table of no-challenge offers to check first.'
                : isBestRankingGuide
                  ? 'Comparison table of the flagship offers to check first.'
                  : 'Comparison table of the programs to check first.'}
            </h2>
          </div>
          <p className="section-note">
            {isNoChallengeGuide
              ? 'This table compares direct or instant-funded offers. The goal is not to chase the fastest access, but to understand funded-stage rules, true cost, payout reliability and the main risk before paying.'
              : isBestRankingGuide
              ? 'This table compares the most cited offers and the decision details traders actually need: news rules, consistency, payout reliability, community signal and main risk.'
              : 'This table starts from products highlighted in PropRadar profiles. Amounts and rules must always be rechecked on the official page before purchase.'}
          </p>
        </div>
        {isBestRankingGuide || isNoChallengeGuide ? (
          <div className="best-ranking-table">
            <div className="best-ranking-row best-ranking-head">
              <span>Firm</span>
              <span>Flagship offer</span>
              <span>Entry / account</span>
              <span>Rules</span>
              <span>Payout</span>
              <span>Best for</span>
              <span>Main risk</span>
            </div>
            {flagshipRows.map((row) => (
              <Link href={row.href} className="best-ranking-row" key={row.firm}>
                <div>
                  <strong>{row.firm}</strong>
                  <small>{row.community}</small>
                </div>
                <div>
                  <strong>{row.offer}</strong>
                  <small>{row.platforms}</small>
                </div>
                <div>
                  <strong>{row.entry}</strong>
                  <small>{row.account}</small>
                </div>
                <div>
                  <strong>{row.drawdown} drawdown</strong>
                  <small>News: {row.news}</small>
                  <small>Consistency: {row.consistency}</small>
                </div>
                <div>
                  <strong>{row.split}</strong>
                  <small>{row.payout}</small>
                </div>
                <div>
                  <strong>{row.bestFor}</strong>
                  <small>Target: {row.target}</small>
                </div>
                <div>
                  <strong>{row.risk}</strong>
                </div>
              </Link>
            ))}
            <p className="best-ranking-footnote">
              {isNoChallengeGuide
                ? 'Community score is a synthetic reading of recent public feedback. Mixed means user feedback changes by period, product or trader profile. Always verify current rules on the official checkout page.'
                : 'Community signal is a synthesis of recent public feedback and review-platform context. Mixed means feedback varies by period, product or trader profile.'}
            </p>
          </div>
        ) : (
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
        )}
      </section>

      {isNoChallengeGuide ? (
        <>
          <section className="section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Real No-Challenge Risks</div>
                <h2>The shortcut is only useful if the funded-stage rules fit you.</h2>
              </div>
              <p className="section-note">
                These are the recurring traps to check before paying for direct access. The question is not just "Can I skip the challenge?", but "Can I withdraw under these rules?".
              </p>
            </div>
            <div className="no-challenge-risk-grid">
              {noChallengeRiskCards.map((card) => (
                <article className="panel no-challenge-risk-card" key={card.title}>
                  <span>{card.title}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section guide-card-grid">
            <article className="panel no-challenge-use-card">
              <div className="eyebrow">How To Use This Table</div>
              <h2>Compare the rule after funding before the price.</h2>
              <ul className="risk-list">
                <li>Pick the row that matches your market first: futures traders should study Tradeify, while forex/CFD traders should compare Instant Funding, FXIFY, Funded Trading Plus and Blue Guardian.</li>
                <li>Read the funded-stage rules, not only the product headline or checkout discount.</li>
                <li>Calculate the real cost over 3 to 6 months based on your normal trading rhythm.</li>
                <li>Cross-check recent payout feedback from traders who used the same program, not just the same brand.</li>
                <li>If your strategy is not stable yet, a classic evaluation may be cheaper and more useful than direct access.</li>
              </ul>
            </article>
            <article className="panel no-challenge-verdict-card">
              <div className="eyebrow">Final Take</div>
              <h2>No challenge is not no risk.</h2>
              <p>
                Direct access can make sense when you already trade profitably and know your average drawdown. It is much weaker for traders who are still learning discipline, because it removes the evaluation step without removing payout rules.
              </p>
              <p>
                The best choice is the offer whose funded-stage rules you can follow every day. If the program only looks attractive because it is fast, treat it as expensive until proven otherwise.
              </p>
            </article>
          </section>
        </>
      ) : null}

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
