import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
  changeMonth: number; // % change last month
  changeYear: number;  // % change last year current month
  gdp: number;         // % change previous year
  inflation: number;   // % change previous year
  bond: number;        // 10-year Govt Bond
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

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const pct = (n: number) => {
  const s = Math.abs(n).toFixed(2);
  return n < 0 ? `(${s})` : s;
};

function pctColor(n: number) {
  if (n > 0) return "var(--green-up)";
  if (n < 0) return "var(--red-down)";
  return "var(--text-secondary)";
}

/* ─────────────── page ─────────────── */

function MarketComparisonPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />

      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-6 md:py-8">
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
          <p className="mt-2 text-[13px] max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            Overview of global markets — stock exchange indices, GDP at current market price,
            inflation and 10-year government bond yields compared across major economies.
          </p>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-muted)" }}>
            Sample data for demonstration — live data will connect to the DSE API.
          </div>
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <h2
          className="text-[12px] font-semibold uppercase tracking-[0.14em] mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Overview of Global Markets
        </h2>

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
                <th colSpan={2} className="text-center px-3 py-2 font-semibold text-[11px] uppercase tracking-wider border-l" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  Macro (YoY %)
                </th>
                <th rowSpan={2} className="text-right px-3 py-2 font-semibold text-[11px] uppercase tracking-wider align-bottom border-l" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  10-yr Bond
                </th>
              </tr>
              <tr style={{ background: "var(--brand)", color: "#fff" }}>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px] border-l" style={{ borderColor: "rgba(255,255,255,0.2)" }}>Current</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px]">Previous</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px]">% Chg (M)</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px]">% Chg (Y)</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px] border-l" style={{ borderColor: "rgba(255,255,255,0.2)" }}>GDP</th>
                <th className="text-right px-3 py-1.5 font-medium text-[10.5px]">Inflation</th>
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((g) => (
                <>
                  <tr key={`h-${g.region}`}>
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
                    </td>
                  </tr>
                  {g.rows.map((r, i) => (
                    <tr
                      key={`${g.region}-${r.country}`}
                      style={{
                        background: i % 2 === 1 ? "var(--surface-2)" : "transparent",
                        borderTop: "1px solid var(--line)",
                      }}
                    >
                      <td className="px-3 py-2 font-medium" style={{ color: "var(--ink)" }}>{r.country}</td>
                      <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{r.index}</td>
                      <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>{fmt(r.current)}</td>
                      <td className="px-3 py-2 text-right tnum" style={{ color: "var(--text-secondary)" }}>{fmt(r.previous)}</td>
                      <td className="px-3 py-2 text-right tnum font-medium" style={{ color: pctColor(r.changeMonth) }}>{pct(r.changeMonth)}</td>
                      <td className="px-3 py-2 text-right tnum font-medium" style={{ color: pctColor(r.changeYear) }}>{pct(r.changeYear)}</td>
                      <td className="px-3 py-2 text-right tnum" style={{ color: pctColor(r.gdp) }}>{pct(r.gdp)}</td>
                      <td className="px-3 py-2 text-right tnum" style={{ color: pctColor(r.inflation) }}>{pct(r.inflation)}</td>
                      <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>{r.bond.toFixed(2)}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden space-y-4">
          {GROUPS.map((g) => (
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
                      <div className="text-[13px] font-medium" style={{ color: "var(--ink)" }}>{r.country}</div>
                      <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>{r.index}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] tnum font-semibold" style={{ color: "var(--ink)" }}>{fmt(r.current)}</div>
                      <div className="text-[11px] tnum" style={{ color: pctColor(r.changeMonth) }}>
                        {pct(r.changeMonth)}% MoM
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-[10.5px]" style={{ color: "var(--text-secondary)" }}>
                    <div><div style={{ color: "var(--text-muted)" }}>YoY</div><div className="tnum" style={{ color: pctColor(r.changeYear) }}>{pct(r.changeYear)}</div></div>
                    <div><div style={{ color: "var(--text-muted)" }}>GDP</div><div className="tnum" style={{ color: pctColor(r.gdp) }}>{pct(r.gdp)}</div></div>
                    <div><div style={{ color: "var(--text-muted)" }}>Infl.</div><div className="tnum" style={{ color: pctColor(r.inflation) }}>{pct(r.inflation)}</div></div>
                    <div><div style={{ color: "var(--text-muted)" }}>Bond</div><div className="tnum" style={{ color: "var(--ink)" }}>{r.bond.toFixed(2)}</div></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px]" style={{ color: "var(--text-muted)" }}>
          Source: The Economist (May, 2026), tradingeconomics.com/bonds. GDP and Inflation shown as
          % change over previous year; 10-year Government Bond yields in %.
        </p>
      </section>

      <Footer />
    </div>
  );
}
