#!/bin/bash
# 🌍 GOAT AI SYSTEM EXPORT TOOL
# Package your entire recovery system for deployment anywhere

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

EXPORT_NAME="${1:-goat-ai-system-$(date +%Y%m%d-%H%M%S)}"
EXPORT_DIR="/tmp/$EXPORT_NAME"

echo -e "${BLUE}🌍 GOAT AI SYSTEM EXPORT${NC}"
echo -e "${YELLOW}📦 Creating portable deployment package...${NC}"

# Create export directory
mkdir -p "$EXPORT_DIR"

echo -e "${PURPLE}📋 Collecting system files...${NC}"

# Copy all project files (excluding volatile directories)
rsync -av --exclude='node_modules' \
          --exclude='.git' \
          --exclude='*.log' \
          --exclude='.next' \
          --exclude='dist' \
          --exclude='build' \
          --exclude='.cache' \
          --exclude='.tmp' \
          . "$EXPORT_DIR/"

# Create deployment metadata
cat > "$EXPORT_DIR/DEPLOYMENT_INFO.json" << EOF
{
  "export_date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "export_name": "$EXPORT_NAME",
  "source_host": "$(hostname)",
  "source_user": "$(whoami)",
  "source_path": "$(pwd)",
  "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'not-a-git-repo')",
  "git_branch": "$(git branch --show-current 2>/dev/null || echo 'not-a-git-repo')",
  "node_version": "$(node --version 2>/dev/null || echo 'not-installed')",
  "npm_version": "$(npm --version 2>/dev/null || echo 'not-installed')",
  "python_version": "$(python3 --version 2>/dev/null || echo 'not-installed')"
}
EOF

# Create universal deployment script
cat > "$EXPORT_DIR/DEPLOY.sh" << 'EOF'
#!/bin/bash
# 🚀 UNIVERSAL DEPLOYMENT SCRIPT
# Deploy GOAT AI system anywhere

set -e

echo "🚀 GOAT AI UNIVERSAL DEPLOYMENT"
echo "================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Detect environment
if [ -f "/etc/os-release" ]; then
    . /etc/os-release
    OS_NAME="$NAME"
    echo -e "${BLUE}🖥️  Detected OS: $OS_NAME${NC}"
else
    OS_NAME="Unknown"
    echo -e "${YELLOW}⚠️  OS detection failed, assuming Linux${NC}"
fi

# Check if we're in a container
if [ -f "/.dockerenv" ]; then
    echo -e "${BLUE}🐳 Container environment detected${NC}"
    IN_CONTAINER=true
else
    IN_CONTAINER=false
fi

# Install dependencies based on environment
install_dependencies() {
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    
    # Update package lists
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y curl wget git python3 python3-pip
    elif command -v yum &> /dev/null; then
        sudo yum update -y
        sudo yum install -y curl wget git python3 python3-pip
    elif command -v brew &> /dev/null; then
        brew update
        brew install curl wget git python3
    else
        echo -e "${RED}❌ Package manager not found. Please install manually:${NC}"
        echo "  - curl, wget, git, python3, python3-pip"
        exit 1
    fi
    
    # Install Node.js if not present
    if ! command -v node &> /dev/null; then
        echo -e "${YELLOW}📦 Installing Node.js...${NC}"
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs || {
            echo -e "${RED}❌ Node.js installation failed${NC}"
            echo -e "${BLUE}💡 Please install Node.js manually: https://nodejs.org/${NC}"
        }
    fi
}

