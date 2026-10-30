import type { RegulatoryEntity } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { OFFICIAL_LISTS, listMarkers, parseJurisdiction, placeDetail } from '../../lib/jurisdictions';
import Flag from './Flag';
import en, { type Messages } from '../../lib/messages/en';
import { countryLabel, type Locale } from '../../lib/locales';

type ChainLabels = Messages['firm']['chain'];
const fill = (template: string, values: Record<string, string | number>) => template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));

type EntityChainProps = {
  firmName: string;
  entities: RegulatoryEntity[];
  labels?: ChainLabels;
  auditHref?: string;
  locale?: Locale;
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
export default function EntityChain({ firmName, entities, labels: t = en.firm.chain, auditHref = '/audit#jurisdictions', locale = 'en' }: EntityChainProps) {
  const cname = (c: { code: string; name: string }) => countryLabel(locale, c.code, c.name);
  if (!entities.length) return null;
  const nodes = entities.map((entity) => {
    const place = parseJurisdiction(entity.jurisdiction);
    return { entity, place, detail: placeDetail(place), markers: listMarkers(place.countries) };
  });
  const countries = [...new Map(nodes.flatMap((n) => n.place.countries).map((c) => [c.code, c])).values()];
  const unidentified = nodes.filter((n) => !n.place.identified).length;
  const flagged = nodes.some((n) => n.markers.length);

  return (
    <figure className="pr-chain" aria-label={fill(t.aria, { name: firmName })}>
      <figcaption className="pr-chain-head">
        <div className="pr-chain-flags" aria-hidden="true">
          {countries.map((c) => (
            <Flag key={c.code} code={c.code} size="sm" />
          ))}
          {unidentified ? <Flag size="sm" /> : null}
        </div>
        <p>
          <strong>
            {entities.length} {entities.length === 1 ? t.entity : t.entities}
          </strong>
          {' · '}
          {countries.length ? `${countries.length} ${countries.length === 1 ? t.country : t.countries}` : t.noCountry}
          {unidentified && countries.length ? ` · ${fill(t.notIdentified, { n: unidentified })}` : ''}
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
                <strong>{place.identified ? place.countries.map((c) => cname(c)).join(' / ') : t.countryVerify}</strong>
                {detail ? <small>{detail}</small> : null}
              </span>
            </div>

            <div className="pr-chain-entity">
              <span className="pr-chain-step">{index + 1}</span>
              <strong>{toEnglishText(entity.name)}</strong>
              {entity.role ? <p title={toEnglishText(entity.role)}>{shortRole(entity.role)}</p> : null}
              {entity.registrationNumber ? <small className="pr-chain-reg">{t.reg} {entity.registrationNumber}</small> : null}
              {entity.registeredAddress ? <small className="pr-chain-addr">{toEnglishText(entity.registeredAddress)}</small> : null}
            </div>

            <div className="pr-chain-tags">
              {place.countries.some((c) => c.eu) ? <span className="pr-chip">{t.eu}</span> : null}
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
                      title={fill(t.regulatorTitle, { country: cname(c) })}
                    >
                      {fill(t.regulator, { name: c.regulator.name })}
                    </a>
                  ) : (
                    <span key={`reg-${c.code}`} className="pr-chip" title={fill(t.regulatorTitle, { country: cname(c) })}>
                      {fill(t.regulator, { name: c.regulator.name })}
                    </span>
                  )
                ) : null,
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="pr-chain-note">
        {fill(t.note, { fatf: OFFICIAL_LISTS.fatfGrey.short, fatfDate: OFFICIAL_LISTS.fatfGrey.asOf, euDate: OFFICIAL_LISTS.euAnnexI.asOf })}
        {flagged || !countries.length ? '' : countries.length === 1 ? t.notOnOne : t.notOnMany}
        {t.noteTail} <a href={auditHref}>{t.seeAll}</a>
      </p>
    </figure>
  );
}
