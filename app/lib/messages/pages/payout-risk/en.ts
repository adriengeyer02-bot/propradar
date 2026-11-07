/** Interface strings of /prop-firm-payout-risk. Firm data (verdicts, incidents) stays in English. */
const en = {
  metaTitle: 'Prop Firm Payout Risks: Delays and Denial Signals',
  metaDescription:
    'Track prop-firm payout delays, denials, incidents, legal checks and source depth before paying for an evaluation or funded account.',
  schemaName: 'Prop firm payout risk watch',
  schemaItem: 'Payout risk {level}.',
  breadcrumb: 'Payout risks',
  eyebrow: 'Payout watch',
  h1: 'Prop firm payout risks to check before buying',
  lead: 'Withdrawal problems cost more than a missed discount. This page isolates firms where payout risk, incidents, legal context or withdrawal conditions require stricter reading.',
  ctaCompare: 'Compare with all signals',
  ctaClauses: 'Read sensitive clauses',
  ctaSources: 'Check sources',
  statAbove: 'Firms with payout risk above low',
  statCritical: 'of which critical',
  statHigh: 'of which high',
  statShown: 'Shown below (most at risk)',
  summaryAria: 'Payout risk reading summary',
  statLegal: 'Legal watch, in the list below',
  statDeep: 'With 5+ sources',
  statPress: 'Press checks recorded',
  methodEyebrow: 'Withdrawal method',
  methodTitle: 'Payout risk needs proof, not rumor.',
  notes: [
    { title: 'Incident load', text: 'Tracked incident count across the current payout watchlist, weighted against score and public signals.' },
    { title: 'Legal overlap', text: 'The highest caution zone is payout stress plus unverified entity, regulator warning or thin legal source stack.' },
    { title: 'Source depth', text: 'Deeply sourced risk files are more useful than isolated screenshots or unsourced social complaints.' },
    { title: 'Review filter', text: 'Trustpilot and community ratings are treated as signals, not proof that a disputed withdrawal is valid.' },
  ],
  alertsEyebrow: 'Priority alerts',
  alertsTitle: 'Profiles to read twice',
  tableAria: 'Prop firms with payout risk above low',
  badMixEyebrow: 'Bad mix',
  badMixTitle: 'Payout pressure plus legal opacity',
  beforeEyebrow: 'Before paying',
  beforeTitle: 'Read these clauses first',
  clauses: [
    'Reward review, KYC and prohibited-trading clauses before the first payout.',
    'Refund and chargeback language after credentials or platform access are delivered.',
    'Consistency, best-day, max-lot, copy-trading and account-linking restrictions.',
    'Entity, jurisdiction, dispute venue and whether the account is simulated or broker-linked.',
  ],
  dataNote: '',
};

export type PayoutRiskMessages = typeof en;
export default en;
