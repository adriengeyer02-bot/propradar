'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { localePath, splitLocale } from '../lib/locales';

type ActiveNavLinkProps = {
  /** English path; the link follows the language of the current page. */
  href: string;
  children: ReactNode;
  className?: string;
  exact?: boolean;
  activePrefixes?: string[];
};

/** Routes whose client bundle carries the whole firm database: load them on click, not on sight. */
const NO_PREFETCH = new Set(['/prop-firm-comparison', '/tools']);

function matchesPath(pathname: string, path: string, exact: boolean) {
  if (exact) return pathname === path;
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function ActiveNavLink({
  href,
  children,
  className,
  exact = href === '/',
  activePrefixes = [],
}: ActiveNavLinkProps) {
  const { locale, path } = splitLocale(usePathname() || '/');
  const paths = [href, ...activePrefixes];
  const isActive = paths.some((candidate) => matchesPath(path, candidate, exact && candidate === href));
  const classes = [className, isActive ? 'nav-link-active' : undefined].filter(Boolean).join(' ');

  return (
    <Link href={localePath(locale, href)} prefetch={NO_PREFETCH.has(href) ? false : undefined} className={classes || undefined} aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  );
}
