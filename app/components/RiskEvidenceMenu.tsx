'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type FocusEvent } from 'react';
import ActiveNavLink from './ActiveNavLink';

const menuId = 'risk-evidence-navigation';
const buttonId = 'risk-evidence-navigation-trigger';

export default function RiskEvidenceMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const closeFromOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      buttonRef.current?.focus();
      setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeFromOutside);
    document.addEventListener('keydown', closeWithEscape);
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside);
      document.removeEventListener('keydown', closeWithEscape);
    };
  }, [isOpen]);

  const closeAfterBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsOpen(false);
    }
  };

  const closeAfterMouseLeave = () => {
    if (!rootRef.current?.contains(document.activeElement)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`nav-menu${isOpen ? ' nav-menu-open' : ''}`}
      onFocus={() => setIsOpen(true)}
      onBlur={closeAfterBlur}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={closeAfterMouseLeave}
    >
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        Risk &amp; Evidence
      </button>
      <div className="nav-menu-panel" id={menuId} aria-labelledby={buttonId}>
        <ActiveNavLink href="/audit">Audit center</ActiveNavLink>
        <ActiveNavLink href="/risques-payout">Payout risks</ActiveNavLink>
        <ActiveNavLink href="/audit-communautaire">Community watch</ActiveNavLink>
        <ActiveNavLink href="/regles">Trading rules</ActiveNavLink>
        <Link href="/#methodologie" onClick={() => setIsOpen(false)}>Methodology</Link>
      </div>
    </div>
  );
}
