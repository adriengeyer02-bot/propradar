import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GuideArticleBody from '../../../components/GuideArticleBody';
import LanguageLink from '../../../components/LanguageLink';
import { instrumentComparisonEn, instrumentComparisonFaq, instrumentComparisonFr } from '../../../lib/instrumentComparisonArticle';
import { SITE_NAME, SITE_URL } from '../../../lib/site';
import { getMessages } from '../../../lib/messages';

const EN_PATH = '/guides/futures-cfd-options';
const FR_PATH = '/fr/guides/futures-cfd-options';
const UPDATED = '2026-11-20';

const copy = {
  en: {
    title: 'Futures vs CFDs vs Options: Differences, Costs and Real Risks',
    description: 'Futures, CFD or options? Understand exchange vs broker, margin, option premiums, expiry and losses, with an example and official AMF, CME and ESMA sources.',
    eyebrow: 'Trading education · 20 November 2026',
    heading: 'Futures vs CFDs vs options: what actually changes?',
    answer: 'Futures are standardized exchange-traded commitments, CFDs are price-difference contracts with a provider, and vanilla options grant buyers a right for a premium. Their margin, costs, expiry and risks are not interchangeable.',
    answerLabel: 'Short answer',
    breadcrumbs: 'Prop firm guides',
    faqHeading: 'Frequently asked questions',
    relatedHeading: 'Keep researching',
    related: [
      { label: 'Compare prop firms by market and rules', href: '/prop-firm-comparison' },
      { label: 'Explore futures prop firms', href: '/guides/meilleure-prop-firm-futures' },
      { label: 'Listed-options prop programmes', href: '/options-prop-firms' },
    ],
    switchLabel: 'Lire cet article en français',
    publishedLocale: 'en-US',
    path: EN_PATH,
    alternatePath: FR_PATH,
  },
  fr: {
    title: 'Futures, CFD et options : différences, frais et risques expliqués',
    description: 'Quelle différence entre futures, CFD et options ? Tableau clair, levier, marge, prime, échéance et exemple chiffré, avec sources AMF, CME et ESMA.',
    eyebrow: 'Guide pédagogique · 20 novembre 2026',
    heading: 'Futures, CFD et options : quelles sont les vraies différences ?',
    answer: 'Le future est un contrat à terme coté en Bourse, le CFD un contrat de différence de prix avec un prestataire, et l’option classique un droit acheté contre une prime. Les risques, les frais et les règles ne sont pas les mêmes.',
    answerLabel: 'En bref',
    breadcrumbs: 'Guides en français',
    faqHeading: 'Questions fréquentes',
    relatedHeading: 'Pour aller plus loin',
    related: [
      { label: 'Comparer les prop firms et leurs règles', href: '/fr/prop-firm-comparison' },
      { label: 'Comparer les firmes futures', href: '/guides/meilleure-prop-firm-futures' },
      { label: 'Prop firms spécialisées en options', href: '/fr/options-prop-firms' },
    ],
    switchLabel: 'Read this article in English',
    publishedLocale: 'fr-FR',
    path: FR_PATH,
    alternatePath: EN_PATH,
  },
} as const;

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'fr') return { title: 'Not found', robots: { index: false, follow: false } };
  const item = copy[locale];
  return {
    title: item.title,
    description: item.description,
    keywords: locale === 'fr'
      ? ['différence futures CFD options', 'futures ou CFD', 'trading options', 'future Nasdaq CFD', 'prop firm futures options']
      : ['futures vs CFD vs options', 'futures or CFDs', 'options trading explained', 'futures margin vs premium', 'prop firm futures'],
    alternates: { canonical: item.path, languages: { en: EN_PATH, fr: FR_PATH, 'x-default': EN_PATH } },
    openGraph: {
      type: 'article',
      title: item.title,
      description: item.description,
      url: `${SITE_URL}${item.path}`,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      siteName: SITE_NAME,
      publishedTime: `${UPDATED}T00:00:00.000Z`,
      modifiedTime: `${UPDATED}T00:00:00.000Z`,
    },
    twitter: { card: 'summary', title: item.title, description: item.description },
  };
}

export default async function InstrumentComparisonPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'fr') notFound();

  const item = copy[locale];
  const article = locale === 'fr' ? instrumentComparisonFr : instrumentComparisonEn;
  const questions = instrumentComparisonFaq[locale];
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: item.heading,
      description: item.description,
      mainEntityOfPage: `${SITE_URL}${item.path}`,
      inLanguage: item.publishedLocale,
      datePublished: UPDATED,
      dateModified: UPDATED,
      author: { '@type': 'Organization', name: 'PropRadar Research', url: `${SITE_URL}/audit` },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      citation: article.sources?.map((source) => source.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: item.publishedLocale,
      mainEntity: questions.map(({ question, answer }) => ({
        '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];

  return (
    <main className="container guide-page fr-article-page" lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

      <nav className="fr-breadcrumb" aria-label={locale === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'}>
        <Link href={locale === 'fr' ? '/fr/articles' : '/guides'}>{item.breadcrumbs}</Link>
        <span aria-hidden="true"> / </span>
        <span>{item.eyebrow}</span>
      </nav>

      <header className="fr-article-hero">
        <div className="eyebrow">{item.eyebrow}</div>
        <h1>{item.heading}</h1>
        <div className="fr-answer">
          <strong>{item.answerLabel}</strong>
          <p>{item.answer}</p>
        </div>
        <LanguageLink className="guide-lang-switch" href={item.alternatePath} locale={locale === 'fr' ? 'en' : 'fr'}>
          {item.switchLabel}
        </LanguageLink>
      </header>

      <GuideArticleBody
        article={article}
        label={item.heading}
        updatedLabel={locale === 'fr' ? 'Mis à jour le' : 'Updated'}
        sourcesLabel={locale === 'fr' ? 'Sources officielles' : 'Official sources'}
        diagramLabels={getMessages(locale).diagram}
      />

      <section className="guide-article fr-faq" aria-labelledby="instrument-faq-title">
        <h2 id="instrument-faq-title">{item.faqHeading}</h2>
        {questions.map(({ question, answer }) => (
          <div key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>
        ))}
      </section>

      <section className="guide-article fr-related" aria-labelledby="instrument-related-title">
        <h2 id="instrument-related-title">{item.relatedHeading}</h2>
        <ul>
          {item.related.map((related) => <li key={related.href}><Link href={related.href}>{related.label}</Link></li>)}
        </ul>
      </section>
    </main>
  );
}
