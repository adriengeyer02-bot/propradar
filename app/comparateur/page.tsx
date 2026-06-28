'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { propFirms, PropFirm } from '../lib/propFirms';

type SortKey = 'score' | 'prix' | 'profit';
type SortDir = 'desc' | 'asc';

export default function Comparateur() {
  // Filters state
  const [search, setSearch] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [newsFilter, setNewsFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [drawdownFilters, setDrawdownFilters] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState(300);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['Active', 'Risque']);
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const stylesOptions = ['SMC', 'Scalp', 'Swing', 'EA', 'Copy'];
  const drawdownOptions = ['EOD', 'Trailing', 'Static', 'Hybride'];

  // Filtered and sorted firms
  const filteredFirms = useMemo(() => {
    let result = [...propFirms];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(f => 
        f.name.toLowerCase().includes(q) || 
        f.slug.toLowerCase().includes(q)
      );
    }

    // Styles
    if (selectedStyles.length > 0) {
      result = result.filter(f => 
        selectedStyles.some(style => f.style.includes(style))
      );
    }

    // News trading
    if (newsFilter === 'yes') result = result.filter(f => f.newsTrading);
    if (newsFilter === 'no') result = result.filter(f => !f.newsTrading);

    // Drawdown
    if (drawdownFilters.length > 0) {
      result = result.filter(f => drawdownFilters.includes(f.drawdownType));
    }

    // Budget
    result = result.filter(f => f.prixChallenge <= maxBudget);

    // Status
    if (selectedStatuses.length > 0) {
      result = result.filter(f => selectedStatuses.includes(f.status));
    }

    // Sort
    result.sort((a, b) => {
      let valA: number, valB: number;
      if (sortKey === 'score') {
        valA = a.score; valB = b.score;
      } else if (sortKey === 'prix') {
        valA = a.prixChallenge; valB = b.prixChallenge;
      } else {
        valA = a.profitSplit; valB = b.profitSplit;
      }
      return sortDir === 'desc' ? valB - valA : valA - valB;
    });

    return result;
  }, [search, selectedStyles, newsFilter, drawdownFilters, maxBudget, selectedStatuses, sortKey, sortDir]);

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const toggleDrawdown = (dd: string) => {
    setDrawdownFilters(prev => 
      prev.includes(dd) ? prev.filter(d => d !== dd) : [...prev, dd]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
    } else {
      setSortKey(key);
      setSortDir(key === 'prix' ? 'asc' : 'desc');
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 75) return 'badge-green score-badge';
    if (score >= 40) return 'badge-orange score-badge';
    return 'badge-red score-badge';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Active') return 'badge-green';
    if (status === 'Risque') return 'badge-orange';
    return 'badge-red';
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedStyles([]);
    setNewsFilter('all');
    setDrawdownFilters([]);
    setMaxBudget(300);
    setSelectedStatuses(['Active', 'Risque']);
    setSortKey('score');
    setSortDir('desc');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="text-[#22c55e] text-sm tracking-[2px] font-mono">OUTIL PRINCIPAL</div>
          <h1 className="text-5xl font-semibold tracking-[-1.5px]">Comparateur Prop Firms</h1>
          <p className="text-[#a1a1aa] mt-2">Filtrez sans pitié. Comparez sur des critères concrets. Évitez les arnaques.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-[#a1a1aa] font-mono">
            {filteredFirms.length} firms affichées
          </div>
          <button onClick={resetFilters} className="btn btn-secondary btn-sm">
            Réinitialiser filtres
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR FILTERS */}
        <div className="lg:w-72 shrink-0">
          <div className="card p-6 sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <div className="font-semibold">Filtres</div>
              <button onClick={resetFilters} className="text-xs text-[#a1a1aa] hover:text-white">Tout effacer</button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="filter-label">Rechercher</div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nom de la firm..."
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#22c55e]"
              />
            </div>

            {/* Styles */}
            <div className="mb-6 filter-section pb-6">
              <div className="filter-label mb-3">Style de trading autorisé</div>
              <div className="flex flex-wrap gap-2">
                {stylesOptions.map(style => (
                  <button
                    key={style}
                    onClick={() => toggleStyle(style)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all ${selectedStyles.includes(style) 
                      ? 'bg-[#22c55e] text-black border-[#22c55e]' 
                      : 'border-[#1f1f1f] hover:border-[#333]'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* News Trading */}
            <div className="mb-6 filter-section pb-6">
              <div className="filter-label">News trading autorisé</div>
              <div className="flex gap-2">
                {['all', 'yes', 'no'].map(val => (
                  <button
                    key={val}
                    onClick={() => setNewsFilter(val as any)}
                    className={`flex-1 py-2 text-xs rounded-lg border ${newsFilter === val ? 'bg-white text-black border-white' : 'border-[#1f1f1f] hover:bg-[#1a1a1a]'}`}
                  >
                    {val === 'all' ? 'Tous' : val === 'yes' ? 'Oui' : 'Non'}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawdown */}
            <div className="mb-6 filter-section pb-6">
              <div className="filter-label mb-3">Type de drawdown</div>
              <div className="space-y-1.5">
                {drawdownOptions.map(dd => (
                  <label key={dd} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={drawdownFilters.includes(dd)}
                      onChange={() => toggleDrawdown(dd)}
                      className="accent-[#22c55e]"
                    />
                    <span>{dd}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Slider */}
            <div className="mb-6 filter-section pb-6">
              <div className="filter-label flex justify-between">
                <span>Budget challenge max</span>
                <span className="font-mono text-[#22c55e]">${maxBudget}</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="300" 
                step="5"
                value={maxBudget} 
                onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                className="w-full accent-[#22c55e]"
              />
              <div className="flex justify-between text-[10px] text-[#71717a] mt-1">
                <div>$30</div><div>$300</div>
              </div>
            </div>

            {/* Statut */}
            <div>
              <div className="filter-label mb-3">Statut</div>
              <div className="space-y-1.5">
                {['Active', 'Risque', 'Fermée'].map(st => (
                  <label key={st} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedStatuses.includes(st)}
                      onChange={() => toggleStatus(st)}
                      className="accent-[#22c55e]"
                    />
                    <span className={st === 'Fermée' ? 'text-[#ef4444]' : st === 'Risque' ? 'text-[#f59e0b]' : ''}>{st}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="flex-1 min-w-0">
          <div className="table-container bg-[#111111]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  <th className="text-left px-5 py-4 w-[220px]">Firm</th>
                  <th className="text-center cursor-pointer px-3" onClick={() => handleSort('score')}>
                    Score <span className="text-[10px]">{sortKey === 'score' ? (sortDir === 'desc' ? '↓' : '↑') : ''}</span>
                  </th>
                  <th className="text-center px-3">Ancienneté</th>
                  <th className="text-right cursor-pointer px-3" onClick={() => handleSort('prix')}>
                    Prix dès <span className="text-[10px]">{sortKey === 'prix' ? (sortDir === 'desc' ? '↓' : '↑') : ''}</span>
                  </th>
                  <th className="text-center cursor-pointer px-3" onClick={() => handleSort('profit')}>
                    Split <span className="text-[10px]">{sortKey === 'profit' ? (sortDir === 'desc' ? '↓' : '↑') : ''}</span>
                  </th>
                  <th className="text-center px-3">Drawdown</th>
                  <th className="text-center px-2">News</th>
                  <th className="text-center px-2">SMC</th>
                  <th className="text-center px-2">EA</th>
                  <th className="text-center px-3">Payout</th>
                  <th className="text-center px-3">Incidents</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredFirms.length === 0 && (
                  <tr>
                    <td colSpan={12} className="py-12 text-center text-[#a1a1aa]">
                      Aucune firm ne correspond à vos filtres. <button onClick={resetFilters} className="underline">Réinitialiser</button>
                    </td>
                  </tr>
                )}
                {filteredFirms.map((firm) => (
                  <tr key={firm.id} className={firm.status === 'Fermée' ? 'opacity-60' : ''}>
                    {/* Nom + Logo placeholder */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1f1f1f] flex items-center justify-center text-xs font-mono font-bold tracking-tighter border border-[#333]">
                          {firm.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div className="font-semibold">{firm.name}</div>
                          <div className="text-[10px] text-[#71717a]">{firm.slug}</div>
                        </div>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="text-center px-3">
                      <div className={getScoreBadge(firm.score)}>
                        {firm.score}
                      </div>
                    </td>

                    {/* Ancienneté */}
                    <td className="text-center px-3 font-mono text-sm text-[#a1a1aa]">
                      {2026 - firm.anneeCreation} ans
                    </td>

                    {/* Prix */}
                    <td className="text-right px-3 font-mono">
                      ${firm.prixChallenge}
                    </td>

                    {/* Profit Split */}
                    <td className="text-center px-3">
                      <span className="font-semibold text-[#22c55e]">{firm.profitSplit}</span>
                      <span className="text-[#a1a1aa]">%</span>
                    </td>

                    {/* Drawdown */}
                    <td className="text-center px-3">
                      <span className="badge badge-gray text-[10px] px-2.5">{firm.drawdownType}</span>
                    </td>

                    {/* News */}
                    <td className="text-center px-2">
                      {firm.newsTrading ? 
                        <span className="badge badge-green text-[10px]">OUI</span> : 
                        <span className="badge badge-red text-[10px]">NON</span>}
                    </td>

                    {/* SMC */}
                    <td className="text-center px-2">
                      {firm.smcAllowed ? 
                        <span className="badge badge-green text-[10px]">✓</span> : 
                        <span className="badge badge-red text-[10px]">✗</span>}
                    </td>

                    {/* EA */}
                    <td className="text-center px-2">
                      {firm.eaAllowed ? 
                        <span className="badge badge-green text-[10px]">✓</span> : 
                        <span className="badge badge-red text-[10px]">✗</span>}
                    </td>

                    {/* Payout délai */}
                    <td className="text-center px-3">
                      <div className={`font-mono text-sm ${firm.payoutDelay > 5 ? 'text-[#f59e0b]' : firm.payoutDelay > 3 ? 'text-[#a1a1aa]' : 'text-[#22c55e]'}`}>
                        {firm.payoutDelay}j
                      </div>
                    </td>

                    {/* Incidents */}
                    <td className="text-center px-3">
                      {firm.incidents > 0 ? (
                        <span className="badge badge-red text-[10px]">{firm.incidents}</span>
                      ) : (
                        <span className="text-[#22c55e] text-xs">0</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-4">
                      <Link 
                        href={`/firm/${firm.slug}`} 
                        className="btn btn-secondary btn-sm text-xs whitespace-nowrap"
                      >
                        Fiche →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-[#71717a] flex items-center gap-4">
            <div>Score PropRadar = fiabilité réelle (pas de marketing)</div>
            <div className="flex-1 h-px bg-[#1f1f1f]"></div>
            <div>Cliquez sur les en-têtes pour trier</div>
          </div>
        </div>
      </div>

      {/* Note en bas */}
      <div className="mt-8 text-[11px] text-[#71717a] max-w-3xl">
        Les données sont collectées à partir de sources publiques, rapports de traders, conditions officielles et historiques de paiements vérifiés. 
        Les firms "Fermée" sont listées à titre informatif uniquement. Nous ne recommandons aucune firm — nous exposons les faits.
      </div>
    </div>
  );
}
