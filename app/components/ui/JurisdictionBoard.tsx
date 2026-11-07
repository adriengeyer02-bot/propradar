import Link from 'next/link';
import type { PropFirm, RegulatoryRiskLevel } from '../../lib/propFirms';
import { OFFICIAL_LISTS, listMarkers, parseJurisdiction, type Jurisdiction } from '../../lib/jurisdictions';
import { legalTone } from '../../lib/riskTone';
import { countryLabel, localePath, type Locale } from '../../lib/locales';
import type { JurisdictionLabels } from '../../lib/messages/pages/audit/en';
import Flag from './Flag';

type Row = {
  country: Jurisdiction;
  entities: number;
  firms: PropFirm[];
};

const VISIBLE = 10;
const LEVELS: RegulatoryRiskLevel[] = ['Low', 'Low to medium', 'Medium', 'Medium to high', 'High', 'Critical', 'To audit'];

const EN_LABELS: JurisdictionLabels = {
  firm: 'firm',
  firms: 'firms',
  entity: 'entity',
  entities: 'entities',
  barAria: 'Legal files of these firms: {list}',
  heavy: '{count} with a High or Critical legal file',
  noHeavy: 'No High or Critical legal file',
  noRegulator: 'No regulator listed',
  seeFirms: 'See the firms',
  compareFirms: 'Compare these firms →',
  legendLow: 'Low legal file',
  legendMedium: 'Medium or to audit',
  legendHigh: 'High or Critical',
  showMore: 'Show {count} more countries',
  noteUnknownOne: '{count} more entity across {firms} firms has no country identified yet.',
  noteUnknown: '{count} more entities across {firms} firms have no country identified yet.',
  noteBar: 'The bar shows the legal-file level PropRadar published for each firm registered there, not a rating of the country.',
  noteMarkers: 'Official-list markers: {list}.',
  noteNone: 'None of these countries is on the {fatf} list ({fatfDate}) or the {eu} ({euDate}).',
};

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

function buildRows(firms: PropFirm[]) {
  const rows = new Map<string, Row>();
  let unknownEntities = 0;
  const unknownFirms = new Set<string>();
  for (const firm of firms) {
    for (const entity of firm.regulatoryAudit.entities) {
      const place = parseJurisdiction(entity.jurisdiction);
      if (!place.identified) {
        unknownEntities += 1;
        unknownFirms.add(firm.slug);
        continue;
      }
      for (const country of place.countries) {
        const row = rows.get(country.code) ?? { country, entities: 0, firms: [] };
        row.entities += 1;
        if (!row.firms.includes(firm)) row.firms.push(firm);
        rows.set(country.code, row);
      }
    }
  }
  const sorted = [...rows.values()].sort((a, b) => b.firms.length - a.firms.length || b.entities - a.entities || a.country.name.localeCompare(b.country.name));
  return { rows: sorted, unknownEntities, unknownFirms: unknownFirms.size };
}

type JurisdictionBoardProps = {
  firms: PropFirm[];
  /** Interface strings (English by default). */
  labels?: JurisdictionLabels;
  /** Translations of legal levels (Low, High...), keyed by their English text. */
  values?: Record<string, string>;
  locale?: Locale;
};

/**
 * Where the tracked firms register their companies. The coloured bar is the
 * legal-file level PropRadar already published for each firm (sourced firm by
 * firm); country markers only come from official lists.
 */
