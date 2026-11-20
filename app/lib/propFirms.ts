Warning: truncated output (original token count: 193588)
Total output lines: 13081

import { applyFirmUpdates, getFirmUpdate } from './firmUpdates';
import { applyPublishedV4 } from './scoringV4Published';
import type { V4ScoreResult } from './scoringV4';
import { computeRulesPenalty, RULES_PENALTY_ENABLED } from './restrictiveRules';
import { narrativeOriginals, stripScoreClaims } from './scoreClaims';
import { toEnglishText } from './i18n';
import { foxxFunded } from './foxxFunded';
import { xFunded } from './xFunded';
import { milTraders } from './milTraders';
import { bullwavesPrime } from './bullwavesPrime';
import { drawdownLabel, formatUsd, hasPayoutRiskSignal, isProvisional, priceLabel, profitSplitLabel } from './firmFormat';
export { drawdownLabel, formatUsd, hasPayoutRiskSignal, isProvisional, priceLabel, profitSplitLabel };

export type Product = {
  id: string;
  name: string;
  type: 'Challenge' | 'Instant funding' | 'Futures evaluation' | 'Scaling';
  description: string;
  accountSizeMin: number;
  accountSizeMax: number;
  entryFeeMin?: number;
  entryFeeMax?: number;
  profitTarget: string;
  maxDailyLoss: string;
  maxDrawdown: string;
  /** Drawdown mechanics verified for this exact programme, never inferred from the firm-wide label. */
  drawdownType?: 'Static' | 'Trailing' | 'EOD' | 'Hybride';
  /** Official programme rule documenting the type, calculation basis and lock behaviour. */
  drawdownSource?: string;
  /** Optional concise detail on calculation, lock level and intra-day enforcement. */
  drawdownDetails?: string;
  profitSplit: string;
  platforms: string[];
  tradableAssets: string[];
  minTradingDays?: string;
  hasConsistencyRule: boolean;
  consistencyRule?: string;
  linkToStart?: string;
  isPopular?: boolean;
};

export type SourceLink = {
  label: string;
  url: string;
};

export type RegulatoryRiskLevel = 'Low' | 'Low to medium' | 'Medium' | 'Medium to high' | 'High' | 'Critical' | 'To audit';

export type PayoutProof = {
  /** Date stated by the source, or the date PropRadar read an undated page. */
  date: string;
  /** official = the firm's own page; press = trade press; onchain = public blockchain data compiled by a named third party. */
  kind: 'official' | 'press' | 'onchain';
  /** Who published it, e.g. "Finance Magnates". */
  publisher: string;
  /** Short statement of the figure; words in quotation marks are verbatim from the source. */
  quote: string;
  url: string;
  /** True when the figure comes from the firm itself (its page, or press relaying its own count). */
  firmReported: boolean;
};

export type RegulatoryEntity = {
  name: string;
  jurisdiction: string;
  registrationNumber?: string;
  registeredAddress?: string;
  role?: string;
};

export type RegulatoryAudit = {
  riskLevel: RegulatoryRiskLevel;
  lastChecked: string;
  summary: string;
  entities: RegulatoryEntity[];
  regulatoryStatus: string[];
  complaintsAndDisputes: string[];
  redFlags: string[];
  sources: SourceLink[];
};

export type ReviewSignals = {
  redditScore: number;
  redditMentions: string;
  redditSignal: 'Positif' | 'Mixte' | 'Négatif' | 'Faible volume';
  redditPositiveMentions?: number;
  redditNegativeMentions?: number;
  redditNeutralMentions?: number;
  redditSampleSize?: number;
  redditConfidence?: 'Faible' | 'Moyenne' | 'Forte';
  redditSource?: 'Revue manuelle' | 'Estimation PropRadar';
  redditFlags?: string[];
  xScore: number;
  xMentions: string;
  xSignal: 'Positif' | 'Mixte' | 'Négatif' | 'Faible volume';
  xPositiveMentions?: number;
  xNegativeMentions?: number;
  xNeutralMentions?: number;
  xSampleSize?: number;
  xConfidence?: 'Faible' | 'Moyenne' | 'Forte';
  xSource?: 'Revue manuelle' | 'Estimation PropRadar' | 'Score brut manuel';
  xFlags?: string[];
  trustpilotReliabilityScore: number;
  trustpilotReliability: 'Forte' | 'Moyenne' | 'Faible' | 'Non évalué';
  trustpilotNote: string;
  trustpilotFlags?: string[];
  trustpilotFlaggedReviewCount?: number;
  trustpilotFlaggedReviewNote?: string;
  /** Trustpilot shows no TrustScore because of a guideline breach. */
  trustpilotRatingWithheld?: boolean;
  trustpilotReviewCount?: number;
  trustpilotSourceUrl?: string;
  manipulationRiskScore?: number;
  manipulationRisk?: 'Faible' | 'Moyen' | 'Élevé' | 'Non évalué';
  payoutRiskScore: number;
  /** 'Non évalué' = no written payout evidence on file: PropRadar makes no payout-risk claim. */
  payoutRisk: 'Faible' | 'Moyen' | 'Élevé' | 'Critique' | 'Non évalué';
  payoutIncidentCount?: number;
  payoutIncidentStatus?:
    | 'Aucun signal fort'
    | 'À surveiller'
    | 'Incidents récurrents'
    | 'Critique'
    | 'No strong signal'
    | 'Watchlist'
    | 'Recurring incidents';
  payoutIssues: string[];
  confidenceDrivers?: string[];
  radarVerdict?: string;
  lastSignalCheck: string;
};

export type PropFirm = {
  id: number;
  slug: string;
  name: string;
  status: 'Active' | 'À surveiller' | 'Fermée';
  score: number;
  /** Source-traced five-block review used for the buyer-facing V4 score. */
  scoreV4?: V4ScoreResult & { checkedOn: string };
  /** Set when a rule lowered the stored score; the firm page states it. */
  scoreCap?: { before: number; cap: number; reason: 'trustpilot-withheld' };
  /** Restrictive-rules penalty (SCORING.md section 2), set when it lowered the score. */
  rulesPenalty?: { before: number; penalty: number };
  /** Trustpilot −6 (SCORING.md 1): applied, or already included in a dated editorial score. */
  trustpilotPenalty?: { before: number; penalty: number; included: boolean };
  /** Closed-firm cap (CLOSED_FIRM_SCORE_CAP), set when it lowered the score. */
  closedCap?: { before: number; cap: number };
  /** Zero when the brand's founding year has not been confirmed. */
  founded: number;
  headquarters: string;
  bestFor: string;
  verdict: string;
  priceFrom: number;
  /** Native fee when no comparable USD fee is confirmed; never an implicit conversion. */
  nativePriceFrom?: { amount: number; currency: 'EUR' | 'GBP' };
  /** True when the official site states there is no entry fee (read on a source, never a default). */
  noEntryFee?: boolean;
  profitSplit: number;
  drawdownType: 'EOD' | 'Trailing' | 'Static' | 'Hybride';
  newsTrading: 'Autorisé' | 'Restreint' | 'Non recommandé' | 'Allowed' | 'Restricted' | 'Not recommended' | 'Variable';
  eaAllowed: 'Oui' | 'Non' | 'Sur demande' | 'Yes' | 'No' | 'On request' | 'Variable';
  payoutDelay: string;
  incidents: number;
  incidentsDetails: string[];
  /** Public, dated payout proof (official pages, trade press, on-chain data), added through firm-updates.json. */
  payoutProofs?: PayoutProof[];
  styles: string[];
  legalVerified: boolean;
  transparencyScore: number;
  payoutProof: boolean;
  recentRuleChange: boolean;
  lastReviewed: string;
  trustpilotRating?: number;
  logoDomain?: string;
  communitySignal: string;
  products: Product[];
  strengths: string[];
  weaknesses: string[];
  sources: SourceLink[];
  commercialRelationship: 'Aucune' | 'Affiliation transparente';
  commercialNote?: string;
  /**
   * Offer shown in the partner pop-up of an affiliate's firm page: a tracking
   * link, a code, or both. A percentage is set only when it was read on the
   * firm's site or given by the firm (source + date), never estimated.
   */
  partnerOffer?: PartnerOffer;
  auditStatus: 'Vérifié multi-source' | 'Partiellement vérifié' | 'À auditer';
  auditSummary: string;
  auditSourcesChecked: string[];
  regulatoryAudit: RegulatoryAudit;
  reviewSignals: ReviewSignals;
  /** Set when the listed official domain now serves unrelated content: never link to it. */
  listedDomainWarning?: string;
  /**
   * Fields that hold a watchlist default rather than a value read on a source.
   * Pages show them as "To verify" and never as a measured fact.
   */
  provisional?: ProvisionalField[];
};

export type ProvisionalField = 'profitSplit' | 'drawdownType' | 'accountSize' | 'incidents';

// Generic reminders that are not incidents (kept in French for old profiles).
const PLACEHOLDER_ISSUE =
  /rev.rifier|conditions commerciales|statuts|must be rechecked before buying|not audited in depth yet|closed or not recommended status/i;

