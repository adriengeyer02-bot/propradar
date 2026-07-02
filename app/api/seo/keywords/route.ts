import { NextResponse } from 'next/server';
import {
  SEO_RESEARCH_DATE,
  getGuideLastModified,
  searchClusters,
  seoGuides,
  selectGuideFirms,
} from '../../../lib/seoGuides';

export function GET() {
  const guides = seoGuides.map((guide) => ({
    slug: guide.slug,
    title: guide.title,
    intent: guide.intent,
    primaryKeywords: guide.primaryKeywords,
    secondaryKeywords: guide.secondaryKeywords,
    firmCount: selectGuideFirms(guide, 20).length,
    lastModified: getGuideLastModified(guide).toISOString(),
    url: `/guides/${guide.slug}`,
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
