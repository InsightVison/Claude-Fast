"""
Simplified Lightning AI Deployment for Claude Fast
Using Lightning's built-in web components
"""

import lightning as L
import subprocess
import os
import time

class ClaudeFastServer(L.LightningWork):
    def __init__(self, **kwargs):
        super().__init__(**kwargs, port=3000)
        
    def run(self):
        # Set environment variables
        os.environ["NODE_ENV"] = "production"
        os.environ["PORT"] = "3000"
        
        try:
            # Install dependencies
            print("📦 Installing dependencies...")
            subprocess.run(["npm", "ci"], check=True, cwd="/content")
            
            # Build the application
            print("🔨 Building application...")
            subprocess.run(["npm", "run", "build"], check=True, cwd="/content")
            
            # Start the server
            print("🚀 Starting server on port 3000...")
            subprocess.run(["npm", "start"], cwd="/content")
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Error: {e}")
            # Fallback to development mode
            print("🔄 Falling back to development mode...")
            subprocess.run(["npm", "run", "dev"], cwd="/content")

class ClaudeFastApp(L.LightningApp):
    def __init__(self):
        super().__init__()
        self.server = ClaudeFastServer(
            cloud_compute=L.CloudCompute("cpu-small"),
            cloud_build_config=L.CloudBuildConfig(
                ["apt-get update", 
                 "apt-get install -y nodejs npm",
                 "node --version",
                 "npm --version"]
            )
        )
        
    def run(self):
        self.server.run()

app = ClaudeFastApp()
