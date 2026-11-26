# Fiches à compléter : sites que Claude ne lit pas (26/11/2026)

Liste établie par Claude pour ChatGPT. Les firmes déjà marquées « Fermée » ne sont pas dans cette liste.
Les manques sont ceux affichés sur la fiche (« À vérifier ») : prix, partage des profits, type de drawdown, programmes (tailles de compte, objectifs, pertes max).

## Ce qu'il faut rapporter, par firme

Dans `terms-archive/<slug>/` sur la branche `agent/terms-archive`, comme pour les CG :
- le texte brut de chaque page lue (grille de prix, règles, FAQ paiement), avec l'URL et la date de lecture en tête de fichier ;
- prix catalogue par taille de compte, **hors promotion** (si seul un prix soldé est affiché, le dire) ;
- partage des profits ;
- pour chaque programme principal : tailles de compte, objectif, perte journalière, perte max **et son type** (statique, trailing, fin de journée) ;
- délai de paiement ;
- si le site est hors service, redirige vers une autre marque ou est parqué : capture ou texte de la page et date, pour que Geyer puisse trancher sur une éventuelle fermeture (aucune fermeture n'est enregistrée sans source publique).

Claude reprend ensuite chaque dossier, vérifie et écrit dans `app/data/firm-updates.json`.

## A. Site hors service, parqué ou redirigé (30 firmes) : fermeture possible, non confirmée

Ces fiches portent déjà un avertissement de domaine. Il faut d'abord savoir si la firme a déménagé (nouveau domaine officiel) ou si elle a cessé son activité.

| Firme | Slug | Site officiel listé | Manque sur la fiche |
|---|---|---|---|
| 1of1 Funding | `one-of-one-funding` | https://1of1funding.com | partage, drawdown, programmes |
| AlphaPropTraders | `alphaproptraders` | (aucun site valide sur la fiche) | prix, partage, drawdown, programmes |
| ATFunded | `atfunded` | https://atfunded.com | partage, drawdown, programmes |
| AuraFunded | `aurafunded` | (aucun site valide sur la fiche) | partage, drawdown, programmes |
| BluFX | `blufx` | (aucun site valide sur la fiche) | prix, partage, drawdown, programmes |
| CK Capital | `ck-capital` | (aucun site valide sur la fiche) | prix, drawdown, programmes |
| Dei Funded | `dei-funded` | (aucun site valide sur la fiche) | prix, partage, drawdown, programmes |
| ExFunded | `exfunded` | (aucun site valide sur la fiche) | prix, partage, drawdown |
| FundedLions | `fundedlions` | https://fundedlions.com | partage, drawdown, programmes |
| Funding Frontier | `funding-frontier` | https://fundingfrontier.com | prix, partage, drawdown, programmes |
| Gry Funding | `gry-funding` | (aucun site valide sur la fiche) | prix, partage, drawdown, programmes |
| Guardeer Funding | `guardeer-funding` | https://guardeerfunding.com | prix, partage, drawdown, programmes |
| KortanaFX | `kortanafx` | https://kortanafx.com | drawdown |
| Levels | `levels` | (aucun site valide sur la fiche) | partage, drawdown, programmes |
| My Flash Funding | `my-flash-funding` | https://myflashfunding.com | partage, drawdown, programmes |
| MyFxCapital | `myfxcapital` | https://myfxcapital.com | prix, partage, drawdown, programmes |
| Nations Trading | `nations-trading` | (aucun site valide sur la fiche) | partage, drawdown, programmes |
| NEG Markets | `neg-markets` | (aucun site valide sur la fiche) | prix, partage, drawdown, programmes |
| Nova Funding | `nova-funding` | https://nova-funding.com | partage, drawdown, programmes |
| Prop Number One | `prop-number-one` | https://propnumberone.com | prix, partage, drawdown, programmes |
| Quantec Trading Capital | `quantec-trading-capital` | (aucun site valide sur la fiche) | prix, partage, drawdown, programmes |
| Real Funds Trader | `real-funds-trader` | (aucun site valide sur la fiche) | prix, partage, drawdown, programmes |
| T4TCapital | `t4tcapital` | (aucun site valide sur la fiche) | partage, drawdown, programmes |
| The Prop Game | `the-prop-game` | (aucun site valide sur la fiche) | prix, partage, drawdown, programmes |
| Titan Capital Markets | `titan-capital-markets` | (aucun site valide sur la fiche) | prix, partage, drawdown |
| Traddoo | `traddoo` | (aucun site valide sur la fiche) | prix, partage, drawdown, programmes |
| Traders Central | `traders-central` | (aucun site valide sur la fiche) | partage, drawdown, programmes |
| Traders With Edge | `traders-with-edge` | https://traderswithedge.com | partage, drawdown, programmes |
| Trading Cult | `trading-cult` | https://pro.tradingcult.com | prix, drawdown, programmes |
| Tribe Funded | `tribe-funded` | https://tribefunded.com | partage, drawdown, programmes |

## B. Site actif mais lecture automatique bloquée par le site (15 firmes)

| Firme | Slug | Site officiel listé | Manque sur la fiche |
|---|---|---|---|
| Alpine Funded | `alpine-funded` | https://alpinefunded.com | prix, partage, drawdown, programmes |
| Forex Funds Flow | `forex-funds-flow` | https://forexfundsflow.com | drawdown |
| FundedHive | `fundedhive` | https://fundedhive.com | prix, partage, drawdown, programmes |
| FXCI | `fxci` | https://fxci.com | prix, drawdown, programmes |
| FXRK | `fxrk` | https://fxrk.com | prix, partage, drawdown, programmes |
| GetCryptoFunded | `getcryptofunded` | https://getcryptofunded.com | partage, drawdown, programmes |
| Hola Prime | `hola-prime` | https://holaprime.com | programmes |
| Leveled Up Society | `leveled-up-society` | https://leveledupsociety.com | partage, drawdown, programmes |
| Moneta Funded | `moneta-funded` | https://monetafunded.com | partage, drawdown, programmes |
| Monevis Funding Platform | `monevis` | https://monevis.com | prix, partage, drawdown, programmes |
| MyFundedCapital | `myfundedcapital` | https://myfundedcapital.com | prix, partage, drawdown, programmes |
| Rocket21 Challenge | `rocket21-challenge` | https://rocket21challenge.com | partage, drawdown, programmes |
| The Funded Trader | `the-funded-trader` | https://thefundedtraderprogram.com | prix, programmes |
| ThinkCapital | `thinkcapital` | https://thinkcapital.com | drawdown |
| TX3 Funding | `tx3-funding` | https://tx3funding.com | drawdown |

## C. Aucun résultat de recherche sur le domaine officiel (1 firme)

| Firme | Slug | Site officiel listé | Manque sur la fiche |
|---|---|---|---|
| Purdia Capital | `purdia-capital` | https://purdia.com | partage, drawdown, programmes |

## D. Sites lisibles, pas encore lus (43 firmes)

Claude peut les lire lui-même (lecture interrompue le 26/11 faute de crédits Firecrawl jusqu'à 19 h 28). ChatGPT peut en prendre une partie s'il le souhaite.

| Firme | Slug | Site officiel listé | Manque sur la fiche |
|---|---|---|---|
| Aeon Funded | `aeon-funded` | https://quantxfund.io | prix, partage, drawdown, programmes |
| BEM Funding | `bem-funding` | https://bemfunding.com | partage, drawdown, programmes |
| Bespoke Funding Program | `bespoke-funding-program` | https://bespokefundingprogram.com | prix |
| Blueberry Funded | `blueberry-funded` | https://blueberryfunded.com | prix |
| BluSky Trading | `blusky-trading` | https://blusky.pro | prix |
| Bullwaves Prime | `bullwaves-prime` | https://bullwaves.com | drawdown |
| Clarity Traders | `clarity-traders` | https://claritytraders.com | drawdown |
| Crypto Fund Trader | `crypto-fund-trader` | https://cryptofundtrader.com | drawdown |
| DirectFundedTrader | `directfundedtrader` | https://directfundedtrader.com | drawdown |
| Equity Edge | `equity-edge` | https://equityedge.io | prix, drawdown |
| Finotive Funding | `finotive-funding` | https://finotivefunding.com | drawdown |
| Forexive | `forexive` | https://forexive.com | prix, partage, drawdown, programmes |
| Funded Squad | `funded-squad` | https://fundedsquad.com | partage, drawdown, programmes |
| Funded Trader Markets | `funded-trader-markets` | https://fundedtradermarkets.com | partage, drawdown |
| Funded7 | `funded7` | https://funded7.com | prix |
| FundedElite | `fundedelite` | https://fundedelite.com | drawdown, programmes |
| Funder Trading | `funder-trading` | https://fundertrading.com | drawdown |
| Funding Traders | `funding-traders` | https://fundingtraders.com | drawdown |
| Funding Your Trades | `funding-your-trades` | https://fundingyourtrades.com | prix, partage, programmes |
| Fundings4u | `fundings4u` | https://fundings4u.com | prix, partage, drawdown, programmes |
| FundYourFX | `fundyourfx` | https://fundyourfx.io | drawdown |
| FX2 Funding | `fx2-funding` | https://fx2funding.com | programmes |
| Hash Hedge | `hash-hedge` | https://hashhedge.com | prix, drawdown |
| IC Funded | `ic-funded` | https://icfunded.com | drawdown |
| Lux Trading Firm | `lux-trading-firm` | https://luxtradingfirm.com | prix, drawdown |
| MiFunder | `mifunder` | https://mifunder.com | prix, partage, drawdown, programmes |
| My Crypto Funding | `my-crypto-funding` | https://mycryptofunding.org | prix, drawdown, programmes |
| My Forex Funds | `myforexfunds` | https://myforexfunds.com | prix, partage, programmes |
| OneFunded | `onefunded` | https://onefunded.com | drawdown |
| QT Funded (Quant Tekel) | `quant-tekel` | https://quanttekel.com | partage, drawdown |
| RZR Funded | `hantec-trader` | https://rzrfunded.com | drawdown |
| SFX Funded | `sfx-funded` | https://sfxfunded.com | drawdown |
| SuperFunded | `superfunded` | https://superfunded.com | drawdown |
| Sure Leverage | `sure-leverage` | https://sureleveragefunding.com | drawdown |
| Sway Funded | `sway-funded` | https://swayfunded.com | drawdown |
| TenTrade | `tentrade` | https://tentrade.com | drawdown |
| The Concept Trading | `the-concept-trading` | https://theconcepttrading.com | drawdown |
| Tiger Funded | `tiger-funded` | https://tigerfunded.com | drawdown |
| TradeFundrr | `tradefundrr` | https://tradefundrr.com | drawdown |
| TradersEdgeFX | `tradersedgefx` | https://tradersedgefx.com | partage, drawdown |
| Upcomers | `upcomers` | https://upcomers.com | prix, programmes |
| WeMasterTrade | `wemastertrade` | https://wemastertrade.com | drawdown |
| Willis Capital | `willis-capital` | https://wfunded.io | prix, drawdown |
