import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import '@fontsource-variable/archivo/wdth.css';
import './globals.css';
import './design-system.css';
import './design-refresh.css';
import './design-epure.css';
import ActiveNavLink from './components/ActiveNavLink';
import RiskEvidenceMenu from './components/RiskEvidenceMenu';
import SiteSearch from './components/SiteSearch';
import ThemeToggle from './components/ThemeToggle';
import { propFirms } from './lib/propFirms';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './lib/site';

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

const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: 'Prop Radar',
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'PropRadar: Independent Prop Firm Reviews & Comparison 2026',
    template: '%s | PropRadar',
  },
  description:
    `Independent prop firm reviews: compare challenge prices, rules, payout evidence, Trustpilot status and legal entities for ${Math.floor(propFirms.length / 10) * 10}+ firms. Every fact sourced.`,
  keywords: [
    'prop firm',
    'prop firm comparator',
    'FTMO',
    'The5ers',
    'payout prop firm',
    'challenge trading',
    'Trustpilot prop firm',
    'prop firm reviews',
    'prop firm challenge',
    'best prop firms',
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
    title: 'PropRadar: Independent Prop Firm Reviews & Comparison 2026',
    description:
      'A clear radar to compare prop firms, filter marketing-heavy reviews and spot payout risks.',
    url: SITE_URL,
    type: 'website',
    locale: 'en_US',
    siteName: 'PropRadar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropRadar: Independent Prop Firm Reviews & Comparison 2026',
    description:
      'Compare prop firms on sourced facts: challenge rules, prices, payout evidence, Trustpilot status and legal entities.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replace(/</g, '\\u003c') }}
        />
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
                <ActiveNavLink href="/prop-firm-comparison" activePrefixes={['/compare', '/tools', '/firm']}>Comparator</ActiveNavLink>
                <ActiveNavLink href="/guides" activePrefixes={['/best-prop-firms', '/fr']}>Guides</ActiveNavLink>
                <RiskEvidenceMenu />
                <ActiveNavLink href="/promos">Deals</ActiveNavLink>
              </nav>
              <div className="header-actions">
                <SiteSearch />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <nav className="mobile-tabbar" aria-label="Mobile navigation">
            <ActiveNavLink href="/">Home</ActiveNavLink>
            <ActiveNavLink href="/prop-firm-comparison" activePrefixes={['/compare', '/tools', '/firm']}>Compare</ActiveNavLink>
            <ActiveNavLink href="/guides" activePrefixes={['/best-prop-firms', '/prop-firm-challenge', '/fr']}>Guides</ActiveNavLink>
            <ActiveNavLink href="/audit" activePrefixes={['/radar-brief', '/prop-firm-payout-risk', '/prop-firm-rules', '/trustpilot-prop-firms']}>Risks</ActiveNavLink>
            <ActiveNavLink href="/promos">Deals</ActiveNavLink>
          </nav>
          <div id="main-content" tabIndex={-1}>{children}</div>
          <footer className="footer">
            <div className="container footer-grid">
              <div className="footer-brand-block">
                <Link href="/" className="footer-brand">PropRadar</Link>
                <p>Independent, risk-first prop firm research for decisions made before checkout.</p>
              </div>
              <nav className="footer-nav" aria-label="Research links">
                <strong>Research</strong>
                <Link href="/prop-firm-comparison">Comparator</Link>
                <Link href="/guides">Guides</Link>
                <Link href="/best-prop-firms">Best prop firms</Link>
                <Link href="/prop-firm-challenge">Prop firm challenge guide</Link>
                <Link href="/tools">Decision tools</Link>
              </nav>
              <nav className="footer-nav" aria-label="Risk and evidence links">
                <strong>Risk watch</strong>
                <Link href="/radar-brief">Weekly risk brief</Link>
                <Link href="/audit">Source audit</Link>
                <Link href="/prop-firm-payout-risk">Payout watch</Link>
                <Link href="/prop-firm-rules">Rule audits</Link>
              </nav>
              <nav className="footer-nav" aria-label="Offers and review links">
                <strong>More</strong>
                <Link href="/promos">Risk-checked deals</Link>
                <Link href="/trustpilot-prop-firms">Trustpilot research</Link>
                <a href="/feed.xml">Research feed</a>
                <Link href="/fr" hrefLang="fr">Guides en français</Link>
              </nav>
            </div>
            <div className="container footer-bottom">
              <span>Independent decision support. Verify official terms before checkout.</span>
              <Link href="/audit">Method and sources</Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
