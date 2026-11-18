import assert from 'node:assert/strict';
import { propFirms } from '../app/lib/propFirms';
import { buildRadar } from '../app/lib/radar';
import { withOptionsGlobe } from '../app/lib/optionsGlobe';
import { layoutGlobeSectors } from '../app/lib/globeSectorLayout';

const data = withOptionsGlobe(buildRadar(propFirms));
const slices = layoutGlobeSectors(data.sectors);
const span = (key: string) => {
  const sector = slices.find((item) => item.key === key);
  assert.ok(sector, `Missing ${key} sector`);
  return sector.end - sector.start;
};

assert.equal(slices.length, data.sectors.filter((sector) => sector.count > 0).length);
assert.ok(Math.abs(slices.reduce((sum, slice) => sum + slice.end - slice.start, 0) - 360) < 1e-8);
assert.ok(slices.every((slice) => slice.end > slice.start && slice.end - slice.start >= 20 - 1e-8));
assert.ok(slices.every((slice, index) => index === 0 || Math.abs(slice.start - slices[index - 1].end) < 1e-8));

const forex = span('Forex & CFD');
const stocks = span('Stocks');
const futures = span('Futures');
assert.ok(forex > 220, `Forex/CFD should have room for its firms, got ${forex.toFixed(1)}°`);
assert.ok(stocks <= 22, `Stock sector should no longer be oversized, got ${stocks.toFixed(1)}°`);
assert.ok(futures > stocks, 'The futures sector should be wider than the stock sector');
assert.equal(slices.find((slice) => slice.key === 'Options')?.count, 5);

console.log(slices.map((slice) => `${slice.key}: ${slice.count} firms, ${(slice.end - slice.start).toFixed(1)}°`).join('\n'));
