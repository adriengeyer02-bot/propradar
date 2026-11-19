# PropRadar — five-axis scoring, 100 points (approved structure)

**Owner decision: 19 November 2026.** The 35/30/15/10/10 distribution is
approved. This file is the specification for a **staged re-audit**, not an
instruction to replace the current live scores before the dossiers and
individual score changes are verified. `SCORING.md` remains the deployed
formula until the new pipeline is reviewed and explicitly switched on.

## 1. Score budgets

| Axis | Maximum | What matters |
|---|---:|---|
| Payout reliability | **35** | Actual withdrawal eligibility, independently established payment problems, payout evidence |
| Contract rules | **30** | How trading terms can delay or cancel earned gains; availability and consistency by programme |
| Legal traceability | **15** | Contracting entity, registration, meaningful remedies, applicable regulator or court facts |
| Commercial integrity | **10** | Honest marketing and review integrity; **Trustpilot −6 once** for a current, sourced breach notice |
| Offer quality | **10** | Published regular price/fees (4), programme flexibility (3), platforms and tradable assets (3) |

The maximum is 100; there are **no bonuses for affiliation, coupons,
promotions or age**. A documented operating history can support payout
evidence, but age by itself is not a criterion.

## 2. Earning points versus documented deductions

### Payments — 35

- Verified independent payout evidence that has been checked beyond a company
  claim can earn the full **35** before separate adverse facts.
- Company-reported payout evidence, correctly identified as such, earns at
  most **30**. This is **not** independent proof of payment reliability.
- Published payout conditions without verified completed payouts earn at
  most **25**, provided the contracts have actually been reviewed. This is
  an evidence-confidence distinction, **not a penalty for being young**.
- With no readable payout policy, the payment axis is **unassessed**, not
  0/35 and not 35/35; do not publish a definitive overall score.
- A single **independently established, unjustified** refusal may deduct
  **15**; repeated established unjustified refusals may deduct **up to 25**.
  Recurrent, documented payment delays generally deduct **4–8** depending
  on scale and remedy. Do not use a Trustpilot allegation alone to make an
  accusation of unjustified nonpayment.
- Payout deductions have a total ceiling of **35**.

### Contractual conditions — 30

Read every principal programme's current official pricing page, FAQ and
terms; classify the **effect on a trader's gains**, not just the title:

- Minor and clearly stated inconvenience: commonly **−1**.
- Material, clearly disclosed payout or account restriction: **−3 to −5**.
- Material restriction found only in obscure terms: **−5 to −8**.
- Vague, contradictory or hidden power to cancel already-earned gains:
  **−8 to −12**.
- Independently established abusive retroactive change or especially
  serious cancellation right: **up to −15** per distinct finding.

The total cannot exceed **30**. Preserve the current programme-weighting
principle in `computeRulesPenalty` when designing the replacement; do not
apply a restriction from one challenge to all products. The existing
0–12 curve and the new 30-point budget must **not both** be subtracted from
the same set of rules: they represent the same evidence under different
scoring versions.

### Legal traceability — 15

- Named contracting entity matched to an independent registry: up to **15**
  before any separate, properly sourced legal incident.
- Entity named only by its own website without independent registration
  verification: up to **10**, with confidence marked limited.
- Unidentified contracting party: **unassessed/provisional**, not a proven
  crime and not a fabricated zero.
- Documented contradictions, directly relevant regulatory warnings and
  material gaps can reduce the points further; a foreign jurisdiction or
  lack of a licence **not legally required for the service** is not itself
  an offence.

### Commercial integrity — 10

- A current Trustpilot notice of guideline breach or fake-review removal:
  **−6, exactly once**, within this 10-point category, without any rating
  ceiling. A withdrawn score and removed fake reviews on the same profile
  form **one event**.
- Separate, established commercial misinformation can reduce other points
  inside the same 10-point cap. Do not infer that the firm itself purchased
  fake reviews without independent proof.

### Offer quality — 10

- **0–4:** ordinary list fees and total documented costs relative to similar
  products (never promotional coupon prices).
- **0–3:** breadth and flexibility of programmes relevant to the trader.
- **0–3:** documented platform and asset availability.
- Every awarded component needs current official product links; no reward
  for the number of affiliate offers.

## 3. Exactly one sanction per fact

Every adverse event has a stable `eventId`, one owning axis, one explanation,
and at least one HTTPS source. A single hidden clause cannot be deducted
simultaneously as restrictive trading, legal opacity and payout abuse.
Truly different independently substantiated incidents may still contribute
separately within their axis ceilings. Unverified customer complaints can
appear as **claims to verify**, with zero numeric penalty until corroborated.

## 4. Audit confidence is separate from risk

| Badge | Evidence coverage |
|---|---|
| **A** | Official contractual and legal dossier plus independently verified payout evidence |
| **B** | Official terms, payout policy, named entity and review source, but payment proof or registration verification relies on first-party information |
| **C** | One or more minimum source categories missing; **do not publish as a definitive audited score** |

Before publication, the auditor must provide at least an official rules URL,
an official payout-policy URL, a legal-entity source and an identified
review-integrity source, plus the three sourced offer subscores. A sourced
score with limited independent evidence may be B; missing documents are C.

Confirmed closed firms stay outside the active rankings with a prominent
closed-state notice; their historical audit is retained rather than treated
as a currently purchasable offer.

## 5. Implementation and launch gate

- `app/lib/scoringV2.ts` validates the five budgets, evidence, proof levels,
  de-duplication and score arithmetic; it is **not enabled for customers**.
- `scripts/test-scoring-v2.ts` checks the invariants and refuses unsupported
  deductions or published results with missing essential sources.
- `scripts/audit-scoring-v2-coverage.ts` creates a 197-firm **coverage**
  census, not new scores. Reading an old editorial number does not supply
  five verified subscores.
- Audit and source each firm, independently review 10 diverse calibration
  cases, and list before/after changes with reasons.
- Do not merge sensitive 10+-point movements without Geyer's review, per
  `CLAUDE.md`. Run TypeScript, the complete build, the JSON validator when
  its data changes, and ensure all user-facing languages match.
- Coordinate with currently open audit PRs on `propFirms.ts` and
  `firm-updates.json` as required by `AGENTS.md`; never overwrite their
  source files to force publication.
