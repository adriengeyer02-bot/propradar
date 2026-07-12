import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import {
  auditStatusClass,
  formatUsd,
  getFirmBySlug,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  scoreClass,
  statusClass,
} from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

export const metadata: Metadata = {
  title: 'Sensitive prop firm rules',
  description:
    'PropRadar audit of sensitive clauses in official prop firm rules: drawdown, news, payout, consistency, EA, copy trading and prohibited practices.',
};

type RuleSeverity = 'Faible' | 'Moyen' | 'Élevé' | 'Critique';

type RuleClause = {
  title: string;
  severity: RuleSeverity;
  finding: string;
  consumerImpact: string;
};

type OfficialRuleAudit = {
  slug: string;
  product: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceDate: string;
  headline: string;
  verdict: string;
  clauses: RuleClause[];
};

type CompactRuleAudit = {
  slug: string;
  product: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceDate: string;
  proofLevel: 'Source officielle lue' | 'Source officielle partielle' | 'Source commerciale repérée';
  riskFamily: string;
  severity: RuleSeverity;
  signal: string;
  consumerImpact: string;
};

const officialRuleAudits: OfficialRuleAudit[] = [
  {
    slug: 'ftmo',
    product: 'FTMO Challenge 1-Step / 2-Step',
    sourceLabel: 'Trading Objectives + Forbidden Trading Practices FTMO',
    sourceUrl: 'https://ftmo.com/en/trading-objectives/',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'The main risk comes from equity calculations and prohibited practices.',
    verdict:
      'FTMO is readable, but its rules are strict: equity-based daily loss, EOD trailing drawdown on 1-Step, a Best Day Rule and broad restrictions on gap trading, HFT, connected accounts and circumvention.',
    clauses: [
      {
        title: 'Daily loss includes open equity',
        severity: 'Critique',
        finding:
          'Daily loss includes balance, open positions, swaps and commissions. A floating position can breach the rule before it is closed.',
        consumerImpact:
          'Never monitor balance alone. A wick, spread expansion or swap can be enough to breach the account.',
      },
      {
        title: 'Best Day Rule sur 1-Step et FTMO Account',
        severity: 'Élevé',
        finding:
          'The best day must not exceed 50% of positive profits. This is not always a breach, but it can block progression or a reward until the ratio is corrected.',
        consumerImpact:
          'One large winning trade can force you to keep trading to unlock the account, which means taking more risk.',
      },
      {
        title: 'Broad prohibited-practice clauses',
        severity: 'Critique',
        finding:
          'Gap trading, latency, ultra-high speed, coordinated accounts, account rolling, one-sided bets and hyperactive EAs can lead to disqualification, removed trades, lost rewards or termination.',
        consumerImpact:
          'Challenge-hack strategies and copy-paste multi-account setups are the real danger, even when the public score is excellent.',
      },
    ],
  },
  {
    slug: 'the5ers',
    product: 'High Stakes',
    sourceLabel: 'High Stakes Rules The5ers',
    sourceUrl: 'https://help.the5ers.com/what-are-the-general-rules-for-the-high-stakes-program/',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'The daily drawdown is more deceptive than it looks.',
    verdict:
      'The5ers High Stakes looks clean on paper, but daily drawdown uses the higher of the previous day balance or equity. A trade held through rollover can sharply reduce the available margin.',
    clauses: [
      {
        title: 'Daily drawdown uses the higher balance or equity value',
        severity: 'Critique',
        finding:
          'The 5% daily drawdown is set at server midnight from the previous closing equity or balance, whichever is higher.',
        consumerImpact:
          'Ending the day with high equity raises the next day threshold. A held position can close the account sooner than expected.',
      },
      {
        title: '30-day inactivity rule',
        severity: 'Moyen',
        finding:
          'Accounts expire after more than 30 consecutive days without trading activity, counted from registration.',
        consumerImpact:
          'A challenge bought for later can become a complete loss if it sits unused.',
      },
      {
        title: 'Payout every two weeks',
        severity: 'Moyen',
        finding:
          'After reaching funded status, withdrawals are available from the dashboard every two weeks.',
        consumerImpact:
          'Cash flow is not instant, so do not compare only the split and challenge price.',
      },
    ],
  },
  {
    slug: 'fundednext',
    product: 'Stellar 2-Step / FundedNext Accounts',
    sourceLabel: 'FundedNext Help Center - Rules & Payouts',
    sourceUrl: 'https://help.fundednext.com/en/articles/8020351-what-are-the-restricted-prohibited-trading-strategies',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Numerous anti-abuse rules can remove profits before account closure.',
    verdict:
      'FundedNext is well documented, but its anti-abuse limits are extensive: risk cap, margin cap, quick strike, hyperactivity, settlement trading, copy trading and multi-account hedging.',
    clauses: [
      {
        title: 'Risque max 3% et margin cap 70%',
        severity: 'Critique',
        finding:
          'FundedNext limits risk to 3% at all times and cumulative margin to 70%. A first violation can trigger a warning and removal of profits tied to the trade.',
        consumerImpact:
          'Profits may be removed when position sizing falls outside the framework, even without immediate account closure.',
      },
      {
        title: 'Quick Strike et trades sous 30 secondes',
        severity: 'Élevé',
        finding:
          'Trades closed in under 30 seconds are monitored. At 30% or more Quick Strike profit, the funded account may be terminated and the affected profits removed.',
        consumerImpact:
          'Ultra-short scalping can turn strong performance into a denied payout.',
      },
      {
        title: 'Cumulative hyperactivity across accounts',
        severity: 'Critique',
        finding:
          'Two hundred trades or 2,000 server messages per day trigger warnings; 15,000 messages can disable the account. Warnings may accumulate across accounts.',
        consumerImpact:
          'An EA or overly active order management can cost the account even without malicious intent.',
      },
    ],
  },
  {
    slug: 'topstep',
    product: 'Trading Combine / Express Funded Account',
    sourceLabel: 'Topstep Trading Combine + Payout Policy + Consistency',
    sourceUrl: 'https://help.topstep.com/en/articles/8284197-trading-combine-parameters',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'The main traps are consistency, payout caps and five winning days.',
    verdict:
      'Topstep is established and readable, but progression and withdrawals depend on more than gross profit.',
    clauses: [
      {
        title: 'Consistency Target 50%',
        severity: 'Élevé',
        finding:
          'The best day must stay below 50% of the profit target. If exceeded, the profit target increases, and losses do not reset the best day.',
        consumerImpact:
          'One large winning day can delay funded status even after the target amount is reached.',
      },
      {
        title: 'XFA payout caps',
        severity: 'Élevé',
        finding:
          'Express Funded Account withdrawals are capped by request and account size. The cap can depend on the standard or consistency path and the DLL option.',
        consumerImpact:
          'A large profit does not guarantee an immediate withdrawal of the same amount.',
      },
      {
        title: 'Single Profile Policy',
        severity: 'Critique',
        finding:
          'All accounts must remain under one Topstep profile. Multiple profiles can lead to closure or suspension.',
        consumerImpact:
          'A duplicate account or registration mistake can become a real operational risk.',
      },
    ],
  },
  {
    slug: 'apex-trader-funding',
    product: 'New Apex Products',
    sourceLabel: 'Apex official homepage + new/legacy account notice',
    sourceUrl: 'https://apextraderfunding.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Apex changed its offer significantly: separate legacy and new accounts.',
    verdict:
      'The newer Apex offer highlights EOD drawdown, no payout denials, 50% consistency and no recurring billing on new products. Legacy accounts remain a separate system.',
    clauses: [
      {
        title: 'New products vs legacy accounts',
        severity: 'Critique',
        finding:
          'Apex states that legacy accounts are no longer sold, are not changed retroactively and may remain on recurring billing until cancelled.',
        consumerImpact:
          'Before comparing Apex reviews or discounts, identify whether the source discusses a legacy or current product.',
      },
      {
        title: '5 trading days between rewards',
        severity: 'Élevé',
        finding:
          'The official page highlights five trading days for payouts and rewards on the current path.',
        consumerImpact:
          'Even after progressing quickly, withdrawal speed depends on the trading-day cycle.',
      },
      {
        title: '50% consistency',
        severity: 'Élevé',
        finding:
          'The newer offer displays a 50% consistency rule.',
        consumerImpact:
          'One large day can limit withdrawal or progression depending on the account used.',
      },
    ],
  },
  {
    slug: 'e8-markets',
    product: 'E8 Signature / E8 One / E8 Pro',
    sourceLabel: 'E8 Markets Help Center - Products, Guardrails, Payouts',
    sourceUrl: 'https://help.e8markets.com/en/collections/10983534-products-rules',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'E8 is highly detailed, but some rules remove profits without closing the account.',
    verdict:
      'E8 Markets documents daily drawdown, profit caps, news, HFT, EAs and best-day rules. The main consumer risk is profit removed at rollover or payout.',
    clauses: [
      {
        title: 'Daily drawdown with permanent closure',
        severity: 'Critique',
        finding:
          'Daily drawdown is a fixed amount based on initial balance. If equity or balance touches the loss level, the account is permanently closed even when the technical close finishes above it.',
        consumerImpact:
          'The final close may appear above the threshold while the account is still lost because the server-side breach takes priority.',
      },
      {
        title: 'Daily profit cap 2%',
        severity: 'Élevé',
        finding:
          'On E8 Pro, profits above the daily cap do not count and are removed after rollover. Attempts to work around this through hedging or partial closes may be grouped together.',
        consumerImpact:
          'An exceptional day can be partially removed from the eligible result.',
      },
      {
        title: 'News en Performance E8 One',
        severity: 'Élevé',
        finding:
          'On E8 One performance accounts, opening, closing or modifying SL/TP within five minutes of high-impact news is prohibited and profits may be removed.',
        consumerImpact:
          'The platform may allow the action technically while the profit is later removed at payout.',
      },
    ],
  },
  {
    slug: 'funding-pips',
    product: 'Evaluation / Master Account',
    sourceLabel: 'FundingPips Help Center - Trading Mechanics',
    sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/44559256768529-Understanding-Trading-Mechanics',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Breaches often come from equity, rollover and spread expansion.',
    verdict:
      'FundingPips clearly states that limits are monitored server-side in real time. The costliest mistakes involve tight stops, the 5 PM ET rollover and positions open during news.',
    clauses: [
      {
        title: 'Real-time equity monitoring',
        severity: 'Critique',
        finding:
          'Daily and maximum loss monitor live equity. The server record controls even when the terminal or dashboard is delayed.',
        consumerImpact:
          'A floating position can close the account before the local display makes the breach clear.',
      },
      {
        title: 'Rollover 5 PM ET',
        severity: 'Élevé',
        finding:
          'FundingPips warns that spreads may widen sharply at 5 PM ET, triggering stops and breaches.',
        consumerImpact:
          'A stop that looks safe on a Bid chart can be hit by the Ask during rollover.',
      },
      {
        title: 'Reward request requires closed trades',
        severity: 'Moyen',
        finding:
          'The reward cycle requires closing positions, waiting 15 minutes and then requesting the split.',
        consumerImpact:
          'Open positions and overnight fees can reduce the safety margin at the wrong time.',
      },
    ],
  },
  {
    slug: 'alpha-capital-group',
    product: 'Alpha Pro / Qualified Trader',
    sourceLabel: 'Alpha Capital Help Center - News, EA, IP, Gambling',
    sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/9293522-can-i-trade-news',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'The main danger is news restrictions, unapproved EAs and anti-gambling rules.',
    verdict:
      'Alpha Capital permits some uses, but post-qualification rules are sensitive around news windows, IPs, pre-approved EAs and behavior classified as gambling.',
    clauses: [
      {
        title: 'News: opening and closing restricted by plan',
        severity: 'Critique',
        finding:
          'After qualification, some plans prohibit opening or closing two or five minutes around high-impact news. Even a TP or SL triggered in the window can be a soft violation.',
        consumerImpact:
          'A position may be held legitimately while a take profit hit at the wrong moment makes the profit ineligible.',
      },
      {
        title: 'EAs limited to risk management',
        severity: 'Critique',
        finding:
          'Autonomous EAs, third-party bots, HFT, latency arbitrage or shared EAs generating identical trades can close the account.',
        consumerImpact:
          'An allowed EA does not mean unrestricted automated trading. Confirm the use case, platform and pre-approval requirements.',
      },
      {
        title: 'IP et household restrictions',
        severity: 'Élevé',
        finding:
          'The same household, multiple IPs, undeclared VPN/VPS use or inconsistent location changes can trigger a violation or security review.',
        consumerImpact:
          'Travel, shared housing, another trader in the family or a poorly declared VPS can become a compliance problem.',
      },
    ],
  },
];

