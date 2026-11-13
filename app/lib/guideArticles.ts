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
  compare?: { columns: string[]; rows: { label: string; values: string[] }[]; note?: string };
  /** Numbered steps, shown as a path. */
  steps?: { title: string; text: string }[];
  fit?: { yes: string[]; no: string[] };
  prosCons?: { pros: string[]; cons: string[] };
  callout?: GuideCallout;
};

export type GuideArticle = {
  updated: string;
  intro?: string;
  /** "Key points" box shown under the intro. */
  keyPoints?: string[];
  sections: GuideArticleSection[];
  sources?: { label: string; url: string }[];
};

export const guideArticles: Record<string, GuideArticle> = {
  'prop-firm-sans-challenge': {
    updated: '2026-11-12',
    intro:
      'A no-challenge prop firm sells a funded account directly, without the classic evaluation phase. It sounds like a shortcut. In practice you **pay more upfront** for skipping the test, and the rules you would have met in the challenge **move into the funded account**, where a mistake costs the account instead of a retry.',
    keyPoints: [
      '**No challenge means no profit target**, not no rules: drawdown, consistency and minimum days are still there.',
      'A direct account usually costs **several times** a challenge of the same size.',
      'Compare the **total cost to a first payout**, not the sticker price.',
      'It suits a **stable, low-drawdown** strategy, not one you are still testing.',
    ],
    sections: [
      {
        heading: 'What "no challenge" actually means',
        visual: 'challenge-vs-direct',
        paragraphs: [
          'In a classic model you pay a fee, hit a profit target under a daily loss limit and a maximum drawdown, sometimes over two phases, and only then trade a funded account that can pay out. A no-challenge program, often called **instant funding** or **direct funding**, removes that first step: you buy the funded account and can request payouts once its own conditions are met.',
          'What disappears is the **profit target before funding**. What does not disappear is **risk control**. Instant accounts almost always keep a maximum drawdown, often a trailing one, and many add a consistency rule, a minimum number of trading days or a smaller first payout cap.',
        ],
        callout: { kind: 'tip', text: 'The firm still filters traders. It simply does it **after you have paid**.' },
      },
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
