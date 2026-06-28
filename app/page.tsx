import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* HERO - Strong Premium Entry */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-20 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#1f1f1f] bg-[#111] text-xs tracking-[2.5px] text-[#a1a1aa] font-medium">
            INDÉPENDANT • SANS CONFLIT D’INTÉRÊT • MISE À JOUR HEBDOMADAIRE
          </div>
        </div>

        <h1 className="text-[76px] md:text-[92px] font-semibold tracking-[-5px] leading-[0.88] mb-6">
          Le comparateur<br />de prop firms<br />qui dit la vérité.
        </h1>

        <p className="max-w-[620px] mx-auto text-[21px] text-[#a1a1aa] mb-10 tracking-[-0.3px] leading-tight">
          Données indépendantes.<br />
          Zéro affiliation qui influence les scores.<br />
          On expose les faits. Sans filtre.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/comparateur" 
            className="btn btn-primary text-[17px] px-11 py-[17px] shadow-lg shadow-[#22c55e]/25 hover:shadow-xl hover:shadow-[#22c55e]/30 transition-all"
          >
            Lancer le comparateur →
          </Link>
          <Link 
            href="/comparateur" 
            className="btn btn-secondary text-[17px] px-11 py-[17px]"
          >
            Voir le classement complet
          </Link>
        </div>

        <div className="text-sm text-[#71717a]">
          340+ firms analysées • 87 firms fermées documentées • Aucune firm sponsorisée
        </div>
      </div>

      {/* STATS - Premium Visual */}
      <div className="border-y border-[#1f1f1f] bg-[#111111]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-8 text-center">
              <div className="text-[64px] font-semibold tracking-[-3px] text-[#22c55e] leading-none">340</div>
              <div className="mt-4 text-xl font-medium">Firms analysées</div>
              <div className="text-[#71717a] mt-1 text-sm">Données + Trustpilot + historique de payouts</div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-8 text-center">
              <div className="text-[64px] font-semibold tracking-[-3px] text-[#ef4444] leading-none">87</div>
              <div className="mt-4 text-xl font-medium">Firms fermées ou en faillite</div>
              <div className="text-[#71717a] mt-1 text-sm">2024 — Juin 2026 • Avec preuves documentées</div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-8 text-center">
              <div className="text-[64px] font-semibold tracking-[-3px] text-[#f59e0b] leading-none">142</div>
              <div className="mt-4 text-xl font-medium">Incidents documentés</div>
              <div className="text-[#71717a] mt-1 text-sm">Changements rétroactifs, non-paiements, fraudes...</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY - Stronger Cards */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-[#22c55e] text-xs tracking-[3.5px] font-mono mb-3">POURQUOI PROPRADAR EXISTE</div>
          <h2 className="text-5xl font-semibold tracking-[-1.8px]">La plupart des comparateurs te mentent.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-9 group">
            <div className="text-[#ef4444] text-4xl mb-6 font-mono tracking-[-2px] group-hover:scale-105 transition-transform">01</div>
            <h3 className="font-semibold text-2xl mb-4 tracking-tight">Affiliations = Mensonges</h3>
            <p className="text-[#a1a1aa] leading-relaxed text-[15px]">
              La majorité des sites sont payés pour promouvoir les pires firms. 
              Nous n’acceptons aucun paiement qui influence nos scores. Zéro exception.
            </p>
          </div>

          <div className="card p-9 group">
            <div className="text-[#ef4444] text-4xl mb-6 font-mono tracking-[-2px] group-hover:scale-105 transition-transform">02</div>
            <h3 className="font-semibold text-2xl mb-4 tracking-tight">On traque les changements</h3>
            <p className="text-[#a1a1aa] leading-relaxed text-[15px]">
              Beaucoup de firms modifient les règles en cours de route (drawdown rétroactif, payout delays). 
              Nous documentons chaque changement et ajustons le score immédiatement.
            </p>
          </div>

          <div className="card p-9 group">
            <div className="text-[#ef4444] text-4xl mb-6 font-mono tracking-[-2px] group-hover:scale-105 transition-transform">03</div>
            <h3 className="font-semibold text-2xl mb-4 tracking-tight">On a vu venir les faillites</h3>
            <p className="text-[#a1a1aa] leading-relaxed text-[15px]">
              My Forex Funds, The Funded Trader, SurgeTrader, Fidelcrest... 
              Nous avions documenté les signaux bien avant qu’elles n’explosent.
            </p>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="bg-[#111111] border-y border-[#1f1f1f] py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-3xl tracking-[-0.6px] mb-8 font-medium">
            Prêt à arrêter de perdre du temps et de l’argent avec les mauvaises prop firms ?
          </p>
          <Link 
            href="/comparateur" 
            className="btn btn-primary text-xl px-14 py-4 inline-flex shadow-xl shadow-[#22c55e]/20 hover:shadow-2xl hover:shadow-[#22c55e]/30 transition-all"
          >
            Accéder au comparateur complet →
          </Link>
          <div className="mt-4 text-xs text-[#71717a]">
            Aucune inscription • Données 100% publiques et vérifiables
          </div>
        </div>
      </div>
    </div>
  );
}
