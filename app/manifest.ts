import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from './lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'PropRadar',
    description: SITE_DESCRIPTION,
    id: '/',
    start_url: '/',
    scope: '/',
    lang: 'en',
    dir: 'ltr',
    display: 'standalone',
    background_color: '#f3f7fc',
    theme_color: '#07101f',
    categories: ['finance', 'business', 'utilities'],
    shortcuts: [
      {
        name: 'Prop firm comparator',
        short_name: 'Comparator',
        description: 'Compare prop firms by rules, evidence and risk.',
        url: '/comparateur',
      },
      {
        name: 'Prop firm guides',
        short_name: 'Guides',
        description: 'Open independent prop firm research guides.',
        url: '/guides',
      },
      {
        name: 'Risk-checked deals',
        short_name: 'Deals',
        description: 'Review current offers with risk context.',
        url: '/promos',
      },
    ],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
