"""
Lightning AI App Configuration for Claude Fast
Deploy your Next.js AI application on Lightning AI
"""

import lightning as L
from lightning.app.components import ServeGradio
import subprocess
import os

class NextJSComponent(L.LightningWork):
    def __init__(self, **kwargs):
        super().__init__(**kwargs, port=3000)
        
    def run(self):
        # Install Node.js dependencies
        subprocess.run(["npm", "install"], check=True)
        
        # Build the Next.js application
        subprocess.run(["npm", "run", "build"], check=True)
        
        # Start the Next.js server
        subprocess.run(["npm", "start"], check=False)

class ClaudeFastApp(L.LightningApp):
    def __init__(self):
        super().__init__()
        self.nextjs_app = NextJSComponent(
            cloud_compute=L.CloudCompute("cpu-small", disk_size=20)
        )
        
    def run(self):
        self.nextjs_app.run()

app = ClaudeFastApp()
