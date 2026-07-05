import { propFirms, topFirms, type PropFirm } from './propFirms';

export const SEO_RESEARCH_DATE = '2026-07-05';

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
    label: 'Meilleure prop firm',
    intent: 'choisir',
    queries: ['meilleure prop firm', 'best prop firm', 'prop firm fiable', 'classement prop firm'],
    pageSlug: 'meilleure-prop-firm-2026',
    priority: 0.96,
  },
  {
    label: 'Futures funding',
    intent: 'choisir',
    queries: ['meilleure prop firm futures', 'futures prop firm', 'Topstep vs Apex', 'prop firm futures payout'],
    pageSlug: 'meilleure-prop-firm-futures',
    priority: 0.94,
  },
  {
    label: 'Rules et contraintes',
    intent: 'regles',
    queries: ['prop firm sans consistency rule', 'prop firm no consistency', 'trailing drawdown prop firm', 'prop firm sans regle de coherence'],
    pageSlug: 'prop-firm-sans-consistency-rule',
    priority: 0.92,
  },
  {
    label: 'News trading',
    intent: 'style',
    queries: ['prop firm news trading allowed', 'prop firm trading news', 'peut-on trader les news en prop firm'],
    pageSlug: 'prop-firm-news-trading',
    priority: 0.9,
  },
  {
    label: 'Payout',
    intent: 'risque',
    queries: ['prop firm payout rapide', 'prop firm payout proof', 'prop firm retrait rapide', 'prop firm payout problem'],
    pageSlug: 'prop-firm-payout-rapide',
    priority: 0.9,
  },
  {
    label: 'Budget',
    intent: 'promo',
    queries: ['prop firm pas cher', 'cheap prop firm', 'prop firm discount code', 'code promo prop firm'],
    pageSlug: 'prop-firm-pas-cher',
    priority: 0.88,
  },
  {
    label: 'SMC / ICT',
    intent: 'style',
    queries: ['prop firm SMC', 'prop firm ICT trader', 'meilleure prop firm day trading SMC'],
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
    queries: ['FTMO vs The5ers', 'FTMO ou The5ers', 'The5ers avis FTMO', 'meilleure prop firm forex'],
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
    queries: ['FunderPro vs The5ers', 'FunderPro avis', 'The5ers code promo', 'prop firm EA news trading'],
    pageSlug: 'funderpro-vs-the5ers',
    priority: 0.8,
  },
  {
    label: 'Leveraged avis',
    intent: 'risque',
    queries: ['Leveraged prop firm avis', 'Get Leveraged avis', 'getleveraged.com Trustpilot', 'Leveraged payout'],
    pageSlug: 'leveraged-prop-firm-avis',
    priority: 0.79,
  },
  {
    label: 'Fiabilité / scam',
    intent: 'risque',
    queries: ['prop firm fiable', 'prop firm scam', 'prop firm Trustpilot', 'prop firm avis'],
    pageSlug: 'prop-firm-fiable-trustpilot',
    priority: 0.89,
  },
  {
    label: 'GOAT Funded Trader avis',
    intent: 'risque',
    queries: ['Goat Funded Trader avis', 'GFT prop firm review', 'Goat Funded Trader code promo', 'Goat Funded Trader payout'],
    pageSlug: 'goat-funded-trader-avis',
    priority: 0.88,
  },
  {
    label: 'Instant funding',
    intent: 'choisir',
    queries: ['prop firm instant funding', 'instant funding prop firm', 'prop firm sans challenge', 'funded account instant'],
    pageSlug: 'prop-firm-instant-funding',
    priority: 0.87,
  },
  {
    label: 'Sans challenge',
    intent: 'choisir',
    queries: ['prop firm sans challenge', 'prop firm sans evaluation', 'instant funded account', 'prop firm no challenge'],
    pageSlug: 'prop-firm-sans-challenge',
    priority: 0.85,
  },
  {
    label: 'Débutant',
    intent: 'choisir',
    queries: ['prop firm pour débutant', 'best prop firm for beginners', 'prop firm facile', 'première prop firm'],
    pageSlug: 'prop-firm-pour-debutant',
    priority: 0.84,
  },
  {
    label: 'Forex',
    intent: 'choisir',
    queries: ['meilleure prop firm forex', 'forex prop firm', 'prop firm MT5', 'prop firm cTrader'],
    pageSlug: 'meilleure-prop-firm-forex',
    priority: 0.83,
  },
  {
    label: 'Alternatives FTMO',
    intent: 'comparer',
    queries: ['alternative FTMO', 'FTMO alternatives', 'prop firm comme FTMO', 'FTMO ou FundingPips'],
    pageSlug: 'alternatives-ftmo',
    priority: 0.82,
  },
  {
    label: 'Avis Reddit Trustpilot',
    intent: 'risque',
    queries: ['prop firm avis reddit', 'prop firm Trustpilot fiable', 'prop firm scam reddit', 'avis prop firm'],
    pageSlug: 'prop-firm-avis-reddit-trustpilot',
    priority: 0.81,
  },
  {
    label: 'Payout proof',
    intent: 'risque',
    queries: ['prop firm payout proof', 'prop firm qui paie vraiment', 'prop firm payout problem', 'preuve payout prop firm'],
    pageSlug: 'prop-firm-payout-proof',
    priority: 0.8,
  },
];

