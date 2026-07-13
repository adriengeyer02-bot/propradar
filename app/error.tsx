'use client';

import Link from 'next/link';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="container system-state-page">
      <section className="system-state-panel" aria-labelledby="error-title">
        <div className="system-state-copy">
          <span className="system-state-kicker">Research view unavailable</span>
          <h1 id="error-title">The evidence panel could not be loaded.</h1>
          <p role="alert">
            No decision should rely on a partial page. Retry the view, or return to the comparator and open another profile.
          </p>
          <div className="system-state-actions">
            <button className="btn btn-primary" type="button" onClick={reset}>Retry</button>
            <Link className="btn" href="/comparateur">Open comparator</Link>
          </div>
        </div>
        <div className="system-state-routes" aria-label="Alternative routes">
          <span>Alternative routes</span>
          <Link href="/audit">Audit center</Link>
          <Link href="/guides">Research guides</Link>
          <Link href="/">PropRadar home</Link>
        </div>
      </section>
    </main>
  );
}
