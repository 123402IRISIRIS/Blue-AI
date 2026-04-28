"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Smile,
  Image as ImageIcon,
  AlertTriangle,
  Phone,
  X,
  Bell,
  User,
  History,
  MessageSquare,
  Trash2,
  Globe,
} from "lucide-react";
import BlogMenu from "./BlogMenu";
import EmojiPicker from "./EmojiPicker";
import GifPicker from "./GifPicker";
import BlogLinkCard from "./BlogLinkCard";
import { useLanguage } from "./LanguageContext";

export default function ChatWindow({ messages, setMessages, onClearChat }) {
  const { t, language, setLanguage, LANGUAGES } = useLanguage();

  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [crisisDetected, setCrisisDetected] = useState(null);
  const [prankDetected, setPrankDetected] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const gifPickerRef = useRef(null);
  const historyPanelRef = useRef(null);
  const langMenuRef = useRef(null);

  // Generate or load session ID on mount
  useEffect(() => {
    let storedSessionId = localStorage.getItem("blueSessionId");
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem("blueSessionId", storedSessionId);
    }
    setSessionId(storedSessionId);

    // Load conversation for this session
    loadConversation(storedSessionId);
  }, []);

  // Load conversation from database
  const loadConversation = async (sid) => {
    try {
      const response = await fetch("/api/conversations/load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  // Save conversation to database
  const saveConversation = async (msgs) => {
    if (!sessionId || msgs.length === 0) return;

    try {
      const firstUserMessage =
        msgs.find((m) => m.role === "user")?.content || "New Conversation";
      const title =
        firstUserMessage.substring(0, 50) +
        (firstUserMessage.length > 50 ? "..." : "");

      await fetch("/api/conversations/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          messages: msgs,
          title,
        }),
      });
    } catch (error) {
      console.error("Failed to save conversation:", error);
    }
  };

  // Load conversation history list
  const loadConversationHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await fetch("/api/conversations/list");
      if (response.ok) {
        const data = await response.json();
        setConversationHistory(data.conversations || []);
      }
    } catch (error) {
      console.error("Failed to load conversation history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Load a specific conversation
  const loadSpecificConversation = async (sid) => {
    try {
      const response = await fetch("/api/conversations/load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        setSessionId(sid);
        localStorage.setItem("blueSessionId", sid);
        setShowHistory(false);
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  // Start new conversation
  const startNewConversation = () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    setSessionId(newSessionId);
    localStorage.setItem("blueSessionId", newSessionId);
    setMessages([]);
    setShowHistory(false);
  };

  // Delete conversation
  const deleteConversation = async (convId) => {
    try {
      await fetch("/api/conversations/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: convId }),
      });
      loadConversationHistory();
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  useEffect(() => {
    if (showHistory) {
      loadConversationHistory();
    }
  }, [showHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
      if (
        gifPickerRef.current &&
        !gifPickerRef.current.contains(event.target)
      ) {
        setShowGifPicker(false);
      }
      if (
        historyPanelRef.current &&
        !historyPanelRef.current.contains(event.target) &&
        !event.target.closest("[data-history-trigger]")
      ) {
        setShowHistory(false);
      }
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target) &&
        !event.target.closest("[data-lang-trigger]")
      ) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSendMessage = async (content = null, isGif = false) => {
    const finalContent = content || messageText.trim();
    if (!finalContent) return;

    const userMessage = {
      role: "user",
      content: finalContent,
      timestamp: new Date().toISOString(),
      isGif: isGif,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessageText("");
    setShowEmojiPicker(false);
    setShowGifPicker(false);
    setIsLoading(true);

    setCrisisDetected(null);
    setPrankDetected(null);

    try {
      if (!isGif) {
        try {
          const crisisCheck = await fetch("/api/crisis-detection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: finalContent,
              conversationHistory: updatedMessages,
            }),
          });

          if (crisisCheck.ok) {
            const crisisData = await crisisCheck.json();

            if (crisisData.isPrank) {
              setPrankDetected(crisisData);
              setTimeout(() => setPrankDetected(null), 5000);
            }

            if (
              crisisData.genuineThreat === true &&
              crisisData.isCrisis &&
              !crisisData.isPrank &&
              (crisisData.riskLevel === "high" ||
                crisisData.riskLevel === "critical" ||
                crisisData.riskLevel === "severe")
            ) {
              const alertResponse = await fetch("/api/get-crisis-resources", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              });

              if (alertResponse.ok) {
                const alertData = await alertResponse.json();
                setCrisisDetected({
                  ...crisisData,
                  nearestCrisisLine: alertData.crisisLine,
                });
              }
            }
          }
        } catch (error) {
          console.error("Crisis detection failed:", error);
        }
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      await saveConversation(finalMessages);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: t("chat.error"),
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessageText(messageText + emoji);
    setShowEmojiPicker(false);
  };

  const handleGifSelect = (gifUrl) => {
    handleSendMessage(gifUrl, true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageBubble = ({ message }) => {
    const isUser = message.role === "user";

    // Parse blog links from Blue's messages
    const parseMessageContent = (content) => {
      if (isUser || !content) return content;

      // Regex to match [BLOG:/blog/slug](Title)
      const blogLinkRegex = /\[BLOG:(\/blog\/[^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = blogLinkRegex.exec(content)) !== null) {
        // Add text before the blog link
        if (match.index > lastIndex) {
          parts.push({
            type: "text",
            content: content.substring(lastIndex, match.index),
          });
        }

        // Add the blog link
        parts.push({
          type: "blog",
          url: match[1],
          title: match[2],
        });

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < content.length) {
        parts.push({
          type: "text",
          content: content.substring(lastIndex),
        });
      }

      return parts.length > 0 ? parts : content;
    };

    const parsedContent = parseMessageContent(message.content);

    return (
      <div
        className={`flex items-start gap-3 mb-6 ${isUser ? "flex-row-reverse" : ""}`}
      >
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
            isUser
              ? "bg-gradient-to-br from-[#3D9DF6] to-[#2563EB]"
              : "bg-transparent"
          }`}
        >
          {isUser ? (
            <span className="text-white font-poppins font-semibold text-sm md:text-base">
              {t("chat.you")[0]}
            </span>
          ) : (
            <img
              src="https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/"
              alt="Blue"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        <div className="flex-1 max-w-[85%] md:max-w-[80%]">
          <div
            className={`flex items-baseline gap-2 mb-1 ${isUser ? "flex-row-reverse" : ""}`}
          >
            <span className="font-poppins font-medium text-white text-sm md:text-base">
              {isUser ? t("chat.you") : "Blue"}
            </span>
            <span className="font-poppins text-white text-opacity-50 text-xs">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {message.isGif ? (
            <img
              src={message.content}
              alt="GIF"
              className="rounded-lg max-w-full md:max-w-xs"
              style={{ maxHeight: "300px" }}
              loading="lazy"
            />
          ) : Array.isArray(parsedContent) ? (
            <div>
              {parsedContent.map((part, idx) => {
                if (part.type === "blog") {
                  return (
                    <BlogLinkCard key={idx} url={part.url} title={part.title} />
                  );
                }
                return (
                  <div
                    key={idx}
                    className={`font-poppins text-white text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                      message.isError ? "text-[#EF4444]" : ""
                    }`}
                  >
                    {part.content}
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`font-poppins text-white text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                message.isError ? "text-[#EF4444]" : ""
              }`}
            >
              {parsedContent}
            </div>
          )}
        </div>
      </div>
    );
  };

  const PrankAlert = ({ prank }) => {
    return (
      <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-lg border border-[#fbbf24]">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎭</span>
          <div className="flex-1">
            <h4 className="font-poppins font-semibold text-white text-base mb-2">
              {t("prank.title")}
            </h4>
            <p className="font-poppins text-white text-sm mb-2">
              {t("prank.body")}
            </p>
            {prank.prankIndicators && prank.prankIndicators.length > 0 && (
              <div className="bg-white bg-opacity-20 rounded-lg p-2 mt-2">
                <p className="font-poppins text-white text-xs opacity-90">
                  💡 {t("prank.why")} {prank.prankIndicators.join(", ")}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setPrankDetected(null)}
            className="text-white text-opacity-60 hover:text-opacity-100"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  };

  const CrisisAlert = ({ crisis }) => {
    return (
      <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] rounded-lg border border-[#ef4444]">
        <div className="flex items-start gap-3">
          <AlertTriangle size={24} className="text-white flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h4 className="font-poppins font-semibold text-white text-base mb-2">
              {t("crisis.title")}
            </h4>
            <p className="font-poppins text-white text-sm mb-3">
              {t("crisis.body")}
            </p>
            {crisis.nearestCrisisLine && (
              <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-white" />
                  <span className="font-poppins font-semibold text-white text-sm">
                    {t("crisis.nearbyTitle")}
                  </span>
                </div>
                <p className="font-poppins text-white text-sm">
                  <strong>{crisis.nearestCrisisLine.service}</strong>
                </p>
                <p className="font-poppins text-white text-lg font-bold mt-1">
                  {crisis.nearestCrisisLine.phone}
                </p>
                <p className="font-poppins text-white text-xs opacity-80 mt-1">
                  {t("crisis.available")}{" "}
                  {crisis.nearestCrisisLine.hours || "24/7"} •{" "}
                  {crisis.nearestCrisisLine.country}
                </p>
              </div>
            )}
            <p className="font-poppins text-white text-xs opacity-90">
              {t("crisis.notAlone")}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto bg-[#0F0F14] rounded-none sm:rounded-2xl overflow-hidden shadow-2xl border-0 sm:border sm:border-[#262630] relative">
      {/* History Sidebar */}
      {showHistory && (
        <div
          ref={historyPanelRef}
          className="absolute top-0 left-0 h-full w-full sm:w-80 bg-[#1A1B25] border-r border-[#262630] z-50 overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-[#262630]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins font-semibold text-white text-base sm:text-lg">
                {t("history.title")}
              </h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-white text-opacity-60 hover:text-opacity-100 p-2 -mr-2 touch-manipulation"
                aria-label="Close history"
              >
                <X size={20} />
              </button>
            </div>
            <button
              onClick={startNewConversation}
              className="w-full bg-gradient-to-r from-[#614BFF] to-[#8360FF] hover:from-[#553DE8] hover:to-[#7352E8] active:scale-95 text-white font-poppins font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation"
            >
              <MessageSquare size={18} />
              {t("history.new")}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {isLoadingHistory ? (
              <p className="font-poppins text-white text-opacity-60 text-sm text-center py-4">
                {t("history.loading")}
              </p>
            ) : conversationHistory.length === 0 ? (
              <p className="font-poppins text-white text-opacity-60 text-sm text-center py-4">
                {t("history.empty")}
              </p>
            ) : (
              conversationHistory.map((conv) => (
                <div
                  key={conv.id}
                  className="bg-[#262630] rounded-lg p-3 mb-2 hover:bg-[#2d2d3a] transition-colors group"
                >
                  <button
                    onClick={() => loadSpecificConversation(conv.sessionId)}
                    className="w-full text-left"
                  >
                    <h3 className="font-poppins font-medium text-white text-sm mb-1 truncate">
                      {conv.title}
                    </h3>
                    <p className="font-poppins text-white text-opacity-50 text-xs">
                      {new Date(conv.updatedAt).toLocaleDateString()} •{" "}
                      {conv.messageCount} {t("history.messages")}
                    </p>
                  </button>
                  <button
                    onClick={() => deleteConversation(conv.id)}
                    className="mt-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className="flex items-center justify-between px-3 sm:px-5 bg-[#1A1B25] border-b border-[#262630]"
        style={{
          paddingTop: "max(12px, env(safe-area-inset-top))",
          paddingBottom: "12px",
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            data-history-trigger
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 sm:p-2.5 rounded-full hover:bg-[#262630] active:bg-[#2d2d3a] transition-all duration-200 group touch-manipulation"
            title="Conversation History"
            aria-label="Conversation History"
          >
            <History
              size={20}
              className="sm:hidden text-white text-opacity-70 group-hover:text-opacity-100 transition-opacity"
            />
            <History
              size={22}
              className="hidden sm:block text-white text-opacity-70 group-hover:text-opacity-100 transition-opacity"
            />
          </button>
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white">
            <img
              src="https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/"
              alt="Blue"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div>
            <h1 className="font-poppins font-semibold text-white text-base sm:text-lg">
              Blue
            </h1>
            <p className="font-poppins text-[#10B981] text-xs font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
              {t("header.online")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Language Switcher */}
          <div className="relative" ref={langMenuRef}>
            <button
              data-lang-trigger
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-2 sm:p-2.5 rounded-full hover:bg-[#262630] active:bg-[#2d2d3a] transition-all duration-200 group touch-manipulation flex items-center gap-1"
              title={t("header.language")}
              aria-label={t("header.language")}
            >
              <Globe
                size={20}
                className="text-white text-opacity-70 group-hover:text-opacity-100 transition-opacity"
              />
              <span className="hidden sm:block text-white text-opacity-70 text-base leading-none">
                {LANGUAGES[language]?.flag}
              </span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 top-full mt-2 bg-[#1A1B25] border border-[#262630] rounded-xl shadow-2xl z-50 overflow-hidden min-w-[180px]">
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#262630] ${
                      language === code ? "bg-[#262630]" : ""
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-poppins text-white text-sm flex-1">
                      {lang.nativeName}
                    </span>
                    {language === code && (
                      <span className="text-[#614BFF] text-sm">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="/account/profile"
            className="p-2 sm:p-2.5 rounded-full hover:bg-[#262630] active:bg-[#2d2d3a] transition-all duration-200 group touch-manipulation"
            title="Profile"
            aria-label="Profile"
          >
            <User
              size={20}
              className="sm:hidden text-white text-opacity-70 group-hover:text-opacity-100 transition-opacity"
            />
            <User
              size={22}
              className="hidden sm:block text-white text-opacity-70 group-hover:text-opacity-100 transition-opacity"
            />
          </a>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 sm:p-2.5 rounded-full hover:bg-[#262630] active:bg-[#2d2d3a] transition-all duration-200 group touch-manipulation"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell
              size={20}
              className="sm:hidden text-white text-opacity-70 group-hover:text-opacity-100 transition-opacity"
            />
            <Bell
              size={22}
              className="hidden sm:block text-white text-opacity-70 group-hover:text-opacity-100 transition-opacity"
            />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#10B981] rounded-full border-2 border-[#1A1B25]"></span>
          </button>
          <BlogMenu />
        </div>
      </div>

      {/* Alerts */}
      {prankDetected && <PrankAlert prank={prankDetected} />}
      {crisisDetected && <CrisisAlert crisis={crisisDetected} />}

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-1 overscroll-contain"
        style={{
          WebkitOverflowScrolling: "touch",
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(122, 90, 248, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(61, 157, 246, 0.03) 0%, transparent 50%)",
        }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white mb-6 shadow-xl">
              <img
                src="https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/"
                alt="Blue"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <h2 className="font-poppins font-semibold text-white text-xl sm:text-2xl mb-3 text-center">
              {t("welcome.title")}
            </h2>
            <h3 className="font-poppins font-bold text-white text-lg sm:text-xl mb-2 text-center max-w-lg">
              {t("welcome.subtitle")}
            </h3>
            <p className="font-poppins text-white text-opacity-90 text-center max-w-lg text-sm sm:text-base">
              {t("welcome.description")}
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 mb-6">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-transparent">
                  <img
                    src="https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/"
                    alt="Blue"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <span className="font-poppins text-[#7A5AF8] text-sm">
                    {t("chat.typing")}
                    <span className="typing-dots">...</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div
        className="p-3 sm:p-4 bg-[#1A1B25] border-t border-[#262630] flex-shrink-0"
        style={{
          paddingBottom: "max(16px, calc(env(safe-area-inset-bottom) + 8px))",
        }}
      >
        <div className="bg-[#262630] rounded-2xl px-3 sm:px-4 py-3 flex items-center gap-2">
          {/* Emoji and GIF buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 relative">
            <button
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
                setShowGifPicker(false);
              }}
              className="text-white text-opacity-60 hover:text-opacity-100 transition-colors duration-200 touch-manipulation flex-shrink-0"
              title="Add emoji"
            >
              <Smile size={18} className="sm:hidden" />
              <Smile size={22} className="hidden sm:block" />
            </button>

            <button
              onClick={() => {
                setShowGifPicker(!showGifPicker);
                setShowEmojiPicker(false);
              }}
              className="text-white text-opacity-60 hover:text-opacity-100 transition-colors duration-200 touch-manipulation flex-shrink-0"
              title="Add GIF"
            >
              <ImageIcon size={18} className="sm:hidden" />
              <ImageIcon size={22} className="hidden sm:block" />
            </button>

            {showEmojiPicker && (
              <div ref={emojiPickerRef}>
                <EmojiPicker
                  onSelect={handleEmojiSelect}
                  onClose={() => setShowEmojiPicker(false)}
                />
              </div>
            )}

            {showGifPicker && (
              <div ref={gifPickerRef}>
                <GifPicker
                  onSelect={handleGifSelect}
                  onClose={() => setShowGifPicker(false)}
                />
              </div>
            )}
          </div>

          {/* Input field */}
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("input.placeholder")}
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none font-poppins text-sm min-w-0"
            style={{ fontSize: "16px" }}
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!messageText.trim() && !isLoading}
            className="rounded-full transition-all duration-200 touch-manipulation"
            style={{
              width: "44px",
              height: "44px",
              minWidth: "44px",
              minHeight: "44px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #614BFF 0%, #8360FF 100%)",
              opacity: messageText.trim() ? 1 : 0.6,
              cursor: messageText.trim() ? "pointer" : "not-allowed",
              boxShadow: messageText.trim()
                ? "0 4px 16px rgba(97, 75, 255, 0.5)"
                : "0 2px 8px rgba(97, 75, 255, 0.2)",
              transform: messageText.trim() ? "scale(1)" : "scale(0.95)",
            }}
            aria-label="Send message"
          >
            <Send size={20} className="text-white" style={{ flexShrink: 0 }} />
          </button>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-3 px-2">
          <p className="font-poppins text-white text-opacity-50 text-[10px] text-center leading-relaxed">
            {t("footer.disclaimer")}
          </p>
          <p className="font-poppins text-white text-opacity-40 text-[10px] text-center mt-2">
            {t("footer.credit")}
          </p>
        </div>
      </div>

      <style jsx>{`
        .font-poppins {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .typing-dots {
          display: inline-block;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
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

        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .overscroll-contain {
          overscroll-behavior: contain;
        }

        @media (prefers-reduced-motion: no-preference) {
          .overflow-y-auto {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
}
