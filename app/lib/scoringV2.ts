/**
 * PropRadar's proposed five-axis, evidence-first scoring contract.
 *
 * This module deliberately does NOT derive a new rating from the old total,
 * Trustpilot stars, company age, self-reported marketing figures or complaints
 * that have not been substantiated. A score is calculable only after an editor
 * supplies an auditable dossier covering every axis. Until then it is a
 * candidate, not the buyer-facing score.
 *
 * Owner-approved weights (2026-11-19): 35 / 30 / 15 / 10 / 10.
 */

export const SCORING_V2_WEIGHTS = {
  payout: 35,
  rules: 30,
  legal: 15,
  integrity: 10,
  offer: 10,
} as const;

export const TRUSTPILOT_INTEGRITY_DEDUCTION = 6;

export type ScoringAxis = keyof typeof SCORING_V2_WEIGHTS;
export type EvidenceKind =
  | 'official-contract'
  | 'company-registry'
  | 'regulator-or-court'
  | 'independently-verified'
  | 'trustpilot-notice'
  | 'company-statement'
  | 'unverified-complaint';

export type ScoringFinding = {
  /** Stable identifier for the underlying real-world event (not its labels). */
  eventId: string;
  axis: Exclude<ScoringAxis, 'offer'>;
  deduction: number;
  summary: string;
  sourceUrl: string;
  evidenceKind: EvidenceKind;
  /** A documented potential contractual effect is not proof it occurred. */
  claimType: 'contractual-risk' | 'established-event' | 'integrity-notice';
};

export type OfferScore = {
  priceAndFees: number; // 0–4, permanent public prices only
  programFlexibility: number; // 0–3
  platformsAndAssets: number; // 0–3
  rationale: {
    priceAndFees: string;
    programFlexibility: string;
    platformsAndAssets: string;
  };
  sourceUrls: string[];
};

export type AuditCoverage = {
  /** Official current programme terms, including restrictions by programme. */
  officialRulesUrl?: string;
  /** Official payout eligibility and withdrawal terms. */
  payoutPolicyUrl?: string;
  /** Company registry or source identifying the actual contracting entity. */
  legalEntityUrl?: string;
  /** Exact Trustpilot profile or another identified independent check. */
  reputationSourceUrl?: string;
  /** Proof of real successful withdrawals, if independently corroborated. */
  independentlyVerifiedPayoutUrl?: string;
};

export type FirmScoringV2Input = {
  slug: string;
  status: 'Active' | 'À surveiller' | 'Fermée';
  reviewedAt: string;
  /** Verified evidence earns payout points; missing history is not misconduct. */
  payoutEvidence: 'independent' | 'company-reported' | 'published-terms-only' | 'not-assessed';
  /** A named contracting company is different from an independently matched filing. */
  legalEvidence: 'registry-verified' | 'declared-only' | 'not-assessed';
  findings: ScoringFinding[];
  offer: OfferScore | null;
  coverage: AuditCoverage;
};

export type FirmScoringV2Result = {
  /** Undefined means evidence is insufficient, not zero quality. */
  score?: number;
  axes: Record<ScoringAxis, number | null>;
  confidence: 'A' | 'B' | 'C';
  rankingEligible: boolean;
  excludedReason?: string;
  errors: string[];
  deductions: ScoringFinding[];
};

const AXES: ScoringAxis[] = ['payout', 'rules', 'legal', 'integrity', 'offer'];

