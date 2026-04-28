"use client";

import { useState } from "react";

export default function ArchitectureSlide() {
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    {
      id: "user",
      title: "👤 User",
      description: "Teen (ages 10-18) types message",
      color: "from-gray-100 to-gray-200",
      borderColor: "border-gray-400",
      details: "User initiates conversation through chat interface",
    },
    {
      id: "frontend",
      title: "🖥 React Frontend",
      description: "Chat interface built with React",
      color: "from-blue-50 to-blue-100",
      borderColor: "border-blue-400",
      details: "Clean, age-appropriate UI using React.js + TailwindCSS",
    },
    {
      id: "backend",
      title: "🛠 Backend Server",
      description: "Node.js API routes",
      color: "from-purple-50 to-purple-100",
      borderColor: "border-purple-400",
      details: "Handles requests, validates data, manages database",
    },
    {
      id: "gpt",
      title: "🤖 OpenAI GPT API",
      description: "Large language model for conversation",
      color: "from-green-50 to-green-100",
      borderColor: "border-green-400",
      details: "GPT-4 API provides natural language understanding",
    },
  ];

  const safetyLayers = [
    {
      id: "prompt",
      title: "🧠 Structured System Prompt",
      description: "Defines identity, boundaries, mission",
      color: "from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-500",
      details: "Controls AI personality, safety rules, ethical guidelines",
    },
    {
      id: "assessment",
      title: "📊 Clinical Assessment Engine",
      description: "PHQ-9, GAD-7, C-SSRS frameworks",
      color: "from-orange-50 to-orange-100",
      borderColor: "border-orange-500",
      details: "Evidence-based screening tools used by hospitals",
    },
    {
      id: "validator",
      title: "🛡 Risk & Criteria Validator",
      description: "Multi-factor crisis confirmation",
      color: "from-red-50 to-red-100",
      borderColor: "border-red-500",
      details: "Verifies genuine threat + complete assessment + not prank",
    },
    {
      id: "prank",
      title: "🎭 Prank Filter",
      description: "Detects false alarms",
      color: "from-pink-50 to-pink-100",
      borderColor: "border-pink-500",
      details: 'Filters "lol jk", playful emojis, contradictory signals',
    },
    {
      id: "geo",
      title: "📍 Geo Crisis Matching",
      description: "Finds local resources (77 countries)",
      color: "from-indigo-50 to-indigo-100",
      borderColor: "border-indigo-500",
      details: "IP → Location → Local crisis line database",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Blue Architecture
          </h1>
          <p className="text-xl text-blue-200">Multi-Layer Safety System</p>
          <p className="text-sm text-blue-300 mt-2">
            Click any component to see details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Main Flow */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Main Data Flow
              </h2>

              <div className="space-y-4">
                {layers.map((layer, index) => (
                  <div key={layer.id}>
                    <button
                      onClick={() =>
                        setActiveLayer(
                          activeLayer === layer.id ? null : layer.id,
                        )
                      }
                      className={`w-full bg-gradient-to-r ${layer.color} ${layer.borderColor} border-2 rounded-lg p-4 text-left hover:scale-105 transition-all duration-200 shadow-lg ${
                        activeLayer === layer.id
                          ? "ring-4 ring-white ring-opacity-50"
                          : ""
                      }`}
                    >
                      <div className="font-bold text-gray-900 text-lg mb-1">
                        {layer.title}
                      </div>
                      <div className="text-sm text-gray-700">
                        {layer.description}
                      </div>
                      {activeLayer === layer.id && (
                        <div className="mt-3 pt-3 border-t border-gray-400 text-xs text-gray-800 font-medium">
                          {layer.details}
                        </div>
                      )}
                    </button>

                    {index < layers.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="text-4xl text-white opacity-50">↓</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Database */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
              <h2 className="text-xl font-bold text-white mb-4">
                Data Storage
              </h2>
              <button
                onClick={() =>
                  setActiveLayer(activeLayer === "database" ? null : "database")
                }
                className={`w-full bg-gradient-to-r from-teal-50 to-teal-100 border-teal-500 border-2 rounded-lg p-4 text-left hover:scale-105 transition-all duration-200 shadow-lg ${
                  activeLayer === "database"
                    ? "ring-4 ring-white ring-opacity-50"
                    : ""
                }`}
              >
                <div className="font-bold text-gray-900 text-lg mb-1">
                  💾 Secure Database
                </div>
                <div className="text-sm text-gray-700">
                  PostgreSQL - Logged-in users only
                </div>
                {activeLayer === "database" && (
                  <div className="mt-3 pt-3 border-t border-teal-400 text-xs text-gray-800 font-medium">
                    Stores conversations, crisis alerts, emergency logs.
                    Anonymous sessions NOT permanently stored.
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Safety Layers */}
          <div className="space-y-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Safety Layers
              </h2>
              <p className="text-sm text-blue-200 mb-4">
                These wrap around the GPT API to ensure responsible, safe
                responses
              </p>

              <div className="space-y-3">
                {safetyLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() =>
                      setActiveLayer(activeLayer === layer.id ? null : layer.id)
                    }
                    className={`w-full bg-gradient-to-r ${layer.color} ${layer.borderColor} border-2 rounded-lg p-3 text-left hover:scale-105 transition-all duration-200 shadow-lg ${
                      activeLayer === layer.id
                        ? "ring-4 ring-white ring-opacity-50"
                        : ""
                    }`}
                  >
                    <div className="font-bold text-gray-900 text-sm mb-1">
                      {layer.title}
                    </div>
                    <div className="text-xs text-gray-700">
                      {layer.description}
                    </div>
                    {activeLayer === layer.id && (
                      <div className="mt-2 pt-2 border-t border-gray-400 text-xs text-gray-800 font-medium">
                        {layer.details}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Stats */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 border-2 border-white border-opacity-30 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">
                By The Numbers
              </h3>
              <div className="space-y-3 text-white">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Safety Layers</span>
                  <span className="text-2xl font-bold">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Clinical Tools</span>
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Countries Covered</span>
                  <span className="text-2xl font-bold">77</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Time</span>
                  <span className="text-2xl font-bold">&lt;2s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            🛡️ How Safety Works
          </h2>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl mb-2">1️⃣</div>
              <div className="text-white text-sm font-semibold">
                User sends message
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl mb-2">2️⃣</div>
              <div className="text-white text-sm font-semibold">
                GPT generates response
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl mb-2">3️⃣</div>
              <div className="text-white text-sm font-semibold">
                Safety layers validate
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-white text-sm font-semibold">
                Safe response delivered
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block text-blue-300 hover:text-blue-200 font-semibold"
          >
            ← Back to Chat
          </a>
          <span className="mx-4 text-white opacity-50">•</span>
          <a
            href="/system-diagram"
            className="inline-block text-blue-300 hover:text-blue-200 font-semibold"
          >
            View Full System Diagram →
          </a>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-blue-200 text-sm">
          <p>Created by Iris (Age 11) for Technovation Girls 2025/2026</p>
          <p className="text-xs mt-1 opacity-75">
            Press F11 for fullscreen presentation mode
          </p>
        </div>
      </div>
    </div>
  );
}
