import { motion } from "framer-motion";
import { useState } from "react";
import { Area, AreaChart, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, CartesianGrid } from "recharts";
import { longSeries } from "./data";

const indices = [
  { name: "DSEX", value: "6,241.30", change: 0.30, up: true },
  { name: "DS30", value: "2,118.40", change: 0.18, up: true },
  { name: "DSES (Shariah)", value: "1,340.20", change: -0.05, up: false },
];

const mini = (up: boolean) =>
  Array.from({ length: 24 }, (_, i) => ({ i, v: up ? 100 + i * 0.8 + Math.sin(i / 2) * 2 : 100 - i * 0.3 + Math.sin(i / 2) * 2 }));

const periods = ["1D", "1W", "1M", "3M"];

export function IndicesPanel() {
  const [period, setPeriod] = useState("1M");
  return (
    <section className="py-40 px-6 relative" style={{ background: "radial-gradient(800px 500px at 0% 50%, rgba(52,255,184,0.04), transparent 65%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="text-[12px] uppercase tracking-[0.18em] mb-4" style={{ color: "var(--text-muted)" }}>Performance</div>
          <h2 className="text-[36px] md:text-[44px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>Index performance</h2>
        </div>
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>Select period</span>
          <div className="flex gap-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-3 py-1 rounded-md text-xs transition"
                style={
                  period === p
                    ? { background: "var(--green-up)", color: "#07090A", fontWeight: 600, boxShadow: "0 0 12px rgba(16,240,160,0.45)" }
                    : { border: "1px solid var(--border)", color: "var(--text-secondary)", background: "rgba(255,255,255,0.03)" }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {indices.map((idx, i) => (
            <motion.div
              key={idx.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-8"
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{idx.name}</div>
                  <div className="text-2xl font-bold mt-1 tnum" style={{ color: "var(--text-primary)" }}>{idx.value}</div>
                </div>
                <div className="text-sm tnum font-semibold" style={{ color: idx.up ? "var(--green-up)" : "var(--red-down)" }}>
                  {idx.up ? "▲" : "▼"} {Math.abs(idx.change)}%
                </div>
              </div>
              <div className="h-20 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mini(idx.up)}>
                    <defs>
                      <linearGradient id={`g-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={idx.up ? "var(--green-up)" : "var(--red-down)"} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={idx.up ? "var(--green-up)" : "var(--red-down)"} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={idx.up ? "var(--green-up)" : "var(--red-down)"}
                      strokeWidth={1.8}
                      fill={`url(#g-${i})`}
                      isAnimationActive
                      animationDuration={1200}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-10"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>DSEX · {period}</h3>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Previous close: 6,222.90</span>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={longSeries}>
                <defs>
                  <linearGradient id="mainArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--green-up)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--green-up)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`} domain={["dataMin - 20", "dataMax + 20"]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "rgba(10,15,13,0.9)", color: "var(--text-primary)", fontSize: 12 }} />
                <ReferenceLine y={6222.9} stroke="var(--text-muted)" strokeDasharray="4 4" label={{ value: "Prev close", fontSize: 10, fill: "var(--text-muted)", position: "insideTopRight" }} />
                <Area type="monotone" dataKey="value" stroke="var(--green-up)" strokeWidth={2} fill="url(#mainArea)" isAnimationActive animationDuration={1400} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
