# Contre-audit Scale C — tête du classement — 27 novembre 2026

**Statut: revue ciblée PARTIELLE des 22 dossiers, non certification intégrale. Aucune modification du classement public.** Le périmètre est le top 20 avant corrections, avec les deux ex æquo supplémentaires à 64. Les notes de départ viennent de [scale-c.json](https://github.com/adriengeyer02-bot/propradar/blob/main/app/data/scale-c.json). Les codes existants sont reproduits pour rendre l'analyse reproductible. Les scénarios ne sont ni des notes approuvées ni des décisions de publication.

## Méthode et limites
- Barème C gelé: B1 −15 absorbe B2; B2 −8 ou B2A −4; B3 −5, B4 −3, B5 −3, B6 −5, B7 −5; total contractuel plafonné à 30. D et consistance plafonnés à 15. E_HARSH −2. Trustpilot selon le barème approuvé, sans double sanction. Conserver les plafonds existants jusqu'à vérification probatoire indépendante.
- Contrôles effectués: inventaire des archives, lecture ciblée de clauses et sanctions, comparaison de certaines FAQ/retraits officiels, repérage des omissions et garde-fous. Les archives contiennent parfois des 403/404 au lieu des textes. Les contrats funded accessibles seulement après activation, annexes, cohorte et programme exact nécessitent encore vérification.
- Les sources ci-dessous sont les documents de travail, pas une affirmation de lecture exhaustive de chacun de leurs articles/annexes. Aucun point ne doit être publié sur un motif seulement possible.
- Le niveau de preuve des payouts, les preuves d'ancienneté, les notices Trustpilot et l'appariement des entités n'ont pas fait l'objet d'une nouvelle certification indépendante lors de ce passage.
- Pour chaque firme, figer le programme principal le moins restrictif suivant C et établir une fiche des autres produits sans cumuler leurs malus. Documenter le lien sanction → perte des gains, les protections/recours et la date/version de chaque clause.
- Avant publication: revue ligne par ligne des documents manquants ou incomplets, contrôle indépendant des propositions et des pénalités existantes, validation propriétaire, recalcul unique sur une branche dédiée, test du site et contrôle de la cohorte après reclassement (tous nouveaux entrants au top 20 à traiter).
- Ne pas réécrire les données d'audit, le barème ni les fichiers appartenant à Claude dans cette PR.

## Dossiers

### FTMO — 85/100 (plafond 98)

Codes actuels: B2 −8, B6 −5.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/ftmo/bc0b4cbacb97.txt) ; [source officielle](https://ftmo.com/en/faq/what-is-the-legal-relationship-between-an-ftmo-trader-and-ftmo-after-signing-the-ftmo-account-terms-conditions/).

Contrat de compte financé distinct après réussite et KYC; vérifier si un modèle complet est accessible avant achat. Ne pas appliquer B7 à la simple existence d'un contrat séparé. Le PDF archivé et le PDF cité dans le barème ont des identifiants différents: réconcilier la version, les régions et les produits futures/CFD.

**Simulation / statut:** 85, non revalidé; B7 éventuel −5 non retenu.

### Take Profit Trader — 80/100 (plafond 95)

Codes actuels: B3 −5, B7 −5, B4 −3, D trailing −2.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/take-profit-trader/upload-ca3b096b18.txt) ; [source officielle](https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15172219527581-PRO-Account-Profit-Split-Withdrawal-Rules).

Le buffer PRO correspond au maximum drawdown (2 000 $ pour 50K); le partage de 80 % porte sur les profits au-delà. Retrait du buffer sous conditions de clôture. PRO+ distinct. D conditions −3 à examiner. Revalider B3: modification générale du site ne suffit pas. B4 doit porter sur une contradiction simultanée et sur le même produit. Archive des FAQ initialement bloquée.

**Simulation / statut:** 77 si D −3 retenu; B3/B4/B7 à revalider.

### Tradeify — 80/100 (plafond 85)

