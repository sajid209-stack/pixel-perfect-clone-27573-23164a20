import { Fragment, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/markets_/comparison")({
  head: () => ({
    meta: [
      { title: "Comparison of Market | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Overview of global markets — stock exchange indices, GDP, inflation and 10-year government bond yields compared across countries.",
      },
      { property: "og:title", content: "Comparison of Market | DSE" },
      {
        property: "og:description",
        content:
          "Overview of global markets — stock exchange indices, GDP, inflation and 10-year government bond yields compared across countries.",
      },
    ],
  }),
  component: MarketComparisonPage,
});

/* ─────────────── types & data (verbatim from dsebd.org/markets.php) ─────────────── */

type Row = {
  country: string;
  index: string;
  current: number;
  previous: number;
  changeMonth: number;
  changeYear: number;
  gdp: number;
  inflation: number;
  bond: number;
};

type Group = { region: string; rows: Row[] };

const GROUPS: Group[] = [
  {
    region: "Asia Pacific",
    rows: [
      { country: "Bangladesh", index: "DSEX", current: 5335.87, previous: 5286.87, changeMonth: 0.93, changeYear: 15.05, gdp: 11.0, inflation: -15.87, bond: 10.88 },
      { country: "India", index: "S&P BSE SENSEX", current: 74775.74, previous: 76913.5, changeMonth: -2.78, changeYear: -8.2, gdp: 7.8, inflation: 3.5, bond: 6.99 },
      { country: "Pakistan", index: "KSE 100", current: 173962.81, previous: 162994.17, changeMonth: 6.73, changeYear: 45.34, gdp: 4.8, inflation: 10.9, bond: 12.75 },
      { country: "Indonesia", index: "Jakarta Comp", current: 6127.38, previous: 6956.8, changeMonth: -11.92, changeYear: -14.61, gdp: 5.6, inflation: 2.4, bond: 6.71 },
      { country: "Malaysia", index: "KLSE Composite", current: 1683.07, previous: 1722.02, changeMonth: -2.26, changeYear: 11.58, gdp: 5.4, inflation: 1.9, bond: 3.57 },
      { country: "Thailand", index: "SET", current: 1568.37, previous: 1493.69, changeMonth: 5.0, changeYear: 36.48, gdp: 2.8, inflation: 2.9, bond: 2.28 },
      { country: "Taiwan", index: "Taiwan Weighted", current: 44732.94, previous: 38926.63, changeMonth: 14.92, changeYear: 109.55, gdp: 13.7, inflation: 1.7, bond: 1.67 },
    ],
  },
  {
    region: "Asian Giants",
    rows: [
      { country: "Japan", index: "Nikkei 225", current: 66309.5, previous: 59284.92, changeMonth: 11.85, changeYear: 74.66, gdp: 0.6, inflation: 1.3, bond: 2.66 },
      { country: "Hong Kong", index: "Hang Seng", current: 25182.39, previous: 25776.53, changeMonth: -2.3, changeYear: 8.13, gdp: 5.9, inflation: 1.8, bond: 3.28 },
      { country: "Singapore", index: "Straits Times", current: 5037.86, previous: 4905.51, changeMonth: 2.7, changeYear: 29.35, gdp: 6.0, inflation: 1.8, bond: 2.03 },
    ],
  },
  {
    region: "Europe",
    rows: [
      { country: "Germany", index: "DAX", current: 25104.7, previous: 24292.38, changeMonth: 3.34, changeYear: 4.61, gdp: 0.3, inflation: 2.9, bond: 2.93 },
      { country: "UK", index: "FTSE 100", current: 10409.28, previous: 10378.82, changeMonth: 0.29, changeYear: 18.66, gdp: 1.1, inflation: 2.8, bond: 4.81 },
    ],
  },
  {
    region: "USA",
    rows: [
      { country: "USA", index: "DJIA", current: 51032.46, previous: 49652.14, changeMonth: 2.78, changeYear: 20.73, gdp: 2.7, inflation: 3.8, bond: 4.45 },
    ],
  },
];

