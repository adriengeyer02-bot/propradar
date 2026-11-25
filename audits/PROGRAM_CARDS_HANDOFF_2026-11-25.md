# Programme cards — handoff to Claude (25 November 2026)
Branch: `editorial/program-cards-20261125`, based on stable production `43cb7271a6fa78993ab32523db03b8270e280f9f`. Do not merge this old base blindly; integrate only the card changes into current shared work after checking the production state. Do not change the public firm scores or approve a programme scoring formula.
 
## Work split
ChatGPT owns card layout, rule scope display, dates and editorial guides. Claude owns source research, exhaustive product coverage and the structured audit facts. Continue the existing audit register and do not replace audit evidence with unsupported assumptions.
 
## Data contract
- `app/data/program-evidence.json`: key by exact firm slug and product.id. Add rulesCheckedOn only for an actual documented programme-level check; label is partial, not a full contract audit. Add effectiveFrom only with documentary evidence of the applicable rule/cohort; cohort describes the scope, not the entire programme's launch date. sources contains original official URLs. Do not set date from firm.lastReviewed or today's date merely because a fiche changed.
- Price dates use the existing matching price table checkedOn and exact productId; list price and promotions remain distinct. Missing price source must be shown as undocumented, not inferred from similarly named offers.
- `restrictiveRules.appliesTo`: exact auditedProgramme keys/product IDs. '*' only for explicitly documented general clauses. No missing appliesTo inferred as all programmes. Map auditedProgramme names only if exact normalized name matches the actual product. Keep unclassified rules accessible through the full rules register.
- Maintain existing product IDs, price tiers, currencies, partner links, promotions and status. Add all products and cohorts to the product inventory, distinguish assessment, funded and live, and reconcile discrepancies.
- Programme score is deliberately pending, not a zero and not the parent firm's score. No numeric programme score until owner approves methodology. No changes to scoring inputs or engine.
 
## Review and integration
The programme cards change four code/data files only (firm page, new CSS, programCardData.ts, program-evidence.json), plus this document. Initial evidence seed covers eleven exact product IDs from earlier targeted audit research; additional programme dates must be populated. All fifteen interface locales have new label strings; cohort/source text may still be English. Test layout on mobile and desktop, Arabic RTL, long translated labels, missing prices, closed firms and multiple price tiers. Compare public score/promotion snapshots before/after. No production promotion without reconciliation with Claude's concurrent changes.
