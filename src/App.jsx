import React, { useState, useEffect, useCallback } from 'react';
import { Activity } from 'lucide-react';
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
import Login from './components/Login';
import GuidePopup from './components/GuidePopup';
import Chatbot from './components/Chatbot';
import EligibilityPredictor from './components/EligibilityPredictor';
import TrustScoreBadge from './components/TrustScoreBadge';
import SOSQRGenerator from './components/SOSQRGenerator';
import EmergencyBroadcast from './components/EmergencyBroadcast';
import RareBloodNetwork from './components/RareBloodNetwork';
import DemandPrediction from './components/DemandPrediction';

function App() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [user, setUser] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

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

  if (!user) {
    return <Login onLogin={(userData) => { setUser(userData); setShowGuide(true); }} />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'donor':
        return (
          <div className="space-y-0">
            <div id="home"><Hero /></div>
            <div className="p-8 space-y-12">
              <div id="register"><DonorRegistration /></div>
              <div id="matcher"><DonorMatcher /></div>
              <div className="flex justify-end">
                <TrustScoreBadge score={92} donations={8} />
              </div>
              <div id="rewards"><RewardsDashboard /></div>
              <div id="map"><DonorMap /></div>
              <div id="activity"><LiveActivity /></div>
            </div>
          </div>
        );
      case 'recipient':
        return (
          <div className="p-8 space-y-8">
            <div id="map"><DonorMap /></div>
            <div id="matcher"><DonorMatcher /></div>
          </div>
        );
      case 'admin':
        return (
          <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">System Administration</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 text-white p-6 rounded-2xl">
                <div className="text-slate-400 text-xs font-bold uppercase">Total Users</div>
                <div className="text-2xl font-bold">1,248</div>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-2xl">
                <div className="text-slate-400 text-xs font-bold uppercase">Emergency Matches</div>
                <div className="text-2xl font-bold">42</div>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-2xl">
                <div className="text-slate-400 text-xs font-bold uppercase">System Status</div>
                <div className="text-2xl font-bold text-emerald-400">Online</div>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-2xl">
                <div className="text-slate-400 text-xs font-bold uppercase">Security Threats</div>
                <div className="text-2xl font-bold text-rose-400">0</div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DemandPrediction />
              <RareBloodNetwork />
            </div>
            <LiveActivity />
          </div>
        );
      default:
        return <div>Invalid Role</div>;
    }
  };

  return (
    <div className={`app-container ${isEmergency ? 'emergency-mode' : ''}`} style={{ paddingLeft: '90px' }}>
      <Sidebar role={user.role} />
      {showGuide && <GuidePopup onClose={() => setShowGuide(false)} />}
      <NotificationSystem />
      <EmergencyBanner
        isVisible={isEmergency}
        onClose={() => setIsEmergency(false)}
      />

      <div className="flex-1 overflow-y-auto">
        {renderDashboard()}
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
      <Chatbot />
    </div>
  );
}

export default App;
