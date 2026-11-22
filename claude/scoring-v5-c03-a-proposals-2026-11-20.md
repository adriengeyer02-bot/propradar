# PROP RADAR TECH — Audits V5 C03-A (20 novembre 2026)

**Statut : propositions à valider, non publiées.** Six firmes, 78 appréciations sur les treize critères A1–E2. Écart de la note affichée V4 à la proposition V5 calculé sans conversion automatique. Le JSON est dans `app/data/scoring-v5-proposals-c03-a.json` et chaque critère comporte un motif et une ou plusieurs URL. Cette note n'est pas un constat juridique définitif ni une garantie de paiement.

| Firme | Note affichée | Proposition V5 | A/25 | B/25 | C/20 | D/20 | E/10 | Règles B2 | Trustpilot | Confiance |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| FXIFY | 67 | **81** | 23 | 18 | 17 | 14 | 9 | 0 | 0 | Moyenne |
| FunderPro | 67 | **62** | 18 | 13 | 14 | 14 | 9 | −2 | **−6** | Moyenne |
| FundingPips | 66 | **70** | 23 | 18 | 11 | 10 | 8 | 0 | 0 | Moyenne |
| Leeloo Trading | 63 | **60** | 16 | 13 | 11 | 12 | 8 | −2 | 0 | Faible |
| FTUK | 63 | **65** | 17 | 15 | 11 | 14 | 8 | 0 | 0 | Moyenne |
| Bulenox | 61 | **63** | 15 | 15 | 11 | 14 | 8 | 0 | 0 | Faible |

Les colonnes A–E incluent B2 après retrait des points de règles. Le `−2` est **la présentation de `10 − B2`**, pas une seconde soustraction. Ainsi FunderPro a 68/100 après règle, puis −6 Trustpilot = 62. Les sous-scores dans le JSON restent le calcul de référence.

## 1. FXIFY — 81/100 ; contrat funded à réconcilier

