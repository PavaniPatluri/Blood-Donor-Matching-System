import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import DonorRegistration from './components/DonorRegistration';
import Login from './components/Login';

function App() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <Hero />
      <div id="register">
        <DonorRegistration />
      </div>
      {/* 17+ other premium components... */}
    </div>
  );
}

export default App;
