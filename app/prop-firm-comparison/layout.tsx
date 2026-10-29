import type { ReactNode } from 'react';
import { createPageMetadata } from '../lib/pageMetadata';

export const metadata = createPageMetadata({
  title: 'Prop Firm Comparison Table: Prices, Rules, Payouts & Legal Risk',
  description: 'Compare prop firms side by side: challenge price, profit split, drawdown type, payout evidence, Trustpilot status and the country of each legal entity.',
  path: '/prop-firm-comparison',
  keywords: ['prop firm comparison', 'compare prop firms', 'prop firm comparator', 'best prop firm', 'prop firm payout risk'],
  category: 'Prop firm comparison',
});

export default function ComparatorLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
