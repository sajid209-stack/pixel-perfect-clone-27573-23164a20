import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/publications_/weekly")({
  head: () => ({
    meta: [
      { title: "Weekly Report | Dhaka Stock Exchange" },
      { name: "description", content: "Weekly market report of the Dhaka Stock Exchange — turnover, indices and market capitalisation." },
      { property: "og:title", content: "Weekly Report — DSE" },
      { property: "og:description", content: "Weekly market report — turnover, indices and market capitalisation." },
    ],
  }),
  component: WeeklyPage,
});

// SAMPLE — replace at wiring
const WEEK_RANGE = "January 06 - January 10, 2019";
// SAMPLE — replace at wiring
const TRADING_DAYS = { current: 5, last: 3 };

type Row = { label: string; cur: string; last: string; chg?: string };

// SAMPLE — replace at wiring
const S1: Row[] = [
  { label: "Total Turnover Value in Tk.", cur: "49,256,464,127", last: "21,515,404,067", chg: "128.94" },
  { label: "Category A (87.18%)", cur: "42,942,713,127", last: "18,005,522,067" },
  { label: "Category B (7.32%)", cur: "3,606,665,000", last: "1,449,989,000" },
  { label: "Category G (0%)", cur: "0", last: "0" },
  { label: "Category N (3.71%)", cur: "1,829,647,000", last: "1,562,956,000" },
  { label: "Category Z (1.78%)", cur: "877,439,000", last: "496,937,000" },
  { label: "Daily Average Turnover Value in Tk.", cur: "9,851,292,825", last: "7,171,801,356", chg: "37.36" },
  { label: "Total Turnover Volume in Nos.", cur: "1,411,121,903", last: "620,906,887", chg: "127.27" },
  { label: "Daily Average Volume in Nos.", cur: "282,224,381", last: "206,968,962" },
  { label: "Total Howla in Nos.", cur: "1,088,909", last: "524,511", chg: "107.60" },
  { label: "Daily Average Howla in Nos.", cur: "217,782", last: "174,837" },
  { label: "Weighted Average P/E", cur: "16.26", last: "15.68", chg: "3.68" },
];

// SAMPLE — replace at wiring
const S2: Row[] = [
  { label: "Total", cur: "349", last: "349" },
  { label: "Advanced", cur: "261", last: "312" },
  { label: "Declined", cur: "79", last: "29" },
  { label: "Unchanged", cur: "7", last: "6" },
  { label: "Not Traded", cur: "2", last: "2" },
];

// SAMPLE — replace at wiring
const S3: Row[] = [
  { label: "Opening day of this week", cur: "1,941.99", last: "1,880.78" },
  { label: "Closing day of this week", cur: "2,011.74", last: "1,941.99" },
  { label: "Change within a week (%)", cur: "3.59", last: "3.25" },
  { label: "Change within a week (Point)", cur: "69.75", last: "61.21" },
];

// SAMPLE — replace at wiring
const S4: Row[] = [
  { label: "Opening day of this week", cur: "5,590.47", last: "5,385.64" },
  { label: "Closing day of this week", cur: "5,797.30", last: "5,590.47" },
  { label: "Change within a week (%)", cur: "3.70", last: "3.80" },
  { label: "Change within a week (Point)", cur: "206.83", last: "204.83" },
];

// SAMPLE — replace at wiring
const S5: Row[] = [
  { label: "Opening day of this week", cur: "1,271.37", last: "1,232.82" },
  { label: "Closing day of this week", cur: "1,318.66", last: "1,271.37" },
  { label: "Change within a week (%)", cur: "3.72", last: "3.13" },
  { label: "Change within a week (Point)", cur: "47.30", last: "38.54" },
];

// SAMPLE — replace at wiring
const S6: Row[] = [
  { label: "Opening day of this week", cur: "3,978,431,188,497", last: "3,872,952,837,163" },
  { label: "Closing day of this week", cur: "4,105,319,159,351", last: "3,978,431,188,497", chg: "3.19" },
];

const SECTIONS: { title: string; rows: Row[] }[] = [
  { title: "Turnover / activity", rows: S1 },
  { title: "No. of Traded Issues", rows: S2 },
  { title: "DSE 30 Index (DS30)", rows: S3 },
  { title: "DSE Broad Index (DSEX)", rows: S4 },
  { title: "DSEX Shariah Index (DSES)", rows: S5 },
  { title: "Market Capitalization in Tk.", rows: S6 },
];

function WeeklyPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Publications
          </div>
          <h1 className="mt-2 text-[22px] md:text-[28px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Dhaka Stock Exchange Limited.
          </h1>
          <div className="mt-1 text-[18px] md:text-[20px] font-semibold" style={{ color: "var(--ink)" }}>
            Weekly Report
          </div>
          <div className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            {WEEK_RANGE}
          </div>
          <div className="mt-1 text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
            Total Trading Days: {TRADING_DAYS.current} (current week) / {TRADING_DAYS.last} (last week)
          </div>
          <div className="mt-4">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 h-8 px-3 text-[12px] font-semibold text-white"
              style={{ background: "var(--brand-600)", borderRadius: 2 }}
            >
              <Download className="w-3.5 h-3.5" />
              Download weekly report (PDF)
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        {SECTIONS.map((s) => (
          <SectionTable key={s.title} title={s.title} rows={s.rows} />
        ))}
        <p className="text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Sample data for demonstration — live data will connect to the DSE weekly report feed.
        </p>
      </section>
      <Footer />
    </div>
  );
}

function SectionTable({ title, rows }: { title: string; rows: Row[] }) {
  const numStyle: React.CSSProperties = {
    color: "var(--ink)",
    fontFamily: "var(--font-mono)",
  };
  return (
    <div>
      <h2
        className="text-[13px] font-semibold uppercase mb-2"
        style={{ letterSpacing: "0.08em", color: "var(--ink)" }}
      >
        {title}
      </h2>
      <div
        className="overflow-x-auto"
        style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
      >
        <table className="w-full text-[13px]" style={{ minWidth: 640 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
              {[
                { h: "Particulars", align: "left" as const },
                { h: "Current week", align: "right" as const },
                { h: "Last week", align: "right" as const },
                { h: "% Change", align: "right" as const },
              ].map((c) => (
                <th
                  key={c.h}
                  className="px-3 py-2 text-[11px] font-semibold uppercase"
                  style={{
                    textAlign: c.align,
                    letterSpacing: "0.1em",
                    color: "var(--text-secondary)",
                  }}
                >
                  {c.h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.label}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                }}
              >
                <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{r.label}</td>
                <td className="px-3 py-2 tnum text-right" style={numStyle}>{r.cur}</td>
                <td className="px-3 py-2 tnum text-right" style={numStyle}>{r.last}</td>
                <td className="px-3 py-2 tnum text-right" style={numStyle}>{r.chg ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
