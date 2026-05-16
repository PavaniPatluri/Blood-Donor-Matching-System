import React, { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import BloodChart from './components/BloodChart';
import DonorMatcher from './components/DonorMatcher';
import DonorRegistration from './components/DonorRegistration';
import DonorMap from './components/DonorMap';
import AppointmentScheduler from './components/AppointmentScheduler';
import EmergencyControl from './components/EmergencyControl';
import EmergencyBanner from './components/EmergencyBanner';
import RewardsDashboard from './components/RewardsDashboard';
import NotificationSystem from './components/NotificationSystem';
import HealthMotivation from './components/HealthMotivation';
import LiveActivity from './components/LiveActivity';
import DonorBenefits from './components/DonorBenefits';
import DonorDiet from './components/DonorDiet';
import Sidebar from './components/Sidebar';

function App() {
  const [isEmergency, setIsEmergency] = useState(false);

  const resetSystem = useCallback(() => {
    if (window.confirm("This will clear all donor data, registration history, and reset the application. Proceed?")) {
      const keys = ['donorSubmitted', 'donorFormData', 'donorId', 'donorHistory', 'totalDonations'];
      keys.forEach(k => localStorage.removeItem(k));
      window.location.reload();
    }
  }, []);

  // Effect to handle Emergency Theme
  useEffect(() => {
    if (isEmergency) {
      document.body.style.setProperty('--color-primary', '#ef4444'); // Bright Red
      document.body.style.setProperty('--color-secondary', '#1f2937'); // Dark Gray/Black
      document.body.style.backgroundColor = '#111';
      document.body.style.color = '#fff';
    } else {
      document.body.style.setProperty('--color-primary', 'hsl(12, 85%, 55%)');
      document.body.style.setProperty('--color-secondary', 'hsl(30, 20%, 96%)');
      document.body.style.backgroundColor = 'var(--color-secondary)';
      document.body.style.color = 'var(--color-text)';
    }
  }, [isEmergency]);

  return (
    <div className={`app-container ${isEmergency ? 'emergency-mode' : ''}`} style={{ paddingLeft: '90px' }}>
      <Sidebar />
      <NotificationSystem />
      <EmergencyBanner
        isVisible={isEmergency}
        onClose={() => setIsEmergency(false)}
      />

      <div id="home">
        <Hero />
      </div>
      <InfoSection />

      <main className="container">
        <div id="map">
          <DonorMap />
        </div>
        <div id="matcher">
          <DonorMatcher />
        </div>
        <div id="appointments">
          <AppointmentScheduler />
        </div>
      </main>

      <div id="register">
        <DonorRegistration />
      </div>
      <div id="benefits">
        <DonorBenefits />
      </div>
      <div id="diet">
        <DonorDiet />
      </div>


      <div id="rewards">
        <RewardsDashboard />
      </div>
      <div id="activity">
        <LiveActivity />
      </div>

      <HealthMotivation />
      <BloodChart />

      <EmergencyControl
        isEmergency={isEmergency}
        onToggle={() => setIsEmergency(!isEmergency)}
      />

      <footer style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        marginTop: '4rem',
        borderTop: isEmergency ? '1px solid #333' : '1px solid #eee',
        color: 'var(--color-text-light)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <p>&copy; 2026 Blood Donor Matching System. Saving Lives with Precision.</p>
        <button
          onClick={resetSystem}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: '#ef4444',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            opacity: 0.6,
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.target.style.opacity = 1}
          onMouseOut={(e) => e.target.style.opacity = 0.6}
        >
          Reset Application Data (Dev Only)
        </button>
      </footer>
    </div>
  );
}

export default App;
