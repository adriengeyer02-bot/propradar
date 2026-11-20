# Suivi V5 — 122 dossiers à harmoniser

À la demande d'Adrien du **20 novembre 2026**, ChatGPT prend aussi les **56 dossiers N01–N03** auparavant confiés à Claude, en plus des **66 dossiers C01–C04**. Même barème `SCORING_V5.md`, même standard de preuve et même contrôle de non-cumul.

| Ensemble | Dossiers dans la file | Fiches V5 complètes | En attente V5 |
| --- | ---: | ---: | ---: |
| C01–C04, repris de ChatGPT | 66 | 2 (Alpha Capital Group, Maven Trading) | 64 |
| N01–N03, repris de Claude | 56 | 2 (Get Leveraged, Alpha Futures) | 54 |
| **Total** | **122** | **4** | **118** |

Les quatre fiches sont assorties de 13 notes sourcées, du détail de chaque retrait B2, de l'état Trustpilot, d'une confiance d'audit et de l'ancienne note. La demande de publication d'Adrien est enregistrée dans `app/data/scoring-v5-published.json` par **slug + date + score V5 final**. Les notes des 118 autres firmes ne sont pas prétendues révisées : elles gardent leur score antérieur, identifié par la méthode historique au clic.

Prochain ordre d'instruction :

1. **N01**, audits V4 de Claude déjà documentés, en donnant priorité aux CGU actuelles, aux preuves positives et aux clauses B1 comparables.
2. **N02**, 20 dossiers dont plusieurs sans offre commerciale actuelle ; vérifier la réalité de l'exploitation avant de réattribuer une note.
3. **N03**, 16 dossiers fragiles ; priorité aux statuts de registre (notamment Titan Capital Markets) et à l'application **uniquement si justifiée** du plafond 55.
4. **C01–C04** restant, en utilisant les notes de vérification documentaires V4 comme points de départ, jamais comme scores V5 convertis.

Le script `node scripts/check-v5-progress.mjs` reconstitue et contrôle la file 66+56, sans jamais importer automatiquement les anciennes sous-notes V4. La publication de l'interface Apex ne doit pas être confondue avec la révision complète des 122 firmes.
