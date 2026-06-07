import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import {
  sectors,
  topGainers,
  topLosers,
  mostActive,
  announcements,
  indexData,
} from "./data";
import { useLang } from "@/i18n/LanguageContext";

/* ---------- Cell shell ---------- */

function Cell({
  className = "",
  style = {},
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`compact-cell rounded-xl ${className}`}
      style={{
        background: "rgb(var(--surface-rgb))",
        border: "1px solid rgb(var(--ov) / 0.08)",
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CellHeader({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      <div
        className="text-[11px] font-medium uppercase"
        style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
      >
        {left}
      </div>
      {right && (
        <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          {right}
        </div>
      )}
    </div>
  );
}

/* ---------- Cell A — Heatmap ---------- */

function spanClasses(size: "lg" | "md" | "sm") {
  if (size === "lg") return "col-span-2 row-span-2";
  if (size === "md") return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
}
function intensity(c: number) {
  return Math.min(1, Math.abs(c) / 2);
}

function HeatmapCell() {
  const { t } = useLang();
  const adv = sectors.filter((s) => s.change > 0).length;
  const dec = sectors.length - adv;
  return (
    <Cell>
      <CellHeader
        left={t("Sector heatmap")}
        right={
          <span className="tnum">
            <span style={{ color: "var(--green-up)" }}>{adv}</span> {t("adv")} ·{" "}
            <span style={{ color: "var(--red-down)" }}>{dec}</span> {t("dec")}
          </span>
        }
      />
      <div
        className="heatmap-grid grid gap-1.5"
        style={{
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "44px",
          gridAutoFlow: "dense",
        }}
      >
        {sectors.map((s) => {
          const up = s.change >= 0;
          const alpha = 0.6 + intensity(s.change) * 0.35;
          const bg = up ? `rgba(22,169,116,${alpha})` : `rgba(217,65,94,${alpha})`;
          return (
            <div
              key={s.name}
              className={`heatmap-cell relative rounded-md overflow-hidden ${spanClasses(s.size)}`}
              style={{ background: bg }}
              title={`${s.name} · ${s.turnover}`}
            >
              <div className="absolute inset-0 p-1.5 flex flex-col justify-between text-white">
                <div className="text-[9.5px] leading-tight font-medium truncate">{s.name}</div>
                <div className="text-[11px] font-bold tnum">
                  {up ? "+" : ""}
                  {s.change.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="mobile-swipe-hint mt-1.5 text-[10px] text-center hidden"
        style={{ color: "var(--text-muted)" }}
      >
        ← swipe →
      </div>
    </Cell>
  );
}

/* ---------- Cell B — Movers ---------- */

const moverTabs = {
  Gainers: topGainers,
  Losers: topLosers,
  Active: mostActive,
} as const;
type MoverTab = keyof typeof moverTabs;

function MoversCell() {
  const { t } = useLang();
  const [tab, setTab] = useState<MoverTab>("Gainers");
  const rows = moverTabs[tab];
  const visible = rows.slice(0, 5);
  const showVol = tab === "Active";

  return (
    <Cell>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div
          className="text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
        >
          {t("Top movers")}
        </div>
        <div className="flex gap-0.5">
          {(Object.keys(moverTabs) as MoverTab[]).map((tk) => {
            const active = tab === tk;
            return (
              <button
                key={tk}
                onClick={() => setTab(tk)}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium transition"
                style={{
                  color: active ? "var(--green-up)" : "var(--text-muted)",
                  background: active ? "rgba(127,217,176,0.12)" : "transparent",
                }}
              >
                {t(tk)}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="movers-list">
            {visible.map((r) => {
              const up = r.change >= 0;
              return (
                <Link
                  key={r.code}
                  to="/company/$ticker"
                  params={{ ticker: r.code }}
                  className="mover-row grid grid-cols-[1fr_auto_auto] items-center gap-2 py-2 border-t"
                  style={{ borderColor: "rgb(var(--ov) / 0.05)" }}
                >
                  <div className="min-w-0">
                    <div
                      className="text-[12px] font-semibold leading-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {r.code}
                    </div>
                    <div
                      className="text-[11px] truncate mover-name"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {r.name}
                    </div>
                  </div>
                  <div
                    className="text-[12px] tnum text-right"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {showVol && "volume" in r ? (r as { volume: string }).volume : r.price.toLocaleString()}
                  </div>
                  <div
                    className="text-[10px] tnum px-1.5 py-0.5 rounded-full"
                    style={{
                      color: up ? "var(--green-up)" : "var(--red-down)",
                      background: up ? "rgba(127,217,176,0.10)" : "rgba(232,136,154,0.10)",
                    }}
                  >
                    {up ? "▲" : "▼"} {Math.abs(r.change).toFixed(2)}%
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </Cell>
  );
}

/* ---------- Cell C — Disclosures ---------- */

const typeBadge: Record<string, { color: string; bg: string; label: string }> = {
  "Price sensitive": { color: "#2b6cb0", bg: "rgba(43,108,176,0.12)", label: "PSI" },
  Dividend: { color: "var(--green-up)", bg: "rgba(22,169,116,0.12)", label: "DIV" },
  "AGM notice": { color: "#b7791f", bg: "rgba(183,121,31,0.12)", label: "AGM" },
  Regulatory: { color: "var(--red-down)", bg: "rgba(217,65,94,0.12)", label: "REG" },
};

const discFilters = ["All", "Price sensitive", "Dividend", "AGM", "Regulatory"];

function DisclosuresCell() {
  const { t } = useLang();
  const [filter, setFilter] = useState("All");
  return (
    <Cell style={{ display: "flex", flexDirection: "column" }}>
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div
          className="text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
        >
          {t("Live disclosures")}
        </div>
        <span className="text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
          47 {t("today")}
        </span>
      </div>

      <div
        className="disc-filters flex gap-1 mb-3 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {discFilters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition"
              style={{
                color: active ? "#07090A" : "var(--text-secondary)",
                background: active ? "var(--green-up)" : "rgb(var(--ov) / 0.04)",
              }}
            >
              {t(f)}
            </button>
          );
        })}
      </div>

      <div className="flex-1 space-y-2">
        {announcements.slice(0, 3).map((a) => {
          const cfg = typeBadge[a.type] ?? typeBadge.Regulatory;
          return (
            <Link
              key={a.code + a.date}
              to="/company/$ticker"
              params={{ ticker: a.code }}
              className="disc-row block py-2.5 border-t"
              style={{ borderColor: "rgb(var(--ov) / 0.05)" }}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className="text-[12px] font-semibold"
                  style={{ color: "var(--navy-mid, #3b5378)" }}
                >
                  {a.code}
                </span>
                <span className="text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
                  {a.date}
                </span>
              </div>
              <div
                className="text-[12px] truncate mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                {a.summary}
              </div>
              <span
                className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ color: cfg.color, background: cfg.bg }}
              >
                {cfg.label}
              </span>
            </Link>
          );
        })}
      </div>

      <Link
        to="/news"
        className="text-[11px] font-medium hover:underline mt-3 inline-block"
        style={{ color: "var(--navy-mid, #3b5378)" }}
      >
        {t("View all")} 47 →
      </Link>
    </Cell>
  );
}

/* ---------- Cell D — Index chart (DSEX / DS30 / DSES) ---------- */

const idxPeriods = ["1D", "1W", "1M", "YTD"] as const;
type IdxPeriod = (typeof idxPeriods)[number];

type IndexKey = "DSEX" | "DS30" | "DSES";

const indexMeta: Record<IndexKey, {
  value: number;
  change: number;
  changePct: number;
  open: string;
  high: number;
  low: number;
  vol: string;
  trend: "up" | "mild-up" | "flat-down";
  base: number;
}> = {
  DSEX: { value: 6241.30, change: 18.40, changePct: 0.30, open: "6,225.10", high: 6241, low: 6192, vol: "312.4M", trend: "up", base: 6200 },
  DS30: { value: 2118.40, change: 3.80, changePct: 0.18, open: "2,112.60", high: 2120, low: 2108, vol: "98.2M", trend: "mild-up", base: 2110 },
  DSES: { value: 1340.20, change: -0.70, changePct: -0.05, open: "1,341.50", high: 1343, low: 1338, vol: "41.7M", trend: "flat-down", base: 1341 },
};

function makeSeries(idx: IndexKey, period: IdxPeriod): { t: string; v: number }[] {
  const labels = indexData[period].map((d) => d.t);
  const meta = indexMeta[idx];
  const n = labels.length;
  const span = meta.value * (period === "1D" ? 0.008 : period === "1W" ? 0.015 : period === "1M" ? 0.03 : 0.08);
  return labels.map((t, i) => {
    const p = i / Math.max(1, n - 1);
    let v: number;
    if (meta.trend === "up") {
      v = meta.base + span * p + Math.sin(i * 1.2) * span * 0.12;
    } else if (meta.trend === "mild-up") {
      v = meta.base + span * p * 0.6 + Math.sin(i * 0.9) * span * 0.08;
    } else {
      v = meta.value + Math.sin(i * 1.4) * span * 0.1 - span * 0.05 * p;
    }
    return { t, v: Math.round(v * 100) / 100 };
  });
}

function IndexCell() {
  const { t } = useLang();
  const [period, setPeriod] = useState<IdxPeriod>("1D");
  const [idx, setIdx] = useState<IndexKey>("DSEX");
  const meta = indexMeta[idx];
  const up = meta.change >= 0;
  const series = makeSeries(idx, period);
  const high = Math.max(...series.map((d) => d.v));
  const low = Math.min(...series.map((d) => d.v));
  const lineColor = up ? "var(--green-up)" : "var(--red-down)";
  const lineColorRaw = up ? "rgba(22,169,116,1)" : "rgba(217,65,94,1)";
  const others = (Object.keys(indexMeta) as IndexKey[]).filter((k) => k !== idx);
  const gradId = `idxC-${idx}`;

  return (
    <Cell>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex gap-0.5">
          {(Object.keys(indexMeta) as IndexKey[]).map((k) => {
            const active = k === idx;
            return (
              <button
                key={k}
                onClick={() => setIdx(k)}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide transition"
                style={{
                  color: active ? "#07090A" : "var(--text-muted)",
                  background: active ? "var(--green-up)" : "transparent",
                }}
              >
                {k}
              </button>
            );
          })}
        </div>
        <div className="flex gap-0.5">
          {idxPeriods.map((p) => {
            const active = p === period;
            return (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium tnum transition"
                style={{
                  color: active ? "var(--text-primary)" : "var(--text-muted)",
                  background: active ? "rgb(var(--ov) / 0.08)" : "transparent",
                }}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-baseline gap-2 mb-1">
            <div
              className="text-[20px] font-semibold tnum tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {meta.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[12px] tnum" style={{ color: lineColor }}>
              {up ? "▲" : "▼"} {Math.abs(meta.change).toFixed(2)} · {up ? "+" : ""}
              {meta.changePct.toFixed(2)}%
            </div>
          </div>

          <div className="dsex-chart h-[100px] -mx-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={lineColorRaw} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={lineColorRaw} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" hide />
                <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip
                  cursor={{ stroke: "rgb(var(--ov) / 0.15)", strokeDasharray: "3 3" }}
                  contentStyle={{
                    borderRadius: 8,
                    border: "none",
                    background: "rgba(15,20,18,0.92)",
                    color: "#fff",
                    fontSize: 11,
                    padding: "4px 8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={lineColor}
                  strokeWidth={1.6}
                  fill={`url(#${gradId})`}
                  isAnimationActive
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="dsex-stats mt-2 grid grid-cols-4 gap-1 text-center">
            {[
              { l: "Open", v: meta.open },
              { l: "High", v: Math.max(meta.high, high).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
              { l: "Low", v: Math.min(meta.low, low).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
              { l: "Vol", v: meta.vol },
            ].map((s, i) => (
              <div
                key={s.l}
                className="dsex-stat"
                style={{
                  borderLeft: i > 0 ? "1px solid rgb(var(--ov) / 0.08)" : "none",
                }}
              >
                <div
                  className="text-[9px] uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t(s.l)}
                </div>
                <div
                  className="text-[11px] font-medium tnum"
                  style={{ color: "var(--text-primary)" }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-2 pt-2 border-t space-y-1" style={{ borderColor: "rgb(var(--ov) / 0.05)" }}>
        {others.map((k) => {
          const m = indexMeta[k];
          const u = m.change >= 0;
          return (
            <button
              key={k}
              onClick={() => setIdx(k)}
              className="w-full flex items-center justify-between text-[11px] rounded px-1 py-0.5 -mx-1 hover:bg-[rgb(var(--ov)/0.04)] transition"
            >
              <span style={{ color: "var(--text-secondary)" }}>{k}</span>
              <span>
                <span className="tnum" style={{ color: "var(--text-primary)" }}>
                  {m.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>{" "}
                <span className="tnum" style={{ color: u ? "var(--green-up)" : "var(--red-down)" }}>
                  {u ? "▲" : "▼"}
                  {Math.abs(m.changePct).toFixed(2)}%
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Cell>
  );
}

/* ---------- Cell E — IPO ---------- */

function IpoCell() {
  const { t } = useLang();
  return (
    <Cell>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div
          className="text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
        >
          {t("IPO pipeline")}
        </div>
        <Link
          to="/ipo"
          className="text-[11px] font-medium hover:underline"
          style={{ color: "var(--navy-mid, #3b5378)" }}
        >
          {t("View all →")}
        </Link>
      </div>

      <div className="space-y-2">
        {/* Active */}
        <div
          className="p-3 rounded-lg"
          style={{
            background: "rgba(22,169,116,0.05)",
            border: "1px solid rgba(22,169,116,0.2)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--green-up)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--green-up)" }}
              />
            </span>
            <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--green-up)" }}>
              {t("Subscription open")}
            </span>
          </div>
          <div className="text-[12px] font-medium mb-0.5" style={{ color: "var(--text-primary)" }}>
            {t("Sample Bangladesh Co.")}
          </div>
          <div className="text-[11px] mb-2" style={{ color: "var(--text-muted)" }}>
            ৳10/share · Closes Jun 10
          </div>
          <div
            className="h-1 w-full rounded-sm overflow-hidden mb-1"
            style={{ background: "rgb(var(--ov) / 0.08)" }}
          >
            <div
              className="h-full rounded-sm"
              style={{ width: "73%", background: "var(--green-up)" }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium" style={{ color: "var(--green-up)" }}>
              {t("73% subscribed")}
            </span>
            <a
              href="#"
              className="text-[10px] hover:underline"
              style={{ color: "var(--navy-mid, #3b5378)" }}
            >
              {t("Apply via your broker →")}
            </a>
          </div>
        </div>

        {/* Upcoming */}
        <div
          className="p-3 rounded-lg"
          style={{
            background: "rgb(var(--ov) / 0.02)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mb-1"
            style={{ color: "#b7791f", background: "rgba(183,121,31,0.12)" }}
          >
            {t("Upcoming · Jun 18")}
          </span>
          <div className="text-[12px] font-medium mb-0.5" style={{ color: "var(--text-primary)" }}>
            {t("Another Sample Co.")}
          </div>
          <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            ৳15/share
          </div>
        </div>
      </div>
    </Cell>
  );
}

/* ---------- Section shell ---------- */

export function CompactMarketGrid() {
  const { t } = useLang();
  return (
    <section className="home-section relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className="flex items-center justify-between gap-4 mb-4 pb-2 border-b"
          style={{ borderColor: "rgb(var(--ov) / 0.08)", maxHeight: 40 }}
        >
          <div
            className="text-[11px] font-medium uppercase"
            style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
          >
            {t("Today's market")}
          </div>
          <div
            className="text-[11px] tnum"
            style={{ color: "var(--text-muted)" }}
          >
            Jun 5, 2026 · Session closes 14:30 · Updated 13:42
          </div>
        </div>

        {/* Grid */}
        <div className="compact-market-grid">
          <div className="cell-a"><HeatmapCell /></div>
          <div className="cell-b"><MoversCell /></div>
          <div className="cell-c"><DisclosuresCell /></div>
          <div className="cell-d"><IndexCell /></div>
          <div className="cell-e"><IpoCell /></div>
        </div>
      </div>
    </section>
  );
}
