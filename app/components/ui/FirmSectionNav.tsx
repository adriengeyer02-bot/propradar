'use client';

import { useEffect, useRef, useState } from 'react';

type Item = { id: string; label: string };

/**
 * Section links for a firm page. The inline bar stays in the flow; once it
 * scrolls out of view a fixed copy pins to the top of the screen and marks
 * the section being read. (Position: sticky cannot be used because the site
 * shell clips overflow.) Without JavaScript only the inline bar is shown.
 */
export default function FirmSectionNav({ items, label }: { items: Item[]; label: string }) {
  const inlineRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const bar = inlineRef.current;
    if (!bar) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length) return;
    const onScroll = () => {
      const line = 120;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top - line <= 0) current = section.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('hashchange', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('hashchange', onScroll);
    };
  }, [items]);

  // Reveal the selected tab horizontally without moving the document.
  useEffect(() => {
    if (!pinned) return;
    const strip = pinnedRef.current?.querySelector<HTMLElement>('.container');
    const link = strip?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!strip || !link) return;
    const bounds = strip.getBoundingClientRect();
    const target = link.getBoundingClientRect();
    if (target.left < bounds.left || target.right > bounds.right) {
      strip.scrollBy({ left: target.left + target.width / 2 - bounds.left - bounds.width / 2, behavior: 'instant' });
    }
  }, [active, pinned]);

  const links = (current: string | null) =>
    items.map((item) => (
      <a key={item.id} href={`#${item.id}`} aria-current={current === item.id ? 'location' : undefined}>
        {item.label}
      </a>
    ));

  return (
    <>
      <nav ref={inlineRef} className="firm-tabs pr-subnav" aria-label={label}>
        {links(null)}
      </nav>
      <nav ref={pinnedRef} className={`pr-subnav-pinned${pinned ? ' is-pinned' : ''}`} aria-label={`${label} (pinned)`} aria-hidden={!pinned} inert={!pinned}>
        <div className="container">{links(active)}</div>
      </nav>
    </>
  );
}
