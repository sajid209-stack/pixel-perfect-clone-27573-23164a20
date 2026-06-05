import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  FileBarChart2,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Layers,
  Users,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Market Statistics & Reports — Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Historical turnover, index trends, monthly reviews and downloadable market reports from the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "DSE Market Statistics" },
      {
        property: "og:description",
        content: "Historical turnover, indices and downloadable reports.",
      },
    ],
  }),
  component: ReportsPage,
});

type Range = "1M" | "3M" | "6M" | "1Y" | "5Y";

const turnoverFull = [
  { m: "Jan", v: 845 },
  { m: "Feb", v: 920 },
  { m: "Mar", v: 1180 },
  { m: "Apr", v: 1045 },
  { m: "May", v: 980 },
  { m: "Jun", v: 1320 },
  { m: "Jul", v: 1410 },
  { m: "Aug", v: 1265 },
  { m: "Sep", v: 1490 },
  { m: "Oct", v: 1380 },
  { m: "Nov", v: 1540 },
  { m: "Dec", v: 1620 },
];

const indexHistory = Array.from({ length: 60 }, (_, i) => ({
  i,
  label: `D-${60 - i}`,
  dsex: 5800 + Math.round(Math.sin(i / 4) * 90 + i * 7 + Math.cos(i / 2) * 40),
  ds30: 2100 + Math.round(Math.sin(i / 5) * 30 + i * 2.4 + Math.cos(i / 3) * 14),
  dsex_s: 1280 + Math.round(Math.sin(i / 3.5) * 18 + i * 1.5 + Math.cos(i / 2.2) * 8),
}));

const sectorPerf = [
  { name: "Banks", change: 4.2 },
  { name: "Pharma", change: 6.8 },
  { name: "Telecom", change: -2.1 },
  { name: "Cement", change: 3.4 },
  { name: "Fuel", change: -1.6 },
  { name: "Engineering", change: 5.1 },
  { name: "Textile", change: 2.3 },
  { name: "Food", change: 7.4 },
  { name: "IT", change: 9.2 },
  { name: "Insurance", change: -3.5 },
];

type Report = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: "Monthly" | "Quarterly" | "Annual" | "Daily" | "Disclosure";
  format: "PDF" | "XLSX" | "CSV";
  size: string;
  pages?: number;
  desc: string;
};

const reports: Report[] = [
  {
    id: "r1",
    title: "Monthly Market Review — December 2025",
    date: "2026-01-05",
    type: "Monthly",
    format: "PDF",
    size: "3.4 MB",
    pages: 48,
    desc: "Index movement, sector winners, IPO activity and foreign investor flows for December 2025.",
  },
  {
    id: "r2",
    title: "Q4 2025 Statistical Bulletin",
    date: "2026-01-12",
    type: "Quarterly",
    format: "PDF",
    size: "8.1 MB",
    pages: 124,
    desc: "Comprehensive quarterly statistics: turnover, market cap, P/E by sector, top traded stocks.",
  },
  {
    id: "r3",
    title: "Daily Trade Summary — 04 Jun 2026",
    date: "2026-06-04",
    type: "Daily",
    format: "CSV",
    size: "212 KB",
    desc: "Trade-level OHLC, volume, value and turnover by ticker for the latest session.",
  },
  {
    id: "r4",
    title: "DSE Annual Report 2024-25",
    date: "2025-09-30",
    type: "Annual",
    format: "PDF",
    size: "14.6 MB",
    pages: 232,
    desc: "Full fiscal year report including financials, governance, listing activity and outlook.",
  },
  {
    id: "r5",
    title: "Historical Index Data — DSEX (2013-2026)",
    date: "2026-06-01",
    type: "Quarterly",
    format: "XLSX",
    size: "5.8 MB",
    desc: "End-of-day DSEX values, returns and volume since launch — formatted for analysis.",
  },
  {
    id: "r6",
    title: "Sector Performance Dashboard — May 2026",
    date: "2026-06-02",
    type: "Monthly",
    format: "XLSX",
    size: "1.9 MB",
    desc: "Sector indices, P/E, dividend yield, top movers and laggards by GICS classification.",
  },
  {
    id: "r7",
    title: "Foreign Portfolio Investment — May 2026",
    date: "2026-06-03",
    type: "Monthly",
    format: "PDF",
    size: "1.2 MB",
    pages: 18,
    desc: "Foreign buy/sell, net flows by sector and broker concentration metrics.",
  },
  {
    id: "r8",
    title: "Listing & Delisting Bulletin — Q1 2026",
    date: "2026-04-10",
    type: "Disclosure",
    format: "PDF",
    size: "640 KB",
    pages: 12,
    desc: "All new listings, suspensions and delistings approved during Q1 2026.",
  },
];

