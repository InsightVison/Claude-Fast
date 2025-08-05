# 🚨 GOAT AI DISASTER RECOVERY GUIDE
## Never Lose Your Code Again!

> **TLDR**: Lost everything? Run `curl -s https://raw.githubusercontent.com/InsightVison/Claude-Fast/main/.recovery/scripts/reanimate.sh | bash` and grab coffee. 30 seconds later, you're back in business.

---

## 🔥 EMERGENCY PROTOCOLS

### 🚨 CODE RED: Total System Loss (30 seconds)
```bash
# THE NUCLEAR OPTION - One command to rule them all
curl -s https://raw.githubusercontent.com/InsightVison/Claude-Fast/main/.recovery/scripts/reanimate.sh | bash
```

### ⚡ QUICK FIXES (Individual Issues)
```bash
# Fix broken dependencies
bash .recovery/scripts/emergency_toolkit.sh deps

# Clean build artifacts
bash .recovery/scripts/emergency_toolkit.sh clean

# Nuclear reset (reinstall everything)
bash .recovery/scripts/emergency_toolkit.sh reset

# Git issues
bash .recovery/scripts/emergency_toolkit.sh fix-git

# NPM/Node problems
bash .recovery/scripts/emergency_toolkit.sh fix-npm

# Create emergency backup
bash .recovery/scripts/emergency_toolkit.sh backup

# Restore from backup
bash .recovery/scripts/emergency_toolkit.sh restore

# System health check
bash .recovery/scripts/emergency_toolkit.sh health

# PANIC MODE (when nothing else works)
bash .recovery/scripts/emergency_toolkit.sh panic
```

---

## 📂 RECOVERY SYSTEM ARCHITECTURE

```
.recovery/
├── scripts/
│   ├── reanimate.sh           # 🚨 Main recovery script
│   ├── backup.sh              # 💾 Automated backup system
│   ├── health_check.py        # 🏥 Comprehensive health monitor
│   └── emergency_toolkit.sh   # 🔧 Quick fixes toolkit
├── backups/                   # 📦 Local backup storage
└── models/                    # 🤖 AI model storage (if applicable)

.github/workflows/
└── doomsday-backup.yml        # 🤖 Automated cloud backups
```

---

## 🎯 WHAT EACH SCRIPT DOES

### 🚨 `reanimate.sh` - The Phoenix Script
**Purpose**: Complete system resurrection from digital ashes  
**When to use**: Total codespace/environment loss  
**What it does**:
- ✅ Recreates directory structure
- ✅ Downloads missing dependencies
- ✅ Restores project configuration
- ✅ Downloads AI models (if applicable)
- ✅ Restores datasets
- ✅ Runs health verification
- ✅ Creates post-recovery backup

### 💾 `backup.sh` - The Time Machine
**Purpose**: Create comprehensive project backups  
**When to use**: Before major changes, daily maintenance  
**What it backs up**:
- ✅ All source code
- ✅ Configuration files
- ✅ Package manifests
- ✅ Recovery scripts themselves
- ✅ Git metadata
- ✅ Environment settings

**Usage**:
```bash
# Automatic backup
bash .recovery/scripts/backup.sh

# Named backup
bash .recovery/scripts/backup.sh "before-major-refactor"

# Quick restore from latest
bash .recovery/backups/restore_[backup-name].sh
```

### 🏥 `health_check.py` - The Doctor
**Purpose**: Comprehensive system health analysis  
**When to use**: After recovery, before deployment, regular maintenance  
**What it checks**:
- 🖥️ System information (OS, disk space, memory)
- 🔥 GPU/compute availability
- 📦 Dependencies (Node.js, Python, NPM packages)
- 📁 Project structure integrity
- 🔀 Git repository status
- 🚨 Recovery system itself

**Usage**:
```bash
python3 .recovery/scripts/health_check.py
```

### 🔧 `emergency_toolkit.sh` - The Swiss Army Knife
**Purpose**: Quick fixes for common disasters  
**When to use**: Specific issues, troubleshooting  
**Available tools**:
- `deps` - Fix dependency issues
- `clean` - Remove build artifacts
- `reset` - Nuclear dependency reinstall
- `fix-git` - Git repository maintenance
- `fix-npm` - NPM/Node.js issues
- `backup` - Emergency backup
- `restore` - Quick restore
- `health` - Health check
- `panic` - Full recovery mode

---

## 🤖 AUTOMATED BACKUPS

### GitHub Actions Doomsday Shield
The `.github/workflows/doomsday-backup.yml` workflow automatically:
- 📅 Creates daily backups at 3 AM UTC
- 🔄 Triggers on every push to main branches
- 🧪 Tests recovery process
- ☁️ Stores backups in GitHub artifacts (90-day retention)
- 📄 Generates recovery instructions
- 🔔 Sends notifications (if configured)

### Manual Trigger
```bash
# Trigger workflow manually via GitHub CLI
gh workflow run doomsday-backup.yml
```

---

## 🎪 RECOVERY SCENARIOS

### Scenario 1: "My codespace disappeared!"
```bash
# 1. Create new codespace
# 2. Run resurrection script
curl -s https://raw.githubusercontent.com/InsightVison/Claude-Fast/main/.recovery/scripts/reanimate.sh | bash

# 3. Verify everything works
python3 .recovery/scripts/health_check.py
npm run dev
```

