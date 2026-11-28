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

## Additional programme batch — verified 2026-11-28

Five firms, 15 complete catalogue entries and variants; exact IDs verified against current PR-base catalogue. OneUp Standard/Pro/Express share funded-stage rules, with Express restricted to previous funded traders. No price or company rating changes.

| Firm | ID | /5 |
|---|---|---:|
| blueberry-funded | blueberry-prime-2-step | 4 |
| breakout-prop | breakout-classic | 4.5 |
| breakout-prop | breakout-pro | 4.5 |
| breakout-prop | breakout-turbo | 4.5 |
| funderpro | funderpro-one-phase | 3.5 |
| funderpro | funderpro-classic | 3.5 |
| funderpro | funderpro-pro | 3 |
| ftuk | ftuk-flex-challenge | 1 |
| ftuk | ftuk-instant-funding | 1 |
| ftuk | ftuk-flex-futures | 2.5 |
| ftuk | ftuk-instant-sim-futures | 1.5 |
| oneup-trader | oneup-standard-current | 2 |
| oneup-trader | oneup-pro-current | 2 |
| oneup-trader | oneup-express-return | 2 |
| funderpro | funderpro-pro / daily-60 | 3 |

- Blueberry Prime post-17-August cohort, three 0.5% active days per reward; not the retired 2-Step. https://help.blueberryfunded.com/en/articles/12136509-what-is-the-prime-challenge ; https://help.blueberryfunded.com/en/articles/12136624-prime-reward-structure ; https://help.blueberryfunded.com/en/articles/12137041-which-trading-strategies-are-prohibited-on-the-prime-challenge.
- Breakout funded FAQ confirms approval after submission, unlike marketing wording suggesting immediate settlement: https://intercom.help/breakoutprop/en/articles/11647224-when-can-i-request-a-payout-from-my-funded-account. $50 after split and no open positions. Static loss limits retained from evaluation; no funded consistency or payout cap. Contract separately allows unilateral termination without notice and 90-day inactivity suspension: https://www.breakoutprop.com/funded-trader-agreement/. Stars are operational funded rules, not a finding of payout reliability. Spark002 is new and lacks a mapped ID; separate audit needed. Funded account activation after KYC/contract and final approval: https://intercom.help/breakoutprop/en/articles/11643924-if-i-pass-a-breakout-evaluation-do-i-automatically-become-a-funded-trader.
- FunderPro: separate Daily 60% vs Weekly 90% Pro choice; 20% funded margin cap per asset class, first profit removal, second hard breach. Swing and other add-ons not scored. https://support.funderpro.com/en/articles/421458-is-there-a-margin-rule-on-funded-accounts ; https://support.funderpro.com/en/articles/419844-how-does-reward-frequency-and-eligibility-work-for-funderpro-challenges.
- FTUK: 30-second minimum includes SL/TP exits. Forex consistency thresholds vary by level and strict inequality; no simple simulator consistency preset. Instant Forex target-based reward wording differs from broad on-demand marketing. Futures FLEX fresh-profit 50% rule: https://faq.ftuk.com/en/articles/17589504-flex-futures-daily-progression-rule. Instant Funding PRO Forex is a new separate purchase and needs mapped ID.
- OneUp: no funded evaluation-style consistency, but weekly trade-volume requirement and initial 90-day probation positive PnL check every 15 calendar days. https://help.oneuptrader.com/article/372-funded-trader-rules. No universal fixed profit split preset. Express is not open to first-time customers.
- Inventory scan: before this batch 149 catalogue IDs not referenced in programmeFlexibility.ts, including one assigned The5ers ID; after this batch 14 newly covered IDs, 135 still unreferenced on same catalogue snapshot, plus existing partials and unmapped offers. Not the number of all programmes market-wide. Cumulative 116 complete evaluations per previous running total (duplicates/variants included). Full runtime/build/visual validation pending. One atomic commit.

## Top One Trader / Futures, Instant Funding, Funding Traders, QT — 2026-11-28

23 exact existing product IDs reviewed, 17 complete and 6 partial. Current official product articles read; no catalogue prices or company scores changed. Scope and source at each axis; conflicting terms remain flagged.

