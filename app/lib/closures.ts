/**
 * Dated, sourced closure records for firms PropRadar lists as closed.
 * Only facts stated by the linked source: no reasons are added in our voice.
 * `date` is the date the source gives for the closure (or the report date
 * when the source gives none); `dateKind` says which.
 */
export type ClosureRecord = {
  slug: string;
  date?: string;
  dateKind: 'closure' | 'reported' | 'none';
  summary: string;
  source: { label: string; url: string };
  checkedAt: string;
};

export const closureRecords: ClosureRecord[] = [
  {
    slug: 'skilled-funded-traders',
    date: '2024-03-28',
    dateKind: 'closure',
    summary: 'Announced the immediate suspension of operations and new purchases.',
    source: {
      label: 'Finance Magnates',
      url: 'https://www.financemagnates.com/forex/easton-controlled-skilled-funded-trader-suspends-prop-trading-operations/',
    },
    checkedAt: '2026-07-15',
  },
  {
    slug: 'true-forex-funds',
    date: '2024-05-14',
    dateKind: 'closure',
    summary: 'Announced a permanent closure, citing financial insolvency, after losing MetaTrader access in February 2024.',
    source: { label: 'FX News Group', url: 'https://fxnewsgroup.com/forex-news/retail-forex/prop-firm-true-forex-funds-folds/' },
    checkedAt: '2026-07-19',
  },
  {
    slug: 'surgetrader',
    date: '2024-05-24',
    dateKind: 'closure',
    summary: 'Announced it had ceased all operations, days after Match-Trader terminated its platform licence.',
    source: {
      label: 'Finance Magnates',
      url: 'https://www.financemagnates.com/forex/prop-firm-surgetrader-shuts-down-a-week-after-losing-match-trader-license/',
    },
    checkedAt: '2026-07-19',
  },
  {
    slug: 'funded-engineer',
    date: '2024-07-15',
    dateKind: 'closure',
    summary: 'Announced a permanent closure and its intention to file for bankruptcy.',
    source: { label: 'Finance Magnates', url: 'https://www.financemagnates.com/forex/breaking-prop-trading-firm-funded-engineer-shuts-down/' },
    checkedAt: '2026-07-19',
  },
  {
    slug: 'karma-prop-traders',
    date: '2024-08-12',
    dateKind: 'reported',
    summary: 'Announced that it was suspending operations, a week after launching a new trading platform.',
    source: {
      label: 'Finance Magnates',
      url: 'https://financemagnates.com/forex/another-prop-firm-shuts-down-founder-blames-cheaters-for-liquidity-issues',
    },
    checkedAt: '2026-10-29',
  },
  {
    slug: 'indigo-trader-funding',
    date: '2024-08-21',
    dateKind: 'reported',
    summary:
      'Confirmed that it had ceased trading and ended its partnerships for the evaluation model; it said remaining funds held by its operating partners would go to refunding active paid accounts. Its UK company had applied to be struck off the register on 12 August 2024.',
    source: {
      label: 'Finance Magnates',
      url: 'https://www.financemagnates.com/forex/prop-trading-firm-indigo-trader-funding-confirms-shutdown/',
    },
    checkedAt: '2026-10-30',
  },
  {
    slug: 'smart-prop-trader',
    date: '2024-12-29',
    dateKind: 'closure',
    summary: 'Stopped onboarding new traders on 27 November 2024 and announced it would stop operating on 29 December 2024.',
    source: {
      label: 'Finance Magnates',
      url: 'https://financemagnates.com/forex/another-prop-firm-announces-closure-in-year-that-saw-50-companies-shutter',
    },
    checkedAt: '2026-10-26',
  },
  {
    slug: 'myfundedfx',
    date: '2026-02-06',
    dateKind: 'closure',
    summary: 'Seacrest Markets, which had rebranded MyFundedFX as SeacrestFunded, closed all prop trading accounts and open positions on 6 February 2026.',
    source: {
      label: 'Finance Magnates',
      url: 'https://www.financemagnates.com/forex/seacrest-ends-prop-trading-after-integrating-myfundedfx-shifts-focus-to-cfds/',
    },
    checkedAt: '2026-10-29',
  },
  {
    slug: 'syndicate-funded',
    dateKind: 'none',
    summary: 'Listed as "no longer operating" by TheTrustedProp; the listed domain redirects to an unrelated site.',
    source: { label: 'TheTrustedProp', url: 'https://thetrustedprop.com/prop-firms/syndicate-funded/news' },
    checkedAt: '2026-10-28',
  },
  {
    slug: 'inspire-funding',
    dateKind: 'none',
    summary: 'Listed as "no longer operating" by TheTrustedProp; Trustpilot states the company website has closed.',
    source: { label: 'TheTrustedProp', url: 'https://thetrustedprop.com/prop-firms/inspire-funding/news' },
    checkedAt: '2026-10-28',
  },
  {
    slug: 'forfx',
    dateKind: 'none',
    summary: 'Listed as "no longer operating" by TheTrustedProp.',
    source: { label: 'TheTrustedProp', url: 'https://thetrustedprop.com/prop-firms/for-fx/news' },
    checkedAt: '2026-10-29',
  },
  {
    slug: 'alpicap',
    dateKind: 'none',
    summary: 'Listed as "no longer operating" by TheTrustedProp.',
    source: { label: 'TheTrustedProp', url: 'https://thetrustedprop.com/prop-firms/alpicap/news' },
    checkedAt: '2026-10-29',
  },
];

export function getClosureRecord(slug: string) {
  return closureRecords.find((record) => record.slug === slug);
}
