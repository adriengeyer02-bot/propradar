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
  xSource?: 'Revue manuelle' | 'Estimation PropRadar' | 'API X à connecter';
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
  newsTrading: 'Autorisé' | 'Restreint' | 'Non recommandé' | 'Variable';
  eaAllowed: 'Oui' | 'Non' | 'Sur demande' | 'Variable';
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
export const THE5ERS_AFFILIATE_URL = 'https://www.the5ers.com/?afmc=1cuh';
export const PROPRADAR_PROMO_CODE = 'PROPRADAR';

type ProductInput = Pick<Product, 'id' | 'name' | 'description'> & Partial<Omit<Product, 'id' | 'name' | 'description'>>;

function product(data: ProductInput): Product {
  return {
    type: 'Challenge',
    accountSizeMin: 5000,
    accountSizeMax: 200000,
    profitTarget: 'variable selon programme',
    maxDailyLoss: 'variable',
    maxDrawdown: 'variable',
    profitSplit: 'variable',
    platforms: ['À vérifier'],
    tradableAssets: ['À vérifier'],
    hasConsistencyRule: true,
    consistencyRule: 'Règles non encore auditées dans PropRadar : consulter la source officielle du produit.',
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
    redditMentions: data.status === 'Fermée' ? 'archives et alertes historiques' : data.incidents >= 3 ? 'volume élevé de plaintes à trier' : 'volume public à surveiller',
    redditSignal: redditSignal(redditScore),
    redditFlags:
      data.status === 'Fermée'
        ? ['Archives de crise', 'Témoignages historiques à contextualiser']
        : data.incidents >= 3
          ? ['Plaintes récurrentes à trier', 'Signal communautaire bruyant', 'Vérifier les posts récents']
          : ['Volume à surveiller', 'Comparer Reddit avec Discord et preuves de payout'],
    xScore,
    ...xBreakdown,
    xSource: 'Estimation PropRadar',
    xMentions:
      data.status === 'Fermée'
        ? 'estimation PropRadar : archives X/Twitter à traiter comme signaux historiques, pas comme preuve actuelle'
        : data.incidents >= 3
          ? 'estimation PropRadar : plaintes publiques et threads X/Twitter à recouper avec les payouts récents'
          : 'veille X/Twitter estimée : à synchroniser par API ou revue manuelle avant de parler de score live',
    xSignal: xSignal(xScore),
    xFlags:
      data.status === 'Fermée'
        ? ['Archives X/Twitter historiques', 'Ne pas confondre ancien buzz et risque actuel']
        : data.incidents >= 3
          ? ['Threads publics à relire', 'Vérifier les dates des plaintes', 'Recouper avec Discord et Trustpilot']
          : ['Signal rapide mais bruité', 'À croiser avec Reddit, Discord et preuves de payout'],
    trustpilotReliabilityScore,
    trustpilotReliability: trustpilotReliabilityLabel(trustpilotReliabilityScore),
    trustpilotNote: data.trustpilotRating
      ? `Note brute Trustpilot ${data.trustpilotRating}/5. La fiabilité ci-dessus est pondérée avec Reddit, les incidents payout et le niveau de preuve.`
      : 'Note Trustpilot non renseignée dans PropRadar : le radar applique une pondération prudente.',
    trustpilotFlags: data.trustpilotRating
      ? ['Note brute disponible', 'Pondération par incidents et preuves externes', 'Trustpilot ne vérifie pas les faits décrits dans les avis']
      : ['Note brute non renseignée', 'Ne pas utiliser Trustpilot seul'],
    trustpilotFlaggedReviewCount: flaggedReviewCount,
    trustpilotFlaggedReviewNote:
      flaggedReviewCount > 0
        ? `${flaggedReviewCount} alerte(s) avis suivie(s) par PropRadar. À confirmer dans la page transparence Trustpilot de la firm.`
        : 'Aucune alerte chiffrée de faux avis suivie dans PropRadar pour cette firm.',
    manipulationRiskScore,
    manipulationRisk: manipulationRiskLabel(manipulationRiskScore),
    payoutRiskScore,
    payoutRisk: payoutRiskLabel(payoutRiskScore),
    payoutIncidentCount: data.incidents,
    payoutIncidentStatus: payoutIncidentStatus(payoutRiskScore, data.incidents),
    payoutIssues: data.incidentsDetails,
    confidenceDrivers: [
      data.payoutProof ? 'Payout revendiqué ou signalé, preuve publique à vérifier' : 'Preuves de payout insuffisantes',
      data.legalVerified ? 'Structure légale identifiée' : 'Structure légale fragile ou non vérifiée',
      data.recentRuleChange ? 'Changements récents à contrôler' : 'Règles plutôt stables récemment',
    ],
    radarVerdict:
      payoutRiskScore >= 65
        ? 'Le radar détecte un risque payout significatif : lire les règles et les retours récents avant tout achat.'
        : trustpilotReliabilityScore < 50
          ? 'Avis publics trop fragiles : ne pas se fier à la note affichée sans preuve externe.'
          : 'Signal public exploitable, mais à confirmer sur les sources officielles avant achat.',
    lastSignalCheck: data.lastReviewed,
  };
}