Codes actuels: B3 −5.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/tradeify/1a0475fbd425.txt) ; [source officielle](https://tradeify.co/funded-trader-agreement).

§4.4 suspension même après approbation pendant enquête, sans maximum chiffré mais délai commercialement raisonnable; §6.5 constance taille/stops/objectifs; §6.10 audits; §6.11 recalcul des prix hors marché; §7.6 chargebacks; §16 modification applicable au compte financé. Select Flex: plafonds (50K: 2 500 $ selon cohorte), 50 % des profits, cinq jours à 150 $; Select Daily: buffer/plafond; EOD trailing financé. D plafond −4, conditions −3, trailing −2. B2 −8 seulement si lien explicite entre un motif vague et la privation de gains; ne pas assimiler suspension à confiscation ni double-compter B3. B1 non établi.

**Simulation / statut:** 71 scénario D (−9); 63 seulement si B2 supplémentaire confirmé.

### TradeDay — 77/100 (plafond 95)

Codes actuels: B2 −8, B3 −5, B7 −5.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/tradeday/c79978e13c3b.txt) ; [source officielle](https://tradeday.freshdesk.com/en/support/solutions/articles/103000405228).

Quick Pay funded sim: trailing intraday, profits bruts pris en compte malgré retraits, minimum 250 $, split par palier, transition à 10K de profits bruts; Fast Pass funded sim: plafond, cinq jours, passage live après cinquième retrait, consistance 45 %. Ne pas mélanger deux produits. Si Quick Pay est le programme de référence: D trailing −2; consistance évaluation 30 % → −1 si applicable et non déjà comptée. Ne pas transformer le seuil de transition ou le split progressif en plafond par demande.

**Simulation / statut:** 75 scénario Quick Pay trailing; 74 avec consistance applicable.

### Funding Pips — 75/100 (plafond 85)

Codes actuels: B2 −8, E_HARSH −2.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/funding-pips/upload-38df666066.txt) ; [source officielle](https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard).

CGU OCR mai 2026: vérifier contrat client à signer après réussite et disponibilité préalable. FAQ initialement bloquées. 1-Step Flex et 2-Step: seuil de retrait 1 % du nominal selon programme; 2-Step bihebdomadaire sans consistance, on-demand 35 % et jours qualifiants. Strike/split et profits d'actualité doivent être attribués à la bonne formule. Vérifier 1-Step Labs et le modèle principal le moins restrictif. D conditions −3 seulement si seuil qualifié de majeur.

**Simulation / statut:** 72 conditionnel D −3; pas de B7 sans preuve.

### Topstep — 73/100 (plafond 95)

