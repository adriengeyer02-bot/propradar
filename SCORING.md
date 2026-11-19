# PropRadar scoring rules (shared by every agent)

Read this before you change any score. It applies to Claude, ChatGPT/Codex and
any human editor. `CLAUDE.md` (editorial and legal rules) still applies in
full; this file only covers how a score moves.

Approved by Geyer on 2026-11-18 (restrictive-rules scale), then
revised on 2026-11-19 (**Trustpilot: a single 6-point penalty, no rating cap**;
this supersedes the earlier 8-point proposal).

**Five-axis scoring upgrade approved in principle (2026-11-19):**
35 payout / 30 contract rules / 15 legal / 10 integrity / 10 offer.
See [`SCORING_V2.md`](SCORING_V2.md) for the evidence-based implementation
specification. It is **staged, not yet the live score formula**: do not infer
new numeric scores from old editorial totals, and obtain approval before
publishing sensitive recalibrations.

## 1. What a score is

`score` (0-100) in `app/lib/propFirms.ts` or `set.score` in
`app/data/firm-updates.json` is the **editorial score before the
restrictive-rules penalty**. It reflects legal file, payout evidence, review
signals, transparency and offer quality. Do not lower it by hand for a
restrictive rule: classify the rule (section 2) and the code subtracts the
penalty.

The buyer-facing score is computed in this order
(`propFirms` pipeline in `app/lib/propFirms.ts`):

1. editorial score (`score`), with an explicit, dated accounting of any
   manually incorporated Trustpilot penalty;
2. minus the restrictive-rules penalty (section 2, at most 12 points);
3. **minus exactly 6 points, once**, for a currently documented Trustpilot
   guideline-breach / fake-review-removal notice, unless the same six points
   are **explicitly already included** in a manually audited editorial score;
4. closed firm (`status: Fermée`) → operational score capped at **29**,
   excluded from active rankings; preserve its historical editorial score.

**The old Trustpilot ceiling of 64 is abolished.** Trustpilot alone must
never impose a maximum score. A generic unavailable rating, a small review
sample or an unverified allegation is **not** grounds for the six-point
deduction. Record the precise Trustpilot notice, its URL and review date.
Never claim the firm bought fake reviews without independent proof of who
was responsible.

**One documented fact = one penalty.** A withdrawn TrustScore, removed fake
reviews and Trustpilot's guideline notice describing the **same incident**
form **one single -6 event**, not three sanctions. Do not re-penalize the
same event under reputation, legal-risk or transparency headings. Likewise,
a single abusive contract clause must not generate three stacked penalties
under rules, transparency and payout. **Separate, independently documented
facts may warrant separate adjustments**, each with an identified source and
a quantified rationale. Negative-review concentration by itself is not
evidence of independently established payout wrongdoing.

### Editorial priority when (re)auditing a firm

1. **Highest concern:** unjustified payout denial established by reliable
   independent evidence, or contract terms that allow discretionary
   cancellation of earned rewards and are undisclosed, buried or materially
   contradictory. Distinguish a proven practice from a possible contractual
   risk and from an unresolved customer allegation.
2. **High concern:** verified retroactive changes affecting trader rewards,
   independently substantiated misleading commercial practices and
   material opacity in the contracting legal entity.
3. **Moderate concern:** current Trustpilot review-integrity notice (-6,
   once), without imputing responsibility for the reviews.
4. **No automatic age penalty:** a young firm is not guilty of misconduct
   because it is new. Missing payout history or documents should be labeled
   **not verified / limited evidence**, not invented as a proven incident.
5. **Confirmed closure:** flag the company as closed and remove it from
   active rankings; keep the historical audit for readers. Do not treat
   closure as a normal active-firm promotional ranking.

These are **priorities, not new automatic numeric deductions**. Never invent
a -10/-15 penalty from an allegation alone. Future adjustments to the core
editorial score require a dated audit, independently verifiable facts and
Geyer's approval for sensitive moves (section 4).

