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

## Additional CFD audit — Blue Guardian, BrightFunded, GOAT

13 existing catalogue IDs reviewed; 12 complete and one legacy-only partial. All five criteria sourced in programmeFlexibility.ts; no firm score or price changes. Current published help-center pages retrieved 28 November. Scores apply only to specified cohorts.

| Firm | Product ID | /5 |
|---|---|---:|
| blue-guardian | bg-one-standard-current | 2 |
| blue-guardian | bg-two-standard-current | 3 |
| blue-guardian | bg-two-nano-current | 3.5 |
| blue-guardian | bg-instant-standard-current | 1 |
| blue-guardian | bg-instant-starter-current | 0.5 |
| brightfunded | bf-one-step-daily-current | 2.5 |
| brightfunded | bf-two-step-bright-current | 4 |
| brightfunded | bf-instant-current | 0.5 |
| goat-funded-trader | goat-one-new | 2.5 |
| goat-funded-trader | goat-two-standard-new | Legacy / partial |
| goat-funded-trader | goat-instant-goat | 0.5 |
| goat-funded-trader | goat-instant-premium | 1.5 |
| goat-funded-trader | goat-instant-daily | 1.5 |

- Blue Guardian: Instant Starter request cap $250 gross, 90% split = $225 before external fees, then closes. Shield 1% instant/2% standard; after first trigger split reduced to 50%, second closes. Nano no Shield. Minimum hold two minutes funded. Standard and Instant conditional split omitted from numeric preset. New 1-Step Nano and BNPL listed in official current index, exact catalogue IDs missing; no unsupported new purchase cards added.
- BrightFunded: post-16-Nov models only, 1% buffer on Daily, 3% on Instant; Instant 15% best day, five 0.5% days, biggest losing trade no greater than biggest winner. Inactivity reactivation ends 30 November. No penalty for ordinary KYC.
- GOAT: official current 2-Step Standard explicitly no longer available; legacy note only, catalogue still needs removal from purchase filters. News policy changed 24 Nov to cap aggregate profit per release rather than trade (3% post-10-Nov; 1% older); funded minimum hold 60s post-6-Oct. All current payouts subject to best-win/worst-loss condition, 3% processing fee and trading pause during processing. Initial caps and deducted daily profit are material. Additional new products and Instant Daily static variant need catalogue mapping. General news policy: https://help.goatfundedtrader.com/en/articles/10742084-is-news-trading-allowed. No unsupported fixed split preset where conditional.
- Regression: replaced brittle printed assertion count with success text; loop-expanded executions exceed static count. Full runtime/build/visual checks pending. Cumulative 61 complete catalogue evaluations per prior audit count, including duplicate E8 listings. No production deployment.

## Six-firm audit — 2026-11-28

25 catalogue entries and funded choices: 20 complete and 5 partial. Official programme pages consulted today; no global score or pricing edits. Exact product IDs from main catalogue. Scope only current default funded rules unless indicated.

| Firm | ID | Stars |
|---|---|---:|
| audacity-capital | audacity-ability-challenge | 4.5 |
| audacity-capital | audacity-ability-one | 4 |
| audacity-capital | audacity-ftp-instant | 2.5 |
| city-traders-imperium | cti-one-current | 3.5 |
| city-traders-imperium | cti-two-current | 4 |
| city-traders-imperium | cti-instant-current | 3 |
| city-traders-imperium | cti-direct-current | 4 |
| alpha-capital-group | alpha-pro | 3 |
| alpha-capital-group | alpha-one | 1.5 |
| alpha-capital-group | alpha-direct | 0.5 |
| fintokei | finto-start-new | 3 |
| fintokei | finto-swift-new | 3.5 |
| fintokei | finto-pro-two | 4.5 |
| fintokei | finto-swing-two | 4.5 |
| myfundedfutures | mffu-rapid-intraday | 2 |
| myfundedfutures | mffu-rapid-eod | 2.5 |
| myfundedfutures | mffu-pro | 2.5 |
| myfundedfutures | mffu-builder | Partial |
| fxify | fxi-two-pro | 3.5 |
| fxify | fxi-instant-lite | 1.5 |
| fxify | fxi-one | Partial |
| fxify | fxi-two-std | Partial |
| fxify | fxi-two-classic | Partial |
| fxify | fxi-three | Partial |
| alpha-capital-group | alpha-pro / on-demand | 2.5 |

- Audacity: November 2 cohort; Ability One evaluation-day conflict remains within its own FAQ; funded-stage rules agree. FTP daily equity trail separate from overall floor; no constant split preset.
- CTI: Direct marketing claims on-demand after day five, comparative page says twice monthly subsequently. Conservative payout score until clarified. No payout consistency, scaling-only 20% on direct plans. Half initial allocation for Instant.
- Alpha: Pro baseline biweekly, separate on-demand route. Direct requires 3% buffer + 1% profit and 15% concentration; one-percent per-asset hard risk limit. Pro/One max-risk rule and lot limits.
- Fintokei: SwiftTrader reward now 90% for post-15 July purchases, previous catalogue says 80%; catalogue update pending. StartTrader lifetime $400 cap and max two requests. Default versus individualized restrictions distinguished; no claim that restrictions never apply.
- MFFU: Pro redesigned effective 23 November, reserve and forfeiture policy; Rapid 50K representative no DLL; optional DLL and new Signature not yet mapped. Builder guide now Legacy; remain partial until new products reconciled.
- FXIFY: Pro first-two-payout surplus deducted, Lite 20% consistency. Other four remain partial pending funded trading rule evidence. Do not equate missing evidence to absence. Full runtime/build/visual checks pending. Cumulative 81 complete catalogue evaluations per prior count (duplicate E8 listings included).
