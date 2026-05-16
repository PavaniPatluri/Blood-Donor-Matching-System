import React, { useState, useEffect } from 'react';
import { Award, Heart, Star, Droplet, Shield, CreditCard } from 'lucide-react';
import DonorCard from './DonorCard';

const BADGES = [
    { id: 1, name: "First Drop", icon: <Droplet size={20} />, active: true, desc: "First donation completed" },
    { id: 2, name: "Life Saver", icon: <Heart size={20} />, active: true, desc: "Saved 3 lives" },
    { id: 3, name: "Regular", icon: <Star size={20} />, active: false, desc: "5 donations in a year" },
    { id: 4, name: "Guardian", icon: <Shield size={20} />, active: false, desc: "Verified emergency donor" },
    { id: 5, name: "AB+ Hero", icon: <Award size={20} />, active: false, desc: "Donated 5 times as AB+" },
    { id: 6, name: "O- Maverick", icon: <Heart size={20} />, active: false, desc: "Donated critical O- blood" },
];

const LEADERBOARD = [
    { rank: 1, name: "Sarah J.", donations: 12, impact: 36 },
    { rank: 2, name: "Mike R.", donations: 10, impact: 30 },
    { rank: 3, name: "Elena Q.", donations: 8, impact: 24 },
];

const RewardsDashboard = () => {
    const [backendStats, setBackendStats] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const [donorData, setDonorData] = useState(null);

    // Fetch stats from backend
    useEffect(() => {
        const fetchStats = async () => {
            const donorId = localStorage.getItem('donorId') || '1001';
            try {
                const response = await fetch(`/api/rewards/${donorId}`);
                if (!response.ok) throw new Error('Failed to fetch rewards');
                const data = await response.json();
                setBackendStats(data);
            } catch (error) {
                console.error("Rewards fetch error:", error);
            }
        };

        fetchStats();

        // Restore donorData check
        const checkDonor = () => {
            try {
                const isSubmitted = localStorage.getItem('donorSubmitted') === 'true';
                if (isSubmitted) {
                    const savedData = localStorage.getItem('donorFormData');
                    const data = savedData ? JSON.parse(savedData) : {};
                    const id = localStorage.getItem('donorId');
                    setDonorData({ ...data, id });
                } else {
                    setDonorData(null);
                }
            } catch (e) {
                console.error("Failed to parse donor data in RewardsDashboard:", e);
                setDonorData(null);
            }
        };
        checkDonor();

        window.addEventListener('donationsUpdated', fetchStats);
        window.addEventListener('donationsUpdated', checkDonor);
        return () => {
            window.removeEventListener('donationsUpdated', fetchStats);
            window.removeEventListener('donationsUpdated', checkDonor);
        };
    }, []);

    const donations = backendStats ? backendStats.total_donations : 0;
    const livesImpacted = backendStats ? backendStats.lives_impacted : 0;
    const nextLevel = backendStats ? (backendStats.next_level === "Elite Donor" ? 10 : 5) : 5;

    // Fallback badges if backend fails
    const fallbackBadges = [
        { id: 1, name: "First Drop", icon: <Droplet size={20} />, active: donations >= 1, desc: "First donation completed" },
        { id: 2, name: "Life Saver", icon: <Heart size={20} />, active: donations >= 3, desc: "Saved 9 lives" },
    ];

    const currentBadges = backendStats ? backendStats.badges : fallbackBadges;

    return (
        <section className="rewards-section" style={{
            padding: '4rem 0',
            backgroundColor: 'var(--color-bg-secondary, #f8fafc)'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <Award size={40} color="var(--color-primary)" />
                        Your Impact & Rewards
                    </h2>
                    <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}>
                        Track your donations and earn badges as you help save lives. Every drop counts.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem'
                }}>
                    {/* Stats Card */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid #eee'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                            Donation Stats
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{donations}</div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>Donations</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#059669' }}>{livesImpacted}</div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>Lives Impacted</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                <span>Next Level: {donations >= 5 ? 'Elite Donor' : 'Silver Donor'}</span>
                                <span>{donations}/{nextLevel} Donations</span>
                            </div>
                            <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${Math.min((donations / nextLevel) * 100, 100)}%`,
                                    height: '100%',
                                    backgroundColor: 'var(--color-primary)',
                                    borderRadius: '5px',
                                    transition: 'width 1s ease-in-out'
                                }}></div>
                            </div>
                        </div>

                        {donorData && (
                            <button
                                onClick={() => setShowCard(true)}
                                style={{
                                    marginTop: '2rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    border: '1px solid #ef4444',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.15)'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                            >
                                <CreditCard size={18} /> View Digital ID
                            </button>
                        )}
                    </div>

                    {/* Achievement Gallery */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid #eee'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                            Achievement Gallery
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem' }}>
                            {currentBadges.map((badge) => (
                                <div key={badge.id} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    opacity: badge.active ? 1 : 0.4,
                                    filter: badge.active ? 'none' : 'grayscale(100%)'
                                }} title={badge.desc}>
                                    <div style={{
                                        width: '55px',
                                        height: '55px',
                                        borderRadius: '50%',
                                        backgroundColor: badge.active ? '#fee2e2' : '#f1f5f9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '0.5rem',
                                        color: badge.active ? 'var(--color-primary)' : '#94a3b8',
                                        border: badge.active ? '2px solid var(--color-primary)' : '2px dashed #cbd5e1',
                                        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                        onMouseOver={(e) => badge.active && (e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)')}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                                    >
                                        {badge.icon}
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', lineHeight: 1.2 }}>{badge.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leaderboard Card */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid #eee',
                        gridColumn: 'span 1'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                            Top Donors
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {LEADERBOARD.map((donor) => (
                                <div key={donor.rank} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: donor.rank === 1 ? '#fffbeb' : '#f9fafb',
                                    border: donor.rank === 1 ? '1px solid #fde68a' : '1px solid #f3f4f6'
                                }}>
                                    <div style={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        backgroundColor: donor.rank === 1 ? '#f59e0b' : '#6b7280',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        marginRight: '1rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        {donor.rank}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{donor.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{donor.donations} Donations</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold', color: '#059669' }}>{donor.impact}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Lives Saved</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showCard && donorData && (
                <DonorCard
                    donor={donorData}
                    onClose={() => setShowCard(false)}
                />
            )}
        </section>
    );
};

export default RewardsDashboard;
