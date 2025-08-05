#!/bin/bash
# 🚀 ONE-CLICK SERVER DEPLOYMENT
# Usage: curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash

set -e

REPO_URL="${1:-https://github.com/your-repo/claude-fast.git}"
BRANCH="${2:-main}"
DEPLOY_DIR="${3:-./claude-fast-deployment}"

echo "🚀 ONE-CLICK DEPLOYMENT STARTING..."
echo "📡 Repository: $REPO_URL"
echo "🌿 Branch: $BRANCH"
echo "📁 Directory: $DEPLOY_DIR"

# Clone repository
if [ -d "$DEPLOY_DIR" ]; then
    echo "📁 Directory exists, pulling latest changes..."
    cd "$DEPLOY_DIR"
    git pull origin "$BRANCH"
else
    echo "📥 Cloning repository..."
    git clone -b "$BRANCH" "$REPO_URL" "$DEPLOY_DIR"
    cd "$DEPLOY_DIR"
fi

# Run deployment
if [ -f "DEPLOY.sh" ]; then
    echo "🚀 Running deployment script..."
    bash DEPLOY.sh
else
    echo "⚡ Running recovery system..."
    bash .recovery/scripts/reanimate.sh
fi

echo "🎉 DEPLOYMENT COMPLETE!"
echo "🔧 Next steps:"
echo "  1. Test: npm run dev"
echo "  2. Health check: python3 .recovery/scripts/health_check.py"
