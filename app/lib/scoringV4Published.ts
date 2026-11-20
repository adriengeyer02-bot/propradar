/**
 * Opt-in V4 score migration, approved by the owner on 2026-11-20.
 *
 * Only medium-confidence, individually enumerated dossiers are published.
 * A proposal with limited confidence, or a blocked audit, stays on the legacy
 * scoring pipeline. Claude's per-programme work is left fully intact.
 */
import batch1 from '../data/scoring-v4-batch-1.json';
import batch2 from '../data/scoring-v4-batch-2.json';
import batch3 from '../data/scoring-v4-batch-3.json';
import batch4Published from '../data/scoring-v4-batch-4-published.json';
import batch5Published from '../data/scoring-v4-batch-5-published.json';
import batch6Published from '../data/scoring-v4-batch-6-published.json';
import completionC01Published from '../data/scoring-v4-completion-c01-published.json';
import batch7Published from '../data/scoring-v4-batch-7-published.json';
import type { PropFirm } from './propFirms';
import { computeV4Scorecard, V4_BLOCKS, type V4Scorecard, type V4Criterion, type V4Assessment } from './scoringV4';

type CompactReview = {
  slug: string;
  before: number;
  confidence: 'moyenne' | 'limitee';
  scores: Record<'A' | 'B' | 'C' | 'D' | 'E', number[]> | null;
  sources: Record<'payout' | 'contract' | 'program' | 'entity' | 'offer', string>;
  finding?: string;
  findingSource?: string;
  b1?: string;
  b2?: string;
  b3?: string;
  hold: string;
};

/** These firms, and only these, may replace their publicly displayed legacy rating. */
export const V4_PUBLISHED_SLUGS = [
  'ftmo', 'topstep', 'the5ers',
  'trade-the-pool', 'audacity-capital', 'myfundedfutures', 'tradeify',
  'earn2trade', 'fundednext', 'instant-funding', 'the-trading-pit', 'e8-markets', 'fintokei',
  'fxify', 'funderpro', 'funding-pips', 'brightfunded', 'pipfarm', 'for-traders',
  'leeloo-trading', 'funding-traders', 'ftuk', 'aqua-funded', 'hantec-trader',
  'hola-prime', 'lark-funding', 'bulenox', 'finotive-funding', 'ment-funding',
  'elite-trader-funding', 'crypto-fund-trader', 'myfundedcapital', 'blue-guardian', 'atlas-funded',
  'traders-launch', 'funded-bull', 'ofp-funding',
  'alpha-capital-group', 'maven-trading',
  // Claude, lot N01 (2026-11-20): medium-confidence audits only.
  'get-leveraged', 'miltraders', 'top-one-trader', 'alpha-futures', 'bem-funding', 'upcomers', 'thinkcapital', 'tiger-funded',
] as const;

type FullReview = (typeof batch1.firms)[number];
const approved = new Set<string>(V4_PUBLISHED_SLUGS);
const reviews = new Map<string, FullReview | CompactReview>();
for (const row of batch1.firms) reviews.set(row.slug, row);
for (const row of batch2.firms as CompactReview[]) reviews.set(row.slug, row);
for (const row of batch3.firms as CompactReview[]) reviews.set(row.slug, row);
for (const row of batch4Published.firms as CompactReview[]) reviews.set(row.slug, row);
for (const row of batch5Published.firms as CompactReview[]) reviews.set(row.slug, row);
for (const row of batch6Published.firms as CompactReview[]) reviews.set(row.slug, row);
for (const row of completionC01Published.firms as CompactReview[]) reviews.set(row.slug, row);
for (const row of batch7Published.firms as CompactReview[]) reviews.set(row.slug, row);

if (approved.size !== V4_PUBLISHED_SLUGS.length || approved.size !== 47) throw Error('V4: publication manifest must contain exactly 47 unique firms');
for (const slug of approved) {
  const row = reviews.get(slug);
  if (!row || row.confidence !== 'moyenne' || ('scores' in row && row.scores === null)) {
    throw Error(`V4: refuse publication of incomplete audit: ${slug}`);
  }
}

