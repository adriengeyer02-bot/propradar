import type { Locale } from '../../../locales';
import en, { type AuditMessages, type JurisdictionLabels } from './en';
import fr from './fr';
import de from './de';
import it from './it';
import es from './es';
import pt from './pt';
import zh from './zh';
import ja from './ja';
import hi from './hi';

export type { AuditMessages, JurisdictionLabels };

// Untranslated editorial pages fall back to English and are noindexed in these locales.
const ALL: Record<Locale, AuditMessages> = { en, fr, de, it, es, pt, zh, ja, hi, tr: en, ar: en, ko: en, sw: en, ha: en, am: en };

/** /audit strings in the page language. */
export function getPageMessages(locale: Locale): AuditMessages {
  return ALL[locale] ?? en;
}

export const getAuditMessages = getPageMessages;
