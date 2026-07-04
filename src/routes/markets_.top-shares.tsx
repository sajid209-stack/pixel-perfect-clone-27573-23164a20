import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/markets_/top-shares")({
  head: () => ({
    meta: [
      { title: "Top Shares | Dhaka Stock Exchange" },
      { name: "description", content: "Top 20 shares by value, volume, trade; top 10 gainers and losers." },
      { property: "og:title", content: "Top Shares — DSE" },
      { property: "og:description", content: "Daily top movers on the Dhaka Stock Exchange." },
    ],
  }),
  component: TopSharesPage,
});

const TS = "Jun 18, 2026 at 2:40 PM";

// SAMPLE — replace at wiring
type T20 = { code: string; ltp: number; high: number; low: number; ycp: number; closep: number; trade: number; valueMn: number; volume: number };

function synth20(code: string, seed: number): T20 {
  const r = (n: number) => { const x = Math.sin(seed * (n + 1)) * 10000; return x - Math.floor(x); };
  const base = 20 + Math.floor(r(1) * 400);
  const ycp = +(base + r(2) * 3).toFixed(1);
  const ltp = +(ycp + (r(3) - 0.5) * ycp * 0.06).toFixed(1);
  const high = +Math.max(ltp, ycp, ltp + r(4) * 2).toFixed(1);
  const low = +Math.min(ltp, ycp, ltp - r(5) * 2).toFixed(1);
  const closep = ltp;
  const trade = 200 + Math.floor(r(6) * 6000);
  const volume = 5000 + Math.floor(r(7) * 5000000);
  const valueMn = +((ltp * volume) / 1_000_000).toFixed(4);
  return { code, ltp, high, low, ycp, closep, trade, valueMn, volume };
}

const CODES = ["SQURPHARMA","GRAMEENPHONE","BEXIMCO","BATBC","LAFSURCEML","OLYMPIC","MARICO","UNITEDPOWER","SUMITPOWER","TITASGAS","PADMAOIL","MEGHNAPET","JAMUNAOIL","POWERGRID","DESCO","DHAKABANK","CITYBANK","PRIMEBANK","EBLTD","BRACBANK","IFIC","PUBALIBANK","SOUTHEASTB","MERCANBANK","ISLAMIBANK","TRUSTBANK","GENEXIL","ROBI","WALTONHIL","BSCCL","KDSALTD","MJLBD","SINGERBD","BERGERPBL","RENATA","IBNSINA","ACI","APOLOISPAT","GQBALLPEN","ZEALBANGLA"];

const BY_VALUE: T20[] = [
  { code: "BXPHARMA", ltp: 141.7, high: 143, low: 131.5, ycp: 134.7, closep: 141.7, trade: 5940, valueMn: 609.768, volume: 4360277 },
  ...CODES.slice(0, 19).map((c, i) => synth20(c, i + 1)),
];
const BY_VOLUME: T20[] = [
  { code: "NCCBANK", ltp: 16.2, high: 16.8, low: 16.1, ycp: 16.6, closep: 16.2, trade: 2889, valueMn: 342.488, volume: 20861891 },
  ...CODES.slice(5, 24).map((c, i) => synth20(c, i + 30)),
];
const BY_TRADE: T20[] = [
  { code: "SAPORTL", ltp: 57.4, high: 60.5, low: 56.7, ycp: 60.5, closep: 57.4, trade: 6418, valueMn: 533.926, volume: 9112910 },
  ...CODES.slice(10, 29).map((c, i) => synth20(c, i + 60)),
];

type GainCP = { code: string; closep: number; high: number; low: number; ycp: number; pct: number };
type GainOL = { code: string; open: number; high: number; low: number; ltp: number; dev: number };

