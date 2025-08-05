# 🚨 GOAT AI EMERGENCY ALIASES
# Add this to your ~/.bashrc or ~/.zshrc

# Quick access to recovery tools
alias panic='bash .recovery/scripts/emergency_toolkit.sh panic'
alias backup-now='bash .recovery/scripts/backup.sh "manual-$(date +%Y%m%d-%H%M%S)"'
alias health-check='python3 .recovery/scripts/health_check.py'
alias resurrect='bash .recovery/scripts/reanimate.sh'
alias fix-deps='bash .recovery/scripts/emergency_toolkit.sh deps'
alias clean-build='bash .recovery/scripts/emergency_toolkit.sh clean'
alias fix-git='bash .recovery/scripts/emergency_toolkit.sh fix-git'
alias fix-npm='bash .recovery/scripts/emergency_toolkit.sh fix-npm'

# Quick status checks
alias check-gpu='nvidia-smi 2>/dev/null || echo "💻 CPU mode"'
alias check-space='df -h .'
alias check-memory='free -h'

# Development shortcuts
alias dev='npm run dev'
alias build='npm run build'
alias test='npm test'

# Recovery shortcuts
alias restore-latest='bash .recovery/scripts/emergency_toolkit.sh restore'
alias list-backups='ls -la .recovery/backups/'

# Emergency one-liners
alias doomsday='curl -s https://raw.githubusercontent.com/InsightVison/Claude-Fast/main/.recovery/scripts/reanimate.sh | bash'

echo "🚨 GOAT AI Emergency Tools Loaded!"
echo "💡 Try: panic, backup-now, health-check, resurrect"