| Firm | ID | /5 |
|---|---|---:|
| top-one-trader | top-one-trader-flash | 2 |
| top-one-trader | top-one-trader-2-step-pro | 2.5 |
| top-one-trader | top-one-trader-2-step-plus | Partial |
| top-one-trader | top-one-trader-instant-funding | 1.5 |
| top-one-trader | top-one-trader-instant-prime | 1.5 |
| top-one-trader | top-one-trader-magnum | 1 |
| top-one-trader | top-one-trader-nova | 1.5 |
| top-one-futures | top-one-elite-evaluation | 2 |
| top-one-futures | top-one-elite-daily | 3 |
| top-one-futures | top-one-elite-access | 2.5 |
| top-one-futures | top-one-instant-sim-funded | 2 |
| top-one-futures | top-one-ignite | 1.5 |
| instant-funding | instant-funding-pro | Partial |
| instant-funding | instant-funding-one-phase-pro | 2.5 |
| instant-funding | instant-funding-two-phase | 2.5 |
| funding-traders | funding-traders-pro6 | 3 |
| funding-traders | funding-traders-pro10 | 3 |
| funding-traders | funding-traders-1-step-pro | 1.5 |
| funding-traders | funding-traders-instant | Partial |
| quant-tekel | qt-one | Partial |
| quant-tekel | qt-two | Partial |
| quant-tekel | qt-instant | 1 |
| quant-tekel | qt-power | Partial |

