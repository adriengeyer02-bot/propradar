"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { propFirms } from '../lib/propFirms';

export default function Comparateur() {
  const [search, setSearch] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [newsFilter, setNewsFilter] = useState<'all' | 'yes' | 'no'>('all');

  const filteredFirms = propFirms
    .filter(firm => {
      const matchesSearch = firm.name.toLowerCase().includes(search.toLowerCase());
      const matchesStyle = selectedStyles.length === 0 || selectedStyles.some(s => firm.style.includes(s));
      const matchesNews = newsFilter === 'all' || 
        (newsFilter === 'yes' && firm.newsTrading) || 
        (newsFilter === 'no' && !firm.newsTrading);
      return matchesSearch && matchesStyle && matchesNews;
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-green-500 text-sm font-medium tracking-[2px]">OUTIL PRINCIPAL • {propFirms.length} FIRMS</div>
          <h1 className="text-5xl font-bold tracking-[-2px] mt-1">Comparateur Prop Firms</h1>
        </div>
        <button 
          onClick={() => { setSearch(''); setSelectedStyles([]); setNewsFilter('all'); }}
          className="px-4 py-2 text-sm border border-[#333] rounded-xl hover:bg-[#111]"
        >
          Réinitialiser tout
        </button>
      </div>

      <div className="flex gap-6">
        <div className="w-72 flex-shrink-0">
          <div className="card p-6 sticky top-6">
            <h3 className="font-semibold mb-4 text-lg">Filtres</h3>
            <input
              type="text"
              placeholder="Rechercher une firm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 text-sm mb-6"
            />
            <div className="text-xs text-[#a1a1aa] mb-2">STYLE DE TRADING</div>
            <div className="flex flex-wrap gap-2">
              {['SMC', 'Scalp', 'Swing', 'EA'].map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyles(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style])}
                  className={`px-3 py-1 text-xs rounded-full border ${selectedStyles.includes(style) ? 'bg-white text-black' : 'border-[#333] hover:bg-[#111]'}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#222] text-[#a1a1aa] text-xs">
                  <th className="py-4 px-6 text-left">FIRM</th>
                  <th className="py-4 px-6">SCORE</th>
                  <th className="py-4 px-6">SPLIT</th>
                  <th className="py-4 px-6">PRODUITS</th>
                  <th className="py-4 px-6">CONSISTENCY</th>
                  <th className="py-4 px-6 text-right">FICHE</th>
                </tr>
              </thead>
              <tbody>
                {filteredFirms.map(firm => (
                  <tr key={firm.id} className="border-b border-[#1f1f1f] hover:bg-[#0a0a0a] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {firm.logoDomain && (
                          <img src={`https://logo.clearbit.com/${firm.logoDomain}`} className="w-6 h-6 rounded object-contain bg-[#111]" alt={firm.name} />
                        )}
                        <span className="font-medium">{firm.name}</span>
                      </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-0.5 rounded-full text-xs font-mono ${firm.score >= 75 ? 'bg-[#22c55e] text-black' : 'bg-[#f59e0b] text-black'}`}>{firm.score}</span>
                    </td>
                    <td className="py-4 px-6 font-medium text-[#22c55e]">{firm.profitSplit}%</td>
                    <td className="py-4 px-6">
                      {firm.products && firm.products.length > 0 ? 
                        <span className="text-xs px-2.5 py-1 bg-[#22c55e]/10 text-[#22c55e] rounded-full">{firm.products.length} produits</span> : 
                        <span className="text-xs text-[#666]">—</span>}
                    </td>
                    <td className="py-4 px-6">
                      {firm.hasAnyConsistencyRule ? 
                        <span className="text-xs px-2.5 py-1 bg-[#f59e0b]/10 text-[#f59e0b] rounded-full">Règle active</span> : 
                        <span className="text-xs text-[#22c55e]">✓ Aucune</span>}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/firm/${firm.slug}`} className="text-xs px-4 py-2 border border-[#333] rounded-xl hover:bg-[#111]">Fiche</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
