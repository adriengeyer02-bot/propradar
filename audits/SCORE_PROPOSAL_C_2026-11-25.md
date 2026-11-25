# Barème C : critères révisés et proposition de notes (25 novembre 2026)

**Statut : proposition. Rien n'est appliqué au site.** Les notes et le classement en production
sont inchangés (snapshot des 197 fiches identique avant/après). Toute baisse de 5 points ou plus
et tout mouvement de 10 points ou plus demandent l'accord de Geyer (CLAUDE.md, règle 6).

Fichiers : `audits/score-proposal-c-2026-11-25.csv` (une ligne par firme : note actuelle, note
proposée, plafond, pénalités, niveau de lecture, drapeau) et `.json` (avec, pour chaque pénalité,
l'URL et l'extrait de la clause). Calcul : `scripts/score-proposal-c.py`.

## 1. Ce qui a été lu

| Niveau de lecture | Firmes | Ce que ça permet |
|---|---|---|
| Contrat lu en entier, à la main | 9 (FTMO, Topstep, The5ers, FundedNext, Take Profit Trader, Lucid, HyroTrader, Hash Hedge, MyFundedCapital) | Note barème C complète, hausse ou baisse |
| Extraits relus à la main (clauses repérées par l'extracteur, relues une par une) | 57 | Baisse seulement, 10 points maximum. Aucune hausse |
| Texte archivé, aucune clause pénalisante repérée | 47 | Rien : une extraction vide ne prouve rien |
| CGU non obtenues (bloquées, absentes, firmes fermées ou en pause) | 46 | Rien |

Sur les 57 firmes relues par extraits : 29 clauses confirmées, 54 détections automatiques
rejetées, 8 à vérifier. Le détail des rejets est dans `audits/clause-review-2026-11-25/` (une
fiche par firme, raison de chaque rejet).

## 2. Critères révisés avec les nouvelles données

La lecture des 159 textes a montré que plusieurs critères, tels qu'écrits, pénalisaient du texte
standard présent partout. Révisions :

1. **B3 (règles modifiables)** : la clause générique « nous pouvons modifier ces conditions à tout
   moment » figure dans environ deux tiers des contrats lus ; elle ne coûte plus rien. B3 exige
   désormais que le changement touche les comptes déjà achetés ou en cours (ex. Sway Funded 4.2 :
   « with immediate effect on all existing challenges »), ou soit rétroactif. Une clause de
   non-rétroactivité (Earn2Trade, Aeon) est notée comme garde-fou.
2. **Consistency** : on note le programme principal le plus souple de la firme. Un seuil bas sur un
   produit annexe (Instant, compte 5 000 $) n'est pas pénalisé, il est signalé. Règle limitée à
   l'évaluation : demi-pénalité. Paiement retardé : barème normal ; paiement perdu : double.
   Paliers inchangés (≥ 40 % : 0 ; 30-39 : −2 ; 20-29 : −5 ; < 20 : −8).
3. **B6 (critique publique sanctionnée)** : il faut que la sanction touche le compte financé ou les
   gains (résiliation pour faute, confiscation). Une liste générique d'usage acceptable (« ne pas
   diffamer, harceler… ») ne compte pas.
4. **B7 (contrat de la phase financée non publié)** : seulement quand le texte dit que le contrat
   ou les règles de la phase financée sont fournis après l'achat ou la réussite (Funded Trader
   Markets, DirectFundedTrader, For Traders). La simple mention d'un « separate agreement » devient
   un point à vérifier.
5. **B2 / B2A** : les listes standard de pratiques interdites (latence, information privilégiée)
   ne comptent pas. Il faut un jugement à la seule discrétion de la firme sur une notion non
   chiffrée (« esprit », « but commercial », « abusif ») menant au refus du paiement.
6. **Sections promotionnelles exclues** : un « Rewards » de parrainage ou de concours n'est pas un
   paiement (erreur Topstep §29 corrigée).
7. **Niveaux de lecture** (tableau ci-dessus) : seule une lecture complète peut monter une note.
8. **Point ouvert, à trancher : les incidents.** Le barème C ne code aujourd'hui que les mises en
   garde de régulateurs (REGWARN) et les défauts de paiement (A1/A2). Or 35 fiches ont des incidents
   datés (plaintes de paiements non versés, changements de marque…) qui expliquent leurs notes
   basses actuelles (ex. CK Capital 14, My Forex Funds 20). Sans critère « historique », le
   barème C les remonterait vers 75. Toute hausse est donc bloquée pour ces 35 firmes tant que les
   incidents ne sont pas codés. Proposition : H1 « plaintes de paiement multiples et non résolues
   depuis plus de 90 jours, comptées à la main avec liens » −10 ; H2 « défaut reconnu ou
   procédure d'un régulateur » −20 ; A1 conservé à −40.
