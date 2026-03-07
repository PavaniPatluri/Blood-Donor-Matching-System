from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Dict
import uuid

app = FastAPI(title="Blood Donor API")

DONORS = {
    "1001": {"id": "1001", "fullName": "Sarah J.", "age": 28, "bloodType": "O-", "donations": 12},
}

@app.get("/match")
async def find_matches(blood_type: str):
    # Compatibility logic...
    return {"donors": list(DONORS.values())}

@app.post("/register")
async def register(donor: dict):
    donor_id = str(uuid.uuid4())[:8]
    donor['id'] = donor_id
    DONORS[donor_id] = donor
    return donor
