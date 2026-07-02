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

export const revalidate = 86400;

const GUIDES_DESCRIPTION =
  'Guides PropRadar construits autour des recherches traders : meilleure prop firm, futures, news trading, SMC, payout, consistency rule, promos et comparatifs.';

export const metadata: Metadata = {
  title: 'Guides prop firms : recherches traders et SEO',
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
    name: 'Guides prop firms PropRadar',
    description: GUIDES_DESCRIPTION,
    url: `${SITE_URL}/guides`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasPart: seoGuides.map((guide) => ({
      '@type': 'Article',
      headline: guide.title,
      url: `${SITE_URL}/guides/${guide.slug}`,
      description: guide.metaDescription,
    })),
  };

  return (
    <main className="container guide-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(collectionSchema)} />

      <section className="guide-hero">
        <div>
          <div className="eyebrow">SEO Radar</div>
          <h1>Guides prop firms bases sur ce que les traders recherchent.</h1>
          <p className="lead">
            PropRadar transforme les grandes intentions de recherche en pages utiles : choix d une firm, regles,
            payout, style de trading, futures, codes promo et comparatifs marque contre marque.
          </p>
          <div className="actions">
            <Link href="/guides/meilleure-prop-firm-2026" className="btn btn-primary">Lire le guide principal</Link>
            <Link href="/outils" className="btn">Utiliser les outils</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{searchClusters.length}</strong><span>clusters de recherche</span></div>
          <div><strong>{seoGuides.length}</strong><span>pages guides indexables</span></div>
          <div><strong>{propFirms.length}</strong><span>firms reliees aux guides</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Carte des intentions</div>
            <h2>Les recherches a capter en priorite.</h2>
          </div>
          <p className="section-note">Recherche structuree le {SEO_RESEARCH_DATE}. Les pages se recalculent avec la base PropRadar.</p>
        </div>
        <div className="search-intent-grid">
          {searchClusters.map((cluster) => (
            <Link href={`/guides/${cluster.pageSlug}`} className="search-intent-card" key={cluster.label}>
              <span>{cluster.intent}</span>
              <strong>{cluster.label}</strong>
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
            <div className="eyebrow">Pages SEO</div>
            <h2>Guides crees pour les recherches longues.</h2>
          </div>
        </div>
        <div className="guide-entry-grid seo-guide-grid">
          {seoGuides.map((guide) => {
            const firmCount = selectGuideFirms(guide, 12).length;

            return (
              <Link href={`/guides/${guide.slug}`} className="guide-entry-card" key={guide.slug}>
                <span>{guide.eyebrow}</span>
                <strong>{guide.title}</strong>
                <small>{guide.answer}</small>
                <small>{firmCount} firm(s) reliee(s)</small>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="panel seo-update-panel">
          <div>
            <div className="eyebrow">Mise a jour</div>
            <h2>Le SEO suit la base PropRadar.</h2>
            <p className="lead">
              Chaque guide utilise les fiches firms, les produits, les regles, les signaux payout et les sources
              deja presentes. Ajouter ou corriger une firm met a jour les guides concernes et le sitemap.
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
