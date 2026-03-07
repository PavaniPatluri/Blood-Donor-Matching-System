import subprocess
import os

def run_system():
    print("Launching Vite Development Server...")
    subprocess.run(["cmd", "/c", "npm run dev"], shell=True)

if __name__ == "__main__":
    run_system()
