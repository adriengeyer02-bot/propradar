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

## Futures, stock programmes and FXIFY completion — 2026-11-28

18 entries reviewed, 14 complete including four previously partial FXIFY entries and one checkout variant. 4 partial. Official pages verified in this pass; prior source assertions should not be treated as independent verification. Existing catalogue IDs preserved, no price or firm rating modifications.

| Firm | ID | /5 |
|---|---|---:|
| earn2trade | e2t-tcp | 3 |
| earn2trade | e2t-gauntlet | 3 |
| earn2trade | e2t-livesim | 3 |
| earn2trade | e2t-tcp-large-fixed | 3.5 |
| the-trading-pit | ttp-futures-prime | 3 |
| the-trading-pit | ttp-futures-instant | 1.5 |
| trade-the-pool | ttp-day-max | 3 |
| trade-the-pool | ttp-day-flex | 2.5 |
| trade-the-pool | ttp-swing-max | Partial |
| trade-the-pool | ttp-swing-flex | Partial |
| trade-the-pool | ttp-edge | Partial |
| funded-futures-network | funded-futures-network-max-standard | 2.5 |
| funded-futures-network | funded-futures-network-steady | Partial |
| fxify | fxi-one | 3 |
| fxify | fxi-two-std | 3 |
| fxify | fxi-two-classic | 3.5 |
| fxify | fxi-three | 4.5 |
| fxify | fxi-two-classic / monthly-100 | 3.5 |

- Earn2Trade: actual partner funded rules distinguish LiveSim EOD and Live trailing, TCP 200K/400K fixed. Five profitable days, no funded percentage consistency or buffer; lifetime LiveSim withdrawal thresholds trigger transition. Generic LiveSim duplicates programme routes, not unique purchase. Fee and share vary; no single split preset.
- The Trading Pit: Instant requires a fresh profit goal each payout cycle; Prime five days at $150, 50% profit cap. Current English page USD prices contrast with catalogue EUR; no price conversion or replacement without locale scope.
- Trade The Pool: position concentration not day concentration; no numeric simulator consistency preset. Day floor resets at 3× daily limit, not standard continuous trailing. Swing and Edge exact funded floor movement unresolved, no full stars until verified. Edge first 4% profit target before payout, then 1%/1.5%.
- FFN: MAX Standard 50K representative. STEADY news and automation conflict remains, do not infer missing criterion. No claim that a live review necessarily closes all accounts based solely on current account card.
- FXIFY: One/Two Standard/Three have explicitly no consistency; Classic funded 25% historical best day does not reset at withdrawal, so no standard net-cycle preset. Add monthly 100% route. Ordinary payout cycle differences and trailing floor risk captured. Existing Instant Lite also has non-reset historical best day; do not model it as per-cycle net.
- Hola Prime: archived evidence dossier dated 26 Nov read; no setProducts mapping in current firm-updates blob. Do not invent product IDs, and do not assign complete ratings until exact schedules/IDs and funded-stage details matched. Catalogue coordination required.
- Cumulative 95 complete catalogue evaluations per prior audit count, duplicates included; four completed entries previously had no score. Full runtime/build/visual validation pending; single atomic commit.

## Maven, Lux, FundedNext audit and parallel-work handoff — 2026-11-28

| Firm | ID | /5 |
|---|---|---:|
| maven-trading | maven-standard-one-step | 2.5 |
| maven-trading | maven-standard-two-step | 3.5 |
| maven-trading | maven-standard-three-step | 3.5 |
| maven-trading | maven-static-one-step | 3 |
| maven-trading | maven-instant | 0.5 |
| lux-trading-firm | lux-1-step-evaluation | Partial |
| fundednext | fundednext-stellar-instant-current | 2 |

