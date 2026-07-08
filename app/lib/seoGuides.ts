import { toEnglishText } from './i18n';
import { propFirms, topFirms, type PropFirm } from './propFirms';

export const SEO_RESEARCH_DATE = '2026-07-08';

export type SearchIntent =
  | 'choisir'
  | 'comparer'
  | 'regles'
  | 'risque'
  | 'style'
  | 'promo';

export type SearchCluster = {
  label: string;
  intent: SearchIntent;
  queries: string[];
  pageSlug: string;
  priority: number;
};

export type SeoGuide = {
  slug: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intent: SearchIntent;
  demandSignal: string;
  answer: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  checks: string[];
  faq: { question: string; answer: string }[];
  internalLinks: { label: string; href: string }[];
  focusFirmSlugs?: string[];
};

export const searchClusters: SearchCluster[] = [
  {
    label: 'Best prop firm',
    intent: 'choisir',
    queries: ['best prop firm', 'most reliable prop firm', 'prop firm ranking', 'prop firm reviews'],
    pageSlug: 'meilleure-prop-firm-2026',
    priority: 0.96,
  },
  {
    label: 'Futures funding',
    intent: 'choisir',
    queries: ['best futures prop firm', 'futures prop firm', 'Topstep vs Apex', 'prop firm futures payout'],
    pageSlug: 'meilleure-prop-firm-futures',
    priority: 0.94,
  },
  {
    label: 'Rules and constraints',
    intent: 'regles',
    queries: ['prop firm without consistency rule', 'prop firm no consistency', 'trailing drawdown prop firm', 'prop firm consistency rules'],
    pageSlug: 'prop-firm-sans-consistency-rule',
    priority: 0.92,
  },
  {
    label: 'News trading',
    intent: 'style',
    queries: ['prop firm news trading allowed', 'prop firm news trading', 'can you trade news with a prop firm'],
    pageSlug: 'prop-firm-news-trading',
    priority: 0.9,
  },
  {
    label: 'Payout',
    intent: 'risque',
    queries: ['fast payout prop firm', 'prop firm payout proof', 'fast withdrawal prop firm', 'prop firm payout problem'],
    pageSlug: 'prop-firm-payout-rapide',
    priority: 0.9,
  },
  {
    label: 'Budget',
    intent: 'promo',
    queries: ['cheap prop firm', 'low-cost prop firm', 'prop firm discount code', 'prop firm promo code'],
    pageSlug: 'prop-firm-pas-cher',
    priority: 0.88,
  },
  {
    label: 'SMC / ICT',
    intent: 'style',
    queries: ['prop firm SMC', 'prop firm ICT trader', 'best prop firm for SMC day trading'],
    pageSlug: 'prop-firm-smc-ict',
    priority: 0.86,
  },
  {
    label: 'Swing trading',
    intent: 'style',
    queries: ['prop firm swing trading', 'prop firm hold overnight', 'prop firm hold weekend'],
    pageSlug: 'prop-firm-swing-trading',
    priority: 0.86,
  },
  {
    label: 'EA / Algo',
    intent: 'style',
    queries: ['prop firm EA allowed', 'prop firm algo trading', 'prop firm bot allowed'],
    pageSlug: 'prop-firm-ea-algo',
    priority: 0.84,
  },
  {
    label: 'FTMO vs The5ers',
    intent: 'comparer',
    queries: ['FTMO vs The5ers', 'FTMO or The5ers', 'The5ers vs FTMO review', 'best forex prop firm'],
    pageSlug: 'ftmo-vs-the5ers',
    priority: 0.82,
  },
  {
    label: 'Topstep vs Apex',
    intent: 'comparer',
    queries: ['Topstep vs Apex', 'Apex vs Topstep', 'best futures prop firm', 'Apex Trader Funding promo'],
    pageSlug: 'topstep-vs-apex',
    priority: 0.82,
  },
  {
    label: 'FunderPro vs The5ers',
    intent: 'comparer',
    queries: ['FunderPro vs The5ers', 'FunderPro review', 'The5ers discount code', 'prop firm EA news trading'],
    pageSlug: 'funderpro-vs-the5ers',
    priority: 0.8,
  },
  {
    label: 'Leveraged reviews',
    intent: 'risque',
    queries: ['Leveraged prop firm review', 'Get Leveraged review', 'getleveraged.com Trustpilot', 'Leveraged payout'],
    pageSlug: 'leveraged-prop-firm-avis',
    priority: 0.79,
  },
  {
    label: 'Reliability / scam',
    intent: 'risque',
    queries: ['reliable prop firm', 'prop firm scam', 'prop firm Trustpilot', 'prop firm reviews'],
    pageSlug: 'prop-firm-fiable-trustpilot',
    priority: 0.89,
  },
  {
    label: 'GOAT Funded Trader review',
    intent: 'risque',
    queries: ['Goat Funded Trader review', 'GFT prop firm review', 'Goat Funded Trader discount code', 'Goat Funded Trader payout'],
    pageSlug: 'goat-funded-trader-avis',
    priority: 0.88,
  },
  {
    label: 'Instant funding',
    intent: 'choisir',
    queries: ['prop firm instant funding', 'instant funding prop firm', 'no challenge prop firm', 'instant funded account'],
    pageSlug: 'prop-firm-instant-funding',
    priority: 0.87,
  },
  {
    label: 'No challenge',
    intent: 'choisir',
    queries: ['no challenge prop firm', 'prop firm without evaluation', 'instant funded account', 'direct funded account'],
    pageSlug: 'prop-firm-sans-challenge',
    priority: 0.85,
  },
  {
    label: 'Beginner',
    intent: 'choisir',
    queries: ['prop firm for beginners', 'best prop firm for beginners', 'easy prop firm', 'first prop firm challenge'],
    pageSlug: 'prop-firm-pour-debutant',
    priority: 0.84,
  },
  {
    label: 'Forex',
    intent: 'choisir',
    queries: ['best forex prop firm', 'forex prop firm', 'prop firm MT5', 'prop firm cTrader'],
    pageSlug: 'meilleure-prop-firm-forex',
    priority: 0.83,
  },
  {
    label: 'Alternatives FTMO',
    intent: 'comparer',
    queries: ['FTMO alternatives', 'FTMO alternative', 'prop firm like FTMO', 'FTMO vs Funding Pips'],
    pageSlug: 'alternatives-ftmo',
    priority: 0.82,
  },
  {
    label: 'Reddit and Trustpilot reviews',
    intent: 'risque',
    queries: ['prop firm Reddit reviews', 'prop firm Trustpilot reviews', 'prop firm scam reddit', 'prop firm reviews'],
    pageSlug: 'prop-firm-avis-reddit-trustpilot',
    priority: 0.81,
  },
  {
    label: 'Payout proof',
    intent: 'risque',
    queries: ['prop firm payout proof', 'prop firm that actually pays', 'prop firm payout problem', 'prop firm payout evidence'],
    pageSlug: 'prop-firm-payout-proof',
    priority: 0.8,
  },
  {
    label: 'Legal check',
    intent: 'risque',
    queries: ['prop firm legal check', 'prop firm regulation', 'is my prop firm regulated', 'prop firm legal entity'],
    pageSlug: 'prop-firm-legal-check',
    priority: 0.84,
  },
];