For an individually re-audited `set.score`, state in its dated changelog
whether the **-6** is already included; otherwise the implementation
must deduct it once. Do not assume every manual score includes it.
Previously audited scores with a documented **-8** embedded must be
recalibrated from their editorial components, restoring **2 points only
where the old -8 is genuinely incorporated**, with a dated changelog and
without removing unrelated, independently evidenced deductions.
When the notice is verified lifted, remove an automatic penalty; if a
manual editorial score embedded it, perform a new dated review first.
Affiliation does not affect this rule.

Example: editorial 79/100 with a single current Trustpilot notice and
**no** rule penalty displays **73/100**. With an independently calculated
**one-point rules penalty**, it displays **72/100**. Any lower result needs
a separate evidence-backed explanation. The score breakdown, firm page,
radar and rankings must agree.

Never write the score itself ("74/100", "score 66 to 63") in a verdict,
audit summary or changelog-facing narrative: the displayed score moves with
the pipeline and the text goes stale (FTMO showed 90 while its verdict said
89/100). The firm page's score dialog explains every step. Explain the reasons
in words; record the number only in `set.score` and the changelog `fields`.
The validator rejects new narrative text containing "NN/100", and
`app/lib/scoreClaims.ts` strips score sentences from older texts at display.

## 2. Restrictive-rules penalty

A restrictive rule is a contract or FAQ condition that can delay, reduce or
cancel a trader's payout, or end the account, beyond the core drawdown /
profit-target mechanics. It is not a verdict on the firm: most such rules have
an objective reason. The penalty only tells the buyer how much fine print
weighs on each programme. A firm with good fundamentals still "comes out"
fine: the total penalty is capped at **12 points**.

### 2.1 Severity (by the consequence written in the source)

| severity   | points | the source says that…                                                                                     | typical examples |
|------------|--------|------------------------------------------------------------------------------------------------------------|------------------|
| `minor`    | 1      | the rule constrains how you trade, with no consequence on an earned payout                                  | minimum trading days, news-window restriction, weekend/overnight close, EA/copy-trading needs approval, inactivity closure after 30+ days |
| `major`    | 3      | breaking or not meeting it delays, reduces or blocks a payout request, but the account and profits survive | consistency rule before payout, payout cap per cycle, minimum hold time where short trades are excluded, lot or risk-per-trade cap, trailing drawdown kept on the funded account, profit-split reduction |
| `blocking` | 5      | breaking it voids profits or closes the account, or the account ends by design                            | VPN / IP / device mismatch that breaches the account, profits cancelled for trades held under X seconds, account closed after N payouts, undefined "gambling" / "abuse" clause applied at the firm's discretion |

Pick the severity from the **individual rule's documented consequence**, not
from its category or a generic clause about any breach. A minimum hold time is
`minor` when the specific outcome is a warning; `major` when short trades
are excluded from rewards; `blocking` when the rule expressly voids profits
or breaches the account. An ordinary restriction with no separate stated
payout or account consequence is `minor`, however inconvenient it may be.
The company's general power to reject payouts is classified **once** below.

### 2.2 Clarity multiplier

| clarity  | × | when |
|----------|---|------|
| `clear`  | 1   | stated on the programme's rules/pricing page, main FAQ or a **plainly headed, navigable official Terms trading-rules section** with understandable thresholds |
| `buried` | 1.5 | genuinely hard to find, e.g. a deep help-centre article or unrelated legal subsection without clear navigation; **Terms-only does not automatically mean buried** |
| `vague`  | 2   | discretionary wording ("we reserve the right…", undefined "abuse"), or official documents contradict each other (`status: "conflicting"` counts as `vague`) |

### 2.2a General enforcement clauses: count once, no severity multiplication

A general contractual power to suspend or terminate accounts or reject rewards
for **any** violation is not evidence that each separately listed trading
restriction has its own automatic payout-loss consequence. Classify each
restriction from the **specific sanction actually written for it**. Record
that general power only once, under `discretionary-clause`, across the relevant
programmes. It can itself be `blocking` × `vague` when reward rejection or
account closure at the firm's discretion is explicitly documented.

Do not simultaneously deduct that same clause manually from the editorial
score or present its possible exercise as an independently established wrongful
payout denial. A clear public restriction remains restrictive, but is not by
itself a **hidden rule**. Distinguish genuinely inaccessible or contradictory
terms from a conspicuous dedicated Terms section. Source the latter as a
contractual rule, not an accusation of concealment.