/* ─────────────── helpers ─────────────── */

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const signed = (n: number) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(2)}%`;

function pctColor(n: number) {
  if (n > 0) return "var(--green-up)";
  if (n < 0) return "var(--red-down)";
  return "var(--text-secondary)";
}

const FLAG: Record<string, string> = {
  Bangladesh: "🇧🇩", India: "🇮🇳", Pakistan: "🇵🇰", Indonesia: "🇮🇩",
  Malaysia: "🇲🇾", Thailand: "🇹🇭", Taiwan: "🇹🇼", Japan: "🇯🇵",
  "Hong Kong": "🇭🇰", Singapore: "🇸🇬", Germany: "🇩🇪", UK: "🇬🇧", USA: "🇺🇸",
};

/* ─────────────── page ─────────────── */

function MarketComparisonPage() {
  const allRows = useMemo(() => GROUPS.flatMap((g) => g.rows.map((r) => ({ ...r, region: g.region }))), []);
  const regions = ["All", ...GROUPS.map((g) => g.region)];
  const [region, setRegion] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GROUPS
      .filter((g) => region === "All" || g.region === region)
      .map((g) => ({
        ...g,
        rows: g.rows.filter(
          (r) => !q || r.country.toLowerCase().includes(q) || r.index.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.rows.length > 0);
  }, [region, query]);

  const topGainerM = [...allRows].sort((a, b) => b.changeMonth - a.changeMonth)[0];
  const topLoserM = [...allRows].sort((a, b) => a.changeMonth - b.changeMonth)[0];
  const topGainerY = [...allRows].sort((a, b) => b.changeYear - a.changeYear)[0];
  const highestBond = [...allRows].sort((a, b) => b.bond - a.bond)[0];

  const maxAbsMonth = Math.max(...allRows.map((r) => Math.abs(r.changeMonth)));

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />

      {/* Header */}
      <section className="border-b" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <nav className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/markets" className="hover:underline">Markets</Link>
            <span className="mx-1.5">/</span>
            <span style={{ color: "var(--text-secondary)" }}>Comparison of Market</span>
          </nav>
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--brand-600)" }}
          >
            Markets
          </div>
          <h1
            className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            Comparison of Market
          </h1>
          <p className="mt-2 text-[13.5px] max-w-3xl" style={{ color: "var(--text-secondary)" }}>
            Overview of global markets — stock exchange indices, GDP at current market price,
            inflation and 10-year government bond yields compared across major economies.
          </p>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-muted)" }}>
            Sample data for demonstration — live data will connect to the DSE API.
          </div>
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Highlight strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-6" style={{ background: "var(--line)", border: "1px solid var(--line)" }}>
          {[
            { label: "Top Gainer (M)", r: topGainerM, val: signed(topGainerM.changeMonth), color: pctColor(topGainerM.changeMonth) },
            { label: "Top Loser (M)", r: topLoserM, val: signed(topLoserM.changeMonth), color: pctColor(topLoserM.changeMonth) },
            { label: "Best 12-mo", r: topGainerY, val: signed(topGainerY.changeYear), color: pctColor(topGainerY.changeYear) },
            { label: "Highest 10-yr Bond", r: highestBond, val: `${highestBond.bond.toFixed(2)}%`, color: "var(--ink)" },
          ].map((h) => (
            <div key={h.label} className="p-3" style={{ background: "var(--surface)" }}>
              <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                {h.label}
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-[16px]">{FLAG[h.r.country]}</span>
                <span className="text-[14px] font-medium" style={{ color: "var(--ink)" }}>{h.r.country}</span>
              </div>
              <div className="mt-0.5 text-[11px]" style={{ color: "var(--text-muted)" }}>{h.r.index}</div>
              <div className="mt-1.5 text-[18px] tnum font-semibold" style={{ color: h.color }}>{h.val}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="flex flex-wrap gap-1.5">
            {regions.map((r) => {
              const active = region === r;
              return (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className="px-3 py-1.5 text-[12px] font-medium transition-colors"
                  style={{
                    background: active ? "var(--brand)" : "var(--surface)",
                    color: active ? "#fff" : "var(--text-secondary)",
                    border: `1px solid ${active ? "var(--brand)" : "var(--line)"}`,
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
          <div className="md:ml-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or index…"
              className="w-full md:w-64 px-3 py-1.5 text-[12.5px] outline-none focus:ring-1"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
            />
          </div>
        </div>

        {/* Desktop table */}
        <div
          className="hidden md:block overflow-x-auto"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          <table className="w-full text-[12.5px] border-collapse">
            <thead>
              <tr style={{ background: "var(--brand)", color: "#fff" }}>
                <th rowSpan={2} className="text-left px-3 py-2 font-semibold text-[11px] uppercase tracking-wider align-bottom">
                  Country
                </th>
                <th rowSpan={2} className="text-left px-3 py-2 font-semibold text-[11px] uppercase tracking-wider align-bottom">
                  Stock Exchange Index
                </th>
                <th colSpan={4} className="text-center px-3 py-2 font-semibold text-[11px] uppercase tracking-wider border-l" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  Index
                </th>
                <th className="text-center px-3 py-2 font-semibold text-[11px] uppercase tracking-wider border-l align-bottom" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  GDP (Current Mkt. Price)
                </th>
                <th className="text-center px-3 py-2 font-semibold text-[11px] uppercase tracking-wider border-l align-bottom" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  Inflation
                </th>
                <th rowSpan={2} className="text-right px-3 py-2 font-semibold text-[11px] uppercase tracking-wider align-bottom border-l leading-tight" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  Interest Rate (%)<br /><span className="font-normal opacity-80">(10-year Govt. Bond)</span>
                </th>
              </tr>
              <tr style={{ background: "var(--brand)", color: "#fff" }}>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px] border-l" style={{ borderColor: "rgba(255,255,255,0.2)" }}>May, 2026</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px]">April, 2026</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px]">% Change Last month</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px]">% Change Last year current month</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px] border-l" style={{ borderColor: "rgba(255,255,255,0.2)" }}>% change previous year</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px] border-l" style={{ borderColor: "rgba(255,255,255,0.2)" }}>% change previous year</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g) => (
                <Fragment key={g.region}>
                  <tr>
                    <td
                      colSpan={9}
                      className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider"
                      style={{
                        background: "var(--surface-2)",
                        color: "var(--brand-600)",
                        borderTop: "1px solid var(--line)",
                      }}
                    >
                      {g.region}
                      <span className="ml-2 font-normal normal-case tracking-normal" style={{ color: "var(--text-muted)" }}>
                        · {g.rows.length} {g.rows.length === 1 ? "market" : "markets"}
                      </span>
                    </td>
                  </tr>
                  {g.rows.map((r, i) => {
                    const bar = maxAbsMonth ? (Math.abs(r.changeMonth) / maxAbsMonth) * 100 : 0;
                    const barColor = pctColor(r.changeMonth);
                    return (
                      <tr
                        key={`${g.region}-${r.country}`}
                        className="group"
                        style={{
                          background: i % 2 === 1 ? "var(--surface-2)" : "transparent",
                          borderTop: "1px solid var(--line)",
                        }}
                      >
                        <td className="px-3 py-2 font-medium" style={{ color: "var(--ink)" }}>
                          <span className="mr-1.5">{FLAG[r.country]}</span>{r.country}
                        </td>
                        <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{r.index}</td>
                        <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>{fmt(r.current)}</td>
                        <td className="px-3 py-2 text-right tnum" style={{ color: "var(--text-secondary)" }}>{fmt(r.previous)}</td>
                        <td className="px-3 py-2 text-right tnum font-medium" style={{ color: barColor }}>
                          <div className="flex items-center justify-end gap-2">
                            <div className="hidden lg:block h-1 w-16" style={{ background: "var(--surface-2)" }}>
                              <div
                                className="h-full"
                                style={{
                                  width: `${bar}%`,
                                  background: barColor,
                                  marginLeft: r.changeMonth < 0 ? `${100 - bar}%` : 0,
                                }}
                              />
                            </div>
                            <span>{signed(r.changeMonth)}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right tnum font-medium" style={{ color: pctColor(r.changeYear) }}>{signed(r.changeYear)}</td>
                        <td className="px-3 py-2 text-right tnum" style={{ color: pctColor(r.gdp) }}>{signed(r.gdp)}</td>
                        <td className="px-3 py-2 text-right tnum" style={{ color: pctColor(r.inflation) }}>{signed(r.inflation)}</td>
                        <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>{r.bond.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </Fragment>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-3 py-8 text-center text-[12.5px]" style={{ color: "var(--text-muted)" }}>
                    No markets match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden space-y-4">
          {filtered.map((g) => (
            <div key={g.region}>
              <div
                className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider"
                style={{ background: "var(--surface-2)", color: "var(--brand-600)", border: "1px solid var(--line)" }}
              >
                {g.region}
              </div>
              {g.rows.map((r) => (
                <div
                  key={r.country}
                  className="px-3 py-2.5"
                  style={{
                    background: "var(--surface)",
                    borderLeft: "1px solid var(--line)",
                    borderRight: "1px solid var(--line)",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <div className="text-[13px] font-medium" style={{ color: "var(--ink)" }}>
                        <span className="mr-1.5">{FLAG[r.country]}</span>{r.country}
                      </div>
                      <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>{r.index}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] tnum font-semibold" style={{ color: "var(--ink)" }}>{fmt(r.current)}</div>
                      <div className="text-[11px] tnum font-medium" style={{ color: pctColor(r.changeMonth) }}>
                        {signed(r.changeMonth)} MoM
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-[10.5px]">
                    <div><div style={{ color: "var(--text-muted)" }}>YoY</div><div className="tnum font-medium" style={{ color: pctColor(r.changeYear) }}>{signed(r.changeYear)}</div></div>
                    <div><div style={{ color: "var(--text-muted)" }}>GDP</div><div className="tnum" style={{ color: pctColor(r.gdp) }}>{signed(r.gdp)}</div></div>
                    <div><div style={{ color: "var(--text-muted)" }}>Infl.</div><div className="tnum" style={{ color: pctColor(r.inflation) }}>{signed(r.inflation)}</div></div>
                    <div><div style={{ color: "var(--text-muted)" }}>Bond</div><div className="tnum" style={{ color: "var(--ink)" }}>{r.bond.toFixed(2)}</div></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend + source */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-[11px]" style={{ color: "var(--text-muted)" }}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2" style={{ background: "var(--green-up)" }} />
              Positive change
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2" style={{ background: "var(--red-down)" }} />
              Negative change
            </span>
          </div>
          <p className="md:ml-auto">
            Source: The Economist (May, 2026), tradingeconomics.com/bonds. GDP and Inflation shown as
            % change over previous year; 10-yr Government Bond yields in %.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
