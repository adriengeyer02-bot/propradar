import type { Metadata } from 'next';
import OutilsClient from './OutilsClient';

export const metadata: Metadata = {
  title: 'Outils prop firms : comparatif et choix par style',
  description:
    'Compare plusieurs prop firms cote a cote et trouve la prop firm la plus adaptee a ton style : SMC, ICT, swing trading, day trading, scalping, news trading, EA ou breakout.',
  alternates: {
    canonical: '/outils',
  },
};

export default function OutilsPage() {
  return <OutilsClient />;
}
