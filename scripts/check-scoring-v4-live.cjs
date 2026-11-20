#!/usr/bin/env node
/* Read-only publication guard. Run after each V4 integration, including CI. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, resolveJsonModule: true, esModuleInterop: true },
  });
  module._compile(source.outputText, filename);
};

const { propFirms, getFirmBySlug, topFirms } = require('../app/lib/propFirms.ts');
const { getScoreBreakdown } = require('../app/lib/scoreBreakdown.ts');
const { V4_PUBLISHED_SLUGS } = require('../app/lib/scoringV4Published.ts');
const { V4_CRITERIA } = require('../app/lib/scoringV4.ts');
const groups = [1, 2, 3].map((number) => require(`../app/data/scoring-v4-batch-${number}.json`));
const legacy = [...groups[1].firms.filter((row) => row.confidence === 'limitee').map((row) => row.slug), ...groups[2].firms.filter((row) => row.scores === null).map((row) => row.slug)];

assert.equal(V4_PUBLISHED_SLUGS.length, 31);
assert.equal(new Set(V4_PUBLISHED_SLUGS).size, 31);
assert.equal(legacy.length, 14);
const scored = propFirms.filter((firm) => getScoreBreakdown(firm).v4);
assert.equal(scored.length, 31, 'exactly 31 firms should use the V4 score in production');
assert.deepEqual(scored.map((firm) => firm.slug).sort(), [...V4_PUBLISHED_SLUGS].sort());
assert.ok(topFirms.every((firm, i) => i === 0 || topFirms[i - 1].score >= firm.score));

console.log('Firme | éditorial | Trustpilot | visible | confiance');
for (const firm of scored) {
  const breakdown = getScoreBreakdown(firm);
  const review = breakdown.v4;
  assert.equal(review.confidence, 'moyenne');
  assert.equal(review.checkedOn, '2026-11-20');
  assert.equal(breakdown.v4?.editorial, review.editorial);
  assert.equal(breakdown.final, firm.score);
  assert.equal(review.editorial, Object.values(review.blocks).reduce((a, b) => a + b, 0));
  assert.equal(firm.score, review.editorial - review.trustpilotPenalty);
  assert.equal(review.trustpilotPenalty, firm.reviewSignals.trustpilotRatingWithheld ? 6 : 0);
  assert.equal(firm.rulesPenalty, undefined, 'legacy restrictive-rules penalty must not stack');
  assert.equal(firm.scoreCap, undefined);
  assert.equal(Object.keys(V4_CRITERIA).length, 16);
  console.log([firm.slug, review.editorial, `−${review.trustpilotPenalty}`, firm.score, review.confidence].join(' | '));
}
for (const slug of legacy) {
  const firm = getFirmBySlug(slug);
  assert.ok(firm, `${slug}: missing legacy firm`);
  assert.equal(getScoreBreakdown(firm).v4, undefined, `${slug}: incomplete V4 audit accidentally published`);
}
assert.equal(getFirmBySlug('ftmo').score, 90);
assert.equal(getFirmBySlug('topstep').score, 81);
assert.equal(getFirmBySlug('the5ers').score, 78);
assert.equal(getFirmBySlug('funding-pips').score, 76);
assert.equal(getFirmBySlug('fxify').score, 75);
assert.equal(getFirmBySlug('elite-trader-funding').score, 66);
assert.equal(getFirmBySlug('crypto-fund-trader').score, 62);
assert.equal(getFirmBySlug('myfundedcapital').score, 59, 'sensitive +16 proposal must not publish');
assert.equal(getFirmBySlug('tickticktrader').score, 67);
assert.equal(getFirmBySlug('rocket21-challenge').score, 60);
console.log(`\n✓ V4 live: 31 final scores, 14 previous incomplete files left on legacy; sensitive MyFundedCapital held. Each score has five blocks and no double deductions.`);
