/**
 * Five-block PropRadar V3 scoring contract (SCORING_V3.md).
 *
 * Deliberately NOT connected to propFirms yet: legacy editorial scores have
 * not been re-audited criterion by criterion. Do not turn the 197-row
 * mechanical preview into public V3 scores by calling this with guesses.
 */

export const V3_CRITERIA = {
  payoutEvidence: { axis: 'payouts', max: 18 },
  payoutTerms: { axis: 'payouts', max: 12 },
  payoutIncidentReview: { axis: 'payouts', max: 10 },
  officialTermsConsistency: { axis: 'contract', max: 10 },
  earnedRewardProtection: { axis: 'contract', max: 10 },
  retroactiveRights: { axis: 'contract', max: 5 },
  contractingEntity: { axis: 'identity', max: 7 },
  addressAndRemedies: { axis: 'identity', max: 3 },
  regulatorRecord: { axis: 'identity', max: 5 },
  ordinaryPricing: { axis: 'offer', max: 5 },
  splitAndPayoutFrequency: { axis: 'offer', max: 5 },
  drawdownTransparency: { axis: 'offer', max: 5 },
  operationalContinuity: { axis: 'history', max: 2 },
  reviewSourceQuality: { axis: 'history', max: 1 },
  platformStability: { axis: 'history', max: 2 },
} as const;

export type V3Criterion = keyof typeof V3_CRITERIA;
export type V3Axis = 'payouts' | 'contract' | 'identity' | 'offer' | 'history';
export const V3_AXIS_MAX: Record<V3Axis, number> = {
  payouts: 40,
  contract: 25,
  identity: 15,
  offer: 15,
  history: 5,
};

export type V3CriterionAssessment = {
  /** 'unverified' is neutral half credit, NOT an assertion that the firm paid. */
  status: 'verified' | 'unverified';
  /** Verified results need a reason and a source. Unverified always earns 50%. */
  points?: number;
  rationale: string;
  sourceUrls: string[];
  /** One distinct adverse fact belongs to one criterion, globally. */
  adverseFactIds?: string[];
};

export type V3SourceChecklist = {
  /** Each is the actual source for this firm, not a search result or guess. */
  payoutPolicy?: string;
  contractTerms?: string;
  legalIdentity?: string;
  offerPage?: string;
  consumerReviews?: string;
};

export type V3Scorecard = {
  slug: string;
  reviewedAt: string;
  criteria: Record<V3Criterion, V3CriterionAssessment>;
  sourceChecklist: V3SourceChecklist;
  /** A reporting claim is not verified independent proof of money received. */
  payoutEvidenceKind: 'independent' | 'firm-reported' | 'policy-only' | 'unverified';
  /** Explicit supporting source for an independently observed payment. */
  independentPayoutSourceUrl?: string;
  trustpilotNotice?: {
    noticeActive: boolean;
    checkedAt: string;
    sourceUrl: string;
    adverseFactId: string;
  };
  closed: boolean;
};

export type V3ScoringResult = {
  axes: Record<V3Axis, number>;
  editorial: number;
  trustpilotPenalty: number;
  beforeClosure: number;
  final: number;
  confidence: 'A' | 'B' | 'C';
  unverifiedCriteria: V3Criterion[];
  /** Only A/B with all five necessary sources can be prepared for publication. */
  minimumSourcesPresent: boolean;
  canPublish: boolean;
  includedAdverseFacts: string[];
};

function validateHttps(value: string, label: string): void {
  let url: URL;
  try { url = new URL(value); }
  catch { throw new Error(`${label}: invalid URL`); }
  if (url.protocol !== 'https:' || !url.hostname.includes('.')) {
    throw new Error(`${label}: HTTPS source required`);
  }
}

function validateDay(value: string, label: string): void {
  const parsed = Date.parse(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(parsed) ||
      new Date(parsed).toISOString().slice(0, 10) !== value) {
    throw new Error(`${label}: YYYY-MM-DD required`);
  }
}

const axes = Object.keys(V3_AXIS_MAX) as V3Axis[];
const keys = Object.keys(V3_CRITERIA) as V3Criterion[];

