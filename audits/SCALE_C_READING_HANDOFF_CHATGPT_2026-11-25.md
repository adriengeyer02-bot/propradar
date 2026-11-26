# Scale C contract reading — handoff to ChatGPT (2026-11-25)

Geyer splits the remaining contract readings between Claude and ChatGPT. **ChatGPT reads the firms listed in section 4.** Claude reads the others (section 5). Claude then checks every ChatGPT sheet clause by clause against the cited text before any score is computed; Geyer approves the scores before publication.

## 1. Rules (non-negotiable)

- **Do not change any score, status, ranking, `scale-c.json`, `firm-updates.json` or production code.** Deliver reading sheets only.
- **Do not push to `hotfix/restore-ftmo-banner-20261124` (production base) or `main`.** Push to a new branch `audit/chatgpt-scale-c-reads-20261125`, folder `audits/fulltext-chatgpt-2026-11-25/`.
- A sheet is a **full read** only if the whole current terms (and every incorporated payout/rules page in the archive) was read. Otherwise set `"status": "PARTIAL"` and list what is missing in `toVerify`. Never present a partial reading as complete.
- Quote the contract (short exact quotes) with the clause number in `locator` and the public https URL in `source`. Facts, not verdicts: never write scam, fraud or similar in our voice.
- Ignore promotional sections (referral/affiliate 'Rewards', giveaways, competitions). Generic acceptable-use lists (no insider info, no latency arbitrage, do not harass/defame) are not penalties.

## 2. Where the contracts are

- Branch **`agent/terms-archive`**, folder **`terms-archive/<slug>/`**. `index.json` lists every archived page: `url`, `finalUrl`, `file` (the text file in the same folder), `chars`, `fetchedAt` (2026-11-25). Files named `upload-*.txt` are PDFs saved by Geyer (OCR where image-only).
- `scripts/extract-clauses.py` (production branch) lists the paragraphs that match the discretion / sanction / rule-change lexicons with their headings: `python3 -I scripts/extract-clauses.py <terms-archive/slug> --out x.json --md x.md`. It is a reading aid, not a substitute for reading the sanction clauses in full.
- Examples of finished sheets: `audits/fulltext3-2026-11-25/*.json` on branch `claude/scale-c-batch2` (e.g. `tradeday.json`, `alpha-capital-group.json`).

## 3. Scale C (approved by Geyer, 2026-11-25)

Score = **ceiling earned with evidence − points lost for sourced facts**; what could not be checked costs nothing. **ChatGPT only codes the clauses** (section 3.2). Claude computes the ceiling, Trustpilot, regulator and payout-condition items from the firm files.

### 3.1 Ceiling (computed by Claude)
Under 1 year 55; 1-2 years 65; 2+ years 75; 3+ years + payout evidence at scale 85; 5+ years + evidence 95; 8+ years + very large evidence 98. Evidence = on-chain tracking ≥ 10 M$, payout statistics published with method, or displayed Trustpilot ≥ 4.0 on ≥ 5,000 reviews.

### 3.2 Clause codes (coded by the reader)

