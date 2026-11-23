import {
  PARTNER_OFFERS,
  FTMO_AFFILIATE_URL,
  BLUE_GUARDIAN_AFFILIATE_URL,
  BLUE_GUARDIAN_PROMO_CODE,
  E8_AFFILIATE_URL,
  FXIFY_AFFILIATE_URL,
  FXIFY_PROMO_CODE,
  FUNDERPRO_AFFILIATE_URL,
  GOAT_FUNDED_TRADER_AFFILIATE_URL,
  ONEFUNDED_PROMO_CODE,
  UPCOMERS_AFFILIATE_URL,
  UPCOMERS_PROMO_CODE,
  PROPRADAR_PROMO_CODE,
  THE5ERS_AFFILIATE_URL,
  THE5ERS_PROMO_CODE,
  getFirmBySlug,
  propFirms,
  type PropFirm,
} from './propFirms';
import { isProgramPromotionCurrent, programPromotions } from './programPromotions';

export const PROMO_REVIEW_DATE = '2026-11-23';

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
  /** Source-checked seasonal offer, never an editorial firm rating. */
  blackFriday?: boolean;
  /** Exact sourced before/after price for the named challenge; never extrapolate to other plans. */
  priceExample?: { plan: string; accountSize: number; currency: 'USD' | 'EUR' | 'GBP'; before: number; after: number; checkedOn: string; sourceUrl: string };
  /** Exact expiration, so a seasonal offer is not published after it ends. */
  expiresAt?: string;
  /**
   * Date of the review in which the code was no longer shown on the official
   * page. Such deals stay in the source for the record but are not published.
   */
  notSeenOn?: string;
};

