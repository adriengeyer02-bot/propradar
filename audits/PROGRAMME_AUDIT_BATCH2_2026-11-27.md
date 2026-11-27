# Programme audit batch 2 — 2026-11-27

Eleven current Futures programme assessments; six CFD assessments already merged in PR #305. The /5 rating remains separate from the company /100. The scope printed on each card is binding; these are not assessments of all historical cohorts, options or live agreements.

| Firm | Programme | D | P | C | T | F | Stars |
|---|---|---:|---:|---:|---:|---:|---:|
| Take Profit Trader | Intraday | 0 | .5 | 1 | .5 | .5 | 2.5 |
| Take Profit Trader | Classic | 0 | .5 | 1 | .5 | .5 | 2.5 |
| Take Profit Trader | EOD | .5 | .5 | 1 | .5 | .5 | 3 |
| Alpha Futures | Zero | .5 | .5 | .5 | .5 | 0 | 2 |
| Alpha Futures | Standard | .5 | .5 | .5 | .5 | 0 | 2 |
| Alpha Futures | Advanced | .5 | .5 | 1 | 1 | 0 | 3 |
| Alpha Futures | Direct | .5 | 0 | 0 | .5 | 0 | 1 |
| Topstep | Original Trading Combine → XFA Standard, no optional DLL | .5 | .5 | 1 | .5 | .5 | 3 |
| Tradeify | Growth | .5 | .5 | .5 | .5 | 0 | 2 |
| Tradeify | Lightning | .5 | 0 | 0 | .5 | 0 | 1 |
| Tradeify | Select Flex, no add-on, current 25–150K | .5 | .5 | 1 | .5 | 0 | 2.5 |

D drawdown; P payouts; C funded consistency (evaluation-only rules disclosed, not penalized); T trading freedom; F other funded conditions. Reasons and official source links reside in app/lib/programmeFlexibility.ts. A /5 rating is editorial and scope-limited, not a payout or reliability guarantee.

## Catalogue changes
- Take Profit Trader launched three plans on November 23. Replace obsolete TEST/PRO/PRO+ cards (stages, not distinct purchases) with current Intraday, Classic and EOD purchase programmes. Explicitly preserve earlier cohorts in audit history. All three are offered in $25K/$50K/$150K. Nine sourced monthly prices. $130 separate PRO activation, waived under currently documented NOFEE40 terms; checkout verification remains necessary. New programme IDs mapped to the existing promo.
- Alpha Futures: complete Zero, Standard, Advanced, Direct. Link previously unmapped Advanced and Direct price tables. Keep Premium as historical incident, not a current sale offer. Four sourced programmes and 13 price rows. Current qualification rules and 2026 live-transition treatment explicitly noted.
- Tradeify: Elite Live transition can sacrifice simulated progress after last approved payout. Do not equate live transition to automatic forfeiture in every firm. Select Flex and Daily have distinct caps and parameters; first rating only Flex 25–150K no add-on. 300K, optional 50% consistency, Daily and older cohorts need their own records.
- Topstep: original trailing Combine only; XFA Standard scope. XFA Consistency, optional DLL cap increase, static Combine and limited/Labs products must be mapped separately. Do not represent a $50K XFA as a $50K starting cash balance.
- The5ers: High Stakes / Bootcamp still partial from batch 1. Next batches should verify contractual version, variants and missing product catalogue before stars.

## Integrity checks
- Connector-side checks: 40 product/price/promotion/reference and score-input assertions passed. Confirmed only Take Profit Trader and Alpha Futures records were semantically changed in firm-updates.json, preserving all other records byte-for-byte; existing restrictiveRules and set.score unchanged. Full test script extended to 43 assertions, not executed here. Vercel build still required.
- Price coverage: 28 firms, 81 grids, 339 size/price rows after this batch.
- No global score recalculation or change of scoring formula. Old TPT restrictive-rule classifications have not yet been migrated to new plans; must be audited separately before any company-score change. Other locales may show English source explanations until localization.
- Coordinate shared data files with Claude. Do not force-push or overwrite intervening changes.

Primary sources: official help-center links attached per criterion and per product in the repository. Public descriptions paraphrase the source rather than copying entire documents.
