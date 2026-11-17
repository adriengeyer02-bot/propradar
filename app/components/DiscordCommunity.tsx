import { DISCORD_URL, communityCopy } from '../lib/community';
import type { Locale } from '../lib/locales';

export default function DiscordCommunity({ locale }: { locale: Locale }) {
  const t = communityCopy(locale);
  return (
    <aside className="pr-discord-community" aria-label={t.eyebrow}>
      <span className="pr-discord-eyebrow"><span aria-hidden="true" className="pr-discord-dot" />{t.eyebrow}</span>
      <h2>{t.title}</h2>
      <p>{t.body}</p>
      <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="pr-discord-button">
        <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.7 5.1a19 19 0 0 0-4.6-1.4l-.6 1.3a17 17 0 0 0-5 0l-.6-1.3a19 19 0 0 0-4.6 1.4C1.4 9.4.6 13.6 1 17.7a19 19 0 0 0 5.6 2.8l1.2-1.9-1.8-.9.5-.4a13 13 0 0 0 11 0l.5.4-1.8.9 1.2 1.9a19 19 0 0 0 5.6-2.8c.5-4.8-.9-8.9-3.3-12.6ZM8.6 15.2c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.8 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
        </svg>
        {t.action}<span aria-hidden="true"> ↗</span>
      </a>
    </aside>
  );
}
