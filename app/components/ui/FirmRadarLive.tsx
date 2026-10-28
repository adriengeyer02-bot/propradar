'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react';
import type { Tone } from '../../lib/riskTone';

export type RadarDot = {
  slug: string;
  name: string;
  score: number;
  status: string;
  reviewed: string;
  tone: Tone;
  angle: number;
  radius: number;
  x: number;
  y: number;
  /** 1-3 for the highlighted firms, 0 otherwise. */
  pin: number;
};

const SIZE = 400;
const CENTER = SIZE / 2;
const OUTER = 190;
const RINGS = [90, 75, 55];
const SWEEP_SPAN = 38;
const PERIOD_MS = 6500;
/** Pointer must be this close (viewBox units) to pick a dot. */
const PICK_RADIUS = 14;

const TONE_LABEL: Record<Tone, string> = { good: 'Low risk', watch: 'To watch', risk: 'High risk or closed', none: 'Not assessed' };
const DEFAULT_HINT = 'Closer to the centre = higher score. Point at a dot, a ring or a category.';

function radiusFor(score: number) {
  return Math.min(184, 14 + (100 - Math.max(0, score)) * 2.5);
}

function scoreAt(distance: number) {
  return Math.max(0, Math.min(100, Math.round(100 - (distance - 14) / 2.5)));
}

function bandFor(score: number): [number, number] {
  if (score >= 90) return [90, 100];
  if (score >= 75) return [75, 89];
  if (score >= 55) return [55, 74];
  return [0, 54];
}

function reviewedAgo(date: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(`${date}T12:00:00Z`).getTime()) / 86_400_000));
  if (!Number.isFinite(days)) return date;
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

function sweepWedge() {
  const rad = ((SWEEP_SPAN - 90) * Math.PI) / 180;
  const ex = CENTER + OUTER * Math.cos(rad);
  const ey = CENTER + OUTER * Math.sin(rad);
  return { path: `M${CENTER},${CENTER} L${CENTER},${CENTER - OUTER} A${OUTER},${OUTER} 0 0,1 ${ex},${ey} Z`, ex, ey };
}

/**
 * Interactive radar. Dots fade between passes and the sweep lights them up;
 * hovering (or tapping) a dot shows the firm, hovering a ring shows how many
 * firms sit in that score band, and the legend filters by risk tone.
 * Everything is readable without JavaScript or with reduced motion.
 */
