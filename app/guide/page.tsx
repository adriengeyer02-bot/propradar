import Link from 'next/link';

export default function Guide() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-12">
        <div className="text-[#22c55e] text-sm tracking-[2px] font-mono mb-2">RESSOURCES</div>
        <h1 className="text-5xl font-semibold tracking-[-1.5px]">Guide PropRadar</h1>
        <p className="text-[#a1a1aa] mt-3">Tout ce que vous devez savoir pour ne pas vous faire arnaquer par les prop firms.</p>
      </div>

      {/* Article 1 */}
      <div id="scoring" className="card p-8 mb-8 scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-[-0.5px] mb-6">Comment lire le scoring PropRadar</h2>
        
        <div className="prose prose-invert max-w-none text-[#a1a1aa]">
          <p>Le score sur 100 est notre synthèse objective de la fiabilité d'une prop firm. Il n'est pas influencé par des partenariats payants.</p>
          
          <h4 className="text-white mt-8 mb-3">Comment est calculé le score :</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>+20 pts</strong> — Ancienneté ≥ 2 ans (stabilité prouvée)</li>
            <li><strong>+20 pts</strong> — Transparence des règles (pas de clauses vagues ni de pièges cachés)</li>
            <li><strong>+20 pts</strong> — Preuves de payouts publics et vérifiés par la communauté</li>
            <li><strong>-15 pts par incident</strong> — Non-paiement, changement rétroactif, plaintes massives</li>
            <li><strong>-25 pts</strong> — Changement de règles rétroactif détecté</li>
            <li><strong>+10 pts</strong> — Présence légale vérifiable (société enregistrée, traçabilité)</li>
            <li><strong>+10 pts</strong> — Support réactif et payout rapide (&lt; 3 jours en moyenne)</li>
          </ul>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
            <div className="p-4 bg-[#22c55e]/10 rounded-xl"><div className="text-[#22c55e] text-2xl font-bold">75-100</div><div className="text-xs mt-1">VERT — Fiable</div></div>
            <div className="p-4 bg-[#f59e0b]/10 rounded-xl"><div className="text-[#f59e0b] text-2xl font-bold">40-74</div><div className="text-xs mt-1">ORANGE — À surveiller</div></div>
            <div className="p-4 bg-[#ef4444]/10 rounded-xl"><div className="text-[#ef4444] text-2xl font-bold">0-39</div><div className="text-xs mt-1">ROUGE — Éviter</div></div>
          </div>
        </div>
      </div>

      {/* Article 2 */}
      <div id="redflags" className="card p-8 mb-8 scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-[-0.5px] mb-6">Les red flags d'une prop firm qui va fermer</h2>
        
        <div className="text-[#a1a1aa] space-y-5 text-sm">
          <p>Nous avons analysé les 87 firms qui ont fermé entre 2024 et 2026. Voici les signaux les plus récurrents :</p>
          
          <div className="grid gap-4">
            {[
              { title: "Payouts qui ralentissent", desc: "Délai qui passe de 2-3 jours à 10+ jours sans explication. C'est presque toujours le premier signe de problèmes de trésorerie." },
              { title: "Changements de règles fréquents", desc: "Surtout s'ils sont rétroactifs (drawdown trailing appliqué sur des challenges déjà en cours). C'est une façon de réduire les payouts." },
              { title: "Support qui disparaît", desc: "Tickets sans réponse, Discord en mode silencieux, ou réponses génériques. Ils fuient les traders." },
              { title: "Prix trop bas + profit split élevé", desc: "49$ pour 80-90% split est souvent un signe de modèle non viable à long terme." },
              { title: "Aucune preuve de payouts publics", desc: "Pas de screenshots vérifiés, pas de leaderboard transparent, pas de Trustpilot avec preuves." },
              { title: "Société offshore sans traçabilité", desc: "Si vous ne trouvez pas d'enregistrement légal clair, méfiance maximale." },
            ].map((flag, i) => (
              <div key={i} className="flex gap-4 p-4 bg-[#1a1a1a] rounded-xl">
                <div className="text-[#ef4444] font-mono text-xl w-6">0{i+1}</div>
                <div>
                  <div className="font-semibold text-white mb-1">{flag.title}</div>
                  <div>{flag.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article 3 */}
      <div id="smc" className="card p-8 mb-8 scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-[-0.5px] mb-6">SMC et prop firms : quelles règles sont compatibles ?</h2>
        
        <div className="text-[#a1a1aa] text-sm space-y-4">
          <p>Le Smart Money Concept (SMC) / ICT est devenu très populaire. Malheureusement, beaucoup de prop firms l'interdisent ou le limitent fortement.</p>
          
          <div className="bg-[#111] p-6 rounded-xl">
            <div className="font-semibold text-white mb-4">Règles généralement acceptées pour le SMC :</div>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Order Blocks, Fair Value Gaps, Liquidity grabs — généralement OK</li>
              <li>News trading autour de NFP / FOMC — souvent interdit (sauf exceptions comme FTMO, Apex)</li>
              <li>EA / bots basés sur SMC — variable, beaucoup l'interdisent maintenant</li>
              <li>Copy trading depuis un signal provider SMC — rarement autorisé</li>
            </ul>
          </div>

          <p className="text-xs">Conseil : Toujours vérifier la section "Prohibited Trading Strategies" dans les règles officielles avant de commencer un challenge. Beaucoup de firms ont durci les règles en 2025.</p>
        </div>
      </div>

      {/* Article 4 */}
      <div id="verifier-paiement" className="card p-8 mb-8 scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-[-0.5px] mb-6">Comment vérifier si une prop firm paie vraiment</h2>
        
        <div className="text-[#a1a1aa] text-sm">
          <p className="mb-6">Le plus important avant de mettre de l'argent : vérifier les payouts réels.</p>
          
          <div className="space-y-6">
            <div>
              <div className="font-semibold text-white mb-2">1. Cherchez des preuves vérifiables</div>
              <ul className="pl-5 list-disc space-y-1">
                <li>Screenshots avec date, montant, nom d'utilisateur visible</li>
                <li>Vidéos de retrait sur YouTube (récentes)</li>
                <li>Posts sur Trustpilot / Forex Peace Army avec preuves</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">2. Regardez la cohérence</div>
              <p>Si une firm a 500 avis 5 étoiles mais aucun payout prouvé, c'est suspect. Les vraies firms ont un mix d'avis (parce que certains traders perdent leurs challenges).</p>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">3. Testez avec de petits montants d'abord</div>
              <p>Commencez par le plus petit challenge. Si le payout arrive dans les délais annoncés, vous pouvez monter en taille.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/comparateur" className="btn btn-primary">
          Retourner au comparateur et appliquer ces filtres →
        </Link>
      </div>
    </div>
  );
}
