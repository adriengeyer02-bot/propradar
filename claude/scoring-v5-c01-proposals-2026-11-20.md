# PropRadar — révision V5, C01 complet (20 novembre 2026)

**Décision de publication ultérieure :** Adrien a demandé le 20 novembre 2026 la mise en ligne des notes V5 sourcées et de la fenêtre Apex. Les propositions C01 Alpha Capital Group (67) et Maven Trading (63) ont donc une approbation explicite de score/date dans `app/data/scoring-v5-published.json` ; leurs fichiers d'audit restent des dossiers de preuve au statut « proposition ». Les 64 autres firmes C01–C04 ne sont pas migrées par cette décision.

**État au 20 novembre :** les **10 dossiers C01** sont entièrement cotés V5 (13 critères et preuves par fiche). Alpha, Maven et **TradeDay** ont reçu un accord explicite d'Adrien pour publication. **Les sept autres fiches, Breakout Prop inclus, sont des propositions non publiées.** Aucune baisse ≥5 points supplémentaire ne doit être déployée sans l'accord spécifique d'Adrien.

Le fichier canonique vérifiable est `app/data/scoring-v5-proposals-c01.json` : 13 sous-notes pour chaque firme, justification, liens par critère, faits négatifs identifiés sans double sanction. Il est volontairement distinct de `app/data/scoring-v5-published.json`. L'ancienne note V4 reste celle du site jusqu'à validation des écarts et fusion du moteur V5.

## Tableau de décision — ne pas publier automatiquement

| Firme | Avant V4 | A/25 | B/25 | C/20 | D/20 | E/10 | V5 BRUT selon le barème | Règles B2 à afficher | Trustpilot | V5 final proposé | Écart |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Alpha Capital Group** | 74 | 25 | 8 | 15 | 16 | 9 | 73 | −2 | −6 | **67** | **−7** |
| **Maven Trading** | 72 | 19 | 12 | 14 | 16 | 8 | 69 | −6 | −6 | **63** | **−9** |
| **TradeDay — approuvé** | 75 | 18 | 13 | 11 | 16 | 9 | 67 | −2 | 0 | **67** | **−8** |
| **Breakout Prop — en proposition** | 70 | 22 | 10 | 17 | 16 | 8 | 73 | −2 | 0 | **73** | **+3** |
| **Axi Select — en proposition** | 76 | 15 | 18 | 11 | 12 | 8 | 64 | 0 | 0 | **64** | **−12** |
| **City Traders Imperium — en proposition** | 74 | 13 | 13 | 9 | 14 | 9 | 58 | −2 | 0 | **58** | **−16** |
| **Take Profit Trader — en proposition** | 73 | 17 | 18 | 17 | 16 | 10 | 78 | 0 | 0 | **78** | **+5** |
| **OneUp Trader — en proposition** | 72 | 17 | 18 | 11 | 12 | 9 | 67 | 0 | 0 | **67** | **−5** |
| **UProfit Trader — en proposition** | 69 | 15 | 13 | 11 | 14 | 9 | 62 | −2 | 0 | **62** | **−7** |
| **Funded Trading Plus — en proposition** | 68 | 15 | 16 | 14 | 18 | 10 | 73 | −2 | −6 | **67** | **−1** |

La colonne **V5 BRUT** ci-dessus suit strictement le barème A+B+C+D+E, avec B2 déjà inclus. Pour le dialogue demandé par Adrien, la décomposition *visuelle* reconstitue une note éditoriale avant la déduction B2, sans changer le calcul :

- Alpha : **75 éditorial avant règles −2 règles contraignantes −6 Trustpilot = 67**.
- Maven : **75 éditorial avant règles −6 règles contraignantes −6 Trustpilot = 63**.
- TradeDay : **69 éditorial avant règles −2 règles contraignantes = 67**, approuvé après la revue de la PR #239.
- Breakout Prop : **75 éditorial avant règles −2 règles contraignantes = 73**, proposition non approuvée et non publique.
- Axi Select : **64**, pas de pénalité de règle ni Trustpilot, proposition non publique.
- CTI : **60 éditorial −2 règles = 58**, une seule ambiguïté de trading/conséquences ; avertissement de régulateur circonscrit à la licence revendiquée (C3=2).
- Take Profit Trader : **78**, éléments de paiement PRO/PRO+ documentés, mais contrat de rewards individuel non public.
- OneUp Trader : **67**, risque principal : identité de l'entité partenaire qui contracte et verse les gains non confirmée.
- UProfit Trader : **64 éditorial −2 règles = 62**, pertes de rewards possibles selon le guide de bonnes pratiques §9.1 (B1).
- Funded Trading Plus : **75 éditorial −2 règles −6 Trustpilot = 67**, notice active de suppression de note une seule fois.

