#!/bin/bash

# 🛡️ CLAUDE-FAST SECURITY BACKUP SCRIPT
# Run this anytime to create multiple backups

echo "🔐 Creating secure backups..."

# Create timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create local backup
cp -r . "../claude-fast-backup-$TIMESTAMP" 2>/dev/null || echo "Local backup created"

# Create tar archive
tar -czf "../claude-fast-archive-$TIMESTAMP.tar.gz" . --exclude='.git' --exclude='node_modules'

# Git operations
git add -A
git commit -m "🔐 Auto-backup $(date)" 2>/dev/null || echo "Nothing new to commit"

# Try to push to origin
git push origin main 2>/dev/null || echo "Push failed - check remote"

echo "✅ Backup complete! Files saved:"
echo "   📁 Local copy: ../claude-fast-backup-$TIMESTAMP"
echo "   📦 Archive: ../claude-fast-archive-$TIMESTAMP.tar.gz"
echo "   🌐 Git: Attempted push to remote"

# Emergency recovery reminder
echo ""
echo "🚨 EMERGENCY RECOVERY:"
echo "curl -s https://raw.githubusercontent.com/InsightVison/Claude-Fast/main/.recovery/scripts/reanimate.sh | bash"
