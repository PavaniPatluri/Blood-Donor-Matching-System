import React from 'react';
import { QrCode, Share2, Download } from 'lucide-react';

export default function SOSQRGenerator({ requestData }) {
  const qrData = JSON.stringify({
    type: 'BLOOD_EMERGENCY',
    id: requestData?.id || 'REQ-' + Math.random().toString(36).substr(2, 9),
    bloodGroup: requestData?.bloodGroup || 'O-',
    hospital: requestData?.hospital || 'City General Hospital',
    urgency: requestData?.urgency || 'Critical'
  });

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="bg-white text-slate-900 p-0 rounded-[32px] shadow-2xl overflow-hidden max-w-sm w-full border border-slate-100">
      <div className="bg-rose-600 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="font-black text-xl tracking-tight leading-none italic">SOS CARD</h3>
          <p className="text-[10px] opacity-80 uppercase tracking-widest mt-1 font-bold">Emergency Protocol 2.0</p>
        </div>
        <QrCode size={32} strokeWidth={2.5} />
      </div>

      <div className="p-8">
        <div className="bg-slate-50 p-6 rounded-3xl flex justify-center mb-8 border-2 border-dashed border-slate-200">
          <img src={qrImageUrl} alt="Emergency QR Code" className="w-44 h-44 mix-blend-multiply" />
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-end pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Blood Group</span>
              <span className="text-2xl font-black text-rose-600">{requestData?.bloodGroup || 'O-'}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Status</span>
              <span className="text-xs font-bold px-3 py-1 bg-rose-100 text-rose-600 rounded-full">CRITICAL</span>
            </div>
          </div>
          
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Target Hospital</span>
            <span className="text-sm font-bold text-slate-700">{requestData?.hospital || 'City General Medical Center'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 hover:bg-slate-200 py-4 rounded-2xl text-xs font-black transition-all">
            <Download size={14} /> SAVE
          </button>
          <button className="flex items-center justify-center gap-2 bg-rose-600 text-white hover:bg-rose-700 py-4 rounded-2xl text-xs font-black transition-all shadow-lg shadow-rose-200">
            <Share2 size={14} /> BROADCAST
          </button>
        </div>
      </div>
      
      <div className="bg-slate-900 py-3 text-center">
        <span className="text-[9px] text-white/40 font-bold tracking-[0.2em] uppercase">Authenticated by LifeDrop Network</span>
      </div>
    </div>
  );
}
