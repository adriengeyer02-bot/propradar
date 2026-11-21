import assert from 'node:assert/strict';
import batch from '../app/data/scoring-v5-proposals-c03-secondary.json' with { type: 'json' };
import published from '../app/data/scoring-v5-published.json' with { type: 'json' };
import c01 from '../app/data/scoring-v5-proposals-c01.json' with { type: 'json' };
import n01 from '../app/data/scoring-v5-proposals-n01.json' with { type: 'json' };
import { computeV5Scorecard } from '../app/lib/scoringV5.ts';

const c03 = new Set(['the-concept-trading','goat-funded-trader','rebelsfunding','lux-trading-firm','ic-funded','fxrk','tentrade','apex-trader-funding','forex-funds-flow','bespoke-funding-program','sway-funded','nova-funding','nations-trading','the-forex-funder','leveled-up-society','aurafunded','alphaproptraders']);
const old = new Set([...c01.firms,...n01.firms].map(f=>f.slug));
const otherDrafts = new Set(['breakout-prop','axi-select','city-traders-imperium','take-profit-trader','oneup-trader','uprofit-trader','funded-trading-plus','tradefundrr','hyrotrader','fx2-funding','quant-tekel','goat-funded-trader','apex-trader-funding','rebelsfunding','ic-funded','the-concept-trading']);
const expected = {
  'lux-trading-firm':{before:58,blocks:{A:15,B:14,C:15,D:16,E:8},editorial:72,rules:4,final:68},
  tentrade:{before:58,blocks:{A:15,B:13,C:17,D:14,E:6},editorial:67,rules:2,final:65},
  'sway-funded':{before:56,blocks:{A:15,B:16,C:11,D:10,E:6},editorial:60,rules:2,final:58},
  'forex-funds-flow':{before:57,blocks:{A:15,B:13,C:11,D:10,E:6},editorial:57,rules:2,final:55}
};
assert.equal(batch.version,5);
assert.equal(batch.batch,'C03-secondary');
assert.equal(batch.checkedOn,'2026-11-21');
assert.equal(batch.firms.length,4);
const seen=new Set();
for (const f of batch.firms) {
  assert.ok(c03.has(f.slug),'Not a canonical C03 backlog firm');
  assert.ok(!seen.has(f.slug));
  seen.add(f.slug);
  assert.ok(!old.has(f.slug) && !otherDrafts.has(f.slug),'Already V5 audited');
  assert.equal(published.approvals.some(x=>x.slug===f.slug),false,'Publicly approved unexpectedly');
  assert.equal(f.status,'proposition');
  assert.equal(f.checkedOn,'2026-11-21');
  assert.equal(f.closed,false);
  assert.equal(f.contractingEntityMissing,false);
  assert.equal(f.activeUnsuspendedStrikeOff,false);
  assert.equal(Object.keys(f.criteria).length,13);
  const factIds=new Set();
  for (const [name,c] of Object.entries(f.criteria)) {
    assert.ok(c.reason.length>60, f.slug+'/'+name+' lacks reasons');
    assert.ok(c.sources.length && c.sources.every(url=>/^https:\/\/\S+$/.test(url)),f.slug+'/'+name+' lacks URLs');
    for (const id of c.negativeFactIds??[]) {
      assert.ok(!factIds.has(id),f.slug+' double-counted '+id);
      factIds.add(id);
    }
  }
  const score=computeV5Scorecard(f),w=expected[f.slug];
  assert.ok(w,'Unexpected firm '+f.slug);
  assert.equal(f.previousDisplayedScore,w.before);
  assert.deepEqual(score.blocks,w.blocks);
  assert.equal(score.editorialGross,w.editorial);
  assert.equal(score.rulesPenalty,w.rules);
  assert.equal(score.afterRules,w.final);
  assert.equal(score.trustpilotPenalty,0);
  assert.equal(score.safetyCap,null);
  assert.equal(score.final,w.final);
  assert.equal(score.independentPayoutProofLimited,true);
  assert.equal(f.ruleDeductions.length,w.rules/2);
  console.log(f.slug+': '+w.before+' → '+score.final+' | '+score.editorialGross+' Editorial Score − '+score.rulesPenalty+' Restrictive Rules');
}
assert.equal(batch.statusReviews.length,1);
const status=batch.statusReviews[0];
assert.equal(status.slug,'bespoke-funding-program');
assert.ok(c03.has(status.slug));
assert.equal(status.score,null);
assert.equal(status.ownerApprovalRequired,true);
assert.equal(status.previousDisplayedScore,56);
assert.ok(status.sources.some(url=>url.includes('company/14377446')));
assert.equal(published.approvals.some(x=>x.slug===status.slug),false);
console.log('V5 C03-secondary: 4 scored + 1 status, 52 sourced criteria, no public change');
