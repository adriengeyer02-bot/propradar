'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import {
  RADAR_CENTER as C,
  RADAR_ORBIT,
  RADAR_OUTER,
  RADAR_RINGS,
  RADAR_SIZE as S,
  radarPoint,
  radarRadius,
  type RadarClosed,
  type RadarData,
  type RadarDot,
  type RadarTone,
} from '../../lib/radar';
import { localePath, type Locale } from '../../lib/locales';
import en from '../../lib/messages/en';
import type { Messages } from '../../lib/messages/en';

// The globe ships in its own chunk, loaded after the page is interactive.
const FirmGlobe = dynamic(() => import('./FirmGlobe'), { ssr: false, loading: () => <div className="prg prg-loading" aria-hidden="true" /> });

type RadarLabels = Messages['radar'];
type SectorNames = Messages['sectors'];
type ValueNames = Messages['values'];

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

type Variant = 'full' | 'compact';
type Band = RadarTone | 'closed';
type Focus = { kind: 'dot'; dot: RadarDot } | { kind: 'closed'; firm: RadarClosed };

const SWEEP_SPAN = 42;
/**
 * Phosphor trail behind the beam: TRAIL_STEPS faint wedges that all start at
 * the beam and reach back further and further, so their overlap fades
 * smoothly (no seams) from bright at the beam to nothing TRAIL_REACH degrees behind.
 */
const TRAIL_STEPS = 18;
const TRAIL_REACH = 110;
const TRAIL_ALPHA = 0.021;
const PERIOD_MS = 7000;
const PICK = 14;

function arcPath(start: number, end: number) {
  const a = radarPoint(RADAR_OUTER, start);
  const b = radarPoint(RADAR_OUTER, end);
  return `M${C},${C}L${a.x},${a.y}A${RADAR_OUTER},${RADAR_OUTER} 0 ${end - start > 180 ? 1 : 0} 1 ${b.x},${b.y}Z`;
}

/** Wedge from `start` to `end` degrees, in the sweep group's own frame (0 = straight up). */
function wedgePath(start: number, end: number) {
  const a = radarPoint(RADAR_OUTER, start);
  const b = radarPoint(RADAR_OUTER, end);
  return `M${C},${C}L${a.x.toFixed(1)},${a.y.toFixed(1)}A${RADAR_OUTER},${RADAR_OUTER} 0 0 1 ${b.x.toFixed(1)},${b.y.toFixed(1)}Z`;
}

const TRAIL = Array.from({ length: TRAIL_STEPS }, (_, i) => ({
  d: wedgePath(SWEEP_SPAN - TRAIL_REACH * Math.pow((i + 1) / TRAIL_STEPS, 1.7), SWEEP_SPAN),
  opacity: TRAIL_ALPHA,
}));

function labelPath(start: number, end: number) {
  const mid = (start + end) / 2;
  const norm = ((mid % 360) + 360) % 360;
  const flip = norm > 90 && norm < 270;
  const half = Math.max((end - start) / 2, 24);
  const r = RADAR_OUTER + 14;
  const from = radarPoint(r, flip ? mid + half : mid - half);
  const to = radarPoint(r, flip ? mid - half : mid + half);
  return { d: `M${from.x},${from.y}A${r},${r} 0 ${2 * half > 180 ? 1 : 0} ${flip ? 0 : 1} ${to.x},${to.y}`, flip };
}

function daysAgo(date: string, t: RadarLabels) {
  const days = Math.max(0, Math.round((Date.now() - new Date(`${date}T12:00:00Z`).getTime()) / 86_400_000));
  if (!Number.isFinite(days)) return date;
  if (days === 0) return t.today;
  if (days === 1) return t.yesterday;
  return fill(t.daysAgo, { n: days });
}

function shortName(name: string) {
  return name.split(' / ')[0];
}

/**
 * The PropRadar radar. Angle = market, distance = score, size = Trustpilot
 * review count, closed firms on the outer orbit. A sweep lights the dots and
 * names each firm scoring 75+ as it passes. Readable without JavaScript and
 * static with reduced motion.
 */
