import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/pe")({
  head: () => ({
    meta: [
      { title: "P/E at a glance | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Market, category and sector price-to-earnings ratios for DSE-listed securities.",
      },
      { property: "og:title", content: "P/E at a glance | DSE" },
      {
        property: "og:description",
        content: "Market, category and sector P/E ratios on the DSE.",
      },
    ],
  }),
  component: PePage,
});

type Cat = "A" | "B" | "N" | "Z";
type Row = {
  code: string;
  name: string;
  sector: string;
  category: Cat;
  price: number;
  eps: number; // trailing
};

const COMPANIES: Row[] = [
  { code: "GRAMEENS", name: "Grameenphone", sector: "Telecom", category: "A", price: 312.4, eps: 27.1 },
  { code: "ROBI", name: "Robi Axiata", sector: "Telecom", category: "A", price: 31.2, eps: 1.4 },
  { code: "SQPHARMA", name: "Square Pharmaceuticals", sector: "Pharmaceuticals", category: "A", price: 215.5, eps: 19.8 },
  { code: "RENATA", name: "Renata Limited", sector: "Pharmaceuticals", category: "A", price: 1185.0, eps: 52.4 },
  { code: "ACMELAB", name: "ACME Laboratories", sector: "Pharmaceuticals", category: "A", price: 72.3, eps: 6.1 },
  { code: "BEXIMCO", name: "Beximco Limited", sector: "Conglomerate", category: "B", price: 102.0, eps: 4.2 },
  { code: "WALTONHIL", name: "Walton Hi-Tech", sector: "Engineering", category: "A", price: 980.5, eps: 41.2 },
  { code: "BATBC", name: "British American Tobacco BD", sector: "Food & Allied", category: "A", price: 525.8, eps: 28.9 },
  { code: "OLYMPIC", name: "Olympic Industries", sector: "Food & Allied", category: "A", price: 158.6, eps: 11.7 },
  { code: "MARICO", name: "Marico Bangladesh", sector: "Food & Allied", category: "A", price: 2310.0, eps: 102.4 },
  { code: "BRACBANK", name: "BRAC Bank PLC", sector: "Bank", category: "A", price: 41.5, eps: 4.1 },
  { code: "CITYBANK", name: "The City Bank PLC", sector: "Bank", category: "A", price: 22.4, eps: 2.6 },
  { code: "DUTCHBANGL", name: "Dutch-Bangla Bank", sector: "Bank", category: "A", price: 65.2, eps: 8.3 },
  { code: "LHBL", name: "LafargeHolcim BD", sector: "Cement", category: "A", price: 68.4, eps: 4.9 },
  { code: "BERGERPBL", name: "Berger Paints", sector: "Miscellaneous", category: "A", price: 1640.0, eps: 88.0 },
  { code: "SUMITPOWER", name: "Summit Power", sector: "Fuel & Power", category: "A", price: 32.1, eps: 3.5 },
  { code: "TITASGAS", name: "Titas Gas", sector: "Fuel & Power", category: "A", price: 28.6, eps: 4.4 },
  { code: "IFIC", name: "IFIC Bank", sector: "Bank", category: "B", price: 11.2, eps: 0.9 },
];

const SECTORS = ["All", ...Array.from(new Set(COMPANIES.map((c) => c.sector)))];
const CATS: ("All" | Cat)[] = ["All", "A", "B", "N", "Z"];

const peOf = (r: Row) => (r.eps > 0 ? r.price / r.eps : null);
const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

