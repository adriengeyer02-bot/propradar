import type { Locale } from '../../../locales';
import en, { type RadarBriefMessages } from './en';
import fr from './fr';
import de from './de';
import it from './it';
import es from './es';
import pt from './pt';
import zh from './zh';
import ja from './ja';

export type { RadarBriefMessages };

const ALL: Record<Locale, RadarBriefMessages> = { en, fr, de, it, es, pt, zh, ja };

export function getPageMessages(locale: Locale): RadarBriefMessages {
  return ALL[locale] ?? en;
}
