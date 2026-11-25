# PROP RADAR — POSTMORTEM V5.2 ET PROPOSITION DE RECALIBRATION
**Date : 24 novembre 2026 — statut : brouillon de méthode, NON approuvé, NON publié.**
**Aucun score public, aucune promotion, aucun lien affilié et aucun état de fermeture ne doit être modifié à la suite de ce document sans audit et décision éditoriale explicite.**

## 1. Incident et causes racines
- Le 19 novembre, un plafond général **Trustpilot** de 64 avait déjà été supprimé. La V5.2 du 22 novembre a introduit un **autre** plafond probatoire basé sur A3 : A3=0/1 ⇒ final≤64 ; 2 ⇒≤69 ; 3 ⇒≤79 ; 4/5 ⇒ pas de plafond. Cette réintroduction créait une confusion de conception et de communication.
- Dans la publication du 23 novembre (121 scores), note maximum 70, moyenne 55,1 ; **84/121 en dessous de 60**, 36 entre 60 et 69, un seul à 70, aucun au-dessus. 32 entreprises ont perdu au moins dix points vis-à-vis du score précédent déclaré dans la fiche.
- A3≤1 sur 94/121, mais seuls **quatre** scores ont réellement été réduits par leur plafond. En supprimant uniquement les plafonds A3, seuls **deux scores** dépasseraient 70. Le plafond n'explique donc PAS la compression systémique.
- Dans les 121 dossiers : **B1≤3/15 sur 82**, **C2=3/6 (« registre non vérifié ») sur 103**, **A2=6/10 neutre sur 114**. Le modèle convertissait trop de vérifications non terminées en points perdus, parfois avec une confiance d'audit pourtant « faible ».
- La pipeline publique a aussi permis de réappliquer un −6 Trustpilot déjà inclus dans les 13 critères V5.2 (corrigé dans le dernier main de 23 novembre avant retour arrière), soit un double malus possible selon le chemin de code.
- FTMO : précédente note déclarée **90**, V5.2 **62**. Ses 13 points : A1=8, A2=6, A3=1, B1=3, B2=10, C1=4, C2=3, C3=2, D1=8, D2=4, D3=4, E1=6, E2=3. 62 **sans** plafonnement : l'absence de recherches terminées (registries, contrepartie FTMO Account, paiements indépendants) a réduit plusieurs sous-notes simultanément. **Ne pas augmenter B1 arbitrairement** : des clauses officielles sur la réplicabilité et les récompenses demandent une vraie revue juridique, distincte de l'accès au contrat individuel.
- Topstep : 81 → 64, le score brut calculé vaut 64. The5ers : 78 → 64, somme brute vaut 64. Ces scores ne se corrigent pas en enlevant la limite A3.

## 2. Principes du V5.2 corrigé proposé (V5.2-R, sans changement de pondération)
**Ne PAS changer les pondérations 25 / 25 / 20 / 20 / 10 ni les treize critères sans vote explicite.**

| Pilier | Critères | Maximum |
| --- | --- | ---: |
| A — Payouts | A1 transparence 10 + A2 incidents/historique 10 + A3 preuves positives 5 | 25 |
| B — Contrat et règles | B1 récompenses contractuelles 15 + B2 règles de trading 10 | 25 |
| C — Identité juridique | C1 contrepartie 10 + C2 statut registre 6 + C3 alertes officielles 4 | 20 |
| D — Transparence produit | D1 règles 8 + D2 évolution 6 + D3 cohérence 6 | 20 |
| E — Historique et support | E1 ancienneté 6 + E2 support 4 | 10 |

### 2.1 A3 : **aucun plafond final basé sur la preuve de payout**
- A3 vaut toujours 0 à 5 points de la somme des treize critères. **Il n'existe ni plafond 64, ni 69, ni 79 à la note finale.**
- L'absence de document bancaire indépendant privé n'est PAS une preuve de fraude ni un incident de payout en A2. Conserver A2=6 neutre tant qu'aucun historique hautement probant et aucun incident matériel corroboré n'est établi.
- Les sources de paiement on-chain, Rise, SEPA, prestataire ou attestations contrôlables sont évaluées avec un standard **réaliste et neutre entre canaux** : attribution raisonnablement corroborée à la firme et à un règlement de trader, méthode du tiers, dates / répétition; ne pas assimiler tout transfert fournisseur à une récompense trader. Réserver A3=5 aux historiques solides. Un manque de six maillons privés ne doit pas automatiquement jeter une preuve publique exploitable.
- Les limites d'indépendance sont documentées dans le dossier, sans retirer le même fait sur A2, C et D.

### 2.2 B1 : sanctionner une clause réelle, pas une enquête inachevée
- Les niveaux 0/3/6/9/12/15 restent disponibles. **B1≤3 exige la citation de la clause applicable permettant réellement une confiscation/annulation large de récompenses dues, ou une condition comparable**, avec produit, phase, version, impact et éventuel recours.
- Un contrat individuel funded non obtenu ne prouve ni que les récompenses sont garanties ni qu'elles sont arbitrairement confiscables. Si l'absence du document empêche la conclusion, marquer **« preuve critique manquante / score non publiable »** plutôt que publier 3/15 comme une infraction démontrée.
- Conserver les pénalités réelles, même pour FTMO, Topstep et grandes marques, si la clause applicable est effectivement établie et la conséquence correctement interprétée.

