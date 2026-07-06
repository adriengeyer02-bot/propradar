import { NextRequest, NextResponse } from 'next/server';
import {
  PROMO_REVIEW_DATE,
  promoDealWithFirm,
  promoDeals,
} from '../../lib/promoResearch';

function parseLimit(value: string | null, fallback = 20) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(Math.floor(parsed), 50);
}

function normalize(value: string | null) {
  return value?.trim().toLowerCase() ?? '';
}

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const category = normalize(params.get('category'));
  const proof = normalize(params.get('proof'));
  const style = normalize(params.get('style'));
  const query = normalize(params.get('q'));
  const bestOnly = ['1', 'true', 'yes'].includes(normalize(params.get('best')));
  const featuredOnly = ['1', 'true', 'yes', 'mega'].includes(normalize(params.get('featured') ?? params.get('mega')));
  const limit = parseLimit(params.get('limit'));

  let offers = promoDeals.map((deal) => promoDealWithFirm(deal));

  if (featuredOnly) {
    offers = offers.filter((deal) => deal.featured);
  }

  if (category) {
    offers = offers.filter((deal) => deal.category.toLowerCase() === category);
  }

  if (proof) {
    offers = offers.filter((deal) => deal.proofLevel.toLowerCase().includes(proof));
  }

  if (style) {
    offers = offers.filter((deal) => deal.bestFor.some((tag) => tag.toLowerCase().includes(style)));
  }

  if (query) {
    offers = offers.filter((deal) => {
      const haystack = [
        deal.slug,
        deal.title,
        deal.code,
        deal.value,
        deal.sourceLabel,
        deal.firm?.name,
      ].join(' ').toLowerCase();

      return haystack.includes(query);
    });
  }

  if (bestOnly) {
    offers = offers.sort((a, b) => b.dealScore - a.dealScore);
  }

  offers = offers.slice(0, limit);

  return NextResponse.json(
    {
      updatedAt: PROMO_REVIEW_DATE,
      count: offers.length,
      filters: {
        best: bestOnly,
        featured: featuredOnly,
        category: category || null,
        proof: proof || null,
        style: style || null,
        q: query || null,
        limit,
      },
      offers,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    },
  );
}
