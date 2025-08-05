'use client'

import { motion } from 'framer-motion'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'

const footerLinks = [
  {
    title: 'Product',
    links: [
      { name: 'App Generator', href: '/generate' },
      { name: 'Templates', href: '/templates' },
      { name: 'Integrations', href: '/integrations' },
      { name: 'Deployment', href: '/deploy' },
      { name: 'Analytics', href: '/analytics' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { name: 'For Agencies', href: '/agencies' },
      { name: 'For Startups', href: '/startups' },
      { name: 'For Enterprise', href: '/enterprise' },
      { name: 'For Developers', href: '/developers' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: '/community' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' }
    ]
  }
]

const socialLinks = [
  { name: 'Twitter', href: '#', icon: '𝕏' },
  { name: 'LinkedIn', href: '#', icon: '💼' },
  { name: 'GitHub', href: '#', icon: '🐙' },
  { name: 'Discord', href: '#', icon: '💬' }
]

export function Footer() {
  return (
    <footer className="relative bg-black/50 backdrop-blur-xl border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 relative">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold gradient-text mb-4">
                  Claude-to-Cash
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  The AI-powered platform that transforms prompts into production-ready 
                  applications. Build faster, scale bigger, dominate your market.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-400">
                    <EnvelopeIcon className="h-5 w-5 text-cyan-400" />
                    <span>hello@claude-to-cash.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <PhoneIcon className="h-5 w-5 text-cyan-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPinIcon className="h-5 w-5 text-cyan-400" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 glass-morphism rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                    >
                      <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {footerLinks.map((section, index) => (
              <div key={section.title} className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-semibold mb-4 text-lg">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                        >
                          <span>{link.name}</span>
                          <ArrowTopRightOnSquareIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 border-t border-white/10"
        >
          <div className="glass-morphism rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Stay Ahead of the Curve</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Get weekly insights on AI development, new features, and exclusive access to beta releases.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button className="cyber-button rounded-xl px-6 py-3 font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 Claude-to-Cash. All rights reserved.
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
