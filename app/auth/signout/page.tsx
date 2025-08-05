"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function SignOut() {
  useEffect(() => {
    // Auto sign out after component mounts
    const timer = setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="glass-card p-8 rounded-2xl text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <FaCheckCircle className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">You're Signed Out</h1>
            <p className="text-white/70">Thanks for using Claude Fast. You'll be redirected shortly.</p>
          </div>

          <div className="space-y-4">
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full animate-pulse"></div>
            </div>

            <p className="text-white/60 text-sm">Redirecting in 3 seconds...</p>
          </div>

          <div className="mt-8 space-y-4">
            <Link
              href="/"
              className="w-full btn-primary px-6 py-3 rounded-xl flex items-center justify-center space-x-3 hover:scale-105 transition-all duration-300"
            >
              <FaHome className="text-white" />
              <span className="text-white font-medium">Go to Home</span>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full btn-secondary px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-white/80 font-medium">Sign Out Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
