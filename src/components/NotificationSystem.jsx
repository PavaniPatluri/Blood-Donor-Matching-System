import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertCircle } from 'lucide-react';

const NotificationSystem = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = React.useCallback((data) => {
        const { message, type = 'info', contact, urgency = 'normal' } = data;
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type, contact, urgency }]);

        const duration = urgency === 'emergency' ? 8000 : 5000;
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, duration);
    }, []);

    useEffect(() => {
        const handleNewNotification = (e) => {
            if (e.detail) {
                addNotification(e.detail);
            }
        };
        window.addEventListener('newNotification', handleNewNotification);
        return () => window.removeEventListener('newNotification', handleNewNotification);
    }, [addNotification]);

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Simulate mock notifications
    // Initial mock notification for discovery
    useEffect(() => {
        const timer = setTimeout(() => {
            addNotification({
                message: "Emergency: O- Negative needed at City Hospital!",
                type: 'alert',
                urgency: 'emergency',
                contact: { name: "City General", phone: "+91 98765 43210", email: "emergency@cityhosp.org" }
            });
        }, 3000);
        return () => clearTimeout(timer);
    }, [addNotification]);

    return (
        <div style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        }}>
            {notifications.map(n => (
                <div key={n.id} style={{
                    backgroundColor: 'white',
                    color: 'var(--color-text)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    minWidth: '320px',
                    maxWidth: '400px',
                    animation: n.urgency === 'emergency' ? 'emergencySlideIn 0.3s ease-out, emergencyPulse 1.5s infinite' : 'slideIn 0.3s ease-out',
                    borderLeft: `6px solid ${n.urgency === 'emergency' ? '#ef4444' : n.type === 'alert' ? '#f59e0b' : n.type === 'success' ? '#10b981' : '#3b82f6'}`,
                    border: n.urgency === 'emergency' ? '2px solid #fee2e2' : 'none',
                    position: 'relative'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {n.urgency === 'emergency' ? <AlertCircle size={24} color="#ef4444" fill="#fee2e2" /> :
                            n.type === 'alert' ? <AlertCircle size={20} color="#f59e0b" /> :
                                n.type === 'success' ? <CheckCircle size={20} color="#10b981" /> :
                                    <Bell size={20} color="#3b82f6" />}

                        <span style={{
                            flex: 1,
                            fontSize: '0.95rem',
                            fontWeight: n.urgency === 'emergency' ? 'bold' : '500',
                            color: n.urgency === 'emergency' ? '#991b1b' : 'inherit'
                        }}>
                            {n.message}
                        </span>

                        <button
                            onClick={() => removeNotification(n.id)}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af' }}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {n.contact && (
                        <div style={{
                            marginTop: '0.5rem',
                            padding: '0.75rem',
                            backgroundColor: '#f8fafc',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.85rem'
                        }}>
                            <div style={{ fontWeight: 'bold', color: '#475569', marginBottom: '0.25rem' }}>Contact: {n.contact.name}</div>
                            <div style={{ display: 'flex', gap: '1rem', color: '#64748b' }}>
                                <span>{n.contact.phone}</span>
                                <span>{n.contact.email}</span>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes emergencySlideIn {
                    from { transform: scale(0.9) translateX(20%); opacity: 0; }
                    to { transform: scale(1) translateX(0); opacity: 1; }
                }
                @keyframes emergencyPulse {
                    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                }
            `}</style>
        </div>
    );
};

export default NotificationSystem;
