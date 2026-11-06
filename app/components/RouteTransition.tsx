'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Makes moving between pages feel continuous:
 * - a thin radar-cyan bar appears the moment an internal link is clicked
 *   (before the next page has arrived), so a click always answers at once;
 * - the new page fades and rises into place once it is there.
 * Nothing runs on the first page load. With prefers-reduced-motion the bar
 * appears without moving and the page does not fade in.
 */
export default function RouteTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const [bar, setBar] = useState<'idle' | 'loading' | 'done'>('idle');

  // Start the bar on clicks that will lead to another page of the site.
  useEffect(() => {
    let timer = 0;
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a');
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      setBar('loading');
      window.clearTimeout(timer);
      // Safety net: never leave the bar running if a navigation is cancelled.
      timer = window.setTimeout(() => setBar('idle'), 6000);
    };
    // Capture phase: next/link cancels the native click before it would bubble up to here.
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.clearTimeout(timer);
    };
  }, []);

  // New page: stop the bar and ease the content in.
  useEffect(() => {
    // Finish the bar (full width, then fade) before resetting it out of sight.
    setBar((current) => (current === 'loading' ? 'done' : current));
    const reset = window.setTimeout(() => setBar('idle'), 450);
    if (first.current) {
      first.current = false;
      return () => window.clearTimeout(reset);
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => window.clearTimeout(reset);
    const main = document.getElementById('main-content');
    if (!main || typeof main.animate !== 'function') return () => window.clearTimeout(reset);
    main.animate(
      [
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 240, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
    );
    return () => window.clearTimeout(reset);
  }, [pathname]);

  return <div className={`pr-route-bar${bar === 'idle' ? '' : ` is-${bar}`}`} aria-hidden="true" />;
}
