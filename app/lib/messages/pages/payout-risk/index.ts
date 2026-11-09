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

export type { PayoutRiskMessages };

const ALL: Record<Locale, PayoutRiskMessages> = { en, fr, de, it, es, pt, zh, ja, hi };

export function getPageMessages(locale: Locale): PayoutRiskMessages {
  return ALL[locale] ?? en;
}
