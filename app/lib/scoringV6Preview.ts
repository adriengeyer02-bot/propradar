/** V6 pilot: isolated research engine. No public scoring imports or overrides. */
export type RuleFact = { family: string; points: number; label: string; source: string };
export type ProgramInput = { id: string; name: string; rules: RuleFact[] };
export type V6Input = {
  ageBonus: number; payoutBonus: number; incidentPenalty: number;
  trustpilotDomain: string | null; commonRules: RuleFact[]; programs: ProgramInput[];
};
const integerIn = (n: number, max: number) => Number.isInteger(n) && n >= 0 && n <= max;
export function v6Penalty(facts: RuleFact[]) {
  const unique = new Map<string, RuleFact>();
  for (const fact of facts) {
    if (!fact.family || !fact.source.startsWith('https://') || !integerIn(fact.points, 12)) throw new Error('Invalid V6 fact');
    if ((unique.get(fact.family)?.points ?? -1) < fact.points) unique.set(fact.family, fact);
  }
  const raw = [...unique.values()].reduce((s, f) => s + f.points, 0);
  return { points: Math.min(40, raw), raw, facts: [...unique.values()] };
}
export function v6Preview(firm: V6Input) {
  if (!integerIn(firm.ageBonus, 10) || !integerIn(firm.payoutBonus, 5) || !integerIn(firm.incidentPenalty, 35)) throw new Error('Invalid V6 inputs');
  if (new Set(firm.programs.map(p => p.id)).size !== firm.programs.length) throw new Error('Duplicate program');
  const editorial = 85 + firm.ageBonus + firm.payoutBonus - firm.incidentPenalty;
  const trustpilotPenalty = firm.trustpilotDomain ? 8 : 0;
  const score = (penalty: number) => Math.max(0, Math.min(100, editorial - penalty - trustpilotPenalty));
  const common = v6Penalty(firm.commonRules);
  const programs = firm.programs.map(p => {
    const rules = v6Penalty([...firm.commonRules, ...p.rules]);
    return { id: p.id, name: p.name, rules, score: score(rules.points) };
  });
  const ordered = programs.map(p => p.score).sort((a,b) => a-b);
  const medianSample = ordered.length ? Math.round((ordered[Math.floor((ordered.length-1)/2)] + ordered[Math.floor(ordered.length/2)])/2) : null;
  return { editorial, trustpilotPenalty, common, commonScore: score(common.points), programs, medianSample, publicationAllowed: false as const };
}
// Production gate intentionally not implemented: confirm full program family inventory,
// applicable cohort, signed funded agreement or equivalent, incident / status review,
// exact-domain Trustpilot check and editor approval. Unknown != safe or adverse.
