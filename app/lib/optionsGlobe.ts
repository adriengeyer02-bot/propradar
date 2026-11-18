import { optionsFirms } from './optionsFirms';
import { optionsAuditFor } from './optionsAudits';
import type { RadarData, RadarDot, RadarSector } from './radar';

/**
 * Globe-only options research zone. Ratings come from dated initial audits,
 * but the normal scored radar and its averages remain unchanged.
 */
export function withOptionsGlobe(data: RadarData): Pick<RadarData, 'dots' | 'sectors'> {
  const optionSector: RadarSector = { key: 'Options', start: 0, end: 360, count: optionsFirms.length, average: 0, top: [] };
  const dots: RadarDot[] = optionsFirms.map((firm, index) => {
    const audit = optionsAuditFor(firm.slug)!;
    return {
      slug: `options:${firm.slug}`,
      name: firm.name,
      score: audit.score,
      logo: audit.logo,
      href: `/options-prop-firms/${firm.slug}`,
      status: 'Watchlist', sector: 'Options', tone: audit.score >= 75 ? 'good' : audit.score >= 50 ? 'watch' : 'none',
      angle: ((index + 0.5) / optionsFirms.length) * 360,
      radius: 0, x: 0, y: 0, size: 5.5,
      reviewed: audit.reviewedAt,
      trustpilot: audit.trustpilot?.withheld ? 'Rating withheld' : audit.trustpilot?.rating != null ? `${audit.trustpilot.rating}/5 · ${audit.trustpilot.count} reviews` : 'Not checked',
      withheld: Boolean(audit.trustpilot?.withheld),
      price: 'To verify', split: 'To verify', drawdown: 'To verify', payout: 'Not assessed', legal: 'To audit',
      jurisdictions: [],
    };
  });
  return { dots: [...data.dots, ...dots], sectors: [...data.sectors, optionSector] };
}