**Positif :** [Payout Junction](https://payoutjunction.com/firms/fxify) vérifie des règlements via Rise depuis février 2024 ; environ 14 891 à la consultation, dernière transaction enregistrée le 16 novembre 2026. Historique on-chain >24 mois : A2=10, A3=5. Les [délais par produit et plafonds](https://fxify.com/blog/prop-firm-payout-process/) sont suffisamment expliqués pour A1=8. [Companies House #14451720](https://find-and-update.company-information.service.gov.uk/company/14451720) mentionne une société active.

**Réserve critique :** les [CGU générales du 6 novembre 2024](https://fxify.com/terms-and-conditions) §8 disent qu'une société **tierce** décide du contrat trader, sans intervention de FXIFY Solutions Limited, alors que l'[Agreement de mars 2025](https://fxify.com/agreement/) l'appelle **Prop Company** et lui attribue le paiement des profits ; une autre page la désigne agent de paiement. Ni le contrat individuel actuel ni le checkout ne sont étudiés. C1=7, B1=8, D3=0 : la solidité des preuves de transfert n'efface pas l'ambiguïté du débiteur.

**À demander à la firme :** contrat funded actuellement signé par les traders, nom de l'entité juridiquement débitrice, correspondance avec la facture et statut des CGU de 2024 par rapport à l'Agreement de 2025.

## 2. FunderPro — 62/100 ; cumul de deux risques distincts

- Les [Challenge T&Cs de mars 2026](https://funderpro.com/terms-conditions/) §11.7 renvoient les droits funded à une convention différente, non récupérée ; l'entité nommée est **FunderPro Ltd, Malta C104558**. Le pied de page associe aussi **FunderPro Saint Lucia Ltd #2025-00393** au même service de simulation. C1=7, C2=3, D3=2 ; l'[identifiant LEI](https://lei.bloomberg.com/leis/view/8755004JF69ITJAWW873) ne remplace pas un extrait officiel de registre courant.
- Les [conditions Instant de mars 2026](https://funderpro.com/instant-account-terms-and-conditions/) §§7.9–7.10 permettent de **refuser une récompense pour manquement suspecté**, dont l'appréciation se fait à discrétion, avec renonciation au recours : **B1=5**. Cette même clause n'est **pas** pénalisée dans B2.
- Séparément, [§13.14 des Challenge T&Cs](https://funderpro.com/terms-conditions/) permet une disqualification sans remboursement si une stratégie paraît risquée selon la firme, sans seuil exhaustif. Ce fait **distinct** entraîne **B2=8**, soit un affichage `−2 règles`.
- La [page Trustpilot FunderPro](https://www.trustpilot.com/review/funderpro.com) affiche **actuellement** une note indisponible pour manquement aux règles de la plateforme et mentionne le retrait d'avis falsifiés. **Malus V5 −6 exactement une fois**, pas une déduction additionnelle A2/B2.

Les [fréquences et seuils de récompense](https://support.funderpro.com/en/articles/419844-how-does-reward-frequency-and-eligibility-work-for-funderpro-challenges) sont documentés par gamme. A3=2 seulement : l'existence de certificats de paiements ne démontre pas un historique indépendant complet du payeur. Le dossier nécessite une validation prioritaire de l'entité et du contrat funded.

## 3. FundingPips — 70/100 ; preuves de paiements fortes, CGU non consultables

[Payout Junction](https://payoutjunction.com/firms/fundingpips) rapporte 71 687 sorties Rise traçables entre novembre 2023 et le 20 novembre 2026, soit >24 mois, d'où A2=10, A3=5. Le [centre d'aide 1 Step Flex](https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex) fournit le minimum 1 %, les cycles 80 % sur 14 jours ou 100 % sur demande après jours/cohérence, et le risque de trading par idée. L'[article d'identification](https://help.fundingpips.com/hc/en-us/articles/48368490585105-Compare-Account-Models) donne **FundingPips Corp, Comores #HY01223081**, et distingue le support chypriote. Ces identifiants ne sont pas corroborés par un extrait officiel de registre.

**Blocage documentaire :** le [lien de CGU officielles](https://www.fundingpips.com/terms-and-conditions) a retourné 403 ; l'aide n'est pas l'équivalent de l'accord Master Account opposable. **B1=8 provisoire ; D2=0**. Aucun malus B2 arbitraire ne découle d'une simple indisponibilité du document. À rouvrir depuis un navigateur ou demander une copie versionnée avant approbation.

## 4. Leeloo Trading — 60/100 ; plafonds modifiables et preuve incomplète

Les [CGU du 31 mars 2026](https://www.leelootrading.com/terms-conditions) nomment **Natural Trading LLC**. Elles autorisent de changer les caps de payout et réservent à la firme le consentement pour les paiements au-delà du plafond : **B1=5**. La catégorie distincte *reckless trading / gambling behavior* peut fermer le compte sans définition chiffrée : **B2=8, −2 règles**. Le contrat dit clairement que les opérations sont simulées, mais l'État et le statut de la LLC ne sont pas confirmés.

[PayoutTrail](https://payouttrail.com/firms/leeloo-trading) montre des hashes on-chain pour 2 897 règlements attribués à Leeloo, mais une adresse provient d'une cartographie sectorielle, la firme n'est pas indiquée *Verified* et les dernières traces répertoriées datent de septembre 2026. On ne transforme donc pas cette attribution en preuve de douze mois confirmée : **A3=2**, A2 neutre 8. Vérifier correspondance wallets/entité et calendrier des programmes actuels.

## 5. FTUK — 65/100 ; clause ouverte de réduction des gains

Les [CGU du 20 juillet 2024](https://ftuk.com/terms-of-service) indiquent **Nexdata-Solutions (Pays-Bas)** comme opérateur, sans numéro KVK accessible. La clause §1 conserve le droit de réduire une récompense de **0 à 50 %** pour violation d'un §14 qui décrit surtout des risques généraux : **B1=5**, sans double retrait B2.

La [FAQ Instant Sim mise à jour en 2026](https://faq.ftuk.com/en/articles/12354244-instant-sim-funding-payout-rules-caps-progression) est plus précise : 6 % d'objectif, cinq jours qualifiants, cohérence 20 %, buffer, minimum brut 500 USD, cap brut 1 000–3 000 USD selon taille. [Demande de retrait Rise/crypto](https://faq.ftuk.com/en/articles/12339852-how-do-i-request-a-profit-payout) expliquée étape par étape. Pas de statistiques de paiements attribuables indépendamment, A3=1. Demander l'extrait KVK et le règlement funded 2026 qui supersède éventuellement le texte 2024.

## 6. Bulenox — 63/100 ; refus de profits sur soupçon

Le [PDF Terms of Use actualisé octobre 2026](https://bulenox.com/legal/Terms_of_Use.pdf) p. 6 indique que Bulenox LLC peut refuser **tout profit si un abus d'algorithmes est soupçonné**. **B1=5**, pas de malus B2 sur les mêmes mots. Ni certificat Delaware ni historique indépendant attribué de sorties de fonds n'a été établi, d'où C1=4, C2=3, A3=1.

Le [site](https://bulenox.com/) décrit les demandes quotidiennes Fast Track/Momentum, le split jusqu'à 90 % et l'absence de frais de payout ; le [Help Center Momentum](https://bulenox.com/help-center/momentum) publie les tailles, prix, cibles et drawdowns. Mais les détails de minimums/caps apparaissent sous des onglets dont le contenu n'est pas restitué intégralement par l'extraction : **A1=6, pas 10**. [Canaux support](https://bulenox.com/contact) identifiés. Vérifier une requête réelle de payout dans le portail avant validation.

## Méthode, limites et garde-fous

1. **Sources primaires** : CGU et FAQ opérateur, registre Companies House, page Trustpilot en direct. Le tiers blockchain est un complément d'attribution, pas un organisme de garantie. Il reconnaît que toutes les méthodes de versement ne sont pas suivies ; son site affiche également un programme de commissions commerciales ([méthode](https://payoutjunction.com/methodology)).
2. **Interprétation** : absence de registre courant = C2=3 provisoire, jamais dissolution présumée. Un site qui n'expose pas ses CGU = B1=8 provisoire, D2=0 si la version et ses effets ne sont pas contrôlables. A3<3 = historique de paiements insuffisamment vérifié pour une recommandation fondée sur la traçabilité, même si des clients témoignent.
3. **Clauses négatives** : chaque fait n'est porté qu'à un critère, avec `negativeFactIds` et `ruleDeductions` si B2. Les sociétés de support, d'évaluation et de paiement ne sont pas confondues par défaut.
4. **Incertitude documentaire** : pas de checkout achevé ni d'accès aux contrats individuels ou aux extraits officiels de Malte, Comores, Pays-Bas et Delaware ; certaines offres sont détaillées en interface JavaScript. Aucun défaut non vérifié n'est transcrit comme fermeture, sanction ou fraude.
5. **Contrôle** : `node scripts/test-scoring-v5-proposals-c03-a.mjs` valide les 78 critères, barèmes, pénalités, unicité des slugs, non-publication et anti-double-comptage ; `node scripts/test-scoring-v5.mjs` teste le moteur général.

## Progression V5

Lot courant : **+6 firmes** proposées. Avec les 11 audits déjà approuvés dans `main`, 7 propositions C01 en PR #240 et 4 propositions C02–C04 en PR #241, le cumul des dossiers chiffrés V5 atteint **28/122** ; restent **94 dossiers à chiffrer**. Les 4 vérifications de statut séparées en PR #241 ne sont pas des notes V5 publiables.

**Recommandation de workflow :** revue/approbation par le propriétaire des six scorecards, puis seulement intégration au registre de publication avec commit dédié et règles de reclassement. Aucun `published.json`, manifeste public, composant ou note utilisateur en production n'est touché par ce lot.
