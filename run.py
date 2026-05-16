import subprocess
import sys
import os

def run_system():
    print("Starting Blood Donor Matching System...")
    
    # Check for node_modules
    if not os.path.exists("node_modules"):
        print("Installing dependencies (npm install)...")
        try:
            subprocess.run(["npm", "install"], check=True, shell=True)
        except subprocess.CalledProcessError:
            print("Error: Could not install dependencies. Please ensure Node.js and npm are installed.")
            return

    # Run the development server
    print("Launching Vite Development Server...")
    try:
        # Using cmd /c for Windows to handle npm accurately
        subprocess.run(["cmd", "/c", "npm run dev"], shell=True)
    except KeyboardInterrupt:
        print("\nSystem stopped.")

if __name__ == "__main__":
    run_system()
