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
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
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
  { id: "directors", label: "Directors" },
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
          style={{ background: "var(--green-up)", color: "#07090A" }}
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
            <div
              className="text-[14px] font-bold tnum tracking-wide"
              style={{ color: "var(--green-up)", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
            >
              {co.code}
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
                  style={{ background: "var(--green-up)" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                  style={{ background: "var(--green-up)" }} />
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
                    style={{ background: "var(--green-up)", boxShadow: "0 0 8px var(--green-up)" }}
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
            {tab === "directors" && <Placeholder title="Board & directors" />}
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
        <FinancialSnapshot co={co} />
        <ShareholdersCard co={co} />
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
  const stroke = up ? "var(--green-up)" : "var(--red-down)";
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
                    style={{ background: "var(--green-up)" }}
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

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-8 pt-6 border-t"
        style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <Stat label="Open" value={`৳ ${co.open}`} />
        <Stat label="High" value={`৳ ${co.high}`} accent="var(--green-up)" />
        <Stat label="Low" value={`৳ ${co.low}`} accent="var(--red-down)" />
        <Stat label="Volume" value={formatVolume(co.volume)} />
        <Stat label="52W High" value={`৳ ${co.weekHigh52}`} />
        <Stat label="52W Low" value={`৳ ${co.weekLow52}`} />
      </div>
    </section>
  );
}

function StatsGrid({ co }: { co: Company }) {
  const items = [
    { label: "Market Cap", value: formatBDT(co.marketCap) },
    { label: "P/E Ratio", value: `${co.pe.toFixed(1)}x` },
    { label: "EPS (TTM)", value: `৳ ${co.eps.toFixed(2)}` },
    { label: "Dividend Yield", value: `${co.dividendYield.toFixed(2)}%` },
    { label: "Book Value", value: `৳ ${co.bookValue.toFixed(2)}` },
    { label: "Free Float", value: `${co.freeFloat}%` },
  ];
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] mb-4"
        style={{ color: "var(--text-muted)" }}>
        Key statistics
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-xl"
            style={{
              background: "rgb(var(--ov) / 0.025)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <div className="text-[11px] uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}>
              {s.label}
            </div>
            <div className="mt-2 text-[18px] font-medium tnum tracking-tight"
              style={{ color: "var(--text-primary)" }}>
              {s.value}
            </div>
          </div>
        ))}
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
        <Meta label="Founded" value={String(co.founded)} />
        <Meta label="HQ" value={co.hq} />
        {co.employees && <Meta label="Employees" value={co.employees.toLocaleString()} />}
        <Meta label="Board" value={co.board} />
      </dl>
      {co.website && (
        <a
          href={`https://${co.website}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: "var(--green-up)" }}
        >
          {co.website}
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </SidebarCard>
  );
}

function FinancialSnapshot({ co }: { co: Company }) {
  if (!co.financials) return null;
  const rows: [string, string][] = [
    ["Revenue (FY25)", co.financials.revenue],
    ["Net Profit", co.financials.netProfit],
    ["Net Margin", co.financials.netMargin],
    ["ROE", co.financials.roe],
    ["Debt/Equity", co.financials.debtEquity],
  ];
  return (
    <SidebarCard title="Financial snapshot">
      <dl className="space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between text-[13px]">
            <dt style={{ color: "var(--text-muted)" }}>{k}</dt>
            <dd className="tnum font-medium" style={{ color: "var(--text-primary)" }}>{v}</dd>
          </div>
        ))}
      </dl>
    </SidebarCard>
  );
}

function ShareholdersCard({ co }: { co: Company }) {
  if (!co.shareholders) return null;
  const palette = ["var(--green-up)", "#7FD9B0", "#4FD1C5"];
  return (
    <SidebarCard title="Top shareholders">
      <div className="space-y-3">
        {co.shareholders.map((s, i) => (
          <div key={s.name}>
            <div className="flex items-baseline justify-between text-[13px] mb-1">
              <span style={{ color: "var(--text-secondary)" }}>{s.name}</span>
              <span className="tnum font-medium" style={{ color: "var(--text-primary)" }}>
                {s.pct.toFixed(1)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgb(var(--ov) / 0.06)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{ duration: 1, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
                style={{ background: palette[i % palette.length] }}
              />
            </div>
          </div>
        ))}
      </div>
    </SidebarCard>
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
                style={{ background: "rgba(127,217,176,0.10)", color: "var(--green-up)" }}
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
      <section
        className="rounded-2xl p-8"
        style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
      >
        <h2 className="text-[20px] font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
          Annual performance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {co.financials &&
            Object.entries(co.financials).map(([k, v]) => (
              <div
                key={k}
                className="p-5 rounded-xl"
                style={{ background: "rgb(var(--ov) / 0.025)", border: "1px solid rgb(var(--ov) / 0.06)" }}
              >
                <div className="text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}>
                  {k.replace(/([A-Z])/g, " $1")}
                </div>
                <div className="mt-2 text-[20px] font-medium tnum"
                  style={{ color: "var(--text-primary)" }}>
                  {v}
                </div>
              </div>
            ))}
        </div>
      </section>
      <ShareholdersCard co={co} />
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
                style={{ background: "rgba(127,217,176,0.10)", color: "var(--green-up)" }}
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
        background: "rgba(127,217,176,0.10)",
        color: "var(--green-up)",
        border: "1px solid rgba(127,217,176,0.18)",
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
