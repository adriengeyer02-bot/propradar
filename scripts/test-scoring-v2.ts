import assert from 'node:assert/strict';
import { calculateScoringV2, type FirmScoringV2Input } from '../app/lib/scoringV2';

const example: FirmScoringV2Input = {
  slug: 'example',
  status: 'Active',
  reviewedAt: '2026-11-19',
  payoutEvidence: 'independent',
  legalEvidence: 'registry-verified',
  coverage: {
    officialRulesUrl: 'https://example.com/rules',
    payoutPolicyUrl: 'https://example.com/payout',
    legalEntityUrl: 'https://example.com/legal',
    reputationSourceUrl: 'https://www.trustpilot.com/review/example.com',
    independentlyVerifiedPayoutUrl: 'https://independent.example.org/payout-proof',
    independentRegistryUrl: 'https://registry.example.org/company/example',
  },
  offer: {
    priceAndFees: 4,
    programFlexibility: 3,
    platformsAndAssets: 3,
    rationale: {
      priceAndFees: 'Official all-in prices compared with matching challenge models.',
      programFlexibility: 'Three documented programmes with different objectives.',
      platformsAndAssets: 'Official pages list supported platforms and instruments.',
    },
    sourceUrls: ['https://example.com/pricing'],
  },
  findings: [
    {
      eventId: 'tp:example.com:2026-11',
      axis: 'integrity',
      deduction: 6,
      summary: 'Trustpilot currently withholds the score after a guideline breach.',
      sourceUrl: 'https://www.trustpilot.com/review/example.com',
      evidenceKind: 'trustpilot-notice',
      claimType: 'integrity-notice',
    },
    {
      eventId: 'contract:example:minimum-days',
      axis: 'rules',
      deduction: 1,
      summary: 'Official programme page states a clear minimum-day rule.',
      sourceUrl: 'https://example.com/rules',
      evidenceKind: 'official-contract',
      claimType: 'contractual-risk',
    },
  ],
};

assert.deepEqual(calculateScoringV2(example).axes, {
  payout: 35, rules: 29, legal: 15, integrity: 4, offer: 10,
});
assert.equal(calculateScoringV2(example).score, 93);
assert.equal(calculateScoringV2(example).confidence, 'A');
assert.equal(calculateScoringV2(example).rankingEligible, true);

const limitedButNotAccused = calculateScoringV2({
  ...example,
  payoutEvidence: 'published-terms-only',
  legalEvidence: 'declared-only',
  coverage: { ...example.coverage, independentlyVerifiedPayoutUrl: undefined },
});
assert.equal(limitedButNotAccused.score, 78);
assert.equal(limitedButNotAccused.confidence, 'B');
assert.equal(limitedButNotAccused.axes.payout, 25);

const companyClaimMissingEvidence = calculateScoringV2({ ...example, payoutEvidence: 'company-reported' });
assert.equal(companyClaimMissingEvidence.score, undefined);
assert.ok(companyClaimMissingEvidence.errors.some((error) => error.includes('Company-reported payout')));

const disguisedCompanyProof = calculateScoringV2({
  ...example,
  coverage: { ...example.coverage, independentlyVerifiedPayoutUrl: 'https://example.com/self-issued-payout-proof' },
});
assert.equal(disguisedCompanyProof.score, undefined);
assert.ok(disguisedCompanyProof.errors.some((error) => error.includes('firm-hosted payout')));

const registryMissing = calculateScoringV2({
  ...example,
  coverage: { ...example.coverage, independentRegistryUrl: undefined },
});
assert.equal(registryMissing.score, undefined);
assert.ok(registryMissing.errors.some((error) => error.includes('Registry verification')));

const independentEvents: FirmScoringV2Input = {
  ...example,
  findings: [
    {
      eventId: 'contract:hidden-cancellation',
      axis: 'rules', deduction: 12, summary: 'A vague official clause voids earned rewards.',
      sourceUrl: 'https://example.com/terms', evidenceKind: 'official-contract', claimType: 'contractual-risk',
    },
    {
      eventId: 'court:nonpayment',
      axis: 'payout', deduction: 15, summary: 'An independent final ruling found unjustified nonpayment.',
      sourceUrl: 'https://example.com/court-document', evidenceKind: 'regulator-or-court', claimType: 'established-event',
    },
  ],
};
assert.equal(calculateScoringV2(independentEvents).score, 73);

const duplicateFact = calculateScoringV2({
  ...example,
  findings: [...example.findings, { ...example.findings[0], axis: 'rules' }],
});
assert.equal(duplicateFact.score, undefined);
assert.ok(duplicateFact.errors.some((error) => error.includes('Duplicate')));

const unverifiedComplaint = calculateScoringV2({
  ...example,
  findings: [{
    eventId: 'complaint:one-trader', axis: 'payout', deduction: 15,
    summary: 'One buyer alleges a missing payout.', sourceUrl: 'https://example.com/review',
    evidenceKind: 'unverified-complaint', claimType: 'established-event',
  }],
});
assert.equal(unverifiedComplaint.score, undefined);
assert.ok(unverifiedComplaint.errors.some((error) => error.includes('Unverified complaint')));

const misclassifiedClause = calculateScoringV2({
  ...example,
  findings: [{
    eventId: 'one-hidden-clause', axis: 'payout', deduction: 15,
    summary: 'An official clause makes payout conditional on unspecified approval.',
    sourceUrl: 'https://example.com/terms',
    evidenceKind: 'official-contract', claimType: 'contractual-risk',
  }],
});
assert.equal(misclassifiedClause.score, undefined);
assert.ok(misclassifiedClause.errors.some((error) => error.includes('payout penalty')));

const forgedReviewSource = calculateScoringV2({
  ...example,
  findings: [{ ...example.findings[0], sourceUrl: 'https://fake-trustpilot.com/review/example.com' }],
});
assert.equal(forgedReviewSource.score, undefined);
assert.ok(forgedReviewSource.errors.some((error) => error.includes('Trustpilot notice')));

const incomplete = calculateScoringV2({ ...example, coverage: { officialRulesUrl: 'https://example.com/rules' } });
assert.equal(incomplete.score, undefined);
assert.equal(incomplete.confidence, 'C');
assert.equal(incomplete.rankingEligible, false);

const closed = calculateScoringV2({ ...example, status: 'Fermée' });
assert.equal(closed.rankingEligible, false);
assert.match(closed.excludedReason ?? '', /Closed/);

console.log('scoringV2: evidence, arithmetic, provenance and anti-double-counting checks passed');
