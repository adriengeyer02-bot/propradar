/**
 * Long-form editorial text for guides.
 *
 * The guide template is built from firm data (tables, cards, shortlists).
 * These sections add the explanatory prose that readers and search engines
 * need: definitions, worked examples, trade-offs. Rendered after the quick
 * answer on /guides/[slug]. Keep every firm-specific fact dated and sourced.
 */

export type GuideArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideArticle = {
  updated: string;
  intro?: string;
  sections: GuideArticleSection[];
  sources?: { label: string; url: string }[];
};

export const guideArticles: Record<string, GuideArticle> = {
  'prop-firm-sans-challenge': {
    updated: '2026-10-23',
    intro:
      'A no-challenge prop firm sells a funded account directly, without the classic evaluation phase. It sounds like a shortcut. In practice you pay more upfront for skipping the test, and the rules you would have met in the challenge move into the funded account, where a mistake costs the account instead of a retry.',
    sections: [
      {
        heading: 'What "no challenge" actually means',
        paragraphs: [
          'In a classic model you pay a fee, hit a profit target under a daily loss limit and a maximum drawdown, sometimes over two phases, and only then trade a funded account that can pay out. A no-challenge program, often called instant funding or direct funding, removes that first step: you buy the funded account and can request payouts once its own conditions are met.',
          'What disappears is the profit target before funding. What does not disappear is risk control. Instant accounts almost always keep a maximum drawdown, often a trailing one, and many add a consistency rule, a minimum number of trading days or a smaller first payout cap. The firm still needs to filter traders; it simply does it after you have paid.',
        ],
      },
      {
        heading: 'Why instant funding usually costs more',
        paragraphs: [
          'Firms price the evaluation as a filter: a large share of challenge buyers never reach a payout, and their fees fund the traders who do. When you skip the filter, the firm prices that risk into the account itself. That is why a direct account is typically several times the price of a challenge of the same size, why account sizes are smaller, and why the drawdown is often tighter.',
          'Compare the full cost of reaching a first payout, not the sticker price. As an illustration with round numbers: a $100 challenge with a one-in-three chance of passing costs about $300 on average to get funded. A $350 instant account with a tight trailing drawdown can cost more than that if you lose one or two accounts before the first payout. The cheaper option depends on how often your strategy would survive the funded rules.',
        ],
      },
      {
        heading: 'The rules that decide whether a direct account is worth it',
        paragraphs: [
          'Read the funded-account terms, not the marketing page. These are the points that most often change the economics:',
        ],
        bullets: [
          'Drawdown type: a trailing drawdown that follows your equity high is far harder to live with than a static limit fixed at the starting balance.',
          'Consistency rule: many instant programs cap how much of your profit can come from your best day before a payout is allowed.',
          'First payout conditions: minimum trading days, minimum profit, and caps on the first one or two withdrawals.',
          'Profit split at the start: some programs begin lower than their challenge models and only scale up later.',
          'Replacement cost: what it costs to buy a new account after a breach, and whether any discount applies.',
          'Restricted strategies: news windows, holding periods, copy trading and minimum trade durations.',
        ],
      },
      {
        heading: 'Who should consider a no-challenge prop firm',
        paragraphs: [
          'Direct funding makes the most sense for a trader with a stable, low-drawdown strategy and a track record of respecting daily limits, who values time over cost. It makes the least sense for a trader still testing a strategy, for a high-volatility style that needs room, or for anyone buying mainly to avoid the pressure of a profit target: that pressure is replaced by the pressure of a live drawdown on an account that cost more.',
          'If you are unsure, a cheap one-step challenge is often the better test of whether your strategy fits a firm\'s rules before committing to a more expensive direct account.',
        ],
      },
      {
        heading: 'Red flags specific to instant funding',
        paragraphs: [
          'Instant programs attract new and marketing-heavy firms because they are easy to sell. Treat these as warning signs: very large accounts at very low prices, payout promises with no published payout policy, rules that differ between the homepage and the terms, and terms that let the firm deny payouts at its sole discretion without a stated reason. Check the firm\'s PropRadar profile for its legal entity, payout signals and any domain or regulator alert before buying.',
        ],
      },
    ],
  },

  'prop-firm-sans-consistency-rule': {
    updated: '2026-10-23',
    intro:
      'A consistency rule limits how much of your total profit can come from a single day. It exists because one lucky day, one oversized position or one news spike can produce a payout that says nothing about whether you can trade the account over time. Understanding the exact formula matters more than finding a firm that claims to have none.',
    sections: [
      {
        heading: 'How the rule is calculated',
        paragraphs: [
          'Most firms use the same core formula: best-day profit divided by total profit, expressed as a percentage. If the result is above the firm\'s limit, you are not yet eligible, either to pass the evaluation or to request a payout, depending on where the rule applies.',
          'Worked example with a 50% limit: you make $1,200 on Monday, $300 on Tuesday and $500 on Wednesday, so $2,000 in total. Your best day is $1,200, which is 60% of the total. You are above the limit. To fix it you do not need to lose anything: you need more total profit, here at least $2,400, so that $1,200 represents 50% or less.',
          'Some firms apply the rule differently. Topstep, for example, raises the profit target in the Trading Combine instead of failing you: if your best day exceeds 55% of the target, the target grows to best day divided by 0.55 (Topstep help center, page dated September 17, 2026).',
        ],
      },
      {
        heading: 'Where the rule applies: evaluation, payout or both',
        paragraphs: [
          'The same percentage can mean very different things. A consistency rule in the evaluation only delays your pass. A consistency rule on payouts can block a withdrawal after you have already made money on a funded account, which is far more frustrating. Some firms also use different limits per stage: Topstep uses 55% in the Combine and 40% on the Consistency payout path of its Express Funded Account.',
          'FTMO changed its rule on October 12, 2026: new 1-Step Challenge orders use a Consistency rule that compares your best day with your total profit, losing days included, while accounts from older orders keep the previous Best Day Rule, which only counted positive days. FTMO says that if you do not meet the requirement, you simply keep trading until you do (FTMO trading update, October 8, 2026). PropRadar has not captured a percentage best-day rule on The5ers High Stakes program. Always confirm the stage, product and order date.',
        ],
      },
      {
        heading: 'Is a firm without a consistency rule better?',
        paragraphs: [
          'Not automatically. Firms that drop the consistency rule usually control risk another way: tighter daily loss limits, trailing drawdowns, caps on the first payouts, minimum trading days or limits on position size. A "no consistency rule" headline can hide a funded account that is harder to keep.',
          'The rule mainly hurts traders whose results come in bursts: news traders, swing traders who close one large position, or anyone who sizes up after a losing streak. If your daily results are fairly even, a 40 to 50% limit rarely binds. If you regularly make most of your week in one session, look for programs without the rule and compare what replaces it.',
        ],
      },
      {
        heading: 'How to trade comfortably under a consistency rule',
        paragraphs: [
          'Keep a running calculation of best day divided by total profit and know, before each session, how much you can make without pushing the ratio above the limit. When you have one big day early, plan for several smaller positive days rather than trying to repeat it. And avoid sizing up near the end of an evaluation: a single oversized winning day can delay a pass as surely as a losing one.',
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
    updated: '2026-10-23',
    intro:
      'There is no single best prop firm. There is a best firm for your market, your trading style and the amount of risk you accept from the operator itself. This ranking starts from that last point: before comparing profit splits and discounts, it checks whether a firm is likely to still be there, and to pay, when you need it.',
    sections: [
      {
        heading: 'How this ranking is built',
        paragraphs: [
          'Each firm in PropRadar gets a score out of 100 built from rule clarity, payout evidence, legal transparency, public review signals and operating history. Affiliate links are disclosed on every profile and never change a score. A firm with an affiliate relationship keeps its weaknesses on display, and a firm without one can rank at the top.',
          'At this update the highest scores belong to long-running operators: FTMO (91/100), The5ers (85/100) and Topstep (84/100). They are not the cheapest. They are the profiles with the longest public track records, the most readable terms and the fewest unresolved payout signals in PropRadar\'s files.',
        ],
      },
      {
        heading: 'Start with your market',
        paragraphs: [
          'Forex and CFD traders and futures traders are not shopping in the same market. Forex/CFD firms such as FTMO and The5ers run on platforms like MT5 or cTrader with percentage-based limits. Futures firms such as Topstep run on futures platforms with dollar-based limits and, often, trailing drawdowns. A great futures firm is useless to a forex trader, so filter by market first.',
        ],
      },
      {
        heading: 'Then match the rules to your style',
        paragraphs: [
          'The rules that end most accounts are not the profit targets. They are the drawdown type, the daily loss limit, consistency rules, news restrictions and holding rules. A scalper needs fast execution and no minimum trade duration. A swing trader needs overnight and weekend holding. A news trader needs a firm that allows trading around high-impact releases on the funded account, not only in the evaluation.',
        ],
        bullets: [
          'Drawdown: static limits are easier to manage than trailing ones.',
          'Consistency: check whether it applies to the evaluation, to payouts, or both.',
          'News and holding: confirm the funded-account rules, which are often stricter.',
          'Payouts: frequency, minimum amount, first-payout caps and processing fees.',
        ],
      },
      {
        heading: 'Finally, compare the real cost',
        paragraphs: [
          'The real cost of a prop firm is the money you spend before your first payout: challenge fees, resets, activation fees and replacement accounts, minus any refund. A cheap challenge with a harsh drawdown can cost more than an expensive one you are likely to pass. Discount codes matter last, once a firm has passed every other filter.',
        ],
      },
      {
        heading: 'What would make a firm drop in this ranking',
        paragraphs: [
          'Scores move when the evidence moves: a regulator warning, repeated payout delays, a rule change applied to existing accounts, a domain that stops serving the firm, or a loss of transparency about the legal entity. Each change is dated in the firm\'s update history, so you can see why a score changed and when.',
        ],
      },
    ],
  },

  'topstep-review': {
    updated: '2026-10-23',
    intro:
      'Topstep is the oldest name in futures prop trading: founded in 2012 in Chicago by Michael Patak, it ran its Trading Combine years before the current wave of prop firms. That history is its main strength. Its weaknesses are a futures-only offer, frequent rule changes since late 2025 and a trailing loss limit that demands discipline.',
    sections: [
      {
        heading: 'Is Topstep legit?',
        paragraphs: [
          'Topstep is an established, US-based operator with a long public history, a published help center and an affiliated introducing broker, Topstep Brokerage, launched in early 2026. PropRadar scores it 84/100 and has not recorded a regulator warning against it. As with every prop firm, the evaluation and the Express Funded Account are simulated: payouts are rewards paid by Topstep, not trading profits from a brokerage account.',
          'On Trustpilot the profile shows a 3.7 TrustScore across 14,955 reviews, with Trustpilot\'s notice that the company "may be associated with high-risk investments" (checked October 23, 2026). The rating is average for the category. Late 2025 complaints centred on TopstepX platform outages and failed stop orders.',
        ],
      },
      {
        heading: 'How the Trading Combine works',
        paragraphs: [
          'The Trading Combine is Topstep\'s evaluation. It comes in 50K, 100K and 150K sizes, with profit targets of $3,000, $6,000 and $9,000. There is no time limit and no minimum number of trading days. Positions must be closed by the end of the session: Topstep does not allow overnight or weekend holds.',
          'The Maximum Loss Limit (MLL) is $2,000, $3,000 or $4,500 below the starting balance depending on size. It trails upward as your end-of-day balance grows and never moves down, but breaches are monitored in real time, including unrealized losses. In the Combine it stops trailing once it reaches the starting balance (Topstep help center, updated September 18, 2026).',
          'The consistency target is 55%: your best day cannot exceed 55% of the profit target. If it does, you are not failed; the target rises to best day divided by 0.55 (help center, September 17, 2026). An optional daily loss limit of $1,000, $2,000 or $3,000 stops trading for the session without closing the account.',
        ],
      },
      {
        heading: 'Express Funded Account and payouts',
        paragraphs: [
          'After passing, you trade an Express Funded Account (XFA), still simulated, where payouts begin. The XFA starts at a $0 balance with the same MLL cushion below it. Since February 2026 you choose between two payout paths, and the choice is permanent: the Standard path requires five winning days of at least $150 before each payout, while the Consistency path requires three trading days with your largest day at 40% or less of net profit.',
          'Traders who joined on or after January 12, 2026 receive 90% of approved payouts; earlier traders keep 100% of their first $10,000, then 90%. The minimum payout request is $125. After the first payout the MLL is set to $0, which removes the cushion: one bad day after withdrawing can end the account. Top performers can be invited to a Live Funded Account with real capital, mandatory daily loss limits and a reserve that is released in steps.',
        ],
      },
      {
        heading: 'Pros and cons',
        paragraphs: ['What stands out after reading the current rules:'],
        bullets: [
          'Pro: the longest track record in futures prop trading and a large, documented help center.',
          'Pro: no time limit or minimum days in the Combine; the consistency rule raises the target instead of failing you.',
          'Pro: a 90% split from the first dollar for new traders and a low $125 payout minimum.',
          'Con: futures only, and every position must be flat by the session close.',
          'Con: the MLL is reset to $0 after the first payout, so withdrawing early removes your safety margin.',
          'Con: rules changed several times between November 2025 and April 2026; reread them before each purchase.',
        ],
      },
      {
        heading: 'Who Topstep suits',
        paragraphs: [
          'Topstep fits intraday futures traders who want an established operator and can live with an intraday-monitored trailing limit. It does not fit forex or CFD traders, swing traders who hold overnight, or anyone choosing mainly on price: monthly subscription pricing makes a slow evaluation more expensive than one-time-fee competitors. If you are comparing it with Apex, read our Topstep vs Apex guide, which matches each account version rule by rule.',
        ],
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
    updated: '2026-10-23',
    intro:
      'Drawdown is the rule that ends most prop firm accounts. It is the maximum amount your account is allowed to lose, measured from a reference point. Two firms can both advertise a "$3,000 drawdown" on a $50,000 account and give you completely different room to trade, because the reference point moves differently.',
    sections: [
      {
        heading: 'Daily loss limit vs maximum drawdown',
        paragraphs: [
          'Most firms use two limits at once. The daily loss limit caps how much you can lose in one trading day, usually measured from the day\'s starting balance or equity. The maximum drawdown caps your total loss over the life of the account. Breaking either one usually breaches the account, although some futures firms only stop you for the rest of the session when you hit the daily limit.',
        ],
      },
      {
        heading: 'Static drawdown',
        paragraphs: [
          'A static drawdown is fixed at a level below your starting balance and never moves. On a $100,000 account with a 10% static limit, the floor is $90,000 forever. If you grow the account to $108,000, you have $18,000 of room. This is the most forgiving model, and it is common on forex/CFD two-step challenges.',
        ],
      },
      {
        heading: 'Trailing drawdown (intraday)',
        paragraphs: [
          'An intraday trailing drawdown follows your highest equity in real time, including unrealized profit. Example on a $50,000 account with a $2,500 trailing limit: the floor starts at $47,500. A trade runs to +$1,500 unrealized, so the floor moves to $49,000, even if you then close the trade at breakeven. You now have $1,000 of room instead of $2,500, without having banked a cent. This is the strictest model and is common on futures and instant-funding accounts.',
        ],
      },
      {
        heading: 'End-of-day (EOD) trailing drawdown',
        paragraphs: [
          'An end-of-day trailing drawdown only moves when the trading day closes, based on your closing balance. Intraday swings in open profit do not raise the floor, which makes it much easier to manage than intraday trailing. Note the detail many traders miss: the floor only moves at the close, but a breach is often still checked in real time. Topstep, for example, trails its Maximum Loss Limit from the end-of-day balance while monitoring it live, unrealized losses included.',
        ],
      },
      {
        heading: 'When the trailing stops: the lock',
        paragraphs: [
          'Most trailing models stop trailing at some point, usually when the floor reaches the starting balance (or starting balance plus a small buffer). From then on the limit behaves like a static one. This is why the first days of a trailing account are the most dangerous: build the buffer to the lock level before taking larger positions.',
        ],
      },
      {
        heading: 'Balance-based vs equity-based limits',
        paragraphs: [
          'A balance-based limit only counts closed trades. An equity-based limit counts open positions too, so a floating loss can breach the account even if you would have closed the trade in profit later. Most modern firms measure breaches on equity. Read the definition in the terms, not the summary table.',
        ],
      },
      {
        heading: 'How to choose',
        paragraphs: ['Match the drawdown model to how your trades behave:'],
        bullets: [
          'Trades that often go well into profit before coming back: avoid intraday trailing, prefer static or EOD.',
          'Small, frequent scalps with tight stops: a trailing limit is manageable if the lock level is reachable quickly.',
          'Swing trades with wide stops: you need a static limit and room larger than your typical open loss.',
          'Always size positions from the remaining room to the floor, not from the advertised account size.',
        ],
      },
    ],
    sources: [{ label: 'Topstep help center: Maximum Loss Limit', url: 'https://intercom.help/topstep-llc/en/articles/8284204' }],
  },
};

export function getGuideArticle(slug: string) {
  return guideArticles[slug];
}
