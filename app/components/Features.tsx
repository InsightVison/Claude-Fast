'use client'

import { motion } from 'framer-motion'
import { 
  RocketLaunchIcon, 
  CpuChipIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon,
  BoltIcon,
  CubeTransparentIcon,
  CloudArrowUpIcon,
  ChartBarSquareIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: RocketLaunchIcon,
    title: 'Lightning-Fast Generation',
    description: 'From prompt to production-ready app in under 10 minutes. No more months stuck on localhost.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: CpuChipIcon,
    title: 'AI-Powered Intelligence',
    description: 'Advanced AI understands your business requirements and generates enterprise-grade code automatically.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: GlobeAltIcon,
    title: '3000+ Integrations',
    description: 'Connect to Zoho, Jitterbug, Stripe, Shopify, and thousands more services with one-click integration.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security',
    description: 'Bank-level security, compliance ready, and audit trails built-in from day one.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: BoltIcon,
    title: 'Instant Deployment',
    description: 'Auto-deploy to AWS, Azure, or GCP with CI/CD pipelines, SSL certificates, and custom domains.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: CubeTransparentIcon,
    title: 'Glassmorphism UI',
    description: 'Stunning, modern interfaces with animations and micro-interactions that wow your users.',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: CloudArrowUpIcon,
    title: 'Auto-Scaling Infrastructure',
    description: 'Handle millions of users with auto-scaling infrastructure that grows with your business.',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    icon: ChartBarSquareIcon,
    title: 'Business Analytics',
    description: 'Built-in analytics, user tracking, revenue insights, and performance monitoring out of the box.',
    gradient: 'from-pink-500 to-rose-500'
  }
]

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Everything You Need</span>
            <br />
            <span className="text-white">To Dominate Software</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Replace entire development teams with our AI-powered platform. 
            Build faster, scale bigger, and crush the competition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card group hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gradient-to-r group-hover:from-cyan-500/50 group-hover:to-purple-500/50 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-morphism rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="gradient-text">Ready to Replace Your Dev Team?</span>
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Join thousands of businesses already using AI to build better software faster.
            </p>
            <button className="cyber-button rounded-2xl px-8 py-4 font-semibold text-lg">
              Start Your Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
