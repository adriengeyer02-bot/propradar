import { toEnglishText } from './i18n';
import { propFirms, topFirms, type PropFirm } from './propFirms';

export const SEO_RESEARCH_DATE = '2026-07-15';

export type SearchIntent =
  | 'choisir'
  | 'comparer'
  | 'regles'
  | 'risque'
  | 'style'
  | 'promo';

export type SearchCluster = {
  label: string;
  intent: SearchIntent;
  queries: string[];
  pageSlug: string;
  priority: number;
};

export type SeoGuide = {
  slug: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intent: SearchIntent;
  demandSignal: string;
  answer: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  checks: string[];
  faq: { question: string; answer: string }[];
  internalLinks: { label: string; href: string }[];
  focusFirmSlugs?: string[];
};

export const searchClusters: SearchCluster[] = [
  {
    label: 'Best prop firm',
    intent: 'choisir',
    queries: ['what are the best prop firms right now', 'best prop firm', 'most reliable prop firm', 'prop firm ranking'],
    pageSlug: 'meilleure-prop-firm-2026',
    priority: 0.96,
  },
  {
    label: 'Futures funding',
    intent: 'choisir',
    queries: ['best futures prop firm', 'futures prop firm', 'Topstep vs Apex', 'prop firm futures payout'],
    pageSlug: 'meilleure-prop-firm-futures',
    priority: 0.94,
  },
  {
    label: 'Rules and constraints',
    intent: 'regles',
    queries: ['no consistency rule prop firm', 'prop firms without consistency rule', 'what is consistency rule in prop firm', 'prop firm without consistency rule'],
    pageSlug: 'prop-firm-sans-consistency-rule',
    priority: 0.92,
  },
  {
    label: 'News trading',
    intent: 'style',
    queries: ['which prop firms allow news trading', 'prop firm news trading allowed', 'can you trade news with a prop firm'],
    pageSlug: 'prop-firm-news-trading',
    priority: 0.9,
  },
  {
    label: 'Payout',
    intent: 'risque',
    queries: ['fast payout prop firm', 'prop firm payout proof', 'fast withdrawal prop firm', 'prop firm payout problem'],
    pageSlug: 'prop-firm-payout-rapide',
    priority: 0.9,
  },
  {
    label: 'Budget',
    intent: 'promo',
    queries: ['cheap prop firm', 'low-cost prop firm', 'prop firm discount code', 'prop firm promo code'],
    pageSlug: 'prop-firm-pas-cher',
    priority: 0.88,
  },
  {
    label: 'SMC / ICT',
    intent: 'style',
    queries: ['prop firm SMC', 'prop firm ICT trader', 'best prop firm for SMC day trading'],
    pageSlug: 'prop-firm-smc-ict',
    priority: 0.86,
  },
  {
    label: 'Swing trading',
    intent: 'style',
    queries: ['prop firm swing trading', 'prop firm hold overnight', 'prop firm hold weekend'],
    pageSlug: 'prop-firm-swing-trading',
    priority: 0.86,
  },
  {
    label: 'EA / Algo',
    intent: 'style',
    queries: ['prop firm EA allowed', 'prop firm algo trading', 'prop firm bot allowed'],
    pageSlug: 'prop-firm-ea-algo',
    priority: 0.84,
  },
  {
    label: 'FTMO vs The5ers',
    intent: 'comparer',
    queries: ['FTMO vs The5ers', 'FTMO or The5ers', 'The5ers vs FTMO review', 'best forex prop firm'],
    pageSlug: 'ftmo-vs-the5ers',
    priority: 0.82,
  },
  {
    label: 'Topstep vs Apex',
    intent: 'comparer',
    queries: ['Topstep vs Apex', 'Apex vs Topstep', 'best futures prop firm', 'Apex Trader Funding promo'],
    pageSlug: 'topstep-vs-apex',
    priority: 0.82,
  },
  {
    label: 'FunderPro vs The5ers',
    intent: 'comparer',
    queries: ['FunderPro vs The5ers', 'FunderPro review', 'The5ers discount code', 'prop firm EA news trading'],
    pageSlug: 'funderpro-vs-the5ers',
    priority: 0.8,
  },
  {
    label: 'Leveraged reviews',
    intent: 'risque',
    queries: ['Leveraged prop firm review', 'Get Leveraged review', 'getleveraged.com Trustpilot', 'Leveraged payout'],
    pageSlug: 'leveraged-prop-firm-avis',
    priority: 0.79,
  },
  {
    label: 'Reliability / scam',
    intent: 'risque',
    queries: ['reliable prop firm', 'prop firm scam', 'prop firm Trustpilot', 'prop firm reviews'],
    pageSlug: 'prop-firm-fiable-trustpilot',
    priority: 0.89,
  },
  {
    label: 'GOAT Funded Trader review',
    intent: 'risque',
    queries: ['Goat Funded Trader review', 'GFT prop firm review', 'Goat Funded Trader discount code', 'Goat Funded Trader payout'],
    pageSlug: 'goat-funded-trader-avis',
    priority: 0.88,
  },
  {
    label: 'Instant funding',
    intent: 'choisir',
    queries: ['prop firm instant funding', 'instant funding prop firm', 'instant funded account', 'instant account prop firm'],
    pageSlug: 'prop-firm-instant-funding',
    priority: 0.87,
  },
  {
    label: 'No challenge',
    intent: 'choisir',
    queries: ['no challenge prop firm', 'prop firm without challenge', 'funded trading no challenge', 'funded trader no challenge'],
    pageSlug: 'prop-firm-sans-challenge',
    priority: 0.85,
  },
  {
    label: 'Beginner',
    intent: 'choisir',
    queries: ['prop firm for beginners', 'best prop firm for beginners', 'easy prop firm', 'first prop firm challenge'],
    pageSlug: 'prop-firm-pour-debutant',
    priority: 0.84,
  },
  {
    label: 'Forex',
    intent: 'choisir',
    queries: ['best forex prop firm', 'forex prop firm', 'prop firm MT5', 'prop firm cTrader'],
    pageSlug: 'meilleure-prop-firm-forex',
    priority: 0.83,
  },
  {
    label: 'Alternatives FTMO',
    intent: 'comparer',
    queries: ['FTMO alternatives', 'FTMO alternative', 'prop firm like FTMO', 'FTMO vs Funding Pips'],
    pageSlug: 'alternatives-ftmo',
    priority: 0.82,
  },
  {
    label: 'Reddit and Trustpilot reviews',
    intent: 'risque',
    queries: ['prop firm Reddit reviews', 'prop firm Trustpilot reviews', 'prop firm scam reddit', 'prop firm reviews'],
    pageSlug: 'prop-firm-avis-reddit-trustpilot',
    priority: 0.81,
  },
  {
    label: 'Payout proof',
    intent: 'risque',
    queries: ['prop firm payout proof', 'prop firm that actually pays', 'prop firm payout problem', 'prop firm payout evidence'],
    pageSlug: 'prop-firm-payout-proof',
    priority: 0.8,
  },
  {
    label: 'Legal check',
    intent: 'risque',
    queries: ['prop firm legal check', 'prop firm regulation', 'is my prop firm regulated', 'prop firm legal entity'],
    pageSlug: 'prop-firm-legal-check',
    priority: 0.84,
  },
];

