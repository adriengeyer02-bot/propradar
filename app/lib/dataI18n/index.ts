import type { Locale } from '../locales';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import hi from './hi.json';
import it from './it.json';
import ja from './ja.json';
import pt from './pt.json';
import zh from './zh.json';
import { foxxFundedFrench } from '../foxxFunded';
import { xFundedTranslations } from '../xFundedI18n';
import { milTradersTranslations } from '../milTradersI18n';
import { translatedAuditText } from './auditTranslations';
import { translatedContractRule } from './contractRulesLocalized';
import { narrativeOriginals, stripScoreClaims } from '../scoreClaims';

/**
 * Translations of the firm data that readers see most (program rules, payout
 * timing, verdicts and "best for" lines of every open firm; audit, legal and
 * review notes of the 30 highest-scored firms). Keys are the English text as
 * displayed (after toEnglishText); a missing key falls back to English, so a
 * changed data string simply shows in English until the dictionary is
 * refreshed. Numbers, names and quoted text are kept as in the source.
 * Server-only: the dictionaries never reach the browser bundle.
 */
const DATA: Partial<Record<Locale, Record<string, string>>> = { fr: { ...fr, ...foxxFundedFrench }, de, it, es, pt, zh, ja, hi };

export function td(locale: Locale, text: string | undefined | null): string {
  if (!text) return text ?? '';
  // A verdict/summary shown without its score sentence: translate the reviewed
  // original, then drop the same score statement from the translation.
  const original = narrativeOriginals.get(text.trim());
  if (original) {
    const translated = lookup(locale, original);
    return translated === original ? text : stripScoreClaims(translated);
  }
  return lookup(locale, text);
}

function lookup(locale: Locale, text: string): string {
  return translatedContractRule(locale, text) ?? translatedAuditText(locale, text) ?? milTradersTranslations[locale]?.[text.trim()] ?? xFundedTranslations[locale]?.[text.trim()] ?? DATA[locale]?.[text.trim()] ?? text;
}
