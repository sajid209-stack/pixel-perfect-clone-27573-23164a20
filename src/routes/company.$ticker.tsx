import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { StarButton } from "@/components/dse/StarButton";
import { CategoryBadge } from "@/components/dse/CategoryBadge";
import { useRecentlyViewed } from "@/lib/userPrefs";
import {
  buildSeries,
  companies,
  findCompany,
  formatBDT,
  formatVolume,
  type Company,
} from "@/data/companies";

export const Route = createFileRoute("/company/$ticker")({
  head: ({ params }) => {
    const co = findCompany(params.ticker);
    const title = co
      ? `${co.code} — ${co.name} | DSE`
      : `${params.ticker} — Company profile | DSE`;
    const desc = co
      ? `Live price ৳${co.price}, ${co.changePct >= 0 ? "+" : ""}${co.changePct}% today. ${co.sector} · ${co.board}. Financials, disclosures, and shareholders.`
      : `Live price, financials, and disclosures for ${params.ticker} on the Dhaka Stock Exchange.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const co = findCompany(params.ticker);
    if (!co) throw notFound();
    return { co };
  },
  notFoundComponent: () => <CompanyNotFound />,
  errorComponent: () => <CompanyNotFound />,
  component: CompanyPage,
});

const periods = ["1D", "1W", "1M", "3M", "1Y", "All"] as const;
type Period = (typeof periods)[number];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "price", label: "Price & Charts" },
  { id: "financials", label: "Financials" },
  { id: "announcements", label: "Announcements" },
  { id: "similar", label: "Similar companies" },
] as const;
type TabId = (typeof tabs)[number]["id"];

function CompanyNotFound() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Nav />
      <main className="max-w-[1440px] mx-auto px-6 py-32 text-center">
        <div className="text-[12px] uppercase tracking-[0.22em] mb-3" style={{ color: "var(--text-muted)" }}>
          404
        </div>
        <h1 className="text-[40px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Company not found
        </h1>
        <p className="mt-3 text-[16px]" style={{ color: "var(--text-secondary)" }}>
          We couldn't find that ticker on the exchange.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-full text-sm font-semibold"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          Back to market <ArrowUpRight className="w-4 h-4" />
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function CompanyPage() {
  const { co } = Route.useLoaderData();
  const [period, setPeriod] = useState<Period>("1D");
  const [tab, setTab] = useState<TabId>("overview");
  const up = co.change >= 0;
  const series = useMemo(() => buildSeries(co, period), [co, period]);
  const { push } = useRecentlyViewed();
  useEffect(() => { push(co.code); }, [co.code, push]);

  return (
    <div className="min-h-screen">
      <TopBar />
      <Nav />

      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[12px]" style={{ color: "var(--text-muted)" }}>
          <Link to="/" className="hover:underline">DSE</Link>
          <span>/</span>
          <span>Company</span>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>{co.code}</span>
        </div>
        <div className="text-[11px] mt-2" style={{ color: "var(--text-secondary)" }}>
          Sample data for demonstration — live data will connect to the DSE API
        </div>
      </div>

      {/* Header */}
      <header className="max-w-[1440px] mx-auto px-6 pt-6 pb-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
          {/* Left */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[12px] mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to market
            </Link>
            <div className="flex items-center gap-2">
              <div
                className="text-[14px] font-bold tnum tracking-wide"
                style={{ color: "var(--primary)", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
              >
                {co.code}
              </div>
              <CategoryBadge category={co.category} />
              <StarButton code={co.code} size={16} />
            </div>
            <h1
              className="mt-1 text-[28px] md:text-[34px] font-semibold tracking-tight leading-[1.1]"
              style={{ color: "var(--text-primary)" }}
            >
              {co.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Pill>{co.sector}</Pill>
              <Pill>DSE {co.board}</Pill>
              {co.hq && <Pill>HQ · {co.hq}</Pill>}
            </div>
          </div>

          {/* Right — live price block */}
          <div className="lg:text-right">
            <div className="flex items-center gap-2 lg:justify-end mb-2 text-[11px] tnum"
              style={{ color: "var(--text-muted)" }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "var(--primary)" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                  style={{ background: "var(--primary)" }} />
              </span>
              Live · 13:42:08 BST
            </div>
            <div className="text-[40px] font-bold tnum leading-none tracking-tight"
              style={{ color: "var(--text-primary)" }}>
              ৳ {co.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-2 text-[14px] tnum"
              style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}>
              {up ? "▲" : "▼"} {Math.abs(co.change).toFixed(2)} ({up ? "+" : ""}{co.changePct.toFixed(2)}%) today
            </div>
            <div className="mt-1 text-[13px] tnum" style={{ color: "var(--text-muted)" }}>
              Prev close ৳ {co.prevClose.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </header>

      {/* Sticky sub-nav */}
      <div className="sticky top-[64px] z-30"
        style={{
          background: "rgb(var(--surface-rgb) / 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderTop: "1px solid rgb(var(--ov) / 0.05)",
          borderBottom: "1px solid rgb(var(--ov) / 0.05)",
        }}>
        <div className="max-w-[1440px] mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative px-4 py-3.5 text-[13px] font-medium whitespace-nowrap transition"
                style={{ color: active ? "var(--text-primary)" : "var(--text-secondary)" }}
              >
                {t.label}
                {active && (
                  <motion.span
                    layoutId="companyTab"
                    className="absolute left-3 right-3 bottom-0 h-[2px] rounded-full"
                    style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <main className="max-w-[1440px] mx-auto px-6 pt-10 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "overview" && (
              <OverviewTab
                co={co}
                period={period}
                setPeriod={setPeriod}
                series={series}
                up={up}
              />
            )}
            {tab === "price" && (
              <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
                <PriceCard co={co} period={period} setPeriod={setPeriod} series={series} up={up} />
                <StatsGrid co={co} />
              </div>
            )}
            {tab === "financials" && <FinancialsTab co={co} />}
            {tab === "announcements" && <AnnouncementsTab co={co} />}
            {tab === "similar" && <SimilarTab co={co} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

/* ----------------- Overview ----------------- */

function OverviewTab({
  co,
  period,
  setPeriod,
  series,
  up,
}: {
  co: Company;
  period: Period;
  setPeriod: (p: Period) => void;
  series: { t: string; v: number }[];
  up: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-[1.85fr_1fr] gap-10">
      {/* Left col */}
      <div className="space-y-10">
        <PriceCard co={co} period={period} setPeriod={setPeriod} series={series} up={up} />
        <StatsGrid co={co} />
      </div>

      {/* Right col */}
      <div className="space-y-6">
        <AboutCard co={co} />
        <ShareholdingPatternCard co={co} />
        <RecentAnnouncementsCard co={co} />
      </div>
    </div>
  );
}

function PriceCard({
  co,
  period,
  setPeriod,
  series,
  up,
}: {
  co: Company;
  period: Period;
  setPeriod: (p: Period) => void;
  series: { t: string; v: number }[];
  up: boolean;
}) {
  const stroke = "var(--primary)";
  return (
    <section
      className="rounded-2xl p-6 md:p-8"
      style={{
        background: "rgb(var(--ov) / 0.025)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-muted)" }}>
          Price history · {period}
        </div>
        <div className="flex gap-1 p-1 rounded-full"
          style={{ background: "rgb(var(--ov) / 0.04)" }}>
          {periods.map((p) => {
            const active = p === period;
            return (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="relative px-3 py-1 text-[12px] tnum rounded-full transition"
                style={{
                  color: active ? "var(--navy-deep)" : "var(--text-secondary)",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {active && (
                  <motion.span
                    layoutId="coPeriod"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--primary)" }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
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
          transition={{ duration: 0.35 }}
          className="h-[320px] -mx-2"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={series} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`coArea-${co.code}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v.toFixed(0)}
                domain={["dataMin - 2", "dataMax + 2"]}
                orientation="right"
                width={48}
              />
              <Tooltip
                cursor={{ stroke: "rgb(var(--ov) / 0.12)", strokeDasharray: "3 3" }}
                contentStyle={{
                  borderRadius: 10,
                  border: "none",
                  background: "rgba(15,20,18,0.94)",
                  color: "#fff",
                  fontSize: 12,
                  boxShadow: "0 20px 50px -20px rgba(0,0,0,0.5)",
                }}
                formatter={(value: number) => [`৳ ${Number(value).toFixed(2)}`, "Price"]}
              />
              <ReferenceLine
                y={co.prevClose}
                stroke="var(--text-muted)"
                strokeDasharray="3 6"
                strokeOpacity={0.6}
                label={{
                  value: `Prev close ৳ ${co.prevClose}`,
                  fontSize: 10,
                  fill: "var(--text-muted)",
                  position: "insideTopRight",
                }}
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke={stroke}
                strokeWidth={1.8}
                fill={`url(#coArea-${co.code})`}
                isAnimationActive
                animationDuration={800}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>

      <PriceStatsRow co={co} />
    </section>
  );
}

