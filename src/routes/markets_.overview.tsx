import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/markets_/overview")({
  head: () => ({
    meta: [
      { title: "Market Overview | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Snapshot of DSE market performance across indices, turnover and sectors, alongside a global markets snapshot.",
      },
      { property: "og:title", content: "Market Overview | DSE" },
      {
        property: "og:description",
        content:
          "Snapshot of DSE market performance across indices, turnover and sectors, alongside a global markets snapshot.",
      },
    ],
  }),
  component: MarketOverviewPage,
});

/* ───────────────── types & sample data ───────────────── */

type SummaryStat = {
  label: string;
  value: string;
  change?: number; // % change, signed
  unit?: string;
};

const SUMMARY: SummaryStat[] = [
  { label: "DSEX Index", value: "6,241.32", change: 0.42 },
  { label: "DSES Index", value: "1,362.11", change: 0.28 },
  { label: "DS30 Index", value: "2,214.87", change: -0.11 },
  { label: "Total Turnover", value: "842.16", unit: "BDT crore" },
  { label: "Total Volume", value: "184.2M", unit: "shares" },
  { label: "Total Trades", value: "128,450" },
  { label: "Market Cap", value: "7,84,210", unit: "BDT crore" },
];

type CompareRow = {
  metric: string;
  today: string;
  prev: string;
  change: string;
  pct: number | null;
  week: string;
  month: string;
  numeric?: boolean;
};

const COMPARE: CompareRow[] = [
  { metric: "DSEX Index", today: "6,241.32", prev: "6,215.14", change: "+26.18", pct: 0.42, week: "+68.4", month: "+184.2" },
  { metric: "DSES Index", today: "1,362.11", prev: "1,358.29", change: "+3.82", pct: 0.28, week: "+12.6", month: "+38.9" },
  { metric: "DS30 Index", today: "2,214.87", prev: "2,217.30", change: "-2.43", pct: -0.11, week: "-8.1", month: "+22.4" },
  { metric: "Total Turnover (BDT cr)", today: "842.16", prev: "798.42", change: "+43.74", pct: 5.48, week: "+312.8", month: "+1,204.6" },
  { metric: "Total Volume (mn)", today: "184.2", prev: "171.4", change: "+12.8", pct: 7.47, week: "+68.4", month: "+248.2" },
  { metric: "Total Trades", today: "128,450", prev: "121,382", change: "+7,068", pct: 5.82, week: "+22,140", month: "+84,210" },
  { metric: "Market Cap (BDT cr)", today: "7,84,210", prev: "7,81,208", change: "+3,002", pct: 0.38, week: "+18,420", month: "+42,180" },
  { metric: "Advancing", today: "204", prev: "182", change: "+22", pct: null, week: "—", month: "—" },
  { metric: "Declining", today: "128", prev: "144", change: "-16", pct: null, week: "—", month: "—" },
  { metric: "Unchanged", today: "62", prev: "68", change: "-6", pct: null, week: "—", month: "—" },
];

type GlobalRow = {
  index: string;
  country: string;
  last: string;
  change: string;
  pct: number;
};

const GLOBAL: GlobalRow[] = [
  { index: "Dow Jones", country: "United States", last: "39,142.14", change: "+184.20", pct: 0.47 },
  { index: "S&P 500", country: "United States", last: "5,214.68", change: "+21.42", pct: 0.41 },
  { index: "NASDAQ", country: "United States", last: "16,428.90", change: "-42.18", pct: -0.26 },
  { index: "FTSE 100", country: "United Kingdom", last: "8,142.36", change: "+18.24", pct: 0.22 },
  { index: "Nikkei 225", country: "Japan", last: "38,921.44", change: "-142.60", pct: -0.36 },
  { index: "Hang Seng", country: "Hong Kong", last: "18,412.20", change: "+96.40", pct: 0.53 },
  { index: "Shanghai Composite", country: "China", last: "3,142.68", change: "+8.14", pct: 0.26 },
  { index: "BSE Sensex", country: "India", last: "74,218.40", change: "+312.80", pct: 0.42 },
  { index: "KSE-100", country: "Pakistan", last: "72,410.20", change: "-184.20", pct: -0.25 },
];

type SectorRow = {
  sector: string;
  turnover: string; // BDT cr
  share: number; // % of market
  avgChange: number;
};

