import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight } from "lucide-react";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { sectors } from "@/components/dse/data";
import { companies } from "@/data/companies";

export const Route = createFileRoute("/indices")({
  head: () => ({
    meta: [
      { title: "Indices — DSEX, DS30, DSES | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Live levels, intraday charts, constituents and sector contribution for the DSEX broad market, DS30 blue-chip, and DSES Shariah indices.",
      },
      { property: "og:title", content: "Indices — DSEX, DS30, DSES | Dhaka Stock Exchange" },
      {
        property: "og:description",
        content: "Live charts and constituents for the DSE benchmark indices.",
      },
    ],
  }),
  component: IndicesPage,
});

type IndexKey = "DSEX" | "DS30" | "DSES";

const indices: {
  key: IndexKey;
  name: string;
  sub: string;
  value: number;
  prev: number;
  change: number;
  description: string;
  inception: string;
  constituents: number;
}[] = [
  {
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
  },
  {
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
  },
  {
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
  },
];

const periods = ["1D", "1W", "1M", "3M", "YTD", "1Y", "All"] as const;
type Period = (typeof periods)[number];

/* Build deterministic per-index, per-period series scaled to the index's level */
function buildIndexSeries(key: IndexKey, period: Period) {
  const idx = indices.find((i) => i.key === key)!;
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
  const start = period === "1D" ? idx.prev : end * (0.86 + (key.charCodeAt(0) % 5) * 0.01);
  const amp = end * 0.008;
  return Array.from({ length: n }, (_, i) => {
    const r = i / (n - 1);
    const base = start + (end - start) * r;
    const wiggle = Math.sin((i + key.length) / 2.1) * amp + Math.cos(i / 1.6) * amp * 0.5;
    let label = String(i + 1);
    if (period === "1D") label = `${9 + Math.floor((i * 4) / 14)}:${((i * 4 * 60) / 14 % 60).toFixed(0).padStart(2, "0").slice(0, 2)}`;
    if (period === "1W") label = ["Mon", "Tue", "Wed", "Thu", "Fri"][i] ?? "";
    if (period === "1M") label = `D${i + 1}`;
    if (period === "3M") label = ["Mar W1", "Mar W2", "Mar W3", "Mar W4", "Apr W1", "Apr W2", "Apr W3", "Apr W4", "May W1", "May W2", "May W3", "May W4", "Jun"][i] ?? "";
    if (period === "YTD") label = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(i / 4)] ?? "";
    if (period === "1Y") label = `W${i + 1}`;
    if (period === "All") label = `'${(13 + Math.floor(i / 5)).toString().padStart(2, "0")}`;
    return { t: label, v: Math.round((base + wiggle) * 100) / 100 };
  });
}

