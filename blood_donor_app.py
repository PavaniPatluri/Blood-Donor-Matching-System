import streamlit as st
import pandas as pd
import uuid
from datetime import datetime

# ==========================================
# 1. CORE LOGIC (Formerly Backend)
# ==========================================

# Mock Database & Constants (Stored in Session State for persistence)
if 'donors' not in st.session_state:
    st.session_state.donors = {
        "1001": {"id": "1001", "fullName": "Sarah J.", "age": 28, "bloodType": "O-", "weight": 62.5, "donations": 12},
        "1002": {"id": "1002", "fullName": "Mike R.", "age": 34, "bloodType": "A+", "weight": 78.0, "donations": 10},
    }

if 'appointments' not in st.session_state:
    st.session_state.appointments = []

COMPATIBILITY = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['AB-', 'A-', 'B-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-']
}

def register_donor(name, age, blood_type, weight):
    donor_id = str(uuid.uuid4())[:8]
    st.session_state.donors[donor_id] = {
        "id": donor_id,
        "fullName": name,
        "age": age,
        "bloodType": blood_type,
        "weight": weight,
        "donations": 0
    }
    return donor_id

def find_matches(blood_type):
    compatible_types = COMPATIBILITY.get(blood_type, [blood_type, 'O-'])
    matches = [d for d in st.session_state.donors.values() if d['bloodType'] in compatible_types]
    return compatible_types, matches

# ==========================================
# 2. UI CONFIGURATION & STYLING
# ==========================================

st.set_page_config(page_title="Life Drop | Blood Donor System", page_icon="🩸", layout="wide")

st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
    
    html, body, [class*="css"] { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Playfair Display', serif !important; font-weight: 800 !important; }
    
    .premium-card {
        background-color: white;
        padding: 2.5rem;
        border-radius: 24px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.05);
        border: 1px solid #f1f5f9;
        margin-bottom: 2rem;
    }
    
    .hero-title { font-size: 3.5rem !important; line-height: 1.1 !important; color: #111827; margin-bottom: 0.5rem !important; }
    .hero-red { color: #ef4444; font-size: 3.5rem !important; font-weight: 800; margin-top: -10px; display: block; }
</style>
""", unsafe_allow_html=True)

# ==========================================
# 3. SIDEBAR NAVIGATION
# ==========================================

with st.sidebar:
    st.markdown("""
        <div style='display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem;'>
            <div style='background-color: #ef4444; padding: 0.5rem; border-radius: 12px;'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h2 style='margin: 0; font-size: 1.5rem;'>Life Drop</h2>
        </div>
    """, unsafe_allow_html=True)
    
    nav = st.radio("Navigation", ["Dashboard", "Find a Donor", "Register", "Impact & Rewards", "Diet Guide"], label_visibility="collapsed")
    st.divider()
    st.caption("© 2026 Life Drop Unified Stack")

# ==========================================
# 4. MAIN CONTENT ROUTER
# ==========================================

if nav == "Dashboard":
    col1, col2 = st.columns([1.2, 0.8])
    with col1:
        st.markdown('<h1 class="hero-title">Medical</h1><h1 class="hero-red">Precision.</h1>', unsafe_allow_html=True)
        st.write("A unified high-performance network connecting donors with immediate life-saving matches.")
        st.divider()
        st.markdown("### ⚡ Live Activity")
        st.info("✅ O- Match found for City General Hospital")
        st.info("👤 3 New donors registered in your area today")
    with col2:
        st.markdown("### 🏥 Regional Supply Map")
        st.map(pd.DataFrame({'lat': [19.076, 18.92], 'lon': [72.877, 72.83]}))
    
    st.divider()
    st.markdown("### 🩸 Compatibility Quick-View")
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Universal Donor", "O-")
    c2.metric("Universal Recipient", "AB+")
    c3.metric("Critical Demand", "A-")
    c4.metric("Live Matches", len(st.session_state.donors))

elif nav == "Find a Donor":
    st.title("Find a Donor Instantly")
    bt = st.selectbox("Select Recipient Blood Type", ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    
    if st.button("🔍 Find Compatible Donors", use_container_width=True):
        compat_types, matches = find_matches(bt)
        st.success(f"Compatible with: {', '.join(compat_types)}")
        
        if matches:
            for d in matches:
                with st.expander(f"🩸 {d['fullName']} ({d['bloodType']})"):
                    st.write(f"**Donor ID:** #BD-{d['id']} | **Age:** {d['age']}")
                    if st.button(f"Request Donation from {d['fullName']}", key=d['id']):
                        st.balloons()
                        st.success("Request sent to donor!")
        else:
            st.warning("No donors currently available for this type.")

elif nav == "Register":
    st.title("Join the Life-Saving Network")
    with st.form("reg_form"):
        name = st.text_input("Full Name", placeholder="e.g. John Doe")
        age = st.number_input("Age", 18, 65, 25)
        blood = st.selectbox("Blood Type", ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        weight = st.number_input("Weight (kg)", 50.0, 150.0, 70.0)
        submit = st.form_submit_button("Register Now")
        
        if submit:
            if not name:
                st.error("Please enter your name.")
            else:
                new_id = register_donor(name, age, blood, weight)
                st.success(f"Welcome, {name}! Your Donor ID is #BD-{new_id}")
                st.balloons()

elif nav == "Impact & Rewards":
    st.title("Your Impact & Rewards")
    donor_id = st.text_input("Enter Donor ID", value="1001")
    if donor_id in st.session_state.donors:
        d = st.session_state.donors[donor_id]
        st.markdown(f"### Welcome back, {d['fullName']}!")
        k1, k2, k3 = st.columns(3)
        k1.metric("Donations", d['donations'])
        k2.metric("Lives Saved", d['donations'] * 3)
        k3.metric("Type", d['bloodType'])
        
        st.markdown("### Achievements")
        cols = st.columns(4)
        badges = [("First Drop", d['donations'] >= 1), ("Life Saver", d['donations'] >= 5), ("Hero", d['donations'] >= 10), ("Guardian", True)]
        for i, (b_name, active) in enumerate(badges):
            with cols[i]:
                st.markdown(f"""
                    <div style='text-align: center; padding: 1.5rem; border: 1px solid {"#ef4444" if active else "#eee"}; border-radius: 20px; background: {"#fee2e2" if active else "white"}; opacity: {1 if active else 0.4};'>
                        <div style='font-size: 2rem;'>{"🏆" if active else "🔒"}</div>
                        <div style='font-weight: bold;'>{b_name}</div>
                    </div>
                """, unsafe_allow_html=True)
    else:
        st.warning("Donor ID not found. Use 1001 or 1002 to test.")

elif nav == "Diet Guide":
    st.title("The Ultimate Donor Diet Guide")
    st.write("Fuel correctly to save lives efficiently.")
    d1, d2, d3 = st.columns(3)
    with d1:
        st.markdown('<div class="premium-card"><h4 style="color:#3b82f6">Pre-Donation</h4>💧 Hydrate<br>🥩 Iron Rich<br>🍊 Vitamin C</div>', unsafe_allow_html=True)
    with d2:
        st.markdown('<div class="premium-card"><h4 style="color:#10b981">Recovery</h4>🥤 Fluids<br>🥚 Protein<br>🛌 Rest</div>', unsafe_allow_html=True)
    with d3:
        st.markdown('<div class="premium-card"><h4 style="color:#ef4444">Red Flags</h4>☕ Caffeine<br>🍔 Fatty Foods<br>🍺 Alcohol</div>', unsafe_allow_html=True)
