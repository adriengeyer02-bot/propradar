export const GUIDE_EDITORIAL_REFRESH_DATE = '2026-07-19';

export type GuideVisualTheme =
  | 'ranking'
  | 'rules'
  | 'payout'
  | 'legal'
  | 'futures'
  | 'forex';

export type GuideVisual = {
  theme: GuideVisualTheme;
  label: string;
  caption: string;
};

const visualByTheme: Record<GuideVisualTheme, GuideVisual> = {
  ranking: {
    theme: 'ranking',
    label: 'Independent ranking research',
    caption: 'PropRadar compares rules, payout evidence, legal files and community signals before price or promotion.',
  },
  rules: {
    theme: 'rules',
    label: 'Program-rule analysis',
    caption: 'A rule that looks simple at brand level can change by program, stage, event window or payout cycle.',
  },
  payout: {
    theme: 'payout',
    label: 'Payout evidence review',
    caption: 'Withdrawal speed is assessed with dated proof, exact program terms, payout conditions and incident history.',
  },
  legal: {
    theme: 'legal',
    label: 'Legal due diligence',
    caption: 'The evidence file starts with the contracting entity, official terms, jurisdiction and dispute clauses.',
  },
  futures: {
    theme: 'futures',
    label: 'Futures program comparison',
    caption: 'Futures programs are compared across drawdown behavior, evaluation cost, funded fees and payout access.',
  },
  forex: {
    theme: 'forex',
    label: 'Forex program comparison',
    caption: 'Forex offers are compared by execution environment, platform, news rules, drawdown and payout evidence.',
  },
};

const guideThemeBySlug: Record<string, GuideVisualTheme> = {
  'meilleure-prop-firm-2026': 'ranking',
  'prop-firm-pas-cher': 'ranking',
  'prop-firm-pour-debutant': 'ranking',
  'meilleure-prop-firm-futures': 'futures',
  'topstep-vs-apex': 'futures',
  'topstep-review': 'futures',
  'prop-firm-drawdown': 'rules',
  'meilleure-prop-firm-forex': 'forex',
  'ftmo-vs-the5ers': 'forex',
  'funderpro-vs-the5ers': 'forex',
  'alternatives-ftmo': 'forex',
  'prop-firm-sans-consistency-rule': 'rules',
  'prop-firm-news-trading': 'rules',
  'prop-firm-smc-ict': 'rules',
  'prop-firm-swing-trading': 'rules',
  'prop-firm-ea-algo': 'rules',
  'prop-firm-payout-rapide': 'payout',
  'prop-firm-instant-funding': 'payout',
  'prop-firm-sans-challenge': 'payout',
  'prop-firm-payout-proof': 'payout',
  'prop-firm-fiable-trustpilot': 'legal',
  'leveraged-prop-firm-avis': 'legal',
  'goat-funded-trader-avis': 'legal',
  'prop-firm-avis-reddit-trustpilot': 'legal',
  'prop-firm-legal-check': 'legal',
};

export function getGuideVisual(slug: string) {
  return visualByTheme[guideThemeBySlug[slug] ?? 'ranking'];
}
