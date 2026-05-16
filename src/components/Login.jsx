import React, { useState } from 'react';
import { HeartPulse, Lock, User } from 'lucide-react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Username' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] relative overflow-hidden">
      {/* Decorative background blurs to match your site's aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10 border border-gray-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-50 p-4 rounded-full text-[#ef4444]">
              <HeartPulse size={36} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-serif" style={{ fontFamily: 'Georgia, serif' }}>
            System Access
          </h2>
          <p className="text-gray-500 mt-2">Enter your credentials to secure the network</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 outline-none"
                placeholder="Username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 outline-none"
                placeholder="password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg shadow-red-200 flex justify-center items-center gap-2"
          >
            Access Network <Lock size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
