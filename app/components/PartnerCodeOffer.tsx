'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type PartnerCodeLabels = {
  eyebrow: string;
  title: string;
  body: string;
  copy: string;
  copied: string;
  cta: string;
  close: string;
  disclosure: string;
  compare: string;
};

type Props = {
  slug: string;
  code: string;
  href: string;
  labels: PartnerCodeLabels;
};

/**
 * Partner code issued to PropRadar by a firm: a pop-up when the firm page
 * opens (once per browser session) and the same offer as a card on the page,
 * so the code stays visible after the pop-up is closed.
 */
export default function PartnerCodeOffer({ slug, code, href, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const storageKey = `pr-partner-code-${slug}`;

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(storageKey) === '1';
    } catch {
      /* storage unavailable: show the pop-up */
    }
    if (seen) return;
    const timer = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(storageKey, '1');
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard blocked: the code stays visible to copy by hand */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const offer = (variant: 'card' | 'modal') => (
    <div className={`pr-pcode pr-pcode-${variant}`}>
      <div className="pr-pcode-glow" aria-hidden="true" />
      <span className="pr-pcode-eyebrow">{labels.eyebrow}</span>
      <strong className="pr-pcode-title" id={variant === 'modal' ? 'pr-pcode-title' : undefined}>{labels.title}</strong>
      <p className="pr-pcode-body">{labels.body}</p>
      <div className="pr-pcode-ticket">
        <span className="pr-pcode-code" aria-label={code}>{code}</span>
        <button type="button" className="pr-pcode-copy" onClick={copy}>
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
      <a className="btn btn-primary pr-pcode-cta" href={href} target="_blank" rel="noreferrer" onClick={variant === 'modal' ? close : undefined}>
        {labels.cta}
      </a>
      <p className="pr-pcode-fine">{labels.disclosure} {labels.compare}</p>
    </div>
  );

  return (
    <>
      <section className="pr-pcode-section" aria-label={labels.eyebrow}>{offer('card')}</section>
      {open ? (
        <div className="pr-pcode-overlay" role="presentation" onClick={close}>
          <div className="pr-pcode-dialog" role="dialog" aria-modal="true" aria-labelledby="pr-pcode-title" onClick={(event) => event.stopPropagation()}>
            <button ref={closeRef} type="button" className="pr-pcode-close" onClick={close} aria-label={labels.close}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            {offer('modal')}
          </div>
        </div>
      ) : null}
    </>
  );
}
