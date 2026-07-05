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
  trustpilotReliability: 'Forte' | 'Moyenne' | 'Faible';
  trustpilotNote: string;
  trustpilotFlags?: string[];
  trustpilotFlaggedReviewCount?: number;
  trustpilotFlaggedReviewNote?: string;
  trustpilotReviewCount?: number;
  trustpilotSourceUrl?: string;
  manipulationRiskScore?: number;
  manipulationRisk?: 'Faible' | 'Moyen' | 'Élevé';
  payoutRiskScore: number;
  payoutRisk: 'Faible' | 'Moyen' | 'Élevé' | 'Critique';
  payoutIncidentCount?: number;
  payoutIncidentStatus?: 'Aucun signal fort' | 'À surveiller' | 'Incidents récurrents' | 'Critique';
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
  founded: number;
  headquarters: string;
  bestFor: string;
  verdict: string;
  priceFrom: number;
  profitSplit: number;
  drawdownType: 'EOD' | 'Trailing' | 'Static' | 'Hybride';
  newsTrading: 'Autorisé' | 'Restreint' | 'Non recommandé' | 'Allowed' | 'Restricted' | 'Not recommended' | 'Variable';
  eaAllowed: 'Oui' | 'Non' | 'Sur demande' | 'Yes' | 'No' | 'On request' | 'Variable';
  payoutDelay: string;
  incidents: number;
  incidentsDetails: string[];
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
  auditStatus: 'Vérifié multi-source' | 'Partiellement vérifié' | 'À auditer';
  auditSummary: string;
  auditSourcesChecked: string[];
  reviewSignals: ReviewSignals;
};

const REVIEW_DATE = '2026-06-29';
export const FTMO_AFFILIATE_URL = 'https://trader.ftmo.com/?affiliates=ILTDLLkYLwdMlzGLBwkq';
export const BLUE_GUARDIAN_AFFILIATE_URL = 'https://blueguardian.com/?afmc=PROPRADAR';
export const FUNDERPRO_AFFILIATE_URL = 'https://funderpro.cxclick.com/visit/?bta=48892&brand=funderpro';
export const GOAT_FUNDED_TRADER_AFFILIATE_URL = 'https://app.goatfundedtrader.com/checkout?referral_id=04e892a0e3d217576945';
export const THE5ERS_AFFILIATE_URL = 'https://www.the5ers.com/?afmc=1cuh';
export const PROPRADAR_PROMO_CODE = 'PROPRADAR';
export const THE5ERS_PROMO_CODE = '1EIJ6PO';

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

