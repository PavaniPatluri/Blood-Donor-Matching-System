import React, { useState } from 'react';
import {
    Home,
    MapPin,
    Users,
    UserPlus,
    Heart,
    Calendar,
    Award,
    Activity,
    Menu,
    X,
    LayoutDashboard,
    Utensils,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const navItems = [
        { id: 'home', icon: <Home size={20} />, label: 'Home' },
        { id: 'map', icon: <MapPin size={20} />, label: 'Donor Map' },
        { id: 'matcher', icon: <Users size={20} />, label: 'Match Center' },
        { id: 'register', icon: <UserPlus size={20} />, label: 'Registration' },
        { id: 'benefits', icon: <Heart size={20} />, label: 'Benefits' },
        { id: 'appointments', icon: <Calendar size={20} />, label: 'Appointments' },
        { id: 'rewards', icon: <Award size={20} />, label: 'Rewards & ID' },
        { id: 'activity', icon: <Activity size={20} />, label: 'Live Activity' },
        { id: 'diet', icon: <Utensils size={20} />, label: 'Diet Guide' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.innerWidth < 1024) setIsExpanded(false);
        }
    };

    return (
        <>
            {/* Sidebar toggle for mobile */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={mobileToggleStyle}
                className="mobile-toggle"
            >
                {isExpanded ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Overlay for mobile */}
            {isExpanded && (
                <div
                    onClick={() => setIsExpanded(false)}
                    style={overlayStyle}
                />
            )}

            <aside
                className="nav-sidebar"
                style={{
                    ...sidebarStyle,
                    width: isExpanded ? '240px' : '70px',
                    transform: isExpanded || window.innerWidth >= 1024 ? 'translateX(0)' : 'translateX(-100%)'
                }}
                onMouseEnter={() => window.innerWidth >= 1024 && setIsExpanded(true)}
                onMouseLeave={() => window.innerWidth >= 1024 && setIsExpanded(false)}
            >
                <div style={logoContainerStyle}>
                    <div style={logoIconStyle}>
                        <Heart size={24} fill="#ef4444" color="#ef4444" />
                    </div>
                    {isExpanded && <span style={logoTextStyle}>LifeDrop</span>}
                </div>

                <nav style={navStyle}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            style={navItemStyle}
                            title={!isExpanded ? item.label : ''}
                        >
                            <div style={iconWrapperStyle}>
                                {item.icon}
                            </div>
                            {isExpanded && (
                                <span style={labelStyle}>{item.label}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div style={footerStyle}>
                    <div style={dividerStyle} />
                    
                    <button 
                        onClick={() => window.location.reload()}
                        style={{...navItemStyle, color: '#ef4444', marginBottom: '1rem', padding: '0.75rem 0.6rem'}}
                        title={!isExpanded ? 'Logout' : ''}
                        className="logout-btn"
                    >
                        <div style={iconWrapperStyle}>
                            <LogOut size={20} />
                        </div>
                        {isExpanded && <span style={labelStyle}>Logout</span>}
                    </button>

                    <div style={footerContentStyle}>
                        <div style={statusDotStyle} />
                        {isExpanded && <span style={statusTextStyle}>System Active</span>}
                    </div>
                </div>
            </aside>
        </>
    );
};

// Add responsive styles
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @media (max-width: 1023px) {
        .nav-sidebar {
            left: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            border-radius: 0 !important;
            height: 100vh !important;
        }
        .mobile-toggle {
            display: block !important;
        }
    }
    @media (min-width: 1024px) {
        .nav-sidebar {
            display: flex !important;
        }
    }
`;
document.head.appendChild(styleSheet);

// Styles
const sidebarStyle = {
    position: 'fixed',
    left: '1.5rem',
    top: '1.5rem',
    bottom: '1.5rem',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
};

const mobileToggleStyle = {
    position: 'fixed',
    top: '1rem',
    left: '1rem',
    zIndex: 1001,
    padding: '0.75rem',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'none', // Default hidden, will show via CSS media query if needed
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 999
};

const logoContainerStyle = {
    padding: '2rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexShrink: 0
};

const logoIconStyle = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const logoTextStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: '0.05em'
};

const navStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0 0.75rem'
};

const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 0.6rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    width: '100%',
    gap: '1rem'
};

const iconWrapperStyle = {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
};

const labelStyle = {
    fontSize: '0.9rem',
    fontWeight: '500',
    whiteSpace: 'nowrap'
};

const footerStyle = {
    padding: '1.5rem 1.25rem',
    flexShrink: 0
};

const dividerStyle = {
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: '1rem'
};

const footerContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
};

const statusDotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 12px #10b981'
};

const statusTextStyle = {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
};

export default Sidebar;
