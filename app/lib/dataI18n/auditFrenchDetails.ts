/** French translations of sourced legal-review details, aligned with the English update arrays. */
export const auditFrenchDetails: Record<string, {
  regulatoryStatus?: string[];
  complaintsAndDisputes?: string[];
  redFlags?: string[];
  changelog?: string[];
  entities?: string[];
  incidents?: string[];
}> = {
  'axi-select': {
    changelog: ["", "", "Offre sans frais de challenge confirmée, mais compte CFD réel avec 500 $ de fonds personnels, 20 trades et Score Edge 50 ; Seed normalement à 0 % et 80 % seulement au sommet. Note 77/100 maintenue après comparaison des risques et de la transparence.", "Les règles de progression exigent des jours et un capital propres à chaque niveau, ainsi que les objectifs d'allocation. Aucun challenge simulé payant n'est vendu ici.", "Le Trustpilot Axi de 4,1/5 sur 8 354 avis concerne le courtier global, pas le seul programme Select ; aucune note spécifique n'a été ajoutée." ]
  },
  'trade-the-pool': {
    changelog: ["", "", "", "Les profits ne sont comptabilisés que si la variation atteint dix cents et si la position dure 60 secondes en règle générale, ou 30 secondes pour MAX/FLEX. Concentration de 30 % et volume par minute limité à 5 % ; pas de preuve d'une fermeture automatique pour chaque SL/TP rapide. Note 76 à 66.", "Trustpilot reste à 4,5/5 sur 1 002 avis ; commentaires favorables et plaintes sur les règles ne constituent pas un audit des retraits."]
  },
  'city-traders-imperium': {
    regulatoryStatus: [
      "Le contrat officiel d'août 2026 et la page contact désignent City Traders Imperium Limited (Comores, n° 15969) pour les évaluations simulées, avec adresse opérationnelle au Costa Rica, et CTI FZCO (Dubaï) pour l'Academy. Le PDF de septembre 2025 qui nommait FZCO pour l'évaluation est une archive.",
      "Les deux entités décrivent des services éducatifs ou simulés, non des dépôts de courtage. Une éventuelle invitation distincte à un courtier est discrétionnaire et ne constitue pas une étape protégée ou garantie du programme.",
      "Une page de vérification d'Anjouan mentionne l'immatriculation n° 15969 comme active, sans que cela équivaille à la protection d'un régulateur FCA, ASIC ou européen. L'ancienne société britannique renommée est distincte."
    ],
    complaintsAndDisputes: [
      "Le contrat autorise sous conditions contrôle du risque, demande de code source et de KYC, annulation de trades, réduction du levier et fermeture sans remboursement. Les décisions ne constituent pas un arbitrage indépendant.",
      "Le règlement de remboursement exclut en général les comptes ayant effectué un premier trade, sous réserve de l'exception limitée de sept jours pour les comptes inactifs, et prévoit des conséquences pour les contestations de paiement qualifiées d'injustifiées.",
      "Trustpilot affiche 4,3/5 sur 1 646 avis, positifs et critiques ; PropRadar n'a pas tranché les litiges individuels."
    ],
    redFlags: [
      "Le contrat d'archive de 2025 et la version d'août 2026 désignent des sociétés différentes pour les évaluations ; conserver la version effectivement acceptée à l'achat et la facture.",
      "Un stop-loss visible doit être placé sous 60 secondes ; les EA sont plus strictement encadrés sur 2-Step, Instant et Direct. Ce ne sont pas des durées minimales de maintien des positions.",
      "Clauses générales de conduite et de contrôle, ainsi que délais courts pour répondre aux demandes KYC ou de code source ; le partage jusqu'à 100 % et les retraits immédiats dépendent de paliers."
    ],
    changelog: ["", "", "", "Le PDF d'août 2026 lié comme contrat actuel attribue désormais les évaluations simulées à la société des Comores et les cours à CTI FZCO ; correction des anciennes descriptions juridiques. Note 74 à 68 sans remettre en cause l'activité commerciale.", "Stop-loss réel obligatoire sous 60 secondes, non durée de trade ; EA tiers permis sur 1-Step seulement. Remboursements limités et règlement de conduite à lire, sans conclure à une interdiction des avis honnêtes.", "Trustpilot : 4,3/5 sur 1 646 avis ; les 100 % sont un niveau VIP, pas la part initiale.", "Les quatre programmes actuels ont été mis à jour : 1-Step dès 29 $, 2-Step dès 39 $, Instant dès 79 $ et Direct Funding (anciennement affiché Instant Pro) dès 229 $. Les liens d'affiliation fournis par Adrien restent inchangés."],
    entities: [
      "Prestataire actuel des évaluations de compétences et du trading simulé, selon le contrat d'août 2026 et le pied de page officiel. Non assimilé à un courtier agréé de premier rang.",
      "Prestataire actuel de l'Academy. Le PDF de septembre 2025 désignait auparavant CTI FZCO comme cocontractant des évaluations, mais le texte d'août 2026 attribue celles-ci à l'entité des Comores.",
      "Ancienne société britannique City Traders Imperium renommée en janvier 2025 et visée par une demande de radiation volontaire en mars 2026 ; distincte de l'exploitant actuel. Demande de radiation ne prouve pas dissolution acquise."
    ]
  },
  'take-profit-trader': {
    changelog: ["", "", "", "La promesse d'un retrait PRO dès le premier jour suppose d'abord un coussin de gains égal au drawdown, par exemple 2 000 $ sur un compte 50K. Règles de trading et stop suiveur intraday sévères ; note 73 à 68 tout en saluant la documentation précise.", "Les 5 à 10 secondes concernent le passage PRO Tradovate vers le portefeuille TPT pour les comptes éligibles, non la réception bancaire ; l'accès à PRO+ n'est pas automatique.", "Trustpilot affiche 4,4/5 sur 11 297 avis, sans suspension de note observée."]
  },
  'oneup-trader': {
    changelog: ["", "", "", "", "", "La documentation des comptes financés interdit les stratégies sous dix secondes citées, impose 50 % de l'activité hebdomadaire moyenne du test et un contrôle du solde tous les quinze jours pendant 90 jours. Pas de preuve d'une interdiction générale des stops déclenchés sous dix secondes. Note 72 à 66.", "La régularité du test compare les trois autres meilleures journées à 80 % de la meilleure ; Trustpilot mis à jour séparément.", "Trustpilot reste à 4,7/5, avec 2 824 avis et sans suspension de note visible."]
  },
  'goat-funded-trader': {
    changelog: ["", "", "", "", "", "Réexamen à 58/100 : pénalité de huit points pour l'alerte Trustpilot encore active, plus les contraintes de versement publiées. Ni fermeture ni faute individuelle non prouvée ne sont affirmées.", "La FAQ officielle confirme les plafonds sur les premiers retraits, 3 000 $ de gains quotidiens, 3 % de frais et les conditions d'éligibilité ajoutées depuis le 8 octobre 2026."]
  },
  'leeloo-trading': {
    changelog: ["", "Les conditions officielles de 2026 prévoient un contrôle manuel et des plafonds variables : note de 70 à 65, sans attribuer à la société une faute non démontrée.", "Le support officiel rappelle la règle des 30 %, le drawdown suiveur et les limites de positions selon les comptes."]
  },
  'hantec-trader': {
    changelog: ["", "", "", "", "La FAQ distingue la décision sous 24 heures ouvrées du virement effectif et exclut certains contrôles supplémentaires. Note de 73 à 70 ; société toujours active sous RZR Funded.", "Trustpilot affiche désormais 4,4/5 sur 880 avis regroupés. Aucune pénalité pour manipulation d'avis n'est appliquée."]
  },
  ftuk: {
    changelog: ["", "", "La règle officielle impose 30 secondes à tous les trades, y compris en cas de SL/TP. Avec les restrictions de stratégie et d'IP, la note baisse de 72 à 65 sans accuser la société de cacher ses règles.", "Conditions VPN/IP vérifiées ; les plaintes et les réponses de FTUK restent contradictoires et non arbitrées.", "Trustpilot affiche 3,9/5 sur 811 avis ; aucune suspension de note n'est signalée."]
  },
  'lux-trading-firm': {
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
    regulatoryStatus: ["TradeFundrr LLC est nommé comme prestataire des comptes Pre-Prop et Prop entièrement fictifs ; il ne détient pas les titres ni les fonds des clients.", "Pro est un programme séparé avec contribution de capital et contrat distinct.", "T3 Trading Group est présenté comme courtier SEC/FINRA/SIPC, mais ses agréments ne couvrent pas les simulations TradeFundrr."],
    complaintsAndDisputes: ["Trustpilot affiche 4,3/5 sur 84 avis, entre récits de versement et plainte vérifiée sur des vérifications d'identité tardives ; les cas restent non arbitrés.", "Le mur de certificats de l'entreprise ne remplace pas des rapprochements bancaires indépendants.", "Les retraits Prop demandent cinq journées positives et le respect d'une règle de régularité, puis sont traités le vendredi."],
    redFlags: ["L'ancienne page Futures mène aujourd'hui à une offre actions/options : les anciennes descriptions ne doivent pas guider un achat actuel.", "Le parcours Pro requiert une contribution : son exposition contractuelle doit être étudiée séparément.", "Les tarifs Pre-Prop/Prop sont 599/1 499 $ à l'entrée, auxquels s'ajoutent 99 $ par mois ; vérifier le panier et les échéances.", "Les agréments de T3 appartiennent à un partenaire distinct."],
    changelog: ["Le précédent relevé d'octobre indiquait 4,2/5 pour 83 avis Trustpilot ; les prix et répartitions n'avaient pas été entièrement revérifiés.", "En octobre, l'ancienne page Futures indiquait 80 % de partage, des retraits le vendredi et des frais de données ; les montants et la nouvelle orientation commerciale restaient à confirmer.", "L'URL Futures mène à une page actions/options. Catégorie et quatre offres corrigées : Pre-Prop 599 $, Prop 1 499 $, plus 99 $/mois. Contrats simulés, risque Pro et retraits réexaminés. Note de 64 à 67.", "Les pages officielles des actions et options indiquent les mêmes prix d'entrée et de souscription mensuelle, tandis que la contribution Pro peut être perdue.", "Trustpilot passe à 4,3/5 sur 84 avis ; récits favorables et retard KYC sont présentés comme témoignages, pas comme preuve de virement."]
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
    regulatoryStatus: ["Le site distingue les entités de Hong Kong, Chypre, Maurice et les prestataires techniques dans une activité d'évaluation simulée.", "Le contrôle externe des délais de traitement du 15 octobre 2025 au 15 mars 2026 exclut explicitement une opinion d'audit, d'assurance ou une reliance des tiers."],
    complaintsAndDisputes: ["Le résumé publié par la société annonce 98,35 % de demandes complètes traitées dans l'heure et zéro refus dans le périmètre, sans rendre public le rapport intégral.", "Trustpilot affiche 4,6/5 sur 4 324 avis, avec des litiges individuels sur comptes et vérification d'identité, non arbitrés."],
    redFlags: ["L'étude de délais ne démontre pas que tous les acheteurs se sont qualifiés ni que tous les virements bancaires ont été contrôlés.", "Les conditions et plafonds diffèrent fortement selon les programmes.", "La licence d'une société liée à Maurice ne régule pas automatiquement les rémunérations des simulations."],
    changelog: ["Finance Magnates a examiné des documents d'une étude Deloitte sur les délais de versement, mais celle-ci n'est ni un audit ni une opinion d'assurance et le rapport intégral n'est pas public. Note prudente de 64 à 67.", "Le résumé officiel précise les limites du contrôle et le calcul du délai après réception des informations complètes.", "Trustpilot affiche désormais 4,6/5 sur 4 324 avis, sans alerte publique de retrait de note."]
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
  }
};
