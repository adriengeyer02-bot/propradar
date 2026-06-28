import Link from 'next/link';
import { propFirms } from '../lib/propFirms';

export default function Blacklist() {
  const closedFirms = propFirms.filter(f => f.status === 'Fermée');
  const riskFirms = propFirms.filter(f => f.status === 'Risque');

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="text-[#ef4444] text-sm tracking-[2px] font-mono mb-2">ZONE ROUGE</div>
        <h1 className="text-5xl font-semibold tracking-[-1.5px]">Blacklist &amp; Alertes</h1>
        <p className="text-[#a1a1aa] mt-3 max-w-2xl">
          Les firms qui ont fermé, celles qui posent problème actuellement, et les signaux que nous surveillons de près.
          Ne perdez pas votre temps et votre argent.
        </p>
      </div>

      {/* CLOSED FIRMS */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="badge badge-red px-4 py-1 text-sm">FERMÉES</div>
          <div className="text-xl font-semibold">{closedFirms.length} firms ont explosé</div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {closedFirms.map(firm => (
            <div key={firm.id} className="card p-6 border-l-4 border-[#ef4444]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-semibold text-xl">{firm.name}</div>
                  <div className="text-xs text-[#a1a1aa]">Fermée • Score final : {firm.score}/100</div>
                </div>
                <Link href={`/firm/${firm.slug}`} className="text-xs underline text-[#ef4444]">Voir détails →</Link>
              </div>

              <div className="text-sm text-[#a1a1aa] mb-4">
                {firm.incidentsDetails?.[0] || 'Faillite brutale et non-paiement massif'}
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <div className="px-3 py-1 bg-[#ef4444]/10 text-[#ef4444] rounded">Incidents : {firm.incidents}</div>
                <div className="px-3 py-1 bg-[#1f1f1f] rounded">Créée en {firm.anneeCreation}</div>
                <div className="px-3 py-1 bg-[#1f1f1f] rounded">Payout moyen : {firm.payoutDelay}j</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RISQUE / SURVEILLANCE */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="badge badge-orange px-4 py-1 text-sm">SOUS SURVEILLANCE</div>
          <div className="text-xl font-semibold">Firms à risque élevé</div>
        </div>

        <div className="space-y-4">
          {riskFirms.map(firm => (
            <div key={firm.id} className="card p-6 border-l-4 border-[#f59e0b] flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-xl">{firm.name}</span>
                  <span className="badge badge-orange">Score {firm.score}</span>
                </div>
                <div className="text-sm text-[#a1a1aa]">{firm.incidents} incidents • Délai payout {firm.payoutDelay} jours</div>
              </div>
              <div className="text-sm max-w-md text-[#a1a1aa]">
                {firm.incidentsDetails?.slice(0,1).join(' ') || 'Changements de règles fréquents et retards de paiement signalés.'}
              </div>
              <Link href={`/firm/${firm.slug}`} className="btn btn-secondary btn-sm whitespace-nowrap">
                Analyser la fiche
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE INCIDENTS RÉCENTS (exemple statique) */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="text-xl font-semibold">Timeline des incidents majeurs (2024-2026)</div>
        </div>

        <div className="card p-8 text-sm">
          <div className="space-y-8 border-l-2 border-[#ef4444] pl-8 relative">
            {[
              { date: 'Janvier 2026', event: 'WeGetFunded — Nouveaux retards payout massifs signalés sur Discord' },
              { date: 'Novembre 2025', event: 'SurgeTrader — Fermeture définitive. Plus de 4000 traders impactés.' },
              { date: 'Septembre 2025', event: 'Fidelcrest — Annonce de cessation d\'activité progressive.' },
              { date: 'Mai 2025', event: 'FundedNext — Changement rétroactif du trailing drawdown sur challenges en cours.' },
              { date: 'Mars 2025', event: 'The Funded Trader — Faillite officielle confirmée.' },
              { date: 'Décembre 2024', event: 'My Forex Funds — Liquidation judiciaire, payouts gelés.' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#ef4444] border-4 border-[#0a0a0a]"></div>
                <div className="font-mono text-xs text-[#f59e0b] mb-0.5">{item.date}</div>
                <div>{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-[#71717a]">
        Ces données proviennent de signalements vérifiés, forums publics, et rapports de traders. 
        PropRadar ne vend aucune "solution miracle". Nous documentons pour que vous évitiez de vous faire avoir.
      </div>
    </div>
  );
}
