'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlug, FaCode, FaDatabase, FaRocket, FaCheckCircle, FaS                <div className="flex-1">
                  <div className="text-white font-medium">{mapping.sourceField}</div>
                  <div className="text-white/50 text-xs">{mapping.dataType}</div>
                </div>
                <div className="text-cyan-400 mx-4">→</div>
                <div className="flex-1">
                  <div className="text-white font-medium">{mapping.targetField}</div> FaCog } from 'react-icons/fa';

interface FieldMapping {
  sourceField: string;
  targetField: string;
  dataType: string;
  confidence: number;
}

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'transform' | 'action';
  label: string;
  icon: string;
  status: 'idle' | 'active' | 'complete';
  x: number;
  y: number;
}

export default function ZohoJitterbitConnector() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: 'zoho', type: 'trigger', label: 'Zoho CRM', icon: '🏢', status: 'idle', x: 50, y: 100 },
    { id: 'ai', type: 'transform', label: 'AI Field Mapper', icon: '🧠', status: 'idle', x: 250, y: 100 },
    { id: 'jitterbit', type: 'action', label: 'Jitterbit ERP', icon: '⚙️', status: 'idle', x: 450, y: 100 }
  ]);

  const [mappings, setMappings] = useState<FieldMapping[]>([
    { sourceField: 'First_Name', targetField: 'customer.given_name', dataType: 'string', confidence: 98 },
    { sourceField: 'Email', targetField: 'contact.email_address', dataType: 'email', confidence: 99 },
    { sourceField: 'Phone', targetField: 'contact.phone_primary', dataType: 'phone', confidence: 95 },
    { sourceField: 'Company', targetField: 'account.company_name', dataType: 'string', confidence: 97 }
  ]);

  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState('');
  const [syncStats, setSyncStats] = useState({
    recordsSynced: 0,
    successRate: 0,
    avgLatency: 0
  });

  const deployConnector = async () => {
    setIsDeploying(true);
    setDeploymentStatus('Initializing deployment...');
    
    // Simulate deployment phases
    const phases = [
      'Validating Zoho OAuth credentials...',
      'Establishing Jitterbit connection...',
      'Deploying AI field mapping service...',
      'Creating webhook endpoints...',
      'Testing data flow...',
      'Connector deployed successfully!'
    ];

    for (let i = 0; i < phases.length; i++) {
      setDeploymentStatus(phases[i]);
      
      // Update node status
      if (i < 2) setNodes(prev => prev.map(n => n.id === 'zoho' ? {...n, status: 'active'} : n));
      else if (i < 4) setNodes(prev => prev.map(n => n.id === 'ai' ? {...n, status: 'active'} : n));
      else setNodes(prev => prev.map(n => n.id === 'jitterbit' ? {...n, status: 'active'} : n));
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Mark all as complete
    setNodes(prev => prev.map(n => ({...n, status: 'complete'})));
    setIsDeploying(false);
    
    // Start showing sync stats
    setSyncStats({
      recordsSynced: 1247,
      successRate: 99.8,
      avgLatency: 45
    });
  };

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            🚀 Zoho + Jitterbit API Connector
          </h2>
          <p className="text-white/70 mt-2">Enterprise integration with AI-powered field mapping</p>
        </div>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl px-4 py-2">
          <span className="text-green-400 font-bold text-sm">ENTERPRISE READY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workflow Builder */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Visual Workflow Builder</h3>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 min-h-[300px] relative overflow-hidden">
            <svg width="100%" height="200" className="absolute inset-0">
              {/* Connection lines */}
              <motion.line
                x1="150" y1="100" x2="250" y2="100"
                stroke="rgba(34,211,238,0.5)" strokeWidth="3" strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.line
                x1="350" y1="100" x2="450" y2="100"
                stroke="rgba(34,211,238,0.5)" strokeWidth="3" strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1, repeat: Infinity }}
              />
            </svg>

            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                className={`absolute w-20 h-20 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all duration-300 ${
                  node.status === 'active' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse' :
                  node.status === 'complete' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                  'bg-gradient-to-r from-slate-600 to-slate-700'
                }`}
                style={{ left: node.x, top: node.y }}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-2xl mb-1">{node.icon}</div>
                <div className="text-white text-center">{node.label.split(' ')[0]}</div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={deployConnector}
            disabled={isDeploying}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isDeploying ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Deploying...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaRocket />
                Deploy Connector
              </div>
            )}
          </motion.button>

          {deploymentStatus && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-cyan-500/30"
            >
              <div className="text-cyan-400 text-sm font-medium">{deploymentStatus}</div>
            </motion.div>
          )}
        </div>

        {/* AI Field Mapping */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">AI Field Mapping</h3>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 max-h-[400px] overflow-y-auto">
            {mappings.map((mapping, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 mb-3 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-1">
                  <div className="text-white font-medium">{mapping.zohoField}</div>
                  <div className="text-white/50 text-xs">{mapping.type}</div>
                </div>
                <div className="mx-4 text-cyan-400">→</div>
                <div className="flex-1">
                  <div className="text-white font-medium">{mapping.jitterbitField}</div>
                  <div className="text-green-400 text-xs">{(mapping.confidence * 100).toFixed(1)}% confidence</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sync Statistics */}
      {syncStats.recordsSynced > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 text-center">
            <div className="text-green-400 text-2xl font-bold">{syncStats.recordsSynced.toLocaleString()}</div>
            <div className="text-green-300 text-sm">Records Synced</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
            <div className="text-cyan-400 text-2xl font-bold">{syncStats.successRate}%</div>
            <div className="text-cyan-300 text-sm">Success Rate</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-purple-400 text-2xl font-bold">{syncStats.avgLatency}ms</div>
            <div className="text-purple-300 text-sm">Avg Latency</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
