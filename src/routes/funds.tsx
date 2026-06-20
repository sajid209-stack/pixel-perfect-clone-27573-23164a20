import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, Search } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/funds")({
  head: () => ({
    meta: [
      { title: "Mutual Funds & ETFs | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Listed open-end, closed-end mutual funds and ETFs on the DSE — NAV, premium/discount, yield and last traded prices.",
      },
      { property: "og:title", content: "Mutual Funds & ETFs | DSE" },
      {
        property: "og:description",
        content: "Listed funds and ETFs on the Dhaka Stock Exchange.",
      },
    ],
  }),
  component: FundsPage,
});

type FundType = "Open-end" | "Closed-end" | "ETF";

type FundRow = {
  code: string;
  name: string;
  amc: string;
  type: FundType;
  price: number | null; // last market price (null for open-end)
  change: number | null; // % change
  nav: number;
  yieldPct: number; // dividend yield %
  lastTraded: string;
};

const FUNDS: FundRow[] = [
  { code: "1JANATAMF",  name: "1st Janata Bank Mutual Fund",   amc: "RACE Asset Management", type: "Closed-end", price: 6.40,  change: 1.59,  nav: 9.12,  yieldPct: 7.8, lastTraded: "2026-06-18" },
  { code: "ICB3RDNRB",  name: "ICB AMCL Third NRB Mutual Fund",amc: "ICB Asset Management",  type: "Closed-end", price: 7.10,  change: -0.70, nav: 8.45,  yieldPct: 6.5, lastTraded: "2026-06-18" },
  { code: "EBL1STMF",   name: "EBL First Mutual Fund",          amc: "RACE Asset Management", type: "Closed-end", price: 6.80,  change: 0.00,  nav: 9.34,  yieldPct: 7.2, lastTraded: "2026-06-17" },
  { code: "ICBSONALI1", name: "ICB Sonali Bank 1st Mutual Fund",amc: "ICB Asset Management",  type: "Closed-end", price: 8.20,  change: 1.23,  nav: 10.62, yieldPct: 8.1, lastTraded: "2026-06-18" },
  { code: "GRAMEENS2",  name: "Grameen One: Scheme Two",        amc: "AIMS of Bangladesh",    type: "Closed-end", price: 15.40, change: -1.28, nav: 16.85, yieldPct: 5.4, lastTraded: "2026-06-18" },
  { code: "VAMLBDMF1",  name: "VAML BDMF One",                  amc: "VIPB Asset Mgmt",       type: "Closed-end", price: 5.90,  change: 1.72,  nav: 8.04,  yieldPct: 6.9, lastTraded: "2026-06-18" },
  { code: "DBH1STMF",   name: "DBH First Mutual Fund",          amc: "LR Global Bangladesh",  type: "Closed-end", price: 6.10,  change: 0.00,  nav: 8.66,  yieldPct: 7.0, lastTraded: "2026-06-17" },
  { code: "LRGLOBMF1",  name: "LR Global Bangladesh MF One",    amc: "LR Global Bangladesh",  type: "Closed-end", price: 6.20,  change: 0.81,  nav: 8.92,  yieldPct: 7.1, lastTraded: "2026-06-18" },
  { code: "OEF-AIBL",   name: "AIBL 1st Islamic Mutual Fund",   amc: "ICB Asset Management",  type: "Open-end",   price: null,  change: null,  nav: 11.24, yieldPct: 5.8, lastTraded: "2026-06-18" },
  { code: "OEF-IFIL",   name: "IFIL Islamic Mutual Fund-1",     amc: "ICB Islamic Asset Mgmt",type: "Open-end",   price: null,  change: null,  nav: 12.06, yieldPct: 6.2, lastTraded: "2026-06-18" },
  { code: "OEF-LBSL",   name: "LankaBangla Growth Fund",        amc: "LankaBangla Asset Mgmt",type: "Open-end",   price: null,  change: null,  nav: 11.42, yieldPct: 4.9, lastTraded: "2026-06-18" },
  { code: "ETF-DSEX",   name: "DSEX 30 Index ETF",              amc: "BRAC EPL Investments",  type: "ETF",        price: 16.20, change: 0.62,  nav: 16.10, yieldPct: 3.4, lastTraded: "2026-06-18" },
  { code: "ETF-SHRH",   name: "DSE Shariah Index ETF",          amc: "EBL Asset Management",  type: "ETF",        price: 14.55, change: -0.41, nav: 14.72, yieldPct: 3.1, lastTraded: "2026-06-18" },
];

