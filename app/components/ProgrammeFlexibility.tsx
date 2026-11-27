import Link from 'next/link';
import type { Locale } from '../lib/locales';
import { localePath } from '../lib/locales';
import { simulatorCopy } from '../lib/simulatorLabels';
import { CRITERIA, getProgrammeEvidence, programmeFlexibility } from '../lib/programmeFlexibility';
import styles from './ProgrammeFlexibility.module.css';
export default function ProgrammeFlexibility({locale,slug,productId}:{locale:Locale;slug:string;productId:string}){
 const [,simulate,label,unrated,incomplete,explanation]=simulatorCopy(locale);
 const evidence=getProgrammeEvidence(slug,productId);
 const rating=programmeFlexibility(evidence);
 const number=(n:number)=>new Intl.NumberFormat(locale,{maximumFractionDigits:1}).format(n);
 const labels=locale==='fr'?['Drawdown','Retraits','Consistency','Liberté de trading','Conditions financées']:['Drawdown','Payouts','Consistency','Trading freedom','Funded conditions'];
 const scope=locale==='fr'&&evidence?.scopeFr?evidence.scopeFr:evidence?.scope;
 const href=localePath(locale,'/simulators')+'?'+new URLSearchParams({firm:slug,program:productId}).toString();
 return <div className={styles.block}>
   <div className={styles.row}><span>{label}</span>{rating.stars===null?<strong className={styles.unrated}>{unrated}</strong>:<strong>{number(rating.stars)}/5</strong>}</div>
   {rating.stars!==null?<div className={styles.stars} role="img" aria-label={rating.stars+'/5'}>{[0,1,2,3,4].map(i=><span key={i} className={styles.star}><span>☆</span><span className={styles.fill} style={{width:Math.max(0,Math.min(1,rating.stars!-i))*100+'%'}}>★</span></span>)}</div>:<div className={styles.coverage}><span>{incomplete}</span><span>{rating.verified}/5</span></div>}
   {rating.stars!==null&&scope?<small lang={locale==='fr'&&evidence?.scopeFr?'fr':'en'}>{scope}</small>:null}
   <small>{explanation}</small>
   {evidence?<details><summary>{locale==='fr'?'Sources et périmètre': 'Sources / scope'}</summary>{rating.stars===null?<small lang="en">{scope}</small>:null}<small> · {evidence.checkedOn}</small><ul>{CRITERIA.map((k,i)=>{const a=evidence.assessments[k];return <li key={k}><strong>{labels[i]} · {a?number(a.points)+'/1':'—'}</strong>{a?<><br/><a href={a.source} target="_blank" rel="noopener noreferrer" lang="en">{a.reason} ↗</a></>:null}</li>})}</ul></details>:null}
   <Link href={href} className={styles.link}>{simulate} <span aria-hidden="true">→</span></Link>
 </div>;
}
