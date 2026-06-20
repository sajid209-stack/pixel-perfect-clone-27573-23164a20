import { useState, useRef, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { sectors, topGainers, topLosers, mostActive } from "./data";
import { useLang } from "@/i18n/LanguageContext";
import { Sparkline, makeSeries } from "./Sparkline";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";


type IndexKey = "DSEX" | "DS30" | "DSES" | "CDSET";

const indexMeta: Record<IndexKey, {
  descriptor: string;
  value: string;
  change: number;
  spark: number[];
  series: Record<"1D" | "1W" | "1M", number[]>;
}> = {
  DSEX:  { descriptor: "Broad index",       value: "6,241.30", change:  0.30, spark: makeSeries(1, 24, true),  series: { "1D": makeSeries(2, 40, true),  "1W": makeSeries(5, 40, true),  "1M": makeSeries(9, 40, true)  } },
  DS30:  { descriptor: "Blue-chip 30",      value: "2,118.40", change:  0.18, spark: makeSeries(4, 24, true),  series: { "1D": makeSeries(11, 40, true), "1W": makeSeries(13, 40, true), "1M": makeSeries(15, 40, true) } },
  DSES:  { descriptor: "Shariah",           value: "1,340.20", change: -0.05, spark: makeSeries(7, 24, false), series: { "1D": makeSeries(21, 40, false),"1W": makeSeries(23, 40, false),"1M": makeSeries(25, 40, false)} },
  CDSET: { descriptor: "Large-cap select",  value: "1,285.60", change:  0.22, spark: makeSeries(3, 24, true),  series: { "1D": makeSeries(31, 40, true), "1W": makeSeries(33, 40, true), "1M": makeSeries(35, 40, true) } },
};

const ranges = ["1D", "1W", "1M"] as const;
type Range = typeof ranges[number];

const parseNum = (s: string) => parseFloat(s.replace(/,/g, "")) || 0;
const fmtAbs = (n: number) => n.toFixed(2);

const breadth = { adv: 157, dec: 189, unch: 45 };

type ChartPoint = { x: number; y: number; t: string };

function InteractiveChart({
  points,
  up,
  baseValue,
  height = 140,
}: {
  points: number[];
  up: boolean;
  baseValue: number;
  height?: number;
}) {
  const width = 600;
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const { coords, minY, maxY, range } = useMemo(() => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const r = max - min || 1;
    const stepX = width / (points.length - 1);
    const cs: ChartPoint[] = points.map((p, i) => {
      const minutes = Math.round((i / (points.length - 1)) * 300); // 09:30 → 14:30
      const hh = String(9 + Math.floor((30 + minutes) / 60)).padStart(2, "0");
      const mm = String((30 + minutes) % 60).padStart(2, "0");
      return {
        x: i * stepX,
        y: height - ((p - min) / r) * (height - 8) - 4,
        t: `${hh}:${mm}`,
      };
    });
    return { coords: cs, minY: min, maxY: max, range: r };
  }, [points, height]);

  void minY; void maxY; void range;

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;
  const color = up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)";
  const fillId = "chart-fill";

  const handleMove = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const idx = Math.round(ratio * (points.length - 1));
    setHoverIdx(idx);
  };

  const active = hoverIdx != null ? coords[hoverIdx] : null;
  const activeVal = hoverIdx != null ? points[hoverIdx] : null;
  const open = points[0];
  const deltaFromOpen = activeVal != null ? ((activeVal - open) / open) * 100 : 0;
  const indexValAtCursor = activeVal != null ? baseValue * (activeVal / open) : null;

  // tooltip position with clamp
  const tipW = 110;
  const tipX = active ? Math.max(4, Math.min(width - tipW - 4, active.x - tipW / 2)) : 0;
  const tipPctLeft = active ? (tipX / width) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className="relative w-full select-none"
      style={{ height }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={() => setHoverIdx(null)}
      onTouchStart={(e) => handleMove(e.touches[0].clientX)}
      onTouchMove={(e) => { e.preventDefault(); handleMove(e.touches[0].clientX); }}
      onTouchEnd={() => setHoverIdx(null)}
    >
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${fillId})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth={1.4} />
        {active && (
          <>
            <line x1={active.x} x2={active.x} y1={0} y2={height} stroke="var(--text-muted)" strokeWidth={0.75} strokeDasharray="2 2" />
            <circle cx={active.x} cy={active.y} r={3} fill="var(--surface)" stroke={color} strokeWidth={1.5} />
          </>
        )}
      </svg>
      {active && indexValAtCursor != null && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${tipPctLeft}%`,
            top: 4,
            width: tipW,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 2,
            padding: "4px 6px",
          }}
        >
          <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{active.t}</div>
          <div className="tnum text-[12px] font-semibold" style={{ color: "var(--ink)" }}>
            {indexValAtCursor.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="tnum text-[10px] font-semibold" style={{ color: deltaFromOpen >= 0 ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)" }}>
            {deltaFromOpen >= 0 ? "+" : ""}{deltaFromOpen.toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
}

function IndexSwitcher() {
  const [selected, setSelected] = useState<IndexKey>("DSEX");
  const [range, setRange] = useState<Range>("1D");
  const keys = Object.keys(indexMeta) as IndexKey[];
  const sel = indexMeta[selected];
  const points = sel.series[range];
  const first = points[0];
  const last = points[points.length - 1];
  const trendChg = ((last - first) / first) * 100;
  const up = trendChg >= 0;
  const upColor = "var(--up, #1d7a3f)";
  const downColor = "var(--down, #c0392b)";
  const selBase = parseNum(sel.value);
  const selAbs = (selBase * trendChg) / 100;

  const breadthTotal = breadth.adv + breadth.dec + breadth.unch;
  const advPct = (breadth.adv / breadthTotal) * 100;
  const decPct = (breadth.dec / breadthTotal) * 100;
  const unchPct = 100 - advPct - decPct;

  return (
    <div className="mb-4">
      {/* Full-width market-summary strip (above chart) */}
      <div
        className="grid grid-cols-2 md:[grid-template-columns:1.2fr_1fr_1fr_1.2fr] mb-3"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
      >
        <div className="py-1.5 md:[border-bottom:none]" style={{ paddingLeft: 16, paddingRight: 16, borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="text-[10px] font-semibold uppercase leading-tight" style={{ letterSpacing: "0.08em", color: "var(--text-muted)" }}>Turnover</div>
          <div className="tnum text-[15px] font-semibold leading-tight whitespace-nowrap" style={{ color: "var(--ink)" }}>৳1,124 Cr</div>
        </div>
        <div className="py-1.5 md:[border-bottom:none]" style={{ paddingLeft: 16, paddingRight: 16, borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="text-[10px] font-semibold uppercase leading-tight" style={{ letterSpacing: "0.08em", color: "var(--text-muted)" }}>Volume</div>
          <div className="tnum text-[15px] font-semibold leading-tight whitespace-nowrap" style={{ color: "var(--ink)" }}>312.4M</div>
        </div>
        <div className="py-1.5" style={{ paddingLeft: 16, paddingRight: 16, borderRight: "1px solid var(--line)" }}>
          <div className="text-[10px] font-semibold uppercase leading-tight" style={{ letterSpacing: "0.08em", color: "var(--text-muted)" }}>Trades</div>
          <div className="tnum text-[15px] font-semibold leading-tight whitespace-nowrap" style={{ color: "var(--ink)" }}>87,412</div>
        </div>
        <HoverCard openDelay={80} closeDelay={60}>
          <HoverCardTrigger asChild>
            <button type="button" className="py-1.5 text-left focus:outline-none w-full" style={{ paddingLeft: 16, paddingRight: 16 }}>
              <div className="text-[10px] font-semibold uppercase leading-tight" style={{ letterSpacing: "0.08em", color: "var(--text-muted)" }}>Breadth</div>
              <div className="mt-1 flex h-[5px] w-full overflow-hidden" style={{ borderRadius: 1, background: "var(--surface-2)" }}>
                <div style={{ width: `${advPct}%`, background: upColor }} />
                <div style={{ width: `${decPct}%`, background: downColor }} />
                <div style={{ width: `${unchPct}%`, background: "var(--text-muted)", opacity: 0.45 }} />
              </div>
              <div className="tnum text-[11.5px] font-semibold mt-0.5 whitespace-nowrap" style={{ color: "var(--ink)" }}>
                <span style={{ color: upColor }}>{breadth.adv}</span>
                <span style={{ color: "var(--text-muted)" }}> / </span>
                <span style={{ color: downColor }}>{breadth.dec}</span>
              </div>
            </button>
          </HoverCardTrigger>
          <HoverCardContent
            side="top"
            align="end"
            sideOffset={6}
            collisionPadding={12}
            avoidCollisions
            className="z-50 p-0 w-auto rounded-none shadow-md"
            style={{
              width: 200,
              padding: "12px 14px",
              background: "var(--surface)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
              borderRadius: 2,
            }}
          >
            <div className="text-[11px] font-semibold uppercase mb-2" style={{ letterSpacing: "0.08em", color: "var(--text-muted)" }}>Breadth</div>
            <div className="grid items-center text-[12px]" style={{ gridTemplateColumns: "auto 1fr", columnGap: 16, rowGap: 4 }}>
              <span style={{ color: "var(--text-muted)" }}>Advanced</span>
              <span className="text-right tnum font-semibold" style={{ color: upColor }}>{breadth.adv}</span>
              <span style={{ color: "var(--text-muted)" }}>Declined</span>
              <span className="text-right tnum font-semibold" style={{ color: downColor }}>{breadth.dec}</span>
              <span style={{ color: "var(--text-muted)" }}>Unchanged</span>
              <span className="text-right tnum font-semibold" style={{ color: "var(--ink)" }}>{breadth.unch}</span>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="grid md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-x-4 gap-y-2">

      {/* Left column: switcher + stats */}
      <div className="flex flex-col gap-3 min-w-0">
        {/* Desktop list */}
        <div
          className="hidden md:block"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
        >
          {keys.map((k, i) => {
            const m = indexMeta[k];
            const rowUp = m.change >= 0;
            const active = k === selected;
            const rowBase = parseNum(m.value);
            const rowAbs = (rowBase * m.change) / 100;
            return (
              <button
                key={k}
                onClick={() => setSelected(k)}
                className="w-full text-left grid items-center gap-3 px-3 py-2.5 focus:outline-none"
                style={{
                  gridTemplateColumns: "1fr 60px auto",
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  background: active ? "var(--brand-50, rgba(24,95,165,0.06))" : "transparent",
                  borderLeft: active ? "3px solid var(--brand-600)" : "3px solid transparent",
                }}
              >
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>{k}</div>
                  <div className="text-[11.5px] mt-0.5" style={{ color: "var(--text-muted)" }}>{m.descriptor}</div>
                </div>
                <div className="h-6">
                  <Sparkline points={m.spark} up={rowUp} height={24} />
                </div>
                <div className="text-right">
                  <div className="tnum text-[14.5px] font-semibold" style={{ color: "var(--ink)" }}>{m.value}</div>
                  <div className="tnum text-[11.5px] font-semibold whitespace-nowrap" style={{ color: rowUp ? upColor : downColor }}>
                    {rowUp ? "▲" : "▼"} <span style={{ opacity: 0.78 }}>{fmtAbs(Math.abs(rowAbs))}</span> · {rowUp ? "+" : "−"}{Math.abs(m.change).toFixed(2)}%
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile rail */}
        <div
          className="md:hidden flex gap-2 overflow-x-auto"
          style={{ scrollSnapType: "x mandatory", paddingRight: 24 }}
        >
          {keys.map((k) => {
            const m = indexMeta[k];
            const rowUp = m.change >= 0;
            const active = k === selected;
            const rowAbs = (parseNum(m.value) * m.change) / 100;
            return (
              <button
                key={k}
                onClick={() => setSelected(k)}
                className="shrink-0 text-left px-3 py-2"
                style={{
                  width: 168,
                  scrollSnapAlign: "start",
                  background: "var(--surface)",
                  border: "1px solid " + (active ? "var(--brand-600)" : "var(--line)"),
                  borderRadius: 2,
                  outline: active ? "1px solid var(--brand-600)" : "none",
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>{k}</span>
                  <span className="tnum text-[11px] font-semibold whitespace-nowrap" style={{ color: rowUp ? upColor : downColor }}>
                    {rowUp ? "▲" : "▼"}{fmtAbs(Math.abs(rowAbs))} · {rowUp ? "+" : "−"}{Math.abs(m.change).toFixed(2)}%
                  </span>
                </div>
                <div className="tnum text-[14px] font-semibold mt-0.5" style={{ color: "var(--ink)" }}>{m.value}</div>
                <div className="h-5 mt-1"><Sparkline points={m.spark} up={rowUp} height={20} /></div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Right: chart card */}
      <div
        className="flex flex-col min-w-0"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
      >
        <div
          className="flex items-start justify-between gap-3 px-3 py-2"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--text-muted)" }}>
              {selected} · {sel.descriptor}
            </div>
            <div className="mt-0.5 flex items-baseline gap-2 flex-wrap">
              <span className="tnum text-[22px] font-semibold leading-[1.15]" style={{ color: "var(--ink)" }}>{sel.value}</span>
              <span className="tnum text-[12.5px] font-semibold whitespace-nowrap" style={{ color: up ? upColor : downColor }}>
                {up ? "▲" : "▼"} <span style={{ opacity: 0.78 }}>{fmtAbs(Math.abs(selAbs))}</span>{"  "}
                <span>{up ? "+" : "−"}{Math.abs(trendChg).toFixed(2)}%</span>
              </span>
            </div>
          </div>
          <div className="flex gap-0.5 shrink-0">
            {ranges.map((k) => {
              const active = range === k;
              return (
                <button
                  key={k}
                  onClick={() => setRange(k)}
                  className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    background: active ? "var(--brand)" : "transparent",
                    color: active ? "#fff" : "var(--text-muted)",
                    borderRadius: 2,
                  }}
                >
                  {k}
                </button>
              );
            })}
          </div>
        </div>
        <div className="px-2 py-2 flex-1">
          <InteractiveChart points={points} up={up} baseValue={selBase} height={140} />
        </div>
      </div>
      </div>
    </div>

  );
}





function spanCls(size: "lg" | "md" | "sm") {
  if (size === "lg") return "col-span-2 row-span-2";
  if (size === "md") return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
}

function HeatmapTile({ s }: { s: typeof sectors[number] }) {
  const up = s.change >= 0;
  const alpha = 0.55 + Math.min(1, Math.abs(s.change) / 2) * 0.35;
  const bg = up ? `rgba(29,122,63,${alpha})` : `rgba(192,57,43,${alpha})`;
  return (
    <HoverCard openDelay={80} closeDelay={60}>
      <HoverCardTrigger asChild>
        <div
          className={`relative ${spanCls(s.size)} cursor-default`}
          style={{ background: bg, borderRadius: 0 }}
        >
          <div className="absolute inset-0 p-1.5 flex flex-col justify-between text-white">
            <div className="text-[12px] leading-tight font-medium truncate">{s.name}</div>
            <div className="text-[12px] font-bold tnum">{up ? "+" : ""}{s.change.toFixed(1)}%</div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        sideOffset={6}
        collisionPadding={12}
        avoidCollisions
        className="z-50 p-0 w-auto rounded-none shadow-md"
        style={{
          width: 210,
          padding: "12px 14px",
          background: "var(--surface)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          borderRadius: 2,
        }}
      >
        <div className="text-[14px] font-semibold mb-2" style={{ color: "var(--ink)" }}>
          {s.name}
        </div>
        <div
          className="grid items-center text-[12px]"
          style={{ gridTemplateColumns: "auto 1fr", columnGap: 16, rowGap: 4 }}
        >
          <span style={{ color: "var(--text-muted)" }}>Change</span>
          <span
            className="text-right tnum font-semibold"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", color: up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)" }}
          >
            {up ? "+" : ""}{s.change.toFixed(2)}%
          </span>
          <span style={{ color: "var(--text-muted)" }}>Turnover</span>
          <span
            className="text-right tnum"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", color: "var(--ink)" }}
          >
            {s.turnover}
          </span>
          <span style={{ color: "var(--text-muted)" }}>Direction</span>
          <span className="text-right" style={{ color: "var(--ink)" }}>
            {up ? "Advancing" : "Declining"}
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}


const moverTabs = { Gainers: topGainers, Losers: topLosers, Active: mostActive } as const;
type MoverTab = keyof typeof moverTabs;

function MoverRow({ r, showVol, idx, maxAbs }: { r: typeof topGainers[number]; showVol: boolean; idx: number; maxAbs: number }) {
  const [open, setOpen] = useState(false);
  const up = r.change >= 0;
  const series = makeSeries(idx + r.code.length, 28, up);
  const barPct = maxAbs > 0 ? Math.min(100, (Math.abs(r.change) / maxAbs) * 100) : 0;
  const barColor = up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)";
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
    >
      <Link
        to="/company/$ticker"
        params={{ ticker: r.code }}
        className="grid grid-cols-[minmax(0,1fr)_auto_auto] md:grid-cols-[minmax(0,190px)_minmax(0,1fr)_72px_64px] items-center gap-2 md:gap-3 py-2 px-3"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <div className="min-w-0">
          <div className="text-[15px] md:text-[16px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>{r.code}</div>
          <div className="text-[11.5px] md:text-[12px] truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{r.name}</div>
        </div>
        <div
          className="relative h-1.5 w-full hidden md:block"
          style={{ background: "var(--surface-2)", borderRadius: 1 }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-y-0 left-0"
            style={{ width: `${barPct}%`, background: barColor, opacity: 0.55, borderRadius: 1 }}
          />
        </div>
        <div className="text-[13.5px] tnum text-right" style={{ color: "var(--ink)" }}>
          {showVol && "volume" in r ? (r as { volume: string }).volume : r.price.toLocaleString()}
        </div>
        <div
          className="text-[12.5px] tnum font-semibold text-right"
          style={{ color: barColor }}
        >
          {up ? "▲" : "▼"} {Math.abs(r.change).toFixed(2)}%
        </div>
      </Link>
      {open && (
        <div
          className="absolute z-30 right-3 top-full mt-1 p-3"
          style={{
            background: "var(--surface)",
            color: "var(--ink)",
            border: "1px solid var(--line)",
            width: 260,
            borderRadius: 2,
            boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
          }}
        >
          <div className="flex items-baseline justify-between mb-1">
            <div>
              <div className="text-[12px] font-semibold" style={{ color: "var(--ink)" }}>{r.code}</div>
              <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{r.name}</div>
            </div>
            <span className="tnum text-[11.5px] font-semibold" style={{ color: up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)" }}>
              {up ? "▲" : "▼"} {Math.abs(r.change).toFixed(2)}%
            </span>
          </div>
          <Sparkline points={series} up={up} height={54} />
          <div className="flex justify-between text-[9.5px] mt-0.5 mb-2" style={{ color: "var(--text-muted)" }}>
            <span>09:30</span><span>Intraday</span><span>14:30</span>
          </div>
          <div className="grid grid-cols-2 gap-y-0.5 gap-x-4 text-[11px] tnum">
            <span style={{ color: "var(--text-muted)" }}>Volume</span>
            <span className="text-right" style={{ color: "var(--ink)" }}>{"volume" in r ? (r as { volume: string }).volume : "—"}</span>
            <span style={{ color: "var(--text-muted)" }}>Value</span>
            <span className="text-right" style={{ color: "var(--ink)" }}>{(r.price * 1000).toLocaleString()}</span>
            <span style={{ color: "var(--text-muted)" }}>Day range</span>
            <span className="text-right" style={{ color: "var(--ink)" }}>{(r.price * 0.98).toFixed(2)}–{(r.price * 1.02).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function TodaysMarket() {
  const { t } = useLang();
  const [tab, setTab] = useState<MoverTab>("Gainers");

  return (
    <section className="home-section" style={{ background: "var(--surface-2)" }}>
      <div className="max-w-[1180px] mx-auto">
        <div
          className="flex items-center justify-between gap-4 mb-3 pb-2 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div
            className="text-[11.5px] font-semibold uppercase flex items-center gap-2"
            style={{ letterSpacing: "0.05em", color: "var(--text-secondary)" }}
          >
            <span>{t("Today's market")}</span>
            <span className="md:hidden font-normal normal-case tracking-normal text-[11px]" style={{ color: "var(--text-muted)" }}>swipe →</span>
          </div>
          <Link
            to="/markets"
            className="text-[12.5px] font-semibold inline-flex items-center gap-1"
            style={{ color: "var(--brand-600)" }}
          >
            {t("View full market statistics")} →
          </Link>
        </div>
        <div className="text-[11px] mb-3" style={{ color: "var(--text-secondary)" }}>
          Sample data for demonstration — live data will connect to the DSE API
        </div>




        {/* Index switcher + chart */}
        <IndexSwitcher />

        {/* Heatmap + Movers */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <div className="text-[11.5px] font-semibold uppercase" style={{ letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
                {t("Sector heatmap")}
              </div>
              <span className="text-[12px] tnum" style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--up, #1d7a3f)" }}>{sectors.filter((s) => s.change > 0).length}</span> adv ·{" "}
                <span style={{ color: "var(--down, #c0392b)" }}>{sectors.filter((s) => s.change < 0).length}</span> dec
              </span>
            </div>
            <div
              className="grid gap-[2px] p-2 flex-1 grid-cols-4 md:grid-cols-6"
              style={{ gridAutoRows: "minmax(56px, 1fr)", gridAutoFlow: "dense", minHeight: 240 }}
            >
              {sectors.map((s) => <HeatmapTile key={s.name} s={s} />)}
            </div>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <div className="text-[11.5px] font-semibold uppercase" style={{ letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
                {t("Top movers")}
              </div>
              <div className="flex gap-0.5">
                {(Object.keys(moverTabs) as MoverTab[]).map((k) => {
                  const active = tab === k;
                  return (
                    <button
                      key={k}
                      onClick={() => setTab(k)}
                      className="px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide"
                      style={{
                        background: active ? "var(--brand)" : "transparent",
                        color: active ? "#fff" : "var(--text-muted)",
                        border: active ? "none" : "1px solid var(--line)",
                        borderRadius: 2,
                      }}
                    >
                      {t(k)}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              {(() => {
                const rows = moverTabs[tab].slice(0, 5);
                const maxAbs = Math.max(...rows.map((r) => Math.abs(r.change)));
                return rows.map((r, i) => (
                  <MoverRow key={r.code} r={r} showVol={tab === "Active"} idx={i} maxAbs={maxAbs} />
                ));
              })()}
            </div>
            <Link
              to="/markets"
              hash="movers"
              className="flex items-center justify-between px-3 py-2 text-[12.5px] font-semibold"
              style={{ borderTop: "1px solid var(--line)", color: "var(--brand-600)" }}
            >
              <span>{t("View all movers")}</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
