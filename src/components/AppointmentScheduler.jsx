import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const AppointmentScheduler = () => {
    const [selectedDate, setSelectedDate] = useState(() => localStorage.getItem('apptDate') || '');
    const [selectedSlot, setSelectedSlot] = useState(() => localStorage.getItem('apptSlot') || '');
    const [booked, setBooked] = useState(() => localStorage.getItem('apptBooked') === 'true');

    const [availableSlots, setAvailableSlots] = useState([]);

    // Fetch slots from backend
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch('/api/appointments/slots');
                if (!response.ok) throw new Error('Failed to fetch slots');
                const data = await response.json();
                setAvailableSlots(data.available_slots);
            } catch (error) {
                console.error("Slots fetch error:", error);
                setAvailableSlots(['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM']); // Fallback
            }
        };
        fetchSlots();
    }, []);

    const handleBook = async () => {
        if (selectedDate && selectedSlot) {
            const donorId = localStorage.getItem('donorId') || '1001';
            try {
                const response = await fetch('/api/appointments/book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        donor_id: donorId,
                        date: selectedDate,
                        slot: selectedSlot,
                        location: "Central Blood Bank"
                    })
                });

                if (!response.ok) throw new Error('Booking failed');

                setBooked(true);
                localStorage.setItem('apptBooked', 'true');
                localStorage.setItem('apptDate', selectedDate);
                localStorage.setItem('apptSlot', selectedSlot);

                window.dispatchEvent(new CustomEvent('newNotification', {
                    detail: { message: `Appointment booked for ${selectedDate} at ${selectedSlot}`, type: 'success' }
                }));

                setTimeout(() => {
                    setBooked(false);
                    localStorage.removeItem('apptBooked');
                }, 10000);

            } catch (error) {
                console.error("Booking error:", error);
                window.dispatchEvent(new CustomEvent('newNotification', {
                    detail: { message: "Error connecting to booking server.", type: 'error' }
                }));
            }
        }
    };

    return (
        <section style={{ padding: '4rem 0', backgroundColor: '#fff' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Schedule Donation</h2>
                    <p style={{ color: 'var(--color-text-light)' }}>
                        Book a convenient time slot at your nearest center.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem',
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={20} /> Select Date
                        </h3>
                        <input
                            type="date"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ddd',
                                fontSize: '1rem'
                            }}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />

                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={20} /> Location
                            </h3>
                            <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: 'var(--radius-md)' }}>
                                <strong>Central Blood Bank</strong>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>123 Health Ave, Medical District</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={20} /> Available Slots
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {availableSlots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    style={{
                                        padding: '1rem',
                                        border: selectedSlot === slot ? '2px solid var(--color-primary)' : '1px solid #ddd',
                                        backgroundColor: selectedSlot === slot ? '#fff5f5' : 'white',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        fontWeight: selectedSlot === slot ? 'bold' : 'normal',
                                    }}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={!selectedDate || !selectedSlot}
                            onClick={handleBook}
                            style={{
                                width: '100%',
                                marginTop: '2rem',
                                padding: '1rem',
                                backgroundColor: booked ? 'var(--color-success)' : 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1.1rem',
                                cursor: (!selectedDate || !selectedSlot) ? 'not-allowed' : 'pointer',
                                opacity: (!selectedDate || !selectedSlot) ? 0.6 : 1
                            }}
                        >
                            {booked ? 'Appointment Confirmed!' : 'Confirm Booking'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppointmentScheduler;
