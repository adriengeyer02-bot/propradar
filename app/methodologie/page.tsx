import Link from 'next/link';

export default function MethodologiePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/comparateur" className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-1 mb-8">
        ← Retour au comparateur
      </Link>

      <h1 className="text-4xl font-semibold tracking-[-1px] mb-4">
        Comment est calculé le score PropRadar ?
      </h1>
      
      <p className="text-[#a1a1aa] text-lg mb-10">
        Nous croyons en la transparence totale. Voici exactement comment nous calculons le score de fiabilité sur 100 points.
      </p>

      <div className="space-y-8">
        <div className="card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">📅</div>
            <h3 className="text-2xl font-semibold">Ancienneté</h3>
            <span className="ml-auto text-[#22c55e] font-mono text-xl">+20 pts max</span>
          </div>
          <p className="text-[#a1a1aa]">
            +20 points si la prop firm existe depuis plus de 2 ans.<br />
            +10 points si elle a entre 1 et 2 ans.
          </p>
        </div>

        <div className="card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">📜</div>
            <h3 className="text-2xl font-semibold">Transparence des règles</h3>
            <span className="ml-auto text-[#22c55e] font-mono text-xl">+20 pts max</span>
          </div>
          <p className="text-[#a1a1aa]">
            Nous évaluons la clarté et la complétude des règles publiées. Plus les règles sont précises et accessibles, plus le score est élevé.
          </p>
        </div>

        <div className="card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">💰</div>
            <h3 className="text-2xl font-semibold">Preuves de payouts vérifiées</h3>
            <span className="ml-auto text-[#22c55e] font-mono text-xl">+20 pts</span>
          </div>
          <p className="text-[#a1a1aa]">
            +20 points si la prop firm publie régulièrement des preuves de paiements vérifiables (screenshots, vidéos, témoignages recoupés).
          </p>
        </div>

        <div className="card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">⚠️</div>
            <h3 className="text-2xl font-semibold">Incidents documentés</h3>
            <span className="ml-auto text-[#ef4444] font-mono text-xl">-15 pts par incident</span>
          </div>
          <p className="text-[#a1a1aa]">
            Chaque incident grave et documenté fait baisser le score de 15 points.
          </p>
        </div>

        <div className="card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">🔄</div>
            <h3 className="text-2xl font-semibold">Changements de règles rétroactifs</h3>
            <span className="ml-auto text-[#ef4444] font-mono text-xl">-25 pts</span>
          </div>
          <p className="text-[#a1a1aa]">
            Toute modification rétroactive des règles (drawdown, scaling, profit split…) fait perdre 25 points.
          </p>
        </div>

        <div className="card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">🏛️</div>
            <h3 className="text-2xl font-semibold">Présence légale vérifiée</h3>
            <span className="ml-auto text-[#22c55e] font-mono text-xl">+10 pts</span>
          </div>
          <p className="text-[#a1a1aa]">
            +10 points si l’entreprise est clairement identifiée (numéro d’entreprise, adresse, dirigeants publics).
          </p>
        </div>

        <div className="card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">⏱️</div>
            <h3 className="text-2xl font-semibold">Délai de payout</h3>
            <span className="ml-auto text-[#22c55e] font-mono text-xl">+10 pts max</span>
          </div>
          <p className="text-[#a1a1aa]">
            +10 points si le délai moyen est ≤ 2 jours.<br />
            +5 points si le délai est entre 3 et 4 jours.
          </p>
        </div>
      </div>

      <div className="mt-10 p-6 bg-[#111111] border border-[#1f1f1f] rounded-2xl text-sm">
        Le score final est toujours capé entre <strong>0 et 100</strong>.
      </div>
    </div>
  );
}


