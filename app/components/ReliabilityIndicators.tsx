'use client';

import { PropFirm } from '../lib/propFirms';

interface Props {
  firm: PropFirm;
  compact?: boolean;
}

export default function ReliabilityIndicators({ firm, compact = false }: Props) {
  const indicators = [
    {
      key: 'payoutProof',
      label: 'Payouts prouvés',
      active: firm.payoutProof,
      icon: '✓',
      color: 'text-[#22c55e]',
    },
    {
      key: 'legalVerified',
      label: 'Légal vérifié',
      active: firm.legalVerified,
      icon: '🛡️',
      color: 'text-[#3b82f6]',
    },
    {
      key: 'recentRuleChange',
      label: 'Changement récent',
      active: !firm.recentRuleChange,
      icon: '⚠️',
      color: 'text-[#f59e0b]',
      reverse: true,
    },
    {
      key: 'incidents',
      label: 'Incidents',
      active: firm.incidents === 0,
      icon: firm.incidents > 0 ? '!' : '✓',
      color: firm.incidents > 0 ? 'text-[#ef4444]' : 'text-[#22c55e]',
    },
  ];

  if (compact) {
    return (
      <div className="flex gap-1.5">
        {indicators.map((ind, index) => {
          const isGood = ind.reverse ? !ind.active : ind.active;
          return (
            <div 
              key={index}
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isGood ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-[#ef4444]/20 text-[#ef4444]'}`}
              title={ind.label}
            >
              {ind.icon}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {indicators.map((ind, index) => {
        const isGood = ind.reverse ? !ind.active : ind.active;
        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className={`${isGood ? ind.color : 'text-[#ef4444]'} font-bold w-4`}>
              {ind.icon}
            </span>
            <span className={isGood ? 'text-[#a1a1aa]' : 'text-[#ef4444]'}>
              {ind.label}
            </span>
            {ind.key === 'incidents' && firm.incidents > 0 && (
              <span className="text-xs text-[#ef4444]">({firm.incidents})</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
