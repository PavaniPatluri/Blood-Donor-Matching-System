import React from 'react';
import { Utensils, Droplets, Zap, Coffee, ShieldAlert, CheckCircle2, Apple, Beef, Waves } from 'lucide-react';

const DIET_DATA = {
    pre: [
        {
            title: "Hydration",
            desc: "Drink 16-20 oz of water or juice 2 hours before your appointment.",
            icon: <Droplets className="text-blue-500" size={24} />,
            items: ["Water", "Fruit Juices", "Coconut Water"]
        },
        {
            title: "Iron-Rich Foods",
            desc: "Boost your hemoglobin levels to ensure a successful donation.",
            icon: <Beef className="text-red-600" size={24} />,
            items: ["Red Meat", "Spinach", "Lentils", "Fortified Cereal"]
        },
        {
            title: "Vitamin C",
            desc: "Helps your body absorb iron more efficiently.",
            icon: <Apple className="text-orange-500" size={24} />,
            items: ["Oranges", "Strawberries", "Bell Peppers"]
        },
        {
            title: "Light Meal",
            desc: "Eat a healthy, low-fat meal 2-3 hours before donating.",
            icon: <Zap className="text-yellow-500" size={24} />,
            items: ["Oatmeal", "Whole Grain Toast", "Yogurt"]
        }
    ],
    post: [
        {
            title: "Replenish Fluids",
            desc: "Drink plenty of liquids for the next 24-48 hours.",
            icon: <Waves className="text-cyan-500" size={24} />,
            items: ["Water", "Electrolyte Drinks", "Soup"]
        },
        {
            title: "Power Protein",
            desc: "Help your body regenerate cells and tissues.",
            icon: <CheckCircle2 className="text-green-500" size={24} />,
            items: ["Eggs", "Chicken", "Nuts & Seeds", "Greek Yogurt"]
        },
        {
            title: "Quick Energy",
            desc: "Stable your blood sugar levels immediately after donation.",
            icon: <Zap className="text-amber-500" size={24} />,
            items: ["Bananas", "Granola Bars", "Pretzels"]
        },
        {
            title: "Folate & B12",
            desc: "Essential for new red blood cell production.",
            icon: <ShieldAlert className="text-purple-500" size={24} />,
            items: ["Liver", "Fish", "Leafy Greens", "Beetroot"]
        }
    ],
    avoid: [
        { name: "Fatty Foods", reason: "Can affect blood testing quality.", icon: <ShieldAlert size={16} /> },
        { name: "Alcohol", reason: "Leads to dehydration.", icon: <ShieldAlert size={16} /> },
        { name: "Heavy Caffeine", reason: "Can interfere with hydration.", icon: <ShieldAlert size={16} /> }
    ]
};

const DonorDiet = () => {
    return (
        <section id="diet" style={sectionStyle}>
            <div className="container">
                <div style={headerStyle}>
                    <Utensils size={48} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                    <h2 style={titleStyle}>The Ultimate Donor Diet Guide</h2>
                    <p style={subtitleStyle}>Fuel your body to save lives. Proper nutrition ensures a smooth donation and fast recovery.</p>
                </div>

                <div style={gridStyle}>
                    {/* Pre-Donation Section */}
                    <div style={columnStyle}>
                        <h3 style={columnTitleStyle}>
                            <span style={{ color: '#3b82f6' }}>Pre-Donation</span> Fuel
                        </h3>
                        <div style={cardsContainerStyle}>
                            {DIET_DATA.pre.map((item, idx) => (
                                <DietCard key={idx} {...item} />
                            ))}
                        </div>
                    </div>

                    {/* Post-Donation Section */}
                    <div style={columnStyle}>
                        <h3 style={columnTitleStyle}>
                            <span style={{ color: '#10b981' }}>Post-Donation</span> Recovery
                        </h3>
                        <div style={cardsContainerStyle}>
                            {DIET_DATA.post.map((item, idx) => (
                                <DietCard key={idx} {...item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Things to Avoid */}
                <div style={avoidSectionStyle}>
                    <h4 style={avoidTitleStyle}>Avoid 24h Before & After</h4>
                    <div style={avoidGridStyle}>
                        {DIET_DATA.avoid.map((item, idx) => (
                            <div key={idx} style={avoidItemStyle}>
                                <div style={avoidIconStyle}>{item.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{item.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{item.reason}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const DietCard = ({ title, desc, icon, items }) => (
    <div
        style={cardStyle}
        onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
        }}
    >
        <div style={cardHeaderStyle}>
            <div style={iconWrapperStyle}>{icon}</div>
            <h4 style={cardTitleStyle}>{title}</h4>
        </div>
        <p style={cardDescStyle}>{desc}</p>
        <div style={tagContainerStyle}>
            {items.map((tag, i) => (
                <span key={i} style={tagStyle}>{tag}</span>
            ))}
        </div>
    </div>
);

// Styles
const sectionStyle = {
    padding: '6rem 0',
    backgroundColor: '#fff',
};

const headerStyle = {
    textAlign: 'center',
    marginBottom: '4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#111',
    marginBottom: '1rem'
};

const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    lineHeight: '1.6'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '3rem',
    marginBottom: '4rem'
};

const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
};

const columnTitleStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textAlign: 'center'
};

const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem'
};

const cardStyle = {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '20px',
    border: '1px solid #eee',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
};

const cardHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
};

const iconWrapperStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const cardTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1e293b'
};

const cardDescStyle = {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: '1.5',
    margin: 0
};

const tagContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem'
};

const tagStyle = {
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.6rem',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    borderRadius: '6px'
};

const avoidSectionStyle = {
    backgroundColor: '#fff1f2',
    padding: '2rem 3rem',
    borderRadius: '24px',
    border: '1px dashed #fda4af'
};

const avoidTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#be123c',
    marginBottom: '1.5rem',
    textAlign: 'center'
};

const avoidGridStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2rem'
};

const avoidItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    minWidth: '200px'
};

const avoidIconStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#ffe4e6',
    color: '#e11d48',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export default DonorDiet;
