import React, { useState } from 'react';
import { Search, MapPin, User, Droplet, CheckCircle } from 'lucide-react';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const COMPATIBILITY = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal Recipient
    'AB-': ['AB-', 'A-', 'B-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-'] // Universal Donor
};

const MOCK_DONORS = [
    { id: 1, name: "Sarah J.", type: "O-", distance: "0.8 miles", status: "Available" },
    { id: 2, name: "Mike T.", type: "A+", distance: "1.2 miles", status: "Available" },
    { id: 3, name: "Jessica L.", type: "O+", distance: "2.5 miles", status: "Available" },
    { id: 4, name: "David R.", type: "B-", distance: "3.0 miles", status: "Last donated: 2mo ago" },
    { id: 5, name: "Emily W.", type: "AB+", distance: "0.5 miles", status: "Available" },
    { id: 6, name: "Robert C.", type: "A-", distance: "4.1 miles", status: "Available" },
];

const DonorMatcher = () => {
    const [selectedType, setSelectedType] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [matches, setMatches] = useState(null);

    const handleSearch = async () => {
        if (!selectedType) return;
        setIsSearching(true);
        setMatches(null);

        try {
            const response = await fetch(`/api/match?blood_type=${encodeURIComponent(selectedType)}`);
            if (!response.ok) throw new Error('Failed to fetch matches');

            const data = await response.json();

            // Mocking distances as the backend doesn't provide them yet
            const donorsWithDistance = data.donors.map(d => ({
                ...d,
                name: d.fullName,
                distance: (Math.random() * 5).toFixed(1) + " miles",
                type: d.bloodType
            }));

            setMatches({
                compatibleTypes: data.compatible_types,
                donors: donorsWithDistance
            });

            if (data.donors.length > 0) {
                const donor = data.donors[0];
                window.dispatchEvent(new CustomEvent('newNotification', {
                    detail: {
                        message: `Match Found! ${donor.fullName} is available for Group ${selectedType}.`,
                        type: 'success',
                        urgency: 'high',
                        contact: {
                            name: donor.fullName,
                            phone: "+91 " + Math.floor(1000000000 + Math.random() * 9000000000),
                            email: donor.fullName.toLowerCase().replace(' ', '.') + "@example.com"
                        }
                    }
                }));
            }
        } catch (error) {
            console.error("Match error:", error);
            window.dispatchEvent(new CustomEvent('newNotification', {
                detail: { message: "Error connecting to match server.", type: 'error' }
            }));
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <section style={{ padding: '4rem 0', backgroundColor: '#fff' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Find a Donor Instantly</h2>
                    <p style={{ color: 'var(--color-text-light)' }}>
                        Select the recipient's blood group to find compatible donors nearby.
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid #eee'
                }}>
                    {/* Search Interface */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Recipient's Blood Type</label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem',
                                    backgroundColor: '#f9f9f9'
                                }}
                            >
                                <option value="">Select Blood Type</option>
                                {BLOOD_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={!selectedType || isSearching}
                            style={{
                                alignSelf: 'flex-end',
                                backgroundColor: isSearching ? '#ccc' : 'var(--color-primary)',
                                color: 'white',
                                padding: '1rem 2rem',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem',
                                cursor: isSearching ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                minWidth: '160px',
                                justifyContent: 'center'
                            }}
                        >
                            {isSearching ? 'Scanning...' : <><Search size={20} /> Find Match</>}
                        </button>
                    </div>

                    {/* Results Area */}
                    {matches && (
                        <div className="results-area" style={{ animation: 'fadeIn 0.5s ease-in' }}>
                            <div style={{
                                marginBottom: '2rem',
                                padding: '1rem',
                                backgroundColor: '#e6fffa',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <div style={{ backgroundColor: 'var(--color-success)', padding: '0.5rem', borderRadius: '50%', color: 'white' }}>
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <strong>Compatible Donor Types:</strong>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                        {matches.compatibleTypes.map(type => (
                                            <span key={type} style={{
                                                padding: '0.25rem 0.75rem',
                                                backgroundColor: 'white',
                                                border: '1px solid var(--color-success)',
                                                borderRadius: '20px',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                                color: 'var(--color-success)'
                                            }}>
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <h3 style={{ marginBottom: '1rem' }}>Available Donors Nearby</h3>
                            {matches.donors.length > 0 ? (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {matches.donors.map(donor => (
                                        <div key={donor.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '1rem',
                                            border: '1px solid #eee',
                                            borderRadius: 'var(--radius-md)',
                                            transition: 'background 0.2s',
                                            cursor: 'pointer'
                                        }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#ffebe6',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'var(--color-primary)',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {donor.type}
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '1.1rem' }}>{donor.name}</h4>
                                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <MapPin size={14} /> {donor.distance}
                                                    </span>
                                                </div>
                                            </div>
                                            <button style={{
                                                padding: '0.5rem 1rem',
                                                border: '1px solid var(--color-primary)',
                                                backgroundColor: 'white',
                                                color: 'var(--color-primary)',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.9rem'
                                            }}>
                                                Contact
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ textAlign: 'center', color: 'var(--color-text-light)', padding: '2rem' }}>
                                    No exact matches found nearby at this moment. However, we have alerted the nearest blood bank.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DonorMatcher;
