'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-morphism rounded-full px-6 py-3 mb-8 group hover:scale-105 transition-all duration-300"
          >
            <SparklesIcon className="h-5 w-5 text-cyan-400 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Powered by AI • Lightning Fast • Enterprise Ready
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">
              From Prompt to
            </span>
            <br />
            <span className="text-white">
              Production in
            </span>
            <br />
            <span className="gradient-text animate-pulse">
              10 Minutes
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transform natural language into stunning full-stack applications with enterprise-grade UI, 
            3000+ integrations, and automatic deployment. 
            <span className="gradient-text font-semibold"> The future of software development is here.</span>
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="glass-card text-center min-w-[120px]">
              <div className="text-3xl font-bold gradient-text">3000+</div>
              <div className="text-gray-400 text-sm">Integrations</div>
            </div>
            <div className="glass-card text-center min-w-[120px]">
              <div className="text-3xl font-bold gradient-text">1M+</div>
              <div className="text-gray-400 text-sm">Potential Clients</div>
            </div>
            <div className="glass-card text-center min-w-[120px]">
              <div className="text-3xl font-bold gradient-text">10x</div>
              <div className="text-gray-400 text-sm">Faster</div>
            </div>
            <div className="glass-card text-center min-w-[120px]">
              <div className="text-3xl font-bold gradient-text">$0</div>
              <div className="text-gray-400 text-sm">Dev Costs</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => router.push('/generate')}
              className="cyber-button rounded-2xl px-8 py-4 font-semibold text-lg flex items-center gap-3 group"
            >
              <span>Start Building Now</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => router.push('/demo')}
              className="glass-morphism rounded-2xl px-8 py-4 font-semibold text-lg text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Watch Demo
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 to-transparent rounded-full animate-pulse"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
