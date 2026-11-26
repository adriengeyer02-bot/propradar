# PropRadar — audit approfondi des CGU, clauses de récompense et résiliation
> **Mise à jour — deuxième vague (24/11/2026) :** 22 prop firms intermédiaires supplémentaires ont été étudiées, avec 54 constats supplémentaires. Les 26 profils du lot « règles ordinaires uniquement / zéro risque classé » ont désormais fait l'objet d'un triage documentaire, mais les accords funded absents restent non vérifiés. Au total : 45 sociétés distinctes et 110 observations, sans aucune modification des scores publics. Voir [rapport Vague 2](CONTRACT_AUDIT_MEDIUM_FIRMS_REPORT_2026-11-24.md) et [données structurées](contract-clauses-medium-firms-2026-11-24.json).

> **État consolidé — troisième vague du 24/11/2026 :** 22 nouveaux dossiers / 79 constats, soit **67 entreprises distinctes / 189 observations** dans six fichiers. Les 67 sont des **dossiers de recherche**, pas des audits individuels financés complets. **54 fiches sur les 121** approuvées V5.2 n'ont pas encore reçu ce même triage sur cette branche. Le fichier de pilotage [contract-coverage-master-121-2026-11-24.json](contract-coverage-master-121-2026-11-24.json) contient les 121 statuts et la file restante; lire le [rapport Vague 3](CONTRACT_AUDIT_RISK_FIRMS_WAVE3_REPORT_2026-11-24.md). Aucun score public modifié.

> **Vague 4 — consolidation 24/11/2026 :** +23 dossiers de revue contractuelle et +87 observations, soit **90 sociétés recherchées sur 121 / 276 observations** en tout. **31 sociétés restent sans ce triage (dont 3 CGU inaccessibles)**. Plusieurs des 90 n'ont PAS d'accord funded individuel disponible ; ce total ne mesure pas une certification ou la fin des audits. [Rapport Vague 4](CONTRACT_AUDIT_WAVE4_REPORT_2026-11-24.md) · [Tracker maître](contract-coverage-master-121-2026-11-24.json).

**Date : 24 novembre 2026** · **RAPPORT DE RECHERCHE, NON PUBLIÉ SUR LE SITE**

## Décision de méthode
Nous mettons les barèmes V5.2 / hybride en pause jusqu'à convergence des audits. Une absence de clauses classées NE signifie PAS une absence de risques. Une clause inscrite au contrat n'établit PAS qu'elle a été exercée abusivement. Enregistrer le document, sa version, sa date, le vendeur/la partie débitrice, le programme, la phase, la conséquence, les exceptions/recours et une seule référence de fait par risque.

**Travaux déjà documentés ici : 23 firmes et 56 constats**, dont un premier lot de quinze dossiers structurés (44 constats) et une reprise des huit fiches V5.2 sans aucune règle classée (12 constats). Cette passe ne constitue PAS la clôture exhaustive de tous les contrats et des dossiers nécessitant les agreements individuels.

### État du recensement
- Snapshot historique du fichier de mise à jour : 196 fiches ; **73** ne contenaient aucune règle dans `restrictiveRules`, y compris de nombreuses marques fermées/obsolètes. Ce n'est pas un inventaire d'entreprises actuellement actives.
- Sur les **121 approbations V5.2**, **8 n'avaient aucune règle classée** ; **34 n'avaient aucune règle à risque classée** (ces huit + 26 avec des règles ordinaires uniquement).
- Dans le recensement historique complet, 101/196 n'avaient aucune règle à risque classée — indicateur de **couverture incomplète**, pas de fiabilité des sociétés.
- **7 cas** présentaient une règle qualifiée de « vague » ou « contradictoire » dans une catégorie que le moteur écarte comme « classique » avant d'examiner le conflit : Audacity Capital, FunderPro, Lucid Trading, TradeDay, TradeXProp, Alpine Funded, Klein Funding Crypto. Les sept nécessitent une réévaluation ; il ne s'agit pas de sept fautes avérées.
- La migration d'audit des 121 contrats ne doit plus confondre « aucun risque trouvé », « audit contractuel non fait », et « risque documenté mais encore non applicable à la cohorte ».

## Constats majeurs documentés sur sources officielles

### City Traders Imperium (CTI) — priorité de rapprochement juridique
PDF officiel de juin 2026 : https://citytradersimperium.com/wp-content/uploads/2026/06/City-Traders-Imperium-Terms-and-Conditions.pdf
- **§8.11** : perdre le droit aux récompenses après violation de n'importe quelle condition contractuelle; il faut mesurer l'effet sur le reward déjà dû plutôt que sur une récompense simplement potentielle.
- **§8.13** : l'entreprise se réserve la définition de comportements prohibés.
- **§13.12** : résiliation/suspension sans préavis, avec ou sans motif; ne pas déduire §13.12 et §8.13 deux fois pour le même pouvoir.
- **§17.3** : changement possible sur contrat déjà conclu; refus du trader = fin du contrat.
- **Énorme point manquant** : site 2026 https://citytradersimperium.com/contact-us/ désigne séparément City Traders Imperium Limited (Comores) pour les évaluations simulées et CTI FZCO pour l'académie; les anciens PDF/conditions parlent aussi de FZCO. La version réellement acceptée au checkout et la contrepartie qui doit les rewards ne sont pas reconduites d'une version à l'autre sans preuve.