9. **Trustpilot retiré (TPW) : −6, décidé par Geyer le 25/11.** Pas d'autre effet : le plafond de 64 du barème actuel disparaît dans le barème C. Une note retirée ne compte simplement pas comme preuve pour le plafond (comme pour toute firme sans preuve de paiement à grande échelle).
10. **Révisions du 25/11 au soir** : B1 absorbe B2 (une seule pénalité pour la famille « gains retirables à discrétion »), comme pour les codes automatiques ; la consistency des fiches lues en entier suit la règle du programme principal (FTMO Instant 30 %, MyFundedCapital Stocks 35 %, FundedNext Direct 20 % : produits secondaires, plus de pénalité).

## 3. Mouvements proposés (18 firmes, version 2 du 25 novembre au soir)

| Firme | Actuelle | Proposée | Écart | Lecture | Plafond | Pénalités |
|---|---|---|---|---|---|---|
| MyFundedCapital | 75 | 60 | −15 | contrat entier | 65 (1-2 ans) | B7 −5 |
| FundedNext | 72 | 57 | −15 | contrat entier | 85 (4 ans + preuve) | B1 −15 · B5 −3 · B6 −5 · REGWARN −5 |
| Audacity Capital | 77 | 69 | −8 | extraits | 75 (14 ans, pas de preuve à grande échelle) | Trustpilot retiré −6 |
| For Traders | 70 | 64 | −6 | extraits | 75 (3 ans, pas de preuve à grande échelle) | B7 −5 · Trustpilot retiré −6 |
| FTMO | 90 | 85 | −5 | contrat entier | 98 (11 ans + preuve très large) | B2 −8 · B6 −5 |
| Finotive Funding | 69 | 64 | −5 | extraits | 75 (5 ans, pas de preuve à grande échelle) | B3 −5 · Trustpilot retiré −6 |
| Fintokei | 78 | 75 | −3 | extraits | 75 (4 ans, pas de preuve à grande échelle) | aucune |
| The Trading Pit | 67 | 64 | −3 | extraits | 75 (4 ans, pas de preuve à grande échelle) | B6 −5 · Trustpilot retiré −6 |
| Topstep | 81 | 79 | −2 | contrat entier | 95 (14 ans + preuve) | B2 −8 · B3 −5 · Trustpilot < 4,0 −3 |
| Get Leveraged | 56 | 54 | −2 | extraits | 65 (1-2 ans) | consistency 20% −5 · Trustpilot retiré −6 |
| Axi Select | 76 | 75 | −1 | extraits | 75 (3 ans, pas de preuve à grande échelle) | aucune |
| FunderPro | 70 | 69 | −1 | extraits | 75 (3 ans, pas de preuve à grande échelle) | Trustpilot retiré −6 |
| RZR Funded | 68 | 67 | −1 | extraits | 75 (3 ans, pas de preuve à grande échelle) | B2 −8 |
| Lvlup Futures | 51 | 50 | −1 | extraits | 55 (< 1 an) | B3 −5 |
| Take Profit Trader | 73 | 82 | +9 | contrat entier | 95 (5 ans + preuve) | B3 −5 · B7 −5 · B4 −3 |
| Hash Hedge | 61 | 71 | +10 | contrat entier | 75 (3 ans, pas de preuve à grande échelle) | B2A −4 |
| HyroTrader | 55 | 66 | +11 | contrat entier | 75 (4 ans, pas de preuve à grande échelle) | B2A −4 · B7 −5 |
| Lucid Trading | 53 | 66 | +13 | contrat entier | 75 (2 ans) | B2A −4 · B3 −5 |

Sensibles (accord requis) : MyFundedCapital, FundedNext, Audacity, For Traders, FTMO, Finotive (baisses ≥ 5) ; Hash Hedge, HyroTrader, Lucid (hausses ≥ 10). FTMO est affilié : même traitement que les autres.

Effet sur le haut du classement : FTMO 85, Take Profit Trader 82, MyFundedFutures 81 (inchangée), Topstep 79, The5ers 78, Tradeify 78.

## 4. Ce qui n'est pas proposé

- 44 firmes relues par extraits obtiendraient une note barème C plus haute (ex. TradeDay 95 brut
  contre 67, Earn2Trade 94 contre 74, Elite Trader Funding 92 contre 66). Pas de hausse avant une
  lecture complète de leur contrat.
- Les règles restrictives qui entrent dans la note actuelle (`restrictiveRules` de
  `firm-updates.json`) n'ont pas été modifiées : en ajouter changerait les notes. Les clauses
  trouvées sont publiées dans les dossiers contractuels des fiches (couche documentaire, sans effet
  sur la note).
- ATFunded (pause annoncée) : en attente de l'accord et de l'URL de l'annonce.

## 5. Suite

1. Trancher les points 8 (incidents) et 9 (Trustpilot retiré).
2. Lire en entier les contrats des firmes les plus suivies parmi les 57 « extraits » (MyFundedFutures,
   Tradeify, FXIFY, Funding Pips, Alpha Capital, GOAT, E8, Blue Guardian, BrightFunded, Earn2Trade).
3. Appliquer ensuite les notes validées dans `firm-updates.json`, firme par firme, avec changelog
   sourcé.
