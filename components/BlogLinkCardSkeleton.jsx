"use client";

export default function BlogLinkCardSkeleton() {
  return (
    <div className="block mt-4 mb-3 animate-pulse">
      <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-[2px] rounded-2xl">
        <div className="relative bg-[#1A1B25] rounded-2xl p-5">
          <div className="flex items-start gap-4">
            {/* Emoji skeleton */}
            <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0" />

            {/* Content skeleton */}
            <div className="flex-1">
              {/* Title */}
              <div className="h-5 bg-gray-700 rounded-md mb-3 w-3/4" />

              {/* Description */}
              <div className="h-4 bg-gray-700 rounded-md mb-2 w-full" />
              <div className="h-4 bg-gray-700 rounded-md mb-3 w-2/3" />

              {/* Tags */}
              <div className="flex gap-2 mb-3">
                <div className="h-6 w-16 bg-gray-700 rounded-full" />
                <div className="h-6 w-20 bg-gray-700 rounded-full" />
              </div>

              {/* Button */}
              <div className="h-6 w-24 bg-gray-700 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
