/**
 * Interface strings of the /radar-brief hub. The issues themselves (titles,
 * summaries, sections, sources) are published in English and stay as written.
 */
const en = {
  metaTitle: 'Prop Firm Risk Brief: Rules, Payout Alerts & Legal Moves',
  metaDescription:
    'A recurring, source-backed prop firm briefing covering rule changes, payout alerts, closures and legal-entity checks before traders buy a challenge.',
  home: 'Home',
  breadcrumbAria: 'Breadcrumb',
  breadcrumb: 'Risk Brief',
  schemaBreadcrumb: 'Prop Firm Risk Brief',
  eyebrow: 'PropRadar editorial research',
  h1: 'The weekly prop firm risk brief.',
  lead: "One concise edition for the facts that can change a trader's decision: rules, payouts and legal structure, with the evidence attached.",
  ctaLatest: 'Read the latest issue',
  ctaFeed: 'Follow the research feed',
  promise: 'No bought placement. No recycled rating. Corrections and uncertainty stay visible.',
  issue: 'Issue {n}',
  coverageAria: 'Latest issue coverage',
  statFirms: 'firms',
  statSources: 'cited sources',
  statMinutes: 'min read',
  openIssue: 'Open issue',
  formatEyebrow: 'The format',
  formatTitle: 'Three signals. One decision window.',
  formatText: 'Each section links the finding to firm files, decision guides and the source used to support it.',
  topics: {
    rules: { title: 'Rule Watch', text: 'Material trading, consistency and withdrawal conditions, read at the exact program level.' },
    payout: { title: 'Payout Watch', text: 'Closures, delays, denials and operational evidence that can change a purchase decision.' },
    legal: { title: 'Legal Lens', text: 'The entity behind the product, its jurisdiction and the protections traders should not assume.' },
  },
  latestEyebrow: 'Latest issue',
  latestTitle: 'What changed the decision this week.',
  cutoff: 'Research cut-off: {date}.',
  archiveEyebrow: 'Issue archive',
  archiveTitle: 'Every edition keeps its sources and date.',
  archiveText: 'The archive turns fast-moving risk signals into a history that can be checked later.',
  methodEyebrow: 'Editorial standard',
  methodTitle: 'Evidence before urgency.',
  methodText:
    'Official terms and regulator records lead. Financial press adds context when it materially changes the file. Community reports stay labeled as signals, not facts.',
  pointFiles: 'firm files available for cross-checking',
  pointSourceStrong: 'Primary source',
  pointSource: 'linked beside every factual claim',
  pointCutoffStrong: 'Visible cut-off',
  pointCutoff: 'for every published edition',
  ctaMethod: 'Read the methodology',
  ctaCorrection: 'Submit a correction',
  contentNote: '',
};

export type RadarBriefMessages = typeof en;
export default en;
