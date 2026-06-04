import { motion } from "framer-motion";

export function TopBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-50 h-9 flex items-center px-4 text-xs border-b"
      style={{ background: "rgba(0,0,0,0.6)", color: "#fff", borderColor: "var(--border)", backdropFilter: "blur(14px)" }}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--green-up)" }}
          />
          <span className="opacity-70">Market Open</span>
        </div>
        <span className="hidden sm:inline opacity-40">|</span>
        <div className="flex items-center gap-2 tnum">
          <span className="opacity-80">DSEX</span>
          <span className="font-semibold">6,241.30</span>
          <span style={{ color: "#4ade80" }}>▲ 18.40 (+0.30%)</span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4 tnum">
        <span style={{ color: "var(--sky-100)" }}>DS30 2,118.4 ▲0.18%</span>
        <span style={{ color: "#fca5a5" }}>DSES 1,340.2 ▼0.05%</span>
        <button className="px-2.5 py-0.5 rounded-full border border-white/30 hover:bg-white/10 transition text-[11px]">
          EN | <span className="bengali">বাং</span>
        </button>
      </div>
    </motion.div>
  );
}
