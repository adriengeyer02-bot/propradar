import type { PropFirm } from './propFirms';
import { getFirmUpdate, type RestrictiveRule } from './firmUpdates';
import { computeRulesPenalty, isScoredRule, rulePoints, RULES_PENALTY_ENABLED, RULES_PENALTY_MAX } from './restrictiveRules';

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
  v4?: NonNullable<PropFirm['scoreV4']>;
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
  final: number;
  maxPenalty: number;
};

export function getScoreBreakdown(firm: PropFirm): ScoreBreakdown {
  if (firm.scoreV4) {
    return {
      editorial: firm.scoreV4.editorial,
      v4: firm.scoreV4,
      unclassifiedOnly: 0,
      trustpilot: firm.trustpilotPenalty,
      final: firm.score,
      maxPenalty: 0,
    };
  }
  const update = getFirmUpdate(firm.slug);
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
