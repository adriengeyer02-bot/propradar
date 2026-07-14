import {
  BLUE_GUARDIAN_AFFILIATE_URL,
  FUNDERPRO_AFFILIATE_URL,
  GOAT_FUNDED_TRADER_AFFILIATE_URL,
  PROPRADAR_PROMO_CODE,
  THE5ERS_AFFILIATE_URL,
  THE5ERS_PROMO_CODE,
  getFirmBySlug,
  propFirms,
  type PropFirm,
} from './propFirms';

export const PROMO_REVIEW_DATE = '2026-07-13';

export type PromoProofLevel = 'Official' | 'PropRadar affiliate' | 'Confirm at checkout' | 'Good deal without code';
export type PromoCategory = 'code' | 'affiliate' | 'official-discount' | 'price-opportunity' | 'futures';
export type PromoAvailability = 'Active official offer' | 'Official price' | 'Verify at checkout';

export type PromoDeal = {
  slug: string;
  label: string;
  title: string;
  code: string;
  value: string;
  category: PromoCategory;
  proofLevel: PromoProofLevel;
  availability: PromoAvailability;
  validity: string;
  eligibility: string;
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
    label: 'Official checkout deal + affiliate',
    title: 'LAUNCH: 40% off the selected Blue Guardian evaluation',
    code: 'LAUNCH',
    value: '40%',
    category: 'official-discount',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Limited-time checkout wording; no public end date displayed on 13 July 2026.',
    eligibility: 'Selected Blue Guardian evaluation carts; confirm the discounted subtotal before payment.',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Official Blue Guardian checkout + PropRadar affiliate link',
    sourceNote: 'Official checkout checked on 2026-07-13: SAVE 40% WITH CODE LAUNCH. The same cart displayed separate bundle discounts from the second account onward. PropRadar affiliate link remains disclosed.',
    consumerVerdict:
      'A currently verifiable Blue Guardian discount, but the code must visibly change the subtotal before payment. Add-ons and multiple-account bundles change the real final cost.',
    caveats: ['Confirm LAUNCH is applied to the selected cart', 'Add-ons are priced separately', 'Affiliate link has no impact on the score'],
    bestFor: ['strong discount', 'instant funding', 'forex', 'futures'],
    commercialHook: 'A clear 40% checkout offer, now tied to the exact public code instead of a broad 40-50% claim.',
    urgency: 'Official checkout offer verified 13 July 2026',
    checkoutTip: 'Apply LAUNCH, then compare the discounted base price with paid payout and profit-split add-ons.',
    featured: true,
    heroRank: 2,
  },
  {
    slug: 'goat-funded-trader',
    label: 'Official limited-time BOGO offer',
    title: 'BOGO40: 40% off plus a same-size account after the first payout',
    code: 'BOGO40',
    value: '40% + BOGO',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Limited-time offer; no public end date displayed on 13 July 2026.',
    eligibility: 'Eligible account purchase; the free account is claimable only after the first successful payout and a support request.',
    sourceUrl: `${GOAT_FUNDED_TRADER_AFFILIATE_URL}&coupon=BOGO40`,
    sourceLabel: 'Official GOAT Funded Trader BOGO40 checkout and help article',
    sourceNote: 'Official checkout and help center checked on 2026-07-13: BOGO40 gives 40% off. The same-size free account is not issued at purchase; it becomes claimable only after the first successful payout and contact with support.',
    consumerVerdict:
      'The headline is attractive, but this is not an immediate buy-one-get-one deal. Treat the second account as a conditional reward that depends on reaching and receiving a first payout.',
    caveats: ['Free account only after the first successful payout', 'Support claim required', 'One promo code per purchase'],
    bestFor: ['strong discount', 'evaluation', 'instant funding', 'second-account reward'],
    commercialHook: 'A strong 40% discount with a conditional second account, presented with the payout requirement up front.',
    urgency: 'Official limited-time promotion verified 13 July 2026',
    checkoutTip: 'Use BOGO40 only after confirming the selected model is eligible and the 40% reduction appears in the order summary.',
    featured: true,
    heroRank: 3,
  },
  {
    slug: 'goat-funded-trader',
    label: 'Official new-customer offer',
    title: 'FIRSTGFT: up to 50% off a first GOAT Funded Trader purchase',
    code: 'FIRSTGFT',
    value: 'Up to 50%',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Current official deal page; promotions can expire without a fixed public date.',
    eligibility: 'New customers on eligible plans; only one promotion can be used per purchase.',
    sourceUrl: `${GOAT_FUNDED_TRADER_AFFILIATE_URL}&coupon=FIRSTGFT`,
    sourceLabel: 'Official GOAT Funded Trader current discount-code page',
    sourceNote: 'Official GOAT Funded Trader deal page checked on 2026-07-13: FIRSTGFT is listed as a welcome offer worth up to 50% off for new customers. The final reduction depends on the eligible plan.',
    consumerVerdict:
      'The simpler GOAT offer for a first purchase. It is easier to understand than BOGO40, but the words "up to" mean the exact reduction must be checked on the chosen plan.',
    caveats: ['New customers only', 'Exact reduction varies by eligible plan', 'One promo code per purchase'],
    bestFor: ['new customer', 'evaluation', 'instant funding', 'strong discount'],
    commercialHook: 'A straightforward first-purchase offer with an official code and a visible eligibility limit.',
    checkoutTip: 'Compare FIRSTGFT with BOGO40 and keep the option that produces the better immediate price for your plan.',
  },
  {
    slug: 'fundednext',
    label: 'Official first-CFD-account offer',
    title: 'NEW25: 25% off an eligible first FundedNext CFD account',
    code: 'NEW25',
    value: '25%',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Current English help article checked on 13 July 2026; no end date displayed.',
    eligibility: 'First FundedNext CFD purchase, one account only, Stellar plans up to $50,000; resets and add-ons excluded.',
    sourceUrl: 'https://help.fundednext.com/en/articles/15450535-do-you-have-any-ongoing-offers-or-promotions-for-new-fundednext-cfd-users',
    sourceLabel: 'Official FundedNext current-offers help article',
    sourceNote: 'Official help article checked on 2026-07-13: NEW25 gives 25% off one first CFD account on eligible Stellar plans up to $50K. Existing purchasers, $100K/$200K sizes, resets and paid add-ons are excluded.',
    consumerVerdict:
      'A now-confirmed offer with unusually precise eligibility. It is relevant for a genuine first CFD purchase, not for an existing user, a large account or a reset.',
    caveats: ['New CFD purchaser only', 'Maximum eligible account size is $50K', 'One account; resets and add-ons excluded'],
    bestFor: ['new customer', 'CFD', 'Stellar', 'direct discount'],
    commercialHook: 'A confirmed 25% reduction with clear account-size and customer-status limits.',
    urgency: 'Official help article checked 13 July 2026',
    checkoutTip: 'Confirm your account is at most $50K and that NEW25 reduces the base registration fee before paying.',
    featured: true,
    heroRank: 5,
  },
  {
    slug: 'apex-trader-funding',
    label: 'Official futures mega deal',
    title: 'SAVENOW: up to 90% OFF Any Size Evals',
    code: 'SAVENOW',
    value: '90%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Sale-period offer; the public coupon page remained live on 13 July 2026.',
    eligibility: 'New evaluation signups only; resets, existing billing and PA activation fees excluded.',
    sourceUrl: 'https://apextraderfunding.com/coupon-code/',
    sourceLabel: 'Official Apex Trader Funding coupon page',
    sourceNote: 'Official coupon page checked on 2026-07-13: SAVENOW is advertised for up to 90% off Any Size Evals. It cannot be applied to resets, existing accounts or PA activation fees.',
    consumerVerdict:
      'Very strong futures discount, but PropRadar keeps a cautious reading: verify EOD drawdown, consistency, payout rules and fees after passing.',
    caveats: ['New evaluations only', 'Firm classified as watchlist', 'No discount on resets or PA activation fees'],
    bestFor: ['futures', 'scalping', 'day trading', 'strong discount'],
    commercialHook: 'The most spectacular futures deal right now: ideal for clicks, but it must be framed by risk warnings.',
    urgency: 'Official coupon page live on 13 July 2026',
    checkoutTip: 'Confirm SAVENOW changes the evaluation price, then review recurring and PA-stage fees separately.',
    featured: true,
    heroRank: 1,
  },
  {
    slug: 'take-profit-trader',
    label: 'Official futures offer',
    title: 'NOFEE40: 40% lifetime test discount and no PRO activation fee',
    code: 'NOFEE40',
    value: '40%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Limited-time promotion; no fixed public end date displayed.',
    eligibility: 'New Take Profit Trader test accounts while the promotion remains live.',
    sourceUrl: 'https://try.takeprofittrader.com/futures-traders-tabgoogle-0725',
    sourceLabel: 'Official Take Profit Trader NOFEE40 offer page',
    sourceNote: 'Official Take Profit Trader page checked on 2026-07-13: NOFEE40 provides a 40% lifetime discount on new test accounts and waives the PRO activation fee while the promotion is live.',
    consumerVerdict:
      'Interesting futures offer for traders who want fast payout, with extra attention to buffer, PRO fees and withdrawal conditions.',
    caveats: ['Limited-time offer', 'Futures only', 'Confirm both the test discount and activation-fee waiver in the order terms'],
    bestFor: ['futures', 'day trading', 'fast payout'],
    commercialHook: 'A currently confirmed futures discount with a meaningful activation-fee benefit, not just a lower first invoice.',
    urgency: 'Official offer page verified 13 July 2026',
    checkoutTip: 'Save the promotion terms showing the lifetime discount and no PRO activation fee before paying.',
  },
  {
    slug: 'myfundedfutures',
    label: 'Official futures mega deal',
    title: '300K: 50% off an eligible Rapid, Pro or Builder evaluation',
    code: '300K',
    value: '50%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Official coupon page displayed a live countdown on 13 July 2026.',
    eligibility: 'New MFFU users; eligible Rapid, Pro or Builder evaluations; maximum two uses per user.',
    sourceUrl: 'https://myfundedfutures.com/coupons',
    sourceLabel: 'Official MyFundedFutures coupon page',
    sourceNote: 'Official coupon page checked on 2026-07-13: code 300K gives new MFFU users 50% off eligible Rapid, Pro or Builder evaluations and is limited to two uses per user.',
    consumerVerdict:
      'A broad new-user futures discount across three MFFU models. Compare the actual Rapid, Pro and Builder rules before treating the shared 50% headline as equivalent value.',
    caveats: ['New MFFU users only', 'Rapid, Pro or Builder evaluations', 'Maximum two uses per user'],
    bestFor: ['futures', 'new customer', 'Rapid', 'Pro', 'Builder'],
    commercialHook: 'A strong new-user discount across three programs, with the exact eligibility and use limit visible.',
    urgency: 'Official live countdown checked 13 July 2026',
    checkoutTip: 'Use 300K and confirm the selected Rapid, Pro or Builder evaluation subtotal falls by 50% before paying.',
    featured: true,
    heroRank: 4,
  },
  {
    slug: 'myfundedfutures',
    label: 'Official lifetime Rapid discount',
    title: 'RAPID: 20% off Rapid evaluations and resets',
    code: 'RAPID',
    value: '20%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Labelled as a lifetime promotion on the official coupon page.',
    eligibility: 'Rapid evaluations and resets; final eligible sizes must be confirmed in the cart.',
    sourceUrl: 'https://myfundedfutures.com/coupons',
    sourceLabel: 'Official MyFundedFutures coupon page',
    sourceNote: 'Official coupon page checked on 2026-07-13: RAPID is listed as a lifetime promotion with 20% off Rapid evaluations and 20% off resets.',
    consumerVerdict:
      'Less spectacular than the Builder code, but potentially more useful for a trader who actually wants the Rapid payout model and expects to use a reset.',
    caveats: ['Rapid plan only', 'Plan rules matter more than the discount', 'Confirm reset pricing before relying on the lifetime label'],
    bestFor: ['futures', 'Rapid plan', 'resets', 'daily payouts'],
    commercialHook: 'A durable plan-specific discount rather than a short countdown sale.',
    checkoutTip: 'Compare the discounted Rapid total and rules against Builder before selecting the larger headline discount.',
  },
  {
    slug: 'funderpro',
    label: 'Official Pro launch offer',
    title: '15% off the first FunderPro Pro Challenge, no code needed',
    code: 'No code',
    value: '15%',
    category: 'official-discount',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Limited-time launch offer; no fixed end date displayed.',
    eligibility: 'First Pro Challenge purchase; automatic discount on the eligible offer.',
    sourceUrl: 'https://funderpro.com/pro-challenge/',
    sourceLabel: 'Official FunderPro Pro Challenge launch page',
    sourceNote: 'Official Pro Challenge page checked on 2026-07-13: the first Pro Challenge is advertised at 15% off for a limited time with no code required.',
    consumerVerdict:
      'A cleaner FunderPro offer than an unconfirmed coupon because the product page states both the percentage and the no-code mechanism.',
    caveats: ['First Pro Challenge only', 'Limited-time wording without a fixed date', 'Choose daily or weekly reward rules before purchase'],
    bestFor: ['FunderPro Pro', 'daily rewards', 'weekly rewards', 'automatic discount'],
    commercialHook: 'An automatic official discount attached to a clearly named program.',
    checkoutTip: 'Confirm the 15% reduction appears automatically and compare daily 60% versus weekly 90% reward options.',
  },
  {
    slug: 'funderpro',
    label: 'Official instant-program entry price',
    title: 'Instant Program currently advertised from $79',
    code: 'No code',
    value: '$79+',
    category: 'price-opportunity',
    proofLevel: 'Official',
    availability: 'Official price',
    validity: 'Official site price checked on 13 July 2026; account configuration can change it.',
    eligibility: 'Smallest eligible Instant configuration; larger sizes and options cost more.',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'Official FunderPro site + PropRadar affiliate link',
    sourceNote: 'Official site checked on 2026-07-13: Instant Program starts from $79, with news trading and an advertised first reward threshold of $100. This is a starting price, not a percentage discount.',
    consumerVerdict:
      'Useful as a price benchmark for instant access, but the selected drawdown, account size and payout conditions determine whether it is actually cheaper.',
    caveats: ['Starting price only', 'Conditions vary by account size', 'Affiliate link has no impact on the score'],
    bestFor: ['instant funding', 'budget', 'news trading'],
    commercialHook: 'A verified low entry ticket without pretending it is a temporary coupon.',
    checkoutTip: 'Compare the $79 configuration with its drawdown and payout limits before moving to a larger Instant account.',
  },
  {
    slug: 'funderpro',
    label: 'Official free add-on code',
    title: 'NOMINDAYS: free No Minimum Trading Days add-on',
    code: 'NOMINDAYS',
    value: 'Free add-on',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Official campaign article remains public; confirm the add-on reaches $0 at checkout.',
    eligibility: 'Classic Challenges only; select the No Minimum Trading Days add-on before applying the code.',
    sourceUrl: 'https://funderpro.com/blog/how-to-claim-the-nomindays-discount-on-funderpro/',
    sourceLabel: 'Official FunderPro NOMINDAYS instructions',
    sourceNote: 'Official instructions checked on 2026-07-13: NOMINDAYS makes the No Minimum Trading Days add-on free on eligible Classic Challenges. FunderPro recommends selecting the add-on before applying the code.',
    consumerVerdict:
      'This changes a rule-related add-on rather than the base challenge price. It is valuable only if minimum trading days would otherwise affect the selected Classic plan.',
    caveats: ['Classic Challenge only', 'Add-on must display as free', 'Does not remove other consistency or payout requirements'],
    bestFor: ['Classic Challenge', 'no minimum days', 'flexibility', 'free add-on'],
    commercialHook: 'A useful rule-related benefit with exact official redemption instructions.',
    checkoutTip: 'Select the No Minimum Trading Days add-on first, apply NOMINDAYS, and verify its price becomes zero.',
  },
  {
    slug: 'funderpro',
    label: 'Official 200K campaign',
    title: 'AWARD200: $200 off a qualifying $200K Classic Challenge',
    code: 'AWARD200',
    value: '$200',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Campaign page remains live; terms say availability and timelines may change.',
    eligibility: '$200K Classic Challenge; the free plaque requires KYC plus funding or a reward on that same account.',
    sourceUrl: 'https://funderpro.com/funded-award-campaign/',
    sourceLabel: 'Official FunderPro Funded Award campaign',
    sourceNote: 'Official campaign checked on 2026-07-13: AWARD200 gives a $200 voucher toward a $200K Classic Challenge. The advertised free plaque is conditional on KYC and becoming funded or claiming a reward on that account.',
    consumerVerdict:
      'A concrete high-account discount, but it should not push a trader into a $200K purchase that does not fit the strategy or budget.',
    caveats: ['$200K Classic only', 'Plaque benefit is conditional', 'Campaign availability can change'],
    bestFor: ['$200K account', 'Classic Challenge', 'fixed-dollar discount'],
    commercialHook: 'A verified fixed-dollar discount for a narrowly defined large account.',
    checkoutTip: 'Apply AWARD200 only to the qualifying $200K Classic cart and judge the purchase without assigning value to the plaque.',
  },
  {
    slug: 'the5ers',
    label: 'Official low entry price',
    title: 'Hyper Growth 5K currently shown with a $74 one-time fee',
    code: 'No code',
    value: '$74',
    category: 'price-opportunity',
    proofLevel: 'Official',
    availability: 'Official price',
    validity: 'Official Hyper Growth price checked on 13 July 2026.',
    eligibility: 'Displayed 5K Hyper Growth configuration; currency, region and program selection can change the final price.',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'Official The5ers Hyper Growth page + PropRadar affiliate link',
    sourceNote: 'Official Hyper Growth page checked on 2026-07-13: the 5K one-step configuration shows a $74 one-time fee. The promotions page still displayed an offer that expired 1 June 2026, so no separate public sale is claimed here.',
    consumerVerdict:
      'A current entry-price benchmark for an established firm, not a temporary discount. Compare the 10% target, 6% stop-out and program rules before paying.',
    caveats: ['Not a percentage discount', '5K Hyper Growth configuration', 'Affiliate link has no impact on the score'],
    bestFor: ['careful trader', 'swing', 'low ticket', 'Hyper Growth'],
    commercialHook: "A verified low entry price without recycling The5ers' expired June promotion.",
    checkoutTip: 'Confirm the $74 fee in your currency and compare Hyper Growth with High Stakes and Bootcamp rules.',
  },
  {
    slug: 'the5ers',
    label: 'Transparent partner code',
    title: 'PropRadar The5ers partner code to test at checkout',
    code: THE5ERS_PROMO_CODE,
    value: 'Code',
    category: 'affiliate',
    proofLevel: 'PropRadar affiliate',
    availability: 'Verify at checkout',
    validity: 'No public percentage or end date confirmed on 13 July 2026.',
    eligibility: 'Depends on the selected The5ers program and the live checkout response.',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'The5ers PropRadar affiliate link',
    sourceNote: 'Partner code 1EIJ6PO remains available for checkout testing, but PropRadar found no current public percentage tied to it on 2026-07-13. The public promotions page still showed a 15% offer that expired on 1 June 2026.',
    consumerVerdict:
      'Use only as a checkout test. The current $74 Hyper Growth price is verified; a separate discount from this partner code is not guaranteed.',
    caveats: ['No confirmed public percentage', 'Verify final subtotal before payment', 'Affiliate link has no impact on the score'],
    bestFor: ['The5ers', 'partner checkout', 'careful trader'],
    commercialHook: 'Commercial relationship kept visible without presenting an unverified percentage as fact.',
    checkoutTip: 'Try 1EIJ6PO and proceed only if the order summary shows a real reduction.',
  },
  {
    slug: 'funderpro',
    label: 'Transparent partner code',
    title: 'PropRadar FunderPro partner code to test at checkout',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    category: 'affiliate',
    proofLevel: 'PropRadar affiliate',
    availability: 'Verify at checkout',
    validity: 'No public percentage or fixed expiry confirmed on 13 July 2026.',
    eligibility: 'Depends on the selected FunderPro campaign and live checkout response.',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'FunderPro PropRadar affiliate link',
    sourceNote: 'PropRadar affiliate code remains a checkout test. FunderPro official help says partner and campaign codes are time-sensitive and disabled after expiry; no public percentage for PROPRADAR was confirmed on 2026-07-13.',
    consumerVerdict:
      'Prefer the confirmed 15% Pro offer, NOMINDAYS or AWARD200 when eligible. Use PROPRADAR only if it produces a visible checkout benefit.',
    caveats: ['No confirmed public percentage', 'Campaign codes can expire', 'Affiliate link has no impact on the score'],
    bestFor: ['FunderPro', 'partner checkout', 'affiliate disclosure'],
    commercialHook: 'The commercial code stays visible, but below offers whose benefit is officially documented.',
    checkoutTip: 'Compare PROPRADAR with the official plan-specific offer and keep whichever valid option lowers the real total.',
  },
];