| Code | Points | Count it only when |
|---|---|---|
| B1 | −15 | Earned rewards are removable at the firm's sole discretion / for any or no reason / are 'not a right or entitlement'. B1 absorbs B2. |
| B2 | −8 | The firm can refuse or remove a payout or profits for conduct the contract does not quantify ('spirit', 'commercial purpose', 'appropriate risk management', 'abusive', 'as determined in its sole discretion'). A plain list of defined prohibited practices is not B2. |
| B2A | −4 | Same as B2 but with a written review, appeal or explanation route. |
| B3 | −5 | Rules or terms can change on accounts **already bought or running** (explicit: 'existing/current/active accounts', 'retroactively', rules 'as amended from time to time' that bind current funded traders, payout requirements changeable at any time). A generic 'we may amend these Terms; continued use = acceptance' clause costs **nothing**. A non-retroactivity clause is a safeguard (`SAFE`). |
| B4 | −3 | Help centre / FAQ and contract say different things on the same point (quote both). |
| B5 | −3 | Profits removed while losses stay counted (e.g. trades under a minimum hold time). |
| B6 | −5 | Public criticism or 'reputational harm' to the firm is a ground for termination, forfeiture or damages. A generic 'do not defame' acceptable-use line is not B6. |
| B7 | −5 | The funded-stage contract or rules are explicitly withheld until after purchase/passing ('agreement you execute', 'contract we send you', rules communicated by e-mail). A mere mention of a 'separate agreement' goes to `toVerify`. |
| E_HARSH | −2 | Severe sanction for a procedural breach (e.g. all profits forfeited for a VPN, an unanswered interview). |
| CONS_<pct>_<DELAY/FORFEIT/EVAL> | tiers | Consistency rule of the **most lenient main programme** (≥ 40%: 0; 30-39: −2; 20-29: −5; < 20: −8; doubled if the payout is lost, halved if evaluation only). A low threshold on a side product (Instant, $5K starter) is coded `CONS_INFO`. |
| SAFE / NOTE / CONS_INFO | 0 | Safeguards, context, consistency on side products. |

Contract codes (B1-B7) are capped at 30 points together. Claude adds: Trustpilot notice (rating withheld) −6, Trustpilot < 4.0 on ≥ 1,000 reviews −3, regulator warning −5, documented payout default −40, payout conditions (payout cap −4, buffer/extra conditions −3, account ends after payouts −3, funded trailing drawdown −2, split reduction −2; with consistency, 15 max). Terms not read in full: score capped at 60.

### 3.3 Sheet format

```json
{"slug": "tradeday", "status": "TERMS READ" | "PARTIAL", "checkedOn": "2026-11-25",
 "method": "what was read (files, sections)",
 "facts": [{"code": "B2", "text": "short exact quotes + plain summary", "source": "https://...", "locator": "§23", "checkedOn": "2026-11-25"}],
 "rejected": {"B3": "why a tempting clause does not qualify"},
 "toVerify": {"B7": "what is missing"}}
```

## 4. ChatGPT's list (42 firms)

