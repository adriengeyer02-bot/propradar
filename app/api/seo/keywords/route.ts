import { NextResponse } from 'next/server';
import {
  SEO_RESEARCH_DATE,
  getGuideLastModified,
  getSeoGuideDisplay,
  getSeoGuidePath,
  searchClusters,
  seoGuides,
  selectGuideFirms,
} from '../../../lib/seoGuides';

export function GET() {
  const guides = seoGuides.map((guide) => ({
    slug: guide.slug,
    title: getSeoGuideDisplay(guide).title,
    intent: guide.intent,
    primaryKeywords: getSeoGuideDisplay(guide).primaryKeywords,
    secondaryKeywords: getSeoGuideDisplay(guide).secondaryKeywords,
    firmCount: selectGuideFirms(guide, 20).length,
    lastModified: getGuideLastModified(guide).toISOString(),
    url: getSeoGuidePath(guide),
  }));

  return NextResponse.json(
    {
      updatedAt: SEO_RESEARCH_DATE,
      clusters: searchClusters,
      guides,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );
}
