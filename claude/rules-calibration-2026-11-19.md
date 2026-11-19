# Restrictive-rules calibration — decision of 19 November 2026

**Status:** Adrien approved this principle in conversation. Apply it consistently in new audits; synchronize the canonical `SCORING.md` on its existing owner PR #186 **before merging any score change that depends on it**. The existing formula, 12-point maximum, programme weighting and editorial score are unchanged.

## What warrants a deduction

The note should protect a trader's chance of receiving a properly earned payout. A published and specific trading restriction is a legitimate buying consideration, but it must not be scored like a proved unjustified payout refusal or a discretionary contractual power to withhold earned rewards.

1. **Classify severity from the restriction's *own stated consequence*.** A constraint with no rule-specific payout or account consequence is `minor` (1), even if inconvenient. Use `major` (3) only for a stated payout delay, reduction or restriction; use `blocking` (5) for a stated account breach, profits voiding or comparable consequence. The general clause allowing sanctions for *any* breach does not automatically turn each restriction into `blocking`.
2. **Count generic enforcement discretion once.** A broad power to investigate violations and potentially refuse rewards or close the account goes in one cross-cutting `discretionary-clause` category, scored by its own wording (potentially `blocking` × `vague` when reward refusal is explicitly possible). Do not duplicate the same enforcement power under `news`, `ea-copy-hft`, `other`, `consistency` and so on. The existing per-category deduplication still applies.
3. **Distinguish public terms from genuinely buried terms.** A plainly headed, navigable trading-practices section in the official Terms, accessible from the firm website, may count as `clear` if the threshold is intelligible. `buried` is for difficult-to-find terms, deep help-centre content or a restriction only revealed in an unrelated legal subsection; *being in the Terms alone is not evidence of concealment*. A contradictory or genuinely discretionary requirement remains `vague` even when prominently linked.
4. **Do not claim or double-count payout wrongdoing.** A possible contractual right to reject rewards is a risk; a proven unjustified withholding requires separate independent evidence. Do not deduct the same clause again from the editorial score, and do not imply that the firm bought fake reviews.
5. **No silent bulk edits.** Verify the complete official Terms, FAQ, trading rules, pricing and all main programme scopes before reclassifying a firm. If a source is inaccessible, mark the audit incomplete. Every change keeps the original source and gets a dated changelog. Sensitive score changes stay open for Adrien.

## Calibration: Forex Funds Flow (partial audit)

Official source: <https://forexfundsflow.com/es/terms-conditions>, especially the navigable **Prohibited Trading Practices** section and generic enforcement paragraph. The specific **third occurrence account breach** for 80% margin concentration is documented. A stop-loss under two minutes generates a **warning**; the other identified trading limits do not specify an individual automatic reward rejection in that section. A single generic clause says that violations *may* lead to account termination or rejection of rewards. This is a disclosed **risk**, not evidence of an actual refused payout.

| Group | Before: severity × clarity | Recalibrated | Reason |
|---|---:|---:|---|
| Margin concentration, account breach on third occurrence | 5 × 1.5 = 7.5 | 5 × 1 = **5** | Explicit account consequence, accessible trading-practices section |
| Two-minute holding rule, including stop-loss warning | 1 × 1.5 = 1.5 | 1 × 1 = **1** | Warning, no proven automatic forfeiture |
| News window | 5 × 1.5 = 7.5 | 1 × 1 = **1** | No sanction specified for this individual ban |
| Copy trading / EA / HFT | 5 × 1.5 = 7.5 | 1 × 1 = **1** | No individual automatic sanction specified |
| Hedging | 5 × 1.5 = 7.5 | 1 × 1 = **1** | No individual automatic sanction specified |
| At least 85% in one direction | 3 × 1.5 = 4.5 | 1 × 1 = **1** | Unusual restriction, but no individual automatic payout consequence stated |
| Cross-cutting discretionary sanctions and future access | 3 × 2 = 6 | 5 × 2 = **10** | The generic text *does* permit reward rejection and account closure; count once |
| **Raw load** | **42** | **20** | Same seven categories |
| **Applied rule deduction** | **−9** | **−6** | `round(12 × (1 − exp(−load / 30)))` |
| **Buyer-facing score** | **48** | **51** | Editorial 57 unchanged; no additional Trustpilot event |

**Still missing:** complete individual FAQ answers, FFF Boost contract and confirmed payout records. Do not mark this firm as exhaustively audited; new programme-specific terms could change the classification or score.

## Next batch, without prejudging outcomes

`node scripts/report-rules-calibration.cjs` lists firms with multiple entries currently both `blocking` and `buried`. The first inspection queue includes **My Crypto Funding, Quant Tekel, SFX Funded, Alpine Funded, Titan Capital Markets, Top One Trader, X Funded, E8 Futures, FundedElite and Funding Your Trades**. These are **signals for verification, not mistakes proved**: many might have individually documented account-closing consequences, or genuinely obscure Terms. Several also have parallel PRs or have only recently been reviewed; coordinate with those PR owners before editing their entries.

Check each of the following independently: 1) exact **individual** consequence, 2) position of the official text in the site's information architecture, 3) actual programme applicability, 4) whether one generic sanction has been repeated, 5) the independently evidenced payout record. Maintain a before/after table for every score change.