// SAMPLE
const GAINERS_CP: GainCP[] = [
  { code: "1JANATAMF", closep: 3.3, high: 3.3, low: 3.0, ycp: 3.0, pct: 10 },
  ...CODES.slice(0, 9).map((c, i) => ({ code: c, closep: +(50 + i).toFixed(1), high: +(52 + i).toFixed(1), low: +(48 + i).toFixed(1), ycp: +(46 + i).toFixed(1), pct: +(9.5 - i * 0.4).toFixed(4) })),
];
const GAINERS_OL: GainOL[] = [
  { code: "DOMINAGE", open: 74.0, high: 80.8, low: 74.0, ltp: 80.5, dev: 8.7838 },
  ...CODES.slice(3, 12).map((c, i) => ({ code: c, open: +(60 + i).toFixed(1), high: +(65 + i).toFixed(1), low: +(59 + i).toFixed(1), ltp: +(64 + i).toFixed(1), dev: +(8.5 - i * 0.5).toFixed(4) })),
];
const LOSERS_CP: GainCP[] = [
  { code: "SHYAMPSUG", closep: 167.9, high: 184.4, low: 167.8, ycp: 186.4, pct: -9.9249 },
  ...CODES.slice(6, 15).map((c, i) => ({ code: c, closep: +(100 - i).toFixed(1), high: +(110 - i).toFixed(1), low: +(99 - i).toFixed(1), ycp: +(112 - i).toFixed(1), pct: +(-9.7 + i * 0.4).toFixed(4) })),
];
const LOSERS_OL: GainOL[] = [
  { code: "SAFKOSPINN", open: 20.7, high: 20.7, low: 18.7, ltp: 18.9, dev: -8.6957 },
  ...CODES.slice(9, 18).map((c, i) => ({ code: c, open: +(30 + i).toFixed(1), high: +(30 + i).toFixed(1), low: +(27 + i).toFixed(1), ltp: +(28 + i).toFixed(1), dev: +(-8.4 + i * 0.5).toFixed(4) })),
];

type TabKey = "top20" | "gainers" | "losers";
const TABS: { key: TabKey; label: string }[] = [
  { key: "top20", label: "Top 20 Shares" },
  { key: "gainers", label: "Top 10 Gainers" },
  { key: "losers", label: "Top 10 Losers" },
];

function fmt(n: number, d = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : d,
    maximumFractionDigits: d,
  });
}

function TradingCode({ code }: { code: string }) {
  return (
    <Link to="/company/$ticker" params={{ ticker: code }} className="font-semibold hover:underline" style={{ color: "var(--brand-600)" }}>
      {code}
    </Link>
  );
}

const monoCell: React.CSSProperties = { fontFamily: "var(--font-mono)" };

function moveColor(v: number) {
  return v > 0 ? "var(--pos, #128a3d)" : v < 0 ? "var(--neg, #c8321f)" : "var(--ink)";
}

