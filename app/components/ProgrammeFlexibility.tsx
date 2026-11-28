import Link from 'next/link';
import type { Locale } from '../lib/locales';
import { localePath } from '../lib/locales';
import { simulatorCopy } from '../lib/simulatorLabels';
import { CRITERIA, getProgrammeEvidence, getProgrammeVariants } from '../lib/programmeFlexibility';
import { programmeCategory, programmeCategoryRating, constraintLevel, isInstantCategory, type CategoryProduct } from '../lib/programmeCategory';
import { programmeCategoryCopy } from '../lib/programmeCategoryCopy';
import styles from './ProgrammeFlexibility.module.css';
export default function ProgrammeFlexibility({locale,slug,product}:{locale:Locale;slug:string;product:CategoryProduct}){
 const productId=product.id;
 const [,simulate,,unrated,incomplete]=simulatorCopy(locale);
 const evidence=getProgrammeEvidence(slug,productId),variants=getProgrammeVariants(slug,productId);
 const category=programmeCategory(product),copy=programmeCategoryCopy(locale,category);
 const rating=programmeCategoryRating(evidence,category);
 const number=(n:number)=>new Intl.NumberFormat(locale,{maximumFractionDigits:2}).format(n);
 const labels=locale==='fr'?['Drawdown','Retraits','Consistency','Liberté de trading','Conditions financées']:['Drawdown','Payouts','Consistency','Trading freedom','Funded conditions'];
 const scope=locale==='fr'&&evidence?.scopeFr?evidence.scopeFr:evidence?.scope;
 const simulatorHref=(variant?:string)=>localePath(locale,'/simulators')+'?'+new URLSearchParams({firm:slug,program:productId,...(variant?{variant}:{})}).toString();
 const review=evidence?.reviewOutcome;
 const legacy=rating.absolute.status==='legacy';
 const estimated=rating.estimatedStars!==null;
 const score=rating.stars??rating.estimatedStars;
 function Constraints({r}:{r:ReturnType<typeof programmeCategoryRating>}){
  if(r.constraints===null&&!r.constraintRange)return null;
  const n=r.constraints??r.constraintRange![1],level=constraintLevel(n),lower=r.constraintRange?constraintLevel(r.constraintRange[0]):level;
  return <div className={styles.difficulty} data-level={level}><div className={styles.row}><span>{copy.absolute}</span><strong>{copy.levels[lower]}{lower!==level?' – '+copy.levels[level]:''}</strong></div><div className={styles.meter} aria-hidden="true">{[0,1,2,3].map(i=><span key={i} data-active={i<=level}/>)}</div><small>{r.constraints!==null?number(r.constraints):number(r.constraintRange![0])+'–'+number(r.constraintRange![1])}/5</small></div>;
 }
 return <div className={styles.block}>
   <div className={styles.category}>{copy.category}</div>
   <div className={styles.row}><span>{copy.quality}</span>{legacy?<strong className={styles.unrated}>{copy.legacy}</strong>:score===null?<strong className={styles.unrated}>{unrated}</strong>:<strong className={styles.score}>{estimated?'≈ ':''}{number(score)}/5</strong>}</div>
   {!legacy&&score!==null?<div className={styles.stars} role="img" aria-label={(estimated?copy.estimated+' ':'')+number(score)+'/5'}>{[0,1,2,3,4].map(i=><span key={i} className={styles.star}><span>☆</span><span className={styles.fill} style={{width:Math.max(0,Math.min(1,score-i))*100+'%'}}>★</span></span>)}</div>:!legacy?<div className={styles.coverage}><span>{incomplete}</span><span>{rating.absolute.verified}/5</span></div>:null}
   {estimated&&rating.range?<small>{copy.estimated} · {number(rating.range[0])}–{number(rating.range[1])}/5</small>:null}
   {!legacy?<Constraints r={rating}/>:null}
   {!legacy&&isInstantCategory(category)?<p className={styles.instantWarning}><span aria-hidden="true">⚠</span> {copy.warning}</p>:null}
   {review?<small lang={locale==='fr'?'fr':'en'}>{locale==='fr'?review.reasonFr:review.reason} <a href={review.source} target="_blank" rel="noopener noreferrer">↗</a></small>:null}
   <small>{copy.explanation}</small>
   {evidence?<details><summary>{copy.sources}</summary><small lang={locale==='fr'&&evidence?.scopeFr?'fr':'en'}>{scope}</small><small> · {evidence.checkedOn}</small><ul>{CRITERIA.map((k,i)=>{const a=evidence.assessments[k],v=rating.axes[k];return <li key={k}><strong>{labels[i]} · {v===null?'—':number(v)+'/1'}</strong>{a?<><br/><a href={a.source} target="_blank" rel="noopener noreferrer" lang="en">{a.reason} ↗</a></>:null}</li>})}</ul></details>:null}
   {variants.length?<div className={styles.variants}>
     <small>{copy.options}</small>
     {variants.map(v=>{const vr=programmeCategoryRating(v.evidence,category);return <details key={v.id} className={styles.variant}><summary><span>{locale==='fr'?v.labelFr:v.label}</span><strong>{vr.stars===null?unrated:number(vr.stars)+'/5'}</strong></summary>
       <Constraints r={vr}/>
       <small lang={locale==='fr'&&v.evidence.scopeFr?'fr':'en'}>{locale==='fr'?v.evidence.scopeFr:v.evidence.scope}</small>
       <ul>{CRITERIA.map((k,i)=>{const a=v.evidence.assessments[k],points=vr.axes[k];return <li key={k}><strong>{labels[i]} · {points===null?'—':number(points)+'/1'}</strong>{a?<><br/><a href={a.source} target="_blank" rel="noopener noreferrer" lang="en">{a.reason} ↗</a></>:null}</li>})}</ul>
       <Link href={simulatorHref(v.id)} className={styles.link}>{simulate} <span aria-hidden="true">→</span></Link>
     </details>})}
   </div>:null}
   {!legacy?<Link href={simulatorHref()} className={styles.link}>{simulate} <span aria-hidden="true">→</span></Link>:null}
 </div>;
}
