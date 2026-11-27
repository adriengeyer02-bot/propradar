/**
 * Strict publication gate: a scored V5 firm must have an explicit owner
 * approval referencing an exact dated, sourced 13-criterion proposal.
 * The checked date and final score are bound to each approval; changes in
 * evidence on the same date require a fresh audit review before release.
 */
import file from '../data/scoring-v5-published.json';
import c01 from '../data/scoring-v5-proposals-c01.json';
import n01 from '../data/scoring-v5-proposals-n01.json';
import type { PropFirm } from './propFirms';
import { trustpilotPoints } from './trustpilotScoring';
import { computeV5Scorecard, type V5Scorecard } from './scoringV5';

const cards = new Map<string, V5Scorecard>();
const proposals = new Map<string, V5Scorecard>();
for (const card of [...c01.firms, ...n01.firms] as V5Scorecard[]) {
  if (proposals.has(card.slug)) throw Error(`V5: duplicate audit proposal: ${card.slug}`);
  if (card.status !== 'proposition') throw Error(`V5: proposal must stay in draft state: ${card.slug}`);
  proposals.set(card.slug, card);
}
for (const approval of file.approvals) {
  const proposal = proposals.get(approval.slug);
  if (!proposal || cards.has(approval.slug)) throw Error(`V5: missing or duplicate approved proposal: ${approval.slug}`);
  if (proposal.checkedOn !== approval.checkedOn) throw Error(`V5: changed audit requires reapproval: ${approval.slug}`);
  const card: V5Scorecard = { ...proposal, status: 'approuvee' };
  const result = computeV5Scorecard(card); // full evidence and B2 checks
  if (result.final !== approval.expectedFinal) throw Error(`V5: changed score requires reapproval: ${approval.slug}`);
  cards.set(approval.slug, card);
}

export function isPublishedV5(slug: string, latestScoreReview?: string): boolean {
  const card = cards.get(slug);
  return Boolean(card && (!latestScoreReview || latestScoreReview <= card!.checkedOn));
}

export function getPublishedV5Score(firm: PropFirm, latestScoreReview?: string) {
  if (!isPublishedV5(firm.slug, latestScoreReview)) return undefined;
  const card = cards.get(firm.slug)!;
  const historic = computeV5Scorecard({
    ...card,
    closed: firm.status === 'Fermée',
    trustpilotActiveNotice: Boolean(firm.reviewSignals.trustpilotRatingWithheld),
  });
  const trustpilotPenalty = firm.status === 'Fermée' ? 0 : trustpilotPoints(firm.trustpilotRating, firm.reviewSignals.trustpilotReviewCount, Boolean(firm.reviewSignals.trustpilotRatingWithheld));
  const adjusted = Math.max(0, historic.afterRules - trustpilotPenalty);
  const final = firm.status === 'Fermée' ? null : historic.safetyCap === null ? adjusted : Math.min(adjusted, historic.safetyCap);
  return { ...historic, trustpilotPenalty, adjusted, final, checkedOn: card.checkedOn, ruleDeductions: card.ruleDeductions ?? [],
    contractProtection: { points: card.criteria.B1.points, reason: card.criteria.B1.reason, source: card.criteria.B1.sources[0] },
    contractingEntityVerified: card.criteria.C1.points >= 7,
    positivePayoutEvidence: card.criteria.A3.points >= 3 ? {
      reason: card.criteria.A3.reason,
      source: card.criteria.A3.sources.find((url) => url.includes('payoutjunction.com/firms/')) ?? card.criteria.A3.sources[0],
    } : undefined,
  };
}
