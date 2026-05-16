import React from 'react';
import { Award, ShieldCheck, Flame, Star } from 'lucide-react';

export default function TrustScoreBadge({ score = 85, donations = 5 }) {
  const getBadge = () => {
    if (donations >= 20) return { label: 'Emergency Hero', color: 'bg-rose-600', icon: Flame };
    if (donations >= 10) return { label: 'Gold Donor', color: 'bg-amber-500', icon: Star };
    if (donations >= 1) return { label: 'Verified Donor', color: 'bg-emerald-500', icon: ShieldCheck };
    return { label: 'New Member', color: 'bg-slate-400', icon: Award };
  };

  const badge = getBadge();
  const Icon = badge.icon;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-sm ${badge.color}`}>
        <Icon size={14} />
        {badge.label}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase">Trust Score</div>
        <div className="text-sm font-black text-slate-700">{score}%</div>
        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full" 
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}
