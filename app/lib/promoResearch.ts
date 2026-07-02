import {
  BLUE_GUARDIAN_AFFILIATE_URL,
  FTMO_AFFILIATE_URL,
  FUNDERPRO_AFFILIATE_URL,
  PROPRADAR_PROMO_CODE,
  THE5ERS_AFFILIATE_URL,
  getFirmBySlug,
  propFirms,
  type PropFirm,
} from './propFirms';

export const PROMO_REVIEW_DATE = '2026-07-02';

export type PromoProofLevel = 'Officiel' | 'Affiliation PropRadar' | 'A confirmer au checkout' | 'Bon plan sans code';
export type PromoCategory = 'code' | 'affiliate' | 'official-discount' | 'price-opportunity' | 'futures';

export type PromoDeal = {
  slug: string;
  label: string;
  title: string;
  code: string;
  value: string;
  category: PromoCategory;
  proofLevel: PromoProofLevel;
  sourceUrl: string;
  sourceLabel: string;
  sourceNote?: string;
  consumerVerdict: string;
  caveats: string[];
  bestFor: string[];
};

export const promoDeals: PromoDeal[] = [
  {
    slug: 'blue-guardian',
    label: 'Offre officielle + affiliation',
    title: 'Forex 40-50% et futures 40% affiches sur le site',
    code: PROPRADAR_PROMO_CODE,
    value: '40-50%',
    category: 'official-discount',
    proofLevel: 'Officiel',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Site officiel Blue Guardian + lien affilie PropRadar',
    sourceNote: 'Site officiel consulte le 2026-07-02 : Forex Discount SAVE 40% to 50% et Futures Discount SAVE 40%.',
    consumerVerdict:
      'Meilleure opportunite de reduction visible, mais Blue Guardian reste classee a surveiller : lire payout, instant funding et conditions avant achat.',
    caveats: ['Reduction exacte a confirmer au checkout', 'Score PropRadar prudent', 'Lien affilie sans impact sur le score'],
    bestFor: ['promo forte', 'instant funding', 'forex', 'futures'],
  },
  {
    slug: 'the5ers',
    label: 'Affiliation transparente',
    title: 'Code PropRadar disponible au checkout',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    category: 'code',
    proofLevel: 'Affiliation PropRadar',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'Lien affilie The5ers PropRadar',
    sourceNote: 'Lien affilie fourni pour PropRadar. Reduction exacte a confirmer au checkout.',
    consumerVerdict:
      'Bon plan prioritaire si tu veux une firm plus installee et des regles plus lisibles, meme si la reduction exacte doit etre confirmee au checkout.',
    caveats: ['Reduction exacte a confirmer au checkout', 'Regles differentes selon programme', 'Lien affilie sans impact sur le score'],
    bestFor: ['SMC', 'swing', 'trader prudent', 'score fort'],
  },
  {
    slug: 'funderpro',
    label: 'Affiliation transparente',
    title: 'Code PropRadar a tester sur les challenges FunderPro',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    category: 'code',
    proofLevel: 'Affiliation PropRadar',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'Lien affilie FunderPro PropRadar',
    sourceNote: 'Lien affilie fourni pour PropRadar. Code PROPRADAR a tester au checkout.',
    consumerVerdict:
      'A comparer pour les traders qui veulent news, EA, swing option et rewards rapides. La fiche PropRadar reste partielle, donc checkout et FAQ doivent etre relus.',
    caveats: ['Reduction exacte a confirmer au checkout', 'Fiche universe encore a enrichir', 'Lien affilie sans impact sur le score'],
    bestFor: ['EA', 'news trading', 'swing', 'rewards rapides'],
  },
  {
    slug: 'fundednext',
    label: 'Promo a confirmer',
    title: 'Code NEW25 signale sur certains comptes CFD',
    code: 'NEW25',
    value: '25%',
    category: 'code',
    proofLevel: 'A confirmer au checkout',
    sourceUrl: 'https://fundednext.com/#pricing-area',
    sourceLabel: 'Page officielle FundedNext',
    sourceNote: 'Code signale comme piste promo, mais non confirme dans le HTML public consulte.',
    consumerVerdict:
      'Interessant seulement si tu voulais deja ce format de challenge. Ne pas monter de taille de compte juste pour utiliser le code.',
    caveats: ['Conditions exactes a confirmer au checkout', 'Offre limitee aux comptes eligibles', 'Regles payout a lire sur la source officielle'],
    bestFor: ['CFD', 'promo directe', 'budget'],
  },
  {
    slug: 'funderpro',
    label: 'Bon plan sans code',
    title: 'Instant Program annonce a partir de $79',
    code: 'Aucun code',
    value: '79$+',
    category: 'price-opportunity',
    proofLevel: 'Officiel',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'Site officiel FunderPro + lien affilie PropRadar',
    sourceNote: 'Site officiel consulte le 2026-07-02 : Instant Program starts from $79.00, news trading allowed.',
    consumerVerdict:
      'Bon plan potentiel si tu veux eviter une evaluation longue, mais le prix seul ne suffit pas : verifier objectif, payout et limites avant paiement.',
    caveats: ['Prix et conditions variables selon taille de compte', 'Instant funding a lire ligne par ligne', 'Lien affilie sans impact sur le score'],
    bestFor: ['instant funding', 'budget', 'news trading'],
  },
  {
    slug: 'the5ers',
    label: 'Bon plan sans code',
    title: 'Programmes affiches avec ticket d entree autour de $74',
    code: PROPRADAR_PROMO_CODE,
    value: '74$+',
    category: 'price-opportunity',
    proofLevel: 'Officiel',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'Site officiel The5ers + lien affilie PropRadar',
    sourceNote: 'Site officiel consulte le 2026-07-02 : one-time fee affiche a $74 sur un programme.',
    consumerVerdict:
      'Bon point d entree pour comparer The5ers sans se focaliser uniquement sur la reduction. Le vrai avantage reste la qualite des regles et la stabilite.',
    caveats: ['Prix variable selon devise, taille et programme', 'Code PROPRADAR a confirmer au checkout', 'Lien affilie sans impact sur le score'],
    bestFor: ['trader prudent', 'swing', 'petit ticket'],
  },
  {
    slug: 'ftmo',
    label: 'Lien transparent',
    title: 'Pas de code public confirme, lien affilie PropRadar',
    code: 'Aucun code',
    value: 'Lien',
    category: 'affiliate',
    proofLevel: 'Affiliation PropRadar',
    sourceUrl: FTMO_AFFILIATE_URL,
    sourceLabel: 'Lien affilie FTMO PropRadar',
    consumerVerdict:
      'A considerer pour la solidite et la clarte des regles, pas pour une reduction. Le lien est affilie mais le score reste independant.',
    caveats: ['Pas une promo de prix', 'Frais plus eleves que certaines alternatives', 'Restrictions news/regles a verifier'],
    bestFor: ['score fort', 'SMC', 'trader prudent'],
  },
  {
    slug: 'topstep',
    label: 'Bon plan futures',
    title: 'Reference futures a comparer meme sans code',
    code: 'Aucun code',
    value: 'Futures',
    category: 'futures',
    proofLevel: 'Bon plan sans code',
    sourceUrl: 'https://www.topstep.com/',
    sourceLabel: 'Site officiel Topstep',
    consumerVerdict:
      'Pas une promo de prix dans PropRadar, mais une option futures importante a comparer avec Apex, MyFundedFutures et Take Profit Trader.',
    caveats: ['Pas de code PropRadar connu', 'Lire consistency, payout caps et frais', 'Futures uniquement'],
    bestFor: ['futures', 'day trading', 'breakout'],
  },
  {
    slug: 'apex-trader-funding',
    label: 'Promo officielle futures',
    title: 'Jusqu a 90% OFF sur les evaluations',
    code: 'SAVENOW',
    value: '90%',
    category: 'futures',
    proofLevel: 'Officiel',
    sourceUrl: 'https://apextraderfunding.com/',
    sourceLabel: 'Site officiel Apex Trader Funding',
    sourceNote: 'Site officiel consulte le 2026-07-02 : Any Size Evals up to 90% OFF avec le code SAVENOW.',
    consumerVerdict:
      'Remise tres forte pour futures, mais PropRadar garde une lecture prudente : verifier EOD drawdown, consistency, payout rules et frais apres passage.',
    caveats: ['Offre limitee dans le temps', 'Firm classee a surveiller', 'Regles futures a relire avant paiement'],
    bestFor: ['futures', 'scalping', 'day trading', 'promo forte'],
  },
  {
    slug: 'take-profit-trader',
    label: 'Promo officielle futures',
    title: '40% off for life + pas d activation fee selon la page',
    code: 'NOFEE40',
    value: '40%',
    category: 'futures',
    proofLevel: 'Officiel',
    sourceUrl: 'https://takeprofittrader.com/',
    sourceLabel: 'Site officiel Take Profit Trader',
    sourceNote: 'Site officiel consulte le 2026-07-02 : Get 40% Off For Life + Never Pay An Activation Fee, code NOFEE40.',
    consumerVerdict:
      'Offre futures interessante pour les traders qui veulent un payout rapide, avec attention au buffer, aux frais PRO et aux conditions de retrait.',
    caveats: ['Conditions detaillees a ouvrir avant achat', 'Futures uniquement', 'Verifier si le code est encore actif au checkout'],
    bestFor: ['futures', 'day trading', 'payout rapide'],
  },
  {
    slug: 'myfundedfutures',
    label: 'Promo officielle futures',
    title: '50% sur Builder pour le premier compte',
    code: 'BUILDER',
    value: '50%',
    category: 'futures',
    proofLevel: 'Officiel',
    sourceUrl: 'https://myfundedfutures.com/',
    sourceLabel: 'Site officiel MyFundedFutures',
    sourceNote: 'Site officiel consulte le 2026-07-02 : 50% off Builder for your first account, code BUILDER.',
    consumerVerdict:
      'Bon plan futures recent pour petit ticket, a comparer avec Topstep, Apex et Take Profit Trader selon drawdown et regles de payout.',
    caveats: ['Offre annoncee comme mensuelle', 'Premier compte Builder seulement', 'Verifier plan Rapid/Builder/Pro avant achat'],
    bestFor: ['futures', 'budget', 'day trading'],
  },
];

