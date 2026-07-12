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

export type RegulatoryRiskLevel = 'Low' | 'Low to medium' | 'Medium' | 'Medium to high' | 'High' | 'Critical' | 'To audit';

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
  regulatoryAudit: RegulatoryAudit;
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
    regulatoryAudit: defaultRegulatoryAudit({
      name: data.name,
      headquarters: data.headquarters,
      lastReviewed: data.lastReviewed ?? REVIEW_DATE,
      sources: data.sources,
    }),
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
  lastReviewed?: string;
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
    newsTrading: data.newsTrading ?? (isClosed ? 'Not recommended' : 'Variable'),
    eaAllowed: data.eaAllowed ?? (isClosed ? 'No' : 'Variable'),
    payoutDelay: data.payoutDelay ?? (isClosed ? 'not applicable' : 'to verify'),
    incidents: data.incidents ?? (isClosed ? 5 : status === 'Active' ? 1 : 2),
    incidentsDetails: data.incidentsDetails ?? (isClosed
      ? ['Closed or not recommended status: no purchase should be prioritized.']
      : ['Universe entry: rules, fees, payouts and recent reviews must be rechecked before buying.']),
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
        ]),
    strengths: data.strengths ?? (isClosed ? ['Useful prevention archive'] : ['Name added to broad coverage', 'Official source available']),
    weaknesses: data.weaknesses ?? (isClosed
      ? ['No purchase recommended', 'Operational risk materialized']
      : ['Profile needs more detail', 'Payout data and reviews must be rechecked', 'Not a strong recommendation by default']),
    sources: [{ label: sourceLabel, url: sourceUrl }, ...secondarySources],
    commercialRelationship: data.commercialRelationship ?? 'Aucune',
    commercialNote: data.commercialNote,
    auditStatus,
    auditSummary,
    auditSourcesChecked,
    ...(data.regulatoryAudit ? { regulatoryAudit: data.regulatoryAudit } : {}),
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
        { label: 'FX News Group - OANDA acquired by FTMO', url: 'https://fxnewsgroup.com/forex-news/retail-forex/oanda-acquired-by-czech-prop-firm-ftmo/' },
        { label: 'Trustpilot FTMO', url: 'https://www.trustpilot.com/review/ftmo.com' },
      ],
    },
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
        { label: 'Trustpilot The5ers', url: 'https://www.trustpilot.com/review/the5ers.com' },
        { label: 'FCA warnings page', url: 'https://www.fca.org.uk/news/warnings' },
      ],
    },
    sources: [
      { label: 'Official The5ers site', url: 'https://the5ers.com/' },
      { label: 'The5ers programs', url: 'https://the5ers.com/programs/' },
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
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-06',
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
      trustpilotFlaggedReviewCount: 0,
      trustpilotFlaggedReviewNote:
        'No official counter of removed or sanctioned fake reviews was found on the page checked. PropRadar still keeps a qualitative alert linked to the merged profile and review dispersion.',
      manipulationRiskScore: 44,
      manipulationRisk: 'Moyen',
    },
    sources: [
      { label: 'Official Topstep site', url: 'https://www.topstep.com/' },
      { label: 'Help Center Topstep', url: 'https://help.topstep.com/' },
      { label: 'Topstep risk disclosure', url: 'https://www.topstep.com/risk-disclosure/' },
      { label: 'Topstep terms of use', url: 'https://www.topstep.com/terms-of-use/' },
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
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-06',
      summary:
        'Medium-to-high regulatory risk. Apex Trader Funding is a large US futures prop-firm brand, but its own risk disclosure states that Apex is not a licensed financial advisor, broker, portfolio manager, broker-dealer, futures commission merchant or financial advisor. PropRadar has not recorded a major official warning against Apex Trader Funding, Inc. at this check, but the non-regulated status, futures prop-firm grey zone, payout disputes and reported lawsuit signal justify extra caution.',
      entities: [
        {
          name: 'Apex Trader Funding, Inc.',
          jurisdiction: 'United States, Texas',
          registeredAddress: '2028 E. Ben White Blvd Ste 240-9873, Austin, TX 78741',
          role:
            'US operating entity disclosed in Apex Trader Funding risk disclosure and public site footer.',
        },
      ],
      regulatoryStatus: [
        'Apex discloses simulated trading programs for educational, informational and evaluation purposes only.',
        'Apex states that it is not a broker-dealer, futures commission merchant, financial advisor, broker, portfolio manager or similar financial institution.',
        'The company states that services are intended for US users only and are not offered where prohibited by local law.',
        'A similarly named FCA warning around "Apex Trader" should be treated as a possible clone/confusion signal unless it is matched directly to Apex Trader Funding, Inc.',
      ],
      complaintsAndDisputes: [
        'Public complaints often focus on payout eligibility, consistency rules, trailing threshold interpretation and rule changes.',
        'A reported 2025-2026 lawsuit signal involving a trader should be tracked, but PropRadar still needs a direct court-source link before presenting it as a verified legal action.',
        'No major official regulatory enforcement action against Apex Trader Funding, Inc. is documented in PropRadar at this check.',
      ],
      redFlags: [
        'Explicitly non-regulated financial status for a futures-related prop-firm product.',
        'US futures prop-firm model sits in a grey zone between education, simulation, payouts and trading evaluation.',
        'Large discount campaigns can make traders under-read payout and consistency constraints.',
        'Reported litigation signal requires follow-up with a direct court record or docket source.',
      ],
      sources: [
        { label: 'Apex Trader Funding risk disclosure', url: 'https://apextraderfunding.com/risk-disclosure/' },
        { label: 'Official Apex Trader Funding site', url: 'https://apextraderfunding.com/' },
        { label: 'Apex support center', url: 'https://support.apextraderfunding.com/' },
        { label: 'FCA warnings page', url: 'https://www.fca.org.uk/news/warnings' },
      ],
    },
    sources: [
      { label: 'Official Apex site', url: 'https://apextraderfunding.com/' },
      { label: 'Apex Support', url: 'https://support.apextraderfunding.com/' },
      { label: 'Apex risk disclosure', url: 'https://apextraderfunding.com/risk-disclosure/' },
    ],
  }),
  firm({
    id: 6,
    slug: 'trade-the-pool',
    name: 'Trade The Pool',
    status: 'Active',
    score: 76,
    founded: 2022,
    headquarters: 'Israel',
    bestFor: 'US stock traders',
    verdict: 'A distinct stocks-focused funding model for traders diversifying beyond forex and futures.',
    priceFrom: 97,
    profitSplit: 80,
    drawdownType: 'Static',
    newsTrading: 'Variable',
    eaAllowed: 'No',
    payoutDelay: 'variable',
    incidents: 1,
    transparencyScore: 15,
    payoutProof: true,
    recentRuleChange: false,
    logoDomain: 'tradethepool.com',
    communitySignal: 'Smaller niche, with a clear stocks-focused offer.',
    styles: ['Actions', 'Intraday', 'Swing'],
    products: [
      product({
        id: 'ttp-stock-trading',
        name: 'Stock Trading Program',
        description: 'Stocks program with defined buying power and loss rules.',
        accountSizeMin: 20000,
        accountSizeMax: 260000,
        entryFeeMin: 97,
        entryFeeMax: 1240,
        profitSplit: 'up to 80%',
        platforms: ['Dedicated platform'],
        tradableAssets: ['US stocks'],
        linkToStart: 'https://tradethepool.com/',
      }),
    ],
    strengths: ['Clear stocks niche', 'Alternative to CFDs', 'Connected to the broader The5ers ecosystem'],
    weaknesses: ['Less suited to forex or futures', 'Stocks-specific rules'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Terms and Program Terms checked. Trade The Pool is operated by Five Percent Online Ltd in Israel and describes the evaluation as simulated trading with fictitious funds. The terms add KYC/AML checks, forbidden territories, video-interview discretion, no guaranteed funded acceptance and Israeli/Tel Aviv dispute jurisdiction. Exact-name article/news searches did not surface reliable mainstream financial press for this brand in this pass.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Program Terms', 'FAQ link', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. Trade The Pool gives more legal detail than many niche firms and names Five Percent Online Ltd as operator, but the product is still a simulated/evaluation route with discretionary review before funded status. Traders should treat the funded-stage language, stock-volume constraints, no-refund clauses and Israel jurisdiction as central purchase checks.',
      entities: [
        {
          name: 'Five Percent Online Ltd',
          jurisdiction: 'Israel',
          registeredAddress: '2 HaTidhar st., Raanana, Israel',
          role: 'Operator and owner of the Trade The Pool trademark/brand according to official Terms and Conditions.',
        },
      ],
      regulatoryStatus: [
        'Terms describe Trade The Pool as a technology company providing services including proprietary trading.',
        'Evaluation is described as a simulated training environment using fictitious funds, not real funds that users can possess.',
        'Funded-user status is conditional on evaluation, KYC/AML, risk review and additional terms; successful evaluation does not guarantee acceptance.',
        'Terms list forbidden territories and say the user is responsible for local-law compliance.',
        'No reliable newspaper/financial-press article surfaced for the exact Trade The Pool brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Evaluation fees are generally non-refundable after account cancellation, early termination, failed verification or rule breach.',
        'Program Terms include detailed stock-volume, halt, consistency, payout and scaling mechanics that can invalidate trades or delay payout eligibility.',
        'Disputes are governed by Israeli law with courts of Tel Aviv named as jurisdiction, subject to applicable law.',
      ],
      redFlags: [
        'Stock-specific rules are more complex than the headline offer suggests.',
        'KYC, AML and video-interview checks can block funded-user progression.',
        'Funded acceptance and execution of suggested trades remain discretionary.',
      ],
      sources: [
        { label: 'Trade The Pool official site', url: 'https://tradethepool.com/' },
        { label: 'Trade The Pool Terms and Conditions', url: 'https://tradethepool.com/terms-and-conditions/' },
        { label: 'Trade The Pool Program Terms', url: 'https://tradethepool.com/program-terms/' },
        { label: 'Trade The Pool article/news search', url: 'https://www.google.com/search?q=%22Trade+The+Pool%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Trade The Pool site', url: 'https://tradethepool.com/' },
      { label: 'Trade The Pool Terms and Conditions', url: 'https://tradethepool.com/terms-and-conditions/' },
      { label: 'Trade The Pool Program Terms', url: 'https://tradethepool.com/program-terms/' },
    ],
  }),
  firm({
    id: 7,
    slug: 'e8-markets',
    name: 'E8 Markets',
    status: 'Active',
    score: 75,
    founded: 2021,
    headquarters: 'United States',
    bestFor: 'CFD traders looking for a modern interface',
    verdict: 'Polished and popular brand with clear language around simulation and discretionary payouts.',
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
    communitySignal: 'Strong marketing traction; confirm the exact rules before relying on the public signal.',
    styles: ['Forex', 'Futures', 'Crypto'],
    products: [
      product({
        id: 'e8-account',
        name: 'E8 Challenge',
        description: 'Simulated-capital evaluation covering forex, futures and crypto.',
        accountSizeMin: 5000,
        accountSizeMax: 500000,
        entryFeeMin: 48,
        entryFeeMax: 988,
        profitSplit: 'up to 80%+',
        platforms: ['TradeLocker', 'cTrader', 'Match-Trader'],
        tradableAssets: ['Forex', 'Futures', 'Crypto'],
        linkToStart: 'https://e8markets.com/',
      }),
    ],
    strengths: ['Modern product experience', 'Explicit simulated-account positioning', 'Public payout claims'],
    weaknesses: ['Rules vary by program', 'Shorter track record than FTMO or Topstep'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-06',
      summary:
        'Medium regulatory risk. E8 Markets is clearer than many mid-size prop firms about the simulated nature of the product, but the structure combines a Puerto Rico website owner, a US education/technology company and a Saint Lucia entity for MT5. PropRadar has not recorded a major official regulator warning at this check, yet the offshore layer, payout complaints and rule complexity keep the profile away from low risk.',
      entities: [
        {
          name: 'Digital Renaissance LLC',
          jurisdiction: 'Puerto Rico',
          role: 'Website ownership entity disclosed on E8 Markets public footer.',
        },
        {
          name: 'E8 Funding LLC',
          jurisdiction: 'United States',
          registeredAddress: '4101 McEwen Rd #205, Dallas, TX 75244',
          role: 'Technology and education company disclosed by E8 as providing access to simulated trading accounts.',
        },
        {
          name: 'E8 Markets Ltd',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00347',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia, LC06 201',
          role: 'Entity disclosed as operating the MetaQuotes MT5 platform layer.',
        },
      ],
      regulatoryStatus: [
        'E8 states that the product is a SaaS educational simulation for skills training, data collection and analytical modeling.',
        'The public footer states there are no deposits, no brokers and no margin calls in the simulated product.',
        'E8 Funding LLC states that it does not operate as a broker, accept client deposits or facilitate live market transactions.',
        'No FCA, CySEC or equivalent investment-services authorization is documented in PropRadar for the prop-firm product.',
      ],
      complaintsAndDisputes: [
        'Public complaints to classify include trading conditions, rule interpretation and payout disputes.',
        'No major public regulatory enforcement action is documented in PropRadar at this check.',
        'The Saint Lucia entity and platform split should be checked before treating E8 as a simple US operator.',
      ],
      redFlags: [
        'Multi-entity structure: Puerto Rico, United States and Saint Lucia.',
        'Saint Lucia entity for part of the platform stack.',
        'Payouts are discretionary and linked to acceptance/licensing of performance data.',
      ],
      sources: [
        { label: 'Official E8 Markets site and legal footer', url: 'https://e8markets.com/' },
        { label: 'E8 Terms and conditions', url: 'https://e8markets.com/terms-and-conditions/' },
        { label: 'E8 Help Center', url: 'https://help.e8markets.com/' },
        { label: 'Trustpilot E8 Markets', url: 'https://www.trustpilot.com/review/e8markets.com' },
      ],
    },
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
    headquarters: 'United Arab Emirates',
    bestFor: 'traders looking for low-cost CFD challenges',
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
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-06',
      summary:
        'Medium-to-high regulatory risk. FundingPips has enormous marketing reach and claims very large rewards distributed, but the legal footer shows a Comoros entity, a Dubai IFZA registered address and Cyprus support/payment-related structure. FundingPips discloses that the website product is simulated, does not execute live-market trades and does not act as broker, custodian or financial intermediary. The offshore-heavy setup plus payout/rule complaints justify close caution.',
      entities: [
        {
          name: 'FundingPips Corp',
          jurisdiction: 'Comoros Union',
          registrationNumber: 'HY01223081',
          registeredAddress: 'Bonovo Road, Fomboni Island of Moheli, Comoros Union',
          role:
            'Entity disclosed as providing the simulated trading services. FundingPips states this entity holds an International Brokerage and Clearing House License, but does not conduct brokerage services or real trading accounts on the website.',
        },
        {
          name: 'FundingPips',
          jurisdiction: 'United Arab Emirates',
          registeredAddress: 'Premises NO. 19948-001, IFZA Business Park, DDP Dubai, UAE',
          role: 'Registered address disclosed by FundingPips.',
        },
        {
          name: 'FundingPips Services Ltd',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE 450941',
          registeredAddress: '15 Dimitriou Karatasou Street, Anastasio Building, 6th Floor, Office 601, 2024 Strovolos, Nicosia, Cyprus',
          role: 'Related non-operational support and administrative entity disclosed by FundingPips.',
        },
      ],
      regulatoryStatus: [
        'FundingPips states all accounts are demo accounts in a simulated trading environment and no actual trades are executed on live financial markets.',
        'FundingPips states that it does not provide investment advice, solicit trades, act as broker, custodian or financial intermediary.',
        'No FCA, CySEC, ASIC or equivalent tier-one investment-services authorization is documented in PropRadar for the prop-firm product.',
        'The Comoros license reference should not be read as protection for users buying simulated evaluations on FundingPips.com.',
      ],
      complaintsAndDisputes: [
        'Public complaints to classify include rule changes, account closures and payout refusals.',
        'High review and Discord volume can be useful, but marketing volume should not replace recent independent payout proof.',
        'No major public regulator enforcement action is documented in PropRadar at this check.',
      ],
      redFlags: [
        'Offshore-heavy structure: Comoros, UAE and Cyprus support entity.',
        'Very aggressive marketing and very large payout claims require independent verification.',
        'Services are restricted for some jurisdictions, including UAE, according to the footer checked.',
      ],
      sources: [
        { label: 'Official Funding Pips site and legal footer', url: 'https://fundingpips.com/' },
        { label: 'Funding Pips Terms and Conditions', url: 'https://fundingpips.com/terms-and-conditions/' },
        { label: 'Funding Pips Help Center', url: 'https://help.fundingpips.com/' },
        { label: 'Trustpilot Funding Pips', url: 'https://www.trustpilot.com/review/fundingpips.com' },
      ],
    },
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
    strengths: ['Very low entry price', 'Readable offers on the site', 'Several account models'],
    weaknesses: ['Recent track record', 'Small account sizes mostly useful for testing', 'UAE entity wording needs reconciliation between terms and footer'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Terms and Risk Disclosure checked. Maven states that all accounts are demo accounts with simulated funds, that it does not provide investment services, regulated financial services, broker services or customer deposits, and that payments are non-refundable once made. The legal pages name MAVEN LLC under DIEZ in the Terms, while the footer also names Maven Edu - FZCO in DSO-IFZA; PropRadar flags that entity wording for follow-up. Exact-name article/news searches did not surface reliable mainstream financial press in this pass.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Risk Disclosure', 'Footer disclaimer', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. Maven is unusually explicit that trading is simulated and that it is not a broker or deposit-taking firm, but its public legal wording names both MAVEN LLC and Maven Edu - FZCO. The combination of very cheap challenges, strict no-refund/payment-dispute language, simulated payout framing and broad termination discretion keeps the profile cautious.',
      entities: [
        {
          name: 'MAVEN LLC',
          jurisdiction: 'United Arab Emirates, DIEZ',
          registrationNumber: '105072496000001',
          registeredAddress: 'DSO-IFZA, IFZA Properties, Dubai Silicon Oasis, Dubai',
          role: 'Entity named in the Terms and Conditions as operating the website and services.',
        },
        {
          name: 'Maven Edu - FZCO',
          jurisdiction: 'United Arab Emirates, DSO-IFZA',
          registrationNumber: '006-0060823-070425',
          registeredAddress: 'DSO-IFZA, IFZA Properties, Dubai Silicon Oasis',
          role: 'Entity named in the footer legal disclaimer; reconcile with MAVEN LLC before treating the structure as fully mapped.',
        },
      ],
      regulatoryStatus: [
        'Terms state all client accounts are demo accounts with simulated funds and all trading is simulated.',
        'Terms state Maven does not provide direct investment services, investment advice, customer deposits or regulated financial services.',
        'Footer says Maven Trading does not act as a broker and does not accept deposits.',
        'Risk Disclosure says Maven offers a simulated environment for education and skill development.',
        'No reliable newspaper/financial-press article surfaced for the exact Maven Trading prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'All purchases are described as final, non-cancellable and non-returnable once services are delivered.',
        'Users who dispute payments can be permanently banned according to the payment dispute policy.',
        'Terms include broad prohibited-strategy, risk-interview, forfeiture and termination discretion.',
        'Risk Disclosure states the likelihood of successfully executing a withdrawal in the simulation is less than 2.5% per transaction.',
      ],
      redFlags: [
        'Two entity names appear across current public legal text.',
        'Very low challenge pricing can mask strict payout and termination rules.',
        'Non-refund and payment-dispute language is aggressive.',
      ],
      sources: [
        { label: 'Maven Trading official site', url: 'https://maventrading.com/' },
        { label: 'Maven Trading Terms and Conditions', url: 'https://maventrading.com/terms-and-conditions' },
        { label: 'Maven Trading Risk Disclosure', url: 'https://maventrading.com/risk-disclosure' },
        { label: 'Maven Trading article/news search', url: 'https://www.google.com/search?q=%22Maven+Trading%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Maven Trading site', url: 'https://maventrading.com/' },
      { label: 'Maven Trading Terms and Conditions', url: 'https://maventrading.com/terms-and-conditions' },
      { label: 'Maven Trading Risk Disclosure', url: 'https://maventrading.com/risk-disclosure' },
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
    verdict: 'Established UK prop-firm brand with clearer disclaimers than most, but not FCA-regulated for the prop service and separate from the Seychelles-regulated ACG Markets CFD broker.',
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Terms, Disclaimer, Refund Policy, Companies House and ACG Markets cross-check completed. Alpha Capital Group Limited is an active UK company, but the prop-firm disclaimer says the service is virtual/simulated, not regulated investment business, not FCA-authorised and not covered by the Financial Ombudsman Service. ACG Markets is a separate Seychelles FSA-regulated CFD broker disclosure and should not be used as FCA protection for Alpha Capital Group prop accounts. Exact-name article/news searches did not surface reliable mainstream financial press for the prop-firm brand in this pass.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Disclaimer', 'Refund Policy', 'Companies House', 'ACG Markets cross-check', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. Alpha Capital Group has a real UK company record and its own disclaimer is direct about virtual trading and lack of FCA/FOS coverage. The main risk is confusion: the related ACG Markets branding/disclaimer points to a Seychelles-regulated CFD broker, while Alpha Capital Group prop accounts remain virtual training/evaluation services.',
      entities: [
        {
          name: 'Alpha Capital Group Limited',
          jurisdiction: 'United Kingdom',
          registrationNumber: '13719951',
          registeredAddress: '1 Allied Business Centre, Coldharbour Lane, Harpenden, England, AL5 4UT',
          role: 'Active UK private limited company shown on Companies House; official terms also show a London trading/registered address that should be reconciled with Companies House filings.',
        },
        {
          name: 'ACG Markets Ltd',
          jurisdiction: 'Seychelles',
          registrationNumber: '8434915-1',
          registeredAddress: 'CT House, Office 9A, Providence, Mahe, Seychelles',
          role: 'Separate CFD/forex broker brand disclosed as Seychelles FSA-regulated under Securities Dealer license SD182; do not conflate this with the prop-firm challenge product.',
        },
      ],
      regulatoryStatus: [
        'Alpha Capital Group disclaimer says all virtual trading activity is simulated or virtual trading only.',
        'Disclaimer says Alpha Capital Group is not carrying out regulated investment business and is not required to be authorised by the FCA.',
        'Disclaimer says Alpha Capital Group services are not covered by the Financial Ombudsman Service.',
        'Disclaimer says Alpha Capital Group Limited and ACG Markets are not brokers and do not accept deposits in the prop-service context.',
        'Companies House lists Alpha Capital Group Limited as active, incorporated on 2 November 2021, SIC 62090.',
        'No reliable newspaper/financial-press article surfaced for the exact Alpha Capital Group prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Refund Policy states all sales are final and no refund will be issued.',
        'Terms reserve broad rights to modify, suspend or discontinue the site and services without notice.',
        'The public legal address in Terms differs from Companies House registered-office data seen in this check, so checkout/legal documents should be rechecked before purchase.',
      ],
      redFlags: [
        'FCA non-authorisation is explicit for the prop-firm service.',
        'Seychelles FSA broker disclosure around ACG Markets can create brand/regulatory confusion.',
        'No-refund policy is absolute.',
      ],
      sources: [
        { label: 'Alpha Capital Group Terms and Conditions', url: 'https://alphacapitalgroup.uk/terms-and-conditions' },
        { label: 'Alpha Capital Group Disclaimer', url: 'https://alphacapitalgroup.uk/disclaimer' },
        { label: 'Alpha Capital Group Refund Policy', url: 'https://alphacapitalgroup.uk/return-policy' },
        { label: 'Companies House Alpha Capital Group Limited', url: 'https://find-and-update.company-information.service.gov.uk/company/13719951' },
        { label: 'ACG Markets official site/footer', url: 'https://www.acg-markets.com/' },
        { label: 'Alpha Capital Group article/news search', url: 'https://www.google.com/search?q=%22Alpha+Capital+Group%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Alpha Capital Group site', url: 'https://alphacapitalgroup.uk/' },
      { label: 'Alpha Capital Group Terms and Conditions', url: 'https://alphacapitalgroup.uk/terms-and-conditions' },
      { label: 'Alpha Capital Group Disclaimer', url: 'https://alphacapitalgroup.uk/disclaimer' },
      { label: 'Companies House Alpha Capital Group Limited', url: 'https://find-and-update.company-information.service.gov.uk/company/13719951' },
    ],
  }),
  firm({
    id: 11,
    slug: 'fxify',
    name: 'FXIFY',
    status: 'Active',
    score: 74,
    founded: 2023,
    headquarters: 'Malaysia / United Kingdom',
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
        description: 'Single-phase evaluation designed for faster progression to a funded account.',
        accountSizeMin: 5000,
        accountSizeMax: 400000,
        entryFeeMin: 250,
        profitTarget: '1 phase, target to confirm by account size',
        maxDailyLoss: 'depends on the selected plan',
        maxDrawdown: 'static or trailing depending on options',
        profitSplit: 'jusqu a 90%',
        platforms: ['MT4', 'MT5', 'DXtrade', 'TradingView'],
        tradableAssets: ['Forex', 'Indices', 'Actions CFD', 'Crypto'],
        minTradingDays: '5 minimum trading days before the first payout per the official page',
        hasConsistencyRule: true,
        consistencyRule: 'Exact rules and add-ons must be confirmed at FXIFY checkout.',
        linkToStart: 'https://fxify.com/programs/one-phase/',
      }),
      product({
        id: 'fxify-two-phase',
        name: 'FXIFY Two Phase',
        description: 'Two-phase evaluation designed to test discipline and risk management.',
        accountSizeMin: 5000,
        accountSizeMax: 400000,
        profitTarget: '2 phases, targets depend on the account',
        maxDailyLoss: 'depends on the selected plan',
        maxDrawdown: 'static or trailing depending on options',
        profitSplit: 'jusqu a 90%',
        platforms: ['MT4', 'MT5', 'DXtrade', 'TradingView'],
        tradableAssets: ['Forex', 'Indices', 'Actions CFD', 'Crypto'],
        minTradingDays: '5 minimum trading days before the first payout per the official page',
        hasConsistencyRule: true,
        consistencyRule: 'Structure and add-ons to reread before buying.',
        linkToStart: 'https://fxify.com/programs/two-phase/',
      }),
      product({
        id: 'fxify-three-phase',
        name: 'FXIFY Three Phase',
        description: 'Three-phase evaluation with a lower entry cost and an advertised 5% progression target.',
        accountSizeMin: 5000,
        accountSizeMax: 400000,
        profitTarget: '5% progression target per the official page',
        maxDailyLoss: 'depends on the selected plan',
        maxDrawdown: 'static or trailing depending on options',
        profitSplit: 'jusqu a 90%',
        platforms: ['MT4', 'MT5', 'DXtrade', 'TradingView'],
        tradableAssets: ['Forex', 'Indices', 'Actions CFD', 'Crypto'],
        minTradingDays: '5 minimum trading days before the first payout per the official page',
        hasConsistencyRule: true,
        consistencyRule: 'More progressive program; details to verify on the official page.',
        linkToStart: 'https://fxify.com/programs/three-phase-challenge/',
      }),
      product({
        id: 'fxify-lightning',
        name: 'FXIFY Lightning Challenge',
        description: 'Lower-cost 1-step challenge advertised with a 5% target.',
        type: 'Challenge',
        accountSizeMin: 5000,
        accountSizeMax: 100000,
        entryFeeMin: 59,
        profitTarget: '5%',
        maxDailyLoss: 'depends on the selected plan',
        maxDrawdown: 'depends on the selected plan',
        profitSplit: 'jusqu a 90%',
        platforms: ['MT4', 'MT5', 'DXtrade', 'TradingView'],
        tradableAssets: ['Forex', 'Indices', 'Actions CFD', 'Crypto'],
        hasConsistencyRule: true,
        consistencyRule: 'Confirm the full parameters on the Lightning product page.',
        linkToStart: 'https://fxify.com/programs/lightning-challenge/',
      }),
      product({
        id: 'fxify-instant-funding',
        name: 'FXIFY Instant Funding',
        description: 'Access without evaluation and without advertised target, for already confident traders.',
        type: 'Instant funding',
        accountSizeMin: 5000,
        accountSizeMax: 50000,
        profitTarget: 'no advertised target',
        maxDailyLoss: 'depends on the selected plan',
        maxDrawdown: 'depends on the selected plan',
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
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-06',
      summary:
        'Medium regulatory risk. FXIFY has a broad, heavily marketed prop-firm offer with one-phase, two-phase, three-phase, lightning and instant-funding paths. The public footer identifies FXIFY Markets LTD in Labuan, Malaysia. PropRadar has not recorded a major FCA or CySEC warning at this check, but the combination of offshore-style structure, instant funding marketing and payout/drawdown complaints keeps the file cautious.',
      entities: [
        {
          name: 'FXIFY Markets LTD',
          jurisdiction: 'Labuan F.T., Malaysia',
          registeredAddress: 'No.1-23A, First Floor, Paragon, Jalan Tun Mustapha, 87008 Labuan F.T. Malaysia',
          role: 'Main entity disclosed in the FXIFY public footer.',
        },
      ],
      regulatoryStatus: [
        'FXIFY presents multiple prop-firm evaluation and instant-funding products rather than a standard retail brokerage account.',
        'No FCA, CySEC or equivalent tier-one investment-services authorization is documented in PropRadar for the prop-firm product.',
        'Program terms vary by one-phase, two-phase, three-phase, lightning and instant funding, so regulatory and payout risk must be read at product level.',
      ],
      complaintsAndDisputes: [
        'Public complaints to classify include payout delays/refusals, prohibited-strategy accusations and drawdown-rule interpretation.',
        'Trustpilot volume is useful, but recent negative payout stories should be checked against official responses and rules.',
        'No major public regulator enforcement action is documented in PropRadar at this check.',
      ],
      redFlags: [
        'Offshore-style Labuan structure rather than a simple UK/EU operator.',
        'Instant funding and heavy promotional offers can attract traders who under-read payout conditions.',
        'Rules and add-ons differ substantially by program and checkout configuration.',
      ],
      sources: [
        { label: 'Official FXIFY site and footer', url: 'https://fxify.com/' },
        { label: 'FXIFY Instant Funding', url: 'https://fxify.com/programs/instant-funding/' },
        { label: 'FXIFY Fast Payouts', url: 'https://fxify.com/fast-payouts/' },
        { label: 'Trustpilot FXIFY', url: 'https://www.trustpilot.com/review/fxify.com' },
        { label: 'FCA warnings page', url: 'https://www.fca.org.uk/news/warnings' },
      ],
    },
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and legal Terms checked. AquaFunded discloses Aqua Funded FZCO in Dubai Silicon Oasis / DDP, Dubai, and frames its products as simulated trading evaluation plans, not investments. Terms include DIAC arbitration in Dubai, class-action waiver language, prohibited-trading review before funded access, demo-capital account wording and strong discretion to deny withdrawals or terminate accounts for risk-management concerns.',
    auditSourcesChecked: ['Official site', 'Legal Terms and Conditions', 'Help center link', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. AquaFunded provides a named UAE free-zone entity and detailed rules, but the offer is explicitly simulated/evaluation based, uses strong promotion and includes broad discretionary risk-review, arbitration and class-action waiver language. Users should treat payouts as contractual rewards, not broker withdrawals.',
      entities: [
        {
          name: 'Aqua Funded FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registeredAddress: 'Dubai Silicon Oasis, DDP, Building A2, Dubai, United Arab Emirates',
          role: 'Company disclosed in AquaFunded legal terms and arbitration notice.',
        },
      ],
      regulatoryStatus: [
        'Terms state products and services on the site are not intended to be considered an investment.',
        'Terms describe evaluation plans for simulated trading and demo capital accounts.',
        'Terms say no live trading is provided directly by the company.',
        'DIAC arbitration in Dubai and class-action waiver language are disclosed.',
        'No reliable newspaper/financial-press article surfaced for the exact AquaFunded brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Risk review may occur at any stage and can lead to account termination or withdrawal denial.',
        'Prohibited trading includes latency/error exploitation, arbitrage, account-to-account arbitrage and risk patterns that could harm a broker in real-market conditions.',
        'Funded access may be denied after review by the company and broker.',
      ],
      redFlags: [
        'Aggressive promotional language including high refund and discount claims.',
        'Demo-capital / simulated model limits broker-style protection expectations.',
        'Dubai arbitration and class-action waiver reduce user dispute leverage.',
      ],
      sources: [
        { label: 'AquaFunded official site', url: 'https://www.aquafunded.com/' },
        { label: 'AquaFunded Terms and Conditions', url: 'https://www.aquafunded.com/legal/terms-and-conditions' },
        { label: 'AquaFunded article/news search', url: 'https://www.google.com/search?q=%22AquaFunded%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official AquaFunded site', url: 'https://www.aquafunded.com/' },
      { label: 'AquaFunded Terms and Conditions', url: 'https://www.aquafunded.com/legal/terms-and-conditions' },
    ],
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Terms checked. GOAT Funded Trader is disclosed as a trade name of Wishes Tower International Limited, Hong Kong. Terms state that no live trading is provided directly by the company, services are not investment services or advice, purchases are non-refundable, and all funds/profits inside the platform are for simulation purposes. The terms also contain broad prohibited-trading, due-diligence and termination powers.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Help center/FAQ link', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. GOAT Funded Trader has very high visibility and an explicit Hong Kong operator disclosure, but the terms are broad and discretion-heavy: no live trading is provided directly, services are not investment services, purchases are non-refundable, and simulated platform profits can be terminated or forfeited after prohibited-trading or due-diligence review.',
      entities: [
        {
          name: 'Wishes Tower International Limited',
          jurisdiction: 'Hong Kong',
          registrationNumber: '76428795',
          registeredAddress: 'RM 1205, 12/F Beverly Hse, 93-107 Lockhart Rd, Wan Chai, Hong Kong',
          role: 'Company disclosed as operator/trade-name owner for GOAT Funded Trader in official terms.',
        },
      ],
      regulatoryStatus: [
        'Terms say no live trading is provided directly by the company.',
        'Terms say none of the services can be considered investment services and none constitute investment advice or recommendations.',
        'Terms say all funds and profits within the platform are purely for simulation purposes.',
        'The company may request trading statements, algorithm/source-code details and identity checks during due diligence.',
        'No reliable newspaper/financial-press article surfaced for the exact GOAT Funded Trader brand in this pass.',
      ],
      complaintsAndDisputes: [
        'There are no refunds on services purchased from the company according to the terms.',
        'Prohibited trading can terminate program participation and forfeit fees paid.',
        'The company may disallow or block any trader from participating in the program for any reason at sole discretion.',
      ],
      redFlags: [
        'Very strong discount/coupon marketing around a discretion-heavy contract.',
        'Simulation-only platform funds and profits must not be read as normal client money.',
        'Due-diligence powers are broad, including requests for third-party records or algorithm material.',
      ],
      sources: [
        { label: 'GOAT Funded Trader official site', url: 'https://www.goatfundedtrader.com/' },
        { label: 'GOAT Funded Trader Terms and Conditions', url: 'https://www.goatfundedtrader.com/legal/terms-and-conditions' },
        { label: 'GOAT Funded Trader article/news search', url: 'https://www.google.com/search?q=%22GOAT+Funded+Trader%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official GOAT Funded Trader site', url: 'https://www.goatfundedtrader.com/' },
      { label: 'GOAT Funded Trader Terms and Conditions', url: 'https://www.goatfundedtrader.com/legal/terms-and-conditions' },
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official homepage and Terms checked. BrightFunded discloses Bright Global FZCO in Dubai Silicon Oasis / Dubai Digital Park. Terms say the sole business activity is simulated trading services through demo accounts with simulated funds, and that BrightFunded does not provide financial advice, investment recommendations, brokerage services or regulated financial activity. The homepage uses strong payout marketing, including 24-hour guaranteed processing and up to 100% profit share.',
    auditSourcesChecked: ['Official homepage', 'Terms and Conditions', 'Trustpilot/review links', 'StreetInsider featured link', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. BrightFunded has clear UAE entity disclosure and explicit demo/simulated-service wording, which is useful. The caution is that the homepage markets high payouts, 24-hour processing and unlimited scaling while the terms preserve broad control over demo trading rules, refunds, KYC and prohibited-practice enforcement.',
      entities: [
        {
          name: 'Bright Global FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registeredAddress: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
          role: 'Company disclosed as provider of BrightFunded services in official terms.',
        },
      ],
      regulatoryStatus: [
        'Terms say services are informational and educational, related to trading on financial markets.',
        'Terms say BrightFunded does not provide financial advice, investment recommendations, brokerage services or regulated financial activity.',
        'Terms say the sole business activity is simulated trading services through demo accounts with simulated funds.',
        'All trading activity under the services takes place through demo accounts in a simulated environment.',
        'BrightFunded homepage links a StreetInsider feature, but no independent investigative newspaper/financial-press article surfaced for the exact brand in this pass.',
      ],
      complaintsAndDisputes: [
        'No refunds are given if the customer cancels, fails conditions, terminates early or violates terms.',
        'Fees become final and non-refundable once the trading account is accessed and used.',
        'KYC may be required before funded program access or performance rewards, and failure can block access.',
      ],
      redFlags: [
        'High payout and guaranteed-processing marketing should be read against demo/simulated terms.',
        'MT5 availability has country restrictions including the United States and United Arab Emirates.',
        'Forbidden-practice enforcement can remove trades, cancel services or reduce leverage.',
      ],
      sources: [
        { label: 'BrightFunded official site', url: 'https://brightfunded.com/' },
        { label: 'BrightFunded Terms and Conditions', url: 'https://brightfunded.com/terms-conditions' },
        { label: 'BrightFunded article/news search', url: 'https://www.google.com/search?q=%22BrightFunded%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official BrightFunded site', url: 'https://brightfunded.com/' },
      { label: 'BrightFunded Terms and Conditions', url: 'https://brightfunded.com/terms-conditions' },
    ],
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
    sources: [
      { label: 'Official Instant Funding site', url: 'https://instantfunding.com/' },
      { label: 'Companies House - Acello Ltd 12696083', url: 'https://find-and-update.company-information.service.gov.uk/company/12696083' },
      { label: 'FCA warnings page', url: 'https://www.fca.org.uk/news/warnings' },
      { label: 'CySEC warnings page', url: 'https://www.cysec.gov.cy/en-GB/investor-protection/warnings/' },
    ],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-06',
      summary:
        'Medium regulatory risk. Instant Funding presents its programs as simulated or virtual prop trading rather than regulated brokerage. PropRadar has not recorded a major FCA, CySEC, CNMV or ASIC warning for this brand at this check, but traders should still treat the UK-linked company record plus offshore Saint Lucia structure as a grey-zone setup with limited regulatory protection.',
      entities: [
        {
          name: 'Instant Funding / Acello Ltd',
          jurisdiction: 'England and Wales',
          registrationNumber: '12696083',
          registeredAddress: '30 Old Bailey, London, England, EC4M 7AU',
          role:
            'UK-linked company record found at Companies House. The register shows Acello Ltd for company number 12696083, so PropRadar treats this as a company-record reference, not as proof of investment-service authorization.',
        },
        {
          name: 'IF Pro Ltd',
          jurisdiction: 'Saint Lucia',
          role:
            'Offshore entity referenced in Instant Funding legal material. This structure should be reviewed before assuming UK-style trader protection.',
        },
      ],
      regulatoryStatus: [
        'No FCA, CySEC, ASIC or equivalent tier-one investment-services authorization is documented in PropRadar for Instant Funding.',
        'The official site describes trading activity as a simulated environment with virtual demo accounts and virtual funding only.',
        'No major official warning is recorded in PropRadar at this check; warning-list checks should still be repeated before purchase.',
      ],
      complaintsAndDisputes: [
        'Public user complaints to classify in depth include payout refusals, rule interpretation and changing conditions.',
        'Trustpilot and forum feedback should be read with caution because review quality can be distorted by removals, incentives or competitor attacks.',
        'No major public regulatory enforcement action or court case is documented in PropRadar for this brand at this check.',
      ],
      redFlags: [
        'UK-linked company reference combined with an offshore Saint Lucia entity.',
        'No visible tier-one regulator protection for traders.',
        'Leadership and operating-entity transparency should be clearer before treating the firm as low risk.',
      ],
      sources: [
        { label: 'Official Instant Funding site', url: 'https://instantfunding.com/' },
        { label: 'Companies House - Acello Ltd 12696083', url: 'https://find-and-update.company-information.service.gov.uk/company/12696083' },
        { label: 'FCA warnings page', url: 'https://www.fca.org.uk/news/warnings' },
        { label: 'CySEC warnings page', url: 'https://www.cysec.gov.cy/en-GB/investor-protection/warnings/' },
      ],
    },
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Program Terms checked. Funded Trading Plus is the trading name of Acello Ltd, England and Wales company number 12696083. Terms state FTP is not FCA-authorised or regulated because it is not providing regulated products/services, and that programs are simulated trading accounts with simulated funds and no real-market trades. Refund and payout eligibility are tightly tied to first simulated trade, cancellation-period rules and FTP risk review.',
    auditSourcesChecked: ['Official site', 'Program Terms and Conditions', 'Refund Policy link', 'Disclaimers link', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. Funded Trading Plus is relatively clear: UK company, explicit non-FCA-regulated status and simulated-account wording. The main caution is discretionary risk review, prohibited-strategy enforcement and refund loss after use of the program.',
      entities: [
        {
          name: 'Acello Ltd trading as Funded Trading Plus',
          jurisdiction: 'England and Wales',
          registrationNumber: '12696083',
          role: 'Company disclosed in Funded Trading Plus footer/company registration.',
        },
      ],
      regulatoryStatus: [
        'Terms say FTP is not authorised or regulated by the Financial Conduct Authority because it is not providing regulated products or services by law.',
        'Programs are simulated trading accounts using simulated funds in a simulated live trading environment.',
        'Programs do not permit users to execute trades in real financial markets with real funds.',
        'Funds allocated to simulated trading accounts have no monetary value.',
        'No reliable newspaper/financial-press article surfaced for the exact Funded Trading Plus brand in this pass.',
      ],
      complaintsAndDisputes: [
        'FTP may perform risk review at any stage and may terminate accounts or deny withdrawal requests for abusive margin/risk behavior.',
        'Risk interviews can determine pass/fail/withdrawal approval and are at FTP professional discretion.',
        'Users waive cancellation/refund rights after placing the first simulated trade on a program.',
      ],
      redFlags: [
        'Non-FCA-regulated status is explicit.',
        'Simulated-live balances and simulated profits are subject to risk review and platform constraints.',
        'Copy trading, hedging across accounts, tick scalping and arbitrage-style practices are heavily restricted.',
      ],
      sources: [
        { label: 'Funded Trading Plus official site', url: 'https://www.fundedtradingplus.com/' },
        { label: 'Funded Trading Plus Program Terms', url: 'https://www.fundedtradingplus.com/terms-conditions/' },
        { label: 'Funded Trading Plus article/news search', url: 'https://www.google.com/search?q=%22Funded+Trading+Plus%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Funded Trading Plus site', url: 'https://www.fundedtradingplus.com/' },
      { label: 'Funded Trading Plus Program Terms', url: 'https://www.fundedtradingplus.com/terms-conditions/' },
    ],
  }),
  firm({
    id: 17,
    slug: 'blue-guardian',
    name: 'Blue Guardian',
    status: 'À surveiller',
    score: 70,
    founded: 2019,
    headquarters: 'Saint Lucia / UAE',
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
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-06',
      summary:
        'Medium regulatory risk. Blue Guardian has a visible prop-firm brand and clear footer disclosure that accounts are demo accounts in a virtual environment with virtual money. The structure uses Blue Guardian Limited in Saint Lucia, Iconic Exchange FZCO in Dubai IFZA and Blue Guardian Marketing LLC in Dubai. PropRadar has not recorded a major FCA/CySEC warning at this check, but the offshore/UAE structure and payout/rule complaints justify standard prop-firm caution.',
      entities: [
        {
          name: 'Blue Guardian Limited',
          jurisdiction: 'Saint Lucia',
          registeredAddress: 'The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Company disclosed as providing trading platforms for simulated trading.',
        },
        {
          name: 'Iconic Exchange FZCO',
          jurisdiction: 'United Arab Emirates, Dubai IFZA',
          registeredAddress: 'Premises NO. 001 - 32135, IFZA Business Park, DDP Dubai, UAE',
          role: 'Entity disclosed as providing educational products and payment processing.',
        },
        {
          name: 'Blue Guardian Marketing LLC',
          jurisdiction: 'United Arab Emirates, Dubai',
          registeredAddress: '801 Icon Tower, Barsha Heights, Tecom, Dubai, UAE',
          role: 'Related non-operational support and administrative office disclosed by Blue Guardian.',
        },
      ],
      regulatoryStatus: [
        'Blue Guardian states that it is a SaaS educational trading simulation and evaluation company.',
        'Blue Guardian states that it does not collect customer deposits or offer financial services to customers.',
        'All accounts are described as demo accounts in a virtual environment with virtual money; payouts are discretionary and not guaranteed.',
        'No FCA, CySEC or equivalent investment-services authorization is documented in PropRadar for the prop-firm product.',
      ],
      complaintsAndDisputes: [
        'Public complaints to classify include payout delays, strict rules and changing conditions.',
        'Forum and Trustpilot feedback should be cross-checked with recent payout proof and official rule pages.',
        'No major public regulatory enforcement action is documented in PropRadar at this check.',
      ],
      redFlags: [
        'Offshore/UAE structure: Saint Lucia plus Dubai IFZA/payment/marketing entities.',
        'Payouts are discretionary, not guaranteed, and linked to acceptance/licensing of trading data.',
        'Rule changes and payout-delay complaints should be monitored before purchase.',
      ],
      sources: [
        { label: 'Official Blue Guardian site and legal footer', url: 'https://blueguardian.com/' },
        { label: 'Blue Guardian Terms and Conditions', url: 'https://blueguardian.com/terms-and-conditions/' },
        { label: 'Blue Guardian Payouts', url: 'https://blueguardian.com/payouts/' },
        { label: 'Trustpilot Blue Guardian', url: 'https://www.trustpilot.com/review/blueguardian.com' },
        { label: 'FCA warnings page', url: 'https://www.fca.org.uk/news/warnings' },
      ],
    },
    sources: [
      { label: 'Official Blue Guardian site', url: 'https://blueguardian.com/' },
      { label: 'Blue Guardian Terms and Conditions', url: 'https://blueguardian.com/terms-and-conditions/' },
    ],
  }),
  firm({
    id: 18,
    slug: 'fintokei',
    name: 'Fintokei',
    status: 'Active',
    score: 77,
    founded: 2022,
    headquarters: 'Europe / Japon',
    bestFor: 'European or Asian traders comparing a more institutional-looking brand',
    verdict: 'A more restrained positioning than the market average, suited to traders avoiding aggressive promises.',
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
    communitySignal: 'A more institutional and less promotion-driven public signal.',
    products: [
      product({
        id: 'fintokei-challenges',
        name: 'Fintokei Programs',
        description: 'Evaluation programs and simulated accounts for forex and CFD traders.',
        accountSizeMax: 400000,
        entryFeeMin: 79,
        profitSplit: 'up to 95% depending on the program',
        platforms: ['MT4', 'MT5'],
        tradableAssets: ['Forex', 'Indices', 'Metals'],
        linkToStart: 'https://www.fintokei.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and Terms page checked. Fintokei identifies Fintokei a.s. in the footer/AI disclaimer area and states that Fintokei is a trading education and evaluation company, does not collect customer deposits, does not offer investment or financial services, is not a broker and provides virtual simulated accounts with virtual funds. The terms page itself exposes a PDF link, so the full PDF should still be checked before purchase.',
    auditSourcesChecked: ['Official site', 'Terms page/PDF link', 'Footer disclaimer', 'Support restricted-country link', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-08',
      summary:
        'Low-to-medium legal risk for a prop-firm model. Fintokei has one of the clearer public disclaimers in this wave: education/evaluation company, no deposits, no investment/financial services, not a broker, virtual simulated accounts only. The residual risk is that the full Terms PDF should be reviewed and country/platform restrictions can materially affect eligibility.',
      entities: [
        {
          name: 'Fintokei a.s.',
          jurisdiction: 'Czech Republic / To verify in full terms PDF',
          role: 'Company name disclosed in website footer/AI disclaimer and terms-page context.',
        },
      ],
      regulatoryStatus: [
        'Footer says Fintokei is a trading education and evaluation company.',
        'Footer says Fintokei does not collect customer deposits or offer investment or financial services.',
        'Footer says all trading accounts are part of a virtual simulated environment with virtual funds.',
        'Footer says Fintokei is not a broker and does not accept customer deposits.',
        'No reliable newspaper/financial-press article surfaced for the exact Fintokei brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Restricted-country rules include the United States, India, Russia, Belarus, North Korea and others, with the updated list referenced through support.',
        'The Terms PDF link should be reviewed for refund, payout and dispute clauses before high-value purchase.',
      ],
      redFlags: [
        'Full legal terms are embedded as a PDF link rather than fully visible text in the captured page.',
        'Simulation-only accounts should not be treated as live brokerage accounts.',
        'Eligibility depends on country/nationality/registration restrictions.',
      ],
      sources: [
        { label: 'Fintokei official site', url: 'https://www.fintokei.com/' },
        { label: 'Fintokei General Terms and Conditions page', url: 'https://www.fintokei.com/terms-and-conditions/' },
        { label: 'Fintokei article/news search', url: 'https://www.google.com/search?q=%22Fintokei%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Fintokei site', url: 'https://www.fintokei.com/' },
      { label: 'Fintokei General Terms and Conditions', url: 'https://www.fintokei.com/terms-and-conditions/' },
    ],
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site/footer and legal/compliance disclaimer checked. Audacity Capital discloses AudaCity International FZCO in Dubai as payment facilitator, AudaCity Global LTD in the Union of Comoros with an International Brokerage and Clearing House Licence, a UK office at 25 Cabot Square, and Propmetry Limited in Cyprus as an additional payment partner. The same disclaimer says it does not offer brokerage, custodial or portfolio-management services, and frames the infrastructure as simulated trading focused on skill-building.',
    auditSourcesChecked: ['Official site', 'Footer legal/compliance disclaimer', 'Terms link attempted', 'Complaints/scam-alert links', 'Trustpilot/Feefo badges', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. Audacity Capital is older and more transparent than many challenge firms, but its current footer shows a multi-jurisdiction structure: Dubai payment facilitator, Comoros licensed trading operator, UK office and Cyprus payment partner. The site also says it does not offer brokerage, custodial or portfolio-management services, so users should not infer UK/FCA-style client protection from the London office.',
      entities: [
        {
          name: 'AudaCity International FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registrationNumber: 'DSO-FZCO 38282',
          registeredAddress: 'Dubai Silicon Oasis, DDP, Building A1/A2, Dubai, United Arab Emirates',
          role: 'Payment facilitator disclosed in official footer legal/compliance disclaimer.',
        },
        {
          name: 'AudaCity Global LTD',
          jurisdiction: 'Union of Comoros',
          registrationNumber: '15850',
          registeredAddress: 'Hamchako, Mutsamudu, Anjouan, Union of Comoros',
          role: 'Trading-activity operator disclosed as holding International Brokerage and Clearing House Licence L15850/WL.',
        },
        {
          name: 'Propmetry Limited',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE469039',
          registeredAddress: 'Limassol, Cyprus',
          role: 'Additional payment partner disclosed in footer legal/compliance disclaimer.',
        },
      ],
      regulatoryStatus: [
        'Footer says AudaCity International FZCO acts solely as payment facilitator.',
        'Footer says trading-related activities are operated through AudaCity Global LTD under a Comoros International Brokerage and Clearing House Licence.',
        'Footer says Audacity does not offer brokerage, custodial or portfolio-management services.',
        'Footer says programs use professional-grade simulated trading infrastructure focused on skill-building.',
        'The homepage says Audacity has been active since 2012 and shows 25+ publications / press-media links, but no independent investigative newspaper article was captured in this pass.',
      ],
      complaintsAndDisputes: [
        'The supplier/liquidity-provider relationship is described as confidential.',
        'Users should verify whether their selected product is a simulated evaluation, live account path or broker-linked service at checkout.',
        'Local-law eligibility and restricted-country language apply.',
      ],
      redFlags: [
        'UK office should not be confused with UK regulatory protection for the prop-firm product.',
        'Comoros brokerage/clearing licence disclosure needs careful interpretation by product.',
        'Multi-entity payment/operator structure should be matched against invoice and dashboard terms.',
      ],
      sources: [
        { label: 'Audacity Capital official site', url: 'https://audacity.capital/' },
        { label: 'Audacity Capital Terms and Conditions', url: 'https://www.audacity.capital/terms-and-conditions/' },
        { label: 'Audacity Capital article/news search', url: 'https://www.google.com/search?q=%22Audacity+Capital%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Audacity Capital site', url: 'https://audacity.capital/' },
      { label: 'Audacity Capital Terms and Conditions', url: 'https://www.audacity.capital/terms-and-conditions/' },
    ],
  }),
  firm({
    id: 20,
    slug: 'city-traders-imperium',
    name: 'City Traders Imperium',
    status: 'Active',
    score: 74,
    founded: 2018,
    headquarters: 'Royaume-Uni',
    bestFor: 'forex traders focused on education and swing trading',
    verdict: 'Known forex-sector operator worth comparing, although its programs require regular rechecking.',
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
    communitySignal: 'Established name with an audience focused more on trading education than discounts.',
    products: [
      product({
        id: 'cti-programs',
        name: 'CTI Programs',
        description: 'Forex challenges and funded-account programs.',
        accountSizeMax: 200000,
        entryFeeMin: 99,
        profitSplit: 'up to 100% subject to conditions',
        platforms: ['MT5'],
        tradableAssets: ['Forex', 'Indices', 'Metals'],
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
    bestFor: 'CFD traders looking for a modern, straightforward offer',
    verdict: 'Young brand with a clean proposition; the score remains cautious due to its short public track record.',
    priceFrom: 49,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    logoDomain: 'pipfarm.com',
    communitySignal: 'Emerging public signal that still needs recent payout evidence.',
    products: [
      product({
        id: 'pipfarm-programs',
        name: 'PipFarm Programs',
        description: 'Forex and CFD evaluation programs.',
        accountSizeMax: 300000,
        entryFeeMin: 49,
        profitSplit: 'variable',
        platforms: ['cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Metals'],
        linkToStart: 'https://pipfarm.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. The official PipFarm domain and likely Terms URL were reachable only with little or no usable text in this environment. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Entity, jurisdiction, full terms, refund policy and simulated/non-broker wording remain unverified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high information risk. PipFarm appears to be an active modern CFD prop-firm brand, but PropRadar did not capture enough readable legal text in this pass to verify the operator, jurisdiction, refund rules or regulatory posture.',
      entities: [
        {
          name: 'PipFarm',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from current official legal pages and checkout documents.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Broker/non-broker, deposit and simulated-account wording not captured from readable official text.',
        'No reliable newspaper/financial-press article surfaced for the exact PipFarm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Manual review required for payout evidence, refund clauses, prohibited strategies and operating entity.',
      ],
      redFlags: [
        'Readable legal source capture failed or returned too little text.',
        'Young brand with limited independent press footprint.',
        'Do not rank as legally clear until terms and entity are captured.',
      ],
      sources: [
        { label: 'PipFarm official site', url: 'https://pipfarm.com/' },
        { label: 'PipFarm Terms URL to recheck', url: 'https://pipfarm.com/terms-and-conditions/' },
        { label: 'PipFarm article/news search', url: 'https://www.google.com/search?q=%22PipFarm%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official PipFarm site', url: 'https://pipfarm.com/' },
      { label: 'PipFarm Terms URL to recheck', url: 'https://pipfarm.com/terms-and-conditions/' },
    ],
  }),
  firm({
    id: 22,
    slug: 'lark-funding',
    name: 'Lark Funding',
    status: 'À surveiller',
    score: 68,
    founded: 2022,
    headquarters: 'International',
    bestFor: 'traders comparing newer CFD offers',
    verdict: 'Keep it on the radar, but outside strong recommendations until payout history and rules receive a deeper review.',
    priceFrom: 49,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'larkfunding.com',
    communitySignal: 'Limited public signal; proceed cautiously.',
    products: [
      product({
        id: 'lark-programs',
        name: 'Lark Funding Programs',
        description: 'Forex and CFD evaluation programs.',
        accountSizeMax: 200000,
        entryFeeMin: 49,
        profitSplit: 'variable',
        platforms: ['MT4', 'MT5'],
        tradableAssets: ['Forex', 'Indices', 'Metals'],
        linkToStart: 'https://larkfunding.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. Lark Funding official domain returned only minimal image/page text in this environment, and likely legal URLs did not expose readable terms. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Legal entity, jurisdiction, refund rules and simulated/non-broker wording remain unverified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL attempted', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high information risk. Lark Funding remains a watchlist-style CFD prop-firm profile until readable legal pages confirm the current operator, contract, refund policy, broker/non-broker status and account model.',
      entities: [
        {
          name: 'Lark Funding',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from current official legal pages and checkout documents.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Broker/non-broker, deposit and simulated-account wording not captured from readable official text.',
        'No reliable newspaper/financial-press article surfaced for the exact Lark Funding brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Manual review required for payout evidence, refund clauses, prohibited strategies and operating entity.',
      ],
      redFlags: [
        'Official page capture returned too little usable text.',
        'Independent press footprint was not found in exact-name searches.',
        'Keep out of strong recommendations until legal documents are readable.',
      ],
      sources: [
        { label: 'Lark Funding official site', url: 'https://larkfunding.com/' },
        { label: 'Lark Funding Terms URL to recheck', url: 'https://larkfunding.com/terms-and-conditions/' },
        { label: 'Lark Funding article/news search', url: 'https://www.google.com/search?q=%22Lark+Funding%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Lark Funding site', url: 'https://larkfunding.com/' },
      { label: 'Lark Funding Terms URL to recheck', url: 'https://larkfunding.com/terms-and-conditions/' },
    ],
  }),
  firm({
    id: 23,
    slug: 'bespoke-funding-program',
    name: 'Bespoke Funding Program',
    status: 'À surveiller',
    score: 61,
    founded: 2022,
    headquarters: 'International',
    bestFor: 'traders maintaining a broad market watchlist',
    verdict: 'Treat this as a watchlist entry rather than a recommendation until recent signals are firmly confirmed.',
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
    communitySignal: 'Community evidence remains too thin for a strong recommendation.',
    products: [
      product({
        id: 'bespoke-programs',
        name: 'Bespoke Programs',
        description: 'Legacy evaluation programs that require a full recheck before purchase.',
        accountSizeMax: 500000,
        profitSplit: 'variable',
        linkToStart: 'https://bespokefundingprogram.com/',
      }),
    ],
    strengths: ['Historically covered by comparison sites'],
    weaknesses: ['Operating status and terms require a full recheck', 'No strong recommendation'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited-source audit completed. The stored official domain returned no usable page text in this pass, likely legal URLs did not surface, and exact-name article/news searches did not find reliable mainstream or financial-press coverage. PropRadar keeps this as a watchlist archive rather than a buyable recommendation until entity, terms, refund and operating status are confirmed from readable documents.',
    auditSourcesChecked: ['Official domain reachability', 'Likely legal URLs', 'Trustpilot search', 'Exact-name article/news search', 'Stale-domain review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. Bespoke Funding Program remains known from older prop-firm comparison material, but current official legal evidence was not captured. The lack of readable terms, operator identity and current press footprint makes this unsuitable for recommendation.',
      entities: [
        {
          name: 'Bespoke Funding Program',
          jurisdiction: 'To verify',
          role: 'Historical brand/operator to identify from archived legal documents or current checkout documents if the service reappears.',
        },
      ],
      regulatoryStatus: [
        'Current operating entity not verified in PropRadar at this check.',
        'No readable current terms, refund policy or simulated/non-broker disclaimer was captured from the stored official domain.',
        'No reliable newspaper/financial-press article surfaced for the exact Bespoke Funding Program brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Before any purchase consideration, verify whether the brand is actually operating and whether checkout is on a controlled official domain.',
        'Historical comparison-site visibility should not be treated as current proof of payouts, solvency or legal status.',
      ],
      redFlags: [
        'Official domain returned little or no usable content.',
        'Legal entity and jurisdiction remain unverified.',
        'No independent press footprint found for the exact brand.',
      ],
      sources: [
        { label: 'Bespoke Funding Program stored domain', url: 'https://bespokefundingprogram.com/' },
        { label: 'Bespoke Funding Program article/news search', url: 'https://www.google.com/search?q=%22Bespoke+Funding+Program%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Bespoke Funding Program stored domain', url: 'https://bespokefundingprogram.com/' },
      { label: 'Bespoke Funding Program article/news search', url: 'https://www.google.com/search?q=%22Bespoke+Funding+Program%22+prop+firm+article+news' },
    ],
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms of Use, Funded Trader Agreement and footer disclosures checked. Tradeify identifies Tradeify Holdings, Corp as the site/services company, discloses a Boca Raton address, presents evaluation and simulated-funded accounts, and states that account funds remain company property and are demo funds unless otherwise stated. The footer also discloses Tradeify Brokerage LLC d/b/a Slay Markets as a CFTC-registered introducing broker and NFA member, which should be separated from ordinary Tradeify evaluation/sim-funded accounts.',
    auditSourcesChecked: ['Official site', 'Terms of Use', 'Funded Trader Agreement', 'Brokerage footer disclosure', 'Trustpilot link', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. Tradeify is more transparent than many futures prop-firm alternatives because it names Tradeify Holdings, Corp and separately discloses Tradeify Brokerage LLC d/b/a Slay Markets as an introducing broker. The key risk is interpretation: most Tradeify prop accounts are evaluation or simulated-funded accounts, while live/brokerage status appears separate and conditional.',
      entities: [
        {
          name: 'Tradeify Holdings, Corp',
          jurisdiction: 'United States, Florida',
          registeredAddress: '1700 S. Dixie Highway, Suite 305, Boca Raton, FL 33432',
          role: 'Website and evaluation-services company disclosed in Terms of Use and Funded Trader Agreement.',
        },
        {
          name: 'Tradeify Brokerage LLC d/b/a Slay Markets',
          jurisdiction: 'United States',
          registrationNumber: 'NFA ID 0575972',
          registeredAddress: '1700 S. Dixie Highway, Suite 305, Boca Raton, FL 33432',
          role: 'Introducing broker disclosed in the footer as CFTC-registered, NFA member and guaranteed by NinjaTrader Clearing / related clearing brands.',
        },
      ],
      regulatoryStatus: [
        'Funded Trader Agreement says all funds in the trading account remain the sole property of the company and are exclusively demo funds unless otherwise stated.',
        'Terms of Use say the site is not professional, financial, investment, legal, tax or business advice.',
        'Footer discloses CFTC Rule 4.41 simulated-performance language.',
        'Tradeify Brokerage LLC disclosure is useful, but it should not be treated as proof that every evaluation or simulated-funded account is a regulated brokerage account.',
        'No reliable newspaper/financial-press article surfaced for the exact Tradeify futures prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Funded Trader Agreement makes evaluation, subscription, activation and reset fees strictly non-refundable once access is granted.',
        'The company reserves audit and compliance-review rights over trading activity without prior notice.',
        'Marketing claims around daily payouts, 0% payout denials and live-capital paths should be reconciled with the current funded agreement before purchase.',
      ],
      redFlags: [
        'Strong payout and live-capital marketing requires reading the actual funded agreement.',
        'Most account balances are demo funds unless otherwise stated.',
        'Strict non-refund language applies across evaluation and funded account fees.',
      ],
      sources: [
        { label: 'Tradeify official site', url: 'https://tradeify.co/' },
        { label: 'Tradeify Terms of Use', url: 'https://tradeify.co/terms-of-use' },
        { label: 'Tradeify Funded Trader Agreement', url: 'https://tradeify.co/funded-trader-agreement' },
        { label: 'Tradeify article/news search', url: 'https://www.google.com/search?q=%22Tradeify%22+futures+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Tradeify site', url: 'https://tradeify.co/' },
      { label: 'Tradeify Terms of Use', url: 'https://tradeify.co/terms-of-use' },
      { label: 'Tradeify Funded Trader Agreement', url: 'https://tradeify.co/funded-trader-agreement' },
    ],
  }),
  firm({
    id: 25,
    slug: 'take-profit-trader',
    name: 'Take Profit Trader',
    status: 'Active',
    score: 73,
    founded: 2021,
    headquarters: 'United States',
    bestFor: 'futures traders looking for fast payouts',
    verdict: 'Futures offer built around fast progression to PRO and withdrawals; verify the exact buffer rules.',
    priceFrom: 99,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'advertised day-one payout on PRO',
    incidents: 1,
    payoutProof: true,
    logoDomain: 'takeprofittrader.com',
    communitySignal: 'Good visibility in the futures niche, with a clearly stated payout proposition.',
    styles: ['Futures', 'Intraday'],
    products: [
      product({
        id: 'tpt-test',
        name: 'TPT Test / PRO',
        type: 'Futures evaluation',
        description: 'Futures evaluation progressing to PRO, with an 80/20 to 90/10 split depending on the account.',
        accountSizeMax: 150000,
        entryFeeMin: 99,
        maxDrawdown: 'trailing or EOD depending on PRO+',
        profitSplit: '80% to 90%',
        platforms: ['NinjaTrader', 'Tradovate', 'TradingView', 'Quantower'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://takeprofittrader.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms of Service and BBB profile checked. Take Profit Trader discloses a Florida LLC structure, simulated PRO accounts, a live PRO+ route through Tradovate, and a non-broker / no-investment-advice posture. BBB also shows accreditation but is evaluating a pattern of complaints, so PropRadar keeps the legal file cautious.',
    auditSourcesChecked: ['Official site', 'Terms of Service', 'Official FAQ/disclaimers', 'BBB profile', 'Trustpilot to monitor'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-07',
      summary:
        'Medium regulatory risk. Take Profit Trader is a Florida-based futures prop-firm brand operated by TakeProfitTrader LLC. The company is more transparent than many offshore challenge firms because it names the LLC, address and Florida governing law, and its public FAQ explains that Test and PRO accounts are simulated. The key limitation is that Take Profit Trader states it is not a broker and that futures funding firms are not required by NFA/CFTC to be members; BBB also flags a pattern-of-complaints review before issuing a rating.',
      entities: [
        {
          name: 'TakeProfitTrader LLC',
          jurisdiction: 'United States, Florida',
          registeredAddress: '9100 Conroy Windermere Rd Suite 200, Windermere, FL 34786',
          role:
            'Florida LLC named in official terms, footer disclosures and BBB business profile for the futures prop-firm service.',
        },
      ],
      regulatoryStatus: [
        'Official Terms of Service identify TakeProfitTrader LLC as owner/operator and apply Florida law and Florida courts.',
        'The official FAQ says Take Profit Trader is not a broker and uses regulated brokers / CME-approved data providers such as Tradovate, NinjaTrader and Rithmic.',
        'Test and PRO accounts are described as simulated; PRO+ is described as a live-market route using Tradovate as broker.',
        'Terms include CFTC Rule 4.41 simulated-performance language and state that website content is general information, not investment advice or a recommendation.',
      ],
      complaintsAndDisputes: [
        'BBB profile lists TakeProfitTrader as accredited but not rated while BBB evaluates a pattern of complaints.',
        'BBB business details list the business as started in 2021 and incorporated on March 28, 2021, with James M. Sixsmith named as founder/CEO.',
        'User disputes should be classified around activation, PRO account rules, payout buffer, support quality and chargeback/dispute clauses.',
      ],
      redFlags: [
        'Not a broker and not presented as a registered futures commission merchant or investment adviser.',
        'PRO accounts are simulated even when payouts are paid in real money; trader rights differ from a normal brokerage account.',
        'Terms include class-action waiver, arbitration language and a strong payment-dispute waiver.',
        'BBB pattern-of-complaints evaluation should be monitored before treating the brand as low-risk.',
      ],
      sources: [
        { label: 'Official Take Profit Trader site', url: 'https://takeprofittrader.com/' },
        { label: 'Take Profit Trader Terms of Service', url: 'https://takeprofittrader.com/terms' },
        { label: 'Take Profit Trader Privacy Policy', url: 'https://takeprofittrader.com/privacy-policy' },
        { label: 'BBB TakeProfitTrader profile', url: 'https://www.bbb.org/us/fl/windermere/profile/financial-services/takeprofittrader-0733-235965089/' },
        { label: 'Take Profit Trader Help Center', url: 'https://takeprofittraderhelp.zendesk.com/hc/en-us' },
      ],
    },
    sources: [
      { label: 'Official Take Profit Trader site', url: 'https://takeprofittrader.com/' },
      { label: 'Take Profit Trader Terms of Service', url: 'https://takeprofittrader.com/terms' },
      { label: 'BBB TakeProfitTrader profile', url: 'https://www.bbb.org/us/fl/windermere/profile/financial-services/takeprofittrader-0733-235965089/' },
    ],
  }),
  firm({
    id: 26,
    slug: 'earn2trade',
    name: 'Earn2Trade',
    status: 'Active',
    score: 78,
    founded: 2017,
    headquarters: 'United States',
    bestFor: 'futures traders looking for an educational path',
    verdict: 'Longer-standing futures operator with an education focus, suited to traders who value a learning framework.',
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
    communitySignal: 'A longer public track record than many newer futures programs.',
    styles: ['Futures', 'Formation'],
    products: [
      product({
        id: 'earn2trade-gauntlet',
        name: 'Gauntlet / Trader Career Path',
        type: 'Futures evaluation',
        description: 'Futures evaluation path with an educational component.',
        accountSizeMax: 200000,
        entryFeeMin: 150,
        maxDrawdown: 'futures-specific rules',
        profitSplit: 'up to 80%',
        platforms: ['NinjaTrader', 'Finamark', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://www.earn2trade.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Terms and Conditions checked. Earn2Trade names Earn2Trade, LLC as the contracting company, states that it is not a broker-dealer, does not trade securities for itself or others through the service, and does not provide its own financial advice. Terms also include eligibility screens for felony, NFA/CFTC discipline and outstanding balances with trading firms, plus a strict no-refund policy for non-tangible services.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Help/legal links', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. Earn2Trade is older and more explicit than many newer futures prop-firm programs: it names Earn2Trade, LLC and clearly disclaims broker-dealer and financial-advice status. The legal caution is that purchases are subscription/service access, not protected brokerage deposits, and refunds are broadly unavailable after purchase.',
      entities: [
        {
          name: 'Earn2Trade, LLC',
          jurisdiction: 'United States',
          role: 'Company named in the official Terms and Conditions as operator of the site and services.',
        },
      ],
      regulatoryStatus: [
        'Terms say Earn2Trade is not a broker-dealer under US financial-services regulations.',
        'Terms say Earn2Trade does not trade securities for itself or another party as part of the site or service.',
        'Terms say Earn2Trade does not directly offer its own financial advice through the service.',
        'Eligibility clauses exclude users convicted of a felony, disciplined by NFA/CFTC, or with outstanding balances with a trading firm.',
        'No reliable newspaper/financial-press article surfaced for the exact Earn2Trade futures prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Terms say Earn2Trade offers non-tangible, irrevocable goods and does not provide refunds after purchase.',
        'Subscriptions renew automatically unless canceled before renewal.',
        'Terms mention chargeback fees and collection/legal pursuit for rendered services and disputed fees.',
      ],
      redFlags: [
        'Older brand status helps confidence, but the current contract still needs to be read at checkout.',
        'No-refund and recurring-subscription clauses are strict.',
        'Partner/funded-account route should not be confused with direct brokerage protection from Earn2Trade itself.',
      ],
      sources: [
        { label: 'Earn2Trade official site', url: 'https://www.earn2trade.com/' },
        { label: 'Earn2Trade Terms and Conditions', url: 'https://www.earn2trade.com/terms-and-conditions' },
        { label: 'Earn2Trade article/news search', url: 'https://www.google.com/search?q=%22Earn2Trade%22+futures+trading+article+news' },
      ],
    },
    sources: [
      { label: 'Official Earn2Trade site', url: 'https://www.earn2trade.com/' },
      { label: 'Earn2Trade Terms and Conditions', url: 'https://www.earn2trade.com/terms-and-conditions' },
    ],
  }),
  firm({
    id: 27,
    slug: 'oneup-trader',
    name: 'OneUp Trader',
    status: 'Active',
    score: 72,
    founded: 2017,
    headquarters: 'United States',
    bestFor: 'futures traders looking for a conventional evaluation',
    verdict: 'Established futures operator with less hype than newer brands; compare total cost and rules carefully.',
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
    communitySignal: 'Long-standing presence in the futures niche.',
    styles: ['Futures'],
    products: [
      product({
        id: 'oneup-evaluation',
        name: 'OneUp Evaluation',
        type: 'Futures evaluation',
        description: 'Futures evaluation with multiple account sizes.',
        accountSizeMax: 250000,
        entryFeeMin: 125,
        maxDrawdown: 'trailing',
        profitSplit: 'up to 80%',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://www.oneuptrader.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and Terms page checked. OneUp Trader publishes a Terms & Conditions page and CFTC Rule 4.41 / futures-risk disclosure, but this pass did not capture a registered company suffix, broker/FCM relationship or detailed refund policy from the public terms. The profile remains useful for futures comparison, but legally thinner than peers with explicit LLC and funded-agreement disclosures.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Help center links', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal information risk. OneUp Trader is an older futures funding brand, but the current public terms captured in this pass identify the brand as OneUp Trader without enough corporate detail to confirm registration, broker/FCM relationships, refund terms or current contracting entity.',
      entities: [
        {
          name: 'OneUp Trader',
          jurisdiction: 'United States / To verify',
          role: 'Brand/operator named in public terms; exact legal entity and registration details not captured in this pass.',
        },
      ],
      regulatoryStatus: [
        'Terms page includes CFTC Rule 4.41 simulated-performance disclosure.',
        'Terms page states futures/options trading involves substantial risk and is not a solicitation or offer to buy or sell futures/options.',
        'This pass did not capture broker-dealer, FCM, NFA/CFTC registration or non-broker wording for OneUp Trader itself.',
        'No reliable newspaper/financial-press article surfaced for the exact OneUp Trader futures prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Withdrawal/profit-split and funding rules are linked through help-center pages and should be checked before purchase.',
        'The public Terms page has broad website disclaimers and limitation-of-liability language but little detail on refund/payout review.',
      ],
      redFlags: [
        'Legal entity detail is thinner than comparable futures firms.',
        'Broker/FCM pathway and funded-account partner structure need direct documentation.',
        'Do not rely on age of brand alone as proof of legal clarity.',
      ],
      sources: [
        { label: 'OneUp Trader official site', url: 'https://www.oneuptrader.com/' },
        { label: 'OneUp Trader Terms and Conditions', url: 'https://www.oneuptrader.com/terms-conditions/' },
        { label: 'OneUp Trader article/news search', url: 'https://www.google.com/search?q=%22OneUp+Trader%22+futures+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official OneUp Trader site', url: 'https://www.oneuptrader.com/' },
      { label: 'OneUp Trader Terms and Conditions', url: 'https://www.oneuptrader.com/terms-conditions/' },
    ],
  }),
  firm({
    id: 28,
    slug: 'elite-trader-funding',
    name: 'Elite Trader Funding',
    status: 'À surveiller',
    score: 64,
    founded: 2021,
    headquarters: 'United States',
    bestFor: 'futures traders comparing discounts',
    verdict: 'Futures operator known for frequent offers, with a cautious score due to complex rules and noisy public feedback.',
    priceFrom: 45,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 3,
    logoDomain: 'elitetraderfunding.app',
    communitySignal: 'Highly mixed feedback; read current rules and recent reports.',
    styles: ['Futures'],
    products: [
      product({
        id: 'elite-futures',
        name: 'Elite Evaluations',
        type: 'Futures evaluation',
        description: 'Futures evaluations with frequent discounts.',
        accountSizeMax: 300000,
        entryFeeMin: 45,
        maxDrawdown: 'trailing depending on the plan',
        profitSplit: 'up to 90%',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://elitetraderfunding.app/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and 2026 Terms of Service checked. Elite Trader Funding identifies Elite Trader Funding LLC, discloses synthetic/non-genuine currency for non-LIVE ELITE accounts, states that ETF is not a broker-dealer, CTA, FCM or CPO, and says it is not regulated by CFTC/NFA rules. Terms also include a discretionary LIVE ELITE transition model and strict refund/chargeback provisions.',
    auditSourcesChecked: ['Official site', 'Terms of Service', 'Risk/performance disclosures', 'Help center terms link', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. Elite Trader Funding now has unusually explicit terms around synthetic accounts, non-broker/FCM status, KYC and LIVE ELITE conversion, but the discretion is broad: ETF can move traders to LIVE ELITE before, during or after payout review, can close sim-funded accounts on conversion, and has strict refund/chargeback penalties.',
      entities: [
        {
          name: 'Elite Trader Funding LLC',
          jurisdiction: 'United States / To verify state',
          role: 'Company named in the 2026 Terms of Service and footer.',
        },
      ],
      regulatoryStatus: [
        'Terms say all non-LIVE ELITE account types contain synthetic currency and do not constitute genuine trading in real financial instruments.',
        'Terms say ETF owns all money/funds, synthetic or real, deposited or held in any account used by a trader while using ETF services.',
        'Terms say ETF is not a broker-dealer, CTA, FCM or CPO and is not regulated by CFTC/NFA rules.',
        'Terms disclose AML/KYC and CFT checks through a third-party provider.',
        'No reliable newspaper/financial-press article surfaced for the exact Elite Trader Funding brand in this pass.',
      ],
      complaintsAndDisputes: [
        'LIVE ELITE transition can occur before, during or after a payout request, at ETF discretion.',
        'Terms say all sales are final and broadly non-refundable except where law requires otherwise.',
        'Chargebacks can trigger account deactivation, service bans, revocation of earnings and disgorgement/return of prior earnings if the chargeback is deemed fraudulent.',
      ],
      redFlags: [
        'Sim-funded balances are synthetic and not ordinary brokerage balances.',
        'LIVE ELITE conversion rules materially affect payout expectations.',
        'Refund and chargeback language is unusually strict.',
      ],
      sources: [
        { label: 'Elite Trader Funding official site', url: 'https://elitetraderfunding.app/' },
        { label: 'Elite Trader Funding Terms of Service', url: 'https://elitetraderfunding.app/terms-of-service' },
        { label: 'Elite Trader Funding article/news search', url: 'https://www.google.com/search?q=%22Elite+Trader+Funding%22+futures+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Elite Trader Funding site', url: 'https://elitetraderfunding.app/' },
      { label: 'Elite Trader Funding Terms of Service', url: 'https://elitetraderfunding.app/terms-of-service' },
    ],
  }),
  firm({
    id: 29,
    slug: 'tickticktrader',
    name: 'TickTickTrader',
    status: 'À surveiller',
    score: 68,
    founded: 2022,
    headquarters: 'United States',
    bestFor: 'futures traders looking for straightforward accounts',
    verdict: 'Active name in the futures niche, but still on watch due to a thinner track record than Topstep.',
    priceFrom: 99,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'tickticktrader.com',
    communitySignal: 'Reasonable public signal that still needs stronger confirmation.',
    styles: ['Futures'],
    products: [
      product({
        id: 'ticktick-futures',
        name: 'TickTickTrader Accounts',
        type: 'Futures evaluation',
        description: 'Futures evaluations with multiple account sizes.',
        accountSizeMax: 250000,
        entryFeeMin: 99,
        maxDrawdown: 'trailing',
        profitSplit: 'variable',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://tickticktrader.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and Terms checked. TickTickTrader discloses TickTickTrader Ltd, Isle of Man address and company registration number 137735C. Terms say all evaluation accounts are paper trading accounts in a simulation environment, and the footer says TickTickTrader exclusively provides simulation accounts for educational purposes. Refund terms are strict and state that subscriptions are final.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Risk disclosure/footer', 'Prohibited actions link', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. TickTickTrader provides concrete Isle of Man entity and address details plus clear simulated-account language. Risk remains because the terms use broad warranty/limitation clauses, strict no-refund language and do not clearly show broker/FCM/NFA-style protection for evaluation accounts.',
      entities: [
        {
          name: 'TickTickTrader Ltd',
          jurisdiction: 'Isle of Man',
          registrationNumber: '137735C',
          registeredAddress: 'Second Floor, Exchange House, Athol Street, Douglas, IM1 1JD, Isle of Man',
          role: 'Company named in official terms and footer.',
        },
      ],
      regulatoryStatus: [
        'Terms say all trading evaluation accounts are paper trading accounts operating in a simulation environment.',
        'Footer says TickTickTrader exclusively provides simulation accounts for educational purposes only.',
        'Footer includes CFTC futures/options risk disclosure and CFTC Rule 4.41 simulated-performance language.',
        'No broker, FCM or direct regulated-futures-account status was captured for the evaluation product in this pass.',
        'No reliable newspaper/financial-press article surfaced for the exact TickTickTrader brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Terms say subscriptions are final and participation/failure to use the service does not entitle the user to a refund.',
        'Chargebacks/payment disputes can trigger immediate deactivation and a permanent purchase ban.',
        'Data/platform failures are broadly disclaimed as not giving a refund or remedy.',
      ],
      redFlags: [
        'Paper/simulated environment should not be treated as direct live brokerage access.',
        'Strict no-refund and chargeback wording.',
        'Platform/data-feed issues are largely shifted to the trader under the terms.',
      ],
      sources: [
        { label: 'TickTickTrader official site', url: 'https://tickticktrader.com/' },
        { label: 'TickTickTrader Terms and Conditions', url: 'https://tickticktrader.com/terms-conditions' },
        { label: 'TickTickTrader article/news search', url: 'https://www.google.com/search?q=%22TickTickTrader%22+futures+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official TickTickTrader site', url: 'https://tickticktrader.com/' },
      { label: 'TickTickTrader Terms and Conditions', url: 'https://tickticktrader.com/terms-conditions' },
    ],
  }),
  firm({
    id: 30,
    slug: 'leeloo-trading',
    name: 'Leeloo Trading',
    status: 'Active',
    score: 70,
    founded: 2020,
    headquarters: 'United States',
    bestFor: 'futures traders looking for conventional evaluations',
    verdict: 'Known futures operator to compare on drawdown, resets, activation costs and payout rules.',
    priceFrom: 77,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'leelootrading.com',
    communitySignal: 'Known name with mixed feedback depending on discounts and rule changes.',
    styles: ['Futures'],
    products: [
      product({
        id: 'leeloo-accounts',
        name: 'Leeloo Evaluation',
        type: 'Futures evaluation',
        description: 'Futures evaluations with several account sizes and options.',
        accountSizeMax: 300000,
        entryFeeMin: 77,
        maxDrawdown: 'trailing',
        profitSplit: 'variable',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://www.leelootrading.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and 2026 Terms of Service checked. Leeloo Trading identifies Natural Trading, LLC d/b/a Leeloo Trading, states that Leeloo is educational and runs periodic contests at its discretion, and describes the platform as performance-based with simulated funds. Payouts are expressly subject to review and compliance with program terms and risk guidelines at Leeloo full discretion.',
    auditSourcesChecked: ['Official site', 'Terms of Service', 'Risk disclosure/footer', 'Performance disclosure link', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. Leeloo has a clear US LLC/operator disclosure and a detailed 2026 terms page, but the product is framed as educational/contest-style simulated trading. Payouts depend on discretionary review, and the dispute section applies Montana law, individual claims and class-action waiver language.',
      entities: [
        {
          name: 'Natural Trading, LLC d/b/a Leeloo Trading',
          jurisdiction: 'United States, Montana-linked terms',
          role: 'Operator named in official Terms of Service.',
        },
      ],
      regulatoryStatus: [
        'Terms say Leeloo Trading is for educational purposes only and runs periodic contests at Leeloo discretion.',
        'Terms say the platform facilitates trades using simulated funds.',
        'Footer includes CFTC futures/options required disclaimer.',
        'Terms apply Montana law and Lewis and Clark County, Montana venue for disputes.',
        'No reliable newspaper/financial-press article surfaced for the exact Leeloo Trading prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Terms say all payouts are subject to review and compliance with Leeloo program terms and risk guidelines at Leeloo full discretion.',
        'Terms include class-action waiver and one-year limitation to assert claims.',
        'Program/risk guideline links should be checked before purchase because payout eligibility is not just a headline split.',
      ],
      redFlags: [
        'Contest/educational/simulated framing limits broker-style expectations.',
        'Payouts are expressly discretionary and risk-review based.',
        'Dispute rights are limited by class-action waiver and claim timing language.',
      ],
      sources: [
        { label: 'Leeloo Trading official site', url: 'https://www.leelootrading.com/' },
        { label: 'Leeloo Trading Terms of Service', url: 'https://www.leelootrading.com/terms-of-service' },
        { label: 'Leeloo Trading article/news search', url: 'https://www.google.com/search?q=%22Leeloo+Trading%22+futures+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Leeloo Trading site', url: 'https://www.leelootrading.com/' },
      { label: 'Leeloo Trading Terms of Service', url: 'https://www.leelootrading.com/terms-of-service' },
    ],
  }),
  firm({
    id: 31,
    slug: 'uprofit-trader',
    name: 'UProfit Trader',
    status: 'Active',
    score: 69,
    founded: 2019,
    headquarters: 'United States',
    bestFor: 'futures traders looking for an alternative to the largest brands',
    verdict: 'Active futures operator best treated as an alternative until a deeper review supports priority status.',
    priceFrom: 89,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'uprofittrader.com',
    communitySignal: 'Stable presence, with less public feedback than Topstep or Apex.',
    styles: ['Futures'],
    products: [
      product({
        id: 'uprofit-accounts',
        name: 'UProfit Evaluations',
        type: 'Futures evaluation',
        description: 'Futures evaluations with multiple account sizes.',
        accountSizeMax: 200000,
        entryFeeMin: 89,
        maxDrawdown: 'trailing',
        profitSplit: 'variable',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://uprofittrader.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms and Risk Disclosure checked. UProfit now redirects to uprofit.com and discloses UProfit Trader as a Delaware LLC with a Dover address. Terms say all sales are final/no refunds, KYC is required before live-account assignment, and prohibited-practice rules include CFTC-style market-integrity concepts such as spoofing, layering and disruptive trading. Risk Disclosure says content is general information only and not investment advice, offer, solicitation or recommendation.',
    auditSourcesChecked: ['Official redirected site', 'Terms and Conditions', 'Risk Disclosure', 'Trustpilot link', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. UProfit has concrete Delaware LLC and address disclosure and a more detailed rule/compliance page than many older futures listings. The caution is that live-account assignment is contingent on KYC, no-refund language is strict, and the public page gives more risk/prohibited-practice disclosure than broker/FCM relationship detail.',
      entities: [
        {
          name: 'UProfit Trader LLC',
          jurisdiction: 'United States, Delaware',
          registeredAddress: '8 The Green, STE B, Dover, DE 19901, Kent County, United States',
          role: 'Company disclosed in Terms and footer/contact area.',
        },
      ],
      regulatoryStatus: [
        'Terms say UProfit Trader is a limited liability company registered in Delaware.',
        'Risk Disclosure says content is general information only and not investment advice, offer, solicitation or recommendation.',
        'Risk Disclosure includes CFTC Rule 4.41 simulated-performance language.',
        'Terms say assignment of a live account is contingent on successful KYC.',
        'No reliable newspaper/financial-press article surfaced for the exact UProfit futures prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Terms say all sales are final and there are no refunds.',
        'If KYC is not completed successfully, the live account cannot be assigned and the evaluation payment is not refunded.',
        'Prohibited-practice section gives the company broad discretion to classify disruptive, manipulative or unrealistic trading behavior.',
      ],
      redFlags: [
        'Live-account step depends on KYC and compliance review.',
        'No-refund policy is broad.',
        'The old uprofittrader.com domain redirects to uprofit.com, so users should check checkout/invoice entity carefully.',
      ],
      sources: [
        { label: 'UProfit official site', url: 'https://uprofit.com/' },
        { label: 'UProfit Terms and Conditions', url: 'https://uprofit.com/terms-and-conditions' },
        { label: 'UProfit Risk Disclosure', url: 'https://uprofit.com/risk-disclosure' },
        { label: 'UProfit article/news search', url: 'https://www.google.com/search?q=%22UProfit%22+futures+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official UProfit site', url: 'https://uprofit.com/' },
      { label: 'UProfit Terms and Conditions', url: 'https://uprofit.com/terms-and-conditions' },
      { label: 'UProfit Risk Disclosure', url: 'https://uprofit.com/risk-disclosure' },
    ],
  }),
  firm({
    id: 32,
    slug: 'myfundedfutures',
    name: 'MyFundedFutures',
    status: 'Active',
    score: 73,
    founded: 2023,
    headquarters: 'United States',
    bestFor: 'futures traders looking for a newer alternative',
    verdict: 'A newer but highly visible futures operator; monitor payout rules and operational stability closely.',
    priceFrom: 80,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 1,
    payoutProof: true,
    logoDomain: 'myfundedfutures.com',
    communitySignal: 'Recent and growing public signal.',
    styles: ['Futures'],
    products: [
      product({
        id: 'mffu-futures',
        name: 'MyFundedFutures Accounts',
        type: 'Futures evaluation',
        description: 'Futures evaluations with multiple sizes and firm-specific rules.',
        accountSizeMax: 150000,
        entryFeeMin: 80,
        maxDrawdown: 'trailing',
        profitSplit: 'up to 90%',
        platforms: ['NinjaTrader', 'Tradovate'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://myfundedfutures.com/',
      }),
    ],
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-07',
      summary:
        'Low-to-medium regulatory risk. MyFundedFutures is a US futures prop-firm brand with a simulated account model, clear terms around demo/simulated trading and no major official regulator warning recorded in PropRadar at this check. The risk remains higher than a regulated broker because the product is not an investment service, payouts are rule-based and access to live capital is discretionary or affiliate-based.',
      entities: [
        {
          name: 'MyFunded Futures, LLC',
          jurisdiction: 'United States',
          role:
            'Company entity named in the official Terms and Conditions for the website and services.',
        },
      ],
      regulatoryStatus: [
        'MFFU terms state that none of the services constitute investment advice or investment services under applicable law.',
        'The terms define evaluation accounts as simulated or demo trading accounts with virtual funds.',
        'The company states that it is not a broker-dealer and does not trade on behalf of users.',
        'The terms state that simulated funds are fictitious and cannot be used for actual trading unless expressly agreed otherwise.',
        'Texas law, Collin County / Eastern District of Texas venue and JAMS arbitration in Fort Worth are stated for disputes.',
        'Live capital access, where available, is by invitation and subject to affiliate/company requirements rather than an automatic client brokerage right.',
      ],
      complaintsAndDisputes: [
        'Public complaints to monitor are mostly standard futures prop-firm issues: rule interpretation, payout eligibility and account review.',
        'No major public regulatory enforcement action is documented in PropRadar at this check.',
        'FCM/brokerage partner details should be checked in the live-capital documents before assuming market access or regulatory protection.',
      ],
      redFlags: [
        'US futures prop-firm model remains outside the protection profile of a normal regulated brokerage account.',
        'All evaluation accounts are simulated; payouts depend on rules compliance and firm review.',
        'Terms allow restriction, suspension, termination, withholding or forfeiture of payouts/funds for violations or prohibited conduct.',
        'Class-action waiver and arbitration language reduce collective dispute leverage for users.',
        'Terms allow updates to rules, policies and platform requirements.',
      ],
      sources: [
        { label: 'Official MyFundedFutures site', url: 'https://myfundedfutures.com/' },
        { label: 'MyFundedFutures Terms', url: 'https://myfundedfutures.com/terms' },
        { label: 'MyFundedFutures Help Center', url: 'https://help.myfundedfutures.com/' },
        { label: 'Trustpilot MyFundedFutures', url: 'https://www.trustpilot.com/review/myfundedfutures.com' },
      ],
    },
    sources: [
      { label: 'Site officiel MyFundedFutures', url: 'https://myfundedfutures.com/' },
      { label: 'MyFundedFutures Terms', url: 'https://myfundedfutures.com/terms' },
    ],
  }),
  firm({
    id: 33,
    slug: 'bulenox',
    name: 'Bulenox',
    status: 'À surveiller',
    score: 65,
    founded: 2020,
    headquarters: 'United States',
    bestFor: 'futures traders monitoring lower-cost alternatives',
    verdict: 'Known futures operator that remains on watch for rules, activation, drawdown and payout feedback.',
    priceFrom: 78,
    profitSplit: 80,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 3,
    logoDomain: 'bulenox.com',
    communitySignal: 'Mixed feedback; enhanced due diligence is required.',
    styles: ['Futures'],
    products: [
      product({
        id: 'bulenox-evaluation',
        name: 'Bulenox Evaluation',
        type: 'Futures evaluation',
        description: 'Futures evaluations with multiple account sizes.',
        accountSizeMax: 250000,
        entryFeeMin: 78,
        maxDrawdown: 'trailing',
        profitSplit: 'variable',
        platforms: ['NinjaTrader', 'Rithmic'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://bulenox.com/',
      }),
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms of Use PDF and Risk Disclosure PDF checked. Bulenox discloses Bulenox LLC with a Wilmington, Delaware address, frames the service as professional development training, states all sales are final/no refunds, and uses CFTC Rule 4.41 simulated-performance language. No broker/FCM or live-account regulatory disclosure was captured in this pass.',
    auditSourcesChecked: ['Official site', 'Terms of Use PDF', 'Risk Disclosure PDF', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. Bulenox has a concrete Delaware LLC disclosure and official PDF legal documents, but the public terms are older, the service is framed as professional development training, refund terms are absolute and no broker/FCM or regulated live-account pathway was captured.',
      entities: [
        {
          name: 'Bulenox LLC',
          jurisdiction: 'United States, Delaware',
          registeredAddress: '1201 N Orange St, Suite 7149, Wilmington, DE 19801',
          role: 'Company disclosed in website footer and Terms of Use PDF.',
        },
      ],
      regulatoryStatus: [
        'Terms of Use describe the service as professional development training.',
        'Risk Disclosure says content/data are general information only and that the purpose of the company is to select and develop talents.',
        'Risk Disclosure includes CFTC Rule 4.41 simulated-performance language.',
        'No broker, FCM, NFA/CFTC registration or direct live-account disclosure was captured for Bulenox itself in this pass.',
        'No reliable newspaper/financial-press article surfaced for the exact Bulenox futures prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Terms of Use PDF says all sales are final and no refunds shall be issued.',
        'Terms reserve the right to restrict, limit or terminate accounts for any reason at any time without prior notice.',
        'Risk Disclosure says users accept all liability and risks by engaging with programs/content.',
      ],
      redFlags: [
        'Legal PDFs are dated July 2021, so checkout rules and current program terms should be rechecked.',
        'No-refund language is absolute.',
        'Professional-development framing and simulated-performance disclaimers limit brokerage-style expectations.',
      ],
      sources: [
        { label: 'Bulenox official site', url: 'https://bulenox.com/' },
        { label: 'Bulenox Terms of Use PDF', url: 'https://bulenox.com/wa-data/public/site/data/bulenox.com/Terms_of_Use.pdf' },
        { label: 'Bulenox Risk Disclosure PDF', url: 'https://bulenox.com/wa-data/public/site/data/bulenox.com/Risk_Disclosure.pdf' },
        { label: 'Bulenox article/news search', url: 'https://www.google.com/search?q=%22Bulenox%22+futures+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Official Bulenox site', url: 'https://bulenox.com/' },
      { label: 'Bulenox Terms of Use PDF', url: 'https://bulenox.com/wa-data/public/site/data/bulenox.com/Terms_of_Use.pdf' },
      { label: 'Bulenox Risk Disclosure PDF', url: 'https://bulenox.com/wa-data/public/site/data/bulenox.com/Risk_Disclosure.pdf' },
    ],
  }),
  firm({
    id: 34,
    slug: 'fast-track-trading',
    name: 'Fast Track Trading',
    status: 'À surveiller',
    score: 60,
    founded: 2024,
    headquarters: 'United States',
    bestFor: 'futures traders researching newer business models',
    verdict: 'Watchlist only: a recent brand with speed-focused promises and too little history for a strong recommendation.',
    priceFrom: 0,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 3,
    transparencyScore: 9,
    logoDomain: 'fasttracktrading.net',
    communitySignal: 'Too recent for high confidence.',
    styles: ['Futures'],
    products: [
      product({
        id: 'fasttrack-futures',
        name: 'Fast Track Futures',
        type: 'Futures evaluation',
        description: 'Recent futures offer that needs verification before purchase.',
        accountSizeMax: 150000,
        maxDrawdown: 'variable',
        profitSplit: 'variable',
        platforms: ['To verify'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://fasttracktrading.net/',
      }),
    ],
    strengths: ['A name worth monitoring'],
    weaknesses: ['Short track record', 'Insufficient operating history', 'Not ready for priority recommendation'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited-source audit completed. Fast Track Trading is kept as a high-caution futures watchlist entry because the stored domain and exact-name searches did not provide enough readable legal material to confirm the operating entity, refund policy, simulated/live account wording or broker/FCM relationships. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage in this pass.',
    auditSourcesChecked: ['Official domain reachability', 'Likely legal URLs', 'Trustpilot search', 'Exact-name article/news search', 'Futures broker/FCM checklist'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. Fast Track Trading appears in the futures prop-firm watchlist, but current legal evidence was not sufficient to classify it alongside better-documented futures firms. Do not treat the brand as recommendation-ready until entity, terms, refund, simulation and broker/FCM disclosures are readable.',
      entities: [
        {
          name: 'Fast Track Trading',
          jurisdiction: 'To verify',
          role: 'Brand/operator to verify from official legal documents, checkout records and any broker/FCM disclosure.',
        },
      ],
      regulatoryStatus: [
        'Current legal entity not confirmed in PropRadar at this check.',
        'Broker, FCM, NFA/CFTC, simulated-account and live-capital wording not verified from readable official legal pages.',
        'No reliable newspaper/financial-press article surfaced for the exact Fast Track Trading futures prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Monitor for payout eligibility disputes, account activation rules and any changes to futures platform partners.',
        'Do not rely on social proof or discount campaigns until current legal documents are verified.',
      ],
      redFlags: [
        'Recent futures brand with insufficient readable legal evidence.',
        'Potential broker/FCM dependency not mapped.',
        'No independent press footprint found for the exact brand.',
      ],
      sources: [
        { label: 'Fast Track Trading stored domain', url: 'https://fasttracktrading.net/' },
        { label: 'Fast Track Trading article/news search', url: 'https://www.google.com/search?q=%22Fast+Track+Trading%22+futures+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Fast Track Trading stored domain', url: 'https://fasttracktrading.net/' },
      { label: 'Fast Track Trading article/news search', url: 'https://www.google.com/search?q=%22Fast+Track+Trading%22+futures+prop+firm+article+news' },
    ],
  }),
  firm({
    id: 35,
    slug: 'the-funded-trader',
    name: 'The Funded Trader',
    status: 'À surveiller',
    score: 35,
    founded: 2021,
    headquarters: 'United States',
    bestFor: 'sector-risk case study',
    verdict: 'A formerly major name with serious operational controversies; do not treat it as a recommendation without robust recent evidence.',
    priceFrom: 0,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'to recheck',
    incidents: 5,
    legalVerified: true,
    transparencyScore: 7,
    payoutProof: false,
    logoDomain: 'thefundedtraderprogram.com',
    communitySignal: 'History of public controversies and complaints.',
    reviewSignals: {
      redditScore: 18,
      redditMentions: 'highly visible negative reports involving interruptions, refunds and payouts',
      redditSignal: 'Négatif',
      redditFlags: ['Very negative community signal', 'History of operational crisis', 'Trader reports to verify before any decision'],
      trustpilotReliabilityScore: 18,
      trustpilotReliability: 'Faible',
      trustpilotNote: 'Positive reviews do not offset the operating history and community warnings.',
      trustpilotFlags: ['Positive reviews are insufficient', 'Operating history takes priority', 'Strong divergence between reviews and risk'],
      manipulationRiskScore: 92,
      manipulationRisk: 'Élevé',
      payoutRiskScore: 94,
      payoutRisk: 'Critique',
      payoutIncidentCount: 5,
      payoutIncidentStatus: 'Critique',
      payoutIssues: [
        'Public history of serious operational controversies.',
        'High risk of divergence between marketing, reviews and actual trader experience.',
        'Exclude from recommendations until recent, robust evidence is established.',
      ],
      confidenceDrivers: ['Historically well-known name', 'Trust signals remain insufficient', 'No active recommendation'],
      radarVerdict: 'Critical alert: brand visibility does not offset operational problems and payout warnings.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [],
    strengths: ['Historically well-known name'],
    weaknesses: ['High operational risk', 'Controversial history', 'Exclude from strong recommendations'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official homepage, Terms of Use and Refund Policy checked. The current site identifies The Funded Trader LLC, describes evaluation accounts as demo accounts only, says funded accounts are fully simulated accounts using market quotes from liquidity providers, and frames rewards around virtual profits/trading data usefulness. The legal file is therefore identifiable, but the operational-risk score remains critical because of the brand history, complaints, payout sensitivity, arbitration/class-waiver clauses and strict no-refund/chargeback-ban policy. Exact-name news searches did not surface a reliable mainstream article specifically documenting the TFT controversy in this pass; a broader Business Insider industry article is useful only as sector context, not as a TFT-specific allegation.',
    auditSourcesChecked: ['Official homepage', 'Terms of Use', 'Refund Policy', 'FAQ/help links', 'Exact-name article/news search', 'Broader prop-trading press context'],
    regulatoryAudit: {
      riskLevel: 'Critical',
      lastChecked: '2026-07-08',
      summary:
        'Critical operational risk with partially verified legal text. The Funded Trader currently discloses a simulated-evaluation model and The Funded Trader LLC in its Terms of Use. The risk is not lack of a current website; it is the combination of past public controversy, very weak confidence signals, simulated account economics, strict refund terms, broad prohibited-strategy discretion and individual arbitration/class-action waiver language.',
      entities: [
        {
          name: 'The Funded Trader LLC',
          jurisdiction: 'United States',
          role: 'Company named in current Terms of Use and footer disclaimers for The Funded Trader website/services.',
        },
      ],
      regulatoryStatus: [
        'Homepage says the service provides access to a simulated trading environment monitored by proprietary technology.',
        'Terms of Use say evaluation accounts are demo accounts only and are not live actual trading.',
        'FAQ says funded accounts are fully simulated accounts with real market quotes from liquidity providers.',
        'FAQ says trading data is collected with the intention of monetizing it and traders are remunerated based on virtual profits when data proves useful.',
        'Footer says content is general information only and not investment advice, solicitation or a recommendation.',
        'No reliable newspaper/financial-press article surfaced for the exact TFT controversy in this pass; keep exact-news search open for follow-up.',
      ],
      complaintsAndDisputes: [
        'Refund Policy says no refund is given once platform login details are emailed.',
        'Refund Policy says improper chargebacks or payment disputes can lead to a permanent platform ban.',
        'Terms include JAMS arbitration, Florida law, New York small-claims venue wording, coordinated-claim procedures and class-action waiver language.',
        'Terms reserve sole discretion to determine prohibited practices and can terminate accounts, forfeit remuneration and pursue legal action for violations.',
      ],
      redFlags: [
        'Critical historical community/payout-risk profile despite current active website.',
        'Fully simulated funded accounts should not be treated as brokerage accounts or deposited capital.',
        'Strict refund, chargeback and arbitration language reduces user leverage in disputes.',
        'Strong fantasy/kingdom marketing may distract from the legal mechanics.',
      ],
      sources: [
        { label: 'The Funded Trader official site', url: 'https://thefundedtraderprogram.com/' },
        { label: 'The Funded Trader Terms of Use', url: 'https://www.thefundedtraderprogram.com/terms-of-use/index.html' },
        { label: 'The Funded Trader Refund Policy', url: 'https://www.thefundedtraderprogram.com/refund-policy/index.html' },
        { label: 'The Funded Trader article/news search', url: 'https://www.google.com/search?q=%22The+Funded+Trader%22+prop+firm+shutdown+payout+article' },
        { label: 'Business Insider prop trading industry overview', url: 'https://www.businessinsider.com/what-is-prop-trading-pass-challenge-gen-z-millennial-traders-2025-12' },
      ],
    },
    sources: [
      { label: 'The Funded Trader official site', url: 'https://thefundedtraderprogram.com/' },
      { label: 'The Funded Trader Terms of Use', url: 'https://www.thefundedtraderprogram.com/terms-of-use/index.html' },
      { label: 'The Funded Trader Refund Policy', url: 'https://www.thefundedtraderprogram.com/refund-policy/index.html' },
    ],
  }),
  firm({
    id: 36,
    slug: 'myfundedfx',
    name: 'MyFundedFX / Seacrest Markets',
    status: 'Fermée',
    score: 5,
    founded: 2022,
    headquarters: 'United States / South Africa',
    bestFor: 'closure case study to avoid',
    verdict: 'The domain redirects to a notice stating that Seacrest Markets no longer operates; no purchase is recommended.',
    priceFrom: 0,
    profitSplit: 0,
    drawdownType: 'Hybride',
    newsTrading: 'Not recommended',
    eaAllowed: 'No',
    payoutDelay: 'not applicable',
    incidents: 6,
    legalVerified: true,
    transparencyScore: 3,
    payoutProof: false,
    logoDomain: 'myfundedfx.com',
    communitySignal: 'Closed status confirmed by a public message on the redirected domain.',
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official domain redirect checked. MyFundedFX now redirects to a Seacrest Markets closure page stating that Seacrest Markets is no longer operating. The page names Seacrest Markets (PTY) Ltd, South Africa registration 2023 / 703336 / 07, registered address in Umhlanga/Durban and FSCA FSP License Number 53315. This profile remains a closed/prevention archive, not a buying option. Exact-name article/news searches did not surface reliable mainstream financial press in this pass.',
    auditSourcesChecked: ['Official redirected closure page', 'Entity/footer disclosure', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Critical',
      lastChecked: '2026-07-08',
      summary:
        'Critical because the service is closed. The useful legal fact is the current closure proof: the MyFundedFX domain redirects to Seacrest Markets, which publicly states it no longer operates and names a South African company/FSP disclosure. Historical ratings or old comparisons should not be used as purchase signals.',
      entities: [
        {
          name: 'Seacrest Markets (PTY) Ltd',
          jurisdiction: 'South Africa',
          registrationNumber: '2023 / 703336 / 07; FSP License Number 53315',
          registeredAddress: '2 Ocean Way, Umhlanga, Durban, Kwa-Zulu Natal 4320, South Africa',
          role: 'Entity disclosed on the redirected closure page currently reached from myfundedfx.com.',
        },
      ],
      regulatoryStatus: [
        'Closure page states Seacrest Markets is no longer operating.',
        'Closure page says Seacrest Markets (PTY) Ltd is authorised and regulated by the FSCA of South Africa with FSP License Number 53315.',
        'The page includes CFD risk warnings and restricted-jurisdiction language, but no active prop-firm product should be inferred from it.',
        'No reliable newspaper/financial-press article surfaced for the exact MyFundedFX / Seacrest Markets prop-firm closure in this pass.',
      ],
      complaintsAndDisputes: [
        'Users should contact the support email shown on the closure page rather than buy or renew any challenge.',
        'Any third-party page still selling, promoting or ranking MyFundedFX should be treated as stale until proven otherwise.',
      ],
      redFlags: [
        'Operational closure is confirmed by the current domain destination.',
        'Historical reviews are obsolete for buying decisions.',
        'Do not send payment to any clone or resold domain claiming continuity.',
      ],
      sources: [
        { label: 'MyFundedFX / Seacrest Markets closure page', url: 'https://myfundedfx.com/' },
        { label: 'MyFundedFX article/news search', url: 'https://www.google.com/search?q=%22MyFundedFX%22+Seacrest+Markets+prop+firm+news' },
      ],
    },
    sources: [
      { label: 'MyFundedFX / Seacrest Markets closure page', url: 'https://myfundedfx.com/' },
      { label: 'MyFundedFX article/news search', url: 'https://www.google.com/search?q=%22MyFundedFX%22+Seacrest+Markets+prop+firm+news' },
    ],
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
    legalVerified: true,
    transparencyScore: 4,
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Current MyForexFunds domain, Terms of Use and official CFTC follow-up link reviewed. The current website is informational/news-oriented, not a normal active checkout flow, and says the site is not an offer, solicitation, promotion or advice. It also states MyForexFunds is not registered, licensed or qualified with any securities regulatory authority and excludes several jurisdictions including Canada. PropRadar keeps the profile as a sector-risk archive because the brand was subject to major public regulatory action and the current site itself frames access as informational only.',
    auditSourcesChecked: ['Current official site', 'Current Terms of Use', 'CFTC enforcement follow-up URL', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Critical',
      lastChecked: '2026-07-08',
      summary:
        'Critical historical/regulatory risk. My Forex Funds is useful as a prevention case study: the current site is informational and references legal-process updates, while the brand remains tied to public regulatory action and shutdown history. Even if the company publishes favorable litigation updates, users should not treat the brand as a normal active buying option unless current official product terms, jurisdiction availability, regulator status and payout mechanics are independently confirmed.',
      entities: [
        {
          name: 'MyForexFunds / Traders Global Group',
          jurisdiction: 'Canada / United States dispute context',
          role: 'Brand and operating group associated with the public regulatory-action history; exact current contracting entity must be rechecked before any future product launch.',
        },
      ],
      regulatoryStatus: [
        'Current Terms of Use say the website is provided solely for general informational purposes and does not create client, advisory, employee or fiduciary relationships.',
        'Current Terms say MyForexFunds is not registered, licensed or qualified with any securities regulatory authority.',
        'Current Terms say proprietary trading programs described on the website may not be subject to regulatory oversight, registration or investor-protection regimes in the user jurisdiction.',
        'The current site excludes Canada and several other jurisdictions from access/use.',
        'CFTC official material should be rechecked directly because the CFTC site returned server errors in this environment during this pass.',
      ],
      complaintsAndDisputes: [
        'Historical shutdown/regulatory-action risk overrides old review scores and old payout testimonials.',
        'The current site claims favorable legal-process milestones; PropRadar records those as company statements unless independently matched to court/regulator documents.',
        'Do not buy from or pay any third-party flow claiming a MyForexFunds relaunch until the current legal entity, product terms and payout rules are verified.',
      ],
      redFlags: [
        'Major historical regulator-action case study.',
        'Current site says it is informational and not a regulated/securities-authorized offer.',
        'Brand-name recognition can mislead traders into relying on stale reviews.',
      ],
      sources: [
        { label: 'Current MyForexFunds site', url: 'https://myforexfunds.com/' },
        { label: 'MyForexFunds Terms of Use', url: 'https://myforexfunds.com/terms-of-use/' },
        { label: 'CFTC My Forex Funds enforcement follow-up URL', url: 'https://www.cftc.gov/PressRoom/PressReleases/8771-23' },
        { label: 'My Forex Funds article/news search', url: 'https://www.google.com/search?q=%22My+Forex+Funds%22+CFTC+Traders+Global+Group+news' },
      ],
    },
    sources: [
      { label: 'Current MyForexFunds site', url: 'https://myforexfunds.com/' },
      { label: 'MyForexFunds Terms of Use', url: 'https://myforexfunds.com/terms-of-use/' },
      { label: 'CFTC My Forex Funds enforcement follow-up URL', url: 'https://www.cftc.gov/PressRoom/PressReleases/8771-23' },
    ],
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Current-domain check completed. The former surgetrader.com domain redirects to an Afternic/GoDaddy parked-domain sale page, not an active prop-firm website. No current official legal terms, operating entity, refund policy or payout route was available from the domain. Exact-name article/news searches did not surface reliable mainstream financial press in this pass. Keep SurgeTrader as a closed/stale-domain prevention archive.',
    auditSourcesChecked: ['Current domain', 'Afternic parked-domain page', 'Trustpilot search', 'Exact-name article/news search', 'Stale-domain classification'],
    regulatoryAudit: {
      riskLevel: 'Critical',
      lastChecked: '2026-07-08',
      summary:
        'Critical because the former official domain is not an active service. The domain being parked for sale means any old ranking, Trustpilot history or comparison-page listing is not enough for a purchase decision. Users should treat active offers using the name as potential clones or unrelated relaunches until a controlled legal entity and current terms are verified.',
      entities: [
        {
          name: 'SurgeTrader',
          jurisdiction: 'To verify historically',
          role: 'Former prop-firm brand; current domain does not provide active legal/operator documents.',
        },
      ],
      regulatoryStatus: [
        'Former official domain currently points to an Afternic parked-domain sale page.',
        'No current operator, legal entity, refund policy, simulated/live-account wording or regulator status was captured from the domain.',
        'No reliable newspaper/financial-press article surfaced for the exact SurgeTrader closure/current-domain status in this pass.',
      ],
      complaintsAndDisputes: [
        'Any active checkout or support flow claiming to be SurgeTrader should be treated as unverified until ownership and legal terms are checked.',
        'Historical review ratings are obsolete because the official domain is not serving an active prop-firm product.',
      ],
      redFlags: [
        'Former official domain is parked and for sale.',
        'No current terms or operating entity visible from the domain.',
        'High clone/relaunch confusion risk around old brand recognition.',
      ],
      sources: [
        { label: 'Former SurgeTrader domain / Afternic parked page', url: 'https://surgetrader.com/' },
        { label: 'SurgeTrader article/news search', url: 'https://www.google.com/search?q=%22SurgeTrader%22+prop+firm+closure+news' },
      ],
    },
    sources: [
      { label: 'Former SurgeTrader domain / Afternic parked page', url: 'https://surgetrader.com/' },
      { label: 'SurgeTrader article/news search', url: 'https://www.google.com/search?q=%22SurgeTrader%22+prop+firm+closure+news' },
    ],
  }),
  firm({
    id: 39,
    slug: 'true-forex-funds',
    name: 'True Forex Funds',
    status: 'Fermée',
    score: 7,
    founded: 2021,
    headquarters: 'Hongrie',
    bestFor: 'closure case study to avoid',
    verdict: 'Historic sector name that should no longer be treated as a current buying option.',
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Current official domain checked. TrueForexFunds.com displays an official closure message stating that True Forex Funds has ceased all operations and is closing permanently due to financial insolvency. No active checkout, current terms, refund route or operating entity details were captured on the closure page. PropRadar keeps this profile as a closed prevention archive.',
    auditSourcesChecked: ['Current official closure page', 'Trustpilot search', 'Exact-name article/news search', 'Closed-risk classification'],
    regulatoryAudit: {
      riskLevel: 'Critical',
      lastChecked: '2026-07-08',
      summary:
        'Critical because the current official domain states the firm has ceased all operations and is closing permanently due to financial insolvency. Historical reviews, comparison listings or old payout claims are irrelevant for buying decisions.',
      entities: [
        {
          name: 'True Forex Funds',
          jurisdiction: 'Hungary / To verify historically',
          role: 'Former prop-firm brand; current closure page does not provide a full current legal entity map.',
        },
      ],
      regulatoryStatus: [
        'Current official domain states that True Forex Funds has ceased all operations.',
        'Closure page states permanent closing due to financial insolvency.',
        'No current active product, checkout terms or payout route was captured from the official domain.',
        'Exact-name article/news search should remain open, but the official closure page is sufficient to block any recommendation.',
      ],
      complaintsAndDisputes: [
        'Any third-party ranking or promotion still presenting True Forex Funds as buyable should be treated as stale.',
        'Users should not send funds or buy challenges through clones, resold domains or unofficial relaunch claims.',
      ],
      redFlags: [
        'Official closure and insolvency message.',
        'No active product to recommend.',
        'High stale-review and clone-confusion risk.',
      ],
      sources: [
        { label: 'True Forex Funds official closure page', url: 'https://trueforexfunds.com/' },
        { label: 'True Forex Funds article/news search', url: 'https://www.google.com/search?q=%22True+Forex+Funds%22+official+closure+financial+insolvency' },
      ],
    },
    sources: [
      { label: 'True Forex Funds official closure page', url: 'https://trueforexfunds.com/' },
      { label: 'True Forex Funds article/news search', url: 'https://www.google.com/search?q=%22True+Forex+Funds%22+official+closure+financial+insolvency' },
    ],
  }),
  firm({
    id: 40,
    slug: 'fidelcrest',
    name: 'Fidelcrest',
    status: 'À surveiller',
    score: 52,
    founded: 2018,
    headquarters: 'Cyprus',
    bestFor: 'historical prop-firm name that needs current-rule verification',
    verdict: 'The domain is active again with a Cyprus entity and detailed simulated-trading terms, but the historical risk profile keeps Fidelcrest in watchlist rather than recommendations.',
    priceFrom: 999,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: '11 trading days advertised for first profit split on some programs',
    incidents: 4,
    legalVerified: true,
    transparencyScore: 9,
    payoutProof: false,
    logoDomain: 'fidelcrest.com',
    communitySignal: 'Known historical brand with an active current domain, but current trust needs fresh verification.',
    products: [],
    strengths: ['Active current domain', 'Cyprus company disclosed', 'Detailed simulated-trading terms available'],
    weaknesses: ['Historical risk profile', 'No strong recommendation until current payout evidence is refreshed', 'Strict no-refund and prohibited-practice discretion'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Current official site and General Terms checked. Fidelcrest.com is active and discloses Fidelcrest Ltd, Cyprus, company number HE413263, with registered office in Nicosia. The terms say services are tools for simulated forex/financial-market trading, demo funds are fictitious, trading through services is not real, and services are not investment advice or recommendations. The profile was previously treated as closed in PropRadar; it is now corrected to watchlist because the domain is active, but the historical risk profile and need for fresh payout evidence prevent a strong recommendation.',
    auditSourcesChecked: ['Official active site', 'General Terms and Conditions', 'Refund/cancellation clauses', 'Trustpilot link', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal and operational risk. Fidelcrest has a concrete Cyprus entity and detailed terms, which improves traceability. The product remains simulated: users trade demo/fictitious funds and the provider disclaims investment advice/recommendations. Risk stays elevated because the brand has a history in PropRadar, purchases are generally non-refundable, chargeback disputes can stop future service, and prohibited-practice decisions are discretionary.',
      entities: [
        {
          name: 'Fidelcrest Ltd',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE413263',
          registeredAddress: 'Arch. Makariou III & 1-7 Evagorou, MITSI 3, 1st floor, office 102 C, 1065 Nicosia, Cyprus',
          role: 'Provider named in current General Terms and Conditions and footer.',
        },
      ],
      regulatoryStatus: [
        'Terms say services provide tools for simulated foreign exchange trading and other simulated financial-market trading.',
        'Terms say trading performed through the services is not real and demo funds are fictitious.',
        'Terms say none of the services are investment services, investment advice or recommendations.',
        'Homepage says users may be recommended to a third-party proprietary firm after challenge and verification.',
        'Exact-name article/news search did not surface reliable mainstream financial-press coverage in this pass.',
      ],
      complaintsAndDisputes: [
        'Terms say the customer is not entitled to a refund if they cancel, fail to complete the challenge/verification or violate the GTC.',
        'Unjustified chargeback or payment disputes can lead the provider to stop current services and refuse future services.',
        'The provider reserves discretion over forbidden trading practices and can cancel services without compensation for violations.',
      ],
      redFlags: [
        'Historical PropRadar risk profile remains relevant despite current active site.',
        'No broker-style client-fund protection should be inferred from simulated/demotrading terms.',
        'Price and program terms must be rechecked at checkout because the homepage displays several program variants.',
      ],
      sources: [
        { label: 'Fidelcrest official site', url: 'https://fidelcrest.com/' },
        { label: 'Fidelcrest General Terms and Conditions', url: 'https://fidelcrest.com/general-terms-and-conditions' },
        { label: 'Fidelcrest article/news search', url: 'https://www.google.com/search?q=%22Fidelcrest%22+prop+firm+article+news' },
      ],
    },
    sources: [
      { label: 'Fidelcrest official site', url: 'https://fidelcrest.com/' },
      { label: 'Fidelcrest General Terms and Conditions', url: 'https://fidelcrest.com/general-terms-and-conditions' },
      { label: 'Fidelcrest article/news search', url: 'https://www.google.com/search?q=%22Fidelcrest%22+prop+firm+article+news' },
    ],
  }),
];

const universePropFirms: PropFirm[] = [
  universeFirm({
    id: 41,
    slug: 'funding-traders',
    name: 'Funding Traders',
    website: 'https://fundingtraders.com/',
    status: 'Active',
    score: 70,
    founded: 2023,
    headquarters: 'United States / Panama',
    priceFrom: 39,
    payoutProof: true,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. Funding Traders discloses Funding Traders LLC in New Mexico and Funding Traders Corp in Panama, with a Delaware-linked public mailing address. The terms state that the site and services are not investment advice, brokerage, trading or other regulated financial services. PropRadar keeps the legal file at medium risk because the structure mixes US and Panama entities and the prop service remains simulation/rules-based rather than broker-protected.',
    auditSourcesChecked: ['Official site', 'Terms and conditions', 'Official FAQ/rules', 'Trustpilot to monitor'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. Funding Traders is more transparent than many small challenge firms because its terms name Funding Traders LLC, a New Mexico LLC, and Funding Traders Corp, a Panama corporation. The same terms state that the content and services are not investment advice, brokerage services, trading services or other regulated financial services. That disclosure is useful, but it also confirms that the user should not treat the product like a regulated brokerage account or protected investment service.',
      entities: [
        {
          name: 'Funding Traders LLC',
          jurisdiction: 'United States, New Mexico',
          registeredAddress: '8 The Green, Suite R, Dover, Delaware 19901',
          role: 'US company entity disclosed in Funding Traders terms.',
        },
        {
          name: 'Funding Traders Corp',
          jurisdiction: 'Panama',
          registeredAddress: 'Obarrio, Calle 60 Este, PH Downtown 60, Panama City, Panama',
          role: 'Panama corporation disclosed in Funding Traders terms.',
        },
      ],
      regulatoryStatus: [
        'Terms state that the site and services are not investment advice, brokerage services, trading services or other regulated financial services.',
        'No SEC, CFTC, NFA, FCA or EU investment-services authorization is documented in PropRadar for the prop-firm product.',
        'Users should verify which entity contracts with them at checkout and whether local jurisdiction restrictions apply.',
      ],
      complaintsAndDisputes: [
        'Public disputes should be classified around rule interpretation, account review, payout eligibility and support response.',
        'No major public regulator enforcement action is documented in PropRadar at this check.',
        'Trustpilot and community feedback should be checked for recent payout proof before treating the firm as mature.',
      ],
      redFlags: [
        'US plus Panama structure requires checking the exact contracting entity.',
        'Terms expressly disclaim regulated financial-service status.',
        'Prop-firm payouts remain rule-based and discretionary compared with standard broker withdrawals.',
      ],
      sources: [
        { label: 'Official Funding Traders site', url: 'https://fundingtraders.com/' },
        { label: 'Funding Traders terms and conditions', url: 'https://fundingtraders.com/terms-and-conditions' },
        { label: 'Funding Traders FAQ', url: 'https://fundingtraders.com/faqs' },
        { label: 'Trustpilot Funding Traders', url: 'https://www.trustpilot.com/review/fundingtraders.com' },
      ],
    },
  }),
  universeFirm({
    id: 42,
    slug: 'breakout-prop',
    name: 'Breakout Prop',
    website: 'https://breakoutprop.com/',
    status: 'Active',
    score: 70,
    founded: 2023,
    headquarters: 'United States / Payward Oceanic structure',
    market: 'Crypto',
    priceFrom: 20,
    profitSplit: 90,
    payoutProof: true,
    styles: ['Crypto', 'Proprietary trading', 'No deposits', 'USDC payouts'],
    productName: 'Breakout Crypto Evaluations',
    productDescription:
      'Crypto prop-trading evaluations with 1-step and 2-step tests, up to $200k account size, on-demand USDC payouts and trade-idea routing through a Payward Oceanic Ltd funded-trader structure.',
    accountSizeMin: 5000,
    accountSizeMax: 200000,
    profitTarget: 'Program-specific; 1-step tests can pass in one trade if target and drawdown are respected',
    maxDailyLoss: 'Program-specific',
    maxDrawdown: 'Program-specific',
    platforms: ['Breakout dashboard', 'TradingView charts', 'Exchange liquidity via disclosed program structure'],
    tradableAssets: ['BTC', 'ETH', 'Altcoins', 'Crypto pairs'],
    minTradingDays: 'No minimum or maximum time limits advertised on homepage',
    consistencyRule: 'Homepage advertises no consistency rules, profit caps or style limits; program rules and evaluation agreement still control.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms and Refund Policy checked. Breakout discloses Breakout Trading Group, LLC, a Delaware LLC, as website/service operator. Footer disclosures say funded traders are linked to Payward Oceanic Ltd. (POL); market-facing transactions, if any, are carried out by POL for its own principal account and funded traders have no ownership or beneficial interest in POL accounts, assets or trades. Fees are non-refundable once trading begins unless separate rules say otherwise.',
    auditSourcesChecked: ['Official site', 'Terms of Use', 'Refund Policy', 'FAQ link', 'Trustpilot link'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. Breakout is more explicit than many crypto prop firms about conflicts, no-deposit positioning and the Payward Oceanic Ltd funded-trader structure, but it is still a crypto-only program with non-refundable fees, discretionary routing/internal-book treatment and potential conflicts between failed-evaluation revenue and trader outcomes.',
      entities: [
        {
          name: 'Breakout Trading Group, LLC',
          jurisdiction: 'Delaware, United States',
          role: 'Website and service operator disclosed in the Terms of Use and footer.',
        },
        {
          name: 'Payward Oceanic Ltd. (POL)',
          jurisdiction: 'To verify',
          role: 'Entity disclosed in the funded-trader program disclosure as carrying out market-facing transactions, if any, for its own principal account.',
        },
      ],
      regulatoryStatus: [
        'Terms say the website is made available by Breakout Trading Group, LLC, dba Breakout.',
        'Homepage says traders do not need to deposit their own capital; the only cost is the evaluation fee.',
        'Footer says funded traders do not own any POL account or position and have no beneficial/proprietary interest in POL accounts, assets or trades.',
        'Footer says POL may either record trade ideas as internal administrative book entries or route transactions to a market maker/exchange at POL discretion.',
      ],
      complaintsAndDisputes: [
        'Refund policy says payments are non-refundable unless the Evaluation Agreement or Program Rules provide otherwise.',
        'Terms reserve broad suspension/termination rights and include chargeback-fraud language.',
        'Footer explicitly acknowledges possible conflicts of interest from repeated failed evaluations and POL incentives.',
      ],
      redFlags: [
        'Crypto-only program with USDC payout rails and exchange/liquidity dependencies.',
        'Payward Oceanic Ltd. role and jurisdiction should be reconciled before purchase.',
        'Non-refundable fees once trading begins.',
        'Internal book-entry vs market-routed treatment can create user expectations issues.',
      ],
      sources: [
        { label: 'Breakout Prop official site', url: 'https://www.breakoutprop.com/' },
        { label: 'Breakout Prop Terms of Use', url: 'https://www.breakoutprop.com/terms-of-use/' },
        { label: 'Breakout Prop Refund Policy', url: 'https://www.breakoutprop.com/refund-policy/' },
        { label: 'Breakout Prop Trustpilot', url: 'https://www.trustpilot.com/review/breakoutprop.com' },
      ],
    },
  }),
  universeFirm({
    id: 43,
    slug: 'hantec-trader',
    name: 'Hantec Trader',
    website: 'https://hantectrader.com/',
    status: 'Active',
    score: 73,
    founded: 2023,
    headquarters: 'Mauritius / Hantec Group',
    priceFrom: 49,
    payoutProof: true,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Hantec Trader site checked. The site states that Hantec Trader Limited is incorporated in Mauritius, uses simulated accounts with virtual funds, does not carry out regulated activities, is not FCA-regulated, is not a broker and does not accept deposits. The profile benefits from the Hantec group brand, but the prop-trading product itself remains outside normal broker protections.',
    auditSourcesChecked: ['Official site', 'Official footer/legal disclaimer', 'Program rules/help center', 'Trustpilot to monitor'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-07',
      summary:
        'Medium regulatory risk. Hantec Trader is powered by Hantec Markets Mauritius and connected to the broader Hantec group, but the prop-firm service is disclosed as Hantec Trader Limited, a Mauritius private company offering simulated accounts with virtual funds. The official disclaimer says Hantec Trader does not conduct regulated activities, is not FCA-regulated, is not a broker and does not accept deposits. The brand halo is stronger than many small prop firms, but users should not assume broker-level regulatory protection.',
      entities: [
        {
          name: 'Hantec Trader Limited',
          jurisdiction: 'Mauritius',
          registrationNumber: 'C191400',
          registeredAddress: 'Suite 201, The Catalyst, Silicon Avenue, 40 Cybercity, Ebene, Mauritius',
          role:
            'Prop-trading entity disclosed in the official footer for Hantec Trader services and simulated accounts.',
        },
        {
          name: 'HM Provider Limited',
          jurisdiction: 'United Kingdom',
          registrationNumber: '14429485',
          registeredAddress: '12 Kinghorn Street, London, EC1A 7HT',
          role:
            'Affiliate disclosed as providing support services associated with transactions for products and services on the Hantec Trader website.',
        },
      ],
      regulatoryStatus: [
        'Official disclaimer states that Hantec Trader operates as a proprietary trading firm offering simulated trading environments with virtual funds.',
        'Hantec Trader says it does not conduct regulated activities, does not act as a broker and does not accept deposits.',
        'The footer states Hantec Trader is not regulated by the FCA and that Hantec Trader Limited (MU) and Hantec Markets Limited are separate entities.',
        'Instant programs are restricted for residents of the UK, Mauritius, Hong Kong and Singapore; Hantec Trader also excludes U.S. residents/citizens and other restricted jurisdictions.',
      ],
      complaintsAndDisputes: [
        'The prop product is newer than the wider Hantec broker group and should be judged separately from regulated broker entities.',
        'No major public regulator enforcement action is documented in PropRadar for Hantec Trader at this check.',
        'Disputes should be classified around simulated account rules, consistency, payout/reward requests and jurisdiction eligibility.',
      ],
      redFlags: [
        'Brand association with Hantec Markets Mauritius should not be confused with direct FCA protection for Hantec Trader users.',
        'All trading is simulated and does not provide direct access to company capital.',
        'No financial ombudsman or compensation-scheme protection is available for the prop-firm service according to the official disclaimer.',
        'Jurisdiction exclusions and instant-program restrictions must be checked before purchase.',
      ],
      sources: [
        { label: 'Official Hantec Trader site', url: 'https://hantectrader.com/' },
        { label: 'Hantec Trader rules/help center', url: 'https://help.htrader.hmarkets.com/' },
        { label: 'Hantec Markets Mauritius', url: 'https://hmarkets.com/' },
        { label: 'Trustpilot Hantec Trader', url: 'https://www.trustpilot.com/review/hantectrader.com' },
      ],
    },
  }),
  universeFirm({
    id: 44,
    slug: 'rebelsfunding',
    name: 'RebelsFunding',
    website: 'https://www.rebelsfunding.com/',
    status: 'À surveiller',
    score: 63,
    founded: 2023,
    headquarters: 'Slovakia',
    priceFrom: 25,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. RebelsFunding discloses RIFM, s.r.o. in Bratislava as website owner/operator and repeatedly frames the product as simulated training with fictitious or simulated capital. The footer also references FRCSM, s.r.o. for real-market trades executed on behalf of the company, while RCF funded accounts are described as fully simulated training accounts.',
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-08',
      summary:
        'Low-to-medium regulatory risk. RebelsFunding gives clearer EU corporate disclosure than many small firms through RIFM, s.r.o. in Slovakia and explicit simulated-training language. The key limitation is that the user-facing product is not a live brokerage account: funded accounts are described as simulated training accounts, and the user should not treat rewards as ordinary broker withdrawals or client-money rights.',
      entities: [
        {
          name: 'RIFM, s.r.o.',
          jurisdiction: 'Slovakia',
          registeredAddress: 'Landererova 8, Bratislava - Staré Mesto 811 09, Slovak Republic',
          role: 'Website operator/owner disclosed in RebelsFunding legal footer.',
        },
        {
          name: 'FRCSM, s.r.o.',
          jurisdiction: 'Slovakia',
          role: 'Entity referenced for trades executed on behalf of the company in the real market environment.',
        },
      ],
      regulatoryStatus: [
        'Terms say services provide training and evaluation tools for simulated trading with financial instruments.',
        'Official disclaimer says RCF funded accounts are not live trading accounts and are fully simulated training accounts.',
        'Terms say the provider gives simulated accounts with fictitious capital and the customer cannot incur real losses on those accounts.',
      ],
      complaintsAndDisputes: [
        'Classify future complaints between simulated-account rule disputes, reward approvals and real-market-company execution claims.',
        'No major public regulator warning is documented in PropRadar at this check.',
      ],
      redFlags: [
        'Simulated training accounts should not be marketed to users as normal brokerage capital.',
        'The RIFM / FRCSM split should be rechecked in the current terms before purchase.',
      ],
      sources: [
        { label: 'RebelsFunding official site', url: 'https://www.rebelsfunding.com/' },
        { label: 'RebelsFunding Terms and Conditions', url: 'https://www.rebelsfunding.com/terms-and-conditions/' },
        { label: 'RebelsFunding Trustpilot', url: 'https://www.trustpilot.com/review/rebelsfunding.com' },
      ],
    },
  }),
  universeFirm({
    id: 45,
    slug: 'sabiotrade',
    name: 'SabioTrade',
    website: 'https://sabiotrade.com/',
    status: 'À surveiller',
    score: 64,
    founded: 2023,
    headquarters: 'Ireland',
    priceFrom: 50,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. SabioTrade contracts through CODEVIL IT ENGINEERING LIMITED, company number 680139, in Dublin, Ireland. The terms state that services are an educational and training platform, all trading activity is strictly simulated virtual trading, no real trades or financial instruments are involved, and no investment, advisory or brokerage services are provided.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. SabioTrade provides a concrete Irish company, address and governing law, which improves traceability. The legal terms also clarify that the product is educational/simulated, purchases are non-refundable, and the company does not provide investment opportunities, advisory or brokerage services. Risk stays medium because the terms reserve broad discretion over prohibited strategies, payout requests, profit-split adjustments and account termination.',
      entities: [
        {
          name: 'CODEVIL IT ENGINEERING LIMITED',
          jurisdiction: 'Ireland',
          registrationNumber: '680139',
          registeredAddress: '2c, Grangegorman Lower, Smithfield, Dublin, Ireland, D07a433',
          role: 'Company doing business as SabioTrade in the official terms.',
        },
      ],
      regulatoryStatus: [
        'Terms say all trading activities are simulated virtual trading scenarios and no real trades, securities or financial instruments are involved.',
        'Terms say SabioTrade does not provide investment opportunities, advisory or brokerage services.',
        'Irish governing law and Irish courts are specified in the terms.',
      ],
      complaintsAndDisputes: [
        'Terms say there are no refunds on services purchased from the company.',
        'Terms reserve discretion to decline payout requests if trading is considered inconsistent with sustainable risk management.',
        'Profit split can be revised after risk or compliance flags according to the official terms.',
      ],
      redFlags: [
        'Non-refundable purchase language is strict.',
        'Broad prohibited-strategy and payout-review discretion should be read before checkout.',
        'Educational/simulated framing limits broker-style protection expectations.',
      ],
      sources: [
        { label: 'SabioTrade official site', url: 'https://sabiotrade.com/' },
        { label: 'SabioTrade Terms and Conditions', url: 'https://sabiotrade.com/terms' },
        { label: 'SabioTrade Trustpilot', url: 'https://www.trustpilot.com/review/sabiotrade.com' },
      ],
    },
  }),
  universeFirm({
    id: 46,
    slug: 'dna-funded',
    name: 'DNA Funded',
    website: 'https://dnafunded.com/',
    status: 'À surveiller',
    score: 44,
    founded: 2024,
    priceFrom: 49,
    incidents: 4,
    additionalSources: [
      { label: 'DNA Funded article/news search', url: 'https://www.google.com/search?q=%22DNA+Funded%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official homepage and likely legal URLs reached only a verification/loader screen during the July 8, 2026 PropRadar pass. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Legal entity, terms, refund clauses and simulated-account disclosures could not be confirmed from primary pages in this environment. Keep DNA Funded in watchlist until official legal pages and regulator/public-warning checks are captured manually.',
    auditSourcesChecked: ['Official domain reachability', 'Likely legal URLs', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official site was not accessible enough for a primary-source legal audit in the current environment. Do not treat the firm as legally verified until the contracting entity, jurisdiction, terms, refund policy, simulated-account language and regulator status are documented.',
      entities: [
        {
          name: 'DNA Funded',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official terms, footer and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Regulator status and warning-list checks must be repeated before any recommendation.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Payout disputes and refund complaints need manual classification once sources are accessible.',
      ],
      redFlags: [
        'Homepage and likely legal URLs returned only a verification/loader screen.',
        'No contracting entity should be inferred from marketing or third-party listings alone.',
      ],
      sources: [
        { label: 'DNA Funded official site', url: 'https://dnafunded.com/' },
        { label: 'DNA Funded terms URL to recheck manually', url: 'https://dnafunded.com/terms-and-conditions/' },
        { label: 'DNA Funded refund URL to recheck manually', url: 'https://dnafunded.com/refund-policy/' },
        { label: 'DNA Funded Trustpilot', url: 'https://www.trustpilot.com/review/dnafunded.com' },
        { label: 'DNA Funded article/news search', url: 'https://www.google.com/search?q=%22DNA+Funded%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 47,
    slug: 'hola-prime',
    name: 'Hola Prime',
    website: 'https://holaprime.com/',
    status: 'À surveiller',
    score: 64,
    founded: 2024,
    headquarters: 'Hong Kong / Mauritius / Cyprus',
    priceFrom: 48,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and risk disclosure checked. Hola Prime says simulated trading operations are managed by Hola Prime Limited in Hong Kong, while MT4/MT5 access is linked to a Mauritius investment dealer entity and DXTrade/cTrader/MatchTrader access is linked to Gooey Trade / GT Tech LLC. The footer is explicit that Hola Prime provides simulated trading and educational tools, does not act as a broker, does not accept deposits and makes no promise of rewards or returns.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. Hola Prime has more visible legal disclosure than many 2024 prop firms because its footer separates simulated trading operations, a Mauritius-regulated MT4/MT5 entity and platform infrastructure providers. The main risk is interpretation: Mauritius broker authorization for one connected entity should not be treated as full broker protection for the simulated prop-firm account. The official disclosure says the product is educational/simulated, not a deposit-taking brokerage account.',
      entities: [
        {
          name: 'Hola Prime Limited',
          jurisdiction: 'Hong Kong',
          registeredAddress: 'L1, Shaw House, 201 Wan Po Road, Tseung Kwan O, Hong Kong',
          role: 'Manager of simulated trading operations according to the official footer.',
        },
        {
          name: 'Holaprime Limited',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE 454359',
          role: 'Cyprus subsidiary of Hola Prime Limited Hong Kong disclosed on the official homepage footer.',
        },
        {
          name: 'Hola Prime Limited',
          jurisdiction: 'Mauritius',
          registrationNumber: '220248',
          registeredAddress: '4th Floor, Docks 4, The Docks, Caudan, Port Louis, Mauritius',
          role: 'MT4/MT5 entity disclosed as FSC Mauritius authorized Investment Dealer (Full Service Dealer, excluding underwriting), license GB24203729.',
        },
        {
          name: 'Gooey Trade / GT Tech LLC',
          jurisdiction: 'United States',
          registeredAddress: '6800 Broken Sound Parkway Northwest Suite 150, Boca Raton, FL 33487, United States',
          role: 'DXTrade, cTrader and MatchTrader platform routing/infrastructure entity disclosed by Hola Prime.',
        },
      ],
      regulatoryStatus: [
        'Official footer says Hola Prime only provides simulated trading and educational tools for skill assessment and enhancement.',
        'Official footer says Hola Prime does not act as a broker and does not accept deposits.',
        'Risk disclosure says information is educational only and not investment advice, an offer or an invitation to buy or sell financial instruments.',
        'Mauritius FSC investment-dealer license is disclosed for the MT4/MT5 entity, but that does not automatically regulate the simulated prop-account contract.',
      ],
      complaintsAndDisputes: [
        'Payout, challenge and compensation claims should be tested against the simulated-account disclosures and the latest trading rules before purchase.',
        'Official disclosure says there are no promises of rewards or returns.',
        'The site lists restricted countries including Afghanistan, Belarus, Burundi, China, Cuba, Congo, Sudan, Sri Lanka, North Korea and Yemen in the risk disclosure page.',
      ],
      redFlags: [
        'Broker/regulator language around the Mauritius entity could be misunderstood as protection for all Hola Prime accounts.',
        'Hola Prime Accounts may represent simulated accounts or live/copied accounts according to the disclosure, so the exact product path must be checked.',
        'Awards, Deloitte review and fast-payout marketing should not replace contract/rules review.',
      ],
      sources: [
        { label: 'Hola Prime official site', url: 'https://holaprime.com/' },
        { label: 'Hola Prime Risk Disclosure', url: 'https://holaprime.com/risk-disclosure/' },
        { label: 'Hola Prime Trustpilot', url: 'https://www.trustpilot.com/review/holaprime.com' },
      ],
    },
  }),
  universeFirm({
    id: 48,
    slug: 'sway-funded',
    name: 'Sway Funded',
    website: 'https://swayfunded.com/',
    status: 'À surveiller',
    score: 61,
    founded: 2024,
    headquarters: 'Saint Lucia / Cyprus payment agent',
    priceFrom: 13,
    profitSplit: 90,
    payoutProof: true,
    incidents: 3,
    styles: ['Forex', 'CFD', 'Simulated evaluation', 'Instant account', 'No consistency rule'],
    productName: 'Sway Funded Challenges',
    productDescription:
      'Rapid, Regular and Instant simulated challenge programs with virtual accounts up to $200k, no consistency rule claims, rewards on demand and acquisitions of MyFlashFunding, Glow Node and Karma Prop claimed in the public timeline.',
    accountSizeMin: 1000,
    accountSizeMax: 200000,
    profitTarget: '15% / 30% displayed on Rapid Phase 1; no target on SF Trader stage',
    maxDailyLoss: '5% / 10% displayed on Rapid example',
    maxDrawdown: '10% / 20% displayed on Rapid example',
    platforms: ['Proprietary dashboard', 'Trading platform to verify in dashboard/FAQ'],
    tradableAssets: ['Forex', 'Commodities', 'Stocks', 'Indices', 'Crypto'],
    minTradingDays: '4 days displayed on Rapid challenge',
    consistencyRule: 'Homepage advertises no consistency rule; terms and FAQ must still be checked by program.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and Terms page checked. Sway Funded discloses SF Funded LTD in Saint Lucia, registration number 2026-00408. Footer says SF Funded LTD operates a simulated trading environment using virtual funds, is not a broker or financial institution, does not accept deposits and does not execute trades on behalf of users. Payments, including fees and payouts, are facilitated by Corvexia Holding LTD in Cyprus, registration HE 489845, acting only as independent payment agent.',
    auditSourcesChecked: ['Official site', 'Terms page', 'FAQ link', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. Sway Funded now has explicit simulated/no-broker/no-deposit disclosure and a named Saint Lucia entity, but the entity is very recent, payment is handled by a separate Cyprus company, the terms page initially shows affiliate terms before client legal copy, and marketing uses aggressive trader-count/reward claims.',
      entities: [
        {
          name: 'SF Funded LTD',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2026-00408',
          role: 'Prop-firm brand/operator disclosed in footer and Terms page.',
        },
        {
          name: 'Corvexia Holding LTD',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE 489845',
          role: 'Independent payment agent for fees and payouts; disclosed as not providing financial, brokerage or investment services.',
        },
      ],
      regulatoryStatus: [
        'Footer says SF Funded LTD operates a simulated trading environment using virtual funds and not real market transactions.',
        'Footer says SF Funded LTD is not a broker or financial institution and does not accept deposits or execute trades on behalf of users.',
        'Footer says funded accounts refer solely to simulated capital within the platform.',
        'Affiliate terms are governed by Saint Lucia law and Saint Lucia courts.',
      ],
      complaintsAndDisputes: [
        'Homepage claims rewards within 24 hours, $1M+ rewarded and 70,000+ traders; these should be cross-checked against independent payout proofs.',
        'Timeline claims acquisitions of MyFlashFunding, Glow Node and Karma Prop, which should be treated as migration-risk context for affected legacy users.',
      ],
      redFlags: [
        'Very recent 2026 Saint Lucia registration despite a 2024 brand timeline.',
        'Payment agent is separate from the Saint Lucia operator.',
        'Aggressive public reward widgets/testimonials require independent validation.',
        'Legal page mixes affiliate terms and client-facing disclosures, so exact checkout contract should be saved before purchase.',
      ],
      sources: [
        { label: 'Sway Funded official site', url: 'https://swayfunded.com/' },
        { label: 'Sway Funded Terms page', url: 'https://swayfunded.com/terms' },
        { label: 'Sway Funded FAQ', url: 'https://swayfunded.kb.help/' },
        { label: 'Sway Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Sway%20Funded' },
      ],
    },
  }),
  universeFirm({
    id: 49,
    slug: 'funded-peaks',
    name: 'Funded Peaks',
    website: 'https://www.fundedpeaks.com/',
    status: 'À surveiller',
    score: 32,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Current domain checked. fundedpeaks.com is now a sweepstakes casino and prediction-market review site, not a captured prop-firm challenge or funded-trader checkout. The FAQ says Funded Peaks is an independent review site and does not operate casinos or offer real-money gambling itself.',
    auditSourcesChecked: ['Current domain', 'FAQ/homepage', 'Terms link', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High false-match risk. The current domain is not a prop-firm offer; it reviews sweepstakes casinos and prediction markets. The PropRadar listing should be treated as stale, repurposed or wrongly matched until a different official prop-firm domain is identified.',
      entities: [{ name: 'Funded Peaks', jurisdiction: 'To verify', role: 'Current domain operator not identified as a prop-firm operator from captured text.' }],
      regulatoryStatus: [
        'Current homepage focuses on sweepstakes casinos, prediction markets, bonuses and gaming reviews.',
        'FAQ says Funded Peaks is an independent review site and does not operate casinos or offer real-money gambling.',
        'No prop-firm challenge terms, funded-account contract, refund policy or trading disclaimer captured on current domain.',
      ],
      complaintsAndDisputes: ['Manual archive review required to determine whether Funded Peaks was ever an active prop-firm or whether this is a stale domain match.'],
      redFlags: [
        'Current site category is sweepstakes/gaming, not prop trading.',
        'No legal entity or prop-firm customer contract captured.',
        'Do not rank as an active prop firm unless a separate official domain is found.',
      ],
      sources: [
        { label: 'Funded Peaks current domain', url: 'https://www.fundedpeaks.com/' },
        { label: 'Funded Peaks Terms and Conditions', url: 'https://www.fundedpeaks.com/terms-and-conditions/' },
        { label: 'Funded Peaks Trustpilot search', url: 'https://www.trustpilot.com/search?query=Funded%20Peaks%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 50,
    slug: 'the-trading-pit',
    name: 'The Trading Pit',
    website: 'https://www.thetradingpit.com/',
    status: 'Active',
    score: 76,
    founded: 2022,
    headquarters: 'Liechtenstein',
    market: 'Multi-asset',
    priceFrom: 99,
    payoutProof: true,
    styles: ['Futures', 'Forex', 'Indices'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and risk disclosure checked. The Trading Pit names a Liechtenstein operating company, group holding and platform/service companies, and clearly states that all client accounts are demo accounts with virtual funds in a simulated environment. The file is stronger than a bare universe entry but still requires product-by-product rules and payout proof review.',
    auditSourcesChecked: ['Official site', 'Risk disclosure', 'Legal notice/footer', 'Help center', 'Trustpilot to monitor'],
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-07',
      summary:
        'Low-to-medium regulatory risk. The Trading Pit provides unusually explicit corporate disclosure for a mid-sized prop firm: The Trading Pit Challenge GmbH in Liechtenstein operates the site, with The Trading Pit AG as holding company and related group entities. The official site also states that all client accounts are demo accounts with virtual funds and that all trading occurs in a simulated environment. The key limitation remains that awards, group structure and partnerships do not make the prop account a regulated brokerage or investment product.',
      entities: [
        {
          name: 'The Trading Pit Challenge GmbH',
          jurisdiction: 'Liechtenstein',
          registrationNumber: 'FL-0002.693.417-1',
          registeredAddress: 'Heiligkreuz 6, 9490 Vaduz, Liechtenstein',
          role: 'Website owner/operator disclosed in the official footer.',
        },
        {
          name: 'The Trading Pit AG',
          jurisdiction: 'Liechtenstein',
          registrationNumber: 'FL-0002.688.743-6',
          role: 'Holding company of The Trading Pit Group disclosed on the official site.',
        },
        {
          name: 'The Trading Pit Champions GmbH / The Trading Pit Limited',
          jurisdiction: 'Liechtenstein / Cyprus',
          registrationNumber: 'FL-0002.693.413-9 / HE 431291',
          role:
            'Group service entities disclosed for platform services and business/administration support.',
        },
      ],
      regulatoryStatus: [
        'Official site states that all client accounts are demo accounts with virtual funds and all trading activity is simulated.',
        'Risk disclosure says material is general information only, not investment advice, offer, solicitation or recommendation.',
        'The site states it does not offer CFDs to residents of certain jurisdictions including the USA, Canada and Russia.',
        'No direct broker/dealer or investment-services authorization for the prop-firm account product is documented in PropRadar at this check.',
      ],
      complaintsAndDisputes: [
        'Public disputes should be classified by market branch: futures, CFDs, stocks/prediction-market style products and payout/reward rules.',
        'No major official regulator warning is documented in PropRadar at this check.',
        'Because the firm is multi-asset and multi-entity, the exact product and contracting path should be checked before checkout.',
      ],
      redFlags: [
        'Demo/virtual-fund account model means trader rights differ from a live brokerage account.',
        'Multi-entity group structure requires checking which entity applies to the selected product.',
        'Restricted jurisdictions and CFD limitations must be checked before purchase.',
        'Awards and media mentions are marketing signals, not legal protection.',
      ],
      sources: [
        { label: 'Official The Trading Pit site', url: 'https://www.thetradingpit.com/' },
        { label: 'The Trading Pit Risk Disclosure', url: 'https://www.thetradingpit.com/risk-disclosure' },
        { label: 'The Trading Pit Help Center', url: 'https://support.thetradingpit.com/' },
        { label: 'Trustpilot The Trading Pit', url: 'https://www.trustpilot.com/review/thetradingpit.com' },
      ],
    },
  }),
  universeFirm({
    id: 51,
    slug: 'finotive-funding',
    name: 'Finotive Funding',
    website: 'https://finotivefunding.com/',
    status: 'Active',
    score: 71,
    founded: 2021,
    headquarters: 'Dubai DIFC / Finotive group',
    priceFrom: 50,
    payoutProof: true,
    auditStatus: 'Vérifié multi-source',
    auditSummary:
      'Official site and terms checked. Finotive Funding is a trading name of Finotive Funding Technologies Limited, registered in the Dubai International Financial Centre with company number 11088. The terms state that all accounts are demo, simulated, notional and non-executable, that Finotive Funding does not provide DFSA-authorised financial services for the funding product, and that Finotive Markets entities are separate group services.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. Finotive Funding has one of the clearer legal pages among mid-sized forex prop firms: the terms identify a DIFC company, group entities, simulated-account definitions, reward-payment definitions and governing jurisdiction. The limitation is equally explicit: the service is a simulation and contractual reward product, not brokerage, investment advice, deposit-taking, custody or live execution by Finotive Funding.',
      entities: [
        {
          name: 'Finotive Funding Technologies Limited',
          jurisdiction: 'Dubai International Financial Centre, UAE',
          registrationNumber: '11088',
          registeredAddress: 'Innovation One Building, Level 2, DIFC, Dubai, United Arab Emirates',
          role: 'Finotive Funding contracting entity in the official terms.',
        },
        {
          name: 'Finotive Markets LLC / Finotive Markets (MU) Limited',
          jurisdiction: 'Saint Vincent and the Grenadines / Mauritius',
          role: 'Group entities referenced for MT5 infrastructure and separate live-trading services.',
        },
      ],
      regulatoryStatus: [
        'Terms state all accounts are demo, simulated, notional and non-executable.',
        'Terms state Finotive Funding does not provide brokerage, investment services, custody, deposit-taking or DFSA-authorised financial services for these services.',
        'Finotive Markets live services are described as separate from Finotive Funding simulated evaluation and reward services.',
      ],
      complaintsAndDisputes: [
        'Terms give Finotive broad discretion around amendments, compliance review, KYC, sanctions, risk review and reward-payment eligibility.',
        'Reward payments are contractual payments from eligible simulated profits, not withdrawals of client money or deposits.',
      ],
      redFlags: [
        'Strong group/broker infrastructure claims should be separated from the simulated funding contract.',
        'DIFC registration improves traceability but does not make the prop account a DFSA-regulated brokerage product.',
      ],
      sources: [
        { label: 'Finotive Funding official site', url: 'https://finotivefunding.com/' },
        { label: 'Finotive Funding Terms and Conditions', url: 'https://finotivefunding.com/terms-and-conditions' },
        { label: 'Finotive Markets', url: 'https://finotivemarkets.com/' },
        { label: 'Finotive Funding Trustpilot', url: 'https://www.trustpilot.com/review/finotivefunding.com' },
      ],
    },
  }),
  universeFirm({
    id: 52,
    slug: 'ftuk',
    name: 'FTUK',
    website: 'https://ftuk.com/',
    status: 'Active',
    score: 72,
    founded: 2021,
    headquarters: 'United States / Netherlands / Saint Lucia',
    priceFrom: 119,
    payoutProof: true,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official FTUK site checked. The footer names FTUK LLC as brand operator, NexData-Solutions B.V. as European management office and FTUK Markets Ltd in Saint Lucia as simulated trading services provider. It explicitly states that accounts are simulated, no live market execution takes place, fees are service fees and the group does not act as broker, investment adviser, financial intermediary or deposit-taking institution.',
    auditSourcesChecked: ['Official site', 'Official footer/legal disclaimer', 'Terms and conditions link', 'FAQ', 'Trustpilot to monitor'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-07',
      summary:
        'Medium regulatory risk. FTUK is more transparent than many similarly sized firms because it lists corporate entities and office addresses: FTUK LLC in Wyoming, NexData-Solutions B.V. in the Netherlands, and FTUK Markets Ltd in Saint Lucia. The official disclaimer is also clear that all accounts operate in a simulated environment, program fees are not deposits and the group is not a broker, adviser, intermediary or deposit-taking institution. Saint Lucia involvement and simulation-only accounts justify keeping the file at medium rather than low risk.',
      entities: [
        {
          name: 'FTUK LLC',
          jurisdiction: 'United States, Wyoming',
          registeredAddress: '30 N Gould St, Ste R, Sheridan, WY 82801, United States',
          role: 'Trading brand operator and coordinator of group business operations disclosed in the official footer.',
        },
        {
          name: 'NexData-Solutions B.V.',
          jurisdiction: 'Netherlands',
          registeredAddress: 'Goeman Borgesiuslaan 77, 3515 ET Utrecht, The Netherlands',
          role: 'European management office disclosed by FTUK.',
        },
        {
          name: 'FTUK Markets Ltd',
          jurisdiction: 'Saint Lucia',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Simulated trading services provider disclosed by FTUK.',
        },
      ],
      regulatoryStatus: [
        'FTUK states all accounts operate exclusively within a simulated trading environment and that no live market execution takes place.',
        'Official footer says FTUK LLC, FTUK Markets Ltd, NexData-Solutions B.V. and affiliates do not act as broker, investment adviser, financial intermediary or deposit-taking institution.',
        'Program fees are described as service fees, not deposits, client funds, investment capital or brokerage balances.',
        'CFTC Rule 4.41 hypothetical/simulated performance language is included in the official disclaimer.',
      ],
      complaintsAndDisputes: [
        'Public payout and support claims should be verified against independent Trustpilot, Discord and recent user reports rather than relying only on homepage testimonials.',
        'No major public regulatory enforcement action is documented in PropRadar at this check.',
        'Product-specific disputes should be separated between forex, futures, flex challenge, instant funding and platform availability.',
      ],
      redFlags: [
        'Saint Lucia simulated-services entity increases jurisdictional risk versus a purely UK/EU structure.',
        'No live market execution means funded-account language must be read as simulated-service access unless separate documentation proves otherwise.',
        'Fees are generally non-refundable except where required by law and do not create fiduciary, custodial, brokerage or investment relationships.',
        'Services / MT5 information are restricted for residents of the United States, UAE and other prohibited jurisdictions.',
      ],
      sources: [
        { label: 'Official FTUK site', url: 'https://ftuk.com/' },
        { label: 'FTUK terms and conditions', url: 'https://ftuk.com/terms-and-conditions/' },
        { label: 'FTUK FAQ', url: 'https://faq.ftuk.com/' },
        { label: 'Trustpilot FTUK', url: 'https://www.trustpilot.com/review/ftuk.com' },
      ],
    },
  }),
  universeFirm({
    id: 53,
    slug: 'lux-trading-firm',
    name: 'Lux Trading Firm',
    website: 'https://luxtradingfirm.com/',
    status: 'Active',
    score: 74,
    founded: 2021,
    headquarters: 'United Kingdom / Dubai',
    priceFrom: 149,
    payoutProof: true,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Lux Trading Firm site checked. The footer discloses Lux Trading Firm Ltd in the UK and Lux Trading Firm ME L.L.C-FZ in Dubai, while also stating that these entities do not carry out regulated activities, are not required to be authorized, are not brokers and do not accept deposits. The page makes strong real-capital and liquidity claims, so PropRadar keeps a concrete but cautious legal file.',
    auditSourcesChecked: ['Official site', 'Official footer/legal disclaimer', 'Terms/risk links', 'Trustpilot to monitor'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-07',
      summary:
        'Medium regulatory risk. Lux Trading Firm is more transparent than many mid-sized firms because it discloses a UK company, a Dubai free-zone entity and contact details. However, the official footer explicitly states that Lux Trading Firm entities do not carry out regulated activities, are not required to be authorized, are not brokers and do not accept deposits. The homepage also uses strong claims around real money, real liquidity and audited track record, which should be checked against contracts and clearing/liquidity-provider documentation before purchase.',
      entities: [
        {
          name: 'Lux Trading Firm Ltd',
          jurisdiction: 'United Kingdom',
          registrationNumber: '13160991',
          registeredAddress: '128 City Road, London, EC1V 2NX, United Kingdom',
          role: 'UK company disclosed in the official footer for Lux Trading Firm services.',
        },
        {
          name: 'Lux Trading Firm ME L.L.C-FZ',
          jurisdiction: 'Dubai, United Arab Emirates',
          registrationNumber: '2311235.01',
          registeredAddress: 'Office 104/105, Emaar Square 4, Dubai, UAE',
          role: 'Dubai free-zone entity disclosed in the official footer.',
        },
      ],
      regulatoryStatus: [
        'Official footer states that Lux Trading Firm entities do not carry out regulated activities and are not required to be authorized by a regulatory authority.',
        'Lux Trading Firm states that it is not a broker and does not accept deposits.',
        'The footer says preferred clearing firms carry out regulated activities and are authorized by their respective regulators, but those firms are separate from Lux Trading Firm.',
        'The homepage claims real money funded accounts, real A-book liquidity and an audited track record; these claims should be verified against the exact user agreement and provider documents.',
      ],
      complaintsAndDisputes: [
        'Public complaints should be separated between rule breaches, risk-desk decisions, reset mechanics, payout processing and live-account expectations.',
        'No major public regulatory enforcement action is documented in PropRadar at this check.',
        'Because the site publishes many very similar testimonial-style blocks, review quality and Trustpilot signals should be weighted carefully.',
      ],
      redFlags: [
        'Strong real-money marketing claims are not the same as regulated broker or investment-firm status.',
        'UK company presence does not equal FCA authorization for the prop-firm product.',
        'Dubai free-zone entity and UK entity roles should be checked in the latest terms before checkout.',
        'Clearing-firm authorization should not be confused with direct authorization of Lux Trading Firm itself.',
      ],
      sources: [
        { label: 'Official Lux Trading Firm site', url: 'https://luxtradingfirm.com/' },
        { label: 'Lux Trading Firm terms and conditions', url: 'https://luxtradingfirm.com/terms-and-conditions/' },
        { label: 'Lux Trading Firm risk warning', url: 'https://luxtradingfirm.com/risk-warning/' },
        { label: 'Companies House - Lux Trading Firm Ltd', url: 'https://find-and-update.company-information.service.gov.uk/company/13160991' },
        { label: 'Trustpilot Lux Trading Firm', url: 'https://www.trustpilot.com/review/luxtradingfirm.com' },
      ],
    },
  }),
  universeFirm({
    id: 54,
    slug: 't4tcapital',
    name: 'T4TCapital',
    website: 'https://www.t4tcapital.com/',
    status: 'À surveiller',
    score: 44,
    founded: 2019,
    headquarters: 'United Kingdom',
    priceFrom: 125,
    payoutProof: true,
    incidents: 3,
    additionalSources: [
      { label: 'T4TCapital article/news search', url: 'https://www.google.com/search?q=%22T4TCapital%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official-looking site did not return usable public legal text during the July 8, 2026 capture, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the current prop-firm offer. Despite older public reputation and a longer operating history, PropRadar could not verify the current contracting entity, terms, refund policy, broker/non-broker status or simulated-account wording from primary pages in this environment.',
    auditSourcesChecked: ['Official domain reachability', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'Legal audit remains incomplete. T4TCapital may be an older funded-trader brand, but the current official legal documents were not captured, so the page should not present it as legally verified until terms and company records are refreshed.',
      entities: [{ name: 'T4TCapital', jurisdiction: 'United Kingdom / To verify', role: 'Brand/operator to identify from current official legal pages and company records.' }],
      regulatoryStatus: [
        'Current contracting entity not confirmed in this pass.',
        'No current refund, simulated-account, broker/non-broker or deposit wording captured from primary legal pages.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: ['Manual review required for current operations, payout evidence, terms history and any company-register changes.'],
      redFlags: [
        'Older positive reputation should not substitute for current legal documents.',
        'No usable primary legal source captured in this pass.',
        'Do not rank as verified until the live contract and refund policy are sourced.',
      ],
      sources: [
        { label: 'T4TCapital official-looking site', url: 'https://www.t4tcapital.com/' },
        { label: 'T4TCapital Trustpilot search', url: 'https://www.trustpilot.com/search?query=T4TCapital' },
        { label: 'T4TCapital article/news search', url: 'https://www.google.com/search?q=%22T4TCapital%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 55,
    slug: 'traders-with-edge',
    name: 'Traders With Edge',
    website: 'https://traderswithedge.com/',
    status: 'À surveiller',
    score: 40,
    founded: 2022,
    priceFrom: 55,
    payoutProof: true,
    incidents: 4,
    additionalSources: [
      { label: 'Traders With Edge article/news search', url: 'https://www.google.com/search?q=%22Traders+With+Edge%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Current domain traderswithedge.com returned only a Hudu-style account sign-in/create-account page during the July 8, 2026 capture. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage confirming current operating status, migration or legal responsibility. No public prop-firm homepage, legal entity, terms, refund policy or simulated-trading disclosure was captured, so the listing should be treated as unverified or possibly migrated.',
    auditSourcesChecked: ['Current domain reachability', 'Trustpilot search', 'Exact-name article/news search', 'Migration/stale-domain review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. Traders With Edge has historical brand visibility, but the current domain did not expose public legal/prop-firm pages in this capture. The active operator, current service status and customer contract must be manually verified before recommendation.',
      entities: [{ name: 'Traders With Edge', jurisdiction: 'To verify', role: 'Brand/operator to identify from current legal pages or migration notices.' }],
      regulatoryStatus: [
        'No current public legal entity captured.',
        'No current terms, refund policy, non-broker disclosure or simulated-service wording captured.',
        'Domain currently exposed a sign-in/account creation page rather than a public legal site.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: ['Manual domain-history, legacy-user, payout and migration review required.'],
      redFlags: [
        'Current domain does not show the expected public prop-firm site.',
        'Potential migration/rebrand/private-dashboard issue.',
        'Do not treat old third-party reviews as proof of current legal status.',
      ],
      sources: [
        { label: 'Traders With Edge current domain', url: 'https://traderswithedge.com/' },
        { label: 'Traders With Edge Trustpilot search', url: 'https://www.trustpilot.com/search?query=Traders%20With%20Edge' },
        { label: 'Traders With Edge article/news search', url: 'https://www.google.com/search?q=%22Traders+With+Edge%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 56,
    slug: 'ment-funding',
    name: 'Ment Funding',
    website: 'https://mentfunding.com/',
    status: 'À surveiller',
    score: 66,
    founded: 2021,
    headquarters: 'United States / Canada-linked terms',
    priceFrom: 250,
    payoutProof: true,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, terms, risk disclaimer and refund policy checked. Ment Funding says it is part of the Prop Account group of companies and that all funding assessments are provided by Prop Account, LLC with assessment fees paid to Prop Account, LLC. The refund policy says evaluation purchases are final and non-refundable, while disputes are subject to arbitration in Quebec under Quebec law.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. Ment Funding has a longer operating history and multi-asset offer, but the legal footer points to the Prop Account group rather than a simple one-entity structure. The terms use Quebec arbitration and the refund policy is strict: purchases are services rendered immediately and are non-refundable. The product should be treated as an assessment/service purchase, not an investment or protected brokerage relationship.',
      entities: [
        {
          name: 'Prop Account, LLC',
          jurisdiction: 'United States',
          role: 'Provider of funding assessments and recipient of assessment fees according to Ment Funding footer.',
        },
        {
          name: 'Prop Account group of companies',
          jurisdiction: 'United States / Cayman / group structure to verify',
          role: 'Group including Prop Account, d/b/a Dashboard Analytix, Forest Park FX LTD, Prop Account LLC, Prop Account Cayman, LC.',
        },
      ],
      regulatoryStatus: [
        'Refund policy says the evaluation fee is the purchase of a service, not an investment.',
        'Terms use arbitration in Quebec and Quebec law for disputes.',
        'Risk disclaimer says leveraged and over-the-counter products carry high risk and simulated results do not guarantee future results.',
      ],
      complaintsAndDisputes: [
        'No refunds on services purchased from the company according to the refund policy.',
        'Arbitration is held in Quebec and both company and trader submit to personal jurisdiction there.',
      ],
      redFlags: [
        'Group structure requires a current checkout/legal review to identify the exact contracting entity.',
        'Strict no-refund policy materially increases buyer-risk if rules are misunderstood.',
      ],
      sources: [
        { label: 'Ment Funding official site', url: 'https://mentfunding.com/' },
        { label: 'Ment Funding Terms of Service', url: 'https://mentfunding.com/terms-of-service' },
        { label: 'Ment Funding Risk Disclaimer', url: 'https://mentfunding.com/risk-disclaimer' },
        { label: 'Ment Funding Refund Policy', url: 'https://mentfunding.com/refund-policy' },
        { label: 'Ment Funding Trustpilot', url: 'https://www.trustpilot.com/review/mentfunding.com' },
      ],
    },
  }),
  universeFirm({
    id: 57,
    slug: 'ofp-funding',
    name: 'OFP Funding',
    website: 'https://ofpfunding.com/',
    status: 'À surveiller',
    score: 63,
    founded: 2022,
    headquarters: 'United Kingdom / Saint Lucia',
    productType: 'Instant funding',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. OFP Funding discloses FINTEKNOLOGY LTD in the UK as owner/payment agent and OFP Funding Ltd in Saint Lucia as simulated trading services provider. The legal footer says the company is not a financial broker, advisor or representative, does not accept client deposits, carries out no regulated activities and its exclusive activity is simulated trading.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. OFP Funding gives unusually concrete entity detail, including UK Finteknology Ltd and OFP Funding Ltd in Saint Lucia, but the risk is elevated because the services are explicitly simulated and non-regulated, while the structure mixes a payment agent, Saint Lucia provider and strong instant-funding marketing. Users should read the current terms before buying and should not treat the account as broker custody or live capital.',
      entities: [
        {
          name: 'FINTEKNOLOGY LTD',
          jurisdiction: 'United Kingdom',
          registrationNumber: '15131112',
          registeredAddress: '48 Warwick Street, London, Greater London, W1B 5AW, United Kingdom',
          role: 'Payment agent / trademark owner disclosed in OFP Funding footer.',
        },
        {
          name: 'OFP Funding Ltd',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2024-00577',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, St. Lucia',
          role: 'Simulated trading services provider disclosed in the official footer.',
        },
      ],
      regulatoryStatus: [
        'Terms state OFP does not execute or transmit trades on financial markets, accept or manage client funds or assets, provide advice, or facilitate real trading activity.',
        'Terms state trading activity is entirely simulated and balances/results are virtual.',
        'Footer states OFP Funding Ltd provides simulated trading services and that Finteknology and OFP Funding are not brokers and do not accept deposits.',
      ],
      complaintsAndDisputes: [
        'Payment-processing role of Finteknology and Paynetics should be separated from reward/payout obligations under the OFP terms.',
        'Instant funding marketing should be reconciled with simulated-only terms before purchase.',
      ],
      redFlags: [
        'Saint Lucia provider plus UK payment-agent structure raises entity-mapping risk.',
        'No regulated activity / not broker / no deposits language means buyer protections are contractual only.',
      ],
      sources: [
        { label: 'OFP Funding official site', url: 'https://ofpfunding.com/' },
        { label: 'OFP Funding Terms and Conditions', url: 'https://ofpfunding.com/terms-and-conditions' },
        { label: 'OFP Funding Trustpilot', url: 'https://www.trustpilot.com/review/ofpfunding.com' },
      ],
    },
  }),
  universeFirm({
    id: 58,
    slug: 'smart-prop-trader',
    name: 'Smart Prop Trader',
    website: 'https://www.smartproptrader.com/',
    status: 'À surveiller',
    score: 34,
    founded: 2022,
    headquarters: 'Costa Rica / redirected domain',
    priceFrom: 0,
    incidents: 5,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Current smartproptrader.com redirects to FXnity, a CFD/forex trading site rather than a captured Smart Prop Trader prop-firm checkout. FXnity discloses FXnity Limited Liability Company in Costa Rica, registration 3-102-920598, and markets deposits, withdrawals, client protection and CFD trading. Treat the Smart Prop Trader entry as stale, migrated or no longer independently verifiable from this domain.',
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High false-match / migration risk. The current official-looking domain no longer shows a Smart Prop Trader prop-firm legal page; it redirects to FXnity, which presents itself as a CFD/forex trading and liquidity site with a Costa Rica company disclosure. PropRadar should not treat old Smart Prop Trader reviews as current legal proof.',
      entities: [
        {
          name: 'FXnity Limited Liability Company / FXnity Sociedad De Responsabilidad Limitada',
          jurisdiction: 'Costa Rica',
          registrationNumber: '3-102-920598',
          registeredAddress: '2nd Floor, JRC Consulting Group Office CRS Seguros Building, 600 meters west of Escazú Village, Escazú, San Rafael, San José, Costa Rica',
          role: 'Current redirected-domain operator disclosed on FXnity footer; not confirmed as Smart Prop Trader prop-firm operator.',
        },
      ],
      regulatoryStatus: [
        'smartproptrader.com redirects to fxnity.com in the current capture.',
        'FXnity homepage markets trading accounts, deposits, withdrawals, CFD markets and segregated client funds, not a prop-firm challenge page.',
        'No current Smart Prop Trader terms, refund policy or simulated-account disclaimer captured from this domain.',
      ],
      complaintsAndDisputes: [
        'Historical Smart Prop Trader complaints/reviews must be separated from FXnity user reviews and any migrated users.',
      ],
      redFlags: [
        'Current domain redirects to a different brand.',
        'CFD/broker-style deposit language is not the same as prop-firm evaluation terms.',
        'Do not recommend as active Smart Prop Trader unless a current official prop-firm contract is found.',
      ],
      sources: [
        { label: 'Smart Prop Trader current domain', url: 'https://www.smartproptrader.com/' },
        { label: 'FXnity redirected domain', url: 'https://fxnity.com/' },
        { label: 'Smart Prop Trader Trustpilot', url: 'https://www.trustpilot.com/review/smartproptrader.com' },
      ],
    },
  }),
  universeFirm({
    id: 59,
    slug: 'toptier-trader',
    name: 'TopTier Trader',
    website: 'https://www.toptiertrader.com/',
    status: 'À surveiller',
    score: 36,
    founded: 2021,
    priceFrom: 0,
    incidents: 5,
    additionalSources: [
      { label: 'TopTier Trader article/news search', url: 'https://www.google.com/search?q=%22TopTier+Trader%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official homepage review returned only an unexpected single-line page/image referencing Tx3Funding branding during the July 8, 2026 PropRadar pass. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage confirming a migration, acquisition or current legal operator. Treat TopTier Trader as unresolved until current operator, brand migration status, terms, entity and payout obligations are confirmed from primary sources.',
    auditSourcesChecked: ['Official homepage capture', 'TX3 Funding cross-check URL', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High brand-continuity risk. The public site response did not provide enough legal text to confirm the current contracting entity, operating status, refund terms or simulated-account model. Because the returned page referenced Tx3Funding, historical TopTier Trader reputation should not be carried forward without a migration/legal continuity document.',
      entities: [
        {
          name: 'TopTier Trader',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from the current official site, terms and company records.',
        },
      ],
      regulatoryStatus: [
        'Current legal entity not confirmed in PropRadar at this check.',
        'Current homepage capture showed Tx3Funding branding rather than a readable TopTier Trader legal page.',
        'Brand continuity / possible migration signal requires manual confirmation.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Historical TopTier Trader reviews should be separated from any successor or redirected brand.',
      ],
      redFlags: [
        'Unexpected official-site response referencing another brand.',
        'Do not rely on historical ratings until current contractual entity and operating status are confirmed.',
      ],
      sources: [
        { label: 'TopTier Trader official site', url: 'https://www.toptiertrader.com/' },
        { label: 'TX3 Funding official site to cross-check manually', url: 'https://tx3funding.com/' },
        { label: 'TopTier Trader Trustpilot', url: 'https://www.trustpilot.com/review/toptiertrader.com' },
        { label: 'TopTier Trader article/news search', url: 'https://www.google.com/search?q=%22TopTier+Trader%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 60,
    slug: 'wemastertrade',
    name: 'WeMasterTrade',
    website: 'https://wemastertrade.com/',
    status: 'À surveiller',
    score: 60,
    founded: 2022,
    headquarters: 'Canada / United Kingdom payment agents',
    priceFrom: 45,
    profitSplit: 90,
    payoutProof: true,
    incidents: 3,
    styles: ['Simulated evaluation', 'Instant funding', 'Copy-to-live model', 'USDC payouts'],
    productName: 'WeMasterTrade Challenge and Instant Packages',
    productDescription:
      'Challenge and instant-style simulated funding programs with virtual accounts, trade-copying language to live firm accounts, 30% reward share during challenge phase and up to 90% reward share after evaluation.',
    accountSizeMin: 10000,
    accountSizeMax: 200000,
    profitTarget: '8% phase 1 / 6% phase 2 on displayed challenge package',
    maxDailyLoss: '5%',
    maxDrawdown: '10%',
    platforms: ['WeMasterTrade / WeCopyTrade ecosystem', 'MetaTrader 5 restrictions disclosed', 'Third-party platforms to verify'],
    tradableAssets: ['Forex', 'Crypto', 'Stocks', 'Assets to verify by selected package'],
    minTradingDays: 'No universal minimum captured; package-specific',
    consistencyRule: 'No universal consistency rule captured; prohibited conduct and risk parameters control payout/reward eligibility.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms, Refund/Cancellation and Disclaimer checked. WeMasterTrade says clients receive simulation accounts with virtual funds, no live trading is provided directly by the company, and passing traders may have strategies considered for replication by the company using its own capital at its sole discretion. Payments are processed by Wecopy Fintech LTD in the UK for non-Canada users and WeCopy Fintech Inc. in British Columbia for Canada users. Refund terms are strict and say there are no refunds once service/trading activity has started.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. WeMasterTrade now provides substantial legal text and payment-agent disclosure, but the operating company itself is still described mostly as "the Company", while the identifiable entities are payment agents. The model mixes virtual accounts, discretionary copy-to-live language, performance-based rewards and strict no-refund clauses.',
      entities: [
        {
          name: 'WeMasterTrade',
          jurisdiction: 'To verify',
          role: 'Service/operator brand named in Terms; exact incorporation details still need confirmation beyond payment-agent disclosures.',
        },
        {
          name: 'Wecopy Fintech LTD',
          jurisdiction: 'United Kingdom',
          registrationNumber: '14905703',
          registeredAddress: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom',
          role: 'Payment agent for users outside Canada, disclosed in Terms and footer.',
        },
        {
          name: 'WeCopy Fintech Inc.',
          jurisdiction: 'British Columbia, Canada',
          registrationNumber: 'BC1333534',
          registeredAddress: '420-744 West Hastings Street, Vancouver, BC, V6C 1A5, Canada',
          role: 'Payment agent for Canada users disclosed in Terms; homepage also shows a Canada office at 808 Nelson Street, Vancouver.',
        },
      ],
      regulatoryStatus: [
        'Terms say no live trading is provided directly by the company.',
        'Terms say successful traders may, at company discretion, have strategies considered for replication using company capital and rewards are not guaranteed.',
        'Homepage says clients receive simulated accounts with virtual funds and trades may be copied to live firm accounts.',
        'Terms say payment agents do not provide trading, investment or financial services and do not hold client funds for trading purposes.',
        'Risk disclosure says this is not an investment opportunity and users do not deposit funds for investment.',
      ],
      complaintsAndDisputes: [
        'Terms say there are no refunds on services purchased from the company once the service/account has started.',
        'Chargebacks can trigger suspension, collection fees and legal fees.',
        'Company may deny withdrawal requests, terminate participation, forfeit fees or disqualify a funded account for prohibited conduct.',
        'Complaint compensation is limited to the service fee paid for the affected account.',
      ],
      redFlags: [
        'Operating company incorporation is not as clear as payment-agent disclosure.',
        'Copy-to-live language can be misunderstood as direct live-account access.',
        'Strict no-refund and no-chargeback clauses.',
        'Awards/recognition images and FinCEN-style badges should not be treated as prop-firm regulation.',
        'Restricted-country and MT5 availability language is complex and must be checked before purchase.',
      ],
      sources: [
        { label: 'WeMasterTrade official site', url: 'https://wemastertrade.com/' },
        { label: 'WeMasterTrade Terms and Conditions', url: 'https://faq.wemastertrade.com/terms-and-conditions/' },
        { label: 'WeMasterTrade Refund and Cancellation', url: 'https://faq.wemastertrade.com/refund-and-cancellation/' },
        { label: 'WeMasterTrade Disclaimer', url: 'https://faq.wemastertrade.com/disclaimer/' },
        { label: 'WeMasterTrade Trustpilot', url: 'https://www.trustpilot.com/review/wemastertrade.com' },
      ],
    },
  }),
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
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, terms and footer checked. FunderPro discloses FunderPro Ltd in Malta and Red Acre Ltd as the website controller. The legal pages state that services are not investment services, not financial advice and not a trading platform, while also identifying Red Acre Ltd as authorized by the Malta Gaming Authority. PropRadar treats this as a medium-risk structure: visible EU/Malta entities, but the prop-firm account is still not a regulated brokerage or investment product.',
    auditSourcesChecked: ['Official site', 'Terms and conditions', 'Privacy/legal footer', 'Trustpilot to monitor'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. FunderPro is more legally visible than many recent forex prop firms because the official site names FunderPro Ltd in Malta and Red Acre Ltd as website controller. It also states that FunderPro is not an investment service, not financial advice and not a trading platform. Red Acre Ltd is disclosed as authorized by the Malta Gaming Authority, which may improve corporate traceability, but that is not the same as investment-firm or broker regulation for the prop-firm challenge product.',
      entities: [
        {
          name: 'FunderPro Ltd',
          jurisdiction: 'Malta',
          registeredAddress: 'Dragonara Business Centre, 5th Floor, Dragonara Road, St Julians STJ 3141, Malta',
          role: 'Company entity disclosed in FunderPro terms for the prop-firm service.',
        },
        {
          name: 'Red Acre Ltd',
          jurisdiction: 'Malta',
          registeredAddress: 'Dragonara Business Centre, 5th Floor, Dragonara Road, St Julians STJ 3141, Malta',
          role: 'Website controller disclosed in the privacy/legal footer; also disclosed as Malta Gaming Authority authorized.',
        },
      ],
      regulatoryStatus: [
        'FunderPro terms state that services are not investment services or financial advice.',
        'The site states that FunderPro is not a trading platform and that its services are offered through a proprietary platform.',
        'No MiFID investment-firm, broker-dealer or equivalent prop-firm account authorization is documented in PropRadar for the challenge product.',
        'Red Acre Ltd MGA authorization is a corporate/regulatory signal to note, but it should not be confused with broker or investment-services protection.',
      ],
      complaintsAndDisputes: [
        'Public disputes should be classified around proprietary-platform execution, rule interpretation, KYC, payout eligibility and affiliate promotion timing.',
        'No major public regulator enforcement action against the prop-firm product is documented in PropRadar at this check.',
        'Independent payout proof should be separated from marketing testimonials and affiliate discount campaigns.',
      ],
      redFlags: [
        'MGA authorization is not investment-firm authorization for the prop account product.',
        'The service is explicitly not financial advice, not investment services and not a trading platform.',
        'Proprietary-platform model requires checking execution, pricing, data and dispute terms carefully.',
        'Affiliate relationship exists and must remain visually separate from the score.',
      ],
      sources: [
        { label: 'Official FunderPro site', url: 'https://funderpro.com/' },
        { label: 'FunderPro terms and conditions', url: 'https://funderpro.com/terms-and-conditions/' },
        { label: 'FunderPro privacy policy', url: 'https://funderpro.com/privacy-policy/' },
        { label: 'Trustpilot FunderPro', url: 'https://www.trustpilot.com/review/funderpro.com' },
      ],
    },
  }),
  universeFirm({
    id: 62,
    slug: 'crypto-fund-trader',
    name: 'Crypto Fund Trader',
    website: 'https://cryptofundtrader.com/',
    status: 'À surveiller',
    score: 62,
    founded: 2022,
    market: 'Crypto',
    headquarters: 'Switzerland',
    priceFrom: 55,
    styles: ['Crypto'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, terms and refund policy checked. Crypto Fund Trader contracts through SWISS RLCRATES AG at Bahnhofstrasse 21, 6300 Zug. The terms frame the product as trader education, demo accounts and performance-based scholarship rewards; they state that operations are not real, funds are demo funds, demo profits are not real profits and users are not entitled to those profits during evaluation stages.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. Crypto Fund Trader provides a named Swiss company and explicit terms around simulated/demo trading. That transparency is useful, but the crypto/Bybit/API model, scholarship language, discretionary interviews, operational restrictions and demo-fund framing make the product very different from a regulated brokerage or client-money account. Treat payouts as contractual scholarship/reward eligibility, not ordinary withdrawals of trading profits.',
      entities: [
        {
          name: 'SWISS RLCRATES AG',
          jurisdiction: 'Switzerland',
          registeredAddress: 'Bahnhofstrasse 21, 6300 Zug, Switzerland',
          role: 'Company named in Crypto Fund Trader terms.',
        },
      ],
      regulatoryStatus: [
        'Terms say services are for training and education in simulated trading.',
        'Terms say users receive demo account credentials and that all operations through the service are not real.',
        'Terms say demo funds and demo profits are not real funds/profits and cannot be withdrawn during evaluation stages.',
        'Bybit evaluation accounts may require a dedicated API key/subaccount, subject to Bybit-native fees and platform rules.',
      ],
      complaintsAndDisputes: [
        'Terms allow interviews, compliance checks, operational restrictions and scholarship withholding/revocation for incomplete or misleading information.',
        'Refund policy and Bybit API/subaccount restrictions should be checked before purchase, especially because deleted or changed API keys can invalidate an evaluation.',
      ],
      redFlags: [
        'Scholarship/reward wording can be misunderstood as standard profit withdrawal.',
        'Crypto exchange/API account model introduces platform-specific operational risk.',
        'The company may modify conditions and operational restrictions at its discretion under the terms.',
      ],
      sources: [
        { label: 'Crypto Fund Trader official site', url: 'https://cryptofundtrader.com/' },
        { label: 'Crypto Fund Trader Terms and Conditions', url: 'https://cryptofundtrader.com/terms-and-conditions/' },
        { label: 'Crypto Fund Trader Refund Policy', url: 'https://cryptofundtrader.com/refund-policy/' },
        { label: 'Crypto Fund Trader Trustpilot', url: 'https://www.trustpilot.com/review/cryptofundtrader.com' },
      ],
    },
  }),
  universeFirm({
    id: 63,
    slug: 'hyrotrader',
    name: 'HyroTrader',
    website: 'https://hyrotrader.com/',
    status: 'À surveiller',
    score: 61,
    founded: 2022,
    market: 'Crypto',
    headquarters: 'Czech Republic',
    priceFrom: 59,
    styles: ['Crypto'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site checked. HyroTrader presents a crypto prop model with Bybit / Tealstreet / Cleo exchange-connected execution, USDT perpetuals, profit splits and crypto payouts. The homepage discloses a Prague headquarters signal and emphasizes real exchange infrastructure, but a full primary-source terms/legal entity page was not captured in this pass, so PropRadar keeps the legal file partial rather than fully verified.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. HyroTrader has strong operational disclosure around exchange-connected crypto execution and Bybit-style integrations, which is useful for understanding the trading model. However, the current pass did not capture a full legal terms page identifying the contracting entity, refund rights, governing law and regulatory status. Crypto prop accounts using exchange APIs can carry unusual operational risks around account access, KYC, exchange restrictions and payout eligibility.',
      entities: [
        {
          name: 'HyroTrader',
          jurisdiction: 'Czech Republic',
          role: 'Brand/operator with Prague headquarters signal on official site; exact contracting entity to verify from legal terms/company register.',
        },
      ],
      regulatoryStatus: [
        'Official site says traders can use Bybit account/API or terminal-connected exchange infrastructure.',
        'Official site markets funded crypto accounts, USDT/USDC payouts and exchange-connected market execution.',
        'Full contracting entity, regulator status and governing law were not captured from primary legal terms in this pass.',
      ],
      complaintsAndDisputes: [
        'Challenge-fee refund claims should be checked against official checkout terms and payout rules.',
        'Payout disputes should be classified separately from exchange/API access issues.',
      ],
      redFlags: [
        'Real exchange infrastructure marketing does not automatically mean regulated brokerage protection.',
        'Exchange API and crypto perpetuals create additional platform, country-restriction and KYC risk.',
        'Legal entity remains incomplete until current terms are captured.',
      ],
      sources: [
        { label: 'HyroTrader official site', url: 'https://www.hyrotrader.com/' },
        { label: 'HyroTrader FAQ', url: 'https://www.hyrotrader.com/faq' },
        { label: 'HyroTrader Google reviews', url: 'https://www.google.com/search?q=HyroTrader+reviews' },
      ],
    },
  }),
  universeFirm({
    id: 64,
    slug: 'funded-bull',
    name: 'Funded Bull',
    website: 'https://fundedbull.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2023,
    headquarters: 'Singapore',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. FundedBull discloses RateRight Pte. Ltd. at 68 Circular Road #02-01, Singapore as website operator. The footer states that RateRight Pte. Ltd. does not provide brokerage or trading services, does not hold custody of investor funds, does not engage in regulated activities and focuses exclusively on demo trading education.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. FundedBull gives a concrete Singapore operator and unusually direct simulated-education language in the footer. That helps traceability, but the product remains a demo trading education/evaluation service rather than a regulated broker, investment adviser or custodian. The site markets fast payouts and high profit split, so buyers should reconcile those claims with the no-broker/no-custody/no-regulated-activity disclosure.',
      entities: [
        {
          name: 'RateRight Pte. Ltd.',
          jurisdiction: 'Singapore',
          registeredAddress: '68 Circular Road #02-01, Singapore 049422',
          role: 'Website operator and service provider disclosed in FundedBull footer.',
        },
      ],
      regulatoryStatus: [
        'Footer states RateRight Pte. Ltd. does not provide brokerage or trading services.',
        'Footer states the company does not hold custody of investor funds.',
        'Footer states the company does not engage in regulated activities and focuses on demo trading education.',
        'Services involve simulated demo accounts within a trading environment for educational purposes.',
      ],
      complaintsAndDisputes: [
        'Public payout claims should be checked against minimum payout, payout frequency and rule-compliance requirements.',
        'Restricted regions include Pakistan, Russia, Cuba, Sudan, Somalia, Iran, Lebanon, Syria, Libya, Vietnam, North Korea, Belarus, Myanmar, Central African Republic, Democratic Republic of the Congo, Ethiopia, Hong Kong, Iraq, Nicaragua, South Sudan, Venezuela and Yemen.',
      ],
      redFlags: [
        'Demo trading education language limits broker-style protection expectations.',
        'High profit-split and fast-payout marketing should not be read as regulated financial-service status.',
        'Singapore company disclosure should be cross-checked in official registers before treating the file as fully verified.',
      ],
      sources: [
        { label: 'FundedBull official site', url: 'https://fundedbull.com/' },
        { label: 'FundedBull Terms of Use', url: 'https://fundedbull.com/terms-of-use' },
        { label: 'FundedBull Trustpilot', url: 'https://www.trustpilot.com/review/fundedbull.com' },
      ],
    },
  }),
  universeFirm({
    id: 65,
    slug: 'prop-number-one',
    name: 'Prop Number One',
    website: 'https://propnumberone.com/',
    status: 'À surveiller',
    score: 31,
    founded: 2023,
    priceFrom: 0,
    incidents: 5,
    additionalSources: [
      { label: 'Prop Number One article/news search', url: 'https://www.google.com/search?q=%22Prop+Number+One%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official homepage returned no usable text during the July 8, 2026 PropRadar pass, and exact-name searches, including article/news searches, did not surface a reliable current prop-firm legal source or mainstream financial-press coverage. Legal entity, jurisdiction, terms, refund clauses and simulated-account disclosures remain unverified from primary sources.',
    auditSourcesChecked: ['Official homepage reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. PropRadar could not capture a usable official legal page in this environment, so no contracting entity or regulatory status should be inferred. Treat this as a stale or unresolved listing until a working legal source is found.',
      entities: [
        {
          name: 'Prop Number One',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official contracting entity not confirmed in PropRadar at this check.',
        'Regulator and public-warning checks still pending.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Payout, refund and rule-dispute complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'No usable primary legal text captured in the current pass.',
        'Exact-name search creates false-positive risk because the brand name is generic.',
        'Keep out of strong recommendations until official terms and entity are sourced.',
      ],
      sources: [
        { label: 'Prop Number One official site', url: 'https://propnumberone.com/' },
        { label: 'Prop Number One terms URL to recheck manually', url: 'https://propnumberone.com/terms-and-conditions/' },
        { label: 'Prop Number One Trustpilot', url: 'https://www.trustpilot.com/review/propnumberone.com' },
        { label: 'Prop Number One article/news search', url: 'https://www.google.com/search?q=%22Prop+Number+One%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 66,
    slug: 'karma-prop-traders',
    name: 'Karma Prop Traders',
    website: 'https://karmaproptraders.com/',
    status: 'Fermée',
    score: 38,
    founded: 2023,
    priceFrom: 0,
    incidents: 5,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site checked. Karma Prop Traders now says it has been acquired by Sway Funded, that purchases and trading have been paused at Karma Prop Traders, active accounts are to be migrated to Sway Funded, pending payouts should be handled through Sway, and all future purchases are Sway Funded accounts. Footer says Sway Funded LTD is not a broker and does not accept deposits, with a Saint Lucia registration number shown as 2024-00342.',
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'Closed / migration risk. Karma Prop Traders should not be promoted as an active standalone prop firm. The current official page points users to Sway Funded and says old accounts are being migrated. Legacy users must verify pending payouts, account balances and migration terms directly with Sway.',
      entities: [
        {
          name: 'Karma Prop Traders',
          jurisdiction: 'To verify',
          role: 'Former/migrating brand; no standalone current operator details captured beyond acquisition notice.',
        },
        {
          name: 'Sway Funded LTD / Sway Funded LLC',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2024-00342 on Karma footer; compare with Sway Funded current site disclosures',
          role: 'Acquirer / successor platform referenced by Karma Prop Traders site.',
        },
      ],
      regulatoryStatus: [
        'Current site says Karma Prop Traders has been acquired by Sway Funded.',
        'Purchases and trading are paused at Karma Prop Traders.',
        'All future purchases are Sway Funded accounts.',
        'Footer says Sway Funded LTD is not a broker and does not accept deposits.',
      ],
      complaintsAndDisputes: [
        'Legacy users should verify pending payouts and account migration status through Sway Funded support/email.',
        'The Sway registration number shown on Karma differs from the current Sway site disclosure captured separately, so entity continuity needs manual reconciliation.',
      ],
      redFlags: [
        'Standalone Karma purchases/trading are paused.',
        'Migration/acquisition creates payout and account-continuity risk.',
        'Different Sway entity labels/registration numbers appear across Sway/Karma pages.',
        'Do not recommend as an active standalone prop firm.',
      ],
      sources: [
        { label: 'Karma Prop Traders acquisition notice', url: 'https://karmaproptraders.com/' },
        { label: 'Karma Prop Traders terms page', url: 'https://karmaproptraders.com/terms' },
        { label: 'Sway Funded official site', url: 'https://swayfunded.com/' },
        { label: 'Karma Prop Traders Trustpilot search', url: 'https://www.trustpilot.com/search?query=Karma%20Prop%20Traders' },
      ],
    },
  }),
  universeFirm({
    id: 67,
    slug: 'wall-street-funded',
    name: 'Wall Street Funded',
    website: 'https://wallstreetfunded.com/',
    status: 'À surveiller',
    score: 57,
    founded: 2023,
    headquarters: 'Dubai / Saint Lucia / Cyprus',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site checked; wallstreetfunded.com redirects to wsfunded.com. The footer discloses WSF Technology FZCO in Dubai, WSFmarkets Ltd in Saint Lucia and RENATICA LTD in Cyprus for payment-related operations. The disclosure states that accounts are simulated, the company does not manage client funds, does not provide access to regulated financial instruments, does not execute or transmit orders and is not a broker or regulated investment firm.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. Wall Street Funded / WSFunded provides concrete entity disclosure, but the structure mixes Dubai, Saint Lucia and Cyprus roles while the homepage also uses strong funded-account and fast-payout marketing. The legal footer is clear that all accounts are simulated and that the company is not a broker, investment manager or regulated financial entity under major regimes. Treat user rights as contractual challenge/reward terms, not brokerage or client-money protection.',
      entities: [
        {
          name: 'WSF Technology FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registrationNumber: 'License No. 47001',
          registeredAddress: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
          role: 'Group/technology entity disclosed in official footer and general disclaimer.',
        },
        {
          name: 'WSFmarkets Ltd',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00117',
          registeredAddress: 'Ground Floor, Rodney Court Building, Rodney Bay, Gros Islet, Saint Lucia',
          role: 'Company under which accounts are offered according to the official simulated-trading disclosure.',
        },
        {
          name: 'RENATICA LTD.',
          jurisdiction: 'Cyprus',
          registeredAddress: 'Arch. Makariou III, 228 AGIOS PAVLOS COURT, Block A Floor 1, Office 113, 3030, Limassol, Cyprus',
          role: 'Operational/payment-related Cyprus office disclosed by WSF.',
        },
      ],
      regulatoryStatus: [
        'Official footer says all accounts offered by WSFmarkets Ltd under WSF Technology FZCO are not real trading accounts.',
        'Disclosure says the company does not manage client funds, hold or safeguard third-party money or provide access to regulated financial instruments.',
        'General disclaimer says WSF Technology FZCO is not a broker, investment manager or regulated financial entity under EU/MiFID II/ESMA/SEC/CFTC/DFSA or other international regulators.',
        'Disclosure says all trading activity is strictly simulated, with no real capital and no access to real financial markets.',
      ],
      complaintsAndDisputes: [
        'FAQ says minimum payment amount is $100 and payout rails differ below/above $500, including crypto and Rise availability.',
        'The site says WSFmarkets Ltd does not offer services to residents of the United States, Singapore, Russia, UAE, FATF-listed jurisdictions or sanctioned jurisdictions.',
      ],
      redFlags: [
        'Homepage wording says instant accounts start with real money, while footer says all accounts are simulated and do not access real financial markets.',
        'Multi-entity structure increases the need to check checkout entity and payout obligations.',
        'Saint Lucia company plus Dubai FZCO disclosure is not equivalent to broker or investment-firm authorization.',
      ],
      sources: [
        { label: 'Wall Street Funded / WSFunded official site', url: 'https://wsfunded.com/en' },
        { label: 'WSFunded legal notice', url: 'https://wsfunded.com/en/legal-notice' },
        { label: 'WSFunded terms and conditions', url: 'https://wsfunded.com/en/terms-and-conditions' },
        { label: 'WSFunded Trustpilot', url: 'https://www.trustpilot.com/review/wsfunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 68,
    slug: 'tradeday',
    name: 'TradeDay',
    website: 'https://www.tradeday.com/',
    status: 'Active',
    score: 75,
    founded: 2020,
    headquarters: 'United States',
    market: 'Futures',
    priceFrom: 99,
    payoutProof: true,
    styles: ['Futures'],
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-07',
      summary:
        'Low-to-medium regulatory risk. TradeDay is a US futures prop-firm brand with a cleaner public profile than many offshore competitors. Its terms identify TradeDay LLC as an Illinois limited liability company and describe evaluation, simulated and funded live account stages. PropRadar has not recorded a major official regulator warning at this check, but the prop-firm evaluation product still should not be treated as a normal regulated brokerage account.',
      entities: [
        {
          name: 'TradeDay LLC',
          jurisdiction: 'United States, Illinois',
          role:
            'Illinois limited liability company named in the official Terms and Conditions for TradeDay sites and services.',
        },
      ],
      regulatoryStatus: [
        'TradeDay terms describe trader evaluation services, simulated trading services, funded account services and related affiliates.',
        'Funded SIM accounts are explicitly simulated; Funded LIVE accounts are governed by separate agreements and are offered at TradeDay discretion after evaluation.',
        'TradeDay terms state that TradeDay is not registered with the SEC, CFTC, NFA, FINRA or another self-regulatory association in any capacity.',
        'The terms state that TradeDay is not a broker-dealer, commodity trading advisor or investment adviser and does not provide commodity trading advice.',
        'Any FCM/brokerage partner relationship should be checked in the live account agreement before assuming regulatory protection.',
      ],
      complaintsAndDisputes: [
        'Public complaint volume appears lower than several aggressive futures competitors, but rules, resets, drawdown and payout conditions still require review.',
        'No major public regulatory enforcement action is documented in PropRadar at this check.',
        'TradeDay terms allow rules and service conditions to be amended with notice, which matters for active subscribers.',
      ],
      redFlags: [
        'US futures prop-firm structure is more transparent than offshore setups, but still not equivalent to a standard regulated brokerage account.',
        'Separate Funded SIM and Funded LIVE agreements can change the user rights and obligations after passing evaluation.',
        'Fees are described as final / non-refundable in several cases, and unjustified payment disputes can trigger service refusal.',
        'Users must verify local eligibility and restrictions before using the service.',
        'FCM/broker partner details should be verified before relying on live-market protections.',
      ],
      sources: [
        { label: 'Official TradeDay site', url: 'https://www.tradeday.com/' },
        { label: 'TradeDay Terms and Conditions', url: 'https://www.tradeday.com/terms-and-conditions' },
        { label: 'TradeDay FAQs', url: 'https://tradeday.freshdesk.com/' },
        { label: 'Trustpilot TradeDay', url: 'https://www.trustpilot.com/review/tradeday.com' },
      ],
    },
  }),
  universeFirm({
    id: 69,
    slug: 'blusky-trading',
    name: 'BluSky Trading',
    website: 'https://blusky.pro/',
    status: 'À surveiller',
    score: 60,
    founded: 2022,
    headquarters: 'United States',
    market: 'Futures',
    priceFrom: 99,
    styles: ['Futures'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. BluSky discloses BluSky Trading Company LLC at a St. Petersburg, Florida address, uses futures funding/evaluation language and says payment settlement may be handled by Odeonpay ALE S.R.L. / Paysagi as merchant of record. The page has standard futures risk disclosure but does not clearly document broker/dealer, CTA, FCM or investment-adviser registration for the prop-firm product.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. BluSky gives a clear US company/address and a futures-only profile with platform providers such as Rithmic, Tradovate, Volumetrica, Tickblaze and Tradesea. The risk file remains medium because the official page relies on funded-account and real-capital marketing while the captured footer does not establish that BluSky itself is a registered broker, FCM, CTA or investment adviser. Payment settlement by Paysagi should also be separated from the actual service provider.',
      entities: [
        {
          name: 'BluSky Trading Company LLC',
          jurisdiction: 'United States, Florida',
          registeredAddress: '7901 4th St N Ste 300, St. Petersburg, FL 33702, United States',
          role: 'Company disclosed in the official site footer.',
        },
        {
          name: 'Odeonpay ALE S.R.L. / Paysagi',
          jurisdiction: 'To verify',
          role: 'Merchant of record / payment settlement provider disclosed by BluSky for certain payments.',
        },
      ],
      regulatoryStatus: [
        'Official site says BluSky provides funded trading accounts and evaluation programs.',
        'Footer includes futures risk disclosure and says trading futures and other financial instruments involves substantial risk of loss.',
        'No direct registration as broker-dealer, futures commission merchant, commodity trading advisor or investment adviser is documented in PropRadar at this check.',
      ],
      complaintsAndDisputes: [
        'FAQ says evaluation subscriptions are non-refundable and subscription products may recur.',
        'Brokerage data fees may apply in live capital accounts according to the FAQ.',
      ],
      redFlags: [
        'Funded-account marketing should be reconciled with the exact live-account agreement and broker/FCM provider before purchase.',
        'Payment processor / merchant-of-record role is not the same as service-provider responsibility.',
      ],
      sources: [
        { label: 'BluSky official site', url: 'https://blusky.pro/' },
        { label: 'BluSky Terms of Service', url: 'https://blusky.pro/terms' },
        { label: 'BluSky Trustpilot', url: 'https://www.trustpilot.com/review/blusky.pro' },
      ],
    },
  }),
  universeFirm({
    id: 70,
    slug: 'tradefundrr',
    name: 'TradeFundrr',
    website: 'https://tradefundrr.com/',
    status: 'À surveiller',
    score: 64,
    founded: 2021,
    headquarters: 'United States / T3 Global pathway',
    market: 'Futures',
    priceFrom: 99,
    styles: ['Futures'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and policy links checked. TradeFundrr separates simulated funding programs from a potential live-capital path through T3 Global. The site states that TradeFundrr is not a broker-dealer, investment adviser or financial planner, does not solicit or accept public investments and does not hold customer funds or securities. It also states that T3 Global is not a broker-dealer, investment adviser or FCM and does not conduct business with public customers.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. TradeFundrr is unusually explicit about sim versus live: everyone starts in simulated capital, and live desk capital through T3 Global is invitation-only for top performers. The legal upside is transparency; the legal caution is that T3 Trading Group registrations do not extend to TradeFundrr simulated funded accounts or to T3 Global, and T3 Global itself states it is not a broker-dealer, investment adviser or FCM.',
      entities: [
        {
          name: 'TradeFundrr',
          jurisdiction: 'United States',
          role: 'Platform/provider of simulated funding, trading technology and educational resources according to official disclosure.',
        },
        {
          name: 'T3 Global Trading, LLC',
          jurisdiction: 'United States',
          role: 'Institutional proprietary trading company / live-capital path for selected top performers; not a broker-dealer, investment adviser or FCM according to TradeFundrr disclosure.',
        },
        {
          name: 'T3 Trading Group, LLC',
          jurisdiction: 'United States',
          role: 'Separate T3 group broker-dealer referenced as SEC-registered and FINRA/SIPC member; registrations do not extend to T3 Global or TradeFundrr simulated accounts.',
        },
      ],
      regulatoryStatus: [
        'Official disclosure says TradeFundrr is not a broker-dealer, investment adviser or financial planner.',
        'TradeFundrr says it does not solicit or accept investments from the public and does not hold customer funds or securities.',
        'T3 Global disclosure says T3 Global is not a broker-dealer, investment adviser, futures commission merchant or provider requiring federal registration.',
        'T3 Trading Group registrations are separate and do not apply to T3 Global or TradeFundrr simulated funded accounts.',
      ],
      complaintsAndDisputes: [
        'First-month rebate depends on earning a qualifying payout and is not guaranteed.',
        'Not all traders qualify for T3 Global live-capital review or invitation.',
      ],
      redFlags: [
        'Institutional infrastructure claims should not be confused with direct broker/dealer protection for simulated accounts.',
        'Live-capital pathway is discretionary and reserved for top performers, not an automatic outcome of passing a challenge.',
      ],
      sources: [
        { label: 'TradeFundrr official site', url: 'https://tradefundrr.com/' },
        { label: 'TradeFundrr official homepage disclosures', url: 'https://tradefundrr.com/' },
        { label: 'TradeFundrr Trustpilot', url: 'https://www.trustpilot.com/review/tradefundrr.com' },
      ],
    },
  }),
  universeFirm({
    id: 71,
    slug: 'funded-futures-network',
    name: 'Funded Futures Network',
    website: 'https://fundedfuturesnetwork.com/',
    status: 'À surveiller',
    score: 33,
    founded: 2023,
    market: 'Futures',
    priceFrom: 0,
    incidents: 5,
    styles: ['Futures'],
    additionalSources: [
      { label: 'Funded Futures Network article/news search', url: 'https://www.google.com/search?q=%22Funded+Futures+Network%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and exact-name searches, including article/news searches, did not return a usable primary legal page or reliable mainstream/financial-press coverage during the July 8, 2026 PropRadar pass. Legal entity, terms, refund clauses, broker/FCM relationships and simulated/live account disclosures remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Trustpilot search', 'Exact-name article/news search', 'Futures broker/FCM checklist'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain did not return a usable primary page in this environment, so no contracting entity, jurisdiction or regulatory status should be inferred. Because this is a futures-named listing, broker/FCM/NFA/CFTC relationships must be documented before any recommendation.',
      entities: [
        {
          name: 'Funded Futures Network',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official terms, footer and company records.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Broker/FCM, NFA/CFTC and public-warning checks still pending.',
        'No reliable newspaper/financial-press article surfaced for the exact futures prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Public payout, platform and refund complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Official site did not expose usable legal pages in the current review path.',
        'Futures product claims require explicit broker/FCM and account-type documentation.',
        'Keep out of strong recommendations until legal entity and terms are sourced.',
      ],
      sources: [
        { label: 'Funded Futures Network official site', url: 'https://fundedfuturesnetwork.com/' },
        { label: 'Funded Futures Network Trustpilot', url: 'https://www.trustpilot.com/review/fundedfuturesnetwork.com' },
        { label: 'Funded Futures Network article/news search', url: 'https://www.google.com/search?q=%22Funded+Futures+Network%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 72,
    slug: 'daytraders-com',
    name: 'DayTraders.com',
    website: 'https://daytraders.com/',
    status: 'À surveiller',
    score: 59,
    founded: 2023,
    headquarters: 'United States',
    market: 'Futures',
    priceFrom: 99,
    styles: ['Futures'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and disclosures checked. DayTraders.com lists a Las Vegas address and provides futures-focused evaluation programs. The footer says evaluation and Pro accounts are simulated and do not involve real capital, while S2L live funded accounts involve real market execution. Risk disclosures say DayTraders.com provides educational resources and simulated trading environments, does not facilitate deposits or trading of actual funds and does not provide financial advice.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. DayTraders.com combines aggressive live-account marketing with detailed simulated-account disclosures. The site says Straight-to-Live can unlock a live brokerage account backed by real firm capital, but also states that evaluation and Pro accounts are simulated, that no actual funds are deposited or traded through the platform, and that customer compensation figures are hypothetical. The exact live-account agreement and brokerage/FCM relationship must be checked before relying on live-market protections.',
      entities: [
        {
          name: 'DayTraders.com',
          jurisdiction: 'United States, Nevada',
          registeredAddress: '2300 W Sahara Ave. Suite 800, Las Vegas, Nevada 89102, United States',
          role: 'Brand/operator address disclosed in official footer.',
        },
      ],
      regulatoryStatus: [
        'Official footer says DayTraders.com provides simulated trading environments for educational purposes.',
        'Evaluation and Pro accounts are disclosed as simulated and not involving real capital.',
        'S2L live funded accounts are described as involving real market execution.',
        'Risk disclosure says DayTraders.com does not facilitate deposits or trading of actual funds and does not provide financial advice.',
      ],
      complaintsAndDisputes: [
        'Disputes should be separated between evaluation/pro simulated accounts, S2F/S2L products, platform issues and live brokerage account terms.',
        'Customer compensation disclosures state displayed results are hypothetical and not necessarily indicative of typical experiences.',
      ],
      redFlags: [
        'Homepage says Trade Live / Not Simulated, while footer narrows that to S2L live funded accounts and labels evaluation/pro accounts simulated.',
        'Exact live brokerage/FCM agreement is needed before assuming regulatory protections.',
        'Customer compensation and pass-rate claims are hypothetical or variable, not guarantees.',
      ],
      sources: [
        { label: 'DayTraders.com official site', url: 'https://daytraders.com/' },
        { label: 'DayTraders.com Terms', url: 'https://daytraders.com/terms' },
        { label: 'DayTraders.com Trustpilot', url: 'https://www.trustpilot.com/review/daytraders.com' },
      ],
    },
  }),
  universeFirm({
    id: 73,
    slug: 'axi-select',
    name: 'Axi Select',
    website: 'https://www.axi.com/int/funded-trader-program',
    status: 'Active',
    score: 77,
    founded: 2023,
    headquarters: 'Saint Vincent and the Grenadines',
    market: 'Forex/CFD',
    priceFrom: 0,
    payoutProof: true,
    note: 'Broker-linked capital allocation program, not a classic paid challenge model.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Axi Select and Axi legal documentation checked. Axi Select is presented as a free capital allocation program for clients of AxiTrader LLC, with a minimum account equity/deposit requirement and standard trading fees. The legal footer identifies AxiTrader LLC in Saint Vincent and the Grenadines. PropRadar separates this from classic prop challenge firms because the trader uses an Axi trading account first, then may receive allocation under the program.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. Axi Select benefits from being tied to an established broker brand, but the international page identifies AxiTrader LLC in Saint Vincent and the Grenadines and the program is only available to clients of that entity. The model is materially different from challenge-fee prop firms: users must first trade and maintain minimum equity in an Axi account before progressing toward allocation. Treat it as a broker-linked capital allocation route, not as a simple free prop challenge.',
      entities: [
        {
          name: 'AxiTrader LLC',
          jurisdiction: 'Saint Vincent and the Grenadines',
          registrationNumber: '4303 LLC 2025',
          registeredAddress: 'Euro House, Richmond Hill Road, Kingstown, St. Vincent and the Grenadines',
          role: 'Axi international trading entity and Axi Select provider identified on the official legal footer.',
        },
      ],
      regulatoryStatus: [
        'Official Axi legal page says AxiTrader LLC is incorporated in Saint Vincent and the Grenadines and registered by the Financial Services Authority.',
        'Axi Select page says the program is only available to clients of AxiTrader LLC.',
        'Program requires a live trading account, minimum equity and trading performance before allocation eligibility.',
      ],
      complaintsAndDisputes: [
        'Use broker complaints handling and legal documentation, not only prop-firm review sites, when evaluating disputes.',
      ],
      redFlags: [
        'Do not compare Axi Select directly with paid demo-challenge firms: the user may need a live account, minimum equity and exposure to CFD trading risk.',
        'International SVG entity does not equal top-tier local regulation for every client region.',
      ],
      sources: [
        { label: 'Axi Select official page', url: 'https://www.axi.com/int/funded-trader-program' },
        { label: 'Axi legal documentation', url: 'https://www.axi.com/int/legal-documentation' },
        { label: 'Axi Trustpilot', url: 'https://www.trustpilot.com/review/axi.com' },
      ],
    },
  }),
  universeFirm({
    id: 74,
    slug: 'kortanafx',
    name: 'KortanaFX',
    website: 'https://kortanafx.com/',
    status: 'À surveiller',
    score: 42,
    founded: 2023,
    headquarters: 'United Arab Emirates',
    priceFrom: 147,
    profitSplit: 100,
    payoutProof: true,
    incidents: 4,
    styles: ['HFT friendly', 'Simulated evaluation', 'DXTrade', 'cTrader', 'MT5 paused'],
    productName: 'KortanaFX Challenges',
    productDescription:
      'HFT-friendly simulated funding challenges up to $200k, but the official site currently announces that operations are paused after losing the MT5 license.',
    accountSizeMin: 5000,
    accountSizeMax: 200000,
    profitTarget: '8% / 5% on displayed challenge table',
    maxDailyLoss: '5%',
    maxDrawdown: '10%',
    platforms: ['DXTrade', 'cTrader', 'TradeLocker planned', 'MT5 paused/lost license'],
    tradableAssets: ['Forex', 'CFD', 'To verify by platform'],
    minTradingDays: 'Unlimited trading period advertised',
    consistencyRule: 'HFT friendly; broad forbidden-trading discretion in Terms still applies.',
    note:
      'Official announcement says operations are temporarily paused after losing the MT5 license. Do not treat as an active recommendation until the firm publishes a working platform/legal update.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms and Refund Policy checked. Kortana announces operations are paused until further notice because it lost its MT5 license. Footer discloses KortanaFX F.Z.C. at Office 906, Al Serkal Building 2, Port Saeed, Dubai, UAE. Terms say services are simulated trading tools, demo funds are fictitious, trading is not real, no investment services/advice are provided, fees are not deposits and trading occurs on demo accounts only.',
    auditSourcesChecked: ['Official site', 'Terms', 'Refund Policy', 'FAQ/rules link', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High operational risk. Kortana provides useful UAE entity and simulated/no-deposit legal language, but the official announcement says all operations are paused after the loss of the MT5 license. That makes payout/account-continuity and platform migration risk more important than the headline challenge terms.',
      entities: [
        {
          name: 'KortanaFX F.Z.C.',
          jurisdiction: 'United Arab Emirates',
          registeredAddress: 'Office 906, Al Serkal Building 2, Port Saeed, Dubai, UAE',
          role: 'Website owner/operator disclosed in official footer.',
        },
      ],
      regulatoryStatus: [
        'Official announcement says operations are paused until further notice after the firm lost its MT5 license.',
        'Terms say services consist of tools for simulated trading, analytics, training and educational materials.',
        'Terms say trading through the services is not real and demo funds are fictitious.',
        'Footer says fees are not deposits, Kortana does not offer financial advice and does not issue or deal in financial products.',
        'Terms say legal relations are governed by UAE law and disputes fall under UAE courts with local jurisdiction for the provider.',
      ],
      complaintsAndDisputes: [
        'Refund policy says consumers lose the 14-day withdrawal right once they start demo trades.',
        'Terms say customers are not entitled to refunds if they cancel, fail, violate terms or terminate services prematurely.',
        'Operational pause requires manual review of legacy accounts, open payouts, refunds and platform replacement notices.',
      ],
      redFlags: [
        'Operations paused after MT5 license loss.',
        'No active recommendation until operations and platform access are restored.',
        'Broad forbidden-trading and refund-denial clauses.',
        'United Arab Emirates legal venue may be difficult for many retail users.',
      ],
      sources: [
        { label: 'KortanaFX official site', url: 'https://kortanafx.com/' },
        { label: 'KortanaFX Terms', url: 'https://kortanafx.com/terms.html' },
        { label: 'KortanaFX Refund Policy', url: 'https://kortanafx.com/refund.html' },
        { label: 'KortanaFX Trustpilot search', url: 'https://www.trustpilot.com/search?query=KortanaFX' },
      ],
    },
  }),
  universeFirm({
    id: 75,
    slug: 'thinkcapital',
    name: 'ThinkCapital',
    website: 'https://www.thinkcapital.com/',
    status: 'À surveiller',
    score: 65,
    founded: 2024,
    headquarters: 'United Kingdom',
    priceFrom: 39,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. ThinkCapital contracts through TFG (Payments) Limited at a London registered office. The terms state that trading is simulated, demo funds are fictitious, the provider is not authorised or regulated as a financial services or investment firm, and ThinkMarkets group regulatory permissions do not extend to the ThinkCapital customer contract.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. ThinkCapital is more transparent than many new firms because the terms identify TFG (Payments) Limited and make the ThinkMarkets relationship explicit. The same terms are also clear that services are simulated, funds are fictitious, no investment service is provided, and the provider is not authorised or regulated as a financial services or investment firm. The broker-backed branding helps traceability, but it should not be read as broker-level client-money or investor-compensation protection.',
      entities: [
        {
          name: 'TFG (Payments) Limited',
          jurisdiction: 'United Kingdom',
          registeredAddress: '85 Great Portland Street, First Floor, London, England W1W 7LT',
          role: 'Contracting provider for ThinkCapital services in the official terms.',
        },
      ],
      regulatoryStatus: [
        'Terms state that ThinkCapital services are tools for simulated trading and demo trading.',
        'Terms state that the provider is not authorised or regulated as a financial services or investment firm in any jurisdiction.',
        'Terms state that ThinkMarkets group permissions, client-money protections and investor compensation do not extend to ThinkCapital customers.',
      ],
      complaintsAndDisputes: [
        'Terms allow service refusal or termination for restricted jurisdictions, compliance risks, chargebacks and rule breaches.',
        'Refund language includes conditions and possible processing fee; review current refund policy before purchase.',
      ],
      redFlags: [
        'Broker-backed marketing must not be confused with regulated broker protection for the prop contract.',
        'Simulated funds and demo trading mean payout rights are contract/rule-based, not normal brokerage withdrawal rights.',
      ],
      sources: [
        { label: 'ThinkCapital official site', url: 'https://www.thinkcapital.com/' },
        { label: 'ThinkCapital Terms of Service', url: 'https://www.thinkcapital.com/terms-of-services/' },
        { label: 'ThinkCapital Trustpilot', url: 'https://www.trustpilot.com/review/thinkcapital.com' },
      ],
    },
  }),
  universeFirm({
    id: 76,
    slug: 'ic-funded',
    name: 'IC Funded',
    website: 'https://icfunded.com/',
    status: 'À surveiller',
    score: 65,
    founded: 2024,
    headquarters: 'Saint Lucia',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. IC Funded lists a Rodney Bay, Saint Lucia address and states that services are exclusively in a simulated trading environment using virtual funds. The footer says accounts are demo only, do not involve real-market execution, real capital or custody of client funds, and that IC Funded is not a broker and does not accept deposits.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. IC Funded is explicit about the simulated model and non-broker status, which is useful disclosure. The risk remains elevated because the legal footprint surfaced in the official site is a Saint Lucia address rather than a clearly regulated investment-firm structure, and the terms give the company broad discretion around KYC, compliance risk, refunds, chargebacks, account termination and payout cancellation after violations.',
      entities: [
        {
          name: 'IC Funded',
          jurisdiction: 'Saint Lucia',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Brand/operator address shown on the official site footer.',
        },
      ],
      regulatoryStatus: [
        'Official footer states services use a simulated trading environment with virtual funds.',
        'Official footer states demo accounts only, no real-market execution, no real capital and no custody of client funds.',
        'Official footer states IC Funded is not a broker, does not provide brokerage services, does not accept deposits and does not offer investment management services.',
      ],
      complaintsAndDisputes: [
        'Terms say refunds are not granted after any trade is executed and may be refused after chargeback or prohibited behavior.',
        'Terms allow denial of funded accounts, termination and cancellation of rewards or payouts when KYC or compliance issues arise.',
      ],
      redFlags: [
        'Saint Lucia address and simulated-only model require stronger source checks before treating the offer as low risk.',
        'Refund and chargeback rules are strict once trading activity starts.',
      ],
      sources: [
        { label: 'IC Funded official site', url: 'https://www.icfunded.com/evaluations' },
        { label: 'IC Funded Terms and Conditions', url: 'https://www.icfunded.com/terms-and-conditions' },
        { label: 'IC Funded Trustpilot', url: 'https://www.trustpilot.com/review/icfunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 77,
    slug: 'traddoo',
    name: 'Traddoo',
    website: 'https://traddoo.com/',
    status: 'À surveiller',
    score: 38,
    founded: 2023,
    priceFrom: 0,
    incidents: 5,
    additionalSources: [
      { label: 'Traddoo article/news search', url: 'https://www.google.com/search?q=%22Traddoo%22+%22prop+firm%22+article+news' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and likely legal URLs did not return usable primary legal text during the July 8, 2026 PropRadar pass. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Legal entity, jurisdiction, terms, refund policy, simulated-account language and regulator/public-warning checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely legal URLs', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain did not return a usable primary page in this environment, so no contracting entity or regulatory status should be inferred. This entry should remain outside recommendation pages until current terms, entity and refund rules are captured.',
      entities: [
        {
          name: 'Traddoo',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Regulator status and public warning checks still pending.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
      ],
      complaintsAndDisputes: [
        'Payout, refund and account-termination complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Primary legal pages were not accessible through the current automated review path.',
        'No checkout entity, refund policy or simulated-account disclaimer captured.',
        'Keep out of strong recommendations until official entity and terms are sourced.',
      ],
      sources: [
        { label: 'Traddoo official site', url: 'https://traddoo.com/' },
        { label: 'Traddoo terms URL to recheck manually', url: 'https://traddoo.com/terms-and-conditions/' },
        { label: 'Traddoo refund URL to recheck manually', url: 'https://traddoo.com/refund-policy/' },
        { label: 'Traddoo Trustpilot', url: 'https://www.trustpilot.com/review/traddoo.com' },
        { label: 'Traddoo article/news search', url: 'https://www.google.com/search?q=%22Traddoo%22+%22prop+firm%22+article+news' },
      ],
    },
  }),
  universeFirm({
    id: 78,
    slug: 'fx2-funding',
    name: 'FX2 Funding',
    website: 'https://fx2funding.com/',
    status: 'À surveiller',
    score: 59,
    founded: 2023,
    headquarters: 'Saint Lucia / Prop Account LTD affiliate',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. FX2 Funding discloses FX2 Funding, LTD in Saint Lucia with registry number 2025-00108 and says it is an affiliate of Prop Account LTD. The footer states that Prop Account LTD provides fee-based simulated trading assessments, all funding assessments are provided by Prop Account LTD, and assessment fees are paid to Prop Account LTD. FX2 Funding also says it does not offer services to residents or citizens of the USA or Canada.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. FX2 Funding provides concrete entity disclosure and a Prop Account LTD relationship, but the structure is materially offshore and explicitly tied to fee-based simulated trading assessments. The site uses real-payout and real-capital marketing language while the footer says all funding assessments are provided by Prop Account LTD and services are restricted for US/Canada. Users should check the current Dashboard Analytix / Prop Account terms before purchase.',
      entities: [
        {
          name: 'FX2 Funding, LTD',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00108',
          registeredAddress: 'The Sotheby Building, Ground Floor, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Brand/entity disclosed in official footer.',
        },
        {
          name: 'Prop Account LTD',
          jurisdiction: 'To verify',
          role: 'Affiliate / assessment provider disclosed by FX2 Funding; provides fee-based simulated trading assessments and receives assessment fees.',
        },
      ],
      regulatoryStatus: [
        'Official footer says FX2 Funding, LTD does not offer, solicit or recommend trading or investment services.',
        'Official footer says Prop Account LTD provides fee-based simulated trading assessments for potential traders.',
        'All funding assessments are provided by Prop Account LTD and all assessment fees are paid to Prop Account LTD according to the footer.',
        'If a trader qualifies for a funded account, the footer says they must enter into a Trader Agreement with Prop Account LTD.',
      ],
      complaintsAndDisputes: [
        'Services are not offered to residents or citizens of the United States or Canada according to the footer.',
        'Payout claims and instant-funded-account marketing should be reconciled with Prop Account LTD terms and the Trader Agreement before purchase.',
      ],
      redFlags: [
        'Saint Lucia entity plus separate Prop Account LTD assessment provider increases entity-mapping risk.',
        'Real capital / instant funded marketing should be read alongside simulated-assessment disclosure.',
        'Restricted US/Canada language is important for eligibility and payout risk.',
      ],
      sources: [
        { label: 'FX2 Funding official site', url: 'https://fx2funding.com/' },
        { label: 'FX2 Funding KYC / AML policies', url: 'https://fx2funding.com/kyc-aml-policies/' },
        { label: 'Dashboard Analytix / Prop Account terms', url: 'https://dashboardanalytix.com/terms' },
        { label: 'FX2 Funding Trustpilot', url: 'https://www.trustpilot.com/review/fx2funding.com' },
      ],
    },
  }),
  universeFirm({
    id: 79,
    slug: 'rocket21-challenge',
    name: 'Rocket21 Challenge',
    website: 'https://rocket21challenge.com/',
    status: 'À surveiller',
    score: 60,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: 'Rocket21 Challenge terms URL to recheck manually', url: 'https://rocket21challenge.com/terms-and-conditions/' },
      { label: 'Rocket21 Challenge Trustpilot', url: 'https://www.trustpilot.com/review/rocket21challenge.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Rocket21 Challenge official pages timed out or returned no usable legal text during the July 8, 2026 PropRadar review. Contracting entity, current operating status, terms, refunds and platform/provider disclosures remain unverified, so PropRadar treats the page as a high-information-risk watchlist entry rather than a recommendation.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain did not return usable primary legal text in this environment, so no contracting entity, jurisdiction or regulator status should be inferred. A fresh manual check is required before this firm appears in any positive buying list.',
      entities: [
        {
          name: 'Rocket21 Challenge',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Regulator and public-warning checks still pending.',
      ],
      complaintsAndDisputes: [
        'Public complaints need manual classification against official terms once accessible.',
      ],
      redFlags: [
        'Primary legal pages were not accessible through the current automated review path.',
        'No contracting entity should be inferred from third-party listings alone.',
        'Terms, refund rules and simulated/live account language remain uncaptured.',
      ],
      sources: [
        { label: 'Rocket21 Challenge official site', url: 'https://rocket21challenge.com/' },
        { label: 'Rocket21 Challenge terms URL to recheck manually', url: 'https://rocket21challenge.com/terms-and-conditions/' },
        { label: 'Rocket21 Challenge Trustpilot', url: 'https://www.trustpilot.com/review/rocket21challenge.com' },
      ],
    },
  }),
  universeFirm({
    id: 80,
    slug: 'glow-node',
    name: 'Glow Node',
    website: 'https://glow-node.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2022,
    priceFrom: 49,
    additionalSources: [
      { label: 'Sway Funded official timeline', url: 'https://swayfunded.com/' },
      { label: 'Glow Node Trustpilot', url: 'https://www.trustpilot.com/review/glow-node.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited primary-source pass completed. Glow Node standalone pages were not safely openable on July 8, 2026, but Sway Funded official timeline says it bought Glow Node and its entire user base in Aug. 2024. Treat Glow Node as an acquisition/migration case: standalone legal terms, legacy obligations and post-migration payout responsibility still need manual confirmation.',
    auditSourcesChecked: ['Glow Node official domain', 'Sway Funded official timeline/footer', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information and migration risk. Sway Funded publicly says it bought Glow Node and its entire user base, but the Glow Node standalone legal pages were not captured. Users should not treat old Glow Node reviews, old challenge terms or old checkout screenshots as current contractual evidence without confirming how Sway Funded assumed or did not assume legacy obligations.',
      entities: [
        {
          name: 'Glow Node',
          jurisdiction: 'To verify',
          role: 'Legacy prop-firm brand/operator; standalone legal entity not confirmed from current accessible pages.',
        },
        {
          name: 'SF Funded LTD',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2026-00408',
          role: 'Sway Funded entity disclosed in the current Sway Funded footer; relevant if Glow Node users were migrated into Sway infrastructure.',
        },
        {
          name: 'Corvexia Holding LTD',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE 489845',
          role: 'Independent payment agent disclosed by Sway Funded for payments including fees and payouts.',
        },
      ],
      regulatoryStatus: [
        'Sway Funded official timeline says Sway Funded bought Glow Node and its entire user base in Aug. 2024.',
        'Sway Funded footer states SF Funded LTD operates a simulated trading environment using virtual funds.',
        'Sway Funded footer states SF Funded LTD is not a broker or financial institution and does not accept deposits or execute trades for users.',
        'Glow Node standalone contracting entity, terms and refund policy were not captured in this pass.',
      ],
      complaintsAndDisputes: [
        'Historical Glow Node payout/support complaints must be split between pre-acquisition obligations and any Sway post-migration handling.',
        'Any user migration promise should be checked against Sway dashboard terms before assuming continuity.',
      ],
      redFlags: [
        'Standalone Glow Node legal pages were not safely accessible through the current automated review path.',
        'Acquisition/migration means old reviews may not map cleanly to current responsibility.',
        'Sway Funded uses simulated-account, non-broker and no-deposit language; this is not broker-style client-money protection.',
      ],
      sources: [
        { label: 'Sway Funded official site and timeline', url: 'https://swayfunded.com/' },
        { label: 'Glow Node official site', url: 'https://glow-node.com/' },
        { label: 'Glow Node Trustpilot', url: 'https://www.trustpilot.com/review/glow-node.com' },
      ],
    },
  }),
  universeFirm({
    id: 81,
    slug: 'funded-engineer',
    name: 'Funded Engineer',
    website: 'https://fundedengineer.com/',
    status: 'Fermée',
    score: 10,
    founded: 2023,
    incidents: 5,
    note: 'Closed archive: do not treat as a current buying option.',
    additionalSources: [
      { label: 'Funded Engineer terms URL to recheck manually', url: 'https://fundedengineer.com/terms-and-conditions/' },
      { label: 'Funded Engineer Trustpilot', url: 'https://www.trustpilot.com/review/fundedengineer.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Closed-archive pass completed. The live Funded Engineer domain returned no usable content during the July 8, 2026 PropRadar review. The profile stays as a critical closure-risk memory entry, not a current purchase candidate; legal entity, final closure terms, refund status and unresolved payout obligations still require archived primary documents or user evidence.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page', 'Closed-risk archive classification'],
    regulatoryAudit: {
      riskLevel: 'Critical',
      lastChecked: '2026-07-08',
      summary:
        'Critical archive risk. The firm is treated as closed in PropRadar and the official site did not provide usable current legal text in this pass. This profile should be used as a sector-risk memory entry, not as an option to buy or promote.',
      entities: [
        {
          name: 'Funded Engineer',
          jurisdiction: 'To reconstruct from archived terms',
          role: 'Former brand/operator to identify from archived legal pages, invoices and payment records.',
        },
      ],
      regulatoryStatus: [
        'Current official legal entity not confirmed from live primary pages.',
        'Operating status treated as closed in PropRadar.',
        'Regulator and public-warning checks should be repeated only for historical risk classification.',
      ],
      complaintsAndDisputes: [
        'Historical complaints should be classified around closure, payout obligations, refunds and account access.',
      ],
      redFlags: [
        'Closed/archived profile, not a current purchase option.',
        'Live official site did not provide usable legal text in this pass.',
        'Do not rely on old promotions, affiliate pages or cached screenshots as current status evidence.',
        'Any historical refund or payout claim needs dated evidence because no live legal text was captured.',
      ],
      sources: [
        { label: 'Funded Engineer official domain', url: 'https://fundedengineer.com/' },
        { label: 'Funded Engineer terms URL to recheck manually', url: 'https://fundedengineer.com/terms-and-conditions/' },
        { label: 'Funded Engineer Trustpilot', url: 'https://www.trustpilot.com/review/fundedengineer.com' },
      ],
    },
  }),
  universeFirm({
    id: 82,
    slug: 'skilled-funded-traders',
    name: 'Skilled Funded Traders',
    website: 'https://skilledfundedtraders.com/',
    status: 'À surveiller',
    score: 35,
    founded: 2022,
    incidents: 5,
    note: 'High-risk archive/watchlist: operating status and user obligations must be rechecked before any recommendation.',
    additionalSources: [
      { label: 'Skilled Funded Traders terms URL to recheck manually', url: 'https://skilledfundedtraders.com/terms-and-conditions/' },
      { label: 'Skilled Funded Traders Trustpilot', url: 'https://www.trustpilot.com/review/skilledfundedtraders.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. The official Skilled Funded Traders domain could not be safely opened during the July 8, 2026 PropRadar review. Because the profile already carries multiple incident flags, PropRadar keeps it as a high-risk watchlist/archive until operating status, current entity, payout obligations and refund posture are confirmed from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page', 'Incident/watchlist classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High regulatory and operational risk. The live domain was not accessible enough to confirm current legal entity or operating terms, and the profile has historical incident flags. Treat the firm as a risk case unless fresh official documents prove active operations and payout reliability.',
      entities: [
        {
          name: 'Skilled Funded Traders',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from current or archived legal pages and company records.',
        },
      ],
      regulatoryStatus: [
        'Current legal entity not confirmed in PropRadar at this check.',
        'Operating status, regulator status and public warnings still require manual verification.',
      ],
      complaintsAndDisputes: [
        'Historical incidents should be classified by payout denials, shutdown/access issues, refunds and communication failures.',
      ],
      redFlags: [
        'Primary legal pages were not safely accessible through the current automated review path.',
        'Multiple incident flags already present in PropRadar.',
        'Keep out of recommendations until current terms and payout track record are independently sourced.',
      ],
      sources: [
        { label: 'Skilled Funded Traders official domain', url: 'https://skilledfundedtraders.com/' },
        { label: 'Skilled Funded Traders terms URL to recheck manually', url: 'https://skilledfundedtraders.com/terms-and-conditions/' },
        { label: 'Skilled Funded Traders Trustpilot', url: 'https://www.trustpilot.com/review/skilledfundedtraders.com' },
      ],
    },
  }),
  universeFirm({
    id: 83,
    slug: 'funding-talent',
    name: 'Funding Talent',
    website: 'https://fundingtalent.com/',
    status: 'Fermée',
    score: 8,
    founded: 2019,
    incidents: 6,
    note: 'Closed risk archive kept for sector memory.',
    additionalSources: [
      { label: 'Funding Talent terms URL to recheck manually', url: 'https://fundingtalent.com/terms-and-conditions/' },
      { label: 'Funding Talent Trustpilot', url: 'https://www.trustpilot.com/review/fundingtalent.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Closed-archive pass completed. The Funding Talent official domain returned 403 Forbidden during the July 8, 2026 PropRadar review. Funding Talent remains a closed archive with severe incident history; legal entity, shutdown timeline, user claims and refund/payout posture must be reconstructed from archived primary documents and credible user evidence.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page', 'Closed-risk archive classification'],
    regulatoryAudit: {
      riskLevel: 'Critical',
      lastChecked: '2026-07-08',
      summary:
        'Critical archive risk. Funding Talent is not a current recommendation candidate. The live domain did not expose usable legal text, and the profile is kept as a historical warning entry for prop-firm closure and payout-risk analysis.',
      entities: [
        {
          name: 'Funding Talent',
          jurisdiction: 'To reconstruct from archived terms',
          role: 'Former brand/operator to identify from archived official pages and payment records.',
        },
      ],
      regulatoryStatus: [
        'Current legal entity not confirmed from live official pages.',
        'Operating status treated as closed in PropRadar.',
        'Historical regulator/public-warning checks should be preserved if found in archive research.',
      ],
      complaintsAndDisputes: [
        'Historical claims should be categorized around closure, funded-account continuity, refunds, payout denials and communication.',
      ],
      redFlags: [
        'Closed profile with severe incident score.',
        'Official domain blocked current review with 403 Forbidden.',
        'Do not treat old review ratings or old marketing claims as usable buying signals.',
      ],
      sources: [
        { label: 'Funding Talent official domain', url: 'https://fundingtalent.com/' },
        { label: 'Funding Talent terms URL to recheck manually', url: 'https://fundingtalent.com/terms-and-conditions/' },
        { label: 'Funding Talent Trustpilot', url: 'https://www.trustpilot.com/review/fundingtalent.com' },
      ],
    },
  }),
  universeFirm({
    id: 84,
    slug: 'blufx',
    name: 'BluFX',
    website: 'https://blufx.co.uk/',
    status: 'À surveiller',
    score: 38,
    founded: 2015,
    incidents: 5,
    note: 'Controversial historical profile: exclude from strong recommendations without fresh official evidence.',
    additionalSources: [
      { label: 'BluFX terms URL to recheck manually', url: 'https://blufx.co.uk/terms-and-conditions/' },
      { label: 'BluFX Trustpilot', url: 'https://www.trustpilot.com/review/blufx.co.uk' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. The BluFX official domain could not be safely opened during the July 8, 2026 PropRadar review. BluFX remains a controversial historical watchlist entry until current operating status, legal entity, user contract, broker relationship and recent payout evidence are confirmed from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page', 'Historical-risk classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High risk pending reconstruction. The brand has a long and controversial public history, but the live official domain did not provide usable current legal text in this pass. Keep it out of recommendations unless fresh primary-source evidence proves active, transparent and payout-reliable operations.',
      entities: [
        {
          name: 'BluFX',
          jurisdiction: 'United Kingdom / To verify',
          role: 'Brand/operator to identify from current or archived terms and company records.',
        },
      ],
      regulatoryStatus: [
        'Current legal entity and regulatory status not confirmed in PropRadar at this check.',
        'Operating status and broker/provider relationship must be rechecked manually.',
      ],
      complaintsAndDisputes: [
        'Historical disputes should be separated between subscription access, account restrictions, payouts and closure/operational continuity.',
      ],
      redFlags: [
        'Primary legal pages were not safely accessible through the current automated review path.',
        'Long controversial history and multiple incident flags.',
        'Do not include in top lists without fresh official terms and recent payout evidence.',
      ],
      sources: [
        { label: 'BluFX official domain', url: 'https://blufx.co.uk/' },
        { label: 'BluFX terms URL to recheck manually', url: 'https://blufx.co.uk/terms-and-conditions/' },
        { label: 'BluFX Trustpilot', url: 'https://www.trustpilot.com/review/blufx.co.uk' },
      ],
    },
  }),
  universeFirm({
    id: 85,
    slug: 'traders-central',
    name: 'Traders Central',
    website: 'https://traderscentral.com/',
    status: 'À surveiller',
    score: 61,
    founded: 2020,
    priceFrom: 49,
    additionalSources: [
      { label: 'Traders Central terms URL to recheck manually', url: 'https://traderscentral.com/terms-and-conditions/' },
      { label: 'Traders Central Trustpilot', url: 'https://www.trustpilot.com/review/traderscentral.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Traders Central official pages could not be safely opened during the July 8, 2026 PropRadar review. The firm still needs a fresh primary-source audit covering legal entity, simulated/live account language, refund terms, broker/provider links and current operating status before it can be ranked positively.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain was not accessible enough in this environment to confirm current contracting entity or regulatory status. No legal structure, regulator status or payout obligation should be inferred from older listings without a current official source.',
      entities: [
        {
          name: 'Traders Central',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Current legal entity not confirmed in PropRadar at this check.',
        'Regulator, public-warning and broker/provider checks still pending.',
      ],
      complaintsAndDisputes: [
        'Payout, subscription/refund and platform complaints need manual classification against current terms.',
      ],
      redFlags: [
        'Primary legal pages were not safely accessible through the current automated review path.',
        'Do not infer legal structure from third-party lists or old promotions.',
        'Terms, refund posture and simulated/live-account language remain uncaptured.',
      ],
      sources: [
        { label: 'Traders Central official site', url: 'https://traderscentral.com/' },
        { label: 'Traders Central terms URL to recheck manually', url: 'https://traderscentral.com/terms-and-conditions/' },
        { label: 'Traders Central Trustpilot', url: 'https://www.trustpilot.com/review/traderscentral.com' },
      ],
    },
  }),
  universeFirm({
    id: 86,
    slug: 'my-flash-funding',
    name: 'My Flash Funding',
    website: 'https://myflashfunding.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2023,
    headquarters: 'United States / Saint Lucia via Sway Funded',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site checked. MyFlashFunding says it is now owned by Sway Funded, still displays MyFlashFunding LLC copyright, and says MyFlashFunding has been acquired by Sway Funded LTD. The footer also states Sway Funded LTD is not a broker and does not accept deposits, and references Sway Funded LLC registration number 2024-00342 in Saint Lucia.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. My Flash Funding is no longer a clean standalone profile: the official site says it has been acquired by Sway Funded and routes purchases through Sway Funded infrastructure. The footer frames information as educational, says Sway Funded is not a broker and does not accept deposits, and identifies a Saint Lucia registration for Sway Funded LLC. Users should evaluate it as a Sway Funded migration/acquisition case rather than an independent firm.',
      entities: [
        {
          name: 'MyFlashFunding LLC',
          jurisdiction: 'United States / To verify',
          role: 'Legacy entity shown in site copyright.',
        },
        {
          name: 'Sway Funded LTD',
          jurisdiction: 'To verify',
          role: 'Acquirer / current operator disclosed in official footer.',
        },
        {
          name: 'Sway Funded LLC',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2024-00342',
          role: 'Platform/data-feed entity referenced in the official footer.',
        },
      ],
      regulatoryStatus: [
        'Official page says MyFlashFunding is now owned by Sway Funded.',
        'Footer says MyFlashFunding has been acquired by Sway Funded LTD.',
        'Footer says Sway Funded LTD is not a broker and does not accept deposits.',
        'Footer says offered technical solution for Sway Funded LLC platforms and data feed is powered by third-party liquidity providers.',
      ],
      complaintsAndDisputes: [
        'Legacy MyFlashFunding complaints should be separated from Sway Funded post-acquisition account migration and payout claims.',
        'Purchase flow routes to my.swayfunded.com, so checkout terms must be checked there before buying.',
      ],
      redFlags: [
        'Brand acquisition/migration means old reviews may not map cleanly to current obligations.',
        'Saint Lucia registration and non-broker/no-deposit language reduce broker-style protection expectations.',
        'Legacy copyright and current Sway ownership language require entity-mapping before purchase.',
      ],
      sources: [
        { label: 'My Flash Funding official site', url: 'https://myflashfunding.com/' },
        { label: 'Sway Funded checkout', url: 'https://my.swayfunded.com/' },
        { label: 'My Flash Funding Trustpilot', url: 'https://www.trustpilot.com/review/myflashfunding.com' },
      ],
    },
  }),
  universeFirm({
    id: 87,
    slug: 'blueberry-funded',
    name: 'Blueberry Funded',
    website: 'https://blueberryfunded.com/',
    status: 'À surveiller',
    score: 64,
    founded: 2024,
    headquarters: 'Saint Vincent and the Grenadines / Australia',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. Blueberry Funded says it is owned and operated by Blueberry Markets (SVG) LLC in Saint Vincent and the Grenadines, with treasury services facilitated by BBF Treasury Pty Ltd. The footer says BlueberryFunded offers only virtual accounts and that funds paid are subscription fees for trading challenges, not client money.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. Blueberry Funded has useful corporate disclosure and a recognizable Blueberry Markets connection, but the prop-firm product is framed as virtual-account challenge access through Blueberry Markets (SVG) LLC rather than a regulated brokerage account. The official footer also states that paid funds are subscriptions and do not constitute client money. That makes the legal analysis closer to a challenge subscription product than to protected broker custody.',
      entities: [
        {
          name: 'Blueberry Markets (SVG) LLC',
          jurisdiction: 'Saint Vincent and the Grenadines',
          registrationNumber: '2090 LLC 2022',
          registeredAddress: 'Euro House, Richmond Hill Road, P.O Box 2897, Kingstown, Saint Vincent and the Grenadines VC0100',
          role: 'Owner and operator disclosed on the Blueberry Funded official footer.',
        },
        {
          name: 'BBF Treasury Pty Ltd',
          jurisdiction: 'Australia',
          role: 'Treasury-services facilitator disclosed on the official footer.',
        },
      ],
      regulatoryStatus: [
        'Official footer states BlueberryFunded offers only virtual accounts within challenges.',
        'Official footer states funds paid to BlueberryFunded do not constitute client money and are subscription fees.',
        'Broker-backed branding should be separated from the legal terms of the challenge program.',
      ],
      complaintsAndDisputes: [
        'Review the PDF terms and outline/fees before purchase because the footer points to subscription-style challenge access rather than client-money treatment.',
      ],
      redFlags: [
        'Saint Vincent and the Grenadines operator for the prop product is not the same risk profile as a top-tier regulated brokerage account.',
        'Subscription fees and virtual accounts reduce broker-style protection expectations.',
      ],
      sources: [
        { label: 'Blueberry Funded official site', url: 'https://blueberryfunded.com/' },
        { label: 'Blueberry Funded terms PDF', url: 'https://blueberryfunded.com/wp-content/uploads/2024/08/BBF-Technology-Access-and-Trader-Assessment-Program-Terms-and-Conditions.pdf' },
        { label: 'Blueberry Funded outline and fees PDF', url: 'https://blueberryfunded.com/wp-content/uploads/2026/03/BBF-Trading-Evaluation-Outline-and-Fees-11.pdf-6.pdf' },
        { label: 'Blueberry Funded Trustpilot', url: 'https://www.trustpilot.com/review/blueberryfunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 88,
    slug: 'funded-squad',
    name: 'Funded Squad',
    website: 'https://fundedsquad.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2023,
    headquarters: 'Dubai, United Arab Emirates',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, footer and policy links checked. FundedSquad discloses Devionics Technology FZCO in Dubai as owner/operator, license number 46706. The site repeatedly frames the product as simulated capital, simulated trading programs and rewards rather than trading profits; its footer states the company does not act as a broker, custodian or financial intermediary, and that fees are service fees only.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. FundedSquad gives a concrete Dubai IFZA company and clear simulated-program language, which improves traceability. The legal caution is that strong reward, instant account and 100% split marketing sits next to explicit non-broker/non-custodian disclaimers. Treat the product as a simulated evaluation/reward service rather than regulated brokerage or client-money access.',
      entities: [
        {
          name: 'Devionics Technology FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registrationNumber: 'License No. 46706',
          registeredAddress: 'Office No. 001, DDO IFZA Business Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
          role: 'Website owner/operator and FundedSquad trademark owner disclosed in official footer.',
        },
      ],
      regulatoryStatus: [
        'Official site describes FundedSquad programs as simulated trading programs and simulated capital.',
        'Rewards feed disclosure says displayed amounts are rewards earned through simulated trading programs, not trading profits or investment returns.',
        'Footer states the company does not act as a broker, custodian or financial intermediary.',
        'Footer states program fees are service fees only.',
      ],
      complaintsAndDisputes: [
        'Reward protection, 12-hour reward promise and refund claims should be checked against current Terms of Services and Refund Policy before purchase.',
        'Platform 5 / Match Trader access and platform fees should be separated from reward obligations.',
      ],
      redFlags: [
        'Instant-account and 100% reward-split marketing can be misunderstood as real capital or broker access.',
        'Dubai FZCO disclosure is not the same as investment-firm or broker authorization.',
        'Service-fee language means payment does not create deposit or custody rights.',
      ],
      sources: [
        { label: 'FundedSquad official site', url: 'https://fundedsquad.com/' },
        { label: 'FundedSquad Terms of Services', url: 'https://fundedsquad.com/terms-of-services/' },
        { label: 'FundedSquad Risk Disclosure', url: 'https://fundedsquad.com/risk-disclosure/' },
        { label: 'FundedSquad Trustpilot', url: 'https://www.trustpilot.com/review/fundedsquad.com' },
      ],
    },
  }),
  universeFirm({
    id: 89,
    slug: 'funded-unicorn',
    name: 'Funded Unicorn',
    website: 'https://fundedunicorn.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: 'Funded Unicorn terms URL to recheck manually', url: 'https://fundedunicorn.com/terms-and-conditions/' },
      { label: 'Funded Unicorn Trustpilot', url: 'https://www.trustpilot.com/review/fundedunicorn.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Funded Unicorn official domain returned an internal error during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, simulated-account language and regulator/public-warning checks remain unverified from primary sources, so this stays a high-information-risk watchlist entry.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain did not return usable primary legal text in this environment, so no contracting entity or regulatory status should be inferred. Current terms, refund rules and payout obligations must be captured before any positive ranking.',
      entities: [
        {
          name: 'Funded Unicorn',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Regulator and warning-list checks still pending.',
      ],
      complaintsAndDisputes: [
        'Payout, refund and account-termination complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Official site returned an internal error in the current automated review path.',
        'Keep out of strong recommendations until official terms and entity are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Funded Unicorn official site', url: 'https://fundedunicorn.com/' },
        { label: 'Funded Unicorn terms URL to recheck manually', url: 'https://fundedunicorn.com/terms-and-conditions/' },
        { label: 'Funded Unicorn Trustpilot', url: 'https://www.trustpilot.com/review/fundedunicorn.com' },
      ],
    },
  }),
  universeFirm({
    id: 90,
    slug: 'quant-tekel',
    name: 'Quant Tekel',
    website: 'https://quanttekel.com/',
    status: 'À surveiller',
    score: 60,
    founded: 2023,
    headquarters: 'South Africa / United States / United Kingdom',
    priceFrom: 49,
    auditStatus: 'Vérifié multi-source',
    auditSummary:
      'Official Quant Tekel site and footer checked. Quant Tekel separates regulated brokerage from proprietary trading: Quant Tekel (Pty) Ltd is disclosed as an FSCA-authorised South African broker for permitted Africa/Asia jurisdictions, while QTFunded virtual proprietary trading is provided by Quant Tekel LLC and does not provide brokerage, CFD trading or live market access. Quant Tekel Ltd in the UK acts as payment agent for virtual challenge fees.',
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-08',
      summary:
        'Low-to-medium regulatory risk for entity clarity, with product-specific caution. Quant Tekel has unusually explicit separation between its regulated South African brokerage entity and QTFunded virtual proprietary trading. That is positive. The caution is that broker regulation for Quant Tekel (Pty) Ltd does not regulate QTFunded virtual challenges, which are educational/simulated and paid by subscription fees, not client-money deposits.',
      entities: [
        {
          name: 'Quant Tekel (Pty) Ltd',
          jurisdiction: 'South Africa',
          registrationNumber: '2021/321922/07 / FSP No. 53227',
          registeredAddress: '60 Noll Avenue, Gatesville, Cape Town, Western Cape, 7764, South Africa',
          role: 'FSCA-authorised brokerage entity for permitted Africa/Asia jurisdictions.',
        },
        {
          name: 'Quant Tekel LLC',
          jurisdiction: 'United States',
          registrationNumber: '3984 LLC 2025',
          role: 'Provider of virtual proprietary trading programs through simulated environments.',
        },
        {
          name: 'Quant Tekel Ltd',
          jurisdiction: 'United Kingdom',
          registrationNumber: '15923693',
          registeredAddress: '1 Canada Square, Level 39, Canary Wharf, London E14 5AB, United Kingdom',
          role: 'Payment agent for Quant Tekel LLC virtual challenge fees.',
        },
      ],
      regulatoryStatus: [
        'Quant Tekel (Pty) Ltd is disclosed as FSCA-authorised financial services provider FSP No. 53227.',
        'QTFunded.com does not offer brokerage, CFD trading or live market access to clients in any jurisdiction according to the official footer.',
        'Quant Tekel LLC provides virtual proprietary trading programs through simulated environments.',
        'Funds paid for evaluations are subscription fees and do not constitute client money or investment deposits.',
      ],
      complaintsAndDisputes: [
        'Disputes should separate regulated brokerage customers from QTFunded virtual challenge participants.',
        'Restricted jurisdictions include Cyprus, Iran, North Korea, Sudan, Syria, Russia and other prohibited jurisdictions; MT5 is not available to US residents.',
      ],
      redFlags: [
        'Broker regulation should not be transferred mentally to QTFunded virtual challenges.',
        'Payment-agent role of UK entity does not make it the regulated service provider.',
        'Users must verify whether they are accessing quanttekel.com brokerage or qtfunded.com prop challenge.',
      ],
      sources: [
        { label: 'Quant Tekel official site', url: 'https://quanttekel.com/' },
        { label: 'QTFunded prop trading portal', url: 'https://qtfunded.quanttekel.com/' },
        { label: 'Quant Tekel Terms and Conditions', url: 'https://quanttekel.com/terms-and-conditions/' },
        { label: 'Quant Tekel Trustpilot', url: 'https://www.trustpilot.com/review/quanttekel.com' },
      ],
    },
  }),
  universeFirm({
    id: 91,
    slug: 'ascendx-capital',
    name: 'Ascendx Capital',
    website: 'https://ascendxcapital.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: 'Ascendx Capital terms URL to recheck manually', url: 'https://ascendxcapital.com/terms-and-conditions/' },
      { label: 'Ascendx Capital Trustpilot', url: 'https://www.trustpilot.com/review/ascendxcapital.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Ascendx Capital official domain returned an internal error or no usable legal text during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy and simulated-account disclosures remain unverified, so this stays a high-information-risk watchlist entry.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official site did not return usable primary text, so no contracting entity, jurisdiction, refund policy or regulator status should be inferred from the current capture.',
      entities: [
        {
          name: 'Ascendx Capital',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Regulator and public-warning checks still pending.',
      ],
      complaintsAndDisputes: [
        'Payout, refund and rule-dispute complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Official site returned an internal error in the current automated review path.',
        'Keep out of strong recommendations until official entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Ascendx Capital official site', url: 'https://ascendxcapital.com/' },
        { label: 'Ascendx Capital terms URL to recheck manually', url: 'https://ascendxcapital.com/terms-and-conditions/' },
        { label: 'Ascendx Capital Trustpilot', url: 'https://www.trustpilot.com/review/ascendxcapital.com' },
      ],
    },
  }),
  universeFirm({
    id: 92,
    slug: 'purdia-capital',
    name: 'Purdia Capital',
    website: 'https://purdiacapital.com/',
    status: 'À surveiller',
    score: 57,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: 'Purdia Capital terms URL to recheck manually', url: 'https://purdiacapital.com/terms-and-conditions/' },
      { label: 'Purdia Capital Trustpilot', url: 'https://www.trustpilot.com/review/purdiacapital.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Purdia Capital official URL was not safely openable in the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, operating status and regulator/public-warning checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official URL could not be safely opened, so no contracting entity, jurisdiction or regulatory status should be inferred. Treat third-party listings as weak until a current primary page is captured.',
      entities: [
        {
          name: 'Purdia Capital',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Operating status and public-warning checks still pending.',
      ],
      complaintsAndDisputes: [
        'Public complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Primary URL was not safe/openable through the current automated review path.',
        'Do not infer legal structure from third-party lists alone.',
        'Terms, refund posture and simulated/live-account language remain uncaptured.',
      ],
      sources: [
        { label: 'Purdia Capital official site', url: 'https://purdiacapital.com/' },
        { label: 'Purdia Capital terms URL to recheck manually', url: 'https://purdiacapital.com/terms-and-conditions/' },
        { label: 'Purdia Capital Trustpilot', url: 'https://www.trustpilot.com/review/purdiacapital.com' },
      ],
    },
  }),
  universeFirm({
    id: 93,
    slug: 'nova-funding',
    name: 'Nova Funding',
    website: 'https://novafunding.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: 'Nova Legal Funding redirected site', url: 'https://fundmylawsuitnow.com' },
      { label: 'Nova Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Nova%20Funding%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Domain-mismatch pass completed. The official URL redirected to Nova Legal Funding / FundMyLawsuitNow during the July 8, 2026 PropRadar review. The captured site is a pre-settlement lawsuit funding business, not a prop trading firm, so this PropRadar entry should be treated as stale or unresolved until a current prop-firm domain and legal entity are confirmed.',
    auditSourcesChecked: ['Current domain', 'Redirected Nova Legal Funding site', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High stale-entry risk for PropRadar. The captured domain points to lawsuit funding, not prop trading. The entry may be stale, misdirected or using a domain that no longer belongs to a prop firm.',
      entities: [
        {
          name: 'Nova Funding',
          jurisdiction: 'To verify',
          role: 'Prop-firm brand/operator not confirmed from the current domain.',
        },
      ],
      regulatoryStatus: [
        'Current domain redirects to a Nova Legal Funding / FundMyLawsuitNow page focused on pre-settlement lawsuit funding.',
        'Captured page describes lawsuit funding, civil cases and plaintiff funding rather than prop-trading challenges.',
        'Prop-firm legal entity and operating status remain unconfirmed.',
      ],
      complaintsAndDisputes: [
        'Historical prop-firm complaints should not be mixed with current legal-funding business reviews.',
      ],
      redFlags: [
        'Domain mismatch: current site appears unrelated to prop trading.',
        'Do not recommend until current official prop-firm URL and terms are confirmed.',
      ],
      sources: [
        { label: 'Nova Funding current domain', url: 'https://novafunding.com/' },
        { label: 'Nova Legal Funding redirected site', url: 'https://fundmylawsuitnow.com' },
        { label: 'Nova Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Nova%20Funding%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 94,
    slug: 'nations-trading',
    name: 'Nations Trading',
    website: 'https://nationstrading.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: 'Nations Trading terms URL to recheck manually', url: 'https://nationstrading.com/terms-and-conditions/' },
      { label: 'Nations Trading Trustpilot', url: 'https://www.trustpilot.com/review/nationstrading.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Nations Trading official domain returned no usable content during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, operating status and regulator/public-warning checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain did not expose usable primary text, so no contracting entity or regulatory status should be inferred. Current terms and refund clauses must be captured before this profile can rank positively.',
      entities: [
        {
          name: 'Nations Trading',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Operating status and public-warning checks still pending.',
      ],
      complaintsAndDisputes: [
        'Payout, refund and support complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'No usable primary legal text captured in the current pass.',
        'Keep out of recommendations until official entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Nations Trading official site', url: 'https://nationstrading.com/' },
        { label: 'Nations Trading terms URL to recheck manually', url: 'https://nationstrading.com/terms-and-conditions/' },
        { label: 'Nations Trading Trustpilot', url: 'https://www.trustpilot.com/review/nationstrading.com' },
      ],
    },
  }),
  universeFirm({
    id: 95,
    slug: 'funder-trading',
    name: 'Funder Trading',
    website: 'https://fundertrading.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2022,
    headquarters: 'Chicago, Illinois, United States',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, disclaimer and terms checked. Funder Trading discloses Funder Trading LLC in Chicago, Illinois. Its legal pages state that it is not registered with the SEC, FINRA or state securities regulators as a broker-dealer or investment adviser, does not solicit funds, does not provide investment advice, and uses simulation/education language while also referring to discretionary funded accounts.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. The U.S. legal entity and address are visible, and the disclaimer is direct about non-registration. The caution is product framing: marketing says traders can trade company money, while the terms frame services as education, hypothetical examples, simulation trading and discretionary accounts held by Funder Trading. Treat it as an education/simulation/funding program, not a broker or protected client-money account.',
      entities: [
        {
          name: 'Funder Trading LLC',
          jurisdiction: 'Illinois, United States',
          registeredAddress: '141 W. Jackson Blvd #3315, Chicago, IL 60604, United States',
          role: 'Website operator and contracting entity disclosed in official terms and disclaimer.',
        },
      ],
      regulatoryStatus: [
        'Official disclaimer says Funder Trading is not a registered broker-dealer or investment adviser with the SEC, FINRA or state securities regulators.',
        'Terms state that Funder Trading does not solicit funds, does not offer investment advice and does not receive trade commissions or use investor money.',
        'Terms include hypothetical-performance and educational-purpose disclaimers.',
        'Refund policy in terms says no refunds, exchanges or returns for courses or training materials.',
      ],
      complaintsAndDisputes: [
        'Disputes should separate training/coaching purchases from challenge/funded-account expectations.',
        'No-refund language is a material commercial risk for users who expect challenge refunds.',
      ],
      redFlags: [
        'Marketing language about trading company money sits beside education/simulation and non-registration disclaimers.',
        'No-refund policy is strict.',
        'Not registered as broker-dealer or investment adviser according to its own disclaimer.',
      ],
      sources: [
        { label: 'Funder Trading official site', url: 'https://fundertrading.com/' },
        { label: 'Funder Trading Terms and Conditions', url: 'https://fundertrading.com/terms-conditions/' },
        { label: 'Funder Trading Disclaimer', url: 'https://fundertrading.com/disclaimer/' },
        { label: 'Funder Trading Trustpilot', url: 'https://www.trustpilot.com/review/fundertrading.com' },
      ],
    },
  }),
  universeFirm({
    id: 96,
    slug: 'the-forex-funder',
    name: 'The Forex Funder',
    website: 'https://theforexfunder.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: 'The Forex Funder terms URL to recheck manually', url: 'https://theforexfunder.com/terms-and-conditions/' },
      { label: 'The Forex Funder Trustpilot', url: 'https://www.trustpilot.com/review/theforexfunder.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. The Forex Funder official domain returned 403 Forbidden / no usable primary legal text during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, operating status and regulator/public-warning checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain did not return usable primary text in this environment, so no contracting entity, refund terms or regulatory status should be inferred.',
      entities: [
        {
          name: 'The Forex Funder',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Regulator and public-warning checks still pending.',
      ],
      complaintsAndDisputes: [
        'Payout, refund and account-termination complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Official site returned an internal error in the current automated review path.',
        'Keep out of strong recommendations until official terms and entity are sourced.',
        'Terms, refund posture and simulated/live-account language remain uncaptured.',
      ],
      sources: [
        { label: 'The Forex Funder official site', url: 'https://theforexfunder.com/' },
        { label: 'The Forex Funder terms URL to recheck manually', url: 'https://theforexfunder.com/terms-and-conditions/' },
        { label: 'The Forex Funder Trustpilot', url: 'https://www.trustpilot.com/review/theforexfunder.com' },
      ],
    },
  }),
  universeFirm({
    id: 97,
    slug: 'fundedlions',
    name: 'FundedLions',
    website: 'https://fundedlions.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: 'FundedLions terms URL to recheck manually', url: 'https://fundedlions.com/terms-and-conditions/' },
      { label: 'FundedLions Trustpilot', url: 'https://www.trustpilot.com/review/fundedlions.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. FundedLions official URL was not safely openable during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, operating status and regulator/public-warning checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official URL could not be safely opened in this environment, so no contracting entity, jurisdiction or regulatory status should be inferred.',
      entities: [
        {
          name: 'FundedLions',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Operating status and warning-list checks still pending.',
      ],
      complaintsAndDisputes: [
        'Public complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Primary URL was not safe/openable through the current automated review path.',
        'Do not infer legal structure from third-party lists alone.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'FundedLions official site', url: 'https://fundedlions.com/' },
        { label: 'FundedLions terms URL to recheck manually', url: 'https://fundedlions.com/terms-and-conditions/' },
        { label: 'FundedLions Trustpilot', url: 'https://www.trustpilot.com/review/fundedlions.com' },
      ],
    },
  }),
  universeFirm({
    id: 98,
    slug: 'fx-capital-funding',
    name: 'FX Capital Funding',
    website: 'https://fxcapitalfunding.com/',
    status: 'À surveiller',
    score: 54,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: 'BrokersInForex redirected site', url: 'http://brokersinforex.com' },
      { label: 'FX Capital Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=FX%20Capital%20Funding%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Domain-mismatch pass completed. The official URL redirected to BrokersInForex.com during the July 8, 2026 PropRadar review, showing a verification/loader path for a broker-comparison or forex guide site rather than a prop-firm offer. Treat this PropRadar entry as unresolved or stale until a current prop-firm domain and legal entity are confirmed.',
    auditSourcesChecked: ['Current domain', 'Redirect target', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High stale-entry risk for PropRadar. The captured domain redirects away from FX Capital Funding to broker-guide infrastructure, so the entry may be stale, misdirected or no longer operating as a prop firm at that URL.',
      entities: [
        {
          name: 'FX Capital Funding',
          jurisdiction: 'To verify',
          role: 'Prop-firm brand/operator not confirmed from the current domain.',
        },
      ],
      regulatoryStatus: [
        'Current domain redirected to brokersinforex.com and did not present a usable prop-firm offer in this pass.',
        'Prop-firm legal entity and operating status remain unconfirmed.',
      ],
      complaintsAndDisputes: [
        'Historical prop-firm complaints should not be mixed with the current redirected broker-guide site.',
      ],
      redFlags: [
        'Domain mismatch: current site appears unrelated to FX Capital Funding prop-firm services.',
        'Do not recommend until current official prop-firm URL and terms are confirmed.',
      ],
      sources: [
        { label: 'FX Capital Funding current domain', url: 'https://fxcapitalfunding.com/' },
        { label: 'BrokersInForex redirected site', url: 'http://brokersinforex.com' },
        { label: 'FX Capital Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=FX%20Capital%20Funding%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 99,
    slug: 'leveled-up-society',
    name: 'Leveled Up Society',
    website: 'https://leveledupsociety.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2022,
    priceFrom: 49,
    additionalSources: [
      { label: 'Leveled Up Traders redirected site', url: 'https://www.leveleduptraders.com/' },
      { label: 'Leveled Up Traders terms URL to recheck manually', url: 'https://www.leveleduptraders.com/terms-and-conditions/' },
      { label: 'Leveled Up Trustpilot search', url: 'https://www.trustpilot.com/search?query=Leveled%20Up%20Traders' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Redirect/brand-continuity pass completed. The old Leveled Up Society URL redirected to Leveled Up Traders during the July 8, 2026 PropRadar review, but the captured page returned no usable primary legal text. Brand continuity, legal entity, terms and operating status still need manual verification before old reviews are mapped to the current brand.',
    auditSourcesChecked: ['Old domain', 'Redirected Leveled Up Traders site', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High brand-continuity risk. The old Leveled Up Society URL appears to redirect to a related/newer brand, but the automated capture did not expose enough legal text to confirm entity, jurisdiction or product status.',
      entities: [
        {
          name: 'Leveled Up Society / Leveled Up Traders',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from current legal notice, terms and company registers.',
        },
      ],
      regulatoryStatus: [
        'Old Leveled Up Society domain redirects to Leveled Up Traders.',
        'Brand/domain continuity not confirmed from usable legal text.',
        'Regulator and public-warning checks still pending.',
      ],
      complaintsAndDisputes: [
        'Historical Leveled Up Society reviews should be separated from any current Leveled Up Traders offer until continuity is verified.',
      ],
      redFlags: [
        'Redirect from older domain to newer brand creates stale-entry risk.',
        'Do not infer current legal entity from the old brand name alone.',
      ],
      sources: [
        { label: 'Leveled Up Society current domain', url: 'https://leveledupsociety.com/' },
        { label: 'Leveled Up Traders redirected site', url: 'https://www.leveleduptraders.com/' },
        { label: 'Leveled Up Traders terms URL to recheck manually', url: 'https://www.leveleduptraders.com/terms-and-conditions/' },
        { label: 'Leveled Up Trustpilot search', url: 'https://www.trustpilot.com/search?query=Leveled%20Up%20Traders' },
      ],
    },
  }),
  universeFirm({
    id: 100,
    slug: 'one-of-one-funding',
    name: '1of1 Funding',
    website: 'https://1of1funding.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2023,
    priceFrom: 49,
    additionalSources: [
      { label: '1of1 Funding terms URL to recheck manually', url: 'https://1of1funding.com/terms-and-conditions/' },
      { label: '1of1 Funding Trustpilot', url: 'https://www.trustpilot.com/review/1of1funding.com' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. 1of1 Funding official URL was not safely openable during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, operating status and regulator/public-warning checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot page'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official URL could not be safely opened in this environment, so no contracting entity, jurisdiction or regulatory status should be inferred.',
      entities: [
        {
          name: '1of1 Funding',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Operating status and warning-list checks still pending.',
      ],
      complaintsAndDisputes: [
        'Payout, refund and account-rule complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Primary URL was not safe/openable through the current automated review path.',
        'Keep out of recommendations until official entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: '1of1 Funding official site', url: 'https://1of1funding.com/' },
        { label: '1of1 Funding terms URL to recheck manually', url: 'https://1of1funding.com/terms-and-conditions/' },
        { label: '1of1 Funding Trustpilot', url: 'https://www.trustpilot.com/review/1of1funding.com' },
      ],
    },
  }),
  universeFirm({
    id: 101,
    slug: 'wsfunded',
    name: 'WSFunded',
    website: 'https://wsfunded.com/',
    status: 'À surveiller',
    score: 60,
    founded: 2024,
    headquarters: 'Dubai, United Arab Emirates / Saint Lucia / Cyprus',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. WSFunded discloses WSF Technology FZCO in Dubai, WSFmarkets Ltd in Saint Lucia and RENATICA LTD in Cyprus for payment-related operations. The footer states accounts are simulated, do not involve real trading accounts or client funds, and that WSF Technology FZCO is not a broker, investment manager or regulated financial entity.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. WSFunded gives concrete operating entities and unusually explicit simulated-account disclaimers. The caution is that offshore/Dubai entity structure, payment-operations entity in Cyprus, high promotional claims and non-regulated status require users to treat fees and displayed balances as program/service terms, not protected deposits or regulated brokerage balances.',
      entities: [
        {
          name: 'WSF Technology FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registrationNumber: 'License No. 47001',
          registeredAddress: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
          role: 'Operating entity disclosed in official footer and general disclaimer.',
        },
        {
          name: 'WSFmarkets Ltd',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00117',
          registeredAddress: 'Ground Floor, Rodney Court Building, Rodney Bay, Gros Islet, Saint Lucia',
          role: 'Company disclosed for accounts/programs under WSF Technology FZCO.',
        },
        {
          name: 'RENATICA LTD.',
          jurisdiction: 'Cyprus',
          registeredAddress: 'Arch. Makariou III, 228 Agios Pavlos Court, Block A Floor 1, Office 113, 3030 Limassol, Cyprus',
          role: 'Cyprus office disclosed for payment-operations related activities.',
        },
      ],
      regulatoryStatus: [
        'Official footer states all accounts offered by WSFmarkets Ltd under WSF Technology FZCO are not real trading accounts.',
        'Footer says the company does not manage client funds, safeguard third-party money or provide access to regulated financial instruments.',
        'General disclaimer says WSF Technology FZCO is not a broker, investment manager or regulated financial entity under EU/MiFID II/ESMA/SEC/CFTC/DFSA or other international regulators.',
        'Regional restrictions include the United States, Singapore, Russia, the UAE and FATF/sanctioned jurisdictions.',
      ],
      complaintsAndDisputes: [
        'Promo, refund and payout complaints should be checked against current terms and the purchase flow before purchase.',
        'Users should document which entity invoices them, especially where Cyprus payment operations are involved.',
      ],
      redFlags: [
        'Non-regulated simulated-account model despite broker-like challenge marketing.',
        'Multiple entities across Dubai, Saint Lucia and Cyprus increase enforcement and dispute complexity.',
        'Displayed balances, profits and losses are described as hypothetical.',
      ],
      sources: [
        { label: 'WSFunded official site', url: 'https://wsfunded.com/' },
        { label: 'WSFunded English site and footer', url: 'https://wsfunded.com/en' },
        { label: 'WSFunded Trustpilot', url: 'https://www.trustpilot.com/review/wsfunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 102,
    slug: 'for-traders',
    name: 'For Traders',
    website: 'https://www.fortraders.com/',
    status: 'Active',
    score: 72,
    founded: 2023,
    headquarters: 'Czech Republic',
    priceFrom: 49,
    payoutProof: true,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. For Traders discloses Billions Club s.r.o. in Prague as operator, states that funded accounts are demo accounts with virtual funds, and says clients do not receive actual funds, assets or trading capital. The Czech company disclosure is useful, but the product remains simulated and outside normal broker/investment-account protections.',
    auditSourcesChecked: ['Official site', 'Terms and conditions', 'FAQ/rules', 'Trustpilot to monitor'],
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-08',
      summary:
        'Low-to-medium regulatory risk. For Traders has a readable EU company disclosure through Billions Club s.r.o. in Prague and its terms are explicit that funded accounts are demo accounts with fictitious capital. This is cleaner than many anonymous offshore firms, but users must understand that the service does not provide actual trading capital, assets or a regulated brokerage account.',
      entities: [
        {
          name: 'Billions Club s.r.o.',
          jurisdiction: 'Czech Republic',
          registrationNumber: '17331420',
          registeredAddress: 'Pernerova 691/42, Karlin, 186 00 Prague 8, Czech Republic',
          role: 'Operator disclosed in For Traders terms and official site footer.',
        },
      ],
      regulatoryStatus: [
        'Terms state that funded accounts are demo accounts and capital is provided in virtual funds only.',
        'Clients do not have any right or entitlement to actual funds, assets or trading capital according to the official terms.',
        'No broker, investment adviser or investment-services authorization is documented in PropRadar for the prop-firm product.',
        'The EU company footprint improves traceability, but it does not turn the evaluation product into a regulated investment account.',
      ],
      complaintsAndDisputes: [
        'Public complaints should be classified around challenge rules, payout/reward requests, KYC and rule breach decisions.',
        'No major public regulator enforcement action is documented in PropRadar at this check.',
        'Because the firm is newer than FTMO/The5ers, recent payout proof remains important before ranking it as low-risk.',
      ],
      redFlags: [
        'Demo account and virtual-fund model must not be confused with real capital allocation.',
        'EU company disclosure does not equal financial-services authorization for the prop product.',
        'Reward eligibility depends on rules, reviews and account conditions rather than normal broker withdrawal rights.',
      ],
      sources: [
        { label: 'Official For Traders site', url: 'https://www.fortraders.com/' },
        { label: 'For Traders terms and conditions', url: 'https://www.fortraders.com/terms-and-conditions' },
        { label: 'For Traders FAQ', url: 'https://www.fortraders.com/faq' },
        { label: 'Trustpilot For Traders', url: 'https://www.trustpilot.com/review/fortraders.com' },
      ],
    },
  }),
  universeFirm({
    id: 103,
    slug: 'moneta-funded',
    name: 'Moneta Funded',
    website: 'https://monetafunded.com/',
    status: 'À surveiller',
    score: 60,
    founded: 2025,
    headquarters: 'Saint Lucia',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and June 2026 terms checked. Moneta Funded discloses Moneta Funded Ltd in Saint Lucia, registration number 2025-00532. The terms state that accounts are simulated, funds have no monetary value, no real financial markets are traded, evaluation fees are non-refundable, and Moneta Funded does not operate as a broker or provide brokerage/financial services.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. The entity is clear and the simulated-account language is explicit, but the structure is offshore Saint Lucia and the marketing leans heavily on Moneta Markets broker backing. Users should not treat Moneta Markets branding as regulatory protection for Moneta Funded challenge fees or simulated balances.',
      entities: [
        {
          name: 'Moneta Funded Ltd',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00532',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Prop-firm operator and contracting entity disclosed in official footer and terms.',
        },
        {
          name: 'Moneta Markets Ltd',
          jurisdiction: 'To verify',
          registrationNumber: '2023-00068',
          role: 'Broker-linked brand referenced in Moneta Funded terms and payout option definitions.',
        },
      ],
      regulatoryStatus: [
        'Terms state that services are educational and evaluative in nature and that all trading accounts are simulated.',
        'Terms state no real money is invested and no real financial instruments are traded.',
        'Footer states Moneta Funded does not operate as a broker and does not provide brokerage or financial services.',
        'Funds paid are described as subscriptions/evaluation fees, not client money.',
      ],
      complaintsAndDisputes: [
        'Any payout dispute should be checked against the separate Funded Trader Agreement because passing an evaluation does not automatically guarantee funded-trader onboarding.',
        'Broker-backed marketing should be separated from actual contractual rights with Moneta Funded Ltd.',
      ],
      redFlags: [
        'Offshore Saint Lucia contracting entity.',
        'Broker-backed marketing can be overread as regulated prop-firm protection.',
        'Evaluation/funded status remains discretionary and simulated under the terms.',
      ],
      sources: [
        { label: 'Moneta Funded official site', url: 'https://www.monetafunded.com/' },
        { label: 'Moneta Funded Terms and Conditions PDF', url: 'https://www.monetafunded.com/terms-and-conditions/' },
        { label: 'Moneta Funded Trustpilot', url: 'https://www.trustpilot.com/review/monetafunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 104,
    slug: 'fundedelite',
    name: 'FundedElite',
    website: 'https://fundedelite.com/',
    status: 'À surveiller',
    score: 62,
    founded: 2024,
    headquarters: 'Italy',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. FundedElite contracts through Quantum SRL in Italy, VAT/P.IVA 03095010595. Terms define challenges and elite accounts as simulated, state that no real capital is handled or placed into markets, and say FundedElite is not a broker, investment firm, financial adviser or regulated financial-services provider.',
    regulatoryAudit: {
      riskLevel: 'Low to medium',
      lastChecked: '2026-07-08',
      summary:
        'Low-to-medium regulatory risk for traceability, with normal prop-firm product risk. The Italian entity and detailed terms are stronger than anonymous offshore profiles. The limitation is explicit: the product is a simulated educational/evaluation service, rewards are conditional, and the company disclaims broker/investment-firm status.',
      entities: [
        {
          name: 'Quantum SRL',
          jurisdiction: 'Italy',
          registrationNumber: 'P.IVA 03095010595',
          registeredAddress: 'Via Maira 13, Latina 04100, Italy',
          role: 'Company operating under the trade name Funded Elite.',
        },
      ],
      regulatoryStatus: [
        'Terms state all trading activities occur within virtual or demo-based simulations.',
        'Terms state no real capital is handled, processed, invested or placed into financial markets.',
        'Terms state Funded Elite is not a broker, investment firm, financial adviser or regulated financial-services provider.',
        'KYC, video interview and risk interview can be required before progression or payouts.',
      ],
      complaintsAndDisputes: [
        'Payout disputes should be checked against interview, KYC and anti-gamification clauses.',
        'No-refund-upon-breach and payout-forfeiture clauses are material user risks.',
      ],
      redFlags: [
        'Wide discretion to require interviews and withhold payouts during investigations.',
        'Strict prohibited-practice and anti-gamification clauses can create rule-dispute risk.',
        'Simulated-account model only, not real capital custody.',
      ],
      sources: [
        { label: 'FundedElite official site', url: 'https://fundedelite.com/' },
        { label: 'FundedElite Terms and Conditions', url: 'https://fundedelite.com/terms-and-conditions' },
        { label: 'FundedElite Trustpilot', url: 'https://www.trustpilot.com/review/fundedelite.com' },
      ],
    },
  }),
  universeFirm({
    id: 105,
    slug: 'orion-funded',
    name: 'Orion Funded',
    website: 'https://orionfunded.com/',
    status: 'À surveiller',
    score: 59,
    founded: 2024,
    headquarters: 'Dubai / Saint Lucia / Hong Kong',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms page checked. Orion Funded discloses ORION GLOBAL FZCO in Dubai plus related entities OGM International LTD in Saint Lucia and OGM Evaluation Limited in Hong Kong. The footer states that Orion provides simulated trading services and educational tools, does not act as a broker, does not accept deposits, and that all accounts are demo accounts with fictitious funds.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. Orion has concrete entity disclosures, but its structure spans Dubai, Saint Lucia and Hong Kong, and the service is explicitly simulated. Treat any payout or reward as a contractual program outcome, not a regulated broker withdrawal.',
      entities: [
        {
          name: 'ORION GLOBAL FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registeredAddress: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
          role: 'Primary registered address disclosed in official footer.',
        },
        {
          name: 'OGM International LTD',
          jurisdiction: 'Saint Lucia',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Related entity disclosed by Orion.',
        },
        {
          name: 'OGM Evaluation Limited',
          jurisdiction: 'Hong Kong',
          registeredAddress: 'Room 07, 12/F., Chevalier Commercial Centre, 8 Wang Hoi Road, Kowloon Bay, Hong Kong',
          role: 'Related evaluation entity disclosed by Orion.',
        },
      ],
      regulatoryStatus: [
        'Footer states ORION provides simulated trading services and educational tools only.',
        'Footer states ORION does not act as a broker and does not accept deposits.',
        'Site states all accounts are demo accounts with fictitious funds and simulated trading only.',
        'Technical infrastructure and data feed are powered by third-party providers.',
      ],
      complaintsAndDisputes: [
        'Rules changed around Orion V2.2 / New Generation accounts, so disputes should identify purchase date and governing terms.',
        'Payout claims should be checked against demo-account and fictitious-fund wording.',
      ],
      redFlags: [
        'Multiple jurisdictions increase dispute complexity.',
        'Demo/fictitious-fund disclaimer sits beside large payout and trader-count marketing.',
        'No broker/deposit relationship according to official footer.',
      ],
      sources: [
        { label: 'Orion Funded official site', url: 'https://www.orionfunded.com/' },
        { label: 'Orion Funded Terms and Conditions', url: 'https://www.orionfunded.com/terms-and-conditions' },
        { label: 'Orion Funded Trustpilot', url: 'https://www.trustpilot.com/review/orionfunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 106,
    slug: 'bem-funding',
    name: 'BEM Funding',
    website: 'https://bemfunding.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2026,
    headquarters: 'Dubai, United Arab Emirates / Saint Lucia',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. BEM Funding discloses BEX Software Development LLC-FZ in Dubai as the website/operator for DXtrade and cTrader, plus BEM Ltd in Saint Lucia registration number 2026-00240 for MT5. Terms state the accounts are simulated and educational, payments are for educational software/services, and refunds are unavailable unless unused.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. BEM has useful entity disclosures but is very new, splits platforms across Dubai and Saint Lucia entities, and lists broad jurisdictional restrictions. The product is simulated/educational rather than regulated brokerage, with a strict unused-only refund posture.',
      entities: [
        {
          name: 'BEX Software Development LLC-FZ',
          jurisdiction: 'Dubai, United Arab Emirates',
          registeredAddress: 'Meydan Grandstand / The Meydan Hotel, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, United Arab Emirates',
          role: 'Website owner/operator and technology/education company for DXtrade and cTrader.',
        },
        {
          name: 'BEM Ltd.',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2026-00240',
          role: 'Entity disclosed for MetaQuotes MT5 platform operation.',
        },
      ],
      regulatoryStatus: [
        'BEM Funding states it provides access to trading accounts within a simulated environment for educational use only.',
        'Terms state users are not asked to deposit capital for investment purposes and do not risk their own funds.',
        'Content and services do not constitute investment advice or personal recommendations.',
        'Payments are for access to educational software and services and are non-refundable unless unused.',
      ],
      complaintsAndDisputes: [
        'US, UAE, Saint Lucia and many other jurisdictions are restricted; residency conflicts can become account/payout disputes.',
        'Platform/entity split means MT5 complaints should be separated from DXtrade/cTrader complaints.',
      ],
      redFlags: [
        'Very new 2026 entity disclosure.',
        'Dubai plus Saint Lucia platform split.',
        'Broad jurisdictional restriction list and unused-only refund posture.',
      ],
      sources: [
        { label: 'BEM Funding official site', url: 'https://bemfunding.com/' },
        { label: 'BEM Funding Terms and Conditions', url: 'https://bemfunding.com/terms-and-conditions' },
        { label: 'BEM Funding Trustpilot', url: 'https://www.trustpilot.com/review/bemfunding.com' },
      ],
    },
  }),
  universeFirm({
    id: 107,
    slug: 'atmos-funded',
    name: 'Atmos Funded',
    website: 'https://atmosfunded.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2025,
    headquarters: 'Comoros / Cyprus',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. Atmos discloses Atmos Global Ltd in the Union of the Comoros, registration HT00525042 and license BFX2025060, for simulated trading services/platforms, plus AtmosFunded Ltd in Cyprus, company HE471627, for educational products, tools and payment processing. The site states AtmosFunded Ltd is not licensed by any financial-services regulator and all client trading is fictitious demo trading.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. Atmos is broker-backed by Taurex in marketing, but its own footer says the Cyprus company is not licensed by any financial-services regulator and that client funds are not client money or deposits. Comoros/Cyprus split and Taurex transfer options require careful separation between prop rewards and any live broker account.',
      entities: [
        {
          name: 'Atmos Global Ltd',
          jurisdiction: 'Union of the Comoros',
          registrationNumber: 'HT00525042 / License No. BFX2025060',
          registeredAddress: 'Bonovo Road, Fomboni, Island of Mohéli, Union of the Comoros',
          role: 'Provider of simulated trading services and trading platforms.',
        },
        {
          name: 'AtmosFunded Ltd',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE471627',
          registeredAddress: 'Naxou 1, 1st Floor, Office 103, Strovolos, 2043, Nicosia, Cyprus',
          role: 'Provider of educational products, training tools and payment-processing services.',
        },
      ],
      regulatoryStatus: [
        'AtmosFunded Ltd states it is not licensed by any financial-services regulator and does not operate as a broker, dealer or custodian.',
        'Funds paid to Atmos are not client money and are not deposits under applicable law according to the site.',
        'All client trading activities take place in a fictitious environment using demo accounts.',
        'The site says services are not intended for the United States and several other restricted jurisdictions.',
      ],
      complaintsAndDisputes: [
        'Taurex transfer/bonus payouts should be distinguished from standard reward withdrawals.',
        'Jurisdiction restrictions and broker-backed claims should be checked before purchase.',
      ],
      redFlags: [
        'Broker-backed marketing does not make AtmosFunded Ltd a regulated broker.',
        'Comoros platform entity plus Cyprus payment/education entity.',
        'Explicit non-client-money/non-deposit disclaimer.',
      ],
      sources: [
        { label: 'Atmos Funded official site', url: 'https://atmosfunded.com/' },
        { label: 'Atmos Funded Terms of Use', url: 'https://atmosfunded.com/terms-of-use/' },
        { label: 'Atmos Funded Trustpilot', url: 'https://uk.trustpilot.com/review/atmosfunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 108,
    slug: 'top-one-trader',
    name: 'Top One Trader',
    website: 'https://toponetrader.com/',
    status: 'À surveiller',
    score: 60,
    founded: 2023,
    headquarters: 'Comoros',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and June 2026 terms checked. Top One Trader discloses Top One Trader, LLC / Top One Trader Ltd, a registered office in Anjouan, Union of Comoros, and International Brokerage and Clearing House License No. L15829/TOT. The site says challenge performance is simulated and does not reflect live trading or actual fund management unless a funded account is granted.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. Top One Trader has a disclosed Comoros/Anjouan license number and extensive rules, but this is not equivalent to tier-one broker protection for challenge fees or payout claims. The terms give broad discretion around prohibited strategies, broker relationships, account termination and profit deductions.',
      entities: [
        {
          name: 'Top One Trader, LLC / Top One Trader Ltd',
          jurisdiction: 'Anjouan, Union of Comoros',
          registrationNumber: 'International Brokerage and Clearing House License No. L15829/TOT',
          registeredAddress: 'Hamchako, Mutsamudu, The Autonomous Island of Anjouan, Union of Comoros',
          role: 'Operator disclosed in official terms/footer.',
        },
      ],
      regulatoryStatus: [
        'Footer says challenge performance is simulated and does not reflect live trading or actual fund management unless a funded account is granted.',
        'Terms state the company may prohibit strategies that create regulatory issues for a broker or jeopardize broker relationships.',
        'MT5 services are not available in certain jurisdictions including the United States, North Korea and Iran.',
        'Site disclaimers state information is educational/informational and not investment advice.',
      ],
      complaintsAndDisputes: [
        'Rule disputes should examine prohibited trading, EA masking, account rolling/churning, HFT/tick scalping and anti-gambling clauses.',
        'The terms allow deduction of gains or termination for several categories of prohibited trading.',
      ],
      redFlags: [
        'Anjouan/Comoros license should not be treated as tier-one investor protection.',
        'Broad discretion over acceptable risk practices and broker-related rules.',
        'Marketing payout testimonials should be weighed against simulated-account terms.',
      ],
      sources: [
        { label: 'Top One Trader official site', url: 'https://www.toponetrader.com/' },
        { label: 'Top One Trader Terms and Conditions', url: 'https://www.toponetrader.com/terms-and-conditions' },
        { label: 'Top One Trader Trustpilot', url: 'https://www.trustpilot.com/review/toponetrader.com' },
      ],
    },
  }),
  universeFirm({
    id: 109,
    slug: 'qt-funded',
    name: 'QT Funded',
    website: 'https://qtfunded.com/',
    status: 'À surveiller',
    score: 59,
    founded: 2024,
    headquarters: 'Saint Vincent and the Grenadines / South Africa / United Kingdom',
    priceFrom: 49,
    auditStatus: 'Vérifié multi-source',
    auditSummary:
      'Official qtfunded.com redirects to qtfunded.quanttekel.com. The footer states that Quant Tekel LLC provides virtual proprietary trading programs through simulated environments, Quant Tekel (Pty) Ltd is a separate FSCA-regulated South African broker, Quant Tekel Ltd in the UK performs internal treasury/payment processing, and customers contract with Quant Tekel SVG in Saint Vincent and the Grenadines.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium risk mainly because QT Funded is a duplicate/brand-specific entry of the Quant Tekel prop portal. The legal separation is unusually clear, but the contracting entity for QTFunded services is offshore Quant Tekel SVG, not the FSCA-regulated South African broker.',
      entities: [
        {
          name: 'Quant Tekel SVG',
          jurisdiction: 'Saint Vincent and the Grenadines',
          role: 'Contracting entity for QTFunded services according to official QTFunded footer.',
        },
        {
          name: 'Quant Tekel LLC',
          jurisdiction: 'United States',
          registrationNumber: '3984 LLC 2025',
          role: 'Provider of virtual proprietary trading programs through simulated environments.',
        },
        {
          name: 'Quant Tekel (Pty) Ltd',
          jurisdiction: 'South Africa',
          registrationNumber: 'FSP No. 53227',
          role: 'Separate FSCA-authorised brokerage entity for permitted Africa/Asia jurisdictions.',
        },
        {
          name: 'Quant Tekel Ltd',
          jurisdiction: 'United Kingdom',
          registrationNumber: '15923693',
          registeredAddress: '1 Canada Square, Level 39, Canary Wharf, London E14 5AB, United Kingdom',
          role: 'Internal treasury/payment-processing entity, not regulated trading-service provider.',
        },
      ],
      regulatoryStatus: [
        'QTFunded does not offer brokerage, CFD trading or live market access to clients in any jurisdiction.',
        'No real trading occurs and evaluation fees are subscription fees, not client money or investment deposits.',
        'Quant Tekel (Pty) Ltd broker regulation does not apply to the QTFunded virtual challenge product.',
        'Restricted jurisdictions include Cyprus, Iran, North Korea, Sudan, Syria and Russia; MT5 is unavailable to US residents.',
      ],
      complaintsAndDisputes: [
        'Merge or cross-link with the Quant Tekel profile to avoid double-counting reviews and legal findings.',
        'Payout disputes should name the SVG contracting entity, not only the UK payment entity.',
      ],
      redFlags: [
        'Duplicate brand risk versus Quant Tekel profile.',
        'Offshore SVG contracting entity for the prop product.',
        'FSCA broker authorization should not be mentally transferred to QTFunded challenges.',
      ],
      sources: [
        { label: 'QT Funded official redirect', url: 'https://qtfunded.com/' },
        { label: 'QTFunded Quant Tekel portal', url: 'https://qtfunded.quanttekel.com/' },
        { label: 'Quant Tekel official site', url: 'https://quanttekel.com/' },
        { label: 'QT Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=QT%20Funded' },
      ],
    },
  }),
  universeFirm({
    id: 110,
    slug: 'atfunded',
    name: 'ATFunded',
    website: 'https://atfunded.com/',
    status: 'À surveiller',
    score: 42,
    founded: 2024,
    priceFrom: 49,
    incidents: 2,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site checked. ATFunded currently shows an Important Announcement stating that operations are paused while the business reviews its model. The announcement says active-account customers will receive full refunds and funded traders with eligible profits will receive payouts according to rules, with MT5 set to close-only.',
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High operational risk. Even though the announcement promises refunds and eligible payouts, ATFunded is not a current normal purchase candidate while operations are paused. Treat the profile as a live incident/watchlist entry until refund and payout completion is independently confirmed.',
      entities: [
        {
          name: 'ATFunded',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from archived terms and company records.',
        },
      ],
      regulatoryStatus: [
        'Official homepage states operations are paused while the business conducts a full review.',
        'Announcement says customers with active accounts will receive full refunds of purchases.',
        'Announcement says funded traders with eligible profits will receive payouts in accordance with rules.',
        'MT5 was set to close-only according to the announcement.',
      ],
      complaintsAndDisputes: [
        'Track refund completion, payout completion and any missed timelines from affected customers.',
        'Archived terms and legal entity still need reconstruction for historical obligations.',
      ],
      redFlags: [
        'Paused operations.',
        'Not a current purchase candidate.',
        'Refund/payout promises still need follow-up evidence.',
      ],
      sources: [
        { label: 'ATFunded official announcement', url: 'https://atfunded.com/' },
        { label: 'ATFunded Trustpilot', url: 'https://www.trustpilot.com/review/atfunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 111,
    slug: 'lucid-trading',
    name: 'Lucid Trading',
    website: 'https://lucidtrading.com/',
    status: 'À surveiller',
    score: 61,
    founded: 2024,
    headquarters: 'Delaware, United States',
    market: 'Futures',
    priceFrom: 135,
    profitSplit: 90,
    drawdownType: 'EOD',
    newsTrading: 'Allowed',
    eaAllowed: 'Yes',
    payoutDelay: 'Typically 5-15 minutes after approval in the US; up to 2 business days internationally',
    styles: ['Futures'],
    payoutProof: true,
    recentRuleChange: true,
    lastReviewed: '2026-07-12',
    incidents: 2,
    incidentsDetails: [
      'Finance Magnates reported that ProjectX planned to end third-party prop-firm support, creating a platform-transition point that traders should recheck at checkout.',
      'Official account agreements allow rule changes, trade removal, account closure and reward forfeiture for prohibited conduct or inactivity.',
    ],
    products: [
      product({
        id: 'lucid-pro',
        name: 'LucidPro',
        type: 'Futures evaluation',
        description: 'One-time simulated futures evaluation with EOD drawdown, a one-day minimum path and a 40% best-day limit during payout cycles.',
        accountSizeMin: 25000,
        accountSizeMax: 150000,
        entryFeeMin: 135,
        profitTarget: '$1,250-$9,000 (5%-6% by account size)',
        maxDailyLoss: 'None on 25K; $1,200-$2,700 on larger accounts',
        maxDrawdown: 'EOD trailing MLL of $1,000-$4,500',
        profitSplit: '90% to trader',
        platforms: ['NinjaTrader', 'Tradovate', 'TradingView', 'Quantower', 'Sierra Chart', 'R Trader Pro'],
        tradableAssets: ['CME futures'],
        minTradingDays: 'Can pass in one trading day',
        hasConsistencyRule: true,
        consistencyRule: 'Largest day must be no more than 40% of total profit during each LucidPro payout cycle.',
        linkToStart: 'https://lucidtrading.com/',
        isPopular: true,
      }),
      product({
        id: 'lucid-flex',
        name: 'LucidFlex',
        type: 'Futures evaluation',
        description: 'Simulated futures evaluation with 50% evaluation consistency; the funded account has no DLL, no payout buffer and no consistency percentage.',
        accountSizeMin: 25000,
        accountSizeMax: 150000,
        profitTarget: '$1,250-$9,000 (5%-6% by account size)',
        maxDailyLoss: 'None in evaluation or funded stage',
        maxDrawdown: 'EOD trailing MLL of $1,000-$4,500',
        profitSplit: '90% to trader',
        platforms: ['NinjaTrader', 'Tradovate', 'TradingView', 'Quantower', 'Sierra Chart', 'R Trader Pro'],
        tradableAssets: ['CME futures'],
        minTradingDays: 'Two-day pass is possible under the published consistency cushion',
        hasConsistencyRule: false,
        consistencyRule: '50% consistency applies in evaluation; no consistency percentage applies in the LucidFlex funded account.',
        linkToStart: 'https://lucidtrading.com/',
      }),
      product({
        id: 'lucid-direct',
        name: 'LucidDirect',
        type: 'Instant funding',
        description: 'Simulated straight-to-funded futures account with no evaluation phase, EOD drawdown and a 20% consistency requirement for payout cycles.',
        accountSizeMin: 25000,
        accountSizeMax: 150000,
        profitTarget: 'First-cycle payout goal of $1,500-$9,000 by account size',
        maxDailyLoss: 'None on 25K; $1,200-$3,000 on larger accounts',
        maxDrawdown: 'EOD trailing MLL of $1,000-$5,000',
        profitSplit: '90% to trader',
        platforms: ['NinjaTrader', 'Tradovate', 'TradingView', 'Quantower', 'Sierra Chart', 'R Trader Pro'],
        tradableAssets: ['CME futures'],
        minTradingDays: 'No evaluation; payout objectives apply immediately',
        hasConsistencyRule: true,
        consistencyRule: 'Largest day must be no more than 20% of total profit during each LucidDirect payout cycle.',
        linkToStart: 'https://lucidtrading.com/',
      }),
    ],
    trustpilotRating: 4.6,
    communitySignal:
      'Large and mostly positive public review volume with repeated fast-payout reports. Keep the signal weighted because the operator is young, reviews are regularly invited and product rules have changed several times.',
    strengths: [
      'Delaware operator and simulated-account structure are disclosed in official terms and account agreements.',
      'Official help center publishes product-level drawdown, consistency, payout and platform rules.',
      'Multiple payout methods and short post-approval processing times are documented.',
    ],
    weaknesses: [
      'Young operating history relative to established futures firms.',
      'Program rules differ materially across LucidPro, LucidFlex and LucidDirect.',
      'Broad discretion over prohibited conduct, trade removal, closure and reward forfeiture.',
      'Strict no-refund policy once any trading activity begins.',
      'Platform availability should be rechecked after the reported ProjectX third-party transition.',
    ],
    additionalSources: [
      { label: 'Lucid Trading Terms of Use', url: 'https://www.lucidtrading.com/terms-of-use/' },
      { label: 'Lucid Trading Risk Disclosure Statement', url: 'https://www.lucidtrading.com/risk-disclosure-statement/' },
      { label: 'Lucid Trading Refund and Chargeback Policy', url: 'https://lucidtrading.com/disclaimer-of-liability-refunds-and-chargeback-policy/' },
      { label: 'LucidPro Account Agreement', url: 'https://lucidtrading.com/wp-content/uploads/2025/04/LucidPro-Trader-Agreement.pdf' },
      { label: 'LucidPro payout rules', url: 'https://support.lucidtrading.com/en/articles/12890092-lucidpro-payouts' },
      { label: 'LucidFlex funded rules', url: 'https://support.lucidtrading.com/en/articles/12945795-lucidflex-funded-account' },
      { label: 'LucidDirect payout objectives', url: 'https://support.lucidtrading.com/en/articles/12890164-luciddirect-payout-objectives' },
      { label: 'Lucid supported platforms', url: 'https://support.lucidtrading.com/en/articles/11404614-supported-platforms' },
      { label: 'Finance Magnates ProjectX prop-firm report', url: 'https://www.financemagnates.com/forex/prop-firms-report-futures-prop-tech-provider-projectx-to-end-its-third-party-service-offering/' },
      { label: 'Trustpilot Lucid Trading', url: 'https://www.trustpilot.com/review/lucidtrading.com' },
    ],
    auditStatus: 'Vérifié multi-source',
    auditSummary:
      'Official terms, account agreements, product rules, payout pages, Trustpilot and Finance Magnates were checked. Lucid Trading Group LLC is named as the Delaware operator. The service is primarily simulated and rewards remain rules-based rather than broker withdrawals. The file stays at medium risk because Lucid is young, rules can change, account agreements grant broad enforcement discretion, refunds stop after trading begins and platform availability has changed across the futures-prop sector.',
    auditSourcesChecked: [
      'Official site and product pages',
      'Terms of Use',
      'Risk disclosure',
      'Refund and chargeback policy',
      'LucidPro and LucidDirect account agreements',
      'Product-level help center rules',
      'Trustpilot review profile',
      'Finance Magnates article/news coverage',
    ],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-12',
      summary:
        'Medium legal and operating risk. Lucid Trading Group LLC is identified in official terms and account agreements as a Delaware limited liability company. The published agreements describe simulated futures accounts, simulated capital and rule-based rewards; users should not infer broker, dealer, advisory or customer-asset protections from the evaluation product. Product documentation is unusually detailed, but closure, forfeiture, arbitration, no-refund and unilateral rule-change clauses remain material.',
      entities: [
        {
          name: 'Lucid Trading Group LLC',
          jurisdiction: 'United States, Delaware',
          registeredAddress: '3500 S Dupont Hwy, Dover, Delaware 19901',
          role: 'Operator named in the Terms of Use, risk disclosure and Lucid account agreements.',
        },
      ],
      regulatoryStatus: [
        'Official agreements describe evaluation and funded-stage activity as simulated futures trading using simulated capital.',
        'Terms state that Lucid is not a broker-dealer and does not manage customer assets or provide financial advice.',
        'No NFA or CFTC registration is documented in PropRadar for the simulated evaluation service; that should not be confused with a normal futures brokerage account.',
        'Disputes are governed by Delaware law, with Delaware courts and possible American Arbitration Association arbitration under the Terms of Use.',
        'A separate agreement applies if Lucid elects to transition a trader to live trading with an affiliate.',
      ],
      complaintsAndDisputes: [
        'The refund policy is strict: once an account has been traded, fees are generally non-refundable, including for isolated technical issues.',
        'Account agreements allow Lucid to remove trades or days, close accounts and forfeit accrued rewards for rule breaches, prohibited conduct, bad faith or 30 days of inactivity.',
        'LucidPro payout eligibility includes profit goals, a 40% consistency limit, a buffer and payout caps; LucidDirect uses a stricter 20% consistency rule.',
        'Positive payout reports are numerous, but review invitations, the young operating history and changing product rules justify continued monitoring.',
      ],
      redFlags: [
        'Simulated capital and rewards do not carry normal broker-account withdrawal or client-asset protections.',
        'Rules may change with or without notice under the published agreements.',
        'Broad discretionary prohibited-conduct and forfeiture clauses require careful reading before purchase.',
        'Platform availability should be confirmed after Finance Magnates reported ProjectX ending third-party prop-firm support.',
        'Official payout-volume and trader-count marketing claims were not treated as independently verified evidence.',
      ],
      sources: [
        { label: 'Official Lucid Trading site', url: 'https://lucidtrading.com/' },
        { label: 'Lucid Trading Terms of Use', url: 'https://www.lucidtrading.com/terms-of-use/' },
        { label: 'Lucid Trading Risk Disclosure Statement', url: 'https://www.lucidtrading.com/risk-disclosure-statement/' },
        { label: 'Lucid Trading Refund and Chargeback Policy', url: 'https://lucidtrading.com/disclaimer-of-liability-refunds-and-chargeback-policy/' },
        { label: 'LucidPro Account Agreement', url: 'https://lucidtrading.com/wp-content/uploads/2025/04/LucidPro-Trader-Agreement.pdf' },
        { label: 'LucidPro payout rules', url: 'https://support.lucidtrading.com/en/articles/12890092-lucidpro-payouts' },
        { label: 'LucidFlex funded rules', url: 'https://support.lucidtrading.com/en/articles/12945795-lucidflex-funded-account' },
        { label: 'LucidDirect payout objectives', url: 'https://support.lucidtrading.com/en/articles/12890164-luciddirect-payout-objectives' },
        { label: 'Lucid supported platforms', url: 'https://support.lucidtrading.com/en/articles/11404614-supported-platforms' },
        { label: 'Finance Magnates ProjectX prop-firm report', url: 'https://www.financemagnates.com/forex/prop-firms-report-futures-prop-tech-provider-projectx-to-end-its-third-party-service-offering/' },
        { label: 'Trustpilot Lucid Trading', url: 'https://www.trustpilot.com/review/lucidtrading.com' },
      ],
    },
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
    score: 25,
    founded: 2024,
    market: 'Futures',
    priceFrom: 99,
    styles: ['Futures', 'Intraday', 'Scalping'],
    productName: 'Alpha Futures evaluation',
    productType: 'Futures evaluation',
    productDescription: 'Futures-focused evaluation to investigate for intraday index traders. Check drawdown type, news windows, payout caps and scaling rules before buying.',
    platforms: ['To verify'],
    tradableAssets: ['Futures'],
    incidents: 4,
    note: 'Stale-domain risk: the listed official domain resolved to an Afternic parked/for-sale page during the July 8, 2026 review.',
    additionalSources: [
      { label: 'Alpha Futures parked domain / Afternic page', url: 'https://alphafutures.com/' },
      { label: 'Alpha Futures Trustpilot search', url: 'https://www.trustpilot.com/search?query=Alpha%20Futures%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Domain-status pass completed. The listed Alpha Futures official domain redirected to an Afternic parked/for-sale page during the July 8, 2026 PropRadar review. Treat this profile as stale or unresolved until a current official prop-firm domain, legal entity and futures broker/FCM disclosures are found.',
    auditSourcesChecked: ['Current domain', 'Afternic parked-domain page', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High stale-entry risk. The current domain did not present a prop-firm product and instead appeared as a parked/for-sale domain. No legal entity, jurisdiction, terms, broker/FCM relationship or payout obligation should be inferred.',
      entities: [
        {
          name: 'Alpha Futures',
          jurisdiction: 'To verify',
          role: 'Futures prop-firm brand/operator not confirmed from the current domain.',
        },
      ],
      regulatoryStatus: [
        'Current domain did not present a usable prop-firm offer in this pass.',
        'Futures broker/FCM relationship and live/simulated account model remain unconfirmed.',
        'Prop-firm legal entity and operating status remain unconfirmed.',
      ],
      complaintsAndDisputes: [
        'Historical mentions should not be mapped to the current domain without proof that the same operator still controls the product.',
      ],
      redFlags: [
        'Listed official domain resolved to a parked/for-sale page.',
        'Do not recommend until a current official prop-firm URL and terms are confirmed.',
      ],
      sources: [
        { label: 'Alpha Futures current domain', url: 'https://alphafutures.com/' },
        { label: 'Alpha Futures Trustpilot search', url: 'https://www.trustpilot.com/search?query=Alpha%20Futures%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 113,
    slug: 'top-one-futures',
    name: 'Top One Futures',
    website: 'https://toponefutures.com/',
    status: 'À surveiller',
    score: 57,
    founded: 2024,
    market: 'Futures',
    priceFrom: 99,
    styles: ['Futures'],
    additionalSources: [
      { label: 'Top One Futures terms URL to recheck manually', url: 'https://toponefutures.com/terms-and-conditions/' },
      { label: 'Top One Futures Trustpilot search', url: 'https://www.trustpilot.com/search?query=Top%20One%20Futures' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Top One Futures official URL was not safe/openable during the July 8, 2026 PropRadar review. Legal entity, terms, broker/FCM relationship, payout rules and simulated/live account status remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. Do not infer that this is related to Top One Trader unless the current official terms, entity and brand relationship are confirmed. Futures-specific broker/FCM and simulated/live account disclosures remain uncaptured.',
      entities: [
        {
          name: 'Top One Futures',
          jurisdiction: 'To verify',
          role: 'Futures prop-firm brand/operator to identify from official legal pages and broker/FCM disclosures.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Futures broker/FCM relationship and live/simulated account model still pending.',
      ],
      complaintsAndDisputes: [
        'Payout, activation fee, drawdown and data/platform complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Primary URL could not be safely opened in the current review path.',
        'Keep out of recommendations until official terms and entity are sourced.',
        'No broker/FCM relationship, refund policy or payout agreement was captured.',
      ],
      sources: [
        { label: 'Top One Futures official site', url: 'https://toponefutures.com/' },
        { label: 'Top One Futures terms URL to recheck manually', url: 'https://toponefutures.com/terms-and-conditions/' },
        { label: 'Top One Futures Trustpilot search', url: 'https://www.trustpilot.com/search?query=Top%20One%20Futures' },
      ],
    },
  }),
  universeFirm({
    id: 114,
    slug: 'e8-futures',
    name: 'E8 Futures',
    website: 'https://e8futures.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2024,
    market: 'Futures',
    priceFrom: 99,
    styles: ['Futures'],
    additionalSources: [
      { label: 'E8 Futures terms URL to recheck manually', url: 'https://e8futures.com/terms-and-conditions/' },
      { label: 'E8 Futures Trustpilot search', url: 'https://www.trustpilot.com/search?query=E8%20Futures' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. E8 Futures official URL was not safe/openable during the July 8, 2026 PropRadar review. Legal entity, relationship with E8 Markets, broker/FCM setup, terms and operating status remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information and brand-extension risk. The E8 brand already has a separate CFD/prop profile in PropRadar, but the futures product must be verified on its own terms before any regulatory conclusion is transferred.',
      entities: [
        {
          name: 'E8 Futures',
          jurisdiction: 'To verify',
          role: 'Futures product/operator to identify from official terms and broker/FCM disclosures.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Relationship with E8 Markets and any broker/FCM provider remains unconfirmed.',
      ],
      complaintsAndDisputes: [
        'Futures-specific complaints should not be merged automatically with E8 Markets CFD/prop complaints.',
      ],
      redFlags: [
        'Primary URL could not be safely opened in the current review path.',
        'Brand extension risk: verify product-specific legal terms before ranking.',
        'No broker/FCM relationship, refund policy or futures payout agreement was captured.',
      ],
      sources: [
        { label: 'E8 Futures official site', url: 'https://e8futures.com/' },
        { label: 'E8 Futures terms URL to recheck manually', url: 'https://e8futures.com/terms-and-conditions/' },
        { label: 'E8 Futures Trustpilot search', url: 'https://www.trustpilot.com/search?query=E8%20Futures' },
      ],
    },
  }),
  universeFirm({
    id: 115,
    slug: 'traders-launch',
    name: 'Traders Launch',
    website: 'https://traderslaunch.com/',
    status: 'À surveiller',
    score: 59,
    founded: 2024,
    headquarters: 'Pennsylvania, United States',
    market: 'Futures',
    priceFrom: 49,
    styles: ['Futures', 'Crypto'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and June 2026 Terms of Service checked. Traders Launch discloses Traders Launch LLC, legal notices in Pennsylvania, and a Philadelphia correspondence address. Terms state that evaluation and funded-stage trading is simulated unless expressly moved to live, that no live brokerage account, real customer funds or real market orders are involved at this stage, and that payouts are discretionary performance-based awards funded by Traders Launch LLC.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. The US LLC and Pennsylvania arbitration/venue clauses are concrete, and the simulated-account disclosure is strong. The caution is commercial: marketing emphasizes fast/daily payouts and zero denials, while terms make funding and payouts conditional, discretionary and simulated-performance based.',
      entities: [
        {
          name: 'Traders Launch LLC',
          jurisdiction: 'Pennsylvania, United States',
          registeredAddress: '1700 Market St Suite 1005, Philadelphia, PA 19103, United States',
          role: 'Website/service operator and party referenced in Terms of Service.',
        },
      ],
      regulatoryStatus: [
        'Terms state all evaluation and funded-stage trading is simulated unless expressly moved to a live trading environment.',
        'Terms state no live brokerage account, real customer funds or real market orders are involved during evaluation/funded stages.',
        'Payouts are funded by Traders Launch LLC and are discretionary performance-based awards calculated from simulated results.',
        'Funding offers are subject to eligibility, background check, due diligence and company discretion.',
      ],
      complaintsAndDisputes: [
        'Disputes are subject to Pennsylvania law, individual arbitration and class-action waiver unless validly opted out.',
        'Partner-program introductions may affect payout eligibility according to the terms.',
      ],
      redFlags: [
        'Daily payout marketing should be weighed against discretionary simulated-award terms.',
        'No-refund policy except fraud-related cases.',
        'Arbitration and class-action waiver materially affect dispute leverage.',
      ],
      sources: [
        { label: 'Traders Launch official site', url: 'https://traderslaunch.com/' },
        { label: 'Traders Launch Terms of Service', url: 'https://traderslaunch.com/terms' },
        { label: 'Traders Launch Trustpilot', url: 'https://www.trustpilot.com/review/traderslaunch.com' },
      ],
    },
  }),
  universeFirm({
    id: 116,
    slug: 'sure-leverage',
    name: 'Sure Leverage',
    website: 'https://sureleverage.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2024,
    priceFrom: 49,
    additionalSources: [
      { label: 'Sure Leverage Funding redirected domain', url: 'https://sureleveragefunding.com/' },
      { label: 'Sure Leverage terms URL to recheck manually', url: 'https://sureleveragefunding.com/terms-and-conditions/' },
      { label: 'Sure Leverage Trustpilot search', url: 'https://www.trustpilot.com/search?query=Sure%20Leverage%20Funding' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Redirect/domain-continuity pass completed. Sure Leverage redirected to sureleveragefunding.com during the July 8, 2026 PropRadar review, but the captured page exposed only minimal image/landing content and no usable legal text. Legal entity, terms, refund policy, simulated-account disclosures and operating status remain unverified from primary sources.',
    auditSourcesChecked: ['Original domain', 'Redirected Sure Leverage Funding domain', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High brand/domain-continuity risk. The redirect suggests a brand/domain change, but the current page did not expose enough legal text to confirm entity, jurisdiction, refund terms or simulated-account model.',
      entities: [
        {
          name: 'Sure Leverage / Sure Leverage Funding',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from current legal pages and company records.',
        },
      ],
      regulatoryStatus: [
        'Current contracting entity not confirmed in PropRadar at this check.',
        'Brand/domain continuity and product status still pending.',
      ],
      complaintsAndDisputes: [
        'Historical complaints should be matched to the correct domain and legal entity before scoring.',
      ],
      redFlags: [
        'Redirect/domain-change risk.',
        'No usable primary legal text captured in this pass.',
        'Do not infer legal structure from the old domain or third-party listings alone.',
      ],
      sources: [
        { label: 'Sure Leverage official domain', url: 'https://sureleverage.com/' },
        { label: 'Sure Leverage Funding redirected domain', url: 'https://sureleveragefunding.com/' },
        { label: 'Sure Leverage terms URL to recheck manually', url: 'https://sureleveragefunding.com/terms-and-conditions/' },
        { label: 'Sure Leverage Trustpilot search', url: 'https://www.trustpilot.com/search?query=Sure%20Leverage%20Funding' },
      ],
    },
  }),
  universeFirm({
    id: 117,
    slug: 'tradexprop',
    name: 'TradeXProp',
    website: 'https://tradexprop.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2024,
    priceFrom: 49,
    headquarters: 'Forest Park FX LTD / Prop Account LLC structure to verify',
    additionalSources: [
      { label: 'TradeXProp Refund Policy', url: 'https://tradexprop.com/refund-policy/' },
      { label: 'TradeXProp Terms and Conditions', url: 'https://tradexprop.com/terms-of-use/' },
      { label: 'TradeXProp Trustpilot search', url: 'https://www.trustpilot.com/search?query=TradeXProp' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and refund page checked. TradeXProp discloses that the product is provided by Forest Park FX LTD, that funding assessments and assessment fees are handled by Forest Park FX LTD, and that qualifying users must enter a Trader Agreement with Forest Park FX LTD. The footer says TradeXProp is not a broker, does not accept client deposits and focuses on simulated proprietary trading and educational tools. Refund policy text still references Prop Account, LLC, creating entity-mapping risk.',
    auditSourcesChecked: ['Official site/footer', 'Refund Policy', 'Terms page attempted', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. TradeXProp now exposes useful simulated-trading and non-broker language, but the legal map is not fully clean: the site footer names Forest Park FX LTD while the refund policy welcomes users to Prop Account, LLC. Users should confirm the actual checkout and Trader Agreement entity before paying.',
      entities: [
        {
          name: 'Forest Park FX LTD',
          jurisdiction: 'To verify',
          role: 'Provider disclosed in TradeXProp footer; offers fee-based simulated trading assessments and receives assessment fees.',
        },
        {
          name: 'Prop Account, LLC',
          jurisdiction: 'To verify',
          role: 'Entity named in the TradeXProp refund policy text; mapping to Forest Park FX LTD and checkout should be verified.',
        },
        {
          name: 'TradeXProp',
          jurisdiction: 'To verify',
          role: 'Brand/site using Forest Park FX LTD provider disclosure.',
        },
      ],
      regulatoryStatus: [
        'Footer says TradeXProp is provided by Forest Park FX LTD.',
        'Footer says Forest Park FX LTD offers fee-based simulated trading assessments and all assessment fees are paid to Forest Park FX LTD.',
        'Footer says qualifying users must enter a Trader Agreement with Forest Park FX LTD.',
        'Footer says TradeXProp is not a broker and does not accept client deposits.',
        'Footer says TradeXProp focuses exclusively on simulated proprietary trading and educational tools and is not required to be authorized or regulated by a financial authority.',
      ],
      complaintsAndDisputes: [
        'Refund policy says no refund is given once login details are emailed after cleared payment, except special circumstances with no trades placed.',
        'Chargebacks or improper disputes can lead to a permanent platform ban according to the refund policy.',
        'Terms page was blocked by verification during this pass, so full dispute, KYC and trader-agreement clauses still need manual capture.',
      ],
      redFlags: [
        'Aggressive 100% payout guarantee and zero-denial marketing should be checked against the Trader Agreement.',
        'Entity mismatch risk between Forest Park FX LTD footer and Prop Account, LLC refund text.',
        'Non-broker/no-deposit/simulated-trading wording means users rely on program contract terms, not broker-style client-money protections.',
        'Terms page was blocked by verification in this pass.',
      ],
      sources: [
        { label: 'TradeXProp official site', url: 'https://tradexprop.com/' },
        { label: 'TradeXProp Refund Policy', url: 'https://tradexprop.com/refund-policy/' },
        { label: 'TradeXProp Terms and Conditions', url: 'https://tradexprop.com/terms-of-use/' },
        { label: 'TradeXProp Trustpilot search', url: 'https://www.trustpilot.com/search?query=TradeXProp' },
      ],
    },
  }),
  universeFirm({
    id: 118,
    slug: 'sfx-funded',
    name: 'SFX Funded',
    website: 'https://sfxfunded.com/',
    status: 'À surveiller',
    score: 57,
    founded: 2024,
    headquarters: 'Dubai, United Arab Emirates',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. SFX Funded discloses SFX International FZCO, states that content is general information only, that SFX Funded does not act as a broker or custodian, that purchases are not deposits, and that program fees are used for operating costs. Its detailed Terms of Service link points to a Google Drive PDF that was not readable without an interactive Google login in this pass.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. The Dubai FZCO disclosure and non-broker/non-custodian wording are useful, but the homepage makes aggressive payout, 100% split, refund and guarantee claims. The actual terms PDF was not captured as readable primary text, so payout guarantee and refund claims need manual confirmation.',
      entities: [
        {
          name: 'SFX International FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          role: 'Company/operator disclosed in official footer as SFX Funded.',
        },
      ],
      regulatoryStatus: [
        'Footer states SFX Funded does not act as or conduct services as a broker.',
        'Footer states SFX Funded does not act as or conduct services as a custodian.',
        'Purchases of programs should not be considered deposits according to the footer.',
        'Applicable law is stated as the laws of the United Arab Emirates.',
      ],
      complaintsAndDisputes: [
        'Payout guarantee, 100% refundable fee and 100% profit-split claims should be checked against the Terms of Service PDF before purchase.',
        'The Google Drive terms link should be archived manually because automated capture only reached a login/loading page.',
      ],
      redFlags: [
        'Aggressive payout and guarantee marketing.',
        'Terms of Service hosted on Google Drive, not easily auditable in this pass.',
        'Program fees are expressly not deposits and the company disclaims broker/custodian status.',
      ],
      sources: [
        { label: 'SFX Funded official site', url: 'https://sfxfunded.com/' },
        { label: 'SFX Funded Terms of Service Google Drive link', url: 'https://drive.google.com/file/d/14MjiKm-s5m3f20pupa0CaudooEzJioRD/view?usp=sharing' },
        { label: 'SFX Funded Trustpilot', url: 'https://www.trustpilot.com/review/sfxfunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 119,
    slug: 'tribe-funded',
    name: 'Tribe Funded',
    website: 'https://tribefunded.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2024,
    priceFrom: 49,
    additionalSources: [
      { label: 'Tribe Funded terms URL to recheck manually', url: 'https://tribefunded.com/terms-and-conditions/' },
      { label: 'Tribe Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Tribe%20Funded' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Tribe Funded official domain returned an internal error or no usable primary text during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, operating status and regulator/public-warning checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain did not return usable primary text, so no contracting entity, refund terms or regulatory status should be inferred from current capture.',
      entities: [
        {
          name: 'Tribe Funded',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Operating status and public-warning checks still pending.',
      ],
      complaintsAndDisputes: [
        'Payout, refund and support complaints need manual classification once primary sources are accessible.',
      ],
      redFlags: [
        'Official domain returned no usable primary legal text in this pass.',
        'Do not recommend until entity and terms are sourced.',
        'No checkout entity, simulated-account disclaimer or refund policy was captured.',
      ],
      sources: [
        { label: 'Tribe Funded official site', url: 'https://tribefunded.com/' },
        { label: 'Tribe Funded terms URL to recheck manually', url: 'https://tribefunded.com/terms-and-conditions/' },
        { label: 'Tribe Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Tribe%20Funded' },
      ],
    },
  }),
  universeFirm({
    id: 120,
    slug: 'atlas-funded',
    name: 'Atlas Funded',
    website: 'https://atlasfunded.com/',
    status: 'À surveiller',
    score: 59,
    founded: 2025,
    headquarters: 'Dubai, United Arab Emirates / Saint Lucia',
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. Atlas Funded discloses ATLAS VANQUISH FZCO t/a Atlas Funded in Dubai and Atlas Funded LTD in Saint Lucia, company number 2025-00597, as provider of simulated trading services. The terms state the company is not a financial broker/advisor/representative, does not accept client deposits, carries out no regulated activities, and its exclusive activity is simulated trading.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. Atlas has clear Dubai and Saint Lucia disclosures, but its own terms say it carries out no regulated activities and is exclusively simulated trading. Payment settlement through Odeonpay/Paysagi adds a merchant-of-record layer, and add-ons/funded-account activation fees create commercial dispute risk.',
      entities: [
        {
          name: 'ATLAS VANQUISH FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registeredAddress: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
          role: 'Supplier / trading name operator disclosed as Atlas Funded.',
        },
        {
          name: 'Atlas Funded LTD',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00597',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Provider of simulated trading services advertised on atlasfunded.com.',
        },
        {
          name: 'Odeonpay ALE S.R.L. / Paysagi',
          jurisdiction: 'To verify',
          role: 'Merchant of record for transaction settlement, not supplier of goods or services.',
        },
      ],
      regulatoryStatus: [
        'Terms state Atlas Funded is not a financial broker, financial advisor or financial representative.',
        'Terms state the company does not accept client deposits and does not carry out regulated activities.',
        'Terms state the company’s exclusive activity is simulated trading.',
        'MT5 services and information are not intended for US citizens/residents.',
      ],
      complaintsAndDisputes: [
        'Atlas Access challenge includes broker fees and post-pass funded-account activation fees; users should check all fee timing before purchase.',
        'Add-on fees are non-refundable in all circumstances according to the terms.',
        'KYC/AML failures can lead to suspension, termination and forfeiture of funds or profits under the terms.',
      ],
      redFlags: [
        'Dubai plus Saint Lucia entity structure.',
        'No regulated activities / no client deposits language.',
        'Pay-after-pass and add-on fee model can create unexpected post-pass costs.',
      ],
      sources: [
        { label: 'Atlas Funded official site', url: 'https://www.atlasfunded.com/' },
        { label: 'Atlas Funded Terms and Conditions', url: 'https://www.atlasfunded.com/terms-conditions' },
        { label: 'Atlas Funded Trustpilot', url: 'https://www.trustpilot.com/review/atlasfunded.com' },
      ],
    },
  }),
  universeFirm({
    id: 121,
    slug: 'tx3-funding',
    name: 'TX3 Funding',
    website: 'https://tx3funding.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2024,
    priceFrom: 49,
    additionalSources: [
      { label: 'TX3 Funding terms URL to recheck manually', url: 'https://tx3funding.com/terms-and-conditions/' },
      { label: 'TX3 Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=TX3%20Funding' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. TX3 Funding official URL was not safe/openable during the July 8, 2026 PropRadar review. Legal entity, brand relationship with past TopTier/Tx3 references, terms, refund policy and operating status remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information and brand-continuity risk. Do not infer current legal structure or continuity from third-party listings or older TopTier/Tx3 references; the current official terms and company entity still need manual capture.',
      entities: [
        {
          name: 'TX3 Funding',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Operating status, terms and public-warning checks remain pending.',
      ],
      complaintsAndDisputes: [
        'Historical complaints should be matched to the correct brand/domain before scoring.',
      ],
      redFlags: [
        'Primary URL could not be safely opened through the current review path.',
        'Keep out of recommendations until official entity and terms are sourced.',
        'Brand relationship with past TopTier/Tx3 references remains unverified from current primary text.',
      ],
      sources: [
        { label: 'TX3 Funding official site', url: 'https://tx3funding.com/' },
        { label: 'TX3 Funding terms URL to recheck manually', url: 'https://tx3funding.com/terms-and-conditions/' },
        { label: 'TX3 Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=TX3%20Funding' },
      ],
    },
  }),
  universeFirm({
    id: 122,
    slug: 'aurafunded',
    name: 'AuraFunded',
    website: 'https://aurafunded.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2025,
    priceFrom: 49,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official AuraFunded URL redirected to AuraPips during the July 8, 2026 pass. The AuraPips homepage and terms still reference AuraFunded services, simulated trading, fictitious funds, non-investment-advice language, non-refundable fees after service use, third-party funded-trader contracts, and a footer stating AuraPips is not a broker or custodian.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. The site gives clear simulated-account and non-broker/non-custodian language, but brand continuity from AuraFunded to AuraPips is messy and no concrete legal entity or jurisdiction was captured. Treat the product as a simulated evaluation service until the actual contracting entity is identified.',
      entities: [
        {
          name: 'AuraFunded / AuraPips',
          jurisdiction: 'To verify',
          role: 'Current brand/operator to identify from invoice, company register or updated legal notice.',
        },
      ],
      regulatoryStatus: [
        'Terms state trading activities are simulations using fictitious funds with no real monetary value.',
        'Terms state AuraFunded does not provide investment services or advice.',
        'Footer states AuraPips does not act as a broker or custodian.',
        'Footer states purchases of programs should not be considered deposits and all provided accounts are demo accounts in a simulated environment.',
      ],
      complaintsAndDisputes: [
        'Brand redirect from AuraFunded to AuraPips should be documented before merging reviews or complaints.',
        'Third-party funded-trader contract language means passing a challenge may not equal a direct contract with AuraFunded/AuraPips.',
      ],
      redFlags: [
        'No concrete legal entity captured in the public legal text.',
        'Brand/domain migration or redirect from AuraFunded to AuraPips.',
        'Fees are non-refundable unless otherwise stated once service conditions are triggered.',
      ],
      sources: [
        { label: 'AuraFunded official domain redirect', url: 'https://aurafunded.com/' },
        { label: 'AuraPips redirected official site', url: 'https://aurapips.com/' },
        { label: 'AuraPips / AuraFunded Terms', url: 'https://aurapips.com/terms/' },
        { label: 'AuraFunded Trustpilot search', url: 'https://www.trustpilot.com/search?query=AuraFunded' },
      ],
    },
  }),
  universeFirm({
    id: 123,
    slug: 'getcryptofunded',
    name: 'GetCryptoFunded',
    website: 'https://getcryptofunded.com/',
    status: 'À surveiller',
    score: 54,
    founded: 2024,
    market: 'Crypto',
    priceFrom: 49,
    styles: ['Crypto'],
    additionalSources: [
      { label: 'GetCryptoFunded terms URL to recheck manually', url: 'https://getcryptofunded.com/terms-and-conditions/' },
      { label: 'GetCryptoFunded Trustpilot search', url: 'https://www.trustpilot.com/search?query=GetCryptoFunded' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited crypto-source pass completed. GetCryptoFunded official URL was not safe/openable during the July 8, 2026 PropRadar review. Legal entity, crypto custody/exchange relationship, terms, refund policy, simulated/live account status and jurisdictional restrictions remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Crypto custody/exchange risk checklist'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information and crypto-specific risk. Crypto-funded offers require extra caution because exchange access, custody, KYC, sanctions, payout rails and token/USDT settlement can change the risk profile materially. No exchange/custody setup or contracting entity was captured.',
      entities: [
        {
          name: 'GetCryptoFunded',
          jurisdiction: 'To verify',
          role: 'Crypto prop-firm brand/operator to identify from official legal pages and company records.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Crypto exchange/custody relationship and simulated/live account model still pending.',
      ],
      complaintsAndDisputes: [
        'Crypto payout, exchange lock, KYC and jurisdiction-restriction complaints need manual classification once sources are accessible.',
      ],
      redFlags: [
        'Primary URL could not be safely opened through the current review path.',
        'Crypto product with unverified custody/exchange/legal structure.',
        'No terms, refund policy, sanctions policy or simulated/live-account disclaimer was captured.',
      ],
      sources: [
        { label: 'GetCryptoFunded official site', url: 'https://getcryptofunded.com/' },
        { label: 'GetCryptoFunded terms URL to recheck manually', url: 'https://getcryptofunded.com/terms-and-conditions/' },
        { label: 'GetCryptoFunded Trustpilot search', url: 'https://www.trustpilot.com/search?query=GetCryptoFunded' },
      ],
    },
  }),
  universeFirm({
    id: 124,
    slug: 'summit-strike-capital',
    name: 'Summit Strike Capital',
    status: 'À surveiller',
    score: 52,
    founded: 2024,
    priceFrom: 0,
    additionalSources: [
      { label: 'Summit Strike Capital Trustpilot search', url: 'https://www.trustpilot.com/search?query=Summit%20Strike%20Capital' },
      { label: 'Summit Strike Capital web search', url: 'https://www.google.com/search?q=Summit+Strike+Capital+prop+firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Identity-triage pass completed. No official website is stored in PropRadar for Summit Strike Capital and exact-name web checks did not surface a reliable current primary source in this pass. Legal entity, operating status, terms, refund policy and public-warning checks remain unverified.',
    auditSourcesChecked: ['No official domain stored', 'Exact-name web search', 'Trustpilot search', 'False-match risk review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High identity risk. No primary-source audit can be completed until an official domain, archived legal document, invoice or company record is identified. Keep as a low-confidence watchlist entry rather than an active prop-firm candidate.',
      entities: [
        {
          name: 'Summit Strike Capital',
          jurisdiction: 'To verify',
          role: 'Brand/operator not identified from primary source.',
        },
      ],
      regulatoryStatus: [
        'No official domain stored in PropRadar for this check.',
        'Do not infer current operations from directory listings.',
      ],
      complaintsAndDisputes: [
        'Needs manual domain discovery before complaint classification.',
      ],
      redFlags: [
        'No official source attached.',
        'Current operating status unknown.',
        'Do not map reviews or complaints to this name without domain evidence.',
      ],
      sources: [
        { label: 'Summit Strike Capital Trustpilot search', url: 'https://www.trustpilot.com/search?query=Summit%20Strike%20Capital' },
        { label: 'Summit Strike Capital web search', url: 'https://www.google.com/search?q=Summit+Strike+Capital+prop+firm' },
      ],
    },
  }),
  universeFirm({
    id: 125,
    slug: 'nostro',
    name: 'Nostro',
    status: 'À surveiller',
    score: 52,
    founded: 2024,
    priceFrom: 0,
    additionalSources: [
      { label: 'Nostro Trustpilot search', url: 'https://www.trustpilot.com/search?query=Nostro%20prop%20firm' },
      { label: 'Nostro prop firm web search', url: 'https://www.google.com/search?q=Nostro+prop+firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Identity-triage pass completed. No official website is stored in PropRadar for Nostro, and the name is too generic to safely identify a prop-firm operator from search results alone. Treat as unresolved until a current official domain or invoice/legal document is found.',
    auditSourcesChecked: ['No official domain stored', 'Exact-name web search', 'Trustpilot search', 'Generic-name false-match review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High identity risk. Because "Nostro" is a generic finance term/brand word, an official domain is required before assigning any legal entity, complaint history or risk conclusion.',
      entities: [
        {
          name: 'Nostro',
          jurisdiction: 'To verify',
          role: 'Brand/operator not identified from primary source.',
        },
      ],
      regulatoryStatus: [
        'No official domain stored in PropRadar for this check.',
        'Entity identity and operating status remain unknown.',
      ],
      complaintsAndDisputes: [
        'Do not merge unrelated Nostro-branded complaints without domain confirmation.',
      ],
      redFlags: [
        'Generic brand name creates false-match risk.',
        'No primary legal source attached.',
        'Do not merge unrelated Nostro-branded finance businesses into this prop-firm profile.',
      ],
      sources: [
        { label: 'Nostro Trustpilot search', url: 'https://www.trustpilot.com/search?query=Nostro%20prop%20firm' },
        { label: 'Nostro prop firm web search', url: 'https://www.google.com/search?q=Nostro+prop+firm' },
      ],
    },
  }),
  universeFirm({
    id: 126,
    slug: 'funding-frontier',
    name: 'Funding Frontier',
    status: 'À surveiller',
    score: 52,
    founded: 2024,
    priceFrom: 0,
    additionalSources: [
      { label: 'Funding Frontier Trustpilot search', url: 'https://www.trustpilot.com/search?query=Funding%20Frontier%20prop%20firm' },
      { label: 'Funding Frontier web search', url: 'https://www.google.com/search?q=Funding+Frontier+prop+firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Identity-triage pass completed. No official website is stored in PropRadar for Funding Frontier. Search results are noisy and include unrelated venture, grant or science-funding content, so the prop-firm identity remains unverified.',
    auditSourcesChecked: ['No official domain stored', 'Exact-name web search', 'Trustpilot search', 'False-match risk review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High identity risk. The name collides with non-prop-firm topics, so PropRadar should require an official URL, archived terms, invoice or company record before keeping it as an active prop-firm candidate.',
      entities: [
        {
          name: 'Funding Frontier',
          jurisdiction: 'To verify',
          role: 'Brand/operator not identified from primary source.',
        },
      ],
      regulatoryStatus: [
        'No official domain stored in PropRadar for this check.',
        'Current operating status and legal entity remain unknown.',
      ],
      complaintsAndDisputes: [
        'Manual domain discovery is required before review or complaint scoring.',
      ],
      redFlags: [
        'No official source attached.',
        'High false-match risk in search results.',
        'Do not infer operations from directory mentions or generic funding pages.',
      ],
      sources: [
        { label: 'Funding Frontier Trustpilot search', url: 'https://www.trustpilot.com/search?query=Funding%20Frontier%20prop%20firm' },
        { label: 'Funding Frontier web search', url: 'https://www.google.com/search?q=Funding+Frontier+prop+firm' },
      ],
    },
  }),
  universeFirm({
    id: 127,
    slug: 'funded7',
    name: 'Funded7',
    website: 'https://funded7.com/',
    status: 'À surveiller',
    score: 60,
    founded: 2025,
    headquarters: 'Cyprus / Seychelles / Saint Lucia',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms and Conditions and refund/dispute policy checked. Funded7 discloses ICHIBAN TECH LTD in Cyprus, SUCCESSIO LTD in Seychelles and FUNDED7 LTD in Saint Lucia. Terms state Funded7 is not licensed to offer investment services, does not accept client funds, does not function as a broker, and that payments are final challenge-evaluation fees. Footer also says purchases are final and should not be considered deposits.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. Funded7 gives concrete entities and explicit non-investment/non-broker language, but the multi-jurisdiction Cyprus/Seychelles/Saint Lucia structure, final-payment posture, strict rule/termination powers and public-dispute confidentiality clauses require caution.',
      entities: [
        {
          name: 'ICHIBAN TECH LTD',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE 470329 / 470329',
          registeredAddress: 'Kyrillou Loukareos 40, Kato Polemidia, 4156, Limassol, Cyprus',
          role: 'Company representing Funded7 in Terms and footer disclosures.',
        },
        {
          name: 'SUCCESSIO LTD',
          jurisdiction: 'Seychelles',
          registrationNumber: '245758',
          role: 'Company representing Funded7 in Terms and footer disclosures.',
        },
        {
          name: 'FUNDED7 LTD',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00900',
          registeredAddress: 'Hewanorra House, Truo Garnier Financial Centre, Pointe Seraphine, Castries, Saint Lucia',
          role: 'Associated Funded7 entity disclosed in footer.',
        },
      ],
      regulatoryStatus: [
        'Terms state Funded7 is not licensed to offer investment services and does not engage in such activities.',
        'Terms state the company does not accept client funds and does not function as a broker or facilitate financial-service transactions.',
        'Terms state payments are final and intended for challenge evaluations.',
        'Footer states purchases are final and should not be considered deposits.',
      ],
      complaintsAndDisputes: [
        'Refunds are only available within 7 days if no trades have been executed; once trading starts, fees are final.',
        'Public sharing of communications can trigger account termination or public response with personal/account details under the terms.',
        'Promotional/free challenge payouts can be capped and paid under different terms.',
      ],
      redFlags: [
        'Multi-entity Cyprus/Seychelles/Saint Lucia structure.',
        'Not licensed for investment services according to its own terms.',
        'Strict no-refund-after-trading and confidentiality/public-dispute clauses.',
      ],
      sources: [
        { label: 'Funded7 official site', url: 'https://funded7.com/' },
        { label: 'Funded7 Terms and Conditions', url: 'https://funded7.com/terms-and-conditions/' },
        { label: 'Funded7 Dispute Resolution and Refund Policy', url: 'https://funded7.com/dispute-resolution-and-refund-policy/' },
        { label: 'Funded7 Trustpilot', url: 'https://www.trustpilot.com/review/funded7.com' },
      ],
    },
  }),
  universeFirm({
    id: 128,
    slug: 'equity-edge',
    name: 'Equity Edge',
    status: 'À surveiller',
    score: 52,
    founded: 2024,
    priceFrom: 0,
    additionalSources: [
      { label: 'Equity Edge Trustpilot search', url: 'https://www.trustpilot.com/search?query=Equity%20Edge%20prop%20firm' },
      { label: 'Equity Edge prop firm web search', url: 'https://www.google.com/search?q=Equity+Edge+prop+firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Identity-triage pass completed. No official website is stored in PropRadar for Equity Edge. The name is generic and can match unrelated finance, education or trading businesses, so legal entity and prop-firm status remain unverified.',
    auditSourcesChecked: ['No official domain stored', 'Exact-name web search', 'Trustpilot search', 'Generic-name false-match review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High identity risk. Require an official domain, archived terms or invoice evidence before assigning an entity, importing reviews or ranking the firm.',
      entities: [
        {
          name: 'Equity Edge',
          jurisdiction: 'To verify',
          role: 'Brand/operator not identified from primary source.',
        },
      ],
      regulatoryStatus: [
        'No official domain stored in PropRadar for this check.',
        'Current operating status and terms remain unknown.',
      ],
      complaintsAndDisputes: [
        'Do not classify reviews until the correct Equity Edge entity/domain is identified.',
      ],
      redFlags: [
        'Generic name with false-match risk.',
        'No primary legal source attached.',
        'Do not merge unrelated Equity Edge finance or education businesses into this prop-firm profile.',
      ],
      sources: [
        { label: 'Equity Edge Trustpilot search', url: 'https://www.trustpilot.com/search?query=Equity%20Edge%20prop%20firm' },
        { label: 'Equity Edge prop firm web search', url: 'https://www.google.com/search?q=Equity+Edge+prop+firm' },
      ],
    },
  }),
  universeFirm({
    id: 129,
    slug: 'myfxcapital',
    name: 'MyFxCapital',
    website: 'https://myfxcapital.com/',
    status: 'À surveiller',
    score: 52,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'MyFxCapital terms URL to recheck manually', url: 'https://myfxcapital.com/terms-and-conditions/' },
      { label: 'MyFxCapital Trustpilot search', url: 'https://www.trustpilot.com/search?query=MyFxCapital' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. MyFxCapital official domain loaded only as a title/no-text page during the July 8, 2026 PropRadar review, showing the title "The Most Trusted Prop Firm for Forex & Funded Trading Accounts" but no usable legal body text. Legal entity, terms, refund policy, simulated-account language and operating status remain unverified.',
    auditSourcesChecked: ['Official domain title capture', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The brand appears to have an official domain, but PropRadar did not capture enough primary legal text to identify the contracting entity, jurisdiction, refund posture, simulated-account wording or regulatory posture.',
      entities: [
        {
          name: 'MyFxCapital',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages, invoice data or company records.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Terms, refund policy and regulator/public-warning checks remain pending.',
      ],
      complaintsAndDisputes: [
        'Reviews and complaints should not be scored until the current legal entity and operating status are confirmed.',
      ],
      redFlags: [
        'Primary domain returned no usable legal text in the current review path.',
        'Keep out of recommendations until terms and entity are sourced.',
        'Marketing title alone is not enough evidence of current operations or legal obligations.',
      ],
      sources: [
        { label: 'MyFxCapital official site', url: 'https://myfxcapital.com/' },
        { label: 'MyFxCapital terms URL to recheck manually', url: 'https://myfxcapital.com/terms-and-conditions/' },
        { label: 'MyFxCapital Trustpilot search', url: 'https://www.trustpilot.com/search?query=MyFxCapital' },
      ],
    },
  }),
  universeFirm({
    id: 130,
    slug: 'alphaproptraders',
    name: 'AlphaPropTraders',
    website: 'https://alphaproptraders.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2024,
    headquarters: 'Romania',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. Alpha Prop Traders discloses Romania as applicable jurisdiction, says it does not operate as a broker or custodian, and states all client accounts are demo accounts in a simulated trading environment. The site also markets digital company shares/SFTs, payout milestones and company-stake opportunities, which adds a separate promotional risk layer.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. Simulated-account and non-broker/non-custodian language is explicit, but no concrete registered company name or registration number was captured. The digital-share/SFT marketing should be treated as a separate legal/commercial risk until token/share terms are reviewed.',
      entities: [
        {
          name: 'Alpha Prop Traders',
          jurisdiction: 'Romania',
          role: 'Brand/operator disclosed by site footer, but company registration details still need verification.',
        },
      ],
      regulatoryStatus: [
        'Footer states Alpha Prop Traders does not operate as a broker or custodian.',
        'Footer states all accounts provided to clients are demo accounts in a simulated trading environment.',
        'Footer states program fees contribute to operating costs and content is general information only.',
        'Restricted countries include the United Arab Emirates, the United States and Vietnam.',
      ],
      complaintsAndDisputes: [
        'Digital shares/SFT claims should be reviewed separately from prop-firm challenge terms.',
        'Payout and funded-account claims should be checked against platform terms and KYC rules.',
      ],
      redFlags: [
        'No concrete company registration number captured on the public page.',
        'Digital company-share/SFT promotion adds non-standard legal risk.',
        'Demo-account model only despite funding/profit language.',
      ],
      sources: [
        { label: 'Alpha Prop Traders official site', url: 'https://alphaproptraders.com/' },
        { label: 'Alpha Prop Traders platform', url: 'https://platform.alphaproptraders.com/' },
        { label: 'Alpha Prop Traders Trustpilot search', url: 'https://www.trustpilot.com/search?query=AlphaPropTraders' },
      ],
    },
  }),
  universeFirm({
    id: 131,
    slug: 'syndicate-funded',
    name: 'Syndicate Funded',
    website: 'https://syndicatefunded.com/',
    status: 'À surveiller',
    score: 52,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Syndicate Funded terms URL to recheck manually', url: 'https://syndicatefunded.com/terms-and-conditions/' },
      { label: 'Syndicate Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Syndicate%20Funded' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Syndicate Funded official domain returned only a redirect/no usable body text during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, operating status and regulator/public-warning checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain redirect/no-text capture', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain exists but did not expose usable primary legal text in this environment, so no contracting entity, jurisdiction or refund posture should be inferred.',
      entities: [
        {
          name: 'Syndicate Funded',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company registers.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Operating status and public-warning checks remain pending.',
      ],
      complaintsAndDisputes: [
        'Payout, refund and account-rule complaints need manual classification once primary terms are accessible.',
      ],
      redFlags: [
        'No usable primary legal text captured.',
        'Keep out of recommendations until entity and terms are sourced.',
        'Redirect/no-text capture means old reviews may not describe the current operator.',
      ],
      sources: [
        { label: 'Syndicate Funded official site', url: 'https://syndicatefunded.com/' },
        { label: 'Syndicate Funded terms URL to recheck manually', url: 'https://syndicatefunded.com/terms-and-conditions/' },
        { label: 'Syndicate Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Syndicate%20Funded' },
      ],
    },
  }),
  universeFirm({
    id: 132,
    slug: 'fxci',
    name: 'FXCI',
    website: 'https://fxci.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2023,
    headquarters: 'United Kingdom',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and terms checked. FXCI discloses FXCI Challenge LTD in the UK, company number 15068590, at 483 Green Lanes, London. The site also announces a move to OneFunded. Terms state the provider is not FCA registered or regulated, provides simulated trading and educational tools only, does not accept deposits or manage client funds, and does not provide real trading services on financial markets.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. FXCI has a concrete UK company disclosure and detailed simulated-trading terms, but the homepage migration to OneFunded creates brand-continuity risk. The terms explicitly say FXCI is not FCA registered or regulated and that all services are simulated/educational.',
      entities: [
        {
          name: 'FXCI Challenge LTD',
          jurisdiction: 'United Kingdom',
          registrationNumber: '15068590',
          registeredAddress: '483 Green Lanes, London, England, N13 4BS',
          role: 'Website/service provider trading as FXCI.',
        },
      ],
      regulatoryStatus: [
        'Terms state FXCI is not registered or regulated by the FCA and does not engage in regulated activities.',
        'Terms state services are educational, not investment services, do not accept deposits and do not manage client funds.',
        'Terms state FXCI only provides simulated trading and educational tools.',
        'Terms state simulated trading funds are fictional and not suitable for actual trading.',
      ],
      complaintsAndDisputes: [
        'Brand migration to OneFunded should be documented before merging complaints and reviews.',
        'Separate agreement may apply if a user is invited to become an FXCI EXPERT.',
      ],
      redFlags: [
        'Not FCA registered or regulated according to its own terms.',
        'Homepage announces move to OneFunded.',
        'Marketing claims large rewards while terms state simulated/fictional funds.',
      ],
      sources: [
        { label: 'FXCI official site', url: 'https://fxci.com/' },
        { label: 'FXCI Terms and Conditions', url: 'https://fxci.com/terms-and-conditions/' },
        { label: 'FXCI Refund Policy', url: 'https://fxci.com/refund-policy/' },
        { label: 'OneFunded migration target', url: 'https://onefunded.com/' },
      ],
    },
  }),
  universeFirm({
    id: 133,
    slug: 'monevis',
    name: 'Monevis Funding Platform',
    website: 'https://monevis.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2023,
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. Monevis discloses Monevis Brokers Ltd as the platform operator, says it provides simulated trading and educational tools, does not act as a broker and does not accept deposits. The site heavily markets AI features, instant funding, blockchain-verified payouts and real payouts, so the simulated/non-deposit wording must stay visible.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. The footer has useful non-broker/non-deposit and simulated-trading disclosures, but no jurisdiction or registration number was captured in this pass. AI/instant-funding/blockchain-payout marketing increases the need for terms and payout evidence review.',
      entities: [
        {
          name: 'Monevis Brokers Ltd',
          jurisdiction: 'To verify',
          role: 'Platform operator disclosed in official footer.',
        },
      ],
      regulatoryStatus: [
        'Footer states Monevis Brokers Ltd only provides simulated trading and educational tools.',
        'Footer states Monevis Brokers Ltd companies do not act as a broker and do not accept any deposits.',
        'Footer says platforms and data feed are powered by liquidity providers.',
        'Restricted persons include sanctioned jurisdictions and sanction-list persons/entities.',
      ],
      complaintsAndDisputes: [
        'Instant-funding and blockchain payout claims should be checked against terms and actual payout certificates.',
        'Fee non-refundable language appears in plan cards and should be checked against full terms.',
      ],
      redFlags: [
        'No jurisdiction/registration number captured on the public page.',
        'Strong AI/instant-funding/real-payout marketing beside simulated-account disclosures.',
        'Broker-like name "Monevis Brokers Ltd" despite non-broker disclaimer.',
      ],
      sources: [
        { label: 'Monevis official site', url: 'https://monevis.com/' },
        { label: 'Monevis contact page', url: 'https://monevis.com/contact' },
        { label: 'Monevis Trustpilot search', url: 'https://www.trustpilot.com/search?query=Monevis' },
      ],
    },
  }),
  universeFirm({
    id: 134,
    slug: 'funded-trader-markets',
    name: 'Funded Trader Markets',
    website: 'https://fundedtradermarkets.com/',
    status: 'À surveiller',
    score: 59,
    founded: 2025,
    headquarters: 'Cyprus / United Arab Emirates / Saint Lucia',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. Funded Trader Markets discloses FTM Funded Trader Markets LTD in Cyprus, Formed Technologies INT FZCO in the UAE and Funded Trader Markets LTD in Saint Lucia. The site states FTM offers demo accounts for educational purposes in a non-live environment, does not offer investment or financial advice, and uses simulated/hypothetical performance disclosures.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. FTM gives unusually concrete multi-entity disclosure, but the contracting entity is determined at registration/checkout and may differ by client. Saint Lucia is described as providing brokerage services and MT4/5, while the public site emphasizes demo/non-live accounts, so users must preserve invoice/entity evidence.',
      entities: [
        {
          name: 'FTM Funded Trader Markets LTD',
          jurisdiction: 'Cyprus',
          registrationNumber: 'HE462185',
          registeredAddress: '56 Alekou Konstantinou, Strovolos, 2024, Nicosia, Cyprus',
          role: 'Group entity disclosed in official footer.',
        },
        {
          name: 'Formed Technologies INT FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registrationNumber: '36580',
          registeredAddress: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE',
          role: 'UAE group/payment/contracting entity disclosed in official footer.',
        },
        {
          name: 'Funded Trader Markets LTD',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00239',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Entity disclosed as providing brokerage services and MT4/5.',
        },
      ],
      regulatoryStatus: [
        'Footer states FTM offers demo accounts for educational purposes in a non-live environment.',
        'Footer states FTM does not offer investment or financial advice or trading strategies/recommendations.',
        'Contracting entity is determined at account registration and specified in accepted terms.',
        'Jurisdiction restrictions include Cuba, Syria, Iran, Lebanon, Iraq, Yemen, North Korea and Cyprus; MT5/cTrader content is not intended for US residents.',
      ],
      complaintsAndDisputes: [
        'Users should save checkout, invoice and accepted terms because the contracting/payment entity can differ.',
        '24-hour reward guarantee and on-chain payout claims should be reconciled with full Terms of Service and refund policy.',
      ],
      redFlags: [
        'Multi-entity Cyprus/UAE/Saint Lucia structure.',
        'Saint Lucia entity is described as providing brokerage services while public product language emphasizes demo/non-live accounts.',
        'Contracting entity changes by registration/checkout context.',
      ],
      sources: [
        { label: 'Funded Trader Markets official site', url: 'https://fundedtradermarkets.com/' },
        { label: 'Funded Trader Markets Terms of Service', url: 'https://fundedtradermarkets.com/terms-of-service' },
        { label: 'Funded Trader Markets Refund Policy', url: 'https://fundedtradermarkets.com/refund-policy' },
        { label: 'Funded Trader Markets Trustpilot', url: 'https://www.trustpilot.com/review/fundedtradermarkets.com' },
      ],
    },
  }),
  universeFirm({
    id: 135,
    slug: 'funds-for-traders',
    name: 'Funds For Traders',
    website: 'https://fundsfortraders.com/',
    status: 'À surveiller',
    score: 51,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Funds For Traders terms URL to recheck manually', url: 'https://fundsfortraders.com/terms-and-conditions/' },
      { label: 'Funds For Traders Trustpilot search', url: 'https://www.trustpilot.com/search?query=Funds%20For%20Traders' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Funds For Traders official domain returned an internal/safe-open error during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, operating status and regulator/public-warning checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. The official domain did not provide usable primary text in this environment, so no legal entity, regulator status or payout obligation should be inferred.',
      entities: [
        {
          name: 'Funds For Traders',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from official legal pages and company records.',
        },
      ],
      regulatoryStatus: [
        'Official legal entity not confirmed in PropRadar at this check.',
        'Operating status and public-warning checks remain pending.',
      ],
      complaintsAndDisputes: [
        'Complaints need manual classification once primary terms are accessible.',
      ],
      redFlags: [
        'Official site returned an internal error in this pass.',
        'Keep out of recommendations until entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Funds For Traders official site', url: 'https://fundsfortraders.com/' },
        { label: 'Funds For Traders terms URL to recheck manually', url: 'https://fundsfortraders.com/terms-and-conditions/' },
        { label: 'Funds For Traders Trustpilot search', url: 'https://www.trustpilot.com/search?query=Funds%20For%20Traders' },
      ],
    },
  }),
  universeFirm({
    id: 136,
    slug: 'now-trade-funded',
    name: 'Now Trade Funded',
    website: 'https://nowtradefunded.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2024,
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and Schedule of Assessment programs PDF checked. Now Trade Funded markets simulated funds and Now Meta IO / Laser Trader infrastructure. The schedule references Terms and Conditions for a Technology Access and Trader Assessment Program, sets program rules, states no refund upon withdrawal for many plans, and includes restricted territories. Full legal entity and core terms PDF were not captured because the terms PDF fetch was throttled.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. Product rules are visible and the site uses simulated-funds language, but the core terms PDF and legal entity were not captured in full. Because the page references broker-like infrastructure, blockchain risk technology and Laser Trader CFD platform access, the legal entity and provider chain should be verified before any recommendation.',
      entities: [
        {
          name: 'Now Trade Funded',
          jurisdiction: 'To verify',
          role: 'Brand/operator to identify from the full Terms and Conditions PDF and invoice data.',
        },
      ],
      regulatoryStatus: [
        'Homepage describes the funded stage as using simulated funds.',
        'SOA PDF references Terms and Conditions for a Technology Access and Trader Assessment Program.',
        'SOA PDF lists program fees, profit splits, inactivity periods, consistency rules and prohibited practices.',
        'Restricted territories include Cuba, Iran, North Korea, Myanmar, Russia/Crimea/Donetsk/Luhansk, Somalia and Syria.',
      ],
      complaintsAndDisputes: [
        'Refund terms vary by challenge and many rows state no refund upon withdrawal.',
        'First withdrawal timing, profit caps and consistency rules should be checked before purchase.',
        'Full Terms and Conditions PDF should be archived manually because automated fetch was throttled.',
      ],
      redFlags: [
        'Legal entity not captured from usable text in this pass.',
        'Core terms PDF not fully fetched.',
        'Broker/platform/provider chain needs verification.',
      ],
      sources: [
        { label: 'Now Trade Funded official site', url: 'https://nowtradefunded.com/' },
        { label: 'Now Trade Schedule of Assessment PDF', url: 'https://nowtradefunded.com/wp-content/uploads/2024/06/Now-Trade-SOA-18-03-2024-1.docx-1.pdf' },
        { label: 'Now Trade Terms PDF link', url: 'https://nowtradefunded.com/wp-content/uploads/2024/03/Proptradetech-terms-and-conditions-NowTrade-1.pdf' },
        { label: 'Now Trade Trustpilot search', url: 'https://www.trustpilot.com/search?query=Now%20Trade%20Funded' },
      ],
    },
  }),
  universeFirm({
    id: 137,
    slug: 'dei-funded',
    name: 'Dei Funded',
    website: 'https://deifunded.com/',
    status: 'À surveiller',
    score: 38,
    founded: 2023,
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Domain-mismatch pass completed. Official-looking domain deifunded.com returned unrelated Indonesian lottery/togel content during the July 8, 2026 PropRadar review. Treat this as a stale, abandoned, repurposed or compromised-domain risk, not as a current prop-firm purchase candidate.',
    auditSourcesChecked: ['Current domain', 'Unrelated togel/lottery page capture', 'Trustpilot search', 'Stale-domain classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High source risk. The domain currently appears unrelated to prop trading, so the original prop-firm entry may be stale, abandoned or misdirected.',
      entities: [
        {
          name: 'Dei Funded',
          jurisdiction: 'To verify',
          role: 'Historical/claimed prop-firm brand not confirmed from current domain.',
        },
      ],
      regulatoryStatus: [
        'Current domain did not present a prop-firm offer in this pass.',
        'Captured page is unrelated Indonesian lottery/togel content, not a trading-evaluation service.',
        'Legal entity and operating status remain unconfirmed.',
      ],
      complaintsAndDisputes: [
        'Do not merge old prop-firm reviews with current unrelated domain content.',
      ],
      redFlags: [
        'Domain mismatch or possible stale/repurposed domain.',
        'No usable primary prop-firm legal text captured.',
        'Do not send users to the current domain as a prop-firm purchase path.',
      ],
      sources: [
        { label: 'Dei Funded current domain', url: 'https://deifunded.com/' },
        { label: 'Dei Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Dei%20Funded' },
      ],
    },
  }),
  universeFirm({
    id: 138,
    slug: 'fxrk',
    name: 'FXRK',
    website: 'https://fxrk.com/',
    status: 'À surveiller',
    score: 59,
    founded: 2025,
    headquarters: 'Dubai, United Arab Emirates / Saint Lucia / United States',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. FXRK discloses FXRK Markets Ltd in Saint Lucia, company number 2025-00737, Challenge Technologies FZCO in Dubai as website owner/operator, and X SHARPE LLC as a possible U.S. payment processor. Footer states all trading uses virtual funds in a simulated environment, does not involve real financial risk or actual financial instruments, and purchases are not deposits.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. FXRK gives concrete entities and clear simulated/virtual-fund language, but marketing uses broker-like phrasing such as in-house broker and prime execution. Users should treat challenge fees and displayed balances as simulated program terms, not deposits or broker account balances.',
      entities: [
        {
          name: 'FXRK Markets Ltd.',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00737',
          registeredAddress: 'Ground Floor, Rodney Court Building, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Entity disclosed for trading activities on the platform.',
        },
        {
          name: 'Challenge Technologies FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registeredAddress: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
          role: 'Website owner/operator and FXRK trademark owner disclosed in footer.',
        },
        {
          name: 'X SHARPE LLC',
          jurisdiction: 'United States',
          role: 'Possible payment processor disclosed in official footer.',
        },
      ],
      regulatoryStatus: [
        'Footer states trading uses virtual funds in a simulated environment.',
        'Footer states trading does not involve real financial risk or actual financial instruments.',
        'Purchases should not be considered deposits according to the official footer.',
        'Restricted countries include Pakistan, Iran, Syria, Myanmar, Bangladesh, North Korea, Russia, Belarus, Cuba, Lebanon, Libya, Sudan, UAE and sanctioned jurisdictions.',
      ],
      complaintsAndDisputes: [
        'Broker-like marketing should be reconciled with simulated/virtual-fund disclaimers.',
        'Users should preserve checkout and payment-processor evidence if X SHARPE LLC processes payment.',
      ],
      redFlags: [
        'Dubai/Saint Lucia/US payment-processor structure.',
        'In-house broker wording beside explicit simulated-account language.',
        'No deposit rights; program fees are operational expenses.',
      ],
      sources: [
        { label: 'FXRK official site', url: 'https://fxrk.com/' },
        { label: 'FXRK Terms and Conditions', url: 'https://fxrk.com/terms-and-conditions' },
        { label: 'FXRK Trustpilot', url: 'https://www.trustpilot.com/review/fxrk.com' },
      ],
    },
  }),
  universeFirm({
    id: 139,
    slug: 'forexive',
    name: 'Forexive',
    website: 'https://forexive.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2024,
    headquarters: 'United Kingdom',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. Forexive discloses FOREXIVE LTD at 3rd Floor, 86-90 Paul Street, London, company number 15746920. The site says FOREXIVE only provides simulated trading and educational tools, companies do not act as a broker and do not accept deposits, while marketing up to $400K simulated capital and up to $2M scaling.',
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium regulatory risk. The UK company disclosure improves traceability, and the non-broker/non-deposit/simulated language is clear. Risk remains because marketing leans heavily on rewards, scaling and 24-hour payout promises while the account model is simulated.',
      entities: [
        {
          name: 'FOREXIVE LTD',
          jurisdiction: 'United Kingdom',
          registrationNumber: '15746920',
          registeredAddress: '3rd Floor, 86-90 Paul Street, London, EC2A 4NE, United Kingdom',
          role: 'Company disclosed in official footer.',
        },
      ],
      regulatoryStatus: [
        'Footer states FOREXIVE only provides simulated trading and educational tools for traders.',
        'Footer states FOREXIVE companies do not act as a broker and do not accept deposits.',
        'Site markets simulated capital and simulated accounts.',
        'Information is educational and not investment advice or recommendation.',
      ],
      complaintsAndDisputes: [
        'Reward and scaling disputes should be checked against current Terms and Conditions and app dashboard rules.',
        'Pay-after-pass / Live Access model should be reviewed for post-pass fee obligations.',
      ],
      redFlags: [
        'UK company disclosure does not equal FCA authorization for the prop product.',
        'Payout/scaling marketing should be weighed against simulated-account terms.',
      ],
      sources: [
        { label: 'Forexive official site', url: 'https://forexive.com/' },
        { label: 'Forexive Terms and Conditions', url: 'https://forexive.com/terms-and-conditions/' },
        { label: 'Forexive Trustpilot search', url: 'https://www.trustpilot.com/search?query=Forexive' },
      ],
    },
  }),
  universeFirm({
    id: 140,
    slug: 'onlyfunds',
    name: 'OnlyFunds',
    website: 'https://onlyfunds.com/',
    status: 'À surveiller',
    score: 51,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'OnlyFunds terms URL to recheck manually', url: 'https://onlyfunds.com/terms-and-conditions/' },
      { label: 'OnlyFunds Trustpilot search', url: 'https://www.trustpilot.com/search?query=OnlyFunds%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. OnlyFunds official domain returned an internal/safe-open error during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy, operating status and warning-list checks remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because the official domain did not return usable text. No contracting entity, refund policy, simulated/live-account wording or regulatory status should be inferred.',
      entities: [{ name: 'OnlyFunds', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Operating status and terms remain pending.'],
      complaintsAndDisputes: ['Reviews and payout complaints need classification once current terms are accessible.'],
      redFlags: [
        'Official site returned an internal error.',
        'Keep out of recommendations until legal entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'OnlyFunds official site', url: 'https://onlyfunds.com/' },
        { label: 'OnlyFunds terms URL to recheck manually', url: 'https://onlyfunds.com/terms-and-conditions/' },
        { label: 'OnlyFunds Trustpilot search', url: 'https://www.trustpilot.com/search?query=OnlyFunds%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 141,
    slug: 'myfundedcapital',
    name: 'MyFundedCapital',
    website: 'https://myfundedcapital.com/',
    status: 'À surveiller',
    score: 59,
    founded: 2025,
    headquarters: 'Dubai, United Arab Emirates / Cyprus',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. My Funded Capital discloses MFC Technologies LLC FZ with company registration 2312107.01 and My Funded Capital - FZCO / DSO-FZCO-33417 at The Meydan Hotel, Dubai. Footer states the firm is not a broker, does not accept client deposits, does not carry out regulated activities, and provides access exclusively to demo accounts in a simulated trading environment.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. MFC gives concrete Dubai entity details and very explicit simulated/demo disclaimers, but it also uses strong real-market and funded-account marketing. The site says regulated authorization is not required because its exclusive activities are prop trading and trading education.',
      entities: [
        {
          name: 'MFC Technologies LLC FZ',
          jurisdiction: 'Dubai, United Arab Emirates',
          registrationNumber: '2312107.01',
          role: 'Company disclosed in official footer.',
        },
        {
          name: 'My Funded Capital - FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registrationNumber: 'DSO-FZCO-33417',
          registeredAddress: 'Business Center 1, M Floor, The Meydan Hotel, Nad Al Sheba, Dubai, United Arab Emirates',
          role: 'Brand/entity disclosed for demo-account services.',
        },
      ],
      regulatoryStatus: [
        'Footer states My Funded Capital is not a broker and does not accept client deposits.',
        'Footer states My Funded Capital does not carry out regulated activities and is not required to be authorized by regulatory authorities.',
        'Footer states services provide access exclusively to demo accounts in a simulated trading environment.',
        'Funded accounts are not live trading accounts and are fully simulated using real market quotes.',
      ],
      complaintsAndDisputes: [
        'Add-ons, payout-on-demand and max payout/cycle terms should be checked before purchase.',
        'The "Introducing Broker" wording should be reconciled with the no-broker/no-live-account disclaimers.',
      ],
      redFlags: [
        'Explicit non-regulated activity posture.',
        'Broker-like language and real-market marketing beside simulated-account disclaimers.',
        'Dubai free-zone company structure with Cyprus operational hub mention.',
      ],
      sources: [
        { label: 'MyFundedCapital official site', url: 'https://myfundedcapital.com/' },
        { label: 'MyFundedCapital Terms and Conditions', url: 'https://myfundedcapital.com/terms-and-conditions/' },
        { label: 'MyFundedCapital Trustpilot', url: 'https://www.trustpilot.com/review/myfundedcapital.com' },
      ],
    },
  }),
  universeFirm({
    id: 142,
    slug: 'upcomers',
    name: 'Upcomers',
    website: 'https://upcomers.com/',
    status: 'À surveiller',
    score: 60,
    founded: 2025,
    headquarters: 'Saint Lucia / Dubai, United Arab Emirates',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. Upcomers discloses Upcomers Ltd in Saint Lucia, registration 2025-00579, and Royal Flow - FZCO in the UAE, licence 35886. Footer states Royal Flow - FZCO provides simulated trading accounts for educational purposes, users never deposit capital for investment, Royal Flow does not act as a broker, accept deposits, facilitate live trading or provide investment services, and all accounts are simulated.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. Upcomers has detailed Saint Lucia/UAE entity disclosures and strong simulated-account disclaimers. The caution is that the homepage markets futures, crypto, up to $1.5M and 99% split while the legal footer says all accounts are simulated and testimonials/payout certifications are hypothetical.',
      entities: [
        {
          name: 'Upcomers Ltd.',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00579',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Legal entity for additional trading platforms currently being integrated.',
        },
        {
          name: 'Royal Flow - FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registrationNumber: 'License 35886',
          registeredAddress: 'Building A1, IFZA Business Park, Dubai Silicon Oasis, United Arab Emirates',
          role: 'Technology and education company operating TradeLocker and Bybit platform access.',
        },
      ],
      regulatoryStatus: [
        'Royal Flow - FZCO provides access to simulated trading accounts for educational purposes only.',
        'Users never deposit capital for investment nor risk their own funds according to the footer.',
        'Royal Flow - FZCO does not act as a broker, accept deposits, facilitate live trading or provide investment services.',
        'All accounts operate in a simulated environment with no guarantee of returns or profit.',
      ],
      complaintsAndDisputes: [
        'Payout certifications/testimonials are described as hypothetical and should be treated cautiously.',
        'Bybit/TradeLocker references require checking platform-specific restrictions and user location.',
      ],
      redFlags: [
        'Saint Lucia plus Dubai entity structure.',
        'Aggressive marketing beside hypothetical/simulated disclosure.',
        'Fees are for software/evaluation access and are non-refundable unless policy says otherwise.',
      ],
      sources: [
        { label: 'Upcomers official site', url: 'https://upcomers.com/' },
        { label: 'Upcomers Terms and Conditions', url: 'https://upcomers.com/terms-and-conditions' },
        { label: 'Upcomers Trustpilot search', url: 'https://www.trustpilot.com/search?query=Upcomers%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 143,
    slug: 'axe-trader-funding',
    name: 'Axe Trader Funding',
    website: 'https://axetraderfunding.com/',
    status: 'À surveiller',
    score: 51,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Axe Trader Funding terms URL to recheck manually', url: 'https://axetraderfunding.com/terms-and-conditions/' },
      { label: 'Axe Trader Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Axe%20Trader%20Funding' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Axe Trader Funding official domain returned an internal/safe-open error during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy and operating status remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because the official domain did not return usable primary text. Do not infer entity, jurisdiction or payout obligation from third-party listings alone.',
      entities: [{ name: 'Axe Trader Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Operating status and terms remain pending.'],
      complaintsAndDisputes: ['Payout/refund complaints need manual classification once primary sources are accessible.'],
      redFlags: [
        'Official site returned an internal error.',
        'Do not recommend until legal entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Axe Trader Funding official site', url: 'https://axetraderfunding.com/' },
        { label: 'Axe Trader Funding terms URL to recheck manually', url: 'https://axetraderfunding.com/terms-and-conditions/' },
        { label: 'Axe Trader Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Axe%20Trader%20Funding' },
      ],
    },
  }),
  universeFirm({
    id: 144,
    slug: 'inspire-funding',
    name: 'Inspire Funding',
    website: 'https://inspirefunding.com/',
    status: 'À surveiller',
    score: 51,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Inspire Funding terms URL to recheck manually', url: 'https://inspirefunding.com/terms-and-conditions/' },
      { label: 'Inspire Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Inspire%20Funding%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Inspire Funding official domain returned an internal/safe-open error during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy and operating status remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because the official domain did not return usable primary text. Do not infer entity, jurisdiction, refund posture or payout obligation from directory listings alone.',
      entities: [{ name: 'Inspire Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Operating status and terms remain pending.'],
      complaintsAndDisputes: ['Payout/refund complaints need manual classification once primary sources are accessible.'],
      redFlags: [
        'Official site returned an internal error.',
        'Do not recommend until legal entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Inspire Funding official site', url: 'https://inspirefunding.com/' },
        { label: 'Inspire Funding terms URL to recheck manually', url: 'https://inspirefunding.com/terms-and-conditions/' },
        { label: 'Inspire Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Inspire%20Funding%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 145,
    slug: 'klein-funding-crypto',
    name: 'Klein Funding Crypto',
    website: 'https://kleinfundingcrypto.com/',
    status: 'À surveiller',
    score: 50,
    founded: 2023,
    market: 'Crypto',
    priceFrom: 0,
    styles: ['Crypto'],
    additionalSources: [
      { label: 'Klein Funding Crypto terms URL to recheck manually', url: 'https://kleinfundingcrypto.com/terms-and-conditions/' },
      { label: 'Klein Funding Crypto Trustpilot search', url: 'https://www.trustpilot.com/search?query=Klein%20Funding%20Crypto' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited crypto-source pass completed. Klein Funding Crypto official-looking URL was not safe/openable during the July 8, 2026 PropRadar review. Crypto custody/exchange setup, legal entity, terms, refunds and operating status remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Crypto custody/exchange risk checklist'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information and crypto-specific risk. Crypto prop-firm claims require extra caution because exchange access, custody, sanctions checks, token settlement and payout rails materially affect user risk.',
      entities: [{ name: 'Klein Funding Crypto', jurisdiction: 'To verify', role: 'Crypto prop-firm brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Crypto custody/exchange relationship remains unverified.'],
      complaintsAndDisputes: ['Crypto payout, KYC and exchange-lock complaints need manual classification once primary sources are accessible.'],
      redFlags: [
        'Primary URL was not safe/openable through the current review path.',
        'Do not recommend until official terms and entity are sourced.',
        'No exchange/custody setup, refund policy, sanctions policy or simulated/live-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Klein Funding Crypto official-looking URL', url: 'https://kleinfundingcrypto.com/' },
        { label: 'Klein Funding Crypto terms URL to recheck manually', url: 'https://kleinfundingcrypto.com/terms-and-conditions/' },
        { label: 'Klein Funding Crypto Trustpilot search', url: 'https://www.trustpilot.com/search?query=Klein%20Funding%20Crypto' },
      ],
    },
  }),
  universeFirm({
    id: 146,
    slug: 'algo-forex-funds',
    name: 'Algo Forex Funds',
    website: 'https://algoforexfunds.com/',
    status: 'À surveiller',
    score: 50,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Algo Forex Funds terms URL to recheck manually', url: 'https://algoforexfunds.com/terms-and-conditions/' },
      { label: 'Algo Forex Funds Trustpilot search', url: 'https://www.trustpilot.com/search?query=Algo%20Forex%20Funds' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Algo Forex Funds official-looking URL was not safe/openable during the July 8, 2026 PropRadar review. Legal entity, terms, allowed algo/EA rules, refund policy and operating status remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Algo/EA rule-risk checklist'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information and rule-risk profile. Because the brand name implies algorithmic trading, exact EA, HFT, copy-trading, latency arbitrage and prohibited-strategy restrictions must be verified before the profile is ranked.',
      entities: [{ name: 'Algo Forex Funds', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Algo/EA rules and platform provider remain unverified.'],
      complaintsAndDisputes: ['Rule-breach complaints need separation by EA, copy-trading, HFT and latency-arbitrage clauses once terms are available.'],
      redFlags: [
        'Primary URL was not safe/openable through the current review path.',
        'Algo-focused marketing without captured legal text.',
        'No checkout entity, refund policy or prohibited-strategy clause was captured.',
      ],
      sources: [
        { label: 'Algo Forex Funds official-looking URL', url: 'https://algoforexfunds.com/' },
        { label: 'Algo Forex Funds terms URL to recheck manually', url: 'https://algoforexfunds.com/terms-and-conditions/' },
        { label: 'Algo Forex Funds Trustpilot search', url: 'https://www.trustpilot.com/search?query=Algo%20Forex%20Funds' },
      ],
    },
  }),
  universeFirm({
    id: 147,
    slug: 'aeon-funded',
    name: 'Aeon Funded',
    website: 'https://aeonfunded.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2025,
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official Aeon Funded URL redirected to Quantx Fund during the July 8, 2026 pass. The redirected site states that the platform provides educational and trader-evaluation services in simulated trading environments only, all accounts are demo/fictitious with virtual funds, no deposits are accepted, no brokerage/investment services/financial advice are provided, and all activity is notional with no real capital at risk.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. The simulated/non-broker language is strong, but the Aeon-to-Quantx brand redirect and aggressive claims about dealing desk, hedging, liquidity and guaranteed payouts need manual verification. No concrete legal entity or registration number was captured.',
      entities: [
        {
          name: 'Aeon Funded / Quantx Fund',
          jurisdiction: 'To verify',
          role: 'Current brand/operator to identify from updated terms, invoices and company records.',
        },
      ],
      regulatoryStatus: [
        'Site states services are educational and trader-evaluation services in simulated trading environments only.',
        'All accounts are described as demo/fictitious accounts using virtual funds.',
        'No real client deposits are accepted and no brokerage, investment services, financial advice or actual-market trading is provided.',
        'Site says it is not a licensed broker-dealer, investment firm or financial advisor.',
      ],
      complaintsAndDisputes: [
        'Aeon Funded reviews should be cross-linked carefully with Quantx Fund to avoid brand-transition confusion.',
        'Guaranteed payout/dealing desk/liquidity claims should be checked against terms and actual payout evidence.',
      ],
      redFlags: [
        'Brand/domain redirect from Aeon Funded to Quantx Fund.',
        'No legal entity captured from the public page.',
        'Strong payout/dealing-desk claims beside purely simulated/no-broker disclaimers.',
      ],
      sources: [
        { label: 'Aeon Funded official domain redirect', url: 'https://aeonfunded.com/' },
        { label: 'Quantx Fund redirected site', url: 'https://quantxfund.io/' },
        { label: 'Quantx Fund Terms', url: 'https://quantxfund.io/terms' },
        { label: 'Aeon Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Aeon%20Funded' },
      ],
    },
  }),
  universeFirm({
    id: 148,
    slug: 'trade-amber',
    name: 'Trade Amber',
    website: 'https://tradeamber.com/',
    status: 'À surveiller',
    score: 50,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Trade Amber terms URL to recheck manually', url: 'https://tradeamber.com/terms-and-conditions/' },
      { label: 'Trade Amber Trustpilot search', url: 'https://www.trustpilot.com/search?query=Trade%20Amber%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Trade Amber official-looking URL was not safe/openable during the July 8, 2026 PropRadar review. Legal entity, terms, operating status and payout/refund rules remain unverified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. Keep as a low-confidence watchlist entry until an official legal page, checkout entity, refund policy and simulated/live-account wording are captured.',
      entities: [{ name: 'Trade Amber', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Operating status and terms remain pending.'],
      complaintsAndDisputes: ['Reviews should not be scored until the correct domain and operator are confirmed.'],
      redFlags: [
        'Primary URL was not safe/openable through the current review path.',
        'No primary legal text captured.',
        'Do not infer current operation from directory listings alone.',
      ],
      sources: [
        { label: 'Trade Amber official-looking URL', url: 'https://tradeamber.com/' },
        { label: 'Trade Amber terms URL to recheck manually', url: 'https://tradeamber.com/terms-and-conditions/' },
        { label: 'Trade Amber Trustpilot search', url: 'https://www.trustpilot.com/search?query=Trade%20Amber%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 149,
    slug: 'astra-capital-funding',
    name: 'Astra Capital Funding',
    website: 'https://astracapitalfunding.com/',
    status: 'À surveiller',
    score: 50,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Astra Capital Funding terms URL to recheck manually', url: 'https://astracapitalfunding.com/terms-and-conditions/' },
      { label: 'Astra Capital Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Astra%20Capital%20Funding' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Astra Capital Funding official-looking URL was not safe/openable during the July 8, 2026 PropRadar review. Legal entity, terms, payout rules, refund policy and operating status remain unverified from primary sources.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk. Do not infer entity, jurisdiction, refund posture, payout obligation or current operation from directory listings alone.',
      entities: [{ name: 'Astra Capital Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Terms and regulator/public-warning checks remain pending.'],
      complaintsAndDisputes: ['Payout/refund complaints need manual classification once official terms are accessible.'],
      redFlags: [
        'Primary URL was not safe/openable through the current review path.',
        'No primary legal text captured.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Astra Capital Funding official-looking URL', url: 'https://astracapitalfunding.com/' },
        { label: 'Astra Capital Funding terms URL to recheck manually', url: 'https://astracapitalfunding.com/terms-and-conditions/' },
        { label: 'Astra Capital Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Astra%20Capital%20Funding' },
      ],
    },
  }),
  universeFirm({
    id: 150,
    slug: 'funding-your-trades',
    name: 'Funding Your Trades',
    website: 'https://fundingyourtrades.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2025,
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. Funding Your Trades states that clients receive demo accounts with simulated funds, all trading activity is simulated, the firm does not accept deposits for investment, does not provide financial/investment services, operates as an evaluation company rather than a broker or investment firm, and purchases are for access to evaluation programs and platforms rather than investment purposes.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. The simulated/no-deposit/non-broker disclaimers are clear, but the site uses aggressive reward/refund marketing such as 24-hour rewards, up to 100% split, 200% refund bonus and verified reward claims. No concrete registered legal entity was captured from the public page.',
      entities: [
        {
          name: 'Funding Your Trades',
          jurisdiction: 'To verify',
          role: 'Evaluation-company brand/operator; legal registration details still need verification.',
        },
      ],
      regulatoryStatus: [
        'Site states clients are assigned demo accounts with simulated funds and all trading is simulated.',
        'Site states Funding Your Trades does not accept deposits for investment and does not provide financial or investment services.',
        'Site states it operates as an evaluation company, not a broker or investment firm.',
        'Purchases are not considered deposits and are used for operational costs.',
      ],
      complaintsAndDisputes: [
        'Refund bonus, 24-hour reward and verified reward claims should be checked against Terms of Services and refund policy.',
        'Third-party platforms and data feeds can cause technical disputes under the disclaimer.',
      ],
      redFlags: [
        'No concrete legal entity captured in public footer.',
        'Aggressive reward/refund marketing beside simulated/non-investment disclaimers.',
        'Payments are program access fees, not deposits.',
      ],
      sources: [
        { label: 'Funding Your Trades official site', url: 'https://fundingyourtrades.com/' },
        { label: 'Funding Your Trades Terms of Services', url: 'https://fundingyourtrades.com/terms-of-services/' },
        { label: 'Funding Your Trades Refund Policy', url: 'https://fundingyourtrades.com/refund-policy/' },
        { label: 'Funding Your Trades Trustpilot search', url: 'https://www.trustpilot.com/search?query=Funding%20Your%20Trades' },
      ],
    },
  }),
  universeFirm({
    id: 151,
    slug: 'mifunder',
    name: 'MiFunder',
    website: 'https://mifunder.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2023,
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. MiFunder states it does not provide investment services as defined in applicable regulations, is not a broker and does not accept deposits from traders. No concrete company name, jurisdiction or registration number was captured from the public page in this pass.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. MiFunder gives clear non-broker/non-deposit wording, but the legal entity remains unidentified. The product markets Match Trader, Platform 5 and TradingView access plus funded-phase reset features, so detailed terms are needed before ranking it above watchlist level.',
      entities: [
        {
          name: 'MiFunder',
          jurisdiction: 'To verify',
          role: 'Brand/operator; company registration details not captured from public page.',
        },
      ],
      regulatoryStatus: [
        'Footer states MiFunder does not provide investment services as defined in applicable regulations.',
        'Footer states MiFunder is not a broker and does not accept deposits from traders.',
        'Website is owned and operated by “our company,” but no company name or registration number was captured.',
      ],
      complaintsAndDisputes: [
        'Funded-phase reset, evaluation reset and payout terms should be reviewed against current Terms and Conditions.',
        'Platform-specific rules for Match Trader, Platform 5 and TradingView need manual confirmation.',
      ],
      redFlags: [
        'No concrete legal entity captured.',
        'Broker/platform-like marketing with non-broker disclaimer.',
        'Reset add-ons can create fee and rule-dispute risk.',
      ],
      sources: [
        { label: 'MiFunder official site', url: 'https://mifunder.com/' },
        { label: 'MiFunder Terms and Conditions', url: 'https://mifunder.com/terms-and-conditions/' },
        { label: 'MiFunder Trustpilot search', url: 'https://www.trustpilot.com/search?query=MiFunder' },
      ],
    },
  }),
  universeFirm({
    id: 152,
    slug: 'fundings4u',
    name: 'Fundings4u',
    website: 'https://fundings4u.com/',
    status: 'À surveiller',
    score: 50,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Fundings4u Terms/Privacy link to recheck manually', url: 'https://fundings4u.com/privacy-policy' },
      { label: 'Fundings4u Trustpilot search', url: 'https://www.trustpilot.com/search?query=Fundings4u' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official homepage checked. Fundings4u presents a no-evaluation / instant-funding offer for forex traders, claims traders can withdraw from the first trade, and advertises daily withdrawals plus very fast payout language. No concrete legal entity, jurisdiction, registration number, broker/provider relationship or full terms text was captured in this pass.',
    auditSourcesChecked: ['Official homepage', 'Terms/Privacy link attempted', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk despite a visible homepage. Fundings4u gives marketing claims around instant funding, first-trade withdrawals, 30-minute withdrawals and average payout time, but PropRadar did not capture a legal entity, regulator posture, refund policy or simulated/live-account disclaimer. Treat the offer as high-risk until terms and checkout entity are documented.',
      entities: [{ name: 'Fundings4u', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: [
        'Official homepage describes Fundings4u as a no-evaluation / instant-funding prop firm for forex traders.',
        'Homepage claims traders can start trading and withdraw from the first trade.',
        'Homepage advertises daily withdrawal, withdrawals within 30 minutes and average payout time of 6 minutes.',
        'Official legal entity, jurisdiction and simulated/live-account model were not captured in this pass.',
      ],
      complaintsAndDisputes: [
        'Fast-payout and first-trade withdrawal claims should be checked against current terms, payout proof and user complaints.',
        'Any broker relationship should be verified because the homepage says it uses the best broker in the market without naming a legal provider in captured text.',
      ],
      redFlags: [
        'Aggressive instant-funding and very-fast-payout marketing with no captured legal entity.',
        'No full terms, refund policy or simulated-account disclaimer captured.',
        'Do not recommend until checkout entity, broker/provider relationship and payout terms are sourced.',
      ],
      sources: [
        { label: 'Fundings4u official-looking URL', url: 'https://fundings4u.com/' },
        { label: 'Fundings4u Terms/Privacy link to recheck manually', url: 'https://fundings4u.com/privacy-policy' },
        { label: 'Fundings4u Trustpilot search', url: 'https://www.trustpilot.com/search?query=Fundings4u' },
      ],
    },
  }),
  universeFirm({
    id: 153,
    slug: 'alpine-funded',
    name: 'Alpine Funded',
    website: 'https://alpinefunded.com/',
    status: 'À surveiller',
    score: 58,
    founded: 2025,
    headquarters: 'Switzerland',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. Alpine Funded discloses Alpine Funded GmbH at Sinserstrasse 67, 6330 Cham, Switzerland. The site markets instant funding, simulated capital and B2Broker/cTrader/MT5 access. It states traders can trade with simulated capital, but full Terms and Conditions still need manual review for exact non-broker, refund, payout and broker/provider clauses.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. The Swiss company disclosure is useful, and the site clearly uses simulated-capital wording. The caution is that the site also markets instant funding, guaranteed 24-hour payouts, B2Broker collaboration and up to $2M capital, so users must not infer regulated brokerage protection from platform/provider branding.',
      entities: [
        {
          name: 'Alpine Funded GmbH',
          jurisdiction: 'Switzerland',
          registeredAddress: 'Sinserstrasse 67, 6330 Cham, Switzerland',
          role: 'Company disclosed in official footer.',
        },
      ],
      regulatoryStatus: [
        'Homepage says traders use simulated capital and can be rewarded for skills.',
        'Footer discloses Alpine Funded GmbH in Switzerland.',
        'Site references cTrader, MT5 and collaboration with B2Broker; those provider references should not be treated as a prop-product license.',
        'Full Terms and Conditions still need manual capture for exact legal wording.',
      ],
      complaintsAndDisputes: [
        'Instant funding, free reset/second chance and guaranteed payout claims should be checked against current terms and FAQ.',
        'Broker/platform claims should be separated from the user’s contractual rights with Alpine Funded GmbH.',
      ],
      redFlags: [
        'Provider/broker branding can be mistaken for direct regulatory protection.',
        'Aggressive instant-funding and payout marketing.',
        'Terms need manual review before upgrading to verified multi-source.',
      ],
      sources: [
        { label: 'Alpine Funded official site', url: 'https://alpinefunded.com/' },
        { label: 'Alpine Funded Terms and Conditions', url: 'https://alpinefunded.com/terms-and-conditions/' },
        { label: 'Alpine Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Alpine%20Funded' },
      ],
    },
  }),
  universeFirm({
    id: 154,
    slug: 'limitless-funding',
    name: 'Limitless Funding',
    website: 'https://limitlessfunding.com/',
    status: 'À surveiller',
    score: 50,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Limitless Funding terms URL to recheck manually', url: 'https://limitlessfunding.com/terms-and-conditions/' },
      { label: 'Limitless Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Limitless%20Funding%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Limitless Funding official-looking domain returned an internal/safe-open error during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy and operating status remain unverified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because no usable primary legal text was captured. Do not infer entity, jurisdiction or payout obligation from third-party listings alone.',
      entities: [{ name: 'Limitless Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Terms and operating status remain pending.'],
      complaintsAndDisputes: ['Payout/refund complaints need manual classification once primary sources are accessible.'],
      redFlags: [
        'Official-looking domain returned an internal error.',
        'Do not recommend until entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Limitless Funding official-looking site', url: 'https://limitlessfunding.com/' },
        { label: 'Limitless Funding terms URL to recheck manually', url: 'https://limitlessfunding.com/terms-and-conditions/' },
        { label: 'Limitless Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Limitless%20Funding%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 155,
    slug: 'tradersedgefx',
    name: 'TradersEdgeFX',
    website: 'https://tradersedgefx.com/',
    status: 'À surveiller',
    score: 57,
    founded: 2023,
    headquarters: 'Bahamas / United States',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and footer checked. TradersEdgeFX LLC discloses simulated trading services and educational tools, says it is not a licensed brokerage firm, does not accept client deposits, does not request funds for investment and users do not risk their own capital. Footer lists Old Fort Town Center, Windsor Field Road, Nassau, Bahamas.',
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high regulatory risk. The simulated/non-broker/non-deposit disclosure is explicit, but the site markets rewards, simulated live accounts, HFT programs and high account sizes. The exact LLC registration and governing law still need verification from terms.',
      entities: [
        {
          name: 'TradersEdgeFX LLC',
          jurisdiction: 'To verify',
          registeredAddress: 'Old Fort Town Center, Windsor Field Road, Nassau, Bahamas',
          role: 'Operator disclosed in official disclaimer/footer.',
        },
      ],
      regulatoryStatus: [
        'Disclaimer says TradersEdgeFX LLC provides simulated trading services and educational tools.',
        'Disclaimer says TradersEdgeFX LLC is not a licensed brokerage firm and does not accept client deposits.',
        'Disclaimer says it is not an investment opportunity and the company does not request funds for investment.',
        'Site describes TEFX simulated accounts and simulated live split terms.',
      ],
      complaintsAndDisputes: [
        'No-refund and simulated-live profit cap terms should be checked before purchase.',
        'HFT, minimum hold time, news window and copy-trading clauses create rule-dispute risk.',
      ],
      redFlags: [
        'No verified registration number captured.',
        'Simulated-live terminology can confuse users about real capital.',
        'No-refund language appears in plan cards.',
      ],
      sources: [
        { label: 'TradersEdgeFX official site', url: 'https://tradersedgefx.com/' },
        { label: 'TradersEdgeFX Terms of Service', url: 'https://tradersedgefx.com/terms-of-service/' },
        { label: 'TradersEdgeFX Refund Policy', url: 'https://tradersedgefx.com/refund-policy/' },
        { label: 'TradersEdgeFX Trustpilot search', url: 'https://www.trustpilot.com/search?query=TradersEdgeFX' },
      ],
    },
  }),
  universeFirm({
    id: 156,
    slug: 'gry-funding',
    name: 'Gry Funding',
    website: 'https://gryfunding.com/',
    status: 'À surveiller',
    score: 50,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Gry Funding terms URL to recheck manually', url: 'https://gryfunding.com/terms-and-conditions/' },
      { label: 'Gry Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Gry%20Funding' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Gry Funding official-looking domain returned an internal/safe-open error during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy and operating status remain unverified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because no usable primary legal text was captured. Do not infer entity, jurisdiction or payout obligation from third-party listings alone.',
      entities: [{ name: 'Gry Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Terms and operating status remain pending.'],
      complaintsAndDisputes: ['Payout/refund complaints need manual classification once primary sources are accessible.'],
      redFlags: [
        'Official-looking domain returned an internal error.',
        'Do not recommend until entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Gry Funding official-looking site', url: 'https://gryfunding.com/' },
        { label: 'Gry Funding terms URL to recheck manually', url: 'https://gryfunding.com/terms-and-conditions/' },
        { label: 'Gry Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Gry%20Funding' },
      ],
    },
  }),
  universeFirm({
    id: 157,
    slug: 'cash-flow-funding',
    name: 'Cash Flow Funding',
    website: 'https://cashflowfunding.com/',
    status: 'À surveiller',
    score: 33,
    founded: 2023,
    incidents: 5,
    additionalSources: [
      { label: 'Cash Flow Funding terms URL to recheck manually', url: 'https://cashflowfunding.com/terms-and-conditions/' },
      { label: 'Cash Flow Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Cash%20Flow%20Funding%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'High-risk warning pass completed. Cash Flow Funding official-looking URL was not safe/openable during the July 8, 2026 PropRadar review, and PropRadar already tracks multiple incident flags. Treat as an archive/watchlist risk until operating status, entity, refunds and payout obligations are reconstructed from primary evidence.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Incident/watchlist classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High operational and source risk. The profile should not be presented as a current purchase candidate while the official source is unavailable and incident count remains high.',
      entities: [{ name: 'Cash Flow Funding', jurisdiction: 'To verify', role: 'Historical/watchlist brand not confirmed from current primary source.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Operating status and customer obligation status remain unresolved.'],
      complaintsAndDisputes: ['Reconstruct refund and payout disputes from archived evidence before changing risk level.'],
      redFlags: ['Multiple incident flags already tracked in PropRadar.', 'Primary URL was not safe/openable.', 'Not a recommendation candidate.'],
      sources: [
        { label: 'Cash Flow Funding official-looking URL', url: 'https://cashflowfunding.com/' },
        { label: 'Cash Flow Funding terms URL to recheck manually', url: 'https://cashflowfunding.com/terms-and-conditions/' },
        { label: 'Cash Flow Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Cash%20Flow%20Funding%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 158,
    slug: 'levels',
    name: 'Levels',
    website: 'https://levels.com/',
    status: 'À surveiller',
    score: 35,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Levels current domain', url: 'https://www.levels.com/' },
      { label: 'Levels prop firm web search', url: 'https://www.google.com/search?q=Levels+prop+firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Domain-mismatch pass completed. The captured domain levels.com redirects to a metabolic health and glucose-monitoring company, not a prop-firm offer. Treat this PropRadar entry as stale, misidentified or requiring a different official prop-firm domain.',
    auditSourcesChecked: ['Current domain', 'Non-prop health-tech page capture', 'Prop-firm web search', 'Stale-domain classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High false-match risk. Current domain content is unrelated to prop trading, so no prop-firm legal conclusions should be drawn from this URL.',
      entities: [{ name: 'Levels', jurisdiction: 'To verify', role: 'Prop-firm brand/operator not confirmed from captured domain.' }],
      regulatoryStatus: [
        'Current domain presents Levels as a metabolic health / glucose monitoring product.',
        'Current domain does not present a prop-firm product.',
        'Official prop-firm entity and domain remain unconfirmed.',
      ],
      complaintsAndDisputes: ['Do not merge unrelated health-tech reviews with any prop-firm entry named Levels.'],
      redFlags: [
        'Domain mismatch with non-prop business.',
        'Likely stale or wrong URL.',
        'Do not send prop-firm users to the current health-tech domain as a purchase path.',
      ],
      sources: [
        { label: 'Levels current domain', url: 'https://levels.com/' },
        { label: 'Levels redirected health-tech site', url: 'https://www.levels.com/' },
        { label: 'Levels prop firm web search', url: 'https://www.google.com/search?q=Levels+prop+firm' },
      ],
    },
  }),
  universeFirm({
    id: 159,
    slug: 'fundedhive',
    name: 'FundedHive',
    website: 'https://fundedhive.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2026,
    headquarters: 'United States / Dubai / Saint Lucia / United Kingdom',
    priceFrom: 0,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and disclaimer checked. FundedHive presents itself as a Web3/blockchain prop firm and TradingHive Group project, listing TradingHive Inc. in New York, TradingHive Technologies Ltd in DIFC Dubai, TradingHive Global Brokerage Ltd in Saint Lucia and AcademyHive Ltd in London. Disclaimer states it is a simulated proprietary trading challenge, not a broker, no deposits, no live trading accounts and all trading activity is simulated.',
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High product-complexity risk. The no-broker/no-deposit/simulated disclaimer is clear, but Web3 smart-contract payout claims, DAC language, gas fees, group entities across four jurisdictions and “real capital” marketing create a complex risk profile.',
      entities: [
        { name: 'TradingHive Inc.', jurisdiction: 'New York, United States', registeredAddress: '447 Broadway 2nd Floor, New York, NY 10013, United States', role: 'Group company disclosed by FundedHive.' },
        { name: 'TradingHive Technologies Ltd', jurisdiction: 'Dubai, United Arab Emirates', registeredAddress: 'Unit IH-00-01-01-OF-01, Level 01, Innovation One building, DIFC, Dubai, UAE', role: 'Group company disclosed by FundedHive.' },
        { name: 'TradingHive Global Brokerage Ltd.', jurisdiction: 'Saint Lucia', role: 'Group company disclosed by FundedHive.' },
        { name: 'AcademyHive Ltd.', jurisdiction: 'United Kingdom', registeredAddress: '27 Old Gloucester Street, London WC1N 3AX, United Kingdom', role: 'Related company disclosed by FundedHive.' },
      ],
      regulatoryStatus: [
        'Disclaimer says Funded Hive operates a simulated proprietary trading challenge.',
        'Disclaimer says Funded Hive is not a broker, does not accept deposits and does not provide access to live trading accounts.',
        'All trading activity within the challenge is simulated, and funding refers to proprietary capital allocation within the challenge structure.',
        'Blockchain transaction fees/gas fees may apply when interacting with smart contracts.',
      ],
      complaintsAndDisputes: [
        'Smart contract payout claims, pay-from-profits model and funded account fees should be checked against downloadable terms.',
        'Users should understand blockchain/gas fee exposure separately from challenge fees.',
      ],
      redFlags: [
        'Web3/DAC/smart-contract structure increases legal and operational complexity.',
        'Multiple group companies across US, Dubai, Saint Lucia and UK.',
        'Real-capital wording appears beside simulated/no-live-account disclaimer.',
      ],
      sources: [
        { label: 'FundedHive official site', url: 'https://fundedhive.com/' },
        { label: 'FundedHive app', url: 'https://funded.tradinghive.com/' },
        { label: 'FundedHive Trustpilot search', url: 'https://www.trustpilot.com/search?query=FundedHive' },
      ],
    },
  }),
  universeFirm({
    id: 160,
    slug: 'titan-capital-markets',
    name: 'Titan Capital Markets',
    website: 'https://titancapitalmarkets.com/',
    status: 'À surveiller',
    score: 50,
    founded: 2023,
    priceFrom: 0,
    additionalSources: [
      { label: 'Titan Capital Markets terms URL to recheck manually', url: 'https://titancapitalmarkets.com/terms-and-conditions/' },
      { label: 'Titan Capital Markets Trustpilot search', url: 'https://www.trustpilot.com/search?query=Titan%20Capital%20Markets%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source pass completed. Titan Capital Markets official-looking domain returned an internal/safe-open error during the July 8, 2026 PropRadar review. Legal entity, terms, refund policy and operating status remain unverified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because no usable primary legal text was captured. The name also overlaps with financial-market branding, so exact entity and domain confirmation matter before importing reviews or warnings.',
      entities: [{ name: 'Titan Capital Markets', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed in PropRadar at this check.', 'Terms and operating status remain pending.'],
      complaintsAndDisputes: ['Payout/refund complaints need manual classification once primary sources are accessible.'],
      redFlags: [
        'Official-looking domain returned an internal error.',
        'Do not recommend until entity and terms are sourced.',
        'No checkout entity, refund policy or simulated-account disclaimer was captured.',
      ],
      sources: [
        { label: 'Titan Capital Markets official-looking site', url: 'https://titancapitalmarkets.com/' },
        { label: 'Titan Capital Markets terms URL to recheck manually', url: 'https://titancapitalmarkets.com/terms-and-conditions/' },
        { label: 'Titan Capital Markets Trustpilot search', url: 'https://www.trustpilot.com/search?query=Titan%20Capital%20Markets%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 161,
    slug: 'tiger-funded',
    name: 'Tiger Funded',
    website: 'https://tigerfunded.com/',
    status: 'À surveiller',
    score: 60,
    founded: 2024,
    headquarters: 'United Arab Emirates / Cyprus',
    priceFrom: 234,
    profitSplit: 95,
    payoutProof: true,
    incidents: 2,
    styles: ['Forex', 'Crypto', 'Indices', 'Metals', 'News trading', 'Weekend holding'],
    productName: 'TigerFunded Evaluation',
    productDescription:
      'Evaluation and instant-style prop programs advertised with Match-Trader and Platform 5 access, simulated capital, 48h rewards and scaling claims.',
    accountSizeMin: 10000,
    accountSizeMax: 500000,
    profitTarget: '8% / 5% on the displayed 2-step example',
    maxDailyLoss: '5%',
    maxDrawdown: '12%',
    platforms: ['Match-Trader', 'Platform 5'],
    tradableAssets: ['Forex', 'Crypto', 'Indices', 'Metals'],
    minTradingDays: '1 minimum day displayed',
    consistencyRule: 'Public homepage says no consistency rules, but payout and prohibited-strategy clauses must be read before purchase.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, terms and refund policy checked. Footer discloses ALPHAEDGE PRO - FZCO in Dubai and Alphaedgepro Services (Europe) Ltd in Cyprus as seller/issuer and technology/platform provider references. Terms state the program is simulated, does not accept public deposits, does not manage client funds, and does not execute trades for third parties.',
    auditSourcesChecked: ['Official site', 'Terms of Service', 'Refund policy', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. TigerFunded gives unusually explicit simulated-trading and no-regulated-services language, but the operating structure spans Dubai and Cyprus disclosures and the terms give wide discretion on rule breaches, chargebacks, payout rejection and refunds.',
      entities: [
        {
          name: 'ALPHAEDGE PRO - FZCO',
          jurisdiction: 'Dubai, United Arab Emirates',
          registeredAddress: 'IFZA Dubai Silicon Oasis, Dubai, UAE',
          role: 'Tiger Funded operating / infrastructure entity disclosed in footer.',
        },
        {
          name: 'Alphaedgepro Services (Europe) Ltd',
          jurisdiction: 'Cyprus',
          registeredAddress: 'Pindou 4, Egkomi, 2409, Nicosia, Cyprus',
          role: 'Disclosed seller and issuer of products/services; technology and platform provider.',
        },
      ],
      regulatoryStatus: [
        'Terms say TigerFunded is a proprietary trading firm offering simulated trading evaluation programs.',
        'Terms say TigerFunded does not accept public deposits, manage client funds or execute trades on behalf of third parties.',
        'Footer says TigerFunded is not a financial institution and does not conduct regulated financial services.',
      ],
      complaintsAndDisputes: [
        'Refund policy says no refunds after evaluation credentials are emailed; all sales are final post-purchase.',
        'Terms allow payout rejection and permanent ineligibility after rule or compliance violations.',
        'Chargebacks can trigger account suspension or termination.',
      ],
      redFlags: [
        'Recent brand with aggressive promotional claims and large reward figures.',
        'Two-entity structure across Dubai and Cyprus should be checked against checkout invoices.',
        'Payout eligibility depends heavily on compliance/rule review.',
      ],
      sources: [
        { label: 'TigerFunded official site', url: 'https://tigerfunded.com/' },
        { label: 'TigerFunded Terms of Service', url: 'https://tigerfunded.com/terms-of-service' },
        { label: 'TigerFunded Refund Policy', url: 'https://tigerfunded.com/refund-policy' },
        { label: 'TigerFunded Trustpilot search', url: 'https://www.trustpilot.com/search?query=TigerFunded%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 162,
    slug: 'fundyourfx',
    name: 'FundYourFX',
    website: 'https://fundyourfx.io/',
    status: 'À surveiller',
    score: 62,
    founded: 2021,
    headquarters: 'Hong Kong',
    priceFrom: 9,
    profitSplit: 95,
    payoutProof: true,
    incidents: 3,
    styles: ['Forex', 'Instant funding', 'Evaluation', 'Crypto'],
    productName: 'FundYourFX Programs',
    productDescription:
      '1-step, 2-step, instant funding and 10X Quest programs advertised as virtual demo-account products with up to $6M simulated funding.',
    accountSizeMin: 5000,
    accountSizeMax: 6000000,
    profitTarget: 'Varies by program',
    maxDailyLoss: 'Varies by program',
    maxDrawdown: 'Varies by program',
    platforms: ['Match-Trade', 'TradingView integration'],
    tradableAssets: ['Forex', 'Indices', 'Crypto', 'Metals', 'To verify by program'],
    minTradingDays: 'No fixed universal rule; program-specific',
    consistencyRule: 'Homepage advertises no consistency rules on several programs, but Terms and Trading Rules control.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms and Refund Policy checked. Terms name FYFX Capital Limited, incorporated in Hong Kong, with contact address Unit 2A, 17/F Glenealy Tower, No.1 Glenealy Central, Hong Kong. The site says all accounts are virtual demo accounts, all activity is simulated, FundYourFX is not a broker, no real instruments are bought or sold, and Hong Kong residents are restricted from new purchases.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Refund Policy', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. FundYourFX has detailed terms and a named Hong Kong company, but its public sales copy is very assertive around instant funding, payouts and scale. The Terms clarify virtual/demo-only services, no broker status, no client money, fictitious trades and discretionary payout/eligibility conditions.',
      entities: [
        {
          name: 'FYFX Capital Limited',
          jurisdiction: 'Hong Kong',
          registeredAddress: 'Unit 2A, 17/F Glenealy Tower, No.1 Glenealy Central, Hong Kong',
          role: 'Contracting company named in the Terms and footer.',
        },
      ],
      regulatoryStatus: [
        'Terms govern the legal relationship between FYFX Capital Limited and users.',
        'Terms say users cannot deposit money for trading financial instruments and FYFX does not hold client money or assets.',
        'Terms say no actual orders are placed, matched, cleared or settled on any market, exchange, broker platform or execution venue.',
        'Terms say FYFX is not a broker, licensed or otherwise.',
      ],
      complaintsAndDisputes: [
        'Refund policy says fees are generally non-refundable once credentials are issued.',
        'Challenge-fee refunds are conditional on three successful payouts or cumulative payouts totaling 24% of reward share.',
        'Hong Kong residents are restricted from new registrations/purchases except limited legacy-user carve-outs.',
      ],
      redFlags: [
        'Very promotional claims around 10X Quest, fast rewards and large simulated funding.',
        'Restrictive refund mechanics after account creation.',
        'Hong Kong resident restriction should be reconciled with Hong Kong incorporation and user eligibility.',
      ],
      sources: [
        { label: 'FundYourFX official site', url: 'https://fundyourfx.io/' },
        { label: 'FundYourFX Terms and Conditions', url: 'https://fundyourfx.io/terms-conditions/' },
        { label: 'FundYourFX Refund Policy', url: 'https://fundyourfx.io/refund-policy/' },
        { label: 'FundYourFX Trustpilot search', url: 'https://www.trustpilot.com/search?query=FundYourFX%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 163,
    slug: 'ryze-trading',
    name: 'Ryze Trading',
    website: 'https://ryzetrading.com/',
    status: 'À surveiller',
    score: 44,
    founded: 2023,
    priceFrom: 0,
    incidents: 3,
    additionalSources: [
      { label: 'Ryze Trading terms URL to recheck manually', url: 'https://ryzetrading.com/terms-and-conditions/' },
      { label: 'Ryze Trading article/news search', url: 'https://www.google.com/search?q=%22Ryze+Trading%22+prop+firm+article+news' },
      { label: 'Ryze Trading Trustpilot search', url: 'https://www.trustpilot.com/search?query=Ryze%20Trading%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. Ryze Trading official-looking domain returned an internal/safe-open error during the July 8, 2026 PropRadar review, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. No primary legal entity, terms or simulated-trading disclaimer could be captured.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because no usable official legal text or reliable external press coverage was captured. Do not infer entity, jurisdiction or payout obligation from directory listings alone.',
      entities: [{ name: 'Ryze Trading', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Legal entity, terms, refund policy and operating status remain unverified.'],
      complaintsAndDisputes: ['Payout and refund complaint history needs manual classification once primary sources are available.'],
      redFlags: [
        'Official-looking domain was not accessible in the web capture.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand in this pass.',
        'Do not rank as verified until legal pages are sourced.',
      ],
      sources: [
        { label: 'Ryze Trading official-looking site', url: 'https://ryzetrading.com/' },
        { label: 'Ryze Trading terms URL to recheck manually', url: 'https://ryzetrading.com/terms-and-conditions/' },
        { label: 'Ryze Trading article/news search', url: 'https://www.google.com/search?q=%22Ryze+Trading%22+prop+firm+article+news' },
        { label: 'Ryze Trading Trustpilot search', url: 'https://www.trustpilot.com/search?query=Ryze%20Trading%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 164,
    slug: 'tradicave',
    name: 'Tradicave',
    website: 'https://tradicave.com/',
    status: 'À surveiller',
    score: 44,
    founded: 2023,
    priceFrom: 0,
    incidents: 3,
    additionalSources: [
      { label: 'Tradicave terms URL to recheck manually', url: 'https://tradicave.com/terms-and-conditions/' },
      { label: 'Tradicave article/news search', url: 'https://www.google.com/search?q=%22Tradicave%22+prop+firm+article+news' },
      { label: 'Tradicave Trustpilot search', url: 'https://www.trustpilot.com/search?query=Tradicave%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. Tradicave official-looking domain returned an internal/safe-open error during the July 8, 2026 PropRadar review, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Legal entity, terms, refund policy and current activity remain unverified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because no usable primary legal page or reliable external press article was captured. Treat as a low-confidence watchlist entry until terms and operator are sourced.',
      entities: [{ name: 'Tradicave', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity and non-broker/simulated-service wording not confirmed.'],
      complaintsAndDisputes: ['Manual complaint review required before any recommendation.'],
      redFlags: [
        'Official-looking domain inaccessible in capture.',
        'No entity or terms available from this pass.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
      ],
      sources: [
        { label: 'Tradicave official-looking site', url: 'https://tradicave.com/' },
        { label: 'Tradicave terms URL to recheck manually', url: 'https://tradicave.com/terms-and-conditions/' },
        { label: 'Tradicave article/news search', url: 'https://www.google.com/search?q=%22Tradicave%22+prop+firm+article+news' },
        { label: 'Tradicave Trustpilot search', url: 'https://www.trustpilot.com/search?query=Tradicave%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 165,
    slug: 'fortunes-funding',
    name: 'Fortunes Funding',
    website: 'https://fortunesfunding.com/',
    status: 'À surveiller',
    score: 56,
    founded: 2024,
    priceFrom: 65,
    profitSplit: 95,
    payoutProof: true,
    incidents: 3,
    styles: ['Forex', 'CFD', 'Futures planned', 'Crypto payout'],
    productName: 'Fortunes Funding Evaluation',
    productDescription:
      'Evaluation model advertising virtual funds up to $600k, static drawdown, fast payouts and a public anti-payout-denial positioning.',
    accountSizeMin: 5000,
    accountSizeMax: 600000,
    profitTarget: '10% / 10% displayed on main model',
    maxDailyLoss: '10% displayed on main model',
    maxDrawdown: '10% displayed on main model',
    platforms: ['To verify'],
    tradableAssets: ['CFD/Forex', 'Futures coming soon', 'Crypto payout rails'],
    minTradingDays: '3 to 4 days depending on displayed table',
    consistencyRule: 'Rules and risk-review criteria must be checked in the help center before purchase.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site checked. Fortunes Funding advertises virtual funds up to $600,000, crypto/wire/Rise payouts and says approved payouts are processed after risk review. The homepage disclaimer is generic educational/informational wording; a named legal entity was not captured on the homepage during this pass.',
    auditSourcesChecked: ['Official site', 'Official FAQ/help link', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high risk until the contracting entity and full Terms can be captured. The site is active and gives product detail, but the homepage legal footer only showed a generic educational disclaimer and did not expose a company name in this pass.',
      entities: [{ name: 'Fortunes Funding', jurisdiction: 'To verify', role: 'Brand/operator not identified from captured homepage legal text.' }],
      regulatoryStatus: [
        'Homepage markets virtual funds up to $600,000.',
        'Homepage disclaimer says content is educational/informational and not investment recommendations, endorsements or solicitations.',
        'Named legal entity and governing law still need confirmation from Terms/help center.',
      ],
      complaintsAndDisputes: [
        'Site says payout requests undergo risk review for prohibited strategies, account manipulation, account management, IP violations and other exploitative behavior.',
        'Refund is advertised as included with the second payout, not as an unconditional refund.',
      ],
      redFlags: [
        'No named legal entity captured in homepage footer.',
        'Strong marketing claim that payouts are guaranteed if rules are not breached.',
        'Risk-review grounds need to be read in full terms before purchase.',
      ],
      sources: [
        { label: 'Fortunes Funding official site', url: 'https://fortunesfunding.com/' },
        { label: 'Fortunes Funding help center', url: 'https://help.fortunesfunding.com/' },
        { label: 'Fortunes Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Fortunes%20Funding%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 166,
    slug: 'clarity-traders',
    name: 'Clarity Traders',
    website: 'https://www.claritytraders.com/',
    status: 'À surveiller',
    score: 61,
    founded: 2024,
    headquarters: 'United States',
    priceFrom: 0,
    profitSplit: 100,
    payoutProof: true,
    incidents: 3,
    styles: ['Forex', 'Futures', 'CFD', 'Crypto', 'Instant funding'],
    productName: 'Clarity Accounts',
    productDescription:
      'Instant, one-step and two-step simulated trading programs with up to $200k simulated capital and weekly performance rewards.',
    accountSizeMin: 5000,
    accountSizeMax: 200000,
    profitTarget: 'NA on instant, 8% to 10% on displayed challenges',
    maxDailyLoss: '3% to 5%',
    maxDrawdown: '5% to 10% depending on program',
    platforms: ['Clarity / prop.claritytraders.com', 'Clarity FX broker link'],
    tradableAssets: ['Forex', 'Futures', 'CFDs', 'Digital assets'],
    minTradingDays: 'No minimum trading days displayed on several programs',
    consistencyRule: 'Instant accounts show a 10% consistency rule; some challenge stages show NA or 20%.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms and Risk Disclaimer checked. Terms identify Clarity Traders LLC, Delaware, address 8 The Green, Suite B, Dover, Delaware 19901. The legal footer says simulated programs only, demo environment, virtual capital, no client funds, no live trading, not a broker or investment advisor, and no real-market execution.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Risk Disclaimer', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium',
      lastChecked: '2026-07-08',
      summary:
        'Medium legal risk. Clarity Traders has clear entity and simulated-trading disclosures, but terms make payments subject to ongoing compliance, KYC and discretionary review, and all payments final/non-refundable.',
      entities: [
        {
          name: 'Clarity Traders LLC',
          jurisdiction: 'Delaware, United States',
          registeredAddress: '8 The Green, Suite B, Dover, Delaware 19901, USA',
          role: 'Contracting company and technology/education operator disclosed in Terms and footer.',
        },
      ],
      regulatoryStatus: [
        'Terms say none of the services constitute investment services, brokerage services or financial advice.',
        'All challenges, evaluations and funded accounts operate in a simulated trading environment.',
        'Footer says Clarity Traders LLC is not a broker or investment advisor and does not accept client funds.',
        'Risk disclosure says Clarity Traders does not act as broker or dealer and does not accept customer deposits.',
      ],
      complaintsAndDisputes: [
        'Terms say all payments are final and non-refundable.',
        'Chargebacks may result in termination, forfeiture of profits and permanent restriction.',
        'Profit sharing is described as a contractual reward, not an entitlement or investment return.',
      ],
      redFlags: [
        'Official broker link points to Clarity FX, so broker relationship and execution pathway should be separated from the prop contract.',
        'Discretionary review language around payments deserves careful reading before purchase.',
        'Delaware registered-office disclosure should be cross-checked with checkout entity.',
      ],
      sources: [
        { label: 'Clarity Traders official site', url: 'https://www.claritytraders.com/' },
        { label: 'Clarity Traders Terms and Conditions', url: 'https://www.claritytraders.com/terms-and-conditions' },
        { label: 'Clarity Traders Risk Disclaimer', url: 'https://www.claritytraders.com/risk-disclaimer' },
        { label: 'Clarity Traders Trustpilot search', url: 'https://www.trustpilot.com/search?query=Clarity%20Traders%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 167,
    slug: 'trading-cult',
    name: 'Trading Cult',
    website: 'https://pro.tradingcult.com/',
    status: 'À surveiller',
    score: 46,
    founded: 2023,
    priceFrom: 0,
    incidents: 3,
    additionalSources: [
      { label: 'Trading Cult terms URL to recheck manually', url: 'https://pro.tradingcult.com/terms-and-conditions/' },
      { label: 'Trading Cult article/news search', url: 'https://www.google.com/search?q=%22Trading+Cult%22+prop+firm+article+news' },
      { label: 'Trading Cult Trustpilot search', url: 'https://www.trustpilot.com/search?query=Trading%20Cult%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. Official-looking domain redirected to pro.tradingcult.com but no usable legal text was captured during the July 8, 2026 review. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Entity, terms and refund rules remain unverified.',
    auditSourcesChecked: ['Official redirect/domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because the captured page did not expose usable terms or legal disclosures, and no reliable external press article was found for the exact brand.',
      entities: [{ name: 'Trading Cult', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official entity and simulated/non-broker wording not confirmed in this pass.'],
      complaintsAndDisputes: ['Manual complaint and payout-history review required.'],
      redFlags: [
        'Redirected site provided no usable captured legal text.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
        'Do not treat as legally verified until terms are sourced.',
      ],
      sources: [
        { label: 'Trading Cult official-looking site', url: 'https://pro.tradingcult.com/' },
        { label: 'Trading Cult terms URL to recheck manually', url: 'https://pro.tradingcult.com/terms-and-conditions/' },
        { label: 'Trading Cult article/news search', url: 'https://www.google.com/search?q=%22Trading+Cult%22+prop+firm+article+news' },
        { label: 'Trading Cult Trustpilot search', url: 'https://www.trustpilot.com/search?query=Trading%20Cult%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 168,
    slug: 'next-step-funded',
    name: 'Next Step Funded',
    website: 'https://nextstepfunded.com/',
    status: 'À surveiller',
    score: 44,
    founded: 2023,
    priceFrom: 0,
    incidents: 3,
    additionalSources: [
      { label: 'Next Step Funded terms URL to recheck manually', url: 'https://nextstepfunded.com/terms-and-conditions/' },
      { label: 'Next Step Funded article/news search', url: 'https://www.google.com/search?q=%22Next+Step+Funded%22+prop+firm+article+news' },
      { label: 'Next Step Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Next%20Step%20Funded%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. Next Step Funded official-looking domain returned an internal/safe-open error during the July 8, 2026 PropRadar review. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Legal entity, terms, refund rules and operating status remain unverified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'High information risk because no usable official legal text or reliable external press article was captured. Do not infer current activity or legal responsibility from directory listings alone.',
      entities: [{ name: 'Next Step Funded', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Entity, jurisdiction, simulated-service language and refund policy not confirmed.'],
      complaintsAndDisputes: ['Payout/refund complaint history needs manual review before any recommendation.'],
      redFlags: [
        'Official-looking domain inaccessible in capture.',
        'No legal pages sourced in this pass.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
      ],
      sources: [
        { label: 'Next Step Funded official-looking site', url: 'https://nextstepfunded.com/' },
        { label: 'Next Step Funded terms URL to recheck manually', url: 'https://nextstepfunded.com/terms-and-conditions/' },
        { label: 'Next Step Funded article/news search', url: 'https://www.google.com/search?q=%22Next+Step+Funded%22+prop+firm+article+news' },
        { label: 'Next Step Funded Trustpilot search', url: 'https://www.trustpilot.com/search?query=Next%20Step%20Funded%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 169,
    slug: 'forex-funds-flow',
    name: 'Forex Funds Flow',
    website: 'https://www.forexfundsflow.com/',
    status: 'À surveiller',
    score: 57,
    founded: 2025,
    headquarters: 'Saint Lucia',
    priceFrom: 49,
    profitSplit: 80,
    payoutProof: true,
    incidents: 3,
    styles: ['Forex', 'CFD', 'Instant funding', 'Evaluation'],
    productName: 'Forex Funds Flow Programs',
    productDescription:
      '1-step, 2-step, instant funding and FFF Boost simulated evaluation programs with virtual demo capital up to $100k across active funded accounts.',
    accountSizeMin: 2500,
    accountSizeMax: 100000,
    profitTarget: '5% to 10% depending on program; instant program advertises 2% payout target',
    maxDailyLoss: '0% to 4% depending on program',
    maxDrawdown: '0% to 12% depending on program',
    platforms: ['cTrader', 'DXtrade', 'Match-Trader'],
    tradableAssets: ['Forex', 'CFD', 'Indices', 'Metals', 'Crypto to verify by program'],
    minTradingDays: '3 to 10 days depending on program',
    consistencyRule: 'Terms list strict prohibited practices; FFF Boost advertises no consistency rules but exact program terms control.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site and Terms checked. Forex Funds Flow discloses Fx Funds Flow Limited in Saint Lucia, registration number 2025-00415, and footer also references FF Flow LTD / FF Flow Limited in Saint Lucia. Terms say FFF is not a broker, financial institution or investment adviser, does not solicit, manage or accept funds for trading or investment, and that all accounts are simulated demo accounts with no live trading.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'AML Policy', 'Return Policy link', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. The firm now has detailed simulated-service language and a named Saint Lucia entity, but it is very recent, offshore, and terms give broad enforcement powers over prohibited strategies, fee forfeiture and reward rejection.',
      entities: [
        {
          name: 'Fx Funds Flow Limited',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '2025-00415',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Primary company named in the Terms and site disclosure.',
        },
        {
          name: 'FF Flow LTD / FF Flow Limited',
          jurisdiction: 'Saint Lucia',
          registrationNumber: '78177928',
          role: 'Additional Saint Lucia entity referenced in the footer/site disclosure; exact relationship to verify.',
        },
      ],
      regulatoryStatus: [
        'Terms say FFF is not a broker, financial institution or investment advisory firm.',
        'Terms say FFF does not solicit, manage or accept funds for trading or investment purposes.',
        'Terms say all accounts are fully simulated and no live funds are traded.',
        'Governing law and dispute venue are Saint Lucia, with ICC mediation/arbitration language.',
      ],
      complaintsAndDisputes: [
        'Purchases are non-refundable unless access was never delivered or activated.',
        'Terms allow suspension, termination, fee forfeiture, reward rejection and disqualification for prohibited practices.',
        'Rules include many subjective/high-discretion categories: gambling, one-sided trading, group trading, margin concentration, hedging across firms and delayed-data abuse.',
      ],
      redFlags: [
        'Very recent 2025 registration with limited operating history.',
        'Offshore Saint Lucia legal venue for consumer disputes.',
        'Multiple Saint Lucia entity names appear in public disclosure and should be reconciled at checkout.',
        'Broad rule-enforcement language can materially affect payout eligibility.',
      ],
      sources: [
        { label: 'Forex Funds Flow official site', url: 'https://www.forexfundsflow.com/' },
        { label: 'Forex Funds Flow Terms and Conditions', url: 'https://www.forexfundsflow.com/terms-conditions' },
        { label: 'Forex Funds Flow AML Policy', url: 'https://www.forexfundsflow.com/aml-policy' },
        { label: 'Forex Funds Flow Return Policy', url: 'https://www.forexfundsflow.com/return-policy' },
        { label: 'Forex Funds Flow Trustpilot search', url: 'https://www.trustpilot.com/search?query=Forex%20Funds%20Flow' },
      ],
    },
  }),
  universeFirm({
    id: 170,
    slug: 'my-crypto-funding',
    name: 'My Crypto Funding',
    website: 'https://mycryptofunding.com/',
    status: 'À surveiller',
    score: 35,
    founded: 2023,
    market: 'Crypto',
    priceFrom: 0,
    incidents: 4,
    styles: ['Crypto'],
    additionalSources: [
      { label: 'My Crypto Funding terms URL to recheck manually', url: 'https://mycryptofunding.com/terms-and-conditions/' },
      { label: 'My Crypto Funding article/news search', url: 'https://www.google.com/search?q=%22My+Crypto+Funding%22+prop+firm+article+news' },
      { label: 'My Crypto Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=My%20Crypto%20Funding' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited crypto-source and press pass completed. No usable official legal page was captured during the July 8, 2026 review, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. The likely domain mycryptofunding.com did not return a verifiable terms/entity disclosure. Treat the listing as stale or unverified until the current official domain, entity and terms are confirmed.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search', 'Crypto custody/exchange risk checklist'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. A crypto-focused prop-firm name without a captured official entity, terms, refund policy or simulated-service disclaimer should not be ranked as verified.',
      entities: [{ name: 'My Crypto Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify from current official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed.', 'No current broker/non-broker, deposit or simulated-trading wording captured.'],
      complaintsAndDisputes: ['Manual complaint and domain-history review required before any recommendation.'],
      redFlags: [
        'Crypto-focused branding with no accessible legal disclosure in this pass.',
        'Likely official domain did not expose usable primary legal text.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
        'Do not send users to checkout until the current operator is identified.',
      ],
      sources: [
        { label: 'My Crypto Funding official-looking URL', url: 'https://mycryptofunding.com/' },
        { label: 'My Crypto Funding terms URL to recheck manually', url: 'https://mycryptofunding.com/terms-and-conditions/' },
        { label: 'My Crypto Funding article/news search', url: 'https://www.google.com/search?q=%22My+Crypto+Funding%22+prop+firm+article+news' },
        { label: 'My Crypto Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=My%20Crypto%20Funding' },
      ],
    },
  }),
  universeFirm({
    id: 171,
    slug: 'directfundedtrader',
    name: 'DirectFundedTrader',
    website: 'https://directfundedtrader.com/',
    status: 'À surveiller',
    score: 55,
    founded: 2023,
    headquarters: 'Dubai, United Arab Emirates',
    priceFrom: 10,
    profitSplit: 100,
    payoutProof: true,
    incidents: 4,
    styles: ['Forex', 'CFD', 'Instant funding', 'Evaluation', 'Weekend holding'],
    productName: 'DirectFundedTrader Programs',
    productDescription:
      'Evaluation, Turbo, Fast Funding and Instant Funding programs advertised with demo trading, up to $2M scaling claims, FXAN partner material and Platform 5 access.',
    accountSizeMin: 5000,
    accountSizeMax: 2000000,
    profitTarget: '6% to 10% depending on program/stage',
    maxDailyLoss: '3% to 5%',
    maxDrawdown: '6% to 10%',
    platforms: ['Platform 5', 'IOTrades soon', 'FXAN partner material'],
    tradableAssets: ['Forex', 'CFD', 'Indices', 'Metals', 'Crypto to verify'],
    minTradingDays: '2 to 5 days depending on program',
    consistencyRule: 'Instant/Funded table references a 30% max net-profit consistency rule; exact model terms control.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms and Risk Disclosure checked. Terms name DFT GROUP LLC at Business Center 1, M Floor, The Meydan Hotel, Nad Al Sheba, Dubai, UAE. The site says all accounts are demo/virtual, fees are not deposits, DFT Group does not offer financial advice and does not issue or deal in financial products. Terms also say DirectFundedTrader does not accept deposits and does not offer financial, investment, tax or brokerage services.',
    auditSourcesChecked: ['Official site', 'Terms of Services', 'Risk Disclosure', 'Privacy Policy', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. DirectFundedTrader has clear demo/no-deposit language and a named Dubai entity, but the page mixes aggressive funded/live-market marketing claims with demo-only legal clauses, broad prohibited-strategy discretion and no-refund language.',
      entities: [
        {
          name: 'DFT GROUP LLC',
          jurisdiction: 'Dubai, United Arab Emirates',
          registeredAddress: 'Business Center 1, M Floor, The Meydan Hotel, Nad Al Sheba, Dubai, U.A.E.',
          role: 'Company named in the Terms and referenced as the service provider.',
        },
      ],
      regulatoryStatus: [
        'Terms say the platform provides simulated trading tools and demo accounts.',
        'Terms say any trading performed through the service is not real.',
        'Disclaimer says DirectFundedTrader does not offer financial, investment, tax, brokerage or other advice/services and does not accept deposits.',
        'Footer says program fees are not deposits and all trading occurs on demo accounts only.',
      ],
      complaintsAndDisputes: [
        'Registration fee is not refunded if a trader fails the evaluation.',
        'Refund policy says cancellation/termination does not entitle the customer to a refund of fees already paid.',
        'Terms prohibit account management, challenge-passing services, HFT, latency arbitrage, AI/software advantage and other strategies that can trigger rejection.',
      ],
      redFlags: [
        'Homepage says users can trade real capital/live markets in some marketing sections while legal pages say demo-only.',
        'Very aggressive promotional claims: $9.99 start, up to 100% split, 150% refund and $2M scaling.',
        'Broker/partner claims must be separated from DFT GROUP LLC obligations.',
        'Several pages contain rough wording, stale copyright dates and inconsistent product language.',
      ],
      sources: [
        { label: 'DirectFundedTrader official site', url: 'https://directfundedtrader.com/' },
        { label: 'DirectFundedTrader Terms of Services', url: 'https://directfundedtrader.com/termsandservices' },
        { label: 'DirectFundedTrader Risk Disclosure', url: 'https://directfundedtrader.com/risk' },
        { label: 'DirectFundedTrader Privacy Policy', url: 'https://directfundedtrader.com/privacy-policy.html' },
        { label: 'DirectFundedTrader Trustpilot search', url: 'https://www.trustpilot.com/search?query=DirectFundedTrader' },
      ],
    },
  }),
  universeFirm({
    id: 172,
    slug: 'exfunded',
    name: 'ExFunded',
    website: 'https://exfunded.com/',
    status: 'À surveiller',
    score: 34,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'ExFunded terms URL to recheck manually', url: 'https://exfunded.com/terms-and-conditions/' },
      { label: 'ExFunded article/news search', url: 'https://www.google.com/search?q=%22ExFunded%22+prop+firm+article+news' },
      { label: 'ExFunded Trustpilot search', url: 'https://www.trustpilot.com/search?query=ExFunded%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. ExFunded official-looking domain did not expose usable legal text during the July 8, 2026 review, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. No primary entity, terms, refund policy or operating-status proof was captured.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search', 'Incident/watchlist classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk because PropRadar cannot confirm the current operator, jurisdiction or whether the prop-firm program is still active.',
      entities: [{ name: 'ExFunded', jurisdiction: 'To verify', role: 'Brand/operator to identify from current official legal pages.' }],
      regulatoryStatus: ['Official entity and simulated/non-broker language not confirmed.', 'Operating status remains unverified.'],
      complaintsAndDisputes: ['Manual review required for payout, refund and shutdown/domain-change reports.'],
      redFlags: [
        'No usable primary legal source captured.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
        'Do not rank as active/verified without fresh source material.',
      ],
      sources: [
        { label: 'ExFunded official-looking URL', url: 'https://exfunded.com/' },
        { label: 'ExFunded terms URL to recheck manually', url: 'https://exfunded.com/terms-and-conditions/' },
        { label: 'ExFunded article/news search', url: 'https://www.google.com/search?q=%22ExFunded%22+prop+firm+article+news' },
        { label: 'ExFunded Trustpilot search', url: 'https://www.trustpilot.com/search?query=ExFunded%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 173,
    slug: 'optimal-traders',
    name: 'Optimal Traders',
    website: 'https://optimal-traders.com/',
    status: 'À surveiller',
    score: 37,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'Optimal Traders terms URL to recheck manually', url: 'https://optimal-traders.com/terms-and-conditions/' },
      { label: 'Optimal Traders article/news search', url: 'https://www.google.com/search?q=%22Optimal+Traders%22+prop+firm+article+news' },
      { label: 'Optimal Traders Trustpilot search', url: 'https://www.trustpilot.com/search?query=Optimal%20Traders%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. The likely official domain redirects to optimal-traders.com and returns the title "Optimal Traders - World\'s Most Powerful Prop Firm", but no readable legal/entity text was captured. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Treat the fiche as unverified until Terms, refund rules and entity details are accessible.',
    auditSourcesChecked: ['Official domain title capture', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search', 'Incident/watchlist classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. The domain appears to exist, but without captured terms or entity disclosure PropRadar cannot verify legal structure, broker status, deposit language or payout/refund rules.',
      entities: [{ name: 'Optimal Traders', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Legal entity not confirmed.', 'Terms, refund policy and simulated-trading disclaimer not captured.'],
      complaintsAndDisputes: ['Manual review needed across Trustpilot, Discord/Telegram and domain history before any positive ranking.'],
      redFlags: [
        'Readable page title but no captured legal content.',
        'Strong superlative title without visible legal backing in this pass.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
      ],
      sources: [
        { label: 'Optimal Traders official-looking domain', url: 'https://optimal-traders.com/' },
        { label: 'Optimal Traders terms URL to recheck manually', url: 'https://optimal-traders.com/terms-and-conditions/' },
        { label: 'Optimal Traders article/news search', url: 'https://www.google.com/search?q=%22Optimal+Traders%22+prop+firm+article+news' },
        { label: 'Optimal Traders Trustpilot search', url: 'https://www.trustpilot.com/search?query=Optimal%20Traders%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 174,
    slug: 'quantec-trading-capital',
    name: 'Quantec Trading Capital',
    website: 'https://quantectradingcapital.com/',
    status: 'À surveiller',
    score: 34,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'Quantec Trading Capital terms URL to recheck manually', url: 'https://quantectradingcapital.com/terms-and-conditions/' },
      { label: 'Quantec Trading Capital article/news search', url: 'https://www.google.com/search?q=%22Quantec+Trading+Capital%22+prop+firm+article+news' },
      { label: 'Quantec Trading Capital Trustpilot search', url: 'https://www.trustpilot.com/search?query=Quantec%20Trading%20Capital' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. No usable official website or legal page was captured during this pass, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. The listed domain needs manual confirmation because PropRadar could not verify entity, jurisdiction, terms, refund policy or live operating status.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search', 'Incident/watchlist classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. Quantec Trading Capital remains a name-only listing until a current official legal source is found.',
      entities: [{ name: 'Quantec Trading Capital', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed.', 'No current non-broker, deposit or simulated-service disclaimer captured.'],
      complaintsAndDisputes: ['Manual complaint and archive review required.'],
      redFlags: [
        'No usable primary source captured.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
        'Do not recommend until the active domain and terms are verified.',
      ],
      sources: [
        { label: 'Quantec Trading Capital official-looking URL', url: 'https://quantectradingcapital.com/' },
        { label: 'Quantec Trading Capital terms URL to recheck manually', url: 'https://quantectradingcapital.com/terms-and-conditions/' },
        { label: 'Quantec Trading Capital article/news search', url: 'https://www.google.com/search?q=%22Quantec+Trading+Capital%22+prop+firm+article+news' },
        { label: 'Quantec Trading Capital Trustpilot search', url: 'https://www.trustpilot.com/search?query=Quantec%20Trading%20Capital' },
      ],
    },
  }),
  universeFirm({
    id: 175,
    slug: 'next-level-funding',
    name: 'Next Level Funding',
    website: 'https://nextlevelfunding.com/',
    status: 'À surveiller',
    score: 34,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'Next Level Funding terms URL to recheck manually', url: 'https://nextlevelfunding.com/terms-and-conditions/' },
      { label: 'Next Level Funding article/news search', url: 'https://www.google.com/search?q=%22Next+Level+Funding%22+prop+firm+article+news' },
      { label: 'Next Level Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Next%20Level%20Funding%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. No usable current official legal source was captured for the listed domain during the July 8, 2026 review, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. This name may require domain-history research because the operator, terms and refund rules are not verified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search', 'Incident/watchlist classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. Next Level Funding stays in watchlist status until the current official domain and legal entity can be confirmed.',
      entities: [{ name: 'Next Level Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Entity, jurisdiction, simulated-service language and refund policy not confirmed.'],
      complaintsAndDisputes: ['Manual complaint review required before ranking or recommending.'],
      redFlags: [
        'No usable official legal page captured.',
        'Potentially stale or ambiguous name/domain match.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
      ],
      sources: [
        { label: 'Next Level Funding official-looking URL', url: 'https://nextlevelfunding.com/' },
        { label: 'Next Level Funding terms URL to recheck manually', url: 'https://nextlevelfunding.com/terms-and-conditions/' },
        { label: 'Next Level Funding article/news search', url: 'https://www.google.com/search?q=%22Next+Level+Funding%22+prop+firm+article+news' },
        { label: 'Next Level Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Next%20Level%20Funding%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 176,
    slug: 'superfunded',
    name: 'SuperFunded',
    website: 'https://superfunded.com/',
    status: 'À surveiller',
    score: 54,
    founded: 2023,
    priceFrom: 33,
    profitSplit: 90,
    payoutProof: true,
    incidents: 4,
    styles: ['Forex', 'Crypto', 'CFD', 'Indices', 'Metals'],
    productName: 'SuperFunded Challenges',
    productDescription:
      '1-step and 2-step simulated challenge programs with virtual funded accounts, dashboard access, TradeLocker-style platform login and Eightcap partner references.',
    accountSizeMin: 3000,
    accountSizeMax: 200000,
    profitTarget: '8% on 1-step; 10% / 5% on 2-step',
    maxDailyLoss: '3% on 1-step; 5% on 2-step',
    maxDrawdown: '5% on 1-step; 10% on 2-step',
    platforms: ['SuperFunded Dashboard', 'TradeLocker login', 'Eightcap partner reference'],
    tradableAssets: ['Forex', 'Crypto', 'CFDs', 'Oil', 'Indices', 'Metals'],
    minTradingDays: '3 days on 1-step; 4 days on 2-step',
    consistencyRule: 'Rules and Conditions PDF must be checked; homepage summary does not expose all payout review criteria.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official homepage checked. SuperFunded says evaluation and funded-stage trades are simulated, users access simulated capital, and prizes can be paid from simulated profits. Footer risk disclosure says Super Funded is not a broker and does not accept deposits. Legal PDF links exist, but the General Terms PDF returned 403 Forbidden in this capture; no named legal entity was readable from the homepage.',
    auditSourcesChecked: ['Official site', 'General Terms PDF link', 'Rules and Conditions link', 'Complaint Management Policy link', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high risk. SuperFunded provides clear simulated/no-deposit wording on the homepage and footer, but the contracting entity was not captured and key legal PDFs were blocked by 403 in the web capture.',
      entities: [{ name: 'Super Funded / SuperFunded', jurisdiction: 'To verify', role: 'Brand/operator not identified from captured homepage legal text.' }],
      regulatoryStatus: [
        'Homepage says the firm simulates actual trades in evaluation and funded stages.',
        'Homepage says users receive access to simulated capital and a simulated balance.',
        'Footer says Super Funded is not a broker and does not accept deposits.',
        'Footer says platform/data-feed technology is powered by third-party liquidity providers.',
      ],
      complaintsAndDisputes: [
        'Full General Terms, Rules and Conditions, Complaint Management Policy and Participation Verification Policy must be read before purchase.',
        'Payouts are described as prizes from simulated profits, so eligibility likely depends on compliance review.',
      ],
      redFlags: [
        'No named legal entity captured on homepage.',
        'General Terms PDF returned 403 Forbidden in this capture.',
        'Public Eightcap/broker relationship should not be confused with user having a brokerage account.',
      ],
      sources: [
        { label: 'SuperFunded official site', url: 'https://superfunded.com/' },
        { label: 'SuperFunded General Terms PDF', url: 'https://superfunded.com/wp-content/uploads/2026/01/Super-Funded-General-Terms-and-Conditions-V1.0.pdf' },
        { label: 'SuperFunded Trustpilot search', url: 'https://www.trustpilot.com/search?query=SuperFunded' },
      ],
    },
  }),
  universeFirm({
    id: 177,
    slug: 'ck-capital',
    name: 'CK Capital',
    status: 'À surveiller',
    score: 32,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'CK Capital article/news search', url: 'https://www.google.com/search?q=%22CK+Capital%22+%22prop+firm%22+article+news' },
      { label: 'CK Capital Trustpilot search', url: 'https://www.trustpilot.com/search?query=CK%20Capital%20prop%20firm' },
      { label: 'CK Capital web search', url: 'https://www.google.com/search?q=%22CK+Capital%22+%22prop+firm%22' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Identity and press-triage pass completed. No current official prop-firm website, legal entity, terms page or refund policy was captured during the July 8, 2026 review, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for a prop-firm operator. The CK Capital name is too ambiguous to treat as verified without a current official URL.',
    auditSourcesChecked: ['No official domain stored', 'Exact-name web search', 'Trustpilot search', 'Exact-name article/news search', 'Generic-name false-match review'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. CK Capital remains a name-only watchlist entry until the active prop-firm domain and contracting entity can be identified.',
      entities: [{ name: 'CK Capital', jurisdiction: 'To verify', role: 'Brand/operator to identify from current official legal pages.' }],
      regulatoryStatus: ['Official legal entity not confirmed.', 'No broker/non-broker, deposit or simulated-service wording captured.'],
      complaintsAndDisputes: ['Manual domain-history, Trustpilot and social review required before any ranking.'],
      redFlags: [
        'Ambiguous brand name.',
        'No usable primary legal source captured.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
        'Do not recommend until official terms are sourced.',
      ],
      sources: [
        { label: 'CK Capital Trustpilot search', url: 'https://www.trustpilot.com/search?query=CK%20Capital%20prop%20firm' },
        { label: 'CK Capital article/news search', url: 'https://www.google.com/search?q=%22CK+Capital%22+%22prop+firm%22+article+news' },
        { label: 'CK Capital web search', url: 'https://www.google.com/search?q=%22CK+Capital%22+%22prop+firm%22' },
      ],
    },
  }),
  universeFirm({
    id: 178,
    slug: 'onefunded',
    name: 'OneFunded',
    website: 'https://onefunded.com/',
    status: 'À surveiller',
    score: 61,
    founded: 2025,
    headquarters: 'United Kingdom / Saint Lucia',
    priceFrom: 49,
    profitSplit: 90,
    payoutProof: true,
    incidents: 3,
    styles: ['Forex', 'Crypto', 'Indices', 'Commodities', 'Stocks', 'Simulated evaluation'],
    productName: 'OneFunded Challenges',
    productDescription:
      'Flash, Core, Value and Flex simulated challenge programs with virtual capital up to $200k, MT5/cTrader/TradeLocker access and 7- or 14-day payout-cycle claims.',
    accountSizeMin: 5000,
    accountSizeMax: 200000,
    profitTarget: 'Program-specific; public pages reference 1-step and 2-step challenges',
    maxDailyLoss: '4% to 5% depending on challenge plan',
    maxDrawdown: '6% to 10% depending on plan',
    platforms: ['MetaTrader 5', 'cTrader', 'TradeLocker'],
    tradableAssets: ['Forex', 'Indices', 'Commodities', 'Crypto', 'Stocks'],
    minTradingDays: 'No universal minimum captured; plan-specific',
    consistencyRule: 'Terms define a Best Day Simulated Profit / Consistency Rule; plan pages must be checked before checkout.',
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site, Terms, Disclaimer and Refund Policy checked. OneFunded discloses Brynex Tech Limited, UK company number 15918986, as website/service provider, and OneFunded Capital Ltd. in Saint Lucia for certain MT5 services. The site states all trading occurs in a simulated environment using virtual funds, fees are not deposits, OneFunded is not a broker, and it does not accept trading deposits, execute trades in financial markets or hold client funds.',
    auditSourcesChecked: ['Official site', 'Terms and Conditions', 'Disclaimer', 'Refund Policy', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'Medium to high',
      lastChecked: '2026-07-08',
      summary:
        'Medium-to-high legal risk. OneFunded gives unusually clear simulated/no-broker/no-deposit disclosures and a named UK service provider, but the public structure also references a Saint Lucia company for some MT5 clients, very recent marketing claims, broad prohibited-trading discretion and restrictive refund conditions after trading activity.',
      entities: [
        {
          name: 'Brynex Tech Limited',
          jurisdiction: 'United Kingdom',
          registrationNumber: '15918986',
          registeredAddress: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom',
          role: 'Website operator, service provider and technology/platform service provider disclosed in Terms and footer.',
        },
        {
          name: 'OneFunded Capital Ltd.',
          jurisdiction: 'Saint Lucia',
          registeredAddress: 'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia',
          role: 'Disclosed as responsible for certain services to specific clients who trade via the MetaQuotes MT5 platform.',
        },
      ],
      regulatoryStatus: [
        'Terms say services are strictly educational, do not offer investment opportunities, do not accept deposits and do not manage client funds.',
        'Terms say the provider is not registered or regulated by the FCA.',
        'FAQ says OneFunded is not a broker and does not provide brokerage services.',
        'Footer says all trading occurs on demo accounts under simulated live trading conditions and all profits are simulated profits.',
      ],
      complaintsAndDisputes: [
        'Refund Policy was last updated June 25, 2026 and allows refunds only under narrow criteria such as substandard service, billing issues or no trading activity within 3 working days.',
        'After engaging in trading activities, users are generally not entitled to request a refund of the access fee.',
        'Chargebacks without prior communication may trigger account suspension, termination and extra fees.',
      ],
      redFlags: [
        'Recent brand with heavy promotional copy, media badges and fast-payout claims.',
        'Two-entity structure across the UK and Saint Lucia should be reconciled with checkout invoices and platform access.',
        'Terms include broad prohibited-activity and consistency-rule discretion that can affect payout eligibility.',
      ],
      sources: [
        { label: 'OneFunded official site', url: 'https://onefunded.com/' },
        { label: 'OneFunded Terms and Conditions', url: 'https://onefunded.com/terms-and-conditions/' },
        { label: 'OneFunded Disclaimer', url: 'https://onefunded.com/disclaimer/' },
        { label: 'OneFunded Refund Policy', url: 'https://onefunded.com/refund-policy/' },
        { label: 'OneFunded Trustpilot search', url: 'https://www.trustpilot.com/search?query=OneFunded' },
      ],
    },
  }),
  universeFirm({
    id: 179,
    slug: 'firmity-funding',
    name: 'Firmity Funding',
    website: 'https://firmityfunding.com/',
    status: 'À surveiller',
    score: 33,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'Firmity Funding terms URL to recheck manually', url: 'https://firmityfunding.com/terms-and-conditions/' },
      { label: 'Firmity Funding article/news search', url: 'https://www.google.com/search?q=%22Firmity+Funding%22+prop+firm+article+news' },
      { label: 'Firmity Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Firmity%20Funding' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. No usable official legal page was captured for the likely domain firmityfunding.com during this pass, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Entity, operating status, terms, refund policy and payout rules remain unverified.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search', 'Incident/watchlist classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. Firmity Funding should remain a watchlist entry until the current operator and legal documents can be sourced.',
      entities: [{ name: 'Firmity Funding', jurisdiction: 'To verify', role: 'Brand/operator to identify from current official legal pages.' }],
      regulatoryStatus: ['Official entity and simulated/non-broker wording not confirmed.', 'Operating status remains unverified.'],
      complaintsAndDisputes: ['Manual review needed for payout/refund complaints and domain history.'],
      redFlags: [
        'Likely official domain did not expose usable legal text.',
        'No terms, refund policy or entity disclosure captured.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
      ],
      sources: [
        { label: 'Firmity Funding official-looking URL', url: 'https://firmityfunding.com/' },
        { label: 'Firmity Funding terms URL to recheck manually', url: 'https://firmityfunding.com/terms-and-conditions/' },
        { label: 'Firmity Funding article/news search', url: 'https://www.google.com/search?q=%22Firmity+Funding%22+prop+firm+article+news' },
        { label: 'Firmity Funding Trustpilot search', url: 'https://www.trustpilot.com/search?query=Firmity%20Funding' },
      ],
    },
  }),
  universeFirm({
    id: 180,
    slug: 'hash-hedge',
    name: 'Hash Hedge',
    website: 'https://hashhedge.com/',
    status: 'À surveiller',
    score: 36,
    founded: 2023,
    market: 'Crypto',
    priceFrom: 0,
    incidents: 4,
    styles: ['Crypto'],
    additionalSources: [
      { label: 'Hash Hedge terms URL to recheck manually', url: 'https://hashhedge.com/terms-and-conditions/' },
      { label: 'Hash Hedge article/news search', url: 'https://www.google.com/search?q=%22Hash+Hedge%22+prop+firm+article+news' },
      { label: 'Hash Hedge Trustpilot search', url: 'https://www.trustpilot.com/search?query=Hash%20Hedge%20prop%20firm' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited crypto-source and press pass completed. Official-looking domain was reachable and presented Hash Hedge as a crypto prop-firm brand, but the captured page exposed no readable terms, entity disclosure, refund policy or broker/non-broker disclaimer. Exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. Keep as high-information-risk until legal pages are accessible.',
    auditSourcesChecked: ['Official homepage/title capture', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search', 'Crypto custody/exchange risk checklist'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk. Crypto-focused prop-firm marketing without captured entity or terms is not enough for a verified listing.',
      entities: [{ name: 'Hash Hedge', jurisdiction: 'To verify', role: 'Brand/operator to identify from official legal pages.' }],
      regulatoryStatus: ['Legal entity not confirmed.', 'No captured no-deposit, non-broker or simulated-trading wording.'],
      complaintsAndDisputes: ['Manual review required for payout, refund, token/crypto-rail and domain-history complaints.'],
      redFlags: [
        'Crypto-focused positioning with no readable legal disclosure in this capture.',
        'No terms/refund page captured.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
        'Do not rank as verified until the operator and user contract are confirmed.',
      ],
      sources: [
        { label: 'Hash Hedge official-looking site', url: 'https://hashhedge.com/' },
        { label: 'Hash Hedge terms URL to recheck manually', url: 'https://hashhedge.com/terms-and-conditions/' },
        { label: 'Hash Hedge article/news search', url: 'https://www.google.com/search?q=%22Hash+Hedge%22+prop+firm+article+news' },
        { label: 'Hash Hedge Trustpilot search', url: 'https://www.trustpilot.com/search?query=Hash%20Hedge%20prop%20firm' },
      ],
    },
  }),
  universeFirm({
    id: 181,
    slug: 'real-funds-trader',
    name: 'Real Funds Trader',
    website: 'https://realfundstrader.com/',
    status: 'À surveiller',
    score: 32,
    founded: 2023,
    priceFrom: 0,
    incidents: 4,
    additionalSources: [
      { label: 'Real Funds Trader terms URL to recheck manually', url: 'https://realfundstrader.com/terms-and-conditions/' },
      { label: 'Real Funds Trader article/news search', url: 'https://www.google.com/search?q=%22Real+Funds+Trader%22+prop+firm+article+news' },
      { label: 'Real Funds Trader Trustpilot search', url: 'https://www.trustpilot.com/search?query=Real%20Funds%20Trader' },
    ],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Limited source and press pass completed. No usable official website, legal text or current operating proof was captured for Real Funds Trader during the July 8, 2026 review, and exact-name article/news searches did not surface reliable mainstream or financial-press coverage for the prop-firm brand. The entry remains unverified and may be stale.',
    auditSourcesChecked: ['Official domain reachability', 'Likely terms URL', 'Trustpilot search', 'Exact-name article/news search', 'Incident/watchlist classification'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary: 'High information risk because the active operator, jurisdiction, terms and refund policy could not be confirmed from primary sources.',
      entities: [{ name: 'Real Funds Trader', jurisdiction: 'To verify', role: 'Brand/operator to identify from current official legal pages.' }],
      regulatoryStatus: ['Official entity, broker status and simulated-service language not confirmed.'],
      complaintsAndDisputes: ['Manual complaint, archive and Trustpilot review required before any ranking.'],
      redFlags: [
        'No usable primary legal source captured.',
        'Potentially stale or inactive domain match.',
        'No reliable newspaper/financial-press article surfaced for the exact prop-firm brand.',
      ],
      sources: [
        { label: 'Real Funds Trader official-looking URL', url: 'https://realfundstrader.com/' },
        { label: 'Real Funds Trader terms URL to recheck manually', url: 'https://realfundstrader.com/terms-and-conditions/' },
        { label: 'Real Funds Trader article/news search', url: 'https://www.google.com/search?q=%22Real+Funds+Trader%22+prop+firm+article+news' },
        { label: 'Real Funds Trader Trustpilot search', url: 'https://www.trustpilot.com/search?query=Real%20Funds%20Trader' },
      ],
    },
  }),
  universeFirm({
    id: 182,
    slug: 'forfx',
    name: 'ForFX',
    website: 'https://www.forfx.com/',
    status: 'Fermée',
    score: 40,
    founded: 2021,
    headquarters: 'Saint Vincent and the Grenadines',
    priceFrom: 0,
    incidents: 4,
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Official site checked. FORFX now states the service permanently closed, effective June 2026, and claims every challenge was refunded, every profit paid out, support completed and zero outstanding debt. Footer says FORFX was owned and operated by OPO GROUP LLC in Saint Vincent and the Grenadines, registration number 866LLC2021.',
    auditSourcesChecked: ['Official closure page', 'Trustpilot search'],
    regulatoryAudit: {
      riskLevel: 'High',
      lastChecked: '2026-07-08',
      summary:
        'Closed-service risk. FORFX should not be recommended for new purchases because the official site says operations ceased in June 2026. The closure page claims obligations were fulfilled, but those claims still need independent complaint and payout-history review.',
      entities: [
        {
          name: 'OPO GROUP LLC',
          jurisdiction: 'Saint Vincent and the Grenadines',
          registrationNumber: '866LLC2021',
          registeredAddress: 'Suite 305, Griffith Corporate Centre, Beachmont, Kingstown, St. Vincent and the Grenadines',
          role: 'Former owner/operator of FORFX disclosed on the official closure page.',
        },
      ],
      regulatoryStatus: [
        'Official site says FORFX has permanently closed, effective June 2026.',
        'Closure page says all active challenge fees were fully refunded and all pending withdrawals/profits were paid.',
        'Footer says FORFX was a brand owned and operated by OPO GROUP LLC.',
      ],
      complaintsAndDisputes: [
        'Closure-page claims should be cross-checked against recent user complaints before marking legacy disputes resolved.',
        'Support contact remains support@forfx.com for unresolved account or past-challenge questions.',
      ],
      redFlags: [
        'Service permanently closed; no new purchase path should be promoted.',
        'Saint Vincent and the Grenadines operator with limited direct recourse for many retail users.',
        'Closure claims are self-reported and require external verification.',
      ],
      sources: [
        { label: 'FORFX official closure page', url: 'https://www.forfx.com/' },
        { label: 'FORFX Trustpilot search', url: 'https://www.trustpilot.com/search?query=FORFX' },
      ],
    },
  }),
  universeFirm({
    id: 183,
    slug: 'the-concept-trading',
    name: 'The Concept Trading',
    website: 'https://theconcepttrading.com/',
    status: 'À surveiller',
    score: 68,
    founded: 2021,
    headquarters: 'Australia',
    priceFrom: 65,
    profitSplit: 90,
    payoutProof: true,
    incidents: 2,
    styles: ['Forex', 'Derivatives', 'Education', 'Prop account', 'No daily drawdown'],
    productName: 'The Concept Trading Prop Accounts',
    productDescription:
      'Australian education and prop-account program with Instant Funded, 1-step, 2-step/Foundation and scaling models, no daily drawdown and weekly payout claims.',
    accountSizeMin: 1000,
    accountSizeMax: 200000,
    profitTarget: '6% to 10% depending on model/level',
    maxDailyLoss: 'No daily drawdown advertised',
    maxDrawdown: '3% to 10% static drawdown depending on model',
    platforms: ['Platform 5', 'TradeLocker'],
    tradableAssets: ['Forex', 'Derivatives', 'Crypto markets when offered by broker', 'To verify by model'],
    minTradingDays: 'Foundation model references 3 profitable days per stage/level',
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

export function regulatoryRiskClass(risk: RegulatoryRiskLevel) {
  if (risk === 'Low' || risk === 'Low to medium') return 'badge-green';
  if (risk === 'Medium' || risk === 'Medium to high' || risk === 'To audit') return 'badge-amber';
  return 'badge-red';
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
