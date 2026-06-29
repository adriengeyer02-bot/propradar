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
              <div className="text-[#a1a1aa] text-sm mt-0.5">Cr\u00e9\u00e9e en {firm.anneeCreation} • {2026 - firm.anneeCreation} ans d'anciennet\u00e9</div>
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
          <div><span className="text-[#a1a1aa]">D\u00e9lai payout moyen</span><br /><span className={`font-semibold ${firm.payoutDelay > 5 ? 'text-[#f59e0b]' : ''}`}>{firm.payoutDelay} jours</span></div>
          <div><span className="text-[#a1a1aa]">Incidents signal\u00e9s</span><br /><span className={`font-semibold ${firm.incidents > 0 ? 'text-[#ef4444]' : 'text-[#22c55e]'}`}>{firm.incidents}</span></div>
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
              <span className="text-[#a1a1aa]">Pr\u00e9sence l\u00e9gale v\u00e9rifi\u00e9e</span>
              <span className={firm.legalVerified ? 'text-[#22c55e]' : 'text-[#f59e0b]'}>{firm.legalVerified ? 'Oui' : 'Non / Incertaine'}</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-[#0a0a0a] rounded-xl text-xs text-[#a1a1aa]">
            Ces conditions sont issues des r\u00e8gles officielles au moment de notre derni\u00e8re mise \u00e0 jour. 
            V\u00e9rifiez toujours sur le site de la firm avant de vous engager — les r\u00e8gles peuvent changer.
          </div>
        </div>

        {/* MONETISATION / CTA */}
        <div className="card p-8 h-fit">
          <div className="text-xs tracking-widest text-[#a1a1aa] mb-2">MON\u00c9TISATION TRANSPARENTE</div>
          <h3 className="font-semibold mb-4">Pr\u00eat \u00e0 passer le challenge ?</h3>
          
          <a 
            href={`https://example.com/affiliate/${firm.slug}?ref=propradar`} 
            target="_blank"
            className="btn btn-primary w-full justify-center mb-3"
          >
            Passer le challenge {firm.name} →
          </a>
          
          <div className="text-[10px] text-[#71717a] mb-4">
            Lien d'affiliation. Nous touchons une commission si vous passez par ce lien. 
            Cela n'influence en rien notre score de fiabilit\u00e9.
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
              ⛔ Firm ferm\u00e9e. Ne pas s'inscrire.
            </div>
          )}
        </div>
      </div>

      {/* PRODUITS PROPOS\u00c9S */}
      {firm.products && firm.products.length > 0 ? (
        <div className="lg:col-span-2 card p-8">
          <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
            Produits propos\u00e9s
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {firm.products.map((product) => (
              <div key={product.id} className="border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-all bg-[#0a0a0a]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold text-lg tracking-[-0.5px]">{product.name}</div>
                    {product.isPopular && (
                      <span className="inline-block mt-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#22c55e] text-black font-medium">Populaire</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#a1a1aa]">Jusqu&apos;\u00e0</div>
                    <div className="font-mono text-2xl font-bold tracking-[-1px]">${product.accountSizeMax.toLocaleString()}</div>
                  </div>
                </div>

                {product.description && (
                  <p className="text-sm text-[#a1a1aa] mb-4 leading-relaxed">{product.description}</p>
                )}

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span className="text-[#a1a1aa]">Profit Target</span> <span className="font-medium">{product.profitTarget}%</span></div>
                  <div className="flex justify-between"><span className="text-[#a1a1aa]">Max Daily Loss</span> <span className="font-medium">{product.maxDailyLoss}%</span></div>
                  <div className="flex justify-between"><span className="text-[#a1a1aa]">Max Drawdown</span> <span className="font-medium">{product.maxDrawdown}%</span></div>
                  <div className="flex justify-between"><span className="text-[#a1a1aa]">Profit Split</span> <span className="font-medium text-[#22c55e]">{product.profitSplit}%</span></div>
                </div>

                <div className="mb-3">
                  <div className="text-[10px] text-[#a1a1aa] mb-1.5">PLATEFORMES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.platforms.map((p, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-[#1f1f1f] rounded-lg border border-[#222]">{p}</span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-[#a1a1aa] mb-4">
                  Actifs tradables : <span className="text-white/80">{product.tradableAssets.join(' \u2022 ')}</span>
                </div>

                {product.hasConsistencyRule ? (
                  <div className="mb-4 px-3 py-2 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-xl text-xs">
                    <div className="font-medium text-[#ef4444] mb-0.5">⚠ R\u00e8gle de coh\u00e9rence active</div>
                    <div>Max {product.consistencyRulePercent}% du profit total sur un seul jour • S&apos;applique \u00e0 : {product.consistencyAppliesTo}</div>
                  </div>
                ) : (
                  <div className="mb-4 px-3 py-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl text-xs text-[#22c55e]">
                    ✓ Aucune Consistency Rule sur ce produit
                  </div>
                )}

                {product.linkToStart && (
                  <a 
                    href={product.linkToStart} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-center text-sm py-2.5"
                  >
                    Commencer ce produit →
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-[10px] text-[#71717a]">
            Les specs peuvent varier selon la taille de compte choisie. V\u00e9rifiez toujours les conditions officielles.
          </div>
        </div>
      ) : (
        <div className="lg:col-span-2 card p-8">
          <h2 className="font-semibold text-xl mb-3">Produits propos\u00e9s</h2>
          <p className="text-sm text-[#a1a1aa]">Les diff\u00e9rents challenges, tailles de compte et programmes de {firm.name} sont en cours d&apos;ajout d\u00e9taill\u00e9 sur PropRadar. Revenez dans les prochains jours pour voir toutes les options.</p>
        </div>
      )}

      {/* R\u00c8GLES DE COH\u00c9RENCE (CONSISTENCY RULES) */}
      {firm.consistencyRules && firm.consistencyRules.length > 0 ? (
        <div className="lg:col-span-2 card p-8">
          <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
            R\u00e8gles de Coh\u00e9rence (Consistency Rules)
            <span className="text-xs font-normal px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b]">Important</span>
          </h2>
          
          <div className="space-y-5">
            {firm.consistencyRules.map((rule) => (
              <div key={rule.id} className="border border-[#1f1f1f] rounded-2xl p-6 bg-[#0a0a0a]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <div className="font-semibold text-lg">{rule.title}</div>
                  <div className="text-sm px-3 py-1 bg-[#1f1f1f] rounded-lg font-mono w-fit">{rule.value}</div>
                </div>
                
                <p className="text-sm text-[#a1a1aa] mb-4 leading-relaxed">{rule.description}</p>
                
                {rule.howToCalculate && (
                  <div className="mb-3 text-xs">
                    <span className="text-[#a1a1aa]">Calcul : </span>
                    <span className="font-mono bg-[#111] px-2 py-0.5 rounded">{rule.howToCalculate}</span>
                  </div>
                )}
                
                {rule.tipForTraders && (
                  <div className="text-xs p-3 bg-[#22c55e]/5 border-l-2 border-[#22c55e] rounded-r mb-2">
                    <span className="font-medium text-[#22c55e]">Conseil trader :</span> {rule.tipForTraders}
                  </div>
                )}
                
                {rule.example && (
                  <div className="text-xs text-[#a1a1aa]">
                    <span className="font-medium">Exemple :</span> {rule.example}
                  </div>
                )}
                
                <div className="mt-3 text-[10px] text-[#71717a]">
                  S&apos;applique \u00e0 : {rule.appliesTo}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-[#111] rounded-xl text-xs text-[#a1a1aa]">
            Ces r\u00e8gles existent pour encourager un trading coh\u00e9rent et discipliné plut\u00f4t que des performances bas\u00e9es sur un ou deux trades chanceux. 
            Respectez-les scrupuleusement pour valider vos challenges et recevoir vos payouts.
          </div>
        </div>
      ) : (
        <div className="lg:col-span-2 card p-8">
          <h2 className="font-semibold text-xl mb-3 flex items-center gap-2">
            R\u00e8gles de Coh\u00e9rence
          </h2>
          <p className="text-sm text-[#a1a1aa] mb-2">Aucune Consistency Rule stricte document\u00e9e pour {firm.name} (ou en cours de v\u00e9rification).</p>
          <p className="text-xs text-[#71717a]">Certaines firms n&apos;appliquent pas de r\u00e8gle de pourcentage sur le meilleur jour. C&apos;est un avantage pour les traders qui aiment scaler rapidement leurs gains.</p>
        </div>
      )}

      {/* HISTORIQUE & INCIDENTS */}
      <div className="lg:col-span-2 card p-8">
        <h2 className="font-semibold text-xl mb-6">Historique &amp; Transparence</h2>
        
        <div className="space-y-6">
          <div>
            <div className="text-xs text-[#a1a1aa] mb-1">DATE DE CR\u00c9ATION</div>
            <div className="font-medium">{firm.anneeCreation} ({2026 - firm.anneeCreation} ans)</div>
          </div>

          <div>
            <div className="text-xs text-[#a1a1aa] mb-2 flex items-center gap-2">
              INCIDENTS DOCUMENT\u00c9S <span className="badge badge-red text-[10px]">{firm.incidents}</span>
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
              <div className="text-sm text-[#22c55e]">Aucun incident majeur document\u00e9.</div>
            )}
          </div>

          {firm.recentRuleChange && (
            <div className="alert alert-warning text-sm">
              <strong className="text-[#f59e0b]">⚠ Changement de r\u00e8gles r\u00e9cent d\u00e9tect\u00e9.</strong><br />
              Cette firm a modifi\u00e9 ses conditions (drawdown, scaling ou payout) de mani\u00e8re potentiellement r\u00e9troactive. 
              Cela a fortement impact\u00e9 son score PropRadar.
            </div>
          )}
        </div>
      </div>

      {/* PAYOUT & AVERTISSEMENTS */}
      <div className="card p-8">
        <h2 className="font-semibold text-xl mb-6">Payouts &amp; R\u00e9alit\u00e9</h2>
        
        <div className="mb-6">
          <div className="text-xs text-[#a1a1aa]">D\u00c9LAI MOYEN RAPPORT\u00c9</div>
          <div className={`text-4xl font-mono font-bold mt-1 ${firm.payoutDelay > 7 ? 'text-[#ef4444]' : firm.payoutDelay > 4 ? 'text-[#f59e0b]' : 'text-[#22c55e]'}`}>
            {firm.payoutDelay} jours
          </div>
          <div className="text-xs mt-1 text-[#a1a1aa]">
            Bas\u00e9 sur retours v\u00e9rifi\u00e9s de la communaut\u00e9 (Discord, Trustpilot, forums)
          </div>
        </div>

        {firm.incidents > 3 && (
          <div className="alert alert-danger mb-6">
            <div className="font-semibold text-[#ef4444] mb-1">Red flags d\u00e9tect\u00e9s</div>
            <div className="text-sm text-[#a1a1aa]">
              Cette firm pr\u00e9sente un nombre \u00e9lev\u00e9 d'incidents document\u00e9s. 
              Nous recommandons une extr\u00eame prudence ou de l'\u00e9viter compl\u00e8tement.
            </div>
          </div>
        )}

        {isClosed && (
          <div className="alert alert-danger">
            <div className="font-bold text-[#ef4444] mb-2">FIRM FERM\u00c9E — NE PAS S'INSCRIRE</div>
            <div className="text-sm">
              {firm.name} a cess\u00e9 ses op\u00e9rations. De nombreux traders n'ont jamais \u00e9t\u00e9 pay\u00e9s. 
              Toute inscription actuelle est une arnaque.
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Disclaimer final */}
    <div className="mt-10 text-center text-xs text-[#71717a] max-w-md mx-auto">
      PropRadar n'est pas affili\u00e9 \u00e0 {firm.name}. Les informations sont fournies \u00e0 titre indicatif et ne constituent pas un conseil financier. 
      Le trading de prop firms comporte des risques significatifs, y compris la perte totale du capital investi dans les challenges.
    </div>
  </div>
  );
}
