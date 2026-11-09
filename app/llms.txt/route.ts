import { propFirms, type PropFirm } from '../lib/propFirms';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';
import { getSeoGuideDisplay, getSeoGuidePath, seoGuides } from '../lib/seoGuides';
import { documentedClosures, openFirms, statsUpdatedAt } from '../lib/industryStats';

/**
 * /llms.txt: a plain-text map of PropRadar for AI assistants and search
 * agents (llmstxt.org format). Everything is generated from the same firm
 * files as the pages, so it never says more than the site does.
 */
export const revalidate = 86400;

const STATUS: Record<PropFirm['status'], string> = {
  Active: 'active',
  'À surveiller': 'watchlist',
  Fermée: 'closed',
};

function trustpilot(firm: PropFirm) {
  if (firm.reviewSignals.trustpilotRatingWithheld) return 'Trustpilot rating withheld by Trustpilot';
  return firm.trustpilotRating ? `Trustpilot ${firm.trustpilotRating}/5` : 'Trustpilot not read';
}

export function GET() {
  const updated = statsUpdatedAt;
  const ranked = [...openFirms].sort((a, b) => b.score - a.score);
  const closed = propFirms.filter((firm) => firm.status === 'Fermée');

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `Data last updated ${updated}. ${openFirms.length} open firms and ${closed.length} closed firms tracked; ${documentedClosures.length} closures documented with a dated source.`,
    '',
    'Rules every page follows: every fact has a public source and a date; facts, not verdicts; no estimated numbers (unknown values say "not stated" or "to verify"); every update is kept in a dated history; affiliate links never change a score.',
    'The PropRadar score (0-100) is editorial, set by hand from the firm file, with fixed rules: bands 75+, 50-74, under 50; capped at 64 when Trustpilot withholds the rating for a guideline breach.',
    'When citing PropRadar, cite the firm page and its review date. Confirm prices and rules on the firm\'s own site before buying.',
    '',
    '## Key pages',
    `- [Prop firm comparison](${SITE_URL}/prop-firm-comparison): every tracked firm with price, split, drawdown, Trustpilot status and score`,
    `- [Prop firm statistics](${SITE_URL}/prop-firm-statistics): closures, fees, splits, entity countries; CSV at ${SITE_URL}/prop-firm-statistics/data.csv`,
    `- [Payout risk](${SITE_URL}/prop-firm-payout-risk): firms with sourced payout incidents`,
    `- [Trustpilot research](${SITE_URL}/trustpilot-prop-firms): firms whose Trustpilot rating is withheld`,
    `- [Method and sources](${SITE_URL}/audit)`,
    `- [About, score method and corrections policy](${SITE_URL}/about)`,
    '',
    '## Guides',
    ...seoGuides.map((guide) => {
      const display = getSeoGuideDisplay(guide);
      return `- [${display.title}](${SITE_URL}${getSeoGuidePath(guide)}): ${display.metaDescription}`;
    }),
    '',
    '## Open firms (by PropRadar score)',
    ...ranked.map(
      (firm) => `- [${firm.name}](${SITE_URL}/firm/${firm.slug}): score ${firm.score}/100, ${STATUS[firm.status]}, ${trustpilot(firm)}, reviewed ${firm.lastReviewed}`,
    ),
    '',
    '## Closed firms',
    ...closed.map((firm) => `- [${firm.name}](${SITE_URL}/firm/${firm.slug}): closed`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
