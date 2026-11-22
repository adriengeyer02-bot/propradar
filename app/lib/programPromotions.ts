import data from '../data/program-promotions.json';

export type ProgramPromotion = {
  id: string;
  slug: string;
  productIds: string[];
  offer: string;
  code?: string;
  /** Account sizes whose published list price should be visible beside this offer. */
  highlightedSizes?: number[];
  terms: string;
  sourceUrl: string;
  checkedOn: string;
  /** Officially sourced list and discounted prices for an exact product, size and region. */
  priceExamples?: Array<{ product: string; accountSize: number; currency: 'USD' | 'EUR' | 'GBP'; before: number; after: number; region?: 'US' | 'outside-US' }>;
  priceSourceUrl?: string;
  endsOn?: string;
  expiresAt?: string;
};

export const programPromotions = (data as { version: number; promotions: ProgramPromotion[] }).promotions;

const UNDATED_OFFER_MAX_AGE_DAYS = 14;

/** Never serve expired or long-unchecked undated promotions as current deals. */
export function isProgramPromotionCurrent(promo: ProgramPromotion, today = new Date()): boolean {
  const date = today.getTime();
  if (promo.expiresAt) return date < Date.parse(promo.expiresAt);
  const checked = Date.parse(`${promo.checkedOn}T23:59:59Z`);
  return date >= checked - 24 * 60 * 60 * 1000 && date - checked < UNDATED_OFFER_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
}

export function getProgramPromotions(slug: string, productId: string, today = new Date()) {
  return programPromotions.filter((promo) => promo.slug === slug && promo.productIds.includes(productId) && isProgramPromotionCurrent(promo, today));
}

/** Price comparison is only displayed for a sourced, exact product/size match. */
export function getVerifiedPromoPrices(slug: string, productId: string, today = new Date()) {
  return getProgramPromotions(slug, productId, today).flatMap((promo) =>
    (promo.priceExamples ?? []).map((price) => ({
      ...price,
      saved: Math.round((price.before - price.after) * 100) / 100,
      discountPercent: Math.round((1 - price.after / price.before) * 100),
      code: promo.code,
      sourceUrl: promo.priceSourceUrl ?? promo.sourceUrl,
      checkedOn: promo.checkedOn,
      expiresAt: promo.expiresAt,
    })).filter((price) => price.before > price.after && price.after >= 0)
  );
}
