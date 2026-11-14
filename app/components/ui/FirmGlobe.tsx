'use client';

import { useEffect, useRef, useState } from 'react';
import type { RadarDot, RadarSector } from '../../lib/radar';

/**
 * The PropRadar globe: the same firms as the radar, wrapped on a sphere.
 * - Latitude = PropRadar score. The north cap is the 75+ band, the temperate
 *   belt 50–74, the south under 50 (the bands the radar uses), each tinted.
 * - Longitude = market. Each market is a slice from pole to pole, walled by a
 *   lit meridian and named along a curved band; slices alternate light and
 *   shade (no extra colours: colour stays reserved for the score bands).
 *   A small market keeps a readable minimum width.
 * - The axis runs through the poles: north = score 100, south = 0.
 * - Each firm is its logo; a dashed ring = Trustpilot rating withheld; a
 *   pulsing ring = updated since the visitor's last visit.
 * Drawn on a canvas: drag (or arrow keys) to turn it, click a logo to select.
 * Turns slowly on its own unless the visitor prefers reduced motion.
 */

type Props = {
  dots: RadarDot[];
  sectors: RadarSector[];
  sectorName: (key: string) => string;
  selected: string | null;
  dimmed: Set<string>;
  /** Firms to pulse: updated since the visitor's last visit. */
  highlight: Set<string>;
  onSelect: (slug: string) => void;
  ariaLabel: string;
  hint: string;
  scoreLabel: string;
  zoomLabels: { group: string; in: string; out: string; reset: string };
};

type Vec = { x: number; y: number; z: number };
type Palette = { good: string; watch: string; none: string; accent: string; text: string; surface: string; line: string; font: string; dark: boolean };
type Rgb = [number, number, number];

const DEG = Math.PI / 180;
const NORTH_BAND = 45; // score 75
const MID_BAND = 9; // score 50
const SPIN = 0.09; // rad/s when idle
const SHADE_RES = 176;
const MIN_SLICE = 34; // degrees: the smallest market stays readable
const LABEL_LAT = -50; // the curved market names run along this parallel, kept clear of logos
const LOW_LAT = -36; // the lowest firm sits here, leaving the label parallel free
const MAX_ZOOM = 3.2;
// Sphere radius and axis length (fractions of the canvas): fully zoomed out, the
// 100 and 0 tags at the axis tips stay inside the canvas.
const GLOBE_R = 0.39;
const AXIS_TIP = 1.13;
// Dark-theme sphere colours (the hero globe look): navy sea, lit navy, cyan rim.
const NAVY: Rgb = [12, 24, 38];
const NAVY_LIGHT: Rgb = [30, 56, 86];
const RIM_CYAN: Rgb = [54, 214, 231];
const BAND_TINT_DARK = 0.09;
const MIN_GAP = 5.4; // degrees between two logo centres after decluttering

type Slice = { key: string; count: number; start: number; end: number; shade: number };

/**
 * Market slices on the globe: width grows with the square root of the number
 * of firms (so small markets stay readable without hiding which is largest),
 * with a floor. The count is always printed next to the market name.
 */
function layoutSlices(sectors: RadarSector[]): Slice[] {
  const live = sectors.filter((s) => s.count > 0).map((s) => ({ ...s, weight: Math.sqrt(s.count) }));
  const total = live.reduce((sum, s) => sum + s.weight, 0) || 1;
  const widths = live.map((s) => (s.weight / total) * 360);
  const fixed = new Set<number>();
  for (let round = 0; round < live.length; round++) {
    let changed = false;
    const free = 360 - fixed.size * MIN_SLICE;
    const freeCount = live.reduce((sum, s, i) => (fixed.has(i) ? sum : sum + s.weight), 0) || 1;
    live.forEach((s, i) => {
      if (fixed.has(i)) return;
      widths[i] = (s.weight / freeCount) * free;
      if (widths[i] < MIN_SLICE) {
        fixed.add(i);
        changed = true;
      }
    });
    fixed.forEach((i) => { widths[i] = MIN_SLICE; });
    if (!changed) break;
  }
  let cursor = -widths[0] / 2;
  return live.map((s, i) => {
    const slice = { key: s.key, count: s.count, start: cursor, end: cursor + widths[i], shade: i % 2 ? 1 : 0 };
    cursor += widths[i];
    return slice;
  });
}

/** Slice index for a longitude in degrees. */
function sliceAt(slices: Slice[], lon: number) {
  const rel = (((lon - slices[0].start) % 360) + 360) % 360;
  let acc = 0;
  for (let i = 0; i < slices.length; i++) {
    acc += slices[i].end - slices[i].start;
    if (rel < acc) return i;
  }
  return slices.length - 1;
}

/**
 * Score -> latitude in degrees, monotonic: 100 -> 81°, 75 -> 45°, 50 -> 9°.
 * Under 50 the scale is compressed so the lowest score (20) sits at LOW_LAT
 * and the parallel that carries the market names stays free.
 */
export function scoreLatitude(score: number) {
  if (score >= 50) return Math.min(84, MID_BAND + (score - 50) * 1.44);
  return Math.max(LOW_LAT - 2, MID_BAND - ((50 - score) / 30) * (MID_BAND - LOW_LAT));
}

/**
 * Spread logos so they do not sit on top of each other: a few rounds of
 * repulsion between neighbours. Longitude moves freely inside the firm's
 * market slice; latitude moves at most 6° and never leaves its score band.
 */