## TradeDay — audit V5 approuvé et publié

**TradeDay LLC / tradeday.com / Quick Pay et Fast Pass 25K–150K, évaluation, Funded Sim et Funded Live / 20 novembre 2026 / actif.** Ancienne note 75/100 ; nouvelle note approuvée **67/100 (−8), confiance faible**. Les 13 évaluations et URL par sous-critère sont dans `app/data/scoring-v5-proposals-c01.json`. L'accord explicite d'Adrien a été obtenu après l'ouverture de la PR #239.

| Critère | Points | Motif déterminant |
| --- | ---: | --- |
| A1 | 8/10 | Calendriers, frais, splits, conditions et demande établis ; pas de déclaration exhaustive sur les plafonds/exclusions pour toutes les routes. |
| A2 | 8/10 | Neutre : flux on-chain observés, mais ni refus injustifiés corroborés au seuil V5 ni historique de conformité aux échéances certifié. |
| A3 | 2/5 | Transactions Rise vérifiables ; attribution du contrat de settlement à TradeDay non confirmée par la firme selon PayoutTrail. |
| B1 | 5/15 | CGU §23 : pouvoir large de priver de retraits, même d'autres comptes, à la suite d'une classification discrétionnaire des pratiques. Accord Funded SIM/LIVE distinct absent. |
| B2 | 8/10 | **Une seule contradiction comptée (−2)** : Fast Pass 3 jours minimum sur les cartes du site, aucun minimum dans la FAQ du 12/11, 7 jours dans les CGU générales. |
| C1 | 4/10 | TradeDay LLC et adresse connues, mais pas de dossier officiel Illinois ni d'accord funded/checkout concordant. |
| C2 | 3/6 | Situation légale actuelle non obtenue au registre de l'Illinois ; pas de statut négatif présumé. |
| C3 | 4/4 | Recherches ciblées au 20/11 FCA/AMF/CFTC/IOSCO sans alerte applicable identifiée ; absence de licence de courtier non pénalisée. |
| D1 | 8/8 | Prix uniques, tailles, règles par route/phase, pays et KYC publiés dans le catalogue et l'aide. |
| D2 | 6/6 | CGU datées du 11/08, migration de facturation explicitement documentée le 12/11 pour les anciens abonnés. |
| D3 | 2/6 | CGU périmées sur abonnements et resets depuis le changement du 12/11 ; parcours final non testé ; simulation explicitée. |
| E1 | 6/6 | Activité du service depuis 2020 corroborée par BBB et sources historiques. |
| E2 | 3/4 | Support/ticket, réponses publiques et procédure d'arbitrage ; résolution utile de dossier hors payout non vérifiée. |

**Calcul :** A18 + B13 + C11 + D16 + E9 = **67**. Affichage à deux étapes : **69 « Editorial score » −2 « Restrictive rules » = 67** ; pas d'avis Trustpilot suspendu et pas de plafond 55. Aucun malus distinct n'est ajouté pour la consistance, le drawdown, la durée de trading normalement publiée ou les limitations explicites des payouts.

**Faits distincts, anti-cumul :** (1) condition de jours Fast Pass incompatible entre pages officielles → B2 −2 une seule fois, même si trois textes divergent ; (2) retenue de gains sous pouvoir contractuel → B1 uniquement ; (3) anciennes clauses commerciales de reset et abonnement encore opposées à l'offre unique → D3 uniquement. La classification subjective des pratiques §23 n'est **pas** retranchée une deuxième fois en B2.

