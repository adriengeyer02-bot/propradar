export type EditorialBriefTopic = 'rules' | 'payout' | 'legal';

export type EditorialBriefSource = {
  label: string;
  url: string;
  type: 'Official source' | 'Regulator' | 'Financial press';
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
  sections: EditorialBriefSection[];
};

export const editorialBriefs: EditorialBrief[] = [
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
