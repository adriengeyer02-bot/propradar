#!/usr/bin/env node
const assert = require('node:assert/strict');
const batch = require('../app/data/scoring-v4-batch-5.json');
const published = require('../app/data/scoring-v4-batch-5-published.json');
const caps = { A: [10, 10, 5], B: [15, 8, 7, 5], C: [8, 4, 3], D: [5, 5, 5], E: [4, 3, 3] };
const expected = ['hyrotrader', 'fx2-funding', 'quant-tekel', 'fundedlions', 'one-of-one-funding', 'tribe-funded', 'atlas-funded', 'funded7', 'getcryptofunded', 'alpine-funded', 'blue-guardian', 'blusky-trading', 'blueberry-funded', 'purdia-capital', 'orion-funded', 'lucid-trading', 'equity-edge', 'wegetfunded', 'fidelcrest', 'funder-trading'];
assert.equal(batch.version, 4);
assert.deepEqual(batch.firms.map(({ slug }) => slug), expected);
assert.equal(new Set(expected).size, 20);
assert.equal(batch.firms.filter(({ scores }) => scores === null).length, 18);
assert.deepEqual(published.firms.map(({ slug }) => slug), ['blue-guardian']);
for (const row of batch.firms) {
  assert.ok(row.source.startsWith('https://'), `${row.slug}: source`);
  if (!row.scores) {
    assert.ok(row.next, `${row.slug}: next research`);
    continue;
  }
  let editorial = 0;
  for (const [block, limits] of Object.entries(caps)) {
    assert.equal(row.scores[block].length, limits.length, `${row.slug} ${block}`);
    row.scores[block].forEach((score, index) => {
      assert.ok(Number.isInteger(score) && score >= 0 && score <= limits[index], `${row.slug} ${block}${index+1}`);
      editorial += score;
    });
  }
  assert.ok(row.sources && Object.values(row.sources).every((url) => url.startsWith('https://')));
  const trustpilot = row.slug === 'blue-guardian' ? 6 : 0;
  const final = editorial - trustpilot;
  const publish = published.firms.find((firm) => firm.slug === row.slug);
  if (publish) {
    assert.deepEqual(row.scores, publish.scores);
    assert.equal(final, 61);
    assert.equal(final - row.before, 8, 'non-sensitive publication only');
  } else {
    assert.equal(row.auditState, 'proposition-sensible-a-valider');
    assert.ok(Math.abs(final - row.before) >= 10, 'sensitive score requires owner approval');
    assert.equal(final, 66);
  }
  console.log(`${row.slug}: A/B/C/D/E = ${Object.entries(row.scores).map(([k, v]) => `${k}${v.reduce((a, b) => a + b, 0)}`).join(' / ')} ; éditorial ${editorial}, Trustpilot −${trustpilot}, final ${final}, delta ${final-row.before >= 0 ? '+' : ''}${final-row.before}`);
}
assert.equal(published.firms[0].confidence, 'moyenne');
console.log('✓ 20 revues, 2 notes 16 critères, 1 seule publiée, 1 sensible en attente et 18 audits retenus.');
