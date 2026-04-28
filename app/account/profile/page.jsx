"use client";

import { useState, useEffect } from "react";
import { User, Mail, Lock, ArrowLeft, LogOut, Save } from "lucide-react";
import { useUser } from "@/utils/useUser";

export default function ProfilePage() {
  const { data: user, loading: userLoading } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      if (typeof window !== "undefined") {
        window.location.href = "/account/signin";
      }
    } else if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user, userLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    if (formData.newPassword || formData.confirmPassword) {
      if (formData.newPassword.length < 8) {
        setError("New password must be at least 8 characters");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError("Passwords don't match");
        return;
      }
    }

    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Update failed");
      }

      setSuccess("Profile updated successfully! 💙");
      setFormData({ ...formData, newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#0F0F14] to-[#1A1B25] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3D9DF6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-poppins text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#0F0F14] to-[#1A1B25] p-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        {/* Back to Home */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-white text-opacity-60 hover:text-opacity-100 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-poppins text-sm">Back to Blue</span>
        </a>

        {/* Profile Card */}
        <div className="bg-[#1A1B25] rounded-2xl p-8 border border-[#262630] shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 bg-gradient-to-br from-[#3D9DF6] to-[#2563EB] flex items-center justify-center"
                style={{
                  borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
                }}
              >
                <User size={28} className="text-white" />
              </div>
              <div>
                <h1 className="font-poppins font-bold text-white text-2xl">
                  Your Profile
                </h1>
                <p className="font-poppins text-white text-opacity-60 text-sm">
                  Manage your account settings
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <a
              href="/account/logout"
              className="flex items-center gap-2 px-4 py-2 bg-red-500 bg-opacity-10 hover:bg-opacity-20 text-red-400 rounded-lg transition-all font-poppins text-sm"
            >
              <LogOut size={18} />
              Logout
            </a>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-3 mb-6">
              <p className="font-poppins text-green-400 text-sm text-center">
                {success}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-3 mb-6">
              <p className="font-poppins text-red-400 text-sm text-center">
                {error}
              </p>
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Email Field (Read-only) */}
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
                  disabled
                  className="w-full bg-[#262630] bg-opacity-50 text-white text-opacity-50 placeholder-gray-500 rounded-lg pl-12 pr-4 py-3 font-poppins text-sm cursor-not-allowed"
                />
              </div>
              <p className="font-poppins text-white text-opacity-40 text-xs mt-2">
                Email cannot be changed
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#262630] pt-6">
              <h3 className="font-poppins text-white font-semibold mb-4">
                Change Password (Optional)
              </h3>

              {/* New Password Field */}
              <div className="mb-4">
                <label className="font-poppins text-white text-sm mb-2 block">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-opacity-40"
                  />
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    placeholder="At least 8 characters"
                    className="w-full bg-[#262630] text-white placeholder-gray-500 rounded-lg pl-12 pr-4 py-3 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#3D9DF6] transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label className="font-poppins text-white text-sm mb-2 block">
                  Confirm New Password
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
                    placeholder="Re-enter your new password"
                    className="w-full bg-[#262630] text-white placeholder-gray-500 rounded-lg pl-12 pr-4 py-3 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#3D9DF6] transition-all"
                    disabled={loading}
                  />
                </div>
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
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </form>
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
