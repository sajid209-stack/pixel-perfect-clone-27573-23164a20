import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict } from "./dict";

export type Lang = "en" | "bn";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (s: string) => string;
};

const LanguageCtx = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
  t: (s) => s,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dse-lang");
      if (stored === "bn" || stored === "en") setLangState(stored);
    } catch {
      // ignore
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("dse-lang", l);
    } catch {
      // ignore
    }
  };

  const toggle = () => setLang(lang === "en" ? "bn" : "en");

  const t = (s: string) => (lang === "bn" ? dict[s] ?? s : s);

  return (
    <LanguageCtx.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export const useLang = () => useContext(LanguageCtx);
