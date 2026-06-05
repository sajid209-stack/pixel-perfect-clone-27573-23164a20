import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  ArrowUpRight,
  Landmark,
  Building2,
  ShieldCheck,
  TrendingUp,
  Calendar,
  Percent,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/bonds")({
  head: () => ({
    meta: [
      { title: "Bonds & Debt — Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Government treasury bonds, sukuk and listed corporate debt on the Dhaka Stock Exchange. Track yields, coupons and maturities.",
      },
      { property: "og:title", content: "DSE Bonds & Debt" },
      {
        property: "og:description",
        content: "Government, sukuk and corporate debt instruments.",
      },
    ],
  }),
  component: BondsPage,
});

type BondType = "Treasury" | "Sukuk" | "Corporate" | "Subordinated";
type Rating = "AAA" | "AA+" | "AA" | "AA-" | "A+" | "A" | "BBB";

type Bond = {
  id: string;
  code: string;
  name: string;
  issuer: string;
  type: BondType;
  coupon: number; // %
  ytm: number; // %
  maturity: string; // YYYY-MM
  faceValue: number;
  price: number; // dirty/clean per 100
  rating: Rating;
  size: number; // crore BDT
  paymentFreq: "Semi-annual" | "Annual" | "Quarterly";
};

const bonds: Bond[] = [
  {
    id: "b1",
    code: "BGTB-15Y-2039",
    name: "15-Year Treasury Bond 2039",
    issuer: "Bangladesh Bank",
    type: "Treasury",
    coupon: 9.45,
    ytm: 10.12,
    maturity: "2039-08",
    faceValue: 100000,
    price: 96.4,
    rating: "AAA",
    size: 5200,
    paymentFreq: "Semi-annual",
  },
  {
    id: "b2",
    code: "BGTB-10Y-2034",
    name: "10-Year Treasury Bond 2034",
    issuer: "Bangladesh Bank",
    type: "Treasury",
    coupon: 9.10,
    ytm: 9.62,
    maturity: "2034-05",
    faceValue: 100000,
    price: 97.8,
    rating: "AAA",
    size: 4100,
    paymentFreq: "Semi-annual",
  },
  {
    id: "b3",
    code: "BGTB-05Y-2029",
    name: "5-Year Treasury Bond 2029",
    issuer: "Bangladesh Bank",
    type: "Treasury",
    coupon: 8.75,
    ytm: 8.94,
    maturity: "2029-11",
    faceValue: 100000,
    price: 99.2,
    rating: "AAA",
    size: 3600,
    paymentFreq: "Semi-annual",
  },
  {
    id: "b4",
    code: "BGTB-02Y-2027",
    name: "2-Year Treasury Bond 2027",
    issuer: "Bangladesh Bank",
    type: "Treasury",
    coupon: 8.20,
    ytm: 8.31,
    maturity: "2027-04",
    faceValue: 100000,
    price: 99.7,
    rating: "AAA",
    size: 2100,
    paymentFreq: "Semi-annual",
  },
  {
    id: "b5",
    code: "BGIIB-SUKUK-5",
    name: "Bangladesh Govt Sukuk 5Y",
    issuer: "Bangladesh Bank",
    type: "Sukuk",
    coupon: 8.65,
    ytm: 8.72,
    maturity: "2030-02",
    faceValue: 100000,
    price: 99.5,
    rating: "AAA",
    size: 3000,
    paymentFreq: "Semi-annual",
  },
  {
    id: "b6",
    code: "BEXBOND-7",
    name: "Beximco 7-Year Bond",
    issuer: "Beximco Ltd",
    type: "Corporate",
    coupon: 11.20,
    ytm: 11.85,
    maturity: "2032-09",
    faceValue: 5000,
    price: 96.8,
    rating: "AA-",
    size: 750,
    paymentFreq: "Semi-annual",
  },
  {
    id: "b7",
    code: "SQRBOND-5",
    name: "Square Pharma 5Y Bond",
    issuer: "Square Pharmaceuticals",
    type: "Corporate",
    coupon: 10.10,
    ytm: 10.32,
    maturity: "2030-03",
    faceValue: 5000,
    price: 99.0,
    rating: "AAA",
    size: 500,
    paymentFreq: "Semi-annual",
  },
  {
    id: "b8",
    code: "BRACSUB-2",
    name: "BRAC Bank Subordinated Bond II",
    issuer: "BRAC Bank",
    type: "Subordinated",
    coupon: 10.50,
    ytm: 10.91,
    maturity: "2031-06",
    faceValue: 10000,
    price: 97.5,
    rating: "AA",
    size: 600,
    paymentFreq: "Semi-annual",
  },
  {
    id: "b9",
    code: "CITYSUB-3",
    name: "City Bank Subordinated Bond III",
    issuer: "City Bank",
    type: "Subordinated",
    coupon: 10.75,
    ytm: 11.20,
    maturity: "2032-12",
    faceValue: 10000,
    price: 97.1,
    rating: "AA-",
    size: 700,
    paymentFreq: "Semi-annual",
  },
  {
    id: "b10",
    code: "ACIBOND-6",
    name: "ACI Limited 6Y Bond",
    issuer: "ACI Limited",
    type: "Corporate",
    coupon: 11.50,
    ytm: 12.04,
    maturity: "2031-07",
    faceValue: 5000,
    price: 96.5,
    rating: "A+",
    size: 400,
    paymentFreq: "Semi-annual",
  },
];

