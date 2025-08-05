'use client'

import { motion } from 'framer-motion'
import { CheckIcon, StarIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for getting started',
    price: '$99',
    period: '/month',
    popular: false,
    features: [
      '5 apps per month',
      'Basic templates',
      'Standard deployment',
      'Email support',
      '1GB storage',
      'Basic analytics'
    ],
    gradient: 'from-gray-600 to-gray-800',
    buttonText: 'Start Free Trial'
  },
  {
    name: 'Professional',
    description: 'For growing businesses',
    price: '$299',
    period: '/month',
    popular: true,
    features: [
      '25 apps per month',
      'Premium templates',
      'Custom branding',
      'Priority support',
      '10GB storage',
      'Advanced analytics',
      'A/B testing',
      'Custom domains'
    ],
    gradient: 'from-purple-600 to-pink-600',
    buttonText: 'Start Professional'
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: '$999',
    period: '/month',
    popular: false,
    features: [
      'Unlimited apps',
      'White-label solution',
      'Custom integrations',
      'Dedicated support',
      'Unlimited storage',
      'Custom analytics',
      'API access',
      'SLA guarantee',
      'On-premise option'
    ],
    gradient: 'from-blue-600 to-cyan-600',
    buttonText: 'Contact Sales'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechStart Inc',
    content: 'We replaced our entire 12-person dev team with Claude-to-Cash. Saved $2M annually and ship 10x faster.',
    rating: 5,
    avatar: '👩‍💻'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder, Digital Agency',
    content: 'Built 50+ client apps in 3 months. This platform is absolutely game-changing for agencies.',
    rating: 5,
    avatar: '👨‍💼'
  },
  {
    name: 'Dr. Amanda Wilson',
    role: 'CEO, MedTech Solutions',
    content: 'From prototype to FDA-compliant production app in 2 weeks. Incredible!',
    rating: 5,
    avatar: '👩‍⚕️'
  }
]

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Simple, Transparent</span>
            <br />
            <span className="text-white">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your business. All plans include our core AI engine, 
            beautiful UI generation, and automatic deployment.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  isAnnual ? 'translate-x-8' : 'translate-x-0'
                }`}
              ></div>
            </button>
            <span className={`text-lg ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual 
              <span className="ml-2 text-sm bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-semibold">
                (Save 20%)
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative glass-card ${
                plan.popular ? 'ring-2 ring-purple-500/50 scale-105' : ''
              } group hover:scale-105 transition-all duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <StarIcon className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-5xl font-bold gradient-text">
                    {isAnnual ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}` : plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>

                <button className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  plan.popular 
                    ? 'cyber-button' 
                    : 'glass-morphism hover:bg-white/10 text-white'
                }`}>
                  {plan.buttonText}
                </button>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                      <CheckIcon className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-12">
            <span className="gradient-text">Trusted by Industry Leaders</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card text-left"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
