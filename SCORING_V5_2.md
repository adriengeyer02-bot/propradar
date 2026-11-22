# PROP RADAR TECH — RÉFÉRENTIEL V5.2 CANONIQUE

**Décision éditoriale du 22 novembre 2026 : barème V5.2 validé dans son principe.** Ceci est le référentiel unique pour tous les nouveaux audits et les migrations, à la place de `SCORING_V5.md`, `SCORING_V4.md` et `SCORING.md`. **La validation du barème n'est pas une validation automatique de chaque note ni de chaque fermeture** : chaque fiche doit satisfaire l'exigence de preuve et le contrôle de publication.

**Appliquer la V5.2 à toute prop firm examinée, quelle que soit son origine Claude/ChatGPT/lot, mais jamais convertir un score hérité qui n'a pas ses 13 sous-critères sourcés.** En l'absence de données, `score=null` dans les dossiers de recherche, pas de faux score V5.2.

## Mission
Évaluer le risque pour un trader achetant une évaluation ou un compte simulé. Les relations commerciales et l'affiliation ne changent jamais la note. Les preuves doivent être rattachées à la bonne entité, au bon produit et à la bonne phase. Pas de double imputation.

## Cinq piliers et treize sous-critères
Conserver les 13 critères et les plafonds de chaque pilier du référentiel `SCORING_V5.md` : A paiements 25, B protection contractuelle 25, C identité juridique 20, D transparence 20, E historique et support 10. Tous les sous-critères inchangés conservent leur grille V5. Les grilles A1, A3, C1, C2, C3, D1, D2, D3, E1, E2 restent celles de `SCORING_V5.md`; la V5.2 remplace A2, B1, B2 et ajoute les plafonds probatoires. Ne pas changer les valeurs sans décision explicite.

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
- Phase 5 : **validation éditoriale explicite de chaque dossier sensible (statut, chute importante, hausse importante, sources insuffisantes) avant publication des nouvelles notes**. Ne pas changer le barème simplement pour obtenir une moyenne cible.

## Limites de ce backtest
La migration est mécanique et ne prouve pas que les anciennes notes A3 ou B1 sont exactes. Les 11 anciens dossiers V5 précédemment publiés font l'objet d'une migration contrôlée ; les 30 autres propositions migrées n'entrent pas automatiquement en production. Une note élevée avec preuve A3=5 doit être contrôlée sur l'entité et le programme précis. Les vingt notes ont toutes baissé parce que les règles candidates ont été resserrées : cela ne suffit pas à démontrer que le V5.2 est juste.

## Statistiques du backtest (20 dossiers)
Moyenne V5 : 66,85 ; moyenne V5.2 : 62,40 ; scores ≥70 : 6 en V5 et 3 en V5.2. 20 baisses, aucune hausse. Les scores V5.2 ne sont pas encore des scores publics approuvés.

## Définition opérationnelle OBLIGATOIRE des preuves de paiement A3 (canaux neutres)

**Ne pas privilégier un moyen de paiement.** Crypto/on-chain, Rise, virement bancaire SEPA/SWIFT, prestataire de paiement et audit bancaire suivent le même niveau de preuve. Un tracker commercial ou affilié peut fournir des données utiles, mais sa qualification d'« indépendant » doit être contrôlée : méthode documentée, échantillon traçable, attribution de l'adresse émettrice, et absence d'auto-déclaration non corroborée. Un hash public prouve une transaction on-chain, **pas automatiquement la dette du programme ni le bénéficiaire réel**.

### Pour reconnaître un règlement indépendant : chaîne de preuve en six maillons

1. **Entité payeuse** : identité légale du vendeur et de l'éventuel agent, preuve explicite de mandat de paiement ; ne pas confondre entité marketing, agent, broker et débiteur.
2. **Programme et phase** : lien à l'évaluation ou au compte funded précis, la récompense et la version contractuelle ; ne jamais transférer l'historique d'une division Forex/CFD vers Futures sans ventilation.
3. **Paiement effectif** : date, montant, référence de transaction, preuve de règlement **final** — non une demande initiée, un screenshot de dashboard, une facture, une transaction interne ou un transfert renversé.
4. **Bénéficiaire** : un commerçant, auditeur, organisme de paiement ou bénéficiaire disposant d'un moyen vérifiable d'attester le règlement, sans exposer ses données privées.
5. **Vérificateur indépendant** : contrôle réellement effectué par une personne/structure autre que la firme qui verse et son service marketing ; documenter intérêts financiers, frais et limites du tiers. La certification *auto-signée* ne suffit pas.
6. **Répétition et dates** : pour A3 4/5, échantillon multi-bénéficiaires et ≥6 mois ; pour A3 5/5, 12 mois de paiements liés à la firme, périodiquement vérifiables. **A2 9/10 exige en plus l'historique REGULIER daté** et l'absence d'incident grave non résolu, sans assimiler A3 à A2.

