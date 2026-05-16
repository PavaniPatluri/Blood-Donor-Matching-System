import React from 'react';
import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const InfoCard = ({ icon: IconComponent, title, description, color }) => (
    <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        flex: 1,
        minWidth: '280px',
        borderTop: `4px solid ${color}`
    }}>
        <div style={{ marginBottom: '1rem', color: color }}>
            <IconComponent size={40} />
        </div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-light)', lineHeight: 1.7 }}>{description}</p>
    </div >
);

const InfoSection = () => {
    return (
        <section style={{ padding: '4rem 0', backgroundColor: '#faf9f6' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
                    Why This System Matters
                </h2>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <InfoCard
                        icon={AlertTriangle}
                        title="The Challenge"
                        description="Efficiently matching blood donors to recipients is critical to save lives and reduce transfusion risks. Every minute counts in emergencies."
                        color="var(--color-warning)"
                    />
                    <InfoCard
                        icon={CheckCircle}
                        title="Our Solution"
                        description="A smart, automated system that matches donors and recipients based on blood type compatibility and availability in real-time."
                        color="var(--color-success)"
                    />
                    <InfoCard
                        icon={Activity}
                        title="The Impact"
                        description="Faster matches, fewer transfusion reactions, and optimized blood resource management during emergencies and routine care."
                        color="var(--color-primary)"
                    />
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
