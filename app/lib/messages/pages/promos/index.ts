import type { Locale } from '../../../locales';
import en, { type PromosMessages } from './en';
import fr from './fr';
import de from './de';
import it from './it';
import es from './es';
import pt from './pt';
import zh from './zh';
import ja from './ja';
import hi from './hi';
import sw from './sw';
import ha from './ha';
import am from './am';

export type { PromosMessages };

const ALL: Record<Locale, PromosMessages> = { en, fr, de, it, es, pt, zh, ja, hi, tr: en, ar: en, ko: en, sw, ha, am };

export function getPageMessages(locale: Locale): PromosMessages {
  return ALL[locale] ?? en;
}
