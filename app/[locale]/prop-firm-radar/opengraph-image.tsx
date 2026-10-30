import { ImageResponse } from 'next/og';
import { propFirms } from '../../lib/propFirms';
import { RADAR_CENTER, RADAR_ORBIT, RADAR_OUTER, buildRadar, radarPoint, radarRadius } from '../../lib/radar';
import { Backdrop, Brand, OG, OG_SIZE, ogFonts, toneColor } from '../../lib/og/shared';

export const alt = 'PropRadar radar: every tracked prop firm by market and score';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function RadarShareImage() {
  const fonts = await ogFonts();
  const radar = buildRadar(propFirms);
  const sweepEnd = radarPoint(RADAR_OUTER, 42);

  return new ImageResponse(
    (
      <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', background: OG.bg, color: OG.text, fontFamily: 'Archivo' }}>
        <Backdrop />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 600, padding: '50px 0 52px 64px' }}>
          <Brand />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={{ fontFamily: 'Archivo Display', fontSize: 78, lineHeight: 1 }}>Prop firm radar</span>
            <span style={{ fontSize: 28, color: OG.soft, lineHeight: 1.35 }}>
              {radar.total} prop firms on one map, by market and PropRadar score.
            </span>
          </div>
          <div style={{ display: 'flex', gap: 26, fontSize: 24 }}>
            {([
              ['good', radar.counts.good, 'score 75+'],
              ['watch', radar.counts.watch, '55–74'],
              ['none', radar.counts.none, 'under 55'],
              ['risk', radar.counts.closed, 'closed'],
            ] as const).map(([tone, count, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'Archivo Display', fontSize: 40, color: toneColor(tone) }}>{count}</span>
                <span style={{ color: OG.muted }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <svg width="560" height="560" viewBox="0 0 640 640" style={{ position: 'absolute', right: 34, top: 35 }}>
          <circle cx={RADAR_CENTER} cy={RADAR_CENTER} r={RADAR_OUTER} fill={OG.surface} stroke={OG.line} strokeWidth="2" />
          {radar.sectors.flatMap((s) => [s.start, s.end]).map((angle, index) => {
            const p = radarPoint(RADAR_OUTER, angle);
            return <line key={index} x1={RADAR_CENTER} y1={RADAR_CENTER} x2={p.x} y2={p.y} stroke={OG.line} strokeWidth="1.5" />;
          })}
          {[90, 75, 55].map((score) => (
            <circle key={score} cx={RADAR_CENTER} cy={RADAR_CENTER} r={radarRadius(score)} fill="none" stroke={OG.accent} strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 5" />
          ))}
          <path d={`M${RADAR_CENTER},${RADAR_CENTER}L${RADAR_CENTER},${RADAR_CENTER - RADAR_OUTER}A${RADAR_OUTER},${RADAR_OUTER} 0 0 1 ${sweepEnd.x},${sweepEnd.y}Z`} fill={OG.accent} fillOpacity="0.14" />
          <line x1={RADAR_CENTER} y1={RADAR_CENTER} x2={sweepEnd.x} y2={sweepEnd.y} stroke={OG.accent} strokeWidth="2" />
          <circle cx={RADAR_CENTER} cy={RADAR_CENTER} r={RADAR_ORBIT} fill="none" stroke={OG.risk} strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="2 7" />
          {radar.closed.map((firm) => (
            <path key={firm.slug} d={`M${firm.x - 5},${firm.y - 5}L${firm.x + 5},${firm.y + 5}M${firm.x - 5},${firm.y + 5}L${firm.x + 5},${firm.y - 5}`} stroke={OG.risk} strokeWidth="2.4" strokeLinecap="round" />
          ))}
          {radar.dots.map((dot) => (
            <circle key={dot.slug} cx={dot.x} cy={dot.y} r={dot.size * 1.1} fill={dot.withheld ? OG.surface : toneColor(dot.tone)} stroke={toneColor(dot.tone)} strokeWidth={dot.withheld ? 2 : 0} fillOpacity={dot.withheld ? 1 : 0.9} />
          ))}
          <circle cx={RADAR_CENTER} cy={RADAR_CENTER} r="3.5" fill={OG.accent} />
        </svg>
        <span style={{ position: 'absolute', display: 'flex', right: 64, bottom: 22, fontSize: 18, color: OG.muted }}>propradar.tech/prop-firm-radar</span>
      </div>
    ),
    { ...size, fonts },
  );
}
