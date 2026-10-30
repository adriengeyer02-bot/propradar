'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type FocusEvent } from 'react';
import ActiveNavLink from './ActiveNavLink';

const menuId = 'risk-evidence-navigation';
const buttonId = 'risk-evidence-navigation-trigger';

export type RiskMenuLabels = { title: string; brief: string; audit: string; payout: string; rules: string; trustpilot: string; statistics: string };

const DEFAULT_LABELS: RiskMenuLabels = {
  title: 'Risk watch',
  brief: 'Risk Brief',
  audit: 'Audit center',
  payout: 'Payout risks',
  rules: 'Trading rules',
  trustpilot: 'Trustpilot research',
  statistics: 'Industry statistics',
};

export default function RiskEvidenceMenu({ labels = DEFAULT_LABELS }: { labels?: RiskMenuLabels }) {
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
        {labels.title}
      </button>
      <div className="nav-menu-panel" id={menuId} aria-labelledby={buttonId}>
        <ActiveNavLink href="/radar-brief" activePrefixes={['/radar-brief/']}>{labels.brief}</ActiveNavLink>
        <ActiveNavLink href="/audit">{labels.audit}</ActiveNavLink>
        <ActiveNavLink href="/prop-firm-payout-risk">{labels.payout}</ActiveNavLink>
        <ActiveNavLink href="/prop-firm-rules">{labels.rules}</ActiveNavLink>
        <ActiveNavLink href="/trustpilot-prop-firms">{labels.trustpilot}</ActiveNavLink>
        <ActiveNavLink href="/prop-firm-statistics">{labels.statistics}</ActiveNavLink>
      </div>
    </div>
  );
}
