import type { FirmUpdate, RestrictiveRule } from './firmUpdates';

/**
 * Restrictive-rules penalty (SCORING.md section 2). Agents only classify each
 * rule (category, severity, clarity, programmes); this file turns the
 * classification into points, so every editor scores the same way.
 */

/** Off until Geyer approves the score impact (sensitive change, CLAUDE.md rule 6). */
export const RULES_PENALTY_ENABLED = false;

export const RULES_PENALTY_MAX = 12;
/** Raw load at which the penalty reaches ~63% of the maximum (diminishing returns). */
export const RULES_PENALTY_SCALE = 30;

export const SEVERITY_POINTS = { minor: 1, major: 3, blocking: 5 } as const;
export const CLARITY_FACTOR = { clear: 1, buried: 1.5, vague: 2 } as const;

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
  const clarity = rule.status === 'conflicting' ? 'vague' : rule.clarity!;
  return SEVERITY_POINTS[rule.severity!] * CLARITY_FACTOR[clarity];
}

export function penaltyFromLoad(rawLoad: number) {
  if (rawLoad <= 0) return 0;
  return Math.min(RULES_PENALTY_MAX, Math.round(RULES_PENALTY_MAX * (1 - Math.exp(-rawLoad / RULES_PENALTY_SCALE))));
}

/** Returns undefined when the firm has no scored rule (nothing to compute). */
export function computeRulesPenalty(update: Pick<FirmUpdate, 'restrictiveRules' | 'auditedPrograms'> | undefined): RulesPenalty | undefined {
  const rules = update?.restrictiveRules ?? [];
  const scored = rules.filter(isScoredRule);
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
      count += 1;
      best.set(rule.category!, Math.max(best.get(rule.category!) ?? 0, rulePoints(rule)));
    }
    const load = [...best.values()].reduce((sum, value) => sum + value, 0);
    return { key, name, load: Math.round(load * 10) / 10, rules: count };
  });
  const rawLoad = Math.round((loads.reduce((sum, item) => sum + item.load, 0) / loads.length) * 10) / 10;
  return { penalty: penaltyFromLoad(rawLoad), rawLoad, programs: loads, countedRules: scored.length, uncountedRules: rules.length - scored.length };
}
