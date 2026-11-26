# Instructions for AI agents (ChatGPT/Codex, Claude and others)

Several AI agents work on this repository for Geyer. Read these files before
any change, in this order:

1. `CLAUDE.md`: the project rules for every agent, despite its name (data
   files, sources, editorial and legal rules, sensitive changes, checks before
   merge).
2. `SCORING_V4.md`: **current target policy and active score calculation**
   for the 37 individually published V4 firms (25/35/15/15/10, one Trustpilot
   −6, no standalone restrictive-rules deduction; owner approval 2026-11-20).
   `SCORING.md` documents the **legacy pipeline only**, for the remaining
   firms that have not passed the V4 publication gate. Do not silently apply
   legacy deductions to V4 scores, and do not activate incomplete audits.
3. `claude/README.md`: short, dated implementation brief for Claude
   (including how to correct manual scores that embedded the former -8).
4. `README.md`: product overview (French).

## Active integration branch — 2026-11-26 (owner coordination request)

**Until the owner approves a reconciled production baseline, use `claude/scale-c-batch2` as the shared integration baseline for current Scale C, offers UI and translations. Do not start current work from stale `main`, or deploy it.** PR #281 documents the approved Scale C changes. This instruction supersedes older references below to starting from main or the V4 audit split for current Scale C work; it does not authorize changes to scores or sensitive data.

- Before editing, fetch the latest remote branch HEAD and the current file. Check open PRs and coordinate overlapping files; do not work concurrently on the same file from stale snapshots.
- ChatGPT/Codex owns translations in the existing `app/lib/dataI18n/` dictionaries (including `scaleCEvidence.json`); Claude owns source clauses and scoring. Both agents must use the same canonical files, not alternative copies or older dictionaries. If an English source changes, review the corresponding translations; preserve unchanged entries and other locales. Match by firm slug, criterion code and exact source, not array position alone.
- Make narrowly scoped changes against the latest file SHA, preserve unrelated changes, reject conflicts rather than force-push, and verify the diff and existing entries after each commit. Do not overwrite the entire branch or reset it to an old deployment.
- For parallel changes, branch from the latest shared baseline and integrate by a reviewed, conflict-free PR into that baseline, not into stale main. Keep the production domain on a verified approved build; confirm scores, audit data, translations and offers UI before promotion. Do not merge the diverged main blindly.
- Reconcile main and the production branch separately with an explicit file-level review and owner approval. Once that is done, update this instruction and Vercel's production branch together.

## Who does what (set by Geyer on 2026-11-18)

| Agent | Area | Branch prefix |
|-------|------|---------------|
| ChatGPT / Codex | Translations and new site languages (`app/lib/messages/`, `app/lib/guideI18n/`, `app/lib/dataI18n/`, locale routing) | `codex/` |
| Claude | Firm audits and data (`app/data/firm-updates.json`, `app/lib/propFirms.ts`, restrictive rules, promo codes, scoring) | `agent/` or `claude/` |

Work outside your area only when Geyer asks for it, and say so in the PR.

**V4 audit split (Geyer's tracking sheet of 2026-11-20):** Claude takes the
56 "V4 à lancer" files, lots **N01–N03** (Get Leveraged … Guardeer Funding),
and flags disagreements on already published V4 notes before any change.
ChatGPT/Codex keeps the 66 "à compléter" files, lots **C01–C04**. Do not
publish a V4 note for a firm of the other agent's lots.

## Avoid stepping on each other

- **Before you start**, list the open pull requests
  (`GET repos/adriengeyer02-bot/propradar/pulls?state=open`). Do not edit a
  firm (a key of `firm-updates.json`) or a file that another agent's open PR
  changes; pick other work or wait.
- **Start from the active integration baseline above** and synchronize with it right before you
  push. `app/data/firm-updates.json` is shared and large: change only the
  firm entries you work on, never reformat the whole file.
- **Small PRs, one topic each.** Say in the PR body which firms or files you
  touched, so the other agent can skip them.
- **Do not merge another agent's PR.** Sensitive changes (CLAUDE.md rule 6)
  stay open for Geyer.
- New interface strings go into every locale file (`app/lib/messages/*.ts`);
  the translation agent may then refine the wording.