### Apex Trader Funding — clause de rémunération précise, non simple « règle »
Source : https://dashboard.apextraderfunding.com/agreement/user-agreement
- **§12 Rewards (Performance Accounts)** : pouvoir de refuser/annuler une distribution, y compris sans motif, et décision normalement définitive sans appel. La distinction entre un Reward éligible et un droit légal acquis est centrale.
- **§12** : chargebacks liés aux cotisations et effets possibles sur des rewards antérieurs de la période.
- **§30** : mise à jour des conditions sous réserve de notification par publication; effet sur la cohorte à vérifier.
- Ne pas assimiler aux règles d'évaluation ni au contrat des traders en argent réel.

### Tradeify — sanctions bancaires et modification unilatérale
Source : https://tradeify.co/funded-trader-agreement
- **§4.4** : paiement déjà approuvé mais non versé pouvant être retenu pendant une enquête, avec délai suspendu.
- **§7.6** : contestation bancaire de frais => selon le contrat, bannissement permanent, comptes clos et payouts impayés perdus; procédure de contact support prévue avant contestation.
- **§16** : pouvoir de modifier les règles y compris de payout lors de publication/notification.
- **§10** prévoit un arbitrage en Floride : il est donc inexact d'affirmer « aucun recours ».

### FundedNext — deux versions pour une même clause sensible
Source actuelle : https://fundednext.com/terms-of-service
- **§9.4** : sanctions incluant retenue, refus, annulation ou inversion de Performance Rewards; sanction contractuelle **jusqu'à 2 500 USD** affichée sur la page canonique lue.
- Une autre URL sous le même domaine (**/static/terms-of-service**) expose **25 000 USD**. Ne pas publier le chiffre supérieur comme s'il s'appliquait à tous. Identifier priorité contractuelle, pays, version et date.
- **§9.6** : liste des conduites prohibées ouverte, au-delà des exemples énumérés.
- Les sanctions sont des **pouvoirs contractuels**; elles ne constituent pas la preuve de refus de payout constatés.

### The5ers — confidentialité et profits accumulés
Source : https://the5ers.com/en/terms-and-conditions/ (datée 28/10/2026)
- **§10.1(11)** : divulgation/publication sans autorisation de communications internes/support en ligne pouvant entraîner résiliation et perte des profits ou Reward Balance accumulés.
- **§11** : exigences strictes d'approbation de certains algos/EA.
- Les clauses de modification unilatérale doivent être rapprochées des droits de traders déjà en funded stage et des exceptions légales.

### MyFundedFutures — accord prioritaire manquant
Source : https://myfundedfutures.com/terms
- **§16.2–16.5** : pouvoir étendu de retenir ou faire perdre rewards et payouts en cas d'infraction aux conditions, qualification relevant de l'entreprise.
- **§17** : résiliation large.
- **§29** : **Appendix > Simulated Trader Agreement > Terms** en cas de conflit. Sans annexe + agreement correspondant au compte, on n'a PAS terminé l'audit funded. Ne pas attribuer les règles d'une filiale MyFunded Perpetuals à MFFU.

### Audacity Capital — recours trouvé, anciens fragments sur la page
Source : https://audacity.capital/en/terms-and-conditions/
- Les pratiques prohibées permettent suspension et refus de paiement **lié à l'activité affectée**, ce qui borne la portée de la clause.
- Une section de revue des payouts permet au trader de contester la décision auprès du support.
- La version récente promet 7 jours de préavis de changements matériels des comptes existants et pas de rétroactivité sur trades déjà ouverts, tandis que d'anciens fragments coexistent dans la page. Ne pas mélanger leurs règles.
- Le conflit « jours minimums » Ability One est à revalider, car le moteur l'avait neutralisé sous la catégorie « classique ».

### FTMO, Topstep et Lucid — empêcher trois faux positifs
- FTMO : https://ftmo.com/en/forbidden-trading-practices/ ; vraie discrétion sur certaines stratégies et rewards **potentiels**, mais l'ancien « conflit » ouverture proche du week-end vs maintien sur Swing n'est pas démontré. Ancien malus −8 non fiable.
- Topstep : https://www.topstep.com/terms-of-use — le chapitre « Rewards » traitant des **récompenses de parrainage** exclut explicitement les payouts des comptes XFA/LFA; ne jamais lui attribuer un malus de reward de trader pour ce chapitre. Le cadre de bannissement et pertes de solde du help center est bien un sujet distinct : https://help.topstep.com/en/articles/16989498-i-ve-been-banned-what-are-my-options . Accord Express Funded actuel toujours nécessaire.
- Lucid : https://lucidtrading.com/terms-of-use/ — les « Rewards » génériques peuvent être des récompenses promotionnelles, mais le bloc `Prohibited Uses` prévoit pour sa part pause/refus de payouts en cas d'infractions jugées par la firme; procédure de demande de review par support indiquée.

