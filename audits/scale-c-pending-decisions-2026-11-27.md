# Barème C : décisions sur les 27 pénalités en attente (27 novembre 2026)

Ce document propose des décisions ; il ne modifie aucune note. **Aucun fichier de notation, de production ou de traduction n'est modifié.**

- **Base :** `SCORING.md` sur origin/main, avec la révision proportionnelle D du 27 novembre 2026.
- **Lecture :** les CGU et FAQ de l'archive `agent/terms-archive` (captures du 25 novembre 2026), les PDF déposés par le propriétaire et, quand c'est indiqué, des extraits des centres d'aide officiels.
- **Écart :** points de la proposition moins points actuels, par critère. Une valeur négative signifie moins de pénalité, donc une note plus haute.
- **Recalcul :** le recalcul final reste au builder (plafond contractuel de 30, plafond consistency + D de 15).

## Synthèse

**23 décisions rendues et 4 non tranchées**, faute de source relisible.

| # | Société | Code | Actuel | Proposé | Décision |
|---|---|---|---:|---:|---|
| 3 | blusky-trading | D_ACCOUNT_ENDS_AFTER_PAYOUTS | 3 | 3 | maintien |
| 4 | city-traders-imperium | B6 | 5 | 5 | maintien |
| 5 | daytraders-com | B7 | 5 | 0 | suppression |
| 6 | e8-futures | D_PAYOUT_CAP | 4 | 2 | réduction |
| 7 | elite-trader-funding | B6 | 5 | 5 | maintien |
| 8 | elite-trader-funding | D_SPLIT_REDUCTION | 2 | 2 | maintien provisoire (motif corrigé) |
| 9 | for-traders | B7 | 5 | 5 | maintien |
| 10 | fxify | D_PAYOUT_CONDITIONS | 3 | 0 | reclassement proposé : D 3 → B4 3 (à valider) |
| 11 | hash-hedge | D_PAYOUT_CAP | 4 | 1 | réduction |
| 12 | hash-hedge | D_PAYOUT_CONDITIONS | 3 | 0 | suppression |
| 13 | hyrotrader | B7 | 5 | 5 | maintien |
| 14 | lucid-trading | D_PAYOUT_CAP | 4 | 1 | réduction |
| 16 | moneta-funded | B7 | 5 | 5 | maintien |
| 17 | myfundedcapital | B7 | 5 | 0 | suppression |
| 18 | oneup-trader | B7 | 5 | 5 | maintien |
| 19 | orion-funded | B6 | 5 | 5 | maintien |
| 21 | take-profit-trader | B7 | 5 | 0 | suppression |
| 22 | the-trading-pit | B6 | 5 | 5 | maintien (motif corrigé) |
| 23 | top-one-futures | D_ACCOUNT_ENDS_AFTER_PAYOUTS | 3 | 3 | maintien |
| 24 | trade-the-pool | B6 | 5 | 5 | maintien |
| 25 | trade-the-pool | B7 | 5 | 0 | suppression |
| 26 | tradeday | B7 | 5 | 0 | suppression |
| 27 | willis-capital | B6 | 5 | 5 | maintien (motif corrigé) |
| 1 | axi-select | B4 | 3 | — | non tranché |
| 2 | axi-select | D_PAYOUT_CONDITIONS | 3 | — | non tranché |
| 15 | lucid-trading | D_ACCOUNT_ENDS_AFTER_PAYOUTS | 3 | — | non tranché |
| 20 | sway-funded | D_PAYOUT_CONDITIONS | 3 | — | non tranché |

**Effet par société** (points de pénalité retirés, avant plafonds) :

| Société | Effet |
|---|---|
| Hash Hedge | −6 |
| TradeDay | −5 |
| Take Profit Trader | −5 |
| Trade The Pool | −5 |
| DayTraders.com | −5 |
| MyFundedCapital | −5 |
| Lucid | −3 |
| E8 Futures | −2 |
| FXIFY | 0 (reclassement de D vers B4, à valider) |

Les maintiens B6 de The Trading Pit et de Willis Capital changent de motif : le texte de la pénalité doit être réécrit.

## Règle appliquée pour B7

Je maintiens B7 seulement si un texte officiel établit que les conditions financées ne sont accessibles qu'après la réussite ou l'achat :
- HyroTrader : « provided at the point of transition » ;
- Moneta : « that the Company will provide you » ;
- OneUp : « upon approval, you will receive » ;
- For Traders : conditions fixées d'après le comportement en évaluation.

La simple existence d'un contrat séparé, une signature lors de l'activation ou l'absence de publication ne suffisent pas (politique du propriétaire du 27 novembre). Pour TradeDay, Take Profit Trader, Trade The Pool et DayTraders.com, les règles financées sont en plus publiées. Si un texte probant est trouvé, B7 est réintégré.

