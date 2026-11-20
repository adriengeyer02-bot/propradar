#!/usr/bin/env node
const assert = require('node:assert/strict');
const batch = require('../app/data/scoring-v4-batch-7.json');
const published = require('../app/data/scoring-v4-batch-7-published.json');
const caps = { A: [10, 10, 5], B: [15, 8, 7, 5], C: [8, 4, 3], D: [5, 5, 5], E: [4, 3, 3] };
const expected = ['get-leveraged', 'miltraders', 'my-flash-funding', 'aeon-funded', 'fundedhive', 'klein-funding-crypto', 'clarity-traders', 'ultimate-traders', 'top-one-trader', 'onefunded', 'fundedelite', 'bem-funding', 'alpha-futures', 'upcomers', 'funding-your-trades', 'wemastertrade', 'thinkcapital', 'myfxcapital', 'tiger-funded', 'sure-leverage'];
const expectedPublished = new Map([['get-leveraged', 59], ['miltraders', 58]]);
assert.equal(batch.version, 4);
assert.equal(batch.checkedOn, published.checkedOn);
assert.deepEqual(batch.firms.map(({ slug }) => slug), expected);
assert.equal(new Set(expected).size, 20);
assert.equal(batch.firms.filter(({ scores }) => scores === null).length, 18);
assert.deepEqual(published.firms.map(({ slug }) => slug), [...expectedPublished.keys()]);
for (const row of batch.firms) {
  assert.ok(row.source.startsWith('https://'), `${row.slug}: source`);
  const selected = published.firms.find(({ slug }) => slug === row.slug);
  if (!row.scores) {
    assert.ok(!selected && row.next && row.auditState, `${row.slug}: incomplete dossier published`);
    continue;
  }
  assert.ok(selected && row.confidence === 'moyenne' && selected.confidence === 'moyenne');
  assert.deepEqual(row.scores, selected.scores);
  assert.equal(row.before, selected.before);
  assert.ok(Object.values(row.sources).every((url) => url.startsWith('https://')));
  assert.ok(row.b1 && row.b2 && row.b3 && row.hold && row.next);
  let editorial = 0;
  for (const [block, limits] of Object.entries(caps)) {
    assert.equal(row.scores[block].length, limits.length);
    row.scores[block].forEach((value, i) => {
      assert.ok(Number.isInteger(value) && value >= 0 && value <= limits[i], `${row.slug}:${block}${i + 1}`);
      editorial += value;
    });
  }
  assert.equal(editorial, expectedPublished.get(row.slug));
  assert.ok(editorial - row.before < 10 && editorial - row.before > -5, `${row.slug}: sensitive move lacks approval`);
  assert.match(row.hold, /confiance moyenne/i);
  console.log(`${row.slug}: ${Object.entries(row.scores).map(([key, values]) => `${key}${values.reduce((a, b) => a + b, 0)}`).join(' / ')} = ${editorial}; Trustpilot −0, final ${editorial}, avant ${row.before}`);
}
assert.equal(batch.firms.find(({ slug }) => slug === 'alpha-futures').scores, null);
assert.match(batch.firms.find(({ slug }) => slug === 'alpha-futures').next, /arriérés/);
assert.equal(batch.firms.find(({ slug }) => slug === 'klein-funding-crypto').scores, null);
assert.equal(batch.firms.find(({ slug }) => slug === 'clarity-traders').scores, null);
console.log('✓ Lot 7 : 20 dossiers, 2 notes publiables, 18 retenus, aucun nouveau signal Trustpilot ou incident activé.');
