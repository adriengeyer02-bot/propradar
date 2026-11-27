# Revue des plafonds du barème C — ancienneté, preuves de paiement, Trustpilot

**Date :** 27 novembre 2026 · **Auteur :** Claude (revue éditoriale, lecture seule)
**Base :** `origin/main` 3ca6fd4d, après la fusion de la PR #297 (contre-audit ChatGPT déjà appliqué en production : FTMO 80, Tradeify 71, TradeDay 75, Equity Edge 68, OneUp 65, WSFunded 62).
**Périmètre :** les 20 premières sociétés du classement C actuel, plus les ex aequo à 64 (Hash Hedge, Lux), WSFunded (sorti du top 20 avec la PR #297), Earn2Trade et Blue Guardian (hausses suspendues).
**Ce document ne modifie rien.** Aucun score, aucun fichier de données, ni la PR #296, ni les fiches contractuelles de ChatGPT. Les colonnes « score simulé » appliquent seulement l'écart de plafond (score = plafond − pénalités) aux pénalités actuellement en production ; elles changeront quand les pénalités contractuelles de la PR #296 seront intégrées. Un seul recalcul final est prévu.

La méthode du barème C n'est pas modifiée. Ce rapport applique ses critères tels qu'écrits dans `SCORING.md` (« Scale C ») :

| Plafond | Condition stricte |
|---|---|
| 55 | moins d'un an |
| 65 | 1 à 2 ans |
| 75 | 2 ans ou plus |
| 85 | 3 ans **et** une preuve de paiement |
| 95 | 5 ans **et** une preuve |
| 98 | 8 ans **et** une très grande preuve |

Preuve = traçage on-chain d'au moins 10 M$, **ou** statistiques de paiement publiées avec leur méthode, **ou** note Trustpilot affichée ≥ 4,0 sur ≥ 5 000 avis. Très grande preuve = traçage ≥ 100 M$ ou Trustpilot ≥ 4,5 sur ≥ 20 000 avis. Une note Trustpilot retirée ne compte pas.

**Date de référence des âges : 25 novembre 2026** (date d'approbation du barème). « Âge » désigne ici l'**activité de prop trading** (premières évaluations vendues), pas la maison mère, pas une autre marque du fondateur, et pas la seule immatriculation d'une coquille.

---

## 1. Synthèse

| # | Société | Score C actuel | Plafond actuel | Plafond justifié | Score simulé | Écart | Point décisif |
|---|---|---|---|---|---|---|---|
| 1 | FTMO | 80 | 98 | **98** | 80 | 0 | Activité depuis 2015 ; Trustpilot 4,8 / 58 206 |
| 2 | Take Profit Trader | 80 | 95 | **85** | 70 | **−10** | Activité lancée déc. 2021 / janv. 2022 : moins de 5 ans |
| 3 | Funding Pips | 75 | 85 | 85 | 75 | 0 | Lancée nov. 2022 ; < 8 ans, donc pas de 98 |
| 4 | TradeDay | 75 | 95 | 95 | 75 | 0 | Fondée 2020, traçage 16,4 M$ |
| 5 | Topstep | 73 | 95 | **95 ou 75** | 73 ou 53 | 0 ou **−20** | Preuve « stats » codée en dur ; décision du propriétaire |
| 6 | MyFundedFutures | 72 | 85 | 85 (fragile) | 72 | 0 | 3 ans atteints de justesse (sept.–nov. 2023) |
| 7 | The5ers | 71 | 98 | 98 | 71 | 0 | Fondée 2016 ; traçage 102 M$ ; Trustpilot 4,7 / 45 155 |
| 8 | Tradeify | 71 | 85 | **75** | 61 | **−10** | Lancement 2024 selon ses propres fondateurs |
| 9 | Orion Funded | 70 | 75 | 75 | 70 | 0 | Aucune preuve au seuil |
| 10 | FXIFY | 69 | 85 | 85 | 69 | 0 | Lancée avril 2023 ; la maison mère FXPIG (2010) ne compte pas |
| 11 | Equity Edge | 68 | 75 | 75 | 68 | 0 | Lancée déc. 2023 ; pas de preuve |
| 12 | Alpha Capital Group | 67 | 95 | **95 ou 85** | 67 ou 57 | 0 ou **−10** | Entité au 2 nov. 2021 ; activité avant le 25 nov. 2021 non prouvée |
| 13 | BluSky | 67 | 85 | 85 | 67 | 0 | 2022 ; traçage 12,98 M$ |
| 14 | Bulenox | 67 | 75 | 75 | 67 | 0 | Pas de preuve au seuil |
| 15 | RebelsFunding | 67 | 75 | 75 | 67 | 0 | Pas de preuve au seuil |
| 16 | UProfit Trader | 67 | 75 | 75 | 67 | 0 | Trustpilot 3,3 : ne compte pas comme preuve |
| 17 | Elite Trader Funding | 66 | 95 | **85** | 56 | **−10** | Lancée le 14 février 2022 : moins de 5 ans |
| 18 | FunderPro | 65 | 75 | 75 | 65 | 0 | Trustpilot retiré ; pas de preuve |
| 19 | OneUp Trader | 65 | 75 | 75 | 65 | 0 | Trustpilot 2 837 avis, sous 5 000 |
| 20 | Trade The Pool | 65 | 75 | 75 | 65 | 0 | Même entité que The5ers : rien d'emprunté |
| 21 | Hash Hedge | 64 | 75 | **75 ou 65** | 64 ou 54 | 0 ou **−10** | Seule source pour 2023 : la société elle-même |
| 22 | Lux Trading Firm | 64 | 75 | 75 | 64 | 0 | Pas de preuve au seuil |
| — | WSFunded | 62 | 75 | 75 | 62 | 0 | Éligible à 85 après décembre 2026 (Trustpilot 4,3 / 5 232) |
| — | Earn2Trade | 60 (gelé) | hors C | **95** | n.c. | — | Sept. 2016 ; Trustpilot 4,5 / 5 121 (marge faible) |
| — | Blue Guardian | 60 (gelé) | hors C | **85** | n.c. | — | Activité 2021–2022, pas 2019 ; Trustpilot retiré (−10) |

**Six plafonds sont contestables, dont trois nets :**
- **Take Profit Trader**, **Tradeify** et **Elite Trader Funding** : l'activité est plus récente que l'année enregistrée dans `scale-c.json`. Chacun perdrait 10 points.
- **Topstep**, **Alpha Capital Group** et **Hash Hedge** dépendent d'une décision ou d'une preuve que je n'ai pas pu obtenir.

Toutes ces baisses sont des **changements sensibles** au sens de la règle 6 de CLAUDE.md (baisse de 5 points ou plus) : ce rapport ne les applique pas.

**Aucun plafond ne monte**, sauf Earn2Trade (95) si son gel est levé. Blue Guardian, si son gel est levé, est plafonnée à 85 et non à 95 : l'âge de sa maison mère ne compte pas.

**Classement simulé, en ne retenant que les plafonds certains** (Take Profit Trader, Tradeify et Elite Trader Funding corrigés ; Topstep, ACG et Hash Hedge laissés en l'état) :

| Rang | Société | Score |
|---|---|---|
| 1 | FTMO | 80 |
| 2 | Funding Pips | 75 |
| 3 | TradeDay | 75 |
| 4 | Topstep | 73 |
| 5 | MyFundedFutures | 72 |
| 6 | The5ers | 71 |
| 7 | Take Profit Trader | 70 |
| 8 | Orion Funded | 70 |
| 9 | FXIFY | 69 |
| 10 | Equity Edge | 68 |
| 11 | Alpha Capital Group | 67 |
| 12 | BluSky | 67 |
| 13 | Bulenox | 67 |
| 14 | RebelsFunding | 67 |
| 15 | UProfit Trader | 67 |
| 16 | FunderPro | 65 |
| 17 | OneUp Trader | 65 |
| 18 | Trade The Pool | 65 |
| 19 | Hash Hedge | 64 |
| 20 | Lux Trading Firm | 64 |

Ce classement est indicatif : les pénalités de la PR #296 ne sont pas encore intégrées.

---

## 2. Comment l'âge est compté aujourd'hui, et pourquoi cela compte

`scripts/score-proposal-c.py` calcule `age = 2026 - founded` sur l'**année seule**. Une société fondée en décembre 2021 a donc « 5 ans » dès le 1er janvier 2026, alors qu'elle n'a pas encore 5 ans le 25 novembre 2026.

Ce rapport applique la lecture stricte demandée : la date de lancement de l'activité, au mois près, comparée au 25 novembre 2026.

- Avec la convention de l'année seule, **ACG** (fondée en 2021) garde 95 et **Take Profit Trader** (2021) aussi.
- **Elite Trader Funding** et **Tradeify** perdent leur plafond sous les deux conventions : leur année de fondation enregistrée est elle-même inexacte (2022 au lieu de 2021, 2024 au lieu de 2023).

**Décision 1 (propriétaire) :** faut-il compter l'âge au mois près (lecture stricte) ou garder l'année civile ? Ce n'est pas un changement de méthode, mais cela tranche quatre cas. Je recommande la date au mois, avec une source pour chaque date, stockée dans un champ `foundedOn` (`AAAA-MM`) à côté de `founded`.

---

## 3. Fiches par société

Les notes Trustpilot ont été relevées le 27 novembre 2026 sur les pages publiques. La date de création du profil Trustpilot se lit dans les 8 premiers caractères hexadécimaux de son identifiant (un horodatage Unix). C'est un signal d'âge **secondaire** : il prouve que le profil existait, pas que l'activité avait commencé.

Payout Junction (`https://payoutjunction.com/alltime`, lu le 27/11) trace depuis octobre 2023 les paiements partis de portefeuilles qu'il attribue lui-même à chaque société, chacun rattaché à une transaction. Les montants déclarés par les sociétés n'y sont pas mêlés. Les limites de cette source sont décrites en section 4.

### 3.1 FTMO — 98 → 98 (aucun changement)
- **Âge de l'activité.** La plateforme Získejúčet.cz a été fondée par O. Šuffner et M. Vašíček (2014 selon les biographies OANDA, 2015 selon la page FTMO Group) ; elle est devenue FTMO en 2017. L'activité a donc environ 11 ans, et 8 ans au minimum même en comptant depuis le changement de nom. Le rachat d'OANDA (2025) n'entre pas en ligne de compte. Sources : https://ftmo.com/en/ftmo-group/ · https://www.oanda.com/group/about-us/leadership-team/otakar-suffner
- **Preuves de paiement.**
  - Indépendante : Trustpilot **4,8 / 58 206**, sans avertissement (https://www.trustpilot.com/review/ftmo.com). C'est une très grande preuve.
  - Déclarative : « 650 M$ cumulés » (Finance Magnates, d'après FTMO). Non comptée.
- **Avertissement officiel.** RBI (Inde), Alert List, entrée 13, `ftmo.com/en`. FTMO y figure au moins depuis la mise à jour du 24 novembre 2023 ; la pénalité REGWARN −5 a été ajoutée par la PR #297. Ce n'est pas un constat de défaut de paiement : la liste vise l'absence d'autorisation forex en Inde. Source : https://rbi.org.in/scripts/Bs_viewcontent.aspx?Id=4235
- **Remarque.** `scale-c.json` affiche 56 103 avis ; le chiffre actuel est 58 206, sans effet sur le palier.

### 3.2 Take Profit Trader — 95 → **85** (score simulé 70, −10)
- **Âge de l'entité.** TakeProfitTrader LLC est une société de Floride créée en 2021 (PropFirmMatch et h2tfunding indiquent « Date Created 03/2021 »).
- **Âge de l'activité.** L'article sponsorisé par la société sur Finance Magnates (17/09/2026) écrit que le PDG a fondé la société en **décembre 2021**. D'autres sources donnent janvier 2022. Le profil Trustpilot date de mai 2022. Le même article dit « près de cinq ans ». L'activité a donc **4 ans et 11 mois au plus** au 25/11/2026. Source : https://www.financemagnates.com/thought-leadership/how-james-sixsmith-built-take-profit-trader-into-a-firm-with-over-90000-active-traders/
- **Preuves de paiement.**
  - Indépendante : Trustpilot **4,4 / 11 424**, sans avertissement (https://www.trustpilot.com/review/takeprofittrader.com). C'est une preuve, mais pas une très grande preuve.
  - Pas de traçage on-chain trouvé.
- **Plafond justifié.** 85 jusqu'aux cinq ans de l'activité (décembre 2021 – janvier 2022 + 5 ans), puis 95. Si l'on compte depuis la création de la LLC (mars 2021), 95 est justifié dès aujourd'hui. Lier ce cas à la décision 1.

### 3.3 Funding Pips — 85 → 85
- **Âge de l'activité.** Lancée en novembre 2022 (communiqué de février 2023). Plus de 3 ans, moins de 5.
- **Preuves de paiement.**
  - Indépendantes : traçage Payout Junction **160,3 M$** ; Trustpilot **4,5 / 76 809** (https://www.trustpilot.com/review/fundingpips.com). Les deux seraient de très grandes preuves, mais la société a moins de 8 ans.
  - `scale-c.json` affiche 4,4 / 72 707 ; sans effet.
- **Plafond justifié.** 85. Il passera à 95 en novembre 2027.

### 3.4 TradeDay — 95 → 95
- **Âge de l'activité.** La chronologie de la société indique une fondation en 2020, puis les premiers comptes financés et les premiers paiements en 2021. TradeDay LLC est immatriculée en Illinois en 2020. Le profil Trustpilot date d'août 2020. L'activité a plus de 5 ans.
- **Preuves de paiement.**
  - Indépendante : traçage Payout Junction **16,4 M$**, au-dessus du seuil de 10 M$.
  - Trustpilot **4,6 / 1 457** (https://www.trustpilot.com/review/tradeday.com), sous les 5 000 avis.
- **Plafond justifié.** 95, sans changement.

### 3.5 Topstep — 95 → **décision du propriétaire** (95 ou 75 ; score simulé 73 ou 53)
- **Âge.** Fondée en 2012 à Chicago, selon la société (https://www.topstep.com/blog/is-topstep-legit). Plus de 8 ans.
- **Preuves de paiement.**
  - Déclaratif : « 1,4 Md$+ versés » (renvoi « Total paid all time »), « 7 000+ par semaine » (« based on internal data of YTD average »), « 99,26 % d'approbation ». Ses propres pages donnent aussi **92,26 %** pour la même métrique (https://topstep.com/topstep-prop/). Aucune méthode n'est publiée pour ces montants.
  - Statistiques publiées par cohorte : 16,8 % des Trading Combines réussis en 2025 et 0,71 % des comptes Express passés en live, avec dénominateurs, selon des sources secondaires qui citent la publication 2025 de Topstep. Je n'ai pas pu lire cette publication directement. Je ne peux donc pas vérifier qu'elle contient des **statistiques de paiement** (et non seulement des taux de réussite) avec leur méthode.
  - Traçage tiers : PipBack annonce 203,2 M$ sur 90 jours (https://pipback.com/leaderboard/payouts?period=90). Les paiements de Topstep passent par Aeropay, Wise, ACH ou virement : ce n'est pas un traçage on-chain, et la méthode de PipBack n'est pas décrite.
  - Trustpilot **3,7 / 15 163**, sous 4,0 : ne compte pas comme preuve. L'étiquette « may be associated with high-risk investments » est une catégorie Trustpilot, pas un manquement aux règles. La pénalité TPR −3 est correcte.
- **Constat.** `score-proposal-c.py` ajoute en dur `statistiques publiées` pour Topstep. La lecture stricte ne trouve pas de statistique de paiement accompagnée de sa méthode.
- **Décision 2 (propriétaire).** Si la publication annuelle de cohortes contient des taux de paiement avec leurs dénominateurs, le plafond de 95 tient, et la preuve doit citer cette page plutôt que le code. Sinon, le plafond strict est 75, soit −20, la plus forte baisse du rapport. Par cohérence, la même règle s'appliquerait aux autres sociétés qui publient des cohortes : Take Profit Trader, Tradeify, MyFundedFutures, Earn2Trade. Cela ne change le palier d'aucune d'entre elles, car leur plafond dépend déjà de l'âge ou de Trustpilot.

### 3.6 MyFundedFutures — 85 → 85 (fragile)
- **Âge de l'activité.** Les sources divergent : septembre 2023 (Benzinga), octobre 2023 (coincodecap), novembre 2023 (PropFirmMatch). Le profil Trustpilot date du 4 octobre 2023. Trois ans sont atteints si le lancement date d'octobre 2023 ou avant, ce que le profil Trustpilot corrobore. My Funded FX, autre marque du même fondateur (juin 2022), ne compte pas.
- **Preuves de paiement.**
  - Indépendantes : traçage Payout Junction **276,5 M$** ; Trustpilot **4,9 / 23 243** (https://www.trustpilot.com/review/myfundedfutures.com).
  - Déclaratif : « 300 M$+ », non compté.
- **Plafond justifié.** 85. Il passera à 95 en septembre–novembre 2028.

### 3.7 The5ers — 98 → 98
- **Âge de l'activité.** Fondée en 2016 par Gil Ben Hur (« 10 Years Active, Founded 2016 », https://the5ers.com/about-the5ers/), ce que confirment des articles de presse. Plus de 8 ans.
- **Preuves de paiement.** Traçage Payout Junction **102,0 M$**, au-dessus du seuil de très grande preuve de 100 M$, mais de peu ; Trustpilot **4,7 / 45 155** (https://www.trustpilot.com/review/the5ers.com). Le 98 tient même sans le traçage.
- **Risque de double comptage.** Voir section 4.3 (entité partagée avec Trade The Pool).

### 3.8 Tradeify — 85 → **75** (score simulé 61, −10)
- **Âge de l'activité.**
  - Dans l'entretien des cofondateurs à Finance Magnates (07/07/2026), Brett Simberkoff dit avoir cofondé Tradeify avec Vinan Mistry **en 2024**, après plusieurs faux départs. https://www.financemagnates.com/executives/tradeify-co-founders-difficult-to-enter-futures-prop-subscription-ditch-barely-moved-revenue/
  - Le profil Trustpilot date de septembre 2024.
  - Le dépôt de marque USPTO (juin 2025) revendique un premier usage au 25 mai 2022, et certains annuaires donnent 2021. Ce sont des usages de la marque, pas des preuves d'évaluations vendues.
  - L'activité a donc moins de 3 ans.
- **Preuves de paiement.**
  - Indépendante : traçage Payout Junction 474,2 M$ au total (Futures 472,99 M$ + FX 1,17 M$) ; Trustpilot **4,6 / 7 829** (https://www.trustpilot.com/review/tradeify.co).
  - Ces preuves sont solides, mais le barème exige 3 ans pour le plafond de 85.
  - Voir section 4.4 : Payout Junction fait la promotion de Tradeify avec un code affilié.
- **Plafond justifié.** 75 tant que l'activité n'a pas 3 ans (2027), sauf preuve d'évaluations vendues avant le 25 novembre 2023. `founded: 2023` dans `scale-c.json` devrait être 2024.

### 3.9 Orion Funded — 75 → 75
- **Âge.** Lancée en 2023 (PropFirmMatch : septembre 2023) ; profil Trustpilot de janvier 2024. `scale-c.json` indique 2024, sans effet sur le score.
- **Preuves de paiement.** Traçage **4,6 M$**, sous 10 M$ ; Trustpilot **4,6 / 2 391** (https://www.trustpilot.com/review/orionfunded.com), sous 5 000 avis. Pas de preuve au seuil.

### 3.10 FXIFY — 85 → 85
- **Âge de l'activité.** Lancée en avril 2023 (Benzinga ; deuxième anniversaire célébré en mai 2025). Le courtier FXPIG, maison mère fondée en 2010, **ne compte pas**.
- **Preuves de paiement.** Traçage **36,1 M$** ; Trustpilot **4,3 / 6 741** (https://www.trustpilot.com/review/fxify.com). Le montant déclaré de « 40 M$ » n'est pas compté.

### 3.11 Equity Edge — 75 → 75
- **Âge.** Lancée en décembre 2023. Entités : Equity Edge Analytics Ltd (UK 15263705) et Equity Edge Ltd (Sainte-Lucie, 2025-00306).
- **Preuves de paiement.**
  - Déclaratif : « 10 M$+ » (article de thought leadership sponsorisé sur Finance Magnates) et « 1 M$+ » (site de la société). Ces deux chiffres se contredisent et ne comptent pas.
  - Trustpilot **4,1 / 2 806** (https://www.trustpilot.com/review/equityedge.io).
- **Mauvaise entité à éviter.** L'avertissement de la FCA du 6 mars 2026 vise « Equity Edge Assets » (`equityedgeassets.com`), une autre entité. Il ne doit pas être attribué à Equity Edge. Il existe aussi un profil Trustpilot distinct, `equityedge.co.uk`, qu'il ne faut pas confondre avec celui de la société.

### 3.12 Alpha Capital Group — 95 → **95 ou 85** (score simulé 67 ou 57)
- **Âge de l'entité.** Alpha Capital Group Ltd (Companies House 13719951) a été immatriculée le **2 novembre 2021**, soit 5 ans et 23 jours au 25 novembre 2026. https://find-and-update.company-information.service.gov.uk/company/13719951
- **Âge de l'activité.** Je n'ai trouvé aucune preuve d'évaluations vendues avant le 25 novembre 2021. Le profil Trustpilot date de février 2022. Un lancement à la fin de 2021 est plausible, mais il n'est pas démontré.
- **Preuves de paiement.**
  - Indépendante : traçage Payout Junction **74,9 M$**.
  - Trustpilot **retiré** (« rating is unavailable due to a breach of our guidelines » ; « We've removed a number of fake reviews »), 22 363 avis (https://www.trustpilot.com/review/alphacapitalgroup.uk). La pénalité TPW −10 est correcte.
  - Déclaratif : « 120 M$ » au niveau du groupe, qui inclut probablement Alpha Futures. Non compté.
- **Mauvaise entité à éviter.** La SFC de Hong Kong (Alert List, 13 juillet 2026, alerte 3483 ; IOSCO I-SCAN 55023) vise « Alpha Capital Group Limited », site `alphacapital-group.com`. Le seul site officiel d'ACG est `alphacapitalgroup.uk`, selon sa page des canaux officiels. **Cette alerte ne doit pas être attribuée à ACG** (aucune pénalité REGWARN) sans élément reliant les deux. Lien direct à rattacher avant toute mention publique : je l'ai identifiée par recherche sans pouvoir ouvrir la page.
- **Décision 3 (propriétaire).** 95 si une preuve d'activité antérieure au 25/11/2021 est apportée (archive du site, premier paiement daté, communiqué), ou si l'on garde la convention de l'année seule. Sinon 85 (−10).

### 3.13 BluSky — 85 → 85
- **Âge.** Fondée en 2022 à St. Petersburg (Floride) ; profil Trustpilot d'octobre 2022.
- **Preuves de paiement.** Traçage « BluSky.Pro » **12,98 M$**, qui correspond au domaine `blusky.pro` ; Trustpilot **4,6 / 1 009** (https://www.trustpilot.com/review/blusky.pro). Le traçage est à 3 M$ du seuil.

### 3.14 Bulenox — 75 → 75
- **Âge.** 2020 selon la fiche ; profil Trustpilot de mai 2021. Plus de 5 ans au minimum. Pas d'enquête approfondie : l'âge ne peut pas modifier le palier sans preuve.
- **Preuves de paiement.** Trustpilot **4,6 / 1 843** (https://www.trustpilot.com/review/bulenox.com) ; pas de traçage. Pas de preuve au seuil.

### 3.15 RebelsFunding — 75 → 75
- **Âge.** 2023 ; profil Trustpilot de mars 2023, donc plus de 2 ans.
- **Preuves de paiement.** Trustpilot **4,3 / 2 958** (https://www.trustpilot.com/review/rebelsfunding.com). Pas de preuve au seuil.

### 3.16 UProfit Trader — 75 → 75
- **Âge.** 2019 selon la fiche ; profil Trustpilot de juin 2022.
- **Preuves de paiement.** Trustpilot **3,3 / 6 558** (https://www.trustpilot.com/review/www.uprofit.com). La note est sous 4,0, donc ce n'est pas une preuve. La pénalité TPR −6 est correcte (la note était de 3,4, dans la même tranche).

### 3.17 Elite Trader Funding — 95 → **85** (score simulé 56, −10)
- **Âge de l'activité.** Lancée le **14 février 2022**, selon le communiqué EIN Presswire de la société, Tickblaze (« Live Since Feb 2022 ») et plusieurs annuaires. Le profil Trustpilot date de février 2022. L'activité a 4 ans et 9 mois. `founded: 2021` dans `scale-c.json` est inexact. Sources : https://www.einpresswire.com/article/644404058/elite-trader-funding-llc-revolutionizes-the-trading-experience-for-traders · https://tickblaze.com/etf/
- **Preuves de paiement.**
  - Indépendante : traçage Payout Junction **10,02 M$**, au seuil à 23 000 $ près.
  - Déclaratif : « 13 M$+ » (Tickblaze, partenaire commercial). Non compté.
  - Trustpilot **3,7 / 1 180** (https://www.trustpilot.com/review/elitetraderfunding.com) ; la pénalité TPR −3 est correcte.
- **Plafond justifié.** 85 jusqu'en février 2027. Si le traçage repasse sous 10 M$ (réattribution de portefeuilles), le plafond tomberait à 75.

### 3.18 FunderPro (affilié) — 75 → 75
- **Âge.** Lancée en 2023 (cTrader : 1er mars 2023 ; TradingFinder : mai 2023). FunderPro Ltd, Malte, C 104558. Plus de 2 ans.
- **Preuves de paiement.** Trustpilot **retiré** pour manquement aux règles (https://www.trustpilot.com/review/funderpro.com) : ce n'est pas une preuve, et TPW −10 est appliqué. Pas de traçage trouvé. Le plafond de 75 tient. Affiliation sans incidence.

### 3.19 OneUp Trader — 75 → 75
- **Âge.** 2017 ; profil Trustpilot de juin 2019.
- **Preuves de paiement.** Trustpilot **4,7 / 2 837** (https://www.trustpilot.com/review/oneuptrader.com), sous 5 000 avis. Pas de preuve.

### 3.20 Trade The Pool — 75 → 75
- **Âge.** 2022 ; profil Trustpilot d'août 2022.
- **Preuves de paiement.** Trustpilot **4,5 / 1 023** (https://www.trustpilot.com/review/tradethepool.com). Pas de preuve propre. Aucune preuve de The5ers ne lui est créditée, et c'est correct (section 4.3).

### 3.21 Hash Hedge — 75 → **75 ou 65** (score simulé 64 ou 54)
- **Âge.** La seule source pour une fondation « en 2023 » est la société elle-même, reprise par des annuaires. Le profil Trustpilot date de mars 2025. Entité : Empower Academy Ltd (Ras Al Khaimah, Émirats arabes unis). Pour le plafond de 75, il faut une activité antérieure au 25/11/2024. Je n'en ai pas de preuve indépendante.
- **Preuves de paiement.** « 11 M$ versés » apparaît seulement dans les réponses de la société sur Trustpilot (déclaratif, non compté). Trustpilot **4,4 / 124** (https://www.trustpilot.com/review/hashhedge.com).
- **Décision 4 (propriétaire).** Faut-il accepter la date déclarée par la société, ou exiger une trace indépendante (archive web, registre) ? Sans trace indépendante, le plafond est 65 (−10).

### 3.22 Lux Trading Firm — 75 → 75
- **Âge.** UK 13160991 (2021) ; profil Trustpilot de janvier 2021.
- **Preuves de paiement.** Trustpilot **3,7 / 626** (https://www.trustpilot.com/review/luxtradingfirm.com) ; TPR −3 correct. Pas de preuve au seuil.

### 3.23 WSFunded — 75 → 75 (hors top 20 depuis la PR #297)
- **Âge.** Fin 2023 : WSF Technology FZCO immatriculée fin 2023, lancement début 2024. Profil Trustpilot de novembre 2023.
- **Preuves de paiement.** Trustpilot **4,3 / 5 232** (https://www.trustpilot.com/review/wsfunded.com). Le seuil des 5 000 avis est franchi depuis le dernier relevé. Cela ne change rien tant que l'activité n'a pas 3 ans ; l'éligibilité à 85 viendra entre décembre 2026 et début 2027.

### 3.24 Earn2Trade — gelé à 60 → plafond justifié **95** si le gel est levé
- **Âge.** Fondée en septembre 2016 (PropFirmMatch ; la société célèbre ses 10 ans en 2026). Profil Trustpilot de novembre 2018. Plus de 5 ans. Opérateur : EDX Education Services LLC. Les comptes financés passent par des sociétés partenaires (Helios Trading Partners, Appius). L'activité d'évaluation est bien celle d'Earn2Trade, mais l'exécution des comptes financés ne l'est pas : à noter dans la fiche.
- **Preuves de paiement.** Trustpilot **4,5 / 5 121** (https://www.trustpilot.com/review/www.earn2trade.com). C'est une preuve, mais à 121 avis seulement du seuil. Ce n'est pas une très grande preuve. Pas de traçage on-chain.
- **Score.** Non calculable ici : Earn2Trade n'est pas dans `scale-c.json` et sa lecture contractuelle relève de la PR #296 et de la décision de gel. Plafond de départ : 95.

### 3.25 Blue Guardian (affilié) — gelé à 60 → plafond justifié **85** si le gel est levé
- **Âge.** Les sources se contredisent :
  - la fiche indique 2019, qui est l'année de la maison mère Iconic Exchange Ltd (UK 12087566) ;
  - PropFirmMatch donne juin 2021, fundedtrading septembre 2021 ;
  - ses propres blogs disent tantôt « lancée en 2021 », tantôt « en 2022 » ;
  - le profil Trustpilot date de novembre 2022 ; Blue Guardian Futures a été lancée en novembre 2024.
  - L'activité a moins de 5 ans dans tous les cas, et 3 ans ou plus dans tous les cas.
- **Preuves de paiement.**
  - Indépendante : traçage Payout Junction **41,2 M$** (Rise + crypto directe).
  - Trustpilot **retiré**, avec avis supprimés pour faux avis (https://www.trustpilot.com/review/blueguardian.com) : TPW −10.
  - Déclaratif : « 47 M$+ », non compté.
- **Plafond justifié.** 85, et non 95 : l'âge de la maison mère ne compte pas. Score maximal avant pénalités contractuelles : 85 − 10 = 75.

---

## 4. Doubles comptages et mauvaises attributions

1. **ACG / clone hongkongais.** L'alerte SFC 3483 (13/07/2026) vise `alphacapital-group.com`, pas `alphacapitalgroup.uk`. Aucune pénalité ne doit être appliquée. Si l'alerte est mentionnée sur la fiche, il faut écrire qu'elle concerne un site **non reconnu comme officiel**, avec un lien vers la SFC, sans qualifier ce site nous-mêmes (règle 2).
2. **Equity Edge / Equity Edge Assets.** L'avertissement FCA du 6 mars 2026 vise `equityedgeassets.com`. Même traitement : aucune pénalité.
3. **The5ers / Trade The Pool.** Les deux marques appartiennent au même groupe (Five Percent Online Ltd, « The Five Percent Group »).
   - Aujourd'hui, aucune preuve de The5ers n'est créditée à Trade The Pool : c'est correct.
   - Risque inverse : le portefeuille « The5ers » de Payout Junction (102,0 M$) pourrait inclure des paiements de Trade The Pool, si le groupe paie depuis les mêmes portefeuilles. C'est invérifiable depuis la page publique.
   - Le 98 de The5ers ne dépend pas de ce point : Trustpilot (4,7 / 45 155) suffit à lui seul.
4. **Tradeify Futures + Tradeify FX.** `build-contract-audits.py` additionne les deux lignes de Payout Junction (468,9 M$ + 1,0 M$ = 469,9 M$ lors de la lecture du 25/11). L'addition est défendable, puisque c'est la même marque, mais elle doit être mentionnée. Elle ne change pas le palier.
5. **Topstep : preuve codée en dur.** `if f['slug']=='topstep': ev.append('statistiques publiées')` ne pointe vers aucune page. Toute preuve doit être une source datée dans les données, pas une exception dans le code (décision 2).
6. **Maisons mères et marques sœurs écartées à juste titre ou à corriger.**
   - FXPIG (2010) pour FXIFY : correctement écarté.
   - Iconic Exchange (2019) pour Blue Guardian : à écarter.
   - My Funded FX (2022) pour MyFundedFutures : sans effet.
   - Alpha Futures dans les « 120 M$ » d'ACG : non compté.
   - Le rachat d'OANDA par FTMO : sans effet.
7. **Montants déclaratifs à ne jamais compter comme preuve.**
   - FTMO 650 M$ ; ACG 120 M$ (groupe) ; Tradeify 440 M$ et 230 M$ (selon la période).
   - MyFundedFutures 300 M$+ ; FXIFY 40 M$ ; Blue Guardian 47 M$+.
   - Equity Edge 10 M$+ et 1 M$+ ; Hash Hedge 11 M$ ; Elite Trader Funding 13 M$+ ; Topstep 1,4 Md$+.
   - Aucun d'entre eux n'est compté aujourd'hui.

## 5. Limites de la source de traçage (Payout Junction)

- **Méthode publiée.** Payout Junction trace les portefeuilles qu'il attribue lui-même, avec une transaction par paiement, et ne mêle pas les chiffres déclarés par les sociétés. C'est la seule source on-chain du barème.
- **Indépendance.** Le classement affiche des promotions affiliées **Tradeify** (code PAY, liens Tradeify), alors que Tradeify est en tête de ce même classement. Cela ne prouve aucune erreur. Mais une source qui a un lien commercial avec une société notée devrait être signalée dans la note de méthode. Idéalement, il faudrait un second traceur pour les montants proches d'un seuil : Elite Trader Funding (10,02 M$), BluSky (12,98 M$), The5ers (102,0 M$).
- **Attribution.** Les portefeuilles sont attribués par Payout Junction, pas par les sociétés. Une réattribution peut faire franchir un seuil dans un sens ou dans l'autre.
- **Couverture.** Les paiements en fiat (Topstep, une partie des sociétés de futures) échappent au traçage on-chain. Elles ne peuvent prouver leurs paiements que par Trustpilot ou par des statistiques publiées.

## 6. Trustpilot : écarts avec `scale-c.json` (relevé du 27/11)

Aucun changement de tranche de pénalité ni de palier de preuve, sauf les deux points marqués d'un astérisque :

| Société | `scale-c.json` | 27/11 | Effet |
|---|---|---|---|
| FTMO | 4,8 / 56 103 | 4,8 / 58 206 | aucun |
| Funding Pips | 4,4 / 72 707 | 4,5 / 76 809 | aucun (déjà preuve ; < 8 ans) |
| Tradeify | 4,6 / 6 894 | 4,6 / 7 829 | aucun |
| MyFundedFutures | 4,9 / 22 813 | 4,9 / 23 243 | aucun |
| The5ers | 4,7 / 41 676 | 4,7 / 45 155 | aucun |
| FXIFY | 4,3 / 6 663 | 4,3 / 6 741 | aucun |
| Take Profit Trader | 4,4 / 11 175 | 4,4 / 11 424 | aucun |
| Elite Trader Funding | 3,8 (fiche) | 3,7 / 1 180 | même tranche TPR −3 |
| UProfit Trader | 3,4 (fiche) | 3,3 / 6 558 | même tranche TPR −6 |
| Equity Edge | 4,2 (fiche) | 4,1 / 2 806 | aucun |
| WSFunded* | < 5 000 | 4,3 / 5 232 | devient une preuve ; effet seulement après 3 ans d'activité |
| Earn2Trade* | — | 4,5 / 5 121 | preuve valable, avec une marge de 121 avis |
| ACG, Blue Guardian, FunderPro | retiré | retiré | TPW −10 maintenu |

Aucun avertissement Trustpilot nouveau. Seules ACG, Blue Guardian et FunderPro portent l'avis « breach of our guidelines » ; ACG et Blue Guardian portent aussi la mention de faux avis supprimés.

## 7. Avertissements de régulateurs

- Fiches et `scale-c.json` : seuls FTMO (RBI, entrée 13) et FundedNext (RBI, hors périmètre) portent une pénalité REGWARN. Elles sont cohérentes entre elles.
- La liste RBI contient d'autres sociétés de prop trading (Smart Prop Trader, FundedNext). Aucune autre société du périmètre n'y figure dans les extraits consultés. **Je n'ai pas lu la liste complète** (95 entrées) : à vérifier avant le recalcul final.
- Recherches I-SCAN, CNMV, CONSOB et FCA : aucune alerte visant les domaines officiels des sociétés du périmètre. Les deux seules correspondances concernent des homonymes (ACG/SFC, Equity Edge Assets/FCA) : voir section 4.

## 8. Décisions demandées à Geyer

1. **Convention d'âge** : au mois près (lecture stricte) ou à l'année civile. Elle tranche ACG et Take Profit Trader ; Elite Trader Funding et Tradeify baissent dans les deux cas.
2. **Topstep** : la publication annuelle de cohortes vaut-elle « statistiques de paiement publiées avec leur méthode » ? Si oui, remplacer l'exception codée par une source datée. Si non, plafond 75 (−20).
3. **ACG** : exiger une preuve d'activité antérieure au 25/11/2021, ou garder 95 sur la base de l'entité du 02/11/2021.
4. **Hash Hedge** : accepter la date déclarée par la société, ou exiger une trace indépendante (sinon 65).
5. **Earn2Trade et Blue Guardian** : si les gels sont levés, les plafonds de départ sont 95 et 85. Blue Guardian ne doit pas reprendre l'âge de sa maison mère.
6. **Corrections de données sans effet sur le score**, à faire au recalcul : `founded` d'Elite Trader Funding (2022), de Tradeify (2024), d'Orion (2023) et d'Equity Edge (2023). Pour Elite Trader Funding et Tradeify, ces corrections ont un effet sous la convention de l'année.

## 9. Limites de cette revue

- Les registres officiels (Companies House, Sunbiz, Illinois SOS) n'ont pas été lus directement : l'outil de lecture de pages n'a pas été autorisé pendant cette session. Les numéros d'immatriculation viennent de recherches et d'annuaires.
- Les crédits de l'outil d'extraction (Firecrawl) ont été épuisés après les relevés Trustpilot et Payout Junction du 27/11. Les autres constats reposent sur des résultats de recherche web.
- Je n'ai pas consulté les archives web (Wayback Machine), qui permettraient de dater les premiers sites. Ce sont les meilleures preuves pour les décisions 3 et 4.
- Les statistiques de cohorte de Topstep n'ont été lues qu'à travers des sources secondaires.
- Les âges des firmes à 75 sans preuve (OneUp, UProfit, Bulenox, Lux, RebelsFunding, Trade The Pool) n'ont été vérifiés qu'au niveau nécessaire : sans preuve de paiement, leur âge ne peut pas modifier leur palier, à condition qu'elles aient 2 ans ou plus, ce qui est le cas de toutes.