## Détail

Les citations sont reprises mot pour mot de la source ; les justifications détaillées sont en anglais, comme dans le JSON.

### #3 blusky-trading : D_ACCOUNT_ENDS_AFTER_PAYOUTS, 3 → 3 (maintien)

- **Citation :** « Eligible Sim Funded profits are placed into your Bonus Vault instead of becoming your live starting balance »
- **Article :** Sim Funded Accounts Rules §4–5 ; Live Brokerage (effective 1 Oct 2026)
- **Source :** https://help.blusky.pro/en/articles/17297032-sim-funded-accounts-rules
- **Justification :** Live starts at $0; sim profits go to a Bonus Vault 'paid according to the applicable Bonus Vault rules', which are not published in the article; the alternative is a buyout of 50% of the drawdown; the risk team can close the sim account at review. Preservation of all accrued gains is not shown, so the zero-cost exception does not apply.

### #4 city-traders-imperium : B6, 5 → 5 (maintien)

- **Citation :** « if the Client acts in a manner that may damage the Company's good reputation [...] restrict access to all or only some services without any prior notice and without any compensation »
- **Article :** §13.1 (localisation corrigée, au lieu de §12) ; §8.9.1 ; §8.11
- **Source :** upload PDF CTI T&C (archive 25/11/2026)
- **Justification :** Not limited to false statements; the sanction is restriction of access without compensation, and §8.11 removes rewards on any breach of the T&C.

### #5 daytraders-com : B7, 5 → 0 (suppression)

- **Citation :** « governed pursuant to separate or supplemental written agreement »
- **Article :** §3 Services
- **Source :** https://daytraders.com/help/articles/17704078-terms-of-use
- **Justification :** Only establishes that a separate agreement exists. No official text says the agreement is unavailable before purchase, and funded rules are published in the help centre. Under the owner's policy this is not proof (reinstate if a written statement or a refusal of pre-purchase access is documented).

### #6 e8-futures : D_PAYOUT_CAP, 4 → 2 (réduction)