/** Incidents actually written down on the profile; the count shown is always this list's length. */
export function documentedIncidents(firm: Pick<PropFirm, 'incidentsDetails' | 'reviewSignals'>) {
  const seen = new Set<string>();
  return [...(firm.incidentsDetails ?? []), ...(firm.reviewSignals?.payoutIssues ?? [])].filter((item) => {
    const key = item.trim();
    if (!key || PLACEHOLDER_ISSUE.test(key) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const REVIEW_DATE = '2026-06-29';
export const FTMO_AFFILIATE_URL = 'https://trader.ftmo.com/?affiliates=ILTDLLkYLwdMlzGLBwkq';
export const BLUE_GUARDIAN_AFFILIATE_URL = 'https://blueguardian.com/?afmc=PROPRADAR';
/** PropRadar partner code; 25% verified on the Elite 100K Futures checkout on 2026-11-15. */
export const BLUE_GUARDIAN_PROMO_CODE = 'PROPRADAR';
export const FUNDERPRO_AFFILIATE_URL = 'https://funderpro.cxclick.com/visit/?bta=48892&brand=funderpro';
export const GOAT_FUNDED_TRADER_AFFILIATE_URL = 'https://app.goatfundedtrader.com/checkout?referral_id=04e892a0e3d217576945';
export const THE5ERS_AFFILIATE_URL = 'https://www.the5ers.com/?afmc=1cuh';
export const E8_AFFILIATE_URL = 'https://e8markets.com/d/A4DE0965';
export const FXIFY_AFFILIATE_URL = 'https://trader.fxify.com/purchasechallenge?affiliateId=8924';
/** Fintokei affiliate link issued to PropRadar, confirmed by Geyer on 2026-11-16. */
export const FINTOKEI_AFFILIATE_URL = 'https://www.fintokei.com/?affiliate=2534';
/** Geo-aware outbound redirect to the regional version of the same affiliate link. */
export const FINTOKEI_TRACKING_PATH = '/out/fintokei';
/** Partner code issued to PropRadar by FXIFY (25% off all programs, per FXIFY), received 2026-11-14. */
export const FXIFY_PROMO_CODE = 'FXIFY0EVDNU';
export const UPCOMERS_AFFILIATE_URL = 'https://www.upcomers.com/fr/?code=kkscxhro#challenges';
export const ONEFUNDED_AFFILIATE_URL = 'https://onefunded.com/?utm_medium=aff&utm_term=713&utm_source=tracknow&campaign_id=7&ref_id=713#challenges';
/** City Traders Imperium referral link supplied by PropRadar's owner on 2026-11-16. */
export const CTI_AFFILIATE_URL = 'https://app.citytradersimperium.com/user-auth/register?referral_code=8b3df5&utm_source=client&utm_medium=referral&utm_id=8b3df5';
/** Partner code issued to PropRadar by Upcomers, received 2026-11-14 (no percentage stated by Upcomers). */
export const UPCOMERS_PROMO_CODE = 'kkscxhro';
/** Partner code issued to PropRadar by OneFunded on 2026-11-12 (25% off all challenges, per OneFunded). */
export const ONEFUNDED_PROMO_CODE = 'PROPRADARTECH';
/** Affiliate links must carry rel="sponsored" wherever they appear (buttons, sources, deals). */
export function isAffiliateUrl(url: string) {
  return [FTMO_AFFILIATE_URL, BLUE_GUARDIAN_AFFILIATE_URL, FUNDERPRO_AFFILIATE_URL, GOAT_FUNDED_TRADER_AFFILIATE_URL, THE5ERS_AFFILIATE_URL, E8_AFFILIATE_URL, FXIFY_AFFILIATE_URL, FINTOKEI_AFFILIATE_URL, FINTOKEI_TRACKING_PATH, UPCOMERS_AFFILIATE_URL, ONEFUNDED_AFFILIATE_URL, CTI_AFFILIATE_URL].includes(url);
}

export function linkRel(url: string) {
  return isAffiliateUrl(url) ? 'noreferrer sponsored' : 'noreferrer';
}

export const PROPRADAR_PROMO_CODE = 'PROPRADAR';
export const THE5ERS_PROMO_CODE = '1EIJ6PO';

export type PartnerOffer = {
  /** Affiliate (tracking) link; when absent the pop-up links to the official site. */
  href?: string;
  code?: string;
  percent?: number;
  /** all challenges, first order, new customers (up to), or eligible challenges only. */
  scope?: 'all' | 'first' | 'new' | 'selected';
  /** 'site': read on the firm's own site; 'firm': given to PropRadar by the firm. */
  codeSource?: 'site' | 'firm';
  checkedOn?: string;
};

function defaultRegulatoryAudit(data: {
  name: string;
  headquarters?: string;
  lastReviewed?: string;
  sources?: SourceLink[];
}): RegulatoryAudit {
  return {
    riskLevel: 'To audit',
    lastChecked: data.lastReviewed ?? REVIEW_DATE,
    summary:
      'Regulatory ownership audit not completed yet. PropRadar keeps this placeholder visible until legal entities, regulator registers, public warnings and operating terms are checked.',
    entities: [
      {
        name: data.name,
        jurisdiction: data.headquarters ?? 'To verify',
        role: 'Brand or operating structure to identify from official legal pages and company registers.',
      },
    ],
    regulatoryStatus: [
      'Entity mapping pending.',
      'Tier-one regulator authorization not yet documented in PropRadar.',
      'Public warning-list checks must be repeated before any purchase decision.',
    ],
    complaintsAndDisputes: [
      'Public complaints and payout disputes still need to be classified by source, date and severity.',
    ],
    redFlags: [
      'Do not treat this firm as fully audited until the legal entity, regulator status and payout dispute history are sourced.',
    ],
    sources: data.sources?.length ? data.sources : [],
  };
}

type ProductInput = Pick<Product, 'id' | 'name' | 'description'> & Partial<Omit<Product, 'id' | 'name' | 'description'>>;

function product(data: ProductInput): Product {
  return {
    type: 'Challenge',
    accountSizeMin: 5000,
    accountSizeMax: 200000,
    profitTarget: 'variable by program',
    maxDailyLoss: 'variable',
    maxDrawdown: 'variable',
    profitSplit: 'variable',
    platforms: ['To verify'],
    tradableAssets: ['To verify'],
    hasConsistencyRule: true,
    consistencyRule: 'Rules not yet audited in PropRadar: check the official product source.',
    ...data,
  };
}

type FirmInput = Omit<
  PropFirm,
  | 'lastReviewed'
  | 'incidentsDetails'
  | 'styles'
  | 'legalVerified'
  | 'transparencyScore'
  | 'payoutProof'
  | 'recentRuleChange'
  | 'trustpilotRating'
  | 'logoDomain'
  | 'products'
  | 'strengths'
  | 'weaknesses'
  | 'sources'
  | 'commercialRelationship'
  | 'commercialNote'
  | 'auditStatus'
  | 'auditSummary'
  | 'auditSourcesChecked'
  | 'regulatoryAudit'
  | 'reviewSignals'
> &
  Partial<
    Pick<
      PropFirm,
      | 'lastReviewed'
      | 'incidentsDetails'
      | 'styles'
      | 'legalVerified'
      | 'transparencyScore'
      | 'payoutProof'
      | 'recentRuleChange'
      | 'trustpilotRating'
      | 'logoDomain'
      | 'products'
      | 'strengths'
      | 'weaknesses'
      | 'sources'
      | 'commercialRelationship'
      | 'commercialNote'
      | 'auditStatus'
      | 'auditSummary'
      | 'auditSourcesChecked'
      | 'regulatoryAudit'
    >
  > & { reviewSignals?: Partial<ReviewSignals> };

function payoutRiskLabel(score: number): ReviewSignals['payoutRisk'] {
  if (score >= 85) return 'Critique';
  if (score >= 65) return 'Élevé';
  if (score >= 40) return 'Moyen';
  return 'Faible';
}

function trustpilotReliabilityLabel(score: number): ReviewSignals['trustpilotReliability'] {
  if (score >= 75) return 'Forte';
  if (score >= 50) return 'Moyenne';
  return 'Faible';
}

function redditSignal(score: number): ReviewSignals['redditSignal'] {
  if (score >= 75) return 'Positif';
  if (score >= 55) return 'Mixte';
  return 'Négatif';
}

function xSignal(score: number): ReviewSignals['xSignal'] {
  if (score >= 75) return 'Positif';
  if (score >= 55) return 'Mixte';
  if (score <= 20) return 'Faible volume';
  return 'Négatif';
}

function manipulationRiskLabel(score: number): NonNullable<ReviewSignals['manipulationRisk']> {
  if (score >= 70) return 'Élevé';
  if (score >= 40) return 'Moyen';
  return 'Faible';
}

function payoutIncidentStatus(score: number, incidents: number): NonNullable<ReviewSignals['payoutIncidentStatus']> {
  if (score >= 85) return 'Critique';
  if (score >= 65 || incidents >= 4) return 'Incidents récurrents';
  if (score >= 40 || incidents >= 2) return 'À surveiller';
  return 'Aucun signal fort';
}

function redditBreakdownFromScore(data: Omit<PropFirm, 'reviewSignals'>, redditScore: number) {
  const sampleSize = Math.max(
    12,
    Math.min(
      180,
      data.status === 'Fermée'
        ? 60 + data.incidents * 14
        : 18 + data.transparencyScore * 3 + data.incidents * 9 + (data.payoutProof ? 18 : 0)
    )
  );
  const neutralMentions = Math.round(sampleSize * (data.status === 'Fermée' ? 0.14 : 0.22));
  const directionalMentions = Math.max(1, sampleSize - neutralMentions);
  const positiveRatio = Math.max(0.04, Math.min(0.96, redditScore / 100));
  const positiveMentions = Math.round(directionalMentions * positiveRatio);
  const negativeMentions = Math.max(0, directionalMentions - positiveMentions);
  const confidence: NonNullable<ReviewSignals['redditConfidence']> =
    sampleSize >= 90 ? 'Forte' : sampleSize >= 40 ? 'Moyenne' : 'Faible';

  return {
    redditPositiveMentions: positiveMentions,
    redditNegativeMentions: negativeMentions,
    redditNeutralMentions: neutralMentions,
    redditSampleSize: sampleSize,
    redditConfidence: confidence,
  };
}

function xBreakdownFromScore(data: Omit<PropFirm, 'reviewSignals'>, xScore: number) {
  const sampleSize = Math.max(
    10,
    Math.min(
      220,
      data.status === 'Fermée'
        ? 44 + data.incidents * 18
        : 14 + data.transparencyScore * 2 + data.incidents * 13 + (data.recentRuleChange ? 18 : 0)
    )
  );
  const neutralMentions = Math.round(sampleSize * (data.status === 'Fermée' ? 0.18 : 0.26));
  const directionalMentions = Math.max(1, sampleSize - neutralMentions);
  const positiveRatio = Math.max(0.03, Math.min(0.95, xScore / 100));
  const positiveMentions = Math.round(directionalMentions * positiveRatio);
  const negativeMentions = Math.max(0, directionalMentions - positiveMentions);
  const confidence: NonNullable<ReviewSignals['xConfidence']> =
    sampleSize >= 110 ? 'Forte' : sampleSize >= 45 ? 'Moyenne' : 'Faible';

  return {
    xPositiveMentions: positiveMentions,
    xNegativeMentions: negativeMentions,
    xNeutralMentions: neutralMentions,
    xSampleSize: sampleSize,
    xConfidence: confidence,
  };
}

function buildReviewSignals(data: Omit<PropFirm, 'reviewSignals'>): ReviewSignals {
  const payoutRiskScore = Math.min(
    100,
    Math.max(
      10,
      data.status === 'Fermée'
        ? 96
        : data.incidents * 14 + (data.payoutProof ? 12 : 28) + (data.recentRuleChange ? 12 : 0)
    )
  );
  const redditScore = Math.max(5, Math.min(95, data.score - data.incidents * 3 - (data.status === 'Fermée' ? 22 : 0)));
  const xScore = Math.max(
    5,
    Math.min(
      95,
      data.score -
        data.incidents * 4 -
        (data.status === 'Fermée' ? 25 : 0) -
        (data.recentRuleChange ? 5 : 0) +
        (data.payoutProof ? 4 : 0)
    )
  );
  const trustpilotReliabilityScore = Math.max(
    10,
    Math.min(
      92,
      data.transparencyScore * 4 +
        (data.trustpilotRating ? Math.round(data.trustpilotRating * 4) : 8) +
        (data.payoutProof ? 8 : -8) -
      data.incidents * 5
    )
  );
  const manipulationRiskScore = Math.max(
    8,
    Math.min(
      96,
      100 - trustpilotReliabilityScore + (data.trustpilotRating && data.trustpilotRating >= 4.6 && data.incidents >= 2 ? 18 : 0)
    )
  );
  const redditBreakdown = redditBreakdownFromScore(data, redditScore);
  const xBreakdown = xBreakdownFromScore(data, xScore);

  return {
    redditScore,
    ...redditBreakdown,
    redditSource: 'Estimation PropRadar',
    redditMentions: data.status === 'Fermée' ? 'historical archives and alerts' : data.incidents >= 3 ? 'high complaint volume to classify' : 'public volume to monitor',
    redditSignal: redditSignal(redditScore),
    redditFlags:
      data.status === 'Fermée'
        ? ['Crisis archives', 'Historical testimonials to contextualize']
        : data.incidents >= 3
          ? ['Repeated complaints to classify', 'Noisy community signal', 'Verify recent posts']
          : ['Volume to monitor', 'Compare Reddit with Discord and payout proof'],
    xScore,
    ...xBreakdown,
    xSource: 'Estimation PropRadar',
    xMentions:
      data.status === 'Fermée'
        ? 'Raw PropRadar score: X/Twitter archives should be treated as historical signals, not current proof'
        : data.incidents >= 3
          ? 'Raw PropRadar score: public complaints and X/Twitter threads to cross-check with recent payouts'
          : 'Raw X/Twitter score: positive, negative and neutral reviews to reread manually before deciding',
    xSignal: xSignal(xScore),
    xFlags:
      data.status === 'Fermée'
        ? ['Historical X/Twitter archives', 'Do not confuse old buzz with current risk']
        : data.incidents >= 3
          ? ['Public threads to reread', 'Verify complaint dates', 'Cross-check with Discord and Trustpilot']
          : ['Fast but noisy signal', 'Cross-check with Reddit, Discord and payout proof'],
    trustpilotReliabilityScore,
    trustpilotReliability: trustpilotReliabilityLabel(trustpilotReliabilityScore),
    trustpilotNote: data.trustpilotRating
      ? `Raw Trustpilot rating ${data.trustpilotRating}/5. The reliability score above is weighted with transparency, payout incidents and proof level.`
      : 'Trustpilot rating is not filled in PropRadar: the radar applies a conservative weighting.',
    trustpilotFlags: data.trustpilotRating
      ? ['Raw rating available', 'Weighted by incidents and external proof', 'Trustpilot does not verify the facts described in reviews']
      : ['Raw rating not filled', 'Do not use Trustpilot alone'],
    // Review alerts are only shown when counted by hand (set on the firm profile or in firm-updates.json).
    trustpilotFlaggedReviewCount: undefined,
    trustpilotFlaggedReviewNote: 'No fake-review alert has been counted by PropRadar for this firm. Check the Trustpilot page for its own transparency notices.',
    manipulationRiskScore,
    manipulationRisk: manipulationRiskLabel(manipulationRiskScore),
    payoutRiskScore,
    payoutRisk: payoutRiskLabel(payoutRiskScore),
    payoutIncidentCount: data.incidents,
    // A defaulted incident count is not evidence of recurring incidents.
    payoutIncidentStatus: data.provisional?.includes('incidents') ? 'À surveiller' : payoutIncidentStatus(payoutRiskScore, data.incidents),
    payoutIssues: data.incidentsDetails,
    confidenceDrivers: [
      data.payoutProof ? 'Payout claimed or reported, public proof to verify' : 'Insufficient payout proof',
      data.legalVerified ? 'Legal structure identified' : 'Fragile or unverified legal structure',
      data.recentRuleChange ? 'Recent changes to check' : 'Rules have been relatively stable recently',
    ],
    radarVerdict:
      data.provisional?.includes('incidents')
        ? 'Not audited in depth yet: the payout risk shown is a conservative default, not a measured result. Check rules, fees and recent payout feedback before any purchase.'
        : payoutRiskScore >= 65
        ? 'The radar detects significant payout risk: read the rules and recent feedback before any purchase.'
        : trustpilotReliabilityScore < 50
          ? 'Public reviews are too fragile: do not rely on the displayed rating without external proof.'
          : 'Public signal is usable, but confirm it on official sources before buying.',
    lastSignalCheck: data.lastReviewed,
  };
}

function firm(data: FirmInput): PropFirm {
  const { reviewSignals, ...firmData } = data;
  const base: Omit<PropFirm, 'reviewSignals'> = {
    lastReviewed: REVIEW_DATE,
    incidentsDetails: ['Rules, commercial conditions and status must be rechecked before buying.'],
    styles: ['Forex'],
    legalVerified: true,
    transparencyScore: 12,
    payoutProof: false,
    recentRuleChange: true,
    logoDomain: undefined,
    trustpilotRating: undefined,
    products: [],
    strengths: ['Offre identifiable', 'Sources officielles disponibles'],
    weaknesses: ['Rules may change', 'Data must be rechecked before buying'],
    sources: [],
    commercialRelationship: 'Aucune',
    auditStatus: 'Partiellement vérifié',
    auditSummary: 'Structured data in PropRadar, to be completed with a full web review.',
    auditSourcesChecked: ['Official site'],
    regulatoryAudit: defaultRegulatoryAudit({
      name: data.name,
      headquarters: data.headquarters,
      lastReviewed: data.lastReviewed ?? REVIEW_DATE,
      sources: data.sources,
    }),
    ...firmData,
  };
  // "Entity mapped" must mean a legal entity with a known jurisdiction was
  // actually identified, not just that the firm is not closed.
  base.legalVerified =
    base.legalVerified &&
    base.regulatoryAudit.entities.some(
      (entity) => Boolean(entity.jurisdiction) && !/to verify|international|unknown|unconfirmed/i.test(entity.jurisdiction),
    );
  const defaultSignals = buildReviewSignals(base);
  const mergedSignals: ReviewSignals = {
    ...defaultSignals,
    ...reviewSignals,
  };
  const alignedRedditBreakdown = redditBreakdownFromScore(base, mergedSignals.redditScore);
  const alignedXBreakdown = xBreakdownFromScore(base, mergedSignals.xScore);

  return {
    ...base,
    reviewSignals: {
      ...mergedSignals,
      redditPositiveMentions: mergedSignals.redditPositiveMentions ?? alignedRedditBreakdown.redditPositiveMentions,
      redditNegativeMentions: mergedSignals.redditNegativeMentions ?? alignedRedditBreakdown.redditNegativeMentions,
      redditNeutralMentions: mergedSignals.redditNeutralMentions ?? alignedRedditBreakdown.redditNeutralMentions,
      redditSampleSize: mergedSignals.redditSampleSize ?? alignedRedditBreakdown.redditSampleSize,
      redditConfidence: mergedSignals.redditConfidence ?? alignedRedditBreakdown.redditConfidence,
      xPositiveMentions: mergedSignals.xPositiveMentions ?? alignedXBreakdown.xPositiveMentions,
      xNegativeMentions: mergedSignals.xNegativeMentions ?? alignedXBreakdown.xNegativeMentions,
      xNeutralMentions: mergedSignals.xNeutralMentions ?? alignedXBreakdown.xNeutralMentions,
      xSampleSize: mergedSignals.xSampleSize ?? alignedXBreakdown.xSampleSize,
      xConfidence: mergedSignals.xConfidence ?? alignedXBreakdown.xConfidence,
    },
  };
}

type UniverseMarket = 'Forex/CFD' | 'Futures' | 'Actions' | 'Crypto' | 'Multi-asset';

type UniverseFirmInput = {
  id: number;
  slug: string;
  name: string;
  website?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  status?: PropFirm['status'];
  score?: number;
  founded?: number;
  headquarters?: string;
  market?: UniverseMarket;
  priceFrom?: number;
  profitSplit?: number;
  drawdownType?: PropFirm['drawdownType'];
  incidents?: number;
  payoutProof?: boolean;
  recentRuleChange?: boolean;
  lastReviewed?: string;
  trustpilotRating?: number;
  logoDomain?: string;
  note?: string;
  /** Listed domain now serves unrelated content (casino, parked page...). */
  listedDomainWarning?: string;
  styles?: string[];
  productType?: Product['type'];
  productName?: string;
  productDescription?: string;
  accountSizeMin?: number;
  accountSizeMax?: number;
  profitTarget?: string;
  maxDailyLoss?: string;
  maxDrawdown?: string;
  platforms?: string[];
  tradableAssets?: string[];
  minTradingDays?: string;
  hasConsistencyRule?: boolean;
  consistencyRule?: string;
  newsTrading?: PropFirm['newsTrading'];
  eaAllowed?: PropFirm['eaAllowed'];
  payoutDelay?: string;
  products?: Product[];
  incidentsDetails?: string[];
  communitySignal?: string;
  strengths?: string[];
  weaknesses?: string[];
  reviewSignals?: Partial<ReviewSignals>;
  additionalSources?: SourceLink[];
  auditStatus?: PropFirm['auditStatus'];
  auditSummary?: string;
  auditSourcesChecked?: string[];
  regulatoryAudit?: RegulatoryAudit;
  affiliateUrl?: string;
  commercialRelationship?: PropFirm['commercialRelationship'];
  commercialNote?: string;
  /**
   * Offer shown in the partner pop-up of an affiliate's firm page: a tracking
   * link, a code, or both. A percentage is set only when it was read on the
   * firm's site or given by the firm (source + date), never estimated.
   */
  partnerOffer?: PartnerOffer;
};

function domainFromWebsite(website: string) {
  return website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
}

function universeFirm(data: UniverseFirmInput): PropFirm {
  const status = data.status ?? 'À surveiller';
  const market = data.market ?? 'Forex/CFD';
  const isFutures = market === 'Futures';
  const isClosed = status === 'Fermée';
  const styles = data.styles ?? (isFutures ? ['Futures'] : market === 'Crypto' ? ['Crypto'] : market === 'Actions' ? ['Actions'] : ['Forex', 'Indices']);
  const domainWarning = data.listedDomainWarning;
  const provisional: ProvisionalField[] = isClosed
    ? []
    : ([
        data.profitSplit === undefined ? 'profitSplit' : undefined,
        data.drawdownType === undefined ? 'drawdownType' : undefined,
        data.products === undefined && data.accountSizeMin === undefined && data.accountSizeMax === undefined ? 'accountSize' : undefined,
        data.incidents === undefined && data.incidentsDetails === undefined ? 'incidents' : undefined,
      ].filter(Boolean) as ProvisionalField[]);
  const logoDomain = domainWarning ? undefined : data.logoDomain ?? (data.website ? domainFromWebsite(data.website) : undefined);
  const sourceUrl = data.website ?? data.sourceUrl ?? 'https://propfirmmatch.com/unlisted-firms';
  const sourceLabel = domainWarning && data.website
    ? `Listed ${data.name} domain: unrelated content, not linked`
    : data.website ? `Official ${data.name} site` : data.sourceLabel ?? `${data.name} monitoring signal`;
  const secondarySources = data.additionalSources ?? [];
  const hasTrustpilotSource =
    Boolean(data.trustpilotRating) ||
    secondarySources.some((source) => /trustpilot/i.test(`${source.label} ${source.url}`));
  const hasSecondarySource =
    hasTrustpilotSource ||
    Boolean(data.reviewSignals) ||
    secondarySources.some((source) => /cftc|nfa|fca|sec|asic|warning|complaint|reddit|forex peace army/i.test(`${source.label} ${source.url}`));
  const auditSourcesChecked =
    data.auditSourcesChecked ??
    [
      data.website ? 'Official site' : 'Monitoring source',
      hasTrustpilotSource ? 'Trustpilot' : undefined,
      data.reviewSignals ? 'PropRadar review/payout signals' : undefined,
      isClosed ? 'Risk archive' : undefined,
    ].filter((source): source is string => Boolean(source));
  const auditStatus = data.auditStatus ?? (hasSecondarySource ? 'Partiellement vérifié' : 'À auditer');
  const auditSummary =
    data.auditSummary ??
    (auditStatus === 'À auditer'
      ? 'Watchlist profile: an official site or monitoring source is identified, but reviews, rules and payouts must still be verified before any recommendation.'
      : 'Watchlist profile backed by at least one external source or PropRadar signal, but not yet validated as a full multi-source file.');

  return firm({
    id: data.id,
    slug: data.slug,
    name: data.name,
    status,
    score: data.score ?? (status === 'Active' ? 68 : isClosed ? 12 : 58),
    founded: data.founded ?? 2023,
    headquarters: data.headquarters ?? 'International',
    // Descriptive only (market), never a recommendation for a firm PropRadar has not audited.
    bestFor: ({ 'Forex/CFD': 'Forex / CFD program', Crypto: 'Crypto program', Futures: 'Futures program', Actions: 'Stock program' } as Record<string, string>)[market] ?? `${market} program`,
    verdict:
      domainWarning ??
      data.note ??
      `${data.name} is on the PropRadar watchlist but has not been audited in depth yet. Rules, reviews and payout evidence still need verification, so treat this profile as a starting point, not a recommendation.`,
    priceFrom: data.priceFrom ?? 0,
    profitSplit: data.profitSplit ?? (isClosed ? 0 : 80),
    drawdownType: data.drawdownType ?? (isFutures ? 'Trailing' : 'Hybride'),
    newsTrading: data.newsTrading ?? (isClosed ? 'Not recommended' : 'Variable'),
    eaAllowed: data.eaAllowed ?? (isClosed ? 'No' : 'Variable'),
    payoutDelay: data.payoutDelay ?? (isClosed ? 'not applicable' : 'to verify'),
    incidents: data.incidents ?? (isClosed ? 5 : status === 'Active' ? 1 : 2),
    incidentsDetails: data.incidentsDetails ?? (isClosed
      ? ['Closed or not recommended status: no purchase should be prioritized.']
      : ['Not audited in depth yet: rules, fees, payouts and recent reviews must be rechecked before buying.']),
    styles,
    legalVerified: !isClosed,
    transparencyScore: status === 'Active' ? 12 : isClosed ? 2 : 9,
    payoutProof: data.payoutProof ?? false,
    recentRuleChange: data.recentRuleChange ?? true,
    lastReviewed: data.lastReviewed ?? REVIEW_DATE,
    trustpilotRating: data.trustpilotRating,
    logoDomain,
    communitySignal: data.communitySignal ?? (isClosed
      ? 'Risk archive kept to avoid misleading searches.'
      : 'Community signal to enrich with Reddit, Trustpilot, Discord and recent payout proof.'),
    products: data.products ?? (isClosed
      ? []
      : [
          product({
            id: `${data.slug}-program`,
            name: data.productName ?? `${data.name} Program`,
            type: data.productType ?? (isFutures ? 'Futures evaluation' : market === 'Crypto' ? 'Challenge' : 'Challenge'),
            description: data.productDescription ?? `${market} program not yet audited by PropRadar. Confirm fees, drawdown, targets and payout conditions on the official source.`,
            // 0 = size not read on a source yet (pages then hide the range).
            accountSizeMin: data.accountSizeMin ?? (provisional.includes('accountSize') ? 0 : isFutures ? 25000 : 5000),
            accountSizeMax: data.accountSizeMax ?? (provisional.includes('accountSize') ? 0 : isFutures ? 300000 : 400000),
            entryFeeMin: data.priceFrom && data.priceFrom > 0 ? data.priceFrom : undefined,
            profitTarget: data.profitTarget ?? 'variable by program',
            maxDailyLoss: data.maxDailyLoss ?? 'variable',
            maxDrawdown: data.maxDrawdown ?? 'variable',
            profitSplit: data.profitSplit === undefined ? 'To verify' : `up to ${data.profitSplit}% depending on conditions`,
            platforms: data.platforms ?? (isFutures ? ['NinjaTrader', 'Tradovate', 'Rithmic', 'To verify'] : ['MT4', 'MT5', 'cTrader', 'To verify']),
            tradableAssets: data.tradableAssets ?? (isFutures ? ['Futures'] : market === 'Crypto' ? ['Crypto'] : market === 'Actions' ? ['Stocks'] : ['Forex', 'Indices', 'Metals', 'Crypto']),
            minTradingDays: data.minTradingDays,
            hasConsistencyRule: data.hasConsistencyRule ?? true,
            consistencyRule: data.consistencyRule,
            linkToStart: domainWarning ? undefined : data.affiliateUrl ?? data.website,
          }),
        ]),
    strengths: data.strengths ?? (isClosed ? ['Useful prevention archive'] : ['Monitored by PropRadar', 'Official source available']),
    weaknesses: data.weaknesses ?? (isClosed
      ? ['No purchase recommended', 'Operational risk materialized']
      : ['Profile needs more detail', 'Payout data and reviews must be rechecked', 'Not a strong recommendation by default']),
    sources: [{ label: sourceLabel, url: sourceUrl }, ...secondarySources],
    commercialRelationship: data.commercialRelationship ?? 'Aucune',
    commercialNote: data.commercialNote,
    partnerOffer: data.partnerOffer,
    auditStatus,
    auditSummary,
    auditSourcesChecked,
    ...(data.regulatoryAudit ? { regulatoryAudit: data.regulatoryAudit } : {}),
    reviewSignals: data.reviewSignals,
    ...(domainWarning ? { listedDomainWarning: domainWarning } : {}),
    ...(provisional.length ? { provisional } : {}),
  });
}

const corePropFirms: PropFirm[] = [
  firm({
    id: 1,
    slug: 'ftmo',
    name: 'FTMO',
    status: 'Active',
    score: 91,
    founded: 2015,
    headquarters: 'Czech Republic',
    bestFor: 'forex/CFD traders who want an established operator',
    verdict: 'Sector benchmark with a large public footprint, a clear challenge structure and a strong reputation.',
    priceFrom: 155,
    profitSplit: 80,
    drawdownType: 'EOD',
    newsTrading: 'Restricted',
    eaAllowed: 'Yes',
    payoutDelay: 'usually 1 to 3 business days',
    incidents: 1,
    transparencyScore: 19,
    payoutProof: true,
    recentRuleChange: false,
    lastReviewed: '2026-07-15',
    trustpilotRating: 4.8,
    logoDomain: 'ftmo.com',
    communitySignal: 'Very strong visibility, many verifiable public reviews and third-party analyses.',
    commercialRelationship: 'Affiliation transparente',
    commercialNote: 'PropRadar may receive a commission if you use this link. The score stays independent and weaknesses remain visible.',
    reviewSignals: {
      redditScore: 86,
      redditMentions: 'high volume, generally stable feedback, complaints mostly linked to rules or verification checks',
      redditSignal: 'Positif',
      redditFlags: ['High and mature discussion volume', 'Complaints mostly linked to rule enforcement', 'Few repeated non-payout patterns'],
      trustpilotReliabilityScore: 88,
      trustpilotReliability: 'Forte',
      trustpilotNote: 'Trustpilot 4.8/5 with roughly 45k public reviews. Strong signal, but Trustpilot does not fact-check every payout story; PropRadar weighs it against rules and documented payout incidents.',
      trustpilotFlags: ['Very significant review volume', 'Claimed profile and Trustpilot subscription', 'Trustpilot filters non-compliant reviews but does not verify every described fact', 'Low response rate to negative reviews to monitor'],
      trustpilotFlaggedReviewNote: 'No public counter of removed or sanctioned fake reviews was found on the Trustpilot page checked. The signal remains strong, with caution around factual verification of individual stories.',
      manipulationRiskScore: 24,
      manipulationRisk: 'Faible',
      payoutRiskScore: 22,
      payoutRisk: 'Faible',
      payoutIncidentCount: 1,
      payoutIncidentStatus: 'No strong signal',
      payoutIssues: ['Few repeated non-payout signals; visible disputes mostly concern rule interpretation.'],
      confidenceDrivers: ['Long track record', 'Detailed public rules', 'Affiliate relationship disclosed without hiding limitations'],
      radarVerdict: 'High-trust signal: FTMO remains well rated, but PropRadar keeps restrictions and rule-related disputes visible.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [
      product({
        id: 'ftmo-challenge',
        name: 'FTMO Challenge',
        description: 'One-step or two-step evaluation with profit targets and loss limits.',
        accountSizeMin: 10000,
        accountSizeMax: 200000,
        entryFeeMin: 155,
        entryFeeMax: 1080,
        profitTarget: '10% then 5% on the two-step model',
        maxDailyLoss: '5%',
        maxDrawdown: '10%',
        profitSplit: '80% to 90%',
        platforms: ['MT4', 'MT5', 'cTrader', 'DXtrade'],
        tradableAssets: ['Forex', 'Indices', 'Commodities', 'Crypto', 'Stock CFDs'],
        minTradingDays: '4 minimum days on some models',
        hasConsistencyRule: true,
        consistencyRule: 'Since October 12, 2026, new 1-Step Challenge orders use a Consistency rule (best day compared with total profit, losing days included); accounts from older orders keep the 50% Best Day Rule. Confirm the stage and order date before payout.',
        linkToStart: FTMO_AFFILIATE_URL,
        isPopular: true,
      }),
    ],
    strengths: ['Established brand', 'Detailed rules', 'Good transparency level', 'Many public reviews'],
    weaknesses: ['Higher price than some competitors', 'Restrictions around news trading and copied strategies to verify'],
    auditStatus: 'Vérifié multi-source',
    auditSummary:
      'Official FTMO sources and Trustpilot page checked: track record, public rules and review volume are coherent. Still monitor individual disputes linked to rules, KYC and execution.',
    auditSourcesChecked: ['Official site', 'Official rules', 'Official FAQ', 'Trustpilot', 'Payout/community signals'],
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-06',
      summary:
        'Low-to-medium regulatory risk. FTMO is one of the cleaner large prop-firm profiles: EU-based, visible, long operating history and no major official regulator warning recorded in PropRadar at this check. The key limitation remains that FTMO presents its offer as simulated trading and educational tools, not regulated brokerage or investment services.',
      entities: [
        {
          name: 'FTMO s.r.o. / FTMO Trading Global s.r.o.',
          jurisdiction: 'Czech Republic, European Union',
          registeredAddress: 'Purkynova 2121/3, 110 00 Prague, Czech Republic',
          role:
            'Main FTMO operating group references for the prop-trading and simulated-account ecosystem. Verify the exact contracting entity in the latest terms before purchase.',
        },
      ],
      regulatoryStatus: [
        'FTMO states that it provides simulated trading and educational tools, not brokerage services.',
        'FTMO companies state that they do not act as a broker and do not accept deposits.',
        'EU presence gives more corporate transparency than many offshore-only competitors, but it does not make the FTMO Challenge a regulated investment product.',
        'FTMO Group was reported in 2025 as entering an agreement to acquire OANDA, subject to regulatory approvals; PropRadar treats this as an institutional expansion signal to monitor, not as a direct license for FTMO prop accounts.',
      ],
      complaintsAndDisputes: [
        'Public complaints exist, mostly around rule interpretation, KYC, execution checks, copied strategies or contractual restrictions.',
        'Some trader disputes mention payout-related documentation or NDA-style handling after rewards, but PropRadar has not recorded a major public regulatory enforcement action against FTMO.',
      ],
      redFlags: [
        'No broker or investment-firm authorization for the simulated prop-firm product.',
        'Rules, prohibited strategies and verification checks can still block a payout even when the brand is reputable.',
        'OANDA-related expansion should be monitored because it may change group structure, disclosures or regulatory perimeter.',
      ],
      sources: [
        { label: 'FTMO terms and conditions', url: 'https://ftmo.com/en/terms-and-conditions/' },
        { label: 'Official FTMO site', url: 'https://ftmo.com/' },
        { label: 'FTMO news-trading FAQ', url: 'https://ftmo.com/faq/can-i-trade-news/' },
        { label: 'FX News Group - OANDA acquired by FTMO', url: 'https://fxnewsgroup.com/forex-news/retail-forex/oanda-acquired-by-czech-prop-firm-ftmo/' },
        { label: 'Trustpilot FTMO', url: 'https://www.trustpilot.com/review/ftmo.com' },
      ],
    },
    sources: [
      { label: 'Official FTMO site', url: 'https://ftmo.com/' },
      { label: 'FTMO trading objectives', url: 'https://ftmo.com/en/trading-objectives/' },
      { label: 'FTMO news-trading FAQ', url: 'https://ftmo.com/faq/can-i-trade-news/' },
      { label: 'FTMO FAQ', url: 'https://ftmo.com/en/faq/' },
      { label: 'Trustpilot FTMO', url: 'https://www.trustpilot.com/review/ftmo.com' },
    ],
  }),
  firm({
    id: 2,
    slug: 'the5ers',
    name: 'The5ers',
    status: 'Active',
    score: 85,
    founded: 2016,
    headquarters: 'Israel',
    bestFor: 'careful traders who like static limits',
    verdict: 'Serious profile with several paths, appreciated by traders who prioritize risk management.',
    priceFrom: 39,
    profitSplit: 80,
    drawdownType: 'Static',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'usually a few business days',
    incidents: 1,
    transparencyScore: 17,
    payoutProof: true,
    recentRuleChange: true,
    lastReviewed: '2026-07-15',
    trustpilotRating: 4.7,
    logoDomain: 'the5ers.com',
    communitySignal: 'Good reputation, especially among conservative traders.',
    commercialRelationship: 'Affiliation transparente',
    commercialNote: 'PropRadar may receive a commission through the The5ers link. Coupon 1EIJ6PO remains a checkout test with no public percentage confirmed on 13 July 2026; any real reduction must appear in the subtotal and has no impact on the score.',
    products: [
      product({
        id: 'the5ers-high-stakes',
        name: 'High Stakes',
        description: 'Two-phase program with progressive targets and strict loss limits.',
        accountSizeMin: 5000,
        accountSizeMax: 100000,
        entryFeeMin: 39,
        entryFeeMax: 495,
        profitTarget: '8% then 5%',
        maxDailyLoss: '5%',
        maxDrawdown: '10%',
        profitSplit: '80% to 100% depending on scaling',
        platforms: ['MT5', 'cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Commodities'],
        hasConsistencyRule: false,
        consistencyRule: 'No percentage best-day rule is captured for High Stakes; The5ers Futures uses a separate per-position consistency rule.',
        linkToStart: THE5ERS_AFFILIATE_URL,
        isPopular: true,
      }),
    ],
    strengths: ['Often readable drawdown', 'Varied programs', 'Strict risk orientation'],
    weaknesses: ['Rules differ by program', 'Less flexible for some news/scalping profiles'],
    auditStatus: 'Vérifié multi-source',
    auditSummary:
      'Official The5ers sources and Trustpilot page checked. High Stakes and the current Futures program must be separated: the Futures page advertises news trading as allowed and applies a per-position consistency rule.',
    auditSourcesChecked: ['Official site', 'Official programs', 'The5ers Futures rules', 'Trustpilot', 'Payout/community signals'],
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-06',
      summary:
        'Low-to-medium regulatory risk. The5ers has one of the cleaner profiles among established prop firms: long operating history, clear UK and Israel legal entities, simulated-evaluation disclosures and no major official regulator warning recorded in PropRadar at this check. The limitation remains that The5ers is not presented as a regulated broker, custodian, exchange or financial institution.',
      entities: [
        {
          name: 'Five Percent Online Ltd',
          jurisdiction: 'England and Wales, United Kingdom',
          registrationNumber: '12553363',
          registeredAddress: 'Enstar House, 168 Praed Street, London, United Kingdom, W2 1RH',
          role:
            'UK company listed at Companies House and disclosed in The5ers terms as one of the website operators.',
        },
        {
          name: 'Five Percent Online Ltd',
          jurisdiction: 'Israel',
          registrationNumber: '515864007',
          registeredAddress: '2 HaTidhar Street, Raanana, Israel',
          role:
            'Israeli company disclosed in The5ers terms. The terms use Israeli governing-law and Tel Aviv court references for certain disputes.',
        },
      ],
      regulatoryStatus: [
        'The5ers describes Five Percent Online Ltd as a technology company providing services through the5ers.com, including proprietary trading.',
        'The evaluation stage is disclosed as a simulated training environment with fictitious funds.',
        'The website disclaimer states that Five Percent Online Ltd is not a custodian, exchange, financial institution, trading platform, fiduciary or insurance business.',
        'No FCA, CySEC or equivalent prop-firm authorization is documented in PropRadar for the challenge/evaluation product itself.',
      ],
      complaintsAndDisputes: [
        'No major public regulatory action is documented in PropRadar at this check.',
        'The brand has a long operating history since 2016 and a lower visible scandal profile than many newer prop-firm entrants.',
        'User complaints still need to be read product by product because Bootcamp, Hyper Growth and High Stakes have different rules and payout conditions.',
      ],
      redFlags: [
        'UK plus Israel structure is more readable than many offshore setups, but still requires checking the exact contracting entity.',
        'The service is not a regulated broker or investment-firm product.',
        'Evaluation funds are fictitious and do not create ownership rights for the trader.',
      ],
      sources: [
        { label: 'Companies House - Five Percent Online Ltd 12553363', url: 'https://find-and-update.company-information.service.gov.uk/company/12553363' },
        { label: 'The5ers terms and conditions', url: 'https://the5ers.com/terms-conditions/' },
        { label: 'Official The5ers site', url: 'https://the5ers.com/' },
        { label: 'The5ers Futures program and news-trading status', url: 'https://www.the5ers.com/futures/' },
        { label: 'Trustpilot The5ers', url: 'https://www.trustpilot.com/review/the5ers.com' },
        { label: 'FCA warnings page', url: 'https://www.fca.org.uk/news/warnings' },
      ],
    },
    sources: [
      { label: 'Official The5ers site', url: 'https://the5ers.com/' },
      { label: 'The5ers programs', url: 'https://the5ers.com/programs/' },
      { label: 'The5ers Futures program and news-trading status', url: 'https://www.the5ers.com/futures/' },
      { label: 'The5ers terms and conditions', url: 'https://the5ers.com/terms-conditions/' },
      { label: 'Companies House - Five Percent Online Ltd', url: 'https://find-and-update.company-information.service.gov.uk/company/12553363' },
      { label: 'Trustpilot The5ers', url: 'https://www.trustpilot.com/review/the5ers.com' },
    ],
  }),
  firm({
    id: 3,
    slug: 'fundednext',
    name: 'FundedNext',
    status: 'Active',
    score: 79,
    founded: 2022,
    headquarters: 'United Arab Emirates',
    bestFor: 'traders who want several challenge models',
    verdict: 'Very visible operator with aggressive offers; interesting, but rules and discounts need close monitoring.',
    priceFrom: 59,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'advertised as fast depending on model',
    incidents: 2,
    transparencyScore: 15,
    payoutProof: true,
    trustpilotRating: 4.5,
    logoDomain: 'fundednext.com',
    styles: ['Forex', 'Futures', 'Indices', 'Crypto', 'News trading'],
    communitySignal: 'Very present in the community, with many reviews that need filtering.',
    products: [
      product({
        id: 'fundednext-evaluation',
        name: 'Evaluation',
        description: 'CFD challenge with several account sizes, models and payout conditions.',
        entryFeeMin: 59,
        entryFeeMax: 999,
        profitSplit: 'up to 90% depending on conditions',
        platforms: ['MT4', 'MT5', 'cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Metals', 'Crypto'],
        linkToStart: 'https://fundednext.com/',
        isPopular: true,
      }),
    ],
    strengths: ['Attractive entry prices', 'Several models', 'Strong international visibility'],
    weaknesses: ['Rule complexity', 'Frequent discounts to verify', 'Risk of confusion between models'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official sources and Trustpilot page checked. Review volume is very high, but the low response rate to negative reviews and heavy discount logic require a careful reading.',
    auditSourcesChecked: ['Official site', 'Official FAQ', 'Trustpilot', 'Official deals'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-06',
      summary:
        'Medium-to-high regulatory risk. FundedNext has major visibility and very large public review volume, but its legal disclosure shows a fragmented structure across Comoros, Hong Kong, UAE and Cyprus payment entities. PropRadar has not recorded a major official FCA, CySEC or ASIC warning at this check, yet the offshore-heavy setup and payout complaints justify a more cautious reading than FTMO.',
      entities: [
        {
          name: 'FundedNext Ltd',
          jurisdiction: 'Comoros Islands',
          registrationNumber: 'HY01023052',
          registeredAddress: 'Bonovo Road, Fomboni, Island of Moheli, Comoros Union',
          role:
            'Entity disclosed by FundedNext as executing trading activities on the simulated platform.',
        },
        {
          name: 'FundedNext Limited',
          jurisdiction: 'Hong Kong',
          registeredAddress: '8/F China Hong Kong Tower, 8-12 Hennessy Road, Wan Chai, Hong Kong',
          role: 'Website operator disclosed on FundedNext public legal footer.',
        },
        {
          name: 'GrowthNext F.Z.E.',
          jurisdiction: 'Ajman, United Arab Emirates',
          registrationNumber: '28831',
          registeredAddress: 'Executive Office No. 7, Al Robotics Hub, C1 Building AFZ, Ajman, UAE',
          role: 'Trademark and brand owner disclosed by FundedNext.',
        },
        {
          name: 'Incenteco Trading LTD / Abutor Investments LTD',
          jurisdiction: 'Cyprus',
          registeredAddress: 'Limassol, Cyprus',
          role: 'Cyprus entities disclosed as facilitating payment-related activities.',
        },
      ],
      regulatoryStatus: [
        'FundedNext discloses that it is not a broker, dealer, exchange or investment advisor and that trading uses virtual funds in a simulated environment.',
        'No FCA, CySEC, ASIC or equivalent tier-one investment-services authorization is documented in PropRadar for the prop-firm product.',
        'The Comoros operating reference and multiple operational entities reduce clarity for traders compared with a single EU-based contracting structure.',
      ],
      complaintsAndDisputes: [
        'Public complaints to classify include account closures, payout refusals and rule-interpretation disputes.',
        'High Trustpilot volume is useful, but it does not independently verify each payout story or rule dispute.',
        'No major public regulatory enforcement action is documented in PropRadar at this check.',
      ],
      redFlags: [
        'Fragmented structure: Comoros, UAE, Hong Kong and Cyprus payment entities.',
        'Comoros is an offshore jurisdiction with weaker perceived oversight than EU or UK structures.',
        'Heavy promotional activity and frequent discounts make rules, checkout terms and payout conditions important to re-check before purchase.',
      ],
      sources: [
        { label: 'Official FundedNext site and legal disclosure', url: 'https://fundednext.com/' },
        { label: 'FundedNext Help Centre', url: 'https://help.fundednext.com/' },
        { label: 'Trustpilot FundedNext', url: 'https://www.trustpilot.com/review/fundednext.com' },
        { label: 'CySEC warnings page', url: 'https://www.cysec.gov.cy/en-GB/investor-protection/warnings/' },
        { label: 'FCA warnings page', url: 'https://www.fca.org.uk/news/warnings' },
      ],
    },
    reviewSignals: {
      trustpilotReliabilityScore: 70,
      trustpilotReliability: 'Moyenne',
      trustpilotNote:
        'Trustpilot 4.5/5 with more than 72k public reviews and many recent reviews. Useful signal, but it must be weighted against frequent discounts, weak responses to negative reviews and rules that vary by product.',
      trustpilotFlags: [
        'Very high review volume',
        'Customer reviews regularly requested',
        'Almost no public response to negative reviews on the page checked',
        'Trustpilot does not verify the facts of each testimonial',
      ],
      trustpilotFlaggedReviewNote:
        'No official counter of removed or sanctioned fake reviews was found on the page checked. PropRadar still keeps qualitative alerts on marketing volume and weak public handling of negative reviews.',
      manipulationRiskScore: 48,
      manipulationRisk: 'Moyen',
    },
    sources: [
      { label: 'Official FundedNext site', url: 'https://fundednext.com/' },
      { label: 'FAQ FundedNext', url: 'https://help.fundednext.com/' },
      { label: 'Trustpilot FundedNext', url: 'https://www.trustpilot.com/review/fundednext.com' },
    ],
  }),
  firm({
    id: 4,
    slug: 'topstep',
    name: 'Topstep',
    status: 'Active',
    score: 84,
    founded: 2012,
    headquarters: 'United States',
    bestFor: 'futures traders who want an established operator',
    verdict: 'One of the historic names in futures funded trading, with a more institutional framework than many recent competitors.',
    priceFrom: 49,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'path- and account-specific after eligibility',
    incidents: 1,
    transparencyScore: 17,
    payoutProof: true,
    recentRuleChange: true,
    lastReviewed: '2026-07-15',
    trustpilotRating: 3.5,
    logoDomain: 'topstep.com',
    communitySignal: 'Very well known in futures, with a lot of educational content.',
    styles: ['Futures', 'Intraday', 'Scalping'],
    products: [
      product({
        id: 'topstep-trading-combine',
        name: 'Trading Combine',
        type: 'Futures evaluation',
        description: 'Futures evaluation with a 55% Trading Combine consistency target and a transition to path-specific Express Funded Account payout rules.',
        accountSizeMin: 50000,
        accountSizeMax: 150000,
        entryFeeMin: 49,
        entryFeeMax: 149,
        maxDrawdown: 'trailing',
        profitSplit: 'path- and account-cohort-specific',
        platforms: ['TopstepX', 'NinjaTrader', 'Tradovate'],
        tradableAssets: ['Futures'],
        hasConsistencyRule: true,
        consistencyRule: 'Trading Combine uses a 55% consistency target: if the best day exceeds 55% of the profit target, the target rises. The Express Funded Account Consistency path uses 40%; the Standard path requires five $150+ winning days.',
        linkToStart: 'https://www.topstep.com/',
        isPopular: true,
      }),
    ],
    strengths: ['Long track record', 'Futures specialist', 'Education and framework are fairly documented'],
    weaknesses: ['More complex drawdown rules', 'Less suited to forex/CFD traders'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official rules rechecked July 15, 2026. The Trading Combine uses a 50% consistency target; Express Funded Account Standard and Consistency paths use different payout qualification rules. Payout eligibility, caps and split can also depend on the account cohort.',
    auditSourcesChecked: ['Official site', 'Trading Combine parameters', 'Express Funded Account parameters', 'Official payout policy', 'Trustpilot'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-15',
      summary:
        'Medium-to-high regulatory risk. Topstep is one of the oldest US futures prop-firm brands and has a more established operating footprint than many recent competitors. The prop-firm product is still mainly a simulated/evaluation model, while Topstep Brokerage LLC is a separate affiliate disclosed as a CFTC-registered introducing broker and NFA member. Recent lawsuit and data-breach signals should be monitored before treating the profile as low risk.',
      entities: [
        {
          name: 'Topstep LLC',
          jurisdiction: 'United States, Delaware / Illinois',
          role:
            'Main Topstep operating entity disclosed in the Terms of Use as a Delaware limited liability company; operational footprint is associated with Chicago, Illinois.',
        },
        {
          name: 'TopstepFunded LLC',
          jurisdiction: 'United States',
          role:
            'Related funded-account entity referenced in public Topstep structure and community research; exact current contracting role should be checked in the latest account documents.',
        },
        {
          name: 'Topstep Brokerage LLC',
          jurisdiction: 'United States',
          registrationNumber: 'NFA ID 0567079',
          role:
            'Affiliate disclosed by Topstep as a CFTC-registered introducing broker and NFA member. This does not automatically make the Topstep prop-firm evaluation product a regulated brokerage account.',
        },
      ],
      regulatoryStatus: [
        'Topstep describes the Trading Combine as a simulated trading program and states that simulated results do not represent actual trading.',
        'No direct CFTC/NFA/FCA-style license is documented in PropRadar for the prop-firm evaluation product itself.',
        'Topstep Brokerage LLC is disclosed as a CFTC-registered introducing broker and NFA member, so users must distinguish the brokerage affiliate from the prop-firm product.',
        'Topstep works in the futures ecosystem and may route or structure live-market activity through brokerage/FCM partners, but the exact FCM relationship should be checked before funding or transferring money.',
      ],
      complaintsAndDisputes: [
        'Public complaints include rules, payout eligibility, account restrictions and live-account conditions.',
        'A reported 2026 US District Court lawsuit signal involving rules, live-account conditions and allegedly trapped reserve funds should be tracked; PropRadar still needs a direct docket/source link before presenting the allegations as verified findings.',
        'A reported September 2025 data-breach signal involving personal data, including names and Social Security numbers, should be treated as a serious watch point until a direct breach-notice source is attached.',
        'No major official regulator warning against Topstep LLC is documented in PropRadar at this check.',
      ],
      redFlags: [
        'Historic brand, but still a futures prop-firm model with simulated evaluation rules and payout constraints.',
        'Reported lawsuit signal around rules and reserve funds needs court-source verification.',
        'Reported data-breach signal needs an official breach notice or attorney-general filing before being treated as fully sourced.',
        'Users must distinguish Topstep Prop, Topstep Brokerage and any FCM/brokerage partner before assuming regulatory protection.',
      ],
      sources: [
        { label: 'Official Topstep site', url: 'https://www.topstep.com/' },
        { label: 'Topstep risk disclosure', url: 'https://www.topstep.com/risk-disclosure/' },
        { label: 'Topstep terms of use', url: 'https://www.topstep.com/terms-of-use/' },
        { label: 'Topstep consistency rules', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep' },
        { label: 'Topstep payout policy', url: 'https://help.topstep.com/en/articles/8284233-topstep-payout-policy' },
        { label: 'Topstep Trading Combine parameters', url: 'https://help.topstep.com/en/articles/8284197-trading-combine-parameters' },
        { label: 'Topstep Express Funded Account parameters', url: 'https://help.topstep.com/en/articles/8284215-express-funded-account-parameters' },
        { label: 'Topstep Brokerage', url: 'https://www.topstepbrokerage.com/' },
        { label: 'NFA BASIC search', url: 'https://www.nfa.futures.org/basicnet/' },
      ],
    },
    reviewSignals: {
      trustpilotReliabilityScore: 56,
      trustpilotReliability: 'Moyenne',
      trustpilotNote:
        'Trustpilot 3.5/5 with roughly 14k reviews. Weaker signal than CFD leaders: significant 1-star share, weak response to negative reviews and a merged Trustpilot profile.',
      trustpilotFlags: [
        'Merged Trustpilot profile',
        'Notable 1-star review share',
        'Category flagged as high-risk investment',
        'Do not read the rating as payout proof',
      ],
      trustpilotFlaggedReviewNote:
        'No official counter of removed or s…161588 tokens truncated…able days per stage/level',
    consistencyRule: 'All Rules page allows EAs, HFT, copiers, overnight and weekend holding; account inactivity after 42 days can terminate the account.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Financial Services Guide, Terms and All Rules checked. The Concept Trading discloses The Concept AU/NZ Pty Ltd, ACN 652 938 399, CAR No. 1317633, as a Corporate Authorised Representative of Vested Equities Pty Ltd, ABN 54 601 621 390, AFSL No. 478987. Unlike many demo-only firms, its Terms define a Company Account/Prop Account as a sub-account of TCT’s account with an appointed broker, traded for a share of profit.',
    auditSourcesChecked: ['Official site', 'Financial Services Guide', 'Terms and Conditions', 'All Rules', 'Trustpilot link'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. The Concept Trading has clearer Australian regulatory disclosure than most prop-firm listings, including CAR/AFSL references, FSG, complaint process and AFCA route. However, the prop-account model, profit-share terms, broker relationship, purchase fees and refund/exclusion discretion still need careful reading before checkout.',
      entities: [
        {
          name: 'The Concept AU/NZ Pty Ltd',
          jurisdiction: 'Australia',
          registrationNumber: 'ACN 652 938 399; CAR No. 1317633',
          registeredAddress: 'Tower 2, Suite 101/55 Plaza Parade, Maroochydore QLD 4558, Australia',
          role: 'Trading as The Concept Trading; Corporate Authorised Representative disclosed in FSG and footer.',
        },
        {
          name: 'Vested Equities Pty Ltd',
          jurisdiction: 'Australia',
          registrationNumber: 'ABN 54 601 621 390; AFSL No. 478987',
          role: 'Australian financial services licensee for which The Concept AU/NZ Pty Ltd acts as Corporate Authorised Representative.',
        },
      ],
      regulatoryStatus: [
        'Footer and FSG disclose CAR No. 1317633 under AFSL No. 478987.',
        'FSG says TCT is authorised under AFSL 478987 to provide general advice and deal in listed classes including derivatives, securities and foreign exchange contracts.',
        'FSG says advice is general only and not personal advice.',
        'Terms define Company Account / Proprietary Account / Prop Account as a sub-account of TCT’s account with an appointed broker.',
      ],
      complaintsAndDisputes: [
        'FSG says complaints are acknowledged within 5 business days and responses targeted within 30 days.',
        'FSG points unresolved complaints to the Australian Financial Complaints Authority, with Vested Equities member number 36765.',
        'Terms allow exclusion from experiences and case-by-case refunds/credits in some circumstances.',
      ],
      redFlags: [
        'AFSL/CAR disclosure improves transparency but does not remove trading, model, refund or platform risk.',
        'The prop-account structure differs from demo-only challenge firms and needs model-by-model contract review.',
        'FSG references a dev.theconcepttrading.com URL in one contact line, so public legal documents should be rechecked before purchase.',
      ],
      sources: [
        { label: 'The Concept Trading official site', url: 'https://theconcepttrading.com/' },
        { label: 'The Concept Trading Financial Services Guide', url: 'https://theconcepttrading.com/financial-services-guide/' },
        { label: 'The Concept Trading Terms and Conditions', url: 'https://theconcepttrading.com/terms-and-conditions/' },
        { label: 'The Concept Trading All Rules', url: 'https://theconcepttrading.com/all-rules/' },
        { label: 'The Concept Trading Trustpilot', url: 'https://www.trustpilot.com/review/theconcepttrading.com' },
      ],
    },
  }),
  universeFirm({
    id: 184,
    slug: 'the-prop-game',
    name: 'The Prop Game',
    website: 'https://thepropgame.com/',
    status: 'À surveiller',
    score: 32,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'The Prop Game terms URL to recheck manually', url: 'https://thepropgame.com/terms-and-conditions/' },
      { label: 'The Prop Game article/news search', url: 'https://www.google.com/search?q=%22The+Prop+Game%22+prop+firm+article+news' },
      { label: 'The Prop Game Trustpilot search', url: 'https://www.trustpilot.com/search?query=The%20Prop%20Game' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. No usable official legal source was captured for The Prop Game during this pass, and exact-name article/news searches returned false-positive noise rather than reliable mainstream or financial-press coverage for the prop-firm brand. The name is too generic to verify without current official terms, entity and refund/payout policy.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search', 'Generic-name false-match review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. The Prop Game remains unverified until a current official legal page confirms the operator, jurisdiction, broker status and service model.',
      entities: [{ name: 'The Prop Game', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Legal entity, terms, refund policy and simulated-service disclaimer not confirmed.'],
      complaintsAndDisputes: ['Manual review required for payout/refund complaints and possible inactive-domain history.'],
      redFlags: [
        'Generic name creates false-positive search risk.',
        'No usable primary legal source captured.',
        'Exact-name article/news search produced false-positive noise rather than useful press coverage.',
      ],
      sources: [
        { label: 'The Prop Game official-looking URL', url: 'https://thepropgame.com/' },
        { label: 'The Prop Game terms URL to recheck manually', url: 'https://thepropgame.com/terms-and-conditions/' },
        { label: 'The Prop Game article/news search', url: 'https://www.google.com/search?q=%22The+Prop+Game%22+prop+firm+article+news' },
        { label: 'The Prop Game Trustpilot search', url: 'https://www.trustpilot.com/search?query=The%20Prop%20Game' },
      ],
    },
  }),
  universeFirm({
    id: 185,
    slug: 'tentrade',
    name: 'TenTrade',
    website: 'https://tentrade.com/',
    status: 'À surveiller',
    score: 64,
    founded: 2023,
    headquarters: 'Seychelles / Cyprus representative',
    priceFrom: 32,
    profitSplit: 70,
    payoutProof: true,
    incidents: 3,
    styles: ['Broker-backed', 'Forex', 'CFD', 'Funded trader', 'Instant funding'],
    productName: 'TenTrade Funded Trader',
    productDescription:
      'Broker-backed TenEdge and TenExpress funded trader programs with instant and 1-step challenge routes, MT5 access, real-capital marketing and 70/30 profit split.',
    accountSizeMin: 1000,
    accountSizeMax: 500000,
    profitTarget: 'None on instant accounts; 10% on 1-step challenge accounts',
    maxDailyLoss: '3% to 6% depending on account size/program',
    maxDrawdown: '5% to 9% depending on account size/program',
    platforms: ['MetaTrader 5', 'WebTrader'],
    tradableAssets: ['Forex', 'Indices', 'Commodities', 'Shares', 'Crypto CFDs'],
    minTradingDays: '5 to 10 days depending on program/account size',
    consistencyRule: 'TenEdge advertises no consistency/profit-score rule; TenExpress applies profit-score/profit-cap mechanics and all accounts remain subject to risk review.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, funded program PDF, legal documents and Terms checked. TenTrade is a brand of Evalanch Ltd, Seychelles registration 8429760-1, licensed by the Seychelles FSA with license SD082. SKAI Consultancy Ltd in Cyprus is disclosed as an independent representative and is not licensed in Cyprus. Unlike demo-only prop firms, TenTrade is also an offshore CFD broker and the funded program markets real capital/real returns.',
    auditSourcesChecked: ['Official site', 'Funded Trader page', 'Legal Documents page', 'Terms PDF', 'Funded Trader PDF', 'Withdrawal and Payout Policy'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. TenTrade has a named Seychelles FSA-regulated broker entity and formal legal PDFs, but it is an offshore CFD broker with funded-trader marketing rather than a simple simulated evaluation site. Traders must separate broker account risk, CFD leverage, program rules and payout discretion.',
      entities: [
        {
          name: 'Evalanch Ltd',
          jurisdiction: 'Seychelles',
          registrationNumber: '8429760-1; Seychelles FSA license SD082',
          registeredAddress: 'CT House, Office 9A, Providence, Mahe, Seychelles',
          role: 'TenTrade brand owner/operator and regulated offshore CFD broker entity.',
        },
        {
          name: 'SKAI Consultancy Ltd',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE124105',
          registeredAddress: '30 Tempon Street, Ground Floor, Nicosia, 2408, Cyprus',
          role: 'Independent representative for TenTrade; disclosed as not authorised or licensed in Cyprus and not conducting regulated activities.',
        },
      ],
      regulatoryStatus: [
        'Homepage says TenTrade is licensed and regulated by the Seychelles FSA with license number SD082.',
        'Terms are a customer agreement with Evalanch Ltd and include margin/deposit, account liquidation and Seychelles governing-law language.',
        'Funded Trader PDF says TenTrade funds profitable traders with real money and splits profit.',
        'US and multiple sanctioned/high-risk jurisdictions are listed as banned.',
      ],
      complaintsAndDisputes: [
        'Funded Trader PDF says account reviews are done when payout requests are made and payout is conditional on no rule violation.',
        'TenEdge PDF says TenTrade may deny payout, terminate accounts or permanently disqualify traders for prohibited or abusive conduct.',
        'Terms include binding arbitration and broad company discretion around account actions.',
      ],
      redFlags: [
        'Offshore Seychelles CFD broker structure, not a plain demo-only prop evaluation.',
        'Real-capital marketing creates a different risk profile from simulated-only programs.',
        'Funded program includes broad discretionary risk-review, defamation/public-conduct and payout-denial clauses.',
        'Cyprus representative is expressly not licensed in Cyprus.',
      ],
      sources: [
        { label: 'TenTrade official site', url: 'https://tentrade.com/' },
        { label: 'TenTrade Funded Trader page', url: 'https://tentrade.com/en/trade/funded-accounts/funded-trader/' },
        { label: 'TenTrade Legal Documents', url: 'https://tentrade.com/en/company/legal-documentations/' },
        { label: 'TenTrade Terms PDF', url: 'https://tentrade.com/wp-content/uploads/2026/04/Terms-and-Conditions-Feb-2026.pdf' },
        { label: 'TenTrade funded program PDF', url: 'https://tentrade.com/wp-content/uploads/2026/06/funded-trader-2026.pdf' },
      ],
    },
  }),
  universeFirm({
    id: 186,
    slug: 'neg-markets',
    name: 'NEG Markets',
    website: 'https://negmarkets.com/',
    status: 'À surveiller',
    score: 31,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'NEG Markets article/news search', url: 'https://www.google.com/search?q=%22NEG+Markets%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'No usable official website, legal entity, terms page or refund policy was captured during the July 8, 2026 pass. Searches for NEG Markets, including exact-name article/news searches, did not return a reliable prop-firm source or mainstream financial-press coverage in this environment.',
    auditSourcesChecked: ['Official-looking URL reachability', 'Trustpilot search', 'Exact-name article/news search', 'False-match review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. NEG Markets remains a name-only watchlist entry until a current official domain and legal documents are found.',
      entities: [{ name: 'NEG Markets', jurisdiction: 'To verify', role: 'Brand/operator to identify from current official legal pages.' }],
      regulatoryStatus: [
        'Official legal entity, broker status, terms and refund policy not confirmed.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: ['Manual complaint, domain-history and Trustpilot review required before any ranking.'],
      redFlags: ['No usable primary legal source captured.', 'Potential stale or ambiguous domain/name match.'],
      sources: [
        { label: 'NEG Markets official-looking URL', url: 'https://negmarkets.com/' },
        { label: 'NEG Markets Trustpilot search', url: 'https://www.trustpilot.com/search?query=NEG%20Markets%20prop%20firm' },
        { label: 'NEG Markets article/news search', url: 'https://www.google.com/search?q=%22NEG+Markets%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 187,
    slug: 'guardeer-funding',
    name: 'Guardeer Funding',
    website: 'https://guardeerfunding.com/',
    status: 'À surveiller',
    score: 29,
    founded: 2023,
    priceFrom: 0,
    incidents: 5,
    additionalSources: [
      { label: 'Guardeer Funding article/news search', url: 'https://www.google.com/search?q=%22Guardeer+Funding%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official-looking domain shows a maintenance page saying MT5 accounts and CRM are being shifted, then links to funding.fortressfx.com. The alternate site currently resolves to a Hostinger parked-domain page. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage explaining the migration or shutdown. Entity, terms, refund policy and active operating status are not verified.',
    auditSourcesChecked: ['Maintenance page', 'Redirect target', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High operational and information risk. A maintenance notice plus redirect to a parked alternate domain is not enough to treat Guardeer Funding as active or legally verified.',
      entities: [{ name: 'Guardeer Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify if official legal pages return.' }],
      regulatoryStatus: [
        'No contracting entity captured.',
        'No terms, refund policy, non-broker language or simulated-service disclaimer captured.',
        'Alternate funding.fortressfx.com page appeared as a parked Hostinger domain.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: ['Manual review required for account migration, payout/refund and shutdown complaints.'],
      redFlags: [
        'Official-looking site under maintenance.',
        'Redirect target is parked rather than a working legal/checkout page.',
        'Do not recommend until operator and account-migration status are confirmed.',
      ],
      sources: [
        { label: 'Guardeer Funding maintenance page', url: 'https://guardeerfunding.com/' },
        { label: 'Guardeer alternate redirect target', url: 'https://funding.fortressfx.com/' },
        { label: 'Guardeer Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Guardeer%20Funding' },
        { label: 'Guardeer Funding article/news search', url: 'https://www.google.com/search?q=%22Guardeer+Funding%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 188,
    slug: 'indigo-trader-funding',
    name: 'Indigo Trader Funding',
    website: 'https://indigotraderfunding.com/',
    status: 'À surveiller',
    score: 31,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'Indigo Trader Funding article/news search', url: 'https://www.google.com/search?q=%22Indigo+Trader+Funding%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'No usable official website, legal documents or operating-status proof was captured for Indigo Trader Funding. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Treat as unverified until a current domain, entity and terms are sourced.',
    auditSourcesChecked: ['Official-looking URL reachability', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. The listing remains unresolved because current legal source material could not be found.',
      entities: [{ name: 'Indigo Trader Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: [
        'Entity, jurisdiction, broker status and simulated-service wording not confirmed.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: ['Manual Trustpilot, social and archive review required before any recommendation.'],
      redFlags: ['No usable primary source captured.', 'Possible inactive or stale prop-firm listing.'],
      sources: [
        { label: 'Indigo Trader Funding official-looking URL', url: 'https://indigotraderfunding.com/' },
        { label: 'Indigo Trader Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Indigo%20Trader%20Funding' },
        { label: 'Indigo Trader Funding article/news search', url: 'https://www.google.com/search?q=%22Indigo+Trader+Funding%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 189,
    slug: 'wegetfunded',
    name: 'WeGetFunded',
    website: 'https://wegetfunded.com/',
    status: 'À surveiller',
    score: 61,
    founded: 2025,
    headquarters: 'Saint Lucia / Dubai / Georgia office',
    priceFrom: 139,
    profitSplit: 100,
    payoutProof: true,
    incidents: 3,
    styles: ['Forex', 'MT5', 'Instant funding', 'Simulated evaluation', 'French-speaking support'],
    productName: 'WeGetFunded Challenges',
    productDescription:
      'French-first simulated prop-firm programs with 1-step, 2-step and instant-funded routes, MT5 access, virtual capital up to $400k and payout claims tied to simulated profits.',
    accountSizeMin: 5000,
    accountSizeMax: 400000,
    profitTarget: '6% on displayed 1-step; program-specific for 2-step/instant/live',
    maxDailyLoss: '3% to 5% depending on program',
    maxDrawdown: '4% to 10% depending on program',
    platforms: ['MetaTrader 5'],
    tradableAssets: ['Forex', 'CFDs', 'Digital assets to verify by program'],
    minTradingDays: '2 to 7 days depending on program and phase',
    consistencyRule: '20% to 50% depending on program/phase; funded phase includes a 30% daily PnL cap rule.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and Terms checked. WeGetFunded discloses WeGetFunded LTD in Saint Lucia, registration 2025-00757, with a rented office in Tbilisi, Georgia. Payment processing is disclosed as handled by Catalyst Creations FZCO in Dubai Silicon Oasis. Footer and terms say trading is virtual/simulated, there is no real financial risk or live financial-instrument trading, WeGetFunded is not a broker/dealer/exchange/investment adviser, and it does not accept or manage client deposits.',
    auditSourcesChecked: ['Official site', 'Terms of Sale', 'FAQ', 'Risk disclosure link', 'Trustpilot-style homepage review claims'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. WeGetFunded has unusually explicit simulated/no-deposit language and a named Saint Lucia entity, but the company is recent, uses a Dubai payment affiliate, includes broad rule-discretion, strict no-refund/chargeback clauses and a discretionary live-program section.',
      entities: [
        {
          name: 'WeGetFunded LTD',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00757',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Website operator and simulated trading program provider disclosed in footer/Terms.',
        },
        {
          name: 'Catalyst Creations FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registeredAddress: 'DSO-IFZA Dubai Digital Park, Dubai Silicon Oasis',
          role: 'Payment-process affiliate disclosed in the Terms.',
        },
      ],
      regulatoryStatus: [
        'Footer says all trading uses virtual funds in a simulated environment with no real financial risk and no real financial-instrument trading.',
        'Footer says WeGetFunded is not a broker, dealer, exchange or investment adviser and does not accept or manage client deposits.',
        'Terms say none of the services may be considered investment services and no investment advice is provided.',
        'Terms say the Live Program is discretionary and may be modified or ended for operational, regulatory or broker-risk reasons.',
      ],
      complaintsAndDisputes: [
        'Terms say all payments are final for evaluation access once the service begins.',
        'Terms say no refund is generally available for failed challenges, non-use, rule violations, chargebacks, resets or account suspension.',
        'Chargeback/contestations can trigger permanent suspension and reporting to fraud-prevention/payment processors.',
        'Withdrawal checks can be refused, delayed or require additional information for suspected fraud, manipulation, multi-accounting or rule violations.',
      ],
      redFlags: [
        'Recent 2025 Saint Lucia registration.',
        'Dubai payment affiliate should be reconciled with checkout invoice and card statement.',
        'Strong payout-guarantee marketing sits next to broad payout/refund discretion.',
        'Program rules are complex and differ materially by phase.',
      ],
      sources: [
        { label: 'WeGetFunded official site', url: 'https://wegetfunded.com/' },
        { label: 'WeGetFunded Terms of Sale', url: 'https://wegetfunded.com/legal/terms' },
        { label: 'WeGetFunded FAQ', url: 'https://wegetfunded.com/faq' },
        { label: 'WeGetFunded Trustpilot search', url: 'https://www.trustpilot.com/search?query=WeGetFunded' },
      ],
    },
  }),
  universeFirm({
    id: 190,
    slug: 'cove-funded',
    name: 'Cove Funded',
    website: 'https://covefunded.com/',
    status: 'À surveiller',
    score: 54,
    founded: 2024,
    headquarters: 'Malta',
    priceFrom: 56,
    profitSplit: 90,
    payoutProof: true,
    incidents: 4,
    styles: ['Forex', 'CFD', 'TradeLocker', 'Simulated evaluation'],
    productName: 'Cove Funded Challenges',
    productDescription:
      '1-step, 2-step and swing-style simulated challenge programs with TradeLocker access, accounts from $6k to $200k and up to 90/10 profit split claims.',
    accountSizeMin: 6000,
    accountSizeMax: 200000,
    profitTarget: '10% on displayed one-step examples',
    maxDailyLoss: '3% on displayed examples',
    maxDrawdown: '10% on displayed examples',
    platforms: ['TradeLocker'],
    tradableAssets: ['Forex', 'CFDs', 'To verify by platform'],
    minTradingDays: '4 days on displayed one-step challenge examples',
    consistencyRule: 'Not clearly captured; full program and add-on rules must be checked before purchase.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms and Risk Disclosure checked. Cove Funded discloses Collective Holdings Limited with a Malta address. Footer says COVEFUNDED is not a broker, does not accept deposits, provides demo accounts in a simulated trading environment, and its platform/data feed is powered by third-party liquidity providers. Terms are short and include a no-refund policy plus Malta governing law.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Risk Disclosure', 'Privacy Policy', 'Trustpilot link'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. Cove Funded gives a named Malta company and clear no-broker/no-deposit/demo-account language, but the public legal pages are thin, contain generic placeholder-style wording, and the Terms include a broad no-refund clause.',
      entities: [
        {
          name: 'Collective Holdings Limited',
          jurisdiction: 'Malta',
          registeredAddress: 'Room 4 Office 18, Block 19, Vincenti Buildings, Strait Street, Valletta, VLT1432, Malta',
          role: 'Company disclosed in Cove Funded footer and Terms.',
        },
      ],
      regulatoryStatus: [
        'Footer says COVEFUNDED does not provide investment services.',
        'Footer says COVEFUNDED is not a broker and does not accept deposits.',
        'Footer notification says all accounts provided to clients are demo accounts in a simulated trading environment.',
        'Terms say disputes are governed by Malta law and Maltese courts.',
      ],
      complaintsAndDisputes: [
        'Terms say Cove Funded operates a no-refund policy.',
        'Terms say Cove Funded may terminate a trader account at its discretion, with or without cause.',
        'Risk Disclosure and Privacy pages contain generic wording and should be compared with checkout rules.',
      ],
      redFlags: [
        'Short legal pages with generic/placeholder-style text.',
        'Terms use deposit/refund language even though footer says the firm does not accept deposits.',
        'No detailed payout-review or prohibited-strategy legal framework captured in this pass.',
      ],
      sources: [
        { label: 'Cove Funded official site', url: 'https://covefunded.com/' },
        { label: 'Cove Funded Terms and Conditions', url: 'https://covefunded.com/terms-and-conditions/' },
        { label: 'Cove Funded Risk Disclosure', url: 'https://covefunded.com/risk-disclosure/' },
        { label: 'Cove Funded Trustpilot', url: 'https://www.trustpilot.com/review/covefunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 191,
    slug: 'stocknet-institute',
    name: 'Stocknet Institute',
    website: 'https://stocknetinstitute.com/',
    status: 'À surveiller',
    score: 31,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'Stocknet Institute article/news search', url: 'https://www.google.com/search?q=%22Stocknet+Institute%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'No usable official site, prop-firm offer, legal entity or terms page was captured for Stocknet Institute during this pass. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for a prop-firm operator. The name may refer to education rather than an active prop-firm program.',
    auditSourcesChecked: ['Official-looking URL reachability', 'Trustpilot search', 'Exact-name article/news search', 'Category-mismatch review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. Stocknet Institute remains unresolved until a current official domain confirms whether it is a prop-firm, education provider or stale listing.',
      entities: [{ name: 'Stocknet Institute', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: [
        'Legal entity, service model, terms and refund policy not confirmed.',
        'No reliable newspaper/financial-press article surfaced for a prop-firm operator under the exact brand name.',
      ],
      complaintsAndDisputes: ['Manual education/prop-firm classification, domain-history and complaint review required.'],
      redFlags: ['No usable primary source captured.', 'Potential category mismatch: institute/education rather than prop firm.'],
      sources: [
        { label: 'Stocknet Institute official-looking URL', url: 'https://stocknetinstitute.com/' },
        { label: 'Stocknet Institute Trustpilot search', url: 'https://www.trustpilot.com/search?query=Stocknet%20Institute' },
        { label: 'Stocknet Institute article/news search', url: 'https://www.google.com/search?q=%22Stocknet+Institute%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 192,
    slug: 'ultimate-traders',
    name: 'Ultimate Traders',
    website: 'https://www.ultimatetraders.com/',
    status: 'À surveiller',
    score: 63,
    founded: 2023,
    headquarters: 'United Kingdom',
    priceFrom: 49,
    profitSplit: 90,
    payoutProof: true,
    incidents: 3,
    styles: ['Forex', 'Crypto', 'MT4', 'Simulated evaluation', 'One-step', 'Two-step'],
    productName: 'Ultimate Traders Challenges',
    productDescription:
      'Classic 2-phase and Speedy 1-phase simulated evaluation programs with demo accounts, fictitious funds, MT4 access and up to 90% gains split.',
    accountSizeMin: 5000,
    accountSizeMax: 200000,
    profitTarget: '10% / 5% on Classic; 10% on Speedy',
    maxDailyLoss: '6% on Classic; 4% on Speedy',
    maxDrawdown: '12% on Classic; 6% on Speedy',
    platforms: ['MetaTrader 4'],
    tradableAssets: ['Forex', 'Commodities', 'Indices', 'Crypto', 'Stocks to verify by platform'],
    minTradingDays: '3 days',
    consistencyRule: 'No explicit consistency rule captured, but extensive forbidden-trading and risk-management discretion applies.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms, Trading Rules, FAQ and Refund Policy checked. Ultimate Traders discloses Ultimate Traders Evaluation Ltd, UK registration 14665391, Summit House, 170 Finchley Road, London NW3 6BP. Terms say services are simulated trading tools, trading is not real, demo funds are fictitious and none of the services are investment services. Footer says all accounts are demo accounts with fictitious funds and simulated-only trading.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Trading Rules', 'FAQ', 'Cancellation and Refund Policy'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. Ultimate Traders has a named UK company and detailed simulated-service terms, but the refund policy is restrictive once login details are emailed, forbidden-trading discretion is broad and the site currently also displays a "Something new is coming" notice.',
      entities: [
        {
          name: 'Ultimate Traders Evaluation Ltd',
          jurisdiction: 'United Kingdom',
          registrationNumber: '14665391',
          registeredAddress: 'Summit House, 170 Finchley Road, London, NW3 6BP, United Kingdom',
          role: 'Website operator and contracting company disclosed in Terms and footer.',
        },
      ],
      regulatoryStatus: [
        'Terms say services consist of tools for simulated trading, analytical tools, training and educational materials.',
        'Terms say trading performed through the services is not real.',
        'Terms say funds for demo trading are fictitious and cannot be used for actual trading.',
        'Terms say none of the services are investment services or investment advice.',
      ],
      complaintsAndDisputes: [
        'Refund policy says no refund is given once trading-platform login details have been emailed.',
        'Registration fee may be refunded only after successful challenge completion and first funded-phase withdrawal with adequate profits.',
        'Forbidden trading practices can lead to trade removal, account cancellation, service termination or leverage reduction.',
      ],
      redFlags: [
        'Restrictive refund policy after credential delivery.',
        'Broad discretion to classify trading as forbidden, abusive or inconsistent with market-standard risk management.',
        'Homepage displays a "Something new is coming" notice that should be rechecked before purchase.',
      ],
      sources: [
        { label: 'Ultimate Traders official site', url: 'https://www.ultimatetraders.com/' },
        { label: 'Ultimate Traders Terms and Conditions', url: 'https://www.ultimatetraders.com/terms-and-conditions/' },
        { label: 'Ultimate Traders Trading Rules', url: 'https://www.ultimatetraders.com/trading-rules/' },
        { label: 'Ultimate Traders FAQ', url: 'https://www.ultimatetraders.com/faq/' },
        { label: 'Ultimate Traders Refund Policy', url: 'https://www.ultimatetraders.com/cancellation-and-refund-policy/' },
      ],
    },
  }),
  universeFirm({
    id: 193,
    slug: 'willis-capital',
    name: 'Willis Capital',
    website: 'https://williscapital.com/',
    status: 'À surveiller',
    score: 30,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'Willis Capital article/news search', url: 'https://www.google.com/search?q=%22Willis+Capital%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'No usable official prop-firm site, legal entity, terms page or refund policy was captured for Willis Capital during the July 8, 2026 pass. Exact-name article/news searches are dominated by unrelated Willis/WTW insurance and investment entities rather than reliable prop-firm coverage, so this entry carries a strong false-positive risk.',
    auditSourcesChecked: ['Official-looking URL reachability', 'Trustpilot search', 'Exact-name article/news search', 'Generic-name false-match review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. Willis Capital remains a name-only listing until a current official prop-firm domain and contracting entity can be identified.',
      entities: [{ name: 'Willis Capital', jurisdiction: 'To verify', role: 'Brand/operator to identify from current official legal pages.' }],
      regulatoryStatus: [
        'Official legal entity, service model, broker status and simulated-service wording not confirmed.',
        'No reliable newspaper/financial-press article surfaced for an exact prop-firm operator under this brand name.',
      ],
      complaintsAndDisputes: ['Manual domain-history, Trustpilot and social review required before any ranking.'],
      redFlags: [
        'Ambiguous brand name with unrelated financial/insurance search results.',
        'No usable primary legal source captured.',
        'Do not recommend until the official prop-firm operator is confirmed.',
      ],
      sources: [
        { label: 'Willis Capital official-looking URL', url: 'https://williscapital.com/' },
        { label: 'Willis Capital Trustpilot search', url: 'https://www.trustpilot.com/search?query=Willis%20Capital%20prop%20firm' },
        { label: 'Willis Capital article/news search', url: 'https://www.google.com/search?q=%22Willis+Capital%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 194,
    slug: 'infinity-forex-funds',
    name: 'Infinity Forex Funds',
    website: 'https://infinityforexfunds.com/',
    status: 'À surveiller',
    score: 34,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Current domain checked. infinityforexfunds.com is now an informational forex toolkit / education site rather than a captured prop-firm checkout. Its Terms of Use say it is purely informational, does not provide financial services, does not sell products and does not solicit investments or funds from users.',
    auditSourcesChecked: ['Current domain', 'Terms of Use', 'Privacy Policy link', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High false-match risk. The current site explicitly frames itself as informational and not a financial-services or product-selling business, so the PropRadar entry should not be treated as an active prop firm unless a different official domain is found.',
      entities: [{ name: 'Infinity Forex Funds', jurisdiction: 'To verify', role: 'Current domain operator not identified from captured legal text.' }],
      regulatoryStatus: [
        'Terms of Use say Infinity Forex Funds is a purely informational resource.',
        'Terms say the site does not provide financial services, sell products or solicit investments/funds.',
        'No prop-firm challenge, funded account terms, refund policy or contracting entity captured on the current domain.',
      ],
      complaintsAndDisputes: ['Manual archive review required to determine whether this was ever an active prop-firm offer or a stale database entry.'],
      redFlags: [
        'Current domain appears informational, not a prop-firm checkout.',
        'No legal entity captured.',
        'Privacy page triggered bot verification in this capture.',
      ],
      sources: [
        { label: 'Infinity Forex Funds current domain', url: 'https://infinityforexfunds.com/' },
        { label: 'Infinity Forex Funds Terms of Use', url: 'https://infinityforexfunds.com/terms-of-use/' },
        { label: 'Infinity Forex Funds Trustpilot search', url: 'https://www.trustpilot.com/search?query=Infinity%20Forex%20Funds' },
      ],
    },
  }),
  universeFirm({
    id: 195,
    slug: 'alpicap',
    name: 'Alpicap',
    website: 'https://alpicap.com/',
    status: 'Fermée',
    score: 38,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site checked. ALPICAP.com displays a closure notice saying the team decided to close the business because rising operational costs made continuation no longer viable. No legal entity, refund policy or account-settlement detail was captured on the closure page.',
    auditSourcesChecked: ['Official closure page', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'Closed-service risk. ALPICAP should not be recommended for new purchases because the official domain says the business has closed. Legacy users would still need independent confirmation of refunds, balances, payouts or account-settlement status.',
      entities: [{ name: 'ALPICAP / Alpicap', jurisdiction: 'To verify', role: 'Former operator not identified from captured closure page.' }],
      regulatoryStatus: [
        'Official site says ALPICAP.com has closed.',
        'Closure page cites rising operational costs and business non-viability.',
        'No entity, governing law, refund or support process captured from the closure notice.',
      ],
      complaintsAndDisputes: ['Manual legacy-user review required for unpaid balances, refunds, payouts and support history.'],
      redFlags: [
        'Official domain is closed.',
        'Closure page gives no legal entity or settlement process.',
        'Do not promote as an active prop firm.',
      ],
      sources: [
        { label: 'ALPICAP official closure page', url: 'https://alpicap.com/' },
        { label: 'ALPICAP Trustpilot search', url: 'https://www.trustpilot.com/search?query=ALPICAP%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 196,
    slug: 'get-leveraged',
    name: 'Get Leveraged',
    website: 'https://getleveraged.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2025,
    headquarters: 'Saint Lucia / Cyprus office',
    priceFrom: 100,
    profitSplit: 80,
    drawdownType: 'Static',
    payoutProof: true,
    incidents: 3,
    styles: ['Forex', 'Crypto', 'Swing', 'Overnight', 'Weekend', 'Day trading'],
    productName: 'Portfolio Manager Simulation',
    productDescription:
      'Portfolio program with Jr, Sr and Executive levels. Public material also references Turbo, Sprint and related variants; rules must be checked by exact program.',
    accountSizeMin: 5000,
    accountSizeMax: 1000000,
    profitTarget: '5% to 10% depending on level',
    maxDailyLoss: '3% to 5% depending on level',
    maxDrawdown: 'roughly 6% to 10% depending on level',
    platforms: ['Proprietary platform', 'To verify'],
    tradableAssets: ['Forex', 'Crypto', 'Indices', 'Metals', 'To verify'],
    minTradingDays: '3 minimum days displayed',
    consistencyRule: 'Strict consistency and risk-review rules to verify in the official conditions before buying; public feedback often references a 20% daily profit cap.',
    note:
      'Get Leveraged is visible and active, with accounts from 5k to 1M and an advertised 80% split. The current official footer discloses GetLeveraged Ltd in Saint Lucia plus a Limassol head office, while FX News Group reported that CySEC listed getleveraged.com as an unauthorized investment-firm website on April 7, 2026. PropRadar keeps it high vigilance.',
    additionalSources: [
      { label: 'Trustpilot Leveraged', url: 'https://www.trustpilot.com/review/getleveraged.com' },
      { label: 'Official About page', url: 'https://getleveraged.com/about/' },
      { label: 'Official FAQ', url: 'https://faq.getleveraged.com/' },
      { label: 'FX News Group - CySEC warning including getleveraged.com', url: 'https://fxnewsgroup.com/forex-news/regulatory/cysec-warns-against-five-unauthorized-investment-firms-2/' },
      { label: 'CySEC warnings', url: 'https://www.cysec.gov.cy/en-GB/investor-protection/warnings/' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, About page, FAQ and Trustpilot checked. Current footer discloses GetLeveraged Ltd, Saint Lucia registration 2025-00808, Robin Kelton building, Choc Bay, Castries, plus a head office at Avenue Omonoias 13, Limassol 3052, Cyprus. FX News Group reported on April 7, 2026 that CySEC listed getleveraged.com among unauthorized investment-firm websites. Terms/privacy pages were blocked by verification during this pass.',
    auditSourcesChecked: ['Official site', 'Official About page', 'Official FAQ', 'Trustpilot', 'FX News Group CySEC warning', 'CySEC warning page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High regulatory risk. Get Leveraged currently discloses a Saint Lucia company and Cyprus head office, while FX News Group reported that CySEC warned on April 7, 2026 that getleveraged.com did not belong to an entity authorized to provide investment services. This does not automatically prove every payout complaint, but it is a major due-diligence signal before purchase.',
      entities: [
        {
          name: 'GetLeveraged Ltd',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00808',
          registeredAddress: 'Robin Kelton building, Choc Bay, Castries, Saint Lucia',
          role:
            'Operating company disclosed in the current official footer.',
        },
        {
          name: 'Leveraged / Get Leveraged head office',
          jurisdiction: 'Cyprus',
          registeredAddress: 'Avenue, Omonoias 13, Limassol 3052, Cyprus',
          role:
            'Head office location disclosed on the official About page/footer; regulatory status should be checked against CySEC warning and any checkout entity.',
        },
      ],
      regulatoryStatus: [
        'Official footer discloses GetLeveraged Ltd, Saint Lucia registration 2025-00808.',
        'Official About/footer lists a Limassol, Cyprus head office.',
        'FX News Group reported that CySEC listed getleveraged.com among unauthorized investment-firm websites on April 7, 2026.',
        'PropRadar treats the warning as a major red flag until the firm can document its current regulatory position clearly.',
        'Terms and privacy pages were blocked by verification during this capture, so exact contractual and refund language still needs manual review before checkout.',
      ],
      complaintsAndDisputes: [
        'Public feedback repeatedly mentions strict consistency and risk-review rules, especially around payout eligibility.',
        'Trustpilot reliability is low in PropRadar because the rating signal is unavailable or disputed.',
        'Independent recent payout proofs should be cross-checked on Discord, Reddit, X and official terms before purchase.',
      ],
      redFlags: [
        'Recent firm with limited operating history.',
        'Reported CySEC unauthorized-website warning.',
        'Strict consistency rule frequently cited by traders.',
        'Official terms/privacy pages were not captured because the site showed verification pages.',
        'Trustpilot rating signal is not strong enough to offset the regulatory warning.',
      ],
      sources: [
        { label: 'Get Leveraged official site', url: 'https://getleveraged.com/' },
        { label: 'Get Leveraged About page', url: 'https://getleveraged.com/about/' },
        { label: 'FX News Group - CySEC warning including getleveraged.com', url: 'https://fxnewsgroup.com/forex-news/regulatory/cysec-warns-against-five-unauthorized-investment-firms-2/' },
        { label: 'CySEC warnings page', url: 'https://www.cysec.gov.cy/en-GB/investor-protection/warnings/' },
        { label: 'Official FAQ', url: 'https://faq.getleveraged.com/' },
        { label: 'Trustpilot Leveraged', url: 'https://www.trustpilot.com/review/getleveraged.com' },
      ],
    },
    reviewSignals: {
      redditScore: 55,
      redditMentions: 'public feedback to classify manually; repeated checks should focus on payout proof and 20% consistency-rule complaints',
      redditSignal: 'Mixte',
      xScore: 54,
      xMentions: 'raw X/Twitter score: visible brand, recent feedback to reread before purchase',
      xSignal: 'Mixte',
      trustpilotReliabilityScore: 28,
      trustpilotReliability: 'Faible',
      trustpilotNote:
        'Trustpilot shows an unavailable rating linked to guideline issues and reports removed reviews. Recent positive reviews exist, but they should not be treated as strong proof without cross-checking.',
      trustpilotFlags: [
        'Unavailable Trustpilot rating',
        'Public guideline-violation alert',
        'Removed reviews reported by Trustpilot',
        'Many recent reviews to cross-check with Discord, X and payout proof',
      ],
      trustpilotRatingWithheld: true,
      trustpilotFlaggedReviewNote:
        'Public Trustpilot alert: the rating is unavailable and reviews were removed. The reliability score is therefore deliberately low.',
      manipulationRiskScore: 78,
      manipulationRisk: 'Élevé',
      payoutRiskScore: 58,
      payoutRisk: 'Moyen',
      payoutIncidentCount: 1,
      payoutIncidentStatus: 'Watchlist',
      payoutIssues: [
        'Official site displays payouts, but independent proof should be consolidated.',
        'Trustpilot alert and the April 7, 2026 CySEC warning reported by FX News Group must be considered before purchase.',
      ],
      radarVerdict:
        'Get Leveraged belongs in the database because the brand is visible and active, but the unavailable Trustpilot rating, strict consistency feedback and CySEC warning reported by FX News Group justify a cautious reading before purchase.',
    },
  }),
];

// Base profiles before dated updates (used by scripts/validate-firm-updates.ts).
export const basePropFirms: PropFirm[] = [...corePropFirms, ...universePropFirms, foxxFunded, xFunded, milTraders, bullwavesPrime];

// Trustpilot review notices are review-reliability evidence, not payout evidence.
const REVIEW_NOTICE = /trustpilot[\s\S]*(breach of (our|its) guidelines|fake reviews|rating is unavailable|reviews were removed)/i;

// An item counts as payout evidence only when it says where it comes from:
// a link, a named outlet, regulator or review site, or a dated report.
const SOURCED_ITEM =
  /(https?:\/\/|trustpilot|finance ?magnates|fx ?news|financefeeds|tradeinformer|reported|according to|court|cftc|nfa|fca|cysec|asic|amf|consob|cnmv|regulator|tracker|announced|\b(19|20)\d{2}\b)/i;

/** Written, sourced items that can support a payout-risk level (closures excepted). */
// Regulator warnings, court filings and disputed terms are legal-file facts: they
// are listed on the firm page, but they do not by themselves set a payout-risk
// level unless the item itself is about payouts or withdrawals (avoids implying
// payout problems that the source does not state).
const LEGAL_ONLY_ITEM = /(warning list|warns?|alert list|unauthori[sz]ed|without (our|its) permission|court filing|court order|complaint against|filed a complaint|terms and conditions)/i;
const PAYOUT_WORDING = /(payout|withdraw|reward)/i;
// A report the firm disputes in the same source never sets a payout-risk level on its own.
const DISPUTED_ITEM = /\b(disputed|denied|denies|contested)\b/i;

export function payoutEvidence(firm: Pick<PropFirm, 'incidentsDetails' | 'reviewSignals'>) {
  return documentedIncidents(firm).filter(
    (item) =>
      !REVIEW_NOTICE.test(item) && SOURCED_ITEM.test(item) && !DISPUTED_ITEM.test(item) && (!LEGAL_ONLY_ITEM.test(item) || PAYOUT_WORDING.test(item)),
  );
}

export function isPayoutRiskAssessed(firm: Pick<PropFirm, 'reviewSignals'>) {
  return firm.reviewSignals.payoutRisk !== 'Non évalué';
}

/** True when a payout-risk level above Low is on file (and therefore backed by written evidence). */
/**
 * A payout-risk level is only published when something written backs it:
 * a documented closure, or at least one payout-related incident listed on the
 * profile. A Low level is kept when payout proof is on file. Everything else
 * is shown as "Not assessed" instead of a level PropRadar could not justify.
 */
function applyPayoutEvidenceRule(firm: PropFirm): PropFirm {
  const signals = firm.reviewSignals;
  if (firm.status === 'Fermée') {
    return {
      ...firm,
      reviewSignals: { ...signals, payoutRisk: 'Critique', payoutRiskScore: Math.max(signals.payoutRiskScore, 96), payoutIncidentStatus: 'Critique' },
    };
  }
  const evidence = payoutEvidence(firm).length;
  if (evidence > 0) {
    // "Recurring" needs at least two sourced items.
    const recurring = signals.payoutIncidentStatus === 'Incidents récurrents' || signals.payoutIncidentStatus === 'Recurring incidents';
    return recurring && evidence < 2 ? { ...firm, reviewSignals: { ...signals, payoutIncidentStatus: 'À surveiller' } } : firm;
  }
  if (signals.payoutRisk === 'Faible' && firm.payoutProof) return firm;
  return {
    ...firm,
    reviewSignals: {
      ...signals,
      payoutRisk: 'Non évalué',
      payoutRiskScore: 50,
      payoutIncidentCount: 0,
      payoutIncidentStatus: 'Aucun signal fort',
      radarVerdict:
        !signals.radarVerdict || /payout risk/i.test(signals.radarVerdict)
          ? 'Payout risk not assessed: PropRadar has no written payout incident or payout proof on file for this firm yet. Check recent payout feedback and the official terms before any purchase.'
          : signals.radarVerdict,
    },
  };
}

/**
 * Review evidence on file: Trustpilot withholding the rating after a guideline
 * breach, or fake-review alerts counted by hand. Nothing else counts.
 */
export function hasReviewEvidence(firm: Pick<PropFirm, 'reviewSignals'>) {
  return Boolean(firm.reviewSignals.trustpilotRatingWithheld) || (firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0) > 0;
}

/**
 * Review labels follow the same rule as payout risk (Geyer, 29 Oct 2026):
 * - a review-manipulation level is shown only with review evidence on file;
 * - the Trustpilot label is read from the public rating itself (4.5+ strong,
 *   4.0+ medium, below 4.0 low), "low" when Trustpilot withheld the rating,
 *   and "not assessed" when PropRadar has no rating.
 * The old formula mixed defaults (transparency, incidents) and labelled
 * firms with no evidence as high manipulation risk.
 */
function applyReviewEvidenceRule(firm: PropFirm): PropFirm {
  const signals = firm.reviewSignals;
  const evidence = hasReviewEvidence(firm);
  const rating = firm.trustpilotRating;
  const trustpilotReliability: ReviewSignals['trustpilotReliability'] = evidence
    ? 'Faible'
    : !rating
      ? 'Non évalué'
      : rating >= 4.5
        ? 'Forte'
        : rating >= 4
          ? 'Moyenne'
          : 'Faible';
  return {
    ...firm,
    reviewSignals: {
      ...signals,
      trustpilotReliability,
      trustpilotReliabilityScore: evidence ? Math.min(signals.trustpilotReliabilityScore, 25) : rating ? Math.round(rating * 20) : 50,
      manipulationRisk: evidence ? 'Élevé' : 'Non évalué',
      manipulationRiskScore: evidence ? Math.max(signals.manipulationRiskScore ?? 0, 75) : undefined,
    },
  };
}

/** True when the payout timing was never read on a source. */
export function isPayoutDelayUnknown(firm: Pick<PropFirm, 'payoutDelay'>) {
  return /^(to verify|à vérifier|variable|unknown)$/i.test(firm.payoutDelay.trim());
}

/**
 * Everything PropRadar has not verified yet on a firm file, in one list, so
 * pages can show the gaps together instead of scattering "To verify" labels.
 */
export function firmGaps(firm: PropFirm): string[] {
  if (firm.status === 'Fermée') return [];
  const gaps: string[] = [];
  if (isProvisional(firm, 'profitSplit')) gaps.push('Profit split');
  if (isProvisional(firm, 'drawdownType')) gaps.push('Drawdown type');
  if (isProvisional(firm, 'accountSize')) gaps.push('Account sizes');
  if (isPayoutDelayUnknown(firm)) gaps.push('Payout timing');
  if (firm.reviewSignals.payoutRisk === 'Non évalué') gaps.push('Payout evidence');
  if (!firm.trustpilotRating && !firm.reviewSignals.trustpilotRatingWithheld) gaps.push('Trustpilot rating');
  if (!firm.regulatoryAudit.entities.length) gaps.push('Legal entity');
  return gaps;
}

export function isReviewRiskAssessed(firm: Pick<PropFirm, 'reviewSignals'>) {
  return firm.reviewSignals.manipulationRisk !== undefined && firm.reviewSignals.manipulationRisk !== 'Non évalué';
}

// Dated, sourced updates from app/data/firm-updates.json are applied, then the
// payout- and review-evidence rules, so a level is never shown without written support.
/** A closed firm never keeps the watchlist boilerplate verdict ("on the PropRadar watchlist..."). */
function applyClosedVerdictRule(firm: PropFirm): PropFirm {
  if (firm.status !== 'Fermée' || !/on the PropRadar watchlist|has not been audited in depth yet/i.test(firm.verdict)) return firm;
  return { ...firm, verdict: `${firm.name} is recorded as closed. It is not a purchase option: see the closure record and update history below.` };
}

/**
 * A historical score described the offer while it could be purchased. Once
 * a closure has been verified and recorded, that old score must not suggest
 * the firm is a viable present-day choice. Keep the source score in the
 * archive/update file; cap only the buyer-facing operational score.
 */
export const CLOSED_FIRM_SCORE_CAP = 29;

function applyClosedScoreRule(firm: PropFirm): PropFirm {
  if (firm.status !== 'Fermée' || firm.score <= CLOSED_FIRM_SCORE_CAP) return firm;
  return { ...firm, score: CLOSED_FIRM_SCORE_CAP, closedCap: { before: firm.score, cap: CLOSED_FIRM_SCORE_CAP } };
}

/**
 * Restrictive-rules penalty (SCORING.md section 2, scale approved by Geyer on
 * 2026-11-18): the stored score is editorial, before fine print; the code
 * subtracts at most 12 points computed from classified, sourced rules.
 * Applied before the Trustpilot and closure caps. Off until the score impact
 * is approved (RULES_PENALTY_ENABLED).
 */
function applyRulesPenaltyRule(firm: PropFirm): PropFirm {
  if (!RULES_PENALTY_ENABLED || firm.status === 'Fermée') return firm;
  const result = computeRulesPenalty(getFirmUpdate(firm.slug));
  if (!result?.penalty) return firm;
  return { ...firm, score: Math.max(0, firm.score - result.penalty), rulesPenalty: { before: firm.score, penalty: result.penalty } };
}

/**
 * Trustpilot rule (Geyer, 2026-11-19; replaces the 64 cap of 2026-11-07 and
 * the −8 proposal): a current, documented Trustpilot guideline-breach /
 * fake-review-removal notice costs exactly 6 points, once, with no ceiling.
 * A dated editorial review may state that its score already includes them
 * (`set.trustpilotPenaltyIncluded`); then nothing more is deducted.
 * Applies to affiliates the same way. Closed firms keep their own cap.
 */
export const TRUSTPILOT_NOTICE_PENALTY = 6;

function applyTrustpilotPenaltyRule(firm: PropFirm): PropFirm {
  if (firm.status === 'Fermée' || !firm.reviewSignals.trustpilotRatingWithheld) return firm;
  if (getFirmUpdate(firm.slug)?.set?.trustpilotPenaltyIncluded) {
    return { ...firm, trustpilotPenalty: { before: firm.score, penalty: 0, included: true } };
  }
  return { ...firm, score: Math.max(0, firm.score - TRUSTPILOT_NOTICE_PENALTY), trustpilotPenalty: { before: firm.score, penalty: TRUSTPILOT_NOTICE_PENALTY, included: false } };
}

/**
 * Partner pop-up offers, one place for every affiliate (requested by Geyer,
 * 2026-11-13). Codes and percentages come from the promo research
 * (promoResearch.ts) or from the firm itself, with the date they were read.
 * Update them when the code changes on the firm's site.
 */
export const PARTNER_OFFERS: Record<string, PartnerOffer> = {
  'city-traders-imperium': { href: CTI_AFFILIATE_URL },
  ftmo: { href: FTMO_AFFILIATE_URL },
  the5ers: { href: THE5ERS_AFFILIATE_URL, code: THE5ERS_PROMO_CODE, codeSource: 'firm' },
  funderpro: { href: FUNDERPRO_AFFILIATE_URL, code: PROPRADAR_PROMO_CODE, codeSource: 'firm' },
  'goat-funded-trader': { href: GOAT_FUNDED_TRADER_AFFILIATE_URL, code: 'FIRSTGFT', percent: 50, scope: 'new', codeSource: 'site', checkedOn: '2026-11-14' },
  'blue-guardian': { href: BLUE_GUARDIAN_AFFILIATE_URL, code: BLUE_GUARDIAN_PROMO_CODE, percent: 25, scope: 'selected', codeSource: 'firm', checkedOn: '2026-11-15' },
  'e8-markets': { href: E8_AFFILIATE_URL, code: 'E8', percent: 15, scope: 'first', codeSource: 'site', checkedOn: '2026-11-13' },
  fxify: { href: FXIFY_AFFILIATE_URL, code: FXIFY_PROMO_CODE, percent: 25, scope: 'all', codeSource: 'firm', checkedOn: '2026-11-14' },
  upcomers: { href: UPCOMERS_AFFILIATE_URL, code: UPCOMERS_PROMO_CODE, codeSource: 'firm', checkedOn: '2026-11-14' },
  onefunded: { href: ONEFUNDED_AFFILIATE_URL, code: ONEFUNDED_PROMO_CODE, percent: 25, scope: 'all', codeSource: 'firm', checkedOn: '2026-11-15' },
};

function applyPartnerOffer(firm: PropFirm): PropFirm {
  const offer = PARTNER_OFFERS[firm.slug];
  return offer && firm.status !== 'Fermée' ? { ...firm, partnerOffer: offer } : firm;
}

/**
 * Verdicts and audit summaries never state the score (scoreClaims.ts): the
 * displayed score is computed and explained in the score dialog. The original
 * text is registered so translations can still be looked up.
 */
function applyNarrativeScoreRule(firm: PropFirm): PropFirm {
  const strip = (text: string) => {
    const stripped = stripScoreClaims(text);
    if (stripped !== text) {
      narrativeOriginals.set(stripped.trim(), text.trim());
      narrativeOriginals.set(toEnglishText(stripped).trim(), toEnglishText(text).trim());
    }
    return stripped;
  };
  const verdict = strip(firm.verdict);
  const auditSummary = firm.auditSummary ? strip(firm.auditSummary) : firm.auditSummary;
  return verdict === firm.verdict && auditSummary === firm.auditSummary ? firm : { ...firm, verdict, auditSummary };
}

export const propFirms: PropFirm[] = applyFirmUpdates(basePropFirms).map(applyPayoutEvidenceRule).map(applyReviewEvidenceRule).map(applyRulesPenaltyRule).map(applyTrustpilotPenaltyRule).map(applyClosedVerdictRule).map(applyClosedScoreRule).map(applyPublishedV4).map(applyNarrativeScoreRule).map(applyPartnerOffer);

/** Firms shown in buyer-facing lists (radar, comparator, rankings): closed firms are left out (Geyer, 14 Nov 2026). */
export const listedFirms = propFirms.filter((firm) => firm.status !== 'Fermée');
export const activeFirms = propFirms.filter((firm) => firm.status === 'Active');
export const riskyFirms = propFirms.filter((firm) => firm.status === 'À surveiller');
export const verifiedFirms = propFirms.filter((firm) => firm.auditStatus === 'Vérifié multi-source');
export const partiallyVerifiedFirms = propFirms.filter((firm) => firm.auditStatus === 'Partiellement vérifié');
export const firmsToAudit = propFirms.filter((firm) => firm.auditStatus === 'À auditer');
export const topFirms = [...propFirms]
  .filter((firm) => firm.status !== 'Fermée')
  .sort((a, b) => b.score - a.score);

export function getFirmBySlug(slug: string) {
  return propFirms.find((firm) => firm.slug === slug);
}

export function scoreClass(score: number) {
  if (score >= 80) return 'badge-score-excellent';
  if (score >= 70) return 'badge-score-good';
  if (score >= 55) return 'badge-score-watch';
  return 'badge-score-risk';
}

export function statusClass(status: PropFirm['status']) {
  if (status === 'Active') return 'badge-green';
  if (status === 'À surveiller') return 'badge-amber';
  return 'badge-red';
}

export function relationshipClass(relationship: PropFirm['commercialRelationship']) {
  return relationship === 'Affiliation transparente' ? 'badge-blue' : 'badge-neutral';
}

export function auditStatusClass(status: PropFirm['auditStatus']) {
  if (status === 'Vérifié multi-source') return 'badge-green';
  if (status === 'Partiellement vérifié') return 'badge-amber';
  return 'badge-neutral';
}

export function regulatoryRiskClass(risk: RegulatoryRiskLevel) {
  if (risk === 'Low' || risk === 'Low to medium') return 'badge-green';
  if (risk === 'Medium' || risk === 'Medium to high' || risk === 'To audit') return 'badge-amber';
  return 'badge-red';
}

export function payoutRiskClass(risk: ReviewSignals['payoutRisk']) {
  if (risk === 'Non évalué') return 'badge-neutral';
  if (risk === 'Faible') return 'badge-green';
  if (risk === 'Moyen') return 'badge-amber';
  return 'badge-red';
}

export function reviewReliabilityClass(reliability: ReviewSignals['trustpilotReliability']) {
  if (reliability === 'Non évalué') return 'badge-neutral';
  if (reliability === 'Forte') return 'badge-green';
  if (reliability === 'Moyenne') return 'badge-amber';
  return 'badge-red';
}

export function manipulationRiskClass(risk: NonNullable<ReviewSignals['manipulationRisk']>) {
  if (risk === 'Non évalué') return 'badge-neutral';
  if (risk === 'Faible') return 'badge-green';
  if (risk === 'Moyen') return 'badge-amber';
  return 'badge-red';
}

// Mention counts are only real when they come from a measured source.
// Estimated profiles derive their positive/negative split from the score, so
// those numbers must never be displayed as counted public mentions.
export function hasMeasuredMentions(source?: string) {
  return Boolean(source) && source !== 'Estimation PropRadar';
}

/** Entry price label: "No entry fee" only when a source says so, "To verify" when unknown. */