export default function JurisdictionBoard({ firms, labels = EN_LABELS, values, locale = 'en' }: JurisdictionBoardProps) {
  const { rows, unknownEntities, unknownFirms } = buildRows(firms);
  const listed = rows.filter((r) => r.country.lists?.length);
  const onBlackOrGrey = rows.some((r) => r.country.lists?.some((k) => k === 'fatfGrey' || k === 'euAnnexI'));
  const v = (value: string) => values?.[value] ?? value;
  const name = (country: Jurisdiction) => countryLabel(locale, country.code, country.name);
  const L = (path: string) => localePath(locale, path);

  const renderTile = ({ country, entities, firms: countryFirms }: Row) => {
    const counts = LEVELS.map((level) => ({ level, n: countryFirms.filter((f) => f.regulatoryAudit.riskLevel === level).length })).filter((x) => x.n);
    const heavy = countryFirms.filter((f) => f.regulatoryAudit.riskLevel === 'High' || f.regulatoryAudit.riskLevel === 'Critical').length;
    const markers = listMarkers([country]);
    return (
      <li key={country.code} className={`pr-juris-tile${markers.length ? ' is-flagged' : ''}`}>
        <div className="pr-juris-top">
          <Flag code={country.code} size="lg" />
          <div>
            <strong>{name(country)}</strong>
            <small>
              {countryFirms.length} {countryFirms.length === 1 ? labels.firm : labels.firms} · {entities} {entities === 1 ? labels.entity : labels.entities}
            </small>
          </div>
        </div>

        <div className="pr-juris-bar" role="img" aria-label={fill(labels.barAria, { list: counts.map((c) => `${c.n} ${v(c.level)}`).join(', ') })}>
          {counts.map((c) => (
            <span key={c.level} className={`pr-tone-${legalTone(c.level)}`} style={{ flexGrow: c.n }} title={`${c.n} × ${v(c.level)}`} />
          ))}
        </div>
        <p className="pr-juris-stat">{heavy ? fill(labels.heavy, { count: heavy }) : labels.noHeavy}</p>

        <div className="pr-chain-tags">
          {country.eu ? <span className="pr-chip">EU</span> : null}
          {markers.map((m) => (
            <a key={m.key} className={`pr-chip pr-chip-${m.tone}`} href={m.url} target="_blank" rel="noreferrer" title={`${m.label}, ${m.asOf}`}>
              {m.short}
            </a>
          ))}
          {country.regulator ? (
            country.regulator.url ? (
              <a className="pr-chip pr-chip-link" href={country.regulator.url} target="_blank" rel="noreferrer">
                {country.regulator.name}
              </a>
            ) : (
              <span className="pr-chip">{country.regulator.name}</span>
            )
          ) : (
            <span className="pr-chip">{labels.noRegulator}</span>
          )}
        </div>

        <details className="pr-juris-firms">
          <summary>{labels.seeFirms}</summary>
          <Link className="pr-juris-compare" href={`${L('/prop-firm-comparison')}?country=${country.code}`}>
            {labels.compareFirms}
          </Link>
          <ul>
            {countryFirms
              .slice()
              .sort((a, b) => b.score - a.score)
              .map((f) => (
                <li key={f.slug}>
                  <Link href={L(`/firm/${f.slug}#regulatory`)}>{f.name}</Link>
                  <span className={`pr-juris-level pr-tone-${legalTone(f.regulatoryAudit.riskLevel)}`}>{v(f.regulatoryAudit.riskLevel)}</span>
                </li>
              ))}
          </ul>
        </details>
      </li>
    );
  };

  return (
    <div className="pr-juris">
      <p className="pr-juris-legend" aria-hidden="true">
        <span className="pr-tone-good">{labels.legendLow}</span>
        <span className="pr-tone-watch">{labels.legendMedium}</span>
        <span className="pr-tone-risk">{labels.legendHigh}</span>
      </p>
      <ul className="pr-juris-grid">{rows.slice(0, VISIBLE).map(renderTile)}</ul>
      {rows.length > VISIBLE ? (
        <details className="pr-juris-more">
          <summary>{fill(labels.showMore, { count: rows.length - VISIBLE })}</summary>
          <ul className="pr-juris-grid">{rows.slice(VISIBLE).map(renderTile)}</ul>
        </details>
      ) : null}

      <p className="pr-chain-note">
        {fill(unknownEntities === 1 ? labels.noteUnknownOne : labels.noteUnknown, { count: unknownEntities, firms: unknownFirms })} {labels.noteBar}
        {listed.length
          ? ` ${fill(labels.noteMarkers, { list: listed.map((r) => `${name(r.country)}: ${r.country.lists!.map((k) => OFFICIAL_LISTS[k].short).join(', ')}`).join('; ') })}`
          : ''}{' '}
        {onBlackOrGrey
          ? null
          : fill(labels.noteNone, {
              fatf: OFFICIAL_LISTS.fatfGrey.short,
              fatfDate: OFFICIAL_LISTS.fatfGrey.asOf,
              eu: OFFICIAL_LISTS.euAnnexI.short,
              euDate: OFFICIAL_LISTS.euAnnexI.asOf,
            })}
      </p>
    </div>
  );
}
