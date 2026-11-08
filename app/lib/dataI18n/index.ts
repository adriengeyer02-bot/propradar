import type { Locale } from '../locales';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';
import ja from './ja.json';
import pt from './pt.json';
import zh from './zh.json';

/**
 * Translations of the firm data that readers see most (program rules, payout
 * timing, verdicts and "best for" lines of every open firm; audit, legal and
 * review notes of the 30 highest-scored firms). Keys are the English text as
 * displayed (after toEnglishText); a missing key falls back to English, so a
 * changed data string simply shows in English until the dictionary is
 * refreshed. Numbers, names and quoted text are kept as in the source.
 * Server-only: the dictionaries never reach the browser bundle.
 */
const DATA: Partial<Record<Locale, Record<string, string>>> = { fr, de, it, es, pt, zh, ja };

export function td(locale: Locale, text: string | undefined | null): string {
  if (!text) return text ?? '';
  return DATA[locale]?.[text.trim()] ?? text;
}
