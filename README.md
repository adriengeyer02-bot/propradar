# PropRadar

Comparateur Next.js pour analyser les prop firms, leurs produits, leurs règles et leurs signaux de confiance.

## Lancer le site

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

## Langues et traduction

L'anglais est servi à la racine et les autres langues sous leur préfixe (`/fr`, `/sw`, etc.). Les langues actives sont définies dans `app/lib/locales.ts` et leurs textes dans `app/lib/messages/`.

- **Kiswahili (`sw`), hausa (`ha`) et amharique (`am`)** : traduction de l'accueil, du radar, du comparateur et des fiches prop firm, ajoutée le 18 novembre 2026. La navigation, les avertissements de fermeture et les mentions d'affiliation de ces écrans sont également localisés.
- Les interfaces des **outils, promotions, audits, règles contraignantes, risques de paiement et Radar Brief** ont été localisées dans ces trois langues lors d'une seconde passe. Les descriptions officielles des offres, les preuves d'audit et les articles du bulletin peuvent rester dans leur langue source. Seule la page outils est actuellement ajoutée aux routes entièrement localisées/indexables (`/tools`) ; les autres restent `noindex` tant que chaque détail éditorial n'a pas été revu.
- Les guides, documents juridiques et autres pages longues ne sont **pas encore traduits** dans ces trois langues : ils affichent le texte anglais avec un avertissement et ne sont pas indexés comme traductions (`isTranslatedPath` et `localeAlternates`). Ne pas étendre les `hreflang` sans traduction éditoriale complète et relecture.
- Les données factuelles, sources, prix, scores, formules et liens affiliés restent communs à toutes les langues. Une modification de traduction ne doit jamais altérer ces éléments.
- Avant de promouvoir davantage ces versions, faire relire les expressions techniques et les avertissements par des locuteurs natifs, notamment pour l'amharique.

## API Reddit et X/Twitter

Les signaux live sont lus côté serveur. Les clés ne doivent jamais être exposées dans le navigateur.

Variables à ajouter dans Vercel :

- `REDDIT_CLIENT_ID` : identifiant de l'application Reddit.
- `REDDIT_CLIENT_SECRET` : secret de l'application Reddit.
- `REDDIT_USER_AGENT` : user-agent descriptif, par exemple `PropRadar/1.0 by propradar`.
- `X_BEARER_TOKEN` : bearer token de l'API X.

Routes disponibles :

- `/api/signals/firm/ftmo` : Reddit + X/Twitter pour une firm.
- `/api/signals/reddit?slug=ftmo` : Reddit seulement.
- `/api/signals/x?slug=ftmo` : X/Twitter seulement.

Si une clé manque ou si l'API refuse la requête, PropRadar retombe automatiquement sur le score estimé déjà stocké dans `reviewSignals`.

## Structure

- `app/page.tsx` : page d'accueil et positionnement.
- `app/comparateur/page.tsx` : comparateur filtrable.
- `app/firm/[slug]/page.tsx` : fiche détaillée par firm.
- `app/promos/page.tsx` : promos et bons plans évaluations avec logique consommateur.
- `app/regles/page.tsx` : règles sensibles et changements récents.
- `app/lib/propFirms.ts` : base de données éditable.
- `app/globals.css` : design global.

## Options prop firms — rubrique du 18 novembre 2026

- `/options-prop-firms` : nouvelle rubrique de recherche sur les prop firms d'options cotées ; `/options-prop-firms/[slug]` : sept dossiers sourcés, cinq programmes d'évaluation et deux desks professionnels.
- `app/lib/optionsFirms.ts` : source de vérité séparée pour les offres, leurs règles documentées et les liens officiels. Le niveau de preuve est **une offre annoncée par la firme**, pas une validation de sa fiabilité.
- `app/lib/optionsI18n.ts` : interface dédiée aux 15 langues ; les faits issus des sources officielles restent en anglais original dans les fiches afin de préserver la traçabilité.
- `app/lib/optionsGlobe.ts` : marqueurs de recherche « non noté » sur un secteur **Options** du globe d'accueil et du radar. Ces marqueurs ne rentrent **pas** dans les moyennes, classements ou statistiques de score du radar ; la latitude est seulement une position d'affichage.
- Les nouvelles firmes apparaissent aussi dans la recherche globale et depuis le comparateur, mais pas dans son classement par score tant qu'elles ne sont pas auditées.
- **Aucune note sur 100 n'a été attribuée** : seuls les programmes et quelques restrictions officielles ont été collectés. Une future inclusion dans `propFirms.ts` exige l'audit complet juridique, payout, produits, restrictions et avis, puis validation éditoriale d'Adrien.

