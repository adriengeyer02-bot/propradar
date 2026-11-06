'use client';

import { useEffect, useRef, useState } from 'react';
import type { RadarDot, RadarSector } from '../../lib/radar';

/**
 * The PropRadar globe: the same firms as the radar, wrapped on a sphere.
 * - Latitude = PropRadar score. The north cap is the 75+ band, the temperate
 *   belt 55–74, the south under 55 (the bands the radar uses), each tinted.
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
};

type Vec = { x: number; y: number; z: number };
type Palette = { good: string; watch: string; none: string; accent: string; text: string; surface: string; line: string; font: string; dark: boolean };
type Rgb = [number, number, number];

const DEG = Math.PI / 180;
const NORTH_BAND = 45; // score 75
const MID_BAND = 9; // score 55
const SPIN = 0.09; // rad/s when idle
const SHADE_RES = 176;
const MIN_SLICE = 34; // degrees: the smallest market stays readable
const LABEL_LAT = -28; // the curved market names run along this parallel

type Slice = { key: string; count: number; start: number; end: number; shade: number };

/** Market slices on the globe: proportional to the number of firms, with a floor. */
function layoutSlices(sectors: RadarSector[]): Slice[] {
  const live = sectors.filter((s) => s.count > 0);
  const total = live.reduce((sum, s) => sum + s.count, 0) || 1;
  const widths = live.map((s) => (s.count / total) * 360);
  const fixed = new Set<number>();
  for (let round = 0; round < live.length; round++) {
    let changed = false;
    const free = 360 - fixed.size * MIN_SLICE;
    const freeCount = live.reduce((sum, s, i) => (fixed.has(i) ? sum : sum + s.count), 0) || 1;
    live.forEach((s, i) => {
      if (fixed.has(i)) return;
      widths[i] = (s.count / freeCount) * free;
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

/** Score -> latitude in degrees (75 -> 45°, 55 -> 9°, 100 -> 90°). */
export function scoreLatitude(score: number) {
  return Math.max(-84, Math.min(84, (score - 50) * 1.8));
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

export default function FirmGlobe({ dots, sectors, sectorName, selected, dimmed, highlight, onSelect, ariaLabel, hint, scoreLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ dot: RadarDot; x: number; y: number } | null>(null);

  // Mutable view state shared by the render loop and the handlers.
  const view = useRef({ yaw: -0.4, pitch: 0.32, vyaw: 0, vpitch: 0, target: null as null | { yaw: number; pitch: number }, dragging: false, hovering: false });
  const props = useRef({ selected, dimmed, highlight, onSelect });
  props.current = { selected, dimmed, highlight, onSelect };
  const requestDraw = useRef<() => void>(() => undefined);

  // Market slices and firm positions. A firm keeps its relative place inside
  // its market (as on the radar), stretched to the globe's slice.
  const slices = useRef<Slice[]>([]);
  slices.current = layoutSlices(sectors);
  const points = useRef<{ dot: RadarDot; world: Vec }[]>([]);
  points.current = dots.map((dot) => {
    const lat = scoreLatitude(dot.score) + (hash(`${dot.slug}:lat`) - 0.5) * 1.6;
    const sector = sectors.find((s) => s.key === dot.sector);
    const slice = slices.current.find((s) => s.key === dot.sector);
    let lon = dot.angle;
    if (sector && slice) {
      const span = Math.max(1, sector.end - sector.start);
      const t = Math.max(0, Math.min(1, ((((dot.angle - sector.start) % 360) + 360) % 360) / span));
      lon = slice.start + (0.05 + 0.9 * t) * (slice.end - slice.start);
    }
    return { dot, world: toWorld(lat, lon) };
  });

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

    // Logos, loaded once; a firm without a logo gets a monogram.
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
    function paintSurface() {
      const { yaw, pitch } = view.current;
      const data = pixels.data;
      const half = SHADE_RES / 2;
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
          const x = (i + 0.5 - half) / half;
          const y = (half - j - 0.5) / half;
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
      const radius = size * 0.43;

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
      const halo = c.createRadialGradient(cx, cy, radius * 0.92, cx, cy, radius * 1.15);
      halo.addColorStop(0, palette.dark ? 'rgba(54, 214, 231, 0.22)' : 'rgba(11, 114, 133, 0.14)');
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = halo;
      c.fillRect(0, 0, size, size);

      // Axis through the poles (the part inside or behind the sphere is covered next).
      const tipN = project({ x: 0, y: 1.17, z: 0 }, cx, cy, radius);
      const tipS = project({ x: 0, y: -1.17, z: 0 }, cx, cy, radius);
      c.strokeStyle = axisColor;
      c.lineWidth = 1.4;
      c.beginPath();
      c.moveTo(tipN.x, tipN.y);
      c.lineTo(tipS.x, tipS.y);
      c.stroke();

      paintSurface();
      c.save();
      c.beginPath();
      c.arc(cx, cy, radius, 0, Math.PI * 2);
      c.clip();
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = 'high';
      c.drawImage(shade, cx - radius, cy - radius, radius * 2, radius * 2);

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
          const pt = project({ x: 0, y: sign * (1 + (0.17 * k) / 16), z: 0 }, cx, cy, radius);
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

      // Band limits labelled where they cross the left-front of the globe.
      const sideLon = -view.current.yaw / DEG - 64;
      for (const [lat, label, color] of [[NORTH_BAND, '75', palette.good], [MID_BAND, '55', palette.watch]] as const) {
        const pt = project(toWorld(lat, sideLon), cx, cy, radius);
        if (pt.z > 0.15) pill(label, pt.x, pt.y, color);
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
        const r = (isSel ? 15 : 7.5 + 4.5 * p.z) * unit * (dot.size > 5 ? 1.12 : 1);
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
        curvedText(`${sectorName(slice.key)} · ${slice.count}`, LABEL_LAT, (slice.start + slice.end) / 2, cx, cy, radius, Math.max(10.5, size * 0.022));
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

    /** A small rounded number tag (pole scores, band limits). */
    function pill(text: string, x: number, y: number, color: string) {
      const c = ctx!;
      const fontPx = Math.max(10, size * 0.02);
      c.font = `750 ${fontPx}px ${palette.font}`;
      const w = c.measureText(text).width + 12;
      const h = fontPx + 8;
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
    function curvedText(text: string, lat: number, lonCenter: number, cx: number, cy: number, radius: number, fontPx: number) {
      const c = ctx!;
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
        const k = 3 / Math.max(200, size);
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
    const onKey = (event: KeyboardEvent) => {
      const step = 0.18;
      const v = view.current;
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
    };
    // The data set is fixed for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dots, sectors]);

  return (
    <div className="prg" ref={wrapRef}>
      <canvas ref={canvasRef} className="prg-canvas" role="img" aria-label={ariaLabel} tabIndex={0} />
      {hover ? (
        <div className="prg-tip" style={{ left: hover.x, top: hover.y }} aria-hidden="true">
          <strong>{hover.dot.name}</strong>
          <span>{scoreLabel} {hover.dot.score}/100</span>
        </div>
      ) : null}
      <p className="prg-hint">{hint}</p>
    </div>
  );
}