function validSource(url: string | undefined): url is string {
  if (!url) return false;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

/** One factual event can only affect one category; there is no silent stacking. */
export function calculateScoringV2(input: FirmScoringV2Input): FirmScoringV2Result {
  const errors: string[] = [];
  const seen = new Set<string>();
  const deductions: ScoringFinding[] = [];
  const totals: Record<Exclude<ScoringAxis, 'offer'>, number> = {
    payout: 0,
    rules: 0,
    legal: 0,
    integrity: 0,
  };

  for (const finding of input.findings) {
    if (!finding.eventId.trim() || seen.has(finding.eventId)) {
      errors.push(`Duplicate or empty factual event: ${finding.eventId}`);
      continue;
    }
    seen.add(finding.eventId);
    if (!Number.isInteger(finding.deduction) || finding.deduction < 0 || !validSource(finding.sourceUrl)) {
      errors.push(`Invalid deduction or source for event: ${finding.eventId}`);
      continue;
    }
    if (!finding.summary.trim()) {
      errors.push(`Missing factual explanation for event: ${finding.eventId}`);
      continue;
    }
    if (finding.evidenceKind === 'unverified-complaint' && finding.deduction > 0) {
      errors.push(`Unverified complaint cannot change a score: ${finding.eventId}`);
      continue;
    }
    if (finding.claimType === 'established-event' && finding.evidenceKind === 'company-statement') {
      errors.push(`A company's own statement cannot establish wrongdoing: ${finding.eventId}`);
      continue;
    }
    if (finding.axis === 'payout' &&
      (finding.claimType !== 'established-event' ||
        !['independently-verified', 'regulator-or-court'].includes(finding.evidenceKind))) {
      errors.push(`A payout penalty needs independently established nonpayment or delay: ${finding.eventId}`);
      continue;
    }
    if (finding.evidenceKind === 'trustpilot-notice') {
      if (
        finding.axis !== 'integrity' ||
        finding.deduction !== TRUSTPILOT_INTEGRITY_DEDUCTION ||
        finding.claimType !== 'integrity-notice' ||
        !/^(?:trustpilot\.com|[a-z0-9-]+\.trustpilot\.com)$/.test(new URL(finding.sourceUrl).hostname)
      ) {
        errors.push(`Trustpilot notice must be a single integrity -6: ${finding.eventId}`);
        continue;
      }
    }
    totals[finding.axis] += finding.deduction;
    deductions.push(finding);
  }

  for (const axis of ['payout', 'rules', 'legal', 'integrity'] as const) {
    if (totals[axis] > SCORING_V2_WEIGHTS[axis]) {
      errors.push(`Excess deductions in ${axis}: ${totals[axis]}/${SCORING_V2_WEIGHTS[axis]}`);
    }
  }

  const coverage = input.coverage;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.reviewedAt)) {
    errors.push('An ISO audit date is required');
  }
  const requiredSources = [
    coverage.officialRulesUrl,
    coverage.payoutPolicyUrl,
    coverage.legalEntityUrl,
    coverage.reputationSourceUrl,
  ];
  const sufficientlyDocumented = requiredSources.every(validSource);
  if (!sufficientlyDocumented) errors.push('Four core evidence sources are required before publishing a score');
  if (input.payoutEvidence === 'not-assessed') errors.push('Payout evidence or a dated published payout policy must be assessed');
  if (input.payoutEvidence === 'independent' && !validSource(coverage.independentlyVerifiedPayoutUrl)) {
    errors.push('Independently verified payout credit requires an independent source');
  }
  if (input.legalEvidence === 'not-assessed') errors.push('The contracting legal entity has not been assessed');

  const offer = input.offer;
  if (!offer ||
    !Number.isInteger(offer.priceAndFees) || offer.priceAndFees < 0 || offer.priceAndFees > 4 ||
    !Number.isInteger(offer.programFlexibility) || offer.programFlexibility < 0 || offer.programFlexibility > 3 ||
    !Number.isInteger(offer.platformsAndAssets) || offer.platformsAndAssets < 0 || offer.platformsAndAssets > 3 ||
    !offer.rationale || !offer.rationale.priceAndFees.trim() ||
    !offer.rationale.programFlexibility.trim() || !offer.rationale.platformsAndAssets.trim() ||
    !offer.sourceUrls.length || !offer.sourceUrls.every(validSource)) {
    errors.push('The 10 offer points need three bounded, sourced subratings');
  }

  const earnedPayoutPoints = {
    independent: 35,
    'company-reported': 30,
    'published-terms-only': 25,
    'not-assessed': 0,
  }[input.payoutEvidence];
  const earnedLegalPoints = {
    'registry-verified': 15,
    'declared-only': 10,
    'not-assessed': 0,
  }[input.legalEvidence];
  const axes: FirmScoringV2Result['axes'] = {
    payout: input.payoutEvidence === 'not-assessed' ? null : Math.max(0, earnedPayoutPoints - totals.payout),
    rules: Math.max(0, SCORING_V2_WEIGHTS.rules - totals.rules),
    legal: input.legalEvidence === 'not-assessed' ? null : Math.max(0, earnedLegalPoints - totals.legal),
    integrity: Math.max(0, SCORING_V2_WEIGHTS.integrity - totals.integrity),
    offer: offer && offer.sourceUrls.length ? offer.priceAndFees + offer.programFlexibility + offer.platformsAndAssets : null,
  };
  const confidence = !sufficientlyDocumented || input.payoutEvidence === 'not-assessed' || input.legalEvidence === 'not-assessed'
    ? 'C'
    : input.payoutEvidence === 'independent' && input.legalEvidence === 'registry-verified' ? 'A' : 'B';
  const rankingEligible = errors.length === 0 && input.status !== 'Fermée';
  const score = errors.length || AXES.some((axis) => axes[axis] === null)
    ? undefined
    : AXES.reduce((sum, axis) => sum + (axes[axis] ?? 0), 0);

  return {
    score,
    axes,
    confidence,
    rankingEligible,
    excludedReason: errors.length ? 'Insufficient or inconsistent source evidence' : input.status === 'Fermée' ? 'Closed firm — historical archive only' : undefined,
    errors,
    deductions,
  };
}
