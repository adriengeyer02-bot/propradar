import Link from 'next/link';
import type { Locale } from '../lib/locales';
import { localePath } from '../lib/locales';
import { simulatorCopy } from '../lib/simulatorLabels';
import { CRITERIA, getProgrammeEvidence, getProgrammeVariants, programmeFlexibility } from '../lib/programmeFlexibility';
import styles from './ProgrammeFlexibility.module.css';
export default function ProgrammeFlexibility({locale,slug,productId}:{locale:Locale;slug:string;productId:string}){
 const [,simulate,label,unrated,incomplete,explanation]=simulatorCopy(locale);
 const evidence=getProgrammeEvidence(slug,productId);
 const variants=getProgrammeVariants(slug,productId);
 const rating=programmeFlexibility(evidence);
 const number=(n:number)=>new Intl.NumberFormat(locale,{maximumFractionDigits:1}).format(n);
 const labels=locale==='fr'?['Drawdown','Retraits','Consistency','Liberté de trading','Conditions financées']:['Drawdown','Payouts','Consistency','Trading freedom','Funded conditions'];
 const scope=locale==='fr'&&evidence?.scopeFr?evidence.scopeFr:evidence?.scope;
 const simulatorHref=(variant?:string)=>localePath(locale,'/simulators')+'?'+new URLSearchParams({firm:slug,program:productId,...(variant?{variant}:{})}).toString();
 const href=simulatorHref();
 const review=evidence?.reviewOutcome;
 const estimated=rating.status==='estimated'&&rating.estimatedStars!==null;
 const legacy=rating.status==='legacy';
 const estimatedLabel=locale==='fr'?'Note estimée, non vérifiée':'Estimated rating, not verified';
 const legacyLabel=locale==='fr'?'Ancienne offre — non classée':'Legacy offer — not ranked';
 return <div className={styles.block}>
   <div className={styles.row}><span>{label}</span>{legacy?<strong className={styles.unrated}>{legacyLabel}</strong>:estimated?<strong>≈ {number(rating.estimatedStars!)}/5</strong>:rating.stars===null?<strong className={styles.unrated}>{unrated}</strong>:<strong>{number(rating.stars)}/5</strong>}</div>
   {legacy?null:rating.stars!==null?<div className={styles.stars} role="img" aria-label={rating.stars+'/5'}>{[0,1,2,3,4].map(i=><span key={i} className={styles.star}><span>☆</span><span className={styles.fill} style={{width:Math.max(0,Math.min(1,rating.stars!-i))*100+'%'}}>★</span></span>)}</div>:<div className={styles.coverage}><span>{incomplete}</span><span>{rating.verified}/5</span></div>}
   {estimated&&rating.range?<small>{estimatedLabel} · {number(rating.range[0])}–{number(rating.range[1])}/5</small>:null}
   {review?<small lang={locale==='fr'?'fr':'en'}>{locale==='fr'?review.reasonFr:review.reason} <a href={review.source} target="_blank" rel="noopener noreferrer">↗</a></small>:null}
   {rating.stars!==null&&scope?<small lang={locale==='fr'&&evidence?.scopeFr?'fr':'en'}>{scope}</small>:null}
   <small>{explanation}</small>
   {evidence?<details><summary>{locale==='fr'?'Sources et périmètre': 'Sources / scope'}</summary>{rating.stars===null?<small lang="en">{scope}</small>:null}<small> · {evidence.checkedOn}</small><ul>{CRITERIA.map((k,i)=>{const a=evidence.assessments[k];return <li key={k}><strong>{labels[i]} · {a?number(a.points)+'/1':'—'}</strong>{a?<><br/><a href={a.source} target="_blank" rel="noopener noreferrer" lang="en">{a.reason} ↗</a></>:null}</li>})}</ul></details>:null}
   {variants.length?<div className={styles.variants}>
     <small>{locale==='fr'?'Autres options après validation':'Other funded options after passing'}</small>
     {variants.map(v=>{const vr=programmeFlexibility(v.evidence);return <details key={v.id} className={styles.variant}><summary><span>{locale==='fr'?v.labelFr:v.label}</span><strong>{vr.stars===null?unrated:number(vr.stars)+'/5'}</strong></summary>
       <small lang={locale==='fr'&&v.evidence.scopeFr?'fr':'en'}>{locale==='fr'&&v.evidence.scopeFr?v.evidence.scopeFr:v.evidence.scope}</small>
       <ul>{CRITERIA.map((k,i)=>{const a=v.evidence.assessments[k];return <li key={k}><strong>{labels[i]} · {a?number(a.points)+'/1':'—'}</strong>{a?<><br/><a href={a.source} target="_blank" rel="noopener noreferrer" lang="en">{a.reason} ↗</a></>:null}</li>})}</ul>
       <Link href={simulatorHref(v.id)} className={styles.link}>{simulate} <span aria-hidden="true">→</span></Link>
     </details>})}
   </div>:null}
   {!legacy?<Link href={href} className={styles.link}>{simulate} <span aria-hidden="true">→</span></Link>:null}
 </div>;
}