- Top One Trader: ESS measures (largest winning day + absolute largest losing day) / net profit, not ordinary consistency. No best-day simulator preset for ESS. Profitable trades must last five full minutes, including automatic exits. PLUS is discontinued (https://help.toponetrader.com/en/collections/17913309-2-step-plus-accounts-discontinued), do not market as current; first payout raises static floor to initial balance. Magnum rating is 500K only. NOVA current help page shows $7 entry, unlike older $1 catalogue description; catalogue reconciliation needed. Funded NOVA daily loss 3%, not absent. https://help.toponetrader.com/en/articles/13832165-nova-account-overview.
- Top One Futures: Access EOD scope only; new static/intraday and other offers need separate IDs; Elite current sale status unconfirmed. Live pathway now pre-live / live from zero rather than capped carryover; do not infer forfeiture beyond explicit terms. Ignite 5% new target after each withdrawal is based on the new balance, not fixed original capital. https://help.toponefutures.com/en/articles/12707415-ignite-accounts-payout-requirements.
- Instant Funding: Smart hybrid floor is neither ordinary continuous trailing nor fixed throughout lifetime; no simulated preset. Pro percentage consistency not explicitly confirmed, remain partial. One-Phase Pro / Two-Phase have 40% funded best-day gate and 1.5% minimum net profit. https://instantfunding.com/help/payout-on-demand/.
- Funding Traders: current model-specific FAQ and older generic withdrawal policy differ, particularly Instant 14 days vs on-demand; retain partial Instant until contract cohort resolved. PRO programme ratings are explicitly scoped to current model-specific help rules; generic terms discrepancy displayed in scope. https://fundingtraders.com/withdrawal-policy.
- QT: August 11 new Instant uses 30% consistency (not old 25%), 100% share, 8% profit needed for first 5% withdrawal with 3% buffer; 1% risk per instrument and mandatory SL within 60s. QT ONE funded drawdown applicability, QT TWO funded consistency, and Power funded loss/trading details need confirmation. General payout article includes discretionary risk interview with forfeiture for nonattendance; no ordinary KYC penalty. https://support.qtfunded.com/support/articles/5613700809887-performance-fee-policy.
- Same catalogue inventory: 135 previously unreferenced IDs minus 23 = 112 still unreferenced; additional partials and unmapped variants remain. Running cumulative complete entries 133 (variants and repeated listings included). 23 new assertions; execution/build/visual validation pending. Single atomic commit; no main merge.

## Orion, WSFunded, Ment, Crypto Fund Trader, Funded7, DNA — 2026-11-28

25 catalogue IDs examined; 10 complete, 15 partial or legacy. Official help pages independently opened for active firms; DNA site returned HTTP 403, historical figures only. No company ratings/prices changed.

| Firm | ID | /5 |
|---|---|---:|
| orion-funded | orion-standard-2-step | 4 |
| orion-funded | orion-select-3-step | 4 |
| orion-funded | orion-nova-1-step | 1.5 |
| orion-funded | orion-zero-instant | 1.5 |
| wsfunded | wsfunded-instant-pro | 0.5 |
| wsfunded | wsfunded-instant-standard | 1 |
| wsfunded | wsfunded-classic-2phase | Partial/legacy |
| wsfunded | wsfunded-ultra-2phase | Partial/legacy |
| wsfunded | wsfunded-rapid-1phase | Partial/legacy |
| wsfunded | wsfunded-power-1phase | Partial/legacy |
| wsfunded | wsfunded-prime-1phase | Partial/legacy |
| ment-funding | ment-forex-1-step | 3 |
| ment-funding | ment-futures | 2.5 |
| ment-funding | ment-equities | Partial/legacy |
| crypto-fund-trader | cft-break | 2.5 |
| crypto-fund-trader | cft-evaluation | Partial/legacy |
| crypto-fund-trader | cft-accelerated | Partial/legacy |
| crypto-fund-trader | cft-instant | Partial/legacy |
| funded7 | funded7-two-phase | 2 |
| funded7 | funded7-one-phase | Partial/legacy |
| funded7 | funded7-instant | Partial/legacy |
| dna-funded | dna-1-phase-march-2026 | Partial/legacy |
| dna-funded | dna-2-phase-march-2026 | Partial/legacy |
| dna-funded | dna-rapid-march-2026 | Partial/legacy |
| dna-funded | dna-instant-march-2026 | Partial/legacy |

- Orion Zero trails closed balance; Nova funded trails equity, including unrealized gains. Both proportional floor examples differ from fixed-dollar simulator; 3% payout buffer and 20% best day. https://www.orionfunded.com/faq/programs/max-drawdown ; https://www.orionfunded.com/faq/programs/consistency-rule.
- WSFunded Instant: non-resetting floor may cause immediate breach after withdrawal; 4 days >=0.5% each. Direct 1% idea-risk violation cancels account and payout; Classic/Ultra/Rapid analogous 50% daily drawdown rule. https://faq.wsfunded.com/en/articles/13609936-new-dashboard-update-softbreach-suspensions-and-breach. Do not assume missing consistency means none. Power drawdown scope unresolved.
- Ment: Forex and futures 6% fixed initial loss moves once at first payout, not ordinary static for entire account life. Forex >1M separate 35% consistency. Equities Static/Trailing distinct; exact execution freedoms pending. https://mentfunding.com/.
- CFT Instant discontinued per FAQ. Break 40% lifetime profit denominator, paid activation after review. Generic catalogue IDs not uniquely mapped. https://cryptofundtrader.com/faq/.
- Funded7 quality score not best-day consistency: QC >=0.90 based on top three trade profits, plus dynamic trade-size outlier gate and minimum activity. Restricted tiers and max portfolio risk explicit. https://funded7.com/faq/rule-1-payout-criteria/ ; https://funded7.com/faq/rule-2-3-position-risk-execution/. One/Instant trailing mechanic not fully confirmed; partial.
- DNA new orders reportedly suspended; no closure asserted. Official site inaccessible 403 at review; historical March scope and no current stars. Secondary current status: https://bestprops.com/what-is-dna-funded/ ; https://propdesknews.com/firms/dna-funded/rules/. Do not promote until verified.
- Inventory: 112 unreferenced IDs before this batch, 87 after; existing partials and unlisted variants remain. Running cumulative 143 complete entries (variants/repeated listings included). 25 new assertions. No full execution/build/visual validation yet; single atomic commit.

## TradeXProp, Atmos, Clarity, FTM, Traders Launch, DayTraders + Claude review — 2026-11-28

22 new catalogue IDs, 14 complete, 8 partial. Official pages checked today. Claude PR #318 proposal preserved verbatim in audits/CLAUDE_PROGRAMME_BATCH_2026-11-28.json; 7 mapped programme entries reviewed/updated, 5 newly complete, PNPL re-rated. No price or company rating changes.

| Firm | ID | /5 |
|---|---|---:|
| tradexprop | tradexprop-x-1-step | 3.5 |
| tradexprop | tradexprop-x-2-step | 3.5 |
| tradexprop | tradexprop-instant-funded-x | Partial |
| tradexprop | tradexprop-crypto-x-1-step | Partial |
| tradexprop | tradexprop-crypto-x-2-step | Partial |
| atmos-funded | atmos-nova | 1.5 |
| atmos-funded | atmos-2-step-standard | 4 |
| atmos-funded | atmos-instant-funding | 1 |
| clarity-traders | clarity-instant | 2.5 |
| clarity-traders | clarity-1step | 2.5 |
| clarity-traders | clarity-2step | 2.5 |
| funded-trader-markets | ftm-1step-nitro | Partial |
| funded-trader-markets | ftm-2step-plus | Partial |
| funded-trader-markets | ftm-instant-standard | Partial |
| funded-trader-markets | ftm-instant-pro | Partial |
| funded-trader-markets | ftm-instant-plus | 0.5 |
| traders-launch | traders-launch-futures-standard | 3 |
| traders-launch | traders-launch-futures-legacy-nyc | 3 |
| traders-launch | traders-launch-static-25k | Partial |
| daytraders-com | daytraders-trailing | 1.5 |
| daytraders-com | daytraders-eod | 2 |
| daytraders-com | daytraders-static | 2.5 |
| the5ers | the5ers-high-stakes-current | Partial |
| the5ers | the5ers-bootcamp-current | 4 |
| the5ers | the5ers-hyper-growth-current | 4 |
| funded-trading-plus | ftp-express-current | 3.5 |
| funded-trading-plus | ftp-classic-current | 3 |
| funded-trading-plus | ftp-instant-current | 3 |
| funded-trading-plus | ftp-pnpl-current | 2 |

- TradeXProp Forex consistency uses daily equity snapshots, not simple closed net P&L; no consistency preset. Crypto and Instant unresolved.
- Atmos funded FAQ vs archived customer agreement differs on news window and payout intervals; scope visible. Clarity terms §§6–8 contain unfilled placeholders, but fixed overall floor expressly stated; Instant daily trail is separate.
- FTM Shield reduces split down to 20%; Standard and Pro open issues retained. Traders Launch Static 25K exact funded floor and distinct payout tiers require verification. Legacy availability not asserted.
- DayTraders all three Pro routes have 30% consistency and 8 qualifying days; official live pathway generally forfeits remaining simulated balances. Session close guidance coexists with overnight/weekend permission, not an automatic liquidation.
- Claude source review: The5ers numerical stop-out examples establish fixed floor; Bootcamp 4% Pro per scaling table, Hyper Growth 6%. High Stakes consistency stays unassessed (general FAQ does not map account types; blog says 50%). No unsupported exact tier preset. Funded Trading Plus date format MM.DD.YYYY established by 09.24.2026. Express and Instant dates are 12 August, not future. PNPL 25% consistency rated 0; payout moderate gate .5, trading 1, total 2. Classic 3% symbol hard breach assigned to funded axis (0), not double-counted under trading; minimum 1% payout .5, total 3. No net-cycle consistency preset due retained-profit example. Claude's original 3.5 remains traceable in source file. Hola Prime 7 proposed product IDs and 8 variants not integrated until catalogue mapping; 10 complete proposals, 5 partial including variants, not counted as integrated. The5ers two additional proposed IDs also not added. Evolve Markets not added, Claude reports broker winding down; official site inaccessible on independent recheck.
- Running catalogue snapshot: 87 unreferenced before, minus 22 newly referenced and one Hyper Growth ID = 64 remaining; partial and proposed/unmapped offers additional. Cumulative 162 complete entries by previous running tally (variants/repeated listings included). Existing PNPL update not counted twice. Full runtime/build/visual validation pending; single atomic commit.
