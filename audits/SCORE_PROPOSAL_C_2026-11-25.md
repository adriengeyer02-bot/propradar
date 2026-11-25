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
9. **Point ouvert : Trustpilot retiré (TPW)** coûte deux fois : la note n'est plus une preuve pour
   le plafond (ex. Audacity : 14 ans mais plafond 75) et −10 en plus. À garder ou à réduire à
   un seul effet ?

## 3. Mouvements proposés (20 firmes)

| Firme | Actuelle | Proposée | Écart | Lecture | Plafond | Pénalités |
|---|---|---|---|---|---|---|
| FundedNext | 72 | 45 | −27 | contrat entier | 85 (4 ans + preuve) | B1 −15, B2 −8, B5 −3, B6 −5, consistency 20 % −5, REGWARN −5 |
| MyFundedCapital | 75 | 58 | −17 | contrat entier | 65 (1-2 ans) | B7 −5, consistency 30 % −2 |
| Audacity Capital | 77 | 67 | −10 | extraits | 75 | Trustpilot retiré −10 (baisse plafonnée) |
| For Traders | 70 | 60 | −10 | extraits | 75 | B7 −5, Trustpilot retiré −10 |
| Finotive Funding | 69 | 60 | −9 | extraits | 75 | B3 −5, Trustpilot retiré −10 |
| FTMO | 90 | 83 | −7 | contrat entier | 98 (11 ans + preuve très large) | B2 −8, B6 −5, consistency 30 % −2 |
| The Trading Pit | 67 | 60 | −7 | extraits | 75 | B6 −5, Trustpilot retiré −10 |
| Get Leveraged | 56 | 50 | −6 | extraits | 65 | consistency 20 % −5, Trustpilot retiré −10 |
| FunderPro | 70 | 65 | −5 | extraits | 75 | Trustpilot retiré −10 |
| Fintokei | 78 | 75 | −3 | extraits | 75 (pas de preuve à grande échelle) | aucune |
| Top One Trader | 60 | 57 | −3 | extraits | 75 | consistency 15 % −8, Trustpilot retiré −10 |
| Topstep | 81 | 79 | −2 | contrat entier | 95 | B2 −8, B3 −5, Trustpilot < 4,0 −3 |
| Axi Select | 76 | 75 | −1 | extraits | 75 | aucune |
| RZR Funded | 68 | 67 | −1 | extraits | 75 | B2 −8 |
| Maven Trading | 63 | 62 | −1 | extraits | 75 | B5 −3, Trustpilot retiré −10 |
| Lvlup Futures | 51 | 50 | −1 | extraits | 55 (< 1 an) | B3 −5 |
| Take Profit Trader | 73 | 82 | +9 | contrat entier | 95 | B3 −5, B7 −5, B4 −3 |
| Hash Hedge | 61 | 71 | +10 | contrat entier | 75 | B2A −4 |
| HyroTrader | 55 | 66 | +11 | contrat entier | 75 | B2A −4, B7 −5 |
| Lucid Trading | 53 | 66 | +13 | contrat entier | 75 (2 ans) | B2A −4, B3 −5 |

Sensibles (accord requis) : FundedNext, MyFundedCapital, Audacity, For Traders, Finotive, FTMO,
The Trading Pit, Get Leveraged, FunderPro (baisses ≥ 5) ; Hash Hedge, HyroTrader, Lucid
(hausses ≥ 10). FTMO et FunderPro sont affiliés : même traitement que les autres.

Effet sur le haut du classement : FTMO 83, Take Profit Trader 82, MyFundedFutures 81 (inchangée,
extraits seulement), Topstep 79, The5ers 78, Tradeify 78.

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
