import assert from 'node:assert/strict';
import batch from '../app/data/scoring-v5-proposals-c02-c04.json' with { type: 'json' };
import c01 from '../app/data/scoring-v5-proposals-c01.json' with { type: 'json' };
import n01 from '../app/data/scoring-v5-proposals-n01.json' with { type: 'json' };
import published from '../app/data/scoring-v5-published.json' with { type: 'json' };
import { computeV5Scorecard } from '../app/lib/scoringV5.ts';

const expected = {
  tradefundrr: { previous: 67, blocks: { A: 17, B: 18, C: 11, D: 8, E: 8 }, rules: 0, final: 62 },
  hyrotrader: { previous: 55, blocks: { A: 18, B: 16, C: 11, D: 18, E: 9 }, rules: 2, final: 72 },
  'fx2-funding': { previous: 55, blocks: { A: 15, B: 18, C: 11, D: 6, E: 8 }, rules: 0, final: 58 },
  'quant-tekel': { previous: 55, blocks: { A: 15, B: 15, C: 11, D: 12, E: 6 }, rules: 0, final: 59 },
};
const statusExpected = {
  tickticktrader: 67,
  'traders-central': 61,
  'rocket21-challenge': 60,
  fundedlions: 55,
};

assert.equal(batch.version, 5);
assert.equal(batch.checkedOn, '2026-11-20');
assert.equal(batch.firms.length, Object.keys(expected).length);
assert.equal(batch.statusReviews.length, Object.keys(statusExpected).length);

const previouslyAudited = new Set([...c01.firms, ...n01.firms].map((item) => item.slug));
const allSlugs = new Set();
for (const card of batch.firms) {
  const want = expected[card.slug];
  assert.ok(want, `Unexpected numeric V5 proposal: ${card.slug}`);
  assert.equal(previouslyAudited.has(card.slug), false, `Already audited: ${card.slug}`);
  assert.equal(allSlugs.has(card.slug), false, `Duplicate: ${card.slug}`);
  allSlugs.add(card.slug);
  assert.equal(card.status, 'proposition', 'Never self-approve');
  assert.equal(card.checkedOn, batch.checkedOn);
  assert.equal(card.previousDisplayedScore, want.previous);
  assert.equal(published.approvals.some((item) => item.slug === card.slug), false, `Unexpected publication: ${card.slug}`);
  assert.equal(card.closed, false);
  assert.equal(card.activeUnsuspendedStrikeOff, false, 'No strike-off cap may be inferred from a different entity');
  assert.equal(card.contractingEntityMissing, false, 'A named but unverified contracting party is not missing');
  const result = computeV5Scorecard(card);
  assert.deepEqual(result.blocks, want.blocks);
  assert.equal(result.rulesPenalty, want.rules);
  assert.equal(result.afterRules, want.final);
  assert.equal(result.editorialGross, want.final + want.rules);
  assert.equal(result.trustpilotPenalty, 0);
  assert.equal(result.safetyCap, null);
  assert.equal(result.final, want.final);
  assert.equal(result.independentPayoutProofLimited, true, 'A3<3 for this batch');
  for (const [code, item] of Object.entries(card.criteria)) {
    assert.ok(item.sources.length, `${card.slug}/${code}: no source`);
    assert.ok(item.reason.length > 40, `${card.slug}/${code}: insufficient assessment`);
  }
  console.log(`${card.slug}: ${want.previous} → ${result.final} (${result.editorialGross} éditorial − ${result.rulesPenalty} règle, aucune publication)`);
}

for (const review of batch.statusReviews) {
  assert.ok(Object.hasOwn(statusExpected, review.slug), `Unexpected status dossier: ${review.slug}`);
  assert.equal(allSlugs.has(review.slug), false, `Duplicate: ${review.slug}`);
  assert.equal(previouslyAudited.has(review.slug), false, `Already audited: ${review.slug}`);
  allSlugs.add(review.slug);
  assert.equal(review.score, null, 'No competitive V5 number when purchasability is unverified');
  assert.equal(review.previousDisplayedScore, statusExpected[review.slug]);
  assert.equal(review.checkedOn, batch.checkedOn);
  assert.equal(review.ownerApprovalRequired, true);
  assert.ok(review.currentOfferStatus.length > 10 && review.finding.length > 60);
  assert.ok(review.sources.length >= 2 && review.sources.every((url) => /^https:\/\//.test(url)));
  assert.equal(published.approvals.some((item) => item.slug === review.slug), false);
  console.log(`${review.slug}: statut à revalider — aucune nouvelle note concurrentielle`);
}
assert.equal(allSlugs.size, 8);
console.log('V5 C02-C04 OK — 4 scores V5 proposés + 4 statuts instruits, zéro changement public');