export function computeScoringV3(input: V3Scorecard): V3ScoringResult {
  if (!input.slug.trim()) throw new Error('Firm slug required');
  validateDay(input.reviewedAt, 'reviewedAt');
  const totals: Record<V3Axis, number> = { payouts: 0, contract: 0, identity: 0, offer: 0, history: 0 };
  const unverified: V3Criterion[] = [];
  const facts = new Set<string>();

  for (const key of keys) {
    const item = input.criteria[key];
    if (!item) throw new Error(`Missing V3 criterion ${key}`);
    if (!item.rationale.trim()) throw new Error(`${key}: rationale required`);
    const { axis, max } = V3_CRITERIA[key];
    const score = item.points ?? max / 2;
    if (!Number.isFinite(score) || score < 0 || score > max) throw new Error(`${key}: outside 0-${max}`);
    if (item.status === 'unverified') {
      if (score !== max / 2) throw new Error(`${key}: unverified evidence must receive half credit`);
      if (item.adverseFactIds?.length) throw new Error(`${key}: cannot establish an adverse fact without verification`);
      unverified.push(key);
    } else if (item.status === 'verified') {
      if (item.points === undefined) throw new Error(`${key}: verified points must be explicit`);
      if (!item.sourceUrls?.length) throw new Error(`${key}: verified assessment needs a source`);
    } else throw new Error(`${key}: unknown verification status`);
    for (const url of item.sourceUrls ?? []) validateHttps(url, `${key} source`);
    for (const id of item.adverseFactIds ?? []) {
      if (!id.trim() || facts.has(id)) throw new Error(`Duplicate or empty adverse fact: ${id}`);
      facts.add(id);
    }
    totals[axis] += score;
  }

  if (input.payoutEvidenceKind !== 'independent' && input.criteria.payoutEvidence.points! > 9) {
    throw new Error('Independently verified payout points require independent payout evidence');
  }
  if (input.payoutEvidenceKind === 'independent') {
    if (!input.independentPayoutSourceUrl) throw new Error('Independent payout source required');
    validateHttps(input.independentPayoutSourceUrl, 'independent payout source');
  }
  for (const axis of axes) {
    if (totals[axis] > V3_AXIS_MAX[axis]) throw new Error(`${axis}: score exceeds axis budget`);
  }

  let trustpilotPenalty = 0;
  if (input.trustpilotNotice?.noticeActive) {
    const notice = input.trustpilotNotice;
    validateDay(notice.checkedAt, 'Trustpilot checkedAt');
    validateHttps(notice.sourceUrl, 'Trustpilot notice');
    if (!/^(?:[a-z0-9-]+\.)?trustpilot\.com$/i.test(new URL(notice.sourceUrl).hostname)) {
      throw new Error('Trustpilot notice must link directly to Trustpilot');
    }
    if (!notice.adverseFactId.trim() || facts.has(notice.adverseFactId)) {
      throw new Error('Trustpilot incident must be one unique fact, not double counted in another criterion');
    }
    facts.add(notice.adverseFactId);
    trustpilotPenalty = 6;
  }
  const minimumSources = Object.values(input.sourceChecklist);
  for (const url of minimumSources) if (url) validateHttps(url, 'scorecard source');
  const minimumSourcesPresent = minimumSources.length === 5 && minimumSources.every(Boolean);
  const confidence: V3ScoringResult['confidence'] = !minimumSourcesPresent ? 'C'
    : input.payoutEvidenceKind === 'independent' && input.independentPayoutSourceUrl && !unverified.length ? 'A'
      : 'B';
  const editorial = Math.round(axes.reduce((sum, axis) => sum + totals[axis], 0));
  const beforeClosure = Math.max(0, editorial - trustpilotPenalty);
  return {
    axes: totals, editorial, trustpilotPenalty, beforeClosure,
    final: input.closed ? Math.min(29, beforeClosure) : beforeClosure,
    confidence, unverifiedCriteria: unverified,
    minimumSourcesPresent,
    canPublish: minimumSourcesPresent && confidence !== 'C',
    includedAdverseFacts: [...facts],
  };
}
