#!/bin/bash
# 🔄 GOAT AI GIT DEPLOYMENT
# Deploy via Git to any server/service

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

REPO_URL="${1:-origin}"
BRANCH="${2:-main}"

echo -e "${BLUE}🔄 GOAT AI GIT DEPLOYMENT${NC}"
echo -e "${YELLOW}📡 Preparing for Git-based deployment...${NC}"

# Check if we're in a git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Not a Git repository. Initializing...${NC}"
    git init
    git add .
    git commit -m "🚨 Initial commit with recovery system"
fi

# Add deployment-specific files
echo -e "${YELLOW}📝 Creating deployment files...${NC}"

# .gitignore updates for deployment
cat >> .gitignore << 'EOF'

# Deployment artifacts
claude-fast-complete-system.tar.gz
.recovery/backups/*.tar.gz
.recovery/health_report_*.json

# Environment files
.env.local
.env.production

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF

# Create one-click deployment script for servers
cat > one-click-deploy.sh << 'EOF'
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
EOF

chmod +x one-click-deploy.sh

# Create deployment workflows for different platforms
echo -e "${PURPLE}☁️  Creating platform-specific deployment workflows...${NC}"

# GitHub Actions for auto-deployment
cat > .github/workflows/auto-deploy.yml << 'EOF'
name: 🚀 Auto Deploy
on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: 🚀 Deploy to Server
      if: ${{ secrets.DEPLOY_HOST }}
      run: |
        echo "${{ secrets.DEPLOY_KEY }}" > deploy_key
        chmod 600 deploy_key
        ssh -i deploy_key -o StrictHostKeyChecking=no ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} << 'ENDSSH'
          cd ${{ secrets.DEPLOY_PATH || '~/claude-fast' }}
          git pull origin main
          bash DEPLOY.sh
        ENDSSH
    
    - name: 🔔 Notify Success
      if: success()
      run: echo "✅ Deployment successful!"
    
    - name: 🚨 Notify Failure  
      if: failure()
      run: echo "❌ Deployment failed!"
EOF

# Netlify deployment
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = ".next"
  
[build.environment]
  NODE_VERSION = "18"
  PYTHON_VERSION = "3.9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  NODE_ENV = "production"
EOF

# Create deployment documentation
cat > DEPLOY_ANYWHERE.md << 'EOF'
# 🌍 Deploy Anywhere Guide

## 🚀 Quick Deployment Methods

### Method 1: One-Click Server Deployment
```bash
# On any Linux server
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash
```

### Method 2: Git Clone + Deploy
```bash
# Clone and deploy
git clone https://github.com/your-repo/claude-fast.git
cd claude-fast
bash DEPLOY.sh
```

### Method 3: Download Package
```bash
# Download pre-built package
wget https://github.com/your-repo/claude-fast/releases/latest/download/claude-fast-complete-system.tar.gz
tar -xzf claude-fast-complete-system.tar.gz
cd claude-fast-complete-system
bash DEPLOY.sh
```

## 🌐 Platform-Specific Deployments

### 🔹 Digital Ocean Droplet
```bash
# Create droplet, then:
ssh root@your-droplet-ip
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash
```

### 🔹 AWS EC2
```bash
# SSH into instance, then:
sudo yum update -y
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash
```

### 🔹 Google Cloud VM
```bash
# SSH into VM, then:
sudo apt update
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash
```

### 🔹 Linode
```bash
# SSH into Linode, then:
sudo apt update
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash
```

### 🔹 Vultr
```bash
# SSH into server, then:
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash
```

## 🏠 Local Development Setup

### Windows (WSL2)
```bash
# Enable WSL2, then:
wsl --install -d Ubuntu
# Inside WSL:
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash
```

### macOS
```bash
# Install prerequisites:
brew install git node python3
# Deploy:
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash
```

### Linux
```bash
# Any Linux distro:
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash
```

## 🚢 Container Deployments

### Docker
```bash
# Build and run
docker build -t claude-fast .
docker run -p 3000:3000 claude-fast
```

### Docker Compose
```bash
# Start services
docker-compose up -d
```

### Kubernetes
```bash
# Apply manifests
kubectl apply -f k8s/
```

## ☁️ Serverless Deployments

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Railway
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

## 🔄 Continuous Deployment

### GitHub Actions
- Push to main branch triggers auto-deployment
- Secrets required: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_KEY`, `DEPLOY_PATH`

### GitLab CI/CD
```yaml
# .gitlab-ci.yml
deploy:
  script:
    - ssh user@server 'cd /path/to/app && git pull && bash DEPLOY.sh'
```

## 🏥 Post-Deployment Health Check

After any deployment:
```bash
# Verify system health
python3 .recovery/scripts/health_check.py

# Create initial backup
bash .recovery/scripts/backup.sh "post-deployment-$(date +%Y%m%d)"

# Test application
npm run dev
```

## 🚨 Emergency Recovery

If deployment fails:
```bash
# Emergency recovery
bash .recovery/scripts/emergency_toolkit.sh panic

# Or full system recovery
curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/.recovery/scripts/reanimate.sh | bash
```

**You can now deploy ANYWHERE! 🌍**
EOF

# Stage changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
    echo -e "${GREEN}📝 Committing deployment configuration...${NC}"
    git commit -m "🚀 Add universal deployment system

- One-click server deployment
- Platform-specific configs  
- Container deployment ready
- Serverless deployment configs
- Auto-deployment workflows
- Complete portability system"
fi

echo -e "${GREEN}🎉 GIT DEPLOYMENT READY!${NC}"
echo
echo -e "${PURPLE}🚀 Deployment Options:${NC}"
echo -e "  1. ${YELLOW}Push to Git:${NC} ${BLUE}git push origin main${NC}"
echo -e "  2. ${YELLOW}One-click server:${NC} ${BLUE}curl -s https://raw.githubusercontent.com/your-repo/claude-fast/main/one-click-deploy.sh | bash${NC}"
echo -e "  3. ${YELLOW}Local package:${NC} ${BLUE}Use claude-fast-complete-system.tar.gz${NC}"
echo
echo -e "${GREEN}📋 Next Steps:${NC}"
echo -e "  • Push to GitHub: ${YELLOW}git push origin main${NC}"
echo -e "  • Update URLs in scripts with your actual repository"
echo -e "  • Test deployment on target server"
echo -e "  • Set up GitHub Actions secrets for auto-deployment"
