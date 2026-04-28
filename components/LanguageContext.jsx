"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { LANGUAGES, getT } from "../utils/translations";
import {
  detectLanguage,
  saveLanguage,
  getSavedLanguage,
  getBrowserLanguage,
} from "../utils/languageDetection";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Start with saved or browser language immediately (no async)
  // so the UI renders correctly on first paint with no flash
  const getInitialLang = () => {
    if (typeof window === "undefined") return "en";
    return getSavedLanguage() || getBrowserLanguage() || "en";
  };

  const [language, setLanguageSafe] = useState(getInitialLang);
  const [detectionSource, setDetectionSource] = useState("default");

  // On mount, run the full async detection (handles IP fallback)
  useEffect(() => {
    const alreadySaved = getSavedLanguage();
    // If user already has a saved preference, don't override it
    if (alreadySaved) {
      setDetectionSource("saved");
      return;
    }

    detectLanguage().then(({ lang, source }) => {
      setLanguageSafe(lang);
      setDetectionSource(source);
    });
  }, []);

  // Update <html dir> for RTL languages (e.g. Arabic)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const dir = LANGUAGES[language]?.dir || "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const changeLanguage = useCallback((lang) => {
    if (!LANGUAGES[lang]) return;
    setLanguageSafe(lang);
    setDetectionSource("saved");
    saveLanguage(lang);
  }, []);

  const t = useCallback(getT(language), [language]);

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    LANGUAGES,
    detectionSource,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback for components rendered outside the provider
    const t = getT("en");
    return {
      language: "en",
      setLanguage: () => {},
      t,
      LANGUAGES,
      detectionSource: "default",
    };
  }
  return ctx;
}

export default LanguageContext;
