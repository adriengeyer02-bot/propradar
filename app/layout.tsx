import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'PropRadar - Comparateur de prop firms',
  description:
    'Analyse, scoring et comparaison des prop firms, challenges, règles de drawdown, payouts et risques opérationnels.',
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
                <span className="brand-mark">PR</span>
                <span>PropRadar</span>
              </Link>
              <nav className="nav" aria-label="Navigation principale">
                <Link href="/comparateur">Comparateur</Link>
                <Link href="/#methodologie">Méthodologie</Link>
                <Link href="/#risques">Risques</Link>
              </nav>
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
