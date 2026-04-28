"use client";

import { useState } from "react";

export default function DownloadPresentationMaterials() {
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState(null);

  const materials = [
    {
      id: "script",
      title: "🎤 Presentation Script (4-Minute)",
      description:
        "Word-for-word script with timing, delivery tips, and power phrases",
      filename: "Blue_Presentation_Script.pdf",
    },
    {
      id: "qa",
      title: "🎯 Judge Q&A Preparation Guide",
      description: "21 anticipated questions with strong technical answers",
      filename: "Blue_Judge_QA_Prep.pdf",
    },
    {
      id: "checklist",
      title: "✅ Presentation Day Checklist",
      description:
        "Hour-by-hour checklist from 24hrs before to post-presentation",
      filename: "Blue_Presentation_Checklist.pdf",
    },
    {
      id: "all",
      title: "📦 Complete Package (All Materials)",
      description: "All presentation materials in one PDF",
      filename: "Blue_Complete_Presentation_Package.pdf",
    },
  ];

  const downloadPDF = async (materialId) => {
    setDownloading(materialId);
    setError(null);

    try {
      const response = await fetch("/api/generate-presentation-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materialType: materialId }),
      });

      if (!response.ok) {
        // Try to get error details from the response
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.details ||
          errorData?.error ||
          `Server returned ${response.status}`;
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = materials.find((m) => m.id === materialId).filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download error:", err);
      setError(
        `${materials.find((m) => m.id === materialId).title}: ${err.message}`,
      );
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            💙 Blue Presentation Materials
          </h1>
          <p className="text-xl text-blue-200 mb-2">
            Download your Technovation competition materials
          </p>
          <p className="text-sm text-blue-300">
            All materials formatted for printing and easy reference
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-400 text-white rounded-lg p-4 mb-6">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Materials Grid */}
        <div className="grid gap-6 mb-8">
          {materials.map((material) => (
            <div
              key={material.id}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {material.title}
                  </h2>
                  <p className="text-blue-200 text-sm mb-4">
                    {material.description}
                  </p>
                  <p className="text-blue-300 text-xs">
                    📄 {material.filename}
                  </p>
                </div>
                <button
                  onClick={() => downloadPDF(material.id)}
                  disabled={downloading === material.id}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    downloading === material.id
                      ? "bg-gray-500 cursor-wait"
                      : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                  } text-white shadow-lg`}
                >
                  {downloading === material.id ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download PDF
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 border-2 border-white border-opacity-30 shadow-xl mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">💡 Quick Tips</h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-2">
              <span className="text-xl">📱</span>
              <span className="text-sm">
                Save PDFs to your phone/tablet for offline access during
                competition
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">🖨️</span>
              <span className="text-sm">
                Print the Checklist and Q&A Prep guide to bring with you
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">📖</span>
              <span className="text-sm">
                Highlight your power phrases in the script for quick reference
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">💾</span>
              <span className="text-sm">
                Keep a backup USB drive with all materials
              </span>
            </li>
          </ul>
        </div>

        {/* Online Resources */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
          <h3 className="text-xl font-bold text-white mb-4">
            🌐 Online Resources
          </h3>
          <div className="space-y-3">
            <a
              href="/architecture-slide"
              target="_blank"
              className="block bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 transition-all hover:scale-105"
            >
              <div className="font-semibold">
                🏗️ Interactive Architecture Slide
              </div>
              <div className="text-sm text-blue-100">
                Click components to see details - perfect for live demo
              </div>
            </a>
            <a
              href="/system-diagram"
              target="_blank"
              className="block bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 transition-all hover:scale-105"
            >
              <div className="font-semibold">📊 Full System Diagram</div>
              <div className="text-sm text-purple-100">
                Complete multi-layer safety architecture visualization
              </div>
            </a>
            <a
              href="/"
              className="block bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-4 transition-all hover:scale-105"
            >
              <div className="font-semibold">💬 Blue Chat (Live Demo)</div>
              <div className="text-sm text-indigo-100">
                Practice your demo or show judges how Blue works
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-blue-200 text-sm mb-2">
            Created for Technovation Girls 2025/2026
          </p>
          <p className="text-blue-300 text-xs">
            All materials designed to help you succeed in your presentation
          </p>
          <div className="mt-4">
            <a
              href="/"
              className="text-blue-300 hover:text-blue-200 font-semibold"
            >
              ← Back to Blue Chat
            </a>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 border-2 border-white border-opacity-30 shadow-xl text-center">
          <p className="text-2xl font-bold text-white mb-2">
            💙 You've Got This, Iris!
          </p>
          <p className="text-blue-100 text-sm">
            You built something incredible. Now go show the judges what you're
            capable of.
          </p>
        </div>
      </div>
    </div>
  );
}
