import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/markets")({
  head: () => ({
    meta: [
      { title: "Market Statistics | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Today's share market statistics for the Dhaka Stock Exchange: category-wise issues summary, total transactions, market capitalisation and block transactions.",
      },
      { property: "og:title", content: "Market Statistics | DSE" },
      {
        property: "og:description",
        content: "Category-wise issues, transactions, market cap and block trades.",
      },
    ],
  }),
  component: MarketsPage,
});

// SAMPLE — replace at wiring
const AS_OF = "2026-06-18";

// SAMPLE — replace at wiring
const CATEGORY_SUMMARY: {
  label: string;
  adv: number;
  dec: number;
  unch: number;
  total: number;
}[] = [
  { label: "All Category", adv: 176, dec: 185, unch: 35, total: 396 },
  { label: "A Category", adv: 128, dec: 132, unch: 22, total: 282 },
  { label: "B Category", adv: 22, dec: 27, unch: 6, total: 55 },
  { label: "N Category", adv: 8, dec: 6, unch: 1, total: 15 },
  { label: "Z Category", adv: 12, dec: 14, unch: 4, total: 30 },
  { label: "MUTUAL FUND (MF)", adv: 4, dec: 5, unch: 1, total: 10 },
  { label: "CORPORATE BOND (CB)", adv: 1, dec: 1, unch: 1, total: 3 },
  { label: "Govt. Sec (G-Sec)", adv: 1, dec: 0, unch: 0, total: 1 },
];

// SAMPLE — replace at wiring
const TOTAL_TRANSACTIONS: { label: string; value: string }[] = [
  { label: "A. NO. OF TRADES", value: "273343" },
  { label: "B. VOLUME(Nos.)", value: "438328313" },
  { label: "C. VALUE(Tk)", value: "11972115266.60" },
];

// SAMPLE — replace at wiring
const MARKET_CAP: { label: string; value: string }[] = [
  { label: "1. EQUITY", value: "3541538233994.00" },
  { label: "2. MUTUAL FUND", value: "42188451220.00" },
  { label: "3. DEBT SECURITIES", value: "218774562188.00" },
  { label: "TOTAL", value: "3802501247402.00" },
];

// SAMPLE — replace at wiring
const BLOCK_TRADES: {
  code: string;
  max: string;
  min: string;
  trades: number;
  qty: number;
  value: string;
}[] = [
  { code: "ACFL", max: "24.20", min: "22.00", trades: 2, qty: 52488, value: "1.200" },
  { code: "BATBC", max: "512.00", min: "509.30", trades: 6, qty: 118420, value: "60.310" },
  { code: "BEXIMCO", max: "128.50", min: "126.10", trades: 9, qty: 842100, value: "106.402" },
  { code: "BRACBANK", max: "45.80", min: "45.20", trades: 12, qty: 1002340, value: "45.612" },
  { code: "CITYBANK", max: "22.10", min: "21.80", trades: 5, qty: 610200, value: "13.318" },
  { code: "DBBL", max: "62.00", min: "61.50", trades: 4, qty: 240100, value: "14.812" },
  { code: "GP", max: "312.40", min: "310.90", trades: 18, qty: 512470, value: "159.402" },
  { code: "LHBL", max: "82.30", min: "81.00", trades: 3, qty: 92100, value: "7.510" },
  { code: "OLYMPIC", max: "168.00", min: "166.50", trades: 7, qty: 220400, value: "36.812" },
  { code: "RENATA", max: "1240.00", min: "1232.50", trades: 4, qty: 18220, value: "22.610" },
  { code: "ROBI", max: "31.20", min: "30.90", trades: 22, qty: 4102300, value: "127.812" },
  { code: "SQPHARMA", max: "218.40", min: "216.20", trades: 14, qty: 320180, value: "69.712" },
  { code: "TITASGAS", max: "36.10", min: "35.80", trades: 6, qty: 480200, value: "17.310" },
  { code: "UNIONBANK", max: "10.20", min: "10.00", trades: 8, qty: 1120400, value: "11.310" },
  { code: "WALTONHIL", max: "782.50", min: "778.00", trades: 3, qty: 6120, value: "4.782" },
];