- **Citation :** « $2,000 EOD - $50,000 account »
- **Article :** E8 Signature ; Payout caps and buffers for E8 Signature
- **Source :** https://intercom.help/e8/en/articles/11940573-payout-caps-and-buffers-for-e8-signature-explained
- **Justification :** Official formula: first capped withdrawal on 50K = $1,250 / initial funded loss budget $2,000 EOD (https://intercom.help/e8/en/articles/11755943-e8-signature) = 0.625, which costs 2 points. The '5 payouts then closure' limit reported elsewhere is not confirmed on an official page: review item, not counted.

### #7 elite-trader-funding : B6, 5 → 5 (maintien)

- **Citation :** « otherwise engages in conduct or activities that, in ETF’s sole discretion creates, reputational, regulatory, or financial risk to ETF »
- **Article :** Prohibited conduct (ad)
- **Source :** https://elitetraderfunding.app/terms-of-service
- **Justification :** Same scope as MyFundedFutures §16.1.3, which the owner kept at −5; maintained for consistency. Generic, not limited to false statements.

### #8 elite-trader-funding : D_SPLIT_REDUCTION, 2 → 2 (maintien provisoire (motif corrigé))

- **Citation :** « ETF reserves the right, at its sole discretion, to convert a Trader to a LIVE ELITE Account at any time, before, during, or after a Reward request. »
- **Article :** Terms — LIVE ELITE Program
- **Source :** https://elitetraderfunding.app/terms-of-service
- **Justification :** Archived terms (25 Nov): transition considered after one Reward, 5 active days or $1,000; pending Rewards can be applied to the LIVE ELITE allocation or the Vault instead of being paid. The 80/20 figure comes from /elite, which was not re-read. The $25,000 threshold in the current text contradicts the terms: rewrite.

### #9 for-traders : B7, 5 → 5 (maintien)

- **Citation :** « The specific rules of the Master Account will be communicated to the Client via a separate agreement and/or email notification from the Platform’s Risk Department »
- **Article :** §13.3–13.4
- **Source :** https://www.fortraders.com/terms-and-conditions
- **Justification :** §13.3 says Master Account conditions are set 'based on the Client’s trading behavior and performance during the evaluation phase' and may change leverage, risk per trade and margin. The funded terms therefore do not exist before purchase.

### #10 fxify : D_PAYOUT_CONDITIONS, 3 → 0 (reclassement proposé : D 3 → B4 3 (à valider))

- **Citation :** « Withdrawal requests of profits will be processed on demand, but can be requested no more than once every 30 days. »
- **Article :** User Agreement §5 (page modifiée le 25 mars 2025)
- **Source :** https://fxify.com/agreement/
- **Justification :** The agreement, still published, sets a 30-day minimum interval, while the programme page states 'First payout on demand' from the first funded day (https://fxify.com/fast-payouts/). This is a contradiction between two concurrently published documents (B4) rather than a proven payment window applicable to the current programme. Net unchanged (3 points); classification to confirm.

### #11 hash-hedge : D_PAYOUT_CAP, 4 → 1 (réduction)

- **Citation :** « the maximum payout amount per fourteen (14) calendar day period is USD 10,000 »
- **Article :** Commercial Terms §3 ; Challenge rules (Trader stage)
- **Source :** https://www.hashhedge.com/commercial-terms
- **Justification :** Trader stage: total loss 8% of account size (hashhedge.gitbook.io rules). No 50K size; nearest capped sizes are 25K and 100K. 100K: 10,000 / 8,000 = 1.25, which costs 1 point. The 14-day interval is not above 14 days.

### #12 hash-hedge : D_PAYOUT_CONDITIONS, 3 → 0 (suppression)

- **Citation :** « which may fall between fourteen (14) and sixty (60) calendar days from the opening of the first trade in that trading cycle »
- **Article :** Commercial Terms §3
- **Source :** https://www.hashhedge.com/commercial-terms
- **Justification :** The trader chooses the payout day from 14 days onward (standard timing); identity re-verification is reasonable verification (0); suspensions during a Hold are already counted under B2A −4. One fact, one penalty.

### #13 hyrotrader : B7, 5 → 5 (maintien)

- **Citation :** « Funded Trader Agreement — provided at the point of transition to the Funded Trader Phase or, for Hyro Instant, during setup before the account is Issued »
- **Article :** §6.4 ; Companion Policies (version 1.17, 4 Nov 2026)
- **Source :** https://www.hyrotrader.com/terms-and-conditions/
- **Justification :** Explicit written statement. §6.4: that agreement governs 'the performance-reward mechanism, payout schedule, additional trading rules'. For Hyro Instant it is provided after the non-refundable Instant Fee is paid.

### #14 lucid-trading : D_PAYOUT_CAP, 4 → 1 (réduction)

- **Citation :** « The buffer is equal to: Initial Max Loss Limit + $100 »
- **Article :** LucidPro Payouts (21 Oct 2026)
- **Source :** https://support.lucidtrading.com/en/articles/12890092-lucidpro-payouts
- **Justification :** 50K: required buffer $52,100, so the initial Max Loss Limit is $2,000; maximum first payout $2,000. Ratio 1.0, which costs 1 point. No fixed interval ('There is no fixed payout window'). The 40% consistency rule is scored separately.

### #16 moneta-funded : B7, 5 → 5 (maintien)

- **Citation :** « To accept the offer, you must sign a separate Funded Trader Agreement that the Company will provide you. »
- **Article :** §3.7 ; §3.10 (T&C September 2026)
- **Source :** https://www.monetafunded.com/pdf/MONETA_FUNDED_LTD_Terms_And_Conditions_September_2026.pdf
- **Justification :** The agreement is provided with the offer that follows the evaluation (§3.7), and the profit split arises only under it. Medium confidence: the help centre could not be read to exclude a published template.

### #17 myfundedcapital : B7, 5 → 0 (suppression)

- **Citation :** « (archive bloquée, 267 caractères : texte non relisible) »
- **Article :** —
- **Source :** https://myfundedcapital.com/terms-and-conditions/
- **Justification :** Current basis: 'whose text is not published'. Non-publication alone is not proof, and the terms could not be re-read to find a written statement on timing.

### #18 oneup-trader : B7, 5 → 5 (maintien)

- **Citation :** « we submit your results to our funding partners, and upon approval, you will receive and complete the trading contract and other documents required by our funding partners »
- **Article :** Getting Funded Process (help, updated 29 Jan 2026)
- **Source :** https://help.oneuptrader.com/article/520-getting-funded-process
- **Justification :** Written statement that the contract is received after approval, issued by a funding partner who is not identified before purchase. Published funded rules do not replace the contract.

### #19 orion-funded : B6, 5 → 5 (maintien)

- **Citation :** « or act in a manner that may damage our reputation, including after termination of the Agreement, we will terminate one or more Agreements and you will lose access to the Services »
- **Article :** §14.1 ; §14.2
- **Source :** https://www.orionfunded.com/docs/terms-and-conditions.pdf
- **Justification :** Mandatory termination without compensation (§14.2), not limited to false statements; same template as FTMO cl. 11.1.

### #21 take-profit-trader : B7, 5 → 0 (suppression)

- **Citation :** « Once you sign the POA form and your PRO trader contract, your PRO account will get created. »
- **Article :** —
- **Source :** https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/17239170507805-Understanding-the-POA-Form
- **Justification :** Establishes signature at activation, not that the contract is unavailable before purchase. The cited article (PRO Account Rules) could not be re-read (Zendesk blocked in the archive) and the PRO rules are published. Reinstate if a written statement is documented.

### #22 the-trading-pit : B6, 5 → 5 (maintien (motif corrigé))

- **Citation :** « including support messages, Client Area notifications, email correspondence, and decisions on your account – are confidential and may not be published »
- **Article :** §16.1 ; §16.3 ; §14.2.5
- **Source :** https://www.thetradingpit.com/general-terms-and-conditions
- **Justification :** §16.2 expressly exempts truthful statements and genuine reviews and does not ground the penalty. §16.1 does: publishing an account decision such as a payout refusal is sanctionable under §16.3 (withholding of undetermined Rewards, termination and permanent ban). The penalty text must be rewritten.

### #23 top-one-futures : D_ACCOUNT_ENDS_AFTER_PAYOUTS, 3 → 3 (maintien)

- **Citation :** « Rather than carrying over a capped amount of sim profits as was our previous policy, traders will receive live accounts »
- **Article :** Path to Trading Live (1 Oct 2026)
- **Source :** https://help.toponefutures.com/en/articles/11003130-path-to-trading-live
- **Justification :** Live starts at $0 and sim profits are not carried over; refusing the live account means closing the sim account. Accrued gains are not preserved, so the zero-cost exception does not apply.

### #24 trade-the-pool : B6, 5 → 5 (maintien)

- **Citation :** « You make any defamatory, disparaging, or harmful statements about the Company, its employees, or the Services on any public platform »
- **Article :** Terms of Use — Termination for Cause
- **Source :** https://tradethepool.com/terms-and-conditions/
- **Justification :** 'Disparaging' covers honest criticism; the same clause states that accrued profits or Reward Balance are immediately forfeited.

### #25 trade-the-pool : B7, 5 → 0 (suppression)

- **Citation :** « If you are accepted as a Professional User, the legal relationship between You and the Company will be governed by additional terms, which you will be required to accept in addition to these Terms. »
- **Article :** Terms of Use — Professional User
- **Source :** https://tradethepool.com/terms-and-conditions/
- **Justification :** Only a separate agreement. The Professional stage (payouts every 14 days, $300 minimum, parameters) is published in the Program Terms (tradethepool.com/program-terms/, archived).

### #26 tradeday : B7, 5 → 0 (suppression)

- **Citation :** « are governed by a separate agreement between the User and TradeDay »
- **Article :** §1 Definitions ; §3 ; §7
- **Source :** https://www.tradeday.com/terms-and-conditions
- **Justification :** No text on when the agreement becomes available. Funded Sim and Funded Live rules are published in the help centre (Freshdesk). Not proof under the owner's policy.

### #27 willis-capital : B6, 5 → 5 (maintien (motif corrigé))

- **Citation :** « Making derogatory or offensive statements about our company, employees, or affiliates »
- **Article :** Section « Defamatory Content »
- **Source :** https://www.wfunded.io/en/terms-and-conditions
- **Justification :** §5.3 alone (false, misleading or defamatory) would not qualify. The 'Defamatory Content' section also covers 'false or damaging information' and 'derogatory' statements: the contract is terminated immediately and all profits forfeited.

## Non tranchés

Ces pénalités restent appliquées en l'état jusqu'à relecture.

- **#1 axi-select B4 (3) :** The Program Rules and Withdrawal Rules PDFs (axidocs S3) are not in the archive; no re-reading possible.
- **#2 axi-select D_PAYOUT_CONDITIONS (3) :** Same: the cited programme page and PDFs were not re-read.
- **#15 lucid-trading D_ACCOUNT_ENDS_AFTER_PAYOUTS (3) :** The 'New live structure' article is not archived (main Lucid site blocked).
- **#20 sway-funded D_PAYOUT_CONDITIONS (3) :** The cited swayfunded.kb.help page is not archived and the archived T&C do not mention the 1.5% fee. Provisional view: probable suppression (fee, $10 minimum and closed positions are ordinary conditions) unless the trading freeze goes beyond processing time.

## Hors périmètre de ce fichier

- Les 93 dossiers historiques et les 40 sociétés hors proposition (`audits/scale-c-universe-coverage-2026-11-27.json`) ne sont pas traités ici.
- Les plafonds éditoriaux restent inchangés : voir la PR #299, en attente de validation.
