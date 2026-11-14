import { isLocale, localePath, type Locale } from '../../lib/locales';
import { getMessages } from '../../lib/messages';
import { listedFirms } from '../../lib/propFirms';
import { toComparatorFirm } from '../../lib/comparatorFirms';
import { toEnglishText } from '../../lib/i18n';
import { latestReviewDate } from '../../lib/riskTone';
import { SITE_URL } from '../../lib/site';
import ComparatorClient from './ComparatorClient';

// Built once per build: the browser receives the slim rows, never the full profiles.
const FIRMS = listedFirms.map(toComparatorFirm);
const DATA_UPDATED_AT = latestReviewDate(listedFirms);

function comparatorSchema(locale: Locale) {
  const L = (path: string) => localePath(locale, path);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'PropRadar Prop Firm Comparator',
    description: 'Independent prop firm comparison using rules, payout risk, legal evidence and public review signals.',
    url: `${SITE_URL}${L('/prop-firm-comparison')}`,
    dateModified: DATA_UPDATED_AT,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: listedFirms.length,
      itemListElement: listedFirms.map((firm, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: `${firm.name} prop firm program`,
          description: toEnglishText(firm.verdict),
          url: `${SITE_URL}${L(`/firm/${firm.slug}`)}`,
          category: `${firm.styles.map((style) => toEnglishText(style)).join(', ')} prop firm`,
          brand: {
            '@type': 'Brand',
            name: firm.name,
          },
        },
      })),
    },
  };
}

export default async function ComparatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparatorSchema(locale)).replace(/</g, '\\u003c') }} />
      <ComparatorClient
        locale={locale}
        ui={{ compare: t.compare, table: t.table, values: t.values, styles: t.styles }}
        firms={FIRMS}
        updatedAt={DATA_UPDATED_AT}
      />
    </>
  );
}