### FXIFY, Axi Select, Tiger Funded, Fintokei, Take Profit Trader
- FXIFY : https://fxify.com/agreement/ vs https://fxify.com/contact/ ; accord nommant FXIFY Solutions Limited « Prop Company », contact présentant l'entité comme agent de paiement; réconciliation indispensable.
- Axi Select : https://help.axi.com/en-US/axiv2--axicorp-prod/article/rBpGJlIt-how-do-i-withdraw-from-my-axi-select-account ; retraits peuvent mécaniquement réduire l'Allocation Account : NE PAS confondre ajustement déterministe avec confiscation discrétionnaire.
- Tiger : https://tigerfunded.com/rules ; ancienne contradiction FAQ « trois jours minimum » NON reproduite à la relecture actuelle; conditions funded signées requises. Source : https://tigerfunded.com/terms-of-service
- Fintokei : https://www.fintokei.com/terms-and-conditions/ pointe vers la V17 novembre 2026, repérée mais PDF non relu; FAQ https://support.fintokei.com/en/articles/11315957-overview-of-our-risk-management-process-what-will-happen-if-we-identify-any-of-the-prohibited-gambling-or-unsustainable-practices décrit mesures graduées.
- Take Profit Trader : https://takeprofittrader.com/terms ; CGU générales non suffisantes pour l'Agreement PRO / PRO+ ; ne pas noter par défaut faute d'accord rémunérateur.

## Reprise des 8 entreprises sans aucune règle classée
| Entreprise | Résultat de ce passage | Source |
|---|---|---|
| MyFundedCapital | CGU mises à jour 23/11 lues, liste limitative de motifs de refus, appel interne 7j/7j, préavis 14j sauf exceptions sur règles d'intégrité | https://myfundedcapital.com/terms-and-conditions/ |
| RZR Funded | CGU actuelles lues : clauses rétroactives de retenue / récupération, entité Mauritius C191400; autres index montrent une ancienne/autre variante Saint Lucia : **conflit à rapprocher** | https://rzrfunded.com/terms-conditions/ |
| Forex Funds Flow | CGU publiques indexées, accès direct au moment du contrôle renvoyait 503; contrat funded non conclu | https://forexfundsflow.com/terms-conditions |
| Funding Frontier | CGU 2024 indexées, site renvoie en boucle ; contrat 2026 non validé | https://fundingfrontier.com/legal-terms/ |
| Fidelcrest | Texte de CGU ancien indexé, connexion actuelle fermée/intermittente ; offre et accord funded à confirmer | https://fidelcrest.com/terms-conditions |
| Fundings4U | URL supposée CGU 404, audit actuel impossible | https://fundings4u.com/terms-and-conditions |
| PipFarm | Documents partiellement lisibles ; accord de Remote Trader Program renvoyé à Appendix B, pas encore rapproché | https://pipfarm.com/terms-and-conditions |
| Prop Number One | Archive 2025 mentionne contrat `Independent Contractor Agreement` distinct, termes courants inconnus | https://propnumberone.com/wp-content/uploads/2025/04/Overview_1.pdf |

## Priorité suivante — 26 avec règles classées mais aucun « risque contractuel » classé dans l'ancien moteur
Alpha Capital Group; Maven Trading; FundedHive; Upcomers; Sure Leverage; Trading Cult; X Funded; Funding Pips; GOAT Funded Trader; Funded Trading Plus; City Traders Imperium; OneUp Trader; UProfit Trader; Breakout Prop; TradeFundrr; Take Profit Trader; E8 Markets; BrightFunded; Instant Funding; Trade The Pool; For Traders; MyFundedFutures; Tradeify; AquaFunded; Funding Traders; The Trading Pit.

**Attention :** City Traders Imperium, MyFundedFutures, Tradeify et Take Profit Trader ont été repris dans le lot présent; la liste reflète la **classification ancienne**, pas une absence de recherche aujourd'hui.

### Critères de clôture d'un dossier
Un dossier ne pourra être marqué **audit contractuel complet** qu'avec :
1. CGU en vigueur datées + contrat d'évaluation + accord funded/annexe opposable du programme exact, avec la partie débitrice correcte;
2. clauses de paiement et résiliation vérifiées, exceptions/recours, changement des contrats existants, prix et frais;
3. historique d'exigences réglementaires/registre selon l'entité et pays (contrôle complémentaire, distinct de la clause de payout);
4. une source par fait, non-déduplication des faits et des clauses communes aux produits;
5. **aucune modification de note, classement ou affiliation** en attendant la validation du futur barème.

## Fichiers structurés
- `contract-clauses-deep-sweep-2026-11-24.json` — 15 firmes et 44 constats sourcés, avec scope et manques.
- `contract-clauses-zero-classified-8-2026-11-24.json` — 8 dossiers autrefois sans règle classée, 12 constats, statuts de lisibilité.
- `contract-audit-coverage-inventory-2026-11-24.json` — inventaire historique 196 et cohorte V5.2 des 121, distinction 0 règle / 0 risque classé.

**Ne pas fusionner les fichiers dans `firm-updates.json`, ne pas relancer la V5.2, ne pas publier une note de travail.**
