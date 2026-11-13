'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Strings already resolved for this firm and locale by the firm page. */
export type PartnerOfferView = {
  eyebrow: string;
  title: string;
  body: string;
  code?: string;
  facts: string[];
  cta: string;
  href: string;
  sponsored: boolean;
  fine: string;
  copy: string;
  copied: string;
  close: string;
};

type Props = {
  slug: string;
  logo?: string;
  name: string;
  view: PartnerOfferView;
  /** Also show the offer as a card on the page (when the page has no partner panel of its own). */
  showCard?: boolean;
};

/**
 * Partner offer of an affiliate firm: a pop-up when the firm page opens (once
 * per browser session), optionally repeated as a card on the page so the code
 * stays visible after the pop-up is closed.
 */
export default function PartnerCodeOffer({ slug, logo, name, view, showCard = false }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const storageKey = `pr-partner-offer-${slug}`;

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(storageKey) === '1';
    } catch {
      /* storage unavailable: show the pop-up */
    }
    if (seen) return;
    const timer = window.setTimeout(() => setOpen(true), 900);
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
    if (!view.code) return;
    try {
      await navigator.clipboard.writeText(view.code);
    } catch {
      /* clipboard blocked: the code stays visible to copy by hand */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const offer = (variant: 'card' | 'modal') => (
    <div className={`pr-pcode pr-pcode-${variant}`}>
      <div className="pr-pcode-glow" aria-hidden="true" />
      <div className="pr-pcode-head">
        {logo ? <img className="pr-pcode-logo" src={logo} alt="" width={44} height={44} /> : null}
        <span className="pr-pcode-eyebrow">{view.eyebrow}<small>{name}</small></span>
      </div>
      <strong className="pr-pcode-title" id={variant === 'modal' ? `pr-pcode-title-${slug}` : undefined}>{view.title}</strong>
      <p className="pr-pcode-body">{view.body}</p>
      {view.code ? (
        <div className="pr-pcode-ticket">
          <span className="pr-pcode-code">{view.code}</span>
          <button type="button" className="pr-pcode-copy" onClick={copy}>
            {copied ? `✓ ${view.copied}` : view.copy}
          </button>
        </div>
      ) : null}
      {view.facts.length ? (
        <ul className="pr-pcode-facts">
          {view.facts.map((fact) => <li key={fact}>{fact}</li>)}
        </ul>
      ) : null}
      <a
        className="btn btn-primary pr-pcode-cta"
        href={view.href}
        target="_blank"
        rel={view.sponsored ? 'noreferrer sponsored' : 'noreferrer'}
        onClick={variant === 'modal' ? close : undefined}
      >
        {view.cta}
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </a>
      <p className="pr-pcode-fine">{view.fine}</p>
    </div>
  );

  return (
    <>
      {showCard ? <section className="pr-pcode-section" aria-label={view.eyebrow}>{offer('card')}</section> : null}
      {open ? (
        <div className="pr-pcode-overlay" role="presentation" onClick={close}>
          <div className="pr-pcode-dialog" role="dialog" aria-modal="true" aria-labelledby={`pr-pcode-title-${slug}`} onClick={(event) => event.stopPropagation()}>
            <button ref={closeRef} type="button" className="pr-pcode-close" onClick={close} aria-label={view.close}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            {offer('modal')}
          </div>
        </div>
      ) : null}
    </>
  );
}
