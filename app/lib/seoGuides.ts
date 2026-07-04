import { propFirms, topFirms, type PropFirm } from './propFirms';

export const SEO_RESEARCH_DATE = '2026-07-02';

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
];

export const seoGuides: SeoGuide[] = [
  {
    slug: 'meilleure-prop-firm-2026',
    title: 'Meilleure prop firm 2026 : classement fiable',
    metaDescription:
      'Classement PropRadar des meilleures prop firms : score, payout, prix, Trustpilot filtré, Reddit, règles et conflits commerciaux.',
    eyebrow: 'Guide SEO principal',
    h1: 'Meilleure prop firm : le classement qui part du risque, pas du marketing',
    intent: 'choisir',
    demandSignal: 'Recherche large et très concurrentielle : les traders veulent une réponse rapide, puis des preuves.',
    answer:
      "La meilleure prop firm n'est pas toujours celle qui affiche le plus gros split. PropRadar privilégie la stabilité, les payouts crédibles, la clarté des règles et la transparence commerciale.",
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
    secondaryKeywords: ['payout minimum', 'trailing drawdown', 'drawdown static', 'regles prop firm'],
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
          'PropRadar utilise les produits, les sources officielles et les signaux de fiche. Les guides se mettent à jour quand ces données changent.',
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
      'Evaluer le drawdown journalier avant de trader un spike.',
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
        question: 'Pourquoi PropRadar penalise le risque payout ?',
        answer:
          "Parce qu'une prop firm rentable sur le papier devient inutile si les retraits sont difficiles ou contestés.",
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
          'La moins chère change souvent avec les promos. PropRadar affiche les petits tickets mais garde le risque payout visible.',
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
      'Comparer le payout delay avec la duree moyenne des trades.',
    ],
    faq: [
      {
        question: 'Toutes les prop firms acceptent-elles le swing trading ?',
        answer:
          'Non. Certaines limitent overnight, weekend ou news. Il faut relire le programme exact.',
      },
      {
        question: 'Quel drawdown est preferable pour swing trading ?',
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
        question: 'Le copy trading est-il toujours autorise ?',
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
        question: 'Pourquoi garder les firms à risque dans PropRadar ?',
        answer:
          'Pour que les traders voient les alertes au lieu de tomber sur une page marketing sans contexte.',
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
      'Comparatif FTMO vs The5ers par PropRadar : score, prix, règles, payout, Trustpilot, style de trading et liens officiels.',
    eyebrow: 'Comparatif marque',
    h1: 'FTMO vs The5ers : deux profils solides, pas le même usage',
    intent: 'comparer',
    demandSignal: "Le lecteur n'est plus en phase de curiosité : il hésite souvent entre deux achats possibles et veut savoir lequel correspond vraiment à son profil.",
    answer:
      "FTMO et The5ers sont deux profils solides, mais ils ne répondent pas au même besoin. FTMO rassure par son historique, son cadre très documenté et son image de référence. The5ers parle davantage aux traders prudents qui veulent des limites plus lisibles selon le programme. Le bon choix dépend du style de trading, du budget, du drawdown accepté, des restrictions news/EA et du niveau de confort avec les règles de payout.",
    primaryKeywords: ['FTMO vs The5ers', 'FTMO ou The5ers', 'The5ers avis FTMO'],
    secondaryKeywords: ['FTMO payout', 'The5ers rules', 'prop firm compare', 'challenge forex'],
    checks: [
      'Comparer le prix minimum et la taille de compte visée.',
      'Lire les règles de news, EA, drawdown et profit target.',
      'Regarder la transparence commerciale affichée par PropRadar.',
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
    demandSignal: "Le lecteur cherche surtout à comprendre le coût réel, le drawdown, les conditions de retrait et le niveau de confiance payout avant d'acheter une évaluation futures.",
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
      'Lire la fiche PropRadar avant de choisir.',
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
    case 'prop-firm-pas-cher':
      firms = active.filter((firm) => firm.priceFrom > 0 && firm.priceFrom <= 100 && isPayoutAcceptable(firm));
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