**Pièces majeures (consultées le 20/11/2026) :** [CGU TradeDay §3 et §23](https://www.tradeday.com/terms-and-conditions), [offres Fast Pass et Quick Pay](https://www.tradeday.com/), [FAQ Fast Pass mise à jour le 12/11](https://tradeday.freshdesk.com/en/support/solutions/articles/103000405229-what-is-fast-pass-), [annonce migration du 12/11](https://www.tradeday.com/pt/blog-posts/no-more-subscriptions-tradeday-moves-to-one-time-payments---plus-60-off-every-account), [FAQ funded](https://tradeday.freshdesk.com/en/support/solutions/articles/103000008889-what-are-the-rules-for-funded-funded-sim-and-funded-live-traders-), [PayoutTrail avec méthode de vérification](https://www.payouttrail.com/methodology), [suivi des règlements TradeDay](https://www.payouttrail.com/firms/tradeday), [BBB](https://www.bbb.org/us/il/chicago/profile/commodity-trading-advisory-service/tradeday-llc-0654-1000112598), [Trustpilot](https://www.trustpilot.com/review/tradeday.com).

**Non vérifié :** numéro d'enregistrement et statut actuel de TradeDay LLC au registre Illinois, contrat exact Funded SIM/LIVE signé, dernier écran du checkout, confirmation indépendante du portefeuille Rise/TradeDay, suivi de cas de payout au regard de leurs dates contractuelles, issue de la plainte BBB. Ces réserves restent visibles dans le dossier malgré l'accord de publication de la baisse de huit points.

## Breakout Prop — audit V5 documentaire, proposition non publiée

**Breakout Trading Group LLC (évaluation Delaware) / Payward Oceanic Ltd (FTA funded, BVI) / breakoutprop.com / Classic-Pro-Turbo 1-Step, Spark002 distingué / 20 novembre 2026 / actif.** Score affiché antérieur **70/100**, score V5 **proposé 73/100 (+3)**, confiance **moyenne**. Aucune entrée Breakout dans le manifeste des notes V5 approuvées ; aucune modification de sa fiche publique à ce stade.

| Critère | Note | Justification déterminante |
| --- | ---: | --- |
| A1 | 8/10 | Payout à la demande, min 50 USD nets, split 80/90, règles d'éligibilité, absence de caps et processus USDC publiés. Les **frais de retrait/gas ne sont pas clairement précisés** : élément split+minimum+frais = 0/2 strictement. |
| A2 | 9/10 | Payout Junction recoupe des transactions USDC depuis décembre 2024, avec flux datés espacés >6 mois ; palier 12 mois, pas 24. Pas de refus grave corroboré aux seuils V5 identifié dans la recherche du jour. |
| A3 | 5/5 | Règlements on-chain à l'échelle de l'opérateur revendiqués comme vérifiés sur 12+ mois ; un suivi externe détaille sa méthode. Réserve : le portefeuille peut aussi payer des affiliés ; total et identité de chaque destinataire non garantis. |
| B1 | **2/15** | **FTA POL §§5(y), 6(b)-(c)** : résiliation à la discrétion absolue, y compris sur critère confidentiel, et possibilité de perdre des Performance Splits, sans protection/recours explicite des gains accumulés. |
| B2 | **8/10** | **−2 une seule fois** pour les interdictions de trading aux critères vagues des §§3(b)(v)-(viii) du FTA. Aucune pénalité sur les drawdowns, news, copy trading ou limits clairement publiés. La perte de rémunération est déjà cotée B1. |
| C1 | 7/10 | Séparation des contrats Breakout Delaware / POL BVI confirmée par FTA, accord d'évaluation, SEC et conditions Kraken ; dernière étape du panier et version signée non comparées. |
| C2 | 6/6 | POL actuellement inscrite au registre officiel de la **BVI FSC** (fiche 01/10/2026) et LEI actif n°2061297. Statut 2026 de la LLC Delaware non extrait, régulation VASP ≠ garantie du programme prop. |
| C3 | 4/4 | Recherche FCA/AMF/CFTC/IOSCO sans avertissement matériel spécifiquement associé à la firme et à ce service, au 20/11 ; aucune obligation fictive de licence de courtier imputée. |
| D1 | 8/8 | Prix USD, add-on, objectifs et drawdowns par programme, conditions de trading/KYC, sanctions, pays exclus publiés. Le manque de frais USDC est imputé uniquement à A1. |
| D2 | 6/6 | Accords complets publics, annexe datée du 29/10/2026, régime de modification/notices pour les titulaires existants énoncé au FTA §19 ; pas de rétroactivité effective prouvée. |
| D3 | 2/6 | Checkout final non contrôlé ; promesse commerciale « no approval delays » face à la FAQ décrivant une approbation de 12–24 h, sans établir un délai réel abusif ; rôle Breakout/POL et nature simulée présentés clairement. |
| E1 | 4/6 | Lancement public vérifié **29 novembre 2023**, soit 35 mois et 22 jours au 20/11/2026, non encore 36 mois. |
| E2 | 4/4 | Canal email/chat, réponses observables, recours KYC et notifications contractuelles, revue d'un cas technique documentée par un trader avec réponse de Breakout (16/11) ; non assimilé à preuve générale de performance du support. |

**Calcul :** A22 + B10 + C17 + D16 + E8 = **73**. Pour l'interface demandée : **75 « Editorial Score » −2 « Restrictive Rules » = 73**, Trustpilot 0, aucun plafond. Le site Trustpilot affiche au 20/11 une note chiffrée ordinaire (pas d'alerte officielle de suppression/rétention), donc aucun retrait automatique. Le score V5 proposé reste **non publié**, quel que soit son sens.

**Registre de faits documentaires (consultation 20/11/2026) :**

