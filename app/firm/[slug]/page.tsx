import Link from 'next/link';
import { notFound } from 'next/navigation';
import { propFirms } from '../../lib/propFirms';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function FirmPage({ params }: Props) {
  const { slug } = await params;
  const firm = propFirms.find(f => f.slug === slug);

  if (!firm) {
    notFound();
  }

  const isClosed = firm.status === 'Fermée';
  const isRisk = firm.status === 'Risque';

  const scoreColor = firm.score >= 75 ? '#22c55e' : firm.score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Back */}
      <Link href="/comparateur" className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-1 mb-6">
        ← Retour au comparateur
      </Link>

      {/* HEADER */}
      <div className="card mb-8 overflow-hidden">
        <div className="card-header px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#1f1f1f] flex items-center justify-center text-3xl font-mono font-bold tracking-[-2px] border border-[#333]">
              {firm.name.split(' ').map(w => w[0]).join('').slice(0,2)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-semibold tracking-[-1px]">{firm.name}</h1>
                <span className={`badge text-sm px-4 py-1 ${isClosed ? 'badge-red' : isRisk ? 'badge-orange' : 'badge-green'}`}>
                  {firm.status}
                </span>
              </div>
              <div className="text-[#a1a1aa] text-sm mt-0.5">Créée en {firm.anneeCreation} • {2026 - firm.anneeCreation} ans d'ancienneté</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-[#a1a1aa] mb-1 tracking-widest">SCORE PROPRADAR</div>
            <div 
              className="inline-block text-6xl font-bold font-mono tracking-[-2px]" 
              style={{ color: scoreColor }}
            >
              {firm.score}
            </div>
            <div className="text-xs text-[#71717a] -mt-1">/ 100</div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="px-8 py-5 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-[#1f1f1f]">
          <div><span className="text-[#a1a1aa]">Profit split</span><br /><span className="font-semibold text-xl">{firm.profitSplit}%</span></div>
          <div><span className="text-[#a1a1aa]">Prix challenge</span><br /><span className="font-semibold text-xl">${firm.prixChallenge}</span></div>
          <div><span className="text-[#a1a1aa]">Drawdown</span><br /><span className="font-semibold">{firm.drawdownType}</span></div>
          <div><span className="text-[#a1a1aa]">Délai payout moyen</span><br /><span className={`font-semibold ${firm.payoutDelay > 5 ? 'text-[#f59e0b]' : ''}`}>{firm.payoutDelay} jours</span></div>
          <div><span className="text-[#a1a1aa]">Incidents signalés</span><br /><span className={`font-semibold ${firm.incidents > 0 ? 'text-[#ef4444]' : 'text-[#22c55e]'}`}>{firm.incidents}</span></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* CONDITIONS */}
        <div className="lg:col-span-2 card p-8">
          <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
            Conditions de trading
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-[#a1a1aa]">News trading</span>
              <span className={firm.newsTrading ? 'text-[#22c55e]' : 'text-[#ef4444]'}>{firm.newsTrading ? 'Autorisé' : 'Interdit'}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-[#a1a1aa]">SMC / ICT</span>
              <span className={firm.smcAllowed ? 'text-[#22c55e]' : 'text-[#ef4444]'}>{firm.smcAllowed ? 'Autorisé' : 'Interdit'}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-[#a1a1aa]">Expert Advisors (EA)</span>
              <span className={firm.eaAllowed ? 'text-[#22c55e]' : 'text-[#ef4444]'}>{firm.eaAllowed ? 'Autorisé' : 'Interdit'}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-[#a1a1aa]">Type de drawdown</span>
              <span className="font-medium">{firm.drawdownType}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-[#a1a1aa]">Styles compatibles</span>
              <span className="font-medium text-right">{firm.style.join(', ')}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-[#a1a1aa]">Présence légale vérifiée</span>
              <span className={firm.legalVerified ? 'text-[#22c55e]' : 'text-[#f59e0b]'}>{firm.legalVerified ? 'Oui' : 'Non / Incertaine'}</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-[#0a0a0a] rounded-xl text-xs text-[#a1a1aa]">
            Ces conditions sont issues des règles officielles au moment de notre dernière mise à jour. 
            Vérifiez toujours sur le site de la firm avant de vous engager — les règles peuvent changer.
          </div>
        </div>

        {/* MONETISATION / CTA */}
        <div className="card p-8 h-fit">
          <div className="text-xs tracking-widest text-[#a1a1aa] mb-2">MONÉTISATION TRANSPARENTE</div>
          <h3 className="font-semibold mb-4">Prêt à passer le challenge ?</h3>
          
          <a 
            href={`https://example.com/affiliate/${firm.slug}?ref=propradar`} 
            target="_blank"
            className="btn btn-primary w-full justify-center mb-3"
          >
            Passer le challenge {firm.name} →
          </a>
          
          <div className="text-[10px] text-[#71717a] mb-4">
            Lien d'affiliation. Nous touchons une commission si vous passez par ce lien. 
            Cela n'influence en rien notre score de fiabilité.
          </div>

          {firm.score >= 70 && (
            <div className="text-xs px-3 py-2 bg-[#22c55e]/10 text-[#22c55e] rounded-lg">
              ✓ Firm avec bon historique de payouts. Moins de risques apparents.
            </div>
          )}
          {isRisk && (
            <div className="text-xs px-3 py-2 bg-[#f59e0b]/10 text-[#f59e0b] rounded-lg">
              ⚠ Firm sous surveillance. Lisez les incidents avant de vous engager.
            </div>
          )}
          {isClosed && (
            <div className="text-xs px-3 py-2 bg-[#ef4444]/10 text-[#ef4444] rounded-lg">
              ⛔ Firm fermée. Ne pas s'inscrire.
            </div>
          )}
        </div>

        {/* HISTORIQUE & INCIDENTS */}
        <div className="lg:col-span-2 card p-8">
          <h2 className="font-semibold text-xl mb-6">Historique &amp; Transparence</h2>
          
          <div className="space-y-6">
            <div>
              <div className="text-xs text-[#a1a1aa] mb-1">DATE DE CRÉATION</div>
              <div className="font-medium">{firm.anneeCreation} ({2026 - firm.anneeCreation} ans)</div>
            </div>

            <div>
              <div className="text-xs text-[#a1a1aa] mb-2 flex items-center gap-2">
                INCIDENTS DOCUMENTÉS <span className="badge badge-red text-[10px]">{firm.incidents}</span>
              </div>
              {firm.incidentsDetails && firm.incidentsDetails.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {firm.incidentsDetails.map((incident, idx) => (
                    <li key={idx} className="flex gap-2 text-[#a1a1aa]">
                      <span className="text-[#ef4444] mt-1">•</span> 
                      <span>{incident}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-[#22c55e]">Aucun incident majeur documenté.</div>
              )}
            </div>

            {firm.recentRuleChange && (
              <div className="alert alert-warning text-sm">
                <strong className="text-[#f59e0b]">⚠ Changement de règles récent détecté.</strong><br />
                Cette firm a modifié ses conditions (drawdown, scaling ou payout) de manière potentiellement rétroactive. 
                Cela a fortement impacté son score PropRadar.
              </div>
            )}
          </div>
        </div>

        {/* PAYOUT & AVERTISSEMENTS */}
        <div className="card p-8">
          <h2 className="font-semibold text-xl mb-6">Payouts &amp; Réalité</h2>
          
          <div className="mb-6">
            <div className="text-xs text-[#a1a1aa]">DÉLAI MOYEN RAPPORTÉ</div>
            <div className={`text-4xl font-mono font-bold mt-1 ${firm.payoutDelay > 7 ? 'text-[#ef4444]' : firm.payoutDelay > 4 ? 'text-[#f59e0b]' : 'text-[#22c55e]'}`}>
              {firm.payoutDelay} jours
            </div>
            <div className="text-xs mt-1 text-[#a1a1aa]">
              Basé sur retours vérifiés de la communauté (Discord, Trustpilot, forums)
            </div>
          </div>

          {firm.incidents > 3 && (
            <div className="alert alert-danger mb-6">
              <div className="font-semibold text-[#ef4444] mb-1">Red flags détectés</div>
              <div className="text-sm text-[#a1a1aa]">
                Cette firm présente un nombre élevé d'incidents documentés. 
                Nous recommandons une extrême prudence ou de l'éviter complètement.
              </div>
            </div>
          )}

          {isClosed && (
            <div className="alert alert-danger">
              <div className="font-bold text-[#ef4444] mb-2">FIRM FERMÉE — NE PAS S'INSCRIRE</div>
              <div className="text-sm">
                {firm.name} a cessé ses opérations. De nombreux traders n'ont jamais été payés. 
                Toute inscription actuelle est une arnaque.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer final */}
      <div className="mt-10 text-center text-xs text-[#71717a] max-w-md mx-auto">
        PropRadar n'est pas affilié à {firm.name}. Les informations sont fournies à titre indicatif et ne constituent pas un conseil financier. 
        Le trading de prop firms comporte des risques significatifs, y compris la perte totale du capital investi dans les challenges.
      </div>
    </div>
  );
}