function firm(data: FirmInput): PropFirm {
  const { reviewSignals, ...firmData } = data;
  const base: Omit<PropFirm, 'reviewSignals'> = {
    lastReviewed: REVIEW_DATE,
    incidentsDetails: ['Règles, conditions commerciales et statuts à revérifier avant achat.'],
    styles: ['Forex'],
    legalVerified: true,
    transparencyScore: 12,
    payoutProof: false,
    recentRuleChange: true,
    logoDomain: undefined,
    trustpilotRating: undefined,
    products: [],
    strengths: ['Offre identifiable', 'Sources officielles disponibles'],
    weaknesses: ['Règles susceptibles de changer', 'Données à revérifier avant achat'],
    sources: [],
    commercialRelationship: 'Aucune',
    auditStatus: 'Partiellement vérifié',
    auditSummary: 'Données structurées dans PropRadar, à compléter par une revue web complète.',
    auditSourcesChecked: ['Site officiel'],
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
  const sourceLabel = data.website ? `Site officiel ${data.name}` : data.sourceLabel ?? `Signal de veille ${data.name}`;
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
      data.website ? 'Site officiel' : 'Source de veille',
      hasTrustpilotSource ? 'Trustpilot' : undefined,
      data.reviewSignals ? 'Signaux avis/payout PropRadar' : undefined,
      isClosed ? 'Archive risque' : undefined,
    ].filter((source): source is string => Boolean(source));
  const auditStatus = data.auditStatus ?? (hasSecondarySource ? 'Partiellement vérifié' : 'À auditer');
  const auditSummary =
    data.auditSummary ??
    (auditStatus === 'À auditer'
      ? 'Entrée universe ajoutée pour couverture large : site ou source de veille identifié, mais avis, règles et payouts restent à vérifier avant recommandation.'
      : 'Entrée universe enrichie par au moins une source externe ou un signal PropRadar, mais pas encore validée comme dossier multi-source complet.');

  return firm({
    id: data.id,
    slug: data.slug,
    name: data.name,
    status,
    score: data.score ?? (status === 'Active' ? 68 : isClosed ? 12 : 58),
    founded: data.founded ?? 2023,
    headquarters: data.headquarters ?? 'International',
    bestFor: `${market.toLowerCase()} à vérifier dans le radar`,
    verdict:
      data.note ??
      `${data.name} est ajoutée à la couverture universe de PropRadar. La fiche reste volontairement prudente tant que les règles, avis et preuves de payout ne sont pas revus en profondeur.`,
    priceFrom: data.priceFrom ?? 0,
    profitSplit: data.profitSplit ?? (isClosed ? 0 : 80),
    drawdownType: data.drawdownType ?? (isFutures ? 'Trailing' : 'Hybride'),
    newsTrading: isClosed ? 'Non recommandé' : 'Variable',
    eaAllowed: isClosed ? 'Non' : 'Variable',
    payoutDelay: isClosed ? 'non applicable' : 'à vérifier',
    incidents: data.incidents ?? (isClosed ? 5 : status === 'Active' ? 1 : 2),
    incidentsDetails: isClosed
      ? ['Statut fermé ou non recommandable : aucun achat à privilégier.']
      : ['Entrée universe : règles, frais, payouts et avis récents à revérifier avant achat.'],
    styles,
    legalVerified: !isClosed,
    transparencyScore: status === 'Active' ? 12 : isClosed ? 2 : 9,
    payoutProof: data.payoutProof ?? false,
    recentRuleChange: data.recentRuleChange ?? true,
    trustpilotRating: data.trustpilotRating,
    logoDomain,
    communitySignal: isClosed
      ? 'Archive de risque conservée pour éviter les recherches trompeuses.'
      : 'Signal communautaire à enrichir avec Reddit, Trustpilot, Discord et preuves de payout récentes.',
    products: isClosed
      ? []
      : [
          product({
            id: `${data.slug}-program`,
            name: data.productName ?? `${data.name} Program`,
            type: data.productType ?? (isFutures ? 'Futures evaluation' : market === 'Crypto' ? 'Challenge' : 'Challenge'),
            description: `Programme ${market} ajouté à la couverture universe. Conditions à confirmer sur la source officielle.`,
            accountSizeMin: isFutures ? 25000 : 5000,
            accountSizeMax: isFutures ? 300000 : 400000,
            entryFeeMin: data.priceFrom && data.priceFrom > 0 ? data.priceFrom : undefined,
            profitSplit: `jusqu’à ${data.profitSplit ?? 80}% selon conditions`,
            platforms: isFutures ? ['NinjaTrader', 'Tradovate', 'Rithmic', 'À vérifier'] : ['MT4', 'MT5', 'cTrader', 'À vérifier'],
            tradableAssets: isFutures ? ['Futures'] : market === 'Crypto' ? ['Crypto'] : market === 'Actions' ? ['Actions'] : ['Forex', 'Indices', 'Métaux', 'Crypto'],
            linkToStart: data.affiliateUrl ?? data.website,
          }),
        ],
    strengths: isClosed ? ['Archive utile pour la prévention'] : ['Nom ajouté à la couverture globale', 'Source officielle disponible'],
    weaknesses: isClosed
      ? ['Aucun achat recommandé', 'Risque opérationnel matérialisé']
      : ['Fiche à enrichir', 'Données de payout et avis à revérifier', 'Pas une recommandation forte par défaut'],
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
    headquarters: 'République tchèque',
    bestFor: 'traders forex/CFD qui veulent un acteur historique',
    verdict: 'Référence du secteur, très suivie, avec une structure de challenge claire et une réputation solide.',
    priceFrom: 155,
    profitSplit: 80,
    drawdownType: 'EOD',
    newsTrading: 'Restreint',
    eaAllowed: 'Oui',
    payoutDelay: 'souvent 1 à 3 jours ouvrés',
    incidents: 1,
    transparencyScore: 19,
    payoutProof: true,
    recentRuleChange: false,
    trustpilotRating: 4.8,
    logoDomain: 'ftmo.com',
    communitySignal: 'Très forte visibilité, beaucoup de retours vérifiables et d’analyses tierces.',
    commercialRelationship: 'Affiliation transparente',
    commercialNote: 'PropRadar peut recevoir une commission si tu passes par ce lien. Le score reste indépendant et les points faibles restent affichés.',
    reviewSignals: {
      redditScore: 86,
      redditMentions: 'volume élevé, retours globalement stables, plaintes surtout liées aux règles ou vérifications',
      redditSignal: 'Positif',
      redditFlags: ['Volume élevé et ancien', 'Plaintes surtout liées à l’application des règles', 'Peu de patterns de non-payout récurrents'],
      trustpilotReliabilityScore: 88,
      trustpilotReliability: 'Forte',
      trustpilotNote: 'Trustpilot 4,8/5 avec environ 45k avis publics. Signal fort, mais Trustpilot ne fact-check pas chaque récit de payout : PropRadar le pondère avec règles, Reddit et incidents.',
      trustpilotFlags: ['Volume d’avis très significatif', 'Profil revendiqué et abonnement Trustpilot', 'Trustpilot filtre les avis non conformes mais ne vérifie pas chaque fait décrit', 'Faible taux de réponse aux avis négatifs à surveiller'],
      trustpilotFlaggedReviewCount: 0,
      trustpilotFlaggedReviewNote: 'Aucun compteur public de faux avis retirés ou sanctionnés n’a été relevé sur la page Trustpilot consultée. Le signal reste très fort, avec réserve sur la vérification factuelle des témoignages.',
      manipulationRiskScore: 24,
      manipulationRisk: 'Faible',
      payoutRiskScore: 22,
      payoutRisk: 'Faible',
      payoutIncidentCount: 1,
      payoutIncidentStatus: 'Aucun signal fort',
      payoutIssues: ['Peu de signaux récurrents de non-payout ; les litiges visibles concernent surtout l’interprétation des règles.'],
      confidenceDrivers: ['Ancienneté forte', 'Règles publiques détaillées', 'Affiliation signalée sans masquer les limites'],
      radarVerdict: 'Signal de confiance élevé : FTMO reste bien notée, mais PropRadar garde visibles les restrictions et les litiges liés aux règles.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [
      product({
        id: 'ftmo-challenge',
        name: 'FTMO Challenge',
        description: 'Évaluation en une ou deux étapes avec objectifs de profit et limites de perte.',
        accountSizeMin: 10000,
        accountSizeMax: 200000,
        entryFeeMin: 155,
        entryFeeMax: 1080,
        profitTarget: '10% puis 5% sur le modèle 2 étapes',
        maxDailyLoss: '5%',
        maxDrawdown: '10%',
        profitSplit: '80% à 90%',
        platforms: ['MT4', 'MT5', 'cTrader', 'DXtrade'],
        tradableAssets: ['Forex', 'Indices', 'Matières premières', 'Crypto', 'Actions CFD'],
        minTradingDays: '4 jours minimum sur certains modèles',
        hasConsistencyRule: false,
        consistencyRule: undefined,
        linkToStart: FTMO_AFFILIATE_URL,
        isPopular: true,
      }),
    ],
    strengths: ['Marque installée', 'Règles détaillées', 'Bon niveau de transparence', 'Nombreux retours publics'],
    weaknesses: ['Prix plus élevé que certains concurrents', 'Restrictions autour des news et stratégies copiées à vérifier'],
    auditStatus: 'Vérifié multi-source',
    auditSummary:
      'Sources officielles FTMO et page Trustpilot consultées : ancienneté, règles publiques et volume d’avis cohérents. Reste à surveiller : litiges individuels liés aux règles, KYC et exécution.',
    auditSourcesChecked: ['Site officiel', 'Règles officielles', 'FAQ officielle', 'Trustpilot', 'Payout/community signals'],
    sources: [
      { label: 'Site officiel FTMO', url: 'https://ftmo.com/' },
      { label: 'Objectifs de trading FTMO', url: 'https://ftmo.com/en/trading-objectives/' },
      { label: 'FAQ FTMO', url: 'https://ftmo.com/en/faq/' },
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
    headquarters: 'Israël',
    bestFor: 'traders prudents qui aiment les limites statiques',
    verdict: 'Profil sérieux avec plusieurs parcours, apprécié par les traders qui privilégient la gestion du risque.',
    priceFrom: 39,
    profitSplit: 80,
    drawdownType: 'Static',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'souvent quelques jours ouvrés',
    incidents: 1,
    transparencyScore: 17,
    payoutProof: true,
    recentRuleChange: true,
    trustpilotRating: 4.7,
    logoDomain: 'the5ers.com',
    communitySignal: 'Bonne réputation, surtout chez les traders conservateurs.',
    commercialRelationship: 'Affiliation transparente',
    commercialNote: 'PropRadar peut recevoir une commission via le lien The5ers. Le code PROPRADAR est affiché comme avantage promotionnel à vérifier au checkout, sans impact sur le score.',
    products: [
      product({
        id: 'the5ers-high-stakes',
        name: 'High Stakes',
        description: 'Programme en deux phases avec objectifs progressifs et limites de perte strictes.',
        accountSizeMin: 5000,
        accountSizeMax: 100000,
        entryFeeMin: 39,
        entryFeeMax: 495,
        profitTarget: '8% puis 5%',
        maxDailyLoss: '5%',
        maxDrawdown: '10%',
        profitSplit: '80% à 100% selon scaling',
        platforms: ['MT5', 'cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Matières premières'],
        hasConsistencyRule: false,
        consistencyRule: undefined,
        linkToStart: THE5ERS_AFFILIATE_URL,
        isPopular: true,
      }),
    ],
    strengths: ['Drawdown souvent lisible', 'Programmes variés', 'Orientation risque stricte'],
    weaknesses: ['Règles différentes selon programme', 'Moins flexible pour certains profils news/scalping'],
    auditStatus: 'Vérifié multi-source',
    auditSummary:
      'Sources officielles The5ers et page Trustpilot consultées : score public élevé, volume important et forte réponse aux avis négatifs. Les règles restent à vérifier produit par produit.',
    auditSourcesChecked: ['Site officiel', 'Programmes officiels', 'Trustpilot', 'Payout/community signals'],
    sources: [
      { label: 'Site officiel The5ers', url: 'https://the5ers.com/' },
      { label: 'Programmes The5ers', url: 'https://the5ers.com/programs/' },
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
    headquarters: 'Émirats arabes unis',
    bestFor: 'traders qui veulent plusieurs modèles de challenge',
    verdict: 'Acteur très visible avec des offres agressives, intéressant mais à suivre de près côté règles et promos.',
    priceFrom: 59,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'annoncé rapide selon modèle',
    incidents: 2,
    transparencyScore: 15,
    payoutProof: true,
    trustpilotRating: 4.5,
    logoDomain: 'fundednext.com',
    communitySignal: 'Très présent dans la communauté, avis nombreux mais à filtrer.',
    products: [
      product({
        id: 'fundednext-evaluation',
        name: 'Evaluation',
        description: 'Challenge CFD avec plusieurs tailles, modèles et conditions de payout.',
        entryFeeMin: 59,
        entryFeeMax: 999,
        profitSplit: 'jusqu’à 90% selon conditions',
        platforms: ['MT4', 'MT5', 'cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Métaux', 'Crypto'],
        linkToStart: 'https://fundednext.com/',
        isPopular: true,
      }),
    ],
    strengths: ['Prix d’entrée attractifs', 'Plusieurs modèles', 'Forte visibilité internationale'],
    weaknesses: ['Complexité des règles', 'Promotions fréquentes à vérifier', 'Risque de confusion entre modèles'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Sources officielles et page Trustpilot consultées. Le volume d’avis est très important, mais le taux de réponse aux avis négatifs et la logique promotionnelle imposent une lecture prudente.',
    auditSourcesChecked: ['Site officiel', 'FAQ officielle', 'Trustpilot', 'Promos officielles'],
    reviewSignals: {
      trustpilotReliabilityScore: 70,
      trustpilotReliability: 'Moyenne',
      trustpilotNote:
        'Trustpilot 4,5/5 avec plus de 72k avis publics et beaucoup d’avis récents. Signal utile, mais à pondérer : promotions fréquentes, réponses faibles aux avis négatifs et règles variables selon produit.',
      trustpilotFlags: [
        'Volume d’avis très élevé',
        'Avis clients régulièrement sollicités',
        'Réponse quasi absente aux avis négatifs sur la page consultée',
        'Trustpilot ne vérifie pas les faits de chaque témoignage',
      ],
      trustpilotFlaggedReviewCount: 0,
      trustpilotFlaggedReviewNote:
        'Aucun compteur officiel de faux avis retirés ou sanctionnés n’a été relevé sur la page consultée. PropRadar garde toutefois des alertes qualitatives sur le volume marketing et le faible traitement public des avis négatifs.',
      manipulationRiskScore: 48,
      manipulationRisk: 'Moyen',
    },
    sources: [
      { label: 'Site officiel FundedNext', url: 'https://fundednext.com/' },
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
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui veulent un acteur ancien',
    verdict: 'Un des noms historiques du funded trading futures, avec un cadre plus institutionnel que beaucoup de concurrents récents.',
    priceFrom: 49,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable selon compte et règles',
    incidents: 1,
    transparencyScore: 17,
    payoutProof: true,
    recentRuleChange: false,
    trustpilotRating: 3.5,
    logoDomain: 'topstep.com',
    communitySignal: 'Très connu côté futures, avec beaucoup de contenu pédagogique.',
    styles: ['Futures', 'Intraday', 'Scalping'],
    products: [
      product({
        id: 'topstep-trading-combine',
        name: 'Trading Combine',
        type: 'Futures evaluation',
        description: 'Évaluation futures avec règles de perte, objectifs et passage vers compte financé.',
        accountSizeMin: 50000,
        accountSizeMax: 150000,
        entryFeeMin: 49,
        entryFeeMax: 149,
        maxDrawdown: 'trailing',
        profitSplit: 'jusqu’à 90%',
        platforms: ['TopstepX', 'NinjaTrader', 'Tradovate'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://www.topstep.com/',
        isPopular: true,
      }),
    ],
    strengths: ['Ancienneté', 'Spécialiste futures', 'Formation et cadre assez documentés'],
    weaknesses: ['Règles de drawdown plus complexes', 'Moins adapté forex/CFD'],
    auditStatus: 'Partiellement vérifié',
    auditSummary:
      'Sources officielles et Trustpilot consultées. Topstep reste un acteur historique futures, mais le signal Trustpilot est seulement moyen avec une part notable d’avis négatifs et un profil fusionné.',
    auditSourcesChecked: ['Site officiel', 'Help Center officiel', 'Trustpilot', 'Payout/community signals'],
    reviewSignals: {
      trustpilotReliabilityScore: 56,
      trustpilotReliability: 'Moyenne',
      trustpilotNote:
        'Trustpilot 3,5/5 avec environ 14k avis. Signal moins fort que les leaders CFD : avis 1 étoile significatifs, faible réponse aux avis négatifs et profil Trustpilot fusionné.',
      trustpilotFlags: [
        'Profil Trustpilot fusionné',
        'Part d’avis 1 étoile notable',
        'Catégorie signalée comme investissement à haut risque',
        'Ne pas lire la note comme preuve de payout',
      ],
      trustpilotFlaggedReviewCount: 0,
      trustpilotFlaggedReviewNote:
        'Aucun compteur officiel de faux avis retirés ou sanctionnés n’a été relevé sur la page consultée. PropRadar garde toutefois une alerte qualitative liée au profil fusionné et à la dispersion des avis.',
      manipulationRiskScore: 44,
      manipulationRisk: 'Moyen',
    },
    sources: [
      { label: 'Site officiel Topstep', url: 'https://www.topstep.com/' },
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
    headquarters: 'États-Unis',
    bestFor: 'traders futures attirés par les fortes promotions',
    verdict: 'Très populaire grâce aux promotions, mais les règles de payout et de cohérence demandent une lecture froide.',
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
    communitySignal: 'Volume énorme de retours, positifs et négatifs : vérifier les règles avant paiement.',
    styles: ['Futures', 'Scalping', 'Intraday'],
    reviewSignals: {
      redditScore: 48,
      redditMentions: 'nombreux retours Reddit sur payouts, cohérence, trailing threshold et règles de retrait',
      redditSignal: 'Négatif',
      redditFlags: ['Plaintes récurrentes sur règles de retrait', 'Confusion autour de la cohérence', 'Promotions très fréquentes à pondérer'],
      trustpilotReliabilityScore: 45,
      trustpilotReliability: 'Faible',
      trustpilotNote: 'Les avis très positifs doivent être fortement pondérés par les retours Reddit et les règles de payout.',
      trustpilotFlags: ['Décalage possible entre note publique et retours forums', 'Avis à pondérer avec règles de payout', 'Ne pas décider sur Trustpilot seul'],
      manipulationRiskScore: 78,
      manipulationRisk: 'Élevé',
      payoutRiskScore: 78,
      payoutRisk: 'Élevé',
      payoutIncidentCount: 3,
      payoutIncidentStatus: 'Incidents récurrents',
      payoutIssues: [
        'Règles de cohérence et de payout souvent citées comme source de frustration.',
        'Trailing threshold difficile à gérer pour les débutants.',
        'Promotions fréquentes pouvant masquer le coût réel et les contraintes.',
      ],
      confidenceDrivers: ['Très grande communauté', 'Produit futures populaire', 'Mais règles de payout à lire ligne par ligne'],
      radarVerdict: 'Signal contrasté : Apex attire beaucoup de traders, mais le risque payout/cohérence doit être traité comme un point central.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [
      product({
        id: 'apex-evaluation',
        name: 'Evaluation Accounts',
        type: 'Futures evaluation',
        description: 'Évaluations futures avec comptes de tailles multiples et promotions fréquentes.',
        accountSizeMin: 25000,
        accountSizeMax: 300000,
        entryFeeMin: 37,
        entryFeeMax: 657,
        maxDailyLoss: 'règles futures spécifiques',
        maxDrawdown: 'trailing threshold',
        profitSplit: 'jusqu’à 90%',
        platforms: ['NinjaTrader', 'Tradovate', 'Rithmic'],
        tradableAssets: ['Futures'],
        consistencyRule: 'Règles de cohérence et payout à lire avant chaque retrait.',
        linkToStart: 'https://apextraderfunding.com/',
        isPopular: true,
      }),
    ],
    strengths: ['Prix promo agressifs', 'Large choix de tailles', 'Très grosse communauté futures'],
    weaknesses: ['Règles de payout sensibles', 'Promotions qui masquent parfois le risque', 'Signal communautaire bruyant'],
    sources: [
      { label: 'Site officiel Apex', url: 'https://apextraderfunding.com/' },
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
    verdict: 'Très visible et compétitif, mais le profil récent impose de suivre les règles, partenaires brokers et retours payout.',
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
    communitySignal: 'Très discuté, avec un besoin de tri entre promotions et retours réels.',
    products: [
      product({
        id: 'fundingpips-evaluation',
        name: 'Evaluation',
        description: 'Challenge CFD avec plusieurs tailles de compte et prix d’appel bas.',
        accountSizeMin: 5000,
        accountSizeMax: 100000,
        entryFeeMin: 20,
        entryFeeMax: 499,
        profitSplit: 'jusqu’à 100% selon offres',
        platforms: ['cTrader', 'Match-Trader', 'DXtrade'],
        tradableAssets: ['Forex', 'Indices', 'Métaux', 'Crypto'],
        linkToStart: 'https://fundingpips.com/',
      }),
    ],
    strengths: ['Prix bas', 'Marketing fort', 'Payouts revendiqués publiquement'],
    weaknesses: ['Historique court', 'Dépendance aux règles actuelles de plateforme', 'Besoin de vérification avant achat'],
    sources: [
      { label: 'Site officiel Funding Pips', url: 'https://fundingpips.com/' },
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
    bestFor: 'traders CFD qui veulent des challenges accessibles',
    verdict: 'Acteur récent mais visible, intéressant si les règles du programme choisi collent à ton style.',
    priceFrom: 14,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: '10 jours ouvrés sur certains programmes',
    incidents: 1,
    transparencyScore: 14,
    payoutProof: true,
    recentRuleChange: false,
    logoDomain: 'maventrading.com',
    communitySignal: 'Signal communautaire en croissance, encore moins profond que les grandes marques.',
    products: [
      product({
        id: 'maven-challenge',
        name: 'Maven Challenge',
        description: 'Évaluations 1-step, 2-step et 3-step avec petites tailles très accessibles.',
        accountSizeMin: 2000,
        accountSizeMax: 200000,
        entryFeeMin: 14,
        entryFeeMax: 800,
        profitTarget: '8% / 5% selon modèle',
        maxDailyLoss: '2% à 4% selon modèle',
        maxDrawdown: '3% à 8% selon modèle',
        profitSplit: '80%',
        platforms: ['MT5'],
        tradableAssets: ['Forex', 'Indices', 'Métaux', 'Crypto'],
        hasConsistencyRule: false,
        consistencyRule: undefined,
        linkToStart: 'https://maventrading.com/',
      }),
    ],
    strengths: ['Prix d’entrée très bas', 'Offres lisibles sur le site', 'Pas de cohérence sur certains modèles'],
    weaknesses: ['Historique récent', 'Montants faibles utiles surtout pour tester'],
    sources: [
      { label: 'Site officiel Maven Trading', url: 'https://maventrading.com/' },
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
    headquarters: 'Royaume-Uni',
    bestFor: 'traders forex qui veulent une marque UK visible',
    verdict: 'Acteur sérieux à surveiller favorablement, avec une offre structurée et une marque assez installée.',
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
    communitySignal: 'Bonne notoriété dans le segment forex prop firm.',
    products: [
      product({
        id: 'alpha-evaluation',
        name: 'Alpha Pro Evaluation',
        description: 'Évaluation forex/CFD avec tailles de compte jusqu’à 200K simulés.',
        accountSizeMax: 200000,
        entryFeeMin: 97,
        profitSplit: 'jusqu’à 80%+',
        platforms: ['MT5'],
        tradableAssets: ['Forex', 'Indices', 'Métaux'],
        linkToStart: 'https://alphacapitalgroup.uk/',
      }),
    ],
    sources: [
      { label: 'Site officiel Alpha Capital Group', url: 'https://alphacapitalgroup.uk/' },
    ],
  }),
  firm({
    id: 11,
    slug: 'fxify',
    name: 'FXIFY',
    status: 'Active',
    score: 74,
    founded: 2023,
    headquarters: 'Royaume-Uni / International',
    bestFor: 'traders qui veulent beaucoup de programmes et d’assets',
    verdict: 'Offre large, très marketing, avec broker backing revendiqué ; bon candidat mais règles à filtrer par programme.',
    priceFrom: 0,
    profitSplit: 90,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Oui',
    payoutDelay: 'variable',
    incidents: 2,
    transparencyScore: 14,
    payoutProof: true,
    lastReviewed: '2026-07-02',
    trustpilotRating: 4.4,
    logoDomain: 'fxify.com',
    communitySignal: 'Forte présence marketing, beaucoup de programmes et de promotions.',
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
        consistencyRule: 'Regles exactes et add-ons a confirmer au checkout FXIFY.',
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
        consistencyRule: 'Structure et add-ons a relire avant achat.',
        linkToStart: 'https://fxify.com/programs/two-phase/',
      }),
      product({
        id: 'fxify-three-phase',
        name: 'FXIFY Three Phase',
        description: 'Evaluation en trois phases avec coût d entree plus bas et cible de progression annoncee a 5%.',
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
        consistencyRule: 'Programme plus progressif, details a verifier sur la page officielle.',
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
        description: 'Acces sans evaluation, sans target annoncee, pour traders deja confiants.',
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
        consistencyRule: 'Pas d evaluation, mais regles de risque et payout a lire ligne par ligne.',
        linkToStart: 'https://fxify.com/programs/instant-funding/',
      }),
    ],
    strengths: ['Large choix de programmes', 'EAs autorisés selon présentation', 'Beaucoup d’actifs'],
    weaknesses: ['Promotions nombreuses', 'Prix et règles à vérifier modèle par modèle'],
    sources: [
      { label: 'Site officiel FXIFY', url: 'https://fxify.com/' },
      { label: 'FXIFY One Phase', url: 'https://fxify.com/programs/one-phase/' },
      { label: 'FXIFY Two Phase', url: 'https://fxify.com/programs/two-phase/' },
      { label: 'FXIFY Three Phase', url: 'https://fxify.com/programs/three-phase-challenge/' },
      { label: 'FXIFY Fast Payouts', url: 'https://fxify.com/fast-payouts/' },
      { label: 'Trustpilot FXIFY', url: 'https://www.trustpilot.com/review/fxify.com' },
    ],
    auditSummary:
      'Pages officielles FXIFY reliees par programme, page payout ajoutee et page Trustpilot consultee. Le dossier reste partiel tant que Reddit et les preuves de payout independantes ne sont pas attaches une par une.',
    auditSourcesChecked: ['Site officiel', 'Pages programmes', 'Page payouts officielle', 'Trustpilot a verifier'],
    reviewSignals: {
      trustpilotSourceUrl: 'https://www.trustpilot.com/review/fxify.com',
      trustpilotReviewCount: 6055,
      trustpilotFlaggedReviewCount: 3,
      trustpilotFlaggedReviewNote: 'Trustpilot consulte le 2026-07-02 : avis globalement positifs, mais plusieurs avis recents parlent de delais payout ou de refus apres accusation de strategie interdite.',
      payoutIssues: [
        'Trustpilot recent : plainte de payout en attente au-dela du delai annonce, a verifier avec la reponse officielle.',
        'Trustpilot recent : refus ou blocage de compte apres allegation de strategie interdite / arbitrage de latence.',
        'Signal mixte : des avis recents rapportent aussi des retraits rapides, donc le point reste a surveiller plutot qu a trancher.',
      ],
      confidenceDrivers: ['Pages programmes officielles reliees', 'Page payout officielle reliee', 'Trustpilot relie avec signaux payout mixtes'],
      radarVerdict: 'FXIFY est mieux documentee par programme. Le score reste prudent : Trustpilot est solide en volume, mais les retours payout recents doivent etre lus avant achat.',
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
    bestFor: 'traders attirés par instant funding et splits élevés',
    verdict: 'Offre agressive et très orientée marketing ; intéressante seulement avec lecture complète des règles.',
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
    communitySignal: 'Jeune marque très visible, à traiter avec prudence avant achat.',
    products: [
      product({
        id: 'aqua-instant',
        name: 'Instant Funding / Challenges',
        type: 'Instant funding',
        description: 'Produits avec accès rapide et splits élevés selon conditions.',
        accountSizeMax: 200000,
        entryFeeMin: 35,
        profitSplit: 'jusqu’à 100% selon offre',
        platforms: ['MT5', 'cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Crypto'],
        linkToStart: 'https://www.aquafunded.com/',
      }),
    ],
    sources: [{ label: 'Site officiel AquaFunded', url: 'https://www.aquafunded.com/' }],
  }),
  firm({
    id: 13,
    slug: 'goat-funded-trader',
    name: 'GOAT Funded Trader',
    status: 'À surveiller',
    score: 68,
    founded: 2023,
    headquarters: 'International',
    bestFor: 'traders CFD sensibles aux prix promotionnels',
    verdict: 'Marque très visible, mais score plafonné tant que l’historique et les retours payout restent moins établis.',
    priceFrom: 35,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'goatfundedtrader.com',
    communitySignal: 'Beaucoup de visibilité sociale ; diligence nécessaire.',
    products: [
      product({
        id: 'goat-challenges',
        name: 'GOAT Challenges',
        description: 'Challenges CFD avec tailles de compte multiples.',
        accountSizeMax: 200000,
        entryFeeMin: 35,
        profitSplit: 'jusqu’à 90%',
        platforms: ['MT5'],
        tradableAssets: ['Forex', 'Indices', 'Métaux', 'Crypto'],
        linkToStart: 'https://www.goatfundedtrader.com/',
      }),
    ],
    sources: [{ label: 'Site officiel GOAT Funded Trader', url: 'https://www.goatfundedtrader.com/' }],
  }),
  firm({
    id: 14,
    slug: 'brightfunded',
    name: 'BrightFunded',
    status: 'Active',
    score: 73,
    founded: 2023,
    headquarters: 'Pays-Bas / International',
    bestFor: 'traders CFD qui veulent un site clair et payouts rapides annoncés',
    verdict: 'Acteur récent mais proprement présenté ; intéressant, avec prudence sur les promesses de rapidité.',
    priceFrom: 49,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: '24h annoncé sur certains cas',
    incidents: 1,
    transparencyScore: 14,
    payoutProof: true,
    logoDomain: 'brightfunded.com',
    communitySignal: 'Positionnement transparent sur plateformes et payouts, mais historique encore jeune.',
    products: [
      product({
        id: 'brightfunded-evaluation',
        name: 'BrightFunded Evaluation',
        description: 'Évaluation jusqu’à 400K avec cTrader, MT5 et DXtrade.',
        accountSizeMax: 400000,
        entryFeeMin: 49,
        profitSplit: 'jusqu’à 100% selon scaling',
        platforms: ['cTrader', 'MT5', 'DXtrade'],
        tradableAssets: ['Forex', 'Indices', 'Matières premières'],
        hasConsistencyRule: false,
        consistencyRule: undefined,
        linkToStart: 'https://brightfunded.com/',
      }),
    ],
    sources: [{ label: 'Site officiel BrightFunded', url: 'https://brightfunded.com/' }],
  }),
  firm({
    id: 15,
    slug: 'instant-funding',
    name: 'Instant Funding',
    status: 'Active',
    score: 76,
    founded: 2021,
    headquarters: 'Royaume-Uni',
    bestFor: 'traders qui veulent éviter une évaluation classique',
    verdict: 'Offre instant funding plus mature que beaucoup de concurrents, mais les règles de drawdown intelligent doivent être comprises.',
    priceFrom: 39,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: '14 jours puis hebdomadaire sur certains comptes',
    incidents: 1,
    transparencyScore: 15,
    payoutProof: true,
    logoDomain: 'instantfunding.com',
    communitySignal: 'Marque installée dans la niche instant funding.',
    products: [
      product({
        id: 'instant-funding-account',
        name: 'Instant Funding Account',
        type: 'Instant funding',
        description: 'Accès direct à un compte simulé avec règles de smart drawdown et scaling.',
        accountSizeMin: 625,
        accountSizeMax: 300000,
        entryFeeMin: 39,
        profitTarget: 'pas d’objectif fixe sur certains comptes',
        maxDailyLoss: 'aucune limite quotidienne sur certains comptes',
        maxDrawdown: '10% puis smart drawdown',
        profitSplit: '80% à 90%',
        platforms: ['MT5', 'cTrader', 'Match-Trader'],
        tradableAssets: ['Forex', 'Indices', 'Crypto'],
        hasConsistencyRule: false,
        consistencyRule: undefined,
        linkToStart: 'https://instantfunding.com/',
      }),
    ],
    sources: [{ label: 'Site officiel Instant Funding', url: 'https://instantfunding.com/' }],
  }),
  firm({
    id: 16,
    slug: 'funded-trading-plus',
    name: 'Funded Trading Plus',
    status: 'Active',
    score: 74,
    founded: 2021,
    headquarters: 'Royaume-Uni',
    bestFor: 'traders CFD qui veulent plusieurs formats de challenge',
    verdict: 'Acteur plutôt établi dans les prop firms CFD, avec règles à vérifier selon le type de compte choisi.',
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
    communitySignal: 'Bon historique relatif, sans atteindre les leaders historiques.',
    products: [
      product({
        id: 'ftp-programs',
        name: 'Funded Trading Plus Programs',
        description: 'Programmes d’évaluation et instant funding selon profils.',
        accountSizeMax: 200000,
        entryFeeMin: 119,
        profitSplit: 'jusqu’à 90%',
        platforms: ['MT4', 'MT5', 'cTrader'],
        tradableAssets: ['Forex', 'Indices', 'Métaux', 'Crypto'],
        linkToStart: 'https://www.fundedtradingplus.com/',
      }),
    ],
    sources: [{ label: 'Site officiel Funded Trading Plus', url: 'https://www.fundedtradingplus.com/' }],
  }),
  firm({
    id: 17,
    slug: 'blue-guardian',
    name: 'Blue Guardian',
    status: 'À surveiller',
    score: 70,
    founded: 2019,
    headquarters: 'Royaume-Uni / International',
    bestFor: 'traders cherchant une alternative CFD avec instant funding',
    verdict: 'Offre visible et installée, mais le score reste prudent sur les règles et l’évolution commerciale.',
    priceFrom: 47,
    profitSplit: 80,
    drawdownType: 'Hybride',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'variable',
    incidents: 2,
    logoDomain: 'blueguardian.com',
    communitySignal: 'Présence communautaire correcte, signal à confirmer par preuves payout récentes.',
    commercialRelationship: 'Affiliation transparente',
    commercialNote: 'PropRadar peut recevoir une commission via le lien Blue Guardian. Le code PROPRADAR est affiché comme avantage promotionnel à vérifier au checkout, sans impact sur le score.',
    products: [
      product({
        id: 'blueguardian-programs',
        name: 'Blue Guardian Programs',
        description: 'Challenges et offres instant funding selon profil.',
        accountSizeMax: 200000,
        entryFeeMin: 47,
        profitSplit: 'jusqu’à 90%',
        platforms: ['MT5'],
        tradableAssets: ['Forex', 'Indices', 'Métaux', 'Crypto'],
        linkToStart: BLUE_GUARDIAN_AFFILIATE_URL,
      }),
    ],
    sources: [{ label: 'Site officiel Blue Guardian', url: 'https://blueguardian.com/' }],
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
    headquarters: 'Royaume-Uni',
    bestFor: 'traders qui veulent un acteur ancien basé à Londres',
    verdict: 'Acteur ancien, plus traditionnel, moins orienté promos agressives que beaucoup de nouvelles prop firms.',
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
    communitySignal: 'Moins viral, mais historique long dans le secteur.',
    products: [
      product({
        id: 'audacity-programs',
        name: 'Funded Trader Programs',
        description: 'Programmes de financement forex avec approche plus traditionnelle.',
        accountSizeMax: 500000,
        entryFeeMin: 99,
        profitSplit: '50% à 80% selon programme',
        platforms: ['MT4', 'MT5'],
        tradableAssets: ['Forex', 'Indices', 'Métaux'],
        linkToStart: 'https://audacity.capital/',
      }),
    ],
    sources: [{ label: 'Site officiel Audacity Capital', url: 'https://audacity.capital/' }],
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
    headquarters: 'États-Unis',
    bestFor: 'traders futures qui veulent une alternative moderne',
    verdict: 'Alternative futures en croissance, à comparer avec Topstep, Apex et Take Profit Trader.',
    priceFrom: 99,
    profitSplit: 90,
    drawdownType: 'Trailing',
    newsTrading: 'Variable',
    eaAllowed: 'Variable',
    payoutDelay: 'quotidien annoncé sur certains plans',
    incidents: 1,
    payoutProof: true,
    logoDomain: 'tradeify.co',
    communitySignal: 'Jeune acteur futures, popularité en hausse.',
    styles: ['Futures', 'Intraday', 'Scalping'],
    products: [
      product({
        id: 'tradeify-futures',
        name: 'Futures Plans',
        type: 'Futures evaluation',
        description: 'Plans futures avec évaluations et offres instant funding.',
        accountSizeMax: 150000,
        entryFeeMin: 99,
        maxDrawdown: 'trailing selon plan',
        profitSplit: 'jusqu’à 90%',
        platforms: ['Tradovate', 'NinjaTrader'],
        tradableAssets: ['Futures'],
        linkToStart: 'https://tradeify.co/',
      }),
    ],
    sources: [{ label: 'Site officiel Tradeify', url: 'https://tradeify.co/' }],
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
    newsTrading: 'Non recommandé',
    eaAllowed: 'Non',
    payoutDelay: 'non applicable',
    incidents: 6,
    legalVerified: false,
    transparencyScore: 1,
    payoutProof: false,
    logoDomain: 'myfundedfx.com',
    communitySignal: 'Statut fermé confirmé par message public du domaine redirigé.',
    reviewSignals: {
      redditScore: 5,
      redditMentions: 'archives de plaintes et statut fermé',
      redditSignal: 'Négatif',
      redditFlags: ['Statut fermé', 'Archives de plaintes', 'Aucun achat à considérer'],
      trustpilotReliabilityScore: 10,
      trustpilotReliability: 'Faible',
      trustpilotNote: 'Les avis historiques ne sont plus utiles pour un achat : le statut opérationnel prime.',
      trustpilotFlags: ['Avis historiques obsolètes', 'Statut opérationnel prioritaire', 'Ne pas utiliser la note comme signal d’achat'],
      manipulationRiskScore: 96,
      manipulationRisk: 'Élevé',
      payoutRiskScore: 100,
      payoutRisk: 'Critique',
      payoutIncidentCount: 6,
      payoutIncidentStatus: 'Critique',
      payoutIssues: [
        'Seacrest Markets indique publiquement ne plus opérer.',
        'Aucun produit actif recommandé.',
        'Risque opérationnel matérialisé : ne pas envoyer de capital ou acheter de challenge.',
      ],
      confidenceDrivers: ['Archive de prévention', 'Statut fermé plus important que les anciennes notes', 'Aucune recommandation active'],
      radarVerdict: 'Alerte critique : PropRadar conserve cette fiche pour éviter que les traders tombent sur d’anciens avis trompeurs.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [],
    strengths: ['Aucune pour un achat actuel'],
    weaknesses: ['Fermeture', 'Aucun produit actif recommandé', 'Risque opérationnel matérialisé'],
    sources: [{ label: 'Message de fermeture Seacrest Markets', url: 'https://myfundedfx.com/' }],
  }),
  firm({
    id: 37,
    slug: 'myforexfunds',
    name: 'My Forex Funds',
    status: 'Fermée',
    score: 8,
    founded: 2020,
    headquarters: 'Canada',
    bestFor: 'cas d’école à éviter',
    verdict: 'Exemple majeur de risque sectoriel : popularité élevée ne signifie pas sécurité opérationnelle.',
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
    communitySignal: 'Nom très connu, mais non exploitable comme option d’achat.',
    reviewSignals: {
      redditScore: 8,
      redditMentions: 'archives de crise, plaintes traders et action réglementaire',
      redditSignal: 'Négatif',
      redditFlags: ['Action réglementaire', 'Archives de crise', 'Popularité historique trompeuse'],
      trustpilotReliabilityScore: 12,
      trustpilotReliability: 'Faible',
      trustpilotNote: 'La note d’avis historique n’a plus de valeur de confiance depuis l’action réglementaire.',
      trustpilotFlags: ['Avis historiques disqualifiés par le risque réglementaire', 'Ne pas comparer comme une firm active', 'Statut prioritaire sur la note'],
      manipulationRiskScore: 98,
      manipulationRisk: 'Élevé',
      payoutRiskScore: 100,
      payoutRisk: 'Critique',
      payoutIncidentCount: 6,
      payoutIncidentStatus: 'Critique',
      payoutIssues: [
        'Action réglementaire publique contre l’opérateur.',
        'Activité non exploitable comme option d’achat actuelle.',
        'Cas d’école montrant que popularité et avis publics ne garantissent pas la sécurité.',
      ],
      confidenceDrivers: ['Cas d’école de risque sectoriel', 'Archive utile pour la prévention', 'Aucune recommandation active'],
      radarVerdict: 'Alerte critique : My Forex Funds montre pourquoi PropRadar ne doit pas se fier aux avis publics seuls.',
      lastSignalCheck: REVIEW_DATE,
    },
    products: [],
    strengths: ['Aucune pour un achat actuel'],
    weaknesses: ['Fermeture', 'Risque réglementaire matérialisé', 'Aucun produit à recommander'],
    sources: [{ label: 'CFTC - My Forex Funds', url: 'https://www.cftc.gov/' }],
  }),
  firm({
    id: 38,
    slug: 'surgetrader',
    name: 'SurgeTrader',
    status: 'Fermée',
    score: 6,
    founded: 2021,
    headquarters: 'États-Unis',
    bestFor: 'cas d’école à éviter',
    verdict: 'Ancien acteur connu dont la fermeture rappelle l’importance de surveiller les statuts opérationnels.',
    priceFrom: 0,
    profitSplit: 0,
    drawdownType: 'Static',
    newsTrading: 'Non recommandé',
    eaAllowed: 'Non',
    payoutDelay: 'non applicable',
    incidents: 5,
    legalVerified: false,
    transparencyScore: 2,
    payoutProof: false,
    logoDomain: 'surgetrader.com',
    communitySignal: 'À conserver dans les archives du radar comme alerte de risque.',
    products: [],
    strengths: ['Aucune pour un achat actuel'],
    weaknesses: ['Fermeture', 'Aucun produit actif', 'Historique à risque'],
    sources: [{ label: 'Ancien site SurgeTrader', url: 'https://surgetrader.com/' }],
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
    communitySignal: 'Signal historique de fermeture et d’instabilité.',
    products: [],
    strengths: ['Aucune pour un achat actuel'],
    weaknesses: ['Fermeture', 'Risque opérationnel élevé', 'Aucun produit recommandé'],
    sources: [{ label: 'Ancien site True Forex Funds', url: 'https://trueforexfunds.com/' }],
  }),
  firm({
    id: 40,
    slug: 'fidelcrest',
    name: 'Fidelcrest',
    status: 'Fermée',
    score: 9,
    founded: 2018,
    headquarters: 'International',
    bestFor: 'cas d’école à éviter',
    verdict: 'Ancien acteur connu, à garder dans les archives de risque plutôt que dans les recommandations.',
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
    logoDomain: 'fidelcrest.com',
    communitySignal: 'Historique connu, mais non prioritaire pour achat.',
    products: [],
    strengths: ['Aucune pour un achat actuel'],
    weaknesses: ['Statut non recommandable', 'Historique à risque', 'Aucun produit actif à privilégier'],
    sources: [{ label: 'Ancien site Fidelcrest', url: 'https://fidelcrest.com/' }],
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
      'PropRadar peut recevoir une commission via le lien FunderPro. Le code PROPRADAR est affiché comme avantage promotionnel à vérifier au checkout, sans impact sur le score.',
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
      'Page officielle et Trustpilot Lucid consultés : note publique élevée et avis récents nombreux. Le dossier reste partiel car il manque encore une revue complète Reddit, règles, preuves de payout et incidents indépendants.',
    auditSourcesChecked: ['Site officiel', 'Trustpilot'],
    reviewSignals: {
      trustpilotReliabilityScore: 68,
      trustpilotReliability: 'Moyenne',
      trustpilotNote:
        'Trustpilot 4,6/5 avec un volume élevé d’avis récents. Signal positif, mais à pondérer : profil revendiqué récemment, abonnement payant, avis régulièrement invités et faible taux de réponse aux avis négatifs.',
      trustpilotFlags: [
        'Volume public important',
        'Beaucoup d’avis récents et vérifiés',
        'Trustpilot ne vérifie pas les faits décrits dans chaque avis',
        'Réponse faible aux avis négatifs à surveiller',
      ],
      trustpilotFlaggedReviewCount: 0,
      trustpilotFlaggedReviewNote:
        'Aucun compteur public de faux avis retirés ou sanctionnés n’a été relevé sur la page Trustpilot consultée. Le score reste pondéré par la jeunesse du profil et le mode de collecte des avis.',
      manipulationRiskScore: 42,
      manipulationRisk: 'Moyen',
    },
  }),
  universeFirm({ id: 112, slug: 'alpha-futures', name: 'Alpha Futures', website: 'https://alphafutures.com/', status: 'À surveiller', score: 63, founded: 2024, market: 'Futures', priceFrom: 99, styles: ['Futures'] }),
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
  if (score >= 80) return 'badge-green';
  if (score >= 60) return 'badge-amber';
  return 'badge-red';
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
  if (value <= 0) return 'À vérifier';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}
