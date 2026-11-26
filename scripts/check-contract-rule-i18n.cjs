/** Measure actual displayed translation coverage for every locale, not just dictionary size.
 * Usage: node scripts/check-contract-rule-i18n.cjs [--strict]
 */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(
  ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
const { td } = require('../app/lib/dataI18n/index.ts');
const { LOCALES } = require('../app/lib/locales.ts');
const originals = require('../app/data/firm-updates.json').firms;
const localized = require('../app/lib/dataI18n/contractRulesLocalized.json');
const keys = ['program', 'rule', 'impact'];
for (const [locale, firms] of Object.entries(localized)) {
  for (const [slug, rows] of Object.entries(firms)) {
    const originalRows = originals[slug]?.restrictiveRules ?? [];
    for (const row of rows) {
      assert.equal(row.source.length, 3, locale + '/' + slug + ': source tuple');
      assert.equal(row.localized.length, 3, locale + '/' + slug + ': translation tuple');
      assert.ok(originalRows.some(rule => keys.every((key, i) => rule[key] === row.source[i])),
        locale + '/' + slug + ': changed source rule; review translation');
      row.localized.forEach((value, i) => {
        assert.ok(value.trim(), locale + '/' + slug + ': empty translation');
        if (i > 0) assert.notEqual(value, row.source[i], locale + '/' + slug + ': English prose');
        // Programme labels may be proper names shared across firms.
        if (i > 0) assert.equal(td(locale, row.source[i]), value, locale + '/' + slug + ': runtime lookup');
      });
    }
  }
}
const rows = Object.entries(originals).flatMap(([slug, firm]) =>
  (firm.restrictiveRules ?? []).map(rule => ({slug, rule})));
let incomplete = false;
for (const locale of LOCALES.filter(locale => locale !== 'en')) {
  const missing = rows.filter(({rule}) => ['rule', 'impact'].some(key => td(locale, rule[key]) === rule[key]));
  const slugs = [...new Set(missing.map(({slug}) => slug))];
  console.log(locale + ': ' + (rows.length - missing.length) + '/' + rows.length + ' complete (rule + impact); ' + slugs.length + ' firms incomplete');
  if (process.argv.includes('--details') && slugs.length) console.log('  ' + slugs.join(', '));
  incomplete ||= missing.length > 0;
}
if (process.argv.includes('--strict') && incomplete) process.exitCode = 1;
