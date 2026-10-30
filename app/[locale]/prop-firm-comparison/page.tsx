import { isLocale, type Locale } from '../../lib/locales';
import { getMessages } from '../../lib/messages';
import ComparatorClient from './ComparatorClient';

export default async function ComparatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  return <ComparatorClient locale={locale} ui={{ compare: t.compare, table: t.table, values: t.values, styles: t.styles }} />;
}
