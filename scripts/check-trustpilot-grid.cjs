// Run: node scripts/check-trustpilot-grid.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(
  ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename,
);
const { trustpilotPoints } = require('../app/lib/trustpilotScoring.ts');
const { propFirms } = require('../app/lib/propFirms.ts');
const { getScaleC } = require('../app/lib/scaleC.ts');
const cases = [
  [4,100,false,0], [5,100,false,0], [3.99,100,false,3], [3.5,100,false,3],
  [3.49,100,false,6], [3.4,294,false,6], [3,100,false,6], [2.99,100,false,10],
  [3.7,15052,false,3], [3.7,99,false,2], [3.4,30,false,3], [2,99,false,5],
  [2,29,false,0], [undefined,100,false,0], [2,undefined,false,0],
  [undefined,undefined,true,10], [2,100,true,10], [0,100,false,0], [6,100,false,0],
];
for (const [rating,count,withheld,expected] of cases) assert.equal(trustpilotPoints(rating,count,withheld), expected);
const codes = new Set(['TPW','TPR','TPMID']);
let legacy = 0, c = 0, closed = 0;
for (const firm of propFirms) {
  const entry = getScaleC(firm.slug);
  if (firm.status === 'Fermée') { closed++; assert.equal(firm.trustpilotPenalty, undefined, firm.slug); continue; }
  if (entry) {
    c++;
    assert.equal(firm.trustpilotPenalty, undefined, firm.slug + ': duplicate legacy deduction');
    const tp = entry.penalties.filter(p => codes.has(p.code));
    assert.ok(tp.length <= 1, firm.slug + ': stacking');
    for (const p of tp) {
      const [rating,count] = p.locator.split('/').map(Number);
      assert.equal(p.points, trustpilotPoints(rating,count,p.code === 'TPW'), firm.slug);
    }
    continue;
  }
  legacy++;
  const expected = trustpilotPoints(firm.trustpilotRating, firm.reviewSignals.trustpilotReviewCount, Boolean(firm.reviewSignals.trustpilotRatingWithheld));
  assert.equal(firm.trustpilotPenalty?.penalty ?? 0, expected, firm.slug);
}
console.log('Trustpilot grid OK:', cases.length, 'boundary cases;', propFirms.length, 'profiles;', c, 'Scale C;', legacy, 'other active/watchlist;', closed, 'closed.');
