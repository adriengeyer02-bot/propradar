'use client';

import Link from 'next/link';
import FirmLogo from '../../components/FirmLogo';
import GuideCover, { type CoverLabels } from '../../components/guide-visuals/GuideCover';
import type { GuideCoverData } from '../../lib/guideCovers';
import { useMemo, useState } from 'react';
import type { Messages } from '../../lib/messages';

export type GuideLibraryLabels = Messages['guide']['library'] & { levels: Record<GuideLevel, string>; recentlyUpdated: string };

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));

export type GuideType = 'selection' | 'comparison' | 'rules' | 'risk' | 'style' | 'deals';
export type GuideLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type GuideFocus = 'Payout' | 'Legal' | 'Community';

export type GuideLibraryItem = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  type: GuideType;
  typeLabel: string;
  level: GuideLevel;
  focuses: GuideFocus[];
  firmCount: number;
  deepSourceCount: number;
  payoutWatchCount: number;
  updatedIso: string;
  updatedLabel: string;
  recentlyUpdated: boolean;
  mark: string;
  /** Up to four linked firms, shown as logos instead of a stock image. */
  firms: { slug: string; name: string; logoDomain?: string }[];
  keywords: string[];
  /** Data-driven cover drawn from the firm files (see lib/guideCovers). */
  cover: GuideCoverData;
};

export function GuideLogoStrip({ firms, total, label = '{count} linked firms, including {names}' }: { firms: GuideLibraryItem['firms']; total: number; label?: string }) {
  if (!firms.length) return null;
  return (
    <span className="pr-logo-strip" aria-label={fill(label, { count: total, names: firms.map((firm) => firm.name).join(', ') })}>
      {firms.map((firm) => <FirmLogo key={firm.slug} name={firm.name} logoDomain={firm.logoDomain} size="sm" />)}
      {total > firms.length ? <span className="pr-logo-strip-more">+{total - firms.length}</span> : null}
    </span>
  );
}

function typeFilters(l: GuideLibraryLabels): Array<{ value: 'all' | GuideType; label: string }> {
  return [
    { value: 'all', label: l.typeAll },
    { value: 'selection', label: l.typeSelection },
    { value: 'comparison', label: l.typeComparison },
    { value: 'rules', label: l.typeRules },
    { value: 'risk', label: l.typeRisk },
    { value: 'style', label: l.typeStyle },
    { value: 'deals', label: l.typeDeals },
  ];
}

