# PROP RADAR TECH — BARÈME V5.2 CANDIDAT / PROTOCOLE DE VALIDATION

**Statut : CANDIDAT — NON VALIDÉ / NON PUBLIÉ** · 21 novembre 2026.

## Mission
Évaluer le risque pour un trader achetant une évaluation ou un compte simulé. Les relations commerciales et l'affiliation ne changent jamais la note. Les preuves doivent être rattachées à la bonne entité, au bon produit et à la bonne phase. Pas de double imputation.

## Cinq piliers et treize sous-critères
Conserver les 13 critères et les plafonds de chaque pilier du référentiel `SCORING_V5.md` : A paiements 25, B protection contractuelle 25, C identité juridique 20, D transparence 20, E historique et support 10. Tous les sous-critères inchangés conservent leur grille V5. Le présent document remplace UNIQUEMENT les grilles A2, B1, B2 et les plafonds probatoires.

### A2 — incidents et historique de paiement (0/2/4/6/9/10)
- 10 : historique régulier indépendamment documenté sur 24 mois, sans incident grave non résolu.
- 9 : historique régulier indépendamment documenté sur 12 mois avec deux dates espacées d'au moins six mois.
- 6 : **palier neutre** en l'absence d'incident matériel suffisamment corroboré ET en l'absence d'historique indépendant suffisant pour 9 ou 10. Cela ne prouve pas la fiabilité.
- 4 : deux retards corroborés dépassant les délais contractuels de 14 jours ou un incident sérieux isolé non résolu.
- 2 : refus injustifiés indépendamment corroborés ou incident récurrent touchant plusieurs clients.
- 0 : arrêt ou incapacité généralisée de payer confirmé par des sources fiables.
La qualification d'incidents est fondée sur des cas distincts et datés. Pour les simulations de migration depuis V5, les notes anciennes 0/2/4/6 restent identiques, 8 devient 6, 9 et 10 restent identiques. Cette migration n'est PAS un nouvel audit des incidents.

### A3 — preuves positives de paiement (0 à 5)
Conserver la grille V5, avec vérification stricte de la chaîne de preuve et du périmètre produit. Une capture de la firme ou un témoignage non authentifié n'est pas une preuve indépendante.

### B1 — protection des récompenses (0/3/6/9/12/15)
- 15 : motifs limités et objectifs, recours explicite, aucune large discrétion sur les gains acquis.
- 12 : motifs limités et objectifs, sans recours formalisé.
- 9 : appréciation étroite de violations définies, motivation ou réexamen possible.
- 6 : pouvoir large de sanction du compte, sans confiscation discrétionnaire explicite des récompenses acquises.
- 3 : pouvoir large de retenir, recalculer ou supprimer les récompenses sans critères suffisamment objectifs.
- 0 : perte de récompenses acquises pour toute raison sans véritable recours, ou rémunération laissée au bon vouloir unilatéral.
Si CGU pertinentes introuvables : 6 provisoire et confiance faible, sans présumer que la clause n'existe pas.
Migration mécanique V5 → V5.2 : 0→0, 2→0, 5→3, 8→6, 11→9, 13→12, 15→15. Vérifier ensuite le contrat réel, particulièrement les clauses de discrétion.

### B2 — équité des règles de trading (0 à 10)
Partir de 10. Retirer :
- −3 par contradiction matérielle entre sources officielles actuelles sur le même programme ;
- −3 par clause de trading matériellement vague permettant sanction sans seuil objectif ;
- −4 par changement rétroactif défavorable sur un compte existant ;
- −3 par règle exceptionnellement asymétrique qui supprime les profits mais conserve les pertes de la même catégorie.
Plancher 0. **Un même fait ne peut être déduit qu'une seule fois**, ni être compté en B1 et B2 pour le même risque. Ne pas sanctionner une restriction ordinaire, chiffrée et annoncée du seul fait qu'elle est exigeante. Conserver dans le dossier le programme, la phase, la clause, la conséquence et l'URL officielle.

## Calcul et plafonds
1. BRUT = somme des 13 sous-notes (maximum 100).
2. Retirer −6 uniquement si Trustpilot affiche actuellement l'avis officiel de non-respect de ses règles ; jamais pour une simple note faible.
3. Plafond probatoire selon A3 : 0–1 → 64 ; 2 → 69 ; 3 → 79 ; 4–5 → aucun plafond probatoire.
4. Conserver le plafond juridique V5 à 55 si C1=0 après recherche suffisante ou radiation active non suspendue de la bonne partie contractante. Les firmes fermées sont archivées, non classées.
5. FINAL = max(0, min(BRUT − pénalité Trustpilot, plafond probatoire, plafond juridique éventuel)).
6. **Pas de plafond d'âge autonome**. Les jeunes firmes subissent les mêmes exigences probatoires et contractuelles. E1 continue à mesurer leur ancienneté vérifiable.
7. Les plafonds sont des garde-fous, pas des soustractions cumulées.

## Affichage public
Préserver le modal validé : **Editorial score** en premier, puis **Restrictive rules**, avec cartes compréhensibles par produit/phase, conséquence concrète et source officielle. Afficher confiance et limites probatoires, sans multiplier les malus dans l'interface.

## Protocole de validation obligatoire
- Phase 1 : comparer V5 / V5.1 / V5.2 sur les mêmes 20 dossiers, à corpus constant. Fichier machine : `app/data/scoring-v52-backtest-20-2026-11-21.json`.
- Phase 2 : contre-vérifier à la source les cinq dossiers sensibles : Take Profit Trader, BluSky Trading, Apex Trader Funding, FXIFY et Lucid Trading. Vérifier A3, A2, B1, B2 et l'entité/programme ; refaire les calculs si les faits changent.
- Phase 3 : ajouter des jeunes firmes aux données de validation pour tester l'équité du plafond et vérifier les cas de fermeture/contrat introuvable.
- Phase 4 : Claude et ChatGPT appliquent la même grille au même corpus ; rapprocher chaque divergence critère par critère.
- Phase 5 : **validation explicite avant modification de `SCORING_V5.md` et avant publication des nouvelles notes**. Ne pas changer le barème simplement pour obtenir une moyenne cible.

## Limites de ce backtest
La migration est mécanique et ne prouve pas que les anciennes notes A3 ou B1 sont exactes. Une note élevée avec preuve A3=5 doit être contrôlée sur l'entité et le programme précis. Les vingt notes ont toutes baissé parce que les règles candidates ont été resserrées : cela ne suffit pas à démontrer que le V5.2 est juste.

## Statistiques du backtest (20 dossiers)
Moyenne V5 : 66,85 ; moyenne V5.2 : 62,40 ; scores ≥70 : 6 en V5 et 3 en V5.2. 20 baisses, aucune hausse. Les scores V5.2 ne sont pas encore des scores publics approuvés.
