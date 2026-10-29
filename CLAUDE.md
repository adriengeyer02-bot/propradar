# PropRadar - working rules for Claude

PropRadar (www.propradar.tech) is an independent prop-firm comparator. Its only
asset is trust: every number must be traceable, every warning sourced. When in
doubt, publish less, not more.

Stack: Next.js 15 (App Router), deployed by Vercel on every push to `main`.
Design: `app/design-refresh.css` (loaded last) holds the current visual system:
Archivo variable font, navy + radar cyan accent, sentence-case labels.
Site language: English. Owner: Geyer (writes in French, answer him in French).

## Where the data lives

- `app/lib/propFirms.ts` - base profiles (core firms + "universe" watchlist
  firms). Large file: do not rewrite it for routine updates.
- `app/data/firm-updates.json` - dated, sourced updates applied on top of the
  base profiles (`app/lib/firmUpdates.ts`). **All routine updates go here.**
  Each entry shows up in the firm page "Update history".
- `app/lib/firmMetaOverrides.ts` - SEO titles for firm pages that rank.
- `app/lib/closures.ts` - dated, sourced closure records for firms marked
  `Fermée` (shown on the firm page and on /prop-firm-statistics). When a firm
  is closed, add its record here with the source's own date and wording.
- `app/lib/industryStats.ts` - figures for /prop-firm-statistics (and its CSV),
  computed from the firm files; provisional values are always excluded.
- `scripts/check-domains.ts` - official-domain monitor (run daily by
  `.github/workflows/domain-monitor.yml`, which opens a GitHub issue on change).
- `scripts/validate-firm-updates.ts` - validates the JSON and says whether a
  change is sensitive. Run it before every commit that touches the data.

## Firm logos

- Self-hosted in `public/logos/<slug>.png` (192 px tiles), listed in
  `app/lib/firmLogos.ts` keyed by `logoDomain`. No logo = neutral monogram.
- Refresh: run the "Fetch firm logos (raw)" workflow (pushes raw icons to the
  `agent/logo-raw` branch), then `python3 -I scripts/normalize-logos.py
  <logo-raw dir> --sheet sheet.png` and look at the contact sheet before
  committing. Never use a logo from a site that redirects to another brand.
- Share images (`opengraph-image.tsx` in `firm/[slug]` and `guides/[slug]`)
  are generated from the same data and logos at build time.

## firm-updates.json format

```json
"slug": {
  "reviewedAt": "YYYY-MM-DD",
  "set": { "trustpilotRating": 4.6, "trustpilotReviewCount": 12000,
           "trustpilotSourceUrl": "https://www.trustpilot.com/review/...",
           "priceFrom": 89, "profitSplit": 90, "payoutDelay": "...",
           "score": 74, "status": "Active", "listedDomainWarning": "..." },
  "addSources": [{ "label": "...", "url": "https://..." }],
  "addIncidents": ["Dated, sourced fact."],
  "changelog": [{ "date": "YYYY-MM-DD", "summary": "What changed and why.",
                  "source": "https://...", "fields": ["trustpilotRating"] }]
}
```

Keep earlier changelog entries when you update a firm: append, never delete.

## Editorial and legal rules (non-negotiable)

1. **Source everything.** Every change needs a public https source in the
   changelog. No source, no change.
2. **Facts, not verdicts.** Write "The FCA added X to its warning list on
   2026-09-02 (link)", never "X is a scam". Do not use scam, fraud, criminal,
   arnaque in our own voice. Quote regulators or courts by linking them.
3. **Never invent numbers.** No estimated counts presented as measured
   (mention counts, payout totals, review counts). If you could not read the
   number, leave the field unchanged.
4. **Affiliation never moves a score.** FTMO, The5ers, FunderPro, GOAT Funded
   Trader and Blue Guardian are affiliates: hold them to the same standard.
5. **Domain changes.** If a listed official domain redirects elsewhere, is
   parked or serves unrelated content, check by hand first: the firm may simply
   have moved (Alpha Futures was wrongly marked stale in July 2026 because the
   wrong domain was listed). Only then set `listedDomainWarning`.
6. **Sensitive changes need Geyer's approval**: status changes, score drops of
   5+ points or moves of 10+, domain warnings, new incidents, accusation-type
   wording. The validator flags them. Open the PR and leave it unmerged.
7. **Do not touch** affiliate URLs, promo codes or the scoring formula without
   an explicit request.
8. **No Reddit or X scores.** Removed on 2026-10-27: they were derived from the
   PropRadar score, not counted. Firm pages link to live Reddit/X searches
   instead. Show a Reddit or X figure only if posts were counted by hand, with
   each post linked. Same for Trustpilot review-alert counts: hand-counted only.

## Updating firms (weekly research run)

1. Read the latest open issue "Domain monitor: official site changes" and the
   latest `domain-checks` artifact of the Domain monitor workflow
   (`gh run list --workflow domain-monitor.yml`, `gh run download`).
2. Pick about 12 firms: first any firm flagged by the domain monitor, then
   affiliates and `Active` firms, then the oldest `lastReviewed` dates.
3. For each firm, check with web search / fetch: official site (prices,
   profit split, payout terms, recent rule changes), Trustpilot page (rating
   and review count), regulator warning lists (FCA, CFTC/NFA, ASIC, AMF,
   CONSOB, CNMV), and recent news about closures, payout delays or lawsuits.
4. Write entries in `app/data/firm-updates.json`, run
   `npx tsx scripts/validate-firm-updates.ts --base <previous json>`.
5. Branch `agent/weekly-YYYY-MM-DD`, commit, push, open a PR with the REST API
   (`gh api repos/adriengeyer02-bot/propradar/pulls`; GraphQL is blocked).
   Put the validator output and a per-firm summary in the PR body.
6. Wait for the Vercel status on the PR commit to be `success`.
7. Not sensitive: squash-merge it. Sensitive: leave it open and list what needs
   approval at the top of the PR body.

## Checks before any merge

- `npx tsc --noEmit -p .` and `npx next build` pass (fonts are self-hosted
  via @fontsource-variable/archivo, so the build works offline).
- Vercel status on the PR commit is `success`.
