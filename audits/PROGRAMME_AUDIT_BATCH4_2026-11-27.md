# Programme audit batch 4 — 2026-11-27

Ten new programme/stage assessments and one checkout variant for three Futures firms. Independent from company /100.

| Firm | Programme / scoped stage | D | P | C | T | F | /5 |
|---|---|---:|---:|---:|---:|---:|---:|
| Apex | New EOD PA | .5 | 0 | .5 | 0 | .5 | 1.5 |
| Apex | New Intraday PA | 0 | 0 | .5 | 0 | .5 | 1 |
| Earn2Trade | TCP initial LiveSim | .5 | .5 | 1 | .5 | .5 | 3 |
| Earn2Trade | Gauntlet Mini initial LiveSim | .5 | .5 | 1 | .5 | .5 | 3 |
| Earn2Trade | Earned TCP 200K/400K live fixed floor | 1 | .5 | 1 | .5 | .5 | 3.5 |
| MyFundedFutures | Builder 50K default | .5 | .5 | .5 | 1 | .5 | 3 |
| MyFundedFutures | Rapid Intraday 50K | 0 | .5 | 1 | .5 | 0 | 2 |
| MyFundedFutures | Rapid EOD 25K/50K no DLL | .5 | .5 | 1 | .5 | 0 | 2.5 |
| MyFundedFutures | Rapid EOD DLL version | .5 | .5 | 1 | .5 | 0 | 2.5 |
| MyFundedFutures | redesigned Pro | .5 | .5 | 1 | .5 | .5 | 3 |
| MyFundedFutures | Signature 5K/10K/20K | 1 | 1 | 1 | .5 | .5 | 4 |

D drawdown; P payouts; C funded consistency; T trading; F extra funded conditions. All source URLs and scopes stored per criterion. These are editorial flexibility assessments of specified funded routes, not payout guarantees.

## Material findings and catalogue edits
- Apex new PA: six approved payouts followed by closure, permanent safety net equal to drawdown + $100, five new qualifying profit days, and strictly less than 50% best-day ratio. Do not prefill a 50% simulator threshold that treats equality as eligible. New-product evaluations are one-time 30-day purchases, distinct from monthly Legacy. Official homepage currently advertises limited-time Legacy FULL (six sizes, three vendors) and Instant 50K. Added both records, left unrated because promotional cohorts/Instant agreement still unverified. Legacy list prices captured for Tradovate, Rithmic and WealthCharts; $99 activation separate. Source: https://apextraderfunding.com/help-center/eod-payouts/eod-payouts/ ; https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-payouts/ ; https://apextraderfunding.com/legacy-products/
- Earn2Trade current subscriptions: fixed position cap instead of legacy progression ladder, 30% consistency only evaluation, five new qualifying profitable days per withdrawal, variable 50%/80% split based on individual payout and live transition thresholds. TCP 400K fixed 60/40. $139 LiveSim non-professional CME activation from first payout, funded data fees separate. Existing promotion orphan alias removed, canonical e2t-gauntlet retained. Source: https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy ; https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation
- MFFU: Rapid funded intraday differs from evaluation EOD; Rapid EOD optional DLL is soft pause, not hard fail. $10K single-day transition forfeits excess profit and may reserve $5K; do not generalize to all live transitions. Pro current cohort November 23. Builder 50K 50% funded consistency, $153 or $125 for tighter MLL option. Signature permanent range formerly Studio added with 5/10/20K, $75/$140/$280, static 5% max loss, no daily loss stop, no consistency or withdrawal buffer; daily realized profit ceilings and micro-only contracts plus live transition terms. Sources: https://help.myfundedfutures.com/en/articles/13134718-understanding-rapid-live ; https://help.myfundedfutures.com/en/articles/18543937-signature-plans-a-comprehensive-guide
- Only source-visible 50K standard prices captured for MFFU other plans; no extrapolation to other sizes. Apex current new-product and Instant exact purchase prices still require checkout verification. Promotional Legacy availability must be rechecked after sale ends. Earn2Trade generic LiveSim stage remains without one rating because terms depend on source programme.

## Integrity
55 connector-side checks passed, including references and preservation of original set, restrictiveRules and auditedPrograms for all three firms. All other firm records unchanged. Regression script now contains 64 assertions, not executed here. Vercel preview needed. No change to global scoring formula or score input fields. Note that existing data pipeline can derive firm starting price from product fees, so displayed starting prices may update.
Cumulative from ChatGPT batches: 30 baseline programme/stage records + 5 variants = 35 assessments; 30 firms with exact price tables, 94 schedules, 374 size-price rows. Not an exhaustive catalogue. Claude owns Forex/CFD.
