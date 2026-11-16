/**
 * Residence-based program eligibility, NOT the firm's incorporation country.
 * A green status requires an explicit official worldwide-except policy (or
 * named country). An unreviewed firm/country is ALWAYS unknown, not eligible.
 * A firm may sell multiple products with different territorial rules.
 * Recheck the linked primary source before purchase, KYC or reward requests.
 */
export type EligibilityStatus = 'available' | 'restricted' | 'unknown';

export const ELIGIBILITY_COUNTRIES = [
  'US', 'FR', 'CN', 'IN', 'SG', 'GB', 'DE', 'CA', 'AU', 'JP',
  'BR', 'AE', 'ES', 'IT', 'PT', 'NL', 'CH', 'HK', 'KR', 'ID',
  'PK', 'MY', 'PH', 'VN', 'TH', 'TR', 'ZA', 'NG', 'MX', 'AR',
  'BE', 'PL', 'RO', 'UA', 'RU', 'NZ', 'BD', 'SA', 'IL', 'EG',
] as const;

type Rule = {
  /** Some program is explicitly offered to this country, subject to KYC. */
  available?: readonly string[];
  /** No program is offered to this country, per the cited policy. */
  restricted?: readonly string[];
  source: string;
  /** Product or regional limitations not captured by a single badge. */
  scope: string;
  checked: string;
};

const rules: Record<string, Rule> = {
  ftmo: {
    available: ['US', 'FR', 'CN', 'IN', 'SG', 'GB', 'DE', 'CA', 'JP', 'BR', 'ES', 'IT', 'PT', 'NL', 'CH', 'HK', 'KR', 'PH', 'TH', 'ZA', 'MX', 'AR', 'BE', 'PL', 'RO', 'NZ', 'BD', 'SA', 'IL', 'EG'],
    restricted: ['RU', 'ID'],
    source: 'https://ftmo.com/en/faq/who-can-join-ftmo/',
    scope: 'FTMO CFD Challenge: United States via FTMO US (OANDA); Futures access is separate and excludes mainland China. Jurisdiction, nationality and sanctions checks still apply.',
    checked: '2026-11-16',
  },
  topstep: {
    available: ['US', 'FR', 'IN', 'SG', 'GB', 'CA', 'AU', 'JP', 'BR', 'ES', 'IT', 'PT', 'NL', 'CH', 'KR', 'ID', 'MY', 'PH', 'TH', 'MX', 'AR', 'BE', 'PL', 'RO', 'NZ', 'BD', 'SA', 'IL', 'EG'],
    restricted: ['PK', 'TR', 'NG', 'UA', 'RU'],
    source: 'https://help.topstep.com/en/articles/8284116-am-i-eligible-to-trade-with-topstep',
    scope: 'Topstep eligibility depends on citizenship AND permanent residence; some countries are Express Funded Account only. China requires individual verification (specific restricted entities).',
    checked: '2026-11-16',
  },
  myfundedfutures: {
    available: ['US', 'IN', 'SG', 'GB', 'DE', 'CA', 'AU', 'JP', 'BR', 'ES', 'IT', 'PT', 'NL', 'CH', 'KR', 'TH', 'MX', 'AR', 'PL', 'NZ', 'BD', 'SA', 'IL', 'EG'],
    restricted: ['CN', 'HK', 'ID', 'PK', 'MY', 'PH', 'VN', 'TR', 'ZA', 'NG', 'RO', 'UA', 'RU', 'AE'],
    source: 'https://help.myfundedfutures.com/en/articles/8229993-restricted-countries-policy',
    scope: 'My Funded Futures: France is region-dependent (Corsica and non-mainland islands excluded), so France is unverified here rather than marked universally available.',
    checked: '2026-11-16',
  },
  'bullwaves-prime': {
    restricted: ['US', 'CN', 'BE'],
    source: 'https://prime.bullwaves.com/legal',
    scope: 'Bullwaves Prime lists other excluded jurisdictions and broad sanctions/local-law conditions; other countries remain unverified pending individual assessment.',
    checked: '2026-11-16',
  },
};

export function eligibilityFor(slug: string, country: string): {
  status: EligibilityStatus;
  source?: string;
  scope?: string;
  checked?: string;
} {
  const rule = rules[slug];
  if (!rule) return { status: 'unknown' };
  if (rule.restricted?.includes(country)) return { status: 'restricted', source: rule.source, scope: rule.scope, checked: rule.checked };
  if (rule.available?.includes(country)) return { status: 'available', source: rule.source, scope: rule.scope, checked: rule.checked };
  return { status: 'unknown', source: rule.source, scope: rule.scope, checked: rule.checked };
}
