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

## Consolidated additional batch — 2026-11-28

18 complete catalogue entries/variants (3 partial). Three E8 Futures offers are also listed under E8 Markets; shared duplicate catalogue IDs are not unique programmes. Exact product IDs verified against the existing firm-updates blob. No global rating changes or price mutations. All criteria have source URLs in programmeFlexibility.ts.

| Firm | Product ID | Stars |
|---|---|---:|
| apex-trader-funding | apex-eod-current | 2 |
| apex-trader-funding | apex-intraday-current | 1.5 |
| e8-markets | e8-one-current | 2 |
| e8-markets | e8-pro-current | 3.5 |
| e8-markets | e8-zero-current | 2 |
| e8-futures | e8-zero-max | 2 |
| e8-futures | e8-zero-starter | 2 |
| e8-markets | e8-signature-current | 1.5 |
| e8-futures | e8-signature-futures | 1.5 |
| funding-pips | pips-one-step-flex | 3.5 |
| funding-pips | pips-one-step-flex / on-demand | 2 |
| funding-pips | pips-two-step-standard | 3.5 |
| funding-pips | pips-two-step-standard / on-demand | 2 |
| funding-pips | pips-two-step-standard / weekly-60 | 3.5 |
| funding-pips | pips-two-step-pro | 3.5 |
| funding-pips | pips-two-step-pro / on-demand | 2 |
| funding-pips | pips-zero-direct | 0 |
| funded-trading-plus | ftp-pnpl-current | 1.5 |
| funded-trading-plus | ftp-express-current | Partial |
| funded-trading-plus | ftp-classic-current | Partial |
| funded-trading-plus | ftp-instant-current | Partial |

- E8 Zero current purchase cohort has four payouts, not five (official article contains stale five-payout introductory wording; explicit 1 October cutoff and FAQ resolve). E8 One FAQ says 4% dynamic/3% daily whereas custom-account pricing FAQ says 6%/4%; do not auto-preset loss percentage. Payout split varies. E8 duplicate listings not independent unique products.
- FundingPips scheduled vs on-demand routes distinguished. Current official pages report 80% bi-weekly Flex, and 100% on-demand rather than prior monthly wording; Standard and Pro also have on-demand. Warning system explicitly applies on on-demand routes; no automatic 100% split preset because strikes can reduce it. Current Pro evaluation minimum differs from prior audit, and newer catalogue also mentions Flex/Labs/Lite not yet mapped to exact product IDs. Product cards and pricing need a subsequent coordinated correction. Zero has 15% consistency, 1% floating open-risk cap and seven profitable days in rolling 30 days.
- FT+ Express/Classic/Instant left partial: source date/version and funded details require confirmation; Express page reports a last update after current date. PNPL rating scoped to the specific published rules, not necessarily every newer Activation Account. The5ers conflicts unresolved.
- Test assertions added (93 expected). No execution of full build or visual QA. One atomic commit for code/tests/audit; no production deployment. Existing programme rating formula unchanged.
