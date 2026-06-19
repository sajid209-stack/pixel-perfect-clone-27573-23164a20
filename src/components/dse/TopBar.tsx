import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useLang } from "@/i18n/LanguageContext";
import { openSiteSearch } from "./CommandPalette";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// Trading days: Sun(0) – Thu(4), 10:00 – 14:30 BST
function isTradingDay(d: Date) {
  const dow = d.getDay();
  return dow >= 0 && dow <= 4;
}
function nextOpen(from: Date): Date {
  const d = new Date(from);
  d.setHours(10, 0, 0, 0);
  if (d.getTime() <= from.getTime() || !isTradingDay(d)) {
    d.setDate(d.getDate() + 1);
    d.setHours(10, 0, 0, 0);
  }
  while (!isTradingDay(d)) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}
function fmtDelta(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h >= 1) return `${h}h ${String(m).padStart(2, "0")}m`;
  const s = total % 60;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

export function TopBar() {
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [countdown, setCountdown] = useState("");
  const [targetLabel, setTargetLabel] = useState("");
  const { lang, toggle, t } = useLang();

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }) + " BST"
      );
      const mins = d.getHours() * 60 + d.getMinutes();
      const open = isTradingDay(d) && mins >= 600 && mins < 870;
      setIsOpen(open);
      if (open) {
        const close = new Date(d);
        close.setHours(14, 30, 0, 0);
        setCountdown(fmtDelta(close.getTime() - d.getTime()));
        setTargetLabel("Closes 14:30");
      } else {
        const no = nextOpen(d);
        setCountdown(fmtDelta(no.getTime() - d.getTime()));
        const sameDay = no.toDateString() === d.toDateString();
        setTargetLabel(sameDay ? "Opens 10:00" : `Opens ${DAY_NAMES[no.getDay()]} 10:00`);
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const label = isOpen ? t("Market open") : t("Market closed");

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
          <span className="tnum text-[11.5px]" style={{ color: "var(--text-muted)" }}>
            · {targetLabel} · in {countdown}
          </span>
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
          onClick={() => openSiteSearch()}
          aria-label={lang === "bn" ? "সাইট অনুসন্ধান" : "Open site search"}
          title={lang === "bn" ? "অনুসন্ধান (Ctrl+K)" : "Search (Ctrl+K)"}
          className="inline-flex items-center justify-center w-6 h-6 transition cursor-pointer"
          style={{ color: "var(--text-secondary)" }}
        >
          <Search className="w-3.5 h-3.5" />
        </button>
        <span style={{ color: "var(--line)" }}>·</span>
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
