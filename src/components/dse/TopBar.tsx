import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useLang } from "@/i18n/LanguageContext";

function computeMarketState() {
  const h = new Date().getHours();
  // Open between 10:00 and 14:30 (treat anything in [10, 14] as open during this demo window)
  const isOpen = h >= 10 && h < 14;
  return isOpen;
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

  const dotColor = isOpen ? "var(--green-up)" : "var(--text-muted)";
  const label = isOpen ? t("Market open") : t("Market closed");
  const sub = isOpen ? t("· closes 14:30") : t("· Opens Jun 8 at 10:00 AM");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-50 h-[34px] flex items-center px-6 text-[12.5px]"
      style={{
        background: "var(--brand)",
        color: "#ffffff",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            {isOpen && (
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: "#7ee6a8" }}
              />
            )}
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ background: isOpen ? "#7ee6a8" : "rgba(255,255,255,0.5)" }}
            />
          </span>
          <span style={{ color: "#ffffff" }}>{label}</span>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>{sub}</span>
        </div>
        <span className="hidden sm:inline tnum" style={{ color: "rgba(255,255,255,0.65)" }}>{time}</span>
      </div>

      <div className="hidden md:flex items-center gap-4 tnum">
        <span className="inline-flex items-center gap-1.5">
          <span style={{ color: "rgba(255,255,255,0.65)" }}>DSEX</span>
          <span style={{ color: "#ffffff" }}>6,241.30</span>
          <span style={{ color: isOpen ? "#7ee6a8" : "rgba(255,255,255,0.65)" }}>+0.30%</span>
        </span>
        <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
        <button
          onClick={toggle}
          aria-label="Toggle language"
          className="inline-flex items-center gap-1 transition cursor-pointer"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          <span style={{ color: lang === "en" ? "#ffffff" : "rgba(255,255,255,0.55)", fontWeight: lang === "en" ? 600 : 400 }}>EN</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>/</span>
          <span className="bengali" style={{ color: lang === "bn" ? "#ffffff" : "rgba(255,255,255,0.55)", fontWeight: lang === "bn" ? 600 : 400 }}>বাং</span>
        </button>
        <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
        <span style={{ color: "rgba(255,255,255,0.85)" }}>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>Helpline </span>+880 9612-345678
        </span>
        <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
        <a
          href="#"
          className="inline-flex items-center gap-1"
          style={{ color: "#ffffff", fontWeight: 600 }}
        >
          Investor login
        </a>
        <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
        <ThemeToggle />
      </div>
    </motion.div>
  );
}
