import assert from 'node:assert/strict';
import proposals from '../app/data/scoring-v5-proposals-n01.json' with { type: 'json' };
import published from '../app/data/scoring-v5-published.json' with { type: 'json' };
import { computeV5Scorecard } from '../app/lib/scoringV5.ts';

const expected = {
  'get-leveraged': { previous: 59, gross: 64, rules: 2, trustpilot: 6, final: 56, b1: 5 },
  'alpha-futures': { previous: 64, gross: 68, rules: 4, trustpilot: 0, final: 64, b1: 0 },
  miltraders: { previous: 58, gross: 65, rules: 2, trustpilot: 0, final: 63, b1: 5 },
  'top-one-trader': { previous: 50, gross: 70, rules: 4, trustpilot: 6, final: 60, b1: 5 },
};
assert.equal(proposals.version, 5);
assert.equal(proposals.firms.length, Object.keys(expected).length);
for (const card of proposals.firms) {
  const want = expected[card.slug];
  assert.ok(want, `Unknown N01 firm ${card.slug}`);
  assert.equal(card.status, 'proposition');
  const approved = published.approvals.find((item) => item.slug === card.slug);
  const result = computeV5Scorecard(card);
  assert.equal(card.criteria.B1.points, want.b1);
  assert.equal(card.previousDisplayedScore, want.previous);
  assert.equal(result.editorialGross, want.gross);
  assert.equal(result.rulesPenalty, want.rules);
  assert.equal(result.trustpilotPenalty, want.trustpilot);
  assert.equal(result.final, want.final);
  assert.equal(approved?.checkedOn, card.checkedOn);
  assert.equal(approved?.expectedFinal, result.final);
  console.log(`${card.slug}: ${want.previous} → ${result.final} (base ${want.gross}, B2 −${want.rules}, TP −${want.trustpilot})`);
}
console.log('V5 N01 cross-audit proposals OK');
