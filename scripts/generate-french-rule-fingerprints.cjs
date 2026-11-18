/** Generate source fingerprints ONLY after verifying the French translations
 * against the current reviewed firm-updates.json. Never auto-run on data edits:
 * accepting new fingerprints without reviewing the translation would let a
 * changed contractual rule silently inherit outdated French wording.
 */
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const ts = require('typescript');

if (process.argv[2] !== '--write-after-translation-review') {
  throw Error('Explicit review required: --write-after-translation-review');
}
require.extensions['.ts'] = (module, filename) => module._compile(
  ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
  }).outputText,
  filename,
);
const extra = require('../app/lib/dataI18n/auditFrenchExtra.ts').auditFrenchExtra;
const source = JSON.parse(fs.readFileSync('app/data/firm-updates.json', 'utf8')).firms;
const fingerprint = (rule) => createHash('sha256')
  .update(JSON.stringify([rule.program, rule.rule, rule.impact])).digest('hex');
const hashes = {};
for (const [slug, translations] of Object.entries(extra)) {
  const original = source[slug]?.restrictiveRules;
  if (!original || original.length !== translations.length) {
    throw Error(`${slug}: source count differs from French translations`);
  }
  hashes[slug] = original.map(fingerprint);
}
fs.writeFileSync('app/lib/dataI18n/auditFrenchExtraHashes.json', `${JSON.stringify(hashes, null, 2)}\n`);
console.log(`Source fingerprints recorded for ${Object.keys(hashes).length} fully translated firms.`);