function proofWeight(proofLevel: PromoProofLevel) {
  if (proofLevel === 'Official') return 28;
  if (proofLevel === 'PropRadar affiliate') return 14;
  if (proofLevel === 'Good deal without code') return 12;
  return 8;
}

function availabilityWeight(availability: PromoAvailability) {
  if (availability === 'Active official offer') return 10;
  if (availability === 'Official price') return 4;
  return -8;
}

function valueWeight(deal: PromoDeal) {
  const numeric = Number(deal.value.match(/\d+/)?.[0] ?? 0);
  if (deal.category === 'price-opportunity') {
    if (numeric <= 50) return 18;
    if (numeric <= 80) return 14;
    if (numeric <= 100) return 10;
    return 6;
  }
  if (/^\$/.test(deal.value)) return numeric >= 200 ? 20 : 12;
  if (/free/i.test(deal.value)) return 14;
  if (numeric >= 40) return 28;
  if (numeric >= 25) return 20;
  if (numeric > 0) return 10;
  if (/code/i.test(deal.value)) return 8;
  return 4;
}

export function promoDealScore(deal: PromoDeal, firm?: PropFirm) {
  const targetFirm = firm ?? getFirmBySlug(deal.slug);
  const firmScore = targetFirm ? Math.round(targetFirm.score * 0.32) : 12;
  const payoutPenalty = targetFirm ? Math.round(targetFirm.reviewSignals.payoutRiskScore * 0.18) : 8;
  const statusPenalty = targetFirm && /surveiller/i.test(targetFirm.status) ? 6 : 0;
  const featuredBoost = deal.featured ? 6 : 0;

  return Math.max(0, Math.min(100, proofWeight(deal.proofLevel) + availabilityWeight(deal.availability) + valueWeight(deal) + firmScore + featuredBoost - payoutPenalty - statusPenalty));
}

export function promoDealWithFirm(deal: PromoDeal) {
  const firm = getFirmBySlug(deal.slug);
  const sourceCount = firm ? firm.regulatoryAudit.sources.length || firm.sources.length : 0;

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
          auditStatus: firm.auditStatus,
          legalVerified: firm.legalVerified,
          regulatoryRisk: firm.regulatoryAudit.riskLevel,
          legalSourceCount: sourceCount,
          sourceDepth:
            sourceCount >= 5
              ? 'Deep sources'
              : sourceCount >= 3
                ? 'Usable sources'
                : sourceCount >= 1
                  ? 'Thin sources'
                  : 'No sources',
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
    .filter((deal) => deal.featured && deal.availability === 'Active official offer')
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
    question: 'Why are some offers marked Verify at checkout?',
    answer:
      'Because prop firm codes change quickly and partner codes do not always have a public percentage. PropRadar separates documented official offers from codes whose real benefit must appear in the checkout subtotal.',
  },
];
