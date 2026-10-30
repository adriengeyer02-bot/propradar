import { ImageResponse } from 'next/og';

export const alt = 'PropRadar independent prop firm research';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          color: '#f8fafc',
          background: '#08111f',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 9,
            display: 'flex',
          }}
        >
          <div style={{ width: '54%', height: '100%', background: '#3b82f6' }} />
          <div style={{ width: '30%', height: '100%', background: '#10b981' }} />
          <div style={{ width: '16%', height: '100%', background: '#ef4444' }} />
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: 52,
            padding: '58px 64px 54px',
          }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #60a5fa',
                  borderRadius: '50%',
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #34d399',
                    borderRadius: '50%',
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f8fafc' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 31, fontWeight: 800 }}>PropRadar</span>
                <span style={{ marginTop: 4, color: '#93a4b8', fontSize: 16 }}>Independent prop firm intelligence</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 710 }}>
              <span style={{ color: '#60a5fa', fontSize: 20, fontWeight: 800 }}>EVIDENCE BEFORE MARKETING</span>
              <span style={{ marginTop: 14, fontSize: 58, fontWeight: 850, lineHeight: 1.05 }}>
                Compare the risk before you fund the challenge.
              </span>
              <span style={{ marginTop: 22, color: '#cbd5e1', fontSize: 24, lineHeight: 1.35 }}>
                Scores, rules, payouts, legal files and community signals in one independent view.
              </span>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              {['Comparator', 'Payout risk', 'Legal evidence', 'Rule audits'].map((label, index) => (
                <span
                  key={label}
                  style={{
                    display: 'flex',
                    padding: '10px 15px',
                    border: `1px solid ${index === 1 ? '#7f1d1d' : index === 2 ? '#065f46' : '#334155'}`,
                    borderRadius: 7,
                    color: index === 1 ? '#fecaca' : index === 2 ? '#a7f3d0' : '#dbeafe',
                    background: index === 1 ? '#2a1115' : index === 2 ? '#08251e' : '#101c2f',
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              width: 315,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px 28px',
              border: '1px solid #26364c',
              borderRadius: 8,
              background: '#0d1828',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#8da0b7', fontSize: 15, fontWeight: 800 }}>PROPRADAR METHOD</span>
              <span style={{ marginTop: 8, fontSize: 31, fontWeight: 850 }}>Risk first</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>
              {[
                ['Official terms', '92%', '#60a5fa'],
                ['Legal context', '78%', '#34d399'],
                ['Payout signals', '86%', '#f87171'],
                ['Community cross-check', '72%', '#fbbf24'],
              ].map(([label, width, color]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ color: '#d9e2ee', fontSize: 16 }}>{label}</span>
                  <div style={{ width: '100%', height: 8, display: 'flex', borderRadius: 4, background: '#263244' }}>
                    <div style={{ width, height: '100%', borderRadius: 4, background: color }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#34d399' }} />
              <span style={{ color: '#a7f3d0', fontSize: 16, fontWeight: 750 }}>Independent by design</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
