/** Regression check for the three African-language dictionaries and page modules. */
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  module._compile(code, filename);
};

const ROOT = `${__dirname}/../app/lib`;
const LANGUAGES = ['sw', 'ha', 'am'];
const PAGES = ['audit', 'tools', 'payout-risk', 'promos', 'prop-firm-rules', 'radar-brief'];
const expectedGuides = require(`${ROOT}/seoGuides.ts`).seoGuides.map((guide) => guide.slug);
const guides = require(`${ROOT}/guideI18n/african.ts`);
const english = require(`${ROOT}/messages/en.ts`).default;
let errors = 0;

function walk(value, prefix = '') {
  if (typeof value === 'string') return [[prefix, value]];
  if (Array.isArray(value)) return value.flatMap((entry, i) => walk(entry, `${prefix}[${i}]`));
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, entry]) => walk(entry, prefix ? `${prefix}.${key}` : key));
}

function check(source, target, label) {
  const original = walk(source);
  const translated = new Map(walk(target));
  const originalKeys = new Set(original.map(([key]) => key));
  for (const [key, value] of original) {
    if (!translated.has(key)) {
      console.error(`MISSING ${label} ${key}`);
      errors++;
      continue;
    }
    const vars = (text) => (text.match(/\{[a-zA-Z][a-zA-Z0-9]*\}/g) || []).sort().join('|');
    if (vars(value) !== vars(translated.get(key))) {
      console.error(`PLACEHOLDER ${label} ${key}: ${vars(value)} -> ${vars(translated.get(key))}`);
      errors++;
    }
    // Long untouched sentences almost always indicate an accidental English
    // fallback. Short trading terms, brands and acronyms may remain unchanged.
    if (value.length >= 45 && value === translated.get(key)) {
      console.error(`UNTRANSLATED ${label} ${key}`);
      errors++;
    }
  }
  for (const key of translated.keys()) {
    if (!originalKeys.has(key)) {
      console.error(`EXTRA ${label} ${key}`);
      errors++;
    }
  }
  console.log(`${label}: ${original.length} strings checked`);
}

for (const language of LANGUAGES) {
  check(english, require(`${ROOT}/messages/${language}.ts`).default, language);
  for (const page of PAGES) {
    const base = `${ROOT}/messages/pages/${page}`;
    const en = require(`${base}/en.ts`).default;
    const local = require(`${base}/${language}.ts`).default;
    check(en, local, `${language}/${page}`);
    const loaded = require(`${base}/index.ts`).getPageMessages(language);
    if (loaded !== local) {
      console.error(`NOT WIRED ${language}/${page}`);
      errors++;
    }
  }
  const translatedGuides = guides[language];
  for (const slug of expectedGuides) {
    if (!translatedGuides[slug]) {
      console.error(`GUIDE MISSING ${language}/${slug}`);
      errors++;
    }
  }
  console.log(`${language}/guides: ${expectedGuides.length} summaries checked`);
}

if (errors) {
  console.error(`African i18n check failed: ${errors} error(s)`);
  process.exitCode = 1;
} else {
  console.log('African i18n: all dictionaries, placeholders, page routes and guide summaries passed.');
}
