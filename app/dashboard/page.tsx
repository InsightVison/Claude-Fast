'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PlayIcon, StopIcon, CloudIcon, CpuChipIcon, BoltIcon, CommandLineIcon, CodeBracketIcon, SparklesIcon } from '@heroicons/react/24/solid';
import AuthButton from '../components/AuthButton';
import LightningStudio from '../components/LightningStudio';

// Lightning AI Style IDE Dashboard
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isTraining, setIsTraining] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [metrics, setMetrics] = useState({ accuracy: 0, loss: 0, speed: 0 });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Simulate real-time logs
  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        const newLog = `[${new Date().toLocaleTimeString()}] Training step ${Math.floor(Math.random() * 1000)} | Loss: ${(Math.random() * 0.5).toFixed(4)} | Accuracy: ${(0.8 + Math.random() * 0.2).toFixed(3)}`;
        setLogs(prev => [...prev.slice(-50), newLog]);
        setMetrics({
          accuracy: 0.8 + Math.random() * 0.2,
          loss: Math.random() * 0.5,
          speed: 1000 + Math.random() * 500
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTraining]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="glass-card p-8 rounded-xl text-center">
          <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Loading Lightning Studio...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="glass-card p-8 rounded-xl text-center">
          <p className="text-white mb-4">Please sign in to access Lightning Studio</p>
          <AuthButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Futuristic Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-pink-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid-pattern opacity-20"></div>
        </div>
        {/* Floating Orbs */}
        <div className="floating-orb w-96 h-96 top-20 -right-48 bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl"></div>
        <div className="floating-orb w-80 h-80 bottom-20 -left-40 bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <BoltIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Lightning Studio
                </h1>
                <p className="text-xs text-gray-400">AI Development Platform</p>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-1">
              <NavTab icon={CodeBracketIcon} label="Editor" active />
              <NavTab icon={CommandLineIcon} label="Terminal" />
              <NavTab icon={SparklesIcon} label="AI Assistant" />
              <NavTab icon={CloudIcon} label="Deploy" />
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <StatusIndicator />
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Main IDE Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - File Explorer */}
        <div className="w-64 border-r border-white/10 bg-black/10 backdrop-blur-xl">
          <FileExplorer />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 flex">
            <div className="flex-1 bg-black/20 backdrop-blur-xl">
              <CodeEditor />
            </div>
            
            {/* Right Sidebar - AI Assistant & Metrics */}
            <div className="w-80 border-l border-white/10 bg-black/10 backdrop-blur-xl">
              <AIAssistant metrics={metrics} />
            </div>
          </div>

          {/* Bottom Panel - Terminal & Logs */}
          <div className="h-64 border-t border-white/10 bg-black/20 backdrop-blur-xl">
            <TerminalPanel logs={logs} isTraining={isTraining} onToggleTraining={setIsTraining} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation Tab Component
