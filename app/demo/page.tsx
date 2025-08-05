'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaFigma, 
  FaCode, 
  FaPalette,
  FaRocket,
  FaBolt,
  FaMagic
} from 'react-icons/fa';
import { SiAdobexd, SiFramer } from 'react-icons/si';
import LightningStudio from '../components/LightningStudio';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  hoverLift, 
  magneticButton,
  floating,
  morphingShape,
  textShimmer
} from '../components/animations';

export default function AnimationDemo() {
  const [isPlaying, setIsPlaying] = useState(true);

  const demoFeatures = [
    {
      icon: <SiFramer className="text-2xl" />,
      title: "Framer Motion",
      description: "Advanced animations with physics-based transitions",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaFigma className="text-2xl" />,
      title: "Figma Integration",
      description: "Import designs directly from Figma to code",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <SiAdobexd className="text-2xl" />,
      title: "Adobe XD Sync",
      description: "Seamless workflow with Adobe Creative Suite",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      icon: <FaCode className="text-2xl" />,
      title: "Live Code Generation",
      description: "Real-time code generation from design files",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Enhanced Background with Animations */}
      <div className="absolute inset-0">
        {/* Animated Orbs */}
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl"
          {...floating}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/40 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl"
          {...morphingShape}
        />

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Demo Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="container mx-auto px-6 py-12 text-center"
        >
          <motion.div variants={staggerItem} className="mb-8">
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl"
              {...floating}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <FaBolt className="text-3xl text-white" />
            </motion.div>
          </motion.div>

          <motion.h1 
            variants={staggerItem}
            className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-6"
            {...textShimmer}
          >
            Enhanced Lightning Studio
          </motion.h1>

          <motion.p 
            variants={staggerItem}
            className="text-xl text-white/80 mb-8 max-w-3xl mx-auto"
          >
            Experience advanced Framer Motion animations with Figma and Adobe XD integration. 
            The future of design-to-code workflow is here.
          </motion.p>

          {/* Animation Controls */}
          <motion.div 
            variants={staggerItem}
            className="flex justify-center gap-4 mb-12"
          >
            <motion.button
              {...magneticButton}
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
              <span>{isPlaying ? 'Pause' : 'Play'} Animations</span>
            </motion.button>

            <motion.button
              {...magneticButton}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaRocket />
              <span>Deploy Demo</span>
            </motion.button>
          </motion.div>

          {/* Enhanced Features Demo */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                {...hoverLift}
                className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Animated background */}
                <motion.div 
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
                  {...morphingShape}
                />

                <div className="relative z-10">
                  <motion.div 
                    className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 rounded-2xl"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Lightning Studio Component */}
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <LightningStudio />
          </motion.div>
        </div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="container mx-auto px-6 py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              {...hoverLift}
              className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <motion.div 
                className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                60 FPS
              </motion.div>
              <p className="text-white/60">Smooth Animations</p>
            </motion.div>

            <motion.div
              {...hoverLift}
              className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <motion.div 
                className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                &lt;2ms
              </motion.div>
              <p className="text-white/60">Response Time</p>
            </motion.div>

            <motion.div
              {...hoverLift}
              className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <motion.div 
                className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                4 Agents
              </motion.div>
              <p className="text-white/60">AI Orchestration</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
