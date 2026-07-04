import type { Metadata } from 'next';
import OutilsClient from './OutilsClient';

export const metadata: Metadata = {
  title: 'Outils prop firms : comparatif et choix par style',
  description:
    'Compare plusieurs prop firms côte à côte et trouve la prop firm la plus adaptée à ton style : SMC, ICT, swing trading, day trading, scalping, news trading, EA ou breakout.',
  alternates: {
    canonical: '/outils',
  },
};

export default function OutilsPage() {
  return <OutilsClient />;
}