export const seoGuides: SeoGuide[] = [
  {
    slug: 'meilleure-prop-firm-2026',
    title: 'Best prop firm 2026: a risk-first ranking',
    metaDescription:
      'Compare the best prop firms by score, payout reliability, price, filtered Trustpilot signal, Reddit feedback, rules, platforms and pre-purchase risk points.',
    eyebrow: 'Main SEO guide',
    h1: 'Best prop firm: the ranking starts with risk, not marketing',
    intent: 'choisir',
    demandSignal: 'Broad and competitive search: traders want a quick answer first, then proof and risk context.',
    answer:
      'The best prop firm is not always the one showing the biggest split or discount. A useful choice combines readable rules, credible payouts, reasonable total cost, the right platform and enough operating history.',
    primaryKeywords: ['best prop firm', 'most reliable prop firm', 'prop firm ranking'],
    secondaryKeywords: ['prop firm reviews', 'prop firm payout', 'prop firm Trustpilot', 'prop firm comparison'],
    checks: [
      'Check the PropRadar score and payout risk before looking at price.',
      'Compare drawdown, profit targets and minimum trading days.',
      'Read the official sources saved on each firm profile.',
      'Separate Trustpilot reviews from Reddit feedback and payout incidents.',
    ],
    faq: [
      {
        question: 'What is the best prop firm to start with?',
        answer:
          'Start with a firm that has readable rules, reasonable pricing, lower payout risk and a stable public track record. The right choice also depends on your market and trading style.',
      },
      {
        question: 'Is a prop firm with a big discount better?',
        answer:
          'No. A discount lowers the entry cost, but it does not compensate for dangerous withdrawal rules, unclear drawdown or high payout risk.',
      },
    ],
    internalLinks: [
      { label: 'Full comparator', href: '/comparateur' },
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Current deals', href: '/promos' },
    ],
    focusFirmSlugs: [
      'ftmo',
      'the5ers',
      'topstep',
      'fundednext',
      'audacity-capital',
      'fintokei',
      'brightfunded',
      'funded-trading-plus',
      'goat-funded-trader',
      'aqua-funded',
      'alpha-capital-group',
      'maven-trading',
      'trade-the-pool',
    ],
  },
  {
    slug: 'meilleure-prop-firm-futures',
    title: 'Best futures prop firms: Topstep, Apex, TPT and alternatives',
    metaDescription:
      'Compare futures prop firms by payout rules, trailing drawdown, fees, platforms and recent risk signals across Topstep, Apex, TPT and alternatives.',
    eyebrow: 'Futures funding',
    h1: 'Best futures prop firm: compare payout, drawdown and hidden fees',
    intent: 'choisir',
    demandSignal: 'Futures searches often mix Topstep, Apex, payout rules, drawdown and discount codes.',
    answer:
      'In futures, the best choice depends mainly on drawdown, funded-account fees, payout caps and platform stability.',
    primaryKeywords: ['best futures prop firm', 'futures prop firm', 'Topstep vs Apex'],
    secondaryKeywords: ['Apex Trader Funding', 'Take Profit Trader', 'MyFundedFutures', 'futures payout'],
    checks: [
      'Identify EOD drawdown, trailing drawdown or buffer rules.',
      'Compare funded-account fees and recurring fees.',
      'Check payout caps and the required number of days between withdrawals.',
      'Be careful with very strong discounts when rules keep changing.',
    ],
    faq: [
      {
        question: 'Topstep or Apex: which one should you check first?',
        answer:
          'Topstep can be easier to read for many traders, while Apex can be attractive during promotions. The choice should be based on current rules, not only price.',
      },
      {
        question: 'Are futures prop firms suitable for scalping?',
        answer:
          'Yes for some profiles, but you must check platforms, data feeds, intraday drawdown and payout conditions.',
      },
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'Futures deals', href: '/promos' },
      { label: 'Rules to verify', href: '/regles' },
    ],
    focusFirmSlugs: [
      'topstep',
      'apex-trader-funding',
      'take-profit-trader',
      'myfundedfutures',
      'tradeify',
      'earn2trade',
      'oneup-trader',
      'elite-trader-funding',
      'tickticktrader',
      'leeloo-trading',
      'uprofit-trader',
      'bulenox',
      'funded-futures-network',
      'daytraders-com',
      'fast-track-trading',
    ],
  },
  {
    slug: 'prop-firm-sans-consistency-rule',
    title: 'Prop firm without consistency rule: what to verify',
    metaDescription:
      'Find a prop firm without a consistency rule or with flexible rules: payout, drawdown, targets, news and hidden conditions.',
    eyebrow: 'Rules search',
    h1: 'Prop firm without consistency rule: the real risk is often somewhere else',
    intent: 'regles',
    demandSignal: 'Highly transactional search: the trader wants to avoid a rule that blocks payout.',
    answer:
      'No consistency rule can be an advantage, but it must be compared with drawdown, minimum payout, news restrictions and funded-stage fees.',
    primaryKeywords: ['prop firm without consistency rule', 'prop firm no consistency', 'no consistency rule'],
    secondaryKeywords: ['minimum payout', 'trailing drawdown', 'static drawdown', 'prop firm rules'],
    checks: [
      'Check each product, not only the marketing page.',
      'Verify minimum payout and required trading days.',
      'Compare drawdown rules: trailing drawdown can be harder than a consistency rule.',
      'Reread news, rollover, copy trading and EA restrictions.',
    ],
    faq: [
      {
        question: 'Is a prop firm without consistency rule always better?',
        answer:
          'Not always. Some firms compensate with stricter drawdown, higher fees or harder withdrawal conditions.',
      },
      {
        question: 'How does PropRadar identify consistency rules?',
        answer:
          'The exact program must be read, not only the marketing page. Some firms change rules by account type, challenge/funded stage or account size.',
      },
    ],
    internalLinks: [
      { label: 'Rules page', href: '/regles' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Payout risks', href: '/risques-payout' },
    ],
    focusFirmSlugs: ['brightfunded', 'maven-trading', 'city-traders-imperium'],
  },
  {
    slug: 'prop-firm-news-trading',
    title: 'Prop firm news trading allowed: list and risks',
    metaDescription:
      'Which prop firms allow news trading? PropRadar guide to restrictions, spreads, slippage, payout and rules to reread.',
    eyebrow: 'News trading',
    h1: 'Prop firm news trading: allowed does not mean risk-free',
    intent: 'style',
    demandSignal: 'Traders often search for a firm compatible with NFP, CPI, FOMC or macro releases.',
    answer:
      'To trade news with a prop firm, check explicit permission, slippage, platforms, daily drawdown and payout exclusions.',
    primaryKeywords: ['prop firm news trading allowed', 'prop firm trading news', 'news trading prop firm'],
    secondaryKeywords: ['NFP prop firm', 'CPI trading challenge', 'FOMC prop firm', 'slippage prop firm'],
    checks: [
      'Verify whether news trading is allowed in both challenge and funded stages.',
      'Check restrictions around red-folder events.',
      'Evaluate daily drawdown before trading a spike.',
      'Read payout conditions linked to trades around news.',
    ],
    faq: [
      {
        question: 'Can you trade NFP with a prop firm?',
        answer:
          'Sometimes yes, sometimes no. Some firms allow news, while others restrict it in funded accounts or around major releases.',
      },
      {
        question: 'What is the main risk of news trading with a prop firm?',
        answer:
          'The main risk is breaching a timing, drawdown or payout rule even when the trade is profitable.',
      },
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'Official rules', href: '/regles' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
    focusFirmSlugs: ['ftmo', 'brightfunded', 'the5ers'],
  },
  {
    slug: 'prop-firm-payout-rapide',
    title: 'Fast payout prop firm: withdrawals, proof and traps',
    metaDescription:
      'Guide to prop firms with fast payout: delay, withdrawal proof, payout risk, caps and conditions before paying for a challenge.',
    eyebrow: 'Payout search',
    h1: 'Fast payout prop firm: check proof, not only the promise',
    intent: 'risque',
    demandSignal: 'Payout searches capture traders close to purchase or already worried about withdrawals.',
    answer:
      'Fast payout matters only when conditions are clear: minimum amount, trading days, caps, split, reviews and incident history.',
    primaryKeywords: ['fast payout prop firm', 'prop firm payout proof', 'prop firm withdrawal'],
    secondaryKeywords: ['24h payout prop firm', 'payout problem', 'payout denial', 'withdrawal proof'],
    checks: [
      'Compare advertised delay with community signals.',
      'Check minimum withdrawal amount and payout caps.',
      'Read payout incidents and repeated complaints.',
      'Do not confuse a marketing certificate with independent proof.',
    ],
    faq: [
      {
        question: 'Is a 24h payout reliable?',
        answer:
          'It can be, but conditions and history must be verified. The advertised delay is not enough to measure risk.',
      },
      {
        question: 'Why does payout risk matter so much?',
        answer:
          'Because a prop firm that looks profitable on paper becomes useless when withdrawals are difficult, delayed or disputed.',
      },
    ],
    internalLinks: [
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Source audit', href: '/audit' },
      { label: 'Filtered Trustpilot', href: '/trustpilot-prop-firms' },
    ],
  },
  {
    slug: 'prop-firm-pas-cher',
    title: 'Cheap prop firm: discount codes and real cost',
    metaDescription:
      'Compare cheap prop firms by entry price, discount code, drawdown, payout rules and funded-stage fees so a low-cost challenge does not hide higher risk.',
    eyebrow: 'Budget and deals',
    h1: 'Cheap prop firm: the challenge fee is not the total cost',
    intent: 'promo',
    demandSignal: 'Budget searches convert well, but they also attract impulsive purchases.',
    answer:
      'A cheap prop firm can be interesting when payout remains credible and funded fees, resets, drawdown and restrictions do not make the account too fragile.',
    primaryKeywords: ['cheap prop firm', 'low-cost prop firm', 'prop firm discount code'],
    secondaryKeywords: ['prop firm discount', 'cheap challenge', 'prop firm promo', 'challenge price'],
    checks: [
      'Compare entry price with funded-stage fees.',
      'Check whether the promotion changes conditions.',
      'Do not choose a larger account size only because of a discount.',
      'Cross-check budget, payout and score before buying.',
    ],
    faq: [
      {
        question: 'Which prop firm is the cheapest?',
        answer:
          'The cheapest firm changes often with promotions. Compare the entry fee with funded-stage fees, resets, drawdown and payout risk.',
      },
      {
        question: 'Does a PropRadar discount code change the ranking?',
        answer:
          'No. Affiliate links and deals are separated from scoring.',
      },
    ],
    internalLinks: [
      { label: 'Current deals', href: '/promos' },
      { label: 'Price comparator', href: '/comparateur' },
      { label: 'Reliable top firms', href: '/meilleures-prop-firms' },
    ],
  },
  {
    slug: 'prop-firm-smc-ict',
    title: 'Best prop firm for SMC / ICT traders',
    metaDescription:
      'PropRadar guide for SMC and ICT traders: drawdown, sessions, news, payout, forex, futures and rules to avoid.',
    eyebrow: 'Style SMC / ICT',
    h1: 'Prop firm for SMC / ICT: seek flexibility without losing risk control',
    intent: 'style',
    demandSignal: 'SMC/ICT traders mainly search for session compatibility, news rules, drawdown and execution.',
    answer:
      'For SMC/ICT, the right firm must let intraday setups breathe without opaque news, drawdown or payout rules.',
    primaryKeywords: ['prop firm SMC', 'prop firm ICT', 'best prop firm SMC'],
    secondaryKeywords: ['day trading prop firm', 'forex prop firm', 'New York session', 'London session'],
    checks: [
      'Check restrictions around London/NY sessions and news.',
      'Avoid overly tight trailing drawdown for multiple entries.',
      'Compare spread, platform and execution.',
      'Check minimum payout if the strategy targets several small gains.',
    ],
    faq: [
      {
        question: 'Does SMC work better with forex or futures prop firms?',
        answer:
          'Both can work. Forex gives more pairs, futures give a more standardized structure. Rules matter more than the label.',
      },
      {
        question: 'What is the main danger for an ICT trader in a prop firm?',
        answer:
          'Macro releases, daily drawdown and restrictions around news trading.',
      },
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'News trading', href: '/guides/prop-firm-news-trading' },
      { label: 'Rules', href: '/regles' },
    ],
    focusFirmSlugs: ['alpha-futures', 'lucid-trading', 'tradeify', 'ftmo', 'the5ers', 'funding-pips', 'fundednext'],
  },
  {
    slug: 'prop-firm-swing-trading',
    title: 'Prop firm swing trading : overnight, weekend et payout',
    metaDescription:
      'Compare prop firms for swing trading by overnight and weekend holding, news restrictions, drawdown, payout timing and account-specific rules.',
    eyebrow: 'Swing trading',
    h1: 'Prop firm swing trading: verify overnight, weekend and drawdown before price',
    intent: 'style',
    demandSignal: 'Swing traders search for fewer intraday constraints and more overnight/weekend tolerance.',
    answer:
      'For swing trading, you need a firm that allows longer holds, weekends or at least clear rollover and news rules.',
    primaryKeywords: ['prop firm swing trading', 'prop firm hold overnight', 'prop firm hold weekend'],
    secondaryKeywords: ['overnight prop firm', 'weekend holding', 'swing option', 'forex funded account'],
    checks: [
      'Verify overnight and weekend holding in challenge and funded stages.',
      'Understand whether drawdown is static, EOD or trailing.',
      'Read restrictions around gaps and news.',
      'Compare payout delay with average trade duration.',
    ],
    faq: [
      {
        question: 'Do all prop firms allow swing trading?',
        answer:
          'No. Some limit overnight, weekend or news trading. The exact program must be reread.',
      },
      {
        question: 'Which drawdown is better for swing trading?',
        answer:
          'Static or EOD drawdown is often easier to read than strict intraday trailing drawdown.',
      },
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
    ],
  },
  {
    slug: 'prop-firm-ea-algo',
    title: 'Prop firm EA allowed: bots, algo and copy trading',
    metaDescription:
      'Find prop firms that allow EAs, bots and algo trading, then compare VPS, copy-trading, arbitrage, news and payout restrictions before buying.',
    eyebrow: 'EA / Algo',
    h1: 'Prop firm EA allowed: permission, restrictions and payout risk',
    intent: 'style',
    demandSignal: 'Algo traders search for clear permission, but exceptions are often hidden in small print.',
    answer:
      'An EA-compatible firm must explicitly allow bots and clarify copy trading, arbitrage, latency, news and withdrawal conditions.',
    primaryKeywords: ['prop firm EA allowed', 'prop firm algo trading', 'prop firm bot allowed'],
    secondaryKeywords: ['copy trading prop firm', 'VPS prop firm', 'arbitrage prop firm', 'robot trading'],
    checks: [
      'Verify EA permission in challenge and funded stages.',
      'Read restrictions around arbitrage, latency, grid, martingale and copy trading.',
      'Test the platform before taking a large account size.',
      'Watch payout clauses linked to the strategy.',
    ],
    faq: [
      {
        question: 'Can you use a bot with a prop firm?',
        answer:
          'Yes with some firms, but with restrictions. Permission must be confirmed in the official rules.',
      },
      {
        question: 'Is copy trading always allowed?',
        answer:
          'No. Many firms strongly restrict it, especially between accounts owned by different people.',
      },
    ],
    internalLinks: [
      { label: 'Rules', href: '/regles' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  {
    slug: 'prop-firm-fiable-trustpilot',
    title: 'Reliable prop firm: Trustpilot, Reddit and proof',
    metaDescription:
      'How to identify a reliable prop firm: Trustpilot, Reddit, payout proof, official sources and conflicts of interest.',
    eyebrow: 'Trust',
    h1: 'Reliable prop firm: do not confuse a good rating with solid proof',
    intent: 'risque',
    demandSignal: 'Users often search for reviews, scam signals, Trustpilot and Reddit before paying.',
    answer:
      'A reliable prop firm combines transparent rules, official sources, payout history, coherent community feedback and disclosed commercial conflicts.',
    primaryKeywords: ['reliable prop firm', 'prop firm reviews', 'prop firm Trustpilot'],
    secondaryKeywords: ['prop firm scam', 'Reddit prop firm', 'prop firm review', 'payout proof'],
    checks: [
      'Compare Trustpilot with Reddit and payout incidents.',
      'Verify that official sources are accessible.',
      'Look at review volume and context.',
      'Identify affiliate links and commercial conflicts.',
    ],
    faq: [
      {
        question: 'Is Trustpilot enough to judge a prop firm?',
        answer:
          'No. Trustpilot is useful, but it must be cross-checked with rules, Reddit, official sources and payouts.',
      },
      {
        question: 'Should every risky firm be ignored?',
        answer:
          'No, but they should be read as watchlist files. A risky firm can be active, but it should not be treated as an obvious purchase.',
      },
    ],
    internalLinks: [
      { label: 'Trustpilot prop firms', href: '/trustpilot-prop-firms' },
      { label: 'Audit', href: '/audit' },
      { label: 'Payout risks', href: '/risques-payout' },
    ],
  },
  {
    slug: 'ftmo-vs-the5ers',
    title: 'FTMO vs The5ers: rules, price and payout',
    metaDescription:
      'FTMO vs The5ers: compare current programs, prices, drawdown, payout rules, platforms, Trustpilot signals and official terms before choosing.',
    eyebrow: 'Brand comparison',
    h1: 'FTMO vs The5ers: two solid profiles, not the same use case',
    intent: 'comparer',
    demandSignal: 'Decision search: the user hesitates between two possible purchases and wants to know which one really fits.',
    answer:
      'FTMO and The5ers are two solid profiles, but they do not serve the same need. FTMO stands out for history, documentation and benchmark status. The5ers often speaks to careful traders who want clearer limits by program. The right choice depends on trading style, budget, accepted drawdown, news/EA restrictions and payout-rule comfort.',
    primaryKeywords: ['FTMO vs The5ers', 'FTMO or The5ers', 'The5ers vs FTMO review'],
    secondaryKeywords: ['FTMO payout', 'The5ers rules', 'prop firm compare', 'challenge forex'],
    checks: [
      'Compare minimum price and target account size.',
      'Read news, EA, drawdown and profit-target rules.',
      'Identify affiliate links, coupons and displayed commercial interests.',
      'Choose by trading style, not popularity alone.',
    ],
    faq: [
      {
        question: 'Is FTMO better than The5ers?',
        answer:
          'Not universally. FTMO is very well known, while The5ers can fit some profiles better. The exact program matters more than the name.',
      },
      {
        question: 'Does the affiliate link change this comparison?',
        answer:
          'No. PropRadar separates score, risks and commercial relationships.',
      },
    ],
    internalLinks: [
      { label: 'FTMO', href: '/firm/ftmo' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'Comparator', href: '/comparateur' },
    ],
    focusFirmSlugs: ['ftmo', 'the5ers'],
  },
  {
    slug: 'topstep-vs-apex',
    title: 'Topstep vs Apex: futures comparison',
    metaDescription:
      'Topstep vs Apex Trader Funding: compare futures, drawdown, payout, deals, platforms and risk signals.',
    eyebrow: 'Futures comparison',
    h1: 'Topstep vs Apex: the futures match is about rules and payout',
    intent: 'comparer',
    demandSignal: 'Futures decision search: real cost, drawdown, withdrawal conditions and payout trust before buying an evaluation.',
    answer:
      'Apex attracts traders with aggressive promotions and a wide choice of account sizes. Topstep leans on its established futures profile and a framework many traders find easier to identify. The match is not only about price: compare drawdown, recurring fees, payout caps, platforms and recent community feedback.',
    primaryKeywords: ['Topstep vs Apex', 'Apex vs Topstep', 'best futures prop firm'],
    secondaryKeywords: ['Apex Trader Funding promo', 'Topstep payout', 'futures funded account'],
    checks: [
      'Compare promotions and total cost after funded status.',
      'Check EOD/trailing drawdown and consistency rules.',
      'Read community signals and recent incidents.',
      'Choose by platform and intraday style.',
    ],
    faq: [
      {
        question: 'Is Apex cheaper than Topstep?',
        answer:
          'Apex often displays large promotions, but price must be compared with the full rules and fees.',
      },
      {
        question: 'Is Topstep more reliable?',
        answer:
          'It has a strong historical presence, but every trader must verify current conditions before buying.',
      },
    ],
    internalLinks: [
      { label: 'Topstep', href: '/firm/topstep' },
      { label: 'Apex Trader Funding', href: '/firm/apex-trader-funding' },
      { label: 'Futures deals', href: '/promos' },
    ],
    focusFirmSlugs: ['topstep', 'apex-trader-funding'],
  },
  {
    slug: 'funderpro-vs-the5ers',
    title: 'FunderPro vs The5ers: news, EA, swing and payout',
    metaDescription:
      'FunderPro vs The5ers comparison: current prices, checkout codes to verify, news trading, EA, swing options, score, legal profile and payout rules.',
    eyebrow: 'CFD comparison',
    h1: 'FunderPro vs The5ers: flexibility versus longer history',
    intent: 'comparer',
    demandSignal: 'Traders compare these firms for news trading, EA, swing trading and discount codes.',
    answer:
      'FunderPro can interest traders who want news/EA/swing flexibility. The5ers keeps a more established and cautious profile depending on the program.',
    primaryKeywords: ['FunderPro vs The5ers', 'FunderPro review', 'The5ers discount code'],
    secondaryKeywords: ['FunderPro discount code', 'The5ers coupon 1EIJ6PO', 'EA allowed', 'news trading allowed', 'swing option'],
    checks: [
      'Test the discount code at checkout without overbuying.',
      'Verify news, EA and overnight rules on the target program.',
      'Compare payout delay and withdrawal conditions.',
      'Read official rules for the exact program before choosing.',
    ],
    faq: [
      {
        question: 'Is FunderPro suitable for news trading?',
        answer:
          'The official page highlights news trading allowed, but the detailed program conditions must be verified.',
      },
      {
        question: 'Is The5ers more cautious?',
        answer:
          'The5ers has a longer history. That does not remove the need to read each program rule.',
      },
    ],
    internalLinks: [
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'Deals', href: '/promos' },
    ],
    focusFirmSlugs: ['funderpro', 'the5ers'],
  },
  {
    slug: 'leveraged-prop-firm-avis',
    title: 'Leveraged prop firm review: rules, payout and Trustpilot',
    metaDescription:
      'Leveraged / Get Leveraged review: programs, 80% split, 5k to 1M accounts, overnight, payout, unavailable Trustpilot score and checks before buying.',
    eyebrow: 'Brand review',
    h1: 'Leveraged prop firm review: a visible brand, but verify before buying',
    intent: 'risque',
    demandSignal:
      'Brand-trust search: Leveraged seriousness, payouts, applicable rules and the reason for the Trustpilot alert.',
    answer:
      'Leveraged is an active prop firm with portfolio programs, 5k to 1M accounts and an advertised 80% split. Before buying, verify the program rules, payout conditions and the Trustpilot alert that makes the public score unavailable.',
    primaryKeywords: ['Leveraged prop firm review', 'Get Leveraged review', 'getleveraged.com Trustpilot'],
    secondaryKeywords: ['Leveraged payout', 'Leveraged prop firm review', 'Leveraged rules', 'Portfolio Manager Simulation'],
    checks: [
      'Verify whether the selected offer is Jr, Sr, Executive or a Turbo/Crypto/Sprint/Classic product.',
      'Reread profit target, daily drawdown, max drawdown, overnight/weekend and payout frequency.',
      'Account for the Trustpilot alert: unavailable score and removed reviews reported.',
      'Cross-check displayed payouts with Discord, X, Reddit and official conditions before paying.',
    ],
    faq: [
      {
        question: 'Is Leveraged an active prop firm?',
        answer:
          'Yes, the official site presents active programs, a community, product pages and portfolio accounts. That does not validate payout reliability without cross-checking.',
      },
      {
        question: 'Why be cautious with Get Leveraged?',
        answer:
          'Trustpilot displays an unavailable score because of a guideline violation and indicates that reviews were removed. This is a signal to consider before buying.',
      },
    ],
    internalLinks: [
      { label: 'Leveraged profile', href: '/firm/get-leveraged' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Payout risks', href: '/risques-payout' },
    ],
    focusFirmSlugs: ['get-leveraged'],
  },
  {
    slug: 'goat-funded-trader-avis',
    title: 'GOAT Funded Trader Review: FIRSTGFT, BOGO40 and Payouts',
    metaDescription:
      'GOAT Funded Trader review: compare FIRSTGFT and BOGO40, 1-step, 2-step, 3-step and Instant rules, payout terms, news trading and key risks.',
    eyebrow: 'Brand review',
    h1: 'Goat Funded Trader review: strong offer, but reread the rules before buying',
    intent: 'risque',
    demandSignal:
      'Brand decision search: the trader wants to know whether GFT is reliable, which current code gives the better immediate value, which model to choose and which rules to verify before paying.',
    answer:
      'GOAT Funded Trader combines 1-step, 2-step, 3-step and Instant Funding models with two current official offers: FIRSTGFT gives new customers up to 50% off eligible plans, while BOGO40 gives 40% off and a conditional same-size account only after the first successful payout. Compare the exact model before choosing the code.',
    primaryKeywords: ['Goat Funded Trader review', 'GFT prop firm', 'Goat Funded Trader discount code'],
    secondaryKeywords: ['FIRSTGFT code', 'BOGO40 code', 'GFT payout', 'GFT instant funding', 'Goat Funded Trader rules'],
    checks: [
      'Compare FIRSTGFT and BOGO40 at checkout without selecting an oversized account.',
      'Compare 1 step, 2 step, 3 step and Instant because the rules are not identical.',
      'Verify news trading, weekend holding, lot size, daily loss, max loss and payout delay.',
      'Read recent feedback from the last 30 to 60 days across Reddit, Discord and X.',
      'Look for payout-denial examples and the most common rejection reasons on the exact program you want.',
    ],
    faq: [
      {
        question: 'Should I use FIRSTGFT or BOGO40 at GOAT Funded Trader?',
        answer:
          'FIRSTGFT is the simpler new-customer offer and can reach 50% on eligible plans. BOGO40 gives 40% off, but its same-size bonus account is claimable only after a first successful payout and contact with support. Compare the immediate checkout totals before choosing.',
      },
      {
        question: 'Which GFT model should I choose?',
        answer:
          'Instant and 1-step models are faster, but they can be stricter. 2-step or 3-step models may be easier to read if you want more validation and less pressure before funded-stage rules apply.',
      },
    ],
    internalLinks: [
      { label: 'Goat Funded Trader profile', href: '/firm/goat-funded-trader' },
      { label: 'Prop firm deals', href: '/promos' },
      { label: 'Instant funding', href: '/guides/prop-firm-instant-funding' },
    ],
    focusFirmSlugs: ['goat-funded-trader'],
  },
  {
    slug: 'prop-firm-instant-funding',
    title: 'Instant funding prop firm: fast access, rules and traps',
    metaDescription:
      'Compare instant funding prop firms: price, drawdown, payout, profit split, news trading, hidden-rule risk and challenge alternatives.',
    eyebrow: 'Instant funding',
    h1: 'Instant funding prop firm: faster does not mean simpler',
    intent: 'choisir',
    demandSignal:
      'Transactional search: the trader wants to avoid a long evaluation, but must understand why instant funding often costs more or imposes tighter rules.',
    answer:
      'Instant funding can be useful if you want fast account access, but compare total cost, drawdown, minimum payout, lot limits, news restrictions and withdrawal clauses before paying.',
    primaryKeywords: ['prop firm instant funding', 'instant funding prop firm', 'funded account instant'],
    secondaryKeywords: ['no challenge prop firm', 'instant funded account', 'payout instant funding', 'AquaFunded instant funding'],
    checks: [
      'Compare instant price with an equivalent classic challenge.',
      'Verify whether the account is really funded or simulated with special rules.',
      'Read daily loss, max loss, minimum payout, lot size and strategy restrictions.',
      'Avoid paying more just to skip a step if your system can handle a normal challenge.',
    ],
    faq: [
      {
        question: 'Is instant funding better than a challenge?',
        answer:
          'Not always. It saves time, but it can cost more and impose stricter rules. The choice depends on your capital, style and discipline.',
      },
      {
        question: 'Which instant funding prop firm should you check first?',
        answer:
          'Start with firms whose withdrawal rules, drawdown and fees are readable. Price alone is not enough.',
      },
    ],
    internalLinks: [
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Goat Funded Trader', href: '/firm/goat-funded-trader' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  {
    slug: 'prop-firm-sans-challenge',
    title: 'No challenge prop firm: instant funding or false shortcut?',
    metaDescription:
      'No challenge prop firm: understand instant funding, direct funded accounts, fees, drawdown, payout rules and risks before paying more.',
    eyebrow: 'No challenge',
    h1: 'No challenge prop firm: the shortcut can cost more',
    intent: 'choisir',
    demandSignal:
      'Fast-purchase search: the trader wants to skip evaluation phases, but needs to understand what can be lost in cost, clarity and margin for error.',
    answer:
      'A no-challenge prop firm mainly sells time. Direct access can suit a stable trader, but it can cost more if the funded-stage rules are tighter than expected.',
    primaryKeywords: ['no challenge prop firm', 'prop firm without evaluation', 'direct funded account'],
    secondaryKeywords: ['instant funding', 'instant funded account', 'fast prop firm', 'funded account direct'],
    checks: [
      'Compare the real cost over several months, including entry fees and possible renewals.',
      'Verify funded-stage rules: drawdown, news restrictions, scaling, lot size and payout clauses.',
      'Check payout minimum and withdrawal frequency before judging the offer cheap.',
      'Confirm drawdown type: static, trailing, EOD or smart drawdown.',
      'Look for consistency rules, daily loss limits and any hidden funded-stage conditions.',
      'Avoid this format if you do not have a stable strategy tested over several months.',
    ],
    faq: [
      {
        question: 'Can you get a prop firm account without a challenge?',
        answer:
          'Yes. Some instant or direct-funded offers exist, but they do not remove risk. They often move the difficulty to funded-stage rules, fees, drawdown or payout conditions.',
      },
      {
        question: 'Who is no-challenge funding suitable for?',
        answer:
          'It usually fits traders who already have a stable process and know their average drawdown. For beginners, a small classic challenge can be cheaper and more educational.',
      },
    ],
    internalLinks: [
      { label: 'Instant funding', href: '/guides/prop-firm-instant-funding' },
      { label: 'Trading style tool', href: '/outils' },
      { label: 'Deals', href: '/promos' },
    ],
    focusFirmSlugs: ['instant-funding', 'city-traders-imperium', 'maven-trading', 'lucid-trading'],
  },
  {
    slug: 'prop-firm-pour-debutant',
    title: 'Prop firm for beginners: choose clear rules before account size',
    metaDescription:
      'Best prop firm for beginners: compare small accounts, clear rules, simple drawdown, payout reliability, reset cost and common first-challenge mistakes.',
    eyebrow: 'Beginner guide',
    h1: 'Prop firm for beginners: choose the clearest rule, not the biggest account',
    intent: 'choisir',
    demandSignal:
      'First-challenge search: the trader wants to know where to start, how much to spend and which beginner mistakes to avoid before buying a prop firm account.',
    answer:
      'For a beginner, the best first choice is rarely the biggest account. A smaller account, readable drawdown, reasonable price and rules you can follow are usually better for learning and protecting confidence.',
    primaryKeywords: ['prop firm for beginners', 'best prop firm for beginners', 'first prop firm challenge'],
    secondaryKeywords: ['easy prop firm', 'beginner prop firm challenge', 'small prop firm account', 'cheap beginner prop firm', 'prop firm rules for beginners'],
    checks: [
      'Start with the smallest account that still lets you test the rules seriously.',
      'Verify that drawdown is realistic and protective, not too tight and not so loose that it encourages reckless risk.',
      'Avoid discounts that push you into an account size that does not match your current skill level.',
      'Compare the real cost over 2 to 3 months, including entry fee, resets and repeated attempts.',
      'Read the complete rules before buying, because many beginner losses come from skipped details.',
      'Choose a program whose rules are clear, dated and easy to find on the official site.',
    ],
    faq: [
      {
        question: 'What account size should a beginner choose first?',
        answer:
          'A small or medium account is usually enough for a first attempt. The goal is to validate your process under rules, not to maximize the displayed balance.',
      },
      {
        question: 'Is a cheap prop firm always best for beginners?',
        answer:
          'Not always. A low price is useful only if the rules remain clear, the drawdown is realistic and payout conditions are not harder than expected.',
      },
    ],
    internalLinks: [
      { label: 'Cheap prop firm', href: '/guides/prop-firm-pas-cher' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Methodology', href: '/#methodologie' },
    ],
    focusFirmSlugs: ['ftmo', 'the5ers', 'topstep', 'fundednext', 'audacity-capital', 'fintokei', 'brightfunded', 'funded-trading-plus', 'alpha-capital-group'],
  },
  {
    slug: 'meilleure-prop-firm-forex',
    title: 'Best forex prop firm: MT5, cTrader, payout and rules',
    metaDescription:
      'Compare forex prop firms: FTMO, The5ers, FundingPips, FunderPro, GOAT Funded Trader, spreads, news, EA, payout and platforms.',
    eyebrow: 'Forex',
    h1: 'Best forex prop firm: platform, spreads and payout before discounts',
    intent: 'choisir',
    demandSignal:
      'Broad forex search: the trader compares MT5, cTrader, spreads, news trading, EA, fees and payout reliability.',
    answer:
      'In forex, the best prop firm depends mostly on platform, spreads, news/EA rules, drawdown and payout. A strong discount does not compensate for execution or a rule that does not fit your style.',
    primaryKeywords: ['best forex prop firm', 'forex prop firm', 'prop firm MT5'],
    secondaryKeywords: ['prop firm cTrader', 'FTMO alternative forex', 'FundingPips review', 'The5ers forex'],
    checks: [
      'Compare MT4, MT5, cTrader or proprietary platform.',
      'Verify spreads, commissions, slippage and news restrictions.',
      'Read minimum payout and withdrawal delay.',
      'Choose by pair and session, not only profit split.',
    ],
    faq: [
      {
        question: 'Which forex prop firm should you check first?',
        answer:
          'Start with firms that have readable rules, a platform that fits your style, low or medium payout risk and clear official sources.',
      },
      {
        question: 'Is MT5 enough to choose a prop firm?',
        answer:
          'No. MT5 is convenient, but you must also verify spreads, news, EA, drawdown and withdrawal conditions.',
      },
    ],
    internalLinks: [
      { label: 'FTMO', href: '/firm/ftmo' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'GOAT Funded Trader', href: '/firm/goat-funded-trader' },
    ],
    focusFirmSlugs: [
      'ftmo',
      'the5ers',
      'funding-pips',
      'funderpro',
      'goat-funded-trader',
      'brightfunded',
      'funded-trading-plus',
      'fintokei',
      'audacity-capital',
      'aqua-funded',
      'pipfarm',
      'lark-funding',
    ],
  },
  {
    slug: 'alternatives-ftmo',
    title: 'FTMO alternatives: cheaper, more flexible or simply better suited?',
    metaDescription:
      'Compare FTMO alternatives: The5ers, Funding Pips, FunderPro and E8 Markets by price, rules, news trading, EA, payout, platforms and scaling.',
    eyebrow: 'Alternatives FTMO',
    h1: 'FTMO alternatives: cheaper, more flexible or simply better suited?',
    intent: 'comparer',
    demandSignal:
      'Comparison search: the trader knows FTMO but wants to know whether another firm fits budget, rules, platform or trading style better.',
    answer:
      'Changing prop firm to leave FTMO only makes sense if the alternative solves a real constraint: lower entry cost, more flexible rules, a better platform, faster payout or a program better suited to your trading style.',
    primaryKeywords: ['FTMO alternatives', 'FTMO alternative', 'prop firm like FTMO'],
    secondaryKeywords: ['FTMO vs Funding Pips', 'FTMO vs The5ers', 'FunderPro vs FTMO', 'E8 Markets review'],
    checks: [
      'Compare why you want an FTMO alternative: price, rule flexibility, platform, payout timing or scaling.',
      'Verify real rules around drawdown, news trading, EA and weekend holding.',
      'Read official sources and recent community signals, not only promotions.',
      'Do not leave a reliable firm only because another checkout page shows a discount.',
      'Compare real cost over 3 to 6 months, including resets or repeated attempts.',
    ],
    faq: [
      {
        question: 'What is the best FTMO alternative?',
        answer:
          'It depends on the constraint. The5ers can be useful for conservative scaling, Funding Pips for modern challenge options, FunderPro for pricing and large accounts, and E8 Markets for another modern benchmark. Always verify current rules.',
      },
      {
        question: 'Is FTMO still worth using?',
        answer:
          'Yes for many traders who value clear rules, strong public history and a well-known two-step framework. Alternatives are interesting only if they solve a specific problem for you.',
      },
    ],
    internalLinks: [
      { label: 'FTMO vs The5ers', href: '/guides/ftmo-vs-the5ers' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Reliable top firms', href: '/meilleures-prop-firms' },
    ],
    focusFirmSlugs: ['the5ers', 'funding-pips', 'funderpro', 'e8-markets', 'ftmo'],
  },
  {
    slug: 'prop-firm-avis-reddit-trustpilot',
    title: 'Prop firm Reddit and Trustpilot reviews: a good rating is not enough',
    metaDescription:
      'Learn how to read prop firm reviews on Trustpilot, Reddit, Discord and X: fake review risk, payout complaints, timing, proof quality and discount-campaign bias.',
    eyebrow: 'Review signals',
    h1: 'Prop firm Reddit and Trustpilot reviews: a good rating is not enough',
    intent: 'risque',
    demandSignal:
      'Trust search: the trader wants to know whether reviews are real, recent, manipulated or useful for judging payout reliability.',
    answer:
      'Trustpilot, Reddit, Discord and X are useful only when they are cross-checked. A high public rating can still hide payout issues, vague rules or discount campaigns that inflate positive reviews.',
    primaryKeywords: ['prop firm Reddit reviews', 'prop firm Trustpilot reviews', 'prop firm reviews'],
    secondaryKeywords: ['prop firm scam reddit', 'fake Trustpilot reviews', 'payout problem', 'Discord prop firm', 'prop firm payout complaints'],
    checks: [
      'Separate raw rating from filtered reliability: date, removed reviews and campaign context matter.',
      'Search for repeated payout complaints even if the global rating is high.',
      'Compare positive-review timing with large discount campaigns.',
      'Check whether Discord, Reddit and X tell the same story as Trustpilot.',
      'Look for recent dated payout proof instead of generic testimonials.',
    ],
    faq: [
      {
        question: 'Is Trustpilot enough to choose a prop firm?',
        answer:
          'No. Trustpilot is useful for review volume, but it must be cross-checked with Reddit, Discord, X, official rules and recent payout proof.',
      },
      {
        question: 'Why does Reddit often look more negative?',
        answer:
          'Satisfied traders usually post less than blocked or angry traders. Reddit is useful for finding problems and patterns, not for measuring quality alone.',
      },
      {
        question: 'What makes a prop firm review more trustworthy?',
        answer:
          'Specific details: exact program, date, payout amount, rule involved, screenshot context and whether the same issue appears on other platforms.',
      },
    ],
    internalLinks: [
      { label: 'Trustpilot prop firms', href: '/trustpilot-prop-firms' },
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Audit', href: '/audit' },
    ],
  },
  {
    slug: 'prop-firm-payout-proof',
    title: 'Prop firm payout proof: recognize real withdrawal evidence',
    metaDescription:
      'Prop firm payout proof: how to verify withdrawal evidence, avoid marketing certificates and compare delay, caps and incidents.',
    eyebrow: 'Payout proof',
    h1: 'Prop firm payout proof: evidence must be dated, traceable and coherent',
    intent: 'risque',
    demandSignal:
      'Safety search: the trader wants to know which firms really pay and how to separate usable evidence from marketing claims.',
    answer:
      'Real payout evidence should have a date, context, credible amount, traceable source and coherence with official rules. An isolated certificate or cropped screenshot is not enough.',
    primaryKeywords: ['prop firm payout proof', 'prop firm that actually pays', 'prop firm withdrawal proof'],
    secondaryKeywords: ['payout problem', 'payout denial', 'prop firm withdrawal', 'fast payout'],
    checks: [
      'Verify date, amount, withdrawal method and source.',
      'Compare the displayed payout with official program rules.',
      'Search for payout denials and repeated reasons.',
      'Be careful with overly perfect proof that has no user context.',
    ],
    faq: [
      {
        question: 'Is a payout screenshot enough?',
        answer:
          'No. It becomes useful only when dated, linked to a credible account or testimony, and coherent with the firm rules.',
      },
      {
        question: 'Why can a firm refuse a payout?',
        answer:
          'Common reasons include rule breaches, forbidden news trading, unauthorized copy trading, excessive lot size, arbitrage or strategy inconsistency.',
      },
    ],
    internalLinks: [
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Fast payout prop firm', href: '/guides/prop-firm-payout-rapide' },
    ],
  },
  {
    slug: 'prop-firm-legal-check',
    title: 'Prop firm legal check: entities, regulators and red flags',
    metaDescription:
      'Prop firm legal check: verify the contracting entity, simulated-account terms, regulator status, payment clauses and payout dispute risks.',
    eyebrow: 'Legal due diligence',
    h1: 'Prop firm legal check: verify the entity before the offer',
    intent: 'risque',
    demandSignal: 'Traders increasingly search whether a prop firm is regulated, legally registered or only operating a simulated challenge model.',
    answer:
      'A prop firm can be legitimate enough to research but still not be a regulated broker or investment firm. The useful legal check starts with the contracting entity, jurisdiction, simulation disclaimer, regulator status, payment terms and payout dispute clauses.',
    primaryKeywords: ['prop firm legal check', 'prop firm regulation', 'is my prop firm regulated'],
    secondaryKeywords: ['prop firm legal entity', 'prop firm terms', 'simulated trading account', 'prop firm broker', 'prop firm due diligence'],
    checks: [
      'Identify the exact company name, registration number, address and jurisdiction before checkout.',
      'Separate broker regulation from prop-firm challenge services, simulated accounts and virtual funds.',
      'Read whether the firm says it is not a broker, not an investment adviser and not a deposit-taking institution.',
      'Check arbitration, class-action waiver, refund, chargeback and payout forfeiture clauses.',
      'Verify restricted countries and whether your selected product is available in your jurisdiction.',
      'Search the exact brand name in independent financial press and note when no reliable article exists.',
      'Use regulator warnings and public registers as risk signals, not marketing claims.',
    ],
    faq: [
      {
        question: 'Does a registered company make a prop firm safe?',
        answer:
          'No. A registered company improves traceability, but it does not automatically mean the prop-firm product is regulated like a broker, investment adviser or futures commission merchant.',
      },
      {
        question: 'What is the most important legal red flag?',
        answer:
          'The biggest red flag is unclear contracting entity information, followed by regulator warnings, vague payout rights, aggressive forfeiture clauses and marketing that sounds like real capital while the terms say simulated accounts.',
      },
      {
        question: 'Why does simulated trading matter legally?',
        answer:
          'Simulated trading usually means the trader is not receiving a normal brokerage account or client-fund protection. Rewards depend on contract rules, reviews and eligibility rather than ordinary withdrawal rights.',
      },
    ],
    internalLinks: [
      { label: 'Audit source levels', href: '/audit' },
      { label: 'Full comparator', href: '/comparateur' },
      { label: 'Payout risk guide', href: '/risques-payout' },
      { label: 'Trustpilot context', href: '/trustpilot-prop-firms' },
    ],
    focusFirmSlugs: [
      'ftmo',
      'the5ers',
      'fundednext',
      'trade-the-pool',
      'maven-trading',
      'alpha-capital-group',
      'bespoke-funding-program',
      'fast-track-trading',
      'the-funded-trader',
      'myfundedfx',
      'myforexfunds',
      'surgetrader',
      'true-forex-funds',
      'fidelcrest',
      'aqua-funded',
      'goat-funded-trader',
      'brightfunded',
      'funded-trading-plus',
      'fintokei',
      'audacity-capital',
      'pipfarm',
      'lark-funding',
      'topstep',
      'take-profit-trader',
      'tradeify',
      'earn2trade',
      'oneup-trader',
      'elite-trader-funding',
      'tickticktrader',
      'leeloo-trading',
      'uprofit-trader',
      'bulenox',
      'myfundedfutures',
      'hantec-trader',
      'the-trading-pit',
      'ftuk',
      'lux-trading-firm',
      'funderpro',
      'for-traders',
      'funding-traders',
      'breakout-prop',
      'sway-funded',
      'funded-peaks',
      't4tcapital',
      'traders-with-edge',
      'kortanafx',
      'axi-select',
      'thinkcapital',
      'ic-funded',
      'blueberry-funded',
      'finotive-funding',
      'rebelsfunding',
      'sabiotrade',
      'ment-funding',
      'ofp-funding',
      'hola-prime',
      'dna-funded',
      'crypto-fund-trader',
      'hyrotrader',
      'smart-prop-trader',
      'toptier-trader',
      'wemastertrade',
      'funded-bull',
      'prop-number-one',
      'karma-prop-traders',
      'wall-street-funded',
      'blusky-trading',
      'tradefundrr',
      'funded-futures-network',
      'daytraders-com',
      'traddoo',
      'fx2-funding',
      'rocket21-challenge',
      'glow-node',
      'funded-engineer',
      'skilled-funded-traders',
      'funding-talent',
      'blufx',
      'traders-central',
      'my-flash-funding',
      'funded-squad',
      'funded-unicorn',
      'quant-tekel',
      'ascendx-capital',
      'purdia-capital',
      'nova-funding',
      'nations-trading',
      'funder-trading',
      'the-forex-funder',
      'fundedlions',
      'fx-capital-funding',
      'leveled-up-society',
      'one-of-one-funding',
      'wsfunded',
      'moneta-funded',
      'fundedelite',
      'orion-funded',
      'bem-funding',
      'atmos-funded',
      'top-one-trader',
      'qt-funded',
      'atfunded',
      'top-one-futures',
      'e8-futures',
      'traders-launch',
      'sure-leverage',
      'tradexprop',
      'sfx-funded',
      'tribe-funded',
      'atlas-funded',
      'tx3-funding',
      'aurafunded',
      'getcryptofunded',
      'summit-strike-capital',
      'nostro',
      'funding-frontier',
      'funded7',
      'equity-edge',
      'myfxcapital',
      'alphaproptraders',
      'syndicate-funded',
      'fxci',
      'monevis',
      'funded-trader-markets',
      'funds-for-traders',
      'now-trade-funded',
      'dei-funded',
      'fxrk',
      'forexive',
      'onlyfunds',
      'myfundedcapital',
      'upcomers',
      'axe-trader-funding',
      'inspire-funding',
      'klein-funding-crypto',
      'algo-forex-funds',
      'aeon-funded',
      'trade-amber',
      'astra-capital-funding',
      'funding-your-trades',
      'mifunder',
      'fundings4u',
      'alpine-funded',
      'limitless-funding',
      'tradersedgefx',
      'gry-funding',
      'cash-flow-funding',
      'levels',
      'fundedhive',
      'titan-capital-markets',
      'tiger-funded',
      'fundyourfx',
      'ryze-trading',
      'tradicave',
      'fortunes-funding',
      'clarity-traders',
      'trading-cult',
      'next-step-funded',
      'forex-funds-flow',
      'my-crypto-funding',
      'directfundedtrader',
      'exfunded',
      'optimal-traders',
      'quantec-trading-capital',
      'next-level-funding',
      'superfunded',
      'ck-capital',
      'onefunded',
      'firmity-funding',
      'hash-hedge',
      'real-funds-trader',
      'forfx',
      'the-concept-trading',
      'the-prop-game',
      'tentrade',
      'neg-markets',
      'guardeer-funding',
      'indigo-trader-funding',
      'wegetfunded',
      'cove-funded',
      'stocknet-institute',
      'ultimate-traders',
      'willis-capital',
      'infinity-forex-funds',
      'alpicap',
      'get-leveraged',
    ],
  },
];

type SeoGuideDisplayOverride = Partial<
  Pick<SeoGuide, 'title' | 'metaDescription' | 'eyebrow' | 'h1' | 'answer' | 'primaryKeywords' | 'secondaryKeywords' | 'checks' | 'faq' | 'internalLinks'>
>;

const guideDisplayOverrides: Record<string, SeoGuideDisplayOverride> = {
  'meilleure-prop-firm-2026': {
    title: 'Best Prop Firms Right Now: Risk-First Ranking (2026)',
    metaDescription: 'What are the best prop firms right now? Compare current leaders by payout reliability, rule clarity, legal proof, drawdown and community signals.',
    eyebrow: 'Main ranking',
    h1: 'Best prop firms right now: a risk-first 2026 ranking',
    answer: 'The best prop firms right now are the profiles that combine credible payouts, readable rules, legal clarity and enough recent public evidence. PropRadar ranks the current dataset by risk before account size or discount.',
    primaryKeywords: ['best prop firms right now', 'best prop firm', 'most reliable prop firm'],
    secondaryKeywords: ['prop firm ranking 2026', 'prop firm payout reliability', 'prop firm reviews', 'prop firm comparison'],
    checks: [
      'Compare payout reliability before looking at account size.',
      'Verify the exact program rules, not only the firm brand.',
      'Cross-check Trustpilot, Reddit, X and Discord because each source has a different bias.',
      'Check drawdown type and news-trading policy, especially for intraday or SMC/ICT styles.',
      'Verify whether there is a consistency rule or daily profit cap.',
      'Check payout minimum if your strategy produces many small wins.',
      'Read scaling and withdrawal conditions once the account is funded.',
    ],
    faq: [
      {
        question: 'What makes a prop firm good in 2026?',
        answer:
          'A good prop firm combines reliable payouts, clear rules, stable conditions, enough public feedback and a program that fits your trading style. A large account size does not compensate for unclear withdrawal rules.',
      },
      {
        question: 'Should I choose the firm with the biggest discount?',
        answer:
          'No. A discount is useful only if the rules, drawdown, payout process and funded-stage conditions remain compatible with your strategy.',
      },
      {
        question: 'What are the best prop firms right now?',
        answer:
          'PropRadar currently puts established, well-sourced profiles such as FTMO, The5ers and Topstep near the front of the comparison. The correct shortlist still depends on market, drawdown, platform, payout rhythm and the exact program rules.',
      },
    ],
    internalLinks: [
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Current deals', href: '/promos' },
      { label: 'Methodology', href: '/#methodologie' },
    ],
  },
  'meilleure-prop-firm-futures': {
    title: 'Best Futures Prop Firm: Topstep, Apex and More',
    metaDescription: 'Compare futures prop firms by payout rules, trailing drawdown, fees, platforms and recent risk signals across Topstep, Apex, TPT and alternatives.',
    eyebrow: 'Futures funding',
    h1: 'Best futures prop firm: compare payout, drawdown and hidden fees',
    answer: 'Futures traders should compare more than the advertised discount. The important points are funded-account fees, payout caps, drawdown type, platform access and whether recent community feedback confirms the marketing promise.',
    primaryKeywords: ['best futures prop firm', 'futures prop firm', 'Topstep vs Apex'],
    secondaryKeywords: ['Apex Trader Funding', 'Take Profit Trader', 'MyFundedFutures', 'futures payout'],
    checks: [
      'Compare funded-account fees after the evaluation.',
      'Identify EOD, trailing or static drawdown.',
      'Read payout caps and consistency requirements.',
      'Check whether the deal applies to the exact product you want.',
    ],
    internalLinks: [
      { label: 'Topstep vs Apex', href: '/guides/topstep-vs-apex' },
      { label: 'Current futures deals', href: '/promos' },
      { label: 'Rules', href: '/regles' },
    ],
  },
  'prop-firm-sans-consistency-rule': {
    title: 'Prop Firm Consistency Rule: Formula & No-Rule Firms',
    metaDescription: 'What is a prop firm consistency rule? See the formula, a worked 40% example, payout impact and how to compare firms without the rule.',
    eyebrow: 'Rules search',
    h1: 'What is a consistency rule in a prop firm?',
    answer: 'A consistency rule limits how much of your total profit can come from one day or trade. A prop firm without a consistency rule removes that specific cap, but may still use strict drawdown, payout minimums, lot limits or funded-stage conditions.',
    primaryKeywords: ['what is consistency rule in prop firm', 'no consistency rule prop firm', 'prop firm without consistency rule'],
    secondaryKeywords: ['prop firms without consistency rule', 'best day rule', 'payout consistency rule', 'trailing drawdown'],
    checks: [
      'Verify the rule in both evaluation and funded stages.',
      'Compare payout minimum and required trading days.',
      'Check trailing drawdown and daily loss.',
      'Do not treat no consistency as a complete green light.',
    ],
    faq: [
      {
        question: 'What is a consistency rule in a prop firm?',
        answer:
          'It usually limits the percentage of total profit that can come from the best day or largest trade. For example, a best-day rule may require one day to stay below a stated share of total profits before payout. The exact formula varies by firm and program.',
      },
      {
        question: 'What does no consistency rule mean?',
        answer:
          'It means the program does not apply that specific profit-distribution cap. It does not remove daily loss, maximum drawdown, payout, news, lot-size or prohibited-strategy rules.',
      },
      {
        question: 'Which prop firms have no consistency rule?',
        answer:
          'The answer changes by program and funded stage. Use the comparison table on this page as a shortlist, then verify the exact current rules because one firm can offer both consistency and no-consistency products.',
      },
    ],
    internalLinks: [
      { label: 'Rules', href: '/regles' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Payout risk', href: '/risques-payout' },
    ],
  },
  'prop-firm-news-trading': {
    title: 'Which Prop Firms Allow News Trading? 2026 Comparison',
    metaDescription: 'Which prop firms allow news trading? Compare funded-stage rules, banned windows, NFP, CPI, FOMC, slippage, drawdown and payout risks.',
    eyebrow: 'News trading',
    h1: 'Which prop firms allow news trading?',
    answer: 'Some prop firms allow news trading, but the permission can change between evaluation and funded stages. Compare banned time windows, slippage treatment, red-folder events, drawdown and payout clauses before trading NFP, CPI or FOMC.',
    primaryKeywords: ['which prop firms allow news trading', 'prop firm news trading allowed', 'news trading prop firm'],
    secondaryKeywords: ['NFP prop firm', 'CPI trading challenge', 'FOMC prop firm', 'slippage prop firm'],
    checks: [
      'Verify news rules in the challenge and funded stages.',
      'Read restrictions around red-folder releases.',
      'Check daily drawdown before trading spikes.',
      'Read payout conditions linked to news trades.',
    ],
    faq: [
      {
        question: 'Which prop firms allow news trading?',
        answer:
          'The comparison table lists firms whose current profile does not flag news trading as fully prohibited. Permission remains program-specific, so verify both evaluation and funded-stage rules before buying.',
      },
      {
        question: 'Can a prop firm allow news trading but reject a payout?',
        answer:
          'Yes. A firm may allow entries around news while still enforcing slippage, prohibited-strategy, best-day, latency or payout-review clauses. The payout terms matter as much as the word allowed.',
      },
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'Official rules', href: '/regles' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  'prop-firm-payout-rapide': {
    title: 'Fast Payout Prop Firms: Proof, Delays and Traps',
    metaDescription: 'Guide to fast payout prop firms: payout delay, withdrawal proof, payout risk, caps and conditions before buying a challenge.',
    eyebrow: 'Payout search',
    h1: 'Fast payout prop firms: check proof, not only the promise',
    answer: 'A fast payout is useful only if the conditions are clear: minimum withdrawal, required trading days, caps, split, public feedback and incident history.',
    primaryKeywords: ['fast payout prop firm', 'prop firm payout proof', 'prop firm withdrawal'],
    secondaryKeywords: ['24h payout prop firm', 'payout problem', 'payout denial', 'withdrawal proof'],
    checks: [
      'Compare the advertised payout delay with community signals.',
      'Verify the minimum withdrawal amount and payout caps.',
      'Read payout incidents and repeated complaints.',
      'Do not confuse a marketing certificate with independent proof.',
    ],
    internalLinks: [
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Source audit', href: '/audit' },
      { label: 'Filtered Trustpilot', href: '/trustpilot-prop-firms' },
    ],
  },
  'prop-firm-pas-cher': {
    title: 'Cheap prop firm: discount codes and real cost',
    metaDescription: 'Compare cheap prop firms by entry price, discount code, drawdown, payout rules and funded-stage fees so a low-cost challenge does not hide higher risk.',
    eyebrow: 'Budget and deals',
    h1: 'Cheap prop firm: the challenge price is not the total cost',
    answer: 'A cheap prop firm can make sense if payout remains credible and funded-stage fees, resets, drawdown and restrictions do not make the account fragile.',
    primaryKeywords: ['cheap prop firm', 'prop firm discount code', 'low cost prop firm'],
    secondaryKeywords: ['prop firm discount', 'cheap challenge', 'discount prop firm', 'challenge price'],
    checks: [
      'Compare entry price with funded-stage fees.',
      'Verify whether the discount changes the conditions.',
      'Do not buy a larger account only because the discount is strong.',
      'Cross-check budget, payout risk and PropRadar score before purchase.',
    ],
    internalLinks: [
      { label: 'Current deals', href: '/promos' },
      { label: 'Price comparator', href: '/comparateur' },
      { label: 'Reliable top firms', href: '/meilleures-prop-firms' },
    ],
  },
  'prop-firm-smc-ict': {
    title: 'Best Prop Firm for SMC / ICT: Rules and Payouts',
    metaDescription: 'PropRadar guide for SMC and ICT traders: NAS/US30/forex setups, EOD drawdown, news rules, consistency, execution, payout and firms to compare.',
    eyebrow: 'SMC / ICT style',
    h1: 'Prop firm for SMC / ICT: choose rules that fit liquidity-based trading',
    answer: 'SMC and ICT traders usually need room for intraday scaling, London/New York session setups, indices or major forex pairs, and clear rules around news, drawdown and consistency. A firm can look attractive on price and still block the exact way you trade.',
    primaryKeywords: ['SMC prop firm', 'ICT prop firm', 'best prop firm for SMC'],
    secondaryKeywords: ['futures prop firm', 'EOD drawdown', 'no consistency rule', 'news friendly prop firm', 'London session', 'New York session'],
    checks: [
      'Verify whether news trading is allowed or whether clear windows exist around London and New York.',
      'Confirm the drawdown type: EOD or static is usually easier for scaling than aggressive intraday trailing.',
      'Check whether a consistency rule or daily profit cap can punish one large liquidity-sweep day.',
      'Compare spread and execution on the exact instruments you trade: NAS, US30, ES/NQ, gold or major forex pairs.',
      'Verify payout minimum and payout frequency if your system produces many smaller winning trades.',
      'Check whether adding positions into a setup is treated as normal scaling or as prohibited behavior.',
    ],
    faq: [
      {
        question: 'Are futures prop firms better for SMC / ICT?',
        answer:
          'Often they are easier to analyze for indices because the product, session and tick value are more standardized. But futures firms still need rule checks: drawdown type, payout caps, consistency and news windows matter more than the label.',
      },
      {
        question: 'What is the biggest SMC / ICT risk in a prop firm?',
        answer:
          'The biggest risk is passing the challenge with a normal liquidity-based style, then discovering that news windows, daily drawdown, scaling rules or consistency caps make the funded stage much harder.',
      },
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'News trading', href: '/guides/prop-firm-news-trading' },
      { label: 'Rules', href: '/regles' },
      { label: 'Alpha Futures', href: '/firm/alpha-futures' },
      { label: 'Lucid Trading', href: '/firm/lucid-trading' },
      { label: 'Tradeify', href: '/firm/tradeify' },
    ],
  },
  'prop-firm-swing-trading': {
    title: 'Prop firm swing trading: overnight, weekend and payout',
    metaDescription: 'Compare prop firms for swing trading by overnight and weekend holding, news restrictions, drawdown, payout timing and account-specific rules.',
    eyebrow: 'Swing trading',
    h1: 'Prop firm swing trading: verify overnight, weekend and drawdown before price',
    answer: 'For swing trading, you need a firm that allows longer holds, weekends or at least clear rules on rollover, gaps, news and payout timing.',
    primaryKeywords: ['prop firm swing trading', 'prop firm hold overnight', 'prop firm hold weekend'],
    secondaryKeywords: ['overnight prop firm', 'weekend holding', 'swing option', 'forex funded account'],
    checks: [
      'Verify overnight and weekend rules in challenge and funded stages.',
      'Understand whether drawdown is static, EOD or trailing.',
      'Read restrictions around gaps and news.',
      'Compare payout delay with your average trade duration.',
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
    ],
  },
  'prop-firm-ea-algo': {
    title: 'Prop firm EA allowed: bots, algo and copy trading',
    metaDescription: 'Find prop firms that allow EAs, bots and algo trading, then compare VPS, copy-trading, arbitrage, news and payout restrictions before buying.',
    eyebrow: 'EA / Algo',
    h1: 'Prop firm EA allowed: permissions, restrictions and payout risks',
    answer: 'An EA-friendly firm must explicitly allow bots, but the real check is copy trading, arbitrage, latency, martingale, VPS usage, multi-account management and payout validation.',
    primaryKeywords: ['prop firm EA allowed', 'prop firm algo trading', 'prop firm bot allowed'],
    secondaryKeywords: ['copy trading prop firm', 'VPS prop firm', 'arbitrage prop firm', 'robot trading'],
    checks: [
      'Verify EA permission in both challenge and funded stages.',
      'Read arbitrage, latency, grid, martingale and copy-trading restrictions.',
      'Test the platform before buying a large account.',
      'Watch payout clauses linked to strategy behavior.',
    ],
    internalLinks: [
      { label: 'Rules', href: '/regles' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  'prop-firm-fiable-trustpilot': {
    title: 'Reliable Prop Firms: Reviews, Payouts and Proof',
    metaDescription: 'How to spot a reliable prop firm: Trustpilot, Reddit, payout proof, official sources, press coverage, regulator warnings and conflicts of interest.',
    eyebrow: 'Trust',
    h1: 'Reliable prop firm: do not confuse a high rating with strong proof',
    answer: 'A reliable prop firm combines clear rules, official sources, payout history, consistent community feedback, independent press/regulator checks and visible commercial conflicts.',
    primaryKeywords: ['reliable prop firm', 'prop firm reviews', 'prop firm Trustpilot'],
    secondaryKeywords: ['prop firm scam', 'Reddit prop firm', 'prop firm feedback', 'payout proof', 'prop firm news', 'prop firm regulator warning'],
    checks: [
      'Compare Trustpilot with Reddit and payout incidents.',
      'Verify that official sources are accessible.',
      'Search the exact brand name in independent financial press and regulator-warning pages.',
      'Treat missing press coverage as a confidence limit for small or generic-name firms, not as proof of safety.',
      'Check review volume and context.',
      'Identify affiliate links and commercial conflicts.',
    ],
    internalLinks: [
      { label: 'Trustpilot prop firms', href: '/trustpilot-prop-firms' },
      { label: 'Audit', href: '/audit' },
      { label: 'Payout risks', href: '/risques-payout' },
    ],
  },
  'ftmo-vs-the5ers': {
    title: 'FTMO vs The5ers: rules, price and payout',
    metaDescription: 'FTMO vs The5ers: compare current programs, prices, drawdown, payout rules, platforms, Trustpilot signals and official terms before choosing.',
    eyebrow: 'Brand comparison',
    h1: 'FTMO vs The5ers: two solid profiles, not the same use case',
    answer: 'FTMO and The5ers are both serious names, but they do not solve the same problem. FTMO is more reference-driven; The5ers can feel more conservative depending on the program. The exact offer matters more than the brand name.',
    primaryKeywords: ['FTMO vs The5ers', 'FTMO or The5ers', 'The5ers vs FTMO'],
    secondaryKeywords: ['FTMO payout', 'The5ers rules', 'prop firm compare', 'forex challenge'],
    checks: [
      'Compare minimum price and target account size.',
      'Read news, EA, drawdown and profit target rules.',
      'Identify coupons, affiliate links and commercial interests.',
      'Choose by trading style, not popularity alone.',
    ],
    internalLinks: [
      { label: 'FTMO', href: '/firm/ftmo' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'Comparator', href: '/comparateur' },
    ],
  },
  'topstep-vs-apex': {
    title: 'Topstep vs Apex 2026: Rules, Payouts & Cost',
    metaDescription: 'Topstep vs Apex Trader Funding in 2026: current consistency paths, payout rules, EOD or intraday drawdown, fees and account-version risks.',
    eyebrow: 'Futures comparison',
    h1: 'Topstep vs Apex: compare payout rules before discounts',
    answer: 'Topstep offers a more established and easier-to-benchmark futures path, while Apex often competes through aggressive discounts and account choice. Compare drawdown, payout eligibility, recurring and activation costs, platforms and recent complaints before price.',
    primaryKeywords: ['Topstep vs Apex', 'Apex vs Topstep', 'Topstep or Apex'],
    secondaryKeywords: ['Apex Trader Funding discount', 'Topstep payout rules', 'Apex payout rules', 'futures funded account'],
    checks: [
      'Compare discounts with total cost after funded stage.',
      'Verify EOD or trailing drawdown and consistency rules.',
      'Read recent community signals and incidents.',
      'Choose by platform and intraday style.',
    ],
    faq: [
      {
        question: 'Is Topstep or Apex better?',
        answer:
          'Topstep can fit traders who prioritize a more established framework and easier-to-benchmark rules. Apex can fit traders who value discounted evaluations and more account choices. Payout eligibility, drawdown and total funded-stage cost should decide.',
      },
      {
        question: 'Is Apex cheaper than Topstep?',
        answer:
          'Apex often advertises larger discounts, but checkout price is not total cost. Compare subscriptions, resets, activation or funded fees and the number of attempts your strategy may require.',
      },
      {
        question: 'How do Topstep and Apex payout rules differ?',
        answer:
          'Both firms use program-specific eligibility conditions. Compare minimum trading days, consistency or best-day requirements, payout caps, account balance thresholds and the exact funded account before purchase.',
      },
    ],
    internalLinks: [
      { label: 'Topstep', href: '/firm/topstep' },
      { label: 'Apex Trader Funding', href: '/firm/apex-trader-funding' },
      { label: 'Futures deals', href: '/promos' },
    ],
  },
  'funderpro-vs-the5ers': {
    title: 'FunderPro vs The5ers: news, EA, swing and payout',
    metaDescription: 'FunderPro vs The5ers: compare price, news and EA rules, swing options, payout terms, operating history and current risk signals.',
    eyebrow: 'CFD comparison',
    h1: 'FunderPro vs The5ers: flexibility versus a more established profile',
    answer: 'FunderPro can appeal to traders who want news, EA and swing flexibility. The5ers has a more established and conservative profile depending on the selected program.',
    primaryKeywords: ['FunderPro vs The5ers', 'FunderPro review', 'The5ers discount code'],
    secondaryKeywords: ['FunderPro discount code', 'The5ers coupon 1EIJ6PO', 'EA allowed', 'news trading allowed', 'swing option'],
    checks: [
      'Test the discount code at checkout without overbuying.',
      'Verify news, EA and overnight rules on the exact program.',
      'Compare payout delay and withdrawal conditions.',
      'Read official rules before choosing.',
    ],
    internalLinks: [
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'Deals', href: '/promos' },
    ],
  },
  'leveraged-prop-firm-avis': {
    title: 'Get Leveraged Review: CySEC Alert and Payout Risk',
    metaDescription: 'Get Leveraged review: company context, reported CySEC warning, 20% consistency rule, payout proof, Trustpilot alert and points to verify before buying.',
    eyebrow: 'Brand review',
    h1: 'Get Leveraged review: visible offer, but high vigilance before buying',
    answer: 'Get Leveraged has visible marketing, low entry messaging, portfolio-style programs and an advertised 80% split. The decision is not about the headline offer: it is about the reported CySEC warning, strict consistency feedback, unavailable Trustpilot rating and very recent payout proof.',
    primaryKeywords: ['Get Leveraged review', 'Leveraged prop firm review', 'getleveraged.com Trustpilot'],
    secondaryKeywords: ['Get Leveraged payout', '20% consistency rule', 'Cyprus prop firm', 'pay after pass'],
    checks: [
      'Verify whether the chosen program is Jr, Sr, Executive, Turbo or Sprint, then read that exact rule page.',
      'Confirm the current regulatory status on the CySEC website before paying.',
      'Search payout proof from the last 30 days on Discord and Reddit with "Leveraged payout" or "GetLeveraged withdrawal".',
      'Simulate your strategy while respecting the 20% consistency rule as if it were enforced strictly.',
      'Compare the real "pay after you pass" cost, often advertised around $8.88, with the risk of payout refusal.',
    ],
    faq: [
      {
        question: 'Is Get Leveraged safe to buy?',
        answer:
          'PropRadar does not treat it as a simple safe buy. The firm is recent, the Trustpilot rating is unavailable, public feedback mentions strict consistency rules and a reported regulator warning must be checked before purchase.',
      },
      {
        question: 'What is the biggest rule risk on Get Leveraged?',
        answer:
          'The most important rule to verify is the 20% consistency rule: no single trading day should represent more than 20% of total profits. If applied strictly, it can block a payout even after a trader reaches the profit target.',
      },
      {
        question: 'What proof should I look for before buying?',
        answer:
          'Look for recent withdrawal proof from independent traders, not only marketing screenshots. The best proof is dated, tied to a specific program and consistent with the official rules.',
      },
    ],
    internalLinks: [
      { label: 'Leveraged profile', href: '/firm/get-leveraged' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Payout risks', href: '/risques-payout' },
    ],
  },
  'goat-funded-trader-avis': {
    title: 'GOAT Funded Trader Review: FIRSTGFT, BOGO40 and Payouts',
    metaDescription: 'GOAT Funded Trader review: compare FIRSTGFT and BOGO40, 1-step, 2-step, 3-step and Instant rules, payout terms, news trading and key risks.',
    eyebrow: 'Brand review',
    h1: 'Goat Funded Trader review: strong offer, but reread the rules before buying',
    answer: 'GOAT Funded Trader has a broad offer and two documented codes: FIRSTGFT gives new customers up to 50% off eligible plans, while BOGO40 gives 40% off and a same-size account only after a first successful payout and support claim. Rules still vary heavily by model, so the exact program matters more than the headline discount.',
    primaryKeywords: ['Goat Funded Trader review', 'GFT prop firm', 'Goat Funded Trader discount code'],
    secondaryKeywords: ['FIRSTGFT code', 'BOGO40 code', 'GFT payout', 'GFT instant funding', 'Goat Funded Trader rules', 'Goat Funded Trader news trading'],
    checks: [
      'Test the checkout rules before finalizing a large account purchase.',
      'Compare 1 step, 2 step, 3 step and Instant because news, weekend holding, daily loss, max loss and payout delay can differ.',
      'Verify news-trading restrictions, weekend holding, lot size and payout delay on the exact model.',
      'Read recent Reddit, Discord and X feedback from the last 30 to 60 days.',
      'Look for payout denials and the most common rejection reasons on the program you want.',
      'Compare FIRSTGFT and BOGO40 after choosing the right model, not before.',
    ],
    faq: [
      {
        question: 'Is Goat Funded Trader reliable?',
        answer:
          'GFT has a visible offer and enough public attention to deserve comparison, but reliability depends on the exact model. The important checks are payout rules, recent payout feedback, news restrictions, weekend holding and whether the trader followed the program rules.',
      },
      {
        question: 'Are FIRSTGFT or BOGO40 enough reason to buy?',
        answer:
          'No. A discount is useful only after you have chosen a model whose rules match your trading. A lower checkout price does not compensate for news, holding, lot-size or payout restrictions that block your style.',
      },
      {
        question: 'Which GFT model is safest to compare first?',
        answer:
          'Start by deciding whether you need speed or rule clarity. 1-step and Instant are faster, while 2-step and 3-step can be easier to evaluate because the validation process gives more time to test discipline before funded-stage rules matter.',
      },
    ],
    internalLinks: [
      { label: 'Goat Funded Trader profile', href: '/firm/goat-funded-trader' },
      { label: 'Prop firm deals', href: '/promos' },
      { label: 'Instant funding', href: '/guides/prop-firm-instant-funding' },
    ],
  },
  'prop-firm-instant-funding': {
    title: 'Instant Funding Prop Firms: Rules, Cost and Risk',
    metaDescription: 'Compare instant funding prop firms: price, drawdown, payout, profit split, news trading, hidden rule risk and challenge alternatives.',
    eyebrow: 'Instant funding',
    h1: 'Instant funding prop firm: fast does not mean easier',
    answer: 'Instant funding can be useful if you want account access quickly, but you must compare total cost, drawdown, minimum payout, lot limits, news restrictions and withdrawal clauses before paying.',
    primaryKeywords: ['instant funding prop firm', 'prop firm instant funding', 'funded account instant'],
    secondaryKeywords: ['instant funded account', 'instant account prop firm', 'payout instant funding', 'AquaFunded instant funding'],
    checks: [
      'Compare the instant price with a classic equivalent challenge.',
      'Verify whether the account is truly funded or a simulated product with special rules.',
      'Read daily loss, max loss, payout minimum, lot size and strategy restrictions.',
      'Avoid paying more just to skip a step if your system can handle a normal challenge.',
    ],
    internalLinks: [
      { label: 'Comparator', href: '/comparateur' },
      { label: 'No-challenge comparison', href: '/guides/prop-firm-sans-challenge' },
      { label: 'Goat Funded Trader', href: '/firm/goat-funded-trader' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  'prop-firm-sans-challenge': {
    title: 'No-Challenge Prop Firms 2026: Direct Funding',
    metaDescription: 'Compare no-challenge prop firms and direct funded accounts in 2026 by price, drawdown, payout reliability, consistency and true funded-stage cost.',
    eyebrow: 'No challenge',
    h1: 'No challenge prop firms: compare direct funding before you pay',
    answer: 'A no-challenge prop firm gives access to a funded-style account without a classic evaluation. The format saves time, but direct funded accounts can cost more and use tighter drawdown, consistency and payout rules.',
    primaryKeywords: ['no challenge prop firm', 'prop firm without challenge', 'prop firms without challenge'],
    secondaryKeywords: ['funded trading no challenge', 'funded trader no challenge', 'direct funded account', 'prop firm without evaluation'],
    checks: [
      'Compare the real cost over 3 to 6 months, including entry fee, renewal, reset or scaling costs.',
      'Verify funded-stage rules: drawdown, news, lot size, consistency, scaling and payout clauses.',
      'Check payout minimum and withdrawal frequency, especially if your strategy produces many small wins.',
      'Confirm the drawdown type: static, trailing, EOD or smart drawdown.',
      'Read scaling rules and the conditions for moving to larger accounts.',
      'Avoid this format if your strategy has not been stable for several months.',
    ],
    faq: [
      {
        question: 'Is no-challenge funding easier than a normal challenge?',
        answer:
          'Not necessarily. It removes the evaluation step, but it can make the funded stage stricter. The real test becomes payout rules, drawdown tolerance, minimum withdrawal and whether your trading can survive the direct-account constraints.',
      },
      {
        question: 'Who should consider a no-challenge prop firm?',
        answer:
          'It is better suited to traders who already know their average risk, daily loss profile and payout rhythm. If you are still testing discipline, a smaller classic challenge can be cheaper and safer.',
      },
      {
        question: 'What is a no-challenge prop firm?',
        answer:
          'It is a prop-firm program that skips the classic evaluation target and gives immediate access to a simulated funded-style account. The trader still has to follow drawdown, payout, consistency and prohibited-strategy rules.',
      },
      {
        question: 'Is funded trading with no challenge easier?',
        answer:
          'It is faster, not automatically easier. The direct account can have stricter drawdown, payout minimums, scaling limits or consistency conditions, so the funded stage becomes the real evaluation.',
      },
    ],
    internalLinks: [
      { label: 'Instant funding', href: '/guides/prop-firm-instant-funding' },
      { label: 'Trading style tool', href: '/outils' },
      { label: 'Deals', href: '/promos' },
    ],
  },
  'prop-firm-pour-debutant': {
    title: 'Best Prop Firm for Beginners: Clear Rules First',
    metaDescription: 'Best prop firm for beginners: compare FTMO, The5ers, Topstep, FundedNext and other beginner-friendly programs by rules, cost, drawdown and payout risk.',
    eyebrow: 'Beginner guide',
    h1: 'Prop firm for beginners: choose the clearest rule, not the biggest account',
    answer: 'For a beginner, the best first choice is rarely the biggest account. A smaller account with readable drawdown, reasonable cost and rules you can actually follow is usually better for learning, confidence and long-term progress.',
    primaryKeywords: ['prop firm for beginners', 'best prop firm for beginners', 'first prop firm challenge'],
    secondaryKeywords: ['easy prop firm', 'beginner prop firm challenge', 'small prop firm account', 'cheap beginner prop firm', 'prop firm rules for beginners'],
    checks: [
      'Start with the smallest account that still lets you test the rules seriously.',
      'Verify that drawdown is realistic and protective for your current skill level.',
      'Avoid discounts that push you into an account size that is too large.',
      'Compare the real cost over 2 to 3 months, including resets or repeated attempts.',
      'Read the complete rules before buying, especially news, holding, drawdown and payout clauses.',
      'Choose clear, dated and easy-to-find rules before looking at split or account size.',
    ],
    faq: [
      {
        question: 'What is the best prop firm for beginners?',
        answer:
          'The best beginner choice is usually a firm with clear rules, a reasonable first account size, understandable drawdown and enough public payout history. The biggest account is rarely the safest first step.',
      },
      {
        question: 'Should beginners start with a large account?',
        answer:
          'Usually no. A smaller account helps you learn rule discipline with less pressure. Once your process survives the first challenge, scaling is easier to justify.',
      },
      {
        question: 'Is the cheapest prop firm the best beginner option?',
        answer:
          'Only if the rules are still readable and payout conditions are clear. A cheap challenge with strict hidden conditions can become more expensive than a slightly higher-priced, cleaner program.',
      },
    ],
    internalLinks: [
      { label: 'Cheap prop firm', href: '/guides/prop-firm-pas-cher' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Trading style tool', href: '/outils' },
    ],
  },
  'meilleure-prop-firm-forex': {
    title: 'Best forex prop firm: MT5, cTrader, payout and rules',
    metaDescription: 'Compare forex prop firms: FTMO, The5ers, FundingPips, FunderPro, GOAT Funded Trader, spreads, news, EA, payout and platforms.',
    eyebrow: 'Forex',
    h1: 'Best forex prop firm: platform, spreads and payout before discounts',
    answer: 'Forex traders should compare platform, spreads, symbol coverage, news rules, EA permissions and payout credibility before looking at account size or discounts.',
    primaryKeywords: ['best forex prop firm', 'forex prop firm', 'prop firm MT5'],
    secondaryKeywords: ['prop firm cTrader', 'FTMO alternative forex', 'FundingPips review', 'The5ers forex'],
    checks: [
      'Compare MT5, cTrader and available symbols.',
      'Verify spreads, commissions and execution rules.',
      'Read news and EA restrictions.',
      'Check payout risk and proof level.',
    ],
    internalLinks: [
      { label: 'Comparator', href: '/comparateur' },
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
    ],
  },
  'alternatives-ftmo': {
    title: 'Best FTMO Alternatives: Rules, Cost and Payouts',
    metaDescription: 'Compare FTMO alternatives by price, rule flexibility, news trading, EA, platforms, payout timing, scaling and real trade-offs before switching.',
    eyebrow: 'FTMO alternatives',
    h1: 'FTMO alternatives: cheaper, more flexible or simply better suited?',
    answer: 'Changing prop firm to leave FTMO only makes sense if the alternative solves a real constraint: lower entry cost, more flexible rules, better platform fit, different payout timing or a program better suited to your trading style.',
    primaryKeywords: ['FTMO alternative', 'FTMO alternatives', 'prop firm like FTMO'],
    secondaryKeywords: ['FTMO vs Funding Pips', 'FTMO vs The5ers', 'FunderPro vs FTMO', 'E8 Markets review'],
    checks: [
      'Compare why you want an alternative to FTMO: price, rule flexibility, platform, payout timing or scaling.',
      'Verify real rules on drawdown, news trading, EA and weekend holding.',
      'Read official sources and recent community signals, not only promotions.',
      'Do not leave a reliable firm only because another offer is discounted.',
      'Compare real cost over 3 to 6 months, including resets or repeated attempts.',
    ],
    faq: [
      {
        question: 'What is the best FTMO alternative?',
        answer:
          'There is no universal answer. The5ers can fit conservative scaling, Funding Pips can fit traders comparing modern rule sets, FunderPro can be attractive on price and account size, and E8 Markets is another modern challenge benchmark.',
      },
      {
        question: 'When should I stay with FTMO?',
        answer:
          'Stay with FTMO if your main priority is clear rules, long public history, stable payout reputation and a well-defined two-step structure. A discount alone is not enough reason to switch.',
      },
      {
        question: 'How should I compare FTMO alternatives?',
        answer:
          'Start from the pain point: price, news, EA, platform, payout timing or scaling. Then compare the exact program rules and recent payout feedback before looking at the checkout discount.',
      },
    ],
    internalLinks: [
      { label: 'FTMO', href: '/firm/ftmo' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'FTMO vs The5ers', href: '/guides/ftmo-vs-the5ers' },
    ],
  },
  'prop-firm-avis-reddit-trustpilot': {
    title: 'Prop Firm Reviews: Reddit vs Trustpilot Signals',
    metaDescription: 'Learn how to read Trustpilot, Reddit, Discord and X reviews before choosing a prop firm: payout complaints, fake review risk, discount timing and proof quality.',
    eyebrow: 'Review signals',
    h1: 'Prop firm Reddit and Trustpilot reviews: a good rating is not enough',
    answer: 'Trustpilot and Reddit are useful sources, but not when they are read alone. A strong public rating can still hide payout problems, vague rules or aggressive discount campaigns that inflate positive reviews.',
    primaryKeywords: ['prop firm Reddit reviews', 'prop firm Trustpilot', 'prop firm reviews'],
    secondaryKeywords: ['prop firm scam reddit', 'fake Trustpilot reviews', 'payout problem', 'Discord prop firm', 'prop firm payout complaints'],
    checks: [
      'Separate raw rating from filtered reliability: date, removed reviews and promotion timing matter.',
      'Look for repeated payout complaints, not only isolated anger.',
      'Compare the timing of positive reviews with large discount campaigns.',
      'Check whether Discord, X and Reddit tell the same story as Trustpilot.',
      'Look for recent dated payout proof instead of general testimonials.',
    ],
    faq: [
      {
        question: 'Is a 4.8/5 Trustpilot rating enough proof?',
        answer:
          'No. A strong rating is useful only when the review timing, payout proof, Reddit discussions and official rules are coherent. A high score can still hide rule-related withdrawal issues.',
      },
      {
        question: 'Which reviews are most useful?',
        answer:
          'The best reviews mention the exact program, account size, payout date, rule involved and whether the trader has already withdrawn. Generic praise is much weaker evidence.',
      },
      {
        question: 'How should I use Reddit and Discord?',
        answer:
          'Use them to detect repeated patterns: payout delays, denied withdrawals, rule confusion, support pressure or sudden sentiment changes after a promotion.',
      },
    ],
    internalLinks: [
      { label: 'Trustpilot prop firms', href: '/trustpilot-prop-firms' },
      { label: 'Payout proof', href: '/guides/prop-firm-payout-proof' },
      { label: 'Audit', href: '/audit' },
    ],
  },
  'prop-firm-payout-proof': {
    title: 'Prop Firm Payout Proof: How to Verify Withdrawals',
    metaDescription: 'Prop firm payout proof guide: identify dated, traceable and consistent withdrawal evidence before trusting marketing claims.',
    eyebrow: 'Payout proof',
    h1: 'Prop firm payout proof: evidence must be dated, traceable and consistent',
    answer: 'A payout screenshot is not enough on its own. Good proof should be dated, connected to a real program, consistent with the rules and supported by more than one public signal.',
    primaryKeywords: ['prop firm payout proof', 'prop firm that actually pays', 'withdrawal proof prop firm'],
    secondaryKeywords: ['payout problem', 'payout denial', 'prop firm withdrawal', 'fast payout'],
    checks: [
      'Check the payout date, program and account type.',
      'Verify whether payout proof comes from the firm or independent users.',
      'Compare proof with rules, minimum withdrawal and caps.',
      'Look for repeated denials or delayed withdrawals.',
    ],
    internalLinks: [
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Fast payout guide', href: '/guides/prop-firm-payout-rapide' },
    ],
  },
  'prop-firm-legal-check': {
    title: 'Prop Firm Legal Check: Entities, Terms and Red Flags',
    metaDescription: 'Verify a prop firm legal entity, simulated-account terms, regulator status, payment clauses and payout-dispute risks before checkout.',
  },
};

export function getSeoGuideDisplay(guide: SeoGuide): SeoGuide {
  const override = guideDisplayOverrides[guide.slug] ?? {};
  const title = override.title ?? toEnglishText(guide.title);
  const translatedFaq = guide.faq.map((item) => ({
    question: toEnglishText(item.question),
    answer: toEnglishText(item.answer),
  }));
  const defaultFaq = [
    {
      question: `How should I use this guide on ${title}?`,
      answer:
        'Use it as a first filter, then verify the exact program, payout rules, drawdown, fees and official sources before buying.',
    },
    {
      question: 'Does a discount change the PropRadar score?',
      answer:
        'No. Affiliate links and discount codes are disclosed separately. A commercial relationship does not protect a firm from risk flags.',
    },
  ];

  return {
    ...guide,
    title,
    metaDescription: override.metaDescription ?? toEnglishText(guide.metaDescription),
    eyebrow: override.eyebrow ?? toEnglishText(guide.eyebrow),
    h1: override.h1 ?? toEnglishText(guide.h1),
    answer: override.answer ?? toEnglishText(guide.answer),
    primaryKeywords: override.primaryKeywords ?? guide.primaryKeywords.map((keyword) => toEnglishText(keyword)),
    secondaryKeywords: override.secondaryKeywords ?? guide.secondaryKeywords.map((keyword) => toEnglishText(keyword)),
    checks: override.checks ?? guide.checks.map((check) => toEnglishText(check)),
    faq: override.faq ?? (translatedFaq.length ? translatedFaq : defaultFaq),
    internalLinks:
      override.internalLinks ??
      guide.internalLinks.map((item) => ({
        ...item,
        label: toEnglishText(item.label),
      })),
  };
}

function isOpenFirm(firm: PropFirm) {
  return !/ferm/i.test(firm.status);
}

function isPayoutAcceptable(firm: PropFirm) {
  return firm.reviewSignals.payoutRisk !== 'Critique';
}

function allowsNewsTrading(firm: PropFirm) {
  return !/(non recommand|not recommended)/i.test(firm.newsTrading);
}

function allowsEaTrading(firm: PropFirm) {
  return !/^(non|no)$/i.test(firm.eaAllowed);
}

function firmSearchText(firm: PropFirm) {
  return [
    firm.name,
    firm.bestFor,
    firm.verdict,
    firm.drawdownType,
    firm.newsTrading,
    firm.eaAllowed,
    firm.payoutDelay,
    firm.styles.join(' '),
    firm.products.map((product) => `${product.name} ${product.description} ${product.consistencyRule ?? ''}`).join(' '),
    firm.strengths.join(' '),
    firm.weaknesses.join(' '),
  ]
    .join(' ')
    .toLowerCase();
}

function scoreSort(a: PropFirm, b: PropFirm) {
  if (b.score !== a.score) return b.score - a.score;
  return a.priceFrom - b.priceFrom;
}

function uniqueFirms(firms: PropFirm[]) {
  const seen = new Set<string>();
  return firms.filter((firm) => {
    if (seen.has(firm.slug)) return false;
    seen.add(firm.slug);
    return true;
  });
}

export function getSeoGuideBySlug(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}

export function getSeoGuidePath(guideOrSlug: SeoGuide | string) {
  const slug = typeof guideOrSlug === 'string' ? guideOrSlug : guideOrSlug.slug;
  return slug === 'meilleure-prop-firm-2026'
    ? '/meilleures-prop-firms'
    : `/guides/${slug}`;
}

export function selectGuideFirms(guideOrSlug: SeoGuide | string, limit = 10) {
  const guide = typeof guideOrSlug === 'string' ? getSeoGuideBySlug(guideOrSlug) : guideOrSlug;
  if (!guide) return [];

  if (guide.focusFirmSlugs?.length) {
    return guide.focusFirmSlugs
      .map((slug) => propFirms.find((firm) => firm.slug === slug))
      .filter((firm): firm is PropFirm => Boolean(firm));
  }

  const active = propFirms.filter((firm) => isOpenFirm(firm));
  let firms: PropFirm[];

  switch (guide.slug) {
    case 'meilleure-prop-firm-futures':
      firms = active.filter((firm) => firm.styles.some((style) => /futures/i.test(style)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-sans-consistency-rule':
      firms = active.filter((firm) => firm.products.some((product) => !product.hasConsistencyRule) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-news-trading':
      firms = active.filter((firm) => allowsNewsTrading(firm) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-payout-rapide':
      firms = active.filter((firm) => /(24|48|hour|hrs|jour|day|one|instant|rapide|daily)/i.test(firm.payoutDelay) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-payout-proof':
      firms = active.filter((firm) => firm.payoutProof && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-pas-cher':
      firms = active.filter((firm) => firm.priceFrom > 0 && firm.priceFrom <= 100 && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-instant-funding':
    case 'prop-firm-sans-challenge':
      firms = active.filter((firm) => /(instant|direct|sans challenge|no challenge)/i.test(firmSearchText(firm)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-pour-debutant':
      firms = active.filter((firm) => firm.priceFrom > 0 && firm.priceFrom <= 160 && firm.score >= 60 && isPayoutAcceptable(firm));
      break;
    case 'meilleure-prop-firm-forex':
      firms = active.filter((firm) => /(forex|mt4|mt5|ctrader|cfd)/i.test(firmSearchText(firm)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-smc-ict':
      firms = active.filter((firm) => /(forex|intraday|scalping|swing)/i.test(firm.styles.join(' ')) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-swing-trading':
      firms = active.filter((firm) => /(swing|overnight|weekend|hold)/i.test(firmSearchText(firm)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-ea-algo':
      firms = active.filter((firm) => allowsEaTrading(firm) && /(ea|bot|algo|expert|automated|variable|oui|yes|on request)/i.test(firmSearchText(firm)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-fiable-trustpilot':
      firms = active.filter((firm) => firm.reviewSignals.trustpilotReliability !== 'Faible' && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-avis-reddit-trustpilot':
      firms = active.filter((firm) => firm.reviewSignals.redditSampleSize && firm.reviewSignals.trustpilotReliability !== 'Faible' && isPayoutAcceptable(firm));
      break;
    default:
      firms = topFirms.filter((firm) => isOpenFirm(firm) && isPayoutAcceptable(firm));
      break;
  }

  return uniqueFirms(firms).sort(scoreSort).slice(0, limit);
}

export function getGuideLastModified(guideOrSlug: SeoGuide | string) {
  const guide = typeof guideOrSlug === 'string' ? getSeoGuideBySlug(guideOrSlug) : guideOrSlug;
  const firms = guide ? selectGuideFirms(guide, 12) : [];
  const dates = firms
    .map((firm) => new Date(firm.lastReviewed).getTime())
    .filter((timestamp) => Number.isFinite(timestamp));

  if (!dates.length) return new Date(SEO_RESEARCH_DATE);
  return new Date(Math.max(...dates, new Date(SEO_RESEARCH_DATE).getTime()));
}

export function getRelatedGuides(currentSlug: string, limit = 3) {
  const current = getSeoGuideBySlug(currentSlug);
  return seoGuides
    .filter((guide) => guide.slug !== currentSlug)
    .filter((guide) => !current || guide.intent === current.intent || guide.primaryKeywords.some((keyword) => current.secondaryKeywords.includes(keyword)))
    .slice(0, limit);
}

export function getFirmRelatedGuides(firm: PropFirm, limit = 4) {
  const firmText = firmSearchText(firm);
  const scoredGuides = seoGuides
    .map((guide) => {
      let score = 0;

      if (guide.focusFirmSlugs?.includes(firm.slug)) score += 80;
      if (selectGuideFirms(guide, 20).some((selectedFirm) => selectedFirm.slug === firm.slug)) score += 45;
      if (guide.primaryKeywords.some((keyword) => firmText.includes(keyword.toLowerCase()))) score += 16;
      if (guide.secondaryKeywords.some((keyword) => firmText.includes(keyword.toLowerCase()))) score += 10;

      if (firm.styles.some((style) => /futures/i.test(style)) && /futures|topstep|apex/i.test(guide.slug)) score += 28;
      if (allowsNewsTrading(firm) && /news-trading|funderpro/i.test(guide.slug)) score += 18;
      if (allowsEaTrading(firm) && /ea-algo|funderpro/i.test(guide.slug)) score += 18;
      if (firm.priceFrom > 0 && firm.priceFrom <= 100 && /pas-cher|promo/i.test(guide.slug)) score += 18;
      if (firm.reviewSignals.payoutRisk !== 'Faible' && /payout|fiable|trustpilot/i.test(guide.slug)) score += 20;
      if (/swing|overnight|weekend/i.test(firmText) && /swing/i.test(guide.slug)) score += 22;
      if (/forex|intraday|scalping/i.test(firm.styles.join(' ')) && /smc|ict|meilleure-prop-firm-2026/i.test(guide.slug)) score += 12;

      return { guide, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const selectedGuides = scoredGuides.slice(0, limit).map((item) => item.guide);
  return selectedGuides.length ? selectedGuides : seoGuides.slice(0, limit);
}
