import assert from 'node:assert/strict';
import batch2 from '../app/data/scoring-v4-batch-2.json' with { type: 'json' };
import batch3 from '../app/data/scoring-v4-batch-3.json' with { type: 'json' };
import batch5 from '../app/data/scoring-v4-batch-5.json' with { type: 'json' };
import batch6 from '../app/data/scoring-v4-batch-6.json' with { type: 'json' };
import batch7 from '../app/data/scoring-v4-batch-7.json' with { type: 'json' };
import batch8 from '../app/data/scoring-v4-batch-8.json' with { type: 'json' };
import batch9 from '../app/data/scoring-v4-batch-9.json' with { type: 'json' };
import c01 from '../app/data/scoring-v5-proposals-c01.json' with { type: 'json' };
import n01 from '../app/data/scoring-v5-proposals-n01.json' with { type: 'json' };
import approvals from '../app/data/scoring-v5-published.json' with { type: 'json' };

// The 17 C03 cases from unmerged historical PR #207 (not copied into main).
const c03 = [
  'the-concept-trading', 'goat-funded-trader', 'rebelsfunding', 'lux-trading-firm',
  'ic-funded', 'fxrk', 'tentrade', 'apex-trader-funding', 'forex-funds-flow',
  'bespoke-funding-program', 'sway-funded', 'nova-funding', 'nations-trading',
  'the-forex-funder', 'leveled-up-society', 'aurafunded', 'alphaproptraders',
];
const c01Roster = batch2.firms.filter((item) => item.confidence === 'limitee').map((item) => item.slug);
const c02Roster = batch3.firms.filter((item) => item.scores === null).map((item) => item.slug);
const c04Roster = [...batch5.firms, ...batch6.firms].filter((item) => item.scores === null).map((item) => item.slug);
const claudeRoster = [...batch7.firms, ...batch8.firms, ...batch9.firms].map((item) => item.slug);
const chatgptRoster = [...c01Roster, ...c02Roster, ...c03, ...c04Roster];
assert.deepEqual([c01Roster.length, c02Roster.length, c03.length, c04Roster.length], [10, 4, 17, 35]);
assert.deepEqual([batch7.firms.length, batch8.firms.length, batch9.firms.length], [20, 20, 16]);
assert.equal(chatgptRoster.length, 66);
assert.equal(claudeRoster.length, 56);
const roster = [...chatgptRoster, ...claudeRoster];
assert.equal(new Set(roster).size, 122, 'A firm must belong to one audit slot only');
const audited = [...c01.firms, ...n01.firms].map((item) => item.slug);
assert.equal(new Set(audited).size, audited.length);
assert.ok(audited.every((slug) => roster.includes(slug)), 'V5 audited firm absent from assigned roster');
const approved = approvals.approvals.map((item) => item.slug);
assert.equal(new Set(approved).size, approved.length);
assert.ok(approved.every((slug) => audited.includes(slug)), 'Approval without a complete audit');

console.log(`V5 backlog: ${roster.length} = ${chatgptRoster.length} C01–C04 + ${claudeRoster.length} N01–N03`);
console.log(`V5 fully scored: ${audited.length} | approved for publication: ${approved.length} | waiting for audit: ${roster.length - audited.length}`);
console.log(`Claude N01–N03 reprise: ${n01.firms.length}/56 | ChatGPT C01–C04: ${c01.firms.length}/66`);
