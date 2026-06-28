import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#1f1f1f] text-xs tracking-[1px] mb-6 text-[#a1a1aa]">
          INDÉPENDANT • SANS CONFLIT D'INTÉRÊT • MISE À JOUR HEBDOMADAIRE
        </div>
        
        <h1 className="text-6xl md:text-7xl font-semibold tracking-[-2.5px] leading-[0.95] mb-6">
          Le comparateur de prop firms<br />qui dit la vérité.
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-[#a1a1aa] mb-10">
          Données indépendantes. Zéro affiliation cachée. Scoring de fiabilité basé uniquement sur les faits.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/comparateur" className="btn btn-primary text-base px-8 py-3.5">
            Comparer les firms →
          </Link>
          <Link href="/comparateur" className="btn btn-secondary text-base px-8 py-3.5">
            Voir le classement
          </Link>
        </div>

        <div className="mt-6 text-xs text-[#71717a]">
          340+ firms analysées • 80+ fermetures documentées en 2024-2025 • Aucune firm sponsorisée
        </div>
      </div>

      {/* STATS BANDEAU */}
      <div className="border-y border-[#1f1f1f] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="stat-number text-[#22c55e]">340</div>
            <div className="stat-label mt-1">Firms analysées</div>
            <div className="text-[10px] text-[#71717a] mt-0.5">Depuis 2022</div>
          </div>
          <div>
            <div className="stat-number text-[#ef4444]">87</div>
            <div className="stat-label mt-1">Firms fermées ou en faillite</div>
            <div className="text-[10px] text-[#71717a] mt-0.5">2024 — Juin 2026</div>
          </div>
          <div>
            <div className="stat-number text-[#f59e0b]">142</div>
            <div className="stat-label mt-1">Incidents documentés</div>
            <div className="text-[10px] text-[#71717a] mt-0.5">Changements rétroactifs, non-paiements, etc.</div>
          </div>
        </div>
      </div>

      {/* WHY PROPRADAR - Pointu et direct */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-[#22c55e] text-sm tracking-[2px] font-mono mb-2">POURQUOI PROPRADAR EXISTE</div>
          <h2 className="text-4xl font-semibold tracking-[-1px]">La plupart des comparateurs mentent.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-8">
            <div className="text-[#ef4444] text-2xl mb-4">01</div>
            <h3 className="font-semibold text-lg mb-3">Affiliations payantes = mensonges</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              La majorité des sites « comparateurs » sont payés pour promouvoir les pires firms. 
              Nous n'acceptons aucun paiement pour influencer nos scores.
            </p>
          </div>
          <div className="card p-8">
            <div className="text-[#ef4444] text-2xl mb-4">02</div>
            <h3 className="font-semibold text-lg mb-3">Les règles changent. Nous traquons.</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              Beaucoup de firms modifient les règles en cours de route (drawdown rétroactif, payout delays).
              Nous documentons chaque changement et ajustons le score immédiatement.
            </p>
          </div>
          <div className="card p-8">
            <div className="text-[#ef4444] text-2xl mb-4">03</div>
            <h3 className="font-semibold text-lg mb-3">80+ firms ont explosé. Nous l'avons vu venir.</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              My Forex Funds, The Funded Trader, Fidelcrest, SurgeTrader... 
              Nous avions documenté les signaux avant la chute. La plupart des traders l'ont appris trop tard.
            </p>
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="bg-[#111111] border-y border-[#1f1f1f] py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xl mb-6">Prêt à arrêter de perdre du temps et de l'argent avec les mauvaises prop firms ?</p>
          <Link href="/comparateur" className="btn btn-primary text-lg px-10 py-4 inline-flex">
            Accéder au comparateur complet →
          </Link>
          <div className="mt-4 text-xs text-[#71717a]">Aucune inscription requise • Données 100% publiques et vérifiables</div>
        </div>
      </div>
    </div>
  );
}
