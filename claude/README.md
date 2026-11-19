# Claude — consignes prioritaires de scoring PropRadar

*Décision d'Adrien Geyer, 19 novembre 2026. À lire avec `AGENTS.md`, `CLAUDE.md` et surtout le barème canonique `SCORING.md`.*

## Nouvelle grille sur 100 : chantier de migration approuvé

Adrien a aussi validé une **refonte complète** du calcul : **paiements 35 / règles contractuelles 30 / juridique 15 / intégrité commerciale 10 / offre 10**. La grille détaillée, les fourchettes de sévérité et la séparation « niveau de preuve / gravité du risque » sont dans **`SCORING_V2.md`** ; le calcul candidat et ses tests sont dans `app/lib/scoringV2.ts` et `scripts/test-scoring-v2.ts`.

**Important :** ce barème est approuvé mais **n'est pas encore le calcul du site**. Le guide ci-dessous (−6, plafond supprimé, `computeRulesPenalty` à 12) décrit la **transition de l'ancien moteur**, pas les 30 points contractuels du nouveau. Ne jamais soustraire la pénalité de règles historique de 12 **et** une nouvelle sous-note de règles à 30 sur le même fait.

Le recensement `claude/scoring-v2-coverage-2026-11-19.md` classe **197 firmes** par disponibilité apparente des sources (159 non fermées, 38 fermées). Parmi les 159, **106** ont encore un risque payout « non évalué » ; **12** seulement portent une référence de payout déclarée indépendante, à authentifier. Les coches du tableau ne prouvent **ni** l'indépendance **ni** l'actualité des pièces. Auditer les contrats, retraits, registres et offres firmes par firmes, puis soumettre les variations sensibles à Adrien **avant** mise en production. Si une catégorie manque, classer la note **provisoire / non publiable** : ne pas inventer 35 points de paiement parce qu'aucun incident n'est connu.

Un dossier de société doit détailler les cinq sous-notes, les URL exactes, les faits uniques et la confiance A/B/C. Audacity Capital reste un **cas de contrôle prioritaire** : contrat et Knowledge Center publient des minimums de jours contradictoires, et le signal Trustpilot actuel vaut −6 **une fois** ; ses 72/100 ci-dessous ne sont qu'un calcul sous **l'ancien moteur**, pas une nouvelle note sur 100.

## Barème définitivement validé

- **Trustpilot = −6 points exactement une fois**, uniquement lorsqu'une suppression de note liée à un manquement aux règles ou à un retrait de faux avis est **actuellement documentée par Trustpilot** et qu'il n'est pas déjà incorporé dans le score éditorial.
- **Aucun plafond Trustpilot à 64/100.** Les anciennes règles −8 ou « score maximal 64 » sont **abrogées**, y compris lorsqu'une PR en cours les contient.
- **Pas de cumul de sanctions pour un même fait.** Note suspendue, avis retirés et avertissement correspondant = un événement ; une clause contractuelle litigieuse ne se déduit pas aussi une seconde fois au titre de la transparence et des paiements si ce sont les mêmes faits. Des incidents indépendants, bien sourcés, peuvent justifier des ajustements distincts, tracés et chiffrés.
- **Priorité éditoriale :** paiements injustement refusés **lorsque cela est établi**, clauses opaques laissant annuler les gains, changements rétroactifs portant sur les droits du trader et pratiques trompeuses **prouvées**. Une plainte individuelle non tranchée reste une allégation, pas une preuve d'abus.
- **Jeune entreprise : aucune pénalité d'âge automatique.** Mentionner l'absence de recul ou de preuves comme niveau de confiance limité.
- **Fermeture confirmée :** statut clairement affiché, exclusion des classements actifs, conservation de l'audit historique et plafond opérationnel de 29 selon `SCORING.md`.
- **Règles contraignantes :** conserver la classification par gravité, clarté et programme de `SCORING.md`, au plus 12 points via `computeRulesPenalty`. Le switch est actuellement activé. Ne pas soustraire la même clause manuellement.

## Application aux audits en cours

1. Examiner le dossier exhaustif `claude/trustpilot-withheld-audit-2026-11-19.md` : **39** profils encore masqués, plus **Blue Guardian** dont l'alerte est de nouveau active après une levée ancienne. La page actuelle de **Get Leveraged** conserve une note visible : ne pas lui appliquer la sanction « note suspendue ».
2. Pour chaque société, identifier si la pénalité Trustpilot était **déjà comprise** dans un `set.score` manuel. Si l'ancienne pénalité **−8** y a été intégrée, restaurer les **2 points** excédentaires lors d'un réaudit daté, sans neutraliser des déductions séparées et justifiées.
3. Lorsqu'un score éditorial manuel n'indique pas explicitement avoir inclus la pénalité, **ne pas présumer** qu'elle a été déduite. Le code doit appliquer −6 une seule fois avec un indicateur explicite, pas selon la seule présence de `set.score`.
4. Le panneau de calcul doit montrer le **score éditorial → règles calculées → Trustpilot −6 (ou déjà inclus) → fermeture éventuelle → score final**. La même note doit être affichée dans chaque langue, fiche, radar, comparateur et classement.
5. **AudaCity Capital :** avec 79 points éditoriaux et −1 de règles calculées, le résultat est **72/100** après Trustpilot −6, avant tout autre ajustement contractuel indépendamment documenté. Ne pas confondre avec les anciennes simulations 64, 70 ou 71.
6. Vérifier les sources originales de la FAQ/CGV par programme avant d'augmenter des sanctions de règles. Ne jamais attribuer à une prop firm l'achat d'avis faux sans preuve indépendante de responsabilité.
7. Valider le JSON et les traductions des règles, faire tourner TypeScript et le build Next.js, vérifier CI Vercel et obtenir l'accord d'Adrien pour les changements sensibles.

## Collaboration GitHub

**Attention aux PR en attente :** #147 et #148 utilisent encore le barème −8 ; #148 porte des audits sensibles et modifie la logique de score. #158 touche `CLAUDE.md` et le `README.md` racine. Les faire correspondre à **−6**, sans plafond et sans double comptage, **avant** toute fusion. Ne pas éditer en parallèle les fichiers déjà modifiés par ces PR : ajouter une remarque sur la PR propriétaire et coordonner sa mise à jour (voir `AGENTS.md`).

Les instructions de `SCORING.md` et de ce document prévalent sur toute version obsolète du calcul dans une branche non fusionnée. La décision autorise le changement de barème, **pas** l'approbation automatique de dix nouvelles notes éditoriales sans revue.
