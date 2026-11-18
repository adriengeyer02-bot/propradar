'use client';

import Link from 'next/link';
import { useId, useState, type CSSProperties } from 'react';
import type { RadarDot } from '../../lib/radar';
import type { Messages } from '../../lib/messages';
import { countryLabel, localePath, type Locale } from '../../lib/locales';

export type GlobeHudConfig = {
  locale: Locale;
  labels: Messages['radar']['globeHud'];
  values: Messages['values'];
  fromLabel: string;
  splitLabel: string;
  reviewLabel: string;
  trustpilotLabel: string;
  openLabel: string;
  closeLabel: string;
  onDismiss: () => void;
  unratedLabel?: string;
};

type Props = {
  dot: RadarDot;
  sector: string;
  scoreLabel: string;
  pinned: boolean;
  config: GlobeHudConfig;
  onClose: () => void;
};

function fill(template: string, value: number) {
  return template.replace('{pct}', String(value));
}

/** A real firm dossier, revealed once per firm; decorative animation never changes its data. */
export default function GlobeFirmHud({ dot, sector, scoreLabel, pinned, config, onClose }: Props) {
  const id = useId();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const { labels: t, locale } = config;
  const translate = (value: string) => (config.values as Record<string, string>)[value] ?? value;
  const profile = localePath(locale, dot.href ?? `/firm/${dot.slug}`);
  const offer = dot.offer;
  const trustpilot = translate(dot.trustpilot.split(' · ')[0]);
  const dealTitle = offer?.percent
    ? fill(offer.scope === 'new' ? t.offerNew : offer.scope === 'first' ? t.offerFirst : offer.scope === 'all' ? t.offerAll : t.offerSelected, offer.percent)
    : t.offer;
  const date = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${dot.reviewed.slice(0, 10)}T12:00:00Z`));

  async function copyCode() {
    if (!offer?.code) return;
    try {
      await navigator.clipboard.writeText(offer.code);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <section className="prg-hud" aria-labelledby={id}>
      <span className="prg-hud-corners" aria-hidden="true" />
      <span className="prg-hud-scan" aria-hidden="true" />
      <div className="prg-hud-top prg-hud-reveal" style={{ '--reveal-delay': '50ms' } as CSSProperties}>
        <span><i aria-hidden="true" />{pinned ? t.locked : t.preview}</span>
        <span className="prg-hud-index" aria-hidden="true">PR / {dot.sector === 'Forex & CFD' ? 'FX' : dot.sector.toUpperCase().slice(0, 3)}</span>
      </div>
      <button type="button" className="prg-hud-close" onClick={onClose} aria-label={config.closeLabel}>
        <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg>
      </button>
      <header className="prg-hud-head prg-hud-reveal" style={{ '--reveal-delay': '110ms' } as CSSProperties}>
        {dot.logo ? <img src={dot.logo} alt="" width="36" height="36" /> : <span className="prg-hud-monogram" aria-hidden="true">{dot.name.slice(0, 2).toUpperCase()}</span>}
        <div><h3 id={id}>{dot.name}</h3><p>{sector}</p></div>
      </header>
      <div className="prg-hud-summary prg-hud-reveal" style={{ '--reveal-delay': '180ms' } as CSSProperties}>
        {dot.unrated ? <div className="prg-hud-unrated" role="status">{config.unratedLabel ?? 'Not rated'}</div> : (
          <div className={`prg-hud-score prg-hud-score-${dot.tone}`} style={{ '--score-offset': 151 * (1 - dot.score / 100) } as CSSProperties}>
            <svg viewBox="0 0 58 58" aria-hidden="true"><circle cx="29" cy="29" r="24" /><circle className="prg-hud-meter" cx="29" cy="29" r="24" /></svg>
            <strong aria-hidden="true">{dot.score}<small>/100</small></strong>
            <span className="sr-only">{scoreLabel}: {dot.score}/100</span>
          </div>
        )}
        <dl className="prg-hud-facts">
          {!dot.unrated ? <>
          <div><dt>{config.fromLabel}</dt><dd>{translate(dot.price)}</dd></div>
          <div><dt>{config.splitLabel}</dt><dd>{translate(dot.split)}</dd></div>
          <div><dt>{config.trustpilotLabel}</dt><dd title={dot.trustpilot.replace(' reviews', ` ${config.values.reviews}`)}>{trustpilot}</dd></div>
          </> : <div><dt>{scoreLabel}</dt><dd>{config.unratedLabel ?? 'Not rated'}</dd></div>}
        </dl>
      </div>
      <div className="prg-hud-country prg-hud-reveal" style={{ '--reveal-delay': '260ms' } as CSSProperties}>
        <span className="prg-hud-label">{t.jurisdictions}</span>
        <ul>
          {dot.jurisdictions.length ? dot.jurisdictions.map((place) => (
            <li key={place.code}><img src={`/flags/${place.code}.svg`} alt="" width="18" height="13" />{countryLabel(locale, place.code, place.name)}</li>
          )) : <li className="prg-hud-unknown">{t.unknown}</li>}
        </ul>
      </div>
      {offer ? (
        <div className="prg-hud-deal prg-hud-reveal" style={{ '--reveal-delay': '340ms' } as CSSProperties}>
          <div className="prg-hud-deal-heading"><span className="prg-hud-label">{t.offer}</span><strong>{dealTitle === t.offer ? t.available : dealTitle}</strong></div>
          {offer.code ? <button type="button" className="prg-hud-code" onClick={copyCode} aria-label={`${copied ? t.copied : t.copy}: ${offer.code}`}>
            <code>{offer.code}</code><span>{copied ? '✓' : t.copy}</span>
          </button> : null}
          {copyFailed ? <span role="status" className="prg-hud-copy-status">{t.copyFailed}</span> : <span role="status" className="sr-only">{copied ? t.copied : ''}</span>}
          <small>{t.conditions}</small>
        </div>
      ) : null}
      <footer className="prg-hud-footer prg-hud-reveal" style={{ '--reveal-delay': '420ms' } as CSSProperties}>
        <span>{config.reviewLabel} <time dateTime={dot.reviewed}>{date}</time></span>
        <div>
          <Link href={profile}>{config.openLabel}<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" /></svg></Link>
          {offer?.href ? <a href={offer.href} target="_blank" rel="sponsored noopener noreferrer" className="prg-hud-offer-link">{t.seeOffer}<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" /></svg></a> : null}
        </div>
      </footer>
    </section>
  );
}
