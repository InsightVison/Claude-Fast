#!/bin/bash

# Claude Fast - Lightning AI Deployment Script
echo "🚀 Deploying Claude Fast to Lightning AI..."

# Check if Lightning CLI is installed
if ! command -v lightning &> /dev/null; then
    echo "📦 Installing Lightning AI CLI..."
    pip install lightning
fi

# Login to Lightning AI (if not already logged in)
echo "🔐 Please ensure you're logged in to Lightning AI"
echo "Run: lightning login"
read -p "Press Enter when logged in..."

# Deploy the app
echo "⚡ Deploying to Lightning AI..."
lightning run app lightning_app.py --cloud

echo "✅ Deployment initiated! Check your Lightning AI dashboard for status."
echo "🌐 Your app will be available at the provided Lightning AI URL."
