import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/markets_/at-a-glance")({
  head: () => ({
    meta: [
      { title: "Market at a Glance | Dhaka Stock Exchange" },
      {
        name: "description",
        content: "Performance of DSE at a glance — turnover, indices, market cap and breadth.",
      },
      { property: "og:title", content: "Market at a Glance" },
      {
        property: "og:description",
        content: "Performance of DSE at a glance — turnover, indices, market cap and breadth.",
      },
    ],
  }),
  component: MarketAtAGlancePage,
});

type Stat = { label: string; unit?: string };
type Group = { title: string; stats: Stat[] };

const GROUPS: Group[] = [
  {
    title: "Turnover",
    stats: [
      { label: "Total turnover", unit: "BDT crore" },
      { label: "Total traded value", unit: "BDT crore" },
      { label: "Total traded volume", unit: "shares" },
      { label: "Total trades", unit: "count" },
      { label: "Block market turnover", unit: "BDT crore" },
      { label: "Odd-lot turnover", unit: "BDT crore" },
    ],
  },
  {
    title: "Market capitalisation",
    stats: [
      { label: "Total market capitalisation", unit: "BDT crore" },
      { label: "Equity market cap", unit: "BDT crore" },
      { label: "Debt market cap", unit: "BDT crore" },
      { label: "Mutual fund market cap", unit: "BDT crore" },
    ],
  },
  {
    title: "Indices",
    stats: [
      { label: "DSEX" },
      { label: "DS30" },
      { label: "DSES" },
      { label: "DSEX change", unit: "%" },
      { label: "DS30 change", unit: "%" },
      { label: "DSES change", unit: "%" },
    ],
  },
  {
    title: "Market breadth",
    stats: [
      { label: "Advances", unit: "issues" },
      { label: "Declines", unit: "issues" },
      { label: "Unchanged", unit: "issues" },
      { label: "Issues traded", unit: "issues" },
      { label: "Not traded", unit: "issues" },
    ],
  },
  {
    title: "Listed securities",
    stats: [
      { label: "Listed companies", unit: "count" },
      { label: "Listed mutual funds", unit: "count" },
      { label: "Listed debentures", unit: "count" },
      { label: "Listed Govt. T-bonds", unit: "count" },
      { label: "Listed corporate bonds", unit: "count" },
    ],
  },
];

function MarketAtAGlancePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
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
            Market at a Glance
          </h1>
          <p className="mt-2 text-[12.5px]" style={{ color: "var(--text-muted)" }}>
            Original page title: “Performance of DSE at a glance”.
          </p>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-secondary)" }}>
            Sample data for demonstration — live data will connect to the DSE API
          </div>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8">
        {GROUPS.map((g) => (
          <div key={g.title} data-cms={`markets.glance.${g.title}`}>
            <h2
              className="text-[12px] font-semibold uppercase tracking-[0.14em] mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              {g.title}
            </h2>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
            >
              {g.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="px-3 py-2.5"
                  style={{
                    borderTop: "1px solid var(--line)",
                    borderLeft: i % 4 === 0 ? "none" : "1px solid var(--line)",
                  }}
                >
                  <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                    {s.unit ? ` (${s.unit})` : ""}
                  </div>
                  <div
                    className="mt-1 text-[18px] font-semibold tnum"
                    style={{ color: "var(--ink)" }}
                  >
                    —
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
          Figures populate from the DSE market data feed.
        </p>
      </section>

      <Footer />
    </div>
  );
}