const allPromoDeals: PromoDeal[] = [
  {
    slug: 'blue-guardian',
    label: 'Transparent partner code',
    title: 'PROPRADAR: Elite Futures 100K $330 → $247.50 (−25%)',
    priceExample: { plan: 'Elite Futures', accountSize: 100000, currency: 'USD', before: 330, after: 247.5, checkedOn: '2026-11-15', sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL },
    code: BLUE_GUARDIAN_PROMO_CODE,
    value: '25%',
    category: 'affiliate',
    proofLevel: 'PropRadar affiliate',
    availability: 'Verify at checkout',
    validity: 'Verified on the official checkout on 15 November 2026; no end date confirmed.',
    eligibility: '25% verified on Elite 100K Futures; confirm eligibility and the discount for your selected plan. Add-ons and bundles have their own conditions.',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Official Blue Guardian checkout + PropRadar affiliate link',
    sourceNote: 'PropRadar partner code PROPRADAR checked on 2026-11-15: Elite 100K Futures subtotal $330, coupon reduction $82.50, final total $247.50. The public site also displays BG25 (25% across CFD and Futures accounts). No purchase was made.',
    consumerVerdict: 'Use the PropRadar partner code and check the final price for your plan. The 25% reduction was verified on an Elite 100K Futures account.',
    caveats: ['Eligibility depends on the selected plan', 'Add-ons and bundles have separate conditions', 'Affiliate link and code have no impact on the score'],
    bestFor: ['Blue Guardian', 'futures', 'partner code'],
    checkoutTip: 'Apply PROPRADAR and confirm the discounted subtotal before paying.',
  },
  {
    slug: 'fxify',
    label: 'Transparent partner code',
    title: 'FXIFY partner code FXIFY0EVDNU (25% on all programs according to FXIFY)',
    code: FXIFY_PROMO_CODE,
    value: '25%',
    category: 'affiliate',
    proofLevel: 'PropRadar affiliate',
    availability: 'Verify at checkout',
    validity: 'Code issued to PropRadar by FXIFY, received on 14 November 2026; no end date stated.',
    eligibility: 'All FXIFY programs, according to FXIFY.',
    sourceUrl: FXIFY_AFFILIATE_URL,
    sourceLabel: 'FXIFY checkout + PropRadar affiliate link',
    sourceNote: 'FXIFY gave PropRadar the code FXIFY0EVDNU (25% off all programs). On 2026-11-14 the official home page showed FUNDED25 (25% off + 2 free add-ons, excl. Instant Lite, expires 24 November 2026) and ONESTEP35 (35% off One Phase, new traders, expires 31 December 2026).',
    consumerVerdict: 'Same percentage as the public FUNDED25 sale, which adds 2 free add-ons until 24 November 2026; new traders buying One Phase get more with ONESTEP35. Compare at checkout.',
    caveats: ['FUNDED25 adds 2 free add-ons until 24 November 2026', 'ONESTEP35: 35% on One Phase for new traders', 'Partner code: PropRadar may receive a commission; no impact on the score'],
    bestFor: ['FXIFY', 'forex', 'all programs'],
    checkoutTip: 'Try FXIFY0EVDNU, FUNDED25 and ONESTEP35 on your cart and keep the lowest total.',
  },
  {
    slug: 'e8-markets',
    label: 'Official code + affiliate',
    title: 'E8: 100K E8 One $488 → $415 (code E8, first order)',
    priceExample: { plan: 'E8 One', accountSize: 100000, currency: 'USD', before: 488, after: 415, checkedOn: '2026-11-13', sourceUrl: E8_AFFILIATE_URL },
    code: 'E8',
    value: '15%',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Shown on the official E8 page on 13 November 2026; no end date stated.',
    eligibility: 'First order only, according to the official page.',
    sourceUrl: E8_AFFILIATE_URL,
    sourceLabel: 'Official E8 Markets page + PropRadar affiliate link',
    sourceNote: 'Official page read on 2026-11-13 through the PropRadar link: "Save with code E8" and 15% off listed prices (for example $100K E8 One, $488 to $415).',
    consumerVerdict: 'A public first-order code shown by E8 itself. Check that the order summary drops by 15% before paying.',
    caveats: ['First order only', 'Confirm the subtotal before payment', 'Affiliate link has no impact on the score'],
    bestFor: ['E8 Markets', 'first order', 'multi-asset'],
    checkoutTip: 'Apply E8 at checkout and compare the discounted price with the program rules (drawdown, consistency).',
  },
  {
    slug: 'upcomers',
    label: 'Transparent partner code',
    title: 'Upcomers 100K $1,090 → $109 (public discount also available)',
    priceExample: { plan: '100K challenge', accountSize: 100000, currency: 'USD', before: 1090, after: 109, checkedOn: '2026-11-14', sourceUrl: UPCOMERS_AFFILIATE_URL },
    code: UPCOMERS_PROMO_CODE,
    value: 'Code',
    category: 'affiliate',
    proofLevel: 'PropRadar affiliate',
    availability: 'Verify at checkout',
    validity: 'Code issued to PropRadar by Upcomers, received on 14 November 2026; no end date or percentage stated.',
    eligibility: 'Upcomers challenges, applied through the PropRadar link.',
    sourceUrl: UPCOMERS_AFFILIATE_URL,
    sourceLabel: 'Upcomers official site + PropRadar affiliate link',
    sourceNote: 'On 2026-11-14 the official site showed "up to 93% off" with or without the code. With kkscxhro applied ("KKSCXHRO appliqué"), the $100K challenge showed $109 instead of $1,090, and the $5K challenge $14.90.',
    consumerVerdict: 'The link applies the code automatically, but the big discount is also shown without it. Upcomers\' Trustpilot rating is withheld for a guideline breach and its accounts are simulated: read the firm file before buying.',
    caveats: ['"Up to 93% off" is also shown without the code', 'Trustpilot rating withheld for a guideline breach', 'Partner code: PropRadar may receive a commission; no impact on the score'],
    bestFor: ['Upcomers', 'futures', 'crypto'],
    checkoutTip: 'Open the link, check that "KKSCXHRO appliqué" shows, and compare the total with the public price.',
  },
  {
    slug: 'onefunded',
    label: 'Transparent partner code',
    title: 'OneFunded partner code PROPRADARTECH (25% according to OneFunded)',
    code: ONEFUNDED_PROMO_CODE,
    value: '25%',
    category: 'affiliate',
    proofLevel: 'PropRadar affiliate',
    availability: 'Verify at checkout',
    validity: 'Code issued to PropRadar by OneFunded on 12 November 2026; no end date stated.',
    eligibility: 'All OneFunded challenges, according to OneFunded.',
    sourceUrl: 'https://onefunded.com/',
    sourceLabel: 'OneFunded official site',
    sourceNote: 'OneFunded told PropRadar on 2026-11-12 that PROPRADARTECH gives 25% off all challenges. On 2026-11-13 the official site itself showed NOV20 (20%) and AWARD (30%).',
    consumerVerdict: 'A partner code, not the best public discount: OneFunded showed AWARD (30%) on its own site on 13 November 2026. Its Trustpilot rating is withheld for a guideline breach.',
    caveats: ['AWARD (30%) was shown on the official site on 13 November 2026', 'Trustpilot rating withheld for a guideline breach', 'Partner code: PropRadar may receive a commission; no impact on the score'],
    bestFor: ['OneFunded', 'forex', '1-step'],
    checkoutTip: 'Compare PROPRADARTECH with the public codes at checkout and keep the lowest subtotal.',
  },
  {
    slug: 'blue-guardian',
    label: 'Official checkout deal + affiliate',
    title: 'LAUNCH: 40% off the selected Blue Guardian evaluation',
    notSeenOn: '2026-10-27',
    code: 'LAUNCH',
    value: '40%',
    category: 'official-discount',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Not shown on the official checkout on 27 October 2026; last confirmed on 13 July 2026.',
    eligibility: 'Selected Blue Guardian evaluation carts; confirm the discounted subtotal before payment.',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Official Blue Guardian checkout + PropRadar affiliate link',
    sourceNote: 'Official checkout checked on 2026-07-13: SAVE 40% WITH CODE LAUNCH. Rechecked on 2026-10-27: the checkout banner no longer mentions LAUNCH and shows a different limited offer, so LAUNCH is no longer presented as active. PropRadar affiliate link remains disclosed.',
    consumerVerdict:
      'LAUNCH was a verified Blue Guardian discount in July but was no longer shown on 27 October 2026. Any code must visibly change the subtotal before payment. Add-ons and multiple-account bundles change the real final cost.',
    caveats: ['Confirm LAUNCH is applied to the selected cart', 'Add-ons are priced separately', 'Affiliate link has no impact on the score'],
    bestFor: ['strong discount', 'instant funding', 'forex', 'futures'],
    commercialHook: 'A clear 40% checkout offer, now tied to the exact public code instead of a broad 40-50% claim.',
    urgency: 'Not reconfirmed on 27 October 2026',
    checkoutTip: 'Try LAUNCH only if the subtotal visibly drops, then compare the discounted base price with paid payout and profit-split add-ons.',
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
    validity: 'Limited-time offer; the official help article was updated on 5 October 2026 and shows no end date (checked 27 October 2026).',
    eligibility: 'Eligible account purchase; the free account is claimable only after the first successful payout and a support request.',
    sourceUrl: `${GOAT_FUNDED_TRADER_AFFILIATE_URL}&coupon=BOGO40`,
    sourceLabel: 'Official GOAT Funded Trader BOGO40 checkout and help article',
    sourceNote: 'Official help article rechecked on 2026-10-27 and 2026-11-09 (last updated 2026-10-05): BOGO40 gives 40% off at checkout. The same-size free account is not issued at purchase; it is issued only after the first payout and a support request.',
    consumerVerdict:
      'The headline is attractive, but this is not an immediate buy-one-get-one deal. Treat the second account as a conditional reward that depends on reaching and receiving a first payout.',
    caveats: ['Free account only after the first successful payout', 'Support claim required', 'One promo code per purchase'],
    bestFor: ['strong discount', 'evaluation', 'instant funding', 'second-account reward'],
    commercialHook: 'A strong 40% discount with a conditional second account, presented with the payout requirement up front.',
    urgency: 'Official help article rechecked 27 October 2026',
    checkoutTip: 'Use BOGO40 only after confirming the selected model is eligible and the 40% reduction appears in the order summary.',
    featured: true,
    heroRank: 3,
  },
  {
    slug: 'goat-funded-trader',
    label: 'Official new-customer offer',
    title: 'FIRSTGFT: 50% off a first GOAT Funded Trader account',
    code: 'FIRSTGFT',
    value: '50%',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Listed on the official deal page on 27 October 2026 as a limited-time offer; no end date shown.',
    eligibility: 'New customers on eligible plans; only one promotion can be used per purchase.',
    sourceUrl: `${GOAT_FUNDED_TRADER_AFFILIATE_URL}&coupon=FIRSTGFT`,
    sourceLabel: 'Official GOAT Funded Trader current discount-code page',
    sourceNote: 'Official GOAT Funded Trader home page checked on 2026-11-14: "50% OFF fOR NEW CUSTOMERS", "an exclusive 50% OFF your first account", limited time, no end date. Also seen on 2026-10-27, 2026-11-06 and 2026-11-09.',
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
    notSeenOn: '2026-10-27',
    code: 'NEW25',
    value: '25%',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Last confirmed on 13 July 2026; on 27 October 2026 the help center Ongoing Offers list no longer showed this article.',
    eligibility: 'First FundedNext CFD purchase, one account only, Stellar plans up to $50,000; resets and add-ons excluded.',
    sourceUrl: 'https://help.fundednext.com/en/articles/15450535-do-you-have-any-ongoing-offers-or-promotions-for-new-fundednext-cfd-users',
    sourceLabel: 'Official FundedNext current-offers help article',
    sourceNote: 'Official help article checked on 2026-07-13: NEW25 gives 25% off one first CFD account on eligible Stellar plans up to $50K. Existing purchasers, $100K/$200K sizes, resets and paid add-ons are excluded. On 2026-10-27 the article could not be opened and the Ongoing Offers collection listed other offers only, so NEW25 is no longer presented as active.',
    consumerVerdict:
      'An offer with unusually precise eligibility, last confirmed in July 2026. It is relevant for a genuine first CFD purchase, not for an existing user, a large account or a reset.',
    caveats: ['New CFD purchaser only', 'Maximum eligible account size is $50K', 'One account; resets and add-ons excluded'],
    bestFor: ['new customer', 'CFD', 'Stellar', 'direct discount'],
    commercialHook: 'A confirmed 25% reduction with clear account-size and customer-status limits.',
    urgency: 'Not reconfirmed on 27 October 2026',
    checkoutTip: 'Confirm your account is at most $50K and that NEW25 reduces the base registration fee before paying.',
    featured: true,
    heroRank: 5,
  },
  {
    slug: 'apex-trader-funding',
    label: 'Official futures mega deal',
    title: 'SAVENOW: 80% off evaluations for new signups',
    code: 'SAVENOW',
    value: '80%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Official coupon page checked on 14 November 2026; no end date shown.',
    eligibility: 'New evaluation signups only; resets, existing billing and PA activation fees excluded.',
    sourceUrl: 'https://apextraderfunding.com/coupon-code/',
    sourceLabel: 'Official Apex Trader Funding coupon page',
    sourceNote: 'Official coupon page checked on 2026-11-14: "Save 80% use COUPON CODE \"SAVENOW\" for 80% Off Evals!", new account signups only; "Coupon codes CANNOT be applied to resets or PA activation fees." On 2026-10-27 and 2026-11-06 the same code was advertised at 90%.',
    consumerVerdict:
      'Very strong futures discount, but PropRadar keeps a cautious reading: verify EOD drawdown, consistency, payout rules and fees after passing.',
    caveats: ['New evaluations only', 'Firm classified as watchlist', 'No discount on resets or PA activation fees'],
    bestFor: ['futures', 'scalping', 'day trading', 'strong discount'],
    commercialHook: 'The largest futures discount on the official coupon page right now; read the payout and legal signals before using it.',
    urgency: 'Official coupon page checked 14 November 2026 (now 80%, was 90%)',
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
    validity: 'Home page banner on 14 November 2026: "Get 40% Off For Life + Never Pay An Activation Fee!"; limited-time promotion, no end date shown.',
    eligibility: 'New Take Profit Trader test accounts while the promotion remains live.',
    sourceUrl: 'https://takeprofittrader.com/',
    sourceLabel: 'Official Take Profit Trader NOFEE40 offer page',
    sourceNote: 'Official Take Profit Trader home page checked on 2026-11-14: "Get 40% Off For Life + Never Pay An Activation Fee!" "Use Code: NOFEE40"; the offer page says "40% lifetime discount on all new test accounts", "Limited time promotion". It replaced NOFEE50 (50%, seen 6–9 November 2026). Also seen on 2026-10-27.',
    consumerVerdict:
      'Interesting futures offer for traders who want fast payout, with extra attention to buffer, PRO fees and withdrawal conditions.',
    caveats: ['Limited-time offer', 'Futures only', 'Confirm both the test discount and activation-fee waiver in the order terms'],
    bestFor: ['futures', 'day trading', 'fast payout'],
    commercialHook: 'A currently confirmed futures discount with a meaningful activation-fee benefit, not just a lower first invoice.',
    urgency: 'Official home page checked 14 November 2026',
    checkoutTip: 'Save the promotion terms showing the lifetime discount and no PRO activation fee before paying.',
  },
  {
    slug: 'myfundedfutures',
    label: 'Official futures mega deal',
    title: '300K: 50% off an eligible Rapid, Pro or Builder evaluation',
    notSeenOn: '2026-10-27',
    code: '300K',
    value: '50%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No longer listed on the official coupon page on 27 October 2026; last confirmed on 13 July 2026.',
    eligibility: 'New MFFU users; eligible Rapid, Pro or Builder evaluations; maximum two uses per user.',
    sourceUrl: 'https://myfundedfutures.com/coupons',
    sourceLabel: 'Official MyFundedFutures coupon page',
    sourceNote: 'Official coupon page checked on 2026-07-13: code 300K gives new MFFU users 50% off eligible Rapid, Pro or Builder evaluations and is limited to two uses per user. Rechecked on 2026-10-27: 300K no longer appears on the coupon page.',
    consumerVerdict:
      'A broad new-user futures discount across three MFFU models. Compare the actual Rapid, Pro and Builder rules before treating the shared 50% headline as equivalent value.',
    caveats: ['New MFFU users only', 'Rapid, Pro or Builder evaluations', 'Maximum two uses per user'],
    bestFor: ['futures', 'new customer', 'Rapid', 'Pro', 'Builder'],
    commercialHook: 'A strong new-user discount across three programs, with the exact eligibility and use limit visible.',
    urgency: 'Not listed on 27 October 2026',
    checkoutTip: 'Use 300K and confirm the selected Rapid, Pro or Builder evaluation subtotal falls by 50% before paying.',
    featured: true,
    heroRank: 4,
  },
  {
    slug: 'myfundedfutures',
    label: 'Official lifetime Rapid discount',
    title: 'RAPID: 20% off Rapid evaluations and resets',
    notSeenOn: '2026-10-27',
    code: 'RAPID',
    value: '20%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Was labelled as a lifetime promotion on 13 July 2026, but no longer listed on the official coupon page on 27 October 2026.',
    eligibility: 'Rapid evaluations and resets; final eligible sizes must be confirmed in the cart.',
    sourceUrl: 'https://myfundedfutures.com/coupons',
    sourceLabel: 'Official MyFundedFutures coupon page',
    sourceNote: 'Official coupon page checked on 2026-07-13: RAPID was listed as a lifetime promotion with 20% off Rapid evaluations and resets. Rechecked on 2026-10-27: RAPID no longer appears as a code on that page.',
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
    sourceNote: 'Official Pro Challenge page rechecked on 2026-10-27, 2026-11-06 and 2026-11-09: "Get 15% off for a limited time", no code needed (the purchase links carry the promo automatically); no end date shown.',
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
    title: 'Instant Program advertised from $79 on 13 July 2026',
    code: 'No code',
    value: '$79+',
    category: 'price-opportunity',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Price last confirmed on 13 July 2026; not reconfirmed on 27 October 2026. Account configuration can change it.',
    eligibility: 'Smallest eligible Instant configuration; larger sizes and options cost more.',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'Official FunderPro site + PropRadar affiliate link',
    sourceNote: 'Official site checked on 2026-07-13 and 2026-11-09 (home page: Instant Program "Starts from $79.00"): Instant Program starts from $79, with news trading and an advertised first reward threshold of $100. This is a starting price, not a percentage discount.',
    consumerVerdict:
      'Useful as a price benchmark for instant access, but the selected drawdown, account size and payout conditions determine whether it is actually cheaper.',
    caveats: ['Starting price only', 'Conditions vary by account size', 'Affiliate link has no impact on the score'],
    bestFor: ['instant funding', 'budget', 'news trading'],
    commercialHook: 'A low entry ticket recorded in July 2026, not a temporary coupon; recheck the price before paying.',
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
    availability: 'Verify at checkout',
    validity: 'Last confirmed on 13 July 2026; the official instructions could not be reopened on 27 October 2026. Confirm the add-on reaches $0 at checkout.',
    eligibility: 'Classic Challenges only; select the No Minimum Trading Days add-on before applying the code.',
    sourceUrl: 'https://funderpro.com/blog/how-to-claim-the-nomindays-discount-on-funderpro/',
    sourceLabel: 'Official FunderPro NOMINDAYS instructions',
    sourceNote: 'Official instructions checked on 2026-07-13 and 2026-11-09 (article dated 28 April 2026, no end date): NOMINDAYS makes the No Minimum Trading Days add-on free on eligible Classic Challenges. FunderPro recommends selecting the add-on before applying the code.',
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
    validity: 'Campaign page still live on 27 October 2026, no dates shown; terms say availability and timelines may change.',
    eligibility: '$200K Classic Challenge; the free plaque requires KYC plus funding or a reward on that same account.',
    sourceUrl: 'https://funderpro.com/funded-award-campaign/',
    sourceLabel: 'Official FunderPro Funded Award campaign',
    sourceNote: 'Official campaign rechecked on 2026-10-27, 2026-11-06 and 2026-11-09: AWARD200 gives a $200 voucher toward a $200K Classic Challenge. The advertised free plaque is conditional on KYC and becoming funded or claiming a reward on that account.',
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
    title: 'Hyper Growth 5K shown with a $74 one-time fee on 13 July 2026',
    code: 'No code',
    value: '$74',
    category: 'price-opportunity',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Price confirmed on 13 July 2026; on 27 October 2026 the official pricing table did not clearly confirm the 5K Hyper Growth fee.',
    eligibility: 'Displayed 5K Hyper Growth configuration; currency, region and program selection can change the final price.',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'Official The5ers Hyper Growth page + PropRadar affiliate link',
    sourceNote: 'Official Hyper Growth page checked on 2026-07-13: the 5K one-step configuration shows a $74 one-time fee. The promotions page still displayed an offer that expired 1 June 2026, so no separate public sale is claimed here.',
    consumerVerdict:
      'A current entry-price benchmark for an established firm, not a temporary discount. Compare the 10% target, 6% stop-out and program rules before paying.',
    caveats: ['Not a percentage discount', '5K Hyper Growth configuration', 'Affiliate link has no impact on the score'],
    bestFor: ['careful trader', 'swing', 'low ticket', 'Hyper Growth'],
    commercialHook: "An entry-price benchmark recorded in July 2026, without recycling The5ers' expired June promotion.",
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
    validity: 'No public percentage or end date confirmed; the public coupons page still showed only an expired offer on 27 October 2026.',
    eligibility: 'Depends on the selected The5ers program and the live checkout response.',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'The5ers PropRadar affiliate link',
    sourceNote: 'Partner code 1EIJ6PO remains available for checkout testing, but PropRadar found no current public percentage tied to it on 2026-07-13. The public promotions page still showed a 15% offer that expired on 1 June 2026.',
    consumerVerdict:
      'Use only as a checkout test. The $74 Hyper Growth price was confirmed in July 2026; a separate discount from this partner code is not guaranteed.',
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
      'Prefer the confirmed 15% Pro offer or AWARD200 when eligible. Use PROPRADAR only if it produces a visible checkout benefit.',
    caveats: ['No confirmed public percentage', 'Campaign codes can expire', 'Affiliate link has no impact on the score'],
    bestFor: ['FunderPro', 'partner checkout', 'affiliate disclosure'],
    commercialHook: 'The commercial code stays visible, but below offers whose benefit is officially documented.',
    checkoutTip: 'Compare PROPRADAR with the official plan-specific offer and keep whichever valid option lowers the real total.',
  },
  {
    slug: 'myfundedfutures',
    label: 'Official lifetime code',
    title: 'CLUB: 40% off Rapid, Builder, Rapid EOD and Pro evaluations',
    code: 'CLUB',
    value: '40%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Labelled "Lifetime Promo" on the official coupon page (checked 28 October 2026).',
    eligibility: 'Rapid, Builder, Rapid EOD and Pro evaluations; the page lists unlimited uses.',
    sourceUrl: 'https://myfundedfutures.com/coupons',
    sourceLabel: 'Official MyFundedFutures coupon page',
    sourceNote: 'Official coupon page checked on 2026-10-28, 2026-11-06 and 2026-11-09: CLUB gives 40% off, "Lifetime Promo", works on Rapid, Builder, Rapid EOD and Pro, "Number of uses: Unlimited".',
    consumerVerdict:
      'A durable discount that is not limited to new customers. Compare the plan rules first: the same 40% does not make Rapid, Builder and Pro equivalent.',
    caveats: ['Evaluations only', 'Plan rules matter more than the discount', 'Confirm the subtotal falls by 40% before paying'],
    bestFor: ['futures', 'returning customer', 'Rapid', 'Builder', 'Pro'],
    commercialHook: 'A lifetime official code usable on four MFFU plans.',
    checkoutTip: 'Apply CLUB, then compare it with FIFTYOFF if this is your first MFFU evaluation.',
  },
  {
    slug: 'myfundedfutures',
    label: 'Official new-customer code',
    title: 'FIFTYOFF: 50% off a first MyFundedFutures evaluation',
    code: 'FIFTYOFF',
    value: '50%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Listed on the official coupon page on 28 October 2026; no end date shown.',
    eligibility: 'New customers only, one use per user; Rapid EOD, Rapid, Builder and Pro evaluations.',
    sourceUrl: 'https://myfundedfutures.com/coupons',
    sourceLabel: 'Official MyFundedFutures coupon page',
    sourceNote: 'Official coupon page checked on 2026-10-28, 2026-11-06 and 2026-11-09: FIFTYOFF gives 50% off evaluations, "New Customers Only: Yes", "One Per User: Yes", works on Rapid EOD, Rapid, Builder and Pro.',
    consumerVerdict:
      'The strongest MFFU code for a first evaluation. It can only be used once, so pick the plan whose rules you actually want before applying it.',
    caveats: ['New customers only', 'One use per user', 'Evaluations only'],
    bestFor: ['futures', 'new customer', 'Rapid', 'Builder', 'Pro'],
    commercialHook: 'Half price on a first futures evaluation, with the one-use limit stated up front.',
    checkoutTip: 'Use FIFTYOFF for the first evaluation and keep CLUB for later purchases.',
  },
  {
    slug: 'goat-funded-trader',
    notSeenOn: '2026-11-07',
    label: 'Official seasonal code',
    title: 'HALLOWEEN50: 50% off all GOAT Funded Trader accounts',
    code: 'HALLOWEEN50',
    value: '50%',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Seasonal Halloween offer listed on the official deal page on 28 October 2026; no end date shown.',
    eligibility: 'Listed as "50% OFF on all Accounts"; no further condition shown on the deal page.',
    sourceUrl: `${GOAT_FUNDED_TRADER_AFFILIATE_URL}&coupon=HALLOWEEN50`,
    sourceLabel: 'Official GOAT Funded Trader deal page + PropRadar affiliate link',
    sourceNote: 'Official GOAT Funded Trader deal page checked on 2026-10-28: HALLOWEEN50 is listed as 50% off all accounts. Seasonal code: expect it to end shortly after Halloween. PropRadar affiliate link remains disclosed.',
    consumerVerdict:
      'A strong but short-lived discount. The free-account condition of BOGO40 does not apply here; compare the immediate price of both before paying.',
    caveats: ['Seasonal code, likely to end soon', 'One promo code per purchase', 'Affiliate link has no impact on the score'],
    bestFor: ['strong discount', 'evaluation', 'instant funding'],
    commercialHook: 'A plain 50% Halloween discount on every GOAT account.',
    checkoutTip: 'Compare HALLOWEEN50 with FIRSTGFT and BOGO40 and keep the one that gives the lowest real total.',
  },
  {
    slug: 'blue-guardian',
    notSeenOn: '2026-11-06',
    label: 'Official seasonal checkout code',
    title: 'HALLOWEEN: 35% off at the Blue Guardian checkout',
    code: 'HALLOWEEN',
    value: '35%',
    category: 'official-discount',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Seasonal "Limited offer" banner on the official checkout on 28 October 2026; no end date shown.',
    eligibility: 'Shown on the official checkout without further conditions; confirm the discounted subtotal before payment.',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Official Blue Guardian checkout + PropRadar affiliate link',
    sourceNote: 'Official checkout checked on 2026-10-28: "LIMITED OFFER • 35% OFF", "SAVE 35% WITH CODE HALLOWEEN". It replaced the SPOOKY code seen on 2026-10-27. PropRadar affiliate link remains disclosed.',
    consumerVerdict:
      'A current Blue Guardian discount, but seasonal: the code changed twice in two weeks, so check that it still lowers the subtotal at checkout.',
    caveats: ['Seasonal code, likely to end soon', 'Add-ons are priced separately', 'Affiliate link has no impact on the score'],
    bestFor: ['strong discount', 'instant funding', 'forex', 'futures'],
    commercialHook: 'The code Blue Guardian shows at its own checkout today.',
    checkoutTip: 'Apply HALLOWEEN and confirm the 35% reduction before adding paid options.',
  },
  {
    slug: 'take-profit-trader',
    label: 'Official futures offer',
    title: 'NOFEE50: 50% lifetime test discount and no PRO activation fee',
    notSeenOn: '2026-11-14',
    code: 'NOFEE50',
    value: '50%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: '"Early Black Friday" promotion, "only available for a limited-time"; no end date shown on 7 November 2026.',
    eligibility: 'All new Take Profit Trader test accounts, any size, while the promotion remains live.',
    sourceUrl: 'https://try.takeprofittrader.com/futures-traders-nofee50-1026',
    sourceLabel: 'Official Take Profit Trader NOFEE50 offer page',
    sourceNote: 'Official Take Profit Trader offer page checked on 2026-11-06, 2026-11-07 and 2026-11-09: "a 50% lifetime discount on all new test accounts and never pay an activation fee with code NOFEE50"; "Only available for a limited-time". It replaced NOFEE40 (40%).',
    consumerVerdict:
      'A strong futures offer: the discount is described as lifetime on the test and the PRO activation fee is waived, which matters more than the first invoice alone.',
    caveats: ['Limited-time offer, no end date shown', 'Futures only', 'Confirm both the test discount and the activation-fee waiver in the order terms'],
    bestFor: ['futures', 'day trading', 'no activation fee'],
    commercialHook: 'A confirmed futures discount that also removes the PRO activation fee.',
    urgency: 'Official offer page checked 7 November 2026',
    checkoutTip: 'Save the promotion terms showing the lifetime discount and no PRO activation fee before paying.',
  },
  {
    slug: 'funderpro',
    label: 'Official November code',
    title: 'NOV20: 20% off all FunderPro challenges',
    notSeenOn: '2026-11-14',
    code: 'NOV20',
    value: '20%',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'November banner on the official home page on 6 and 7 November 2026; no end date shown.',
    eligibility: 'Listed as "20% OFF all Challenges"; no further condition shown on the banner.',
    sourceUrl: 'https://funderpro.com/',
    sourceLabel: 'Official FunderPro home page banner',
    sourceNote: 'Official FunderPro home page checked on 2026-11-06 and 2026-11-07: "Code NOV20: 20% OFF all Challenges", with a checkout link carrying promo=NOV20. PropRadar is a FunderPro affiliate; the code is FunderPro\'s own, not a PropRadar code.',
    consumerVerdict:
      'A simple, broad FunderPro discount. Compare it with the automatic 15% Pro offer and the PropRadar code: only one usually applies, so keep the lowest real total.',
    caveats: ['Seasonal code, likely to end with November', 'Usually not stackable with other codes', 'Affiliate relationship has no impact on the score'],
    bestFor: ['FunderPro Classic', 'FunderPro Pro', 'broad discount'],
    commercialHook: 'The code FunderPro shows on its own home page this month.',
    checkoutTip: 'Apply NOV20 and compare the total with the other FunderPro offers before paying.',
  },
  {
    slug: 'blue-guardian',
    label: 'Official November code',
    title: 'NOV30: 30% off at Blue Guardian',
    notSeenOn: '2026-11-14',
    code: 'NOV30',
    value: '30%',
    category: 'official-discount',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Shown on the official home page on 6 and 7 November 2026; no end date shown.',
    eligibility: '"Save 30% with code NOV30"; no further condition shown. Confirm the discounted subtotal before payment.',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Official Blue Guardian site + PropRadar affiliate link',
    sourceNote: 'Official Blue Guardian home page checked on 2026-11-06 and 2026-11-07: "Save 30% with code NOV30". Official checkout rechecked on 2026-11-09: "30% OFF • LIMITED OFFER", "SAVE 30% WITH CODE NOV30". It replaced the HALLOWEEN code (35%). PropRadar affiliate link remains disclosed.',
    consumerVerdict:
      'A current Blue Guardian discount, but seasonal: the code has changed several times in a month, so check that it still lowers the subtotal at checkout.',
    caveats: ['Seasonal code, likely to end with November', 'Add-ons are priced separately', 'Affiliate link has no impact on the score'],
    bestFor: ['strong discount', 'instant funding', 'forex', 'futures'],
    commercialHook: 'The code Blue Guardian shows on its own site today.',
    checkoutTip: 'Apply NOV30 and confirm the 30% reduction before adding paid options.',
  },
  {
    slug: 'blue-guardian',
    label: 'Official code',
    title: 'BG25: 25% off all Blue Guardian accounts',
    code: 'BG25',
    value: '25%',
    category: 'official-discount',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Shown on the official home page on 14 November 2026; no end date shown.',
    eligibility: '"25% OFF … All accounts | CFDs & Futures"; bundles of 2, 3 or 4 accounts show 35%, 40% and 45% off.',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Official Blue Guardian site + PropRadar affiliate link',
    sourceNote: 'Official Blue Guardian home page checked on 2026-11-14: "Save 25% with code BG25", all accounts, CFDs and futures; NOV30 no longer shown. PropRadar affiliate link remains disclosed.',
    consumerVerdict:
      'A broad Blue Guardian discount; the code changes often (HALLOWEEN, NOV30, now BG25), so check that it still lowers the subtotal at checkout.',
    caveats: ['Code changes often', 'Add-ons are priced separately', 'Affiliate link has no impact on the score'],
    bestFor: ['broad discount', 'forex', 'futures'],
    commercialHook: 'The code Blue Guardian shows on its own site today.',
    checkoutTip: 'Apply BG25 and confirm the 25% reduction before adding paid options.',
  },
  {
    slug: 'alpha-futures',
    label: 'Official November codes',
    title: 'ALPHA50 / ALPHA40: 50% off Advanced, Standard and Direct, 40% off Zero',
    code: 'ALPHA50',
    value: '50%',
    category: 'futures',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Official discount page: "1 Nov 2026 – 30 Nov 2026" (last updated 2 November 2026).',
    eligibility: 'ALPHA50 applies to Advanced, Standard and Direct accounts; ALPHA40 (40%) applies to Zero accounts. Evaluation fees only.',
    sourceUrl: 'https://alpha-futures.com/alpha-futures-discount-codes',
    sourceLabel: 'Official Alpha Futures discount-code page',
    sourceNote: 'Official page checked on 2026-11-14: ALPHA50, 50%, "Applies to Advanced, Standard and Direct"; ALPHA40, 40%, Zero accounts; valid 1–30 November 2026.',
    consumerVerdict: 'A dated, clearly scoped futures discount. Read the firm file first: Finance Magnates reported that pending payouts of the closed Premium Plan were not all honoured.',
    caveats: ['Ends 30 November 2026', 'ALPHA40 only on Zero accounts', 'Firm on the watchlist'],
    bestFor: ['futures', 'end of day'],
    checkoutTip: 'Use ALPHA50 on Advanced, Standard or Direct and ALPHA40 on Zero.',
  },
  {
    slug: 'fundednext',
    label: 'Official November offer',
    title: 'NOVINS: 30% off all Stellar Instant plans',
    code: 'NOVINS',
    value: '30%',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Official help article: offer started 1 November 2026; no end date shown.',
    eligibility: '"30% discount on all Stellar Instant plans"; one use per user; US traders included.',
    sourceUrl: 'https://help.fundednext.com/en/articles/17833714',
    sourceLabel: 'Official FundedNext help center',
    sourceNote: 'Official help article read on 2026-11-14. A second November code, NOVSTR (up to 41% global, up to 30% US), covers only the Stellar 2-Step 6K, 1-Step 6K and Lite 5K accounts (help.fundednext.com/en/articles/17833708).',
    consumerVerdict: 'A clear, one-use discount on instant accounts. NOVSTR only covers the smallest Stellar sizes.',
    caveats: ['One use per user', 'Stellar Instant plans only', 'NOVSTR limited to 6K/5K sizes'],
    bestFor: ['instant funding', 'forex', 'CFD'],
    checkoutTip: 'Use NOVINS on a Stellar Instant plan; for a 6K or Lite 5K account compare with NOVSTR.',
  },
  {
    slug: 'funding-pips',
    label: 'Official first-purchase code',
    title: 'HELLO: 20% off a first FundingPips purchase',
    code: 'HELLO',
    value: '20%',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Shown on the official home page on 14 November 2026; no end date shown.',
    eligibility: 'First purchase only; the official checkout guide explicitly EXCLUDES 100K accounts.',
    sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/44390730743825-Get-Started',
    sourceLabel: 'Official FundingPips purchase guide',
    sourceNote: 'Official onboarding guide checked 2026-11-19: HELLO grants 20% off a first purchase but cannot be used on 100K accounts; the code must be entered before payment.',
    consumerVerdict: 'A simple first-purchase discount. Read the PRIME terms in the firm file before buying.',
    caveats: ['First purchase only', '100K accounts excluded', 'See the product rules on the firm file'],
    bestFor: ['forex', 'first purchase'],
    checkoutTip: 'Apply HELLO on your first order and check the subtotal.',
  },
  {
    slug: 'upcomers',
    label: 'Official Black Friday code',
    title: 'BF90: Upcomers Black Friday code (up to 93% off, buy one get two)',
    code: 'BF90',
    value: 'Up to 93%',
    category: 'official-discount',
    proofLevel: 'Official',
    availability: 'Active official offer',
    validity: 'Official help article "Black Friday Vol. 2" read on 14 November 2026; no end date shown.',
    eligibility: 'Challenge (Classic, Turbo) and Instant accounts; "Buy one, get 2 free" on Classic only, claimed through support. Free reset removed after 10 November 2026.',
    sourceUrl: 'https://help.upcomers.com/en/articles/16972155-black-friday-buy-one-get-2-free',
    sourceLabel: 'Official Upcomers help center',
    sourceNote: 'Official help article read on 2026-11-14: "Use code BF90 at checkout", up to 93% off; the bonus accounts on Classic are claimed through support. PropRadar is an Upcomers affiliate (partner code kkscxhro); BF90 is Upcomers\' own public code.',
    consumerVerdict: 'Compare BF90 with the partner link at checkout. Upcomers\' Trustpilot rating is withheld and its accounts are simulated: read the firm file first.',
    caveats: ['Bonus accounts on Classic only, via support', 'Trustpilot rating withheld for a guideline breach', 'Affiliate relationship has no impact on the score'],
    bestFor: ['Upcomers', 'futures', 'crypto'],
    checkoutTip: 'Try BF90 and the partner link, and keep the lower total.',
  },
  // Official-site codes read during the 19 November 2026 deep audits (Claude).
  {
    slug: 'atmos-funded',
    label: 'Official site code',
    title: 'NOV: 12% off at Atmos Funded',
    code: 'NOV',
    value: '12% off',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Nov 3 to Nov 30 (year not stated on the banner)',
    eligibility: '2-Step and Instant Funding',
    sourceUrl: 'https://atmosfunded.com/',
    sourceLabel: 'Official Atmos Funded site',
    sourceNote: 'Top banner on the official homepage, read 2026-11-19.',
    consumerVerdict: 'Code displayed on Atmos Funded\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Atmos Funded', 'official code'],
    checkoutTip: 'Apply NOV and confirm the reduction appears before paying.',
  },
  {
    slug: 'directfundedtrader',
    label: 'Official site code',
    title: 'DFT50: 50% off at DirectFundedTrader',
    code: 'DFT50',
    value: '50% off',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: 'All challenges',
    sourceUrl: 'https://directfundedtrader.com/',
    sourceLabel: 'Official DirectFundedTrader site',
    sourceNote: 'Banner "LIMITED OFFER Get 50% OFF all challenges DFT50" on the official home page and Turbo page, read on 2026-11-19.',
    consumerVerdict: 'Code displayed on DirectFundedTrader\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['DirectFundedTrader', 'official code'],
    checkoutTip: 'Apply DFT50 and confirm the reduction appears before paying.',
  },
  {
    slug: 'directfundedtrader',
    label: 'Official site code',
    title: 'DFT99: $100K challenge for $99 at DirectFundedTrader',
    code: 'DFT99',
    value: '$100K challenge for $99',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: '$100K challenge',
    sourceUrl: 'https://directfundedtrader.com/',
    sourceLabel: 'Official DirectFundedTrader site',
    sourceNote: 'Banner "FLASH DEAL $100K Challenge for just $99 DFT99" on the official home page and Turbo page, read on 2026-11-19.',
    consumerVerdict: 'Code displayed on DirectFundedTrader\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['DirectFundedTrader', 'official code'],
    checkoutTip: 'Apply DFT99 and confirm the reduction appears before paying.',
  },
  {
    slug: 'funded-bull',
    label: 'Official site code',
    title: 'BULL: 20% off all evaluations at Funded Bull',
    code: 'BULL',
    value: '20% off all evaluations',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: 'All evaluations',
    sourceUrl: 'https://fundedbull.com/',
    sourceLabel: 'Official Funded Bull site',
    sourceNote: 'Shown as applied in the homepage checkout widget ($189 to $152 on the 2 Step $25K), read 2026-11-19.',
    consumerVerdict: 'Code displayed on Funded Bull\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Funded Bull', 'official code'],
    checkoutTip: 'Apply BULL and confirm the reduction appears before paying.',
  },
  {
    slug: 'funded-bull',
    label: 'Official site code',
    title: 'EYE25: 25% off (extra 5% on top of the standard 20%) at Funded Bull',
    code: 'EYE25',
    value: '25% off (extra 5% on top of the standard 20%)',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: 'Evaluations',
    sourceUrl: 'https://fundedbull.com/',
    sourceLabel: 'Official Funded Bull site',
    sourceNote: 'Homepage banner, read 2026-11-19.',
    consumerVerdict: 'Code displayed on Funded Bull\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Funded Bull', 'official code'],
    checkoutTip: 'Apply EYE25 and confirm the reduction appears before paying.',
  },
  {
    slug: 'funded-futures-network',
    label: 'Official site code',
    title: 'NEXUS: 70% off at Funded Futures Network',
    code: 'NEXUS',
    value: '70% off',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Black Friday pricing ends Nov 30 (2026)',
    eligibility: 'Steady or Max accounts; \'Skip the Eval not included\'',
    sourceUrl: 'https://fundedfuturesnetwork.com/',
    sourceLabel: 'Official Funded Futures Network site',
    sourceNote: 'Header banner and Black Friday section of the official homepage, read 2026-11-19; also applied in the accounts page price display (50K shown as $53.40).',
    consumerVerdict: 'Code displayed on Funded Futures Network\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Funded Futures Network', 'official code'],
    checkoutTip: 'Apply NEXUS and confirm the reduction appears before paying.',
  },
  {
    slug: 'funded-futures-network',
    label: 'Official site code',
    title: 'DOUBLE50: 50% off at Funded Futures Network',
    code: 'DOUBLE50',
    value: '50% off',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date stated; \'valid on new evaluations\'; free account to be claimed within 45 days of purchase',
    eligibility: 'New Steady evaluations; one free account per user at a time',
    sourceUrl: 'https://steady.fundedfuturesnetwork.com/',
    sourceLabel: 'Official Funded Futures Network site',
    sourceNote: 'STEADY landing page on the official subdomain, read 2026-11-19. Its BOGO offer conflicts with the homepage statement \'No Buy 1, Get 1 on Steady\'.',
    consumerVerdict: 'Code displayed on Funded Futures Network\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'The homepage says there is no Buy 1, Get 1 on Steady; only the 50% is confirmed', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Funded Futures Network', 'official code'],
    checkoutTip: 'Apply DOUBLE50 and confirm the reduction appears before paying.',
  },
  {
    slug: 'funded-trader-markets',
    label: 'Official site code',
    title: 'NOV: Up to 75% off 1-Step and 2-Step challenges; up to 50% off Instant Funding at Funded Trader Markets',
    code: 'NOV',
    value: 'Up to 75% off 1-Step and 2-Step challenges; up to 50% off Instant Funding',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Countdown timer (\'Ends in\'); banner also reads \'1ST OCT\'; no end date stated',
    eligibility: 'Promotions are non-transferable and non-stackable unless stated otherwise (promo terms)',
    sourceUrl: 'https://fundedtradermarkets.com/',
    sourceLabel: 'Official Funded Trader Markets site',
    sourceNote: 'Site-wide banner \'CODE NOV\' with countdown seen on the home page, /1-step, /2-step and /ftm-instant-funding on 2026-11-19; promo terms at https://fundedtradermarkets.com/promo-terms.',
    consumerVerdict: 'Code displayed on Funded Trader Markets\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Funded Trader Markets', 'official code'],
    checkoutTip: 'Apply NOV and confirm the reduction appears before paying.',
  },
  {
    slug: 'lvlup-futures',
    label: 'Official site code',
    title: 'NOV26: 40% off at Lvlup Futures',
    code: 'NOV26',
    value: '40% off',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'Countdown timer, no fixed end date (read as 02d 14h 37m remaining on 2026-11-19)',
    eligibility: 'All evaluations; on monthly plans the coupon price is shown for the 1st month',
    sourceUrl: 'https://lvlupfutures.com/',
    sourceLabel: 'Official Lvlup Futures site',
    sourceNote: 'Banner "LIMITED TIME OFFER" / "40% off all Evaluations" with code NOV26 and "Price with coupon at checkout" under each plan on the official home page, read on 2026-11-19.',
    consumerVerdict: 'Code displayed on Lvlup Futures\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Lvlup Futures', 'official code'],
    checkoutTip: 'Apply NOV26 and confirm the reduction appears before paying.',
  },
  {
    slug: 'top-one-futures',
    label: 'Official site code',
    title: 'BLACKFRIDAY: 55% off Elite Daily, 30% off Instant Sim Funded, 60% off Ignite; discounted Elite Access at Top One Futures',
    code: 'BLACKFRIDAY',
    value: '55% off Elite Daily, 30% off Instant Sim Funded, 60% off Ignite; discounted Elite Access',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: 'Shown on Elite Daily, Elite Access, Instant Sim Funded and Ignite price cards',
    sourceUrl: 'https://toponefutures.com/',
    sourceLabel: 'Official Top One Futures site',
    sourceNote: 'Code and per-programme percentages displayed on the official homepage price cards, read 2026-11-19.',
    consumerVerdict: 'Code displayed on Top One Futures\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Top One Futures', 'official code'],
    checkoutTip: 'Apply BLACKFRIDAY and confirm the reduction appears before paying.',
  },
  {
    slug: 'top-one-trader',
    label: 'Official site code',
    title: 'BLACKFRIDAY: up to 80% off (70% on 5K FLASH / PRO, 80% on 5K Instant Prime and Instant Funding, 40-70% on other sizes); on NOVA: buy 1, get 1 free at Top One Trader',
    code: 'BLACKFRIDAY',
    value: 'up to 80% off (70% on 5K FLASH / PRO, 80% on 5K Instant Prime and Instant Funding, 40-70% on other sizes); on NOVA: buy 1, get 1 free',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'not stated (countdown timer shows no date)',
    eligibility: 'Shown on FLASH, 2-Step PRO, Instant Prime, Instant Funding, Magnum and NOVA price cards',
    sourceUrl: 'https://www.toponetrader.com/',
    sourceLabel: 'Official Top One Trader site',
    sourceNote: 'Homepage banner read 2026-11-19: \'Black November is live: up to 80% OFF with code BLACKFRIDAY\'; NOVA page: \'Buy 1, Get 1 FREE with Code: BLACKFRIDAY\'.',
    consumerVerdict: 'Code displayed on Top One Trader\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Top One Trader', 'official code'],
    checkoutTip: 'Apply BLACKFRIDAY and confirm the reduction appears before paying.',
  },
  {
    slug: 'top-one-trader',
    label: 'Official site code',
    title: 'SUMMER: up to 60% off (60% on 5K, 50% on 10K-50K, 40% on 100K) at Top One Trader',
    code: 'SUMMER',
    value: 'up to 60% off (60% on 5K, 50% on 10K-50K, 40% on 100K)',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: '2-Step Plus',
    sourceUrl: 'https://www.toponetrader.com/coupon-code-pricing',
    sourceLabel: 'Official Top One Trader site',
    sourceNote: '2-Step Plus cards on the homepage and coupon-code pricing page, read 2026-11-19: \'Up to 60% w. Code: SUMMER\'.',
    consumerVerdict: 'Code displayed on Top One Trader\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Top One Trader', 'official code'],
    checkoutTip: 'Apply SUMMER and confirm the reduction appears before paying.',
  },
  {
    slug: 'top-one-trader',
    label: 'Official site code',
    title: 'MYSTERY: up to 75% off, varies by package at Top One Trader',
    code: 'MYSTERY',
    value: 'up to 75% off, varies by package',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: 'FLASH, 2-Step PRO, Magnum, Instant Prime, Instant Funding',
    sourceUrl: 'https://www.toponetrader.com/coupon-code-pricing',
    sourceLabel: 'Official Top One Trader site',
    sourceNote: 'Banner on the official coupon-code pricing page, read 2026-11-19: \'Use code MYSTERY at checkout to unlock up to 75% off. Discount varies by package.\'',
    consumerVerdict: 'Code displayed on Top One Trader\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Top One Trader', 'official code'],
    checkoutTip: 'Apply MYSTERY and confirm the reduction appears before paying.',
  },
  {
    slug: 'wsfunded',
    label: 'Official site code',
    title: 'WSFNEW: 50% off at WSFunded',
    code: 'WSFNEW',
    value: '50% off',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: 'traders new to WSF (\'If you are new to WSF\'); others are directed to IBIZA2X1 for 30% off',
    sourceUrl: 'https://wsfunded.com/en/new-traders',
    sourceLabel: 'Official WSFunded site',
    sourceNote: 'Official landing page \'use the code WSFNEW to get 50% OFF\', read 2026-11-19.',
    consumerVerdict: 'Code displayed on WSFunded\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['WSFunded', 'official code'],
    checkoutTip: 'Apply WSFNEW and confirm the reduction appears before paying.',
  },
  {
    slug: 'wsfunded',
    label: 'Official site code',
    title: 'GTA: 50% off at WSFunded',
    code: 'GTA',
    value: '50% off',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: 'Eligibility not stated on the official page; check the plan at checkout.',
    sourceUrl: 'https://wsfunded.com/en',
    sourceLabel: 'Official WSFunded site',
    sourceNote: 'Hero banner and \'Black Week\' popup on the official home page, read 2026-11-19.',
    consumerVerdict: 'Code displayed on WSFunded\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['WSFunded', 'official code'],
    checkoutTip: 'Apply GTA and confirm the reduction appears before paying.',
  },
  {
    slug: 'clarity-traders',
    label: 'Official site code',
    title: 'FALL50: 50% off at Clarity Traders',
    code: 'FALL50',
    value: '50% off',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'ends 30 November 2026',
    eligibility: 'all accounts',
    sourceUrl: 'https://www.claritytraders.com/',
    sourceLabel: 'Official Clarity Traders site',
    sourceNote: 'Banner \'FALL SALE: 50% off all accounts, ends Nov 30\' and \'CODE : FALL50\' on the official homepage; the Instant page shows $95 reduced to $47.50 with FALL50. Seen 2026-11-19.',
    consumerVerdict: 'Code displayed on Clarity Traders\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Clarity Traders', 'official code'],
    checkoutTip: 'Apply FALL50 and confirm the reduction appears before paying.',
  },
  {
    slug: 'orion-funded',
    label: 'Official site code',
    title: 'BLACK: 15% off at Orion Funded',
    code: 'BLACK',
    value: '15% off',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: 'No end date shown on the official page (read 19 November 2026).',
    eligibility: 'All models (as stated on the banner)',
    sourceUrl: 'https://www.orionfunded.com/',
    sourceLabel: 'Official Orion Funded site',
    sourceNote: 'Banner text read on the official homepage and on https://www.orionfunded.com/orion-nova on 19 Nov 2026, next to a \'Limited 11:11 OFFER!\' banner and an \'Orion Black 50K model for EUR 89\' banner. No end date shown.',
    consumerVerdict: 'Code displayed on Orion Funded\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['Orion Funded', 'official code'],
    checkoutTip: 'Apply BLACK and confirm the reduction appears before paying.',
  },
  {
    slug: 'sfx-funded',
    label: 'Official site code',
    title: 'BF55: 55% off + a second plan free at SFX Funded',
    code: 'BF55',
    value: '55% off + a second plan free',
    category: 'code',
    proofLevel: 'Official',
    availability: 'Verify at checkout',
    validity: '\'Ends soon\' (no end date shown)',
    eligibility: 'plan purchases (2-Step, 1-Step Pro and Instant pages all show it)',
    sourceUrl: 'https://sfxfunded.com/programs',
    sourceLabel: 'Official SFX Funded site',
    sourceNote: 'Site banner \'Early Black Friday / 55% off / + 2nd plan free / Code BF55 / Ends soon\' on the official programs, 2-Step, 1-Step Pro and Instant pages, with 100K prices shown at 55% off. Seen 2026-11-19.',
    consumerVerdict: 'Code displayed on SFX Funded\'s own site on 19 November 2026. Check the discounted total for your plan at checkout and read the restrictive rules on the firm page first.',
    caveats: ['Shown on the official site on 19 November 2026; it can end without notice', 'Confirm the reduction in the order summary before paying', 'Promotions never change the PropRadar score'],
    bestFor: ['SFX Funded', 'official code'],
    checkoutTip: 'Apply BF55 and confirm the reduction appears before paying.',
  },
];

