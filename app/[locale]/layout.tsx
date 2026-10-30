import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import '@fontsource-variable/archivo/wdth.css';
import '../globals.css';
import '../design-system.css';
import '../design-refresh.css';
import '../design-epure.css';
import ActiveNavLink from '../components/ActiveNavLink';
import RiskEvidenceMenu from '../components/RiskEvidenceMenu';
import SiteSearch from '../components/SiteSearch';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LocaleNotice from '../components/LocaleNotice';
import { notFound } from 'next/navigation';
import { HTML_LANG, OG_LOCALE, isLocale, localePath, type Locale } from '../lib/locales';
import { fmt, getMessages } from '../lib/messages';
import { propFirms } from '../lib/propFirms';
import { FOUNDER, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';

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
      founder: { '@type': 'Person', '@id': `${SITE_URL}/about#founder`, name: FOUNDER.handle, url: `${SITE_URL}/about` },
      email: 'contact@propradar.tech',
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

export function generateStaticParams() {
  // English is built ahead; the other languages render on first visit, then stay cached.
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  const title = t.home.metaTitle;
  const description = fmt(t.home.metaDescription, { count: Math.floor(propFirms.length / 10) * 10 });
  return {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: title,
    template: '%s | PropRadar',
  },
  description,
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
    canonical: localePath(locale, '/'),
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
    title,
    description,
    url: `${SITE_URL}${localePath(locale, '/')}`,
    type: 'website',
    locale: OG_LOCALE[locale],
    siteName: 'PropRadar',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
}

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getMessages(locale);
  const c = t.chrome;
  const L = (path: string) => localePath(locale, path);
  return (
    <html
      lang={HTML_LANG[locale]}
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
        <a href="#main-content" className="skip-link">{c.skip}</a>
        <div className="site-shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link href={L('/')} className="brand" aria-label={c.homeAria}>
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
              <nav className="nav nav-primary" aria-label={c.mainNav}>
                <ActiveNavLink href="/prop-firm-radar">{c.radar}</ActiveNavLink>
                <ActiveNavLink href="/prop-firm-comparison" activePrefixes={['/compare', '/tools', '/firm']}>{c.comparator}</ActiveNavLink>
                <ActiveNavLink href="/guides" activePrefixes={['/best-prop-firms', '/articles']}>{c.guides}</ActiveNavLink>
                <RiskEvidenceMenu labels={{ title: c.riskWatch, ...c.riskMenu }} />
                <ActiveNavLink href="/promos">{c.deals}</ActiveNavLink>
              </nav>
              <div className="header-actions">
                <SiteSearch label={c.search} />
                <LanguageSwitcher label={c.language} />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <nav className="mobile-tabbar" aria-label={c.mobileNav}>
            <ActiveNavLink href="/">{c.home}</ActiveNavLink>
            <ActiveNavLink href="/prop-firm-radar">{c.radar}</ActiveNavLink>
            <ActiveNavLink href="/prop-firm-comparison" activePrefixes={['/compare', '/tools', '/firm']}>{c.compare}</ActiveNavLink>
            <ActiveNavLink href="/guides" activePrefixes={['/best-prop-firms', '/prop-firm-challenge', '/articles']}>{c.guides}</ActiveNavLink>
            <ActiveNavLink href="/audit" activePrefixes={['/radar-brief', '/prop-firm-payout-risk', '/prop-firm-rules', '/trustpilot-prop-firms', '/prop-firm-statistics']}>{c.risks}</ActiveNavLink>
            <ActiveNavLink href="/promos">{c.deals}</ActiveNavLink>
          </nav>
          <LocaleNotice title={t.notice.title} body={t.notice.body} english={t.notice.english} />
          <div id="main-content" tabIndex={-1}>{children}</div>
          <footer className="footer">
            <div className="container footer-grid">
              <div className="footer-brand-block">
                <Link href={L('/')} className="footer-brand">PropRadar</Link>
                <p>{c.footer.tagline}</p>
              </div>
              <nav className="footer-nav" aria-label="Research links">
                <strong>{c.footer.research}</strong>
                <Link prefetch={false} href={L('/prop-firm-comparison')}>{c.comparator}</Link>
                <Link href={L('/prop-firm-radar')}>{c.footer.radar}</Link>
                <Link href={L('/guides')}>{c.guides}</Link>
                <Link href={L('/best-prop-firms')}>{c.footer.best}</Link>
                <Link href={L('/prop-firm-challenge')}>{c.footer.challenge}</Link>
                <Link prefetch={false} href={L('/tools')}>{c.footer.tools}</Link>
              </nav>
              <nav className="footer-nav" aria-label="Risk and evidence links">
                <strong>{c.riskWatch}</strong>
                <Link href={L('/radar-brief')}>{c.footer.brief}</Link>
                <Link href={L('/audit')}>{c.footer.audit}</Link>
                <Link href={L('/prop-firm-payout-risk')}>{c.footer.payout}</Link>
                <Link href={L('/prop-firm-rules')}>{c.footer.rules}</Link>
              </nav>
              <nav className="footer-nav" aria-label="Offers and review links">
                <strong>{c.footer.more}</strong>
                <Link href={L('/about')}>{t.about.footerAbout}</Link>
                <Link href={L('/promos')}>{c.footer.deals}</Link>
                <Link href={L('/trustpilot-prop-firms')}>{c.footer.trustpilot}</Link>
                <Link href={L('/prop-firm-statistics')}>{c.footer.statistics}</Link>
                <a href="/feed.xml">{c.footer.feed}</a>
                <Link href="/fr/articles" hrefLang="fr">{c.footer.frGuides}</Link>
              </nav>
            </div>
            <div className="container footer-bottom">
              <span>{c.footer.bottom}</span>
              <span className="footer-bottom-links">
                <Link href={L('/about')}>{t.about.footerShort}</Link>
                <Link href={L('/audit')}>{c.footer.method}</Link>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
