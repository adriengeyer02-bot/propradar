import assert from 'node:assert/strict';
import proposals from '../app/data/scoring-v5-proposals-c03-priority.json' with { type: 'json' };
import current from '../app/data/scoring-v5-published.json' with { type: 'json' };
import c01 from '../app/data/scoring-v5-proposals-c01.json' with { type: 'json' };
import n01 from '../app/data/scoring-v5-proposals-n01.json' with { type: 'json' };
import { computeV5Scorecard } from '../app/lib/scoringV5.ts';

const c03 = new Set(['the-concept-trading','goat-funded-trader','rebelsfunding','lux-trading-firm','ic-funded','fxrk','tentrade','apex-trader-funding','forex-funds-flow','bespoke-funding-program','sway-funded','nova-funding','nations-trading','the-forex-funder','leveled-up-society','aurafunded','alphaproptraders']);
const oldProposals = new Set([...c01.firms, ...n01.firms].map(x => x.slug));
// These two drafts are not merged into main; protect against accidental re-audits.
const unmergedC01 = new Set(['breakout-prop','axi-select','city-traders-imperium','take-profit-trader','oneup-trader','uprofit-trader','funded-trading-plus']);
const unmergedC02C04 = new Set(['tradefundrr','hyrotrader','fx2-funding','quant-tekel']);
const unmergedExtra = new Set(['fxify','funderpro','funding-pips','leeloo-trading','ftuk','bulenox']);
const expected = {
  'goat-funded-trader': { before:59, blocks:{A:22,B:13,C:14,D:12,E:8}, editorial:71, rules:2, trustpilot:6, final:63 },
  'apex-trader-funding': { before:57, blocks:{A:17,B:8,C:14,D:14,E:8}, editorial:63, rules:2, trustpilot:0, final:61 },
  'rebelsfunding': { before:59, blocks:{A:15,B:16,C:11,D:18,E:7}, editorial:69, rules:2, trustpilot:0, final:67 },
};
assert.equal(proposals.version,5);
assert.equal(proposals.batch,'C03-priority');
assert.equal(proposals.checkedOn,'2026-11-21');
assert.equal(proposals.firms.length,3);
const seen=new Set();
for (const f of proposals.firms) {
  assert.ok(c03.has(f.slug), f.slug + ' not in canonical C03 122-firm roster');
  assert.ok(!(oldProposals.has(f.slug)||unmergedC01.has(f.slug)||unmergedC02C04.has(f.slug)||unmergedExtra.has(f.slug)), f.slug + ' was previously audited');
  assert.ok(!seen.has(f.slug),f.slug + ' duplicate');
  seen.add(f.slug);
  assert.equal(f.status,'proposition');
  assert.equal(f.checkedOn,'2026-11-21');
  assert.equal(current.approvals.some(a=>a.slug===f.slug),false,f.slug+' already public');
  assert.equal(f.closed,false);
  assert.equal(f.contractingEntityMissing,false);
  assert.equal(f.activeUnsuspendedStrikeOff,false);
  assert.equal(Object.keys(f.criteria).length,13);
  for(const [code,c] of Object.entries(f.criteria)){
    assert.ok(c.reason.length>60, f.slug+'/'+code+' unsupported');
    assert.ok(c.sources.length>=1 && c.sources.every(u=>/^https:\/\/[^\s]+$/.test(u)),f.slug+'/'+code+' invalid sources');
  }
  const s=computeV5Scorecard(f),w=expected[f.slug];
  assert.ok(w,f.slug+' unexpected');
  assert.equal(f.previousDisplayedScore,w.before);
  assert.deepEqual(s.blocks,w.blocks);
  assert.equal(s.editorialGross,w.editorial);
  assert.equal(s.rulesPenalty,w.rules);
  assert.equal(s.trustpilotPenalty,w.trustpilot);
  assert.equal(s.safetyCap,null);
  assert.equal(s.final,w.final);
  assert.equal(s.afterRules,s.editorialGross-s.rulesPenalty,'B2 deducted more than once');
  assert.equal(f.ruleDeductions.length,1,'Exact one distinct ambiguous trading rule');
  assert.equal(f.criteria.B2.negativeFactIds[0],f.ruleDeductions[0].factId);
  console.log(f.slug+': '+w.before+' → '+s.final+'; editorial '+s.editorialGross+' − rules '+s.rulesPenalty+' − Trustpilot '+s.trustpilotPenalty);
}
assert.equal(seen.size,3);
console.log('C03 V5 priority: 3 proposed scorecards, 39 sourced criteria, no public publication');
