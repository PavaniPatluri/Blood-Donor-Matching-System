import React, { useState } from 'react';
import { ClipboardCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function EligibilityPredictor() {
  const [formData, setFormData] = useState({
    lastDonation: '',
    age: '',
    weight: '',
    hemoglobin: '',
    healthIssues: 'none'
  });
  const [result, setResult] = useState(null);

  const checkEligibility = (e) => {
    e.preventDefault();
    const daysSince = getDaysSince(formData.lastDonation);
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    
    let status = 'eligible';
    let message = 'You are eligible to donate now!';
    let daysToWait = 0;

    if (daysSince < 90) {
      status = 'waiting';
      daysToWait = 90 - daysSince;
      message = `Please wait ${daysToWait} more days before your next donation.`;
    } else if (age < 18 || age > 65) {
      status = 'ineligible';
      message = 'Age must be between 18 and 65 years.';
    } else if (weight < 50) {
      status = 'ineligible';
      message = 'Weight must be at least 50kg.';
    }

    setResult({ status, message, daysToWait });
  };

  const getDaysSince = (dateString) => {
    if (!dateString) return 365;
    const lastDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - lastDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-rose-50 max-w-md w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-rose-50 rounded-2xl">
          <ClipboardCheck className="text-rose-600" size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Eligibility Predictor</h3>
      </div>

      <form onSubmit={checkEligibility} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Age</label>
            <input 
              type="number" 
              placeholder="Years"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              className="w-full p-3 bg-slate-50 border-0 rounded-xl mt-1 focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weight (kg)</label>
            <input 
              type="number" 
              placeholder="kg"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              className="w-full p-3 bg-slate-50 border-0 rounded-xl mt-1 focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Donation Date</label>
          <input 
            type="date" 
            value={formData.lastDonation}
            onChange={(e) => setFormData({...formData, lastDonation: e.target.value})}
            className="w-full p-3 bg-slate-50 border-0 rounded-xl mt-1 focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <button type="submit" className="w-full bg-rose-600 text-white font-bold py-4 rounded-2xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
          Analyze Eligibility
        </button>
      </form>

      {result && (
        <div className={`mt-6 p-4 rounded-2xl flex gap-3 items-start ${
          result.status === 'eligible' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
          result.status === 'waiting' ? 'bg-amber-50 text-amber-800 border border-amber-100' :
          'bg-rose-50 text-rose-800 border border-rose-100'
        }`}>
          {result.status === 'eligible' ? <CheckCircle2 size={20} className="mt-1" /> : <AlertCircle size={20} className="mt-1" />}
          <div>
            <div className="font-bold text-sm uppercase tracking-wide">
              {result.status === 'eligible' ? 'Eligible Now' : 
               result.status === 'waiting' ? `Wait ${result.daysToWait} Days` : 'Ineligible'}
            </div>
            <p className="text-sm opacity-90 mt-1">{result.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
