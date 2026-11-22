/** Shared, score-neutral display decision used by every prop-firm score modal.
 * Included V4 losses are NOT a second deduction. No evidence is NOT zero. */
export type RuleAmountState =
  | { kind: 'included'; points: number }
  | { kind: 'applied'; points: number }
  | { kind: 'pending'; points: null };

export function ruleAmountDisplay(
  includedLoss: number | null,
  audited: boolean,
  appliedPenalty: number,
): RuleAmountState {
  if (includedLoss !== null) {
    if (!Number.isFinite(includedLoss) || includedLoss < 0) throw Error('Invalid V4 included loss');
    return { kind: 'included', points: includedLoss };
  }
  if (!audited) return { kind: 'pending', points: null };
  if (!Number.isFinite(appliedPenalty) || appliedPenalty < 0) throw Error('Invalid rule deduction');
  return { kind: 'applied', points: appliedPenalty };
}
