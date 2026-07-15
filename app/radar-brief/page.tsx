import type { Metadata } from 'next';
import Link from 'next/link';
import {
  editorialBriefs,
  getEditorialBriefPath,
  latestEditorialBrief,
  type EditorialBriefTopic,
} from '../lib/editorialBriefs';
import { propFirms } from '../lib/propFirms';
import { SITE_NAME, SITE_URL } from '../lib/site';

export const revalidate = 86400;

const PAGE_TITLE = 'Prop Firm Risk Brief: Rules, Payout Alerts & Legal Moves';
const PAGE_DESCRIPTION =
  'A recurring, source-backed prop firm briefing covering rule changes, payout alerts, closures and legal-entity checks before traders buy a challenge.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'prop firm news',
    'prop firm rule changes',
    'prop firm payout alerts',
    'prop firm legal news',
    'prop firm closures',
  ],
  authors: [{ name: 'PropRadar Research', url: '/audit' }],
  creator: 'PropRadar Research',
  publisher: SITE_NAME,
  category: 'Prop firm risk intelligence',
  alternates: {
    canonical: '/radar-brief',
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/radar-brief`,
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: 'PropRadar independent prop firm risk research',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const topicCopy: Record<EditorialBriefTopic, { number: string; title: string; text: string }> = {
  rules: {
    number: '01',
    title: 'Rule Watch',
    text: 'Material trading, consistency and withdrawal conditions, read at the exact program level.',
  },
  payout: {
    number: '02',
    title: 'Payout Watch',
    text: 'Closures, delays, denials and operational evidence that can change a purchase decision.',
  },
  legal: {
    number: '03',
    title: 'Legal Lens',
    text: 'The entity behind the product, its jurisdiction and the protections traders should not assume.',
  },
};

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function formatDate(value: string, style: 'long' | 'short' = 'long') {
  return new Intl.DateTimeFormat('en-US', {
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export default function RadarBriefHubPage() {
  const latestPath = getEditorialBriefPath(latestEditorialBrief);
  const sourceCount = latestEditorialBrief.sections.reduce((sum, section) => sum + section.sources.length, 0);
  const linkedFirmCount = new Set(latestEditorialBrief.sections.flatMap((section) => section.firmSlugs)).size;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/radar-brief`,
    inLanguage: 'en',
    dateModified: latestEditorialBrief.updatedAt,
    primaryImageOfPage: `${SITE_URL}/opengraph-image`,
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
      url: `${SITE_URL}${getEditorialBriefPath(brief)}`,
      datePublished: brief.publishedAt,
      dateModified: brief.updatedAt,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Prop Firm Risk Brief', item: `${SITE_URL}/radar-brief` },
    ],
  };

  return (
    <main className="brief-page brief-hub-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(collectionSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <section className="brief-hub-hero" aria-labelledby="brief-hub-title">
        <div className="container brief-hub-hero-grid">
          <div className="brief-hub-copy">
            <nav className="brief-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Risk Brief</span>
            </nav>
            <div className="eyebrow">PropRadar editorial research</div>
            <h1 id="brief-hub-title">The weekly prop firm risk brief.</h1>
            <p className="lead">
              One concise edition for the facts that can change a trader&apos;s decision: rules, payouts and legal structure, with the evidence attached.
            </p>
            <div className="brief-hub-actions">
              <Link href={latestPath} className="btn btn-primary">Read the latest issue</Link>
              <a href="/feed.xml" className="btn">Follow the research feed</a>
            </div>
            <p className="brief-editorial-promise">
              No bought placement. No recycled rating. Corrections and uncertainty stay visible.
            </p>
          </div>

          <article className="brief-latest-panel">
            <div className="brief-latest-meta">
              <span>Issue {String(latestEditorialBrief.issueNumber).padStart(2, '0')}</span>
              <time dateTime={latestEditorialBrief.publishedAt}>{formatDate(latestEditorialBrief.publishedAt, 'short')}</time>
            </div>
            <h2>{latestEditorialBrief.shortTitle}</h2>
            <p>{latestEditorialBrief.dek}</p>
            <div className="brief-latest-stats" aria-label="Latest issue coverage">
              <span><strong>{linkedFirmCount}</strong> firms</span>
              <span><strong>{sourceCount}</strong> primary sources</span>
              <span><strong>{latestEditorialBrief.readMinutes}</strong> min read</span>
            </div>
            <Link href={latestPath} className="brief-text-link">
              Open issue <span aria-hidden="true">&#8594;</span>
            </Link>
          </article>
        </div>
      </section>

      <section className="container brief-section" aria-labelledby="brief-format-title">
        <div className="brief-section-heading">
          <div>
            <div className="eyebrow">The format</div>
            <h2 id="brief-format-title">Three signals. One decision window.</h2>
          </div>
          <p>Each section links the finding to firm files, decision guides and the source used to support it.</p>
        </div>
        <div className="brief-topic-grid">
          {(Object.keys(topicCopy) as EditorialBriefTopic[]).map((topic) => (
            <article className="brief-topic-card" key={topic}>
              <span className="brief-topic-number">{topicCopy[topic].number}</span>
              <h3>{topicCopy[topic].title}</h3>
              <p>{topicCopy[topic].text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brief-latest-band" aria-labelledby="latest-brief-title">
        <div className="container">
          <div className="brief-section-heading">
            <div>
              <div className="eyebrow">Latest issue</div>
              <h2 id="latest-brief-title">What changed the decision this week.</h2>
            </div>
            <p>Research cut-off: <time dateTime={latestEditorialBrief.researchCutoff}>{formatDate(latestEditorialBrief.researchCutoff)}</time>.</p>
          </div>
          <div className="brief-story-preview-list">
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
            <div className="eyebrow">Issue archive</div>
            <h2 id="brief-archive-title">Every edition keeps its sources and date.</h2>
          </div>
          <p>The archive turns fast-moving risk signals into a history that can be checked later.</p>
        </div>
        <div className="brief-archive-list">
          {editorialBriefs.map((brief) => (
            <Link href={getEditorialBriefPath(brief)} className="brief-archive-row" key={brief.slug}>
              <span>Issue {String(brief.issueNumber).padStart(2, '0')}</span>
              <div>
                <strong>{brief.shortTitle}</strong>
                <small>{brief.description}</small>
              </div>
              <time dateTime={brief.publishedAt}>{formatDate(brief.publishedAt, 'short')}</time>
              <b aria-hidden="true">&#8594;</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="brief-method-band" aria-labelledby="brief-method-title">
        <div className="container brief-method-grid">
          <div>
            <div className="eyebrow">Editorial standard</div>
            <h2 id="brief-method-title">Evidence before urgency.</h2>
            <p>
              Official terms and regulator records lead. Financial press adds context when it materially changes the file. Community reports stay labeled as signals, not facts.
            </p>
          </div>
          <div className="brief-method-points">
            <span><strong>{propFirms.length}</strong> firm files available for cross-checking</span>
            <span><strong>Primary source</strong> linked beside every factual claim</span>
            <span><strong>Visible cut-off</strong> for every published edition</span>
          </div>
          <div className="brief-method-actions">
            <Link href="/audit" className="btn btn-primary">Read the methodology</Link>
            <a
              href="mailto:contact@propradar.tech?subject=PropRadar%20Risk%20Brief%20correction"
              className="btn"
            >
              Submit a correction
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
