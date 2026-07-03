import type { MetadataRoute } from 'next';
import { propFirms } from './lib/propFirms';
import { getGuideLastModified, seoGuides } from './lib/seoGuides';
import { SITE_URL } from './lib/site';

const staticRoutes = [
  { path: '', priority: 1 },
  { path: '/comparateur', priority: 0.95 },
  { path: '/outils', priority: 0.94 },
  { path: '/guides', priority: 0.93 },
  { path: '/meilleures-prop-firms', priority: 0.9 },
  { path: '/risques-payout', priority: 0.88 },
  { path: '/trustpilot-prop-firms', priority: 0.86 },
  { path: '/regles', priority: 0.82 },
  { path: '/promos', priority: 0.78 },
  { path: '/audit', priority: 0.76 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.path === '' || route.path === '/comparateur' ? ('weekly' as const) : ('monthly' as const),
      priority: route.priority,
    })),
    ...propFirms.map((firm) => ({
      url: `${SITE_URL}/firm/${firm.slug}`,
      lastModified: new Date(firm.lastReviewed),
      changeFrequency: 'monthly' as const,
      priority: firm.status === 'Active' ? 0.72 : 0.55,
    })),
    ...seoGuides.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: getGuideLastModified(guide),
      changeFrequency: 'weekly' as const,
      priority: guide.slug === 'meilleure-prop-firm-2026' ? 0.92 : 0.82,
    })),
  ];
}
