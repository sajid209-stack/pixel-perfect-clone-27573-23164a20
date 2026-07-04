import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

// Same 22-sector taxonomy as /companies/sectors
const SECTORS: { name: string; slug: string }[] = [
  { name: "Bank", slug: "bank" },
  { name: "Financial Institutions", slug: "financial-institutions" },
  { name: "Insurance", slug: "insurance" },
  { name: "Mutual Funds", slug: "mutual-funds" },
  { name: "Food & Allied", slug: "food-allied" },
  { name: "Pharmaceuticals & Chemicals", slug: "pharmaceuticals-chemicals" },
  { name: "Textile", slug: "textile" },
  { name: "Engineering", slug: "engineering" },
  { name: "Ceramics Sector", slug: "ceramics" },
  { name: "Tannery Industries", slug: "tannery" },
  { name: "Paper & Printing", slug: "paper-printing" },
  { name: "Jute", slug: "jute" },
  { name: "Cement", slug: "cement" },
  { name: "Fuel & Power", slug: "fuel-power" },
  { name: "Services & Real Estate", slug: "services-real-estate" },
  { name: "IT Sector", slug: "it" },
  { name: "Telecommunication", slug: "telecommunication" },
  { name: "Travel & Leisure", slug: "travel-leisure" },
  { name: "Miscellaneous", slug: "miscellaneous" },
  { name: "Bond", slug: "bond" },
  { name: "Corporate Bond", slug: "corporate-bond" },
  { name: "Debenture", slug: "debenture" },
];
const SECTOR_SLUGS = SECTORS.map((s) => s.slug) as [string, ...string[]];

const searchSchema = z.object({
  sector: fallback(z.enum(SECTOR_SLUGS).optional(), undefined),
});

export const Route = createFileRoute("/markets_/latest-share-price")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Latest Share Price | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Consolidated latest share price board for all instruments traded on the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "Latest Share Price — DSE" },
      {
        property: "og:description",
        content: "Live board of latest traded prices across all DSE instruments.",
      },
    ],
  }),
  component: LatestSharePricePage,
});

type Row = {
  code: string;
  category: "A" | "B" | "G" | "N" | "Z";
  ltp: number;
  high: number;
  low: number;
  closep: number;
  ycp: number;
  trade: number;
  valueMn: number;
  volume: number;
};

// SAMPLE — replace at wiring
const SEED: Row[] = [
  { code: "RECKITTBEN", category: "A", ltp: 3300, high: 3349.6, low: 3300, closep: 3309.4, ycp: 3324.6, trade: 153, valueMn: 2.195, volume: 663 },
  { code: "BXPHARMA", category: "A", ltp: 141.7, high: 143, low: 131.5, closep: 141.7, ycp: 134.7, trade: 5940, valueMn: 609.768, volume: 4360277 },
  { code: "NCCBANK", category: "A", ltp: 16.2, high: 16.8, low: 16.1, closep: 16.2, ycp: 16.6, trade: 2889, valueMn: 342.488, volume: 20861891 },
  { code: "1JANATAMF", category: "A", ltp: 3.3, high: 3.3, low: 3, closep: 3.3, ycp: 3, trade: 449, valueMn: 10.82, volume: 3407226 },
  { code: "AAMRANET", category: "A", ltp: 19.3, high: 19.4, low: 19, closep: 19.3, ycp: 18.9, trade: 364, valueMn: 7.716, volume: 403471 },
];

// SAMPLE — synthetic filler rows so the board demos at ~40 rows.
const FILLER_CODES: { code: string; category: Row["category"] }[] = [
  { code: "SQURPHARMA", category: "A" }, { code: "GRAMEENPHONE", category: "A" },
  { code: "BEXIMCO", category: "B" }, { code: "BATBC", category: "A" },
  { code: "LAFSURCEML", category: "A" }, { code: "OLYMPIC", category: "A" },
  { code: "MARICO", category: "A" }, { code: "UNITEDPOWER", category: "A" },
  { code: "SUMITPOWER", category: "A" }, { code: "TITASGAS", category: "A" },
  { code: "PADMAOIL", category: "A" }, { code: "MEGHNAPET", category: "A" },
  { code: "JAMUNAOIL", category: "A" }, { code: "POWERGRID", category: "A" },
  { code: "DESCO", category: "A" }, { code: "DHAKABANK", category: "A" },
  { code: "CITYBANK", category: "A" }, { code: "PRIMEBANK", category: "A" },
  { code: "EBLTD", category: "A" }, { code: "BRACBANK", category: "A" },
  { code: "IFIC", category: "B" }, { code: "PUBALIBANK", category: "A" },
  { code: "SOUTHEASTB", category: "A" }, { code: "MERCANBANK", category: "A" },
  { code: "ISLAMIBANK", category: "A" }, { code: "TRUSTBANK", category: "A" },
  { code: "GENEXIL", category: "N" }, { code: "ROBI", category: "N" },
  { code: "WALTONHIL", category: "A" }, { code: "BSCCL", category: "A" },
  { code: "KDSALTD", category: "A" }, { code: "MJLBD", category: "A" },
  { code: "SINGERBD", category: "A" }, { code: "BERGERPBL", category: "A" },
  { code: "RENATA", category: "A" }, { code: "IBNSINA", category: "A" },
  { code: "ACI", category: "A" }, { code: "APOLOISPAT", category: "Z" },
  { code: "GQBALLPEN", category: "G" }, { code: "ZEALBANGLA", category: "Z" },
];

