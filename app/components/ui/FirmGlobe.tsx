'use client';

import { useEffect, useRef, useState } from 'react';
import type { RadarDot, RadarSector } from '../../lib/radar';

/**
 * The PropRadar globe: the same firms as the radar, wrapped on a sphere.
 * - Latitude = PropRadar score. The north cap is the 75+ band, the temperate
 *   belt 55–74, the south under 55 (the bands the radar uses), each tinted.
 * - Longitude = market, with the radar's own slices (meridians mark them).
 * - Each firm is its logo; a dashed ring = Trustpilot rating withheld.
 * Drawn on a canvas: drag (or arrow keys) to turn it, click a logo to select.
 * Turns slowly on its own unless the visitor prefers reduced motion.
 */

type Props = {
  dots: RadarDot[];
  sectors: RadarSector[];
  sectorName: (key: string) => string;
  selected: string | null;
  dimmed: Set<string>;
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
const SHADE_RES = 200;

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

export default function FirmGlobe({ dots, sectors, sectorName, selected, dimmed, onSelect, ariaLabel, hint, scoreLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ dot: RadarDot; x: number; y: number } | null>(null);

  // Mutable view state shared by the render loop and the handlers.
  const view = useRef({ yaw: -0.4, pitch: 0.32, vyaw: 0, vpitch: 0, target: null as null | { yaw: number; pitch: number }, dragging: false, hovering: false });
  const props = useRef({ selected, dimmed, onSelect });
  props.current = { selected, dimmed, onSelect };
  const requestDraw = useRef<() => void>(() => undefined);

  // Points on the sphere, computed once per data set.
  const points = useRef<{ dot: RadarDot; world: Vec }[]>([]);
  points.current = dots.map((dot) => {
    const lat = scoreLatitude(dot.score) + (hash(`${dot.slug}:lat`) - 0.5) * 1.6;
    return { dot, world: toWorld(lat, dot.angle) };
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
  }, [dimmed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          const lit = (palette.dark ? 0.5 : 0.78) + (palette.dark ? 0.55 : 0.3) * lambert;
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

      // Halo behind the sphere.
      const halo = c.createRadialGradient(cx, cy, radius * 0.92, cx, cy, radius * 1.15);
      halo.addColorStop(0, palette.dark ? 'rgba(54, 214, 231, 0.22)' : 'rgba(11, 114, 133, 0.14)');
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = halo;
      c.fillRect(0, 0, size, size);

      paintSurface();
      c.save();
      c.beginPath();
      c.arc(cx, cy, radius, 0, Math.PI * 2);
      c.clip();
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = 'high';
      c.drawImage(shade, cx - radius, cy - radius, radius * 2, radius * 2);

      // Graticule: band limits (bold), every 15° (faint), market meridians.
      c.lineWidth = 0.7;
      c.strokeStyle = palette.dark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.07)';
      for (let lat = -75; lat <= 75; lat += 15) strokeCurve((t) => toWorld(lat, t * 360), 96, cx, cy, radius);
      c.lineWidth = 1.4;
      c.setLineDash([4, 4]);
      c.strokeStyle = palette.good;
      strokeCurve((t) => toWorld(NORTH_BAND, t * 360), 120, cx, cy, radius);
      c.strokeStyle = palette.watch;
      strokeCurve((t) => toWorld(MID_BAND, t * 360), 120, cx, cy, radius);
      c.setLineDash([]);
      c.lineWidth = 1;
      c.strokeStyle = palette.dark ? 'rgba(54, 214, 231, 0.45)' : 'rgba(11, 114, 133, 0.4)';
      for (const s of sectors) strokeCurve((t) => toWorld(-84 + t * 168, s.start), 60, cx, cy, radius);
      c.restore();

      // Rim.
      c.beginPath();
      c.arc(cx, cy, radius, 0, Math.PI * 2);
      c.lineWidth = 1;
      c.strokeStyle = palette.dark ? 'rgba(54, 214, 231, 0.55)' : 'rgba(11, 114, 133, 0.35)';
      c.stroke();

      // Firms, back to front.
      const { selected: sel, dimmed: dim } = props.current;
      const placed = points.current
        .map(({ dot, world }) => ({ dot, p: project(world, cx, cy, radius) }))
        .sort((a, b) => a.p.z - b.p.z);
      hits = [];
      const unit = size / 520;
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
        }
        c.globalAlpha = 1;
        if (!isDim && p.z > 0.15) hits.push({ dot, x: p.x, y: p.y, r: Math.max(r, 9) });
      }
      c.globalAlpha = 1;

      // Market names in the south of each slice, on top of the logos.
      c.font = `650 ${Math.max(10, size * 0.019)}px ${palette.font}`;
      c.textAlign = 'center';
      for (const s of sectors) {
        if (!s.count) continue;
        const p = project(toWorld(-42, (s.start + s.end) / 2), cx, cy, radius);
        if (p.z < 0.25) continue;
        c.globalAlpha = Math.min(1, (p.z - 0.25) * 2.5) * 0.85;
        const label = `${sectorName(s.key)} · ${s.count}`;
        c.lineWidth = 4;
        c.lineJoin = 'round';
        c.strokeStyle = palette.surface;
        c.strokeText(label, p.x, p.y);
        c.fillStyle = palette.text;
        c.fillText(label, p.x, p.y);
      }
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
