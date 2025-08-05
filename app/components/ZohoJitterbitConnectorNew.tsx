'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlug, FaCode, FaDatabase, FaRocket, FaCheckCircle, FaSpinner, FaCog } from 'react-icons/fa';

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
  status: 'idle' | 'active' | 'complete' | 'error';
  x: number;
  y: number;
}

export default function ZohoJitterbitConnector() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: 'zoho', type: 'trigger', label: 'Zoho CRM', icon: '🏢', status: 'idle', x: 100, y: 100 },
    { id: 'ai-transform', type: 'transform', label: 'AI Field Mapper', icon: '🤖', status: 'idle', x: 300, y: 100 },
    { id: 'jitterbit', type: 'action', label: 'Jitterbit ERP', icon: '⚙️', status: 'idle', x: 500, y: 100 }
  ]);
  
  const [mappings, setMappings] = useState<FieldMapping[]>([]);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'generating' | 'deploying' | 'deployed' | 'error'>('idle');
  const [connectorStats, setConnectorStats] = useState({
    totalMappings: 0,
    successfulSyncs: 0,
    dataTransferred: '0 MB',
    avgSyncTime: '0.0s'
  });

  // Sample field mappings for demo
  const sampleMappings: FieldMapping[] = [
    { sourceField: 'First_Name', targetField: 'customer.given_name', dataType: 'string', confidence: 98 },
    { sourceField: 'Last_Name', targetField: 'customer.family_name', dataType: 'string', confidence: 97 },
    { sourceField: 'Email', targetField: 'contact.email_address', dataType: 'email', confidence: 99 },
    { sourceField: 'Phone', targetField: 'contact.phone_number', dataType: 'phone', confidence: 95 },
    { sourceField: 'Deal_Amount', targetField: 'transaction.amount', dataType: 'currency', confidence: 94 },
    { sourceField: 'Company', targetField: 'organization.name', dataType: 'string', confidence: 96 }
  ];

  const generateFieldMappings = async () => {
    setDeploymentStatus('generating');
    updateNodeStatus('ai-transform', 'active');
    
    // Simulate AI field mapping generation
    for (let i = 0; i <= sampleMappings.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMappings(sampleMappings.slice(0, i));
    }
    
    updateNodeStatus('ai-transform', 'complete');
    setDeploymentStatus('idle');
    
    // Update stats
    setConnectorStats(prev => ({
      ...prev,
      totalMappings: sampleMappings.length,
      avgSyncTime: '1.2s'
    }));
  };

  const deployConnector = async () => {
    setDeploymentStatus('deploying');
    updateNodeStatus('zoho', 'active');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateNodeStatus('zoho', 'complete');
    updateNodeStatus('jitterbit', 'active');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    updateNodeStatus('jitterbit', 'complete');
    
    setDeploymentStatus('deployed');
    
    // Update final stats
    setConnectorStats({
      totalMappings: sampleMappings.length,
      successfulSyncs: 247,
      dataTransferred: '2.4 GB',
      avgSyncTime: '0.8s'
    });
  };

  const updateNodeStatus = (nodeId: string, status: WorkflowNode['status']) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, status } : node
    ));
  };

  const getStatusColor = (status: WorkflowNode['status']) => {
    switch (status) {
      case 'active': return 'text-cyan-400 animate-pulse';
      case 'complete': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/20 to-slate-900/40 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            🚀 Zoho + Jitterbit API Connector
          </h2>
          <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 px-4 py-2 rounded-full text-cyan-300 text-sm font-semibold">
            ENTERPRISE INTEGRATION
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visual Workflow Builder */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Visual Workflow Designer</h3>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/70 border border-white/5 rounded-2xl p-6 min-h-[300px] relative">
              {/* Workflow Nodes */}
              <div className="flex justify-between items-center h-full">
                {nodes.map((node, index) => (
                  <motion.div
                    key={node.id}
                    className={`flex flex-col items-center space-y-3 ${getStatusColor(node.status)}`}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                      node.status === 'active' ? 'from-cyan-500 to-blue-600' :
                      node.status === 'complete' ? 'from-green-500 to-emerald-600' :
                      'from-gray-600 to-gray-700'
                    } flex items-center justify-center text-2xl shadow-lg`}>
                      {node.status === 'active' ? (
                        <FaSpinner className="animate-spin text-white" />
                      ) : (
                        <span>{node.icon}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{node.label}</div>
                      <div className="text-xs opacity-60 capitalize">{node.status}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                onClick={generateFieldMappings}
                disabled={deploymentStatus === 'generating'}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {deploymentStatus === 'generating' ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Generating Mappings...
                  </>
                ) : (
                  <>
                    <FaCode className="mr-2" />
                    Generate AI Mappings
                  </>
                )}
              </motion.button>
              
              <motion.button
                onClick={deployConnector}
                disabled={mappings.length === 0 || deploymentStatus === 'deploying'}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {deploymentStatus === 'deploying' ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Deploying...
                  </>
                ) : deploymentStatus === 'deployed' ? (
                  <>
                    <FaCheckCircle className="mr-2" />
                    Deployed!
                  </>
                ) : (
                  <>
                    <FaRocket className="mr-2" />
                    Deploy Connector
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Field Mapping AI */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">AI Field Mapping Engine</h3>
              <span className="text-cyan-300 text-sm font-semibold">
                {mappings.length} mappings generated
              </span>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/70 border border-white/5 rounded-2xl p-6 max-h-80 overflow-y-auto">
              {mappings.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <FaDatabase className="mx-auto text-4xl mb-4 opacity-50" />
                  <p>Click "Generate AI Mappings" to start field mapping</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mappings.map((mapping, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-white/5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <span className="text-blue-300 font-mono text-sm">{mapping.sourceField}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-green-300 font-mono text-sm">{mapping.targetField}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 bg-slate-700 px-2 py-1 rounded">
                          {mapping.dataType}
                        </span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          mapping.confidence >= 95 ? 'text-green-400 bg-green-500/20' :
                          mapping.confidence >= 90 ? 'text-yellow-400 bg-yellow-500/20' :
                          'text-orange-400 bg-orange-500/20'
                        }`}>
                          {mapping.confidence}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
                <div className="text-cyan-400 text-2xl font-bold">{connectorStats.totalMappings}</div>
                <div className="text-cyan-300 text-sm">Active Mappings</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="text-green-400 text-2xl font-bold">{connectorStats.successfulSyncs}</div>
                <div className="text-green-300 text-sm">Successful Syncs</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
                <div className="text-purple-400 text-2xl font-bold">{connectorStats.dataTransferred}</div>
                <div className="text-purple-300 text-sm">Data Transferred</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4">
                <div className="text-orange-400 text-2xl font-bold">{connectorStats.avgSyncTime}</div>
                <div className="text-orange-300 text-sm">Avg Sync Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {deploymentStatus === 'deployed' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <FaCheckCircle className="text-green-400 text-3xl mr-3" />
                <h3 className="text-2xl font-bold text-green-400">Connector Deployed Successfully!</h3>
              </div>
              <p className="text-white/80 mb-4">
                Your Zoho CRM ↔ Jitterbit ERP integration is now live and processing data in real-time.
              </p>
              <div className="flex justify-center space-x-4">
                <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg">
                  API Endpoint: /api/sync/zoho-jitterbit-{Date.now()}
                </span>
                <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg">
                  Status: Active
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