function synth(code: string, category: Row["category"], seed: number): Row {
  const rand = (n: number) => {
    const x = Math.sin(seed * (n + 1)) * 10000;
    return x - Math.floor(x);
  };
  const base = 15 + Math.floor(rand(1) * 480);
  const ycp = +(base + rand(2) * 4 - 2).toFixed(1);
  const ltp = +(ycp + (rand(3) - 0.5) * (ycp * 0.06)).toFixed(1);
  const high = +Math.max(ltp, ycp, ltp + rand(4) * 2).toFixed(1);
  const low = +Math.min(ltp, ycp, ltp - rand(5) * 2).toFixed(1);
  const closep = ltp;
  const trade = 50 + Math.floor(rand(6) * 6000);
  const volume = 1000 + Math.floor(rand(7) * 5000000);
  const valueMn = +((ltp * volume) / 1_000_000).toFixed(3);
  return { code, category, ltp, high, low, closep, ycp, trade, valueMn, volume };
}

const ROWS: Row[] = [
  ...SEED,
  ...FILLER_CODES.map((f, i) => synth(f.code, f.category, i + 7)),
];

type SortKey = "code" | "ltp" | "pct" | "value" | "volume" | "trade";
type ViewMode = "all" | "category" | "alphabet" | "sector";

// SAMPLE — sector mapping per instrument (populate from taxonomy at wiring)
const SECTOR_BY_CODE: Record<string, string> = {
  RECKITTBEN: "miscellaneous", BXPHARMA: "pharmaceuticals-chemicals",
  NCCBANK: "bank", "1JANATAMF": "mutual-funds", AAMRANET: "it",
  SQURPHARMA: "pharmaceuticals-chemicals", GRAMEENPHONE: "telecommunication",
  BEXIMCO: "miscellaneous", BATBC: "food-allied", LAFSURCEML: "cement",
  OLYMPIC: "food-allied", MARICO: "pharmaceuticals-chemicals",
  UNITEDPOWER: "fuel-power", SUMITPOWER: "fuel-power", TITASGAS: "fuel-power",
  PADMAOIL: "fuel-power", MEGHNAPET: "fuel-power", JAMUNAOIL: "fuel-power",
  POWERGRID: "fuel-power", DESCO: "fuel-power",
  DHAKABANK: "bank", CITYBANK: "bank", PRIMEBANK: "bank", EBLTD: "bank",
  BRACBANK: "bank", IFIC: "bank", PUBALIBANK: "bank", SOUTHEASTB: "bank",
  MERCANBANK: "bank", ISLAMIBANK: "bank", TRUSTBANK: "bank",
  GENEXIL: "it", ROBI: "telecommunication", WALTONHIL: "engineering",
  BSCCL: "telecommunication", KDSALTD: "miscellaneous", MJLBD: "fuel-power",
  SINGERBD: "engineering", BERGERPBL: "miscellaneous",
  RENATA: "pharmaceuticals-chemicals", IBNSINA: "pharmaceuticals-chemicals",
  ACI: "pharmaceuticals-chemicals", APOLOISPAT: "engineering",
  GQBALLPEN: "miscellaneous", ZEALBANGLA: "food-allied",
};
const sectorOf = (code: string) => SECTOR_BY_CODE[code] ?? "miscellaneous";
const sectorName = (slug: string) => SECTORS.find((s) => s.slug === slug)?.name ?? slug;
const CATS = ["A", "B", "G", "N", "Z"] as const;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE = 40;

function fmt(n: number, digits = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : digits,
    maximumFractionDigits: digits,
  });
}