function TableShell({ title, headers, children }: { title: string; headers: string[]; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-[15px] md:text-[16px] font-semibold mb-3" style={{ color: "var(--ink)" }}>
        {title}
      </h2>
      <div className="overflow-x-auto" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
        <table className="w-full text-[13px]" style={{ minWidth: 820 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
              {headers.map((h, i) => (
                <th key={h}
                  className={`px-3 py-2 text-[11px] font-semibold uppercase ${i <= 1 ? "text-left" : "text-right"}`}
                  style={{ letterSpacing: "0.1em", color: "var(--text-secondary)", fontFamily: i >= 2 ? "var(--font-mono)" : undefined, whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function Row20({ r, i }: { r: T20; i: number }) {
  return (
    <tr style={{ borderTop: "1px solid var(--line)", background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent" }}>
      <td className="px-3 py-2 tnum text-right" style={{ ...monoCell, color: "var(--text-secondary)" }}>{i + 1}</td>
      <td className="px-3 py-2"><TradingCode code={r.code} /></td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.ltp, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.high, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.low, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.ycp, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.closep, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.trade)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.valueMn, 4)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.volume)}</td>
    </tr>
  );
}

function RowCP({ r, i }: { r: GainCP; i: number }) {
  return (
    <tr style={{ borderTop: "1px solid var(--line)", background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent" }}>
      <td className="px-3 py-2 tnum text-right" style={{ ...monoCell, color: "var(--text-secondary)" }}>{i + 1}</td>
      <td className="px-3 py-2"><TradingCode code={r.code} /></td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.closep, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.high, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.low, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.ycp, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={{ ...monoCell, color: moveColor(r.pct) }}>
        {r.pct > 0 ? "+" : ""}{fmt(r.pct, 4)}
      </td>
    </tr>
  );
}

function RowOL({ r, i }: { r: GainOL; i: number }) {
  return (
    <tr style={{ borderTop: "1px solid var(--line)", background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent" }}>
      <td className="px-3 py-2 tnum text-right" style={{ ...monoCell, color: "var(--text-secondary)" }}>{i + 1}</td>
      <td className="px-3 py-2"><TradingCode code={r.code} /></td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.open, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.high, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.low, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={monoCell}>{fmt(r.ltp, 1)}</td>
      <td className="px-3 py-2 tnum text-right" style={{ ...monoCell, color: moveColor(r.dev) }}>
        {r.dev > 0 ? "+" : ""}{fmt(r.dev, 4)}
      </td>
    </tr>
  );
}

const H20 = ["#", "TRADING CODE", "LTP*", "HIGH", "LOW", "YCP*", "CLOSEP*", "TRADE", "VALUE (mn)", "VOLUME"];
const HCP = ["#", "TRADING CODE", "CLOSEP*", "HIGH", "LOW", "YCP*", "% CHANGE"];
const HOL = ["#", "TRADING CODE", "OPEN*", "HIGH", "LOW", "LTP*", "DEVIATION %"];

function TopSharesPage() {
  const [tab, setTab] = useState<TabKey>("top20");

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
          <div className="text-[11px] font-semibold uppercase mb-2" style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}>
            Dhaka Stock Exchange
          </div>
          <h1 className="text-[26px] md:text-[32px] font-semibold tracking-tight leading-[1.1]" style={{ color: "var(--ink)" }}>
            Top Shares
          </h1>
          <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            On {TS}
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div role="tablist" aria-label="Top shares view" className="flex flex-wrap gap-1 mb-6" style={{ borderBottom: "1px solid var(--line)" }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className="text-[13px] px-4 py-2 uppercase tracking-wider font-semibold"
              style={{
                borderBottom: tab === t.key ? "2px solid var(--brand-600)" : "2px solid transparent",
                color: tab === t.key ? "var(--brand-600)" : "var(--text-secondary)",
                background: "transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "top20" && (
          <>
            <TableShell title={`Top Twenty Shares by Value On ${TS}`} headers={H20}>
              {BY_VALUE.slice(0, 20).map((r, i) => <Row20 key={"v" + r.code + i} r={r} i={i} />)}
            </TableShell>
            <TableShell title={`Top Twenty Shares by Volume On ${TS}`} headers={H20}>
              {BY_VOLUME.slice(0, 20).map((r, i) => <Row20 key={"o" + r.code + i} r={r} i={i} />)}
            </TableShell>
            <TableShell title={`Top Twenty Shares by Trade On ${TS}`} headers={H20}>
              {BY_TRADE.slice(0, 20).map((r, i) => <Row20 key={"t" + r.code + i} r={r} i={i} />)}
            </TableShell>
            <div className="mt-2 text-[11.5px] leading-6" style={{ color: "var(--text-secondary)" }}>
              <div>LTP* - Last Traded Price</div>
              <div>CLOSEP* - Closing Price</div>
              <div>YCP* - Yesterday's Closing Price</div>
              <div>Top Twenty calculated based on the shares, traded only in Normal Market</div>
            </div>
          </>
        )}

        {tab === "gainers" && (
          <>
            <TableShell title={`Top Ten Gainer Considering Close Price & YCP on ${TS}`} headers={HCP}>
              {GAINERS_CP.slice(0, 10).map((r, i) => <RowCP key={"gcp" + r.code + i} r={r} i={i} />)}
            </TableShell>
            <TableShell title={`Top Ten Gainer Considering Open Price and LTP on ${TS}`} headers={HOL}>
              {GAINERS_OL.slice(0, 10).map((r, i) => <RowOL key={"gol" + r.code + i} r={r} i={i} />)}
            </TableShell>
            <div className="mt-2 text-[11.5px] leading-6" style={{ color: "var(--text-secondary)" }}>
              <div>LTP* - Last Traded Price</div>
              <div>OPEN* - Opening Price</div>
              <div>YCP* - Yesterday's Closing Price</div>
            </div>
          </>
        )}

        {tab === "losers" && (
          <>
            <TableShell title={`Top Ten Loser Considering Close Price and YCP on ${TS}`} headers={HCP}>
              {LOSERS_CP.slice(0, 10).map((r, i) => <RowCP key={"lcp" + r.code + i} r={r} i={i} />)}
            </TableShell>
            <TableShell title={`Top Ten Loser Considering Open Price & LTP on ${TS}`} headers={HOL}>
              {LOSERS_OL.slice(0, 10).map((r, i) => <RowOL key={"lol" + r.code + i} r={r} i={i} />)}
            </TableShell>
            <div className="mt-2 text-[11.5px] leading-6" style={{ color: "var(--text-secondary)" }}>
              <div>LTP* - Last Traded Price</div>
              <div>OPEN* - Opening Price</div>
              <div>YCP* - Yesterday's Closing Price</div>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
