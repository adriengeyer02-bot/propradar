# Trustpilot — revue exhaustive des notes suspendues (19 novembre 2026)

> Travail de contrôle des **fiches PropRadar existantes**, pas une nouvelle accusation. Trustpilot ne dit pas qui a créé ou acheté les avis retirés.

## Résultat et règle applicable

- **39 fiches déjà marquées** « TrustScore withheld » dans `firm-updates.json` : leurs pages Trustpilot ont été rouvertes le **19/11/2026** et affichent encore l'avertissement « rating unavailable due to a breach of our guidelines ».
- **1 retour d'avertissement non reflété dans les données : Blue Guardian**. Sa fiche PropRadar comporte `trustpilotNoticeLifted: "2026-11-07"` et un ancien TrustScore de 3,1/5, alors que [la page Trustpilot actuelle](https://www.trustpilot.com/review/blueguardian.com) masque de nouveau la note et affiche un retrait de faux avis.
- **Get Leveraged** reste à part : [sa note 4,5/5 est visible](https://www.trustpilot.com/review/getleveraged.com), donc aucune nouvelle retenue liée à une note supprimée.
- **40 dossiers concernés à ce contrôle**. Chacun doit subir **une seule retenue de 8 points** si elle n'est pas déjà intégrée à la base éditoriale. **Aucun plafond de 64** ; les règles contraignantes constituent un calcul séparé (voir `SCORING.md`).
- Les chiffres ci-dessous reproduisent **le calcul des données de `main`** à cette date : `editorial - computeRulesPenalty`, puis ancien `min(64,...)` pour les dossiers encore signalés. Ils ne constituent pas une nouvelle enquête de fond ni une recommandation commerciale.

## Dossiers dont le score de base n'intègre pas une pénalité Trustpilot éditoriale explicite

La colonne « cible calculée » vaut `score éditorial - pénalité de règles - 8`, avec suppression du plafond 64. Ne pas ajouter d'autres pénalités pour le même avertissement.

| Firme | Éditorial | Règles | Actuel calculé | Cible calculée | Page Trustpilot |
|---|---:|---:|---:|---:|---|
| Alpha Capital Group (`alpha-capital-group`) | 78 | −4 | 64 | **66** | [Avertissement](https://www.trustpilot.com/review/alphacapitalgroup.uk) |
| AquaFunded (`aqua-funded`) | 69 | −4 | 64 | **57** | [Avertissement](https://www.trustpilot.com/review/aquafunded.com) |
| Audacity Capital (`audacity-capital`) | 79 | −1 | 64 | **70** | [Avertissement](https://www.trustpilot.com/review/audacity.capital) |
| Blueberry Funded (`blueberry-funded`) | 64 | −7 | 57 | **49** | [Avertissement](https://www.trustpilot.com/review/blueberryfunded.com) |
| BrightFunded (`brightfunded`) | 73 | −3 | 64 | **62** | [Avertissement](https://www.trustpilot.com/review/brightfunded.com) |
| Clarity Traders (`clarity-traders`) | 61 | −6 | 55 | **47** | [Avertissement](https://www.trustpilot.com/review/claritytraders.com) |
| E8 Markets (`e8-markets`) | 75 | −1 | 64 | **66** | [Avertissement](https://www.trustpilot.com/review/e8markets.com) |
| Finotive Funding (`finotive-funding`) | 71 | −6 | 64 | **57** | [Avertissement](https://www.trustpilot.com/review/finotivefunding.com) |
| For Traders (`for-traders`) | 72 | −0 | 64 | **64** | [Avertissement](https://www.trustpilot.com/review/fortraders.com) |
| Funded Trading Plus (`funded-trading-plus`) | 74 | −1 | 64 | **65** | [Avertissement](https://www.trustpilot.com/review/fundedtradingplus.com) |
| funderpro (`funderpro`) | 73 | −2 | 64 | **63** | [Avertissement](https://www.trustpilot.com/review/funderpro.com) |
| Funding Traders (`funding-traders`) | 70 | −3 | 64 | **59** | [Avertissement](https://www.trustpilot.com/review/fundingtraders.com) |
| Funding Your Trades (`funding-your-trades`) | 58 | −9 | 49 | **41** | [Avertissement](https://www.trustpilot.com/review/fundingyourtrades.com) |
| FundYourFX (`fundyourfx`) | 62 | −9 | 53 | **45** | [Avertissement](https://www.trustpilot.com/review/fundyourfx.io) |
| Instant Funding (`instant-funding`) | 76 | −2 | 64 | **66** | [Avertissement](https://www.trustpilot.com/review/instantfunding.com) |
| Maven Trading (`maven-trading`) | 73 | −1 | 64 | **64** | [Avertissement](https://www.trustpilot.com/review/maventrading.com) |
| OFP Funding (`ofp-funding`) | 63 | −8 | 55 | **47** | [Avertissement](https://www.trustpilot.com/review/ofpfunding.com) |
| onefunded (`onefunded`) | 61 | −9 | 52 | **44** | [Avertissement](https://www.trustpilot.com/review/onefunded.com) |
| PipFarm (`pipfarm`) | 72 | −0 | 64 | **64** | [Avertissement](https://www.trustpilot.com/review/pipfarm.com) |
| The Trading Pit (`the-trading-pit`) | 76 | −1 | 64 | **67** | [Avertissement](https://www.trustpilot.com/review/thetradingpit.com) |
| Tiger Funded (`tiger-funded`) | 60 | −9 | 51 | **43** | [Avertissement](https://www.trustpilot.com/review/tigerfunded.com) |
| Top One Trader (`top-one-trader`) | 60 | −10 | 50 | **42** | [Avertissement](https://www.trustpilot.com/review/toponetrader.com) |
| WeMasterTrade (`wemastertrade`) | 60 | −7 | 53 | **45** | [Avertissement](https://www.trustpilot.com/review/wemastertrade.com) |
| SuperFunded (`superfunded`) | 54 | −8 | 46 | **38** | [Avertissement](https://www.trustpilot.com/review/superfunded.com) |
| BEM Funding (`bem-funding`) | 58 | −9 | 49 | **41** | [Avertissement](https://www.trustpilot.com/review/bemfunding.com) |
| SFX Funded (`sfx-funded`) | 57 | −2 | 55 | **47** | [Avertissement](https://www.trustpilot.com/review/sfxfunded.com) |
| DirectFundedTrader (`directfundedtrader`) | 55 | −9 | 46 | **38** | [Avertissement](https://www.trustpilot.com/review/directfundedtrader.com) |
| FundedHive (`fundedhive`) | 56 | −2 | 54 | **46** | [Avertissement](https://www.trustpilot.com/review/fundedhive.com) |

**Blue Guardian (nouvel avertissement du 19/11) :** score éditorial 66, règles −1, actuel calculé 65, **cible 57** après Trustpilot −8. Le statut de levée doit être révisé avec une nouvelle date et la preuve directe, en conservant l'historique du 07/11. Son audit contractuel de la veille ne comptait pas cette nouvelle retenue.

## Dossiers à score éditorial déjà corrigé à la main

Pour ceux-ci, **ne pas appliquer automatiquement un second −8** avant d'avoir déterminé, à partir du changelog et des documents, quelle part du score est déjà attribuée à l'incident Trustpilot. Utiliser un marqueur explicite « retenue comprise » et un calcul transparent. La PR #148 ne peut pas supposer que tout `set.score` l'intègre.

| Firme | Éditorial actuel | Règles | Affichage calculé | Point à résoudre | Source Trustpilot |
|---|---:|---:|---:|---|---|
| FundedElite (`fundedelite`) | 60 | −10 | 50 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/fundedelite.com) |
| GOAT Funded Trader (`goat-funded-trader`) | 58 | −4 | 54 | Changelog : −8 explicitement déjà intégré. Conserver le résultat sans second −8. | [Avertissement](https://www.trustpilot.com/review/goatfundedtrader.com) |
| SabioTrade (`sabiotrade`) | 55 | −8 | 47 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/sabiotrade.com) |
| Sure Leverage (`sure-leverage`) | 53 | −8 | 45 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/sureleveragefunding.com) |
| ThinkCapital (`thinkcapital`) | 58 | −8 | 50 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/thinkcapital.com) |
| Funded Trader Markets (`funded-trader-markets`) | 55 | −10 | 45 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/fundedtradermarkets.com) |
| Upcomers (`upcomers`) | 54 | −6 | 48 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/upcomers.com) |
| Forexive (`forexive`) | 55 | −8 | 47 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/forexive.com) |
| Titan Capital Markets (`titan-capital-markets`) | 36 | −10 | 26 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/titancapitalmarkets.co.uk) |
| Trading Cult (`trading-cult`) | 40 | −6 | 34 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/tradingcult.com) |
| CK Capital (`ck-capital`) | 26 | −9 | 17 | Changelog à départager : autres risques et éventuelle part Trustpilot ; pas de double retenue. | [Avertissement](https://www.trustpilot.com/review/ckcapital.co.uk) |

## Vérifications avant toute publication des notes

1. **Réconcilier les 40 notes** avec l'unique pipeline de score (règles, Trustpilot −8, fermeture), puis vérifier les dialogues, le radar, les listes et les classements multilingues. Une note affichée ne peut pas différer de son détail.
2. **Blue Guardian** : vérifier le retour de l'avertissement, retirer l'ancien TrustScore seulement avec sa source datée, préserver l'historique du rétablissement précédent.
3. **Audacity Capital** : la base de 79 reçoit **−1 pour les règles** et **−8 Trustpilot**, soit **70/100** si aucun autre fait indépendant ne justifie de baisse. La note 66 proposée dans la PR #148 exige donc **4 points supplémentaires** justifiés et distincts de l'intégrité des avis.
4. **Scores réédités manuellement** : la PR #148 actuelle saute toute pénalité automatique dès qu'un `set.score` existe ; plusieurs de ces scores n'indiquent pourtant pas avoir absorbé les 8 points. Rendre l'inclusion explicite avant fusion.
5. **Source et prudence** : attribuer à Trustpilot uniquement son propre signal, sans affirmer qu'une entreprise a payé les avis ni que des plaintes individuelles sont des faits établis. Si l'avertissement est levé, vérifier l'URL et dater l'événement.
6. **Branches concurrentes** : les PR #147, #148, #150 et #152 touchent `firm-updates.json` ou `propFirms.ts`. Ne pas réécrire ces fichiers parallèlement ; faire intégrer la correction à la branche propriétaire après rebase sur `main`.
7. **Vérifications techniques** : `npx tsc --noEmit -p .`, `npx next build`, contrôle des 40 calculs par tests, puis CI Vercel verte ; changements de score sensibles à valider par Adrien.

## Sources

Les liens individuels vers **Trustpilot**, dans les deux tableaux, sont les sources directes consultées le 19 novembre 2026. Le jeu de données local et les règles du projet sont `app/data/firm-updates.json`, `app/lib/propFirms.ts`, `app/lib/restrictiveRules.ts` et `SCORING.md`.
