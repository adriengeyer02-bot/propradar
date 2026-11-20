# Suivi V5 — 122 dossiers à harmoniser

À la demande d'Adrien du **20 novembre 2026**, ChatGPT prend aussi les **56 dossiers N01–N03** auparavant confiés à Claude, en plus des **66 dossiers C01–C04**. Même barème `SCORING_V5.md`, même standard de preuve et même contrôle de non-cumul.

| Ensemble | Dossiers dans la file | Fiches V5 complètes | En attente V5 |
| --- | ---: | ---: | ---: |
| C01–C04, repris de ChatGPT | 66 | 10 (C01 entier ; Alpha, Maven, TradeDay approuvées, 7 propositions) | 56 |
| N01–N03, repris de Claude | 56 | 8 (N01, toutes approuvées) | 48 |
| **Total** | **122** | **18 (dont 11 approuvées)** | **104** |

Chaque fiche V5 complète contient les 13 sous-notes sourcées, les retraits B2, l'état Trustpilot, la confiance et l'ancienne note. La publication des **11 fiches approuvées** est verrouillée dans `app/data/scoring-v5-published.json` par **slug + date + score final**. **TradeDay 75→67 a reçu l'accord explicite d'Adrien après la proposition #239 et est en production.** Les **7 propositions C01** (Breakout, Axi Select, CTI, Take Profit Trader, OneUp, UProfit, Funded Trading Plus) restent expressément non approuvées, donc leurs notes publiques sont inchangées. Les **104 dossiers pas encore réaudités** conservent également leur score antérieur, identifié par la méthode historique au clic.

Prochain ordre d'instruction :

1. **N01**, audits V4 de Claude déjà documentés, en donnant priorité aux CGU actuelles, aux preuves positives et aux clauses B1 comparables.
2. **N02**, 20 dossiers dont plusieurs sans offre commerciale actuelle ; vérifier la réalité de l'exploitation avant de réattribuer une note.
3. **N03**, 16 dossiers fragiles ; priorité aux statuts de registre (notamment Titan Capital Markets) et à l'application **uniquement si justifiée** du plafond 55.
4. **C02–C04** restants : C01 est intégralement audité et attend la validation des 7 propositions non publiées ; utiliser les notes documentaires V4 comme points de départ pour les autres lots, jamais comme scores V5 convertis.

Le script `node scripts/check-v5-progress.mjs` reconstitue et contrôle la file 66+56, sans jamais importer automatiquement les anciennes sous-notes V4. La publication de l'interface Apex ne doit pas être confondue avec la révision complète des 122 firmes.
