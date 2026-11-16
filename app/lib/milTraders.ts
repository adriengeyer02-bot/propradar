import type { PropFirm } from './propFirms';

/** Sourced initial review. Prices are USD list fees before temporary coupon discounts. */
export const milTraders: PropFirm = {
  id: 200,
  slug: 'miltraders',
  name: 'MilTraders',
  status: 'À surveiller',
  score: 58,
  founded: 0,
  headquarters: 'Dubai, United Arab Emirates',
  bestFor: 'Futures day traders comparing one-step evaluations and instant simulated funding',
  verdict: '58/100: Zero, Pro and Instant have detailed public rules, one-time fees and a named Dubai operator. Confidence is limited by a small Trustpilot sample, company-reported payout figures and contractual discretion. Withdrawal caps, retroactive rule changes and the compulsory live-account transition deserve attention before purchase.',
  priceFrom: 189.98,
  profitSplit: 90,
  drawdownType: 'EOD',
  newsTrading: 'Variable',
  eaAllowed: 'No',
  payoutDelay: 'Requests any day after eligibility. Zero and Pro require 5 qualifying winning days per cycle; Instant uses profit goals. The company states processing within 48 hours via Rise; additional verification extends that timeframe.',
  incidents: 0,
  incidentsDetails: [],
  styles: ['Futures', 'Day trading', 'Indices', 'Metals', 'Energy'],
  legalVerified: false,
  transparencyScore: 14,
  payoutProof: false,
  recentRuleChange: false,
  lastReviewed: '2026-11-16',
  trustpilotRating: 3.9,
  logoDomain: 'miltraders.com',
  communitySignal: 'Trustpilot shows 3.9/5 across 13 reviews, read 16 November 2026. The visible feedback includes positive platform experiences and complaints about withdrawals or identity verification. The firm attributes a disputed KYC case to Rise. These customer accounts were not independently authenticated and the sample is small.',
  products: [
    {
      id: 'miltraders-zero',
      name: 'Zero',
      type: 'Futures evaluation',
      description: 'One simulated evaluation, with one-time list fees of $250 / $378 / $658 for 50K / 100K / 150K, before MIL50. No activation fee; platform access and dxFeed data included. Evaluation limits: 4 / 6 / 8 minis. Funded accounts start at 2 / 3 / 4 minis and scale up.',
      accountSizeMin: 50000,
      accountSizeMax: 150000,
      entryFeeMin: 250,
      entryFeeMax: 658,
      profitTarget: '$3,000 / $6,000 / $9,000 for 50K / 100K / 150K evaluations',
      maxDailyLoss: 'None on the published Zero evaluation and funded rules',
      maxDrawdown: 'EOD trailing: $2,000 / $3,000 / $4,500; the funded floor locks at initial balance + $100 once its threshold is reached',
      profitSplit: '90% on simulated funded payouts. Zero limits each request to 50% of gains above the locked floor, with $2,000 / $2,500 / $3,000 caps and a $500 minimum.',
      platforms: ['Volumetrica', 'DeepMap', 'DeepCharts', 'ATAS', 'Quantower'],
      tradableAssets: ['CME futures', 'COMEX futures', 'NYMEX futures'],
      minTradingDays: 'Evaluation: 2 days implied by the published consistency rule. Funded: 5 winning days per cycle, each at least $100 / $200 / $300 by size, plus the trade lock.',
      hasConsistencyRule: true,
      consistencyRule: 'Evaluation: best day at most 50% of total profit, with the stated 1% tolerance. Zero funded: no percentage consistency rule; withdrawal limits and the separate trading-conduct review still apply. Flat during restricted high-impact USD news ±60 seconds and at daily market close.',
      linkToStart: 'https://miltraders.com/pricing/'
    },
    {
      id: 'miltraders-pro',
      name: 'Pro',
      type: 'Futures evaluation',
      description: 'One simulated evaluation, with one-time list fees of $189.98 / $319.98 / $439.98 for 50K / 100K / 150K, before MIL50. No activation fee; platform access and dxFeed included. Contract limits remain 4 / 8 / 12 minis in evaluation and funded phases; funded withdrawals require a buffer.',
      accountSizeMin: 50000,
      accountSizeMax: 150000,
      entryFeeMin: 189.98,
      entryFeeMax: 439.98,
      profitTarget: '$3,000 / $6,000 / $9,000 for 50K / 100K / 150K evaluations',
      maxDailyLoss: 'None on the published Pro evaluation and funded rules',
      maxDrawdown: 'EOD trailing: $2,000 / $3,000 / $4,500; funded buffer thresholds $52,100 / $103,100 / $154,600',
      profitSplit: '90% on simulated funded payouts. Profits above the buffer are requestable subject to progressive caps: $1,500 / $2,000 / $2,500 initially, rising to $3,000 / $3,500 / $4,000 from the sixth payout; $500 minimum.',
      platforms: ['Volumetrica', 'DeepMap', 'DeepCharts', 'ATAS', 'Quantower'],
      tradableAssets: ['CME futures', 'COMEX futures', 'NYMEX futures'],
      minTradingDays: 'Evaluation: 2 days implied by the published consistency rule. Funded: 5 winning days per cycle, each at least $100 / $200 / $300 by size, plus the buffer.',
      hasConsistencyRule: true,
      consistencyRule: 'Evaluation: best day at most 50% with the stated 1% tolerance. Funded: best day at most 30% of cycle profit. News trading is allowed as part of a coherent strategy; trading-conduct restrictions and daily market-close liquidation still apply.',
      linkToStart: 'https://miltraders.com/pricing/',
      isPopular: true
    },
    {
      id: 'miltraders-instant',
      name: 'Instant',
      type: 'Instant funding',
      description: 'Direct simulated access, with one-time list fees of $500 / $643 / $800 for 50K / 100K / 150K, before MIL30. No activation fee or reset option. Contract limits: 4 / 8 / 10 minis. Each withdrawal cycle needs fresh profit; remaining profit from a previous cycle does not satisfy the next goal.',
      accountSizeMin: 50000,
      accountSizeMax: 150000,
      entryFeeMin: 500,
      entryFeeMax: 800,
      profitTarget: 'No evaluation. First payout profit goal: $3,000 / $6,000 / $9,000; later cycles: $2,000 / $3,500 / $4,500.',
      maxDailyLoss: '$1,200 / $2,250 / $3,300 for 50K / 100K / 150K; a soft breach closes positions and trading resumes the next session',
      maxDrawdown: 'EOD trailing: $2,000 / $3,000 / $4,500 for 50K / 100K / 150K',
      profitSplit: '90% on simulated funded payouts. Progressive request caps: $1,500 / $2,000 / $2,500 initially, rising to $3,000 / $3,500 / $4,000 from the sixth payout; $500 minimum.',
      platforms: ['Volumetrica', 'DeepMap', 'DeepCharts', 'ATAS', 'Quantower'],
      tradableAssets: ['CME futures', 'COMEX futures', 'NYMEX futures'],
      minTradingDays: 'No formal minimum day count; the 20% best-day consistency rule and cycle profit goal still determine eligibility.',
      hasConsistencyRule: true,
      consistencyRule: 'Best day at most 20% of current-cycle profit. Every payout needs its own fresh-profit goal. News trading is allowed within a coherent strategy; trading-conduct rules, daily market-close liquidation and 30-day funded inactivity closure apply.',
      linkToStart: 'https://miltraders.com/pricing/'
    }
  ],
  strengths: [
    'Three differentiated futures programmes with public account sizes, drawdowns, contract limits and payout caps.',
    'One-time purchases, no activation fee, and included platform access and dxFeed data.',
    'Zero funded accounts have no percentage consistency rule; Pro and Instant publish their different limits.',
    'The current terms name the operator, explain simulation and provide an internal review process.'
  ],
  weaknesses: [
    'Only 13 Trustpilot reviews at this check; founding year, company registration and aggregate payouts were not independently authenticated.',
    'Terms articles 2 and 19 apply later rule changes to accounts already purchased.',
    'The website FAQ promises payment of a pending request after a gambling-behaviour finding; terms article 12.5 and the help centre allow approval or refusal at the firm’s discretion.',
    'Live-account selection cannot be declined under article 10: simulated accounts are blocked and only eligible payouts already requested remain payable. The first three live payouts use an 80% share, then 90%.',
    'Article 9.6 suspends payout obligations during insolvency; the stated 48-hour processing time also extends for additional verification.',
    'Funded withdrawals have programme-specific gates, $500 minimums and caps; 90% profit share alone does not determine the cash withdrawable.',
    'Bots and third-party copying are prohibited; only manual own-account copying through the provided tools is allowed.'
  ],
  sources: [
    { label: 'MilTraders — official pricing and evaluation/funded comparison', url: 'https://miltraders.com/pricing/' },
    { label: 'MilTraders — terms v3.0, effective 17 October, updated 5 November 2026', url: 'https://miltraders.com/terms/' },
    { label: 'MilTraders — official FAQ, including payout and conduct wording', url: 'https://miltraders.com/faqs/' },
    { label: 'MilTraders — refund policy v1.2', url: 'https://miltraders.com/refund-policy/' },
    { label: 'MilTraders help — regular and promotional prices', url: 'https://intercom.help/miltraders/en/articles/16001309-how-much-do-miltraders-accounts-cost' },
    { label: 'MilTraders help — Zero, Pro and Instant comparison', url: 'https://intercom.help/miltraders/en/articles/16001317-zero-vs-pro-vs-instant-which-account-should-i-choose' },
    { label: 'MilTraders help — fixed and progressive payout caps', url: 'https://intercom.help/miltraders/en/articles/14642755-what-are-the-progressive-payout-caps' },
    { label: 'MilTraders help — discretionary conduct review and pending payouts', url: 'https://intercom.help/miltraders/en/articles/14664370-what-is-considered-gambling-behavior' },
    { label: 'MilTraders help — news-event restrictions by programme', url: 'https://intercom.help/miltraders/en/articles/14664351-can-i-trade-during-high-impact-news-events' },
    { label: 'MilTraders help — Instant profit goals and daily loss soft breach', url: 'https://intercom.help/miltraders/en/articles/14639444-what-is-miltraders-instant' },
    { label: 'MilTraders — company-reported payout dashboard', url: 'https://miltraders.com/' },
    { label: 'Trustpilot — miltraders.com, 3.9/5 across 13 reviews, read 16 November 2026', url: 'https://www.trustpilot.com/review/miltraders.com' }
  ],
  commercialRelationship: 'Aucune',
  auditStatus: 'Partiellement vérifié',
  auditSummary: 'Initial editorial review dated 16 November 2026. The 58/100 score recognises detailed programme documentation, one-time fees and a named operator, with lower confidence from the small public review sample, unauthenticated payout totals and contractual restrictions. Zero, Pro and Instant were checked against official pricing, terms, FAQ and help articles. This is a partial review: founding year, company registry details, customer receipts and comprehensive court/regulator coverage remain unverified.',
  auditSourcesChecked: [
    'Official pricing, including all three programme tabs and regular prices',
    'Current terms v3.0 and refund policy',
    'Website FAQ and help-centre comparison',
    'Help-centre payout caps, profit goals, news restrictions and conduct policy',
    'Company payout dashboard',
    'Domain-matched Trustpilot rating, visible reviews and company KYC reply'
  ],
  regulatoryAudit: {
    riskLevel: 'Medium to high',
    lastChecked: '2026-11-16',
    summary: 'The terms identify a Dubai free-zone operator and simulated evaluation/funded accounts, and expressly state that MilTraders is not a regulated financial intermediary. The formation and licence numbers are company disclosures, not independent registry verification or evidence of brokerage authorization. Contractual caution centres on rule changes, payout review and mandatory live-account selection.',
    entities: [
      {
        name: 'MILTRADERS L.L.C-FZ',
        jurisdiction: 'United Arab Emirates, Dubai, Meydan Free Zone',
        registrationNumber: 'Formation 2643914; licence 2643914.01 (company-disclosed)',
        registeredAddress: 'Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, United Arab Emirates',
        role: 'Contracting operator in terms article 1. Its registration was not independently authenticated.'
      }
    ],
    regulatoryStatus: [
      'Evaluations and Zero, Pro and Instant funded accounts are simulated; selected live accounts are described separately.',
      'Terms article 5.3 states that MilTraders is not a broker, dealer, futures commission merchant, investment adviser or regulated financial intermediary.',
      'Terms article 21 provides for England and Wales law and LCIA arbitration seated in Dubai, in English or French, with a small-claims exception.',
      'This initial review does not establish comprehensive regulatory clearance or absence of court proceedings.'
    ],
    complaintsAndDisputes: [
      'Visible Trustpilot feedback includes a withdrawal-refusal allegation and a KYC complaint, alongside positive platform feedback. These customer accounts are unverified, not adjudicated findings.',
      'In its response to the KYC complaint, the company attributes identity checks to Rise; the individual file was not examined by PropRadar.',
      'The website FAQ and the current terms/help article differ on whether a pending payout is assured after a gambling-behaviour finding.'
    ],
    redFlags: [
      'Changes to programme rules apply to previously purchased accounts under the published terms.',
      'The firm retains final assessment of prohibited conduct and discretion over a pending payout in the stated conduct-review scenario.',
      'Compulsory live selection blocks simulated accounts and changes payout entitlements and the initial profit share.',
      'A stated commercial licence and a payment-provider relationship do not authenticate customer payments or regulatory protection.'
    ],
    sources: [
      { label: 'MilTraders — contracting operator, payout clauses and disputes', url: 'https://miltraders.com/terms/' },
      { label: 'MilTraders — website FAQ', url: 'https://miltraders.com/faqs/' },
      { label: 'MilTraders help — conduct policy and payout review', url: 'https://intercom.help/miltraders/en/articles/14664370-what-is-considered-gambling-behavior' },
      { label: 'MilTraders — refund conditions', url: 'https://miltraders.com/refund-policy/' },
      { label: 'Trustpilot — miltraders.com', url: 'https://www.trustpilot.com/review/miltraders.com' }
    ]
  },
  reviewSignals: {
    redditScore: 0,
    redditMentions: 'No representative Reddit sample audited for this initial review.',
    redditSignal: 'Faible volume',
    xScore: 0,
    xMentions: 'No representative X sample audited for this initial review.',
    xSignal: 'Faible volume',
    trustpilotReliabilityScore: 78,
    trustpilotReliability: 'Faible',
    trustpilotNote: 'Trustpilot shows 3.9/5 across 13 reviews on the domain-matched profile, read 16 November 2026. The sample is small; visible customer allegations and the company response are not authenticated payment evidence.',
    trustpilotReviewCount: 13,
    trustpilotSourceUrl: 'https://www.trustpilot.com/review/miltraders.com',
    trustpilotFlags: ['Small public review sample', 'Customer statements require independent verification'],
    trustpilotFlaggedReviewNote: 'No review-manipulation alert was hand-counted; the site’s general investment-risk notice is not treated as a guideline-breach or rating-withholding notice.',
    payoutRiskScore: 50,
    payoutRisk: 'Non évalué',
    payoutIncidentCount: 0,
    payoutIncidentStatus: 'Aucun signal fort',
    payoutIssues: [],
    confidenceDrivers: [
      'Public programme tables, a named contracting entity and detailed payout rules support the file.',
      'Small review sample, company-only payout aggregates and unresolved contractual wording limit confidence.'
    ],
    radarVerdict: '58/100 is an initial editorial assessment, independent of affiliation. Programme transparency is useful, while stronger payout verification, a longer track record and consistent contractual wording would improve confidence.',
    lastSignalCheck: '2026-11-16'
  }
};
