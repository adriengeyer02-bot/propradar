import type { Locale } from '../../../locales';
import en, { type RulesMessages } from './en';
import fr from './fr';
import de from './de';
import it from './it';
import es from './es';
import pt from './pt';
import zh from './zh';
import ja from './ja';

export type { RulesMessages };

const ALL: Record<Locale, RulesMessages> = { en, fr, de, it, es, pt, zh, ja };

/** /prop-firm-rules strings in the page language. */
export function getPageMessages(locale: Locale): RulesMessages {
  return ALL[locale] ?? en;
}

export const getRulesMessages = getPageMessages;
