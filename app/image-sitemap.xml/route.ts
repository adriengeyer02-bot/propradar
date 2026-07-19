import { getGuideVisual } from '../lib/guideVisuals';
import { getSeoGuideDisplay, getSeoGuidePath, seoGuides } from '../lib/seoGuides';
import { SITE_URL } from '../lib/site';
import { editorialBriefs, getEditorialBriefPath } from '../lib/editorialBriefs';
import { auditCaseFiles } from '../lib/auditCaseFiles';
import { getFirmBySlug } from '../lib/propFirms';

export const revalidate = 86400;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const guideUrls = seoGuides.map((guide) => {
    const display = getSeoGuideDisplay(guide);
    const visual = getGuideVisual(guide.slug);

    return [
      '  <url>',
      `    <loc>${escapeXml(`${SITE_URL}${getSeoGuidePath(guide)}`)}</loc>`,
      '    <image:image>',
      `      <image:loc>${escapeXml(`${SITE_URL}${visual.image16x9}`)}</image:loc>`,
      `      <image:title>${escapeXml(display.title)}</image:title>`,
      `      <image:caption>${escapeXml(visual.caption)}</image:caption>`,
      '    </image:image>',
      '  </url>',
    ].join('\n');
  });
  const briefUrls = editorialBriefs.map((brief) => [
    '  <url>',
    `    <loc>${escapeXml(`${SITE_URL}${getEditorialBriefPath(brief)}`)}</loc>`,
    '    <image:image>',
    `      <image:loc>${escapeXml(`${SITE_URL}${brief.image16x9}`)}</image:loc>`,
    `      <image:title>${escapeXml(brief.title)}</image:title>`,
    `      <image:caption>${escapeXml(brief.imageCaption)}</image:caption>`,
    '    </image:image>',
    '  </url>',
  ].join('\n'));
  const caseFileUrls = auditCaseFiles.flatMap((caseFile) => {
    const firm = getFirmBySlug(caseFile.firmSlug);
    if (!firm) return [];

    return [[
      '  <url>',
      `    <loc>${escapeXml(`${SITE_URL}/firm/${firm.slug}`)}</loc>`,
      '    <image:image>',
      `      <image:loc>${escapeXml(`${SITE_URL}/editorial/prop-firm-operational-dependency-risk-16x9.jpg`)}</image:loc>`,
      `      <image:title>${escapeXml(`${firm.name} operational and legal audit timeline`)}</image:title>`,
      `      <image:caption>${escapeXml(caseFile.answer)}</image:caption>`,
      '    </image:image>',
      '  </url>',
    ].join('\n')];
  });
  const urls = [...guideUrls, ...briefUrls, ...caseFileUrls];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
