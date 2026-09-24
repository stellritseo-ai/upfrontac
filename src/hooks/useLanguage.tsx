import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (enVal: string, esVal: string) => string;
  tObj: <T>(translations: { en: T; es: T }) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (saved === "en" || saved === "es") {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  // Simple translator helper for inline text
  const t = (enVal: string, esVal: string): string => {
    return language === "es" ? esVal : enVal;
  };

  // For complex objects (arrays, configurations, etc.)
  const tObj = <T,>(translations: { en: T; es: T }): T => {
    return translations[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tObj }}>
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
