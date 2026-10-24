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

// Lista de zonas horarias IANA correspondientes a países y territorios hispanohablantes
const SPANISH_SPEAKING_TIMEZONES = [
  // España
  "Europe/Madrid",
  "Atlantic/Canary",
  "Africa/Ceuta",
  // México
  "America/Mexico_City",
  "America/Cancun",
  "America/Monterrey",
  "America/Merida",
  "America/Chihuahua",
  "America/Hermosillo",
  "America/Tijuana",
  "America/Mazatlan",
  // Centroamérica
  "America/Guatemala",
  "America/Tegucigalpa",
  "America/El_Salvador",
  "America/Managua",
  "America/Costa_Rica",
  "America/Panama",
  // El Caribe
  "America/Santo_Domingo",
  "America/Havana",
  "America/Puerto_Rico",
  // Sudamérica
  "America/Bogota",
  "America/Caracas",
  "America/Lima",
  "America/Guayaquil",
  "America/La_Paz",
  "America/Santiago",
  "America/Punta_Arenas",
  "America/Asuncion",
  "America/Buenos_Aires",
  "America/Argentina/Cordoba",
  "America/Argentina/Buenos_Aires",
  "America/Argentina/Mendoza",
  "America/Argentina/Rosario",
  "America/Montevideo",
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1. Verificar si el usuario ya seleccionó manualmente un idioma (LocalStorage o Cookie)
    try {
      const savedLocal = localStorage.getItem("stellaris_lang") as Language | null;
      if (savedLocal === "en" || savedLocal === "es") {
        setLangState(savedLocal);
        document.documentElement.lang = savedLocal;
        return;
      }

      // Check cookie
      const match = document.cookie.match(/(?:^|;\s*)stellaris_lang=([^;]+)/);
      if (match && (match[1] === "en" || match[1] === "es")) {
        const cookieLang = match[1] as Language;
        setLangState(cookieLang);
        document.documentElement.lang = cookieLang;
        return;
      }
    } catch {
      // Ignorar restricciones en entornos cerrados
    }

    // 2. Detección Inteligente:
    // Prioriza Inglés internacionalmente, pero si detecta país/entorno hispanohablante activa Español
    let detectedLang: Language = "en";

    try {
      // A) Detección por idiomas del navegador (Accept-Language / navigator.languages)
      const browserLanguages = navigator.languages || [navigator.language || ""];
      const hasSpanishBrowser = browserLanguages.some((l) =>
        l.toLowerCase().startsWith("es")
      );

      // B) Detección por zona horaria de país hispanohablante
      let isSpanishTimezone = false;
      try {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (userTimezone) {
          isSpanishTimezone = SPANISH_SPEAKING_TIMEZONES.some(
            (tz) => tz.toLowerCase() === userTimezone.toLowerCase()
          );
        }
      } catch {
        // Fallback
      }

      if (hasSpanishBrowser || isSpanishTimezone) {
        detectedLang = "es";
      } else {
        detectedLang = "en"; // Prioridad global
      }
    } catch {
      detectedLang = "en";
    }

    setLangState(detectedLang);
    document.documentElement.lang = detectedLang;
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;

    // Guardar preferencia de forma persistente en LocalStorage y Cookie
    try {
      localStorage.setItem("stellaris_lang", newLang);
      document.cookie = `stellaris_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
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
