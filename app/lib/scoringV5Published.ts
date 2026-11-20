/**
 * Strict publication gate: a scored V5 firm must be added here with its
 * complete, sourced 13-criterion card and owner approval. No automatic
 * migration from V4, legacy reviews or proposal-stage audits.
 */
import file from '../data/scoring-v5-published.json';
import type { PropFirm } from './propFirms';
import { computeV5Scorecard, type V5Scorecard } from './scoringV5';

const cards = new Map<string, V5Scorecard>();
for (const card of file.firms as V5Scorecard[]) {
  if (card.status !== 'approuvee') throw Error(`V5: unapproved published card: ${card.slug}`);
  if (cards.has(card.slug)) throw Error(`V5: duplicate published card: ${card.slug}`);
  computeV5Scorecard(card); // hard-fail on incomplete/duplicate evidence
  cards.set(card.slug, card);
}

export function isPublishedV5(slug: string, latestScoreReview?: string): boolean {
  const card = cards.get(slug);
  return Boolean(card && (!latestScoreReview || latestScoreReview <= card!.checkedOn));
}

export function getPublishedV5Score(firm: PropFirm, latestScoreReview?: string) {
  if (!isPublishedV5(firm.slug, latestScoreReview)) return undefined;
  const card = cards.get(firm.slug)!;
  return { ...computeV5Scorecard({
    ...card,
    closed: firm.status === 'Fermée',
    trustpilotActiveNotice: Boolean(firm.reviewSignals.trustpilotRatingWithheld),
  }), checkedOn: card.checkedOn };
}