// SAMPLE — replace at wiring
const BLOCK_TOTALS = { trades: 155, qty: 11252106, value: "534.915" };
// SAMPLE — replace at wiring
const BLOCK_SCRIPS_COUNT = 52;

function MarketsPage() {
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
            Daily statistics
          </div>
          <h1
            className="text-[28px] md:text-[34px] font-semibold tracking-tight leading-[1.1]"
            style={{ color: "var(--ink)" }}
          >
            Market Statistics
          </h1>
          <p className="mt-2 text-[12.5px] uppercase tracking-[0.08em]" style={{ color: "var(--text-secondary)" }}>
            DHAKA STOCK EXCHANGE PLC. — TODAY'S SHARE MARKET : {AS_OF}
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-10">
        <CategorySummary />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TotalTransactions />
          <MarketCap />
        </div>
        <BlockTradesSection />
        <NoteSection />
        <QuickLinks />
      </div>

      <Footer />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <h2
        className="text-[15px] font-semibold uppercase"
        style={{ color: "var(--ink)", letterSpacing: "0.08em" }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── Section 1 ── */
function CategorySummary() {
  return (
    <section>
      <SectionHeader title="Category-wise Issues Summary" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CATEGORY_SUMMARY.map((c) => (
          <div
            key={c.label}
            style={{
              border: "1px solid var(--line)",
              background: "var(--surface)",
              borderRadius: 2,
            }}
          >
            <div
              className="px-3 py-2 text-[11.5px] font-semibold uppercase"
              style={{
                background: "var(--surface-2)",
                borderBottom: "1px solid var(--line)",
                color: "var(--brand-600)",
                letterSpacing: "0.08em",
              }}
            >
              {c.label}
            </div>
            <table className="w-full text-[12.5px]">
              <tbody>
                {[
                  { k: "ISSUES ADVANCED", v: c.adv },
                  { k: "ISSUES DECLINED", v: c.dec },
                  { k: "ISSUES UNCHANGED", v: c.unch },
                  { k: "TOTAL ISSUES TRADED", v: c.total },
                ].map((r, i, arr) => (
                  <tr
                    key={r.k}
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid var(--line)",
                      fontWeight: i === arr.length - 1 ? 600 : 400,
                    }}
                  >
                    <td className="px-3 py-1.5" style={{ color: "var(--text-secondary)" }}>
                      {r.k}
                    </td>
                    <td
                      className="px-3 py-1.5 tnum text-right"
                      style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}
                    >
                      {r.v.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Section 2 ── */
function TotalTransactions() {
  return (
    <section>
      <SectionHeader title="TOTAL TRANSACTIONS" />
      <div style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
        <table className="w-full text-[13px]">
          <tbody>
            {TOTAL_TRANSACTIONS.map((r, i) => (
              <tr
                key={r.label}
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
              >
                <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>
                  {r.label}
                </td>
                <td
                  className="px-3 py-2 tnum text-right"
                  style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}
                >
                  {r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ── Section 3 ── */
function MarketCap() {
  return (
    <section>
      <SectionHeader title="MARKET CAPITALISATION" />
      <div style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
        <table className="w-full text-[13px]">
          <tbody>
            {MARKET_CAP.map((r, i, arr) => (
              <tr
                key={r.label}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  background: i === arr.length - 1 ? "var(--surface-2)" : "transparent",
                  fontWeight: i === arr.length - 1 ? 600 : 400,
                }}
              >
                <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>
                  {r.label}
                </td>
                <td
                  className="px-3 py-2 tnum text-right"
                  style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}
                >
                  {r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ── Section 4 ── */
function BlockTradesSection() {
  const headers = ["Instr Code", "Max Price", "Min Price", "Trades", "Quantity", "Value(In Mn)"];
  const aligns: ("left" | "right")[] = ["left", "right", "right", "right", "right", "right"];
  return (
    <section>
      <SectionHeader title={`PRICES IN BLOCK TRANSACTIONS : ${AS_OF}`} />
      <div
        className="overflow-x-auto"
        style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
      >
        <table className="w-full text-[13px]" style={{ minWidth: 720 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
              {headers.map((h, i) => (
                <th
                  key={h}
                  className="px-3 py-2 text-[11px] font-semibold uppercase"
                  style={{
                    textAlign: aligns[i],
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
            {BLOCK_TRADES.map((r, i) => (
              <tr
                key={r.code + i}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                }}
              >
                <td className="px-3 py-2 font-semibold">
                  <Link
                    to="/company/$ticker"
                    params={{ ticker: r.code }}
                    style={{ color: "var(--brand-600)" }}
                    className="hover:underline"
                  >
                    {r.code}
                  </Link>
                </td>
                <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.max}</td>
                <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.min}</td>
                <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.trades.toLocaleString()}</td>
                <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.qty.toLocaleString()}</td>
                <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.value}</td>
              </tr>
            ))}
            <tr style={{ borderTop: "2px solid var(--line)", background: "var(--surface-2)", fontWeight: 600 }}>
              <td className="px-3 py-2"></td>
              <td className="px-3 py-2"></td>
              <td className="px-3 py-2"></td>
              <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{BLOCK_TOTALS.trades.toLocaleString()}</td>
              <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{BLOCK_TOTALS.qty.toLocaleString()}</td>
              <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{BLOCK_TOTALS.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>
        Total number of scrips traded in Block = {BLOCK_SCRIPS_COUNT}
      </div>
    </section>
  );
}

/* ── Section 5 ── */
function NoteSection() {
  return (
    <section>
      <SectionHeader title="Note" />
      <ul
        className="list-disc pl-5 space-y-1.5 text-[12.5px] leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
        data-cms="markets.note"
      >
        <li>
          Closing Price (CP) is calculated as the weighted average price of trades executed in the
          closing session, subject to a fallback to the last traded price when the closing session
          has insufficient volume.
        </li>
        <li>
          Where CP is unavailable, the Last Traded Price (LTP) of the continuous session is used
          for end-of-day valuation, index computation and next-day circuit-breaker calculation.
        </li>
      </ul>
    </section>
  );
}

/* ── Quick links (movers previews + sectoral P/E) ── */
function QuickLinks() {
  const cards = [
    { title: "Top Shares", desc: "Gainers, losers and most active by value and volume.", href: "/markets/top-shares" },
    { title: "Circuit Breaker", desc: "Scrips that hit upper or lower circuit today.", href: "/circuit-breaker" },
    { title: "Marginable Securities", desc: "Eligible scrips and applicable margin ratios.", href: "/marginable-securities" },
    { title: "Sectoral Median P/E →", desc: "Median trailing P/E ratio by sector.", href: "/sectoral-pe" },
    { title: "Performance of DSE at a Glance", desc: "Yearly indices, market cap, turnover and volume.", href: "/markets/at-a-glance" },
    { title: "Comparison of Market", desc: "Compare market snapshots across dates.", href: "/markets/comparison" },
    { title: "Latest Share Price", desc: "Consolidated latest share price board.", href: "/markets/latest-share-price" },
  ];
  return (
    <section>
      <SectionHeader title="More" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => (
          <a
            key={c.href}
            href={c.href}
            className="group block p-4"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3
                className="text-[13.5px] font-semibold group-hover:underline"
                style={{ color: "var(--ink)" }}
              >
                {c.title}
              </h3>
              <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--brand-600)" }} />
            </div>
            <p className="mt-1 text-[12px] leading-snug" style={{ color: "var(--text-secondary)" }}>
              {c.desc}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