const SECTORS: SectorRow[] = [
  { sector: "Bank", turnover: "212.60", share: 25.2, avgChange: 0.4 },
  { sector: "Pharmaceuticals", turnover: "184.20", share: 21.9, avgChange: 1.8 },
  { sector: "Fuel & Power", turnover: "71.80", share: 8.5, avgChange: 1.1 },
  { sector: "Textile", turnover: "96.40", share: 11.4, avgChange: -0.9 },
  { sector: "Engineering", turnover: "33.10", share: 3.9, avgChange: -0.4 },
  { sector: "Telecom", turnover: "54.00", share: 6.4, avgChange: -0.2 },
  { sector: "Food & Beverage", turnover: "28.40", share: 3.4, avgChange: 0.3 },
  { sector: "Insurance", turnover: "58.30", share: 6.9, avgChange: -1.3 },
  { sector: "Cement", turnover: "61.20", share: 7.3, avgChange: 0.6 },
  { sector: "IT", turnover: "42.10", share: 5.0, avgChange: 0.2 },
];

/* ───────────────── formatting helpers ───────────────── */

function signColor(n: number | null | undefined) {
  if (n == null || n === 0) return "var(--text-primary)";
  return n > 0 ? "var(--green-up)" : "var(--red-down)";
}
function signArrow(n: number | null | undefined) {
  if (n == null || n === 0) return "";
  return n > 0 ? "▲" : "▼";
}
function fmtPct(n: number | null | undefined) {
  if (n == null) return "—";
  const s = n > 0 ? "+" : "";
  return `${s}${n.toFixed(2)}%`;
}

/* ───────────────── shared table primitives ───────────────── */

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={`px-3 py-2 text-[11px] font-medium uppercase tracking-wider border-b ${
        right ? "text-right" : "text-left"
      }`}
      style={{ color: "var(--text-muted)", borderColor: "#CCCCCC" }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  right,
  mono,
  color,
}: {
  children: React.ReactNode;
  right?: boolean;
  mono?: boolean;
  color?: string;
}) {
  return (
    <td
      className={`px-3 py-2 text-[13px] ${right ? "text-right" : "text-left"} ${mono ? "tnum" : ""}`}
      style={{ color: color ?? "var(--text-primary)", borderColor: "#CCCCCC" }}
    >
      {children}
    </td>
  );
}

/* ───────────────── page ───────────────── */

