import type { MetadataRoute } from 'next';
import { propFirms } from './lib/propFirms';
import { getGuideLastModified, getSeoGuidePath, seoGuides } from './lib/seoGuides';
import { getFirmContentLastModified } from './lib/firmSearchProfiles';
import { editorialBriefs, getEditorialBriefPath } from './lib/editorialBriefs';
import { SITE_URL } from './lib/site';

const staticRoutes = [
  { path: '', priority: 1, lastModified: '2026-07-13' },
  { path: '/comparateur', priority: 0.95, lastModified: '2026-07-13' },
  { path: '/outils', priority: 0.94, lastModified: '2026-07-13' },
  { path: '/guides', priority: 0.93, lastModified: '2026-07-15' },
  { path: '/radar-brief', priority: 0.92, lastModified: '2026-07-15' },
  { path: '/meilleures-prop-firms', priority: 0.9, lastModified: '2026-07-13' },
  { path: '/risques-payout', priority: 0.88, lastModified: '2026-07-13' },
  { path: '/trustpilot-prop-firms', priority: 0.86, lastModified: '2026-07-13' },
  { path: '/regles', priority: 0.82, lastModified: '2026-07-15' },
  { path: '/promos', priority: 0.78, lastModified: '2026-07-13' },
  { path: '/audit', priority: 0.76, lastModified: '2026-07-13' },
  { path: '/audit-communautaire', priority: 0.74, lastModified: '2026-07-13' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: new Date(route.lastModified),
      changeFrequency: ['', '/comparateur', '/guides', '/radar-brief', '/meilleures-prop-firms'].includes(route.path)
        ? ('weekly' as const)
        : ('monthly' as const),
      priority: route.priority,
    })),
    ...propFirms.map((firm) => ({
      url: `${SITE_URL}/firm/${firm.slug}`,
      lastModified: new Date(getFirmContentLastModified(
        firm.slug,
        firm.lastReviewed,
        firm.regulatoryAudit.lastChecked,
      )),
      changeFrequency: 'monthly' as const,
      priority: firm.status === 'Active' ? 0.72 : 0.55,
    })),
    ...seoGuides.filter((guide) => guide.slug !== 'meilleure-prop-firm-2026').map((guide) => ({
      url: `${SITE_URL}${getSeoGuidePath(guide)}`,
      lastModified: getGuideLastModified(guide),
      changeFrequency: 'weekly' as const,
      priority: 0.82,
    })),
    ...editorialBriefs.map((brief, index) => ({
      url: `${SITE_URL}${getEditorialBriefPath(brief)}`,
      lastModified: new Date(brief.updatedAt),
      changeFrequency: index === 0 ? ('weekly' as const) : ('monthly' as const),
      priority: index === 0 ? 0.86 : 0.74,
    })),
  ];
}
