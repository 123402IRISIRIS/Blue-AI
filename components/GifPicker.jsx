"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function GifPicker({ onSelect, onClose }) {
  const [gifs, setGifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchGifs = async (query) => {
    if (!query.trim()) {
      query = "trending";
    }

    try {
      const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&limit=20`,
      );
      const data = await response.json();
      setGifs(data.results || []);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setGifs([]);
    }
  };

  useEffect(() => {
    searchGifs("excited happy");
  }, []);

  return (
    <div className="fixed sm:absolute bottom-16 sm:bottom-full left-2 sm:left-0 right-2 sm:right-auto mb-2 bg-[#1D1D25] border border-[#3A3A3A] rounded-lg shadow-xl p-3 w-auto sm:w-96 max-h-96 overflow-hidden z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-poppins font-semibold text-white text-sm">
          Pick a GIF
        </h3>
        <button
          onClick={onClose}
          className="text-white text-opacity-60 hover:text-opacity-100 p-1 touch-manipulation"
          aria-label="Close GIF picker"
        >
          <X size={16} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search GIFs..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          searchGifs(e.target.value);
        }}
        className="w-full bg-[#262630] text-white placeholder-gray-400 rounded-lg px-3 py-2.5 sm:py-2 mb-3 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#7A5AF8]"
      />
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        {gifs.map((gif) => (
          <button
            key={gif.id}
            onClick={() => onSelect(gif.media_formats.tinygif.url)}
            className="rounded-lg overflow-hidden hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation"
          >
            <img
              src={gif.media_formats.tinygif.url}
              alt={gif.content_description || "GIF"}
              className="w-full h-32 object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