### Pièces bancaires acceptables

- **Très probantes** : attestation signée et vérifiable directement auprès d'un auditeur/comptable indépendant explicitant la période, le nombre de paiements effectivement compensés, les montants agrégés et l'échantillonnage multi-bénéficiaires ; rapprochement de données bancaires originales, autorisation de contact et méthode datée.
- **Probantes si corroborées** : relevés bancaires partiellement caviardés examinés par un tiers identifiable et indépendant, avec rapprochement des transactions côté payeur et bénéficiaire, références SEPA/SWIFT (ex. UETR) ou confirmations d'établissement de paiement authentifiées hors du canal de la firme ; une copie PDF isolée n'est pas automatiquement authentique.
- **Preuves intermédiaires** : confirmation d'un bénéficiaire indépendant et vérifiable, sur une ou plusieurs dates, avec preuve du dénouement bancaire ; niveau A3=2 ou 3 selon nombre, attribution et authenticité.
- **Preuves insuffisantes à elles seules** : captures de « payouts », historiques internes, témoignages non authentifiés, avis Trustpilot, montants annoncés par la firme, logos d'auditeur sans rapport public, transferts on-chain sans attribution de l'émetteur ou du programme, simples factures ou demandes de retrait.

**Confidentialité :** ne jamais publier relevés non caviardés, IBAN, KYC, pièces d'identité, coordonnées privées, ou adresses personnelles de bénéficiaires. Publier uniquement la méthode, les dates, l'échantillon et la conclusion; conserver les preuves sensibles hors dépôt public, et ne pas les demander à une firme par un canal non sécurisé.

### Refus et contre-preuves

Un refus de communiquer des documents privés n'est PAS un incident A2 ni une présomption de fraude. A2 neutre = 6 dans ce cas. Une entreprise peut soumettre des attestations tierces, y compris bancaires. Les plafonds probatoires 64/69/79 restent applicables tant que la vérification est insuffisante ; **aucun assouplissement discrétionnaire à 68/72** n'est autorisé sans nouvelle décision et backtest.

## Discipline d'audit et de publication

- Toujours renseigner les **13 notes sourcées**, leur contexte et les identifiants de faits négatifs uniques ; représenter les règles B2 par clause, phase, programme, effet concret et URL officielle.
- Sous-notes A2 permises **0/2/4/6/9/10**, B1 **0/3/6/9/12/15**, C1 **0/4/7/10**, C2 **0/2/3/4/6**, C3 **0/2/4**, E1 **0/1/2/4/6** ; autres sous-notes selon leurs éléments binaires. Les exceptions doivent être justifiées par la grille, jamais « au feeling ».
- La pénalité Trustpilot −6 ne s'applique qu'avec une rétention/suppression de note **actuellement visible**, jamais pour une simple mauvaise note ou une suspicion.
- **Séparation des responsabilités :** calcul sur 100 → déduction B2 *intégrée* au pilier B (l'affichage « Editorial Score » / « Restrictive Rules » ne retire rien une seconde fois) → −6 Trustpilot une fois → plafonds A3 et juridique min() → final.
- Toute migration automatique doit rester marquée **« recalcul sur corpus antérieur — preuve à recontrôler »**, tant que les vérifications A3, B1, entité et contrat du produit actuel ne sont pas achevées. Aucune publication d'un dossier nouveau sans pièce et sans approbation de la note si changement sensible.
- **Périmètre :** la file prioritaire historique 122 ne représente pas nécessairement toutes les fiches du site. Ne pas prétendre que 41 conversions = 41/122 : six audits annexes n'appartiennent pas à cette file; contrôle actif réel et programme requis.
