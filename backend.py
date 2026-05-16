from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import uuid

app = FastAPI(
    title="Blood Donor Matching System API",
    description="A comprehensive backend for blood donor management, rewards, and matching.",
    version="2.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---

class DonorUpdate(BaseModel):
    fullName: str
    age: int = Field(..., ge=18, le=65)
    bloodType: str
    weight: float = Field(..., ge=50)

class Donor(DonorUpdate):
    id: str
    donations: int = 0
    registered_at: datetime = Field(default_factory=datetime.now)

class MatchResponse(BaseModel):
    compatible_types: List[str]
    donors: List[Donor]

class RewardBadge(BaseModel):
    name: str
    active: bool
    description: str

class RewardStats(BaseModel):
    donor_name: str
    total_donations: int
    lives_impacted: int
    badges: List[RewardBadge]
    next_level: str

class Appointment(BaseModel):
    donor_id: str
    date: str
    slot: str
    location: str = "Central Blood Bank"

# --- Logic & Data ---

# In-memory storage (simulating a database)
DONORS: Dict[str, Donor] = {
    "1001": Donor(id="1001", fullName="Sarah J.", age=28, bloodType="O-", weight=62.5, donations=12),
    "1002": Donor(id="1002", fullName="Mike R.", age=34, bloodType="A+", weight=78.0, donations=10),
    "1003": Donor(id="1003", fullName="Elena Q.", age=25, bloodType="B+", weight=55.0, donations=8),
}

APPOINTMENTS: List[Appointment] = []

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

TIME_SLOTS = ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM']

def calculate_rewards(donor: Donor) -> RewardStats:
    total = donor.donations
    impact = total * 3
    
    badges = [
        RewardBadge(name="First Drop", active=total >= 1, description="First donation completed"),
        RewardBadge(name="Life Saver", active=total >= 3, description="Saved 9 lives"),
        RewardBadge(name="Regular", active=total >= 5, description="5 donations completed"),
        RewardBadge(name="Guardian", active=True, description="Registered as an active donor"),
    ]
    
    next_lvl = "Elite Donor" if total >= 5 else "Silver Donor"
    
    return RewardStats(
        donor_name=donor.fullName,
        total_donations=total,
        lives_impacted=impact,
        badges=badges,
        next_level=next_lvl
    )

# --- Endpoints ---

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Blood Donor System API v2",
        "status": "online",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/register", response_model=Donor)
async def register_donor(donor_data: DonorUpdate):
    donor_id = str(uuid.uuid4())[:8] # Short unique ID
    new_donor = Donor(id=donor_id, **donor_data.dict())
    DONORS[donor_id] = new_donor
    return new_donor

@app.get("/donors", response_model=List[Donor])
async def get_all_donors():
    return list(DONORS.values())

@app.get("/match", response_model=MatchResponse)
async def find_matches(blood_type: str = Query(..., description="Recipient's blood type")):
    if blood_type not in COMPATIBILITY:
        raise HTTPException(status_code=400, detail="Invalid blood type")
    
    compatible = COMPATIBILITY[blood_type]
    matches = [d for d in DONORS.values() if d.bloodType in compatible]
    
    return MatchResponse(compatible_types=compatible, donors=matches)

@app.get("/rewards/{donor_id}", response_model=RewardStats)
async def get_donor_rewards(donor_id: str):
    if donor_id not in DONORS:
        raise HTTPException(status_code=404, detail="Donor not found")
    
    return calculate_rewards(DONORS[donor_id])

@app.get("/appointments/slots")
async def get_slots():
    return {"location": "Central Blood Bank", "available_slots": TIME_SLOTS}

@app.post("/appointments/book")
async def book_appointment(appt: Appointment):
    if appt.donor_id not in DONORS:
        raise HTTPException(status_code=404, detail="Donor not found")
    
    APPOINTMENTS.append(appt)
    return {"message": "Appointment booked successfully", "details": appt}

if __name__ == "__main__":
    print("Starting Consolidated Blood Donor Backend...")
    print("URL: http://localhost:8000")
    print("Docs: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
