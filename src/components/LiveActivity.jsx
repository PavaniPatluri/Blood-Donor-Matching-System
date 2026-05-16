import React, { useState, useEffect } from 'react';
import { Activity, Droplet, Users, Heart, Zap } from 'lucide-react';

const BLOOD_GROUPS = [
    { type: 'O-', level: 35, status: 'Critical' },
    { type: 'A+', level: 65, status: 'Stable' },
    { type: 'B-', level: 42, status: 'Low' },
    { type: 'AB+', level: 85, status: 'Full' }
];

const LiveActivity = () => {
    const [events, setEvents] = useState([
        { id: 1, text: "New donor registered in Mumbai", time: "Just now", type: "user" },
        { id: 2, text: "O- Match found for City Hospital", time: "2m ago", type: "match" },
        { id: 3, text: "Emergency alert resolved in Delhi", time: "5m ago", type: "alert" }
    ]);
    const [totalLivesSaved, setTotalLivesSaved] = useState(12480);

    const getRandomEvent = () => {
        const locations = ["Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata"];
        const types = ["New donor registered", "Immediate match successful", "Donation appointment completed"];
        return `${types[Math.floor(Math.random() * types.length)]} in ${locations[Math.floor(Math.random() * locations.length)]}`;
    };

    // Simulate live events
    useEffect(() => {
        const interval = setInterval(() => {
            const newEvent = {
                id: Date.now(),
                text: getRandomEvent(),
                time: "Just now",
                type: Math.random() > 0.5 ? 'user' : 'match'
            };
            setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
            setTotalLivesSaved(prev => prev + Math.floor(Math.random() * 2));

            // Occasionally trigger a "Need a Donor" notification
            if (Math.random() > 0.7) {
                const group = BLOOD_GROUPS[Math.floor(Math.random() * BLOOD_GROUPS.length)].type;
                window.dispatchEvent(new CustomEvent('newNotification', {
                    detail: {
                        message: `Critical Need: ${group} donor required urgently at Metro Hospital!`,
                        type: 'alert',
                        urgency: Math.random() > 0.5 ? 'emergency' : 'high',
                        contact: {
                            name: "Metro Hospital Blood Bank",
                            phone: "+91 80 4455 6677",
                            email: "bloodbank@metrohospitals.com"
                        }
                    }
                }));
            }
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section style={{
            padding: '5rem 0',
            background: 'linear-gradient(135deg, #111827, #1f2937)',
            color: 'white',
            overflow: 'hidden'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem 1.25rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <span style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
                        LIVE SYSTEM STATUS
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Real-time Donor Network</h2>
                    <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>Monitor live donation activities and global supply levels in real-time.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>

                    {/* Live Heartbeat Visualizer */}
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Activity size={20} color="#ef4444" /> Network Pulse
                        </h3>

                        <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <svg width="100%" height="100%" viewBox="0 0 200 60">
                                <path
                                    d="M0 30 L40 30 L45 20 L55 45 L60 30 L100 30 L105 5 L115 55 L120 30 L160 30 L165 25 L175 35 L180 30 L200 30"
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                    strokeDasharray="400"
                                    strokeDashoffset="400"
                                    style={{ animation: 'ekg 3s linear infinite' }}
                                />
                            </svg>
                            <Heart size={48} color="#ef4444" fill="#ef4444" style={{ position: 'absolute', opacity: 0.1, animation: 'heartBeat 1.2s infinite' }} />
                        </div>

                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontVariantNumeric: 'tabular-nums' }}>
                                {totalLivesSaved.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Lives Impacted Locally</div>
                        </div>
                    </div>

                    {/* Blood Supply Levels */}
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Droplet size={20} color="#60a5fa" /> Regional Supply
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {BLOOD_GROUPS.map(group => (
                                <div key={group.type}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>Group {group.type}</span>
                                        <span style={{ color: group.status === 'Critical' ? '#ef4444' : '#10b981' }}>{group.status}</span>
                                    </div>
                                    <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${group.level}%`,
                                            backgroundColor: group.status === 'Critical' ? '#ef4444' : '#3b82f6',
                                            borderRadius: '4px',
                                            transition: 'width 1s ease-in-out',
                                            position: 'relative'
                                        }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'shimmer 2s infinite' }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live Activity Feed */}
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Zap size={20} color="#f59e0b" /> Activity Feed
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {events.map(event => (
                                <div key={event.id} style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1rem',
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    borderRadius: '16px',
                                    animation: 'slideIn 0.5s ease-out'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        backgroundColor: event.type === 'match' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {event.type === 'match' ? <Zap size={18} color="#10b981" /> : <Users size={18} color="#3b82f6" />}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{event.text}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{event.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes ekeg {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes ekg {
                    0% { stroke-dashoffset: 400; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes heartBeat {
                    0% { transform: scale(1); opacity: 0.1; }
                    15% { transform: scale(1.3); opacity: 0.3; }
                    30% { transform: scale(1); opacity: 0.1; }
                    45% { transform: scale(1.15); opacity: 0.2; }
                    60% { transform: scale(1); opacity: 0.1; }
                }
                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                }
                @keyframes shimmer {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default LiveActivity;
