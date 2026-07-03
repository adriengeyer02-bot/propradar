import { NextRequest, NextResponse } from 'next/server';
import { PROMO_REVIEW_DATE, getBestPromoDeals } from '../../../lib/promoResearch';

function parseLimit(value: string | null, fallback = 10) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(Math.floor(parsed), 50);
}

export function GET(request: NextRequest) {
  const limit = parseLimit(request.nextUrl.searchParams.get('limit'));
  const offers = getBestPromoDeals(limit);

  return NextResponse.json(
    {
      updatedAt: PROMO_REVIEW_DATE,
      count: offers.length,
      offers,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    },
  );
}
