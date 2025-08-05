#!/bin/bash
# 💾 GOAT AI BACKUP PROTOCOL
# Never lose your precious code again!

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
BACKUP_DIR=".recovery/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="${1:-auto_backup_$TIMESTAMP}"
MAX_BACKUPS=10

echo -e "${BLUE}💾 INITIATING BACKUP PROTOCOL${NC}"
echo -e "${YELLOW}📦 Backup name: $BACKUP_NAME${NC}"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# What to backup
BACKUP_ITEMS=(
    "app/"
    "claude-to-cash/"
    "models/"
    "data/"
    "package.json"
    "package-lock.json"
    "next.config.js"
    "tailwind.config.js"
    "tsconfig.json"
    ".env.example"
    ".recovery/"
    "README.md"
)

# Create temporary staging area
STAGING_DIR="/tmp/goat_backup_$TIMESTAMP"
mkdir -p "$STAGING_DIR"

echo -e "${YELLOW}📋 Collecting files for backup...${NC}"

# Copy files to staging
for item in "${BACKUP_ITEMS[@]}"; do
    if [ -e "$item" ]; then
        echo -e "   ✅ Adding: $item"
        cp -r "$item" "$STAGING_DIR/" 2>/dev/null || echo -e "   ⚠️  Skipped: $item (permission/access issue)"
    else
        echo -e "   ⏭️  Skipped: $item (not found)"
    fi
done

# Add metadata
cat > "$STAGING_DIR/backup_metadata.json" << EOF
{
    "backup_name": "$BACKUP_NAME",
    "timestamp": "$TIMESTAMP",
    "date": "$(date)",
    "hostname": "$(hostname)",
    "user": "$(whoami)",
    "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'not-a-git-repo')",
    "git_branch": "$(git branch --show-current 2>/dev/null || echo 'not-a-git-repo')",
    "node_version": "$(node --version 2>/dev/null || echo 'not-installed')",
    "npm_version": "$(npm --version 2>/dev/null || echo 'not-installed')",
    "python_version": "$(python3 --version 2>/dev/null || echo 'not-installed')"
}
EOF

# Create the backup archive
echo -e "${YELLOW}🗜️  Creating backup archive...${NC}"
BACKUP_FILE="$BACKUP_DIR/${BACKUP_NAME}.tar.gz"

# Ensure backup directory exists with absolute path
mkdir -p "$(pwd)/$BACKUP_DIR"
BACKUP_FILE_FULL="$(pwd)/$BACKUP_DIR/${BACKUP_NAME}.tar.gz"

cd /tmp
tar -czf "$BACKUP_FILE_FULL" "goat_backup_$TIMESTAMP/"
cd - > /dev/null

# Clean up staging
rm -rf "$STAGING_DIR"

# Verify backup
if [ -f "$BACKUP_FILE_FULL" ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE_FULL" | cut -f1)
    echo -e "${GREEN}✅ Backup created successfully!${NC}"
    echo -e "${BLUE}📁 Location: $BACKUP_FILE_FULL${NC}"
    echo -e "${BLUE}📏 Size: $BACKUP_SIZE${NC}"
else
    echo -e "${RED}❌ Backup failed!${NC}"
    exit 1
fi

# Clean up old backups (keep only MAX_BACKUPS)
echo -e "${YELLOW}🧹 Cleaning up old backups...${NC}"
cd "$BACKUP_DIR"
ls -t *.tar.gz 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | xargs rm -f 2>/dev/null || true
REMAINING_BACKUPS=$(ls *.tar.gz 2>/dev/null | wc -l)
echo -e "${GREEN}📚 Keeping $REMAINING_BACKUPS backups (max: $MAX_BACKUPS)${NC}"

# Upload to cloud (if configured)
if [ ! -z "$BACKUP_CLOUD_URL" ]; then
    echo -e "${YELLOW}☁️  Uploading to cloud backup...${NC}"
    if curl -X POST -F "file=@$BACKUP_FILE_FULL" "$BACKUP_CLOUD_URL" &>/dev/null; then
        echo -e "${GREEN}✅ Cloud backup successful${NC}"
    else
        echo -e "${RED}⚠️  Cloud backup failed (continuing anyway)${NC}"
    fi
fi

# Create quick restore script
RESTORE_SCRIPT_PATH="${BACKUP_DIR}/restore_${BACKUP_NAME}.sh"
cat > "$RESTORE_SCRIPT_PATH" << EOF
#!/bin/bash
# Quick restore script for backup: $BACKUP_NAME
echo "🔄 Restoring backup: $BACKUP_NAME"
echo "⚠️  This will overwrite current files!"
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ \$REPLY =~ ^[Yy]$ ]]; then
    tar -xzf "$BACKUP_FILE_FULL" --strip-components=1 -C ./
    echo "✅ Restore completed!"
    echo "🔧 Don't forget to run:"
    echo "   npm install"
    echo "   python3 -m pip install -r requirements.txt"
else
    echo "❌ Restore cancelled"
fi
EOF

chmod +x "$RESTORE_SCRIPT_PATH"

echo -e "${GREEN}🎉 BACKUP COMPLETE!${NC}"
echo -e "${BLUE}🔧 Quick restore: bash $RESTORE_SCRIPT_PATH${NC}"
echo -e "${YELLOW}⏰ Total time: ${SECONDS}s${NC}"