const ranges: Range[] = ["1M", "3M", "6M", "1Y", "5Y"];
const reportTypes = ["All", "Daily", "Monthly", "Quarterly", "Annual", "Disclosure"] as const;

const formatMeta: Record<Report["format"], { icon: typeof FileText; color: string }> = {
  PDF: { icon: FileText, color: "#FF6B6B" },
  XLSX: { icon: FileSpreadsheet, color: "var(--green-up)" },
  CSV: { icon: FileBarChart2, color: "#74AAFF" },
};

function ReportsPage() {
  const [range, setRange] = useState<Range>("1Y");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof reportTypes)[number]>("All");

  const turnoverData = useMemo(() => {
    const map: Record<Range, number> = { "1M": 1, "3M": 3, "6M": 6, "1Y": 12, "5Y": 12 };
    return turnoverFull.slice(-map[range]);
  }, [range]);

  const indexData = useMemo(() => {
    const map: Record<Range, number> = { "1M": 20, "3M": 40, "6M": 50, "1Y": 60, "5Y": 60 };
    return indexHistory.slice(-map[range]);
  }, [range]);

  const filteredReports = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports
      .filter((r) => {
        if (type !== "All" && r.type !== type) return false;
        if (q && !r.title.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query, type]);

  const headline = useMemo(() => {
    const ytd = ((indexHistory.at(-1)!.dsex - indexHistory[0].dsex) / indexHistory[0].dsex) * 100;
    const avgTurnover =
      turnoverFull.reduce((a, x) => a + x.v, 0) / turnoverFull.length;
    return {
      ytd: ytd.toFixed(2),
      ytdUp: ytd >= 0,
      avgTurnover: Math.round(avgTurnover),
      reports: reports.length,
      sectors: sectorPerf.length,
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav />

      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.22em] mb-5"
            style={{
              background: "rgba(116,170,255,0.10)",
              border: "1px solid rgba(116,170,255,0.30)",
              color: "#74AAFF",
            }}
          >
            <BarChart3 className="w-3 h-3" />
            Market statistics
          </div>
          <h1
            className="text-[44px] md:text-[56px] leading-[1.04] tracking-[-0.02em] font-semibold max-w-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            The full story, in numbers.
          </h1>
          <p
            className="mt-4 text-[16px] max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Historical indices, turnover trends, sector performance and downloadable reports — built
            for analysts, traders and journalists who need the source data.
          </p>
        </motion.div>

        {/* Headline stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
          {[
            {
              label: "DSEX 60d return",
              value: `${headline.ytdUp ? "+" : ""}${headline.ytd}%`,
              icon: headline.ytdUp ? TrendingUp : TrendingDown,
              color: headline.ytdUp ? "var(--green-up)" : "var(--red-down)",
            },
            {
              label: "Avg. monthly turnover",
              value: `৳${headline.avgTurnover} cr`,
              icon: Activity,
            },
            { label: "Published reports", value: headline.reports, icon: Layers },
            { label: "Sector indices", value: headline.sectors, icon: Users },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="p-5 rounded-2xl"
              style={{
                background: "rgb(var(--surface-rgb) / 0.55)",
                border: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              <s.icon
                className="w-4 h-4 mb-3"
                style={{ color: s.color ?? "var(--text-muted)" }}
              />
              <div
                className="text-[28px] font-semibold tnum tracking-tight"
                style={{ color: s.color ?? "var(--text-primary)" }}
              >
                {s.value}
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.18em] mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Charts row */}
      <section className="max-w-[1440px] mx-auto px-6 pb-10 grid lg:grid-cols-[1.4fr_1fr] gap-4">
        {/* Index history */}
        <div
          className="p-6 rounded-2xl"
          style={{
            background: "rgb(var(--surface-rgb) / 0.55)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
            <div>
              <div
                className="text-[11px] uppercase tracking-[0.22em] mb-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Index history
              </div>
              <h2
                className="text-[20px] font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                DSEX broad-market index
              </h2>
            </div>
            <div
              className="flex p-0.5 rounded-full"
              style={{
                background: "rgb(var(--ov) / 0.04)",
                border: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className="relative px-3 h-7 rounded-full text-[11px] font-semibold tnum transition"
                  style={{
                    color: range === r ? "#07090A" : "var(--text-secondary)",
                  }}
                >
                  {range === r && (
                    <motion.span
                      layoutId="rangePill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--green-up)" }}
                    />
                  )}
                  <span className="relative">{r}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={indexData} margin={{ top: 6, right: 16, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="dsexGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--green-up)" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="var(--green-up)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke="rgb(var(--ov) / 0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  stroke="rgb(var(--ov) / 0.3)"
                  tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                  minTickGap={40}
                />
                <YAxis
                  stroke="rgb(var(--ov) / 0.3)"
                  tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  width={48}
                  domain={["dataMin - 50", "dataMax + 50"]}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgb(var(--surface-rgb) / 0.95)",
                    border: "1px solid rgb(var(--ov) / 0.10)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "var(--text-muted)" }}
                />
                <Area
                  type="monotone"
                  dataKey="dsex"
                  stroke="var(--green-up)"
                  strokeWidth={2}
                  fill="url(#dsexGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Turnover */}
        <div
          className="p-6 rounded-2xl"
          style={{
            background: "rgb(var(--surface-rgb) / 0.55)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="mb-4">
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Turnover
            </div>
            <h2
              className="text-[20px] font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Monthly value traded
            </h2>
            <div className="text-[12px] mt-1" style={{ color: "var(--text-muted)" }}>
              In crore BDT
            </div>
          </div>
          <div className="h-60 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={turnoverData} margin={{ top: 6, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke="rgb(var(--ov) / 0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="m"
                  stroke="rgb(var(--ov) / 0.3)"
                  tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgb(var(--ov) / 0.3)"
                  tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                />
                <Tooltip
                  cursor={{ fill: "rgb(var(--ov) / 0.06)" }}
                  contentStyle={{
                    background: "rgb(var(--surface-rgb) / 0.95)",
                    border: "1px solid rgb(var(--ov) / 0.10)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "var(--text-muted)" }}
                  formatter={(v: number) => [`৳${v} cr`, "Turnover"]}
                />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="var(--green-up)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Sector performance */}
      <section className="max-w-[1440px] mx-auto px-6 pb-10">
        <div
          className="p-6 rounded-2xl"
          style={{
            background: "rgb(var(--surface-rgb) / 0.55)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <div>
              <div
                className="text-[11px] uppercase tracking-[0.22em] mb-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Sector scorecard
              </div>
              <h2
                className="text-[22px] font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                30-day sector performance
              </h2>
            </div>
            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              Updated daily · Indicative %
            </div>
          </div>
          <div className="space-y-2">
            {sectorPerf
              .slice()
              .sort((a, b) => b.change - a.change)
              .map((s) => {
                const up = s.change >= 0;
                const width = Math.min(100, Math.abs(s.change) * 10);
                return (
                  <div
                    key={s.name}
                    className="grid grid-cols-[120px_1fr_70px] gap-4 items-center"
                  >
                    <div
                      className="text-[13px] font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {s.name}
                    </div>
                    <div
                      className="h-2 rounded-full relative overflow-hidden"
                      style={{ background: "rgb(var(--ov) / 0.04)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${width}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: up ? "var(--green-up)" : "var(--red-down)",
                          boxShadow: `0 0 12px ${up ? "rgba(16,240,160,0.4)" : "rgba(255,107,107,0.4)"}`,
                        }}
                      />
                    </div>
                    <div
                      className="text-right text-[13px] tnum font-semibold"
                      style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}
                    >
                      {up ? "+" : ""}
                      {s.change.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Reports library */}
      <section className="max-w-[1440px] mx-auto px-6 pb-10">
        <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
          <div>
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Reports library
            </div>
            <h2
              className="text-[28px] font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Download the source data.
            </h2>
          </div>
        </div>

        <div
          className="p-3 rounded-2xl flex flex-col lg:flex-row gap-3 lg:items-center mb-5"
          style={{
            background: "rgb(var(--surface-rgb) / 0.55)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 h-10 rounded-xl flex-1"
            style={{
              background: "rgb(var(--ov) / 0.04)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reports…"
              className="flex-1 bg-transparent outline-none text-[13.5px] placeholder:opacity-60"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          <div className="flex gap-1 flex-wrap">
            {reportTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className="relative px-3 h-8 rounded-full text-[12px] font-medium transition"
                style={{ color: type === t ? "#07090A" : "var(--text-secondary)" }}
              >
                {type === t && (
                  <motion.span
                    layoutId="reportTypePill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--green-up)" }}
                  />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredReports.map((r, i) => {
              const Fmt = formatMeta[r.format];
              return (
                <motion.article
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  className="group p-5 rounded-2xl flex flex-col gap-4 cursor-pointer transition"
                  style={{
                    background: "rgb(var(--surface-rgb) / 0.55)",
                    border: "1px solid rgb(var(--ov) / 0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(16,240,160,0.25)";
                    e.currentTarget.style.background = "rgb(var(--surface-rgb) / 0.75)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgb(var(--ov) / 0.06)";
                    e.currentTarget.style.background = "rgb(var(--surface-rgb) / 0.55)";
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${Fmt.color}1A`,
                        color: Fmt.color,
                        border: `1px solid ${Fmt.color}40`,
                      }}
                    >
                      <Fmt.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] uppercase tracking-[0.22em]"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {r.type}
                        </span>
                        <span
                          className="text-[10px] uppercase tracking-[0.22em] flex items-center gap-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Calendar className="w-2.5 h-2.5" />
                          {new Date(r.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h3
                        className="text-[14.5px] font-semibold leading-snug"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {r.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className="text-[12.5px] leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {r.desc}
                  </p>

                  <div
                    className="flex items-center justify-between pt-3 mt-auto text-[11.5px]"
                    style={{
                      borderTop: "1px solid rgb(var(--ov) / 0.06)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <div className="flex gap-3 tnum">
                      <span className="font-medium" style={{ color: Fmt.color }}>
                        {r.format}
                      </span>
                      <span>{r.size}</span>
                      {r.pages && <span>{r.pages} pp</span>}
                    </div>
                    <span
                      className="inline-flex items-center gap-1 font-semibold opacity-0 group-hover:opacity-100 transition"
                      style={{ color: "var(--green-up)" }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredReports.length === 0 && (
          <div
            className="mt-6 p-12 text-center rounded-2xl text-[13px]"
            style={{
              background: "rgb(var(--surface-rgb) / 0.45)",
              border: "1px dashed rgb(var(--ov) / 0.10)",
              color: "var(--text-muted)",
            }}
          >
            No reports match the current filters.
          </div>
        )}
      </section>

      {/* Data subscription CTA */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="p-10 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(116,170,255,0.10) 0%, rgba(16,240,160,0.06) 100%)",
            border: "1px solid rgba(116,170,255,0.20)",
          }}
        >
          <div className="max-w-xl">
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-2"
              style={{ color: "#74AAFF" }}
            >
              Market data feed
            </div>
            <h3
              className="text-[26px] md:text-[30px] font-semibold leading-tight tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Need real-time data via API?
            </h3>
            <p
              className="mt-2 text-[14px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Subscribe to the DSE market data feed for tick-level trades, order book depth and
              corporate action notifications. REST + WebSocket.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[13.5px] font-semibold cursor-pointer hover:scale-[1.02] transition"
            style={{
              background: "var(--green-up)",
              color: "#07090A",
              boxShadow: "0 6px 20px -6px rgba(16,240,160,0.55)",
            }}
          >
            View data plans
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
