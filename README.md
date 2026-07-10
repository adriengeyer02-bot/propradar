# PropRadar

Comparateur Next.js pour analyser les prop firms, leurs produits, leurs règles et leurs signaux de confiance.

## Lancer le site

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

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
- Les firms à risque ou fermées doivent rester présentes dans le radar.
- Une firme affiliée garde ses faiblesses affichées.

## Avis et payouts

Le bloc `reviewSignals` sépare les avis publics du score global.

- `redditScore` mesure le signal communautaire, les plaintes récurrentes et la stabilité des retours.
- `trustpilotReliabilityScore` ne reprend pas aveuglément la note Trustpilot : il la pondère avec incidents, preuves de payout et transparence.
- `payoutRiskScore` monte quand il y a retards, refus, règles de retrait confuses, fermeture ou alertes opérationnelles.
- `manipulationRiskScore` estime le risque qu’une note publique soit trop marketing, trop récente ou incohérente avec les retours traders.
- Les `redditFlags`, `trustpilotFlags`, `confidenceDrivers` et `radarVerdict` expliquent le score au visiteur au lieu d’afficher une note opaque.
- Les cas critiques doivent être renseignés manuellement plutôt que laissés au calcul par défaut.

## Couverture universe

Le fichier `app/lib/propFirms.ts` contient une base coeur détaillée et une extension `universePropFirms`.

- La base coeur garde les fiches les plus travaillées.
- L’extension universe sert à couvrir très largement le marché sans sur-vendre les firms peu vérifiées.
- Une nouvelle firm universe doit avoir au minimum un site officiel ou une source de veille, un statut prudent et un score conservateur.
- Les firms universe doivent passer en fiche coeur seulement après revue approfondie des règles, payouts et avis.
