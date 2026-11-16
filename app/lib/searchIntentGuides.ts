import type { GuideArticle, GuideArticleSection } from './guideArticles';
import type { SeoGuide } from './seoGuides';

const HYRO_DAILY = 'https://www.hyrotrader.com/faq/rules/how-is-the-5-daily-drawdown-calculated/';
const HYRO_STATIC = 'https://www.hyrotrader.com/faq/rules/what-is-the-difference-between-standard-trailing-and-swing-fixed-daily-drawdown/';
const HYRO_RISK = 'https://www.hyrotrader.com/faq/rules/what-are-the-risk-management-conditions-at-hyrotrader/';
const HYRO_INSTANT = 'https://www.hyrotrader.com/faq/getting-started/what-is-hyro-instant/';
const HYRO_PAYOUT = 'https://www.hyrotrader.com/faq/hyrotrader-account/how-does-the-first-payout-work-on-hyro-instant/';
const TRADEIFY_DRAWDOWN = 'https://help.tradeify.co/en/articles/10495897-rules-trailing-max-drawdowns';
const TRADEIFY_EVALUATIONS = 'https://help.tradeify.co/en/articles/13252431-select-vs-growth-choosing-your-evaluation-type';
const TRADEIFY_LIGHTNING = 'https://help.tradeify.co/en/articles/10495938-lightning-funded-accounts';
const TRADEIFY_PAYOUT = 'https://help.tradeify.co/en/articles/10495932-lightning-funded-account-payout-policy';
const TRADEIFY_CONSISTENCY = 'https://help.tradeify.co/en/articles/10468320-rules-consistency-rule';

/** A question-led entry point into the existing no-challenge guide. */
export const noChallengeGettingStarted: GuideArticleSection = {
  heading: 'How to get started with a no-challenge prop firm',
  visual: 'challenge-vs-direct',
  paragraphs: [
    'Start by choosing your market and the exact instant-funding program. A no-challenge account skips the evaluation before the funded stage. It can still be simulated, and a payout may require a profit goal, qualifying days, consistency and a review. Buying the account and qualifying for a withdrawal are separate steps.',
    'Use this checklist before making a purchase. A larger advertised account balance does not give you the same amount of money to lose: the daily and total loss limits determine the usable room.',
  ],
  steps: [
    { title: 'Choose the market and check eligibility', text: 'Match the permitted instruments, platforms and trading hours to your strategy. Check country restrictions, identity verification and the named contracting company.' },
    { title: 'Read the exact funded-account rules', text: 'Save the program name, account size, purchase date and official rule pages. Confirm the daily reset time, maximum loss floor, drawdown calculation and prohibited strategies.' },
    { title: 'Write down the route to the first payout', text: 'Record qualifying trading days, profit goals, consistency, the minimum request, payout caps and profit split. An evaluation-free account can still require substantial profits before a withdrawal.' },
    { title: 'Calculate the complete fee exposure', text: 'Include entry, activation, recurring, platform and data fees where applicable. Read refund and replacement terms, and decide the maximum total fees you are prepared to lose.' },
    { title: 'Test your normal trading against those limits', text: 'Use a trial or your trading journal to check floating losses, commissions, a losing streak and overnight positions. The test should use the actual program limits rather than the nominal account balance.' },
    { title: 'Complete setup and monitor both loss floors', text: 'After payment and any required verification, confirm the dashboard matches the contract. Keep a record of your current daily floor, total floor and payout eligibility before each session.' },
  ],
};