function declutter(items: { lat: number; lon: number; min: number; max: number; lo: number; hi: number }[]) {
  for (let round = 0; round < 140; round++) {
    let moved = false;
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        const cos = Math.cos(((a.lat + b.lat) / 2) * DEG);
        const dx = (b.lon - a.lon) * cos;
        const dy = b.lat - a.lat;
        const d = Math.hypot(dx, dy);
        if (d >= MIN_GAP) continue;
        moved = true;
        const push = (MIN_GAP - d) / 2 + 0.01;
        const ux = d > 1e-6 ? dx / d : (i % 2 ? 1 : -1);
        const uy = d > 1e-6 ? dy / d : 0;
        a.lon -= (ux * push) / Math.max(0.2, cos);
        b.lon += (ux * push) / Math.max(0.2, cos);
        a.lat -= uy * push * 0.5;
        b.lat += uy * push * 0.5;
      }
    }
    for (const it of items) {
      it.lon = Math.max(it.min, Math.min(it.max, it.lon));
      it.lat = Math.max(it.lo, Math.min(it.hi, it.lat));
    }
    if (!moved) break;
  }
}

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

function toWorld(latDeg: number, lonDeg: number): Vec {
  const lat = latDeg * DEG;
  const lon = lonDeg * DEG;
  return { x: Math.cos(lat) * Math.sin(lon), y: Math.sin(lat), z: Math.cos(lat) * Math.cos(lon) };
}

function rotate(p: Vec, yaw: number, pitch: number): Vec {
  const x1 = p.x * Math.cos(yaw) + p.z * Math.sin(yaw);
  const z1 = -p.x * Math.sin(yaw) + p.z * Math.cos(yaw);
  const y2 = p.y * Math.cos(pitch) - z1 * Math.sin(pitch);
  const z2 = p.y * Math.sin(pitch) + z1 * Math.cos(pitch);
  return { x: x1, y: y2, z: z2 };
}

function unrotate(p: Vec, yaw: number, pitch: number): Vec {
  const y1 = p.y * Math.cos(-pitch) - p.z * Math.sin(-pitch);
  const z1 = p.y * Math.sin(-pitch) + p.z * Math.cos(-pitch);
  return { x: p.x * Math.cos(-yaw) + z1 * Math.sin(-yaw), y: y1, z: -p.x * Math.sin(-yaw) + z1 * Math.cos(-yaw) };
}

function readPalette(node: Element): Palette {
  const css = getComputedStyle(node);
  const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    good: v('--tone-good', '#0f9d63'),
    watch: v('--tone-watch', '#c27c0e'),
    none: v('--muted', '#64748b'),
    accent: v('--accent', '#0b7285'),
    text: v('--text', '#111827'),
    surface: v('--surface', '#ffffff'),
    line: v('--line', '#d5dde7'),
    font: css.fontFamily || 'system-ui, sans-serif',
    dark: document.documentElement.dataset.theme === 'dark',
  };
}

