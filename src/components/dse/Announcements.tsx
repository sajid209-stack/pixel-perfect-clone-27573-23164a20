import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Bell, FileText, TrendingUp, AlertCircle, Calendar } from "lucide-react";
import { announcements } from "./data";

const typeConfig: Record<string, { color: string; bg: string; icon: typeof Bell; label: string }> = {
  "Price sensitive": { color: "var(--green-up)", bg: "rgba(16,240,160,0.10)", icon: TrendingUp, label: "PSI" },
  Dividend: { color: "var(--green-up)", bg: "rgba(16,240,160,0.08)", icon: FileText, label: "DIV" },
  "AGM notice": { color: "var(--amber)", bg: "rgba(245,180,80,0.10)", icon: Calendar, label: "AGM" },
  Regulatory: { color: "var(--red-down)", bg: "rgba(255,90,90,0.10)", icon: AlertCircle, label: "REG" },
};

const filters = ["All", "Price sensitive", "Dividend", "AGM/EGM", "Regulatory"];

function CountUp({ value }: { value: number }) {
  return <span className="tnum">{value}</span>;
}

export function Announcements() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const featured = announcements[0];
  const featConfig = typeConfig[featured.type] ?? typeConfig.Regulatory;
  const FeatIcon = featConfig.icon;

  return (
    <section className="py-16 md:py-20 px-6 relative overflow-hidden">
      {/* ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(900px 500px at 80% 20%, rgba(16,240,160,0.04), transparent 65%), radial-gradient(700px 400px at 10% 90%, rgba(245,180,80,0.03), transparent 65%)"
      }} />

      <div className="max-w-7xl mx-auto relative">
        {/* editorial header */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: "var(--green-up)" }} />
              <div className="text-[11px] uppercase tracking-[0.24em] font-medium" style={{ color: "var(--green-up)" }}>
                Live disclosures
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--green-up)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--green-up)" }} />
              </span>
            </div>
            <h2 className="text-[44px] md:text-[64px] font-semibold tracking-[-0.02em] leading-[0.95]" style={{ color: "var(--text-primary)" }}>
              What's moving<br />
              <span className="italic font-light" style={{ color: "var(--green-up)" }}>the market today.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>Today's filings</div>
              <div className="text-[40px] font-semibold tnum tracking-tight" style={{ color: "var(--text-primary)" }}>
                <CountUp value={47} />
              </div>
            </div>
            <a className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border transition hover:translate-x-0.5 cursor-pointer"
              style={{ borderColor: "rgb(var(--ov) / 0.12)", color: "var(--text-primary)" }}>
              All filings
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* filter pills with animated active indicator */}
        <div className="flex flex-wrap gap-1 mb-10 p-1 rounded-full w-fit"
          style={{ background: "rgb(var(--ov) / 0.03)", border: "1px solid rgb(var(--ov) / 0.06)" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="relative px-4 py-2 rounded-full text-xs font-medium transition"
              style={{ color: filter === f ? "#07090A" : "var(--text-secondary)" }}
            >
              {filter === f && (
                <motion.div
                  layoutId="annFilter"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--green-up)", boxShadow: "0 0 20px rgba(16,240,160,0.35)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* FEATURED + LIST */}
          <div className="space-y-5">
            {/* Featured card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-10 rounded-3xl overflow-hidden group cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(16,240,160,0.06), rgb(var(--ov) / 0.02))",
                border: "1px solid rgba(16,240,160,0.18)",
              }}
            >
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
                style={{ background: "var(--green-up)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                    style={{ background: featConfig.bg, color: featConfig.color, border: `1px solid ${featConfig.color}40` }}>
                    <FeatIcon className="w-3 h-3" />
                    Featured · {featured.type}
                  </div>
                  <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{featured.date} · 14:22 BST</span>
                </div>
                <div className="flex items-baseline gap-4 mb-4">
                  <Link
                    to="/company/$ticker"
                    params={{ ticker: featured.code }}
                    className="text-[44px] font-bold leading-none tracking-tight hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {featured.code}
                  </Link>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{featured.name}</span>
                </div>
                <p className="text-[18px] leading-snug max-w-[40ch]" style={{ color: "var(--text-secondary)" }}>
                  {featured.summary}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-medium" style={{ color: "var(--green-up)" }}>
                  Read full disclosure
                  <ArrowUpRight className="w-4 h-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </motion.div>

            {/* List */}
            <div className="space-y-2">
              {announcements.slice(1).map((a, i) => {
                const cfg = typeConfig[a.type] ?? typeConfig.Regulatory;
                const Icon = cfg.icon;
                const isHovered = hovered === i;
                return (
                  <motion.div
                    key={a.code + i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative grid grid-cols-[auto_60px_1fr_auto] gap-4 items-center px-5 py-5 rounded-2xl cursor-pointer transition"
                    style={{
                      background: isHovered ? "rgb(var(--ov) / 0.03)" : "transparent",
                      border: "1px solid",
                      borderColor: isHovered ? "rgb(var(--ov) / 0.08)" : "rgb(var(--ov) / 0.04)",
                    }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl"
                      style={{ background: cfg.bg, color: cfg.color }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] tnum tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
                      {a.date}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Link
                          to="/company/$ticker"
                          params={{ ticker: a.code }}
                          className="font-semibold text-[15px] hover:underline"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {a.code}
                        </Link>
                        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>· {a.name}</span>
                      </div>
                      <div className="text-[13px] truncate" style={{ color: "var(--text-secondary)" }}>{a.summary}</div>
                    </div>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          className="text-xs font-medium flex items-center gap-1"
                          style={{ color: cfg.color }}
                        >
                          Open <ArrowUpRight className="w-3 h-3" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* IPO PIPELINE — vertical timeline */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] mb-1" style={{ color: "var(--text-muted)" }}>Capital raising</div>
                <h3 className="text-[24px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>IPO Pipeline</h3>
              </div>
              <a className="text-xs font-medium flex items-center gap-1 cursor-pointer" style={{ color: "var(--green-up)" }}>
                All <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="relative">
              {/* timeline line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(180deg, rgba(16,240,160,0.4), rgb(var(--ov) / 0.05))" }} />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-12 pb-6"
              >
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "var(--green-up)", boxShadow: "0 0 20px rgba(16,240,160,0.5)" }}>
                  <span className="text-[10px] font-bold" style={{ color: "#07090A" }}>LIVE</span>
                </div>
                <div className="p-6 rounded-2xl"
                  style={{ background: "rgba(16,240,160,0.04)", border: "1px solid rgba(16,240,160,0.2)" }}>
                  <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "var(--green-up)" }}>
                    Subscription open
                  </div>
                  <div className="font-semibold text-[17px] mb-1" style={{ color: "var(--text-primary)" }}>
                    Sample Bangladesh Co.
                  </div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      ৳ <span className="tnum font-semibold text-[18px]" style={{ color: "var(--text-primary)" }}>10</span>/share
                    </span>
                    <span className="text-xs tnum" style={{ color: "var(--text-muted)" }}>Closes Jun 10</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span style={{ color: "var(--text-muted)" }}>Subscribed</span>
                    <span className="tnum font-semibold" style={{ color: "var(--green-up)" }}>73%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgb(var(--ov) / 0.06)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "73%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, var(--green-up), #10f0a0)", boxShadow: "0 0 12px var(--green-up)" }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative pl-12 pb-6"
              >
                <div className="absolute left-[7px] top-2 w-4 h-4 rounded-full border-2"
                  style={{ background: "var(--bg-primary)", borderColor: "var(--amber)" }} />
                <div className="p-5 rounded-2xl"
                  style={{ background: "rgb(var(--ov) / 0.02)", border: "1px solid rgb(var(--ov) / 0.06)" }}>
                  <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "var(--amber)" }}>
                    Upcoming · Jun 18
                  </div>
                  <div className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Another Sample Co.</div>
                  <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    ৳ <span className="tnum font-semibold" style={{ color: "var(--text-primary)" }}>15</span>/share
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative pl-12"
              >
                <div className="absolute left-[7px] top-2 w-4 h-4 rounded-full border-2"
                  style={{ background: "var(--bg-primary)", borderColor: "rgb(var(--ov) / 0.2)" }} />
                <div className="p-5 rounded-2xl group cursor-pointer"
                  style={{ background: "rgb(var(--ov) / 0.02)", border: "1px dashed rgb(var(--ov) / 0.1)" }}>
                  <div className="flex items-start gap-3">
                    <Bell className="w-4 h-4 mt-0.5" style={{ color: "var(--text-muted)" }} />
                    <div>
                      <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>New to IPOs?</div>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        Learn the subscription process, eligibility, and how allotment works.
                      </p>
                      <div className="mt-3 text-xs font-medium inline-flex items-center gap-1" style={{ color: "var(--green-up)" }}>
                        Start guide <ArrowUpRight className="w-3 h-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
