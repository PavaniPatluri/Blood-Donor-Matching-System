import React from 'react';
import { Heart, Activity } from 'lucide-react';

const Hero = () => {
    return (
        <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            minHeight: '85vh',
            padding: '4rem 2rem',
            maxWidth: '1300px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, opacity: 0.4 }}>
                <div style={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
                    top: '-100px',
                    left: '-100px',
                    animation: 'float 20s infinite alternate'
                }}></div>
                <div style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
                    bottom: '-200px',
                    right: '-100px',
                    animation: 'float 25s infinite alternate-reverse'
                }}></div>
            </div>

            <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    color: 'var(--color-primary)',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '99px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.05)'
                }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
                    SYSTEM ACTIVE & SYNCED
                </div>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em',
                    color: '#111827'
                }}>
                    Blood Donor <br />
                    Matching System: <br />
                    <span style={{
                        background: 'linear-gradient(to right, #ef4444, #f87171)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}>Medical Precision</span>
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#4b5563',
                    marginBottom: '2.5rem',
                    maxWidth: '550px',
                    lineHeight: '1.6'
                }}>
                    A high-performance network connecting urgent donor requirements with immediate life-saving matches. <strong>Real-time. Reliable. Relentless.</strong>
                </p>

                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <button style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        padding: '1.1rem 2.5rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.4)',
                        animation: 'breathing 3s infinite'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 20px 30px -10px rgba(239, 68, 68, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(239, 68, 68, 0.4)';
                        }}
                        onClick={() => document.getElementById('matcher').scrollIntoView({ behavior: 'smooth' })}
                    >
                        <Heart size={20} fill="white" />
                        Find a Donor
                    </button>
                </div>
            </div>

            <div className="hero-image" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: '500px',
                    background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)',
                    borderRadius: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(255,255,255,0.8)'
                }}>
                    {/* Animated Pulse Rings */}
                    <div style={{ position: 'absolute', width: '200px', height: '200px', border: '2px solid rgba(239, 68, 68, 0.1)', borderRadius: '50%', animation: 'ripple 3s infinite' }}></div>
                    <div style={{ position: 'absolute', width: '300px', height: '300px', border: '1px solid rgba(239, 68, 68, 0.05)', borderRadius: '50%', animation: 'ripple 3s infinite 1s' }}></div>

                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, animation: 'heartBeat 2s infinite' }}>
                        <div style={{
                            width: '180px',
                            height: '180px',
                            backgroundColor: 'white',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 20px 40px rgba(239, 68, 68, 0.15)',
                            margin: '0 auto'
                        }}>
                            <Heart size={80} color="var(--color-primary)" fill="var(--color-primary)" />
                        </div>
                        <div style={{
                            marginTop: '2rem',
                            fontSize: '1.25rem',
                            fontWeight: '800',
                            color: '#111827',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase'
                        }}>
                            LIVE READY
                        </div>
                    </div>

                    {/* Floating Tech Elements */}
                    <div style={{ position: 'absolute', top: '20%', right: '10%', padding: '0.75rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', animation: 'float 6s infinite ease-in-out' }}>
                        <Activity size={24} color="#3b82f6" />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(20px, 20px); }
                }
                @keyframes breathing {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.03); filter: brightness(1.1); }
                }
                @keyframes ripple {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                @keyframes heartBeat {
                    0%, 100% { transform: scale(1); }
                    10% { transform: scale(1.08); }
                    20% { transform: scale(1); }
                    30% { transform: scale(1.05); }
                    40% { transform: scale(1); }
                }
            `}</style>
        </section>
    );
};

export default Hero;
