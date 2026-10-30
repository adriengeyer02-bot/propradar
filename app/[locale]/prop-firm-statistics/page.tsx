import type { Metadata } from 'next';
import Link from 'next/link';
import Flag from '../../components/ui/Flag';
import { formatUsd } from '../../lib/propFirms';
import { OFFICIAL_LISTS } from '../../lib/jurisdictions';
import {
  closedFirms,
  closuresByYear,
  countryCounts,
  coverage,
  documentedClosures,
  euEntityFirms,
  feeBuckets,
  feeRows,
  feeStats,
  firmsWithCountry,
  multiCountryFirms,
  openFirms,
  payoutStats,
  splitBuckets,
  splitFirms,
  statsUpdatedAt,
  trustpilotStats,
  undocumentedClosedCount,
  withheldFirms,
} from '../../lib/industryStats';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { HTML_LANG, OG_LOCALE, countryLabel, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, formatDateLong, getMessages, numberLocale } from '../../lib/messages';
import { rich } from '../../lib/rich';

const PATH = '/prop-firm-statistics';
const TITLE = 'Prop Firm Statistics 2026: Closures, Fees, Countries & Reviews';
const TOTAL = openFirms.length + closedFirms.length;

type Props = { params: Promise<{ locale: string }> };

async function pageLocale(params: Props['params']): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : 'en';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await pageLocale(params);
  const st = getMessages(locale).stats;
  const description = fmt(st.metaDescription, { count: TOTAL });
  return {
    title: st.metaTitle,
    description,
    ...(locale === 'en'
      ? { keywords: ['prop firm statistics', 'prop firm industry data', 'prop firms that closed', 'prop firm closures 2024', 'prop firm challenge fees', 'where are prop firms registered'] }
      : {}),
    authors: [{ name: 'PropRadar Research', url: localePath(locale, '/audit') }],
    publisher: SITE_NAME,
    category: 'Prop firm research',
    alternates: localeAlternates(locale, PATH),
    openGraph: {
      title: st.metaTitle,
      description,
      url: `${SITE_URL}${localePath(locale, PATH)}`,
      type: 'article',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      modifiedTime: statsUpdatedAt,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: st.h1 }],
    },
    twitter: { card: 'summary_large_image', title: st.metaTitle, description },
  };
}

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