function normalized(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export default function GuideLibrary({ guides, labels: l, coverLabels }: { guides: GuideLibraryItem[]; labels: GuideLibraryLabels; coverLabels?: CoverLabels }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'all' | GuideType>('all');
  const [level, setLevel] = useState<'all' | GuideLevel>('all');
  const [focus, setFocus] = useState<'all' | GuideFocus>('all');

  const filteredGuides = useMemo(() => {
    const search = normalized(query);

    return guides.filter((guide) => {
      const matchesQuery = !search || normalized([
        guide.title,
        guide.description,
        guide.eyebrow,
        guide.typeLabel,
        guide.level,
        l.levels[guide.level],
        ...guide.focuses,
        ...guide.keywords,
      ].join(' ')).includes(search);
      const matchesType = type === 'all' || guide.type === type;
      const matchesLevel = level === 'all' || guide.level === level;
      const matchesFocus = focus === 'all' || guide.focuses.includes(focus);

      return matchesQuery && matchesType && matchesLevel && matchesFocus;
    });
  }, [focus, guides, level, query, type]);

  const activeFilterCount = [query.trim(), type !== 'all', level !== 'all', focus !== 'all'].filter(Boolean).length;

  function resetFilters() {
    setQuery('');
    setType('all');
    setLevel('all');
    setFocus('all');
  }

  return (
    <section className="section guide-library-section" id="all-guides" aria-labelledby="guide-library-title">
      <div className="section-heading guide-library-heading">
        <div>
          <div className="eyebrow">{l.eyebrow}</div>
          <h2 id="guide-library-title">{l.title}</h2>
        </div>
        <p className="section-note">{l.note}</p>
      </div>

      <div className="guide-filter-panel">
        <div className="guide-filter-toolbar">
          <label className="guide-search-field" htmlFor="guide-search">
            <span>{l.searchLabel}</span>
            <input
              id="guide-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={l.searchPlaceholder}
            />
          </label>

          <label className="guide-select-field" htmlFor="guide-level">
            <span>{l.level}</span>
            <select id="guide-level" value={level} onChange={(event) => setLevel(event.target.value as 'all' | GuideLevel)}>
              <option value="all">{l.allLevels}</option>
              <option value="Beginner">{l.levels.Beginner}</option>
              <option value="Intermediate">{l.levels.Intermediate}</option>
              <option value="Advanced">{l.levels.Advanced}</option>
            </select>
          </label>

          <label className="guide-select-field" htmlFor="guide-focus">
            <span>{l.focus}</span>
            <select id="guide-focus" value={focus} onChange={(event) => setFocus(event.target.value as 'all' | GuideFocus)}>
              <option value="all">{l.allEvidence}</option>
              <option value="Payout">{l.focusPayout}</option>
              <option value="Legal">{l.focusLegal}</option>
              <option value="Community">{l.focusCommunity}</option>
            </select>
          </label>
        </div>

        <div className="guide-type-filter-row" aria-label={l.filterAria}>
          {typeFilters(l).map((item) => (
            <button
              key={item.value}
              type="button"
              className={`guide-type-filter ${type === item.value ? 'guide-type-filter-active' : ''}`}
              onClick={() => setType(item.value)}
              aria-pressed={type === item.value}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="guide-results-status" aria-live="polite">
          <div>
            <strong>{fill(filteredGuides.length === 1 ? l.countOne : l.countMany, { count: filteredGuides.length })}</strong>
            <span>{activeFilterCount ? fill(activeFilterCount === 1 ? l.activeOne : l.activeMany, { count: activeFilterCount }) : l.complete}</span>
          </div>
          {activeFilterCount ? <button type="button" onClick={resetFilters}>{l.reset}</button> : null}
        </div>
      </div>

      {filteredGuides.length ? (
        <div className="guide-library-grid">
          {filteredGuides.map((guide) => (
            <Link href={guide.path} className={`guide-library-card guide-theme-${guide.type}`} key={guide.path}>
              <GuideCover data={guide.cover} uid="lib" className="guide-card-cover" labels={coverLabels} />
              <div className="guide-library-card-head">
                <div>
                  <span className="guide-card-type">{guide.typeLabel}</span>
                  <small>{l.levels[guide.level]}</small>
                </div>
                {guide.recentlyUpdated ? <span className="guide-updated-badge">{l.recentlyUpdated}</span> : null}
              </div>

              <h3 className="guide-library-card-title">{guide.title}</h3>
              <GuideLogoStrip firms={guide.firms} total={guide.firmCount} label={l.logoStrip} />

              <div className="guide-library-card-metrics" aria-label={fill(l.coverage, { title: guide.title })}>
                <span><strong>{guide.firmCount}</strong> {l.linkedFirms}</span>
                <span><strong>{guide.deepSourceCount}</strong> {l.deepFiles}</span>
                <span className={guide.payoutWatchCount ? 'guide-metric-watch' : ''}>
                  <strong>{guide.payoutWatchCount}</strong> {l.payoutWatch}
                </span>
              </div>

              <div className="guide-library-card-foot">
                <span>{fill(l.updated, { date: guide.updatedLabel })}</span>
                <strong>{l.open} <span aria-hidden="true">&#8594;</span></strong>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="guide-library-empty">
          <strong>{l.emptyTitle}</strong>
          <span>{l.emptyText}</span>
          <button type="button" className="btn" onClick={resetFilters}>{l.reset}</button>
        </div>
      )}
    </section>
  );
}
