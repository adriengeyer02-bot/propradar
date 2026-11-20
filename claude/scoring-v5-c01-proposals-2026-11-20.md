# PropRadar — révision V5, premier sous-lot C01 (20 novembre 2026)

**Décision de publication ultérieure :** Adrien a demandé le 20 novembre 2026 la mise en ligne des notes V5 sourcées et de la fenêtre Apex. Les propositions C01 Alpha Capital Group (67) et Maven Trading (63) ont donc une approbation explicite de score/date dans `app/data/scoring-v5-published.json` ; leurs fichiers d'audit restent des dossiers de preuve au statut « proposition ». Les 64 autres firmes C01–C04 ne sont pas migrées par cette décision.

**État au 20 novembre :** Alpha, Maven et **TradeDay** ont désormais reçu un accord explicite d'Adrien pour publication V5. L'activation de TradeDay est verrouillée par sa note datée dans `scoring-v5-published.json`.

Le fichier canonique vérifiable est `app/data/scoring-v5-proposals-c01.json` : 13 sous-notes pour chaque firme, justification, liens par critère, faits négatifs identifiés sans double sanction. Il est volontairement distinct de `app/data/scoring-v5-published.json`. L'ancienne note V4 reste celle du site jusqu'à validation des écarts et fusion du moteur V5.

## Tableau de décision — ne pas publier automatiquement

| Firme | Avant V4 | A/25 | B/25 | C/20 | D/20 | E/10 | V5 BRUT selon le barème | Règles B2 à afficher | Trustpilot | V5 final proposé | Écart |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Alpha Capital Group** | 74 | 25 | 8 | 15 | 16 | 9 | 73 | −2 | −6 | **67** | **−7** |
| **Maven Trading** | 72 | 19 | 12 | 14 | 16 | 8 | 69 | −6 | −6 | **63** | **−9** |
| **TradeDay — approuvé** | 75 | 18 | 13 | 11 | 16 | 9 | 67 | −2 | 0 | **67** | **−8** |

La colonne **V5 BRUT** ci-dessus suit strictement le barème A+B+C+D+E, avec B2 déjà inclus. Pour le dialogue demandé par Adrien, la décomposition *visuelle* reconstitue une note éditoriale avant la déduction B2, sans changer le calcul :

- Alpha : **75 éditorial avant règles −2 règles contraignantes −6 Trustpilot = 67**.
- Maven : **75 éditorial avant règles −6 règles contraignantes −6 Trustpilot = 63**.
- TradeDay : **69 éditorial avant règles −2 règles contraignantes = 67**, approuvé après la revue de la PR #239.

## TradeDay — audit V5 documentaire, proposition soumise à validation

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

## Garde-fous et suite

- Chaque pénalité liée à un *fait* porte une identité unique dans le JSON et le moteur refuse les doublons. Aucune plainte non corroborée n'est convertie en A2=6/4/2.
- Les notes Alpha, Maven et **TradeDay 75→67** disposent toutes de l'accord explicite de publication d'Adrien. Conserver leurs réserves documentaires pour les contrôles futurs.
- Les sept autres dossiers du lot C01 restent à réviser en V5. C02–C04 et les dossiers N sont suivis séparément, sans réutiliser automatiquement les anciennes sous-notes V4.