export default function FirmRadarLive({ dots }: { dots: RadarDot[] }) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const sweepRef = useRef<SVGGElement>(null);
  const echoRef = useRef<SVGGElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const hotRef = useRef<number>(-1);
  const pressedHotRef = useRef<number>(-1);

  const [hot, setHot] = useState(-1);
  const [band, setBand] = useState<[number, number] | null>(null);
  const [preview, setPreview] = useState<Tone | null>(null);
  const [locked, setLocked] = useState<Tone | null>(null);
  const filter = locked ?? preview;

  const counts = useMemo(() => {
    const result: Record<Tone, number> = { good: 0, watch: 0, risk: 0, none: 0 };
    dots.forEach((dot) => { result[dot.tone] += 1; });
    return result;
  }, [dots]);
  const pins = useMemo(() => dots.filter((dot) => dot.pin > 0).sort((a, b) => a.pin - b.pin), [dots]);
  const wedge = useMemo(sweepWedge, []);

  useEffect(() => { hotRef.current = hot; }, [hot]);

  // Sweep + phosphor afterglow. Runs only while the radar is on screen.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    svg.dataset.live = 'true';
    let frame = 0;
    let running = false;
    let start = 0;
    const lastEcho = new Map<number, number>();

    const tick = (now: number) => {
      if (!start) start = now;
      const sweep = (((now - start) / PERIOD_MS) * 360) % 360;
      const lead = (sweep + SWEEP_SPAN) % 360;
      if (sweepRef.current) sweepRef.current.style.transform = `rotate(${sweep.toFixed(2)}deg)`;
      dots.forEach((dot, index) => {
        const delta = (lead - dot.angle + 360) % 360;
        if (dot.pin) {
          if (delta < 5 && now - (lastEcho.get(index) ?? 0) > 1500 && echoRef.current) {
            lastEcho.set(index, now);
            const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            ring.setAttribute('cx', String(dot.x));
            ring.setAttribute('cy', String(dot.y));
            ring.setAttribute('r', '11');
            ring.setAttribute('class', `pr-radar-echo pr-tone-${dot.tone}`);
            ring.addEventListener('animationend', () => ring.remove());
            echoRef.current.appendChild(ring);
          }
          return;
        }
        const node = dotRefs.current[index];
        if (node) node.style.opacity = (0.34 + 0.66 * Math.exp(-delta / 70)).toFixed(3);
      });
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) { running = true; frame = requestAnimationFrame(tick); }
      if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(frame); }
    });
    observer.observe(svg);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); delete svg.dataset.live; };
  }, [dots]);

  function track(event: ReactPointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * SIZE;
    const py = ((event.clientY - rect.top) / rect.height) * SIZE;
    let best = -1;
    let bestDistance = PICK_RADIUS * PICK_RADIUS;
    dots.forEach((dot, index) => {
      if (filter && dot.tone !== filter) return;
      const d = (dot.x - px) ** 2 + (dot.y - py) ** 2;
      if (d < bestDistance) { bestDistance = d; best = index; }
    });
    if (best !== hot) setHot(best);
    const distance = Math.hypot(px - CENTER, py - CENTER);
    const nextBand = best < 0 && distance <= OUTER ? bandFor(scoreAt(distance)) : null;
    if (nextBand?.[0] !== band?.[0]) setBand(nextBand);
  }

  function leave() {
    setHot(-1);
    setBand(null);
  }

  function open(event: ReactMouseEvent<SVGSVGElement>) {
    if ((event.target as Element).closest('a')) return;
    const index = hotRef.current;
    if (index >= 0 && index === pressedHotRef.current) router.push(`/firm/${dots[index].slug}`);
  }

  const hotDot = hot >= 0 ? dots[hot] : null;
  const bandCount = band ? dots.filter((dot) => dot.score >= band[0] && dot.score <= band[1]).length : 0;
  const filtered = filter ? dots.filter((dot) => dot.tone === filter).sort((a, b) => b.score - a.score) : [];

  return (
    <figure className="pr-radar pr-radar-live">
      <div className="pr-radar-stage">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={`${dots.length} prop firms placed by PropRadar score: ${counts.good} low risk, ${counts.watch} to watch, ${counts.risk} high risk or closed.`}
          onPointerMove={track}
          onPointerDown={(event) => { pressedHotRef.current = hotRef.current; track(event); }}
          onPointerLeave={(event) => { if (event.pointerType === 'mouse') leave(); }}
          onClick={open}
          className={hotDot ? 'has-hot' : undefined}
        >
          <defs>
            <radialGradient id="pr-radar-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" className="pr-radar-bg-center" />
              <stop offset="100%" className="pr-radar-bg-edge" />
            </radialGradient>
            <linearGradient id="pr-radar-sweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" className="pr-radar-sweep-start" />
              <stop offset="100%" className="pr-radar-sweep-end" />
            </linearGradient>
          </defs>

          <circle cx={CENTER} cy={CENTER} r={OUTER} fill="url(#pr-radar-bg)" className="pr-radar-disc" />
          {RINGS.map((score) => (
            <g key={score}>
              <circle cx={CENTER} cy={CENTER} r={radiusFor(score)} className={`pr-radar-ring${band?.[0] === score ? ' is-band' : ''}`} />
              <text x={CENTER + 4} y={CENTER - radiusFor(score) + 13} className="pr-radar-ring-label">{score}</text>
            </g>
          ))}
          <circle cx={CENTER} cy={CENTER} r={OUTER} className="pr-radar-ring pr-radar-ring-outer" />
          <line x1={CENTER} y1={10} x2={CENTER} y2={SIZE - 10} className="pr-radar-axis" />
          <line x1={10} y1={CENTER} x2={SIZE - 10} y2={CENTER} className="pr-radar-axis" />

          {hotDot ? (
            <g className="pr-radar-focus" aria-hidden="true">
              <circle cx={CENTER} cy={CENTER} r={hotDot.radius} className="pr-radar-orbit" />
              <line x1={CENTER} y1={CENTER} x2={hotDot.x} y2={hotDot.y} className="pr-radar-beam" />
            </g>
          ) : null}

          <g ref={sweepRef} className="pr-radar-sweep" aria-hidden="true">
            <path d={wedge.path} fill="url(#pr-radar-sweep)" />
            <line x1={CENTER} y1={CENTER} x2={wedge.ex} y2={wedge.ey} className="pr-radar-sweep-edge" />
          </g>
          <g ref={echoRef} aria-hidden="true" />

          {dots.map((dot, index) =>
            dot.pin ? null : (
              <circle
                key={dot.slug}
                ref={(node) => { dotRefs.current[index] = node; }}
                cx={dot.x}
                cy={dot.y}
                r={3.2}
                className={`pr-radar-dot pr-tone-${dot.tone}${filter && dot.tone !== filter ? ' is-dim' : ''}${index === hot ? ' is-hot' : ''}`}
              />
            ),
          )}

          {pins.map((dot) => (
            <Link href={`/firm/${dot.slug}`} key={dot.slug} aria-label={`${dot.name}, score ${dot.score}`}>
              <g className={`pr-radar-pin pr-tone-${dot.tone}${filter && dot.tone !== filter ? ' is-dim' : ''}`}>
                <circle cx={dot.x} cy={dot.y} r={13} className="pr-radar-pin-halo" />
                <circle cx={dot.x} cy={dot.y} r={10} className="pr-radar-pin-dot" />
                <text x={dot.x} y={dot.y + 4} textAnchor="middle">{dot.pin}</text>
              </g>
            </Link>
          ))}
        </svg>

        {hotDot ? (
          <div
            className="pr-radar-tip"
            style={{ left: `clamp(100px, ${((hotDot.x / SIZE) * 100).toFixed(1)}%, calc(100% - 100px))`, top: `${((hotDot.y / SIZE) * 100).toFixed(1)}%` }}
            aria-hidden="true"
          >
            <strong>{hotDot.name}</strong>
            <span className="pr-radar-tip-row"><span>PropRadar score</span><b>{hotDot.score}/100</b></span>
            <span className="pr-radar-tip-row"><span>{hotDot.status}</span><i className={`pr-radar-tip-pill pr-tone-${hotDot.tone}`}>{TONE_LABEL[hotDot.tone]}</i></span>
            <span className="pr-radar-tip-row"><span>Checked</span><span>{reviewedAgo(hotDot.reviewed)}</span></span>
          </div>
        ) : null}
      </div>

      <figcaption className="pr-radar-legend">
        {(['good', 'watch', 'risk'] as Tone[]).map((tone) => (
          <button
            key={tone}
            type="button"
            className={`pr-radar-filter${filter === tone ? ' is-on' : ''}`}
            aria-pressed={locked === tone}
            onMouseEnter={() => setPreview(tone)}
            onMouseLeave={() => setPreview(null)}
            onFocus={() => setPreview(tone)}
            onBlur={() => setPreview(null)}
            onClick={() => setLocked((current) => (current === tone ? null : tone))}
          >
            <i className={`pr-pip-dot pr-tone-${tone}`} aria-hidden="true" />
            {counts[tone]} {TONE_LABEL[tone].toLowerCase()}
          </button>
        ))}
        <small className="pr-radar-readout" aria-live="polite">
          {hotDot ? (
            <Link href={`/firm/${hotDot.slug}`} className="pr-link">Open the {hotDot.name} profile →</Link>
          ) : filter ? (
            <>
              <b>{filtered.length} firms</b> {TONE_LABEL[filter].toLowerCase()}. Top: {filtered.slice(0, 3).map((dot) => dot.name).join(', ')}.
            </>
          ) : band ? (
            <>Score {band[0]}–{band[1]}: <b>{bandCount} firm{bandCount === 1 ? '' : 's'}</b>. Closer to the centre = higher score.</>
          ) : (
            DEFAULT_HINT
          )}
        </small>
      </figcaption>
    </figure>
  );
}
