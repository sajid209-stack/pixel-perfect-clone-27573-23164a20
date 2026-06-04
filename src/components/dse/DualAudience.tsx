import { motion } from "framer-motion";
import { ArrowUpRight, Sprout, CandlestickChart } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const beginnerData = [
  { v: 100 }, { v: 102 }, { v: 101 }, { v: 105 }, { v: 108 },
  { v: 112 }, { v: 115 }, { v: 120 }, { v: 124 }, { v: 130 },
];

const proData = [
  { v: 100 }, { v: 108 }, { v: 96 }, { v: 118 }, { v: 110 },
  { v: 128 }, { v: 120 }, { v: 140 }, { v: 132 }, { v: 152 },
];

type Path = {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  Icon: typeof Sprout;
  data: { v: number }[];
  topics: { label: string; sub: string }[];
};

const paths: Path[] = [
  {
    index: "01",
    eyebrow: "For first-time investors",
    title: "Begin with the basics.",
    body: "Understand how the stock market works, open a BO account, and place your first thoughtful trade.",
    cta: "Start the guide",
    Icon: Sprout,
    data: beginnerData,
    topics: [
      { label: "What is a stock?", sub: "5 min read" },
      { label: "Open a BO account", sub: "Step-by-step" },
      { label: "Investor glossary", sub: "A–Z terms" },
    ],
  },
  {
    index: "02",
    eyebrow: "For active traders",
    title: "Go deeper into the data.",
    body: "Live order books, sector heatmaps, circuit-breaker lists, and detailed company financials — all in one place.",
    cta: "Open the terminal",
    Icon: CandlestickChart,
    data: proData,
    topics: [
      { label: "Live market data", sub: "Realtime feed" },
      { label: "Sector heatmap", sub: "Updated daily" },
      { label: "Circuit breakers", sub: "Watchlist" },
    ],
  },
];

function PathCard({ path, i }: { path: Path; i: number }) {
  const { Icon } = path;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.12, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden p-10 lg:p-12 h-full flex flex-col"
        style={{
          background:
            "linear-gradient(160deg, rgb(var(--ov) / 0.04) 0%, rgb(var(--ov) / 0.01) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Ambient chart in background */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] opacity-60 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={path.data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`pathFill-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--green-up)" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="var(--green-up)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--green-up)"
                strokeOpacity={0.35}
                strokeWidth={1.2}
                fill={`url(#pathFill-${i})`}
                isAnimationActive
                animationDuration={1600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hover glow */}
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 0%, rgba(127,217,176,0.10), transparent 70%)",
          }}
        />

        <div className="relative flex items-start justify-between mb-10">
          <span
            className="text-[13px] tracking-[0.22em] uppercase tnum"
            style={{ color: "var(--text-muted)" }}
          >
            {path.index} — {path.eyebrow}
          </span>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(127,217,176,0.08)" }}
          >
            <Icon className="w-4.5 h-4.5" style={{ color: "var(--green-up)", width: 18, height: 18 }} />
          </div>
        </div>

        <div className="relative">
          <h3
            className="text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight max-w-[14ch]"
            style={{ color: "var(--text-primary)" }}
          >
            {path.title}
          </h3>
          <p
            className="mt-6 text-[16px] leading-[1.75] max-w-[42ch]"
            style={{ color: "var(--text-secondary)" }}
          >
            {path.body}
          </p>
        </div>

        <div className="relative mt-12 space-y-px">
          {path.topics.map((t, idx) => (
            <div
              key={t.label}
              className="flex items-center justify-between py-4 border-t group/row"
              style={{ borderColor: "rgb(var(--ov) / 0.06)" }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-[11px] tnum w-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-[15px]" style={{ color: "var(--text-primary)" }}>
                    {t.label}
                  </div>
                  <div className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {t.sub}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
          ))}
        </div>

        <div className="relative mt-10 inline-flex items-center gap-2 text-sm font-semibold group/cta w-fit"
          style={{ color: "var(--green-up)" }}
        >
          {path.cta}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

export function DualAudience() {
  return (
    <section className="py-40 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 mb-20 items-end">
          <div>
            <div
              className="text-[12px] uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Get started
            </div>
            <h2
              className="text-[40px] md:text-[52px] font-semibold tracking-tight leading-[1.05]"
              style={{ color: "var(--text-primary)" }}
            >
              Two paths into the market.
            </h2>
          </div>
          <p
            className="text-[17px] leading-[1.8] max-w-[52ch] lg:justify-self-end"
            style={{ color: "var(--text-secondary)" }}
          >
            Whether you're placing your first order or running a full portfolio,
            the DSE gives you the data, tools, and guardrails to move with confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {paths.map((p, i) => (
            <PathCard key={p.index} path={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
