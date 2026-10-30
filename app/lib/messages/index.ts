import type { Locale } from '../locales';
import en, { type Messages } from './en';
import fr from './fr';
import de from './de';
import it from './it';
import zh from './zh';

export type { Messages };

const ALL: Record<Locale, Messages> = { en, fr, de, it, zh };

export function getMessages(locale: Locale): Messages {
  return ALL[locale] ?? en;
}

/** Fill {name} placeholders. */
export function fmt(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/** Translate a short data value (risk level, status, drawdown type...) when a translation exists. */
export function tv(messages: Messages, value: string | undefined | null) {
  if (!value) return value ?? '';
  const values = messages.values as Record<string, string>;
  return values[value] ?? value;
}

const DATE_LOCALE: Record<Locale, string> = { en: 'en-US', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', zh: 'zh-CN' };

/** "30 October 2026" in the page language. */
export function formatDateLong(locale: Locale, isoDate: string) {
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${isoDate.slice(0, 10)}T12:00:00Z`),
  );
}

export function numberLocale(locale: Locale) {
  return DATE_LOCALE[locale];
}
