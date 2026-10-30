'use client';

import Link from 'next/link';
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

type Variant = 'full' | 'compact';
type Band = RadarTone | 'closed';
type Focus = { kind: 'dot'; dot: RadarDot } | { kind: 'closed'; firm: RadarClosed };

const BAND_LABEL: Record<Band, string> = { good: 'Score 75+', watch: 'Score 55–74', none: 'Under 55', closed: 'Closed' };
const SWEEP_SPAN = 42;
const PERIOD_MS = 7000;
const PICK = 14;

function arcPath(start: number, end: number) {
  const a = radarPoint(RADAR_OUTER, start);
  const b = radarPoint(RADAR_OUTER, end);
  return `M${C},${C}L${a.x},${a.y}A${RADAR_OUTER},${RADAR_OUTER} 0 ${end - start > 180 ? 1 : 0} 1 ${b.x},${b.y}Z`;
}

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

function daysAgo(date: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(`${date}T12:00:00Z`).getTime()) / 86_400_000));
  if (!Number.isFinite(days)) return date;
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
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
export default function PropRadarLive({ data, variant = 'full', intro }: { data: RadarData; variant?: Variant; intro?: ReactNode }) {
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
      setShownCounts(data.counts);
      return;
    }
    const order = data.dots.map((dot, index) => ({ dot, index })).sort((a, b) => b.dot.score - a.dot.score);
    const delays = new Map(order.map(({ index }, rank) => [index, rank * 6]));
    let frame = 0;
    let running = true;
    let visible = true;
    const t0 = performance.now();
    let introDone = false;
    const lastBlip = new Map<number, number>();

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
        setShownCounts({
          good: Math.round(data.counts.good * share),
          watch: Math.round(data.counts.watch * share),
          none: Math.round(data.counts.none * share),
          closed: Math.round(data.counts.closed * share),
        });
        if (done && share >= 1) introDone = true;
      }
      const sweep = ((elapsed / PERIOD_MS) * 360) % 360;
      const lead = (sweep + SWEEP_SPAN) % 360;
      sweepRef.current?.setAttribute('transform', `rotate(${sweep.toFixed(2)} ${C} ${C})`);
      data.dots.forEach((dot, index) => {
        const node = dotRefs.current[index];
        if (!node) return;
        const delta = (lead - dot.angle + 360) % 360;
        node.style.setProperty('--glow', Math.max(0.4, 1 - delta / 330).toFixed(2));
        const label = labelRefs.current[index];
        if (label && introDone && delta < 4 && !quietRef.current && now - (lastBlip.get(index) ?? 0) > PERIOD_MS * 0.8) {
          lastBlip.set(index, now);
          label.classList.add('is-on');
          window.setTimeout(() => label.classList.remove('is-on'), 1900);
          ping(dot);
        }
      });
      if (visible) frame = requestAnimationFrame(tick);
    };

    setReady(true);
    frame = requestAnimationFrame(tick);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(svg);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function ping(dot: RadarDot) {
    const layer = pingRef.current;
    if (!layer || typeof layer.animate !== 'function') return;
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute('cx', String(dot.x));
    ring.setAttribute('cy', String(dot.y));
    ring.setAttribute('r', String(dot.size));
    ring.setAttribute('class', 'prr-ping');
    layer.appendChild(ring);
    const animation = ring.animate([{ r: `${dot.size}px`, opacity: 0.9 }, { r: `${dot.size + 16}px`, opacity: 0 }], { duration: 1100, easing: 'ease-out' });
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
        router.push(`/firm/${slug}`);
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

  const focusPoint = focus ? (focus.kind === 'dot' ? focus.dot : focus.firm) : null;
  const focusSize = focus?.kind === 'dot' ? focus.dot.size : 5;
  const hud =
    focus?.kind === 'dot'
      ? { n: String(focus.dot.score), s: 'PropRadar score' }
      : focus?.kind === 'closed'
        ? { n: 'Closed', s: focus.firm.closed ? `reported ${focus.firm.closed}` : 'closure date not stated' }
        : sector !== null
          ? { n: String(data.sectors[sector].count), s: `${data.sectors[sector].key} firms` }
          : band
            ? { n: String(band === 'closed' ? data.counts.closed : data.counts[band]), s: BAND_LABEL[band] }
            : { n: String(shownCounts.good + shownCounts.watch + shownCounts.none), s: 'open firms on radar' };

  const showTip = Boolean(focus) && (!pinned || variant === 'compact');
  const tip = focus && showTip && panelRef.current && svgRef.current ? (() => {
    const panel = panelRef.current!.getBoundingClientRect();
    const rect = svgRef.current!.getBoundingClientRect();
    const p = focus.kind === 'dot' ? focus.dot : focus.firm;
    const left = Math.min(panel.width - 214, Math.max(8, (p.x / S) * rect.width + (rect.left - panel.left) + 14));
    const y = (p.y / S) * rect.height + (rect.top - panel.top);
    // A pinned tip (touch) has a link and must not cover the dot: above it, or below when there is no room.
    const height = pinned ? 124 : 76;
    const top = y - height - 10 >= 4 ? y - height - 10 : y + 16;
    return { left, top: pinned ? top : Math.max(8, y - 76) };
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
        className={`prr-svg${ready ? ' is-ready' : ''}`}
        viewBox={`0 0 ${S} ${S}`}
        role="img"
        aria-label={`Radar of ${data.total} prop firms: ${data.counts.good} score 75 or more, ${data.counts.watch} score 55 to 74, ${data.counts.none} under 55, ${data.counts.closed} closed. Angle shows the market, distance shows the PropRadar score.`}
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
          <linearGradient id={`prr-sweep-${variant}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" className="prr-sweep-a" />
            <stop offset="100%" className="prr-sweep-b" />
          </linearGradient>
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
              {s.key} · {s.count}
            </textPath>
          </text>
        ))}

        <circle cx={C} cy={C} r={RADAR_ORBIT} className="prr-orbit" />
        <text x={C} y={C - RADAR_ORBIT - 8} textAnchor="middle" className="prr-orbit-label">Closed · {data.counts.closed}</text>
        {data.closed.map((firm) => (
          <g key={firm.slug} className={`prr-closed${dimClosed ? ' is-dim' : ''}`}>
            <line x1={firm.x - 4} y1={firm.y - 4} x2={firm.x + 4} y2={firm.y + 4} />
            <line x1={firm.x - 4} y1={firm.y + 4} x2={firm.x + 4} y2={firm.y - 4} />
          </g>
        ))}

        <g ref={sweepRef} className="prr-sweep" aria-hidden="true">
          <path d={(() => { const e = radarPoint(RADAR_OUTER, SWEEP_SPAN); return `M${C},${C}L${C},${C - RADAR_OUTER}A${RADAR_OUTER},${RADAR_OUTER} 0 0 1 ${e.x},${e.y}Z`; })()} fill={`url(#prr-sweep-${variant})`} />
          <line x1={C} y1={C} x2={radarPoint(RADAR_OUTER, SWEEP_SPAN).x} y2={radarPoint(RADAR_OUTER, SWEEP_SPAN).y} className="prr-sweep-edge" />
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
              <span><span>Score</span><b>{focus.dot.score}/100</b></span>
              <span><span>{focus.dot.sector}</span><b>{BAND_LABEL[focus.dot.tone]}</b></span>
            </>
          ) : (
            <span><span>Closed</span><b>{focus.firm.closed ?? 'date not stated'}</b></span>
          )}
          {pinned ? (
            <Link href={`/firm/${focus.kind === 'dot' ? focus.dot.slug : focus.firm.slug}`} className="prr-tip-link">
              Open the profile <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      ) : null}
      {!touched ? <p className="prr-taphint" aria-hidden="true">Tap a dot to read the firm</p> : null}
    </div>
  );

  const bands = (
    <div className="prr-bands" role="group" aria-label="Filter by score band">
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
      <span><i className="prr-lg" aria-hidden="true" />Closer to the centre = higher score</span>
      <span><i className="prr-lg prr-lg-big" aria-hidden="true" />Bigger = more Trustpilot reviews</span>
      <span><i className="prr-lg prr-lg-hollow" aria-hidden="true" />Trustpilot rating withheld</span>
      <span><b className="prr-lg-x" aria-hidden="true">×</b>Closed, on the outer orbit</span>
    </div>
  );

  if (variant === 'compact') {
    return (
      <div className="prr prr-is-compact">
        {radar}
        {bands}
        <p className="prr-hint">Angle = market, distance = score. Point at or tap a dot to read the firm, then open its page.</p>
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
              <p>{dot.status} · {dot.sector}</p>
            </div>
          </div>
          <dl className="prr-facts">
            <div><dt>Score band</dt><dd>{BAND_LABEL[dot.tone]}</dd></div>
            <div><dt>Trustpilot</dt><dd>{dot.trustpilot}</dd></div>
            <div><dt>Last review</dt><dd>{daysAgo(dot.reviewed)}</dd></div>
            <div><dt>Market</dt><dd>{dot.sector}</dd></div>
          </dl>
          <Link className="pr-link" href={`/firm/${dot.slug}`}>Open the {shortName(dot.name)} profile <span aria-hidden="true">→</span></Link>
        </div>
      );
    }
    if (focus?.kind === 'closed') {
      return (
        <div className="prr-detail">
          <h3 className="prr-detail-title">{focus.firm.name}</h3>
          <p className="prr-detail-sub">Closed{focus.firm.closed ? ` · reported ${focus.firm.closed}` : ' · closure date not stated'}</p>
          <Link className="pr-link" href={`/firm/${focus.firm.slug}`}>Read the closure record <span aria-hidden="true">→</span></Link>
        </div>
      );
    }
    if (sector !== null) {
      const s = data.sectors[sector];
      return (
        <div className="prr-detail">
          <h3 className="prr-detail-title">{s.key}</h3>
          <p className="prr-detail-sub">{s.count} open firm{s.count === 1 ? '' : 's'} · average score {s.average}</p>
          <ol className="prr-top">
            {s.top.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                <b className={`prr-${firm.tone}-text`}>{firm.score}</b>
              </li>
            ))}
          </ol>
        </div>
      );
    }
    return (
      <div className="prr-detail">
        <p className="prr-detail-hint">
          Point at a dot to read the firm, at a slice to read its market, or click a slice to keep it in focus. The sweep names
          each firm scoring 75+ as it passes.
        </p>
      </div>
    );
  })();

  return (
    <div className={`prr prr-is-full${intro ? ' has-intro' : ''}`}>
      {intro ? <div className="prr-intro">{intro}</div> : null}
      <div className="prr-main">
        <div className="prr-chips" role="group" aria-label="Markets">
          <button type="button" aria-pressed={lockedSector === null} onClick={() => { setLockedSector(null); closeSheet(); }}>All markets</button>
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
              {s.key} <small>{s.count}</small>
            </button>
          ))}
        </div>
        {radar}
        {legend}
      </div>
      <aside className="prr-side" aria-label="Radar controls">
        <label className="prr-search">
          <span className="sr-only">Find a firm on the radar</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m13.5 13.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <input
            type="search"
            list="prr-names"
            placeholder="Find a firm: FTMO, Topstep…"
            value={query}
            onChange={(event) => onSearch(event.target.value)}
            autoComplete="off"
          />
        </label>
        <datalist id="prr-names">
          {names.map((name) => <option key={name} value={name} />)}
        </datalist>
        {bands}
        <div className="prr-sectors" role="group" aria-label="Markets">
          {data.sectors.map((s, index) => (
            <button
              key={s.key}
              type="button"
              className="prr-sec"
              aria-pressed={lockedSector === index}
              onClick={() => {
                setPinned(false);
                setFocus(null);
                setLockedSector((current) => (current === index ? null : index));
              }}
              onMouseEnter={() => setHoverSector(index)}
              onMouseLeave={() => setHoverSector(null)}
            >
              <b>{s.key}</b>
              <small>{s.count} firm{s.count === 1 ? '' : 's'} · avg {s.average}</small>
              <span className="prr-bar" aria-hidden="true"><i style={{ width: ready ? `${Math.max(3, (s.count / Math.max(1, data.dots.length)) * 100)}%` : '0%' }} /></span>
            </button>
          ))}
        </div>
        {card}
      </aside>
      {narrow && pinned && focus ? (
        <>
          <div className="prr-sheet-backdrop" onClick={closeSheet} aria-hidden="true" />
          <div className="prr-sheet" role="dialog" aria-modal="false" aria-label={focus.kind === 'dot' ? focus.dot.name : focus.firm.name}>
            <button type="button" className="prr-sheet-close" onClick={closeSheet} aria-label="Close">×</button>
            {card}
          </div>
        </>
      ) : null}
    </div>
  );
}
