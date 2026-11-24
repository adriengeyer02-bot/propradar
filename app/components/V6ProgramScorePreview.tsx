'use client';
import { useState } from 'react';
import { v6Preview, type V6Input } from '../lib/scoringV6Preview';

/** Preview component only. Do not mount in public rankings before approval. */
export default function V6ProgramScorePreview({ name, firm }: { name: string; firm: V6Input }) {
  const [selected, setSelected] = useState(firm.programs[0]?.id ?? '');
  const result = v6Preview(firm);
  const program = result.programs.find(p => p.id === selected);
  const rules = program?.rules ?? result.common;
  const score = program?.score ?? result.commonScore;
  return (
    <section aria-label={name + ' V6 score preview'} style={{border:'1px solid #374151',borderRadius:16,padding:20,maxWidth:680}}>
      <p style={{fontSize:12,color:'#fbbf24'}}>RESEARCH PREVIEW · NOT RANKED</p>
      <h2>{name} — {program?.name ?? 'Common clauses only'}</h2>
      <div style={{fontSize:38,fontWeight:700}}>{score}<small style={{fontSize:16}}>/100</small></div>
      {result.programs.length > 0 && <div role="group" aria-label="Select programme" style={{display:'flex',flexWrap:'wrap',gap:8,margin:'16px 0'}}>
        {result.programs.map(p => <button type="button" key={p.id} aria-pressed={p.id===selected} onClick={()=>setSelected(p.id)} style={{border:'1px solid #64748b',borderRadius:8,padding:'8px 12px',fontWeight:p.id===selected?700:400,background:p.id===selected?'#334155':'transparent',color:'inherit'}}>{p.name} · {p.score}</button>)}
      </div>}
      <dl style={{display:'grid',gridTemplateColumns:'1fr auto',gap:8}}>
        <dt>Editorial score</dt><dd>{result.editorial}/100</dd>
        <dt>Restrictive rules</dt><dd>−{rules.points}</dd>
        <dt>Trustpilot</dt><dd>{result.trustpilotPenalty ? '−8' : '0 applied'}</dd>
        <dt><strong>Final score (preview)</strong></dt><dd><strong>{score}/100</strong></dd>
      </dl>
      <h3>Rules and restrictions</h3>
      {rules.facts.length ? <ul style={{listStyle:'none',padding:0}}>
        {rules.facts.map(f => <li key={f.family} style={{borderTop:'1px solid #374151',padding:'12px 0',display:'flex',gap:16,justifyContent:'space-between'}}>
          <div>{f.label}<br/><a href={f.source} target="_blank" rel="noreferrer" style={{fontSize:12,textDecoration:'underline'}}>Official source</a></div>
          <strong style={{color:'#fca5a5',whiteSpace:'nowrap'}}>−{f.points}</strong>
        </li>)}
      </ul> : <p>No scored clause in this research sample. This is not confirmation that the offer has no restrictions.</p>}
      {rules.raw > rules.points && <p>Raw deductions {rules.raw}; rule-deduction maximum {rules.points}.</p>}
      <p style={{fontSize:12}}>Unverified evidence does not reduce the score. Incomplete contractual coverage prevents publication and ranking. The preview is not a complete assessment of the firm or its payouts.</p>
    </section>
  );
}
