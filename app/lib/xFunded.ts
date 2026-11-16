import type { PropFirm } from './propFirms';

/** Initial editorial review. EUR fees are never converted into a USD entry price. */
export const xFunded: PropFirm = {
  id: 199,
  slug: 'x-funded',
  name: 'X Funded',
  status: 'À surveiller',
  score: 52,
  founded: 0,
  headquarters: 'United Arab Emirates / Saint Lucia (site disclosures)',
  bestFor: 'Forex / CFD evaluations and simulated instant funding',
  verdict: '52/100: three main programmes have published rules and euro fees, but Trustpilot withholds the rating and the contract needs close attention. Affiliate-referred accounts are capped at a 50% base split after the first approved payout. Company payout totals are not independently authenticated customer transfers.',
  priceFrom: 0,
  nativePriceFrom: { amount: 89, currency: 'EUR' },
  profitSplit: 80,
  drawdownType: 'Hybride',
  newsTrading: 'Variable',
  eaAllowed: 'Variable',
  payoutDelay: 'Eligibility: terms require more than 5 trading days and more than 14 active days. Biweekly requests; review may take up to 7 days, then 3–5 working days processing and 1–2 for receipt. Homepage advertises weekly requests.',
  incidents: 1,
  incidentsDetails: [
    '2026-11-16: Trustpilot withholds the rating for x-funded.com for a guideline breach and states that it removed fake reviews. This is review-reliability evidence, not proof of unpaid withdrawals.'
  ],
  styles: ['Forex', 'CFD', 'Indices', 'Crypto', 'Day trading'],
  legalVerified: false,
  transparencyScore: 9,
  payoutProof: false,
  recentRuleChange: false,
  lastReviewed: '2026-11-16',
  logoDomain: 'x-funded.com',
  communitySignal: 'The domain-linked Trustpilot profile has 583 reviews, including positive payout testimonials and withdrawal complaints. Its TrustScore is withheld. Individual customer accounts and payment receipts were not independently authenticated.',
  products: [
    {
      id: 'x-funded-1-phase',
      name: '1-Phase Challenge — standard',
      type: 'Challenge',
      description: 'Simulated evaluation with published fees from €115 (10K) to €1,749 (300K), before add-ons. Fees are in euros; account sizes are in US dollars. Standard funded accounts have a 1% withdrawal profit requirement, mandatory stop-losses and no weekend holding.',
      accountSizeMin: 10000,
      accountSizeMax: 300000,
      profitTarget: '10% evaluation; 1% profit required to request a funded withdrawal',
      maxDailyLoss: '4% of recorded equity; reset at 02:00 UTC',
      maxDrawdown: '6% static, based on initial account balance',
      profitSplit: '80% initially; up to 90% later; 100% add-on. Affiliate-referred users: 50% base split after the first approved payout, across accounts.',
      platforms: ['MetaTrader 5', 'cTrader'],
      tradableAssets: ['Forex', 'Indices', 'Crypto'],
      minTradingDays: '5 evaluation days; withdrawal terms require more than 5 trading days and more than 14 active days',
      hasConsistencyRule: true,
      consistencyRule: 'Standard funded account: one trade idea must not exceed 45% of total profit; 1% maximum risk per trade idea. Stop-loss required on every trade; more than 5 minutes without one triggers a breach, while shorter omissions may still reject a payout. Evaluation rules differ.',
      linkToStart: 'https://x-funded.com/#started'
    },
    {
      id: 'x-funded-2-phase',
      name: '2-Phase Challenge — standard',
      type: 'Challenge',
      description: 'Two simulated evaluation phases, with published fees from €89 (10K) to €1,349 (300K), before add-ons. EAs are prohibited on the 2-Phase Challenge. News trading is permitted during evaluation, restricted on standard funded accounts; no weekend holding.',
      accountSizeMin: 10000,
      accountSizeMax: 300000,
      profitTarget: '8% then 5%; 1% profit required to request a funded withdrawal',
      maxDailyLoss: '5% of recorded equity; reset at 02:00 UTC',
      maxDrawdown: '10% static, based on initial account balance',
      profitSplit: '80% initially; up to 90% later; 100% add-on. Affiliate-referred users: 50% base split after the first approved payout, across accounts.',
      platforms: ['MetaTrader 5', 'cTrader'],
      tradableAssets: ['Forex', 'Indices', 'Crypto'],
      minTradingDays: '5 days per evaluation phase; withdrawal terms require more than 5 trading days and more than 14 active days',
      hasConsistencyRule: true,
      consistencyRule: 'Standard funded account: 45% single-trade-idea consistency, 1% maximum risk per trade idea and mandatory stop-losses. Positions opened around the same time, direction or instrument may be grouped. This is not a best-day rule.',
      linkToStart: 'https://x-funded.com/#started',
      isPopular: true
    },
    {
      id: 'x-funded-instant',
      name: 'Instant Funding',
      type: 'Instant funding',
      description: 'Direct simulated access, with published fees from €249 (2K) to €2,899 (200K). The page describes a one-month anniversary offer without a dated expiry; availability must be rechecked. No evaluation does not remove the 1% withdrawal profit requirement.',
      accountSizeMin: 2000,
      accountSizeMax: 200000,
      profitTarget: 'No evaluation; 1% profit required for a withdrawal',
      maxDailyLoss: '4% of recorded equity; reset at 02:00 UTC',
      maxDrawdown: '6% trailing, based on recorded equity',
      profitSplit: '80% stated in the benefits; table advertises up to 100%. Affiliate-referred users: 50% base split after the first approved payout.',
      platforms: ['MetaTrader 5', 'cTrader'],
      tradableAssets: ['Forex', 'Indices', 'Crypto'],
      minTradingDays: 'Withdrawal terms: more than 5 trading days, more than 14 active days and more than 10 eligible trades',
      hasConsistencyRule: true,
      consistencyRule: '20% single-trade-idea consistency and 1% maximum risk per trade idea. Stop-loss required on every trade; more than 2 minutes without one triggers a breach, while shorter omissions may still reject a payout. No weekend holding or affected high-impact news positions within ±10 minutes.',
      linkToStart: 'https://x-funded.com/instant-funding/'
    }
  ],
  strengths: [
    'Three main programme rule sets and original euro fee tables are publicly accessible.',
    'Standard evaluations use static overall loss limits; Instant Funding uses trailing drawdown.',
    'The help centre publishes account-review, payment-processing and referral-specific payout conditions.'
  ],
  weaknesses: [
    'Trustpilot withholds the TrustScore and reports removing fake reviews.',
    'Affiliate-referred users face a 50% base profit split after the first approved payout, including future accounts; the policy permits retroactive application.',
    'The homepage names XFunded LTD in Saint Lucia; the terms contract with OTHERSIDE LLC in the UAE. The relationship and registrations have not been independently verified.',
    'Homepage weekly-payout wording differs from biweekly terms. Tables show 5 trading days and 14 active days, while the contract requires more than those thresholds.',
    'After an approved payout, the help centre says the remaining balance is reset and any amount not withdrawn is unrecoverable.',
    'No independently authenticated customer payout trail was established in this review.'
  ],
  sources: [
    { label: 'X Funded — official programmes, euro fees and site disclosures', url: 'https://x-funded.com/' },
    { label: 'X Funded — terms, labelled last updated 21 April 2026', url: 'https://x-funded.com/terms-and-conditions/' },
    { label: 'X Funded — Instant Funding rules and euro fees', url: 'https://x-funded.com/instant-funding/' },
    { label: 'X Funded — affiliate-referred payout split policy, 3 August 2026', url: 'https://help.x-funded.com/payout-policy-dashboard/payout-split-policy/' },
    { label: 'X Funded — account review, processing times and balance reset', url: 'https://help.x-funded.com/payout-policy-dashboard/when-will-i-receive-my-payout/' },
    { label: 'Trustpilot — x-funded.com review status and 583 reviews, read 16 November 2026', url: 'https://www.trustpilot.com/review/x-funded.com' },
    { label: 'X Funded — help-centre programme catalogue (also lists Zero and Bybit variants)', url: 'https://help.x-funded.com/category/challenge-types-and-programs/' },
    { label: 'X Funded — 1-Phase Zero challenge rules', url: 'https://help.x-funded.com/challenge-types-and-programs/1-phase-zero-challenge-2/' },
    { label: 'X Funded — Bybit 2-Phase challenge rules', url: 'https://help.x-funded.com/challenge-types-and-programs/bybit-2-phase-challenge-2/' }
  ],
  commercialRelationship: 'Aucune',
  auditStatus: 'Partiellement vérifié',
  auditSummary: 'Initial editorial review dated 16 November 2026. The 52/100 score reflects documented standard programme rules and fees, a withheld TrustScore, unverified payout totals and material contractual restrictions. This file covers standard 1-Phase, standard 2-Phase and Instant Funding. Zero and Bybit variants are listed in the help centre but their complete current fee schedules were not captured. Founding year, company registrations, regulatory permissions and customer transfers remain unconfirmed.',
  auditSourcesChecked: [
    'Official standard programme and euro fee tables',
    'Terms and conditions (simulated accounts, entities and dispute clauses)',
    'Instant Funding page',
    'Affiliate-referred payout policy',
    'Payout processing and balance-reset help article',
    'Domain-linked Trustpilot profile',
    'Help-centre catalogue and sample Zero / Bybit rules'
  ],
  regulatoryAudit: {
    riskLevel: 'High',
    lastChecked: '2026-11-16',
    summary: 'High contractual caution: different entities are named on the homepage and in the terms; no registry extract or regulatory authorization was independently verified. The terms describe simulated accounts, referral-specific payout reductions and UAE dispute resolution. This is not a finding of unlawful conduct.',
    entities: [
      { name: 'OTHERSIDE LLC', jurisdiction: 'United Arab Emirates', role: 'Contracting party in the terms. Registration number and registered address were not confirmed.' },
      { name: 'XFunded LTD', jurisdiction: 'Saint Lucia', role: 'Entity named by the homepage with a trading-license claim. The relationship to OTHERSIDE LLC and the claimed authorization were not independently verified.' }
    ],
    regulatoryStatus: [
      'The terms define funded accounts as non-live simulated accounts with virtual capital.',
      'The homepage trading-license claim is a company statement, not a regulatory permission authenticated by PropRadar.',
      'The dispute clauses mention both binding arbitration in English in the UAE and exclusive UAE courts; clarification is needed before purchase.'
    ],
    complaintsAndDisputes: [
      'Trustpilot contains both payout praise and withdrawal complaints. These are customer accounts, not adjudicated payment failures.',
      'No court judgment or comprehensive regulatory clearance was established in this review; absence from this file does not establish absence of proceedings.'
    ],
    redFlags: [
      'Withheld TrustScore and a Trustpilot review-removal notice.',
      'Affiliate-referred payout reductions apply across current and future accounts, with possible retroactive adjustments.',
      'Different named legal entities and inconsistencies between marketing, tables and contractual wording.'
    ],
    sources: [
      { label: 'X Funded — official site disclosures', url: 'https://x-funded.com/' },
      { label: 'X Funded — terms and dispute clauses', url: 'https://x-funded.com/terms-and-conditions/' },
      { label: 'X Funded — affiliate-referred payout policy', url: 'https://help.x-funded.com/payout-policy-dashboard/payout-split-policy/' },
      { label: 'Trustpilot — x-funded.com', url: 'https://www.trustpilot.com/review/x-funded.com' }
    ]
  },
  reviewSignals: {
    redditScore: 0,
    redditMentions: 'No representative Reddit sample audited for this initial review.',
    redditSignal: 'Faible volume',
    xScore: 0,
    xMentions: 'No representative X sample audited for this initial review.',
    xSignal: 'Faible volume',
    trustpilotReliabilityScore: 25,
    trustpilotReliability: 'Faible',
    trustpilotNote: 'Trustpilot displays no TrustScore for x-funded.com because of a guideline breach and states that it removed fake reviews. The page shows 583 reviews, read 16 November 2026. No historical rating or removal count is inferred.',
    trustpilotRatingWithheld: true,
    trustpilotReviewCount: 583,
    trustpilotSourceUrl: 'https://www.trustpilot.com/review/x-funded.com',
    trustpilotFlags: ['TrustScore unavailable', 'Trustpilot review-removal notice'],
    trustpilotFlaggedReviewNote: 'Trustpilot does not give the number of removed reviews; no count is invented.',
    payoutRiskScore: 50,
    payoutRisk: 'Non évalué',
    payoutIncidentCount: 0,
    payoutIncidentStatus: 'Aucun signal fort',
    payoutIssues: [],
    confidenceDrivers: [
      'Documented programme rules, fees and a named contracting party.',
      'Unresolved entity and payout wording differences; no independently authenticated customer payment trail.'
    ],
    radarVerdict: '52/100 is an initial editorial assessment, independent of affiliation. Read the referral-specific 50% split policy and the withdrawal conditions before choosing a programme.',
    lastSignalCheck: '2026-11-16'
  }
};
