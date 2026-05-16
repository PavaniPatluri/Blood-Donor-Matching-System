import React from 'react';
import { Apple, Activity, Heart, Quote, CheckCircle, Info } from 'lucide-react';

const HEALTH_TIPS = [
    {
        title: "Stay Hydrated",
        desc: "Drink plenty of water (8-10 glasses) on the day of donation and the day after.",
        icon: <Activity className="text-blue-500" size={24} />,
        color: "#3b82f6"
    },
    {
        title: "Iron-Rich Diet",
        desc: "Eat foods like spinach, red meat, and beans to maintain healthy iron levels.",
        icon: <Apple className="text-red-500" size={24} />,
        color: "#ef4444"
    },
    {
        title: "Rest Well",
        desc: "Ensure you get 7-8 hours of sleep before your donation day.",
        icon: <Heart className="text-pink-500" size={24} />,
        color: "#ec4899"
    },
    {
        title: "Post-Donation Care",
        desc: "Avoid heavy lifting or intense exercise for at least 5 hours after donating.",
        icon: <CheckCircle className="text-green-500" size={24} />,
        color: "#10b981"
    },
    {
        title: "Eat a Light Meal",
        desc: "Have a healthy, low-fat snack before your appointment to keep your energy levels up.",
        icon: <Info className="text-amber-500" size={24} />,
        color: "#f59e0b"
    },
    {
        title: "Bring an ID",
        desc: "Don't forget to bring your donor card or a government-issued photo ID.",
        icon: <Heart className="text-indigo-500" size={24} />,
        color: "#6366f1"
    }
];

const HealthMotivation = () => {
    return (
        <section style={{ padding: '5rem 0', background: 'linear-gradient(to bottom, #ffffff, #fff5f5)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111' }}>
                        Empowering Your Health & Motivation
                    </h2>
                    <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Your health is our priority. Dive into these essential tips to stay donor-ready and fit.
                    </p>
                </div>

                {/* Health Tips Section */}
                <div style={{ marginBottom: '5rem' }}>
                    <h3 style={{
                        fontSize: '1.75rem',
                        marginBottom: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        color: 'var(--color-primary)'
                    }}>
                        <Activity size={32} /> Essential Donor Health Tips
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {HEALTH_TIPS.map((tip, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                padding: '2rem',
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.08)',
                                border: '1px solid #f1f5f9',
                                transition: 'all 0.3s ease',
                                cursor: 'default'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.12)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px -5px rgba(0,0,0,0.08)';
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    backgroundColor: `${tip.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: tip.color
                                }}>
                                    {tip.icon}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#1e293b' }}>{tip.title}</h4>
                                    <p style={{ margin: 0, fontSize: '1rem', color: '#475569', lineHeight: '1.6' }}>{tip.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Motivation Quote */}
                <div style={{
                    backgroundColor: '#1f2937',
                    padding: '4.5rem 2rem',
                    borderRadius: '30px',
                    textAlign: 'center',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div style={{ position: 'absolute', top: '30px', left: '30px', opacity: 0.05 }}>
                        <Quote size={120} />
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <p style={{
                            fontSize: '1.75rem',
                            fontStyle: 'italic',
                            marginBottom: '2rem',
                            maxWidth: '900px',
                            margin: '0 auto 2rem',
                            lineHeight: '1.5',
                            fontWeight: '300'
                        }}>
                            "To the world you may be one person, but to one person you may be the world. Your donation is not just blood; it is a gift of hope and life."
                        </p>
                        <div style={{
                            height: '2px',
                            width: '60px',
                            backgroundColor: 'var(--color-primary)',
                            margin: '0 auto 1.5rem'
                        }}></div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '0.05em', color: 'var(--color-primary)' }}>
                            BE A LIFESAVER
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HealthMotivation;
