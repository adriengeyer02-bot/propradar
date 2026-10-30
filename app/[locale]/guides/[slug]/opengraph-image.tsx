import { ImageResponse } from 'next/og';
import { getGuideLastModified, getSeoGuideByUrlSlug, guideUrlSlug, getSeoGuideDisplay, selectGuideFirms, seoGuides } from '../../../lib/seoGuides';
import { scoreTone } from '../../../lib/riskTone';
import { Backdrop, Brand, LogoTile, OG, OG_SIZE, logoDataUrl, ogFonts, toneColor } from '../../../lib/og/shared';

export const alt = 'PropRadar guide: firms compared by reliability score';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return seoGuides.map((guide) => ({ slug: guideUrlSlug(guide) }));
}

export default async function GuideShareImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fonts = await ogFonts();
  const guide = getSeoGuideByUrlSlug(slug);

  if (!guide) {
    return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: OG.bg }} />, { ...size, fonts });
  }

  const display = getSeoGuideDisplay(guide);
  const firms = selectGuideFirms(guide, 10).slice(0, 4);
  const logos = await Promise.all(firms.map((firm) => logoDataUrl(firm.logoDomain)));
  const title = display.h1 || display.title;
  const titleSize = title.length > 70 ? 50 : title.length > 48 ? 58 : 66;
  const updated = getGuideLastModified(guide).toISOString().slice(0, 10);

  return new ImageResponse(
    (
      <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', background: OG.bg, color: OG.text, fontFamily: 'Archivo' }}>
        <Backdrop />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '50px 64px 52px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Brand />
            <span style={{ fontSize: 22, color: OG.muted }}>Guide · updated {updated}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1000 }}>
            <span style={{ fontFamily: 'Archivo Display', fontSize: 26, color: OG.accent }}>{display.eyebrow}</span>
            <span style={{ fontFamily: 'Archivo Display', fontSize: titleSize, lineHeight: 1.04, color: OG.text }}>{title}</span>
          </div>

          {firms.length ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, paddingTop: 26, borderTop: `2px solid ${OG.line}` }}>
              {firms.map((firm, index) => (
                <div key={firm.slug} style={{ display: 'flex', alignItems: 'center', gap: 14, paddingRight: 12 }}>
                  <LogoTile src={logos[index]} name={firm.name} size={60} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'Archivo Display', fontSize: 23, color: OG.text, maxWidth: 170 }}>{firm.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 6, background: toneColor(scoreTone(firm.score)) }} />
                      <span style={{ fontSize: 22, color: OG.soft }}>Score {firm.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', paddingTop: 26, borderTop: `2px solid ${OG.line}`, fontSize: 24, color: OG.muted }}>
              Independent, risk-first prop firm research
            </div>
          )}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
