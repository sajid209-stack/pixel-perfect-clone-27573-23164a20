import { motion } from "framer-motion";
import { ArrowUpRight, Sprout, CandlestickChart } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageContext";


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
  ctaTo: string;
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
    ctaTo: "/learn",
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
    body: "Sector heatmaps, index analytics, full equities screener, and detailed company financials — all in one place.",
    cta: "Open the markets",
    ctaTo: "/companies",
    Icon: CandlestickChart,
    data: proData,
    topics: [
      { label: "Equities screener", sub: "All listed companies" },
      { label: "Sector heatmap", sub: "Updated daily" },
      { label: "Index analytics", sub: "DSEX · DS30 · DSES" },
    ],
  },
];


function PathCard({ path, i }: { path: Path; i: number }) {
  const { Icon } = path;
  const { t } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.12, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer"
    >
      <div className="dual-card relative rounded-2xl overflow-hidden h-full flex flex-col p-[18px] md:p-6"
        style={{
          background:
            "linear-gradient(160deg, rgb(var(--ov) / 0.04) 0%, rgb(var(--ov) / 0.01) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Ambient chart in background */}
        <div className="dual-bg-chart absolute inset-x-0 bottom-0 h-[55%] opacity-60 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={path.data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`pathFill-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--primary)"
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
              "radial-gradient(60% 60% at 20% 0%, rgb(var(--brand-tint) / 0.10), transparent 70%)",
          }}
        />

        <div className="relative flex items-start justify-between mb-4">
          <span
            className="text-[11px] tracking-[0.22em] uppercase tnum"
            style={{ color: "var(--text-muted)" }}
          >
            {path.index} — {t(path.eyebrow)}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgb(var(--brand-tint) / 0.08)" }}
          >
            <Icon style={{ color: "var(--primary)", width: 16, height: 16 }} />
          </div>
        </div>

        <div className="relative">
          <h3
            className="text-[20px] md:text-[24px] font-semibold leading-[1.2] tracking-tight max-w-[18ch]"
            style={{ color: "var(--text-primary)" }}
          >
            {t(path.title)}
          </h3>
        </div>

        <div className="relative mt-4 space-y-px">
          {path.topics.map((topic, idx) => (
            <div
              key={topic.label}
              className="flex items-center justify-between py-2.5 border-t group/row"
              style={{ borderColor: "rgb(var(--ov) / 0.06)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[11px] tnum w-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-[13px]" style={{ color: "var(--text-primary)" }}>
                    {t(topic.label)}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {t(topic.sub)}
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

        <Link
          to={path.ctaTo}
          className="relative mt-4 inline-flex items-center gap-2 text-[13px] font-semibold group/cta w-fit"
          style={{ color: "var(--primary)" }}
        >
          {t(path.cta)}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

      </div>
    </motion.div>
  );
}

export function DualAudience() {
  const { t } = useLang();
  return (
    <section className="home-section relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 mb-3 items-end">
          <div>
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              {t("Get started")}
            </div>
            <h2
              className="text-[26px] md:text-[32px] font-semibold tracking-tight leading-[1.1]"
              style={{ color: "var(--text-primary)" }}
            >
              {t("Two paths into the market.")}
            </h2>
          </div>
        </div>

        <div className="dual-audience-grid grid lg:grid-cols-2 gap-3 lg:gap-6">
          {paths.map((p, i) => (
            <PathCard key={p.index} path={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