function IndexCard({
  idx,
  active,
  onClick,
  i,
}: {
  idx: (typeof indices)[number];
  active: boolean;
  onClick: () => void;
  i: number;
}) {
  const up = idx.change >= 0;
  const data = useMemo(
    () =>
      Array.from({ length: 24 }, (_, k) => ({
        i: k,
        v: idx.prev + (idx.value - idx.prev) * (k / 23) + Math.sin((k + i) / 2) * idx.value * 0.0015,
      })),
    [idx, i],
  );
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
      whileHover={{ y: -2 }}
      className="group relative text-left p-6 rounded-2xl overflow-hidden transition-colors"
      style={{
        background: active
          ? "linear-gradient(160deg, rgb(var(--brand-tint) / 0.07) 0%, rgb(var(--ov) / 0.01) 100%)"
          : "linear-gradient(160deg, rgb(var(--ov) / 0.025) 0%, rgb(var(--ov) / 0.005) 100%)",
      }}
    >
      {active && (
        <motion.div
          layoutId="idxCardActive"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgb(var(--brand-tint) / 0.22), 0 30px 60px -40px rgb(var(--brand-tint) / 0.4)",
          }}
        />
      )}
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
            {idx.sub}
          </div>
          <div className="mt-1.5 text-[16px] font-medium" style={{ color: "var(--text-primary)" }}>
            {idx.name}
          </div>
        </div>
        <div
          className="text-[11.5px] tnum px-2 py-0.5 rounded-full"
          style={{
            background: up ? "rgb(var(--brand-tint) / 0.10)" : "rgba(232,136,154,0.10)",
            color: up ? "var(--green-up)" : "var(--red-down)",
          }}
        >
          {up ? "▲" : "▼"} {Math.abs(idx.change).toFixed(2)}%
        </div>
      </div>
      <div className="relative mt-5 text-[30px] font-semibold tnum tracking-tight leading-none">
        {idx.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
      <div className="relative mt-1.5 text-[11.5px] tnum" style={{ color: "var(--text-muted)" }}>
        {idx.constituents} constituents · since {idx.inception}
      </div>
      <div className="relative h-14 mt-5 -mx-1 opacity-90">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`page-mini-${idx.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={up ? "var(--green-up)" : "var(--red-down)"} stopOpacity={0.35} />
                <stop offset="100%" stopColor={up ? "var(--green-up)" : "var(--red-down)"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={up ? "var(--green-up)" : "var(--red-down)"}
              strokeWidth={1.4}
              fill={`url(#page-mini-${idx.key})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.button>
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

function IndicesPage() {
  const [activeKey, setActiveKey] = useState<IndexKey>("DSEX");
  const [period, setPeriod] = useState<Period>("1M");
  const active = indices.find((i) => i.key === activeKey)!;
  const up = active.change >= 0;

  const series = useMemo(() => buildIndexSeries(activeKey, period), [activeKey, period]);
  const high = Math.max(...series.map((d) => d.v));
  const low = Math.min(...series.map((d) => d.v));

  /* Contributors — top up & down movers, scaled to index points */
  const contributors = useMemo(() => {
    const sorted = [...companies].sort((a, b) => b.changePct - a.changePct);
    const top = sorted.slice(0, 5).map((c) => ({
      code: c.code,
      name: c.name,
      changePct: c.changePct,
      contribution: Math.round(c.changePct * (c.marketCap / 1e12) * 100) / 100,
    }));
    const bot = sorted.slice(-5).reverse().map((c) => ({
      code: c.code,
      name: c.name,
      changePct: c.changePct,
      contribution: Math.round(c.changePct * (c.marketCap / 1e12) * 100) / 100,
    }));
    return { top, bot };
  }, []);

  /* Breadth */
  const breadth = useMemo(() => {
    const adv = companies.filter((c) => c.changePct > 0).length;
    const dec = companies.filter((c) => c.changePct < 0).length;
    const unch = companies.length - adv - dec;
    return { adv, dec, unch };
  }, []);

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      {/* Hero */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 pt-10 pb-8">
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            Markets · Indices
          </div>
          <div className="text-[11px] mb-4" style={{ color: "var(--text-secondary)" }}>
            Sample data for demonstration — live data will connect to the DSE API
          </div>
          <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
            DSE benchmarks
          </h1>
          <p className="mt-3 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            Three indices, one tape. Track the broad market, blue chips and Shariah-screened
            universe — with charts, constituents and the names moving the levels right now.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-[1440px] mx-auto px-6 pt-8">
        <div className="grid md:grid-cols-3 gap-5">
          {indices.map((idx, i) => (
            <IndexCard
              key={idx.key}
              idx={idx}
              i={i}
              active={activeKey === idx.key}
              onClick={() => setActiveKey(idx.key)}
            />
          ))}
        </div>
      </section>

      {/* Main chart panel */}
      <section className="max-w-[1440px] mx-auto px-6 pt-12">
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] mb-2" style={{ color: "var(--text-muted)" }}>
                {active.name} — {active.sub}
              </div>
              <div className="flex items-baseline gap-4">
                <div className="text-[42px] font-semibold tnum tracking-tight leading-none">
                  {active.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[14px] tnum" style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}>
                  {up ? "▲" : "▼"} {(active.value - active.prev).toFixed(2)} · {up ? "+" : ""}
                  {active.change.toFixed(2)}%
                </div>
              </div>
              <p className="mt-4 max-w-[560px] text-[13.5px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                {active.description}
              </p>
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
                        layoutId="idxPeriodActive"
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

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10 pb-8 border-b"
            style={{ borderColor: "rgb(var(--ov) / 0.05)" }}
          >
            <StatCol label="Prev close" value={active.prev.toLocaleString()} />
            <StatCol label="High" value={high.toLocaleString(undefined, { maximumFractionDigits: 2 })} accent="var(--green-up)" />
            <StatCol label="Low" value={low.toLocaleString(undefined, { maximumFractionDigits: 2 })} accent="var(--red-down)" />
            <StatCol label="Constituents" value={active.constituents.toString()} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey + period}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="h-[380px] -mx-2"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={series} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="idxMainArea" x1="0" y1="0" x2="0" y2="1">
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
                    y={active.prev}
                    stroke="var(--text-muted)"
                    strokeDasharray="3 6"
                    strokeOpacity={0.6}
                    label={{
                      value: `Prev ${active.prev.toLocaleString()}`,
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
                    fill="url(#idxMainArea)"
                    isAnimationActive
                    animationDuration={700}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Contributors + Breadth */}
      <section className="max-w-[1440px] mx-auto px-6 pt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6">
        {/* Contributors */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--text-muted)" }}>
                Today's contributors
              </div>
              <h2 className="text-[22px] font-semibold tracking-tight">Names moving the level</h2>
            </div>
            <Link to="/companies" className="text-[12px] flex items-center gap-1" style={{ color: "var(--primary)" }}>
              All companies <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ContribList title="Positive" rows={contributors.top} tone="up" />
            <ContribList title="Negative" rows={contributors.bot} tone="down" />
          </div>
        </div>

        {/* Breadth */}
        <div
          className="rounded-2xl p-7 flex flex-col"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--text-muted)" }}>
            Market breadth
          </div>
          <h2 className="text-[22px] font-semibold tracking-tight mb-6">Advance / Decline</h2>

          <div className="flex items-end gap-4 mb-6">
            <div>
              <div className="text-[28px] font-semibold tnum tracking-tight" style={{ color: "var(--green-up)" }}>
                {breadth.adv}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                Advancing
              </div>
            </div>
            <div>
              <div className="text-[28px] font-semibold tnum tracking-tight" style={{ color: "var(--red-down)" }}>
                {breadth.dec}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                Declining
              </div>
            </div>
            <div>
              <div className="text-[28px] font-semibold tnum tracking-tight" style={{ color: "var(--text-secondary)" }}>
                {breadth.unch}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                Unchanged
              </div>
            </div>
          </div>

          {/* Bar viz */}
          <div className="h-3 w-full rounded-full overflow-hidden flex" style={{ background: "rgb(var(--ov) / 0.06)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(breadth.adv / companies.length) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--green-up)" }}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(breadth.dec / companies.length) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--red-down)" }}
            />
          </div>

          {/* Sector contribution sparks */}
          <div className="mt-8">
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: "var(--text-muted)" }}>
              Sector contribution
            </div>
            <div className="h-32 -mx-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectors.map((s) => ({ name: s.name.split(" ")[0], v: s.change }))}>
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis hide domain={["dataMin - 0.5", "dataMax + 0.5"]} />
                  <Tooltip
                    cursor={{ fill: "rgb(var(--ov) / 0.04)" }}
                    contentStyle={{
                      borderRadius: 10,
                      border: "none",
                      background: "rgba(15,20,18,0.92)",
                      color: "#fff",
                      fontSize: 11,
                    }}
                    formatter={(v: number) => [`${v > 0 ? "+" : ""}${v}%`, "Change"]}
                  />
                  <ReferenceLine y={0} stroke="rgb(var(--ov) / 0.12)" />
                  <Bar dataKey="v" radius={[3, 3, 0, 0]}>
                    {sectors.map((s, i) => (
                      <rect
                        key={i}
                        fill={s.change >= 0 ? "var(--green-up)" : "var(--red-down)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <div className="h-20" />
      <Footer />
    </div>
  );
}

function ContribList({
  title,
  rows,
  tone,
}: {
  title: string;
  rows: { code: string; name: string; changePct: number; contribution: number }[];
  tone: "up" | "down";
}) {
  const color = tone === "up" ? "var(--green-up)" : "var(--red-down)";
  const max = Math.max(...rows.map((r) => Math.abs(r.contribution)));
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
          {title}
        </div>
      </div>
      <ul className="space-y-2.5">
        {rows.map((r) => {
          const w = max > 0 ? Math.abs(r.contribution) / max : 0;
          return (
            <li key={r.code}>
              <Link
                to="/company/$ticker"
                params={{ ticker: r.code }}
                className="group block py-1.5"
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="min-w-0">
                    <span className="text-[13px] font-semibold">{r.code}</span>
                    <span className="ml-2 text-[11.5px] truncate" style={{ color: "var(--text-muted)" }}>
                      {r.name}
                    </span>
                  </div>
                  <div className="text-[12px] tnum" style={{ color }}>
                    {r.changePct > 0 ? "+" : ""}
                    {r.changePct.toFixed(2)}%
                  </div>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgb(var(--ov) / 0.05)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${w * 100}%` }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: color, height: "100%" }}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
