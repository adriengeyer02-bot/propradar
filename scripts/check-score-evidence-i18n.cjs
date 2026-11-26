/** Coverage of the actual published score modal evidence, not the general rules tab.
 * node scripts/check-score-evidence-i18n.cjs [--strict] [--missing]
 */
const assert = require('node:assert/strict');
const read = name => require('../app/data/' + name + '.json');
const dictionary = require('../app/lib/dataI18n/scoreEvidence.json');
const locales = ['en','fr','de','it','es','pt','zh','ja','hi','tr','ar','ko','sw','ha','am'];
const approved = read('scoring-v52-published').approvals;
const old = read('scoring-v5-published').approvals;
const owner = read('scoring-v52-owner-approved-2026-11-23');
const migrated = read('scoring-v52-all-existing-audits-2026-11-21');
const cards = new Map([
  ...read('scoring-v5-proposals-c01').firms,
  ...read('scoring-v5-proposals-n01').firms,
  ...read('scoring-v52-new-audits').audits,
  ...owner.reviewedAudits,
  ...read('scoring-v52-31-owner-release-2026-11-23').newCards,
  ...migrated.rows.filter(r => owner.migrationSlugs.includes(r.slug)).map(r => ({
    ...r,
    criteria: {...r.sourceCriteria, B1: {
      ...r.sourceCriteria.B1,
      reason: 'V5.2 conversion from a dated source-backed V5 audit (old '+r.sourceCriteria.B1.points+', new '+r.criteriaV52.B1+'). Original evidence: '+r.sourceCriteria.B1.reason
    }}
  }))
].map(c => [c.slug,c]));
const active = [...new Set([...approved,...old].map(a=>a.slug))].map(slug => {
  const c = cards.get(slug); assert.ok(c, 'Missing published scorecard: '+slug); return c;
});
const rows = active.flatMap(c => (c.ruleDeductions ?? []).map(r => ({...r, slug:c.slug})));
const source = r => [r.program,r.phase,r.clause,r.consequence];
const exact = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const complete = a => Array.isArray(a) && a.length === 4 && a.every(x => typeof x === 'string' && x.trim());
for(const [id,entry] of Object.entries(dictionary.deductions)) {
  assert.ok(rows.some(r => r.factId===id && exact(source(r),entry.source)), 'Stale score deduction: '+id);
  for(const [locale,t] of Object.entries(entry.translations)) {
    assert.ok(locales.includes(locale) && complete(t), 'Incomplete translation: '+id+' '+locale);
  }
}
for(const [slug,entry] of Object.entries(dictionary.reasons)) {
  assert.equal(entry.source,cards.get(slug)?.criteria.B1.reason,'Stale B1 reason: '+slug);
  for(const [locale,t] of Object.entries(entry.translations)) assert.ok(locales.includes(locale) && typeof t==='string' && t.trim(),'Incomplete B1 reason: '+slug+' '+locale);
}
let incomplete = false;
for(const locale of locales) {
  const missing = rows.filter(r => {const e=dictionary.deductions[r.factId];return !e || !exact(e.source,source(r)) || !complete(e.translations[locale]);});
  const missingReasons = active.filter(c => {const e=dictionary.reasons[c.slug];return !e || e.source!==c.criteria.B1.reason || !e.translations[locale];});
  console.log(locale+': B2 '+(rows.length-missing.length)+'/'+rows.length+'; B1 '+(active.length-missingReasons.length)+'/'+active.length);
  if(process.argv.includes('--missing')) {
    console.log(JSON.stringify({locale,deductions:missing.map(r=>({slug:r.slug,factId:r.factId,source:source(r)})),reasons:missingReasons.map(c=>({slug:c.slug,source:c.criteria.B1.reason}))},null,2));
  }
  incomplete ||= missing.length>0 || missingReasons.length>0;
}
if(process.argv.includes('--strict') && incomplete) process.exitCode=1;
