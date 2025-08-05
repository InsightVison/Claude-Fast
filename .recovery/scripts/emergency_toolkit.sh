#!/bin/bash
# 🔧 GOAT AI EMERGENCY TOOLKIT
# Quick fixes for common disasters

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

show_help() {
    echo -e "${BLUE}🔧 GOAT AI EMERGENCY TOOLKIT${NC}"
    echo -e "${YELLOW}Usage: $0 <command>${NC}"
    echo
    echo -e "${GREEN}Available Commands:${NC}"
    echo -e "  ${YELLOW}deps${NC}     - Fix broken dependencies"
    echo -e "  ${YELLOW}clean${NC}    - Clean build artifacts and caches"
    echo -e "  ${YELLOW}reset${NC}    - Nuclear reset (reinstall everything)"
    echo -e "  ${YELLOW}fix-git${NC}  - Fix common Git issues"
    echo -e "  ${YELLOW}fix-npm${NC}  - Fix NPM/Node issues"
    echo -e "  ${YELLOW}backup${NC}   - Create emergency backup"
    echo -e "  ${YELLOW}restore${NC}  - Restore from latest backup"
    echo -e "  ${YELLOW}health${NC}   - Run health check"
    echo -e "  ${YELLOW}panic${NC}    - Full system recovery (use with caution!)"
    echo
    echo -e "${PURPLE}Examples:${NC}"
    echo -e "  $0 deps      # Fix dependency issues"
    echo -e "  $0 panic     # Last resort recovery"
}

fix_dependencies() {
    echo -e "${YELLOW}🔧 Fixing dependencies...${NC}"
    
    # Clean npm cache
    if command -v npm &> /dev/null; then
        echo -e "${BLUE}📦 Cleaning NPM cache...${NC}"
        npm cache clean --force
        
        # Remove node_modules and reinstall
        if [ -d "node_modules" ]; then
            echo -e "${YELLOW}🗑️  Removing node_modules...${NC}"
            rm -rf node_modules package-lock.json
        fi
        
        if [ -f "package.json" ]; then
            echo -e "${GREEN}📥 Reinstalling NPM packages...${NC}"
            npm install
        fi
    fi
    
    # Fix Python dependencies
    if command -v pip3 &> /dev/null && [ -f "requirements.txt" ]; then
        echo -e "${BLUE}🐍 Fixing Python dependencies...${NC}"
        pip3 install --upgrade pip
        pip3 install -r requirements.txt --upgrade
    fi
    
    echo -e "${GREEN}✅ Dependencies fixed!${NC}"
}

clean_artifacts() {
    echo -e "${YELLOW}🧹 Cleaning build artifacts...${NC}"
    
    # Next.js artifacts
    [ -d ".next" ] && rm -rf .next && echo -e "   ✅ Removed .next"
    [ -d "out" ] && rm -rf out && echo -e "   ✅ Removed out"
    [ -d "dist" ] && rm -rf dist && echo -e "   ✅ Removed dist"
    [ -d "build" ] && rm -rf build && echo -e "   ✅ Removed build"
    
    # Cache directories
    [ -d ".cache" ] && rm -rf .cache && echo -e "   ✅ Removed .cache"
    [ -d ".tmp" ] && rm -rf .tmp && echo -e "   ✅ Removed .tmp"
    
    # Log files
    find . -name "*.log" -type f -delete 2>/dev/null && echo -e "   ✅ Removed log files"
    
    # OS generated files
    find . -name ".DS_Store" -type f -delete 2>/dev/null && echo -e "   ✅ Removed .DS_Store files"
    find . -name "Thumbs.db" -type f -delete 2>/dev/null && echo -e "   ✅ Removed Thumbs.db files"
    
    echo -e "${GREEN}✅ Cleanup complete!${NC}"
}

nuclear_reset() {
    echo -e "${RED}☢️  NUCLEAR RESET INITIATED${NC}"
    echo -e "${YELLOW}⚠️  This will reinstall EVERYTHING!${NC}"
    read -p "Are you absolutely sure? (type 'YES' to continue): " confirm
    
    if [ "$confirm" != "YES" ]; then
        echo -e "${BLUE}❌ Reset cancelled${NC}"
        return
    fi
    
    echo -e "${RED}🚨 No turning back now...${NC}"
    
    # Clean everything
    clean_artifacts
    
    # Remove all dependency directories
    [ -d "node_modules" ] && rm -rf node_modules
    [ -f "package-lock.json" ] && rm -f package-lock.json
    
    # Reinstall everything
    fix_dependencies
    
    echo -e "${GREEN}🎉 Nuclear reset complete!${NC}"
}

fix_git() {
    echo -e "${YELLOW}🔀 Fixing Git issues...${NC}"
    
    # Check if it's a git repo
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${RED}❌ Not a Git repository${NC}"
        return
    fi
    
    # Fix common issues
    echo -e "${BLUE}🔧 Cleaning Git repository...${NC}"
    git gc --prune=now
    git remote prune origin
    
    # Check for conflicts
    if git status --porcelain | grep -q "^UU\|^AA\|^DD"; then
        echo -e "${YELLOW}⚠️  Merge conflicts detected${NC}"
        echo -e "${BLUE}💡 Run: git status to see conflicts${NC}"
    fi
    
    # Show status
    echo -e "${GREEN}📊 Current Git status:${NC}"
    git status --short
    
    echo -e "${GREEN}✅ Git maintenance complete!${NC}"
}

