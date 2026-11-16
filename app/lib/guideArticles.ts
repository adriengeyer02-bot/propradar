import { hyroTradeifyArticle, noChallengeGettingStarted } from './searchIntentGuides';

/**
 * Long-form editorial text for guides.
 *
 * The guide template is built from firm data (tables, cards, shortlists).
 * These sections add the explanatory prose that readers and search engines
 * need: definitions, worked examples, trade-offs. Rendered after the quick
 * answer on /guides/[slug]. Keep every firm-specific fact dated and sourced.
 */

/** Diagrams drawn from the numbers in the section text (see components/guide-visuals). */
export type GuideSectionVisual =
  | 'challenge-vs-direct'
  | 'no-challenge-cost'
  | 'consistency-example'
  | 'trailing-vs-static'
  | 'rule-stages'
  | 'daily-vs-max'
  | 'topstep-path'
  | 'static-floor'
  | 'eod-vs-intraday'
  | 'trailing-lock'
  | 'balance-vs-equity'
  | 'real-cost-stack';

/**
 * Teaching blocks written in the article's own language (English here, French
 * in frArticles). Translated guides only carry `visual`, whose labels live in
 * the message files. `**text**` in any string is shown in bold.
 */
export type GuideCallout = { kind: 'tip' | 'warning' | 'example'; text: string };

export type GuideArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Icon in front of each bullet. */
  bulletStyle?: 'check' | 'flag';
  visual?: GuideSectionVisual;
  /** Big figures read in the text, shown as tiles. */
  stats?: { value: string; label: string }[];
  /** Small comparison table (first column = row label). */
  compare?: { columns: string[]; rows: { label: string; values: string[]; sourceUrl?: string }[]; note?: string };
  /** Numbered steps, shown as a path. */
  steps?: { title: string; text: string }[];
  fit?: { yes: string[]; no: string[] };
  prosCons?: { pros: string[]; cons: string[] };
  callout?: GuideCallout;
};

export type GuideArticle = {
  published?: string;
  updated: string;
  intro?: string;
  /** "Key points" box shown under the intro. */
  keyPoints?: string[];
  sections: GuideArticleSection[];
  sources?: { label: string; url: string }[];
};

