/**
 * PropRadar V5 (owner decision, 2026-11-20).
 * No V4 or legacy score is silently converted into a V5 scorecard.
 * A published V5 audit must supply all 13 sourced assessments.
 *
 * B2 is the ONLY source of the separate "rules" display deduction:
 * gross editorial score includes B2's full 10-point budget, followed by
 * the evidence-backed deduction (10 - B2). This is a presentation split,
 * not an additional penalty on top of the audited score.
 */
export const V5_CRITERIA = {
  A1: 10, A2: 10, A3: 5,
  B1: 15, B2: 10,
  C1: 10, C2: 6, C3: 4,
  D1: 8, D2: 6, D3: 6,
  E1: 6, E2: 4,
} as const;

export const V5_BLOCKS = {
  A: ['A1', 'A2', 'A3'],
  B: ['B1', 'B2'],
  C: ['C1', 'C2', 'C3'],
  D: ['D1', 'D2', 'D3'],
  E: ['E1', 'E2'],
} as const;

export const V5_MAXIMA = { A: 25, B: 25, C: 20, D: 20, E: 10 } as const;
export type V5Criterion = keyof typeof V5_CRITERIA;
export type V5Block = keyof typeof V5_BLOCKS;
export type V5Confidence = 'elevee' | 'moyenne' | 'faible';
export type V5Assessment = {
  points: number;
  reason: string;
  sources: string[];
  /** Negative evidence may be charged to only one criterion. */
  negativeFactIds?: string[];
};

export type V5Scorecard = {
  slug: string;
  checkedOn: string;
  status: 'proposition' | 'approuvee';
  confidence: V5Confidence;
  previousDisplayedScore: number;
  criteria: Record<V5Criterion, V5Assessment>;
  trustpilotActiveNotice: boolean;
  /** True only after verifying a missing contracting entity, not a missing registry link. */
  contractingEntityMissing: boolean;
  /** True only for an ongoing, not-suspended strike-off against the contracting entity. */
  activeUnsuspendedStrikeOff: boolean;
  /** Closed records are kept as historical files, never ranked as active firms. */
  closed: boolean;
};

export type V5ScoreResult = {
  blocks: Record<V5Block, number>;
  /** Base before the B2 rules deduction, Trustpilot, and safety cap. */
  editorialGross: number;
  rulesPenalty: number;
  afterRules: number;
  trustpilotPenalty: 0 | 6;
  adjusted: number;
  safetyCap: 55 | null;
  final: number | null;
  confidence: V5Confidence;
  independentPayoutProofLimited: boolean;
};

const ALLOWED: Partial<Record<V5Criterion, readonly number[]>> = {
  A2: [0, 2, 4, 6, 8, 9, 10],
  B1: [0, 2, 5, 8, 11, 13, 15],
  C1: [0, 4, 7, 10],
  C2: [0, 2, 3, 4, 6],
  C3: [0, 2, 4],
  E1: [0, 1, 2, 4, 6],
};

export function computeV5Scorecard(card: V5Scorecard): V5ScoreResult {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(card.slug)) throw Error('V5: invalid firm slug');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(card.checkedOn) || !Number.isFinite(Date.parse(card.checkedOn))) throw Error(`${card.slug}: invalid audit date`);
  if (card.status !== 'proposition' && card.status !== 'approuvee') throw Error(`${card.slug}: invalid approval status`);
  if (!['elevee', 'moyenne', 'faible'].includes(card.confidence)) throw Error(`${card.slug}: invalid confidence`);
  if (!Number.isInteger(card.previousDisplayedScore) || card.previousDisplayedScore < 0 || card.previousDisplayedScore > 100) throw Error(`${card.slug}: invalid previous score`);
  const expected = Object.keys(V5_CRITERIA) as V5Criterion[];
  if (Object.keys(card.criteria).length !== expected.length || expected.some((id) => !card.criteria[id])) throw Error(`${card.slug}: exactly 13 criteria required`);

  const negativeFacts = new Set<string>();
  for (const id of expected) {
    const item = card.criteria[id];
    const allowed = ALLOWED[id];
    if (!Number.isInteger(item.points) || item.points < 0 || item.points > V5_CRITERIA[id] || (allowed && !allowed.includes(item.points))) {
      throw Error(`${card.slug}/${id}: invalid points ${item.points}`);
    }
    if (!item.reason?.trim() || !Array.isArray(item.sources) || !item.sources.length || item.sources.some((url) => !/^https:\/\/\S+/.test(url))) {
      throw Error(`${card.slug}/${id}: source and reason required`);
    }
    for (const fact of item.negativeFactIds ?? []) {
      if (!fact.trim() || negativeFacts.has(fact)) throw Error(`${card.slug}: double-counted fact ${fact}`);
      negativeFacts.add(fact);
    }
  }

  const blocks = {} as Record<V5Block, number>;
  for (const name of Object.keys(V5_BLOCKS) as V5Block[]) {
    blocks[name] = V5_BLOCKS[name].reduce((sum, id) => sum + card.criteria[id].points, 0);
    if (blocks[name] > V5_MAXIMA[name]) throw Error(`${card.slug}: invalid ${name} block`);
  }
  const afterRules = Object.values(blocks).reduce((sum, n) => sum + n, 0);
  const rulesPenalty = V5_CRITERIA.B2 - card.criteria.B2.points;
  const editorialGross = afterRules + rulesPenalty;
  const trustpilotPenalty: 0 | 6 = card.trustpilotActiveNotice ? 6 : 0;
  const adjusted = Math.max(0, afterRules - trustpilotPenalty);
  const safetyCap = card.contractingEntityMissing || card.activeUnsuspendedStrikeOff ? 55 : null;
  if (card.contractingEntityMissing && card.criteria.C1.points !== 0) throw Error(`${card.slug}: missing contracting entity requires C1=0`);
  if (card.activeUnsuspendedStrikeOff && card.criteria.C2.points !== 2) throw Error(`${card.slug}: active strike-off requires C2=2`);
  return {
    blocks, editorialGross, rulesPenalty, afterRules, trustpilotPenalty, adjusted,
    safetyCap, final: card.closed ? null : (safetyCap === null ? adjusted : Math.min(adjusted, safetyCap)),
    confidence: card.confidence,
    independentPayoutProofLimited: card.criteria.A3.points < 3,
  };
}
