#!/usr/bin/env node
/**
 * Contractual-rule coverage inventory, not a claim that every CGU/FAQ is fully reviewed.
 * Run: node scripts/report-rules-audit-coverage.cjs [--json]
 *
 * A firm with categorised rules still requires documentary checks of all current
 * programmes, the full Terms and Conditions, linked FAQs and legacy cohorts.
 */
const fs = require('node:fs');
const ts = require('typescript');

// Reuse the project's canonical resolved profiles without a third-party TS runner.
require.extensions['.ts'] = (module, file) => {
  const source = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
  module._compile(js, file);
};

const { propFirms } = require('../app/lib/propFirms.ts');
const updates = require('../app/data/firm-updates.json').firms;
const rows = propFirms.map(({ slug, name, status }) => {
  const audit = updates[slug] ?? {};
  const rules = audit.restrictiveRules ?? [];
  return {
    slug, name, status,
    classifiedRules: rules.filter((rule) => rule.category && rule.severity && rule.clarity && rule.appliesTo?.length).length,
    unclassifiedRules: rules.filter((rule) => !rule.category || !rule.severity || !rule.clarity || !rule.appliesTo?.length).length,
    programmesDeclared: audit.auditedPrograms?.length ?? 0,
    // This proves presence of data only. It NEVER proves that the terms were read completely.
    hasStructuredRules: rules.some((rule) => rule.category && rule.severity && rule.clarity && rule.appliesTo?.length),
  };
});

const summary = {
  total: rows.length,
  withStructuredRules: rows.filter((row) => row.hasStructuredRules).length,
  withoutStructuredRules: rows.filter((row) => !row.hasStructuredRules).length,
  noRulesByStatus: Object.fromEntries(
    ['Active', 'À surveiller', 'Fermée'].map((status) => [status, rows.filter((row) => !row.hasStructuredRules && row.status === status).length]),
  ),
  // Completeness cannot be inferred from presence of rules or programme keys.
  fullCguCoverage: 'not tracked: must be separately verified against the current full official terms',
};

if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify({ summary, rows }, null, 2)}\n`);
} else {
  console.log('PropRadar contractual-rule data coverage (not a full-document audit certificate)');
  console.log(JSON.stringify(summary, null, 2));
  for (const status of ['Active', 'À surveiller', 'Fermée']) {
    const backlog = rows.filter((row) => row.status === status && !row.hasStructuredRules);
    console.log(`\n${status}: ${backlog.length} firm(s) without categorised rules`);
    for (const row of backlog) console.log(`- ${row.name} (${row.slug})`);
  }
}
