import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FirmLogo from '../../components/FirmLogo';
import {
  editorialBriefs,
  getEditorialBriefBySlug,
  getEditorialBriefPath,
  type EditorialBriefTopic,
} from '../../lib/editorialBriefs';
import {
  getFirmBySlug,
  payoutRiskClass,
  regulatoryRiskClass,
  scoreClass,
} from '../../lib/propFirms';
import { getSeoGuideDisplay, getSeoGuidePath, seoGuides } from '../../lib/seoGuides';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { toEnglishText } from '../../lib/i18n';

export const revalidate = 86400;
export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

const topicLabels: Record<EditorialBriefTopic, string> = {
  rules: 'Rule Watch',
  payout: 'Payout Watch',
  legal: 'Legal Lens',
};

export function generateStaticParams() {
  return editorialBriefs.map((brief) => ({ slug: brief.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brief = getEditorialBriefBySlug(slug);

  if (!brief) {
    return {
      title: 'Risk brief not found - PropRadar',
      robots: { index: false, follow: false },
    };
  }

  const path = getEditorialBriefPath(brief);

  return {
    title: brief.title,
    description: brief.description,
    keywords: brief.keywords,
    authors: [{ name: 'PropRadar Research', url: '/audit' }],
    creator: 'PropRadar Research',
    publisher: SITE_NAME,
    category: 'Prop firm risk intelligence',
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: brief.title,
      description: brief.description,
      url: `${SITE_URL}${path}`,
      type: 'article',
      locale: 'en_US',
      siteName: SITE_NAME,
      publishedTime: brief.publishedAt,
      modifiedTime: brief.updatedAt,
      authors: [`${SITE_URL}/audit`],
      section: 'Prop Firm Risk Brief',
      tags: brief.keywords,
      images: [{
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: brief.shortTitle,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brief.title,
      description: brief.description,
    },
  };
}

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export default async function RadarBriefIssuePage({ params }: Props) {
  const { slug } = await params;
  const brief = getEditorialBriefBySlug(slug);

  if (!brief) notFound();

  const briefPath = getEditorialBriefPath(brief);
  const citedSources = brief.sections.flatMap((section) => section.sources.map((source) => source.url));
  const linkedFirms = brief.sections
    .flatMap((section) => section.firmSlugs)
    .filter((firmSlug, index, values) => values.indexOf(firmSlug) === index)
    .flatMap((firmSlug) => {
      const firm = getFirmBySlug(firmSlug);
      return firm ? [firm] : [];
    });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: brief.title,
    description: brief.description,
    url: `${SITE_URL}${briefPath}`,
    mainEntityOfPage: `${SITE_URL}${briefPath}`,
    inLanguage: 'en',
    datePublished: brief.publishedAt,
    dateModified: brief.updatedAt,
    image: [`${SITE_URL}/opengraph-image`],
    articleSection: brief.sections.map((section) => section.eyebrow),
    keywords: brief.keywords.join(', '),
    citation: citedSources,
    author: {
      '@type': 'Organization',
      name: 'PropRadar Research',
      url: `${SITE_URL}/audit`,
    },
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
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'Prop Firm Risk Brief',
      url: `${SITE_URL}/radar-brief`,
    },
    about: linkedFirms.map((firm) => ({
      '@type': 'Organization',
      name: firm.name,
      url: `${SITE_URL}/firm/${firm.slug}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Prop Firm Risk Brief', item: `${SITE_URL}/radar-brief` },
      { '@type': 'ListItem', position: 3, name: brief.shortTitle, item: `${SITE_URL}${briefPath}` },
    ],
  };

  return (
    <main className="brief-page brief-issue-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <article>
        <header className="brief-issue-hero">
          <div className="container brief-issue-hero-inner">
            <nav className="brief-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/radar-brief">Risk Brief</Link>
              <span aria-hidden="true">/</span>
              <span>Issue {String(brief.issueNumber).padStart(2, '0')}</span>
            </nav>
            <div className="brief-issue-kicker">
              <span>Issue {String(brief.issueNumber).padStart(2, '0')}</span>
              <span>Prop firm risk intelligence</span>
            </div>
            <h1>{brief.title}</h1>
            <p className="brief-issue-dek">{brief.dek}</p>
            <div className="brief-byline" aria-label="Publication details">
              <span>By <Link href="/audit">PropRadar Research</Link></span>
              <span>Published <time dateTime={brief.publishedAt}>{formatDate(brief.publishedAt)}</time></span>
              <span>{brief.readMinutes} min read</span>
              <span>Research cut-off <time dateTime={brief.researchCutoff}>{formatDate(brief.researchCutoff)}</time></span>
            </div>
          </div>
        </header>

        <div className="container brief-issue-layout">
          <aside className="brief-toc" aria-label="Issue contents">
            <span>In this issue</span>
            <nav>
              {brief.sections.map((section, index) => (
                <a href={`#${section.id}`} key={section.id}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  {section.eyebrow}
                </a>
              ))}
              <a href="#decision-checklist"><small>04</small>Decision checklist</a>
            </nav>
            <Link href="/radar-brief" className="brief-toc-back">All issues &#8594;</Link>
          </aside>

          <div className="brief-article-body">
            <section className="brief-issue-summary" aria-labelledby="issue-summary-title">
              <div>
                <span className="eyebrow">Executive read</span>
                <h2 id="issue-summary-title">What matters this week.</h2>
              </div>
              <p>{brief.description}</p>
            </section>

            {brief.sections.map((section, index) => {
              const firms = section.firmSlugs.flatMap((firmSlug) => {
                const firm = getFirmBySlug(firmSlug);
                return firm ? [firm] : [];
              });
              const guides = section.guideSlugs.flatMap((guideSlug) => {
                const guide = seoGuides.find((candidate) => candidate.slug === guideSlug);
                return guide ? [guide] : [];
              });

              return (
                <section className="brief-story" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
                  <header className="brief-story-header">
                    <div>
                      <span className="brief-story-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="brief-story-topic">{topicLabels[section.topic]}</span>
                    </div>
                    <h2 id={`${section.id}-title`}>{section.title}</h2>
                    <p>{section.summary}</p>
                  </header>

                  <div className="brief-finding">
                    <span>Verified finding</span>
                    <p>{section.finding}</p>
                  </div>

                  <div className="brief-explainer">
                    <h3>Why this matters</h3>
                    <p>{section.whyItMatters}</p>
                  </div>

                  <div className="brief-action-block">
                    <h3>What to check now</h3>
                    <ol>
                      {section.actions.map((action) => <li key={action}>{action}</li>)}
                    </ol>
                  </div>

                  <div className="brief-linked-research">
                    <div>
                      <h3>Firm files</h3>
                      <div className="brief-firm-list">
                        {firms.map((firm) => (
                          <Link href={`/firm/${firm.slug}`} className="brief-firm-row" key={firm.slug}>
                            <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                            <span className="brief-firm-name">
                              <strong>{firm.name}</strong>
                              <small>{toEnglishText(firm.status)} status</small>
                            </span>
                            <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
                            <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                              {toEnglishText(firm.reviewSignals.payoutRisk)} payout
                            </span>
                            <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                              {firm.regulatoryAudit.riskLevel} legal
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3>Decision guides</h3>
                      <div className="brief-guide-links">
                        {guides.map((guide) => (
                          <Link href={getSeoGuidePath(guide)} key={guide.slug}>
                            {getSeoGuideDisplay(guide).title}<span aria-hidden="true">&#8594;</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="brief-sources">
                    <h3>Sources used</h3>
                    <ul>
                      {section.sources.map((source) => (
                        <li key={source.url}>
                          <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a>
                          <span>{source.type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}

            <section className="brief-decision-checklist" id="decision-checklist" aria-labelledby="decision-checklist-title">
              <div className="eyebrow">Before checkout</div>
              <h2 id="decision-checklist-title">A five-minute decision checklist.</h2>
              <ol>
                <li><span>01</span><p><strong>Status</strong> Confirm that the current official domain is operating and selling the exact program.</p></li>
                <li><span>02</span><p><strong>Rules</strong> Read drawdown, consistency, news and payout eligibility together.</p></li>
                <li><span>03</span><p><strong>Entity</strong> Match the checkout company with the terms and legal footer.</p></li>
                <li><span>04</span><p><strong>Evidence</strong> Separate official proof, press reporting and community allegations.</p></li>
                <li><span>05</span><p><strong>Timing</strong> Recheck the file on purchase day because program terms can change.</p></li>
              </ol>
              <div className="brief-decision-actions">
                <Link href="/comparateur" className="btn btn-primary">Open the comparator</Link>
                <Link href="/audit" className="btn">Review the method</Link>
              </div>
            </section>

            <footer className="brief-article-footer">
              <p>
                This brief is independent research, not financial advice. A risk label describes the available evidence and uncertainty; it is not an allegation of misconduct.
              </p>
              <a href="mailto:contact@propradar.tech?subject=PropRadar%20Risk%20Brief%20correction">
                Report a correction or missing primary source
              </a>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}
