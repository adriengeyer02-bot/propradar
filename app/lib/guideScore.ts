import { getFirmBySlug } from './propFirms';

/** Current displayed score (including audit and closure gates). */
export function guideScore(slug: string): string {
  const firm = getFirmBySlug(slug);
  return firm ? `${firm.score}/100` : '—';
}
