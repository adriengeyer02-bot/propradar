'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { ScoreMethodCopy } from '../../lib/scoreMethodI18n';
import type { ScoreV4Copy } from '../../lib/scoreV4I18n';
import type { V5RuleDeduction } from '../../lib/scoringV5';

export type ScoreStep = {
  kind: 'editorial' | 'rules' | 'trustpilot' | 'safety' | 'closed';
  label: string;
  detail: string;
  /** Score after this step. */
  value: number;
  /** Points removed by this step (0 for the editorial base). */
  delta: number;
  note?: string;
};

export type ScoreBreakdownView = {
  name: string;
  score: number;
  pillars?: {
    version: 4 | 5;
    values: [number, number, number, number, number];
    maxima: [number, number, number, number, number];
    copy: ScoreV4Copy;
  };
  tone: string;
  steps: ScoreStep[];
  signals: { label: string; value: string; tone: string }[];
  programs: { name: string; load: number }[];
  heaviest: { text: string; program: string; severity: string; severityKey: string; clarity: string; points: number; kind?: 'restriction' | 'risk' | 'classic' }[];
  rulesNotes: string[];
  v5Evidence?: {
    deductions: V5RuleDeduction[];
    contractProtection: { points: number; reason: string; source: string };
    checkedOn: string;
    limitedPayoutProof: boolean;
    copy: { contract: string; consequence: string; source: string; evidence: string; limited: string; rulesClarification: string };
  };
  methodHref: string;
  rulesHref: string;
};

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));

/**
 * Click on the score ring of a firm page: opens a HUD-style dialog explaining,
 * step by step, how the displayed score is built (SCORING.md).
 */
