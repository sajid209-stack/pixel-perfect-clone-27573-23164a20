import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, Search, FileText, Download } from "lucide-react";

const GSEC_DOCS = [
  { title: "G-Sec Primary Auction Process — BGTB Directive June 2023", file: "BGTB_G-Sec Primary Auction Process_Directive_22.06.2023.pdf", category: "Directive" },
  { title: "Primary Dealer Bank List — BGTB", file: "Primary Dealer Bank List_BGTB_G-sec_BB.pdf", category: "Reference" },
];

function GSecDocsSection() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-[960px] px-4 py-8 md:py-10">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">Government Securities Reference Documents</h2>
        <p className="text-xs text-muted-foreground mb-4">Payload CMS placeholder · documents to be wired to live data.</p>
        <div className="divide-y divide-border border border-border rounded-md bg-card">
          {GSEC_DOCS.map((d) => (
            <a key={d.file} href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors group">
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{d.title}</div>
                <div className="text-xs text-muted-foreground">{d.category} · {d.file}</div>
              </div>
              <Download className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/bonds")({
  head: () => ({
    meta: [
      { title: "Bonds & Government Securities | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Listed corporate debt and Bangladesh government securities traded on the DSE — coupons, yields, maturities and last traded values.",
      },
      { property: "og:title", content: "Bonds & G-Sec | DSE" },
      {
        property: "og:description",
        content: "The debt market on the Dhaka Stock Exchange.",
      },
    ],
  }),
  component: BondsPage,
});

type TabKey = "corp" | "gsec";

type BondRow = {
  code: string;
  name: string;
  type: string; // Corporate, Sukuk, Subordinated, Debenture, T-Bond, T-Bill, Sukuk-Gov
  coupon: number | null; // %
  price: number | null; // per 100
  yield: number | null; // %
  maturity: string; // YYYY-MM-DD
  lastTraded: string; // ISO date
  volume: number; // BDT (face value notional, lakh)
};

const CORP: BondRow[] = [
  { code: "BEXBOND-7",  name: "Beximco 7-Year Bond",            type: "Corporate",    coupon: 11.20, price: 96.8,  yield: 11.85, maturity: "2032-09-30", lastTraded: "2026-06-18", volume: 425 },
  { code: "SQRBOND-5",  name: "Square Pharma 5Y Bond",          type: "Corporate",    coupon: 10.10, price: 99.0,  yield: 10.32, maturity: "2030-03-15", lastTraded: "2026-06-18", volume: 310 },
  { code: "BRACSUB-2",  name: "BRAC Bank Subordinated Bond II", type: "Subordinated", coupon: 10.50, price: 97.5,  yield: 10.91, maturity: "2031-06-30", lastTraded: "2026-06-17", volume: 180 },
  { code: "CITYSUB-3",  name: "City Bank Subordinated Bond III",type: "Subordinated", coupon: 10.75, price: 97.1,  yield: 11.20, maturity: "2032-12-31", lastTraded: "2026-06-18", volume: 220 },
  { code: "IBBLSUKUK",  name: "Islami Bank Mudaraba Sukuk",     type: "Sukuk",        coupon:  9.40, price: 100.2, yield:  9.35, maturity: "2029-11-30", lastTraded: "2026-06-16", volume: 540 },
  { code: "DBHBOND-1",  name: "DBH First Zero-Coupon Bond",     type: "Debenture",    coupon:  0.00, price: 82.4,  yield:  9.80, maturity: "2028-08-31", lastTraded: "2026-06-15", volume:  95 },
];

const GSEC: BondRow[] = [
  { code: "BGTB-02Y-2027", name: "2-Year Treasury Bond 2027",   type: "T-Bond",   coupon: 8.20, price: 99.7, yield: 8.31, maturity: "2027-04-30", lastTraded: "2026-06-18", volume: 2100 },
  { code: "BGTB-05Y-2029", name: "5-Year Treasury Bond 2029",   type: "T-Bond",   coupon: 8.75, price: 99.2, yield: 8.94, maturity: "2029-11-30", lastTraded: "2026-06-18", volume: 3600 },
  { code: "BGTB-10Y-2034", name: "10-Year Treasury Bond 2034",  type: "T-Bond",   coupon: 9.10, price: 97.8, yield: 9.62, maturity: "2034-05-31", lastTraded: "2026-06-18", volume: 4100 },
  { code: "BGTB-15Y-2039", name: "15-Year Treasury Bond 2039",  type: "T-Bond",   coupon: 9.45, price: 96.4, yield: 10.12, maturity: "2039-08-31", lastTraded: "2026-06-18", volume: 5200 },
  { code: "BGTB-20Y-2044", name: "20-Year Treasury Bond 2044",  type: "T-Bond",   coupon: 9.80, price: 95.1, yield: 10.45, maturity: "2044-02-28", lastTraded: "2026-06-17", volume: 2800 },
  { code: "BGIIB-SUKUK-5", name: "Bangladesh Govt Sukuk 5Y",    type: "Sukuk",    coupon: 8.65, price: 99.5, yield: 8.72, maturity: "2030-02-28", lastTraded: "2026-06-18", volume: 3000 },
  { code: "TBILL-364",     name: "364-Day Treasury Bill",       type: "T-Bill",   coupon: null, price: 92.6, yield: 7.95, maturity: "2027-06-15", lastTraded: "2026-06-18", volume: 1500 },
  { code: "TBILL-182",     name: "182-Day Treasury Bill",       type: "T-Bill",   coupon: null, price: 96.2, yield: 7.62, maturity: "2026-12-18", lastTraded: "2026-06-18", volume: 1200 },
];

type SortKey = "code" | "coupon" | "price" | "yield" | "maturity" | "lastTraded" | "volume";

function maturityBucket(iso: string): "<1y" | "1-5y" | "5-10y" | ">10y" {
  const y = (new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 365.25);
  if (y < 1) return "<1y";
  if (y < 5) return "1-5y";
  if (y < 10) return "5-10y";
  return ">10y";
}

const fmtPct = (n: number | null) => (n == null ? "—" : `${n.toFixed(2)}%`);
const fmtNum = (n: number | null, d = 2) => (n == null ? "—" : n.toFixed(d));
const fmtVol = (n: number) => `৳${n.toLocaleString("en-US")} L`;
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

function BondsPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<TabKey>("corp");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [maturityFilter, setMaturityFilter] = useState<string>("All");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "yield",
    dir: "desc",
  });

  const source = tab === "corp" ? CORP : GSEC;
  const typeOptions = useMemo(
    () => ["All", ...Array.from(new Set(source.map((b) => b.type)))],
    [source],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = source.filter((b) => {
      if (typeFilter !== "All" && b.type !== typeFilter) return false;
      if (maturityFilter !== "All" && maturityBucket(b.maturity) !== maturityFilter) return false;
      if (q && !(b.code.toLowerCase().includes(q) || b.name.toLowerCase().includes(q))) return false;
      return true;
    });
    const get = (b: BondRow) => {
      switch (sort.key) {
        case "code":       return b.code;
        case "coupon":     return b.coupon ?? -1;
        case "price":      return b.price ?? -1;
        case "yield":      return b.yield ?? -1;
        case "maturity":   return new Date(b.maturity).getTime();
        case "lastTraded": return new Date(b.lastTraded).getTime();
        case "volume":     return b.volume;
      }
    };
    return [...list].sort((a, b) => {
      const va = get(a), vb = get(b);
      if (va < vb) return sort.dir === "asc" ? -1 : 1;
      if (va > vb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
  }, [source, query, typeFilter, maturityFilter, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }));

  const SortHead = ({ k, label, align = "left" }: { k: SortKey; label: string; align?: "left" | "right" }) => (
    <th
      onClick={() => toggleSort(k)}
      className={`px-3 py-2 cursor-pointer select-none whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] ${align === "right" ? "text-right" : "text-left"}`}
      style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--line)" }}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sort.key === k &&
          (sort.dir === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
      </span>
    </th>
  );

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />

      {/* Header */}
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--brand-600)" }}
          >
            {t("Dhaka Stock Exchange")}
          </div>
          <h1
            className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            {t("Bonds & Government Securities")}
          </h1>
          {/* CMS-editable intro */}
          <p
            data-cms="bonds.intro"
            className="mt-2 text-[14px] md:text-[15px] leading-[1.6] max-w-3xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {t(
              "The debt market on the DSE covers listed corporate bonds, debentures and sukuk, alongside Bangladesh government treasury bonds, T-bills and sovereign sukuk. Prices are quoted per 100 of face value; yields are quoted as yield-to-maturity.",
            )}
          </p>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-secondary)" }}>
            {t("Sample data for demonstration — live data will connect to the DSE API")}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand-600)" }} />
              {t("as provided by DSE")} · {t("end-of-day")} {fmtDate("2026-06-18")}
            </span>
            <Link
              to="/bonds/government-securities"
              className="hover:underline font-semibold"
              style={{ color: "var(--brand-600)" }}
            >
              G-Sec announcements →
            </Link>
          </div>

        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <div role="tablist" className="flex gap-0 border-b" style={{ borderColor: "var(--line)" }}>
          {([
            { k: "corp", label: t("Corporate & debt instruments") },
            { k: "gsec", label: t("Government securities (G-Sec)") },
          ] as { k: TabKey; label: string }[]).map((x) => {
            const active = tab === x.k;
            return (
              <button
                key={x.k}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setTab(x.k);
                  setTypeFilter("All");
                  setMaturityFilter("All");
                }}
                className="px-3 md:px-4 py-2.5 text-[13px] font-semibold -mb-px"
                style={{
                  color: active ? "var(--ink)" : "var(--text-secondary)",
                  borderBottom: `2px solid ${active ? "var(--brand-600)" : "transparent"}`,
                }}
              >
                {x.label}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div
            className="flex items-center gap-2 px-2.5 py-1.5 flex-1 min-w-[200px]"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Search by name or code")}
              className="bg-transparent outline-none text-[13px] w-full"
              style={{ color: "var(--ink)" }}
            />
          </div>
          <FilterSelect
            label={t("Instrument type")}
            value={typeFilter}
            onChange={setTypeFilter}
            options={typeOptions}
            t={t}
          />
          <FilterSelect
            label={t("Maturity")}
            value={maturityFilter}
            onChange={setMaturityFilter}
            options={["All", "<1y", "1-5y", "5-10y", ">10y"]}
            t={t}
          />
        </div>
      </section>

      {/* Table (desktop) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div
          className="hidden md:block overflow-x-auto"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
        >
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                <SortHead k="code" label={t("Instrument")} />
                <SortHead k="coupon" label={t("Coupon")} align="right" />
                <SortHead k="price" label={t("Last price")} align="right" />
                <SortHead k="yield" label={t("Yield")} align="right" />
                <SortHead k="maturity" label={t("Maturity")} align="right" />
                <SortHead k="lastTraded" label={t("Last traded")} align="right" />
                <SortHead k="volume" label={t("Volume")} align="right" />
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-[13px]" style={{ color: "var(--text-muted)" }}>
                    {t("No matching instruments — showing last available values.")}
                  </td>
                </tr>
              )}
              {rows.map((b, i) => (
                <tr
                  key={b.code}
                  style={{
                    background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <td className="px-3 py-2.5">
                    <div className="font-semibold tnum" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>
                      {b.code}
                    </div>
                    <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                      {b.name} · <span style={{ color: "var(--text-muted)" }}>{b.type}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
                    {fmtPct(b.coupon)}
                  </td>
                  <td className="px-3 py-2.5 text-right tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
                    {fmtNum(b.price)}
                  </td>
                  <td className="px-3 py-2.5 text-right tnum font-semibold" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
                    {fmtPct(b.yield)}
                  </td>
                  <td className="px-3 py-2.5 text-right tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                    {fmtDate(b.maturity)}
                  </td>
                  <td className="px-3 py-2.5 text-right tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                    {fmtDate(b.lastTraded)}
                  </td>
                  <td className="px-3 py-2.5 text-right tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
                    {fmtVol(b.volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards (mobile) */}
        <div className="md:hidden space-y-2">
          {rows.length === 0 && (
            <div
              className="px-3 py-6 text-center text-[13px]"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 2,
                color: "var(--text-muted)",
              }}
            >
              {t("No matching instruments — showing last available values.")}
            </div>
          )}
          {rows.map((b) => (
            <div
              key={b.code}
              className="p-3"
              style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div
                    className="font-semibold tnum text-[13px] truncate"
                    style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}
                  >
                    {b.code}
                  </div>
                  <div className="text-[12px] truncate" style={{ color: "var(--text-secondary)" }}>
                    {b.name}
                  </div>
                </div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-px shrink-0"
                  style={{ background: "var(--surface-2)", color: "var(--text-secondary)", borderRadius: 2 }}
                >
                  {b.type}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]">
                <Cell label={t("Coupon")} value={fmtPct(b.coupon)} />
                <Cell label={t("Yield")} value={fmtPct(b.yield)} bold />
                <Cell label={t("Last price")} value={fmtNum(b.price)} />
                <Cell label={t("Volume")} value={fmtVol(b.volume)} />
                <Cell label={t("Maturity")} value={fmtDate(b.maturity)} />
                <Cell label={t("Last traded")} value={fmtDate(b.lastTraded)} />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[12px] italic" style={{ color: "var(--text-muted)" }}>
          {t("Indicative values. After-hours / non-trading days display the last available prices.")}
        </p>
      </section>

      <GSecDocsSection />

      <Footer />
    </div>
  );
}

function Cell({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <span
        className="tnum"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--ink)",
          fontWeight: bold ? 600 : 400,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  t,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  t: (s: string) => string;
}) {
  return (
    <label
      className="flex items-center gap-1.5 px-2 py-1.5"
      style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
    >
      <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-[12px] font-semibold"
        style={{ color: "var(--ink)" }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "All" ? t("All") : o}
          </option>
        ))}
      </select>
    </label>
  );
}
