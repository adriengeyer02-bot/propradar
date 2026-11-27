# Programme audit batch 6 — 2026-11-27

Ten funded-stage product assessments, four new catalogue records, corrections to existing product descriptions. Independent of company /100.

| Firm | Programme | D | P | C | T | F | /5 |
|---|---|---:|---:|---:|---:|---:|---:|
| OneUp Trader | Standard | 0 | .5 | 1 | 0 | 0 | 1.5 |
| OneUp Trader | Pro | 0 | .5 | 1 | 0 | 0 | 1.5 |
| OneUp Trader | Express requalification | 0 | .5 | 1 | 0 | 0 | 1.5 |
| TradeDay | Quick Pay | 0 | 1 | 1 | .5 | .5 | 3 |
| TradeDay | Fast Pass (post 26 July) | .5 | 0 | .5 | .5 | .5 | 2 |
| BluSky | Launch | 1 | 0 | 1 | .5 | 0 | 2.5 |
| BluSky | Propel | 1 | 0 | 1 | .5 | 0 | 2.5 |
| BluSky | Orbit | .5 | 0 | .5 | .5 | 0 | 1.5 |
| BluSky | Instant Sim Funded | 0 | 0 | 0 | .5 | 0 | .5 |
| BluSky | Direct to Funded | 1 | 0 | 0 | .5 | 0 | 1.5 |

D drawdown; P payouts; C funded consistency; T trading; F extra funded conditions. Each criterion has official source and reason. Not a company reliability score or payout guarantee.

## Evidence and distinctions
- OneUp: publicly documented funded terms apply across Standard/Pro and Express requalification; actual funding-partner contract may differ. Real-time trailing floor, protected withdrawal thresholds $1,500–$5,500, $1,000 minimum trader share, one free withdrawal per calendar week, 10% fee for extra requests. Weekly execution count at least half the evaluation weekly average; positive net P&L required at 15-day intervals during first 90 days; designated news flat and trade duration under ten seconds prohibited. No funded numerical best-day ratio listed. Express is only for eligible traders whose funded account was terminated within prior 24h, not instant funding; its evaluation DOES have the next-three-best-days rule. https://help.oneuptrader.com/article/372-funded-trader-rules ; https://help.oneuptrader.com/article/376-profit-info ; https://help.oneuptrader.com/article/488-express-funding-how-does-it-work
- TradeDay: all current Quick Pay funded sim loss floors trail intraday even after EOD evaluation; no funded ratio or withdrawal buffer. 50/50 below $4K, 80/20 above. Funded Live transition does not add a new drawdown allocation to transferred profits. Fast Pass new cohort (opened on or after 26 July) 45% of lifetime gross profits, not per-cycle net profits, five fresh qualifying days, tier caps $750–$2,250 and max 50% withdrawal; first request locks EOD floor at starting balance. Fifth request triggers live transition. Earlier cohort differs. Official evaluation minimum days remain inconsistent: three on purchase cards vs no formal minimum in help. https://tradeday.freshdesk.com/en/support/solutions/articles/103000008889 ; https://tradeday.freshdesk.com/en/support/solutions/articles/103000404096-fast-pass-funded-sim-payout-policy ; https://tradeday.freshdesk.com/en/support/solutions/articles/103000250682
- BluSky: distinct Launch/Propel after Buffer have fixed funded floor and no funded ratio. General October rules require $500 additional ordinary profit between payouts, rolling caps and non-withdrawable buffer; review before $10K aggregate profit for standard plans, with earlier discretionary review possible. Live starts at zero; eligible simulated profits go to a separate Bonus Vault and invitation stops all sim accounts' payout eligibility. Orbit uses EOD trailing, 40% net concentration, three-day payout spacing, distinct ceiling by size. Instant Sim 50K uses $2K intraday trailing, $53K withdrawal threshold and 21% ratio. Direct to Funded $3.5K uses $2.5K static loss and 21% ratio; fourth losing trading day in rolling ten closes account. Launch general overview says 55% evaluation consistency vs specific plan article 50%; left explicitly conflicting. https://help.blusky.pro/en/articles/17297032-sim-funded-accounts-rules ; https://help.blusky.pro/en/articles/12434469-sim-funded-accounts-processing ; https://help.blusky.pro/en/articles/17290897-live-brokerage-qualifying-transitioning-and-trading-a-live-account ; https://help.blusky.pro/en/articles/16300862-propel-plans-phases-rules-and-costs ; https://help.blusky.pro/en/articles/16300866-orbit-plans-two-phases-faster-payouts ; https://help.blusky.pro/en/articles/16300869-instant-funding-direct-to-funded-and-instant-sim-funded

## Integrity and limitations
New IDs correspond to the product records. Only three setProducts arrays edited in firm-updates; no changes to firm score inputs, restrictiveRules, other firms or prices. 79 regression assertions prepared (not executed in connector). Exact checkout price schedules remain open; no invented prices. Verify whether Static Growth is a separate purchasable family or a Propel static size path before adding another card. No blanket simulator ratio preset where cycle basis is incompatible. The parent PRs #308 and #310 must be reconciled/approved before release. Cumulative batch count: 50 programme/stage/variant assessments, including earlier batches; not yet all on main.