function LatestSharePricePage() {
  const [sort, setSort] = useState<SortKey>("code");
  const [view, setView] = useState<ViewMode>("all");
  const [cat, setCat] = useState<(typeof CATS)[number]>("A");
  const [letter, setLetter] = useState<string>("A");
  const [limit, setLimit] = useState<number>(PAGE);

  const filtered = useMemo(() => {
    let rows = ROWS.slice();
    if (view === "category") rows = rows.filter((r) => r.category === cat);
    if (view === "alphabet") rows = rows.filter((r) => r.code.startsWith(letter));
    const change = (r: Row) => r.ltp - r.ycp;
    const pct = (r: Row) => (r.ycp ? (change(r) * 100) / r.ycp : 0);
    rows.sort((a, b) => {
      switch (sort) {
        case "ltp": return b.ltp - a.ltp;
        case "pct": return pct(b) - pct(a);
        case "value": return b.valueMn - a.valueMn;
        case "volume": return b.volume - a.volume;
        case "trade": return b.trade - a.trade;
        default: return a.code.localeCompare(b.code);
      }
    });
    return rows;
  }, [sort, view, cat, letter]);

  const shown = view === "all" ? filtered.slice(0, limit) : filtered;

  const HEADERS = ["#", "TRADING CODE", "LTP*", "HIGH", "LOW", "CLOSEP*", "YCP*", "CHANGE", "TRADE", "VALUE (mn)", "VOLUME"];

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}
          >
            Dhaka Stock Exchange
          </div>
          <h1
            className="text-[26px] md:text-[32px] font-semibold tracking-tight leading-[1.1]"
            style={{ color: "var(--ink)" }}
          >
            Latest Share Price
          </h1>
          <p
            className="mt-2 text-[13px]"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
          >
            On Jun 18, 2026 at 2:40 PM
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <label className="flex items-center gap-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>
            <span className="uppercase tracking-wider font-semibold">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-[13px] px-2 py-1"
              style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
            >
              <option value="code">By Trade Code</option>
              <option value="ltp">By Last Trade Price</option>
              <option value="pct">By % Change</option>
              <option value="value">By Value</option>
              <option value="volume">By Volume</option>
              <option value="trade">By Trade</option>
            </select>
          </label>

          <div className="flex items-center gap-1" role="tablist" aria-label="View">
            {(["all", "category", "alphabet"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setView(m); setLimit(PAGE); }}
                className="text-[12px] px-3 py-1 uppercase tracking-wider font-semibold"
                style={{
                  border: "1px solid var(--line)",
                  background: view === m ? "var(--brand-600)" : "var(--surface)",
                  color: view === m ? "#fff" : "var(--ink)",
                }}
              >
                {m === "all" ? "All" : m === "category" ? "By Category" : "By Alphabet"}
              </button>
            ))}
          </div>
        </div>

        {view === "category" && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1 mb-2">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="text-[12px] px-3 py-1 font-mono"
                  style={{
                    border: "1px solid var(--line)",
                    background: cat === c ? "var(--brand-600)" : "var(--surface)",
                    color: cat === c ? "#fff" : "var(--ink)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
              ( Category - {cat} )
            </div>
          </div>
        )}

        {view === "alphabet" && (
          <div className="mb-3 flex flex-wrap gap-1">
            {LETTERS.map((l) => (
              <button
                key={l}
                onClick={() => setLetter(l)}
                className="text-[12px] w-7 h-7"
                style={{
                  border: "1px solid var(--line)",
                  background: letter === l ? "var(--brand-600)" : "var(--surface)",
                  color: letter === l ? "#fff" : "var(--ink)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        {/* Table */}
        <div
          className="overflow-x-auto"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          <table className="w-full text-[13px]" style={{ minWidth: 960 }}>
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
                {HEADERS.map((h, i) => (
                  <th
                    key={h}
                    className={`px-3 py-2 text-[11px] font-semibold uppercase ${i <= 1 ? "text-left" : "text-right"}`}
                    style={{
                      letterSpacing: "0.1em",
                      color: "var(--text-secondary)",
                      fontFamily: i >= 2 ? "var(--font-mono)" : undefined,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.length === 0 && (
                <tr>
                  <td colSpan={HEADERS.length} className="px-3 py-6 text-center text-[13px]"
                    style={{ color: "var(--text-secondary)" }}>
                    No instruments match the current filter.
                  </td>
                </tr>
              )}
              {shown.map((r, i) => {
                const change = +(r.ltp - r.ycp).toFixed(2);
                const dir = change > 0 ? "up" : change < 0 ? "down" : "flat";
                const changeColor =
                  dir === "up" ? "var(--pos, #128a3d)"
                  : dir === "down" ? "var(--neg, #c8321f)"
                  : "var(--ink)";
                return (
                  <tr
                    key={r.code}
                    style={{
                      borderTop: "1px solid var(--line)",
                      background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                    }}
                  >
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{i + 1}</td>
                    <td className="px-3 py-2">
                      <Link
                        to="/company/$ticker"
                        params={{ ticker: r.code }}
                        className="font-semibold hover:underline"
                        style={{ color: "var(--brand-600)" }}
                      >
                        {r.code}
                      </Link>
                    </td>
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{fmt(r.ltp, 1)}</td>
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{fmt(r.high, 1)}</td>
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{fmt(r.low, 1)}</td>
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{fmt(r.closep, 1)}</td>
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{fmt(r.ycp, 1)}</td>
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)", color: changeColor }}>
                      {change > 0 ? "+" : ""}{fmt(change, 1)}
                    </td>
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{fmt(r.trade)}</td>
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{fmt(r.valueMn, 3)}</td>
                    <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{fmt(r.volume)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {view === "all" && limit < filtered.length && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setLimit((n) => n + PAGE)}
              className="text-[12px] px-4 py-2 uppercase tracking-wider font-semibold"
              style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
            >
              Load more
            </button>
          </div>
        )}

        <div className="mt-5 text-[11.5px] leading-6" style={{ color: "var(--text-secondary)" }}>
          <div>LTP* - Last Traded Price</div>
          <div>CLOSEP* - Closing Price</div>
          <div>YCP* - Yesterday's Closing Price</div>
          <div style={{ fontFamily: "var(--font-mono)" }}>%CHANGE = ((LTP* - YCP)*100/YCP)</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