### Scenario 2: "Dependencies are broken!"
```bash
bash .recovery/scripts/emergency_toolkit.sh deps
```

### Scenario 3: "Git is messed up!"
```bash
bash .recovery/scripts/emergency_toolkit.sh fix-git
```

### Scenario 4: "I broke everything!"
```bash
bash .recovery/scripts/emergency_toolkit.sh panic
```

### Scenario 5: "I need to restore from backup"
```bash
# List available backups
ls -la .recovery/backups/

# Restore specific backup
bash .recovery/backups/restore_[backup-name].sh

# Or use toolkit
bash .recovery/scripts/emergency_toolkit.sh restore
```

---

## 🛡️ PREVENTION STRATEGIES

### Daily Habits
```bash
# Add to your daily routine
alias backup-now="bash .recovery/scripts/backup.sh daily-$(date +%Y%m%d)"
alias health-check="python3 .recovery/scripts/health_check.py"

# Before major changes
backup-now
```

### Pre-commit Hook
```bash
# Add to .git/hooks/pre-commit
#!/bin/bash
echo "🔍 Running health check..."
python3 .recovery/scripts/health_check.py --quick
```

### Automated Monitoring
```bash
# Add to crontab for regular health checks
0 9 * * * cd /your/project && python3 .recovery/scripts/health_check.py --silent
```

---

## 🔧 CUSTOMIZATION

### Environment Variables
```bash
# Backup configuration
export BACKUP_CLOUD_URL="https://your-backup-service.com/upload"
export MAX_BACKUPS=20

# Recovery URLs (customize for your setup)
export MODEL_BASE_URL="https://your-model-storage.com"
export DATASET_BASE_URL="https://your-dataset-storage.com"
```

### Model URLs (Update in reanimate.sh)
```bash
# Replace these URLs with your actual model storage
MISTRAL_7B_URL="https://huggingface.co/mistralai/Mistral-7B-v0.1/resolve/main/pytorch_model.bin"
CODING_ADAPTER_URL="https://github.com/your-repo/goat-ai/releases/latest/download/coding_adapter.zip"
SAAS_ADAPTER_URL="https://github.com/your-repo/goat-ai/releases/latest/download/saas_adapter.zip"
```

### Dataset URLs (Update in reanimate.sh)
```bash
# Replace with your dataset storage
SAAS_DATASET_URL="https://your-storage.s3.amazonaws.com/saas_v2.jsonl"
CODING_DATASET_URL="https://your-storage.s3.amazonaws.com/coding_v2.jsonl"
DEPLOYMENT_DATASET_URL="https://your-storage.s3.amazonaws.com/deployment_v2.jsonl"
```

---

## 🚨 TROUBLESHOOTING

### Common Issues

#### "Permission denied" errors
```bash
# Fix script permissions
chmod +x .recovery/scripts/*.sh
```

#### "Command not found" errors
```bash
# Install missing tools
sudo apt-get update
sudo apt-get install -y curl wget tar gzip git
```

#### "No space left on device"
```bash
# Clean up space
bash .recovery/scripts/emergency_toolkit.sh clean
docker system prune -a  # if using Docker
```

#### Health check fails
```bash
# Debug mode
python3 .recovery/scripts/health_check.py --verbose
```

### Emergency Contacts
- 📧 Repository: `https://github.com/InsightVison/Claude-Fast`
- 🔧 Issues: `https://github.com/InsightVison/Claude-Fast/issues`
- 💬 Discussions: `https://github.com/InsightVison/Claude-Fast/discussions`

---

## 🎉 SUCCESS VERIFICATION

After any recovery, verify with:
```bash
# 1. Health check
python3 .recovery/scripts/health_check.py

# 2. Test the application
npm run dev

# 3. Run tests (if available)
npm test

# 4. Create a backup of the recovered state
bash .recovery/scripts/backup.sh "post-recovery-$(date +%Y%m%d)"
```

Expected output:
```
🎉 SYSTEM FULLY OPERATIONAL
✅ OK: 15
⚠️  WARNINGS: 0
❌ ERRORS: 0
```

---

## 💡 PRO TIPS

1. **Test your recovery system regularly**
   ```bash
   # Monthly recovery drill
   bash .recovery/scripts/backup.sh "pre-drill"
   # ... simulate disaster ...
   bash .recovery/scripts/reanimate.sh
   ```

2. **Customize for your specific setup**
   - Update model URLs in `reanimate.sh`
   - Add your specific dependencies to health checks
   - Configure cloud backup endpoints

3. **Version your recovery system**
   - Keep recovery scripts in version control
   - Tag stable recovery versions
   - Test before deploying changes

4. **Monitor backup health**
   ```bash
   # Check backup integrity
   ls -la .recovery/backups/
   # Test random backup restore
   ```

---

**🚀 YOU'RE BULLETPROOF NOW!**

Your code is safer than a dragon's hoard. Sleep soundly knowing that no cosmic ray, coffee spill, or Monday morning can destroy your work again.

*May your builds be green and your backups be plenty.* ☕🚀
