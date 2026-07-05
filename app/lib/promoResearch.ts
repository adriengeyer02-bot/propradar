import {
  BLUE_GUARDIAN_AFFILIATE_URL,
  FTMO_AFFILIATE_URL,
  FUNDERPRO_AFFILIATE_URL,
  GOAT_FUNDED_TRADER_AFFILIATE_URL,
  PROPRADAR_PROMO_CODE,
  THE5ERS_AFFILIATE_URL,
  THE5ERS_PROMO_CODE,
  getFirmBySlug,
  propFirms,
  type PropFirm,
} from './propFirms';

export const PROMO_REVIEW_DATE = '2026-07-05';

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
  commercialHook?: string;
  urgency?: string;
  checkoutTip?: string;
  featured?: boolean;
  heroRank?: number;
};

export const promoDeals: PromoDeal[] = [
  {
    slug: 'blue-guardian',
    label: 'Mega deal officiel + affiliation',
    title: 'Forex SAVE 40-50% + futures SAVE 40%',
    code: PROPRADAR_PROMO_CODE,
    value: '40-50%',
    category: 'official-discount',
    proofLevel: 'Officiel',
    sourceUrl: BLUE_GUARDIAN_AFFILIATE_URL,
    sourceLabel: 'Site officiel Blue Guardian + lien affilié PropRadar',
    sourceNote: 'Lien Blue Guardian PropRadar : https://blueguardian.com/?afmc=PROPRADAR. Code PROPRADAR à vérifier au checkout. Site officiel consulté le 2026-07-04 : Forex Discount SAVE 40% to 50% et Futures Discount SAVE 40% affichés comme offres limitées.',
    consumerVerdict:
      "Le bon plan le plus lisible pour tester Blue Guardian avec une remise forte. À garder commercialement en avant, mais avec lecture obligatoire des règles de payout.",
    caveats: ['Réduction exacte à confirmer au checkout', 'Score PropRadar prudent', 'Lien affilié sans impact sur le score'],
    bestFor: ['promo forte', 'instant funding', 'forex', 'futures'],
    commercialHook: 'Une remise visible, simple à comprendre et assez forte pour déclencher un achat raisonné.',
    urgency: 'Limited time only affiche sur la page officielle',
    checkoutTip: 'Comparer Forex, Futures et Instant avant de payer : la réduction exacte dépend du panier.',
    featured: true,
    heroRank: 2,
  },
  {
    slug: 'the5ers',
    label: 'Affiliation transparente',
    title: 'Coupon The5ers PropRadar disponible au checkout',
    code: THE5ERS_PROMO_CODE,
    value: 'Code',
    category: 'code',
    proofLevel: 'Affiliation PropRadar',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'Lien affilié The5ers PropRadar',
    sourceNote: 'Lien affilié The5ers fourni pour PropRadar. Coupon 1EIJ6PO à tester au checkout. Site officiel consulté le 2026-07-04 : programmes affichés avec ticket à partir de $74 selon configuration.',
    consumerVerdict:
      'Bon plan prioritaire si tu veux une firm plus installée et des règles plus lisibles, même si la réduction exacte doit être confirmée au checkout.',
    caveats: ['Réduction exacte à confirmer au checkout', 'Règles différentes selon programme', 'Lien affilié sans impact sur le score'],
    bestFor: ['SMC', 'swing', 'trader prudent', 'score fort'],
    commercialHook: "Moins tape-à-l'oeil qu'une remise géante, mais plus rassurant pour un trader qui veut payer pour des règles solides.",
    checkoutTip: 'Tester le coupon 1EIJ6PO au checkout et comparer Hyper Growth, High Stakes et Bootcamp.',
  },
  {
    slug: 'funderpro',
    label: 'Affiliation transparente',
    title: 'Code PropRadar à tester sur les challenges FunderPro',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    category: 'code',
    proofLevel: 'Affiliation PropRadar',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'Lien affilié FunderPro PropRadar',
    sourceNote: 'Lien affilié fourni pour PropRadar. Site officiel consulté le 2026-07-04 : Instant Program, news trading allowed, rewards rapides.',
    consumerVerdict:
      'À comparer pour les traders qui veulent news, EA, swing option et rewards rapides. La fiche PropRadar reste partielle, donc checkout et FAQ doivent être relus.',
    caveats: ['Réduction exacte à confirmer au checkout', 'Fiche universe encore à enrichir', 'Lien affilié sans impact sur le score'],
    bestFor: ['EA', 'news trading', 'swing', 'rewards rapides'],
    commercialHook: 'Un angle très vendeur pour les profils news, EA et swing qui cherchent surtout de la souplesse.',
    checkoutTip: 'Vérifier le programme choisi : Instant, 1-phase, Pro et Classic ne vendent pas la même promesse.',
  },
  {
    slug: 'goat-funded-trader',
    label: 'Affiliation transparente',
    title: 'Code GOAT Funded Trader PropRadar à tester au checkout',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    category: 'code',
    proofLevel: 'Affiliation PropRadar',
    sourceUrl: GOAT_FUNDED_TRADER_AFFILIATE_URL,
    sourceLabel: 'Lien inscription GOAT Funded Trader PropRadar',
    sourceNote:
      'Lien inscription fourni pour PropRadar. Site officiel consulté le 2026-07-05 : modèles 1 step, 2 step, 3 step et Instant, MT5 disponible, news trading, weekend holding, 100% profit split disponible et offres publiques FIRSTGFT / BOGO visibles selon période.',
    consumerVerdict:
      "Bon plan commercial à regarder si tu veux une prop firm très orientée promos, news trading et weekend holding. Le code PROPRADAR doit être testé au checkout et ne doit pas remplacer la lecture des règles.",
    caveats: ['Code à confirmer au checkout', 'Règles variables selon modèle', 'Lien affilié sans impact sur le score'],
    bestFor: ['news trading', 'weekend holding', 'promo', 'instant funding'],
    commercialHook: 'Un angle vendeur clair : code PropRadar, inscription directe, modèles flexibles et forte promesse de payout.',
    urgency: 'Offres publiques limitées affichées sur le site officiel',
    checkoutTip: 'Comparer 1 step, 2 step, 3 step et Instant avant de payer, puis vérifier le total avec le code PROPRADAR.',
    featured: true,
    heroRank: 5,
  },
  {
    slug: 'fundednext',
    label: 'Promo à confirmer',
    title: 'Code NEW25 signale sur certains comptes CFD',
    code: 'NEW25',
    value: '25%',
    category: 'code',
    proofLevel: 'A confirmer au checkout',
    sourceUrl: 'https://fundednext.com/#pricing-area',
    sourceLabel: 'Page officielle FundedNext',
    sourceNote: 'Code signale comme piste promo, mais non confirme dans le HTML public consulte le 2026-07-04. La page officielle affiche surtout rewards, 24h et statistiques.',
    consumerVerdict:
      'Intéressant seulement si tu voulais déjà ce format de challenge. Ne pas monter de taille de compte juste pour utiliser le code.',
    caveats: ['Conditions exactes à confirmer au checkout', 'Offre limitée aux comptes éligibles', 'Règles payout à lire sur la source officielle'],
    bestFor: ['CFD', 'promo directe', 'budget'],
    commercialHook: 'A garder en bon plan secondaire tant que le code n est pas confirme publiquement.',
    checkoutTip: 'Entrer NEW25 uniquement si tu allais déjà acheter FundedNext et vérifier le total avant paiement.',
  },
  {
    slug: 'funderpro',
    label: 'Bon plan sans code',
    title: 'Instant Program annoncé à partir de $79',
    code: 'Aucun code',
    value: '79$+',
    category: 'price-opportunity',
    proofLevel: 'Officiel',
    sourceUrl: FUNDERPRO_AFFILIATE_URL,
    sourceLabel: 'Site officiel FunderPro + lien affilié PropRadar',
    sourceNote: 'Site officiel consulte le 2026-07-04 : Instant Program starts from $79.00, news trading allowed, first reward after only $100.',
    consumerVerdict:
      'Bon plan potentiel si tu veux éviter une évaluation longue, mais le prix seul ne suffit pas : vérifier objectif, payout et limites avant paiement.',
    caveats: ['Prix et conditions variables selon taille de compte', 'Instant funding à lire ligne par ligne', 'Lien affilié sans impact sur le score'],
    bestFor: ['instant funding', 'budget', 'news trading'],
    commercialHook: 'L’angle "je veux trader maintenant" est fort : ticket bas, pas d’évaluation longue, rewards rapides.',
    urgency: 'Prix d appel visible sur le site officiel',
    checkoutTip: 'Regarder le drawdown, les limites et le payout minimum avant de choisir Instant.',
    featured: true,
    heroRank: 4,
  },
  {
    slug: 'the5ers',
    label: 'Bon plan sans code',
    title: "Programmes affichés avec ticket d'entrée autour de $74",
    code: THE5ERS_PROMO_CODE,
    value: '74$+',
    category: 'price-opportunity',
    proofLevel: 'Officiel',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'Site officiel The5ers + lien affilié PropRadar',
    sourceNote: 'Site officiel consulte le 2026-07-04 : one-time fee affiche a $74 sur un programme, profit split up to 100% et time limit unlimited.',
    consumerVerdict:
      "Bon point d'entrée pour comparer The5ers sans se focaliser uniquement sur la réduction. Le vrai avantage reste la qualité des règles et la stabilité.",
    caveats: ['Prix variable selon devise, taille et programme', 'Coupon 1EIJ6PO à confirmer au checkout', 'Lien affilié sans impact sur le score'],
    bestFor: ['trader prudent', 'swing', 'petit ticket'],
    commercialHook: "Un ticket d'entrée propre pour un nom plus établi : moins \"flash sale\", plus valeur long terme.",
    checkoutTip: 'Comparer le ticket bas avec les objectifs, le stop out, le daily loss et le minimum profitable days.',
  },
  {
    slug: 'ftmo',
    label: 'Lien transparent',
    title: 'Pas de code public confirmé, lien affilié PropRadar',
    code: 'Aucun code',
    value: 'Lien',
    category: 'affiliate',
    proofLevel: 'Affiliation PropRadar',
    sourceUrl: FTMO_AFFILIATE_URL,
    sourceLabel: 'Lien affilié FTMO PropRadar',
    sourceNote: 'Lien affilié PropRadar. Aucune remise publique confirmée dans PropRadar au 2026-07-04.',
    consumerVerdict:
      'À considérer pour la solidité et la clarté des règles, pas pour une réduction. Le lien est affilié mais le score reste indépendant.',
    caveats: ['Pas une promo de prix', 'Frais plus élevés que certaines alternatives', 'Restrictions news/règles à vérifier'],
    bestFor: ['score fort', 'SMC', 'trader prudent'],
    commercialHook: 'Le choix rationnel quand tu veux surtout de la confiance, pas un gros pourcentage de remise.',
  },
  {
    slug: 'topstep',
    label: 'Bon plan futures',
    title: 'Référence futures à comparer même sans code',
    code: 'Aucun code',
    value: 'Futures',
    category: 'futures',
    proofLevel: 'Bon plan sans code',
    sourceUrl: 'https://www.topstep.com/',
    sourceLabel: 'Site officiel Topstep',
    sourceNote: 'Site officiel consulte le 2026-07-04 : $1.4B+ paid out, 7,000+ traders paid weekly, 15 years trusted by traders.',
    consumerVerdict:
      'Pas une promo de prix dans PropRadar, mais une option futures importante à comparer avec Apex, MyFundedFutures et Take Profit Trader.',
    caveats: ['Pas de code PropRadar connu', 'Lire consistency, payout caps et frais', 'Futures uniquement'],
    bestFor: ['futures', 'day trading', 'breakout'],
    commercialHook: 'Pas de code, mais un argument commercial très fort : historique, communauté et volume de payouts.',
    checkoutTip: 'Comparer surtout les frais, le payout et les rules futures face à Apex et MyFundedFutures.',
  },
  {
    slug: 'apex-trader-funding',
    label: 'Mega deal futures officiel',
    title: "SAVENOW : jusqu'à 90% OFF sur Any Size Evals",
    code: 'SAVENOW',
    value: '90%',
    category: 'futures',
    proofLevel: 'Officiel',
    sourceUrl: 'https://apextraderfunding.com/',
    sourceLabel: 'Site officiel Apex Trader Funding',
    sourceNote: 'Site officiel consulte le 2026-07-04 : Any Size Evals up to 90% OFF avec le code SAVENOW et compte a rebours affiche.',
    consumerVerdict:
      'Remise très forte pour futures, mais PropRadar garde une lecture prudente : vérifier EOD drawdown, consistency, payout rules et frais après passage.',
    caveats: ['Offre limitée dans le temps', 'Firm classée à surveiller', 'Règles futures à relire avant paiement'],
    bestFor: ['futures', 'scalping', 'day trading', 'promo forte'],
    commercialHook: 'Le deal le plus spectaculaire du moment côté futures : parfait pour attirer le clic, à encadrer par les risques.',
    urgency: 'Compte à rebours affiché sur le site officiel',
    checkoutTip: 'Vérifier si le panier est new product ou legacy, puis contrôler recurring fees et PA fee.',
    featured: true,
    heroRank: 1,
  },
  {
    slug: 'take-profit-trader',
    label: 'Promo futures à revalider',
    title: 'NOFEE40 signale, mais page officielle en maintenance',
    code: 'NOFEE40',
    value: '40%',
    category: 'futures',
    proofLevel: 'A confirmer au checkout',
    sourceUrl: 'https://takeprofittrader.com/',
    sourceLabel: 'Site officiel Take Profit Trader',
    sourceNote: 'Page officielle consultée le 2026-07-04 : site sous maintenance. Le code NOFEE40 doit être revalidé avant mise en avant commerciale.',
    consumerVerdict:
      'Offre futures interessante pour les traders qui veulent un payout rapide, avec attention au buffer, aux frais PRO et aux conditions de retrait.',
    caveats: ['Page officielle en maintenance lors de la revue', 'Futures uniquement', 'Vérifier si le code est encore actif au checkout'],
    bestFor: ['futures', 'day trading', 'payout rapide'],
    commercialHook: 'A garder en backup, pas en hero, tant que la source officielle ne confirme pas clairement le deal.',
    checkoutTip: 'Ne pas annoncer le code comme garanti tant que la page officielle ne revient pas en ligne.',
  },
  {
    slug: 'myfundedfutures',
    label: 'Mega deal futures officiel',
    title: '50% sur Builder pour le premier compte',
    code: 'BUILDER',
    value: '50%',
    category: 'futures',
    proofLevel: 'Officiel',
    sourceUrl: 'https://myfundedfutures.com/',
    sourceLabel: 'Site officiel MyFundedFutures',
    sourceNote: 'Site officiel consulte le 2026-07-04 : this month only, 50% off Builder for your first account, code BUILDER.',
    consumerVerdict:
      'Bon plan futures récent pour petit ticket, à comparer avec Topstep, Apex et Take Profit Trader selon drawdown et règles de payout.',
    caveats: ['Offre annoncée comme mensuelle', 'Premier compte Builder seulement', 'Vérifier plan Rapid/Builder/Pro avant achat'],
    bestFor: ['futures', 'budget', 'day trading'],
    commercialHook: 'Très bon angle pour un trader futures qui veut tester à moindre coût sans partir sur le deal le plus agressif du marché.',
    urgency: 'This month only affiche sur le site officiel',
    checkoutTip: 'Confirmer que le panier concerne bien Builder et le premier compte avant paiement.',
    featured: true,
    heroRank: 3,
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
  const featuredBoost = deal.featured ? 6 : 0;

  return Math.max(0, Math.min(100, proofWeight(deal.proofLevel) + valueWeight(deal.value) + firmScore + featuredBoost - payoutPenalty - statusPenalty));
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

export function getMegaPromoDeals(limit = 4) {
  return promoDeals
    .filter((deal) => deal.featured)
    .map((deal) => promoDealWithFirm(deal))
    .sort((a, b) => (a.heroRank ?? 99) - (b.heroRank ?? 99) || b.dealScore - a.dealScore)
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
      "Le meilleur code est celui qui garde une firm acceptable côté règles et payout. Une réduction forte sur une firm risquée peut coûter plus cher qu'un challenge plein tarif chez une firm plus lisible.",
  },
  {
    question: 'Un code promo PropRadar change-t-il le score ?',
    answer:
      "Non. Les liens affiliés et codes promo sont séparés du scoring PropRadar. Une firm affiliée garde ses faiblesses, ses alertes payout et son niveau d'audit affichés.",
  },
  {
    question: 'Faut-il choisir la prop firm la moins chere ?',
    answer:
      'Pas forcément. Le vrai coût dépend du drawdown, de la consistency rule, du payout minimum, des frais après passage funded et du risque de refus de retrait.',
  },
  {
    question: 'Pourquoi certaines offres sont marquées à confirmer ?',
    answer:
      'Parce que les codes prop firms changent vite. PropRadar préfère afficher le niveau de preuve plutôt que vendre une réduction qui pourrait expirer au checkout.',
  },
];
