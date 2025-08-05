import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Claude-to-Cash | AI Business Generator',
  description: 'Transform prompts into production-ready businesses with beautiful UIs in minutes. The future of software development.',
  keywords: 'AI, business generator, full-stack, Next.js, glassmorphism, deployment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="fixed inset-0 -z-10">
          {/* Animated Background Orbs */}
          <div className="floating-orb w-72 h-72 top-10 -left-20 animate-gradient-x"></div>
          <div className="floating-orb w-96 h-96 top-1/2 -right-32 animate-gradient-y animation-delay-2000"></div>
          <div className="floating-orb w-64 h-64 bottom-20 left-1/3 animate-gradient-xy animation-delay-4000"></div>
        </div>
        
        <Providers>
          {children}
        </Providers>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}
