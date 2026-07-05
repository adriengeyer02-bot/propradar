import { NextRequest, NextResponse } from 'next/server';
import { getFirmBySlug } from '../../../../lib/propFirms';
import { PROMO_REVIEW_DATE, promoDealWithFirm, promoDeals } from '../../../../lib/promoResearch';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const firm = getFirmBySlug(slug);

  if (!firm) {
    return NextResponse.json(
      {
        updatedAt: PROMO_REVIEW_DATE,
        error: 'Firm not found',
        slug,
      },
      { status: 404 },
    );
  }

  const offers = promoDeals
    .filter((deal) => deal.slug === firm.slug)
    .map((deal) => promoDealWithFirm(deal))
    .sort((a, b) => b.dealScore - a.dealScore);

  return NextResponse.json(
    {
      updatedAt: PROMO_REVIEW_DATE,
      firm: {
        slug: firm.slug,
        name: firm.name,
        score: firm.score,
        status: firm.status,
        priceFrom: firm.priceFrom,
        payoutRisk: firm.reviewSignals.payoutRisk,
      },
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