/** Black Friday 2026 — verified on primary firm pages on 23 Nov, no coupon-site inference.
 * Public and partner offers share the same ranking inputs; score remains editorially independent.
 * Undated sales age out after seven days unless the primary source is rechecked.
 */
const blackFridayDeals: PromoDeal[] = [
  {
    slug: 'ftmo', label: 'Black Friday · partner link', blackFriday: true, featured: true, heroRank: 1,
    title: 'FTMO Black Friday: 2-Step 100K €540 → €432; up to 30% on eligible accounts',
    priceExample: { plan: '2-Step Standard', accountSize: 100000, currency: 'EUR', before: 540, after: 432, checkedOn: '2026-11-23', sourceUrl: 'https://promo.ftmo.com/special-november-deal-2026/' },
    code: 'No code', value: 'Up to 30%', category: 'affiliate', proofLevel: 'Official', availability: 'Active official offer',
    validity: 'Official Black Friday campaign checked 23 November 2026. End date not stated; account and country eligibility confirmed at order.',
    eligibility: 'FTMO Standard Challenges from $10K to $200K; 2-Step 100K €540 → €432 (20%), 2-Step 10K €89 → €62 (about 30%). Not all plans get 30%.',
    sourceUrl: FTMO_AFFILIATE_URL, sourceLabel: 'Official FTMO Black Friday campaign; PropRadar partner link',
    sourceNote: 'Offer prices and restrictions sourced from https://promo.ftmo.com/special-november-deal-2026/ on 2026-11-23. The outbound affiliate link never affects the ranking.',
    consumerVerdict: 'Clear, size-specific published prices. The 2-Step fee can be refunded with the first eligible reward, while 1-Step and Instant fees are not refunded.',
    caveats: ['30% is the maximum, not the 100K discount (20%)', 'Standard accounts and eligible countries only', 'Affiliate link disclosed; score unaffected'],
    bestFor: ['forex', 'CFD', 'established firm', 'Black Friday'], checkoutTip: 'Choose the precise account size and compare the checkout price with the published €432 / €540 100K example.'
  },
  {
    slug: 'fxify', label: 'Black Friday · official vs partner', blackFriday: true, featured: true, heroRank: 2,
    title: 'FXIFY BLACK35: 35% off eligible programs (better than our 25% code)',
    code: 'BLACK35', value: '35%', category: 'official-discount', proofLevel: 'Official', availability: 'Active official offer',
    validity: '17 Nov–9 Dec 2026 at 23:59 EST; up to three uses per trader.',
    eligibility: 'All programs except Instant Funding Lite, including the limited One Step Static.',
    sourceUrl: FXIFY_AFFILIATE_URL, sourceLabel: 'FXIFY official November code and PropRadar partner link',
    sourceNote: 'Official terms: https://fxify.com/blog/best-current-prop-firm-discount-codes-november-2026/ (18 November 2026), checked on 23 Nov.',
    consumerVerdict: 'Choose the public 35% code rather than the weaker 25% PropRadar partner code. Profit-split add-ons and challenge rules still matter.',
    caveats: ['Instant Funding Lite excluded', 'Three redemptions max', 'FXIFY partner relationship is disclosed and does not affect ratings'],
    bestFor: ['forex', 'CFD', 'Black Friday'], checkoutTip: 'Apply BLACK35 first, verify the discounted amount, and do not stack coupons.',
    expiresAt: '2026-12-10T04:59:00Z'
  },
  {
    slug: 'audacity-capital', label: 'Black Friday · official code', blackFriday: true, featured: true, heroRank: 3,
    title: 'Audacity BF50: 50% on Ability 2-Step; 30% on 1-Step and Instant',
    code: 'BF50', value: '50%', category: 'code', proofLevel: 'Official', availability: 'Active official offer',
    validity: 'Official homepage banner checked 23 Nov 2026; no end date provided.',
    eligibility: '50% on Ability Challenge 2-Step; 30% on Ability Challenge 1-Step and FTP Instant Funding; not a blanket 50%.',
    sourceUrl: 'https://audacity.capital/', sourceLabel: 'Audacity Capital official Black Friday offer',
    sourceNote: 'https://audacity.capital/ prominently displayed BF50 and program-specific discounts on 23 Nov 2026; no order completed.',
    consumerVerdict: 'A substantial official price reduction, but compare the underlying payout, drawdown and fee terms for the specific Ability plan.',
    caveats: ['50% applies to 2-Step, not Instant', 'End date not published', 'Check exact selected plan before checkout'],
    bestFor: ['forex', 'CFD', 'Black Friday'], checkoutTip: 'Enter BF50 and verify which of the 50% / 30% variants applies to the cart.'
  },
  {
    slug: 'tradeify', label: 'November deal · official', blackFriday: true, featured: true, heroRank: 4,
    title: 'Tradeify NOV: 45% off eligible 25K; 30% across other eligible futures plans',
    code: 'NOV', value: 'Up to 45%', category: 'futures', proofLevel: 'Official', availability: 'Active official offer',
    validity: 'Ends 30 November 2026 at 23:59 EST (official site).',
    eligibility: '45% on eligible 25K accounts except Miami; 30% on other applicable futures offers. Resets and funded-stage fees are separate.',
    sourceUrl: 'https://tradeify.co/', sourceLabel: 'Tradeify official November banner',
    sourceNote: 'https://tradeify.co/ officially advertises 30% with NOV and 45% for eligible 25K accounts, excluding Miami, through 30 November.',
    consumerVerdict: 'Attractive for futures, but a discount on an evaluation does not change funded payout rules or recurring fees.',
    caveats: ['Miami plan excluded from the 45% offer', 'Confirm monthly renewal vs one-time fee', 'Separate funded rules'],
    bestFor: ['futures', 'Black Friday'], checkoutTip: 'Use NOV on the exact futures program and compare total cost.',
    expiresAt: '2026-12-01T04:59:00Z'
  },
  {
    slug: 'aqua-funded', label: 'Black Friday · official', blackFriday: true, featured: true, heroRank: 5,
    title: 'AquaFunded BLACKFRIDAY: 35% off eligible accounts',
    code: 'BLACKFRIDAY', value: '35%', category: 'code', proofLevel: 'Official', availability: 'Active official offer',
    validity: 'Live on official homepage checked 23 Nov 2026; no verified end date.',
    eligibility: 'Official banner says 35% off every account; verify model-specific exclusions and add-ons at checkout.',
    sourceUrl: 'https://www.aquafunded.com/', sourceLabel: 'AquaFunded official site',
    sourceNote: 'https://www.aquafunded.com/ displayed 35% and BLACKFRIDAY on 23 November 2026; no checkout submitted.',
    consumerVerdict: 'The discount is sourced; it is not an endorsement of the funded contract or payout protections.',
    caveats: ['Check discount on the chosen account', 'Payout and discretionary clauses deserve separate scrutiny'],
    bestFor: ['forex', 'CFD', 'futures', 'Black Friday'], checkoutTip: 'Enter BLACKFRIDAY, check total and read the relevant funded rules.'
  },
  {
    slug: 'topstep', label: 'Friendsgiving · referral, not a universal code', blackFriday: true, featured: true, heroRank: 6,
    title: 'Topstep Friendsgiving: 50% off a NEW trader’s first purchase using a current trader’s referral',
    code: 'Trader referral', value: '50%', category: 'futures', proofLevel: 'Official', availability: 'Active official offer',
    validity: 'Topstep announcement 16 November 2026; no campaign end date published.',
    eligibility: 'New Topstep customer only. Obtain a personal referral code from an existing trader; they earn a 50% reward on their next eligible purchase (excludes Back2Funded).',
    sourceUrl: 'https://www.topstep.com/friendsgiving', sourceLabel: 'Topstep official Friendsgiving campaign',
    sourceNote: 'https://www.topstep.com/blog/friendsgiving-topstep-discount published 16 November 2026; no public universal coupon exists for this campaign.',
    consumerVerdict: 'Genuine 50% reduction for first-time customers if you have a real trader referral. Do not use fabricated coupon codes.',
    caveats: ['Only new customers', 'A genuine existing-trader referral is required', 'Cannot stack affiliate/promo coupons'],
    bestFor: ['futures', 'new customer', 'Black Friday'], checkoutTip: 'Ask a current Topstep trader for a personal referral code, then check the first-purchase total.'
  },
  {
    slug: 'e8-markets', label: 'Official promotion · affiliate link', blackFriday: true, featured: true, heroRank: 7,
    title: 'E8 Markets E8ARC: 30% off selected Classic Markets (100K example $488 → $342)',
    priceExample: { plan: 'E8 One Classic Markets 100K', accountSize: 100000, currency: 'USD', before: 488, after: 342, checkedOn: '2026-11-23', sourceUrl: 'https://e8markets.com/d/E8' },
    code: 'E8ARC', value: '30%', category: 'affiliate', proofLevel: 'Official', availability: 'Verify at checkout',
    validity: 'No published expiration. Primary discount page checked 23 Nov 2026; different landing pages show different codes.',
    eligibility: 'Only E8 One / E8 Pro Classic Markets according to the published E8ARC table. Product, campaign and account size can change the price.',
    sourceUrl: E8_AFFILIATE_URL, sourceLabel: 'E8 official discount codes with PropRadar affiliate landing',
    sourceNote: 'E8 official codes page https://e8markets.com/e8-markets-discount-code and a 30%-off $488 → $342 configuration at https://e8markets.com/d/E8; E8ARC availability needs checkout confirmation.',
    consumerVerdict: 'Good potential Classic Markets discount; checkout variations mean the exact 30% must be checked before describing it as applied.',
    caveats: ['Public code/landing variants differ', 'Only Classic Markets', 'Partner link does not affect score'],
    bestFor: ['forex', 'CFD', 'Black Friday'], checkoutTip: 'Test E8ARC for your selected Classic Markets plan. If the checkout does not show 30%, do not claim the discount.'
  },
  {
    slug: 'top-one-trader', label: 'Black November · official', blackFriday: true, heroRank: 8,
    title: 'Top One Trader BLACKFRIDAY: up to 80% depending on plan',
    code: 'BLACKFRIDAY', value: 'Up to 80%', category: 'code', proofLevel: 'Official', availability: 'Verify at checkout',
    validity: 'Official November homepage displays the offer; no fixed public end date.',
    eligibility: 'The maximum percentage only applies to selected 5K and Instant models; confirm the other sizes individually.',
    sourceUrl: 'https://www.toponetrader.com/', sourceLabel: 'Top One Trader official Black November offer',
    sourceNote: 'https://www.toponetrader.com/ displayed BLACKFRIDAY and up to 80% on 23 November 2026.',
    consumerVerdict: 'Big headline discount, but the product size, payout terms and price after promotional period matter more than the badge.',
    caveats: ['Up to, not all sizes', 'Selected Instant models only for the top reduction', 'Verify actual price'],
    bestFor: ['forex', 'CFD', 'Black Friday'], checkoutTip: 'Confirm the specific account discount and compare funded-stage terms.'
  },
  {
    slug: 'top-one-futures', label: 'Black November · official', blackFriday: true, heroRank: 9,
    title: 'Top One Futures BLACKFRIDAY: 55% off Elite Daily / 60% on eligible Ignite',
    code: 'BLACKFRIDAY', value: 'Up to 60%', category: 'futures', proofLevel: 'Official', availability: 'Verify at checkout',
    validity: 'Live Black November banner observed 23 Nov 2026; end date not specified.',
    eligibility: '55% off eligible Elite Daily and up to 60% on Ignite Instant Funded; selected Elite Daily 100K price cards show $398 → $179; other plans and activation charges differ.',
    sourceUrl: 'https://www.toponefutures.com/', sourceLabel: 'Top One Futures official Black November banner',
    sourceNote: 'https://www.toponefutures.com/ advertised BLACKFRIDAY for eligible plans on 23 Nov 2026; account card snapshot can depend on campaign landing page.',
    consumerVerdict: 'Strong futures headline discount but read activation fees and funded account conditions separately.',
    caveats: ['Percent differs by product', 'Activation and reset costs separate', 'Confirm campaign and price at checkout'],
    bestFor: ['futures', 'Black Friday'], checkoutTip: 'Apply BLACKFRIDAY and verify the line-item price before paying.'
  },
  {
    slug: 'apex-trader-funding', label: 'Official coupon · eligibility caution', blackFriday: true,
    title: 'Apex SAVENOW: evaluations up to 90% off; activation and resets NOT included',
    code: 'SAVENOW', value: 'Up to 90%', category: 'futures', proofLevel: 'Official', availability: 'Verify at checkout',
    validity: 'Official coupon page observed November 2026, limited-time rate with no fixed cutoff.',
    eligibility: 'Only new evaluation purchases, not existing subscriptions, PA activation fees or resets.',
    sourceUrl: 'https://apextraderfunding.com/coupon-code/', sourceLabel: 'Apex official coupon policy',
    sourceNote: 'https://apextraderfunding.com/coupon-code/ advertises up to 90% and SAVENOW; verify the live checkout timer and the precise account model.',
    consumerVerdict: 'Do not compare the discounted evaluation fee alone: funded activation, resets and payout restrictions can dominate total cost.',
    caveats: ['No PA activation-fee waiver', 'Not retroactive', 'Check payout and consistency restrictions'],
    bestFor: ['futures', 'Black Friday'], checkoutTip: 'Compare the complete cost after evaluation, not only the initial coupon rate.'
  }
];
const BLACK_FRIDAY_UNDATED_FRESHNESS_MS = 7 * 24 * 60 * 60 * 1000;
function blackFridayCurrent(deal: PromoDeal, now = Date.now()): boolean {
  if (!deal.blackFriday) return true;
  if (deal.expiresAt) return now < Date.parse(deal.expiresAt);
  return now < Date.parse(PROMO_REVIEW_DATE + 'T23:59:59Z') + BLACK_FRIDAY_UNDATED_FRESHNESS_MS;
}

