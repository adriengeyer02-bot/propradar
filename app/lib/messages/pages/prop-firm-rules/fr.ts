import type { RulesMessages } from './en';

const rules: RulesMessages = {
  metaTitle: 'Règles des prop firms : drawdown, paiements et risques de trading',
  metaDescription:
    'Comparez les règles sensibles des prop firms : drawdown, trading des annonces, paiements, consistance, EA, copy trading et stratégies interdites.',
  schemaName: 'Audits des règles des prop firms',
  breadcrumb: 'Règles de trading',
  eyebrow: 'Audit approfondi des règles',
  h1: 'Les clauses qui peuvent coûter un compte ou un paiement.',
  lead: "PropRadar lit les pages de règles, les centres d'aide et les conditions des produits phares pour isoler les clauses dangereuses : drawdown, rollover, annonces, EA, copy trading, consistance, plafonds de paiement et sanctions.",
  reviewed: 'Page revue le {date}. Chaque audit garde sa propre date de vérification de la source, visible.',
  statDeep: 'Audits approfondis',
  statClauses: 'Clauses extraites ({critical} critiques)',
  statCompact: 'Petites et moyennes firmes ({critical} critiques)',
  statTracked: 'Firmes suivies',
  coverageAria: 'Couverture des audits de règles',
  statRuleFiles: 'Dossiers de règles',
  statPayoutSensitive: 'Dossiers sensibles aux paiements',
  statLegalWatch: 'Veille juridique',
  statDeepSources: '5 sources ou plus',
  related: 'Guides liés :',
  relatedConsistency: 'Règle de consistance',
  relatedNews: 'Trading des annonces',
  statsAria: 'Statistiques des règles',
  families: [
    { label: 'Compte fermé', title: 'Drawdown et equity', text: "Le vrai danger vient généralement de l'equity ouverte, du rollover, des swaps et de la réinitialisation du serveur." },
    { label: 'Profit retiré', title: 'Annonces et rollover', text: 'Certaines plateformes autorisent techniquement la position mais retirent les gains ou la classent comme une infraction.' },
    { label: 'Compte bloqué', title: 'EA, HFT, copy trading', text: "Un EA autorisé pour la gestion du risque peut rester interdit lorsqu'il trade seul, copie des comptes ou surcharge le serveur." },
    { label: 'Retrait retardé', title: 'Paiements et consistance', text: 'Les règles de meilleure journée, les plafonds de paiement, les jours gagnants et les cycles de retrait peuvent compter davantage que le partage de profits affiché.' },
  ],
  alertsEyebrow: 'Alertes consommateurs',
  alertsTitle: 'Ce que les pages marketing ne disent pas assez fort.',
  viewAudit: "Voir l'audit des sources",
  proofAria: 'Preuves de l’audit des règles de {name}',
  payoutChip: 'Paiement {level}',
  legalChip: 'Juridique {level}',
  sourceDeep: 'Sources solides',
  sourceUsable: 'Sources utilisables',
  sourceThin: 'Sources minces',
  sourceNone: 'Aucune source',
  severity: { Faible: 'Faible', Moyen: 'Moyen', 'Élevé': 'Élevé', Critique: 'Critique' },
  proof: {
    'Source officielle lue': 'Source officielle lue',
    'Source officielle partielle': 'Source officielle partielle',
    'Source commerciale repérée': 'Page commerciale repérée',
  },
  sourceChecked: 'Source vérifiée le {date}',
  compactEyebrow: 'Petites et moyennes firmes',
  compactTitle: 'La longue traîne est lue firme par firme.',
  compactNote: 'Ces alertes courtes viennent de sources officielles ou de pages produit repérées. Les dossiers partiels restent volontairement signalés comme tels.',
  fullEyebrow: 'Couverture complète',
  fullTitle: "Toutes les autres prop firms restent dans la file d'audit.",
  fullNote: "PropRadar garde les petites firmes visibles pour éviter les angles morts : source repérée, archive de risque ou dossier encore à sourcer.",
  showQueue: "Afficher les {count} firmes encore dans la file d'audit",
  productToIdentify: 'Produit à identifier',
  mainProductToIdentify: 'Produit principal à identifier',
  coverageArchive: 'Archive de risque',
  coverageMulti: 'Dossier multi-source',
  coverageSpotted: 'Source repérée',
  coverageToSource: 'À sourcer',
  nextEyebrow: 'Prochaine analyse',
  nextTitle: 'Les prochains produits phares à décortiquer.',
  colDrawdown: 'Drawdown',
  colNews: 'Annonces',
  colEa: 'EA',
  colPayout: 'Paiement',
  colScore: 'Score',
  scoreAria: 'Score PropRadar {score} sur 100',
  matrixEyebrow: 'Matrice rapide',
  matrixTitle: 'Firmes actives classées par risque de paiement.',
  showMatrix: 'Afficher les {count} firmes actives par risque de paiement',
  scoreLine: 'score {score}/100',
  audits: {
    ftmo: {
      headline: "Le risque principal vient des calculs d'equity et des pratiques interdites.",
      verdict:
        "FTMO est lisible, mais ses règles sont strictes : perte journalière calculée sur l'equity, drawdown suiveur en fin de journée sur le 1-Step, une Best Day Rule et de larges restrictions sur le gap trading, le HFT, les comptes liés et le contournement.",
      clauses: [
        {
          title: "La perte journalière inclut l'equity ouverte",
          finding: 'La perte journalière inclut le solde, les positions ouvertes, les swaps et les commissions. Une position latente peut enfreindre la règle avant sa clôture.',
          impact: "Ne surveillez jamais le solde seul. Une mèche, un élargissement du spread ou un swap peut suffire à faire perdre le compte.",
        },
        {
          title: 'Best Day / règle de consistance sur le 1-Step et le FTMO Account',
          finding:
            'Sur les comptes issus de commandes passées avant le 12 octobre 2026, la meilleure journée ne doit pas dépasser 50 % des profits positifs. Les nouvelles commandes 1-Step utilisent une règle de consistance qui compare la meilleure journée au profit total, journées perdantes comprises. Aucune des deux n’est une infraction, mais chacune peut bloquer la progression ou une récompense tant que le ratio n’est pas corrigé.',
          impact: 'Un seul gros trade gagnant peut vous obliger à continuer de trader pour débloquer le compte, donc à prendre plus de risque.',
        },
        {
          title: 'Clauses larges de pratiques interdites',
          finding:
            "Le gap trading, la latence, la très haute fréquence, les comptes coordonnés, le roulement de comptes, les paris à sens unique et les EA hyperactifs peuvent entraîner une disqualification, des trades supprimés, des récompenses perdues ou la résiliation.",
          impact: 'Les stratégies pour « hacker » le challenge et les montages multi-comptes copiés-collés sont le vrai danger, même quand le score public est excellent.',
        },
      ],
    },
    the5ers: {
      headline: 'Le drawdown journalier est plus trompeur qu’il n’en a l’air.',
      verdict:
        "The5ers High Stakes paraît propre sur le papier, mais le drawdown journalier se base sur la valeur la plus haute entre le solde et l'equity de la veille. Un trade conservé pendant le rollover peut fortement réduire la marge disponible.",
      clauses: [
        {
          title: "Le drawdown journalier retient la valeur la plus haute entre solde et equity",
          finding: "Le drawdown journalier de 5 % est fixé à minuit serveur à partir de l'equity ou du solde de clôture de la veille, selon la valeur la plus haute.",
          impact: "Finir la journée avec une equity élevée relève le seuil du lendemain. Une position conservée peut fermer le compte plus tôt que prévu.",
        },
        {
          title: "Règle d'inactivité de 30 jours",
          finding: "Les comptes expirent après plus de 30 jours consécutifs sans activité de trading, comptés à partir de l'inscription.",
          impact: 'Un challenge acheté pour plus tard peut devenir une perte totale s’il reste inutilisé.',
        },
        {
          title: 'Paiement toutes les deux semaines',
          finding: 'Une fois le statut financé atteint, les retraits sont disponibles depuis le tableau de bord toutes les deux semaines.',
          impact: 'La trésorerie n’est pas instantanée : ne comparez pas seulement le partage et le prix du challenge.',
        },
      ],
    },
    fundednext: {
      headline: 'De nombreuses règles anti-abus peuvent retirer des profits avant la fermeture du compte.',
      verdict:
        "FundedNext est bien documentée, mais ses limites anti-abus sont étendues : plafond de risque, plafond de marge, quick strike, hyperactivité, trading de règlement, copy trading et couverture entre comptes.",
      clauses: [
        {
          title: 'Risque maximal de 3 % et marge plafonnée à 70 %',
          finding:
            "FundedNext limite le risque à 3 % en permanence et la marge cumulée à 70 %. Une première infraction peut entraîner un avertissement et le retrait des profits liés au trade.",
          impact: 'Des profits peuvent être retirés quand la taille de position sort du cadre, même sans fermeture immédiate du compte.',
        },
        {
          title: 'Quick Strike et trades de moins de 30 secondes',
          finding:
            'Les trades clôturés en moins de 30 secondes sont surveillés. À partir de 30 % de profit en Quick Strike, le compte financé peut être résilié et les profits concernés retirés.',
          impact: 'Un scalping ultra-court peut transformer une bonne performance en paiement refusé.',
        },
        {
          title: 'Hyperactivité cumulée entre comptes',
          finding:
            'Deux cents trades ou 2 000 messages serveur par jour déclenchent des avertissements ; 15 000 messages peuvent désactiver le compte. Les avertissements peuvent se cumuler entre comptes.',
          impact: 'Un EA ou une gestion des ordres trop active peut coûter le compte, même sans intention malveillante.',
        },
      ],
    },
    topstep: {
      headline: 'Les principaux pièges sont la consistance, les plafonds de paiement et les cinq jours gagnants.',
      verdict: 'Topstep est établie et lisible, mais la progression et les retraits dépendent de plus que le profit brut.',
      clauses: [
        {
          title: 'Objectif de consistance de 50 %',
          finding: "La meilleure journée doit rester sous 50 % de l'objectif de profit. En cas de dépassement, l'objectif augmente, et les pertes ne réinitialisent pas la meilleure journée.",
          impact: "Une seule grosse journée gagnante peut retarder le statut financé, même après avoir atteint le montant visé.",
        },
        {
          title: 'Plafonds de paiement XFA',
          finding:
            "Les retraits de l'Express Funded Account sont plafonnés par demande et par taille de compte. Le plafond peut dépendre du parcours standard ou consistance et de l'option DLL.",
          impact: 'Un gros profit ne garantit pas un retrait immédiat du même montant.',
        },
        {
          title: 'Politique de profil unique',
          finding: 'Tous les comptes doivent rester sous un seul profil Topstep. Plusieurs profils peuvent entraîner une fermeture ou une suspension.',
          impact: "Un compte en double ou une erreur d'inscription peut devenir un vrai risque opérationnel.",
        },
      ],
    },
    'apex-trader-funding': {
      headline: 'Apex a fortement changé son offre : comptes historiques et nouveaux comptes sont séparés.',
      verdict:
        "La nouvelle offre Apex met en avant un drawdown en fin de journée, l'absence de refus de paiement, une consistance de 50 % et pas de facturation récurrente sur les nouveaux produits. Les comptes historiques restent un système à part.",
      clauses: [
        {
          title: 'Nouveaux produits et comptes historiques',
          finding: "Apex indique que les comptes historiques ne sont plus vendus, ne sont pas modifiés rétroactivement et peuvent rester en facturation récurrente jusqu'à leur résiliation.",
          impact: "Avant de comparer des avis ou des réductions Apex, vérifiez si la source parle d'un produit historique ou actuel.",
        },
        {
          title: '5 jours de trading entre les récompenses',
          finding: 'La page officielle met en avant cinq jours de trading pour les paiements et récompenses sur le parcours actuel.',
          impact: 'Même avec une progression rapide, la vitesse de retrait dépend du cycle de jours de trading.',
        },
        {
          title: 'Consistance de 50 %',
          finding: 'La nouvelle offre affiche une règle de consistance de 50 %.',
          impact: 'Une seule grosse journée peut limiter le retrait ou la progression selon le compte utilisé.',
        },
      ],
    },
    'e8-markets': {
      headline: 'E8 est très détaillée, mais certaines règles retirent des profits sans fermer le compte.',
      verdict:
        'E8 Markets documente le drawdown journalier, les plafonds de profit, les annonces, le HFT, les EA et les règles de meilleure journée. Le principal risque pour le trader est un profit retiré au rollover ou au paiement.',
      clauses: [
        {
          title: 'Drawdown journalier avec fermeture définitive',
          finding:
            "Le drawdown journalier est un montant fixe basé sur le solde initial. Si l'equity ou le solde touche le niveau de perte, le compte est définitivement fermé, même si la clôture technique se termine au-dessus.",
          impact: "La clôture finale peut sembler au-dessus du seuil alors que le compte est perdu, car l'infraction enregistrée côté serveur prime.",
        },
        {
          title: 'Plafond de profit journalier de 2 %',
          finding:
            'Sur E8 Pro, les profits au-delà du plafond journalier ne comptent pas et sont retirés après le rollover. Les tentatives de contournement par couverture ou clôtures partielles peuvent être regroupées.',
          impact: 'Une journée exceptionnelle peut être en partie retirée du résultat éligible.',
        },
        {
          title: 'Trading des annonces sur les comptes Performance E8 One',
          finding:
            "Sur les comptes performance E8 One, ouvrir, fermer ou modifier un SL/TP dans les cinq minutes autour d'une annonce à fort impact est interdit, et les profits peuvent être retirés.",
          impact: 'La plateforme peut techniquement autoriser l’action alors que le profit est retiré plus tard, au paiement.',
        },
      ],
    },
    'funding-pips': {
      headline: "Les infractions viennent souvent de l'equity, du rollover et de l'élargissement des spreads.",
      verdict:
        'FundingPips indique clairement que les limites sont surveillées côté serveur en temps réel. Les erreurs les plus coûteuses concernent les stops serrés, le rollover de 17 h (heure de New York) et les positions ouvertes pendant les annonces.',
      clauses: [
        {
          title: "Surveillance de l'equity en temps réel",
          finding: "Les pertes journalière et maximale surveillent l'equity en direct. L'enregistrement du serveur fait foi, même quand le terminal ou le tableau de bord est en retard.",
          impact: "Une position latente peut fermer le compte avant que l'affichage local ne rende l'infraction visible.",
        },
        {
          title: 'Rollover à 17 h, heure de New York',
          finding: 'FundingPips prévient que les spreads peuvent fortement s’élargir à 17 h (heure de New York), déclenchant des stops et des infractions.',
          impact: 'Un stop qui paraît sûr sur un graphique Bid peut être touché par l’Ask pendant le rollover.',
        },
        {
          title: 'La demande de récompense exige des positions fermées',
          finding: 'Le cycle de récompense impose de clôturer les positions, d’attendre 15 minutes, puis de demander le partage.',
          impact: 'Les positions ouvertes et les frais de nuit peuvent réduire la marge de sécurité au mauvais moment.',
        },
      ],
    },
    'alpha-capital-group': {
      headline: 'Le principal danger : restrictions sur les annonces, EA non approuvés et règles anti-jeu.',
      verdict:
        "Alpha Capital autorise certains usages, mais les règles après qualification sont sensibles autour des fenêtres d'annonces, des adresses IP, des EA pré-approuvés et des comportements classés comme du jeu.",
      clauses: [
        {
          title: 'Annonces : ouverture et clôture restreintes selon le plan',
          finding:
            "Après qualification, certains plans interdisent d'ouvrir ou de clôturer deux ou cinq minutes autour d'une annonce à fort impact. Même un TP ou un SL déclenché dans la fenêtre peut constituer une infraction légère.",
          impact: 'Une position peut être conservée légitimement alors qu’un take profit touché au mauvais moment rend le profit inéligible.',
        },
        {
          title: 'EA limités à la gestion du risque',
          finding: 'Les EA autonomes, les bots tiers, le HFT, l’arbitrage de latence ou les EA partagés générant des trades identiques peuvent fermer le compte.',
          impact: "Un EA autorisé ne veut pas dire trading automatisé sans limite. Confirmez l'usage, la plateforme et les exigences de pré-approbation.",
        },
        {
          title: 'Restrictions sur les IP et le foyer',
          finding: "Un même foyer, plusieurs IP, un VPN/VPS non déclaré ou des changements de localisation incohérents peuvent déclencher une infraction ou un contrôle de sécurité.",
          impact: 'Un voyage, une colocation, un autre trader dans la famille ou un VPS mal déclaré peut devenir un problème de conformité.',
        },
      ],
    },
  },
  compact: {
    'funding-traders': {
      riskFamily: 'Paiement + consistance',
      signal:
        'Les tableaux montrent des pertes journalières, pertes maximales, risques par trade, règles de consistance et calendriers de paiement différents pour Instant Funded, 1-Step et 2-Step.',
      impact:
        "Avant d'acheter, comparez plus que le prix : confirmez le produit exact, le cycle de paiement de 14 ou 21 jours et le score de consistance qui peut bloquer un retrait.",
    },
    'maven-trading': {
      riskFamily: 'Drawdown + remboursement',
      signal:
        'La page officielle sépare perte journalière, perte maximale, objectifs de profit et fréquence des paiements, et indique que certains frais sont remboursables au troisième retrait.',
      impact: "Le coût réel dépend du nombre de paiements obtenus. Un prix d'entrée bas peut être un mauvais rapport qualité-prix quand le programme choisi laisse peu de marge de drawdown.",
    },
    fxify: {
      riskFamily: 'Drawdown journalier',
      signal: 'Le drawdown journalier peut se baser sur le solde de fin de journée de la veille. Le premier paiement est présenté comme à la demande, suivi de retraits toutes les deux semaines.',
      impact: 'Une position conservée pendant la réinitialisation peut réduire la marge du lendemain. Vérifiez aussi les options qui modifient le partage, le paiement et le levier.',
    },
    'instant-funding': {
      riskFamily: 'Smart drawdown + délai de paiement',
      signal: "Sur Instant Funding, le smart drawdown se bloque après un profit. Sur IF1, le compte dure 24 heures et le meilleur trade ne peut pas représenter une trop grande part du profit total.",
      impact: "Instantané ne veut pas toujours dire paiement immédiat : certains produits exigent 14 jours, un seuil de profit ou une règle de consistance.",
    },
    'trade-the-pool': {
      riskFamily: 'Actions + profit valide',
      signal:
        "Les règles incluent un volume maximal par minute sur un instrument, des ratios de profit par position, un nombre minimal de positions, des minimums de paiement et des contrôles de risque/KYC.",
      impact: 'Sur les actions, le drawdown n’est pas le seul danger : un trade surdimensionné sur une small cap ou un profit concentré peut être invalidé.',
    },
    'funded-trading-plus': {
      riskFamily: 'High-water mark',
      signal: "Le drawdown journalier peut retenir la valeur la plus haute entre le solde et l'equity à la réinitialisation. Les retraits n'abaissent pas le high-water mark dans certains calculs.",
      impact: 'Un retrait peut sembler sécuriser le compte alors que le seuil de drawdown reste ancré plus haut.',
    },
    'goat-funded-trader': {
      riskFamily: 'Annonces + plafonds de récompense',
      signal: "Les trades ouverts ou clôturés dans les cinq minutes autour d'une annonce à fort impact peuvent voir leur profit plafonné. Les comptes financés ont aussi des limites de retrait initiales.",
      impact: "Le trading des annonces peut être autorisé tout en plafonnant les gains. Lisez la clause de retrait des profits, pas seulement la mention « annonces autorisées ».",
    },
    'audacity-capital': {
      riskFamily: 'Règles permissives à confirmer',
      signal:
        'La page annonce une période de trading illimitée, une perte journalière maximale, une perte maximale, un paiement le jour même et l’autorisation des annonces, du week-end, des EA et du copy trading.',
      impact: 'Quand une page paraît très permissive, vérifiez les définitions exactes des EA, du copy trading et du paiement le jour même dans le tableau de bord et les conditions.',
    },
    fintokei: {
      riskFamily: 'Risque ouvert + seuil de paiement',
      signal: 'SwiftTrader indique la perte journalière, la perte maximale, le risque maximal autorisé sur les trades ouverts et le profit minimal par paiement.',
      impact: 'Même avec des paiements rapides, la règle de risque ouvert maximal peut bloquer les stratégies multi-positions ou les montages de martingale déguisés.',
    },
    'hantec-trader': {
      riskFamily: 'Drawdown statique sur le solde',
      signal:
        'Le tableau officiel indique un drawdown statique sur le solde, la perte journalière, la perte totale maximale, la fréquence des récompenses et le nombre minimal de jours de trading pour chaque étape.',
      impact: "Le mot « statique » ne suffit pas : vérifiez si le seuil utilise le solde, l'equity ou les deux au moment de l'infraction.",
    },
    'oneup-trader': {
      riskFamily: 'Drawdown suiveur + consistance',
      signal:
        "Aucune perte journalière n'est affichée, mais un drawdown suiveur, au moins 10 jours de trading et une consistance s'appliquent : les trois autres meilleures journées doivent totaliser au moins 80 % de la plus grosse.",
      impact: "Sans perte journalière, les principaux pièges deviennent le drawdown suiveur et la concentration du profit sur une seule séance.",
    },
    earn2trade: {
      riskFamily: 'Futures + taux de réussite',
      signal:
        'Earn2Trade publie des indicateurs peu courants : le taux de réussite, la part de comptes live et live-sim, des retraits hebdomadaires à partir de 100 $ et des marchés uniquement futures.',
      impact: "C'est plus transparent que beaucoup de concurrents, mais le taux de réussite montre que le produit est une évaluation difficile, pas un revenu acheté.",
    },
    'take-profit-trader': {
      riskFamily: 'Paiement PRO + frais de compte',
      signal:
        'Le site met en avant des retraits PRO dès le premier jour, un partage 80/20 puis 90/10 en PRO+, des frais PRO uniques et un passage en live PRO+ avec les mêmes règles de risque.',
      impact: 'Les paiements rapides sont attrayants, mais vérifiez le parcours Test, PRO puis PRO+, les frais et le drawdown exact en live.',
    },
    brightfunded: {
      riskFamily: 'Marketing des paiements',
      signal: 'La page annonce des paiements dès sept jours après le premier trade financé et un partage de profits jusqu’à 100 %, sous conditions.',
      impact: 'Lisez les conditions avec attention : « jusqu’à » dépend souvent du plan, des options, du cycle et des règles de consistance.',
    },
    'aqua-funded': {
      riskFamily: 'Financement instantané',
      signal: 'La source officielle met en avant le financement instantané et un partage de profits élevé, mais chaque page produit doit être relue plan par plan.',
      impact: "Traitez la promesse d'instantané comme une affirmation à vérifier : cycles de paiement, drawdown, remboursements et règles d'annonces peuvent changer selon le compte.",
    },
    'blue-guardian': {
      riskFamily: 'Processus structuré',
      signal: 'Le site met en avant des évaluations aux règles transparentes, la discipline, la gestion du risque et des paiements rapides.',
      impact: "Avant d'acheter, vérifiez la page de règles exacte pour le drawdown, les annonces, les minimums de paiement et les conditions du financement instantané.",
    },
    'breakout-prop': {
      riskFamily: 'Liquidité crypto',
      signal: "Breakout est d'abord crypto : relisez la source officielle pour le spread, la liquidité, les règles des plateformes d'échange, la liquidation et les horaires propres au marché.",
      impact: 'Une prop firm crypto ne se juge pas comme une prop firm forex : mèches, slippage et risque de liquidation doivent être visibles avant le paiement.',
    },
    'the-trading-pit': {
      riskFamily: 'Multi-actifs',
      signal: "La couverture officielle est multi-actifs. Séparez les règles par classe d'actifs, car les challenges futures et CFD ne portent pas les mêmes risques.",
      impact: "Ne transposez pas une règle d'un produit à l'autre : drawdown, plateformes, frais et horaires de trading peuvent fortement différer.",
    },
    'finotive-funding': {
      riskFamily: 'Instantané + challenge',
      signal:
        'La source officielle est identifiée, mais la page produit doit confirmer les clauses détaillées sur la perte journalière, la perte maximale, les remboursements, les paiements et les restrictions de trading.',
      impact: "Considérez qu'il n'y a pas d'achat sans lecture finale tant que les conditions propres au produit ne sont pas reprises dans le dossier PropRadar.",
    },
    myfundedfutures: {
      riskFamily: 'Paiement futures',
      signal:
        "La source officielle est identifiée, mais les paramètres détaillés de paiement, d'activation, de drawdown et de consistance doivent être confirmés dans le centre d'aide ou au paiement.",
      impact: "N'achetez pas sur le seul prix mensuel : les frais du compte financé, le calendrier des paiements et le drawdown suiveur déterminent le coût réel.",
    },
    bulenox: {
      riskFamily: 'Drawdown suiveur futures',
      signal: "La source officielle est identifiée, mais le dossier doit encore préciser les frais d'activation, le drawdown suiveur, les minimums de paiement et les règles des contrats.",
      impact: "À garder dans la file d'audit futures : les coûts et limites après le statut financé comptent plus que le prix de l'évaluation.",
    },
  },
};

export default rules;
