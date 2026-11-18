/** Check ALL French translations of sourced firm-profile restrictive rules.
 * The English evidence is the source of truth. Extra translations have an
 * exact SHA-256 fingerprint so changed contractual rules cannot inherit stale
 * French wording.
 * Run: node scripts/check-firm-rule-fr.cjs
 */
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
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
const extra = require('../app/lib/dataI18n/auditFrenchExtra.ts').auditFrenchExtra;
const extraHashes = require('../app/lib/dataI18n/auditFrenchExtraHashes.json');
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

const fingerprint = (rule) => createHash('sha256')
  .update(JSON.stringify([rule.program, rule.rule, rule.impact])).digest('hex');
// The site dictionary is keyed by the original English string, not by firm.
// Shared marketing programme titles may have several valid French renderings;
// the last firm's approved wording is then used for every occurrence.
const reviewedTranslations = new Map();
for (const [slug, entry] of Object.entries(source)) {
  for (const [index, rule] of (entry.restrictiveRules ?? []).entries()) {
    for (const localized of [translations[slug]?.restrictiveRules?.[index], extra[slug]?.[index]]) {
      if (!localized) continue;
      for (const [j, key] of ['program', 'rule', 'impact'].entries()) {
        const english = rule[key];
        if (!reviewedTranslations.has(english)) reviewedTranslations.set(english, new Set());
        reviewedTranslations.get(english).add(Array.isArray(localized) ? localized[j] : localized[key]);
      }
    }
  }
}
assert.deepEqual(Object.keys(extra).sort(), Object.keys(extraHashes).sort(),
  'Every extra-firm translation needs source fingerprints');
for (const [slug, fields] of Object.entries(extra)) {
  const originals = source[slug]?.restrictiveRules;
  assert.ok(originals, `${slug}: missing original audit`);
  assert.equal(fields.length, originals.length, `${slug}: missing translated rule`);
  assert.equal(extraHashes[slug].length, originals.length, `${slug}: fingerprint count differs`);
  for (const [index, original] of originals.entries()) {
    assert.equal(extraHashes[slug][index], fingerprint(original),
      `${slug}: original rule ${index + 1} changed — review translation, then regenerate its fingerprint`);
    for (const [j, key] of ['program', 'rule', 'impact'].entries()) {
      assert.ok(fields[index][j], `${slug}: empty ${key} on rule ${index + 1}`);
      assert.ok(reviewedTranslations.get(original[key])?.has(td('fr', original[key])),
        `${slug}: wrong French rendering of ${key} on rule ${index + 1}`);
    }
  }
}

// Real product names (not English prose) remain identical across languages.
const marketingNames = new Set([
  'Instant Lite', 'Instant Flex', 'Instant Funding', 'Orbit — Sim Funded',
  'Direct to Funded', 'E8 Signature Futures', 'Elite Atom', 'Instant Plus',
  '2-Step Professional', 'Forex 1-Step', 'Instant', 'QT INSTANT',
  'Instant Funding Static', 'Bolt / Bolt Flex', 'Instant Funding Pro',
  'Instant Elite', 'Instant Sim Funded', '51010, 510Zero, Customize',
  '510Zero', 'Power One Phase', 'Ascend',
  'DayTraders.com EOD 25K / 50K / 150K / 300K', 'Instant Funded',
  'Two Phase Challenge', 'Fast Funding', 'Access, 1-Step, 2-Step',
  'Base Camp Instant Funding', 'Lvlup', 'HFT', 'Leveraged Instant',
  'Levels Challenge', 'Instant Funding Challenge', '2 Step Plus', '1 Step Plus',
]);
const allRules = Object.entries(source).flatMap(([slug, entry]) =>
  (entry.restrictiveRules ?? []).map((rule, index) => ({ slug, rule, index })));
let unchangedModelNames = 0;
for (const { slug, rule, index } of allRules) {
  for (const key of ['rule', 'impact']) {
    assert.notEqual(td('fr', rule[key]), rule[key],
      `${slug} #${index + 1}: ${key} is still in English`);
  }
  if (td('fr', rule.program) === rule.program) {
    assert.ok(marketingNames.has(rule.program),
      `${slug} #${index + 1}: programme title still contains untranslated English prose`);
    unchangedModelNames++;
  }
}
console.log(`AquaFunded: ${firm.restrictiveRules.length} règles vérifiées en français, avec leur historique.`);
console.log(`Couverture des règles d’audit en français : ${allRules.length}/${allRules.length} (règles + conséquences).`);
console.log(`${unchangedModelNames} noms de programmes commerciaux conservés à l’identique.`);
