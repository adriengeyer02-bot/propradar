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
 const href=localePath(locale,'/simulators')+'?'+new URLSearchParams({firm:slug,program:productId}).toString();
 return <div className={styles.block}>
   <div className={styles.row}><span>{label}</span>{rating.stars===null?<strong className={styles.unrated}>{unrated}</strong>:<strong>{rating.stars}/5</strong>}</div>
   {rating.stars!==null?<div className={styles.stars} role="img" aria-label={rating.stars+'/5'}>{[0,1,2,3,4].map(i=><span key={i} className={styles.star}><span>☆</span><span className={styles.fill} style={{width:Math.max(0,Math.min(1,rating.stars!-i))*100+'%'}}>★</span></span>)}</div>:<div className={styles.coverage}><span>{incomplete}</span><span>{rating.verified}/5</span></div>}
   <small>{explanation}</small>
   {evidence?<details><summary>{locale==='fr'?'Sources et périmètre': 'Sources / scope'}</summary><small lang="en">{evidence.scope} · {evidence.checkedOn}</small><ul>{CRITERIA.flatMap(k=>{const a=evidence.assessments[k];return a?[<li key={k}><a href={a.source} target="_blank" rel="noopener noreferrer" lang="en">{a.reason} ↗</a></li>]:[]})}</ul></details>:null}
   <Link href={href} className={styles.link}>{simulate} <span aria-hidden="true">→</span></Link>
 </div>;
}
