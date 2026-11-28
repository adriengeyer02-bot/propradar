/**
 * Pure filtering, sorting and matching rules of the challenge explorer
 * (app/components/challenge/ChallengeExplorer.tsx), shared with
 * scripts/check-challenge-explorer.ts. Only documented values are used:
 * an unknown value never passes a filter, and affiliation is not read here.
 */
import type { ChallengeDrawdown, ChallengeMarket, ChallengeOffer, ChallengePrice } from './challengeCatalog';

export type Sort = 'reliability' | 'flex' | 'price' | 'capital';
export type Flex = '3' | '4' | 'rated';
export type Priority = 'drawdown' | 'noCons' | 'payout' | 'flex' | 'reliable';
export type Filters = {
  budget: number | null;
  capital: number | null;
  markets: ChallengeMarket[];
  steps: number[];
  drawdown: ChallengeDrawdown[];
  noCons: boolean;
  payout: 1 | 7 | 14 | null;
  flex: Flex | null;
};

export const EMPTY: Filters = { budget: null, capital: null, markets: [], steps: [], drawdown: [], noCons: false, payout: null, flex: null };
export const BUDGETS = [100, 200, 500, 1000];
export const CAPITALS = [10000, 25000, 50000, 100000, 200000];
export const MARKETS: ChallengeMarket[] = ['forex', 'futures', 'crypto', 'stocks'];
export const STEPS = [0, 1, 2, 3];
export const DRAWDOWNS: ChallengeDrawdown[] = ['Static', 'EOD', 'Trailing'];
export const PRIORITIES: Priority[] = ['drawdown', 'noCons', 'payout', 'flex', 'reliable'];
export const PAGE = 12;
export const SYMBOL = { USD: '$', EUR: '€', GBP: '£' } as const;

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

export function money(price: number, currency: ChallengePrice['currency']) {
  const digits = Number.isInteger(price) ? 0 : 2;
  return `${SYMBOL[currency]}${price.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

export function size(n: number) {
  return n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${+(n / 1000).toFixed(1)}K` : String(n);
}

/** Price shown for the chosen capital (exact verified row) or the cheapest verified row. */
export function shownPrice(offer: ChallengeOffer, capital: number | null): ChallengePrice | null {
  if (!offer.prices.length) return null;
  if (capital) return offer.prices.filter((row) => row.size === capital).sort((a, b) => a.price - b.price)[0] ?? null;
  return [...offer.prices].sort((a, b) => a.price - b.price)[0];
}

export function fitsCapital(offer: ChallengeOffer, capital: number) {
  if (offer.prices.length) return offer.prices.some((row) => row.size === capital);
  return offer.sizeMin !== null && offer.sizeMax !== null && offer.sizeMin <= capital && capital <= offer.sizeMax;
}

/** Budget is compared only with a verified price for the chosen size, or the listed fee when no size is chosen. */
export function fitsBudget(offer: ChallengeOffer, budget: number, capital: number | null) {
  const price = shownPrice(offer, capital);
  if (price) return price.price <= budget;
  if (!capital && offer.listedFrom !== null) return offer.listedFrom <= budget;
  return false;
}

export function matches(offer: ChallengeOffer, f: Filters) {
  if (f.capital && !fitsCapital(offer, f.capital)) return false;
  if (f.budget && !fitsBudget(offer, f.budget, f.capital)) return false;
  if (f.markets.length && !f.markets.some((m) => offer.markets.includes(m))) return false;
  if (f.steps.length && (offer.steps === null || !f.steps.includes(offer.steps))) return false;
  if (f.drawdown.length && (offer.drawdown === null || !f.drawdown.includes(offer.drawdown))) return false;
  if (f.noCons && offer.consistency) return false;
  if (f.payout && (offer.payoutDays === null || offer.payoutDays > f.payout)) return false;
  if (f.flex === 'rated' && offer.stars === null) return false;
  if ((f.flex === '3' || f.flex === '4') && (offer.stars === null || offer.stars < Number(f.flex))) return false;
  return true;
}

export function byReliability(a: ChallengeOffer, b: ChallengeOffer) {
  return b.reliability - a.reliability || (b.stars ?? -1) - (a.stars ?? -1) || a.firm.localeCompare(b.firm) || a.name.localeCompare(b.name);
}

export function sortOffers(list: ChallengeOffer[], sort: Sort, capital: number | null) {
  const out = [...list];
  if (sort === 'reliability') return out.sort(byReliability);
  if (sort === 'flex') return out.sort((a, b) => (b.stars ?? -1) - (a.stars ?? -1) || byReliability(a, b));
  if (sort === 'capital') return out.sort((a, b) => (b.sizeMax ?? -1) - (a.sizeMax ?? -1) || byReliability(a, b));
  // Verified prices first (ascending), then listed fees, then unknown prices.
  const rank = (o: ChallengeOffer) => {
    const p = shownPrice(o, capital);
    if (p) return [0, p.price] as const;
    if (!capital && o.listedFrom !== null) return [1, o.listedFrom] as const;
    return [2, 0] as const;
  };
  return out.sort((a, b) => {
    const [ga, va] = rank(a);
    const [gb, vb] = rank(b);
    return ga - gb || va - vb || byReliability(a, b);
  });
}

export function priority(offer: ChallengeOffer, p: Priority): boolean | null {
  switch (p) {
    case 'drawdown': return offer.drawdown === null ? null : offer.drawdown === 'Static' || offer.drawdown === 'EOD';
    case 'noCons': return !offer.consistency;
    case 'payout': return offer.payoutDays === null ? null : offer.payoutDays <= 14;
    case 'flex': return offer.stars === null ? null : offer.stars >= 3;
    case 'reliable': return offer.reliability >= 70;
  }
}

export function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

