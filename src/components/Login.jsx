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
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-header">
          <div className="icon-wrapper">
            <HeartPulse size={36} color="#ef4444" />
          </div>
          <h2>Life Drop Portal</h2>
          <p>Enter your details to access the network</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Enter Portal <Lock size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