/** Reuse the same sourced, dated offer record for program cards and the promo board. */
const spotlightIds = new Set(['fxify-black35-2026', 'tradeify-nov-2026', 'funderpro-bf30-2026', 'fundedtradingplus-size20-2026']);
const spotlightDeals: PromoDeal[] = programPromotions
  .filter((offer) => spotlightIds.has(offer.id) && isProgramPromotionCurrent(offer))
  .map((offer) => ({
    slug: offer.slug,
    label: 'Official dated program discount',
    title: `${getFirmBySlug(offer.slug)?.name ?? offer.slug}: ${offer.offer} with ${offer.code}`,
    code: offer.code ?? '',
    value: offer.offer,
    category: 'official-discount' as const,
    proofLevel: 'Official' as const,
    availability: 'Active official offer' as const,
    validity: offer.expiresAt ? `Offer published until ${offer.expiresAt.slice(0, 10)} (UTC date); confirm the exact checkout cutoff.` : `Checked ${offer.checkedOn}; no public end date.`,
    eligibility: offer.terms,
    sourceUrl: offer.sourceUrl,
    sourceLabel: 'Firm-published offer',
    sourceNote: `Official source checked ${offer.checkedOn}; checkout was not submitted.`,
    consumerVerdict: 'Compare the final checkout subtotal with the standard fee; promotions never change the PropRadar score.',
    caveats: [offer.terms, 'Confirm the discounted subtotal before payment'],
    bestFor: [offer.slug, 'current code'],
    checkoutTip: `Use ${offer.code} on an eligible product and check the price before purchasing.`,
    expiresAt: offer.expiresAt,
  }));

