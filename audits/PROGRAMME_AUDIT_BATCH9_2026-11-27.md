# Programme audit batch 9 — 2026-11-27

Nine completed funded-stage flexibility assessments and two new Top One Futures catalogue paths; two Apex offers remain unrated. Separate from company /100.

| Firm | Programme | D | P | C | T | F | /5 |
|---|---|---:|---:|---:|---:|---:|---:|
| Traders Launch | Standard / Premium 60 or 80% | 1 | .5 | 1 | .5 | .5 | 3.5 |
| Traders Launch | Legacy NYC | 1 | .5 | 1 | .5 | .5 | 3.5 |
| Traders Launch | Static 25K, 90% option | 1 | .5 | 1 | .5 | .5 | 3.5 |
| Ment Funding | Futures | 1 | 0 | .5 | .5 | .5 | 2.5 |
| E8 Futures | Zero Starter | .5 | 0 | 1 | .5 | 0 | 2 |
| Top One Futures | Original Elite | .5 | 0 | 0 | .5 | .5 | 1.5 |
| Top One Futures | ACCESS EOD | .5 | 0 | .5 | .5 | .5 | 2 |
| Top One Futures | ACCESS Intraday | 0 | 0 | .5 | .5 | .5 | 1.5 |
| Top One Futures | ACCESS Static | .5 | 0 | .5 | .5 | .5 | 2 |

D drawdown; P payouts; C funded consistency; T trading; F extra funded conditions. Each axis is documented in programmeFlexibility.ts. Not a firm reliability rating or payout guarantee.

## Scope, evidence and unresolved points
- Traders Launch: after separate buffer phase, EOD floor is fixed at nominal starting balance. Daily requests above +1%, one per trader across all accounts per 24h, no caps for Premium/Standard and Legacy NYC, $100K cumulative payout review. Static 90% explicitly uncapped; do not extend this assessment to 60/80% options without checkout-specific confirmation. No funded numerical best-day rule. Terms contain discretionary eligibility/performance awards and partner-specific restrictions. No claim that a specific payout was denied. https://traderslaunch.com/futures/rules ; https://traderslaunch.com/payout-rules ; https://www.traderslaunch.com/faq ; https://www.traderslaunch.com/terms ; https://www.traderslaunch.com/
- Ment Futures: 6% static loss until first payout, then floor moves once to initial capital; full withdrawal reaches breach level. First payout requires profit target and 33% consistency; next every 30 days. 3% daily hard loss; front-month contracts, session auto-close, news allowed, 30-day activity obligation. CFD/equities records unchanged. https://www.mentfunding.com/ ; https://www.mentfunding.com/terms-of-service
- E8 Zero Starter: same 3% EOD dynamic loss and funded no-consistency rules as MAX. Lower cap; table vs FAQ differ on 100K ($1600 vs $1500) and 150K ($1995 vs $2000). Daily $100 minimum; unrequested profit in each cycle permanently becomes buffer. Four payouts then deactivation and replacement challenge. No invented price. https://e8futures.com/e8-zero
- Original Top One Elite: official help remains available, current purchase availability unconfirmed. Payout targets 6% then 5% then 4% on post-withdrawal balance, 25% funded best-day ratio, cap $1500–3500. ACCESS variants: identical five profitable days, 40% funded consistency, buffer, caps, fresh-profit progression, news restriction including protective orders, three-payout risk review. EOD stays EOD; Intraday has EOD evaluation then intraday funded; Static has fixed evaluation then EOD funded. $39 evaluation and separate activation fee; exact price tables unchanged. https://help.toponefutures.com/en/articles/12717928-elite-sim-funded-account-payout-requirements ; https://help.toponefutures.com/en/articles/14595016-elite-access-accounts-overview ; https://help.toponefutures.com/en/articles/14595161-elite-access-payout-requirements ; https://help.toponefutures.com/en/articles/17059267-elite-access-intraday-accounts-overview ; https://help.toponefutures.com/en/articles/17059773-elite-access-intraday-payout-requirements ; https://help.toponefutures.com/en/articles/17889367-elite-access-static-accounts-overview ; https://help.toponefutures.com/en/articles/17889378-elite-access-static-payout-requirements
- Apex historical Legacy PA: 8 trading days, 5 of $50+, safety net for first 3 payouts, 30% best-day rule until sixth payout or live transition; do not transfer these historical terms to promotional Legacy without specific agreement. Official Thanksgiving status update confirms upcoming dashboard tracking for limited 50K Instant account, but funded rules not verified. Both offers remain unrated. https://apextraderfunding.com/help-center/legacy-payouts/legacy-pa-payout-parameters/ ; https://apextraderfunding.com/help-center/status/status-updates/ ; https://apextraderfunding.com/help-center/legacy-products/legacy-products-overview/

## Integrity and release
81 connector-side checks passed, including preservation of earlier evidence maps and exact JSON comparison showing only five product arrays changed. 105 regression assertions prepared, not executed here. No firm /100 scoring inputs, restrictiveRules, unrelated firms, price tables or global scoring logic changed. Stacked on PR #314; #308 remains pending human sensitive-wording review. Cumulative reported count: 74 complete assessments. Remaining catalogue gaps include temporary TL Drops, Top One newer paths, Apex promotional cohorts and cross-listed E8 records; verify active sale, account mapping and exact terms before assigning further ratings. Prior Elite Daily live-review timing should be reconciled with current five-payout official policy in a separate correction pass.
