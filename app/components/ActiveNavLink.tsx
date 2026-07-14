'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type ActiveNavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  exact?: boolean;
  activePrefixes?: string[];
};

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
  const pathname = usePathname();
  const paths = [href, ...activePrefixes];
  const isActive = paths.some((path) => matchesPath(pathname, path, exact && path === href));
  const classes = [className, isActive ? 'nav-link-active' : undefined].filter(Boolean).join(' ');

  return (
    <Link href={href} className={classes || undefined} aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  );
}
