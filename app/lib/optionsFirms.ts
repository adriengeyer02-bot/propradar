/**
 * Discovery catalogue for listed-options proprietary trading programmes.
 * These are NOT PropRadar-scored firms. The evidence below establishes only
 * what each operator advertises, not payouts, solvency or live execution.
 * Never merge these records into the scored propFirms collection without a
 * complete, separately approved audit using the uniform rating framework.
 */
export type OptionsFirm = {
  slug: string;
  name: string;
  kind: 'evaluation' | 'professional';
  website: string;
  instruments: string;
  programme: string;
  facts: { text: string; source: string }[];
  caution: string;
  checkedAt: string;
};

const CHECKED = '2026-11-18';

export const optionsFirms: OptionsFirm[] = [
  {
    slug: 'vanquish-trader', name: 'Vanquish Trader', kind: 'evaluation', website: 'https://www.vanquishtrader.com/',
    instruments: 'US-listed equity and index options', programme: 'Options evaluation; separate long-only and Advanced plans',
    facts: [
      { text: 'The Advanced plan advertises calls, puts, spreads and selling to open; SPX, XSP and VIX remain limited to long single-leg trades.', source: 'https://support.vanquishtrader.com/en/articles/17655120-advanced-options-plan-trading-permissions' },
      { text: 'The Advanced evaluation lists a 10% profit target, 5% end-of-day trailing drawdown, a 30% consistency rule and at least four trading days.', source: 'https://www.vanquishtrader.com/advanced-options-plan-rules' },
      { text: 'Positions must be closed by 3:59 p.m. US Eastern time; overnight positions are prohibited.', source: 'https://support.vanquishtrader.com/en/articles/17655120-advanced-options-plan-trading-permissions' },
    ],
    caution: 'The site describes simulated evaluation and performance accounts. Independent payout history and the legal entity require a full audit.',
    checkedAt: CHECKED,
  },
  {
    slug: 'options-funding', name: 'Options Funding', kind: 'evaluation', website: 'https://optionsfunding.co/',
    instruments: 'US equity, ETF and index options on approved symbols', programme: 'Growth / Express evaluations; Pro with additional option strategies',
    facts: [
      { text: 'Growth and Express focus on buying supported calls and puts; Pro also advertises spreads and supported option-selling strategies.', source: 'https://optionsfunding.co/faq/pro' },
      { text: 'Only options on approved tickers are permitted in evaluation/funded accounts; futures options, CFDs and foreign exchange are excluded.', source: 'https://optionsfunding.co/rules' },
      { text: 'A possible live-capital stage is governed by separate rules and is not automatic for every trader.', source: 'https://optionsfunding.co/live-program-rules' },
    ],
    caution: 'Simulated evaluation/funded stages must not be confused with a live brokerage account; verify current fees and payout eligibility.',
    checkedAt: CHECKED,
  },
  {
    slug: 'strix-options-funding', name: 'Strix Options Funding', kind: 'evaluation', website: 'https://strixoptionsfunding.com/',
    instruments: 'Options on supported US stocks, ETFs and indices', programme: 'Strix long-options plans and Strix Pro',
    facts: [
      { text: 'Standard plans advertise long calls and puts; Strix Pro adds spreads, iron condors and option selling.', source: 'https://strixoptionsfunding.com/' },
      { text: 'Its funded-programme marketing describes an 80% profit split and payouts after eight qualifying winning days.', source: 'https://strixoptionsfunding.com/' },
      { text: 'The operator states that selected traders may be invited to a live-capital programme.', source: 'https://strixoptionsfunding.com/' },
    ],
    caution: 'Payout totals and execution claims are company-reported, not independently verified by PropRadar.',
    checkedAt: CHECKED,
  },
  {
    slug: 'tradefundrr', name: 'TradeFundrr', kind: 'evaluation', website: 'https://tradefundrr.com/pages/options',
    instruments: 'US stock, ETF and index options', programme: 'Options Growth evaluation or Options Express simulated funded account',
    facts: [
      { text: 'The options page offers a simulated $25,000 account on DXtrade with an advertised 80/20 profit split.', source: 'https://tradefundrr.com/pages/options' },
      { text: 'Its published options rules include a 15-second minimum hold, intraday-only positions and a daily loss limit.', source: 'https://tradefundrr.com/pages/options' },
      { text: 'The firm advertises multi-leg strategies including spreads, iron condors and butterflies, with limits per programme.', source: 'https://tradefundrr.com/pages/options' },
    ],
    caution: 'The advertised funded account is simulated. The stated T3 relationship is not proof of a trader receiving live capital.',
    checkedAt: CHECKED,
  },
  {
    slug: 'imperial-trader-funding', name: 'Imperial Trader Funding', kind: 'evaluation', website: 'https://imperialtraderfunding.com/',
    instruments: 'US equities, futures and listed equity/index options', programme: 'Evaluation, simulated-funded stage, then a possible live stage',
    facts: [
      { text: 'The operator advertises options as well as stocks and futures, subject to platform availability.', source: 'https://imperialtraderfunding.com/faq' },
      { text: 'Its options rules require at least 500 open-interest contracts on the traded strike; breaches count as account strikes.', source: 'https://imperialtraderfunding.zendesk.com/hc/en-us/articles/37887373027867-What-Trading-Instruments-Do-You-Offer' },
      { text: 'The FAQ describes a simulated-funded phase before eligibility for a real-capital account.', source: 'https://imperialtraderfunding.com/faq' },
    ],
    caution: 'The option contract list and applicable rules depend on the selected platform; neither eligibility nor live funding is established for every applicant.',
    checkedAt: CHECKED,
  },
  {
    slug: 'maverick-trading', name: 'Maverick Trading', kind: 'professional', website: 'https://www.mavericktrading.com/',
    instruments: 'Equities and listed equity options', programme: 'Professional proprietary trading recruitment, not a retail challenge',
    facts: [
      { text: 'The company recruits and trains equity/options traders and advertises access to firm capital.', source: 'https://www.mavericktrading.com/job/equity-options-trader-lyon-france' },
      { text: 'Its recruitment page explicitly lists a remote trader opportunity for applicants based in Lyon, France.', source: 'https://www.mavericktrading.com/job/equity-options-trader-lyon-france' },
    ],
    caution: 'Application, trader contributions and any professional requirements must be verified directly; this is not a standard pay-to-pass evaluation.',
    checkedAt: CHECKED,
  },
  {
    slug: 't3-trading-group', name: 'T3 Trading Group', kind: 'professional', website: 'https://t3trading.com/',
    instruments: 'Equities and listed equity options', programme: 'Licensed professional proprietary trading desk',
    facts: [
      { text: 'The firm offers options trading for proprietary traders, alongside equities trading.', source: 'https://t3trading.com/trading/' },
      { text: 'Its official site requires the SIE and Series 57 examinations for proprietary equity/options traders.', source: 'https://t3trading.com/' },
    ],
    caution: 'This is a professional trading opportunity with licensing requirements, not an online retail funded-options challenge.',
    checkedAt: CHECKED,
  },
];

export function getOptionsFirm(slug: string) {
  return optionsFirms.find((firm) => firm.slug === slug);
}
