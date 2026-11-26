# PropRadar scoring rules (shared by every agent)

Read this before you change any score. It applies to Claude, ChatGPT/Codex and
any human editor. `CLAUDE.md` (editorial and legal rules) still applies in
full; this file only covers how a score moves.

Approved by Geyer on 2026-11-18 (restrictive-rules scale), revised on
2026-11-20 (published rules weigh little, contractual risks weigh most:
section 2.2), and on 2026-11-19 (**Trustpilot: a single 6-point penalty, no rating cap**;
this supersedes the earlier 8-point proposal).

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
