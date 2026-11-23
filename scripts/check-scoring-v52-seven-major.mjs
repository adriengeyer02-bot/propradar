/** Seven last previously unaudited major PropRadar V5.2 source scorecards, 23 Nov 2026.
 * Execute: node scripts/check-scoring-v52-seven-major.mjs
 * These 7 draft proposals must NEVER become public merely by importing the JSON.
 */
import assert from 'node:assert/strict';
import data from '../app/data/scoring-v52-seven-major-audits-2026-11-23.json' with {type:'json'};
import published from '../app/data/scoring-v52-published.json' with {type:'json'};
import {computeV52Scorecard} from '../app/lib/scoringV52.ts';

const expected={'e8-markets':58,'brightfunded':56,'instant-funding':56,'hola-prime':60,'pipfarm':56,'trade-the-pool':57,'for-traders':48};
const originals={'e8-markets':72,'brightfunded':72,'instant-funding':72,'hola-prime':72,'pipfarm':71,'trade-the-pool':70,'for-traders':70};
const officialWithheld=new Set(['e8-markets','brightfunded','instant-funding','pipfarm','for-traders']);
assert.equal(data.version,'5.2');
assert.equal(data.count,7);
assert.equal(data.cards.length,7);
assert.equal(data.publication,'NOT APPROVED — RESEARCH PROPOSALS ONLY');
assert.equal(data.ownerApprovalRequired,true);
assert.equal(data.liveScoreChanges,0);
assert.equal(data.ckCapitalUnchanged,true);
assert.deepEqual(new Set(data.cards.map(x=>x.card.slug)),new Set(Object.keys(expected)));
const live=new Set(published.approvals.map(x=>x.slug));
assert.equal(live.size,90,'90 previously approved scores remain public unchanged');
assert.ok(!live.has('ck-capital'),'CK Capital explicit owner veto');
for(const item of data.cards){
  const card=item.card;
  assert.ok(!live.has(card.slug),card.slug+' incorrectly released');
  assert.equal(card.status,'proposition',card.slug+' is not owner-approved');
  assert.equal(item.ownerApproval,false);
  assert.equal(card.checkedOn,'2026-11-23');
  assert.equal(card.previousDisplayedScore,originals[card.slug]);
  assert.equal(card.trustpilotActiveNotice,officialWithheld.has(card.slug));
  assert.equal(Object.keys(card.criteria).length,13);
  assert.equal(item.legalPrimaryRegistryVerified,false);
  assert.equal(item.independentPayoutSixLinkVerified,false);
  const calc=computeV52Scorecard(card);
  assert.equal(calc.final,expected[card.slug],card.slug+' arithmetic');
  assert.equal(calc.final,item.proposedScore);
  assert.equal(calc.afterRules,item.raw);
  assert.equal(calc.trustpilotPenalty,item.trustpilotPenalty);
  assert.equal(calc.payoutEvidenceCap,item.payoutEvidenceCap);
  assert.deepEqual(calc.blocks,item.pillars);
  assert.equal(item.change,item.proposedScore-card.previousDisplayedScore);
  assert.equal(calc.ruleDeductions.length,card.ruleDeductions.length);
  assert.equal(calc.rulesPenalty,10-card.criteria.B2.points);
}
assert.equal(data.cards.filter(x=>x.card.trustpilotActiveNotice).length,5);
assert.deepEqual(new Set(data.cards.filter(x=>x.card.ruleDeductions.length).map(x=>x.card.slug)),new Set(['trade-the-pool','for-traders']));
console.log('V5.2 seven new major firms: 13x7 sourced criteria, seven conditional scores, five exact-domain Trustpilot -6, two unique B2 clauses; all seven unpublished, CK veto preserved, 90 live untouched.');
