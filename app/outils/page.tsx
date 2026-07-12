import type { Metadata } from 'next';
import OutilsClient from './OutilsClient';

export const metadata: Metadata = {
  title: 'Prop firm tools: comparison and trading-style picker',
  description:
    'Compare several prop firms side by side and find the prop firm best suited to your style: SMC, ICT, swing trading, day trading, scalping, news trading, EA or breakout.',
  alternates: {
    canonical: '/outils',
  },
};

export default function OutilsPage() {
  return <OutilsClient />;
}
