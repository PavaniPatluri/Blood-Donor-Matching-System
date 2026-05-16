import React from 'react';
import { Siren } from 'lucide-react';

const EmergencyControl = ({ isEmergency, onToggle }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000
        }}>
            <button
                onClick={onToggle}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    backgroundColor: isEmergency ? 'var(--color-text)' : 'var(--color-danger)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                    animation: isEmergency ? 'pulse 1s infinite' : 'none'
                }}
            >
                <Siren size={24} className={isEmergency ? 'animate-spin' : ''} />
                {isEmergency ? 'DISABLE EMERGENCY MODE' : 'REPORT EMERGENCY'}
            </button>

            <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }
      `}</style>
        </div>
    );
};

export default EmergencyControl;
