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
const expectedNative={'funded7':56,'top-one-futures':67,'wegetfunded':52,'purdia-capital':62,'daytraders-com':52,'equity-edge':53,'alpine-funded':59,'funded-squad':41,'orion-funded':60,'wsfunded':59,'moneta-funded':59,'tradexprop':51,'funder-trading':52,'fundyourfx':58,'monevis':54,'fundedhive':49,'sabiotrade':42,'clarity-traders':48};
assert.equal(intake.audits.length,18,'Eighteen native V5.2 source-backed proposals expected');
assert.deepEqual(new Set(intake.audits.map(x=>x.slug)),new Set(Object.keys(expectedNative)));
for(const audit of intake.audits){
  assert.equal(audit.status,'proposition',audit.slug+' accidentally approved');
  assert.equal(audit.checkedOn,'2026-11-22',audit.slug+' date');
  assert.equal(Object.keys(audit.criteria).length,13,audit.slug+' missing criteria');
  assert.equal(computeV52Scorecard(audit).final,expectedNative[audit.slug],audit.slug+' native calculation');
  assert.equal(audit.ruleDeductions.reduce((s,r)=>s+r.points,0),10-audit.criteria.B2.points,audit.slug+' clause cost');
  assert.ok(!gate.approvals.some(x=>x.slug===audit.slug),'Unapproved score is public: '+audit.slug);
}
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
