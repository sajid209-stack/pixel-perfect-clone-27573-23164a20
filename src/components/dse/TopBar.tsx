import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useLang } from "@/i18n/LanguageContext";

function computeMarketState() {
  const h = new Date().getHours();
  return h >= 10 && h < 14;
}

export function TopBar() {
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const { lang, toggle, t } = useLang();

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }) + " BST"
      );
      setIsOpen(computeMarketState());
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const label = isOpen ? t("Market open") : t("Market closed");
  const sub = isOpen ? t("· closes 14:30") : t("· Opens Jun 8 at 10:00 AM");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-50 h-[36px] flex items-center px-6 text-[12.5px]"
      style={{
        background: "var(--surface)",
        color: "var(--text-secondary)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            {isOpen && (
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: "var(--up, #1d7a3f)" }}
              />
            )}
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ background: isOpen ? "var(--up, #1d7a3f)" : "var(--text-muted)" }}
            />
          </span>
          <span style={{ color: "var(--text-secondary)" }}>{label}</span>
          <span style={{ color: "var(--ink)" }}>{sub}</span>
        </div>
        <span className="hidden sm:inline tnum" style={{ color: "var(--text-muted)" }}>{time}</span>
        <span className="hidden md:inline tnum" style={{ color: "var(--text-muted)" }}>·</span>
        <span className="hidden md:inline-flex items-center gap-1.5 tnum">
          <span style={{ color: "var(--text-muted)" }}>DSEX</span>
          <span style={{ color: "var(--ink)" }}>6,241.30</span>
          <span style={{ color: "var(--up, #1d7a3f)" }}>+0.30%</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={toggle}
          aria-label="Toggle language"
          className="inline-flex items-center gap-1 transition cursor-pointer"
        >
          <span style={{ color: lang === "en" ? "var(--ink)" : "var(--text-muted)", fontWeight: lang === "en" ? 600 : 400 }}>EN</span>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span className="bengali" style={{ color: lang === "bn" ? "var(--ink)" : "var(--text-muted)", fontWeight: lang === "bn" ? 600 : 400 }}>বাং</span>
        </button>
        <span style={{ color: "var(--line)" }}>·</span>
        <span style={{ color: "var(--text-secondary)" }}>
          <span style={{ color: "var(--text-muted)" }}>Helpline </span>+880 9612-345678
        </span>
        <span style={{ color: "var(--line)" }}>·</span>
        <a
          href="#"
          className="inline-flex items-center gap-1"
          style={{ color: "var(--brand-600, var(--brand))", fontWeight: 600 }}
        >
          Investor login
        </a>
        <span style={{ color: "var(--line)" }}>·</span>
        <ThemeToggle />
      </div>
    </motion.div>
  );
}
