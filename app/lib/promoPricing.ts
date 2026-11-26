/**
 * Sale price shown on a programme card (Geyer, 2026-11-26): the firm's published
 * before/after amount when it exists, otherwise the list price minus the
 * advertised percentage, flagged as computed. "Up to" percentages, ranges that
 * do not cover the size, and percentages that only describe a published pair
 * ("(−20%)") are never applied.
 */
export type PromoSale = { sale: number; pct: number; computed: boolean };
export type PublishedPair = { size: number; symbol: string; regular: number; sale: number };

const num = (text: string) => Number(text.replace(/,/g, ''));
const round2 = (value: number) => Math.round(value * 100) / 100;

/** "100K · €432 / €540" (sale / regular) and "100K $623 → $405" (regular → sale). */
export function publishedPairs(offer: string): PublishedPair[] {
  const pairs: PublishedPair[] = [];
  for (const m of offer.matchAll(/(\d+(?:\.\d+)?)K\s*·\s*([€$£])\s?([\d,.]+)\s*\/\s*[€$£]\s?([\d,.]+)/g)) {
    pairs.push({ size: Number(m[1]) * 1000, symbol: m[2], sale: num(m[3]), regular: num(m[4]) });
  }
  for (const m of offer.matchAll(/(\d+(?:\.\d+)?)K\s*([€$£])\s?([\d,.]+)\s*→\s*[€$£]\s?([\d,.]+)/g)) {
    pairs.push({ size: Number(m[1]) * 1000, symbol: m[2], regular: num(m[3]), sale: num(m[4]) });
  }
  return pairs;
}

export function promoSale(offer: string, size: number, listPrice: number): PromoSale | undefined {
  const pair = publishedPairs(offer).find((p) => p.size === size && p.regular === listPrice);
  if (pair) return { sale: pair.sale, pct: Math.round((1 - pair.sale / listPrice) * 100), computed: false };
  if (/up to|jusqu|bis zu|hasta|fino a|até/i.test(offer)) return undefined;
  let base: number | undefined;
  let forSize: number | undefined;
  for (const m of offer.matchAll(/[−-]\s?≈?\s?(\d{1,2}(?:\.\d+)?)\s?%(?:\s*\((\d+(?:\.\d+)?)K(?:\s*[–-]\s*(\d+(?:\.\d+)?)K)?\))?/g)) {
    if (offer.slice(0, m.index).trimEnd().endsWith('(')) continue; // "(−20%)" describes a published pair
    const pct = Number(m[1]);
    if (m[2]) {
      const low = Number(m[2]) * 1000;
      const high = m[3] ? Number(m[3]) * 1000 : low;
      if (size >= low && size <= high) forSize = pct;
      else if (base === undefined && m[3]) base = -1; // range offer: other sizes get nothing
    } else if (base === undefined) {
      base = pct;
    }
  }
  const pct = forSize ?? (base !== undefined && base > 0 ? base : undefined);
  if (!pct || pct >= 100) return undefined;
  return { sale: round2(listPrice * (1 - pct / 100)), pct, computed: true };
}
