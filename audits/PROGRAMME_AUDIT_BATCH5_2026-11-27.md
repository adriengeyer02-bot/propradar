# Programme audit batch 5 — 2026-11-27
Scope: E8 Futures and Top One Futures, five existing product IDs confirmed in the price catalogue. Ratings are funded-stage flexibility out of 5, not a company score or payout guarantee.

| Firm | Programme | D | P | C | T | F | /5 |
|---|---|---:|---:|---:|---:|---:|---:|
| E8 Futures | Signature | .5 | 0 | .5 | 1 | 0 | 2 |
| E8 Futures | Zero MAX (80% baseline) | .5 | 0 | 1 | .5 | 0 | 2 |
| Top One Futures | Elite DAILY V2 | .5 | 0 | 1 | .5 | .5 | 2.5 |
| Top One Futures | Instant Sim Funded 2.0 | .5 | 0 | 0 | .5 | .5 | 1.5 |
| Top One Futures | Ignite | .5 | 0 | 0 | .5 | .5 | 1.5 |

D drawdown; P payouts; C funded consistency; T trading; F extra funded conditions. Each axis is sourced in programmeFlexibility.ts. Scope is current simulated funded cohort, not the evaluation. Payout progression is not a best-day concentration rule.

## Material findings
- Signature: permanent reserve equal to loss limit, five new qualifying days (0.3% each) between withdrawals, 35% consistency, tier/sequence caps; after four payouts, a free new challenge replaces funded account. https://e8futures.com/e8-signature-futures
- Zero MAX: remaining profit from a payout cycle becomes permanently non-withdrawable buffer. FAQ and cycle diagram specify deactivation after four payouts; one marketing line mentions a fifth, so retain the explicit FAQ interpretation and flag contradiction. Daily access and absence of funded consistency do not imply unrestricted access to profits. Starter has lower caps, requires separate product mapping and checkout pricing. https://e8futures.com/e8-zero
- Elite DAILY V2: buffer $1,500/$2,500/$3,500/$4,500 on 25/50/100/150K; caps $750/$1,000/$1,500/$2,250. From second request, at least half the request must come from new profits. No funded best-day ratio; evaluation has 40%. https://help.toponefutures.com/en/articles/15056446-elite-daily-v2-daily-payout-rules
- Instant 2.0 cohort starts 2026-07-27; new loss distances and payout caps differ from older accounts. 20% best-day limit and dynamic payout targets. https://help.toponefutures.com/en/articles/11020805-overview-of-the-instant-sim-funded-program
- Ignite: repeated 5% target, 15% concentration, $500–$2,000 cap per request, restrictions on bots/holding/copying. https://help.toponefutures.com/en/articles/12671168-ignite-accounts-overview
- Top One risk review after three payouts or earlier; other sim accounts disabled during transition. https://help.toponefutures.com/en/articles/11003130-path-to-trading-live

## Remaining catalogue work
Do not assign these ratings to similarly named products or legacy cohorts. E8 Zero Starter and 100% checkout option, Top One Elite ACCESS EOD/Intraday/Static, X-Daily Spark, Launchpad X-HYPER and other legacy/current paths require product IDs, availability and checkout verification. OneUp Trader, TradeDay and BluSky remain for next batch; preliminary official sources collected but no rating assigned here. No price or firm score input changed. No simulator consistency percentage prefilled because denominator and cohort semantics require separate verification.

Five additional regression assertions added; not executed in this connector. Stacked on PR #308 because its preview is ready but an automated sensitive wording gate requires human approval. Do not merge this branch directly into main before parent is approved; rebase/check against latest main and Claude's changes before release.
