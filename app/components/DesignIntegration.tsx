'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaFigma, 
  FaAdobe, 
  FaPaintBrush, 
  FaCode, 
  FaDownload, 
  FaUpload,
  FaEye,
  FaSync,
  FaPalette,
  FaLayerGroup
} from 'react-icons/fa';
import { SiAdobexd, SiSketch, SiInvision } from 'react-icons/si';
import { fadeInUp, staggerContainer, staggerItem, hoverLift, magneticButton } from './animations';

interface DesignTool {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  description: string;
  features: string[];
  isConnected: boolean;
}

const designTools: DesignTool[] = [
  {
    id: 'figma',
    name: 'Figma',
    icon: <FaFigma className="text-2xl" />,
    color: '#F24E1E',
    gradient: 'from-orange-500 to-purple-600',
    description: 'Design, prototype, and collaborate in real-time',
    features: ['Live Sync', 'Component Library', 'Auto Layout', 'Design Tokens'],
    isConnected: true
  },
  {
    id: 'adobe-xd',
    name: 'Adobe XD',
    icon: <SiAdobexd className="text-2xl" />,
    color: '#FF61F6',
    gradient: 'from-pink-500 to-violet-600',
    description: 'UX/UI design and prototyping platform',
    features: ['Prototyping', 'Voice UI', '3D Transforms', 'Animations'],
    isConnected: false
  },
  {
    id: 'sketch',
    name: 'Sketch',
    icon: <SiSketch className="text-2xl" />,
    color: '#F7B500',
    gradient: 'from-yellow-500 to-orange-600',
    description: 'Vector graphics and UI design tool',
    features: ['Symbols', 'Libraries', 'Artboards', 'Plugins'],
    isConnected: false
  },
  {
    id: 'invision',
    name: 'InVision',
    icon: <SiInvision className="text-2xl" />,
    color: '#FF3366',
    gradient: 'from-red-500 to-pink-600',
    description: 'Digital product design platform',
    features: ['Prototyping', 'Design System', 'Inspect', 'Freehand'],
    isConnected: false
  }
];

const DesignToolCard = ({ tool, onConnect }: { tool: DesignTool; onConnect: (id: string) => void }) => (
  <motion.div
    variants={staggerItem}
    {...hoverLift}
    className="relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 group hover:bg-white/10 hover:border-white/20 transition-all duration-500"
  >
    {/* Connection status indicator */}
    <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
      tool.isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
    }`}></div>

    {/* Tool icon with gradient background */}
    <motion.div 
      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
      whileHover={{ rotate: 5, scale: 1.1 }}
    >
      <div className="text-white">{tool.icon}</div>
    </motion.div>

    {/* Tool information */}
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 group-hover:bg-clip-text transition-all duration-300">
      {tool.name}
    </h3>
    
    <p className="text-white/70 text-sm mb-4 leading-relaxed">
      {tool.description}
    </p>

    {/* Features list */}
    <div className="space-y-2 mb-6">
      {tool.features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center text-sm text-white/60"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></div>
          {feature}
        </motion.div>
      ))}
    </div>

    {/* Connect/Status button */}
    <motion.button
      {...magneticButton}
      onClick={() => onConnect(tool.id)}
      className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
        tool.isConnected
          ? 'bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30'
          : 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500/90 hover:to-purple-500/90 text-white border border-white/20 hover:border-white/40'
      }`}
    >
      <div className="flex items-center justify-center space-x-2">
        {tool.isConnected ? (
          <>
            <FaSync className="text-sm" />
            <span>Connected</span>
          </>
        ) : (
          <>
            <FaUpload className="text-sm" />
            <span>Connect {tool.name}</span>
          </>
        )}
      </div>
    </motion.button>

    {/* Shimmer effect */}
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
  </motion.div>
);

