# PropRadar — V5 C03 prioritaire (21 novembre 2026)

**Projet de notes, non approuvé et non publié.** Barème intégral [SCORING_V5.md](../SCORING_V5.md), 13 critères sourcés par firme. Le JSON canonique est [scoring-v5-proposals-c03-priority.json](../app/data/scoring-v5-proposals-c03-priority.json). Test de non-cumul et de non-publication : `node scripts/test-scoring-v5-proposals-c03-priority.mjs`.

## Résultats à valider

| Firme | Note avant | A/25 | B/25 | C/20 | D/20 | E/10 | Score après B2 | Affichage « Editorial Score » | « Restrictive Rules » | Trustpilot | V5 proposé |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| GOAT Funded Trader | 59 | 22 | 13 | 14 | 12 | 8 | 69 | 71 | −2 | −6 | **63/100** |
| Apex Trader Funding | 57 | 17 | 8 | 14 | 14 | 8 | 61 | 63 | −2 | 0 | **61/100** |
| RebelsFunding | 59 | 15 | 16 | 11 | 18 | 7 | 67 | 69 | −2 | 0 | **67/100** |
| IC Funded | 58 | 15 | 13 | 14 | 14 | 6 | 62 | 64 | −2 | 0 | **62/100** |
| The Concept Trading | 60 | 15 | 16 | 17 | 10 | 9 | 67 | 69 | −2 | 0 | **67/100** |

**Équations :** GOAT 71−2−6=63 ; Apex 63−2=61 ; Rebels 69−2=67 ; IC Funded 64−2=62 ; The Concept Trading 69−2=67. **Le B2 à 8 est DÉJÀ inclus dans le total des cinq piliers** : le « −2 » n'est qu'une décomposition de présentation, pas une seconde retenue. Aucun plafond 55, aucune allégation de fraude ou de refus injustifié établie par ce lot. Niveau de confiance : **moyen** pour les trois, avec réserves contractuelles explicites.

## GOAT Funded Trader — 59 → 63

