# PropRadar — matrice de contrôle V3 des firmes

**197 firmes × 15 critères = 2955 lignes à vérifier.**

**Ce document ne propose aucune note finale.** Le demi-crédit indiqué est uniquement la règle V3
pour un critère réellement non vérifié. Une URL dans le dépôt est une piste documentaire,
pas une confirmation que les 15 critères ont été revus. Ne pas publier des scores bâtis
sur des déductions automatiques ni présumer qu’une société n’a pas payé faute de pièces.

- Firmes non fermées : **159**.
- Firmes fermées, hors classement : **38**.
- Firmes ouvertes sans preuve indépendante **étiquetée** dans le dossier : **147**.
- Firmes ouvertes avec une clause candidate de risque contractuel : **90**.
- Firmes ouvertes sans preuve indépendante étiquetée **et** avec alerte Trustpilot active : **39**.
- Fichiers : `scoring-v3-criteria-matrix-2026-11-20-part-1.csv` à `part-5.csv`, 40 firmes par lot (37 dans le dernier).

**Attention à la sévérité réelle du nouveau barème :** sans preuve indépendante de payout
sur le critère A1 (18 points), le demi-crédit neutre vaut 9. Même si les quatorze
autres critères obtenaient leur maximum, un dossier restant dans cet état aurait
un **plafond purement théorique de 91** avant Trustpilot, **85** avec l’alerte -6.
Ce plafond n’est ni une note recommandée ni la preuve de mauvaise conduite.
Il faut rechercher les justificatifs, pas attribuer 18/18 sur une affirmation marketing
ou forcer une note historique à 90 sans décomposition documentée.

## Vérification prioritaire des sources contractuelles

| Firme | Risques candidats | Critères sans URL candidate | Audit existant |
| --- | ---: | ---: | --- |
| FTUK | 6 | 3 | Partiellement vérifié |
| The5ers | 6 | 0 | Vérifié multi-source |
| WeMasterTrade | 5 | 8 | Partiellement vérifié |
| Fintokei | 5 | 3 | Vérifié multi-source |
| FundedNext | 5 | 3 | Partiellement vérifié |
| Apex Trader Funding | 5 | 2 | Partiellement vérifié |
| The Concept Trading | 4 | 7 | Partiellement vérifié |
| Traders Launch | 4 | 6 | Partiellement vérifié |
| WeGetFunded | 4 | 6 | Partiellement vérifié |
| Lucid Trading | 4 | 5 | Vérifié multi-source |
| Moneta Funded | 4 | 5 | Partiellement vérifié |
| Tiger Funded | 4 | 5 | Partiellement vérifié |
| WSFunded | 4 | 5 | Partiellement vérifié |
| Atmos Funded | 4 | 4 | Partiellement vérifié |
| Orion Funded | 4 | 4 | Partiellement vérifié |
| QT Funded (Quant Tekel) | 3 | 8 | Vérifié multi-source |
| Clarity Traders | 3 | 7 | Partiellement vérifié |
| OFP Funding | 3 | 7 | Partiellement vérifié |
| DayTraders.com | 3 | 6 | Partiellement vérifié |
| FOXX Funded | 3 | 6 | Partiellement vérifié |
| OneFunded | 3 | 6 | Partiellement vérifié |
| FTMO | 3 | 5 | Vérifié multi-source |
| FundedElite | 3 | 5 | Partiellement vérifié |
| Funder Trading | 3 | 5 | Partiellement vérifié |
| RZR Funded | 3 | 5 | Partiellement vérifié |

## Passage au calcul final

1. Lire la source officielle **pour chaque critère**, vérifier l’effet réel par programme et dater le contrôle.
2. Ajouter le point confirmé justifié et l’identifiant du fait, ou laisser le demi-crédit **non vérifié**.
3. Contrôler les preuves indépendantes de payout (un article qui relaie la déclaration de la firme n’en est pas une).
4. Calculer avec `app/lib/scoringV3.ts` : le -6 Trustpilot s’applique séparément, la fermeture plafonne 29.
5. Produire l’avant/après, faire revoir les mouvements sensibles, puis uniquement publier les fiches vérifiées.
