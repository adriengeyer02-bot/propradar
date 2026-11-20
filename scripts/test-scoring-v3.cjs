#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

require.extensions['.ts'] = (mod, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  mod._compile(outputText, filename);
};

const { computeScoringV3, V3_CRITERIA, V3_AXIS_MAX } = require(path.resolve(__dirname, '../app/lib/scoringV3.ts'));
assert.deepEqual(V3_AXIS_MAX, { payouts: 40, contract: 25, identity: 15, offer: 15, history: 5 });

function makeCard(verified = false) {
  const criteria = Object.fromEntries(Object.entries(V3_CRITERIA).map(([key, { max }]) => [key, {
    status: verified ? 'verified' : 'unverified',
    ...(verified ? { points: max } : {}),
    rationale: verified ? 'Source officielle ou indépendante vérifiée pour ce critère.' : 'Vérification toujours nécessaire.',
    sourceUrls: verified ? ['https://example.org/official-terms'] : [],
  }]));
  return {
    slug: 'scoring-test', reviewedAt: '2026-11-20', criteria,
    payoutEvidenceKind: verified ? 'independent' : 'unverified',
    ...(verified ? { independentPayoutSourceUrl: 'https://research.example.org/independent-transfer' } : {}),
    sourceChecklist: verified ? {
      payoutPolicy: 'https://example.org/payouts',
      contractTerms: 'https://example.org/terms',
      legalIdentity: 'https://registry.example.org/company',
      offerPage: 'https://example.org/pricing',
      consumerReviews: 'https://www.trustpilot.com/review/example.org',
    } : {},
    closed: false,
  };
}

const neutral = computeScoringV3(makeCard());
assert.equal(neutral.editorial, 50, 'unknown facts receive neutral half credit');
assert.equal(neutral.confidence, 'C', 'unknown facts do not certify reliability');
assert.equal(neutral.canPublish, false, 'missing core sources blocks publication');
assert.equal(neutral.unverifiedCriteria.length, 15);

const audited = computeScoringV3(makeCard(true));
assert.equal(audited.editorial, 100);
assert.equal(audited.final, 100);
assert.equal(audited.confidence, 'A');
assert.equal(audited.canPublish, true);

const notice = makeCard(true);
notice.trustpilotNotice = { noticeActive: true, checkedAt: '2026-11-20',
  sourceUrl: 'https://www.trustpilot.com/review/example.org', adverseFactId: 'trustpilot-notice-2026-11-20' };
assert.equal(computeScoringV3(notice).final, 94, 'Trustpilot gets exactly -6, no cap');
notice.closed = true;
assert.equal(computeScoringV3(notice).final, 29, 'closed firm is capped and archived');

const badNeutral = makeCard();
badNeutral.criteria.payoutEvidence.points = 0;
assert.throws(() => computeScoringV3(badNeutral), /half credit/);

const noSource = makeCard(true);
noSource.criteria.earnedRewardProtection.sourceUrls = [];
assert.throws(() => computeScoringV3(noSource), /needs a source/);

const falseIndependence = makeCard(true);
falseIndependence.payoutEvidenceKind = 'firm-reported';
assert.throws(() => computeScoringV3(falseIndependence), /independently verified/i);

const duplicate = makeCard(true);
duplicate.criteria.payoutTerms.adverseFactIds = ['same-event'];
duplicate.criteria.earnedRewardProtection.adverseFactIds = ['same-event'];
assert.throws(() => computeScoringV3(duplicate), /Duplicate/);

const duplicateTrustpilot = makeCard(true);
duplicateTrustpilot.criteria.reviewSourceQuality.adverseFactIds = ['fake-review-notice'];
duplicateTrustpilot.trustpilotNotice = { noticeActive: true, checkedAt: '2026-11-20',
  sourceUrl: 'https://www.trustpilot.com/review/example.org', adverseFactId: 'fake-review-notice' };
assert.throws(() => computeScoringV3(duplicateTrustpilot), /not double counted/);

const unverifiedIncident = makeCard();
unverifiedIncident.criteria.payoutIncidentReview.adverseFactIds = ['unverified-complaint'];
assert.throws(() => computeScoringV3(unverifiedIncident), /without verification/);

const fakeNotice = makeCard(true);
fakeNotice.trustpilotNotice = { noticeActive: true, checkedAt: '2026-11-20',
  sourceUrl: 'https://trustpilot.com.evil.example/review/demo', adverseFactId: 'fake-notice' };
assert.throws(() => computeScoringV3(fakeNotice), /directly to Trustpilot/);

console.log('V3 scoring: 11 invariant checks passed (budgets, evidence, neutrality, deduplication, Trustpilot, closure).');
