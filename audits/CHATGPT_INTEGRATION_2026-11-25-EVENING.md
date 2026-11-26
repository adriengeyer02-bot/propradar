# ChatGPT audits integrated on 2026-11-25 (evening) — documentary layer only

No score, status or ranking changed by this integration (snapshot identical).
All dossiers stay `partial`; nothing here is marked complete.

## Files recovered without merging the branches
- `editorial/program-v31-snapshot-20261125`: `exhaustive-document-register-blue-guardian-apex-2026-11-25.json`, programme-card and V3.1 snapshot handoffs.
- `audit/legal-cgu-deep-sweep-20261124`: wave reports, V5.2/V6 calibration notes, 40-programme stress tests (V1, V3, V3.1 — experimental, not approved), V6/V6.1/V6.3 pilots.
- `hotfix/restore-ftmo-banner-20261124` (commit 9a7077e): FTUK, Breakout, Bespoke and Leveled Up partial review (already on the branch).
- Master register `contract-coverage-master-121` and `CLAUDE_HANDOFF_2026-11-24.md`: identical to the copies already integrated; `full-audit-coverage-register` differs only by the `siteDossier` fields added by Claude.

## What went into `app/data/contract-audits.json`
`scripts/merge-gpt-registers.py` (idempotent, verification `chatgpt-partial-2026-11-25`):
- Observations of the four-firm file and the clause-level findings of the Blue Guardian / Apex register.
- Register summaries are split clause by clause and deduplicated against every finding already in the dossier (same source + same § reference, or word overlap ≥ 0.4): 60 added, 15 duplicates skipped.
- Search excerpts, secondary excerpts and legacy FAQ snapshots are kept unpublished; extraction artefacts and the firm's affiliate terms are skipped.
- Each register's outstanding documents become open items on the dossier.
- New partial dossiers: Bespoke Funding Program, Leveled Up Society (historical brands; status review pending).

## Claude's own reading
- Apex User Agreement fetched in full on 2026-11-25 (38 sections); §11, §12, §14, §15, §20, §21, §30 read by hand (`audits/claude-doc-readings-2026-11-25/apex-trader-funding.json`): rewards deniable "for any reason or no reason", final and not appealable (§12); termination and reward denial for exceptional performance (§15); prohibited list changeable without notice (§11, §30); reward denials and communications confidential (§20-21). Excerpt level: no score change proposed or applied.

## Still open (not complete)
- Apex: Trading and Consistency Rules page (404), live agreement, help-centre bodies.
- Blue Guardian: signed Trader Agreement, current help-centre bodies (older snapshots ≈ 3 months old).
- Breakout: full evaluation and funded agreements with annexes. FTUK: current terms and funded agreement.
- Bespoke, Leveled Up: historical terms unavailable; status review for the owner.
