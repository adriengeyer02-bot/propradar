# Contractual-rule audit queue — 19 November 2026

Adrien's priority: **earned trader payouts and the exact contractual clauses that can delay, reduce or cancel them**. A young firm receives no automatic penalty for its age. No negative allegation is treated as proven without adequate independent evidence.

## Coverage, not completion

Run `node scripts/report-rules-audit-coverage.cjs` for the live list of every firm without categorised rules, separated by operational status. This inventory uses all canonical firm profiles, including firms without JSON overrides.

Before this batch: **197 profiles, 118 with categorised rules, 79 without**. Of those 79, **41** are watchlist firms and **38** are closed; all **33 Active** firms have some structured rules. After the non-overlapping Forex Funds Flow proposal: **119 with categorised rules; 78 without (40 watchlist, 38 closed)**. **This does not mean their full Terms and Conditions have already been read.** Existing rules can cover only a subset of programmes or source documents.

## Audit protocol for each firm

1. Confirm the actual official domain, contracting entity and current sale status. Do not reclassify an apparently inactive firm as closed without verifiable evidence.
2. Identify the *current priced main programmes*; record separately evaluation, funded and instant rules and account-purchase cohorts where terms differ.
3. Read the full **Terms and Conditions**, applicable programme contract, FAQ, payout policy, pricing page and trading restrictions. Record which documents could not be fully read; a truncated/blocked page is **not** an exhaustive review.
4. Extract each material restriction with an exact official HTTPS source, concrete consequence, programme scope, `category`, `severity` and `clarity`; do not infer breach consequences or copy restrictions to unrelated programmes.
5. Record a dated changelog and preserve historical entries. **Do not deduct the rule manually from the editorial score.** The calculator applies the single rules penalty; the same clause cannot also be counted as a separate alleged payout incident.
6. Check the actual calculated score movement, JSON validator, TypeScript and build. Any displayed fall of **5 or more** or movement of **10 or more** points is sensitive and must await Adrien's explicit approval before merge.

## Batch in review

| Firm | Official documents inspected | Remaining gaps |
| --- | --- | --- |
| **PipFarm — research only; DO NOT edit firm key here** | Current challenge model comparison; funded payout process; cap policy and November cohorts; Consistency Mode; Pay with Profits; gap-profit deduction; Pip Protector; Payout Trailing Instant; copying policy; risk-behaviour guidance. | **Open PR #148 already edits PipFarm.** Transfer findings to that PR owner; do not duplicate the firm update on a second branch. Public Terms and Conditions page does not expose its full text; continue the complete contract and legacy review. |
| **Forex Funds Flow** | Publicly indexed full Terms and Conditions (via `/es/terms-conditions`); official programme overview and FAQ catalogue. | Complete per-question FAQ answers and FFF Boost current pricing and terms, and independent actual payout evidence. Verify the Terms language against the programme pages, particularly trading restrictions absent from abbreviated marketing copy. |

Neither firm is marked "fully audited" by this pass. These are **potential contractual consequences**, not independently established payout refusal incidents.

**Calculated movement on the new non-overlapping PR, for Adrien's approval:**

| Firm | Existing public score | Proposed score | Computed rules deduction | Other applied deduction |
| --- | ---: | ---: | ---: | ---: |
| Forex Funds Flow | 57 | **48** | −9 | None |

This is a formula result, not a manual editorial reduction. It is sensitive and the corresponding PR must remain open for approval. A draft calculation for PipFarm indicated a possible rules deduction of 7; **it is intentionally not included**, because PR #148 already edits its score and contract and still reflects an older Trustpilot scale.

## Next targets

First resolve the remaining non-closed firms without categorised rules (including Nations Trading, Fundings4u, MiFunder, Purdia Capital and MyFundedCapital) where usable primary documents can be found. Then re-review the 119 profiles with existing structured rules to verify whether all current CGU, FAQs and main programmes have been fully covered. Archived firms remain on the inventory, but historical terms must not be represented as current sales conditions.

Pending owner review: this first batch may change public scores via the activated rules calculator. Do not merge automatically if the validator reports a sensitive movement.
