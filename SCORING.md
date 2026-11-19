# PropRadar scoring rules (shared by every agent)

Read this before you change any score. It applies to Claude, ChatGPT/Codex and
any human editor. `CLAUDE.md` (editorial and legal rules) still applies in
full; this file only covers how a score moves.

Approved by Geyer on 2026-11-18 (restrictive-rules scale) and
2026-11-19 (Trustpilot: one 8-point penalty, **no rating cap**).

## 1. What a score is

`score` (0-100) in `app/lib/propFirms.ts` or `set.score` in
`app/data/firm-updates.json` is the **editorial score before the
restrictive-rules penalty**. It reflects legal file, payout evidence, review
signals, transparency and offer quality. Do not lower it by hand for a
restrictive rule: classify the rule (section 2) and the code subtracts the
penalty.

The buyer-facing score is computed in this order
(`propFirms` pipeline in `app/lib/propFirms.ts`):

1. editorial score (`score`), with a recorded rationale for any manually
   incorporated Trustpilot integrity penalty;
2. minus the restrictive-rules penalty (section 2, at most 12 points, only
   when the feature is enabled);
3. **minus exactly 8 points, once**, for a currently documented Trustpilot
   guideline-breach / fake-review-removal notice, unless those same 8 points
   are *explicitly already included* in the manually audited editorial score;
4. closed firm (`status: Fermée`) → at most **29** (historical score retained
   in the data and update history).

**The old Trustpilot ceiling of 64 is abolished** (Geyer, 2026-11-19).
Trustpilot alone must never limit the maximum possible score, including 65+
or 80+ firms; do not retain a hidden floor, ceiling or additional -8.
A generic unavailable rating, a small review sample or an unverified
allegation is **not** sufficient for this penalty. Record the exact Trustpilot
notice, its URL and review date; do not claim the firm bought the fake
reviews unless independent evidence establishes who was responsible.

Do not double-count one Trustpilot incident: rating withheld, removed fake
reviews and the related review-integrity notice form **one** -8 event,
not separate sanctions. Any additional score reduction must concern
**different, substantiated** risks (contract terms, payments, independently
verified legal/regulatory facts) and be explained separately. A concentration
of negative Trustpilot reviews alone should not silently create a second
penalty for the same evidence.

For an individually re-audited `set.score`, state in its dated changelog
whether the -8 is already embedded; otherwise the implementation must apply
the penalty once. Do not assume every manual score already includes it.
When the notice is verified lifted, remove an automatic penalty; if the
manual editorial score embedded it, perform a new dated review before
adjusting that score. Affiliation has no effect on this rule.

Example: an audited 79/100 firm with no active rules penalty and a single
confirmed Trustpilot integrity notice displays **71/100**, not 64/100.
A lower figure requires documented, independently justified deductions.
The score breakdown and rankings must always agree on the final result.

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

Pick the severity from what the official text says happens, not from the
category. A minimum hold time is `major` when short trades are simply not
counted, `blocking` when it voids profits or breaches the account.

### 2.2 Clarity multiplier

| clarity  | × | when |
|----------|---|------|
| `clear`  | 1   | stated on the programme's own rules or pricing page (or its main FAQ entry) |
| `buried` | 1.5 | only in the terms and conditions or a deep help-centre article |
| `vague`  | 2   | discretionary wording ("we reserve the right…", undefined "abuse"), or official documents contradict each other (`status: "conflicting"` counts as `vague`) |

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
- Implementation: `app/lib/restrictiveRules.ts` (`computeRulesPenalty`). The
  switch `RULES_PENALTY_ENABLED` stays off until Geyer approves the score
  impact in a sensitive PR; until then rules are shown with their severity
  and clarity tags but scores do not move.
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
those three rules only in its terms (×1.5) and a vague "abuse" clause
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
