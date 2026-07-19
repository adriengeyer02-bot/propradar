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
  image: string;
  image16x9: string;
  image4x3: string;
  image1x1: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

const visualByTheme: Record<GuideVisualTheme, GuideVisual> = {
  ranking: {
    theme: 'ranking',
    label: 'Independent ranking research',
    image: '/guides/prop-firm-ranking-research.jpg',
    image16x9: '/guides/prop-firm-ranking-research-16x9.jpg',
    image4x3: '/guides/prop-firm-ranking-research-4x3.jpg',
    image1x1: '/guides/prop-firm-ranking-research-1x1.jpg',
    alt: 'Evidence board comparing prop-firm scores, sources and risk indicators',
    caption: 'PropRadar compares rules, payout evidence, legal files and community signals before price or promotion.',
    width: 1536,
    height: 864,
  },
  rules: {
    theme: 'rules',
    label: 'Program-rule analysis',
    image: '/guides/prop-firm-rules-risk.jpg',
    image16x9: '/guides/prop-firm-rules-risk-16x9.jpg',
    image4x3: '/guides/prop-firm-rules-risk-4x3.jpg',
    image1x1: '/guides/prop-firm-rules-risk-1x1.jpg',
    alt: 'Trading dashboard illustrating drawdown, consistency and rule restrictions',
    caption: 'A rule that looks simple at brand level can change by program, stage, event window or payout cycle.',
    width: 1536,
    height: 864,
  },
  payout: {
    theme: 'payout',
    label: 'Payout evidence review',
    image: '/guides/prop-firm-payout-evidence.jpg',
    image16x9: '/guides/prop-firm-payout-evidence-16x9.jpg',
    image4x3: '/guides/prop-firm-payout-evidence-4x3.jpg',
    image1x1: '/guides/prop-firm-payout-evidence-1x1.jpg',
    alt: 'Payout evidence review with a withdrawal timeline, secure records and verification lens',
    caption: 'Withdrawal speed is assessed with dated proof, exact program terms, payout conditions and incident history.',
    width: 1536,
    height: 864,
  },
  legal: {
    theme: 'legal',
    label: 'Legal due diligence',
    image: '/guides/prop-firm-legal-due-diligence.jpg',
    image16x9: '/guides/prop-firm-legal-due-diligence-16x9.jpg',
    image4x3: '/guides/prop-firm-legal-due-diligence-4x3.jpg',
    image1x1: '/guides/prop-firm-legal-due-diligence-1x1.jpg',
    alt: 'Legal due-diligence dossier connecting entity, jurisdiction and contract evidence',
    caption: 'The evidence file starts with the contracting entity, official terms, jurisdiction and dispute clauses.',
    width: 1536,
    height: 864,
  },
  futures: {
    theme: 'futures',
    label: 'Futures program comparison',
    image: '/guides/futures-prop-firm-comparison.jpg',
    image16x9: '/guides/futures-prop-firm-comparison-16x9.jpg',
    image4x3: '/guides/futures-prop-firm-comparison-4x3.jpg',
    image1x1: '/guides/futures-prop-firm-comparison-1x1.jpg',
    alt: 'Side-by-side futures funding paths with moving and fixed drawdown thresholds',
    caption: 'Futures programs are compared across drawdown behavior, evaluation cost, funded fees and payout access.',
    width: 1536,
    height: 864,
  },
  forex: {
    theme: 'forex',
    label: 'Forex program comparison',
    image: '/guides/forex-prop-firm-comparison.jpg',
    image16x9: '/guides/forex-prop-firm-comparison-16x9.jpg',
    image4x3: '/guides/forex-prop-firm-comparison-4x3.jpg',
    image1x1: '/guides/forex-prop-firm-comparison-1x1.jpg',
    alt: 'Forex program comparison with session clocks, execution routes and risk controls',
    caption: 'Forex offers are compared by execution environment, platform, news rules, drawdown and payout evidence.',
    width: 1536,
    height: 864,
  },
};

const guideThemeBySlug: Record<string, GuideVisualTheme> = {
  'meilleure-prop-firm-2026': 'ranking',
  'prop-firm-pas-cher': 'ranking',
  'prop-firm-pour-debutant': 'ranking',
  'meilleure-prop-firm-futures': 'futures',
  'topstep-vs-apex': 'futures',
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
