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

export const FIRM_SEARCH_CONTENT_UPDATED_AT = '2026-07-12';

const firmSearchProfiles: Partial<Record<string, FirmSearchProfile>> = {
  'skilled-funded-traders': {
    metaTitle: 'Skilled Funded Traders Review: Status, Payouts & Risk',
    metaDescription:
      'Skilled Funded Traders review: current operating status, payout evidence, forex or stocks claims, legal entity and incident risk checked by PropRadar.',
    eyebrow: 'Skilled Funded Traders review',
    heading: 'Is Skilled Funded Traders still operating and paying traders?',
    summary:
      'PropRadar does not currently treat Skilled Funded Traders as a normal purchase candidate. During the July 8, 2026 review, the official domain and terms could not be verified safely enough to confirm the current operator, active programs or payout obligations.',
    facts: [
      'The current legal entity and operating status remain unconfirmed.',
      'Multiple incident signals keep the profile in the high-risk watchlist and archive layer.',
      'Old forex, stocks or funding pages should not be treated as current offers without accessible official terms.',
      'The phrase "The Skilled Trader" is ambiguous; match the domain before treating it as the same operator.',
    ],
    links: [
      { label: 'Check current payout-risk methodology', href: '/risques-payout' },
      { label: 'Read the source audit', href: '/audit' },
      { label: 'Open saved Skilled Funded Traders sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is Skilled Funded Traders still operating?',
        answer:
          'PropRadar could not confirm a sufficiently clear active operating status during the July 8, 2026 review. Verify the official domain, current terms, checkout entity and recent support activity before treating the firm as active.',
      },
      {
        question: 'Does Skilled Funded Traders currently offer forex or stocks funding?',
        answer:
          'The current file does not contain accessible primary terms strong enough to confirm a live forex or stocks program. Older product references should be treated as historical until the firm publishes current rules and a contracting entity.',
      },
      {
        question: 'Does Skilled Funded Traders have reliable payout proof?',
        answer:
          'PropRadar does not have enough recent, independently verifiable payout evidence to recommend the profile. Look for dated proof tied to the exact program, plus current withdrawal terms and KYC conditions.',
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
    metaTitle: 'My Forex Funds Review: Payout History & Closure Risk',
    metaDescription:
      'My Forex Funds review: payout history, closure status, regulatory record, legal sources and why old ratings are not a current buying signal.',
    eyebrow: 'My Forex Funds review',
    heading: 'What happened to My Forex Funds payouts and accounts?',
    summary:
      'My Forex Funds is kept as a historical risk and regulatory case study, not as a current prop-firm recommendation. Searches for a payout or review should be read in the context of the shutdown history, legal proceedings and the absence of a normal active offer.',
    facts: [
      'The profile is classified as closed and is not a current purchase option.',
      'Historical payout testimonials and ratings do not prove current account or withdrawal availability.',
      'Any claim about refunds, balances or legal outcomes should be checked against dated official documents.',
    ],
    links: [
      { label: 'Review current payout-risk cases', href: '/risques-payout' },
      { label: 'Learn how PropRadar filters public reviews', href: '/trustpilot-prop-firms' },
      { label: 'Open saved My Forex Funds sources', href: '#sources' },
    ],
    faq: [
      {
        question: 'Is My Forex Funds still operating as a normal prop firm?',
        answer:
          'No current normal purchase offer is documented in the PropRadar file. The brand is treated as a closed historical risk profile, so old challenge pages, payout claims and review ratings should not be used as current buying evidence.',
      },
      {
        question: 'Did My Forex Funds pay traders?',
        answer:
          'Historical traders reported payouts before the shutdown, but that does not answer current account, balance or legal claims. Current questions require dated official documents and should not rely on old certificates or review-platform ratings.',
      },
      {
        question: 'Is an old My Forex Funds review still useful?',
        answer:
          'It can help reconstruct the historical trader experience, but it is obsolete for a current purchase decision. Closure status, legal developments and any official claims process matter more than the old star rating.',
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
) {
  let latest = lastReviewed;

  if (legalLastChecked && legalLastChecked > latest) {
    latest = legalLastChecked;
  }

  if (getFirmSearchProfile(slug) && FIRM_SEARCH_CONTENT_UPDATED_AT > latest) {
    latest = FIRM_SEARCH_CONTENT_UPDATED_AT;
  }

  return latest;
}
