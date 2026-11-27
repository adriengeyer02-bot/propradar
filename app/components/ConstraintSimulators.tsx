'use client';
import { useState, type CSSProperties } from 'react';
import { consistency, drawdown, payout, realCost, type DrawdownMode } from '../lib/constraintSimulator';
import styles from './ConstraintSimulators.module.css';

export type SimulatorContext = { firm: string; program: string; source?: string; checkedOn?: string; preset?: { scope:string; source:string; consistency?:number; drawdown?:DrawdownMode; lossPercent?:number }; prices: { label:string; size:number; fee:number; monthly:number; activation:number|null; currency:string; source:string }[] };
type Props = { french:boolean; context?:SimulatorContext };
type Tab = 'consistency'|'drawdown'|'payout'|'cost';
const EN = { tabs:['Consistency','Drawdown','Payout','Real cost'], note:'Educational simulation — not a guarantee of eligibility. Check the exact programme, phase and contract. Inputs are editable assumptions unless identified as sourced.', sample:'Example inputs — not contractual terms.', context:'Selected programme', source:'Official pricing source', manual:'Manual entry', select:'Use a sourced price', scope:'Only sourced values are prefilled. Confirm the scope, account size, currency and other rules yourself. A blank field is unknown, not zero.', total:'Total net trading profit', best:'Best profitable day', limit:'Maximum consistency (%)', ratio:'Current consistency', required:'Required total profit', extra:'Additional profit needed', eligible:'Consistency condition met', notEligible:'Consistency condition not met', initial:'Initial account size', loss:'Maximum loss budget', current:'Current equity', peak:'Highest intraday value (contract basis)', eod:'Highest closing balance', mode:'Drawdown type', lock:'Optional maximum trailing floor', floor:'Theoretical loss floor', remaining:'Remaining loss budget', breach:'Loss floor reached', safe:'Above the loss floor now', static:'Static', intraday:'Intraday trailing', end:'End-of-day trailing', ddNote:'Assumes a fixed amount of loss and a continuously enforced floor; no daily loss, reset or withdrawal adjustments. This snapshot cannot prove that the account never breached earlier.', profit:'Available gross trading profit', buffer:'Profit buffer to keep', share:'Trader profit split (%)', cap:'Optional gross payout cap', maxShare:'Maximum gross profit withdrawable (%)', gross:'Gross eligible withdrawal', net:'Estimated trader payout', retained:'Profit retained before split', payoutNote:'Assumes the cap and percentage apply before profit split. Does not account for tax, fees, payout days or eligibility checks. Some firms calculate these differently.', fee:'One-time fee', monthly:'Monthly fee', months:'Paid months', activation:'Activation / completion fee', totalCost:'Total scenario cost', per:'Cost per 1,000 loss budget', costNote:'All values must use the same currency. No resets, taxes, promotions or exchange fees unless included manually.', invalid:'Check the entered values and required fields.', none:'Optional', examples:'Reset example', currency:'Currency / unit' };
const FR:typeof EN = { tabs:['Consistency','Drawdown','Retraits','Coût réel'], note:'Simulation pédagogique, sans garantie d’éligibilité. Vérifiez le programme exact, la phase et le contrat. Les paramètres sont modifiables et hypothétiques sauf indication de source.', sample:'Paramètres d’exemple, pas des conditions contractuelles.', context:'Programme sélectionné', source:'Source tarifaire officielle', manual:'Saisie manuelle', select:'Utiliser un tarif sourcé', scope:'Seules les valeurs sourcées sont préremplies. Vérifiez le périmètre, la taille du compte, la devise et les autres règles. Un champ vide est inconnu, pas zéro.', total:'Bénéfice net de trading total', best:'Meilleure journée bénéficiaire', limit:'Consistency maximale (%)', ratio:'Consistency actuelle', required:'Bénéfice total nécessaire', extra:'Bénéfice supplémentaire nécessaire', eligible:'Condition de consistency satisfaite', notEligible:'Condition de consistency non satisfaite', initial:'Taille initiale du compte', loss:'Budget de perte maximale', current:'Valeur actuelle du compte', peak:'Plus haut intraday (base contractuelle)', eod:'Plus haut solde de clôture', mode:'Type de drawdown', lock:'Plafond du seuil trailing (facultatif)', floor:'Seuil de perte théorique', remaining:'Marge de perte restante', breach:'Seuil de perte atteint', safe:'Au-dessus du seuil actuellement', static:'Statique', intraday:'Trailing intraday', end:'Trailing EOD', ddNote:'Hypothèse : montant de perte fixe et seuil appliqué en continu, sans limite journalière, réinitialisation ni ajustement des retraits. Cette simulation ne prouve pas qu’aucune violation passée n’a eu lieu.', profit:'Bénéfice brut disponible', buffer:'Réserve de bénéfice à conserver', share:'Part du trader (%)', cap:'Plafond brut de retrait (facultatif)', maxShare:'Part maximale du bénéfice brut retirable (%)', gross:'Retrait brut théorique', net:'Retrait estimé du trader', retained:'Bénéfice conservé avant partage', payoutNote:'Le plafond et le pourcentage sont supposés s’appliquer avant partage des gains. Hors fiscalité, frais, jours de retrait et vérification d’éligibilité. Certaines firmes appliquent une autre méthode.', fee:'Frais uniques', monthly:'Abonnement mensuel', months:'Nombre de mois payés', activation:'Frais d’activation / de validation', totalCost:'Coût total du scénario', per:'Coût pour 1 000 de budget de perte', costNote:'Toutes les valeurs doivent être dans la même devise. Hors reset, taxes, promotions et conversion sauf saisie manuelle.', invalid:'Vérifiez les valeurs saisies et les champs obligatoires.', none:'Facultatif', examples:'Réinitialiser l’exemple', currency:'Devise / unité' };
const example = {total:'3000',best:'1800',limit:'40',initial:'50000',loss:'2000',current:'51500',peak:'53000',eod:'52000',lock:'',profit:'3000',buffer:'500',share:'80',cap:'2000',maxShare:'100',fee:'299',monthly:'0',months:'0',activation:'0',budget:'2000'};
type Fields=typeof example;
const empty=Object.fromEntries(Object.keys(example).map(k=>[k,''])) as Fields;
const number=(s:string)=>s.trim()===''?NaN:Number(s);
const optional=(s:string)=>s.trim()===''?undefined:Number(s);
export default function ConstraintSimulators({french,context}:Props) {
  const t=french?FR:EN;
  const [tab,setTab]=useState<Tab>(context?'cost':'consistency');
  const [fields,setFields]=useState<Fields>(context?{...empty,limit:context.preset?.consistency?.toString()??''}:example);
  const [mode,setMode]=useState<DrawdownMode>(context?.preset?.drawdown??'static');
  const [currency,setCurrency]=useState('USD');
  const [price,setPrice]=useState('');
  const [exampleMode,setExampleMode]=useState(!context);
  const selectedPrice=price===''?undefined:context?.prices[Number(price)];
  const n=(k:keyof Fields)=>number(fields[k]);
  const c=consistency(n('total'),n('best'),n('limit'));
  const d=drawdown(n('initial'),n('loss'),n('current'),mode==='intraday'?n('peak'):Math.max(n('initial'),n('current'),mode==='eod'?n('eod'):n('initial')),mode==='eod'?n('eod'):n('initial'),mode,optional(fields.lock));
  const p=payout(n('profit'),n('buffer'),n('share'),optional(fields.cap),n('maxShare'));
  const r=realCost(n('fee'),n('monthly'),n('months'),n('activation'),n('budget'));
  const f=(v:number)=>new Intl.NumberFormat(french?'fr-FR':'en-US',{maximumFractionDigits:2}).format(v);
  const money=(v:number)=>f(v)+' '+currency;
  // Keep the text input authoritative: unknown values stay blank until explicitly entered.
  // Slider limits are convenient scenario ranges, not contractual limits.
  const input=(key:keyof Fields,label:string,opts:{min?:number;max?:number;step?:number;optional?:boolean}={})=>{
    const account=Number.isFinite(n('initial'))&&n('initial')>0?n('initial'):50000;
    const ranges:Record<keyof Fields,[number,number,number]> = {
      total:[-5000,20000,100],best:[0,10000,50],limit:[1,100,1],
      initial:[1000,250000,1000],loss:[100,Math.max(10000,account*.2),100],
      current:[Math.max(0,account*.8),account*1.25,100],peak:[account,account*1.3,100],
      eod:[account,account*1.3,100],lock:[Math.max(0,account*.8),account*1.3,100],
      profit:[0,20000,100],buffer:[0,10000,100],share:[0,100,1],cap:[0,20000,100],
      maxShare:[0,100,1],fee:[0,5000,10],monthly:[0,1000,5],months:[0,24,1],
      activation:[0,5000,10],budget:[100,20000,100]
    };
    const [baseMin,baseMax,step]=ranges[key];
    const value=n(key),known=Number.isFinite(value);
    const min=opts.min??Math.min(baseMin,known?Math.floor(value/step)*step:baseMin);
    const max=opts.max??Math.max(baseMax,known?Math.ceil(value/step)*step:baseMax,min+step);
    const sliderMin=opts.min===undefined?min:Math.max(min,baseMin);
    const position=known?Math.min(max,Math.max(sliderMin,value)):sliderMin;
    const fill=(position-sliderMin)/Math.max(1,max-sliderMin)*100;
    const change=(v:string)=>{setFields(old=>({...old,[key]:v}));if(['fee','monthly','activation'].includes(key))setPrice('');};
    const sliderLabel=french?'Ajuster avec le curseur':'Adjust with slider';
    return <div className={styles.field} key={key}>
      <label className={styles.fieldHead}><span>{label}</span><input type="number" step={opts.step??'any'} min={opts.min} max={opts.max} value={fields[key]} placeholder={opts.optional?t.none:'—'} onChange={e=>change(e.target.value)}/></label>
      <input className={styles.range} type="range" dir="ltr" aria-label={label+' — '+sliderLabel} aria-valuetext={known?f(value):french?'Non renseigné':'Not entered'} min={sliderMin} max={max} step={step} value={position} style={{'--range-progress':fill+'%'} as CSSProperties} onChange={e=>change(e.target.value)} />
      <div className={styles.rangeLabels} dir="ltr"><span>{f(sliderMin)}</span><span>{!known?(french?'À renseigner':'Not entered'):''}</span><span>{f(max)}</span></div>
    </div>;
  };
  const metric=(label:string,value:string)=><div className={styles.metric}><small>{label}</small><strong>{value}</strong></div>;
  const invalid=<p role="status">{t.invalid}</p>;
  const reset=()=>{setExampleMode(true);setFields({...example});setCurrency('USD');setPrice('');setMode('static')};
  function choosePrice(index:string) {
    setExampleMode(false);setPrice(index); const row=context?.prices[Number(index)];
    if(index===''||!row) {setFields(old=>({...old,fee:'',monthly:'',months:'',activation:''}));return;}
    setCurrency(row.currency);setFields(old=>({...old,fee:String(row.fee),monthly:String(row.monthly),months:row.monthly?'':'0',activation:row.activation===null?'':String(row.activation),budget:''}));
  }
  return <section className={styles.root} aria-label={french?'Simulateurs de contraintes':'Constraint simulators'}>
    {context?<div className={styles.context}><small>{t.context}</small><strong>{context.firm} — {context.program}</strong><p>{exampleMode?t.sample:t.scope}</p>{context.prices.length>0?<label className={styles.field}>{t.select}<select value={price} onChange={e=>choosePrice(e.target.value)}><option value="">{t.manual}</option>{context.prices.map((row,i)=><option key={i} value={i}>{row.label} · {f(row.size)} · {f(row.fee+row.monthly+(row.activation??0))} {row.currency}</option>)}</select></label>:null}{selectedPrice?<a href={selectedPrice.source} target="_blank" rel="noopener noreferrer">{t.source} {context.checkedOn??''} ↗</a>:null}{context.preset?<div><small lang="en">{context.preset.scope}</small><p>{context.preset.lossPercent!==undefined?(french?'Perte maximale publiée : ':'Published maximum loss: ')+context.preset.lossPercent+'%':null}</p><a href={context.preset.source} target="_blank" rel="noopener noreferrer">{french?'Règles officielles':'Official rules'} ↗</a></div>:null}{!selectedPrice&&context.source?<a href={context.source} target="_blank" rel="noopener noreferrer">{t.source} {context.checkedOn??''} ↗</a>:null}</div>:<p className={styles.muted}>{t.sample}</p>}
    <div className={styles.tabs} role="group" aria-label="Simulator">{(['consistency','drawdown','payout','cost'] as const).map((id,i)=><button type="button" aria-pressed={tab===id} className={tab===id?styles.active:''} key={id} onClick={()=>setTab(id)}>{t.tabs[i]}</button>)}</div>
    <div className={styles.panel}>
      <div className={styles.inputs}>
        <p className={styles.sliderHint}>{french?'Déplacez les curseurs ou saisissez un montant exact. Les résultats se mettent à jour instantanément.':'Drag the sliders or enter an exact amount. Results update instantly.'}</p>
        <label className={styles.field}>{t.currency}<select value={currency} onChange={e=>{setCurrency(e.target.value);setPrice('');if(tab==='cost')setFields(old=>({...old,fee:'',monthly:'',months:'',activation:'',budget:''}))}}>{['USD','EUR','GBP','units'].map(x=><option key={x}>{x}</option>)}</select></label>
        {tab==='consistency'?<>{input('total',t.total)}{input('best',t.best,{min:0})}{input('limit',t.limit,{min:0.01,max:100})}</>:null}
        {tab==='drawdown'?<><label className={styles.field}>{t.mode}<select value={mode} onChange={e=>setMode(e.target.value as DrawdownMode)}><option value="static">{t.static}</option><option value="eod">{t.end}</option><option value="intraday">{t.intraday}</option></select></label>{input('initial',t.initial,{min:1})}{input('loss',t.loss,{min:1})}{input('current',t.current)}{mode==='intraday'?input('peak',t.peak):null}{mode==='eod'?input('eod',t.eod):null}{mode!=='static'?input('lock',t.lock,{optional:true}):null}</>:null}
        {tab==='payout'?<>{input('profit',t.profit,{min:0})}{input('buffer',t.buffer,{min:0})}{input('share',t.share,{min:0,max:100})}{input('cap',t.cap,{min:0,optional:true})}{input('maxShare',t.maxShare,{min:0,max:100})}</>:null}
        {tab==='cost'?<>{input('fee',t.fee,{min:0})}{input('monthly',t.monthly,{min:0})}{input('months',t.months,{min:0,step:1})}{input('activation',t.activation,{min:0})}{input('budget',t.loss,{min:1})}</>:null}
        <button type="button" className={styles.reset} onClick={reset}>{t.examples}</button>
      </div>
      <div className={styles.results} aria-live="polite">
        {tab==='consistency'?(c?<><p className={c.eligible?styles.good:styles.warn}>{c.eligible?t.eligible:t.notEligible}</p>{metric(t.ratio,c.ratio===null?'—':f(c.ratio)+'%')}{c.ratio!==null?<div className={styles.comparison}><div className={styles.compareTrack}><div className={styles.compareFill} style={{width:Math.min(100,c.ratio/Math.max(100,c.ratio)*100)+'%',background:c.eligible?'#40b88b':'#e18473'}}/><span className={styles.threshold} style={{left:n('limit')/Math.max(100,c.ratio)*100+'%'}}/></div><div className={styles.rangeLabels}><span>{french?'Limite':'Limit'} {f(n('limit'))}%</span><span>{f(c.ratio)}%</span></div></div>:null}{metric(t.required,money(c.required))}{metric(t.extra,money(c.extra))}</>:invalid):null}
        {tab==='drawdown'?(d?<><p className={d.breached?styles.warn:styles.good}>{d.breached?t.breach:t.safe}</p>{metric(t.floor,money(d.floor))}{metric(t.remaining,money(d.remaining))}<div className={styles.track}><div style={{width:Math.min(100,d.remaining/n('loss')*100)+'%',background:d.breached?'#d86d63':'#41b88a'}}/></div><p>{t.ddNote}</p></>:invalid):null}
        {tab==='payout'?(p?<>{metric(t.net,money(p.net))}<div className={styles.track}><div style={{width:n('profit')>0?Math.min(100,p.net/n('profit')*100)+'%':'0%',background:'#40b88b'}}/></div>{metric(t.gross,money(p.gross))}{metric(t.retained,money(p.retained))}<p>{t.payoutNote}</p></>:invalid):null}
        {tab==='cost'?(r?<>{metric(t.totalCost,money(r.total))}{metric(t.per,money(r.perThousand))}<p>{t.costNote}</p></>:invalid):null}
      </div>
    </div>
    <p className={styles.muted}>{t.note}</p>
  </section>;
}
