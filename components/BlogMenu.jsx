"use client";

import { useState, useRef, useEffect } from "react";
import { BookOpen, X, Library } from "lucide-react";

export default function BlogMenu() {
  const [showBlogMenu, setShowBlogMenu] = useState(false);
  const blogMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        blogMenuRef.current &&
        !blogMenuRef.current.contains(event.target) &&
        !event.target.closest("[data-blog-trigger]")
      ) {
        setShowBlogMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        data-blog-trigger
        onClick={() => setShowBlogMenu(!showBlogMenu)}
        className="p-2 sm:p-2.5 rounded-full hover:bg-[#262630] active:bg-[#2d2d3a] transition-all duration-200 group touch-manipulation"
        title="Blue's Blog"
        aria-label="Blue's Blog"
      >
        <BookOpen
          size={20}
          className="sm:hidden text-white text-opacity-70 group-hover:text-opacity-100 transition-opacity"
        />
        <BookOpen
          size={22}
          className="hidden sm:block text-white text-opacity-70 group-hover:text-opacity-100 transition-opacity"
        />
      </button>

      {showBlogMenu && (
        <div
          ref={blogMenuRef}
          className="fixed sm:absolute inset-0 sm:inset-auto top-0 sm:top-full right-0 sm:right-0 sm:mt-2 w-full sm:w-80 bg-[#1A1B25] border-0 sm:border border-[#262630] sm:rounded-lg shadow-xl p-4 sm:p-3 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-3 pb-3 sm:pb-2 border-b border-[#262630]">
            <h3 className="font-poppins font-semibold text-white text-base sm:text-sm flex items-center gap-2">
              <BookOpen size={18} className="sm:hidden text-[#7A5AF8]" />
              <BookOpen size={16} className="hidden sm:block text-[#7A5AF8]" />
              Blue's Articles
            </h3>
            <button
              onClick={() => setShowBlogMenu(false)}
              className="text-white text-opacity-60 hover:text-opacity-100 active:text-opacity-100 p-2 -mr-2 touch-manipulation"
              aria-label="Close menu"
            >
              <X size={20} className="sm:hidden" />
              <X size={16} className="hidden sm:block" />
            </button>
          </div>

          {/* Browse All Articles Button */}
          <a
            href="/blog"
            onClick={() => setShowBlogMenu(false)}
            className="block p-4 mb-4 bg-gradient-to-r from-[#614BFF] to-[#8360FF] hover:from-[#553DE8] hover:to-[#7352E8] rounded-lg transition-all group touch-manipulation shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Library size={24} className="text-white" />
              <div>
                <h4 className="font-poppins font-bold text-white text-base sm:text-sm">
                  Browse All Articles
                </h4>
                <p className="font-poppins text-white text-opacity-90 text-xs">
                  Search, filter by categories & tags
                </p>
              </div>
            </div>
          </a>

          <div className="mb-3 pb-3 border-b border-[#262630]">
            <p className="font-poppins text-white text-opacity-50 text-xs">
              Quick Access - Recent Articles
            </p>
          </div>

          <div className="space-y-2 max-h-none sm:max-h-96 pb-16 sm:pb-0">
            {/* Newest article */}
            <a
              href="/blog/things-we-dont-say"
              onClick={() => setShowBlogMenu(false)}
              className="block p-4 sm:p-3 bg-[#262630] hover:bg-[#2d2d3a] active:bg-[#2d2d3a] rounded-lg transition-colors group touch-manipulation"
            >
              <h4 className="font-poppins font-medium text-white text-base sm:text-sm mb-1 group-hover:text-[#7A5AF8] transition-colors">
                Things We All Think But Don't Say 😜
              </h4>
              <p className="font-poppins text-white text-opacity-60 text-sm sm:text-xs">
                The unspoken thoughts club – where awkward is hilarious!
              </p>
            </a>

            <a
              href="/blog/classroom-influencers-showdown"
              onClick={() => setShowBlogMenu(false)}
              className="block p-4 sm:p-3 bg-[#262630] hover:bg-[#2d2d3a] active:bg-[#2d2d3a] rounded-lg transition-colors group touch-manipulation"
            >
              <h4 className="font-poppins font-medium text-white text-base sm:text-sm mb-1 group-hover:text-[#7A5AF8] transition-colors">
                Classroom Influencers Showdown 🎥
              </h4>
              <p className="font-poppins text-white text-opacity-60 text-sm sm:text-xs">
                When divas take center stage in school halls
              </p>
            </a>

            <a
              href="/blog/dear-parents"
              onClick={() => setShowBlogMenu(false)}
              className="block p-4 sm:p-3 bg-[#262630] hover:bg-[#2d2d3a] active:bg-[#2d2d3a] rounded-lg transition-colors group touch-manipulation"
            >
              <h4 className="font-poppins font-medium text-white text-base sm:text-sm mb-1 group-hover:text-[#7A5AF8] transition-colors">
                Dear Parents: Blue's New BFF Guide 👨‍👩‍👧‍👦
              </h4>
              <p className="font-poppins text-white text-opacity-60 text-sm sm:text-xs">
                Everything parents need to know about Blue
              </p>
            </a>

            <a
              href="/blog/destress-guide"
              onClick={() => setShowBlogMenu(false)}
              className="block p-4 sm:p-3 bg-[#262630] hover:bg-[#2d2d3a] active:bg-[#2d2d3a] rounded-lg transition-colors group touch-manipulation"
            >
              <h4 className="font-poppins font-medium text-white text-base sm:text-sm mb-1 group-hover:text-[#7A5AF8] transition-colors">
                De-Stress Like a Pro 💙
              </h4>
              <p className="font-poppins text-white text-opacity-60 text-sm sm:text-xs">
                A guide with memes and vibes to handle stress
              </p>
            </a>

            <a
              href="/blog/homework-hustle"
              onClick={() => setShowBlogMenu(false)}
              className="block p-4 sm:p-3 bg-[#262630] hover:bg-[#2d2d3a] active:bg-[#2d2d3a] rounded-lg transition-colors group touch-manipulation"
            >
              <h4 className="font-poppins font-medium text-white text-base sm:text-sm mb-1 group-hover:text-[#7A5AF8] transition-colors">
                Homework Hustle & School Drama 📚
              </h4>
              <p className="font-poppins text-white text-opacity-60 text-sm sm:text-xs">
                Blue's got you covered for school stress
              </p>
            </a>
          </div>

          <div className="mt-4 sm:mt-3 pt-4 sm:pt-3 border-t border-[#262630] fixed sm:static bottom-0 left-0 right-0 bg-[#1A1B25] p-4 sm:p-0">
            <p className="font-poppins text-white text-opacity-50 text-sm sm:text-xs text-center">
              36 articles and counting! 💙
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .font-poppins {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, sans-serif;
        }

        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #3a3a3a;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #4a4a4a;
        }

        @media (max-width: 640px) {
          .overflow-y-auto {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}