Codes actuels: B2 −8, B3 −5, D plafond −4, D trailing −2, TPR −3.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/topstep/upload-a200123732.txt) ; [source officielle](https://help.topstep.com/en/articles/8284233-topstep-payout-policy).

Plusieurs passages Rewards concernent les réductions de parrainage, pas les gains du trader: ne pas coder B1/B6 sur cette base. Accord XFA lors de l'activation après réussite: vérifier modèle préalable avant B7. Distinguer XFA et Live, nouveaux add-ons et plafonds applicables. Revalider TPR à date.

**Simulation / statut:** 73 non revalidé; B7 ouvert.

### Equity Edge — 72/100 (plafond 75)

Codes actuels: D conditions −3.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/equity-edge/a3cc35fdb787.txt) ; [source officielle](https://equityedge.io/terms-and-conditions).

§6 Risk Compliance permet refus sur suspicion de violation/manipulation; §10 recours et réponse sous 10 jours ouvrés, décision finale. B2A −4 proposé sous réserve que la procédure couvre le refus en cause. Règles de news et seuil 25 %/reset selon programme: portée à vérifier. §9 chargeback sans motif valable, pas B1 générique. Contrat analyste Instant distinct: ne pas l'attribuer aux autres programmes.

**Simulation / statut:** 68 scénario B2A −4.

### MyFundedFutures — 72/100 (plafond 85)

Codes actuels: B2 −8, B6 −5.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/myfundedfutures/e0c3d10855ac.txt) ; [source officielle](https://help.myfundedfutures.com/en/articles/13745661-payout-policy-overview-best-and-fastest-prop-firm-payouts).

§17.5 confirme risque d'atteinte réputationnelle déjà codé. Rapid funded: buffer 2 100/3 100/4 600 $, minimum 500 $, drawdown EOD trailing, pas de consistance. D conditions −3 et trailing −2 si Rapid retenu comme programme principal le moins restrictif; comparer Pro, Builder et autres offres.

**Simulation / statut:** 67 scénario Rapid, pas une note globale validée.

### The5ers — 71/100 (plafond 98)

Codes actuels: B2 −8, B3 −5, B6 −5, D plafond −4, D conditions −3, E_HARSH −2.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/the5ers/8f4694d93b47.txt) ; [source officielle](https://the5ers.com/terms-and-conditions/).

Critiques publiques/disparagement et divulgation: perte des gains acquis; plafond modifiable et paiements fractionnés de 10K/semaine; entretien sous cinq jours ouvrés faute de quoi retraits refusés/comptes annulés. Ces familles sont déjà codées. Vérifier si fractionnement est réellement D plafond plutôt qu'un délai, et ne pas mélanger futures, High Stakes, Bootcamp.

**Simulation / statut:** 71 non revalidé.

### OneUp Trader — 70/100 (plafond 75)

Codes actuels: B7 −5.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/oneup-trader/36b3687726af.txt) ; [source officielle](https://help.oneuptrader.com/article/372-funded-trader-rules).

Règles partenaire funded: volume hebdomadaire ≥50 % de la moyenne évaluation; PnL positif tous les 15 jours pendant 90 jours; durée minimale 10 secondes; trailing; seuil de retrait selon compte et minimum 1 000 $. D conditions −3, trailing −2. Partage 100 % des premiers 10K puis 90 %: vérifier si D réduction de split s'applique à ce palier. CGU site seules ne suffisent pas à B3.

**Simulation / statut:** 65 scénario D −5; split à arbitrer.

### Orion Funded — 70/100 (plafond 75)

Codes actuels: B6 −5.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/orion-funded/6fa6c7113833.txt) ; [source officielle](https://storage.googleapis.com/orn-core-fe-media-prod/terms_doc/GTCs%20%28V3.01%29%20EN.pdf).

PDF V3.01 du 16 septembre: §8.1–8.4 accès au contrat funded après réussite/KYC, B7 −5 si indisponible avant achat. §9.3.2 taille/risque substantiellement supérieurs et appréciation raisonnable, §10.5.1 sanctions jusqu'à annulation de récompenses via tiers; §17.3 réclamation écrite sous 30 jours: B2A −4 si recours couvre ces sanctions, sinon B2 −8. §20.2 protège explicitement avis sincères de bonne foi; §19 confidentialité large et retenue/annulation: requalifier B6 au lieu de l'ajouter aveuglément. §18 préavis et droit de refus: non suffisant seul pour B3. Standard/Swing/Select sans best-day; Nova/Zero ne doivent pas pénaliser tous les produits.

**Simulation / statut:** 61 scénario B7+B2A si B6 maintenu; 66 si B6 retiré; non final.

### FXIFY — 69/100 (plafond 85)

Codes actuels: B2 −8, B3 −5, D conditions −3.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/fxify/1c14de7525d4.txt) ; [source officielle](https://fxify.com/).

Comparer convention funded archivée et GTC 2024 (391757697244.txt), version actuelle au checkout et modifications applicables au compte actif. Instant Lite 20 % et restrictions news ne sont pas automatiquement les règles du programme principal. Aucun nouveau code sans appariement de version.

**Simulation / statut:** 69 non revalidé.

### Elite Trader Funding — 68/100 (plafond 95)

Codes actuels: B2 −8, B3 −5, B6 −5, D plafond −4, D split −2, TPR −3.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/elite-trader-funding/2d6a546d79b0.txt) ; [source officielle](https://elitetraderfunding.app/terms-of-service).

Interview jusqu'à 60 minutes, licence perpétuelle image/voix, refus pouvant entraîner refus de paiement sur les comptes et clôture: E_HARSH −2 à retenir si distinct du B2 actuel. Le passage sur le trading émotionnel ne permet pas à lui seul un refus de Reward: sauvegarde à conserver. Solde restant live ≠ nécessairement récompense acquise.

**Simulation / statut:** 66 scénario E_HARSH −2.

### Alpha Capital Group — 67/100 (plafond 95)

Codes actuels: B2 −8, B3 −5, B6 −5, TPW −10.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/alpha-capital-group/20df31fee094.txt) ; [source officielle](https://alphacapitalgroup.uk/terms-and-conditions).

§2.2 appréciation des performance fees à confronter à §2.6 avant B1; ne pas assimiler toute discrétion à annulation des gains acquis. Sur Pro, profits des trades de weekend retirés: B5 exige preuve que les pertes restent; Swing autorise weekend. Réexaminer programme de référence et notice Trustpilot exacte.

**Simulation / statut:** 67 non revalidé.

### BluSky Trading — 67/100 (plafond 85)

Codes actuels: B2 −8, D plafond −4, D conditions −3, D fin −3.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/blusky-trading/34a3d6317a8f.txt) ; [source officielle](https://help.blusky.pro/en/articles/12069208-ethical-trading-conduct-policy-blusky-trading-company).

Politique éthique (dc3c4000cd7b.txt): menace d'avis négatif pour obtenir un avantage ≠ critique sincère. Partage public des communications et atmosphère négative peuvent affecter le payout; B6 à examiner seulement si critique ordinaire sanctionnable, sans double comptage B2.

**Simulation / statut:** 67 non revalidé.

### Bulenox — 67/100 (plafond 75)

Codes actuels: B2 −8.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/bulenox/ea1871f5e311.txt) ; [source officielle](https://bulenox.com/help-center/master).

Master agreement envoyé après réussite: B7 −5 si modèle intégral indisponible avant achat. Règles profils d'un même foyer et refus de retrait déjà couvertes selon portée B2. Master, Fast Track, Momentum distincts; comparer consistance et plafonds avant D. Accord Master signé reste à obtenir.

**Simulation / statut:** 62 scénario B7 si absence d'accès préalable confirmée.

### RebelsFunding — 67/100 (plafond 75)

Codes actuels: B2 −8.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/rebelsfunding/82a9757377df.txt) ; [source officielle](https://www.rebelsfunding.com/terms-and-conditions/).

§17.6 protège explicitement les droits acquis et les avantages acceptés contre la réduction rétroactive: ne pas ajouter B3. RCF Account Contract séparé, disponibilité avant achat à confirmer. Risque quantifié et minimum de durée à confronter au B2 actuel; revoir portée exacte du pouvoir de refus. Minimum 50 $ seul ne suffit pas à D majeur.

**Simulation / statut:** 67 non revalidé.

### UProfit — 67/100 (plafond 75)

Codes actuels: TPR −6, E_HARSH −2.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/uprofit-trader/1ea561ea7fd0.txt) ; [source officielle](https://uprofit.com/help/uprofit-one-payout-policy-49177986296468).

§7 VPN avec confiscation déjà sanctionné; §10.2(f) stratégies non viables et §10.3 annulation avantages: B2 −8 si lien démontré avec récompenses de trading. ONE: cinq jours ≥150 $, plafonds 50 %/2K, six retraits maximum; D plafond −4 et conditions −3. DAY/Flex SafetyNet à comparer. §11 passage live: ne pas compter automatiquement comme fin définitive de compte.

**Simulation / statut:** 60 scénario ONE; 52 si B2 confirmé, pas de note globale.

### Trade The Pool — 65/100 (plafond 75)

Codes actuels: B6 −5, B7 −5.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/trade-the-pool/889263206656.txt) ; [source officielle](https://tradethepool.com/program-terms/).

MAX 30 % consistance en évaluation, FLEX 50 % funded et trois jours qualifiants 0,5 %, Edge 40 %. D conditions ou consistance à calculer sur le programme principal le moins restrictif seulement. Restrictions 30 s/0,10 $ et minimum de retrait 300 $: impact et asymétrie B5 à démontrer.

**Simulation / statut:** 65 non revalidé.

### Hash Hedge — 64/100 (plafond 75)

Codes actuels: B2A −4, D plafond −4, D conditions −3.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/hash-hedge/8ed6727863d2.txt) ; [source officielle](https://hashhedge.com/).

§16 hold et procédure de contestation; conditions commerciales (1be9f6a607a7.txt) limitent confiscation aux violations confirmées pertinentes; erreur KYC rectifiable ne suffit pas; obligations acquises survivent sous conditions. Règles du plan acceptées à l'achat: pas de B3 sur modification générale. Comparer plans.

**Simulation / statut:** 64 non revalidé.

### Lux Trading Firm — 64/100 (plafond 75)

Codes actuels: B2 −8, TPR −3.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/lux-trading-firm/8e83a7899628.txt) ; [source officielle](https://luxtradingfirm.com/trading-rules/).

§14.3.6 discretion du risk manager déjà dans la famille B2; §16.4 Instant: cible et revue de risque avant retrait, 80 %. Ne pas extrapoler à la gamme principale. Réconcilier les règles archivées (5b0e6322f0f8.txt) et la version publique des CGU; un lien CGU renvoie 404.

**Simulation / statut:** 64 non revalidé.

### WSFunded — 64/100 (plafond 75)

Codes actuels: B2 −8, D conditions −3.

Sources: [archive principale](https://github.com/adriengeyer02-bot/propradar/blob/agent/terms-archive/terms-archive/wsfunded/b29312495809.txt) ; [source officielle](https://wsfunded.com/en/terms-conditions).

Pouvoir d'annulation large, mais perte de gains acquis non démontrée pour toute annulation: B1 non acquis. Dashboard softbreach (2304459b0822.txt): défaut procédural stop-loss à deux minutes pouvant fermer compte financé/annuler retrait; E_HARSH −2 si applicable au programme principal et distinct du B2. Profits de news: B5 seulement si pertes explicitement conservées.

**Simulation / statut:** 62 scénario E_HARSH −2.

## Liens complémentaires pour la vérification
- Tradeify: [Select Flex/Daily](https://intercom.help/tradeify/en/articles/12853966-select-flex-and-select-daily-payout-policies), [règles trading](https://intercom.help/tradeify/en/articles/12268167-essential-trading-rules-overview).
- TradeDay: [Fast Pass](https://tradeday.freshdesk.com/en/support/solutions/articles/103000404096-fast-pass-funded-sim-payout-policy), [retraits et drawdown](https://tradeday.freshdesk.com/en/support/solutions/articles/103000250682-funded-accounts-withdrawals-and-the-impact-of-drawdowns).
- Equity Edge: [règles](https://equityedge.io/trading-rules/trading-rules-and-guidelines), [payout](https://equityedge.io/funded-traders/payout-process).
- MyFundedFutures: [Rapid EOD](https://help.myfundedfutures.com/en/articles/18337038-rapid-eod-with-dll-a-detailed-look).
- OneUp: [profits](https://help.oneuptrader.com/article/376-profit-info).
- WSFunded: [softbreach](https://faq.wsfunded.com/fr/articles/13609936-nouvelle-mise-a-jour-du-dashboard-softbreach-suspensions-et-breach).
- UProfit: [CGU](https://uprofit.com/terms-and-conditions).
- Funding Pips: [1-Step Flex](https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex).
- Topstep: [activation XFA](https://help.topstep.com/en/articles/8284217-express-funded-account-activation).

## Publication et stabilité
Le classement doit porter une date de référence, un barème versionné, un journal des changements et un cycle de revue groupé (mensuel proposé). Exception pour fermeture, fraude/avertissement sourcé ou changement contractuel matériel. Le classement ne peut être garanti immuable: sa stabilité doit provenir d'une méthode constante, non d'un gel des risques réels.
