import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/recent-market-information")({
  head: () => ({
    meta: [
      { title: "Recent Market Information | Dhaka Stock Exchange" },
      { name: "description", content: "Recent and record market figures, as provided by DSE." },
      { property: "og:title", content: "Recent Market Information — DSE" },
      { property: "og:description", content: "Recent and record market figures, as provided by DSE." },
    ],
  }),
  component: RecentMarketInfoPage,
});

const HIGHEST_RECORDS = [
  { label: "Highest DSEX Index", value: "—", date: "—" },
  { label: "Highest Turnover (BDT)", value: "—", date: "—" },
  { label: "Highest Volume (shares)", value: "—", date: "—" },
  { label: "Highest Trades", value: "—", date: "—" },
  { label: "Highest Market Capitalization", value: "—", date: "—" },
];

const RECENT_FIELDS = [
  "Date",
  "DSEX Index",
  "Turnover (BDT)",
  "Volume",
  "Trades",
  "Market Cap (BDT)",
];

function RecentMarketInfoPage() {
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(today);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Markets
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Recent Market Information
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Recent and record market figures, as provided by DSE.
          </p>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-secondary)" }}>
            Sample data for demonstration — live data will connect to the DSE API
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-10">
        <div>
          <h2 className="text-[18px] font-semibold mb-3" style={{ color: "var(--ink)" }}>
            Highest Records
          </h2>
          <div
            className="rounded-md overflow-hidden"
            style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
          >
            <table className="w-full text-[13px]" data-cms="markets.highest-records">
              <thead>
                <tr style={{ background: "var(--bg)" }}>
                  <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Metric</th>
                  <th className="px-3 py-2 text-right" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Value</th>
                  <th className="px-3 py-2 text-right" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {HIGHEST_RECORDS.map((r) => (
                  <tr key={r.label} style={{ borderBottom: "1px solid var(--line)" }}>
                    <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.label}</td>
                    <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>{r.value}</td>
                    <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <h2 className="text-[18px] font-semibold" style={{ color: "var(--ink)" }}>
              Recent Market Information
            </h2>
            <div className="flex items-end gap-2">
              <label className="flex flex-col text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--text-secondary)" }}>
                From
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mt-1 h-9 px-2 rounded-md text-[13px] outline-none"
                  style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                />
              </label>
              <label className="flex flex-col text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--text-secondary)" }}>
                To
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-1 h-9 px-2 rounded-md text-[13px] outline-none"
                  style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                />
              </label>
            </div>
          </div>

          <div
            className="rounded-md overflow-hidden"
            style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
          >
            <div className="overflow-auto">
              <table className="w-full text-[13px]" data-cms="markets.recent-info">
                <thead>
                  <tr style={{ background: "var(--bg)" }}>
                    {RECENT_FIELDS.map((f, i) => (
                      <th
                        key={f}
                        className={`px-3 py-2 whitespace-nowrap ${i === 0 ? "text-left" : "text-right"}`}
                        style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}
                      >
                        {f}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                      {RECENT_FIELDS.map((f, j) => (
                        <td
                          key={f}
                          className={`px-3 py-2 ${j === 0 ? "" : "text-right tnum"}`}
                          style={{ color: "var(--ink)" }}
                        >
                          —
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
            Placeholder rows shown. Live figures will be wired to the official DSE feed.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
