import React, { useState, useEffect } from 'react';
import { Send, Users, CheckCircle, Clock } from 'lucide-react';

export default function EmergencyBroadcast() {
  const [status, setStatus] = useState('idle'); // idle, broadcasting, matched
  const [activeDonors, setActiveDonors] = useState(0);

  const startBroadcast = () => {
    setStatus('broadcasting');
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 5);
      setActiveDonors(count);
      if (count > 25) {
        clearInterval(interval);
        setStatus('matched');
      }
    }, 800);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-rose-100">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">One-Tap Broadcast</h3>
          <p className="text-sm text-slate-500">Notify all eligible donors instantly</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
          status === 'broadcasting' ? 'bg-rose-500 text-white animate-pulse' : 
          status === 'matched' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
        }`}>
          {status}
        </div>
      </div>

      {status === 'idle' && (
        <button 
          onClick={startBroadcast}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white h-32 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-rose-200"
        >
          <Send size={32} />
          <span className="font-bold text-lg">Broadcast Emergency</span>
        </button>
      )}

      {status === 'broadcasting' && (
        <div className="bg-rose-50 p-8 rounded-2xl flex flex-col items-center justify-center text-rose-600">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-rose-200 rounded-full animate-ping opacity-50"></div>
            <Users size={48} className="relative z-10" />
          </div>
          <div className="text-2xl font-black">{activeDonors}</div>
          <div className="text-sm font-bold uppercase">Donors Notified</div>
        </div>
      )}

      {status === 'matched' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 p-6 rounded-2xl flex items-center gap-4 text-emerald-700 border border-emerald-100">
            <CheckCircle size={32} />
            <div>
              <div className="font-bold">4 Donors Responded</div>
              <div className="text-sm opacity-80">Arrival time: 12-25 mins</div>
            </div>
          </div>
          
          <div className="space-y-2">
            {[1, 2].map(i => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                  <div className="text-sm font-bold text-slate-700">Donor #{Math.floor(Math.random()*9000)+1000}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                  <Clock size={12} /> {5*i}m
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
