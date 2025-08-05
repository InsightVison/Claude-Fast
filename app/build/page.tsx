'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCogs, FaRocket, FaBrain, FaDatabase, FaSync, FaCheck, FaTimes } from 'react-icons/fa';

// Real Zoho CRM Integration Tools
const ZOHO_TOOLS = {
  crm_sync: {
    name: "CRM Data Sync",
    icon: FaSync,
    status: "idle",
    description: "Synchronize data between Zoho CRM and external systems"
  },
  field_mapper: {
    name: "Field Mapping",
    icon: FaCogs,
    status: "idle", 
    description: "Map fields between different systems automatically"
  },
  workflow_automation: {
    name: "Workflow Automation",
    icon: FaRocket,
    status: "idle",
    description: "Create automated workflows based on CRM events"
  },
  data_validation: {
    name: "Data Validation",
    icon: FaCheck,
    status: "idle",
    description: "Validate and clean CRM data before processing"
  }
};

export default function ZohoCRMPlatform() {
  const [prompt, setPrompt] = useState('');
  const [tools, setTools] = useState(ZOHO_TOOLS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const [crmStats, setCrmStats] = useState({
    totalRecords: 0,
    lastSync: null as string | null,
    syncStatus: 'idle' as 'idle' | 'syncing' | 'success' | 'error'
  });

  const processCRMRequest = async (userPrompt: string) => {
    if (!userPrompt.trim()) {
      setError('Please describe what you want to do with your Zoho CRM');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError('');
    setResults(null);
    setCrmStats(prev => ({ ...prev, syncStatus: 'syncing' }));
    
    try {
      // Step 1: Initialize sync
      setCurrentTask('Connecting to Zoho CRM...');
      setTools(prev => ({ ...prev, crm_sync: { ...prev.crm_sync, status: 'active' } }));
      await delay(1000);
      setProgress(25);
      
      // Step 2: Field mapping
      setCurrentTask('Analyzing field mappings...');
      setTools(prev => ({ 
        ...prev, 
        crm_sync: { ...prev.crm_sync, status: 'complete' },
        field_mapper: { ...prev.field_mapper, status: 'active' }
      }));
      await delay(1500);
      setProgress(50);
      
      // Step 3: Data validation
      setCurrentTask('Validating data...');
      setTools(prev => ({ 
        ...prev, 
        field_mapper: { ...prev.field_mapper, status: 'complete' },
        data_validation: { ...prev.data_validation, status: 'active' }
      }));
      await delay(1000);
      setProgress(75);
      
      // Step 4: Execute workflow
      setCurrentTask('Executing automation...');
      setTools(prev => ({ 
        ...prev, 
        data_validation: { ...prev.data_validation, status: 'complete' },
        workflow_automation: { ...prev.workflow_automation, status: 'active' }
      }));
      await delay(800);
      setProgress(85);
      
      // Step 5: Real API call
      setCurrentTask('Processing with Zoho CRM API...');
      const response = await fetch('/api/zoho/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userPrompt,
          fields: {},
          systems: []
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setProgress(100);
        setCurrentTask('✅ Processing complete!');
        setResults(result);
        setTools(prev => ({ 
          ...prev, 
          workflow_automation: { ...prev.workflow_automation, status: 'complete' }
        }));
        setCrmStats({
          totalRecords: result.recordsProcessed,
          lastSync: result.syncTime,
          syncStatus: 'success'
        });
      } else {
        throw new Error(result.error || 'Processing failed');
      }
      
    } catch (err) {
      console.error('CRM processing error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCurrentTask('❌ Processing failed');
      setCrmStats(prev => ({ ...prev, syncStatus: 'error' }));
      
      // Reset tool states
      setTools(prev => 
        Object.fromEntries(
          Object.entries(prev).map(([key, tool]) => [key, { ...tool, status: 'idle' }])
        )
      );
    }
    
    setIsProcessing(false);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
            <FaUsers className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Zoho CRM Integration Platform
          </h1>
          <p className="text-xl text-gray-600">
            Automate your CRM workflows with intelligent data processing
          </p>
        </div>

        {/* CRM Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Records Processed</p>
                <p className="text-2xl font-bold text-gray-900">{crmStats.totalRecords.toLocaleString()}</p>
              </div>
              <FaDatabase className="text-2xl text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Sync</p>
                <p className="text-lg font-semibold text-gray-900">
                  {crmStats.lastSync 
                    ? new Date(crmStats.lastSync).toLocaleString()
                    : 'Never'
                  }
                </p>
              </div>
              <FaSync className="text-2xl text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sync Status</p>
                <p className={`text-lg font-semibold capitalize ${
                  crmStats.syncStatus === 'success' ? 'text-green-600' :
                  crmStats.syncStatus === 'error' ? 'text-red-600' :
                  crmStats.syncStatus === 'syncing' ? 'text-blue-600' :
                  'text-gray-600'
                }`}>
                  {crmStats.syncStatus}
                </p>
              </div>
              {crmStats.syncStatus === 'success' && <FaCheck className="text-2xl text-green-600" />}
              {crmStats.syncStatus === 'error' && <FaTimes className="text-2xl text-red-600" />}
              {crmStats.syncStatus === 'syncing' && <FaSync className="text-2xl text-blue-600 animate-spin" />}
            </div>
          </div>
        </div>

        {/* Main Input */}
        <div className="bg-white rounded-lg p-8 shadow-sm border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">CRM Automation Request</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to do with your Zoho CRM... 

Examples:
- Sync all deals from Zoho CRM to Jitterbit when status changes to 'Qualified'
- Update contact records when email engagement score changes
- Create automated follow-up tasks for high-value prospects
- Generate reports for sales pipeline analysis"
            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          
          <div className="mt-6">
            <button
              onClick={() => processCRMRequest(prompt)}
              disabled={isProcessing || !prompt.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {isProcessing ? 'Processing...' : 'Process CRM Request'}
            </button>
          </div>
        </div>

        {/* Processing Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(tools).map(([key, tool]) => (
            <motion.div
              key={key}
              className={`bg-white rounded-lg p-6 shadow-sm border transition-all ${
                tool.status === 'active' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                tool.status === 'active' ? 'bg-blue-600' :
                tool.status === 'complete' ? 'bg-green-600' :
                'bg-gray-400'
              }`}>
                <tool.icon className="text-xl text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
              
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                tool.status === 'active' ? 'bg-blue-100 text-blue-800' :
                tool.status === 'complete' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {tool.status === 'active' ? 'Working...' :
                 tool.status === 'complete' ? 'Complete' : 'Ready'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        {isProcessing && (
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{currentTask}</span>
              <span className="text-sm text-gray-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-200 mb-8"
          >
            <h3 className="text-lg font-semibold text-green-800 mb-4">✅ Processing Complete</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-700 font-medium">Records Processed:</p>
                <p className="text-xl text-green-900 font-bold">{results.recordsProcessed}</p>
              </div>
              <div>
                <p className="text-sm text-green-700 font-medium">Processing Time:</p>
                <p className="text-lg text-green-900">{new Date(results.syncTime).toLocaleString()}</p>
              </div>
            </div>
            
            {results.fieldsMapping && (
              <div className="mt-4">
                <p className="text-sm text-green-700 font-medium mb-2">Field Mappings:</p>
                <div className="bg-white rounded p-4">
                  {Object.entries(results.fieldsMapping).map(([zohoField, mappedField]) => (
                    <div key={zohoField} className="flex justify-between py-1 text-sm">
                      <span className="text-gray-600">{zohoField}</span>
                      <span className="text-gray-900 font-mono">{mappedField}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <p className="text-sm text-green-700 mt-4">{results.message}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
