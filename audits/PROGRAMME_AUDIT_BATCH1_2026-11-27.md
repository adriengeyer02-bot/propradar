# Programme audit batch 1 — 2026-11-27

## Published pilot rating (proposed programme rubric, independent of company /100)

Five axes, one point each (0 / 0.5 / 1). Do not duplicate restrictions across axes. Ordinary verification and ordinary minimum fees are not penalised. A 14-day ordinary payout schedule is not restrictive; longer ordinary first wait is moderate. Severe loss of access to rewards counts under payouts. Current Standard option is the baseline where optional variants differ; the scope is visible next to stars.

| Firm / exact product ID | Drawdown | Payout | Consistency | Trading | Funded | Stars |
|---|---:|---:|---:|---:|---:|---:|
| ftmo / ftmo-two-step-current | 1 | 1 | 1 | .5 | 1 | 4.5 |
| ftmo / ftmo-one-step-current | .5 | 1 | .5 | .5 | 1 | 3.5 |
| ftmo / ftmo-instant-current | 0 | 0 | .5 | .5 | 1 | 2 |
| fundednext / fundednext-stellar-one-current | 1 | 1 | 1 | .5 | .5 | 4 |
| fundednext / fundednext-stellar-two-current | 1 | .5 | 1 | .5 | .5 | 3.5 |
| fundednext / fundednext-stellar-lite-current | 1 | 1 | 1 | .5 | .5 | 4 |

Source URLs and reasons are in app/lib/programmeFlexibility.ts. These are editorial flexibility ratings based on public product rules, not a guarantee of contractual completeness, reliability or payout eligibility. FTMO Swing differs on the trading axis; older FTMO 1-Step differs in the consistency denominator. FundedNext faster payout options have additional conditions. Do not treat the baseline as a rating of those variants.

## Partial review / important gaps

- The5ers High Stakes: general FAQ lists $3,000/$4,000 caps on $50K/$100K and 14-day withdrawals; drawdown FAQ now states 8–10% absolute and 3–5% daily. Map exact tiers and programme scope before publishing a rating. The separate 2-Step FAQ lists a $100K Pro account with 50% funded consistency and $2,000 cap; do not silently conflate it with all High Stakes accounts. https://the5ers.com/faqs/what-are-the-general-rules-for-the-high-stakes-program/ ; https://the5ers.com/faqs/what-is-the-drawdown-rule-for-high-stakes/ ; https://www.the5ers.com/faqs/2-step-plan-rules-specifications/
- The5ers Bootcamp: verify no percentage consistency explicitly in contract, exact fees and funded payout policy. Pro max loss 4%, evaluation 5%, daily pause 3% on Pro; 14-day cycle restarts when scaling. https://the5ers.com/faqs/how-does-the-bootcamp-program-work/ ; https://the5ers.com/faqs/what-is-drawdown-and-how-is-it-calculated/
- FTMO also markets Futures; verify separate programme inventory, entity and terms.
- FundedNext official CFD catalog lists Stellar Instant in addition to the three rated products. Price tables have no Stellar Instant schedule. Verify actual profile and add missing verified product/tariff if absent. https://fundednext.com/cfds
- The5ers public catalogue includes Growth, High Stakes, Bootcamp and Futures; currently sourced tariff JSON contains only High Stakes and Bootcamp. Check whether Growth, Futures and ProGrowth need distinct product IDs and variants.

## Catalogue completeness baseline

Read app/data/price-tables.json on main on 27 November: 28 firms have detailed published price tables, 79 price schedules, 335 size/price rows. These are not 79 distinct products: variants can share one product ID. Some rows lack an exact product ID (e.g. Alpha Futures Advanced and Direct). Prioritize filling missing mappings and source coverage before creating new ratings.

Next: Topstep, Alpha Futures, Tradeify, Take Profit Trader, complete The5ers and FundedNext/FTMO Futures+Instant gaps. Audit exact offers, account sizes, funded-phase constraints and separate checkout options. Use small independent PRs; do not modify overall score or overwrite Claude SEO changes.

Status: six rated product records, two partial records; site-wide review not complete. Existing test script extended; run locally/CI before calling tests passed.
