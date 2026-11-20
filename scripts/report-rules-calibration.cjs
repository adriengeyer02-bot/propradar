/* eslint-disable no-console */
/**
 * Read-only triage for a potentially over-severe combination of classifications.
 * This is NOT an automated finding of error, nor an instruction to rescore.
 * Every case must be checked against its original official contract and FAQ.
 *
 * Usage: node scripts/report-rules-calibration.cjs
 */
const updates = require('../app/data/firm-updates.json').firms;

const candidates = Object.entries(updates).flatMap(([slug, firm]) => {
  const rules = firm.restrictiveRules ?? [];
  const high = rules.filter((rule) =>
    rule.severity === 'blocking' && rule.clarity === 'buried'
  );
  if (!high.length) return [];
  const genericSanctionMentions = rules.filter((rule) =>
    /(?:general|generic|any|all|every)\s+(?:rule\s+)?(?:violation|breach)|(?:sanctions?|enforcement)\s+(?:apply|clause|power)|(?:may|can)\s+(?:suspend|terminate|reject|cancel)\s+(?:the |your |any )?(?:account|reward|payout|profit)/i.test(
      `${rule.rule ?? ''} ${rule.impact ?? ''}`
    )
  ).length;
  return [{ slug, total: rules.length, buriedBlocking: high.length, genericSanctionMentions }];
});

candidates.sort((a, b) => b.buriedBlocking - a.buriedBlocking || a.slug.localeCompare(b.slug));
console.log(`${candidates.length} firm(s) contain at least one blocking + buried rule.`);
console.log('This is a triage signal only; it does not establish incorrect classification.');
console.log('Firm | blocking + buried | all rules | generic enforcement wording (heuristic)');
for (const item of candidates) {
  console.log(`${item.slug} | ${item.buriedBlocking} | ${item.total} | ${item.genericSanctionMentions}`);
}