export default function ScoreBreakdownDialog({ view, copy, children }: { view: ScoreBreakdownView; copy: ScoreMethodCopy; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Start on the content, not on the close button (no stray focus ring on open; Tab still reaches it).
      scrollRef.current?.focus({ preventScroll: true });
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const delay = (index: number) => ({ '--reveal-delay': `${80 + index * 70}ms` }) as CSSProperties;
  // Legacy accounts keep their actual −N rules step. Published V4 accounts
  // show a zero *additional* deduction because their contract risks already
  // affect B1–B4. V5 scorecards will expose their own B2 deduction explicitly.
  const steps: ScoreStep[] = view.pillars?.version === 4 && !view.steps.some((step) => step.kind === 'rules')
    ? view.steps.flatMap((step): ScoreStep[] => step.kind === 'editorial'
      ? [step, {
          kind: 'rules',
          label: copy.rules,
          detail: view.pillars!.copy.restriction,
          value: step.value,
          delta: 0,
        }]
      : [step])
    : view.steps;

  return (
    <>
      <button type="button" className="psb-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={fill(copy.open, { name: view.name })}>
        {children}
        <span className="psb-trigger-hint" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6.5" /><path d="M8 7.2v4M8 4.8v.1" strokeLinecap="round" /></svg>
          {copy.hint}
        </span>
      </button>
      <dialog
        ref={dialogRef}
        className="psb-dialog"
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(event) => { if (event.target === dialogRef.current) setOpen(false); }}
      >
        {open ? (
          <div className="prg-hud psb-hud">
            <span className="prg-hud-corners" aria-hidden="true" />
            <span className="prg-hud-scan" aria-hidden="true" />
            <button type="button" className="prg-hud-close" onClick={() => setOpen(false)} aria-label={copy.close}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13" /></svg>
            </button>
            {/* The frame (corners, scan line, close button) stays fixed; only this inner panel scrolls. */}
            <div className="psb-scroll" ref={scrollRef} tabIndex={-1}>
            <div className="prg-hud-top prg-hud-reveal" style={delay(0)}>
              <span><i aria-hidden="true" />{copy.eyebrow}</span>
              <span className="prg-hud-index" aria-hidden="true">PR / SCORE</span>
            </div>

            <header className="psb-head prg-hud-reveal" style={delay(1)}>
              <div className={`prg-hud-score prg-hud-score-${view.tone}`} style={{ '--score-offset': 151 * (1 - view.score / 100) } as CSSProperties}>
                <svg viewBox="0 0 58 58" aria-hidden="true"><circle cx="29" cy="29" r="24" /><circle className="prg-hud-meter" cx="29" cy="29" r="24" /></svg>
                <strong>{view.score}<small>/100</small></strong>
              </div>
              <h2 id={titleId}>{fill(copy.title, { name: view.name, score: view.score })}</h2>
            </header>

            {view.pillars ? (
              <section className="psb-v4 prg-hud-reveal" style={delay(2)} aria-label={view.pillars.copy.title}>
                <div className="psb-v4-heading">
                  <strong>{view.pillars.copy.title}</strong>
                  <small>{view.pillars.copy.subtitle}</small>
                </div>
                <ol className="psb-v4-list">
                  {view.pillars.values.map((value, index) => (
                    <li key={index}>
                      <div>
                        <span>{view.pillars!.copy.blocks[index]}</span>
                        <strong>{value}<small>/{view.pillars!.maxima[index]}</small></strong>
                      </div>
                      <div className="psb-v4-track" aria-hidden="true">
                        <i style={{ width: `${Math.min(100, Math.max(0, 100 * value / view.pillars!.maxima[index]))}%` }} />
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <ol className="psb-steps">
              {steps.map((step, index) => (
                <li key={step.kind} className={`psb-step psb-step-${step.kind} prg-hud-reveal`} style={delay(index + 2)}>
                  <div className="psb-step-line">
                    <span className="psb-step-label">{step.label}</span>
                    <span className={`psb-step-value${step.delta ? ' psb-step-minus' : ''}`}>
                      {step.kind === 'editorial' ? step.value : step.delta ? `−${step.delta}` : '0'}
                    </span>
                  </div>
                  <div className="psb-bar" aria-hidden="true">
                    <span className="psb-bar-fill" style={{ width: `${step.value}%` }} />
                    {step.delta ? <span className="psb-bar-cut" style={{ left: `${step.value}%`, width: `${step.delta}%` }} /> : null}
                  </div>
                  <p>{step.kind === 'rules' && step.delta > 0 && !view.v5Evidence ? copy.rulesSimple : step.detail}</p>
                  {step.note ? <p className="psb-note">{step.note}</p> : null}
                  {step.kind === 'rules' && view.v5Evidence && step.delta > 0 ? (
                    <div className="psb-v5-clauses">
                      <span className="prg-hud-label">{view.v5Evidence.copy.evidence}</span>
                      <ul>
                        {view.v5Evidence.deductions.map((item) => (
                          <li key={item.factId}>
                            <div className="psb-v5-clause-heading">
                              <strong>{item.program} <small>· {item.phase}</small></strong>
                              <b>−{item.points}</b>
                            </div>
                            <p>{item.clause}</p>
                            <p><span>{view.v5Evidence!.copy.consequence} :</span> {item.consequence}</p>
                            <a href={item.source} target="_blank" rel="noopener noreferrer">{view.v5Evidence!.copy.source} ↗</a>
                          </li>
                        ))}
                      </ul>
                      <p className="psb-v5-footnote">{view.v5Evidence.copy.rulesClarification}</p>
                    </div>
                  ) : null}
                  {step.kind === 'rules' && !view.v5Evidence && (step.delta > 0 || Boolean(view.pillars)) && view.heaviest.length ? (
                    <div className="psb-heaviest">
                      <span className="prg-hud-label">{copy.heaviest}</span>
                      <ul>
                        {view.heaviest.slice(0, 3).map((rule, ruleIndex) => (
                          <li key={ruleIndex}>
                            <span className={`psb-pts psb-kind-${rule.kind === 'risk' ? 'risk' : 'rule'}`}>{rule.kind === 'risk' ? copy.riskTag : copy.restrictionTag}</span>
                            <span>
                              <strong>{rule.program === 'All programs' || rule.program === 'All programmes' ? copy.allPrograms : rule.program}</strong>
                              <em>{rule.text}</em>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
              <li className="psb-step psb-step-final prg-hud-reveal" style={delay(steps.length + 2)}>
                <div className="psb-step-line">
                  <span className="psb-step-label">{copy.final}</span>
                  <span className={`psb-step-value psb-tone-${view.tone}`}>{view.score}/100</span>
                </div>
              </li>
            </ol>

            {view.v5Evidence ? (
              <section className="psb-v5-contract prg-hud-reveal" style={delay(steps.length + 3)}>
                <div><strong>{view.v5Evidence.copy.contract}</strong><b>{view.v5Evidence.contractProtection.points}/15</b></div>
                <p>{view.v5Evidence.contractProtection.reason}</p>
                <a href={view.v5Evidence.contractProtection.source} target="_blank" rel="noopener noreferrer">{view.v5Evidence.copy.source} ↗</a>
                {view.v5Evidence.limitedPayoutProof ? <p className="psb-v5-limited">{view.v5Evidence.copy.limited}</p> : null}
                <small>{view.v5Evidence.checkedOn}</small>
              </section>
            ) : null}

            {view.signals.length ? (
              <div className="psb-signals prg-hud-reveal" style={delay(steps.length + 3)}>
                <span className="prg-hud-label">{copy.signals}</span>
                <dl>
                  {view.signals.map((signal) => (
                    <div key={signal.label}><dt>{signal.label}</dt><dd className={`psb-tone-${signal.tone}`}>{signal.value}</dd></div>
                  ))}
                </dl>
              </div>
            ) : null}

            <details className="psb-scale prg-hud-reveal" style={delay(steps.length + 4)}>
              <summary>{copy.scaleTitle}</summary>
              {view.pillars ? (
                <>
                  <p>{view.pillars.copy.method}</p>
                  <p>{view.pillars.copy.caution}</p>
                  <p className="psb-note">{view.pillars.copy.confidence}</p>
                </>
              ) : (
                <>
                  <ul>{copy.simpleScale.map((line) => <li key={line}>{line}</li>)}</ul>
                  <p className="psb-note">{copy.affiliation}</p>
                </>
              )}
            </details>

            <footer className="prg-hud-footer prg-hud-reveal" style={delay(steps.length + 5)}>
              <div>
                <a href={view.rulesHref} onClick={() => setOpen(false)}>{copy.seeRules}<span aria-hidden="true">↓</span></a>
                <a href={view.methodHref}>{copy.fullMethod}<span aria-hidden="true">→</span></a>
              </div>
            </footer>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
