'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCode, FaDollarSign, FaUsers, FaCrown, FaFire, FaGem, FaBolt } from 'react-icons/fa';

interface ShowcaseProject {
  id: string;
  name: string;
  description: string;
  value: number;
  revenue: number;
  users: number;
  status: 'live' | 'deploying' | 'success';
  tech: string[];
  deploymentUrl: string;
  createdAt: Date;
  agentsUsed: string[];
  powerLevel: number;
  roi: number;
}

const MEGA_SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: '1',
    name: 'AI-Powered E-commerce Empire',
    description: 'Next-gen marketplace with AI recommendations and automated inventory management',
    value: 850000,
    revenue: 320000,
    users: 45000,
    status: 'live',
    tech: ['Next.js 14', 'AI/ML', 'Stripe', 'PostgreSQL', 'Redis'],
    deploymentUrl: 'https://ai-ecommerce-empire.vercel.app',
    createdAt: new Date('2024-08-01'),
    agentsUsed: ['Neural Architect GPT-5', 'UI Sorcerer Supreme', 'API Overlord Elite', 'Deploy Titan Pro'],
    powerLevel: 42500,
    roi: 376
  },
  {
    id: '2',
    name: 'Corporate SaaS Dashboard Pro',
    description: 'Enterprise-grade analytics platform with real-time data visualization',
    value: 1200000,
    revenue: 480000,
    users: 12000,
    status: 'live',
    tech: ['React 19', 'D3.js', 'WebSockets', 'MongoDB', 'Kubernetes'],
    deploymentUrl: 'https://saas-dashboard-pro.vercel.app',
    createdAt: new Date('2024-07-28'),
    agentsUsed: ['Neural Architect GPT-5', 'AI Strategist Omega', 'Revenue Engine Infinity'],
    powerLevel: 38000,
    roi: 400
  },
  {
    id: '3',
    name: 'Viral Social Media Platform',
    description: 'Next-generation social app with AI content curation and viral growth mechanics',
    value: 2500000,
    revenue: 1200000,
    users: 250000,
    status: 'live',
    tech: ['Next.js 14', 'AI/ML', 'Socket.io', 'PostgreSQL', 'CDN'],
    deploymentUrl: 'https://viral-social-platform.vercel.app',
    createdAt: new Date('2024-07-25'),
    agentsUsed: ['Viral Growth Hacker', 'Neural Architect GPT-5', 'Revenue Engine Infinity'],
    powerLevel: 55000,
    roi: 480
  },
  {
    id: '4',
    name: 'Blockchain DeFi Protocol',
    description: 'Decentralized finance platform with automated yield farming and staking rewards',
    value: 5000000,
    revenue: 2400000,
    users: 80000,
    status: 'live',
    tech: ['Web3', 'Solidity', 'React', 'Ethereum', 'IPFS'],
    deploymentUrl: 'https://defi-protocol-elite.vercel.app',
    createdAt: new Date('2024-07-20'),
    agentsUsed: ['Blockchain Overlord', 'Security Guardian', 'Revenue Engine Infinity'],
    powerLevel: 65000,
    roi: 520
  },
  {
    id: '5',
    name: 'AI Research Assistant Pro',
    description: 'Revolutionary AI-powered research platform with scientific breakthrough capabilities',
    value: 3200000,
    revenue: 1600000,
    users: 35000,
    status: 'deploying',
    tech: ['GPT-5', 'TensorFlow', 'Python', 'Jupyter', 'AWS'],
    deploymentUrl: 'https://ai-research-pro.vercel.app',
    createdAt: new Date('2024-08-04'),
    agentsUsed: ['AI Research Titan', 'Neural Architect GPT-5', 'Security Guardian'],
    powerLevel: 48000,
    roi: 500
  }
];

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [totalStats, setTotalStats] = useState({
    totalValue: 0,
    totalRevenue: 0,
    totalUsers: 0,
    avgROI: 0
  });

  useEffect(() => {
    const stats = MEGA_SHOWCASE_PROJECTS.reduce((acc, project) => ({
      totalValue: acc.totalValue + project.value,
      totalRevenue: acc.totalRevenue + project.revenue,
      totalUsers: acc.totalUsers + project.users,
      avgROI: acc.avgROI + project.roi
    }), { totalValue: 0, totalRevenue: 0, totalUsers: 0, avgROI: 0 });
    
    stats.avgROI = Math.floor(stats.avgROI / MEGA_SHOWCASE_PROJECTS.length);
    setTotalStats(stats);
  }, []);

  return (
    <div className="mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
          🏆 Elite Project Showcase
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Recent AI-orchestrated builds generating MILLIONS in value
        </p>
        
        {/* Mega Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="backdrop-blur-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
            <FaDollarSign className="text-green-400 text-2xl mx-auto mb-2" />
            <div className="text-green-400 text-xl font-bold">${totalStats.totalValue.toLocaleString()}</div>
            <div className="text-green-300 text-xs">Total Project Value</div>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
            <FaGem className="text-cyan-400 text-2xl mx-auto mb-2" />
            <div className="text-cyan-400 text-xl font-bold">${totalStats.totalRevenue.toLocaleString()}</div>
            <div className="text-cyan-300 text-xs">Revenue Generated</div>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
            <FaUsers className="text-purple-400 text-2xl mx-auto mb-2" />
            <div className="text-purple-400 text-xl font-bold">{totalStats.totalUsers.toLocaleString()}</div>
            <div className="text-purple-300 text-xs">Active Users</div>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-4">
            <FaFire className="text-orange-400 text-2xl mx-auto mb-2" />
            <div className="text-orange-400 text-xl font-bold">{totalStats.avgROI}%</div>
            <div className="text-orange-300 text-xs">Average ROI</div>
          </div>
        </div>
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEGA_SHOWCASE_PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 cursor-pointer transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedProject(project)}
          >
            {/* Status Badge */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 ${
              project.status === 'live' ? 'bg-green-500/20 text-green-300' :
              project.status === 'deploying' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-blue-500/20 text-blue-300'
            }`}>
              {project.status === 'live' && <FaRocket className="mr-1" />}
              {project.status === 'deploying' && <FaBolt className="mr-1" />}
              {project.status.toUpperCase()}
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
            <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <div className="text-green-400 font-bold text-sm">${project.value.toLocaleString()}</div>
                <div className="text-white/50 text-xs">Project Value</div>
              </div>
              <div>
                <div className="text-cyan-400 font-bold text-sm">{project.users.toLocaleString()}</div>
                <div className="text-white/50 text-xs">Active Users</div>
              </div>
            </div>

            {/* Tech Stack Preview */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tech.slice(0, 3).map((tech, i) => (
                <span key={i} className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            {/* ROI Badge */}
            <div className="flex justify-between items-center">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-bold px-2 py-1 rounded-full">
                ⚡{project.powerLevel.toLocaleString()}
              </div>
              <div className="text-orange-400 font-bold text-sm">
                📈 {project.roi}% ROI
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="backdrop-blur-xl bg-slate-900/90 border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.name}</h3>
                <p className="text-white/70">{selectedProject.description}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-white/50 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-500/10 rounded-xl p-4 text-center">
                <div className="text-green-400 text-2xl font-bold">${selectedProject.value.toLocaleString()}</div>
                <div className="text-green-300 text-xs">Value</div>
              </div>
              <div className="bg-blue-500/10 rounded-xl p-4 text-center">
                <div className="text-blue-400 text-2xl font-bold">${selectedProject.revenue.toLocaleString()}</div>
                <div className="text-blue-300 text-xs">Revenue</div>
              </div>
              <div className="bg-purple-500/10 rounded-xl p-4 text-center">
                <div className="text-purple-400 text-2xl font-bold">{selectedProject.users.toLocaleString()}</div>
                <div className="text-purple-300 text-xs">Users</div>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 text-center">
                <div className="text-orange-400 text-2xl font-bold">{selectedProject.roi}%</div>
                <div className="text-orange-300 text-xs">ROI</div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-white font-bold mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech, i) => (
                  <span key={i} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Agents Used */}
            <div className="mb-6">
              <h4 className="text-white font-bold mb-3">AI Agents Deployed</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.agentsUsed.map((agent, i) => (
                  <span key={i} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {agent}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.a
                href={selectedProject.deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-bold text-center transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🚀 View Live App
              </motion.a>
              <motion.button
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📊 View Analytics
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
