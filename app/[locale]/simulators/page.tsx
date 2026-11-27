import Link from 'next/link';
import type { Metadata } from 'next';
import ConstraintSimulators, { type SimulatorContext } from '../../components/ConstraintSimulators';
import { getFirmBySlug } from '../../lib/propFirms';
import { getPriceTable } from '../../lib/priceTables';
import { isLocale, localePath } from '../../lib/locales';
import { simulatorLabel } from '../../lib/simulatorLabels';
type Props={params:Promise<{locale:string}>;searchParams:Promise<{firm?:string|string[];program?:string|string[]}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale}=await params;
  return {title:locale==='fr'?'Simulateurs de contraintes | PropRadar':'Trading constraint simulators | PropRadar',description:locale==='fr'?'Simulez les règles de consistency, de drawdown et de retrait ainsi que le coût réel de votre challenge.':'Simulate consistency, drawdown, payout constraints and actual challenge costs.',robots:{index:false,follow:true}};
}
export default async function SimulatorsPage({params,searchParams}:Props){
  const {locale:raw}=await params; const locale=isLocale(raw)?raw:'en'; const french=locale==='fr';
  const query=await searchParams;
  const firm=typeof query.firm==='string'?getFirmBySlug(query.firm):undefined;
  const product=typeof query.program==='string'?firm?.products.find(p=>p.id===query.program):undefined;
  let context:SimulatorContext|undefined;
  if(firm&&product&&firm.status!=='Fermée'){
    const table=getPriceTable(firm.slug);
    const programs=table?.programs.filter(p=>p.productId===product.id)??[];
    const prices=programs.flatMap(p=>p.rows.filter(r=>Number.isFinite(r.price)&&r.price>=0&&r.size>0).map(r=>{
      const separate=r.upfrontPrice!=null&&r.completionFee!=null;
      return {label:p.name+(p.billing==='monthly'?' / month':''),size:r.size,fee:p.billing==='monthly'?0:separate?r.upfrontPrice!:r.price,monthly:p.billing==='monthly'?r.price:0,activation:separate&&p.billing!=='monthly'?r.completionFee!:0,currency:p.currency};
    }));
    context={firm:firm.name,program:product.name,prices,source:programs.length&&programs.every(p=>p.sourceUrl===programs[0].sourceUrl)?programs[0].sourceUrl:undefined,checkedOn:table?.checkedOn};
  }
  return <main className="container">
    <section className="section">
      <div className="eyebrow">PropRadar · {simulatorLabel(locale)}</div>
      <h1>{french?'Simulateurs de contraintes':'Trading constraint simulators'}</h1>
      <p className="lead">{french?'Comprenez le fonctionnement de votre challenge avant de l’acheter.':'Understand how your challenge works before you buy it.'}</p>
      {locale!=='fr'&&locale!=='en'?<p lang="en">This tool is currently available in English and French.</p>:null}
      <div className="actions"><Link className="btn" href={localePath(locale,firm&&product?'/firm/'+firm.slug:'/prop-firm-comparison')}>{french?'Retour au comparateur / à la fiche':'Back to comparison / firm profile'}</Link></div>
      <ConstraintSimulators french={french} context={context}/>
    </section>
  </main>;
}
