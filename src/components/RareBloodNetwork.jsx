import React from 'react';
import { ShieldAlert, Zap, Globe, MessageSquare } from 'lucide-react';

export default function RareBloodNetwork() {
  const rareGroups = [
    { type: 'AB-', count: 12, status: 'Alert Active' },
    { type: 'O-', count: 45, status: 'Monitoring' },
    { type: 'Bombay', count: 2, status: 'Critical Search' },
  ];

  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-rose-500/20 rounded-2xl">
          <Globe className="text-rose-500" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Rare Group Network</h3>
          <p className="text-xs text-slate-400 uppercase tracking-widest">Global Emergency Protocol</p>
        </div>
      </div>

      <div className="space-y-4">
        {rareGroups.map((group) => (
          <div key={group.type} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex justify-between items-center hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center font-black text-lg">
                {group.type}
              </div>
              <div>
                <div className="font-bold">{group.count} Active Donors</div>
                <div className={`text-[10px] font-black uppercase ${group.status.includes('Critical') ? 'text-rose-500' : 'text-amber-500'}`}>
                  {group.status}
                </div>
              </div>
            </div>
            <button className="p-2 bg-slate-700 rounded-xl hover:bg-rose-600 transition-colors">
              <Zap size={18} />
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-4 bg-rose-600 hover:bg-rose-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-900/20">
        <ShieldAlert size={18} /> Activate Rare Alert
      </button>
    </div>
  );
}
