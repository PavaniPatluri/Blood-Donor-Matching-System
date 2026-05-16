import React, { useState, useEffect } from 'react';
import { Stethoscope, Calendar, Clock, History, CheckCircle, ExternalLink, Activity, Trash2 } from 'lucide-react';

const DonorBenefits = () => {
    const [history, setHistory] = useState(() => {
        try {
            const saved = localStorage.getItem('donorHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse donorHistory:", e);
            return [];
        }
    });

    useEffect(() => {
        const handleUpdate = () => {
            const saved = localStorage.getItem('donorHistory');
            setHistory(saved ? JSON.parse(saved) : []);
        };
        window.addEventListener('historyUpdated', handleUpdate);
        return () => window.removeEventListener('historyUpdated', handleUpdate);
    }, []);

    const clearHistory = () => {
        if (window.confirm("Are you sure you want to clear all registration history?")) {
            localStorage.removeItem('donorHistory');
            setHistory([]);
            window.dispatchEvent(new Event('historyUpdated'));
        }
    };

    const hasRecentDonation = () => {
        if (history.length === 0) return false;
        const lastDonation = new Date(history[0].timestamp);
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        return lastDonation > twoMonthsAgo;
    };

    const isEligible = hasRecentDonation();

    return (
        <section id="benefits" style={{ padding: '4rem 0', backgroundColor: '#fdf2f2' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Your Health & Benefits</h2>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
                        Exclusive perks for our life-saving community. Active donors enjoy special health opportunities.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Health Checkup Card */}
                    <div style={benefitCardStyle(isEligible)}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={iconBoxStyle(isEligible)}>
                                <Stethoscope size={28} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>Free Health Check-up</h3>
                                <span style={statusBadgeStyle(isEligible)}>
                                    {isEligible ? 'Active Benefit' : 'Complete a donation to unlock'}
                                </span>
                            </div>
                        </div>
                        <p style={{ color: '#555', marginBottom: '1.5rem' }}>
                            Get a comprehensive health screening at any of our partner centers. Validity: Within 2 months of your last donation.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isEligible ? 'var(--color-primary)' : '#999', fontWeight: 'bold' }}>
                            <Clock size={18} />
                            <span>Validity: 2 Months</span>
                        </div>
                    </div>

                    {/* Doctor Appointment Card */}
                    <div style={benefitCardStyle(isEligible)}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={iconBoxStyle(isEligible)}>
                                <Activity size={28} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>Expert Consultation</h3>
                                <span style={statusBadgeStyle(isEligible)}>
                                    Available at Center
                                </span>
                            </div>
                        </div>
                        <p style={{ color: '#555', marginBottom: '1.5rem' }}>
                            Address your health concerns with professional doctors during your visit to the donation center.
                        </p>
                        <button
                            disabled={!isEligible}
                            style={buttonStyle(isEligible)}
                        >
                            <Calendar size={18} />
                            Book Appointment
                        </button>
                    </div>
                </div>

                {/* History Section */}
                <div style={{ marginTop: '4rem', backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <History size={24} color="var(--color-primary)" />
                            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>Registration History</h3>
                        </div>
                        {history.length > 0 && (
                            <button
                                onClick={clearHistory}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                            >
                                <Trash2 size={16} /> Clear All
                            </button>
                        )}
                    </div>

                    {history.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed #eee', borderRadius: 'var(--radius-md)', color: '#999' }}>
                            <p>No history found. Start your journey by registering as a donor!</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                        <th style={thStyle}>Date</th>
                                        <th style={thStyle}>Donor ID</th>
                                        <th style={thStyle}>Type</th>
                                        <th style={thStyle}>Weight</th>
                                        <th style={thStyle}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fffcfc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <td style={tdStyle}>{new Date(item.timestamp).toLocaleDateString()}</td>
                                            <td style={tdStyle}>#BD-{item.id}</td>
                                            <td style={tdStyle}><span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{item.bloodType}</span></td>
                                            <td style={tdStyle}>{item.weight} kg</td>
                                            <td style={tdStyle}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                    <CheckCircle size={14} /> Completed
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const benefitCardStyle = (active) => ({
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    border: active ? '2px solid var(--color-primary)' : '1px solid #eee',
    position: 'relative',
    transition: 'transform 0.3s ease',
    cursor: 'default'
});

const iconBoxStyle = (active) => ({
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundColor: active ? '#fee2e2' : '#f1f5f9',
    color: active ? 'var(--color-primary)' : '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const statusBadgeStyle = (active) => ({
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    backgroundColor: active ? '#dcfce7' : '#f3f4f6',
    color: active ? '#166534' : '#6b7280'
});

const buttonStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    backgroundColor: active ? 'var(--color-primary)' : '#e2e8f0',
    color: active ? 'white' : '#94a3b8',
    fontWeight: 'bold',
    cursor: active ? 'pointer' : 'not-allowed',
    transition: 'all 0.2s',
    outline: 'none'
});

const thStyle = {
    padding: '1.25rem 1rem',
    color: '#64748b',
    fontWeight: '600',
    fontSize: '0.9rem'
};

const tdStyle = {
    padding: '1.25rem 1rem',
    fontSize: '1rem',
    color: '#334155'
};

export default DonorBenefits;
