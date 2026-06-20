import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

type IndexKey = "DSEX" | "DS30" | "DSES" | "CDSET";

const INDEX_DETAILS: Record<
  IndexKey,
  {
    key: IndexKey;
    name: string;
    sub: string;
    value: number;
    prev: number;
    change: number;
    description: string;
    inception: string;
    constituents: number;
    sample: { code: string; name: string; ltp: number; chg: number; weight: number }[];
  }
> = {
  DSEX: {
    key: "DSEX",
    name: "DSEX",
    sub: "Broad market",
    value: 6241.3,
    prev: 6222.9,
    change: 0.3,
    description:
      "The DSE Broad Index — a free-float adjusted, market-capitalisation-weighted benchmark covering all eligible listed equities on the main board.",
    inception: "Jan 2013",
    constituents: 286,
    sample: [
      { code: "GRAMEENS", name: "Grameenphone Ltd", ltp: 286.4, chg: 0.62, weight: 6.81 },
      { code: "BATBC", name: "BAT Bangladesh", ltp: 432.1, chg: -0.34, weight: 5.42 },
      { code: "SQURPHARMA", name: "Square Pharmaceuticals", ltp: 211.7, chg: 0.91, weight: 4.18 },
    ],
  },
  DS30: {
    key: "DS30",
    name: "DS30",
    sub: "Blue chips",
    value: 2118.4,
    prev: 2114.6,
    change: 0.18,
    description:
      "The blue-chip benchmark — 30 large, liquid stocks selected for size, free-float and trading activity, rebalanced semi-annually.",
    inception: "Jan 2013",
    constituents: 30,
    sample: [
      { code: "GRAMEENS", name: "Grameenphone Ltd", ltp: 286.4, chg: 0.62, weight: 9.12 },
      { code: "WALTONHIL", name: "Walton Hi-Tech Industries", ltp: 1041.8, chg: 1.24, weight: 7.36 },
      { code: "BRACBANK", name: "BRAC Bank PLC", ltp: 48.3, chg: -0.21, weight: 5.91 },
    ],
  },
  DSES: {
    key: "DSES",
    name: "DSES",
    sub: "Shariah",
    value: 1340.2,
    prev: 1340.87,
    change: -0.05,
    description:
      "The DSE Shariah Index — companies screened on Shariah principles by the Islami Bank Capital Management board, reviewed quarterly.",
    inception: "Jan 2014",
    constituents: 78,
    sample: [
      { code: "SQURPHARMA", name: "Square Pharmaceuticals", ltp: 211.7, chg: 0.91, weight: 7.84 },
      { code: "ISLAMIBANK", name: "Islami Bank Bangladesh", ltp: 35.2, chg: -0.28, weight: 5.46 },
      { code: "MARICO", name: "Marico Bangladesh", ltp: 2410.5, chg: 0.16, weight: 4.92 },
    ],
  },
  CDSET: {
    key: "CDSET",
    name: "CDSET",
    sub: "Large-cap select",
    value: 1285.6,
    prev: 1282.78,
    change: 0.22,
    description:
      "CNI-DSE Select Index — ~40 large-cap constituents selected by market cap, profitability and liquidity; developed with DSE's strategic partner.",
    inception: "Jan 2020",
    constituents: 40,
    sample: [
      { code: "GRAMEENS", name: "Grameenphone Ltd", ltp: 286.4, chg: 0.62, weight: 8.74 },
      { code: "BATBC", name: "BAT Bangladesh", ltp: 432.1, chg: -0.34, weight: 7.12 },
      { code: "RENATA", name: "Renata PLC", ltp: 1186.3, chg: 0.45, weight: 5.83 },
    ],
  },
};

const periods = ["1D", "1W", "1M", "3M", "YTD", "1Y", "All"] as const;
type Period = (typeof periods)[number];

function buildSeries(idx: (typeof INDEX_DETAILS)[IndexKey], period: Period) {
  const counts: Record<Period, number> = {
    "1D": 14,
    "1W": 5,
    "1M": 22,
    "3M": 13,
    YTD: 24,
    "1Y": 52,
    All: 60,
  };
  const n = counts[period];
  const end = idx.value;
  const start = period === "1D" ? idx.prev : end * (0.86 + (idx.key.charCodeAt(0) % 5) * 0.01);
  const amp = end * 0.008;
  return Array.from({ length: n }, (_, i) => {
    const r = i / (n - 1);
    const base = start + (end - start) * r;
    const wiggle = Math.sin((i + idx.key.length) / 2.1) * amp + Math.cos(i / 1.6) * amp * 0.5;
    let label = String(i + 1);
    if (period === "1D")
      label = `${9 + Math.floor((i * 4) / 14)}:${(((i * 4 * 60) / 14) % 60).toFixed(0).padStart(2, "0").slice(0, 2)}`;
    if (period === "1W") label = ["Mon", "Tue", "Wed", "Thu", "Fri"][i] ?? "";
    if (period === "1M") label = `D${i + 1}`;
    if (period === "3M")
      label =
        ["Mar W1", "Mar W2", "Mar W3", "Mar W4", "Apr W1", "Apr W2", "Apr W3", "Apr W4", "May W1", "May W2", "May W3", "May W4", "Jun"][i] ?? "";
    if (period === "YTD") label = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(i / 4)] ?? "";
    if (period === "1Y") label = `W${i + 1}`;
    if (period === "All") label = `'${(13 + Math.floor(i / 5)).toString().padStart(2, "0")}`;
    return { t: label, v: Math.round((base + wiggle) * 100) / 100 };
  });
}

