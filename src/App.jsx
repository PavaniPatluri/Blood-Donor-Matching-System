import React from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import DonorRegistration from './components/DonorRegistration';

export default function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Hero />
      <div id="register">
        <DonorRegistration />
      </div>
    </div>
  );
}
