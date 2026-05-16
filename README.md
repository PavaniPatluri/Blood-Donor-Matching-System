# 🩸 Blood Donor Matching System

A premium, interactive blood donor matching system with real-time matching, digital identity cards, rewards, and emergency alerts.

## 🚀 Quick Start Links

### 🏷️ Digital ID & Registration (Recommended)
This is the primary user interface where donors register and receive their premium Digital ID cards.
- **Link**: [http://localhost:5173/#register](http://localhost:5173/#register)
- **View ID**: [http://localhost:5173/#rewards](http://localhost:5173/#rewards)

### 📊 Unified Data Dashboard
A high-level view of the system's data and compatibility metrics.
- **Link**: [http://localhost:8501](http://localhost:8501)

### ⚙️ Backend API Documentation
Interactive Swagger documentation for the FastAPI backend.
- **Link**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠️ How to Run the System

### 1. Start Everything (One Command)
Run the following in the project root:
```bash
python run.py
```
*This will launch the Vite frontend and ensure all dependencies are ready.*

### 2. Start Backend & Unified App
If you need the data engine and unified view:
- **Backend**: `python backend.py`
- **Unified App**: `streamlit run app.py`

---

## 📂 Project Structure
- `src/`: React source code (Digital ID, Matching, Maps)
- `backend.py`: Python (FastAPI) backend services
- `app.py`: Consolidated Streamlit application
- `run.py`: Automation script for development
- `blood_donor_app.py`: Legacy unified script (for reference)

## 📍 System Location
`C:\Users\pavani\.gemini\antigravity\playground\white-cluster\blood-donor-system\`

© 2026 Life Drop Network | Saving Lives with Precision.