export default function DesignIntegration() {
  const [tools, setTools] = useState(designTools);
  const [isImporting, setIsImporting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [importedData, setImportedData] = useState<any>(null);

  const handleConnect = async (toolId: string) => {
    setIsImporting(true);
    setConnectionStatus(`Connecting to ${toolId}...`);
    
    try {
      let response;
      
      if (toolId === 'figma') {
        // In a real app, you'd use OAuth flow to get the token
        const mockToken = 'figma-demo-token';
        
        response = await fetch('/api/figma', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'connect',
            accessToken: mockToken
          })
        });
      } else if (toolId === 'adobe-xd') {
        const mockToken = 'adobe-demo-token';
        
        response = await fetch('/api/adobe-xd', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'connect',
            accessToken: mockToken
          })
        });
      }
      
      if (response) {
        const result = await response.json();
        
        if (result.success) {
          setTools(prev => prev.map(tool => 
            tool.id === toolId 
              ? { ...tool, isConnected: true }
              : tool
          ));
          setConnectionStatus(`✅ Connected to ${toolId.charAt(0).toUpperCase() + toolId.slice(1)}!`);
          
          // Auto-import after successful connection
          setTimeout(() => handleImport(toolId), 1000);
        } else {
          throw new Error(result.error);
        }
      }
      
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionStatus(`❌ Failed to connect to ${toolId}`);
      setTimeout(() => setConnectionStatus(''), 3000);
    }
    
    setIsImporting(false);
  };

  const handleImport = async (toolId: string) => {
    setIsImporting(true);
    setConnectionStatus(`Importing designs from ${toolId}...`);
    
    try {
      let response;
      
      if (toolId === 'figma') {
        response = await fetch('/api/figma', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'import',
            fileKey: 'demo-file-key',
            accessToken: 'figma-demo-token'
          })
        });
      } else if (toolId === 'adobe-xd') {
        response = await fetch('/api/adobe-xd', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'import',
            projectId: 'demo-project-id',
            accessToken: 'adobe-demo-token'
          })
        });
      }
      
      if (response) {
        const result = await response.json();
        
        if (result.success) {
          setImportedData(result.data);
          setConnectionStatus(`🎨 Successfully imported designs from ${toolId}!`);
        } else {
          throw new Error(result.error);
        }
      }
      
    } catch (error) {
      console.error('Import error:', error);
      setConnectionStatus(`❌ Failed to import from ${toolId}`);
    }
    
    setIsImporting(false);
    setTimeout(() => setConnectionStatus(''), 5000);
  };

  const handleGenerateCode = async () => {
    if (!importedData) {
      setConnectionStatus('❌ Please import designs first!');
      setTimeout(() => setConnectionStatus(''), 3000);
      return;
    }
    
    setIsImporting(true);
    setConnectionStatus('🚀 Generating React components...');
    
    try {
      const response = await fetch('/api/adobe-xd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'export',
          projectId: 'demo-project-id',
          accessToken: 'adobe-demo-token'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setConnectionStatus(`✨ Generated ${result.components.length} React components!`);
        console.log('Generated components:', result.components);
      } else {
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error('Code generation error:', error);
      setConnectionStatus('❌ Failed to generate code');
    }
    
    setIsImporting(false);
    setTimeout(() => setConnectionStatus(''), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
          <FaPalette className="text-2xl text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3">
          Design Tool Integration
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Connect your favorite design tools and import designs directly into Lightning Studio. 
          Seamless workflow from design to code.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        <motion.button
          {...magneticButton}
          onClick={() => {
            const connectedTool = tools.find(t => t.isConnected);
            if (connectedTool) {
              handleImport(connectedTool.id);
            } else {
              setConnectionStatus('⚠️ Please connect a design tool first!');
              setTimeout(() => setConnectionStatus(''), 3000);
            }
          }}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <FaDownload className="text-sm" />
          <span>Import Design</span>
        </motion.button>

        <motion.button
          {...magneticButton}
          onClick={handleGenerateCode}
          className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <FaCode className="text-sm" />
          <span>Generate Code</span>
        </motion.button>

        <motion.button
          {...magneticButton}
          onClick={() => {
            if (importedData) {
              setConnectionStatus('🔥 Opening live preview...');
              // In a real app, would open preview in new tab
              window.open('https://claude-fast-preview.vercel.app', '_blank');
            } else {
              setConnectionStatus('⚠️ Import designs first to see preview!');
              setTimeout(() => setConnectionStatus(''), 3000);
            }
          }}
          className="flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-500 hover:to-orange-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <FaEye className="text-sm" />
          <span>Preview Live</span>
        </motion.button>
      </motion.div>

      {/* Design Tools Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {tools.map((tool) => (
          <DesignToolCard
            key={tool.id}
            tool={tool}
            onConnect={handleConnect}
          />
        ))}
      </motion.div>

      {/* Import Status */}
      {(isImporting || connectionStatus) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-xl border border-white/20 text-white p-6 rounded-2xl shadow-2xl max-w-sm z-50"
        >
          <div className="flex items-center space-x-3">
            {isImporting && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              ></motion.div>
            )}
            <div>
              <h4 className="font-semibold">
                {isImporting ? 'Processing...' : 'Status Update'}
              </h4>
              <p className="text-sm opacity-90">
                {connectionStatus || 'Working on your request...'}
              </p>
            </div>
          </div>
          
          {/* Show imported data preview if available */}
          {importedData && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs text-white/80 mb-2">📊 Imported Data:</p>
              <div className="text-xs bg-white/10 rounded p-2">
                {importedData.fileName && <div>📁 {importedData.fileName}</div>}
                {importedData.components && <div>🧩 {importedData.components.length} components</div>}
                {importedData.artboards && <div>🎨 {importedData.artboards.length} artboards</div>}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Features Overview */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        <div className="text-center p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <FaSync className="text-xl text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Live Sync</h3>
          <p className="text-white/60 text-sm">Real-time synchronization between design tools and your codebase</p>
        </div>

        <div className="text-center p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <FaCode className="text-xl text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Auto Code Gen</h3>
          <p className="text-white/60 text-sm">Automatically generate production-ready code from your designs</p>
        </div>

        <div className="text-center p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <FaLayerGroup className="text-xl text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Design System</h3>
          <p className="text-white/60 text-sm">Maintain consistency with automated design system integration</p>
        </div>
      </motion.div>
    </div>
  );
}
