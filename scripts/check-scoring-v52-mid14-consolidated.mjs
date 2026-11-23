/** Verify 14 corrected V5.2 documentary score scenarios, not authorized live scores.
 * Run: node scripts/check-scoring-v52-mid14-consolidated.mjs
 */
import assert from 'node:assert/strict';
import data from '../audits/v52-mid14-consolidated-primary-2026-11-23.json' with {type:'json'};
import live from '../app/data/scoring-v52-published.json' with {type:'json'};
const maxima={A1:10,A2:10,A3:5,B1:15,B2:10,C1:10,C2:6,C3:4,D1:8,D2:6,D3:6,E1:6,E2:4};
const allowed={A2:[0,2,4,6,9,10],B1:[0,3,6,9,12,15],C1:[0,4,7,10],C2:[0,2,3,4,6],C3:[0,2,4],E1:[0,1,2,4,6]};
const affected=new Set(['aqua-funded','finotive-funding','funding-traders','the-trading-pit','crypto-fund-trader','blue-guardian','ofp-funding']);
const expected={'aqua-funded':50,'finotive-funding':50,'funding-traders':55,'rzr-funded':53,'lark-funding':54,'the-trading-pit':57,'ment-funding':58,'elite-trader-funding':59,'atlas-funded':62,'crypto-fund-trader':45,'blue-guardian':49,'traders-launch':62,'ofp-funding':54,'funded-bull':49};
assert.equal(data.version,'5.2');
assert.equal(data.checkedOn,'2026-11-23');
assert.equal(data.records.length,14);
assert.equal(data.noticeCount,7);
assert.equal(data.newPublicRatings,0);
assert.equal(data.reviewRequired,true);
assert.ok(data.status.includes('NOT_PUBLISHABLE'));
assert.deepEqual(new Set(data.records.map(x=>x.slug)),new Set(Object.keys(expected)));
assert.equal(live.approvals.length,90,'90 owner-approved existing scores must remain stable');
const current=new Set(live.approvals.map(x=>x.slug));
assert.ok(!current.has('ck-capital'),'CK Capital must not be approved');
for(const x of data.records){
  assert.equal(x.finalV52,null);
  assert.equal(x.publicationApproved,false);
  assert.equal(x.primaryCurrentStatusVerified,false);
  assert.equal(x.independentSixLinkPayoutVerified,false);
  assert.ok(!current.has(x.slug),'14 firm scenarios must not enter published gate');
  assert.equal(x.trustpilotPenalty,affected.has(x.slug)?6:0,'official exact domain TP signal');
  assert.equal(x.trustpilotRatingWithheldVerified,affected.has(x.slug));
  assert.equal(x.primaryFindings.length>=2,true,x.slug+' missing additional evidence');
  assert.equal(Object.keys(x.criteria).length,13);
  const vals=Object.entries(maxima);
  for(const [k,max] of vals){
    const c=x.criteria[k];
    assert.ok(c, x.slug+'/'+k+' missing criterion');
    assert.ok(Number.isInteger(c.points)&&c.points>=0&&c.points<=max,x.slug+'/'+k+' invalid points');
    if(allowed[k])assert.ok(allowed[k].includes(c.points),x.slug+'/'+k+' invalid V5.2 allowed subscore');
  }
  const sum=vals.reduce((a,[k])=>a+x.criteria[k].points,0);
  assert.equal(sum,x.raw);
  const pillars={A:['A1','A2','A3'],B:['B1','B2'],C:['C1','C2','C3'],D:['D1','D2','D3'],E:['E1','E2']};
  for(const [b,keys] of Object.entries(pillars))assert.equal(keys.reduce((a,k)=>a+x.criteria[k].points,0),x.pillars[b]);
  const a3=x.criteria.A3.points;
  const cap=a3<=1?64:a3===2?69:a3===3?79:100;
  assert.equal(x.payoutEvidenceCap,cap);
  const final=Math.min(Math.max(0,sum-x.trustpilotPenalty),cap);
  assert.equal(final,x.updatedConditionalCalculation);
  assert.equal(final,expected[x.slug]);
  assert.equal(x.changeVersusPriorConditional,final-x.baseline.conditional);
}
assert.equal(data.records.filter(x=>x.trustpilotPenalty===6).length,7);
const ofp=data.records.find(x=>x.slug==='ofp-funding');
assert.equal(ofp.criteria.D3.points,2,'OFP operator/source discrepancy');
assert.equal(ofp.legallyVerifiedHistoricalRename,true);
const tl=data.records.find(x=>x.slug==='traders-launch');
assert.equal(tl.criteria.D2.points,6,'Traders Launch existing-customer rules documented');
assert.equal(tl.criteria.B2.points,10,'No proven retrospective adverse action: do not charge minus 4');
console.log('V5.2 fourteen small/mid audit consolidation: 14 distinct, 182 subcriteria, 7 official exact-domain Trustpilot withheld notices, verified OFP historic Gazette rename, clear unresolved contracts and payout proof; 90 live approvals/CK veto untouched.');
