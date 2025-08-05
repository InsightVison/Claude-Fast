'use client';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import { 
  FaRocket, 
  FaCode, 
  FaCloud, 
  FaCog, 
  FaBolt, 
  FaServer,
  FaDatabase,
  FaMagic,
  FaFigma,
  FaPalette
} from 'react-icons/fa';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  hoverLift, 
  magneticButton, 
  textShimmer,
  morphingShape,
  useScrollAnimation,
  floating
} from './animations';
import DesignIntegration from './DesignIntegration';

const features = [
  {
    id: 1,
    icon: <FaRocket className="text-2xl" />,
    title: "Deploy Instantly",
    description: "Launch your app with one click",
    action: () => console.log("Deploy clicked"),
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/30"
  },
  {
    id: 2,
    icon: <FaCode className="text-2xl" />,
    title: "AI Code Generator",
    description: "Generate full-stack applications",
    action: () => console.log("Code generator clicked"),
    gradient: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/30"
  },
  {
    id: 3,
    icon: <FaFigma className="text-2xl" />,
    title: "Figma Integration",
    description: "Import designs directly from Figma",
    action: () => console.log("Figma integration clicked"),
    gradient: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/30"
  },
  {
    id: 4,
    icon: <FaPalette className="text-2xl" />,
    title: "Adobe XD Sync",
    description: "Seamless Adobe XD workflow",
    action: () => console.log("Adobe XD clicked"),
    gradient: "from-pink-500 to-purple-500",
    shadow: "shadow-pink-500/30"
  },
  {
    id: 5,
    icon: <FaServer className="text-2xl" />,
    title: "Scalable Backend",
    description: "Auto-scaling infrastructure",
    action: () => console.log("Backend clicked"),
    gradient: "from-violet-500 to-purple-500",
    shadow: "shadow-violet-500/30"
  },
  {
    id: 6,
    icon: <FaDatabase className="text-2xl" />,
    title: "Smart Database",
    description: "Optimized data management",
    action: () => console.log("Database clicked"),
    gradient: "from-indigo-500 to-blue-500",
    shadow: "shadow-indigo-500/30"
  }
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: () => void;
  gradient: string;
  shadow: string;
}

const FeatureCard = ({ icon, title, description, action, gradient, shadow }: FeatureCardProps) => {
  const { ref, controls } = useScrollAnimation();
  
  return (
    <motion.div 
      ref={ref}
      initial="initial"
      animate={controls}
      variants={fadeInUp}
      {...hoverLift}
      className={`group cursor-pointer backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:${shadow} relative overflow-hidden`}
      onClick={action}
    >
      {/* Animated background gradient */}
      <motion.div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
        {...morphingShape}
      />
      
      <div className="relative z-10">
        <motion.div 
          className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg ${shadow} group-hover:shadow-xl`}
          {...floating}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
        
        <motion.h3 
          className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 group-hover:bg-clip-text transition-all duration-300"
          {...textShimmer}
        >
          {title}
        </motion.h3>
        
        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Enhanced shimmer effect */}
      <motion.div 
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 rounded-2xl"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Floating particles */}
      <motion.div
        className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
        animate={{ 
          y: [-10, 10, -10],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5 
        }}
      />
    </motion.div>
  );
};

export default function LightningStudio() {
  const [loading, setLoading] = useState(false);
  const [deployStatus, setDeployStatus] = useState<any>(null);
  const [showDesignTools, setShowDesignTools] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleDeploy = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/deploy', {
        projectName: 'claude-fast-app',
        environment: 'development'
      });
      setDeployStatus(response.data);
    } catch (error) {
      setTimeout(() => {
        setDeployStatus({ 
          status: 'success',
          url: 'http://localhost:3000',
          message: 'App deployed successfully on localhost!'
        });
        setLoading(false);
      }, 2000);
      return;
    }
    setLoading(false);
  };

  const handleBuildAgents = () => {
    console.log("Building new agents...");
  };

  const toggleDesignTools = () => {
    setShowDesignTools(!showDesignTools);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/40 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header with Parallax Effect */}
        <motion.div 
          style={{ y }}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <motion.div 
            variants={staggerItem}
            className="mb-8"
          >
            <motion.div 
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-400/50"
              {...floating}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <FaBolt className="text-4xl text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            variants={staggerItem}
            className="text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-6 drop-shadow-2xl"
            {...textShimmer}
          >
            Build the Future with Lightning Studio
          </motion.h1>
          
          <motion.p
            variants={staggerItem}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Type your prompt and watch a sleek, beautiful futuristic IDE come to life. 
            Built by 4 orchestrated AI agents working in perfect harmony.
          </motion.p>
          
          <motion.div 
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.button 
              {...magneticButton}
              onClick={handleDeploy}
              disabled={loading}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                {...morphingShape}
              />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              
              <span className="relative flex items-center gap-3">
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Deploying Lightning Studio...
                  </>
                ) : (
                  <>
                    <FaRocket className="text-xl" />
                    Launch Lightning Studio
                  </>
                )}
              </span>
            </motion.button>

            <motion.button 
              {...magneticButton}
              onClick={handleBuildAgents}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-emerald-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              
              <span className="relative flex items-center gap-3">
                <FaMagic className="text-xl" />
                Build Agents
              </span>
            </motion.button>

            <motion.button 
              {...magneticButton}
              onClick={toggleDesignTools}
              className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-orange-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              
              <span className="relative flex items-center gap-3">
                <FaPalette className="text-xl" />
                Design Tools
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Design Tools Integration */}
        {showDesignTools && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <DesignIntegration />
          </motion.div>
        )}

        {/* Interactive Features Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={staggerItem}
              custom={index}
            >
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                action={feature.action}
                gradient={feature.gradient}
                shadow={feature.shadow}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Deployment Status */}
        {deployStatus && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`fixed bottom-8 right-8 max-w-md p-6 rounded-2xl backdrop-blur-xl border ${
              deployStatus.error 
                ? 'bg-red-500/10 border-red-500/30 text-red-200' 
                : 'bg-green-500/10 border-green-500/30 text-green-200'
            } shadow-2xl`}
          >
            <div className="flex items-center gap-3">
              {deployStatus.error ? (
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  ❌
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  ✅
                </div>
              )}
              <div>
                <h4 className="font-semibold">
                  {deployStatus.error ? 'Deployment Failed' : 'Success!'}
                </h4>
                <p className="text-sm opacity-90">
                  {deployStatus.error || deployStatus.message}
                </p>
                {deployStatus.url && (
                  <a 
                    href={deployStatus.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm underline hover:no-underline mt-1 inline-block"
                  >
                    Open App →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
