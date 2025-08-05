// Demo component that shows the seamless deployment in action
'use client';

import { useState } from 'react';
import { DeploymentConfig } from '../lib/deployment-engine';

export default function DeploymentDemo() {
  const [prompt, setPrompt] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const deploymentSteps = [
    "🧠 Analyzing your prompt...",
    "⚡ Generating enterprise-grade code...",
    "🗄️ Setting up PostgreSQL database...",
    "📁 Creating GitHub repository...",
    "🚀 Deploying to Vercel...",
    "🔌 Configuring Zoho integration...",
    "🌐 Setting up custom domain...",
    "✅ Your app is LIVE!"
  ];

  const simulateDeployment = async () => {
    setIsDeploying(true);
    setProgress(0);
    
    // Simulate the deployment process
    for (let i = 0; i < deploymentSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(((i + 1) / deploymentSteps.length) * 100);
    }
    
    // Mock deployment result
    setDeploymentResult({
      url: "https://dental-crm-ai.vercel.app",
      adminUrl: "https://dental-crm-ai.vercel.app/admin",
      repoUrl: "https://github.com/claude-to-cash/dental-crm-ai",
      databaseUrl: "https://railway.app/project/dental-crm-db",
      deploymentTime: "8 minutes 42 seconds"
    });
    
    setIsDeploying(false);
  };

  const currentStep = Math.floor((progress / 100) * deploymentSteps.length);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          🚀 Live Deployment Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch your prompt transform into a live business in real-time!
        </p>
      </div>

      {/* Prompt Input */}
      <div className="mb-8">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your business idea... e.g., 'CRM for dental practices with appointment booking and Zoho integration'"
            className="w-full h-32 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDeploying}
          />
          <div className="absolute bottom-4 right-4">
            <button
              onClick={simulateDeployment}
              disabled={isDeploying || !prompt.trim()}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isDeploying ? 'Deploying...' : 'Deploy Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Deployment Progress */}
      {isDeploying && (
        <div className="mb-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Deployment Progress</span>
              <span className="text-white">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            {deploymentSteps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-3 ${
                  index < currentStep ? 'text-green-400' : 
                  index === currentStep ? 'text-blue-400' : 
                  'text-gray-500'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  index < currentStep ? 'bg-green-400' : 
                  index === currentStep ? 'bg-blue-400 animate-pulse' : 
                  'bg-gray-500'
                }`}></div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deployment Result */}
      {deploymentResult && (
        <div className="p-6 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="text-xl font-bold text-green-400">Deployment Successful! 🎉</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-medium mb-2">🌐 Live Application</h4>
              <a 
                href={deploymentResult.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 break-all"
              >
                {deploymentResult.url}
              </a>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-medium mb-2">👨‍💼 Admin Dashboard</h4>
              <a 
                href={deploymentResult.adminUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 break-all"
              >
                {deploymentResult.adminUrl}
              </a>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-medium mb-2">📁 Source Code</h4>
              <a 
                href={deploymentResult.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 break-all"
              >
                {deploymentResult.repoUrl}
              </a>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-medium mb-2">🗄️ Database</h4>
              <a 
                href={deploymentResult.databaseUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 break-all"
              >
                Railway Database
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <span className="text-gray-300">Total deployment time:</span>
            <span className="text-green-400 font-bold">{deploymentResult.deploymentTime}</span>
          </div>
        </div>
      )}

      {/* Key Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
          <p className="text-gray-300">From prompt to production in under 10 minutes</p>
        </div>
        
        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <div className="text-3xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-white mb-2">Enterprise Grade</h3>
          <p className="text-gray-300">Security, compliance, and scalability built-in</p>
        </div>
        
        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <div className="text-3xl mb-4">🔌</div>
          <h3 className="text-xl font-bold text-white mb-2">3000+ Integrations</h3>
          <p className="text-gray-300">Zoho, Stripe, Mailchimp, and thousands more</p>
        </div>
      </div>
    </div>
  );
}
