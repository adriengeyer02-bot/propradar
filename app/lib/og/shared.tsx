import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { firmLogoFor } from '../firmLogos';
import type { Tone } from '../riskTone';

/** Share-card palette: the site's dark theme. */
export const OG = {
  bg: '#0b111a',
  surface: '#111a26',
  surface2: '#152030',
  line: '#213045',
  text: '#eaf0f7',
  soft: '#c2cedc',
  muted: '#8d9eb5',
  accent: '#36d6e7',
  good: '#34d399',
  watch: '#fbbf24',
  risk: '#f87171',
} as const;

export const OG_SIZE = { width: 1200, height: 630 };

export function toneColor(tone: Tone) {
  return tone === 'good' ? OG.good : tone === 'watch' ? OG.watch : OG.risk;
}

let fontCache: ReturnType<typeof loadFonts> | undefined;

/** Fonts are read once per build worker, not once per image. */
export function ogFonts() {
  fontCache ??= loadFonts();
  return fontCache;
}

async function loadFonts() {
  const [display, text] = await Promise.all([
    readFile(join(process.cwd(), 'app/fonts/Archivo-OG-Display.ttf')),
    readFile(join(process.cwd(), 'app/fonts/Archivo-OG-Text.ttf')),
  ]);

  return [
    { name: 'Archivo Display', data: display, weight: 700 as const, style: 'normal' as const },
    { name: 'Archivo', data: text, weight: 500 as const, style: 'normal' as const },
  ];
}

export async function logoDataUrl(domain?: string) {
  const logo = firmLogoFor(domain);
  if (!logo) return undefined;
  try {
    const buffer = await readFile(join(process.cwd(), 'public/logos', logo.file));
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch {
    return undefined;
  }
}

function initials(name: string) {
  const parts = name.replace(/[^a-zA-Z0-9 ]/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'PR';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function LogoTile({ src, name, size }: { src?: string; name: string; size: number }) {
  const radius = Math.round(size * 0.26);
  if (src) {
    return (
      <div style={{ display: 'flex', width: size, height: size, borderRadius: radius, overflow: 'hidden', border: `2px solid ${OG.line}`, background: '#ffffff' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={size} height={size} alt="" style={{ width: size, height: size, objectFit: 'cover' }} />
      </div>
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: radius,
        border: `2px solid ${OG.line}`,
        background: OG.surface2,
        color: OG.soft,
        fontFamily: 'Archivo Display',
        fontSize: Math.round(size * 0.36),
      }}
    >
      {initials(name)}
    </div>
  );
}

export function Brand() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke={OG.accent} strokeWidth="2.5" />
        <circle cx="20" cy="20" r="10" fill="none" stroke={OG.accent} strokeOpacity="0.55" strokeWidth="2" />
        <circle cx="20" cy="20" r="3.5" fill={OG.text} />
        <circle cx="31" cy="11" r="3" fill={OG.good} />
      </svg>
      <span style={{ fontFamily: 'Archivo Display', fontSize: 30, color: OG.text }}>PropRadar</span>
    </div>
  );
}

export function Ring({ score, tone, size }: { score: number; tone: Tone; size: number }) {
  const stroke = Math.round(size * 0.075);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (Math.max(0, Math.min(100, score)) / 100) * circumference;

  return (
    <div style={{ display: 'flex', position: 'relative', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={OG.line} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={toneColor(tone)}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'Archivo Display', fontSize: Math.round(size * 0.36), color: OG.text, lineHeight: 1 }}>{score}</span>
        <span style={{ fontFamily: 'Archivo', fontSize: Math.round(size * 0.09), color: OG.muted, marginLeft: 4 }}>/100</span>
      </div>
    </div>
  );
}

export function Pip({ label, value, tone }: { label: string; value: string; tone: Tone }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Archivo', fontSize: 24 }}>
      <div style={{ display: 'flex', width: 14, height: 14, borderRadius: 7, background: toneColor(tone) }} />
      <span style={{ color: OG.muted }}>{label}</span>
      <span style={{ color: OG.text, fontFamily: 'Archivo Display' }}>{value}</span>
    </div>
  );
}

/** Scanline grid behind every card, so they read as one family. */
export function Backdrop() {
  return (
    <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', top: 0, left: 0 }}>
      <circle cx="1040" cy="560" r="420" fill="none" stroke={OG.accent} strokeOpacity="0.07" strokeWidth="2" />
      <circle cx="1040" cy="560" r="300" fill="none" stroke={OG.accent} strokeOpacity="0.07" strokeWidth="2" />
      <circle cx="1040" cy="560" r="180" fill="none" stroke={OG.accent} strokeOpacity="0.07" strokeWidth="2" />
      <rect x="0" y="0" width="1200" height="6" fill={OG.accent} />
    </svg>
  );
}
