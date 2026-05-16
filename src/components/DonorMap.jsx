import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Activity, Info, AlertTriangle } from 'lucide-react';

const HOSPITALS = [
    {
        id: 1,
        name: 'Apollo Hospital',
        type: 'hospital',
        needs: ['O-', 'A+'],
        urgency: 'High',
        address: 'Bannerghatta Road, Bangalore',
        mapUrl: 'https://www.google.com/maps/search/Apollo+Hospital+Bannerghatta+Road+Bangalore',
        top: '25%',
        left: '20%'
    },
    {
        id: 2,
        name: 'Central Blood Bank',
        type: 'bank',
        needs: ['All Groups'],
        urgency: 'Normal',
        address: 'Gandhi Nagar, Chennai',
        mapUrl: 'https://www.google.com/maps/search/Central+Blood+Bank+Chennai',
        top: '45%',
        left: '65%'
    },
    {
        id: 3,
        name: 'City General Hospital',
        type: 'hospital',
        needs: ['B-', 'AB-'],
        urgency: 'Critical',
        address: 'Hitech City, Hyderabad',
        mapUrl: 'https://www.google.com/maps/search/City+General+Hospital+Hyderabad',
        top: '70%',
        left: '35%'
    },
    {
        id: 4,
        name: 'Fortis Memorial',
        type: 'hospital',
        needs: ['O+'],
        urgency: 'Stable',
        address: 'Gurgaon, Delhi NCR',
        mapUrl: 'https://www.google.com/maps/search/Fortis+Memorial+Gurgaon',
        top: '15%',
        left: '75%'
    }
];

const DonorMap = () => {
    const [activeHospital, setActiveHospital] = useState(HOSPITALS[0]);

    return (
        <section style={{ padding: '6rem 0', backgroundColor: '#fdfdfd' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
                        Live Facility Surveillance
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111' }}>Regional Donor & Hospital Map</h2>
                    <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Locate nearby hospitals with urgent blood requirements and navigate directly via Google Maps.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 350px',
                    gap: '2rem',
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                    border: '1px solid #f1f5f9'
                }}>
                    {/* Map Area */}
                    <div style={{
                        position: 'relative',
                        height: '600px',
                        backgroundColor: '#f8fafc',
                        overflow: 'hidden'
                    }}>
                        {/* Map Background Grid */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)',
                            backgroundSize: '30px 30px',
                            opacity: 0.5
                        }}></div>

                        {/* Animated Connection Lines (Mocking real-time routes) */}
                        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                            <path d="M 20% 25% Q 40% 35% 65% 45%" fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="5,5" opacity="0.2" />
                            <path d="M 65% 45% Q 50% 60% 35% 70%" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,5" opacity="0.2" />
                        </svg>

                        {/* Hospital Pins */}
                        {HOSPITALS.map(hosp => (
                            <div key={hosp.id} style={{
                                position: 'absolute',
                                top: hosp.top,
                                left: hosp.left,
                                transform: 'translate(-50%, -100%)',
                                cursor: 'pointer',
                                zIndex: activeHospital.id === hosp.id ? 100 : 10,
                                transition: 'all 0.3s ease'
                            }}
                                onClick={() => setActiveHospital(hosp)}
                            >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    {/* Tooltip on Pin */}
                                    {activeHospital.id === hosp.id && (
                                        <div style={{
                                            backgroundColor: '#1e293b',
                                            color: 'white',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            marginBottom: '8px',
                                            whiteSpace: 'nowrap',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            animation: 'slideIn 0.2s ease-out'
                                        }}>
                                            {hosp.name}
                                        </div>
                                    )}
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        backgroundColor: hosp.id === activeHospital.id ? 'var(--color-primary)' : 'white',
                                        color: hosp.id === activeHospital.id ? 'white' : 'var(--color-primary)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                                        border: '2px solid var(--color-primary)',
                                        transform: hosp.id === activeHospital.id ? 'scale(1.2)' : 'scale(1)',
                                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}>
                                        <MapPin size={20} />
                                    </div>
                                    {/* Pulse Effect for High Urgency */}
                                    {(hosp.urgency === 'High' || hosp.urgency === 'Critical') && (
                                        <div style={{
                                            position: 'absolute',
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                            zIndex: -1,
                                            top: '18px',
                                            animation: 'ripple 2s infinite'
                                        }}></div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Legend */}
                        <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', backdropFilter: 'blur(4px)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>LEGEND</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--color-primary)' }}></div> Hospital / Bank
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#e2e8f0', border: '1px solid var(--color-primary)' }}></div> Selected
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hospital Sidebar */}
                    <div style={{ borderLeft: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Activity size={20} color="var(--color-primary)" /> Nearby Facilities
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>Showing 4 medical units active in your area.</p>
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1, padding: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {HOSPITALS.map(hosp => (
                                    <div key={hosp.id}
                                        onClick={() => setActiveHospital(hosp)}
                                        style={{
                                            padding: '1.25rem',
                                            borderRadius: '16px',
                                            border: hosp.id === activeHospital.id ? '2px solid var(--color-primary)' : '1px solid #f1f5f9',
                                            backgroundColor: hosp.id === activeHospital.id ? 'rgba(239, 68, 68, 0.02)' : 'white',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: hosp.id === activeHospital.id ? '0 4px 12px rgba(239, 68, 68, 0.1)' : 'none'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                            <h4 style={{ fontWeight: 'bold', fontSize: '1rem' }}>{hosp.name}</h4>
                                            <span style={{
                                                fontSize: '0.7rem',
                                                padding: '2px 8px',
                                                borderRadius: '99px',
                                                fontWeight: 'bold',
                                                backgroundColor: hosp.urgency === 'Critical' ? '#fee2e2' : hosp.urgency === 'High' ? '#ffedd5' : '#f0fdf4',
                                                color: hosp.urgency === 'Critical' ? '#991b1b' : hosp.urgency === 'High' ? '#9a3412' : '#166534'
                                            }}>
                                                {hosp.urgency}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Navigation size={14} /> {hosp.address}
                                        </p>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                            <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: '500' }}>Needs:</span>
                                            {hosp.needs.map(ng => (
                                                <span key={ng} style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-primary)', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                                                    {ng}
                                                </span>
                                            ))}
                                        </div>

                                        <a
                                            href={hosp.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                width: '100%',
                                                padding: '0.75rem',
                                                backgroundColor: '#f1f5f9',
                                                borderRadius: '12px',
                                                color: '#1e293b',
                                                fontSize: '0.875rem',
                                                fontWeight: 'bold',
                                                textDecoration: 'none',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                        >
                                            <ExternalLink size={16} /> View on Google Maps
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes ripple {
                    0% { transform: scale(0.5); opacity: 1; }
                    100% { transform: scale(3); opacity: 0; }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default DonorMap;
