"use client";

import { useState, useEffect } from "react";
import ChatWindow from "../components/ChatWindow";
import { LanguageProvider, useLanguage } from "../components/LanguageContext";

function HomeContent() {
  const [messages, setMessages] = useState([]);
  const { t } = useLanguage();

  // Ensure Google verification meta tag is in the document head
  useEffect(() => {
    const existingTag = document.querySelector(
      'meta[name="google-site-verification"]',
    );
    if (!existingTag) {
      const meta = document.createElement("meta");
      meta.name = "google-site-verification";
      meta.content = "n12R1Sb_PZxuQp8FFNesjLj_2b2GhY2vFol_KLl1avA";
      document.head.appendChild(meta);
    }
  }, []);

  const handleClearChat = () => {
    if (confirm(t("clear.confirm"))) {
      setMessages([]);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-br from-[#334155] via-[#475569] to-[#64748B] p-0 sm:p-4 md:p-6"
      style={{ minHeight: "100dvh", height: "100dvh" }}
    >
      <div
        className="w-full max-w-6xl"
        style={{ height: "100dvh", maxHeight: "100dvh" }}
      >
        <ChatWindow
          messages={messages}
          setMessages={setMessages}
          onClearChat={handleClearChat}
        />
      </div>
      <style jsx>{`
        .font-poppins {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
