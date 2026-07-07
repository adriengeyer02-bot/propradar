import {
  BLUE_GUARDIAN_AFFILIATE_URL,
  FTMO_AFFILIATE_URL,
  FUNDERPRO_AFFILIATE_URL,
  GOAT_FUNDED_TRADER_AFFILIATE_URL,
  PROPRADAR_PROMO_CODE,
  THE5ERS_AFFILIATE_URL,
  THE5ERS_PROMO_CODE,
  getFirmBySlug,
  propFirms,
  type PropFirm,
} from './propFirms';

export const PROMO_REVIEW_DATE = '2026-07-05';

export type PromoProofLevel = 'Official' | 'PropRadar affiliate' | 'Confirm at checkout' | 'Good deal without code';
export type PromoCategory = 'code' | 'affiliate' | 'official-discount' | 'price-opportunity' | 'futures';

export type PromoDeal = {
  slug: string;
  label: string;
  title: string;
  code: string;
  value: string;
  category: PromoCategory;
  proofLevel: PromoProofLevel;
  sourceUrl: string;
  sourceLabel: string;
  sourceNote?: string;
  consumerVerdict: string;
  caveats: string[];
  bestFor: string[];
  commercialHook?: string;
  urgency?: string;
  checkoutTip?: string;
  featured?: boolean;
  heroRank?: number;
};

