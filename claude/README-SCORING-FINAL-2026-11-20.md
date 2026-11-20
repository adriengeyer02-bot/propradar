# Claude — consigne prioritaire, barème PropRadar définitif

**Adrien Geyer a validé le 20 novembre 2026 le barème 25/35/15/15/10 après
plusieurs calibrages. À appliquer pour la prochaine correction globale des
197 prop firms ; ne plus utiliser les variantes 40/25/15/15/5, 35/30/15/10/10,
le retrait automatique 0–12 des règles ou la règle Trustpilot −8/plafond 64.**

La spécification complète est `SCORING_V4.md`. Ce court README est volontairement
compact pour limiter le coût de lecture des agents.

## Une note sur 100 : cinq blocs

| Bloc | Points | Sous-critères |
| --- | ---: | --- |
| **A. Payouts** | **25** | Conditions/délais **10** ; refus injustifiés **établis** / historique des incidents **10** ; preuves positives de payouts **5**. |
| **B. Contrat et transparence** | **35** | Protection des récompenses contre les décisions arbitraires **15** ; cohérence FAQ/CGU/programme **8** ; stabilité des droits/absence de changement rétroactif établi **7** ; règles facilement accessibles par programme **5**. |
| **C. Identité et légal** | **15** | Entité contractante **8** ; adresse/droit applicable/recours **4** ; avertissements de régulateurs pertinents et vérifiés **3**. |
| **D. Offre** | **15** | Prix catalogue et frais **5** ; profit split et valeur de l'offre **5** ; drawdown et fonctionnement par programme **5**. |
| **E. Historique et réputation** | **10** | Continuité d'exploitation démontrée **4** ; avis consommateurs datés et contextualisés **3** ; stabilité des plateformes/prestataires **3**. |

## Les règles de jugement (ne pas improviser de malus)

1. **Pas de déduction automatique pour une règle normale et clairement
   publiée** : consistance, levier, risque par trade, news trading, minimum
   de jours, drawdown, détention week-end, etc. Les afficher dans les menus
   existants par programme avec leur conséquence et leur URL.
2. **Être exigeant sur les droits aux gains** : clause subjective permettant
   de retenir un payout, définition vague de `gambling`/`not viable`, pouvoir
   unilatéral de supprimer des gains ou changement rétroactif. Noter cela
   dans **B**, une fois par fait et dans le bon programme. La présence d'une
   clause **ne prouve pas** qu'elle a été utilisée abusivement.
3. **Un refus injustifié de payout est sanctionné en A seulement s'il est
   étayé par des preuves fiables et distinctes**. Un avis négatif, une plainte
   non tranchée ou une statistique auto-déclarée n'en sont pas la preuve.
4. **Les preuves positives de payout valent au plus 5 points**, pas 18.
   Une entreprise peut payer sans fournir de preuve tierce. Déclaration de
   l'entreprise = signal déclaré ; source indépendante = corroboration ;
   absence de preuve = *non vérifié*, pas accusation ni pénalité générale.
5. **Confiance de l'audit séparée de la note** : élevée/moyenne/limitée.
   **Abandon du réflexe « 50 % de tous les critères non vérifiés »** : ne
   pas fabriquer une note de 50/100 uniquement parce qu'un dossier est incomplet.
   Conserver la note précédente comme historique pendant les vérifications ;
   une note V4 définitive requiert les pièces minimales par axe.
6. **Trustpilot : −6 une seule fois** si la notice active de non-respect
   des règles est documentée par Trustpilot ; **aucun plafond 64**. Ne jamais
   attribuer l'achat de faux avis à une firme sans preuve. Ne pas réduire en
   plus E pour le même avertissement.
7. **Fermeture avérée** : fiche archive, hors classements actifs, score
   opérationnel au plus 29 ; conserver l'audit historique.
8. **Affiliation et promos n'ont aucun effet sur la note.** Ne jamais
   supprimer les audits contractuels, URL, traductions et changelogs existants.

## Travail concret pour les 197 fiches

- Partir des règles et sources déjà relevées dans `firm-updates.json` : ne
  **pas** relire indistinctement toutes les FAQ/CGU si l'audit récent est
  daté, complet et sa source toujours pertinente ; cibler les lacunes.
- Utiliser la matrice des 2 955 sous-critères en **PR #201** et le lot témoin
  de 10 firmes (PR #199/#201). Une URL candidate est une piste, pas une
  pièce vérifiée ; les anciens exemples B2 /10 ne sont **pas** directement
  transposables au nouveau B1 /15.
- Faire les 5 blocs sourcés, marquer « non vérifié » quand nécessaire,
  identifier chaque fait négatif une seule fois, conserver un avant/après,
  puis demander l'accord d'Adrien pour les variations sensibles.
- **Ne pas toucher aux entrées d'une firme déjà modifiées dans une PR ouverte.**
  Coordonner #147/#148/#150/#152/#192/#193 et la charte antérieure #186.
- Ne pas mettre en production le brouillon #199 : il retire mécaniquement
  l'ancien malus sans reconstituer les 5 blocs.

**Source de vérité pour le nouveau barème : `SCORING_V4.md`.** Les documents
`SCORING.md`, `SCORING_V3.md` et les PR historiques décrivent l'ancien
fonctionnement tant qu'ils ne sont pas réconciliés. Cette consigne de
transition n'autorise pas à publier 197 notes non vérifiées.
