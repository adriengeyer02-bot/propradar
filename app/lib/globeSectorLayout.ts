import type { RadarSector } from './radar';

export type GlobeSectorSlice = { key: string; count: number; start: number; end: number; shade: number };

// A small sector must still fit a curved label, but 34° gave two stock firms
// almost as much globe space as entire markets with dozens of firms.
const MIN_SLICE_DEGREES = 20;
// Close to proportional by firm count, slightly softened for smaller markets.
const DENSITY_EXPONENT = 0.9;

/** Allocate the globe's 360° to markets according to their live firm counts. */
export function layoutGlobeSectors(sectors: readonly RadarSector[]): GlobeSectorSlice[] {
  const live = sectors.filter((sector) => sector.count > 0)
    .map((sector) => ({ ...sector, weight: Math.pow(sector.count, DENSITY_EXPONENT) }));
  if (live.length === 0) return [];

  // Keep the layout valid if the catalogue ever introduces many new markets.
  const minimum = Math.min(MIN_SLICE_DEGREES, 360 / live.length);
  const widths = Array<number>(live.length).fill(0);
  const fixed = new Set<number>();
  for (let round = 0; round < live.length; round++) {
    const available = 360 - fixed.size * minimum;
    const freeWeight = live.reduce((total, sector, index) => total + (fixed.has(index) ? 0 : sector.weight), 0);
    if (freeWeight === 0) break;

    let newMinimum = false;
    live.forEach((sector, index) => {
      if (fixed.has(index)) return;
      widths[index] = (sector.weight / freeWeight) * available;
      if (widths[index] < minimum) {
        fixed.add(index);
        newMinimum = true;
      }
    });
    fixed.forEach((index) => { widths[index] = minimum; });
    if (!newMinimum) break;
  }

  let longitude = -widths[0] / 2; // Forex/CFD stays centred on the front.
  return live.map((sector, index) => {
    const slice = { key: sector.key, count: sector.count, start: longitude, end: longitude + widths[index], shade: index % 2 };
    longitude = slice.end;
    return slice;
  });
}