function compactCard(firm: PropFirm, raw: CompactReview, checkedOn: string): V4Scorecard {
  if (!raw.scores) throw Error(`V4: incomplete audit ${raw.slug}`);
  const external = firm.payoutProofs?.find((proof) => proof.firmReported === false) || firm.payoutProofs?.[0];
  const trustpilot = firm.reviewSignals.trustpilotSourceUrl || firm.regulatoryAudit.sources.find((s) => /trustpilot/i.test(s.url))?.url || raw.sources.entity;
  const contractRisk = raw.b1 || raw.finding || 'Risk of discretionary denial assessed from the contractual documents.';
  const documentation = raw.b2 || raw.finding || 'Programme and contract versions reviewed in the dossier.';
  const rights = raw.b3 || raw.hold;
  const evidence: Record<V4Criterion, { reason: string; sources: string[] }> = {
    A1: { reason: `Programme payout terms; ${raw.hold}`, sources: [raw.sources.payout] },
    A2: { reason: `No independent determination of an unjustified refusal from a contractual clause or isolated review. ${raw.hold}`, sources: [trustpilot] },
    A3: { reason: external ? `Payout example: ${external.quote || 'dated payment signal'}; not a general payout-success rate.` : 'Independent proof incomplete; this is not a presumed failure to pay.', sources: [external?.url || raw.sources.payout] },
    B1: { reason: contractRisk, sources: [raw.sources.contract, raw.findingSource || raw.sources.contract] },
    B2: { reason: documentation, sources: [raw.sources.program] },
    B3: { reason: rights, sources: [raw.sources.contract] },
    B4: { reason: `Programme restrictions are retained for the product menus. Clear risk limits and consistency rules are not punished automatically. ${raw.hold}`, sources: [raw.sources.program] },
    C1: { reason: `Contracting entity and registry still require case-specific verification. ${raw.hold}`, sources: [raw.sources.entity] },
    C2: { reason: 'Address, governing law and remedies assessed by programme, without implying regulatory protection.', sources: [raw.sources.entity] },
    C3: { reason: 'Regulator lookup is not exhaustive; do not infer clearance from a partial search.', sources: ['https://www.fca.org.uk/scamsmart/warning-list'] },
    D1: { reason: 'Comparable entry fee and additional costs assessed without temporary promo effects.', sources: [raw.sources.offer] },
    D2: { reason: 'Reward split and frequency assessed on the relevant offer.', sources: [raw.sources.offer] },
    D3: { reason: 'Programme drawdown assessed as an offer characteristic, not a hidden-rules offence.', sources: [raw.sources.program] },
    E1: { reason: 'Service continuity assessed, company age alone is not enough.', sources: [raw.sources.entity] },
    E2: { reason: 'User reviews contextualised. A current withheld-rating notice is deducted only once, outside the editorial blocks.', sources: [trustpilot] },
    E3: { reason: 'Platform and provider continuity partly verified through programme documentation.', sources: [raw.sources.program] },
  };
  const criteria = {} as V4Scorecard['criteria'];
  for (const [block, ids] of Object.entries(V4_BLOCKS) as [keyof typeof V4_BLOCKS, readonly V4Criterion[]][]) {
    ids.forEach((id, index) => {
      const item: V4Assessment = {
        points: raw.scores![block][index],
        verification: ['B1', 'B4', 'D3'].includes(id) ? 'verifie' : 'partiel',
        reason: evidence[id].reason,
        sources: evidence[id].sources,
      };
      if (id === 'B1' && /discretion|arbitra|subjectiv|vague|flou/i.test(contractRisk)) item.negativeFactIds = [`${raw.slug}:contractual-reward-risk`];
      criteria[id] = item;
    });
  }
  return {
    slug: raw.slug, checkedOn, status: 'approuvee', confidence: 'moyenne',
    previousDisplayedScore: raw.before,
    trustpilotActiveNotice: Boolean(firm.reviewSignals.trustpilotRatingWithheld),
    closed: firm.status === 'Fermée', criteria,
  };
}

export function isPublishedV4(slug: string, latestScoreReview?: string): boolean {
  return approved.has(slug) && (!latestScoreReview || latestScoreReview <= '2026-11-20');
}

export type PublishedV4Score = ReturnType<typeof computeV4Scorecard> & { checkedOn: string };

/** Compute a published V4 card independently of the historical score pipeline. */
export function getPublishedV4Score(firm: PropFirm, latestScoreReview?: string): PublishedV4Score | undefined {
  if (!approved.has(firm.slug) || firm.status === 'Fermée') return undefined;
  const row = reviews.get(firm.slug)!;
  const checkedOn = 'checkedOn' in row ? row.checkedOn : batch3.checkedOn;
  if (latestScoreReview && latestScoreReview > checkedOn) return undefined;
  const card: V4Scorecard = 'criteria' in row
    ? { ...row, status: 'approuvee', trustpilotActiveNotice: Boolean(firm.reviewSignals.trustpilotRatingWithheld), closed: false } as V4Scorecard
    : compactCard(firm, row, checkedOn);
  return { ...computeV4Scorecard(card), checkedOn };
}
