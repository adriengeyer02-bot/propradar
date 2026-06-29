# PropRadar

Comparateur Next.js pour analyser les prop firms, leurs produits, leurs règles et leurs signaux de confiance.

## Lancer le site

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

## Structure

- `app/page.tsx` : page d'accueil et positionnement.
- `app/comparateur/page.tsx` : comparateur filtrable.
- `app/firm/[slug]/page.tsx` : fiche détaillée par firm.
- `app/lib/propFirms.ts` : base de données éditable.
- `app/globals.css` : design global.

## Règle éditoriale

Les règles de prop firms changent vite. Pour garder la confiance, chaque nouvelle firm doit avoir :

- un statut clair : `Active`, `À surveiller` ou `Fermée` ;
- au moins une source officielle ;
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
- Les cas critiques doivent être renseignés manuellement plutôt que laissés au calcul par défaut.
