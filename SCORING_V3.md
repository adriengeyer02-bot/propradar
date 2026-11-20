# PropRadar — barème V3 partagé, 100 points

> **ARCHIVE / NE PLUS UTILISER POUR LES NOUVELLES NOTES.** Adrien Geyer a
> remplacé le 20 novembre 2026 cette répartition 40/25/15/15/5 par le
> **barème 25/35/15/15/10** de [`SCORING_V4.md`](SCORING_V4.md).
> Le calculateur `app/lib/scoringV3.ts` n'est pas branché aux notes publiques
> et ne doit pas être activé. Consignes courtes pour Claude :
> [`claude/README-SCORING-FINAL-2026-11-20.md`](claude/README-SCORING-FINAL-2026-11-20.md).

**Décision d'Adrien, 20 novembre 2026 : sévère sur les risques de payouts,
juste sur les restrictions de trading.** Cette grille cible le recalibrage
des 197 fiches. Elle est distincte du barème historique de `SCORING.md`
tant que la migration et les preuves par fiche ne sont pas terminées.

## Un score, cinq blocs et quinze critères

| Bloc | Max | Critère | Max |
| --- | ---: | --- | ---: |
| **A — Payouts** | **40** | Paiements réels étayés par des sources datées, indépendance des preuves explicitée | **18** |
| | | Conditions et délais de retrait lisibles, cohérents entre documents | **12** |
| | | Examen documenté des refus de payout : ne pas confondre absence de preuve et absence d'incident | **10** |
| **B — Contrat** | **25** | Cohérence CGU/FAQ/page du programme, exceptions correctement attribuées | **10** |
| | | Protection des récompenses contre des annulations discrétionnaires et subjectives | **10** |
| | | Stabilité des droits sur programmes déjà achetés, absence de modification rétroactive démontrée | **5** |
| **C — Identité** | **15** | Personne morale contractante reliée à un registre indépendant | **7** |
| | | Adresse, droit applicable et voies de recours lisibles | **3** |
| | | Avertissements régulateurs directement pertinents, vérifiés dans leur contexte | **5** |
| **D — Offre** | **15** | Prix catalogue et frais complets comparables, hors coupon partenaire | **5** |
| | | Profit split et fréquence des retraits documentés | **5** |
| | | Drawdown et limites expliqués par programme, notamment statique/suiveur | **5** |
| **E — Historique** | **5** | Continuité d'activité étayée (pas de bonus d'ancienneté automatique) | **2** |
| | | Avis consommateurs datés, pondérés et sourcés | **1** |
| | | Stabilité de la plateforme et des prestataires | **2** |

### Traduction systématique en points

- **Fait vérifié** : de 0 au maximum du critère selon la qualité de la preuve.
  Toute note autre que la moitié exige une source HTTPS et une justification.
- **Non vérifié** : **50 % des points du critère**, jamais zéro du seul fait
  qu'une firme est jeune ou peu documentée. Ce demi-crédit est un traitement
  neutre, **pas une preuve de fiabilité**. La fiche doit indiquer « audit à
  compléter » ; elle ne doit pas se présenter comme une note définitive.
- **Aucune pénalité d'ancienneté**, aucune prime d'affiliation, de promotion
  ni de volume de publicité. Ne jamais déduire une faute d'un avis isolé.
- Un agrégat de transactions crypto observées par un tiers prouve les
  transactions observées, pas que **tous** les retraits ont été honorés.
  Les chiffres déclarés par la firme restent identifiés comme tels.

### Quel fait compte où ?

- **Règle de consistance, news, taille de position, levier, drawdown :**
  lorsque l'interdiction et sa sanction sont précises, accessibles et
  rattachées au bon programme, elles vont dans le menu « règles » et dans
  les caractéristiques de l'offre. **Pas de malus automatique.**
- **Clause qui autorise la perte d'une récompense sur une notion floue**
  (`gambling`, « stratégie non viable », « à notre seule discrétion ») :
  **B2**. Une clause unique couvrant plusieurs interdictions n'est évaluée
  qu'une fois. Le simple pouvoir contractuel **ne prouve pas** un refus vécu.
- **Refus de payout injustifié établi par des preuves fiables, distinctes
  du texte contractuel** : **A3**. Une plainte non tranchée ou un score
  Trustpilot dégradé ne démontre pas cette faute.
- **Changement rétroactif de droits établi** : **B3**, sans recompter le
  même épisode en A ou dans la transparence.
- **Alerte Trustpilot active, attribuée à des manquements aux règles de
  plateforme et vérifiée à la source** : retrait final **−6 une seule fois**,
  sans plafond de score. La sous-note E2 n'enlève pas aussi des points pour
  ce **même** avis ; la responsabilité de la société dans les faux avis ne
  peut être affirmée sans preuve indépendante.
- **Fermeture confirmée** : score opérationnel plafonné à **29**, firme
  exclue des classements actifs, historique conservé.

Chaque constat négatif reçoit un **identifiant de fait unique** et **un seul
critère propriétaire**. Deux griefs véritablement indépendants peuvent
réduire deux critères distincts, à condition d'avoir deux faits et des
preuves distinctes. Le panneau public montre les **cinq blocs**, un total,
et au plus quelques explications accessibles ; les CGU complètes restent
dans les menus par programme.

## Validation avant une nouvelle note publique

Le calculateur `app/lib/scoringV3.ts` refuse :

1. un critère absent, au-delà de son maximum ou sans source pour une valeur
   confirmée ;
2. un crédit autre que la moitié pour une information non vérifiée ;
3. un même identifiant d'incident attribué à plusieurs critères ;
4. une sanction Trustpilot sans source Trustpilot et date ;
5. l'étiquette « prête à publier » sans preuve officielle de la politique
   payout, des règles, de l'entité et de l'offre, ni source d'avis ;
6. la présentation comme « audit complet » lorsqu'un critère reste non vérifié.

Les 197 lignes du recensement dans `claude/scoring-v3-all-firms-preview-2026-11-20.csv`
**ne sont pas des scorecards V3**. L'opération mécanique « enlever l'ancien
malus » ne remplace pas la revue A/B/C/D/E. Ne pas déployer cette opération
en masse tant que les scores à risque ne sont pas réconciliés, notamment
Apex, FundedNext, The5ers et FTUK. L'audit de Claude est conservé en entier.

Toute hausse ou baisse sensible doit être traçable dans un tableau avant/
après et validée par Adrien. Les PR ouvertes sur `firm-updates.json` restent
prioritaires ; ne pas écraser les entrées que Claude audite actuellement.
