"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { TRANSLATIONS, Language } from "@/i18n/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof TRANSLATIONS)["en"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check if user already manually selected a language
    const saved = localStorage.getItem("stellaris_lang") as Language | null;
    if (saved === "en" || saved === "es") {
      setLangState(saved);
      return;
    }

    // 2. Auto-detect browser/system language
    try {
      const browserLanguages = navigator.languages || [navigator.language || ""];
      const isSpanish = browserLanguages.some((l) =>
        l.toLowerCase().startsWith("es")
      );

      if (isSpanish) {
        setLangState("es");
      } else {
        setLangState("en");
      }
    } catch {
      setLangState("en");
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("stellaris_lang", newLang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