function PriceStatsRow({ co }: { co: Company }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [co.code]);

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-8 pt-6 border-t"
      style={{ borderColor: "rgb(var(--ov) / 0.06)" }}
    >
      {loading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-5 w-20" />
          </div>
        ))
      ) : (
        <>
          <Stat label="Open" value={`৳ ${co.open}`} />
          <Stat label="High" value={`৳ ${co.high}`} accent="var(--green-up)" />
          <Stat label="Low" value={`৳ ${co.low}`} accent="var(--red-down)" />
          <Stat label="Volume" value={formatVolume(co.volume)} />
          <Stat label="52W High" value={`৳ ${co.weekHigh52}`} />
          <Stat label="52W Low" value={`৳ ${co.weekLow52}`} />
        </>
      )}
    </div>
  );
}

function StatsGrid({ co }: { co: Company }) {
  const pct = Math.max(
    0,
    Math.min(
      100,
      ((co.price - co.weekLow52) / Math.max(0.0001, co.weekHigh52 - co.weekLow52)) * 100,
    ),
  );
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] mb-4" style={{ color: "var(--text-muted)" }}>
        Key statistics
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatTile label="Market Cap" value={formatBDT(co.marketCap)} />
        <StatTile label="P/E Ratio" value={`${co.pe.toFixed(1)}x`} />
        <StatTile label="EPS (TTM)" value={`৳ ${co.eps.toFixed(2)}`} />
        <StatTile label="NAV / Share" value={`৳ ${co.nav.toFixed(2)}`} />
        <StatTile label="Face Value" value={`৳ ${co.faceValue.toFixed(2)}`} />
        <StatTile label="Paid-up Capital" value={formatBDT(co.paidUpCapital)} />

        {/* 52-week range — spans full row */}
        <div
          className="col-span-2 md:col-span-3 p-5 rounded-xl"
          style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
        >
          <div className="flex items-baseline justify-between mb-3">
            <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              52-week range
            </div>
            <div className="text-[12px] tnum" style={{ color: "var(--text-secondary)" }}>
              Current ৳ {co.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div
            className="relative h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgb(var(--ov) / 0.08)" }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
              style={{
                left: `calc(${pct}% - 5px)`,
                background: "var(--primary)",
                boxShadow: "0 0 0 3px rgb(var(--brand-tint) / 0.25)",
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
            <span>Low ৳ {co.weekLow52.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            <span>High ৳ {co.weekHigh52.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="p-5 rounded-xl"
      style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
    >
      <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="mt-2 text-[18px] font-medium tnum tracking-tight" style={{ color: "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );
}

function AboutCard({ co }: { co: Company }) {
  return (
    <SidebarCard title="About the company">
      <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {co.description}
      </p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-[12px]">
        <Meta label="Sector" value={co.sector} />
        <Meta label="HQ" value={co.hq} />
        <Meta label="Board" value={co.board} />
        <Meta label="Category" value={co.category} />
      </dl>
      {co.website && (
        <a
          href={`https://${co.website}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: "var(--primary)" }}
        >
          {co.website}
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </SidebarCard>
  );
}

const SHAREHOLDING_ROWS: { key: keyof NonNullable<Company["sharePattern"]>; label: string; color: string }[] = [
  { key: "sponsor",     label: "Sponsor / Director", color: "var(--primary)" },
  { key: "government",  label: "Government",         color: "#5B8DB8" },
  { key: "institution", label: "Institution",        color: "#88A9C4" },
  { key: "foreign",     label: "Foreign",            color: "#C6A969" },
  { key: "public",      label: "Public",             color: "#9AA7B2" },
];

function ShareholdingPatternCard({ co }: { co: Company }) {
  if (!co.sharePattern) return null;
  const sp = co.sharePattern;
  return (
    <SidebarCard title="Shareholding pattern">
      <div className="space-y-3">
        {SHAREHOLDING_ROWS.map((r, i) => {
          const pct = sp[r.key] ?? 0;
          return (
            <div key={r.key}>
              <div className="flex items-baseline justify-between text-[13px] mb-1">
                <span style={{ color: "var(--text-secondary)" }}>{r.label}</span>
                <span className="tnum font-medium" style={{ color: "var(--text-primary)" }}>
                  {pct.toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgb(var(--ov) / 0.06)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, pct)}%` }}
                  transition={{ duration: 0.9, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                  style={{ background: r.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SidebarCard>
  );
}

function DividendHistoryCard({ co }: { co: Company }) {
  if (!co.dividendHistory?.length) return null;
  return (
    <section
      className="rounded-2xl p-6 md:p-8"
      style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
    >
      <h2 className="text-[20px] font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
        Dividend history
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr
              className="text-[11px] uppercase tracking-wider"
              style={{ color: "var(--text-muted)", borderBottom: "1px solid rgb(var(--ov) / 0.06)" }}
            >
              <th className="text-left py-2.5 pr-4 font-medium">Year</th>
              <th className="text-right py-2.5 px-4 font-medium">Cash %</th>
              <th className="text-right py-2.5 pl-4 font-medium">Stock %</th>
            </tr>
          </thead>
          <tbody>
            {co.dividendHistory.map((d) => (
              <tr key={d.year} style={{ borderBottom: "1px solid rgb(var(--ov) / 0.04)" }}>
                <td className="py-3 pr-4 tnum" style={{ color: "var(--text-primary)" }}>{d.year}</td>
                <td className="py-3 px-4 text-right tnum" style={{ color: "var(--text-secondary)" }}>
                  {d.cash > 0 ? `${d.cash}%` : "—"}
                </td>
                <td className="py-3 pl-4 text-right tnum" style={{ color: "var(--text-secondary)" }}>
                  {d.stock > 0 ? `${d.stock}%` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RecentAnnouncementsCard({ co }: { co: Company }) {
  if (!co.recentAnnouncements?.length) return null;
  return (
    <SidebarCard title="Recent announcements" cta={{ label: "All", onClick: () => {} }}>
      <ul className="space-y-3">
        {co.recentAnnouncements.slice(0, 3).map((a) => (
          <li key={a.summary}>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: "rgb(var(--brand-tint) / 0.10)", color: "var(--green-up)" }}
              >
                {a.type}
              </span>
              <span className="text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
                {a.date}
              </span>
            </div>
            <p className="text-[13px] leading-snug" style={{ color: "var(--text-secondary)" }}>
              {a.summary}
            </p>
          </li>
        ))}
      </ul>
    </SidebarCard>
  );
}

/* ----------------- Other tabs ----------------- */

function FinancialsTab({ co }: { co: Company }) {
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
      <div className="space-y-8">
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
        >
          <h2 className="text-[20px] font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
            Per-share metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatTile label="EPS (TTM)" value={`৳ ${co.eps.toFixed(2)}`} />
            <StatTile label="NAV / Share" value={`৳ ${co.nav.toFixed(2)}`} />
            <StatTile label="Face Value" value={`৳ ${co.faceValue.toFixed(2)}`} />
            <StatTile label="Dividend Yield" value={`${co.dividendYield.toFixed(2)}%`} />
            <StatTile label="P/E Ratio" value={`${co.pe.toFixed(1)}x`} />
            <StatTile label="Paid-up Capital" value={formatBDT(co.paidUpCapital)} />
          </div>
        </section>
        <DividendHistoryCard co={co} />
      </div>
      <ShareholdingPatternCard co={co} />
    </div>
  );
}


function AnnouncementsTab({ co }: { co: Company }) {
  const items = co.recentAnnouncements ?? [];
  return (
    <section
      className="rounded-2xl p-8"
      style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
    >
      <h2 className="text-[20px] font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
        All disclosures
      </h2>
      <ul className="divide-y" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        {items.map((a, i) => (
          <li key={i} className="py-5 grid grid-cols-[100px_1fr_auto] gap-4 items-baseline">
            <span className="text-[11px] tnum uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}>
              {a.date}
            </span>
            <div>
              <div className="text-[15px] mb-1" style={{ color: "var(--text-primary)" }}>{a.summary}</div>
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: "rgb(var(--brand-tint) / 0.10)", color: "var(--green-up)" }}
              >
                {a.type}
              </span>
            </div>
            <a className="text-[13px] inline-flex items-center gap-1" style={{ color: "var(--green-up)" }}>
              Read <ArrowUpRight className="w-3 h-3" />
            </a>
          </li>
        ))}
        {!items.length && (
          <li className="py-10 text-center" style={{ color: "var(--text-muted)" }}>
            No disclosures yet.
          </li>
        )}
      </ul>
    </section>
  );
}

function SimilarTab({ co }: { co: Company }) {
  const similar = companies.filter((c) => c.sector === co.sector && c.code !== co.code).slice(0, 6);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {similar.map((c) => {
        const up = c.change >= 0;
        return (
          <Link
            key={c.code}
            to="/company/$ticker"
            params={{ ticker: c.code }}
            className="p-5 rounded-xl group transition"
            style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>
                {c.code}
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition"
                style={{ color: "var(--green-up)" }} />
            </div>
            <div className="text-[12px] truncate" style={{ color: "var(--text-muted)" }}>{c.name}</div>
            <div className="mt-4 flex items-baseline justify-between tnum">
              <span className="text-[18px] font-semibold" style={{ color: "var(--text-primary)" }}>
                ৳ {c.price.toLocaleString()}
              </span>
              <span className="text-[12px]" style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}>
                {up ? "▲" : "▼"} {Math.abs(c.changePct).toFixed(2)}%
              </span>
            </div>
          </Link>
        );
      })}
      {!similar.length && <Placeholder title="No comparable companies in this sector yet" />}
    </div>
  );
}

/* ----------------- Directors / Board ----------------- */

type Director = {
  name: string;
  role: string;
  category: "Chairman" | "Executive" | "Non-Executive" | "Independent" | "Nominee";
  since: number;
  shareholding?: number;
  bio?: string;
  committees?: string[];
};

type Executive = { name: string; role: string };

function buildBoard(co: Company): {
  directors: Director[];
  executives: Executive[];
  committees: { name: string; chair: string; members: string[]; mandate: string }[];
} {
  // Deterministic per-company first names so it looks unique but stable.
  const firstPool = [
    "Md. Anisur", "Tahmina", "Rashed", "Farzana", "Kazi Imran", "Salma",
    "A.K.M. Nurul", "Shahidul", "Nasreen", "Tanvir", "Rubina", "Mahbub",
  ];
  const lastPool = ["Rahman", "Hossain", "Chowdhury", "Ahmed", "Karim", "Islam", "Haque", "Siddique"];
  const seed = co.code.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const pick = (arr: string[], i: number) => arr[(seed + i * 7) % arr.length];
  const nm = (i: number) => `${pick(firstPool, i)} ${pick(lastPool, i + 3)}`;

  const sponsorShare = co.shareholders?.find((s) => /sponsor|director|family|telenor|tobacco|brac|marico|grameen/i.test(s.name))?.pct ?? 50;

  const directors: Director[] = [
    {
      name: nm(0),
      role: "Chairman",
      category: "Chairman",
      since: 2014,
      shareholding: Math.round(sponsorShare * 0.18 * 100) / 100,
      bio: `Founding sponsor with over 30 years of leadership in ${co.sector.toLowerCase()}. Oversees corporate strategy and stakeholder relations.`,
      committees: ["Nomination & Remuneration"],
    },
    {
      name: nm(1),
      role: "Vice Chairman",
      category: "Non-Executive",
      since: 2016,
      shareholding: Math.round(sponsorShare * 0.09 * 100) / 100,
      bio: "Represents sponsor group on the board. Brings 22 years of cross-sector experience.",
    },
    {
      name: nm(2),
      role: "Managing Director & CEO",
      category: "Executive",
      since: 2019,
      shareholding: 0.42,
      bio: `Joined ${co.code} in 2008 and elevated to MD in 2019. Holds an MBA from IBA Dhaka.`,
      committees: ["Risk Management"],
    },
    {
      name: nm(3),
      role: "Director",
      category: "Non-Executive",
      since: 2017,
      shareholding: Math.round(sponsorShare * 0.06 * 100) / 100,
      bio: "Sponsor-nominated director. Chairs the group's CSR initiatives.",
    },
    {
      name: nm(4),
      role: "Nominee Director",
      category: "Nominee",
      since: 2021,
      bio: "Nominated by Investment Corporation of Bangladesh (ICB).",
    },
    {
      name: nm(5),
      role: "Independent Director",
      category: "Independent",
      since: 2022,
      bio: "Former central bank executive. Brings governance and audit expertise.",
      committees: ["Audit", "Nomination & Remuneration"],
    },
    {
      name: nm(6),
      role: "Independent Director",
      category: "Independent",
      since: 2023,
      bio: "Chartered Accountant with 25+ years in corporate finance and reporting.",
      committees: ["Audit", "Risk Management"],
    },
  ];

  const executives: Executive[] = [
    { name: nm(7), role: "Chief Financial Officer" },
    { name: nm(8), role: "Chief Operating Officer" },
    { name: nm(9), role: "Company Secretary" },
    { name: nm(10), role: "Head of Internal Audit" },
    { name: nm(11), role: "Head of Investor Relations" },
  ];

  const committees = [
    {
      name: "Audit Committee",
      chair: directors[5].name,
      members: [directors[5].name, directors[6].name, directors[3].name],
      mandate: "Reviews financial reporting, internal controls, and external auditor performance.",
    },
    {
      name: "Nomination & Remuneration Committee",
      chair: directors[0].name,
      members: [directors[0].name, directors[5].name, directors[1].name],
      mandate: "Oversees board composition, succession planning, and executive compensation.",
    },
    {
      name: "Risk Management Committee",
      chair: directors[2].name,
      members: [directors[2].name, directors[6].name, directors[4].name],
      mandate: "Identifies and monitors enterprise, operational, and financial risks.",
    },
  ];

  return { directors, executives, committees };
}

function DirectorsTab({ co }: { co: Company }) {
  const { directors, executives, committees } = useMemo(() => buildBoard(co), [co]);
  const [active, setActive] = useState<string>(directors[0].name);
  const selected = directors.find((d) => d.name === active) ?? directors[0];

  const counts = {
    total: directors.length,
    independent: directors.filter((d) => d.category === "Independent").length,
    executive: directors.filter((d) => d.category === "Executive").length,
    nominee: directors.filter((d) => d.category === "Nominee").length,
  };

  return (
    <div className="space-y-10">
      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <BoardStat label="Total directors" value={String(counts.total)} />
        <BoardStat label="Independent" value={String(counts.independent)} accent="var(--green-up)" />
        <BoardStat label="Executive" value={String(counts.executive)} />
        <BoardStat label="Sponsor nominee" value={String(counts.nominee)} />
      </div>

      {/* Org tree */}
      <section
        className="rounded-2xl p-6 md:p-8"
        style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
              Governance structure
            </div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Board of Directors
            </h2>
          </div>
          <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
            <LegendDot color="var(--green-up)" label="Independent" />
            <LegendDot color="#4FD1C5" label="Executive" />
            <LegendDot color="#7FD9B0" label="Non-Executive" />
            <LegendDot color="#C6A969" label="Nominee" />
          </div>
        </div>

        {/* Chairman */}
        <div className="flex justify-center">
          <DirectorNode d={directors[0]} active={active === directors[0].name} onClick={() => setActive(directors[0].name)} size="lg" />
        </div>

        {/* Connector */}
        <div className="mx-auto w-px h-8" style={{ background: "rgb(var(--ov) / 0.18)" }} />

        {/* Tier 2 — Vice chair + MD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[directors[1], directors[2]].map((d) => (
            <DirectorNode key={d.name} d={d} active={active === d.name} onClick={() => setActive(d.name)} />
          ))}
        </div>

        <div className="mx-auto w-px h-8 mt-4" style={{ background: "rgb(var(--ov) / 0.18)" }} />

        {/* Tier 3 — remaining directors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {directors.slice(3).map((d) => (
            <DirectorNode key={d.name} d={d} active={active === d.name} onClick={() => setActive(d.name)} />
          ))}
        </div>

        {/* Selected director detail */}
        <div
          className="mt-8 p-6 rounded-xl"
          style={{ background: "rgb(var(--ov) / 0.04)", border: "1px solid rgb(var(--ov) / 0.06)" }}
        >
          <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-start">
            <Avatar name={selected.name} category={selected.category} size={112} />
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
                {selected.role}
              </div>
              <div className="mt-1 text-[20px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {selected.name}
              </div>
              <p className="mt-3 text-[14px] leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                {selected.bio}
              </p>
              {selected.committees && selected.committees.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.committees.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px]"
                      style={{
                        background: "rgb(var(--ov) / 0.06)",
                        color: "var(--text-secondary)",
                        border: "1px solid rgb(var(--ov) / 0.08)",
                      }}
                    >
                      {c} Committee
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-right space-y-3 min-w-[140px]">
              <Meta label="On board since" value={String(selected.since)} />
              {selected.shareholding !== undefined && (
                <Meta label="Shareholding" value={`${selected.shareholding.toFixed(2)}%`} />
              )}
              <Meta label="Tenure" value={`${new Date().getFullYear() - selected.since} yrs`} />
            </div>
          </div>
        </div>
      </section>

      {/* Committees + Key Management */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
        >
          <div className="text-[11px] uppercase tracking-[0.22em] mb-1" style={{ color: "var(--text-muted)" }}>
            Board committees
          </div>
          <h3 className="text-[18px] font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
            Standing committees
          </h3>
          <div className="space-y-4">
            {committees.map((c) => (
              <div
                key={c.name}
                className="p-5 rounded-xl"
                style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
              >
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <div className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    {c.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Chair · {c.chair}
                  </div>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {c.mandate}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.members.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center px-2 py-1 rounded-full text-[11px]"
                      style={{ background: "rgb(var(--ov) / 0.05)", color: "var(--text-secondary)" }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-2xl p-6 md:p-8"
          style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
        >
          <div className="text-[11px] uppercase tracking-[0.22em] mb-1" style={{ color: "var(--text-muted)" }}>
            Operating leadership
          </div>
          <h3 className="text-[18px] font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
            Key management
          </h3>
          <ul className="divide-y" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
            {executives.map((e) => (
              <li key={e.name} className="py-3 flex items-center gap-3">
                <Avatar name={e.name} category="Executive" size={52} />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {e.name}
                  </div>
                  <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    {e.role}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function categoryColor(c: Director["category"]) {
  switch (c) {
    case "Chairman": return "var(--green-up)";
    case "Independent": return "var(--green-up)";
    case "Executive": return "#4FD1C5";
    case "Non-Executive": return "#7FD9B0";
    case "Nominee": return "#C6A969";
  }
}

function DirectorNode({
  d, active, onClick, size = "md",
}: {
  d: Director; active: boolean; onClick: () => void; size?: "md" | "lg";
}) {
  const color = categoryColor(d.category);
  const isLg = size === "lg";
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl p-4 transition w-full"
      style={{
        background: active ? "rgb(var(--ov) / 0.06)" : "rgb(var(--ov) / 0.025)",
        border: `1px solid ${active ? color : "rgb(var(--ov) / 0.06)"}`,
        boxShadow: active ? `0 0 0 3px ${color}22` : "none",
        minWidth: isLg ? 280 : undefined,
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar name={d.name} category={d.category} size={isLg ? 80 : 64} />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-wider truncate" style={{ color }}>
            {d.role}
          </div>
          <div className={`mt-0.5 font-semibold truncate ${isLg ? "text-[16px]" : "text-[14px]"}`}
            style={{ color: "var(--text-primary)" }}>
            {d.name}
          </div>
          <div className="mt-0.5 text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
            Since {d.since}{d.shareholding ? ` · ${d.shareholding.toFixed(2)}%` : ""}
          </div>
        </div>
      </div>
    </button>
  );
}

function Avatar({ name, category, size = 40 }: { name: string; category: Director["category"]; size?: number }) {
  const initials = name.split(" ").filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const color = categoryColor(category);
  return (
    <div
      className="relative flex items-end justify-center font-semibold flex-shrink-0 overflow-hidden rounded-lg"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(160deg, ${color}33 0%, ${color}11 60%, rgb(var(--ov) / 0.04) 100%)`,
        color,
        border: `1px solid ${color}55`,
        boxShadow: `0 0 0 2px rgb(var(--bg)), 0 0 0 3px ${color}33`,
      }}
      aria-label={name}
    >
      {/* silhouette placeholder */}
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        style={{ position: "absolute", inset: 0, opacity: 0.55 }}
        aria-hidden
      >
        <circle cx="32" cy="24" r="11" fill={color} opacity="0.55" />
        <path
          d="M8 60c2-12 12-18 24-18s22 6 24 18v6H8v-6z"
          fill={color}
          opacity="0.55"
        />
      </svg>
      {/* initials chip */}
      <span
        style={{
          position: "absolute",
          bottom: size * 0.06,
          right: size * 0.06,
          fontSize: Math.max(9, size * 0.2),
          padding: `${size * 0.04}px ${size * 0.1}px`,
          borderRadius: 999,
          background: "rgb(var(--bg))",
          color,
          border: `1px solid ${color}55`,
          lineHeight: 1,
        }}
      >
        {initials}
      </span>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function BoardStat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div
      className="p-5 rounded-xl"
      style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
    >
      <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="mt-2 text-[24px] font-semibold tnum tracking-tight"
        style={{ color: accent ?? "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div
      className="p-12 rounded-2xl text-center"
      style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
    >
      <div className="text-[12px] uppercase tracking-[0.22em] mb-2" style={{ color: "var(--text-muted)" }}>
        Coming soon
      </div>
      <p className="text-[16px]" style={{ color: "var(--text-secondary)" }}>{title}</p>
    </div>
  );
}

/* ----------------- Primitives ----------------- */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
      style={{
        background: "rgb(var(--brand-tint) / 0.10)",
        color: "var(--green-up)",
        border: "1px solid rgb(var(--brand-tint) / 0.18)",
      }}
    >
      {children}
    </span>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] mb-1.5"
        style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="text-[15px] font-medium tnum tracking-tight"
        style={{ color: accent ?? "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</dt>
      <dd className="mt-1 font-medium" style={{ color: "var(--text-primary)" }}>{value}</dd>
    </div>
  );
}

function SidebarCard({
  title,
  cta,
  children,
}: {
  title: string;
  cta?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-2xl p-6"
      style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>
        {cta && (
          <button onClick={cta.onClick}
            className="text-[12px] inline-flex items-center gap-1"
            style={{ color: "var(--green-up)" }}>
            {cta.label} <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
