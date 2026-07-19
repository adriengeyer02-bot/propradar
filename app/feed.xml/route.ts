import { propFirms } from '../lib/propFirms';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';
import { getGuideLastModified, getSeoGuideDisplay, getSeoGuidePath, seoGuides } from '../lib/seoGuides';
import { toEnglishText } from '../lib/i18n';
import { editorialBriefs, getEditorialBriefPath } from '../lib/editorialBriefs';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const briefItems = editorialBriefs.map((brief) => ({
    title: brief.title,
    description: brief.description,
    url: `${SITE_URL}${getEditorialBriefPath(brief)}`,
    date: new Date(brief.publishedAt),
  }));
  const guideItems = seoGuides.map((guide) => ({
    title: getSeoGuideDisplay(guide).title,
    description: getSeoGuideDisplay(guide).metaDescription,
    url: `${SITE_URL}${getSeoGuidePath(guide)}`,
    date: getGuideLastModified(guide),
  }));
  const firmItems = propFirms
    .slice()
    .sort((a, b) => new Date(b.lastReviewed).getTime() - new Date(a.lastReviewed).getTime())
    .slice(0, 30)
    .map((firm) => ({
      title: `${firm.name} PropRadar review`,
      description: toEnglishText(firm.verdict),
      url: `${SITE_URL}/firm/${firm.slug}`,
      date: new Date(firm.lastReviewed),
    }));
  const items = [...briefItems, ...guideItems, ...firmItems]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 50);
  const lastBuildDate = items[0]?.date ?? new Date('2026-07-13T00:00:00.000Z');

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-US</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    <generator>${escapeXml(SITE_NAME)}</generator>
    <ttl>60</ttl>
    ${items
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`,
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
