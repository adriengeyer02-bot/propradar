import { NextRequest, NextResponse } from 'next/server';
import { fetchRedditSignals, parseSignalLimit } from '../../../lib/communityApis';
import { getFirmBySlug, propFirms } from '../../../lib/propFirms';

export const runtime = 'nodejs';
export const revalidate = 900;

export async function GET(request: NextRequest) {
  const firm = resolveFirm(request.nextUrl.searchParams.get('slug') ?? request.nextUrl.searchParams.get('firm'));

  if (!firm) {
    return NextResponse.json(
      {
        error: 'Ajoute ?slug=ftmo ou ?firm=FTMO pour interroger le signal Reddit.',
      },
      { status: 400 },
    );
  }

  const limit = parseSignalLimit(request.nextUrl.searchParams.get('limit'));
  const reddit = await fetchRedditSignals(firm, limit);

  return NextResponse.json(
    {
      firm: {
        slug: firm.slug,
        name: firm.name,
        score: firm.score,
      },
      signal: reddit,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    },
  );
}

function resolveFirm(value: string | null) {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return null;

  return (
    getFirmBySlug(normalized) ??
    propFirms.find((firm) => firm.name.toLowerCase() === normalized) ??
    propFirms.find((firm) => firm.name.toLowerCase().includes(normalized))
  );
}
