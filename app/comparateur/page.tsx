'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { propFirms, PropFirm } from '../lib/propFirms';
import ReliabilityIndicators from '../components/ReliabilityIndicators';

type SortKey = 'score' | 'prix' | 'profit' | 'trustpilot';
type SortDir = 'desc' | 'asc';

export default function Comparateur() {
  const [search, setSearch] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [newsFilter, setNewsFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [drawdownFilters, setDrawdownFilters] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState(300);
  const [minProfitSplit, setMinProfitSplit] = useState(50);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['Active', 'Risque']);
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const stylesOptions = ['SMC', 'Scalp', 'Swing', 'EA', 'Copy'];
  const drawdownOptions = ['EOD', 'Trailing', 'Static', 'Hybride'];

  const filteredFirms = useMemo(() => {
    let result = [...propFirms];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(q) || f.slug.toLowerCase().includes(q));
    }
    if (selectedStyles.length > 0) {
      result = result.filter(f => selectedStyles.some(s => f.style.includes(s)));
    }
    if (newsFilter === 'yes') result = result.filter(f => f.newsTrading);
    if (newsFilter === 'no') result = result.filter(f => !f.newsTrading);
    if (drawdownFilters.length > 0) {
      result = result.filter(f => drawdownFilters.includes(f.drawdownType));
    }
    result = result.filter(f => f.prixChallenge <= maxBudget && f.profitSplit >= minProfitSplit);
    if (selectedStatuses.length > 0) {
      result = result.filter(f => selectedStatuses.includes(f.status));
    }

    result.sort((a, b) => {
      let valA: number, valB: number;
      if (sortKey === 'score') { valA = a.score; valB = b.score; }
      else if (sortKey === 'prix') { valA = a.prixChallenge; valB = b.prixChallenge; }
      else if (sortKey === 'profit') { valA = a.profitSplit; valB = b.profitSplit; }
      else { valA = a.trustpilotRating || 0; valB = b.trustpilotRating || 0; }
      return sortDir === 'desc' ? valB - valA : valA - valB;
    });

    return result;
  }, [search, selectedStyles, newsFilter, drawdownFilters, maxBudget, minProfitSplit, selectedStatuses, sortKey, sortDir]);

  const selectedFirms = propFirms.filter(f => selectedIds.includes(f.id));

  const toggleStyle = (style: string) => setSelectedStyles(p => p.includes(style) ? p.filter(s => s !== style) : [...p, style]);
  const toggleDrawdown = (dd: string) => setDrawdownFilters(p => p.includes(dd) ? p.filter(d => d !== dd) : [...p, dd]);
  const toggleStatus = (st: string) => setSelectedStatuses(p => p.includes(st) ? p.filter(s => s !== st) : [...p, st]);
  const toggleSelect = (id: number) => setSelectedIds(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
    else { setSortKey(key); setSortDir(key === 'prix' ? 'asc' : 'desc'); }
  };

  const clearSelection = () => { setSelectedIds([]); setShowComparison(false); };
  const resetFilters = () => {
    setSearch(''); setSelectedStyles([]); setNewsFilter('all'); setDrawdownFilters([]);
    setMaxBudget(300); setMinProfitSplit(50); setSelectedStatuses(['Active', 'Risque']);
    setSortKey('score'); setSortDir('desc'); clearSelection();
  };

  const getScoreBadge = (score: number) => score >= 75 ? 'badge-green score-badge' : score >= 40 ? 'badge-orange score-badge' : 'badge-red score-badge';

  // Real logo with fallback
  const FirmLogo = ({ firm }: { firm: PropFirm }) => {
    if (firm.logoDomain) {
      return (
        <img
          src={`https://logo.clearbit.com/${firm.logoDomain}`}
          alt={firm.name}
          className="w-9 h-9 rounded-xl object-contain bg-white p-[3px] border border-[#1f1f1f]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.parentElement?.querySelector('.logo-fallback') as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      );
    }

    const bgColor = '#1f1f1f';
    const text = firm.name.split(' ').map(w => w[0]).join('').slice(0,2);
    return (
      <div 
        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold tracking-[-0.5px] border border-white/10"
        style={{ backgroundColor: bgColor, color: '#ffffff' }}
      >
        {text}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="text-[#22c55e] text-sm tracking-[2px] font-mono">OUTIL PRINCIPAL • 18 FIRMS</div>
          <h1 className="text-5xl font-semibold tracking-[-1.5px]">Comparateur Prop Firms</h1>
          <p className="text-[#a1a1aa] mt-2">Filtrez. Sélectionnez. Comparez. Indicateurs de fiabilité inclus.</p>
        </div>
        <button onClick={resetFilters} className="btn btn-secondary btn-sm">Réinitialiser tout</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* FILTERS */}
        <div className="lg:w-72 shrink-0">
          <div className="card p-6 sticky top-20">
            <div className="font-semibold mb-6">Filtres</div>

            <div className="mb-6">
              <div className="filter-label">Rechercher</div>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Nom de la firm..." className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2.5 text-sm focus:border-[#22c55e]" />
            </div>

            <div className="mb-6 filter-section pb-6">
              <div className="filter-label mb-3">Style de trading</div>
              <div className="flex flex-wrap gap-2">
                {stylesOptions.map(s => <button key={s} onClick={() => toggleStyle(s)} className={`px-3 py-1 text-xs rounded-full border ${selectedStyles.includes(s) ? 'bg-[#22c55e] text-black border-[#22c55e]' : 'border-[#1f1f1f]'}`}>{s}</button>)}
              </div>
            </div>

            <div className="mb-6 filter-section pb-6">
              <div className="filter-label">News trading</div>
              <div className="flex gap-2 text-xs">
                {['all','yes','no'].map(v => <button key={v} onClick={() => setNewsFilter(v as any)} className={`flex-1 py-2 rounded-lg border ${newsFilter === v ? 'bg-white text-black' : 'border-[#1f1f1f]'}`}>{v === 'all' ? 'Tous' : v}</button>)}
              </div>
            </div>

            <div className="mb-6 filter-section pb-6">
              <div className="filter-label mb-2">Type de drawdown</div>
              {drawdownOptions.map(dd => <label key={dd} className="flex items-center gap-2 text-sm mb-1"><input type="checkbox" checked={drawdownFilters.includes(dd)} onChange={() => toggleDrawdown(dd)} className="accent-[#22c55e]" /> {dd}</label>)}
            </div>

            <div className="mb-6">
              <div className="filter-label flex justify-between"><span>Budget max</span><span className="font-mono text-[#22c55e]">${maxBudget}</span></div>
              <input type="range" min="30" max="300" value={maxBudget} onChange={e => setMaxBudget(+e.target.value)} className="w-full accent-[#22c55e]" />
            </div>

            <div className="mb-6">
              <div className="filter-label flex justify-between"><span>Profit split min</span><span className="font-mono text-[#22c55e]">{minProfitSplit}%</span></div>
              <input type="range" min="50" max="95" value={minProfitSplit} onChange={e => setMinProfitSplit(+e.target.value)} className="w-full accent-[#22c55e]" />
            </div>

            <div>
              <div className="filter-label mb-2">Statut</div>
              {['Active','Risque','Fermée'].map(st => <label key={st} className="flex items-center gap-2 text-sm mb-1"><input type="checkbox" checked={selectedStatuses.includes(st)} onChange={() => toggleStatus(st)} className="accent-[#22c55e]" /> <span className={st==='Fermée'?'text-[#ef4444]':st==='Risque'?'text-[#f59e0b]':''}>{st}</span></label>)}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="flex-1">
          <div className="table-container bg-[#111111]">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="w-9 px-3"><input type="checkbox" onChange={e => setSelectedIds(e.target.checked ? filteredFirms.map(f=>f.id) : [])} /></th>
                  <th className="text-left px-4">Firm</th>
                  <th className="cursor-pointer px-3 text-center" onClick={() => handleSort('score')}>Score {sortKey==='score' && (sortDir==='desc'?'\u2193':'\u2191')}</th>
                  <th className="px-3 text-center">Fiabilité</th>
                  <th className="cursor-pointer px-3 text-center" onClick={() => handleSort('trustpilot')}>Trustpilot {sortKey==='trustpilot' && (sortDir==='desc'?'\u2193':'\u2191')}</th>
                  <th className="cursor-pointer px-3 text-right" onClick={() => handleSort('prix')}>Prix {sortKey==='prix' && (sortDir==='desc'?'\u2193':'\u2191')}</th>
                  <th className="cursor-pointer px-3 text-center" onClick={() => handleSort('profit')}>Split {sortKey==='profit' && (sortDir==='desc'?'\u2193':'\u2191')}</th>
                  <th className="px-3 text-center">Drawdown</th>
                  <th className="px-2 text-center">News</th>
                  <th className="px-2 text-center">SMC</th>
                  <th className="px-2 text-center">EA</th>
                  <th className="px-3 text-center">Payout</th>
                  <th className="px-3 text-center">Inc.</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredFirms.map(firm => (
                  <tr key={firm.id} className={firm.status === 'Fermée' ? 'opacity-60' : ''}>
                    <td className="px-3"><input type="checkbox" checked={selectedIds.includes(firm.id)} onChange={() => toggleSelect(firm.id)} /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <FirmLogo firm={firm} />
                        <div>
                          <div className="font-semibold">{firm.name}</div>
                          <div className="text-[10px] text-[#71717a]">{firm.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-3"><div className={getScoreBadge(firm.score)}>{firm.score}</div></td>
                    
                    <td className="px-3">
                      <ReliabilityIndicators firm={firm} compact={true} />
                    </td>

                    <td className="text-center px-3">
                      {firm.trustpilotRating ? (
                        <div className="text-xs">
                          <span className="font-semibold text-[#f59e0b]">{firm.trustpilotRating}</span> ★
                          <div className="text-[10px] text-[#71717a]">{(firm.trustpilotReviews! / 1000).toFixed(1)}k</div>
                        </div>
                      ) : '—'}
                    </td>
                    <td className="text-right px-3 font-mono">${firm.prixChallenge}</td>
                    <td className="text-center px-3"><span className="font-semibold text-[#22c55e]">{firm.profitSplit}</span>%</td>
                    <td className="text-center px-3"><span className="badge badge-gray text-[10px]">{firm.drawdownType}</span></td>
                    <td className="text-center px-2">{firm.newsTrading ? <span className="badge badge-green text-[10px]">OUI</span> : <span className="badge badge-red text-[10px]">NON</span>}</td>
                    <td className="text-center px-2">{firm.smcAllowed ? <span className="badge badge-green text-[10px]">✓</span> : <span className="badge badge-red text-[10px]">✗</span>}</td>
                    <td className="text-center px-2">{firm.eaAllowed ? <span className="badge badge-green text-[10px]">✓</span> : <span className="badge badge-red text-[10px]">✗</span>}</td>
                    <td className="text-center px-3"><span className={`font-mono text-sm ${firm.payoutDelay > 5 ? 'text-[#f59e0b]' : 'text-[#22c55e]'}`}>{firm.payoutDelay}j</span></td>
                    <td className="text-center px-3">{firm.incidents > 0 ? <span className="badge badge-red text-[10px]">{firm.incidents}</span> : <span className="text-[#22c55e] text-xs">0</span>}</td>
                    <td className="px-4"><Link href={`/firm/${firm.slug}`} className="btn btn-secondary btn-sm text-xs">Fiche</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedIds.length > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#111] border border-[#1f1f1f] rounded-2xl px-6 py-3 flex items-center gap-4 shadow-xl">
              <div><span className="font-semibold text-[#22c55e]">{selectedIds.length}</span> firm{selectedIds.length > 1 ? 's' : ''} sélectionnée{selectedIds.length > 1 ? 's' : ''}</div>
              <button onClick={() => setShowComparison(true)} className="btn btn-primary btn-sm">Comparer →</button>
              <button onClick={clearSelection} className="text-xs text-[#a1a1aa] hover:text-white">Annuler</button>
            </div>
          )}

          {showComparison && selectedFirms.length > 0 && (
            <div className="mt-8 card p-8">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Comparaison directe</h2>
                <button onClick={() => setShowComparison(false)} className="text-sm">Fermer</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {selectedFirms.map(f => (
                  <div key={f.id} className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-5">
                    <div className="flex justify-between mb-4">
                      <div className="font-semibold">{f.name}</div>
                      <div className={getScoreBadge(f.score)}>{f.score}</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-[#a1a1aa]">Profit Split</span> <span className="font-semibold text-[#22c55e]">{f.profitSplit}%</span></div>
                      <div className="flex justify-between"><span className="text-[#a1a1aa]">Trustpilot</span> <span>{f.trustpilotRating} ★ ({(f.trustpilotReviews! / 1000).toFixed(1)}k)</span></div>
                      <div className="flex justify-between"><span className="text-[#a1a1aa]">Payout moyen</span> <span className={f.payoutDelay > 5 ? 'text-[#f59e0b]' : ''}>{f.payoutDelay}j</span></div>
                      <div className="flex justify-between"><span className="text-[#a1a1aa]">Incidents</span> <span className={f.incidents > 0 ? 'text-[#ef4444]' : 'text-[#22c55e]'}>{f.incidents}</span></div>
                    </div>
                    <Link href={`/firm/${f.slug}`} className="mt-5 btn btn-secondary btn-sm w-full block text-center">Voir fiche complète →</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
