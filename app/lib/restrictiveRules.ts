import type { FirmUpdate, RestrictiveRule } from './firmUpdates';

/**
 * Restrictive-rules penalty (SCORING.md section 2). Agents only classify each
 * rule (category, severity, clarity, programmes); this file turns the
 * classification into points, so every editor scores the same way.
 */

/**
 * V3 migration preview: objective trading restrictions remain visible in the
 * product menus, but the former separate automatic rules deduction is off.
 * Contractual payout risk must be assessed inside the sourced editorial
 * scorecard, not deducted a second time. SENSITIVE: do not merge until the
 * 197-firm V3 scoring reconciliation has been approved by Geyer.
 */
export const RULES_PENALTY_ENABLED = false;

export const RULES_PENALTY_MAX = 12;
/** Raw load at which the penalty reaches ~63% of the maximum (diminishing returns). */
export const RULES_PENALTY_SCALE = 30;

export const SEVERITY_POINTS = { minor: 1, major: 3, blocking: 5 } as const;
/**
 * Geyer, 2026-11-20: a published, quantified trading rule weighs little; the
 * penalty comes mainly from contractual risks (ambiguous, discretionary or
 * contradictory clauses that allow a subjective reading or a payout refusal).
 */
export const CLARITY_FACTOR = { clear: 0.25, buried: 0.5, vague: 2 } as const;
export const RISK_FACTOR = 2;

/**
 * Classic offer mechanics (minimum trading days, funded-stage drawdown type)
 * belong to the offer characteristics, not to the constraints: never counted.
 */
export const CLASSIC_CATEGORIES: ReadonlySet<string> = new Set(['min-trading-days', 'funded-trailing-drawdown']);

/**
 * classic: offer mechanics, shown with the offer, not in the constraints;
 * risk: discretionary, undefined or contradictory clause (subjective reading,
 * possible payout refusal); restriction: a specific, stated rule to know.
 */
export type RuleKind = 'classic' | 'restriction' | 'risk';

export function ruleKind(rule: RestrictiveRule): RuleKind {
  if (rule.category && CLASSIC_CATEGORIES.has(rule.category)) return 'classic';
  if (rule.status === 'conflicting' || rule.clarity === 'vague' || rule.category === 'discretionary-clause') return 'risk';
  return 'restriction';
}

export type ProgramLoad = { key: string; name: string; load: number; rules: number };
export type RulesPenalty = {
  /** Points subtracted from the editorial score (0-12). */
  penalty: number;
  /** Average raw load over the main programmes, before the curve. */
  rawLoad: number;
  programs: ProgramLoad[];
  countedRules: number;
  uncountedRules: number;
};

export function isScoredRule(rule: RestrictiveRule) {
  return Boolean(rule.category && rule.severity && rule.clarity && rule.appliesTo?.length);
}

export function rulePoints(rule: RestrictiveRule) {
  if (!isScoredRule(rule)) return 0;
  const kind = ruleKind(rule);
  if (kind === 'classic') return 0;
  if (kind === 'risk') return SEVERITY_POINTS[rule.severity!] * RISK_FACTOR;
  return SEVERITY_POINTS[rule.severity!] * CLARITY_FACTOR[rule.clarity!];
}

export function penaltyFromLoad(rawLoad: number) {
  if (rawLoad <= 0) return 0;
  return Math.min(RULES_PENALTY_MAX, Math.round(RULES_PENALTY_MAX * (1 - Math.exp(-rawLoad / RULES_PENALTY_SCALE))));
}

/** Returns undefined when the firm has no scored rule (nothing to compute). */
export function computeRulesPenalty(update: Pick<FirmUpdate, 'restrictiveRules' | 'auditedPrograms'> | undefined): RulesPenalty | undefined {
  const rules = update?.restrictiveRules ?? [];
  const scored = rules.filter(isScoredRule);
  const counted = scored.filter((rule) => ruleKind(rule) !== 'classic');
  if (!scored.length) return undefined;
  const declared = update?.auditedPrograms ?? [];
  const programs = declared.length
    ? declared
    : [...new Set(scored.flatMap((rule) => rule.appliesTo!.filter((key) => key !== '*')))].map((key) => ({ key, name: key }));
  const list = programs.length ? programs : [{ key: '*', name: 'All programmes' }];
  const loads: ProgramLoad[] = list.map(({ key, name }) => {
    const best = new Map<string, number>();
    let count = 0;
    for (const rule of scored) {
      if (!rule.appliesTo!.includes('*') && !rule.appliesTo!.includes(key)) continue;
      if (ruleKind(rule) === 'classic') continue;
      count += 1;
      best.set(rule.category!, Math.max(best.get(rule.category!) ?? 0, rulePoints(rule)));
    }
    const load = [...best.values()].reduce((sum, value) => sum + value, 0);
    return { key, name, load: Math.round(load * 10) / 10, rules: count };
  });
  const rawLoad = Math.round((loads.reduce((sum, item) => sum + item.load, 0) / loads.length) * 10) / 10;
  return { penalty: penaltyFromLoad(rawLoad), rawLoad, programs: loads, countedRules: counted.length, uncountedRules: rules.length - scored.length };
}