/** Do not display ended or withdrawn promotions. */
const seasonalKeys = new Set(blackFridayDeals.map((deal) => deal.slug + ':' + deal.code.toLowerCase()));
export const promoDeals: PromoDeal[] = [...blackFridayDeals, ...allPromoDeals.filter((deal) => !seasonalKeys.has(deal.slug + ':' + deal.code.toLowerCase())), ...spotlightDeals.filter((deal) => !seasonalKeys.has(deal.slug + ':' + (deal.code ?? '').toLowerCase()))]
  .filter((deal) => !deal.notSeenOn && (!deal.expiresAt || Date.now() < Date.parse(deal.expiresAt)) && blackFridayCurrent(deal));

/** Deals withdrawn from the page because the official source no longer shows them. */
export const withdrawnPromoDeals: PromoDeal[] = allPromoDeals.filter((deal) => Boolean(deal.notSeenOn));

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

/** Firms PropRadar has a partner link or code with (disclosed on every card); listed first on /promos. Scores are unaffected. */
const isPartner = (slug: string) => slug in PARTNER_OFFERS;

export function getBestPromoDeals(limit = 12) {
  return promoDeals
    .map((deal) => promoDealWithFirm(deal))
    .sort((a, b) => Number(Boolean(b.blackFriday)) - Number(Boolean(a.blackFriday)) || Number(isPartner(b.slug)) - Number(isPartner(a.slug)) || (a.heroRank ?? 99) - (b.heroRank ?? 99) || b.dealScore - a.dealScore)
    .slice(0, limit);
}

/** Top of /promos: one offer per partner firm first (best deal score), then the other featured official offers. */
export function getMegaPromoDeals(limit = 6) {
  // Independently source-verified Black Friday deals first. Partner relationships
  // are disclosed on outbound links, but they do not alter a firm's risk score.
  const seasonal = promoDeals.filter((deal) => deal.blackFriday && deal.featured)
    .map((deal) => promoDealWithFirm(deal))
    .sort((a, b) => (a.heroRank ?? 99) - (b.heroRank ?? 99) || b.dealScore - a.dealScore);
  if (seasonal.length) return seasonal.slice(0, limit);
  const ranked = promoDeals.map((deal) => promoDealWithFirm(deal))
    .sort((a, b) => Number(isPartner(b.slug)) - Number(isPartner(a.slug)) || b.dealScore - a.dealScore);
  return ranked.slice(0, limit);
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
