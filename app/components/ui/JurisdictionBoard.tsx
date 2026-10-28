import Link from 'next/link';
import type { PropFirm, RegulatoryRiskLevel } from '../../lib/propFirms';
import { OFFICIAL_LISTS, listMarkers, parseJurisdiction, type Jurisdiction } from '../../lib/jurisdictions';
import { legalTone } from '../../lib/riskTone';
import Flag from './Flag';

type Row = {
  country: Jurisdiction;
  entities: number;
  firms: PropFirm[];
};

const VISIBLE = 10;
const LEVELS: RegulatoryRiskLevel[] = ['Low', 'Low to medium', 'Medium', 'Medium to high', 'High', 'Critical', 'To audit'];

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

/**
 * Where the tracked firms register their companies. The coloured bar is the
 * legal-file level PropRadar already published for each firm (sourced firm by
 * firm); country markers only come from official lists.
 */
export default function JurisdictionBoard({ firms }: { firms: PropFirm[] }) {
  const { rows, unknownEntities, unknownFirms } = buildRows(firms);
  const listed = rows.filter((r) => r.country.lists?.length);
  const onBlackOrGrey = rows.some((r) => r.country.lists?.some((k) => k === 'fatfGrey' || k === 'euAnnexI'));

  const renderTile = ({ country, entities, firms: countryFirms }: Row) => {
    const counts = LEVELS.map((level) => ({ level, n: countryFirms.filter((f) => f.regulatoryAudit.riskLevel === level).length })).filter((x) => x.n);
    const heavy = countryFirms.filter((f) => f.regulatoryAudit.riskLevel === 'High' || f.regulatoryAudit.riskLevel === 'Critical').length;
    const markers = listMarkers([country]);
    return (
      <li key={country.code} className={`pr-juris-tile${markers.length ? ' is-flagged' : ''}`}>
        <div className="pr-juris-top">
          <Flag code={country.code} size="lg" />
          <div>
            <strong>{country.name}</strong>
            <small>
              {countryFirms.length} {countryFirms.length === 1 ? 'firm' : 'firms'} · {entities} {entities === 1 ? 'entity' : 'entities'}
            </small>
          </div>
        </div>

        <div className="pr-juris-bar" role="img" aria-label={`Legal files of these firms: ${counts.map((c) => `${c.n} ${c.level}`).join(', ')}`}>
          {counts.map((c) => (
            <span key={c.level} className={`pr-tone-${legalTone(c.level)}`} style={{ flexGrow: c.n }} title={`${c.n} × ${c.level}`} />
          ))}
        </div>
        <p className="pr-juris-stat">
          {heavy ? (
            <>
              <strong>{heavy}</strong> with a High or Critical legal file
            </>
          ) : (
            'No High or Critical legal file'
          )}
        </p>

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
            <span className="pr-chip">No regulator listed</span>
          )}
        </div>

        <details className="pr-juris-firms">
          <summary>See the firms</summary>
          <ul>
            {countryFirms
              .slice()
              .sort((a, b) => b.score - a.score)
              .map((f) => (
                <li key={f.slug}>
                  <Link href={`/firm/${f.slug}#regulatory`}>{f.name}</Link>
                  <span className={`pr-juris-level pr-tone-${legalTone(f.regulatoryAudit.riskLevel)}`}>{f.regulatoryAudit.riskLevel}</span>
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
        <span className="pr-tone-good">Low legal file</span>
        <span className="pr-tone-watch">Medium or to audit</span>
        <span className="pr-tone-risk">High or Critical</span>
      </p>
      <ul className="pr-juris-grid">{rows.slice(0, VISIBLE).map(renderTile)}</ul>
      {rows.length > VISIBLE ? (
        <details className="pr-juris-more">
          <summary>Show {rows.length - VISIBLE} more countries</summary>
          <ul className="pr-juris-grid">{rows.slice(VISIBLE).map(renderTile)}</ul>
        </details>
      ) : null}

      <p className="pr-chain-note">
        {unknownEntities} more {unknownEntities === 1 ? 'entity' : 'entities'} across {unknownFirms} firms {unknownEntities === 1 ? 'has' : 'have'} no country
        identified yet. The bar shows the legal-file level PropRadar published for each firm registered there, not a rating of the country.
        {listed.length
          ? ` Official-list markers: ${listed.map((r) => `${r.country.name}: ${r.country.lists!.map((k) => OFFICIAL_LISTS[k].short).join(', ')}`).join('; ')}.`
          : ''}{' '}
        {onBlackOrGrey
          ? null
          : `None of these countries is on the ${OFFICIAL_LISTS.fatfGrey.short} list (${OFFICIAL_LISTS.fatfGrey.asOf}) or the ${OFFICIAL_LISTS.euAnnexI.short} (${OFFICIAL_LISTS.euAnnexI.asOf}).`}
      </p>
    </div>
  );
}
