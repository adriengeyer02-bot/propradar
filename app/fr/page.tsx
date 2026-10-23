import type { Metadata } from 'next';
import Link from 'next/link';
import { frArticles } from '../lib/frArticles';
import { SITE_NAME, SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: 'Guides prop firm en français : règles, avis, classement',
  description:
    'Guides PropRadar en français : meilleures prop firms 2026, règle de consistance, drawdown, prop firms sans challenge, avis Topstep et FTMO vs The5ers.',
  alternates: {
    canonical: '/fr',
    languages: { fr: '/fr', en: '/guides', 'x-default': '/guides' },
  },
  openGraph: {
    title: 'Guides prop firm en français',
    description: 'Classements, règles expliquées et avis vérifiés pour choisir une prop firm.',
    url: `${SITE_URL}/fr`,
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
  },
};

export default function FrHubPage() {
  return (
    <main className="container guide-page fr-article-page" lang="fr">
      <header className="fr-article-hero">
        <div className="eyebrow">PropRadar en français</div>
        <h1>Guides prop firm en français</h1>
        <p className="lead">
          Un comparateur indépendant pour choisir une prop firm sur des preuves : règles, payouts, entités juridiques et avis
          filtrés. Aucun classement ne s&apos;achète et chaque lien d&apos;affiliation est signalé.
        </p>
        <a className="guide-lang-switch" href="/guides" hrefLang="en">All guides in English</a>
      </header>

      <section className="guide-article fr-hub-list" aria-label="Guides disponibles">
        {frArticles.map((article) => (
          <article key={article.slug}>
            <div className="eyebrow">{article.eyebrow}</div>
            <h2><Link href={`/fr/${article.slug}`}>{article.h1}</Link></h2>
            <p>{article.metaDescription}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
