import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested PropRadar research page could not be found.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="container system-state-page">
      <section className="system-state-panel" aria-labelledby="not-found-title">
        <div className="system-state-copy">
          <span className="system-state-kicker">404 / Off radar</span>
          <h1 id="not-found-title">This page is not in the current dataset.</h1>
          <p>
            The address may be outdated, or the firm may now use a different profile. Search the comparator before assuming the listing disappeared.
          </p>
          <div className="system-state-actions">
            <Link className="btn btn-primary" href="/comparateur">Open comparator</Link>
            <Link className="btn" href="/guides">Browse guides</Link>
          </div>
        </div>
        <div className="system-state-routes" aria-label="Useful routes">
          <span>Useful routes</span>
          <Link href="/audit">Audit center</Link>
          <Link href="/promos">Risk-checked deals</Link>
          <Link href="/">PropRadar home</Link>
        </div>
      </section>
    </main>
  );
}
