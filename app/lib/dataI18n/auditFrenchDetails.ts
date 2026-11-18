/** French translations of sourced legal-review details, aligned with the English update arrays. */
export const auditFrenchDetails: Record<string, {
  regulatoryStatus?: string[];
  complaintsAndDisputes?: string[];
  redFlags?: string[];
  changelog?: string[];
  entities?: string[];
  incidents?: string[];
  restrictiveRules?: { program: string; rule: string; impact: string }[];
  products?: { name?: string; description?: string; drawdownDetails?: string; maxDrawdown?: string; maxDailyLoss?: string; consistencyRule?: string; profitTarget?: string; profitSplit?: string; minTradingDays?: string }[];
}> = {
  earn2trade: {
    restrictiveRules: [
      {program:'Trader Career Path / Gauntlet Mini — évaluation',rule:'Drawdown suiveur relevé sur le solde de clôture EOD ; meilleure journée ≤ 30 % des profits de l’évaluation. Limite de perte quotidienne propre à la taille.',impact:'Une journée exceptionnelle peut retarder la validation ; le seuil de perte dépend du modèle et du capital.'},
      {program:'LiveSim et Live financés — achats depuis le 2 novembre 2026',rule:'Avant CHAQUE retrait : cinq journées bénéficiaires qualifiantes, avec un minimum quotidien de 100 à 350 $ selon la taille. Le compteur repart à zéro après le retrait. LiveSim : EOD ; Live réel : suiveur intraday.',impact:'Les retraits suivants ne sont pas automatiques, même sur un compte profitable.'}
    ],
    products:[
      {name:'Trader Career Path — évaluation',drawdownDetails:'Le seuil se relève sur les plus hauts de solde en fin de journée ; le franchissement reste surveillé en séance.',maxDrawdown:'Suiveur EOD, montant variable selon la taille',consistencyRule:'Meilleure journée ≤ 30 % des profits.'},
      {name:'Gauntlet Mini — évaluation',drawdownDetails:'Suiveur selon les profits clôturés en fin de séance.',maxDrawdown:'Suiveur EOD par taille',consistencyRule:'Meilleure journée ≤ 30 % des profits.'},
      {name:'Earn2Trade LiveSim financé',drawdownDetails:'Seuil financé suiveur EOD pour les tailles ordinaires ; cinq journées gagnantes qualifiantes entre deux retraits sur les achats récents.',maxDrawdown:'Suiveur EOD',minTradingDays:'Cinq jours bénéficiaires qualifiants entre chaque retrait.'},
      {name:'Trader Career Path 200K / 400K — financé statique',description:'Exception explicitement publiée pour les très grands comptes TCP financés.',drawdownDetails:'Les comptes TCP financés 200K/400K ont un seuil de perte fixe, contrairement aux comptes LiveSim habituels.',maxDrawdown:'Drawdown fixe sur TCP 200K/400K',minTradingDays:'Cinq jours bénéficiaires entre retraits pour les achats récents.'}
    ]
  },
  'take-profit-trader': {
    restrictiveRules:[
      {program:'TEST — évaluation futures',rule:'Drawdown suiveur EOD et meilleure journée ≤ 50 % des profits, trois jours de trading minimum.',impact:'Ne pas confondre le seuil de l’évaluation avec celui du compte PRO.'},
      {program:'PRO — financé',rule:'Drawdown suiveur sur le plus haut d’équité en temps réel, gains latents compris ; réserve de gains égale au drawdown avant retraits ordinaires.',impact:'Une hausse latente suivie d’un reflux peut liquider le compte ; les gains ne sont pas tous retirables immédiatement.'},
      {program:'PRO et PRO+ — annonces économiques',rule:'Aucun ordre ni position ouverte de la minute précédant à la minute suivant les annonces FOMC, NFP et CPI désignées.',impact:'Il faut clôturer aussi les positions déjà ouvertes ; la restriction n’est pas qu’une interdiction d’entrée.'}
    ],
    products:[
      {name:'TEST — évaluation',drawdownDetails:'Seuil relevé à la clôture, non sur le gain latent intraday.',maxDrawdown:'Suiveur EOD de 1 500 à 4 500 $',consistencyRule:'Meilleure journée ≤ 50 %.'},
      {name:'PRO — financé',drawdownDetails:'Le seuil suit immédiatement le pic d’équité latente ; une réserve équivalente au drawdown conditionne les retraits.',maxDrawdown:'Suiveur intraday du pic d’équité.'},
      {name:'PRO+ — compte sélectionné',drawdownDetails:'Modèle EOD distinct de PRO ; 5 000 $ de gains antérieurs PRO conservés en réserve.',maxDrawdown:'Suiveur EOD.'}
    ]
  },
  'oneup-trader': {
    restrictiveRules:[
      {program:'OneUp financé — durée minimale',rule:'Trades durant moins de dix secondes et pratiques de scalping sur ticks / latence interdits. Aucune exception générale explicite pour un stop-loss ou take-profit rapide n’a été confirmée.',impact:'Une sortie de protection très rapide peut soulever un problème ; demander une réponse écrite avant achat.'},
      {program:'OneUp financé — activité et news',rule:'Nombre hebdomadaire de trades au moins égal à 50 % de la moyenne hebdomadaire de l’évaluation ; restrictions sur certaines annonces majeures et revue de rentabilité par tranches de quinze jours au début.',impact:'La cadence du challenge peut devenir une obligation contraignante après financement.'},
      {program:'Évaluations Standard / Pro / Express',rule:'Dix / cinq / trois jours de trading minimum ; Express réservé à la requalification d’un ancien compte financé. Les trois meilleures autres journées doivent totaliser au moins 80 % de la meilleure journée.',impact:'Express n’est pas un financement instantané à acheter librement.'}
    ],
    products:[
      {name:'Standard Evaluation',drawdownDetails:'Seuil suiveur surveillé en séance, pouvant se figer au capital initial.',minTradingDays:'Dix jours.',consistencyRule:'Trois autres meilleures journées cumulées ≥ 80 % de la meilleure.'},
      {name:'Pro Evaluation',drawdownDetails:'Suiveur intraday puis verrouillage au capital de départ.',minTradingDays:'Cinq jours.',consistencyRule:'Trois autres meilleures journées cumulées ≥ 80 % de la meilleure.'},
      {name:'Express requalification — anciens financés seulement',drawdownDetails:'Règle de requalification réservée aux anciens comptes financés ; type exact de drawdown à confirmer.',minTradingDays:'Trois jours, sous condition d’éligibilité.'}
    ]
  },
  fintokei: {
    restrictiveRules:[
      {program:'StartTrader — achats depuis le 21 octobre 2026',rule:'Une étape à +3 %, perte quotidienne 2 % et maximum global 8 % fixe. Après financement, plafond de retraits de 400 $ au total, jusqu’à deux demandes.',impact:'Anciennes pages parlant de trois étapes non applicables aux achats récents ; rémunération totale très limitée.'},
      {program:'SwiftTrader — achats depuis le 15 juillet 2026',rule:'Perte maximale fixe de 3 %, quotidienne de 2 %, profit d’évaluation comptabilisé au plus 3 % par jour ; trois jours et 60 jours calendaires maximum.',impact:'La marge de risque est mince, même si l’objectif se limite à 6 %.'},
      {program:'ProTrader et ProTrader Swing — deux phases',rule:'Perte globale fixe de 10 %, limite quotidienne 5 %, mais référence de calcul EOD équité pour ProTrader et solde clôturé pour Swing.',impact:'Le même gain latent ne modifie pas nécessairement les deux seuils quotidiens de façon identique.'}
    ],
    products:[
      {name:'StartTrader — une étape (depuis 21/10/2026)',drawdownDetails:'Seuil fixe ; un premier dépassement journalier est souple, un second définitif.',maxDrawdown:'8 % fixes',profitTarget:'3 %',maxDailyLoss:'2 %',minTradingDays:'Trois jours, évaluation sous 60 jours.'},
      {name:'SwiftTrader — une étape (depuis 15/07/2026)',drawdownDetails:'Seuil global fixé à 97 % du capital initial.',maxDrawdown:'3 % fixes',profitTarget:'6 %',maxDailyLoss:'2 %',minTradingDays:'Trois jours en 60 jours.'},
      {name:'ProTrader — deux étapes',drawdownDetails:'Seuil global fixe ; la limite quotidienne repart de l’équité de clôture.',maxDrawdown:'10 % fixes',maxDailyLoss:'5 % depuis équité EOD.'},
      {name:'ProTrader Swing — deux étapes',drawdownDetails:'Seuil global fixe ; limite quotidienne recalculée depuis le solde clôturé.',maxDrawdown:'10 % fixes',maxDailyLoss:'5 % depuis solde clôturé.'}
    ]
  },
  'axi-select': {
    restrictiveRules:[
      {program:'Axi Select Seed à Pro500 — capital propre',rule:'Dépôt personnel réel auprès du courtier Axi (de 500 à 10 000 $ selon l’étape), objectif de progression et plafond de perte statique de 7 % sur l’allocation.',impact:'Les pertes sur le compte de courtage engagent l’argent du trader ; ce n’est pas un challenge démo à risque limité aux frais.'},
      {program:'Axi Select — retrait de fonds personnels',rule:'Retirer son argent du courtier peut réduire l’allocation de manière amplifiée sans abaisser le seuil de perte préexistant.',impact:'Un retrait personnel peut provoquer l’échec du programme malgré l’absence d’une nouvelle perte de trading.'},
      {program:'Axi Select — pays d’éligibilité',rule:'Les pages Axi diffèrent selon les sociétés régionales : certaines juridictions acceptées, d’autres exclues ; disponibilité en France/UE à vérifier sur l’entité contractante.',impact:'Ne pas déduire la disponibilité locale d’une page publicitaire internationale.'}
    ],
    products:[{name:'Axi Select — six étapes de courtage',description:'Allocation théorique de 5 000 à 1 million de dollars, obtenue en tradant d’abord de l’argent personnel réel chez Axi ; les montants indiqués ne sont pas des challenges payants.',drawdownDetails:'Seuil fixe selon l’étape, perte latente incluse ; retirer ses fonds du courtier peut faire tomber l’allocation sous le seuil.',maxDrawdown:'7 % fixes jusqu’à Pro500 ; 10 % sur ProM',profitTarget:'7 % en progression, sauf stade final.'}]
  },
  'city-traders-imperium': {
    restrictiveRules:[
      {program:'CTI 1-Step / 2-Step — évaluation',rule:'1-Step : 5 % suiveurs, objectif 8 % ; 2-Step : 10 % statiques, 5 % par jour et objectifs 10 % puis 5 %, avec trois jours gagnants par phase.',impact:'Les deux formules ne partagent pas le même type de drawdown.'},
      {program:'CTI Instant Funding — capital et retrait',rule:'À l’ouverture, seulement 50 % du capital nominal annoncé ; il faut 10 % de gain pour débloquer le nominal complet, et attendre cinq jours supplémentaires avant premier retrait. Partage 50 %, puis 70 %.',impact:'« Instant » ne veut dire ni totalité du capital dès le premier jour, ni versement immédiat.'},
      {program:'CTI Instant / Direct — montée en capital',rule:'Consistance de 20 % liée à la progression (« scaling ») et non à tous les retraits.',impact:'La règle doit être appliquée au bon événement, sans inventer une interdiction générale de retirer.'}
    ],
    products:[
      {name:'CTI 1-Step Challenge',drawdownDetails:'Suit les pics de gains clôturés ; pas de limite quotidienne fixe.',maxDrawdown:'5 % suiveurs',minTradingDays:'Trois jours bénéficiaires.'},
      {name:'CTI 2-Step Challenge',drawdownDetails:'Plancher de perte fixe à 90 % du capital initial.',maxDrawdown:'10 % statiques',maxDailyLoss:'5 %',profitTarget:'10 % puis 5 %.'},
      {name:'CTI Instant Funding — moitié du nominal au début',drawdownDetails:'Seuil fixe de 6 % ; capital alloué au départ égal à la moitié du montant affiché.',maxDrawdown:'6 % statiques',consistencyRule:'20 % lors des demandes de scaling uniquement.'},
      {name:'CTI Direct Funding — nominal entier',drawdownDetails:'Drawdown fixe de 6 % sans obligation de challenge.',maxDrawdown:'6 % statiques',consistencyRule:'20 % pour le scaling uniquement.'}
    ]
  },
  'trade-the-pool': {
    restrictiveRules:[
      {program:'Day et Swing MAX/FLEX — durée et amplitude',rule:'Le contrat prévoit 60 secondes par défaut mais déroge à 30 secondes pour MAX/FLEX. Un profit doit également couvrir au moins 0,10 $ d’écart entre entrée et sortie.',impact:'Un stop-loss ou TP très rapide peut ne pas être validé ; aucune exception générale automatique confirmée.'},
      {program:'Trade The Pool Edge — 50K/100K',rule:'Durée ≥ 30 secondes, variation ≥ 0,10 $ et taille de position ≤ 5 % du volume négocié sur la minute précédente.',impact:'Les sorties urgentes et les titres peu liquides rendent ces contraintes particulièrement pénalisantes.'},
      {program:'Edge Pro — perte et retraits',rule:'Perte maximale 4 % ; perte quotidienne DÉFINITIVE de 2,5 % (50K) ou 1,8 % (100K), consistance 40 %, retrait minimum 500 $ plafonné à 1 500 / 2 000 $ ; pas de scaling.',impact:'La limite journalière ferme le compte, ce n’est pas une pause ; des gains peuvent rester bloqués.'},
      {program:'Day/Swing MAX et FLEX — consistance',rule:'MAX : limite généralement 30 % pour le gain sur une position en évaluation ; FLEX : généralement 50 %, avec règles conservées en financé et trois jours bénéficiaires.',impact:'Une évaluation courte peut s’accompagner de retraits plus difficiles.'}
    ],
    products:[
      {name:'TTP Day MAX',drawdownDetails:'Le plafond dépend du niveau choisi ; algorithme statique/suiveur non établi pour toutes les tailles.',consistencyRule:'Meilleure position ≤ 30 % en évaluation.'},
      {name:'TTP Day FLEX',drawdownDetails:'Seuil dépendant du niveau d’achat ; pas de modèle unique vérifié.',consistencyRule:'50 % sur la position et trois jours à +0,5 % pour certaines demandes.'},
      {name:'TTP Swing MAX',drawdownDetails:'Conditions Swing à distinguer des produits Day ; seuil exact par taille à confirmer.',consistencyRule:'30 % en évaluation, 70 % en financé selon formule.'},
      {name:'TTP Swing FLEX',drawdownDetails:'Risque propre au Swing FLEX ; le plancher n’a pas été assimilé à tort au Day.',consistencyRule:'Meilleure position ≤ 50 % selon la phase.'},
      {name:'TTP Edge — 50K / 100K',drawdownDetails:'Maximum de 4 % ; calcul en fin de journée sur Pro ; perte quotidienne définitive séparée.',maxDrawdown:'4 % EOD',maxDailyLoss:'2,5 % sur 50K ; 1,8 % sur 100K (fermeture définitive).',consistencyRule:'40 % en Pro ; au moins trente secondes et dix cents par trade.'}
    ]
  },
  fxify: {
    restrictiveRules:[
      {program:'FXIFY challenges — différents drawdowns',rule:'1-Phase : 6 % suiveurs ; 2-Phase Standard : 10 % suiveurs ; Classic : 10 % statiques ; Pro : 8 % statiques ; 3-Phase : 5 % statiques. Pro : objectifs 4 % puis 8 % et trois jours qualifiants.',impact:'Deux offres portant le nom « 2-Phase » ont des marges de perte et des règles de retrait très différentes.'},
      {program:'FXIFY 2-Phase Classic — retraits',rule:'Consistance de 25 % uniquement après financement ; la 2-Phase Pro n’impose pas cette règle et prévoit des cycles de dix jours.',impact:'Une réussite rapide en Classic ne garantit pas un retrait rapide.'},
      {program:'FXIFY Instant Lite — annonce et stop-loss/take-profit',rule:'Dans la fenêtre de cinq minutes autour des annonces majeures, même une sortie automatique SL/TP peut être concernée : profits non retenus, pertes décomptées. Consistance financée 20 %.',impact:'Un TP déclenché pendant une annonce peut ne pas générer de gain payable ; cette règle ne s’applique pas à tous les programmes FXIFY.'}
    ],
    products:[
      {name:'FXIFY One Phase',drawdownDetails:'Suit le pic du solde clôturé et se fige au capital initial.',maxDrawdown:'6 % suiveurs'},
      {name:'FXIFY Two Phase — Standard',drawdownDetails:'Suit les plus hauts de solde et se bloque au capital initial.',maxDrawdown:'10 % suiveurs'},
      {name:'FXIFY Two Phase — Classic',drawdownDetails:'Plancher fixe ; consistance appliquée après financement.',maxDrawdown:'10 % fixes',consistencyRule:'25 % après financement uniquement.'},
      {name:'FXIFY Two Phase — Pro (nouveau)',drawdownDetails:'Plancher statique, pas de consistance.',maxDrawdown:'8 % fixes',profitTarget:'4 % puis 8 %',minTradingDays:'Trois jours à +0,5 % par phase et cycle.'},
      {name:'FXIFY Three Phase',drawdownDetails:'Maximum fixé à 5 % sous le capital initial.',maxDrawdown:'5 % fixes'},
      {name:'FXIFY Instant Funding Lite',drawdownDetails:'Seuil suiveur sur le solde clôturé puis verrouillé ; sorties autour des news pénalisées.',maxDrawdown:'4 % suiveurs',profitSplit:'80 % ; option 90 %',consistencyRule:'Meilleure journée ≤ 20 %, premier retrait après dix jours de trading dont cinq actifs ; news ± cinq minutes.'}
    ]
  },
  'funded-trading-plus': {
    restrictiveRules:[
      {program:'2-Step Classic — évaluation et financé',rule:'Consistance de 35 % à chacune des phases puis 50 % en financé ; perte latente de 3 % maximum par instrument, et 30 jours d’inactivité sanctionnés.',impact:'Un compte financé en gain peut perdre son admissibilité au retrait ou se fermer sur une seule ligne ouverte.'},
      {program:'Instant Funding — fermeture du vendredi',rule:'Drawdown maximal 6 % suiveur sur solde clôturé ; toutes les positions doivent être fermées le vendredi avant 16 h 30 heure de New York.',impact:'Un trade conservé le week-end peut constituer une infraction malgré son potentiel de gain.'},
      {program:'Pass Now Pay Later — changement après validation',rule:'Évaluation à perte maximale fixe 6 % et objectif 2 % ; financement à perte suiveuse de 6 % sur équité latente et 3 % quotidienne, consistance 25 %, dix jours minimum et frais d’activation après réussite.',impact:'L’option à paiement différé devient sensiblement plus contraignante après le challenge.'}
    ],
    products:[
      {name:'1-Step Express',drawdownDetails:'Suit le plus haut solde clôturé puis se verrouille.',maxDrawdown:'6 % suiveurs'},
      {name:'2-Step Classic',drawdownDetails:'Seuil global fixe et limite séparée de 3 % de perte latente par instrument.',maxDrawdown:'8 % statiques',consistencyRule:'35 % par phase, 50 % en financé.'},
      {name:'Instant Program',drawdownDetails:'Suiveur du solde clôturé ; obligation de fermer le vendredi.',maxDrawdown:'6 % suiveurs'},
      {name:'Pass Now Pay Later',drawdownDetails:'Fixe lors de l’évaluation mais suit le pic d’équité latente une fois financé.',maxDrawdown:'6 % fixes en évaluation → 6 % suiveurs en financé',consistencyRule:'25 % une fois financé.'}
    ]
  },
  'goat-funded-trader': {
    restrictiveRules:[
      {program:'GOAT — demandes de rémunération en financé',rule:'Les gains journaliers sont plafonnés à 3 000 $ ; les deux premiers retraits sont plafonnés à 6 % du capital initial ou 10 000 $ (minimum des deux). Frais de traitement 3 %, conditions de vérification et paiement selon modèle.',impact:'Les gains excédentaires et la somme accessible en début de parcours peuvent être limités malgré la performance.'},
      {program:'GOAT — achats postérieurs au 8 octobre 2026',rule:'Le plus gros trade gagnant doit être au moins égal au plus gros trade perdant pour demander un retrait ; cela n’entraîne pas à lui seul la fermeture du compte.',impact:'Un compte bénéficiaire peut être momentanément non éligible au retrait.'},
      {program:'GOAT 1-Step / 2-Step Standard — protections',rule:'1-Step : 6 % statiques et 3 % quotidiens ; 2-Step : 10 % statiques et 4 % quotidiens. Sur certains comptes financés 2-Step, perte latente globale 2 % : partage réduit définitivement à 50 %, puis fermeture à la deuxième alerte ; variante moins chère à 1 % peut fermer dès la première.',impact:'Les options d’achat peuvent modifier radicalement la sanction d’une perte latente.'},
      {program:'GOAT Instant GOAT et Instant Premium',rule:'Les deux modèles suivent 6 % de perte sur le pic d’équité en temps réel et exigent cinq jours à +0,5 %. Instant GOAT : plafond latent 2 % et consistance 15 % ; Instant Premium : limite latente 1 % sur les achats récents.',impact:'Un simple creux latent peut fermer un compte profitable bien avant le drawdown global.'},
      {program:'GOAT Instant Daily — directement financé',rule:'3 % de drawdown suiveur intraday, 1 % de perte latente globale, échéance 30 jours, retrait limité à 1 à 3 % du capital par demande. Un retrait peut verrouiller le seuil au capital initial.',impact:'Retirer toute la marge de gains peut provoquer immédiatement la fermeture ; ce produit n’est pas durable sans limite de temps.'}
    ],
    changelog:["", "", "", "", "", "Réexamen à 58/100 : pénalité de huit points pour l’alerte Trustpilot encore active, plus les contraintes de versement publiées. Aucune fermeture ni faute individuelle non prouvée n’est affirmée.", "La FAQ officielle confirme les plafonds sur les premiers retraits, 3 000 $ de gains quotidiens, 3 % de frais et les conditions d’éligibilité ajoutées depuis le 8 octobre 2026.", "Audit de cinq formules distinctes et de leurs risques de drawdown et de retrait, sans nouvelle pénalité sur la note."],
    products:[
      {name:'GOAT 1-Step — après août 2026',drawdownDetails:'Limite globale fixe à 6 % sous le capital initial.',maxDrawdown:'6 % statiques'},
      {name:'GOAT 2-Step Standard',drawdownDetails:'Plancher fixe, mais Guardian/Guard financé distinct sur perte latente globale.',maxDrawdown:'10 % statiques'},
      {name:'GOAT Instant Funding',drawdownDetails:'Suit immédiatement le plus haut d’équité, avec perte latente 2 % distincte.',maxDrawdown:'6 % suiveurs intraday',consistencyRule:'15 % et cinq jours à +0,5 %.'},
      {name:'GOAT Instant Premium',drawdownDetails:'Suit l’équité en temps réel ; perte latente 1 % distincte.',maxDrawdown:'6 % suiveurs intraday',minTradingDays:'Cinq jours à +0,5 %.'},
      {name:'GOAT Instant Daily',drawdownDetails:'Suiveur 3 % avec plancher verrouillé après retrait et expiration sous trente jours.',maxDrawdown:'3 % suiveurs intraday',maxDailyLoss:'Pas de plafond quotidien séparé, mais perte latente limitée à 1 %.'}
    ]
  },
  ftmo: {
    restrictiveRules: [
      {program:'FTMO 1-Step — challenge et compte financé',rule:'Perte maximale de 10 % suiveuse selon le solde clôturé en fin de journée ; depuis les commandes du 12 octobre 2026, la meilleure journée doit représenter au plus 50 % des profits nets pour passer et retirer. Anciens comptes : ancien dénominateur.',impact:'Une grosse journée gagnante peut retarder la réussite ou le versement sans constituer une violation définitive.'},
      {program:'FTMO Instant — compte directement financé',rule:'Perte maximale de 10 % suiveuse sur les plus hauts de solde clôturé pendant la séance ; perte quotidienne de 3 % et consistance de 30 % au retrait.',impact:'Un compte rentable peut ne pas être éligible au retrait tant que la meilleure journée pèse trop lourd.'},
      {program:'FTMO 2-Step — Standard et Swing',rule:'La formule 2-Step conserve une perte maximale fixe de 10 %, une perte quotidienne de 5 % et quatre jours de trading minimum en évaluation.',impact:'Les conditions de la 1-Step ne doivent pas être étendues à cette formule distincte.'}
    ],
    products:[
      {name:'FTMO Challenge : 2-Step',drawdownDetails:'Seuil de perte globale fixe à 90 % du capital initial ; différent de la formule 1-Step.',maxDrawdown:'10 % fixes du capital de départ',maxDailyLoss:'5 % de perte quotidienne sur l’équité',profitTarget:'10 % en phase 1 ; 5 % en phase 2',minTradingDays:'4 jours de trading en évaluation'},
      {name:'FTMO Challenge : 1-Step',drawdownDetails:'Suit le plus haut solde de clôture à minuit, sans baisser ; remise à zéro lors du remplacement du compte après rémunération.',maxDrawdown:'10 % suiveurs sur solde de fin de journée (EOD)',consistencyRule:'Meilleure journée ≤ 50 % des profits nets (comptes récents) ; ancienne formule différente.'},
      {name:'FTMO Instant (financement direct)',drawdownDetails:'Le plus haut solde clôturé relève le seuil en séance ; ce n’est pas seulement une photo de fin de journée.',maxDrawdown:'10 % suiveurs intraday sur le solde clôturé',consistencyRule:'Meilleure journée ≤ 30 % des profits nets cumulés au retrait.'}
    ]
  },
  the5ers: {
    restrictiveRules:[
      {program:'The5ers High Stakes — évaluation et compte Pro',rule:'Perte maximale fixe de 8 à 10 % du capital initial ; limite quotidienne de 3 à 5 % calculée au rollover. Les ordres exécutés dans les deux minutes avant/après une annonce économique majeure perdent leur profit éligible, mais les pertes restent comptabilisées.',impact:'Une perte journalière ferme le compte ; un gain sur annonce peut ne pas compter.'},
      {program:'The5ers High Stakes — retraits Pro',rule:'Pour les comptes 50K/100K, plafonds publiés de 3 000/4 000 $ par retrait, gains minimum de 300/500 $ ; demandes tous les 14 jours.',impact:'Les profits accumulés ne sont pas forcément retirables en totalité.'},
      {program:'The5ers Bootcamp — trois phases puis Pro',rule:'Pas de pause journalière pendant les phases d’évaluation ; compte Pro soumis à une pause quotidienne de 3 %, et perte maximale réduite de 5 % à 4 % dans l’exemple 20K. Frais non remboursables et 30 jours d’inactivité sanctionnés.',impact:'Les règles se resserrent après le passage en Pro.'},
      {program:'The5ers Bootcamp et Hyper Growth — divergence de calcul',rule:'La FAQ officielle illustrée laisse le seuil de liquidation au niveau initial tandis que les articles éducatifs récents parlent de seuil suiveur. Ces deux explications ne définissent pas le même mécanisme.',impact:'Demander la formule contractuelle et vérifier le seuil dans le tableau de bord avant achat.'}
    ],
    products:[
      {name:'High Stakes (deux phases)',drawdownDetails:'Perte maximale fixe ; la limite journalière est recalculée depuis le plus haut du solde ou de l’équité à la clôture.',maxDrawdown:'8 à 10 % fixes selon la formule'},
      {name:'Bootcamp (trois phases)',drawdownDetails:'Type non confirmé : les explications officielles divergent sur l’évolution du plancher de perte.',maxDrawdown:'5 % en évaluation ; 4 % en Pro sur la formule 20K'},
      {name:'Hyper Growth',drawdownDetails:'Les contenus officiels parlent tantôt de trailing, tantôt d’un plancher fixe ; modèle exact non résolu.'}
    ]
  },
  topstep: {
    restrictiveRules:[
      {program:'Topstep Trading Combine — évaluation',rule:'Perte maximale suiveuse calculée sur le solde de fin de journée, mais perte latente surveillée en temps réel. L’objectif de consistance est limité à 55 % du profit cible.',impact:'Un retournement intraday peut déclencher la liquidation ; une seule grosse journée retarde la réussite.'},
      {program:'Topstep Express Funded — retraits',rule:'Le compte financé commence à zéro, le montant 50K/100K/150K représentant le pouvoir d’achat. Le seuil de perte se verrouille à zéro ; le premier retrait le fixe également à zéro. Le parcours Consistency impose 40 % et trois jours.',impact:'Le retrait réduit la marge restante, avec des conditions différentes selon le parcours choisi.'},
      {program:'Topstep — limite quotidienne selon option',rule:'La limite de perte journalière peut être ajoutée à l’achat ; elle ne doit pas être présentée comme obligatoire pour toutes les évaluations. Elle se distingue du plafond de perte global.',impact:'Comparer l’option sélectionnée et les règles réelles de son compte.'}
    ],
    products:[{name:'Trading Combine puis Express Funded obtenu',drawdownDetails:'Seuil suiveur relevé après la clôture EOD, mais violation contrôlée en séance. Le compte Express démarre avec solde zéro.',maxDrawdown:'Seuil EOD suiveur de 2 000 / 3 000 / 4 500 $',consistencyRule:'Combine : 55 % de l’objectif ; parcours XFA Consistency : 40 % des gains et trois jours.'}]
  },
  'apex-trader-funding': {
    restrictiveRules:[
      {program:'Apex EOD et Intraday — évaluations',rule:'EOD relève son seuil après la clôture ; Intraday le fait immédiatement selon l’équité latente. L’évaluation ne comporte ni consistance ni nombre minimum de jours.',impact:'Les deux mécanismes de perte ne sont pas interchangeables.'},
      {program:'Apex EOD Performance Account — retraits',rule:'Cinq journées gagnantes selon le montant propre à chaque taille, meilleure journée sous 50 % des profits, réserve permanente perte maximale +100 $ et retrait d’au moins 500 $.',impact:'Plusieurs conditions peuvent bloquer un compte pourtant gagnant.'},
      {program:'Apex EOD et Intraday — durée du compte financé',rule:'Six retraits maximum par compte Performance Account, plafonnés selon taille et numéro de demande ; le compte ferme ensuite.',impact:'Pour continuer les retraits, il faut réussir une nouvelle évaluation.'}
    ],
    products:[
      {name:'Évaluation EOD trailing',drawdownDetails:'Seuil recalculé après clôture sur le solde EOD ; violation possible à tout moment lors de la séance suivante.',maxDrawdown:'Suiveur EOD de 1 000 à 4 000 $'},
      {name:'Évaluation trailing intraday',drawdownDetails:'Le seuil peut se resserrer instantanément après un plus haut de gain latent.',maxDrawdown:'Suiveur intraday selon le pic d’équité'}
    ]
  },
  fundednext: {
    restrictiveRules:[
      {program:'FundedNext Stellar et Instant — Quick Strike',rule:'Les gains des trades clôturés en moins de 30 secondes sont rapportés aux profits totaux. Avertissement à 20 % ; à 30 %, passage en challenge suspendu. Sur compte financé : suppression de 100 % des gains Quick Strike, avec risque de clôture en fin de cycle.',impact:'Un TP atteint très vite peut compter s’il est gagnant. Il ne s’agit pas d’une interdiction automatique de chaque trade court, mais les conséquences du ratio sont sévères.'},
      {program:'FundedNext Stellar — tailles importantes',rule:'Les EAs et options VPS/EA sont interdits à partir de 50 000 $ sur les nouveaux challenges. Les jours minimums et cycles dépendent de l’offre et de la date d’achat.',impact:'Une stratégie automatisée autorisée sur 25K peut être interdite sur 50K.'},
      {program:'FundedNext Stellar Instant — news et rémunération',rule:'Autour d’une annonce à fort impact, seulement 40 % des profits des trades concernés sont crédités tandis que 100 % des pertes comptent. Retrait à partir de 1 % de croissance ou dès 5 % après vérification EOD.',impact:'Le gain brut peut dépasser le montant éligible au versement.'}
    ],
    products:[
      {name:'Stellar 1-Step',drawdownDetails:'Plancher fixe à 94 % du capital initial.',maxDrawdown:'6 % statiques',maxDailyLoss:'3 % par jour'},
      {name:'Stellar 2-Step',drawdownDetails:'Plancher fixe à 90 % du capital initial, cinq jours requis pour chaque phase.',maxDrawdown:'10 % statiques'},
      {name:'Stellar Lite',drawdownDetails:'Plancher fixe à 92 % ; option payante pour atteindre 10 % de perte maximale.',maxDrawdown:'8 % statiques',minTradingDays:'Deux jours par phase depuis le 12 octobre 2026 ; cinq pour les anciens comptes'},
      {name:'Stellar Instant',drawdownDetails:'Suit le plus haut solde clôturé et se verrouille au capital initial ; violation contrôlée sur l’équité.',maxDrawdown:'6 % suiveurs du solde clôturé'}
    ]
  },
  'funding-pips': {
    restrictiveRules:[
      {program:'FundingPips 1-Step Flex — de l’évaluation au Master',rule:'Un seul ensemble d’ordres représentant plus de 60 % de l’objectif du challenge déclenche ensuite quatre jours gagnants minimum par retrait. Le compte Master applique aussi quatre avertissements sur perte latente par idée.',impact:'Réussir vite peut ajouter des conditions de retrait absentes de l’évaluation.'},
      {program:'FundingPips 2-Step Standard — retrait à la demande',rule:'Le parcours à 100 % de partage à la demande demande une meilleure journée ≤35 % des profits et sept journées à au moins 0,5 %. Les positions maintenues après la séance ou le week-end nécessitent l’option Swing en financé.',impact:'Le partage de 100 % est conditionnel, pas librement accessible à chaque trade gagnant.'},
      {program:'FundingPips Zero — Master direct',rule:'Sept journées à +0,25 % sur trente jours glissants ; perte globale suiveuse de 5 %, cumul des pertes par idée sur dix minutes et plafonds de 1 % latents et 2 % par idée sur les comptes ≥50K.',impact:'Réouvrir une position perdante ne remet pas le risque à zéro ; plusieurs petites pertes latentes peuvent fermer le compte.'}
    ],
    products:[
      {name:'1-Step Flex',drawdownDetails:'Seuil fixe à 12 % sous le capital initial ; les pertes latentes sont comprises.',maxDrawdown:'12 % statiques'},
      {name:'2-Step Standard',drawdownDetails:'Plancher fixe de 10 % sous le capital initial ; des options peuvent modifier les limites quotidiennes.',maxDrawdown:'10 % statiques',consistencyRule:'Retrait à la demande : meilleure journée ≤35 %, sept jours gagnants ≥0,5 %.'},
      {name:'2-Step Pro',drawdownDetails:'Seuil fixe à 6 % sous le capital initial, indépendant des gains.',maxDrawdown:'6 % statiques',minTradingDays:'Deux jours par phase après le 26 août 2026'},
      {name:'FundingPips Zero',drawdownDetails:'Suit les profits du solde ; pertes des réouvertures sous dix minutes cumulées dans une même idée de trade.',maxDrawdown:'5 % suiveurs',minTradingDays:'Sept jours gagnants ≥0,25 % sur trente jours glissants'}
    ]
  },
  'alpha-capital-group': {
    restrictiveRules:[
      {program:'Alpha One — drawdown et retrait',rule:'Les variantes One 6/10/12 ont des drawdowns suiveurs de 4/6/8 % qui se bloquent au capital initial. Retirer tous les gains après ce verrouillage clôturerait le compte.',impact:'Une offre 1-Step à objectif de 6 % n’a pas nécessairement 6 % de perte statique ; garder une réserve.'},
      {program:'Alpha Direct et comptes Qualified — risque',rule:'La règle par idée de trade existe pour les achats depuis le 21 juillet 2026 : Direct limite le risque à 1 %. Des dépassements de lots peuvent annuler un gain au premier écart puis désactiver le compte.',impact:'Une série de réentrées ou un lot excessif peut rendre les gains non éligibles.'},
      {program:'Alpha Capital — VPN, VPS et identité',rule:'VPN/VPS autorisé sous réserve de prévenir le support ; usage non déclaré susceptible de provoquer fermeture et exclusion. VPN interdit pendant le KYC.',impact:'Déclarer son réseau et obtenir un accord écrit avant l’utilisation.'}
    ],
    products:[
      {name:'Alpha Pro (2 étapes)',drawdownDetails:'Plancher fixe au pourcentage choisi sous le capital initial : 6, 8 ou 10 %.',maxDrawdown:'6 / 8 / 10 % statiques selon la formule'},
      {name:'Alpha One (1 étape)',drawdownDetails:'Suit le plus haut solde clôturé puis se bloque au capital initial.',maxDrawdown:'4 / 6 / 8 % suiveurs pour One 6/10/12'},
      {name:'Alpha Direct',drawdownDetails:'Suit le plus haut solde puis se verrouille au niveau initial après +5 %.',maxDrawdown:'5 % suiveurs depuis le plus haut solde',consistencyRule:'Risque strict de 1 % par idée de trade sur le compte financé.'}
    ]
  },
  'e8-markets': {
    restrictiveRules:[
      {program:'E8 Pro — évaluation et compte de performance',rule:'Plafond de gains comptabilisés de 2 % par jour ; premier retrait relevant le seuil statique de 8 % au capital initial ; seulement 50 % des profits disponibles au retrait, l’autre moitié restant en réserve.',impact:'L’absence de plafond de retrait affiché ne signifie pas que tous les gains sont retirables ; une grosse journée accélère peu la réussite.'},
      {program:'E8 One — retraits',rule:'Drawdown dynamique de 6 % sur le plus haut solde clôturé, verrouillé au capital initial ; consistance de 40 % sur le compte de performance, pas pendant le challenge.',impact:'Un compte peut passer l’évaluation puis devoir réaliser d’autres journées gagnantes pour retirer.'},
      {program:'E8 Zero et Signature — futures',rule:'Zero : consistance de 40 % pendant le challenge, aucune en performance mais cinq retraits maximum. Signature : 35 % de consistance en performance, réserve obligatoire et plafonds.',impact:'Deux offres au trailing EOD similaire peuvent avoir des conditions de versement opposées.'}
    ],
    products:[
      {name:'E8 One (Forex / perpétuels)',drawdownDetails:'Préréglage : 6 % dynamique / 4 % journalier ; options au paiement : 4 à 14 % dynamique et 3 à 9,2 % journalier. Suit le plus haut solde clôturé et se fige au capital initial après l’atteinte du seuil choisi.',maxDrawdown:'6 % dynamiques par défaut (paramétrable)'},
      {name:'E8 Pro (Forex / perpétuels)',drawdownDetails:'Préréglage : 8 % statiques / 2,5 % journalier ; variantes statiques 6 % et 10 %. Le plancher passe au capital de départ après le premier retrait ; la moitié des gains reste en réserve.',maxDrawdown:'8 % statiques par défaut (6 / 10 % possibles)'},
      {name:'E8 Zero Futures',drawdownDetails:'Suit les gains clôturés en fin de journée ; verrouillage au capital initial.',maxDrawdown:'Suiveur EOD'},
      {name:'E8 Signature Futures',drawdownDetails:'Seuil relevé depuis les soldes de clôture et réserve non retirable égale au drawdown.',maxDrawdown:'Suiveur EOD'}
    ]
  },
  'blue-guardian': {
    restrictiveRules:[
      {program:'Blue Guardian CFD Standard et Instant — durée minimale',rule:'Les fiches actuelles imposent une durée minimale de deux minutes pour lutter contre le tick scalping. Aucune exception explicite SL/TP n’a été confirmée dans les pages consultées.',impact:'Un SL ou TP rapide peut créer un doute ; demander la confirmation écrite avant achat plutôt que présumer une exception.'},
      {program:'Blue Guardian Instant Standard — Guardian Shield',rule:'À 1 % de perte latente cumulée, clôture automatique. Premier déclenchement : profit split réduit définitivement de 80 % à 50 % ; deuxième : compte fermé. Cinq journées gagnantes, consistance 20 % et réserve de 1 % après verrouillage.',impact:'Une seule alerte automatique peut réduire définitivement la rémunération ; la deuxième termine le compte.'},
      {program:'Blue Guardian 2-Step Nano — retrait financé',rule:'10 % de perte maximale fixe et 3 % par jour en évaluation ; une fois financé, consistance 50 % et retraits limités à 2 % du capital par cycle.',impact:'La réussite des deux phases ne rend pas tous les gains immédiatement retirable.'}
    ],
    products:[
      {name:'1 Step Standard (CFD)',drawdownDetails:'Suit les plus hauts du solde clôturé ; se bloque au capital initial après +6 %.',maxDrawdown:'6 % suiveurs'},
      {name:'2 Step Standard (CFD)',drawdownDetails:'Plancher fixe de 8 % sous le capital initial pendant les phases et après.',maxDrawdown:'8 % statiques'},
      {name:'2 Step Nano (CFD)',drawdownDetails:'Seuil fixe ; le compte financé ajoute une consistance 50 % et un plafond de retrait.',maxDrawdown:'10 % statiques'},
      {name:'Instant Standard (CFD)',drawdownDetails:'Verrouillage à +6 % ; réserve de 1 % ensuite. Protection distincte à 1 % de perte latente avec réduction permanente du split.',maxDrawdown:'6 % suiveurs'},
      {name:'Instant Starter (CFD)',drawdownDetails:'Se verrouille à 5 000 $ après +5 % ; Shield de perte latente distinct.',maxDrawdown:'5 % suiveurs'}
    ]
  },
  brightfunded: {
    restrictiveRules:[
      {program:'BrightFunded Instant — directement financé',rule:'Drawdown de 5 % suivant l’équité intraday et violation définitive à 1 % de perte latente globale. Avant retrait : réserve 3 %, consistance 15 %, cinq jours à +0,5 % et pire perte au plus égale au meilleur gain.',impact:'Un compte bénéficiaire peut ne pas pouvoir retirer ou fermer sur une fluctuation latente.'},
      {program:'BrightFunded 1-Step Daily — challenge et financé',rule:'La limite maximale de 6 % suit immédiatement le plus haut niveau d’équité latente et se bloque au capital initial. Le retrait garde 1 % en réserve.',impact:'Un gain latent temporaire peut resserrer fortement le seuil avant la clôture du trade.'},
      {program:'BrightFunded — annonces et exécution',rule:'En financé, les trades exécutés dans les cinq minutes avant/après une annonce majeure voient leurs profits retranchés (soft breach). Hedge entre comptes : premier écart souple, deuxième définitif. Inactivité de trente jours sanctionnée.',impact:'Une clôture autour des news peut être rentable sur la plateforme mais non payable ; les anciens comptes ont d’autres conditions.'}
    ],
    products:[
      {name:'1-Step Daily (depuis le 16/11/2026)',drawdownDetails:'Suit les pics d’équité non réalisée en temps réel ; se bloque au capital initial à +6 %.',maxDrawdown:'6 % suiveurs intraday sur équité'},
      {name:'2-Step Bright (depuis le 16/11/2026)',drawdownDetails:'Plancher fixe à 8 % sous le capital initial pendant les deux phases et le financement.',maxDrawdown:'8 % statiques'},
      {name:'Instant (depuis le 16/11/2026)',drawdownDetails:'Suit le pic d’équité, puis verrouille au capital initial ; perte latente séparée de 1 %.',maxDrawdown:'5 % suiveurs intraday',consistencyRule:'Meilleure journée ≤15 %, pire perte ≤meilleur gain et réserve de 3 %.'}
    ]
  },
  'leeloo-trading': {
    restrictiveRules: [
      { program: 'Leeloo Performance Account — compte financé simulé', rule: 'Le support prévoit une concentration maximale de 30 % des profits sur une journée, interdit les trades artificiels (« flipping ») et applique un seuil de liquidation suiveur intraday.', impact: 'Un compte bénéficiaire peut ne pas être éligible au retrait ; le seuil de liquidation peut être touché pendant la séance.' },
      { program: 'Leeloo — demandes de rémunération', rule: 'Les conditions prévoient une vérification manuelle et des plafonds variables selon le compte ; atteindre l’objectif ne garantit pas une approbation immédiate.', impact: 'Consultez la fenêtre et les limites du Performance Account concerné.' }
    ],
    changelog: ["", "Les conditions officielles de 2026 prévoient un contrôle manuel et des plafonds variables : note de 70 à 65, sans attribuer à la société une faute non démontrée.", "Le support officiel rappelle la règle des 30 %, le drawdown suiveur et les limites de positions selon les comptes."]
  },
  'hantec-trader': {
    restrictiveRules: [
      { program: 'RZR Funded — comptes financés standard', rule: 'Le premier retrait est généralement possible 14 jours après le premier trade ; certaines formules prévoient sept jours ou Instant24. Les positions doivent être clôturées avant la demande.', impact: 'Réussir le challenge ne rend pas tous les profits immédiatement disponibles ; tout dépend de la formule achetée.' },
      { program: 'RZR Funded — garantie de retrait', rule: 'Les 24 heures ouvrées annoncées concernent l’approbation ou le refus, pas la réception des fonds. Certains contrôles KYC ou de risque sont exclus.', impact: 'La demande peut rester à l’étude au-delà du délai promotionnel.' }
    ],
    changelog: ["", "", "", "", "La FAQ distingue la décision sous 24 heures ouvrées du virement effectif et exclut certains contrôles supplémentaires. Note de 73 à 70 ; société toujours active sous RZR Funded.", "Trustpilot affiche désormais 4,4/5 sur 880 avis regroupés. Aucune pénalité pour manipulation d'avis n'est appliquée."]
  },
  ftuk: {
    restrictiveRules: [
      { program: 'FTUK Flex Challenge — compte financé', rule: 'Au premier niveau financé, le meilleur jour doit représenter moins de 20 % des gains visés par le retrait ; le seuil évolue avec les niveaux. Le protecteur de compte clôture les positions si la perte latente dépasse 2 % ; deux déclenchements constituent une violation définitive.', impact: 'Un retrait rentable peut rester bloqué par la consistance, et plusieurs clôtures automatiques de risque peuvent faire perdre le compte.' },
      { program: 'FTUK FLEX Futures — compte financé uniquement', rule: 'Après évaluation, limite de perte journalière souple, consistance de 40 %, cinq jours gagnants, réserve à conserver et plafond par retrait. Pendant l’évaluation, aucune limite journalière n’est prévue.', impact: 'Réussir l’évaluation ne rend pas les gains immédiatement retirables ; les contraintes du compte financé ne doivent pas être appliquées au challenge.' },
      { program: 'FTUK Instant Sim Funding — retraits futures', rule: 'Objectif de gains de 6 % pour le retrait, cinq jours gagnants, consistance maximale de 20 %, réserve non retirable et plafonds de retrait variables selon le compte.', impact: 'Il n’y a pas d’évaluation, mais « instantané » ne signifie pas qu’on peut retirer les gains sans conditions.' },
      { program: 'FTUK forex et futures — évaluation et compte financé', rule: 'Chaque position doit rester ouverte au moins 30 secondes, même lorsqu’un stop-loss ou take-profit la ferme plus tôt.', impact: 'Un SL/TP déclenché automatiquement avant 30 secondes peut enfreindre la règle, sans clôture manuelle prématurée.' },
      { program: 'FTUK — connexions au compte et retraits', rule: 'La multiplication ou le changement de serveurs VPN, certains schémas d’adresses IP et une connexion depuis un autre pays non signalée peuvent déclencher un contrôle.', impact: 'FTUK indique qu’une infraction à ces conditions peut entraîner le refus du retrait et la fermeture du compte.' }
    ],
    changelog: ["", "", "La règle officielle impose 30 secondes à tous les trades, y compris en cas de SL/TP. Avec les restrictions de stratégie et d'IP, la note baisse de 72 à 65 sans accuser la société de cacher ses règles.", "Conditions VPN/IP vérifiées ; les plaintes et les réponses de FTUK restent contradictoires et non arbitrées.", "Trustpilot affiche 3,9/5 sur 811 avis ; aucune suspension de note n'est signalée.", "Quatre offres actuelles vérifiées séparément : Flex Challenge 6 % trailing avec verrouillage, Instant Funding 6 % relatif, FLEX Futures et Instant Sim Funding trailing EOD. L'ancien Two-Step à 8 % statique est distinct. Note inchangée."],
    products: [
      { name: 'Flex Challenge (paiement après réussite)', description: 'Évaluation forex/CFD en une étape, dès 9 $ puis frais d’activation après réussite. La limite maximale de 6 % suit les plus hauts de solde clôturé jusqu’au niveau initial.', drawdownDetails: 'Suit le plus haut solde clôturé ; le plancher reste fixe une fois revenu au capital initial.', maxDrawdown: '6 % suiveur ; se verrouille au capital initial', maxDailyLoss: '5 % recalculés à 22 h UTC depuis le plus élevé du solde ou de l’équité', profitTarget: '4 % (une phase d’évaluation)', profitSplit: '60 % au départ, jusqu’à 90 % avec progression', minTradingDays: 'Au moins un jour pendant l’évaluation', consistencyRule: 'Financé : meilleure journée < 20 % des gains demandés au niveau 1 ; plafond relevé progressivement jusqu’à 40 %.' },
      { name: 'Instant Funding (forex/CFD)', description: 'Compte financé simulé sans évaluation. La perte maximale suit le plus haut solde clôturé et se fige quand le plancher atteint le capital initial.', drawdownDetails: 'Suiveur selon le solde clôturé ; ce n’est pas un seuil statique de 6 % avant verrouillage.', maxDrawdown: '6 % relatif/suiveur ; se verrouille au capital initial', maxDailyLoss: '5 % depuis le plus élevé du solde ou de l’équité à 22 h UTC', profitTarget: 'Pas d’évaluation ; 10 % pour progresser de niveau', profitSplit: '65 % au départ, jusqu’à 90 % selon la FAQ officielle', consistencyRule: 'Retrait financé : 20 % aux niveaux 1–2, puis 30 à 40 % aux niveaux suivants.' },
      { name: 'FLEX Futures — évaluation et compte financé', description: 'Évaluation rapide dès 59 $, 30 jours pour réussir, puis frais d’activation distincts. Le compte financé ajoute une perte journalière souple et des conditions de retrait.', drawdownDetails: 'Suit le solde de fin de journée, sans suivre les gains latents ; verrouillage au capital initial +100 $.', maxDrawdown: 'EOD suiveur de 1 000 à 4 000 $ (2,67 à 4 %), verrouillage à +100 $', maxDailyLoss: 'Évaluation : aucune ; financé : limite souple de 500 à 1 750 $ selon la taille', profitTarget: '5 % en évaluation', minTradingDays: 'Évaluation : 1 jour gagnant ; retrait financé : 5 jours admissibles', consistencyRule: 'Retraits financés : meilleure journée ≤ 40 %, minimum 500 $, réserve et plafonds selon le compte.' },
      { name: 'Instant Sim Funding (futures)', description: 'Compte futures simulé sans évaluation ni activation après réussite. L’objectif de 6 % conditionne le retrait, pas une réussite de challenge.', drawdownDetails: 'Le seuil monte avec les soldes de clôture EOD ; l’équité qui touche ce plancher entraîne une violation immédiate.', maxDrawdown: 'EOD suiveur de 1 000 à 5 250 $ ; violation définitive sur l’équité', maxDailyLoss: '750 à 3 000 $ (blocage pour la journée, remise à zéro le lendemain)', profitTarget: 'Pas d’évaluation ; objectif de retrait 6 %', minTradingDays: '5 jours gagnants admissibles avant retrait', consistencyRule: 'Retrait : meilleure journée ≤ 20 % des gains clôturés, réserve et plafond selon le compte.' }
    ]
  },
  'funderpro': {
    restrictiveRules: [
      { program: 'FunderPro Instant — seuil de verrouillage contradictoire', rule: 'Les conditions contractuelles Instant (art. 6.1) indiquent que le drawdown suiveur de 6 % se verrouille au capital initial, mais un exemple chiffré de la FAQ annonce un verrouillage à 94 % de ce capital. Ces deux seuils sont incompatibles.', impact: 'Demandez une clarification écrite et contrôlez le seuil affiché sur le compte avant achat ; nous ne présentons pas cet exemple comme cohérent.' },
      { program: 'FunderPro One-Phase et Pro — évaluation uniquement', rule: 'La meilleure journée ne peut dépasser 40 % des profits sur One-Phase, et 45 % sur chacune des phases Pro. Classic n’applique pas ce test, pas plus que les comptes financés de ces challenges selon la FAQ.', impact: 'Un challenge bénéficiaire peut rester bloqué à cause d’une seule grosse journée ; cette règle ne s’étend pas à Classic ni aux comptes financés.' },
      { program: 'FunderPro Pro Weekly — compte financé uniquement', rule: 'La formule 90 % avec retrait hebdomadaire limite aussi la marge utilisée à 20 %, impose 1 % de profit du capital initial par demande et maintient 5 % de perte quotidienne / 10 % globale.', impact: 'Le partage de gains plus élevé s’accompagne d’une limite de marge pouvant entraîner suppression des gains ou clôture.' },
      { program: 'FunderPro Instant — compte financé direct', rule: 'Le risque est limité à 2 % du capital par idée de trade, même avec plusieurs entrées. Le premier écart peut supprimer les gains, le second ferme le compte ; plus de 80 % de marge peut entraîner une clôture immédiate.', impact: 'Fractionner les ordres ne contourne pas le plafond ; certaines violations peuvent fermer le compte dès la première occurrence.' }
    ],
    products: [
      { name: 'One-Phase — évaluation', drawdownDetails: 'Plancher maximal fixé au capital initial ; le pourcentage exact One-Phase doit être confirmé sur le tableau de bord.', maxDrawdown: 'Pourcentage fixe du capital initial ; valeur One-Phase exacte à confirmer', maxDailyLoss: '3 % du solde de la veille, violation sur l’équité', consistencyRule: 'Évaluation : meilleure journée ≤ 40 % des gains. Aucune consistance après financement selon la FAQ.' },
      { name: 'Classic — challenge 2 phases', drawdownDetails: 'Le seuil maximal reste fixe ; seule la limite quotidienne est recalculée.', maxDrawdown: '10 % statique depuis le capital initial', maxDailyLoss: '5 % sur le solde, réinitialisés à 17 h EST' },
      { name: 'Pro — challenge 2 phases', drawdownDetails: 'Seuil de perte maximal fixe ; formule Pro Weekly limitée à 20 % de marge utilisée.', maxDrawdown: '10 % statique depuis le capital initial', consistencyRule: 'Évaluation uniquement : meilleure journée ≤ 45 % des gains sur les deux phases.' }
    ]
  },
  'maven-trading': {
    restrictiveRules: [
      { program: 'Maven Standard 1-Step — challenge et compte financé', rule: 'Le drawdown maximal de 5 % suit le plus haut de l’équité, profits latents compris ; il ne se verrouille jamais et n’est remis à zéro qu’après un retrait.', impact: 'Un gain latent temporaire peut relever le seuil de liquidation, même si le trade finit avec un plus petit profit.' },
      { program: 'Maven Instant — financement direct', rule: 'Drawdown maximal suiveur de 3 % sur le pic d’équité, limite quotidienne de 2 % et perte latente cumulée maximale de 1 % sur les positions ouvertes.', impact: 'Une position qui reflue après un pic, ou une perte latente cumulée au-delà de 1 %, peut fermer le compte.' },
      { program: 'Maven Standard 2-Step — évaluation', rule: 'Trois jours gagnants d’au moins 0,5 % du capital initial en net sont requis, en plus des objectifs de 8 % puis 5 %.', impact: 'Atteindre le profit cible ne suffit pas si les jours bénéficiaires admissibles manquent.' },
      { program: 'Maven Buy Now Pay Later — évaluation / financé', rule: 'En évaluation : 10 % de perte statique sans limite journalière. En financé : perte maximale suiveuse de 8 % et perte journalière EOD de 4 %.', impact: 'Les limites changent après réussite ; le seuil statique de 10 % ne s’applique pas automatiquement au compte financé.' }
    ],
    products: [
      { name: 'Standard 1-Step — suiveur', drawdownDetails: 'Suit sans verrouillage les plus hauts d’équité, profits latents compris ; remis à zéro après retrait.', maxDrawdown: '5 % suiveur depuis le plus haut d’équité intraday' },
      { name: 'Static 1-Step', drawdownDetails: 'Seuil permanent fixé sous le capital initial : il ne suit pas les gains.', maxDrawdown: '5 % statique sous le capital initial' },
      { name: 'Standard 2-Step', drawdownDetails: 'Drawdown maximal fixe, mais le reset quotidien sur l’équité peut provoquer une violation temporaire.', maxDrawdown: '8 % statique sous le capital initial' },
      { name: 'Standard 3-Step', drawdownDetails: 'Seuil fixe de 3 % sur la vie du compte, distinct de la limite quotidienne.', maxDrawdown: '3 % statique sous le capital initial' },
      { name: 'Instant — compte financé simulé', drawdownDetails: 'Les pics de gains latents comptent ; perte latente cumulée limitée séparément à 1 %.', maxDrawdown: '3 % suiveur depuis le pic d’équité intraday', maxDailyLoss: '2 % quotidiens, plus plafond de 1 % de perte latente cumulée' }
    ]
  },
  'instant-funding': {
    restrictiveRules: [
      { program: 'Instant Funding Pro — compte financé direct', rule: 'Le seuil de perte maximale annoncé à 10 % se resserre à 5 % du capital initial après 5 % de gains clôturés. Le drawdown doit être verrouillé avant retrait ; premier retrait à 14 jours, puis tous les sept jours.', impact: 'Le trader ne peut pas forcément retirer avant d’avoir atteint le verrouillage des 5 %, même sur une formule « instantanée ».' },
      { program: 'Instant Funding One-Phase Pro — évaluation et financé', rule: 'Une idée de trade ne peut dépasser la moitié de la limite de perte journalière initiale ; les entrées du même sens et les réouvertures sous dix minutes s’additionnent. Dépassement : violation définitive.', impact: 'Refermer puis rouvrir rapidement ne réinitialise pas le risque. Les retraits exigent aussi 40 % de consistance et un montant minimum.' },
      { program: 'Instant Funding Two-Phase — évaluation et financé', rule: 'Limite par idée de trade à 50 % de la perte quotidienne initiale et plafond de lots par classe d’actifs ; un dépassement de lots peut réinitialiser le compte. Retraits : 40 % de consistance et minimum 1,5 % du capital ou 25 $.', impact: 'Le drawdown maximal statique de 10 % n’annule pas les restrictions de taille de positions ni les conditions de retrait.' }
    ],
    products: [
      { name: 'Instant Funding Pro (anciennement Smart)', drawdownDetails: 'Resserrement unique après +5 % de profit clôturé ; ce verrouillage est exigé avant retrait.', maxDrawdown: '10 % initialement, puis plancher verrouillé à capital initial −5 %', profitTarget: 'Sans évaluation ; +5 % de solde pour le verrouillage' },
      { name: 'One-Phase Pro', drawdownDetails: 'Seuil de perte maximal fixé pour toute la vie du compte, même lorsque les gains augmentent.', maxDrawdown: '8 % statique sous le capital initial' },
      { name: 'Two-Phase — challenge', drawdownDetails: 'Perte maximale fixe ; plafonds de lots et de risque par idée distincts.', maxDrawdown: '10 % statique sous le capital initial' }
    ]
  },
  'audacity-capital': {
    restrictiveRules: [
      { program: 'Audacity Capital Ability One — évaluation', rule: 'La FAQ officielle impose au moins trois jours de trading, dont deux gagnants, tandis que le tableau des conditions générales n’indique aucun jour minimum. Les textes actuels se contredisent.', impact: 'Il faut une confirmation écrite du règlement lié à la date d’achat, sans présenter une version comme certaine.' },
      { program: 'Audacity Capital Ability One — financé uniquement', rule: 'Consistance maximale de 50 %, premier retrait après 14 jours, puis toutes les deux semaines. Pour les achats depuis le 2 novembre 2026, les frais Ability One ne sont plus remboursés.', impact: 'Un compte bénéficiaire peut devoir trader davantage avant retrait ; ne comptez pas récupérer les frais d’entrée.' },
      { program: 'Audacity Capital FTP Instant — tous les comptes actifs', rule: 'La limite quotidienne de 5 % suit le pic d’équité intraday. La perte maximale démarre à −10 %, puis se bloque au capital initial après +10 % ; un seul FTP actif autorisé et 35 % de consistance.', impact: 'Un gain latent relève le seuil quotidien, puis le verrouillage maximal empêche de repasser sous le capital initial.' }
    ],
    products: [
      { name: 'Ability Challenge (2 phases)', drawdownDetails: 'Plancher fixe à chaque phase, mais le pourcentage autorisé baisse après la première.', maxDrawdown: '15 % statique phase 1 ; 10 % statique phase 2 et financé' },
      { name: 'Ability One (1 phase)', drawdownDetails: 'Perte maximale fixe de 6 % depuis le capital initial ; équité contrôlée en temps réel.', maxDrawdown: '6 % statique en évaluation et financé', minTradingDays: 'Contradiction : FAQ 3 jours (2 gagnants), conditions générales aucun' },
      { name: 'FTP Instant Funding', drawdownDetails: 'Perte quotidienne suiveuse selon le pic d’équité ; perte maximale verrouillée au capital initial après +10 %.', maxDrawdown: '10 % initialement fixe, puis verrouillé au capital initial à +10 %', maxDailyLoss: '5 % suiveurs sur le pic d’équité intraday, réinitialisés chaque jour' }
    ]
  },
  'the-trading-pit': {
    restrictiveRules: [
      { program: 'The Trading Pit Futures Prime — évaluation', rule: 'Le drawdown maximal suit les soldes EOD puis se fige au capital initial. Trois jours de trading minimum, consistance de 40 % et clôture forcée des positions avant 15 h 55 CT.', impact: 'Un seul très gros jour ou une position laissée en séance tardive peuvent empêcher la réussite ou provoquer une clôture automatique.' },
      { program: 'The Trading Pit Futures Prime — retraits financés', rule: 'Cinq jours gagnants d’au moins 150 $ ; demandes espacées de sept jours ; maximum 50 % des gains réalisés, dans des plafonds de 2 500/3 500/5 000 $ selon la taille du compte.', impact: 'Un compte positif ne rend pas tous les gains retirables en une fois.' },
      { program: 'The Trading Pit Futures Instant — retraits financés', rule: 'Consistance maximale de 20 %, cinq jours de trading, minimum 500 $ et plafonds évolutifs. La pause quotidienne augmente avec 60 % du plus haut profit cumulé EOD.', impact: 'Le compte instantané reste soumis à une forte concentration des gains et à des plafonds ; cette pause évolutive est distincte du drawdown maximal EOD.' }
    ],
    products: [
      { name: 'Futures Prime — challenge', drawdownDetails: 'Suit le solde de fin de journée puis se bloque au capital initial ; franchir le seuil actif en équité fait perdre le compte.', maxDrawdown: '2 000 à 4 500 $ suiveurs EOD, puis plafond fixe au capital initial' },
      { name: 'Futures Instant (sans challenge)', drawdownDetails: 'Drawdown maximal suiveur EOD jusqu’au capital initial ; pause quotidienne qui se relève séparément.', maxDrawdown: '2 000 $ (50K), 3 500 $ (100K), calcul EOD' }
    ]
  },
  'lux-trading-firm': {
    restrictiveRules: [
      { program: 'Lux — parcours Rules of Engagement (évaluation/financé)', rule: 'Cette page annonce 6 % de drawdown statique, 80 % de partage en phase financée et un retrait à la demande après contrôle.', impact: 'Le paiement dépend toujours de la revue de risque ; vérifiez que ce règlement est celui associé à votre achat.' },
      { program: 'Lux — page Career Plan (application actuelle non vérifiée)', rule: 'Une autre page officielle accessible annonce des retraits mensuels, 75 % de partage et un drawdown relatif/hybride, contre 80 % et le retrait à la demande ailleurs.', impact: 'Ces pages peuvent viser des programmes distincts ou anciens : il faut confirmer quel accord signé s’applique.' }
    ],
    changelog: ["", "", "Plusieurs pages officielles annoncent 80 % et un retrait à la demande, contre 75 % et un retrait mensuel sur un parcours distinct : note de 74 à 64 pour manque de clarté, sans conclure à un refus de paiement prouvé.", "Les anciennes règles Career et une FAQ d'essai sont encore accessibles ; leur application aux offres actuelles n'a pas été établie.", "Companies House confirme l'existence active de la société britannique, sans garantir ses versements.", "Trustpilot affiche désormais 3,7/5 sur 627 avis, sans alerte de note retenue."]
  },
  'sure-leverage': {
    regulatoryStatus: ["Le site officiel nomme ASAP Solutions FZ-LLC à Ras Al Khaimah comme société qui facture les challenges ; son immatriculation n'a pas été vérifiée directement.", "Le site nomme Sure Leverage Funding Ltd à Sainte-Lucie (n° déclaré 2025-00514) comme prestataire des comptes simulés ; l'enregistrement n'a pas été vérifié.", "La société présente une activité de simulation et non un compte de courtage réglementé par défaut."],
    complaintsAndDisputes: ["Trustpilot masque désormais la note pour infraction à ses règles et annonce avoir retiré de faux avis ; 1 356 avis demeurent visibles.", "Trustpilot ne dit pas publiquement si les avis supprimés provenaient de la société, de prestataires, de tiers ou de concurrents.", "Les délais annoncés de versement et les règles d'un ancien programme n'ont pas été testés par une vérification bancaire indépendante pour tous les challenges actuels."],
    redFlags: ["L'ancienne note Trustpilot 3,6/5 est devenue caduque après une sanction de modération.", "Deux entités juridiques annoncées, aux Émirats et à Sainte-Lucie ; responsabilités et registres à distinguer.", "Les volumes de comptes et de gains affichés par la société restent déclaratifs."],
    changelog: ["Trustpilot retire la note pour non-respect de ses règles et faux avis supprimés. Ancienne moyenne masquée, sociétés contractantes annoncées identifiées, sans accusation sur l'origine des avis. Note 55 à 53 et logo fourni intégré.", "Redirection du domaine historique vers Sure Leverage Funding et ancienne note Trustpilot 3,6/5 observées en octobre, maintenant périmées.", "Conditions de l'ancien 2-Step consultées : objectifs, pertes, cohérence, actualités et délai de traitement déclaratif."],
    entities: ["Vendeur et encaisseur des frais des programmes, d'après le site ; immatriculation non consultée directement.", "Prestataire déclaré de la plateforme de trading simulé, distinct du vendeur émirien."],
    incidents: ["18/11/2026 — Trustpilot indique avoir masqué la note de sureleveragefunding.com pour infraction à ses règles et retiré de faux avis. La plateforme n'identifie pas leur auteur ou commanditaire. Source : https://www.trustpilot.com/review/sureleveragefunding.com"]
  },
  'fast-track-trading': {
    regulatoryStatus: ["Dossier de liquidation Chapter 7 n° 25-10470 : Fast Track Trading LLC a déposé sa demande le 16 janvier 2025 au New Jersey ; le registre était encore actif le 16 novembre 2026.", "La CSA canadienne publie une alerte de la BCSC datée de janvier/février 2025, citant Fast Track Trading et son ancien domaine .net. Une alerte ne constitue pas un jugement.", "Aucun opérateur légal ou point de vente actuel de challenges ni repreneur vérifié n'a été authentifié."],
    complaintsAndDisputes: ["Le liquidateur a engagé des procédures visant certains transferts anciens, avec notamment des demandes fondées sur le paragraphe 547 en novembre 2026. Leur bien-fondé doit être tranché au cas par cas.", "L'ancien Trustpilot 3,1/5 sur 819 avis ne prouve ni capacité de paiement actuelle ni poursuite de l'activité.", "Le traitement final de toutes les créances clients et les défenses individuelles ne sont pas contrôlés."],
    redFlags: ["Liquidation américaine Chapter 7 confirmée, contrairement à l'ancien classement « jeune société à surveiller ».", "Alerte aux investisseurs publiée par un organisme canadien pour le nom et le domaine correspondants.", "Certaines anciennes sommes versées font l'objet d'actions du liquidateur ; prudence face à toute prétendue réouverture ou agence de récupération."],
    changelog: ["Rectification majeure : procédure Chapter 7 du New Jersey n° 25-10470 et actions de récupération du liquidateur documentées. Une procédure n'est pas une condamnation générale des anciens traders. Note 60 à 2, statut fermé, achats désactivés.", "Alerte BCSC/CSA du début 2025 pour le domaine .net ; son existence n'est pas un jugement de culpabilité.", "Les anciennes conditions nommaient Fast Track Trading LLC mais ne précisaient pas son État d'incorporation.", "Ancienne note Trustpilot lue à 3,1/5 sur 821 avis.", "Ancien compteur Trustpilot actualisé à 819 avis."],
    entities: ["Société débitrice dans le dossier Chapter 7 n° 25-10470 au New Jersey. La juridiction du tribunal ne démontre pas son État d'immatriculation."],
    incidents: ["16/01/2025 — Fast Track Trading LLC dépose une liquidation Chapter 7 au New Jersey. Des actions de récupération de certains transferts figurent au dossier en novembre 2026, sans préjuger du résultat de chaque procès. Source : https://www.bkalerts.com/recent-bankruptcy-cases/new-jersey-bankruptcy-court/3:25-bk-10470/bankruptcy-case-fast-track-trading-llc", "24/01/2025 — La CSA canadienne relaie une alerte BCSC sur Fast Track Trading et fasttracktrading.net ; il ne s'agit pas d'une condamnation. Source : https://www.securities-administrators.ca/investor-alerts/fast-track-trading/"]
  },
  'fortunes-funding': {
    regulatoryStatus: ["L'ancien domaine fortunesfunding.com présentait une page d'hébergement suspendu début novembre 2026 ; aucun autre domaine authentifié.", "Le centre d'aide avait publié des règles officielles en avril 2026, ce qui interdit d'affirmer une fermeture continue depuis 2024.", "La société contractante actuelle, sa juridiction et sa dissolution ne sont pas confirmées."],
    complaintsAndDisputes: ["Trustpilot donnait historiquement 3,6/5 sur 576 avis. Des clients de 2026 décrivent des problèmes d'accès et des comptes fermés, sans décision indépendante.", "Aucun état complet des gains et remboursements dus après la suspension d'hébergement n'a été trouvé."],
    redFlags: ["Boutique d'achat indisponible sur l'ancien domaine lors du dernier contrôle daté.", "Ancien arrêt en 2024 et contenu de reprise en 2026 ne doivent pas être confondus avec une liquidation juridique.", "Les notes et offres historiques pourraient laisser croire à tort que le vendeur fonctionne actuellement."],
    changelog: ["Classée commercialement inactive après la suspension d'hébergement, sans déclarer une dissolution : centre d'aide encore actif en avril 2026 et annonces anciennes contradictoires. Trustpilot 3,6/5 et note historique 56/100 conservés à la demande du propriétaire, achats bloqués.", "Trustpilot historique : 3,6/5 sur 576 avis.", "Le domaine affichait une page suspendue début novembre ; premier avertissement mis en place." ]
  },
  'trade-amber': {
    regulatoryStatus: ["L'ancien domaine tradeamber.com renvoyait une erreur DNS pendant les contrôles indépendants d'octobre et les vérifications de novembre 2026.", "Trustpilot indique que le site de l'entreprise a fermé ; aucun domaine de reprise officiel n'a été identifié.", "Aucun acte de dissolution, jugement ou décision du régulateur n'a été vérifié."],
    complaintsAndDisputes: ["Aucun solde de remboursements ou de gains anciens n'a pu être contrôlé après la disparition du site.", "Les anciennes conditions et évaluations reprises par des annuaires ne prouvent pas une activité actuelle."],
    redFlags: ["Ancien domaine hors service, exploitant et contrat actuels introuvables.", "Des annuaires peuvent encore afficher des challenges anciens.", "Sort des anciennes obligations et éventuelle reprise inconnus."],
    changelog: ["Site commercial indisponible en octobre et novembre, Trustpilot marque le site fermé. Fiche classée inactive, note 50 à 10 et logo historique ajouté ; dissolution légale non démontrée.", "Ancien domaine inaccessible et avis Trustpilot de site fermé repérés le 14 novembre."]
  },
  'limitless-funding': {
    regulatoryStatus: ["limitlessfunding.com était stationné en novembre, et limitlessfunding.io redirigeait hors du service de prop trading.", "Trustpilot présente une adresse à Zagreb sans identifier une entreprise contractante actuelle enregistrée et vérifiée.", "Aucun acte de dissolution ou avertissement réglementaire officiel n'a été confirmé."],
    complaintsAndDisputes: ["Trustpilot affiche 4,1/5 sur seulement 23 avis et zéro avis depuis douze mois ; au moins un commentaire semble concerner un service différent de nettoyage de crédit.", "Aucun calendrier de gains ou de remboursements dus aux anciens clients ne peut être authentifié."],
    redFlags: ["Les deux domaines connus ne proposent plus de contrat ni d'achat fiable.", "La faible quantité et l'ancienneté des avis ne prouvent pas l'activité actuelle.", "Aucun repreneur, circuit de réclamation ou dissolution démontrés."],
    changelog: ["Trustpilot historique 4,1/5 sur 23 avis anciens, sans activité récente. Domaines stationné ou redirigé hors trading. Fiche déplacée en archives inactives, note 50 à 12, achats bloqués.", "Avertissement initial de novembre : ancien .com stationné et .io redirigé ailleurs."]
  },
  'myfundedfx': {
    regulatoryStatus: ["Finance Magnates a documenté la fermeture de tous les comptes et positions de prop trading CFD le 6 février 2026 et la date limite du 28 février pour les remboursements et derniers paiements admissibles.", "L'ancien domaine MyFundedFX redirige vers Seacrest Markets qui annonce à son tour ne plus opérer.", "Le pied de page affirme une immatriculation sud-africaine 2023/703336/07, une licence FSCA 53315 et un commerçant distinct chypriote HE455361 : ces déclarations n'ont pas été vérifiées au registre, ni appliquées automatiquement aux contrats de trading virtuel.", "MyFunded Futures était présenté comme un programme futures distinct encore actif lors de l'annonce de fermeture des challenges CFD ; son état actuel ne se déduit pas de cette annonce."],
    complaintsAndDisputes: ["Les remboursements annoncés concernaient les challenges actifs sans infraction ; les comptes inactifs, en infraction ou offerts étaient exclus, avec une date limite de demande au 28 février 2026.", "La société évoquait un traitement sous trente jours et le paiement des gains admissibles, sans bilan bancaire indépendant du règlement de tous les dossiers.", "Le profil Trustpilot historique porte maintenant le nom Seacrest Markets et mélange les périodes ; des captures contradictoires montrent tantôt 4,3/5, tantôt une note indisponible. Cette moyenne n'est pas attribuée au challenge fermé."],
    redFlags: ["L'ancien programme de challenges CFD et le site du courtier affichent tous deux leur cessation d'activité.", "Les délais de réclamation sont passés ; toute nouvelle promesse de récupération ou de relance demande une vérification de l'exploitant.", "Deux sociétés sud-africaine et chypriote sont citées ; une licence FSCA revendiquée ne garantit pas les gains simulés.", "Ne pas confondre MyFundedFX/SeacrestFunded et MyFunded Futures."],
    changelog: ["L'audit reconstitue la fermeture du 6 février, les exclusions de remboursement, la date limite du 28 février, la marque futures distincte, la fermeture ultérieure de Seacrest Markets et deux contreparties déclarées. Note 5/100 inchangée, aucun bilan indépendant de règlements.", "L'ancien domaine renvoie à la page de fermeture du courtier qui nomme une société sud-africaine et un commerçant chypriote ; les registres n'ont pas été vérifiés."],
    entities: ["Société annoncée comme propriétaire du domaine de fermeture et courtier CFD réglementé ; cette déclaration ne garantit pas la protection des anciens challenges virtuels.", "Société citée comme commerçant et vendeur des services ; sa responsabilité précise envers les anciens challenges MyFundedFX n'est pas établie."],
    incidents: ["06/02/2026 — SeacrestFunded clôt les positions et comptes CFD de l'ancien MyFundedFX. Le délai de demandes des remboursements et gains admissibles expirait le 28 février ; leur règlement intégral n'est pas confirmé. Source : https://www.financemagnates.com/forex/seacrest-ends-prop-trading-after-integrating-myfundedfx-shifts-focus-to-cfds/"]
  },
  'surgetrader': {
    regulatoryStatus: ["Le communiqué de SurgeTrader du 24 mai 2024, reproduit par la presse spécialisée, annonce l'arrêt complet des opérations.", "Match-Trade Technologies indiquait mettre fin au partenariat pour des motifs contractuels et de conformité, tandis que SurgeTrader contestait ces motifs ; aucun jugement définitif n'a été identifié.", "Le domaine surgetrader.com renvoie désormais vers un vendeur de noms de domaine et non vers des contrats actifs.", "L'état exact de la société au registre, sa dissolution juridique et la propriété future du domaine ne sont pas vérifiés."],
    complaintsAndDisputes: ["Trustpilot donne encore 3,8/5 sur 1 241 avis historiques, avec un seul avis sur l'année passée ; ce n'est pas une preuve d'activité actuelle.", "Des clients historiques signalaient des délais de gains et des difficultés de communication, sans rapprochement indépendant de tous les règlements.", "Les raisons de la rupture avec le prestataire de plateforme restent contradictoires et ne doivent pas être présentées comme une infraction établie."],
    redFlags: ["L'ancien domaine de marque est en vente, ce qui facilite de futures usurpations.", "Arrêt définitif en 2024, sans successeur opérationnel vérifié.", "Aucun bilan indépendant des paiements dus aux anciens clients ou contrat actuel authentifié."],
    changelog: ["Fermeture de mai 2024 et domaine en vente revérifiés. Les différends techniques ne sont pas considérés comme des fautes établies. Trustpilot historique 3,8/5 sur 1 241 avis. Note 6/100 inchangée, sans achat ni successeur légal vérifié."]
  },
  'true-forex-funds': {
    regulatoryStatus: ["Le domaine officiel annonce que True Forex Funds a cessé toute activité et ferme définitivement pour insolvabilité financière.", "La fiche CFTC RED du 12 juin 2023 nomme True Forex Funds et trueforexfunds.com, décrivant une activité paraissant nécessiter une immatriculation américaine absente.", "La CFTC indique expressément que la présence sur sa liste ne constitue pas une conclusion d'infraction par l'autorité ou un tribunal.", "La presse rapporte une rupture MetaTrader en février 2024, puis l'arrêt commercial en mai ; l'éventuelle procédure juridique d'insolvabilité demeure non vérifiée."],
    complaintsAndDisputes: ["Trustpilot affiche 4,0/5 sur 2 948 avis du domaine, aucun lors des douze derniers mois : cette note concerne une activité ancienne.", "L'annonce de fermeture ne présente pas une procédure de remboursement ou un rang de créanciers vérifié ; les litiges individuels restent sans décision indépendante."],
    redFlags: ["Fermeture définitive pour insolvabilité annoncée sur le site officiel.", "Inscription sur la liste RED de la CFTC pour le domaine exact, distincte d'un jugement de faute.", "Aucun contrat de trading actuel, repreneur ni bilan de versement final confirmé ; les avis positifs anciens peuvent induire en erreur."],
    changelog: ["La fiche officielle CFTC du 12 juin 2023 est authentifiée avec sa réserve explicite d'absence de jugement. Fermeture pour insolvabilité confirmée et Trustpilot 4,0/5 historique. Note de 7 à 4/100, sans accuser la société d'une condamnation.", "L'ancien domaine annonce toujours une fermeture définitive pour insolvabilité, sans acte judiciaire ni règlement final de tous les clients vérifiés."],
    incidents: ["12/06/2023 — La CFTC américaine inscrit True Forex Funds (trueforexfunds.com) sur sa liste RED pour une apparente absence d'immatriculation requise ; l'autorité précise que cela ne prouve pas une violation de la loi. Source : https://www.cftc.gov/REDlist/node/245841"]
  },
  'funded-engineer': {
    regulatoryStatus: ["Finance Magnates a reproduit l'annonce officielle du 15 juillet 2024 : arrêt immédiat et définitif et intention de déposer le bilan.", "La perte du prestataire FPFX et des accès de plateforme avait perturbé le service, sans attribution judiciaire des responsabilités.", "Aucun registre de société, dossier de tribunal, administrateur, procédure de créance ou contrat commercial actuel n'a été authentifié."],
    complaintsAndDisputes: ["L'annonce de fermeture ne fournissait pas d'état complet des gains dus et remboursements des anciens traders.", "Trustpilot historique : 3,8/5 sur 1 215 avis, aucun nouveau sur douze mois ; les allégations de gains non versés ne sont pas tranchées.", "L'intention de déposer le bilan ne doit pas être transformée en dépôt réel ou en jugement de faillite prouvé."],
    redFlags: ["Fermeture définitive assortie d'une procédure d'insolvabilité seulement annoncée.", "Perte des infrastructures de trading essentielles et absence de prestataire ou société actuelle vérifiés.", "Aucun bilan indépendant des remboursements, gains dus ou distributions de faillite."],
    changelog: ["Le communiqué du 15 juillet 2024 est distingué d'une procédure judiciaire non prouvée. Trustpilot 3,8/5 sur 1 215 avis historiques, sans état final des créances. Note de 10 à 6/100, achats bloqués."]
  },
  'skilled-funded-traders': {
    regulatoryStatus: ["Le communiqué officiel du 28 mars 2024, repris par FX News Group, suspendait toutes les opérations et les ventes et promettait de recontacter chaque client.", "Finance Magnates relatait l'affirmation d'un ancien dirigeant sur une cession de ses parts à Easton le 15 mars ; FX News Group soulignait une incertitude sur le lien juridique exact.", "Aucun service actuel vérifié, contrat, dissolution au registre ou repreneur autorisé ne sont authentifiés en novembre 2026."],
    complaintsAndDisputes: ["La presse a relayé des plaintes de traders sur le non-versement de gains et les conditions de trading au moment de la suspension, sans bilan indépendant des solutions apportées.", "Trustpilot ancien : 4,0/5 sur 1 066 avis, zéro nouveau en douze mois. Cela ne démontre pas une capacité de paiement actuelle ou une reprise en 2024.", "Le suivi individuel promis et les obligations contractuelles précises d'Easton n'ont pas été vérifiés comme achevés."],
    redFlags: ["Ventes et trading suspendus depuis mars 2024, sans successeur opérationnel confirmé.", "Le lien à Easton et les changements éventuels de propriété ne prouvent pas le transfert légal des droits de chaque trader.", "Avis anciens et éventuelle réutilisation de la marque ne doivent pas être présentés comme une prop firm actuelle."],
    changelog: ["Relecture de la suspension officiellement temporaire de mars 2024, des incertitudes autour d'Easton, de l'absence de reprise et de Trustpilot historique 4,0/5 sur 1 066 avis. Note 8/100 inchangée, sans prétendre à une dissolution juridique."]
  },
  'funded-peaks': {
    regulatoryStatus: ["La FAQ de l'ancien domaine décrit désormais une activité d'avis sur les casinos promotionnels et marchés prédictifs, et non des challenges de trading.", "Un contrôle indépendant d'octobre 2026 constatait l'arrêt du site de prop trading, sans contrat actuel ni repreneur vérifié.", "Aucun document de dissolution légale, nouveau contrat de prop firm ou transfert des obligations anciennes n'a été authentifié."],
    complaintsAndDisputes: ["Trustpilot indique 3,0/5 sur 152 avis du domaine historique. Les deux avis récents concernent la nouvelle activité de comparateur de jeux.", "Plusieurs témoignages de 2024 dénoncent des retards de retraits ou des dysfonctionnements, sans règlement indépendant vérifié."],
    redFlags: ["Domaine de l'ancienne prop firm reconverti en avis sur les jeux.", "Avis de clients historiques et avis sur la nouvelle activité mélangés sous un même domaine.", "Aucun challenge, repreneur légal ni bilan des paiements anciens vérifié."],
    changelog: ["Prop firm commerciale classée fermée : son ancien domaine présente un comparateur de casinos et marchés prédictifs. Dissolution légale et remboursement des clients non vérifiés. Note de 32 à 12 et achats désactivés.", "Trustpilot donne 3,0/5 sur 152 avis, dont deux récents liés aux casinos et non aux versements de l'ancienne prop firm."]
  },
  'prop-number-one': {
    regulatoryStatus: ["Les conditions officielles de 2025 identifient Edu Technologies – FZCO à Dubaï (DSO-FZCO-44390, licence 46581), sans vérification directe au registre.", "Le contrat décrit des frais d'évaluation virtuelle, pas un dépôt bancaire ou une garantie d'indemnisation par un courtier.", "Les pages commerciales et listes de retraits publiées par la société ne prouvent ni paiements bancaires, ni contrat inchangé en 2026."],
    complaintsAndDisputes: ["Trustpilot affiche 2,9/5 sur 920 avis, dont 250 en douze mois et 27 % à une étoile.", "En 2026, plusieurs clients déclarent attendre des versements depuis des mois ou contestent des violations de règles et des fermetures de comptes ; la résolution de chaque dossier n'a pas été authentifiée.", "La publicité du site annonçant 4,6/5 et sa liste de retraits n'ont pas été rapprochées de la note externe ou des virements réels."],
    redFlags: ["Nombreuses plaintes récentes sur des retraits et des exclusions malgré des promesses de versement rapide.", "Note promotionnelle discordante avec le Trustpilot externe à 2,9/5.", "Immatriculation et licence citées dans les conditions de 2025 non vérifiées actuellement ; aucun échantillon indépendant de virements réglés."],
    changelog: ["Conditions officielles de 2025 identifiées, mais registre et virements non contrôlés. Trustpilot 2,9/5 sur 920 avis et plusieurs litiges récents. Note 31 à 26, vigilance et blocage des achats, sans affirmer une fraude ou une fermeture.", "Les conditions officielles de 2025 nomment Edu Technologies – FZCO et distinguent les frais d'évaluation des dépôts ; immatriculation restant à vérifier auprès des autorités."]
  },
  'karma-prop-traders': {
    regulatoryStatus: ["La bannière officielle de Karma annonce son rachat par Sway Funded et la suspension des achats et du trading propres à Karma.", "Le pied de page indique Sway Funded LTD (non-courtier) et Sway Funded LLC à Sainte-Lucie, numéro déclaré 2024-00342, non vérifié au registre.", "Les anciens contrats Karma, la convention de migration et la reprise des dettes clients ne sont pas authentifiés."],
    complaintsAndDisputes: ["La page promet que les versements en attente seront traités par Sway après migration ; aucune liste exhaustive indépendante des paiements et comptes migrés n'est disponible.", "Trustpilot historique Karma : 4,0/5 sur 35 avis, aucun récent, avec certaines plaintes de 2024 sur les comptes et gains non arbitrées."],
    redFlags: ["L'ancienne marque ne commercialise plus de produits autonomes et redirige ses paiements vers Sway.", "Aucune vérification de l'achèvement des migrations ni du règlement de toutes les obligations anciennes.", "Le petit échantillon historique de Trustpilot ne peut pas être transposé aux services actuels de Sway."],
    changelog: ["Le site Karma renvoie encore les nouveaux achats vers Sway après rachat. Le solde des comptes et créances antérieurs n'est pas vérifié. Note historique fermée de 38 à 16 ; Sway reste évalué à part.", "Trustpilot Karma : 4,0/5 sur 35 avis anciens, sans avis récents ; ne vaut pas note de Sway Funded."]
  },
  'atfunded': {
    regulatoryStatus: ["L'annonce officielle suspend les opérations et met MT5 en mode fermeture seule.", "ATFunded promet le remboursement des achats actifs et des gains admissibles, sans publier de preuve auditée de règlement complet.", "L'entité juridique actuelle et sa juridiction ne sont pas confirmées par registre ; suspension ne signifie pas dissolution."],
    complaintsAndDisputes: ["Aucune échéance de paiement contrôlée, liste exhaustive de remboursements ou date de réouverture vérifiée sur l'accueil.", "Trustpilot affiche 4,4/5 sur 68 avis avec des versements anciens déclarés, sans prouver l'exécution des engagements pris lors de la suspension."],
    redFlags: ["Le site primaire affiche toujours une suspension sans nouvelles conditions commerciales actives.", "Promesses de remboursement et de gain sans vérification externe complète des règlements.", "Ancienne bonne réputation sur un petit échantillon ne vaut pas preuve d'une reprise d'activité."],
    changelog: ["La suspension et les promesses de règlement restent affichées sans bilan de clôture indépendant. Trustpilot 4,4/5 sur 68 avis est historique. Note 42 à 28, surveillance conservée et achats bloqués."]
  },
  'alpicap': {
    regulatoryStatus: ["Le domaine officiel annonce la fermeture d'ALPICAP.com pour hausse des coûts d'exploitation.", "La page ne nomme ni société responsable, ni procédure d'insolvabilité, ni recours client ou repreneur.", "Aucune dissolution au registre ni réconciliation finale des créances clients n'a été vérifiée."],
    complaintsAndDisputes: ["Trustpilot : 2,8/5 sur 50 avis du domaine historique.", "Certains utilisateurs affirment ne pas avoir reçu leurs accès aux comptes ou l'assistance attendue ; ces plaintes ne démontrent pas à elles seules une faute établie."],
    redFlags: ["Annonce de fermeture officielle à la place des pages de vente.", "Aucune procédure confirmée de paiement des gains et remboursements des anciens traders.", "Toute réouverture présumée ou agence de récupération doit être vérifiée indépendamment."],
    changelog: ["Fermeture annoncée directement pour coûts d'exploitation et absence de règlement final publié. Trustpilot 2,8/5 sur 50 avis. Note 38 à 9, sans prétendre à une dissolution ou une faute pénale."]
  },
  'traders-with-edge': {
    regulatoryStatus: ["Le 17 novembre 2026, l'ancien domaine n'a pas livré de site commercial ou de contrat accessible.", "L'exploitant contractuel, la juridiction et les conditions actuelles de simulation et de remboursement ne sont pas identifiés.", "Une enquête indépendante d'octobre 2026 confirmait une panne de domaine, sans établir la dissolution juridique."],
    complaintsAndDisputes: ["Aucun calendrier de retraits ni preuve actuelle de virement n'a pu être authentifié.", "Les archives d'anciens programmes ne permettent pas de déterminer les obligations encore dues aux traders."],
    redFlags: ["Boutique et conditions juridiques indisponibles sur le domaine historique.", "Risque de confusion entre anciennes publicités reprises par des annuaires et un véritable service actuel.", "Aucun repreneur ni domaine officiel de remplacement confirmé."],
    changelog: ["Le domaine d'origine ne fournit plus de service vérifiable. Aucune fermeture officielle n'étant établie, la note passe de 40 à 22 et les achats sont bloqués en attendant une source primaire.", "Des contrôles indépendants d'octobre 2026 constatent également son indisponibilité, sans démontrer une liquidation."]
  },
  't4tcapital': {
    regulatoryStatus: ["Les conditions du domaine ancien t4tcapital.com n'ont pas été accessibles.", "Le domaine distinct t4tcapitalfm.com renvoie aujourd'hui vers Traders4Traders, service actif ; son identité juridique ne doit pas être confondue avec celle de l'ancienne fiche.", "La page Traders4Traders annonce des évaluations avec soutien d'un courtier, ce qui ne constitue pas l'agrément de l'ancien contrat."],
    complaintsAndDisputes: ["Le profil Trustpilot T4TCapital Funds Management, distinct de la société ancienne à confirmer, affiche 2,5/5 sur six avis anciens, aucun sur les douze derniers mois.", "Aucune preuve n'identifie le débiteur des comptes ou remboursements de l'ancien T4TCapital."],
    redFlags: ["Ancienne boutique et contrat non vérifiés.", "Noms T4TCapital, T4TCapitalFM et Traders4Traders susceptibles d'être confondus malgré leurs conditions distinctes.", "Passage d'un profil présenté au Royaume-Uni à une enseigne australienne sans chaîne juridique de succession contrôlée."],
    changelog: ["T4TCapitalFM redirige vers Traders4Traders encore actif, mais la boutique et la continuité légale de t4tcapital.com ne sont pas vérifiées. Note de 44 à 38, achats bloqués sur l'ancienne fiche.", "Trustpilot T4TCapitalFM affiche 2,5/5 sur six avis, sans avis récent. Cet indicateur ne devient pas automatiquement la note de l'ancien domaine."]
  },
  'kortanafx': {
    regulatoryStatus: ["La bannière officielle annonce toujours une suspension totale après la perte de la licence MT5, jusqu'à nouvel ordre.", "Le pied de page indique KortanaFX F.Z.C. à Dubaï et précise que les comptes sont simulés et les paiements ne sont pas des dépôts.", "Aucun nouvel accord de plateforme ni communiqué de reprise vérifié au 17 novembre 2026."],
    complaintsAndDisputes: ["Trustpilot donne 2,4/5 sur 3 401 avis dans le relevé accessible, dont des plaintes individuelles de retraits retardés et de comptes suspendus, sans décision indépendante.", "Aucun calendrier public audité de règlement des anciens retraits ou remboursements n'a été identifié."],
    redFlags: ["Des boutons de vente restent visibles sous une annonce disant que toutes les activités sont suspendues.", "Les sept jours de retraits et les 100 % de gains ne décrivent pas un service fonctionnel pendant la suspension.", "Un prétendu redémarrage ou repreneur n'a pas été authentifié."],
    changelog: ["Le précédent contrôle d'octobre confirmait déjà la suspension MT5, mais relevait encore les anciennes offres de 5 000 à 200 000 $, les objectifs 8/5 %, jusqu'à 100 % de partage et les retraits annoncés en sept jours.", "En octobre, le profil Trustpilot donnait 2,4/5 sur 3 402 avis ; un autre miroir en affichait 3 401. La plateforme signalait peu d'invitations récentes à laisser un avis.", "Le site confirme toujours la suspension après la perte de la licence MT5. Les anciennes publicités subsistent ; la note chute de 42 à 15 et les achats sont bloqués, sans affirmer la dissolution légale.", "Trustpilot affiche 2,4/5 sur 3 401 avis ; les accusations individuelles restent non arbitrées."],
    incidents: ["17/11/2026 — Le site de KortanaFX annonce encore une suspension totale après la perte de la licence MT5, tout en affichant des boutons d'achat. Aucune reprise vérifiée. Source : https://kortanafx.com/"]
  },
  'my-flash-funding': {
    regulatoryStatus: ["MyFlashFunding confirme son acquisition par Sway Funded LTD, et tous les achats renvoient vers le domaine de Sway.", "Sway Funded LTD se présente comme non-courtier, sans dépôts ; le pied de page cite aussi Sway Funded LLC à Sainte-Lucie, n° 2024-00342.", "Le contrat actuel du nouvel encaissement et le transfert d'éventuelles dettes antérieures n'ont pas été contrôlés."],
    complaintsAndDisputes: ["Les anciens litiges de MyFlashFunding ne doivent pas être attribués automatiquement à la société repreneuse sans preuve de transfert d'obligations.", "La page annonce à la fois 80 % quotidiens et 90/10 de partage, sans préciser à quels parcours s'appliquent ces promesses."],
    redFlags: ["Les achats passent sur un autre domaine : vendeur et contrat à vérifier au paiement.", "Plusieurs sociétés Sway et l'ancienne LLC coexistent dans le pied de page.", "Les anciennes performances et annonces ne prouvent pas les versements du repreneur."],
    changelog: ["Le contrôle d'octobre relevait déjà le rachat par Sway, les tailles annoncées de 1 000 à 200 000 $, les paramètres d'un exemple à 15 $, ainsi que la contradiction entre 80 % quotidiens et 90 % de partage.", "Le site confirme le rachat par Sway Funded LTD et renvoie les paiements vers Sway. Les rémunérations annoncées sont ambiguës et le contrat actuel reste à vérifier. Note de 55 à 49, achats sous l'ancienne enseigne bloqués."]
  },
  'tradefundrr': {
    restrictiveRules: [
      {program:'Actions/options Pre-Prop — évaluation',rule:'599 $ de frais initiaux et 99 $/mois pour les données et la plateforme ; il faut réussir l’évaluation avant d’accéder à une rémunération simulée.',impact:'Le coût récurrent augmente si la phase d’évaluation dure plusieurs mois.'},
      {program:'Actions/options Prop — financé simulé',rule:'1 499 $ à l’entrée plus 99 $/mois ; cinq jours bénéficiaires, dont au moins 250 $ nets chacun sur le parcours Actions, et règle de régularité avant un retrait.',impact:'Le paiement du vendredi ne garantit aucun retrait dès la première semaine.'},
      {program:'Pro — parcours distinct avec apport personnel',rule:'Le trader engage ses propres fonds, exposés aux pertes ; levier, capital attribué et limites dépendent d’un contrat individuel.',impact:'Le risque financier est différent des comptes Pre-Prop/Prop entièrement simulés.'}
    ],
    regulatoryStatus: ["TradeFundrr LLC est nommé comme prestataire des comptes Pre-Prop et Prop entièrement fictifs ; il ne détient pas les titres ni les fonds des clients.", "Pro est un programme séparé avec contribution de capital et contrat distinct.", "T3 Trading Group est présenté comme courtier SEC/FINRA/SIPC, mais ses agréments ne couvrent pas les simulations TradeFundrr."],
    complaintsAndDisputes: ["Trustpilot affiche 4,3/5 sur 84 avis, entre récits de versement et plainte vérifiée sur des vérifications d'identité tardives ; les cas restent non arbitrés.", "Le mur de certificats de l'entreprise ne remplace pas des rapprochements bancaires indépendants.", "Les retraits Prop demandent cinq journées positives et le respect d'une règle de régularité, puis sont traités le vendredi."],
    redFlags: ["L'ancienne page Futures mène aujourd'hui à une offre actions/options : les anciennes descriptions ne doivent pas guider un achat actuel.", "Le parcours Pro requiert une contribution : son exposition contractuelle doit être étudiée séparément.", "Les tarifs Pre-Prop/Prop sont 599/1 499 $ à l'entrée, auxquels s'ajoutent 99 $ par mois ; vérifier le panier et les échéances.", "Les agréments de T3 appartiennent à un partenaire distinct."],
    changelog: ["Frais mensuels de 99 $ distingués des frais d'entrée et des cinq jours gagnants ; apport personnel de Pro exposé aux pertes. Note inchangée.", "Le précédent relevé d'octobre indiquait 4,2/5 pour 83 avis Trustpilot ; les prix et répartitions n'avaient pas été entièrement revérifiés.", "En octobre, l'ancienne page Futures indiquait 80 % de partage, des retraits le vendredi et des frais de données ; les montants et la nouvelle orientation commerciale restaient à confirmer.", "L'URL Futures mène à une page actions/options. Catégorie et quatre offres corrigées : Pre-Prop 599 $, Prop 1 499 $, plus 99 $/mois. Contrats simulés, risque Pro et retraits réexaminés. Note de 64 à 67.", "Les pages officielles des actions et options indiquent les mêmes prix d'entrée et de souscription mensuelle, tandis que la contribution Pro peut être perdue.", "Trustpilot passe à 4,3/5 sur 84 avis ; récits favorables et retard KYC sont présentés comme témoignages, pas comme preuve de virement."]
  },
  'alpha-futures': {
    regulatoryStatus: ["Les conditions officielles nomment Alpha Futures Limited (Royaume-Uni, n° 15655643) comme fournisseur des services virtuels simulés.", "La relation technique NinjaTrader/Tradovate s'est terminée pour le programme Premium en juillet 2026, sans arrêt démontré des autres programmes."],
    complaintsAndDisputes: ["Finance Magnates rapporte l'arrêt Premium, des remboursements de frais et l'annulation de gains en attente, Alpha et NinjaTrader contestant leurs responsabilités respectives.", "Trustpilot donne 4,3/5 sur 6 304 avis, entre paiements déclarés et refus contestés, sans arbitrage indépendant des dossiers."],
    redFlags: ["Annulation de récompenses Premium en attente après un désaccord avec un prestataire technique.", "Les gains simulés restent soumis aux clauses de validation, sans protection habituelle des dépôts chez un courtier.", "Ni les totaux publiés par l'entreprise ni un transfert blockchain isolé ne prouvent chaque paiement dû."],
    changelog: ["Réexamen complet : Alpha Futures reste active sur ses autres programmes, mais Finance Magnates documente l'arrêt Premium en juillet 2026 et l'annulation de gains en attente. Le désaccord avec NinjaTrader n'a pas été tranché. Note de 55 à 53.", "Les conditions officielles nomment Alpha Futures Limited (Royaume-Uni, n° 15655643) et décrivent des comptes de trading virtuels, avec des règles de pertes et de rémunération par formule.", "Trustpilot affiche 4,3/5 sur 6 304 avis, entre gains déclarés et demandes contestées."],
    entities: ["Prestataire britannique désigné des évaluations futures simulées, dont l'état actuel au registre n'a pas été revérifié indépendamment."]
  },
  'bulenox': {
    regulatoryStatus: ["Bulenox LLC (Delaware) est nommée dans les documents décrivant la formation et le trading simulé.", "Fast Track propose des options trailing ou drawdown de fin de journée, avec des frais uniques non remboursables."],
    complaintsAndDisputes: ["Trustpilot affiche 4,6/5 sur 1 837 avis, dont de nombreux retours de clients déclarant avoir été payés.", "Certains clients en octobre 2026 contestent des refus pour « flipping » ou type d'ordre ; les opérations réelles n'ont pas été auditées."],
    redFlags: ["Les anciens contrats limitent fortement les remboursements et donnent des droits étendus de restriction de compte.", "Les drawdowns et frais varient selon les formules.", "La promesse de paiements quotidiens ne prouve aucun versement individuel."],
    changelog: ["Bulenox propose Qualification, Fast Track et Momentum. Fast Track affiche des frais uniques et plusieurs modèles de drawdown. La note passe de 65 à 66, sans déduire de preuve bancaire des publicités.", "Trustpilot donne 4,6/5 sur 1 837 avis, avec retours positifs et refus de paiement contestés." ]
  },
  'sabiotrade': {
    regulatoryStatus: ["CODEVIL IT ENGINEERING LIMITED (Irlande, n° 680139 déclaré) est le fournisseur des évaluations simulées, pas d'un compte de courtage réel.", "Les gains sont encadrés par objectifs, pertes maximales, régularité, KYC et règles d'inactivité."],
    complaintsAndDisputes: ["Trustpilot affiche 705 avis mais masque la note après une infraction à ses règles ; des faux avis ont été retirés auparavant sans attribution de leur auteur.", "Le contrat permet réduction ou refus de certains gains après contrôle de conformité ; aucune vérification globale des virements n'a été obtenue."],
    redFlags: ["La note Trustpilot reste indisponible et les anciennes étoiles en cache ne doivent pas être réutilisées.", "Les conditions de rémunération sont nombreuses, avec pouvoirs de contrôle de la société.", "Les témoignages clients ne prouvent pas l'ensemble des versements."],
    changelog: ["Les conditions actualisées détaillent les évaluations simulées, les objectifs et restrictions de gains ; la note passe de 64 à 55 faute de vérification suffisante des paiements et avec les alertes Trustpilot.", "Trustpilot conserve 705 avis, sans note publique après infraction à ses règles ; l'auteur des faux avis retirés n'est pas identifié."]
  },
  'thinkcapital': {
    regulatoryStatus: ["TFG (Payments) Limited fournit les évaluations fictives, séparément des prestations du courtier ThinkMarkets.", "Les agréments du groupe ThinkMarkets ne donnent pas automatiquement de protection des dépôts et d'indemnisation aux clients ThinkCapital."],
    complaintsAndDisputes: ["Trustpilot masque la note après infraction et retrait de faux avis ; 605 avis restent visibles sans responsable identifié.", "Des clients rapportent des refus de gains ; leurs cas restent contestés et soumis aux conditions d'éligibilité."],
    redFlags: ["Aucune note Trustpilot actuelle : ne pas reprendre les étoiles de sites miroirs historiques.", "Bolt et Bolt Flex peuvent imposer 6–7 % de gains clôturés, quatorze jours et un plafond journalier de 20–25 % avant le premier versement.", "Les remboursements sont conditionnels, avec d'éventuels frais de 20 $ sans préjudice des droits légaux."],
    changelog: ["Les conditions de TFG (Payments) Limited précisent des règles distinctes par programme et des restrictions sur les gains et remboursements. Avec l'alerte Trustpilot persistante, la note éditoriale passe de 65 (plafonnée à 64) à 58.", "Trustpilot masque toujours sa note et mentionne de faux avis retirés ; 605 avis restent visibles et les litiges individuels ne sont pas arbitrés."]
  },
  'hola-prime': {
    restrictiveRules: [
      {program:'2-Step Pro / Prime et 1-Step Prime — choix du retrait',rule:'Retraits bimensuels avec trois journées gagnantes d’au moins 0,5 % du capital initial ; sept journées pour le mensuel. Retrait à la demande : 2 % de gain total et régularité de 40 %.',impact:'La fréquence des gains et le partage dépendent de l’option choisie ; tout bénéfice n’est pas immédiatement retirable.'},
      {program:'1-Step Fly / 2-Step Fly — évaluation puis financement simulé',rule:'Perte globale statique pendant le challenge, mais seuil suiveur intraday en compte financé ; annonces et positions de week-end peuvent entraîner une rupture. Régularité : 40 % en 1-Step, 50 % en phase 2 du 2-Step.',impact:'Un compte peut être validé avec un seuil fixe puis être soumis à une mécanique bien plus serrée une fois financé.'},
      {program:'Direct et Direct Fly — comptes financés',rule:'Direct a un seuil suiveur EOD, une régularité de 20 % sur les retraits bimensuels et des interdictions de trading lors des annonces et week-ends ; Direct Fly suit l’équité intraday.',impact:'Ces parcours directs ne sont pas interchangeables ; une violation peut entraîner la clôture du compte.'}
    ],
    regulatoryStatus: ["Le site distingue les entités de Hong Kong, Chypre, Maurice et les prestataires techniques dans une activité d'évaluation simulée.", "Le contrôle externe des délais de traitement du 15 octobre 2025 au 15 mars 2026 exclut explicitement une opinion d'audit, d'assurance ou une reliance des tiers."],
    complaintsAndDisputes: ["Le résumé publié par la société annonce 98,35 % de demandes complètes traitées dans l'heure et zéro refus dans le périmètre, sans rendre public le rapport intégral.", "Trustpilot affiche 4,6/5 sur 4 324 avis, avec des litiges individuels sur comptes et vérification d'identité, non arbitrés."],
    redFlags: ["L'étude de délais ne démontre pas que tous les acheteurs se sont qualifiés ni que tous les virements bancaires ont été contrôlés.", "Les conditions et plafonds diffèrent fortement selon les programmes.", "La licence d'une société liée à Maurice ne régule pas automatiquement les rémunérations des simulations."],
    changelog: ["Les parcours Pro, Prime, Fly et Direct ont des seuils et fenêtres de retrait distincts ; divergence du partage 1-Step Fly signalée sans supposer la bonne version. Note inchangée.", "Finance Magnates a examiné des documents d'une étude Deloitte sur les délais de versement, mais celle-ci n'est ni un audit ni une opinion d'assurance et le rapport intégral n'est pas public. Note prudente de 64 à 67.", "Le résumé officiel précise les limites du contrôle et le calcul du délai après réception des informations complètes.", "Trustpilot affiche désormais 4,6/5 sur 4 324 avis, sans alerte publique de retrait de note."]
  },
  'cove-funded': {
    regulatoryStatus: ["Les anciennes conditions de Cove Funded mentionnaient une société maltaise et des évaluations TradeLocker simulées ; le site actuel n'offre plus ces produits.", "Le domaine d'origine affiche désormais HEBAT33 et renvoie à une inscription sur un autre site. Son exploitation par l'ancienne société n'est pas démontrée."],
    complaintsAndDisputes: ["L'ancien profil Trustpilot affiche 4,0/5 sur 68 avis, sans nouveaux témoignages sur les douze derniers mois au moment du contrôle.", "En mars 2025, un utilisateur déclarait attendre depuis plusieurs mois son deuxième versement ; ni ce cas ni un éventuel règlement n'ont été vérifiés."],
    redFlags: ["L'ancien domaine héberge désormais des jeux en ligne sans rapport et un site d'inscription différent.", "Aucune boutique d'évaluations d'origine, procédure de remboursement ni continuité juridique vérifiée.", "La note moyenne historique ne doit pas être interprétée comme une recommandation des nouveaux contenus."],
    changelog: ["L'ancien site de challenges covefunded.com affiche aujourd'hui une page indonésienne HEBAT33 avec des liens d'inscription externes. Des annuaires indépendants classent l'ancienne marque comme fermée. Trustpilot conserve 4,0/5 et 68 avis, avec des plaintes historiques sur les retraits. Une dissolution formelle n'a pas été vérifiée."],
    entities: ["Entreprise nommée dans les anciennes conditions de Cove Funded. Aucun lien juridique avec le site HEBAT33 actuel ni repreneur des obligations anciennes n'a été établi."],
    incidents: ["17/11/2026 — Le domaine historique Cove Funded contient désormais des jeux HEBAT33 et des liens externes. Aucune relation juridique avec l'exploitant maltais précédent n'est prouvée. Source : https://covefunded.com/"]
  },
  'stocknet-institute': {
    regulatoryStatus: ["Le 4 juillet 2024, la société a officiellement annoncé la fermeture progressive de ses activités de prop trading et son intention de quitter définitivement ce marché.", "Les anciennes conditions identifient Stocknet FX Limited (Royaume-Uni n° 13258192), sans vérification directe de son état présent au registre."],
    complaintsAndDisputes: ["Les clients actifs devaient recevoir des instructions individuelles de clôture, mais aucun bilan indépendant de tous les paiements n'a été obtenu.", "La société proposait son logiciel à la vente ; aucun transfert juridiquement vérifié des droits des traders n'a été constaté."],
    redFlags: ["Ventes de nouveaux challenges désactivées depuis l'annonce de 2024.", "Anciens domaines signalés comme stationnés : risque de confusion avec de supposés repreneurs.", "L'annonce d'une fermeture commerciale ne démontre pas la dissolution légale ni le remboursement complet des anciens comptes."],
    changelog: ["Stocknet Institute / SI World a annoncé par courrier aux clients le 4 juillet 2024 une fermeture progressive et une sortie permanente du secteur. Les nouveaux achats étaient bloqués et la technologie proposée à la vente. Une dissolution officielle et un bilan définitif des paiements n'ont pas été contrôlés."],
    entities: ["Société britannique indiquée dans les conditions historiques de la marque SI World / Stocknet Institute, dont les opérations de challenges ont cessé."],
    incidents: ["04/07/2024 — Stocknet / SI World annonce la fin progressive et définitive de ses activités et désactive les ventes, avec instructions à venir pour les comptes actifs. Source : https://fxnewsgroup.com/forex-news/retail-forex/prop-firm-stocknet-institute-siworld-shuts-down/"]
  },
  'ultimate-traders': {
    regulatoryStatus: ["Ultimate Traders Evaluation Ltd (Royaume-Uni n° 14665391) est nommée comme société d'évaluations simulées, sans garantie de courtage réglementé.", "La FMA néo-zélandaise a publié en 2025 une mise en garde contre ultimatetraders.pro, nom de domaine distinct de ultimatetraders.com ; aucune identité juridique commune n'a été établie."],
    complaintsAndDisputes: ["Trustpilot donne 4,3/5 sur environ 68 avis du domaine .com, sans avis récent sur une année au moment du contrôle.", "Une enquête contractuelle relève un délai de 30 jours incompatible avec la publicité « sans limite », des remboursements réduits et le risque de perdre les gains accumulés après un dépassement de limite."],
    redFlags: ["La publicité officielle et le délai apparemment prévu dans le contrat se contredisent.", "Les 90 % de gains ne sont pas automatiques et les remboursements sont limités.", "Aucune preuve bancaire indépendante des versements ; attention à ne pas attribuer à tort l'alerte visant le domaine .pro."],
    changelog: ["Une enquête approfondie relève que l'annonce « durée illimitée » contredit deux clauses contractuelles de 30 jours. Le partage à 90 % suppose un supplément ou des conditions et le remboursement devient restreint après l'envoi des identifiants. La FMA avertit sur le domaine .pro distinct, dont le lien avec le .com n'est pas démontré.", "Trustpilot a été vérifié initialement : ancienne note de 3,8/5 sur 68 avis ; l'entreprise n'invitait plus activement à publier de nouvelles évaluations.", "Les règles publiées distinguent Classic et Speedy, les limites de pertes, les restrictions de trading et le partage standard de 80 %." ]
  },
  'willis-capital': {
    regulatoryStatus: ["Le site actuel wfunded.io nomme Western Sahara Worldwide Services et précise que les comptes et capitaux sont simulés.", "L'ancien domaine singulier williscapital.com est stationné. L'immatriculation nigériane et un éventuel agrément de courtage n'ont pas été vérifiés indépendamment."],
    complaintsAndDisputes: ["Le profil Trustpilot du domaine williscapitals.com, affiché désormais comme WFUNDED, note 3,4/5 sur 294 avis.", "Plusieurs clients en mars et avril 2026 évoquent des retards de rémunération, des migrations de plateforme et des difficultés de support ; ces cas ne sont pas arbitrés."],
    redFlags: ["Ancienne marque, domaine singulier et domaine pluriel sont facilement confondus.", "Une déclaration d'immatriculation sur le site ne prouve pas la solidité financière ou la capacité de paiement.", "Les litiges récents concernant les versements justifient une prudence supplémentaire."],
    changelog: ["L'audit de marque confirme le passage de Willis Capital à WFunded, toujours accessible sur wfunded.io. L'ancienne adresse au singulier est stationnée. Le profil Trustpilot de l'adresse au pluriel affiche désormais WFUNDED, 3,4/5 sur 294 avis, avec des litiges récents non tranchés.", "En octobre 2026, le contrôle du domaine historique a relevé son renvoi vers un vendeur de noms de domaine. TechCabal indiquait déjà la nouvelle marque WFunded.", "L'adresse officielle a été corrigée vers wfunded.io ; un annuaire marquant l'ancienne marque comme fermée ne suffit pas à déclarer la nouvelle enseigne fermée."],
    entities: ["Gestionnaire nommé sur le site WFunded actuel. Sa situation exacte au registre et sa responsabilité contractuelle doivent encore être confirmées."]
  },
  'infinity-forex-funds': {
    regulatoryStatus: ["Le 2 mai 2024, l'autorité néerlandaise AFM a mis en garde contre Infinity Forex Funds et son domaine, en signalant l'absence de licence AFM ou de passeport européen.", "Les conditions actuelles du domaine précisent qu'il est uniquement informatif, sans vente de produits ni sollicitation de fonds.", "Une enquête rapporte que Prop Trade Tech Pty Ltd est devenue Tradesim Pty Ltd en mars 2025 ; ce détail n'a pas été revérifié directement au registre australien."],
    complaintsAndDisputes: ["Trustpilot donne 2,4/5 sur 2 535 avis historiques ; plusieurs utilisateurs y dénoncent des gains refusés ou des comptes fermés. Ces récits ne sont pas tranchés.", "Un client a publié en février 2025 un supposé avis officiel de fermeture pour le 14 février, sans que le document original ni la totalité des remboursements soient vérifiés."],
    redFlags: ["Mise en garde officielle d'un régulateur contre des sollicitations d'investissement présumées non autorisées.", "La prop firm historique a disparu, mais son ancien domaine héberge désormais un service purement informatif.", "L'exploitant légal actuel et le traitement des dettes envers les anciens clients restent inconnus."],
    changelog: ["L'ancienne offre de challenges ne fonctionne plus ; le domaine ne propose que des outils et informations de change. L'AFM avait publié en mai 2024 une alerte officielle sur la marque et ce domaine exact. Trustpilot affiche 2,4/5 sur 2 535 avis. L'origine de la fermeture de février 2025 et les remboursements restent à confirmer."],
    entities: ["Entreprise australienne historique citée dans une enquête, apparemment renommée en 2025. Aucune vérification directe du registre ni succession juridique avec le nouveau site informatif n'a été obtenue."],
    incidents: ["02/05/2024 — L'AFM néerlandaise alerte sur Infinity Forex Funds et son domaine, en citant des sollicitations d'investissement suspectes sans autorisation. Source : https://fi.ee/en/print/pdf/node/53341", "Février 2025 — Un ancien client publie un message prétendument officiel annonçant la désactivation des comptes après le 14 février. L'authenticité du message et les règlements effectifs ne sont pas confirmés. Source : https://www.trustpilot.com/review/infinityforexfunds.com"]
  },
  'the-prop-game': {
    regulatoryStatus: [
      "Des contrôles indépendants de septembre à octobre 2026 constatent l'expiration du domaine .com et son stationnement chez GoDaddy.",
      "Aucun communiqué officiel de fermeture, acte de dissolution au registre ni conditions d'un repreneur légal n'ont été authentifiés. Le stationnement d'un domaine ne détermine pas le statut juridique."
    ],
    complaintsAndDisputes: [
      "Un avis Trustpilot de février 2025 affirme qu'un compte gratuit aurait été proposé contre un avis positif ; aucune enquête indépendante n'établit l'achat de faux avis.",
      "Un avis de janvier 2025 dénonce le refus d'un versement de 8 000 $ après une longue attente ; d'autres témoignages sont favorables. Les faits individuels ne sont pas arbitrés."
    ],
    redFlags: [
      "L'ancien domaine ne présente plus de conditions de vente fonctionnelles.",
      "Exploitant légal actuel, remboursements et versements impossibles à confirmer.",
      "La réutilisation du nom ou du domaine pourrait tromper anciens et nouveaux clients."
    ],
    changelog: [
      "Des enquêtes datées d'octobre 2026 ont trouvé thepropgame.com expiré et stationné chez GoDaddy. Aucune dissolution juridique ni déclaration officielle de fermeture n'a été identifiée ; on constate une inactivité commerciale.",
      "L'ancien profil Trustpilot contient des témoignages contestés : un avis de février 2025 prétend qu'un compte gratuit était offert contre un avis favorable ; un autre évoque le refus de 8 000 $ en janvier. Aucun des deux n'a été confirmé indépendamment."
    ],
    entities: ["Ancien vendeur de challenges dont le domaine est stationné ; aucun opérateur légal actuel, repreneur ni acte de dissolution n'a été authentifié."],
    incidents: [
      "11/10/2026 — Un comparateur constate le stationnement du domaine chez GoDaddy et l'absence de communiqué officiel de fermeture. Une vérification distincte remontait déjà à septembre. Source : https://mypropgenius.com/closed-firms/",
      "Janvier–février 2025 — Des clients Trustpilot évoquent un refus de 8 000 $ et l'offre présumée d'un compte gratuit contre un avis positif. Ces témoignages ne sont pas arbitrés. Source : https://www.trustpilot.com/review/thepropgame.com"
    ]
  },
  'tentrade': {
    regulatoryStatus: [
      "TenTrade présente Evalanch Ltd, société seychelloise n° 8429760-1, et revendique un agrément FSA SD082 ; le registre du régulateur n'a pas été recoupé directement.",
      "SKAI Consultancy Ltd (Chypre, n° HE124105) est présentée comme représentante indépendante, non agréée à Chypre ; sa localisation ne constitue pas un agrément CySEC.",
      "TenEdge Challenge prévoit 70 % des gains, des frais à partir de 65 $ et des limites variables selon la taille du compte. Le contrat PDF fixe aussi les plafonds de retrait et exclusions."
    ],
    complaintsAndDisputes: [
      "Trustpilot affiche 4,0/5 sur 1 084 avis du bon domaine, dont des avis sollicités par l'entreprise ; 14 % sont des avis à une étoile.",
      "En novembre 2026, des clients dénoncent des bénéfices annulés ; en septembre, d'autres rapportent des retraits retardés ou des spreads élevés pendant les annonces. TenTrade répond ou conteste ces faits, qui ne sont pas arbitrés."
    ],
    redFlags: [
      "Un agrément revendiqué aux Seychelles ne donne pas automatiquement les protections réglementaires des investisseurs européens.",
      "Les contrats Instant et Challenge prévoient des règles et plafonds différents : lire le contrat précis avant d'acheter.",
      "La note Trustpilot globale ne prouve pas le versement indépendant des gains."
    ],
    changelog: [
      "Les conditions actuelles TenEdge indiquent des frais à partir de 65 $, un objectif de 10 %, 70 % des gains et des versements normalement tous les 15 jours. Evalanch Ltd affirme détenir l'agrément seychellois SD082.",
      "Trustpilot affiche 4,0/5 sur 1 084 avis, mêlant appréciations favorables et réclamations concernant des bénéfices annulés, des spreads ou des retards. La société répond à plusieurs contestations."
    ],
    entities: [
      "Société indiquée comme cocontractant des services de courtage et des comptes financés. L'agrément offshore annoncé reste à recouper directement dans le registre officiel.",
      "Représentant indépendant, expressément non autorisé comme prestataire financier réglementé à Chypre. Son adresse ne doit pas être assimilée à une licence CySEC."
    ],
    incidents: [
      "06/11/2026 — Un client Trustpilot dénonce l'annulation de 3 295 $ de bénéfices pour une règle d'abus de couverture. TenTrade conteste cette lecture ; les historiques d'ordres n'ont pas été vérifiés. Source : https://www.trustpilot.com/review/tentrade.com",
      "Septembre 2026 — Des avis débattent des délais de retrait et de l'élargissement des spreads lors de nouvelles économiques. TenTrade répond ; les cas ne sont pas arbitrés. Source : https://www.trustpilot.com/review/tentrade.com"
    ]
  },
  'neg-markets': {
    regulatoryStatus: [
      "Le 11 octobre 2026, un contrôleur a constaté une erreur d'hébergement sur negmarkets.com et n'a trouvé aucun avis officiel de cessation.",
      "Aucun numéro de société, agrément ou contrat actuel n'a été authentifié. Il ne faut pas confondre la marque avec l'entreprise française de commerce en ligne au nom presque identique."
    ],
    complaintsAndDisputes: [
      "Trustpilot affiche seulement quatre avis pour negmarkets.com, avec une note de 2,8/5 : l'échantillon ne permet pas d'établir l'historique des gains.",
      "Les témoignages plus anciens se contredisent et ne démontrent ni une activité actuelle ni des versements récents."
    ],
    redFlags: [
      "Ancien site de challenges indisponible au dernier contrôle daté.",
      "Exploitant légal, plateforme de trading et conditions de remboursement inconnus.",
      "Échantillon d'avis très faible et risque de confusion avec le domaine distinct negomarkets.com."
    ],
    changelog: ["Un contrôle d'octobre 2026 a trouvé negmarkets.com indisponible et sans communiqué officiel de fermeture. Trustpilot ne compte que quatre avis, pour 2,8/5 ; aucun bilan des gains ne peut en être déduit."],
    entities: ["Ancienne enseigne de trading ; aucun exploitant actif, numéro de société ni repreneur légal n'a été authentifié."],
    incidents: ["11/10/2026 — negmarkets.com affichait une erreur d'hébergement et aucune déclaration officielle de fermeture n'était disponible. Il ne faut pas en déduire une liquidation. Source : https://mypropgenius.com/closed-firms/"]
  },
  'guardeer-funding': {
    regulatoryStatus: [
      "L'ancien site Guardeer montrait un avis de maintenance prolongée concernant la migration des comptes MT5 et du CRM, sans contrat d'achat fonctionnel.",
      "L'adresse alternative funding.fortressfx.com renvoyait une erreur 404 lors des contrôles de septembre-octobre 2026.",
      "Trustpilot n'accepte plus d'avis sur l'ancien domaine Guardeer à cause de la fermeture annoncée du site. Cela ne constitue pas une preuve de dissolution légale."
    ],
    complaintsAndDisputes: [
      "Des clients du domaine Trustpilot lié à Fortress Funding dénoncent retards, refus de paiements et absence de réponse. Il s'agit de témoignages individuels non tranchés.",
      "Aucun document prouvant que le repreneur Fortress a assumé les obligations des anciens clients Guardeer n'a été obtenu."
    ],
    redFlags: [
      "L'avis de maintenance n'a pas changé depuis de nombreux mois.",
      "L'adresse alternative ne fonctionne pas et l'interlocuteur chargé du support est incertain.",
      "Risque opérationnel et réputationnel élevé : toute nouvelle demande de paiement sous ces noms doit être vérifiée."
    ],
    changelog: ["Le site Guardeer affichait une maintenance MT5/CRM ancienne, alors que le site alternatif Fortress était indisponible. Trustpilot avait fermé les avis sur l'ancien domaine et plusieurs clients évoquaient des gains impayés, sans dissolution formelle vérifiée."],
    entities: ["L'ancien site Guardeer dirigeait vers une adresse Fortress, mais aucune succession juridique ni reprise documentée des dettes envers les traders n'a été établie."],
    incidents: [
      "2025–2026 — L'avis de maintenance MT5 a subsisté environ un an ; le domaine alternatif Fortress ne proposait aucun achat fonctionnel et Trustpilot a fermé les avis Guardeer. Source : https://top30forexbrokers.com/propfirm/guardeer-funding-review/",
      "2026 — Plusieurs avis clients Fortress dénoncent des gains non reçus et un lien avec l'offre Guardeer. La continuité contractuelle et les faits individuels ne sont pas démontrés. Source : https://www.trustpilot.com/review/funding.fortressfx.com"
    ]
  },
  'indigo-trader-funding': {
    regulatoryStatus: [
      "Le communiqué officiel du 20 août 2024 confirme l'arrêt des activités commerciales et la rupture des partenariats de challenges.",
      "La société britannique Indigo Trader Funding Limited (n° 15370862) aurait été radiée volontairement le 5 novembre 2024 selon une recherche citant Companies House ; la fiche du registre n'a pas été consultée directement.",
      "La presse décrit Indigo comme promoteur de certains challenges liés à Eightcap : l'identité du débiteur des remboursements dépend des contrats individuels."
    ],
    complaintsAndDisputes: [
      "La société annonçait l'affectation des fonds restant chez ses partenaires aux remboursements des comptes payants encore actifs, sans bilan de règlement indépendant.",
      "Au moins un trader a publiquement demandé le sort de gains d'un compte financé lors de la fermeture ; son droit effectif n'a pas été vérifié."
    ],
    redFlags: [
      "Cessation officielle en 2024 : aucun vendeur actuel de challenges n'est authentifié.",
      "L'ancien nom ou domaine peut être repris par une entreprise sans lien ni responsabilité sur les dettes.",
      "Aucun état vérifié du règlement définitif des remboursements et gains promis."
    ],
    changelog: [
      "Le 30 octobre 2026, PropRadar avait déjà classé Indigo comme fermée avec l'accord du propriétaire du site, en s'appuyant sur le communiqué d'août 2024 et l'annonce de radiation britannique. Cette décision est conservée.",
      "Le 20 août 2024, Indigo a annoncé définitivement l'arrêt de ses activités. Une étude citant Companies House indique la radiation volontaire de la société britannique en novembre ; l'accès direct au registre reste à compléter.",
      "L'ancien exploitant annonçait vouloir consacrer les fonds disponibles chez les partenaires aux remboursements, sans preuve indépendante de règlement de tous les comptes."
    ],
    entities: ["Ancienne société britannique de promotion de challenges, publiquement arrêtée en août 2024. Aucune activité actuelle ni entreprise repreneuse n'est démontrée."],
    incidents: [
      "20/08/2024 — Indigo annonce l'arrêt définitif et la fin de ses partenariats. Les fonds restant chez les partenaires devraient servir aux remboursements, sans preuve de réception pour chaque client. Source : https://www.financemagnates.com/forex/prop-trading-firm-indigo-trader-funding-confirms-shutdown/",
      "05/11/2024 — Un enquêteur citant Companies House indique la radiation volontaire de la société britannique n° 15370862. Le registre n'a pas été consulté directement pour cet audit. Source : https://propfirmly.com/unlisted-prop-firms/indigo-trader-funding"
    ]
  },
  'ck-capital': {
    regulatoryStatus: [
      "CK CAPITAL GROUP LTD (n° 15658914) est enregistrée comme ACTIVE au registre britannique Companies House. Une inscription au registre n'est ni un agrément FCA ni une garantie de protection des traders.",
      "Les documents déposés en septembre 2026 font état du remplacement de Daniel Cheung par Kar Chan à la direction et au contrôle de la société.",
      "Le nouveau site CK vend des évaluations de trading simulé. Les conditions et le droit au remboursement doivent être lus avant tout achat."
    ],
    complaintsAndDisputes: [
      "Trustpilot ne publie plus la note de ckcapital.co.uk après une infraction à ses règles et précise avoir supprimé plusieurs faux avis. La plateforme ne désigne pas les personnes qui les ont produits ou commandés.",
      "Le profil distinct de ckpropfirm.com affichait 2,2/5 sur seulement 19 avis à la date du contrôle.",
      "Plusieurs témoignages récents dénoncent des retraits retardés, refusés ou des exclusions de groupes de discussion ; un autre commentaire du 11 novembre affirme qu'un paiement a finalement été reçu. Ces récits individuels ne sont pas vérifiés indépendamment."
    ],
    redFlags: [
      "Alerte d'intégrité des avis sur l'ancien profil Trustpilot et faible score sur le nouveau profil.",
      "Plusieurs plaintes détaillées concernent des paiements non reçus ou refusés ; réponse de l'entreprise et relevés de règlement à confirmer.",
      "Les certificats affichés par la société ne prouvent pas un versement indépendant. Le site ne doit pas être déclaré fermé : sa société est encore active."
    ],
    changelog: [
      "L'ancien domaine ckcapital.co.uk redirige vers ckpropfirm.com. Le nouveau site nomme CK CAPITAL GROUP LTD et Companies House confirme son immatriculation britannique active (n° 15658914), ainsi qu'un changement de direction en septembre 2026.",
      "L'ancien profil Trustpilot ne possède plus de note après infraction aux règles et retrait de faux avis (432 avis conservés). Le profil distinct du nouveau domaine affiche 2,2/5 sur 19 avis. Il ne faut pas fusionner ces deux profils.",
      "Plusieurs traders se plaignent en novembre 2026 de paiements retardés ou refusés, tandis qu'un autre déclare avoir récemment été payé. Ces récits ne constituent pas des dettes judiciairement établies ; PropRadar bloque les achats."
    ],
    entities: ["Fournisseur mentionné dans les conditions du nouveau site. Société britannique active et vérifiée au registre. Kar Chan y est déclaré dirigeant et détenteur du contrôle depuis septembre 2026."],
    incidents: [
      "17/11/2026 — Trustpilot retire la note de l'ancien domaine après infraction à ses règles et suppression de faux avis. Le nouveau domaine, distinct, affiche 2,2/5 sur 19 avis. Trustpilot ne désigne pas l'auteur ou le commanditaire des faux avis. Source : https://www.trustpilot.com/review/ckcapital.co.uk",
      "11 au 13/11/2026 — Plusieurs traders affirment ne pas avoir reçu leurs gains ou s'être vu refuser un retrait après de longues attentes. Un autre dit avoir finalement été payé. PropRadar ne peut arbitrer ces témoignages sur la seule base des avis. Source : https://www.trustpilot.com/review/ckcapital.co.uk"
    ]
  },
  'firmity-funding': {
    regulatoryStatus: [
      "Un bulletin spécialisé publié en mai 2024 décrit l'effondrement de l'activité de challenges ; il ne s'agit pas d'une preuve de dissolution au registre des sociétés.",
      "Aucune condition actuelle, aucun numéro de société ni aucun processus d'achat officiel et actif n'a été authentifié."
    ],
    complaintsAndDisputes: [
      "Le reportage de l'époque évoque des traders attendant plus de six mois le versement de leurs gains ; l'estimation médiatique d'un million de dollars n'est pas un montant de dette judiciairement établi.",
      "Le média rapporte la fermeture répétée du Discord et l'absence de réponse de la direction à des demandes indépendantes."
    ],
    redFlags: [
      "Aucune société légalement enregistrée ni fournisseur actuel authentifié.",
      "Plaintes historiques sur les paiements, sans preuve indépendante de règlement intégral.",
      "La réutilisation du nom ou du domaine peut laisser croire à tort que l'ancienne société a repris ses activités."
    ],
    changelog: ["Un média spécialisé rapportait en mai 2024 l'arrêt apparent de Firmity Funding après de longues réclamations sur les paiements et des fermetures répétées de son canal communautaire. Ni reprise documentée, ni société actuelle, ni communiqué juridique officiel n'ont été authentifiés."],
    entities: ["Ancienne marque de prop firm signalée inactive. Aucun numéro d'immatriculation, acte de liquidation ou repreneur légal confirmé."],
    incidents: ["10/05/2024 — Un média spécialisé annonce l'arrêt apparent de Firmity Funding, citant de longs délais de versement et la rupture des communications. Ses estimations globales des dettes ne sont pas vérifiées indépendamment. Source : https://propfirmfactory.beehiiv.com/p/another-firm-falls"]
  },
  'hash-hedge': {
    regulatoryStatus: [
      "Empower Academy Ltd, aux Émirats arabes unis (n° 01011157 déclaré), exploite les challenges simulés. L'immatriculation n'a pas été recoupée dans un registre officiel.",
      "FinSmart Solution Ltd, aux Seychelles (n° 246832 déclaré), doit contractuellement payer les gains ; l'exploitant émirati exclut cette responsabilité.",
      "L'article 1.1 des conditions commerciales prévoit 80 % de rémunération par défaut ; un programme ou une option achetée peut préciser un autre pourcentage."
    ],
    complaintsAndDisputes: [
      "Trustpilot affiche 4,5/5 sur 120 avis liés au bon domaine. Les témoignages, même sollicités par l'entreprise, ne prouvent pas individuellement la réception des gains.",
      "Un client a décrit une panne de terminal le 20 octobre. Hash Hedge a reconnu l'incident, mais contesté son lien avec la perte du compte le 23 octobre. Le litige n'est pas arbitré."
    ],
    redFlags: [
      "Deux sociétés situées aux Émirats et aux Seychelles se répartissent encaissement des frais et obligation de payer les gains.",
      "Les immatriculations n'ont pas été vérifiées auprès des autorités compétentes.",
      "Comparer la publicité « jusqu'à 90 % » au contrat standard à 80 % et au programme choisi ; aucune preuve bancaire indépendante de retrait n'a été obtenue."
    ],
    changelog: [
      "Les conditions de novembre 2026 distinguent Empower Academy Ltd (Émirats, n° 01011157), exploitant des challenges, et FinSmart Solution Ltd (Seychelles, n° 246832), débitrice des récompenses. Les numéros proviennent de l'entreprise et restent à vérifier dans les registres.",
      "Le profil Trustpilot affiche 4,5/5 sur 120 avis. Le contrat prévoit 80 % de partage des gains par défaut, sauf conditions particulières ; la publicité « jusqu'à 90 % » n'est pas le taux automatique.",
      "Un client a dénoncé une panne en octobre. Hash Hedge a publiquement reconnu une interruption le 20 octobre mais contesté sa responsabilité dans l'échec du challenge. Les faits individuels ne sont pas arbitrés."
    ],
    entities: [
      "Exploitant de la plateforme et des évaluations ; encaisse les frais et décide des suspensions. Il n'est pas débiteur des paiements confiés à la société des Seychelles.",
      "Cocontractant distinct responsable de la répartition et du paiement des gains sur les comptes éligibles ; ne reçoit pas les frais de challenges."
    ],
    incidents: ["20/10/2026 — Hash Hedge reconnaît une panne de sa plateforme en réponse à la plainte d'un client du 23 octobre. Les parties contestent ses conséquences sur le compte ; aucune expertise indépendante n'a été retrouvée. Source : https://www.trustpilot.com/review/hashhedge.com"]
  },
  'real-funds-trader': {
    regulatoryStatus: [
      "Une vérification DNS datée du 11 octobre 2026 constate que l'ancien domaine .com n'était plus enregistré ni accessible.",
      "L'enquêteur n'a trouvé aucun communiqué de fermeture de la société ; il la qualifie d'inactive et non de juridiquement dissoute."
    ],
    complaintsAndDisputes: [
      "Aucun règlement récent de gains ni repreneur légal n'a été authentifié indépendamment.",
      "Les anciens clients devraient conserver factures, captures d'écran de comptes et correspondances en cas d'absence de réponse."
    ],
    redFlags: [
      "L'ancien domaine officiel supposé est indisponible.",
      "Aucun exploitant actuel, aucune procédure de remboursement ni aucun accès de trading confirmé.",
      "Une reprise frauduleuse du nom ou de faux services de récupération de fonds pourraient tromper les anciens clients."
    ],
    changelog: ["Une vérification datée d'octobre 2026 constate que realfundstrader.com renvoie une erreur DNS NXDOMAIN. L'enquêteur qualifie le service d'inactif, non de juridiquement fermé, faute de communiqué officiel de cessation."],
    entities: ["L'ancien domaine et la marque ont été identifiés, mais pas la société actuelle, son statut juridique ni un éventuel repreneur."],
    incidents: ["11/10/2026 — Un contrôleur indépendant documente une erreur DNS NXDOMAIN sur realfundstrader.com et qualifie la marque d'inactive, sans preuve de fermeture juridique. Source : https://mypropgenius.com/closed-firms/real-funds-trader/"]
  },
  'forfx': {
    regulatoryStatus: [
      "Une copie indexée de l'ancien communiqué officiel indique la fermeture définitive de FORFX en juin 2026 ; la dissolution de la société n'a pas été confirmée indépendamment.",
      "Le communiqué désigne OPO GROUP LLC (n° 866LLC2021) comme ancien exploitant. Ce numéro n'a pas été contrôlé auprès du registre de Saint-Vincent-et-les-Grenadines.",
      "L'ancien domaine .com redirige maintenant vers une annonce de vente de domaine et non vers un service de challenges authentifié."
    ],
    complaintsAndDisputes: [
      "Dans son annonce de fermeture, l'entreprise dit avoir payé tous les gains et remboursé tous les challenges. Aucun rapprochement indépendant des comptes bancaires des traders n'a été obtenu.",
      "L'ancienne adresse de support peut cesser de fonctionner si le domaine change de propriétaire."
    ],
    redFlags: [
      "Le service a définitivement cessé la vente de challenges en juin 2026.",
      "Ancien domaine à vendre : risque accru d'usurpation de marque ou de tentatives de hameçonnage.",
      "Règlement de toutes les obligations affirmé uniquement par la société, sans contrat actuel authentifié."
    ],
    changelog: [
      "L'ancien communiqué officiel de FORFX indiquait l'arrêt définitif en juin 2026 et affirmait avoir remboursé les frais et payé tous les gains. Une copie reste indexée ; ces déclarations ne sont pas certifiées par un tiers.",
      "L'ancien domaine forfx.com redirige désormais vers une annonce GoDaddy de vente de domaine, et non vers l'exploitant historique. Une réutilisation du nom peut tromper les anciens clients."
    ],
    entities: ["Ancien propriétaire et exploitant désigné par l'annonce de fermeture de juin 2026 ; aucune nouvelle activité commerciale ne doit lui être attribuée sans preuve actuelle."],
    incidents: [
      "Juin 2026 — L'ancien communiqué officiel annonce la fermeture définitive de FORFX et prétend que tous les frais et gains ont été réglés. Aucun audit indépendant ne l'a confirmé. Source : https://www.forfx.com/",
      "17/11/2026 — L'ancien domaine forfx.com redirige vers une annonce de vente GoDaddy. Un futur acquéreur du nom de domaine ne peut être considéré comme l'ancien exploitant ou un service légitime de récupération de fonds. Source : https://www.forfx.com/"
    ]
  },
  'breakout-prop': {
    restrictiveRules: [
      {program:'1-Step Classic / Pro / Turbo — pertes en évaluation et après financement',rule:'La perte quotidienne se recalcule à 00 h 30 UTC sur le solde, avec contrôle de l’équité latente. Un franchissement, même bref, clôt définitivement le compte. Limites globales fixes : Classic 6 %, Pro 5 %, Turbo 3 %.',impact:'Une perte flottante peut invalider le challenge même si les trades clôturés restent positifs. Il s’agit d’une limite de risque publiée.'},
      {program:'1-Step Classic / Pro / Turbo — pratiques interdites',rule:'L’entreprise interdit de reprendre les idées de trading de tiers ou de communautés, de partager un compte, ou d’utiliser plusieurs comptes depuis un même foyer, appareil ou IP.',impact:'Les signaux copiés et les foyers de plusieurs traders doivent être clarifiés avant tout achat.'}
    ],
    products: [
      {name:'1-Step Classic',drawdownDetails:'Seuil total fixe à 94 % du capital initial ; toucher le seuil en perte latente ferme le compte.'},
      {name:'1-Step Pro',drawdownDetails:'Seuil total fixe à 95 % du capital initial ; le plafond journalier est indépendant.'},
      {name:'1-Step Turbo',drawdownDetails:'Seuil total fixe à 97 % du capital initial, avec plafond journalier simultané.'}
    ]
  },
  myfundedfutures: {
    restrictiveRules: [
      {program:'Builder — évaluation et compte financé simulé',rule:'L’évaluation comporte un drawdown suiveur EOD, sans consistance. Une fois financé : meilleure journée plafonnée à 50 %, réserve de gains et retraits de 1 000 $ sur 25K ou 2 000 $ sur 50K ; seuil de perte ajusté après paiement.',impact:'Une journée autorisée pendant le test peut bloquer un retrait financé ; réserver suffisamment de bénéfices.'},
      {program:'Rapid Intraday / Rapid EOD — évaluation',rule:'Rapid Intraday : 50 % de consistance et deux jours minimum. Rapid EOD : 30 %, quatre jours et inactivité limitée à sept jours.',impact:'Les deux versions Rapid ont des conditions de réussite différentes malgré un nom commun.'},
      {program:'Pro et Rapid — retraits financés',rule:'Rapid : admissibilité après 24 heures, sous réserve de gains et retrait minimal de 500 $. Pro : cycles de quatorze jours, réserve plus importante et retrait minimal de 1 000 $.',impact:'Un compte bénéficiaire peut rester sous le seuil de gains effectivement retirable.'}
    ],
    products:[
      {name:'Builder — évaluation',drawdownDetails:'Drawdown suiveur sur les pics de solde de fin de journée, contrôlé pendant les séances.',consistencyRule:'Pas de règle de consistance pendant l’évaluation.'},
      {name:'Rapid Intraday — évaluation',drawdownDetails:'Le tableau commun indique une limite d’évaluation EOD ; ne pas l’étendre au compte financé sans vérifier.',consistencyRule:'Meilleure journée ≤ 50 % des gains de l’évaluation.'},
      {name:'Rapid EOD — évaluation',drawdownDetails:'Drawdown relevé à la clôture puis surveillé en séance.',consistencyRule:'Meilleure journée ≤ 30 % des gains de l’évaluation.'},
      {name:'Pro — évaluation',drawdownDetails:'Limite de perte EOD propre à chaque taille de compte.',consistencyRule:'Meilleure journée ≤ 50 % des gains de l’évaluation.'}
    ]
  },
  tradeify: {
    restrictiveRules:[
      {program:'Select Evaluation — phase d’évaluation',rule:'Drawdown suiveur EOD, plafond de 40 % sur la meilleure journée et trois jours minimum. Une fois le challenge réussi, choix définitif entre Flex (cinq jours gagnants) et Daily (réserve et plafonds plus petits).',impact:'L’absence de limite de perte quotidienne durant l’évaluation ne supprime pas le drawdown ; le choix de retrait est irréversible.'},
      {program:'Growth — évaluation puis financement',rule:'Limite quotidienne souple pendant l’évaluation, sans consistance ; une règle distincte de 35 % de consistance s’applique ensuite sur le compte financé.',impact:'Réussir rapidement le test ne dispense pas des règles de retrait une fois financé.'},
      {program:'Lightning — achats depuis septembre 2025',rule:'Financement simulé direct, mais objectifs de gains, plafonds par retrait et consistance progressive de 20 %, puis 25 % et enfin 30 %.',impact:'L’objectif de profit n’est pas la somme intégralement retirable.'}
    ],
    products:[
      {name:'Select — évaluation',drawdownDetails:'Seuil recalculé sur les pics de clôture, contrôlé intraday ; Flex et Daily divergent après validation.',consistencyRule:'40 % à l’évaluation ; option à 50 % payante.'},
      {name:'Growth — évaluation',drawdownDetails:'Seuil de perte relevé en fin de journée et pause souple distincte en séance.'},
      {name:'Lightning — financement simulé direct',drawdownDetails:'Drawdown suiveur EOD ; montant du retrait et objectif de gains sont deux mesures distinctes.',consistencyRule:'20 % au premier retrait, 25 % au deuxième, 30 % aux suivants.'}
    ]
  },
  tradeday: {
    restrictiveRules:[
      {program:'Quick Pay — évaluation',rule:'Cinq jours de trading minimum ; meilleure journée limitée à 30 % des gains totaux. La limite de drawdown reste valable même si l’objectif est atteint.',impact:'Une forte journée peut retarder la validation ; le compte financé Quick Pay annonce un premier retrait sans réserve de gains.'},
      {program:'Fast Pass — évaluation',rule:'Le guide officiel dit « sans minimum de jours », mais les fiches d’achat actuelles indiquent trois jours. Les deux affichent une consistance de 45 %.',impact:'Les textes officiels divergent : demander la règle contractuelle écrite pour le compte choisi.'},
      {program:'Tous les nouveaux challenges — depuis le 12 novembre 2026',rule:'Les abonnements et réinitialisations payantes ont été remplacés par un prix unique. Les anciens abonnements bénéficient de conditions de transition ; après échec, il faut acheter un nouveau challenge.',impact:'Les anciens tarifs mensuels ne décrivent plus les nouveaux achats.'}
    ],
    products:[
      {name:'Quick Pay — évaluation',description:'Achat unique dès 99 $ au tarif catalogue pour 25K Intraday, hors remise temporaire. Versions d’évaluation Intraday ou EOD ; le seuil peut changer en compte financé.'},
      {name:'Fast Pass — évaluation',description:'Achat unique dès 173 $ au tarif catalogue pour le 25K EOD, hors remise ; retraits avec cinq journées gagnantes et plafond par paiement.',minTradingDays:'Contradiction officielle : carte d’achat à trois jours minimum, guide « sans minimum ». Cinq journées bénéficiaires pour le retrait.'}
    ]
  },
  'lark-funding': {
    restrictiveRules: [
      {program:'1-Step / 2-Step / 3-Step — retraits',rule:'Demandes de retrait toutes les quatorze journées, au moins 100 $, avec 40 $ de frais fixes de traitement. Un calendrier hebdomadaire est proposé contre supplément.',impact:'La commission fixe pèse lourd sur les petits retraits ; la date d’éligibilité ne garantit pas le délai de réception.'},
      {program:'Comptes Instant — retraits suivants',rule:'Le premier retrait est accessible à la demande, mais les suivants sont espacés de trente jours, avec un minimum de 100 $. La FAQ générale indique 40 $ de frais, mais la formule Instant 1 000 $ en est explicitement exemptée.',impact:'Les comptes Instant ne permettent pas des retraits illimités ; vérifier les frais par produit. Exception documentée : https://helpdesk.larkfunding.com/en/articles/13714987-withdrawal-rules-1-000-instant-account'},
      {program:'1-Step MAX — perte latente par idée de trading',rule:'Dépasser 1 % de perte sur une même position ou idée constitue une infraction souple pendant le test, puis éliminatoire sur le compte financé. Les positions ouvertes sont fermées.',impact:'Un dépassement récupérable pendant l’évaluation devient définitif après financement ; le seuil reste fondé sur le capital initial.'}
    ],
    products:[
      {name:'1-Step Career — évaluation',drawdownDetails:'Seuil de perte totale fixe à 7 % du capital initial ; plafond quotidien distinct.'},
      {name:'3-Step — évaluation',drawdownDetails:'Présentation officielle : perte maximale statique de 5 % ; vérifier les chiffres de chaque phase avant paiement.'}
    ]
  },
  'uprofit-trader': {
    restrictiveRules:[
      {program:'DAY Soft / DAY Flex — évaluation et compte virtuel financé',rule:'Drawdown EOD et objectifs propres à chaque taille. Pour DAY Soft 50K, la limite journalière est de 1 100 $ et la consistance de 50 %. Les retraits sont soumis à d’autres plafonds.',impact:'Le partage annoncé de 90 % n’annule ni le contrôle des pertes, ni les plafonds de paiement.'},
      {program:'ONE 50K — évaluation',rule:'Objectif de 2 500 $, perte maximale statique de 1 000 $, consistance de 50 % et deux jours minimum. Pas de frais d’activation une fois le test réussi.',impact:'Le plancher de perte est fixe, contrairement aux plans DAY EOD ; une seule grosse journée peut retarder la validation.'},
      {program:'DAY — renouvellement',rule:'Les évaluations à abonnement sont renouvelées automatiquement, sauf résiliation au moins un jour ouvré avant la date prévue.',impact:'Un test non terminé ou échoué peut engendrer un nouveau prélèvement si l’abonnement reste actif.'}
    ],
    products:[
      {name:'DAY Soft — évaluation',description:'Abonnement mensuel : 49 $ catalogue en 10K et 130 $ en 50K, hors promotions.',drawdownDetails:'Mesure de perte EOD, avec plafonds de risque quotidien propres à la taille.',consistencyRule:'50 % sur les cartes d’évaluation ; conditions de retrait financé distinctes.'},
      {name:'DAY Flex — évaluation',description:'Formule DAY distincte sur abonnement, disponible de 50K à 150K.',drawdownDetails:'Drawdown EOD ; ne pas appliquer la limite journalière du plan Soft au plan Flex.',consistencyRule:'50 % selon les cartes d’évaluation affichées.'},
      {name:'ONE 50K — évaluation',description:'Évaluation à 120 $ en achat unique, sans frais d’activation après réussite.',drawdownDetails:'Plancher statique à 49 000 $, non relevé par les plus-hauts du solde.',consistencyRule:'Meilleure journée limitée à 50 % des gains de l’évaluation.',minTradingDays:'Deux journées de trading.'}
    ]
  },
  tickticktrader: {
    restrictiveRules:[
      {program:'Nouveaux programmes — disponibilité des achats',rule:'La boutique officielle indique que les achats et nouveaux abonnements sont temporairement suspendus pendant des changements de plateforme. Les anciens tarifs ne prouvent pas que la commande fonctionne actuellement.',impact:'Vérifier directement la reprise effective des ventes. Une suspension n’est pas la preuve d’une fermeture juridique.'},
      {program:'S2F+ 50K / 100K — gains contractuels',rule:'Profit Score de 10 avant le premier retrait, puis 7. Sur les gains, 50 % sont versés en espèces, 40 % transférés dans un Live Wallet et 10 % retenus en frais ; minimum de demande 250 $ et plafonds par cycle.',impact:'Une allocation globale de 90 % ne signifie pas 90 % immédiatement retirables en espèces.'},
      {program:'TTT Direct 50K — restrictions propres au contrat',rule:'Conservation de positions la nuit ou le week-end interdite, règles de progression des lots, et réserve de sécurité de 2 600 $ avant le premier retrait ; violations répétées pouvant entraîner la désactivation.',impact:'Les modalités du compte Direct ne doivent pas être confondues avec celles de S2F+.'}
    ]
  },
  'the-concept-trading': {
    restrictiveRules:[
      {program:'Modèles standards — facturation du partage des gains',rule:'La FAQ demande une facture dans les trente jours suivant l’atteinte d’un objectif de progression ; le partage standard commence à 50 %, et non aux 90 % maximaux mis en avant.',impact:'Oublier une échéance administrative peut faire perdre un paiement malgré l’objectif de trading atteint.'},
      {program:'90% Lock — niveaux financés éligibles',rule:'Option absente des niveaux Foundation et Intern, à activer après avoir reçu le partage habituel au niveau choisi. Son activation bloque définitivement toute nouvelle progression.',impact:'Obtenir 90 % implique de renoncer aux augmentations futures de taille de compte.'},
      {program:'Tous les modèles — inactivité',rule:'Sans opération pendant 42 jours, le compte est clôturé. Le drawdown est fixe, avec un taux propre au programme et non universel.',impact:'L’inactivité peut entraîner la perte du compte sans dépassement du plafond de pertes.'}
    ]
  },
};
