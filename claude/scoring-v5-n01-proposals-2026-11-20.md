# PropRadar — reprise des audits Claude, lot N01, barème V5

**Mandat :** Adrien autorise ChatGPT à reprendre les **56 dossiers N01–N03** de Claude, en plus de ses 66 dossiers C01–C04, et demande la publication sur le site avec une fenêtre de note détaillant précisément les clauses pénalisantes. La validation ne se déduit pas de l'ancienne V4 ; chaque dossier exige 13 sous-critères V5, des preuves adaptées et le contrôle des cas sensibles.

**Première passe datée du 20 novembre 2026 : deux fiches N01** dans [`scoring-v5-proposals-n01.json`](../app/data/scoring-v5-proposals-n01.json). Les dossiers sources restent nommés « proposition » ; leur activation repose sur une entrée distincte dans `scoring-v5-published.json`, créée après la demande explicite de publication d'Adrien. Les vingt firmes N01 ne sont **pas** toutes réauditées V5 par cette passe.

| Firme | V4 affichée | Base avant B2 | B2 | TP | V5 proposée | Écart |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Get Leveraged | 59 | 64 | −2 | −6 | **56** | −3 |
| Alpha Futures | 64 | 68 | −4 | 0 | **64** | 0 |

## Get Leveraged — 56/100, confiance faible

- CGU officielles [version 2.0](https://getleveraged.com/terms/) (mise à jour 17 novembre, entrée en vigueur annoncée le 27 octobre 2026). **B1 5/15** : §8.3 autorise un paiement de montant différent ou un refus après appréciation de l'opérateur ; les motifs et trades doivent être expliqués par écrit et un recours §12.4 existe. Ces protections empêchent de traiter le dossier comme une discrétion absolue sans recours.
- **B2 8/10 : −2** pour la catégorie ouverte §7.2, `any other deliberate abuse ... as reasonably determined by us`, pouvant conduire à l'inéligibilité à la récompense. **Aucun retrait** pour les limites clairement chiffrées. B1 porte sur le **pouvoir de réduire/refuser le paiement**, B2 sur la **définition de conduite à sanctionner**, deux faits contractuels distincts.
- La [FAQ payouts](https://getleveraged.com/fr/faq/payouts-and-profit-split/) et §8 rendent la plupart des modalités consultables, mais plafonds/exclusions pour ONE/Instant restent incomplets : A1 8. Preuve de paiement indépendante au niveau de la firme non retrouvée : A3 1 (ne signifie pas « aucun payout »).
- Contrat déclaré avec **GetLeveraged Ltd, Sainte-Lucie n°2025-00808** ; rôle de **Leveraged Capital Management Ltd, Chypre** limité à la facturation (§1.2). Sans extrait du registre primaire de la société contractante, C1 4 et C2 3 : **entité non entièrement vérifiée, mais identifiée**, donc pas de plafond 55 réservé aux cas C1=0.
- [CySEC / autorité primaire reproduite par Finantsinspektsioon estonien](https://fi.ee/sites/default/files/2026-04/GetFile.pdf) : alerte datée **7 avril 2026** nommant exactement `getleveraged.com` comme site non rattaché à une entité autorisée pour les services d'investissement. **C3 2** (portée sur l'offre purement simulée non tranchée) ; ce n'est **pas** la preuve qu'un agrément de courtier est exigé pour la simulation.
- [Trustpilot](https://www.trustpilot.com/review/getleveraged.com) retient la note et affiche une notice de manquement à ses règles avec retrait d'avis trompeurs. **−6 une fois**, sans imputation à la firme de la création de ces avis.
- Non vérifié : extrait officiel Sainte-Lucie, dernier écran d'achat pour chaque programme, tiers indépendant sur les versements, réponses de support résolues hors payout. Confiance faible = **aucune recommandation par défaut**.

## Alpha Futures — 64/100, confiance moyenne

- Le [Schedule 4, §1.2.2 et §1.2.6](https://alpha-futures.com/terms-and-conditions) dit que l'opérateur peut accorder les Analyst Performance Fees à sa seule discrétion et en refuser pour des violations qu'il détermine. **B1 0/15**, selon **le même palier que Alpha Capital Group**, qui utilise une clause de même effet. La présence de paiements vérifiés ne crée pas de garantie contractuelle.
- **B2 6/10 : −4** : §8.1.7 laisse la firme décider des stratégies interdites (−2) ; Schedule 5 traite une part « importante » mais non chiffrée de profit sur trades <2 min comme motif de sanction (−2). Les restrictions news, consistency, contrats et drawdown publiées clairement ne retirent pas de point.
- **A2 4/10** pour l'incident collectif spécifique au **plan Premium arrêté en juillet 2026**, avec paiements en attente reconnus dans la [mise à jour officielle de septembre](https://alpha-futures.com/posts/alpha-futures-payout-update-five-business-days-or-less) et des [réponses publiques](https://www.trustpilot.com/review/alpha-futures.com?page=5) en novembre. Le [récit contemporain de Finance Magnates](https://www.financemagnates.com/forex/ninjatrader-and-alpha-futures-breakup-turns-bitter-exposing-a-big-industry-risk/) confirme le conflit avec NinjaTrader/Tradovate et le périmètre Premium. **Ce n'est ni un arrêt de tous les payouts ni la preuve d'un défaut généralisé** : le calendrier de régularisation et la proportion des comptes soldés restent à vérifier.
- **A3 5/5**, indépendant de A2 : [Payout Junction](https://payoutjunction.com/firms/alphafutures) déclare 16 107 versements Rise traçables de septembre 2024 à novembre 2026 ; il s'agit seulement de la méthode Rise suivie, non de l'intégralité des transferts ni de la résolution des dossiers Premium.
- [Companies House n°15655643](https://find-and-update.company-information.service.gov.uk/company/15655643) : Alpha Futures Limited `Active`, comptes et confirmation à jour (C2 6). CGU [27 juillet 2026](https://alpha-futures.com/terms-and-conditions), [barème payouts 26 octobre](https://alpha-futures.com/posts/alpha-futures-payout-rules-2026), [FAQ Standard](https://help.alpha-futures.com/en/articles/11632512-standard-account-overview). Confiance moyenne.
- Non vérifié : proportion des anciens Premium payouts régularisés, accord individuel Qualified, dernier panier de commande, voies d'escalade hors support, exhaustivité des alertes hors autorités recherchées.

## Règle d'affichage Apex et statut

- Le score brut affiché **avant** les retraits B2 est une décomposition visuelle : `somme des 13 critères + (10 − B2)` ; le score V5 proprement dit est **déjà** `somme des 13 critères`. Le retrait B2 n'est appliqué **qu'une fois**. Trustpilot suit, puis le plafond juridique éventuel.
- La fenêtre au clic indique pour chaque retrait B2 **programme**, **phase**, **clause précise**, **conséquence** et **lien officiel**, avec le chiffre −2. Un encadré séparé indique la protection B1 (/15), sans prétendre la déduire encore une fois.
- Aucune migration mécanique des 54 autres N01–N03 ni des 64 autres C01–C04. Les archives V4 restent visibles tant que leur successeur V5 n'est pas sourcé et accepté.