| Firm | Slug | Archive | Main terms URL |
|---|---|---|---|
| Ment Funding | `ment-funding` | `terms-archive/ment-funding/` (8 files, PDF: upload-4c36f17229.txt) | https://mentfunding.com/terms-of-service |
| Trading Cult | `trading-cult` | `terms-archive/trading-cult/` (9 files) | https://pro.tradingcult.com/terms-and-conditions/ |
| IC Funded | `ic-funded` | `terms-archive/ic-funded/` (4 files) | https://www.icfunded.com/terms-and-conditions |
| TradeFundrr | `tradefundrr` | `terms-archive/tradefundrr/` (4 files, PDF: upload-69d2802319.txt, upload-9b349b4c37.txt) | upload:5ed3fa25-traderrfucnded2.pdf |
| Traders Launch | `traders-launch` | `terms-archive/traders-launch/` (7 files) | https://www.traderslaunch.com/terms |
| Funded7 | `funded7` | `terms-archive/funded7/` (9 files) | https://funded7.com/terms-and-conditions/ |
| TradeXProp | `tradexprop` | `terms-archive/tradexprop/` (6 files, PDF: upload-4c36f17229.txt) | upload:57c77dd6-ANALYTIX.pdf |
| Now Trade Funded | `now-trade-funded` | `terms-archive/now-trade-funded/` (6 files) | https://nowtradefunded.com/legal/terms-and-conditions.pdf |
| Funded Bull | `funded-bull` | `terms-archive/funded-bull/` (4 files) | https://fundedbull.com/terms |
| MilTraders | `miltraders` | `terms-archive/miltraders/` (10 files) | https://miltraders.com/terms/ |
| Lvlup Futures | `lvlup-futures` | `terms-archive/lvlup-futures/` (8 files, PDF: upload-4c36f17229.txt, upload-23e9314ac6.txt) | upload:57c77dd6-ANALYTIX.pdf |
| Levels | `levels` | `terms-archive/levels/` (3 files) | https://lv.ls/terms-and-conditions/ |
| Instant Funding | `instant-funding` | `terms-archive/instant-funding/` (9 files) | https://instantfunding.com/wp-content/uploads/2026/06/Instant-Funding-General-Terms-Conditions.pdf |
| Funded Trading Plus | `funded-trading-plus` | `terms-archive/funded-trading-plus/` (8 files, PDF: upload-bfaf93dd03.txt) | upload:552e97fe-funded_trading_plus.pdf |
| Maven Trading | `maven-trading` | `terms-archive/maven-trading/` (3 files) | https://maventrading.com/terms-and-conditions |
| Crypto Fund Trader | `crypto-fund-trader` | `terms-archive/crypto-fund-trader/` (6 files) | https://cryptofundtrader.com/terms-and-conditions/ |
| OneFunded | `onefunded` | `terms-archive/onefunded/` (9 files) | https://onefunded.com/terms-and-conditions/ |
| OFP Funding | `ofp-funding` | `terms-archive/ofp-funding/` (6 files) | https://ofpfunding.com/terms-and-conditions |
| QT Funded (Quant Tekel) | `quant-tekel` | `terms-archive/quant-tekel/` (9 files) | https://qtfunded.quanttekel.com/terms-and-conditions-general/ |
| Alpine Funded | `alpine-funded` | `terms-archive/alpine-funded/` (1 files, PDF: upload-d0e25c461f.txt) | upload:9b57b561-TC-260929.pdf |
| BEM Funding | `bem-funding` | `terms-archive/bem-funding/` (11 files) | https://bemfunding.com/terms-and-conditions |
| Blueberry Funded | `blueberry-funded` | `terms-archive/blueberry-funded/` (12 files, PDF: upload-b498104a6a.txt) | upload:4d2009b4-BBF-Technology-Access-and-Trader-Assessment-Program-Terms-and-Conditions.pdf |
| Purdia Capital | `purdia-capital` | `terms-archive/purdia-capital/` (8 files) | https://purdia.com/terms |
| Funded Squad | `funded-squad` | `terms-archive/funded-squad/` (9 files) | https://fundedsquad.com/terms-of-service |
| TradersEdgeFX | `tradersedgefx` | `terms-archive/tradersedgefx/` (2 files) | https://tradersedgefx.com/common-terms-and-questions/ |
| FundYourFX | `fundyourfx` | `terms-archive/fundyourfx/` (3 files, PDF: upload-e07ff61648.txt) | https://fundyourfx.com/terms-conditions |
| Aeon Funded | `aeon-funded` | `terms-archive/aeon-funded/` (4 files) | https://quantxfund.io/terms |
| My Flash Funding | `my-flash-funding` | `terms-archive/my-flash-funding/` (2 files) | https://myflashfunding.com/terms |
| Clarity Traders | `clarity-traders` | `terms-archive/clarity-traders/` (5 files) | https://www.claritytraders.com/terms-and-conditions |
| Tiger Funded | `tiger-funded` | `terms-archive/tiger-funded/` (5 files) | https://tigerfunded.com/terms-of-service |
| FundedElite | `fundedelite` | `terms-archive/fundedelite/` (11 files) | https://fundedelite.com/terms-and-conditions |
| Funded Trader Markets | `funded-trader-markets` | `terms-archive/funded-trader-markets/` (7 files) | https://fundedtradermarkets.com/terms-conditions |
| Funding Your Trades | `funding-your-trades` | `terms-archive/funding-your-trades/` (11 files, PDF: upload-712fe3a66d.txt) | https://fundingyourtrades.com/terms-of-services/# |
| WeMasterTrade | `wemastertrade` | `terms-archive/wemastertrade/` (9 files) | https://faq.wemastertrade.com/terms-and-conditions/ |
| Forexive | `forexive` | `terms-archive/forexive/` (8 files, PDF: upload-6b42709510.txt) | https://forexive.com/terms-and-conditions |
| SuperFunded | `superfunded` | `terms-archive/superfunded/` (9 files) | https://challenges.eightcap.com/wp-content/uploads/2026/01/Eightcap-Challenges-General-Terms-and-Conditions.pdf |
| FOXX Funded | `foxx-funded` | `terms-archive/foxx-funded/` (10 files) | https://www.foxx-funded.com/terms-and-conditions/ |
| Klein Funding Crypto | `klein-funding-crypto` | `terms-archive/klein-funding-crypto/` (2 files, PDF: upload-be1f023447.txt) | upload:b8696f3e-KLEIN.pdf |
| DirectFundedTrader | `directfundedtrader` | `terms-archive/directfundedtrader/` (6 files) | https://directfundedtrader.com/termsandservices |
| SFX Funded | `sfx-funded` | `terms-archive/sfx-funded/` (7 files) | https://sfxfunded.com/docs/terms-of-service |
| ExFunded | `exfunded` | `terms-archive/exfunded/` (4 files) | https://exfunded.sandai-investment.com/terms-condition/ |
| My Forex Funds | `myforexfunds` | `terms-archive/myforexfunds/` (2 files) | https://myforexfunds.com/terms-of-use/ |

