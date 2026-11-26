import type { Locale } from '../locales';
import raw from './scoreEvidence.json';

type Evidence = { factId: string; program: string; phase: string; clause: string; consequence: string };
type Protection = { reason: string };
type Entry<T> = { source: T; translations: Partial<Record<Locale, T>> };
const data = raw as { deductions: Record<string, Entry<string[]>>; reasons: Record<string, Entry<string>> };

/** UI-only: exact source matching prevents old legal wording surviving an audit update. */
export function localizeScoreEvidence<T extends Evidence>(locale: Locale, item: T): T {
  const record = data.deductions[item.factId];
  if (!record || JSON.stringify(record.source) !== JSON.stringify([item.program, item.phase, item.clause, item.consequence])) return item;
  const translated = record.translations[locale];
  if (!translated || translated.length !== 4 || translated.some(text => !text)) return item;
  const [program, phase, clause, consequence] = translated;
  return { ...item, program, phase, clause, consequence };
}
export function localizeContractProtection<T extends Protection>(locale: Locale, slug: string, item: T): T {
  const record = data.reasons[slug];
  if (!record || record.source !== item.reason) return item;
  const reason = record.translations[locale];
  return reason ? { ...item, reason } : item;
}
