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
  reviewer: 'PropRadar manual review';
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
    reviewer: 'PropRadar manual review',
    coverage: 'Recherche prête',
    summary:
      'The manual collection queue is ready: specific Reddit and X posts still need to be opened, classified and linked before they strengthen the raw scores.',
    reddit: {
      coverage: 'Recherche prête',
      note:
        'Search ready for manual review: classify posts as positive, negative or neutral, then retain the usable public links.',
      sources: [
        {
          label: `Reddit search - ${firm.name} payout`,
          url: redditSearchUrl(`${firm.name} payout prop firm`),
          type: 'reddit-search',
        },
        {
          label: `Reddit search - ${firm.name} reviews`,
          url: redditSearchUrl(`${firm.name} review prop firm`),
          type: 'reddit-search',
        },
      ],
    },
    x: {
      coverage: 'Recherche prête',
      note:
        'Search ready for manual review: only public posts opened manually should count as positive, negative or neutral evidence.',
      sources: [
        {
          label: `X search - ${firm.name} payout`,
          url: xSearchUrl(`"${firm.name}" payout prop firm`),
          type: 'x-search',
        },
        {
          label: `X search - ${firm.name} review`,
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
