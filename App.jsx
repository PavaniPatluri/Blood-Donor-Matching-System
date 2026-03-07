import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import DonorRegistration from './components/DonorRegistration';

function App() {
  const [isEmergency, setIsEmergency] = useState(false);

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
