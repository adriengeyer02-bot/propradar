'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

type FirmLogoProps = {
  name: string;
  logoDomain?: string;
  size?: 'sm' | 'md' | 'lg';
};

const palette = [
  ['#2563eb', '#60a5fa'],
  ['#0f766e', '#2dd4bf'],
  ['#7c3aed', '#a78bfa'],
  ['#be123c', '#fb7185'],
  ['#b45309', '#f59e0b'],
  ['#047857', '#34d399'],
  ['#1d4ed8', '#22d3ee'],
  ['#4338ca', '#818cf8'],
];

function initials(name: string) {
  const cleanName = name.replace(/[^a-zA-Z0-9 ]/g, ' ').trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return 'PR';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function paletteIndex(name: string) {
  return name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length;
}

export default function FirmLogo({ name, logoDomain, size = 'md' }: FirmLogoProps) {
  const [failed, setFailed] = useState(false);
  const [primary, secondary] = useMemo(() => palette[paletteIndex(name)], [name]);
  const showImage = Boolean(logoDomain && !failed);

  return (
    <span
      className={`firm-logo firm-logo-${size}`}
      style={{
        '--logo-primary': primary,
        '--logo-secondary': secondary,
      } as CSSProperties}
      aria-hidden="true"
    >
      {showImage ? (
        <img
          src={`https://logo.clearbit.com/${logoDomain}?size=96`}
          alt=""
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        <span>{initials(name)}</span>
      )}
    </span>
  );
}
