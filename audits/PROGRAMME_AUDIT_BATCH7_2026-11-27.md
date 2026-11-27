# Programme audit batch 7 — 2026-11-27

Seven funded-stage flexibility assessments for DayTraders and Funded Futures Network; two missing DayTraders product paths added. Independent from company /100.

| Firm | Programme | D | P | C | T | F | /5 |
|---|---|---:|---:|---:|---:|---:|---:|
| DayTraders | Trail Pro | 0 | 0 | .5 | .5 | 0 | 1 |
| DayTraders | EOD Pro | .5 | 0 | .5 | .5 | 0 | 1.5 |
| DayTraders | Static Pro | 1 | 0 | .5 | .5 | 0 | 2 |
| DayTraders | S2F Instant | .5 | 0 | 0 | .5 | 0 | 1 |
| DayTraders | S2L (actual live) | 0 | .5 | 1 | .5 | .5 | 2.5 |
| FFN | MAX Standard (50K example) | .5 | 0 | .5 | .5 | 0 | 1.5 |
| FFN | STEADY | .5 | 0 | 1 | .5 | .5 | 2.5 |

D drawdown; P payouts; C funded consistency; T trading; F extra funded conditions. Each axis is documented in programmeFlexibility.ts. Not a firm reliability rating or guarantee.

## DayTraders
- Current October 22–23 help articles distinguish five products. Trail/EOD/Static all require two qualifying evaluation days, then eight qualifying days per withdrawal and a 30% per-cycle funded best-day ratio. Minimum $500, retained-balance requirements and size-specific maximums. Static is fixed; EOD daily loss stop; Trail intraday floor. The Static product incorrectly had no consistency flag before this patch.
- S2F: immediate simulated funding, EOD trailing, DLL on 50K/150K. Ten qualifying days and new cycle target per withdrawal, 20% concentration. S2L: evaluation followed by actual live trading; intraday trailing plus DLL, no funded ratio, $1K retained balance after floor locks, $500 minimum, no per-request cap. Sequential activation of multiple live accounts.
- Invited live transition: discretionary timing; all other simulated accounts close and excess balances generally forfeited unless credited as discretionary performance rewards. Where aggregate requests on the day are at least $10K, half is paid and half converted to live drawdown allocation. S2L is assessed separately.
- General trading hours article both directs traders to close at 4:59pm ET and says overnight/weekend positions are allowed. News allowed; mark as conflict, no automatic unrestricted holding claim. Minimum activity policy requires one qualifying profitable day per rolling 30 days for monthly plans or four for lifetime plans, and inactive accounts cannot reactivate; exact applicability to each funded path needs clarification.

Official sources: https://daytraders.com/help/articles/17704132-plan-comparison-overview ; https://daytraders.com/help/articles/17684698-trail-pro-account ; https://daytraders.com/help/articles/17684716-static-pro-account ; https://daytraders.com/help/articles/17684736-eod-pro-account ; https://daytraders.com/help/articles/17684700-trail-payouts ; https://daytraders.com/help/articles/17684719-static-payouts ; https://daytraders.com/help/articles/17684739-eod-payouts ; https://daytraders.com/help/articles/17684752-s2f-payouts ; https://daytraders.com/help/articles/17697922-live-accounts ; https://daytraders.com/help/articles/17697923-live-payouts ; https://daytraders.com/help/articles/17697925-moving-from-pro-or-s2f-to-live ; https://daytraders.com/help/articles/17704089-trading-hours-holidays-and-overnight-positions ; https://daytraders.com/help/articles/17704072-minimum-activity-policy

## Funded Futures Network
- MAX Standard: current official example shows EOD floor locking at initial +$100, $2K buffer and $1,250 soft daily stop for 50K, 40% funded consistency, $500 minimum, aggregate $10K cap and live review after four payouts on one account or ten since the last review. Official variants conflict on 50K request caps ($1K/$1.25K vs $1.5K/$2K), billing (monthly older vs one-time newer) and closure at review. Preserve both figures with caveat; do not silently select one or change price tables.
- STEADY: official dedicated page confirms 52% evaluation only and no funded ratio, EOD lock, size-based protected buffer, caps, five-payout live review. Indexed July help states five winning days per cycle but direct help page redirected to a closed help center, so current exact cadence/net rule needs confirmation. Dedicated page permits news while general FAQ restricts funded T1 news; bots not supported per programme page. No assumptions about other account balance forfeiture.
- Current full contract or backend knowledge base unavailable in this pass. Ratings reflect documented flexibility constraints, not verified payouts or legal findings. MAX 50K source scope explicitly identified. No numerical simulator consistency preset where denominator or scope not confirmed.

Sources: https://fundedfuturesnetwork.com/?via=CPF ; https://blog.fundedfuturesnetwork.com/payouts ; https://blog.fundedfuturesnetwork.com/accounts?coupon=KSWART ; https://blog.fundedfuturesnetwork.com/faq ; https://steady.fundedfuturesnetwork.com/ ; indexed https://fundedfuturesnetwork.zendesk.com/hc/en-us/articles/52438414061211-Article-2-5-STEADY-Account

## Verification and release
59 connector-side checks passed, including all new IDs, criterion values and regression expectations; final JSON comparison confirms only the two setProducts arrays changed. 86 regression assertions prepared, not executed here. No firm /100 input, restrictiveRules, other firm record, price table or global scoring logic modified. Stacked on PR #311, with #308 sensitive-wording human review still pending. Cumulative batch count: 57 assessments (including inherited programme/variant records). Not all in main. Next targets: UProfit, LVLUP, FTUK Futures, Trading Pit Futures and other uncovered paths; resolve missing product evidence separately from catalogue pricing.
