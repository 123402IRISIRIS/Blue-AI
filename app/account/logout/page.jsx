"use client";

import { useEffect } from "react";
import useAuth from "@/utils/useAuth";

export default function LogoutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut({
          callbackUrl: "/",
          redirect: true,
        });
      } catch (error) {
        console.error("Logout error:", error);
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }
    };

    logout();
  }, [signOut]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#0F0F14] to-[#1A1B25] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#3D9DF6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-poppins text-white text-lg">Logging out...</p>
      </div>

      <style jsx>{`
        .font-poppins {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
}
