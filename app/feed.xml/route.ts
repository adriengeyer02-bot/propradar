import { propFirms } from '../lib/propFirms';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';
import { getGuideLastModified, seoGuides } from '../lib/seoGuides';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const guideItems = seoGuides.map((guide) => ({
    title: guide.title,
    description: guide.metaDescription,
    url: `${SITE_URL}/guides/${guide.slug}`,
    date: getGuideLastModified(guide),
  }));
  const firmItems = propFirms
    .slice()
    .sort((a, b) => new Date(b.lastReviewed).getTime() - new Date(a.lastReviewed).getTime())
    .slice(0, 30)
    .map((firm) => ({
      title: `${firm.name} avis PropRadar`,
      description: firm.verdict,
      url: `${SITE_URL}/firm/${firm.slug}`,
      date: new Date(firm.lastReviewed),
    }));
  const items = [...guideItems, ...firmItems]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 45);

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
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
    },
  });
}
