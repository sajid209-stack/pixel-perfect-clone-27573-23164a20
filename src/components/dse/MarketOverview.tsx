import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowUpRight } from "lucide-react";
import { sectors, topGainers, topLosers, mostActive } from "./data";

/* ---------- Sector heatmap (variable-size bento cells) ---------- */

function spanClasses(size: "lg" | "md" | "sm") {
  if (size === "lg") return "col-span-2 row-span-2";
  if (size === "md") return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
}

function intensity(c: number) {
  return Math.min(1, Math.abs(c) / 2);
}

function SectorCell({ s, i }: { s: (typeof sectors)[number]; i: number }) {
  const up = s.change >= 0;
  const alpha = 0.10 + intensity(s.change) * 0.35;
  const bg = up
    ? `rgba(16,240,160,${alpha})`
    : `rgba(232,90,90,${alpha})`;
  const stroke = up ? "var(--green-up)" : "var(--red-down)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      className={`group relative rounded-xl overflow-hidden cursor-pointer transition-shadow ${spanClasses(s.size)}`}
      style={{
        background: bg,
        border: `1px solid ${up ? "rgba(16,240,160,0.25)" : "rgba(232,90,90,0.22)"}`,
      }}
    >
      <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div
            className="text-[11px] font-medium leading-tight"
            style={{ color: "#fff" }}
          >
            {s.name}
          </div>
          <div
            className="text-[14px] font-bold tnum"
            style={{ color: "#fff" }}
          >
            {up ? "+" : ""}{s.change.toFixed(1)}%
          </div>
        </div>

        <div className="h-5 -mx-1 opacity-90">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={s.spark}>
              <defs>
                <linearGradient id={`sec-${s.name.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={stroke}
                strokeWidth={1.4}
                fill={`url(#sec-${s.name.replace(/\s/g, "")})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tooltip */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full opacity-0 group-hover:opacity-100 transition px-3 py-2 rounded-lg text-[11px] whitespace-nowrap z-20"
        style={{
          background: "rgba(11,14,16,0.95)",
          color: "#fff",
          border: "1px solid rgb(var(--ov) / 0.2)",
          boxShadow: "0 12px 30px -10px rgba(0,0,0,0.5)",
        }}
      >
        <div className="font-semibold">{s.name}</div>
        <div className="opacity-70">Turnover · <span className="tnum">{s.turnover}</span></div>
      </div>
    </motion.div>
  );
}

function SectorPanel() {
  const advancing = sectors.filter((s) => s.change > 0).length;
  const declining = sectors.length - advancing;

  return (
    <div className="relative">
      <div className="flex items-baseline justify-between mb-6">
        <div
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-muted)" }}
        >
          Sector heatmap
        </div>
        <div className="flex items-center gap-5 text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
          <span>
            <span style={{ color: "var(--green-up)" }}>{advancing}</span> advancing
          </span>
          <span>
            <span style={{ color: "var(--red-down)" }}>{declining}</span> declining
          </span>
        </div>
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "76px",
          gridAutoFlow: "dense",
        }}
      >
        {sectors.map((s, i) => (
          <SectorCell key={s.name} s={s} i={i} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Movers ---------- */

const tabs = {
  "Top gainers": topGainers,
  "Top losers": topLosers,
  "Most active": mostActive,
} as const;
type TabKey = keyof typeof tabs;

function MoversPanel() {
  const [tab, setTab] = useState<TabKey>("Top gainers");
  const rows = tabs[tab];
  const showVolume = tab === "Most active";

  return (
    <div className="relative">
      <div className="flex items-baseline justify-between mb-8">
        <div
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-muted)" }}
        >
          Today's movers
        </div>
        <div className="flex gap-1">
          {(Object.keys(tabs) as TabKey[]).map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-3 py-1.5 rounded-full text-[12px] transition relative"
                style={{
                  color: active ? "var(--green-up)" : "var(--text-secondary)",
                  background: active ? "rgba(127,217,176,0.08)" : "transparent",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1"
        >
          {rows.map((r, i) => {
            const up = r.change >= 0;
            return (
              <motion.div
                key={r.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to="/company/$ticker"
                  params={{ ticker: r.code }}
                  className="group relative grid grid-cols-[1fr_100px_100px_28px] items-center gap-5 py-5 border-t cursor-pointer"
                  style={{ borderColor: "rgb(var(--ov) / 0.05)" }}
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span
                      className="text-[11px] tnum"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div
                        className="text-[17px] font-medium tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {r.code}
                      </div>
                      <div
                        className="text-[12px] truncate mt-0.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {r.name}
                      </div>
                    </div>
                  </div>
                  <div className="h-8 opacity-70 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={r.spark}>
                        <defs>
                          <linearGradient id={`mv-${r.code}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={up ? "var(--green-up)" : "var(--red-down)"} stopOpacity={0.35} />
                            <stop offset="100%" stopColor={up ? "var(--green-up)" : "var(--red-down)"} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke={up ? "var(--green-up)" : "var(--red-down)"}
                          strokeWidth={1.4}
                          fill={`url(#mv-${r.code})`}
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-[15px] tnum"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {showVolume && "volume" in r
                        ? (r as { volume: string }).volume
                        : r.price.toLocaleString()}
                    </div>
                    <div
                      className="text-[12px] tnum mt-0.5"
                      style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}
                    >
                      {up ? "▲" : "▼"} {Math.abs(r.change).toFixed(2)}%
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "var(--text-muted)" }}
                  />
                </Link>
              </motion.div>
            );
          })}
          <div className="h-px w-full" style={{ background: "rgb(var(--ov) / 0.05)" }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Section shell ---------- */

export function MarketOverview() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 mb-10 items-end">
          <div>
            <div
              className="text-[12px] uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Today's market — Jun 5, 2026
            </div>
            <h2
              className="text-[40px] md:text-[52px] font-semibold tracking-tight leading-[1.05]"
              style={{ color: "var(--text-primary)" }}
            >
              Where money <br /> moved today.
            </h2>
          </div>
          <div className="lg:justify-self-end max-w-[46ch]">
            <p
              className="text-[17px] leading-[1.8]"
              style={{ color: "var(--text-secondary)" }}
            >
              A live read of sector flows and the names doing the work — pulled from
              the closing tape as the session winds toward 14:30 BST.
            </p>
            <div className="mt-6 flex items-center gap-3 text-[12px] tnum" style={{ color: "var(--text-muted)" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: "var(--green-up)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--green-up)" }} />
              </span>
              Tape live · last tick 13:42:08
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[5fr_7fr] gap-x-20 gap-y-24">
          <SectorPanel />
          <MoversPanel />
        </div>
      </div>
    </section>
  );
}
