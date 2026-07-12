import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';
import './design-system.css';
import SiteSearch from './components/SiteSearch';
import ThemeToggle from './components/ThemeToggle';
import { SITE_NAME, SITE_URL } from './lib/site';

const themeInitScript = `
  (function () {
    try {
      var savedTheme = localStorage.getItem('propradar-theme');
      var theme = savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.dataset.theme = 'light';
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'PropRadar - Independent prop firm comparator',
    template: '%s | PropRadar',
  },
  description:
    'Compare prop firms with independent scoring: products, drawdown rules, payouts, Reddit, X/Twitter, Trustpilot reliability and visible conflicts of interest.',
  keywords: [
    'prop firm',
    'prop firm comparator',
    'FTMO',
    'The5ers',
    'payout prop firm',
    'challenge trading',
    'Trustpilot prop firm',
    'Reddit prop firm',
    'Twitter prop firm',
    'X prop firm',
  ],
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'PropRadar - Independent prop firm comparator',
    description:
      'A clear radar to compare prop firms, filter marketing-heavy reviews and spot payout risks.',
    type: 'website',
    locale: 'en_US',
    siteName: 'PropRadar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropRadar - Independent prop firm comparator',
    description:
      'Compare prop firms with independent scoring, Reddit signals, Trustpilot reliability and payout risk.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f4f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0d12' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="site-shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link href="/" className="brand" aria-label="PropRadar home">
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
              <nav className="nav nav-primary" aria-label="Main navigation">
                <Link href="/">Home</Link>
                <Link href="/comparateur">Comparator</Link>
                <Link href="/outils">Tools</Link>
                <Link href="/promos">Deals</Link>
                <Link href="/guides">Guides</Link>
                <div className="nav-menu">
                  <button type="button" aria-haspopup="true">Risk &amp; Evidence</button>
                  <div className="nav-menu-panel">
                    <Link href="/audit">Audit center</Link>
                    <Link href="/risques-payout">Payout risks</Link>
                    <Link href="/audit-communautaire">Community watch</Link>
                    <Link href="/regles">Trading rules</Link>
                    <Link href="/#methodologie">Methodology</Link>
                  </div>
                </div>
              </nav>
              <div className="header-actions">
                <SiteSearch />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <nav className="mobile-tabbar" aria-label="Mobile navigation">
            <Link href="/">Home</Link>
            <Link href="/comparateur">Compare</Link>
            <Link href="/outils">Tools</Link>
            <Link href="/promos">Deals</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/audit">Risks</Link>
          </nav>
          <div id="main-content" tabIndex={-1}>{children}</div>
          <footer className="footer">
            <div className="container">
              PropRadar is a decision-support tool. Prop firm rules change quickly: always verify official sources before buying a challenge.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
