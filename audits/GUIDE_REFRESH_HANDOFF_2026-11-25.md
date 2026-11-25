# Guide refresh — 25 November 2026 — editorial only
Base: production commit `43cb7271a6fa78993ab32523db03b8270e280f9f` (FTMO banner restored). Do not merge an entire branch without comparing current production/main. Claude may already be integrating audit data; port only reviewed editorial hunks. No score, score input, promotion or affiliation changes authorized by this task. No production release.
## Completed first pass
- app/lib/guideArticles.ts: best firms guide removes fixed top three/score claims; GOAT review removes obsolete 58/100 and 64 cap, updates minimum hold by cohort, payout fee/caps, news timing, exact-domain Trustpilot status, and sources; Topstep review removes hard-coded 84/100, clarifies remaining cushion after MLL becomes zero, current XFA payout caps and eligibility. Only these three article updated dates were changed.
- app/lib/seoGuides.ts: GOAT base and display overrides revised, historical 3-step not presented as current, fixed fee/score claims removed; Topstep/Apex comparison FAQ explains XFA eligibility and discretionary Apex reward distribution.
- Review notes: public content retrieval unavailable; production source inspected through deployment SHA. English source edits only. No full build/typecheck or all-locale visual verification completed. Do not publish without those checks.
## Evidence checked 25 Nov
- https://help.goatfundedtrader.com/en/articles/12849041-what-is-the-minimum-holding-time-for-trades (120s before Oct 6; 60s from Oct 6; funded gains removed)
- https://help.goatfundedtrader.com/en/articles/10742084-is-news-trading-allowed (fresh index specifies per-release rule from Nov 24; older cached version differs; preserve date/scope and verify full new text before asserting pending-payout retroactivity)
- https://help.goatfundedtrader.com/en/articles/10742264-how-payouts-work-eligibility-request-processing-and-arrival (2% fee, general $100 threshold; verify special products separately)
- https://help.goatfundedtrader.com/en/articles/11472001-funded-account-reward-guidelines (first payouts and deductions; fresh index has additional $5K exceptions)
- https://www.trustpilot.com/review/goatfundedtrader.com (withheld notice, not proof of nonpayment)
- https://help.topstep.com/en/articles/8284233-topstep-payout-policy (XFA caps, positive profit, path and DLL offer)
- https://dashboard.apextraderfunding.com/agreement/user-agreement (reward discretion)
- https://the5ers.com/faqs/what-are-the-general-rules-for-the-high-stakes-program/ and https://the5ers.com/faqs/can-i-trade-during-news/ (next pass).
## Next priority
1. Hidden rules, news, instant funding, no consistency, fast payouts and payout proof: map programme phase, cohort, whether excess profit is deferred or deleted, and verify full sources. Read audit branch `audits/full-audit-coverage-register-2026-11-24.json` and evidence files. Do not generalize partial audits.
2. FTMO/The5ers and futures comparison, FTMO alternatives, forex/futures/beginner rankings: data-driven score only; no provisional V6 or V5.2 claims; no fixed ranking. FTMO and The5ers futures offerings need scope review.
3. Trustpilot and legal guides: distinction between rating withholding and evidence of nonpayment; separate firm-reported payouts, external trackers, matched individual payments.
4. Drawdown, swing, EA/SMC, prices and promo guides; no blanket permission from brand metadata, no stale discount code; verify checkout.
5. Translations: check LocalizedGuide and guideI18n/localized source maps for every supported locale, old article stats and score claims, meta/FAQ JSON-LD, and avoid English/French drift. Some previously refreshed main text explicitly cites V5.2; do not use it as approved methodology. Current production and main are different branches.
6. Fix date semantics: getGuideLastModified uses firm lastReviewed and editorial dates; a firm-data update does not prove prose was reread. Separate data refresh from actual article editorial verification rather than globally setting a newer date.
## Future scoring
Freeze all scores. Use single source of truth for live scores in guide tables and link to current profile in prose. Historical snapshots must be explicitly dated if retained. Do not apply any proposed new barème until owner approval and evidence coverage reconciliation.
