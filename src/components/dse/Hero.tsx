import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { sparkData } from "./data";

function CountUp({ from, to }: { from: number; to: number }) {
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => v.toFixed(2));
  const [val, setVal] = useState(from.toFixed(2));
  useEffect(() => {
    const controls = animate(mv, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    const unsub = rounded.on("change", (v) => setVal(v));
    return () => { controls.stop(); unsub(); };
  }, []);
  return <span className="tnum">{Number(val).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>;
}

const periods = ["1D", "1W", "1M", "3M", "YTD", "ALL"];

const stats = [
  { label: "Total turnover", value: "৳ 842.3 Cr", sub: "▲ 12.4% vs yesterday", subColor: "#4ade80" },
  { label: "Issues traded", value: "394", sub: "of 656 listed", subColor: "var(--sky-100)" },
  { label: "Advancers / Decliners", value: null as null, sub: "64 unchanged", subColor: "var(--sky-100)" },
  { label: "Market capitalisation", value: "৳ 7.1L Cr", sub: "▲ 0.42%", subColor: "#4ade80" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        minHeight: 480,
        backgroundImage:
          "linear-gradient(135deg, #0C2340 0%, #185FA5 100%), url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600)",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-24 w-[260px] h-[260px] rounded-full bg-white/5" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/25 bg-white/10 backdrop-blur text-[12px]"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Live market data · Updated every 15 seconds
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
            className="text-[44px] md:text-[52px] font-bold leading-[1.05] tracking-tight"
          >
            Bangladesh's Capital Market
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-[18px] max-w-[480px]"
            style={{ color: "var(--sky-100)" }}
          >
            Real-time data, company disclosures, and market intelligence — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-2"
          >
            <div className="text-[13px]" style={{ color: "var(--sky-100)" }}>DSEX Composite Index</div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-[40px] font-bold leading-none">
                <CountUp from={6200} to={6241.3} />
              </span>
              <span className="text-sm text-green-400 tnum">▲ 18.40 pts · +0.30% today</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-1.5"
          >
            {periods.map((p, i) => (
              <button
                key={p}
                className="px-2.5 py-1 rounded-md text-[11px] border transition"
                style={
                  i === 0
                    ? { background: "#fff", color: "var(--navy-deep)", borderColor: "#fff", fontWeight: 600 }
                    : { borderColor: "rgba(255,255,255,0.3)", color: "#fff" }
                }
              >
                {p}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative h-[100px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth={1.5}
                  fill="url(#sparkFill)"
                  isAnimationActive
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
            <motion.span
              className="absolute right-1 top-[14px] w-2.5 h-2.5 rounded-full bg-white"
              animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,0.6)", "0 0 0 8px rgba(255,255,255,0)"] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl p-4 border"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  borderColor: "rgba(255,255,255,0.20)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="text-[11px]" style={{ color: "var(--sky-100)" }}>{s.label}</div>
                {s.value ? (
                  <div className="text-[18px] font-semibold mt-1 tnum">{s.value}</div>
                ) : (
                  <div className="text-[18px] font-semibold mt-1 tnum">
                    <span style={{ color: "#4ade80" }}>218</span>
                    <span className="opacity-60"> / </span>
                    <span style={{ color: "#fca5a5" }}>112</span>
                  </div>
                )}
                <div className="text-[11px] mt-1" style={{ color: s.subColor }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["Volume", "48.2M shares"],
              ["Trades", "1,24,381"],
              ["52W High", "6,842.1"],
            ].map(([l, v]) => (
              <div
                key={l}
                className="px-3 py-1.5 rounded-full text-[11px] border flex items-center gap-1.5"
                style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)" }}
              >
                <span style={{ color: "var(--sky-100)" }}>{l}:</span>
                <span className="tnum font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
