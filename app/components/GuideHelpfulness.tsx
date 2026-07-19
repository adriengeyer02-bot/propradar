'use client';

import { useEffect, useMemo, useState } from 'react';

type Vote = 'helpful' | 'needs-work';
type FeedbackReason = 'missing-detail' | 'hard-to-scan' | 'outdated';

type FeedbackStats = {
  configured: boolean;
  helpful: number;
  needsWork: number;
  total: number;
  helpfulPercent: number | null;
  minimumPublicVotes: number;
};

type GuideHelpfulnessProps = {
  slug: string;
  prompt: string;
};

const VOTER_KEY = 'propradar-guide-feedback-voter';

const reasonOptions: { value: FeedbackReason; label: string }[] = [
  { value: 'missing-detail', label: 'Missing detail' },
  { value: 'hard-to-scan', label: 'Hard to scan' },
  { value: 'outdated', label: 'Looks outdated' },
];

function getVoterId() {
  const existing = window.localStorage.getItem(VOTER_KEY);
  if (existing) return existing;

  const voterId = typeof window.crypto?.randomUUID === 'function'
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(VOTER_KEY, voterId);
  return voterId;
}

export default function GuideHelpfulness({ slug, prompt }: GuideHelpfulnessProps) {
  const voteStorageKey = useMemo(() => `propradar-guide-feedback:${slug}`, [slug]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [existingVote, setExistingVote] = useState<Vote | null>(null);
  const [choosingReason, setChoosingReason] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedVote = window.localStorage.getItem(voteStorageKey);
    if (savedVote === 'helpful' || savedVote === 'needs-work') {
      setExistingVote(savedVote);
    }

    const controller = new AbortController();

    fetch(`/api/guide-feedback?slug=${encodeURIComponent(slug)}`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Feedback unavailable');
        return response.json() as Promise<FeedbackStats>;
      })
      .then((data) => {
        setAvailable(data.configured);
        if (data.configured) setStats(data);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setAvailable(false);
      });

    return () => controller.abort();
  }, [slug, voteStorageKey]);

  async function submitVote(vote: Vote, reason?: FeedbackReason) {
    if (submitting || existingVote) return;
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/guide-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          vote,
          reason,
          voterId: getVoterId(),
        }),
      });
      const data = await response.json() as FeedbackStats & { accepted?: boolean; error?: string };

      if (!response.ok) throw new Error(data.error || 'Unable to save feedback');

      window.localStorage.setItem(voteStorageKey, vote);
      setExistingVote(vote);
      setChoosingReason(false);
      setStats(data);
      setMessage(data.accepted === false ? 'Your response was already recorded.' : 'Thank you. Your feedback will guide the next editorial review.');
    } catch {
      setMessage('The response could not be saved. Please try again shortly.');
    } finally {
      setSubmitting(false);
    }
  }

  if (available !== true) return null;

  const publicSummary = stats && typeof stats.helpfulPercent === 'number'
    ? `${stats.helpfulPercent}% of ${stats.total} readers found this guide useful.`
    : `Reader results appear after ${stats?.minimumPublicVotes ?? 10} recorded responses.`;

  return (
    <section className="guide-feedback" aria-labelledby={`guide-feedback-${slug}`}>
      <div className="guide-feedback-copy">
        <span>Reader feedback</span>
        <h2 id={`guide-feedback-${slug}`}>{prompt}</h2>
        <p>{publicSummary}</p>
      </div>

      <div className="guide-feedback-action">
        {existingVote ? (
          <div className="guide-feedback-thanks" role="status">
            <strong>Response recorded</strong>
            <span>{message || 'Thank you for helping improve this guide.'}</span>
          </div>
        ) : choosingReason ? (
          <div className="guide-feedback-reasons" role="group" aria-label="What should be improved?">
            <span>What should be improved?</span>
            <div>
              {reasonOptions.map((reason) => (
                <button
                  type="button"
                  key={reason.value}
                  onClick={() => submitVote('needs-work', reason.value)}
                  disabled={submitting}
                >
                  {reason.label}
                </button>
              ))}
            </div>
            <button type="button" className="guide-feedback-back" onClick={() => setChoosingReason(false)} disabled={submitting}>
              Back
            </button>
          </div>
        ) : (
          <div className="guide-feedback-buttons" role="group" aria-label="Was this guide useful?">
            <button type="button" className="guide-feedback-yes" onClick={() => submitVote('helpful')} disabled={submitting}>
              Yes, useful
            </button>
            <button type="button" onClick={() => setChoosingReason(true)} disabled={submitting}>
              Needs work
            </button>
          </div>
        )}
        {message && !existingVote ? <p className="guide-feedback-error" role="status">{message}</p> : null}
      </div>
    </section>
  );
}
