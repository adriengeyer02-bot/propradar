#!/usr/bin/env node
/* Sources-first gate for historical ranks 44–63. Does not create/publish scores. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, resolveJsonModule: true, esModuleInterop: true },
}).outputText, filename);

const batch = require('../app/data/scoring-v4-batch-4.json');
const { getFirmBySlug } = require('../app/lib/propFirms.ts');
const { getScoreBreakdown } = require('../app/lib/scoreBreakdown.ts');
const expected = ['the-concept-trading','goat-funded-trader','rebelsfunding','myfundedcapital','elite-trader-funding','lux-trading-firm','ic-funded','fxrk','tentrade','apex-trader-funding','forex-funds-flow','bespoke-funding-program','sway-funded','nova-funding','nations-trading','the-forex-funder','leveled-up-society','aurafunded','alphaproptraders','crypto-fund-trader'];

assert.equal(batch.version, 4);
assert.equal(batch.rankStartLegacy, 44);
assert.equal(batch.rankEndLegacy, 63);
assert.equal(batch.status, 'audit-en-cours-non-publie');
assert.deepEqual(batch.firms.map(({slug}) => slug), expected);
assert.equal(batch.firms.length, 20);
for (const row of batch.firms) {
  const firm = getFirmBySlug(row.slug);
  assert.ok(firm, `${row.slug}: missing firm`);
  assert.equal(row.before, firm.score, `${row.slug}: baseline changed before audit; recalibrate the queue`);
  assert.equal(row.scores, null, `${row.slug}: publication attempted without full contract and payout review`);
  assert.equal(getScoreBreakdown(firm).v4, undefined, `${row.slug}: V4 was unexpectedly activated`);
  assert.match(row.source, /^https:\/\/\S+\.\S+$/);
  assert.ok(row.next.length > 45 && row.auditState.length > 5, `${row.slug}: missing action item`);
}
console.log(`✓ 20 dossiers identifiés (anciens rangs 44–63) ; 20 contrôles de couverture en attente ; 0 score V4 inventé ou publié.`);
