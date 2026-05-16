import React from 'react';
import { X, Map, Calendar, Activity, ShieldAlert } from 'lucide-react';

export default function GuidePopup({ onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeBtnStyle} aria-label="Close Guide">
          <X size={24} />
        </button>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary, #ef4444)' }}>Welcome to Life Drop Portal</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>Here is a quick guide to get you started with our system:</p>
        
        <div style={gridStyle}>
          <div style={featureItemStyle}>
            <Map size={24} color="#ef4444" />
            <div>
              <h3 style={featureTitleStyle}>Live Donor Map</h3>
              <p style={featureDescStyle}>View real-time donor locations and blood banks near you.</p>
            </div>
          </div>
          <div style={featureItemStyle}>
            <Calendar size={24} color="#ef4444" />
            <div>
              <h3 style={featureTitleStyle}>Appointments</h3>
              <p style={featureDescStyle}>Schedule and manage your blood donation appointments.</p>
            </div>
          </div>
          <div style={featureItemStyle}>
            <Activity size={24} color="#ef4444" />
            <div>
              <h3 style={featureTitleStyle}>Live Activity</h3>
              <p style={featureDescStyle}>Track recent donations and community impact.</p>
            </div>
          </div>
          <div style={featureItemStyle}>
            <ShieldAlert size={24} color="#ef4444" />
            <div>
              <h3 style={featureTitleStyle}>Emergency Mode</h3>
              <p style={featureDescStyle}>Activate during critical shortages to alert nearby donors.</p>
            </div>
          </div>
        </div>

        <button onClick={onClose} style={getStartedBtnStyle}>
          Get Started
        </button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  padding: '1rem',
};

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '2rem',
  maxWidth: '500px',
  width: '100%',
  position: 'relative',
  color: '#333',
  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
};

const closeBtnStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#666'
};

const gridStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  marginBottom: '2rem'
};

const featureItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
};

const featureTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  marginBottom: '0.25rem',
  color: '#111'
};

const featureDescStyle = {
  fontSize: '0.9rem',
  color: '#666',
  lineHeight: '1.4'
};

const getStartedBtnStyle = {
  width: '100%',
  padding: '0.8rem',
  backgroundColor: '#ef4444',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
};
