/** Research-only gate for V5.2 H: five scorecards from prior corpus with fresh
 * A2/A3/B1/B2 proof checks, no publication or silent replacement of old data. */
import assert from 'node:assert/strict';
import cohort from '../app/data/scoring-v52-cohort-h-sensitive-reaudits-2026-11-22.json' with {type:'json'};
import migrated from '../app/data/scoring-v52-all-existing-audits-2026-11-21.json' with {type:'json'};
import published from '../app/data/scoring-v52-published.json' with {type:'json'};
import {computeV52Scorecard} from '../app/lib/scoringV52.ts';
import a3Watch from '../app/data/scoring-v52-cohort-h-published-a3-verification-queue-2026-11-22.json' with {type:'json'};

const expected={'fxify':69,'blusky-trading':68,'lucid-trading':64,'apex-trader-funding':58,'take-profit-trader':64};
const expectedA3={'fxify':2,'blusky-trading':2,'lucid-trading':1,'apex-trader-funding':1,'take-profit-trader':1};
const expectedA2={'fxify':6,'blusky-trading':6,'lucid-trading':6,'apex-trader-funding':6,'take-profit-trader':6};
assert.equal(cohort.version,'5.2');
assert.equal(cohort.batch,'H');
assert.equal(cohort.status,'draft_not_approved_no_live_change');
assert.equal(cohort.audits.length,5);
assert.equal(new Set(cohort.audits.map(x=>x.slug)).size,5);
assert.equal(published.approvals.length,58,'Live gate must remain untouched');
const live=new Set(published.approvals.map(x=>x.slug));
for(const a of cohort.audits){
  assert.ok(Object.hasOwn(expected,a.slug),a.slug+' not in approved research list');
  assert.equal(a.status,'proposition');
  assert.equal(a.checkedOn,'2026-11-22');
  assert.equal(a.publicationApproved,false);
  assert.equal(a.auditScope.includes('REQUIRE fresh primary verification'),true);
  assert.equal(Object.keys(a.criteria).length,13);
  assert.equal(a.criteria.A2.points,expectedA2[a.slug]);
  assert.equal(a.criteria.A3.points,expectedA3[a.slug]);
  const old=migrated.rows.find(x=>x.slug===a.slug);
  assert.ok(old,'No original sourced migration for '+a.slug);
  assert.equal(old.v52,a.priorMigratedV52);
  assert.ok(!live.has(a.slug),'Blocked migration unexpectedly approved: '+a.slug);
  const r=computeV52Scorecard(a);
  assert.equal(r.final,expected[a.slug],a.slug+' computation differs');
  assert.equal(r.rulesPenalty,10-a.criteria.B2.points,a.slug+' B2 already included');
  assert.equal(a.ruleDeductions.reduce((n,x)=>n+x.points,0),r.rulesPenalty,a.slug+' duplicate B2?');
  for(const c of Object.values(a.criteria)){
    assert.ok(c.sources.length && c.reason.length>40,a.slug+' criterion missing source/reason');
    assert.ok(c.sources.every(url=>url.startsWith('https://')),a.slug+' source not HTTPS');
  }
  assert.equal(a.openChecks.length,3,a.slug+' missing escalation checklist');
}
assert.equal(cohort.audits.find(x=>x.slug==='lucid-trading').criteria.B2.reason.includes('microscalping'),true);
assert.ok(cohort.audits.find(x=>x.slug==='lucid-trading').criteria.B2.reason.includes('plus de 50%'),'Lucid precise threshold must not be treated as unsourced');
assert.equal(a3Watch.population.publishedScores,published.approvals.length);
assert.equal(a3Watch.population.strongA3,4);
assert.deepEqual(new Set(a3Watch.entries.map(x=>x.slug)),new Set(['alpha-capital-group','alpha-futures','top-one-trader','top-one-futures']));
for(const watch of a3Watch.entries){
  assert.ok(watch.A3>=4 && watch.existingSources.length>0,'A3 source queue item invalid '+watch.slug);
  const approval=published.approvals.find(x=>x.slug===watch.slug);
  assert.equal(approval.expectedFinal,watch.publicScore,'No live score may be edited by queue');
}
console.log('Cohort H valid: 5 source-backed V5.2 research drafts, 2 payout-qualification downgrades; 58 public scores remain untouched.');
