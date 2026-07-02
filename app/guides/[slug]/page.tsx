import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FirmLogo from '../../components/FirmLogo';
import {
  formatUsd,
  payoutRiskClass,
  reviewReliabilityClass,
  scoreClass,
} from '../../lib/propFirms';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import {
  getGuideLastModified,
  getRelatedGuides,
  getSeoGuideBySlug,
  seoGuides,
  selectGuideFirms,
} from '../../lib/seoGuides';

export const revalidate = 86400;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);

  if (!guide) {
    return { title: 'Guide introuvable - PropRadar' };
  }

  return {
    title: guide.title,
    description: guide.metaDescription,
    keywords: [...guide.primaryKeywords, ...guide.secondaryKeywords],
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: 'article',
      siteName: SITE_NAME,
    },
  };
}

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

export default async function SeoGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const firms = selectGuideFirms(guide, 10);
  const relatedGuides = getRelatedGuides(guide.slug, 3);
  const modifiedDate = getGuideLastModified(guide);
  const modifiedDateLabel = modifiedDate.toISOString().slice(0, 10);
  const pageUrl = `${SITE_URL}/guides/${guide.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.metaDescription,
    dateModified: modifiedDate.toISOString(),
    datePublished: modifiedDate.toISOString(),
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: pageUrl,
    keywords: [...guide.primaryKeywords, ...guide.secondaryKeywords].join(', '),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${SITE_URL}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: pageUrl,
      },
    ],
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: guide.title,
    itemListElement: firms.map((firm, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/firm/${firm.slug}`,
      name: firm.name,
      description: firm.verdict,
    })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main className="container guide-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <section className="guide-hero">
        <div>
          <Link href="/guides" className="btn" style={{ marginBottom: 18 }}>Tous les guides</Link>
          <div className="eyebrow">{guide.eyebrow}</div>
          <h1>{guide.h1}</h1>
          <p className="lead">{guide.answer}</p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Comparer les firms</Link>
            <Link href="/outils" className="btn">Choisir par style</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{firms.length}</strong><span>firms reliees</span></div>
          <div><strong>{guide.primaryKeywords.length}</strong><span>mots cles principaux</span></div>
          <div><strong>{modifiedDateLabel}</strong><span>mise a jour data</span></div>
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel seo-answer-panel">
          <div className="eyebrow">Reponse courte</div>
          <h2>Ce que cherche vraiment le trader.</h2>
          <p className="lead">{guide.demandSignal}</p>
          <div className="keyword-chip-grid">
            {[...guide.primaryKeywords, ...guide.secondaryKeywords].map((keyword) => <span key={keyword}>{keyword}</span>)}
          </div>
        </article>
        <article className="panel">
          <div className="eyebrow">Checklist avant achat</div>
          <h2>Les points a verifier.</h2>
          <ul className="risk-list">
            {guide.checks.map((check) => <li key={check}>{check}</li>)}
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Selection PropRadar</div>
            <h2>Firms a comparer pour cette recherche.</h2>
          </div>
          <p className="section-note">Selection calculee automatiquement depuis les fiches PropRadar.</p>
        </div>
        <div className="guide-ranking-list">
          {firms.map((firm, index) => (
            <Link href={`/firm/${firm.slug}`} className="guide-ranking-row seo-firm-row" key={firm.slug}>
              <span className="guide-rank">{index + 1}</span>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.bestFor}</span>
                </div>
              </div>
              <div><span>Score</span><strong>{firm.score}/100</strong></div>
              <div><span>Prix min.</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
              <div><span>Payout</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</strong></div>
              <div><span>Trustpilot</span><strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{firm.reviewSignals.trustpilotReliability}</strong></div>
              <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">FAQ</div>
          <h2>Questions frequentes.</h2>
          <div className="seo-faq-stack">
            {guide.faq.map((item) => (
              <div key={item.question}>
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <div className="eyebrow">Continuer</div>
          <h2>Pages utiles liees.</h2>
          <div className="guide-signal-stack">
            {guide.internalLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                <span>{link.label}</span>
                <strong>Ouvrir</strong>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Guides proches</div>
            <h2>Autres recherches a capter.</h2>
          </div>
        </div>
        <div className="guide-entry-grid">
          {relatedGuides.map((related) => (
            <Link href={`/guides/${related.slug}`} className="guide-entry-card" key={related.slug}>
              <span>{related.eyebrow}</span>
              <strong>{related.title}</strong>
              <small>{related.answer}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
