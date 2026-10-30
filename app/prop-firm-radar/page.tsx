import type { Metadata } from 'next';
import Link from 'next/link';
import PropRadarLive from '../components/ui/PropRadarLive';
import { propFirms } from '../lib/propFirms';
import { buildRadar } from '../lib/radar';
import { SITE_NAME, SITE_URL } from '../lib/site';

const PATH = '/prop-firm-radar';
const radar = buildRadar(propFirms);
const openCount = radar.dots.length;
const TITLE = `Prop Firm Radar: ${radar.total} Prop Firms Mapped by Market & Score`;
const DESCRIPTION = `Interactive radar of ${radar.total} prop firms: market, PropRadar score, Trustpilot volume and ${radar.counts.closed} closed firms on one map. Updated ${radar.latest}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['prop firm radar', 'prop firm map', 'prop firm ranking', 'best prop firms', 'futures prop firms', 'prop firms that closed'],
  publisher: SITE_NAME,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}`, type: 'website', siteName: SITE_NAME },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default function PropFirmRadarPage() {
  const sectors = [...radar.sectors].filter((s) => s.count > 0);
  const largest = [...sectors].sort((a, b) => b.count - a.count)[0];
  const meaningful = sectors.filter((s) => s.count >= 5);
  const best = [...meaningful].sort((a, b) => b.average - a.average)[0];
  const share75 = Math.round((radar.counts.good / Math.max(1, openCount)) * 100);
  const topFirm = [...radar.dots].sort((a, b) => b.score - a.score)[0];

  const findings = [
    { value: `${radar.counts.good} of ${openCount}`, label: 'open firms score 75 or more', note: `${share75}% of the open firms PropRadar tracks.` },
    { value: `${largest.count}`, label: `${largest.key} firms`, note: `The largest market on the radar, average score ${largest.average}.` },
    { value: `${best.average}`, label: `average score, ${best.key}`, note: `Highest average among markets with at least 5 firms (${best.count} firms).` },
    { value: `${radar.counts.closed}`, label: 'closed firms on the outer orbit', note: 'Kept on the radar with their closure records, never as a purchase option.' },
  ];

  const faq = [
    {
      question: 'How is a prop firm placed on the PropRadar radar?',
      answer: `The angle is the firm's main market (forex and CFD, futures, crypto, stocks or several), and each slice is as wide as the number of firms in it. The distance from the centre is the PropRadar score: the closer to the centre, the higher the score. Closed firms sit on an outer orbit.`,
    },
    {
      question: 'What does the size of a dot mean?',
      answer: 'A bigger dot means more Trustpilot reviews, on a log scale, when PropRadar has read the rating. A hollow dot means Trustpilot has withheld the rating after a guideline breach. Firms with no rating read yet use the smallest size.',
    },
    {
      question: 'Why are low scores grey and not red?',
      answer: 'Red is kept for closed firms. An open firm under 55 often has a thin or weak file rather than a documented failure, so it is shown in grey. Its page lists what is still unverified.',
    },
    {
      question: 'How often is the radar updated?',
      answer: `It is built from the same firm files as the rest of PropRadar, so it changes whenever a firm is reviewed. The latest review on the radar is dated ${formatDate(radar.latest)}.`,
    },
  ];

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    dateModified: radar.latest,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
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
      { '@type': 'ListItem', position: 1, name: 'PropRadar', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Prop firm radar', item: `${SITE_URL}${PATH}` },
    ],
  };

  return (
    <main className="container guide-page pr-radar-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(pageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <section className="pr-radar-hero">
        <div className="eyebrow"><span>Live from the firm files · updated <time dateTime={radar.latest}>{formatDate(radar.latest)}</time></span></div>
        <h1>Prop firm radar</h1>
        <p className="lead">
          Every prop firm PropRadar tracks on one map: {openCount} open firms placed by market and score, and {radar.counts.closed} closed
          firms on the outer orbit. Point at a dot, search a firm or open a market to see who leads it.
        </p>
      </section>

      <PropRadarLive data={radar} variant="full" />

      <section className="pr-stats-keys pr-radar-findings" aria-label="What the radar shows">
        {findings.map((item) => (
          <div key={item.label} className="pr-stats-key">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <small>{item.note}</small>
          </div>
        ))}
      </section>

      <section className="pr-stats-section pr-radar-read" aria-labelledby="radar-read-title">
        <h2 id="radar-read-title">How to read it</h2>
        <ul className="pr-radar-read-list">
          <li><strong>Angle = market.</strong> Each slice is as wide as the number of open firms in that market.</li>
          <li><strong>Distance = PropRadar score.</strong> The rings mark 90, 75 and 55; {topFirm.name} sits closest to the centre at {topFirm.score}.</li>
          <li><strong>Size = Trustpilot volume.</strong> Bigger dots have more reviews; hollow dots have a withheld rating.</li>
          <li><strong>Colour = score band.</strong> Green 75+, amber 55 to 74, grey under 55. Red crosses are closed firms.</li>
        </ul>
        <p className="pr-fineprint">
          The score weighs rules, payout evidence, the legal file and public reviews. It is not a guarantee: open a firm to see its sources and
          what is still unverified. <Link href="/audit" className="pr-link">Methodology</Link>
        </p>
        <div className="actions">
          <Link className="btn btn-primary" href="/prop-firm-comparison">Compare the firms in a table</Link>
          <Link className="btn" href="/prop-firm-statistics">Prop firm statistics</Link>
        </div>
      </section>

      <section className="pr-stats-section" aria-labelledby="radar-faq-title">
        <h2 id="radar-faq-title">Questions</h2>
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
