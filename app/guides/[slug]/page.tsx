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

  if (guide.slug === 'prop-firm-pour-debutant') {
    return [
      'As a beginner, you want a clear answer: which program should you try first, and why should you avoid oversized accounts too early?',
      'Your first prop firm should not be chosen because it advertises the biggest account or the strongest discount. It should be chosen because the rules are readable, the drawdown is understandable and the program lets you build discipline without constant rule anxiety.',
      'An oversized account with complex rules increases the risk of accidental violations around news, drawdown, lot size or payout conditions. A smaller account with simple rules lets you test your process, learn discipline and scale later with more confidence.',
    ];
  }

  if (guide.slug === 'goat-funded-trader-avis') {
    return [
      'The main risk with Goat Funded Trader is choosing a program before understanding the rules attached to that exact model.',
      '1-step, 2-step, 3-step and Instant can differ on news trading, weekend holding, lot size, daily loss, max loss and payout delay. A trader can like the brand, the price and the discount code, then still pick a module that does not fit the way they trade.',
      'The right decision is to choose the model whose rules are clearly written, easy to find and compatible with your day-to-day execution. This matters even more if you trade news, hold over weekends or use larger position sizing.',
    ];
  }

  if (guide.slug === 'prop-firm-avis-reddit-trustpilot') {
    return [
      'The danger is trusting a clean public rating without asking what produced it. Many traders buy after seeing 4.7 or 4.8 stars, then discover stricter payout rules, repeated withdrawal complaints or reviews clustered around a discount campaign.',
      'A good public rating does not compensate for vague withdrawal conditions, unexplained payout denials or a large gap between Trustpilot and recent Reddit, Discord or X discussions.',
      'The right decision is to choose a firm whose rules are clear and whose positive and negative feedback stays coherent across several platforms. Trustpilot is a starting point, not a verdict.',
    ];
  }

  if (guide.slug === 'alternatives-ftmo') {
    return [
      'If you are comparing The5ers, Funding Pips, FunderPro or another firm against FTMO, the real question is simple: which constraint does FTMO not solve for you?',
      'The5ers can make sense if you want a clearer conservative framework and progressive scaling. Funding Pips or FunderPro can become more interesting if you need different platform access, more flexible news or EA rules, or a different payout structure. But the exact program matters more than the headline price.',
      'Before switching, compare entry fee, account size, profit target, drawdown, news and EA rules, payout delay, recurring fees and scaling conditions. A strong discount is not useful if the alternative blocks your style or makes payout harder than FTMO.',
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

const beginnerMethodology = [
  {
    label: 'Rule clarity',
    weight: '35%',
    text: 'Simple, dated and easy-to-find rules matter more than account size for a first challenge.',
  },
  {
    label: 'Accessible cost',
    weight: '25%',
    text: 'Entry fee, realistic account size and reset cost are weighted together, not as separate marketing claims.',
  },
  {
    label: 'Protective drawdown',
    weight: '20%',
    text: 'A beginner-friendly program should give enough room to learn without encouraging reckless risk.',
  },
  {
    label: 'Payout reliability',
    weight: '20%',
    text: 'Recent payout feedback, public complaints and rule-related denial patterns are checked before price.',
  },
];

const reviewSignalsMethodology = [
  {
    label: 'Trustpilot context',
    weight: '30%',
    text: 'Raw rating, review timing, removed-review signals and whether positive reviews cluster around campaigns.',
  },
  {
    label: 'Community evidence',
    weight: '30%',
    text: 'Reddit, Discord and X discussions are checked for detailed complaints, payout proof and repeated patterns.',
  },
  {
    label: 'Payout proof',
    weight: '25%',
    text: 'Recent, dated payout evidence matters more than generic testimonials or perfect review snippets.',
  },
  {
    label: 'Commercial context',
    weight: '15%',
    text: 'Discount waves, affiliate pressure and review incentives can change how a public rating should be read.',
  },
];

const ftmoAlternativesMethodology = [
  {
    label: 'Real value for money',
    weight: '25%',
    text: 'Entry price is compared with reset risk, account size, rule clarity and the real cost over several attempts.',
  },
  {
    label: 'Rule flexibility',
    weight: '25%',
    text: 'News trading, EA permissions, weekend holding, drawdown type and platform restrictions are compared against FTMO.',
  },
  {
    label: 'Payout quality',
    weight: '25%',
    text: 'Payout speed, payout reliability, withdrawal minimums and recent community feedback matter more than the advertised split.',
  },
  {
    label: 'Clarity and community',
    weight: '25%',
    text: 'Official rule pages, support clarity and recent Reddit, Discord and X feedback decide whether the alternative is actually easier to use.',
  },
];

const gftReviewMethodology = [
  {
    label: 'Rule clarity',
    weight: '35%',
    text: 'How clearly GFT separates 1-step, 2-step, 3-step and Instant rules before checkout.',
  },
  {
    label: 'Payout reliability',
    weight: '30%',
    text: 'Payout delay, withdrawal clauses, recent payout feedback and repeated denial reasons.',
  },
  {
    label: 'Program fit',
    weight: '20%',
    text: 'News trading, weekend holding, lot size, daily loss and max loss compatibility with the trader style.',
  },
  {
    label: 'Community context',
    weight: '15%',
    text: 'Recent Reddit, Discord and X feedback, with extra weight on traders mentioning the exact model used.',
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

const beginnerRows = [
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
    payout: 'Strong public record',
    community: 'Very high rule clarity',
    bestFor: 'Beginners who want structure',
    risk: 'Strict details can create mistakes if you do not read every rule.',
  },
  {
    firm: 'The5ers',
    href: '/firm/the5ers',
    offer: 'High Stakes',
    entry: '$39 - $495',
    account: '$5k - $100k',
    target: '8% then scaling',
    drawdown: '10%',
    split: '80% + scaling',
    platforms: 'MT5 / cTrader',
    news: 'Plan-dependent',
    consistency: 'Program-specific',
    payout: 'Reliable profile',
    community: 'High clarity',
    bestFor: 'Progressive beginners',
    risk: 'Less pressure at the start, but scaling rules still need careful reading.',
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
    payout: 'Strong futures profile',
    community: 'Medium clarity for beginners',
    bestFor: 'Futures learning path',
    risk: 'Multiple attempts can make the low monthly price expensive.',
  },
  {
    firm: 'FundedNext',
    href: '/firm/fundednext',
    offer: 'Evaluation models',
    entry: '$29 - $999',
    account: '$5k - $200k',
    target: 'Model-dependent',
    drawdown: 'Variable',
    split: '80-90%',
    platforms: 'MT4 / MT5 / cTrader',
    news: 'Model-dependent',
    consistency: 'Model-dependent',
    payout: 'Mixed to fast',
    community: 'Flexible but needs filtering',
    bestFor: 'Beginners comparing models',
    risk: 'Rules change by model, so the exact offer matters more than the brand.',
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
    news: 'Plan-dependent',
    consistency: 'Variable',
    payout: 'Established but quieter',
    community: 'Medium public sample',
    bestFor: 'Beginners with some experience',
    risk: 'Less beginner-specific public feedback than the largest names.',
  },
  {
    firm: 'Alpha Capital Group',
    href: '/firm/alpha-capital-group',
    offer: 'Alpha Pro Evaluation',
    entry: 'Variable',
    account: '$5k - $300k',
    target: 'Program-dependent',
    drawdown: 'Variable',
    split: 'Up to 90%',
    platforms: 'MT5',
    news: 'Plan-dependent',
    consistency: 'Program-specific',
    payout: 'To verify by plan',
    community: 'High clarity, lower mainstream awareness',
    bestFor: 'Beginners comparing modern evaluations',
    risk: 'Less known than the biggest leaders, so recent proof matters.',
  },
];

const reviewSignalRows = [
  {
    firm: 'FTMO',
    href: '/firm/ftmo',
    offer: 'FTMO Challenge',
    entry: '$155 - $1,080',
    account: '$10k - $200k',
    target: '4.7/5 approx.',
    drawdown: 'Good cross-platform coherence',
    split: 'Long public record',
    platforms: 'MT4 / MT5 / cTrader',
    news: 'Trustpilot signal is strong but rule-focused',
    consistency: 'Reddit and Discord complaints usually mention strict rules, not missing operations',
    payout: 'Moderate complaints',
    community: 'Consistent multi-platform signal',
    bestFor: 'Strict rule interpretation',
    risk: 'A high rating does not remove the need to read every FTMO rule before buying.',
  },
  {
    firm: 'The5ers',
    href: '/firm/the5ers',
    offer: 'High Stakes',
    entry: '$39 - $495',
    account: '$5k - $100k',
    target: '4.6/5 approx.',
    drawdown: 'Good cross-platform coherence',
    split: 'Conservative public profile',
    platforms: 'MT5 / cTrader',
    news: 'Trustpilot and community feedback are generally aligned',
    consistency: 'Fewer repeated payout complaints than noisier brands',
    payout: 'Low recurring complaint level',
    community: 'Stable conservative signal',
    bestFor: 'Lower-noise review reading',
    risk: 'Lower complaint volume is positive, but the exact program still decides the rules.',
  },
  {
    firm: 'Topstep',
    href: '/firm/topstep',
    offer: 'Trading Combine',
    entry: '$49 - $149',
    account: '$50k - $150k',
    target: '4.5/5 approx.',
    drawdown: 'Medium to good coherence',
    split: 'Strong futures recognition',
    platforms: 'TopstepX / NinjaTrader / Tradovate',
    news: 'Public rating is useful but reset cost changes user sentiment',
    consistency: 'Reddit and Discord often discuss repeated attempts, drawdown and fees',
    payout: 'Moderate complaints',
    community: 'Recognized futures brand',
    bestFor: 'Reset and monthly-cost analysis',
    risk: 'Positive reviews can miss the cumulative cost of repeated Combine attempts.',
  },
  {
    firm: 'FundedNext',
    href: '/firm/fundednext',
    offer: 'Evaluation models',
    entry: '$29 - $999',
    account: '$5k - $200k',
    target: '4.3/5 approx.',
    drawdown: 'Mixed by model',
    split: 'High-volume review footprint',
    platforms: 'MT4 / MT5 / cTrader',
    news: 'Trustpilot volume is useful but must be filtered by period and model',
    consistency: 'Reddit and Discord feedback can change depending on selected program',
    payout: 'Variable by model',
    community: 'High volume, needs filtering',
    bestFor: 'Model-specific review checks',
    risk: 'One brand rating can hide very different experiences across models.',
  },
];

const ftmoAlternativeRows = [
  {
    firm: 'The5ers',
    href: '/firm/the5ers',
    offer: 'High Stakes',
    entry: '$39 - $495',
    account: '$5k - $100k',
    target: '8% then 5% scaling',
    drawdown: 'Medium flexibility',
    split: '80% + scaling',
    platforms: 'MT5 / cTrader',
    news: 'More conservative framework than pure flexibility',
    consistency: 'Clear scaling path, program-specific restrictions',
    payout: 'Reliable profile',
    community: 'Progressive scaling alternative',
    bestFor: 'Scaling and clearer conservative rules',
    risk: 'Less flexibility on news or EA than some newer alternatives.',
  },
  {
    firm: 'Funding Pips',
    href: '/firm/funding-pips',
    offer: 'Evaluation models',
    entry: '$29 - $499',
    account: '$5k - $100k',
    target: 'Model-dependent',
    drawdown: 'High flexibility',
    split: 'Up to 100%',
    platforms: 'cTrader / Match-Trader / DXtrade',
    news: 'More modern platform and rule options to compare',
    consistency: 'Rules can vary by model and must be read plan by plan',
    payout: 'To verify by model',
    community: 'Flexible modern alternative',
    bestFor: 'Traders who want more rule and platform choice',
    risk: 'The exact model matters; do not compare the brand against FTMO globally.',
  },
  {
    firm: 'FunderPro',
    href: '/firm/funderpro',
    offer: 'FunderPro Program',
    entry: '$69+',
    account: '$5k - $400k',
    target: 'Program-dependent',
    drawdown: 'Medium flexibility',
    split: 'Up to 100%',
    platforms: 'MT4 / MT5 / cTrader',
    news: 'Useful to compare for price and larger account sizes',
    consistency: 'Rule clarity must be checked against the selected program',
    payout: 'Attractive offer, proof still matters',
    community: 'Commercially attractive alternative',
    bestFor: 'Lower entry cost and larger advertised accounts',
    risk: 'Less massive public history than FTMO, so recent payout feedback matters.',
  },
  {
    firm: 'E8 Markets',
    href: '/firm/e8-markets',
    offer: 'E8 Challenge',
    entry: 'Variable',
    account: 'Variable',
    target: 'Program-dependent',
    drawdown: 'Medium flexibility',
    split: 'Up to 90%',
    platforms: 'MT4 / MT5',
    news: 'Competitive conditions to benchmark',
    consistency: 'Requires fresh rule and payout checks',
    payout: 'To verify with current sources',
    community: 'Modern challenger profile',
    bestFor: 'Traders comparing modern challenge terms',
    risk: 'Less known than FTMO and less public data to lean on.',
  },
];

const gftProgramRows = [
  {
    firm: 'GFT 1-step',
    href: '/firm/goat-funded-trader',
    offer: '1-step model',
    entry: '$55+',
    account: '$2.5k - $400k',
    target: 'Single-phase target',
    drawdown: '6-10%',
    split: 'Up to 100%',
    platforms: 'MT5 / TradeLocker / cTrader',
    news: 'Program-specific',
    consistency: 'Lot size and holding rules to verify',
    payout: 'Mixed to reliable',
    community: 'Fast model, rule sensitivity',
    bestFor: 'Traders who want fewer phases',
    risk: 'Speed can hide stricter funded-stage conditions.',
  },
  {
    firm: 'GFT 2-step',
    href: '/firm/goat-funded-trader',
    offer: '2-step model',
    entry: '$55+',
    account: '$2.5k - $400k',
    target: 'Two validation phases',
    drawdown: '6-10%',
    split: 'Up to 100%',
    platforms: 'MT5 / TradeLocker / cTrader',
    news: 'Must verify by plan',
    consistency: 'Model-specific',
    payout: 'Mixed to reliable',
    community: 'More classic evaluation signal',
    bestFor: 'Traders who prefer validation before funded stage',
    risk: 'The cheapest option is not always the most flexible.',
  },
  {
    firm: 'GFT 3-step',
    href: '/firm/goat-funded-trader',
    offer: '3-step model',
    entry: '$55+',
    account: '$2.5k - $400k',
    target: 'Three validation phases',
    drawdown: '6-10%',
    split: 'Up to 100%',
    platforms: 'MT5 / TradeLocker / cTrader',
    news: 'Often clearer after rule review',
    consistency: 'Model-specific',
    payout: 'Mixed to reliable',
    community: 'Lower-speed, more validation',
    bestFor: 'Traders who want to spread risk',
    risk: 'More phases can reduce speed and increase time cost.',
  },
  {
    firm: 'GFT Instant',
    href: '/firm/goat-funded-trader',
    offer: 'Instant Funding',
    entry: '$55+',
    account: '$2.5k - $400k',
    target: 'No classic evaluation',
    drawdown: '6-10%',
    split: 'Up to 100%',
    platforms: 'MT5 / TradeLocker / cTrader',
    news: 'High-priority check',
    consistency: 'Funded-stage clauses matter most',
    payout: 'Mixed to reliable',
    community: 'Attractive but stricter',
    bestFor: 'Experienced traders who already have discipline',
    risk: 'Beginners can hit payout or rule problems quickly.',
  },
];

const gftDifferenceCards = [
  {
    title: '1-step and Instant',
    text: 'Faster access can look attractive, but these formats deserve the strictest check on news trading, weekend holding, lot size and payout timing.',
  },
  {
    title: '2-step and 3-step',
    text: 'More validation can feel slower, but it may give traders more time to test discipline before funded-stage rules become the main risk.',
  },
  {
    title: 'Weekend holding',
    text: 'Weekend holding can be allowed on some modules and restricted on others. Verify the exact model before assuming your swing plan works.',
  },
  {
    title: 'News trading',
    text: 'News rules are one of the biggest traps. "Allowed" on a marketing page does not always mean unrestricted trading around major releases.',
  },
];

const gftRiskCards = [
  {
    title: 'Program mismatch',
    text: 'Many bad decisions come from buying the wrong module for the trader style, especially when a discount pushes the choice.',
  },
  {
    title: 'News and weekend restrictions',
    text: 'These are among the most underestimated rules for GFT. They matter heavily for macro, SMC, swing and weekend-holding traders.',
  },
  {
    title: 'Discount illusion',
    text: 'A strong code can reduce entry cost, but it does not reduce payout rules, max loss, lot-size limits or rule-violation risk.',
  },
  {
    title: 'Instant funding pressure',
    text: 'Instant can attract beginners, but it exposes weak discipline faster because there is less evaluation before funded-style constraints.',
  },
];

const beginnerRuleCards = [
  {
    title: 'Accidental violations',
    text: 'Beginners usually lose accounts on small rule details: lot size, news windows, holding rules, daily loss or max drawdown. Clear rules reduce avoidable mistakes.',
  },
  {
    title: 'Oversized accounts',
    text: 'A large account can look exciting, but it increases pressure and makes every rule mistake feel more expensive. Small or medium accounts are usually better for the first attempt.',
  },
  {
    title: 'Real cost',
    text: 'The entry fee is not the full cost. Compare resets, repeat attempts and subscription-style fees over 2 to 3 months before calling an offer cheap.',
  },
  {
    title: 'Scaling later',
    text: 'The first goal is to prove your process, not to manage the largest possible balance. Scaling makes more sense after you can follow rules consistently.',
  },
];

const beginnerChoiceSteps = [
  'Start with the smallest account that still lets you test the rules seriously.',
  'Prefer $5k to $25k accounts for a first attempt unless you already have months of stable results.',
  'Choose readable drawdown first: static, EOD or a clearly explained trailing rule.',
  'Read the full rules before buying, not only the marketing summary or checkout page.',
  'Use a discount code only after choosing the right program; never use it to justify an oversized account.',
];

const reviewReadingCards = [
  {
    title: 'Do not read Trustpilot alone',
    text: 'Trustpilot is useful for volume, but it should be cross-checked with Reddit, Discord, X, official rules and payout proof.',
  },
  {
    title: 'Check review timing',
    text: 'A sudden wave of 5-star reviews during a large discount campaign is not automatically fake, but it deserves extra context.',
  },
  {
    title: 'Look for repeated complaints',
    text: 'Even minority complaints can reveal the real weakness: payout delay, denials for small rule details, support pressure or changing conditions.',
  },
  {
    title: 'Prioritize dated proof',
    text: 'Recent screenshots, withdrawal IDs and posts tied to exact programs are more useful than generic testimonials or perfect marketing snippets.',
  },
];

const reviewRedFlags = [
  'Many 5-star reviews published within a short promotional period.',
  'Very generic reviews with no detail about rules, payouts, platform or account type.',
  'Repeated complaints about the same payout issue while the global rating remains high.',
  'A large gap between Trustpilot and recent Reddit, Discord or X discussions.',
  'Visible removed-review signals or moderation issues on review platforms.',
  'Aggressive discount campaigns that encourage users to review immediately after purchase, before payout.',
];

const ftmoAlternativeReasons = [
  {
    title: 'Lower entry price',
    text: 'An alternative can make sense if the entry cost is clearly lower and the rules stay readable enough to avoid repeated resets.',
  },
  {
    title: 'More rule flexibility',
    text: 'News trading, EA permissions, weekend holding or platform choice can justify switching if FTMO blocks your normal execution.',
  },
  {
    title: 'Different payout structure',
    text: 'A different payout frequency, minimum withdrawal or scaling model can matter more than the headline challenge price.',
  },
  {
    title: 'Better fit for your style',
    text: 'The best alternative is not the loudest discount. It is the firm whose rules match your market, risk profile and trading rhythm.',
  },
];

const ftmoStayReasons = [
  'You value rule clarity, stability and a long public track record more than discounts.',
  'You trade in a disciplined way and do not need extreme flexibility around news, EA or weekend holding.',
  'You prefer a well-defined two-step structure with transparent conditions.',
  'You do not have a specific pain point with FTMO beyond wanting a cheaper challenge.',
];

const ftmoComparisonSteps = [
  'Identify the exact FTMO constraint you are trying to solve: price, platform, news, EA, payout timing or scaling.',
  'Compare news trading, EA and weekend holding rules before looking at discount codes.',
  'Calculate real cost over 3 to 6 months, including resets or repeated attempts.',
  'Read recent Reddit and Discord feedback focused on payouts and rule denials.',
  'Switch only if the alternative solves your main pain point clearly enough to justify leaving FTMO.',
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
  const isBeginnerGuide = guide.slug === 'prop-firm-pour-debutant';
  const isReviewSignalsGuide = guide.slug === 'prop-firm-avis-reddit-trustpilot';
  const isFtmoAlternativesGuide = guide.slug === 'alternatives-ftmo';
  const isGftGuide = guide.slug === 'goat-funded-trader-avis';
  const isLeveragedGuide = guide.slug === 'leveraged-prop-firm-avis';
  const isSmcGuide = guide.slug === 'prop-firm-smc-ict';
  const rankingMethodology = isGftGuide
    ? gftReviewMethodology
    : isFtmoAlternativesGuide
    ? ftmoAlternativesMethodology
    : isReviewSignalsGuide
    ? reviewSignalsMethodology
    : isBeginnerGuide
    ? beginnerMethodology
    : isNoChallengeGuide
    ? noChallengeMethodology
    : bestRankingMethodology;
  const flagshipRows = isGftGuide
    ? gftProgramRows
    : isFtmoAlternativesGuide
    ? ftmoAlternativeRows
    : isReviewSignalsGuide
    ? reviewSignalRows
    : isBeginnerGuide
    ? beginnerRows
    : isNoChallengeGuide
    ? noChallengeRows
    : bestRankingRows;
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

      {isBestRankingGuide || isNoChallengeGuide || isBeginnerGuide || isReviewSignalsGuide || isFtmoAlternativesGuide || isGftGuide ? (
        <section className="section best-method-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">{isGftGuide || isBeginnerGuide || isReviewSignalsGuide || isFtmoAlternativesGuide ? 'Review Methodology' : 'Ranking Methodology'}</div>
              <h2>
                {isGftGuide
                  ? 'How this GFT review is weighted.'
                  : isFtmoAlternativesGuide
                    ? 'How FTMO alternatives are evaluated.'
                  : isReviewSignalsGuide
                    ? 'How review reliability is weighted.'
                  : isBeginnerGuide
                    ? 'How beginner-friendly offers are weighted.'
                  : isNoChallengeGuide
                    ? 'How no-challenge offers are weighted.'
                    : 'How this ranking is weighted.'}
              </h2>
            </div>
            <p className="section-note">
              {isGftGuide
                ? 'This review focuses on public GFT offers, official rule clarity and recent community feedback. Always verify the exact model at checkout because GFT rules can differ by module.'
                : isFtmoAlternativesGuide
                ? 'This review compares alternatives only through real trader constraints: price, rule flexibility, platform fit, payout quality, clarity and recent community feedback.'
                : isReviewSignalsGuide
                ? 'This review does not treat a public rating as proof. It weighs Trustpilot context, Reddit and Discord complaints, X reactions, recent payout evidence and the commercial timing around discount campaigns.'
                : isBeginnerGuide
                ? 'This review prioritizes simple rules, realistic account size, accessible cost and beginner-safe drawdown. The goal is not to find the biggest account, but the first program a new trader can follow without avoidable rule mistakes.'
                : isNoChallengeGuide
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
              {isGftGuide
                ? 'Comparison table of GFT models to check first.'
                : isFtmoAlternativesGuide
                ? 'Comparison table of FTMO alternatives to check first.'
                : isReviewSignalsGuide
                ? 'Review-signal table for the firms to check first.'
                : isBeginnerGuide
                ? 'Comparison table of beginner-friendly programs to check first.'
                : isNoChallengeGuide
                ? 'Comparison table of no-challenge offers to check first.'
                : isBestRankingGuide
                  ? 'Comparison table of the flagship offers to check first.'
                  : 'Comparison table of the programs to check first.'}
            </h2>
          </div>
          <p className="section-note">
            {isGftGuide
              ? 'Goat Funded Trader has several modules. The important point is not only the discount code, but the exact rules attached to 1-step, 2-step, 3-step or Instant.'
              : isFtmoAlternativesGuide
              ? 'This table compares the main alternatives traders usually research before leaving FTMO. The focus is price, rule flexibility, payout conditions and the real advantage versus FTMO.'
              : isReviewSignalsGuide
              ? 'This table compares the public review signal, not only the product. The key question is whether Trustpilot, Reddit, Discord and payout complaints tell the same story.'
              : isBeginnerGuide
              ? 'This table compares flagship offers that beginners often research first. The focus is rule clarity, accessible cost, realistic drawdown and the risk of buying too large too early.'
              : isNoChallengeGuide
              ? 'This table compares direct or instant-funded offers. The goal is not to chase the fastest access, but to understand funded-stage rules, true cost, payout reliability and the main risk before paying.'
              : isBestRankingGuide
              ? 'This table compares the most cited offers and the decision details traders actually need: news rules, consistency, payout reliability, community signal and main risk.'
              : 'This table starts from products highlighted in PropRadar profiles. Amounts and rules must always be rechecked on the official page before purchase.'}
          </p>
        </div>
        {isBestRankingGuide || isNoChallengeGuide || isBeginnerGuide || isReviewSignalsGuide || isFtmoAlternativesGuide || isGftGuide ? (
          <div className="best-ranking-table">
            <div className="best-ranking-row best-ranking-head">
              <span>Firm</span>
              <span>Flagship offer</span>
              <span>Entry / account</span>
              <span>{isReviewSignalsGuide ? 'Review coherence' : isFtmoAlternativesGuide ? 'Rule flexibility' : 'Rules'}</span>
              <span>{isReviewSignalsGuide ? 'Payout complaints' : isFtmoAlternativesGuide ? 'Payout / split' : 'Payout'}</span>
              <span>{isReviewSignalsGuide ? 'Public rating' : isFtmoAlternativesGuide ? 'Advantage vs FTMO' : 'Best for'}</span>
              <span>{isReviewSignalsGuide ? 'Review risk' : isFtmoAlternativesGuide ? 'Risk / trade-off' : 'Main risk'}</span>
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
                  <strong>{isReviewSignalsGuide || isFtmoAlternativesGuide ? row.drawdown : `${row.drawdown} drawdown`}</strong>
                  <small>{isReviewSignalsGuide || isFtmoAlternativesGuide ? row.news : `News: ${row.news}`}</small>
                  <small>{isReviewSignalsGuide || isFtmoAlternativesGuide ? row.consistency : `Consistency: ${row.consistency}`}</small>
                </div>
                <div>
                  <strong>{isReviewSignalsGuide ? row.payout : row.split}</strong>
                  <small>{isReviewSignalsGuide ? row.bestFor : isFtmoAlternativesGuide ? row.payout : row.payout}</small>
                </div>
                <div>
                  <strong>{isReviewSignalsGuide ? row.target : row.bestFor}</strong>
                  <small>{isReviewSignalsGuide ? row.split : isFtmoAlternativesGuide ? `Target: ${row.target}` : `Target: ${row.target}`}</small>
                </div>
                <div>
                  <strong>{row.risk}</strong>
                </div>
              </Link>
            ))}
            <p className="best-ranking-footnote">
              {isGftGuide
                ? 'Important: split and permissions can change by module. Test PROPRADAR after selecting the right model, not before deciding which model fits your trading.'
                : isFtmoAlternativesGuide
                ? 'FTMO note: leaving FTMO only makes sense if the alternative solves a concrete constraint. Do not switch only because the checkout price is lower.'
                : isReviewSignalsGuide
                ? 'Review note: a high rating is only useful when the timing, platform context, payout evidence and community complaints stay coherent. Always cross-check before buying.'
                : isBeginnerGuide
                ? 'Beginner note: the safest first choice is usually the clearest small or medium account, not the largest discounted account. Recheck current official rules before purchase.'
                : isNoChallengeGuide
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

      {isFtmoAlternativesGuide ? (
        <>
          <section className="section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">When Switching Makes Sense</div>
                <h2>An FTMO alternative must solve a real constraint.</h2>
              </div>
              <p className="section-note">
                Cheaper is not enough. The alternative must be better for your rules, platform, payout rhythm or trading style.
              </p>
            </div>
            <div className="ftmo-alt-card-grid">
              {ftmoAlternativeReasons.map((card) => (
                <article className="panel ftmo-alt-info-card" key={card.title}>
                  <span>{card.title}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section guide-card-grid">
            <article className="panel ftmo-alt-stay-card">
              <div className="eyebrow">When To Stay With FTMO</div>
              <h2>Stability can be worth more than a discount.</h2>
              <ul className="risk-list">
                {ftmoStayReasons.map((reason) => <li key={reason}>{reason}</li>)}
              </ul>
            </article>
            <article className="panel ftmo-alt-compare-card">
              <div className="eyebrow">How To Compare</div>
              <h2>Start with the pain point, not the coupon.</h2>
              <ul className="risk-list">
                {ftmoComparisonSteps.map((step) => <li key={step}>{step}</li>)}
              </ul>
            </article>
          </section>

          <section className="section">
            <article className="panel ftmo-alt-verdict-card">
              <div className="eyebrow">Final Take</div>
              <h2>FTMO alternatives are useful only when they solve something specific.</h2>
              <p>
                FTMO remains a reference for many traders because its rule framework and payout reputation are easy to benchmark. The5ers, Funding Pips, FunderPro and E8 Markets can all be worth comparing, but only through the exact constraint you want to solve.
              </p>
              <p>
                Switching only for price or a temporary discount is rarely a good long-term calculation. Switch when the alternative clearly improves your platform fit, rule flexibility, payout conditions or scaling path.
              </p>
            </article>
          </section>
        </>
      ) : null}

      {isReviewSignalsGuide ? (
        <>
          <section className="section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">How To Read Reviews</div>
                <h2>Useful reviews mention rules, payouts and timing.</h2>
              </div>
              <p className="section-note">
                The best review reading is not positive vs negative. It is specific vs vague, recent vs outdated, and verified vs marketing-influenced.
              </p>
            </div>
            <div className="review-card-grid">
              {reviewReadingCards.map((card) => (
                <article className="panel review-info-card" key={card.title}>
                  <span>{card.title}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section guide-card-grid">
            <article className="panel review-alert-card">
              <div className="eyebrow">Review Red Flags</div>
              <h2>Signals that should slow down the purchase.</h2>
              <ul className="risk-list">
                {reviewRedFlags.map((flag) => <li key={flag}>{flag}</li>)}
              </ul>
            </article>
            <article className="panel review-verdict-card">
              <div className="eyebrow">Final Take</div>
              <h2>A good rating is a starting point, not a guarantee.</h2>
              <p>
                The real reliability of a prop firm comes from coherent feedback across several platforms, recent payout proof and clear official rules. A strong Trustpilot score is helpful only when Reddit, Discord and X do not reveal a different payout story.
              </p>
              <p>
                Before buying, compare the rating date, discount timing, repeated complaints and proof quality. If the public rating is high but the recent community signal is noisy, treat the purchase as a risk file, not an easy decision.
              </p>
            </article>
          </section>
        </>
      ) : null}

      {isBeginnerGuide ? (
        <>
          <section className="section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Beginner Risk Map</div>
                <h2>Why clear rules matter more than a large account.</h2>
              </div>
              <p className="section-note">
                Most beginner mistakes are not dramatic trading failures. They are rule misunderstandings that could have been avoided with a clearer first program.
              </p>
            </div>
            <div className="beginner-card-grid">
              {beginnerRuleCards.map((card) => (
                <article className="panel beginner-info-card" key={card.title}>
                  <span>{card.title}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section guide-card-grid">
            <article className="panel beginner-use-card">
              <div className="eyebrow">How To Choose</div>
              <h2>Your first prop firm should protect your learning curve.</h2>
              <ul className="risk-list">
                {beginnerChoiceSteps.map((step) => <li key={step}>{step}</li>)}
              </ul>
            </article>
            <article className="panel beginner-verdict-card">
              <div className="eyebrow">Final Take</div>
              <h2>Start smaller, learn faster, scale later.</h2>
              <p>
                For a beginner, the goal is not to control the biggest possible account as fast as possible. The goal is to learn how to trade under rules while keeping confidence, process and budget intact.
              </p>
              <p>
                Choose the program whose rules are clearest and easiest to follow today. Once your strategy survives real rule pressure, larger accounts and scaling plans become much more meaningful.
              </p>
            </article>
          </section>
        </>
      ) : null}

      {isGftGuide ? (
        <>
          <section className="section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Key Program Differences</div>
                <h2>The model decides the risk, not the brand name.</h2>
              </div>
              <p className="section-note">
                GFT can be attractive because the offer is broad. That variety is also the main trap: permissions can differ by module.
              </p>
            </div>
            <div className="gft-card-grid">
              {gftDifferenceCards.map((card) => (
                <article className="panel gft-info-card" key={card.title}>
                  <span>{card.title}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section guide-card-grid">
            <article className="panel gft-risk-card">
              <div className="eyebrow">Main Risks</div>
              <h2>What to check before using the discount.</h2>
              <div className="gft-risk-list">
                {gftRiskCards.map((card) => (
                  <div key={card.title}>
                    <strong>{card.title}</strong>
                    <p>{card.text}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel gft-verdict-card">
              <div className="eyebrow">PropRadar Take</div>
              <h2>Choose the model first, apply the code second.</h2>
              <p>
                Goat Funded Trader has a wide and commercially attractive offer. That is useful only if the trader slows down enough to compare the exact rules: news, weekend holding, daily loss, max loss, lot size and payout delay.
              </p>
              <p>
                The PROPRADAR code can improve the checkout price, but it should never decide the account size or model. A good discount does not compensate for rules that do not fit your trading style.
              </p>
            </article>
          </section>
        </>
      ) : null}

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