### 2.3 C1 / C2 / C3 : séparer **état juridique mauvais** de **vérification non exécutée**
- C1=4, C2=3, C3=2 peuvent être des scores de travail, PAS la preuve d'une société non enregistrée, dissoute ou sanctionnée.
- Prioriser extrait primaire du bon registre, bonne société vendeuse / cocontractante / agent, version des CGU et date. Quand la recherche primaire manque, demander le complément et **ne pas valider la nouvelle note finale**.
- Conserver un garde-fou légal **55 maximum uniquement** en cas d'identité contractante réellement non établie après recherche suffisante et conformément aux conditions de C1=0, ou radiation active non suspendue de la bonne contrepartie. Jamais parce qu'un vérificateur a sauté une recherche. Les fermées sont archivées hors classement.

### 2.4 B2, Trustpilot et double comptage
- B2 commence à 10. Retraits factuels : −3 contradiction actuelle même produit, −3 ambiguïté matérielle, −4 changement rétroactif défavorable, −3 asymétrie gains/pertes; total B2 plancher 0. Un fait = un seul malus, ne pas pénaliser la même perte en B1 et B2.
- Trustpilot **−6 une seule fois**, et seulement si la notification officielle de rétention pour violation de règles est **actuelle**. Ce n'est ni un plafonnement à 64, ni une sanction d'une note moyenne d'avis.
- **Formule proposée** : final = min(100, max(0, somme des 13 sous-notes − pénalité TP unique), plafond juridique confirmé éventuel). **Aucun `min(..., 64/69/79)`.** Le modal « Editorial score – Restrictive rules – Trustpilot » doit reconstituer une seule fois les faits déjà inclus dans B2.

## 3. Gouvernance avant une nouvelle publication
1. **Rester sur la version publique restaurée tant que les nouveaux dossiers n'ont pas de validation.** Le dépôt `main` au 24/11 contient encore les plafonds probatoires V5.2, même si la production a été redirigée sur un déploiement stable avec la mise à jour des promotions Black Friday. Ne jamais redéployer `main` aveuglément.
2. Pour tout dossier avec une preuve critique non obtenue (contrat des rewards, entité payeuse / registre de l'entité courante), **geler la nouvelle note** : conserver la dernière note approuvée avec sa date/version ; ne jamais représenter une note de travail à confiance faible comme une note finale.
3. Commencer par **FTMO, Topstep, The5ers, FundedNext, MyFundedFutures, FXIFY, Take Profit Trader, Audacity Capital, Alpha Capital Group, Apex**. Auditer les 13 éléments avec dates, contrats, preuves et clause négative unique.
4. Backtest à **corpus documentaire strictement constant**, puis backtest après revue de sources. Toujours publier côte à côte : ancienne note, proposition brute, déductions uniques, nouvelle note potentielle, source de chaque variation, confiance interne et statut d'approbation.
5. Signaler toute variation de **±10 points** pour revue éditoriale manuelle; ne pas auto-publier. Déclencher un contrôle de distribution si aucun score ne dépasse 70 ou si toutes les grandes firmes se concentrent artificiellement vers 60, **sans forcer** une moyenne ou un quota de bonnes notes.
6. Tests CI: absence de limites 64/69/79; formule à l'identique pour 121 sources historiques; Trustpilot une seule fois; cohérence score / modal / 15 langues; non-publication des propositions; CK Capital inchangée sauf décision explicite; promos et liens sponsorisés inchangés.
7. Seulement ensuite approuver **barème + décisions individuelles séparément**, construire une prévisualisation Vercel, valider les profils clés, puis publier un déploiement à partir d'un commit unique revu.

## 4. Exemples (dossiers à revérifier, PAS de nouvelles notes)
| Firme | Note précédente enregistrée | V5.2 publiée le 23/11 | Suppression du seul cap A3 | Conclusion |
| --- | ---: | ---: | ---: | --- |
| FTMO | 90 | 62 | 62 | B1 / A2 / C1-C3 / A3 à recouper |
| Topstep | 81 | 64 | 64 | Manque surtout de preuves et contrat |
| The5ers | 78 | 64 | 64 | Clauses réelles à vérifier; plafond pas déterminant |
| FXIFY | 67 | 69 | 72 | Cap + discordances contractuelles |
| Take Profit Trader | 73 | 64 | 74 | Cap réellement actif malgré score brut 74 |
| Audacity Capital | 77 | 50 | 50 | Forte variation indépendante du plafond |

**Décision à prendre :** valider ou ajuster cette *méthode* après contre-audit. **Aucun chiffre proposé ici n'est une nouvelle note publique.** Le barème existant `SCORING_V5_2.md` et les calculs de `main` restent des pièces historiques, pas la politique corrigée définitive.
