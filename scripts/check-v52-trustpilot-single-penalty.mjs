/** Regression: V5.2 final score already includes one official Trustpilot -6.
 * The runtime must not deduct a second -6 when rendering propFirms or score modal.
 * Run: node scripts/check-v52-trustpilot-single-penalty.mjs
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const json=p=>JSON.parse(read(p));
const source=read('app/lib/propFirms.ts');
const manifest=json('app/data/scoring-v52-published.json').approvals;
const cards=[
 ...json('app/data/scoring-v52-new-audits.json').audits,
 ...json('app/data/scoring-v52-owner-approved-2026-11-23.json').reviewedAudits,
 ...json('app/data/scoring-v52-31-owner-release-2026-11-23.json').newCards
];
const migrated=json('app/data/scoring-v52-all-existing-audits-2026-11-21.json').rows;
const cardsBy=new Map(cards.map(x=>[x.slug,x]));
const migratedBy=new Map(migrated.map(x=>[x.slug,x]));
assert.equal(manifest.length,121);
assert.ok(!manifest.some(x=>x.slug==='ck-capital'));
const fn=source.slice(source.indexOf('function applyTrustpilotPenaltyRule('),source.indexOf('function applyV52CapsRule('));
assert.ok(fn.includes("const v52Current = current?.scoringVersion === 5.2 || (!current && isPublishedV52(firm.slug))"));
assert.ok(fn.includes("if (v52Current) {"));
assert.ok(fn.includes("penalty: 0, included: true"));
assert.ok(fn.indexOf("if (v52Current)") < fn.indexOf("score: Math.max(0, firm.score - TRUSTPILOT_NOTICE_PENALTY)"));
assert.equal((fn.match(/score: Math.max\(0, firm.score - TRUSTPILOT_NOTICE_PENALTY\)/g)||[]).length,1);
const rows=manifest.map(x=>{
  const card=cardsBy.get(x.slug),old=migratedBy.get(x.slug);
  assert.ok(card||old,'Missing V5.2 evidence '+x.slug);
  const crit=card?Object.fromEntries(Object.entries(card.criteria).map(([k,v])=>[k,v.points])):old.criteriaV52;
  const raw=Object.values(crit).reduce((a,b)=>a+b,0);
  const withhold=card?.trustpilotActiveNotice??old?.trustpilotPenalty===6;
  const once=withhold?6:0;
  const a3cap=crit.A3<=1?64:crit.A3===2?69:crit.A3===3?79:100;
  const legalcap=card?(card.contractingEntityMissing||card.activeUnsuspendedStrikeOff?55:100):old.legalCap;
  const score=Math.min(raw-once,a3cap,legalcap);
  assert.equal(score,x.expectedFinal,x.slug+' source-derived approved score changed');
  return {slug:x.slug,raw,approved:score,withhold,cap:a3cap,net:raw-once};
});
const affected=rows.filter(x=>x.withhold);
assert.equal(affected.length,45,'Existing 121 scorecards with a -6 withholding notice');
assert.equal(affected.filter(x=>x.approved>70).length,0,'No artificial rating inflation');
assert.equal(Math.max(...rows.map(x=>x.approved)),70);
assert.equal(rows.filter(x=>x.approved>70).length,0);
assert.equal(rows.filter(x=>x.net>70).length,2,'Removing only cap cannot repair full score distribution');
assert.equal(rows.filter(x=>x.net>x.approved).length,4,'Effective A3 caps were only binding on 4 profiles');
console.log('V5.2 scores: 121 correct approvals, 45 Trustpilot -6 already included, no duplicate, CK veto and owner scores intact; max 70 is a separate audit calibration issue.');
