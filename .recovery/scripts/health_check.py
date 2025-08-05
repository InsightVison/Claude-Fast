#!/usr/bin/env python3
"""
🏥 GOAT AI COMPREHENSIVE HEALTH CHECK
The ultimate post-apocalypse system verification tool
"""

import os
import sys
import json
import subprocess
import time
from datetime import datetime
from pathlib import Path

# Colors for terminal output
class Colors:
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    PURPLE = '\033[0;35m'
    CYAN = '\033[0;36m'
    WHITE = '\033[1;37m'
    BOLD = '\033[1m'
    NC = '\033[0m'  # No Color

def print_header(text):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.NC}")
    print(f"{Colors.BOLD}{Colors.BLUE}{text.center(60)}{Colors.NC}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.NC}\n")

def print_status(name, status, details=""):
    icon = "✅" if "OK" in status else "❌" if "FAIL" in status else "⚠️"
    color = Colors.GREEN if "OK" in status else Colors.RED if "FAIL" in status else Colors.YELLOW
    print(f"   {icon} {Colors.BOLD}{name}:{Colors.NC} {color}{status}{Colors.NC}")
    if details:
        print(f"      {Colors.CYAN}{details}{Colors.NC}")

class HealthChecker:
    def __init__(self):
        self.results = {}
        self.start_time = time.time()
    
    def check_system_info(self):
        """Check basic system information"""
        print_header("🖥️  SYSTEM INFORMATION")
        
        try:
            # Operating System
            import platform
            os_info = f"{platform.system()} {platform.release()}"
            print_status("Operating System", "OK", os_info)
            self.results['os'] = {'status': 'OK', 'details': os_info}
            
            # Python version
            python_version = sys.version.split()[0]
            print_status("Python Version", "OK", f"v{python_version}")
            self.results['python'] = {'status': 'OK', 'version': python_version}
            
            # Disk space
            disk_usage = subprocess.run(['df', '-h', '.'], capture_output=True, text=True)
            if disk_usage.returncode == 0:
                lines = disk_usage.stdout.strip().split('\n')
                if len(lines) > 1:
                    parts = lines[1].split()
                    used_space = parts[4] if len(parts) > 4 else "Unknown"
                    print_status("Disk Space", "OK", f"Used: {used_space}")
                    self.results['disk'] = {'status': 'OK', 'used': used_space}
            
        except Exception as e:
            print_status("System Info", "FAIL", str(e))
            self.results['system'] = {'status': 'FAIL', 'error': str(e)}
    
    def check_gpu(self):
        """Check GPU availability and status"""
        print_header("🔥 GPU & COMPUTE")
        
        try:
            # NVIDIA GPU check
            result = subprocess.run(['nvidia-smi', '--query-gpu=name,memory.total,memory.used', 
                                   '--format=csv,noheader,nounits'], 
                                  capture_output=True, text=True)
            if result.returncode == 0:
                gpu_info = result.stdout.strip()
                print_status("NVIDIA GPU", "OK", gpu_info)
                self.results['gpu'] = {'status': 'OK', 'type': 'nvidia', 'info': gpu_info}
            else:
                raise FileNotFoundError("nvidia-smi not found")
                
        except FileNotFoundError:
            # Check for other compute options
            try:
                import torch
                if torch.cuda.is_available():
                    gpu_count = torch.cuda.device_count()
                    gpu_name = torch.cuda.get_device_name(0) if gpu_count > 0 else "Unknown"
                    print_status("PyTorch CUDA", "OK", f"{gpu_count} device(s), {gpu_name}")
                    self.results['gpu'] = {'status': 'OK', 'type': 'cuda', 'devices': gpu_count}
                else:
                    print_status("GPU", "CPU MODE", "No GPU detected, using CPU")
                    self.results['gpu'] = {'status': 'CPU_MODE', 'type': 'cpu'}
            except ImportError:
                print_status("GPU", "UNKNOWN", "PyTorch not installed")
                self.results['gpu'] = {'status': 'UNKNOWN', 'type': 'unknown'}
    
    def check_dependencies(self):
        """Check critical dependencies"""
        print_header("📦 DEPENDENCIES")
        
        # Node.js & NPM
        try:
            node_version = subprocess.run(['node', '--version'], capture_output=True, text=True)
            if node_version.returncode == 0:
                version = node_version.stdout.strip()
                print_status("Node.js", "OK", version)
                self.results['nodejs'] = {'status': 'OK', 'version': version}
            else:
                raise FileNotFoundError()
        except FileNotFoundError:
            print_status("Node.js", "MISSING", "Not installed")
            self.results['nodejs'] = {'status': 'MISSING'}
        
        # NPM packages
        if os.path.exists('package.json'):
            try:
                npm_check = subprocess.run(['npm', 'list', '--depth=0'], 
                                         capture_output=True, text=True)
                if npm_check.returncode == 0:
                    print_status("NPM Packages", "OK", "All dependencies installed")
                else:
                    print_status("NPM Packages", "ISSUES", "Some packages may be missing")
                self.results['npm_packages'] = {'status': 'OK' if npm_check.returncode == 0 else 'ISSUES'}
            except FileNotFoundError:
                print_status("NPM", "MISSING", "NPM not installed")
        
        # Python packages
        critical_packages = ['torch', 'transformers', 'numpy', 'pandas']
        python_status = {}
        
        for package in critical_packages:
            try:
                __import__(package)
                print_status(f"Python {package}", "OK", "Installed")
                python_status[package] = 'OK'
            except ImportError:
                print_status(f"Python {package}", "MISSING", "Not installed")
                python_status[package] = 'MISSING'
        
        self.results['python_packages'] = python_status
    
    def check_project_structure(self):
        """Check project structure and critical files"""
        print_header("📁 PROJECT STRUCTURE")
        
        critical_files = {
            'package.json': 'Node.js configuration',
            'next.config.js': 'Next.js configuration',
            'tailwind.config.js': 'Tailwind CSS configuration',
            'tsconfig.json': 'TypeScript configuration',
            '.env.example': 'Environment variables template',
            'README.md': 'Project documentation'
        }
        
        critical_dirs = {
            'app/': 'Next.js app directory',
            'claude-to-cash/': 'Core application',
            'node_modules/': 'Node.js dependencies',
            '.recovery/': 'Recovery system'
        }
        
        # Check files
        for file, description in critical_files.items():
            if os.path.exists(file):
                size = os.path.getsize(file)
                print_status(file, "OK", f"{description} ({size} bytes)")
            else:
                print_status(file, "MISSING", description)
        
        # Check directories
        for dir_path, description in critical_dirs.items():
            if os.path.exists(dir_path):
                try:
                    item_count = len(os.listdir(dir_path))
                    print_status(dir_path, "OK", f"{description} ({item_count} items)")
                except PermissionError:
                    print_status(dir_path, "OK", f"{description} (access restricted)")
            else:
                print_status(dir_path, "MISSING", description)
    
    def check_git_status(self):
        """Check Git repository status"""
        print_header("🔀 GIT REPOSITORY")
        
        try:
            # Check if it's a git repo
            git_status = subprocess.run(['git', 'status', '--porcelain'], 
                                      capture_output=True, text=True)
            if git_status.returncode == 0:
                # Get current branch
                branch = subprocess.run(['git', 'branch', '--show-current'], 
                                      capture_output=True, text=True)
                current_branch = branch.stdout.strip() if branch.returncode == 0 else "unknown"
                
                # Get last commit
                commit = subprocess.run(['git', 'log', '-1', '--oneline'], 
                                      capture_output=True, text=True)
                last_commit = commit.stdout.strip() if commit.returncode == 0 else "unknown"
                
                # Check for uncommitted changes
                changes = len(git_status.stdout.strip().split('\n')) if git_status.stdout.strip() else 0
                
                print_status("Git Repository", "OK", f"Branch: {current_branch}")
                print_status("Last Commit", "OK", last_commit)
                
                if changes > 0:
                    print_status("Uncommitted Changes", "WARNING", f"{changes} files modified")
                else:
                    print_status("Working Directory", "CLEAN", "No uncommitted changes")
                
                self.results['git'] = {
                    'status': 'OK',
                    'branch': current_branch,
                    'last_commit': last_commit,
                    'uncommitted_changes': changes
                }
                
        except FileNotFoundError:
            print_status("Git", "MISSING", "Git not installed")
            self.results['git'] = {'status': 'MISSING'}
        except subprocess.CalledProcessError:
            print_status("Git Repository", "NOT_A_REPO", "Not a git repository")
            self.results['git'] = {'status': 'NOT_A_REPO'}
    
    def check_recovery_system(self):
        """Check recovery system integrity"""
        print_header("🚨 RECOVERY SYSTEM")
        
        recovery_files = {
            '.recovery/scripts/reanimate.sh': 'Main recovery script',
            '.recovery/scripts/backup.sh': 'Backup script',
            '.recovery/scripts/health_check.py': 'Health check script',
            '.github/workflows/doomsday-backup.yml': 'Automated backup workflow'
        }
        
        for file, description in recovery_files.items():
            if os.path.exists(file):
                # Check if executable
                is_executable = os.access(file, os.X_OK)
                status = "OK" if is_executable else "OK (not executable)"
                print_status(file, status, description)
            else:
                print_status(file, "MISSING", description)
        
        # Check backup directory
        backup_dir = '.recovery/backups'
        if os.path.exists(backup_dir):
            backups = [f for f in os.listdir(backup_dir) if f.endswith('.tar.gz')]
            print_status("Backup Directory", "OK", f"{len(backups)} backups available")
        else:
            print_status("Backup Directory", "MISSING", "No backups found")
    
    def run_comprehensive_check(self):
        """Run all health checks"""
        print(f"{Colors.RED}🚨 GOAT AI COMPREHENSIVE HEALTH CHECK{Colors.NC}")
        print(f"{Colors.YELLOW}⚡ Scanning system... Hold onto your coffee!{Colors.NC}")
        print(f"{Colors.CYAN}⏰ Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Colors.NC}")
        
        # Run all checks
        self.check_system_info()
        self.check_gpu()
        self.check_dependencies()
        self.check_project_structure()
        self.check_git_status()
        self.check_recovery_system()
        
        # Generate summary
        self.generate_summary()
    
    def generate_summary(self):
        """Generate final summary report"""
        print_header("📊 HEALTH SUMMARY")
        
        total_time = time.time() - self.start_time
        
        # Count statuses
        ok_count = 0
        warning_count = 0
        error_count = 0
        
        def count_status(data):
            nonlocal ok_count, warning_count, error_count
            if isinstance(data, dict):
                if 'status' in data:
                    status = data['status']
                    if 'OK' in status or 'CLEAN' in status:
                        ok_count += 1
                    elif 'WARNING' in status or 'MISSING' in status or 'CPU_MODE' in status:
                        warning_count += 1
                    else:
                        error_count += 1
                for value in data.values():
                    if isinstance(value, dict):
                        count_status(value)
        
        count_status(self.results)
        
        print(f"   {Colors.GREEN}✅ OK: {ok_count}{Colors.NC}")
        print(f"   {Colors.YELLOW}⚠️  WARNINGS: {warning_count}{Colors.NC}")
        print(f"   {Colors.RED}❌ ERRORS: {error_count}{Colors.NC}")
        print(f"   {Colors.CYAN}⏱️  Scan time: {total_time:.2f}s{Colors.NC}")
        
        # Overall status
        if error_count == 0 and warning_count == 0:
            overall_status = f"{Colors.GREEN}🎉 SYSTEM FULLY OPERATIONAL{Colors.NC}"
        elif error_count == 0:
            overall_status = f"{Colors.YELLOW}⚠️  SYSTEM OPERATIONAL (with warnings){Colors.NC}"
        else:
            overall_status = f"{Colors.RED}🚨 SYSTEM NEEDS ATTENTION{Colors.NC}"
        
        print(f"\n{Colors.BOLD}OVERALL STATUS: {overall_status}{Colors.NC}")
        
        # Save report
        report_file = f".recovery/health_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(report_file, 'w') as f:
            json.dump({
                'timestamp': datetime.now().isoformat(),
                'summary': {
                    'ok': ok_count,
                    'warnings': warning_count,
                    'errors': error_count,
                    'scan_time': total_time
                },
                'details': self.results
            }, f, indent=2)
        
        print(f"\n{Colors.BLUE}📋 Detailed report saved: {report_file}{Colors.NC}")
        
        # Return exit code
        return 0 if error_count == 0 else 1

def main():
    checker = HealthChecker()
    return checker.run_comprehensive_check()

if __name__ == "__main__":
    sys.exit(main())