## 5. Claude's list (40 firms) — for information

| Firm | Slug | Archive | Main terms URL |
|---|---|---|---|
| Apex Trader Funding | `apex-trader-funding` | `terms-archive/apex-trader-funding/` (0 files) |  |
| Top One Futures | `top-one-futures` | `terms-archive/top-one-futures/` (11 files) | https://www.toponefutures.com/terms-and-conditions |
| WSFunded | `wsfunded` | `terms-archive/wsfunded/` (8 files) | https://wsfunded.com/en/terms-conditions |
| TX3 Funding | `tx3-funding` | `terms-archive/tx3-funding/` (9 files) | https://www.tx3funding.com/en/terms-and-conditions |
| KortanaFX | `kortanafx` | `terms-archive/kortanafx/` (2 files) | https://kortanafx.com/terms.html |
| OneUp Trader | `oneup-trader` | `terms-archive/oneup-trader/` (8 files) | https://www.oneuptrader.com/terms-conditions/ |
| RebelsFunding | `rebelsfunding` | `terms-archive/rebelsfunding/` (7 files) | https://www.rebelsfunding.com/terms-and-conditions/ |
| Equity Edge | `equity-edge` | `terms-archive/equity-edge/` (7 files) | https://equityedge.io/terms-and-conditions |
| Orion Funded | `orion-funded` | `terms-archive/orion-funded/` (2 files) | https://www.orionfunded.com/docs/terms-and-conditions.pdf |
| Atlas Funded | `atlas-funded` | `terms-archive/atlas-funded/` (12 files, PDF: upload-fbb07b47ba.txt) | upload:25b01f8b-ATLAS_FUNDED.pdf |
| Fintokei | `fintokei` | `terms-archive/fintokei/` (12 files, PDF: upload-d1d83d48f0.txt) | https://www.fintokei.com/wp-content/uploads/2026/06/05_2026_Privacy-Policy_EN_V5.pdf |
| Sure Leverage | `sure-leverage` | `terms-archive/sure-leverage/` (9 files, PDF: upload-52e883efed.txt) | upload:de83bc49-Terms-Conditions.pdf |
| TenTrade | `tentrade` | `terms-archive/tentrade/` (8 files) | https://tentrade.com/wp-content/uploads/2026/06/funded-trader-2026.pdf |
| WeGetFunded | `wegetfunded` | `terms-archive/wegetfunded/` (6 files) | https://wegetfunded.com/en/legal/terms |
| Trade The Pool | `trade-the-pool` | `terms-archive/trade-the-pool/` (6 files) | https://tradethepool.com/terms-and-conditions/ |
| BluSky Trading | `blusky-trading` | `terms-archive/blusky-trading/` (10 files) | https://blusky.pro/terms-and-conditions/ |
| Prop Number One | `prop-number-one` | `terms-archive/prop-number-one/` (3 files) | https://propnumberone.com/terms-and-conditions/ |
| RZR Funded | `hantec-trader` | `terms-archive/hantec-trader/` (7 files) | https://rzrfunded.com/terms-conditions/ |
| SabioTrade | `sabiotrade` | `terms-archive/sabiotrade/` (2 files, PDF: upload-6133f80cd7.txt) | https://sabiotrade.us/terms |
| Lux Trading Firm | `lux-trading-firm` | `terms-archive/lux-trading-firm/` (7 files) | https://luxtradingfirm.com/terms-and-conditions/ |
| Sway Funded | `sway-funded` | `terms-archive/sway-funded/` (8 files) | https://my.swayfunded.com/p/terms |
| Leeloo Trading | `leeloo-trading` | `terms-archive/leeloo-trading/` (5 files) | https://www.leelootrading.com/terms-of-service |
| ThinkCapital | `thinkcapital` | `terms-archive/thinkcapital/` (10 files) | https://www.thinkcapital.com/tc-faqs/general-faqs/guidelines-regarding-trading-strategies-contrary-to-thinkcapitals-terms-of-use-policy/#overview |
| X Funded | `x-funded` | `terms-archive/x-funded/` (8 files, PDF: upload-a00b89d6e7.txt) | upload:9db75df1-xfunded.pdf |
| Lark Funding | `lark-funding` | `terms-archive/lark-funding/` (4 files) | https://larkfunding.com/terms-of-use |
| DayTraders.com | `daytraders-com` | `terms-archive/daytraders-com/` (11 files) | https://daytraders.com/help/articles/17704078-terms-of-use |
| FX2 Funding | `fx2-funding` | `terms-archive/fx2-funding/` (6 files, PDF: upload-4c36f17229.txt) | https://fx2funding.com/terms-and-conditions/ |
| CK Capital | `ck-capital` | `terms-archive/ck-capital/` (8 files) | https://ckpropfirm.com/en/terms-conditions |
| Atmos Funded | `atmos-funded` | `terms-archive/atmos-funded/` (12 files, PDF: upload-77387e989c.txt) | https://atmosfunded.com/wp-content/uploads/2025/08/AtmosFunded-Ltd-Customer-Agreement-and-Risk-Management-Policy-v2.pdf |
| Willis Capital | `willis-capital` | `terms-archive/willis-capital/` (5 files) | https://www.wfunded.io/en/terms-and-conditions |
| Moneta Funded | `moneta-funded` | `terms-archive/moneta-funded/` (3 files, PDF: upload-571b770fb1.txt) | upload:11a8a29e-MONETA_FUNDED_LTD_Terms_And_Conditions_September_2026.pdf |
| Forex Funds Flow | `forex-funds-flow` | `terms-archive/forex-funds-flow/` (5 files) | https://www.forexfundsflow.com/terms-conditions |
| Audacity Capital | `audacity-capital` | `terms-archive/audacity-capital/` (8 files) | https://audacity.capital/terms-and-conditions/ |
| Axi Select | `axi-select` | `terms-archive/axi-select/` (7 files) | https://www.axi.com/int/legal-documentation |
| For Traders | `for-traders` | `terms-archive/for-traders/` (9 files) | https://fortraders.com/terms-and-conditions |
| FunderPro | `funderpro` | `terms-archive/funderpro/` (10 files) | https://funderpro.com/instant-account-terms-and-conditions/ |
| Finotive Funding | `finotive-funding` | `terms-archive/finotive-funding/` (4 files) | https://finotivefunding.com/terms-and-conditions |
| The Trading Pit | `the-trading-pit` | `terms-archive/the-trading-pit/` (5 files) | https://www.thetradingpit.com/general-terms-and-conditions |
| Top One Trader | `top-one-trader` | `terms-archive/top-one-trader/` (11 files) | https://www.toponetrader.com/terms-and-conditions |
| Get Leveraged | `get-leveraged` | `terms-archive/get-leveraged/` (10 files) | https://getleveraged.com/terms/ |

## 6. Not readable yet
Sites that block automated reading or publish no terms (≈ 50 firms, e.g. TickTickTrader, Nova Funding, Hola Prime, E8 Markets, Upcomers, FTUK, Breakout full agreements) stay capped at 60 until Geyer saves their terms. Firms with dated payout incidents in their files will not rise before the history criterion is coded, whatever the reading.
