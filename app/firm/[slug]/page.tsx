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

  const isClosed = firm.status === 'Ferm\u00e9e';
  const isRisk = firm.status === 'Risque';

  const scoreColor = firm.score >= 75 ? '#22c55e' : firm.score >= 40 ? '#f59e0b' : '#ef4444';

  // Logo avec fallback propre
  const getLogoUrl = (logoDomain?: string) => {
    if (!logoDomain) return null;
    return `https://logo.clearbit.com/${logoDomain}?size=128`;
  };

  const logoUrl = getLogoUrl(firm.logoDomain);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link href="/comparateur" className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-1 mb-6">
        ← Retour au comparateur
      </Link>

      {/* HEADER avec logo */}
      <div className="card mb-8 overflow-hidden">
        <div className="card-header px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-5">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={firm.name}
                className="w-16 h-16 rounded-2xl object-contain bg-[#111] p-2 border border-[#333]"
                onError={(e) => {
                  // Fallback vers initiales si le logo ne charge pas
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-16 h-16 rounded-2xl bg-[#1f1f1f] flex items-center justify-center text-3xl font-mono font-bold tracking-[-2px] border border-[#333]';
                  fallback.textContent = firm.name.split(' ').map(w => w[0]).join('').slice(0,2);
                  target.parentNode?.insertBefore(fallback, target);
                }}
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-[#1f1f1f] flex items-center justify-center text-3xl font-mono font-bold tracking-[-2px] border border-[#333]">
                {firm.name.split(' ').map(w => w[0]).join('').slice(0,2)}
              </div>
            )}

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
            <div className="inline-block text-6xl font-bold font-mono tracking-[-2px]" style={{ color: scoreColor }}>
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
          <h2 className="font-semibold text-xl mb-6">Conditions de trading</h2>
          {/* ... conditions ... */}
        </div>

        {/* CTA */}
        <div className="card p-8 h-fit">
          {/* CTA content */}
        </div>
      </div>

      {/* PRODUITS PROPOSÉS */}
      {firm.products && firm.products.length > 0 && (
        <div className="card p-8 max-w-5xl mx-auto mt-6">
          <h2 className="font-semibold text-xl mb-6">Produits proposés</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {firm.products.map((product) => (
              <div key={product.id} className="border border-[#1f1f1f] rounded-2xl p-5 bg-[#0a0a0a]">
                <div className="flex justify-between mb-4">
                  <div className="font-semibold">{product.name}</div>
                  {product.isPopular && <span className="text-[10px] px-2 py-0.5 bg-[#22c55e] text-black rounded-full">Populaire</span>}
                </div>
                <div className="text-sm text-[#a1a1aa] mb-4">{product.description}</div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>Profit Target: <span className="font-medium">{product.profitTarget}%</span></div>
                  <div>Max Daily Loss: <span className="font-medium">{product.maxDailyLoss}%</span></div>
                  <div>Max Drawdown: <span className="font-medium">{product.maxDrawdown}%</span></div>
                  <div>Profit Split: <span className="font-medium text-[#22c55e]">{product.profitSplit}%</span></div>
                </div>

                {product.hasConsistencyRule ? (
                  <div className="text-xs px-3 py-2 bg-[#ef4444]/10 text-[#ef4444] rounded-xl mb-3">
                    ⚠ Règle de cohérence : max {product.consistencyRulePercent}%
                  </div>
                ) : (
                  <div className="text-xs px-3 py-2 bg-[#22c55e]/10 text-[#22c55e] rounded-xl mb-3">
                    ✓ Aucune Consistency Rule
                  </div>
                )}

                {product.linkToStart && (
                  <a href={product.linkToStart} target="_blank" className="btn btn-primary w-full justify-center text-sm">
                    Commencer ce produit →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RÈGLES DE COHÉRENCE */}
      {firm.consistencyRules && firm.consistencyRules.length > 0 && (
        <div className="card p-8 max-w-5xl mx-auto mt-6">
          <h2 className="font-semibold text-xl mb-6">Règles de Cohérence</h2>
          {/* ... rules ... */}
        </div>
      )}

      <div className="mt-10 text-center text-xs text-[#71717a]">
        PropRadar n'est pas affilié à {firm.name}.
      </div>
    </div>
  );
}
