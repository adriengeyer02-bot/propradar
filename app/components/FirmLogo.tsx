import { firmLogoFor } from '../lib/firmLogos';

type FirmLogoProps = {
  name: string;
  logoDomain?: string;
  size?: 'sm' | 'md' | 'lg';
};

function initials(name: string) {
  const cleanName = name.replace(/[^a-zA-Z0-9 ]/g, ' ').trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return 'PR';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

/**
 * Firm logo tile. Uses the icon the firm publishes (self-hosted in
 * public/logos, see app/lib/firmLogos.ts); otherwise a neutral monogram.
 * No third-party request at render time.
 */
export default function FirmLogo({ name, logoDomain, size = 'md' }: FirmLogoProps) {
  const logo = firmLogoFor(logoDomain);

  if (logo) {
    return (
      <span className={`firm-logo firm-logo-${size} firm-logo-image pr-logo`} aria-hidden="true">
        <img
          src={logo.src}
          alt=""
          width={logo.size}
          height={logo.size}
          loading={size === 'lg' ? 'eager' : 'lazy'}
          decoding="async"
        />
      </span>
    );
  }

  return (
    <span className={`firm-logo firm-logo-${size} firm-logo-fallback pr-logo pr-logo-mono`} aria-hidden="true">
      <span>{initials(name)}</span>
    </span>
  );
}
