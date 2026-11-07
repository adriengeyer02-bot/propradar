import type { Metadata } from 'next';
import OutilsClient from './OutilsClient';
import PageStructuredData from '../../components/PageStructuredData';
import { createPageMetadata } from '../../lib/pageMetadata';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { getMessages } from '../../lib/messages';
import { getToolsMessages } from '../../lib/messages/pages/tools';
import { SITE_URL } from '../../lib/site';

const PATH = '/tools';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const m = getToolsMessages(locale);
  const base = createPageMetadata({
    title: m.metaTitle,
    description: m.metaDescription,
    path: PATH,
    keywords: locale === 'en' ? ['prop firm comparison tool', 'prop firm for SMC', 'prop firm style finder', 'compare prop firms'] : [],
    category: 'Prop firm tools',
  });
  return {
    ...base,
    alternates: localeAlternates(locale, PATH),
    openGraph: { ...base.openGraph, url: `${SITE_URL}${localePath(locale, PATH)}`, locale: OG_LOCALE[locale] },
  };
}

export default async function OutilsPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  const m = getToolsMessages(locale);
  const L = (path: string) => localePath(locale, path);

  return (
    <>
      <PageStructuredData
        type="WebPage"
        name={m.schemaName}
        description={m.metaDescription}
        path={L(PATH)}
        breadcrumbLabel={m.breadcrumb}
        dateModified="2026-07-13"
        inLanguage={HTML_LANG[locale]}
        home={{ label: t.guide.breadcrumbHome, url: `${SITE_URL}${L('/')}` }}
        items={[
          { name: m.schemaComparatorName, path: L('/prop-firm-comparison'), description: m.schemaComparatorText },
          { name: m.schemaGuidesName, path: L('/guides'), description: m.schemaGuidesText },
        ]}
      />
      <OutilsClient m={m} values={t.values} radarLabels={{ ...t.firm.relradar, values: t.values }} locale={locale} />
    </>
  );
}
