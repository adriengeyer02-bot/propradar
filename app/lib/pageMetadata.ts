import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './site';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  category?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  category = 'Prop firm research',
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'PropRadar Research', url: '/audit' }],
    creator: 'PropRadar Research',
    publisher: SITE_NAME,
    category,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
