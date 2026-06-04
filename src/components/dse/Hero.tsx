import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { sparkData } from "./data";

function CountUp({ from, to }: { from: number; to: number }) {
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => v.toFixed(2));
  const [val, setVal] = useState(from.toFixed(2));
  useEffect(() => {
    const controls = animate(mv, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    const unsub = rounded.on("change", (v) => setVal(v));
    return () => { controls.stop(); unsub(); };
  }, []);
  return <span className="tnum">{Number(val).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full" style={{ background: "rgba(16,240,160,0.08)", filter: "blur(80px)" }} />
        <div className="absolute -bottom-40 -left-32 w-[380px] h-[380px] rounded-full" style={{ background: "rgba(52,255,184,0.05)", filter: "blur(80px)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-wide uppercase"
          style={{ background: "rgba(16,240,160,0.08)", color: "var(--green-up)" }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--green-up)", boxShadow: "0 0 8px var(--green-up)" }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          Market open · Live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
          className="mt-8 text-[56px] md:text-[88px] font-bold leading-[0.98] tracking-[-0.02em] max-w-[14ch]"
          style={{ color: "var(--text-primary)" }}
        >
          Bangladesh's<br />
          <span style={{ color: "var(--green-up)" }}>capital market</span>,<br />
          in real time.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-[18px] max-w-[52ch] leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Real-time prices, company disclosures, and market intelligence from the Dhaka Stock Exchange — built for investors who want clarity, not clutter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
          className="mt-20 grid lg:grid-cols-[1fr_auto] gap-10 items-end max-w-5xl"
        >
          <div>
            <div className="text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              DSEX · Composite Index
            </div>
            <div className="mt-3 flex items-baseline gap-5 flex-wrap">
              <span className="text-[64px] md:text-[80px] font-bold leading-none tracking-tight" style={{ color: "var(--text-primary)" }}>
                <CountUp from={6200} to={6241.3} />
              </span>
              <span className="text-base tnum" style={{ color: "var(--green-up)" }}>▲ 18.40 · +0.30%</span>
            </div>
            <div className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              As of 1:00 PM BST · Jun 5, 2026
            </div>
          </div>

          <div className="h-[120px] w-full lg:w-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--green-up)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--green-up)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="var(--green-up)" strokeWidth={1.8} fill="url(#sparkFill)" isAnimationActive animationDuration={1800} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
