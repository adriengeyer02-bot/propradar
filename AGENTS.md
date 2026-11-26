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

## Shared branch — from PR #283 (Geyer, 2026-11-26)

**`main` is the only shared baseline and it is production: Vercel publishes every
commit that lands on `main`.** `claude/scale-c-batch2` is retired once PR #283 is
merged; do not push to it any more.

- Before any edit: `git fetch` and start from the latest `origin/main`, never from a
  local copy or an older branch. Re-fetch right before committing.
- Work on a short branch (`claude/...` or `chatgpt/...`), open a PR into `main`.
  Geyer merges. Never push directly to `main`.
- File ownership, to avoid undoing each other:
  - ChatGPT/Codex: translations in `app/lib/dataI18n/` and `app/lib/messages/` text
    values, contract archives (`terms-archive/` on `agent/terms-archive`).
  - Claude: scoring (`scale-c.json`, `scripts/*scale-c*`, `propFirms.ts` pipeline),
    firm data (`app/data/firm-updates.json`), firm page layout
    (`app/[locale]/firm/[slug]/page.tsx`, its components and CSS).
  - A change in the other agent's files goes through a PR that says so in its title.
- If a PR conflicts, merge the latest `main` into the branch and keep both sides'
  work; never force-push and never overwrite a whole file from an old copy.
- Both instruction files say the same thing: `CLAUDE.md` (Claude) and this file
  (ChatGPT/Codex). Change both together.

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