- Maven: Standard 1/2/3 no consistency; all models $10K rolling 30-day cap. Static M2 permanently reduces split to 50% on first 2% trigger and closes on second. Static news wording conflicts, both versions restrict profits. Instant timing conflicts between public FAQ and help centre (10 business days vs on demand); score reflects undisputed 3% growth gate and cap, no false certainty about timing. The equity-percentage trailing formula does not fit the existing fixed-dollar simulator; no unsupported drawdown preset. OMO, BNPL, Mini and Predictions require new catalogue mapping. Sources: https://maventrading.com/faqs, https://maventrading.crisp.help/en/article/what-are-the-drawdown-limits-ddpi2b/, https://maventrading.crisp.help/en/article/payout-requirements-for-funded-trading-accounts-14yu6of/, https://maventrading.crisp.help/en/article/instant-funded-account-rules-1k2ozdo/, https://maventrading.com/static-1-step.
- Lux: one unresolved criterion (payout) blocks stars; do not treat alternative public rulebook as current without proof. Sources: https://luxtradingfirm.com/rules-of-engagement-3/, https://luxtradingfirm.com/trading-rules/, https://luxtradingfirm.com/t_c-2/.
- Stellar Instant: 5% growth gate, EOD check, non-resetting floor, 3% aggregate risk, no best-day ratio. Quick Strike warning 20%, 30% after warning leads to forfeiture and possible closure at cycle end. Existing Stellar ratings should be reviewed consistently for Quick Strike treatment; no silent change in this batch.

### FundedNext Futures — candidates only; catalogue mapping required

No separate FundedNext Futures setProducts in checked firm-updates blob and no futures price rows for this firm. Do not invent IDs or count these as integrated ratings. Proposed axes D/P/C/T/F (current simulated funded baseline, no add-ons) must be reviewed with live-transition policy before integration. Shared restrictions: news and bots permitted; daily closure, micro-scalping policy and prohibited strategies apply. Sources: https://helpfutures.fundednext.com/en/articles/17225754-what-are-the-trading-hours-in-fundednext-futures and https://helpfutures.fundednext.com/en/articles/14298337-what-are-the-prohibited-trading-strategies-of-fundednext-futures ; live transition https://helpfutures.fundednext.com/en/articles/16522296-road-to-live-trading-rapid-flex-direct.

| Model | D/P/C/T/F | Candidate stars | Evidence |
|---|---|---:|---|
| Legacy | 0.5/0.5/1/0.5/0.5 | 3 | EOD trailing; 5 benchmark days, $500 profit, $250 minimum; 50% and caps lifted after 30 benchmark days, full withdrawal still hard breach; 80% split; no funded consistency. [Rules](https://helpfutures.fundednext.com/en/articles/17229581-fundednext-futures-legacy-fundednext-account-all-rules) |
| Flex | 0.5/0.5/1/0.5/0 | 2.5 | EOD trail; 5 benchmark days, $500 profit, capped 50% withdrawal and 95% split; no funded consistency; closes after five rewards. [Rules](https://helpfutures.fundednext.com/en/articles/17229848-fundednext-futures-flex-fundednext-account-all-rules) |
| Rapid Pro | 0.5/0.5/0.5/0.5/0 | 2 | EOD trail, no default DLL, three-day payouts with $500 cycle profit and $250 minimum; 40% funded consistency; 90% split, caps by tier and cycle; closes after five rewards. [Rules](https://helpfutures.fundednext.com/en/articles/18568699-fundednext-futures-rapid-pro) |
| Rapid Daily | 0.5/0.5/1/0.5/0 | 2.5 | EOD trailing, daily withdrawal above drawdown+$100 buffer and $500 cycle profit, $250 minimum; no funded consistency; 90% split; closes after five rewards. [Rules](https://helpfutures.fundednext.com/en/articles/18568768-fundednext-futures-rapid-daily) |
| Direct 50K | 0.5/0/0/0.5/0 | 1 | EOD trailing with $2,100 buffer, 20% all-time best day versus current cycle profit, $800–$1,200 withdrawals at 90%; closes after five rewards; 100K/150K table conflicts with one-size text, scope 50K only. [Rules](https://helpfutures.fundednext.com/en/articles/17430065-fundednext-futures-direct-account-all-rules) |

Claude handoff: The5ers, Funded Trading Plus, Hola Prime, Evolve Markets; separate JSON audit file only. Do not touch those ratings in this batch. Cumulative 101 complete integrated catalogue evaluations per prior count, includes duplicated listings; five Futures candidates excluded. Tests added, full runtime/build/visual validation pending; single commit.
