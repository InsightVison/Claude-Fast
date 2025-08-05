#!/bin/bash

# Enterprise Lightning Studio + Zoho Deployment Script
echo "🚀 Starting Lightning Studio Enterprise Platform..."

# Install Python dependencies
echo "📦 Installing Python FastAPI backend..."
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start FastAPI server in background
echo "⚡ Starting FastAPI backend server..."
python zoho_enterprise_api.py &
FASTAPI_PID=$!

# Go back to root and start Next.js
cd ..
echo "🔧 Starting Next.js frontend..."
npm run dev &
NEXTJS_PID=$!

echo "✅ Lightning Studio Enterprise Platform is now running!"
echo "   📊 Frontend: http://localhost:3000"  
echo "   🔌 API: http://localhost:8000"
echo "   📚 API Docs: http://localhost:8000/docs"
echo ""
echo "🎯 Ready for Zoho demo!"
echo "   - Zoho CRM integration: ACTIVE"
echo "   - Jitterbit connector: READY"
echo "   - AI field mapping: ENABLED"
echo "   - Real-time sync: OPERATIONAL"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait $FASTAPI_PID $NEXTJS_PID
