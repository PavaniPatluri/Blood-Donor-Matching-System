import streamlit as st
import pandas as pd
import time
from datetime import datetime
import requests
import uuid

# --- Page Configuration ---
st.set_page_config(
    page_title="Life Drop | Blood Donor Matching System",
    page_icon="🩸",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- Premium Custom CSS ---
st.markdown("""
<style>
    /* Global Styles */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
    
    :root {
        --color-primary: #ef4444;
        --color-primary-dark: #dc2626;
        --color-bg: #fdf2f2;
    }
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    
    h1, h2, h3 {
        font-family: 'Playfair Display', serif !important;
        font-weight: 800 !important;
    }
    
    /* Hero Section */
    .hero-container {
        padding: 4rem 0;
        text-align: left;
    }
    
    .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background-color: rgba(239, 68, 68, 0.08);
        color: #ef4444;
        padding: 0.6rem 1.25rem;
        border-radius: 99px;
        font-size: 0.9rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        border: 1px solid rgba(239, 68, 68, 0.1);
    }
    
    .hero-title {
        font-size: 4rem !important;
        line-height: 1.1 !important;
        margin-bottom: 1.5rem !important;
        color: #111827;
    }
    
    .hero-gradient-text {
        background: linear-gradient(to right, #ef4444, #f87171);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    /* Sidebar Customization */
    [data-testid="stSidebar"] {
        background-color: #ffffff;
        border-right: 1px solid #eee;
    }
    
    /* Card Styles */
    .premium-card {
        background-color: white;
        padding: 2.5rem;
        border-radius: 24px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.05);
        border: 1px solid #f1f5f9;
        margin-bottom: 2rem;
    }
    
    /* Buttons */
    .stButton>button {
        background-color: #ef4444 !important;
        color: white !important;
        border-radius: 12px !important;
        border: none !important;
        padding: 0.75rem 2rem !important;
        font-weight: bold !important;
        transition: all 0.3s ease !important;
    }
    
    .stButton>button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.4);
    }
</style>
""", unsafe_allow_html=True)

# --- State Management ---
if 'is_emergency' not in st.session_state:
    st.session_state.is_emergency = False

# --- Sidebar Navigation ---
with st.sidebar:
    st.markdown("""
        <div style='display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem;'>
            <div style='background-color: #ef4444; padding: 0.5rem; border-radius: 12px;'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h2 style='margin: 0; font-size: 1.5rem;'>Life Drop</h2>
        </div>
    """, unsafe_allow_html=True)
    
    nav_option = st.radio(
        "Navigation",
        ["Dashboard", "Find a Donor", "Register as Donor", "Rewards & Impact", "Diet Guide", "Health Tips"],
        label_visibility="collapsed"
    )
    
    st.divider()
    
    if st.button("🚨 " + ("DISABLE EMERGENCY" if st.session_state.is_emergency else "REPORT EMERGENCY")):
        st.session_state.is_emergency = not st.session_state.is_emergency
        st.rerun()

# --- Emergency Banner ---
if st.session_state.is_emergency:
    st.error("🚨 **EMERGENCY MODE ACTIVATED**: High demand for O- and A+ at City General Hospital.")

# --- Main Content Router ---
if nav_option == "Dashboard":
    # Hero Section
    col1, col2 = st.columns([1.2, 0.8])
    
    with col1:
        st.markdown("""
            <div class="hero-container">
                <div class="hero-badge">
                    <span style="width: 8px; height: 8px; background-color: #ef4444; border-radius: 50%;"></span>
                    SYSTEM ACTIVE & SYNCED
                </div>
                <h1 class="hero-title">
                    Blood Donor<br>Matching System:<br>
                    <span class="hero-gradient-text">Medical Precision</span>
                </h1>
                <p style="font-size: 1.2rem; color: #4b5563; line-height: 1.6; margin-bottom: 2rem;">
                    A high-performance network connecting urgent donor requirements with immediate life-saving matches. <b>Real-time. Reliable. Relentless.</b>
                </p>
            </div>
        """, unsafe_allow_html=True)
        if st.button("Find a Donor", key="hero_btn"):
            pass # Navigation logic here
            
    with col2:
        st.markdown("""
            <div style='background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%); border-radius: 40px; padding: 4rem; text-align: center; border: 1px solid #fee2e2; margin-top: 2rem;'>
                <div style='background-color: white; width: 150px; height: 150px; border-radius: 30px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(239, 68, 68, 0.15); margin: 0 auto;'>
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="#ef4444"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <div style='margin-top: 2rem; font-weight: 800; color: #111827; letter-spacing: 0.2em;'>LIVE READY</div>
            </div>
        """, unsafe_allow_html=True)

    # Info Cards
    st.markdown("### Why Match Matters")
    i1, i2, i3 = st.columns(3)
    with i1:
        st.info("**The Challenge**: Efficiently matching donors is critical to save lives.")
    with i2:
        st.success("**Our Solution**: Automated matching based on compatibility and proximity.")
    with i3:
        st.warning("**The Impact**: Faster response and optimized resource management.")

    st.divider()
    
    # Blood Compatibility Chart
    st.markdown("### 🩸 Blood Compatibility Chart")
    with st.container():
        st.markdown("""
            <div style='background-color: white; padding: 2rem; border-radius: 20px; border: 1px solid #eee; margin-bottom: 2rem;'>
                <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;'>
                    <div style='padding: 1rem; border: 1px solid #fee2e2; border-radius: 12px; text-align: center;'>
                        <strong style='color: #ef4444; font-size: 1.2rem;'>O-</strong><br>
                        <span style='font-size: 0.8rem;'>Universal Donor</span>
                    </div>
                    <div style='padding: 1rem; border: 1px solid #e0f2fe; border-radius: 12px; text-align: center;'>
                        <strong style='color: #3b82f6; font-size: 1.2rem;'>AB+</strong><br>
                        <span style='font-size: 0.8rem;'>Universal Recipient</span>
                    </div>
                    <div style='padding: 1rem; border: 1px solid #f1f5f9; border-radius: 12px; text-align: center;'>
                        <strong style='color: #111827; font-size: 1.2rem;'>A+</strong><br>
                        <span style='font-size: 0.8rem;'>Receives A+, A-, O+, O-</span>
                    </div>
                    <div style='padding: 1rem; border: 1px solid #f1f5f9; border-radius: 12px; text-align: center;'>
                        <strong style='color: #111827; font-size: 1.2rem;'>B+</strong><br>
                        <span style='font-size: 0.8rem;'>Receives B+, B-, O+, O-</span>
                    </div>
                </div>
            </div>
        """, unsafe_allow_html=True)

    st.divider()
    col_a, col_b = st.columns([1, 1])
    
    with col_a:
        st.markdown("### ⚡ Live Activity Feed")
        activities = [
            {"icon": "👤", "text": "New donor registered in Mumbai", "time": "Just now"},
            {"icon": "🩸", "text": "O- Match found for City Hospital", "time": "2m ago"},
            {"icon": "✅", "text": "Donation completed in Delhi", "time": "15m ago"}
        ]
        for act in activities:
            st.markdown(f"""
                <div style='display: flex; gap: 1rem; padding: 1rem; background: rgba(0,0,0,0.02); border-radius: 12px; margin-bottom: 0.5rem;'>
                    <div style='font-size: 1.5rem;'>{act["icon"]}</div>
                    <div>
                        <div style='font-size: 0.9rem; font-weight: 600;'>{act["text"]}</div>
                        <div style='font-size: 0.7rem; color: #666;'>{act["time"]}</div>
                    </div>
                </div>
            """, unsafe_allow_html=True)

    with col_b:
        st.markdown("### 🏥 Regional Supply Map")
        map_data = pd.DataFrame({
            'lat': [19.0760, 12.9716, 17.3850, 28.6139],
            'lon': [72.8777, 77.5946, 78.4867, 77.2090],
            'name': ['Mumbai Hospital', 'Bangalore Bank', 'Hyderabad Clinic', 'Delhi Center']
        })
        st.map(map_data)

elif nav_option == "Find a Donor":
    st.markdown("""
        <div style='text-align: center; margin-bottom: 3rem;'>
            <h2 style='font-size: 3rem;'>Find a Donor Instantly</h2>
            <p style='color: #666;'>Select blood type to find compatible donors nearby.</p>
        </div>
    """, unsafe_allow_html=True)
    
    with st.container():
        col1, col2 = st.columns([2, 1])
        with col1:
            blood_type_match = st.selectbox("Recipient's Blood Type", ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], key="match_bt_select")
            if st.button("🔍 Find Match", use_container_width=True):
                try:
                    res = requests.get(f"http://localhost:8000/match?blood_type={requests.utils.quote(blood_type_match)}")
                    if res.status_code == 200:
                        data = res.json()
                        st.session_state.last_matches = data
                        st.success(f"Found {len(data['donors'])} compatible donors!")
                    else:
                        st.error("No matches found or invalid query.")
                except Exception as e:
                    st.error(f"Connection Error: {e}")
        
        if 'last_matches' in st.session_state:
            st.markdown("### Matching Results")
            st.write(f"**Compatible Types:** {', '.join(st.session_state.last_matches['compatible_types'])}")
            
            non_empty_matches = st.session_state.last_matches['donors']
            if non_empty_matches:
                for donor in non_empty_matches:
                    with st.expander(f"🩸 {donor['fullName']} ({donor['bloodType']})"):
                        st.write(f"**Age:** {donor['age']}")
                        st.write(f"**Donations:** {donor['donations']}")
                        st.button(f"Contact {donor['fullName']}", key=f"contact_{donor['id']}")
            else:
                st.warning("No donors currently available for this type.")
    st.divider()
    
    # Appointment Booking
    st.markdown("### 📅 Book an Appointment")
    with st.form("appointment_form"):
        donor_id = st.text_input("Donor ID", value="1001")
        appt_date = st.date_input("Preferred Date")
        appt_slot = st.selectbox("Preferred Time Slot", ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"])
        
        book_btn = st.form_submit_button("Confirm Booking")
        if book_btn:
            try:
                payload = {
                    "donor_id": donor_id,
                    "date": str(appt_date),
                    "slot": appt_slot
                }
                res = requests.post("http://localhost:8000/appointments/book", json=payload)
                if res.status_code == 200:
                    st.success(f"Appointment booked for {appt_date} at {appt_slot}!")
                    st.balloons()
                else:
                    st.error("Booking failed. Please verify Donor ID.")
            except Exception as e:
                st.error(f"Connection Error: {e}")

elif nav_option == "Diet Guide":
    st.markdown("""
        <div style='text-align: center; margin-bottom: 3rem;'>
            <h2 style='font-size: 3rem;'>The Ultimate Donor Diet Guide</h2>
            <p style='color: #666;'>Fuel your body correctly to ensure a rapid recovery and peak donation quality.</p>
        </div>
    """, unsafe_allow_html=True)
    
    d1, d2, d3 = st.columns(3)
    with d1:
        st.markdown("""
            <div class="premium-card">
                <h4 style="color: #3b82f6;">Pre-Donation Fuel</h4>
                <ul style="list-style: none; padding: 0;">
                    <li>💧 <b>Hydrate:</b> 500ml water before.</li>
                    <li>🥩 <b>Iron:</b> Spinach, beans, or lean meat.</li>
                    <li>🍊 <b>Vitamin C:</b> Helps absorption.</li>
                </ul>
            </div>
        """, unsafe_allow_html=True)
    with d2:
        st.markdown("""
            <div class="premium-card">
                <h4 style="color: #10b981;">Recovery Phase</h4>
                <ul style="list-style: none; padding: 0;">
                    <li>🥤 <b>Fluids:</b> Keep drinking for 24h.</li>
                    <li>🥚 <b>Protein:</b> Build new cells.</li>
                    <li>🛌 <b>Rest:</b> No heavy lifting.</li>
                </ul>
            </div>
        """, unsafe_allow_html=True)
    with d3:
        st.markdown("""
            <div class="premium-card">
                <h4 style="color: #ef4444;">Donor Red Flags</h4>
                <ul style="list-style: none; padding: 0;">
                    <li>☕ <b>Caffeine:</b> Causes dehydration.</li>
                    <li>🍔 <b>Fatty Foods:</b> Affects test accuracy.</li>
                    <li>🍺 <b>Alcohol:</b> Avoid 24h before/after.</li>
                </ul>
            </div>
        """, unsafe_allow_html=True)

elif nav_option == "Rewards & Impact":
    st.markdown("""
        <div style='text-align: center; margin-bottom: 3rem;'>
            <h2 style='font-size: 3rem;'>Your Impact & Rewards</h2>
            <p style='color: #666;'>Track your donations and earn badges for saving lives.</p>
        </div>
    """, unsafe_allow_html=True)
    
    donor_id = st.text_input("Enter your Donor ID to view rewards", value="1001")
    if st.button("View My Rewards"):
        try:
            res = requests.get(f"http://localhost:8000/rewards/{donor_id}")
            if res.status_code == 200:
                data = res.json()
                st.markdown(f"### Welcome back, {data['donor_name']}!")
                
                c1, c2, c3 = st.columns(3)
                c1.metric("Donations", data['total_donations'])
                c2.metric("Lives Impacted", data['lives_impacted'])
                c3.metric("Rank", data['next_level'])
                
                st.markdown("### Achievement Gallery")
                cols = st.columns(4)
                for i, badge in enumerate(data['badges']):
                    with cols[i % 4]:
                        st.markdown(f"""
                            <div style='text-align: center; padding: 1rem; border: 1px solid {"#ef4444" if badge["active"] else "#eee"}; border-radius: 15px; background: {"#fee2e2" if badge["active"] else "white"}; opacity: {1 if badge["active"] else 0.5};'>
                                <div style='font-size: 2rem;'>{"🏆" if badge["active"] else "🔒"}</div>
                                <div style='font-weight: bold; font-size: 0.9rem;'>{badge["name"]}</div>
                                <div style='font-size: 0.7rem;'>{badge["description"]}</div>
                            </div>
                        """, unsafe_allow_html=True)
            else:
                st.error("Donor ID not found.")
        except Exception as e:
            st.error(f"Connection Error: {e}")

elif nav_option == "Health Tips":
    st.markdown("""
        <div style='text-align: center; margin-bottom: 3rem;'>
            <h2 style='font-size: 3rem;'>Donor Health & Motivation</h2>
            <p style='color: #666;'>Stay fit, stay ready. Your health is the foundation of our system.</p>
        </div>
    """, unsafe_allow_html=True)
    
    st.markdown("### Essential Tips")
    t1, t2, t3 = st.columns(3)
    t1.info("💧 **Hydration**: Drink 8-10 glasses of water daily.")
    t2.success("🥩 **Iron**: Maintain healthy iron levels with a balanced diet.")
    t3.warning("🛌 **Rest**: Ensure 7-8 hours of sleep before donation.")
    
    st.markdown("""
        <div style='background-color: #1f2937; padding: 4.5rem 2rem; border-radius: 30px; text-align: center; color: white; margin-top: 3rem;'>
            <p style='font-size: 1.75rem; font-style: italic; font-weight: 300; margin-bottom: 1.5rem;'>
                "To the world you may be one person, but to one person you may be the world."
            </p>
            <div style='font-weight: bold; color: #ef4444; letter-spacing: 0.1em;'>BE A LIFESAVER</div>
        </div>
    """, unsafe_allow_html=True)

elif nav_option == "Register as Donor":
    st.markdown("""
        <div style='text-align: center; margin-bottom: 3rem;'>
            <h2 style='font-size: 3rem;'>Donor Registration</h2>
            <p style='color: #666;'>Join our life-saving community today. Registry is fast and secure.</p>
        </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        with st.form("registration_form"):
            st.markdown("### Registration Form")
            full_name = st.text_input("Full Name", placeholder="e.g. John Doe")
            age = st.number_input("Age", min_value=18, max_value=65, value=25)
            blood_type = st.selectbox("Blood Type", ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
            weight = st.number_input("Weight (kg)", min_value=50.0, max_value=200.0, value=70.0)
            
            submit_btn = st.form_submit_button("Submit Registration")
            
            if submit_btn:
                if not full_name:
                    st.error("Please enter your full name.")
                else:
                    # Send to Backend
                    try:
                        payload = {
                            "fullName": full_name,
                            "age": age,
                            "bloodType": blood_type,
                            "weight": weight
                        }
                        response = requests.post("http://localhost:8000/register", json=payload)
                        if response.status_code == 200:
                            data = response.json()
                            st.success(f"Registration Successful! Your Donor ID is #BD-{data['id']}")
                            # Store in session state for history
                            if 'history' not in st.session_state:
                                st.session_state.history = []
                            st.session_state.history.insert(0, {
                                "id": data['id'],
                                "fullName": full_name,
                                "bloodType": blood_type,
                                "weight": weight,
                                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M")
                            })
                        else:
                            st.error("Backend error. Please try again later.")
                    except Exception as e:
                        st.error(f"Connection Error: {e}")
                        
    with col2:
        st.markdown("### Why Register?")
        st.write("By registering, you become part of an elite emergency response network.")
        st.markdown("""
            - 🛡️ **Priority Access**: Be first to know when your blood type is needed.
            - 🏆 **Rewards**: Earn badges and points for every donation.
            - 🏥 **Health History**: Track your donation frequency and impact.
        """)
        
    st.divider()
    
    st.markdown("### Registration History")
    if 'history' in st.session_state and st.session_state.history:
        h_df = pd.DataFrame(st.session_state.history)
        st.table(h_df)
    else:
        st.info("No registration history found. Your local submissions will appear here.")

# --- Footer ---
st.markdown("---")
st.caption("© 2026 Life Drop Network | Powered by Python & Streamlit")