/** Any CSS colour -> rgb triple, using the canvas parser. */
function rgbOf(ctx: CanvasRenderingContext2D, color: string): Rgb {
  ctx.fillStyle = '#000';
  ctx.fillStyle = color;
  const value = ctx.fillStyle as string;
  if (value.startsWith('#')) {
    const n = parseInt(value.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = value.match(/[\d.]+/g) ?? ['0', '0', '0'];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}

function initials(name: string) {
  return name.split(/[\s/]+/).filter(Boolean).slice(0, 2).map((word) => word[0]?.toUpperCase() ?? '').join('');
}

export default function FirmGlobe({ dots, sectors, sectorName, selected, dimmed, highlight, onSelect, ariaLabel, hint, scoreLabel, zoomLabels }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ dot: RadarDot; x: number; y: number } | null>(null);

  // Mutable view state shared by the render loop and the handlers.
  const view = useRef({ yaw: -0.4, pitch: 0.24, zoom: 1, zoomTarget: 1, vyaw: 0, vpitch: 0, target: null as null | { yaw: number; pitch: number }, dragging: false, hovering: false });
  const [zoomLevel, setZoomLevel] = useState(1);
  const props = useRef({ selected, dimmed, highlight, onSelect });
  props.current = { selected, dimmed, highlight, onSelect };
  const requestDraw = useRef<() => void>(() => undefined);
  const zoomBy = useRef<(factor: number, instant?: boolean) => void>(() => undefined);

  // Market slices and firm positions. A firm keeps its relative place inside
  // its market (as on the radar), stretched to the globe's slice.
  const slices = useRef<Slice[]>([]);
  slices.current = layoutSlices(sectors);
  const points = useRef<{ dot: RadarDot; world: Vec }[]>([]);
  const placedFor = useRef<RadarDot[] | null>(null);
  if (placedFor.current !== dots) {
    placedFor.current = dots;
    const items = dots.map((dot) => {
      const lat = scoreLatitude(dot.score) + (hash(`${dot.slug}:lat`) - 0.5) * 1.6;
      const sector = sectors.find((s) => s.key === dot.sector);
      const slice = slices.current.find((s) => s.key === dot.sector);
      let lon = dot.angle;
      let min = -1e9;
      let max = 1e9;
      if (sector && slice) {
        const span = Math.max(1, sector.end - sector.start);
        const t = Math.max(0, Math.min(1, ((((dot.angle - sector.start) % 360) + 360) % 360) / span));
        lon = slice.start + (0.05 + 0.9 * t) * (slice.end - slice.start);
        min = slice.start + 2.2;
        max = slice.end - 2.2;
      }
      // Stay inside the score band (50 -> 9°, 75 -> 45°) and within 6° of the score.
      const bandLo = dot.score >= 75 ? 45.6 : dot.score >= 50 ? 9.6 : -90;
      const bandHi = dot.score >= 75 ? 86 : dot.score >= 50 ? 44.4 : 8.4;
      return { dot, lat, lon, min, max, lo: Math.max(bandLo, lat - 6), hi: Math.min(bandHi, lat + 6) };
    });
    declutter(items);
    points.current = items.map((it) => ({ dot: it.dot, world: toWorld(it.lat, it.lon) }));
  }

  // Turn the globe to face the selected firm.
  useEffect(() => {
    if (!selected) {
      // Back to the idle spin.
      requestDraw.current();
      return;
    }
    const point = points.current.find((p) => p.dot.slug === selected);
    if (!point) return;
    const lon = Math.atan2(point.world.x, point.world.z);
    const lat = Math.asin(point.world.y);
    const v = view.current;
    // Shortest way round for the yaw.
    let yaw = -lon;
    while (yaw - v.yaw > Math.PI) yaw -= 2 * Math.PI;
    while (yaw - v.yaw < -Math.PI) yaw += 2 * Math.PI;
    v.target = { yaw, pitch: Math.max(-1.1, Math.min(1.1, lat)) };
    v.vyaw = 0;
    v.vpitch = 0;
    requestDraw.current();
  }, [selected]);

  useEffect(() => {
    requestDraw.current();
  }, [dimmed, highlight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Open on the smaller markets, so the market walls and names show at once;
    // the spin then brings the large Forex & CFD slice round.
    const sl0 = slices.current;
    if (sl0.length > 1 && !props.current.selected) {
      const lonFocus = (sl0[1].start + sl0[sl0.length - 1].end) / 2;
      view.current.yaw = -lonFocus * DEG;
    }

    const shade = document.createElement('canvas');
    shade.width = SHADE_RES;
    shade.height = SHADE_RES;
    const shadeCtx = shade.getContext('2d')!;
    const pixels = shadeCtx.createImageData(SHADE_RES, SHADE_RES);

    let palette = readPalette(wrap);
    let rgb = { good: rgbOf(ctx, palette.good), watch: rgbOf(ctx, palette.watch), none: rgbOf(ctx, palette.none), base: rgbOf(ctx, palette.surface) };
    const refreshPalette = () => {
      palette = readPalette(wrap);
      rgb = { good: rgbOf(ctx, palette.good), watch: rgbOf(ctx, palette.watch), none: rgbOf(ctx, palette.none), base: rgbOf(ctx, palette.surface) };
      draw();
    };
    const themeObserver = new MutationObserver(refreshPalette);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Logos, loaded once; a firm without a logo is a small dot (a monogram when selected).
    const images = new Map<string, HTMLImageElement>();
    for (const { dot } of points.current) {
      if (!dot.logo) continue;
      const img = new Image();
      img.decoding = 'async';
      img.src = dot.logo;
      img.onload = () => draw();
      images.set(dot.slug, img);
    }

    // A fixed star field for the dark theme.
    const stars = Array.from({ length: 110 }, (_, i) => ({
      x: hash(`star-x-${i}`),
      y: hash(`star-y-${i}`),
      r: 0.8 + hash(`star-r-${i}`) * 1.1,
      a: 0.2 + hash(`star-a-${i}`) * 0.55,
      p: hash(`star-p-${i}`) * 6.28,
    }));

    let shadeByDeg: number[] = [];
    let shadeFor: Slice[] | null = null;
    const charWidths = new Map<string, number>();

    let size = 0;
    let dpr = 1;
    const resize = () => {
      const width = wrap.clientWidth;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      size = width;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(width * dpr);
      canvas.style.height = `${width}px`;
      draw();
    };

    /** Sphere surface: band tints, soft lighting, a lit rim. Rendered small, scaled up. */
    /** Sphere surface, sampled on a grid over the canvas (stays sharp when zoomed in). */
    function paintSurface(radius: number) {
      const { yaw, pitch } = view.current;
      const data = pixels.data;
      const half = SHADE_RES / 2;
      const scale = (size / 2) / radius;
      const light = { x: -0.45, y: 0.55, z: 0.7 };
      const tint = palette.dark ? 0.42 : 0.3;
      const sl = slices.current;
      // Shade per whole degree of longitude, looked up instead of searched per pixel.
      if (shadeByDeg.length !== 360 || shadeFor !== sl) {
        shadeFor = sl;
        shadeByDeg = Array.from({ length: 360 }, (_, d) => (sl.length && sl[sliceAt(sl, d - 180)].shade ? 1 : 0));
      }
      const darkShade = palette.dark ? 0.86 : 0.93;
      for (let j = 0; j < SHADE_RES; j++) {
        for (let i = 0; i < SHADE_RES; i++) {
          const k = (j * SHADE_RES + i) * 4;
          const x = ((i + 0.5 - half) / half) * scale;
          const y = ((half - j - 0.5) / half) * scale;
          const r2 = x * x + y * y;
          if (r2 > 1) {
            data[k + 3] = 0;
            continue;
          }
          const z = Math.sqrt(1 - r2);
          const w = unrotate({ x, y, z }, yaw, pitch);
          const lat = Math.asin(Math.max(-1, Math.min(1, w.y))) / DEG;
          const band = lat >= NORTH_BAND ? rgb.good : lat >= MID_BAND ? rgb.watch : rgb.none;
          const lambert = Math.max(0, x * light.x + y * light.y + z * light.z);
          // Every other market slice a touch darker, so the slices read without new colours.
          const deg = Math.min(359, Math.max(0, Math.floor(Math.atan2(w.x, w.z) / DEG + 180)));
          const shade = shadeByDeg[deg] ? darkShade : 1;
          const lit = ((palette.dark ? 0.5 : 0.78) + (palette.dark ? 0.55 : 0.3) * lambert) * shade;
          const rim = Math.pow(1 - z, 3) * (palette.dark ? 0.55 : 0.25);
          if (palette.dark) {
            // Deep navy sphere lit from the top left, a faint band tint and a cyan rim glow.
            const glow = Math.pow(lambert, 1.6);
            const deep = 0.6 + 0.4 * shade;
            const rimGlow = Math.pow(1 - z, 3.2) * 0.38;
            for (let c = 0; c < 3; c++) {
              const sea = NAVY[c] + (NAVY_LIGHT[c] - NAVY[c]) * glow;
              const mixed = sea * (1 - BAND_TINT_DARK) + band[c] * BAND_TINT_DARK;
              data[k + c] = Math.min(255, mixed * deep * (0.75 + 0.35 * lambert) + RIM_CYAN[c] * rimGlow);
            }
            data[k + 3] = 255;
            continue;
          }
          for (let c = 0; c < 3; c++) {
            const mixed = rgb.base[c] * (1 - tint) + band[c] * tint;
            data[k + c] = Math.min(255, mixed * lit + band[c] * rim);
          }
          data[k + 3] = 255;
        }
      }
      shadeCtx.putImageData(pixels, 0, 0);
    }

    function project(p: Vec, cx: number, cy: number, radius: number) {
      const r = rotate(p, view.current.yaw, view.current.pitch);
      return { x: cx + r.x * radius, y: cy - r.y * radius, z: r.z };
    }

    /** A parallel or meridian, front half only, as a crisp vector line. */
    function strokeCurve(sample: (t: number) => Vec, steps: number, cx: number, cy: number, radius: number) {
      ctx!.beginPath();
      let pen = false;
      for (let s = 0; s <= steps; s++) {
        const p = project(sample(s / steps), cx, cy, radius);
        if (p.z < 0.02) {
          pen = false;
          continue;
        }
        if (pen) ctx!.lineTo(p.x, p.y);
        else ctx!.moveTo(p.x, p.y);
        pen = true;
      }
      ctx!.stroke();
    }

    let hits: { dot: RadarDot; x: number; y: number; r: number }[] = [];

    function draw() {
      if (!size) return;
      const c = ctx!;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const zoom = view.current.zoom;
      const radius = size * GLOBE_R * zoom;

      const now = performance.now();
      const unit = size / 520;
      const sl = slices.current;
      const axisColor = palette.dark ? 'rgba(234, 240, 247, 0.55)' : 'rgba(15, 23, 42, 0.45)';

      // Night sky behind the globe (dark theme only).
      if (palette.dark) {
        c.fillStyle = '#d6ecff';
        for (const star of stars) {
          c.globalAlpha = star.a * (0.75 + 0.25 * Math.sin(now / 1300 + star.p));
          c.fillRect(star.x * size, star.y * size, star.r, star.r);
        }
        c.globalAlpha = 1;
      }

      // Halo behind the sphere.
      const halo = c.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.3);
      halo.addColorStop(0, palette.dark ? 'rgba(54, 214, 231, 0.30)' : 'rgba(11, 114, 133, 0.14)');
      halo.addColorStop(0.35, palette.dark ? 'rgba(54, 214, 231, 0.14)' : 'rgba(11, 114, 133, 0.06)');
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = halo;
      c.fillRect(0, 0, size, size);

      // Axis through the poles (the part inside or behind the sphere is covered next).
      const tipN = project({ x: 0, y: AXIS_TIP, z: 0 }, cx, cy, radius);
      const tipS = project({ x: 0, y: -AXIS_TIP, z: 0 }, cx, cy, radius);
      c.strokeStyle = axisColor;
      c.lineWidth = 1.4;
      c.beginPath();
      c.moveTo(tipN.x, tipN.y);
      c.lineTo(tipS.x, tipS.y);
      c.stroke();

      paintSurface(radius);
      c.save();
      c.beginPath();
      c.arc(cx, cy, radius, 0, Math.PI * 2);
      c.clip();
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = 'high';
      c.drawImage(shade, 0, 0, size, size);

      // Faint graticule every 15°.
      c.lineWidth = 0.7;
      c.strokeStyle = palette.dark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.06)';
      for (let lat = -75; lat <= 75; lat += 15) strokeCurve((t) => toWorld(lat, t * 360), 96, cx, cy, radius);

      // Market walls: a lit meridian from pole to pole at each slice edge.
      for (const slice of sl) {
        c.lineWidth = 1.3;
        c.strokeStyle = palette.dark ? 'rgba(54, 214, 231, 0.75)' : 'rgba(11, 114, 133, 0.6)';
        strokeCurve((t) => toWorld(-90 + t * 180, slice.start), 72, cx, cy, radius);
      }

      // Score band limits.
      c.lineWidth = 1.5;
      c.setLineDash([4, 4]);
      c.strokeStyle = palette.good;
      strokeCurve((t) => toWorld(NORTH_BAND, t * 360), 120, cx, cy, radius);
      c.strokeStyle = palette.watch;
      strokeCurve((t) => toWorld(MID_BAND, t * 360), 120, cx, cy, radius);
      c.setLineDash([]);
      // Reference parallel for the 25 tag (thin, so the bands keep the colour).
      c.lineWidth = 1;
      c.strokeStyle = palette.dark ? 'rgba(234, 240, 247, 0.28)' : 'rgba(15, 23, 42, 0.22)';
      strokeCurve((t) => toWorld(scoreLatitude(25), t * 360), 120, cx, cy, radius);
      c.restore();

      // Rim.
      c.beginPath();
      c.arc(cx, cy, radius, 0, Math.PI * 2);
      c.lineWidth = 1;
      c.strokeStyle = palette.dark ? 'rgba(54, 214, 231, 0.55)' : 'rgba(11, 114, 133, 0.35)';
      c.stroke();

      // Axis tips outside the sphere, poles and their scores (N = 100, S = 0).
      const visibleAt = (pt: { x: number; y: number; z: number }) => pt.z >= 0 || Math.hypot(pt.x - cx, pt.y - cy) > radius + 0.5;
      for (const [sign, label] of [[1, '100'], [-1, '0']] as const) {
        c.strokeStyle = axisColor;
        c.lineWidth = 1.6;
        let prev: { x: number; y: number; z: number } | null = null;
        for (let k = 0; k <= 16; k++) {
          const pt = project({ x: 0, y: sign * (1 + ((AXIS_TIP - 1) * k) / 16), z: 0 }, cx, cy, radius);
          if (prev && visibleAt(pt) && visibleAt(prev)) {
            c.beginPath();
            c.moveTo(prev.x, prev.y);
            c.lineTo(pt.x, pt.y);
            c.stroke();
          }
          prev = pt;
        }
        const pole = project({ x: 0, y: sign, z: 0 }, cx, cy, radius);
        if (pole.z > 0) {
          c.beginPath();
          c.arc(pole.x, pole.y, 4.5 * unit, 0, Math.PI * 2);
          c.fillStyle = sign > 0 ? palette.good : palette.none;
          c.fill();
          c.lineWidth = 1.5;
          c.strokeStyle = palette.surface;
          c.stroke();
        }
        const tip = sign > 0 ? tipN : tipS;
        if (visibleAt(tip)) pill(label, tip.x, tip.y + (tip.y < cy ? -10 : 10) * unit, sign > 0 ? palette.good : palette.none);
      }

      // Score scale outside the globe, like a ruler: 75, 50 and 25 (with 100 and 0
      // at the axis tips). Each tag sits where its parallel meets the left edge.
      for (const [score, color] of [[75, palette.good], [50, palette.watch], [25, palette.none]] as const) {
        const at = limbPoint(scoreLatitude(score), cx, cy, radius);
        if (!at) continue;
        const dx = at.x - cx;
        const dy = at.y - cy;
        const len = Math.hypot(dx, dy) || 1;
        const ux = dx / len;
        const uy = dy / len;
        c.strokeStyle = color;
        c.lineWidth = 1.4;
        c.beginPath();
        c.moveTo(at.x, at.y);
        c.lineTo(at.x + ux * 9 * unit, at.y + uy * 9 * unit);
        c.stroke();
        pill(String(score), at.x + ux * 26 * unit, at.y + uy * 26 * unit, color);
      }

      // Firms, back to front.
      const { selected: sel, dimmed: dim, highlight: fresh } = props.current;
      const placed = points.current
        .map(({ dot, world }) => ({ dot, p: project(world, cx, cy, radius) }))
        .sort((a, b) => a.p.z - b.p.z);
      hits = [];
      let callout: { dot: RadarDot; x: number; y: number; r: number } | null = null;
      for (const { dot, p } of placed) {
        const isSel = dot.slug === sel;
        const isDim = dim.has(dot.slug) && !isSel;
        const tone = dot.tone === 'good' ? palette.good : dot.tone === 'watch' ? palette.watch : palette.none;
        if (p.z < 0) {
          // Far side: a faint speck, for depth.
          c.globalAlpha = 0.18 * (1 + p.z) * (isDim ? 0.3 : 1);
          c.fillStyle = tone;
          c.beginPath();
          c.arc(p.x, p.y, 1.6 * unit, 0, Math.PI * 2);
          c.fill();
          continue;
        }
        // Firms without a logo are drawn as small plain dots, so the logos lead.
        const plain = !dot.logo && !isSel;
        const r = (isSel ? 15 : 7.5 + 4.5 * p.z) * unit * (dot.size > 5 ? 1.12 : 1) * Math.pow(zoom, 0.55) * (plain ? 0.42 : 1);
        // Updated since the last visit: an expanding ring.
        if (fresh.has(dot.slug) && !isDim) {
          const phase = reduce ? 0.35 : ((now / 1600 + hash(dot.slug)) % 1);
          c.beginPath();
          c.arc(p.x, p.y, r + (3 + phase * 12) * unit, 0, Math.PI * 2);
          c.lineWidth = 2;
          c.strokeStyle = palette.accent;
          c.globalAlpha = (1 - phase) * 0.65 * p.z;
          c.stroke();
        }
        c.globalAlpha = isDim ? 0.16 : 0.55 + 0.45 * p.z;
        if (plain) {
          c.beginPath();
          c.arc(p.x, p.y, r, 0, Math.PI * 2);
          c.fillStyle = tone;
          c.fill();
          if (dot.withheld) {
            c.lineWidth = 1.2;
            c.strokeStyle = palette.surface;
            c.stroke();
          }
          c.globalAlpha = 1;
          if (!isDim && p.z > 0.15) hits.push({ dot, x: p.x, y: p.y, r: Math.max(r, 9) });
          continue;
        }
        // Logo tile.
        c.save();
        c.beginPath();
        c.arc(p.x, p.y, r, 0, Math.PI * 2);
        c.fillStyle = palette.surface;
        c.fill();
        c.clip();
        const img = images.get(dot.slug);
        if (img && img.complete && img.naturalWidth) {
          c.drawImage(img, p.x - r, p.y - r, r * 2, r * 2);
        } else {
          c.fillStyle = tone;
          c.globalAlpha *= 0.85;
          c.fillRect(p.x - r, p.y - r, r * 2, r * 2);
          c.fillStyle = palette.dark ? '#0b111a' : '#ffffff';
          c.font = `750 ${r * 0.85}px ${palette.font}`;
          c.textAlign = 'center';
          c.textBaseline = 'middle';
          c.fillText(initials(dot.name), p.x, p.y + r * 0.04);
          c.textBaseline = 'alphabetic';
        }
        c.restore();
        // Ring: band colour; dashed when the Trustpilot rating is withheld.
        c.beginPath();
        c.arc(p.x, p.y, r, 0, Math.PI * 2);
        c.lineWidth = isSel ? 3 : 1.6;
        c.strokeStyle = isSel ? palette.accent : tone;
        if (dot.withheld) c.setLineDash([2.5, 2.5]);
        c.stroke();
        c.setLineDash([]);
        if (isSel) {
          c.beginPath();
          c.arc(p.x, p.y, r + 6 * unit, 0, Math.PI * 2);
          c.lineWidth = 1.2;
          c.strokeStyle = palette.accent;
          c.globalAlpha = 0.6;
          c.stroke();
          if (p.z > 0.2) callout = { dot, x: p.x, y: p.y, r };
        }
        c.globalAlpha = 1;
        if (!isDim && p.z > 0.15) hits.push({ dot, x: p.x, y: p.y, r: Math.max(r, 9) });
      }
      c.globalAlpha = 1;

      // Market names, curved along a parallel in the middle of each slice.
      for (const slice of sl) {
        curvedText(`${sectorName(slice.key)} · ${slice.count}`, LABEL_LAT, (slice.start + slice.end) / 2, cx, cy, radius, Math.max(10.5, size * 0.022) * Math.min(1.5, Math.pow(zoom, 0.4)), (slice.end - slice.start) * 0.92);
      }

      // Name tag on the selected firm.
      if (callout) {
        const fontPx = Math.max(11, size * 0.024);
        c.font = `750 ${fontPx}px ${palette.font}`;
        const text = `${callout.dot.name} · ${callout.dot.score}`;
        const w = c.measureText(text).width + 16;
        const h = fontPx + 12;
        const right = callout.x + callout.r + 18 + w < size - 4;
        const bx = right ? callout.x + callout.r + 14 : callout.x - callout.r - 14 - w;
        const by = Math.max(4, callout.y - callout.r - h - 4);
        c.strokeStyle = palette.accent;
        c.lineWidth = 1.2;
        c.beginPath();
        c.moveTo(callout.x + (right ? 1 : -1) * callout.r * 0.7, callout.y - callout.r * 0.7);
        c.lineTo(right ? bx : bx + w, by + h / 2);
        c.stroke();
        c.fillStyle = palette.dark ? 'rgba(11, 17, 26, 0.92)' : 'rgba(255, 255, 255, 0.95)';
        roundRect(bx, by, w, h, h / 2);
        c.fill();
        c.strokeStyle = palette.accent;
        c.stroke();
        c.fillStyle = palette.text;
        c.textAlign = 'left';
        c.textBaseline = 'middle';
        c.fillText(text, bx + 8, by + h / 2 + 0.5);
        c.textBaseline = 'alphabetic';
      }
    }

    function roundRect(x: number, y: number, w: number, h: number, r: number) {
      const c = ctx!;
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }

    /**
     * Where a parallel meets the left edge of the visible disc (the horizon),
     * or its leftmost visible point when it never crosses it. Null when hidden.
     */
    function limbPoint(lat: number, cx: number, cy: number, radius: number) {
      let best: { x: number; y: number } | null = null;
      let prev = project(toWorld(lat, 0), cx, cy, radius);
      let leftmost: { x: number; y: number } | null = prev.z >= 0 ? prev : null;
      for (let d = 2; d <= 360; d += 2) {
        const cur = project(toWorld(lat, d), cx, cy, radius);
        if (cur.z >= 0 && (!leftmost || cur.x < leftmost.x)) leftmost = cur;
        if ((prev.z < 0) !== (cur.z < 0)) {
          const t = prev.z / (prev.z - cur.z);
          const x = prev.x + (cur.x - prev.x) * t;
          const y = prev.y + (cur.y - prev.y) * t;
          if (x < cx && (!best || x < best.x)) best = { x, y };
        }
        prev = cur;
      }
      return best ?? leftmost;
    }

    /** A small rounded number tag (pole scores, band limits). */
    function pill(text: string, x: number, y: number, color: string) {
      const c = ctx!;
      const fontPx = Math.max(10, size * 0.02);
      c.font = `750 ${fontPx}px ${palette.font}`;
      const w = c.measureText(text).width + 12;
      const h = fontPx + 8;
      // Never let a tag leave the canvas.
      y = Math.max(h / 2 + 2, Math.min(size - h / 2 - 2, y));
      x = Math.max(w / 2 + 2, Math.min(size - w / 2 - 2, x));
      c.fillStyle = palette.dark ? 'rgba(11, 17, 26, 0.85)' : 'rgba(255, 255, 255, 0.92)';
      roundRect(x - w / 2, y - h / 2, w, h, h / 2);
      c.fill();
      c.lineWidth = 1.2;
      c.strokeStyle = color;
      c.stroke();
      c.fillStyle = palette.text;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(text, x, y + 0.5);
      c.textBaseline = 'alphabetic';
    }

    /** Letter-spaced capitals laid along a parallel, front side only. */
    function curvedText(text: string, lat: number, lonCenter: number, cx: number, cy: number, radius: number, fontPx: number, maxDeg = 360) {
      const c = ctx!;
      // A name never spills into the next market: shrink it to fit its slice.
      const pxPerDegFit = radius * Math.cos(lat * DEG) * DEG;
      const estimate = text.length * fontPx * 0.78;
      if (estimate > maxDeg * pxPerDegFit) fontPx = Math.max(7, Math.floor((fontPx * maxDeg * pxPerDegFit) / estimate));
      c.font = `750 ${fontPx}px ${palette.font}`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      const chars = [...text.toUpperCase()];
      const widths = chars.map((ch) => {
        const key = `${fontPx}|${palette.font}|${ch}`;
        let w = charWidths.get(key);
        if (w === undefined) {
          w = c.measureText(ch).width;
          charWidths.set(key, w);
        }
        return w + fontPx * 0.14;
      });
      const pxPerDeg = radius * Math.cos(lat * DEG) * DEG;
      let lon = lonCenter - widths.reduce((sum, w) => sum + w, 0) / pxPerDeg / 2;
      c.lineJoin = 'round';
      for (let i = 0; i < chars.length; i++) {
        const mid = lon + widths[i] / 2 / pxPerDeg;
        lon += widths[i] / pxPerDeg;
        const pt = project(toWorld(lat, mid), cx, cy, radius);
        if (pt.z < 0.2) continue;
        const ahead = project(toWorld(lat, mid + 0.5), cx, cy, radius);
        c.save();
        c.globalAlpha = Math.min(1, (pt.z - 0.2) * 3);
        c.translate(pt.x, pt.y);
        c.rotate(Math.atan2(ahead.y - pt.y, ahead.x - pt.x));
        c.lineWidth = 3.5;
        c.strokeStyle = palette.dark ? 'rgba(11, 17, 26, 0.85)' : 'rgba(255, 255, 255, 0.9)';
        c.strokeText(chars[i], 0, 0);
        c.fillStyle = palette.text;
        c.fillText(chars[i], 0, 0);
        c.restore();
      }
      c.textBaseline = 'alphabetic';
      c.globalAlpha = 1;
    }

    requestDraw.current = () => {
      if (!running) draw();
      kick();
    };

    // Animation: auto-spin, inertia after a drag, easing towards a selected firm.
    let frame = 0;
    let running = false;
    let visible = true;
    let last = 0;
    const tick = (now: number) => {
      const v = view.current;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      let moving = false;
      if (Math.abs(v.zoomTarget - v.zoom) > 0.002) {
        v.zoom += (v.zoomTarget - v.zoom) * (1 - Math.pow(0.002, dt));
        moving = true;
      } else v.zoom = v.zoomTarget;
      if (v.target) {
        const k = 1 - Math.pow(0.0015, dt);
        v.yaw += (v.target.yaw - v.yaw) * k;
        v.pitch += (v.target.pitch - v.pitch) * k;
        if (Math.abs(v.target.yaw - v.yaw) < 0.002 && Math.abs(v.target.pitch - v.pitch) < 0.002) v.target = null;
        moving = true;
      } else if (!v.dragging && (Math.abs(v.vyaw) > 0.0005 || Math.abs(v.vpitch) > 0.0005)) {
        v.yaw += v.vyaw;
        v.pitch = Math.max(-1.2, Math.min(1.2, v.pitch + v.vpitch));
        v.vyaw *= Math.pow(0.05, dt);
        v.vpitch *= Math.pow(0.05, dt);
        moving = true;
      } else if (!reduce && !v.dragging && !v.hovering && !props.current.selected) {
        v.yaw += SPIN * dt;
        moving = true;
      }
      // Keep the twinkle and the "updated since your visit" pulses alive.
      if (!reduce && (props.current.highlight.size > 0 || palette.dark)) moving = true;
      draw();
      if (moving && visible) frame = requestAnimationFrame(tick);
      else {
        running = false;
        last = 0;
      }
    };
    function kick() {
      if (running || !visible) return;
      running = true;
      frame = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    resize();
    kick();

    // Pointer: drag to turn, click to select, hover for the name.
    let down: { x: number; y: number; t: number } | null = null;
    let lastMove = { x: 0, y: 0 };
    const local = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const pick = (x: number, y: number) => {
      for (let i = hits.length - 1; i >= 0; i--) {
        const h = hits[i];
        if ((h.x - x) ** 2 + (h.y - y) ** 2 <= h.r * h.r) return h;
      }
      return null;
    };
    const onDown = (event: PointerEvent) => {
      const p = local(event);
      down = { ...p, t: performance.now() };
      lastMove = p;
      view.current.vyaw = 0;
      view.current.vpitch = 0;
    };
    const onMove = (event: PointerEvent) => {
      const p = local(event);
      const v = view.current;
      if (down && (v.dragging || Math.hypot(p.x - down.x, p.y - down.y) > 4)) {
        if (!v.dragging) {
          v.dragging = true;
          v.target = null;
          canvas.setPointerCapture(event.pointerId);
        }
        const k = 3 / Math.max(200, size) / v.zoom;
        const dyaw = (p.x - lastMove.x) * k;
        const dpitch = event.pointerType === 'mouse' ? (p.y - lastMove.y) * k : 0;
        v.yaw += dyaw;
        v.pitch = Math.max(-1.2, Math.min(1.2, v.pitch + dpitch));
        v.vyaw = dyaw;
        v.vpitch = dpitch;
        lastMove = p;
        setHover(null);
        draw();
        return;
      }
      if (event.pointerType !== 'mouse') return;
      const hit = pick(p.x, p.y);
      v.hovering = Boolean(hit);
      canvas.style.cursor = hit ? 'pointer' : 'grab';
      setHover(hit ? { dot: hit.dot, x: hit.x, y: hit.y - hit.r } : null);
      if (!hit) kick();
    };
    const onUp = (event: PointerEvent) => {
      const v = view.current;
      const p = local(event);
      if (v.dragging) {
        v.dragging = false;
        kick();
      } else if (down) {
        const hit = pick(p.x, p.y);
        if (hit) props.current.onSelect(hit.dot.slug);
      }
      down = null;
    };
    const onLeave = () => {
      view.current.hovering = false;
      setHover(null);
      kick();
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomBy.current(Math.exp(-event.deltaY * 0.0015));
    };
    // Double-click (or double-tap): bring that spot to the front and zoom in on it.
    const onDouble = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const v = view.current;
      const radius = size * GLOBE_R * v.zoom;
      const x = (event.clientX - rect.left - size / 2) / radius;
      const y = -(event.clientY - rect.top - size / 2) / radius;
      if (x * x + y * y < 1) {
        const w = unrotate({ x, y, z: Math.sqrt(1 - x * x - y * y) }, v.yaw, v.pitch);
        let yaw = -Math.atan2(w.x, w.z);
        while (yaw - v.yaw > Math.PI) yaw -= 2 * Math.PI;
        while (yaw - v.yaw < -Math.PI) yaw += 2 * Math.PI;
        v.target = { yaw, pitch: Math.max(-1.1, Math.min(1.1, Math.asin(w.y))) };
      }
      zoomBy.current(1.8);
    };
    // Two fingers: pinch to zoom.
    const touches = new Map<number, { x: number; y: number }>();
    let pinchFrom = 0;
    const onTouchDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      touches.set(event.pointerId, local(event));
      if (touches.size === 2) {
        const [a, b] = [...touches.values()];
        pinchFrom = Math.hypot(a.x - b.x, a.y - b.y);
        down = null;
        view.current.dragging = false;
      }
    };
    const onTouchMove = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' || !touches.has(event.pointerId)) return;
      touches.set(event.pointerId, local(event));
      if (touches.size === 2 && pinchFrom > 0) {
        const [a, b] = [...touches.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        zoomBy.current(d / pinchFrom, true);
        pinchFrom = d;
      }
    };
    const onTouchUp = (event: PointerEvent) => {
      touches.delete(event.pointerId);
      if (touches.size < 2) pinchFrom = 0;
    };
    zoomBy.current = (factor: number, instant = false) => {
      const v = view.current;
      const next = Math.max(1, Math.min(MAX_ZOOM, (instant ? v.zoom : v.zoomTarget) * factor));
      v.zoomTarget = next;
      if (instant) v.zoom = next;
      setZoomLevel(next);
      requestDraw.current();
    };
    const onKey = (event: KeyboardEvent) => {
      const step = 0.18 / view.current.zoom;
      const v = view.current;
      if (event.key === '+' || event.key === '=') {
        zoomBy.current(1.35);
        event.preventDefault();
        return;
      }
      if (event.key === '-' || event.key === '_') {
        zoomBy.current(1 / 1.35);
        event.preventDefault();
        return;
      }
      if (event.key === 'ArrowLeft') v.yaw -= step;
      else if (event.key === 'ArrowRight') v.yaw += step;
      else if (event.key === 'ArrowUp') v.pitch = Math.min(1.2, v.pitch + step);
      else if (event.key === 'ArrowDown') v.pitch = Math.max(-1.2, v.pitch - step);
      else return;
      event.preventDefault();
      v.target = null;
      draw();
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('keydown', onKey);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('dblclick', onDouble);
    canvas.addEventListener('pointerdown', onTouchDown);
    canvas.addEventListener('pointermove', onTouchMove);
    canvas.addEventListener('pointerup', onTouchUp);
    canvas.addEventListener('pointercancel', onTouchUp);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('keydown', onKey);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('dblclick', onDouble);
      canvas.removeEventListener('pointerdown', onTouchDown);
      canvas.removeEventListener('pointermove', onTouchMove);
      canvas.removeEventListener('pointerup', onTouchUp);
      canvas.removeEventListener('pointercancel', onTouchUp);
    };
    // The data set is fixed for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dots, sectors]);

  return (
    <div className="prg" ref={wrapRef}>
      <canvas ref={canvasRef} className="prg-canvas" role="img" aria-label={ariaLabel} tabIndex={0} />
      <div className="prg-zoom" role="group" aria-label={zoomLabels.group}>
        <button type="button" onClick={() => zoomBy.current(1.5)} disabled={zoomLevel >= MAX_ZOOM - 0.01} aria-label={zoomLabels.in}>+</button>
        <button type="button" onClick={() => zoomBy.current(1 / 1.5)} disabled={zoomLevel <= 1.01} aria-label={zoomLabels.out}>−</button>
        {zoomLevel > 1.01 ? (
          <button type="button" onClick={() => zoomBy.current(1 / MAX_ZOOM)} aria-label={zoomLabels.reset}>⟲</button>
        ) : null}
      </div>
      {hover ? (
        <div className="prg-tip" style={{ left: hover.x, top: hover.y }} aria-hidden="true">
          <strong>{hover.dot.name}</strong>
          <span>{scoreLabel} {hover.dot.score}/100</span>
        </div>
      ) : null}
      <p className="sr-only">{hint}</p>
    </div>
  );
}
