import { ImageResponse } from 'next/og';
import { getFirmBySlug, propFirms } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { legalTone, payoutTone, scoreTone, statusTone, trustpilotPip } from '../../lib/riskTone';
import { Backdrop, Brand, LogoTile, OG, OG_SIZE, Pip, Ring, logoDataUrl, ogFonts, toneColor } from '../../lib/og/shared';

export const alt = 'PropRadar score card: score, payout, legal and review risk';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams() {
  return propFirms.map((firm) => ({ slug: firm.slug }));
}

function shortLegal(level: string) {
  if (level === 'Low to medium') return 'Low–medium';
  if (level === 'Medium to high') return 'Medium–high';
  return level;
}

export default async function FirmShareImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  const fonts = await ogFonts();

  if (!firm) {
    return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: OG.bg }} />, { ...size, fonts });
  }

  const logo = await logoDataUrl(firm.logoDomain);
  const nameSize = firm.name.length > 26 ? 54 : firm.name.length > 16 ? 66 : 84;
  const status = toEnglishText(firm.status);

  return new ImageResponse(
    (
      <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', background: OG.bg, color: OG.text, fontFamily: 'Archivo' }}>
        <Backdrop />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '50px 64px 52px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Brand />
            <span style={{ fontSize: 22, color: OG.muted }}>Independent prop firm review</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 34, flex: 1 }}>
              <LogoTile src={logo} name={firm.name} size={132} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 620 }}>
                <span style={{ fontFamily: 'Archivo Display', fontSize: nameSize, lineHeight: 1, color: OG.text }}>{firm.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24 }}>
                  <span
                    style={{
                      display: 'flex',
                      padding: '4px 14px',
                      borderRadius: 999,
                      color: toneColor(statusTone(firm.status)),
                      background: `${toneColor(statusTone(firm.status))}22`,
                      fontFamily: 'Archivo Display',
                    }}
                  >
                    {status}
                  </span>
                  <span style={{ color: OG.muted }}>
                    {toEnglishText(firm.headquarters)} · founded {firm.founded}
                  </span>
                </div>
              </div>
            </div>
            <Ring score={firm.score} tone={scoreTone(firm.score)} size={220} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 26, borderTop: `2px solid ${OG.line}` }}>
            <div style={{ display: 'flex', gap: 40 }}>
              <Pip label="Payout" value={toEnglishText(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
              <Pip label="Legal" value={shortLegal(firm.regulatoryAudit.riskLevel)} tone={legalTone(firm.regulatoryAudit.riskLevel)} />
              <Pip label="Trustpilot" value={trustpilotPip(firm).value} tone={trustpilotPip(firm).tone} />
            </div>
            <span style={{ fontSize: 22, color: OG.muted }}>Reviewed {firm.lastReviewed}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