// Yield curve points (tenor in years → yield %)
const yieldCurve = [
  { tenor: "3M", years: 0.25, yield: 7.65 },
  { tenor: "6M", years: 0.5, yield: 7.92 },
  { tenor: "1Y", years: 1, yield: 8.15 },
  { tenor: "2Y", years: 2, yield: 8.31 },
  { tenor: "3Y", years: 3, yield: 8.60 },
  { tenor: "5Y", years: 5, yield: 8.94 },
  { tenor: "7Y", years: 7, yield: 9.28 },
  { tenor: "10Y", years: 10, yield: 9.62 },
  { tenor: "15Y", years: 15, yield: 10.12 },
  { tenor: "20Y", years: 20, yield: 10.45 },
];

const typeMeta: Record<BondType, { bg: string; fg: string; icon: typeof Landmark }> = {
  Treasury: {
    bg: "rgba(16,240,160,0.10)",
    fg: "var(--green-up)",
    icon: Landmark,
  },
  Sukuk: {
    bg: "rgba(167,139,250,0.14)",
    fg: "#A78BFA",
    icon: ShieldCheck,
  },
  Corporate: {
    bg: "rgba(116,170,255,0.10)",
    fg: "#74AAFF",
    icon: Building2,
  },
  Subordinated: {
    bg: "rgba(201,168,76,0.12)",
    fg: "#C9A84C",
    icon: Building2,
  },
};

const types = ["All", "Treasury", "Sukuk", "Corporate", "Subordinated"] as const;
const sortKeys = ["YTM", "Coupon", "Maturity", "Size"] as const;

function yearsTo(maturity: string) {
  const [y, m] = maturity.split("-").map(Number);
  const target = new Date(y, (m ?? 1) - 1, 1).getTime();
  return (target - Date.now()) / (1000 * 60 * 60 * 24 * 365.25);
}

function BondsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [sort, setSort] = useState<(typeof sortKeys)[number]>("YTM");
  const [selected, setSelected] = useState<Bond>(bonds[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = bonds.filter((b) => {
      if (type !== "All" && b.type !== type) return false;
      if (
        q &&
        !(
          b.name.toLowerCase().includes(q) ||
          b.code.toLowerCase().includes(q) ||
          b.issuer.toLowerCase().includes(q)
        )
      )
        return false;
      return true;
    });
    const sortMap: Record<(typeof sortKeys)[number], (b: Bond) => number> = {
      YTM: (b) => b.ytm,
      Coupon: (b) => b.coupon,
      Maturity: (b) => -yearsTo(b.maturity),
      Size: (b) => b.size,
    };
    return [...list].sort((a, b) => sortMap[sort](b) - sortMap[sort](a));
  }, [query, type, sort]);

  const stats = useMemo(() => {
    const total = bonds.length;
    const govt = bonds.filter((b) => b.type === "Treasury" || b.type === "Sukuk").length;
    const aum = bonds.reduce((a, b) => a + b.size, 0);
    const avgYtm = bonds.reduce((a, b) => a + b.ytm, 0) / total;
    return { total, govt, aum, avgYtm: avgYtm.toFixed(2) };
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
              background: "rgba(167,139,250,0.10)",
              border: "1px solid rgba(167,139,250,0.30)",
              color: "#A78BFA",
            }}
          >
            <Landmark className="w-3 h-3" />
            Fixed income
          </div>
          <h1
            className="text-[44px] md:text-[56px] leading-[1.04] tracking-[-0.02em] font-semibold max-w-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            Predictable income, government-grade safety.
          </h1>
          <p
            className="mt-4 text-[16px] max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Bangladesh Government Treasury Bonds, sukuk and listed corporate debt — all tradable on
            DSE with transparent yields and coupon schedules.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
          {[
            { label: "Listed instruments", value: stats.total, icon: Landmark },
            { label: "Government issues", value: stats.govt, icon: ShieldCheck },
            {
              label: "Outstanding size",
              value: `৳${(stats.aum / 1000).toFixed(1)}k cr`,
              icon: TrendingUp,
            },
            { label: "Avg. YTM", value: `${stats.avgYtm}%`, icon: Percent },
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

      {/* Yield curve */}
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
                Sovereign yield curve
              </div>
              <h2
                className="text-[22px] font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Bangladesh Government Treasury Bonds
              </h2>
            </div>
            <div className="flex gap-2 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--green-up)" }}
                />
                Indicative mid-yield
              </div>
              <div>· Updated today</div>
            </div>
          </div>
          <div className="h-64 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={yieldCurve}
                margin={{ top: 10, right: 16, bottom: 0, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke="rgb(var(--ov) / 0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="tenor"
                  stroke="rgb(var(--ov) / 0.3)"
                  tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgb(var(--ov) / 0.3)"
                  tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  domain={["dataMin - 0.5", "dataMax + 0.5"]}
                  tickFormatter={(v) => `${v}%`}
                  width={42}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgb(var(--surface-rgb) / 0.95)",
                    border: "1px solid rgb(var(--ov) / 0.10)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "var(--text-muted)" }}
                  itemStyle={{ color: "var(--text-primary)" }}
                  formatter={(v: number) => [`${v.toFixed(2)}%`, "Yield"]}
                />
                <Line
                  type="monotone"
                  dataKey="yield"
                  stroke="var(--green-up)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "var(--green-up)" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
              placeholder="Search bond, issuer or code…"
              className="flex-1 bg-transparent outline-none text-[13.5px] placeholder:opacity-60"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          <div className="flex gap-1 flex-wrap">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className="relative px-3 h-8 rounded-full text-[12px] font-medium transition"
                style={{ color: type === t ? "#07090A" : "var(--text-secondary)" }}
              >
                {type === t && (
                  <motion.span
                    layoutId="bondTypePill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--green-up)" }}
                  />
                )}
                <span className="relative">{t}</span>
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

      {/* Table + detail */}
      <section className="max-w-[1440px] mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-5">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgb(var(--surface-rgb) / 0.55)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <div
              className="grid grid-cols-[2fr_80px_80px_70px_80px_70px] gap-3 px-5 py-3 text-[10.5px] uppercase tracking-[0.18em]"
              style={{
                color: "var(--text-muted)",
                borderBottom: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              <div>Instrument</div>
              <div className="text-right">Coupon</div>
              <div className="text-right">YTM</div>
              <div className="text-right">Price</div>
              <div className="text-right">Maturity</div>
              <div className="text-right">Rating</div>
            </div>

            <div className="max-h-[640px] overflow-auto">
              <AnimatePresence mode="popLayout">
                {filtered.map((b, i) => {
                  const isSel = selected.id === b.id;
                  const meta = typeMeta[b.type];
                  const yrs = yearsTo(b.maturity);
                  return (
                    <motion.button
                      key={b.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() => setSelected(b)}
                      className="w-full text-left grid grid-cols-[2fr_80px_80px_70px_80px_70px] gap-3 px-5 py-3 items-center transition"
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
                            {b.code}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-[0.16em]"
                            style={{ background: meta.bg, color: meta.fg }}
                          >
                            {b.type}
                          </span>
                        </div>
                        <div
                          className="text-[13.5px] font-semibold truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {b.name}
                        </div>
                        <div
                          className="text-[11px] truncate"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {b.issuer}
                        </div>
                      </div>
                      <div
                        className="text-right text-[13px] tnum"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {b.coupon.toFixed(2)}%
                      </div>
                      <div
                        className="text-right text-[13px] tnum font-semibold"
                        style={{ color: "var(--green-up)" }}
                      >
                        {b.ytm.toFixed(2)}%
                      </div>
                      <div
                        className="text-right text-[12.5px] tnum"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {b.price.toFixed(2)}
                      </div>
                      <div
                        className="text-right text-[12px] tnum"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {yrs.toFixed(1)}y
                      </div>
                      <div className="text-right">
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-semibold tnum"
                          style={{
                            background: "rgb(var(--ov) / 0.05)",
                            color: "var(--text-primary)",
                            border: "1px solid rgb(var(--ov) / 0.08)",
                          }}
                        >
                          {b.rating}
                        </span>
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
                  No instruments match the filters.
                </div>
              )}
            </div>
          </div>

          {/* Detail */}
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
                  style={{ color: typeMeta[selected.type].fg }}
                >
                  {selected.code} · {selected.type}
                </div>
                <h3
                  className="text-[20px] font-semibold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selected.name}
                </h3>
                <div className="text-[12px] mt-1" style={{ color: "var(--text-muted)" }}>
                  Issued by {selected.issuer}
                </div>
              </div>

              <div
                className="grid grid-cols-2 gap-3 pt-4"
                style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}
              >
                {[
                  { l: "Coupon", v: `${selected.coupon.toFixed(2)}%` },
                  {
                    l: "Yield to maturity",
                    v: `${selected.ytm.toFixed(2)}%`,
                    c: "var(--green-up)",
                  },
                  { l: "Clean price", v: selected.price.toFixed(2) },
                  {
                    l: "Face value",
                    v: `৳${selected.faceValue.toLocaleString()}`,
                  },
                  { l: "Maturity", v: selected.maturity },
                  {
                    l: "Tenor left",
                    v: `${yearsTo(selected.maturity).toFixed(1)} yrs`,
                  },
                  { l: "Issue size", v: `৳${selected.size} cr` },
                  { l: "Coupon freq.", v: selected.paymentFreq },
                  { l: "Credit rating", v: selected.rating },
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

              <div
                className="p-3 rounded-xl flex items-center gap-2"
                style={{
                  background: "rgba(16,240,160,0.06)",
                  border: "1px solid rgba(16,240,160,0.20)",
                }}
              >
                <Calendar className="w-3.5 h-3.5" style={{ color: "var(--green-up)" }} />
                <div
                  className="text-[11.5px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Next coupon in approx{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {Math.round((6 - (new Date().getMonth() % 6)) * 30)} days
                  </strong>
                </div>
              </div>

              <a
                className="inline-flex items-center justify-center gap-1.5 h-11 rounded-full text-[13.5px] font-semibold cursor-pointer hover:scale-[1.02] transition"
                style={{
                  background: "var(--green-up)",
                  color: "#07090A",
                  boxShadow: "0 6px 20px -6px rgba(16,240,160,0.55)",
                }}
              >
                Buy this bond
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.aside>
          </AnimatePresence>
        </div>
      </section>

      {/* Education strip */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              t: "What is YTM?",
              d: "Yield to maturity is the total return you'd earn holding a bond until it matures, factoring price, coupons and time.",
            },
            {
              t: "Coupon vs yield",
              d: "Coupon is fixed at issue. Yield moves with the market price — bonds bought below par yield more than their coupon.",
            },
            {
              t: "Credit ratings",
              d: "AAA is the safest. Lower-rated issuers pay higher coupons to compensate for credit risk.",
            },
          ].map((b, i) => (
            <motion.div
              key={b.t}
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
                className="text-[15px] font-semibold mb-1.5"
                style={{ color: "var(--text-primary)" }}
              >
                {b.t}
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {b.d}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