export const guideArticles: Record<string, GuideArticle> = {
  'hyrotrader-vs-tradeify': hyroTradeifyArticle,
  'prop-firm-hidden-rules': {
    published: '2026-11-16',
    updated: '2026-11-16',
    intro: 'A prop firm can advertise a generous profit split and an easy challenge while the binding agreement includes conditions that materially change when you may withdraw. These are **easy-to-miss rules**, not necessarily rules the company has intentionally concealed: the examples below are taken from firms\' own public documentation. **We include PropRadar affiliate partners.** No ranking or affiliate commission can buy an exemption from scrutiny.',
    keyPoints: [
      '**Evaluation rules are not necessarily funded-account rules.** News, trading hours and consistency may change after you pass.',
      '**Profit in the dashboard is not automatically a payable reward.** Some programs deduct profits or apply separate eligibility gates.',
      '**Residence, citizenship, location and payment provider can differ.** A successful purchase does not prove later payout eligibility.',
      '**Every named example below links to an original company policy** checked on 16 November 2026.',
    ],
    sections: [
      {
        heading: '1. News trading allowed in evaluation, but profits deducted after funding',
        paragraphs: [
          'E8 Markets says news trading is unrestricted during its **E8 Classic evaluation**. On a Classic SimFi Performance account, however, only **40% of profits made during the news window count as eligible profit**. Its separate E8 One product forbids certain news-window actions on performance accounts, while E8 Pro allows news trading. These are three distinct rules within one brand.',
          'FundingPips similarly distinguishes its evaluation and Master stages. For several Master models, profits from opening or closing within specified high-impact-news windows can be **deducted**, with a stated exception for positions opened at least five hours before the event. FundingPips Zero has stricter restrictions. Do not infer funded-stage permission from an evaluation-stage headline.',
        ],
        callout: { kind: 'warning', text: 'A trading platform allowing you to click Buy or Sell **does not mean the contract permits that trade**. Check the exact account model, event calendar and clock before trading.' },
      },
      {
        heading: 'News-trading rule register: evaluation versus funded (official sources)',
        paragraphs: [
          'These are **ten program groups we checked**, not a universal blacklist. A permitted hold through an announcement is not the same as permission to open a news-spike trade. The rules below apply to the **specific programs and stages named**, not automatically to every product the company sells.',
        ],
        compare: {
          columns: ['Evaluation stage', 'Qualified / funded stage'],
          rows: [
            { label: 'E8 Classic', values: ['News unrestricted', '**40% of news-window profits eligible**'], sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news' },
            { label: 'E8 One', values: ['News unrestricted', '**No trades in ±5 min high-impact window**; profits may be removed'], sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news' },
            { label: 'E8 Pro', values: ['Unrestricted', 'Unrestricted, subject to general risk rules'], sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news' },
            { label: 'FundingPips Flex / Standard / Pro', values: ['Holding permitted; intentional news-spike trading prohibited', '**Affected Master profits deducted**; 5-hour swing exception'], sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding' },
            { label: 'FundingPips Zero', values: ['Check exact contract', '**No open, close or holding through restricted news**; 10-min windows on Master'], sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding' },
            { label: 'Blue Guardian CFD 1-Step Standard', values: ['News permitted', '**No opening or closing ±5 min** around high-impact news'], sourceUrl: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules' },
            { label: 'BrightFunded CFD Phase 1 / 2', values: ['News trading unrestricted', '**Profits deducted on executions ±5 min**; Instant restricted from day one'], sourceUrl: 'https://help.brightfunded.com/en/articles/9241694-can-i-trade-news' },
            { label: 'Alpha Futures Standard / Zero / Direct', values: ['Standard / Zero evaluation: unrestricted; Direct skips evaluation', '**No orders ±2 min** on specified Qualified plans; Advanced Qualified differs'], sourceUrl: 'https://help.alpha-futures.com/en/articles/9492063-news-trading-policy' },
            { label: 'Alpha Capital Pro / One / Three / Direct', values: ['Evaluation: unrestricted; Direct has no evaluation', '**No executions ±5 min** on targeted news; even a TP fill can invalidate profit'], sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/9293522-can-i-trade-news' },
            { label: 'Tradeify Futures', values: ['News permitted', 'News permitted under its general FAQ'], sourceUrl: 'https://help.tradeify.co/en/articles/12268494-common-faqs' },
          ],
          note: 'Reviewed 16 Nov 2026. Click ↗ beside a firm to read its original rule. These are company policies, not independent proof of how every trader dispute is decided.',
        },
      },
      {
        heading: '2. A VPN or VPS can invalidate otherwise profitable trades',
        paragraphs: [
          'GOAT Funded Trader states that, effective **6 October 2026**, trading through a VPN, VPS, proxy or hosted environment is prohibited. Its help center says trades executed that way can cause an immediate account breach and that the related rewards will not be eligible for payment. It describes a narrowly limited exception for the initial server login, and a separate exception for its own dashboard copier.',
          'This is a published contractual restriction, **not evidence that the company improperly refuses legitimate payouts**. It is nevertheless crucial for algorithmic traders and for visitors whose internet access commonly uses routing services.',
        ],
      },
      {
        heading: 'VPN / VPS watchlist: which firms restrict them?',
        paragraphs: [
          '**A VPN (connection masking) and a VPS (remote trading server) are different tools.** Some firms prohibit both, others allow a VPN but ban hosted order execution, and others only prohibit hiding your residence. Here are the **11 companies with identifiable, sourced policies in our sample**, including affiliate partners. “Conditional” is not “banned everywhere.”',
        ],
        compare: {
          columns: ['VPN', 'VPS / remote execution'],
          rows: [
            { label: 'GOAT Funded Trader', values: ['**Prohibited** for trading (since 6 Oct 2026)', '**Prohibited**; limited company-tool exception'], sourceUrl: 'https://help.goatfundedtrader.com/en/articles/17362726-can-i-use-a-vpn-vps-proxy-or-any-other-hosting-service-while-trading' },
            { label: 'FundingPips', values: ['**Prohibited** when accessing a trading account', '**Prohibited** when accessing a trading account'], sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards' },
            { label: 'Topstep / TopstepX', values: ['**Prohibited** (also proxy and TOR)', '**No order transmission** via remote server or API; read-only analysis allowed'], sourceUrl: 'https://help.topstep.com/en/articles/11187768-topstepx-api-access' },
            { label: 'FundedNext CFD', values: ['**Allowed** except excluded-country IPs', '**Banned ≥$50k**; below $50k paid add-on, eligible trading EA only; no manual orders'], sourceUrl: 'https://help.fundednext.com/en/articles/8223809-can-i-use-a-vpn-or-vps' },
            { label: 'Alpha Capital Group', values: ['**Conditional**: dedicated static IP + prior notification', '**Conditional**: dedicated static IP + prior notification'], sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/8420522-what-is-the-ip-rule-are-vpns-and-vpss-allowed' },
            { label: 'Tradeify Futures', values: ['**No VPN at login**', 'Allowed **after normal login**, at trader’s risk'], sourceUrl: 'https://help.tradeify.co/en/articles/12268494-common-faqs' },
            { label: 'FTMO CFD', values: ['**Generally allowed**; avoid US geolocation for named platforms', '**Generally allowed**; US platform/geolocation exception'], sourceUrl: 'https://ftmo.com/en/faq/can-i-travel-or-use-vpn-vps/' },
            { label: 'Blue Guardian CFD 1-Step Standard', values: ['**Allowed**; no circumvention of copy/group-trading rules', '**Allowed** under same condition'], sourceUrl: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules' },
            { label: 'Apex Trader Funding', values: ['Banned **when used to disguise identity/location or evade rules**', 'Same anti-circumvention condition; not a published blanket ban'], sourceUrl: 'https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/' },
            { label: 'The5ers', values: ['**No circumvention of country restrictions**; blanket ban not established', 'No blanket VPS rule established in the cited terms'], sourceUrl: 'https://the5ers.com/terms-and-conditions/' },
            { label: 'HyroTrader (crypto)', values: ['**No bypass** of exchange/platform region restrictions', 'Depends on platform and its own terms; no universal ban verified'], sourceUrl: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/' },
          ],
          note: 'Source-linked register, not an allegation of unpaid payouts. Updated 16 Nov 2026. Rules may differ by product, account size, platform and country. Other firms remain unreviewed for this specific issue.',
        },
        callout: { kind: 'warning', text: 'Running a trading robot on a VPS is **not automatically allowed just because EAs are allowed**. Check the server, IP, account-size and order-routing rules separately.' },
      },
      {
        heading: '3. “Scalping allowed” can still come with time and margin limits',
        paragraphs: [
          'Blue Guardian allows scalping in its Futures program but says that **less than half of total profit may come from trades held under 10 seconds**. It separately describes an **80% margin-use threshold** as an “all or nothing” gambling rule on CFD accounts; consequences can include removal of profits or denial of a payout.',
          'A label such as “scalping allowed” or “EA allowed” is therefore too broad to make a purchase decision. Look for trade-duration thresholds, restrictions on automation and how multiple accounts are treated.',
        ],
      },
      {
        heading: '4. Consistency can delay a payout after the challenge is passed',
        visual: 'consistency-example',
        paragraphs: [
          'A consistency rule measures how much of your overall profit came from your best trading day. At Topstep, the rule and its percentage **depend on whether you are in the Trading Combine or on a funded payout path**. The two stages must not be conflated.',
          'Example: with a 50% best-day limit, a $1,200 winning day requires at least **$2,400 total profit** before the ratio falls to 50%. The correct way to fix a ratio above the cap is generally to earn additional eligible profit, not to deliberately lose money.',
        ],
        callout: { kind: 'tip', text: 'Read our separate guide to **prop firms without consistency rules**. “No consistency” only removes one possible restriction; it does not remove drawdown, news or payout conditions.' },
      },
      {
        heading: '5. Country of residence is not the same as eligibility to withdraw',
        paragraphs: [
          'GOAT Funded Trader explicitly lists **Singapore** among countries it does not accept. Apex Trader Funding lists **China** among countries excluded from new or additional accounts. These are particularly important examples for PropRadar visitors because both countries contribute to our international audience.',
          'Different products of one firm may use different geographic lists. FTMO CFD and FTMO Futures do; E8 Classic and E8 Futures do as well. Passing checkout, travelling abroad or seeing a firm in your country does **not** replace KYC, citizenship checks, supported-platform access and the available payout methods.',
        ],
        compare: {
          columns: ['India', 'Mainland China', 'Singapore'],
          rows: [
            { label: 'FTMO CFD', values: ['Published as eligible', 'Published as eligible', 'Published as eligible'], sourceUrl: 'https://ftmo.com/en/faq/who-can-join-ftmo/' },
            { label: 'Topstep Futures', values: ['Published as eligible', '**Individual verification needed**', 'Published as eligible'], sourceUrl: 'https://help.topstep.com/en/articles/8284116-am-i-eligible-to-trade-with-topstep' },
            { label: 'My Funded Futures', values: ['Published as eligible', '**Excluded**', 'Published as eligible'], sourceUrl: 'https://help.myfundedfutures.com/en/articles/8229993-restricted-countries-policy' },
            { label: 'Apex Trader Funding', values: ['Published as eligible', '**Excluded**', 'Published as eligible'], sourceUrl: 'https://apextraderfunding.com/help-center/getting-started/restricted-countries/' },
            { label: 'GOAT Funded Trader', values: ['Published as eligible', 'Published as eligible', '**Excluded**'], sourceUrl: 'https://help.goatfundedtrader.com/en/articles/10742187-which-countries-are-restricted-at-goat-funded-trader' },
            { label: 'FundedNext CFD', values: ['Published as eligible', 'Published as eligible', 'Published as eligible'], sourceUrl: 'https://help.fundednext.com/en/articles/8020080-are-any-countries-restricted-on-fundednext-cfds' },
            { label: 'Fintokei', values: ['**Excluded**', '**Temporarily excluded**', 'Published as eligible'], sourceUrl: 'https://support.fintokei.com/en/articles/6538820-who-can-join-fintokei' },
            { label: 'Alpha Futures', values: ['Published as eligible', '**Excluded**', 'Published as eligible'], sourceUrl: 'https://help.alpha-futures.com/en/articles/9523389-countries-with-limitations' },
            { label: 'Alpha Capital Group', values: ['Published as eligible', 'Published as eligible', 'Published as eligible'], sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/8775575-countries-with-limitations' },
            { label: 'Lucid Trading', values: ['Published as eligible', 'Published as eligible', 'Published as eligible'], sourceUrl: 'https://support.lucidtrading.com/en/articles/11404636-restricted-countries' },
            { label: 'PipFarm', values: ['Published as eligible', 'Published as eligible', 'Published as eligible'], sourceUrl: 'https://help.pipfarm.com/en/articles/4318163-prohibited-country-list' },
            { label: 'HyroTrader (Hyro platform)', values: ['Published as eligible', 'Published as eligible', 'Published as eligible'], sourceUrl: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/' },
            { label: 'BrightFunded CFD', values: ['Published as eligible', 'Published as eligible', 'Published as eligible'], sourceUrl: 'https://help.brightfunded.com/en/articles/9286630-what-countries-are-restricted-at-brightfunded' },
            { label: 'Upcomers', values: ['Published as eligible', 'Published as eligible', 'Published as eligible'], sourceUrl: 'https://help.upcomers.com/en/articles/8703655-are-there-any-prohibited-countries' },
          ],
          note: 'Admission under the cited published general policy, checked 16 Nov 2026 — not a legal licence, a KYC approval or a promise of payouts. The green cases are based on firms’ explicit worldwide-except-exclusions policies, not actual test purchases. A different challenge or third-party platform can change the answer.',
        },
        callout: { kind: 'warning', text: 'PropRadar\'s country filter reflects firms\' **published admission conditions**, not legal permission, a regulatory licence or a guaranteed payout. When a product cannot be verified, we say **Not verified** rather than guessing.' },
      },
      {
        heading: '6. Visiting a restricted country can be a breach even if you live elsewhere',
        paragraphs: [
          'Take Profit Trader says even a single trading or market-data access event from a prohibited location can trigger an account restriction. It explicitly mentions VPNs and remote connections that route access through such a country. A resident of an allowed jurisdiction should therefore check **travel and IP rules** before taking a laptop abroad.',
          'Not every firm uses this rule: Tradeify says its general geographic restriction is based on **permanent residence, not short-term travel**. Two firms may therefore treat the same journey differently.',
        ],
      },
      {
        heading: '7. A payout can depend on discretionary contractual approval',
        paragraphs: [
          'Apex Trader Funding\'s own Risk Disclosure says its Performance Account rewards are granted at its **discretion** and that decisions to pay or deny a reward are final. This is a significant clause to read alongside the User Agreement and published payout criteria.',
          'A discretionary clause is **not proof that a company systematically denies valid payments**. It does mean that a trader should document compliance and understand dispute and appeal routes before spending money.',
        ],
      },
      {
        heading: '8. The funded and live stages may not be interchangeable',
        paragraphs: [
          'Tradeify says traders denied entry to a Live Account cannot simply return to the simulated stage. FTMO Futures also distinguishes its Sim-Funded experience from eligibility to progress to a Live Funded Account, which is restricted in additional countries.',
          'Ask whether the firm promises a funded stage, a live brokerage account, or only a simulated reward program. The advertising word **“funded” does not describe the same contractual arrangement everywhere**.',
        ],
      },
      {
        heading: '9. How to find a prop firm without surprise conditions',
        paragraphs: [
          'No independent site can certify that a company has *zero* hidden rules: terms can change, KYC is individual and support decisions are sometimes discretionary. You can, however, reduce the likelihood of buying an unsuitable program.',
        ],
        steps: [
          { title: 'Identify the exact product', text: 'Write down the **firm, account name, account size and evaluation/funded stage**. Brand-level summaries are not sufficient.' },
          { title: 'Save the contract and date', text: 'Read the full **terms, help-center article, payout policy and restricted-country list**; keep a dated copy of the pages.' },
          { title: 'Test your real trading style', text: 'Check **news windows, copy trading, VPN/VPS, holding, maximum contracts, consistency and inactivity** against the strategy you actually use.' },
          { title: 'Calculate a real first payout', text: 'Include **profit targets, minimum days, first-withdrawal caps, activation fees, payout fees and payment-processor requirements**.' },
          { title: 'Ask in writing before paying', text: 'For anything ambiguous, seek a support answer identifying the **exact rule and version**, and save the response.' },
        ],
        callout: { kind: 'tip', text: 'If you find a rule that is missing from our comparison, send PropRadar the official link and a screenshot through our **source submission** contact. We review affiliate and non-affiliate firms by the same editorial standard.' },
      },
    ],
    sources: [
      { label: 'E8 Markets: news trading by E8 Pro, Classic and One', url: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news' },
      { label: 'FundingPips: news trading and weekend holding', url: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding' },
      { label: 'GOAT Funded Trader: VPN/VPS and hosted trading policy (12 Oct 2026)', url: 'https://help.goatfundedtrader.com/en/articles/17362726-can-i-use-a-vpn-vps-proxy-or-any-other-hosting-service-while-trading' },
      { label: 'Blue Guardian: prohibited trading strategies', url: 'https://help.blueguardian.com/en/articles/18426719-prohibited-trading-strategies' },
      { label: 'Topstep: consistency at Topstep', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep' },
      { label: 'GOAT Funded Trader: restricted countries', url: 'https://help.goatfundedtrader.com/en/articles/10742187-which-countries-are-restricted-at-goat-funded-trader' },
      { label: 'Apex: restricted countries', url: 'https://apextraderfunding.com/help-center/getting-started/restricted-countries/' },
      { label: 'Take Profit Trader: restricted countries and access', url: 'https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/22447557656477-Restricted-Countries' },
      { label: 'Tradeify: permanent residence and Live Account rule', url: 'https://help.tradeify.co/en/articles/10495888-rules-restricted-countries' },
      { label: 'Apex: Risk Disclosure — Performance Account rewards', url: 'https://apextraderfunding.com/risk-disclosure/' },
      { label: 'FTMO Futures: eligibility for a Live Funded Account', url: 'https://ftmo.com/en/futures/faq/who-is-eligible-for-a-live-funded-account/' },
      { label: 'FundingPips: VPN and VPS account policy', url: 'https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards' },
      { label: 'Topstep: VPN ban and VPS order-routing rules', url: 'https://help.topstep.com/en/articles/11187768-topstepx-api-access' },
      { label: 'FundedNext CFD: VPN/VPS conditions by account size', url: 'https://help.fundednext.com/en/articles/8223809-can-i-use-a-vpn-or-vps' },
      { label: 'Alpha Capital Group: VPN/VPS static IP and notice', url: 'https://help.alphacapitalgroup.uk/en/articles/8420522-what-is-the-ip-rule-are-vpns-and-vpss-allowed' },
      { label: 'FTMO CFD: VPN/VPS and US geolocation exception', url: 'https://ftmo.com/en/faq/can-i-travel-or-use-vpn-vps/' },
      { label: 'Blue Guardian: 1-Step Standard CFD news and VPS', url: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules' },
      { label: 'Apex: remote access used for geographic circumvention', url: 'https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/' },
      { label: 'Tradeify: login/VPS and news FAQ', url: 'https://help.tradeify.co/en/articles/12268494-common-faqs' },
      { label: 'The5ers: official conditions on country circumvention', url: 'https://the5ers.com/terms-and-conditions/' },
      { label: 'HyroTrader: local platform restrictions', url: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/' },
      { label: 'Alpha Futures: qualified-account news execution window', url: 'https://help.alpha-futures.com/en/articles/9492063-news-trading-policy' },
      { label: 'Alpha Capital Group: qualified-account news trading', url: 'https://help.alphacapitalgroup.uk/en/articles/9293522-can-i-trade-news' },
      { label: 'Fintokei: complete eligibility list and new-purchase restrictions', url: 'https://support.fintokei.com/en/articles/6538820-who-can-join-fintokei' },
      { label: 'Alpha Futures: geographic exclusions', url: 'https://help.alpha-futures.com/en/articles/9523389-countries-with-limitations' },
      { label: 'Lucid Trading: restricted countries', url: 'https://support.lucidtrading.com/en/articles/11404636-restricted-countries' },
      { label: 'FundedNext: CFD restricted countries', url: 'https://help.fundednext.com/en/articles/8020080-are-any-countries-restricted-on-fundednext-cfds' },
      { label: 'BrightFunded: CFD news-event restrictions', url: 'https://help.brightfunded.com/en/articles/9241694-can-i-trade-news' },
      { label: 'Upcomers: general geographic restrictions', url: 'https://help.upcomers.com/en/articles/8703655-are-there-any-prohibited-countries' },
    ],
  },
  'prop-firm-sans-challenge': {
    updated: '2026-11-15',
    intro:
      'To get started with a no-challenge prop firm, choose the market and exact program, check eligibility, read the funded rules, calculate the full fee exposure and test your strategy against the loss limits. **Skipping evaluation does not remove payout conditions.** Access can be simulated, and the first withdrawal may still require qualifying days, a profit goal or consistency.',
    keyPoints: [
      '**No challenge means no evaluation before funding.** A payout profit goal may still apply.',
      'Check the **exact program**, its complete fees and whether the account is simulated.',
      'Compare the **total cost to a first payout**, not the sticker price.',
      'It suits a **stable, low-drawdown** strategy, not one you are still testing.',
    ],
    sections: [
      noChallengeGettingStarted,
      {
        heading: 'Why instant funding usually costs more',
        visual: 'no-challenge-cost',
        paragraphs: [
          'Firms price the evaluation as a filter: a large share of challenge buyers never reach a payout, and their fees fund the traders who do. When you skip the filter, the firm prices that risk into the account itself. That is why a direct account is typically **several times the price** of a challenge of the same size, with **smaller sizes** and often a **tighter drawdown**.',
          'Compare the **full cost of reaching a first payout**. As an illustration with round numbers: a $100 challenge with a one-in-three chance of passing costs about **$300 on average** to get funded. A $350 instant account with a tight trailing drawdown costs more than that as soon as you lose one account before the first payout.',
        ],
      },
      {
        heading: 'The rules that decide whether a direct account is worth it',
        paragraphs: ['Read the funded-account terms, not the marketing page. These six points change the economics most often:'],
        bulletStyle: 'check',
        bullets: [
          '**Drawdown type:** a trailing drawdown that follows your equity high is far harder to live with than a static limit fixed at the starting balance.',
          '**Consistency rule:** many instant programs cap how much of your profit can come from your best day before a payout is allowed.',
          '**First payout conditions:** minimum trading days, minimum profit, and caps on the first one or two withdrawals.',
          '**Starting profit split:** some programs begin lower than their challenge models and only scale up later.',
          '**Replacement cost:** what a new account costs after a breach, and whether any discount applies.',
          '**Restricted strategies:** news windows, holding periods, copy trading and minimum trade durations.',
        ],
      },
      {
        heading: 'Who should consider a no-challenge prop firm',
        paragraphs: [
          'Direct funding trades **money for time**. The pressure of a profit target is replaced by the pressure of a live drawdown on an account that cost more.',
        ],
        fit: {
          yes: ['A **stable, low-drawdown** strategy', 'A track record of **respecting daily limits**', 'You value **time over cost**'],
          no: ['A strategy you are **still testing**', 'A **volatile style** that needs room', 'Buying mainly to **escape the profit target**'],
        },
        callout: { kind: 'tip', text: 'Unsure? A **cheap one-step challenge** is often the better test of whether your strategy fits a firm\'s rules before you buy a direct account.' },
      },
      {
        heading: 'Red flags specific to instant funding',
        paragraphs: [
          'Instant programs attract new and marketing-heavy firms because they are easy to sell. Treat these as warning signs:',
        ],
        bulletStyle: 'flag',
        bullets: [
          '**Very large accounts at very low prices.**',
          'Payout promises with **no published payout policy**.',
          'Rules that **differ between the homepage and the terms**.',
          'Terms that let the firm deny payouts **at its sole discretion** without a stated reason.',
        ],
        callout: { kind: 'tip', text: 'Before buying, open the firm\'s PropRadar profile: **legal entity, payout signals, domain and regulator alerts** are on one page.' },
      },
      {
        heading: 'Two current examples: instant access is not instant withdrawal',
        paragraphs: [
          'Official pages checked on 15 November 2026 illustrate why the exact plan matters. **Hyro Instant** skips evaluation but requires three qualifying trading days for the first payout, at least $25 profit after the split and a cap on profit counted per payout.',
          '**Tradeify Lightning Funded** also skips evaluation. Its published $50,000 plan needs $3,000 profit to unlock the first request, which is capped at $2,000 before the trader’s 90% split. Consistency also applies. The profit goal is not the amount available to withdraw.',
          'These examples describe the published rules, not independently authenticated customer payments. Use the current agreement and the source links below to verify the conditions that apply to a new purchase.',
        ],
      },
    ],
    sources: [
      { label: 'HyroTrader: Hyro Instant account and setup', url: 'https://www.hyrotrader.com/faq/getting-started/what-is-hyro-instant/' },
      { label: 'HyroTrader: qualifying days and first Instant payout', url: 'https://www.hyrotrader.com/faq/hyrotrader-account/how-does-the-first-payout-work-on-hyro-instant/' },
      { label: 'Tradeify: Lightning Funded accounts', url: 'https://help.tradeify.co/en/articles/10495938-lightning-funded-accounts' },
      { label: 'Tradeify: Lightning payout goals, caps and split', url: 'https://help.tradeify.co/en/articles/10495932-lightning-funded-account-payout-policy' },
    ],
  },

  'prop-firm-sans-consistency-rule': {
    updated: '2026-11-12',
    intro:
      'A consistency rule limits **how much of your total profit can come from a single day**. It exists because one lucky day, one oversized position or one news spike can produce a payout that says nothing about whether you can trade the account over time. Understanding the exact formula matters more than finding a firm that claims to have none.',
    keyPoints: [
      'The formula: **best day ÷ total profit × 100**, compared with the firm\'s limit (often 40 to 55%).',
      'Above the limit you **lose nothing**: you keep trading until total profit is high enough.',
      '**Where** it applies matters: in the evaluation it delays a pass, on payouts it can block a withdrawal.',
      'No consistency rule does **not** mean easier: risk is controlled another way.',
    ],
    sections: [
      {
        heading: 'How the rule is calculated',
        visual: 'consistency-example',
        paragraphs: [
          'Most firms use the same core formula: **best-day profit divided by total profit**, as a percentage. If the result is above the firm\'s limit, you are not yet eligible, either to pass the evaluation or to request a payout, depending on where the rule applies.',
          'Worked example with a 50% limit: you make $1,200 on Monday, $300 on Tuesday and $500 on Wednesday, so $2,000 in total. Your best day is **60% of the total**: above the limit. You do not need to lose anything: you need more total profit, here **at least $2,400**, so that $1,200 represents 50% or less.',
          'Some firms apply the rule differently. **Topstep raises the profit target** in the Trading Combine instead of failing you: if your best day exceeds 55% of the target, the target grows to best day divided by 0.55 (Topstep help center, page dated September 17, 2026).',
        ],
        callout: { kind: 'tip', text: 'Quick check: **total profit needed = best day ÷ limit**. Here: $1,200 ÷ 0.50 = **$2,400**.' },
      },
      {
        heading: 'Where the rule applies: evaluation, payout or both',
        visual: 'rule-stages',
        paragraphs: [
          'The same percentage can mean very different things. A consistency rule in the evaluation **only delays your pass**. A consistency rule on payouts **can block a withdrawal** after you have already made money on a funded account. Some firms also use different limits per stage: Topstep uses **55% in the Combine** and **40% on the Consistency payout path** of its Express Funded Account.',
          'FTMO changed its rule on **October 12, 2026**: new 1-Step Challenge orders use a Consistency rule that compares your best day with your total profit, **losing days included**, while accounts from older orders keep the previous Best Day Rule, which only counted positive days. FTMO says that if you do not meet the requirement, you simply keep trading until you do (FTMO trading update, October 8, 2026). PropRadar has not captured a percentage best-day rule on The5ers High Stakes program.',
        ],
        callout: { kind: 'warning', text: 'Always confirm **the stage, the product and your order date**: the same firm can run two versions of the rule.' },
      },
      {
        heading: 'Is a firm without a consistency rule better?',
        paragraphs: [
          'Not automatically. Firms that drop the consistency rule usually control risk another way. A "no consistency rule" headline can hide a funded account that is **harder to keep**. Look for what replaces it:',
        ],
        bulletStyle: 'check',
        bullets: [
          '**Tighter daily loss limits**',
          '**Trailing drawdowns**',
          '**Caps on the first payouts**',
          '**Minimum trading days**',
          '**Limits on position size**',
        ],
        callout: {
          kind: 'example',
          text: 'The rule mainly hurts **bursty results**: news traders, swing traders who close one large position, or anyone who sizes up after a losing streak. If your days are fairly even, a 40 to 50% limit rarely binds.',
        },
      },
      {
        heading: 'How to trade comfortably under a consistency rule',
        paragraphs: ['Four habits keep the rule out of your way:'],
        steps: [
          { title: 'Track the ratio', text: 'Keep a running **best day ÷ total profit** after every session.' },
          { title: 'Know today\'s ceiling', text: 'Before you trade, know **how much you can make** without pushing the ratio above the limit.' },
          { title: 'Spread out after a big day', text: 'Plan **several smaller positive days** rather than trying to repeat it.' },
          { title: 'Do not size up at the end', text: 'A single oversized winning day can **delay a pass** as surely as a losing one.' },
        ],
      },
    ],
    sources: [
      { label: 'Topstep help center: consistency at Topstep', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep' },
      { label: 'FTMO trading objectives', url: 'https://ftmo.com/en/trading-objectives/' },
      { label: 'FTMO trading update, October 8, 2026', url: 'https://ftmo.com/au/blog/trading-updates/trading-update-8-oct-2026/' },
    ],
  },

  'meilleure-prop-firm-2026': {
    updated: '2026-11-12',
    intro:
      'There is no single best prop firm. There is a best firm **for your market, your trading style** and the amount of risk you accept from the operator itself. This ranking starts from that last point: before comparing profit splits and discounts, it checks whether a firm is likely to **still be there, and to pay**, when you need it.',
    keyPoints: [
      'Filter in this order: **market → rules → real cost → discount codes**.',
      'The score reads **rule clarity, payout evidence, legal transparency, public reviews and history**.',
      'Affiliate links **never change a score**.',
      'Scores move when the evidence moves, and every change is **dated** on the firm page.',
    ],
    sections: [
      {
        heading: 'How this ranking is built',
        paragraphs: [
          'Each firm in PropRadar gets a **score out of 100** built from rule clarity, payout evidence, legal transparency, public review signals and operating history. Affiliate links are disclosed on every profile and **never change a score**. A firm with an affiliate relationship keeps its weaknesses on display, and a firm without one can rank at the top.',
          'At this update the highest scores belong to long-running operators: **FTMO (91/100), The5ers (85/100) and Topstep (84/100)**. They are not the cheapest. They are the profiles with the longest public track records, the most readable terms and the fewest unresolved payout signals in PropRadar\'s files.',
        ],
      },
      {
        heading: 'Start with your market',
        paragraphs: [
          'Forex/CFD traders and futures traders are not shopping in the same market. **A great futures firm is useless to a forex trader**, so filter by market first.',
        ],
        compare: {
          columns: ['Forex / CFD', 'Futures'],
          rows: [
            { label: 'Platforms', values: ['MT5, cTrader', 'Futures platforms'] },
            { label: 'Limits', values: ['**% of the account**', '**Dollar amounts**'] },
            { label: 'Drawdown', values: ['Often static on two-step challenges', 'Often **trailing**'] },
            { label: 'Examples', values: ['FTMO, The5ers', 'Topstep'] },
          ],
        },
      },
      {
        heading: 'Then match the rules to your style',
        paragraphs: [
          'The rules that end most accounts are **not the profit targets**. They are the drawdown type, the daily loss limit, consistency rules, news restrictions and holding rules. A scalper needs fast execution and no minimum trade duration. A swing trader needs overnight and weekend holding. A news trader needs a firm that allows news trading **on the funded account**, not only in the evaluation.',
        ],
        bulletStyle: 'check',
        bullets: [
          '**Drawdown:** static limits are easier to manage than trailing ones.',
          '**Consistency:** check whether it applies to the evaluation, to payouts, or both.',
          '**News and holding:** confirm the funded-account rules, which are often stricter.',
          '**Payouts:** frequency, minimum amount, first-payout caps and processing fees.',
        ],
      },
      {
        heading: 'Finally, compare the real cost',
        visual: 'real-cost-stack',
        paragraphs: [
          'The real cost of a prop firm is **the money you spend before your first payout**: challenge fees, resets, activation fees and replacement accounts, minus any refund. A cheap challenge with a harsh drawdown can cost more than an expensive one you are likely to pass.',
        ],
      },
      {
        heading: 'What would make a firm drop in this ranking',
        paragraphs: ['Scores move when the evidence moves. Each change is **dated in the firm\'s update history**, so you can see why and when. What pulls a score down:'],
        bulletStyle: 'flag',
        bullets: [
          'A **regulator warning**',
          '**Repeated payout delays**',
          'A **rule change applied to existing accounts**',
          'A domain that **stops serving the firm**',
          'Less transparency about the **legal entity**',
        ],
      },
    ],
  },

  'goat-funded-trader-avis': {
    updated: '2026-11-12',
    intro:
      'GOAT Funded Trader is one of the most visible prop firms of the last two years: aggressive discounts, a large range of models and constant social media presence. **Visibility is not the same as reliability.** This review separates what is documented from what is marketing, and puts the **funded-account rules** first, because that is where traders lose payouts.',
    keyPoints: [
      'Launched in **May 2023**; Hong Kong trade name, Saint Lucia provider, **no financial regulator**.',
      'On October 23, 2026, Trustpilot showed **no rating** for the company, citing a guideline breach.',
      'Payouts are lost on the **funded rules**: Goat Guard, the 2-minute rule, the news cap and the daily cap.',
      'PropRadar has an **affiliate relationship** with the firm; it does not change the score.',
    ],
    sections: [
      {
        heading: 'Who runs GOAT Funded Trader',
        paragraphs: [
          'GOAT Funded Trader launched in **May 2023**. It is a trade name of **Wishes Tower International Limited**, a Hong Kong company, and the simulated trading is provided by **Goat Funded LTD in Saint Lucia**. **No financial regulator** supervises the service. Its terms describe simulated accounts, non-refundable purchases and broad discretion over payouts, which is common in the industry but worth knowing before you buy.',
          'PropRadar scores it **64/100**, the cap that applies while Trustpilot withholds a firm\'s rating, and keeps it on the watchlist: the brand is real and pays traders, but its track record is short and its payout terms leave a lot of room for interpretation. PropRadar has an affiliate relationship with GOAT Funded Trader; it does not change this score or this review.',
        ],
      },
      {
        heading: 'The Trustpilot situation',
        paragraphs: [
          'On October 23, 2026, Trustpilot showed **no TrustScore** for the company. Its profile states that "this company\'s rating is unavailable due to a breach of our guidelines" and that Trustpilot "removed a number of fake reviews". The profile still lists 4,352 reviews, split sharply:',
          'A polarised profile usually means **two very different experiences**: traders who were paid quickly, and traders whose payouts were denied under rules they had not read closely.',
        ],
        stats: [
          { value: '4,352', label: 'reviews listed' },
          { value: '46%', label: 'five-star' },
          { value: '40%', label: 'one-star' },
        ],
        callout: { kind: 'warning', text: 'Treat homepage claims of a near-perfect rating **with caution** while the Trustpilot notice stands.' },
      },
      {
        heading: 'The funded-account rules that matter most',
        paragraphs: [
          'The challenge models are conventional. **The 3-Step model was retired in August 2026.** The figures below come from a third-party review checked on October 5, 2026: confirm them at checkout.',
          'The rules that decide payouts start **after you pass**:',
        ],
        compare: {
          columns: ['Profit targets', 'Daily loss', 'Max loss'],
          rows: [
            { label: '2-Step GOAT', values: ['8% then 6%', '4%', '10% static'] },
            { label: '2-Step Standard', values: ['10% then 5%', '5%', '10%'] },
            { label: '1-Step', values: ['10%', '3%', '6% static'] },
          ],
        },
        bulletStyle: 'flag',
        bullets: [
          '**Goat Guard:** on funded 1-Step and 2-Step accounts, a floating loss of 2% of the initial balance cuts your split to 50%; a second trigger breaches the account.',
          '**2-minute rule:** profit from trades held under two minutes is removed at payout, while losses from those trades stay on the account.',
          '**News window:** profit made around high-impact news is capped at 1% of the starting balance.',
          '**Daily profit cap:** a funded account can bank at most $3,000 of profit per day.',
          '**Instant models:** trailing drawdowns, and the account closes on a 1% or 2% floating loss depending on the model.',
        ],
      },
      {
        heading: 'Payouts',
        paragraphs: [
          'The default profit split is **80%**, with a paid upgrade to 100% at checkout and a scaling plan that can raise it to 90-95%. Most models pay **every 14 days**, with a **$100 minimum** and a **3% processing fee**. The first two payouts are capped at the lower of 6% of the starting balance or $10,000. Payment methods include Rise, bank transfer, Skrill and crypto, each with its own limit.',
          'Several public claims conflict with the help center, such as payout speed (24 hours versus 2 business days) and maximum account size.',
        ],
        stats: [
          { value: '80%', label: 'default profit split' },
          { value: '14 days', label: 'payout cycle on most models' },
          { value: '$100', label: 'minimum payout' },
          { value: '3%', label: 'processing fee' },
        ],
        callout: { kind: 'warning', text: 'When marketing and terms disagree, **the terms are what will be applied** to your payout.' },
      },
      {
        heading: 'Who GOAT Funded Trader suits',
        paragraphs: [
          'The funded rules target specific behaviours. If rule clarity matters more to you than price, compare it with the **higher-scored firms** in our ranking first.',
        ],
        fit: {
          yes: ['**Small, controlled** floating losses', 'Trades held **well over two minutes**', 'No reliance on **news spikes**', 'A **cheap entry** wanted'],
          no: ['**Scalpers**', '**News traders**', 'Trades that need **large intraday drawdowns**'],
        },
      },
    ],
    sources: [
      { label: 'GOAT Funded Trader on Trustpilot', url: 'https://www.trustpilot.com/review/goatfundedtrader.com' },
      { label: 'GOAT Funded Trader terms and conditions', url: 'https://www.goatfundedtrader.com/legal/terms-and-conditions' },
      { label: 'GOAT help center: 2-Step Standard', url: 'https://help.goatfundedtrader.com/en/articles/13575169-2-step-standard' },
      { label: 'FuturesHive review, checked October 5, 2026 (third party)', url: 'https://www.futureshive.com/blog/goat-funded-trader-review-2026' },
    ],
  },

  'topstep-review': {
    updated: '2026-11-12',
    intro:
      'Topstep is the oldest name in futures prop trading: founded in **2012 in Chicago** by Michael Patak, it ran its Trading Combine years before the current wave of prop firms. That history is its main strength. Its weaknesses are a **futures-only** offer, **frequent rule changes** since late 2025 and a **trailing loss limit** that demands discipline.',
    keyPoints: [
      'US operator since **2012**, futures only, no regulator warning recorded by PropRadar.',
      'The Combine has **no time limit**, and every position must be **closed by the session end**.',
      'New traders keep **90%** of payouts; the minimum request is **$125**.',
      'After the first payout, the loss limit drops to **$0**: no cushion left.',
    ],
    sections: [
      {
        heading: 'Is Topstep legit?',
        paragraphs: [
          'Topstep is an **established, US-based operator** with a long public history, a published help center and an affiliated introducing broker, Topstep Brokerage, launched in early 2026. PropRadar scores it **84/100** and has not recorded a regulator warning against it. As with every prop firm, the evaluation and the Express Funded Account are **simulated**: payouts are rewards paid by Topstep, not trading profits from a brokerage account.',
          'On Trustpilot the profile shows a **3.7** TrustScore across **14,955 reviews**, with Trustpilot\'s notice that the company "may be associated with high-risk investments" (checked October 23, 2026). Late 2025 complaints centred on **TopstepX platform outages** and failed stop orders.',
        ],
        stats: [
          { value: '2012', label: 'founded, Chicago' },
          { value: '84/100', label: 'PropRadar score' },
          { value: '3.7', label: 'Trustpilot, 14,955 reviews (Oct 23, 2026)' },
        ],
      },
      {
        heading: 'How the Trading Combine works',
        visual: 'topstep-path',
        paragraphs: [
          'The Trading Combine is Topstep\'s evaluation. **No time limit and no minimum number of trading days.** Positions must be closed by the end of the session: Topstep does not allow overnight or weekend holds.',
          'The **Maximum Loss Limit (MLL)** trails upward as your end-of-day balance grows and never moves down, but breaches are **monitored in real time**, including unrealized losses. In the Combine it stops trailing once it reaches the starting balance (Topstep help center, updated September 18, 2026).',
          'The consistency target is **55%**: your best day cannot exceed 55% of the profit target. If it does, you are not failed; **the target rises** to best day divided by 0.55 (help center, September 17, 2026). An optional daily loss limit of $1,000, $2,000 or $3,000 stops trading for the session without closing the account.',
        ],
        compare: {
          columns: ['50K', '100K', '150K'],
          rows: [
            { label: 'Profit target', values: ['$3,000', '$6,000', '$9,000'] },
            { label: 'Maximum Loss Limit', values: ['$2,000', '$3,000', '$4,500'] },
          ],
          note: 'Topstep help center, September 2026.',
        },
        callout: { kind: 'example', text: '50K Combine, best day **$2,000**: that is above 55% of $3,000 ($1,650), so the target becomes $2,000 ÷ 0.55 ≈ **$3,636**.' },
      },
      {
        heading: 'Express Funded Account and payouts',
        paragraphs: [
          'After passing, you trade an **Express Funded Account (XFA)**, still simulated, where payouts begin. The XFA starts at a $0 balance with the same MLL cushion below it. Since February 2026 you choose between two payout paths, and **the choice is permanent**.',
          'Traders who joined on or after January 12, 2026 receive **90%** of approved payouts; earlier traders keep 100% of their first $10,000, then 90%. The minimum payout request is **$125**. Top performers can be invited to a **Live Funded Account** with real capital, mandatory daily loss limits and a reserve released in steps.',
        ],
        compare: {
          columns: ['Standard path', 'Consistency path'],
          rows: [
            { label: 'Before each payout', values: ['**5 winning days** of at least $150', '**3 trading days**, largest day at **40% or less** of net profit'] },
          ],
          note: 'The choice between the two paths is permanent.',
        },
        callout: { kind: 'warning', text: 'After the first payout the MLL is set to **$0**. That removes the cushion: **one bad day after withdrawing can end the account.**' },
      },
      {
        heading: 'Pros and cons',
        paragraphs: ['What stands out after reading the current rules:'],
        prosCons: {
          pros: [
            'The **longest track record** in futures prop trading and a large, documented help center.',
            '**No time limit** or minimum days; the consistency rule raises the target instead of failing you.',
            '**90% split** from the first dollar for new traders and a low **$125** payout minimum.',
          ],
          cons: [
            '**Futures only**, and every position must be flat by the session close.',
            'The MLL is reset to **$0 after the first payout**.',
            'Rules **changed several times** between November 2025 and April 2026: reread them before each purchase.',
          ],
        },
      },
      {
        heading: 'Who Topstep suits',
        paragraphs: [
          'Monthly subscription pricing makes a **slow evaluation** more expensive than one-time-fee competitors. If you are comparing it with Apex, read our Topstep vs Apex guide, which matches each account version rule by rule.',
        ],
        fit: {
          yes: ['**Intraday futures** traders', 'Traders who want an **established operator**', 'Comfortable with a **live-monitored trailing limit**'],
          no: ['**Forex or CFD** traders', '**Swing traders** who hold overnight', 'Choosing **mainly on price**'],
        },
      },
    ],
    sources: [
      { label: 'Topstep help center: Maximum Loss Limit', url: 'https://intercom.help/topstep-llc/en/articles/8284204' },
      { label: 'Topstep help center: consistency', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep' },
      { label: 'Topstep help center: payout FAQs', url: 'https://intercom.help/topstep-llc/en/articles/8284234-payout-faqs' },
      { label: 'Topstep on Trustpilot', url: 'https://www.trustpilot.com/review/topstep.com' },
      { label: 'Topstep (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Topstep' },
    ],
  },

  'prop-firm-drawdown': {
    updated: '2026-11-12',
    intro:
      'Drawdown is **the rule that ends most prop firm accounts**. It is the maximum amount your account is allowed to lose, measured from a reference point. Two firms can both advertise a "$3,000 drawdown" on a $50,000 account and give you **completely different room** to trade, because the reference point moves differently.',
    keyPoints: [
      'Two limits run at once: the **daily loss limit** (restarts each day) and the **maximum drawdown** (whole account).',
      '**Static** is the most forgiving, **intraday trailing** the strictest, **end of day** sits in between.',
      'Most trailing limits **lock** at the starting balance: the first days are the riskiest.',
      'Size positions from the **room left to the floor**, not from the account size.',
    ],
    sections: [
      {
        heading: 'Daily loss limit vs maximum drawdown',
        visual: 'daily-vs-max',
        paragraphs: [
          'Most firms use **two limits at once**. The **daily loss limit** caps how much you can lose in one trading day, usually measured from the day\'s starting balance or equity. The **maximum drawdown** caps your total loss over the life of the account. Breaking either one usually breaches the account, although some futures firms only stop you for the rest of the session when you hit the daily limit.',
        ],
      },
      {
        heading: 'Static drawdown',
        visual: 'static-floor',
        paragraphs: [
          'A static drawdown is **fixed below your starting balance and never moves**. On a $100,000 account with a 10% static limit, the floor is $90,000 forever. If you grow the account to $108,000, you have **$18,000 of room**. This is the most forgiving model, common on forex/CFD two-step challenges.',
        ],
      },
      {
        heading: 'Trailing drawdown (intraday)',
        visual: 'trailing-vs-static',
        paragraphs: [
          'An intraday trailing drawdown **follows your highest equity in real time, including unrealized profit**. Example on a $50,000 account with a $2,500 trailing limit: the floor starts at $47,500. A trade runs to +$1,500 unrealized, so the floor moves to $49,000, **even if you then close the trade at breakeven**. You now have $1,000 of room instead of $2,500, without having banked a cent. This is the strictest model, common on futures and instant-funding accounts.',
        ],
      },
      {
        heading: 'End-of-day (EOD) trailing drawdown',
        visual: 'eod-vs-intraday',
        paragraphs: [
          'An end-of-day trailing drawdown **only moves when the trading day closes**, based on your closing balance. Intraday swings in open profit do not raise the floor, which makes it much easier to manage than intraday trailing.',
        ],
        callout: {
          kind: 'warning',
          text: 'The floor only moves at the close, but **a breach is often checked in real time**. Topstep, for example, trails its Maximum Loss Limit from the end-of-day balance while monitoring it live, unrealized losses included.',
        },
      },
      {
        heading: 'When the trailing stops: the lock',
        visual: 'trailing-lock',
        paragraphs: [
          'Most trailing models **stop trailing** at some point, usually when the floor reaches the starting balance (or starting balance plus a small buffer). From then on the limit behaves like a static one.',
        ],
        callout: { kind: 'tip', text: 'The first days of a trailing account are the most dangerous: **build the buffer to the lock level** before taking larger positions.' },
      },
      {
        heading: 'Balance-based vs equity-based limits',
        visual: 'balance-vs-equity',
        paragraphs: [
          'A **balance-based** limit only counts closed trades. An **equity-based** limit counts open positions too, so a floating loss can breach the account even if you would have closed the trade in profit later. Most modern firms measure breaches on equity. **Read the definition in the terms**, not the summary table.',
        ],
      },
      {
        heading: 'How to choose',
        paragraphs: ['Match the drawdown model to **how your trades behave**:'],
        compare: {
          columns: ['Prefer'],
          rows: [
            { label: 'Trades that run far into profit, then come back', values: ['**Static** or **end of day**; avoid intraday trailing'] },
            { label: 'Small, frequent scalps with tight stops', values: ['**Trailing** can work if the lock level comes quickly'] },
            { label: 'Swing trades with wide stops', values: ['**Static**, with room larger than your usual open loss'] },
          ],
        },
        callout: { kind: 'tip', text: 'Always size positions from the **remaining room to the floor**, not from the advertised account size.' },
      },
    ],
    sources: [{ label: 'Topstep help center: Maximum Loss Limit', url: 'https://intercom.help/topstep-llc/en/articles/8284204' }],
  },
};

export function getGuideArticle(slug: string) {
  return guideArticles[slug];
}
