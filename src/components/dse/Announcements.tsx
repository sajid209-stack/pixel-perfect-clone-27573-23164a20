import { motion } from "framer-motion";
import { useState } from "react";
import { announcements } from "./data";

const typeStyle: Record<string, { bg: string; fg: string; border: string }> = {
  "Price sensitive": { bg: "var(--sky-50)", fg: "var(--navy-deep)", border: "var(--navy-mid)" },
  Dividend: { bg: "var(--green-up-light)", fg: "var(--green-up)", border: "var(--green-up)" },
  "AGM notice": { bg: "var(--amber-light)", fg: "var(--amber)", border: "var(--amber)" },
  Regulatory: { bg: "var(--red-down-light)", fg: "var(--red-down)", border: "var(--red-down)" },
};

const filters = ["All", "Price sensitive", "Dividend", "AGM/EGM", "Regulatory"];

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{ background: "var(--green-up)" }}
      />
    </div>
  );
}

export function Announcements() {
  const [filter, setFilter] = useState("All");
  return (
    <section className="py-12 px-6" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[60fr_40fr] gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] font-bold" style={{ color: "var(--navy-deep)" }}>Latest announcements</h2>
            <a className="text-sm font-medium" style={{ color: "var(--navy-mid)" }}>View all →</a>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1 rounded-full text-xs border transition"
                style={
                  filter === f
                    ? { background: "var(--navy-mid)", color: "#fff", borderColor: "var(--navy-mid)" }
                    : { background: "#fff", color: "var(--text-secondary)", borderColor: "var(--border)" }
                }
              >
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-2.5">
            {announcements.map((a, i) => {
              const s = typeStyle[a.type] ?? typeStyle.Regulatory;
              return (
                <motion.div
                  key={a.code + i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ x: 2 }}
                  className="bg-white rounded-lg border border-l-4 p-4 flex gap-4 items-start"
                  style={{ borderColor: "var(--border)", borderLeftColor: s.border }}
                >
                  <div className="px-2 py-1 rounded-md text-[11px] tnum" style={{ background: "var(--surface)", color: "var(--text-secondary)" }}>
                    {a.date}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: "var(--navy-deep)" }}>{a.code}</span>
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
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] font-bold" style={{ color: "var(--navy-deep)" }}>IPO pipeline</h2>
            <a className="text-sm font-medium" style={{ color: "var(--navy-mid)" }}>Full schedule →</a>
          </div>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-5 border border-l-4"
              style={{ borderColor: "var(--border)", borderLeftColor: "var(--green-up)" }}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: "var(--green-up-light)", color: "var(--green-up)" }}>
                  Subscription open
                </span>
                <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Closes Jun 10</span>
              </div>
              <div className="font-semibold mt-2" style={{ color: "var(--navy-deep)" }}>Sample Bangladesh Co. Ltd.</div>
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
              className="bg-white rounded-xl p-5 border border-l-4"
              style={{ borderColor: "var(--border)", borderLeftColor: "var(--amber)" }}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: "var(--amber-light)", color: "var(--amber)" }}>
                  Upcoming
                </span>
                <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Opens Jun 18, 2026</span>
              </div>
              <div className="font-semibold mt-2" style={{ color: "var(--navy-deep)" }}>Another Sample Co. Ltd.</div>
              <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                Offer price <span className="tnum font-semibold" style={{ color: "var(--text-primary)" }}>৳ 15</span>/share
              </div>
            </motion.div>

            <div className="rounded-xl p-4 border" style={{ background: "var(--sky-50)", borderColor: "var(--border)" }}>
              <div className="font-semibold text-sm" style={{ color: "var(--navy-deep)" }}>New to IPOs?</div>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                Understand the subscription process, eligibility, and how allotment works.
              </p>
              <a className="text-xs font-medium mt-2 inline-block" style={{ color: "var(--navy-mid)" }}>
                Learn how to apply →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