export const promoDeals: PromoDeal[] = [
  {
    slug: 'blue-guardian',
    label: 'Official mega deal + affiliate',
    title: 'Forex SAVE 40-50% + futures SAVE 40%',
    code: PROPRADAR_PROMO_CODE,
    value: '40-50%',
    category: 'official-discount',
    proofLevel: 'Official',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Official Blue Guardian site + PropRadar affiliate link',
    sourceNote: 'PropRadar Blue Guardian link: https://blueguardian.com/?afmc=PROPRADAR. Code PROPRADAR to verify at checkout. Official site checked on 2026-07-04: Forex Discount SAVE 40% to 50% and Futures Discount SAVE 40% displayed as limited-time offers.',
    consumerVerdict:
      'The clearest offer for testing Blue Guardian with a strong discount. It is commercially attractive, but payout rules still need to be read before paying.',
    caveats: ['Exact discount to confirm at checkout', 'Conservative PropRadar score', 'Affiliate link has no impact on the score'],
    bestFor: ['strong discount', 'instant funding', 'forex', 'futures'],
    commercialHook: 'A visible, easy-to-understand discount strong enough to trigger a reasonable purchase check.',
    urgency: 'Limited-time wording shown on the official page',
    checkoutTip: 'Compare Forex, Futures and Instant before paying: the exact discount depends on the cart.',
    featured: true,
    heroRank: 2,
  },
  {
    slug: 'the5ers',
    label: 'Transparent affiliate link',
    title: 'PropRadar The5ers discount code to test at checkout',
    code: THE5ERS_PROMO_CODE,
    value: 'Code',
    category: 'code',
    proofLevel: 'PropRadar affiliate',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'The5ers PropRadar affiliate link',
    sourceNote: 'The5ers affiliate link provided for PropRadar. Coupon 1EIJ6PO to test at checkout. Official site checked on 2026-07-04: programs shown with entry pricing from about $74 depending on configuration.',
    consumerVerdict:
      'Priority deal if you want a more established firm and clearer rules, even if the exact discount must be confirmed at checkout.',
    caveats: ['Exact discount to confirm at checkout', 'Rules differ by program', 'Affiliate link has no impact on the score'],
    bestFor: ['SMC', 'swing', 'careful trader', 'strong score'],
    commercialHook: 'Less flashy than a huge sale, but more reassuring for traders who want to pay for solid rules.',
    checkoutTip: 'Test coupon 1EIJ6PO at checkout and compare Hyper Growth, High Stakes and Bootcamp.',
  },
  {
    slug: 'funderpro',
    label: 'Transparent affiliate link',
    title: 'PropRadar code to test on FunderPro challenges',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    category: 'code',
    proofLevel: 'PropRadar affiliate',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'FunderPro PropRadar affiliate link',
    sourceNote: 'Affiliate link provided for PropRadar. Official site checked on 2026-07-04: Instant Program, news trading allowed and fast rewards highlighted.',
    consumerVerdict:
      'Worth comparing for traders who want news trading, EA, swing options and fast rewards. The PropRadar profile remains partial, so checkout terms and the FAQ need to be reread.',
    caveats: ['Exact discount to confirm at checkout', 'Universe profile still needs more detail', 'Affiliate link has no impact on the score'],
    bestFor: ['EA', 'news trading', 'swing', 'fast rewards'],
    commercialHook: 'A strong commercial angle for news, EA and swing traders looking for flexibility.',
    checkoutTip: 'Verify the selected program: Instant, 1-phase, Pro and Classic do not sell the same promise.',
  },
  {
    slug: 'goat-funded-trader',
    label: 'Transparent affiliate link',
    title: 'GOAT Funded Trader PropRadar code to test at checkout',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    category: 'code',
    proofLevel: 'PropRadar affiliate',
    sourceUrl: GOAT_FUNDED_TRADER_AFFILIATE_URL,
    sourceLabel: 'GOAT Funded Trader PropRadar signup link',
    sourceNote:
      'Signup link provided for PropRadar. Official site checked on 2026-07-05: 1-step, 2-step, 3-step and Instant models, MT5 available, news trading, weekend holding, up to 100% profit split and public FIRSTGFT / BOGO offers visible depending on the period.',
    consumerVerdict:
      'Commercially interesting if you want a prop firm focused on deals, news trading and weekend holding. Code PROPRADAR must be tested at checkout and cannot replace reading the rules.',
    caveats: ['Code to confirm at checkout', 'Rules vary by model', 'Affiliate link has no impact on the score'],
    bestFor: ['news trading', 'weekend holding', 'deal', 'instant funding'],
    commercialHook: 'Clear sales angle: PropRadar code, direct signup, flexible models and a strong payout promise.',
    urgency: 'Limited public offers displayed on the official site',
    checkoutTip: 'Compare 1-step, 2-step, 3-step and Instant before paying, then verify the final price with code PROPRADAR.',
    featured: true,
    heroRank: 5,
  },
  {
    slug: 'fundednext',
    label: 'Deal to confirm',
    title: 'NEW25 code reported on some CFD accounts',
    code: 'NEW25',
    value: '25%',
    category: 'code',
    proofLevel: 'Confirm at checkout',
    sourceUrl: 'https://fundednext.com/#pricing-area',
    sourceLabel: 'Official FundedNext page',
    sourceNote: 'Code tracked as a possible deal, but not confirmed in the public HTML checked on 2026-07-04. The official page mainly highlights rewards, 24h and statistics.',
    consumerVerdict:
      'Interesting only if you already wanted this challenge format. Do not increase account size just to use the code.',
    caveats: ['Exact conditions to confirm at checkout', 'Offer limited to eligible accounts', 'Payout rules must be read on the official source'],
    bestFor: ['CFD', 'direct discount', 'budget'],
    commercialHook: 'Keep as a secondary deal until the code is publicly confirmed.',
    checkoutTip: 'Enter NEW25 only if you already planned to buy FundedNext and verify the final total before payment.',
  },
  {
    slug: 'funderpro',
    label: 'Good deal without code',
    title: 'Instant Program advertised from $79',
    code: 'No code',
    value: '79$+',
    category: 'price-opportunity',
    proofLevel: 'Official',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'Official FunderPro site + PropRadar affiliate link',
    sourceNote: 'Official site checked on 2026-07-04: Instant Program starts from $79.00, news trading allowed, first reward after only $100.',
    consumerVerdict:
      'Potentially useful if you want to avoid a long evaluation, but price alone is not enough: verify target, payout and limits before payment.',
    caveats: ['Price and conditions vary by account size', 'Instant funding rules must be read line by line', 'Affiliate link has no impact on the score'],
    bestFor: ['instant funding', 'budget', 'news trading'],
    commercialHook: 'The "I want to trade now" angle is strong: low entry ticket, no long evaluation and fast rewards.',
    urgency: 'Entry price visible on the official site',
    checkoutTip: 'Check drawdown, limits and minimum payout before choosing Instant.',
    featured: true,
    heroRank: 4,
  },
  {
    slug: 'the5ers',
    label: 'Good deal without code',
    title: 'Programs shown with an entry ticket around $74',
    code: THE5ERS_PROMO_CODE,
    value: '74$+',
    category: 'price-opportunity',
    proofLevel: 'Official',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'Official The5ers site + PropRadar affiliate link',
    sourceNote: 'Official site checked on 2026-07-04: one-time fee shown at $74 on one program, profit split up to 100% and unlimited time limit.',
    consumerVerdict:
      'Good entry point to compare The5ers without focusing only on the discount. The real advantage remains rule quality and stability.',
    caveats: ['Price varies by currency, size and program', 'Coupon 1EIJ6PO to confirm at checkout', 'Affiliate link has no impact on the score'],
    bestFor: ['careful trader', 'swing', 'low ticket'],
    commercialHook: 'A clean entry ticket for a more established name: less flash sale, more long-term value.',
    checkoutTip: 'Compare the low ticket with targets, stop out, daily loss and minimum profitable days.',
  },
  {
    slug: 'ftmo',
    label: 'Transparent link',
    title: 'No confirmed public code, PropRadar affiliate link',
    code: 'No code',
    value: 'Link',
    category: 'affiliate',
    proofLevel: 'PropRadar affiliate',
    sourceUrl: FTMO_AFFILIATE_URL,
    sourceLabel: 'FTMO PropRadar affiliate link',
    sourceNote: 'PropRadar affiliate link. No public discount confirmed in PropRadar on 2026-07-04.',
    consumerVerdict:
      'Consider it for stability and rule clarity, not for a discount. The link is affiliated but the score remains independent.',
    caveats: ['Not a price discount', 'Higher fees than some alternatives', 'News and rule restrictions to verify'],
    bestFor: ['strong score', 'SMC', 'careful trader'],
    commercialHook: 'The rational choice when you mainly want trust, not a large discount percentage.',
  },
  {
    slug: 'topstep',
    label: 'Futures value pick',
    title: 'Futures benchmark to compare even without a code',
    code: 'No code',
    value: 'Futures',
    category: 'futures',
    proofLevel: 'Good deal without code',
    sourceUrl: 'https://www.topstep.com/',
    sourceLabel: 'Official Topstep site',
    sourceNote: 'Official site checked on 2026-07-04: $1.4B+ paid out, 7,000+ traders paid weekly, 15 years trusted by traders.',
    consumerVerdict:
      'Not a PropRadar price discount, but an important futures option to compare with Apex, MyFundedFutures and Take Profit Trader.',
    caveats: ['No known PropRadar code', 'Read consistency, payout caps and fees', 'Futures only'],
    bestFor: ['futures', 'day trading', 'breakout'],
    commercialHook: 'No code, but a strong commercial argument: history, community and payout volume.',
    checkoutTip: 'Compare fees, payout and futures rules mainly against Apex and MyFundedFutures.',
  },
  {
    slug: 'apex-trader-funding',
    label: 'Official futures mega deal',
    title: 'SAVENOW: up to 90% OFF Any Size Evals',
    code: 'SAVENOW',
    value: '90%',
    category: 'futures',
    proofLevel: 'Official',
    sourceUrl: 'https://apextraderfunding.com/',
    sourceLabel: 'Official Apex Trader Funding site',
    sourceNote: 'Official site checked on 2026-07-04: Any Size Evals up to 90% OFF with code SAVENOW and a displayed countdown.',
    consumerVerdict:
      'Very strong futures discount, but PropRadar keeps a cautious reading: verify EOD drawdown, consistency, payout rules and fees after passing.',
    caveats: ['Time-limited offer', 'Firm classified as watchlist', 'Futures rules to reread before payment'],
    bestFor: ['futures', 'scalping', 'day trading', 'strong discount'],
    commercialHook: 'The most spectacular futures deal right now: ideal for clicks, but it must be framed by risk warnings.',
    urgency: 'Countdown displayed on the official site',
    checkoutTip: 'Verify whether the cart is new product or legacy, then check recurring fees and PA fee.',
    featured: true,
    heroRank: 1,
  },
  {
    slug: 'take-profit-trader',
    label: 'Futures deal to revalidate',
    title: 'NOFEE40 reported, but official page under maintenance',
    code: 'NOFEE40',
    value: '40%',
    category: 'futures',
    proofLevel: 'Confirm at checkout',
    sourceUrl: 'https://takeprofittrader.com/',
    sourceLabel: 'Official Take Profit Trader site',
    sourceNote: 'Official page checked on 2026-07-04: site under maintenance. Code NOFEE40 must be revalidated before strong commercial placement.',
    consumerVerdict:
      'Interesting futures offer for traders who want fast payout, with extra attention to buffer, PRO fees and withdrawal conditions.',
    caveats: ['Official page was under maintenance during review', 'Futures only', 'Verify whether the code is still active at checkout'],
    bestFor: ['futures', 'day trading', 'fast payout'],
    commercialHook: 'Keep as a backup deal, not a hero offer, until the official source clearly confirms it.',
    checkoutTip: 'Do not present the code as guaranteed until the official page is back online.',
  },
  {
    slug: 'myfundedfutures',
    label: 'Official futures mega deal',
    title: '50% off Builder for the first account',
    code: 'BUILDER',
    value: '50%',
    category: 'futures',
    proofLevel: 'Official',
    sourceUrl: 'https://myfundedfutures.com/',
    sourceLabel: 'Official MyFundedFutures site',
    sourceNote: 'Official site checked on 2026-07-04: this month only, 50% off Builder for your first account, code BUILDER.',
    consumerVerdict:
      'Recent futures deal for a smaller ticket, to compare with Topstep, Apex and Take Profit Trader depending on drawdown and payout rules.',
    caveats: ['Offer announced as monthly', 'First Builder account only', 'Verify Rapid/Builder/Pro plan before buying'],
    bestFor: ['futures', 'budget', 'day trading'],
    commercialHook: 'Strong angle for a futures trader who wants to test at lower cost without choosing the most aggressive deal in the market.',
    urgency: 'This-month-only wording shown on the official site',
    checkoutTip: 'Confirm that the cart is Builder and the first account before payment.',
    featured: true,
    heroRank: 3,
  },
];

