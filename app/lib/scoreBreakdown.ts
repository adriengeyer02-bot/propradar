import type { PropFirm } from './propFirms';
import { getFirmUpdate, type RestrictiveRule } from './firmUpdates';
import { computeRulesPenalty, isScoredRule, ruleKind, rulePoints, RULES_PENALTY_ENABLED, RULES_PENALTY_MAX } from './restrictiveRules';
import { getPublishedV4Score, isPublishedV4, type PublishedV4Score } from './scoringV4Published';
import { getPublishedV5Score, isPublishedV5 } from './scoringV5Published';
import { getScaleC, type ScaleCEntry } from './scaleC';

/**
 * Step-by-step explanation of a firm's displayed score (SCORING.md): the
 * editorial score, then the restrictive-rules penalty, then the Trustpilot and
 * closure caps. Every figure comes from the same pipeline as the score itself.
 */
export type ScoreBreakdownRule = {
  rule: RestrictiveRule;
  points: number;
};

export type ScoreBreakdown = {
  editorial: number;
  /** Validated V4 five-block breakdown; no second legacy rules deduction. */
  v4?: PublishedV4Score;
  v5?: NonNullable<ReturnType<typeof getPublishedV5Score>>;
  rules?: {
    penalty: number;
    applied: boolean;
    rawLoad: number;
    programs: { name: string; load: number; rules: number }[];
    counted: number;
    uncounted: number;
    heaviest: ScoreBreakdownRule[];
  };
  /** Rules shown on the page that are not classified yet (no scoring fields). */
  unclassifiedOnly: number;
  trustpilot?: { penalty: number; included: boolean; before: number };
  closedCap?: { cap: number; before: number };
  safetyCap?: { cap: number; before: number };
  final: number;
  maxPenalty: number;
  /** Scale C: the score is the ceiling minus the listed penalties (see scaleC.ts). */
  scaleC?: ScaleCEntry;
};

export function getScoreBreakdown(firm: PropFirm): ScoreBreakdown {
  const update = getFirmUpdate(firm.slug);
  const scaleC = firm.scaleC ? getScaleC(firm.slug) : undefined;
  if (scaleC) {
    return { editorial: scaleC.ceiling, unclassifiedOnly: 0, final: firm.score, maxPenalty: 0, scaleC };
  }
  const v5 = (update?.scoringVersion === 5 || (!update && isPublishedV5(firm.slug)))
    ? getPublishedV5Score(firm) : undefined;
  if (v5) {
    const allRules = update?.restrictiveRules ?? [];
    const classified = allRules.filter(isScoredRule);
    return {
      editorial: v5.editorialGross,
      v5,
      rules: {
        penalty: v5.rulesPenalty,
        applied: true,
        rawLoad: v5.rulesPenalty,
        programs: [],
        counted: classified.length,
        uncounted: allRules.length - classified.length,
        heaviest: classified.filter((rule) => ruleKind(rule) === 'risk')
          .map((rule) => ({ rule, points: rulePoints(rule) }))
          .sort((a, b) => b.points - a.points).slice(0, 4),
      },
      unclassifiedOnly: allRules.length - classified.length,
      trustpilot: firm.trustpilotPenalty,
      safetyCap: firm.v5SafetyCap,
      closedCap: firm.closedCap,
      final: firm.score,
      maxPenalty: 10,
    };
  }
  const v4 = (update?.scoringVersion === 4 || (!update && isPublishedV4(firm.slug)))
    ? getPublishedV4Score(firm)
    : undefined;
  if (v4) {
    // V4 already scores discretionary/unclear clauses within contractual
    // criteria B1–B4. Surface the evidence, never subtract legacy points again.
    const allRules = update?.restrictiveRules ?? [];
    const scoredRules = allRules.filter(isScoredRule);
    // The dialog presents the most relevant risks first, then a few clearly
    // published restrictions for context. Neither list adds a V4 deduction.
    const heaviest = [
      ...scoredRules.filter((rule) => ruleKind(rule) === 'risk'),
      ...scoredRules.filter((rule) => ruleKind(rule) === 'restriction'),
    ].map((rule) => ({ rule, points: rulePoints(rule) }))
      .sort((a, b) => Number(ruleKind(b.rule) === 'risk') - Number(ruleKind(a.rule) === 'risk') || b.points - a.points)
      .slice(0, 4);
    return {
      editorial: v4.editorial,
      v4,
      rules: {
        penalty: 0,
        applied: false,
        rawLoad: 0,
        programs: [],
        counted: scoredRules.length,
        uncounted: allRules.length - scoredRules.length,
        heaviest,
      },
      unclassifiedOnly: 0,
      trustpilot: firm.trustpilotPenalty,
      final: firm.score,
      maxPenalty: 0,
    };
  }
  const allRules = update?.restrictiveRules ?? [];
  const result = computeRulesPenalty(update);
  const applied = Boolean(firm.rulesPenalty);
  const editorial = firm.rulesPenalty?.before ?? firm.trustpilotPenalty?.before ?? firm.closedCap?.before ?? firm.score;
  const heaviest = allRules
    .filter(isScoredRule)
    .map((rule) => ({ rule, points: rulePoints(rule) }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 4);
  return {
    editorial,
    rules: result
      ? {
          penalty: applied ? firm.rulesPenalty!.penalty : result.penalty,
          applied: applied || (RULES_PENALTY_ENABLED && firm.status !== 'Fermée' && result.penalty === 0),
          rawLoad: result.rawLoad,
          programs: result.programs.map(({ name, load, rules }) => ({ name, load, rules })),
          counted: result.countedRules,
          uncounted: result.uncountedRules,
          heaviest,
        }
      : undefined,
    unclassifiedOnly: result ? 0 : allRules.length,
    trustpilot: firm.trustpilotPenalty,
    closedCap: firm.closedCap,
    final: firm.score,
    maxPenalty: RULES_PENALTY_MAX,
  };
}
