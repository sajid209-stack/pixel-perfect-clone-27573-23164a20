import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }) + " BST"
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-50 h-8 flex items-center px-6 text-[11px] tracking-wide"
      style={{
        background: "rgb(var(--surface-rgb) / 0.85)",
        color: "var(--text-secondary)",
        borderBottom: "1px solid rgb(var(--ov) / 0.04)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ background: "var(--green-up)" }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ background: "var(--green-up)" }}
            />
          </span>
          <span style={{ color: "var(--text-primary)" }}>Market open</span>
          <span style={{ color: "var(--text-muted)" }}>· closes 14:30</span>
        </div>
        <span className="hidden sm:inline tnum" style={{ color: "var(--text-muted)" }}>{time}</span>
      </div>

      <div className="hidden md:flex items-center gap-5 tnum">
        <span className="inline-flex items-center gap-1.5">
          <span style={{ color: "var(--text-muted)" }}>DSEX</span>
          <span style={{ color: "var(--text-primary)" }}>6,241.30</span>
          <span style={{ color: "var(--green-up)" }}>+0.30%</span>
        </span>
        <span className="opacity-20">·</span>
        <button
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 transition hover:bg-white/5"
          style={{ color: "var(--text-secondary)" }}
        >
          EN <span className="opacity-40">/</span> <span className="bengali">বাং</span>
        </button>
      </div>
    </motion.div>
  );
}