function proofWeight(proofLevel: PromoProofLevel) {
  if (proofLevel === 'Officiel') return 28;
  if (proofLevel === 'Affiliation PropRadar') return 22;
  if (proofLevel === 'Bon plan sans code') return 12;
  return 8;
}

function valueWeight(value: string) {
  const numeric = Number(value.match(/\d+/)?.[0] ?? 0);
  if (numeric >= 40) return 28;
  if (numeric >= 25) return 20;
  if (numeric > 0) return 10;
  if (/code/i.test(value)) return 12;
  return 4;
}

export function promoDealScore(deal: PromoDeal, firm?: PropFirm) {
  const targetFirm = firm ?? getFirmBySlug(deal.slug);
  const firmScore = targetFirm ? Math.round(targetFirm.score * 0.32) : 12;
  const payoutPenalty = targetFirm ? Math.round(targetFirm.reviewSignals.payoutRiskScore * 0.18) : 8;
  const statusPenalty = targetFirm && /surveiller/i.test(targetFirm.status) ? 6 : 0;

  return Math.max(0, Math.min(100, proofWeight(deal.proofLevel) + valueWeight(deal.value) + firmScore - payoutPenalty - statusPenalty));
}

export function promoDealWithFirm(deal: PromoDeal) {
  const firm = getFirmBySlug(deal.slug);
  return {
    ...deal,
    dealScore: promoDealScore(deal, firm),
    firm: firm
      ? {
          slug: firm.slug,
          name: firm.name,
          score: firm.score,
          status: firm.status,
          priceFrom: firm.priceFrom,
          payoutRisk: firm.reviewSignals.payoutRisk,
          payoutRiskScore: firm.reviewSignals.payoutRiskScore,
          trustpilotReliability: firm.reviewSignals.trustpilotReliability,
          commercialRelationship: firm.commercialRelationship,
        }
      : null,
  };
}

