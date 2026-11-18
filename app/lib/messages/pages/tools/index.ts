import type { Locale } from '../../../locales';
import en, { type ToolsMessages } from './en';
import fr from './fr';
import de from './de';
import it from './it';
import es from './es';
import pt from './pt';
import zh from './zh';
import ja from './ja';
import hi from './hi';
import tr from './tr';
import ar from './ar';
import ko from './ko';
import sw from './sw';
import ha from './ha';
import am from './am';

export type { ToolsMessages };

const ALL: Record<Locale, ToolsMessages> = { en, fr, de, it, es, pt, zh, ja, hi, tr, ar, ko, sw, ha, am };

/** /tools strings in the page language. */
export function getPageMessages(locale: Locale): ToolsMessages {
  return ALL[locale] ?? en;
}

export const getToolsMessages = getPageMessages;
