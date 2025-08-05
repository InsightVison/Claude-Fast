'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GoogleAuthButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (status === 'loading') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 px-4 py-2 rounded-xl shadow-lg"
      >
        <div className="animate-pulse flex items-center space-x-2">
          <div className="w-5 h-5 bg-gradient-to-r from-cyan-400/50 to-purple-400/50 rounded-full"></div>
          <div className="w-20 h-4 bg-gradient-to-r from-gray-600/50 to-gray-500/50 rounded"></div>
        </div>
      </motion.div>
    );
  }

  if (session) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
        <motion.img 
          whileHover={{ scale: 1.1 }}
          src={session.user?.image || '/default-avatar.png'} 
          alt="User avatar" 
          className="w-10 h-10 rounded-full border-2 border-gradient-to-r from-cyan-400 to-purple-400 shadow-lg shadow-cyan-400/30"
        />
        <span className="text-white/90 hidden sm:inline font-medium bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
          {session.user?.name}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={async () => {
            setIsLoading(true);
            await signOut();
            setIsLoading(false);
          }}
          disabled={isLoading}
          className="group relative overflow-hidden bg-gradient-to-r from-red-600/80 to-pink-600/80 hover:from-red-500/90 hover:to-pink-500/90 border border-red-500/50 hover:border-red-400/70 text-white px-4 py-2 rounded-xl transition-all backdrop-blur-sm shadow-lg hover:shadow-red-500/30"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
          
          <span className="relative font-medium">
            {isLoading ? 'Signing out...' : 'Sign Out'}
          </span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={async () => {
        setIsLoading(true);
        await signIn('google', { callbackUrl: '/dashboard' });
        setIsLoading(false);
      }}
      disabled={isLoading}
      className="group relative overflow-hidden flex items-center gap-3 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80 hover:from-blue-500/90 hover:via-purple-500/90 hover:to-pink-500/90 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-xl font-medium transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/40"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
      
      <FcGoogle className="text-2xl relative z-10 group-hover:animate-pulse" />
      <span className="relative z-10 tracking-wide">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Signing in...
          </div>
        ) : (
          <>
            <span className="hidden sm:inline">Sign in with Google</span>
            <span className="sm:hidden">Sign in</span>
          </>
        )}
      </span>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 transition-all duration-500 blur-xl"></div>
    </motion.button>
  );
}
