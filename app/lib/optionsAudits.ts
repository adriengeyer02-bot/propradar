import { getFirmBySlug } from './propFirms';

/**
 * Source-linked initial editorial assessments for the options research catalogue.
 * These are NOT algorithmically inferred from a Trustpilot star rating. They follow
 * PropRadar's existing qualitative standards: legal identity, contractual rules,
 * payout evidence, execution/operational risks and independent review signals.
 * The two professional desks must not be compared directly with retail challenges.
 * Owner approval is required before publishing sensitive new findings.
 */
export type OptionsAuditFinding = {
  title: string;
  detail: string;
  source: string;
  tone: 'positive' | 'caution' | 'critical';
};

export type OptionsAudit = {
  score: number;
  beforeTrustpilotPenalty?: number;
  reviewedAt: string;
  status: 'Partiellement vérifié';
  summary: string;
  summaryFr: string;
  findings: OptionsAuditFinding[];
  logo: string;
  logoSource: string;
  trustpilot?: { rating?: number; count: number; withheld?: boolean; url: string };
};

const date = '2026-11-18';

export const optionsAudits: Record<string, OptionsAudit> = {
  'vanquish-trader': {
    score: 61, reviewedAt: date, status: 'Partiellement vérifié',
    summary: 'The rules and payouts are described in detail, but the published programme terms give Vanquish broad discretion. Legal-entity verification and bank-level payout evidence are still incomplete.',
    summaryFr: 'Règles et procédure de paiement détaillées, mais contrat très discrétionnaire. L’identité juridique complète et les virements effectifs restent à vérifier indépendamment.',
    logo: '/logos/options-vanquish-trader.png', logoSource: 'https://www.vanquishtrader.com/logomark_light_512.png',
    trustpilot: { rating: 4.1, count: 130, url: 'https://www.trustpilot.com/review/vanquishtrader.com' },
    findings: [
      { title: 'US residency in published terms', detail: 'Section 2 describes programme eligibility for legal residents of the 50 US states or Washington DC. Non-US applicants should get written confirmation before paying.', source: 'https://www.vanquishtrader.com/terms', tone: 'critical' },
      { title: 'Payout discretion', detail: 'The terms allow account disqualification following background/internal review, and describe awards rather than independently verified trading profits.', source: 'https://www.vanquishtrader.com/terms', tone: 'caution' },
      { title: 'Plan-specific consistency', detail: 'Basic and Advanced Options have distinct 30% consistency tests; Advanced resets its four-day counter after a paid withdrawal.', source: 'https://support.vanquishtrader.com/en/articles/10910750-payout-faqs', tone: 'caution' },
      { title: 'Public customer feedback', detail: 'Trustpilot showed 4.1/5 from 130 reviews at review time. Individual payout and execution accounts are user reports, not an audit of transfers or fills.', source: 'https://www.trustpilot.com/review/vanquishtrader.com', tone: 'positive' },
    ],
  },
  'options-funding': {
    score: 53, reviewedAt: date, status: 'Partiellement vérifié',
    summary: 'Options Funding discloses its Wyoming LLC and unusually detailed rules. Payout conditions and the live-program choice contain material restrictions; the independent operating record remains short.',
    summaryFr: 'La LLC du Wyoming et les règles sont identifiées. En revanche, les plafonds de retrait et les conséquences du passage au programme Live imposent une vigilance particulière.',
    logo: '/logos/options-options-funding.png', logoSource: 'https://optionsfunding.co/apple-icon',
    trustpilot: { rating: 3.3, count: 37, url: 'https://www.trustpilot.com/review/optionsfunding.co' },
    findings: [
      { title: 'Named operating company', detail: 'Official programme material identifies Options Funding LLC of Wyoming; this establishes the named counterparty, not a verified payout reserve.', source: 'https://optionsfunding.co/dial-rules', tone: 'positive' },
      { title: 'Funded withdrawal hurdles', detail: 'The standard rules require eight qualifying winning days per payout, allow withdrawal of no more than 50% of profits subject to caps, and charge a refundable-on-first-payout $129 activation fee.', source: 'https://optionsfunding.co/rules', tone: 'critical' },
      { title: 'Live invitation settlement risk', detail: 'Accepting the Live invitation closes existing simulated accounts and cancels pending payouts; declining caps pending settlements at $3,000 across accounts. The live programme is invitation-only.', source: 'https://optionsfunding.co/rules', tone: 'critical' },
      { title: 'Early review signal', detail: 'Trustpilot displayed 3.3/5 across 37 reviews. Small review volume and untested bank transfers limit confidence in the public signal.', source: 'https://www.trustpilot.com/review/optionsfunding.co', tone: 'caution' },
    ],
  },
  'strix-options-funding': {
    score: 55, beforeTrustpilotPenalty: 63, reviewedAt: date, status: 'Partiellement vérifié',
    summary: 'Strix publishes extensive contractual detail and an identified LLC, but payout requirements are demanding. Trustpilot currently withholds its rating after removing fake reviews; an eight-point editorial penalty applies and the score remains below the 64-point cap.',
    summaryFr: 'Documentation contractuelle développée, mais contraintes de retrait importantes. Trustpilot masque la note après suppression de faux avis : pénalité éditoriale de 8 points, avec plafond de 64/100.',
    logo: '/logos/options-strix-options-funding.png', logoSource: 'https://strixoptionsfunding.com/assets/img/strix-logo.png (S cropped from official wordmark)',
    trustpilot: { count: 147, withheld: true, url: 'https://www.trustpilot.com/review/strixoptionsfunding.com' },
    findings: [
      { title: 'Trustpilot score withheld', detail: 'Trustpilot says the rating is unavailable following a breach of its guidelines and that it removed fake reviews. This does not establish who posted those reviews.', source: 'https://www.trustpilot.com/review/strixoptionsfunding.com', tone: 'critical' },
      { title: 'Eight qualifying payout days', detail: 'Funded withdrawals require eight qualifying winning days; a maximum of 50% of profits may be requested and account-size payout caps apply.', source: 'https://strixoptionsfunding.com/faq/payouts-and-payments', tone: 'critical' },
      { title: 'Strix Pro risk qualification', detail: 'The Pro plan also requires new net profit equal to at least 15% of peak assessed portfolio risk before each funded payout.', source: 'https://strixoptionsfunding.com/rules', tone: 'caution' },
      { title: 'Company and live separation', detail: 'The published Live Trader Agreement names Strix Options LLC and makes clear that evaluation and funded accounts are simulated; live participation is discretionary.', source: 'https://strixoptionsfunding.com/live-trader-agreement', tone: 'positive' },
    ],
  },
  tradefundrr: {
    // Always read the existing scored comparator record; do not create a rival score.
    score: 67, reviewedAt: date, status: 'Partiellement vérifié',
    summary: 'Already reviewed and scored in PropRadar’s main comparator. Simulated Pre-Prop and Prop programmes are separate from the T3 Global professional capital-contribution path.',
    summaryFr: 'Déjà auditée dans le comparateur PropRadar. Les programmes simulés Pre-Prop et Prop doivent être distingués de la voie professionnelle avec contribution de capital chez T3 Global.',
    logo: '/logos/tradefundrr.png', logoSource: 'https://tradefundrr.com/assets/images/tf-icon-dark.png?v=202605241720',
    trustpilot: { rating: 4.3, count: 84, url: 'https://www.trustpilot.com/review/tradefundrr.com' },
    findings: [
      { title: 'Existing PropRadar audit', detail: 'The existing firm profile documents $599 Pre-Prop, $1,499 Prop and $99/month platform/data fees; its current score is the single authoritative score for this company.', source: 'https://tradefundrr.com/stock-trader-funding/', tone: 'caution' },
      { title: 'Separate legal entities', detail: 'TradeFundrr LLC operates simulated programmes; T3 Global is a separate professional programme, and T3 Trading Group’s broker-dealer registration does not cover TradeFundrr accounts.', source: 'https://tradefundrr.com/', tone: 'positive' },
      { title: 'Payout cycle requirements', detail: 'Payouts are limited to 50% of account profit and relevant caps; qualifying days reset after each payout, with Friday processing after Wednesday cutoff.', source: 'https://tradefundrr.freshdesk.com/support/solutions/articles/202000125624-when-can-i-request-a-payout-', tone: 'caution' },
    ],
  },
  'imperial-trader-funding': {
    score: 43, reviewedAt: date, status: 'Partiellement vérifié',
    summary: 'The operator documents an options pathway but imposes unusually material contractual restrictions and discretionary sanctions. Public customer feedback includes unresolved payout and execution complaints that PropRadar has not independently adjudicated.',
    summaryFr: 'Programme d’options réel au catalogue, mais règles restrictives et latitude importante de sanction. Des avis clients signalent des problèmes de plateforme et de paiement, sans vérification indépendante de chaque dossier.',
    logo: '/logos/options-imperial-trader-funding.png', logoSource: 'https://www.imperialtraderfunding.com/favicon.svg',
    trustpilot: { rating: 3.1, count: 50, url: 'https://www.trustpilot.com/review/imperialtraderfunding.com' },
    findings: [
      { title: 'Contractual forfeiture and rolling limits', detail: 'The company prohibits rolling options beyond 45 days from entry and more than once; its rules provide for account closure and forfeiture of accrued profits upon restricted-practice breaches.', source: 'https://imperialtraderfunding.zendesk.com/hc/en-us/articles/38736866441755-Restricted-Trading-Practices', tone: 'critical' },
      { title: 'Discretionary account closures', detail: 'The firm describes a three-strike regime but retains sole discretion to impose immediate termination for certain categories of conduct.', source: 'https://imperialtraderfunding.zendesk.com/hc/en-us/articles/37887500408987-Violations-Account-Integrity', tone: 'caution' },
      { title: 'Payout buffer and transition', detail: 'Sim-Funded payouts require a 7% safety buffer, with a published 90% split for Elite and Foundation. Live terms are individualized; a separate policy allows a final 50% profit settlement after adverse live risk review.', source: 'https://imperialtraderfunding.zendesk.com/hc/en-us/articles/37892902642331-Profit-Splits-Sim-Funded-Stage-and-Live-Funded-Stage', tone: 'caution' },
      { title: 'Mixed public feedback', detail: 'Trustpilot displayed 3.1/5 from 50 reviews, including individual complaints about order execution and unpaid balances. These are user allegations, not verified findings against the company.', source: 'https://www.trustpilot.com/review/imperialtraderfunding.com', tone: 'critical' },
    ],
  },
  'maverick-trading': {
    score: 68, reviewedAt: date, status: 'Partiellement vérifié',
    summary: 'A professional recruitment and trader-capital arrangement, not a retail challenge. Public fees are disclosed, but enrolment and first-loss capital vary with the agreement; a personal risk assessment is essential.',
    summaryFr: 'Desk professionnel, et non challenge classique. Frais mensuels affichés, mais frais d’entrée et capital personnel exposé variables selon le contrat.',
    logo: '/logos/options-maverick-trading.png', logoSource: 'https://www.mavericktrading.com/mt-logo.png',
    trustpilot: { rating: 4.7, count: 97, url: 'https://www.trustpilot.com/review/mavericktrading.com' },
    findings: [
      { title: 'Material trader-borne costs', detail: 'Official terms specify $199/month membership plus a separate one-time enrolment fee and required risk capital contribution; the last two amounts depend on the offer.', source: 'https://www.mavericktrading.com/terms-of-service', tone: 'critical' },
      { title: 'Professional trading qualification', detail: 'Applicants complete a verification programme before access to firm capital. These are recruitment/desk terms rather than a simulated retail funding reward.', source: 'https://www.mavericktrading.com/frequently-asked-questions-how-maverick-trading-works', tone: 'caution' },
      { title: 'Public reputation', detail: 'Trustpilot showed 4.7/5 from 97 reviews. Positive trader testimonials do not replace checking individual capital-at-risk and termination clauses.', source: 'https://www.trustpilot.com/review/mavericktrading.com', tone: 'positive' },
    ],
  },
  't3-trading-group': {
    score: 73, reviewedAt: date, status: 'Partiellement vérifié',
    summary: 'SEC-registered FINRA-member proprietary broker-dealer with filed financial information. Regulatory disclosures also document three final events, including 2025 supervisory and reporting sanctions; capital contributions and licensing make this a professional rather than retail programme.',
    summaryFr: 'Broker-dealer enregistré SEC/FINRA, avec états financiers déposés. Le dossier FINRA recense toutefois trois événements réglementaires définitifs, notamment deux sanctions de 2025. Ce n’est pas un challenge retail.',
    logo: '/logos/options-t3-trading-group.png', logoSource: 'https://t3trading.com/wp-content/uploads/2021/02/cropped-t3tg_social_logo-1-192x192.png',
    findings: [
      { title: 'Verified broker-dealer identity', detail: 'FINRA BrokerCheck identifies T3 Trading Group LLC as CRD 154431 / SEC 8-68639, registered with the SEC and one SRO; its published audited statements describe proprietary listed-equity/options trading.', source: 'https://files.brokercheck.finra.org/firm/firm_154431.pdf', tone: 'positive' },
      { title: 'Three final regulatory disclosures', detail: 'The FINRA firm report lists three final events. Two 2025 consent resolutions included a $175,000 fine for order-routing reports/supervision and a $300,000 fine for supervision of potentially manipulative trader activity; the firm did not admit or deny the findings.', source: 'https://files.brokercheck.finra.org/firm/firm_154431.pdf', tone: 'critical' },
      { title: 'License and first-loss capital', detail: 'The firm says proprietary equities/options traders need SIE and Series 57; applicants may contribute first-loss capital or be considered for firm funding based on track record. Terms must be checked with the desk.', source: 'https://t3trading.com/', tone: 'caution' },
      { title: 'Official financial filings', detail: 'Its published SEC-filed 2024 financial statements document company operations and ownership; registration and balance-sheet disclosure are not guarantees against trader losses.', source: 'https://www.sec.gov/Archives/edgar/data/1495485/000149548525000004/SHORT.pdf', tone: 'positive' },
    ],
  },
};

export function optionsAuditFor(slug: string): OptionsAudit | undefined {
  const audit = optionsAudits[slug];
  if (!audit) return undefined;
  if (slug !== 'tradefundrr') return audit;
  // TradeFundrr already lives in the scored universe and has one source of truth.
  const existing = getFirmBySlug('tradefundrr');
  return existing ? { ...audit, score: existing.score } : audit;
}
