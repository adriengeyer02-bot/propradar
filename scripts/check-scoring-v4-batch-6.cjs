#!/usr/bin/env node
const assert = require('node:assert/strict');
const batch = require('../app/data/scoring-v4-batch-6.json');
const published = require('../app/data/scoring-v4-batch-6-published.json');
const caps = { A: [10, 10, 5], B: [15, 8, 7, 5], C: [8, 4, 3], D: [5, 5, 5], E: [4, 3, 3] };
const expected = ['wsfunded', 'moneta-funded', 'e8-futures', 'traders-launch', 'funded-bull', 'daytraders-com', 'funded-squad', 'top-one-futures', 'tradexprop', 'fxci', 'monevis', 'mifunder', 'tradersedgefx', 'fundyourfx', 'lvlup-futures', 'ofp-funding', 'atmos-funded', 'tx3-funding', 'now-trade-funded', 'fundings4u'];
const expectedPublished = new Map([['traders-launch', 61], ['funded-bull', 55], ['ofp-funding', 58]]);

assert.equal(batch.version, 4);
assert.deepEqual(batch.firms.map(({ slug }) => slug), expected);
assert.equal(new Set(expected).size, 20);
assert.equal(batch.firms.filter(({ scores }) => scores === null).length, 17);
assert.deepEqual(published.firms.map(({ slug }) => slug), [...expectedPublished.keys()]);
assert.equal(batch.checkedOn, published.checkedOn);

for (const row of batch.firms) {
  assert.ok(row.source.startsWith('https://'), `${row.slug}: official URL missing`);
  const live = published.firms.find(({ slug }) => slug === row.slug);
  if (!row.scores) {
    assert.ok(!live && row.next && row.auditState, `${row.slug}: blocked dossier was activated`);
    continue;
  }
  assert.ok(live, `${row.slug}: numeric score missing from publication gate`);
  assert.deepEqual(live.scores, row.scores);
  assert.equal(live.before, row.before);
  assert.equal(row.confidence, 'moyenne');
  assert.equal(live.confidence, 'moyenne');
  assert.ok(Object.values(row.sources).every((url) => url.startsWith('https://')));
  assert.ok(row.b1 && row.b2 && row.b3 && row.hold);
  let editorial = 0;
  for (const [block, limits] of Object.entries(caps)) {
    assert.equal(row.scores[block].length, limits.length, `${row.slug} ${block} length`);
    row.scores[block].forEach((value, i) => {
      assert.ok(Number.isInteger(value) && value >= 0 && value <= limits[i], `${row.slug} ${block}${i + 1}`);
      editorial += value;
    });
  }
  const penalty = row.slug === 'ofp-funding' ? 6 : 0;
  const final = editorial - penalty;
  assert.equal(final, expectedPublished.get(row.slug), `${row.slug}: final score`);
  assert.ok(final - row.before > -5 && final - row.before < 10, 'unapproved sensitive movement');
  assert.ok(!/paiement injustifié prouvé/i.test(row.b1), 'contractual possibility is not a proven incident');
  console.log(`${row.slug}: A/B/C/D/E ${Object.entries(row.scores).map(([key, values]) => `${key}${values.reduce((a, b) => a + b, 0)}`).join(' / ')}; editorial ${editorial}, Trustpilot −${penalty}, final ${final}, previous ${row.before}`);
}

const atmos = batch.firms.find(({ slug }) => slug === 'atmos-funded');
assert.equal(atmos.scores, null);
assert.match(atmos.auditState, /trustpilot-a-valider/);
assert.ok(!published.firms.some(({ slug }) => slug === 'atmos-funded'));
console.log('✓ Lot 6: 20 dossiers, 3 notes V4 publiables, 17 dossiers en attente et incident Atmos non activé.');
