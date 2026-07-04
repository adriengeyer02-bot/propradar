'use client';

import { useEffect, useState } from 'react';

type LiveSignal = {
  label: string;
  configured: boolean;
  status: 'live' | 'fallback' | 'error';
  query: string;
  score: number;
  signal: string;
  positive: number;
  negative: number;
  neutral: number;
  sampleSize: number;
  confidence: string;
  source: string;
  updatedAt: string;
  error?: string;
  items: Array<{
    id: string;
    title: string;
    url: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    context?: string;
  }>;
};

type SignalsResponse = {
  updatedAt: string;
  signals: {
    reddit: LiveSignal;
    x: LiveSignal;
  };
};

type Props = {
  slug: string;
};

export default function LiveCommunitySignals({ slug }: Props) {
  const [data, setData] = useState<SignalsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSignals() {
      try {
        setError(null);
        const response = await fetch(`/api/signals/firm/${slug}?limit=25`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Signals ${response.status}`);
        }

        setData((await response.json()) as SignalsResponse);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setError(loadError instanceof Error ? loadError.message : 'Signal indisponible');
      }
    }

    loadSignals();

    return () => controller.abort();
  }, [slug]);

  const reddit = data?.signals.reddit;
  const x = data?.signals.x;

  return (
    <div className="panel live-signal-panel">
      <div className="live-signal-header">
        <div>
          <div className="eyebrow">Score brut communautaire</div>
          <h3>Avis positifs et négatifs</h3>
        </div>
        <span className="badge badge-blue">{data ? 'Chargé' : error ? 'Score brut' : 'Chargement'}</span>
      </div>

      {error ? (
        <p className="muted">Impossible de rafraîchir ces scores pour le moment : {error}. Les scores bruts restent visibles plus haut.</p>
      ) : null}

      <div className="live-signal-grid">
        {reddit ? <LiveSignalCard signal={reddit} /> : <LiveSignalSkeleton label="Reddit" />}
        {x ? <LiveSignalCard signal={x} /> : <LiveSignalSkeleton label="X/Twitter" />}
      </div>
    </div>
  );
}

function LiveSignalCard({ signal }: { signal: LiveSignal }) {
  return (
    <article className={`live-signal-card live-signal-${signal.status}`}>
      <div className="live-signal-card-top">
        <strong>{signal.label}</strong>
        <span className={`badge ${statusClass(signal.status, signal.configured)}`}>{statusLabel(signal.status, signal.configured)}</span>
      </div>
      <div className="live-signal-score">
        <span>{signal.score}/100</span>
        <strong>{signal.signal}</strong>
      </div>
      <div className="sentiment-breakdown">
        <span><strong>{signal.positive}</strong> positifs</span>
        <span><strong>{signal.negative}</strong> négatifs</span>
        <span><strong>{signal.neutral}</strong> neutres</span>
      </div>
      <div className="score-proof">
        <div><span>Source</span><strong>{signal.source}</strong></div>
        <div><span>Volume</span><strong>{signal.sampleSize} mention(s)</strong></div>
        <div><span>Confiance</span><strong>{signal.confidence}</strong></div>
      </div>
      {signal.error ? <p className="muted">{signal.error}</p> : null}
      {signal.items.length ? (
        <ul className="live-signal-items">
          {signal.items.slice(0, 3).map((item) => (
            <li key={item.id}>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>
              <span>{item.context ?? item.sentiment}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <small className="live-query">Query : {signal.query}</small>
    </article>
  );
}

function LiveSignalSkeleton({ label }: { label: string }) {
  return (
    <article className="live-signal-card live-signal-loading">
      <div className="live-signal-card-top">
        <strong>{label}</strong>
        <span className="badge badge-neutral">Chargement</span>
      </div>
      <p className="muted">Chargement des scores bruts...</p>
    </article>
  );
}

function statusLabel(status: LiveSignal['status'], configured: boolean) {
  if (status === 'live') return 'Revue chargée';
  if (!configured) return 'Score brut';
  return 'À vérifier';
}

function statusClass(status: LiveSignal['status'], configured: boolean) {
  if (status === 'live') return 'badge-green';
  if (!configured) return 'badge-amber';
  return 'badge-red';
}
