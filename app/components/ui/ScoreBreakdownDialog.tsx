'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { ScoreMethodCopy } from '../../lib/scoreMethodI18n';

export type ScoreStep = {
  kind: 'editorial' | 'rules' | 'trustpilot' | 'closed';
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
  tone: string;
  steps: ScoreStep[];
  signals: { label: string; value: string; tone: string }[];
  programs: { name: string; load: number }[];
  heaviest: { text: string; program: string; severity: string; severityKey: string; clarity: string; points: number }[];
  rulesNotes: string[];
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

  const maxLoad = Math.max(30, ...view.programs.map((program) => program.load));
  const delay = (index: number) => ({ '--reveal-delay': `${80 + index * 70}ms` }) as CSSProperties;

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

            <ol className="psb-steps">
              {view.steps.map((step, index) => (
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
                  <p>{step.detail}</p>
                  {step.kind === 'rules' && step.delta > 0 ? (
                    <div className="psb-rule-equation">
                      <span><strong>{view.steps[0].value}</strong><small>{copy.editorial}</small></span>
                      <b aria-hidden="true">−</b>
                      <span><strong>{step.delta}</strong><small>{copy.rules}</small></span>
                      <b aria-hidden="true">=</b>
                      <span><strong>{step.value}</strong><small>{copy.afterRules}</small></span>
                    </div>
                  ) : null}
                  {step.note ? <p className="psb-note">{step.note}</p> : null}
                  {step.kind === 'rules' && view.programs.length ? (
                    <div className="psb-programs">
                      <span className="prg-hud-label">{copy.programLoad}</span>
                      <ul>
                        {view.programs.map((program) => (
                          <li key={program.name}>
                            <span className="psb-program-name">{program.name}</span>
                            <span className="psb-program-bar" aria-hidden="true"><i style={{ width: `${Math.min(100, (program.load / maxLoad) * 100)}%` }} /></span>
                            <span className="psb-program-load">{program.load}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {step.kind === 'rules' && view.heaviest.length ? (
                    <div className="psb-heaviest">
                      <span className="prg-hud-label">{copy.heaviest}</span>
                      {step.delta > 0 ? <p className="psb-raw-notice">{fill(copy.rawWeightNotice, { penalty: step.delta })}</p> : null}
                      <ul>
                        {view.heaviest.map((rule, ruleIndex) => (
                          <li key={ruleIndex}>
                            <span className="psb-pts psb-raw-points">{rule.points} {copy.rawPoints}</span>
                            <span>
                              <strong>{rule.program}</strong> · {rule.severity} · {rule.clarity}
                              <em>{rule.text}</em>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {step.kind === 'rules' ? view.rulesNotes.map((note) => <p key={note} className="psb-note">{note}</p>) : null}
                </li>
              ))}
              <li className="psb-step psb-step-final prg-hud-reveal" style={delay(view.steps.length + 2)}>
                <div className="psb-step-line">
                  <span className="psb-step-label">{copy.final}</span>
                  <span className={`psb-step-value psb-tone-${view.tone}`}>{view.score}/100</span>
                </div>
              </li>
            </ol>

            {view.signals.length ? (
              <div className="psb-signals prg-hud-reveal" style={delay(view.steps.length + 3)}>
                <span className="prg-hud-label">{copy.signals}</span>
                <dl>
                  {view.signals.map((signal) => (
                    <div key={signal.label}><dt>{signal.label}</dt><dd className={`psb-tone-${signal.tone}`}>{signal.value}</dd></div>
                  ))}
                </dl>
              </div>
            ) : null}

            <footer className="prg-hud-footer prg-hud-reveal" style={delay(view.steps.length + 5)}>
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
