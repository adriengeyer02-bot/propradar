import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Prop Firm Comparator - Scores, Payouts and Legal Risk',
  description:
    'Compare prop firms by PropRadar score, price, drawdown, payout risk, legal evidence, Reddit, X/Twitter and Trustpilot reliability.',
  alternates: {
    canonical: '/comparateur',
  },
  openGraph: {
    title: 'Prop Firm Comparator - PropRadar',
    description:
      'Filter prop firms in real time and compare payout risk, rules, public signals and legal source depth.',
    url: '/comparateur',
    type: 'website',
  },
};

export default function ComparatorLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