function proofWeight(proofLevel: PromoProofLevel) {
  if (proofLevel === 'Official') return 28;
  if (proofLevel === 'PropRadar affiliate') return 22;
  if (proofLevel === 'Good deal without code') return 12;
  return 8;
}

function valueWeight(value: string) {
  const numeric = Number(value.match(/\d+/)?.[0] ?? 0);
  if (numeric >= 40) return 28;
  if (numeric >= 25) return 20;
  if (numeric > 0) return 10;
  if (/code/i.test(value)) return 12;
  return 4;
}

export function promoDealScore(deal: PromoDeal, firm?: PropFirm) {
  const targetFirm = firm ?? getFirmBySlug(deal.slug);
  const firmScore = targetFirm ? Math.round(targetFirm.score * 0.32) : 12;
  const payoutPenalty = targetFirm ? Math.round(targetFirm.reviewSignals.payoutRiskScore * 0.18) : 8;
  const statusPenalty = targetFirm && /surveiller/i.test(targetFirm.status) ? 6 : 0;
  const featuredBoost = deal.featured ? 6 : 0;

  return Math.max(0, Math.min(100, proofWeight(deal.proofLevel) + valueWeight(deal.value) + firmScore + featuredBoost - payoutPenalty - statusPenalty));
}

export function promoDealWithFirm(deal: PromoDeal) {
  const firm = getFirmBySlug(deal.slug);
  return {
    ...deal,
    dealScore: promoDealScore(deal, firm),
    firm: firm
      ? {
          slug: firm.slug,
          name: firm.name,
          score: firm.score,
          status: firm.status,
          priceFrom: firm.priceFrom,
          payoutRisk: firm.reviewSignals.payoutRisk,
          payoutRiskScore: firm.reviewSignals.payoutRiskScore,
          trustpilotReliability: firm.reviewSignals.trustpilotReliability,
          commercialRelationship: firm.commercialRelationship,
        }
      : null,
  };
}