type SortKey = "code" | "type" | "price" | "change" | "nav" | "premium" | "yieldPct" | "lastTraded";

const premium = (r: FundRow) =>
  r.price == null ? null : ((r.price - r.nav) / r.nav) * 100;

const fmtPct = (n: number | null, signed = false) =>
  n == null ? "—" : `${signed && n > 0 ? "+" : ""}${n.toFixed(2)}%`;
const fmtNum = (n: number | null, d = 2) => (n == null ? "—" : n.toFixed(d));
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

function FundsPage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [amcFilter, setAmcFilter] = useState<string>("All");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "yieldPct",
    dir: "desc",
  });

  const typeOptions = useMemo(
    () => ["All", ...Array.from(new Set(FUNDS.map((f) => f.type)))],
    [],
  );
  const amcOptions = useMemo(
    () => ["All", ...Array.from(new Set(FUNDS.map((f) => f.amc)))],
    [],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = FUNDS.filter((f) => {
      if (typeFilter !== "All" && f.type !== typeFilter) return false;
      if (amcFilter !== "All" && f.amc !== amcFilter) return false;
      if (q && !(f.code.toLowerCase().includes(q) || f.name.toLowerCase().includes(q))) return false;
      return true;
    });
    const get = (f: FundRow) => {
      switch (sort.key) {
        case "code":       return f.code;
        case "type":       return f.type;
        case "price":      return f.price ?? -Infinity;
        case "change":     return f.change ?? -Infinity;
        case "nav":        return f.nav;
        case "premium":    return premium(f) ?? -Infinity;
        case "yieldPct":   return f.yieldPct;
        case "lastTraded": return new Date(f.lastTraded).getTime();
      }
    };
    return [...list].sort((a, b) => {
      const va = get(a), vb = get(b);
      if (va < vb) return sort.dir === "asc" ? -1 : 1;
      if (va > vb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
  }, [query, typeFilter, amcFilter, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" },
    );

  const SortHead = ({
    k,
    label,
    align = "left",
  }: {
    k: SortKey;
    label: string;
    align?: "left" | "right";
  }) => (
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

  const signColor = (n: number | null) =>
    n == null || n === 0
      ? "var(--text-secondary)"
      : n > 0
      ? "var(--up, #16a34a)"
      : "var(--down, #dc2626)";

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
            {t("Mutual Funds & ETFs")}
          </h1>
          <p
            data-cms="funds.intro"
            className="mt-2 text-[14px] md:text-[15px] leading-[1.6] max-w-3xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {t(
              "Listed open-end and closed-end mutual funds and exchange-traded funds let investors access professionally managed portfolios across equity, balanced, income and Shariah strategies. Closed-end funds and ETFs trade on the DSE at market prices that can be at a premium or discount to net asset value (NAV).",
            )}
          </p>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-secondary)" }}>
            {t("Sample data for demonstration — live data will connect to the DSE API")}
          </div>
          <div
            className="mt-3 inline-flex items-center gap-1.5 text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand-600)" }} />
            {t("as provided by DSE")} · {t("end-of-day")} {fmtDate("2026-06-18")}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <div className="flex flex-wrap items-center gap-2">
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
            label={t("Fund type")}
            value={typeFilter}
            onChange={setTypeFilter}
            options={typeOptions}
            t={t}
          />
          <FilterSelect
            label={t("AMC")}
            value={amcFilter}
            onChange={setAmcFilter}
            options={amcOptions}
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
                <SortHead k="code" label={t("Fund")} />
                <SortHead k="type" label={t("Type")} />
                <SortHead k="price" label={t("Last price")} align="right" />
                <SortHead k="change" label={t("Change")} align="right" />
                <SortHead k="nav" label={t("NAV")} align="right" />
                <SortHead k="premium" label={t("Prem/Disc")} align="right" />
                <SortHead k="yieldPct" label={t("Yield")} align="right" />
                <SortHead k="lastTraded" label={t("Last traded")} align="right" />
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-8 text-center text-[13px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("No matching funds — showing last available values.")}
                  </td>
                </tr>
              )}
              {rows.map((f, i) => {
                const p = premium(f);
                return (
                  <tr
                    key={f.code}
                    style={{
                      background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <td className="px-3 py-2.5">
                      <Link
                        to="/company/$ticker"
                        params={{ ticker: f.code }}
                        className="block hover:underline"
                      >
                        <div
                          className="font-semibold tnum"
                          style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}
                        >
                          {f.code}
                        </div>
                        <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                          {f.name} ·{" "}
                          <span style={{ color: "var(--text-muted)" }}>{f.amc}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-px"
                        style={{
                          background: "var(--surface-2)",
                          color: "var(--text-secondary)",
                          borderRadius: 2,
                        }}
                      >
                        {f.type}
                      </span>
                    </td>
                    <td
                      className="px-3 py-2.5 text-right tnum"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
                    >
                      {fmtNum(f.price)}
                    </td>
                    <td
                      className="px-3 py-2.5 text-right tnum font-semibold"
                      style={{ fontFamily: "var(--font-mono)", color: signColor(f.change) }}
                    >
                      {fmtPct(f.change, true)}
                    </td>
                    <td
                      className="px-3 py-2.5 text-right tnum"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
                    >
                      {fmtNum(f.nav)}
                    </td>
                    <td
                      className="px-3 py-2.5 text-right tnum"
                      style={{ fontFamily: "var(--font-mono)", color: signColor(p) }}
                    >
                      {fmtPct(p, true)}
                    </td>
                    <td
                      className="px-3 py-2.5 text-right tnum"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
                    >
                      {fmtPct(f.yieldPct)}
                    </td>
                    <td
                      className="px-3 py-2.5 text-right tnum"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
                    >
                      {fmtDate(f.lastTraded)}
                    </td>
                  </tr>
                );
              })}
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
              {t("No matching funds — showing last available values.")}
            </div>
          )}
          {rows.map((f) => {
            const p = premium(f);
            return (
              <Link
                key={f.code}
                to="/company/$ticker"
                params={{ ticker: f.code }}
                className="block p-3"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 2,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div
                      className="font-semibold tnum text-[13px] truncate"
                      style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}
                    >
                      {f.code}
                    </div>
                    <div className="text-[12px] truncate" style={{ color: "var(--text-secondary)" }}>
                      {f.name}
                    </div>
                    <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
                      {f.amc}
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-px shrink-0"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--text-secondary)",
                      borderRadius: 2,
                    }}
                  >
                    {f.type}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]">
                  <Cell label={t("Last price")} value={fmtNum(f.price)} />
                  <Cell label={t("Change")} value={fmtPct(f.change, true)} color={signColor(f.change)} bold />
                  <Cell label={t("NAV")} value={fmtNum(f.nav)} />
                  <Cell label={t("Prem/Disc")} value={fmtPct(p, true)} color={signColor(p)} />
                  <Cell label={t("Yield")} value={fmtPct(f.yieldPct)} />
                  <Cell label={t("Last traded")} value={fmtDate(f.lastTraded)} />
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-3 text-[12px] italic" style={{ color: "var(--text-muted)" }}>
          {t(
            "Indicative values. Open-end funds transact at NAV; closed-end funds and ETFs trade at market prices that may differ from NAV.",
          )}
        </p>
      </section>

      <Footer />
    </div>
  );
}

function Cell({
  label,
  value,
  bold,
  color,
}: {
  label: string;
  value: string;
  bold?: boolean;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <span
        className="tnum"
        style={{
          fontFamily: "var(--font-mono)",
          color: color ?? "var(--ink)",
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
