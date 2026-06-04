import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowRight } from "lucide-react";
import { sparkData } from "./data";

function CountUp({ from, to }: { from: number; to: number }) {
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => v.toFixed(2));
  const [val, setVal] = useState(from.toFixed(2));
  useEffect(() => {
    const controls = animate(mv, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
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

const microStats = [
  { label: "DS30", value: "2,118.40", change: "+0.18%", up: true },
  { label: "DSES", value: "1,340.20", change: "−0.05%", up: false },
  { label: "Volume", value: "312.4M", change: "+4.1%", up: true },
  { label: "Turnover", value: "৳ 1,082 Cr", change: "+2.6%", up: true },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full"
          style={{ background: "rgba(127,217,176,0.05)", filter: "blur(140px)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[520px] h-[520px] rounded-full"
          style={{ background: "rgba(127,217,176,0.025)", filter: "blur(120px)" }}
        />
        {/* faint grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-36">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase"
            style={{ background: "rgba(127,217,176,0.06)", color: "var(--green-up)" }}
          >
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
            Market open · Live tape
          </div>
          <div
            className="text-[11px] tracking-[0.22em] uppercase tnum"
            style={{ color: "var(--text-muted)" }}
          >
            Jun 5, 2026 · 13:00 BST
          </div>
        </motion.div>

        {/* Editorial grid: headline left, live index card right */}
        <div className="mt-16 grid lg:grid-cols-[1.35fr_1fr] gap-16 items-start">
          {/* LEFT — headline */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-[12px] tracking-[0.22em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              The Dhaka Stock Exchange
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1], duration: 0.9 }}
              className="mt-6 text-[52px] md:text-[84px] font-semibold leading-[0.98] tracking-[-0.025em]"
              style={{ color: "var(--text-primary)" }}
            >
              Bangladesh's
              <br />
              capital market,
              <br />
              <span
                className="italic font-light"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--green-up)",
                }}
              >
                in real time.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-10 text-[17px] max-w-[48ch] leading-[1.8]"
              style={{ color: "var(--text-secondary)" }}
            >
              Real-time prices, company disclosures, and market intelligence —
              built for investors who want clarity, not clutter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6 flex-wrap"
            >
              <button
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-medium transition-all hover:gap-3"
                style={{
                  background: "var(--green-up)",
                  color: "var(--navy-deep)",
                  boxShadow: "0 20px 50px -20px rgba(127,217,176,0.4)",
                }}
              >
                Explore the market
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                className="text-[14px] cursor-pointer inline-flex items-center gap-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Open a BO account
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Live DSEX card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, ease: [0.16, 1, 0.3, 1], duration: 0.9 }}
            className="relative lg:mt-10"
          >
            <div
              className="relative rounded-3xl overflow-hidden p-8"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-70"
                style={{
                  background:
                    "radial-gradient(70% 60% at 100% 0%, rgba(127,217,176,0.12), transparent 70%)",
                }}
              />

              <div className="relative flex items-start justify-between">
                <div>
                  <div
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    DSEX · Composite
                  </div>
                  <div className="mt-1 text-[12px]" style={{ color: "var(--text-secondary)" }}>
                    Updated 1:00 PM BST
                  </div>
                </div>
                <div
                  className="text-[11px] tnum px-2 py-1 rounded-full"
                  style={{
                    background: "rgba(127,217,176,0.10)",
                    color: "var(--green-up)",
                  }}
                >
                  ▲ +0.30%
                </div>
              </div>

              <div className="relative mt-8">
                <div
                  className="text-[64px] md:text-[72px] font-semibold leading-none tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  <CountUp from={6200} to={6241.3} />
                </div>
                <div
                  className="mt-3 text-[14px] tnum"
                  style={{ color: "var(--green-up)" }}
                >
                  ▲ +18.40 today
                </div>
              </div>

              {/* Spark */}
              <div className="relative h-[110px] mt-8 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparkData}>
                    <defs>
                      <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--green-up)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--green-up)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="var(--green-up)"
                      strokeWidth={1.8}
                      fill="url(#sparkFill)"
                      isAnimationActive
                      animationDuration={1600}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Mini stat strip */}
              <div
                className="relative mt-2 grid grid-cols-2 gap-x-6 gap-y-5 pt-6 border-t"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {microStats.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between">
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {s.label}
                      </div>
                      <div
                        className="text-[15px] tnum mt-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {s.value}
                      </div>
                    </div>
                    <div
                      className="text-[11px] tnum"
                      style={{
                        color: s.up ? "var(--green-up)" : "var(--red-down)",
                      }}
                    >
                      {s.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
