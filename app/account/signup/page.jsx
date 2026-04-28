"use client";

import { useState } from "react";
import { UserPlus, Mail, Lock, User, ArrowLeft } from "lucide-react";
import useAuth from "@/utils/useAuth";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUpWithCredentials } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      await signUpWithCredentials({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessages = {
        CredentialsSignin:
          "This email is already registered. Try signing in instead.",
        EmailCreateAccount: "This email can't be used. It may already exist.",
      };
      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#0F0F14] to-[#1A1B25] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-white text-opacity-60 hover:text-opacity-100 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-poppins text-sm">Back to Blue</span>
        </a>

        {/* Signup Card */}
        <div className="bg-[#1A1B25] rounded-2xl p-8 border border-[#262630] shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#3D9DF6] to-[#2563EB] flex items-center justify-center"
              style={{
                borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
              }}
            >
              <span className="text-3xl">💙</span>
            </div>
            <h1 className="font-poppins font-bold text-white text-2xl mb-2">
              Join Blue
            </h1>
            <p className="font-poppins text-white text-opacity-60 text-sm">
              Create your account to save your conversations
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-3 mb-6">
              <p className="font-poppins text-red-400 text-sm text-center">
                {error}
              </p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="font-poppins text-white text-sm mb-2 block">
                Name
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-opacity-40"
                />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="w-full bg-[#262630] text-white placeholder-gray-500 rounded-lg pl-12 pr-4 py-3 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#3D9DF6] transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="font-poppins text-white text-sm mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-opacity-40"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  className="w-full bg-[#262630] text-white placeholder-gray-500 rounded-lg pl-12 pr-4 py-3 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#3D9DF6] transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="font-poppins text-white text-sm mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-opacity-40"
                />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="At least 8 characters"
                  className="w-full bg-[#262630] text-white placeholder-gray-500 rounded-lg pl-12 pr-4 py-3 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#3D9DF6] transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="font-poppins text-white text-sm mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-opacity-40"
                />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Re-enter your password"
                  className="w-full bg-[#262630] text-white placeholder-gray-500 rounded-lg pl-12 pr-4 py-3 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#3D9DF6] transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#3D9DF6] to-[#2563EB] hover:from-[#2D8DE6] hover:to-[#1D53DB] text-white font-poppins font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="font-poppins text-white text-opacity-60 text-sm">
              Already have an account?{" "}
              <a
                href="/account/signin"
                className="text-[#3D9DF6] hover:text-[#2D8DE6] font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
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
