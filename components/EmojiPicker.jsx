"use client";

import { X } from "lucide-react";

const EMOJI_CATEGORIES = {
  "😊 Smileys": [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "🥲",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
  ],
  "👋 Gestures": [
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👌",
    "🤌",
    "🤏",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👍",
    "👎",
    "✊",
    "👊",
    "🤛",
    "🤜",
    "👏",
    "🙌",
  ],
  "❤️ Hearts": [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
  ],
  "🎉 Activities": [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🥏",
    "🎱",
    "🪀",
    "🏓",
    "🏸",
    "🏒",
    "🏑",
    "🥍",
    "🏏",
    "🪃",
    "🥅",
    "⛳",
    "🪁",
    "🏹",
    "🎣",
    "🤿",
    "🥊",
    "🥋",
    "🎽",
    "🛹",
    "🛼",
  ],
  "🍕 Food": [
    "🍕",
    "🍔",
    "🍟",
    "🌭",
    "🍿",
    "🧈",
    "🧂",
    "🥚",
    "🍳",
    "🧇",
    "🥞",
    "🧈",
    "🍞",
    "🥐",
    "🥨",
    "🥯",
    "🥖",
    "🧀",
    "🥗",
    "🍿",
    "🧈",
    "🥓",
    "🥩",
    "🍗",
    "🍖",
  ],
};

export default function EmojiPicker({ onSelect, onClose }) {
  return (
    <div className="fixed sm:absolute bottom-16 sm:bottom-full left-2 sm:left-0 right-2 sm:right-auto mb-2 bg-[#1D1D25] border border-[#3A3A3A] rounded-lg shadow-xl p-3 w-auto sm:w-80 max-h-80 overflow-y-auto z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-poppins font-semibold text-white text-sm">
          Pick an emoji
        </h3>
        <button
          onClick={onClose}
          className="text-white text-opacity-60 hover:text-opacity-100"
        >
          <X size={16} />
        </button>
      </div>
      {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
        <div key={category} className="mb-3">
          <p className="font-poppins text-white text-opacity-60 text-xs mb-2">
            {category}
          </p>
          <div className="grid grid-cols-8 gap-1">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => onSelect(emoji)}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#262630] rounded transition-colors text-xl"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
