import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowUpRight } from "lucide-react";
import { sparkData } from "./data";

function CountUp({ from, to }: { from: number; to: number }) {
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => v.toFixed(2));
  const [val, setVal] = useState(from.toFixed(2));
  useEffect(() => {
    const controls = animate(mv, to, { duration: 2, ease: [0.16, 1, 0.3, 1] });
    const unsub = rounded.on("change", (v) => setVal(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, []);
  return (
    <span className="tnum">
      {Number(val).toLocaleString("en-US", { minimumFractionDigits: 2 })}
    </span>
  );
}

const indices = [
  { label: "DSEX", value: "6,241.30", change: "+0.30%", up: true },
  { label: "DS30", value: "2,118.40", change: "+0.18%", up: true },
  { label: "DSES", value: "1,340.20", change: "−0.05%", up: false },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full"
          style={{ background: "rgba(127,217,176,0.05)", filter: "blur(160px)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-32">
        {/* Top meta — minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between text-[11px] tracking-[0.22em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping"
                style={{ background: "var(--green-up)" }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ background: "var(--green-up)" }}
              />
            </span>
            <span style={{ color: "var(--green-up)" }}>Market open</span>
          </div>
          <div className="tnum">Jun 5, 2026 · 13:00 BST</div>
        </motion.div>

        {/* Massive centered headline */}
        <div className="mt-24 md:mt-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1], duration: 1 }}
            className="text-[64px] md:text-[112px] font-semibold leading-[0.95] tracking-[-0.035em]"
            style={{ color: "var(--text-primary)" }}
          >
            The market,
            <br />
            <span
              className="italic font-light"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--green-up)",
              }}
            >
              made readable.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 text-[17px] md:text-[19px] max-w-[58ch] mx-auto leading-[1.7]"
            style={{ color: "var(--text-secondary)" }}
          >
            Real-time prices, disclosures, and intelligence from the Dhaka Stock
            Exchange. Built for investors who want clarity, not clutter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex items-center justify-center gap-8 flex-wrap"
          >
            <button
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-medium transition-all"
              style={{
                background: "var(--text-primary)",
                color: "var(--navy-deep)",
              }}
            >
              Explore the market
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              className="text-[14px] cursor-pointer inline-flex items-center gap-1.5 group"
              style={{ color: "var(--text-secondary)" }}
            >
              Open a BO account
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Live ribbon — minimal, single line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, ease: [0.16, 1, 0.3, 1], duration: 0.9 }}
          className="mt-28 md:mt-36"
        >
          {/* Hero index */}
          <div className="flex items-end justify-between flex-wrap gap-y-10 gap-x-12">
            <div>
              <div
                className="text-[11px] uppercase tracking-[0.22em] mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                DSEX · Composite
              </div>
              <div className="flex items-baseline gap-5 flex-wrap">
                <span
                  className="text-[72px] md:text-[96px] font-semibold leading-none tracking-[-0.03em]"
                  style={{ color: "var(--text-primary)" }}
                >
                  <CountUp from={6200} to={6241.3} />
                </span>
                <span
                  className="text-[15px] tnum"
                  style={{ color: "var(--green-up)" }}
                >
                  ▲ +18.40 · +0.30%
                </span>
              </div>
            </div>

            <div className="h-[100px] w-full md:w-[420px] -mr-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--green-up)" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="var(--green-up)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--green-up)"
                    strokeWidth={1.5}
                    fill="url(#sparkFill)"
                    isAnimationActive
                    animationDuration={1800}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Inline index strip */}
          <div
            className="mt-12 pt-8 border-t grid grid-cols-3 gap-8"
            style={{ borderColor: "rgb(var(--ov) / 0.06)" }}
          >
            {indices.map((idx, i) => (
              <motion.div
                key={idx.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.08 }}
                className="flex flex-col gap-2"
              >
                <div
                  className="text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {idx.label}
                </div>
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-[22px] md:text-[26px] tnum tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {idx.value}
                  </span>
                  <span
                    className="text-[12px] tnum"
                    style={{
                      color: idx.up ? "var(--green-up)" : "var(--red-down)",
                    }}
                  >
                    {idx.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
