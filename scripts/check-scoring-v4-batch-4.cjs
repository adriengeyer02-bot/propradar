#!/usr/bin/env node
/* Evidence-first audit gate: validates numerical proposals but NEVER publishes them. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, resolveJsonModule: true, esModuleInterop: true },
}).outputText, filename);

const batch = require('../app/data/scoring-v4-batch-4.json');
const { getFirmBySlug } = require('../app/lib/propFirms.ts');
const { getScoreBreakdown } = require('../app/lib/scoreBreakdown.ts');
const { computeV4Scorecard, V4_CRITERIA, V4_BLOCKS } = require('../app/lib/scoringV4.ts');
const expected = ['the-concept-trading','goat-funded-trader','rebelsfunding','myfundedcapital','elite-trader-funding','lux-trading-firm','ic-funded','fxrk','tentrade','apex-trader-funding','forex-funds-flow','bespoke-funding-program','sway-funded','nova-funding','nations-trading','the-forex-funder','leveled-up-society','aurafunded','alphaproptraders','crypto-fund-trader'];

assert.equal(batch.version, 4);
assert.equal(batch.rankStartLegacy, 44);
assert.equal(batch.rankEndLegacy, 63);
assert.equal(batch.status, 'propositions-edito-non-publiees');
assert.deepEqual(batch.firms.map(({slug}) => slug), expected);
assert.equal(batch.firms.length, 20);
const proposed = new Map([['myfundedcapital', 75], ['elite-trader-funding', 66], ['crypto-fund-trader', 62]]);
// These two are enabled independently by PR #208. This audit PR must work
// both before and after it lands on main, without changing frozen baselines.
const publishedSeparately = new Set(['elite-trader-funding', 'crypto-fund-trader']);
let heldCount = 0;
let separatelyLive = 0;
for (const row of batch.firms) {
  const firm = getFirmBySlug(row.slug);
  assert.ok(firm, `${row.slug}: missing firm`);
  const current = getScoreBreakdown(firm).v4;
  if (publishedSeparately.has(row.slug) && current) {
    assert.equal(firm.score, proposed.get(row.slug), `${row.slug}: unexpected V4 publication`);
    assert.equal(current.operationalScore, proposed.get(row.slug), `${row.slug}: visible total differs`);
    ++separatelyLive;
  } else {
    assert.equal(row.before, firm.score, `${row.slug}: baseline changed before audit; recalibrate the queue`);
    assert.equal(current, undefined, `${row.slug}: V4 was unexpectedly activated`);
  }
  assert.match(row.source, /^https:\/\/\S+\.\S+$/);
  assert.ok(row.next.length > 45 && row.auditState.length > 5, `${row.slug}: missing action item`);
  if (!proposed.has(row.slug)) {
    assert.equal(row.scores, null, `${row.slug}: no evidence-gated proposal was approved`);
    ++heldCount;
    continue;
  }
  assert.equal(row.confidence, 'moyenne', `${row.slug}: proposal requires substantive source coverage`);
  assert.ok(row.b1 && row.b2 && row.b3 && row.hold, `${row.slug}: contract commentary incomplete`);
  assert.deepEqual(Object.keys(row.scores).sort(), Object.keys(V4_BLOCKS).sort());
  assert.deepEqual(Object.keys(row.sources).sort(), ['contract','entity','offer','payout','program']);
  for (const url of Object.values(row.sources)) assert.match(url, /^https:\/\/\S+\.\S+$/);
  const criteria = {};
  for (const [block, names] of Object.entries(V4_BLOCKS)) {
    assert.equal(row.scores[block].length, names.length, `${row.slug}: wrong count in ${block}`);
    names.forEach((criterion, i) => {
      criteria[criterion] = {
        points: row.scores[block][i],
        verification: ['B1', 'B2', 'B3', 'B4'].includes(criterion) ? 'verifie' : 'partiel',
        reason: `${row.slug}: ${criterion} assessed against ${row.sources.contract}, ${row.sources.payout}; ${row.hold}`,
        sources: [row.sources.contract, row.sources.payout],
      };
    });
  }
  assert.deepEqual(Object.keys(criteria).sort(), Object.keys(V4_CRITERIA).sort());
  const result = computeV4Scorecard({slug: row.slug, checkedOn: batch.checkedOn, status:'proposition', confidence: 'moyenne', previousDisplayedScore: row.before, criteria, trustpilotActiveNotice:Boolean(firm.reviewSignals.trustpilotRatingWithheld), closed:firm.status === 'Fermée'});
  assert.equal(result.operationalScore, proposed.get(row.slug), `${row.slug}: proposed total/notice mismatch`);
  assert.ok(result.trustpilotPenalty <= 6, `${row.slug}: double Trustpilot penalty`);
}
assert.equal(heldCount, 17);
console.log(`✓ 20 dossiers historiques : 3 notes V4 validées (75, 66, 62) ; 17 retenues ; ${separatelyLive}/2 déjà publiées par la PR #208 ; aucune activation due à cet audit.`);