export function getBestPromoDeals(limit = 12) {
  return promoDeals
    .map((deal) => promoDealWithFirm(deal))
    .sort((a, b) => b.dealScore - a.dealScore)
    .slice(0, limit);
}

export function getMegaPromoDeals(limit = 4) {
  return promoDeals
    .filter((deal) => deal.featured)
    .map((deal) => promoDealWithFirm(deal))
    .sort((a, b) => (a.heroRank ?? 99) - (b.heroRank ?? 99) || b.dealScore - a.dealScore)
    .slice(0, limit);
}

export function getBudgetPromoShortlist(limit = 12) {
  return [...propFirms]
    .filter((firm) => !/ferm/i.test(firm.status) && firm.priceFrom > 0 && firm.priceFrom <= 100 && firm.reviewSignals.payoutRisk !== 'Critique')
    .sort((a, b) => {
      if (a.priceFrom !== b.priceFrom) return a.priceFrom - b.priceFrom;
      return b.score - a.score;
    })
    .slice(0, limit);
}

export function getFuturesPromoShortlist(limit = 8) {
  return [...propFirms]
    .filter((firm) => !/ferm/i.test(firm.status) && firm.styles.some((style) => /futures/i.test(style)))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export const promoFaq = [
  {
    question: 'What is the best prop firm discount code?',
    answer:
      'The best code is the one attached to a firm that still has acceptable rules and payout conditions. A large discount on a risky firm can cost more than a full-price challenge with clearer rules.',
  },
  {
    question: 'Does a PropRadar discount code change the score?',
    answer:
      'No. Affiliate links and discount codes are separated from the PropRadar score. An affiliated firm keeps its weaknesses, payout alerts and audit level visible.',
  },
  {
    question: 'Should you choose the cheapest prop firm?',
    answer:
      'Not always. The real cost depends on drawdown, consistency rules, minimum payout, funded-stage fees and the risk of a rejected withdrawal.',
  },
  {
    question: 'Why are some offers marked as needs confirmation?',
    answer:
      'Because prop firm codes change quickly. PropRadar prefers to show the proof level instead of selling a discount that may expire at checkout.',
  },
];
