'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './FoldBody.module.css';

/**
 * Folds the body of a technical firm-page section (legal file, reviews,
 * guides, sources) under its visible heading (Geyer, 2026-11-28). Nothing is
 * removed: the content stays in the page, and the fold opens by itself when a
 * link or the address bar points at the section or at anything inside it.
 */
export default function FoldBody({ sectionId, more, less, children }: { sectionId: string; more: string; less: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const openFor = (hash: string, scroll: boolean) => {
      const id = decodeURIComponent(hash.replace(/^#/, ''));
      if (!id || !ref.current) return;
      const section = document.getElementById(sectionId);
      const target = document.getElementById(id);
      if (!section || !target || !(target === section || section.contains(target))) return;
      if (!ref.current.open) ref.current.open = true;
      if (scroll) window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    };
    openFor(window.location.hash, true);
    const onHash = () => openFor(window.location.hash, true);
    // Same-page links to an already active hash do not fire hashchange.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!link || link.pathname !== window.location.pathname) return;
      openFor(link.hash, false);
    };
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
    };
  }, [sectionId]);

  return (
    <details ref={ref} className={styles.fold}>
      <summary className={styles.summary}>
        <span className={styles.more}>{more}</span>
        <span className={styles.less}>{less}</span>
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
