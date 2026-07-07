import { NextRequest, NextResponse } from 'next/server';
import { fetchRedditSignals, fetchXSignals, parseSignalLimit } from '../../../../lib/communityApis';
import { getFirmBySlug } from '../../../../lib/propFirms';

export const runtime = 'nodejs';
export const revalidate = 900;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const firm = getFirmBySlug(slug);

  if (!firm) {
    return NextResponse.json({ error: 'Firm introuvable' }, { status: 404 });
  }

  const limit = parseSignalLimit(request.nextUrl.searchParams.get('limit'));
  const [reddit, x] = await Promise.all([
    fetchRedditSignals(firm, limit),
    fetchXSignals(firm, limit),
  ]);

  return NextResponse.json(
    {
      firm: {
        slug: firm.slug,
        name: firm.name,
        score: firm.score,
      },
      updatedAt: new Date().toISOString(),
      limit,
      signals: {
        reddit,
        x,
      },
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    },
  );
}
