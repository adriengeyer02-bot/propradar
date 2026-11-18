# PropRadar scoring rules (shared by every agent)

Read this before you change any score. It applies to Claude, ChatGPT/Codex and
any human editor. `CLAUDE.md` (editorial and legal rules) still applies in
full; this file only covers how a score moves.

Approved by Geyer on 2026-11-18 (restrictive-rules scale). Earlier caps are
listed with their own approval dates.

## 1. What a score is

`score` (0-100) in `app/lib/propFirms.ts` or `set.score` in
`app/data/firm-updates.json` is the **editorial score before the
restrictive-rules penalty**. It reflects legal file, payout evidence, review
signals, transparency and offer quality. Do not lower it by hand for a
restrictive rule: classify the rule (section 2) and the code subtracts the
penalty.

The buyer-facing score is then computed in this order
(`propFirms` pipeline in `app/lib/propFirms.ts`):

1. editorial score (`score`);
2. minus the restrictive-rules penalty (section 2, at most 12 points);
3. Trustpilot cap: rating withheld for a guideline breach → at most **64**
   (Geyer, 2026-11-07; lifts only with a dated `set.trustpilotNoticeLifted`);
4. closed firm (`status: Fermée`) → at most **29** (the historical score stays
   in the data and the update history).

A documented, current Trustpilot fake-review removal notice may justify an
editorial deduction of **at most 8 points**, on top of nothing else; it never
replaces the 64 cap (README, 2026-11-18).

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
