"use client";

import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function BlogLinkCard({ url, title }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  // Fade in animation on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Parallax mouse tracking
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  // Enhanced blog metadata with EVERYTHING
  const blogMeta = {
    "/blog/drama-queens-101": {
      emoji: "🎭",
      description: "Learn how to spot and handle dramatic personalities",
      gradient: "from-pink-500 via-rose-500 to-purple-600",
      tags: ["Drama", "Social Skills"],
      particleColor: "#ec4899",
    },
    "/blog/destress-guide": {
      emoji: "😌",
      description: "De-stress like a pro with memes and vibes",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      tags: ["Wellness", "Mental Health"],
      particleColor: "#3b82f6",
    },
    "/blog/self-care-toolkit": {
      emoji: "💆",
      description: "Actually useful self-care that helps",
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      tags: ["Self-Care", "Tips"],
      particleColor: "#10b981",
    },
    "/blog/manga-magic": {
      emoji: "📚",
      description: "Top 10 manga picks to chill with",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      tags: ["Manga", "Reading"],
      particleColor: "#f97316",
    },
    "/blog/brain-rot": {
      emoji: "🧠",
      description: "Let your mind melt with these picks",
      gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
      tags: ["Anime", "Entertainment"],
      particleColor: "#a855f7",
    },
    "/blog/gossip-guide": {
      emoji: "☕",
      description: "Handle drama without spreading it",
      gradient: "from-amber-500 via-yellow-500 to-orange-500",
      tags: ["Social", "Communication"],
      particleColor: "#f59e0b",
    },
    "/blog/top-kpop-fans": {
      emoji: "🎵",
      description: "Top K-Pop fans and why we stan",
      gradient: "from-pink-600 via-rose-500 to-red-500",
      tags: ["K-Pop", "Music"],
      particleColor: "#db2777",
    },
    "/blog/recognizing-sos": {
      emoji: "🆘",
      description: "Top 5 signs you might need support",
      gradient: "from-red-500 via-orange-500 to-amber-500",
      tags: ["Mental Health", "Support"],
      particleColor: "#ef4444",
    },
    "/blog/friend-support-memes": {
      emoji: "🤝",
      description: "Support your friends with memes",
      gradient: "from-blue-600 via-indigo-500 to-purple-500",
      tags: ["Friendship", "Support"],
      particleColor: "#4f46e5",
    },
    "/blog/90s-slang": {
      emoji: "📼",
      description: "Talk like it's 1999",
      gradient: "from-purple-500 via-violet-500 to-blue-500",
      tags: ["Culture", "Language"],
      particleColor: "#8b5cf6",
    },
    "/blog/ye-olde-slang": {
      emoji: "🎩",
      description: "Journey through vintage slang",
      gradient: "from-amber-600 via-yellow-600 to-orange-600",
      tags: ["History", "Language"],
      particleColor: "#d97706",
    },
    "/blog/teen-fiction-top-10": {
      emoji: "📖",
      description: "Teen fiction books that actually slap",
      gradient: "from-teal-500 via-cyan-500 to-blue-500",
      tags: ["Books", "Fiction"],
      particleColor: "#14b8a6",
    },
    "/blog/why-blue-safe-space": {
      emoji: "💙",
      description: "Why Blue is a judgment-free zone",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      tags: ["About", "Community"],
      particleColor: "#2563eb",
    },
    "/blog/teachers-pet-guide": {
      emoji: "🎓",
      description: "Navigate school social dynamics",
      gradient: "from-green-600 via-teal-600 to-cyan-600",
      tags: ["School", "Social"],
      particleColor: "#059669",
    },
    "/blog/teen-rock-legends": {
      emoji: "🎸",
      description: "Rock bands that changed the game",
      gradient: "from-red-600 via-pink-600 to-rose-600",
      tags: ["Music", "Rock"],
      particleColor: "#dc2626",
    },
    "/blog/celebrity-comebacks": {
      emoji: "⭐",
      description: "Celebrity comebacks that hit different",
      gradient: "from-yellow-500 via-amber-500 to-orange-500",
      tags: ["Celebrity", "Pop Culture"],
      particleColor: "#eab308",
    },
    "/blog/wild-celebrity-headlines": {
      emoji: "🗞️",
      description: "Wild celeb headlines we can't forget",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      tags: ["Celebrity", "News"],
      particleColor: "#ea580c",
    },
    "/blog/escaped-cults": {
      emoji: "🚪",
      description: "Real stories of getting out",
      gradient: "from-slate-600 via-gray-600 to-zinc-600",
      tags: ["Stories", "Real Life"],
      particleColor: "#475569",
    },
    "/blog/celeb-board-games": {
      emoji: "🎲",
      description: "Why celebrity board games are fun",
      gradient: "from-indigo-600 via-purple-600 to-fuchsia-600",
      tags: ["Games", "Entertainment"],
      particleColor: "#6366f1",
    },
    "/blog/beauty-standards-history": {
      emoji: "💄",
      description: "How beauty standards changed over time",
      gradient: "from-pink-600 via-rose-600 to-red-600",
      tags: ["Beauty", "History"],
      particleColor: "#db2777",
    },
    "/blog/teen-secrets-manga": {
      emoji: "🤫",
      description: "Manga plots we can't stop thinking about",
      gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
      tags: ["Manga", "Stories"],
      particleColor: "#7c3aed",
    },
    "/blog/grunt-and-giggle": {
      emoji: "😂",
      description: "Why dumb humor is actually healing",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      tags: ["Humor", "Wellness"],
      particleColor: "#eab308",
    },
    "/blog/web-of-shadows": {
      emoji: "🕷️",
      description: "Dark stories worth reading",
      gradient: "from-gray-800 via-slate-800 to-zinc-900",
      tags: ["Mystery", "Stories"],
      particleColor: "#1e293b",
    },
  };

  const meta = blogMeta[url] || {
    emoji: "📝",
    description: "Check out this article",
    gradient: "from-blue-500 to-purple-500",
    tags: ["Article"],
    particleColor: "#3b82f6",
  };

  // Particle animation
  const Particle = ({ delay, size }) => (
    <div
      className="absolute rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: meta.particleColor,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `float ${3 + Math.random() * 2}s ease-in-out ${delay}s infinite`,
        filter: "blur(1px)",
      }}
    />
  );

  return (
    <a
      href={`https://www.ai-blue.org${url}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`block mt-4 mb-3 no-underline group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 50, y: 50 });
      }}
      ref={cardRef}
    >
      <div
        className={`relative bg-gradient-to-br ${meta.gradient} p-[2px] rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] overflow-hidden`}
        style={{
          boxShadow: isHovering
            ? `0 20px 40px ${meta.particleColor}40`
            : "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Particle key={i} delay={i * 0.2} size={3 + Math.random() * 4} />
          ))}
        </div>

        {/* Mouse-following gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, ${meta.particleColor}, transparent 40%)`,
          }}
        />

        {/* Sparkle effect on hover - multiple sparkles */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Sparkles
            size={16}
            className="text-white animate-pulse"
            style={{ animationDuration: "1.5s" }}
          />
        </div>
        <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <Star
            size={12}
            className="text-white animate-pulse"
            style={{ animationDuration: "2s" }}
          />
        </div>
        <div className="absolute top-4 right-14 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <Star
            size={10}
            className="text-white animate-pulse"
            style={{ animationDuration: "1.8s" }}
          />
        </div>

        <div
          className="relative bg-[#1A1B25] rounded-2xl p-5 overflow-hidden transition-all duration-300"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${meta.particleColor}15 0%, transparent 50%)`,
          }}
        >
          {/* Animated scan line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 transition-all duration-1000"
            style={{
              animation: isHovering ? "scan 2s ease-in-out infinite" : "none",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              {/* Large emoji icon with glow and 3D effect */}
              <div className="relative flex-shrink-0">
                <div
                  className="absolute inset-0 blur-xl opacity-50 rounded-full transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${meta.particleColor}, ${meta.particleColor}80)`,
                    transform: isHovering ? "scale(1.5)" : "scale(1)",
                  }}
                />
                <div
                  className="relative text-5xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    filter: isHovering
                      ? "drop-shadow(0 4px 8px rgba(0,0,0,0.4))"
                      : "none",
                  }}
                >
                  {meta.emoji}
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h4
                  className="font-poppins font-bold text-white text-base mb-2 line-clamp-2 transition-all duration-300"
                  style={{
                    textShadow: isHovering
                      ? `0 0 20px ${meta.particleColor}80`
                      : "none",
                  }}
                >
                  {title}
                </h4>
                <p className="font-poppins text-white text-opacity-70 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {meta.description}
                </p>

                {/* Tags with glassmorphism */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  {meta.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2.5 py-1 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-xs font-poppins font-medium text-white text-opacity-90 border border-white border-opacity-20 transition-all duration-300 hover:bg-opacity-20 hover:scale-105"
                      style={{
                        boxShadow: isHovering
                          ? `0 0 10px ${meta.particleColor}40`
                          : "none",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read more button with enhanced animation */}
                <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all duration-300">
                  <span className="font-poppins font-semibold text-sm">
                    Read article
                  </span>
                  <div
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 group-hover:rotate-45"
                    style={{
                      boxShadow: isHovering
                        ? `0 0 15px ${meta.particleColor}60`
                        : "none",
                    }}
                  >
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gradient bar with wave animation */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
          />

          {/* Corner accent */}
          <div
            className="absolute bottom-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at bottom right, ${meta.particleColor}, transparent)`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes scan {
          0% {
            top: 0;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0;
          }
        }

        .font-poppins {
          font-family:
            "Poppins",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif;
        }
      `}</style>
    </a>
  );
}
