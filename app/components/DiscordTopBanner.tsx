'use client';

import { useEffect, useState } from 'react';
import { DISCORD_URL, communityCopy } from '../lib/community';
import type { Locale } from '../lib/locales';

const STORAGE_KEY = 'propradar-discord-banner-dismissed';
const DISMISS_FOR_MS = 14 * 24 * 60 * 60 * 1000;

export default function DiscordTopBanner({ locale, closeLabel }: { locale: Locale; closeLabel: string }) {
  const [visible, setVisible] = useState(true);
  const t = communityCopy(locale);

  useEffect(() => {
    try {
      const dismissedAt = Number(localStorage.getItem(STORAGE_KEY));
      if (dismissedAt > 0 && Date.now() - dismissedAt < DISMISS_FOR_MS) setVisible(false);
    } catch {
      // Privacy settings may block browser storage; the dismiss button still works.
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    setVisible(false);
    document.documentElement.dataset.discordBannerDismissed = 'true';
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch { /* optional */ }
  }

  return (
    <aside className="pr-discord-top-banner" aria-label={t.eyebrow}>
      <div className="pr-discord-top-inner">
        <span className="pr-discord-top-icon" aria-hidden="true">
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.7 5.1a19 19 0 0 0-4.6-1.4l-.6 1.3a17 17 0 0 0-5 0l-.6-1.3a19 19 0 0 0-4.6 1.4C1.4 9.4.6 13.6 1 17.7a19 19 0 0 0 5.6 2.8l1.2-1.9-1.8-.9.5-.4a13 13 0 0 0 11 0l.5.4-1.8.9 1.2 1.9a19 19 0 0 0 5.6-2.8c.5-4.8-.9-8.9-3.3-12.6ZM8.6 15.2c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.8 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
          </svg>
        </span>
        <div className="pr-discord-top-copy">
          <strong>{t.eyebrow}</strong>
          <span>{t.bannerText}</span>
        </div>
        <a className="pr-discord-top-button" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
          {t.action}<span aria-hidden="true"> ↗</span>
        </a>
        <button className="pr-discord-top-dismiss" type="button" onClick={dismiss} aria-label={closeLabel} title={closeLabel}>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5 19 19M19 5 5 19" /></svg>
        </button>
      </div>
    </aside>
  );
}
