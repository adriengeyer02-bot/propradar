import { ImageResponse } from 'next/og';
import { editorialBriefFirmSlugs, editorialBriefs, getEditorialBriefBySlug } from '../../../lib/editorialBriefs';
import { getFirmBySlug } from '../../../lib/propFirms';
import { scoreTone } from '../../../lib/riskTone';
import { Backdrop, Brand, LogoTile, OG, OG_SIZE, logoDataUrl, ogFonts, toneColor } from '../../../lib/og/shared';

export const alt = 'PropRadar Risk Brief: dated, sourced prop firm risk research';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return editorialBriefs.map((brief) => ({ slug: brief.slug }));
}

/** Share image of a Risk Brief issue, drawn from the issue's own data (no stock imagery). */
export default async function BriefShareImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fonts = await ogFonts();
  const brief = getEditorialBriefBySlug(slug);

  if (!brief) {
    return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: OG.bg }} />, { ...size, fonts });
  }

  const firms = editorialBriefFirmSlugs(brief)
    .map((firmSlug) => getFirmBySlug(firmSlug))
    .filter((firm): firm is NonNullable<ReturnType<typeof getFirmBySlug>> => Boolean(firm))
    .slice(0, 4);
  const logos = await Promise.all(firms.map((firm) => logoDataUrl(firm.logoDomain)));
  const sources = brief.sections.reduce((total, section) => total + section.sources.length, 0);
  const title = brief.shortTitle;
  const titleSize = title.length > 70 ? 54 : title.length > 48 ? 62 : 70;
  const issue = String(brief.issueNumber).padStart(2, '0');

  return new ImageResponse(
    (
      <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', background: OG.bg, color: OG.text, fontFamily: 'Archivo' }}>
        <Backdrop />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '50px 64px 52px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Brand />
            <span style={{ fontSize: 22, color: OG.muted }}>
              Risk Brief · Issue {issue} · {brief.researchCutoff}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1040 }}>
            <span style={{ fontFamily: 'Archivo Display', fontSize: 26, color: OG.accent }}>
              {brief.sections.length} findings · {sources} cited sources
            </span>
            <span style={{ fontFamily: 'Archivo Display', fontSize: titleSize, lineHeight: 1.04, color: OG.text }}>{title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 22, paddingTop: 26, borderTop: `2px solid ${OG.line}` }}>
            {firms.map((firm, index) => {
              const closed = firm.status === 'Fermée';
              return (
                <div key={firm.slug} style={{ display: 'flex', alignItems: 'center', gap: 14, paddingRight: 12 }}>
                  <LogoTile src={logos[index]} name={firm.name} size={60} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'Archivo Display', fontSize: 23, color: OG.text, maxWidth: 170 }}>{firm.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 6, background: closed ? '#f87171' : toneColor(scoreTone(firm.score)) }} />
                      <span style={{ fontSize: 22, color: OG.soft }}>{closed ? 'Closed' : `Score ${firm.score}`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
