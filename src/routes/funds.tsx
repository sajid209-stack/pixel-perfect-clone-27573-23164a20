import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Wallet,
  PieChart,
  Layers,
  Shield,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/funds")({
  head: () => ({
    meta: [
      { title: "Mutual Funds — Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Browse open-end and closed-end mutual funds listed on the Dhaka Stock Exchange. Compare NAV, returns and asset allocation.",
      },
      { property: "og:title", content: "DSE Mutual Funds" },
      {
        property: "og:description",
        content: "Listed mutual funds with NAV, returns and allocation.",
      },
    ],
  }),
  component: FundsPage,
});

type Cat = "Equity" | "Balanced" | "Income" | "Shariah" | "Index";
type Structure = "Open-end" | "Closed-end";

type Fund = {
  id: string;
  code: string;
  name: string;
  amc: string;
  category: Cat;
  structure: Structure;
  nav: number;
  marketPrice?: number;
  ytd: number;
  oneY: number;
  threeY: number;
  aum: number; // crore BDT
  expense: number;
  risk: "Low" | "Moderate" | "High";
  trend: number[];
};

const make = (start: number, n = 24, vol = 0.6, drift = 0.15) =>
  Array.from({ length: n }, (_, i) => ({
    i,
    v: +(start + i * drift + Math.sin(i / 2.3) * vol).toFixed(2),
  }));

const funds: Fund[] = [
  {
    id: "f1",
    code: "ICB-AMCL-1",
    name: "ICB AMCL First Mutual Fund",
    amc: "ICB Asset Management",
    category: "Equity",
    structure: "Closed-end",
    nav: 14.82,
    marketPrice: 12.5,
    ytd: 8.4,
    oneY: 14.2,
    threeY: 32.1,
    aum: 820,
    expense: 1.85,
    risk: "High",
    trend: make(10).map((d) => d.v),
  },
  {
    id: "f2",
    code: "LBSL-GROWTH",
    name: "LankaBangla Growth Fund",
    amc: "LankaBangla Asset Mgmt",
    category: "Equity",
    structure: "Open-end",
    nav: 11.42,
    ytd: 6.1,
    oneY: 11.8,
    threeY: 27.5,
    aum: 410,
    expense: 1.95,
    risk: "High",
    trend: make(10, 24, 0.4, 0.08).map((d) => d.v),
  },
  {
    id: "f3",
    code: "AIMS-1ST",
    name: "AIMS First Guaranteed Fund",
    amc: "AIMS of Bangladesh",
    category: "Balanced",
    structure: "Closed-end",
    nav: 17.32,
    marketPrice: 16.1,
    ytd: 4.8,
    oneY: 9.3,
    threeY: 22.6,
    aum: 540,
    expense: 1.55,
    risk: "Moderate",
    trend: make(12, 24, 0.3, 0.06).map((d) => d.v),
  },
  {
    id: "f4",
    code: "EBLNRB-MF",
    name: "EBL NRB Mutual Fund",
    amc: "Race Asset Management",
    category: "Equity",
    structure: "Closed-end",
    nav: 9.41,
    marketPrice: 6.8,
    ytd: -3.2,
    oneY: -1.8,
    threeY: 9.4,
    aum: 290,
    expense: 2.05,
    risk: "High",
    trend: make(10, 24, 0.5, -0.04).map((d) => d.v),
  },
  {
    id: "f5",
    code: "IFIL-ISLAMIC",
    name: "IFIL Islamic Equity Fund",
    amc: "ICB Islamic Asset Mgmt",
    category: "Shariah",
    structure: "Open-end",
    nav: 12.06,
    ytd: 7.2,
    oneY: 12.4,
    threeY: 24.8,
    aum: 360,
    expense: 1.70,
    risk: "Moderate",
    trend: make(10, 24, 0.4, 0.09).map((d) => d.v),
  },
  {
    id: "f6",
    code: "VIPB-ACCEL",
    name: "VIPB Accelerated Income",
    amc: "VIPB Asset Management",
    category: "Income",
    structure: "Open-end",
    nav: 10.55,
    ytd: 5.4,
    oneY: 7.9,
    threeY: 18.2,
    aum: 220,
    expense: 1.20,
    risk: "Low",
    trend: make(10, 24, 0.2, 0.05).map((d) => d.v),
  },
  {
    id: "f7",
    code: "ICBSONALI-1",
    name: "ICB Sonali Bank First Fund",
    amc: "ICB Asset Management",
    category: "Balanced",
    structure: "Closed-end",
    nav: 13.24,
    marketPrice: 11.0,
    ytd: 5.7,
    oneY: 10.6,
    threeY: 21.4,
    aum: 480,
    expense: 1.60,
    risk: "Moderate",
    trend: make(11, 24, 0.35, 0.07).map((d) => d.v),
  },
  {
    id: "f8",
    code: "DSEX-INDEX",
    name: "DSEX Index Tracker Fund",
    amc: "BRAC EPL Investments",
    category: "Index",
    structure: "Open-end",
    nav: 16.10,
    ytd: 6.8,
    oneY: 13.4,
    threeY: 29.7,
    aum: 950,
    expense: 0.75,
    risk: "Moderate",
    trend: make(13, 24, 0.45, 0.10).map((d) => d.v),
  },
  {
    id: "f9",
    code: "PRIME-1ST",
    name: "Prime Bank 1st ICB Fund",
    amc: "ICB Asset Management",
    category: "Equity",
    structure: "Closed-end",
    nav: 11.85,
    marketPrice: 9.4,
    ytd: 3.9,
    oneY: 8.1,
    threeY: 19.8,
    aum: 310,
    expense: 1.80,
    risk: "High",
    trend: make(10, 24, 0.5, 0.05).map((d) => d.v),
  },
];