fix_npm() {
    echo -e "${YELLOW}📦 Fixing NPM/Node issues...${NC}"
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ NPM not installed${NC}"
        return
    fi
    
    # Fix npm permissions (if needed)
    echo -e "${BLUE}🔐 Checking NPM permissions...${NC}"
    npm config get prefix
    
    # Update npm
    echo -e "${BLUE}⬆️  Updating NPM...${NC}"
    npm install -g npm@latest
    
    # Clear cache
    echo -e "${BLUE}🧹 Clearing NPM cache...${NC}"
    npm cache clean --force
    
    # Audit and fix
    if [ -f "package.json" ]; then
        echo -e "${BLUE}🔍 Running security audit...${NC}"
        npm audit fix || echo -e "${YELLOW}⚠️  Some vulnerabilities couldn't be fixed automatically${NC}"
    fi
    
    echo -e "${GREEN}✅ NPM issues resolved!${NC}"
}

create_backup() {
    echo -e "${YELLOW}💾 Creating emergency backup...${NC}"
    
    if [ -f ".recovery/scripts/backup.sh" ]; then
        bash .recovery/scripts/backup.sh "emergency-$(date +%Y%m%d-%H%M%S)"
    else
        echo -e "${RED}❌ Backup script not found${NC}"
        echo -e "${BLUE}💡 Creating quick backup...${NC}"
        
        BACKUP_NAME="emergency-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
        tar -czf "$BACKUP_NAME" \
            --exclude=node_modules \
            --exclude=.git \
            --exclude="*.log" \
            --exclude=.next \
            --exclude=dist \
            --exclude=build \
            .
        
        echo -e "${GREEN}✅ Quick backup created: $BACKUP_NAME${NC}"
    fi
}

restore_backup() {
    echo -e "${YELLOW}🔄 Restoring from backup...${NC}"
    
    BACKUP_DIR=".recovery/backups"
    
    if [ ! -d "$BACKUP_DIR" ]; then
        echo -e "${RED}❌ No backup directory found${NC}"
        return
    fi
    
    # List available backups
    echo -e "${BLUE}📋 Available backups:${NC}"
    ls -lt "$BACKUP_DIR"/*.tar.gz 2>/dev/null | head -5 | while read -r line; do
        echo -e "   $line"
    done
    
    # Get latest backup
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.tar.gz 2>/dev/null | head -1)
    
    if [ -z "$LATEST_BACKUP" ]; then
        echo -e "${RED}❌ No backups found${NC}"
        return
    fi
    
    echo -e "${YELLOW}⚠️  This will restore from: $(basename "$LATEST_BACKUP")${NC}"
    read -p "Continue? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}🔄 Restoring backup...${NC}"
        tar -xzf "$LATEST_BACKUP" --strip-components=1
        echo -e "${GREEN}✅ Backup restored!${NC}"
        echo -e "${YELLOW}💡 Don't forget to run: $0 deps${NC}"
    else
        echo -e "${BLUE}❌ Restore cancelled${NC}"
    fi
}

run_health_check() {
    echo -e "${YELLOW}🏥 Running health check...${NC}"
    
    if [ -f ".recovery/scripts/health_check.py" ]; then
        python3 .recovery/scripts/health_check.py
    else
        echo -e "${RED}❌ Health check script not found${NC}"
        echo -e "${BLUE}💡 Running basic checks...${NC}"
        
        # Basic checks
        echo -e "${GREEN}Node.js:${NC} $(node --version 2>/dev/null || echo 'Not installed')"
        echo -e "${GREEN}NPM:${NC} $(npm --version 2>/dev/null || echo 'Not installed')"
        echo -e "${GREEN}Python:${NC} $(python3 --version 2>/dev/null || echo 'Not installed')"
        echo -e "${GREEN}Git:${NC} $(git --version 2>/dev/null || echo 'Not installed')"
        
        if [ -f "package.json" ]; then
            echo -e "${GREEN}✅ package.json found${NC}"
        else
            echo -e "${RED}❌ package.json missing${NC}"
        fi
    fi
}

panic_mode() {
    echo -e "${RED}🚨 PANIC MODE ACTIVATED${NC}"
    echo -e "${YELLOW}⚡ Full system recovery in progress...${NC}"
    
    # Create backup first
    create_backup
    
    # Run recovery script
    if [ -f ".recovery/scripts/reanimate.sh" ]; then
        echo -e "${BLUE}🔄 Running full recovery...${NC}"
        bash .recovery/scripts/reanimate.sh
    else
        echo -e "${YELLOW}⚠️  Recovery script not found, running manual recovery...${NC}"
        clean_artifacts
        fix_dependencies
        fix_git
        fix_npm
    fi
    
    # Health check
    run_health_check
    
    echo -e "${GREEN}🎉 PANIC RECOVERY COMPLETE!${NC}"
}

# Main command dispatcher
case "${1:-help}" in
    "deps")
        fix_dependencies
        ;;
    "clean")
        clean_artifacts
        ;;
    "reset")
        nuclear_reset
        ;;
    "fix-git")
        fix_git
        ;;
    "fix-npm")
        fix_npm
        ;;
    "backup")
        create_backup
        ;;
    "restore")
        restore_backup
        ;;
    "health")
        run_health_check
        ;;
    "panic")
        panic_mode
        ;;
    "help"|*)
        show_help
        ;;
esac
