'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dramatic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-cyan-900/50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Main CTA Content */}
          <div className="glass-morphism rounded-3xl p-12 md:p-16 relative overflow-hidden">
            {/* Animated Border Effect */}
            <div className="absolute inset-0 rounded-3xl">
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mask-border animate-gradient-x"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <RocketLaunchIcon className="h-16 w-16 mx-auto mb-6 text-cyan-400 animate-bounce-slow" />
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Ready to Dominate</span>
                <br />
                <span className="text-white">Software Development?</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join the AI revolution. Build enterprise-grade applications in minutes, 
                not months. Scale to millions of users with zero technical debt.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text">10,000+</div>
                  <div className="text-gray-400">Apps Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text">$50M+</div>
                  <div className="text-gray-400">Dev Costs Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text">99.9%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cyber-button rounded-2xl px-12 py-5 font-bold text-xl flex items-center gap-3 group shadow-2xl shadow-cyan-500/25"
                >
                  <span>Start Building Now</span>
                  <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-morphism rounded-2xl px-12 py-5 font-bold text-xl text-white hover:bg-white/10 transition-all duration-300 border border-white/20"
                >
                  Schedule Demo
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="text-center text-gray-400">
                <p className="mb-4">Trusted by 10,000+ businesses worldwide</p>
                <div className="flex justify-center items-center gap-8 opacity-60">
                  <div className="text-2xl font-bold">TechCorp</div>
                  <div className="text-2xl font-bold">StartupXYZ</div>
                  <div className="text-2xl font-bold">MegaInc</div>
                  <div className="text-2xl font-bold">InnovateCo</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Urgency Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="glass-morphism rounded-2xl px-8 py-4 inline-flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">
                Limited Time: Get 3 months free with annual plans
              </span>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
