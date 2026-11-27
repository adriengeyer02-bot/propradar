'use client';
import { useState } from 'react';
import { consistency, drawdown, payout, realCost, type DrawdownMode } from '../lib/constraintSimulator';
import styles from './ConstraintSimulators.module.css';

export type SimulatorContext = { firm: string; program: string; source?: string; checkedOn?: string; prices: { label:string; size:number; fee:number; monthly:number; activation:number; currency:string }[] };
type Props = { french:boolean; context?:SimulatorContext };
type Tab = 'consistency'|'drawdown'|'payout'|'cost';
const EN = { tabs:['Consistency','Drawdown','Payout','Real cost'], note:'Educational simulation — not a guarantee of eligibility. Check the exact programme, phase and contract. Inputs are editable assumptions unless identified as sourced.', sample:'Example inputs — not contractual terms.', context:'Selected programme', source:'Official pricing source', manual:'Manual entry', select:'Use a sourced price', scope:'Only published prices are prefilled. Confirm all other rules yourself.', total:'Total net trading profit', best:'Best profitable day', limit:'Maximum consistency (%)', ratio:'Current consistency', required:'Required total profit', extra:'Additional profit needed', eligible:'Consistency condition met', notEligible:'Consistency condition not met', initial:'Initial account size', loss:'Maximum loss budget', current:'Current equity', peak:'Highest intraday equity', eod:'Highest closing balance', mode:'Drawdown type', lock:'Optional maximum trailing floor', floor:'Theoretical loss floor', remaining:'Remaining loss budget', breach:'Loss floor reached', safe:'Above the loss floor now', static:'Static', intraday:'Intraday trailing', end:'End-of-day trailing', ddNote:'Assumes a fixed amount of loss and a continuously enforced floor; no daily loss, reset or withdrawal adjustments. This snapshot cannot prove that the account never breached earlier.', profit:'Available gross trading profit', buffer:'Profit buffer to keep', share:'Trader profit split (%)', cap:'Optional gross payout cap', maxShare:'Maximum gross profit withdrawable (%)', gross:'Gross eligible withdrawal', net:'Estimated trader payout', retained:'Profit retained before split', payoutNote:'Assumes the cap and percentage apply before profit split. Does not account for tax, fees, payout days or eligibility checks. Some firms calculate these differently.', fee:'One-time fee', monthly:'Monthly fee', months:'Paid months', activation:'Activation / completion fee', totalCost:'Total scenario cost', per:'Cost per 1,000 loss budget', costNote:'All values must use the same currency. No resets, taxes, promotions or exchange fees unless included manually.', invalid:'Check the entered values and required fields.', none:'Optional', examples:'Reset example', currency:'Currency / unit' };
const FR:typeof EN = { tabs:['Consistency','Drawdown','Retraits','Coût réel'], note:'Simulation pédagogique, sans garantie d’éligibilité. Vérifiez le programme exact, la phase et le contrat. Les paramètres sont modifiables et hypothétiques sauf indication de source.', sample:'Paramètres d’exemple, pas des conditions contractuelles.', context:'Programme sélectionné', source:'Source tarifaire officielle', manual:'Saisie manuelle', select:'Utiliser un tarif sourcé', scope:'Seuls les tarifs publiés sont préremplis. Vérifiez vous-même toutes les autres règles.', total:'Bénéfice net de trading total', best:'Meilleure journée bénéficiaire', limit:'Consistency maximale (%)', ratio:'Consistency actuelle', required:'Bénéfice total nécessaire', extra:'Bénéfice supplémentaire nécessaire', eligible:'Condition de consistency satisfaite', notEligible:'Condition de consistency non satisfaite', initial:'Taille initiale du compte', loss:'Budget de perte maximale', current:'Valeur actuelle du compte', peak:'Plus haut intraday de l’equity', eod:'Plus haut solde de clôture', mode:'Type de drawdown', lock:'Plafond du seuil trailing (facultatif)', floor:'Seuil de perte théorique', remaining:'Marge de perte restante', breach:'Seuil de perte atteint', safe:'Au-dessus du seuil actuellement', static:'Statique', intraday:'Trailing intraday', end:'Trailing EOD', ddNote:'Hypothèse : montant de perte fixe et seuil appliqué en continu, sans limite journalière, réinitialisation ni ajustement des retraits. Cette simulation ne prouve pas qu’aucune violation passée n’a eu lieu.', profit:'Bénéfice brut disponible', buffer:'Réserve de bénéfice à conserver', share:'Part du trader (%)', cap:'Plafond brut de retrait (facultatif)', maxShare:'Part maximale du bénéfice brut retirable (%)', gross:'Retrait brut théorique', net:'Retrait estimé du trader', retained:'Bénéfice conservé avant partage', payoutNote:'Le plafond et le pourcentage sont supposés s’appliquer avant partage des gains. Hors fiscalité, frais, jours de retrait et vérification d’éligibilité. Certaines firmes appliquent une autre méthode.', fee:'Frais uniques', monthly:'Abonnement mensuel', months:'Nombre de mois payés', activation:'Frais d’activation / de validation', totalCost:'Coût total du scénario', per:'Coût pour 1 000 de budget de perte', costNote:'Toutes les valeurs doivent être dans la même devise. Hors reset, taxes, promotions et conversion sauf saisie manuelle.', invalid:'Vérifiez les valeurs saisies et les champs obligatoires.', none:'Facultatif', examples:'Réinitialiser l’exemple', currency:'Devise / unité' };
const example = {total:'3000',best:'1800',limit:'40',initial:'50000',loss:'2000',current:'51500',peak:'53000',eod:'52000',lock:'',profit:'3000',buffer:'500',share:'80',cap:'2000',maxShare:'100',fee:'299',monthly:'0',months:'0',activation:'0',budget:'2000'};
type Fields=typeof example;
const empty=Object.fromEntries(Object.keys(example).map(k=>[k,''])) as Fields;
const number=(s:string)=>s.trim()===''?NaN:Number(s);
const optional=(s:string)=>s.trim()===''?undefined:Number(s);
export default function ConstraintSimulators({french,context}:Props) {
  const t=french?FR:EN;
  const [tab,setTab]=useState<Tab>(context?'cost':'consistency');
  const [fields,setFields]=useState<Fields>(context?empty:example);
  const [mode,setMode]=useState<DrawdownMode>('static');
  const [currency,setCurrency]=useState('USD');
  const [price,setPrice]=useState('');
  const n=(k:keyof Fields)=>number(fields[k]);
  const c=consistency(n('total'),n('best'),n('limit'));
  const d=drawdown(n('initial'),n('loss'),n('current'),mode==='intraday'?n('peak'):Math.max(n('initial'),n('current'),mode==='eod'?n('eod'):n('initial')),mode==='eod'?n('eod'):n('initial'),mode,optional(fields.lock));
  const p=payout(n('profit'),n('buffer'),n('share'),optional(fields.cap),n('maxShare'));
  const r=realCost(n('fee'),n('monthly'),n('months'),n('activation'),n('budget'));
  const f=(v:number)=>new Intl.NumberFormat(french?'fr-FR':'en-US',{maximumFractionDigits:2}).format(v);
  const money=(v:number)=>f(v)+' '+currency;
  const input=(key:keyof Fields,label:string,opts:{min?:number;max?:number;step?:number;optional?:boolean}={})=><label className={styles.field} key={key}><span>{label}</span><input type="number" step={opts.step??'any'} min={opts.min} max={opts.max} value={fields[key]} placeholder={opts.optional?t.none:undefined} onChange={e=>setFields(old=>({...old,[key]:e.target.value}))}/></label>;
  const metric=(label:string,value:string)=><div className={styles.metric}><small>{label}</small><strong>{value}</strong></div>;
  const invalid=<p role="status">{t.invalid}</p>;
  const reset=()=>{setFields({...example});setCurrency('USD');setPrice('');setMode('static')};
  function choosePrice(index:string) {
    setPrice(index); const row=context?.prices[Number(index)];
    if(index===''||!row) {setFields(old=>({...old,fee:'',monthly:'',months:'',activation:''}));return;}
    setCurrency(row.currency);setFields(old=>({...old,initial:String(row.size),fee:String(row.fee),monthly:String(row.monthly),months:row.monthly?'':'0',activation:String(row.activation),budget:''}));
  }
  return <section className={styles.root} aria-label={french?'Simulateurs de contraintes':'Constraint simulators'}>
    {context?<div className={styles.context}><small>{t.context}</small><strong>{context.firm} — {context.program}</strong><p>{t.scope}</p>{context.prices.length>0?<label className={styles.field}>{t.select}<select value={price} onChange={e=>choosePrice(e.target.value)}><option value="">{t.manual}</option>{context.prices.map((row,i)=><option key={i} value={i}>{row.label} · {f(row.size)} · {f(row.fee+row.monthly+row.activation)} {row.currency}</option>)}</select></label>:null}{context.source?<a href={context.source} target="_blank" rel="noopener noreferrer">{t.source} {context.checkedOn??''} ↗</a>:null}</div>:<p className={styles.muted}>{t.sample}</p>}
    <div className={styles.tabs} role="group" aria-label="Simulator">{(['consistency','drawdown','payout','cost'] as const).map((id,i)=><button type="button" aria-pressed={tab===id} className={tab===id?styles.active:''} key={id} onClick={()=>setTab(id)}>{t.tabs[i]}</button>)}</div>
    <div className={styles.panel}>
      <div className={styles.inputs}>
        <label className={styles.field}>{t.currency}<select value={currency} onChange={e=>{setCurrency(e.target.value);setPrice('')}}>{['USD','EUR','GBP','units'].map(x=><option key={x}>{x}</option>)}</select></label>
        {tab==='consistency'?<>{input('total',t.total)}{input('best',t.best,{min:0})}{input('limit',t.limit,{min:0.01,max:100})}</>:null}
        {tab==='drawdown'?<><label className={styles.field}>{t.mode}<select value={mode} onChange={e=>setMode(e.target.value as DrawdownMode)}><option value="static">{t.static}</option><option value="eod">{t.end}</option><option value="intraday">{t.intraday}</option></select></label>{input('initial',t.initial,{min:1})}{input('loss',t.loss,{min:1})}{input('current',t.current)}{mode==='intraday'?input('peak',t.peak):null}{mode==='eod'?input('eod',t.eod):null}{mode!=='static'?input('lock',t.lock,{optional:true}):null}</>:null}
        {tab==='payout'?<>{input('profit',t.profit,{min:0})}{input('buffer',t.buffer,{min:0})}{input('share',t.share,{min:0,max:100})}{input('cap',t.cap,{min:0,optional:true})}{input('maxShare',t.maxShare,{min:0,max:100})}</>:null}
        {tab==='cost'?<>{input('fee',t.fee,{min:0})}{input('monthly',t.monthly,{min:0})}{input('months',t.months,{min:0,step:1})}{input('activation',t.activation,{min:0})}{input('budget',t.loss,{min:1})}</>:null}
        <button type="button" className={styles.reset} onClick={reset}>{t.examples}</button>
      </div>
      <div className={styles.results} aria-live="polite">
        {tab==='consistency'?(c?<><p className={c.eligible?styles.good:styles.warn}>{c.eligible?t.eligible:t.notEligible}</p>{metric(t.ratio,c.ratio===null?'—':f(c.ratio)+'%')}{metric(t.required,money(c.required))}{metric(t.extra,money(c.extra))}</>:invalid):null}
        {tab==='drawdown'?(d?<><p className={d.breached?styles.warn:styles.good}>{d.breached?t.breach:t.safe}</p>{metric(t.floor,money(d.floor))}{metric(t.remaining,money(d.remaining))}<div className={styles.track}><div style={{width:Math.min(100,d.remaining/n('loss')*100)+'%',background:d.breached?'#d86d63':'#41b88a'}}/></div><p>{t.ddNote}</p></>:invalid):null}
        {tab==='payout'?(p?<>{metric(t.net,money(p.net))}{metric(t.gross,money(p.gross))}{metric(t.retained,money(p.retained))}<p>{t.payoutNote}</p></>:invalid):null}
        {tab==='cost'?(r?<>{metric(t.totalCost,money(r.total))}{metric(t.per,money(r.perThousand))}<p>{t.costNote}</p></>:invalid):null}
      </div>
    </div>
    <p className={styles.muted}>{t.note}</p>
  </section>;
}