const mediumSmallRuleAudits: CompactRuleAudit[] = [
  {
    slug: 'funding-traders',
    product: 'Instant Funded / 1-Step / 2-Step',
    sourceLabel: 'FundingTraders - Rules and challenge table',
    sourceUrl: 'https://fundingtraders.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Payout + consistency',
    severity: 'Élevé',
    signal:
      'The tables show different daily loss, maximum loss, risk-per-trade, consistency and payout schedules for Instant Funded, 1-Step and 2-Step.',
    consumerImpact:
      'Before buying, compare more than price: confirm the exact product, the 14- or 21-day payout cycle and the consistency score that can block a withdrawal.',
  },
  {
    slug: 'maven-trading',
    product: '1-Step / 2-Step / 3-Step / Instant / OMO',
    sourceLabel: 'Maven Trading - pricing and challenge table',
    sourceUrl: 'https://maventrading.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Drawdown + refund',
    severity: 'Moyen',
    signal:
      'The official page separates daily loss, maximum loss, profit targets and payout frequency, and states that some fees are refundable at the third withdrawal.',
    consumerImpact:
      'The real cost depends on how many payouts are reached. A low entry price may offer poor value when the selected program leaves little drawdown room.',
  },
  {
    slug: 'fxify',
    product: 'One Phase / Two Phase / Instant Funding',
    sourceLabel: 'FXIFY - How it works',
    sourceUrl: 'https://fxify.com/how-it-works/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Daily drawdown',
    severity: 'Critique',
    signal:
      'Daily drawdown may be based on the previous end-of-day balance. The first payout is presented as on demand, followed by biweekly withdrawals.',
    consumerImpact:
      'A position held through the reset can reduce the next day margin. Also verify add-ons that change the split, payout and leverage.',
  },
  {
    slug: 'instant-funding',
    product: 'Instant Funding / IF1 / One-Phase / Two-Phase',
    sourceLabel: 'Instant Funding - product rules',
    sourceUrl: 'https://instantfunding.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Smart drawdown + payout timing',
    severity: 'Critique',
    signal:
      'On Instant Funding, smart drawdown locks after profit. On IF1, the account lasts 24 hours and the best trade cannot represent too much of total profit.',
    consumerImpact:
      'Instant does not always mean an immediate payout: some products require 14 days, a profit threshold or a consistency rule.',
  },
  {
    slug: 'trade-the-pool',
    product: 'MAX / FLEX stock programs',
    sourceLabel: 'Trade The Pool - Program Terms',
    sourceUrl: 'https://tradethepool.com/program-terms/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Actions + valid profit',
    severity: 'Critique',
    signal:
      'Rules include maximum volume per minute on an instrument, profit ratios per position, minimum position counts, payout minimums and risk/KYC reviews.',
    consumerImpact:
      'For stocks, drawdown is not the only danger: an oversized small-cap trade or concentrated profit can be invalidated.',
  },
  {
    slug: 'funded-trading-plus',
    product: 'Instant Funding / 1-Step / 2-Step',
    sourceLabel: 'Funded Trading Plus - Help Center',
    sourceUrl: 'https://help.fundedtradingplus.com/drawdown-information/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'High-water mark',
    severity: 'Critique',
    signal:
      'Daily drawdown may use the higher of balance or equity at reset. Withdrawals do not lower the high-water mark in some calculations.',
    consumerImpact:
      'A withdrawal can look as if it secures the account while the drawdown threshold remains anchored higher.',
  },
  {
    slug: 'goat-funded-trader',
    product: '1-Step / 2-Step Pro / Blitz',
    sourceLabel: 'GOAT Funded Trader - Rules and rewards',
    sourceUrl: 'https://help.goatfundedtrader.com/en/collections/11969353-rules',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'News + reward caps',
    severity: 'Critique',
    signal:
      'Trades opened or closed within five minutes of high-impact news can have profit capped. Funded accounts also have initial withdrawal limits.',
    consumerImpact:
      'News trading may be allowed while gains are capped. Read the profit-removal clause, not only the news-allowed label.',
  },
  {
    slug: 'audacity-capital',
    product: 'Ability Challenge',
    sourceLabel: 'Audacity Capital - challenge table',
    sourceUrl: 'https://audacity.capital/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Règles permissives à confirmer',
    severity: 'Moyen',
    signal:
      'The page advertises an unlimited trading period, maximum daily loss, maximum loss, same-day payout and permission for news, weekend, EA and copy trading.',
    consumerImpact:
      'When a page looks highly permissive, verify the exact definitions of EA, copy trading and same-day payout in the dashboard and terms.',
  },
  {
    slug: 'fintokei',
    product: 'SwiftTrader / ProTrader',
    sourceLabel: 'Fintokei - program table',
    sourceUrl: 'https://www.fintokei.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Open risk + payout threshold',
    severity: 'Élevé',
    signal:
      'SwiftTrader affiche daily loss, max loss, maximum allowed risk on open trades et minimum profit per payout.',
    consumerImpact:
      'Even with fast payouts, the maximum open-risk rule can block multi-position strategies or disguised martingale setups.',
  },
  {
    slug: 'hantec-trader',
    product: 'Hantec Trader programs',
    sourceLabel: 'Hantec Trader - official program table',
    sourceUrl: 'https://hantectrader.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Static balance drawdown',
    severity: 'Moyen',
    signal:
      'The official table lists balance-static drawdown, daily loss, maximum total loss, reward frequency and minimum trading days for each stage.',
    consumerImpact:
      'The word static is not enough: verify whether the threshold uses balance, equity or both at the moment of violation.',
  },
  {
    slug: 'oneup-trader',
    product: '1-Step futures evaluation',
    sourceLabel: 'OneUp Trader - funded account rules',
    sourceUrl: 'https://www.oneuptrader.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Trailing drawdown + consistency',
    severity: 'Critique',
    signal:
      'No daily loss is displayed, but trailing drawdown, at least 10 trading days and consistency apply: the other three best days must total at least 80% of the largest day.',
    consumerImpact:
      'Without daily loss, the main traps become trailing drawdown and concentrating profit in a single session.',
  },
  {
    slug: 'earn2trade',
    product: 'Trader Career Path / Gauntlet Mini',
    sourceLabel: 'Earn2Trade - official homepage and disclaimer',
    sourceUrl: 'https://www.earn2trade.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Futures + pass rate',
    severity: 'Élevé',
    signal:
      'Earn2Trade publishes uncommon metrics: pass rate, the share of live and live-sim accounts, weekly withdrawals from $100 and futures-only markets.',
    consumerImpact:
      'This is more transparent than many competitors, but the pass rate shows that the product is a difficult evaluation, not purchased income.',
  },
  {
    slug: 'take-profit-trader',
    product: 'Test / PRO / PRO+',
    sourceLabel: 'Take Profit Trader - payout and PRO rules',
    sourceUrl: 'https://takeprofittrader.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'PRO payout + account fee',
    severity: 'Élevé',
    signal:
      'The site highlights PRO day-one withdrawals, an 80/20 then PRO+ 90/10 split, a one-time PRO fee and a PRO+ live transition with the same risk rules.',
    consumerImpact:
      'Fast payouts are attractive, but verify the Test to PRO to PRO+ path, the fee and the exact live drawdown.',
  },
  {
    slug: 'brightfunded',
    product: 'Evaluation / Funded Account',
    sourceLabel: 'BrightFunded - official homepage',
    sourceUrl: 'https://brightfunded.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Payout marketing',
    severity: 'Moyen',
    signal:
      'The page advertises payouts from seven days after the first funded trade and up to a 100% profit split subject to conditions.',
    consumerImpact:
      'Check the terms carefully: up to often depends on the plan, add-ons, cycle and consistency rules.',
  },
  {
    slug: 'aqua-funded',
    product: 'Evaluation / Instant Funding',
    sourceLabel: 'AquaFunded - official homepage',
    sourceUrl: 'https://www.aquafunded.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Instant funding',
    severity: 'Moyen',
    signal:
      'The official source highlights instant funding and a high profit split, but each product page needs a plan-by-plan review.',
    consumerImpact:
      'Treat the instant promise as a claim to verify: payout cycles, drawdown, refunds and news rules may change by account.',
  },
  {
    slug: 'blue-guardian',
    product: 'Evaluation / Instant Funding',
    sourceLabel: 'Blue Guardian - official homepage',
    sourceUrl: 'https://www.blueguardian.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Structured process',
    severity: 'Moyen',
    signal:
      'The site highlights evaluations with transparent rules, discipline, risk management and fast payouts.',
    consumerImpact:
      'Before buying, verify the exact rules page for drawdown, news, payout minimums and instant-funding conditions.',
  },
  {
    slug: 'breakout-prop',
    product: 'Crypto prop trading',
    sourceLabel: 'Breakout Prop - official homepage',
    sourceUrl: 'https://www.breakoutprop.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Crypto liquidity',
    severity: 'Élevé',
    signal:
      'Breakout is crypto-first: reread the official source for spread, liquidity, exchange rules, liquidation and market-specific hours.',
    consumerImpact:
      'A crypto prop firm should not be judged like a forex prop firm: wick, slippage and liquidation risk must be visible before payment.',
  },
  {
    slug: 'the-trading-pit',
    product: 'Futures / Forex / CFD challenges',
    sourceLabel: 'The Trading Pit - official homepage',
    sourceUrl: 'https://www.thetradingpit.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle partielle',
    riskFamily: 'Multi-asset',
    severity: 'Moyen',
    signal:
      'Official coverage is multi-asset. Separate rules by asset class because futures and CFD challenges do not carry the same risks.',
    consumerImpact:
      'Do not transfer a rule from one product to another: drawdown, platforms, fees and trading hours can differ sharply.',
  },
  {
    slug: 'finotive-funding',
    product: 'Challenge / Instant Funding',
    sourceLabel: 'Finotive Funding - official homepage',
    sourceUrl: 'https://finotivefunding.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle partielle',
    riskFamily: 'Instant + challenge',
    severity: 'Moyen',
    signal:
      'The official source is identified, but the product page must confirm detailed clauses for daily loss, maximum loss, refunds, payouts and trading restrictions.',
    consumerImpact:
      'Classify this as no purchase without a final read until product-specific terms are captured in the PropRadar file.',
  },
  {
    slug: 'myfundedfutures',
    product: 'Futures evaluations',
    sourceLabel: 'MyFundedFutures - official homepage',
    sourceUrl: 'https://myfundedfutures.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Futures payout',
    severity: 'Moyen',
    signal:
      'The official source is identified, but detailed payout, activation, drawdown and consistency parameters need confirmation in the help center or checkout.',
    consumerImpact:
      'Do not buy from the monthly price alone: funded-account fees, payout schedules and trailing drawdown determine the real cost.',
  },
  {
    slug: 'bulenox',
    product: 'Futures funded trader program',
    sourceLabel: 'Bulenox - official homepage',
    sourceUrl: 'https://bulenox.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Futures trailing drawdown',
    severity: 'Moyen',
    signal:
      'The official source is identified, but the file still needs exact activation fees, trailing drawdown, payout minimums and contract rules.',
    consumerImpact:
      'Keep this in the futures audit queue: costs and limits after funded status matter more than the evaluation price.',
  },
];

