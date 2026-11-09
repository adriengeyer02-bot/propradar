import data from '../data/price-tables.json';

/**
 * List prices by account size, read on each firm's own pricing page. Only
 * rows that were read are stored: no size is filled in, no currency is
 * converted, and temporary code discounts are never applied. Firms without a
 * table keep their "from" price only.
 */
export type PriceRow = { size: number; price: number };
export type PriceProgram = {
  name: string;
  billing: 'one-time' | 'monthly';
  currency: 'USD' | 'EUR' | 'GBP';
  sourceUrl: string;
  note?: string;
  rows: PriceRow[];
};
export type FirmPriceTable = { checkedOn: string; programs: PriceProgram[] };

const tables = (data as { version: number; firms: Record<string, FirmPriceTable> }).firms;

export function getPriceTable(slug: string): FirmPriceTable | undefined {
  return tables[slug];
}

export function priceTableSlugs() {
  return Object.keys(tables);
}

const SYMBOL: Record<PriceProgram['currency'], string> = { USD: '$', EUR: '€', GBP: '£' };

/** "$1,099.99" — en-US grouping in every language, as on the firms' own pages. */
export function formatListPrice(price: number, currency: PriceProgram['currency']) {
  const digits = Number.isInteger(price) ? 0 : 2;
  return `${SYMBOL[currency]}${price.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

/** "100K" */
export function formatAccountSize(size: number) {
  return size >= 1000 ? `${size / 1000}K` : String(size);
}
