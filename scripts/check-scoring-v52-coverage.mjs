import assert from 'node:assert/strict';
import queue from '../app/data/scoring-v52-priority-coverage-2026-11-22.json' with {type:'json'};
import converted from '../app/data/scoring-v52-all-existing-audits-2026-11-21.json' with {type:'json'};
import published from '../app/data/scoring-v52-published.json' with {type:'json'};
import native from '../app/data/scoring-v52-new-audits.json' with {type:'json'};
import statuses from '../app/data/scoring-v52-c04-operational-status-review-2026-11-22.json' with {type:'json'};
import {computeV52Scorecard} from '../app/lib/scoringV52.ts';
const unique=new Set(queue.rows.map(x=>x.slug));
assert.equal(queue.version,'5.2');
assert.equal(queue.rows.length,122);
assert.equal(unique.size,122,'Canonical backlog must contain unique companies');
const states=['v52_publication_gate','v52_recalculated_needs_evidence_check','status_review_no_score','missing_full_13_criterion_audit','v52_native_published'];
const nativeState=queue.rows.filter(x=>x.state==='v52_native_published');
assert.equal(nativeState.length,47);
assert.deepEqual(new Set(nativeState.map(x=>x.slug)),new Set(native.audits.map(x=>x.slug)));
assert.equal(statuses.reviews.length,3);
assert.deepEqual(new Set(statuses.reviews.map(x=>x.slug)),new Set(['one-of-one-funding','tribe-funded','mifunder']));
for(const item of statuses.reviews)assert.equal(queue.rows.find(x=>x.slug===item.slug)?.state,'status_review_no_score');
const expected=[11,24,15,25,47];
for(let i=0;i<states.length;i++){
  const n=queue.rows.filter(x=>x.state===states[i]).length;
  assert.equal(n,expected[i],states[i]+' changed: investigate instead of silently changing the roster');
  assert.equal(n,queue.counts[states[i]]);
}
const inPriority=converted.rows.filter(x=>unique.has(x.slug));
const outside=converted.rows.filter(x=>!unique.has(x.slug));
assert.equal(inPriority.length,35);
assert.equal(outside.length,6);
assert.equal(converted.rows.length,41);
assert.deepEqual(new Set(outside.map(x=>x.slug)),new Set(queue.extraScoredOutside122.map(x=>x.slug)));
assert.deepEqual(new Set(published.approvals.map(x=>x.slug)),new Set(queue.rows.filter(x=>x.state==='v52_publication_gate'||x.state==='v52_native_published').map(x=>x.slug)));
assert.equal(queue.counts.v52_native_score_proposal_needs_approval,0,'Owner-approved native cases must not remain pending');
for(const row of queue.rows){
  const migrated=converted.rows.find(x=>x.slug===row.slug);
  if(row.state==='v52_native_published') {
    const audit=native.audits.find(x=>x.slug===row.slug);
    assert.ok(audit,row.slug+' native audit missing');
    assert.equal(row.v52Candidate,computeV52Scorecard(audit).final,row.slug+' native final score differs');
    assert.equal(Boolean(migrated),false,'Native score wrongly counted as mechanical migration');
  } else if(row.v52Candidate!==null){assert.ok(migrated);assert.equal(row.v52Candidate,migrated.v52)}
  else assert.equal(Boolean(migrated),false,'Unlisted converted firm '+row.slug);
}
console.log('V5.2 priority: 122 unique | 11 prior rollout + 47 native published | 24 migrated evidence checks | 15 status reviews | 25 missing full audits | 6 bonus outside = 41 migrated + 47 native.');
