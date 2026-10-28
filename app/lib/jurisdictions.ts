/**
 * Country facts used to draw the entity chain and the jurisdiction board.
 *
 * Nothing here is a PropRadar opinion about a country. A jurisdiction only
 * carries a marker when an official list names it (FATF increased monitoring,
 * EU list of non-cooperative jurisdictions for tax purposes, Annex I or the
 * Annex II "state of play"), with the list date and its official URL. Regulator
 * links are only given where the official site was confirmed.
 */

export type OfficialListKey = 'fatfGrey' | 'euAnnexI' | 'euAnnexII';

export const OFFICIAL_LISTS: Record<OfficialListKey, { label: string; short: string; asOf: string; url: string; tone: 'risk' | 'watch' }> = {
  fatfGrey: {
    label: 'FATF list of jurisdictions under increased monitoring',
    short: 'FATF increased monitoring',
    asOf: '2026-06-19',
    url: 'https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-june-2026.html',
    tone: 'risk',
  },
  euAnnexI: {
    label: 'EU list of non-cooperative jurisdictions for tax purposes (Annex I)',
    short: 'EU tax list (Annex I)',
    asOf: '2026-10-09',
    url: 'https://www.consilium.europa.eu/en/press/press-releases/2026/10/09/taxation-council-updates-the-eu-list-of-non-cooperative-jurisdictions-for-tax-purposes/',
    tone: 'risk',
  },
  euAnnexII: {
    label: 'EU state of play on tax cooperation (Annex II: pending commitments)',
    short: 'EU tax watch (Annex II)',
    asOf: '2026-10-09',
    url: 'https://www.consilium.europa.eu/en/policies/eu-list-of-non-cooperative-jurisdictions/',
    tone: 'watch',
  },
};

export type Jurisdiction = {
  /** ISO 3166-1 alpha-2 code, also the flag file name. */
  code: string;
  name: string;
  match: RegExp;
  eu?: boolean;
  regulator?: { name: string; url?: string };
  lists?: OfficialListKey[];
};

