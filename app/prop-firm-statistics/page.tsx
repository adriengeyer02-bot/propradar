import type { Metadata } from 'next';
import Link from 'next/link';
import Flag from '../components/ui/Flag';
import { formatUsd } from '../lib/propFirms';
import { OFFICIAL_LISTS } from '../lib/jurisdictions';
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
} from '../lib/industryStats';
import { SITE_NAME, SITE_URL } from '../lib/site';

const PATH = '/prop-firm-statistics';
const TITLE = 'Prop Firm Statistics 2026: Closures, Fees, Countries & Reviews';
const DESCRIPTION = `Prop firm statistics from ${openFirms.length + closedFirms.length} tracked firms: dated closures, challenge fees, profit splits, where firms are registered, Trustpilot. Free CSV.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['prop firm statistics', 'prop firm industry data', 'prop firms that closed', 'prop firm closures 2024', 'prop firm challenge fees', 'where are prop firms registered'],
  authors: [{ name: 'PropRadar Research', url: '/audit' }],
  publisher: SITE_NAME,
  category: 'Prop firm research',
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: 'article',
    siteName: SITE_NAME,
    modifiedTime: statsUpdatedAt,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'PropRadar prop firm statistics' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

function Bars({ rows, unit, label }: { rows: { label: string; count: number }[]; unit: string; label: string }) {
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
            {row.count} <small>{row.count === 1 ? unit.replace(/s$/, '') : unit}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Anchor({ id }: { id: string }) {
  return (
    <a className="pr-stat-anchor" href={`#${id}`} aria-label="Link to this section">
      #
    </a>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}