function Bars({ rows, unit, unitOne, label }: { rows: { label: string; count: number }[]; unit: string; unitOne: string; label: string }) {
  const max = Math.max(1, ...rows.map((row) => row.count));
  return (
    <ul className="pr-stat-bars" aria-label={label}>
      {rows.map((row) => (
        <li key={row.label}>
          <span className="pr-stat-bars-label">{row.label}</span>
          <span className="pr-stat-bars-track" aria-hidden="true">
            <span style={{ width: `${(row.count / max) * 100}%` }} />
          </span>
          <span className="pr-stat-bars-value">
            {row.count} <small>{row.count === 1 ? unitOne : unit}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Anchor({ id, label }: { id: string; label: string }) {
  return (
    <a className="pr-stat-anchor" href={`#${id}`} aria-label={label}>
      #
    </a>
  );
}

function formatDate(date: string, locale: Locale = 'en') {
  if (locale !== 'en') return formatDateLong(locale, date);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}

export default async function PropFirmStatisticsPage({ params }: Props) {
  const locale = await pageLocale(params);
  const t = getMessages(locale);
  const st = t.stats;
  const L = (path: string) => localePath(locale, path);
  const n = (value: number) => value.toLocaleString(numberLocale(locale));
  const cName = (code: string, name: string) => countryLabel(locale, code, name);
  const pageUrl = `${SITE_URL}${L(PATH)}`;
  const all = feeStats();
  const forex = feeStats('Challenge');
  const futures = feeStats('Futures evaluation');
  const instant = feeStats('Instant funding');
  const topCountries = countryCounts.slice(0, 12);
  const listedCountries = countryCounts.filter((row) => row.country.lists?.length);
  const split80to90 = splitFirms.filter((firm) => firm.profitSplit >= 80 && firm.profitSplit <= 90).length;
  const citation = `PropRadar, "${TITLE.split(':')[0]}", ${pageUrl} (data as of ${statsUpdatedAt}).`;
  const median = trustpilotStats.median.toLocaleString(numberLocale(locale), { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const anchor = (id: string) => <Anchor id={id} label={st.anchor} />;
  const b = (value: number | string) => <strong>{typeof value === 'number' ? n(value) : value}</strong>;

  const keyFacts = [
    { id: 'closures', value: n(closedFirms.length), label: st.keyClosedLabel, note: fmt(st.keyClosedNote, { count: documentedClosures.length }) },
    { id: 'fees', value: formatUsd(all.median), label: st.keyFeeLabel, note: fmt(st.keyFeeNote, { count: all.count }) },
    { id: 'countries', value: n(countryCounts.length), label: st.keyCountriesLabel, note: fmt(st.keyCountriesNote, { count: firmsWithCountry.length }) },
    { id: 'trustpilot', value: n(trustpilotStats.withheld), label: st.keyWithheldLabel, note: st.keyWithheldNote },
  ];

  const faq = [
    {
      question: st.faq1Q,
      answer: fmt(st.faq1A, { closed: closedFirms.length, total: TOTAL, documented: documentedClosures.length, y2024: closuresByYear['2024'] ?? 0 }),
    },
    {
      question: st.faq2Q,
      answer: fmt(st.faq2A, { count: all.count, median: formatUsd(all.median), q1: formatUsd(all.q1), q3: formatUsd(all.q3) }),
    },
    {
      question: st.faq3Q,
      answer: fmt(st.faq3A, {
        count: firmsWithCountry.length,
        top: topCountries.slice(0, 5).map((row) => `${cName(row.country.code, row.country.name)} (${row.firms})`).join(', '),
        multi: multiCountryFirms,
      }),
    },
    { question: st.faq4Q, answer: fmt(st.faq4A, { count: splitFirms.length, range: split80to90 }) },
  ];

  const description = fmt(st.metaDescription, { count: TOTAL });
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'PropRadar prop firm statistics',
    description,
    url: pageUrl,
    inLanguage: HTML_LANG[locale],
    creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    dateModified: statsUpdatedAt,
    isAccessibleForFree: true,
    keywords: ['prop firms', 'proprietary trading', 'prop firm closures', 'challenge fees'],
    distribution: [{ '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `${SITE_URL}${PATH}/data.csv` }],
  };
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: st.metaTitle,
    description,
    url: pageUrl,
    inLanguage: HTML_LANG[locale],
    datePublished: '2026-10-29',
    dateModified: statsUpdatedAt,
    author: { '@type': 'Organization', name: 'PropRadar Research', url: `${SITE_URL}/audit` },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.guide.breadcrumbHome, item: `${SITE_URL}${L('/')}` },
      { '@type': 'ListItem', position: 2, name: st.breadcrumb, item: pageUrl },
    ],
  };
  const csv = `${PATH}/data.csv`;

  return (
    <main className="container guide-page pr-stats-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(datasetSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <section className="pr-stats-hero">
        <div className="eyebrow"><span>{rich(st.dataAsOf, { date: <time dateTime={statsUpdatedAt}>{formatDate(statsUpdatedAt, locale)}</time> })}</span></div>
        <h1>{st.h1}</h1>
        <p className="lead">{fmt(st.lead, { count: TOTAL })}</p>
        <div className="actions">
          <a className="btn btn-primary" href={csv} download>{st.download}</a>
          <a className="btn" href="#cite">{st.cite}</a>
        </div>
      </section>

      <section className="pr-stats-keys" aria-label={st.keysAria}>
        {keyFacts.map((fact) => (
          <a key={fact.id} href={`#${fact.id}`} className="pr-stats-key">
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
            <small>{fact.note}</small>
          </a>
        ))}
      </section>

      <section className="pr-stats-section" id="closures" aria-labelledby="closures-title">
        <h2 id="closures-title">{st.closuresTitle} {anchor('closures')}</h2>
        <p>
          {rich(st.closuresText, { closed: b(closedFirms.length), documented: documentedClosures.length })}
          {undocumentedClosedCount > 0
            ? ` ${undocumentedClosedCount === 1 ? st.closuresMoreOne : fmt(st.closuresMore, { count: undocumentedClosedCount })}`
            : ''}{' '}
          {rich(st.closuresScale, {
            link: (
              <a href="https://financemagnates.com/forex/another-prop-firm-announces-closure-in-year-that-saw-50-companies-shutter" target="_blank" rel="noreferrer">
                {st.closuresScaleLink}
              </a>
            ),
          })}
          {locale !== 'en' ? ` ${st.closuresSourceNote}` : ''}
        </p>
        <div className="guide-rule-table-wrap">
          <table className="guide-rule-table pr-stats-table pr-closures-table">
            <thead>
              <tr>
                <th scope="col">{st.thFirm}</th>
                <th scope="col">{st.thDate}</th>
                <th scope="col">{st.thSays}</th>
                <th scope="col">{st.thSource}</th>
              </tr>
            </thead>
            <tbody>
              {documentedClosures.map(({ record, firm }) => (
                <tr key={record.slug}>
                  <th scope="row"><Link href={L(`/firm/${firm.slug}`)}>{firm.name}</Link></th>
                  <td className="pr-nowrap">
                    {record.date ? (
                      <>
                        <time dateTime={record.date}>{formatDate(record.date, locale)}</time>
                        {record.dateKind === 'reported' ? <small className="pr-muted"> {st.reported}</small> : null}
                      </>
                    ) : (
                      <span className="pr-muted">{st.notStated}</span>
                    )}
                  </td>
                  <td lang={locale !== 'en' ? 'en' : undefined}>{record.summary}</td>
                  <td><a href={record.source.url} target="_blank" rel="noreferrer">{record.source.label}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pr-stats-section" id="fees" aria-labelledby="fees-title">
        <h2 id="fees-title">{st.feesTitle} {anchor('fees')}</h2>
        <p>{rich(st.feesText, { count: all.count, q1: b(formatUsd(all.q1)), q3: b(formatUsd(all.q3)), median: b(formatUsd(all.median)) })}</p>
        <div className="pr-stats-grid">
          <Bars rows={feeBuckets} unit={st.unitPrograms} unitOne={st.unitProgram} label={st.feesBarsLabel} />
          <div className="guide-rule-table-wrap">
            <table className="guide-rule-table pr-stats-table">
              <thead>
                <tr><th scope="col">{st.thModel}</th><th scope="col">{st.thPrograms}</th><th scope="col">{st.thLowest}</th><th scope="col">{st.thMedian}</th><th scope="col">{st.thHighest}</th></tr>
              </thead>
              <tbody>
                {([
                  [st.modelForex, forex],
                  [st.modelFutures, futures],
                  [st.modelInstant, instant],
                ] as const).map(([label, stat]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{stat.count}</td>
                    <td>{formatUsd(stat.min)}</td>
                    <td>{formatUsd(stat.median)}</td>
                    <td>{formatUsd(stat.max)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="pr-stats-note">
          {rich(st.feesNote, { link: <Link href={`${L('/prop-firm-challenge')}#compare`}>{st.feesNoteLink}</Link>, count: feeRows.length })}
        </p>
      </section>

      <section className="pr-stats-section" id="profit-split" aria-labelledby="split-title">
        <h2 id="split-title">{st.splitTitle} {anchor('profit-split')}</h2>
        <p>{rich(st.splitText, { count: splitFirms.length, range: b(split80to90) })}</p>
        <Bars rows={splitBuckets} unit={st.unitFirms} unitOne={st.unitFirm} label={st.splitBarsLabel} />
      </section>

      <section className="pr-stats-section" id="countries" aria-labelledby="countries-title">
        <h2 id="countries-title">{st.countriesTitle} {anchor('countries')}</h2>
        <p>
          {rich(st.countriesText, {
            identified: b(firmsWithCountry.length),
            open: openFirms.length,
            countries: countryCounts.length,
            multi: multiCountryFirms,
            eu: euEntityFirms,
          })}
        </p>
        <ol className="pr-stats-countries">
          {topCountries.map(({ country, firms }) => (
            <li key={country.code}>
              <Flag code={country.code} size="md" />
              <Link prefetch={false} href={`${L('/prop-firm-comparison')}?country=${country.code}`}>{cName(country.code, country.name)}</Link>
              <span className="pr-stats-bars-track" aria-hidden="true">
                <span style={{ width: `${(firms / topCountries[0].firms) * 100}%` }} />
              </span>
              <strong>{firms}</strong>
            </li>
          ))}
        </ol>
        <p className="pr-stats-note">
          {fmt(st.countriesNote, {
            fatf: OFFICIAL_LISTS.fatfGrey.short,
            fatfDate: OFFICIAL_LISTS.fatfGrey.asOf,
            euDate: OFFICIAL_LISTS.euAnnexI.asOf,
            list: listedCountries.length
              ? listedCountries
                  .map((row) => `${cName(row.country.code, row.country.name)}: ${row.country.lists!.map((key) => OFFICIAL_LISTS[key].short).join(', ')}`)
                  .join('; ')
              : st.countriesNone,
          })}{' '}
          <Link href={`${L('/audit')}#jurisdictions`}>{st.countriesLink}</Link>.
        </p>
      </section>

      <section className="pr-stats-section" id="trustpilot" aria-labelledby="trustpilot-title">
        <h2 id="trustpilot-title">{st.trustpilotTitle} {anchor('trustpilot')}</h2>
        <p>
          {rich(st.trustpilotText, {
            checked: coverage.trustpilotChecked,
            rated: trustpilotStats.rated,
            median: b(median),
            high: trustpilotStats.atLeast45,
            mid: trustpilotStats.from40to44,
            low: trustpilotStats.below40,
            withheld: b(trustpilotStats.withheld),
          })}
        </p>
        <details className="pr-disclosure">
          <summary>{fmt(st.withheldSummary, { count: withheldFirms.length })}</summary>
          <ul className="pr-stats-chips">
            {withheldFirms.map((firm) => (
              <li key={firm.slug}><Link href={`${L(`/firm/${firm.slug}`)}#audit`}>{firm.name}</Link></li>
            ))}
          </ul>
        </details>
        <p className="pr-stats-note">
          {st.trustpilotNote} <Link href={L('/trustpilot-prop-firms')}>{st.trustpilotLink}</Link>.
        </p>
      </section>

      <section className="pr-stats-section" id="payouts" aria-labelledby="payouts-title">
        <h2 id="payouts-title">{st.payoutsTitle} {anchor('payouts')}</h2>
        <p>{rich(st.payoutsText, { sourced: payoutStats.sourcedSignal, low: payoutStats.lowWithProof, none: b(payoutStats.notAssessed) })}</p>
        <p className="pr-stats-note">
          <Link href={L('/prop-firm-payout-risk')}>{st.payoutsLink}</Link>.
        </p>
      </section>

      <section className="pr-stats-section" id="method" aria-labelledby="method-title">
        <h2 id="method-title">{st.methodTitle} {anchor('method')}</h2>
        <ul className="pr-rule-list">
          <li>{fmt(st.method1, { open: openFirms.length, closed: closedFirms.length })}</li>
          <li>{fmt(st.method2, { split: coverage.splitRead, country: coverage.countryIdentified, trustpilot: coverage.trustpilotChecked })}</li>
          <li>{st.method3}</li>
          <li>{st.method4}</li>
        </ul>
      </section>

      <section className="pr-stats-section pr-stats-cite" id="cite" aria-labelledby="cite-title">
        <h2 id="cite-title">{st.citeTitle}</h2>
        <p>{st.citeText}</p>
        <pre className="pr-stats-citation">{citation}</pre>
        <a className="btn" href={csv} download>{st.download}</a>
      </section>

      <section className="pr-stats-section" aria-labelledby="stats-faq-title">
        <h2 id="stats-faq-title">{st.faqTitle}</h2>
        <div className="firm-faq-grid">
          {faq.map((item) => (
            <article className="firm-faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
