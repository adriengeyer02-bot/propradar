# Programme audit — Forex/CFD batch 1 (Claude), 27 November 2026

Scope: The5ers, FTMO (CFD), FundedNext (CFD), Funding Pips, E8 Markets.
Rubric: the existing five-axis programme rubric (`audits/PROGRAMME_FLEXIBILITY_HANDOFF_2026-11-27.md`, batch 1–3 reports), unchanged.
The /5 rating stays separate from the company /100; no company score, scoring formula, affiliate link, promotion or Futures record was touched.

**Status: partial batch.** Official pages could be read only through the `agent/terms-archive` captures (25 November) and a first set of page reads. Page fetching was then blocked: permission requests went unanswered, and the scraping credits are exhausted until 18:28 UTC. Funding Pips and E8 Markets could not be read on official pages. They stay unrated, and no data was added for them from third-party sites.

## Results

| Firm | Programmes in catalogue | Added / corrected | Rated (5/5 axes) | Prices added |
|---|---|---|---|---|
| The5ers | 3 CFD (High Stakes, Bootcamp, Hyper Growth) + Futures (out of scope) | Hyper Growth corrected; High Stakes corrected | 0 (Hyper Growth 4/5 axes) | 0 |
| FTMO (CFD) | 3 (2-Step, 1-Step, Instant), complete | — | already 3 | 0 |
| FundedNext (CFD) | 4 (Stellar 1-Step, 2-Step, Lite, Instant) | Stellar Instant evidence | **1 new: Stellar Instant 2.5/5** | 4 rows |
| Funding Pips | 5 per third-party news (1-Step Flex, 2-Step Standard, 2-Step Flex, 2-Step Pro, Zero); 4 on file | — (official pages unreadable) | 0 | 0 |
| E8 Markets (CFD) | E8 One, E8 Pro on file; **E8 Classic v2** found in the official help center | — | 0 | 0 |

### New rating — FundedNext Stellar Instant: 2.5/5

Sources: the official help-center article dated 2 October 2026, archived 25 November 2026: https://help.fundednext.com/en/articles/17253243-stellar-instant-account

| Axis | Points | Reason |
|---|---:|---|
| Drawdown | 0 | 6% trailing on the highest balance; breached by equity at any time; stops rising at the initial balance. Same treatment as FTMO Instant. |
| Payouts | 0.5 | On demand at 5% growth (end-of-day check) or every 14 days with ≥1% growth. The loss limit never resets after a reward, so each withdrawal reduces the buffer. Profit above the initial balance stays withdrawable, unlike FTMO Instant's uncapped trailing floor, which scored 0. |
| Consistency | 1 | The account rules table states "None. No consistency rules apply." |
| Trading | 0.5 | Only 40% of profits from trades within 5 minutes of high-impact news count; Quick Strike (30 s); copy trading limited to the trader's own accounts. Weekend holding allowed. |
| Funded conditions | 0.5 | 3% maximum risk at any time, the same as the other Stellar ratings. |

Price table (help center, "approx."): $2K $59.99 · $5K $149.99 · $10K $299.99 · $20K $599.99. There is no refundable fee, and a reset costs 10% less than the purchase price. The checkout page was not re-read.

### The5ers

- **Hyper Growth.** The programme FAQ (updated 2 November 2026) says accounts that hit the stop-out level are terminated, and that this level is 6% below the initial account size. The product is now marked `Static` and `Challenge`, no longer `Scaling`: it is a one-level challenge.
  - Axes: drawdown 1; payouts 0.5 (14 days, and the cycle restarts at each scaling); trading 1; funded conditions 0.5 (3% daily pause, 30-day inactivity).
  - Consistency is **not assessed**. The official specification list neither states nor excludes a rule, and an absence is not evidence. **Not rated.**
- **High Stakes.** There are two current versions:
  - New: 10% / 5% targets; Classic: 8% / 5% targets (2-Step FAQ, 2 November).
  - Sizes run from $2.5K to $100K, according to the product page.
- **Conflicts left open:**
  - The 2-Step FAQ shows $149 (New) / $179 (Classic) for $100K, a 3% daily loss, a 50% consistency rule on Pro and a $2,000 cap.
  - The payout FAQ (24 November) uses a $545 example for $100K and lists caps of $3,000 ($50K) and $4,000 ($100K), with no consistency rule.
  - The product page shows a 5% daily loss.
  - No price was changed and no rating was published.
- The High Stakes, Hyper Growth and Bootcamp product pages load their prices dynamically. Only one price could be read ($19 for the $2.5K High Stakes), and it could not be tied to New or Classic, so it was not recorded.

### FTMO (CFD)

- The current catalogue is complete: 2-Step, 1-Step and Instant.
- **Swing** (an account type chosen at checkout): no news restriction and weekend holding allowed, with leverage reduced to 1:30 (https://ftmo.com/faq/what-is-the-swing-account-type-and-how-does-it-work/). This would justify +0.5 on the trading axis of the 2-Step, as the existing scope already notes.
  - It is not added as a variant: the variant block is labelled "Other funded options after passing", and Swing is chosen at purchase. A "purchase option" label needs a UI change on the component side.
- **Conflict:** the official FAQ says Swing is offered exclusively on the 2-Step. The OANDA-branded FTMO site announced Swing on the 1-Step from 23 March 2026. The current 1-Step scope ("Swing not offered") follows ftmo.com.

### FundedNext (CFD)

- The CFD catalogue is complete with Stellar Instant.
- The existing **promotion check fails on main, before this branch**: `fundednext / fundednext-novins-stellar-instant-2026: missing public end date` (`scripts/check-program-promotions.cjs`). It is not modified here.

### Funding Pips — not rated

- Product pages and the help center (help.fundingpips.com) are blocked in the archive (268-character captures), and they could not be read live.
- Third-party coverage reports:
  - a 2-Step Flex launch (June 2026);
  - a line-up overhaul for new purchases (28 September 2026);
  - lower $100K prices.
- Missing on file: 2-Step Flex (product and prices); prices for all four existing products; the current reward cycles and their conditions. These need the official help center.

### E8 Markets — not rated

- The official help center (intercom.help/e8) confirms for **E8 Pro**:
  - no payout cap and no consistency rule; daily requests once profit reaches 1%;
  - 50% of profit is retained as a buffer;
  - the static loss level moves to the initial balance at the first payout.
- The E8 Pro **2% daily profit cap** still has to be read precisely (excess removed, or trading disabled?) before it can be classed under consistency or trading. Funded conditions and news rules are also missing.
- **E8 Classic v2**, a new 1-Step product (static drawdown, daily payouts, no consistency rule; $2K from $29 with a 2% daily loss limit, or $36 without one), is not on file. Its full price table and rules are needed.

## Tests

- `node scripts/check-constraint-simulators.cjs`: 56 checks OK (4 assertions added).
- `node scripts/check-price-tables.cjs`: 28 firms, 86 schedules, 352 rows.
- `npx tsx scripts/validate-firm-updates.ts --base <main>`: valid; only `the5ers` is changed (products + changelog). The SENSITIVE list printed by the validator concerns wording in other firms that is already on main.
- `npx tsc --noEmit -p .` and `npx next build`: pass.

## What is needed to finish the batch

Allowing page reads again (one message is enough), or waiting for the scraping credits to reset at 18:28 UTC, would allow:
- reading the full Funding Pips and E8 help centers;
- reading the dynamic prices on the The5ers, FundedNext and E8 product pages;
- resolving the High Stakes conflicts.
