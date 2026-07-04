import type { PropFirm } from './propFirms';

export type ManualReviewCoverage = 'Non démarrée' | 'Recherche prête' | 'Revue partielle' | 'Revue solide';

export type ManualReviewSource = {
  label: string;
  url: string;
  type: 'reddit-search' | 'x-search' | 'reddit-post' | 'x-post' | 'article' | 'other';
};

export type ManualReviewChannel = {
  coverage: ManualReviewCoverage;
  positive?: number;
  negative?: number;
  neutral?: number;
  sampleSize?: number;
  note: string;
  sources: ManualReviewSource[];
};

export type ManualCommunityReview = {
  slug: string;
  updatedAt: string;
  reviewer: 'PropRadar manuel';
  coverage: ManualReviewCoverage;
  summary: string;
  reddit: ManualReviewChannel;
  x: ManualReviewChannel;
};

const REVIEW_DATE = '2026-07-04';

const manualCommunityReviews: Record<string, ManualCommunityReview> = {};

export function getManualCommunityReview(firm: PropFirm): ManualCommunityReview {
  return manualCommunityReviews[firm.slug] ?? createResearchReadyReview(firm);
}

export function manualCoverageClass(coverage: ManualReviewCoverage) {
  if (coverage === 'Revue solide') return 'badge-green';
  if (coverage === 'Revue partielle') return 'badge-blue';
  if (coverage === 'Recherche prête') return 'badge-amber';
  return 'badge-neutral';
}

function createResearchReadyReview(firm: PropFirm): ManualCommunityReview {
  return {
    slug: firm.slug,
    updatedAt: REVIEW_DATE,
    reviewer: 'PropRadar manuel',
    coverage: 'Recherche prête',
    summary:
      'La collecte manuelle est préparée, mais les posts Reddit/X précis doivent encore être ouverts, classés et reliés à la fiche avant de remplacer les scores estimés.',
    reddit: {
      coverage: 'Recherche prête',
      note:
        'Requête prête pour revue manuelle : classer les posts en positif, négatif et neutre, puis conserver les liens exploitables.',
      sources: [
        {
          label: `Recherche Reddit - ${firm.name} payout`,
          url: redditSearchUrl(`${firm.name} payout prop firm`),
          type: 'reddit-search',
        },
        {
          label: `Recherche Reddit - ${firm.name} avis`,
          url: redditSearchUrl(`${firm.name} review prop firm`),
          type: 'reddit-search',
        },
      ],
    },
    x: {
      coverage: 'Recherche prête',
      note:
        "Requête prête pour revue manuelle : X reste difficile à auditer sans crédits/API, donc seuls les posts publics ouverts manuellement doivent être comptés.",
      sources: [
        {
          label: `Recherche X - ${firm.name} payout`,
          url: xSearchUrl(`"${firm.name}" payout prop firm`),
          type: 'x-search',
        },
        {
          label: `Recherche X - ${firm.name} review`,
          url: xSearchUrl(`"${firm.name}" review prop firm`),
          type: 'x-search',
        },
      ],
    },
  };
}

function redditSearchUrl(query: string) {
  return `https://www.reddit.com/search/?q=${encodeURIComponent(query)}&type=link&sort=new`;
}

function xSearchUrl(query: string) {
  return `https://x.com/search?q=${encodeURIComponent(query)}&src=typed_query&f=live`;
}
