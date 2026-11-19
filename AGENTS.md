# Instructions for AI agents (ChatGPT/Codex, Claude and others)

Several AI agents work on this repository for Geyer. Read these files before
any change, in this order:

1. `CLAUDE.md`: the project rules for every agent, despite its name (data
   files, sources, editorial and legal rules, sensitive changes, checks before
   merge).
2. `SCORING.md`: **authoritative scoring policy for all agents**.
   Restrictive-rules penalty, **single Trustpilot -8 (no 64 cap, approved
   2026-11-19)**, closure cap. It supersedes the former Trustpilot cap in
   `CLAUDE.md` section 7 until that section is synchronized. Never lower a
   score by hand for a restrictive rule: classify it and the code computes
   the penalty. Do not count the same Trustpilot incident twice.
3. `README.md`: product overview (French).

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
