'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import type { RadarData } from '../../lib/radar';
import type { Messages } from '../../lib/messages';
import { localePath, type Locale } from '../../lib/locales';

const FirmGlobe = dynamic(() => import('./FirmGlobe'), { ssr: false, loading: () => <div className="prg prg-loading pr-hg-poster" aria-hidden="true" /> });

type Props = {
  data: RadarData;
  labels: Messages['radar'];
  sectorNames: Messages['sectors'];
  valueNames: Messages['values'];
  tableLabels: Messages['table'];
  locale: Locale;
  radarCta: string;
};

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/**
 * The home-page hero globe: the radar's firms on the PropRadar globe, a
 * search box that turns the globe to a firm, and a floating card for the
 * selected firm. The full radar page keeps the deeper tools.
 */
export default function HomeGlobe({ data, labels: t, sectorNames, valueNames, tableLabels: tb, locale, radarCta }: Props) {
  const firmHref = (slug: string) => localePath(locale, `/firm/${slug}`);
  const radarHref = localePath(locale, '/prop-firm-radar');
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [activeMatch, setActiveMatch] = useState(0);
  const searchId = useId();
  const sectorName = (key: string) => (sectorNames as Record<string, string>)[key] ?? key;
  const valueName = (value: string) => (valueNames as Record<string, string>)[value] ?? value;
  const trustpilotName = (text: string) =>
    text === 'Withheld' ? valueNames.Withheld : text === 'Not checked' ? valueNames['Not checked'] : text.replace(' reviews', ` ${valueNames.reviews}`);

  const dot = selected ? data.dots.find((item) => item.slug === selected) : undefined;
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return data.dots.filter((item) => item.name.toLowerCase().includes(q)).sort((a, b) => b.score - a.score).slice(0, 5);
  }, [query, data.dots]);
  const empty = useMemo(() => new Set<string>(), []);
  const circumference = 2 * Math.PI * 24;
  const searchOpen = query.trim().length >= 2;
  const chooseFirm = (slug: string) => {
    setSelected(slug);
    setQuery('');
    setActiveMatch(0);
  };

  return (
    <div className="pr-hg" onKeyDown={(event) => {
      if (event.key === 'Escape') { setQuery(''); setSelected(null); }
    }}>
      <div className="pr-hg-search" onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setQuery('');
      }}>
        <label>
          <span className="sr-only">{t.findLabel}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={searchOpen}
            aria-controls={`${searchId}-results`}
            aria-activedescendant={searchOpen && matches[activeMatch] ? `${searchId}-${activeMatch}` : undefined}
            autoComplete="off"
            value={query}
            placeholder={t.findPlaceholder}
            onChange={(event) => { setQuery(event.target.value); setActiveMatch(0); }}
            onKeyDown={(event) => {
              if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && matches.length) {
                event.preventDefault();
                const direction = event.key === 'ArrowDown' ? 1 : -1;
                setActiveMatch((index) => (index + direction + matches.length) % matches.length);
              } else if (event.key === 'Enter' && matches[activeMatch]) {
                event.preventDefault();
                chooseFirm(matches[activeMatch].slug);
              }
            }}
          />
        </label>
        {searchOpen ? (
          <ul className="pr-hg-results" id={`${searchId}-results`} role="listbox" aria-label={t.findLabel}>
            {matches.length === 0 ? <li className="pr-hg-empty" role="presentation"><span role="status">{t.globeNoResults}</span></li> : null}
            {matches.map((item, index) => (
              <li key={item.slug} role="presentation">
                <button id={`${searchId}-${index}`} type="button" role="option" aria-selected={activeMatch === index} tabIndex={-1} onMouseEnter={() => setActiveMatch(index)} onClick={() => chooseFirm(item.slug)}>
                  {item.logo ? <img src={item.logo} alt="" width={20} height={20} /> : <i aria-hidden="true" />}
                  <span>{item.name}</span>
                  <b className={`prr-${item.tone}`}>{item.score}</b>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <FirmGlobe
        dots={data.dots}
        sectors={data.sectors}
        sectorName={sectorName}
        selected={selected}
        dimmed={empty}
        highlight={empty}
        onSelect={setSelected}
        ariaLabel={fill(t.globeAria, { total: data.dots.length })}
        hint={t.globeHint}
        scoreLabel={t.score}
        zoomLabels={{ group: t.globeZoom, in: t.zoomIn, out: t.zoomOut, reset: t.zoomReset }}
        motionLabels={{ pause: t.globePause, resume: t.globeResume }}
        legend={{ caption: t.globeNorth, label: t.scoreBand }}
        sphere={0.43}
      />

      {dot ? (
        <div className="pr-hg-card" role="region" aria-label={dot.name} aria-live="polite">
          <button type="button" className="pr-hg-close" onClick={() => setSelected(null)} aria-label={t.close}>
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="pr-hg-card-head">
            {dot.logo ? <img src={dot.logo} alt="" width={44} height={44} /> : null}
            <div>
              <strong>{dot.name}</strong>
              <span>{sectorName(dot.sector)}</span>
            </div>
          </div>
          <div className="pr-hg-card-body">
            <span className="prr-ringbox">
              <svg viewBox="0 0 58 58" aria-hidden="true">
                <circle cx="29" cy="29" r="24" className="prr-ring-track" />
                <circle cx="29" cy="29" r="24" className={`prr-ring-fill prr-${dot.tone}`} strokeDasharray={`${(circumference * dot.score) / 100} ${circumference}`} />
              </svg>
              <b>{dot.score}</b>
            </span>
            <dl>
              <div><dt>{tb.from_}</dt><dd>{valueName(dot.price)}</dd></div>
              <div><dt>{tb.split}</dt><dd>{valueName(dot.split)}</dd></div>
              <div><dt>{t.trustpilot}</dt><dd>{trustpilotName(dot.trustpilot)}</dd></div>
            </dl>
          </div>
          <Link className="btn btn-primary pr-hg-open" href={firmHref(dot.slug)}>{fill(t.openFirmProfile, { name: dot.name })} <span aria-hidden="true">→</span></Link>
        </div>
      ) : null}

      <Link href={radarHref} className="pr-hg-more">{radarCta} <span aria-hidden="true">→</span></Link>
    </div>
  );
}