# Setup environment
setup_environment() {
    echo -e "${YELLOW}🔧 Setting up environment...${NC}"
    
    # Make scripts executable
    chmod +x .recovery/scripts/*.sh .recovery/scripts/*.py
    
    # Install Python dependencies
    if [ -f "requirements.txt" ]; then
        pip3 install -r requirements.txt
    fi
    
    # Install NPM dependencies
    if [ -f "package.json" ]; then
        npm install
    fi
    
    echo -e "${GREEN}✅ Environment setup complete${NC}"
}

# Run health check
run_health_check() {
    echo -e "${YELLOW}🏥 Running health check...${NC}"
    if [ -f ".recovery/scripts/health_check.py" ]; then
        python3 .recovery/scripts/health_check.py
    else
        echo -e "${RED}❌ Health check script not found${NC}"
    fi
}

# Main deployment flow
main() {
    echo -e "${BLUE}Starting deployment in: $(pwd)${NC}"
    
    # Install dependencies
    install_dependencies
    
    # Setup environment
    setup_environment
    
    # Create initial backup
    if [ -f ".recovery/scripts/backup.sh" ]; then
        echo -e "${YELLOW}💾 Creating initial backup...${NC}"
        bash .recovery/scripts/backup.sh "initial-deployment-$(date +%Y%m%d-%H%M%S)"
    fi
    
    # Run health check
    run_health_check
    
    echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
    echo -e "${BLUE}📋 Next steps:${NC}"
    echo -e "  1. Test your application: ${YELLOW}npm run dev${NC}"
    echo -e "  2. Setup automated backups: ${YELLOW}bash .recovery/scripts/backup.sh${NC}"
    echo -e "  3. Review health report above"
    echo
    echo -e "${PURPLE}🔧 Available recovery commands:${NC}"
    echo -e "  • Health check: ${YELLOW}python3 .recovery/scripts/health_check.py${NC}"
    echo -e "  • Emergency toolkit: ${YELLOW}bash .recovery/scripts/emergency_toolkit.sh help${NC}"
    echo -e "  • Create backup: ${YELLOW}bash .recovery/scripts/backup.sh${NC}"
}

# Run deployment
main "$@"
EOF

chmod +x "$EXPORT_DIR/DEPLOY.sh"

# Create cloud deployment configurations
echo -e "${PURPLE}☁️  Creating cloud deployment configs...${NC}"

# Docker deployment
cat > "$EXPORT_DIR/Dockerfile" << 'EOF'
FROM node:18-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    git \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install
RUN pip3 install torch numpy pandas || echo "Python packages install failed"

# Make scripts executable
RUN chmod +x .recovery/scripts/*.sh .recovery/scripts/*.py

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python3 .recovery/scripts/health_check.py --quick || exit 1

# Start application
CMD ["npm", "run", "dev"]
EOF

# Docker Compose
cat > "$EXPORT_DIR/docker-compose.yml" << 'EOF'
version: '3.8'

services:
  goat-ai:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./.recovery/backups:/app/.recovery/backups
      - ./data:/app/data
    environment:
      - NODE_ENV=production
      - BACKUP_CLOUD_URL=${BACKUP_CLOUD_URL:-}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "python3", ".recovery/scripts/health_check.py", "--quick"]
      interval: 30s
      timeout: 10s
      retries: 3
EOF

# Vercel deployment
cat > "$EXPORT_DIR/vercel.json" << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
EOF

# Railway deployment
cat > "$EXPORT_DIR/railway.toml" << 'EOF'
[build]
builder = "nixpacks"

[deploy]
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "always"

[[services]]
name = "goat-ai"

[services.variables]
NODE_ENV = "production"
PORT = "3000"
EOF

# Heroku deployment
cat > "$EXPORT_DIR/Procfile" << 'EOF'
web: npm start
worker: python3 .recovery/scripts/health_check.py --daemon
EOF

cat > "$EXPORT_DIR/app.json" << 'EOF'
{
  "name": "GOAT AI System",
  "description": "AI system with bulletproof recovery",
  "repository": "https://github.com/your-repo/goat-ai",
  "keywords": ["ai", "nodejs", "python", "recovery"],
  "image": "heroku/nodejs",
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    },
    {
      "url": "heroku/python"
    }
  ],
  "env": {
    "NODE_ENV": {
      "description": "Node environment",
      "value": "production"
    },
    "BACKUP_CLOUD_URL": {
      "description": "Cloud backup endpoint (optional)",
      "required": false
    }
  },
  "formation": {
    "web": {
      "quantity": 1,
      "size": "basic"
    }
  },
  "addons": [
    "heroku-postgresql:hobby-dev"
  ]
}
EOF

# GitHub Codespaces devcontainer
mkdir -p "$EXPORT_DIR/.devcontainer"
cat > "$EXPORT_DIR/.devcontainer/devcontainer.json" << 'EOF'
{
  "name": "GOAT AI Development",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:18",
  
  "features": {
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.9"
    },
    "ghcr.io/devcontainers/features/git:1": {}
  },

  "postCreateCommand": "bash DEPLOY.sh",
  
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "bradlc.vscode-tailwindcss",
        "ms-vscode.vscode-typescript-next"
      ]
    }
  },

  "forwardPorts": [3000],
  "portsAttributes": {
    "3000": {
      "label": "Application",
      "onAutoForward": "notify"
    }
  }
}
EOF

# Create README for deployment
cat > "$EXPORT_DIR/DEPLOYMENT_GUIDE.md" << 'EOF'
# 🚀 GOAT AI DEPLOYMENT GUIDE

This package contains a complete, portable GOAT AI system with bulletproof recovery.

## 🎯 Quick Start (Any Environment)

1. **Extract & Deploy**:
   ```bash
   # Extract the package
   tar -xzf goat-ai-system-*.tar.gz
   cd goat-ai-system-*
   
   # Universal deployment
   bash DEPLOY.sh
   ```

2. **Verify Everything Works**:
   ```bash
   # Health check
   python3 .recovery/scripts/health_check.py
   
   # Start application
   npm run dev
   ```

## ☁️ Cloud Deployments

### 🐳 Docker
```bash
# Build and run
docker build -t goat-ai .
docker run -p 3000:3000 goat-ai

# Or use Docker Compose
docker-compose up
```

### ⚡ Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 🚂 Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway login
railway init
railway up
```

### 🟣 Heroku
```bash
# Install Heroku CLI
# Create app
heroku create your-goat-ai-app

# Deploy
git add .
git commit -m "Deploy GOAT AI"
git push heroku main
```

### 🔧 GitHub Codespaces
1. Push to GitHub repository
2. Create Codespace
3. System auto-deploys via `.devcontainer/devcontainer.json`

## 🔄 Local Development

### Prerequisites
- Node.js 18+
- Python 3.9+
- Git

### Setup
```bash
# Clone/extract project
# Run deployment script
bash DEPLOY.sh

# Start development
npm run dev
```

## 🛡️ Recovery System

Your deployment includes a complete disaster recovery system:

### Emergency Commands
```bash
# Total system recovery
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/.recovery/scripts/reanimate.sh | bash

# Quick fixes
bash .recovery/scripts/emergency_toolkit.sh panic

# Health monitoring
python3 .recovery/scripts/health_check.py

# Backup system
bash .recovery/scripts/backup.sh
```

## 🔧 Customization

### Environment Variables
```bash
export BACKUP_CLOUD_URL="https://your-backup-service.com/upload"
export NODE_ENV="production"
export PORT="3000"
```

### Update Recovery URLs
Edit `.recovery/scripts/reanimate.sh` to point to your:
- Model storage URLs
- Dataset storage URLs
- Backup repositories

## 🚨 Troubleshooting

### Common Issues
1. **Permission denied**: `chmod +x .recovery/scripts/*.sh`
2. **Missing dependencies**: Run `bash DEPLOY.sh` again
3. **Port conflicts**: Change PORT environment variable

### Get Help
- Health check: `python3 .recovery/scripts/health_check.py`
- Emergency toolkit: `bash .recovery/scripts/emergency_toolkit.sh help`
- Full documentation: See `.recovery/README.md`

## 📊 Monitoring

The system includes:
- ✅ Automated health checks
- ✅ Error monitoring
- ✅ Performance tracking
- ✅ Backup verification

**You're now bulletproof! 🛡️**
EOF

# Create archive
echo -e "${YELLOW}🗜️  Creating deployment archive...${NC}"
cd /tmp
ARCHIVE_NAME="$EXPORT_NAME.tar.gz"
tar -czf "$ARCHIVE_NAME" "$EXPORT_NAME/"

# Move to current directory
mv "$ARCHIVE_NAME" "$OLDPWD/"

# Clean up
rm -rf "$EXPORT_DIR"

echo -e "${GREEN}🎉 EXPORT COMPLETE!${NC}"
echo -e "${BLUE}📦 Created: $ARCHIVE_NAME${NC}"
echo -e "${BLUE}📏 Size: $(du -h "$ARCHIVE_NAME" | cut -f1)${NC}"
echo
echo -e "${PURPLE}🚀 Deployment Options:${NC}"
echo -e "  1. ${YELLOW}Local:${NC} Extract and run ${YELLOW}bash DEPLOY.sh${NC}"
echo -e "  2. ${YELLOW}Docker:${NC} Extract and run ${YELLOW}docker-compose up${NC}"
echo -e "  3. ${YELLOW}Cloud:${NC} Upload to Vercel/Railway/Heroku"
echo -e "  4. ${YELLOW}Codespaces:${NC} Push to GitHub and create Codespace"
echo
echo -e "${GREEN}📋 Next Steps:${NC}"
echo -e "  • Download: ${YELLOW}$ARCHIVE_NAME${NC}"
echo -e "  • Extract anywhere: ${YELLOW}tar -xzf $ARCHIVE_NAME${NC}"
echo -e "  • Deploy: ${YELLOW}cd $EXPORT_NAME && bash DEPLOY.sh${NC}"
