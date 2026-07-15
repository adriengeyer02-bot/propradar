import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';

export type PageSchemaItem = {
  name: string;
  path: string;
  description?: string;
};

export type PageSchemaFaq = {
  question: string;
  answer: string;
};

type PageStructuredDataProps = {
  type?: 'WebPage' | 'CollectionPage';
  name: string;
  description: string;
  path: string;
  breadcrumbLabel: string;
  dateModified: string;
  items?: PageSchemaItem[];
  faq?: PageSchemaFaq[];
};

function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

export default function PageStructuredData({
  type = 'CollectionPage',
  name,
  description,
  path,
  breadcrumbLabel,
  dateModified,
  items = [],
  faq = [],
}: PageStructuredDataProps) {
  const pageUrl = absoluteUrl(path);
  const pageSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${pageUrl}#page`,
    name,
    description,
    url: pageUrl,
    inLanguage: 'en',
    isAccessibleForFree: true,
    dateModified,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/audit#research`,
      name: 'PropRadar Research',
      url: `${SITE_URL}/audit`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
  };

  if (items.length) {
    pageSchema.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
        ...(item.description ? { description: item.description } : {}),
      })),
    };
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbLabel,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(pageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} /> : null}
    </>
  );
}