function PePage() {
  const { t } = useLang();
  const [sector, setSector] = useState<string>("All");
  const [cat, setCat] = useState<"All" | Cat>("All");
  const [sortCo, setSortCo] = useState<{ k: "code" | "price" | "eps" | "pe" | "category"; dir: "asc" | "desc" }>({ k: "pe", dir: "asc" });
  const [sortSec, setSortSec] = useState<{ k: "sector" | "pe" | "count"; dir: "asc" | "desc" }>({ k: "pe", dir: "asc" });

  const filtered = useMemo(
    () =>
      COMPANIES.filter(
        (c) => (sector === "All" || c.sector === sector) && (cat === "All" || c.category === cat),
      ),
    [sector, cat],
  );

  const marketPe = useMemo(() => {
    const xs = COMPANIES.map(peOf).filter((x): x is number => x !== null);
    return avg(xs);
  }, []);

  const categoryAvgs = useMemo(() => {
    const cats: Cat[] = ["A", "B", "N", "Z"];
    return cats.map((cc) => {
      const xs = COMPANIES.filter((c) => c.category === cc).map(peOf).filter((x): x is number => x !== null);
      return { cat: cc, pe: xs.length ? avg(xs) : null, count: COMPANIES.filter((c) => c.category === cc).length };
    });
  }, []);

  const sectorRows = useMemo(() => {
    const map = new Map<string, Row[]>();
    filtered.forEach((r) => {
      const arr = map.get(r.sector) ?? [];
      arr.push(r);
      map.set(r.sector, arr);
    });
    const rows = Array.from(map.entries()).map(([s, arr]) => {
      const xs = arr.map(peOf).filter((x): x is number => x !== null);
      return { sector: s, pe: xs.length ? avg(xs) : 0, count: arr.length };
    });
    rows.sort((a, b) => {
      const va = a[sortSec.k] as number | string;
      const vb = b[sortSec.k] as number | string;
      return sortSec.dir === "asc" ? (va < vb ? -1 : 1) : va < vb ? 1 : -1;
    });
    return rows;
  }, [filtered, sortSec]);

  const coRows = useMemo(() => {
    const rows = filtered.map((r) => ({ ...r, pe: peOf(r) }));
    rows.sort((a, b) => {
      let va: number | string = "";
      let vb: number | string = "";
      switch (sortCo.k) {
        case "code": va = a.code; vb = b.code; break;
        case "price": va = a.price; vb = b.price; break;
        case "eps": va = a.eps; vb = b.eps; break;
        case "pe": va = a.pe ?? Number.POSITIVE_INFINITY; vb = b.pe ?? Number.POSITIVE_INFINITY; break;
        case "category": va = a.category; vb = b.category; break;
      }
      return sortCo.dir === "asc" ? (va < vb ? -1 : 1) : va < vb ? 1 : -1;
    });
    return rows;
  }, [filtered, sortCo]);

  const toggleCo = (k: typeof sortCo.k) =>
    setSortCo((s) => (s.k === k ? { k, dir: s.dir === "asc" ? "desc" : "asc" } : { k, dir: "asc" }));
  const toggleSec = (k: typeof sortSec.k) =>
    setSortSec((s) => (s.k === k ? { k, dir: s.dir === "asc" ? "desc" : "asc" } : { k, dir: "asc" }));

  const fmt = (n: number | null, d = 2) => (n == null ? "—" : n.toFixed(d));

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      {/* Header */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}
          >
            {t("Dhaka Stock Exchange")}
          </div>
          <h1
            className="text-[28px] md:text-[34px] font-semibold tracking-tight leading-[1.1]"
            style={{ color: "var(--ink)" }}
          >
            {t("P/E at a glance")}
          </h1>
          <p
            className="mt-2 text-[13.5px] max-w-3xl"
            style={{ color: "var(--text-secondary)" }}
            data-cms="pe.intro"
          >
            {t(
              "The price-to-earnings (P/E) ratio is the last trading price divided by trailing earnings per share (EPS). Lower P/E may indicate value; very high or negative earnings can distort the ratio.",
            )}
          </p>
          <div className="mt-3 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
            {t("Data as provided by DSE")} · {t("updated")} {new Date().toLocaleString()}
          </div>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-secondary)" }}>
            {t("Sample data for demonstration — live data will connect to the DSE API")}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="p-3" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
            <div className="text-[10.5px] uppercase font-semibold" style={{ letterSpacing: "0.1em", color: "var(--text-muted)" }}>
              {t("Market P/E")}
            </div>
            <div className="mt-1 text-[20px] font-semibold tnum">{fmt(marketPe)}</div>
            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              {COMPANIES.length} {t("companies")}
            </div>
          </div>
          {categoryAvgs.map((c) => (
            <div key={c.cat} className="p-3" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
              <div className="text-[10.5px] uppercase font-semibold" style={{ letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                {t("Category")} {c.cat}
              </div>
              <div className="mt-1 text-[20px] font-semibold tnum">{fmt(c.pe)}</div>
              <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                {c.count} {t("companies")}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{t("Sector")}</label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="h-8 px-2 text-[13px] outline-none"
            style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
          >
            {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <label className="ml-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>{t("Category")}</label>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as "All" | Cat)}
            className="h-8 px-2 text-[13px] outline-none"
            style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
          >
            {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Sector table */}
        <div>
          <h2 className="text-[16px] font-semibold mb-2">{t("Sector P/E")}</h2>
          <div className="overflow-x-auto" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
            <table className="w-full text-[13px]" style={{ minWidth: 520 }}>
              <thead>
                <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
                  {([
                    { k: "sector", h: t("Sector"), a: "left" },
                    { k: "pe", h: t("Avg P/E"), a: "right" },
                    { k: "count", h: t("Companies"), a: "right" },
                  ] as const).map((c) => (
                    <th
                      key={c.k}
                      onClick={() => toggleSec(c.k)}
                      className="px-3 py-2 text-[11px] font-semibold uppercase cursor-pointer select-none"
                      style={{ textAlign: c.a, letterSpacing: "0.1em", color: "var(--text-secondary)" }}
                    >
                      {c.h} {sortSec.k === c.k ? (sortSec.dir === "asc" ? "↑" : "↓") : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sectorRows.map((r, i) => (
                  <tr
                    key={r.sector}
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid var(--line)",
                      background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                    }}
                  >
                    <td className="px-3 py-2">{r.sector}</td>
                    <td className="px-3 py-2 tnum text-right">{fmt(r.pe)}</td>
                    <td className="px-3 py-2 tnum text-right" style={{ color: "var(--text-secondary)" }}>{r.count}</td>
                  </tr>
                ))}
                {sectorRows.length === 0 && (
                  <tr><td colSpan={3} className="px-3 py-6 text-center text-[12.5px]" style={{ color: "var(--text-muted)" }}>{t("No sectors match your filters.")}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Companies table */}
        <div>
          <h2 className="text-[16px] font-semibold mb-2">{t("Companies")}</h2>
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
            <table className="w-full text-[13px]" style={{ minWidth: 720 }}>
              <thead>
                <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
                  {([
                    { k: "code", h: t("Company"), a: "left" },
                    { k: "price", h: t("Last price"), a: "right" },
                    { k: "eps", h: t("EPS"), a: "right" },
                    { k: "pe", h: t("P/E"), a: "right" },
                    { k: "category", h: t("Category"), a: "right" },
                  ] as const).map((c) => (
                    <th
                      key={c.k}
                      onClick={() => toggleCo(c.k)}
                      className="px-3 py-2 text-[11px] font-semibold uppercase cursor-pointer select-none"
                      style={{ textAlign: c.a, letterSpacing: "0.1em", color: "var(--text-secondary)" }}
                    >
                      {c.h} {sortCo.k === c.k ? (sortCo.dir === "asc" ? "↑" : "↓") : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coRows.map((r, i) => (
                  <tr
                    key={r.code}
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid var(--line)",
                      background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                    }}
                  >
                    <td className="px-3 py-2">
                      <Link to="/company/$ticker" params={{ ticker: r.code }} className="hover:underline" style={{ color: "var(--brand-600)" }}>
                        <span className="font-bold tracking-wide">{r.code}</span>
                        <span className="ml-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>{r.name}</span>
                      </Link>
                    </td>
                    <td className="px-3 py-2 tnum text-right">{r.price.toFixed(2)}</td>
                    <td className="px-3 py-2 tnum text-right" style={{ color: "var(--text-secondary)" }}>{r.eps.toFixed(2)}</td>
                    <td className="px-3 py-2 tnum text-right font-semibold">{fmt(r.pe)}</td>
                    <td className="px-3 py-2 text-right">
                      <span className="px-1.5 py-0.5 text-[11px] font-semibold" style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}>
                        {r.category}
                      </span>
                    </td>
                  </tr>
                ))}
                {coRows.length === 0 && (
                  <tr><td colSpan={5} className="px-3 py-6 text-center text-[12.5px]" style={{ color: "var(--text-muted)" }}>{t("No companies match your filters.")}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {coRows.map((r) => (
              <div key={r.code} style={{ border: "1px solid var(--line)", background: "var(--surface)" }} className="p-3">
                <div className="flex justify-between items-start gap-2">
                  <Link to="/company/$ticker" params={{ ticker: r.code }} className="hover:underline" style={{ color: "var(--brand-600)" }}>
                    <div className="font-bold tracking-wide text-[13px]">{r.code}</div>
                    <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{r.name}</div>
                  </Link>
                  <span className="px-1.5 py-0.5 text-[10.5px] font-semibold shrink-0" style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}>
                    {r.category}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[12px]">
                  <div>
                    <div style={{ color: "var(--text-muted)" }}>{t("Last price")}</div>
                    <div className="tnum">{r.price.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)" }}>{t("EPS")}</div>
                    <div className="tnum">{r.eps.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)" }}>{t("P/E")}</div>
                    <div className="tnum font-semibold">{fmt(r.pe)}</div>
                  </div>
                </div>
              </div>
            ))}
            {coRows.length === 0 && (
              <div className="p-6 text-center text-[12.5px]" style={{ color: "var(--text-muted)", border: "1px solid var(--line)" }}>
                {t("No companies match your filters.")}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
