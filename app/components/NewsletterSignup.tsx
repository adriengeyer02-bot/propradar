'use client';

import { useId, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { localePath, type Locale } from '../lib/locales';
import type { Messages } from '../lib/messages';

type SignupResult = { ok?: boolean; error?: string };

export default function NewsletterSignup({ locale, copy: t }: { locale: Locale; copy: Messages['newsletter'] }) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || status === 'success' || !consent) return;
    setBusy(true);
    setStatus('idle');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, consent, website }),
      });
      const result = (await response.json()) as SignupResult;
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Signup failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="pr-newsletter" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{t.title}</h2>
      <p>{t.body}</p>
      <form onSubmit={subscribe}>
        <div className="pr-newsletter-honey" aria-hidden="true">
          <label htmlFor={`${id}-website`}>Website</label>
          <input id={`${id}-website`} type="text" name="website" autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} />
        </div>
        <label className="pr-newsletter-sr" htmlFor={`${id}-email`}>{t.email}</label>
        <div className="pr-newsletter-controls">
          <input
            id={`${id}-email`}
            type="email"
            name="email"
            placeholder={t.email}
            aria-label={t.email}
            autoComplete="email"
            maxLength={254}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={busy || status === 'success'}
          />
          <button type="submit" disabled={busy || status === 'success' || !consent}>{t.subscribe}</button>
        </div>
        <label className="pr-newsletter-consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            required
            disabled={busy || status === 'success'}
          />
          <span>{t.consent} <Link href={localePath(locale, '/legal')}>{t.privacy}</Link></span>
        </label>
        <p className={`pr-newsletter-status${status === 'error' ? ' is-error' : ''}`} aria-live="polite" role="status">
          {status === 'success' ? t.success : status === 'error' ? t.error : ''}
        </p>
      </form>
    </section>
  );
}
