/** Regression tests: native V5.2 engine, all 41 source-backed migrated scores, and 11 public rollout approvals. */
import assert from 'node:assert/strict';
import all from '../app/data/scoring-v52-all-existing-audits-2026-11-21.json' with {type:'json'};
import gate from '../app/data/scoring-v52-published.json' with {type:'json'};
import oldGate from '../app/data/scoring-v5-published.json' with {type:'json'};
import intake from '../app/data/scoring-v52-new-audits.json' with {type:'json'};
import {computeV52Scorecard} from '../app/lib/scoringV52.ts';

const allowed=['A1','A2','A3','B1','B2','C1','C2','C3','D1','D2','D3','E1','E2'];
assert.equal(all.rows.length,41,'All source-backed V5 files must be preserved');
assert.equal(gate.version,'5.2');
assert.equal(gate.approvals.length,oldGate.approvals.length,'No silent approval of unreviewed firms');
assert.equal(intake.audits.length,1,'Exactly one verified native V5.2 scorecard in the intake');
const first=intake.audits[0];
assert.equal(first.slug,'funded7');
assert.equal(first.status,'proposition');
assert.equal(first.checkedOn,'2026-11-22');
assert.equal(first.ruleDeductions.length,1);
assert.equal(first.criteria.B2.points,7);
assert.equal(first.trustpilotActiveNotice,false);
assert.equal(computeV52Scorecard(first).final,56,'Funded7 native score and caps must remain in sync');
assert.ok(!gate.approvals.some(a=>a.slug===first.slug),'Native proposal must not become public without owner approval');
const active=new Set(), listed=new Set();
for(const row of all.rows){
  assert.ok(!listed.has(row.slug),'Duplicate V5.2 migration '+row.slug);
  listed.add(row.slug);
  const criteria=Object.fromEntries(allowed.map(k=>[k,{...row.sourceCriteria[k],points:row.criteriaV52[k]}]));
  const audit={
    slug:row.slug,
    checkedOn:row.checkedOn,
    status:'proposition',
    confidence:row.confidence,
    previousDisplayedScore:row.oldDisplayed,
    criteria,
    ruleDeductions:row.ruleDeductions,
    trustpilotActiveNotice:row.trustpilotPenalty===6,
    contractingEntityMissing:row.legalCap===55&&row.criteriaV52.C1===0,
    activeUnsuspendedStrikeOff:row.legalCap===55&&row.criteriaV52.C2===2,
    closed:false,
  };
  const n=computeV52Scorecard(audit);
  assert.equal(n.final,row.v52,row.slug+' native V5.2 differs from migrated source');
  assert.equal(n.rulesPenalty,10-row.criteriaV52.B2,row.slug+' B2 double count');
  assert.equal(n.payoutEvidenceCap,row.payoutEvidenceCap===100?null:row.payoutEvidenceCap,row.slug+' A3 cap');
  assert.equal(n.safetyCap,row.legalCap===100?null:55,row.slug+' entity cap');
  if(row.wasPublishedV5) active.add(row.slug);
}
for(const approval of gate.approvals){
  const row=all.rows.find(x=>x.slug===approval.slug);
  const previous=oldGate.approvals.find(x=>x.slug===approval.slug);
  assert.ok(row&&previous,approval.slug+' missing source');
  assert.equal(approval.checkedOn,previous.checkedOn,approval.slug+' source date changed');
  assert.equal(approval.sourceV5Final,previous.expectedFinal,approval.slug+' prior score changed');
  assert.equal(approval.expectedFinal,row.v52,approval.slug+' recalculated final changed');
}
assert.deepEqual(new Set(gate.approvals.map(x=>x.slug)),new Set(oldGate.approvals.map(x=>x.slug)));
assert.equal(active.size,11);
console.log('V5.2: 41 scored source conversions + 11 prior approved rollout cases match 13-criterion native engine, no new public approvals.');
