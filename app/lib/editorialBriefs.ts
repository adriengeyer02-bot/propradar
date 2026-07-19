export type EditorialBriefTopic = 'rules' | 'payout' | 'legal';

export type EditorialBriefSource = {
  label: string;
  url: string;
  type: 'Official source' | 'Regulator' | 'Court record' | 'Financial press';
};

export type EditorialBriefSection = {
  id: string;
  topic: EditorialBriefTopic;
  eyebrow: string;
  title: string;
  summary: string;
  finding: string;
  whyItMatters: string;
  actions: string[];
  firmSlugs: string[];
  guideSlugs: string[];
  sources: EditorialBriefSource[];
};

export type EditorialBrief = {
  slug: string;
  issueNumber: number;
  title: string;
  shortTitle: string;
  description: string;
  dek: string;
  publishedAt: string;
  updatedAt: string;
  researchCutoff: string;
  readMinutes: number;
  keywords: string[];
  image16x9: string;
  image4x3: string;
  image1x1: string;
  imageAlt: string;
  imageCaption: string;
  sections: EditorialBriefSection[];
};

export const editorialBriefs: EditorialBrief[] = [
  {
    slug: 'prop-firm-risk-brief-july-19-2026',
    issueNumber: 2,
    title: 'Prop Firm Risk Brief: Relaunch Claims, Platform Failures and Legacy Payouts',
    shortTitle: 'Relaunch claims, platform failures and legacy payouts',
    description:
      'My Forex Funds legal status, three provider-linked closure timelines, The Funded Trader legacy obligations and the evidence required before an old brand becomes buyable again.',
    dek:
      'This issue separates legal progress from operational readiness, then traces how platform, broker and technology dependencies became material closure risks for retail prop traders.',
    publishedAt: '2026-07-19T09:00:00.000Z',
    updatedAt: '2026-07-19T10:30:00.000Z',
    researchCutoff: '2026-07-19',
    readMinutes: 12,
    keywords: [
      'My Forex Funds comeback',
      'My Forex Funds CFTC case dismissed',
      'Funded Engineer closed',
      'SurgeTrader closed',
      'True Forex Funds closed',
      'The Funded Trader payout',
      'prop firm platform risk',
      'prop firm closures',
    ],
    image16x9: '/editorial/prop-firm-operational-dependency-risk-16x9.jpg',
    image4x3: '/editorial/prop-firm-operational-dependency-risk-4x3.jpg',
    image1x1: '/editorial/prop-firm-operational-dependency-risk-1x1.jpg',
    imageAlt: 'Operational dependency chain connecting a prop firm to platform, broker, payment and legal providers',
    imageCaption:
      'A prop firm can remain visible while one critical platform, broker, payment or legal dependency has already changed the trader outcome.',
    sections: [
      {
        id: 'myforexfunds-legal-reset',
        topic: 'legal',
        eyebrow: 'Legal Reset',
        title: 'My Forex Funds: legal progress makes a relaunch possible, not yet buyable',
        summary:
          'The US case ended through sanctions against the CFTC, and a later Ontario order reduced a major practical barrier to restarting. Neither event replaces a fresh product, jurisdiction and payout audit.',
        finding:
          'The US federal complaint against Traders Global Group was dismissed with prejudice in May 2025 as a case-ending sanction tied to CFTC litigation misconduct. The CFTC Acting Chairman publicly addressed the court findings. Bloomberg then reported in December 2025 that an Ontario court returned access to nearly all funds and client data. Current MyForexFunds Terms, last updated January 28, 2026, still frame the website carefully and warn that described programs may not receive normal regulatory or investor-protection coverage. PropRadar therefore changes the reading from a simple closed archive to an inactive relaunch watch, while withholding any purchase recommendation until a current checkout and program agreement are verified.',
        whyItMatters:
          'A dismissal can materially change legal risk without answering every operational question. Traders need to distinguish the end of one enforcement case from current platform access, eligible countries, contracting entity, legacy claims and payout rules.',
        actions: [
          'Confirm a live product agreement and checkout before treating the firm as operational.',
          'Separate the US dismissal from any remaining Ontario process or legacy customer claim.',
          'Re-audit the entity, platform, payout route and excluded countries on launch day.',
        ],
        firmSlugs: ['myforexfunds'],
        guideSlugs: ['prop-firm-legal-check', 'prop-firm-payout-proof'],
        sources: [
          { label: 'CFTC Special Master report and recommendation', url: 'https://www.cftc.gov/media/12106/ogc_KazmiReportRecommendationSactions051325/download', type: 'Court record' },
          { label: 'CFTC Acting Chairman statement on court sanctions', url: 'https://www.cftc.gov/PressRoom/PressReleases/9074-25', type: 'Regulator' },
          { label: 'Finance Magnates dismissal and sanctions report', url: 'https://www.financemagnates.com/forex/my-forex-funds-parent-defeats-cftc-in-court-as-judge-imposes-sanctions/', type: 'Financial press' },
          { label: 'Bloomberg Ontario asset-release report', url: 'https://www.bloomberg.com/news/articles/2025-12-08/simulated-trading-firm-myforexfunds-clears-legal-hurdle-to-restart', type: 'Financial press' },
          { label: 'Current MyForexFunds Terms of Use', url: 'https://myforexfunds.com/terms-of-use/', type: 'Official source' },
        ],
      },
      {
        id: 'provider-dependency-closure-chain',
        topic: 'legal',
        eyebrow: 'Operational Dependency',
        title: 'Three closures show why the platform stack belongs in every legal audit',
        summary:
          'Funded Engineer, SurgeTrader and True Forex Funds followed different paths, but each file shows that a firm can lose trader access before its marketing footprint disappears.',
        finding:
          'Funded Engineer permanently closed on July 15, 2024 after earlier technology and brokerage disruption, announcing an intended bankruptcy filing without a complete pending-payout process. SurgeTrader ceased operations on May 24, 2024 after losing its Match-Trader relationship; its former domain is now parked. True Forex Funds lost MetaTrader access, attempted a cTrader return, then announced permanent insolvency closure on May 14, 2024. These histories do not prove that every provider change causes insolvency. They do prove that platform and broker continuity are material operating facts that should sit beside entity and payout checks.',
        whyItMatters:
          'Most comparison sites rank price, account size and profit split. A trader can still lose access when the firm no longer controls a viable platform, broker route, technology license or payment flow.',
        actions: [
          'Identify the current platform and broker or execution dependency for the exact program.',
          'Check whether the terms explain account migration, service interruption and refund treatment.',
          'Treat a parked domain or dead dashboard as stronger status evidence than an old review score.',
        ],
        firmSlugs: ['funded-engineer', 'surgetrader', 'true-forex-funds'],
        guideSlugs: ['prop-firm-legal-check', 'prop-firm-payout-proof'],
        sources: [
          { label: 'Finance Magnates Funded Engineer closure report', url: 'https://www.financemagnates.com/forex/breaking-prop-trading-firm-funded-engineer-shuts-down/', type: 'Financial press' },
          { label: 'Finance Magnates SurgeTrader license-termination report', url: 'https://www.financemagnates.com/forex/exclusive-match-trader-terminates-prop-firm-surgetraders-license/', type: 'Financial press' },
          { label: 'Finance Magnates SurgeTrader closure report', url: 'https://www.financemagnates.com/forex/prop-firm-surgetrader-shuts-down-a-week-after-losing-match-trader-license/', type: 'Financial press' },
          { label: 'FX News Group True Forex Funds platform-loss report', url: 'https://fxnewsgroup.com/forex-news/retail-forex/exclusive-prop-trading-firm-true-forex-funds-shut-down-by-metaquotes-move/', type: 'Financial press' },
          { label: 'FX News Group True Forex Funds insolvency closure', url: 'https://fxnewsgroup.com/forex-news/retail-forex/prop-firm-true-forex-funds-folds/', type: 'Financial press' },
        ],
      },
      {
        id: 'the-funded-trader-legacy-obligations',
        topic: 'payout',
        eyebrow: 'Recovery Watch',
        title: 'The Funded Trader: a live website does not settle the legacy payout file',
        summary:
          'The firm returned after its March 2024 pause, but financial press continued to document partial account restoration, delayed payouts and recovery promises through late 2024.',
        finding:
          'Finance Magnates documented the March 28 pause, an incomplete-looking return in April, partial recovery claims in August and roughly 900 traders still awaiting payouts in November 2024. The company also described earlier payout-to-revenue ratios as unsustainable. The current site and terms identify an active simulated service, but PropRadar found no independent public reconciliation proving that every pre-pause trader payout, affiliate balance and account-restoration claim was resolved. The current offer and the legacy obligation file must therefore stay separate.',
        whyItMatters:
          'Operational recovery is not binary. A firm can resume sales while old claims, changed payout mechanics and stricter legal terms still affect the risk decision.',
        actions: [
          'Ask support in writing whether any current account is affected by legacy recovery rules.',
          'Read the present refund, arbitration and prohibited-strategy clauses before checkout.',
          'Do not treat company payout percentages as a complete independent reconciliation.',
        ],
        firmSlugs: ['the-funded-trader'],
        guideSlugs: ['prop-firm-payout-proof', 'prop-firm-avis-reddit-trustpilot'],
        sources: [
          { label: 'The Funded Trader current Terms of Use', url: 'https://www.thefundedtraderprogram.com/terms-of-use/index.html', type: 'Official source' },
          { label: 'Finance Magnates April 2024 operational check', url: 'https://www.financemagnates.com/forex/prop-trading-firm-the-funded-trader-is-online-but-is-it-fully-operational/', type: 'Financial press' },
          { label: 'Finance Magnates August 2024 recovery update', url: 'https://www.financemagnates.com/forex/prop-trading-the-funded-trader-resurfaces-five-months-after-pausing-operations/', type: 'Financial press' },
          { label: 'Finance Magnates November 2024 payout-backlog report', url: 'https://www.financemagnates.com/forex/prop-firm-the-funded-trader-resumes-paused-accounts-as-900-traders-await-payouts/', type: 'Financial press' },
        ],
      },
      {
        id: 'closure-evidence-over-old-reviews',
        topic: 'payout',
        eyebrow: 'Archive Discipline',
        title: 'Skilled Funded Traders: closure evidence must outrank old search results',
        summary:
          'The March 2024 suspension is supported by two financial-industry publications, while the exact Easton relationship and final trader-obligation record remain incomplete.',
        finding:
          'Finance Magnates and FX News Group both documented Skilled Funded Traders suspending operations and new purchases on March 28, 2024. Finance Magnates described Easton control; FX News Group described an affiliation while noting that the exact ownership or white-label relationship was unclear. That distinction remains visible in PropRadar. The profile is not a current offer, and no complete public file proves that every payout or refund obligation was resolved.',
        whyItMatters:
          'Google can continue to surface old forex, stocks, funding and review pages after a firm closes. A dated answer protects users from mistaking indexed history for current availability.',
        actions: [
          'Match the exact skilledfundedtraders.com domain before using historical evidence.',
          'Use archived terms, invoices and payment records for any unresolved claim.',
          'Do not let old ratings or affiliate pages override the dated shutdown evidence.',
        ],
        firmSlugs: ['skilled-funded-traders'],
        guideSlugs: ['prop-firm-payout-proof', 'prop-firm-legal-check'],
        sources: [
          { label: 'Finance Magnates Skilled Funded Traders shutdown report', url: 'https://www.financemagnates.com/forex/easton-controlled-skilled-funded-trader-suspends-prop-trading-operations/', type: 'Financial press' },
          { label: 'FX News Group Skilled Funded Traders shutdown report', url: 'https://fxnewsgroup.com/forex-news/retail-forex/skilled-funded-traders-becomes-second-easton-prop-firm-shut/', type: 'Financial press' },
        ],
      },
    ],
  },
  {
    slug: 'prop-firm-risk-brief-july-15-2026',
    issueNumber: 1,
    title: 'Prop Firm Risk Brief: Consistency Rules, Closure Files and Legal Structure',
    shortTitle: 'Consistency rules, closure files and legal structure',
    description:
      'Current Topstep vs Apex rule paths, the MyFundedFX and Skilled Funded Traders closure files, and a broker-linked legal-structure check.',
    dek:
      'Four evidence-backed checks for this week: compare futures payout paths before price, treat closure evidence as stronger than old reviews, and separate a prop entity from its wider broker group.',
    publishedAt: '2026-07-15T08:00:00.000Z',
    updatedAt: '2026-07-15T13:30:00.000Z',
    researchCutoff: '2026-07-15',
    readMinutes: 9,
    keywords: [
      'prop firm news',
      'prop firm rule changes',
      'prop firm payout alerts',
      'Topstep vs Apex',
      'MyFundedFX closed',
      'Skilled Funded Traders closed',
      'Hantec Trader regulation',
    ],
    image16x9: '/guides/prop-firm-legal-due-diligence-16x9.jpg',
    image4x3: '/guides/prop-firm-legal-due-diligence-4x3.jpg',
    image1x1: '/guides/prop-firm-legal-due-diligence-1x1.jpg',
    imageAlt: 'Legal due-diligence dossier connecting entity, jurisdiction and contract evidence',
    imageCaption:
      'The first PropRadar Risk Brief compares rules, closure proof and the entity behind each prop service.',
    sections: [
      {
        id: 'topstep-apex-payout-rules',
        topic: 'rules',
        eyebrow: 'Rule Watch',
        title: 'Topstep vs Apex: the payout-rule comparison matters more than the entry fee',
        summary:
          'Both brands are highly visible in futures, but their decision risk sits in trailing drawdown, consistency and withdrawal eligibility rather than the advertised account size.',
        finding:
          'PropRadar currently scores Topstep above Apex on overall reliability. That is not a promise of payout. Topstep now documents a 50% Trading Combine consistency target and separate Express Funded Account paths. Apex separates newer EOD and intraday products from legacy accounts, while its risk disclosure states that it is not a broker or futures commission merchant. The exact account version must therefore be identified before comparing either firm.',
        whyItMatters:
          'A large discount can reduce the entry fee without reducing the chance of a rule violation. The useful comparison is the exact payout route for the selected account, not the headline promotion.',
        actions: [
          'Open the current rules for the exact account type, not only the pricing page.',
          'Compare trailing drawdown, consistency and payout eligibility on the same line.',
          'Save a dated copy of the rules used for the purchase decision.',
        ],
        firmSlugs: ['topstep', 'apex-trader-funding'],
        guideSlugs: ['topstep-vs-apex', 'prop-firm-sans-consistency-rule'],
        sources: [
          { label: 'Topstep consistency rules', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep', type: 'Official source' },
          { label: 'Topstep payout policy', url: 'https://help.topstep.com/en/articles/8284233-topstep-payout-policy', type: 'Official source' },
          { label: 'Apex Trader Funding risk disclosure', url: 'https://apextraderfunding.com/risk-disclosure/', type: 'Official source' },
          { label: 'Apex EOD Performance Account rules', url: 'https://apextraderfunding.com/help-center/eod-trailing-drawdown-accounts/eod-performance-accounts-pa/', type: 'Official source' },
          { label: 'Apex Intraday Performance Account rules', url: 'https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-performance-accounts-pa/', type: 'Official source' },
        ],
      },
      {
        id: 'myfundedfx-closure-proof',
        topic: 'payout',
        eyebrow: 'Payout Watch',
        title: 'MyFundedFX is a closure case, not an old-review opportunity',
        summary:
          'The current MyFundedFX domain destination states that Seacrest Markets no longer operates. That live operational signal outweighs historical ratings and old comparison pages.',
        finding:
          'The redirected closure page names Seacrest Markets (PTY) Ltd in South Africa and displays company and FSP details, but it does not present an active prop-firm product. PropRadar therefore keeps MyFundedFX as a prevention archive with a critical payout-risk status and no purchase recommendation.',
        whyItMatters:
          'Search results, old reviews and affiliate pages can remain visible after a service closes. A trader checking only reputation history could mistake stale popularity for current availability.',
        actions: [
          'Do not buy, renew or send payment through a third-party page using the old brand.',
          'Use the current domain destination as the first operational-status check.',
          'Treat any claimed successor or clone as unverified until its entity and terms are matched.',
        ],
        firmSlugs: ['myfundedfx'],
        guideSlugs: ['prop-firm-payout-proof'],
        sources: [
          { label: 'MyFundedFX / Seacrest Markets closure page', url: 'https://myfundedfx.com/', type: 'Official source' },
        ],
      },
      {
        id: 'skilled-funded-traders-closure',
        topic: 'payout',
        eyebrow: 'Closure File',
        title: 'Skilled Funded Traders: the March 2024 shutdown now has a press-backed timeline',
        summary:
          'Finance Magnates and FX News Group documented the immediate suspension of operations and new purchases on March 28, 2024. Old product and review pages should not be read as a current offer.',
        finding:
          'The two financial-industry reports connect the shutdown to an Easton-linked structure, although FX News Group noted that the exact ownership or white-label relationship was unclear. Finance Magnates also reported payout-denial and trading-issue complaints around the closure period. PropRadar therefore classifies Skilled Funded Traders as closed and keeps unresolved trader obligations as an archive question, not a purchase decision.',
        whyItMatters:
          'Search demand can outlive an operator. A direct answer with a dated closure timeline protects traders from stale forex, stocks, funding and review pages while giving Google a clearer current-status result.',
        actions: [
          'Treat the firm as closed and do not use old checkout or affiliate pages.',
          'Match any historical claim to the skilledfundedtraders.com domain and a dated account record.',
          'Use archived terms, payment records and direct case evidence for unresolved payout or refund claims.',
        ],
        firmSlugs: ['skilled-funded-traders'],
        guideSlugs: ['prop-firm-payout-proof', 'prop-firm-legal-check'],
        sources: [
          { label: 'Finance Magnates shutdown report', url: 'https://www.financemagnates.com/forex/easton-controlled-skilled-funded-trader-suspends-prop-trading-operations/', type: 'Financial press' },
          { label: 'FX News Group shutdown report', url: 'https://fxnewsgroup.com/forex-news/retail-forex/skilled-funded-traders-becomes-second-easton-prop-firm-shut/', type: 'Financial press' },
        ],
      },
      {
        id: 'hantec-trader-legal-structure',
        topic: 'legal',
        eyebrow: 'Legal Lens',
        title: 'Hantec Trader: a broker-linked brand does not automatically provide broker protection',
        summary:
          'The wider Hantec name is familiar, but the prop service identifies a separate Mauritius entity and describes simulated accounts with virtual funds.',
        finding:
          'Hantec Trader states that it does not conduct regulated activities, is not a broker, does not accept deposits and is not regulated by the FCA. Its disclosed prop entity is Hantec Trader Limited in Mauritius. The association with Hantec Markets is relevant context, but it should not be presented as direct regulatory protection for the prop account.',
        whyItMatters:
          'Brand familiarity can create a false shortcut in due diligence. The legal question is which entity provides the exact product and which protections, if any, apply to that relationship.',
        actions: [
          'Match the checkout entity with the current footer and terms before paying.',
          'Read simulated-account and jurisdiction restrictions for the selected program.',
          'Do not describe a prop reward as a protected brokerage withdrawal.',
        ],
        firmSlugs: ['hantec-trader'],
        guideSlugs: ['prop-firm-legal-check'],
        sources: [
          { label: 'Official Hantec Trader site and disclaimer', url: 'https://hantectrader.com/', type: 'Official source' },
          { label: 'Hantec Trader rules and help center', url: 'https://help.htrader.hmarkets.com/', type: 'Official source' },
        ],
      },
    ],
  },
];

export const latestEditorialBrief = editorialBriefs[0];

export function getEditorialBriefBySlug(slug: string) {
  return editorialBriefs.find((brief) => brief.slug === slug);
}

export function getEditorialBriefPath(briefOrSlug: EditorialBrief | string) {
  const slug = typeof briefOrSlug === 'string' ? briefOrSlug : briefOrSlug.slug;
  return `/radar-brief/${slug}`;
}
