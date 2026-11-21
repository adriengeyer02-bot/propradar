/** Validate every migrated V5.2 candidate against source facts and the 20-firm backtest.
 * Run: node scripts/test-scoring-v52-candidate.mjs
 * Candidate-only: does not modify production scores.
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const all=read('app/data/scoring-v52-all-existing-audits-2026-11-21.json');
const sample=read('app/data/scoring-v52-backtest-20-2026-11-21.json');
const approved=read('app/data/scoring-v5-published.json');
assert.equal(all.version,'5.2-candidate');
assert.equal(all.rows.length,41);
assert.equal(new Set(all.rows.map(x=>x.slug)).size,all.rows.length);
const ruleCost={contradiction:3,ambiguite:3,retroactivite:4,asymetrie:3};
const a2Map={0:0,2:2,4:4,6:6,8:6,9:9,10:10};
const b1Map={0:0,2:0,5:3,8:6,11:9,13:12,15:15};
const expectedKeys=['A1','A2','A3','B1','B2','C1','C2','C3','D1','D2','D3','E1','E2'];
for(const f of all.rows){
  assert.deepEqual(Object.keys(f.criteriaV52).sort(),[...expectedKeys].sort(),f.slug+' missing criteria');
  const c=f.sourceCriteria;
  assert.equal(f.criteriaV52.A2,a2Map[c.A2.points],f.slug+' A2');
  assert.equal(f.criteriaV52.B1,b1Map[c.B1.points],f.slug+' B1');
  assert.equal(f.criteriaV52.B2,Math.max(0,10-f.ruleDeductions.reduce((n,r)=>n+r.points,0)),f.slug+' B2');
  assert.equal(f.ruleDeductions.length,new Set(f.ruleDeductions.map(x=>x.factId)).size,f.slug+' duplicate rule');
  for(const r of f.ruleDeductions){
    assert.equal(r.points,ruleCost[r.kind],f.slug+' rule kind');
    assert.ok(c.B2.negativeFactIds?.includes(r.factId),f.slug+' missing negative fact');
    assert.ok(c.B2.sources.includes(r.source),f.slug+' rule source');
    assert.ok(r.program&&r.phase&&r.clause&&r.consequence,f.slug+' incomplete rule');
  }
  const raw=Object.values(f.criteriaV52).reduce((n,v)=>n+v,0);
  assert.ok(raw>=0&&raw<=100,f.slug+' raw');
  const cap=f.payoutEvidenceLevel<=1?64:f.payoutEvidenceLevel===2?69:f.payoutEvidenceLevel===3?79:100;
  assert.equal(f.payoutEvidenceCap,cap,f.slug+' proof cap');
  const result=Math.max(0,Math.min(raw-f.trustpilotPenalty,cap,f.legalCap));
  assert.equal(f.v52,result,f.slug+' final');
  assert.equal(f.delta,f.v52-f.v5,f.slug+' delta');
}
for(const f of sample.rows){
  const row=all.rows.find(x=>x.slug===f.slug);
  assert.ok(row,f.slug+' missing from full migration');
  assert.equal(row.v52,f.v52,f.slug+' differs from prior backtest');
}
assert.equal(all.rows.filter(x=>approved.approvals.some(a=>a.slug===x.slug)).length,approved.approvals.length,'published V5 approvals not preserved');
console.log('V5.2 candidate: '+all.rows.length+' dossiers verified, '+sample.rows.length+' backtest comparisons; public approvals unchanged.');
