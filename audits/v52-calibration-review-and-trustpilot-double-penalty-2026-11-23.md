# PropRadar — contrôle de calibration V5.2 et anomalie Trustpilot (23 novembre 2026)

## Constats mathématiques sur les **121 approbations** réelles

Source unique : `app/data/scoring-v52-published.json` + `app/data/scoring-v52-31-owner-release-2026-11-23.json`, `app/data/scoring-v52-owner-approved-2026-11-23.json`, `app/data/scoring-v52-new-audits.json`, `app/data/scoring-v52-all-existing-audits-2026-11-21.json` et moteur `computeV52Scorecard`.

- **121 notes approuvées, maximum 70, aucune supérieure à 70.**
- Top 7 : Breakout Prop 70, FXIFY 69, Funding Pips 68, BluSky Trading 68, Top One Futures 67, HyroTrader 67, Alpha Capital Group 66.
- A3 (preuve positive de payout) : **0→2 firmes, 1→92, 2→19, 3→1, 4→1, 5→6**. Soit **94/121** sous plafond théorique 64, **19** sous plafond 69, **1** sous plafond 79 et **7** sans plafond A3.
- **Nuance critique : seulement 4 notes sont effectivement abaissées par leur plafond A3**, car les autres ont déjà un brut − Trustpilot en dessous du plafond. Un diagnostic qui incrimine **uniquement** le plafond est donc faux.
- **Seules deux firmes** dépasseraient 70 en ôtant *uniquement* le plafond A3, sans toucher aux 13 critères ni aux preuves : Take Profit Trader 74 (aujourd'hui 64) et FXIFY 72 (aujourd'hui 69). Un retrait mécanique du plafond n'est **pas** un remède suffisant.
- B1 protection contractuelle : **21 dossiers à 0/15, 61 à 3/15, 34 à 6/15, 5 à 9/15**, aucun à 12/15 ou 15/15. **82/121** reçoivent donc 3 points ou moins : contrôler les clauses et le champ d'application *effectif* avant de traiter l'absence de contrat funded comme une confiscation prouvée.
- C2 registre actuel : **103/121** prennent 3/6 (incomplet), et C3 recherche de sanctions : **81/121** sont à 2/4. Ces valeurs provisoires « pas encore vérifié » pèsent lourd sur le score alors que l'absence de preuve de statut **n'établit pas un mauvais statut**.
- D3 cohérence de l'offre : **78/121** obtiennent 0 ou 2/6 (17 à 0, 61 à 2). A2 neutre : **114/121** à 6/10.
- Cohorte des 31 derniers audits : moyenne des finales ~57, B1 ~4,1/15, C1 ~4,2/10, C2 3/6 systématique, A3 ~1,3/5. Faible confiance déclarée sur chaque dossier ; les 31 notes sont des évaluations de risque **avec limites documentaires**, pas des résultats d'audit bancaire exhaustif.

### Anomalie réelle de code et correctif immédiat

Le moteur V5.2 calcule déjà `final = min(somme13 − 6 si notice Trustpilot, cap A3, cap légal)`. Le pipeline d'affichage `app/lib/propFirms.ts` appelait encore **`applyTrustpilotPenaltyRule`**, qui soustrayait un nouveau −6 si `reviewSignals.trustpilotRatingWithheld` est vrai, parce que `getFirmUpdate` retire le marqueur legacy `trustpilotPenaltyIncluded` pour les notes V5.2. **C'est un double compte de sanction (jusqu'à −12 sur un seul signal) et un décalage scorecard / score affiché**.

Sur les 121 grilles, **45** contiennent un malus officiel Trustpilot −6 déjà intégré. Cela n'affirme pas que les 45 ont tous subi la double déduction en front : cela dépend des signaux du profil et de la chronologie. Le chemin de code la permettait et doit être supprimé.

Correctif : quand une approbation V5.2 est *courante* et non remplacée par une édition plus récente, la règle legacy **n'enlève aucun point** et marque seulement `trustpilotPenalty.included=true` si la notice est affichée. Les versions V4/V5 non concernées continuent le mécanisme existant. **Pas de modification des 121 notes approuvées ni du barème V5.2.**

### Pourquoi il ne faut pas gonfler le classement artificiellement

1. Le **barème V5.2** adopté le 22/11/2026 demande d'appliquer des plafonds A3 stricts et de limiter les grades B1 lorsque la société dispose d'un large pouvoir de confiscation ou de refus de rémunération.
2. **Topstep, FTMO, The5ers, Tradeify** : les clauses de risque et le débiteur réel des gains doivent être vérifiés dans les agreements funded signés pour les cohortes, et pas seulement dans les conditions du challenge/marketing.
3. Les trackers on-chain indépendants confirment la trace de transactions sur la blockchain, mais peuvent compter des règlements opérationnels, affiliés ou fournisseurs. Leur existence ne certifie pas les *six maillons* propres à des traders de la bonne formule. L'absence de données bancaires publiques ne démontre pas absence de payouts.
4. Les sous-notes **B1, C1/C2/C3, D3** doivent être revues pour distinguer **risque contractuel démontré** et **vérification documentaire inachevée** ; pas d'augmentation automatique sans pièce.
5. Ne **pas** changer les plafonds A3, les 13 critères ou les pondérations pour faire apparaître arbitrairement des notes >70. Une éventuelle V5.3 doit être backtestée sur le même corpus (au moins 20 firmes), et explicitement approuvée avant recalcul/push.

### Suite ciblée de l'audit des audits

**Priorité haute :** FTMO, Topstep, MyFundedFutures, The5ers, Tradeify, FundedNext, FXIFY, Take Profit Trader, Breakout Prop, Alpha Capital Group.

Pour chacune, obtenir : (i) funded agreement et version datée pour programme/cohorte ; (ii) source primaire registre pour la bonne entité, agent vs contractant ; (iii) test B1 du droit aux **récompenses acquises** avec motif et recours ; (iv) A3 selon les 6 maillons/indépendance méthode/canal ; (v) vérifier B2 non doublé, Trustpilot actuel, clôture et affichage de confiance. Comparer les 13 points avant/après, citer un lien par variation. Éviter de faire rétrograder la firme simplement parce qu'un canal bancaire n'est pas public.

**Protection éditoriale :** ne modifier ni le classement, ni les scores 121, ni CK Capital, ni le placement FTMO sponsorisé avant résultats justifiés et nouvelle décision; la correction de la double application Trustpilot, elle, est un **bugfix** indépendant qui rétablit les scores approuvés.
