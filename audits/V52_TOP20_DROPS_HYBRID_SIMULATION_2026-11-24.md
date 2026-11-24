# Simulation du modèle hybride — 20 plus fortes chutes de V5.2
**24 novembre 2026 · NON PUBLIÉ / RECHERCHE UNIQUEMENT**
 
## Méthode
- Cohorte : les 20 plus grandes baisses entre `previousDisplayedScore` et `expectedFinal` parmi les 121 validations de `app/data/scoring-v52-published.json`. En cas d'égalité, ordre alphabétique du slug.
- Socle : première note **explicite** stockée dans `app/lib/propFirms.ts` au commit du 19 juillet 2026 (`9ed2ca2`), **pas** le score V5.2 ni une note nouvellement inventée. Pour RZR Funded absent de ce snapshot, la note de 68 avant V5.2 n'est qu'un **proxy non validé**.
- Pénalité règles : reproduit `computeRulesPenalty` dans `app/lib/restrictiveRules.ts`, en utilisant les règles `restrictiveRules` et programmes `auditedPrograms` du snapshot stable 22 novembre (`22f715e`). Pour cette simulation, appliquer explicitement ce calcul à toutes les firmes, indépendamment des switches V4/V5 hérités; sinon la comparaison ne serait pas homogène.
- Règles : pour chaque programme, maximum par catégorie; règles ordinaires clear ×0,25; buried ×0,5; risques vagues/discrétionnaires/contradictoires ×2; catégories classiques = 0; charge moyenne des programmes, puis `round(12×(1−exp(−load/30)))`, plafond **de pénalité** 12, **aucun plafond de note**.
- Trustpilot : −6 une seule fois si la note est retenue pour violation des règles d'après les indicateurs V5.2; notices principales contrôlées sur les profils officiels Trustpilot lors de cette simulation le 24/11. **Ne pas confondre absence d'avis ou note de 2 étoiles avec sanction Trustpilot.**
- `hybride = max(0, min(100, socle explicite − pénalité règles − 6 si notice actuelle))`.
- **Limite majeure :** une note originale est subjective et tenait déjà parfois compte des clauses, incidents et réputation. Les malus peuvent donc constituer une double comptabilisation **conceptuelle** même si la formule ne soustrait qu'une fois. Les dossiers de règles eux-mêmes contiennent des classifications à revalider et certaines firmes n'ont pas de règles classées. **Zéro règle classée ≠ absence de risque.**

| Prop firm | Avant V5.2 | V5.2 | Socle 2026-07 | Règles | TP | Simulation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| FTMO | 90 | 62 | 91 | −8 | 0 | **83** |
| Audacity Capital | 77 | 50 | 79 | 0 | −6 | **73** |
| For Traders | 70 | 48 | 72 | 0 | −6 | **66** |
| City Traders Imperium | 74 | 53 | 74 | 0 | 0 | **74** |
| AquaFunded | 69 | 50 | 69 | −1 | −6 | **62** |
| Finotive Funding | 69 | 50 | 71 | −4 | −6 | **61** |
| MyFundedFutures | 81 | 62 | 73 | 0 | 0 | **73** |
| Instant Funding | 72 | 54 | 76 | 0 | −6 | **70** |
| Crypto Fund Trader | 62 | 45 | 62 | −7 | −6 | **49** |
| Topstep | 81 | 64 | 84 | −5 | 0 | **79** |
| Axi Select | 76 | 60 | 77 | −1 | 0 | **76** |
| BrightFunded | 72 | 56 | 73 | −1 | −6 | **66** |
| Fintokei | 78 | 62 | 77 | −9 | 0 | **68** |
| Maven Trading | 72 | 56 | 73 | 0 | −6 | **67** |
| Tradeify | 78 | 62 | 72 | 0 | 0 | **72** |
| PipFarm | 71 | 56 | 72 | 0 | −6 | **66** |
| RZR Funded | 68 | 53 | **n/d** | 0* | 0 | **n/d** (68 si proxy pré-V5.2) |
| E8 Markets | 72 | 58 | 75 | 0 | −6 | **69** |
| The5ers | 78 | 64 | 85 | −9 | 0 | **76** |
| Funding Traders | 68 | 55 | 70 | −1 | −6 | **63** |

## Distribution et validation
- V5.2 : moyenne **56,0** sur les vingt, zéro firme à ≥70.
- Hybride : moyenne **69,1** sur les **19** ayant un socle d'origine explicite (même ordre de grandeur avec le proxy RZR : 69,05 sur 20); **9 firmes à ≥70** si le proxy RZR=68. 
- Moyenne des notes pré-V5.2 sur ces vingt : **73,9**; ces notes sont des états déjà modifiés, différents des notes de juillet.
- Chutes les plus marquées (V5.2) : FTMO −28, Audacity −27, For Traders −22, CTI −21, puis Aqua/Finotive/MyFundedFutures −19.
- Cas à refuser sans contre-audit : **CTI 74** alors qu'aucune règle « risk » n'est classée dans ce snapshot; **Axi Select 76** malgré des sujets juridiques/régionaux; **RZR 68** simple placeholder; FTMO −8 / The5ers −9 / Fintokei −9 reposent sur plusieurs règles `vague` dont certaines doivent être correctement requalifiées si la FAQ est chiffrée et explicite.
- Vérifier les notices Trustpilot par entité/domaine : Audacity Capital https://www.trustpilot.com/review/audacity.capital, For Traders https://www.trustpilot.com/review/fortraders.com, AquaFunded https://www.trustpilot.com/review/aquafunded.com, Finotive https://www.trustpilot.com/review/finotivefunding.com, Instant Funding https://www.trustpilot.com/review/instantfunding.com, Crypto Fund Trader https://www.trustpilot.com/review/cryptofundtrader.com, BrightFunded https://www.trustpilot.com/review/brightfunded.com, Maven https://www.trustpilot.com/review/maventrading.com, PipFarm https://www.trustpilot.com/review/pipfarm.com, E8 https://www.trustpilot.com/review/e8markets.com, Funding Traders https://www.trustpilot.com/review/fundingtraders.com.
- **Ne pas déployer ce tableau.** Harmoniser un socle éditorial explicable et non circulaire, corriger les classifications « risk », auditer les trous documentaires, et maintenir publication conditionnée à une validation sur les mouvements sensibles.
