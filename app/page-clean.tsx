'use client';
import Link from 'next/link';
import AuthButton from './components/AuthButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 h-72 top-10 -left-20 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 top-1/2 -right-32 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute w-64 h-64 bottom-20 left-1/3 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ⚡ Claude Fast
              </h1>
              <span className="text-sm text-gray-400 hidden sm:inline">AI Business Generator</span>
            </div>
            <div className="flex items-center space-x-4">
              <AuthButton />
              <Link 
                href="/dashboard"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 px-4 py-2 rounded-lg text-white font-medium transition-all"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Build AI Apps <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">Without Coding</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Transform your ideas into production-ready AI businesses in minutes. Beautiful UIs, full-stack functionality, and monetization built-in.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/dashboard"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 px-8 py-3 rounded-lg text-white font-semibold transition-all"
          >
            Start Building - It's Free
          </Link>
          <Link 
            href="/demo"
            className="border border-gray-500 hover:border-gray-400 hover:bg-gray-800/50 px-8 py-3 rounded-lg text-white font-semibold transition-all"
          >
            Watch Demo
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Build & Scale
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="🤖"
            title="AI-Powered Generation"
            description="Describe your app idea and watch our AI generate full-stack code, beautiful UIs, and deployment configs."
          />
          <FeatureCard
            icon="⚡"
            title="Real-time Preview"
            description="See your app come to life instantly. Every change is reflected in real-time with hot reload."
          />
          <FeatureCard
            icon="🚀"
            title="One-Click Deploy"
            description="Deploy to production in seconds with our integrated hosting. Scale automatically as you grow."
          />
          <FeatureCard
            icon="🎨"
            title="Beautiful Templates"
            description="Start with professionally designed templates. Glassmorphism, dark themes, and modern layouts."
          />
          <FeatureCard
            icon="💰"
            title="Built-in Monetization"
            description="Payment processing, subscription management, and analytics built right into your app."
          />
          <FeatureCard
            icon="⚡"
            title="Lightning Fast"
            description="Optimized for speed. Your users get blazing fast experiences with our performance-first approach."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="glass-card p-12 rounded-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators building amazing AI apps with Claude Fast.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 px-8 py-4 rounded-lg text-white font-semibold transition-all text-lg"
            >
              Start Building Now
            </Link>
            <Link 
              href="/pricing"
              className="border border-gray-500 hover:border-gray-400 hover:bg-gray-800/50 px-8 py-4 rounded-lg text-white font-semibold transition-all text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Claude Fast
              </h3>
              <p className="text-gray-400">
                The future of AI-powered app development.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/tutorials" className="hover:text-white transition-colors">Tutorials</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Claude Fast. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: string; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
