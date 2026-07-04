import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/markets_/at-a-glance")({
  head: () => ({
    meta: [
      { title: "Performance of DSE at a glance | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Performance of DSE at a glance — indices, market capitalisation, turnover and volume by year.",
      },
      { property: "og:title", content: "Performance of DSE at a glance" },
      {
        property: "og:description",
        content: "Yearly indices, market capitalisation, turnover and volume.",
      },
    ],
  }),
  component: MarketAtAGlancePage,
});

type Row = { label: string; v2023: string; v2024: string; v2025: string };
type Section = { header: string; rows: Row[] };

// SAMPLE — replace at wiring
const TOP_ROW: Row = {
  // legacy spelling
  label: "Listed Secrities",
  v2023: "654",
  v2024: "656",
  v2025: "653",
};

// SAMPLE — replace at wiring
const SECTIONS: Section[] = [
  {
    header: "DSE Broad Index (DSEX)",
    rows: [
      { label: "Opening Index", v2023: "6,206.81", v2024: "6,242.10", v2025: "5,984.55" },
      { label: "Closing Index", v2023: "6,242.10", v2024: "5,984.55", v2025: "6,241.30" },
      { label: "% of change", v2023: "0.57", v2024: "-4.13", v2025: "4.29" },
      { label: "Highest Index", v2023: "6,721.44", v2024: "6,502.18", v2025: "6,398.72" },
      { label: "Lowest Index", v2023: "5,988.20", v2024: "5,321.06", v2025: "5,742.10" },
    ],
  },
  {
    header: "DSE 30 Index (DS30)",
    rows: [
      { label: "Opening Index", v2023: "2,142.60", v2024: "2,158.32", v2025: "2,041.10" },
      { label: "Closing Index", v2023: "2,158.32", v2024: "2,041.10", v2025: "2,118.40" },
      { label: "% of change", v2023: "0.73", v2024: "-5.43", v2025: "3.79" },
      { label: "Highest Index", v2023: "2,326.14", v2024: "2,241.90", v2025: "2,201.66" },
      { label: "Lowest Index", v2023: "2,050.11", v2024: "1,884.55", v2025: "1,970.44" },
    ],
  },
  {
    header: "DSEX Shariah Index (DSES)",
    rows: [
      { label: "Opening Index", v2023: "1,362.41", v2024: "1,374.02", v2025: "1,308.55" },
      { label: "Closing Index", v2023: "1,374.02", v2024: "1,308.55", v2025: "1,340.20" },
      { label: "% of change", v2023: "0.85", v2024: "-4.77", v2025: "2.42" },
      { label: "Highest Index", v2023: "1,462.11", v2024: "1,411.63", v2025: "1,388.94" },
      { label: "Lowest Index", v2023: "1,310.02", v2024: "1,201.44", v2025: "1,280.11" },
    ],
  },
  {
    header: "Market Capitalisation Tk. In mn",
    rows: [
      { label: "Opening Market Cap.", v2023: "7,586,120.10", v2024: "7,712,088.44", v2025: "7,244,180.62" },
      { label: "Closing Market Cap.", v2023: "7,712,088.44", v2024: "7,244,180.62", v2025: "6,920,502.18" },
      { label: "Highest Market Cap", v2023: "8,120,442.66", v2024: "7,924,110.20", v2025: "7,442,006.11" },
      { label: "Lowest Market Cap", v2023: "7,201,882.05", v2024: "6,720,014.30", v2025: "6,610,220.44" },
    ],
  },
  {
    header: "Turnover",
    rows: [
      { label: "Total Turnover in Tk. mn", v2023: "1,406,120.44", v2024: "1,088,410.30", v2025: "1,220,682.10" },
      { label: "% of Change", v2023: "-8.21", v2024: "-22.60", v2025: "12.15" },
      { label: "Total Trading Days", v2023: "238", v2024: "241", v2025: "236" },
      { label: "Daily Average Turnover", v2023: "5,908.06", v2024: "4,517.05", v2025: "5,172.38" },
      { label: "Highest Turnover", v2023: "22,344.10", v2024: "18,220.55", v2025: "19,884.20" },
      // legacy spelling
      { label: "Lowest Turnove", v2023: "1,204.30", v2024: "988.44", v2025: "1,102.60" },
    ],
  },
  {
    header: "Volume",
    rows: [
      { label: "Total Turnover in Volume (mn)", v2023: "72,410.44", v2024: "66,210.30", v2025: "70,822.10" },
      { label: "% of Change", v2023: "-4.10", v2024: "-8.56", v2025: "6.96" },
      { label: "Daily Average Turnover in Volume", v2023: "304.24", v2024: "274.73", v2025: "300.09" },
      { label: "Highest Turnover in Volume", v2023: "812.44", v2024: "744.02", v2025: "780.11" },
      { label: "Lowest Turnover in Volume", v2023: "62.10", v2024: "58.20", v2025: "60.44" },
    ],
  },
];

function MarketAtAGlancePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-8">
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
            Performance of DSE at a glance
          </h1>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div
          className="overflow-x-auto"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          <table className="w-full text-[13px]" style={{ minWidth: 640 }}>
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
                <th
                  className="px-3 py-2 text-left text-[11px] font-semibold uppercase"
                  style={{ letterSpacing: "0.1em", color: "var(--text-secondary)" }}
                >
                  Particulars
                </th>
                {["2023", "2024", "2025"].map((y) => (
                  <th
                    key={y}
                    className="px-3 py-2 text-right text-[11px] font-semibold uppercase"
                    style={{
                      letterSpacing: "0.1em",
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {y}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Tr row={TOP_ROW} />
              {SECTIONS.map((s) => (
                <>
                  <tr key={s.header} style={{ borderTop: "1px solid var(--line)" }}>
                    <td
                      colSpan={4}
                      className="px-3 py-2 text-[11.5px] font-semibold uppercase"
                      style={{
                        background: "var(--brand-600)",
                        color: "#fff",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {s.header}
                    </td>
                  </tr>
                  {s.rows.map((r, i) => (
                    <Tr key={s.header + r.label} row={r} zebra={i % 2 === 1} />
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px]" style={{ color: "var(--text-secondary)" }}>
          Sample data for demonstration — live data will connect to the DSE API.
        </p>
      </section>

      <Footer />
    </div>
  );
}

function Tr({ row, zebra }: { row: Row; zebra?: boolean }) {
  const cellNum: React.CSSProperties = {
    color: "var(--ink)",
    fontFamily: "var(--font-mono)",
  };
  return (
    <tr
      style={{
        borderTop: "1px solid var(--line)",
        background: zebra ? "rgba(0,0,0,0.018)" : "transparent",
      }}
    >
      <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>
        {row.label}
      </td>
      <td className="px-3 py-2 tnum text-right" style={cellNum}>{row.v2023}</td>
      <td className="px-3 py-2 tnum text-right" style={cellNum}>{row.v2024}</td>
      <td className="px-3 py-2 tnum text-right" style={cellNum}>{row.v2025}</td>
    </tr>
  );
}