export function getBestPromoDeals(limit = 12) {
  return promoDeals
    .map((deal) => promoDealWithFirm(deal))
    .sort((a, b) => b.dealScore - a.dealScore)
    .slice(0, limit);
}

export function getBudgetPromoShortlist(limit = 12) {
  return [...propFirms]
    .filter((firm) => !/ferm/i.test(firm.status) && firm.priceFrom > 0 && firm.priceFrom <= 100 && firm.reviewSignals.payoutRisk !== 'Critique')
    .sort((a, b) => {
      if (a.priceFrom !== b.priceFrom) return a.priceFrom - b.priceFrom;
      return b.score - a.score;
    })
    .slice(0, limit);
}

export function getFuturesPromoShortlist(limit = 8) {
  return [...propFirms]
    .filter((firm) => !/ferm/i.test(firm.status) && firm.styles.some((style) => /futures/i.test(style)))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export const promoFaq = [
  {
    question: 'Quel est le meilleur code promo prop firm ?',
    answer:
      'Le meilleur code est celui qui garde une firm acceptable cote regles et payout. Une reduction forte sur une firm risquee peut couter plus cher qu un challenge plein tarif chez une firm plus lisible.',
  },
  {
    question: 'Le code PROPRADAR change-t-il le score ?',
    answer:
      'Non. Les liens affilies et codes promo sont separes du scoring PropRadar. Une firm affiliee garde ses faiblesses, ses alertes payout et son niveau d audit affiches.',
  },
  {
    question: 'Faut-il choisir la prop firm la moins chere ?',
    answer:
      'Pas forcement. Le vrai cout depend du drawdown, de la consistency rule, du payout minimum, des frais apres passage funded et du risque de refus de retrait.',
  },
  {
    question: 'Pourquoi certaines offres sont marquees a confirmer ?',
    answer:
      'Parce que les codes prop firms changent vite. PropRadar prefere afficher le niveau de preuve plutot que vendre une reduction qui pourrait expirer au checkout.',
  },
];
