import type { MetadataRoute } from 'next';
import { propFirms } from './lib/propFirms';
import { isFirmIndexable } from './lib/firmIndexing';
import { getGuideLastModified, getSeoGuidePath, seoGuides } from './lib/seoGuides';
import { getFirmContentLastModified } from './lib/firmSearchProfiles';
import { editorialBriefs, getEditorialBriefPath } from './lib/editorialBriefs';
import { getAuditCaseFile } from './lib/auditCaseFiles';
import { SITE_URL } from './lib/site';
import { frArticles } from './lib/frArticles';
import { HTML_LANG, LOCALES, PREFIXED_LOCALES, isTranslatedPath, localePath } from './lib/locales';
import { guideLanguageAlternates, localizedGuidePath } from './lib/guideI18n';

/** Guides by English path: their languages come from the guide translations, not the generic prefix rule. */
const GUIDE_BY_PATH = new Map(seoGuides.map((guide) => [getSeoGuidePath(guide), guide]));

/** hreflang alternates (absolute URLs) for a translated English path. */
function languageAlternates(path: string) {
  const guide = GUIDE_BY_PATH.get(path);
  if (guide) {
    const relative = guideLanguageAlternates(guide);
    return { languages: Object.fromEntries(Object.entries(relative).map(([lang, href]) => [lang, `${SITE_URL}${href}`])) };
  }
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) languages[HTML_LANG[locale]] = `${SITE_URL}${localePath(locale, path)}`;
  languages['x-default'] = `${SITE_URL}${path}`;
  return { languages };
}

/** One entry per extra language for each translated page already listed in English. */
function withTranslations(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return entries.flatMap((entry) => {
    const path = entry.url.slice(SITE_URL.length) || '/';
    if (!isTranslatedPath(path)) return [entry];
    const alternates = languageAlternates(path);
    const guide = GUIDE_BY_PATH.get(path);
    // A guide is listed in a language only where it has its own page (French pairs are listed as /fr/<article>).
    const locales = guide
      ? PREFIXED_LOCALES.filter((locale) => localizedGuidePath(locale, guide) === localePath(locale, path))
      : PREFIXED_LOCALES;
    return [
      { ...entry, alternates },
      ...locales.map((locale) => ({
        ...entry,
        url: `${SITE_URL}${localePath(locale, path)}`,
        priority: Math.round((entry.priority ?? 0.5) * 0.9 * 100) / 100,
        alternates,
      })),
    ];
  });
}

const staticRoutes = [
  { path: '', priority: 1, lastModified: '2026-07-13' },
  { path: '/prop-firm-comparison', priority: 0.95, lastModified: '2026-07-13' },
  { path: '/tools', priority: 0.94, lastModified: '2026-07-13' },
  { path: '/guides', priority: 0.93, lastModified: '2026-07-19' },
  { path: '/radar-brief', priority: 0.92, lastModified: '2026-07-19' },
  { path: '/best-prop-firms', priority: 0.9, lastModified: '2026-07-13' },
  { path: '/prop-firm-challenge', priority: 0.9, lastModified: '2026-10-29' },
  { path: '/prop-firm-radar', priority: 0.9, lastModified: '2026-10-30' },
  { path: '/prop-firm-statistics', priority: 0.88, lastModified: '2026-10-29' },
  { path: '/prop-firm-payout-risk', priority: 0.88, lastModified: '2026-07-13' },
  { path: '/trustpilot-prop-firms', priority: 0.86, lastModified: '2026-07-13' },
  { path: '/prop-firm-rules', priority: 0.82, lastModified: '2026-07-15' },
  { path: '/promos', priority: 0.78, lastModified: '2026-07-13' },
  { path: '/audit', priority: 0.76, lastModified: '2026-07-19' },
];

// Hub pages render the firm data, so they change whenever a firm file does.
const latestFirmData = propFirms.reduce((latest, firm) => {
  const date = firm.regulatoryAudit.lastChecked > firm.lastReviewed ? firm.regulatoryAudit.lastChecked : firm.lastReviewed;
  return date > latest ? date : latest;
}, '2026-01-01');

export default function sitemap(): MetadataRoute.Sitemap {
  return withTranslations([
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: new Date(route.lastModified > latestFirmData ? route.lastModified : latestFirmData),
      changeFrequency: ['', '/prop-firm-comparison', '/guides', '/radar-brief', '/best-prop-firms'].includes(route.path)
        ? ('weekly' as const)
        : ('monthly' as const),
      priority: route.priority,
    })),
    ...propFirms.filter(isFirmIndexable).map((firm) => ({
      url: `${SITE_URL}/firm/${firm.slug}`,
      lastModified: new Date(getFirmContentLastModified(
        firm.slug,
        firm.lastReviewed,
        firm.regulatoryAudit.lastChecked,
        getAuditCaseFile(firm.slug)?.lastChecked,
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
    {
      url: `${SITE_URL}/fr/articles`,
      lastModified: new Date(frArticles.reduce((latest, article) => (article.updated > latest ? article.updated : latest), '2026-01-01')),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: { languages: { fr: `${SITE_URL}/fr/articles`, en: `${SITE_URL}/guides` } },
    },
    ...frArticles.map((article) => ({
      url: `${SITE_URL}/fr/${article.slug}`,
      lastModified: new Date(article.updated),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      ...(article.enPath
        ? {
            alternates: GUIDE_BY_PATH.has(article.enPath)
              ? languageAlternates(article.enPath)
              : { languages: { fr: `${SITE_URL}/fr/${article.slug}`, en: `${SITE_URL}${article.enPath}` } },
          }
        : {}),
    })),
    ...editorialBriefs.map((brief, index) => ({
      url: `${SITE_URL}${getEditorialBriefPath(brief)}`,
      lastModified: new Date(brief.updatedAt),
      changeFrequency: index === 0 ? ('weekly' as const) : ('monthly' as const),
      priority: index === 0 ? 0.86 : 0.74,
    })),
  ]);
}
