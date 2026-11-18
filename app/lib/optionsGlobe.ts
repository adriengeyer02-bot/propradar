import { optionsFirms } from './optionsFirms';
import type { RadarData, RadarDot, RadarSector } from './radar';

/**
 * Globe-only, neutral research zone. The normal scored radar and its averages
 * remain unchanged; the artificial latitude has no rating interpretation.
 */
export function withOptionsGlobe(data: RadarData): Pick<RadarData, 'dots' | 'sectors'> {
  const optionSector: RadarSector = { key: 'Options', start: 0, end: 360, count: optionsFirms.length, average: 0, top: [] };
  const dots: RadarDot[] = optionsFirms.map((firm, index) => ({
    slug: `options:${firm.slug}`,
    name: firm.name,
    score: 50, // visual placement only; never an editorial rating
    unrated: true,
    href: `/options-prop-firms/${firm.slug}`,
    status: 'Watchlist', sector: 'Options', tone: 'none',
    angle: ((index + 0.5) / optionsFirms.length) * 360,
    radius: 0, x: 0, y: 0, size: 5.5,
    reviewed: firm.checkedAt, trustpilot: 'Not checked', withheld: false,
    price: 'To verify', split: 'To verify', drawdown: 'To verify', payout: 'Not assessed', legal: 'To audit',
    jurisdictions: [],
  }));
  return { dots: [...data.dots, ...dots], sectors: [...data.sectors, optionSector] };
}