export default function PropRadarLive({
  data,
  variant = 'full',
  intro,
  locale = 'en',
  labels: t = en.radar,
  sectorNames = en.sectors,
  valueNames = en.values,
  tableLabels: tb = en.table,
}: {
  data: RadarData;
  variant?: Variant;
  intro?: ReactNode;
  locale?: Locale;
  labels?: RadarLabels;
  sectorNames?: SectorNames;
  valueNames?: ValueNames;
  tableLabels?: Messages['table'];
}) {
  const BAND_LABEL: Record<Band, string> = t.bands;
  const sectorName = (key: string) => (sectorNames as Record<string, string>)[key] ?? key;
  const firmHref = (slug: string) => localePath(locale, `/firm/${slug}`);
  const statusName = (status: string) => (valueNames as Record<string, string>)[status] ?? status;
  const valueName = (value: string) => (valueNames as Record<string, string>)[value] ?? value;
  const trustpilotName = (text: string) =>
    text === 'Withheld' ? valueNames.Withheld : text === 'Not checked' ? valueNames['Not checked'] : text.replace(' reviews', ` ${valueNames.reviews}`);
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<SVGGElement>(null);
  const pingRef = useRef<SVGGElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const quietRef = useRef(false);
  const pointerRef = useRef<string>('mouse');

  const [ready, setReady] = useState(false);
  const [settled, setSettled] = useState(false);
  const [hoverSector, setHoverSector] = useState<number | null>(null);
  const [lockedSector, setLockedSector] = useState<number | null>(null);
  const [band, setBand] = useState<Band | null>(null);
  const [focus, setFocus] = useState<Focus | null>(null);
  const [pinned, setPinned] = useState(false);
  const [query, setQuery] = useState('');
  const [narrow, setNarrow] = useState(false);
  const [touched, setTouched] = useState(false);
  const [shownCounts, setShownCounts] = useState<Record<Band, number>>({ good: 0, watch: 0, none: 0, closed: 0 });

  const sector = lockedSector ?? hoverSector;
  const sectorKey = sector === null ? null : data.sectors[sector].key;
  quietRef.current = Boolean(band || sector !== null || focus);

  const dimDot = (dot: RadarDot) => (band !== null && (band === 'closed' || dot.tone !== band)) || (sectorKey !== null && dot.sector !== sectorKey);
  const dimClosed = (band !== null && band !== 'closed') || sectorKey !== null;

  const labels = useMemo(() => data.sectors.map((s) => labelPath(s.start, s.end)), [data.sectors]);
  const names = useMemo(
    () => [...data.dots.map((d) => d.name), ...data.closed.map((c) => c.name)].sort((a, b) => a.localeCompare(b)),
    [data],
  );

  // Below 960px the side panel sits under the radar, so a tapped firm opens in a bottom sheet.
  useEffect(() => {
    const query = window.matchMedia('(max-width: 960px)');
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Escape closes a pinned firm (bottom sheet on phones, pinned tooltip on the home radar).
  useEffect(() => {
    if (!pinned) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPinned(false);
        setFocus(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pinned]);

  // Intro (dots travel out from the centre, best scores first), then the sweep loop.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setReady(true);
      setSettled(true);
      setShownCounts(data.counts);
      return;
    }
    const order = data.dots.map((dot, index) => ({ dot, index })).sort((a, b) => b.dot.score - a.dot.score);
    const delays = new Map(order.map(({ index }, rank) => [index, rank * 6]));
    let frame = 0;
    let running = true;
    let visible = true;
    let introDone = false;
    const lastBlip = new Map<number, number>();
    // Performance: only touch a dot when its glow moves by a visible step, and
    // re-render the counters a few times a second, not every frame.
    const glowCache = new Float32Array(data.dots.length).fill(-1);
    let lastCounts = -Infinity;

    const tick = (now: number) => {
      if (!running) return;
      const elapsed = now - t0;
      if (!introDone) {
        let done = true;
        data.dots.forEach((dot, index) => {
          const node = dotRefs.current[index];
          if (!node) return;
          const k = Math.min(1, Math.max(0, (elapsed - (delays.get(index) ?? 0)) / 900));
          const e = 1 - Math.pow(1 - k, 3);
          const p = radarPoint(dot.radius * e, dot.angle);
          node.setAttribute('cx', String(p.x));
          node.setAttribute('cy', String(p.y));
          if (k < 1) done = false;
        });
        const share = Math.min(1, elapsed / 1500);
        if (share >= 1 || now - lastCounts > 120) {
          lastCounts = now;
          setShownCounts({
            good: Math.round(data.counts.good * share),
            watch: Math.round(data.counts.watch * share),
            none: Math.round(data.counts.none * share),
            closed: Math.round(data.counts.closed * share),
          });
        }
        if (done && share >= 1) {
          introDone = true;
          setSettled(true);
        }
      }
      const sweep = ((elapsed / PERIOD_MS) * 360) % 360;
      const lead = (sweep + SWEEP_SPAN) % 360;
      sweepRef.current?.setAttribute('transform', `rotate(${sweep.toFixed(2)} ${C} ${C})`);
      data.dots.forEach((dot, index) => {
        const node = dotRefs.current[index];
        if (!node) return;
        const delta = (lead - dot.angle + 360) % 360;
        // Phosphor afterglow: full brightness as the beam passes, then a fast fade to a low floor.
        const glow = Math.round((0.38 + 0.62 * Math.exp(-delta / 80)) * 10) / 10;
        if (glowCache[index] !== glow) {
          glowCache[index] = glow;
          node.style.setProperty('--glow', String(glow));
        }
        const label = labelRefs.current[index];
        if ((label || dot.updated) && introDone && delta < 4 && !quietRef.current && now - (lastBlip.get(index) ?? 0) > PERIOD_MS * 0.8) {
          lastBlip.set(index, now);
          if (label) {
            label.classList.add('is-on');
            window.setTimeout(() => label.classList.remove('is-on'), 1900);
          }
          ping(dot, Boolean(dot.updated));
        }
      });
      if (visible) frame = requestAnimationFrame(tick);
    };

    // Start once the page is idle (hydration and first paint done), so the
    // intro does not compete with them on slow phones. Dots stay hidden until
    // then (.prr-js .prr-svg:not(.is-ready)).
    let started = false;
    let t0 = 0;
    const start = () => {
      if (!running || started) return;
      started = true;
      t0 = performance.now();
      setReady(true);
      frame = requestAnimationFrame(tick);
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1200 })
      : window.setTimeout(start, 200);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && started) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(svg);
    return () => {
      running = false;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function ping(dot: RadarDot, fresh = false) {
    const layer = pingRef.current;
    if (!layer || typeof layer.animate !== 'function') return;
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute('cx', String(dot.x));
    ring.setAttribute('cy', String(dot.y));
    ring.setAttribute('r', String(dot.size));
    ring.setAttribute('class', fresh ? 'prr-ping is-fresh' : 'prr-ping');
    layer.appendChild(ring);
    const reach = fresh ? 24 : 16;
    const animation = ring.animate([{ r: `${dot.size}px`, opacity: 0.9 }, { r: `${dot.size + reach}px`, opacity: 0 }], { duration: fresh ? 1400 : 1100, easing: 'ease-out' });
    animation.onfinish = () => ring.remove();
  }

  function toSvg(event: { clientX: number; clientY: number }) {
    const rect = svgRef.current!.getBoundingClientRect();
    return { x: ((event.clientX - rect.left) / rect.width) * S, y: ((event.clientY - rect.top) / rect.height) * S };
  }

  /** Pick radius in radar units: about 24 screen pixels for a finger, PICK for a mouse. */
  function pickRadius() {
    if (pointerRef.current === 'mouse' || !svgRef.current) return PICK;
    return Math.max(PICK, (24 * S) / Math.max(1, svgRef.current.getBoundingClientRect().width));
  }

  function pick(x: number, y: number): Focus | null {
    let best: Focus | null = null;
    const radius = pickRadius();
    let bestDistance = radius * radius;
    data.dots.forEach((dot) => {
      if (dimDot(dot)) return;
      const d = (dot.x - x) ** 2 + (dot.y - y) ** 2;
      if (d < bestDistance) {
        bestDistance = d;
        best = { kind: 'dot', dot };
      }
    });
    if (!dimClosed) {
      data.closed.forEach((firm) => {
        const d = (firm.x - x) ** 2 + (firm.y - y) ** 2;
        if (d < bestDistance) {
          bestDistance = d;
          best = { kind: 'closed', firm };
        }
      });
    }
    return best;
  }

  function onMove(event: ReactPointerEvent<SVGSVGElement>) {
    pointerRef.current = event.pointerType;
    if (pinned || event.pointerType !== 'mouse') return;
    const { x, y } = toSvg(event);
    const hit = pick(x, y);
    if (hit) {
      setFocus(hit);
      setHoverSector(null);
      return;
    }
    setFocus(null);
    const distance = Math.hypot(x - C, y - C);
    if (distance > RADAR_OUTER + 20) {
      setHoverSector(null);
      return;
    }
    const angle = (((Math.atan2(y - C, x - C) * 180) / Math.PI + 90) % 360 + 360) % 360;
    const index = data.sectors.findIndex((s) => (((angle - s.start) % 360) + 360) % 360 <= s.end - s.start);
    setHoverSector(index < 0 ? null : index);
  }

  function onClick(event: React.MouseEvent<SVGSVGElement>) {
    const { x, y } = toSvg(event);
    const hit = pick(x, y);
    if (hit) {
      const slug = hit.kind === 'dot' ? hit.dot.slug : hit.firm.slug;
      setTouched(true);
      if (variant === 'compact') {
        // A finger cannot hover: the first tap previews the firm, a second tap on it opens the page.
        const current = focus ? (focus.kind === 'dot' ? focus.dot.slug : focus.firm.slug) : null;
        if (pointerRef.current !== 'mouse' && (!pinned || current !== slug)) {
          setFocus(hit);
          setPinned(true);
          if (hit.kind === 'dot') ping(hit.dot);
          return;
        }
        router.push(firmHref(slug));
        return;
      }
      setFocus(hit);
      setPinned(true);
      if (hit.kind === 'dot') ping(hit.dot);
      return;
    }
    setPinned(false);
    setFocus(null);
    if (pointerRef.current !== 'mouse') return;
    if (hoverSector !== null) setLockedSector((current) => (current === hoverSector ? null : hoverSector));
  }

  function closeSheet() {
    setPinned(false);
    setFocus(null);
    setQuery('');
  }

  function onSearch(value: string) {
    setQuery(value);
    const q = value.trim().toLowerCase();
    if (!q) {
      setPinned(false);
      setFocus(null);
      return;
    }
    const dot = data.dots.find((d) => d.name.toLowerCase().startsWith(q)) ?? data.dots.find((d) => d.name.toLowerCase().includes(q));
    const closed = dot ? undefined : data.closed.find((c) => c.name.toLowerCase().includes(q));
    if (dot || closed) {
      setBand(null);
      setLockedSector(null);
      setHoverSector(null);
      setFocus(dot ? { kind: 'dot', dot } : { kind: 'closed', firm: closed as RadarClosed });
      setPinned(true);
      if (dot) ping(dot);
    }
  }

  // Globe <-> radar: the pinned firm is the globe's selection; a logo picked on the globe pins it here.
  const selectedSlug = pinned && focus?.kind === 'dot' ? focus.dot.slug : null;
  const dimmedSlugs = useMemo(() => new Set(data.dots.filter((dot) => dimDot(dot)).map((dot) => dot.slug)), [data.dots, band, sectorKey]); // eslint-disable-line react-hooks/exhaustive-deps
  // "Since your last visit": the previous visit date lives in this browser only.
  const [visit, setVisit] = useState<{ last: string | null; changed: RadarDot[] } | null>(null);
  useEffect(() => {
    if (variant !== 'full') return;
    const KEY = 'propradar-radar-visit';
    let last: string | null = null;
    try {
      last = window.localStorage.getItem(KEY);
    } catch {
      /* storage unavailable: treat as a first visit */
    }
    const changed = last
      ? data.dots.filter((dot) => dot.changed && dot.changed > (last as string)).sort((a, b) => (b.changed ?? '').localeCompare(a.changed ?? '') || b.score - a.score)
      : [];
    setVisit({ last, changed });
    try {
      window.localStorage.setItem(KEY, new Date().toISOString().slice(0, 10));
    } catch {
      /* nothing to remember */
    }
  }, [data.dots, variant]);
  const freshSlugs = useMemo(() => new Set((visit?.changed ?? []).map((dot) => dot.slug)), [visit]);

  function selectFromGlobe(slug: string) {
    const dot = data.dots.find((item) => item.slug === slug);
    if (!dot) return;
    setTouched(true);
    setFocus({ kind: 'dot', dot });
    setPinned(true);
    ping(dot);
  }

  const focusPoint = focus ? (focus.kind === 'dot' ? focus.dot : focus.firm) : null;
  const focusSize = focus?.kind === 'dot' ? focus.dot.size : 5;
  const hud =
    focus?.kind === 'dot'
      ? { n: String(focus.dot.score), s: t.propradarScore }
      : focus?.kind === 'closed'
        ? { n: t.closed, s: focus.firm.closed ? fill(t.reported, { date: focus.firm.closed }) : t.noClosureDate }
        : sector !== null
          ? { n: String(data.sectors[sector].count), s: `${sectorName(data.sectors[sector].key)} · ${t.firmsInMarket}` }
          : band
            ? { n: String(band === 'closed' ? data.counts.closed : data.counts[band]), s: BAND_LABEL[band] }
            : { n: String(shownCounts.good + shownCounts.watch + shownCounts.none), s: t.openFirmsOnRadar };

  const showTip = Boolean(focus) && (!pinned || variant === 'compact');
  const tip = focus && showTip && panelRef.current && svgRef.current ? (() => {
    const panel = panelRef.current!.getBoundingClientRect();
    const rect = svgRef.current!.getBoundingClientRect();
    const p = focus.kind === 'dot' ? focus.dot : focus.firm;
    const left = Math.min(panel.width - 214, Math.max(8, (p.x / S) * rect.width + (rect.left - panel.left) + 14));
    const y = (p.y / S) * rect.height + (rect.top - panel.top);
    // A pinned tip (touch) has a link and must not cover the dot: above it, or below when there is no room.
    const extra = focus.kind === 'dot' && focus.dot.updated ? 18 : 0;
    const height = (pinned ? 124 : 76) + extra;
    const top = y - height - 10 >= 4 ? y - height - 10 : y + 16;
    return { left, top: pinned ? top : Math.max(8, y - 76 - extra) };
  })() : null;

  const radar = (
    <div className={`prr-stage prr-${variant}`} ref={panelRef}>
      <div className="prr-hud" aria-live="polite">
        <b>{hud.n}</b>
        <span>{hud.s}</span>
      </div>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('prr-js')" }} />
      <svg
        ref={svgRef}
        className={`prr-svg${ready ? ' is-ready' : ''}${settled ? ' is-settled' : ''}`}
        viewBox={`0 0 ${S} ${S}`}
        role="img"
        aria-label={fill(t.radarAria, { total: data.total, good: data.counts.good, watch: data.counts.watch, none: data.counts.none, closed: data.counts.closed })}
        onPointerMove={onMove}
        onPointerDown={(event) => { pointerRef.current = event.pointerType; }}
        onPointerLeave={() => {
          if (pinned) return;
          setFocus(null);
          setHoverSector(null);
        }}
        onClick={onClick}
      >
        <defs>
          <radialGradient id={`prr-disc-${variant}`}>
            <stop offset="0%" className="prr-disc-a" />
            <stop offset="100%" className="prr-disc-b" />
          </radialGradient>
          {labels.map((label, index) => (
            <path key={index} id={`prr-label-${variant}-${index}`} d={label.d} fill="none" />
          ))}
        </defs>

        <circle cx={C} cy={C} r={RADAR_OUTER} fill={`url(#prr-disc-${variant})`} />
        {data.sectors.map((s, index) => (
          <path key={s.key} d={arcPath(s.start, s.end)} className={`prr-sector${hoverSector === index ? ' is-hot' : ''}${lockedSector === index ? ' is-locked' : ''}`} />
        ))}
        {data.sectors.flatMap((s) => [s.start, s.end]).map((angle, index) => {
          const p = radarPoint(RADAR_OUTER, angle);
          return <line key={index} x1={C} y1={C} x2={p.x} y2={p.y} className="prr-edge" />;
        })}
        {RADAR_RINGS.map((score) => (
          <g key={score}>
            <circle cx={C} cy={C} r={radarRadius(score)} className="prr-ring" />
            <text x={C + 4} y={C - radarRadius(score) + 12} className="prr-ring-label">{score}</text>
          </g>
        ))}
        <circle cx={C} cy={C} r={RADAR_OUTER} className="prr-rim" />
        {data.sectors.map((s, index) => (
          <text key={s.key} className={`prr-sector-label${sector === index ? ' is-on' : ''}${s.end - s.start < 22 ? ' is-narrow' : ''}`} dy={labels[index].flip ? 8 : 0}>
            <textPath href={`#prr-label-${variant}-${index}`} startOffset="50%" textAnchor="middle">
              {sectorName(s.key)} · {s.count}
            </textPath>
          </text>
        ))}

        <circle cx={C} cy={C} r={RADAR_ORBIT} className="prr-orbit" />
        <text x={C} y={C - RADAR_ORBIT - 8} textAnchor="middle" className="prr-orbit-label">{t.bands.closed} · {data.counts.closed}</text>
        {data.closed.map((firm) => (
          <g key={firm.slug} className={`prr-closed${dimClosed ? ' is-dim' : ''}`}>
            <line x1={firm.x - 4} y1={firm.y - 4} x2={firm.x + 4} y2={firm.y + 4} />
            <line x1={firm.x - 4} y1={firm.y + 4} x2={firm.x + 4} y2={firm.y - 4} />
          </g>
        ))}

        <g ref={sweepRef} className="prr-sweep" aria-hidden="true">
          {TRAIL.map((wedge, index) => (
            <path key={index} d={wedge.d} className="prr-trail" style={{ opacity: wedge.opacity }} />
          ))}
          <line x1={C} y1={C} x2={radarPoint(RADAR_OUTER, SWEEP_SPAN).x} y2={radarPoint(RADAR_OUTER, SWEEP_SPAN).y} className="prr-sweep-halo" />
          <line x1={C} y1={C} x2={radarPoint(RADAR_OUTER, SWEEP_SPAN).x} y2={radarPoint(RADAR_OUTER, SWEEP_SPAN).y} className="prr-sweep-edge" />
        </g>

        <g aria-hidden="true">
          {data.dots.map((dot) =>
            dot.updated ? (
              <circle key={dot.slug} cx={dot.x} cy={dot.y} r={dot.size + 4} className={`prr-fresh${dimDot(dot) ? ' is-dim' : ''}`} />
            ) : null,
          )}
        </g>
        <g>
          {data.dots.map((dot, index) => (
            <circle
              key={dot.slug}
              ref={(node) => { dotRefs.current[index] = node; }}
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              style={{ ['--r' as string]: dot.size }}
              className={`prr-dot prr-${dot.tone}${dot.withheld ? ' is-hollow' : ''}${dimDot(dot) ? ' is-dim' : ''}`}
            />
          ))}
        </g>
        <g aria-hidden="true">
          {data.dots.map((dot, index) =>
            dot.tone === 'good' ? (
              <text key={dot.slug} ref={(node) => { labelRefs.current[index] = node; }} x={dot.x + dot.size + 4} y={dot.y + 4} className="prr-blip">
                {shortName(dot.name)}
              </text>
            ) : null,
          )}
        </g>
        <g ref={pingRef} aria-hidden="true" />
        <circle cx={C} cy={C} r={2.5} className="prr-core" />
        {focusPoint ? (
          <g className="prr-focus" aria-hidden="true">
            <line x1={C} y1={C} x2={focusPoint.x} y2={focusPoint.y} />
            <circle cx={C} cy={C} r={Math.hypot(focusPoint.x - C, focusPoint.y - C)} />
            <circle cx={focusPoint.x} cy={focusPoint.y} r={focusSize + 5} className="prr-focus-ring" />
          </g>
        ) : null}
      </svg>
      {tip && focus ? (
        <div className={`prr-tip${pinned ? ' is-pinned' : ''}`} style={{ left: tip.left, top: tip.top }} aria-hidden={pinned ? undefined : true}>
          <strong>{focus.kind === 'dot' ? focus.dot.name : focus.firm.name}</strong>
          {focus.kind === 'dot' ? (
            <>
              <span><span>{t.score}</span><b>{focus.dot.score}/100</b></span>
              <span><span>{sectorName(focus.dot.sector)}</span><b>{BAND_LABEL[focus.dot.tone]}</b></span>
              {focus.dot.updated ? <span className="prr-tip-fresh"><span>{t.updated}</span><b>{focus.dot.updated}</b></span> : null}
            </>
          ) : (
            <span><span>{t.closed}</span><b>{focus.firm.closed ?? t.dateNotStated}</b></span>
          )}
          {pinned ? (
            <Link href={firmHref(focus.kind === 'dot' ? focus.dot.slug : focus.firm.slug)} className="prr-tip-link">
              {t.openProfile} <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      ) : null}
      {!touched ? <p className="prr-taphint" aria-hidden="true">{t.tapHint}</p> : null}
    </div>
  );

  const bands = (
    <div className="prr-bands" role="group" aria-label={t.bandsAria}>
      {(['good', 'watch', 'none', 'closed'] as Band[]).map((key) => (
        <button
          key={key}
          type="button"
          className={`prr-band prr-band-${key}`}
          aria-pressed={band === key}
          onClick={() => {
            setPinned(false);
            setFocus(null);
            setBand((current) => (current === key ? null : key));
          }}
        >
          <b>{shownCounts[key]}</b>
          <span><i aria-hidden="true" />{BAND_LABEL[key]}</span>
        </button>
      ))}
    </div>
  );

  const legend = (
    <div className="prr-legend">
      <span><i className="prr-lg" aria-hidden="true" />{t.legendCloser}</span>
      <span><i className="prr-lg prr-lg-big" aria-hidden="true" />{t.legendBigger}</span>
      <span><i className="prr-lg prr-lg-hollow" aria-hidden="true" />{t.legendHollow}</span>
      <span><b className="prr-lg-x" aria-hidden="true">×</b>{t.legendClosed}</span>
      {data.updated.count ? <span><i className="prr-lg prr-lg-fresh" aria-hidden="true" />{fill(t.legendUpdated, { date: data.updated.latest })} · {data.updated.count}</span> : null}
    </div>
  );

  if (variant === 'compact') {
    return (
      <div className="prr prr-is-compact">
        {radar}
        {bands}
        <p className="prr-hint">{t.compactHint}</p>
      </div>
    );
  }

  const card = (() => {
    if (focus?.kind === 'dot') {
      const dot = focus.dot;
      const circumference = 2 * Math.PI * 24;
      return (
        <div className="prr-detail">
          <div className="prr-firm">
            <span className="prr-ringbox">
              <svg viewBox="0 0 58 58" aria-hidden="true">
                <circle cx="29" cy="29" r="24" className="prr-ring-track" />
                <circle cx="29" cy="29" r="24" className={`prr-ring-fill prr-${dot.tone}`} strokeDasharray={`${(circumference * dot.score) / 100} ${circumference}`} />
              </svg>
              <b>{dot.score}</b>
            </span>
            <div>
              <h3>
                {dot.logo ? <img src={dot.logo} alt="" width={22} height={22} /> : null}
                {dot.name}
              </h3>
              <p>{statusName(dot.status)} · {sectorName(dot.sector)}</p>
            </div>
          </div>
          <dl className="prr-facts">
            <div><dt>{t.scoreBand}</dt><dd>{BAND_LABEL[dot.tone]}</dd></div>
            <div><dt>{t.trustpilot}</dt><dd>{trustpilotName(dot.trustpilot)}</dd></div>
            {variant === 'full' ? (
              <>
                <div><dt>{tb.from_}</dt><dd>{valueName(dot.price)}</dd></div>
                <div><dt>{tb.split}</dt><dd>{valueName(dot.split)}</dd></div>
                <div><dt>{tb.drawdown}</dt><dd>{valueName(dot.drawdown)}</dd></div>
                <div title={tb.payoutTitle}><dt>{tb.payout}</dt><dd>{valueName(dot.payout)}</dd></div>
                <div title={tb.legalTitle}><dt>{tb.legal}</dt><dd>{valueName(dot.legal)}</dd></div>
              </>
            ) : null}
            <div><dt>{t.lastReview}</dt><dd>{daysAgo(dot.reviewed, t)}</dd></div>
            {dot.updated ? <div className="prr-fact-fresh"><dt>{t.updated}</dt><dd><Link href={`${firmHref(dot.slug)}#update-history`}>{dot.updated}</Link></dd></div> : null}
            <div><dt>{t.market}</dt><dd>{sectorName(dot.sector)}</dd></div>
          </dl>
          <Link className="btn btn-primary prr-open" href={firmHref(dot.slug)}>{fill(t.openFirmProfile, { name: shortName(dot.name) })} <span aria-hidden="true">→</span></Link>
        </div>
      );
    }
    if (focus?.kind === 'closed') {
      return (
        <div className="prr-detail">
          <h3 className="prr-detail-title">{focus.firm.name}</h3>
          <p className="prr-detail-sub">{t.closed} · {focus.firm.closed ? fill(t.reported, { date: focus.firm.closed }) : t.noClosureDate}</p>
          <Link className="pr-link" href={firmHref(focus.firm.slug)}>{t.closureRecord} <span aria-hidden="true">→</span></Link>
        </div>
      );
    }
    if (sector !== null) {
      const s = data.sectors[sector];
      return (
        <div className="prr-detail">
          <h3 className="prr-detail-title">{sectorName(s.key)}</h3>
          <p className="prr-detail-sub">{fill(s.count === 1 ? t.sectorLineOne : t.sectorLine, { count: s.count, average: s.average })}</p>
          <ol className="prr-top">
            {s.top.map((firm) => (
              <li key={firm.slug}>
                <Link href={firmHref(firm.slug)}>{firm.name}</Link>
                <b className={`prr-${firm.tone}-text`}>{firm.score}</b>
              </li>
            ))}
          </ol>
        </div>
      );
    }
    return (
      <div className="prr-detail">
        <p className="prr-detail-hint">{t.idleHint}</p>
      </div>
    );
  })();

  return (
    <div className={`prr prr-is-full has-globe is-three${intro ? ' has-intro' : ''}`}>
      {intro ? <div className="prr-intro">{intro}</div> : null}
      <div className="prr-main">
        <div className="prr-chips" role="group" aria-label={t.markets}>
          <button type="button" aria-pressed={lockedSector === null} onClick={() => { setLockedSector(null); closeSheet(); }}>{t.allMarkets}</button>
          {data.sectors.map((s, index) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={lockedSector === index}
              onClick={() => {
                closeSheet();
                setTouched(true);
                setLockedSector((current) => (current === index ? null : index));
              }}
            >
              {sectorName(s.key)} <small>{s.count}</small>
            </button>
          ))}
        </div>
        {radar}
        {legend}
      </div>
      <section className="prr-globe prr-globe-col" aria-label={t.globeTitle}>
        <h2 className="prr-globe-title">{t.globeTitle}</h2>
        <FirmGlobe
          dots={data.dots}
          sectors={data.sectors}
          sectorName={sectorName}
          selected={selectedSlug}
          dimmed={dimmedSlugs}
          highlight={freshSlugs}
          onSelect={selectFromGlobe}
          ariaLabel={fill(t.globeAria, { total: data.dots.length })}
          hint={t.globeHint}
          scoreLabel={t.score}
          zoomLabels={{ group: t.globeZoom, in: t.zoomIn, out: t.zoomOut, reset: t.zoomReset }}
        />
        <div className="prg-legend">
          <span><i className="prg-sw prg-good" aria-hidden="true" />{BAND_LABEL.good}</span>
          <span><i className="prg-sw prg-watch" aria-hidden="true" />{BAND_LABEL.watch}</span>
          <span><i className="prg-sw prg-none" aria-hidden="true" />{BAND_LABEL.none}</span>
          <small>{t.globeNorth}</small>
        </div>
      </section>
      <aside className="prr-side prr-panel" aria-label={t.controls}>
        <label className="prr-search">
          <span className="sr-only">{t.findLabel}</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m13.5 13.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <input
            type="search"
            list="prr-names"
            placeholder={t.findPlaceholder}
            value={query}
            onChange={(event) => onSearch(event.target.value)}
            autoComplete="off"
          />
        </label>
        <datalist id="prr-names">
          {names.map((name) => <option key={name} value={name} />)}
        </datalist>
        {/* The firm (or market) card sits here, at the top of the right column: no scrolling to reach it. */}
        <div className={`prr-slot${focus || sector !== null ? ' has-card' : ''}`}>
          {focus || sector !== null ? (
            <>
              {pinned ? <button type="button" className="prr-slot-close" onClick={closeSheet} aria-label={t.close}>×</button> : null}
              {card}
            </>
          ) : (
            <>
              {visit ? (
                <div className="prr-visit" aria-live="polite">
                  {!visit.last ? (
                    <p>{t.visitFirst}</p>
                  ) : visit.changed.length ? (
                    <>
                      <p><b>{fill(t.visitSince, { when: daysAgo(visit.last, t) })}</b> · {visit.changed.length}</p>
                      <ul>
                        {visit.changed.slice(0, 6).map((dot) => (
                          <li key={dot.slug}>
                            <button type="button" onClick={() => selectFromGlobe(dot.slug)} aria-pressed={selectedSlug === dot.slug}>
                              {dot.logo ? <img src={dot.logo} alt="" width={18} height={18} /> : null}
                              <span>{shortName(dot.name)}</span>
                              <small>{daysAgo(dot.changed as string, t)}</small>
                            </button>
                          </li>
                        ))}
                        {visit.changed.length > 6 ? <li className="prr-visit-more">{fill(t.visitMore, { n: visit.changed.length - 6 })}</li> : null}
                      </ul>
                    </>
                  ) : (
                    <p>{fill(t.visitNone, { when: daysAgo(visit.last, t) })}</p>
                  )}
                </div>
              ) : null}
              <p className="prr-detail-hint">{t.idleHint}</p>
              {bands}
            </>
          )}
        </div>
      </aside>
      {narrow && pinned && focus ? (
        <>
          <div className="prr-sheet-backdrop" onClick={closeSheet} aria-hidden="true" />
          <div className="prr-sheet" role="dialog" aria-modal="false" aria-label={focus.kind === 'dot' ? focus.dot.name : focus.firm.name}>
            <button type="button" className="prr-sheet-close" onClick={closeSheet} aria-label={t.close}>×</button>
            {card}
          </div>
        </>
      ) : null}
    </div>
  );
}
