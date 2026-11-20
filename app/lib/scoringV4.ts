/**
 * Approved PropRadar V4 (2026-11-20).  Scorecards are deliberately kept
 * separate from the legacy scoring pipeline while the site migrates in lots.
 * A validated draft is not automatically a published/approved firm rating.
 */
export const V4_CRITERIA = {
  A1: 10, A2: 10, A3: 5,
  B1: 15, B2: 8, B3: 7, B4: 5,
  C1: 8, C2: 4, C3: 3,
  D1: 5, D2: 5, D3: 5,
  E1: 4, E2: 3, E3: 3,
} as const;

export const V4_BLOCKS = {
  A: ['A1', 'A2', 'A3'],
  B: ['B1', 'B2', 'B3', 'B4'],
  C: ['C1', 'C2', 'C3'],
  D: ['D1', 'D2', 'D3'],
  E: ['E1', 'E2', 'E3'],
} as const;

export type V4Criterion = keyof typeof V4_CRITERIA;
export type V4Confidence = 'elevee' | 'moyenne' | 'limitee';
export type V4Assessment = {
  points: number;
  verification: 'verifie' | 'partiel';
  reason: string;
  /** Links actually consulted. A source is not automatically proof of a fact. */
  sources: string[];
  /** One negative event is allowed to affect only one criterion. */
  negativeFactIds?: string[];
};

export type V4Scorecard = {
  slug: string;
  checkedOn: string;
  status: 'proposition' | 'approuvee';
  confidence: V4Confidence;
  /** The current buyer-facing score, captured before this proposed migration. */
  previousDisplayedScore: number;
  /** Leave the contextual per-programme audits in firm-updates.json untouched. */
  criteria: Record<V4Criterion, V4Assessment>;
  /** Checked against the actual Trustpilot notice by the publishing pipeline. */
  trustpilotActiveNotice: boolean;
  closed: boolean;
};

export type V4ScoreResult = {
  blocks: Record<keyof typeof V4_BLOCKS, number>;
  editorial: number;
  trustpilotPenalty: 0 | 6;
  operationalScore: number;
  confidence: V4Confidence;
};

export function computeV4Scorecard(card: V4Scorecard): V4ScoreResult {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(card.slug)) throw Error('V4: invalid firm slug');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(card.checkedOn) || !Number.isFinite(Date.parse(card.checkedOn))) {
    throw Error(`${card.slug}: invalid audit date`);
  }
  if (!Number.isInteger(card.previousDisplayedScore) || card.previousDisplayedScore < 0 || card.previousDisplayedScore > 100) {
    throw Error(`${card.slug}: invalid baseline`);
  }
  if (card.status !== 'proposition' && card.status !== 'approuvee') throw Error(`${card.slug}: invalid approval status`);
  if (!['elevee', 'moyenne', 'limitee'].includes(card.confidence)) throw Error(`${card.slug}: invalid confidence`);
  if (typeof card.trustpilotActiveNotice !== 'boolean' || typeof card.closed !== 'boolean') throw Error(`${card.slug}: missing operational status`);

  const expected = Object.keys(V4_CRITERIA) as V4Criterion[];
  if (Object.keys(card.criteria).length !== expected.length) throw Error(`${card.slug}: exactly 16 criteria required`);
  const factIds = new Map<string, V4Criterion>();
  for (const criterion of expected) {
    const item = card.criteria[criterion];
    const maximum = V4_CRITERIA[criterion];
    if (!item || !Number.isInteger(item.points) || item.points < 0 || item.points > maximum) {
      throw Error(`${card.slug}/${criterion}: points must be an integer from 0 to ${maximum}`);
    }
    if (!['verifie', 'partiel'].includes(item.verification) || !item.reason?.trim() || !Array.isArray(item.sources) || item.sources.length < 1) {
      throw Error(`${card.slug}/${criterion}: missing evidence or assessment`);
    }
    for (const url of item.sources) {
      if (typeof url !== 'string' || !/^https:\/\/[^\s]+\.[^\s]+/.test(url)) throw Error(`${card.slug}/${criterion}: invalid source URL`);
    }
    for (const factId of item.negativeFactIds ?? []) {
      if (!factId.trim()) throw Error(`${card.slug}/${criterion}: empty negative fact ID`);
      const previous = factIds.get(factId);
      if (previous) throw Error(`${card.slug}: double-counted fact ${factId} in ${previous} and ${criterion}`);
      factIds.set(factId, criterion);
    }
  }

  const blocks = {} as V4ScoreResult['blocks'];
  for (const block of Object.keys(V4_BLOCKS) as (keyof typeof V4_BLOCKS)[]) {
    blocks[block] = V4_BLOCKS[block].reduce((sum, criterion) => sum + card.criteria[criterion].points, 0);
  }
  const editorial = Object.values(blocks).reduce((sum, value) => sum + value, 0);
  const trustpilotPenalty: 0 | 6 = card.trustpilotActiveNotice && !card.closed ? 6 : 0;
  const operationalScore = card.closed ? Math.min(editorial, 29) : Math.max(0, editorial - trustpilotPenalty);
  return { blocks, editorial, trustpilotPenalty, operationalScore, confidence: card.confidence };
}
