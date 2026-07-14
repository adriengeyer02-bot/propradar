import type { ReactNode } from 'react';
import { createPageMetadata } from '../lib/pageMetadata';

export const metadata = createPageMetadata({
  title: 'Prop Firm Comparator: Scores, Payouts and Legal Risk',
  description: 'Compare prop firms by score, price, drawdown, payout risk, legal evidence, Reddit, X/Twitter and Trustpilot reliability.',
  path: '/comparateur',
  keywords: ['prop firm comparator', 'compare prop firms', 'best prop firm', 'prop firm payout risk'],
  category: 'Prop firm comparison',
});

export default function ComparatorLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
