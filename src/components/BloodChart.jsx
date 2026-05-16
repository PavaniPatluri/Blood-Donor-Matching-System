import React from 'react';

const BloodChart = () => {
    return (
        <section style={{ padding: '4rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Blood Type Compatibility: The Key to Safe Transfusions
                    </h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--color-text-light)' }}>
                        Understanding blood types (A, B, AB, O) and Rh factor (+/-) is crucial for preventing immune reactions.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                    {/* Visual Chart Representation */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-md)',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        {/* Simple CSS Grid for Compatibility */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '1rem', width: '100%' }}>
                            <div className="compatibility-item" style={itemStyle}>
                                <strong style={{ color: 'var(--color-danger)' }}>O-</strong>
                                <span>Universal Donor (RBCs)</span>
                            </div>
                            <div className="compatibility-item" style={itemStyle}>
                                <strong style={{ color: 'var(--color-primary)' }}>AB+</strong>
                                <span>Universal Recipient</span>
                            </div>
                            <div className="compatibility-item" style={itemStyle}>
                                <strong style={{ color: '#333' }}>A+</strong>
                                <span>Receives A+, A-, O+, O-</span>
                            </div>
                            <div className="compatibility-item" style={itemStyle}>
                                <strong style={{ color: '#333' }}>B+</strong>
                                <span>Receives B+, B-, O+, O-</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <FactCard
                            title="O- Universal Donor"
                            text="Can donate red blood cells to any blood type. Critical for trauma situations where blood type is unknown."
                            borderColor="var(--color-danger)"
                        />
                        <FactCard
                            title="AB+ Universal Recipient"
                            text="Can receive blood from any blood type. They are the universal recipients for red blood cells."
                            borderColor="var(--color-primary)"
                        />
                        <FactCard
                            title="Rh Factor Matters"
                            text="Rh-negative patients must receive Rh-negative blood to prevent immune reactions."
                            borderColor="#333"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const itemStyle = {
    padding: '1.5rem',
    border: '1px solid #eee',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
};

const FactCard = ({ title, text, borderColor }) => (
    <div style={{
        padding: '1.5rem',
        backgroundColor: 'white',
        borderLeft: `5px solid ${borderColor}`,
        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        boxShadow: 'var(--shadow-sm)'
    }}>
        <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)' }}>{text}</p>
    </div>
);

export default BloodChart;
