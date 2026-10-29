import { closureRecords } from './closures';
import { entityCountries, type Jurisdiction } from './jurisdictions';
import {
  hasPayoutRiskSignal,
  hasReviewEvidence,
  isProvisional,
  propFirms,
  type Product,
  type PropFirm,
} from './propFirms';

/**
 * Industry figures computed from PropRadar's own firm files. Every figure says
 * what it is computed on (the base), so nothing reads as a market-wide census.
 * Provisional watchlist defaults are always excluded.
 */

export const openFirms = propFirms.filter((firm) => firm.status !== 'Fermée');
export const closedFirms = propFirms.filter((firm) => firm.status === 'Fermée');

export const statsUpdatedAt = propFirms.reduce((latest, firm) => {
  const date = firm.regulatoryAudit.lastChecked > firm.lastReviewed ? firm.regulatoryAudit.lastChecked : firm.lastReviewed;
  return date > latest ? date : latest;
}, '2026-01-01');

function quantile(sorted: number[], q: number) {
  if (!sorted.length) return 0;
  const index = Math.min(sorted.length - 1, Math.max(0, Math.round((sorted.length - 1) * q)));
  return sorted[index];
}

/* Closures */
export const documentedClosures = closureRecords
  .map((record) => ({ record, firm: propFirms.find((firm) => firm.slug === record.slug) }))
  .filter((row): row is { record: (typeof closureRecords)[number]; firm: PropFirm } => Boolean(row.firm && row.firm.status === 'Fermée'))
  .sort((a, b) => (b.record.date ?? '0000').localeCompare(a.record.date ?? '0000'));
export const undocumentedClosedCount = closedFirms.length - documentedClosures.length;
export const closuresByYear = documentedClosures.reduce<Record<string, number>>((acc, { record }) => {
  const year = record.date?.slice(0, 4) ?? 'Date not stated';
  acc[year] = (acc[year] ?? 0) + 1;
  return acc;
}, {});

/* Jurisdictions */
export const firmsWithCountry = openFirms.filter((firm) => entityCountries(firm.regulatoryAudit.entities).length > 0);
export const countryCounts = (() => {
  const map = new Map<string, { country: Jurisdiction; firms: number }>();
  for (const firm of firmsWithCountry) {
    for (const country of new Map(entityCountries(firm.regulatoryAudit.entities).map((c) => [c.code, c])).values()) {
      const row = map.get(country.code) ?? { country, firms: 0 };
      row.firms += 1;
      map.set(country.code, row);
    }
  }
  return [...map.values()].sort((a, b) => b.firms - a.firms || a.country.name.localeCompare(b.country.name));
})();
export const multiCountryFirms = firmsWithCountry.filter((firm) => new Set(entityCountries(firm.regulatoryAudit.entities).map((c) => c.code)).size > 1).length;
export const euEntityFirms = firmsWithCountry.filter((firm) => entityCountries(firm.regulatoryAudit.entities).some((c) => c.eu)).length;

/* Challenge fees (sourced firm files only, smallest account before discounts) */
type FeeRow = { firm: PropFirm; product: Product; fee: number };
export const feeRows: FeeRow[] = openFirms
  .filter((firm) => !isProvisional(firm, 'profitSplit') && !isProvisional(firm, 'accountSize'))
  .flatMap((firm) => firm.products.map((product) => ({ firm, product, fee: product.entryFeeMin ?? 0 })))
  .filter((row) => row.fee > 0 && row.product.type !== 'Scaling');
export function feeStats(type?: Product['type']) {
  const fees = feeRows.filter((row) => !type || row.product.type === type).map((row) => row.fee).sort((a, b) => a - b);
  return { count: fees.length, min: fees[0] ?? 0, q1: quantile(fees, 0.25), median: quantile(fees, 0.5), q3: quantile(fees, 0.75), max: fees[fees.length - 1] ?? 0 };
}
export const feeBuckets = (() => {
  const edges = [0, 25, 50, 100, 150, 250, Infinity];
  const labels = ['Under $25', '$25–49', '$50–99', '$100–149', '$150–249', '$250+'];
  return labels.map((label, index) => ({
    label,
    count: feeRows.filter((row) => row.fee >= edges[index] && row.fee < edges[index + 1]).length,
  }));
})();

/* Profit split (headline split read on a source) */
export const splitFirms = openFirms.filter((firm) => !isProvisional(firm, 'profitSplit') && firm.profitSplit > 0);
export const splitBuckets = [...new Set(splitFirms.map((firm) => firm.profitSplit))]
  .sort((a, b) => a - b)
  .map((split) => ({ label: `${split}%`, count: splitFirms.filter((firm) => firm.profitSplit === split).length }));

/* Trustpilot */
export const ratedFirms = openFirms.filter((firm) => firm.trustpilotRating);
const ratings = ratedFirms.map((firm) => firm.trustpilotRating as number).sort((a, b) => a - b);
export const trustpilotStats = {
  rated: ratings.length,
  median: quantile(ratings, 0.5),
  atLeast45: ratings.filter((r) => r >= 4.5).length,
  from40to44: ratings.filter((r) => r >= 4 && r < 4.5).length,
  below40: ratings.filter((r) => r < 4).length,
  withheld: openFirms.filter((firm) => firm.reviewSignals.trustpilotRatingWithheld).length,
  reviewEvidence: openFirms.filter(hasReviewEvidence).length,
};
export const withheldFirms = openFirms
  .filter((firm) => firm.reviewSignals.trustpilotRatingWithheld)
  .sort((a, b) => a.name.localeCompare(b.name));

/* Payout evidence */
export const payoutStats = {
  sourcedSignal: openFirms.filter(hasPayoutRiskSignal).length,
  notAssessed: openFirms.filter((firm) => firm.reviewSignals.payoutRisk === 'Non évalué').length,
  lowWithProof: openFirms.filter((firm) => firm.reviewSignals.payoutRisk === 'Faible').length,
};

/* Coverage: how much of the database is verified */
export const coverage = {
  splitRead: splitFirms.length,
  countryIdentified: firmsWithCountry.length,
  trustpilotChecked: ratedFirms.length + trustpilotStats.withheld,
  open: openFirms.length,
};
