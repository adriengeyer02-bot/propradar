import data from '../data/program-promotions.json';

export type ProgramPromotion = {
  id: string;
  slug: string;
  productIds: string[];
  offer: string;
  code?: string;
  terms: string;
  sourceUrl: string;
  checkedOn: string;
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
