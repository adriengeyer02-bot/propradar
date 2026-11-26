# PropRadar scoring rules (shared by every agent)

Read this before you change any score. It applies to Claude, ChatGPT/Codex and
any human editor. `CLAUDE.md` (editorial and legal rules) still applies in
full; this file only covers how a score moves.

Approved by Geyer on 2026-11-18 (restrictive rules), revised on
2026-11-20 (contractual risks), and 2026-11-26 (uniform Trustpilot grid).
The 2026-11-26 Trustpilot decision applies to all operational scores, not
only Scale C. Historical V4/V5 approvals remain dated records.

## 1. What a score is

The stored editorial score precedes restrictive-rule deductions. The
operational pipeline applies the rules deduction, then the Trustpilot grid
below, then any existing applicable legal, unread-contract or closure cap.
Scale C already includes its own Trustpilot grid and replaces the earlier
pipeline: never add another deduction. Closed firms retain their historical
score and existing closure cap of 29; no new Trustpilot deduction.

### Uniform Trustpilot grid (all active/watchlist firms)

| Public rating | Full deduction |
|---|---:|
| 4.0–5.0 | 0 |
| 3.5–<4.0 | 3 |
| 3.0–<3.5 | 6 |
| <3.0 | 10 |

A current, documented withholding notice costs exactly 10 points instead
of the rating deduction. For rating-based deductions only: missing rating
or review count, or fewer than 30 reviews = 0; 30–99 reviews = half rounded
up; 100+ = full deduction. No deduction for missing data by itself and no
Trustpilot-specific score ceiling. An historical embedded six-point notice
deduction explicitly marked by `trustpilotPenaltyIncluded` is restored
before calculating the new grid; never infer an embedded penalty. The
historical V4/V5 card calculation is preserved for verifying dated approvals;
their public wrappers use the uniform grid.

**One documented fact = one penalty.** Do not stack a rating deduction with
a withholding notice or infer culpability for fake reviews. Record sources
and dates; an allegation alone is not independent proof of payout failure.
Separate independently documented facts may warrant separate adjustments.
Affiliation never changes the rule.

### Editorial priority when (re)auditing a firm

1. **Highest concern:** unjustified payout denial established by reliable
   independent evidence, or contract terms that allow discretionary
   cancellation of earned rewards and are undisclosed, buried or materially
   contradictory. Distinguish a proven practice from a possible contractual
   risk and from an unresolved customer allegation.
2. **High concern:** verified retroactive changes affecting trader rewards,
   independently substantiated misleading commercial practices and
   material opacity in the contracting legal entity.