## Règle éditoriale

Les règles de prop firms changent vite. Pour garder la confiance, chaque nouvelle firm doit avoir :

- un statut clair : `Active`, `À surveiller` ou `Fermée` ;
- au moins une source officielle ou une source de veille clairement nommée ;
- des forces et faiblesses concrètes ;
- une date `lastReviewed` ;
- des produits séparés des signaux de risque.

## Monétisation

PropRadar peut utiliser de l’affiliation sur les firms jugées fiables, mais l’affiliation ne doit jamais modifier le score.

- Le champ `commercialRelationship` doit rester explicite.
- Le lien affilié doit être visible côté fiche.
- Les firmes à risque restent visibles dans les listes comparatives ; les firmes fermées restent consultables uniquement en archives, jamais proposées à l'achat.
- Une firme affiliée garde ses faiblesses affichées.

## Avis et payouts

Le bloc `reviewSignals` sépare les avis publics du score global.

- `redditScore` mesure le signal communautaire, les plaintes récurrentes et la stabilité des retours.
- `trustpilotReliabilityScore` ne reprend pas aveuglément la note Trustpilot : il la pondère avec incidents, preuves de payout et transparence.
- `payoutRiskScore` monte quand il y a retards, refus, règles de retrait confuses, fermeture ou alertes opérationnelles.
- `manipulationRiskScore` estime le risque qu’une note publique soit trop marketing, trop récente ou incohérente avec les retours traders.
- Les `redditFlags`, `trustpilotFlags`, `confidenceDrivers` et `radarVerdict` expliquent le score au visiteur au lieu d’afficher une note opaque.
- Les cas critiques doivent être renseignés manuellement plutôt que laissés au calcul par défaut.
- Pour une fermeture documentée (`status: Fermée`), la note opérationnelle affichée est plafonnée à **29/100**. L'ancienne note éditoriale reste conservée dans les données et l'historique : cette limite indique seulement qu'une offre fermée ne peut plus être recommandée à l'achat.
- Un avertissement Trustpilot sur le retrait de faux avis justifie une pénalité éditoriale de **8 points au maximum** lorsque l'avis est documenté et actuel ; le plafond de 64/100 pour une note Trustpilot retenue reste une règle distincte. Ne pas attribuer les refus de retrait ou les faux avis à une firme sans source primaire ou corroboration.

## Couverture universe

Le fichier `app/lib/propFirms.ts` contient une base coeur détaillée et une extension `universePropFirms`.

- La base coeur garde les fiches les plus travaillées.
- L’extension universe sert à couvrir très largement le marché sans sur-vendre les firms peu vérifiées.
- Une nouvelle firm universe doit avoir au minimum un site officiel ou une source de veille, un statut prudent et un score conservateur.
- Les firms universe doivent passer en fiche coeur seulement après revue approfondie des règles, payouts et avis.

## Mises à jour automatiques

- `app/data/firm-updates.json` : mises à jour datées et sourcées, appliquées par-dessus `propFirms.ts` et affichées dans l'« Update history » de chaque fiche.
- `scripts/validate-firm-updates.ts` : valide ce fichier et signale les changements sensibles (statut, forte variation de score, alerte de domaine, nouvel incident), qui demandent une validation humaine.
- `scripts/check-domains.ts` + workflow `Domain monitor` : vérifie chaque jour les sites officiels et ouvre une issue GitHub en cas de changement.
- Un agent Claude hebdomadaire met à jour une douzaine de firmes, ouvre une PR, et ne fusionne seul que les changements non sensibles. Règles dans `CLAUDE.md`.