const cats = ["All", "Equity", "Balanced", "Income", "Shariah", "Index"] as const;
const structures = ["All", "Open-end", "Closed-end"] as const;
const sortKeys = ["1Y return", "AUM", "NAV", "Expense"] as const;

const catTint: Record<Cat, string> = {
  Equity: "rgba(16,240,160,0.12)",
  Balanced: "rgba(116,170,255,0.12)",
  Income: "rgba(201,168,76,0.12)",
  Shariah: "rgba(167,139,250,0.14)",
  Index: "rgba(94,234,212,0.14)",
};
const catFg: Record<Cat, string> = {
  Equity: "var(--green-up)",
  Balanced: "#74AAFF",
  Income: "#C9A84C",
  Shariah: "#A78BFA",
  Index: "#5EEAD4",
};

function FundsPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [structure, setStructure] = useState<(typeof structures)[number]>("All");
  const [sort, setSort] = useState<(typeof sortKeys)[number]>("1Y return");
  const [selected, setSelected] = useState<Fund>(funds[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = funds.filter((f) => {
      if (cat !== "All" && f.category !== cat) return false;
      if (structure !== "All" && f.structure !== structure) return false;
      if (q && !(f.name.toLowerCase().includes(q) || f.code.toLowerCase().includes(q))) return false;
      return true;
    });
    const sortMap: Record<(typeof sortKeys)[number], (f: Fund) => number> = {
      "1Y return": (f) => f.oneY,
      AUM: (f) => f.aum,
      NAV: (f) => f.nav,
      Expense: (f) => -f.expense,
    };
    return [...list].sort((a, b) => sortMap[sort](b) - sortMap[sort](a));
  }, [query, cat, structure, sort]);

  const stats = useMemo(() => {
    const totalAum = funds.reduce((a, f) => a + f.aum, 0);
    const avgYtd = funds.reduce((a, f) => a + f.ytd, 0) / funds.length;
    const winners = funds.filter((f) => f.oneY > 0).length;
    return {
      totalAum,
      avgYtd: avgYtd.toFixed(1),
      winners,
      total: funds.length,
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
            <PieChart className="w-3 h-3" />
            Mutual funds
          </div>
          <h1
            className="text-[44px] md:text-[56px] leading-[1.04] tracking-[-0.02em] font-semibold max-w-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            Diversify with one ticket.
          </h1>
          <p
            className="mt-4 text-[16px] max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Listed open-end and closed-end funds let you tap professional asset managers across equity,
            balanced, income and Shariah strategies — without picking individual stocks.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
          {[
            { label: "Listed funds", value: stats.total, icon: Layers },
            { label: "Combined AUM", value: `৳${(stats.totalAum / 100).toFixed(1)}k cr`, icon: Wallet },
            { label: "Avg. YTD", value: `${stats.avgYtd}%`, icon: TrendingUp },
            { label: "Positive 1Y", value: `${stats.winners}/${stats.total}`, icon: Shield },
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
              <s.icon className="w-4 h-4 mb-3" style={{ color: "var(--text-muted)" }} />
              <div
                className="text-[28px] font-semibold tnum tracking-tight"
                style={{ color: "var(--text-primary)" }}
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

      {/* Filters */}
      <section className="max-w-[1440px] mx-auto px-6 pb-6">
        <div
          className="sticky top-[88px] z-30 p-3 rounded-2xl flex flex-col lg:flex-row gap-3 lg:items-center"
          style={{
            background: "rgb(var(--surface-rgb) / 0.7)",
            backdropFilter: "blur(18px) saturate(180%)",
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
              placeholder="Search fund name or code…"
              className="flex-1 bg-transparent outline-none text-[13.5px] placeholder:opacity-60"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          <div className="flex gap-1 flex-wrap">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="relative px-3 h-8 rounded-full text-[12px] font-medium transition"
                style={{ color: cat === c ? "#07090A" : "var(--text-secondary)" }}
              >
                {cat === c && (
                  <motion.span
                    layoutId="fundCatPill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--green-up)" }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-1 flex-wrap">
            {structures.map((s) => (
              <button
                key={s}
                onClick={() => setStructure(s)}
                className="px-3 h-8 rounded-full text-[12px] font-medium transition"
                style={{
                  color: structure === s ? "var(--text-primary)" : "var(--text-muted)",
                  background:
                    structure === s ? "rgb(var(--ov) / 0.08)" : "transparent",
                  border:
                    structure === s
                      ? "1px solid rgb(var(--ov) / 0.10)"
                      : "1px solid transparent",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof sortKeys)[number])}
            className="h-8 px-3 rounded-full text-[12px] font-medium outline-none cursor-pointer"
            style={{
              background: "rgb(var(--ov) / 0.06)",
              color: "var(--text-primary)",
              border: "1px solid rgb(var(--ov) / 0.08)",
            }}
          >
            {sortKeys.map((k) => (
              <option key={k} value={k} style={{ background: "var(--bg)" }}>
                Sort: {k}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Two-column: list + detail */}
      <section className="max-w-[1440px] mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] gap-5">
          {/* Table */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgb(var(--surface-rgb) / 0.55)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <div
              className="grid grid-cols-[2fr_80px_80px_80px_80px_60px] gap-3 px-5 py-3 text-[10.5px] uppercase tracking-[0.18em]"
              style={{
                color: "var(--text-muted)",
                borderBottom: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              <div>Fund</div>
              <div className="text-right">NAV</div>
              <div className="text-right">YTD</div>
              <div className="text-right">1Y</div>
              <div className="text-right">AUM</div>
              <div className="text-right">Trend</div>
            </div>

            <div className="max-h-[640px] overflow-auto">
              <AnimatePresence mode="popLayout">
                {filtered.map((f, i) => {
                  const isSel = selected.id === f.id;
                  const ytdUp = f.ytd >= 0;
                  const oneYUp = f.oneY >= 0;
                  return (
                    <motion.button
                      key={f.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() => setSelected(f)}
                      className="w-full text-left grid grid-cols-[2fr_80px_80px_80px_80px_60px] gap-3 px-5 py-3 items-center transition"
                      style={{
                        borderBottom: "1px solid rgb(var(--ov) / 0.04)",
                        background: isSel ? "rgb(var(--ov) / 0.05)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSel)
                          e.currentTarget.style.background = "rgb(var(--ov) / 0.03)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSel) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-[10px] uppercase tracking-[0.18em] tnum"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {f.code}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-[0.16em]"
                            style={{
                              background: catTint[f.category],
                              color: catFg[f.category],
                            }}
                          >
                            {f.category}
                          </span>
                        </div>
                        <div
                          className="text-[13.5px] font-semibold truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {f.name}
                        </div>
                      </div>
                      <div
                        className="text-right text-[13px] tnum"
                        style={{ color: "var(--text-primary)" }}
                      >
                        ৳{f.nav.toFixed(2)}
                      </div>
                      <div
                        className="text-right text-[13px] tnum font-medium"
                        style={{ color: ytdUp ? "var(--green-up)" : "var(--red-down)" }}
                      >
                        {ytdUp ? "+" : ""}
                        {f.ytd.toFixed(1)}%
                      </div>
                      <div
                        className="text-right text-[13px] tnum font-medium"
                        style={{ color: oneYUp ? "var(--green-up)" : "var(--red-down)" }}
                      >
                        {oneYUp ? "+" : ""}
                        {f.oneY.toFixed(1)}%
                      </div>
                      <div
                        className="text-right text-[12.5px] tnum"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {f.aum}cr
                      </div>
                      <div className="h-7">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={f.trend.map((v, i) => ({ i, v }))}>
                            <YAxis hide domain={["dataMin", "dataMax"]} />
                            <Line
                              type="monotone"
                              dataKey="v"
                              stroke={oneYUp ? "var(--green-up)" : "var(--red-down)"}
                              strokeWidth={1.5}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
              {filtered.length === 0 && (
                <div
                  className="p-12 text-center text-[13px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  No funds match the current filters.
                </div>
              )}
            </div>
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.aside
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-6 flex flex-col gap-5 self-start sticky top-[160px]"
              style={{
                background: "rgb(var(--surface-rgb) / 0.65)",
                border: "1px solid rgb(var(--ov) / 0.08)",
              }}
            >
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.22em] mb-1.5"
                  style={{ color: catFg[selected.category] }}
                >
                  {selected.code} · {selected.structure}
                </div>
                <h3
                  className="text-[20px] font-semibold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selected.name}
                </h3>
                <div
                  className="text-[12px] mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Managed by {selected.amc}
                </div>
              </div>

              <div className="h-32 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selected.trend.map((v, i) => ({ i, v }))}>
                    <YAxis hide domain={["dataMin", "dataMax"]} />
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={selected.oneY >= 0 ? "var(--green-up)" : "var(--red-down)"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div
                className="grid grid-cols-2 gap-3 pt-4"
                style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}
              >
                {[
                  { l: "NAV", v: `৳${selected.nav.toFixed(2)}` },
                  selected.marketPrice
                    ? { l: "Market", v: `৳${selected.marketPrice.toFixed(2)}` }
                    : { l: "Structure", v: selected.structure },
                  {
                    l: "YTD",
                    v: `${selected.ytd >= 0 ? "+" : ""}${selected.ytd.toFixed(1)}%`,
                    c: selected.ytd >= 0 ? "var(--green-up)" : "var(--red-down)",
                  },
                  {
                    l: "1 year",
                    v: `${selected.oneY >= 0 ? "+" : ""}${selected.oneY.toFixed(1)}%`,
                    c: selected.oneY >= 0 ? "var(--green-up)" : "var(--red-down)",
                  },
                  {
                    l: "3 year",
                    v: `${selected.threeY >= 0 ? "+" : ""}${selected.threeY.toFixed(1)}%`,
                    c: selected.threeY >= 0 ? "var(--green-up)" : "var(--red-down)",
                  },
                  { l: "AUM", v: `৳${selected.aum} cr` },
                  { l: "Expense ratio", v: `${selected.expense.toFixed(2)}%` },
                  { l: "Risk", v: selected.risk },
                ].map((row, idx) => (
                  <div key={idx}>
                    <div
                      className="text-[10px] uppercase tracking-[0.18em] mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {row.l}
                    </div>
                    <div
                      className="text-[14px] font-semibold tnum"
                      style={{
                        color:
                          (row as { c?: string }).c ?? "var(--text-primary)",
                      }}
                    >
                      {row.v}
                    </div>
                  </div>
                ))}
              </div>

              {selected.marketPrice && (
                <div
                  className="p-3 rounded-xl flex items-center gap-2"
                  style={{
                    background:
                      selected.marketPrice < selected.nav
                        ? "rgba(16,240,160,0.06)"
                        : "rgba(255,107,107,0.06)",
                    border: `1px solid ${
                      selected.marketPrice < selected.nav
                        ? "rgba(16,240,160,0.20)"
                        : "rgba(255,107,107,0.20)"
                    }`,
                  }}
                >
                  {selected.marketPrice < selected.nav ? (
                    <TrendingDown
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--green-up)" }}
                    />
                  ) : (
                    <TrendingUp
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--red-down)" }}
                    />
                  )}
                  <div className="text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
                    Trading at a{" "}
                    <strong
                      style={{
                        color:
                          selected.marketPrice < selected.nav
                            ? "var(--green-up)"
                            : "var(--red-down)",
                      }}
                    >
                      {Math.abs(
                        ((selected.marketPrice - selected.nav) / selected.nav) * 100,
                      ).toFixed(1)}
                      %
                    </strong>{" "}
                    {selected.marketPrice < selected.nav ? "discount" : "premium"} to NAV
                  </div>
                </div>
              )}

              <a
                className="inline-flex items-center justify-center gap-1.5 h-11 rounded-full text-[13.5px] font-semibold cursor-pointer hover:scale-[1.02] transition"
                style={{
                  background: "var(--green-up)",
                  color: "#07090A",
                  boxShadow: "0 6px 20px -6px rgba(16,240,160,0.55)",
                }}
              >
                Invest in this fund
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.aside>
          </AnimatePresence>
        </div>
      </section>

      {/* Why funds */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Why mutual funds
            </div>
            <h2
              className="text-[28px] font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Three reasons investors choose funds.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: PieChart,
              title: "Instant diversification",
              desc: "A single unit gives you exposure to dozens of stocks or bonds, lowering single-name risk.",
            },
            {
              icon: Shield,
              title: "Professional management",
              desc: "Licensed asset managers run the portfolio, rebalance, and publish quarterly reports.",
            },
            {
              icon: Sparkles,
              title: "Low entry ticket",
              desc: "Start with as little as ৳5,000 in open-end funds — no need to pick winners yourself.",
            },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl"
              style={{
                background: "rgb(var(--surface-rgb) / 0.55)",
                border: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "rgba(16,240,160,0.10)",
                  color: "var(--green-up)",
                }}
              >
                <b.icon className="w-5 h-5" />
              </div>
              <div
                className="text-[16px] font-semibold mb-1.5"
                style={{ color: "var(--text-primary)" }}
              >
                {b.title}
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
