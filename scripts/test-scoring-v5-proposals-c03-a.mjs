import assert from 'node:assert/strict';
import batch from '../app/data/scoring-v5-proposals-c03-a.json' with { type: 'json' };
import v4 from '../app/data/scoring-v4-batch-3.json' with { type: 'json' };
import c01 from '../app/data/scoring-v5-proposals-c01.json' with { type: 'json' };
import n01 from '../app/data/scoring-v5-proposals-n01.json' with { type: 'json' };
import published from '../app/data/scoring-v5-published.json' with { type: 'json' };
import { computeV5Scorecard } from '../app/lib/scoringV5.ts';

const expected = {
  fxify: { previous: 67, blocks: { A: 23, B: 18, C: 17, D: 14, E: 9 }, rules: 0, trustpilot: 0, final: 81 },
  funderpro: { previous: 67, blocks: { A: 18, B: 13, C: 14, D: 14, E: 9 }, rules: 2, trustpilot: 6, final: 62 },
  'funding-pips': { previous: 66, blocks: { A: 23, B: 18, C: 11, D: 10, E: 8 }, rules: 0, trustpilot: 0, final: 70 },
  'leeloo-trading': { previous: 63, blocks: { A: 16, B: 13, C: 11, D: 12, E: 8 }, rules: 2, trustpilot: 0, final: 60 },
  ftuk: { previous: 63, blocks: { A: 17, B: 15, C: 11, D: 14, E: 8 }, rules: 0, trustpilot: 0, final: 65 },
  bulenox: { previous: 61, blocks: { A: 15, B: 15, C: 11, D: 14, E: 8 }, rules: 0, trustpilot: 0, final: 63 },
};

// PR #241 is still a draft and has not been merged into main.
const previousDraftC02C04 = new Set([
  'tradefundrr', 'hyrotrader', 'fx2-funding', 'quant-tekel',
  'tickticktrader', 'traders-central', 'rocket21-challenge', 'fundedlions',
]);
const alreadyAudited = new Set([...c01.firms, ...n01.firms].map((f) => f.slug));
const seen = new Set();

assert.equal(batch.version, 5);
assert.equal(batch.batch, 'C03-A');
assert.equal(batch.checkedOn, '2026-11-20');
assert.equal(batch.firms.length, 6);
assert.ok(!('statusReviews' in batch), 'This batch contains scorecards only');

for (const card of batch.firms) {
  const want = expected[card.slug];
  assert.ok(want, `Unexpected firm: ${card.slug}`);
  assert.equal(seen.has(card.slug), false, `Duplicate firm: ${card.slug}`);
  assert.equal(alreadyAudited.has(card.slug), false, `Already audited in a merged batch: ${card.slug}`);
  assert.equal(previousDraftC02C04.has(card.slug), false, `Already proposed in draft #241: ${card.slug}`);
  assert.equal(published.approvals.some((approval) => approval.slug === card.slug), false, `Already public: ${card.slug}`);
  seen.add(card.slug);

  assert.equal(card.status, 'proposition', 'Owner approval is required');
  assert.equal(card.checkedOn, batch.checkedOn);
  assert.equal(card.closed, false);
  assert.equal(card.contractingEntityMissing, false, 'Unverified registry is not absence of an entity');
  assert.equal(card.activeUnsuspendedStrikeOff, false, 'No false legal cap');
  assert.equal(card.previousDisplayedScore, want.previous);
  assert.equal(v4.firms.find((f) => f.slug === card.slug)?.before, want.previous, 'V4 historical display score');

  const score = computeV5Scorecard(card);
  assert.deepEqual(score.blocks, want.blocks);
  assert.equal(score.rulesPenalty, want.rules);
  assert.equal(score.trustpilotPenalty, want.trustpilot);
  assert.equal(score.afterRules, Object.values(want.blocks).reduce((total, n) => total + n, 0));
  assert.equal(score.editorialGross, score.afterRules + want.rules, 'B2 deducted once, not twice');
  assert.equal(score.safetyCap, null);
  assert.equal(score.final, want.final);
  assert.equal(score.independentPayoutProofLimited, card.criteria.A3.points < 3);
  if (card.criteria.A2.points === 10) assert.equal(card.criteria.A3.points, 5, '24+ months of independent payouts');

  for (const [code, item] of Object.entries(card.criteria)) {
    assert.ok(item.reason.length > 60, `${card.slug}/${code}: evidence reasoning too short`);
    assert.ok(item.sources.length >= 1, `${card.slug}/${code}: no cited source`);
    assert.ok(item.sources.every((url) => /^https:\/\/[^ ]+$/.test(url)), `${card.slug}/${code}: malformed source URL`);
  }
  console.log(`${card.slug}: ${card.previousDisplayedScore} → ${score.final} | brut ${score.editorialGross} − règles ${score.rulesPenalty} − Trustpilot ${score.trustpilotPenalty} | non publié`);
}

assert.equal(seen.size, Object.keys(expected).length);
assert.deepEqual(batch.firms.filter((card) => card.trustpilotActiveNotice).map((card) => card.slug), ['funderpro']);
console.log('V5 C03-A OK — 6 propositions complètes, 78 critères sourcés, aucun changement au classement public');
