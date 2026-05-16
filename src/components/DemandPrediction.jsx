import React from 'react';
import { TrendingUp, BarChart3, Calendar, AlertCircle } from 'lucide-react';

export default function DemandPrediction() {
  const forecasts = [
    { group: 'O+', trend: '+15%', status: 'Increasing', color: 'text-rose-500' },
    { group: 'A-', trend: '-5%', status: 'Stable', color: 'text-emerald-500' },
    { group: 'B+', trend: '+22%', status: 'Seasonal Spike', color: 'text-amber-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="text-rose-600" /> AI Demand Forecast
        </h3>
        <div className="flex gap-2">
          <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-rose-600"><Calendar size={18} /></button>
          <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-rose-600"><BarChart3 size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {forecasts.map((f) => (
          <div key={f.group} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-slate-700">
                {f.group}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{f.status}</div>
                <div className="text-[10px] text-slate-500 uppercase font-black">Next 30 Days</div>
              </div>
            </div>
            <div className={`text-lg font-black ${f.color}`}>
              {f.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-rose-50 p-4 rounded-2xl flex gap-3 items-start border border-rose-100">
        <AlertCircle className="text-rose-600 shrink-0" size={20} />
        <p className="text-xs text-rose-800 leading-relaxed">
          <span className="font-bold">AI Insight:</span> Regional shortage predicted for <strong>O- Negative</strong> in North Sector starting June 12th. Recommend proactive donor outreach.
        </p>
      </div>
    </div>
  );
}
