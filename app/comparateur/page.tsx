"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { propFirms } from '../lib/propFirms';

export default function Comparateur() {
  const [search, setSearch] = useState('');

  const filteredFirms = propFirms
    .filter(firm => firm.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-green-500 text-sm font-medium tracking-[2px]">OUTIL PRINCIPAL • {propFirms.length} FIRMS</div>
          <h1 className="text-5xl font-bold tracking-[-2px] mt-1">Comparateur Prop Firms</h1>
        </div>
        <button onClick={() => setSearch('')} className="px-4 py-2 text-sm border border-[#333] rounded-xl hover:bg-[#111]">
          Réinitialiser
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-[#222]">
          <input
            type="text"
            placeholder="Rechercher une firm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 text-sm"
          />
        </div>

        <table className="w-full text-sm">
          <thead className="text-xs text-[#a1a1aa] border-b border-[#222]">
            <tr>
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
              <tr key={firm.id} className="border-b border-[#1f1f1f] hover:bg-[#0a0a0a]">
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
                      <span className="text-xs bg-[#22c55e]/10 text-[#22c55e] px-2 py-1 rounded-full">{firm.products.length}</span> : 
                      <span className="text-xs text-[#666]">—</span>}
                  </td>
                  <td className="py-4 px-6">
                    {firm.hasAnyConsistencyRule ? 
                      <span className="text-xs bg-[#f59e0b]/10 text-[#f59e0b] px-2 py-1 rounded-full">Règle</span> : 
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
  );
}