export const seoGuides: SeoGuide[] = [
  {
    slug: 'meilleure-prop-firm-2026',
    title: 'Best prop firm 2026: a risk-first ranking',
    metaDescription:
      'Compare the best prop firms by score, payout reliability, price, filtered Trustpilot signal, Reddit feedback, rules, platforms and pre-purchase risk points.',
    eyebrow: 'Main SEO guide',
    h1: 'Best prop firm: the ranking starts with risk, not marketing',
    intent: 'choisir',
    demandSignal: 'Broad and competitive search: traders want a quick answer first, then proof and risk context.',
    answer:
      'The best prop firm is not always the one showing the biggest split or discount. A useful choice combines readable rules, credible payouts, reasonable total cost, the right platform and enough operating history.',
    primaryKeywords: ['best prop firm', 'most reliable prop firm', 'prop firm ranking'],
    secondaryKeywords: ['prop firm reviews', 'prop firm payout', 'prop firm Trustpilot', 'prop firm comparison'],
    checks: [
      'Check the PropRadar score and payout risk before looking at price.',
      'Compare drawdown, profit targets and minimum trading days.',
      'Read the official sources saved on each firm profile.',
      'Separate Trustpilot reviews from Reddit feedback and payout incidents.',
    ],
    faq: [
      {
        question: 'What is the best prop firm to start with?',
        answer:
          'Start with a firm that has readable rules, reasonable pricing, lower payout risk and a stable public track record. The right choice also depends on your market and trading style.',
      },
      {
        question: 'Is a prop firm with a big discount better?',
        answer:
          'No. A discount lowers the entry cost, but it does not compensate for dangerous withdrawal rules, unclear drawdown or high payout risk.',
      },
    ],
    internalLinks: [
      { label: 'Full comparator', href: '/comparateur' },
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Current deals', href: '/promos' },
    ],
    focusFirmSlugs: ['ftmo', 'the5ers', 'topstep', 'fundednext', 'audacity-capital'],
  },
  {
    slug: 'meilleure-prop-firm-futures',
    title: 'Meilleure prop firm futures : Topstep, Apex, TPT et alternatives',
    metaDescription:
      'Guide PropRadar des prop firms futures : Topstep, Apex, Take Profit Trader, MyFundedFutures, drawdown, payout et frais.',
    eyebrow: 'Futures funding',
    h1: 'Meilleure prop firm futures : comparer payout, drawdown et frais cachés',
    intent: 'choisir',
    demandSignal: 'Les recherches futures mélangent souvent Topstep, Apex, payout, drawdown et codes promo.',
    answer:
      'En futures, le meilleur choix dépend surtout du drawdown, des frais après passage funded, des caps de retrait et de la stabilité de la plateforme.',
    primaryKeywords: ['meilleure prop firm futures', 'futures prop firm', 'Topstep vs Apex'],
    secondaryKeywords: ['Apex Trader Funding', 'Take Profit Trader', 'MyFundedFutures', 'futures payout'],
    checks: [
      'Identifier EOD drawdown, trailing drawdown ou buffer.',
      'Comparer les frais de compte funded et les frais récurrents.',
      'Vérifier les caps de payout et le nombre de jours entre retraits.',
      'Se méfier des réductions très fortes si les règles sont mouvantes.',
    ],
    faq: [
      {
        question: 'Topstep ou Apex : lequel regarder en premier ?',
        answer:
          'Topstep peut être plus lisible pour beaucoup de traders, Apex peut être attractif en promo. Le choix doit se faire sur les règles actuelles, pas seulement sur le prix.',
      },
      {
        question: 'Les prop firms futures sont-elles adaptées au scalping ?',
        answer:
          'Oui pour certains profils, mais il faut vérifier plateformes, flux data, drawdown intraday et conditions de payout.',
      },
    ],
    internalLinks: [
      { label: 'Outil par style de trading', href: '/outils' },
      { label: 'Promos futures', href: '/promos' },
      { label: 'Règles à vérifier', href: '/regles' },
    ],
  },
  {
    slug: 'prop-firm-sans-consistency-rule',
    title: 'Prop firm sans consistency rule : quoi vérifier',
    metaDescription:
      'Trouver une prop firm sans consistency rule ou avec règle souple : payout, drawdown, objectifs, news et conditions cachées.',
    eyebrow: 'Rules search',
    h1: 'Prop firm sans consistency rule : le vrai risque se cache souvent ailleurs',
    intent: 'regles',
    demandSignal: 'Recherche très transactionnelle : le trader veut éviter une règle qui bloque le payout.',
    answer:
      'Une absence de consistency rule peut être un avantage, mais elle doit être comparée au drawdown, au payout minimum, aux restrictions de news et aux frais funded.',
    primaryKeywords: ['prop firm sans consistency rule', 'prop firm no consistency', 'sans règle de cohérence'],
    secondaryKeywords: ['payout minimum', 'trailing drawdown', 'drawdown static', 'règles prop firm'],
    checks: [
      'Chercher si chaque produit a une consistency rule, pas seulement la page marketing.',
      'Vérifier si le payout a un montant minimum ou un nombre de jours imposé.',
      "Comparer la règle de drawdown : trailing peut être plus dur qu'une consistency rule.",
      'Relire les restrictions news, rollover, copy trading et EA.',
    ],
    faq: [
      {
        question: 'Une prop firm sans consistency rule est-elle toujours meilleure ?',
        answer:
          'Pas toujours. Certaines compensent par un drawdown plus strict, des frais plus élevés ou des conditions de retrait plus dures.',
      },
      {
        question: 'Comment PropRadar repère les règles de consistency ?',
        answer:
          'Il faut lire le programme exact, pas seulement la page marketing. Certaines firms changent les règles selon le type de compte, le statut challenge/funded ou la taille choisie.',
      },
    ],
    internalLinks: [
      { label: 'Page règles', href: '/regles' },
      { label: 'Comparateur', href: '/comparateur' },
      { label: 'Risques payout', href: '/risques-payout' },
    ],
  },
  {
    slug: 'prop-firm-news-trading',
    title: 'Prop firm news trading allowed : liste et risques',
    metaDescription:
      'Quelles prop firms acceptent le news trading ? Guide PropRadar : restrictions, spreads, slippage, payout et règles à relire.',
    eyebrow: 'News trading',
    h1: 'Prop firm et news trading : autorisé ne veut pas dire sans risque',
    intent: 'style',
    demandSignal: 'Les traders cherchent souvent une firm compatible NFP, CPI, FOMC ou annonces macro.',
    answer:
      "Pour trader les news en prop firm, il faut vérifier l'autorisation explicite, le slippage, les plateformes, le drawdown journalier et les exclusions de payout.",
    primaryKeywords: ['prop firm news trading allowed', 'prop firm trading news', 'news trading prop firm'],
    secondaryKeywords: ['NFP prop firm', 'CPI trading challenge', 'FOMC prop firm', 'slippage prop firm'],
    checks: [
      'Vérifier si les news sont autorisées en challenge et en funded.',
      'Regarder les restrictions autour des annonces rouges.',
      'Évaluer le drawdown journalier avant de trader un spike.',
      'Lire les conditions de payout liées aux trades autour des news.',
    ],
    faq: [
      {
        question: 'Peut-on trader le NFP en prop firm ?',
        answer:
          "Parfois oui, parfois non. Certaines firms autorisent les news, d'autres les restreignent en funded ou autour des annonces majeures.",
      },
      {
        question: 'Quel est le risque principal du news trading en prop firm ?',
        answer:
          'Le risque principal est de violer une règle de timing, de drawdown ou de payout même si le trade est profitable.',
      },
    ],
    internalLinks: [
      { label: 'Outil style trading', href: '/outils' },
      { label: 'Règles officielles', href: '/regles' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  {
    slug: 'prop-firm-payout-rapide',
    title: 'Prop firm payout rapide : retraits, preuves et pièges',
    metaDescription:
      'Guide des prop firms avec payout rapide : délai, preuves de retrait, risque payout, caps et conditions avant de payer un challenge.',
    eyebrow: 'Payout search',
    h1: 'Prop firm payout rapide : regarder les preuves, pas seulement la promesse',
    intent: 'risque',
    demandSignal: "Les requêtes payout captent les traders proches de l'achat ou déjà inquiets des retraits.",
    answer:
      "Un payout rapide est utile seulement si les conditions sont claires : montant minimum, jours de trading, caps, split, reviews et historique d'incidents.",
    primaryKeywords: ['prop firm payout rapide', 'prop firm payout proof', 'retrait prop firm'],
    secondaryKeywords: ['payout 24h prop firm', 'payout problem', 'payout denial', 'preuve de retrait'],
    checks: [
      'Comparer délai annoncé et signaux communautaires.',
      'Vérifier le montant minimum de retrait et les caps.',
      'Lire les incidents payout et les plaintes récurrentes.',
      'Ne pas confondre certificat marketing et preuve indépendante.',
    ],
    faq: [
      {
        question: 'Un payout en 24h est-il fiable ?',
        answer:
          "Il peut l'être, mais il faut vérifier les conditions et l'historique. Le délai annoncé ne suffit pas à mesurer le risque.",
      },
      {
        question: 'Pourquoi le risque payout compte-t-il autant ?',
        answer:
          "Parce qu'une prop firm rentable sur le papier devient inutile si les retraits sont difficiles, retardés ou contestés.",
      },
    ],
    internalLinks: [
      { label: 'Risques payout', href: '/risques-payout' },
      { label: 'Audit sources', href: '/audit' },
      { label: 'Trustpilot filtré', href: '/trustpilot-prop-firms' },
    ],
  },
  {
    slug: 'prop-firm-pas-cher',
    title: 'Prop firm pas cher : codes promo et coût réel',
    metaDescription:
      'Trouver une prop firm pas cher sans ignorer le risque : prix minimum, codes promo, payout, drawdown et frais après passage funded.',
    eyebrow: 'Budget et promo',
    h1: "Prop firm pas cher : le prix du challenge n'est pas le coût total",
    intent: 'promo',
    demandSignal: 'Les recherches budget convertissent bien, mais attirent aussi les achats impulsifs.',
    answer:
      'Une prop firm pas cher peut être intéressante si le payout reste crédible et si les frais funded, resets, drawdown et restrictions ne rendent pas le compte trop fragile.',
    primaryKeywords: ['prop firm pas cher', 'cheap prop firm', 'code promo prop firm'],
    secondaryKeywords: ['prop firm discount', 'challenge pas cher', 'promo prop firm', 'prix challenge'],
    checks: [
      "Comparer prix d'entrée et frais après passage funded.",
      'Vérifier si la promotion change les conditions.',
      'Ne pas choisir une taille de compte plus grande juste pour une remise.',
      'Croiser budget, payout et score avant achat.',
    ],
    faq: [
      {
        question: 'Quelle prop firm est la moins chère ?',
        answer:
          'La moins chère change souvent avec les promos. Il faut comparer le ticket d’entrée avec les frais funded, les resets, le drawdown et le risque payout.',
      },
      {
        question: 'Un code promo PropRadar change-t-il le classement ?',
        answer:
          'Non. Les affiliations et promos sont séparées du scoring.',
      },
    ],
    internalLinks: [
      { label: 'Promos du moment', href: '/promos' },
      { label: 'Comparateur prix', href: '/comparateur' },
      { label: 'Top firms fiables', href: '/meilleures-prop-firms' },
    ],
  },
  {
    slug: 'prop-firm-smc-ict',
    title: 'Meilleure prop firm pour SMC / ICT',
    metaDescription:
      'Guide PropRadar pour traders SMC et ICT : drawdown, sessions, news, payout, forex, futures et règles à éviter.',
    eyebrow: 'Style SMC / ICT',
    h1: 'Prop firm pour SMC / ICT : chercher la flexibilité sans perdre le contrôle du risque',
    intent: 'style',
    demandSignal: 'Les traders SMC/ICT cherchent surtout compatibilité sessions, news, drawdown et exécution.',
    answer:
      'Pour SMC/ICT, la bonne firm doit laisser respirer les setups intraday sans règle opaque sur news, drawdown ou payout.',
    primaryKeywords: ['prop firm SMC', 'prop firm ICT', 'meilleure prop firm SMC'],
    secondaryKeywords: ['day trading prop firm', 'forex prop firm', 'New York session', 'London session'],
    checks: [
      'Vérifier les restrictions autour de London/NY et des news.',
      'Éviter un trailing drawdown trop serré pour les entries multiples.',
      'Comparer spread, plateforme et exécution.',
      'Regarder le payout minimum si la stratégie vise plusieurs petits gains.',
    ],
    faq: [
      {
        question: 'SMC fonctionne-t-il mieux en forex ou futures prop firm ?',
        answer:
          'Les deux peuvent marcher. Le forex donne plus de paires, les futures donnent une structure plus standardisée. Les règles comptent plus que le label.',
      },
      {
        question: 'Quel danger pour un trader ICT en prop firm ?',
        answer:
          'Les annonces macro, le drawdown journalier et les restrictions de trading autour des news.',
      },
    ],
    internalLinks: [
      { label: 'Outil style trading', href: '/outils' },
      { label: 'News trading', href: '/guides/prop-firm-news-trading' },
      { label: 'Règles', href: '/regles' },
    ],
    focusFirmSlugs: ['alpha-futures', 'lucid-trading', 'tradeify', 'ftmo', 'the5ers', 'funding-pips', 'fundednext'],
  },
  {
    slug: 'prop-firm-swing-trading',
    title: 'Prop firm swing trading : overnight, weekend et payout',
    metaDescription:
      'Guide des prop firms pour swing trading : positions overnight, weekend, news, drawdown, payout et règles de maintien.',
    eyebrow: 'Swing trading',
    h1: 'Prop firm swing trading : vérifier overnight, weekend et drawdown avant le prix',
    intent: 'style',
    demandSignal: 'Les swing traders recherchent moins de contraintes intraday et plus de tolérance overnight/weekend.',
    answer:
      'Pour swing trading, il faut une firm qui accepte les positions longues, les weekends ou au moins des règles claires sur rollover et news.',
    primaryKeywords: ['prop firm swing trading', 'prop firm hold overnight', 'prop firm hold weekend'],
    secondaryKeywords: ['overnight prop firm', 'weekend holding', 'swing option', 'forex funded account'],
    checks: [
      'Vérifier overnight et weekend sur challenge et funded.',
      'Comprendre si le drawdown est static, EOD ou trailing.',
      'Lire les restrictions autour des gaps et news.',
      'Comparer le payout delay avec la durée moyenne des trades.',
    ],
    faq: [
      {
        question: 'Toutes les prop firms acceptent-elles le swing trading ?',
        answer:
          'Non. Certaines limitent overnight, weekend ou news. Il faut relire le programme exact.',
      },
      {
        question: 'Quel drawdown est préférable pour swing trading ?',
        answer:
          "Un drawdown static ou EOD est souvent plus lisible qu'un trailing intraday strict.",
      },
    ],
    internalLinks: [
      { label: 'Outil style trading', href: '/outils' },
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
    ],
  },
  {
    slug: 'prop-firm-ea-algo',
    title: 'Prop firm EA allowed : bots, algo et copy trading',
    metaDescription:
      'Quelles prop firms acceptent EA, bots ou algo trading ? Guide PropRadar : restrictions, VPS, copy trading, news et payout.',
    eyebrow: 'EA / Algo',
    h1: 'Prop firm EA allowed : autorisation, restrictions et risques de payout',
    intent: 'style',
    demandSignal: 'Les traders algo cherchent une autorisation claire, mais les exceptions sont souvent dans les petites lignes.',
    answer:
      'Une firm compatible EA doit autoriser explicitement les bots, mais aussi clarifier copy trading, arbitrage, latency, news et conditions de retrait.',
    primaryKeywords: ['prop firm EA allowed', 'prop firm algo trading', 'prop firm bot allowed'],
    secondaryKeywords: ['copy trading prop firm', 'VPS prop firm', 'arbitrage prop firm', 'robot trading'],
    checks: [
      'Vérifier EA autorisé en challenge et funded.',
      'Lire les restrictions arbitrage, latency, grid, martingale et copy trading.',
      'Tester la plateforme avant de prendre une grosse taille.',
      'Surveiller les clauses de payout liées à la stratégie.',
    ],
    faq: [
      {
        question: 'Peut-on utiliser un bot sur une prop firm ?',
        answer:
          "Oui chez certaines firms, mais avec restrictions. L'autorisation doit être confirmée dans les règles officielles.",
      },
      {
        question: 'Le copy trading est-il toujours autorisé ?',
        answer:
          "Non. Beaucoup de firms l'encadrent fortement, surtout entre comptes appartenant à plusieurs personnes.",
      },
    ],
    internalLinks: [
      { label: 'Règles', href: '/regles' },
      { label: 'Comparateur', href: '/comparateur' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  {
    slug: 'prop-firm-fiable-trustpilot',
    title: 'Prop firm fiable : avis Trustpilot, Reddit et preuves',
    metaDescription:
      "Comment reconnaître une prop firm fiable : Trustpilot, Reddit, preuves payout, sources officielles et conflits d'intérêt.",
    eyebrow: 'Confiance',
    h1: 'Prop firm fiable : ne pas confondre bonne note et preuve solide',
    intent: 'risque',
    demandSignal: 'Les utilisateurs cherchent souvent avis, scam, Trustpilot et Reddit avant de payer.',
    answer:
      'Une prop firm fiable combine transparence des règles, sources officielles, historique de payout, retours communautaires cohérents et conflits commerciaux affichés.',
    primaryKeywords: ['prop firm fiable', 'prop firm avis', 'prop firm Trustpilot'],
    secondaryKeywords: ['prop firm scam', 'Reddit prop firm', 'avis prop firm', 'payout proof'],
    checks: [
      'Comparer Trustpilot avec Reddit et incidents payout.',
      'Vérifier que les sources officielles sont accessibles.',
      'Regarder le volume et le contexte des avis.',
      'Identifier les affiliations et conflits commerciaux.',
    ],
    faq: [
      {
        question: 'Trustpilot suffit-il pour juger une prop firm ?',
        answer:
          'Non. Trustpilot est utile, mais doit être croisé avec les règles, Reddit, les sources officielles et les payouts.',
      },
      {
        question: 'Faut-il ignorer toutes les firms à risque ?',
        answer:
          "Non, mais il faut les lire comme des dossiers de vigilance. Une firm à risque peut être active, mais elle ne doit pas être traitée comme un achat évident.",
      },
    ],
    internalLinks: [
      { label: 'Trustpilot prop firms', href: '/trustpilot-prop-firms' },
      { label: 'Audit', href: '/audit' },
      { label: 'Risques payout', href: '/risques-payout' },
    ],
  },
  {
    slug: 'ftmo-vs-the5ers',
    title: 'FTMO vs The5ers : règles, prix et payout',
    metaDescription:
      'FTMO vs The5ers : comparer score, prix, règles, payout, Trustpilot, style de trading, programmes phares et liens officiels.',
    eyebrow: 'Comparatif marque',
    h1: 'FTMO vs The5ers : deux profils solides, pas le même usage',
    intent: 'comparer',
    demandSignal: "Recherche de décision : l'utilisateur hésite entre deux achats possibles et veut savoir lequel correspond vraiment à son profil.",
    answer:
      "FTMO et The5ers sont deux profils solides, mais ils ne répondent pas au même besoin. FTMO rassure par son historique, son cadre très documenté et son image de référence. The5ers parle davantage aux traders prudents qui veulent des limites plus lisibles selon le programme. Le bon choix dépend du style de trading, du budget, du drawdown accepté, des restrictions news/EA et du niveau de confort avec les règles de payout.",
    primaryKeywords: ['FTMO vs The5ers', 'FTMO ou The5ers', 'The5ers avis FTMO'],
    secondaryKeywords: ['FTMO payout', 'The5ers rules', 'prop firm compare', 'challenge forex'],
    checks: [
      'Comparer le prix minimum et la taille de compte visée.',
      'Lire les règles de news, EA, drawdown et profit target.',
      'Identifier les affiliations, les coupons et les intérêts commerciaux affichés.',
      'Choisir selon style de trading, pas selon popularité seule.',
    ],
    faq: [
      {
        question: 'FTMO est-il meilleur que The5ers ?',
        answer:
          'Pas universellement. FTMO est très connu, The5ers peut être plus adapté à certains profils. Le programme exact compte plus que le nom.',
      },
      {
        question: 'Le lien affilié change-t-il ce comparatif ?',
        answer:
          'Non. PropRadar sépare score, risques et relations commerciales.',
      },
    ],
    internalLinks: [
      { label: 'FTMO', href: '/firm/ftmo' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'Comparateur', href: '/comparateur' },
    ],
    focusFirmSlugs: ['ftmo', 'the5ers'],
  },
  {
    slug: 'topstep-vs-apex',
    title: 'Topstep vs Apex : comparatif futures',
    metaDescription:
      'Topstep vs Apex Trader Funding : comparer futures, drawdown, payout, promos, plateformes et signaux de risque.',
    eyebrow: 'Comparatif futures',
    h1: 'Topstep vs Apex : le match futures se joue sur les règles et le payout',
    intent: 'comparer',
    demandSignal: "Recherche de décision futures : coût réel, drawdown, conditions de retrait et confiance payout avant d'acheter une évaluation.",
    answer:
      "Apex attire avec des promotions agressives et un choix large de tailles de comptes. Topstep joue plutôt la carte de l'acteur futures installé, avec un cadre plus identifiable pour beaucoup de traders. Le match ne se joue donc pas seulement sur le prix : il faut comparer le drawdown, les frais récurrents, les caps de payout, les plateformes et les retours communautaires récents.",
    primaryKeywords: ['Topstep vs Apex', 'Apex vs Topstep', 'meilleure prop firm futures'],
    secondaryKeywords: ['Apex Trader Funding promo', 'Topstep payout', 'futures funded account'],
    checks: [
      'Comparer promotions et coût total après passage funded.',
      'Vérifier EOD/trailing drawdown et consistency.',
      'Regarder les signaux communautaires et incidents récents.',
      'Choisir selon plateforme et style intraday.',
    ],
    faq: [
      {
        question: 'Apex est-il moins cher que Topstep ?',
        answer:
          'Souvent Apex affiche de grosses promos, mais le prix doit être comparé aux règles et frais complets.',
      },
      {
        question: 'Topstep est-il plus fiable ?',
        answer:
          'Il a une présence historique forte, mais chaque trader doit vérifier les conditions actuelles avant achat.',
      },
    ],
    internalLinks: [
      { label: 'Topstep', href: '/firm/topstep' },
      { label: 'Apex Trader Funding', href: '/firm/apex-trader-funding' },
      { label: 'Promos futures', href: '/promos' },
    ],
    focusFirmSlugs: ['topstep', 'apex-trader-funding'],
  },
  {
    slug: 'funderpro-vs-the5ers',
    title: 'FunderPro vs The5ers : news, EA, swing et payout',
    metaDescription:
      'Comparatif FunderPro vs The5ers : code FunderPro PROPRADAR, coupon The5ers 1EIJ6PO, news trading, EA, swing option, prix, score et payout.',
    eyebrow: 'Comparatif CFD',
    h1: 'FunderPro vs The5ers : flexibilité contre historique plus installé',
    intent: 'comparer',
    demandSignal: 'Les traders comparent ces firms pour news, EA, swing et codes promo.',
    answer:
      'FunderPro peut intéresser les traders qui veulent flexibilité news/EA/swing. The5ers garde un profil plus installé et prudent selon le programme.',
    primaryKeywords: ['FunderPro vs The5ers', 'FunderPro avis', 'The5ers code promo'],
    secondaryKeywords: ['code PROPRADAR', 'coupon The5ers 1EIJ6PO', 'EA allowed', 'news trading allowed', 'swing option'],
    checks: [
      'Tester le code promo au checkout sans suracheter.',
      'Vérifier news, EA et overnight sur le programme visé.',
      'Comparer payout delay et conditions de retrait.',
      'Lire les règles officielles du programme exact avant de choisir.',
    ],
    faq: [
      {
        question: 'FunderPro est-il adapté au news trading ?',
        answer:
          'La page officielle met en avant news trading allowed, mais il faut vérifier les conditions détaillées du programme.',
      },
      {
        question: 'The5ers est-il plus prudent ?',
        answer:
          'The5ers a un historique plus long. Cela ne dispense pas de lire les règles de chaque programme.',
      },
    ],
    internalLinks: [
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'Promos', href: '/promos' },
    ],
    focusFirmSlugs: ['funderpro', 'the5ers'],
  },
  {
    slug: 'leveraged-prop-firm-avis',
    title: 'Leveraged prop firm avis : règles, payout et Trustpilot',
    metaDescription:
      'Avis Leveraged / Get Leveraged : programmes, split 80%, comptes 5k à 1M, overnight, payout, Trustpilot indisponible et points à vérifier.',
    eyebrow: 'Avis marque',
    h1: 'Leveraged prop firm avis : une marque visible, mais à vérifier avant achat',
    intent: 'risque',
    demandSignal:
      "Recherche de confiance marque : sérieux de Leveraged, payouts, règles applicables et raison de l'alerte Trustpilot.",
    answer:
      "Leveraged est une prop firm active avec programmes de portfolio, comptes de 5k à 1M et split annoncé à 80%. Avant achat, le point important est de vérifier les règles du programme, les conditions de payout et l'alerte Trustpilot qui rend la note publique indisponible.",
    primaryKeywords: ['Leveraged prop firm avis', 'Get Leveraged avis', 'getleveraged.com Trustpilot'],
    secondaryKeywords: ['Leveraged payout', 'Leveraged prop firm review', 'Leveraged rules', 'Portfolio Manager Simulation'],
    checks: [
      "Vérifier si l'offre choisie est Jr, Sr, Executive ou un produit Turbo/Crypto/Sprint/Classic.",
      "Relire profit target, daily drawdown, max drawdown, overnight/weekend et fréquence de payout.",
      "Tenir compte de l'alerte Trustpilot : note indisponible et avis supprimés signalés.",
      'Recouper les payouts affichés avec Discord, X, Reddit et les conditions officielles avant de payer.',
    ],
    faq: [
      {
        question: 'Leveraged est-elle une prop firm active ?',
        answer:
          'Oui, le site officiel présente des programmes actifs, une communauté, des pages de produits et des comptes de portfolio. Cela ne suffit pas à valider la fiabilité payout sans recoupement.',
      },
      {
        question: 'Pourquoi être prudent avec Get Leveraged ?',
        answer:
          "Trustpilot affiche une note indisponible à cause d'une violation de guidelines et indique que des avis ont été supprimés. C'est un signal à intégrer avant achat.",
      },
    ],
    internalLinks: [
      { label: 'Fiche Leveraged', href: '/firm/get-leveraged' },
      { label: 'Comparateur', href: '/comparateur' },
      { label: 'Risques payout', href: '/risques-payout' },
    ],
    focusFirmSlugs: ['get-leveraged'],
  },
  {
    slug: 'goat-funded-trader-avis',
    title: 'Goat Funded Trader review: code PROPRADAR, rules and payout',
    metaDescription:
      'Goat Funded Trader / GFT review: PROPRADAR code, signup link, 1 step, 2 step, 3 step, Instant, news trading, weekend holding and payout rules.',
    eyebrow: 'Brand review',
    h1: 'Goat Funded Trader review: strong offer, but reread the rules before buying',
    intent: 'risque',
    demandSignal:
      'Brand decision search: the trader wants to know whether GFT is reliable, whether the code works, which model to choose and which rules to verify before paying.',
    answer:
      'Goat Funded Trader attracts traders with a broad offer: 1 step, 2 step, 3 step and Instant Funding models, news-trading options, weekend-holding options and a PROPRADAR code to test at checkout. The right reflex is to compare the exact model before looking at the discount.',
    primaryKeywords: ['Goat Funded Trader review', 'GFT prop firm', 'Goat Funded Trader discount code'],
    secondaryKeywords: ['PROPRADAR code', 'GFT payout', 'GFT instant funding', 'Goat Funded Trader rules'],
    checks: [
      'Test PROPRADAR at checkout without selecting an oversized account.',
      'Compare 1 step, 2 step, 3 step and Instant because the rules are not identical.',
      'Verify news trading, weekend holding, lot size, daily loss, max loss and payout delay.',
      'Read recent feedback from the last 30 to 60 days across Reddit, Discord and X.',
      'Look for payout-denial examples and the most common rejection reasons on the exact program you want.',
    ],
    faq: [
      {
        question: 'Does the PROPRADAR code work at Goat Funded Trader?',
        answer:
          'The code should be tested at checkout with the PropRadar signup link. The exact discount can depend on the selected model, timing and cart.',
      },
      {
        question: 'Which GFT model should I choose?',
        answer:
          'Instant and 1-step models are faster, but they can be stricter. 2-step or 3-step models may be easier to read if you want more validation and less pressure before funded-stage rules apply.',
      },
    ],
    internalLinks: [
      { label: 'Goat Funded Trader profile', href: '/firm/goat-funded-trader' },
      { label: 'Prop firm deals', href: '/promos' },
      { label: 'Instant funding', href: '/guides/prop-firm-instant-funding' },
    ],
    focusFirmSlugs: ['goat-funded-trader'],
  },
  {
    slug: 'prop-firm-instant-funding',
    title: 'Prop firm instant funding : accès rapide, règles et pièges',
    metaDescription:
      'Comparer les prop firms instant funding : prix, drawdown, payout, profit split, news trading, risque de règles cachées et alternatives avec challenge.',
    eyebrow: 'Instant funding',
    h1: 'Prop firm instant funding : rapide ne veut pas dire plus simple',
    intent: 'choisir',
    demandSignal:
      "Recherche transactionnelle : le trader veut éviter une évaluation longue, mais il doit comprendre pourquoi l'instant funding coûte souvent plus cher ou impose des règles plus serrées.",
    answer:
      "L'instant funding peut être utile si tu veux accéder vite à un compte, mais il faut comparer le coût total, le drawdown, le payout minimum, les limites de lot, les restrictions news et les clauses de retrait avant de payer.",
    primaryKeywords: ['prop firm instant funding', 'instant funding prop firm', 'funded account instant'],
    secondaryKeywords: ['prop firm sans challenge', 'instant funded account', 'payout instant funding', 'AquaFunded instant funding'],
    checks: [
      'Comparer le prix instant avec un challenge classique équivalent.',
      'Vérifier si le compte est vraiment funded ou seulement simulé avec règles spéciales.',
      'Lire daily loss, max loss, payout minimum, lot size et restrictions de stratégie.',
      'Éviter de payer plus cher juste pour sauter une étape si ton système supporte un challenge normal.',
    ],
    faq: [
      {
        question: "L'instant funding est-il meilleur qu'un challenge ?",
        answer:
          "Pas toujours. Il fait gagner du temps, mais il peut coûter plus cher et imposer des règles plus strictes. Le choix dépend de ton capital, de ton style et de ta discipline.",
      },
      {
        question: 'Quelle prop firm instant funding regarder en premier ?',
        answer:
          'Regarde d’abord les firms dont les règles de retrait, le drawdown et les frais sont lisibles. Le prix seul ne suffit pas.',
      },
    ],
    internalLinks: [
      { label: 'Comparateur', href: '/comparateur' },
      { label: 'Goat Funded Trader', href: '/firm/goat-funded-trader' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  {
    slug: 'prop-firm-sans-challenge',
    title: 'No challenge prop firm: instant funding or false shortcut?',
    metaDescription:
      'No challenge prop firm: understand instant funding, direct funded accounts, fees, drawdown, payout rules and risks before paying more.',
    eyebrow: 'No challenge',
    h1: 'No challenge prop firm: the shortcut can cost more',
    intent: 'choisir',
    demandSignal:
      'Fast-purchase search: the trader wants to skip evaluation phases, but needs to understand what can be lost in cost, clarity and margin for error.',
    answer:
      'A no-challenge prop firm mainly sells time. Direct access can suit a stable trader, but it can cost more if the funded-stage rules are tighter than expected.',
    primaryKeywords: ['no challenge prop firm', 'prop firm without evaluation', 'direct funded account'],
    secondaryKeywords: ['instant funding', 'instant funded account', 'fast prop firm', 'funded account direct'],
    checks: [
      'Compare the real cost over several months, including entry fees and possible renewals.',
      'Verify funded-stage rules: drawdown, news restrictions, scaling, lot size and payout clauses.',
      'Check payout minimum and withdrawal frequency before judging the offer cheap.',
      'Confirm drawdown type: static, trailing, EOD or smart drawdown.',
      'Look for consistency rules, daily loss limits and any hidden funded-stage conditions.',
      'Avoid this format if you do not have a stable strategy tested over several months.',
    ],
    faq: [
      {
        question: 'Can you get a prop firm account without a challenge?',
        answer:
          'Yes. Some instant or direct-funded offers exist, but they do not remove risk. They often move the difficulty to funded-stage rules, fees, drawdown or payout conditions.',
      },
      {
        question: 'Who is no-challenge funding suitable for?',
        answer:
          'It usually fits traders who already have a stable process and know their average drawdown. For beginners, a small classic challenge can be cheaper and more educational.',
      },
    ],
    internalLinks: [
      { label: 'Instant funding', href: '/guides/prop-firm-instant-funding' },
      { label: 'Trading style tool', href: '/outils' },
      { label: 'Deals', href: '/promos' },
    ],
    focusFirmSlugs: ['instant-funding', 'fxify', 'funded-trading-plus', 'tradeify', 'blue-guardian'],
  },
  {
    slug: 'prop-firm-pour-debutant',
    title: 'Prop firm for beginners: choose clear rules before account size',
    metaDescription:
      'Best prop firm for beginners: compare small accounts, clear rules, simple drawdown, payout reliability, reset cost and common first-challenge mistakes.',
    eyebrow: 'Beginner guide',
    h1: 'Prop firm for beginners: choose the clearest rule, not the biggest account',
    intent: 'choisir',
    demandSignal:
      'First-challenge search: the trader wants to know where to start, how much to spend and which beginner mistakes to avoid before buying a prop firm account.',
    answer:
      'For a beginner, the best first choice is rarely the biggest account. A smaller account, readable drawdown, reasonable price and rules you can follow are usually better for learning and protecting confidence.',
    primaryKeywords: ['prop firm for beginners', 'best prop firm for beginners', 'first prop firm challenge'],
    secondaryKeywords: ['easy prop firm', 'beginner prop firm challenge', 'small prop firm account', 'cheap beginner prop firm', 'prop firm rules for beginners'],
    checks: [
      'Start with the smallest account that still lets you test the rules seriously.',
      'Verify that drawdown is realistic and protective, not too tight and not so loose that it encourages reckless risk.',
      'Avoid discounts that push you into an account size that does not match your current skill level.',
      'Compare the real cost over 2 to 3 months, including entry fee, resets and repeated attempts.',
      'Read the complete rules before buying, because many beginner losses come from skipped details.',
      'Choose a program whose rules are clear, dated and easy to find on the official site.',
    ],
    faq: [
      {
        question: 'What account size should a beginner choose first?',
        answer:
          'A small or medium account is usually enough for a first attempt. The goal is to validate your process under rules, not to maximize the displayed balance.',
      },
      {
        question: 'Is a cheap prop firm always best for beginners?',
        answer:
          'Not always. A low price is useful only if the rules remain clear, the drawdown is realistic and payout conditions are not harder than expected.',
      },
    ],
    internalLinks: [
      { label: 'Cheap prop firm', href: '/guides/prop-firm-pas-cher' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Methodology', href: '/methodologie' },
    ],
    focusFirmSlugs: ['ftmo', 'the5ers', 'topstep', 'fundednext', 'audacity-capital', 'alpha-capital-group'],
  },
  {
    slug: 'meilleure-prop-firm-forex',
    title: 'Meilleure prop firm forex : MT5, cTrader, payout et règles',
    metaDescription:
      'Comparer les prop firms forex : FTMO, The5ers, FundingPips, FunderPro, GOAT Funded Trader, spreads, news, EA, payout et plateformes.',
    eyebrow: 'Forex',
    h1: 'Meilleure prop firm forex : plateforme, spreads et payout avant la promo',
    intent: 'choisir',
    demandSignal:
      "Recherche large forex : le trader compare MT5, cTrader, spreads, news trading, EA, frais et fiabilité payout.",
    answer:
      "En forex, la meilleure prop firm dépend surtout de la plateforme, des spreads, des règles news/EA, du drawdown et du payout. Une promo forte ne compense pas une exécution ou une règle incompatible avec ton style.",
    primaryKeywords: ['meilleure prop firm forex', 'forex prop firm', 'prop firm MT5'],
    secondaryKeywords: ['prop firm cTrader', 'FTMO alternative forex', 'FundingPips avis', 'The5ers forex'],
    checks: [
      'Comparer MT4, MT5, cTrader ou plateforme propriétaire.',
      'Vérifier spreads, commissions, slippage et restrictions news.',
      'Lire le payout minimum et le délai de retrait.',
      'Choisir selon ta paire et ta session, pas seulement selon le split.',
    ],
    faq: [
      {
        question: 'Quelle prop firm forex regarder en premier ?',
        answer:
          'Commence par les firms avec règles lisibles, plateforme adaptée à ton style, risque payout faible ou moyen et sources officielles claires.',
      },
      {
        question: 'MT5 suffit-il pour choisir une prop firm ?',
        answer:
          'Non. MT5 est pratique, mais il faut aussi vérifier spreads, news, EA, drawdown et conditions de retrait.',
      },
    ],
    internalLinks: [
      { label: 'FTMO', href: '/firm/ftmo' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'GOAT Funded Trader', href: '/firm/goat-funded-trader' },
    ],
  },
  {
    slug: 'alternatives-ftmo',
    title: 'FTMO alternatives: cheaper, more flexible or simply better suited?',
    metaDescription:
      'Compare FTMO alternatives: The5ers, Funding Pips, FunderPro and E8 Markets by price, rules, news trading, EA, payout, platforms and scaling.',
    eyebrow: 'Alternatives FTMO',
    h1: 'FTMO alternatives: cheaper, more flexible or simply better suited?',
    intent: 'comparer',
    demandSignal:
      'Comparison search: the trader knows FTMO but wants to know whether another firm fits budget, rules, platform or trading style better.',
    answer:
      'Changing prop firm to leave FTMO only makes sense if the alternative solves a real constraint: lower entry cost, more flexible rules, a better platform, faster payout or a program better suited to your trading style.',
    primaryKeywords: ['FTMO alternatives', 'FTMO alternative', 'prop firm like FTMO'],
    secondaryKeywords: ['FTMO vs Funding Pips', 'FTMO vs The5ers', 'FunderPro vs FTMO', 'E8 Markets review'],
    checks: [
      'Compare why you want an FTMO alternative: price, rule flexibility, platform, payout timing or scaling.',
      'Verify real rules around drawdown, news trading, EA and weekend holding.',
      'Read official sources and recent community signals, not only promotions.',
      'Do not leave a reliable firm only because another checkout page shows a discount.',
      'Compare real cost over 3 to 6 months, including resets or repeated attempts.',
    ],
    faq: [
      {
        question: 'What is the best FTMO alternative?',
        answer:
          'It depends on the constraint. The5ers can be useful for conservative scaling, Funding Pips for modern challenge options, FunderPro for pricing and large accounts, and E8 Markets for another modern benchmark. Always verify current rules.',
      },
      {
        question: 'Is FTMO still worth using?',
        answer:
          'Yes for many traders who value clear rules, strong public history and a well-known two-step framework. Alternatives are interesting only if they solve a specific problem for you.',
      },
    ],
    internalLinks: [
      { label: 'FTMO vs The5ers', href: '/guides/ftmo-vs-the5ers' },
      { label: 'Comparateur', href: '/comparateur' },
      { label: 'Top firms fiables', href: '/meilleures-prop-firms' },
    ],
    focusFirmSlugs: ['the5ers', 'funding-pips', 'funderpro', 'e8-markets', 'ftmo'],
  },
  {
    slug: 'prop-firm-avis-reddit-trustpilot',
    title: 'Prop firm Reddit and Trustpilot reviews: a good rating is not enough',
    metaDescription:
      'Learn how to read prop firm reviews on Trustpilot, Reddit, Discord and X: fake review risk, payout complaints, timing, proof quality and discount-campaign bias.',
    eyebrow: 'Review signals',
    h1: 'Prop firm Reddit and Trustpilot reviews: a good rating is not enough',
    intent: 'risque',
    demandSignal:
      'Trust search: the trader wants to know whether reviews are real, recent, manipulated or useful for judging payout reliability.',
    answer:
      'Trustpilot, Reddit, Discord and X are useful only when they are cross-checked. A high public rating can still hide payout issues, vague rules or discount campaigns that inflate positive reviews.',
    primaryKeywords: ['prop firm Reddit reviews', 'prop firm Trustpilot reviews', 'prop firm reviews'],
    secondaryKeywords: ['prop firm scam reddit', 'fake Trustpilot reviews', 'payout problem', 'Discord prop firm', 'prop firm payout complaints'],
    checks: [
      'Separate raw rating from filtered reliability: date, removed reviews and campaign context matter.',
      'Search for repeated payout complaints even if the global rating is high.',
      'Compare positive-review timing with large discount campaigns.',
      'Check whether Discord, Reddit and X tell the same story as Trustpilot.',
      'Look for recent dated payout proof instead of generic testimonials.',
    ],
    faq: [
      {
        question: 'Is Trustpilot enough to choose a prop firm?',
        answer:
          'No. Trustpilot is useful for review volume, but it must be cross-checked with Reddit, Discord, X, official rules and recent payout proof.',
      },
      {
        question: 'Why does Reddit often look more negative?',
        answer:
          'Satisfied traders usually post less than blocked or angry traders. Reddit is useful for finding problems and patterns, not for measuring quality alone.',
      },
      {
        question: 'What makes a prop firm review more trustworthy?',
        answer:
          'Specific details: exact program, date, payout amount, rule involved, screenshot context and whether the same issue appears on other platforms.',
      },
    ],
    internalLinks: [
      { label: 'Trustpilot prop firms', href: '/trustpilot-prop-firms' },
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Audit', href: '/audit' },
    ],
  },
  {
    slug: 'prop-firm-payout-proof',
    title: 'Prop firm payout proof : reconnaître une vraie preuve de retrait',
    metaDescription:
      'Prop firm payout proof : comment vérifier une preuve de retrait, éviter les certificats marketing et comparer délai, caps et incidents.',
    eyebrow: 'Payout proof',
    h1: 'Prop firm payout proof : la preuve doit être datée, traçable et cohérente',
    intent: 'risque',
    demandSignal:
      "Recherche de sécurité : le trader veut savoir quelles firms paient vraiment et comment distinguer une preuve exploitable d'un argument marketing.",
    answer:
      "Une vraie preuve de payout doit avoir une date, un contexte, un montant crédible, une source traçable et une cohérence avec les règles officielles. Un certificat isolé ou une capture coupée ne suffit pas.",
    primaryKeywords: ['prop firm payout proof', 'prop firm qui paie vraiment', 'preuve payout prop firm'],
    secondaryKeywords: ['payout problem', 'payout denial', 'prop firm retrait', 'payout rapide'],
    checks: [
      'Vérifier date, montant, méthode de retrait et source.',
      'Comparer le payout affiché avec les règles officielles du programme.',
      'Chercher les refus de payout et les motifs récurrents.',
      'Se méfier des preuves trop parfaites sans contexte utilisateur.',
    ],
    faq: [
      {
        question: 'Une capture de payout suffit-elle ?',
        answer:
          'Non. Elle devient utile seulement si elle est datée, reliée à un compte ou témoignage crédible, et cohérente avec les règles de la firm.',
      },
      {
        question: 'Pourquoi une firm peut-elle refuser un payout ?',
        answer:
          'Les motifs fréquents sont les violations de règles, news interdites, copy trading non autorisé, lot size excessif, arbitrage ou incohérence de stratégie.',
      },
    ],
    internalLinks: [
      { label: 'Risques payout', href: '/risques-payout' },
      { label: 'Comparateur', href: '/comparateur' },
      { label: 'Prop firm payout rapide', href: '/guides/prop-firm-payout-rapide' },
    ],
  },
  {
    slug: 'prop-firm-legal-check',
    title: 'Prop firm legal check: entities, regulators and red flags',
    metaDescription:
      'Prop firm legal due diligence guide: check legal entities, simulated account disclaimers, regulator status, jurisdiction, payment clauses and payout dispute risks before buying.',
    eyebrow: 'Legal due diligence',
    h1: 'Prop firm legal check: verify the entity before the offer',
    intent: 'risque',
    demandSignal: 'Traders increasingly search whether a prop firm is regulated, legally registered or only operating a simulated challenge model.',
    answer:
      'A prop firm can be legitimate enough to research but still not be a regulated broker or investment firm. The useful legal check starts with the contracting entity, jurisdiction, simulation disclaimer, regulator status, payment terms and payout dispute clauses.',
    primaryKeywords: ['prop firm legal check', 'prop firm regulation', 'is my prop firm regulated'],
    secondaryKeywords: ['prop firm legal entity', 'prop firm terms', 'simulated trading account', 'prop firm broker', 'prop firm due diligence'],
    checks: [
      'Identify the exact company name, registration number, address and jurisdiction before checkout.',
      'Separate broker regulation from prop-firm challenge services, simulated accounts and virtual funds.',
      'Read whether the firm says it is not a broker, not an investment adviser and not a deposit-taking institution.',
      'Check arbitration, class-action waiver, refund, chargeback and payout forfeiture clauses.',
      'Verify restricted countries and whether your selected product is available in your jurisdiction.',
      'Use regulator warnings and public registers as risk signals, not marketing claims.',
    ],
    faq: [
      {
        question: 'Does a registered company make a prop firm safe?',
        answer:
          'No. A registered company improves traceability, but it does not automatically mean the prop-firm product is regulated like a broker, investment adviser or futures commission merchant.',
      },
      {
        question: 'What is the most important legal red flag?',
        answer:
          'The biggest red flag is unclear contracting entity information, followed by regulator warnings, vague payout rights, aggressive forfeiture clauses and marketing that sounds like real capital while the terms say simulated accounts.',
      },
      {
        question: 'Why does simulated trading matter legally?',
        answer:
          'Simulated trading usually means the trader is not receiving a normal brokerage account or client-fund protection. Rewards depend on contract rules, reviews and eligibility rather than ordinary withdrawal rights.',
      },
    ],
    internalLinks: [
      { label: 'Audit source levels', href: '/audit' },
      { label: 'Full comparator', href: '/comparateur' },
      { label: 'Payout risk guide', href: '/risques-payout' },
      { label: 'Trustpilot context', href: '/trustpilot-prop-firms' },
    ],
    focusFirmSlugs: [
      'ftmo',
      'the5ers',
      'fundednext',
      'topstep',
      'take-profit-trader',
      'hantec-trader',
      'the-trading-pit',
      'ftuk',
      'lux-trading-firm',
      'funderpro',
      'for-traders',
      'funding-traders',
      'breakout-prop',
      'sway-funded',
      'funded-peaks',
      't4tcapital',
      'traders-with-edge',
      'kortanafx',
      'axi-select',
      'thinkcapital',
      'ic-funded',
      'blueberry-funded',
      'finotive-funding',
      'rebelsfunding',
      'sabiotrade',
      'ment-funding',
      'ofp-funding',
      'hola-prime',
      'dna-funded',
      'crypto-fund-trader',
      'hyrotrader',
      'smart-prop-trader',
      'toptier-trader',
      'wemastertrade',
      'funded-bull',
      'prop-number-one',
      'karma-prop-traders',
      'wall-street-funded',
      'blusky-trading',
      'tradefundrr',
      'funded-futures-network',
      'daytraders-com',
      'traddoo',
      'fx2-funding',
      'rocket21-challenge',
      'glow-node',
      'funded-engineer',
      'skilled-funded-traders',
      'funding-talent',
      'blufx',
      'traders-central',
      'my-flash-funding',
      'funded-squad',
      'funded-unicorn',
      'quant-tekel',
      'ascendx-capital',
      'purdia-capital',
      'nova-funding',
      'nations-trading',
      'funder-trading',
      'the-forex-funder',
      'fundedlions',
      'fx-capital-funding',
      'leveled-up-society',
      'one-of-one-funding',
      'wsfunded',
      'moneta-funded',
      'fundedelite',
      'orion-funded',
      'bem-funding',
      'atmos-funded',
      'top-one-trader',
      'qt-funded',
      'atfunded',
      'top-one-futures',
      'e8-futures',
      'traders-launch',
      'sure-leverage',
      'tradexprop',
      'sfx-funded',
      'tribe-funded',
      'atlas-funded',
      'tx3-funding',
      'aurafunded',
      'getcryptofunded',
      'summit-strike-capital',
      'nostro',
      'funding-frontier',
      'funded7',
      'equity-edge',
      'myfxcapital',
      'alphaproptraders',
      'syndicate-funded',
      'fxci',
      'monevis',
      'funded-trader-markets',
      'funds-for-traders',
      'now-trade-funded',
      'dei-funded',
      'fxrk',
      'forexive',
      'onlyfunds',
      'myfundedcapital',
      'upcomers',
      'axe-trader-funding',
      'inspire-funding',
      'klein-funding-crypto',
      'algo-forex-funds',
      'aeon-funded',
      'trade-amber',
      'astra-capital-funding',
      'funding-your-trades',
      'mifunder',
      'fundings4u',
      'alpine-funded',
      'limitless-funding',
      'tradersedgefx',
      'gry-funding',
      'cash-flow-funding',
      'levels',
      'fundedhive',
      'titan-capital-markets',
      'tiger-funded',
      'fundyourfx',
      'ryze-trading',
      'tradicave',
      'fortunes-funding',
      'clarity-traders',
      'trading-cult',
      'next-step-funded',
      'forex-funds-flow',
      'my-crypto-funding',
      'directfundedtrader',
      'exfunded',
      'optimal-traders',
      'quantec-trading-capital',
      'next-level-funding',
      'superfunded',
      'ck-capital',
      'onefunded',
      'firmity-funding',
      'hash-hedge',
      'real-funds-trader',
      'forfx',
      'the-concept-trading',
      'the-prop-game',
      'tentrade',
      'neg-markets',
      'guardeer-funding',
      'indigo-trader-funding',
      'wegetfunded',
      'cove-funded',
      'stocknet-institute',
      'ultimate-traders',
      'willis-capital',
      'infinity-forex-funds',
      'alpicap',
      'get-leveraged',
    ],
  },
];

type SeoGuideDisplayOverride = Partial<
  Pick<SeoGuide, 'title' | 'metaDescription' | 'eyebrow' | 'h1' | 'answer' | 'primaryKeywords' | 'secondaryKeywords' | 'checks' | 'faq' | 'internalLinks'>
>;

const guideDisplayOverrides: Record<string, SeoGuideDisplayOverride> = {
  'meilleure-prop-firm-2026': {
    title: 'Best prop firm 2026: a risk-first ranking',
    metaDescription: 'Compare the best prop firms by payout reliability, rule clarity, community feedback, drawdown, news policy, consistency rules and proof level.',
    eyebrow: 'Main ranking',
    h1: 'Best prop firm: the ranking starts with risk, not marketing',
    answer: 'The best prop firm is not automatically the one with the biggest account size or the loudest discount. A useful ranking starts with payout reliability, rule clarity, recent community feedback and the exact program you can realistically trade every day.',
    primaryKeywords: ['best prop firm', 'most reliable prop firm', 'prop firm ranking'],
    secondaryKeywords: ['prop firm payout reliability', 'prop firm reviews', 'prop firm Trustpilot', 'prop firm comparison'],
    checks: [
      'Compare payout reliability before looking at account size.',
      'Verify the exact program rules, not only the firm brand.',
      'Cross-check Trustpilot, Reddit, X and Discord because each source has a different bias.',
      'Check drawdown type and news-trading policy, especially for intraday or SMC/ICT styles.',
      'Verify whether there is a consistency rule or daily profit cap.',
      'Check payout minimum if your strategy produces many small wins.',
      'Read scaling and withdrawal conditions once the account is funded.',
    ],
    faq: [
      {
        question: 'What makes a prop firm good in 2026?',
        answer:
          'A good prop firm combines reliable payouts, clear rules, stable conditions, enough public feedback and a program that fits your trading style. A large account size does not compensate for unclear withdrawal rules.',
      },
      {
        question: 'Should I choose the firm with the biggest discount?',
        answer:
          'No. A discount is useful only if the rules, drawdown, payout process and funded-stage conditions remain compatible with your strategy.',
      },
    ],
    internalLinks: [
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Current deals', href: '/promos' },
      { label: 'Methodology', href: '/methodologie' },
    ],
  },
  'meilleure-prop-firm-futures': {
    title: 'Best futures prop firm: Topstep, Apex, TPT and alternatives',
    metaDescription: 'Compare futures prop firms by payout, drawdown, fees, platforms, funding rules and recent risk signals.',
    eyebrow: 'Futures funding',
    h1: 'Best futures prop firm: compare payout, drawdown and hidden fees',
    answer: 'Futures traders should compare more than the advertised discount. The important points are funded-account fees, payout caps, drawdown type, platform access and whether recent community feedback confirms the marketing promise.',
    primaryKeywords: ['best futures prop firm', 'futures prop firm', 'Topstep vs Apex'],
    secondaryKeywords: ['Apex Trader Funding', 'Take Profit Trader', 'MyFundedFutures', 'futures payout'],
    checks: [
      'Compare funded-account fees after the evaluation.',
      'Identify EOD, trailing or static drawdown.',
      'Read payout caps and consistency requirements.',
      'Check whether the deal applies to the exact product you want.',
    ],
    internalLinks: [
      { label: 'Topstep vs Apex', href: '/guides/topstep-vs-apex' },
      { label: 'Current futures deals', href: '/promos' },
      { label: 'Rules', href: '/regles' },
    ],
  },
  'prop-firm-sans-consistency-rule': {
    title: 'Prop firm with no consistency rule: what to verify',
    metaDescription: 'Understand prop firms without consistency rules: payout minimum, trailing drawdown, hidden constraints and program details.',
    eyebrow: 'Rules search',
    h1: 'No consistency rule does not mean no risk',
    answer: 'A missing consistency rule can be positive, but it is only one part of the program. Check whether the firm compensates with a stricter drawdown, payout minimum, lot-size rule, news restriction or funded-stage condition.',
    primaryKeywords: ['prop firm no consistency rule', 'no consistency prop firm', 'prop firm without consistency'],
    secondaryKeywords: ['payout minimum', 'trailing drawdown', 'static drawdown', 'prop firm rules'],
    checks: [
      'Verify the rule in both evaluation and funded stages.',
      'Compare payout minimum and required trading days.',
      'Check trailing drawdown and daily loss.',
      'Do not treat no consistency as a complete green light.',
    ],
    internalLinks: [
      { label: 'Rules', href: '/regles' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Payout risk', href: '/risques-payout' },
    ],
  },
  'prop-firm-news-trading': {
    title: 'Prop firm news trading allowed: list and risks',
    metaDescription: 'Compare prop firms that allow news trading and understand NFP, CPI, FOMC, slippage and payout risks.',
    eyebrow: 'News trading',
    h1: 'Prop firms and news trading: allowed does not mean risk-free',
    answer: 'For news trading, the word allowed is not enough. You need to check banned time windows, slippage treatment, red-folder events, funded-stage restrictions and payout clauses after macro trades.',
    primaryKeywords: ['prop firm news trading allowed', 'prop firm trading news', 'news trading prop firm'],
    secondaryKeywords: ['NFP prop firm', 'CPI trading challenge', 'FOMC prop firm', 'slippage prop firm'],
    checks: [
      'Verify news rules in the challenge and funded stages.',
      'Read restrictions around red-folder releases.',
      'Check daily drawdown before trading spikes.',
      'Read payout conditions linked to news trades.',
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'Official rules', href: '/regles' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  'prop-firm-payout-rapide': {
    title: 'Fast payout prop firms: withdrawals, proof and traps',
    metaDescription: 'Guide to fast payout prop firms: payout delay, withdrawal proof, payout risk, caps and conditions before buying a challenge.',
    eyebrow: 'Payout search',
    h1: 'Fast payout prop firms: check proof, not only the promise',
    answer: 'A fast payout is useful only if the conditions are clear: minimum withdrawal, required trading days, caps, split, public feedback and incident history.',
    primaryKeywords: ['fast payout prop firm', 'prop firm payout proof', 'prop firm withdrawal'],
    secondaryKeywords: ['24h payout prop firm', 'payout problem', 'payout denial', 'withdrawal proof'],
    checks: [
      'Compare the advertised payout delay with community signals.',
      'Verify the minimum withdrawal amount and payout caps.',
      'Read payout incidents and repeated complaints.',
      'Do not confuse a marketing certificate with independent proof.',
    ],
    internalLinks: [
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Source audit', href: '/audit' },
      { label: 'Filtered Trustpilot', href: '/trustpilot-prop-firms' },
    ],
  },
  'prop-firm-pas-cher': {
    title: 'Cheap prop firm: discount codes and real cost',
    metaDescription: 'Find a cheap prop firm without ignoring risk: entry price, discount codes, payout, drawdown and funded-stage fees.',
    eyebrow: 'Budget and deals',
    h1: 'Cheap prop firm: the challenge price is not the total cost',
    answer: 'A cheap prop firm can make sense if payout remains credible and funded-stage fees, resets, drawdown and restrictions do not make the account fragile.',
    primaryKeywords: ['cheap prop firm', 'prop firm discount code', 'low cost prop firm'],
    secondaryKeywords: ['prop firm discount', 'cheap challenge', 'discount prop firm', 'challenge price'],
    checks: [
      'Compare entry price with funded-stage fees.',
      'Verify whether the discount changes the conditions.',
      'Do not buy a larger account only because the discount is strong.',
      'Cross-check budget, payout risk and PropRadar score before purchase.',
    ],
    internalLinks: [
      { label: 'Current deals', href: '/promos' },
      { label: 'Price comparator', href: '/comparateur' },
      { label: 'Reliable top firms', href: '/meilleures-prop-firms' },
    ],
  },
  'prop-firm-smc-ict': {
    title: 'Best prop firm for SMC / ICT: drawdown, news and scaling rules',
    metaDescription: 'PropRadar guide for SMC and ICT traders: NAS/US30/forex setups, EOD drawdown, news rules, consistency, execution, payout and firms to compare.',
    eyebrow: 'SMC / ICT style',
    h1: 'Prop firm for SMC / ICT: choose rules that fit liquidity-based trading',
    answer: 'SMC and ICT traders usually need room for intraday scaling, London/New York session setups, indices or major forex pairs, and clear rules around news, drawdown and consistency. A firm can look attractive on price and still block the exact way you trade.',
    primaryKeywords: ['SMC prop firm', 'ICT prop firm', 'best prop firm for SMC'],
    secondaryKeywords: ['futures prop firm', 'EOD drawdown', 'no consistency rule', 'news friendly prop firm', 'London session', 'New York session'],
    checks: [
      'Verify whether news trading is allowed or whether clear windows exist around London and New York.',
      'Confirm the drawdown type: EOD or static is usually easier for scaling than aggressive intraday trailing.',
      'Check whether a consistency rule or daily profit cap can punish one large liquidity-sweep day.',
      'Compare spread and execution on the exact instruments you trade: NAS, US30, ES/NQ, gold or major forex pairs.',
      'Verify payout minimum and payout frequency if your system produces many smaller winning trades.',
      'Check whether adding positions into a setup is treated as normal scaling or as prohibited behavior.',
    ],
    faq: [
      {
        question: 'Are futures prop firms better for SMC / ICT?',
        answer:
          'Often they are easier to analyze for indices because the product, session and tick value are more standardized. But futures firms still need rule checks: drawdown type, payout caps, consistency and news windows matter more than the label.',
      },
      {
        question: 'What is the biggest SMC / ICT risk in a prop firm?',
        answer:
          'The biggest risk is passing the challenge with a normal liquidity-based style, then discovering that news windows, daily drawdown, scaling rules or consistency caps make the funded stage much harder.',
      },
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'News trading', href: '/guides/prop-firm-news-trading' },
      { label: 'Rules', href: '/regles' },
      { label: 'Alpha Futures', href: '/firm/alpha-futures' },
      { label: 'Lucid Trading', href: '/firm/lucid-trading' },
      { label: 'Tradeify', href: '/firm/tradeify' },
    ],
  },
  'prop-firm-swing-trading': {
    title: 'Prop firm swing trading: overnight, weekend and payout',
    metaDescription: 'Guide to prop firms for swing trading: overnight positions, weekends, news, drawdown, payout and holding rules.',
    eyebrow: 'Swing trading',
    h1: 'Prop firm swing trading: verify overnight, weekend and drawdown before price',
    answer: 'For swing trading, you need a firm that allows longer holds, weekends or at least clear rules on rollover, gaps, news and payout timing.',
    primaryKeywords: ['prop firm swing trading', 'prop firm hold overnight', 'prop firm hold weekend'],
    secondaryKeywords: ['overnight prop firm', 'weekend holding', 'swing option', 'forex funded account'],
    checks: [
      'Verify overnight and weekend rules in challenge and funded stages.',
      'Understand whether drawdown is static, EOD or trailing.',
      'Read restrictions around gaps and news.',
      'Compare payout delay with your average trade duration.',
    ],
    internalLinks: [
      { label: 'Trading style tool', href: '/outils' },
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
    ],
  },
  'prop-firm-ea-algo': {
    title: 'Prop firm EA allowed: bots, algo and copy trading',
    metaDescription: 'Which prop firms allow EA, bots or algo trading? Check restrictions, VPS, copy trading, news and payout clauses.',
    eyebrow: 'EA / Algo',
    h1: 'Prop firm EA allowed: permissions, restrictions and payout risks',
    answer: 'An EA-friendly firm must explicitly allow bots, but the real check is copy trading, arbitrage, latency, martingale, VPS usage, multi-account management and payout validation.',
    primaryKeywords: ['prop firm EA allowed', 'prop firm algo trading', 'prop firm bot allowed'],
    secondaryKeywords: ['copy trading prop firm', 'VPS prop firm', 'arbitrage prop firm', 'robot trading'],
    checks: [
      'Verify EA permission in both challenge and funded stages.',
      'Read arbitrage, latency, grid, martingale and copy-trading restrictions.',
      'Test the platform before buying a large account.',
      'Watch payout clauses linked to strategy behavior.',
    ],
    internalLinks: [
      { label: 'Rules', href: '/regles' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  'prop-firm-fiable-trustpilot': {
    title: 'Reliable prop firm: Trustpilot reviews, Reddit and proof',
    metaDescription: 'How to spot a reliable prop firm: Trustpilot, Reddit, payout proof, official sources and conflicts of interest.',
    eyebrow: 'Trust',
    h1: 'Reliable prop firm: do not confuse a high rating with strong proof',
    answer: 'A reliable prop firm combines clear rules, official sources, payout history, consistent community feedback and visible commercial conflicts.',
    primaryKeywords: ['reliable prop firm', 'prop firm reviews', 'prop firm Trustpilot'],
    secondaryKeywords: ['prop firm scam', 'Reddit prop firm', 'prop firm feedback', 'payout proof'],
    checks: [
      'Compare Trustpilot with Reddit and payout incidents.',
      'Verify that official sources are accessible.',
      'Check review volume and context.',
      'Identify affiliate links and commercial conflicts.',
    ],
    internalLinks: [
      { label: 'Trustpilot prop firms', href: '/trustpilot-prop-firms' },
      { label: 'Audit', href: '/audit' },
      { label: 'Payout risks', href: '/risques-payout' },
    ],
  },
  'ftmo-vs-the5ers': {
    title: 'FTMO vs The5ers: rules, price and payout',
    metaDescription: 'FTMO vs The5ers: compare score, price, rules, payout, Trustpilot, trading style, flagship programs and official links.',
    eyebrow: 'Brand comparison',
    h1: 'FTMO vs The5ers: two solid profiles, not the same use case',
    answer: 'FTMO and The5ers are both serious names, but they do not solve the same problem. FTMO is more reference-driven; The5ers can feel more conservative depending on the program. The exact offer matters more than the brand name.',
    primaryKeywords: ['FTMO vs The5ers', 'FTMO or The5ers', 'The5ers vs FTMO'],
    secondaryKeywords: ['FTMO payout', 'The5ers rules', 'prop firm compare', 'forex challenge'],
    checks: [
      'Compare minimum price and target account size.',
      'Read news, EA, drawdown and profit target rules.',
      'Identify coupons, affiliate links and commercial interests.',
      'Choose by trading style, not popularity alone.',
    ],
    internalLinks: [
      { label: 'FTMO', href: '/firm/ftmo' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'Comparator', href: '/comparateur' },
    ],
  },
  'topstep-vs-apex': {
    title: 'Topstep vs Apex: futures comparison',
    metaDescription: 'Topstep vs Apex Trader Funding: compare futures, drawdown, payout, discounts, platforms and risk signals.',
    eyebrow: 'Futures comparison',
    h1: 'Topstep vs Apex: the futures match is decided by rules and payout',
    answer: 'Apex can look attractive because of aggressive discounts and many account sizes. Topstep has a more established futures image. The right comparison is drawdown, recurring fees, payout caps, platform fit and recent community signals.',
    primaryKeywords: ['Topstep vs Apex', 'Apex vs Topstep', 'best futures prop firm'],
    secondaryKeywords: ['Apex Trader Funding discount', 'Topstep payout', 'futures funded account'],
    checks: [
      'Compare discounts with total cost after funded stage.',
      'Verify EOD or trailing drawdown and consistency rules.',
      'Read recent community signals and incidents.',
      'Choose by platform and intraday style.',
    ],
    internalLinks: [
      { label: 'Topstep', href: '/firm/topstep' },
      { label: 'Apex Trader Funding', href: '/firm/apex-trader-funding' },
      { label: 'Futures deals', href: '/promos' },
    ],
  },
  'funderpro-vs-the5ers': {
    title: 'FunderPro vs The5ers: news, EA, swing and payout',
    metaDescription: 'FunderPro vs The5ers: FunderPro PROPRADAR code, The5ers 1EIJ6PO coupon, news trading, EA, swing option, price, score and payout.',
    eyebrow: 'CFD comparison',
    h1: 'FunderPro vs The5ers: flexibility versus a more established profile',
    answer: 'FunderPro can appeal to traders who want news, EA and swing flexibility. The5ers has a more established and conservative profile depending on the selected program.',
    primaryKeywords: ['FunderPro vs The5ers', 'FunderPro review', 'The5ers discount code'],
    secondaryKeywords: ['PROPRADAR code', 'The5ers coupon 1EIJ6PO', 'EA allowed', 'news trading allowed', 'swing option'],
    checks: [
      'Test the discount code at checkout without overbuying.',
      'Verify news, EA and overnight rules on the exact program.',
      'Compare payout delay and withdrawal conditions.',
      'Read official rules before choosing.',
    ],
    internalLinks: [
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
      { label: 'Deals', href: '/promos' },
    ],
  },
  'leveraged-prop-firm-avis': {
    title: 'Get Leveraged prop firm review: CySEC alert, rules and payout risk',
    metaDescription: 'Get Leveraged review: company context, reported CySEC warning, 20% consistency rule, payout proof, Trustpilot alert and points to verify before buying.',
    eyebrow: 'Brand review',
    h1: 'Get Leveraged review: visible offer, but high vigilance before buying',
    answer: 'Get Leveraged has visible marketing, low entry messaging, portfolio-style programs and an advertised 80% split. The decision is not about the headline offer: it is about the reported CySEC warning, strict consistency feedback, unavailable Trustpilot rating and very recent payout proof.',
    primaryKeywords: ['Get Leveraged review', 'Leveraged prop firm review', 'getleveraged.com Trustpilot'],
    secondaryKeywords: ['Get Leveraged payout', '20% consistency rule', 'Cyprus prop firm', 'pay after pass'],
    checks: [
      'Verify whether the chosen program is Jr, Sr, Executive, Turbo or Sprint, then read that exact rule page.',
      'Confirm the current regulatory status on the CySEC website before paying.',
      'Search payout proof from the last 30 days on Discord and Reddit with "Leveraged payout" or "GetLeveraged withdrawal".',
      'Simulate your strategy while respecting the 20% consistency rule as if it were enforced strictly.',
      'Compare the real "pay after you pass" cost, often advertised around $8.88, with the risk of payout refusal.',
    ],
    faq: [
      {
        question: 'Is Get Leveraged safe to buy?',
        answer:
          'PropRadar does not treat it as a simple safe buy. The firm is recent, the Trustpilot rating is unavailable, public feedback mentions strict consistency rules and a reported regulator warning must be checked before purchase.',
      },
      {
        question: 'What is the biggest rule risk on Get Leveraged?',
        answer:
          'The most important rule to verify is the 20% consistency rule: no single trading day should represent more than 20% of total profits. If applied strictly, it can block a payout even after a trader reaches the profit target.',
      },
      {
        question: 'What proof should I look for before buying?',
        answer:
          'Look for recent withdrawal proof from independent traders, not only marketing screenshots. The best proof is dated, tied to a specific program and consistent with the official rules.',
      },
    ],
    internalLinks: [
      { label: 'Leveraged profile', href: '/firm/get-leveraged' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Payout risks', href: '/risques-payout' },
    ],
  },
  'goat-funded-trader-avis': {
    title: 'Goat Funded Trader review: strong offer, but reread the rules',
    metaDescription: 'Goat Funded Trader review: compare 1 step, 2 step, 3 step and Instant models, PROPRADAR code, news trading, weekend holding, payout rules and main risks.',
    eyebrow: 'Brand review',
    h1: 'Goat Funded Trader review: strong offer, but reread the rules before buying',
    answer: 'Goat Funded Trader has a broad and attractive offer: 1 step, 2 step, 3 step and Instant Funding models, several platforms, news-trading options and weekend-holding options. The trap is that rules can change heavily by model, so the exact program matters more than the headline discount.',
    primaryKeywords: ['Goat Funded Trader review', 'GFT prop firm', 'Goat Funded Trader discount code'],
    secondaryKeywords: ['PROPRADAR code', 'GFT payout', 'GFT instant funding', 'Goat Funded Trader rules', 'Goat Funded Trader news trading'],
    checks: [
      'Test the checkout rules before finalizing a large account purchase.',
      'Compare 1 step, 2 step, 3 step and Instant because news, weekend holding, daily loss, max loss and payout delay can differ.',
      'Verify news-trading restrictions, weekend holding, lot size and payout delay on the exact model.',
      'Read recent Reddit, Discord and X feedback from the last 30 to 60 days.',
      'Look for payout denials and the most common rejection reasons on the program you want.',
      'Use the PROPRADAR code after choosing the right model, not before.',
    ],
    faq: [
      {
        question: 'Is Goat Funded Trader reliable?',
        answer:
          'GFT has a visible offer and enough public attention to deserve comparison, but reliability depends on the exact model. The important checks are payout rules, recent payout feedback, news restrictions, weekend holding and whether the trader followed the program rules.',
      },
      {
        question: 'Is the PROPRADAR code enough reason to buy?',
        answer:
          'No. A discount is useful only after you have chosen a model whose rules match your trading. A lower checkout price does not compensate for news, holding, lot-size or payout restrictions that block your style.',
      },
      {
        question: 'Which GFT model is safest to compare first?',
        answer:
          'Start by deciding whether you need speed or rule clarity. 1-step and Instant are faster, while 2-step and 3-step can be easier to evaluate because the validation process gives more time to test discipline before funded-stage rules matter.',
      },
    ],
    internalLinks: [
      { label: 'Goat Funded Trader profile', href: '/firm/goat-funded-trader' },
      { label: 'Prop firm deals', href: '/promos' },
      { label: 'Instant funding', href: '/guides/prop-firm-instant-funding' },
    ],
  },
  'prop-firm-instant-funding': {
    title: 'Instant funding prop firm: fast access, rules and traps',
    metaDescription: 'Compare instant funding prop firms: price, drawdown, payout, profit split, news trading, hidden rule risk and challenge alternatives.',
    eyebrow: 'Instant funding',
    h1: 'Instant funding prop firm: fast does not mean easier',
    answer: 'Instant funding can be useful if you want account access quickly, but you must compare total cost, drawdown, minimum payout, lot limits, news restrictions and withdrawal clauses before paying.',
    primaryKeywords: ['instant funding prop firm', 'prop firm instant funding', 'funded account instant'],
    secondaryKeywords: ['no challenge prop firm', 'instant funded account', 'payout instant funding', 'AquaFunded instant funding'],
    checks: [
      'Compare the instant price with a classic equivalent challenge.',
      'Verify whether the account is truly funded or a simulated product with special rules.',
      'Read daily loss, max loss, payout minimum, lot size and strategy restrictions.',
      'Avoid paying more just to skip a step if your system can handle a normal challenge.',
    ],
    internalLinks: [
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Goat Funded Trader', href: '/firm/goat-funded-trader' },
      { label: 'FunderPro', href: '/firm/funderpro' },
    ],
  },
  'prop-firm-sans-challenge': {
    title: 'No challenge prop firm: the shortcut can cost more',
    metaDescription: 'Compare no-challenge prop firms by payout reliability, funded-stage rules, true cost, drawdown, news policy, community feedback and main risks.',
    eyebrow: 'No challenge',
    h1: 'No challenge prop firm: the shortcut can cost more',
    answer: 'A no-challenge prop firm sells speed: you can access a funded-style account without passing a classic evaluation. That can suit a stable trader, but the shortcut often comes with tighter funded-stage rules, higher real cost and less room for mistakes.',
    primaryKeywords: ['no challenge prop firm', 'prop firm without evaluation', 'direct funded account'],
    secondaryKeywords: ['instant funding', 'funded account direct', 'instant funded account', 'fast prop firm'],
    checks: [
      'Compare the real cost over 3 to 6 months, including entry fee, renewal, reset or scaling costs.',
      'Verify funded-stage rules: drawdown, news, lot size, consistency, scaling and payout clauses.',
      'Check payout minimum and withdrawal frequency, especially if your strategy produces many small wins.',
      'Confirm the drawdown type: static, trailing, EOD or smart drawdown.',
      'Read scaling rules and the conditions for moving to larger accounts.',
      'Avoid this format if your strategy has not been stable for several months.',
    ],
    faq: [
      {
        question: 'Is no-challenge funding easier than a normal challenge?',
        answer:
          'Not necessarily. It removes the evaluation step, but it can make the funded stage stricter. The real test becomes payout rules, drawdown tolerance, minimum withdrawal and whether your trading can survive the direct-account constraints.',
      },
      {
        question: 'Who should consider a no-challenge prop firm?',
        answer:
          'It is better suited to traders who already know their average risk, daily loss profile and payout rhythm. If you are still testing discipline, a smaller classic challenge can be cheaper and safer.',
      },
    ],
    internalLinks: [
      { label: 'Instant funding', href: '/guides/prop-firm-instant-funding' },
      { label: 'Trading style tool', href: '/outils' },
      { label: 'Deals', href: '/promos' },
    ],
  },
  'prop-firm-pour-debutant': {
    title: 'Prop firm for beginners: choose clear rules before account size',
    metaDescription: 'Best prop firm for beginners: compare FTMO, The5ers, Topstep, FundedNext and other beginner-friendly programs by rules, cost, drawdown and payout risk.',
    eyebrow: 'Beginner guide',
    h1: 'Prop firm for beginners: choose the clearest rule, not the biggest account',
    answer: 'For a beginner, the best first choice is rarely the biggest account. A smaller account with readable drawdown, reasonable cost and rules you can actually follow is usually better for learning, confidence and long-term progress.',
    primaryKeywords: ['prop firm for beginners', 'best prop firm for beginners', 'first prop firm challenge'],
    secondaryKeywords: ['easy prop firm', 'beginner prop firm challenge', 'small prop firm account', 'cheap beginner prop firm', 'prop firm rules for beginners'],
    checks: [
      'Start with the smallest account that still lets you test the rules seriously.',
      'Verify that drawdown is realistic and protective for your current skill level.',
      'Avoid discounts that push you into an account size that is too large.',
      'Compare the real cost over 2 to 3 months, including resets or repeated attempts.',
      'Read the complete rules before buying, especially news, holding, drawdown and payout clauses.',
      'Choose clear, dated and easy-to-find rules before looking at split or account size.',
    ],
    faq: [
      {
        question: 'What is the best prop firm for beginners?',
        answer:
          'The best beginner choice is usually a firm with clear rules, a reasonable first account size, understandable drawdown and enough public payout history. The biggest account is rarely the safest first step.',
      },
      {
        question: 'Should beginners start with a large account?',
        answer:
          'Usually no. A smaller account helps you learn rule discipline with less pressure. Once your process survives the first challenge, scaling is easier to justify.',
      },
      {
        question: 'Is the cheapest prop firm the best beginner option?',
        answer:
          'Only if the rules are still readable and payout conditions are clear. A cheap challenge with strict hidden conditions can become more expensive than a slightly higher-priced, cleaner program.',
      },
    ],
    internalLinks: [
      { label: 'Cheap prop firm', href: '/guides/prop-firm-pas-cher' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Trading style tool', href: '/outils' },
    ],
  },
  'meilleure-prop-firm-forex': {
    title: 'Best forex prop firm: MT5, cTrader, payout and rules',
    metaDescription: 'Compare forex prop firms: FTMO, The5ers, FundingPips, FunderPro, GOAT Funded Trader, spreads, news, EA, payout and platforms.',
    eyebrow: 'Forex',
    h1: 'Best forex prop firm: platform, spreads and payout before discounts',
    answer: 'Forex traders should compare platform, spreads, symbol coverage, news rules, EA permissions and payout credibility before looking at account size or discounts.',
    primaryKeywords: ['best forex prop firm', 'forex prop firm', 'prop firm MT5'],
    secondaryKeywords: ['prop firm cTrader', 'FTMO alternative forex', 'FundingPips review', 'The5ers forex'],
    checks: [
      'Compare MT5, cTrader and available symbols.',
      'Verify spreads, commissions and execution rules.',
      'Read news and EA restrictions.',
      'Check payout risk and proof level.',
    ],
    internalLinks: [
      { label: 'Comparator', href: '/comparateur' },
      { label: 'FunderPro', href: '/firm/funderpro' },
      { label: 'The5ers', href: '/firm/the5ers' },
    ],
  },
  'alternatives-ftmo': {
    title: 'FTMO alternatives: cheaper, more flexible or simply better suited?',
    metaDescription: 'Compare FTMO alternatives by price, rule flexibility, news trading, EA, platforms, payout timing, scaling and real trade-offs before switching.',
    eyebrow: 'FTMO alternatives',
    h1: 'FTMO alternatives: cheaper, more flexible or simply better suited?',
    answer: 'Changing prop firm to leave FTMO only makes sense if the alternative solves a real constraint: lower entry cost, more flexible rules, better platform fit, different payout timing or a program better suited to your trading style.',
    primaryKeywords: ['FTMO alternative', 'FTMO alternatives', 'prop firm like FTMO'],
    secondaryKeywords: ['FTMO vs Funding Pips', 'FTMO vs The5ers', 'FunderPro vs FTMO', 'E8 Markets review'],
    checks: [
      'Compare why you want an alternative to FTMO: price, rule flexibility, platform, payout timing or scaling.',
      'Verify real rules on drawdown, news trading, EA and weekend holding.',
      'Read official sources and recent community signals, not only promotions.',
      'Do not leave a reliable firm only because another offer is discounted.',
      'Compare real cost over 3 to 6 months, including resets or repeated attempts.',
    ],
    faq: [
      {
        question: 'What is the best FTMO alternative?',
        answer:
          'There is no universal answer. The5ers can fit conservative scaling, Funding Pips can fit traders comparing modern rule sets, FunderPro can be attractive on price and account size, and E8 Markets is another modern challenge benchmark.',
      },
      {
        question: 'When should I stay with FTMO?',
        answer:
          'Stay with FTMO if your main priority is clear rules, long public history, stable payout reputation and a well-defined two-step structure. A discount alone is not enough reason to switch.',
      },
      {
        question: 'How should I compare FTMO alternatives?',
        answer:
          'Start from the pain point: price, news, EA, platform, payout timing or scaling. Then compare the exact program rules and recent payout feedback before looking at the checkout discount.',
      },
    ],
    internalLinks: [
      { label: 'FTMO', href: '/firm/ftmo' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'FTMO vs The5ers', href: '/guides/ftmo-vs-the5ers' },
    ],
  },
  'prop-firm-avis-reddit-trustpilot': {
    title: 'Prop firm Reddit and Trustpilot reviews: a good rating is not enough',
    metaDescription: 'Learn how to read Trustpilot, Reddit, Discord and X reviews before choosing a prop firm: payout complaints, fake review risk, discount timing and proof quality.',
    eyebrow: 'Review signals',
    h1: 'Prop firm Reddit and Trustpilot reviews: a good rating is not enough',
    answer: 'Trustpilot and Reddit are useful sources, but not when they are read alone. A strong public rating can still hide payout problems, vague rules or aggressive discount campaigns that inflate positive reviews.',
    primaryKeywords: ['prop firm Reddit reviews', 'prop firm Trustpilot', 'prop firm reviews'],
    secondaryKeywords: ['prop firm scam reddit', 'fake Trustpilot reviews', 'payout problem', 'Discord prop firm', 'prop firm payout complaints'],
    checks: [
      'Separate raw rating from filtered reliability: date, removed reviews and promotion timing matter.',
      'Look for repeated payout complaints, not only isolated anger.',
      'Compare the timing of positive reviews with large discount campaigns.',
      'Check whether Discord, X and Reddit tell the same story as Trustpilot.',
      'Look for recent dated payout proof instead of general testimonials.',
    ],
    faq: [
      {
        question: 'Is a 4.8/5 Trustpilot rating enough proof?',
        answer:
          'No. A strong rating is useful only when the review timing, payout proof, Reddit discussions and official rules are coherent. A high score can still hide rule-related withdrawal issues.',
      },
      {
        question: 'Which reviews are most useful?',
        answer:
          'The best reviews mention the exact program, account size, payout date, rule involved and whether the trader has already withdrawn. Generic praise is much weaker evidence.',
      },
      {
        question: 'How should I use Reddit and Discord?',
        answer:
          'Use them to detect repeated patterns: payout delays, denied withdrawals, rule confusion, support pressure or sudden sentiment changes after a promotion.',
      },
    ],
    internalLinks: [
      { label: 'Trustpilot prop firms', href: '/trustpilot-prop-firms' },
      { label: 'Payout proof', href: '/guides/prop-firm-payout-proof' },
      { label: 'Audit', href: '/audit' },
    ],
  },
  'prop-firm-payout-proof': {
    title: 'Prop firm payout proof: how to spot real withdrawal evidence',
    metaDescription: 'Prop firm payout proof guide: identify dated, traceable and consistent withdrawal evidence before trusting marketing claims.',
    eyebrow: 'Payout proof',
    h1: 'Prop firm payout proof: evidence must be dated, traceable and consistent',
    answer: 'A payout screenshot is not enough on its own. Good proof should be dated, connected to a real program, consistent with the rules and supported by more than one public signal.',
    primaryKeywords: ['prop firm payout proof', 'prop firm that actually pays', 'withdrawal proof prop firm'],
    secondaryKeywords: ['payout problem', 'payout denial', 'prop firm withdrawal', 'fast payout'],
    checks: [
      'Check the payout date, program and account type.',
      'Verify whether payout proof comes from the firm or independent users.',
      'Compare proof with rules, minimum withdrawal and caps.',
      'Look for repeated denials or delayed withdrawals.',
    ],
    internalLinks: [
      { label: 'Payout risks', href: '/risques-payout' },
      { label: 'Comparator', href: '/comparateur' },
      { label: 'Fast payout guide', href: '/guides/prop-firm-payout-rapide' },
    ],
  },
};

export function getSeoGuideDisplay(guide: SeoGuide): SeoGuide {
  const override = guideDisplayOverrides[guide.slug] ?? {};
  const title = override.title ?? toEnglishText(guide.title);
  const defaultFaq = [
    {
      question: `How should I use this guide on ${title}?`,
      answer:
        'Use it as a first filter, then verify the exact program, payout rules, drawdown, fees and official sources before buying.',
    },
    {
      question: 'Does a discount change the PropRadar score?',
      answer:
        'No. Affiliate links and discount codes are disclosed separately. A commercial relationship does not protect a firm from risk flags.',
    },
  ];

  return {
    ...guide,
    title,
    metaDescription: override.metaDescription ?? toEnglishText(guide.metaDescription),
    eyebrow: override.eyebrow ?? toEnglishText(guide.eyebrow),
    h1: override.h1 ?? toEnglishText(guide.h1),
    answer: override.answer ?? toEnglishText(guide.answer),
    primaryKeywords: override.primaryKeywords ?? guide.primaryKeywords.map((keyword) => toEnglishText(keyword)),
    secondaryKeywords: override.secondaryKeywords ?? guide.secondaryKeywords.map((keyword) => toEnglishText(keyword)),
    checks: override.checks ?? guide.checks.map((check) => toEnglishText(check)),
    faq: override.faq ?? defaultFaq,
    internalLinks:
      override.internalLinks ??
      guide.internalLinks.map((item) => ({
        ...item,
        label: toEnglishText(item.label),
      })),
  };
}

function isOpenFirm(firm: PropFirm) {
  return !/ferm/i.test(firm.status);
}

function isPayoutAcceptable(firm: PropFirm) {
  return firm.reviewSignals.payoutRisk !== 'Critique';
}

function allowsNewsTrading(firm: PropFirm) {
  return !/(non recommand|not recommended)/i.test(firm.newsTrading);
}

function allowsEaTrading(firm: PropFirm) {
  return !/^(non|no)$/i.test(firm.eaAllowed);
}

function firmSearchText(firm: PropFirm) {
  return [
    firm.name,
    firm.bestFor,
    firm.verdict,
    firm.drawdownType,
    firm.newsTrading,
    firm.eaAllowed,
    firm.payoutDelay,
    firm.styles.join(' '),
    firm.products.map((product) => `${product.name} ${product.description} ${product.consistencyRule ?? ''}`).join(' '),
    firm.strengths.join(' '),
    firm.weaknesses.join(' '),
  ]
    .join(' ')
    .toLowerCase();
}

function scoreSort(a: PropFirm, b: PropFirm) {
  if (b.score !== a.score) return b.score - a.score;
  return a.priceFrom - b.priceFrom;
}

function uniqueFirms(firms: PropFirm[]) {
  const seen = new Set<string>();
  return firms.filter((firm) => {
    if (seen.has(firm.slug)) return false;
    seen.add(firm.slug);
    return true;
  });
}

export function getSeoGuideBySlug(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}

export function selectGuideFirms(guideOrSlug: SeoGuide | string, limit = 10) {
  const guide = typeof guideOrSlug === 'string' ? getSeoGuideBySlug(guideOrSlug) : guideOrSlug;
  if (!guide) return [];

  if (guide.focusFirmSlugs?.length) {
    return guide.focusFirmSlugs
      .map((slug) => propFirms.find((firm) => firm.slug === slug))
      .filter((firm): firm is PropFirm => Boolean(firm));
  }

  const active = propFirms.filter((firm) => isOpenFirm(firm));
  let firms: PropFirm[];

  switch (guide.slug) {
    case 'meilleure-prop-firm-futures':
      firms = active.filter((firm) => firm.styles.some((style) => /futures/i.test(style)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-sans-consistency-rule':
      firms = active.filter((firm) => firm.products.some((product) => !product.hasConsistencyRule) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-news-trading':
      firms = active.filter((firm) => allowsNewsTrading(firm) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-payout-rapide':
      firms = active.filter((firm) => /(24|48|hour|hrs|jour|day|one|instant|rapide|daily)/i.test(firm.payoutDelay) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-payout-proof':
      firms = active.filter((firm) => firm.payoutProof && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-pas-cher':
      firms = active.filter((firm) => firm.priceFrom > 0 && firm.priceFrom <= 100 && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-instant-funding':
    case 'prop-firm-sans-challenge':
      firms = active.filter((firm) => /(instant|direct|sans challenge|no challenge)/i.test(firmSearchText(firm)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-pour-debutant':
      firms = active.filter((firm) => firm.priceFrom > 0 && firm.priceFrom <= 160 && firm.score >= 60 && isPayoutAcceptable(firm));
      break;
    case 'meilleure-prop-firm-forex':
      firms = active.filter((firm) => /(forex|mt4|mt5|ctrader|cfd)/i.test(firmSearchText(firm)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-smc-ict':
      firms = active.filter((firm) => /(forex|intraday|scalping|swing)/i.test(firm.styles.join(' ')) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-swing-trading':
      firms = active.filter((firm) => /(swing|overnight|weekend|hold)/i.test(firmSearchText(firm)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-ea-algo':
      firms = active.filter((firm) => allowsEaTrading(firm) && /(ea|bot|algo|expert|automated|variable|oui|yes|on request)/i.test(firmSearchText(firm)) && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-fiable-trustpilot':
      firms = active.filter((firm) => firm.reviewSignals.trustpilotReliability !== 'Faible' && isPayoutAcceptable(firm));
      break;
    case 'prop-firm-avis-reddit-trustpilot':
      firms = active.filter((firm) => firm.reviewSignals.redditSampleSize && firm.reviewSignals.trustpilotReliability !== 'Faible' && isPayoutAcceptable(firm));
      break;
    default:
      firms = topFirms.filter((firm) => isOpenFirm(firm) && isPayoutAcceptable(firm));
      break;
  }

  return uniqueFirms(firms).sort(scoreSort).slice(0, limit);
}

export function getGuideLastModified(guideOrSlug: SeoGuide | string) {
  const guide = typeof guideOrSlug === 'string' ? getSeoGuideBySlug(guideOrSlug) : guideOrSlug;
  const firms = guide ? selectGuideFirms(guide, 12) : [];
  const dates = firms
    .map((firm) => new Date(firm.lastReviewed).getTime())
    .filter((timestamp) => Number.isFinite(timestamp));

  if (!dates.length) return new Date(SEO_RESEARCH_DATE);
  return new Date(Math.max(...dates, new Date(SEO_RESEARCH_DATE).getTime()));
}

export function getRelatedGuides(currentSlug: string, limit = 3) {
  const current = getSeoGuideBySlug(currentSlug);
  return seoGuides
    .filter((guide) => guide.slug !== currentSlug)
    .filter((guide) => !current || guide.intent === current.intent || guide.primaryKeywords.some((keyword) => current.secondaryKeywords.includes(keyword)))
    .slice(0, limit);
}

export function getFirmRelatedGuides(firm: PropFirm, limit = 4) {
  const firmText = firmSearchText(firm);
  const scoredGuides = seoGuides
    .map((guide) => {
      let score = 0;

      if (guide.focusFirmSlugs?.includes(firm.slug)) score += 80;
      if (selectGuideFirms(guide, 20).some((selectedFirm) => selectedFirm.slug === firm.slug)) score += 45;
      if (guide.primaryKeywords.some((keyword) => firmText.includes(keyword.toLowerCase()))) score += 16;
      if (guide.secondaryKeywords.some((keyword) => firmText.includes(keyword.toLowerCase()))) score += 10;

      if (firm.styles.some((style) => /futures/i.test(style)) && /futures|topstep|apex/i.test(guide.slug)) score += 28;
      if (allowsNewsTrading(firm) && /news-trading|funderpro/i.test(guide.slug)) score += 18;
      if (allowsEaTrading(firm) && /ea-algo|funderpro/i.test(guide.slug)) score += 18;
      if (firm.priceFrom > 0 && firm.priceFrom <= 100 && /pas-cher|promo/i.test(guide.slug)) score += 18;
      if (firm.reviewSignals.payoutRisk !== 'Faible' && /payout|fiable|trustpilot/i.test(guide.slug)) score += 20;
      if (/swing|overnight|weekend/i.test(firmText) && /swing/i.test(guide.slug)) score += 22;
      if (/forex|intraday|scalping/i.test(firm.styles.join(' ')) && /smc|ict|meilleure-prop-firm-2026/i.test(guide.slug)) score += 12;

      return { guide, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const selectedGuides = scoredGuides.slice(0, limit).map((item) => item.guide);
  return selectedGuides.length ? selectedGuides : seoGuides.slice(0, limit);
}
