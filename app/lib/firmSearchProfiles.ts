export type FirmSearchProfile = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  summary: string;
  facts: string[];
  links: { label: string; href: string }[];
  faq: { question: string; answer: string }[];
};

export const FIRM_SEARCH_CONTENT_UPDATED_AT = '2026-07-19';

const firmSearchProfiles: Partial<Record<string, FirmSearchProfile>> = {
  'skilled-funded-traders': {
    metaTitle: 'Skilled Funded Traders Closed: 2024 Timeline',
    metaDescription:
      'Skilled Funded Traders suspended operations on March 28, 2024. Review the closure timeline, Easton context, payout complaints and archived legal risks.',
    eyebrow: 'Skilled Funded Traders closure file',
    heading: 'Is Skilled Funded Traders closed?',
    summary:
      'Yes. Skilled Funded Traders announced the immediate suspension of operations and new purchases on March 28, 2024. Finance Magnates and FX News Group documented the notice and its Easton-linked context. PropRadar treats this page as a closed risk archive, not a current purchase option.',
    facts: [
      'Operations and new purchases were suspended on March 28, 2024.',
      'Finance Magnates reported payout-denial and trading-issue complaints around the shutdown period.',
      'FX News Group also documented the shutdown and described an Easton affiliation, while noting that the exact relationship was unclear.',
      'Old forex, stocks or funded-trader pages should be treated as historical search results, not current offers.',
      'The final treatment of every historical payout or refund obligation is not sufficiently documented in the current public file.',
      'The phrase "The Skilled Trader" is ambiguous; match the domain before treating it as the same operator.',
    ],
    links: [
      { label: 'Finance Magnates shutdown report', href: 'https://www.financemagnates.com/forex/easton-controlled-skilled-funded-trader-suspends-prop-trading-operations/' },
      { label: 'FX News Group shutdown report', href: 'https://fxnewsgroup.com/forex-news/retail-forex/skilled-funded-traders-becomes-second-easton-prop-firm-shut/' },
      { label: 'Open saved Skilled Funded Traders sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is Skilled Funded Traders still operating?',
        answer:
          'No current operation should be inferred. Skilled Funded Traders announced an immediate suspension of operations and new purchases on March 28, 2024, and PropRadar classifies the firm as closed.',
      },
      {
        question: 'Does Skilled Funded Traders currently offer forex or stocks funding?',
        answer:
          'No verified current forex or stocks funding offer is documented. Older product references and indexed pages should be treated as historical because the firm suspended operations in March 2024.',
      },
      {
        question: 'Does Skilled Funded Traders have reliable payout proof?',
        answer:
          'Historical payout claims do not make this a current buying option. Finance Magnates reported payout-denial complaints around the shutdown, and PropRadar has not found a complete public record showing that every historical obligation was resolved.',
      },
      {
        question: 'Is The Skilled Trader the same as Skilled Funded Traders?',
        answer:
          'Do not assume that two similar search names identify the same operator. This profile covers Skilled Funded Traders at skilledfundedtraders.com; match the domain, legal entity and current terms before using its evidence for another brand name.',
      },
    ],
  },
  'e8-futures': {
    metaTitle: 'E8 Futures Review: Status, Rules & Legal Risk (2026)',
    metaDescription:
      'E8 Futures review: futures account status, payout rules, legal entity, E8 Markets relationship and broker or FCM disclosures checked by PropRadar.',
    eyebrow: 'E8 Futures review',
    heading: 'What should traders verify before using E8 Futures?',
    summary:
      'E8 Futures must be assessed separately from E8 Markets. During the July 8, 2026 review, PropRadar could not capture primary terms strong enough to confirm the futures operator, broker or FCM relationship, refund policy or payout agreement.',
    facts: [
      'The E8 brand connection does not transfer legal or payout proof automatically from E8 Markets.',
      'The futures-specific legal entity and broker or FCM setup remain unconfirmed.',
      'Product rules, drawdown, activation costs and payout clauses need a fresh primary-source check.',
    ],
    links: [
      { label: 'Compare established futures prop firms', href: '/guides/meilleure-prop-firm-futures' },
      { label: 'Read Topstep vs Apex', href: '/guides/topstep-vs-apex' },
      { label: 'Open saved E8 Futures sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is E8 Futures the same as E8 Markets?',
        answer:
          'The brands may be connected, but PropRadar does not transfer the E8 Markets legal, review or payout file to E8 Futures automatically. The futures product needs its own operator, terms and broker or FCM disclosures.',
      },
      {
        question: 'Is E8 Futures verified by PropRadar?',
        answer:
          'The file is only partially verified. The official legal entity, futures-specific terms, operating relationship and payout agreement were not captured strongly enough during the latest review.',
      },
    ],
  },
  myforexfunds: {
    metaTitle: 'My Forex Funds Status: CFTC Dismissal & Relaunch Watch',
    metaDescription:
      'My Forex Funds status: CFTC case dismissal, Ontario asset release, current 2026 terms, possible relaunch and the checks still required before buying.',
    eyebrow: 'My Forex Funds legal and relaunch file',
    heading: 'Is My Forex Funds coming back?',
    summary:
      'A relaunch became more plausible after the US case was dismissed with prejudice in May 2025 and an Ontario court returned access to most assets and client data in December 2025. PropRadar still has not verified a normal active checkout, current program agreement or complete legacy-claims process, so the firm remains a relaunch watch rather than a purchase recommendation.',
    facts: [
      'The US CFTC case ended through a case-ending sanction and dismissal with prejudice in May 2025, not a trial judgment on every historical trader claim.',
      'The CFTC Acting Chairman publicly acknowledged serious litigation-conduct findings against agency staff.',
      'Bloomberg reported in December 2025 that an Ontario court returned access to most funds and client data.',
      'Current Terms dated January 28, 2026 remain informational and warn that described programs may not have normal investor-protection coverage.',
      'No normal current checkout and program-level payout audit were verified for this review.',
    ],
    links: [
      { label: 'Read the dated legal timeline', href: '#case-timeline' },
      { label: 'Review the latest operational-risk brief', href: '/radar-brief' },
      { label: 'Open saved My Forex Funds sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is My Forex Funds active again?',
        answer:
          'PropRadar has not verified a normal active checkout and current program agreement. The legal barriers to a possible restart have changed, but a possible relaunch is not the same as a fully audited live offer.',
      },
      {
        question: 'Was the CFTC case against My Forex Funds dismissed?',
        answer:
          'Yes. The US federal case was dismissed with prejudice in May 2025 through sanctions related to CFTC litigation misconduct. That result ended the US complaint but does not independently settle every legacy customer, payout or refund question.',
      },
      {
        question: 'Did My Forex Funds recover its assets?',
        answer:
          'Bloomberg reported in December 2025 that the Ontario Superior Court released nearly all funds and client data from receivership control. The remaining Canadian regulatory and escrow details still require primary-record checks.',
      },
      {
        question: 'Should traders buy a new My Forex Funds account?',
        answer:
          'Not until a current checkout, contracting entity, eligible jurisdiction, program rules and payout agreement are live and independently checked. Old popularity and the US dismissal do not replace a fresh product audit.',
      },
    ],
  },
  'fortunes-funding': {
    metaTitle: 'Fortunes Funding Review: Accounts, Payouts & Risk (2026)',
    metaDescription:
      'Fortunes Funding review: account sizes, evaluation rules, payout methods, risk review, legal entity and main points to verify before buying.',
    eyebrow: 'Fortunes Funding review',
    heading: 'How do Fortunes Funding accounts and payouts work?',
    summary:
      'Fortunes Funding advertises evaluation accounts using virtual funds, account sizes up to $600,000 and several payout rails. The main unresolved point is legal clarity: PropRadar did not capture a named contracting entity from the homepage during the July 8, 2026 review.',
    facts: [
      'The public offer includes evaluation accounts and a risk review before an approved payout is processed.',
      'Payout marketing must be read together with prohibited-strategy, account-management and IP clauses.',
      'The contracting entity, governing law and full refund conditions still need confirmation from primary terms.',
    ],
    links: [
      { label: 'Compare payout-risk signals', href: '/risques-payout' },
      { label: 'Read prop-firm rule audits', href: '/regles' },
      { label: 'Open saved Fortunes Funding sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is Fortune Funding the same as Fortunes Funding?',
        answer:
          'This PropRadar profile covers Fortunes Funding at fortunesfunding.com. Searches sometimes omit the final s, so always match the domain before relying on a review or payment page.',
      },
      {
        question: 'What account sizes does Fortunes Funding advertise?',
        answer:
          'The captured offer advertises virtual account sizes from $5,000 up to $600,000. The exact fee, target, drawdown and payout conditions must be checked on the current product page before purchase.',
      },
      {
        question: 'Are Fortunes Funding payouts guaranteed?',
        answer:
          'Marketing language should not be read as an unconditional guarantee. Payout requests are subject to a risk review and prohibited-strategy checks, so the full terms and recent independent payout evidence matter.',
      },
    ],
  },
  'aeon-funded': {
    metaTitle: 'Aeon Funded Review: Quantx Redirect, Status & Risk',
    metaDescription:
      'Aeon Funded review: Quantx Fund redirect, simulated accounts, current brand status, legal entity, payout claims and main risks checked by PropRadar.',
    eyebrow: 'Aeon Funded review',
    heading: 'Why does Aeon Funded redirect to Quantx Fund?',
    summary:
      'The Aeon Funded domain redirected to Quantx Fund during the July 8, 2026 review. The redirected site describes educational trader evaluation in simulated environments with virtual funds, but PropRadar did not capture a concrete legal entity or registration number.',
    facts: [
      'Aeon Funded and Quantx Fund reviews should be cross-checked to avoid brand-transition confusion.',
      'The redirected site states that accounts are demo or fictitious and that it is not a broker or investment firm.',
      'Strong payout and dealing-desk claims still need to be matched with the current terms and dated evidence.',
    ],
    links: [
      { label: 'Learn how to verify a prop-firm legal entity', href: '/guides/prop-firm-legal-check' },
      { label: 'Read the public audit', href: '/audit' },
      { label: 'Open saved Aeon Funded and Quantx sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is Aeon Funded now Quantx Fund?',
        answer:
          'The Aeon Funded domain redirected to Quantx Fund during the latest PropRadar check. Traders should verify whether the operator, terms and payout obligations were formally transferred rather than assuming that a domain redirect proves continuity.',
      },
      {
        question: 'Does Aeon Funded provide a real brokerage account?',
        answer:
          'The redirected Quantx Fund site describes simulated, fictitious accounts with virtual funds and states that it is not a broker, investment firm or financial adviser.',
      },
    ],
  },
  'the-funded-trader': {
    metaTitle: 'The Funded Trader Review: Payout Backlog & Current Risk',
    metaDescription:
      'The Funded Trader review: 2024 shutdown and relaunch timeline, outstanding-payout reports, current simulated-account terms and risks before buying.',
    eyebrow: 'The Funded Trader operational audit',
    heading: 'Did The Funded Trader fully recover after its 2024 pause?',
    summary:
      'The Funded Trader is online again, but the March 2024 interruption and later recovery reports remain material. Financial press documented an incomplete relaunch, partial payout and account-restoration claims, and roughly 900 traders still awaiting payouts in November 2024. Current offers must be judged separately under the latest simulated-account, refund and arbitration terms.',
    facts: [
      'Operations were temporarily paused on March 28, 2024 after payout and platform problems.',
      'The website returned in April, but financial press still found incomplete functionality and unresolved trader concerns.',
      'Company recovery updates reported only partial completion of legacy payouts and paused accounts during 2024.',
      'Current Terms identify The Funded Trader LLC and describe demo evaluation and simulated funded accounts.',
      'No independent public reconciliation proves that every pre-pause obligation was resolved.',
    ],
    links: [
      { label: 'Read the full interruption timeline', href: '#case-timeline' },
      { label: 'Review current payout-risk cases', href: '/risques-payout' },
      { label: 'Open saved The Funded Trader sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is The Funded Trader operating now?',
        answer:
          'The website currently presents active offers, but current operation does not erase the 2024 interruption. New buyers should separate present program terms from unresolved historical claims.',
      },
      {
        question: 'Did The Funded Trader pay everyone after the shutdown?',
        answer:
          'PropRadar has not found an independent public reconciliation proving that every trader payout, affiliate balance and paused account was resolved. Press reports through late 2024 described recovery as incomplete.',
      },
      {
        question: 'Are The Funded Trader funded accounts live brokerage accounts?',
        answer:
          'Current official material describes evaluation accounts as demo accounts and funded accounts as fully simulated accounts using market quotes. They should not be presented as protected brokerage deposits.',
      },
    ],
  },
  'funded-engineer': {
    metaTitle: 'Funded Engineer Closed: Bankruptcy & Payout Timeline',
    metaDescription:
      'Funded Engineer closed on July 15, 2024 and announced bankruptcy plans. Review the provider failures, shutdown timeline and unresolved payout risks.',
    eyebrow: 'Funded Engineer closure file',
    heading: 'Is Funded Engineer closed?',
    summary:
      'Yes. Funded Engineer announced permanent closure on July 15, 2024 and said it intended to file for bankruptcy. The shutdown followed technology and brokerage-provider disruptions. The public notice did not provide a complete account of pending payouts, refunds or a final claims process.',
    facts: [
      'FPFX Technologies terminated its license and services agreement in February 2024.',
      'Brokerage changes and close-only account restrictions added another operational dependency failure.',
      'The firm announced immediate permanent closure and planned bankruptcy on July 15, 2024.',
      'The closure announcement did not specify a complete pending-payout resolution.',
      'Old challenge pages and review ratings are historical, not a current buying signal.',
    ],
    links: [
      { label: 'Read the full closure timeline', href: '#case-timeline' },
      { label: 'Read the operational-dependency Risk Brief', href: '/radar-brief' },
      { label: 'Open saved Funded Engineer sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'When did Funded Engineer close?',
        answer:
          'Funded Engineer announced the immediate permanent cessation of operations on July 15, 2024 and said it would file for bankruptcy.',
      },
      {
        question: 'Why did Funded Engineer close?',
        answer:
          'The firm said restructuring, cost cutting and investment efforts had failed. Its closure followed earlier technology-license and brokerage disruptions documented by Finance Magnates.',
      },
      {
        question: 'Were all Funded Engineer payouts resolved?',
        answer:
          'No complete public reconciliation was captured. The closure announcement did not specify the treatment of every pending payout or refund, so historical claims require dated account and legal records.',
      },
    ],
  },
  surgetrader: {
    metaTitle: 'SurgeTrader Closed: Match-Trader Loss & Current Status',
    metaDescription:
      'SurgeTrader closed on May 24, 2024 after losing its Match-Trader relationship. Review the shutdown timeline, parked domain and clone risks.',
    eyebrow: 'SurgeTrader closure file',
    heading: 'Is SurgeTrader still operating?',
    summary:
      'No active SurgeTrader operation is verified. The company announced that it had closed and ceased all operations on May 24, 2024 after the loss of its Match-Trader platform relationship. The former official domain is now parked for sale, creating a material stale-link and clone-confusion risk.',
    facts: [
      'Match-Trade Technologies confirmed termination of the cooperation after a compliance procedure.',
      'SurgeTrader disputed the platform-provider decision at the time.',
      'The firm announced definitive closure on May 24, 2024.',
      'The former official domain no longer contains current legal terms or an active product.',
      'Any apparent relaunch must prove domain control, legal entity and platform access from scratch.',
    ],
    links: [
      { label: 'Read the platform-loss timeline', href: '#case-timeline' },
      { label: 'Review the public legal audit', href: '/audit' },
      { label: 'Open saved SurgeTrader sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'When did SurgeTrader close?',
        answer:
          'SurgeTrader announced that it closed and ceased all operations on May 24, 2024.',
      },
      {
        question: 'Why did SurgeTrader shut down?',
        answer:
          'The final shutdown followed the termination of its Match-Trader platform relationship. Match-Trade cited formal agreement and compliance concerns, while SurgeTrader disputed the decision.',
      },
      {
        question: 'Is the SurgeTrader website active?',
        answer:
          'The former surgetrader.com domain is parked rather than serving a current prop-firm product. A parked domain is not evidence of a legitimate relaunch.',
      },
    ],
  },
  'true-forex-funds': {
    metaTitle: 'True Forex Funds Closed: Insolvency & Platform Timeline',
    metaDescription:
      'True Forex Funds closed permanently in May 2024. Review the MetaTrader interruption, cTrader relaunch attempt, insolvency and RED List context.',
    eyebrow: 'True Forex Funds closure file',
    heading: 'What happened to True Forex Funds?',
    summary:
      'True Forex Funds permanently ceased operations in May 2024 and cited financial insolvency. The final closure followed a MetaTrader-license interruption in February and an attempted cTrader restart. The case shows why platform continuity and operator finances must be checked separately.',
    facts: [
      'MetaQuotes terminated the firm MT4 and MT5 licenses in February 2024, forcing a temporary stop.',
      'The company attempted to restart through cTrader later that month.',
      'The official May 2024 notice announced permanent closure because financial stabilization efforts had failed.',
      'True Forex Funds appeared on the CFTC RED List; inclusion is a registration warning, not by itself a court finding of a violation.',
      'No current product, checkout or payout route should be inferred from old reviews.',
    ],
    links: [
      { label: 'Read the full closure timeline', href: '#case-timeline' },
      { label: 'Learn how to check a legal entity', href: '/guides/prop-firm-legal-check' },
      { label: 'Open saved True Forex Funds sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is True Forex Funds permanently closed?',
        answer:
          'Yes. Its official May 2024 notice said the company had ceased all operations and would close permanently because of financial insolvency.',
      },
      {
        question: 'Did True Forex Funds try to relaunch?',
        answer:
          'Yes. After losing MetaTrader access, the firm announced a cTrader restart in February 2024. That attempt did not prevent the permanent insolvency closure in May.',
      },
      {
        question: 'What does the CFTC RED List mean for True Forex Funds?',
        answer:
          'The RED List identifies an unregistered foreign entity that appeared to act in a capacity requiring CFTC registration. The CFTC states that list inclusion is not itself a finding by the agency or a court that a legal violation occurred.',
      },
    ],
  },
  'hantec-trader': {
    metaTitle: 'Hantec Trader Review: Entity, Rules & FCA Status (2026)',
    metaDescription:
      'Hantec Trader review: Mauritius entity, simulated accounts, FCA status, Hantec Markets relationship, restricted countries and legal risks.',
    eyebrow: 'Hantec Trader review',
    heading: 'Is Hantec Trader regulated like Hantec Markets?',
    summary:
      'Hantec Trader benefits from the wider Hantec brand, but the prop-firm service must be judged separately. Its official disclaimer identifies a Mauritius company, simulated accounts with virtual funds and no broker or deposit-taking activity, and states that Hantec Trader is not FCA-regulated.',
    facts: [
      'Hantec Trader Limited is presented separately from regulated entities in the wider Hantec group.',
      'The prop service uses simulated accounts and does not provide normal brokerage-account protection.',
      'Country restrictions and the exact instant or evaluation program rules must be checked before purchase.',
    ],
    links: [
      { label: 'Read the prop-firm legal check guide', href: '/guides/prop-firm-legal-check' },
      { label: 'Compare Hantec Trader with other firms', href: '/comparateur' },
      { label: 'Open saved Hantec Trader sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is Hantec Trader FCA-regulated?',
        answer:
          'The official disclaimer captured by PropRadar states that Hantec Trader is not FCA-regulated. Do not transfer the regulatory status of another Hantec group company to the prop-firm service.',
      },
      {
        question: 'Is Hantec Trader a broker?',
        answer:
          'The official site states that Hantec Trader is a proprietary trading service using simulated accounts with virtual funds, does not act as a broker and does not accept deposits.',
      },
    ],
  },
};

export function getFirmSearchProfile(slug: string) {
  return firmSearchProfiles[slug];
}

export function getFirmContentLastModified(
  slug: string,
  lastReviewed: string,
  legalLastChecked?: string,
  caseLastChecked?: string,
) {
  let latest = lastReviewed;

  if (legalLastChecked && legalLastChecked > latest) {
    latest = legalLastChecked;
  }

  if (getFirmSearchProfile(slug) && FIRM_SEARCH_CONTENT_UPDATED_AT > latest) {
    latest = FIRM_SEARCH_CONTENT_UPDATED_AT;
  }

  if (caseLastChecked && caseLastChecked > latest) {
    latest = caseLastChecked;
  }

  return latest;
}
