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
    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl max-w-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <QrCode className="text-rose-500" /> SOS QR Code
        </h3>
        <span className="bg-rose-500/20 text-rose-400 text-[10px] font-bold px-2 py-1 rounded uppercase">Emergency Only</span>
      </div>

      <div className="bg-white p-4 rounded-2xl flex justify-center mb-6">
        <img src={qrImageUrl} alt="Emergency QR Code" className="w-48 h-48" />
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Patient Group</span>
          <span className="font-bold text-rose-500">{requestData?.bloodGroup || 'O-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Hospital</span>
          <span className="font-bold">{requestData?.hospital || 'City General'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-sm font-bold transition-all">
          <Download size={16} /> Save
        </button>
        <button className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 py-3 rounded-xl text-sm font-bold transition-all">
          <Share2 size={16} /> Broadcast
        </button>
      </div>
    </div>
  );
}
