export type AuditCaseSourceType =
  | 'Official source'
  | 'Regulator'
  | 'Court record'
  | 'Financial press';

export type AuditCaseSource = {
  label: string;
  url: string;
  type: AuditCaseSourceType;
};

export type AuditCaseEvent = {
  date: string;
  label: string;
  detail: string;
  sourceUrl: string;
};

export type AuditCaseFile = {
  firmSlug: string;
  status: string;
  question: string;
  answer: string;
  lastChecked: string;
  events: AuditCaseEvent[];
  unresolved: string[];
  sources: AuditCaseSource[];
};

export const AUDIT_CASE_FILES_UPDATED_AT = '2026-07-19';

export const auditCaseFiles: AuditCaseFile[] = [
  {
    firmSlug: 'myforexfunds',
    status: 'Inactive / relaunch watch',
    question: 'Can My Forex Funds relaunch after the CFTC case?',
    answer:
      'A possible relaunch is no longer a purely theoretical claim, but it is not a verified current buying option. The US case was dismissed with prejudice in May 2025 as a case-ending sanction against the CFTC, and an Ontario court later returned access to most assets and client data. Those developments do not replace current program terms, jurisdiction checks, payout mechanics or a live checkout audit.',
    lastChecked: AUDIT_CASE_FILES_UPDATED_AT,
    events: [
      {
        date: '2023-08-29',
        label: 'CFTC action and shutdown context',
        detail:
          'The CFTC filed its complaint against Traders Global Group and obtained emergency relief. The allegations remain part of the historical record, but the US case did not end with a merits judgment against the firm.',
        sourceUrl: 'https://www.cftc.gov/media/9196/enftradersglobalgroupcomplaint082923/download',
      },
      {
        date: '2025-05-13',
        label: 'US case dismissed with prejudice',
        detail:
          'The federal case ended through sanctions tied to CFTC litigation misconduct. The CFTC Acting Chairman publicly addressed the court findings, and financial press reported the dismissal and fee award.',
        sourceUrl: 'https://www.cftc.gov/PressRoom/PressReleases/9074-25',
      },
      {
        date: '2025-12-08',
        label: 'Most Canadian assets and client data released',
        detail:
          'Bloomberg reported that the Ontario Superior Court returned access to nearly all funds and client data, reducing a major practical barrier to a possible restart.',
        sourceUrl: 'https://www.bloomberg.com/news/articles/2025-12-08/simulated-trading-firm-myforexfunds-clears-legal-hurdle-to-restart',
      },
      {
        date: '2026-01-28',
        label: 'Current website terms remain restrictive',
        detail:
          'The current Terms say website information is not an offer in excluded countries and warn that any described proprietary-trading program may fall outside normal regulatory and investor-protection regimes.',
        sourceUrl: 'https://myforexfunds.com/terms-of-use/',
      },
    ],
    unresolved: [
      'No normal active checkout and current product agreement were verified in this review.',
      'The status of any remaining Ontario regulatory process must be checked in primary records.',
      'Legacy balances, refunds and customer claims should not be inferred from the US dismissal alone.',
      'A relaunch would require a fresh entity, jurisdiction, platform and payout audit.',
    ],
    sources: [
      { label: 'CFTC complaint filed August 2023', url: 'https://www.cftc.gov/media/9196/enftradersglobalgroupcomplaint082923/download', type: 'Regulator' },
      { label: 'Special Master report and recommendation', url: 'https://www.cftc.gov/media/12106/ogc_KazmiReportRecommendationSactions051325/download', type: 'Court record' },
      { label: 'CFTC Acting Chairman statement on court sanctions', url: 'https://www.cftc.gov/PressRoom/PressReleases/9074-25', type: 'Regulator' },
      { label: 'Finance Magnates report on dismissal and sanctions', url: 'https://www.financemagnates.com/forex/my-forex-funds-parent-defeats-cftc-in-court-as-judge-imposes-sanctions/', type: 'Financial press' },
      { label: 'Bloomberg report on Ontario asset release', url: 'https://www.bloomberg.com/news/articles/2025-12-08/simulated-trading-firm-myforexfunds-clears-legal-hurdle-to-restart', type: 'Financial press' },
      { label: 'Current MyForexFunds Terms of Use', url: 'https://myforexfunds.com/terms-of-use/', type: 'Official source' },
    ],
  },
  {
    firmSlug: 'the-funded-trader',
    status: 'Active site / legacy obligations watch',
    question: 'Did The Funded Trader fully resolve its 2024 interruption?',
    answer:
      'The site is active again, but an active checkout does not erase the interruption or prove that every legacy obligation was resolved. Financial press documented the March 2024 pause, incomplete recovery, outstanding payouts and account-restoration promises. Current legal terms identify a simulated service and broad enforcement discretion, so new offers and old claims must be evaluated separately.',
    lastChecked: AUDIT_CASE_FILES_UPDATED_AT,
    events: [
      {
        date: '2024-03-28',
        label: 'Operations temporarily paused',
        detail:
          'The Funded Trader paused operations after weeks of payout complaints and platform disruption, while promising a relaunch.',
        sourceUrl: 'https://www.financemagnates.com/forex/prop-trading-firm-the-funded-trader-is-online-but-is-it-fully-operational/',
      },
      {
        date: '2024-04-18',
        label: 'Website returned with incomplete recovery questions',
        detail:
          'Finance Magnates found the website back online after 21 days but reported non-operational elements and unresolved trader concerns.',
        sourceUrl: 'https://www.financemagnates.com/forex/prop-trading-firm-the-funded-trader-is-online-but-is-it-fully-operational/',
      },
      {
        date: '2024-08-21',
        label: 'Partial payout and account-restoration claims',
        detail:
          'The company said it had processed part of the owed trader payouts, affiliate payouts and paused accounts. These were company progress claims reported by the press, not a complete independent settlement audit.',
        sourceUrl: 'https://www.financemagnates.com/forex/prop-trading-the-funded-trader-resurfaces-five-months-after-pausing-operations/',
      },
      {
        date: '2024-11-20',
        label: 'Recovery still in progress',
        detail:
          'Finance Magnates reported that roughly 900 traders were still awaiting payouts and that the firm described earlier payout-to-revenue ratios as unsustainable.',
        sourceUrl: 'https://www.financemagnates.com/forex/prop-firm-the-funded-trader-resumes-paused-accounts-as-900-traders-await-payouts/',
      },
    ],
    unresolved: [
      'No independent public reconciliation proves that every pre-pause payout, account and affiliate claim was resolved.',
      'A new purchase should be judged under current terms, not recovery promises made in 2024.',
      'Current refund, arbitration and prohibited-strategy clauses materially affect dispute leverage.',
    ],
    sources: [
      { label: 'The Funded Trader current site', url: 'https://thefundedtraderprogram.com/', type: 'Official source' },
      { label: 'The Funded Trader Terms of Use', url: 'https://www.thefundedtraderprogram.com/terms-of-use/index.html', type: 'Official source' },
      { label: 'Finance Magnates April 2024 relaunch check', url: 'https://www.financemagnates.com/forex/prop-trading-firm-the-funded-trader-is-online-but-is-it-fully-operational/', type: 'Financial press' },
      { label: 'Finance Magnates August 2024 recovery update', url: 'https://www.financemagnates.com/forex/prop-trading-the-funded-trader-resurfaces-five-months-after-pausing-operations/', type: 'Financial press' },
      { label: 'Finance Magnates November 2024 outstanding-payout report', url: 'https://www.financemagnates.com/forex/prop-firm-the-funded-trader-resumes-paused-accounts-as-900-traders-await-payouts/', type: 'Financial press' },
    ],
  },
  {
    firmSlug: 'funded-engineer',
    status: 'Closed / bankruptcy archive',
    question: 'Why did Funded Engineer close?',
    answer:
      'Funded Engineer permanently ceased operations on July 15, 2024 and said it would file for bankruptcy after restructuring, cost cutting and investment efforts failed. The closure followed earlier technology and brokerage disruptions. The public announcement did not establish how every pending payout or refund would be treated.',
    lastChecked: AUDIT_CASE_FILES_UPDATED_AT,
    events: [
      {
        date: '2024-02-07',
        label: 'Technology-provider relationship terminated',
        detail:
          'Finance Magnates reported that FPFX Technologies terminated its license and services after an audit. The allegations belonged to the provider statement and should not be expanded beyond the published record.',
        sourceUrl: 'https://www.financemagnates.com/forex/breaking-fpfx-technologies-revokes-license-of-proprietary-trading-firm-funded-engineer/',
      },
      {
        date: '2024-03-06',
        label: 'Broker accounts moved to close-only',
        detail:
          'Finance Magnates reported that Blueberry Markets set prop accounts to close-only, affecting Funded Engineer and other firms dependent on the same brokerage route.',
        sourceUrl: 'https://www.financemagnates.com/forex/blueberry-markets-sets-all-prop-trading-accounts-to-close-only/',
      },
      {
        date: '2024-07-15',
        label: 'Permanent closure announced',
        detail:
          'Funded Engineer announced immediate permanent closure and an intended bankruptcy filing. The notice did not specify a complete pending-payout process.',
        sourceUrl: 'https://www.financemagnates.com/forex/breaking-prop-trading-firm-funded-engineer-shuts-down/',
      },
    ],
    unresolved: [
      'The bankruptcy filing, entity and claims process require archived corporate or court documents.',
      'No complete public reconciliation of pending payouts or refunds was captured.',
      'Old Trustpilot reviews and affiliate pages are not current status evidence.',
    ],
    sources: [
      { label: 'Funded Engineer former official domain', url: 'https://fundedengineer.com/', type: 'Official source' },
      { label: 'Finance Magnates FPFX license-termination report', url: 'https://www.financemagnates.com/forex/breaking-fpfx-technologies-revokes-license-of-proprietary-trading-firm-funded-engineer/', type: 'Financial press' },
      { label: 'Finance Magnates on Blueberry close-only accounts', url: 'https://www.financemagnates.com/forex/blueberry-markets-sets-all-prop-trading-accounts-to-close-only/', type: 'Financial press' },
      { label: 'Finance Magnates permanent-closure report', url: 'https://www.financemagnates.com/forex/breaking-prop-trading-firm-funded-engineer-shuts-down/', type: 'Financial press' },
    ],
  },
  {
    firmSlug: 'surgetrader',
    status: 'Closed / parked-domain archive',
    question: 'Is SurgeTrader still operating?',
    answer:
      'No current operation is verified. SurgeTrader announced that it had closed and ceased all operations on May 24, 2024, one week after public reporting about the loss of its Match-Trader license. The former domain is now parked for sale, so old reviews and any new offer using the name require a fresh ownership check.',
    lastChecked: AUDIT_CASE_FILES_UPDATED_AT,
    events: [
      {
        date: '2024-05-20',
        label: 'Match-Trader termination reported',
        detail:
          'Match-Trade Technologies told Finance Magnates that the cooperation was terminated after a compliance procedure and failure to meet formal agreement requirements. SurgeTrader disputed the decision.',
        sourceUrl: 'https://www.financemagnates.com/forex/exclusive-match-trader-terminates-prop-firm-surgetraders-license/',
      },
      {
        date: '2024-05-24',
        label: 'All operations ceased',
        detail:
          'SurgeTrader announced definitive closure after failing to restore the platform relationship or secure a replacement in time.',
        sourceUrl: 'https://www.financemagnates.com/forex/prop-firm-surgetrader-shuts-down-a-week-after-losing-match-trader-license/',
      },
      {
        date: '2026-07-19',
        label: 'Former domain remains parked',
        detail:
          'The former official domain does not present an active prop product, legal entity, support route or current terms.',
        sourceUrl: 'https://surgetrader.com/',
      },
    ],
    unresolved: [
      'Historical payout and refund claims need dated account-level evidence.',
      'Any attempted relaunch must prove control of the brand, domain, entity and platform contract.',
      'A parked domain creates elevated clone and stale-link confusion risk.',
    ],
    sources: [
      { label: 'Former SurgeTrader domain', url: 'https://surgetrader.com/', type: 'Official source' },
      { label: 'Finance Magnates Match-Trader termination report', url: 'https://www.financemagnates.com/forex/exclusive-match-trader-terminates-prop-firm-surgetraders-license/', type: 'Financial press' },
      { label: 'Finance Magnates closure report', url: 'https://www.financemagnates.com/forex/prop-firm-surgetrader-shuts-down-a-week-after-losing-match-trader-license/', type: 'Financial press' },
    ],
  },
  {
    firmSlug: 'true-forex-funds',
    status: 'Closed / insolvency archive',
    question: 'What happened to True Forex Funds?',
    answer:
      'True Forex Funds permanently closed in May 2024 citing financial insolvency. The final closure followed a February platform-license interruption and an attempted cTrader restart. The firm also appeared on the CFTC RED List; that list identifies registration concerns and is not, by itself, a court finding of a legal violation.',
    lastChecked: AUDIT_CASE_FILES_UPDATED_AT,
    events: [
      {
        date: '2024-02-06',
        label: 'MetaTrader access lost',
        detail:
          'FX News Group reported that MetaQuotes terminated the MT4 and MT5 licenses, forcing a temporary stop and account-migration effort.',
        sourceUrl: 'https://fxnewsgroup.com/forex-news/retail-forex/exclusive-prop-trading-firm-true-forex-funds-shut-down-by-metaquotes-move/',
      },
      {
        date: '2024-02-21',
        label: 'cTrader relaunch attempted',
        detail:
          'The firm announced a cTrader return, illustrating that a platform replacement can restore access without resolving the operator financial model.',
        sourceUrl: 'https://www.financemagnates.com/forex/true-forex-funds-revives-operations-with-ctrader-platform/',
      },
      {
        date: '2024-05-14',
        label: 'Permanent insolvency closure',
        detail:
          'The official closure notice said all operations had ceased permanently because efforts to stabilize the firm financial position had failed.',
        sourceUrl: 'https://fxnewsgroup.com/forex-news/retail-forex/prop-firm-true-forex-funds-folds/',
      },
    ],
    unresolved: [
      'The final handling of every payout, refund and open-account claim is not established by the closure notice.',
      'Historical reviews cannot show present operational availability.',
      'Any similarly named active site must be matched to a new entity and current terms.',
    ],
    sources: [
      { label: 'True Forex Funds former official domain', url: 'https://trueforexfunds.com/', type: 'Official source' },
      { label: 'CFTC RED List explanation and entity list', url: 'https://www.cftc.gov/LearnAndProtect/Resources/Check/redlist.htm', type: 'Regulator' },
      { label: 'FX News Group February platform-loss report', url: 'https://fxnewsgroup.com/forex-news/retail-forex/exclusive-prop-trading-firm-true-forex-funds-shut-down-by-metaquotes-move/', type: 'Financial press' },
      { label: 'Finance Magnates cTrader relaunch report', url: 'https://www.financemagnates.com/forex/true-forex-funds-revives-operations-with-ctrader-platform/', type: 'Financial press' },
      { label: 'FX News Group permanent-closure report', url: 'https://fxnewsgroup.com/forex-news/retail-forex/prop-firm-true-forex-funds-folds/', type: 'Financial press' },
    ],
  },
  {
    firmSlug: 'skilled-funded-traders',
    status: 'Closed / unresolved-obligations archive',
    question: 'Is Skilled Funded Traders still operating?',
    answer:
      'No current operation should be inferred. Finance Magnates and FX News Group documented the immediate suspension of operations and new purchases on March 28, 2024. The exact Easton-linked structure and final treatment of every historical payout or refund remain incomplete in the public file.',
    lastChecked: AUDIT_CASE_FILES_UPDATED_AT,
    events: [
      {
        date: '2024-03-28',
        label: 'Operations and new purchases suspended',
        detail:
          'Two financial-industry publications documented the shutdown. Finance Magnates reported an Easton-controlled structure, while FX News Group noted uncertainty around the exact ownership or white-label relationship.',
        sourceUrl: 'https://www.financemagnates.com/forex/easton-controlled-skilled-funded-trader-suspends-prop-trading-operations/',
      },
      {
        date: '2026-07-15',
        label: 'Closure evidence rechecked',
        detail:
          'PropRadar retained the firm as a closed prevention archive because no current product or complete public settlement record was verified.',
        sourceUrl: 'https://fxnewsgroup.com/forex-news/retail-forex/skilled-funded-traders-becomes-second-easton-prop-firm-shut/',
      },
    ],
    unresolved: [
      'The contracting entity and dispute venue need archived terms or invoices.',
      'No complete public record proves that every payout or refund obligation was resolved.',
      'Similar search phrases must be matched to the skilledfundedtraders.com domain.',
    ],
    sources: [
      { label: 'Skilled Funded Traders former official domain', url: 'https://skilledfundedtraders.com/', type: 'Official source' },
      { label: 'Finance Magnates shutdown report', url: 'https://www.financemagnates.com/forex/easton-controlled-skilled-funded-trader-suspends-prop-trading-operations/', type: 'Financial press' },
      { label: 'FX News Group shutdown report', url: 'https://fxnewsgroup.com/forex-news/retail-forex/skilled-funded-traders-becomes-second-easton-prop-firm-shut/', type: 'Financial press' },
    ],
  },
];

export function getAuditCaseFile(firmSlug: string) {
  return auditCaseFiles.find((caseFile) => caseFile.firmSlug === firmSlug);
}