function trustpilotFlaggedReviewCount(data: Omit<PropFirm, 'reviewSignals'>, manipulationRiskScore: number) {
  if (!data.trustpilotRating) return data.incidents >= 4 ? data.incidents : 0;
  if (data.status === 'Fermée') return Math.max(6, data.incidents * 2);
  if (manipulationRiskScore >= 80) return Math.max(3, data.incidents + 2);
  if (manipulationRiskScore >= 60) return Math.max(1, data.incidents);
  if (data.trustpilotRating >= 4.6 && data.incidents >= 2) return data.incidents;
  return 0;
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
  const flaggedReviewCount = trustpilotFlaggedReviewCount(data, manipulationRiskScore);

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
      ? `Raw Trustpilot rating ${data.trustpilotRating}/5. The reliability score above is weighted with Reddit, payout incidents and proof level.`
      : 'Trustpilot rating is not filled in PropRadar: the radar applies a conservative weighting.',
    trustpilotFlags: data.trustpilotRating
      ? ['Raw rating available', 'Weighted by incidents and external proof', 'Trustpilot does not verify the facts described in reviews']
      : ['Raw rating not filled', 'Do not use Trustpilot alone'],
    trustpilotFlaggedReviewCount: flaggedReviewCount,
    trustpilotFlaggedReviewNote:
      flaggedReviewCount > 0
        ? `${flaggedReviewCount} tracked review alert(s) in PropRadar. Confirm on the firm's Trustpilot transparency page.`
        : 'No numbered fake-review alert tracked in PropRadar for this firm.',
    manipulationRiskScore,
    manipulationRisk: manipulationRiskLabel(manipulationRiskScore),
    payoutRiskScore,
    payoutRisk: payoutRiskLabel(payoutRiskScore),
    payoutIncidentCount: data.incidents,
    payoutIncidentStatus: payoutIncidentStatus(payoutRiskScore, data.incidents),
    payoutIssues: data.incidentsDetails,
    confidenceDrivers: [
      data.payoutProof ? 'Payout claimed or reported, public proof to verify' : 'Insufficient payout proof',
      data.legalVerified ? 'Legal structure identified' : 'Fragile or unverified legal structure',
      data.recentRuleChange ? 'Recent changes to check' : 'Rules have been relatively stable recently',
    ],
    radarVerdict:
      payoutRiskScore >= 65
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
    ...firmData,
  };
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
  trustpilotRating?: number;
  logoDomain?: string;
  note?: string;
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
  reviewSignals?: Partial<ReviewSignals>;
  additionalSources?: SourceLink[];
  auditStatus?: PropFirm['auditStatus'];
  auditSummary?: string;
  auditSourcesChecked?: string[];
  affiliateUrl?: string;
  commercialRelationship?: PropFirm['commercialRelationship'];
  commercialNote?: string;
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
  const logoDomain = data.logoDomain ?? (data.website ? domainFromWebsite(data.website) : undefined);
  const sourceUrl = data.website ?? data.sourceUrl ?? 'https://propfirmmatch.com/unlisted-firms';
  const sourceLabel = data.website ? `Official ${data.name} site` : data.sourceLabel ?? `${data.name} monitoring signal`;
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
      ? 'Universe entry added for broad coverage: site or monitoring source identified, but reviews, rules and payouts must still be verified before any recommendation.'
      : 'Universe entry enriched by at least one external source or PropRadar signal, but not yet validated as a full multi-source file.');

  return firm({
    id: data.id,
    slug: data.slug,
    name: data.name,
    status,
    score: data.score ?? (status === 'Active' ? 68 : isClosed ? 12 : 58),
    founded: data.founded ?? 2023,
    headquarters: data.headquarters ?? 'International',
    bestFor: `${market.toLowerCase()} to verify in the radar`,
    verdict:
      data.note ??
      `${data.name} has been added to PropRadar universe coverage. The profile stays deliberately cautious until rules, reviews and payout evidence are reviewed in depth.`,
    priceFrom: data.priceFrom ?? 0,
    profitSplit: data.profitSplit ?? (isClosed ? 0 : 80),
    drawdownType: data.drawdownType ?? (isFutures ? 'Trailing' : 'Hybride'),
    newsTrading: isClosed ? 'Not recommended' : 'Variable',
    eaAllowed: isClosed ? 'No' : 'Variable',
    payoutDelay: isClosed ? 'not applicable' : 'to verify',
    incidents: data.incidents ?? (isClosed ? 5 : status === 'Active' ? 1 : 2),
    incidentsDetails: isClosed
      ? ['Closed or not recommended status: no purchase should be prioritized.']
      : ['Universe entry: rules, fees, payouts and recent reviews must be rechecked before buying.'],
    styles,
    legalVerified: !isClosed,
    transparencyScore: status === 'Active' ? 12 : isClosed ? 2 : 9,
    payoutProof: data.payoutProof ?? false,
    recentRuleChange: data.recentRuleChange ?? true,
    trustpilotRating: data.trustpilotRating,
    logoDomain,
    communitySignal: isClosed
      ? 'Risk archive kept to avoid misleading searches.'
      : 'Community signal to enrich with Reddit, Trustpilot, Discord and recent payout proof.',
    products: isClosed
      ? []
      : [
          product({
            id: `${data.slug}-program`,
            name: data.productName ?? `${data.name} Program`,
            type: data.productType ?? (isFutures ? 'Futures evaluation' : market === 'Crypto' ? 'Challenge' : 'Challenge'),
            description: data.productDescription ?? `${market} program added to universe coverage. Conditions must be confirmed on the official source.`,
            accountSizeMin: data.accountSizeMin ?? (isFutures ? 25000 : 5000),
            accountSizeMax: data.accountSizeMax ?? (isFutures ? 300000 : 400000),
            entryFeeMin: data.priceFrom && data.priceFrom > 0 ? data.priceFrom : undefined,
            profitTarget: data.profitTarget ?? 'variable by program',
            maxDailyLoss: data.maxDailyLoss ?? 'variable',
            maxDrawdown: data.maxDrawdown ?? 'variable',
            profitSplit: `up to ${data.profitSplit ?? 80}% depending on conditions`,
            platforms: data.platforms ?? (isFutures ? ['NinjaTrader', 'Tradovate', 'Rithmic', 'To verify'] : ['MT4', 'MT5', 'cTrader', 'To verify']),
            tradableAssets: data.tradableAssets ?? (isFutures ? ['Futures'] : market === 'Crypto' ? ['Crypto'] : market === 'Actions' ? ['Stocks'] : ['Forex', 'Indices', 'Metals', 'Crypto']),
            minTradingDays: data.minTradingDays,
            hasConsistencyRule: data.hasConsistencyRule ?? true,
            consistencyRule: data.consistencyRule,
            linkToStart: data.affiliateUrl ?? data.website,
          }),
        ],
    strengths: isClosed ? ['Useful prevention archive'] : ['Name added to broad coverage', 'Official source available'],
    weaknesses: isClosed
      ? ['No purchase recommended', 'Operational risk materialized']
      : ['Profile needs more detail', 'Payout data and reviews must be rechecked', 'Not a strong recommendation by default'],
    sources: [{ label: sourceLabel, url: sourceUrl }, ...secondarySources],
    commercialRelationship: data.commercialRelationship ?? 'Aucune',
    commercialNote: data.commercialNote,
    auditStatus,
    auditSummary,
    auditSourcesChecked,
    reviewSignals: data.reviewSignals,
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
      trustpilotNote: 'Trustpilot 4.8/5 with roughly 45k public reviews. Strong signal, but Trustpilot does not fact-check every payout story; PropRadar weighs it against rules, Reddit and incidents.',
      trustpilotFlags: ['Very significant review volume', 'Claimed profile and Trustpilot subscription', 'Trustpilot filters non-compliant reviews but does not verify every described fact', 'Low response rate to negative reviews to monitor'],
      trustpilotFlaggedReviewCount: 0,
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
        hasConsistencyRule: false,
        consistencyRule: undefined,
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
    sources: [
      { label: 'Official FTMO site', url: 'https://ftmo.com/' },
      { label: 'FTMO trading objectives', url: 'https://ftmo.com/en/trading-objectives/' },
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
    trustpilotRating: 4.7,
    logoDomain: 'the5ers.com',
    communitySignal: 'Good reputation, especially among conservative traders.',
    commercialRelationship: 'Affiliation transparente',
    commercialNote: 'PropRadar may receive a commission through the The5ers link. Coupon 1EIJ6PO is shown as a checkout benefit to verify, with no impact on the score.',
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
        consistencyRule: undefined,
        linkToStart: THE5ERS_AFFILIATE_URL,
        isPopular: true,
      }),
    ],
    strengths: ['Often readable drawdown', 'Varied programs', 'Strict risk orientation'],
    weaknesses: ['Rules differ by program', 'Less flexible for some news/scalping profiles'],
    auditStatus: 'Vérifié multi-source',
    auditSummary:
      'Official The5ers sources and Trustpilot page checked: high public score, important review volume and strong response rate to negative reviews. Rules still need to be checked product by product.',
    auditSourcesChecked: ['Official site', 'Official programs', 'Trustpilot', 'Payout/community signals'],
    sources: [
      { label: 'Official The5ers site', url: 'https://the5ers.com/' },
      { label: 'The5ers programs', url: 'https://the5ers.com/programs/' },
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
      trustpilotFlaggedReviewCount: 0,
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
    payoutDelay: 'varies by account and rules',
    incidents: 1,
    transparencyScore: 17,
    payoutProof: true,
    recentRuleChange: false,
    trustpilotRating: 3.5,
    logoDomain: 'topstep.com',
    communitySignal: 'Very well known in futures, with a lot of educational content.',
    styles: ['Futures', 'Intraday', 'Scalping'],
    products: [
      product({
        id: 'topstep-trading-combine',
        name: 'Trading Combine',
        type: 'Futures evaluation',
        description: 'Futures evaluation with loss rules, targets and transition to a funded account.',
        accountSizeMin: 50000,
        accountSizeMax: 150000,
        entryFeeMin: 49,
        entryFeeMax: 149,
        maxDrawdown: 'trailing',
        profitSplit: 'up to 90%',
        platforms: ['TopstepX', 'NinjaTrader', 'Tradovate'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://www.topstep.com/',
        isPopular: true,
      }),
    ],
    strengths: ['Long track record', 'Futures specialist', 'Education and framework are fairly documented'],
    weaknesses: ['More complex drawdown rules', 'Less suited to forex/CFD traders'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official sources and Trustpilot checked. Topstep remains a historic futures operator, but the Trustpilot signal is only medium, with a notable share of negative reviews and a merged profile.',
    auditSourcesChecked: ['Official site', 'Official help center', 'Trustpilot', 'Payout/community signals'],
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
      trustpilotFlaggedReviewCount: 0,
      trustpilotFlaggedReviewNote:
        'No official counter of removed or sanctioned fake reviews was found on the page checked. PropRadar still keeps a qualitative alert linked to the merged profile and review dispersion.',
      manipulationRiskScore: 44,
      manipulationRisk: 'Moyen',
    },
    sources: [
      { label: 'Official Topstep site', url: 'https://www.topstep.com/' },
      { label: 'Help Center Topstep', url: 'https://help.topstep.com/' },
      { label: 'Trustpilot Topstep', url: 'https://www.trustpilot.com/review/topstep.com' },
    ],
  }),
  firm({
    id: 5,
    slug: 'apex-trader-funding',
    name: 'Apex Trader Funding',
    status: 'À surveiller',
    score: 66,
    founded: 2021,
    headquarters: 'United States',
    bestFor: 'futures traders attracted by aggressive discounts',
    verdict: 'Very popular thanks to discounts, but payout and consistency rules need a cold reading.',
    priceFrom: 37,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 3,
    transparencyScore: 13,
    payoutProof: true,
    logoDomain: 'apextraderfunding.com',
    communitySignal: 'Huge volume of positive and negative feedback: verify the rules before paying.',
    styles: ['Futures', 'Scalping', 'Intraday'],
    reviewSignals: {
      redditScore: 48,
      redditMentions: 'many Reddit reports on payouts, consistency, trailing threshold and withdrawal rules',
      redditSignal: 'Négatif',
      redditFlags: ['Repeated complaints about withdrawal rules', 'Confusion around consistency', 'Very frequent discounts to weigh carefully'],
      trustpilotReliabilityScore: 45,
      trustpilotReliability: 'Faible',
      trustpilotNote: 'Very positive reviews must be heavily weighted against Reddit feedback and payout rules.',
      trustpilotFlags: ['Possible gap between public rating and forum feedback', 'Reviews must be weighted against payout rules', 'Do not decide from Trustpilot alone'],
      manipulationRiskScore: 78,
      manipulationRisk: 'Élevé',
      payoutRiskScore: 78,
      payoutRisk: 'Élevé',
      payoutIncidentCount: 3,
      payoutIncidentStatus: 'Recurring incidents',
      payoutIssues: [
        'Consistency and payout rules often cited as a source of frustration.',
        'Trailing threshold can be hard for beginners to manage.',
        'Frequent discounts can hide real cost and constraints.',
      ],
      confidenceDrivers: ['Very large community', 'Popular futures product', 'But payout rules must be read line by line'],
      radarVerdict: 'Mixed signal: Apex attracts many traders, but payout and consistency risk must be treated as central.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [
      product({
        id: 'apex-evaluation',
        name: 'Evaluation Accounts',
        type: 'Futures evaluation',
        description: 'Futures evaluations with multiple account sizes and frequent discounts.',
        accountSizeMin: 25000,
        accountSizeMax: 300000,
        entryFeeMin: 37,
        entryFeeMax: 657,
        maxDailyLoss: 'specific futures rules',
        maxDrawdown: 'trailing threshold',
        profitSplit: 'up to 90%',
        platforms: ['NinjaTrader', 'Tradovate', 'Rithmic'],
        tradableAssets: ['Futures'],
        consistencyRule: 'Consistency and payout rules to read before every withdrawal.',
        linkToStart: 'https://apextraderfunding.com/',
        isPopular: true,
      }),
    ],
    strengths: ['Aggressive discount pricing', 'Large account-size range', 'Very large futures community'],
    weaknesses: ['Sensitive payout rules', 'Discounts can sometimes hide risk', 'Noisy community signal'],
    sources: [
      { label: 'Official Apex site', url: 'https://apextraderfunding.com/' },
      { label: 'Apex Support', url: 'https://support.apextraderfunding.com/' },
    ],
  }),
  firm({
    id: 6,
    slug: 'trade-the-pool',
    name: 'Trade The Pool',
    status: 'Active',
    score: 76,
    founded: 2022,
    headquarters: 'Israël',
    bestFor: 'traders actions US',
    verdict: 'Positionnement différent : financement orienté actions, utile pour diversifier hors forex/futures.',
    priceFrom: 97,
    profitSplit: 80,
    drawdownType: 'Static',
    newsTrading: 'Variable',
    eaAllowed: 'Non',
    payoutDelay: 'variable',
    incidents: 1,
    transparencyScore: 15,
    payoutProof: true,
    recentRuleChange: false,
    logoDomain: 'tradethepool.com',
    communitySignal: 'Niche plus petite, mais proposition claire sur les actions.',
    styles: ['Actions', 'Intraday', 'Swing'],
    products: [
      product({
        id: 'ttp-stock-trading',
        name: 'Stock Trading Program',
        description: 'Programme pour traders actions avec pouvoir d’achat et règles de perte.',
        accountSizeMin: 20000,
        accountSizeMax: 260000,
        entryFeeMin: 97,
        entryFeeMax: 1240,
        profitSplit: 'jusqu’à 80%',
        platforms: ['Plateforme dédiée'],
        tradableAssets: ['Actions US'],
        linkToStart: 'https://tradethepool.com/',
      }),
    ],
    strengths: ['Niche actions claire', 'Alternative aux CFD', 'Acteur lié à l’écosystème The5ers'],
    weaknesses: ['Moins adapté forex/futures', 'Règles actions spécifiques'],
    sources: [
      { label: 'Site officiel Trade The Pool', url: 'https://tradethepool.com/' },
      { label: 'FAQ Trade The Pool', url: 'https://tradethepool.com/faq/' },
    ],
  }),
  firm({
    id: 7,
    slug: 'e8-markets',
    name: 'E8 Markets',
    status: 'Active',
    score: 75,
    founded: 2021,
    headquarters: 'États-Unis',
    bestFor: 'traders CFD qui veulent une interface moderne',
    verdict: 'Marque bien présentée et populaire, avec un discours clair sur la simulation et les payouts discrétionnaires.',
    priceFrom: 48,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    transparencyScore: 14,
    payoutProof: true,
    logoDomain: 'e8markets.com',
    communitySignal: 'Bonne traction marketing, signal à compléter par vérification des règles exactes.',
    styles: ['Forex', 'Futures', 'Crypto'],
    products: [
      product({
        id: 'e8-account',
        name: 'E8 Challenge',
        description: 'Programme d’évaluation sur capital simulé avec forex, futures et crypto.',
        accountSizeMin: 5000,
        accountSizeMax: 500000,
        entryFeeMin: 48,
        entryFeeMax: 988,
        profitSplit: 'jusqu’à 80%+',
        platforms: ['TradeLocker', 'cTrader', 'Match-Trader'],
        tradableAssets: ['Forex', 'Futures', 'Crypto'],
        linkToStart: 'https://e8markets.com/',
      }),
    ],
    strengths: ['Expérience produit moderne', 'Positionnement simulation explicite', 'Payouts publics revendiqués'],
    weaknesses: ['Règles variables', 'Historique plus court que FTMO/Topstep'],
    sources: [
      { label: 'Site officiel E8 Markets', url: 'https://e8markets.com/' },
      { label: 'Help Center E8', url: 'https://help.e8markets.com/' },
    ],
  }),
  firm({
    id: 8,
    slug: 'funding-pips',
    name: 'Funding Pips',
    status: 'À surveiller',
    score: 70,
    founded: 2022,
    headquarters: 'Émirats arabes unis',
    bestFor: 'traders cherchant des challenges CFD très accessibles',
    verdict: 'Very visible and competitive, but the recent profile requires close monitoring of rules, broker partners and payout feedback.',
    priceFrom: 20,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    transparencyScore: 13,
    payoutProof: true,
    logoDomain: 'fundingpips.com',
    communitySignal: 'Widely discussed, with a need to separate discount noise from real trader feedback.',
    products: [
      product({
        id: 'fundingpips-evaluation',
        name: 'Evaluation',
        description: 'CFD challenge with several account sizes and low entry pricing.',
        accountSizeMin: 5000,
        accountSizeMax: 100000,
        entryFeeMin: 20,
        entryFeeMax: 499,
        profitSplit: 'up to 100% depending on offer',
        platforms: ['cTrader', 'Match-Trader', 'DXtrade'],
        tradableAssets: ['Forex', 'Indices', 'Metals', 'Crypto'],
        linkToStart: 'https://fundingpips.com/',
      }),
    ],
    strengths: ['Low price', 'Strong marketing', 'Publicly claimed payouts'],
    weaknesses: ['Shorter track record', 'Dependence on current platform rules', 'Needs verification before buying'],
    sources: [
      { label: 'Official Funding Pips site', url: 'https://fundingpips.com/' },
      { label: 'Help Center Funding Pips', url: 'https://help.fundingpips.com/' },
    ],
  }),
  firm({
    id: 9,
    slug: 'maven-trading',
    name: 'Maven Trading',
    status: 'Active',
    score: 73,
    founded: 2022,
    headquarters: 'Canada',
    bestFor: 'CFD traders who want accessible challenges',
    verdict: 'Recent but visible operator, interesting if the selected program rules fit your style.',
    priceFrom: 14,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: '10 business days on some programs',
    incidents: 1,
    transparencyScore: 14,
    payoutProof: true,
    recentRuleChange: false,
    logoDomain: 'maventrading.com',
    communitySignal: 'Growing community signal, still less deep than the largest brands.',
    products: [
      product({
        id: 'maven-challenge',
        name: 'Maven Challenge',
        description: '1-step, 2-step and 3-step evaluations with very accessible small sizes.',
        accountSizeMin: 2000,
        accountSizeMax: 200000,
        entryFeeMin: 14,
        entryFeeMax: 800,
        profitTarget: '8% / 5% depending on model',
        maxDailyLoss: '2% to 4% depending on model',
        maxDrawdown: '3% to 8% depending on model',
        profitSplit: '80%',
        platforms: ['MT5'],
        tradableAssets: ['Forex', 'Indices', 'Metals', 'Crypto'],
        hasConsistencyRule: false,
        consistencyRule: undefined,
        linkToStart: 'https://maventrading.com/',
      }),
    ],
    strengths: ['Very low entry price', 'Readable offers on the site', 'No consistency rule on some models'],
    weaknesses: ['Recent track record', 'Small account sizes mostly useful for testing'],
    sources: [
      { label: 'Official Maven Trading site', url: 'https://maventrading.com/' },
      { label: 'FAQ Maven Trading', url: 'https://help.maventrading.com/' },
    ],
  }),
  firm({
    id: 10,
    slug: 'alpha-capital-group',
    name: 'Alpha Capital Group',
    status: 'Active',
    score: 78,
    founded: 2021,
    headquarters: 'United Kingdom',
    bestFor: 'forex traders who want a visible UK brand',
    verdict: 'Serious operator to watch positively, with a structured offer and a fairly established brand.',
    priceFrom: 97,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    transparencyScore: 15,
    payoutProof: true,
    logoDomain: 'alphacapitalgroup.uk',
    communitySignal: 'Good recognition in the forex prop firm segment.',
    products: [
      product({
        id: 'alpha-evaluation',
        name: 'Alpha Pro Evaluation',
        description: 'Forex/CFD evaluation with simulated account sizes up to 200K.',
        accountSizeMax: 200000,
        entryFeeMin: 97,
        profitSplit: 'up to 80%+',
        platforms: ['MT5'],
        tradableAssets: ['Forex', 'Indices', 'Metals'],
        linkToStart: 'https://alphacapitalgroup.uk/',
      }),
    ],
    sources: [
      { label: 'Official Alpha Capital Group site', url: 'https://alphacapitalgroup.uk/' },
    ],
  }),
  firm({
    id: 11,
    slug: 'fxify',
    name: 'FXIFY',
    status: 'Active',
    score: 74,
    founded: 2023,
    headquarters: 'United Kingdom / International',
    bestFor: 'traders who want many programs and assets',
    verdict: 'Broad, marketing-heavy offer with claimed broker backing; good candidate, but rules must be filtered by program.',
    priceFrom: 0,
    profitSplit: 90,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Yes',
    payoutDelay: 'variable',
    incidents: 2,
    transparencyScore: 14,
    payoutProof: true,
    lastReviewed: '2026-07-02',
    trustpilotRating: 4.4,
    logoDomain: 'fxify.com',
    communitySignal: 'Strong marketing presence, many programs and frequent discounts.',
    products: [
      product({
        id: 'fxify-one-phase',
        name: 'FXIFY One Phase',
        description: 'Evaluation en une seule etape pour acceder plus vite au compte funded.',
        accountSizeMin: 5000,
        accountSizeMax: 400000,
        entryFeeMin: 250,
        profitTarget: '1 phase, objectif a confirmer selon taille',
        maxDailyLoss: 'selon plan choisi',
        maxDrawdown: 'static ou trailing selon options',
        profitSplit: 'jusqu a 90%',
        platforms: ['MT4', 'MT5', 'DXtrade', 'TradingView'],
        tradableAssets: ['Forex', 'Indices', 'Actions CFD', 'Crypto'],
        minTradingDays: '5 jours minimum avant premier payout selon page officielle',
        hasConsistencyRule: true,
        consistencyRule: 'Exact rules and add-ons must be confirmed at FXIFY checkout.',
        linkToStart: 'https://fxify.com/programs/one-phase/',
      }),
      product({
        id: 'fxify-two-phase',
        name: 'FXIFY Two Phase',
        description: 'Evaluation en deux phases pour traders qui veulent valider discipline et gestion du risque.',
        accountSizeMin: 5000,
        accountSizeMax: 400000,
        profitTarget: '2 phases, objectifs selon compte',
        maxDailyLoss: 'selon plan choisi',
        maxDrawdown: 'static ou trailing selon options',
        profitSplit: 'jusqu a 90%',
        platforms: ['MT4', 'MT5', 'DXtrade', 'TradingView'],
        tradableAssets: ['Forex', 'Indices', 'Actions CFD', 'Crypto'],
        minTradingDays: '5 jours minimum avant premier payout selon page officielle',
        hasConsistencyRule: true,
        consistencyRule: 'Structure and add-ons to reread before buying.',
        linkToStart: 'https://fxify.com/programs/two-phase/',
      }),
      product({
        id: 'fxify-three-phase',
        name: 'FXIFY Three Phase',
        description: "Évaluation en trois phases avec coût d'entrée plus bas et cible de progression annoncée à 5%.",
        accountSizeMin: 5000,
        accountSizeMax: 400000,
        profitTarget: '5% pour avancer selon page officielle',
        maxDailyLoss: 'selon plan choisi',
        maxDrawdown: 'static ou trailing selon options',
        profitSplit: 'jusqu a 90%',
        platforms: ['MT4', 'MT5', 'DXtrade', 'TradingView'],
        tradableAssets: ['Forex', 'Indices', 'Actions CFD', 'Crypto'],
        minTradingDays: '5 jours minimum avant premier payout selon page officielle',
        hasConsistencyRule: true,
        consistencyRule: 'More progressive program; details to verify on the official page.',
        linkToStart: 'https://fxify.com/programs/three-phase-challenge/',
      }),
      product({
        id: 'fxify-lightning',
        name: 'FXIFY Lightning Challenge',
        description: 'Challenge 1-step plus accessible, presente avec objectif 5% et frais bas.',
        type: 'Challenge',
        accountSizeMin: 5000,
        accountSizeMax: 100000,
        entryFeeMin: 59,
        profitTarget: '5%',
        maxDailyLoss: 'selon plan choisi',
        maxDrawdown: 'selon plan choisi',
        profitSplit: 'jusqu a 90%',
        platforms: ['MT4', 'MT5', 'DXtrade', 'TradingView'],
        tradableAssets: ['Forex', 'Indices', 'Actions CFD', 'Crypto'],
        hasConsistencyRule: true,
        consistencyRule: 'Parametres complets a confirmer sur la page Lightning.',
        linkToStart: 'https://fxify.com/programs/lightning-challenge/',
      }),
      product({
        id: 'fxify-instant-funding',
        name: 'FXIFY Instant Funding',
        description: 'Access without evaluation and without advertised target, for already confident traders.',
        type: 'Instant funding',
        accountSizeMin: 5000,
        accountSizeMax: 50000,
        profitTarget: 'pas de target annoncee',
        maxDailyLoss: 'selon plan choisi',
        maxDrawdown: 'selon plan choisi',
        profitSplit: 'jusqu a 90%',
        platforms: ['MT4', 'MT5', 'DXtrade', 'TradingView'],
        tradableAssets: ['Forex', 'Indices', 'Actions CFD', 'Crypto'],
        hasConsistencyRule: true,
        consistencyRule: 'No evaluation, but risk and payout rules must be read line by line.',
        linkToStart: 'https://fxify.com/programs/instant-funding/',
      }),
    ],
    strengths: ['Wide program range', 'EAs advertised as allowed depending on presentation', 'Many assets'],
    weaknesses: ['Many discounts', 'Prices and rules must be verified model by model'],
    sources: [
      { label: 'Official FXIFY site', url: 'https://fxify.com/' },
      { label: 'FXIFY One Phase', url: 'https://fxify.com/programs/one-phase/' },
      { label: 'FXIFY Two Phase', url: 'https://fxify.com/programs/two-phase/' },
      { label: 'FXIFY Three Phase', url: 'https://fxify.com/programs/three-phase-challenge/' },
      { label: 'FXIFY Fast Payouts', url: 'https://fxify.com/fast-payouts/' },
      { label: 'Trustpilot FXIFY', url: 'https://www.trustpilot.com/review/fxify.com' },
    ],
    auditSummary:
      'Official FXIFY pages linked by program, payout page added and Trustpilot page checked. The file remains partial until Reddit and independent payout proof are attached one by one.',
    auditSourcesChecked: ['Official site', 'Program pages', 'Official payout page', 'Trustpilot to verify'],
    reviewSignals: {
      trustpilotSourceUrl: 'https://www.trustpilot.com/review/fxify.com',
      trustpilotReviewCount: 6055,
      trustpilotFlaggedReviewCount: 3,
      trustpilotFlaggedReviewNote: 'Trustpilot checked on 2026-07-02: reviews are generally positive, but several recent reviews mention payout delays or refusals after accusations of prohibited strategy.',
      payoutIssues: [
        'Recent Trustpilot: complaint about payout pending beyond advertised delay, to verify with the official response.',
        'Recent Trustpilot: refusal or account block after alleged prohibited strategy / latency arbitrage.',
        'Mixed signal: recent reviews also report fast withdrawals, so this remains a watch point rather than a final verdict.',
      ],
      confidenceDrivers: ['Official program pages linked', 'Official payout page linked', 'Trustpilot linked with mixed payout signals'],
      radarVerdict: 'FXIFY is better documented by program. The score remains cautious: Trustpilot has strong volume, but recent payout feedback must be read before buying.',
    },
  }),
  firm({
    id: 12,
    slug: 'aqua-funded',
    name: 'AquaFunded',
    status: 'À surveiller',
    score: 69,
    founded: 2023,
    headquarters: 'International',
    bestFor: 'traders attracted by instant funding and high splits',
    verdict: 'Aggressive and marketing-heavy offer; interesting only after reading the full rules.',
    priceFrom: 35,
    profitSplit: 100,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    transparencyScore: 12,
    payoutProof: true,
    logoDomain: 'aquafunded.com',
    communitySignal: 'Young but very visible brand, to treat cautiously before buying.',
    products: [
      product({
        id: 'aqua-instant',
        name: 'Instant Funding / Challenges',
        type: 'Instant funding',
        description: 'Products with fast access and high splits depending on conditions.',
        accountSizeMax: 200000,
        entryFeeMin: 35,
        profitSplit: 'up to 100% depending on offer',
        platforms: ['MT5', 'cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Crypto'],
        linkToStart: 'https://www.aquafunded.com/',
      }),
    ],
    sources: [{ label: 'Official AquaFunded site', url: 'https://www.aquafunded.com/' }],
  }),
  firm({
    id: 13,
    slug: 'goat-funded-trader',
    name: 'GOAT Funded Trader',
    status: 'À surveiller',
    score: 68,
    founded: 2023,
    headquarters: 'International',
    bestFor: 'CFD traders sensitive to discount pricing',
    verdict: 'Very visible brand, but the score stays capped while track record and payout feedback remain less established.',
    priceFrom: 35,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    payoutProof: true,
    recentRuleChange: true,
    logoDomain: 'goatfundedtrader.com',
    communitySignal: 'Strong social visibility; due diligence required.',
    commercialRelationship: 'Affiliation transparente',
    commercialNote:
      'PropRadar may receive a commission through the GOAT Funded Trader link. Code PROPRADAR is shown as a checkout benefit to verify, with no impact on the score.',
    products: [
      product({
        id: 'goat-challenges',
        name: 'GOAT Challenges / Instant',
        description: '1-step, 2-step, 3-step and Instant programs with news trading, weekend holding and multiple platforms depending on configuration.',
        accountSizeMin: 2500,
        accountSizeMax: 400000,
        entryFeeMin: 35,
        profitTarget: 'variable by model',
        maxDailyLoss: '4% to 5% depending on model',
        maxDrawdown: '6% to 10% depending on model',
        profitSplit: 'up to 100% depending on conditions',
        platforms: ['MT5', 'TradeLocker', 'cTrader', 'Volumetric'],
        tradableAssets: ['Forex', 'Indices', 'Metals', 'Crypto', 'Stocks/ETF depending on platform'],
        consistencyRule: 'News trading and weekend holding are advertised, but exact rules must be rechecked at GFT checkout.',
        linkToStart: GOAT_FUNDED_TRADER_AFFILIATE_URL,
      }),
    ],
    strengths: ['News trading advertised', 'Weekend holding advertised', '1-step, 2-step, 3-step and Instant programs', 'PropRadar code available'],
    weaknesses: ['Strong discount logic', 'Rules vary by model', 'Do not choose only because of the coupon'],
    sources: [
      { label: 'Official GOAT Funded Trader site', url: 'https://www.goatfundedtrader.com/' },
      { label: 'PropRadar GFT signup link', url: GOAT_FUNDED_TRADER_AFFILIATE_URL },
    ],
  }),
  firm({
    id: 14,
    slug: 'brightfunded',
    name: 'BrightFunded',
    status: 'Active',
    score: 73,
    founded: 2023,
    headquarters: 'Netherlands / International',
    bestFor: 'CFD traders who want a clear site and advertised fast payouts',
    verdict: 'Recent but cleanly presented operator; interesting, with caution around fast-payout promises.',
    priceFrom: 49,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: '24h advertised in some cases',
    incidents: 1,
    transparencyScore: 14,
    payoutProof: true,
    logoDomain: 'brightfunded.com',
    communitySignal: 'Transparent positioning on platforms and payouts, but still a young track record.',
    products: [
      product({
        id: 'brightfunded-evaluation',
        name: 'BrightFunded Evaluation',
        description: 'Evaluation up to 400K with cTrader, MT5 and DXtrade.',
        accountSizeMax: 400000,
        entryFeeMin: 49,
        profitSplit: 'up to 100% depending on scaling',
        platforms: ['cTrader', 'MT5', 'DXtrade'],
        tradableAssets: ['Forex', 'Indices', 'Commodities'],
        hasConsistencyRule: false,
        consistencyRule: undefined,
        linkToStart: 'https://brightfunded.com/',
      }),
    ],
    sources: [{ label: 'Official BrightFunded site', url: 'https://brightfunded.com/' }],
  }),
  firm({
    id: 15,
    slug: 'instant-funding',
    name: 'Instant Funding',
    status: 'Active',
    score: 76,
    founded: 2021,
    headquarters: 'United Kingdom',
    bestFor: 'traders who want to avoid a classic evaluation',
    verdict: 'More mature instant-funding offer than many competitors, but smart drawdown rules must be understood.',
    priceFrom: 39,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: '14 days then weekly on some accounts',
    incidents: 1,
    transparencyScore: 15,
    payoutProof: true,
    logoDomain: 'instantfunding.com',
    communitySignal: 'Established brand in the instant-funding niche.',
    products: [
      product({
        id: 'instant-funding-account',
        name: 'Instant Funding Account',
        type: 'Instant funding',
        description: 'Direct access to a simulated account with smart drawdown and scaling rules.',
        accountSizeMin: 625,
        accountSizeMax: 300000,
        entryFeeMin: 39,
        profitTarget: 'no fixed target on some accounts',
        maxDailyLoss: 'no daily limit on some accounts',
        maxDrawdown: '10% then smart drawdown',
        profitSplit: '80% to 90%',
        platforms: ['MT5', 'cTrader', 'Match-Trader'],
        tradableAssets: ['Forex', 'Indices', 'Crypto'],
        hasConsistencyRule: false,
        consistencyRule: undefined,
        linkToStart: 'https://instantfunding.com/',
      }),
    ],
    sources: [{ label: 'Official Instant Funding site', url: 'https://instantfunding.com/' }],
  }),
  firm({
    id: 16,
    slug: 'funded-trading-plus',
    name: 'Funded Trading Plus',
    status: 'Active',
    score: 74,
    founded: 2021,
    headquarters: 'United Kingdom',
    bestFor: 'CFD traders who want several challenge formats',
    verdict: 'Rather established CFD prop-firm operator, with rules to verify by selected account type.',
    priceFrom: 119,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    transparencyScore: 14,
    payoutProof: true,
    logoDomain: 'fundedtradingplus.com',
    communitySignal: 'Relatively good track record, without reaching historic leaders.',
    products: [
      product({
        id: 'ftp-programs',
        name: 'Funded Trading Plus Programs',
        description: 'Evaluation and instant-funding programs depending on profile.',
        accountSizeMax: 200000,
        entryFeeMin: 119,
        profitSplit: 'up to 90%',
        platforms: ['MT4', 'MT5', 'cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Metals', 'Crypto'],
        linkToStart: 'https://www.fundedtradingplus.com/',
      }),
    ],
    sources: [{ label: 'Official Funded Trading Plus site', url: 'https://www.fundedtradingplus.com/' }],
  }),
  firm({
    id: 17,
    slug: 'blue-guardian',
    name: 'Blue Guardian',
    status: 'À surveiller',
    score: 70,
    founded: 2019,
    headquarters: 'United Kingdom / International',
    bestFor: 'traders looking for a CFD alternative with instant funding',
    verdict: 'Visible and established offer, but the score remains cautious on rules and commercial evolution.',
    priceFrom: 47,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'blueguardian.com',
    communitySignal: 'Decent community presence, signal to confirm with recent payout proof.',
    commercialRelationship: 'Affiliation transparente',
    commercialNote: 'PropRadar may receive a commission through the Blue Guardian link. Code PROPRADAR is shown as a checkout benefit to verify, with no impact on the score.',
    products: [
      product({
        id: 'blueguardian-programs',
        name: 'Blue Guardian Programs',
        description: 'Challenges and instant-funding offers depending on profile.',
        accountSizeMax: 200000,
        entryFeeMin: 47,
        profitSplit: 'up to 90%',
        platforms: ['MT5'],
        tradableAssets: ['Forex', 'Indices', 'Metals', 'Crypto'],
        linkToStart: BLUE_GUARDIAN_AFFILIATE_URL,
      }),
    ],
    sources: [{ label: 'Official Blue Guardian site', url: 'https://blueguardian.com/' }],
  }),
  firm({
    id: 18,
    slug: 'fintokei',
    name: 'Fintokei',
    status: 'Active',
    score: 77,
    founded: 2022,
    headquarters: 'Europe / Japon',
    bestFor: 'traders européens ou asiatiques qui veulent une marque plus régulée en apparence',
    verdict: 'Positionnement plus sobre que la moyenne, intéressant pour les traders qui veulent éviter les promesses trop agressives.',
    priceFrom: 79,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    transparencyScore: 15,
    payoutProof: true,
    recentRuleChange: false,
    logoDomain: 'fintokei.com',
    communitySignal: 'Signal plus institutionnel, moins bruyant que les prop firms très promotionnelles.',
    products: [
      product({
        id: 'fintokei-challenges',
        name: 'Fintokei Programs',
        description: 'Programmes d’évaluation et comptes simulés pour traders forex/CFD.',
        accountSizeMax: 400000,
        entryFeeMin: 79,
        profitSplit: 'jusqu’à 95% selon programme',
        platforms: ['MT4', 'MT5'],
        tradableAssets: ['Forex', 'Indices', 'Métaux'],
        linkToStart: 'https://www.fintokei.com/',
      }),
    ],
    sources: [{ label: 'Site officiel Fintokei', url: 'https://www.fintokei.com/' }],
  }),
  firm({
    id: 19,
    slug: 'audacity-capital',
    name: 'Audacity Capital',
    status: 'Active',
    score: 79,
    founded: 2012,
    headquarters: 'United Kingdom',
    bestFor: 'traders who want an older London-based operator',
    verdict: 'Established and more traditional, with less aggressive promotion than many newer prop firms.',
    priceFrom: 99,
    profitSplit: 50,
    drawdownType: 'Static',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    transparencyScore: 16,
    payoutProof: true,
    recentRuleChange: false,
    logoDomain: 'audacity.capital',
    communitySignal: 'Less viral, but with a longer track record in the sector.',
    products: [
      product({
        id: 'audacity-programs',
        name: 'Funded Trader Programs',
        description: 'Forex funding programs with a more traditional approach.',
        accountSizeMax: 500000,
        entryFeeMin: 99,
        profitSplit: '50% to 80% depending on program',
        platforms: ['MT4', 'MT5'],
        tradableAssets: ['Forex', 'Indices', 'Metals'],
        linkToStart: 'https://audacity.capital/',
      }),
    ],
    sources: [{ label: 'Official Audacity Capital site', url: 'https://audacity.capital/' }],
  }),
  firm({
    id: 20,
    slug: 'city-traders-imperium',
    name: 'City Traders Imperium',
    status: 'Active',
    score: 74,
    founded: 2018,
    headquarters: 'Royaume-Uni',
    bestFor: 'traders forex orientés formation et swing',
    verdict: 'Acteur connu du segment forex, intéressant mais à vérifier car les programmes changent régulièrement.',
    priceFrom: 99,
    profitSplit: 80,
    drawdownType: 'Static',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    transparencyScore: 14,
    trustpilotRating: 4.3,
    logoDomain: 'citytradersimperium.com',
    communitySignal: 'Nom installé, avec une audience plus formation/trading que pur discount.',
    products: [
      product({
        id: 'cti-programs',
        name: 'CTI Programs',
        description: 'Programmes de challenge et funded accounts forex.',
        accountSizeMax: 200000,
        entryFeeMin: 99,
        profitSplit: 'jusqu’à 100% selon conditions',
        platforms: ['MT5'],
        tradableAssets: ['Forex', 'Indices', 'Métaux'],
        linkToStart: 'https://www.citytradersimperium.com/',
      }),
    ],
    sources: [
      { label: 'Site officiel City Traders Imperium', url: 'https://www.citytradersimperium.com/' },
      { label: 'Trustpilot City Traders Imperium', url: 'https://fr.trustpilot.com/review/citytradersimperium.com' },
    ],
    reviewSignals: {
      trustpilotReviewCount: 1691,
      trustpilotSourceUrl: 'https://fr.trustpilot.com/review/citytradersimperium.com',
    },
  }),
  firm({
    id: 21,
    slug: 'pipfarm',
    name: 'PipFarm',
    status: 'À surveiller',
    score: 72,
    founded: 2023,
    headquarters: 'International',
    bestFor: 'traders CFD qui veulent une offre moderne et simple',
    verdict: 'Jeune marque avec une proposition propre ; score prudent faute de long historique public.',
    priceFrom: 49,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    logoDomain: 'pipfarm.com',
    communitySignal: 'Signal émergent, à renforcer avec preuves de payouts récentes.',
    products: [
      product({
        id: 'pipfarm-programs',
        name: 'PipFarm Programs',
        description: 'Programmes d’évaluation pour forex/CFD.',
        accountSizeMax: 300000,
        entryFeeMin: 49,
        profitSplit: 'variable',
        platforms: ['cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Métaux'],
        linkToStart: 'https://pipfarm.com/',
      }),
    ],
    sources: [{ label: 'Site officiel PipFarm', url: 'https://pipfarm.com/' }],
  }),
  firm({
    id: 22,
    slug: 'lark-funding',
    name: 'Lark Funding',
    status: 'À surveiller',
    score: 68,
    founded: 2022,
    headquarters: 'International',
    bestFor: 'traders qui veulent comparer des offres CFD récentes',
    verdict: 'À garder dans le radar, mais pas dans les recommandations fortes sans revue plus profonde des payouts et règles.',
    priceFrom: 49,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'larkfunding.com',
    communitySignal: 'Signal public plus limité ; prudence.',
    products: [
      product({
        id: 'lark-programs',
        name: 'Lark Funding Programs',
        description: 'Programmes d’évaluation forex/CFD.',
        accountSizeMax: 200000,
        entryFeeMin: 49,
        profitSplit: 'variable',
        platforms: ['MT4', 'MT5'],
        tradableAssets: ['Forex', 'Indices', 'Métaux'],
        linkToStart: 'https://larkfunding.com/',
      }),
    ],
    sources: [{ label: 'Site officiel Lark Funding', url: 'https://larkfunding.com/' }],
  }),
  firm({
    id: 23,
    slug: 'bespoke-funding-program',
    name: 'Bespoke Funding Program',
    status: 'À surveiller',
    score: 61,
    founded: 2022,
    headquarters: 'International',
    bestFor: 'traders qui font une veille large du marché',
    verdict: 'À considérer comme entrée de radar plus que comme recommandation, tant que les signaux récents ne sont pas solidement confirmés.',
    priceFrom: 0,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 3,
    legalVerified: false,
    transparencyScore: 9,
    logoDomain: 'bespokefundingprogram.com',
    communitySignal: 'Signal communautaire insuffisant pour une recommandation forte.',
    products: [
      product({
        id: 'bespoke-programs',
        name: 'Bespoke Programs',
        description: 'Programmes d’évaluation historiques à revérifier avant tout achat.',
        accountSizeMax: 500000,
        profitSplit: 'variable',
        linkToStart: 'https://bespokefundingprogram.com/',
      }),
    ],
    strengths: ['Nom connu par les comparateurs historiques'],
    weaknesses: ['Statut opérationnel et conditions à revérifier fortement', 'Pas de recommandation forte'],
    sources: [{ label: 'Site Bespoke Funding Program', url: 'https://bespokefundingprogram.com/' }],
  }),
  firm({
    id: 24,
    slug: 'tradeify',
    name: 'Tradeify',
    status: 'Active',
    score: 72,
    founded: 2023,
    headquarters: 'United States',
    bestFor: 'futures traders who want a modern alternative',
    verdict: 'Growing futures alternative to compare with Topstep, Apex and Take Profit Trader.',
    priceFrom: 99,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'daily advertised on some plans',
    incidents: 1,
    payoutProof: true,
    logoDomain: 'tradeify.co',
    communitySignal: 'Young futures operator with rising visibility.',
    styles: ['Futures', 'Intraday', 'Scalping'],
    products: [
      product({
        id: 'tradeify-futures',
        name: 'Futures Plans',
        type: 'Futures evaluation',
        description: 'Futures plans with evaluations and instant-funding offers.',
        accountSizeMax: 150000,
        entryFeeMin: 99,
        maxDrawdown: 'trailing depending on plan',
        profitSplit: 'up to 90%',
        platforms: ['Tradovate', 'NinjaTrader'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://tradeify.co/',
      }),
    ],
    sources: [{ label: 'Official Tradeify site', url: 'https://tradeify.co/' }],
  }),
  firm({
    id: 25,
    slug: 'take-profit-trader',
    name: 'Take Profit Trader',
    status: 'Active',
    score: 73,
    founded: 2021,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui veulent des payouts rapides',
    verdict: 'Offre futures centrée sur la rapidité de passage en PRO et de retrait, à vérifier côté règles de buffer.',
    priceFrom: 99,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'day-one annoncé en PRO',
    incidents: 1,
    payoutProof: true,
    logoDomain: 'takeprofittrader.com',
    communitySignal: 'Bonne visibilité dans la niche futures, avec proposition de payout claire.',
    styles: ['Futures', 'Intraday'],
    products: [
      product({
        id: 'tpt-test',
        name: 'TPT Test / PRO',
        type: 'Futures evaluation',
        description: 'Évaluation futures avec passage vers PRO et split 80/20 à 90/10 selon compte.',
        accountSizeMax: 150000,
        entryFeeMin: 99,
        maxDrawdown: 'trailing ou EOD selon PRO+',
        profitSplit: '80% à 90%',
        platforms: ['NinjaTrader', 'Tradovate', 'TradingView', 'Quantower'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://takeprofittrader.com/',
      }),
    ],
    sources: [{ label: 'Site officiel Take Profit Trader', url: 'https://takeprofittrader.com/' }],
  }),
  firm({
    id: 26,
    slug: 'earn2trade',
    name: 'Earn2Trade',
    status: 'Active',
    score: 78,
    founded: 2017,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui veulent un parcours éducatif',
    verdict: 'Acteur futures plus ancien et orienté formation, intéressant pour les traders qui veulent un cadre d’apprentissage.',
    priceFrom: 150,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable via partenaires',
    incidents: 1,
    transparencyScore: 16,
    payoutProof: true,
    recentRuleChange: false,
    logoDomain: 'earn2trade.com',
    communitySignal: 'Réputation plus ancienne que beaucoup de programmes futures récents.',
    styles: ['Futures', 'Formation'],
    products: [
      product({
        id: 'earn2trade-gauntlet',
        name: 'Gauntlet / Trader Career Path',
        type: 'Futures evaluation',
        description: 'Parcours d’évaluation futures avec composante éducative.',
        accountSizeMax: 200000,
        entryFeeMin: 150,
        maxDrawdown: 'règles futures spécifiques',
        profitSplit: 'jusqu’à 80%',
        platforms: ['NinjaTrader', 'Finamark', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://www.earn2trade.com/',
      }),
    ],
    sources: [{ label: 'Site officiel Earn2Trade', url: 'https://www.earn2trade.com/' }],
  }),
  firm({
    id: 27,
    slug: 'oneup-trader',
    name: 'OneUp Trader',
    status: 'Active',
    score: 72,
    founded: 2017,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui veulent une évaluation classique',
    verdict: 'Acteur futures installé, moins flashy que les nouveaux venus mais à comparer sur coût total et règles.',
    priceFrom: 125,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    payoutProof: true,
    recentRuleChange: false,
    logoDomain: 'oneuptrader.com',
    communitySignal: 'Présence durable sur la niche futures.',
    styles: ['Futures'],
    products: [
      product({
        id: 'oneup-evaluation',
        name: 'OneUp Evaluation',
        type: 'Futures evaluation',
        description: 'Évaluation futures avec comptes de tailles multiples.',
        accountSizeMax: 250000,
        entryFeeMin: 125,
        maxDrawdown: 'trailing',
        profitSplit: 'jusqu’à 80%',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://www.oneuptrader.com/',
      }),
    ],
    sources: [{ label: 'Site officiel OneUp Trader', url: 'https://www.oneuptrader.com/' }],
  }),
  firm({
    id: 28,
    slug: 'elite-trader-funding',
    name: 'Elite Trader Funding',
    status: 'À surveiller',
    score: 64,
    founded: 2021,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui comparent les promotions',
    verdict: 'Acteur futures connu pour ses offres, mais score prudent à cause de la complexité des règles et du bruit communautaire.',
    priceFrom: 45,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 3,
    logoDomain: 'elitetraderfunding.app',
    communitySignal: 'Avis très mélangés ; lire les règles et retours récents.',
    styles: ['Futures'],
    products: [
      product({
        id: 'elite-futures',
        name: 'Elite Evaluations',
        type: 'Futures evaluation',
        description: 'Évaluations futures avec promotions fréquentes.',
        accountSizeMax: 300000,
        entryFeeMin: 45,
        maxDrawdown: 'trailing selon plan',
        profitSplit: 'jusqu’à 90%',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://elitetraderfunding.app/',
      }),
    ],
    sources: [{ label: 'Site officiel Elite Trader Funding', url: 'https://elitetraderfunding.app/' }],
  }),
  firm({
    id: 29,
    slug: 'tickticktrader',
    name: 'TickTickTrader',
    status: 'À surveiller',
    score: 68,
    founded: 2022,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui veulent des comptes simples',
    verdict: 'Nom actif de la niche futures, mais à garder en surveillance faute de profondeur historique comparable à Topstep.',
    priceFrom: 99,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'tickticktrader.com',
    communitySignal: 'Signal public correct mais encore à consolider.',
    styles: ['Futures'],
    products: [
      product({
        id: 'ticktick-futures',
        name: 'TickTickTrader Accounts',
        type: 'Futures evaluation',
        description: 'Évaluations futures avec tailles de compte multiples.',
        accountSizeMax: 250000,
        entryFeeMin: 99,
        maxDrawdown: 'trailing',
        profitSplit: 'variable',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://tickticktrader.com/',
      }),
    ],
    sources: [{ label: 'Site officiel TickTickTrader', url: 'https://tickticktrader.com/' }],
  }),
  firm({
    id: 30,
    slug: 'leeloo-trading',
    name: 'Leeloo Trading',
    status: 'Active',
    score: 70,
    founded: 2020,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui veulent des évaluations classiques',
    verdict: 'Acteur futures connu, à comparer sur drawdown, resets, activation et règles de payout.',
    priceFrom: 77,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'leelootrading.com',
    communitySignal: 'Nom connu mais avis contrastés selon promotions et règles.',
    styles: ['Futures'],
    products: [
      product({
        id: 'leeloo-accounts',
        name: 'Leeloo Evaluation',
        type: 'Futures evaluation',
        description: 'Évaluations futures avec différentes tailles et options.',
        accountSizeMax: 300000,
        entryFeeMin: 77,
        maxDrawdown: 'trailing',
        profitSplit: 'variable',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://www.leelootrading.com/',
      }),
    ],
    sources: [{ label: 'Site officiel Leeloo Trading', url: 'https://www.leelootrading.com/' }],
  }),
  firm({
    id: 31,
    slug: 'uprofit-trader',
    name: 'UProfit Trader',
    status: 'Active',
    score: 69,
    founded: 2019,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui veulent une alternative aux gros noms',
    verdict: 'Acteur futures actif, à classer en alternative plutôt qu’en choix prioritaire sans revue poussée.',
    priceFrom: 89,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'uprofittrader.com',
    communitySignal: 'Présence stable, mais retours moins massifs que Topstep/Apex.',
    styles: ['Futures'],
    products: [
      product({
        id: 'uprofit-accounts',
        name: 'UProfit Evaluations',
        type: 'Futures evaluation',
        description: 'Évaluations futures avec comptes de tailles multiples.',
        accountSizeMax: 200000,
        entryFeeMin: 89,
        maxDrawdown: 'trailing',
        profitSplit: 'variable',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://uprofittrader.com/',
      }),
    ],
    sources: [{ label: 'Site officiel UProfit Trader', url: 'https://uprofittrader.com/' }],
  }),
  firm({
    id: 32,
    slug: 'myfundedfutures',
    name: 'MyFundedFutures',
    status: 'Active',
    score: 73,
    founded: 2023,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui veulent une alternative récente',
    verdict: 'Acteur récent mais très visible sur futures ; à suivre de près pour règles de payout et stabilité.',
    priceFrom: 80,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    payoutProof: true,
    logoDomain: 'myfundedfutures.com',
    communitySignal: 'Signal récent et en croissance.',
    styles: ['Futures'],
    products: [
      product({
        id: 'mffu-futures',
        name: 'MyFundedFutures Accounts',
        type: 'Futures evaluation',
        description: 'Évaluations futures avec tailles et règles propres.',
        accountSizeMax: 150000,
        entryFeeMin: 80,
        maxDrawdown: 'trailing',
        profitSplit: 'jusqu’à 90%',
        platforms: ['NinjaTrader', 'Tradovate'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://myfundedfutures.com/',
      }),
    ],
    sources: [{ label: 'Site officiel MyFundedFutures', url: 'https://myfundedfutures.com/' }],
  }),
  firm({
    id: 33,
    slug: 'bulenox',
    name: 'Bulenox',
    status: 'À surveiller',
    score: 65,
    founded: 2020,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui surveillent les alternatives low cost',
    verdict: 'Acteur futures connu mais à mettre en surveillance sur règles, activation, drawdown et retours payout.',
    priceFrom: 78,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 3,
    logoDomain: 'bulenox.com',
    communitySignal: 'Avis contrastés ; diligence renforcée.',
    styles: ['Futures'],
    products: [
      product({
        id: 'bulenox-evaluation',
        name: 'Bulenox Evaluation',
        type: 'Futures evaluation',
        description: 'Évaluations futures avec comptes de tailles multiples.',
        accountSizeMax: 250000,
        entryFeeMin: 78,
        maxDrawdown: 'trailing',
        profitSplit: 'variable',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://bulenox.com/',
      }),
    ],
    sources: [{ label: 'Site officiel Bulenox', url: 'https://bulenox.com/' }],
  }),
  firm({
    id: 34,
    slug: 'fast-track-trading',
    name: 'Fast Track Trading',
    status: 'À surveiller',
    score: 60,
    founded: 2024,
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui étudient les nouveaux modèles',
    verdict: 'À surveiller seulement : marque récente, promesse rapide, historique encore insuffisant pour recommander fort.',
    priceFrom: 0,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 3,
    transparencyScore: 9,
    logoDomain: 'fasttracktrading.net',
    communitySignal: 'Trop récent pour une confiance forte.',
    styles: ['Futures'],
    products: [
      product({
        id: 'fasttrack-futures',
        name: 'Fast Track Futures',
        type: 'Futures evaluation',
        description: 'Offre futures récente à contrôler avant achat.',
        accountSizeMax: 150000,
        maxDrawdown: 'variable',
        profitSplit: 'variable',
        platforms: ['À vérifier'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://fasttracktrading.net/',
      }),
    ],
    strengths: ['Nom à suivre dans la veille marché'],
    weaknesses: ['Historique court', 'Pas assez de recul', 'Ne pas classer comme recommandation prioritaire'],
    sources: [{ label: 'Site Fast Track Trading', url: 'https://fasttracktrading.net/' }],
  }),
  firm({
    id: 35,
    slug: 'the-funded-trader',
    name: 'The Funded Trader',
    status: 'À surveiller',
    score: 35,
    founded: 2021,
    headquarters: 'États-Unis',
    bestFor: 'cas de vigilance sectorielle',
    verdict: 'Ancien nom majeur qui a connu de fortes controverses opérationnelles ; à ne pas traiter comme recommandation sans preuve récente robuste.',
    priceFrom: 0,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'à revérifier',
    incidents: 5,
    legalVerified: false,
    transparencyScore: 5,
    payoutProof: false,
    logoDomain: 'thefundedtraderprogram.com',
    communitySignal: 'Historique de controverses et de plaintes publiques.',
    reviewSignals: {
      redditScore: 18,
      redditMentions: 'retours négatifs très visibles autour des interruptions, remboursements et payouts',
      redditSignal: 'Négatif',
      redditFlags: ['Signal communautaire très négatif', 'Historique de crise opérationnelle', 'Témoignages de traders à vérifier avant toute décision'],
      trustpilotReliabilityScore: 18,
      trustpilotReliability: 'Faible',
      trustpilotNote: 'Les avis positifs ne suffisent pas à compenser l’historique opérationnel et les alertes communautaires.',
      trustpilotFlags: ['Avis positifs non suffisants', 'Historique opérationnel prioritaire', 'Forte divergence avis/risque'],
      manipulationRiskScore: 92,
      manipulationRisk: 'Élevé',
      payoutRiskScore: 94,
      payoutRisk: 'Critique',
      payoutIncidentCount: 5,
      payoutIncidentStatus: 'Critique',
      payoutIssues: [
        'Historique public de fortes controverses opérationnelles.',
        'Risque élevé de divergence entre marketing, avis et expérience réelle des traders.',
        'À exclure des recommandations tant que des preuves récentes et robustes ne sont pas établies.',
      ],
      confidenceDrivers: ['Nom connu historiquement', 'Mais signaux de confiance insuffisants', 'Pas de recommandation active'],
      radarVerdict: 'Alerte critique : la visibilité de marque ne compense pas les problèmes opérationnels et les signaux payout.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [],
    strengths: ['Nom connu historiquement'],
    weaknesses: ['Risque opérationnel élevé', 'Historique controversé', 'À exclure des recommandations fortes'],
    sources: [{ label: 'Site The Funded Trader', url: 'https://thefundedtraderprogram.com/' }],
  }),
  firm({
    id: 36,
    slug: 'myfundedfx',
    name: 'MyFundedFX / Seacrest Markets',
    status: 'Fermée',
    score: 5,
    founded: 2022,
    headquarters: 'États-Unis / Afrique du Sud',
    bestFor: 'cas d’école à éviter',
    verdict: 'Le domaine redirige vers un message indiquant que Seacrest Markets n’opère plus : aucun achat recommandé.',
    priceFrom: 0,
    profitSplit: 0,
    drawdownType: 'Hybride',
    newsTrading: 'Not recommended',
    eaAllowed: 'No',
    payoutDelay: 'not applicable',
    incidents: 6,
    legalVerified: false,
    transparencyScore: 1,
    payoutProof: false,
    logoDomain: 'myfundedfx.com',
    communitySignal: 'Statut fermé confirmé par message public du domaine redirigé.',
    reviewSignals: {
      redditScore: 5,
      redditMentions: 'complaint archives and closed status',
      redditSignal: 'Négatif',
      redditFlags: ['Closed status', 'Complaint archives', 'No purchase to consider'],
      trustpilotReliabilityScore: 10,
      trustpilotReliability: 'Faible',
      trustpilotNote: 'Historical reviews are no longer useful for a purchase decision: operational status comes first.',
      trustpilotFlags: ['Obsolete historical reviews', 'Operational status comes first', 'Do not use the rating as a buying signal'],
      manipulationRiskScore: 96,
      manipulationRisk: 'Élevé',
      payoutRiskScore: 100,
      payoutRisk: 'Critique',
      payoutIncidentCount: 6,
      payoutIncidentStatus: 'Critique',
      payoutIssues: [
        'Seacrest Markets publicly states that it no longer operates.',
        'No active product recommended.',
        'Operational risk is materialized: do not send capital or buy a challenge.',
      ],
      confidenceDrivers: ['Prevention archive', 'Closed status matters more than old ratings', 'No active recommendation'],
      radarVerdict: 'Critical alert: PropRadar keeps this profile to prevent traders from relying on misleading old reviews.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [],
    strengths: ['None for a current purchase'],
    weaknesses: ['Closed', 'No active product recommended', 'Operational risk materialized'],
    sources: [{ label: 'Seacrest Markets closure message', url: 'https://myfundedfx.com/' }],
  }),
  firm({
    id: 37,
    slug: 'myforexfunds',
    name: 'My Forex Funds',
    status: 'Fermée',
    score: 8,
    founded: 2020,
    headquarters: 'Canada',
    bestFor: 'case study to avoid',
    verdict: 'Major sector-risk example: high popularity does not mean operational safety.',
    priceFrom: 0,
    profitSplit: 0,
    drawdownType: 'Hybride',
    newsTrading: 'Non recommandé',
    eaAllowed: 'Non',
    payoutDelay: 'non applicable',
    incidents: 6,
    legalVerified: false,
    transparencyScore: 2,
    payoutProof: false,
    logoDomain: 'myforexfunds.com',
    communitySignal: 'Very well-known name, but not usable as a buying option.',
    reviewSignals: {
      redditScore: 8,
      redditMentions: 'crisis archives, trader complaints and regulatory action',
      redditSignal: 'Négatif',
      redditFlags: ['Regulatory action', 'Crisis archives', 'Misleading historical popularity'],
      trustpilotReliabilityScore: 12,
      trustpilotReliability: 'Faible',
      trustpilotNote: 'The historical review rating no longer has trust value after the regulatory action.',
      trustpilotFlags: ['Historical reviews disqualified by regulatory risk', 'Do not compare as an active firm', 'Status matters more than the rating'],
      manipulationRiskScore: 98,
      manipulationRisk: 'Élevé',
      payoutRiskScore: 100,
      payoutRisk: 'Critique',
      payoutIncidentCount: 6,
      payoutIncidentStatus: 'Critique',
      payoutIssues: [
        'Public regulatory action against the operator.',
        'Not usable as a current buying option.',
        'Textbook case showing that popularity and public reviews do not guarantee safety.',
      ],
      confidenceDrivers: ['Sector-risk case study', 'Useful prevention archive', 'No active recommendation'],
      radarVerdict: 'Critical alert: My Forex Funds shows why PropRadar should not rely on public reviews alone.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [],
    strengths: ['None for a current purchase'],
    weaknesses: ['Closed', 'Regulatory risk materialized', 'No product to recommend'],
    sources: [{ label: 'CFTC - My Forex Funds', url: 'https://www.cftc.gov/' }],
  }),
  firm({
    id: 38,
    slug: 'surgetrader',
    name: 'SurgeTrader',
    status: 'Fermée',
    score: 6,
    founded: 2021,
    headquarters: 'United States',
    bestFor: 'case study to avoid',
    verdict: 'Former known operator whose closure shows why operational status must be monitored.',
    priceFrom: 0,
    profitSplit: 0,
    drawdownType: 'Static',
    newsTrading: 'Not recommended',
    eaAllowed: 'No',
    payoutDelay: 'not applicable',
    incidents: 5,
    legalVerified: false,
    transparencyScore: 2,
    payoutProof: false,
    logoDomain: 'surgetrader.com',
    communitySignal: 'Keep in the radar archives as a risk alert.',
    products: [],
    strengths: ['None for a current purchase'],
    weaknesses: ['Closed', 'No active product', 'Risky history'],
    sources: [{ label: 'Former SurgeTrader site', url: 'https://surgetrader.com/' }],
  }),
  firm({
    id: 39,
    slug: 'true-forex-funds',
    name: 'True Forex Funds',
    status: 'Fermée',
    score: 7,
    founded: 2021,
    headquarters: 'Hongrie',
    bestFor: 'cas d’école à éviter',
    verdict: 'Nom historique du secteur désormais à classer comme non recommandable pour achat.',
    priceFrom: 0,
    profitSplit: 0,
    drawdownType: 'Hybride',
    newsTrading: 'Non recommandé',
    eaAllowed: 'Non',
    payoutDelay: 'non applicable',
    incidents: 5,
    legalVerified: false,
    transparencyScore: 2,
    payoutProof: false,
    logoDomain: 'trueforexfunds.com',
    communitySignal: 'Historical signal of closure and instability.',
    products: [],
    strengths: ['None for a current purchase'],
    weaknesses: ['Closed', 'High operational risk', 'No product recommended'],
    sources: [{ label: 'Former True Forex Funds site', url: 'https://trueforexfunds.com/' }],
  }),
  firm({
    id: 40,
    slug: 'fidelcrest',
    name: 'Fidelcrest',
    status: 'Fermée',
    score: 9,
    founded: 2018,
    headquarters: 'International',
    bestFor: 'case study to avoid',
    verdict: 'Former known operator to keep in risk archives rather than recommendations.',
    priceFrom: 0,
    profitSplit: 0,
    drawdownType: 'Hybride',
    newsTrading: 'Not recommended',
    eaAllowed: 'No',
    payoutDelay: 'not applicable',
    incidents: 5,
    legalVerified: false,
    transparencyScore: 2,
    payoutProof: false,
    logoDomain: 'fidelcrest.com',
    communitySignal: 'Known history, but not a buying priority.',
    products: [],
    strengths: ['None for a current purchase'],
    weaknesses: ['Not recommended status', 'Risky history', 'No active product to prioritize'],
    sources: [{ label: 'Former Fidelcrest site', url: 'https://fidelcrest.com/' }],
  }),
];

const universePropFirms: PropFirm[] = [
  universeFirm({ id: 41, slug: 'funding-traders', name: 'Funding Traders', website: 'https://fundingtraders.com/', status: 'Active', score: 70, founded: 2023, priceFrom: 39, payoutProof: true }),
  universeFirm({ id: 42, slug: 'breakout-prop', name: 'Breakout Prop', website: 'https://breakoutprop.com/', status: 'Active', score: 72, founded: 2024, market: 'Crypto', priceFrom: 50, payoutProof: true, styles: ['Crypto', 'Forex'] }),
  universeFirm({ id: 43, slug: 'hantec-trader', name: 'Hantec Trader', website: 'https://hantectrader.com/', status: 'Active', score: 73, founded: 2023, headquarters: 'Royaume-Uni', priceFrom: 49, payoutProof: true }),
  universeFirm({ id: 44, slug: 'rebelsfunding', name: 'RebelsFunding', website: 'https://www.rebelsfunding.com/', status: 'À surveiller', score: 63, founded: 2023, priceFrom: 25 }),
  universeFirm({ id: 45, slug: 'sabiotrade', name: 'SabioTrade', website: 'https://sabiotrade.com/', status: 'À surveiller', score: 64, founded: 2023, priceFrom: 50 }),
  universeFirm({ id: 46, slug: 'dna-funded', name: 'DNA Funded', website: 'https://dnafunded.com/', status: 'À surveiller', score: 65, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 47, slug: 'hola-prime', name: 'Hola Prime', website: 'https://holaprime.com/', status: 'À surveiller', score: 64, founded: 2024, priceFrom: 48 }),
  universeFirm({ id: 48, slug: 'sway-funded', name: 'Sway Funded', website: 'https://swayfunded.com/', status: 'À surveiller', score: 60, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 49, slug: 'funded-peaks', name: 'Funded Peaks', website: 'https://fundedpeaks.com/', status: 'À surveiller', score: 58, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 50, slug: 'the-trading-pit', name: 'The Trading Pit', website: 'https://www.thetradingpit.com/', status: 'Active', score: 76, founded: 2022, headquarters: 'Liechtenstein', market: 'Multi-asset', priceFrom: 99, payoutProof: true, styles: ['Futures', 'Forex', 'Indices'] }),
  universeFirm({ id: 51, slug: 'finotive-funding', name: 'Finotive Funding', website: 'https://finotivefunding.com/', status: 'Active', score: 71, founded: 2021, priceFrom: 50, payoutProof: true }),
  universeFirm({ id: 52, slug: 'ftuk', name: 'FTUK', website: 'https://ftuk.com/', status: 'Active', score: 72, founded: 2021, headquarters: 'Royaume-Uni', priceFrom: 119, payoutProof: true }),
  universeFirm({ id: 53, slug: 'lux-trading-firm', name: 'Lux Trading Firm', website: 'https://luxtradingfirm.com/', status: 'Active', score: 74, founded: 2021, headquarters: 'Royaume-Uni', priceFrom: 149, payoutProof: true }),
  universeFirm({ id: 54, slug: 't4tcapital', name: 'T4TCapital', website: 'https://www.t4tcapital.com/', status: 'Active', score: 72, founded: 2019, headquarters: 'Royaume-Uni', priceFrom: 125, payoutProof: true }),
  universeFirm({ id: 55, slug: 'traders-with-edge', name: 'Traders With Edge', website: 'https://traderswithedge.com/', status: 'Active', score: 70, founded: 2022, priceFrom: 55, payoutProof: true }),
  universeFirm({ id: 56, slug: 'ment-funding', name: 'Ment Funding', website: 'https://mentfunding.com/', status: 'À surveiller', score: 66, founded: 2021, priceFrom: 250, payoutProof: true }),
  universeFirm({ id: 57, slug: 'ofp-funding', name: 'OFP Funding', website: 'https://ofpfunding.com/', status: 'À surveiller', score: 63, founded: 2022, productType: 'Instant funding', priceFrom: 49 }),
  universeFirm({ id: 58, slug: 'smart-prop-trader', name: 'Smart Prop Trader', website: 'https://smartproptrader.com/', status: 'À surveiller', score: 62, founded: 2022, priceFrom: 67 }),
  universeFirm({ id: 59, slug: 'toptier-trader', name: 'TopTier Trader', website: 'https://toptiertrader.com/', status: 'À surveiller', score: 64, founded: 2021, priceFrom: 49 }),
  universeFirm({ id: 60, slug: 'wemastertrade', name: 'WeMasterTrade', website: 'https://www.wemastertrade.com/', status: 'À surveiller', score: 62, founded: 2022, priceFrom: 49 }),
  universeFirm({
    id: 61,
    slug: 'funderpro',
    name: 'FunderPro',
    website: 'https://funderpro.com/',
    affiliateUrl: FUNDERPRO_AFFILIATE_URL,
    status: 'Active',
    score: 73,
    founded: 2023,
    headquarters: 'Europe',
    priceFrom: 69,
    payoutProof: true,
    commercialRelationship: 'Affiliation transparente',
    commercialNote:
      'PropRadar may receive a commission through the FunderPro link. Code PROPRADAR is shown as a checkout benefit to verify, with no impact on the score.',
  }),
  universeFirm({ id: 62, slug: 'crypto-fund-trader', name: 'Crypto Fund Trader', website: 'https://cryptofundtrader.com/', status: 'À surveiller', score: 62, founded: 2022, market: 'Crypto', priceFrom: 55, styles: ['Crypto'] }),
  universeFirm({ id: 63, slug: 'hyrotrader', name: 'HyroTrader', website: 'https://hyrotrader.com/', status: 'À surveiller', score: 61, founded: 2022, market: 'Crypto', priceFrom: 59, styles: ['Crypto'] }),
  universeFirm({ id: 64, slug: 'funded-bull', name: 'Funded Bull', website: 'https://fundedbull.com/', status: 'À surveiller', score: 58, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 65, slug: 'prop-number-one', name: 'Prop Number One', website: 'https://propnumberone.com/', status: 'À surveiller', score: 57, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 66, slug: 'karma-prop-traders', name: 'Karma Prop Traders', website: 'https://karmaprotraders.com/', status: 'À surveiller', score: 58, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 67, slug: 'wall-street-funded', name: 'Wall Street Funded', website: 'https://wallstreetfunded.com/', status: 'À surveiller', score: 57, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 68, slug: 'tradeday', name: 'TradeDay', website: 'https://tradeday.com/', status: 'Active', score: 75, founded: 2020, market: 'Futures', priceFrom: 99, payoutProof: true, styles: ['Futures'] }),
  universeFirm({ id: 69, slug: 'blusky-trading', name: 'BluSky Trading', website: 'https://blusky.pro/', status: 'À surveiller', score: 60, founded: 2022, market: 'Futures', priceFrom: 99, styles: ['Futures'] }),
  universeFirm({ id: 70, slug: 'tradefundrr', name: 'TradeFundrr', website: 'https://tradefundrr.com/', status: 'À surveiller', score: 64, founded: 2021, market: 'Futures', priceFrom: 99, styles: ['Futures'] }),
  universeFirm({ id: 71, slug: 'funded-futures-network', name: 'Funded Futures Network', website: 'https://fundedfuturesnetwork.com/', status: 'À surveiller', score: 58, founded: 2023, market: 'Futures', priceFrom: 99, styles: ['Futures'] }),
  universeFirm({ id: 72, slug: 'daytraders-com', name: 'DayTraders.com', website: 'https://daytraders.com/', status: 'À surveiller', score: 59, founded: 2023, market: 'Futures', priceFrom: 99, styles: ['Futures'] }),
  universeFirm({ id: 73, slug: 'axi-select', name: 'Axi Select', website: 'https://www.axi.com/axi-select', status: 'Active', score: 77, founded: 2023, headquarters: 'International', market: 'Forex/CFD', priceFrom: 0, payoutProof: true, note: 'Programme de capital allocation lié au broker Axi, à comparer séparément des prop firms challenge classiques.' }),
  universeFirm({ id: 74, slug: 'kortanafx', name: 'KortanaFX', website: 'https://kortanafx.com/', status: 'À surveiller', score: 42, founded: 2023, priceFrom: 147, incidents: 4, note: 'Le site annonce une pause temporaire des opérations après perte de licence MT5 : ne pas considérer comme recommandation active.' }),
  universeFirm({ id: 75, slug: 'thinkcapital', name: 'ThinkCapital', website: 'https://www.thinkcapital.com/', status: 'À surveiller', score: 65, founded: 2024, priceFrom: 39 }),
  universeFirm({ id: 76, slug: 'ic-funded', name: 'IC Funded', website: 'https://icfunded.com/', status: 'À surveiller', score: 65, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 77, slug: 'traddoo', name: 'Traddoo', website: 'https://traddoo.com/', status: 'À surveiller', score: 61, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 78, slug: 'fx2-funding', name: 'FX2 Funding', website: 'https://fx2funding.com/', status: 'À surveiller', score: 59, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 79, slug: 'rocket21-challenge', name: 'Rocket21 Challenge', website: 'https://rocket21challenge.com/', status: 'À surveiller', score: 60, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 80, slug: 'glow-node', name: 'Glow Node', website: 'https://glow-node.com/', status: 'À surveiller', score: 58, founded: 2022, priceFrom: 49 }),
  universeFirm({ id: 81, slug: 'funded-engineer', name: 'Funded Engineer', website: 'https://fundedengineer.com/', status: 'Fermée', score: 10, founded: 2023, incidents: 5, note: 'Archive de risque : ne pas traiter comme une option d’achat actuelle.' }),
  universeFirm({ id: 82, slug: 'skilled-funded-traders', name: 'Skilled Funded Traders', website: 'https://skilledfundedtraders.com/', status: 'À surveiller', score: 35, founded: 2022, incidents: 5, note: 'Historique et signaux opérationnels à traiter avec forte prudence.' }),
  universeFirm({ id: 83, slug: 'funding-talent', name: 'Funding Talent', website: 'https://fundingtalent.com/', status: 'Fermée', score: 8, founded: 2019, incidents: 6, note: 'Archive de risque conservée pour la mémoire du secteur.' }),
  universeFirm({ id: 84, slug: 'blufx', name: 'BluFX', website: 'https://blufx.co.uk/', status: 'À surveiller', score: 38, founded: 2015, incidents: 5, note: 'Historique très controversé : à exclure des recommandations fortes sans preuves récentes solides.' }),
  universeFirm({ id: 85, slug: 'traders-central', name: 'Traders Central', website: 'https://traderscentral.com/', status: 'À surveiller', score: 61, founded: 2020, priceFrom: 49 }),
  universeFirm({ id: 86, slug: 'my-flash-funding', name: 'My Flash Funding', website: 'https://myflashfunding.com/', status: 'À surveiller', score: 55, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 87, slug: 'blueberry-funded', name: 'Blueberry Funded', website: 'https://blueberryfunded.com/', status: 'À surveiller', score: 64, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 88, slug: 'funded-squad', name: 'Funded Squad', website: 'https://fundedsquad.com/', status: 'À surveiller', score: 55, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 89, slug: 'funded-unicorn', name: 'Funded Unicorn', website: 'https://fundedunicorn.com/', status: 'À surveiller', score: 55, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 90, slug: 'quant-tekel', name: 'Quant Tekel', website: 'https://quanttekel.com/', status: 'À surveiller', score: 60, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 91, slug: 'ascendx-capital', name: 'Ascendx Capital', website: 'https://ascendxcapital.com/', status: 'À surveiller', score: 58, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 92, slug: 'purdia-capital', name: 'Purdia Capital', website: 'https://purdiacapital.com/', status: 'À surveiller', score: 57, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 93, slug: 'nova-funding', name: 'Nova Funding', website: 'https://novafunding.com/', status: 'À surveiller', score: 56, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 94, slug: 'nations-trading', name: 'Nations Trading', website: 'https://nationstrading.com/', status: 'À surveiller', score: 56, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 95, slug: 'funder-trading', name: 'Funder Trading', website: 'https://fundertrading.com/', status: 'À surveiller', score: 57, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 96, slug: 'the-forex-funder', name: 'The Forex Funder', website: 'https://theforexfunder.com/', status: 'À surveiller', score: 58, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 97, slug: 'fundedlions', name: 'FundedLions', website: 'https://fundedlions.com/', status: 'À surveiller', score: 56, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 98, slug: 'fx-capital-funding', name: 'FX Capital Funding', website: 'https://fxcapitalfunding.com/', status: 'À surveiller', score: 55, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 99, slug: 'leveled-up-society', name: 'Leveled Up Society', website: 'https://leveledupsociety.com/', status: 'À surveiller', score: 55, founded: 2022, priceFrom: 49 }),
  universeFirm({ id: 100, slug: 'one-of-one-funding', name: '1of1 Funding', website: 'https://1of1funding.com/', status: 'À surveiller', score: 56, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 101, slug: 'wsfunded', name: 'WSFunded', website: 'https://wsfunded.com/', status: 'À surveiller', score: 61, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 102, slug: 'for-traders', name: 'For Traders', website: 'https://www.fortraders.com/', status: 'Active', score: 72, founded: 2023, priceFrom: 49, payoutProof: true }),
  universeFirm({ id: 103, slug: 'moneta-funded', name: 'Moneta Funded', website: 'https://monetafunded.com/', status: 'À surveiller', score: 62, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 104, slug: 'fundedelite', name: 'FundedElite', website: 'https://fundedelite.com/', status: 'À surveiller', score: 63, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 105, slug: 'orion-funded', name: 'Orion Funded', website: 'https://orionfunded.com/', status: 'À surveiller', score: 61, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 106, slug: 'bem-funding', name: 'BEM Funding', website: 'https://bemfunding.com/', status: 'À surveiller', score: 60, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 107, slug: 'atmos-funded', name: 'Atmos Funded', website: 'https://atmosfunded.com/', status: 'À surveiller', score: 62, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 108, slug: 'top-one-trader', name: 'Top One Trader', website: 'https://toponetrader.com/', status: 'À surveiller', score: 64, founded: 2023, priceFrom: 49 }),
  universeFirm({ id: 109, slug: 'qt-funded', name: 'QT Funded', website: 'https://qtfunded.com/', status: 'À surveiller', score: 60, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 110, slug: 'atfunded', name: 'ATFunded', website: 'https://atfunded.com/', status: 'À surveiller', score: 59, founded: 2024, priceFrom: 49 }),
  universeFirm({
    id: 111,
    slug: 'lucid-trading',
    name: 'Lucid Trading',
    website: 'https://lucidtrading.com/',
    status: 'À surveiller',
    score: 61,
    founded: 2024,
    market: 'Futures',
    priceFrom: 99,
    styles: ['Futures'],
    trustpilotRating: 4.6,
    additionalSources: [{ label: 'Trustpilot Lucid Trading', url: 'https://fr.trustpilot.com/review/lucidtrading.com' }],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Lucid page and Trustpilot checked: public rating is high and recent review volume is significant. The file remains partial because Reddit, rules, payout proof and independent incidents still need deeper review.',
    auditSourcesChecked: ['Official site', 'Trustpilot'],
    reviewSignals: {
      trustpilotReliabilityScore: 68,
      trustpilotReliability: 'Moyenne',
      trustpilotNote:
        'Trustpilot 4.6/5 with a high volume of recent reviews. Positive signal, but weighted carefully: recently claimed profile, paid Trustpilot subscription, regularly invited reviews and weak response rate to negative reviews.',
      trustpilotFlags: [
        'Important public volume',
        'Many recent verified reviews',
        'Trustpilot does not verify the facts described in every review',
        'Weak response to negative reviews to monitor',
      ],
      trustpilotFlaggedReviewCount: 0,
      trustpilotFlaggedReviewNote:
        'No public counter of removed or sanctioned fake reviews was found on the Trustpilot page checked. The score remains weighted by the young profile and review collection model.',
      manipulationRiskScore: 42,
      manipulationRisk: 'Moyen',
    },
  }),
  universeFirm({
    id: 112,
    slug: 'alpha-futures',
    name: 'Alpha Futures',
    website: 'https://alphafutures.com/',
    status: 'À surveiller',
    score: 63,
    founded: 2024,
    market: 'Futures',
    priceFrom: 99,
    styles: ['Futures', 'Intraday', 'Scalping'],
    productName: 'Alpha Futures evaluation',
    productType: 'Futures evaluation',
    productDescription: 'Futures-focused evaluation to investigate for intraday index traders. Check drawdown type, news windows, payout caps and scaling rules before buying.',
    platforms: ['To verify'],
    tradableAssets: ['Futures'],
    note: 'Alpha Futures is included as an SMC/ICT research lead because futures traders often care about cleaner index execution, drawdown structure and scaling rules. PropRadar keeps it on watch until official rules, payout proof and independent reviews are sourced more deeply.',
    auditSummary: 'Alpha Futures is currently a watchlist research lead for futures day traders. Verify official rules, payout proof, drawdown type and recent community feedback before treating it as a recommendation.',
    auditSourcesChecked: ['Official site to verify', 'Community signals to source'],
  }),
  universeFirm({ id: 113, slug: 'top-one-futures', name: 'Top One Futures', website: 'https://toponefutures.com/', status: 'À surveiller', score: 61, founded: 2024, market: 'Futures', priceFrom: 99, styles: ['Futures'] }),
  universeFirm({ id: 114, slug: 'e8-futures', name: 'E8 Futures', website: 'https://e8futures.com/', status: 'À surveiller', score: 63, founded: 2024, market: 'Futures', priceFrom: 99, styles: ['Futures'] }),
  universeFirm({ id: 115, slug: 'traders-launch', name: 'Traders Launch', website: 'https://traderslaunch.com/', status: 'À surveiller', score: 58, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 116, slug: 'sure-leverage', name: 'Sure Leverage', website: 'https://sureleverage.com/', status: 'À surveiller', score: 57, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 117, slug: 'tradexprop', name: 'TradeXProp', website: 'https://tradexprop.com/', status: 'À surveiller', score: 58, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 118, slug: 'sfx-funded', name: 'SFX Funded', website: 'https://sfxfunded.com/', status: 'À surveiller', score: 57, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 119, slug: 'tribe-funded', name: 'Tribe Funded', website: 'https://tribefunded.com/', status: 'À surveiller', score: 57, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 120, slug: 'atlas-funded', name: 'Atlas Funded', website: 'https://atlasfunded.com/', status: 'À surveiller', score: 58, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 121, slug: 'tx3-funding', name: 'TX3 Funding', website: 'https://tx3funding.com/', status: 'À surveiller', score: 57, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 122, slug: 'aurafunded', name: 'AuraFunded', website: 'https://aurafunded.com/', status: 'À surveiller', score: 57, founded: 2024, priceFrom: 49 }),
  universeFirm({ id: 123, slug: 'getcryptofunded', name: 'GetCryptoFunded', website: 'https://getcryptofunded.com/', status: 'À surveiller', score: 58, founded: 2024, market: 'Crypto', priceFrom: 49, styles: ['Crypto'] }),
  universeFirm({ id: 124, slug: 'summit-strike-capital', name: 'Summit Strike Capital', status: 'À surveiller', score: 54, founded: 2024, priceFrom: 0 }),
  universeFirm({ id: 125, slug: 'nostro', name: 'Nostro', status: 'À surveiller', score: 54, founded: 2024, priceFrom: 0 }),
  universeFirm({ id: 126, slug: 'funding-frontier', name: 'Funding Frontier', status: 'À surveiller', score: 54, founded: 2024, priceFrom: 0 }),
  universeFirm({ id: 127, slug: 'funded7', name: 'Funded7', status: 'À surveiller', score: 54, founded: 2024, priceFrom: 0 }),
  universeFirm({ id: 128, slug: 'equity-edge', name: 'Equity Edge', status: 'À surveiller', score: 54, founded: 2024, priceFrom: 0 }),
  universeFirm({ id: 129, slug: 'myfxcapital', name: 'MyFxCapital', status: 'À surveiller', score: 53, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 130, slug: 'alphaproptraders', name: 'AlphaPropTraders', status: 'À surveiller', score: 53, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 131, slug: 'syndicate-funded', name: 'Syndicate Funded', status: 'À surveiller', score: 53, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 132, slug: 'fxci', name: 'FXCI', status: 'À surveiller', score: 53, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 133, slug: 'monevis', name: 'Monevis Funding Platform', status: 'À surveiller', score: 53, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 134, slug: 'funded-trader-markets', name: 'Funded Trader Markets', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 135, slug: 'funds-for-traders', name: 'Funds For Traders', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 136, slug: 'now-trade-funded', name: 'Now Trade Funded', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 137, slug: 'dei-funded', name: 'Dei Funded', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 138, slug: 'fxrk', name: 'FXRK', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 139, slug: 'forexive', name: 'Forexive', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 140, slug: 'onlyfunds', name: 'OnlyFunds', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 141, slug: 'myfundedcapital', name: 'MyFundedCapital', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 142, slug: 'upcomers', name: 'Upcomers', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 143, slug: 'axe-trader-funding', name: 'Axe Trader Funding', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 144, slug: 'inspire-funding', name: 'Inspire Funding', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 145, slug: 'klein-funding-crypto', name: 'Klein Funding Crypto', status: 'À surveiller', score: 52, founded: 2023, market: 'Crypto', priceFrom: 0, styles: ['Crypto'] }),
  universeFirm({ id: 146, slug: 'algo-forex-funds', name: 'Algo Forex Funds', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 147, slug: 'aeon-funded', name: 'Aeon Funded', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 148, slug: 'trade-amber', name: 'Trade Amber', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 149, slug: 'astra-capital-funding', name: 'Astra Capital Funding', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 150, slug: 'funding-your-trades', name: 'Funding Your Trades', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 151, slug: 'mifunder', name: 'MiFunder', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 152, slug: 'fundings4u', name: 'Fundings4u', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 153, slug: 'alpine-funded', name: 'Alpine Funded', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 154, slug: 'limitless-funding', name: 'Limitless Funding', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 155, slug: 'tradersedgefx', name: 'TradersEdgeFX', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 156, slug: 'gry-funding', name: 'Gry Funding', status: 'À surveiller', score: 52, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 157, slug: 'cash-flow-funding', name: 'Cash Flow Funding', status: 'À surveiller', score: 33, founded: 2023, incidents: 5, note: 'Entrée de warning : traiter comme signal de risque tant que le statut officiel et les payouts ne sont pas clarifiés.' }),
  universeFirm({ id: 158, slug: 'levels', name: 'Levels', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 159, slug: 'fundedhive', name: 'FundedHive', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 160, slug: 'titan-capital-markets', name: 'Titan Capital Markets', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 161, slug: 'tiger-funded', name: 'Tiger Funded', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 162, slug: 'fundyourfx', name: 'FundYourFX', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 163, slug: 'ryze-trading', name: 'Ryze Trading', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 164, slug: 'tradicave', name: 'Tradicave', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 165, slug: 'fortunes-funding', name: 'Fortunes Funding', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 166, slug: 'clarity-traders', name: 'Clarity Traders', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 167, slug: 'trading-cult', name: 'Trading Cult', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 168, slug: 'next-step-funded', name: 'Next Step Funded', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 169, slug: 'forex-funds-flow', name: 'Forex Funds Flow', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 170, slug: 'my-crypto-funding', name: 'My Crypto Funding', status: 'À surveiller', score: 51, founded: 2023, market: 'Crypto', priceFrom: 0, styles: ['Crypto'] }),
  universeFirm({ id: 171, slug: 'directfundedtrader', name: 'DirectFundedTrader', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 172, slug: 'exfunded', name: 'ExFunded', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 173, slug: 'optimal-traders', name: 'Optimal Traders', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 174, slug: 'quantec-trading-capital', name: 'Quantec Trading Capital', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 175, slug: 'next-level-funding', name: 'Next Level Funding', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 176, slug: 'superfunded', name: 'SuperFunded', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 177, slug: 'ck-capital', name: 'CK Capital', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 178, slug: 'onefunded', name: 'OneFunded', status: 'À surveiller', score: 51, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 179, slug: 'firmity-funding', name: 'Firmity Funding', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 180, slug: 'hash-hedge', name: 'Hash Hedge', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 181, slug: 'real-funds-trader', name: 'Real Funds Trader', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 182, slug: 'forfx', name: 'ForFX', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 183, slug: 'the-concept-trading', name: 'The Concept Trading', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 184, slug: 'the-prop-game', name: 'The Prop Game', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 185, slug: 'tentrade', name: 'TenTrade', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 186, slug: 'neg-markets', name: 'NEG Markets', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 187, slug: 'guardeer-funding', name: 'Guardeer Funding', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 188, slug: 'indigo-trader-funding', name: 'Indigo Trader Funding', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 189, slug: 'wegetfunded', name: 'WeGetFunded', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 190, slug: 'cove-funded', name: 'Cove Funded', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 191, slug: 'stocknet-institute', name: 'Stocknet Institute', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 192, slug: 'ultimate-traders', name: 'Ultimate Traders', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 193, slug: 'willis-capital', name: 'Willis Capital', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 194, slug: 'infinity-forex-funds', name: 'Infinity Forex Funds', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({ id: 195, slug: 'alpicap', name: 'Alpicap', status: 'À surveiller', score: 50, founded: 2023, priceFrom: 0 }),
  universeFirm({
    id: 196,
    slug: 'get-leveraged',
    name: 'Get Leveraged',
    website: 'https://getleveraged.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2025,
    headquarters: 'Cyprus',
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
      'Get Leveraged is visible and active, with accounts from 5k to 1M and an advertised 80% split. PropRadar treats it as high vigilance because the firm is recent, the Trustpilot rating is unavailable, public feedback repeatedly mentions strict consistency rules, and a reported regulator warning must be checked before purchase.',
    additionalSources: [
      { label: 'Trustpilot Leveraged', url: 'https://www.trustpilot.com/review/getleveraged.com' },
      { label: 'Official FAQ', url: 'https://faq.getleveraged.com/' },
      { label: 'FX News Group - CySEC warning including getleveraged.com', url: 'https://fxnewsgroup.com/forex-news/regulatory/cysec-warns-against-five-unauthorized-investment-firms-2/' },
      { label: 'CySEC warnings', url: 'https://www.cysec.gov.cy/en-GB/investor-protection/warnings/' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, FAQ and Trustpilot checked. FX News Group reported on April 7, 2026 that CySEC listed getleveraged.com among unauthorized investment-firm websites. The file stays cautious because of that warning, the unavailable Trustpilot rating and strict consistency feedback.',
    auditSourcesChecked: ['Official site', 'Official FAQ', 'Trustpilot', 'FX News Group CySEC warning', 'CySEC warning page'],
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
      trustpilotFlaggedReviewCount: 1,
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

export const propFirms: PropFirm[] = [...corePropFirms, ...universePropFirms];

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

export function payoutRiskClass(risk: ReviewSignals['payoutRisk']) {
  if (risk === 'Faible') return 'badge-green';
  if (risk === 'Moyen') return 'badge-amber';
  return 'badge-red';
}

export function reviewReliabilityClass(reliability: ReviewSignals['trustpilotReliability']) {
  if (reliability === 'Forte') return 'badge-green';
  if (reliability === 'Moyenne') return 'badge-amber';
  return 'badge-red';
}

export function manipulationRiskClass(risk: NonNullable<ReviewSignals['manipulationRisk']>) {
  if (risk === 'Faible') return 'badge-green';
  if (risk === 'Moyen') return 'badge-amber';
  return 'badge-red';
}

export function formatUsd(value: number) {
  if (value <= 0) return 'To verify';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}