function NavTab({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active 
        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}>
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

// Status Indicator Component
function StatusIndicator() {
  return (
    <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span className="text-xs text-green-400 font-medium">Online</span>
    </div>
  );
}

// File Explorer Component
function FileExplorer() {
  const files = [
    { name: 'main.py', type: 'file', icon: '🐍' },
    { name: 'requirements.txt', type: 'file', icon: '📄' },
    { name: 'models/', type: 'folder', icon: '📁' },
    { name: 'data/', type: 'folder', icon: '📁' },
    { name: 'config.yaml', type: 'file', icon: '⚙️' },
  ];

  return (
    <div className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Explorer</h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-1">
        {files.map((file, index) => (
          <div key={index} className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer transition-colors group">
            <span className="text-sm">{file.icon}</span>
            <span className="text-sm text-gray-300 group-hover:text-white">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Code Editor Component
function CodeEditor() {
  return (
    <div className="h-full flex flex-col">
      {/* Editor Tabs */}
      <div className="flex items-center border-b border-white/10 bg-black/10">
        <div className="flex items-center space-x-1 px-4 py-2 bg-white/5 border-r border-white/10">
          <span className="text-sm text-white">main.py</span>
          <button className="text-gray-400 hover:text-white ml-2">×</button>
        </div>
      </div>
      
      {/* Code Area */}
      <div className="flex-1 p-4 font-mono text-sm bg-black/30">
        <div className="space-y-2">
          <div className="text-purple-400"># Lightning AI Training Script</div>
          <div><span className="text-blue-400">import</span> <span className="text-white">lightning</span> <span className="text-blue-400">as</span> <span className="text-white">L</span></div>
          <div><span className="text-blue-400">import</span> <span className="text-white">torch</span></div>
          <div><span className="text-blue-400">import</span> <span className="text-white">torch.nn</span> <span className="text-blue-400">as</span> <span className="text-white">nn</span></div>
          <div className="mt-4"><span className="text-blue-400">class</span> <span className="text-yellow-400">LightningModel</span><span className="text-white">(</span><span className="text-green-400">L.LightningModule</span><span className="text-white">):</span></div>
          <div className="ml-4"><span className="text-blue-400">def</span> <span className="text-yellow-400">__init__</span><span className="text-white">(self):</span></div>
          <div className="ml-8"><span className="text-blue-400">super</span><span className="text-white">().__init__()</span></div>
          <div className="ml-8"><span className="text-white">self.layer = nn.Linear(784, 10)</span></div>
          <div className="mt-2 ml-4"><span className="text-blue-400">def</span> <span className="text-yellow-400">forward</span><span className="text-white">(self, x):</span></div>
          <div className="ml-8"><span className="text-blue-400">return</span> <span className="text-white">self.layer(x)</span></div>
        </div>
      </div>
    </div>
  );
}

// AI Assistant Component
function AIAssistant({ metrics }: { metrics: any }) {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <SparklesIcon className="w-5 h-5 text-purple-400" />
        <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
      </div>
      
      {/* Metrics */}
      <div className="space-y-3 mb-6">
        <MetricCard title="Accuracy" value={`${(metrics.accuracy * 100).toFixed(1)}%`} color="blue" />
        <MetricCard title="Loss" value={metrics.loss.toFixed(4)} color="red" />
        <MetricCard title="Speed" value={`${metrics.speed.toFixed(0)} it/s`} color="green" />
      </div>
      
      {/* AI Chat */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-black/20 rounded-lg p-3 mb-3 text-sm">
          <div className="text-purple-400 mb-2">🤖 AI Assistant</div>
          <div className="text-gray-300">Your model is training well! Consider adjusting the learning rate for better convergence.</div>
        </div>
        
        <div className="flex">
          <input 
            className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
            placeholder="Ask AI..."
          />
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-r-lg hover:from-purple-600 hover:to-blue-600 transition-all">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ title, value, color }: { title: string, value: string, color: string }) {
  const colorMap = {
    blue: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    red: 'border-red-500/30 bg-red-500/10 text-red-400',
    green: 'border-green-500/30 bg-green-500/10 text-green-400'
  };
  
  return (
    <div className={`p-3 rounded-lg border ${colorMap[color as keyof typeof colorMap]}`}>
      <div className="text-xs opacity-80">{title}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}

// Terminal Panel Component
function TerminalPanel({ logs, isTraining, onToggleTraining }: { logs: string[], isTraining: boolean, onToggleTraining: (value: boolean) => void }) {
  return (
    <div className="flex h-full">
      {/* Terminal */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <CommandLineIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-white">Terminal</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleTraining(!isTraining)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                isTraining 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' 
                  : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
              }`}
            >
              {isTraining ? <StopIcon className="w-3 h-3" /> : <PlayIcon className="w-3 h-3" />}
              <span>{isTraining ? 'Stop' : 'Start'} Training</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-4 font-mono text-xs overflow-auto bg-black/40">
          {logs.length === 0 ? (
            <div className="text-gray-500">No training logs yet. Click 'Start Training' to begin.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-green-400 mb-1">{log}</div>
            ))
          )}
        </div>
      </div>
      
      {/* Resource Monitor */}
      <div className="w-64 border-l border-white/10 p-4">
        <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
        <div className="space-y-3">
          <ResourceBar label="CPU" value={65} color="blue" />
          <ResourceBar label="Memory" value={78} color="purple" />
          <ResourceBar label="GPU" value={45} color="green" />
        </div>
      </div>
    </div>
  );
}

// Resource Bar Component
function ResourceBar({ label, value, color }: { label: string, value: number, color: string }) {
  const colorMap = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500'
  };
  
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorMap[color as keyof typeof colorMap]} transition-all duration-300`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
