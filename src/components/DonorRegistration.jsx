import React, { useState } from 'react';

function DonorRegistration() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodType, setBloodType] = useState('O+');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName: name, age: parseInt(age), bloodType: bloodType }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(`Welcome ${data.fullName}! ID: #BD-${data.id}`);
      }
    } catch (error) {
      setMessage('Registration simulated (backend not running).');
    }
  };

  return (
    <div className="registration-card">
      <h2>Join the Network</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Age</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} min="18" max="65" required />
        </div>
        <div>
          <label>Blood Type</label>
          <select value={bloodType} onChange={e => setBloodType(e.target.value)}>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default DonorRegistration;