export const hyroTradeifyGuide: SeoGuide = {
  slug: 'hyrotrader-vs-tradeify',
  title: 'HyroTrader vs Tradeify: drawdown rules and risk management',
  metaDescription: 'HyroTrader vs Tradeify: compare crypto and futures markets, daily loss limits, EOD drawdown, consistency and the first-payout rules on instant accounts.',
  eyebrow: 'Crypto vs futures',
  h1: 'HyroTrader vs Tradeify: drawdown rules and risk management compared',
  intent: 'comparer',
  demandSignal: 'A comparison of two different trading markets, focused on the loss rules and withdrawal conditions that determine whether an account fits a strategy.',
  answer: 'HyroTrader serves crypto traders; Tradeify serves exchange-traded futures traders. HyroTrader publishes daily loss limits based on starting equity and the initial balance. Tradeify uses EOD trailing drawdown, enforced intraday. Compare the exact program and payout policy before comparing fees or advertised account size.',
  primaryKeywords: ['hyrotrader vs tradeify', 'hyrotrader vs tradeify drawdown rules and risk management compared'],
  secondaryKeywords: ['crypto prop firm drawdown', 'Tradeify EOD drawdown', 'Hyro Instant vs Lightning Funded'],
  checks: [
    'Choose the market first: crypto perpetuals and exchange-traded futures are different instruments.',
    'Separate the daily loss floor from the total drawdown floor.',
    'Distinguish evaluation consistency from funded-stage payout consistency.',
    'Read the exact instant-account payout goal, cap and profit split.',
    'Match the rules to your account version and purchase date.',
  ],
  faq: [
    { question: 'Is HyroTrader or Tradeify better?', answer: 'The relevant market comes first. HyroTrader is a crypto prop firm; Tradeify is a futures prop firm. Compare loss floors, trading hours and payout requirements for the exact program. This guide does not name an overall winner or authenticate either firm’s customer payments.' },
    { question: 'Does Tradeify EOD drawdown allow an intraday breach?', answer: 'No. The trailing floor is recalculated at the end of the day, but Tradeify enforces the current floor continuously against net liquidation value. Touching it can fail the account before the session ends.' },
    { question: 'Can I start without a challenge at either firm?', answer: 'The official pages checked on 15 November 2026 describe Hyro Instant and Tradeify Lightning Funded. Both skip evaluation; their daily limits, payout qualification rules and caps differ.' },
    { question: 'Does no evaluation mean no payout profit goal?', answer: 'No. Tradeify Lightning Funded separates the profit needed to unlock a request from the amount that can be withdrawn. Hyro Instant instead specifies qualifying days for the first payout, a minimum profit after the split and a cap on profit counted per payout.' },
    { question: 'Are HyroTrader and Tradeify the same type of crypto funding?', answer: 'No. HyroTrader’s service uses simulated crypto trading on market data. Tradeify’s programs are built around exchange-traded futures. Check the actual instrument list rather than assuming that every futures contract is a crypto perpetual.' },
  ],
  internalLinks: [
    { label: 'HyroTrader profile', href: '/firm/hyrotrader' },
    { label: 'Tradeify profile', href: '/firm/tradeify' },
    { label: 'Get started without a challenge', href: '/guides/prop-firm-no-challenge' },
    { label: 'Drawdown explained', href: '/guides/prop-firm-drawdown' },
  ],
  focusFirmSlugs: ['hyrotrader', 'tradeify'],
  programComparison: {
    columns: ['Criterion', 'HyroTrader', 'Tradeify'],
    rows: [
      { label: 'Market', values: ['Crypto perpetuals on supported platforms', 'Exchange-traded futures'] },
      { label: 'Daily loss', values: ['Core / Instant: 3%; One-Step: 4%; Two-Step: 5% of initial balance', 'SELECT evaluation: none; Growth: soft daily limit; Lightning: size-dependent'] },
      { label: 'Total loss', values: ['Published maximum loss varies by program; read separately from the daily floor', 'EOD trailing floor; enforced against net liquidation value during the session'] },
      { label: 'Evaluation consistency', values: ['Core / One-Step / Two-Step: daily profit credit limited to 40% of target', 'SELECT: 40% best-day limit; Growth: no evaluation consistency rule'] },
      { label: 'Without evaluation', values: ['Hyro Instant', 'Lightning Funded'] },
      { label: 'Payment evidence', values: ['Published rules are not independent authentication of payments', 'Published rules are not independent authentication of payments'] },
    ],
    note: 'Official program rules checked on 15 November 2026. These are program-level distinctions, not a ranking. Older accounts can retain different conditions.',
  },
};

