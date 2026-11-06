/**
 * Small, data-free helpers for firm profiles. Kept apart from propFirms.ts so
 * client components (comparator rows, labels) can use them without shipping
 * the whole firm database to the browser.
 */
import type { PropFirm, ProvisionalField } from './propFirms';

export function isProvisional(firm: Pick<PropFirm, 'provisional'>, field: ProvisionalField) {
  return Boolean(firm.provisional?.includes(field));
}

export function profitSplitLabel(firm: Pick<PropFirm, 'profitSplit' | 'provisional'>) {
  if (isProvisional(firm, 'profitSplit')) return 'To verify';
  return firm.profitSplit > 0 ? `${firm.profitSplit}%` : 'N/A';
}

export function drawdownLabel(firm: Pick<PropFirm, 'drawdownType' | 'provisional'>, translate: (value: string) => string = (value) => value) {
  return isProvisional(firm, 'drawdownType') ? 'To verify' : translate(firm.drawdownType);
}

export function hasPayoutRiskSignal(firm: { reviewSignals: Pick<PropFirm['reviewSignals'], 'payoutRisk'> }) {
  const risk = firm.reviewSignals.payoutRisk;
  return risk === 'Moyen' || risk === 'Élevé' || risk === 'Critique';
}

export function priceLabel(firm: Pick<PropFirm, 'priceFrom' | 'noEntryFee'>) {
  if (firm.noEntryFee && !(firm.priceFrom > 0)) return 'No entry fee';
  return formatUsd(firm.priceFrom);
}

export function formatUsd(value: number) {
  if (value <= 0) return 'To verify';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Lower-case, accent-free, punctuation-free text used to match search queries. */
export function normalizeFirmSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
