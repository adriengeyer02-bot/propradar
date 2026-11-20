#!/usr/bin/env node
/*
 * Auditable V4 preview. Read-only: NEVER updates firm-updates.json or ratings.
 * Usage after npm install: node scripts/check-scoring-v4-batch.cjs
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      resolveJsonModule: true,
      esModuleInterop: true,
    },
  });
  module._compile(transpiled.outputText, filename);
};

const { computeV4Scorecard, V4_CRITERIA } = require('../app/lib/scoringV4.ts');
const { getFirmBySlug, topFirms } = require('../app/lib/propFirms.ts');
const dataset = require('../app/data/scoring-v4-batch-1.json');
assert.equal(Object.values(V4_CRITERIA).reduce((sum, points) => sum + points, 0), 100);
assert.equal(Object.keys(V4_CRITERIA).length, 16);
assert.equal(dataset.version, 4);
assert.equal(dataset.firms.length, 3);
assert.deepEqual(dataset.firms.map(({ slug }) => slug), topFirms.slice(0, 3).map(({ slug }) => slug), 'must begin with the three true ranking leaders');

console.log('firm | before | A | B | C | D | E | editorial | Trustpilot | after | confidence');
for (const card of dataset.firms) {
  const current = getFirmBySlug(card.slug);
  assert.ok(current, `missing firm ${card.slug}`);
  assert.equal(card.status, 'proposition', 'sensitive ratings must await approval');
  assert.equal(current.score, card.previousDisplayedScore, `${card.slug}: baseline drift: re-audit before publication`);
  assert.equal(Boolean(current.reviewSignals.trustpilotRatingWithheld), card.trustpilotActiveNotice, `${card.slug}: Trustpilot notice drift`);
  assert.equal(current.status === 'Fermée', card.closed, `${card.slug}: closure drift`);
  const result = computeV4Scorecard(card);
  assert.equal(result.trustpilotPenalty, card.trustpilotActiveNotice ? 6 : 0);
  assert.ok(result.operationalScore >= 0 && result.operationalScore <= 100);
  console.log([
    card.slug, card.previousDisplayedScore, ...Object.values(result.blocks), result.editorial,
    `-${result.trustpilotPenalty}`, result.operationalScore, result.confidence,
  ].join(' | '));
}

const fixture = structuredClone(dataset.firms[0]);
fixture.criteria.B1.points = 16;
assert.throws(() => computeV4Scorecard(fixture), /B1: points/);
fixture.criteria.B1.points = 12;
fixture.criteria.A2.negativeFactIds = ['ftmo-subjective-size-forfeiture'];
assert.throws(() => computeV4Scorecard(fixture), /double-counted fact/);
delete fixture.criteria.A2.negativeFactIds;
delete fixture.criteria.A1;
assert.throws(() => computeV4Scorecard(fixture), /exactly 16 criteria required/);

const trustpilotCase = structuredClone(dataset.firms[1]);
trustpilotCase.trustpilotActiveNotice = true;
let result = computeV4Scorecard(trustpilotCase);
assert.equal(result.operationalScore, result.editorial - 6);
assert.equal(result.trustpilotPenalty, 6);
trustpilotCase.closed = true;
result = computeV4Scorecard(trustpilotCase);
assert.equal(result.operationalScore, 29);
assert.equal(result.trustpilotPenalty, 0);
console.log('V4: 16 criteria, unique negative events, penalty once, closure cap and existing ranks OK.');
