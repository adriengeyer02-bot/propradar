# Programme audit batch 4 — 2026-11-28

Base: main after PR #307. No firm /100 rating changes. Five additional variants; existing assessments preserved.

| Programme | Drawdown | Payout | Consistency | Trading | Funded | /5 |
|---|---:|---:|---:|---:|---:|---:|
| FTMO 2-Step Swing | 1 | 1 | 1 | 1 | 1 | 5 |
| FundedNext Stellar 2-Step 3 Day | 1 | 0 | 1 | .5 | .5 | 3 |
| FundedNext Stellar 2-Step On-Demand | 1 | .5 | .5 | .5 | .5 | 3 |
| FundedNext Stellar Lite 3 Day | 1 | 0 | 1 | .5 | .5 | 3 |
| FundedNext Stellar Lite On-Demand | 1 | .5 | .5 | .5 | .5 | 3 |

Sources:
- https://ftmo.com/faq/what-is-the-swing-account-type-and-how-does-it-work/
- https://help.fundednext.com/en/articles/10701585-how-often-will-i-receive-my-performance-reward
- https://help.fundednext.com/en/articles/15586820-does-fundednext-cfds-offer-on-demand-performance-rewards
- https://help.fundednext.com/en/articles/9929008-what-happens-when-the-trading-cycle-ends

FTMO Swing is selected at checkout and cannot be selected later from Standard. Lower leverage disclosed; stars measure funded rule flexibility, not leverage, pass probability or firm safety. FundedNext checkout options: 3-day requires 3 profitable days at >=1% each and 60% share; On-Demand requires 2% growth and 40% best day, 90% share. No paid add-ons assumed. 3-day winning days scored once under payout. 40% best-day scored only under consistency. Existing parent assessments inherited; no variant-specific checkout price verified, no change to price tables. Do not claim identical checkout cost. Simulator presets represent only documented inputs, not full payout eligibility.

TradeDay product catalogue / live policies require further review; The5ers Bootcamp drawdown ambiguity remains unresolved. Cumulative 29 complete assessments if previous audit total of 24 is accurate. Regression checks added; full runtime/build and visual QA pending.

UX handoff: separate branch from latest main; improve challenge discovery and commercial presentation, preserve visible material warnings and access to full audit. Do not change programmeFlexibility.ts, firm-updates.json, price-tables.json, scoring files, or simulator tests while programme audit work continues. Do not merge stale branches or overwrite current main.

## Follow-up — TradeDay and rating terminology

- Quick Pay: 0 + .5 + 1 + .5 + 0 = 2/5. Both evaluation modes become intraday Funded Sim; tiered profit split prevents a single accurate simulator split. Source: https://tradeday.freshdesk.com/en/support/solutions/articles/103000405228-what-is-quick-pay- ; excess above $10K gross forfeited: https://tradeday.freshdesk.com/en/support/solutions/articles/103000353468-quick-pay-funded-sim-path-to-live-trading
- Fast Pass: .5 + .5 + .5 + .5 + 0 = 2/5. Since 26 July, 45% gross-profit consistency including payouts, five winning days, caps $750–2,250. No net-cycle consistency preset. Source: https://tradeday.freshdesk.com/en/support/solutions/articles/103000404096-fast-pass-funded-sim-payout-policy ; live transition: https://tradeday.freshdesk.com/en/support/solutions/articles/103000404097-fast-pass-funded-sim-route-to-funded-live
- Both: permitted times and tier-one news restrictions: https://tradeday.freshdesk.com/en/support/solutions/articles/103000008889-what-are-the-rules-for-funded-funded-sim-and-funded-live-traders-
- Existing exact product IDs verified against firm-updates.json blob; no company scores or catalogue data modified. Cumulative 31 complete assessments based on previous count. 72 regression assertions prepared, execution/build pending.
- Visible label changed to Programme rating / Note du programme and equivalents across 15 locales. Internal names and formula unchanged; the rating covers funded-stage rules, not overall commercial value or safety.
- FundedNext variants independently corroborated by the 16 October reward FAQ (both 2-Step and Lite). Its current Lite guide has conflicting standard-cycle text, so retain date-specific FAQ as authority for the standard cycle and record discrepancy for review.
