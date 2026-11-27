# Programme audit batch 3 — 2026-11-27

## Published candidate ratings (independent of company /100)

Three new purchase programmes, plus four separately scored funded-route variants. Existing baseline assessments remain unchanged.

| Firm | Programme / funded route | D | P | C | T | F | /5 |
|---|---|---:|---:|---:|---:|---:|---:|
| Topstep | Static Combine, XFA Standard | 1 | .5 | 1 | .5 | .5 | 3.5 |
| Topstep | Static Combine, XFA Consistency | 1 | .5 | .5 | .5 | .5 | 3 |
| Topstep | Freedom 250K, XFA Standard | .5 | .5 | 1 | .5 | .5 | 3 |
| Topstep | Original Combine, XFA Consistency (no optional DLL) | .5 | .5 | .5 | .5 | .5 | 2.5 |
| Tradeify | Select 25–150K Daily, since 1 Sep 2026 | .5 | .5 | 1 | .5 | 0 | 2.5 |
| Tradeify | Select 300K V2 Flex | .5 | .5 | 1 | .5 | 0 | 2.5 |
| Tradeify | Select 300K V2 Daily | .5 | .5 | 1 | .5 | 0 | 2.5 |

D drawdown; P payouts; C funded consistency; T trading freedom; F other funded conditions. Equal scores can reflect different restrictions. No claim that these ratings measure payout reliability or ease of passing. Sources attached per criterion in app/lib/programmeFlexibility.ts.

## Catalogue and price corrections

- Topstep confirms the 25/50/100/150K Static Combines and Freedom 250K are permanently purchasable. Static prices $75/$149/$199/$279 one-time; Freedom $499 one-time. Free XFA activation; evaluation expires after 90 days; no resets. Static XFA cap $4K/$8K/$10K/$12K. Freedom $25K cap and Standard only. Sources: https://help.topstep.com/en/articles/15520357-topstep-labs and https://help.topstep.com/en/articles/8284233-topstep-payout-policy
- Corrected ordinary Trading Combine XFA profit share to 90%; historical cohort exception to be treated separately. Standard and no-activation-fee purchase paths are distinct from Standard and Consistency funded payout paths.
- Tradeify 300K now separate: $570, $14K target, $8K EOD max loss and $4K daily limit, 40% evaluation consistency. Flex funded $8K loss / $4K daily; Daily $6K loss / $3K daily, $6,100 buffer and $4,000 cap, at least half the withdrawal from new profit. Source: https://help.tradeify.co/en/articles/17845238-300k-select-account-permanent-plan
- Select 25–150K: added 30% evaluation option; corrected 50K prices for 40% and 50% options ($174 and $216). Source: https://help.tradeify.co/en/articles/14369021-tradeify-pricing-reference
- Funded variants now shown within the parent product card with independent stars, criteria and variant-aware simulator links. Parent price tables remain shared. No duplicate purchased product created for a payout election.

## Still unresolved
- Topstep fixed-prize Challenges are current offers, but not conventional funded accounts: both rounds start at zero, a fixed one-off prize is paid on success and the account closes. Do not misuse prize size as account buying power in the current pricing schema. Need a dedicated fixed-prize model; Starter/Launchpad eligibility and temporary Daily Payouts+ drops require separate treatment. Source: https://help.topstep.com/en/articles/18466040-topstep-challenges
- Topstep optional DLL promotion changes XFA caps and checkout pricing; keep existing baseline scope, no unsupported permanent cap.
- The5ers Bootcamp: its educational guide explicitly says no published percentage consistency, but describes trailing drawdown with retained profit, while the general drawdown FAQ describes an absolute floor. Removed static assumption and mode preset; still unrated. High Stakes FAQ updated 24 Nov confirms payout caps on 50K and 100K; exact tier/cohort mapping still required. Sources: https://www.the5ers.com/fixed-vs-dynamic-profit-targets/ and https://the5ers.com/faqs/payout-policy-and-hub-credit-in-the-high-stakes-program/
- Existing ratings remain scope-limited. No global rating changes, no change to restrictiveRules or set fields.
- 32 connector-side catalogue and reference checks passed. Regression script now contains 52 assertions; full script and visual tests not executed here. Vercel build validation required.
- Price coverage after this batch: 28 firms, 85 grids, 348 size-price rows. Cumulative 20 baseline programmes plus 4 funded variants (24 assessments). The catalogue is not exhaustive.
