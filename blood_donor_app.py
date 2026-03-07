import streamlit as st
import pandas as pd
import uuid
from datetime import datetime

# ==========================================
# 1. CORE LOGIC
# ==========================================

if 'donors' not in st.session_state:
    st.session_state.donors = {
        "1001": {"id": "1001", "fullName": "Sarah J.", "age": 28, "bloodType": "O-", "weight": 62.5, "donations": 12},
        "1002": {"id": "1002", "fullName": "Mike R.", "age": 34, "bloodType": "A+", "weight": 78.0, "donations": 10},
    }

COMPATIBILITY = {
    'A+': ['A+', 'A-', 'O+', 'O-'], 'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'], 'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['AB-', 'A-', 'B-', 'O-'], 'O+': ['O+', 'O-'], 'O-': ['O-']
}

def register_donor(name, age, blood_type, weight):
    donor_id = str(uuid.uuid4())[:8]
    st.session_state.donors[donor_id] = {"id": donor_id, "fullName": name, "age": age, "bloodType": blood_type, "weight": weight, "donations": 0}
    return donor_id

# ==========================================
# 2. UI CONFIGURATION & STYLING
# ==========================================
st.set_page_config(page_title="Life Drop | Blood Donor System", page_icon="🩸", layout="wide")
st.markdown("<style>h1, h2, h3 { color: #ef4444; }</style>", unsafe_allow_html=True)

# ==========================================
# 3. MAIN APP ROUTER
# ==========================================
nav = st.sidebar.radio("Navigation", ["Dashboard", "Find a Donor", "Register", "Impact & Rewards"])

if nav == "Dashboard":
    st.title("Medical Precision.")
    st.write("Live Activity: O- Match found for City General Hospital")
    st.metric("Live Matches", len(st.session_state.donors))

elif nav == "Find a Donor":
    st.title("Find a Donor")
    bt = st.selectbox("Select Blood Type", list(COMPATIBILITY.keys()))
    if st.button("Search"):
        compat = COMPATIBILITY.get(bt, [])
        matches = [d for d in st.session_state.donors.values() if d['bloodType'] in compat]
        for d in matches: st.write(f"🩸 {d['fullName']} ({d['bloodType']})")

elif nav == "Register":
    st.title("Join the Network")
    with st.form("reg"):
        name = st.text_input("Full Name")
        age = st.number_input("Age", 18, 65)
        blood = st.selectbox("Blood Type", list(COMPATIBILITY.keys()))
        if st.form_submit_button("Register"):
            new_id = register_donor(name, age, blood, 70)
            st.success(f"Welcome {name}! ID: #BD-{new_id}")
