import type { GuideArticle } from './guideArticles';

/**
 * French articles served under /fr/[slug].
 *
 * Written in French for French-speaking traders, not machine-translated.
 * `enPath` links each article to its English counterpart (hreflang pair).
 * Firm-specific facts must stay dated and sourced, like the English guides.
 */

export type FrArticle = GuideArticle & {
  slug: string;
  enPath?: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  answer: string;
  keywords: string[];
  faq: { question: string; answer: string }[];
  firmSlugs: string[];
  related: string[];
};

export const frArticles: FrArticle[] = [
  {
    slug: 'meilleures-prop-firms-2026',
    enPath: '/best-prop-firms',
    title: 'Meilleures prop firms 2026 : classement par fiabilité',
    metaDescription:
      'Quelles sont les meilleures prop firms en 2026 ? Classement indépendant par fiabilité des payouts, clarté des règles, transparence juridique et avis vérifiés.',
    eyebrow: 'Classement 2026',
    h1: 'Meilleures prop firms 2026 : le classement par fiabilité',
    answer:
      'Il n\'existe pas de meilleure prop firm universelle, mais certaines sont nettement plus sûres que d\'autres. En octobre 2026, les scores PropRadar les plus élevés reviennent à FTMO (91/100), The5ers (85/100) et Topstep (84/100) : les historiques publics les plus longs, les règles les plus lisibles et le moins de signaux de payout non résolus.',
    keywords: ['meilleure prop firm', 'meilleures prop firms 2026', 'classement prop firm', 'prop firm fiable'],
    updated: '2026-10-23',
    intro:
      'Choisir une prop firm, c\'est d\'abord choisir un opérateur à qui vous confiez des frais de challenge et, plus tard, des payouts. Avant de comparer les pourcentages de partage des profits ou les codes promo, ce classement vérifie la question qui compte le plus : cette société sera-t-elle encore là, et paiera-t-elle, le jour où vous aurez gagné ?',
    sections: [
      {
        heading: 'Comment ce classement est construit',
        paragraphs: [
          'Chaque prop firm suivie par PropRadar reçoit un score sur 100, calculé à partir de la clarté des règles, des preuves de payout, de la transparence juridique (entité, juridiction, conditions générales), des signaux d\'avis publics et de l\'ancienneté. Les liens d\'affiliation sont signalés sur chaque fiche et ne modifient jamais un score : une firme partenaire garde ses points faibles affichés, et une firme sans partenariat peut être en tête.',
          'Le score n\'est pas une promesse de paiement. C\'est un résumé des preuves disponibles à une date donnée. Chaque changement est daté dans l\'historique de la fiche concernée.',
        ],
      },
      {
        heading: 'Le trio de tête en octobre 2026',
        paragraphs: [
          'FTMO (91/100), fondée en 2015 en République tchèque, reste la référence du marché forex/CFD : règles détaillées, historique long, note Trustpilot de 4,8 sur près de 55 000 avis. Elle n\'est pas la moins chère, avec des challenges à partir d\'environ 155 $.',
          'The5ers (85/100), fondée en 2016 avec des entités en Israël et au Royaume-Uni, se distingue par des limites de perte souvent statiques et des programmes variés, à partir d\'environ 39 $. Note Trustpilot : 4,7 sur plus de 40 000 avis.',
          'Topstep (84/100), fondée en 2012 à Chicago, est la plus ancienne prop firm de futures. Son point fort est son historique ; ses limites sont une offre réservée aux futures, l\'obligation de clôturer chaque soir et des règles souvent modifiées depuis fin 2025.',
          'Transparence : PropRadar a une relation d\'affiliation avec FTMO et The5ers, pas avec Topstep. Cette relation n\'a aucun effet sur les scores.',
        ],
      },
      {
        heading: 'Étape 1 : choisir son marché',
        paragraphs: [
          'Un trader forex/CFD et un trader futures ne cherchent pas au même endroit. Les prop firms forex (FTMO, The5ers) fonctionnent sur MT5 ou cTrader avec des limites en pourcentage. Les prop firms futures (Topstep, Apex) utilisent des plateformes futures, des limites en dollars et souvent un drawdown suiveur. Filtrez d\'abord par marché : la meilleure firme futures ne sert à rien à un trader forex.',
        ],
      },
      {
        heading: 'Étape 2 : faire correspondre les règles à votre style',
        paragraphs: [
          'Ce ne sont pas les objectifs de profit qui font perdre la plupart des comptes, mais le type de drawdown, la perte journalière maximale, la règle de consistance, les restrictions sur les annonces économiques et la détention overnight. Lisez toujours les règles du compte financé, souvent plus strictes que celles du challenge.',
        ],
        bullets: [
          'Drawdown : une limite statique laisse beaucoup plus de marge qu\'un drawdown suiveur.',
          'Consistance : vérifiez si elle s\'applique au challenge, aux payouts, ou aux deux.',
          'News et overnight : indispensables pour les traders d\'annonces et les swing traders.',
          'Payouts : fréquence, montant minimum, plafond des premiers retraits et frais.',
        ],
      },
      {
        heading: 'Étape 3 : comparer le coût réel',
        paragraphs: [
          'Le coût réel d\'une prop firm, c\'est tout ce que vous dépensez avant votre premier payout : challenges, resets, frais d\'activation et comptes de remplacement, moins un éventuel remboursement. Un challenge bon marché avec un drawdown sévère peut coûter plus cher qu\'un challenge plus onéreux que vous avez de bonnes chances de réussir. Les codes promo viennent en dernier.',
        ],
      },
    ],
    faq: [
      {
        question: 'Quelle est la prop firm la plus fiable en 2026 ?',
        answer:
          'Selon les preuves recensées par PropRadar en octobre 2026, FTMO obtient le score le plus élevé (91/100), suivie de The5ers (85/100) et Topstep (84/100). La meilleure firme dépend toutefois de votre marché et de votre style.',
      },
      {
        question: 'Les prop firms sont-elles réglementées ?',
        answer:
          'En général non : la plupart présentent leur offre comme du trading simulé et des services éducatifs, pas comme un service d\'investissement. C\'est pourquoi l\'entité juridique, la juridiction et l\'historique de paiement comptent autant.',
      },
      {
        question: 'Un lien d\'affiliation influence-t-il le classement ?',
        answer: 'Non. Les relations commerciales sont affichées sur chaque fiche et n\'entrent pas dans le calcul du score.',
      },
    ],
    firmSlugs: ['ftmo', 'the5ers', 'topstep', 'funderpro', 'apex-trader-funding'],
    related: ['ftmo-vs-the5ers', 'drawdown-prop-firm', 'regle-de-consistance-prop-firm'],
  },

  {
    slug: 'prop-firm-sans-challenge',
    enPath: '/guides/prop-firm-no-challenge',
    title: 'Prop firm sans challenge : vaut-il le coup en 2026 ?',
    metaDescription:
      'Prop firm sans challenge et financement instantané : comment ça marche, combien ça coûte vraiment, quelles règles restent et pour qui c\'est rentable.',
    eyebrow: 'Sans challenge',
    h1: 'Prop firm sans challenge : le raccourci peut coûter plus cher',
    answer:
      'Oui, certaines prop firms vendent un compte financé directement, sans challenge. Mais vous payez plus cher pour sauter l\'évaluation, et les règles du challenge (drawdown, consistance, plafonds de payout) se retrouvent sur le compte financé, où une erreur coûte le compte au lieu d\'un nouvel essai.',
    keywords: ['prop firm sans challenge', 'financement instantané prop firm', 'instant funding', 'compte financé direct'],
    updated: '2026-10-23',
    intro:
      'Une prop firm « sans challenge » vend un compte financé directement, sans phase d\'évaluation. Sur le papier, c\'est un raccourci. Dans les faits, vous payez la sélection d\'avance, et la sélection continue après l\'achat.',
    sections: [
      {
        heading: 'Ce que « sans challenge » veut vraiment dire',
        paragraphs: [
          'Dans le modèle classique, vous payez des frais, vous atteignez un objectif de profit sans dépasser une perte journalière et un drawdown maximum, parfois en deux phases, puis vous tradez un compte financé qui peut verser des payouts. Le financement direct, appelé aussi instant funding, supprime cette première étape : vous achetez le compte financé et pouvez demander un payout dès que ses propres conditions sont remplies.',
          'Ce qui disparaît, c\'est l\'objectif de profit avant le financement. Ce qui reste, c\'est le contrôle du risque : un drawdown maximum, souvent suiveur, et fréquemment une règle de consistance, un nombre minimum de jours de trading ou un premier payout plafonné. La firme doit toujours filtrer les traders ; elle le fait simplement après votre paiement.',
        ],
      },
      {
        heading: 'Pourquoi le financement instantané coûte plus cher',
        paragraphs: [
          'Le challenge sert de filtre : une grande partie des acheteurs n\'atteint jamais de payout, et leurs frais financent ceux qui y arrivent. Quand vous sautez ce filtre, la firme intègre ce risque dans le prix du compte. D\'où des comptes directs souvent plusieurs fois plus chers qu\'un challenge de même taille, des tailles plus petites et un drawdown plus serré.',
          'Comparez le coût complet jusqu\'au premier payout, pas le prix affiché. Exemple avec des chiffres ronds : un challenge à 100 $ avec une chance sur trois de réussite coûte environ 300 $ en moyenne pour être financé. Un compte instantané à 350 $ avec un drawdown suiveur serré peut coûter davantage si vous en perdez un ou deux avant le premier retrait.',
        ],
      },
      {
        heading: 'Les règles qui décident si un compte direct est rentable',
        paragraphs: ['Lisez les conditions du compte financé, pas la page marketing :'],
        bullets: [
          'Type de drawdown : un drawdown qui suit votre plus haut est bien plus contraignant qu\'une limite fixe.',
          'Règle de consistance : beaucoup de programmes instantanés limitent la part du profit réalisée sur votre meilleure journée.',
          'Conditions du premier payout : jours minimum, profit minimum, plafond des premiers retraits.',
          'Partage des profits de départ : il commence parfois plus bas que sur les challenges.',
          'Coût de remplacement après une violation de règle.',
          'Stratégies interdites : fenêtres d\'annonces, durée minimale des trades, copy trading.',
        ],
      },
      {
        heading: 'Pour qui le financement direct a du sens',
        paragraphs: [
          'Il convient à un trader dont la stratégie est stable, avec un drawdown faible et un historique de respect des limites journalières, qui préfère gagner du temps plutôt que de l\'argent. Il convient mal à un trader qui teste encore sa stratégie, à un style volatil qui a besoin de marge, ou à quelqu\'un qui veut surtout fuir la pression de l\'objectif de profit : elle est remplacée par la pression d\'un drawdown en direct sur un compte plus cher.',
          'En cas de doute, un challenge en une étape bon marché reste souvent le meilleur test avant d\'acheter un compte direct.',
        ],
      },
      {
        heading: 'Signaux d\'alerte propres au financement instantané',
        paragraphs: [
          'Les programmes instantanés attirent beaucoup de firmes récentes et très marketing. Méfiez-vous des très gros comptes à très bas prix, des promesses de payout sans politique de paiement publiée, des règles différentes entre la page d\'accueil et les conditions générales, et des clauses qui permettent de refuser un payout « à la seule discrétion » de la firme. Consultez la fiche PropRadar de la firme avant d\'acheter.',
        ],
      },
    ],
    faq: [
      {
        question: 'Une prop firm sans challenge est-elle une arnaque ?',
        answer:
          'Pas forcément : c\'est un modèle commercial légitime. Mais il est utilisé par de nombreuses firmes récentes. Vérifiez l\'entité juridique, la politique de payout et les signaux publics avant d\'acheter.',
      },
      {
        question: 'Le financement instantané est-il moins cher qu\'un challenge ?',
        answer:
          'Rarement. Le compte coûte plus cher à l\'achat et les règles du compte financé sont souvent plus serrées. Comparez le coût total jusqu\'au premier payout.',
      },
    ],
    firmSlugs: ['the5ers', 'ftmo', 'goat-funded-trader', 'fundednext'],
    related: ['drawdown-prop-firm', 'regle-de-consistance-prop-firm', 'meilleures-prop-firms-2026'],
  },

  {
    slug: 'regle-de-consistance-prop-firm',
    enPath: '/guides/prop-firm-no-consistency-rule',
    title: 'Règle de consistance prop firm : calcul et exemples',
    metaDescription:
      'Règle de consistance en prop firm : formule de calcul, exemples chiffrés, différence entre challenge et payout, et règles actuelles de Topstep et FTMO.',
    eyebrow: 'Règles expliquées',
    h1: 'Règle de consistance en prop firm : comment elle se calcule',
    answer:
      'La règle de consistance limite la part de votre profit total qui peut venir d\'une seule journée. Calcul : profit de la meilleure journée divisé par le profit total, multiplié par 100. Au-dessus de la limite (souvent 40 à 55 %), vous devez simplement gagner davantage avant de valider le challenge ou de demander un payout.',
    keywords: ['règle de consistance prop firm', 'consistency rule', 'prop firm sans règle de consistance', 'best day rule'],
    updated: '2026-10-23',
    intro:
      'La règle de consistance existe parce qu\'une journée chanceuse, une position surdimensionnée ou un pic sur une annonce peuvent produire un payout qui ne dit rien de votre capacité à trader le compte dans la durée. Comprendre la formule exacte est plus utile que chercher à tout prix une firme qui n\'en a pas.',
    sections: [
      {
        heading: 'La formule de calcul',
        paragraphs: [
          'La plupart des firmes utilisent la même formule : profit de la meilleure journée divisé par le profit total, en pourcentage. Si le résultat dépasse la limite, vous n\'êtes pas encore éligible, au passage du challenge ou au payout selon l\'endroit où la règle s\'applique.',
          'Exemple avec une limite de 50 % : vous gagnez 1 200 $ lundi, 300 $ mardi et 500 $ mercredi, soit 2 000 $. Votre meilleure journée représente 60 % du total : vous êtes au-dessus. Inutile de perdre quoi que ce soit : il faut au moins 2 400 $ de profit total pour que 1 200 $ représente 50 % ou moins.',
        ],
      },
      {
        heading: 'Challenge, payout ou les deux',
        paragraphs: [
          'Le même pourcentage n\'a pas les mêmes conséquences selon l\'étape. Sur le challenge, la règle retarde seulement votre validation. Sur les payouts, elle peut bloquer un retrait alors que vous avez déjà gagné de l\'argent sur le compte financé.',
          'Exemples vérifiés en octobre 2026 : Topstep applique 55 % sur son Trading Combine et, si vous dépassez, relève l\'objectif de profit au lieu de vous éliminer ; son compte Express Funded en parcours « Consistency » exige 40 % ou moins pour un payout. Depuis le 12 octobre 2026, les nouveaux challenges FTMO 1-Step utilisent une règle de consistance qui compare votre meilleure journée à votre profit total, journées perdantes comprises ; les comptes issus de commandes antérieures gardent l\'ancienne « Best Day Rule », calculée sur les seules journées positives. PropRadar n\'a pas relevé de règle de ce type sur le programme High Stakes de The5ers.',
        ],
      },
      {
        heading: 'Une firme sans règle de consistance est-elle meilleure ?',
        paragraphs: [
          'Pas automatiquement. Les firmes qui suppriment cette règle contrôlent le risque autrement : perte journalière plus faible, drawdown suiveur, premiers payouts plafonnés, jours minimum ou taille de position limitée. Un titre « sans consistency rule » peut cacher un compte financé plus difficile à garder.',
          'La règle pénalise surtout les traders aux résultats irréguliers : traders d\'annonces, swing traders qui ferment une grosse position, ou ceux qui augmentent la taille après une série perdante. Si vos journées sont assez régulières, une limite de 40 à 50 % vous gênera rarement.',
        ],
      },
      {
        heading: 'Trader sereinement avec une règle de consistance',
        paragraphs: [
          'Tenez à jour le ratio meilleure journée / profit total et sachez, avant chaque séance, combien vous pouvez gagner sans dépasser la limite. Après une grosse journée en début de période, visez plusieurs petites journées positives plutôt que de chercher à la répéter. Et évitez d\'augmenter la taille en fin de challenge : une seule journée trop gagnante peut retarder la validation autant qu\'une perte.',
        ],
      },
    ],
    sources: [
      { label: 'Centre d\'aide Topstep : consistance', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep' },
      { label: 'FTMO : objectifs de trading', url: 'https://ftmo.com/en/trading-objectives/' },
      { label: 'FTMO : mise à jour du 8 octobre 2026', url: 'https://ftmo.com/au/blog/trading-updates/trading-update-8-oct-2026/' },
    ],
    faq: [
      {
        question: 'Comment calculer la règle de consistance ?',
        answer: 'Divisez le profit de votre meilleure journée par votre profit total et multipliez par 100. Comparez le résultat à la limite de votre programme.',
      },
      {
        question: 'Que se passe-t-il si je dépasse la limite ?',
        answer:
          'Le plus souvent, rien n\'est perdu : vous devez continuer à trader jusqu\'à ce que votre profit total soit assez élevé. Chez Topstep, l\'objectif de profit du Combine est relevé automatiquement.',
      },
    ],
    firmSlugs: ['topstep', 'ftmo', 'the5ers', 'apex-trader-funding'],
    related: ['drawdown-prop-firm', 'avis-topstep', 'prop-firm-sans-challenge'],
  },

  {
    slug: 'drawdown-prop-firm',
    enPath: '/guides/prop-firm-drawdown',
    title: 'Drawdown prop firm : trailing, statique et EOD expliqués',
    metaDescription:
      'Qu\'est-ce que le drawdown en prop firm ? Drawdown statique, suiveur (trailing) et de fin de journée expliqués avec des exemples chiffrés, et comment choisir.',
    eyebrow: 'Règles expliquées',
    h1: 'Drawdown en prop firm : statique, suiveur et fin de journée',
    answer:
      'Le drawdown est la perte maximale autorisée par rapport à un point de référence. Statique : fixé sous le capital de départ, il ne bouge jamais. Suiveur intraday : il suit votre plus haut en temps réel, profits latents compris. Fin de journée (EOD) : il ne bouge qu\'à la clôture. Le statique est le plus souple, le suiveur intraday le plus strict.',
    keywords: ['drawdown prop firm', 'trailing drawdown', 'drawdown statique', 'drawdown EOD', 'perte journalière maximale'],
    updated: '2026-10-23',
    intro:
      'Le drawdown est la règle qui fait perdre le plus de comptes. Deux firmes peuvent afficher un « drawdown de 3 000 $ » sur un compte de 50 000 $ et vous laisser une marge totalement différente, parce que le point de référence ne se déplace pas de la même façon.',
    sections: [
      {
        heading: 'Perte journalière et drawdown maximum',
        paragraphs: [
          'La plupart des firmes combinent deux limites. La perte journalière maximale plafonne ce que vous pouvez perdre en une journée, mesurée depuis le solde ou l\'equity du début de journée. Le drawdown maximum plafonne la perte totale sur la vie du compte. Dépasser l\'une ou l\'autre fait généralement perdre le compte, même si certaines firmes futures se contentent d\'arrêter la séance quand la limite journalière est touchée.',
        ],
      },
      {
        heading: 'Le drawdown statique',
        paragraphs: [
          'Il est fixé sous le capital de départ et ne bouge jamais. Sur un compte de 100 000 $ avec 10 % de drawdown statique, le plancher reste à 90 000 $. Si le compte monte à 108 000 $, vous disposez de 18 000 $ de marge. C\'est le modèle le plus souple, fréquent sur les challenges forex en deux étapes.',
        ],
      },
      {
        heading: 'Le drawdown suiveur intraday (trailing)',
        paragraphs: [
          'Il suit votre equity la plus haute en temps réel, profits latents compris. Exemple sur 50 000 $ avec 2 500 $ de trailing : le plancher démarre à 47 500 $. Un trade monte à +1 500 $ latents, le plancher passe à 49 000 $, même si vous clôturez ensuite à zéro. Il ne vous reste que 1 000 $ de marge au lieu de 2 500 $, sans avoir encaissé un centime. C\'est le modèle le plus strict, courant sur les futures et les comptes instantanés.',
        ],
      },
      {
        heading: 'Le drawdown de fin de journée (EOD)',
        paragraphs: [
          'Il ne se déplace qu\'à la clôture de la journée, à partir du solde de clôture. Les variations de profit latent pendant la séance ne relèvent pas le plancher, ce qui le rend bien plus gérable. Attention au détail souvent ignoré : le plancher ne bouge qu\'à la clôture, mais la violation est souvent contrôlée en temps réel. Topstep, par exemple, fait suivre sa Maximum Loss Limit au solde de fin de journée tout en la surveillant en direct, pertes latentes comprises.',
        ],
      },
      {
        heading: 'Le verrouillage : quand le trailing s\'arrête',
        paragraphs: [
          'La plupart des drawdowns suiveurs cessent de monter à un certain niveau, souvent quand le plancher atteint le capital de départ. Ensuite, la limite se comporte comme une limite statique. C\'est pourquoi les premiers jours d\'un compte en trailing sont les plus dangereux : constituez la marge jusqu\'au niveau de verrouillage avant de prendre des positions plus grosses.',
        ],
      },
      {
        heading: 'Comment choisir',
        paragraphs: ['Choisissez le modèle selon le comportement de vos trades :'],
        bullets: [
          'Trades qui partent souvent loin en profit avant de revenir : évitez le trailing intraday, préférez statique ou EOD.',
          'Petits scalps fréquents avec stops serrés : un trailing reste gérable si le verrouillage est vite atteint.',
          'Swing trading avec stops larges : il vous faut un drawdown statique et une marge supérieure à votre perte latente habituelle.',
          'Calculez toujours la taille de position à partir de la marge restante, pas de la taille du compte.',
        ],
      },
    ],
    sources: [{ label: 'Centre d\'aide Topstep : Maximum Loss Limit', url: 'https://intercom.help/topstep-llc/en/articles/8284204' }],
    faq: [
      {
        question: 'Quelle est la différence entre drawdown statique et trailing ?',
        answer:
          'Le drawdown statique reste fixé sous le capital de départ. Le trailing monte avec chaque nouveau plus haut du compte, donc votre marge diminue après chaque gain, jusqu\'au verrouillage.',
      },
      {
        question: 'Le drawdown EOD est-il plus facile ?',
        answer:
          'En général oui : il ignore les variations intraday du profit latent et ne bouge qu\'à la clôture. Vérifiez toutefois si la violation est contrôlée en temps réel.',
      },
    ],
    firmSlugs: ['the5ers', 'ftmo', 'topstep', 'apex-trader-funding'],
    related: ['regle-de-consistance-prop-firm', 'avis-topstep', 'prop-firm-sans-challenge'],
  },

  {
    slug: 'avis-topstep',
    enPath: '/guides/topstep-review',
    title: 'Avis Topstep 2026 : fiable ? Règles, payouts et limites',
    metaDescription:
      'Avis Topstep 2026 : la prop firm futures est-elle fiable ? Règles du Trading Combine, consistance à 55 %, Maximum Loss Limit, partage 90 % et avis Trustpilot.',
    eyebrow: 'Avis prop firm',
    h1: 'Avis Topstep 2026 : une prop firm futures fiable ?',
    answer:
      'Oui, Topstep est une prop firm futures sérieuse et ancienne (fondée en 2012 à Chicago). Son Trading Combine n\'a pas de limite de temps, une règle de consistance à 55 % et une Maximum Loss Limit qui suit le solde de fin de journée. Les nouveaux traders gardent 90 % des payouts. Limites : futures uniquement, pas de position overnight, règles souvent modifiées depuis fin 2025.',
    keywords: ['avis topstep', 'topstep fiable', 'topstep avis 2026', 'règles topstep'],
    updated: '2026-10-23',
    intro:
      'Topstep est le nom le plus ancien du prop trading sur futures. Cet historique est sa principale force. Ses faiblesses : une offre limitée aux futures, des règles plusieurs fois modifiées depuis fin 2025 et une limite de perte suiveuse qui exige de la discipline.',
    sections: [
      {
        heading: 'Topstep est-il fiable ?',
        paragraphs: [
          'Topstep est un opérateur américain établi, avec un long historique public, un centre d\'aide détaillé et un courtier affilié, Topstep Brokerage, lancé début 2026. PropRadar lui attribue 84/100 et n\'a relevé aucune alerte de régulateur. Comme pour toutes les prop firms, le Combine et le compte Express Funded sont simulés : les payouts sont des récompenses versées par Topstep, pas des gains de courtage.',
          'Sur Trustpilot, le profil affiche 3,7 sur 14 955 avis, avec la mention de Trustpilot selon laquelle la société « peut être associée à des investissements à haut risque » (vérifié le 23 octobre 2026). Fin 2025, les plaintes portaient surtout sur des pannes de la plateforme TopstepX et des ordres stop non exécutés.',
        ],
      },
      {
        heading: 'Les règles du Trading Combine',
        paragraphs: [
          'Le Combine existe en 50K, 100K et 150K, avec des objectifs de profit de 3 000 $, 6 000 $ et 9 000 $. Pas de limite de temps ni de nombre minimum de jours. Toutes les positions doivent être fermées en fin de séance : pas d\'overnight ni de week-end.',
          'La Maximum Loss Limit est de 2 000 $, 3 000 $ ou 4 500 $ sous le capital de départ. Elle monte avec le solde de fin de journée et ne redescend jamais, mais elle est surveillée en temps réel, pertes latentes comprises, et se verrouille une fois le capital de départ atteint (centre d\'aide, mis à jour le 18 septembre 2026).',
          'La règle de consistance est de 55 % : votre meilleure journée ne peut pas dépasser 55 % de l\'objectif. Sinon, l\'objectif est relevé au niveau meilleure journée ÷ 0,55 (centre d\'aide, 17 septembre 2026). Une perte journalière optionnelle de 1 000 $, 2 000 $ ou 3 000 $ arrête la séance sans clôturer le compte.',
        ],
      },
      {
        heading: 'Compte Express Funded et payouts',
        paragraphs: [
          'Après validation, vous tradez un compte Express Funded (XFA), toujours simulé, où commencent les payouts. Depuis février 2026, deux parcours au choix, définitif : le parcours Standard exige cinq journées gagnantes d\'au moins 150 $ avant chaque payout ; le parcours Consistency exige trois jours de trading et une meilleure journée à 40 % ou moins du profit net.',
          'Les traders inscrits depuis le 12 janvier 2026 touchent 90 % des payouts validés ; les plus anciens gardent 100 % de leurs 10 000 premiers dollars, puis 90 %. Le payout minimum est de 125 $. Après le premier payout, la limite de perte passe à 0 $ : une mauvaise journée après un retrait peut suffire à perdre le compte.',
        ],
      },
      {
        heading: 'Points forts et points faibles',
        paragraphs: ['Ce qui ressort des règles actuelles :'],
        bullets: [
          'Plus : l\'historique le plus long du prop trading futures et un centre d\'aide très documenté.',
          'Plus : pas de limite de temps ; la règle de consistance relève l\'objectif au lieu d\'éliminer.',
          'Plus : 90 % de partage dès le premier dollar et un payout minimum bas (125 $).',
          'Moins : futures uniquement, positions obligatoirement fermées en fin de séance.',
          'Moins : la limite de perte tombe à 0 $ après le premier payout.',
          'Moins : règles modifiées plusieurs fois entre novembre 2025 et avril 2026.',
        ],
      },
      {
        heading: 'Pour qui ?',
        paragraphs: [
          'Topstep convient aux day traders futures qui veulent un opérateur établi et savent gérer une limite suiveuse surveillée en temps réel. Il ne convient pas aux traders forex ou CFD, aux swing traders qui gardent des positions la nuit, ni à ceux qui choisissent surtout sur le prix : l\'abonnement mensuel rend une évaluation lente plus coûteuse qu\'un challenge à frais unique.',
        ],
      },
    ],
    sources: [
      { label: 'Centre d\'aide Topstep : Maximum Loss Limit', url: 'https://intercom.help/topstep-llc/en/articles/8284204' },
      { label: 'Centre d\'aide Topstep : consistance', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep' },
      { label: 'Centre d\'aide Topstep : payouts', url: 'https://intercom.help/topstep-llc/en/articles/8284234-payout-faqs' },
      { label: 'Topstep sur Trustpilot', url: 'https://www.trustpilot.com/review/topstep.com' },
    ],
    faq: [
      {
        question: 'Topstep est-il une arnaque ?',
        answer:
          'Non. Topstep existe depuis 2012, publie ses règles en détail et n\'a pas d\'alerte de régulateur recensée par PropRadar. Ses comptes d\'évaluation et Express Funded sont simulés, comme chez toutes les prop firms.',
      },
      {
        question: 'Quel partage des profits chez Topstep ?',
        answer: '90 % pour les traders inscrits depuis le 12 janvier 2026 ; 100 % des 10 000 premiers dollars puis 90 % pour les plus anciens.',
      },
      {
        question: 'Peut-on garder une position overnight chez Topstep ?',
        answer: 'Non, toutes les positions doivent être fermées avant la fin de séance.',
      },
    ],
    firmSlugs: ['topstep', 'apex-trader-funding', 'alpha-futures'],
    related: ['drawdown-prop-firm', 'regle-de-consistance-prop-firm', 'meilleures-prop-firms-2026'],
  },

  {
    slug: 'ftmo-vs-the5ers',
    enPath: '/guides/ftmo-vs-the5ers',
    title: 'FTMO vs The5ers : quelle prop firm choisir en 2026 ?',
    metaDescription:
      'FTMO ou The5ers ? Comparatif 2026 : prix, objectifs, drawdown, règles de consistance, payouts, avis Trustpilot et profil de trader adapté à chacune.',
    eyebrow: 'Comparatif',
    h1: 'FTMO vs The5ers : deux profils solides, pas le même usage',
    answer:
      'FTMO et The5ers font partie des prop firms forex les plus fiables (91/100 et 85/100 chez PropRadar). FTMO est la référence la plus documentée mais plus chère ; The5ers est moins chère à l\'entrée et utilise souvent des limites statiques. Le choix dépend surtout de votre budget et de votre façon de gérer le drawdown.',
    keywords: ['ftmo vs the5ers', 'ftmo ou the5ers', 'the5ers avis', 'ftmo avis'],
    updated: '2026-10-23',
    intro:
      'FTMO et The5ers reviennent dans presque tous les classements sérieux. Les deux sont anciennes, transparentes et notées « Excellent » sur Trustpilot. Elles ne s\'adressent pourtant pas exactement au même trader.',
    sections: [
      {
        heading: 'Les deux firmes en bref',
        paragraphs: [
          'FTMO, fondée en 2015 en République tchèque, est la référence du marché : règles très détaillées, gros volume d\'avis (4,8 sur 54 942 avis Trustpilot au 23 octobre 2026) et challenges à partir d\'environ 155 $. PropRadar lui attribue 91/100.',
          'The5ers, fondée en 2016 avec des entités en Israël et au Royaume-Uni, propose plusieurs programmes, à partir d\'environ 39 $, avec des limites souvent statiques. Trustpilot : 4,7 sur 40 309 avis. Score PropRadar : 85/100.',
          'Transparence : PropRadar a une relation d\'affiliation avec les deux firmes. Elle n\'a aucun effet sur leurs scores.',
        ],
      },
      {
        heading: 'Règles des programmes phares (relevées en juillet 2026)',
        paragraphs: [
          'Sur le challenge FTMO en deux étapes : objectif de 10 % puis 5 %, perte journalière maximale de 5 %, perte totale maximale de 10 %. Depuis le 12 octobre 2026, le challenge FTMO 1-Step utilise une règle de consistance (meilleure journée comparée au profit total) à la place de l\'ancienne « Best Day Rule », qui reste valable pour les commandes antérieures.',
          'Sur le programme High Stakes de The5ers : objectif de 8 % puis 5 %, perte journalière de 5 %, perte maximale de 10 %. PropRadar n\'a pas relevé de règle de meilleure journée en pourcentage sur ce programme.',
          'Ces règles évoluent : vérifiez toujours la page officielle du programme avant d\'acheter.',
        ],
      },
      {
        heading: 'Payouts et annonces économiques',
        paragraphs: [
          'FTMO traite généralement les payouts en 1 à 3 jours ouvrés. Le trading des annonces est autorisé en évaluation et sur les comptes Swing, mais certaines annonces sont restreintes sur les comptes financés Standard. The5ers verse en général ses payouts en quelques jours ouvrés ; certains de ses programmes sont moins souples pour les profils news ou scalping, à vérifier selon le programme choisi.',
        ],
      },
      {
        heading: 'Laquelle choisir ?',
        paragraphs: ['Les deux sont des choix sérieux. Le bon choix dépend de vous :'],
        bullets: [
          'Budget serré pour un premier essai : The5ers, avec une entrée nettement moins chère.',
          'Besoin d\'un maximum de documentation et d\'un historique public très large : FTMO.',
          'Gestion du risque prudente, envie d\'une limite fixe : The5ers et ses limites souvent statiques.',
          'Trading d\'annonces sur compte financé : comparez les règles précises du compte FTMO Swing et du programme The5ers visé.',
        ],
      },
    ],
    sources: [
      { label: 'FTMO : objectifs de trading', url: 'https://ftmo.com/en/trading-objectives/' },
      { label: 'FTMO : mise à jour du 8 octobre 2026', url: 'https://ftmo.com/au/blog/trading-updates/trading-update-8-oct-2026/' },
      { label: 'The5ers : programmes', url: 'https://the5ers.com/programs/' },
      { label: 'FTMO sur Trustpilot', url: 'https://www.trustpilot.com/review/ftmo.com' },
      { label: 'The5ers sur Trustpilot', url: 'https://www.trustpilot.com/review/the5ers.com' },
    ],
    faq: [
      {
        question: 'FTMO ou The5ers, laquelle est la plus fiable ?',
        answer:
          'Les deux sont parmi les plus fiables du marché. FTMO obtient 91/100 et The5ers 85/100 chez PropRadar en octobre 2026, avec des notes Trustpilot de 4,8 et 4,7.',
      },
      {
        question: 'Laquelle est la moins chère ?',
        answer: 'The5ers, avec des programmes à partir d\'environ 39 $ contre environ 155 $ pour FTMO, selon les prix relevés par PropRadar.',
      },
    ],
    firmSlugs: ['ftmo', 'the5ers', 'funderpro'],
    related: ['meilleures-prop-firms-2026', 'regle-de-consistance-prop-firm', 'drawdown-prop-firm'],
  },
];

export function getFrArticle(slug: string) {
  return frArticles.find((article) => article.slug === slug);
}

export function getFrArticleByEnPath(path: string) {
  return frArticles.find((article) => article.enPath === path);
}
