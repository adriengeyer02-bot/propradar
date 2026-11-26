/** PropRadar native V5.2: ten large firms newly researched, pending owner approval.
 * Run with Node 24+: node scripts/check-scoring-v52-ten-major.mjs
 */
import assert from 'node:assert/strict';
import data from '../app/data/scoring-v52-ten-major-proposals-2026-11-23.json' with {type:'json'};
import live from '../app/data/scoring-v52-published.json' with {type:'json'};
import {computeV52Scorecard} from '../app/lib/scoringV52.ts';
const expected={ftmo:62,topstep:64,myfundedfutures:62,the5ers:64,fintokei:62,tradeify:62,'audacity-capital':50,myfundedcapital:64,earn2trade:64,fundednext:64};
const old={ftmo:90,topstep:81,myfundedfutures:81,the5ers:78,fintokei:78,tradeify:78,'audacity-capital':77,myfundedcapital:75,earn2trade:74,fundednext:72};
const strict=['A1','A2','A3','B1','B2','C1','C2','C3','D1','D2','D3','E1','E2'];
assert.equal(data.version,'5.2');
assert.equal(data.checkedOn,'2026-11-23');
assert.equal(data.status,'RESEARCH_NOT_OWNER_APPROVED');
assert.equal(data.liveScoreChanges,0);
assert.equal(data.records.length,10);
assert.deepEqual(new Set(data.records.map(x=>x.scorecard.slug)),new Set(Object.keys(expected)));
assert.equal(live.approvals.length,90,'existing approved list must remain unchanged');
const liveSlugs=new Set(live.approvals.map(x=>x.slug));
assert.ok(!liveSlugs.has('ck-capital'),'CK Capital explicit owner veto');
for(const r of data.records){
  const c=r.scorecard;
  assert.ok(!liveSlugs.has(c.slug),c.slug+' is already approved unexpectedly');
  assert.equal(c.status,'proposition',c.slug+' must remain unpublished');
  assert.equal(r.ownerApproved,false);
  assert.equal(r.verifiedTraderPayoutSixLinks,false);
  assert.equal(r.legalPrimaryVerified,false);
  assert.deepEqual(new Set(Object.keys(c.criteria)),new Set(strict));
  assert.equal(c.previousDisplayedScore,old[c.slug]);
  const calc=computeV52Scorecard(c);
  assert.equal(calc.final,expected[c.slug],c.slug+' final arithmetic mismatch');
  assert.equal(calc.final,r.proposedScore);
  assert.equal(calc.afterRules,r.raw);
  assert.deepEqual(calc.blocks,r.pillars);
  assert.equal(calc.trustpilotPenalty,r.trustpilotPenalty);
  assert.equal(calc.payoutEvidenceCap,r.payoutCap);
  assert.equal(r.delta,r.proposedScore-c.previousDisplayedScore);
  assert.equal(c.trustpilotActiveNotice,c.slug==='audacity-capital');
  assert.ok(c.criteria.A3.points<=2,'No A3 elevated without 6-link positive payout validation');
  assert.equal(calc.rulesPenalty,10-c.criteria.B2.points,'No duplicate B2 facts');
  const negatives=[...new Set(c.ruleDeductions.map(x=>x.factId))];
  assert.equal(negatives.length,c.ruleDeductions.length,'No repeated negative fact');
  for(const code of strict){
    const v=c.criteria[code];
    assert.ok(v.reason.length>=40,'Missing meaningful rationale '+c.slug+'/'+code);
    assert.ok(v.sources.length>0&&v.sources.every(url=>url.startsWith('https://')),'Missing evidence URL '+c.slug+'/'+code);
  }
}
assert.equal(data.records.filter(r=>r.scorecard.trustpilotActiveNotice).length,1);
assert.deepEqual(data.records.filter(r=>r.scorecard.ruleDeductions.length>0).map(r=>r.scorecard.slug),['the5ers']);
console.log('V5.2 large firms: 10 researched/130 criterion evaluations, only audacity.capital Trustpilot -6, anti-double-penalty B2, score caps, 90 live unchanged, CK Capital veto preserved.');