export const seoGuides: SeoGuide[] = [
  {
    slug: 'meilleure-prop-firm-2026',
    title: 'Meilleure prop firm 2026 : classement fiable',
    metaDescription:
      'Comparer les meilleures prop firms : score, payout, prix, Trustpilot filtré, Reddit, règles, plateformes et points de vigilance avant achat.',
    eyebrow: 'Guide SEO principal',
    h1: 'Meilleure prop firm : le classement qui part du risque, pas du marketing',
    intent: 'choisir',
    demandSignal: 'Recherche large et très concurrentielle : les traders veulent une réponse rapide, puis des preuves.',
    answer:
      "La meilleure prop firm n'est pas toujours celle qui affiche le plus gros split. Le bon choix combine règles lisibles, payout crédible, coût total raisonnable, plateforme adaptée et historique suffisamment stable.",
    primaryKeywords: ['meilleure prop firm', 'best prop firm', 'prop firm fiable'],
    secondaryKeywords: ['classement prop firm', 'prop firm avis', 'prop firm payout', 'prop firm Trustpilot'],
    checks: [
      'Vérifier le score PropRadar et le risque payout avant le prix.',
      'Comparer le drawdown, les objectifs et les jours minimum de trading.',
      'Lire les sources officielles conservées sur la fiche.',
      'Séparer les avis Trustpilot du signal Reddit et des incidents payout.',
    ],
    faq: [
      {
        question: 'Quelle est la meilleure prop firm pour commencer ?',
        answer:
          'Une firm avec règles lisibles, prix raisonnable, payout faible risque et historique stable. Le bon choix dépend aussi du marché et du style de trading.',
      },
      {
        question: 'Une prop firm avec une grosse promo est-elle meilleure ?',
        answer:
          "Non. Une promo baisse le coût d'entrée, mais elle ne compense pas une règle de retrait dangereuse ou un risque payout élevé.",
      },
    ],
    internalLinks: [
      { label: 'Comparateur complet', href: '/comparateur' },
      { label: 'Risques payout', href: '/risques-payout' },
      { label: 'Promos vérifiées', href: '/promos' },
    ],
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
    title: 'Goat Funded Trader avis : code PROPRADAR, règles et payout',
    metaDescription:
      'Avis Goat Funded Trader / GFT : code PROPRADAR, lien inscription, modèles 1 step, 2 step, 3 step, Instant, news trading, weekend holding et payout.',
    eyebrow: 'Avis marque',
    h1: 'Goat Funded Trader avis : promo visible, mais règles à relire avant achat',
    intent: 'risque',
    demandSignal:
      "Recherche de décision marque : l'utilisateur veut savoir si GFT est fiable, si le code marche, quel modèle choisir et quels risques vérifier avant paiement.",
    answer:
      "Goat Funded Trader attire avec des promotions fortes, des modèles 1 step, 2 step, 3 step et Instant, news trading, weekend holding et un code PropRadar à tester au checkout. Le bon réflexe est de comparer le modèle exact avant de regarder la remise.",
    primaryKeywords: ['Goat Funded Trader avis', 'GFT prop firm', 'Goat Funded Trader code promo'],
    secondaryKeywords: ['code PROPRADAR', 'GFT payout', 'Goat Funded Trader review', 'GFT instant funding'],
    checks: [
      'Tester le code PROPRADAR au checkout sans choisir une taille trop grande.',
      'Comparer 1 step, 2 step, 3 step et Instant : les règles ne sont pas identiques.',
      'Vérifier news trading, weekend holding, daily loss, max loss et payout delay.',
      'Lire les avis récents avec prudence : promo forte ne veut pas dire risque faible.',
    ],
    faq: [
      {
        question: 'Le code PROPRADAR marche-t-il chez Goat Funded Trader ?',
        answer:
          "Le code doit être testé au checkout avec le lien d'inscription PropRadar. La réduction exacte peut dépendre du modèle, de la période et du panier.",
      },
      {
        question: 'Quel modèle GFT choisir ?',
        answer:
          "Le modèle Instant attire si tu veux éviter une évaluation longue. Les modèles 1 step, 2 step ou 3 step peuvent être plus lisibles si tu veux réduire le coût ou étaler le risque.",
      },
    ],
    internalLinks: [
      { label: 'Fiche Goat Funded Trader', href: '/firm/goat-funded-trader' },
      { label: 'Promos prop firms', href: '/promos' },
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
    title: 'Prop firm sans challenge : instant funding ou faux raccourci ?',
    metaDescription:
      'Prop firm sans challenge : comprendre instant funding, comptes directs, frais, drawdown, payout et risques avant de payer plus cher.',
    eyebrow: 'Sans challenge',
    h1: 'Prop firm sans challenge : le raccourci peut coûter plus cher',
    intent: 'choisir',
    demandSignal:
      "Recherche d'achat rapide : l'utilisateur veut éviter les phases de challenge, mais il doit savoir ce qu'il perd en lisibilité et en coût.",
    answer:
      "Une prop firm sans challenge vend surtout du temps. Elle peut être intéressante pour un trader déjà stable, mais risquée pour un débutant qui n'a pas encore testé sa discipline sous règles strictes.",
    primaryKeywords: ['prop firm sans challenge', 'prop firm sans évaluation', 'prop firm no challenge'],
    secondaryKeywords: ['instant funding', 'funded account direct', 'compte funded immédiat', 'prop firm rapide'],
    checks: [
      'Comparer le prix du compte direct avec le prix d’un challenge classique.',
      'Vérifier si les règles de payout sont plus strictes que sur une évaluation normale.',
      'Regarder la perte maximale réelle avant le premier retrait.',
      'Éviter ce format si tu n’as pas encore un historique de trading stable.',
    ],
    faq: [
      {
        question: 'Peut-on avoir une prop firm sans challenge ?',
        answer:
          "Oui, certaines offres instant/direct existent. Elles ne suppriment pas le risque : elles déplacent souvent la difficulté vers les frais, le drawdown ou le payout.",
      },
      {
        question: 'Pour qui le sans challenge est-il adapté ?',
        answer:
          "Plutôt pour un trader déjà régulier qui connaît ses pertes moyennes. Pour un débutant, un petit challenge classique peut être plus formateur et moins cher.",
      },
    ],
    internalLinks: [
      { label: 'Instant funding', href: '/guides/prop-firm-instant-funding' },
      { label: 'Outil style trading', href: '/outils' },
      { label: 'Promos', href: '/promos' },
    ],
  },
  {
    slug: 'prop-firm-pour-debutant',
    title: 'Prop firm pour débutant : commencer sans exploser son budget',
    metaDescription:
      'Meilleure prop firm pour débutant : petit compte, règles lisibles, drawdown simple, payout clair, erreurs fréquentes et firms à comparer.',
    eyebrow: 'Débutant',
    h1: 'Prop firm pour débutant : choisir la règle la plus lisible, pas le plus gros compte',
    intent: 'choisir',
    demandSignal:
      "Recherche d'entrée de marché : le trader veut savoir par où commencer, combien payer et quelles erreurs éviter sur son premier challenge.",
    answer:
      "Pour débuter, le meilleur choix est rarement le compte le plus gros. Il vaut mieux une petite taille, un drawdown compréhensible, un prix raisonnable et des règles que tu peux respecter sans changer ton trading.",
    primaryKeywords: ['prop firm pour débutant', 'best prop firm for beginners', 'première prop firm'],
    secondaryKeywords: ['prop firm facile', 'challenge débutant', 'petit compte prop firm', 'prop firm pas cher débutant'],
    checks: [
      'Commencer avec une taille de compte modeste pour tester les règles.',
      'Privilégier drawdown lisible, payout clair et support accessible.',
      'Éviter les promos qui poussent à acheter trop gros.',
      'Comparer le coût d’un reset avant de choisir.',
    ],
    faq: [
      {
        question: 'Quelle taille de compte choisir pour débuter ?',
        answer:
          'Une petite taille suffit souvent pour apprendre les règles et limiter le stress. Le but du premier challenge est de valider ton process, pas de maximiser le capital affiché.',
      },
      {
        question: 'Une prop firm pas chère est-elle idéale pour débuter ?',
        answer:
          "Elle peut l'être si les règles restent propres. Si le faible prix cache un drawdown trop serré ou un payout compliqué, ce n'est pas un bon départ.",
      },
    ],
    internalLinks: [
      { label: 'Prop firm pas cher', href: '/guides/prop-firm-pas-cher' },
      { label: 'Comparateur', href: '/comparateur' },
      { label: 'Méthodologie', href: '/methodologie' },
    ],
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
    title: 'Alternatives FTMO : quelles prop firms comparer avant achat ?',
    metaDescription:
      'Alternatives FTMO : The5ers, FundingPips, FunderPro, E8 Markets, Alpha Capital Group, prix, règles, payout, news et plateformes.',
    eyebrow: 'Alternatives FTMO',
    h1: 'Alternatives FTMO : chercher moins cher, plus flexible ou plus adapté',
    intent: 'comparer',
    demandSignal:
      "Recherche comparative : l'utilisateur connaît FTMO mais veut savoir si une autre firm colle mieux à son budget, son style ou ses règles.",
    answer:
      "Une alternative FTMO peut être intéressante si tu veux un ticket plus bas, plus de flexibilité news/EA, une autre plateforme ou un modèle de drawdown différent. Mais FTMO reste une référence : l’alternative doit apporter un vrai avantage, pas seulement une remise.",
    primaryKeywords: ['alternative FTMO', 'FTMO alternatives', 'prop firm comme FTMO'],
    secondaryKeywords: ['FTMO vs FundingPips', 'FTMO vs The5ers', 'FunderPro vs FTMO', 'E8 Markets avis'],
    checks: [
      'Comparer le coût total, pas seulement le prix du challenge.',
      'Vérifier ce que l’alternative apporte vraiment : plateforme, news, EA, payout ou drawdown.',
      'Lire Trustpilot et Reddit sans oublier les sources officielles.',
      'Ne pas quitter une firm fiable juste pour une promo temporaire.',
    ],
    faq: [
      {
        question: 'Quelle est la meilleure alternative à FTMO ?',
        answer:
          'Cela dépend du besoin : The5ers pour un profil prudent, FunderPro pour plus de flexibilité, FundingPips ou E8 pour comparer des challenges modernes. Il faut vérifier les règles actuelles.',
      },
      {
        question: 'FTMO est-elle encore intéressante ?',
        answer:
          'Oui pour beaucoup de traders qui veulent un cadre connu. Les alternatives deviennent intéressantes si elles répondent mieux à une contrainte précise.',
      },
    ],
    internalLinks: [
      { label: 'FTMO vs The5ers', href: '/guides/ftmo-vs-the5ers' },
      { label: 'Comparateur', href: '/comparateur' },
      { label: 'Top firms fiables', href: '/meilleures-prop-firms' },
    ],
    focusFirmSlugs: ['the5ers', 'funding-pips', 'funderpro', 'e8-markets', 'alpha-capital-group', 'ftmo'],
  },
  {
    slug: 'prop-firm-avis-reddit-trustpilot',
    title: 'Prop firm avis Reddit et Trustpilot : comment lire les signaux',
    metaDescription:
      'Lire les avis prop firm sur Reddit, Trustpilot, X et Discord : faux avis, plaintes payout, preuves, volume, récence et biais marketing.',
    eyebrow: 'Avis publics',
    h1: 'Prop firm avis Reddit et Trustpilot : une bonne note ne suffit pas',
    intent: 'risque',
    demandSignal:
      "Recherche de confiance : le trader veut savoir si les avis sont vrais, manipulés, récents ou utiles pour juger le payout.",
    answer:
      "Reddit, Trustpilot, X et Discord ne racontent pas la même chose. Trustpilot donne du volume, Reddit donne souvent des plaintes détaillées, X réagit vite, Discord montre la communauté active. Il faut croiser les quatre avant de conclure.",
    primaryKeywords: ['prop firm avis reddit', 'prop firm Trustpilot', 'avis prop firm'],
    secondaryKeywords: ['prop firm scam reddit', 'faux avis Trustpilot', 'payout problem', 'Discord prop firm'],
    checks: [
      'Regarder la date des avis, pas seulement la note moyenne.',
      'Séparer avis support, avis payout et avis après achat récent.',
      'Vérifier si la firm répond aux avis négatifs.',
      'Chercher des preuves de payout et pas seulement des captures marketing.',
    ],
    faq: [
      {
        question: 'Trustpilot suffit-il pour choisir une prop firm ?',
        answer:
          'Non. Trustpilot donne un signal utile, mais il faut le croiser avec Reddit, X, Discord, les règles officielles et les preuves de payout.',
      },
      {
        question: 'Pourquoi Reddit semble souvent plus négatif ?',
        answer:
          'Les traders satisfaits postent moins que les traders bloqués. Reddit est utile pour repérer les problèmes, pas pour mesurer seul la qualité globale.',
      },
    ],
    internalLinks: [
      { label: 'Trustpilot prop firms', href: '/trustpilot-prop-firms' },
      { label: 'Risques payout', href: '/risques-payout' },
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
];

function isOpenFirm(firm: PropFirm) {
  return !/ferm/i.test(firm.status);
}

function isPayoutAcceptable(firm: PropFirm) {
  return firm.reviewSignals.payoutRisk !== 'Critique';
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
      firms = active.filter((firm) => !/non/i.test(firm.newsTrading) && isPayoutAcceptable(firm));
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
      firms = active.filter((firm) => firm.eaAllowed !== 'Non' && /(ea|bot|algo|expert|automated|variable|oui)/i.test(firmSearchText(firm)) && isPayoutAcceptable(firm));
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
      if (!/non/i.test(firm.newsTrading) && /news-trading|funderpro/i.test(guide.slug)) score += 18;
      if (firm.eaAllowed !== 'Non' && /ea-algo|funderpro/i.test(guide.slug)) score += 18;
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