export const hyroTradeifyArticle: GuideArticle = {
  published: '2026-11-15',
  updated: '2026-11-15',
  intro: 'HyroTrader vs Tradeify is first a **crypto-versus-futures decision**. The useful comparison is how each program measures losses, credits profits and unlocks a payout. This review uses the official rule pages available on 15 November 2026; it does not treat marketing payout claims as independently verified transfers.',
  keyPoints: [
    '**Choose the instrument first:** crypto perpetuals and exchange-traded futures have different execution and session constraints.',
    '**Daily and total loss are separate limits.** A permitted daily loss can still breach the account’s total floor.',
    '**EOD describes when the floor updates.** It does not postpone enforcement until the close.',
    '**Instant access still has payout conditions:** qualifying days, profit goals, caps and splits depend on the program.',
  ],
  sections: [
    {
      heading: 'Which market are you trying to trade?',
      paragraphs: [
        'HyroTrader describes simulated crypto accounts, including access through supported crypto platforms. Its evaluation routes and Hyro Instant are not a brokerage deposit or a promise of live capital. Tradeify’s Growth, SELECT and Lightning programs are designed around futures trading; Lightning starts with simulated funds.',
        'An account should be compared with the instruments and trading session your strategy actually uses. A crypto-perpetual strategy is not automatically transferable to a futures contract. Verify the platform, product list and session rules before comparing a nominal $50,000 balance or a discount.',
      ],
    },
    {
      heading: 'HyroTrader daily drawdown: the reset equity matters',
      paragraphs: [
        'HyroTrader’s daily floor starts from equity at 00:00 UTC, then subtracts a fixed percentage of the original account balance. Its FAQ lists **3% for Hyro Core and Hyro Instant, 4% for One-Step and 5% for Two-Step**. Open profit and loss and fees count in equity.',
        'Illustration: a $10,000 Hyro Instant account starts a UTC day with $10,300 equity. Its daily allowance is $300, so the daily floor is $10,000. If equity rises to $10,800 during that day, the daily floor does not follow that new high. The following UTC day establishes a new daily starting point.',
        'The total loss limit is a separate check. Hyro Instant publishes a 5% maximum loss, plus a trade-specific loss rule: exceeding 2% of the initial balance on one fully closed trade, fees included, produces a warning; a second such trade ends the account. The daily allowance does not override either condition.',
      ],
    },
    {
      heading: 'Tradeify EOD drawdown: updated at the close, enforced now',
      paragraphs: [
        'Tradeify’s rule page says Growth, SELECT and Lightning use an **end-of-day trailing drawdown**. A new highest closing balance can raise the floor. A later losing close does not lower it. The current floor is nevertheless enforced continuously against balance plus open profit and loss.',
        'Illustration using a $50,000 account with a $2,000 drawdown allowance: the initial floor is $48,000. A highest closing balance of $51,000 raises it to $49,000. On the following day, touching $49,000 in net liquidation value can fail the account immediately. A recovery before the close does not undo the breach.',
        'For simulated funded accounts, the published lock mechanism can fix the floor at $100 above the initial balance once its threshold is reached or a payout is requested. Evaluation accounts do not share that locking rule. Always read the amount for your exact product.',
      ],
    },
    {
      heading: 'Consistency rules apply to different stages and denominators',
      paragraphs: [
        'HyroTrader’s Core, One-Step and Two-Step evaluations limit a day’s credited contribution to **40% of the profit target**. Excess profit remains in the account but does not count toward that target; losses still count. Its FAQ says this evaluation distribution rule does not apply to Hyro Instant.',
        'Tradeify SELECT uses a **40% best-day share of total profit during evaluation**, while Growth has no evaluation consistency percentage. Those are different calculations: a share of the target is not a share of accumulated profit.',
        'The funded stage has its own rules. Tradeify lists 35% for Growth simulated-funded payouts, no consistency percentage for SELECT funded accounts, and a **20%, then 25%, then 30%** progression for newer Lightning accounts. Legacy Lightning purchases can keep 20% for every payout. Check the purchase date and account stage together.',
      ],
    },
    {
      heading: 'Hyro Instant vs Lightning Funded: compare the first payout',
      paragraphs: [
        'Hyro Instant lists no evaluation target. Its first request needs **three qualifying UTC trading days** and at least $25 in profit after the split. A qualifying day has a specific trade-size and price-movement definition, so simply opening any tiny trade is not enough. The FAQ caps profit counted per payout at 5% of the initial balance; profit above that cap is not paid. The starting split is 80%, with possible discretionary increases.',
        'Tradeify Lightning also skips evaluation, but requires a payout profit goal and consistency. On the published $50,000 example, the first goal is **$3,000**, whereas the first request is capped at **$2,000**. Tradeify says traders receive 90% of the requested amount. The goal, request cap and amount received are three different figures.',
        'Lightning’s next profit goal requires fresh trading profits; leftover profit from the previous cycle does not satisfy it. A request also locks the drawdown floor under Tradeify’s funded-account rule, so check the remaining loss room after a payout. Eligibility is not a guarantee that a request will be approved.',
      ],
      callout: { kind: 'example', text: 'Hypothetical Lightning first request: reaching the $3,000 goal does not make $3,000 withdrawable. A $2,000 request at a 90% split yields $1,800 to the trader, subject to all other conditions.' },
    },
    {
      heading: 'A practical risk-management checklist before checkout',
      paragraphs: [
        'Replay your normal trading process against the exact account rules. Use net results after fees, open losses and the actual reset time. A strategy can respect a stop loss on every trade and still breach the total account floor across several positions.',
      ],
      bullets: [
        '**Record both floors:** daily loss and maximum drawdown, including whether touching or crossing the boundary triggers a breach.',
        '**Track the stage:** evaluation, simulated funded and any later live transition can have different conditions.',
        '**Model the withdrawal:** profit goal, best-day calculation, request cap, split and the loss room remaining after payment.',
        '**Check access and costs:** permitted country, supported platform, session closing rules, entry fee, activation, renewal and data costs where applicable.',
        '**Keep the version:** save the contract and official rules that apply to the purchase date. New-account rules can differ from a legacy account.',
      ],
    },
    {
      heading: 'How to choose between these two models',
      paragraphs: [
        'Start with HyroTrader’s rules if the strategy requires its supported crypto instruments. Start with Tradeify’s rules if the strategy is built around its futures market. Then compare the program’s loss allowance and the complete route to a first withdrawal.',
        'This comparison establishes neither firm’s solvency nor a trader’s probability of receiving a payout. It describes their published conditions at a stated date. Use the linked firm files for documented background and check the current agreement before buying.',
      ],
    },
  ],
  sources: [
    { label: 'HyroTrader: evaluation process and simulated accounts', url: 'https://www.hyrotrader.com/evaluations/' },
    { label: 'HyroTrader: daily drawdown formula', url: HYRO_DAILY },
    { label: 'HyroTrader: static daily drawdown', url: HYRO_STATIC },
    { label: 'HyroTrader: risk conditions and profit distribution', url: HYRO_RISK },
    { label: 'HyroTrader: Hyro Instant conditions', url: HYRO_INSTANT },
    { label: 'HyroTrader: first Instant payout', url: HYRO_PAYOUT },
    { label: 'Tradeify: SELECT and Growth evaluations', url: TRADEIFY_EVALUATIONS },
    { label: 'Tradeify: EOD trailing drawdown and locking', url: TRADEIFY_DRAWDOWN },
    { label: 'Tradeify: Lightning Funded account rules', url: TRADEIFY_LIGHTNING },
    { label: 'Tradeify: Lightning profit goals, caps and split', url: TRADEIFY_PAYOUT },
    { label: 'Tradeify: consistency by account type', url: TRADEIFY_CONSISTENCY },
  ],
};
