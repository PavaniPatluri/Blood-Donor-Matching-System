import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Username' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Blood Donor System</h2>
        {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '10px'}}>
            <label style={{display: 'block'}}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={{width: '100%', padding: '8px'}}
            />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label style={{display: 'block'}}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{width: '100%', padding: '8px'}}
            />
          </div>
          <button type="submit" style={{width: '100%', padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px'}}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
