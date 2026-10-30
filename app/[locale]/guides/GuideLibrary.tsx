'use client';

import Link from 'next/link';
import FirmLogo from '../../components/FirmLogo';
import GuideCover from '../../components/guide-visuals/GuideCover';
import type { GuideCoverData } from '../../lib/guideCovers';
import { useMemo, useState } from 'react';

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

export function GuideLogoStrip({ firms, total }: { firms: GuideLibraryItem['firms']; total: number }) {
  if (!firms.length) return null;
  return (
    <span className="pr-logo-strip" aria-label={`${total} linked firms, including ${firms.map((firm) => firm.name).join(', ')}`}>
      {firms.map((firm) => <FirmLogo key={firm.slug} name={firm.name} logoDomain={firm.logoDomain} size="sm" />)}
      {total > firms.length ? <span className="pr-logo-strip-more">+{total - firms.length}</span> : null}
    </span>
  );
}

const typeFilters: Array<{ value: 'all' | GuideType; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'selection', label: 'Selection' },
  { value: 'comparison', label: 'Comparisons' },
  { value: 'rules', label: 'Rules' },
  { value: 'risk', label: 'Risks' },
  { value: 'style', label: 'Trading styles' },
  { value: 'deals', label: 'Deals' },
];

function normalized(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export default function GuideLibrary({ guides }: { guides: GuideLibraryItem[] }) {
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
          <div className="eyebrow">All guides</div>
          <h2 id="guide-library-title">Find the guide that answers your next decision.</h2>
        </div>
        <p className="section-note">Search by question, then narrow the library by topic, experience level or evidence focus.</p>
      </div>

      <div className="guide-filter-panel">
        <div className="guide-filter-toolbar">
          <label className="guide-search-field" htmlFor="guide-search">
            <span>Search the guides</span>
            <input
              id="guide-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try payout, Topstep, news trading..."
            />
          </label>

          <label className="guide-select-field" htmlFor="guide-level">
            <span>Level</span>
            <select id="guide-level" value={level} onChange={(event) => setLevel(event.target.value as 'all' | GuideLevel)}>
              <option value="all">All levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>

          <label className="guide-select-field" htmlFor="guide-focus">
            <span>Evidence focus</span>
            <select id="guide-focus" value={focus} onChange={(event) => setFocus(event.target.value as 'all' | GuideFocus)}>
              <option value="all">All evidence</option>
              <option value="Payout">Payout</option>
              <option value="Legal">Legal</option>
              <option value="Community">Community signals</option>
            </select>
          </label>
        </div>

        <div className="guide-type-filter-row" aria-label="Filter guides by type">
          {typeFilters.map((item) => (
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
            <strong>{filteredGuides.length} guide{filteredGuides.length === 1 ? '' : 's'}</strong>
            <span>{activeFilterCount ? `${activeFilterCount} active filter${activeFilterCount === 1 ? '' : 's'}` : 'Complete research library'}</span>
          </div>
          {activeFilterCount ? <button type="button" onClick={resetFilters}>Reset filters</button> : null}
        </div>
      </div>

      {filteredGuides.length ? (
        <div className="guide-library-grid">
          {filteredGuides.map((guide) => (
            <Link href={guide.path} className={`guide-library-card guide-theme-${guide.type}`} key={guide.path}>
              <GuideCover data={guide.cover} uid="lib" className="guide-card-cover" />
              <div className="guide-library-card-head">
                <div>
                  <span className="guide-card-type">{guide.typeLabel}</span>
                  <small>{guide.level}</small>
                </div>
                {guide.recentlyUpdated ? <span className="guide-updated-badge">Recently updated</span> : null}
              </div>

              <h3 className="guide-library-card-title">{guide.title}</h3>
              <GuideLogoStrip firms={guide.firms} total={guide.firmCount} />

              <div className="guide-library-card-metrics" aria-label={`${guide.title} coverage`}>
                <span><strong>{guide.firmCount}</strong> linked firms</span>
                <span><strong>{guide.deepSourceCount}</strong> deep files</span>
                <span className={guide.payoutWatchCount ? 'guide-metric-watch' : ''}>
                  <strong>{guide.payoutWatchCount}</strong> payout watch
                </span>
              </div>

              <div className="guide-library-card-foot">
                <span>Updated {guide.updatedLabel}</span>
                <strong>Open guide <span aria-hidden="true">&#8594;</span></strong>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="guide-library-empty">
          <strong>No guide matches these filters.</strong>
          <span>Try a broader search or reset the topic, level and evidence focus.</span>
          <button type="button" className="btn" onClick={resetFilters}>Reset filters</button>
        </div>
      )}
    </section>
  );
}
