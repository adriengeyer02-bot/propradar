import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GuideArticleBody from '../../components/GuideArticleBody';
import { frArticles, getFrArticle } from '../../lib/frArticles';
import { formatUsd, isProvisional, propFirms } from '../../lib/propFirms';
import { SITE_NAME, SITE_URL } from '../../lib/site';

type Props = {
  params: Promise<{ locale: string; rest: string[] }>;
};

/**
 * Catch-all under a locale: serves the hand-written French articles at
 * /fr/<slug> (their URLs since July 2026); anything else is a 404.
 */
async function articleFromParams(params: Props['params']) {
  const { locale, rest } = await params;
  if (locale !== 'fr' || rest.length !== 1) return undefined;
  return getFrArticle(rest[0]);
}

const statusFr: Record<string, string> = {
  Active: 'Active',
  'À surveiller': 'À surveiller',
  Fermée: 'Fermée',
};

const drawdownFr: Record<string, string> = {
  EOD: 'Fin de journée',
  Trailing: 'Suiveur',
  Static: 'Statique',
  Hybride: 'Variable',
};

export function generateStaticParams() {
  return frArticles.map((article) => ({ locale: 'fr', rest: [article.slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await articleFromParams(params);
  if (!article) return { title: 'Not found', robots: { index: false, follow: false } };

  const path = `/fr/${article.slug}`;
  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: {
      canonical: path,
      languages: {
        fr: path,
        ...(article.enPath ? { en: article.enPath, 'x-default': article.enPath } : {}),
      },
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `${SITE_URL}${path}`,
      type: 'article',
      locale: 'fr_FR',
      siteName: SITE_NAME,
      modifiedTime: new Date(article.updated).toISOString(),
    },
    twitter: { card: 'summary', title: article.title, description: article.metaDescription },
  };
}

export default async function FrArticlePage({ params }: Props) {
  const article = await articleFromParams(params);
  if (!article) notFound();

  const firms = article.firmSlugs
    .map((firmSlug) => propFirms.find((firm) => firm.slug === firmSlug))
    .filter((firm): firm is (typeof propFirms)[number] => Boolean(firm));
  const related = article.related
    .map((relatedSlug) => getFrArticle(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const pageUrl = `${SITE_URL}/fr/${article.slug}`;

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.h1,
      description: article.metaDescription,
      inLanguage: 'fr-FR',
      dateModified: article.updated,
      mainEntityOfPage: pageUrl,
      author: { '@type': 'Organization', name: 'PropRadar Research', url: `${SITE_URL}/audit` },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: 'fr-FR',
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'PropRadar', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Guides en français', item: `${SITE_URL}/fr/articles` },
        { '@type': 'ListItem', position: 3, name: article.h1, item: pageUrl },
      ],
    },
  ];

  return (
    <main className="container guide-page fr-article-page" lang="fr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <nav className="fr-breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/fr/articles">Guides en français</Link>
        <span aria-hidden="true"> / </span>
        <span>{article.eyebrow}</span>
      </nav>

      <header className="fr-article-hero">
        <div className="eyebrow">{article.eyebrow}</div>
        <h1>{article.h1}</h1>
        <div className="fr-answer">
          <strong>Réponse courte</strong>
          <p>{article.answer}</p>
        </div>
        {article.enPath ? (
          <a className="guide-lang-switch" href={article.enPath} hrefLang="en">Read this guide in English</a>
        ) : null}
      </header>

      <GuideArticleBody article={article} label={article.h1} updatedLabel="Mis à jour le" sourcesLabel="Sources" />

      {firms.length ? (
        <section className="guide-article fr-firm-table" aria-labelledby="fr-firms-title">
          <h2 id="fr-firms-title">Les firmes citées, d&apos;après les données PropRadar</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Firme</th>
                <th scope="col">Score</th>
                <th scope="col">Statut</th>
                <th scope="col">Prix d&apos;entrée</th>
                <th scope="col">Drawdown</th>
              </tr>
            </thead>
            <tbody>
              {firms.map((firm) => (
                <tr key={firm.slug}>
                  <th scope="row"><Link href={`/firm/${firm.slug}`}>{firm.name}</Link></th>
                  <td>{firm.score}/100</td>
                  <td>{statusFr[firm.status] ?? firm.status}</td>
                  <td>{firm.priceFrom > 0 ? `dès ${formatUsd(firm.priceFrom)}` : 'À vérifier'}</td>
                  <td>{isProvisional(firm, 'drawdownType') ? 'À vérifier' : drawdownFr[firm.drawdownType] ?? firm.drawdownType}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Les fiches détaillées (règles, sources, alertes juridiques et historique des mises à jour) sont en anglais.
            Les liens d&apos;affiliation éventuels sont signalés sur chaque fiche et ne modifient jamais le score.
          </p>
        </section>
      ) : null}

      <section className="guide-article fr-faq" aria-labelledby="fr-faq-title">
        <h2 id="fr-faq-title">Questions fréquentes</h2>
        {article.faq.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>

      {related.length ? (
        <section className="guide-article fr-related" aria-labelledby="fr-related-title">
          <h2 id="fr-related-title">À lire aussi</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}><Link href={`/fr/${item.slug}`}>{item.title}</Link></li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
