import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { sectors, topGainers, topLosers, mostActive } from "./data";

function colorFor(c: number) {
  if (c > 1) return "#1D9E75";
  if (c > 0.1) return "#5DCAA5";
  if (c >= -0.1) return "#B4B2A9";
  if (c >= -1) return "#F0997B";
  return "#D85A30";
}

const sizeMap: Record<string, string> = {
  lg: "col-span-2 row-span-2",
  md: "col-span-2 row-span-1",
  sm: "col-span-1 row-span-1",
};

function Heatmap() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>Sector performance</h3>
        <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--text-secondary)" }}>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--green-up)" }} /> Gaining</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--red-down)" }} /> Declining</span>
        </div>
      </div>
      <div className="grid grid-cols-6 grid-rows-4 gap-1.5 h-[360px]">
        {sectors.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04, zIndex: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            onHoverStart={() => setHover(i)}
            onHoverEnd={() => setHover(null)}
            className={`${sizeMap[s.size]} rounded-lg p-3 flex flex-col justify-between cursor-pointer relative`}
            style={{ background: colorFor(s.change) }}
          >
            <div className="text-white text-[11px] font-medium leading-tight">{s.name}</div>
            <div className="text-white text-[15px] font-bold tnum">
              {s.change > 0 ? "+" : ""}{s.change.toFixed(1)}%
            </div>
            <AnimatePresence>
              {hover === i && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-strong absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full px-3 py-2 text-[11px] whitespace-nowrap z-20"
                  style={{ color: "var(--text-primary)" }}
                >
                  <div className="font-semibold">{s.name}</div>
                  <div className="tnum" style={{ color: s.change >= 0 ? "var(--green-up)" : "var(--red-down)" }}>
                    {s.change >= 0 ? "▲" : "▼"} {Math.abs(s.change)}% today
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const tabs = { "Top gainers": topGainers, "Top losers": topLosers, "Most active": mostActive } as const;
type TabKey = keyof typeof tabs;

function MoversPanel() {
  const [tab, setTab] = useState<TabKey>("Top gainers");
  const rows = tabs[tab];
  return (
    <div className="glass p-5">
      <div className="flex gap-5 border-b mb-3" style={{ borderColor: "var(--border)" }}>
        {(Object.keys(tabs) as TabKey[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="pb-2 text-sm transition relative"
            style={{ color: tab === t ? "var(--green-up)" : "var(--text-secondary)", fontWeight: tab === t ? 600 : 400 }}
          >
            {t}
            {tab === t && <motion.div layoutId="moverTab" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "var(--green-up)", boxShadow: "0 0 8px var(--green-up)" }} />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {rows.map((r, i) => {
            const up = r.change >= 0;
            return (
              <motion.div
                key={r.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 py-2.5 border-b last:border-0 hover:bg-white/5 px-2 rounded transition"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>{r.code}</div>
                  <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{r.name}</div>
                </div>
                <div className="w-[60px] h-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={r.spark}>
                      <Line type="monotone" dataKey="v" stroke={up ? "var(--green-up)" : "var(--red-down)"} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-[13px] tnum w-14 text-right" style={{ color: "var(--text-primary)" }}>{r.price.toLocaleString()}</div>
                <div
                  className="px-2 py-0.5 rounded-full text-[11px] font-medium tnum w-[64px] text-center"
                  style={{
                    background: up ? "var(--green-up-light)" : "var(--red-down-light)",
                    color: up ? "var(--green-up)" : "var(--red-down)",
                  }}
                >
                  {up ? "▲" : "▼"} {Math.abs(r.change).toFixed(2)}%
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function MarketOverview() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
          <h2 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Today's market overview</h2>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Jun 5, 2026 · Session closes 14:30 BST</span>
        </div>
        <div className="grid lg:grid-cols-[55fr_45fr] gap-6">
          <div className="glass p-5">
            <Heatmap />
          </div>
          <MoversPanel />
        </div>
      </div>
    </section>
  );
}
