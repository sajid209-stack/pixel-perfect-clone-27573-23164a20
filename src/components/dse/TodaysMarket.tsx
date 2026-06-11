import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { sectors, topGainers, topLosers, mostActive } from "./data";
import { useLang } from "@/i18n/LanguageContext";

type IndexKey = "DSEX" | "DS30" | "DSES";

const indexMeta: Record<IndexKey, {
  value: string;
  change: number;
  open: string;
  high: string;
  low: string;
  volume: string;
}> = {
  DSEX: { value: "6,241.30", change: 0.30, open: "6,225.10", high: "6,248.20", low: "6,219.80", volume: "312.4M" },
  DS30: { value: "2,118.40", change: 0.18, open: "2,114.60", high: "2,121.10", low: "2,110.40", volume: "98.2M" },
  DSES: { value: "1,340.20", change: -0.05, open: "1,341.50", high: "1,343.10", low: "1,338.20", volume: "41.7M" },
};

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
      <div className="text-[10px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--text-muted)" }}>
        {name}
      </div>
      <div className="mt-1 tnum text-[18px] font-semibold leading-none" style={{ color: "var(--ink)" }}>
        {m.value}
      </div>
      <div
        className="mt-1.5 tnum text-[12px] font-semibold"
        style={{ color: up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)" }}
      >
        {up ? "▲" : "▼"} {Math.abs(m.change).toFixed(2)}%
      </div>
      {open && (
        <div
          className="absolute left-3 top-full mt-1 z-30 p-3 text-[11px] tnum"
          style={{
            background: "var(--brand)",
            color: "#fff",
            minWidth: 180,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          }}
        >
          <div className="grid grid-cols-2 gap-y-1 gap-x-4">
            <span style={{ color: "rgba(255,255,255,0.65)" }}>Open</span><span className="text-right">{m.open}</span>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>High</span><span className="text-right">{m.high}</span>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>Low</span><span className="text-right">{m.low}</span>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>Volume</span><span className="text-right">{m.volume}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="px-4 py-3.5">
      <div className="text-[10px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="mt-1 tnum text-[18px] font-semibold leading-none" style={{ color: "var(--ink)" }}>
        {value}
      </div>
      <div className="mt-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>{sub}</div>
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
        <div className="text-[10px] leading-tight font-medium truncate">{s.name}</div>
        <div className="text-[11px] font-bold tnum">{up ? "+" : ""}{s.change.toFixed(1)}%</div>
      </div>
      {open && (
        <div
          className="absolute z-30 left-1/2 -translate-x-1/2 -top-2 -translate-y-full p-2.5 text-[11px] whitespace-nowrap"
          style={{ background: "var(--brand)", color: "#fff", borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
        >
          <div className="font-semibold mb-1">{s.name}</div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 tnum" style={{ color: "rgba(255,255,255,0.85)" }}>
            <span>Change</span><span className="text-right">{up ? "+" : ""}{s.change.toFixed(2)}%</span>
            <span>Turnover</span><span className="text-right">{s.turnover}</span>
            <span>Direction</span><span className="text-right">{up ? "Advancing" : "Declining"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const moverTabs = { Gainers: topGainers, Losers: topLosers, Active: mostActive } as const;
type MoverTab = keyof typeof moverTabs;

function MoverRow({ r, showVol }: { r: typeof topGainers[number]; showVol: boolean }) {
  const [open, setOpen] = useState(false);
  const up = r.change >= 0;
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
        className="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-2 px-3"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <div className="min-w-0">
          <div className="text-[12.5px] font-semibold" style={{ color: "var(--ink)" }}>{r.code}</div>
          <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{r.name}</div>
        </div>
        <div className="text-[12.5px] tnum text-right" style={{ color: "var(--ink)" }}>
          {showVol && "volume" in r ? (r as { volume: string }).volume : r.price.toLocaleString()}
        </div>
        <div
          className="text-[11px] tnum font-semibold w-16 text-right"
          style={{ color: up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)" }}
        >
          {up ? "▲" : "▼"} {Math.abs(r.change).toFixed(2)}%
        </div>
      </Link>
      {open && (
        <div
          className="absolute z-30 right-3 top-full mt-1 p-2.5 text-[11px] whitespace-nowrap tnum"
          style={{ background: "var(--brand)", color: "#fff", borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
            <span style={{ color: "rgba(255,255,255,0.65)" }}>Volume</span>
            <span className="text-right">{"volume" in r ? (r as { volume: string }).volume : "—"}</span>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>Value</span>
            <span className="text-right">{(r.price * 1000).toLocaleString()}</span>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>Day range</span>
            <span className="text-right">{(r.price * 0.98).toFixed(2)}–{(r.price * 1.02).toFixed(2)}</span>
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
    <section className="home-section">
      <div className="max-w-[1180px] mx-auto">
        <div
          className="flex items-center justify-between gap-4 mb-3 pb-2 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div
            className="text-[11px] font-semibold uppercase"
            style={{ letterSpacing: "0.12em", color: "var(--text-secondary)" }}
          >
            {t("Today's market")}
          </div>
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {t("Hover or tap a cell for detail")}
          </span>
        </div>

        {/* Merged index snapshot row */}
        <div
          className="grid grid-cols-2 md:grid-cols-5 mb-4"
          style={{ background: "#fff", border: "1px solid var(--line)" }}
        >
          <div style={{ borderRight: "1px solid var(--line)" }}><IndexCell name="DSEX" /></div>
          <div style={{ borderRight: "1px solid var(--line)" }}><IndexCell name="DS30" /></div>
          <div style={{ borderRight: "1px solid var(--line)" }}><IndexCell name="DSES" /></div>
          <div style={{ borderRight: "1px solid var(--line)" }}>
            <StatCell label="Turnover" value="৳1,124 Cr" sub="312.4M shares" />
          </div>
          <StatCell label="Breadth" value="188 / 142" sub="adv / dec" />
        </div>

        {/* Heatmap + Movers */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Heatmap */}
          <div style={{ background: "#fff", border: "1px solid var(--line)" }}>
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <div className="text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--text-secondary)" }}>
                {t("Sector heatmap")}
              </div>
              <span className="text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
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

          {/* Movers */}
          <div style={{ background: "#fff", border: "1px solid var(--line)" }}>
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <div className="text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--text-secondary)" }}>
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
              {moverTabs[tab].slice(0, 6).map((r) => (
                <MoverRow key={r.code} r={r} showVol={tab === "Active"} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
