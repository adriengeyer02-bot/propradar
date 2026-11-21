import assert from 'node:assert/strict';
import batch from '../app/data/scoring-v5-proposals-c03-status-c04-e8-lucid.json' with { type: 'json' };
import approvals from '../app/data/scoring-v5-published.json' with { type: 'json' };
import c01 from '../app/data/scoring-v5-proposals-c01.json' with { type: 'json' };
import n01 from '../app/data/scoring-v5-proposals-n01.json' with { type: 'json' };
import { computeV5Scorecard } from '../app/lib/scoringV5.ts';

const c03=['the-concept-trading','goat-funded-trader','rebelsfunding','lux-trading-firm','ic-funded','fxrk','tentrade','apex-trader-funding','forex-funds-flow','bespoke-funding-program','sway-funded','nova-funding','nations-trading','the-forex-funder','leveled-up-society','aurafunded','alphaproptraders'];
const pendingStatus=new Set(['fxrk','nova-funding','nations-trading','the-forex-funder','leveled-up-society','aurafunded','alphaproptraders']);
const pendingC04=new Set(['e8-futures','lucid-trading','blusky-trading','blueberry-funded']);
const previousScored=new Set([...c01.firms,...n01.firms].map(x=>x.slug));
const priorDrafts=new Set(['breakout-prop','axi-select','city-traders-imperium','take-profit-trader','oneup-trader','uprofit-trader','funded-trading-plus','tradefundrr','hyrotrader','fx2-funding','quant-tekel','goat-funded-trader','apex-trader-funding','rebelsfunding','ic-funded','the-concept-trading','lux-trading-firm','tentrade','sway-funded','forex-funds-flow']);
const expected={
  'e8-futures':{previous:52,blocks:{A:18,B:15,C:11,D:14,E:6},editorial:64,rules:0,final:64},
  'lucid-trading':{previous:53,blocks:{A:17,B:13,C:17,D:16,E:6},editorial:71,rules:2,final:69},
  'blusky-trading':{previous:53,blocks:{A:23,B:15,C:17,D:16,E:6},editorial:77,rules:0,trustpilot:0,final:77},
  'blueberry-funded':{previous:53,blocks:{A:16,B:18,C:11,D:12,E:7},editorial:64,rules:0,trustpilot:6,final:58}
};
assert.equal(batch.version,5);
assert.equal(batch.checkedOn,'2026-11-21');
assert.equal(batch.firms.length,4);
assert.equal(batch.statusReviews.length,7);
const seen=new Set();
for(const f of batch.firms){
  assert.ok(pendingC04.has(f.slug));
  assert.ok(!previousScored.has(f.slug) && !priorDrafts.has(f.slug));
  assert.ok(!seen.has(f.slug));seen.add(f.slug);
  assert.equal(f.status,'proposition');
  assert.equal(f.checkedOn,batch.checkedOn);
  assert.equal(f.closed,false);
  assert.equal(f.contractingEntityMissing,false);
  assert.equal(f.activeUnsuspendedStrikeOff,false);
  assert.equal(f.trustpilotActiveNotice,f.slug==='blueberry-funded');
  assert.equal(approvals.approvals.some(a=>a.slug===f.slug),false);
  const score=computeV5Scorecard(f), want=expected[f.slug];
  assert.ok(want,f.slug+' unexpected');
  assert.equal(f.previousDisplayedScore,want.previous);
  assert.deepEqual(score.blocks,want.blocks);
  assert.equal(score.editorialGross,want.editorial);
  assert.equal(score.rulesPenalty,want.rules);
  assert.equal(score.afterRules,want.editorial-want.rules);
  assert.equal(score.trustpilotPenalty,want.trustpilot??0);
  assert.equal(score.safetyCap,null);
  assert.equal(score.final,want.final);
  assert.equal(score.independentPayoutProofLimited,f.criteria.A3.points<3);
  assert.equal(Object.keys(f.criteria).length,13);
  for(const [code,item] of Object.entries(f.criteria)){
    assert.ok(item.reason.length>60,f.slug+'/'+code+' missing rationale');
    assert.ok(item.sources.length>=1 && item.sources.every(u=>/^https:\/\/\S+$/.test(u)),f.slug+'/'+code+' missing source');
  }
  console.log(f.slug+': '+want.previous+' → '+score.final+' | editorial '+score.editorialGross+', rules '+score.rulesPenalty);
}
for(const f of batch.statusReviews){
  assert.ok(pendingStatus.has(f.slug) && c03.includes(f.slug),'Not among remaining C03 firm statuses: '+f.slug);
  assert.ok(!previousScored.has(f.slug) && !priorDrafts.has(f.slug));
  assert.ok(!seen.has(f.slug));seen.add(f.slug);
  assert.equal(f.score,null);
  assert.equal(f.ownerApprovalRequired,true);
  assert.equal(f.checkedOn,batch.checkedOn);
  assert.equal(approvals.approvals.some(a=>a.slug===f.slug),false);
  assert.ok(f.sources.length>=2);
  assert.ok(f.finding.length>100);
  console.log(f.slug+': status-review only; no numeric V5 rating');
}
assert.equal(seen.size,9);
console.log('V5 batch validated: 4 full scorecards + 7 C03 status reviews, 0 public approvals');