3. **Moderate concern:** current Trustpilot review-integrity notice (-10,
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

For a dated manual editorial score, record any explicitly embedded historical
Trustpilot deduction. The current pipeline restores only the documented
legacy six-point marker and applies the new grid once. Do not edit core
editorial criteria or silently reverse unrelated historical deductions.

Example: 79 editorial points, one point of independently calculated rules
penalty, and a documented current withholding notice → 68/100 before any
existing applicable cap. A 3.4 rating with 294 reviews costs six points.
The score breakdown, firm page, radar and rankings must agree.

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

### 2.2 Restrictions vs contractual risks (revised by Geyer, 2026-11-20)

Every classified rule falls in one of three kinds (`ruleKind` in
`app/lib/restrictiveRules.ts`):

| kind | when | weight |
|------|------|--------|
| `classic` | category `min-trading-days` or `funded-trailing-drawdown`: offer mechanics, shown with the offer characteristics (not in the constraints) | **0**, never counted |
| `restriction` | a specific, stated rule (clarity `clear` or `buried`, not a discretionary clause) | severity × **0.25** if `clear` (programme page / main FAQ), × **0.5** if `buried` (only in the terms) |
| `risk` (contractual risk) | clarity `vague`, `status: "conflicting"`, or category `discretionary-clause`: wording that allows a subjective reading or a payout refusal | severity × **2** |

Principle: a common trading rule that is published and quantified does not
get a strong penalty; ambiguous clauses that leave room for interpretation
or a payout refusal carry most of the penalty. Classify honestly: a clause
is `vague` only when the official text itself is discretionary, undefined
("abuse", "gambling", "at our sole discretion") or contradicted by another
official page.

On the firm page, the "Rules and constraints" section shows one menu per
programme (closed by default), each split into "Specific restrictions to
know" and "Contractual risks", with a discreet marker on `blocking` rules
and a source link on every rule. Classic rules sit in the offers section.

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
qualifying days (`min-trading-days`: classic, 0), a 50% best-day consistency
rule before each payout (`consistency`, major, clear: 3 × 0.25 = 0.75) and
closes after six payouts (`account-ends-after-payouts`, blocking, clear:
5 × 0.25 = 1.25): load 2 → penalty 1. Editorial score 72 → displayed 71.
The same firm with those two rules only in its terms (× 0.5: 1.5 + 2.5) and
a vague "abuse" clause that can void a payout (blocking risk: 5 × 2 = 10)
has load 14 → penalty 4.

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

## Scale C (approved by Geyer on 2026-11-25)

Scale C replaces the pipeline above for every firm listed in
`app/data/scale-c.json` (generated by `scripts/build-scale-c.py` from
`audits/score-proposal-c-2026-11-25.json`; never edit it by hand). The
displayed score is then the scale C score; `applyScaleCRule` in
`propFirms.ts` runs after the earlier steps and replaces them, so nothing is
deducted twice. The firm's score dialog lists the ceiling, its evidence and
every point lost with the clause excerpt and its source.

1. **Ceiling earned with evidence.** Under 1 year: 55; 1-2 years: 65;
   2 years or more: 75; 3 years + payout evidence at scale: 85; 5 years +
   evidence: 95; 8 years + very large evidence: 98. Evidence = on-chain
   tracking of at least 10 M$ in payouts, payout statistics published with
   their method, or a displayed Trustpilot rating of at least 4.0 on at least
   5,000 reviews. Very large = tracking of at least 100 M$ or Trustpilot at
   least 4.5 on at least 20,000 reviews. A withheld Trustpilot rating simply
   does not count as evidence.
2. **Points lost only for sourced facts.** B1 earned rewards removable at the
   firm's discretion −15 (absorbs B2); B2 payout refusable for unquantified
   conduct −8 (B2A with a review route −4); B3 rules changeable on accounts
   already bought −5 (a generic "we may amend these Terms" clause costs
   nothing); B4 help centre vs contract contradiction −3; B5 profits removed,
   losses kept −3; B6 public criticism sanctioned (termination or forfeiture)
   −5; B7 funded-stage contract withheld until after purchase −5; contract
   penalties capped at 30 in total. Consistency on the most lenient main
   programme: ≥ 40 %: 0; 30-39: −2; 20-29: −5; < 20: −8; doubled when the
   payout is lost, halved when the rule applies to the evaluation only.
   Trustpilot (owner revision 2026-11-26): a documented guideline-breach
   notice with rating withheld −10; displayed rating 4.0–5.0: 0, 3.5–<4.0: −3,
   3.0–<3.5: −6, below 3.0: −10. No rating without a documented notice: 0.
   Retain the review-volume safeguard: fewer than 30 reviews: 0; 30–99:
   half the rating penalty, rounded up. Withholding and rating penalties never
   stack. Ceiling evidence and all other scale C rules remain unchanged.
   Regulator warning −5; documented payout
   default −40 (old and unclear −15, isolated −5); severe sanction for a
   procedural breach −2.
3. **What could not be checked costs nothing.**
4. **Reading levels.** Contract read in full by hand: the scale C score, up or
   down. Flagged clauses re-read by hand (excerpts): the score can only fall,
   by 10 points at most. Not read: the score stays on the pipeline above.
5. **History (approved in principle 2026-11-25, not yet applied):** H1 several
   payout complaints unresolved for more than 90 days, counted by hand with
   each post linked, −10; H2 acknowledged default or regulator proceedings
   −20. Until firm-file incidents are coded this way, no firm with dated
   incidents can rise under scale C.

### Scale C additions (Geyer, 2026-11-25, evening)

- **Cap at 60 for terms not read in full.** Any open firm whose terms have
  not been read in full by hand (`reading: "full"` in `scale-c.json`) is
  capped at 60 (`applyUnauditedCapRule`); the score dialog states the cap and
  the score before it. An unread contract can no longer rank above a read one.
- **D. Payout conditions**, read from the sourced restrictive rules (major or
  blocking) on the most lenient main programme: payout capped per request −4;
  extra payout conditions (buffer, review, minimum) −3; funded account ends
  after a set number of payouts −3; trailing drawdown on the funded account
  −2; profit split reduced over time −2. Consistency and D together cost at
  most 15 points.
- Earn2Trade and Blue Guardian are held (Geyer declined the rises); they stay
  under the 60 cap until he decides.