// Order matters: specific names before broader ones.
export const JURISDICTIONS: Jurisdiction[] = [
  { code: 'LC', name: 'Saint Lucia', match: /saint lucia|st\.? lucia/i, regulator: { name: 'FSRA', url: 'https://pmd.govt.lc/statutory-body/financial-services-regulatory-authority-fsra-saint-lucia/' } },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', match: /saint vincent|st\.? vincent|grenadines/i, regulator: { name: 'SVG FSA' } },
  { code: 'AE', name: 'United Arab Emirates', match: /united arab emirates|\buae\b|dubai|ajman|abu dhabi|difc|ifza|dmcc|diez|dso/i, regulator: { name: 'SCA (federal) / DFSA (DIFC)', url: 'https://www.dfsa.ae/' } },
  { code: 'CY', name: 'Cyprus', match: /cyprus/i, eu: true, regulator: { name: 'CySEC', url: 'https://www.cysec.gov.cy/en-GB/investor-protection/warnings/' } },
  { code: 'PR', name: 'Puerto Rico', match: /puerto rico/i, regulator: { name: 'OCIF' } },
  { code: 'US', name: 'United States', match: /united states|\busa?\b|delaware|florida|texas|illinois|nevada|wyoming|montana|new mexico|new york|pennsylvania/i, regulator: { name: 'CFTC / NFA (futures), SEC', url: 'https://www.cftc.gov/' } },
  { code: 'GB', name: 'United Kingdom', match: /united kingdom|england|wales|scotland|\buk\b/i, regulator: { name: 'FCA', url: 'https://www.fca.org.uk/' } },
  { code: 'HK', name: 'Hong Kong', match: /hong kong/i, regulator: { name: 'SFC', url: 'https://www.sfc.hk/' } },
  { code: 'SC', name: 'Seychelles', match: /seychelles/i, regulator: { name: 'FSA Seychelles', url: 'https://fsaseychelles.sc/' } },
  { code: 'CZ', name: 'Czech Republic', match: /czech/i, eu: true, regulator: { name: 'Czech National Bank', url: 'https://www.cnb.cz/' } },
  { code: 'ZA', name: 'South Africa', match: /south africa/i, regulator: { name: 'FSCA', url: 'https://www.fsca.co.za/' } },
  { code: 'MT', name: 'Malta', match: /malta/i, eu: true, regulator: { name: 'MFSA', url: 'https://www.mfsa.mt/' } },
  { code: 'AU', name: 'Australia', match: /australia/i, regulator: { name: 'ASIC', url: 'https://asic.gov.au/' } },
  { code: 'IL', name: 'Israel', match: /israel/i, regulator: { name: 'Israel Securities Authority' } },
  { code: 'MU', name: 'Mauritius', match: /mauritius/i, regulator: { name: 'FSC Mauritius', url: 'https://www.fscmauritius.org/' } },
  { code: 'SK', name: 'Slovakia', match: /slovak/i, eu: true, regulator: { name: 'National Bank of Slovakia', url: 'https://nbs.sk/' } },
  { code: 'LI', name: 'Liechtenstein', match: /liechtenstein/i, regulator: { name: 'FMA Liechtenstein', url: 'https://www.fma-li.li/' } },
  { code: 'CH', name: 'Switzerland', match: /switzerland|swiss/i, regulator: { name: 'FINMA', url: 'https://www.finma.ch/' } },
  { code: 'KM', name: 'Comoros', match: /comoro|anjouan|moh[eé]li|mwali/i },
  { code: 'MY', name: 'Malaysia (Labuan)', match: /labuan|malaysia/i, regulator: { name: 'Labuan FSA' } },
  { code: 'IM', name: 'Isle of Man', match: /isle of man/i, regulator: { name: 'Isle of Man FSA' } },
  { code: 'HU', name: 'Hungary', match: /hungary/i, eu: true, regulator: { name: 'Magyar Nemzeti Bank', url: 'https://www.mnb.hu/' } },
  { code: 'PA', name: 'Panama', match: /panama/i, regulator: { name: 'SMV', url: 'https://supervalores.gob.pa/' }, lists: ['euAnnexII'] },
  { code: 'IE', name: 'Ireland', match: /ireland/i, eu: true, regulator: { name: 'Central Bank of Ireland', url: 'https://www.centralbank.ie/' } },
  { code: 'CA', name: 'Canada', match: /canada|british columbia|ontario/i, regulator: { name: 'Provincial securities commissions (CSA)' } },
  { code: 'NL', name: 'Netherlands', match: /netherlands|dutch/i, eu: true, regulator: { name: 'AFM', url: 'https://www.afm.nl/' } },
  { code: 'CR', name: 'Costa Rica', match: /costa rica/i, regulator: { name: 'SUGEVAL' } },
  { code: 'SG', name: 'Singapore', match: /singapore/i, regulator: { name: 'MAS', url: 'https://www.mas.gov.sg/' } },
  { code: 'IT', name: 'Italy', match: /\bital(y|ia)\b/i, eu: true, regulator: { name: 'CONSOB', url: 'https://www.consob.it/' } },
  { code: 'RO', name: 'Romania', match: /romania/i, eu: true, regulator: { name: 'ASF Romania' } },
  { code: 'KY', name: 'Cayman Islands', match: /cayman/i, regulator: { name: 'CIMA' } },
];

const UNKNOWN = /^(to verify|to reconstruct|contracting jurisdiction|unknown|international)/i;

export type ParsedPlace = {
  /** Countries named in the jurisdiction text, in order. Empty = not identified yet. */
  countries: Jurisdiction[];
  /** The original text, kept for state / free-zone detail. */
  raw: string;
  identified: boolean;
};

export function parseJurisdiction(raw: string | undefined): ParsedPlace {
  const text = (raw ?? '').trim();
  if (!text || UNKNOWN.test(text)) return { countries: [], raw: text || 'To verify', identified: false };
  const found: Jurisdiction[] = [];
  for (const part of text.split(/\s*[\/;]\s*/)) {
    if (UNKNOWN.test(part)) continue;
    // Puerto Rico must not also count as United States.
    const hit = JURISDICTIONS.find((j) => j.match.test(part));
    if (hit && !found.includes(hit)) found.push(hit);
  }
  return { countries: found, raw: text, identified: found.length > 0 };
}

/** Regional detail worth showing next to the country (state, emirate, free zone). */
const GENERIC_PART =
  /^(united states|united kingdom|united arab emirates|uae|european union|malaysia|union of (the )?comoros|comoros( islands| union)?|cayman( islands)?)$|to verify|to reconstruct|dispute context|relationship to verify/i;

export function placeDetail(place: ParsedPlace) {
  if (!place.identified) return '';
  return place.raw
    .split(/\s*[,/;]\s*/)
    .map((part) => part.trim())
    .filter((part) => part && !GENERIC_PART.test(part) && !place.countries.some((c) => c.name.toLowerCase() === part.toLowerCase()))
    .join(', ');
}

export function listMarkers(countries: Jurisdiction[]) {
  const keys = new Set<OfficialListKey>();
  countries.forEach((c) => c.lists?.forEach((key) => keys.add(key)));
  return [...keys].map((key) => ({ key, ...OFFICIAL_LISTS[key] }));
}
