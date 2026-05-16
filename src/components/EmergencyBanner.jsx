import React, { useState, useEffect } from 'react';
import { Siren, AlertTriangle, Phone, X } from 'lucide-react';

const EmergencyBanner = ({
    isVisible,
    onClose,
    urgentGroups = "O- and A+",
    location = "City General Hospital",
    timeLeft = 3600 // seconds
}) => {
    const [pulse, setPulse] = useState(false);
    const [seconds, setSeconds] = useState(timeLeft);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setPulse(prev => !prev);
                setSeconds(prev => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isVisible]);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#dc2626',
            color: 'white',
            zIndex: 9999,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s ease-in-out',
            borderBottom: '4px solid #991b1b'
        }}>
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        padding: '0.5rem',
                        color: '#dc2626',
                        animation: 'spin 2s linear infinite'
                    }}>
                        <Siren size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            EMERGENCY MODE ACTIVATED
                            <span style={{
                                fontSize: '0.7rem',
                                backgroundColor: '#991b1b',
                                padding: '0.1rem 0.4rem',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>Critical</span>
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                            High demand for <strong style={{ textDecoration: 'underline' }}>{urgentGroups}</strong> at <strong>{location}</strong>.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'right', minWidth: '100px' }}>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8 }}>Time remaining</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'mono', fontFamily: 'monospace' }}>{formatTime(seconds)}</div>
                    </div>

                    <a href="tel:911" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'white',
                        color: '#dc2626',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        boxShadow: pulse ? '0 0 0 4px rgba(255, 255, 255, 0.3)' : 'none',
                        transition: 'box-shadow 0.2s'
                    }}>
                        <Phone size={18} />
                        Call Hospital
                    </a>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            opacity: 0.8,
                            transition: 'opacity 0.2s'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default EmergencyBanner;
