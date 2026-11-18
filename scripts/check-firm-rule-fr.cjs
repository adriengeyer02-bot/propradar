/** Check French translations of the AquaFunded rules shown on firm profiles.
 * The English evidence is the source of truth: translations are anchored to
 * the exact reviewed rule and must be updated if the English text changes.
 * Run: node scripts/check-firm-rule-fr.cjs
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

const source = JSON.parse(fs.readFileSync('app/data/firm-updates.json', 'utf8')).firms;
// Load the real server-only dictionary so this also catches broken wiring.
require.extensions['.ts'] = (module, filename) => module._compile(
  ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
  }).outputText,
  filename,
);
const translations = require('../app/lib/dataI18n/auditFrenchDetails.ts').auditFrenchDetails;
const { td } = require('../app/lib/dataI18n/index.ts');
const firm = source['aqua-funded'];
const translated = translations['aqua-funded'];

assert.ok(firm && translated, 'AquaFunded: missing audit or French translations');
assert.equal(translated.restrictiveRules.length, firm.restrictiveRules.length,
  'AquaFunded: restrictive rule count changed; update the translations');
assert.equal(translated.changelog.length, firm.changelog.length,
  'AquaFunded: update history has changed; update the French entries');

for (const [index, original] of firm.restrictiveRules.entries()) {
  const french = translated.restrictiveRules[index];
  assert.equal(french.sourceRule, original.rule,
    `AquaFunded: reviewed English rule ${index + 1} changed`);
  for (const key of ['program', 'rule', 'impact']) {
    assert.ok(french[key] && french[key].length > 20,
      `AquaFunded: missing French ${key} for rule ${index + 1}`);
    assert.notEqual(french[key], original[key],
      `AquaFunded: ${key} still in English for rule ${index + 1}`);
    assert.equal(td('fr', original[key]), french[key],
      `AquaFunded: ${key} is not rendered in French for rule ${index + 1}`);
  }
}
assert.notEqual(td('fr', firm.set.auditSummary), firm.set.auditSummary,
  'AquaFunded: audit summary is still in English');
for (const [index, entry] of firm.changelog.entries()) {
  assert.equal(td('fr', entry.summary), translated.changelog[index],
    `AquaFunded: history item ${index + 1} is not rendered in French`);
}

const allRules = Object.entries(source).flatMap(([slug, entry]) =>
  (entry.restrictiveRules ?? []).map((rule, index) => ({ slug, rule, index })));
const localized = allRules.filter(({ rule }) =>
  ['program', 'rule', 'impact'].every((key) => td('fr', rule[key]) !== rule[key]));
console.log(`AquaFunded: ${firm.restrictiveRules.length} règles vérifiées en français, avec leur historique.`);
console.log(`Couverture des règles d’audit en français : ${localized.length}/${allRules.length} (information, sans blocage).`);
