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

  // Logo URL (using logoDomain or fallback to initials)
  const logoUrl = firm.logoDomain 
    ? `https://logo.clearbit.com/${firm.logoDomain}` 
    : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Back */}
      <Link href="/comparateur" className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-1 mb-6">
        ← Retour au comparateur
      </Link>

      {/* HEADER - Amélioré avec logo */}
      <div className="card mb-8 overflow-hidden">
        <div className="card-header px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-5">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={firm.name} 
                className="w-16 h-16 rounded-2xl object-contain bg-[#1f1f1f] p-2 border border-[#333]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
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
            {/* ... conditions existantes ... */}
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 h-fit">
          {/* CTA content */}
        </div>
      </div>

      {/* PRODUITS PROPOSÉS - Design amélioré */}
      {firm.products && firm.products.length > 0 && (
        <div className="card p-8 max-w-5xl mx-auto mt-6">
          <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
            Produits proposés
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {firm.products.map((product) => (
              <div key={product.id} className="border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-all bg-[#0a0a0a]">
                {/* Carte produit améliorée */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold text-lg tracking-[-0.5px]">{product.name}</div>
                    {product.isPopular && <span className="inline-block mt-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#22c55e] text-black font-medium">Populaire</span>}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#a1a1aa]">Jusqu'à</div>
                    <div className="font-mono text-2xl font-bold tracking-[-1px]">${product.accountSizeMax.toLocaleString()}</div>
                  </div>
                </div>

                {product.description && <p className="text-sm text-[#a1a1aa] mb-4">{product.description}</p>}

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span className="text-[#a1a1aa]">Profit Target</span> <span className="font-medium">{product.profitTarget}%</span></div>
                  <div className="flex justify-between"><span className="text-[#a1a1aa]">Max Daily Loss</span> <span className="font-medium">{product.maxDailyLoss}%</span></div>
                  <div className="flex justify-between"><span className="text-[#a1a1aa]">Max Drawdown</span> <span className="font-medium">{product.maxDrawdown}%</span></div>
                  <div className="flex justify-between"><span className="text-[#a1a1aa]">Profit Split</span> <span className="font-medium text-[#22c55e]">{product.profitSplit}%</span></div>
                </div>

                {product.hasConsistencyRule ? (
                  <div className="mb-4 px-3 py-2 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-xl text-xs">
                    ⚠ Règle de cohérence active : max {product.consistencyRulePercent}% du profit sur un jour
                  </div>
                ) : (
                  <div className="mb-4 px-3 py-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl text-xs text-[#22c55e]">
                    ✓ Aucune Consistency Rule
                  </div>
                )}

                {product.linkToStart && (
                  <a href={product.linkToStart} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center text-sm py-2.5">
                    Commencer ce produit →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RÈGLES DE COHÉRENCE - Design amélioré */}
      {firm.consistencyRules && firm.consistencyRules.length > 0 && (
        <div className="card p-8 max-w-5xl mx-auto mt-6">
          <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
            Règles de Cohérence <span className="text-xs px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b]">Important</span>
          </h2>
          <div className="space-y-5">
            {firm.consistencyRules.map((rule) => (
              <div key={rule.id} className="border border-[#1f1f1f] rounded-2xl p-6 bg-[#0a0a0a]">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-semibold text-lg">{rule.title}</div>
                  <div className="text-sm px-3 py-1 bg-[#1f1f1f] rounded-lg font-mono">{rule.value}</div>
                </div>
                <p className="text-sm text-[#a1a1aa] mb-3">{rule.description}</p>
                {rule.tipForTraders && (
                  <div className="text-xs p-3 bg-[#22c55e]/5 border-l-2 border-[#22c55e] rounded-r">
                    <span className="font-medium text-[#22c55e]">Conseil :</span> {rule.tipForTraders}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-10 text-center text-xs text-[#71717a] max-w-md mx-auto">
        PropRadar n'est pas affilié à {firm.name}. Les informations sont fournies à titre indicatif.
      </div>
    </div>
  );
}
