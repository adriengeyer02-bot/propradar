/** V5.2 37-case operating status review — buyer warning overlay and no score mutation.
 * Run: node scripts/check-status-37-primary-triage.mjs
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const overlay=JSON.parse(readFileSync(new URL('../app/data/status-review-37-decisions-2026-11-23.json',import.meta.url),'utf8'));
const published=JSON.parse(readFileSync(new URL('../app/data/scoring-v52-published.json',import.meta.url),'utf8'));
const app=readFileSync(new URL('../app/lib/propFirms.ts',import.meta.url),'utf8');
assert.equal(overlay.reviewDate,'2026-11-23');
assert.equal(overlay.firmCount,37);
assert.equal(overlay.rows.length,37);
assert.equal(new Set(overlay.rows.map(x=>x.slug)).size,37);
assert.equal(overlay.ckCapitalVeto,true);
assert.equal(overlay.publishedV52ScoresMustStay,121);
assert.equal(published.approvals.length,121);
assert.ok(!published.approvals.some(x=>x.slug==='ck-capital'));
const total=overlay.rows.filter(x=>x.publicAction==='display_warning_and_disable_new_purchases');
assert.equal(total.length,11);
assert.equal(overlay.publicWarningCount,11);
assert.deepEqual(new Set(total.map(x=>x.slug)),new Set([
  'bespoke-funding-program','blufx','fxci','atfunded','kortanafx',
  'myforexfunds','my-flash-funding','the-funded-trader',
  'tickticktrader','aeon-funded','fxrk'
]));
assert.ok(!total.some(x=>x.slug==='ck-capital'));
for(const r of overlay.rows){
  assert.equal(r.siteStatusDecision,'À surveiller');
  assert.equal(r.payoutSixLinkIndependentlyVerified,false);
  assert.equal(r.finalLegalClosureProvenForBrand,false);
  assert.ok(r.sourceLinks.length>0,r.slug+' no documentary links');
  assert.ok(r.sourceLinks.every(url=>url.startsWith('https://')),r.slug+' malformed link');
  if(r.publicAction==='display_warning_and_disable_new_purchases'){
    assert.ok(r.publicWarning?.length>100,r.slug+' lacks meaningful public wording');
    assert.ok(!r.publicWarning.includes('SCAM'),r.slug+' allegation not substantiated');
  } else assert.equal(r.publicWarning,null,r.slug+' unapproved public status');
}
for(const hard of ['bespoke-funding-program','blufx','fxci'])
  assert.ok(overlay.rows.find(x=>x.slug===hard).sourceLinks.some(url=>url.includes('company-information.service.gov.uk')),hard+' needs primary legal registry');
assert.equal(overlay.rows.find(x=>x.slug==='myforexfunds').classification,'brand_relaunch_new_operator_no_new_payout_verification');
assert.equal(overlay.rows.find(x=>x.slug==='my-flash-funding').classification,'brand_acquired_checkout_successor');
assert.equal(overlay.rows.find(x=>x.slug==='fxrk').classification,'official_regulatory_warning_scope_under_review');
assert.equal(overlay.rows.find(x=>x.slug==='kortanafx').classification,'official_operations_paused');
assert.equal(overlay.rows.find(x=>x.slug==='atfunded').classification,'official_operations_paused');
assert.ok(app.includes('function applyStatusReviewForBuyers('));
assert.ok(app.includes('.map(applyStatusReviewForBuyers)'));
assert.ok(app.includes('products:firm.products.map(product=>({...product,linkToStart:undefined}))'));
assert.ok(app.includes('partnerOffer:undefined'));
assert.ok(!app.includes('score:decision'),'Status overlay must not change numeric editorial scores');
console.log('Status review: 37 dossiers triaged; 11 consumer warnings/unsafe purchase links disabled; 121 approved V5.2 notes and CK veto preserved.');
