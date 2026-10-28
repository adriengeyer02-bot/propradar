import type { RegulatoryEntity } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { OFFICIAL_LISTS, listMarkers, parseJurisdiction, placeDetail } from '../../lib/jurisdictions';
import Flag from './Flag';

type EntityChainProps = {
  firmName: string;
  entities: RegulatoryEntity[];
};

function shortRole(role?: string) {
  if (!role) return '';
  const text = toEnglishText(role);
  const first = text.split(/(?<=\.)\s/)[0];
  return first.length > 150 ? `${first.slice(0, 147).trimEnd()}…` : first;
}

/**
 * The legal entities behind a firm, drawn as a chain: who runs the brand, who
 * takes the payment, where each company is registered. Country markers come
 * only from official lists; no marker is not an endorsement.
 */
export default function EntityChain({ firmName, entities }: EntityChainProps) {
  if (!entities.length) return null;
  const nodes = entities.map((entity) => {
    const place = parseJurisdiction(entity.jurisdiction);
    return { entity, place, detail: placeDetail(place), markers: listMarkers(place.countries) };
  });
  const countries = [...new Map(nodes.flatMap((n) => n.place.countries).map((c) => [c.code, c])).values()];
  const unidentified = nodes.filter((n) => !n.place.identified).length;
  const flagged = nodes.some((n) => n.markers.length);

  return (
    <figure className="pr-chain" aria-label={`${firmName}: legal entities and where they are registered`}>
      <figcaption className="pr-chain-head">
        <div className="pr-chain-flags" aria-hidden="true">
          {countries.map((c) => (
            <Flag key={c.code} code={c.code} size="sm" />
          ))}
          {unidentified ? <Flag size="sm" /> : null}
        </div>
        <p>
          <strong>
            {entities.length} {entities.length === 1 ? 'entity' : 'entities'}
          </strong>
          {' · '}
          {countries.length ? `${countries.length} ${countries.length === 1 ? 'country' : 'countries'}` : 'no country identified yet'}
          {unidentified && countries.length ? ` · ${unidentified} not identified yet` : ''}
        </p>
      </figcaption>

      <ol className="pr-chain-track">
        {nodes.map(({ entity, place, detail, markers }, index) => (
          <li
            key={`${entity.name}-${entity.jurisdiction}-${index}`}
            className={`pr-chain-node${place.identified ? '' : ' is-unknown'}${markers.length ? ' is-flagged' : ''}`}
          >
            <div className="pr-chain-place">
              <span className="pr-chain-flagset">
                {place.identified ? place.countries.map((c) => <Flag key={c.code} code={c.code} size="lg" />) : <Flag size="lg" />}
              </span>
              <span className="pr-chain-country">
                <strong>{place.identified ? place.countries.map((c) => c.name).join(' / ') : 'Country to verify'}</strong>
                {detail ? <small>{detail}</small> : null}
              </span>
            </div>

            <div className="pr-chain-entity">
              <span className="pr-chain-step">{index + 1}</span>
              <strong>{toEnglishText(entity.name)}</strong>
              {entity.role ? <p title={toEnglishText(entity.role)}>{shortRole(entity.role)}</p> : null}
              {entity.registrationNumber ? <small className="pr-chain-reg">Reg. {entity.registrationNumber}</small> : null}
              {entity.registeredAddress ? <small className="pr-chain-addr">{toEnglishText(entity.registeredAddress)}</small> : null}
            </div>

            <div className="pr-chain-tags">
              {place.countries.some((c) => c.eu) ? <span className="pr-chip">EU member state</span> : null}
              {markers.map((m) => (
                <a key={m.key} className={`pr-chip pr-chip-${m.tone}`} href={m.url} target="_blank" rel="noreferrer" title={`${m.label}, ${m.asOf}`}>
                  {m.short}
                </a>
              ))}
              {place.countries.map((c) =>
                c.regulator ? (
                  c.regulator.url ? (
                    <a
                      key={`reg-${c.code}`}
                      className="pr-chip pr-chip-link"
                      href={c.regulator.url}
                      target="_blank"
                      rel="noreferrer"
                      title={`Financial regulator in ${c.name}`}
                    >
                      Regulator: {c.regulator.name}
                    </a>
                  ) : (
                    <span key={`reg-${c.code}`} className="pr-chip" title={`Financial regulator in ${c.name}`}>
                      Regulator: {c.regulator.name}
                    </span>
                  )
                ) : null,
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="pr-chain-note">
        Country markers only come from official lists: {OFFICIAL_LISTS.fatfGrey.short} ({OFFICIAL_LISTS.fatfGrey.asOf}) and the EU tax lists (
        {OFFICIAL_LISTS.euAnnexI.asOf}).
        {flagged || !countries.length ? '' : ' None of these countries is on them.'} No marker does not mean a country, or a firm, is safe: a regulator link only says who supervises
        financial firms there, not that this firm is licensed. <a href="/audit#jurisdictions">See where all tracked firms are registered →</a>
      </p>
    </figure>
  );
}
