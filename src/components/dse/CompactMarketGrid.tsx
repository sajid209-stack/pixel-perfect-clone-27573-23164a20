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
  const adv = sectors.filter((s) => s.change > 0).length;
  const dec = sectors.length - adv;
  return (
    <Cell>
      <CellHeader
        left="Sector heatmap"
        right={
          <span className="tnum">
            <span style={{ color: "var(--green-up)" }}>{adv}</span> adv ·{" "}
            <span style={{ color: "var(--red-down)" }}>{dec}</span> dec
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
  const [tab, setTab] = useState<MoverTab>("Gainers");
  const [expanded, setExpanded] = useState(false);
  const rows = moverTabs[tab];
  const visible = expanded ? rows : rows.slice(0, 3);
  const showVol = tab === "Active";

  return (
    <Cell>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div
          className="text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
        >
          Top movers
        </div>
        <div className="flex gap-0.5">
          {(Object.keys(moverTabs) as MoverTab[]).map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setExpanded(false);
                }}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium transition"
                style={{
                  color: active ? "var(--green-up)" : "var(--text-muted)",
                  background: active ? "rgba(127,217,176,0.12)" : "transparent",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={tab + String(expanded)}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
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

      {rows.length > 3 && (
        <div className="text-center mt-2">
          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-[11px] font-medium hover:underline"
            style={{ color: "var(--navy-mid, #3b5378)" }}
          >
            {expanded ? "Show less ↑" : `Show ${rows.length - 3} more ↓`}
          </button>
        </div>
      )}
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
  const [filter, setFilter] = useState("All");
  return (
    <Cell style={{ display: "flex", flexDirection: "column" }}>
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div
          className="text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
        >
          Live disclosures
        </div>
        <span className="text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
          47 today
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
              {f}
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
        View all 47 filings →
      </Link>
    </Cell>
  );
}

/* ---------- Cell D — DSEX index chart ---------- */

const idxPeriods = ["1D", "1W", "1M", "YTD"] as const;
type IdxPeriod = (typeof idxPeriods)[number];

function IndexCell() {
  const [period, setPeriod] = useState<IdxPeriod>("1D");
  const series = indexData[period];
  const high = Math.max(...series.map((d) => d.v));
  const low = Math.min(...series.map((d) => d.v));

  return (
    <Cell>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div
          className="text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
        >
          DSEX
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
                  color: active ? "#07090A" : "var(--text-muted)",
                  background: active ? "var(--green-up)" : "transparent",
                }}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <div
          className="text-[20px] font-semibold tnum tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          6,241.30
        </div>
        <div className="text-[12px] tnum" style={{ color: "var(--green-up)" }}>
          ▲ 18.40 · +0.30%
        </div>
      </div>

      <div className="dsex-chart h-[100px] -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="dsexC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--navy-mid, #3b5378)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--navy-mid, #3b5378)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
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
              stroke="var(--navy-mid, #3b5378)"
              strokeWidth={1.6}
              fill="url(#dsexC)"
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="dsex-stats mt-2 grid grid-cols-4 gap-1 text-center">
        {[
          { l: "Open", v: "6,225.10" },
          { l: "High", v: high.toLocaleString() },
          { l: "Low", v: low.toLocaleString() },
          { l: "Vol", v: "312.4M" },
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
              {s.l}
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

      <div className="mt-2 pt-2 border-t space-y-1" style={{ borderColor: "rgb(var(--ov) / 0.05)" }}>
        <div className="flex items-center justify-between text-[11px]">
          <span style={{ color: "var(--text-secondary)" }}>DS30</span>
          <span>
            <span className="tnum" style={{ color: "var(--text-primary)" }}>2,118.40</span>{" "}
            <span className="tnum" style={{ color: "var(--green-up)" }}>▲0.18%</span>
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span style={{ color: "var(--text-secondary)" }}>DSES</span>
          <span>
            <span className="tnum" style={{ color: "var(--text-primary)" }}>1,340.20</span>{" "}
            <span className="tnum" style={{ color: "var(--red-down)" }}>▼0.05%</span>
          </span>
        </div>
      </div>
    </Cell>
  );
}

/* ---------- Cell E — IPO ---------- */

function IpoCell() {
  return (
    <Cell>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div
          className="text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
        >
          IPO pipeline
        </div>
        <Link
          to="/ipo"
          className="text-[11px] font-medium hover:underline"
          style={{ color: "var(--navy-mid, #3b5378)" }}
        >
          View all →
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
              Subscription open
            </span>
          </div>
          <div className="text-[12px] font-medium mb-0.5" style={{ color: "var(--text-primary)" }}>
            Sample Bangladesh Co.
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
              73% subscribed
            </span>
            <a
              href="#"
              className="text-[10px] hover:underline"
              style={{ color: "var(--navy-mid, #3b5378)" }}
            >
              Apply via your broker →
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
            Upcoming · Jun 18
          </span>
          <div className="text-[12px] font-medium mb-0.5" style={{ color: "var(--text-primary)" }}>
            Another Sample Co.
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
  return (
    <section
      className="px-6 relative"
      style={{ paddingTop: 32, paddingBottom: 32 }}
    >
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
            Today's market
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
