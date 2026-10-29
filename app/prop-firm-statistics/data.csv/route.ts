import { getClosureRecord } from '../../lib/closures';
import { entityCountries } from '../../lib/jurisdictions';
import { isPayoutRiskAssessed, isProvisional, propFirms } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { SITE_URL } from '../../lib/site';

export const dynamic = 'force-static';

const STATUS: Record<string, string> = { Active: 'Active', 'À surveiller': 'Watchlist', Fermée: 'Closed' };

function cell(value: string | number | undefined) {
  if (value === undefined || value === '') return '';
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Public firm-level data behind /prop-firm-statistics. Values not read on a source are left empty. */
export function GET() {
  const header = [
    'firm', 'status', 'propradar_score', 'starting_fee_usd', 'profit_split_pct', 'entity_countries',
    'trustpilot_rating', 'trustpilot_rating_withheld', 'payout_risk', 'closure_date', 'closure_source',
    'last_reviewed', 'propradar_url',
  ];
  const rows = [...propFirms]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((firm) => {
      const closure = getClosureRecord(firm.slug);
      return [
        firm.name,
        STATUS[firm.status] ?? firm.status,
        firm.score,
        firm.priceFrom > 0 ? firm.priceFrom : undefined,
        !isProvisional(firm, 'profitSplit') && firm.profitSplit > 0 ? firm.profitSplit : undefined,
        [...new Set(entityCountries(firm.regulatoryAudit.entities).map((c) => c.name))].join('; '),
        firm.trustpilotRating,
        firm.reviewSignals.trustpilotRatingWithheld ? 'yes' : '',
        isPayoutRiskAssessed(firm) ? toEnglishText(firm.reviewSignals.payoutRisk) : 'Not assessed',
        firm.status === 'Fermée' ? closure?.date : undefined,
        firm.status === 'Fermée' ? closure?.source.url : undefined,
        firm.lastReviewed,
        `${SITE_URL}/firm/${firm.slug}`,
      ].map(cell).join(',');
    });
  const body = `${header.join(',')}\n${rows.join('\n')}\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="propradar-prop-firm-data.csv"',
    },
  });
}
