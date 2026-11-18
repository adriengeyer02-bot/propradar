import type { Locale } from '../../../locales';
import en, { type PayoutRiskMessages } from './en';
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

export type { PayoutRiskMessages };

// Untranslated editorial pages fall back to English and are noindexed in these locales.
const ALL: Record<Locale, PayoutRiskMessages> = { en, fr, de, it, es, pt, zh, ja, hi, tr: en, ar: en, ko: en, sw, ha, am };

export function getPageMessages(locale: Locale): PayoutRiskMessages {
  return ALL[locale] ?? en;
}
