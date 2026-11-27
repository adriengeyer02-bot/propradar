# Programme audit batch 8 — 2026-11-27

Nine product evidence records, eight complete funded-stage flexibility assessments and one deliberately incomplete. Separate from company /100.

| Firm | Programme | D | P | C | T | F | /5 |
|---|---|---:|---:|---:|---:|---:|---:|
| UProfit | Soft | .5 | 0 | .5 | .5 | 0 | 1.5 |
| UProfit | Flex | .5 | 0 | .5 | .5 | 0 | 1.5 |
| UProfit | ONE 50K | .5 | 0 | pending | .5 | 0 | pending |
| Lvlup Futures | Lvlup | .5 | .5 | .5 | .5 | .5 | 2.5 |
| Lvlup Futures | Starter | .5 | 0 | 1 | .5 | 0 | 2 |
| FTUK | FLEX Futures | .5 | 0 | .5 | 0 | 0 | 1 |
| FTUK | Instant Sim Funding Futures | .5 | 0 | 0 | 0 | 0 | .5 |
| The Trading Pit | Prime Futures | .5 | 0 | 1 | .5 | 0 | 2 |
| The Trading Pit | Instant Futures | .5 | 0 | 0 | .5 | 0 | 1 |

D drawdown; P payouts; C funded consistency; T trading; F extra funded conditions. Source and reasoning per criterion in programmeFlexibility.ts. Not a firm reliability rating or payout guarantee.

## Sources and findings
- UProfit Soft/Flex October 8 payout rules supersede legacy DAY for the respective products: 40% strict best-day threshold, resets at request, three profitable days, nonwithdrawable SafetyNet and 3% gross nominal cap; six withdrawals followed by closure. 50K funded examples: $2K trailing floor, $2.5K buffer, $1.5K gross cap; no activation fee; Soft $1.1K daily pause vs Flex no DLL. https://uprofit.com/help/uprofit-soft-payout-policy-52063548100500 ; https://uprofit.com/help/uprofit-flex-payout-policy-52062715698580 ; https://uprofit.com/help/uprofit-soft-live-virtual-50k-52063647938580 ; https://uprofit.com/help/uprofit-flex-live-virtual-50k-52062598543508
- ONE 50K: static $49K starting floor, payout policy states drawdown adjusted to $0 after first withdrawal; exact convention unclear. No SafetyNet; five days of $150+ profit, max 50% available earnings and $2K per request, maximum six withdrawals, new profit after payout. No percentage consistency stated in funded checklist; do not infer explicit absence. https://uprofit.com/help/how-does-the-virtual-live-stage-of-the-one-50k-account-work-49177546289300 ; https://uprofit.com/help/uprofit-one-payout-policy-49177986296468
- Lvlup: 14-day cycle, cap 10% starting balance, no 5 profitable day requirement on Lvlup funded; Starter 5 profitable days and 50% of profit cap plus dollar cap, permanent closure after fifth withdrawal, no funded ratio. No minimum holding duration; news and own copying allowed. Separate funding-provider agreement remains unread. Elite is a membership/reward path, not assumed a separately purchasable evaluation. https://lvlupfutures.com/rules ; https://lvlupfutures.com/evaluation ; https://lvlupfutures.com/elite
- FTUK Futures: FLEX funded 40%, five profitable days, protected balance and tier caps; Instant 20%, 6% target each cycle, same five-day and cap/buffer constraints. Both require fresh realized profit equal to at least 50% of gross request after first payout. 30-second minimum even for SL/TP. No CFD product data changed. https://faq.ftuk.com/en/articles/17563548-flex-futures-account-rules-overview ; https://faq.ftuk.com/en/articles/17589503-flex-futures-payout-requirements ; https://faq.ftuk.com/en/articles/17589504-flex-futures-daily-progression-rule ; https://faq.ftuk.com/en/articles/12354244-instant-sim-funding-payout-rules-caps-progression ; https://faq.ftuk.com/en/articles/14492295-is-there-a-minimum-trade-duration ; https://ftuk.com/terms-of-service
- Trading Pit Prime: baseline 40% challenge only, funded five $150+ days, 7-day interval and 50% realized profit cap plus tier caps. Instant: 20% consistency, repeated profit goal, five-day cycle, sequence caps. GTC V5.08.26 Schedule A.3–A.4 allows individualized reward reduction down to zero based on compliance and historical/cross-account trading, with notification and complaint procedure. Not evidence of an actual denial. No activation fee for new Prime accounts from March 26, 2026; older/reset cohorts differ. https://www.thetradingpit.com/futures ; https://www.thetradingpit.com/trading-rules ; https://www.thetradingpit.com/blog/futures-prime-program ; https://www.thetradingpit.com/general-terms-and-conditions ; https://support.thetradingpit.com/will-there-be-a-monthly-subscription-fee

## Verification and release
76 connector integrity checks passed; 95 regression assertions prepared, not executed. Exact data comparison confirmed only four setProducts arrays changed; no global score, firm scoring inputs, restrictiveRules, other firm data or price tables modified. Existing product IDs reused. Source scope and ambiguity recorded; no numerical consistency simulator preset where exact denominator or strict comparator is unclear. Stacked on PR #313; #308 remains pending human sensitive-wording approval. Total 65 complete assessments cumulatively, plus this incomplete ONE record. Next targets: remaining Futures families (Traders Launch, Ment Funding, E8 Zero Starter, Top One Elite Access, remaining Apex legacy/Instant cohorts) subject to source coverage.