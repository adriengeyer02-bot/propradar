# Instructions for AI agents (ChatGPT/Codex, Claude and others)

Several AI agents work on this repository for Geyer. Read these files before
any change, in this order:

1. `CLAUDE.md`: the project rules for every agent, despite its name (data
   files, sources, editorial and legal rules, sensitive changes, checks before
   merge).
2. `SCORING_V4.md`: **current target policy and active score calculation**
   for the 34 individually published V4 firms (25/35/15/15/10, one Trustpilot
   −6, no standalone restrictive-rules deduction; owner approval 2026-11-20).
   `SCORING.md` documents the **legacy pipeline only**, for the remaining
   firms that have not passed the V4 publication gate. Do not silently apply
   legacy deductions to V4 scores, and do not activate incomplete audits.
3. `claude/README.md`: short, dated implementation brief for Claude
   (including how to correct manual scores that embedded the former -8).
4. `README.md`: product overview (French).

## Who does what (set by Geyer on 2026-11-18)

| Agent | Area | Branch prefix |
|-------|------|---------------|
| ChatGPT / Codex | Translations and new site languages (`app/lib/messages/`, `app/lib/guideI18n/`, `app/lib/dataI18n/`, locale routing) | `codex/` |
| Claude | Firm audits and data (`app/data/firm-updates.json`, `app/lib/propFirms.ts`, restrictive rules, promo codes, scoring) | `agent/` or `claude/` |

Work outside your area only when Geyer asks for it, and say so in the PR.

## Avoid stepping on each other

- **Before you start**, list the open pull requests
  (`GET repos/adriengeyer02-bot/propradar/pulls?state=open`). Do not edit a
  firm (a key of `firm-updates.json`) or a file that another agent's open PR
  changes; pick other work or wait.
- **Start from an up-to-date `main`** and rebase on `main` right before you
  push. `app/data/firm-updates.json` is shared and large: change only the
  firm entries you work on, never reformat the whole file.
- **Small PRs, one topic each.** Say in the PR body which firms or files you
  touched, so the other agent can skip them.
- **Do not merge another agent's PR.** Sensitive changes (CLAUDE.md rule 6)
  stay open for Geyer.
- New interface strings go into every locale file (`app/lib/messages/*.ts`);
  the translation agent may then refine the wording.
