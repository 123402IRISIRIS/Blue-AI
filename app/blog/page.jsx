"use client";

import { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Tag as TagIcon,
  Filter,
  X,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  blogArticles,
  getCategories,
  getTags,
} from "../api/utils/blog-articles";

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagFilter, setShowTagFilter] = useState(false);

  const categories = ["All", ...getCategories()];
  const allTags = getTags();

  // Filter articles based on search, category, and tags
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        article.keywords.some((kw) =>
          kw.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => article.tags?.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTags([]);
  };

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) + selectedTags.length;

  // Category colors
  const getCategoryColor = (category) => {
    const colors = {
      "Mental Health": "from-purple-500 to-pink-500",
      "Manga Recommendations": "from-orange-500 to-red-500",
      "Streaming and Gaming": "from-blue-500 to-cyan-500",
      "Fun Lifestyle": "from-green-500 to-emerald-500",
    };
    return colors[category] || "from-[#614BFF] to-[#8360FF]";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F14] via-[#1A1B25] to-[#0F0F14] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="bg-[#1A1B25] bg-opacity-90 border-b border-[#262630] sticky top-0 z-40 backdrop-blur-xl shadow-2xl relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-[#614BFF] to-[#8360FF] p-3 sm:p-4 rounded-2xl">
                  <BookOpen size={28} className="text-white sm:w-8 sm:h-8" />
                </div>
              </div>
              <div>
                <h1 className="font-poppins font-black text-white text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Blue's Blog
                </h1>
                <p className="font-poppins text-white text-opacity-60 text-sm sm:text-base mt-1">
                  Discover stories, tips & insights just for you
                </p>
              </div>
            </div>
            <a
              href="/"
              className="group inline-flex items-center gap-2 text-[#7A5AF8] hover:text-[#8360FF] font-poppins font-semibold transition-all duration-300 hover:gap-3 px-4 py-2 rounded-xl hover:bg-[#7A5AF8] hover:bg-opacity-10"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform group-hover:-translate-x-1"
              >
                <path
                  d="M12 16L6 10L12 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Back to Chat</span>
              <span className="sm:hidden">Back</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-2xl blur-md opacity-0 group-focus-within:opacity-20 transition-opacity duration-300"></div>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7A5AF8] transition-all duration-300 group-focus-within:scale-110"
              />
              <input
                type="text"
                placeholder="Search for the perfect article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#262630] text-white placeholder-white placeholder-opacity-40 font-poppins pl-14 pr-14 py-4 sm:py-5 rounded-2xl border-2 border-[#363640] focus:border-[#7A5AF8] focus:outline-none transition-all duration-300 text-base sm:text-lg shadow-xl focus:shadow-2xl focus:shadow-[#7A5AF8]/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-opacity-40 hover:text-opacity-100 transition-all duration-300 hover:rotate-90 hover:scale-110"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Category Navigation */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-[#7A5AF8]" />
              <h3 className="font-poppins font-bold text-white text-sm uppercase tracking-wider">
                Categories
              </h3>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative flex-shrink-0 px-5 sm:px-6 py-3 rounded-xl font-poppins font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white shadow-2xl shadow-[#7A5AF8]/40 scale-105"
                      : "bg-[#262630] text-white text-opacity-70 hover:bg-[#2d2d3a] hover:text-opacity-100 hover:shadow-lg"
                  }`}
                >
                  {selectedCategory === category && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-xl blur-lg opacity-50 -z-10"></div>
                  )}
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filter Toggle & Active Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowTagFilter(!showTagFilter)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-poppins font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                showTagFilter || selectedTags.length > 0
                  ? "bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white shadow-xl shadow-[#7A5AF8]/40"
                  : "bg-[#262630] text-white text-opacity-70 hover:bg-[#2d2d3a] hover:shadow-lg"
              }`}
            >
              <Filter size={16} />
              Filter by Tags
              {selectedTags.length > 0 && (
                <span className="bg-white bg-opacity-25 px-2.5 py-0.5 rounded-full text-xs font-black">
                  {selectedTags.length}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-poppins font-bold text-sm bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <X size={16} />
                Clear All
              </button>
            )}

            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-[#7A5AF8] bg-opacity-20 text-[#7A5AF8] rounded-lg text-xs font-poppins font-semibold border border-[#7A5AF8] border-opacity-30 backdrop-blur-sm"
                  >
                    {tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="hover:text-white transition-all duration-300 hover:rotate-90"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tag Filter Panel */}
          {showTagFilter && (
            <div className="mt-5 p-5 sm:p-6 bg-gradient-to-br from-[#262630] to-[#1A1B25] rounded-2xl border border-[#363640] shadow-2xl backdrop-blur-xl animate-slideDown">
              <div className="flex items-center gap-2 mb-4">
                <TagIcon size={18} className="text-[#7A5AF8]" />
                <h3 className="font-poppins font-bold text-white text-base">
                  Pick Your Topics
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2.5 rounded-xl font-poppins font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedTags.includes(tag)
                        ? "bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white shadow-lg shadow-[#7A5AF8]/40"
                        : "bg-[#1A1B25] text-white text-opacity-70 hover:bg-[#2d2d3a] hover:text-opacity-100 border border-[#363640] hover:border-[#7A5AF8]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-[#7A5AF8]" />
            <p className="font-poppins text-white text-opacity-80 font-semibold text-base sm:text-lg">
              {filteredArticles.length} article
              {filteredArticles.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 sm:py-32 animate-fadeIn">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <BookOpen
                size={80}
                className="relative text-white text-opacity-30 sm:w-24 sm:h-24"
              />
            </div>
            <h3 className="font-poppins font-black text-white text-2xl sm:text-3xl mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              No articles found
            </h3>
            <p className="font-poppins text-white text-opacity-60 mb-8 text-base sm:text-lg max-w-md mx-auto">
              Try adjusting your search or filters to discover amazing content
            </p>
            <button
              onClick={clearAllFilters}
              className="group px-8 py-4 bg-gradient-to-r from-[#614BFF] to-[#8360FF] text-white font-poppins font-bold rounded-xl hover:from-[#553DE8] hover:to-[#7352E8] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#7A5AF8]/40 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <X
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fadeIn">
            {filteredArticles.map((article, index) => (
              <a
                key={article.url}
                href={article.url}
                className="group bg-gradient-to-br from-[#1A1B25] to-[#0F0F14] rounded-2xl p-6 sm:p-7 border border-[#262630] hover:border-[#7A5AF8] transition-all duration-500 hover:shadow-2xl hover:shadow-[#7A5AF8]/30 hover:scale-[1.03] relative overflow-hidden backdrop-blur-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7A5AF8]/0 via-[#7A5AF8]/0 to-[#7A5AF8]/0 group-hover:from-[#7A5AF8]/5 group-hover:via-[#7A5AF8]/10 group-hover:to-[#7A5AF8]/5 transition-all duration-500 rounded-2xl"></div>

                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-4 py-2 bg-gradient-to-r ${getCategoryColor(article.category)} text-white text-xs font-poppins font-black rounded-full uppercase tracking-wide shadow-lg`}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins font-black text-white text-xl sm:text-2xl mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#7A5AF8] group-hover:bg-clip-text transition-all duration-300 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="font-poppins text-white text-opacity-70 text-sm sm:text-base mb-5 line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-[#262630] bg-opacity-50 backdrop-blur-sm text-white text-opacity-70 text-xs font-poppins font-semibold rounded-lg border border-[#363640] group-hover:border-[#7A5AF8] group-hover:text-opacity-100 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-[#7A5AF8] group-hover:gap-4 transition-all duration-300">
                    <span className="font-poppins font-black text-sm sm:text-base">
                      Read article
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="transition-all duration-300 group-hover:translate-x-2"
                    >
                      <path
                        d="M7 15L12 10L7 5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .font-poppins {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-fadeIn > * {
          animation: fadeIn 0.5s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
