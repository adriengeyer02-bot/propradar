'use client';

import { useRef, useState, type FormEvent } from 'react';
import type { Messages } from '../lib/messages';

type Props = {
  firm: string;
  slug: string;
  copy: Messages['firm'];
};

export default function SourceSubmission({ firm, slug, copy }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const t = copy.sourceForm;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact%40propradar.tech&su=${encodeURIComponent(`Source for ${firm}`)}&body=${encodeURIComponent(`Firm: ${firm}\nSource: ${url}\nDetails: ${detail}`)}`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending' || state === 'success') return;
    setState('sending');
    try {
      const response = await fetch('/api/source-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, url, detail, website }),
      });
      if (!response.ok) throw new Error('Submission unavailable');
      setState('success');
      setUrl('');
      setDetail('');
    } catch {
      setState('error');
    }
  }

  return (
    <>
      <button type="button" className="pr-link pr-source-trigger" onClick={() => { setState('idle'); dialog.current?.showModal(); }}>
        {copy.sendSource}
      </button>
      <dialog ref={dialog} className="pr-source-dialog" aria-labelledby={`source-title-${slug}`}>
        <div className="pr-source-dialog-head">
          <h2 id={`source-title-${slug}`}>{t.title} — {firm}</h2>
          <button type="button" onClick={() => dialog.current?.close()} aria-label={t.close} className="pr-source-close">×</button>
        </div>
        {state === 'success' ? (
          <div className="pr-source-success" role="status">
            <p>{t.success}</p>
            <button type="button" onClick={() => dialog.current?.close()}>{t.close}</button>
          </div>
        ) : (
          <form onSubmit={submit} className="pr-source-form">
            <p>{t.intro}</p>
            <label htmlFor={`source-url-${slug}`}>{t.url}</label>
            <input id={`source-url-${slug}`} type="url" inputMode="url" placeholder="https://" maxLength={2048} required pattern="https?://.+" value={url} onChange={(event) => setUrl(event.target.value)} disabled={state === 'sending'} />
            <label htmlFor={`source-detail-${slug}`}>{t.detail}</label>
            <textarea id={`source-detail-${slug}`} rows={3} maxLength={1500} value={detail} onChange={(event) => setDetail(event.target.value)} disabled={state === 'sending'} />
            <div className="pr-source-honey" aria-hidden="true">
              <label htmlFor={`source-website-${slug}`}>Website</label>
              <input id={`source-website-${slug}`} tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </div>
            <div className="pr-source-form-actions">
              <button type="submit" disabled={state === 'sending'}>{state === 'sending' ? t.sending : t.submit}</button>
              <button type="button" onClick={() => dialog.current?.close()} disabled={state === 'sending'}>{t.cancel}</button>
            </div>
            {state === 'error' ? (
              <p className="pr-source-error" role="alert">{t.error} <a href={gmailUrl} target="_blank" rel="noreferrer">{t.gmail}</a></p>
            ) : null}
            <p className="pr-source-privacy">{t.privacy}</p>
          </form>
        )}
      </dialog>
    </>
  );
}
