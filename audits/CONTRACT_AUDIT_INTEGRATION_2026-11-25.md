# Contract audit integration — 25 November 2026 (Claude)

## Production check first
- Production on 25 Nov = commit `43cb727` (branch `hotfix/restore-ftmo-banner-20261124`), built on the stable base `22f715e` (22 Nov) + Black Friday promotions and the FTMO banner.
- `main` is 154 commits ahead of that base and still contains the V5.2 publications that were rolled back. **Merging into `main` would redeploy V5.2 scores.** This work therefore starts from `43cb727` and its PR targets the production branch, not `main`.
- Live check of www.propradar.tech/firm/ftmo on 25 Nov: 90/100 and the Black Friday offers, identical to the local production base.

## What was integrated
- `app/data/contract-audits.json`: 120 firm dossiers (39 counter-audits in progress, 81 first documentary files), 721 published findings, each with source URL, locator, scope and verification date.
  Groups: rules by programme 201, discretionary clauses 238, payout terms 171, contradictions between documents 19, versions / which document prevails 31, trader protections 26, legal entity 34.
- Payout evidence for 28 firms, labelled by reliability (independent on-chain tracker vs firm-reported). The PayoutJunction all-time table was re-read by Claude on 25 Nov 2026; Topstep's 2025 disclosure figures (33.3% of Funded Level participants paid, 0.71% of XFA moved to Live) re-read on the official page. When nothing is recorded, the page says that absence of evidence does not mean non-payment.
- Trustpilot: exact-domain status and date from the 24 Nov checks shown in each counter-audit dossier.
- Older French findings translated into English (`audits/contract-audit-fr2en-2026-11-25.json`), scoring remarks dropped.
- `scripts/build-contract-audits.py` rebuilds the JSON from the `audits/` files (simulated V6.x points and scores are never read).

## What did NOT change
- No score, rank, promotion, affiliate link, partner offer or banner. Snapshot of all 197 firms (score, status, payout risk, Trustpilot, start links, partner offers, ranking order) is byte-identical before/after.
- `firm-updates.json` and `propFirms.ts` untouched: the dossier layer is not read by the score pipeline.
- Register states unchanged: every record stays `REOPENED_PARTIAL` or `REVALIDATION_REQUIRED`; `siteDossier` only records that a partial dossier is displayed.

## Held back for Geyer (sensitive, CLAUDE.md rule 6)
Kept in the data with `publish: false`, never rendered:
- Take Profit Trader: four findings sourced to a third-party copy of a June 2026 contract (propfirm007.page), not confirmed as the current checkout version; BBB complaint responses.
- FundYourFX: Trustpilot "site closed / no new reviews" observation.
- Funded Bull: secondary report of a tracker "closed" flag.
- Crypto Fund Trader: Trustpilot now shows "rating unavailable due to a breach of our guidelines" and a fake-review removal notice (checked by Claude on 25 Nov, 1,110 reviews), while the firm page panel does not show the withheld state. Changing the panel is a new incident and may move the score: owner decision.

## Still open
- Spot-checks of individual clauses beyond the payout tracker and Topstep were interrupted (web reading needed approval on 25 Nov). Remaining verification of the 721 findings is sample-based, not exhaustive.
- 159 register records still need revalidation; no new lot of five was audited in this session.
- Funded/live agreements, primary registries and historical incidents remain the main gaps (see each dossier's "Still to verify").