const ruleFamilies = [
  {
    title: 'Drawdown & equity',
    label: 'Compte fermé',
    text: 'The real danger is usually open equity, rollover, swaps and the server reset.',
  },
  {
    title: 'News & rollover',
    label: 'Profit retiré',
    text: 'Some platforms technically allow the trade but remove gains or classify it as a violation.',
  },
  {
    title: 'EA, HFT, copy trading',
    label: 'Compte bloqué',
    text: 'An EA allowed for risk management can still be prohibited when it trades autonomously, copies accounts or overloads the server.',
  },
  {
    title: 'Payout & consistency',
    label: 'Retrait retardé',
    text: 'Best-day rules, payout caps, winning days and withdrawal cycles can matter more than the advertised profit split.',
  },
];

function severityClass(severity: RuleSeverity) {
  if (severity === 'Critique') return 'badge-red';
  if (severity === 'Élevé') return 'badge-red';
  if (severity === 'Moyen') return 'badge-amber';
  return 'badge-green';
}

function proofLevelClass(level: CompactRuleAudit['proofLevel']) {
  if (level === 'Source officielle lue') return 'badge-green';
  if (level === 'Source officielle partielle') return 'badge-amber';
  return 'badge-blue';
}

function coverageStatusLabel(firm: (typeof propFirms)[number]) {
  if (firm.status === 'Fermée') return 'Risk archive';
  if (firm.auditStatus === 'Vérifié multi-source') return 'Multi-source file';
  if (firm.auditStatus === 'Partiellement vérifié') return 'Source spotted';
  return 'To source';
}

