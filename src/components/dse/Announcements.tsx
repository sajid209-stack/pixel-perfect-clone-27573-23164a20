import { motion } from "framer-motion";
import { useState } from "react";
import { announcements } from "./data";

const typeStyle: Record<string, { bg: string; fg: string; border: string }> = {
  "Price sensitive": { bg: "rgba(16,240,160,0.12)", fg: "var(--green-up)", border: "var(--green-up)" },
  Dividend: { bg: "var(--green-up-light)", fg: "var(--green-up)", border: "var(--green-up)" },
  "AGM notice": { bg: "var(--amber-light)", fg: "var(--amber)", border: "var(--amber)" },
  Regulatory: { bg: "var(--red-down-light)", fg: "var(--red-down)", border: "var(--red-down)" },
};

const filters = ["All", "Price sensitive", "Dividend", "AGM/EGM", "Regulatory"];

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{ background: "var(--green-up)", boxShadow: "0 0 10px var(--green-up)" }}
      />
    </div>
  );
}

export function Announcements() {
  const [filter, setFilter] = useState("All");
  return (
    <section className="py-32 px-6 relative" style={{ background: "radial-gradient(900px 500px at 100% 100%, rgba(16,240,160,0.05), transparent 65%)" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[60fr_40fr] gap-10">
        <div>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>Disclosures</div>
              <a className="text-sm font-medium" style={{ color: "var(--green-up)" }}>View all →</a>
            </div>
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Latest announcements</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1 rounded-full text-xs transition"
                style={
                  filter === f
                    ? { background: "var(--green-up)", color: "#07090A", border: "1px solid var(--green-up)", boxShadow: "0 0 12px rgba(16,240,160,0.45)" }
                    : { background: "rgba(255,255,255,0.04)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
                }
              >
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 5).map((a, i) => {
              const s = typeStyle[a.type] ?? typeStyle.Regulatory;
              return (
                <motion.div
                  key={a.code + i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ x: 2 }}
                  className="glass p-5 flex gap-4 items-start"
                >
                  <div className="px-2 py-1 rounded-md text-[11px] tnum" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)" }}>
                    {a.date}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{a.code}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{a.name}</span>
                    </div>
                    <div className="text-sm mt-1 truncate" style={{ color: "var(--text-secondary)" }}>{a.summary}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap" style={{ background: s.bg, color: s.fg }}>
                    {a.type}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>Capital raising</div>
              <a className="text-sm font-medium" style={{ color: "var(--green-up)" }}>Full schedule →</a>
            </div>
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>IPO pipeline</h2>
          </div>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong p-5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: "var(--green-up-light)", color: "var(--green-up)" }}>
                  Subscription open
                </span>
                <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Closes Jun 10</span>
              </div>
              <div className="font-semibold mt-2" style={{ color: "var(--text-primary)" }}>Sample Bangladesh Co. Ltd.</div>
              <div className="flex items-center justify-between text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                <span>Offer price <span className="tnum font-semibold" style={{ color: "var(--text-primary)" }}>৳ 10</span>/share</span>
                <span className="tnum">73% filled</span>
              </div>
              <div className="mt-3"><ProgressBar pct={73} /></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass p-5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: "var(--amber-light)", color: "var(--amber)" }}>
                  Upcoming
                </span>
                <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Opens Jun 18, 2026</span>
              </div>
              <div className="font-semibold mt-2" style={{ color: "var(--text-primary)" }}>Another Sample Co. Ltd.</div>
              <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                Offer price <span className="tnum font-semibold" style={{ color: "var(--text-primary)" }}>৳ 15</span>/share
              </div>
            </motion.div>

            <div className="glass p-4">
              <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>New to IPOs?</div>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                Understand the subscription process, eligibility, and how allotment works.
              </p>
              <a className="text-xs font-medium mt-2 inline-block" style={{ color: "var(--green-up)" }}>
                Learn how to apply →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