**Calibration:** Forex Funds Flow's plainly headed trading-prohibitions
section has a documented account breach on the third 80%-margin event, a
warning for early stop-losses and one general discretionary reward-rejection
clause. Under this method its seven categories yield raw load 20 and a
computed rules deduction of **6** instead of the previous raw load 42 and
deduction of 9, pending complete FAQ and programme review. See
`claude/rules-calibration-2026-11-19.md` in PR #192; changes in displayed
scores still require the owner-review rule in section 4.

### 2.3 Programme scope and firm total

- List the firm's **main programmes** (those sold on the official pricing
  page) in `auditedPrograms: [{ "key": "2step", "name": "2-Step Challenge" }]`.
- Each rule says which programmes it covers: `appliesTo: ["2step"]`, or
  `["*"]` for all main programmes.
- Per programme: for each `category`, keep the single highest
  `points × clarity`; add the categories up.
- Firm **load** = average over the main programmes. One heavy programme
  weighs without sinking the whole firm.
- Firm **penalty** = `round(12 × (1 − e^(−load / 30)))`, so it never exceeds
  **12** and keeps separating firms: load 5 → 2, 10 → 3, 20 → 6, 30 → 8,
  40 → 9, 60 → 10. (A straight sum capped at 12 was tried first: on the
  2026-11-18 audit of 77 firms, 75 hit the cap, so it no longer told firms
  apart. The curve keeps the approved weights and the 12-point ceiling.)
- Implementation: `app/lib/restrictiveRules.ts` (`computeRulesPenalty`).
  The switch `RULES_PENALTY_ENABLED` is currently **enabled** in `main`:
  the calculated penalty affects the displayed score and its breakdown.
  Treat changes to this switch as sensitive.
- Rules without `category`, `severity`, `clarity` and `appliesTo` are shown
  but not counted (legacy entries). Classify them before relying on the total.

### 2.4 Categories

`vpn-ip-device`, `min-hold-time`, `consistency`, `payout-cap`,
`account-ends-after-payouts`, `min-trading-days`, `news`, `weekend-overnight`,
`ea-copy-hft`, `lot-risk-limit`, `discretionary-clause`,
`funded-trailing-drawdown`, `inactivity`, `country-kyc`, `split-reduction`,
`payout-conditions`, `other`.

Not restrictive rules (never counted): the daily loss limit, the maximum
drawdown and profit target themselves, an evaluation-only trailing drawdown
(already shown as the programme's drawdown type), list prices and fees.

### 2.5 Worked example (illustrative)

A futures firm with one main programme whose funded account requires five
qualifying days (`min-trading-days`, minor, clear: 1), a 50% best-day
consistency rule before each payout (`consistency`, major, clear: 3) and
closes after six payouts (`account-ends-after-payouts`, blocking, clear: 5):
load 9 → penalty 3. Editorial score 72 → displayed 69. The same firm with
those three rules buried in a hard-to-find legal subsection (×1.5) and a vague "abuse" clause
(blocking × 2 = 10) has load 23.5 → penalty 7.

## 3. Writing a rule entry

```json
"restrictiveRules": [{
  "program": "2-Step Challenge — funded stage",
  "appliesTo": ["2step"],
  "category": "min-hold-time",
  "severity": "blocking",
  "clarity": "buried",
  "rule": "What the official text says, paraphrased closely (quote short phrases).",
  "impact": "What it means for a trader's payout, in neutral words.",
  "source": "https://official-page-where-it-is-written"
}]
```

- One official https source per rule (the firm's own site, help centre, terms
  PDF). Third-party summaries are not a source for a rule.
- Facts, not verdicts: no "scam", "fraud", "trap", "predatory", "hidden".
  Say "only stated in the terms (section 12.3)" rather than "hidden".
- At least one rule source must appear in a dated changelog entry with
  `fields: ["restrictiveRules"]`.
- Never infer that a rule applies to a programme the text does not name.

## 4. Sensitive changes (Geyer's approval)

Unchanged from `CLAUDE.md` rule 6: a change that moves a displayed score by
5+ points down or 10+ in either direction, status changes, domain warnings,
new incidents and accusation-type wording go in a separate PR left open.
The validator prints the displayed-score impact of restrictive rules.
