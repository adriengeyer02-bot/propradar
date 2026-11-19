/* Audit-friendly checks for manually sourced account-size price schedules. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const { version, firms } = require('../app/data/price-tables.json');
const updates = require('../app/data/firm-updates.json').firms;
const staticFirms = {
  'bullwaves-prime': 'bullwavesPrime.ts',
  miltraders: 'milTraders.ts',
  'x-funded': 'xFunded.ts',
  'foxx-funded': 'foxxFunded.ts',
};

assert.equal(version, 1);
let programCount = 0;
let rowCount = 0;
for (const [slug, table] of Object.entries(firms)) {
  assert.match(table.checkedOn, /^\d{4}-\d{2}-\d{2}$/, `${slug}: checkedOn must be YYYY-MM-DD`);
  assert.equal(Number.isNaN(Date.parse(table.checkedOn)), false, `${slug}: invalid date`);
  assert.ok(Array.isArray(table.programs) && table.programs.length, `${slug}: empty price table`);
  const names = new Set();
  const availableIds = new Set((updates[slug]?.setProducts ?? []).map((p) => p.id));
  const staticText = staticFirms[slug] ? fs.readFileSync(path.join(root, 'app/lib', staticFirms[slug]), 'utf8') : '';

  for (const program of table.programs) {
    const label = `${slug} / ${program.name}`;
    assert.ok(program.name && !names.has(program.name), `${label}: empty or duplicate program name`);
    names.add(program.name);
    assert.ok(['monthly', 'one-time'].includes(program.billing), `${label}: unknown billing type`);
    assert.ok(['USD', 'EUR', 'GBP'].includes(program.currency), `${label}: unknown currency`);
    assert.equal(new URL(program.sourceUrl).protocol, 'https:', `${label}: official HTTPS source required`);
    if (program.productId) {
      assert.ok(availableIds.has(program.productId) || staticText.includes(`'${program.productId}'`) || staticText.includes(`"${program.productId}"`), `${label}: unknown productId ${program.productId}`);
    }
    assert.ok(Array.isArray(program.rows) && program.rows.length, `${label}: empty row list`);
    let lastSize = 0;
    for (const row of program.rows) {
      assert.ok(Number.isSafeInteger(row.size) && row.size > lastSize, `${label}: sizes must be sorted and unique`);
      assert.ok(Number.isFinite(row.price) && row.price > 0, `${label}: invalid list price`);
      if (row.upfrontPrice !== undefined || row.completionFee !== undefined) {
        assert.ok(Number.isFinite(row.upfrontPrice) && row.upfrontPrice > 0, `${label}: invalid initial payment`);
        assert.ok(Number.isFinite(row.completionFee) && row.completionFee > 0, `${label}: invalid conditional payment`);
        assert.equal(Math.round((row.upfrontPrice + row.completionFee) * 100), Math.round(row.price * 100), `${label}: total must equal initial + conditional fee`);
      }
      lastSize = row.size;
      rowCount++;
    }
    programCount++;
  }
}

console.log(`Price tables OK: ${Object.keys(firms).length} firms, ${programCount} schedules, ${rowCount} verified-size rows.`);