- **Contrats / B1=5.** [CGU officielles](https://www.goatfundedtrader.com/legal/terms-and-conditions) §8.1 : absence de promesse ferme de récompense ; §11.4 : résiliation unilatérale possible, avec remboursement des frais seulement éventuel. Le [Trader Agreement n'est signé qu'à la première demande de payout](https://help.goatfundedtrader.com/en/articles/10742264-how-payouts-work-eligibility-request-processing-and-arrival). **Le contrat funded individuel n'a pas été consulté** : ne pas conclure que la société a effectivement refusé un payout de manière abusive. B1 conservateur 5 au vu de la portée contractuelle visible, à réviser si l'accord signé garantit ou supprime un droit acquis.
- **Règles / B2=8.** CGU §§4.4–4.6 : la firme conserve une large appréciation sur le style de stratégie, certaines opérations multi-comptes et l'adéquation au risque. **−2 pour une seule catégorie d'ambiguïté de trading**, différente du pouvoir de rémunération déjà enregistré en B1. Les plafonds 6 %/10 000 USD des premières récompenses, les minimums et conditions annoncées ne valent aucun malus B2 par leur seule existence. [Payout FAQ](https://help.goatfundedtrader.com/en/articles/10742264-how-payouts-work-eligibility-request-processing-and-arrival).
- **Preuves de paiements / A2=9, A3=5.** [Prop Firm Loop](https://www.propfirmloop.com/payout-tracker/goat-funded-trader/) annonce suivre des transferts Rise on-chain **depuis le 28 novembre 2024** ; à la date de contrôle **21/11/2026, cela représente moins de 24 mois complets**. Palier A2 9 (12+ mois), non 10 ; transferts vérifiables à l'échelle de la firme sur >12 mois justifient A3 5. Le suivi ne prouve ni les règlements hors chaîne ni le taux de demandes acceptées. Vérifier l'appariement de wallets si contesté.
- **Entité / C1=7, C2=3.** CGU : Wishes Tower International Limited, Hong Kong **76428795**. Le [registre des créations de sociétés de Hong Kong du 8–14 avril 2024](https://www.cr.gov.hk/docs/wrpt/RNC063_2024.04.08-2024.04.14.pdf) répertorie le même nom/numéro le **11 avril 2024**. **Cela confirme l'immatriculation historique, PAS le statut légal actuel** ; certificat courant et société portée par le Trader Agreement à obtenir.
- **Trustpilot / −6 UNE SEULE FOIS.** La [fiche Trustpilot officielle](https://www.trustpilot.com/review/goatfundedtrader.com) porte explicitement une note indisponible pour violation des règles et annonce des avis retirés. Elle **n'attribue pas publiquement les faux avis à l'entreprise elle-même**. Signal réputationnel strictement séparé des incidents de paiement.
- **Réserves :** CGU affichant une date historique alors que des textes du site ont changé en novembre ; dernier checkout et accord funded signés manquants, montant/rails réels hors blockchain non exhaustifs. D2=2 (version signée actuelle non confirmée).

## Apex Trader Funding — 57 → 61

- **B1=0 : protection contractuelle très faible.** [User Agreement public](https://dashboard.apextraderfunding.com/agreement/user-agreement), section Rewards (lignes 211–217) : les paiements sont explicitement *discretionary*, ne constituent pas une créance et la firme affirme pouvoir les diminuer, suspendre ou supprimer **pour tout motif**, sans appel ordinaire. Le V5 exige **0/15** pour ce cas. Ne pas transformer cette clause en accusation d'un refus de payout effectivement subi par un client.
- **B2=8 : risque différent, zéro double sanction.** La section **Professional Traders** du même accord permet d'exclure un trader dont l'expérience ou la sophistication est jugée excessive, avec critères non exhaustifs : **−2** sur la transparence de l'aptitude au programme. La discrétion sur les gains a déjà B1=0, **aucun deuxième −2** à ce titre. Les règles objectives de drawdown, cinq jours rentables et plafonds EOD/Intraday ne sont pas pénalisées.
- **A1=8 :** [règles officielles des payouts EOD](https://apextraderfunding.com/help-center/eod-payouts/eod-payouts/) : cinq jours distincts de gains requis, plafonds, seuils, six paiements maximum. [PA EOD](https://apextraderfunding.com/help-center/eod-trailing-drawdown-accounts/eod-performance-accounts-pa/) annonce 100 % de split des rewards approuvées. Les frais de sortie de chaque mode et accords Live distincts ne sont pas consolidés. Les comptes **Legacy, EOD et Intraday** doivent être séparés.
- **A2=8 / A3=1 :** pas d'historique indépendant couvrant une année, ni deux cas de non-paiement injustifié prouvés selon la règle V5, dans le corpus examiné. Les montants affichés par Apex et les avis ne prouvent pas des paiements individuels attribués.
- **Identité / C1=7, C2=3.** [Accord](https://dashboard.apextraderfunding.com/agreement/user-agreement) et [informations fiscales 1099](https://apextraderfunding.com/help-center/helpful-items/1099-forms-and-tax-information/) identifient Apex Trader Funding Inc, Austin Texas, EIN 87-1952262. **Statut Texas à date et dernier contrat Live/checkout non recoupés indépendamment** ; ne pas prononcer fermeture ou protection juridique complète.
- **Versions et droit acquis / D2=2.** Accord public, mais version fixe et protection des achats existants non démontrées ; le contrat autorise des changements de Trading Rules sans préavis.
- **Action après proposition :** demander le calendrier des versions User Agreement, le droit attaché aux « approved rewards », l'accord Live et un extrait Texas récent.

## RebelsFunding — 59 → 67

- **Modèle juridico-commercial important.** [CGU édition 11 novembre 2026](https://lb.rebelsfunding.com/terms-and-conditions/) et [règles v3.2](https://www.rebelsfunding.com/all-the-rules/) : RIFM, s.r.o. **48 116 700** vend l'évaluation ; la réussite ne crée **aucun droit automatique** à un compte RCF. Le **RCF Account Contract** est distinct et tripartite avec FRCSM, s.r.o. et le trader. **B1=8 provisoire** tant que la convention signée n'a pas été examinée. Pas de fausse conclusion selon laquelle RIFM devrait payer automatiquement tous les candidats qualifiés.
- **Retraits / A1=6 :** [FAQ actualisée le 17 novembre](https://my.rebelsfunding.com/faq/) : première demande après **14 jours calendaires suivant le premier trade RCF**, minimum de **50 USD** ; la Cash Portion approuvée devient payable dans les 14 jours après la plus tardive de l'approbation et la réception des pièces de conformité. Conditions **différentes selon le programme** ; le split+frais de chaque rail et plafonds exhaustifs ne sont pas confirmés pour chaque variante.
- **B2=8.** Les règles générales contiennent une catégorie ouverte de comportements de risque assimilables à du jeu ou disproportionnés, en plus de seuils chiffrés. **−2 seulement sur l'ambiguïté** ; limites objectives (durée minimale de position en RCF, risque, news, drawdown) ne sont pas pénalisées.
- **D2=6 / D3=4.** Textes officiels accessibles, version datée et régime des modifications des contrats existants précisé ; la distinction évaluation/RCF et nouveaux anciens clients est explicitée. Le dernier checkout n'a pas été validé.
- **Ancienneté / E1=4.** Le site indique lancement **en 2023** sans preuve du mois précis. **Ne pas arrondir artificiellement à 36 mois** au 21 novembre 2026. Réviser à 6 lorsque le début de l'activité prop avant 21/11/2023 est documenté.
- **A2=8 / A3=1 ; C1=4 / C2=3 :** revendications marketing de payouts et identité slovaque cohérente dans les documents de l'entreprise, mais **pas de relevés de paiements externes attribués ni d'extrait officiel récent du registre des deux parties**. La confiance moyenne est liée à la documentation accessible, **pas** à une preuve bancaire établie.
- **À demander :** RCF Account Contract version signée, identité et statut officiel de FRCSM, conditions de réclamation, éléments de paiement indépendants.

## IC Funded — 58 → 62

- **Contrat officiel / B1=5.** Les [CGU IC Funded](https://www.icfunded.com/terms-and-conditions), §§11.3–11.4, permettent de qualifier des stratégies d'interdites même si elles ne sont pas nommées, puis de retirer des gains ou refuser des payouts. L'accord funded est distinct (§16), et **sa version signée manque** : il ne faut pas affirmer l'existence d'un refus de payout abusif ni noter automatiquement 0/15.
- **Règles contraignantes / B2=8.** Autre clause, §12 : une variation « significative ou injustifiée » de taille de lot et de style de trading peut conduire à disqualification, sans seuil précis. **−2 une seule fois** pour cette condition de conformité subjective. Le pouvoir de retirer la récompense au titre de §11.4 est **déjà traité B1**.
- **Retraits / A1=6.** Les [règles officielles 2-Step Professional](https://www.icfunded.com/rules) indiquent 14 jours et cinq jours profitables pour la première demande, trois jours pour la suivante, aucune exigence de jour profitable ensuite ; split 80/20. Le calendrier est explicite, mais ni barème complet de frais bancaires ni plafond/absence de plafond n'ont été confirmés pour toutes les variantes.
- **Identité / C1=7, C2=3.** [À propos](https://www.icfunded.com/about) nomme **IC Funded Evaluations LTD, Sainte-Lucie 2024-00388** ; le [LEI externe](https://lei.bloomberg.com/leis/view/894500XIZX315U6MQ328) recoupe identité et numéro, avec statut indiqué actif dans une fiche dont la dernière révision accessible remonte à 2025. **Ne pas assimiler ce LEI à un certificat officiel de situation novembre 2026.** Les comptes simulés ne reçoivent pas par défaut les garanties d'IC Markets.
- **Preuves de gains / A2=8, A3=1** : le marketing parle de payouts « verified », mais les éléments publics consultés ne rapprochent pas de façon indépendante plusieurs virements de l'entité aux traders. La [fiche Trustpilot](https://www.trustpilot.com/review/www.icfunded.com) affiche un TrustScore et non une note suspendue par l'opérateur : **0 pénalité Trustpilot**, même si les avis sont mitigés.
- **D2=2 ; E1=4.** Conditions accessibles mais sans version datée opposable et mise à jour discrétionnaire ; début de l'entité évaluatrice juin 2024, pas de preuve de trois ans de service prop avant novembre 2023. Vérifier checkout et contrat funded avant toute publication.

## The Concept Trading — 60 → 67

- **Identité / C1=7, C2=6.** Les [CGU de prop trading](https://prop.theconcepttrader.com/terms-and-conditions/) nomment **THE CONCEPT AU/NZ PTY LTD (ACN 652 938 399)**. Le [registre public australien ABN 78 652 938 399](https://abr.business.gov.au/ABN/View?abn=78652938399) indique la société et le nom commercial **actifs**, ce qui n'est **pas** une preuve de payouts ou de contrat personnel garanti. [The Concept Limited à Sainte-Lucie](https://theconcepttrader.com/) présente une activité de courtage distincte ; ne pas lui attribuer indûment la responsabilité de tous les comptes prop.
- **Payout / A1=6, D3=0 : nuance importante.** Les [CGU §12.17](https://prop.theconcepttrader.com/terms-and-conditions/) indiquent **un versement par mois**, tandis que la [90 % Lock Rule](https://prop.theconcepttrader.com/all-rules/) prévoit **des paiements hebdomadaires pour des comptes expressément éligibles et bloqués à un niveau**. Il peut s'agir d'une **exception contractuelle légitime**, pas forcément d'une contradiction ; toutefois l'articulation hiérarchique avec §12.17 et l'accord individuel n'est pas vérifiée. Ne pas sanctionner B2 sans preuve que les deux textes sont opposés pour le même produit.
- **Contrat de rémunération / B1=8 provisoire.** Les [CGU §12.19](https://prop.theconcepttrader.com/terms-and-conditions/) renvoient au **Contractor Service Agreement** séparé, à sa clause 3, que nous n'avons pas consultée jusqu'à signature. §12.10 donne une faculté de fermeture de compte. Aucune conclusion ne peut être tirée quant au droit effectif aux sommes déjà acquises sans ce contrat.
- **B2=8 :** §12.24 permet de disqualifier un compte sur des pratiques qui ne seraient pas **commercialement reproductibles sur un marché réel**, sans seuil exhaustif. **−2 pour cette seule appréciation**, distincte du contrat de rémunération B1. Les six semaines d'inactivité, les objectifs par niveau et le drawdown statique clairement publiés ne coûtent rien.
- **D2=2.** Une [ancienne page de CGU en miroir](https://new.theconcepttrading.com/terms-and-conditions/) parle de **4 semaines** d'inactivité, tandis que les [CGU actuelles](https://prop.theconcepttrader.com/terms-and-conditions/) et [règles](https://prop.theconcepttrader.com/all-rules/) indiquent **42 jours**. Ancienne version ≠ preuve que la restriction actuelle est cachée ; relever l'absence de procédure de version datée plutôt que multiplier les malus.
- **Ancienneté / E1=6 :** [enregistrement du nom commercial depuis août 2021](https://abr.business.gov.au/ABN/View?abn=78652938399), services prop historiques documentés depuis 2022 ; cela ne prouve ni solvabilité ni affiliation réglementaire du programme.
- **À obtenir avant publication :** le contrat service de trader §3, tableau exact de payouts pour chaque offre, pays et contrepartie du compte personnel, preuve indépendante de règlements, checkout final et protocole de dérogation à la limite mensuelle pour la Lock Rule.

## Rectification du compteur : file prioritaire ≠ tous les audits réalisés

Le [script de file officielle](../scripts/check-v5-progress.mjs) constitue une sélection de **122 dossiers à reprendre** : 66 C01–C04 et 56 N01–N03. Les **six nouvelles notes de la PR #242** (FXIFY, FunderPro, FundingPips, Leeloo, FTUK et Bulenox) sont des audits V5 supplémentaires **en dehors de cette file** ; elles restent utiles mais **ne peuvent pas diminuer les 122**.

| Source de travail | Scorecards V5 dans les 122 | Statut |
|---|---:|---|
| `main` approuvé | 11 | publié |
| PR #240, C01 | 7 | proposé seulement |
| PR #241, C02–C04 | 4 | proposé seulement |
| **Cette PR, C03 prioritaire** | **5** | **proposé seulement** |
| **Total file prioritaire documentée** | **27/122** | 11 publiés ; 16 propositions |
| **Restants à chiffrer dans cette file** | **95** | sans scorecard V5 complète |

La PR #241 contient en outre **4 enquêtes de statut**, sans nouvelle note V5, non ajoutées aux 25 ; la PR #242 contient **6 audits bonus** hors file. Le compteur public du projet doit être ajusté **après fusion des PR et réconciliation des doublons** ; ne pas modifier subrepticement la liste live.

## Conditions de validation et de publication

La présente PR est délibérément **draft**. Aucun fichier de score public, fiche live, lien d'affiliation, prix ou publicité n'est modifié. Les propositions ont été calculées avec le moteur V5 et un test source a été ajouté ; exécuter CI/test Node sur la branche avant fusion. Le contrôle du contrat individuel, du dernier checkout, des registres actuels et de l'attribution de règlements est une **réserve**, pas un fait négatif inventé. La décision de publier les nouvelles notes relève d'un accord explicite de l'éditeur.
