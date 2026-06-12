import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { sectors, topGainers, topLosers, mostActive } from "./data";
import { useLang } from "@/i18n/LanguageContext";
import { Sparkline, makeSeries } from "./Sparkline";
import { DsexTrendCard } from "./DsexTrendCard";

type IndexKey = "DSEX" | "DS30" | "DSES";

const indexMeta: Record<IndexKey, {
  value: string;
  change: number;
  open: string;
  high: string;
  low: string;
  volume: string;
  series: number[];
}> = {
  DSEX: { value: "6,241.30", change: 0.30, open: "6,225.10", high: "6,248.20", low: "6,219.80", volume: "312.4M", series: makeSeries(1, 32, true) },
  DS30: { value: "2,118.40", change: 0.18, open: "2,114.60", high: "2,121.10", low: "2,110.40", volume: "98.2M", series: makeSeries(4, 32, true) },
  DSES: { value: "1,340.20", change: -0.05, open: "1,341.50", high: "1,343.10", low: "1,338.20", volume: "41.7M", series: makeSeries(7, 32, false) },
};

function HoverCardShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute z-30 left-3 top-full mt-1 p-3"
      style={{
        background: "var(--surface)",
        color: "var(--ink)",
        border: "1px solid var(--line)",
        width: 260,
        borderRadius: 2,
        boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
      }}
    >
      {children}
    </div>
  );
}

function IndexCell({ name }: { name: IndexKey }) {
  const [open, setOpen] = useState(false);
  const m = indexMeta[name];
  const up = m.change >= 0;
  return (
    <div
      className="relative px-4 py-3.5 cursor-default"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="text-[11.5px] font-semibold uppercase" style={{ letterSpacing: "0.05em", color: "var(--text-muted)" }}>
        {name}
      </div>
      <div className="mt-1 tnum text-[22px] font-semibold leading-[1.15]" style={{ color: "var(--ink)" }}>
        {m.value}
      </div>
      <div
        className="mt-1.5 tnum text-[12.5px] font-semibold"
        style={{ color: up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)" }}
      >
        {up ? "▲" : "▼"} {Math.abs(m.change).toFixed(2)}%
      </div>
      {open && (
        <HoverCardShell>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[12px] font-semibold" style={{ color: "var(--ink)" }}>{name}</span>
            <span className="tnum text-[11.5px] font-semibold" style={{ color: up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)" }}>
              {up ? "▲" : "▼"} {Math.abs(m.change).toFixed(2)}%
            </span>
          </div>
          <Sparkline points={m.series} up={up} height={54} />
          <div className="flex justify-between text-[9.5px] mt-0.5 mb-2" style={{ color: "var(--text-muted)" }}>
            <span>09:30</span><span>Intraday</span><span>14:30</span>
          </div>
          <div className="grid grid-cols-2 gap-y-0.5 gap-x-4 text-[11px] tnum">
            <span style={{ color: "var(--text-muted)" }}>Open</span><span className="text-right" style={{ color: "var(--ink)" }}>{m.open}</span>
            <span style={{ color: "var(--text-muted)" }}>High</span><span className="text-right" style={{ color: "var(--ink)" }}>{m.high}</span>
            <span style={{ color: "var(--text-muted)" }}>Low</span><span className="text-right" style={{ color: "var(--ink)" }}>{m.low}</span>
            <span style={{ color: "var(--text-muted)" }}>Volume</span><span className="text-right" style={{ color: "var(--ink)" }}>{m.volume}</span>
          </div>
        </HoverCardShell>
      )}
    </div>
  );
}

function StatCell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="px-4 py-3.5">
      <div className="text-[11.5px] font-semibold uppercase" style={{ letterSpacing: "0.05em", color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="mt-1 tnum text-[22px] font-semibold leading-[1.15]" style={{ color: "var(--ink)" }}>
        {value}
      </div>
      <div className="mt-1.5 text-[12px]" style={{ color: "var(--text-muted)" }}>{sub}</div>
    </div>
  );
}

function spanCls(size: "lg" | "md" | "sm") {
  if (size === "lg") return "col-span-2 row-span-2";
  if (size === "md") return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
}

function HeatmapTile({ s }: { s: typeof sectors[number] }) {
  const [open, setOpen] = useState(false);
  const up = s.change >= 0;
  const alpha = 0.55 + Math.min(1, Math.abs(s.change) / 2) * 0.35;
  const bg = up ? `rgba(29,122,63,${alpha})` : `rgba(192,57,43,${alpha})`;
  return (
    <div
      className={`relative ${spanCls(s.size)}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      style={{ background: bg, borderRadius: 0 }}
    >
      <div className="absolute inset-0 p-1.5 flex flex-col justify-between text-white">
        <div className="text-[12px] leading-tight font-medium truncate">{s.name}</div>
        <div className="text-[12px] font-bold tnum">{up ? "+" : ""}{s.change.toFixed(1)}%</div>
      </div>
      {open && (
        <div
          className="absolute z-30 left-1/2 -translate-x-1/2 -top-2 -translate-y-full p-2.5 text-[11px] whitespace-nowrap"
          style={{
            background: "var(--surface)",
            color: "var(--ink)",
            border: "1px solid var(--line)",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          }}
        >
          <div className="font-semibold mb-1">{s.name}</div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 tnum">
            <span style={{ color: "var(--text-muted)" }}>Change</span><span className="text-right">{up ? "+" : ""}{s.change.toFixed(2)}%</span>
            <span style={{ color: "var(--text-muted)" }}>Turnover</span><span className="text-right">{s.turnover}</span>
            <span style={{ color: "var(--text-muted)" }}>Direction</span><span className="text-right">{up ? "Advancing" : "Declining"}</span>
          </div>
        </div>
      )}
    </div>
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
        className="grid grid-cols-[190px_1fr_72px_64px] items-center gap-3 py-2 px-3"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <div className="min-w-0">
          <div className="text-[16px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>{r.code}</div>
          <div className="text-[12px] truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{r.name}</div>
        </div>
        <div
          className="relative h-1.5 w-full"
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


        {/* Snapshot row + compact DSEX trend chart */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-4 mb-4 items-center">
          <div
            className="idx-rail grid grid-cols-2 md:grid-cols-5"
            style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
          >
            <div className="idx-cell" style={{ borderRight: "1px solid var(--line)" }}><IndexCell name="DSEX" /></div>
            <div className="idx-cell" style={{ borderRight: "1px solid var(--line)" }}><IndexCell name="DS30" /></div>
            <div className="idx-cell" style={{ borderRight: "1px solid var(--line)" }}><IndexCell name="DSES" /></div>
            <div className="idx-cell" style={{ borderRight: "1px solid var(--line)" }}>
              <StatCell label="Turnover" value="৳1,124 Cr" sub="312.4M shares" />
            </div>
            <div className="idx-cell"><StatCell label="Breadth" value="188 / 142" sub="adv / dec" /></div>
          </div>
          <DsexTrendCard />
        </div>

        {/* Heatmap + Movers */}
        <div className="grid md:grid-cols-2 gap-4 items-start">
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
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
              className="grid gap-[2px] p-2"
              style={{ gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "46px", gridAutoFlow: "dense" }}
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
