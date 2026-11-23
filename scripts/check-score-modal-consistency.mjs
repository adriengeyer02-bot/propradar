/**
 * Regression audit for the shared score modal across PropRadar's published V4,
 * V5.2 migrations, V5.2 native cards and older, not-yet-migrated files.
 * Does not write scores or publish any audit.
 * Run on Node 24: node scripts/check-score-modal-consistency.mjs
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ruleAmountDisplay } from '../app/lib/ruleAmountDisplay.ts';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const source=(path)=>readFileSync(join(root,path),'utf8');
const json=(path)=>JSON.parse(source(path));

// 15 translated interfaces must show the same audit state, not stale numbers.
const locales=['en','fr','de','it','es','pt','zh','ja','hi','tr','ar','ko','sw','ha','am'];
const localeSource=source('app/lib/scoreRuleCopy.ts');
for(const locale of locales)assert.match(localeSource,new RegExp('\\s'+locale+': \\{'),locale+' missing score wording');
assert.equal(ruleAmountDisplay(null,false,0).kind,'pending');
assert.deepEqual(ruleAmountDisplay(null,true,0),{kind:'applied',points:0});
assert.deepEqual(ruleAmountDisplay(null,true,3),{kind:'applied',points:3});
assert.deepEqual(ruleAmountDisplay(8,true,0),{kind:'included',points:8});
assert.deepEqual(ruleAmountDisplay(0,true,0),{kind:'included',points:0});
assert.throws(()=>ruleAmountDisplay(-1,true,0));

// All individually approved V4 firms: B1/B4 missing points are ALREADY in score.
const v4Src=source('app/lib/scoringV4Published.ts');
const manifestBlock=v4Src.match(/V4_PUBLISHED_SLUGS\s*=\s*\[([\s\S]*?)\]\s*as const/);
assert.ok(manifestBlock,'Cannot find canonical V4 public gate');
const v4Slugs=[...manifestBlock[1].matchAll(/'([a-z0-9-]+)'/g)].map(m=>m[1]);
assert.equal(v4Slugs.length,57);
assert.equal(new Set(v4Slugs).size,57);
const v4Paths=[
  'scoring-v4-batch-1.json','scoring-v4-batch-2.json','scoring-v4-batch-3.json',
  'scoring-v4-batch-4-published.json','scoring-v4-batch-5-published.json',
  'scoring-v4-batch-6-published.json','scoring-v4-completion-c01-published.json',
  'scoring-v4-batch-7-published.json','scoring-v4-batch-8-published.json',
  'scoring-v4-batch-9-published.json'
];
const v4Rows=new Map();
for(const file of v4Paths)for(const row of json('app/data/'+file).firms)v4Rows.set(row.slug,row);
for(const slug of v4Slugs){
  const row=v4Rows.get(slug);
  assert.ok(row,'No audited V4 source for '+slug);
  const b1=row.criteria?.B1?.points??row.scores?.B?.[0];
  const b4=row.criteria?.B4?.points??row.scores?.B?.[3];
  assert.ok(Number.isInteger(b1)&&b1>=0&&b1<=15,slug+' B1 not verifiable');
  assert.ok(Number.isInteger(b4)&&b4>=0&&b4<=5,slug+' B4 not verifiable');
  const missing=15-b1+5-b4;
  assert.equal(ruleAmountDisplay(missing,true,0).points,missing,slug+' V4 double accounting');
  const v4Editorial = row.criteria
    ? Object.values(row.criteria).reduce((total,item)=>total+item.points,0)
    : Object.values(row.scores).flat().reduce((total,points)=>total+points,0);
  const displayedBase=v4Editorial+missing;
  assert.ok(displayedBase<=100,slug+' reconstructed V4 base above 100');
  assert.equal(displayedBase-missing,v4Editorial,slug+' dialog arithmetic mismatch');
}
const fxify=v4Rows.get('fxify');
assert.ok(fxify);
assert.equal(15-(fxify.criteria?.B1?.points??fxify.scores?.B?.[0])+5-(fxify.criteria?.B4?.points??fxify.scores?.B?.[3]),8,'FXIFY should show −8 already included');
assert.equal(Object.values(fxify.scores).flat().reduce((sum,n)=>sum+n,0),75,'FXIFY final V4 must remain 75');
assert.equal(75+8,83,'FXIFY reconstructed displayed base must be 83');

// All 121 gate-approved V5.2 firms: exactly one application of B2 and
// Trustpilot and the legal safety ceiling, with NO A3 evidence cap.
const gate=json('app/data/scoring-v52-published.json').approvals;
const ownerRelease=json('app/data/scoring-v52-owner-approved-2026-11-23.json');
const latestRelease=json('app/data/scoring-v52-31-owner-release-2026-11-23.json');
const native=json('app/data/scoring-v52-new-audits.json').audits;
const converted=json('app/data/scoring-v52-all-existing-audits-2026-11-21.json').rows;
const nativeMap=new Map([...native,...ownerRelease.reviewedAudits,...latestRelease.newCards].map(x=>[x.slug,x]));
const convertedMap=new Map(converted.map(x=>[x.slug,x]));
assert.equal(gate.length,121);
assert.ok(!gate.some(x=>x.slug==='ck-capital'));
assert.equal(latestRelease.newCards.length,31);
assert.equal(new Set(gate.map(x=>x.slug)).size,gate.length);
let checkedNative=0,checkedMigrated=0,withDeductions=0;
for(const approval of gate){
  const card=nativeMap.get(approval.slug);
  if(card){
    checkedNative++;
    const points=Object.values(card.criteria).reduce((sum,x)=>sum+x.points,0);
    const penalty=card.ruleDeductions.reduce((sum,x)=>sum+x.points,0);
    assert.equal(penalty,10-card.criteria.B2.points,approval.slug+' B2 mismatch');
    assert.deepEqual(ruleAmountDisplay(null,true,penalty),{kind:'applied',points:penalty});
    const trustpilot=card.trustpilotActiveNotice?6:0;
    const proof=100; // A3 only contributes its 0–5 criterion points
    const legal=(card.contractingEntityMissing||card.activeUnsuspendedStrikeOff)?55:100;
    const expected=card.closed?null:Math.max(0,Math.min(points-trustpilot,proof,legal));
    assert.equal(expected,approval.expectedFinal,approval.slug+' final was changed by modal logic');
    const gross=points+penalty;
    const finalFromSteps=Math.min(Math.min(Math.max(0,gross-penalty-trustpilot),proof),legal);
    assert.equal(finalFromSteps,approval.expectedFinal,approval.slug+' native V5.2 equation mismatch');
    const ids=new Set();
    for(const rule of card.ruleDeductions){
      assert.ok(rule.source.startsWith('https://')&&rule.program&&rule.phase&&rule.consequence,approval.slug+' incomplete B2 clause');
      assert.ok(!ids.has(rule.factId),approval.slug+' duplicate B2 fact');
      ids.add(rule.factId);
    }
    if(penalty>0)withDeductions++;
  } else {
    checkedMigrated++;
    const row=convertedMap.get(approval.slug);
    assert.ok(row,approval.slug+' has no published V5.2 source');
    assert.equal(row.v52,approval.expectedFinal,approval.slug+' V5.2 conversion differed');
    const subtotal=Object.values(row.criteriaV52).reduce((sum,n)=>sum+n,0);
    assert.equal(row.payoutEvidenceCap,100,'Legacy evidence cap should not be active');
    const finalFromSteps=Math.min(Math.max(0,subtotal-row.trustpilotPenalty),row.legalCap);
    assert.equal(finalFromSteps,approval.expectedFinal,approval.slug+' migrated V5.2 equation mismatch');
    const penalty=row.ruleDeductions.reduce((sum,x)=>sum+x.points,0);
    assert.equal(penalty,10-row.criteriaV52.B2,approval.slug+' migrated B2 mismatch');
    assert.equal(ruleAmountDisplay(null,true,penalty).points,penalty);
    if(penalty>0)withDeductions++;
  }
}
assert.equal(checkedNative,85);
assert.equal(checkedMigrated,36);

// Older cards: an unclassified or missing rules audit must never masquerade as
// a confirmed 0-point deduction. Their existing scores are left untouched.
const allUpdates=json('app/data/firm-updates.json').firms;
let classified=0,notClassified=0,withRecords=0;
for(const [slug,update] of Object.entries(allUpdates)){
  const rules=update.restrictiveRules??[];
  if(!rules.length)continue;
  withRecords++;
  const n=rules.filter(r=>r.category&&r.severity&&r.clarity&&r.appliesTo?.length).length;
  classified+=n;
  notClassified+=rules.length-n;
  if(n===0)assert.equal(ruleAmountDisplay(null,false,0).points,null,'Unverified legacy rules must not be zero: '+slug);
}
// Regression: do not reintroduce '75 − 8 = 75' via a UI-only edit.
const page=source('app/[locale]/firm/[slug]/page.tsx');
const modal=source('app/components/ui/ScoreBreakdownDialog.tsx');
assert.ok(page.includes('const displayedBase = breakdown.editorial + v4IncludedLoss;'),'Missing V4 reconstructed baseline');
assert.ok(page.includes('value: breakdown.editorial,') && page.includes('delta: v4IncludedLoss'),'Missing V4 rules subtraction');
assert.ok(modal.includes('const scoreReconciles ='),'Missing arithmetic consistency check');
assert.ok(modal.includes('editorial.value - effectiveRuleDelta - adjustmentLoss'),'Missing exact score equation');
assert.ok(modal.includes('{showEquation ? ('),'Missing equation display');
const catalog=[...new Set([...source('app/lib/propFirms.ts').matchAll(/\bslug:\s*['"]([a-z0-9-]+)['"]/g)].map(m=>m[1]))];
assert.ok(catalog.length>=150,'Unexpectedly small base catalog; recheck data source');
console.log(JSON.stringify({catalogEntries:catalog.length,updates:Object.keys(allUpdates).length,ruleRecords:withRecords,classifiedRules:classified,unclassifiedRules:notClassified,v4Audited:v4Slugs.length,v52Native:checkedNative,v52Migrated:checkedMigrated,v52WithB2Deductions:withDeductions,locales:locales.length,passed:true},null,2));
