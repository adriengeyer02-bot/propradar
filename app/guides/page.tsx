import type { Metadata } from 'next';
import Link from 'next/link';
import { propFirms } from '../lib/propFirms';
import {
  SEO_RESEARCH_DATE,
  searchClusters,
  seoGuides,
  selectGuideFirms,
} from '../lib/seoGuides';
import { SITE_NAME, SITE_URL } from '../lib/site';
import { toEnglishText } from '../lib/i18n';

export const revalidate = 86400;

const GUIDES_DESCRIPTION =
  'PropRadar guides built around real trader searches: best prop firm, futures, news trading, SMC, payout, consistency rule, deals and brand comparisons.';

export const metadata: Metadata = {
  title: 'Prop firm guides: trader searches and SEO',
  description: GUIDES_DESCRIPTION,
  alternates: {
    canonical: '/guides',
  },
};

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

export default function GuidesHubPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'PropRadar prop firm guides',
    description: GUIDES_DESCRIPTION,
    url: `${SITE_URL}/guides`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasPart: seoGuides.map((guide) => ({
      '@type': 'Article',
      headline: toEnglishText(guide.title),
      url: `${SITE_URL}/guides/${guide.slug}`,
      description: toEnglishText(guide.metaDescription),
    })),
  };

  return (
    <main className="container guide-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(collectionSchema)} />

      <section className="guide-hero">
        <div>
          <div className="eyebrow">SEO Radar</div>
          <h1>Prop firm guides based on what traders actually search.</h1>
          <p className="lead">
            PropRadar turns major search intents into useful pages: choosing a firm, rules, payout, trading style,
            futures, promo codes and brand-vs-brand comparisons.
          </p>
          <div className="actions">
            <Link href="/guides/meilleure-prop-firm-2026" className="btn btn-primary">Read the main guide</Link>
            <Link href="/outils" className="btn">Use the tools</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{searchClusters.length}</strong><span>search clusters</span></div>
          <div><strong>{seoGuides.length}</strong><span>indexable guide pages</span></div>
          <div><strong>{propFirms.length}</strong><span>firms linked to guides</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Intent Map</div>
            <h2>Searches to capture first.</h2>
          </div>
          <p className="section-note">Research structured on {SEO_RESEARCH_DATE}. Pages recalculate from the PropRadar database.</p>
        </div>
        <div className="search-intent-grid">
          {searchClusters.map((cluster) => (
            <Link href={`/guides/${cluster.pageSlug}`} className="search-intent-card" key={cluster.label}>
              <span>{toEnglishText(cluster.intent)}</span>
              <strong>{toEnglishText(cluster.label)}</strong>
              <div className="keyword-chip-grid">
                {cluster.queries.slice(0, 4).map((query) => <small key={query}>{query}</small>)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">SEO Pages</div>
            <h2>Guides created for long-tail searches.</h2>
          </div>
        </div>
        <div className="guide-entry-grid seo-guide-grid">
          {seoGuides.map((guide) => {
            const firmCount = selectGuideFirms(guide, 12).length;

            return (
              <Link href={`/guides/${guide.slug}`} className="guide-entry-card" key={guide.slug}>
                <span>{toEnglishText(guide.eyebrow)}</span>
                <strong>{toEnglishText(guide.title)}</strong>
                <small>{toEnglishText(guide.answer)}</small>
                <small>{firmCount} linked firm(s)</small>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="panel seo-update-panel">
          <div>
            <div className="eyebrow">Updates</div>
            <h2>SEO follows the PropRadar database.</h2>
            <p className="lead">
              Each guide uses firm profiles, products, rules, payout signals and existing sources. Adding or correcting
              a firm updates the related guides and sitemap.
            </p>
          </div>
          <div className="api-chip-list">
            <code>/api/seo/keywords</code>
            <code>/guides/meilleure-prop-firm-futures</code>
            <code>/guides/prop-firm-news-trading</code>
            <code>/guides/topstep-vs-apex</code>
          </div>
        </div>
      </section>
    </main>
  );
}
