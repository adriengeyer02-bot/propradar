import assert from 'node:assert/strict';
import { computeV5Scorecard, V5_CRITERIA } from '../app/lib/scoringV5.ts';

const sample = () => ({
  slug: 'sample-firm', checkedOn: '2026-11-20', status: 'proposition',
  confidence: 'moyenne', previousDisplayedScore: 70,
  criteria: Object.fromEntries(Object.entries(V5_CRITERIA).map(([key, points]) =>
    [key, { points, reason: 'Verified source', sources: ['https://example.org/terms'] }])),
  trustpilotActiveNotice: false, contractingEntityMissing: false,
  activeUnsuspendedStrikeOff: false, closed: false,
});

const perfect = computeV5Scorecard(sample());
assert.deepEqual(perfect.blocks, { A: 25, B: 25, C: 20, D: 20, E: 10 });
assert.equal(perfect.editorialGross, 100);
assert.equal(perfect.final, 100);

const withPenalties = sample();
withPenalties.criteria.B2.points = 6;
withPenalties.criteria.B2.negativeFactIds = ['vague-rule-1', 'vague-rule-2'];
withPenalties.ruleDeductions = ['vague-rule-1', 'vague-rule-2'].map((factId) => ({
  factId, kind: 'ambiguite', points: 2, program: 'Test program', phase: 'Funded',
  clause: 'Unclear contract clause', consequence: 'The account may be closed', source: 'https://example.org/terms',
}));
withPenalties.trustpilotActiveNotice = true;
const adjusted = computeV5Scorecard(withPenalties);
assert.equal(adjusted.editorialGross, 100);
assert.equal(adjusted.rulesPenalty, 4);
assert.equal(adjusted.afterRules, 96);
assert.equal(adjusted.trustpilotPenalty, 6);
assert.equal(adjusted.final, 90);

const missingRules = sample();
missingRules.criteria.B2.points = 8;
assert.throws(() => computeV5Scorecard(missingRules), /rule details/);

const doubleRules = sample();
doubleRules.criteria.B2.points = 6;
doubleRules.criteria.B2.negativeFactIds = ['one', 'two'];
doubleRules.ruleDeductions = ['one', 'one'].map((factId) => ({
  factId, kind: 'ambiguite', points: 2, program: 'One', phase: 'Funded',
  clause: 'A', consequence: 'B', source: 'https://example.org/terms',
}));
assert.throws(() => computeV5Scorecard(doubleRules), /duplicate sourced B2/);

const missingEntity = sample();
missingEntity.criteria.C1.points = 0;
missingEntity.contractingEntityMissing = true;
assert.equal(computeV5Scorecard(missingEntity).final, 55);

const suspendedStrikeOff = sample();
suspendedStrikeOff.criteria.C2.points = 4;
assert.equal(computeV5Scorecard(suspendedStrikeOff).safetyCap, null);

const activeStrikeOff = sample();
activeStrikeOff.criteria.C2.points = 2;
activeStrikeOff.activeUnsuspendedStrikeOff = true;
assert.equal(computeV5Scorecard(activeStrikeOff).final, 55);

const invalidB1 = sample();
invalidB1.criteria.B1.points = 12;
assert.throws(() => computeV5Scorecard(invalidB1), /invalid points/);

const duplicateFact = sample();
duplicateFact.criteria.A2.negativeFactIds = ['same-incident'];
duplicateFact.criteria.B1.negativeFactIds = ['same-incident'];
assert.throws(() => computeV5Scorecard(duplicateFact), /double-counted/);

const closed = sample();
closed.closed = true;
assert.equal(computeV5Scorecard(closed).final, null);

console.log('V5 scoring invariants OK (weights, rules, Trustpilot, cap, evidence, closure)');
