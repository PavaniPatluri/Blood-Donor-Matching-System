import React, { useState } from 'react';
import { Heart, QrCode, Shield, Award, Info, X, Share2, Download } from 'lucide-react';

const DonorCard = ({ donor, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    if (!donor) return null;

    const benefits = [
        "Complimentary doctor appointment session",
        "Exclusive access to premium wellness workshops",
        "Free annual health screenings",
        "10% discount at partner pharmacies",
        "Early access to specialized blood donation camps",
        "Digital badge on community portal",
        "Invitations to donor appreciation events"
    ];

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button onClick={onClose} style={closeButtonStyle}>
                    <X size={24} />
                </button>

                <div
                    style={{
                        ...cardPerspectiveStyle,
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front of Card */}
                    <div style={cardFrontStyle}>
                        <div style={cardHeaderStyle}>
                            <div style={logoAreaStyle}>
                                <Heart fill="#ef4444" color="#ef4444" size={28} />
                                <span style={brandNameStyle}>LIFE DROP</span>
                            </div>
                            <div style={idStyle}>#BD-{donor.id || 'N/A'}</div>
                        </div>

                        <div style={cardBodyStyle}>
                            <div style={chipStyle}></div>
                            <div style={donorNameStyle}>{donor.fullName}</div>

                            <div style={infoGridStyle}>
                                <div>
                                    <div style={labelStyle}>BLOOD TYPE</div>
                                    <div style={valueStyle}>{donor.bloodType}</div>
                                </div>
                                <div>
                                    <div style={labelStyle}>MEMBER SINCE</div>
                                    <div style={valueStyle}>{new Date().getFullYear()}</div>
                                </div>
                                <div>
                                    <div style={labelStyle}>STATUS</div>
                                    <div style={{ ...valueStyle, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        ACTIVE <Shield size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={cardFooterStyle}>
                            <div style={qrAreaStyle}>
                                <QrCode size={40} opacity={0.8} />
                                <span style={{ fontSize: '10px', opacity: 0.6 }}>SCAN TO VERIFY</span>
                            </div>
                            <Award color="#f59e0b" size={32} style={{ opacity: 0.8 }} />
                        </div>

                        <div style={flipHintStyle}>
                            <Info size={14} /> Tap to view benefits
                        </div>
                    </div>

                    {/* Back of Card */}
                    <div style={cardBackStyle}>
                        <h3 style={backHeaderStyle}>DONOR BENEFITS</h3>
                        <div style={scrollableAreaStyle} className="hide-scrollbar">
                            <ul style={benefitsListStyle}>
                                {benefits.map((benefit, i) => (
                                    <li key={i} style={benefitItemStyle}>
                                        <Heart size={14} fill="#ef4444" color="#ef4444" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={termsStyle}>
                            ID valid at all Life Drop network hospitals.
                        </div>
                        <div style={flipHintBackStyle}>
                            <Info size={14} /> Tap to view ID
                        </div>
                    </div>
                </div>

                <div style={actionAreaStyle}>
                    <button style={actionButtonStyle}>
                        <Download size={18} /> Save to Phone
                    </button>
                    <button style={actionButtonStyle}>
                        <Share2 size={18} /> Share
                    </button>
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

// Styles
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20000,
    padding: '20px'
};

const modalStyle = {
    position: 'relative',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    perspective: '1500px'
};

const cardPerspectiveStyle = {
    width: '100%',
    aspectRatio: '1.586 / 1', // Standard ID card ratio
    position: 'relative',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d',
    cursor: 'pointer'
};

const cardSideStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '24px',
    padding: '2.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
};

const cardFrontStyle = {
    ...cardSideStyle,
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white'
};

const cardBackStyle = {
    ...cardSideStyle,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    transform: 'rotateY(180deg)',
    padding: '1.5rem 2rem'
};

const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem'
};

const logoAreaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
};

const brandNameStyle = {
    fontSize: '1.1rem',
    fontWeight: '900',
    letterSpacing: '0.15em',
    background: 'linear-gradient(to right, #fff, #9ca3af)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
};

const idStyle = {
    fontSize: '0.7rem',
    fontFamily: 'monospace',
    opacity: 0.6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: '6px 10px',
    borderRadius: '6px'
};

const cardBodyStyle = {
    flex: 1
};

const chipStyle = {
    width: '50px',
    height: '38px',
    background: 'linear-gradient(135deg, #fcd34d 0%, #d97706 100%)',
    borderRadius: '8px',
    marginBottom: '1.25rem',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0,0,0,0.1)'
};

const donorNameStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    lineHeight: '1.1'
};

const infoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem'
};

const labelStyle = {
    fontSize: '0.65rem',
    opacity: 0.5,
    marginBottom: '4px',
    fontWeight: 'bold'
};

const valueStyle = {
    fontSize: '1rem',
    fontWeight: 'bold'
};

const cardFooterStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto'
};

const qrAreaStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
};

const closeButtonStyle = {
    position: 'absolute',
    top: '-50px',
    right: '0',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.2s'
};

const flipHintStyle = {
    position: 'absolute',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.65rem',
    opacity: 0.3,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
};

const flipHintBackStyle = {
    ...flipHintStyle,
    transform: 'translateX(-50%)'
};

const backHeaderStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#ef4444',
    flexShrink: 0
};

const scrollableAreaStyle = {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '1rem',
    paddingRight: '4px'
};

const benefitsListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
};

const benefitItemStyle = {
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    lineHeight: '1.4',
    padding: '0.5rem',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '8px'
};

const termsStyle = {
    fontSize: '0.7rem',
    opacity: 0.4,
    textAlign: 'center',
    marginTop: 'auto',
    paddingTop: '1rem'
};

const actionAreaStyle = {
    display: 'flex',
    gap: '1rem',
    width: '100%'
};

const actionButtonStyle = {
    flex: 1,
    padding: '0.875rem',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backdropFilter: 'blur(4px)'
};

export default DonorCard;
