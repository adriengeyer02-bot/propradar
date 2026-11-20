# Recalibrage V4 — rangs 24 à 43 — **propositions non publiées**

Date de revue : **20 novembre 2026**. Branche fille de la PR #204 (elle-même dépendante de #203). L'index des rangs est celui de `topFirms` à cette date ; tout déplacement de rang doit déclencher une nouvelle revue avant intégration.

## Décision éditoriale

- **20 dossiers contrôlés avec la même grille** : calendrier de payout, contrat, restrictions rattachées au bon programme, identité et offre, signaux externes. Chaque dossier indique cinq URL de référence. Une URL ne signifie **pas** qu'un fait est indépendant ou entièrement prouvé.
- **16 calculs proposés** à confiance **moyenne** : 256 sous-critères V4 avec appréciation et piste documentaire dans le validateur. Les scores sont une **base de revue éditoriale**, pas des audits légaux complets, pas des notes approuvées. Les critères documentés indirectement restent `partiel`.
- **4 scores V4 explicitement bloqués** (`scores: null`) : TickTickTrader, TradeFundrr, Traders Central, Rocket21. **Conserver leur note historique** dans la base existante, ne pas leur attribuer artificiellement une note V4 et ne pas les présenter comme « totalement audités ».
- **12 variations ≥ 5 points nécessitent l'accord d'Adrien** avant déploiement. Aucune note affichée sur le site, aucun audit Claude ni règle par programme n'a été modifié ici.
- Le malus **Trustpilot –6** est calculé une seule fois hors des cinq blocs si le signal actif est enregistré, sans second malus interne ; aucune fermeture ne justifie ici un plafond 29 sans preuve officielle.

## Tableau de contrôle (avant → V4 proposé)

| Rang initial | Firme | Actuelle | V4 brouillon | Écart | Statut de revue |
|---:|---|---:|---:|---:|---|
| 24 | FXIFY | 67 | **75** | +8 | Sensible, validation requise |
| 25 | TickTickTrader | 67 | — | — | **Bloqué** : nouvelles souscriptions suspendues |
| 26 | FunderPro | 67 | **70** | +3 | Vérifier l'exemple de drawdown Instant |
| 27 | TradeFundrr | 67 | — | — | **Bloqué** : accord du programme Pro distinct |
| 28 | Funding Pips | 66 | **76** | +10 | Sensible, risque contractuel B1 maintenu |
| 29 | BrightFunded | 66 | **72** | +6 | Sensible, source contrat funded à compléter |
| 30 | PipFarm | 66 | **71** | +5 | Sensible, conditions selon génération de compte |
| 31 | For Traders | 66 | **70** | +4 | Contrat post-évaluation à rapprocher du plan |
| 32 | Leeloo Trading | 63 | **67** | +4 | Clauses « toxic flow » toujours signalées |
| 33 | Funding Traders | 63 | **68** | +5 | Sensible, recours payout à contrôler |
| 34 | FTUK | 63 | **69** | +6 | Sensible, retrait discrétionnaire à conserver |
| 35 | AquaFunded | 62 | **69** | +7 | Sensible, règle de floating PnL explicite |
| 36 | RZR Funded (ex-Hantec Trader) | 62 | **68** | +6 | Sensible, clause très défavorable de retrait |
| 37 | Hola Prime | 62 | **72** | +10 | Sensible, ne pas surévaluer « audit Deloitte » |
| 38 | Lark Funding | 61 | **67** | +6 | Sensible, notions de gambling/VPN floues |
| 39 | Bulenox | 61 | **62** | +1 | Pouvoir de refus sur soupçon maintenu |
| 40 | Finotive Funding | 61 | **69** | +8 | Sensible, niveaux de sanction contractuels clairs |
| 41 | Ment Funding | 61 | **67** | +6 | Sensible, qualification de gambling encore vague |
| 42 | Traders Central | 61 | — | — | **Bloqué** : programme achetable non confirmé |
| 43 | Rocket21 Challenge | 60 | — | — | **Bloqué** : accès officiel défaillant, fermeture non prouvée |

Calcul indicatif uniquement : V4 = 25 points fiabilité payouts + 35 contrat/transparence + 15 identité/légal + 15 qualité de l'offre + 10 historique/avis, puis −6 si notice Trustpilot active, plafond 29 si fermeture officiellement confirmée. Contraintes de trading **claires et objectives** ≠ malus automatique. Les scores ne sont jamais des moyennes entre programme Futures et CFD sans préciser leur périmètre.

## Faits importants et précautions de lecture

