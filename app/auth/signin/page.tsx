"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaGoogle, FaRocket, FaLock, FaBolt } from "react-icons/fa";
import Link from "next/link";

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setupProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setupProviders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs with enhanced glow */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/40 to-blue-500/40 rounded-full blur-3xl animate-pulse shadow-2xl shadow-cyan-400/30"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-purple-500/50 to-pink-500/40 rounded-full blur-3xl animate-pulse delay-1000 shadow-2xl shadow-purple-500/30"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full blur-3xl animate-pulse delay-500 shadow-xl shadow-emerald-400/20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-violet-500/40 to-indigo-500/40 rounded-full blur-3xl animate-pulse delay-300 shadow-2xl shadow-violet-500/25"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full opacity-70 animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-ping delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50 animate-ping delay-1000"></div>
      </div>

      {/* Grid overlay for futuristic feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

      <div className="relative z-10 max-w-lg w-full mx-auto">
        {/* Main Sign-in Container - More fluid design */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl text-center shadow-2xl shadow-purple-500/20 hover:shadow-cyan-500/30 transition-all duration-700 hover:scale-[1.02] hover:bg-white/8">
          <div className="mb-10">
            {/* Glowing logo with enhanced effects */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-400/50 animate-pulse hover:shadow-cyan-400/70 transition-all duration-500 hover:scale-110">
              <FaRocket className="text-3xl text-white drop-shadow-lg animate-bounce" />
            </div>
            
            {/* Enhanced title with glow effect */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-3 drop-shadow-2xl">
              Claude Fast
            </h1>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-4 opacity-60"></div>
            <p className="text-white/80 text-lg font-light tracking-wide">
              Where AI meets <span className="text-cyan-400 font-semibold">infinite possibilities</span>
            </p>
          </div>

          {/* Enhanced Features Grid - More fluid design */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="group backdrop-blur-sm bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 p-6 rounded-2xl hover:bg-cyan-500/20 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/30">
              <FaBolt className="text-yellow-400 text-2xl mb-3 mx-auto drop-shadow-lg group-hover:animate-pulse" />
              <p className="text-white/90 text-sm font-medium">Lightning Fast</p>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group backdrop-blur-sm bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-400/20 p-6 rounded-2xl hover:bg-emerald-500/20 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-emerald-400/30">
              <FaLock className="text-emerald-400 text-2xl mb-3 mx-auto drop-shadow-lg group-hover:animate-pulse" />
              <p className="text-white/90 text-sm font-medium">Ultra Secure</p>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Enhanced Sign-in Buttons */}
          <div className="space-y-6">
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
                  className="group w-full relative overflow-hidden bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80 backdrop-blur-sm border border-white/20 px-8 py-5 rounded-2xl flex items-center justify-center space-x-4 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/40 hover:border-white/40"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
                  
                  <FaGoogle className="text-white text-2xl drop-shadow-lg relative z-10 group-hover:animate-pulse" />
                  <span className="text-white font-semibold text-lg relative z-10 tracking-wide">
                    Continue with {provider.name}
                  </span>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 transition-all duration-500 blur-xl"></div>
                </button>
              ))}
          </div>

          {/* Enhanced legal text with better styling */}
          <div className="mt-8 pt-6 border-t border-gradient-to-r from-transparent via-white/20 to-transparent">
            <p className="text-white/60 text-sm leading-relaxed">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 hover:decoration-cyan-300 transition-all duration-300 font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 hover:decoration-cyan-300 transition-all duration-300 font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Enhanced Back to Home link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="group inline-flex items-center space-x-2 text-white/70 hover:text-white transition-all duration-500 text-sm hover:scale-105"
          >
            <span className="group-hover:animate-pulse">←</span>
            <span className="relative">
              Back to Home
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
            </span>
          </Link>
        </div>
        
        {/* Floating elements for extra flair */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-sm animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