export const Route = createFileRoute("/indices/$code")({
  beforeLoad: ({ params }) => {
    const key = params.code.toUpperCase();
    if (!(key in INDEX_DETAILS)) throw notFound();
  },
  head: ({ params }) => {
    const key = params.code.toUpperCase() as IndexKey;
    const idx = INDEX_DETAILS[key];
    const title = `${idx.name} — ${idx.sub} | Dhaka Stock Exchange`;
    return {
      meta: [
        { title },
        { name: "description", content: idx.description },
        { property: "og:title", content: title },
        { property: "og:description", content: idx.description },
      ],
    };
  },
  notFoundComponent: () => (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />
      <div className="max-w-[1440px] mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold">Index not found</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          The index you're looking for doesn't exist. Try DSEX, DS30, DSES or CDSET.
        </p>
        <Link to="/indices" className="inline-block mt-6 text-sm underline">
          Back to Indices
        </Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-10 text-center text-sm">
      Something went wrong: {error.message}
      <button onClick={reset} className="ml-2 underline">
        Retry
      </button>
    </div>
  ),
  component: IndexDetailPage,
});

function IndexDetailPage() {
  const { code } = Route.useParams();
  const idx = INDEX_DETAILS[code.toUpperCase() as IndexKey];
  const up = idx.change >= 0;
  const [period, setPeriod] = useState<Period>("1M");
  const series = useMemo(() => buildSeries(idx, period), [idx, period]);
  const high = Math.max(...series.map((d) => d.v));
  const low = Math.min(...series.map((d) => d.v));

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      {/* Breadcrumb / Hero */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 pt-8 pb-7">
          <nav className="flex items-center gap-1.5 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/indices" className="hover:underline">
              Indices
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: "var(--text-secondary)" }}>{idx.name}</span>
          </nav>

          <div className="mt-5 flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] mb-2" style={{ color: "var(--text-muted)" }}>
                {idx.sub}
              </div>
              <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
                {idx.name}
              </h1>
              <div className="mt-4 flex items-baseline gap-4">
                <div className="text-[42px] font-semibold tnum tracking-tight leading-none">
                  {idx.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div
                  className="text-[14px] tnum"
                  style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}
                >
                  {up ? "▲" : "▼"} {(idx.value - idx.prev).toFixed(2)} · {up ? "+" : ""}
                  {idx.change.toFixed(2)}%
                </div>
              </div>
              <p className="mt-4 max-w-[640px] text-[14px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                {idx.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--text-muted)" }}>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--primary)" }}
              />
              Live · as provided by DSE
            </div>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="max-w-[1440px] mx-auto px-6 pt-10">
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              <StatCol label="Prev close" value={idx.prev.toLocaleString()} />
              <StatCol
                label="High"
                value={high.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                accent="var(--primary)"
              />
              <StatCol
                label="Low"
                value={low.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                accent="var(--red-down)"
              />
              <StatCol label="Constituents" value={idx.constituents.toString()} />
            </div>

            <div className="flex gap-1 p-1 rounded-full" style={{ background: "rgb(var(--ov) / 0.03)" }}>
              {periods.map((p) => {
                const isActive = p === period;
                return (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className="relative px-3.5 py-1.5 text-[12px] tnum rounded-full transition-colors"
                    style={{
                      color: isActive ? "var(--primary-foreground)" : "var(--text-secondary)",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="idxDetailPeriod"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--primary)" }}
                        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
                      />
                    )}
                    <span className="relative">{p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={period}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="h-[420px] -mx-2"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={series} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="idxDetailArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={up ? "var(--green-up)" : "var(--red-down)"} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={up ? "var(--green-up)" : "var(--red-down)"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                    axisLine={false}
                    tickLine={false}
                    domain={["dataMin - 5", "dataMax + 5"]}
                    orientation="right"
                    width={56}
                  />
                  <Tooltip
                    cursor={{ stroke: "rgb(var(--ov) / 0.12)", strokeDasharray: "3 3" }}
                    contentStyle={{
                      borderRadius: 10,
                      border: "none",
                      background: "rgba(15,20,18,0.92)",
                      backdropFilter: "blur(12px)",
                      color: "#fff",
                      fontSize: 12,
                    }}
                  />
                  <ReferenceLine
                    y={idx.prev}
                    stroke="var(--text-muted)"
                    strokeDasharray="3 6"
                    strokeOpacity={0.6}
                    label={{
                      value: `Prev ${idx.prev.toLocaleString()}`,
                      fontSize: 10,
                      fill: "var(--text-muted)",
                      position: "insideTopRight",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={up ? "var(--green-up)" : "var(--red-down)"}
                    strokeWidth={1.8}
                    fill="url(#idxDetailArea)"
                    isAnimationActive
                    animationDuration={700}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Constituents */}
      <section className="max-w-[1440px] mx-auto px-6 pt-10">
        <div
          className="rounded-2xl p-7"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="flex items-end justify-between mb-5 flex-wrap gap-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--text-muted)" }}>
                Constituents
              </div>
              <h2 className="text-[20px] font-semibold tracking-tight">
                Top names in {idx.name}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--text-muted)" }}>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--primary)" }}
              />
              Live · as provided by DSE — showing 3 of {idx.constituents}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr
                  className="text-left text-[10.5px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <th className="py-2 pr-4 font-normal">Code</th>
                  <th className="py-2 pr-4 font-normal">Name</th>
                  <th className="py-2 pr-4 font-normal text-right">LTP</th>
                  <th className="py-2 pr-4 font-normal text-right">Change</th>
                  <th className="py-2 pl-4 font-normal text-right">Weight</th>
                </tr>
              </thead>
              <tbody>
                {idx.sample.map((c) => {
                  const cUp = c.chg >= 0;
                  return (
                    <tr key={c.code} className="border-t" style={{ borderColor: "rgb(var(--ov) / 0.05)" }}>
                      <td className="py-3 pr-4 font-medium tnum">
                        <Link
                          to="/company/$ticker"
                          params={{ ticker: c.code }}
                          className="inline-flex items-center gap-1 hover:underline"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {c.code}
                          <ArrowUpRight className="w-3 h-3 opacity-60" />
                        </Link>
                      </td>
                      <td className="py-3 pr-4" style={{ color: "var(--text-secondary)" }}>
                        {c.name}
                      </td>
                      <td className="py-3 pr-4 text-right tnum">{c.ltp.toFixed(2)}</td>
                      <td
                        className="py-3 pr-4 text-right tnum"
                        style={{ color: cUp ? "var(--green-up)" : "var(--red-down)" }}
                      >
                        {cUp ? "+" : ""}
                        {c.chg.toFixed(2)}%
                      </td>
                      <td className="py-3 pl-4 text-right tnum">{c.weight.toFixed(2)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Index Methodology — full width, below chart and constituents */}
      <section className="max-w-[1440px] mx-auto px-6 pt-10">
        <div
          className="rounded-2xl p-7"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--text-muted)" }}>
            Methodology
          </div>
          <h2 className="text-[20px] font-semibold tracking-tight mb-4">Index Methodology</h2>
          <p className="text-[13px] mb-4" style={{ color: "var(--text-secondary)" }}>
            Index Calculation Algorithm (according to IOSCO Index Methodology):
          </p>
          <div className="space-y-2.5 text-[13px] font-mono leading-relaxed">
            <div
              className="p-3 rounded-lg"
              style={{ background: "rgb(var(--ov) / 0.04)", color: "var(--text-primary)" }}
            >
              Current Index = ( Yesterday's Closing Index × Current M.Cap ) / Opening M.Cap
            </div>
            <div
              className="p-3 rounded-lg"
              style={{ background: "rgb(var(--ov) / 0.04)", color: "var(--text-primary)" }}
            >
              Closing Index = ( Yesterday's Closing Index × Closing M.Cap ) / Opening M.Cap
            </div>
            <div
              className="p-3 rounded-lg"
              style={{ background: "rgb(var(--ov) / 0.04)", color: "var(--text-primary)" }}
            >
              Current M.Cap = ∑ ( LTP × Total no. of indexed shares )
            </div>
            <div
              className="p-3 rounded-lg"
              style={{ background: "rgb(var(--ov) / 0.04)", color: "var(--text-primary)" }}
            >
              Closing M.Cap = ∑ ( CP × Total no. of indexed shares )
            </div>
          </div>
          <p
            className="mt-5 text-[12px] leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Abbreviations: M.Cap = Market Capitalization; LTP = Last Traded Price; CP = Closing Price; IOSCO = International Organization of Securities Commissions.
          </p>
        </div>
      </section>

      <div className="h-24" />
      <Footer />
    </div>
  );
}

function StatCol({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div>
      <div
        className="text-[10px] uppercase tracking-[0.22em] mb-2"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
      <div
        className="text-[18px] font-medium tnum tracking-tight"
        style={{ color: accent ?? "var(--text-primary)" }}
      >
        {value}
      </div>
    </div>
  );
}
