"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AuthNotifications() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      toast.success(
        `Welcome back, ${session.user.name || "User"}! 🚀`,
        {
          duration: 4000,
          style: {
            background: "rgba(147, 51, 234, 0.9)",
            color: "white",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#9333ea",
          },
        }
      );
    }
  }, [session, status]);

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(31, 41, 55, 0.9)",
          color: "white",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    />
  );
}
