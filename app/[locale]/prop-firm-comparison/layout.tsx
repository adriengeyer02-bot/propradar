import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createPageMetadata } from '../../lib/pageMetadata';
import { OG_LOCALE, isLocale, localeAlternates, type Locale } from '../../lib/locales';
import { getMessages } from '../../lib/messages';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale).compare;
  const base = createPageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/prop-firm-comparison',
    keywords: ['prop firm comparison', 'compare prop firms', 'prop firm comparator', 'best prop firm', 'prop firm payout risk'],
    category: 'Prop firm comparison',
  });
  return {
    ...base,
    alternates: { ...base.alternates, ...localeAlternates(locale, '/prop-firm-comparison') },
    openGraph: { ...base.openGraph, locale: OG_LOCALE[locale] },
  };
}

export default function ComparatorLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