1. **FXIFY** — conditions officielles et page de retrait consultées. Le vocabulaire relatif aux conduites « excessives » ou interdites peut laisser une marge d'interprétation pour les gains. Les anciennes fréquences de payout ne se transposent pas à tous les nouveaux plans. [Contrat](https://fxify.com/agreement/) · [Payout](https://fxify.com/faqs/all-faqs/how-do-i-withdraw-my-profits/). **Ne pas présumer un refus réel** ; comparer le contrat de l'offre à la date d'achat.
2. **FunderPro** — le contrat Instant et un exemple FAQ de drawdown n'ont pas une lecture immédiatement harmonisée : restreindre le point de transparence au plan Instant, puis faire confirmer l'exemple chiffré. Sanction de contournement KYC/identité ≠ refus abusif par défaut. [Conditions Instant](https://funderpro.com/instant-account-terms-and-conditions/) · [Aide drawdown](https://support.funderpro.com/en/articles/527811-instant-how-drawdown-works-in-instant-program).
3. **Funding Pips** — les [CGU](https://fundingpips.com/legal/terms-and-conditions) conservent des pouvoirs de retenue/révision de rémunérations et de qualification de conduite interdite à la discrétion de la firme. C'est une **vraie préoccupation contractuelle B1**, mais **pas une preuve indépendante de payout injustement refusé (A2)**. Les signaux de transfert déjà recensés ne valident pas un taux de succès global.
4. **PipFarm** — frais du programme « Pay With Profits » imputés au premier retrait, plafonds progressifs et clauses d'ancienneté. [PWP](https://help.pipfarm.com/articles/8246911-pay-with-profits-payouts) · [Explication des plafonds](https://updates.pipfarm.com/help/articles/1900230-payout-caps). Différence par plan et date ≠ règle « cachée » ou contradiction universelle.
5. **RZR Funded** — le [contrat](https://rzrfunded.com/terms-conditions/) prévoit la possibilité de revoir, retenir ou réclamer des rémunérations **déjà approuvées**, selon l'appréciation de la firme : le retrait B1 reste sévère malgré le relèvement global. Éviter de confondre l'ancienne marque Hantec Trader avec la personne morale signataire actuelle.
6. **FTUK / Leeloo / Lark / Bulenox / Ment** — des formulations subjectives telles que « gambling », « toxic flow », abus présumé, ou trading « non réplicable » sont toujours signalées comme risque contractuel. Elles n'alimentent pas automatiquement la rubrique des refus injustifiés établis. [FTUK](https://ftuk.com/terms-of-service) · [Leeloo](https://www.leelootrading.com/terms-of-service) · [Lark](https://larkfunding.com/terms-of-use) · [Bulenox (PDF)](https://bulenox.com/legal/Terms_of_Use.pdf) · [Ment](https://mentfunding.com/terms-of-service).
7. **AquaFunded** — les sanctions de split liées au PnL flottant de certaines formules sont **précisément définies** dans les [CGU](https://www.aquafunded.com/legal/terms-and-conditions). Les expliquer comme contrainte sans les qualifier à tort de risque caché.
8. **Hola Prime** — un communiqué ou article indiquant que Deloitte serait impliqué dans un examen des payouts n'est **pas** un rapport indépendant achevé ni un ensemble de paiements tous vérifiés. La note A3 proposée reste prudente et non exhaustive. [CGU](https://holaprime.com/terms-conditions/) · [Payouts](https://www.holaprime.com/rulebook/payouts-profit-splits-rewards/).
9. **Finotive Funding** — des sanctions de dépassement d'exposition sont graduées et formalisées ; leur existence ne vaut pas automatiquement arbitraire. À l'inverse, toute clause de révision générale des gains doit être isolée comme telle. [CGU](https://finotivefunding.com/terms-and-conditions).

## Quatre audits non éligibles au recalcul maintenant

| Firme | Motif précis | Prérequis pour débloquer |
|---|---|---|
| TickTickTrader | [Page de souscription](https://app.tickticktrader.com/signup/kVBOWMcC?provider=Projectx&type=s2fplus) affichant la suspension temporaire des achats/abonnements | Confirmer reprise, programme réellement achetable et traitement des titulaires existants ; **ne pas la déclarer fermée** |
| TradeFundrr | [Offres par marché](https://tradefundrr.com/) et programme Pro nécessitant un contrat spécifique, avec apport personnel distinct | Lire et rattacher l'accord signé Pro, frais récurrents et rémunérations au produit correspondant |
| Traders Central | [Site](https://traderscentral.com/) et offre active non suffisamment établis ; rumeurs de reprise non vérifiées | Confirmer l'opérateur légal, l'offre actuelle et le sort des comptes clients |
| Rocket21 Challenge | [Domaine officiel](https://rocket21challenge.com/) inaccessible aux vérifications, sans déclaration de fermeture vérifiée | Confirmer par source primaire la fermeture ou une reprise avant tout score actif / plafond 29 |

## Garde-fous de publication et de continuité avec Claude

- Le référentiel est `SCORING_V4.md` (16 critères à maxima fixes) et `app/lib/scoringV4.ts` (moteur commun à #203) ; ce lot conserve *intégralement* `app/data/firm-updates.json` et ses observations programme par programme.
- Les cinq URL d'un dossier sont une **piste de vérification homogène**, pas une certification juridique. Chaque sous-critère du script porte un statut `verifie` (point documenté) ou `partiel` (jugement encore lacunaire). Une mention `verifie` ne vaut **pas** relecture de toutes les générations de contrats ni conformité réglementaire garantie.
- **Une clause = un fait = un critère**. La discrétion contractuelle relève de B1. A2 exige un incident de payout injustifié, établi indépendamment. B2 nécessite une contradiction **dans la même offre et la même version** ; pas une comparaison naïve entre programmes.
- **Ne pas doubler** une pénalité Trustpilot via E2. Les fermetures et suspensions doivent avoir des statuts distincts.
- Ne pas ajouter ce JSON à l'import de notes publiques, ne pas fusionner la PR avant revue des variations sensibles et rapprochement des PR dépendantes #203/#204. Les cas bloqués doivent apparaître dans l'outil de rédaction comme « audit bloqué » et être exclus d'une mise en ligne V4 automatique.
- Une profondeur d'audit identique au niveau des *questions posées* n'implique pas la même quantité de preuves disponibles. La bonne réponse à une pièce manquante est un **statut de confiance et un blocage de publication**, pas un faux malus de payout.

### Reproduire le contrôle

```bash
node scripts/check-scoring-v4-batch-3.cjs
```

Si la branche n'a pas ses dépendances Node locales, définir `NODE_PATH` vers le `node_modules` de la copie de travail avant d'exécuter. Ce script ne modifie ni les données ni la note publique.
