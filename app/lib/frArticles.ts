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
    updated: '2026-11-12',
    intro:
      'Choisir une prop firm, c\'est d\'abord choisir **un opérateur à qui vous confiez de l\'argent** : des frais de challenge, et plus tard des payouts. Avant de comparer les pourcentages de partage ou les codes promo, ce classement vérifie la question qui compte le plus : **cette société sera-t-elle encore là, et paiera-t-elle**, le jour où vous aurez gagné ?',
    keyPoints: [
      'Il n\'y a pas de meilleure firme universelle : il y a la meilleure **pour votre marché et votre style**.',
      'Filtrez dans cet ordre : **marché → règles → coût réel → codes promo**.',
      'Le score lit **règles, preuves de payout, transparence juridique, avis publics et ancienneté**.',
      'Un lien d\'affiliation **ne change jamais un score**.',
    ],
    sections: [
      {
        heading: 'Comment ce classement est construit',
        paragraphs: [
          'Chaque prop firm suivie par PropRadar reçoit un **score sur 100**, calculé à partir de la clarté des règles, des preuves de payout, de la transparence juridique (entité, juridiction, conditions générales), des signaux d\'avis publics et de l\'ancienneté.',
          'Les liens d\'affiliation sont signalés sur chaque fiche et **ne modifient jamais un score** : une firme partenaire garde ses points faibles affichés, et une firme sans partenariat peut être en tête.',
        ],
        callout: { kind: 'warning', text: 'Le score **n\'est pas une promesse de paiement**. C\'est un résumé des preuves disponibles à une date donnée ; chaque changement est daté dans l\'historique de la fiche.' },
      },
      {
        heading: 'Le trio de tête en octobre 2026',
        paragraphs: [
          'Les trois scores les plus élevés reviennent à des opérateurs anciens. Ce ne sont pas les moins chers : ce sont les historiques publics les plus longs et les règles les plus lisibles.',
        ],
        compare: {
          columns: ['FTMO', 'The5ers', 'Topstep'],
          rows: [
            { label: 'Score PropRadar', values: ['**91/100**', '**85/100**', '**84/100**'] },
            { label: 'Fondée', values: ['2015, République tchèque', '2016, Israël et Royaume-Uni', '2012, Chicago'] },
            { label: 'Marché', values: ['Forex / CFD', 'Forex / CFD', 'Futures'] },
            { label: 'Prix d\'entrée', values: ['environ 155 $', 'environ 39 $', 'abonnement mensuel'] },
            { label: 'Trustpilot', values: ['4,8 (près de 55 000 avis)', '4,7 (plus de 40 000 avis)', '3,7'] },
          ],
          note: 'Relevé en octobre 2026. PropRadar a une relation d\'affiliation avec FTMO et The5ers, pas avec Topstep : sans effet sur les scores.',
        },
        bulletStyle: 'check',
        bullets: [
          '**FTMO** : la référence du forex/CFD, règles détaillées, historique long.',
          '**The5ers** : limites de perte souvent **statiques**, programmes variés, entrée bon marché.',
          '**Topstep** : la plus ancienne prop firm futures ; positions fermées chaque soir, règles souvent modifiées depuis fin 2025.',
        ],
      },
      {
        heading: 'Étape 1 : choisir son marché',
        paragraphs: [
          'Un trader forex/CFD et un trader futures ne cherchent pas au même endroit. **La meilleure firme futures ne sert à rien à un trader forex** : filtrez d\'abord par marché.',
        ],
        compare: {
          columns: ['Forex / CFD', 'Futures'],
          rows: [
            { label: 'Plateformes', values: ['MT5, cTrader', 'Plateformes futures'] },
            { label: 'Limites', values: ['**En % du compte**', '**En dollars**'] },
            { label: 'Drawdown', values: ['Souvent statique sur les challenges en deux étapes', 'Souvent **suiveur**'] },
            { label: 'Exemples', values: ['FTMO, The5ers', 'Topstep, Apex'] },
          ],
        },
      },
      {
        heading: 'Étape 2 : faire correspondre les règles à votre style',
        paragraphs: [
          'Ce ne sont **pas les objectifs de profit** qui font perdre la plupart des comptes, mais le type de drawdown, la perte journalière maximale, la règle de consistance, les annonces économiques et la détention overnight. Lisez toujours les règles du **compte financé**, souvent plus strictes que celles du challenge.',
        ],
        bulletStyle: 'check',
        bullets: [
          '**Drawdown** : une limite statique laisse beaucoup plus de marge qu\'un drawdown suiveur.',
          '**Consistance** : vérifiez si elle s\'applique au challenge, aux payouts, ou aux deux.',
          '**News et overnight** : indispensables pour les traders d\'annonces et les swing traders.',
          '**Payouts** : fréquence, montant minimum, plafond des premiers retraits et frais.',
        ],
      },
      {
        heading: 'Étape 3 : comparer le coût réel',
        visual: 'real-cost-stack',
        paragraphs: [
          'Le coût réel d\'une prop firm, c\'est **tout ce que vous dépensez avant votre premier payout** : challenges, resets, frais d\'activation et comptes de remplacement, moins un éventuel remboursement.',
        ],
        callout: { kind: 'example', text: 'Un challenge bon marché avec un drawdown sévère peut coûter **plus cher** qu\'un challenge plus onéreux que vous avez de bonnes chances de réussir.' },
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
    updated: '2026-11-12',
    intro:
      'Une prop firm « sans challenge » vend un compte financé directement, sans phase d\'évaluation. Sur le papier, c\'est un raccourci. Dans les faits, **vous payez la sélection d\'avance**, et **la sélection continue après l\'achat**.',
    keyPoints: [
      '**Sans challenge = sans objectif de profit**, pas sans règles : drawdown, consistance et jours minimum restent.',
      'Un compte direct coûte souvent **plusieurs fois** un challenge de même taille.',
      'Comparez le **coût total jusqu\'au premier payout**, pas le prix affiché.',
      'Adapté à une stratégie **stable et peu risquée**, pas à une stratégie encore en test.',
    ],
    sections: [
      {
        heading: 'Ce que « sans challenge » veut vraiment dire',
        visual: 'challenge-vs-direct',
        paragraphs: [
          'Dans le modèle classique, vous payez des frais, vous atteignez un objectif de profit sans dépasser une perte journalière et un drawdown maximum, parfois en deux phases, puis vous tradez un compte financé qui peut verser des payouts. Le **financement direct** (instant funding) supprime cette première étape : vous achetez le compte financé.',
          'Ce qui disparaît, c\'est **l\'objectif de profit avant le financement**. Ce qui reste, c\'est **le contrôle du risque** : un drawdown maximum, souvent suiveur, et fréquemment une règle de consistance, un nombre minimum de jours ou un premier payout plafonné.',
        ],
        callout: { kind: 'tip', text: 'La firme filtre toujours les traders. Elle le fait simplement **après votre paiement**.' },
      },
      {
        heading: 'Pourquoi le financement instantané coûte plus cher',
        visual: 'no-challenge-cost',
        paragraphs: [
          'Le challenge sert de **filtre** : une grande partie des acheteurs n\'atteint jamais de payout, et leurs frais financent ceux qui y arrivent. Quand vous sautez ce filtre, la firme intègre ce risque dans le prix du compte : comptes **plusieurs fois plus chers**, tailles **plus petites**, drawdown **plus serré**.',
          'Exemple en chiffres ronds : un challenge à 100 $ avec une chance sur trois de réussite coûte **environ 300 $ en moyenne** pour être financé. Un compte instantané à 350 $ coûte davantage dès que vous en perdez un seul avant le premier retrait.',
        ],
      },
      {
        heading: 'Les règles qui décident si un compte direct est rentable',
        paragraphs: ['Lisez les conditions du compte financé, pas la page marketing. Six points changent tout :'],
        bulletStyle: 'check',
        bullets: [
          '**Type de drawdown** : un drawdown qui suit votre plus haut est bien plus contraignant qu\'une limite fixe.',
          '**Règle de consistance** : beaucoup de programmes instantanés limitent la part du profit faite sur votre meilleure journée.',
          '**Premier payout** : jours minimum, profit minimum, plafond des premiers retraits.',
          '**Partage de départ** : il commence parfois plus bas que sur les challenges.',
          '**Coût de remplacement** après une violation de règle.',
          '**Stratégies interdites** : fenêtres d\'annonces, durée minimale des trades, copy trading.',
        ],
      },
      {
        heading: 'Pour qui le financement direct a du sens',
        paragraphs: [
          'Le financement direct **échange de l\'argent contre du temps**. La pression de l\'objectif de profit est remplacée par celle d\'un drawdown en direct, sur un compte plus cher.',
        ],
        fit: {
          yes: ['Une stratégie **stable, à faible drawdown**', 'Un historique de **respect des limites journalières**', 'Vous préférez **gagner du temps** plutôt que de l\'argent'],
          no: ['Une stratégie **encore en test**', 'Un style **volatil** qui a besoin de marge', 'L\'envie de **fuir l\'objectif de profit**'],
        },
        callout: { kind: 'tip', text: 'En cas de doute, un **challenge en une étape bon marché** reste souvent le meilleur test avant d\'acheter un compte direct.' },
      },
      {
        heading: 'Signaux d\'alerte propres au financement instantané',
        paragraphs: ['Les programmes instantanés attirent beaucoup de firmes récentes et très marketing. Méfiez-vous de :'],
        bulletStyle: 'flag',
        bullets: [
          '**Très gros comptes à très bas prix.**',
          'Promesses de payout **sans politique de paiement publiée**.',
          'Règles **différentes entre la page d\'accueil et les conditions générales**.',
          'Clauses qui permettent de refuser un payout **« à la seule discrétion »** de la firme.',
        ],
        callout: { kind: 'tip', text: 'Avant d\'acheter, ouvrez la fiche PropRadar de la firme : **entité, signaux de payout, alertes de domaine et de régulateur** sur une seule page.' },
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
    updated: '2026-11-12',
    intro:
      'La règle de consistance limite **la part de votre profit total qui peut venir d\'une seule journée**. Elle existe parce qu\'une journée chanceuse, une position surdimensionnée ou un pic sur une annonce peuvent produire un payout qui ne dit rien de votre capacité à trader dans la durée. Comprendre la formule est plus utile que chercher à tout prix une firme qui n\'en a pas.',
    keyPoints: [
      'La formule : **meilleure journée ÷ profit total × 100**, comparée à la limite (souvent 40 à 55 %).',
      'Au-dessus de la limite, vous **ne perdez rien** : vous continuez à trader jusqu\'à un profit total suffisant.',
      '**L\'étape compte** : sur le challenge elle retarde la validation, sur les payouts elle peut bloquer un retrait.',
      'Pas de règle de consistance ne veut **pas** dire plus facile : le risque est contrôlé autrement.',
    ],
    sections: [
      {
        heading: 'La formule de calcul',
        visual: 'consistency-example',
        paragraphs: [
          'La plupart des firmes utilisent la même formule : **profit de la meilleure journée divisé par le profit total**, en pourcentage. Si le résultat dépasse la limite, vous n\'êtes pas encore éligible, au passage du challenge ou au payout selon l\'endroit où la règle s\'applique.',
          'Exemple avec une limite de 50 % : 1 200 $ lundi, 300 $ mardi, 500 $ mercredi, soit 2 000 $. Votre meilleure journée pèse **60 % du total** : vous êtes au-dessus. Inutile de perdre quoi que ce soit : il faut **au moins 2 400 $** de profit total pour que 1 200 $ représente 50 % ou moins.',
        ],
        callout: { kind: 'tip', text: 'Calcul express : **profit total nécessaire = meilleure journée ÷ limite**. Ici : 1 200 $ ÷ 0,50 = **2 400 $**.' },
      },
      {
        heading: 'Challenge, payout ou les deux',
        visual: 'rule-stages',
        paragraphs: [
          'Le même pourcentage n\'a pas les mêmes conséquences selon l\'étape. Sur le challenge, la règle **retarde seulement votre validation**. Sur les payouts, elle peut **bloquer un retrait** alors que vous avez déjà gagné de l\'argent sur le compte financé.',
          'Exemples vérifiés en octobre 2026 : **Topstep** applique **55 %** sur son Trading Combine et, si vous dépassez, relève l\'objectif au lieu de vous éliminer ; son compte Express Funded en parcours « Consistency » exige **40 % ou moins** pour un payout. Depuis le **12 octobre 2026**, les nouveaux challenges **FTMO 1-Step** comparent votre meilleure journée à votre profit total, **journées perdantes comprises** ; les commandes antérieures gardent l\'ancienne « Best Day Rule », calculée sur les seules journées positives. PropRadar n\'a pas relevé de règle de ce type sur le programme High Stakes de The5ers.',
        ],
        callout: { kind: 'warning', text: 'Vérifiez toujours **l\'étape, le produit et la date de commande** : une même firme peut appliquer deux versions de la règle.' },
      },
      {
        heading: 'Une firme sans règle de consistance est-elle meilleure ?',
        paragraphs: [
          'Pas automatiquement. Les firmes qui suppriment cette règle contrôlent le risque autrement. Un titre « sans consistency rule » peut cacher un compte financé **plus difficile à garder**. Regardez ce qui la remplace :',
        ],
        bulletStyle: 'check',
        bullets: [
          '**Perte journalière plus faible**',
          '**Drawdown suiveur**',
          '**Premiers payouts plafonnés**',
          '**Nombre minimum de jours**',
          '**Taille de position limitée**',
        ],
        callout: {
          kind: 'example',
          text: 'La règle pénalise surtout les **résultats irréguliers** : traders d\'annonces, swing traders qui ferment une grosse position, ou ceux qui augmentent la taille après une série perdante. Si vos journées sont régulières, une limite de 40 à 50 % vous gênera rarement.',
        },
      },
      {
        heading: 'Trader sereinement avec une règle de consistance',
        paragraphs: ['Quatre habitudes suffisent pour que la règle ne vous gêne pas :'],
        steps: [
          { title: 'Suivre le ratio', text: 'Mettez à jour **meilleure journée ÷ profit total** après chaque séance.' },
          { title: 'Connaître le plafond du jour', text: 'Avant de trader, sachez **combien vous pouvez gagner** sans dépasser la limite.' },
          { title: 'Étaler après une grosse journée', text: 'Visez **plusieurs petites journées positives** plutôt que de chercher à la répéter.' },
          { title: 'Ne pas augmenter la taille en fin de parcours', text: 'Une seule journée trop gagnante peut **retarder la validation** autant qu\'une perte.' },
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
    updated: '2026-11-12',
    intro:
      'Le drawdown est **la règle qui fait perdre le plus de comptes**. Deux firmes peuvent afficher un « drawdown de 3 000 $ » sur un compte de 50 000 $ et vous laisser une **marge totalement différente**, parce que le point de référence ne se déplace pas de la même façon.',
    keyPoints: [
      'Deux limites à la fois : la **perte journalière** (repart chaque jour) et le **drawdown maximum** (tout le compte).',
      '**Statique** = le plus souple, **suiveur intraday** = le plus strict, **fin de journée** entre les deux.',
      'La plupart des drawdowns suiveurs se **verrouillent** au capital de départ : les premiers jours sont les plus risqués.',
      'Calculez la taille de position depuis **la marge restante**, pas depuis la taille du compte.',
    ],
    sections: [
      {
        heading: 'Perte journalière et drawdown maximum',
        visual: 'daily-vs-max',
        paragraphs: [
          'La plupart des firmes combinent **deux limites**. La **perte journalière maximale** plafonne ce que vous pouvez perdre en une journée, depuis le solde ou l\'equity du début de journée. Le **drawdown maximum** plafonne la perte totale sur la vie du compte. Dépasser l\'une ou l\'autre fait généralement perdre le compte, même si certaines firmes futures se contentent d\'arrêter la séance.',
        ],
      },
      {
        heading: 'Le drawdown statique',
        visual: 'static-floor',
        paragraphs: [
          'Il est **fixé sous le capital de départ et ne bouge jamais**. Sur un compte de 100 000 $ avec 10 % de drawdown statique, le plancher reste à 90 000 $. Si le compte monte à 108 000 $, vous disposez de **18 000 $ de marge**. C\'est le modèle le plus souple, fréquent sur les challenges forex en deux étapes.',
        ],
      },
      {
        heading: 'Le drawdown suiveur intraday (trailing)',
        visual: 'trailing-vs-static',
        paragraphs: [
          'Il **suit votre equity la plus haute en temps réel, profits latents compris**. Exemple sur 50 000 $ avec 2 500 $ de trailing : le plancher démarre à 47 500 $. Un trade monte à +1 500 $ latents, le plancher passe à 49 000 $, **même si vous clôturez ensuite à zéro**. Il ne vous reste que 1 000 $ de marge au lieu de 2 500 $, sans avoir encaissé un centime.',
        ],
        callout: { kind: 'warning', text: 'C\'est le modèle **le plus strict**, courant sur les futures et les comptes instantanés.' },
      },
      {
        heading: 'Le drawdown de fin de journée (EOD)',
        visual: 'eod-vs-intraday',
        paragraphs: [
          'Il **ne se déplace qu\'à la clôture**, à partir du solde de clôture. Les variations de profit latent pendant la séance ne relèvent pas le plancher, ce qui le rend bien plus gérable.',
        ],
        callout: {
          kind: 'warning',
          text: 'Le plancher ne bouge qu\'à la clôture, mais **la violation est souvent contrôlée en temps réel**. Topstep, par exemple, fait suivre sa Maximum Loss Limit au solde de fin de journée tout en la surveillant en direct, pertes latentes comprises.',
        },
      },
      {
        heading: 'Le verrouillage : quand le trailing s\'arrête',
        visual: 'trailing-lock',
        paragraphs: [
          'La plupart des drawdowns suiveurs **cessent de monter** à un certain niveau, souvent quand le plancher atteint le capital de départ. Ensuite, la limite se comporte comme une limite statique.',
        ],
        callout: { kind: 'tip', text: 'Les premiers jours d\'un compte en trailing sont les plus dangereux : **constituez la marge jusqu\'au verrouillage** avant de prendre des positions plus grosses.' },
      },
      {
        heading: 'Comment choisir',
        paragraphs: ['Choisissez le modèle selon **le comportement de vos trades** :'],
        compare: {
          columns: ['À privilégier'],
          rows: [
            { label: 'Trades qui partent loin en profit avant de revenir', values: ['**Statique** ou **fin de journée** ; évitez le trailing intraday'] },
            { label: 'Petits scalps fréquents, stops serrés', values: ['Le **trailing** reste gérable si le verrouillage arrive vite'] },
            { label: 'Swing trading, stops larges', values: ['**Statique**, avec une marge supérieure à votre perte latente habituelle'] },
          ],
        },
        callout: { kind: 'tip', text: 'Calculez toujours la taille de position à partir de **la marge restante**, pas de la taille du compte.' },
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
    updated: '2026-11-12',
    intro:
      'Topstep est **le nom le plus ancien du prop trading sur futures**. Cet historique est sa principale force. Ses faiblesses : une offre **limitée aux futures**, des règles **plusieurs fois modifiées** depuis fin 2025 et une limite de perte **suiveuse** qui exige de la discipline.',
    keyPoints: [
      'Opérateur américain depuis **2012**, futures uniquement, aucune alerte de régulateur relevée.',
      'Le Combine n\'a **pas de limite de temps**, et toutes les positions sont **fermées en fin de séance**.',
      'Les nouveaux traders gardent **90 %** des payouts ; payout minimum **125 $**.',
      'Après le premier payout, la limite de perte passe à **0 $** : plus aucun coussin.',
    ],
    sections: [
      {
        heading: 'Topstep est-il fiable ?',
        paragraphs: [
          'Topstep est un **opérateur américain établi**, avec un long historique public, un centre d\'aide détaillé et un courtier affilié, Topstep Brokerage, lancé début 2026. PropRadar n\'a relevé **aucune alerte de régulateur**. Comme partout, le Combine et le compte Express Funded sont **simulés** : les payouts sont des récompenses versées par Topstep.',
          'Sur Trustpilot, le profil affiche **3,7 sur 14 955 avis**, avec la mention de Trustpilot selon laquelle la société « peut être associée à des investissements à haut risque » (vérifié le 23 octobre 2026). Fin 2025, les plaintes portaient surtout sur des **pannes de TopstepX** et des ordres stop non exécutés.',
        ],
        stats: [
          { value: '2012', label: 'fondée à Chicago' },
          { value: '84/100', label: 'score PropRadar' },
          { value: '3,7', label: 'Trustpilot, 14 955 avis (23 oct. 2026)' },
        ],
      },
      {
        heading: 'Les règles du Trading Combine',
        visual: 'topstep-path',
        paragraphs: [
          '**Pas de limite de temps ni de nombre minimum de jours.** Toutes les positions doivent être fermées en fin de séance : pas d\'overnight ni de week-end.',
          'La **Maximum Loss Limit** monte avec le solde de fin de journée et ne redescend jamais, mais elle est **surveillée en temps réel**, pertes latentes comprises, et se verrouille une fois le capital de départ atteint (centre d\'aide, 18 septembre 2026).',
          'Règle de consistance : **55 %**. Votre meilleure journée ne peut pas dépasser 55 % de l\'objectif ; sinon, **l\'objectif est relevé** à meilleure journée ÷ 0,55 (centre d\'aide, 17 septembre 2026). Une perte journalière optionnelle de 1 000 $, 2 000 $ ou 3 000 $ arrête la séance sans clôturer le compte.',
        ],
        compare: {
          columns: ['50K', '100K', '150K'],
          rows: [
            { label: 'Objectif de profit', values: ['3 000 $', '6 000 $', '9 000 $'] },
            { label: 'Maximum Loss Limit', values: ['2 000 $', '3 000 $', '4 500 $'] },
          ],
          note: 'Centre d\'aide Topstep, septembre 2026.',
        },
        callout: { kind: 'example', text: 'Combine 50K, meilleure journée **2 000 $** : c\'est plus que 55 % de 3 000 $ (1 650 $), donc l\'objectif passe à 2 000 $ ÷ 0,55 ≈ **3 636 $**.' },
      },
      {
        heading: 'Compte Express Funded et payouts',
        paragraphs: [
          'Après validation, vous tradez un compte **Express Funded (XFA)**, toujours simulé, où commencent les payouts. Depuis février 2026, deux parcours au choix, et **le choix est définitif**.',
          'Les traders inscrits depuis le 12 janvier 2026 touchent **90 %** des payouts validés ; les plus anciens gardent 100 % de leurs 10 000 premiers dollars, puis 90 %. Payout minimum : **125 $**.',
        ],
        compare: {
          columns: ['Parcours Standard', 'Parcours Consistency'],
          rows: [
            { label: 'Avant chaque payout', values: ['**5 journées gagnantes** d\'au moins 150 $', '**3 jours de trading**, meilleure journée **≤ 40 %** du profit net'] },
          ],
          note: 'Le choix entre les deux parcours est définitif.',
        },
        callout: { kind: 'warning', text: 'Après le premier payout, la limite de perte passe à **0 $** : **une mauvaise journée après un retrait peut suffire à perdre le compte.**' },
      },
      {
        heading: 'Points forts et points faibles',
        paragraphs: ['Ce qui ressort des règles actuelles :'],
        prosCons: {
          pros: [
            'L\'**historique le plus long** du prop trading futures et un centre d\'aide très documenté.',
            '**Pas de limite de temps** ; la consistance relève l\'objectif au lieu d\'éliminer.',
            '**90 %** de partage dès le premier dollar et un payout minimum bas (**125 $**).',
          ],
          cons: [
            '**Futures uniquement**, positions obligatoirement fermées en fin de séance.',
            'La limite de perte tombe à **0 $ après le premier payout**.',
            'Règles **modifiées plusieurs fois** entre novembre 2025 et avril 2026.',
          ],
        },
      },
      {
        heading: 'Pour qui ?',
        paragraphs: [
          'L\'abonnement mensuel rend une **évaluation lente** plus coûteuse qu\'un challenge à frais unique.',
        ],
        fit: {
          yes: ['**Day traders futures**', 'Envie d\'un **opérateur établi**', 'À l\'aise avec une **limite suiveuse surveillée en direct**'],
          no: ['Traders **forex ou CFD**', '**Swing traders** qui gardent la nuit', 'Choix **surtout sur le prix**'],
        },
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
    updated: '2026-11-12',
    intro:
      'FTMO et The5ers reviennent dans presque tous les classements sérieux. Les deux sont **anciennes, transparentes et bien notées** sur Trustpilot. Elles ne s\'adressent pourtant **pas exactement au même trader**.',
    keyPoints: [
      'Deux profils solides : **91/100** pour FTMO, **85/100** pour The5ers.',
      'FTMO : **la plus documentée**, mais plus chère (environ 155 $).',
      'The5ers : **entrée moins chère** (environ 39 $) et limites souvent **statiques**.',
      'Les règles évoluent : **vérifiez la page officielle** avant d\'acheter.',
    ],
    sections: [
      {
        heading: 'Les deux firmes en bref',
        paragraphs: [
          'Transparence : PropRadar a une **relation d\'affiliation avec les deux firmes**. Elle n\'a aucun effet sur leurs scores.',
        ],
        compare: {
          columns: ['FTMO', 'The5ers'],
          rows: [
            { label: 'Score PropRadar', values: ['**91/100**', '**85/100**'] },
            { label: 'Fondée', values: ['2015, République tchèque', '2016, Israël et Royaume-Uni'] },
            { label: 'Prix d\'entrée', values: ['environ 155 $', 'environ 39 $'] },
            { label: 'Trustpilot (23 oct. 2026)', values: ['4,8 sur 54 942 avis', '4,7 sur 40 309 avis'] },
          ],
        },
      },
      {
        heading: 'Règles des programmes phares (relevées en juillet 2026)',
        paragraphs: [
          'Depuis le **12 octobre 2026**, le challenge FTMO 1-Step utilise une **règle de consistance** (meilleure journée comparée au profit total) à la place de l\'ancienne « Best Day Rule », qui reste valable pour les commandes antérieures. PropRadar n\'a pas relevé de règle de meilleure journée en pourcentage sur le programme High Stakes de The5ers.',
        ],
        compare: {
          columns: ['FTMO 2 étapes', 'The5ers High Stakes'],
          rows: [
            { label: 'Objectif phase 1', values: ['**10 %**', '**8 %**'] },
            { label: 'Objectif phase 2', values: ['5 %', '5 %'] },
            { label: 'Perte journalière max', values: ['5 %', '5 %'] },
            { label: 'Perte totale max', values: ['10 %', '10 %'] },
          ],
          note: 'Relevé en juillet 2026 : vérifiez la page officielle du programme avant d\'acheter.',
        },
      },
      {
        heading: 'Payouts et annonces économiques',
        paragraphs: [
          '**FTMO** traite généralement les payouts en **1 à 3 jours ouvrés**. Le trading des annonces est autorisé en évaluation et sur les comptes Swing, mais certaines annonces sont **restreintes sur les comptes financés Standard**.',
          '**The5ers** verse en général ses payouts en **quelques jours ouvrés** ; certains programmes sont moins souples pour les profils news ou scalping, à vérifier selon le programme choisi.',
        ],
      },
      {
        heading: 'Laquelle choisir ?',
        paragraphs: ['Les deux sont des choix sérieux. Le bon choix dépend de vous :'],
        compare: {
          columns: ['Plutôt'],
          rows: [
            { label: 'Budget serré pour un premier essai', values: ['**The5ers**'] },
            { label: 'Documentation et historique public maximum', values: ['**FTMO**'] },
            { label: 'Envie d\'une limite fixe', values: ['**The5ers** et ses limites souvent statiques'] },
            { label: 'Annonces sur compte financé', values: ['Comparez **FTMO Swing** et le programme The5ers visé'] },
          ],
        },
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
