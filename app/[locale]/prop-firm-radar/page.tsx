import type { Metadata } from 'next';
import Link from 'next/link';
import PropRadarLive from '../../components/ui/PropRadarLive';
import { propFirms } from '../../lib/propFirms';
import { buildRadar } from '../../lib/radar';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, formatDateLong, getMessages } from '../../lib/messages';

const PATH = '/prop-firm-radar';
const radar = buildRadar(propFirms);
const openCount = radar.dots.length;
type Props = { params: Promise<{ locale: string }> };

async function pageLocale(params: Props['params']): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : 'en';
}

function texts(locale: Locale) {
  const t = getMessages(locale);
  return {
    title: fmt(t.radarPage.metaTitle, { total: radar.total }),
    description: fmt(t.radarPage.metaDescription, { total: radar.total, closed: radar.counts.closed, date: radar.latest }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await pageLocale(params);
  const { title, description } = texts(locale);
  return {
    title,
    description,
    keywords: ['prop firm radar', 'prop firm map', 'prop firm ranking', 'best prop firms', 'futures prop firms', 'prop firms that closed'],
    publisher: SITE_NAME,
    alternates: localeAlternates(locale, PATH),
    openGraph: { title, description, url: `${SITE_URL}${localePath(locale, PATH)}`, type: 'website', siteName: SITE_NAME, locale: OG_LOCALE[locale] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

export default async function PropFirmRadarPage({ params }: Props) {
  const locale = await pageLocale(params);
  const t = getMessages(locale);
  const r = t.radarPage;
  const L = (path: string) => localePath(locale, path);
  const sectorName = (key: string) => (t.sectors as Record<string, string>)[key] ?? key;
  const formatDate = (date: string) => formatDateLong(locale, date);
  const { title: TITLE, description: DESCRIPTION } = texts(locale);
  const sectors = [...radar.sectors].filter((s) => s.count > 0);
  const largest = [...sectors].sort((a, b) => b.count - a.count)[0];
  const meaningful = sectors.filter((s) => s.count >= 5);
  const best = [...meaningful].sort((a, b) => b.average - a.average)[0];
  const share75 = Math.round((radar.counts.good / Math.max(1, openCount)) * 100);
  const topFirm = [...radar.dots].sort((a, b) => b.score - a.score)[0];

  const findings = [
    { value: fmt(r.f1Value, { good: radar.counts.good, open: openCount }), label: r.f1Label, note: fmt(r.f1Note, { share: share75 }) },
    { value: `${largest.count}`, label: fmt(r.f2Label, { market: sectorName(largest.key) }), note: fmt(r.f2Note, { average: largest.average }) },
    { value: `${best.average}`, label: fmt(r.f3Label, { market: sectorName(best.key) }), note: fmt(r.f3Note, { count: best.count }) },
    { value: `${radar.counts.closed}`, label: r.f4Label, note: r.f4Note },
  ];

  const faq = r.faq.map((item) => ({ question: item.q, answer: fmt(item.a, { date: formatDate(radar.latest) }) }));

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${L(PATH)}`,
    inLanguage: HTML_LANG[locale],
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
      { '@type': 'ListItem', position: 2, name: r.h1, item: `${SITE_URL}${L(PATH)}` },
    ],
  };

  return (
    <main className="container guide-page pr-radar-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(pageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <PropRadarLive
        data={radar}
        variant="full"
        locale={locale}
        labels={t.radar}
        sectorNames={t.sectors}
        valueNames={t.values}
        intro={
          <header className="pr-radar-hero">
            <div className="eyebrow"><span>{r.eyebrow} <time dateTime={radar.latest}>{formatDate(radar.latest)}</time></span></div>
            <h1>{r.h1}</h1>
            <p className="lead">{fmt(r.lead, { open: openCount, closed: radar.counts.closed })}</p>
          </header>
        }
      />

      <section className="pr-stats-keys pr-radar-findings" aria-label={r.findingsAria}>
        {findings.map((item) => (
          <div key={item.label} className="pr-stats-key">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <small>{item.note}</small>
          </div>
        ))}
      </section>

      <section className="pr-stats-section pr-radar-read" aria-labelledby="radar-read-title">
        <h2 id="radar-read-title">{r.readTitle}</h2>
        <ul className="pr-radar-read-list">
          {[r.read1, r.read2, r.read3, r.read4].map(([lead, text]) => (
            <li key={lead}><strong>{lead}</strong> {fmt(text, { name: topFirm.name, score: topFirm.score })}</li>
          ))}
        </ul>
        <p className="pr-fineprint">
          {r.fineprint} <Link href={L('/audit')} className="pr-link">{r.methodology}</Link>
        </p>
        <div className="actions">
          <Link className="btn btn-primary" href={L('/prop-firm-comparison')}>{r.compareTable}</Link>
          <Link className="btn" href={L('/prop-firm-statistics')}>{r.stats}</Link>
        </div>
      </section>

      <section className="pr-stats-section" aria-labelledby="radar-faq-title">
        <h2 id="radar-faq-title">{r.faqTitle}</h2>
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
