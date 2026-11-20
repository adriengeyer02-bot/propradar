import assert from 'node:assert/strict';
import proposalFile from '../app/data/scoring-v5-proposals-c01.json' with { type: 'json' };
import publishedFile from '../app/data/scoring-v5-published.json' with { type: 'json' };
import { computeV5Scorecard } from '../app/lib/scoringV5.ts';

const expected = {
  'alpha-capital-group': { blocks: { A: 25, B: 8, C: 15, D: 16, E: 9 }, gross: 75, rules: 2, trustpilot: 6, final: 67, previous: 74, approved: true },
  'maven-trading': { blocks: { A: 19, B: 12, C: 14, D: 16, E: 8 }, gross: 75, rules: 6, trustpilot: 6, final: 63, previous: 72, approved: true },
  'tradeday': { blocks: { A: 18, B: 13, C: 11, D: 16, E: 9 }, gross: 69, rules: 2, trustpilot: 0, final: 67, previous: 75, approved: true },
};

assert.equal(proposalFile.version, 5);
assert.equal(proposalFile.firms.length, Object.keys(expected).length);
const seen = new Set();
for (const card of proposalFile.firms) {
  assert.equal(card.status, 'proposition', 'No implicit owner approval');
  assert.equal(seen.has(card.slug), false, 'No duplicated firm proposal');
  seen.add(card.slug);
  assert.ok(expected[card.slug], `Unexpected C01 firm ${card.slug}`);
  const approved = publishedFile.approvals.find((firm) => firm.slug === card.slug);
  const score = computeV5Scorecard(card);
  const want = expected[card.slug];
  assert.deepEqual(score.blocks, want.blocks);
  assert.equal(score.editorialGross, want.gross);
  assert.equal(score.rulesPenalty, want.rules);
  assert.equal(score.trustpilotPenalty, want.trustpilot);
  assert.equal(score.final, want.final);
  if (want.approved) {
    assert.equal(approved?.checkedOn, card.checkedOn, 'Only this audited version may be public');
    assert.equal(approved?.expectedFinal, score.final, 'Publication approval must bind the exact final score');
  } else {
    assert.equal(approved, undefined, 'Sensitive V5 proposal must not be published without owner approval');
  }
  assert.equal(card.previousDisplayedScore, want.previous);
  console.log(`${card.slug}: ${score.editorialGross} brut affiché − ${score.rulesPenalty} règles − ${score.trustpilotPenalty} Trustpilot = ${score.final} final (ancien ${want.previous})`);
}
console.log('V5 C01 proposals OK — only individually approved scorecards may publish');
