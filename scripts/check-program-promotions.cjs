const assert = require('node:assert/strict');
const updates = require('../app/data/firm-updates.json').firms;
const priceTables = require('../app/data/price-tables.json').firms;
const { version, promotions } = require('../app/data/program-promotions.json');

assert.equal(version, 1);
const ids = new Set();
for (const promo of promotions) {
  const label = `${promo.slug} / ${promo.id}`;
  assert.ok(promo.id && !ids.has(promo.id), `${label}: duplicate id`);
  ids.add(promo.id);
  assert.ok(typeof promo.offer === 'string' && promo.offer.length >= 3, `${label}: missing offer`);
  assert.ok(typeof promo.terms === 'string' && promo.terms.length >= 40, `${label}: missing limits`);
  assert.equal(new URL(promo.sourceUrl).protocol, 'https:', `${label}: HTTPS primary source required`);
  assert.match(promo.checkedOn, /^\d{4}-\d{2}-\d{2}$/, `${label}: invalid checkedOn`);
  const checked = Date.parse(`${promo.checkedOn}T00:00:00Z`);
  assert.ok(Number.isFinite(checked), `${label}: invalid review date`);
  const firmProducts = new Set((updates[promo.slug]?.setProducts ?? []).map((p) => p.id));
  assert.ok(Array.isArray(promo.productIds) && promo.productIds.length, `${label}: missing exact products`);
  for (const productId of promo.productIds) assert.ok(firmProducts.has(productId), `${label}: unknown product id ${productId}`);
  if (promo.highlightedSizes) {
    assert.ok(Array.isArray(promo.highlightedSizes) && promo.highlightedSizes.length, `${label}: invalid highlighted account sizes`);
    for (const productId of promo.productIds) {
      const program = (priceTables[promo.slug]?.programs ?? []).find((row) => row.productId === productId);
      assert.ok(program, `${label}: no price table for ${productId}`);
      for (const size of promo.highlightedSizes) {
        assert.ok(Number.isInteger(size) && program.rows.some((row) => row.size === size), `${label}: price size ${size} not sourced for ${productId}`);
      }
    }
  }
  if (promo.code) assert.match(promo.code, /^[A-Za-z0-9_-]+$/, `${label}: suspicious promo code`);
  if (promo.expiresAt) {
    assert.ok(Number.isFinite(Date.parse(promo.expiresAt)), `${label}: invalid expiry instant`);
    assert.ok(Date.parse(promo.expiresAt) > checked, `${label}: expired before verification`);
    assert.match(promo.endsOn ?? '', /^\d{4}-\d{2}-\d{2}$/, `${label}: missing public end date`);
    const ends = Date.parse(`${promo.endsOn}T00:00:00Z`);
    assert.ok(Math.abs(Date.parse(promo.expiresAt) - ends) <= 2 * 86400000, `${label}: end date and expiry disagree`);
  }
}
console.log(`Program promos OK: ${promotions.length} sourced offers, ${ids.size} unique IDs, all products matched.`);
