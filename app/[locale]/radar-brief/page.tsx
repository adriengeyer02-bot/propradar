import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  editorialBriefs,
  getEditorialBriefPath,
  latestEditorialBrief,
  type EditorialBriefTopic,
} from '../../lib/editorialBriefs';
import { propFirms } from '../../lib/propFirms';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt } from '../../lib/messages';
import { getPageMessages } from '../../lib/messages/pages/radar-brief';

export const revalidate = 86400;

const PATH = '/radar-brief';
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const b = getPageMessages(locale);
  return {
    title: b.metaTitle,
    description: b.metaDescription,
    keywords:
      locale === 'en'
        ? ['prop firm news', 'prop firm rule changes', 'prop firm payout alerts', 'prop firm legal news', 'prop firm closures']
        : undefined,
    authors: [{ name: 'PropRadar Research', url: '/audit' }],
    creator: 'PropRadar Research',
    publisher: SITE_NAME,
    category: 'Prop firm risk intelligence',
    alternates: localeAlternates(locale, PATH),
    openGraph: {
      title: b.metaTitle,
      description: b.metaDescription,
      url: `${SITE_URL}${localePath(locale, PATH)}`,
      type: 'website',
      locale: OG_LOCALE[locale],
      siteName: SITE_NAME,
      images: [
        { url: `${SITE_URL}${latestEditorialBrief.image16x9}`, width: 1536, height: 864, alt: latestEditorialBrief.imageAlt },
        { url: `${SITE_URL}${latestEditorialBrief.image4x3}`, width: 1200, height: 900, alt: latestEditorialBrief.imageAlt },
        { url: `${SITE_URL}${latestEditorialBrief.image1x1}`, width: 1000, height: 1000, alt: latestEditorialBrief.imageAlt },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: b.metaTitle,
      description: b.metaDescription,
      images: [`${SITE_URL}${latestEditorialBrief.image16x9}`],
    },
  };
}

