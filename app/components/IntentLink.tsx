'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps } from 'react';

/**
 * A link to a heavier page (comparator, tools) that prefetches on intent
 * instead of on sight: the page starts loading when the pointer rests on the
 * link, a finger touches it or it receives keyboard focus. The click then
 * feels instant, without every page view downloading those bundles up front.
 */
export default function IntentLink({ href, onMouseEnter, onTouchStart, onFocus, ...props }: Omit<ComponentProps<typeof Link>, 'prefetch' | 'href'> & { href: string }) {
  const router = useRouter();
  let done = false;
  const warm = () => {
    if (done) return;
    done = true;
    try {
      router.prefetch(href);
    } catch {
      /* prefetch is a hint: a failure only means a normal navigation */
    }
  };
  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      onMouseEnter={(event) => { warm(); onMouseEnter?.(event); }}
      onTouchStart={(event) => { warm(); onTouchStart?.(event); }}
      onFocus={(event) => { warm(); onFocus?.(event); }}
    />
  );
}