1. **BKO-01 — Droit aux Performance Splits :** le [FTA public POL](https://www.breakoutprop.com/funded-trader-agreement/) §5(y) et §6 détaille résiliation discrétionnaire et non-entitlement ; **B1 uniquement**. Ce risque contractuel n'est pas une preuve de paiement refusé.
2. **BKO-02 — Sanctions pour pratiques floues :** [FTA §3(b)](https://www.breakoutprop.com/funded-trader-agreement/) (relation fournisseur, risque réglementaire selon POL) et [FAQ funded](https://intercom.help/breakoutprop/en/articles/11647201-what-trading-practices-are-prohibited-in-my-funded-account) ; **B2 −2** une fois ; aucune retenue pour les stratégies clairement interdites indépendantes.
3. **BKO-03 — Cohérence de délais annoncés :** [tarification](https://www.breakoutprop.com/pricing/) (« no approval delays ») versus [FAQ payout](https://intercom.help/breakoutprop/en/articles/11647224-when-can-i-request-a-payout-from-my-funded-account) (approbation POL de 12–24 h). **D3 uniquement**, pas B2 ni A2.
4. **BKO-04 — Preuves de versements :** [Payout Junction](https://payoutjunction.com/firms/breakout) (déc. 2024–nov. 2026), [méthode indépendante alternative](https://damnpropfirms.com/payouts/methodology/) ; soutient A2/A3 sous des dimensions **différentes** (régularité vs force de preuve). Les transferts de commissions d'affiliés sont un biais possible, pas des refus établis.
5. **BKO-05 — Entité et activité :** [accord d'évaluation](https://www.breakoutprop.com/breakout-evaluation-agreement/), [FTA](https://www.breakoutprop.com/funded-trader-agreement/), [SEC Form D](https://www.sec.gov/Archives/edgar/data/2029382/000110465925086820/xslFormDX08/primary_doc.xml), [registre officiel BVI FSC](https://www.bvifsc.vg/regulated-entities/payward-oceanic-ltd), [LEI](https://lei.bloomberg.com/leis/view/254900Y9H8TYQYVUR623), [Kraken conditions](https://www.kraken.com/tr/legal/eea-terms) et [communiqué de lancement du 29/11/2023](https://www.newsfilecorp.com/release/189043). Entité funded vérifiée ; dernier achat et certificat Delaware actuels non testés.

**À vérifier avant publication :** version effective du contrat signé par le trader, éventuelles annexes spécifiques à Spark002/Kraken Funded (ne pas mélanger les produits), concordance checkout → société du paiement, statut Delaware 2026, frais exacts du virement USDC, association indépendante du portefeuille crypto à POL/Breakout et nature de chaque transfert, éventuels incidents de paiement corroborés qui ne ressortent pas du corpus. **Pas d'approbation implicite d'Adrien.**

## Alpha Capital Group — risques et preuve positive

1. **B1 = 0/15**, cause principale. Le [Schedule 2 §2.2 des CGU](https://alphacapitalgroup.uk/terms-and-conditions) dit que la firme peut octroyer les frais de performance à sa seule discrétion ; le §2.6 autorise un non-paiement si elle considère un trade contraire aux règles. Le §2.2 est une discrétion sur le principe de la rémunération, pas simplement sur l'exécution d'une fraude définie : palier **0** de la V5. En parallèle, le §9.1.7 laisse à Alpha la définition des stratégies interdites : **B2 = 8**, −2 pour ce pouvoir *distinct* portant sur la validité du trading. Les règles ordinaires par programme restent non pénalisées.
2. **A2 = 10 et A3 = 5 sous réserve de vérification de la méthode du tiers**. [Payout Junction](https://payoutjunction.com/firms/alphacapitalgroup) présente un suivi indépendant via Rise depuis **novembre 2023**, avec des règlements à de multiples dates jusqu'au 20 novembre 2026. [Sa méthodologie](https://payoutjunction.com/methodology) déclare recouper les transactions publiques ; les **transferts bancaires hors chaîne restent inconnus**, et la liste publique des derniers paiements ne livre pas chaque hash de transaction. C'est la meilleure donnée positive actuellement relevée, même si elle ne prouve pas que *toute* demande a été honorée. Des [plaintes relayées par FinanceFeeds](https://financefeeds.com/alpha-capital-trader-alleges-25k-payout-rejected-under-undisclosed-risk-rule/) sont des allégations non résolues, sans deux refus injustifiés indépendamment démontrés ; elles sont à suivre, non à transformer en pénalité A2 automatique.
3. **C3 = 2/4**, nouveau fait officiel pertinent. L'[AFM néerlandaise](https://www.afm.nl/nl-nl/consumenten/waarschuwingen/bekijk-de-waarschuwingen/a/alpha-capital-group---httpsalphacapitalgroupuk) conserve un renvoi à une alerte étrangère **FCA du 23 novembre 2023** visant le domaine exact `alphacapitalgroup.uk`. L'ancienne page FCA n'est actuellement pas consultable ; sa portée et le statut de retrait ne sont pas établis. *Il ne s'agit pas d'une sanction prononcée ni de la preuve que le service de simulation nécessite une licence de courtier.* L'[alerte SFC de Hong Kong](https://www.sfc.hk/en/alert-list/3483) de juillet 2026 vise **`alphacapital-group.com`**, un domaine différent ; elle **n'est pas imputée** à cette firme.
4. [Companies House](https://find-and-update.company-information.service.gov.uk/company/13719951) atteste **Alpha Capital Group Limited n°13719951 active**, sans procédure de radiation active relevée. **Pas de plafond 55.** Trustpilot [retient la note](https://www.trustpilot.com/review/alphacapitalgroup.uk) : −6 unique. L'accord individuel Qualified Analyst et le parcours de paiement final doivent être rapprochés pour augmenter la confiance.

**Non vérifié :** matching de portefeuilles Rise sur les transactions individuelles ; accord Qualified Analyst après KYC ; dernier checkout ; statut précis de l'ancienne alerte FCA ; règlement final des plaintes CID/risk review. **Confiance : moyenne ; aucune recommandation automatique.**

## Maven Trading — pénalité de règles très spécifique

1. **B1 = 8/15**. Les [CGU v2026.3 (05/11/2026)](https://maventrading.com/terms-and-conditions), §13.2, conservent un motif de résiliation général (« any reason it sees necessary »). Contrairement au cas Alpha, les §11.2, §13.4 et §16.2 préservent explicitement les **cash rewards approuvés et obligations acquises**. Le risque d'une clôture arbitraire reste réel, mais on ne transforme pas cette clause en confiscation prouvée de gains acquis.
2. **B2 = 4/10**, −6 composé de trois risques **contractuellement distincts**, sans pénaliser le drawdown, l'EA ou la consistency en eux-mêmes :
   - **−2 :** §5.7, règle additionnelle de **risque de 1 % à discrétion** sans seuil de déclenchement précisément opposable pour tous les comptes.
   - **−2 :** §4.3, interdiction de « gamifying » pouvant dépasser les exemples chiffrés fournis et entraîner résiliation.
   - **−2 :** §4.5, programmes **OMO / Instant Mini** : profits sur les opérations de moins de 150 secondes supprimés, **pertes conservées**. C'est l'asymétrie particulière visée par V5, pas une sanction pour une restriction normale.
3. **A3 = 1/5** : témoignages, avis Feefo et chiffres marketing non équivalents à un rapprochement indépendant des versements. **A2 = 8/10** : les plaintes publiées ne suffisent pas à constater deux refus injustifiés corroborés, et aucun suivi indépendant sur 12 mois n'a été identifié. Étiquette publique obligatoire : **« preuves de paiement limitées »**.
4. **C1 = 7/10, C2 = 3/6** : les CGU désignent **MAVEN EDU - FZCO**, licence revendiquée n°60823, et l'[annuaire officiel KHDA](https://web.khda.gov.ae/en/education-directory/Training/Training-Details?CenterID=506634) atteste ce nom. Cela ne remplace pas une confirmation actuelle du registre **DIEZ**, ni une réconciliation du pied de page mentionnant **Maventrade LTD à Sainte-Lucie** avec la partie contractante. Pas de cap 55 : **l'entité est identifiable**, même si tous les rôles et son état statutaire ne sont pas vérifiés.
5. **D3 = 2/6** : le [Static 1-Step](https://maventrading.com/static-1-step) vendu et documenté séparément manque de la liste des produits §3.1 et du Schedule 1 ; le dernier checkout n'a pas été comparé. La nature simulée est expliquée (+2). Trustpilot [retient la note](https://www.trustpilot.com/review/maventrading.com) : −6 unique.

**Non vérifié :** registre DIEZ à date ; accord associé au Static 1-Step pendant la commande ; identification du payeur effectif ; règlements bancaires indépendants ; résultat des litiges isolés. **Confiance : moyenne, paiements limités ; aucune recommandation automatique.**

## C01 — six nouvelles propositions documentaires

### Six audits supplémentaires C01 — source canonique, 20 novembre 2026

Tous les éléments ci-dessous sont des **propositions** : les 13 notes détaillées, justification par critère et liens se trouvent dans `app/data/scoring-v5-proposals-c01.json`. Les chiffres d'anciens scores viennent de la fiche publique avant migration. *Confiance faible pour les six*, principalement à cause des accords funded non consultables, du contrat par pays ou de la vérification du statut officiel. Les notes A3 restent inférieures à 3 dans ces six cas : afficher « preuves de paiement limitées », jamais « paiements suffisamment vérifiés ».

#### AXI-01 — Axi Select : **76 → 64 (−12)**

**Axi Select / axi.com / AxiTrader LLC citée dans le juridique international, contrat Select variant par région / Seed, Incubation, Acceleration, Pro, Pro500, Pro M / actif / confiance faible.** Vecteur V5 : **A1=6, A2=8, A3=1 ; B1=8, B2=10 ; C1=4, C2=3, C3=4 ; D1=6, D2=2, D3=4 ; E1=6, E2=2** ; A15+B18+C11+D12+E8=**64**, sans autre retrait.

**AXI-F01 (modèle commercial) :** contrairement à une évaluation classique payante, le programme nécessite de **déposer ses propres 500 USD minimum** sur un compte de courtage et crée une allocation séparée ; les seuils de capital personnel progressent jusqu'à 20 000 USD selon le stade. C'est un risque de fonds propres et de structure du produit à **expliquer**, pas une règle punitive à −2. Sources : [programme officiel](https://www.axi.com/int/funded-trader-program), [minimum de dépôt Axi](https://help.axi.com/en-US/axiv2--axicorp-prod/article/cZ8nR5nz-how-much-money-do-i-need-to-deposit-with-axi-select), [qualification](https://help.axi.com/en-US/axiv2--axicorp-prod/article/zLCbArkB-how-do-i-qualify-for-the-axi-select-program).

**AXI-F02 (contrat non public) :** date et rythme de versement mensuel dans l'[aide dédiée](https://help.axi.com/en-US/axiv2--axicorp-prod/article/VwEhaP1j-how-and-when-are-axi-select-payouts-transferred), mais absence de copie publique de la convention Select signée et de rapprochement des pays/entités ; **B1=8 provisoire**, C1=4, C2=3 et D2=2. [Documentation légale par entité](https://www.axi.com/int/legal-documentation). Les volumes et certificats publiés par Axi ne constituent pas une validation indépendante des paiements. [Lancement daté du 18/09/2023](https://www.globenewswire.com/de/news-release/2023/09/18/2744375/0/en/Axi-launches-Axi-Select-a-pioneering-all-inclusive-capital-allocation-programme-offering-skilled-traders-funding-of-up-to-1-000-000-USD.html) → E1=6. **Non vérifié :** accord individuel, frais exacts, statut de la partie Select par résidence, payouts indépendants, dernier checkout.

#### CTI-01 — City Traders Imperium : **74 → 58 (−16)**

**citytradersimperium.com / City Traders Imperium Limited (Comores, n°15969 déclaré), CTI FZCO (Dubai, académie) / 1-Step, 2-Step, Instant, Direct / actif / confiance faible.** Vecteur : **A1=4, A2=8, A3=1 ; B1=5, B2=8 ; C1=4, C2=3, C3=2 ; D1=8, D2=4, D3=2 ; E1=6, E2=3** ; A13+B13+C9+D14+E9=**58**. Calcul visuel **60 éditorial −2 de règles = 58**. Il n'y a **pas** de plafond 55 : C1≠0, pas de strike-off non suspendu de l'opérateur actuel.

**CTI-F01 (clauses courantes) :** le [PDF officiel 2026](https://citytradersimperium.com/wp-content/uploads/2026/08/City-Traders-Imperium-Terms-Conditions.pdf) est [lié comme version faisant autorité](https://citytradersimperium.com/terms-conditions-of-service/). Son §8.11 retire le droit aux récompenses en cas de violation (**B1=5**, l'accord de récompense du tiers restant non public) ; §9.5 laisse qualifier un trading interdit discrétionnairement (**B2 −2**), avec possibilité de limiter le risque à 1 % ou de réduire le levier en §9.6(e). **Ce dernier pouvoir est la conséquence du même mécanisme et ne reçoit pas un second −2.** Aucune retenue pour les règles chiffrées claires. L'incertitude sur les fenêtres de retrait Direct est traitée **en A1** sans −2 supplémentaire en B2.

**CTI-F02 (statut et prétendue licence) :** le [site de la firme](https://citytradersimperium.com/contact-us/) affiche la licence L15969/CTI ; un [répertoire se présentant comme Anjouan Offshore Finance Authority](https://anjouanoffshorefinanceauthority.org/register/city-traders-imperium/) porte cette référence, mais la **[Banque centrale des Comores](https://banque-comores.km/uploads/COMMUNIQUE-DE-LA-BCC-SUR-LEXERCICE-ILLEGAL-DACTIVITES-BANCAIRES-OFFSHORES%283%29.pdf)** a mis en garde en 2022 contre des structures de ce nom prétendant délivrer des agréments bancaires/financiers. Cette alerte concerne **l'émetteur prétendu de licence, pas une sanction spécifique de CTI ni une démonstration que sa simulation nécessite une licence de courtier** : C3=2 (portée incertaine), C2=3 (registre sociétaire officiel actuel non obtenu). L'[ancienne société britannique n°11463147 dissoute](https://find-and-update.company-information.service.gov.uk/company/11463147) ne doit pas être confondue avec l'opérateur actuel comorien. **Non vérifié :** acte de constitution de la société Comores, reconnaissance de la licence, convention finale de reward, contrat signé et frais complets de payout.

#### TPT-01 — Take Profit Trader : **73 → 78 (+5)**

**takeprofittrader.com / TAKEPROFITTRADER LLC, Floride L21000145354 / PRO, PRO+ et évaluations / actif / confiance faible.** Vecteur : **A1=8, A2=8, A3=1 ; B1=8, B2=10 ; C1=7, C2=6, C3=4 ; D1=8, D2=4, D3=4 ; E1=6, E2=4** ; A17+B18+C17+D16+E10=**78**.

**TPT-F01 (registre) :** [Sunbiz Floride](https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?aggregateId=flal-l21000145354-66e25221-0d62-437c-8b65-7bbed6804627&directionType=Initial&inquirytype=EntityName&listNameOrder=TAKEPROFITTRADER+L210001453540&searchNameOrder=TAKEPROFITTRADER+L210001453540&searchTerm=take+profit+trader) indique **Active** et annual report **2026** (C2=6). **TPT-F02 (retraits) :** [FAQ officielle PRO/PRO+](https://try.takeprofittrader.com/TPT-FAQs-nf40-4-0725) : différences de split (80/90 %), buffer PRO, délais et moyens de paiement, pas de cap revendiqué ; une restriction de buffer **claire et annoncée** n'est pas un malus B2. **TPT-F03 (protection) :** [CGU de site](https://takeprofittrader.com/terms) datées du 27/08/2024, **accord de trader PRO/PRO+ signé non public** : B1=8 provisoire et confiance faible. Les témoignages ne sont pas des règlements authentifiés (A3=1). **Non vérifié :** accord funded, commissions exactes par moyen de transfert, contrôle du panier et résolution indépendante des demandes client.

#### ONE-01 — OneUp Trader : **72 → 67 (−5)**

**oneuptrader.com / OneUp Trader LLC identifiée côté site ; funding partners non nommés comme payeurs contractuels / évaluations futures et funded partenaire / actif / confiance faible.** Vecteur : **A1=8, A2=8, A3=1 ; B1=8, B2=10 ; C1=4, C2=3, C3=4 ; D1=6, D2=4, D3=2 ; E1=6, E2=3** ; A17+B18+C11+D12+E9=**67**.

**ONE-F01 (identité contractuelle) :** OneUp [explique que ses partenaires de financement approuvent puis font signer leur propre Trader Contract](https://help.oneuptrader.com/article/520-getting-funded-process). L'identité juridique et le statut actuel du **débiteur des récompenses** restent non vérifiés (C1=4, C2=3, B1=8 provisoire), sans conclure à une disparition de la firme. **ONE-F02 (payouts) :** les [conditions officielles](https://help.oneuptrader.com/article/376-profit-info) détaillent 100 % des premiers 10 000 USD, puis 90 %, seuil minimal de 1 000 USD et demandes au prestataire ; frais complets non établis (A1=8). La [politique de confidentialité 2017](https://www.oneuptrader.com/privacy-policy/) documente l'antériorité du service, non un paiement actuel. **Non vérifié :** nom/statut de chaque funding partner, contrat de rewards, frais exacts, relevés indépendants, parcours final d'achat.

#### UPR-01 — UProfit Trader : **69 → 62 (−7)**

**uprofit.com / UPROFIT TRADER LLC (Delaware revendiquée) / DAY, ONE, FLEX, SOFT et Live Virtual/Live Funded / actif / confiance faible.** Vecteur : **A1=6, A2=8, A3=1 ; B1=5, B2=8 ; C1=4, C2=3, C3=4 ; D1=8, D2=4, D3=2 ; E1=6, E2=3** ; A15+B13+C11+D14+E9=**62**. Calcul visuel **64 éditorial −2 règle vague = 62**.

**UPR-F01 (contrat) :** [guide officiel de bonnes pratiques actualisé en 2026](https://help.uprofittrader.com/hc/en-us/articles/38280308499604-Trading-Best-Practices-Guide) : §8 prévoit notification, réponse et réexamen, **§9.1 prévoit la suppression des profits, rewards et payout requests en cas de violation confirmée** (B1=5). Le pouvoir de qualifier un ensemble de risques non exhaustifs comme abusifs expose le compte à une sanction sans limite parfaitement prédictible (B2 −2 distinct) ; ni profits supprimés effectivement ni clients lésés ne sont présumés. **UPR-F02 (produits différents) :** [DAY](https://help.uprofittrader.com/hc/en-us/articles/32526417608212-UProfit-DAY-Payout-Policy), [ONE](https://help.uprofittrader.com/hc/en-us/articles/49177986296468-UProfit-One-Payout-Policy), [FLEX](https://help.uprofittrader.com/hc/en-us/articles/52062715698580-UProfit-Flex-Payout-Policy) et [SOFT](https://help.uprofittrader.com/hc/en-us/articles/52063548100500-UProfit-Soft-Payout-Policy) ont des jours et fenêtres différents : **pas une contradiction**. **Non vérifié :** registre Delaware actuel, accord Trader signé, dernière commande, preuve de versement indépendante, détail de frais par filière.

#### FTP-01 — Funded Trading Plus : **68 → 67 (−1)**

**fundedtradingplus.com / IF Pro Ltd Sainte-Lucie (challenge), ACELLO LTD Royaume-Uni n°12696083 (site/paiement) / Activation et autres gammes séparées / actif / confiance faible.** Vecteur : **A1=6, A2=8, A3=1 ; B1=8, B2=8 ; C1=7, C2=3, C3=4 ; D1=8, D2=6, D3=4 ; E1=6, E2=4** ; A15+B16+C14+D18+E10=**73 brut**, **−6 Trustpilot = 67**. Visuel : **75 éditorial −2 règles −6 Trustpilot = 67**.

**FTP-F01 (nouveaux opérateurs) :** [CGU datées 26/05/2026](https://www.fundedtradingplus.com/terms-conditions/) et [FAQ de l'acquisition](https://help.fundedtradingplus.com/who-are-acello-ltd/) indiquent la migration vers Acello pour le paiement après rachat 2026 et IF Pro pour la simulation ; [Companies House atteste Acello active](https://find-and-update.company-information.service.gov.uk/company/12696083). [FTP LONDON LTD en liquidation](https://find-and-update.company-information.service.gov.uk/company/13719292) est un **ancien opérateur de paiement** : ne déclenche ni statut « fermé » ni plafond 55 contre les successeurs actuels. Le statut IF Pro à Sainte-Lucie reste non confirmé (C2=3).

**FTP-F02 (règles et rewards) :** [Activation](https://help.fundedtradingplus.com/activation-accounts-payouts-and-withdrawals/) exige 10 jours de trading, 3 % de profit, un maximum de 25 % sur le meilleur jour et 50 USD de retrait minimal — conditions claires, **0 sanction pour leur seule contrainte**. La [risk review](https://help.fundedtradingplus.com/risk-review-policy/) a des déclencheurs chiffrés mais un jugement final holistique sans seuil précis dans chaque facteur (**B2 −2**). Accord privé de recherche/payout non publié (**B1=8 provisoire**).

**FTP-F03 (Trustpilot) :** [la page Trustpilot officielle](https://www.trustpilot.com/review/fundedtradingplus.com) présente au contrôle du jour une **note indisponible pour non-respect de ses règles, avec avis faux retirés** : ajustement **−6 exactement une fois**. Cela ne prouve pas que FT+ elle-même a commandé ces avis ni qu'un payout client a été refusé. **Non vérifié :** registre IF Pro actuel, contrat researcher individuel, dernier checkout, preuve de payout indépendante et portée détaillée de chaque revue de risque.

### Décisions requises avant fusion

Les **sept** propositions non publiques sont **Breakout 70→73, Axi 76→64, CTI 74→58, TPT 73→78, OneUp 72→67, UProfit 69→62 et FT+ 68→67**. Au minimum, les baisses **Axi −12, CTI −16, OneUp −5 et UProfit −7** requièrent validation nominative par Adrien. L'augmentation TPT +5 et les deux autres propositions restent également bloquées par le manifeste daté tant qu'Adrien n'a pas expressément approuvé leur note. Aucune de ces nouvelles notes ne doit être injectée implicitement dans `scoring-v5-published.json`.

### Garde-fous de suite

- Chaque pénalité liée à un *fait* porte une identité unique dans le JSON et le moteur refuse les doublons. Aucune plainte non corroborée n'est convertie en A2=6/4/2.
- Les notes Alpha, Maven et **TradeDay 75→67** disposent toutes de l'accord explicite de publication d'Adrien. Conserver leurs réserves documentaires pour les contrôles futurs.
- Breakout Prop **70→73** est proposé, son FTA funded étant maintenant public et plus explicite que le dossier V4 ; il ne dispose pas d'une approbation de publication et reste à 70 sur le site.
- **C01 est intégralement audité : 10/10.** Les 56 autres dossiers C02–C04 et les 48 N02–N03 restent à traiter, sans réutiliser automatiquement les sous-notes V4.