function coverageStatusClass(label: string) {
  if (label === 'Multi-source file') return 'badge-green';
  if (label === 'Source spotted') return 'badge-blue';
  if (label === 'Risk archive') return 'badge-red';
  return 'badge-neutral';
}

function legalSourceCount(firm: (typeof propFirms)[number]) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: (typeof propFirms)[number]) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

function sourceDepthLabel(firm: (typeof propFirms)[number]) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'Deep sources';
  if (count >= 3) return 'Usable sources';
  if (count >= 1) return 'Thin sources';
  return 'No sources';
}

function sourceDepthClass(firm: (typeof propFirms)[number]) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'badge-green';
  if (count >= 2) return 'badge-amber';
  return 'badge-red';
}

export default function RulesPage() {
  const deepAuditedSlugs = new Set(officialRuleAudits.map((audit) => audit.slug));
  const compactAuditedSlugs = new Set(mediumSmallRuleAudits.map((audit) => audit.slug));
  const coveredSlugs = new Set([...deepAuditedSlugs, ...compactAuditedSlugs]);
  const clauseCount = officialRuleAudits.reduce((sum, audit) => sum + audit.clauses.length, 0);
  const criticalCount = officialRuleAudits.reduce(
    (sum, audit) => sum + audit.clauses.filter((clause) => clause.severity === 'Critique').length,
    0
  );
  const compactCriticalCount = mediumSmallRuleAudits.filter((audit) => audit.severity === 'Critique').length;
  const longTailRows = propFirms
    .filter((firm) => !coveredSlugs.has(firm.slug))
    .sort((a, b) => {
      if (a.status === 'Fermée' && b.status !== 'Fermée') return 1;
      if (a.status !== 'Fermée' && b.status === 'Fermée') return -1;
      return b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore;
    });
  const activeRuleRows = propFirms
    .filter((firm) => firm.status !== 'Fermée')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 16);
  const nextAuditQueue = propFirms
    .filter((firm) => !coveredSlugs.has(firm.slug) && firm.status !== 'Fermée')
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  const coveredFirmCount = propFirms.filter((firm) => coveredSlugs.has(firm.slug)).length;
  const legalWatchCoveredCount = propFirms.filter((firm) => coveredSlugs.has(firm.slug) && isLegalWatchFirm(firm)).length;
  const deepSourceCoveredCount = propFirms.filter((firm) => coveredSlugs.has(firm.slug) && legalSourceCount(firm) >= 5).length;
  const payoutSensitiveCount = propFirms.filter((firm) => coveredSlugs.has(firm.slug) && firm.reviewSignals.payoutRisk !== 'Faible').length;

  return (
    <main className="container rules-page">
      <section className="rules-hero">
        <div>
          <div className="eyebrow">Deep Rule Audit</div>
          <h1>Clauses that can cost an account or a payout.</h1>
          <p className="lead">
            PropRadar reads rule pages, help centers and flagship-product conditions to isolate dangerous clauses:
            drawdown, rollover, news, EA, copy trading, consistency, payout caps and sanctions.
          </p>
        </div>
        <div className="rules-hero-panel">
          <div className="summary-stat">
            <span>Deep audits</span>
            <strong>{officialRuleAudits.length}</strong>
            <small>primary sources opened</small>
          </div>
          <div className="summary-stat">
            <span>Clauses extracted</span>
            <strong>{clauseCount}</strong>
            <small>{criticalCount} critical</small>
          </div>
          <div className="summary-stat">
            <span>Mid/small firms</span>
            <strong>{mediumSmallRuleAudits.length}</strong>
            <small>{compactCriticalCount} critical alerts</small>
          </div>
          <div className="summary-stat">
            <span>Coverage</span>
            <strong>{propFirms.length}</strong>
            <small>total firms tracked</small>
          </div>
        </div>
      </section>

      <section className="page-insight-strip" aria-label="Rule audit proof summary">
        <Link href="/audit">
          <span>Rule files</span>
          <strong>{coveredFirmCount}</strong>
          <small>Firms with a deep or compact rule source recorded.</small>
        </Link>
        <Link href="/risques-payout">
          <span>Payout clauses</span>
          <strong>{payoutSensitiveCount}</strong>
          <small>Covered files where payout risk is above low.</small>
        </Link>
        <Link href="/audit">
          <span>Legal watch</span>
          <strong>{legalWatchCoveredCount}</strong>
          <small>Covered firms that still need extra legal or source caution.</small>
        </Link>
        <Link href="/audit">
          <span>Deep sources</span>
          <strong>{deepSourceCoveredCount}</strong>
          <small>Covered firms with five or more saved source links.</small>
        </Link>
        <Link href="/guides/prop-firm-sans-consistency-rule">
          <span>Consistency rule</span>
          <strong>Best-day cap</strong>
          <small>Understand the formula and compare programs without a consistency rule.</small>
        </Link>
        <Link href="/guides/prop-firm-news-trading">
          <span>News trading</span>
          <strong>Allowed?</strong>
          <small>Compare event windows, funded-stage restrictions and payout clauses.</small>
        </Link>
      </section>

      <section className="rules-stat-strip" aria-label="Rule statistics">
        {ruleFamilies.map((family) => (
          <div className="rule-stat" key={family.title}>
            <span>{toEnglishText(family.label)}</span>
            <strong>{toEnglishText(family.title)}</strong>
            <small>{toEnglishText(family.text)}</small>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Consumer Alerts</div>
            <h2>What marketing pages do not say loudly enough.</h2>
          </div>
          <Link href="/audit" className="btn">View source audit</Link>
        </div>

        <div className="rule-audit-grid">
          {officialRuleAudits.map((audit) => {
            const firm = getFirmBySlug(audit.slug);

            return (
              <article className="rule-audit-card" key={audit.slug}>
                <div className="rule-audit-top">
                  <div className="firm-result-main">
                    <FirmLogo name={firm?.name ?? audit.slug} logoDomain={firm?.logoDomain} />
                    <div>
                      <Link href={`/firm/${audit.slug}`} className="firm-result-name">{firm?.name ?? audit.slug}</Link>
                      <div className="firm-subline">{toEnglishText(audit.product)}</div>
                      {firm ? (
                        <div className="ranking-proof-chips" aria-label={`${firm.name} rule audit proof`}>
                          <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                            Payout {toEnglishText(firm.reviewSignals.payoutRisk)}
                          </span>
                          <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                            Legal {firm.regulatoryAudit.riskLevel}
                          </span>
                          <span className={`badge ${sourceDepthClass(firm)}`}>
                            {sourceDepthLabel(firm)}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {firm ? <span className={`badge ${statusClass(firm.status)}`}>{toEnglishText(firm.status)}</span> : null}
                </div>

                <div>
                  <h3>{toEnglishText(audit.headline)}</h3>
                  <p className="muted">{toEnglishText(audit.verdict)}</p>
                </div>

                <div className="clause-list">
                  {audit.clauses.map((clause) => (
                    <div className="clause-item" key={clause.title}>
                      <div className="clause-head">
                        <strong>{toEnglishText(clause.title)}</strong>
                        <span className={`badge ${severityClass(clause.severity)}`}>{toEnglishText(clause.severity)}</span>
                      </div>
                      <p>{toEnglishText(clause.finding)}</p>
                      <div className="impact-box">{toEnglishText(clause.consumerImpact)}</div>
                    </div>
                  ))}
                </div>

                <div className="rule-audit-source">
                  <span>{toEnglishText(audit.sourceDate)}</span>
                  <a href={audit.sourceUrl} target="_blank" rel="noreferrer">{audit.sourceLabel}</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Mid & Small Firms</div>
            <h2>The long tail is being read firm by firm.</h2>
          </div>
          <p className="section-note">
            These compact alerts come from official sources or spotted product pages. Partial files remain deliberately marked as such.
          </p>
        </div>

        <div className="compact-rule-grid">
          {mediumSmallRuleAudits.map((audit) => {
            const firm = getFirmBySlug(audit.slug);

            return (
              <article className="compact-rule-card" key={audit.slug}>
                <div className="compact-rule-top">
                  <div className="firm-result-main">
                    <FirmLogo name={firm?.name ?? audit.slug} logoDomain={firm?.logoDomain} size="sm" />
                    <div>
                      <Link href={`/firm/${audit.slug}`} className="firm-result-name">{firm?.name ?? audit.slug}</Link>
                      <div className="firm-subline">{toEnglishText(audit.product)}</div>
                    </div>
                  </div>
                  <span className={`badge ${severityClass(audit.severity)}`}>{toEnglishText(audit.severity)}</span>
                </div>

                <div className="compact-rule-tags">
                  <span className={`badge ${proofLevelClass(audit.proofLevel)}`}>{toEnglishText(audit.proofLevel)}</span>
                  <span>{toEnglishText(audit.riskFamily)}</span>
                  {firm ? <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{toEnglishText(firm.auditStatus)}</span> : null}
                </div>

                <p>{toEnglishText(audit.signal)}</p>
                <div className="compact-rule-impact">{toEnglishText(audit.consumerImpact)}</div>

                <div className="rule-audit-source">
                  <span>{toEnglishText(audit.sourceDate)}</span>
                  <a href={audit.sourceUrl} target="_blank" rel="noreferrer">{audit.sourceLabel}</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Full Coverage</div>
            <h2>All other prop firms remain in the audit queue.</h2>
          </div>
          <p className="section-note">
            PropRadar keeps smaller firms visible to avoid blind spots: spotted source, risk archive or file still needing sourcing.
          </p>
        </div>
        <div className="longtail-rule-board">
          {longTailRows.map((firm) => {
            const coverageLabel = coverageStatusLabel(firm);

            return (
              <Link href={`/firm/${firm.slug}`} className="longtail-rule-row" key={firm.slug}>
                <div className="firm-result-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <div>
                    <strong>{firm.name}</strong>
                    <span>{toEnglishText(firm.products[0]?.name ?? 'Produit à identifier')}</span>
                  </div>
                </div>
                <span>{toEnglishText(firm.drawdownType)}</span>
                <span>{toEnglishText(firm.newsTrading)}</span>
                <span>{toEnglishText(firm.eaAllowed)}</span>
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
                <span className={`badge ${coverageStatusClass(coverageLabel)}`}>{coverageLabel}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Next Deep-Dive</div>
            <h2>Next flagship products to break down.</h2>
          </div>
        </div>
        <div className="rule-queue-grid">
          {nextAuditQueue.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="rules-matrix-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{toEnglishText(firm.products[0]?.name ?? 'Produit phare à identifier')} - {formatUsd(firm.priceFrom)}</span>
                </div>
              </div>
              <div><span>Drawdown</span><strong>{toEnglishText(firm.drawdownType)}</strong></div>
              <div><span>News</span><strong>{toEnglishText(firm.newsTrading)}</strong></div>
              <div><span>EA</span><strong>{toEnglishText(firm.eaAllowed)}</strong></div>
              <div><span>Payout</span><strong>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                <span>Score</span>
                <strong>{firm.score}</strong>
                <small>/100</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Quick Matrix</div>
            <h2>Active firms ranked by payout risk.</h2>
          </div>
        </div>
        <div className="rules-matrix">
          {activeRuleRows.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="rules-matrix-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{formatUsd(firm.priceFrom)} - score {firm.score}/100</span>
                </div>
              </div>
              <div><span>Drawdown</span><strong>{toEnglishText(firm.drawdownType)}</strong></div>
              <div><span>News</span><strong>{toEnglishText(firm.newsTrading)}</strong></div>
              <div><span>EA</span><strong>{toEnglishText(firm.eaAllowed)}</strong></div>
              <div><span>Payout</span><strong>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
