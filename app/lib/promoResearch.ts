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

export const PROMO_REVIEW_DATE = '2026-07-04';

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
    sourceLabel: 'Site officiel Blue Guardian + lien affilie PropRadar',
    sourceNote: 'Site officiel consulte le 2026-07-04 : Forex Discount SAVE 40% to 50% et Futures Discount SAVE 40% affiches comme offres limitees.',
    consumerVerdict:
      "Le bon plan le plus lisible pour tester Blue Guardian avec une remise forte. À garder commercialement en avant, mais avec lecture obligatoire des règles de payout.",
    caveats: ['Reduction exacte a confirmer au checkout', 'Score PropRadar prudent', 'Lien affilie sans impact sur le score'],
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
    title: 'Code PropRadar disponible au checkout',
    code: PROPRADAR_PROMO_CODE,
    value: 'Code',
    category: 'code',
    proofLevel: 'Affiliation PropRadar',
    sourceUrl: THE5ERS_AFFILIATE_URL,
    sourceLabel: 'Lien affilie The5ers PropRadar',
    sourceNote: 'Lien affilie fourni pour PropRadar. Site officiel consulte le 2026-07-04 : programmes affiches avec ticket a partir de $74 selon configuration.',
    consumerVerdict:
      'Bon plan prioritaire si tu veux une firm plus installee et des regles plus lisibles, meme si la reduction exacte doit etre confirmee au checkout.',
    caveats: ['Reduction exacte a confirmer au checkout', 'Regles differentes selon programme', 'Lien affilie sans impact sur le score'],
    bestFor: ['SMC', 'swing', 'trader prudent', 'score fort'],
    commercialHook: 'Moins tape-a-l oeil qu une remise geante, mais plus rassurant pour un trader qui veut payer pour des regles solides.',
    checkoutTip: 'Tester le code PROPRADAR au checkout et comparer Hyper Growth, High Stakes et Bootcamp.',
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
    sourceNote: 'Lien affilie fourni pour PropRadar. Site officiel consulte le 2026-07-04 : Instant Program, news trading allowed, rewards rapides.',
    consumerVerdict:
      'A comparer pour les traders qui veulent news, EA, swing option et rewards rapides. La fiche PropRadar reste partielle, donc checkout et FAQ doivent etre relus.',
    caveats: ['Reduction exacte a confirmer au checkout', 'Fiche universe encore a enrichir', 'Lien affilie sans impact sur le score'],
    bestFor: ['EA', 'news trading', 'swing', 'rewards rapides'],
    commercialHook: 'Un angle tres vendeur pour les profils news, EA et swing qui cherchent surtout de la souplesse.',
    checkoutTip: 'Verifier le programme choisi : Instant, 1-phase, Pro et Classic ne vendent pas la meme promesse.',
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
    sourceNote: 'Code signale comme piste promo, mais non confirme dans le HTML public consulte le 2026-07-04. La page officielle affiche surtout rewards, 24h et statistiques.',
    consumerVerdict:
      'Interessant seulement si tu voulais deja ce format de challenge. Ne pas monter de taille de compte juste pour utiliser le code.',
    caveats: ['Conditions exactes a confirmer au checkout', 'Offre limitee aux comptes eligibles', 'Regles payout a lire sur la source officielle'],
    bestFor: ['CFD', 'promo directe', 'budget'],
    commercialHook: 'A garder en bon plan secondaire tant que le code n est pas confirme publiquement.',
    checkoutTip: 'Entrer NEW25 uniquement si tu allais deja acheter FundedNext et verifier le total avant paiement.',
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
    sourceNote: 'Site officiel consulte le 2026-07-04 : Instant Program starts from $79.00, news trading allowed, first reward after only $100.',
    consumerVerdict:
      'Bon plan potentiel si tu veux eviter une evaluation longue, mais le prix seul ne suffit pas : verifier objectif, payout et limites avant paiement.',
    caveats: ['Prix et conditions variables selon taille de compte', 'Instant funding a lire ligne par ligne', 'Lien affilie sans impact sur le score'],
    bestFor: ['instant funding', 'budget', 'news trading'],
    commercialHook: 'L angle "je veux trader maintenant" est fort : ticket bas, pas d evaluation longue, rewards rapides.',
    urgency: 'Prix d appel visible sur le site officiel',
    checkoutTip: 'Regarder le drawdown, les limites et le payout minimum avant de choisir Instant.',
    featured: true,
    heroRank: 4,
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
    sourceNote: 'Site officiel consulte le 2026-07-04 : one-time fee affiche a $74 sur un programme, profit split up to 100% et time limit unlimited.',
    consumerVerdict:
      'Bon point d entree pour comparer The5ers sans se focaliser uniquement sur la reduction. Le vrai avantage reste la qualite des regles et la stabilite.',
    caveats: ['Prix variable selon devise, taille et programme', 'Code PROPRADAR a confirmer au checkout', 'Lien affilie sans impact sur le score'],
    bestFor: ['trader prudent', 'swing', 'petit ticket'],
    commercialHook: 'Un ticket d entree propre pour un nom plus etabli : moins "flash sale", plus valeur long terme.',
    checkoutTip: 'Comparer le ticket bas avec les objectifs, le stop out, le daily loss et le minimum profitable days.',
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
    sourceNote: 'Lien affilie PropRadar. Aucune remise publique confirmee dans PropRadar au 2026-07-04.',
    consumerVerdict:
      'A considerer pour la solidite et la clarte des regles, pas pour une reduction. Le lien est affilie mais le score reste independant.',
    caveats: ['Pas une promo de prix', 'Frais plus eleves que certaines alternatives', 'Restrictions news/regles a verifier'],
    bestFor: ['score fort', 'SMC', 'trader prudent'],
    commercialHook: 'Le choix rationnel quand tu veux surtout de la confiance, pas un gros pourcentage de remise.',
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
    sourceNote: 'Site officiel consulte le 2026-07-04 : $1.4B+ paid out, 7,000+ traders paid weekly, 15 years trusted by traders.',
    consumerVerdict:
      'Pas une promo de prix dans PropRadar, mais une option futures importante a comparer avec Apex, MyFundedFutures et Take Profit Trader.',
    caveats: ['Pas de code PropRadar connu', 'Lire consistency, payout caps et frais', 'Futures uniquement'],
    bestFor: ['futures', 'day trading', 'breakout'],
    commercialHook: 'Pas de code, mais un argument commercial tres fort : historique, communaute et volume de payouts.',
    checkoutTip: 'Comparer surtout les frais, le payout et les rules futures face a Apex et MyFundedFutures.',
  },
  {
    slug: 'apex-trader-funding',
    label: 'Mega deal futures officiel',
    title: 'SAVENOW : jusqu a 90% OFF sur Any Size Evals',
    code: 'SAVENOW',
    value: '90%',
    category: 'futures',
    proofLevel: 'Officiel',
    sourceUrl: 'https://apextraderfunding.com/',
    sourceLabel: 'Site officiel Apex Trader Funding',
    sourceNote: 'Site officiel consulte le 2026-07-04 : Any Size Evals up to 90% OFF avec le code SAVENOW et compte a rebours affiche.',
    consumerVerdict:
      'Remise tres forte pour futures, mais PropRadar garde une lecture prudente : verifier EOD drawdown, consistency, payout rules et frais apres passage.',
    caveats: ['Offre limitee dans le temps', 'Firm classee a surveiller', 'Regles futures a relire avant paiement'],
    bestFor: ['futures', 'scalping', 'day trading', 'promo forte'],
    commercialHook: 'Le deal le plus spectaculaire du moment cote futures : parfait pour attirer le clic, a encadrer par les risques.',
    urgency: 'Compte a rebours affiche sur le site officiel',
    checkoutTip: 'Verifier si le panier est new product ou legacy, puis controler recurring fees et PA fee.',
    featured: true,
    heroRank: 1,
  },
  {
    slug: 'take-profit-trader',
    label: 'Promo futures a revalider',
    title: 'NOFEE40 signale, mais page officielle en maintenance',
    code: 'NOFEE40',
    value: '40%',
    category: 'futures',
    proofLevel: 'A confirmer au checkout',
    sourceUrl: 'https://takeprofittrader.com/',
    sourceLabel: 'Site officiel Take Profit Trader',
    sourceNote: 'Page officielle consultee le 2026-07-04 : site sous maintenance. Le code NOFEE40 doit etre revalide avant mise en avant commerciale.',
    consumerVerdict:
      'Offre futures interessante pour les traders qui veulent un payout rapide, avec attention au buffer, aux frais PRO et aux conditions de retrait.',
    caveats: ['Page officielle en maintenance lors de la revue', 'Futures uniquement', 'Verifier si le code est encore actif au checkout'],
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
      'Bon plan futures recent pour petit ticket, a comparer avec Topstep, Apex et Take Profit Trader selon drawdown et regles de payout.',
    caveats: ['Offre annoncee comme mensuelle', 'Premier compte Builder seulement', 'Verifier plan Rapid/Builder/Pro avant achat'],
    bestFor: ['futures', 'budget', 'day trading'],
    commercialHook: 'Tres bon angle pour un trader futures qui veut tester a moindre cout sans partir sur le deal le plus agressif du marche.',
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