const TOPIC_NUMBERS: Record<EditorialBriefTopic, string> = { rules: '01', payout: '02', legal: '03' };

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function formatDate(locale: Locale, value: string, style: 'long' | 'short' = 'long') {
  return new Intl.DateTimeFormat(HTML_LANG[locale], {
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export default async function RadarBriefHubPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const b = getPageMessages(locale);
  const L = (path: string) => localePath(locale, path);
  const latestPath = L(getEditorialBriefPath(latestEditorialBrief));
  const sourceCount = latestEditorialBrief.sections.reduce((sum, section) => sum + section.sources.length, 0);
  const linkedFirmCount = new Set(latestEditorialBrief.sections.flatMap((section) => section.firmSlugs)).size;
  const issueLabel = (n: number) => fmt(b.issue, { n: String(n).padStart(2, '0') });

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: b.metaTitle,
    description: b.metaDescription,
    url: `${SITE_URL}${L(PATH)}`,
    inLanguage: HTML_LANG[locale],
    dateModified: latestEditorialBrief.updatedAt,
    primaryImageOfPage: `${SITE_URL}${latestEditorialBrief.image16x9}`,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
    hasPart: editorialBriefs.map((brief) => ({
      '@type': 'Article',
      headline: brief.title,
      description: brief.description,
      inLanguage: 'en',
      url: `${SITE_URL}${getEditorialBriefPath(brief)}`,
      datePublished: brief.publishedAt,
      dateModified: brief.updatedAt,
      image: `${SITE_URL}${brief.image16x9}`,
      author: {
        '@type': 'Organization',
        name: 'PropRadar Research',
        url: `${SITE_URL}/audit`,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: b.home, item: `${SITE_URL}${L('/')}` },
      { '@type': 'ListItem', position: 2, name: b.schemaBreadcrumb, item: `${SITE_URL}${L(PATH)}` },
    ],
  };

  return (
    <main className="brief-page brief-hub-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(collectionSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <section className="brief-hub-hero" aria-labelledby="brief-hub-title">
        <div className="container brief-hub-hero-grid">
          <div className="brief-hub-copy">
            <nav className="brief-breadcrumb" aria-label={b.breadcrumbAria}>
              <Link href={L('/')}>{b.home}</Link>
              <span aria-hidden="true">/</span>
              <span>{b.breadcrumb}</span>
            </nav>
            <div className="eyebrow">{b.eyebrow}</div>
            <h1 id="brief-hub-title">{b.h1}</h1>
            <p className="lead">{b.lead}</p>
            <div className="brief-hub-actions">
              <Link href={latestPath} className="btn btn-primary">{b.ctaLatest}</Link>
              <a href="/feed.xml" className="btn">{b.ctaFeed}</a>
            </div>
            <p className="brief-editorial-promise">{b.promise}</p>
            {b.contentNote ? <p className="pr-fineprint pr-data-note">{b.contentNote}</p> : null}
          </div>

          <article className="brief-latest-panel" lang={locale === 'en' ? undefined : 'en'}>
            <div className="brief-latest-media">
              <Image
                src={latestEditorialBrief.image16x9}
                alt={latestEditorialBrief.imageAlt}
                width={1536}
                height={864}
                sizes="(max-width: 980px) 100vw, 42vw"
                quality={84}
                priority
              />
            </div>
            <div className="brief-latest-meta" lang={HTML_LANG[locale]}>
              <span>{issueLabel(latestEditorialBrief.issueNumber)}</span>
              <time dateTime={latestEditorialBrief.publishedAt}>{formatDate(locale, latestEditorialBrief.publishedAt, 'short')}</time>
            </div>
            <h2>{latestEditorialBrief.shortTitle}</h2>
            <p>{latestEditorialBrief.dek}</p>
            <div className="brief-latest-stats" aria-label={b.coverageAria} lang={HTML_LANG[locale]}>
              <span><strong>{linkedFirmCount}</strong> {b.statFirms}</span>
              <span><strong>{sourceCount}</strong> {b.statSources}</span>
              <span><strong>{latestEditorialBrief.readMinutes}</strong> {b.statMinutes}</span>
            </div>
            <Link href={latestPath} className="brief-text-link" lang={HTML_LANG[locale]}>
              {b.openIssue} <span aria-hidden="true">&#8594;</span>
            </Link>
          </article>
        </div>
      </section>

      <section className="container brief-section" aria-labelledby="brief-format-title">
        <div className="brief-section-heading">
          <div>
            <div className="eyebrow">{b.formatEyebrow}</div>
            <h2 id="brief-format-title">{b.formatTitle}</h2>
          </div>
          <p>{b.formatText}</p>
        </div>
        <div className="brief-topic-grid">
          {(Object.keys(TOPIC_NUMBERS) as EditorialBriefTopic[]).map((topic) => (
            <article className="brief-topic-card" key={topic}>
              <span className="brief-topic-number">{TOPIC_NUMBERS[topic]}</span>
              <h3>{b.topics[topic].title}</h3>
              <p>{b.topics[topic].text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brief-latest-band" aria-labelledby="latest-brief-title">
        <div className="container">
          <div className="brief-section-heading">
            <div>
              <div className="eyebrow">{b.latestEyebrow}</div>
              <h2 id="latest-brief-title">{b.latestTitle}</h2>
            </div>
            <p>{fmt(b.cutoff, { date: formatDate(locale, latestEditorialBrief.researchCutoff) })}</p>
          </div>
          <div className="brief-story-preview-list" lang={locale === 'en' ? undefined : 'en'}>
            {latestEditorialBrief.sections.map((section, index) => (
              <Link href={`${latestPath}#${section.id}`} className="brief-story-preview" key={section.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <small>{section.eyebrow}</small>
                  <strong>{section.title}</strong>
                  <p>{section.summary}</p>
                </div>
                <b aria-hidden="true">&#8594;</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container brief-section" aria-labelledby="brief-archive-title">
        <div className="brief-section-heading">
          <div>
            <div className="eyebrow">{b.archiveEyebrow}</div>
            <h2 id="brief-archive-title">{b.archiveTitle}</h2>
          </div>
          <p>{b.archiveText}</p>
        </div>
        <div className="brief-archive-list">
          {editorialBriefs.map((brief) => (
            <Link href={L(getEditorialBriefPath(brief))} className="brief-archive-row" key={brief.slug}>
              <span>{issueLabel(brief.issueNumber)}</span>
              <div lang={locale === 'en' ? undefined : 'en'}>
                <strong>{brief.shortTitle}</strong>
                <small>{brief.description}</small>
              </div>
              <time dateTime={brief.publishedAt}>{formatDate(locale, brief.publishedAt, 'short')}</time>
              <b aria-hidden="true">&#8594;</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="brief-method-band" aria-labelledby="brief-method-title">
        <div className="container brief-method-grid">
          <div>
            <div className="eyebrow">{b.methodEyebrow}</div>
            <h2 id="brief-method-title">{b.methodTitle}</h2>
            <p>{b.methodText}</p>
          </div>
          <div className="brief-method-points">
            <span><strong>{propFirms.length}</strong> {b.pointFiles}</span>
            <span><strong>{b.pointSourceStrong}</strong> {b.pointSource}</span>
            <span><strong>{b.pointCutoffStrong}</strong> {b.pointCutoff}</span>
          </div>
          <div className="brief-method-actions">
            <Link href={L('/audit')} className="btn btn-primary">{b.ctaMethod}</Link>
            <a
              href="mailto:contact@propradar.tech?subject=PropRadar%20Risk%20Brief%20correction"
              className="btn"
            >
              {b.ctaCorrection}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
