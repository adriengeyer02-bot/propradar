/** /prop-firm-rules interface and PropRadar-written audit text (English, source of the other languages). */
const rules = {
  metaTitle: 'Prop Firm Rules: Drawdown, Payout and Trading Risk',
  metaDescription:
    'Compare sensitive prop-firm rules covering drawdown, news trading, payouts, consistency, EAs, copy trading and prohibited strategies.',
  schemaName: 'Prop firm rule audits',
  breadcrumb: 'Trading rules',
  eyebrow: 'Deep rule audit',
  h1: 'Clauses that can cost an account or a payout.',
  lead: 'PropRadar reads rule pages, help centers and flagship-product conditions to isolate dangerous clauses: drawdown, rollover, news, EA, copy trading, consistency, payout caps and sanctions.',
  reviewed: 'Page reviewed {date}. Each audit keeps its own visible source-check date.',
  statDeep: 'Deep audits',
  statClauses: 'Clauses extracted ({critical} critical)',
  statCompact: 'Mid/small firms ({critical} critical)',
  statTracked: 'Firms tracked',
  coverageAria: 'Rule audit coverage',
  statRuleFiles: 'Rule files',
  statPayoutSensitive: 'Payout-sensitive files',
  statLegalWatch: 'Legal watch',
  statDeepSources: '5+ sources',
  related: 'Related guides:',
  relatedConsistency: 'Consistency rule',
  relatedNews: 'News trading',
  statsAria: 'Rule statistics',
  families: [
    { label: 'Account closed', title: 'Drawdown & equity', text: 'The real danger is usually open equity, rollover, swaps and the server reset.' },
    { label: 'Profit removed', title: 'News & rollover', text: 'Some platforms technically allow the trade but remove gains or classify it as a violation.' },
    { label: 'Account blocked', title: 'EA, HFT, copy trading', text: 'An EA allowed for risk management can still be prohibited when it trades autonomously, copies accounts or overloads the server.' },
    { label: 'Withdrawal delayed', title: 'Payout & consistency', text: 'Best-day rules, payout caps, winning days and withdrawal cycles can matter more than the advertised profit split.' },
  ],
  alertsEyebrow: 'Consumer alerts',
  alertsTitle: 'What marketing pages do not say loudly enough.',
  viewAudit: 'View source audit',
  proofAria: '{name} rule audit proof',
  payoutChip: 'Payout {level}',
  legalChip: 'Legal {level}',
  sourceDeep: 'Deep sources',
  sourceUsable: 'Usable sources',
  sourceThin: 'Thin sources',
  sourceNone: 'No sources',
  severity: { Faible: 'Low', Moyen: 'Medium', 'Élevé': 'High', Critique: 'Critical' },
  proof: {
    'Source officielle lue': 'Official source read',
    'Source officielle partielle': 'Official source, partial',
    'Source commerciale repérée': 'Commercial page spotted',
  },
  sourceChecked: 'Source checked {date}',
  compactEyebrow: 'Mid & small firms',
  compactTitle: 'The long tail is being read firm by firm.',
  compactNote: 'These compact alerts come from official sources or spotted product pages. Partial files remain deliberately marked as such.',
  fullEyebrow: 'Full coverage',
  fullTitle: 'All other prop firms remain in the audit queue.',
  fullNote: 'PropRadar keeps smaller firms visible to avoid blind spots: spotted source, risk archive or file still needing sourcing.',
  showQueue: 'Show the {count} firms still in the audit queue',
  productToIdentify: 'Product to identify',
  mainProductToIdentify: 'Main product to identify',
  coverageArchive: 'Risk archive',
  coverageMulti: 'Multi-source file',
  coverageSpotted: 'Source spotted',
  coverageToSource: 'To source',
  nextEyebrow: 'Next deep-dive',
  nextTitle: 'Next flagship products to break down.',
  colDrawdown: 'Drawdown',
  colNews: 'News',
  colEa: 'EA',
  colPayout: 'Payout',
  colScore: 'Score',
  scoreAria: 'PropRadar score {score} out of 100',
  matrixEyebrow: 'Quick matrix',
  matrixTitle: 'Active firms ranked by payout risk.',
  showMatrix: 'Show the {count} active firms by payout risk',
  scoreLine: 'score {score}/100',
  audits: {
    ftmo: {
      headline: 'The main risk comes from equity calculations and prohibited practices.',
      verdict:
        'FTMO is readable, but its rules are strict: equity-based daily loss, EOD trailing drawdown on 1-Step, a Best Day Rule and broad restrictions on gap trading, HFT, connected accounts and circumvention.',
      clauses: [
        {
          title: 'Daily loss includes open equity',
          finding: 'Daily loss includes balance, open positions, swaps and commissions. A floating position can breach the rule before it is closed.',
          impact: 'Never monitor balance alone. A wick, spread expansion or swap can be enough to breach the account.',
        },
        {
          title: 'Best Day / Consistency rule on 1-Step and FTMO Account',
          finding:
            'On accounts from orders placed before October 12, 2026, the best day must not exceed 50% of positive profits. New 1-Step orders use a Consistency rule that compares the best day with total profit, losing days included. Neither is a breach, but both can block progression or a reward until the ratio is corrected.',
          impact: 'One large winning trade can force you to keep trading to unlock the account, which means taking more risk.',
        },
        {
          title: 'Broad prohibited-practice clauses',
          finding:
            'Gap trading, latency, ultra-high speed, coordinated accounts, account rolling, one-sided bets and hyperactive EAs can lead to disqualification, removed trades, lost rewards or termination.',
          impact: 'Challenge-hack strategies and copy-paste multi-account setups are the real danger, even when the public score is excellent.',
        },
      ],
    },
    the5ers: {
      headline: 'The daily drawdown is more deceptive than it looks.',
      verdict:
        'The5ers High Stakes looks clean on paper, but daily drawdown uses the higher of the previous day balance or equity. A trade held through rollover can sharply reduce the available margin.',
      clauses: [
        {
          title: 'Daily drawdown uses the higher balance or equity value',
          finding: 'The 5% daily drawdown is set at server midnight from the previous closing equity or balance, whichever is higher.',
          impact: 'Ending the day with high equity raises the next day threshold. A held position can close the account sooner than expected.',
        },
        {
          title: '30-day inactivity rule',
          finding: 'Accounts expire after more than 30 consecutive days without trading activity, counted from registration.',
          impact: 'A challenge bought for later can become a complete loss if it sits unused.',
        },
        {
          title: 'Payout every two weeks',
          finding: 'After reaching funded status, withdrawals are available from the dashboard every two weeks.',
          impact: 'Cash flow is not instant, so do not compare only the split and challenge price.',
        },
      ],
    },
    fundednext: {
      headline: 'Numerous anti-abuse rules can remove profits before account closure.',
      verdict:
        'FundedNext is well documented, but its anti-abuse limits are extensive: risk cap, margin cap, quick strike, hyperactivity, settlement trading, copy trading and multi-account hedging.',
      clauses: [
        {
          title: 'Maximum 3% risk and 70% margin cap',
          finding:
            'FundedNext limits risk to 3% at all times and cumulative margin to 70%. A first violation can trigger a warning and removal of profits tied to the trade.',
          impact: 'Profits may be removed when position sizing falls outside the framework, even without immediate account closure.',
        },
        {
          title: 'Quick Strike and trades under 30 seconds',
          finding:
            'Trades closed in under 30 seconds are monitored. At 30% or more Quick Strike profit, the funded account may be terminated and the affected profits removed.',
          impact: 'Ultra-short scalping can turn strong performance into a denied payout.',
        },
        {
          title: 'Cumulative hyperactivity across accounts',
          finding:
            'Two hundred trades or 2,000 server messages per day trigger warnings; 15,000 messages can disable the account. Warnings may accumulate across accounts.',
          impact: 'An EA or overly active order management can cost the account even without malicious intent.',
        },
      ],
    },
    topstep: {
      headline: 'The main traps are consistency, payout caps and five winning days.',
      verdict: 'Topstep is established and readable, but progression and withdrawals depend on more than gross profit.',
      clauses: [
        {
          title: 'Consistency Target 50%',
          finding: 'The best day must stay below 50% of the profit target. If exceeded, the profit target increases, and losses do not reset the best day.',
          impact: 'One large winning day can delay funded status even after the target amount is reached.',
        },
        {
          title: 'XFA payout caps',
          finding:
            'Express Funded Account withdrawals are capped by request and account size. The cap can depend on the standard or consistency path and the DLL option.',
          impact: 'A large profit does not guarantee an immediate withdrawal of the same amount.',
        },
        {
          title: 'Single Profile Policy',
          finding: 'All accounts must remain under one Topstep profile. Multiple profiles can lead to closure or suspension.',
          impact: 'A duplicate account or registration mistake can become a real operational risk.',
        },
      ],
    },
    'apex-trader-funding': {
      headline: 'Apex changed its offer significantly: separate legacy and new accounts.',
      verdict:
        'The newer Apex offer highlights EOD drawdown, no payout denials, 50% consistency and no recurring billing on new products. Legacy accounts remain a separate system.',
      clauses: [
        {
          title: 'New products vs legacy accounts',
          finding: 'Apex states that legacy accounts are no longer sold, are not changed retroactively and may remain on recurring billing until cancelled.',
          impact: 'Before comparing Apex reviews or discounts, identify whether the source discusses a legacy or current product.',
        },
        {
          title: '5 trading days between rewards',
          finding: 'The official page highlights five trading days for payouts and rewards on the current path.',
          impact: 'Even after progressing quickly, withdrawal speed depends on the trading-day cycle.',
        },
        {
          title: '50% consistency',
          finding: 'The newer offer displays a 50% consistency rule.',
          impact: 'One large day can limit withdrawal or progression depending on the account used.',
        },
      ],
    },
    'e8-markets': {
      headline: 'E8 is highly detailed, but some rules remove profits without closing the account.',
      verdict:
        'E8 Markets documents daily drawdown, profit caps, news, HFT, EAs and best-day rules. The main consumer risk is profit removed at rollover or payout.',
      clauses: [
        {
          title: 'Daily drawdown with permanent closure',
          finding:
            'Daily drawdown is a fixed amount based on initial balance. If equity or balance touches the loss level, the account is permanently closed even when the technical close finishes above it.',
          impact: 'The final close may appear above the threshold while the account is still lost because the server-side breach takes priority.',
        },
        {
          title: 'Daily profit cap 2%',
          finding:
            'On E8 Pro, profits above the daily cap do not count and are removed after rollover. Attempts to work around this through hedging or partial closes may be grouped together.',
          impact: 'An exceptional day can be partially removed from the eligible result.',
        },
        {
          title: 'News trading on Performance E8 One',
          finding:
            'On E8 One performance accounts, opening, closing or modifying SL/TP within five minutes of high-impact news is prohibited and profits may be removed.',
          impact: 'The platform may allow the action technically while the profit is later removed at payout.',
        },
      ],
    },
    'funding-pips': {
      headline: 'Breaches often come from equity, rollover and spread expansion.',
      verdict:
        'FundingPips clearly states that limits are monitored server-side in real time. The costliest mistakes involve tight stops, the 5 PM ET rollover and positions open during news.',
      clauses: [
        {
          title: 'Real-time equity monitoring',
          finding: 'Daily and maximum loss monitor live equity. The server record controls even when the terminal or dashboard is delayed.',
          impact: 'A floating position can close the account before the local display makes the breach clear.',
        },
        {
          title: 'Rollover 5 PM ET',
          finding: 'FundingPips warns that spreads may widen sharply at 5 PM ET, triggering stops and breaches.',
          impact: 'A stop that looks safe on a Bid chart can be hit by the Ask during rollover.',
        },
        {
          title: 'Reward request requires closed trades',
          finding: 'The reward cycle requires closing positions, waiting 15 minutes and then requesting the split.',
          impact: 'Open positions and overnight fees can reduce the safety margin at the wrong time.',
        },
      ],
    },
    'alpha-capital-group': {
      headline: 'The main danger is news restrictions, unapproved EAs and anti-gambling rules.',
      verdict:
        'Alpha Capital permits some uses, but post-qualification rules are sensitive around news windows, IPs, pre-approved EAs and behavior classified as gambling.',
      clauses: [
        {
          title: 'News: opening and closing restricted by plan',
          finding:
            'After qualification, some plans prohibit opening or closing two or five minutes around high-impact news. Even a TP or SL triggered in the window can be a soft violation.',
          impact: 'A position may be held legitimately while a take profit hit at the wrong moment makes the profit ineligible.',
        },
        {
          title: 'EAs limited to risk management',
          finding: 'Autonomous EAs, third-party bots, HFT, latency arbitrage or shared EAs generating identical trades can close the account.',
          impact: 'An allowed EA does not mean unrestricted automated trading. Confirm the use case, platform and pre-approval requirements.',
        },
        {
          title: 'IP and household restrictions',
          finding: 'The same household, multiple IPs, undeclared VPN/VPS use or inconsistent location changes can trigger a violation or security review.',
          impact: 'Travel, shared housing, another trader in the family or a poorly declared VPS can become a compliance problem.',
        },
      ],
    },
  },
  compact: {
    'funding-traders': {
      riskFamily: 'Payout + consistency',
      signal:
        'The tables show different daily loss, maximum loss, risk-per-trade, consistency and payout schedules for Instant Funded, 1-Step and 2-Step.',
      impact:
        'Before buying, compare more than price: confirm the exact product, the 14- or 21-day payout cycle and the consistency score that can block a withdrawal.',
    },
    'maven-trading': {
      riskFamily: 'Drawdown + refund',
      signal:
        'The official page separates daily loss, maximum loss, profit targets and payout frequency, and states that some fees are refundable at the third withdrawal.',
      impact: 'The real cost depends on how many payouts are reached. A low entry price may offer poor value when the selected program leaves little drawdown room.',
    },
    fxify: {
      riskFamily: 'Daily drawdown',
      signal: 'Daily drawdown may be based on the previous end-of-day balance. The first payout is presented as on demand, followed by biweekly withdrawals.',
      impact: 'A position held through the reset can reduce the next day margin. Also verify add-ons that change the split, payout and leverage.',
    },
    'instant-funding': {
      riskFamily: 'Smart drawdown + payout timing',
      signal: 'On Instant Funding, smart drawdown locks after profit. On IF1, the account lasts 24 hours and the best trade cannot represent too much of total profit.',
      impact: 'Instant does not always mean an immediate payout: some products require 14 days, a profit threshold or a consistency rule.',
    },
    'trade-the-pool': {
      riskFamily: 'Stocks + valid profit',
      signal:
        'Rules include maximum volume per minute on an instrument, profit ratios per position, minimum position counts, payout minimums and risk/KYC reviews.',
      impact: 'For stocks, drawdown is not the only danger: an oversized small-cap trade or concentrated profit can be invalidated.',
    },
    'funded-trading-plus': {
      riskFamily: 'High-water mark',
      signal: 'Daily drawdown may use the higher of balance or equity at reset. Withdrawals do not lower the high-water mark in some calculations.',
      impact: 'A withdrawal can look as if it secures the account while the drawdown threshold remains anchored higher.',
    },
    'goat-funded-trader': {
      riskFamily: 'News + reward caps',
      signal: 'Trades opened or closed within five minutes of high-impact news can have profit capped. Funded accounts also have initial withdrawal limits.',
      impact: 'News trading may be allowed while gains are capped. Read the profit-removal clause, not only the news-allowed label.',
    },
    'audacity-capital': {
      riskFamily: 'Permissive rules to confirm',
      signal:
        'The page advertises an unlimited trading period, maximum daily loss, maximum loss, same-day payout and permission for news, weekend, EA and copy trading.',
      impact: 'When a page looks highly permissive, verify the exact definitions of EA, copy trading and same-day payout in the dashboard and terms.',
    },
    fintokei: {
      riskFamily: 'Open risk + payout threshold',
      signal: 'SwiftTrader lists daily loss, maximum loss, maximum allowed risk on open trades and minimum profit per payout.',
      impact: 'Even with fast payouts, the maximum open-risk rule can block multi-position strategies or disguised martingale setups.',
    },
    'hantec-trader': {
      riskFamily: 'Static balance drawdown',
      signal:
        'The official table lists balance-static drawdown, daily loss, maximum total loss, reward frequency and minimum trading days for each stage.',
      impact: 'The word static is not enough: verify whether the threshold uses balance, equity or both at the moment of violation.',
    },
    'oneup-trader': {
      riskFamily: 'Trailing drawdown + consistency',
      signal:
        'No daily loss is displayed, but trailing drawdown, at least 10 trading days and consistency apply: the other three best days must total at least 80% of the largest day.',
      impact: 'Without daily loss, the main traps become trailing drawdown and concentrating profit in a single session.',
    },
    earn2trade: {
      riskFamily: 'Futures + pass rate',
      signal:
        'Earn2Trade publishes uncommon metrics: pass rate, the share of live and live-sim accounts, weekly withdrawals from $100 and futures-only markets.',
      impact: 'This is more transparent than many competitors, but the pass rate shows that the product is a difficult evaluation, not purchased income.',
    },
    'take-profit-trader': {
      riskFamily: 'PRO payout + account fee',
      signal:
        'The site highlights PRO day-one withdrawals, an 80/20 then PRO+ 90/10 split, a one-time PRO fee and a PRO+ live transition with the same risk rules.',
      impact: 'Fast payouts are attractive, but verify the Test to PRO to PRO+ path, the fee and the exact live drawdown.',
    },
    brightfunded: {
      riskFamily: 'Payout marketing',
      signal: 'The page advertises payouts from seven days after the first funded trade and up to a 100% profit split subject to conditions.',
      impact: 'Check the terms carefully: up to often depends on the plan, add-ons, cycle and consistency rules.',
    },
    'aqua-funded': {
      riskFamily: 'Instant funding',
      signal: 'The official source highlights instant funding and a high profit split, but each product page needs a plan-by-plan review.',
      impact: 'Treat the instant promise as a claim to verify: payout cycles, drawdown, refunds and news rules may change by account.',
    },
    'blue-guardian': {
      riskFamily: 'Structured process',
      signal: 'The site highlights evaluations with transparent rules, discipline, risk management and fast payouts.',
      impact: 'Before buying, verify the exact rules page for drawdown, news, payout minimums and instant-funding conditions.',
    },
    'breakout-prop': {
      riskFamily: 'Crypto liquidity',
      signal: 'Breakout is crypto-first: reread the official source for spread, liquidity, exchange rules, liquidation and market-specific hours.',
      impact: 'A crypto prop firm should not be judged like a forex prop firm: wick, slippage and liquidation risk must be visible before payment.',
    },
    'the-trading-pit': {
      riskFamily: 'Multi-asset',
      signal: 'Official coverage is multi-asset. Separate rules by asset class because futures and CFD challenges do not carry the same risks.',
      impact: 'Do not transfer a rule from one product to another: drawdown, platforms, fees and trading hours can differ sharply.',
    },
    'finotive-funding': {
      riskFamily: 'Instant + challenge',
      signal:
        'The official source is identified, but the product page must confirm detailed clauses for daily loss, maximum loss, refunds, payouts and trading restrictions.',
      impact: 'Classify this as no purchase without a final read until product-specific terms are captured in the PropRadar file.',
    },
    myfundedfutures: {
      riskFamily: 'Futures payout',
      signal:
        'The official source is identified, but detailed payout, activation, drawdown and consistency parameters need confirmation in the help center or checkout.',
      impact: 'Do not buy from the monthly price alone: funded-account fees, payout schedules and trailing drawdown determine the real cost.',
    },
    bulenox: {
      riskFamily: 'Futures trailing drawdown',
      signal: 'The official source is identified, but the file still needs exact activation fees, trailing drawdown, payout minimums and contract rules.',
      impact: 'Keep this in the futures audit queue: costs and limits after funded status matter more than the evaluation price.',
    },
  },
};

export type RulesMessages = typeof rules;
export default rules;
