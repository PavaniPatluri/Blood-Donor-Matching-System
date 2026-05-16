import React, { useState } from 'react';
import { HeartPulse, Lock, User, ShieldCheck, Activity, Building2, UserCog } from 'lucide-react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple simulation: any username/password works for now for demo
    // In real app, this would hit the backend
    if (username && password) {
      onLogin({ username, role });
    } else {
      setError('Please fill in all fields.');
    }
  };

  const roles = [
    { id: 'donor', label: 'Donor', icon: Activity, color: 'text-rose-500' },
    { id: 'recipient', label: 'Recipient', icon: HeartPulse, color: 'text-rose-600' },
  ];

  return (
    <div className="login-wrapper bg-slate-50">
      <div className="login-box shadow-2xl border-0">
        <div className="login-header">
          <div className="icon-wrapper bg-rose-50">
            <HeartPulse size={36} className="text-rose-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Life Drop Portal</h2>
          <p className="text-slate-500 mt-2">Smart Healthcare Emergency Platform</p>
        </div>

        {error && <div className="error-banner mb-6">{error}</div>}

        <div className="role-selector">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`role-button ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="text-slate-700 font-semibold">Credential ID</label>
            <div className="input-with-icon mt-1">
              <User size={18} className="input-icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username or ID"
                className="bg-slate-50 focus:bg-white focus:ring-rose-500"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="text-slate-700 font-semibold">Access Key</label>
            <div className="input-with-icon mt-1">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-50 focus:bg-white focus:ring-rose-500"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn bg-rose-600 hover:bg-rose-700 transition-colors py-4 mt-4">
            Access Dashboard <ShieldCheck size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account? <a href="#" className="text-rose-600 font-bold hover:underline">Register Now</a>
          </p>
        </div>
      </div>
    </div>
  );
}
