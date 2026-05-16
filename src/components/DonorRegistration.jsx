import React, { useState, useEffect } from 'react';
import { UserPlus, Heart, Check, X } from 'lucide-react';
import DonorCard from './DonorCard';

const DonorRegistration = () => {
    const [formData, setFormData] = useState(() => {
        try {
            const saved = localStorage.getItem('donorFormData');
            return saved ? JSON.parse(saved) : {
                fullName: '',
                age: '',
                bloodType: '',
                lastDonation: '',
                weight: ''
            };
        } catch (e) {
            console.error("Failed to parse donorFormData:", e);
            return {
                fullName: '',
                age: '',
                bloodType: '',
                lastDonation: '',
                weight: ''
            };
        }
    });

    const [submitted, setSubmitted] = useState(() => {
        return localStorage.getItem('donorSubmitted') === 'true';
    });
    const [errors, setErrors] = useState({});
    const [donorId, setDonorId] = useState(() => {
        const savedId = localStorage.getItem('donorId');
        if (savedId) return savedId;
        const newId = Math.floor(1000 + Math.random() * 9000); // 4 digit IDs for better look
        localStorage.setItem('donorId', newId);
        return newId;
    });

    // Listen for data resets
    useEffect(() => {
        const handleReset = () => {
            const isSubmitted = localStorage.getItem('donorSubmitted') === 'true';
            setSubmitted(isSubmitted);
            if (!isSubmitted) {
                setFormData({
                    fullName: '',
                    age: '',
                    bloodType: '',
                    lastDonation: '',
                    weight: ''
                });
            }
        };
        window.addEventListener('historyUpdated', handleReset);
        window.addEventListener('donationsUpdated', handleReset);
        return () => {
            window.removeEventListener('historyUpdated', handleReset);
            window.removeEventListener('donationsUpdated', handleReset);
        };
    }, []);

    const validate = () => {
        let tempErrors = {};
        if (!formData.fullName) tempErrors.fullName = "Name is required";
        if (!formData.age || formData.age < 18 || formData.age > 65) tempErrors.age = "Must be between 18-65 years";
        if (!formData.weight || formData.weight < 50) tempErrors.weight = "Minimum weight is 50kg";
        if (!formData.bloodType) tempErrors.bloodType = "Blood type is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            let registeredDonor;
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fullName: formData.fullName,
                        age: parseInt(formData.age),
                        bloodType: formData.bloodType,
                        weight: parseFloat(formData.weight)
                    })
                });

                if (response.ok) {
                    registeredDonor = await response.json();
                } else {
                    throw new Error('Backend responded with error');
                }
            } catch (error) {
                console.warn("Registration server unavailable, falling back to local registration.");
                // Fallback: Create a donor object locally
                registeredDonor = {
                    id: donorId,
                    fullName: formData.fullName,
                    age: parseInt(formData.age),
                    bloodType: formData.bloodType,
                    weight: parseFloat(formData.weight),
                    timestamp: new Date().toISOString()
                };
            }

            // Persistence logic (common for both server and local)
            setSubmitted(true);
            setDonorId(registeredDonor.id);
            localStorage.setItem('donorSubmitted', 'true');
            localStorage.setItem('donorFormData', JSON.stringify(formData));
            localStorage.setItem('donorId', registeredDonor.id);

            // Store in registration history
            const history = JSON.parse(localStorage.getItem('donorHistory') || '[]');
            history.unshift(registeredDonor);
            localStorage.setItem('donorHistory', JSON.stringify(history));

            // Notify other components
            window.dispatchEvent(new Event('donationsUpdated'));
            window.dispatchEvent(new Event('historyUpdated'));

            window.dispatchEvent(new CustomEvent('newNotification', {
                detail: {
                    message: `Registration Successful! ${registeredDonor.id ? 'ID: ' + registeredDonor.id : ''}`,
                    type: 'success'
                }
            }));
        }
    };

    const handleReset = () => {
        setSubmitted(false);
        localStorage.removeItem('donorSubmitted');
        localStorage.removeItem('donorFormData');
        localStorage.removeItem('donorId'); // Clear ID for new registration
        const newId = Math.floor(Math.random() * 10000);
        setDonorId(newId);
        localStorage.setItem('donorId', newId);
        setFormData({
            fullName: '',
            age: '',
            bloodType: '',
            lastDonation: '',
            weight: ''
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (submitted) {
        return (
            <div style={{
                padding: '3rem',
                textAlign: 'center',
                backgroundColor: '#f0fdf4',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--color-success)',
                animation: 'fadeIn 0.5s ease-out'
            }}>
                <div style={{ display: 'inline-block', padding: '1rem', borderRadius: '50%', backgroundColor: 'var(--color-success)', color: 'white', marginBottom: '1.5rem' }}>
                    <Heart size={48} fill="white" />
                </div>
                <h2 style={{ fontSize: '2rem', color: 'var(--color-success)', marginBottom: '1rem' }}>Welcome to the Community!</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text)' }}>
                    Thank you, <strong>{formData.fullName}</strong>. You are now a registered <strong>{formData.bloodType}</strong> donor.
                </p>
                <DonorCard donor={{ ...formData, id: donorId }} onClose={() => setSubmitted(false)} />
                <button
                    onClick={handleReset}
                    style={{
                        marginTop: '1rem',
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        background: 'none',
                        color: 'var(--color-success)',
                        textDecoration: 'underline',
                        fontSize: '1rem'
                    }}
                >
                    Register another donor
                </button>
            </div>
        );
    }

    return (
        <section id="register" style={{ padding: '4rem 0', backgroundColor: '#fff5f5' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Become a Donor</h2>
                    <p style={{ color: 'var(--color-text-light)' }}>
                        Join our network of heroes. Your registration could save a life tomorrow.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{
                    backgroundColor: 'white',
                    padding: '3rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={labelStyle}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                style={inputStyle(errors.fullName)}
                                placeholder="John Doe"
                            />
                            <UserPlus size={20} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        </div>
                        {errors.fullName && <p style={errorStyle}>{errors.fullName}</p>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={labelStyle}>Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                style={inputStyle(errors.age)}
                                placeholder="18-65"
                            />
                            {errors.age && <p style={errorStyle}>{errors.age}</p>}
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={labelStyle}>Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                style={inputStyle(errors.weight)}
                                placeholder="Min 50kg"
                            />
                            {errors.weight && <p style={errorStyle}>{errors.weight}</p>}
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={labelStyle}>Blood Type</label>
                        <select
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            style={inputStyle(errors.bloodType)}
                        >
                            <option value="">Select Type</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        {errors.bloodType && <p style={errorStyle}>{errors.bloodType}</p>}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" style={{
                            flex: 2,
                            padding: '1rem',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            boxShadow: 'var(--shadow-md)',
                            transition: 'background 0.2s'
                        }}
                            onMouseOver={(e) => e.target.style.backgroundColor = 'var(--color-primary-dark)'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
                        >
                            Register Now
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                backgroundColor: 'transparent',
                                color: '#666',
                                border: '1px solid #ddd',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#f3f4f6';
                                e.target.style.borderColor = '#ccc';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.borderColor = '#ddd';
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: 'var(--color-text)'
};

const inputStyle = (error) => ({
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: error ? '1px solid var(--color-danger)' : '1px solid #ddd',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    outline: 'none'
});

const errorStyle = {
    color: 'var(--color-danger)',
    fontSize: '0.85rem',
    marginTop: '0.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
};

export default DonorRegistration;
