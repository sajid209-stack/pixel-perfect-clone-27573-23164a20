import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/foreign-investors_/economy")({
  head: () => ({
    meta: [
      { title: "Economy of Bangladesh | Dhaka Stock Exchange" },
      { name: "description", content: "Macroeconomic indicators and trends." },
      { property: "og:title", content: "Economy of Bangladesh" },
      { property: "og:description", content: "Macroeconomic indicators and trends." },
    ],
  }),
  component: EconomyPage,
});

const ROWS: { indicator: string; unit: string }[] = [
  { indicator: "Gross Domestic Product (GDP) at current prices", unit: "BDT crore" },
  { indicator: "GDP growth rate (constant prices)", unit: "%" },
  { indicator: "GDP per capita", unit: "USD" },
  { indicator: "Gross National Income (GNI) per capita", unit: "USD" },
  { indicator: "Inflation (CPI, point-to-point)", unit: "%" },
  { indicator: "Inflation (CPI, 12-month average)", unit: "%" },
  { indicator: "Total Investment (% of GDP)", unit: "%" },
  { indicator: "Public Investment (% of GDP)", unit: "%" },
  { indicator: "Private Investment (% of GDP)", unit: "%" },
  { indicator: "Domestic Savings (% of GDP)", unit: "%" },
  { indicator: "National Savings (% of GDP)", unit: "%" },
  { indicator: "Export earnings", unit: "USD million" },
  { indicator: "Import payments", unit: "USD million" },
  { indicator: "Trade balance", unit: "USD million" },
  { indicator: "Remittance inflow", unit: "USD million" },
  { indicator: "Current Account Balance", unit: "USD million" },
  { indicator: "Foreign Exchange Reserve", unit: "USD billion" },
  { indicator: "Exchange Rate (BDT/USD, period average)", unit: "BDT" },
  { indicator: "Broad Money (M2) growth", unit: "%" },
  { indicator: "Private Sector Credit growth", unit: "%" },
  { indicator: "Tax-GDP ratio", unit: "%" },
  { indicator: "Budget deficit (% of GDP)", unit: "%" },
  { indicator: "Public debt (% of GDP)", unit: "%" },
];

function EconomyPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--brand-600)" }}
          >
            Foreign Investors
          </div>
          <h1
            className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            Economy of Bangladesh
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Macroeconomic indicators and trends.
          </p>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div
          className="overflow-x-auto"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
          data-cms="foreign-investors.economy.indicators"
        >
          <table className="w-full text-[13px]">
            <thead>
              <tr
                style={{
                  background: "var(--surface-2)",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                {["Indicator", "Unit", "FY 2022-23", "FY 2023-24", "FY 2024-25"].map((h, i) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-[11px] font-semibold uppercase"
                    style={{
                      textAlign: i <= 1 ? "left" : "right",
                      letterSpacing: "0.1em",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr
                  key={r.indicator}
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid var(--line)",
                    background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                  }}
                >
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>
                    {r.indicator}
                  </td>
                  <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>
                    {r.unit}
                  </td>
                  {[0, 1, 2].map((c) => (
                    <td
                      key={c}
                      className="px-3 py-2 tnum text-right"
                      style={{ color: "var(--text-muted)" }}
                    >
                      —
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
          Source: Economic Trends, Annual Report of Bangladesh Bank &amp; Website; Economic Review, MCCI, Ministry of Finance &amp; Website; Bureau of Statistics Website (Base 2015-16).
        </p>
      </section>

      <Footer />
    </div>
  );
}
