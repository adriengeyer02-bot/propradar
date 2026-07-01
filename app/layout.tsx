import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';
import { SITE_NAME, SITE_URL } from './lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'PropRadar - Comparateur indépendant de prop firms',
    template: '%s | PropRadar',
  },
  description:
    'Compare les prop firms avec un scoring indépendant : produits, règles de drawdown, payouts, Reddit score, fiabilité Trustpilot et conflits d’intérêt.',
  keywords: [
    'prop firm',
    'comparateur prop firm',
    'FTMO',
    'The5ers',
    'payout prop firm',
    'challenge trading',
    'Trustpilot prop firm',
    'Reddit prop firm',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    title: 'PropRadar - Comparateur indépendant de prop firms',
    description:
      'Un radar clair pour comparer les prop firms, filtrer les avis marketing et repérer les risques de payout.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'PropRadar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropRadar - Comparateur indépendant de prop firms',
    description:
      'Compare les prop firms avec un scoring indépendant, des signaux Reddit, Trustpilot et payout.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <div className="site-shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link href="/" className="brand" aria-label="Accueil PropRadar">
                <span className="brand-mark" aria-hidden="true">
                  <svg viewBox="0 0 64 64" role="img">
                    <circle cx="32" cy="32" r="21" />
                    <circle cx="32" cy="32" r="12" />
                    <path d="M32 32 49 20" />
                    <circle cx="32" cy="32" r="4" />
                    <path d="M18 43c4 5 10 8 17 7" />
                  </svg>
                </span>
                <span>PropRadar</span>
              </Link>
              <nav className="nav" aria-label="Navigation principale">
                <Link href="/">Accueil</Link>
                <Link href="/comparateur">Comparateur</Link>
                <Link href="/meilleures-prop-firms">Top firms</Link>
                <Link href="/regles">Règles</Link>
                <Link href="/promos">Promos</Link>
                <Link href="/audit">Audit</Link>
                <Link href="/#methodologie">Méthodologie</Link>
              </nav>
              <Link href="/comparateur" className="header-search" aria-label="Rechercher une prop firm">
                <span>⌕</span>
                <span>Rechercher</span>
              </Link>
            </div>
          </header>
          {children}
          <footer className="footer">
            <div className="container">
              PropRadar est un outil d'aide à la décision. Les règles des prop firms changent vite : vérifie toujours les sources officielles avant d'acheter un challenge.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