function MarketOverviewPage() {
  const now = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Nav />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div
            className="text-[11px] font-medium uppercase tracking-[0.22em] mb-2"
            style={{ color: "var(--text-muted)" }}
          >
            Markets
          </div>
          <h1
            className="text-[32px] md:text-[38px] font-medium tracking-tight leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Market Overview
          </h1>
          <p className="mt-2 text-[15px]" style={{ color: "var(--text-secondary)" }}>
            A snapshot of DSE indices, turnover and sector performance, alongside a global markets summary.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
            <span>As of {now} BST</span>
            <span>Sample data for demonstration — live data will connect to the DSE API.</span>
          </div>
        </div>

        {/* Summary strip */}
        <section className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-px" style={{ background: "#CCCCCC", border: "1px solid #CCCCCC" }}>
            {SUMMARY.map((s) => (
              <div key={s.label} className="p-3" style={{ background: "var(--bg-primary)" }}>
                <div
                  className="text-[10.5px] uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.label}
                </div>
                <div className="mt-1 text-[18px] tnum font-medium" style={{ color: "var(--text-primary)" }}>
                  {s.value}
                </div>
                <div className="mt-0.5 text-[11px] tnum" style={{ color: signColor(s.change) }}>
                  {s.change != null ? `${signArrow(s.change)} ${fmtPct(s.change)}` : s.unit ?? ""}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market comparison */}
        <section className="mb-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-[18px] font-medium" style={{ color: "var(--text-primary)" }}>
              Market Comparison
            </h2>
            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              Today vs previous, week and month
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto" style={{ border: "1px solid #CCCCCC" }}>
            <table className="w-full border-collapse">
              <thead style={{ background: "#EEF2F7" }}>
                <tr>
                  <Th>Metric</Th>
                  <Th right>Today</Th>
                  <Th right>Previous Day</Th>
                  <Th right>Change</Th>
                  <Th right>% Change</Th>
                  <Th right>This Week</Th>
                  <Th right>This Month</Th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r, i) => (
                  <tr key={r.metric} style={{ background: i % 2 ? "#EEF2F7" : "transparent" }}>
                    <Td>{r.metric}</Td>
                    <Td right mono>{r.today}</Td>
                    <Td right mono>{r.prev}</Td>
                    <Td right mono color={signColor(r.pct)}>{r.change}</Td>
                    <Td right mono color={signColor(r.pct)}>{fmtPct(r.pct)}</Td>
                    <Td right mono>{r.week}</Td>
                    <Td right mono>{r.month}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {COMPARE.map((r) => (
              <div key={r.metric} className="p-3" style={{ border: "1px solid #CCCCCC" }}>
                <div className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>{r.metric}</div>
                <div className="mt-2 grid grid-cols-2 gap-y-1 text-[12px]">
                  <span style={{ color: "var(--text-muted)" }}>Today</span>
                  <span className="text-right tnum">{r.today}</span>
                  <span style={{ color: "var(--text-muted)" }}>Previous</span>
                  <span className="text-right tnum">{r.prev}</span>
                  <span style={{ color: "var(--text-muted)" }}>Change</span>
                  <span className="text-right tnum" style={{ color: signColor(r.pct) }}>{r.change}</span>
                  <span style={{ color: "var(--text-muted)" }}>% Change</span>
                  <span className="text-right tnum" style={{ color: signColor(r.pct) }}>{fmtPct(r.pct)}</span>
                  <span style={{ color: "var(--text-muted)" }}>This Week</span>
                  <span className="text-right tnum">{r.week}</span>
                  <span style={{ color: "var(--text-muted)" }}>This Month</span>
                  <span className="text-right tnum">{r.month}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global markets */}
        <section className="mb-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-[18px] font-medium" style={{ color: "var(--text-primary)" }}>
              Global Markets
            </h2>
            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              Sample values
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto" style={{ border: "1px solid #CCCCCC" }}>
            <table className="w-full border-collapse">
              <thead style={{ background: "#EEF2F7" }}>
                <tr>
                  <Th>Index</Th>
                  <Th>Country</Th>
                  <Th right>Last</Th>
                  <Th right>Change</Th>
                  <Th right>% Change</Th>
                </tr>
              </thead>
              <tbody>
                {GLOBAL.map((g, i) => (
                  <tr key={g.index} style={{ background: i % 2 ? "#EEF2F7" : "transparent" }}>
                    <Td>{g.index}</Td>
                    <Td>{g.country}</Td>
                    <Td right mono>{g.last}</Td>
                    <Td right mono color={signColor(g.pct)}>{g.change}</Td>
                    <Td right mono color={signColor(g.pct)}>
                      {signArrow(g.pct)} {fmtPct(g.pct)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-2">
            {GLOBAL.map((g) => (
              <div key={g.index} className="p-3 flex items-center justify-between" style={{ border: "1px solid #CCCCCC" }}>
                <div>
                  <div className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>{g.index}</div>
                  <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>{g.country}</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] tnum" style={{ color: "var(--text-primary)" }}>{g.last}</div>
                  <div className="text-[11px] tnum" style={{ color: signColor(g.pct) }}>
                    {signArrow(g.pct)} {fmtPct(g.pct)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sector performance */}
        <section className="mb-16">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-[18px] font-medium" style={{ color: "var(--text-primary)" }}>
              Sector Performance
            </h2>
            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              Turnover share and average movement
            </div>
          </div>

          <div className="overflow-x-auto" style={{ border: "1px solid #CCCCCC" }}>
            <table className="w-full border-collapse">
              <thead style={{ background: "#EEF2F7" }}>
                <tr>
                  <Th>Sector</Th>
                  <Th right>Turnover (BDT cr)</Th>
                  <Th right>% of Market</Th>
                  <Th>Share</Th>
                  <Th right>Avg Change %</Th>
                </tr>
              </thead>
              <tbody>
                {SECTORS.map((s, i) => (
                  <tr key={s.sector} style={{ background: i % 2 ? "#EEF2F7" : "transparent" }}>
                    <Td>{s.sector}</Td>
                    <Td right mono>{s.turnover}</Td>
                    <Td right mono>{s.share.toFixed(1)}%</Td>
                    <Td>
                      <div className="h-1.5 w-full" style={{ background: "rgb(var(--ov) / 0.08)" }}>
                        <div
                          className="h-full"
                          style={{
                            width: `${Math.min(100, s.share * 3)}%`,
                            background: "var(--primary)",
                          }}
                        />
                      </div>
                    </Td>
                    <Td right mono color={signColor(s.avgChange)}>
                      {signArrow(s.avgChange)} {fmtPct(s.avgChange)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
