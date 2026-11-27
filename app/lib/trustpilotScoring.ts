/** Owner-approved Trustpilot grid (26 Nov 2026). No deduction for missing data.
 * A documented active withholding notice takes precedence; never stack.
 * Historical V4/V5 approvals remain historical; use this for public scores.
 */
export const TRUSTPILOT_NOTICE_PENALTY = 10;
export const HISTORICAL_INCLUDED_NOTICE_PENALTY = 6;

export function trustpilotPoints(rating: number | undefined, count: number | undefined, withheld: boolean): number {
  if (withheld) return TRUSTPILOT_NOTICE_PENALTY;
  if (rating === undefined || !Number.isFinite(rating) || rating < 1 || rating > 5 ||
      count === undefined || !Number.isFinite(count) || count < 30) return 0;
  const full = rating >= 4 ? 0 : rating >= 3.5 ? 3 : rating >= 3 ? 6 : 10;
  return count < 100 ? Math.ceil(full / 2) : full;
}
