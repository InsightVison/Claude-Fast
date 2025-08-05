"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="glass-card p-4 rounded-xl">
        <div className="animate-pulse flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full"></div>
          <div className="w-20 h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="glass-card p-4 rounded-xl flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
            )}
          </div>
          <div className="text-white">
            <p className="font-medium text-sm">{session.user?.name}</p>
            <p className="text-xs opacity-70">{session.user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="btn-secondary p-2 rounded-lg hover:bg-red-500/20 transition-all duration-300"
          title="Sign Out"
        >
          <FaSignOutAlt className="text-white" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="btn-primary px-6 py-3 rounded-xl flex items-center space-x-3 hover:scale-105 transition-all duration-300"
    >
      <FaGoogle className="text-white" />
      <span className="text-white font-medium">Sign in with Google</span>
    </button>
  );
}