export default function PropFirmStatisticsPage() {
  const all = feeStats();
  const forex = feeStats('Challenge');
  const futures = feeStats('Futures evaluation');
  const instant = feeStats('Instant funding');
  const topCountries = countryCounts.slice(0, 12);
  const listedCountries = countryCounts.filter((row) => row.country.lists?.length);
  const split80to90 = splitFirms.filter((firm) => firm.profitSplit >= 80 && firm.profitSplit <= 90).length;
  const citation = `PropRadar, "Prop Firm Statistics 2026", ${SITE_URL}${PATH} (data as of ${statsUpdatedAt}).`;

  const keyFacts = [
    { id: 'closures', value: String(closedFirms.length), label: 'firms recorded as closed', note: `${documentedClosures.length} with a public source linked below` },
    { id: 'fees', value: formatUsd(all.median), label: 'median starting challenge fee', note: `across ${all.count} programs in sourced firm files` },
    { id: 'countries', value: String(countryCounts.length), label: 'countries host a firm entity', note: `among ${firmsWithCountry.length} open firms with an identified entity` },
    { id: 'trustpilot', value: String(trustpilotStats.withheld), label: 'firms whose Trustpilot rating is withheld', note: 'Trustpilot cites a breach of its guidelines' },
  ];

  const faq = [
    {
      question: 'How many prop firms have closed?',
      answer: `PropRadar records ${closedFirms.length} closed firms in its database of ${openFirms.length + closedFirms.length}. ${documentedClosures.length} have a public source on this page, including ${closuresByYear['2024'] ?? 0} closures dated 2024. This is not an industry census: Finance Magnates reported that around 50 prop firms shut down in 2024.`,
    },
    {
      question: 'How much does a prop firm challenge cost on average?',
      answer: `Across ${all.count} programs with a listed entry fee in PropRadar's sourced firm files, the median starting fee is ${formatUsd(all.median)} and half of programs start between ${formatUsd(all.q1)} and ${formatUsd(all.q3)}. These are the smallest accounts before discounts.`,
    },
    {
      question: 'Where are prop firms registered?',
      answer: `Among the ${firmsWithCountry.length} open firms whose legal entity PropRadar has identified, the most common countries are ${topCountries.slice(0, 5).map((row) => `${row.country.name} (${row.firms})`).join(', ')}. ${multiCountryFirms} of these firms use entities in more than one country.`,
    },
    {
      question: 'What is the most common profit split?',
      answer: `Among the ${splitFirms.length} open firms whose headline profit split PropRadar read on a source, ${split80to90} advertise between 80% and 90%.`,
    },
  ];

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'PropRadar prop firm statistics',
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    dateModified: statsUpdatedAt,
    isAccessibleForFree: true,
    keywords: ['prop firms', 'proprietary trading', 'prop firm closures', 'challenge fees'],
    distribution: [{ '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `${SITE_URL}${PATH}/data.csv` }],
  };
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Prop firm statistics', item: `${SITE_URL}${PATH}` },
    ],
  };

  return (
    <main className="container guide-page pr-stats-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(datasetSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <section className="pr-stats-hero">
        <div className="eyebrow"><span>Data as of <time dateTime={statsUpdatedAt}>{formatDate(statsUpdatedAt)}</time></span></div>
        <h1>Prop firm statistics 2026</h1>
        <p className="lead">
          Closures, challenge fees, profit splits, where firms are registered and what Trustpilot shows, computed from the{' '}
          {openFirms.length + closedFirms.length} firms PropRadar tracks. Every figure states the base it is computed on, and values
          PropRadar has not read on a source are left out.
        </p>
        <div className="actions">
          <a className="btn btn-primary" href={`${PATH}/data.csv`} download>Download the data (CSV)</a>
          <a className="btn" href="#cite">Cite this page</a>
        </div>
      </section>

      <section className="pr-stats-keys" aria-label="Key figures">
        {keyFacts.map((fact) => (
          <a key={fact.id} href={`#${fact.id}`} className="pr-stats-key">
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
            <small>{fact.note}</small>
          </a>
        ))}
      </section>

      <section className="pr-stats-section" id="closures" aria-labelledby="closures-title">
        <h2 id="closures-title">Prop firm closures <Anchor id="closures" /></h2>
        <p>
          PropRadar records <strong>{closedFirms.length}</strong> closed firms. The {documentedClosures.length} below have a public
          source; dates are the ones the source gives.
          {undocumentedClosedCount > 0 ? ` ${undocumentedClosedCount} more ${undocumentedClosedCount === 1 ? 'is' : 'are'} recorded as closed while the closure source is being documented.` : ''}{' '}
          For scale,{' '}
          <a href="https://financemagnates.com/forex/another-prop-firm-announces-closure-in-year-that-saw-50-companies-shutter" target="_blank" rel="noreferrer">Finance Magnates reported</a> that around 50 prop firms shut down in
          2024; this list covers only firms PropRadar tracks.
        </p>
        <div className="guide-rule-table-wrap">
          <table className="guide-rule-table pr-stats-table pr-closures-table">
            <thead>
              <tr>
                <th scope="col">Firm</th>
                <th scope="col">Date</th>
                <th scope="col">What the source says</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {documentedClosures.map(({ record, firm }) => (
                <tr key={record.slug}>
                  <th scope="row"><Link href={`/firm/${firm.slug}`}>{firm.name}</Link></th>
                  <td className="pr-nowrap">
                    {record.date ? (
                      <>
                        <time dateTime={record.date}>{formatDate(record.date)}</time>
                        {record.dateKind === 'reported' ? <small className="pr-muted"> (reported)</small> : null}
                      </>
                    ) : (
                      <span className="pr-muted">Not stated</span>
                    )}
                  </td>
                  <td>{record.summary}</td>
                  <td><a href={record.source.url} target="_blank" rel="noreferrer">{record.source.label}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pr-stats-section" id="fees" aria-labelledby="fees-title">
        <h2 id="fees-title">Challenge fees <Anchor id="fees" /></h2>
        <p>
          Starting fee of the smallest account, before discounts, for {all.count} programs in sourced firm files. Half of the
          programs start between <strong>{formatUsd(all.q1)}</strong> and <strong>{formatUsd(all.q3)}</strong>; the median is{' '}
          <strong>{formatUsd(all.median)}</strong>.
        </p>
        <div className="pr-stats-grid">
          <Bars rows={feeBuckets} unit="programs" label="Programs by starting fee" />
          <div className="guide-rule-table-wrap">
            <table className="guide-rule-table pr-stats-table">
              <thead>
                <tr><th scope="col">Model</th><th scope="col">Programs</th><th scope="col">Lowest</th><th scope="col">Median</th><th scope="col">Highest</th></tr>
              </thead>
              <tbody>
                {[
                  ['Forex / CFD challenge', forex],
                  ['Futures evaluation', futures],
                  ['Instant funding', instant],
                ].map(([label, stat]) => {
                  const s = stat as ReturnType<typeof feeStats>;
                  return (
                    <tr key={label as string}>
                      <th scope="row">{label as string}</th>
                      <td>{s.count}</td>
                      <td>{formatUsd(s.min)}</td>
                      <td>{formatUsd(s.median)}</td>
                      <td>{formatUsd(s.max)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="pr-stats-note">
          Program by program: <Link href="/prop-firm-challenge#compare">prop firm challenges compared</Link>. Fees were read on each
          firm&apos;s own pages; the review date is on every firm file. {feeRows.length} programs counted.
        </p>
      </section>

      <section className="pr-stats-section" id="profit-split" aria-labelledby="split-title">
        <h2 id="split-title">Profit split <Anchor id="profit-split" /></h2>
        <p>
          Headline split advertised by {splitFirms.length} open firms whose split PropRadar read on a source.{' '}
          <strong>{split80to90}</strong> of them advertise between 80% and 90%. Many firms raise the split with scaling or add-ons, so
          this is the base figure, not the best case.
        </p>
        <Bars rows={splitBuckets} unit="firms" label="Firms by headline profit split" />
      </section>

      <section className="pr-stats-section" id="countries" aria-labelledby="countries-title">
        <h2 id="countries-title">Where prop firms are registered <Anchor id="countries" /></h2>
        <p>
          PropRadar has identified the legal entity country for <strong>{firmsWithCountry.length}</strong> of {openFirms.length} open
          firms. Together they use entities in {countryCounts.length} countries; {multiCountryFirms} firms use more than one
          country, and {euEntityFirms} have at least one entity in the EU. A firm counts once per country.
        </p>
        <ol className="pr-stats-countries">
          {topCountries.map(({ country, firms }) => (
            <li key={country.code}>
              <Flag code={country.code} size="md" />
              <Link href={`/prop-firm-comparison?country=${country.code}`}>{country.name}</Link>
              <span className="pr-stats-bars-track" aria-hidden="true">
                <span style={{ width: `${(firms / topCountries[0].firms) * 100}%` }} />
              </span>
              <strong>{firms}</strong>
            </li>
          ))}
        </ol>
        <p className="pr-stats-note">
          Official-list markers ({OFFICIAL_LISTS.fatfGrey.short}, {OFFICIAL_LISTS.fatfGrey.asOf}; EU tax lists, {OFFICIAL_LISTS.euAnnexI.asOf}):{' '}
          {listedCountries.length
            ? listedCountries.map((row) => `${row.country.name}: ${row.country.lists!.map((key) => OFFICIAL_LISTS[key].short).join(', ')}`).join('; ')
            : 'none of these countries'}
          . A country count says nothing about any single firm. <Link href="/audit#jurisdictions">Open the legal map</Link>.
        </p>
      </section>

      <section className="pr-stats-section" id="trustpilot" aria-labelledby="trustpilot-title">
        <h2 id="trustpilot-title">Trustpilot ratings <Anchor id="trustpilot" /></h2>
        <p>
          PropRadar has checked Trustpilot for {coverage.trustpilotChecked} open firms. {trustpilotStats.rated} show a rating (median{' '}
          <strong>{trustpilotStats.median.toFixed(1)}</strong>): {trustpilotStats.atLeast45} at 4.5 or above, {trustpilotStats.from40to44}{' '}
          from 4.0 to 4.4 and {trustpilotStats.below40} below 4.0. For <strong>{trustpilotStats.withheld}</strong> firms Trustpilot shows no
          rating and states that it is unavailable because of a breach of its guidelines.
        </p>
        <details className="pr-disclosure">
          <summary>The {withheldFirms.length} firms whose Trustpilot rating is withheld</summary>
          <ul className="pr-stats-chips">
            {withheldFirms.map((firm) => (
              <li key={firm.slug}><Link href={`/firm/${firm.slug}#audit`}>{firm.name}</Link></li>
            ))}
          </ul>
        </details>
        <p className="pr-stats-note">
          Each notice is dated and linked on the firm file. <Link href="/trustpilot-prop-firms">How to read prop firm reviews</Link>.
        </p>
      </section>

      <section className="pr-stats-section" id="payouts" aria-labelledby="payouts-title">
        <h2 id="payouts-title">Payout evidence <Anchor id="payouts" /></h2>
        <p>
          PropRadar shows a payout-risk level only when it is backed by sources. Today {payoutStats.sourcedSignal} open firms carry a
          sourced payout warning, {payoutStats.lowWithProof} have a low level backed by payout proof, and{' '}
          <strong>{payoutStats.notAssessed}</strong> are not assessed because nothing is documented either way.
        </p>
        <p className="pr-stats-note">
          <Link href="/prop-firm-payout-risk">See the sourced payout incidents</Link>.
        </p>
      </section>

      <section className="pr-stats-section" id="method" aria-labelledby="method-title">
        <h2 id="method-title">Method and coverage <Anchor id="method" /></h2>
        <ul className="pr-rule-list">
          <li>The base is the PropRadar database: {openFirms.length} open and {closedFirms.length} closed firms, not every prop firm in existence.</li>
          <li>
            Watchlist values that were never read on a source (split, drawdown, account sizes) are excluded. Coverage today: split read
            for {coverage.splitRead} open firms, entity country for {coverage.countryIdentified}, Trustpilot checked for{' '}
            {coverage.trustpilotChecked}.
          </li>
          <li>Figures update with every firm review; the date at the top is the latest review in the data.</li>
          <li>PropRadar has affiliate links with five firms; they are disclosed on each file and never change a figure here.</li>
        </ul>
      </section>

      <section className="pr-stats-section pr-stats-cite" id="cite" aria-labelledby="cite-title">
        <h2 id="cite-title">Cite this data</h2>
        <p>You can quote these figures freely. Please credit PropRadar and link to this page.</p>
        <pre className="pr-stats-citation">{citation}</pre>
        <a className="btn" href={`${PATH}/data.csv`} download>Download the data (CSV)</a>
      </section>

      <section className="pr-stats-section" aria-labelledby="stats-faq-title">
        <h2 id="stats-faq-title">Questions</h2>
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
