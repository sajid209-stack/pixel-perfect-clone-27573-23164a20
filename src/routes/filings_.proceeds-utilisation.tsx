import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/filings_/proceeds-utilisation")({
  head: () => ({
    meta: [
      { title: "IPO/RPO/Rights Proceed Utilisation | DSE" },
      {
        name: "description",
        content:
          "IPO, RPO and Rights issue proceeds utilisation statements filed by DSE-listed companies.",
      },
      { property: "og:title", content: "IPO/RPO/Rights Proceed Utilisation — DSE" },
      {
        property: "og:description",
        content: "Proceed utilisation statements by issuer, with monthly detail reports.",
      },
    ],
  }),
  component: ProceedsUtilisationPage,
});

type Row = {
  code: string;
  received: string;
  lastAsPerProspectus: string;
  actualLast: string;
  remarks: string;
  months: string[]; // e.g. ["2026-05", "2026-04", ...]
};

// Helper: build a descending list of YYYY-MM strings between two months (inclusive)
function months(fromYm: string, toYm: string): string[] {
  const [fy, fm] = fromYm.split("-").map(Number);
  const [ty, tm] = toYm.split("-").map(Number);
  const out: string[] = [];
  let y = fy;
  let m = fm;
  while (y > ty || (y === ty && m >= tm)) {
    out.push(`${y}-${String(m).padStart(2, "0")}`);
    m -= 1;
    if (m === 0) {
      m = 12;
      y -= 1;
    }
  }
  return out;
}

// SAMPLE — replace at wiring
const IPO: Row[] = [
  { code: "AAMRANET", received: "Sep 26, 2017", lastAsPerProspectus: "Sep 30, 2018", actualLast: "Sep 30, 2018", remarks: "", months: months("2026-05", "2017-10") },
  { code: "BBSCABLES", received: "Aug 08, 2016", lastAsPerProspectus: "Aug 08, 2017", actualLast: "Dec 31, 2017", remarks: "", months: months("2026-05", "2016-09") },
  { code: "ACMELAB", received: "Jul 10, 2016", lastAsPerProspectus: "Jul 10, 2017", actualLast: "Dec 31, 2017", remarks: "", months: months("2026-05", "2016-08") },
  { code: "WALTONHIL", received: "Oct 12, 2020", lastAsPerProspectus: "Oct 12, 2021", actualLast: "Oct 12, 2021", remarks: "", months: months("2026-05", "2020-11") },
  { code: "ROBI", received: "Dec 24, 2020", lastAsPerProspectus: "Dec 24, 2022", actualLast: "Dec 31, 2022", remarks: "", months: months("2026-05", "2021-01") },
  { code: "ENERGYPAC", received: "Jun 07, 2021", lastAsPerProspectus: "Jun 07, 2023", actualLast: "-", remarks: "", months: months("2026-05", "2021-07") },
  { code: "ESQUIRENIT", received: "Oct 08, 2019", lastAsPerProspectus: "Oct 08, 2021", actualLast: "Oct 08, 2021", remarks: "", months: months("2026-05", "2019-11") },
  { code: "RUNNERAUTO", received: "Dec 27, 2019", lastAsPerProspectus: "Dec 27, 2020", actualLast: "Dec 27, 2020", remarks: "", months: months("2026-05", "2020-01") },
  { code: "SEAPEARL", received: "Jan 28, 2019", lastAsPerProspectus: "Jan 28, 2020", actualLast: "Jan 28, 2020", remarks: "", months: months("2026-05", "2019-02") },
  { code: "SILVAPHL", received: "Aug 06, 2018", lastAsPerProspectus: "Aug 06, 2019", actualLast: "Aug 06, 2019", remarks: "", months: months("2026-05", "2018-09") },
  { code: "NAHEEACP", received: "Mar 27, 2018", lastAsPerProspectus: "Mar 27, 2019", actualLast: "Mar 27, 2019", remarks: "", months: months("2026-05", "2018-04") },
  { code: "BSCCL", received: "Dec 15, 2011", lastAsPerProspectus: "Dec 15, 2012", actualLast: "Dec 31, 2013", remarks: "", months: months("2026-05", "2012-01") },
];

// SAMPLE — replace at wiring
const RPO: Row[] = [
  { code: "BSC", received: "Oct 22, 2011", lastAsPerProspectus: "Jun 30, 2012", actualLast: "Jun 30, 2024", remarks: "", months: months("2026-05", "2011-11") },
  { code: "LEGACYFOOT", received: "Mar 14, 2016", lastAsPerProspectus: "Mar 14, 2017", actualLast: "Mar 14, 2018", remarks: "", months: months("2026-05", "2016-04") },
];

// SAMPLE — replace at wiring
const RIGHTS: Row[] = [
  { code: "AAMRANET", received: "May 20, 2024", lastAsPerProspectus: "May 20, 2025", actualLast: "-", remarks: "", months: months("2026-05", "2024-06") },
  { code: "CITYBANK", received: "Apr 08, 2023", lastAsPerProspectus: "Apr 08, 2024", actualLast: "Apr 08, 2024", remarks: "", months: months("2026-05", "2023-05") },
  { code: "RENATA", received: "Jun 10, 2022", lastAsPerProspectus: "Jun 10, 2023", actualLast: "Jun 10, 2023", remarks: "", months: months("2026-05", "2022-07") },
  { code: "SOUTHEASTB", received: "Nov 15, 2021", lastAsPerProspectus: "Nov 15, 2022", actualLast: "Nov 15, 2022", remarks: "", months: months("2026-05", "2021-12") },
  { code: "PRIMEBANK", received: "Sep 22, 2020", lastAsPerProspectus: "Sep 22, 2021", actualLast: "-", remarks: "", months: months("2026-05", "2020-10") },
  { code: "IFIC", received: "Jul 18, 2019", lastAsPerProspectus: "Jul 18, 2020", actualLast: "Jul 18, 2020", remarks: "", months: months("2026-05", "2019-08") },
  { code: "MERCANBANK", received: "Feb 04, 2019", lastAsPerProspectus: "Feb 04, 2020", actualLast: "Feb 04, 2020", remarks: "", months: months("2026-05", "2019-03") },
  { code: "TRUSTBANK", received: "Dec 12, 2018", lastAsPerProspectus: "Dec 12, 2019", actualLast: "Dec 12, 2019", remarks: "", months: months("2026-05", "2019-01") },
];

const TABS = [
  { key: "ipo", label: "IPO Proceed Utilisation", rows: IPO },
  { key: "rpo", label: "RPO Proceed Utilisation", rows: RPO },
  { key: "rights", label: "Rights Proceed Utilisation", rows: RIGHTS },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function ProceedsUtilisationPage() {
  const [tab, setTab] = useState<TabKey>("ipo");
  const [q, setQ] = useState("");

  const active = TABS.find((t) => t.key === tab)!;
  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return active.rows;
    return active.rows.filter((r) => r.code.toLowerCase().includes(needle));
  }, [active, q]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Disclosures & Filings
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            IPO/RPO/Rights Proceed Utilisation
          </h1>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div
            className="inline-flex flex-wrap"
            style={{ border: "1px solid var(--line)", borderRadius: 2 }}
          >
            {TABS.map((t, i) => {
              const on = t.key === tab;
              return (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key);
                    setQ("");
                  }}
                  className="px-3 h-8 text-[12px] font-semibold"
                  style={{
                    background: on ? "var(--brand-600)" : "transparent",
                    color: on ? "#fff" : "var(--ink)",
                    borderLeft: i !== 0 ? "1px solid var(--line)" : "none",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Trading Code…"
            className="h-8 px-3 text-[12.5px] outline-none w-full max-w-[260px]"
            style={{
              border: "1px solid var(--line)",
              background: "var(--surface)",
              color: "var(--ink)",
              borderRadius: 2,
            }}
          />
        </div>

        <ProceedsTable rows={rows} />

        <p className="mt-3 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Sample entries for demonstration — monthly detail reports will be linked from the DSE registry.
        </p>
      </section>
      <Footer />
    </div>
  );
}

function ProceedsTable({ rows }: { rows: Row[] }) {
  const headers = [
    { h: "#", align: "left" as const },
    { h: "TRADING CODE", align: "left" as const },
    { h: "Proceed received by company on", align: "left" as const },
    { h: "Last date of Utilisation as per prospectus", align: "left" as const },
    { h: "Actual last date of Utilisation", align: "left" as const },
    { h: "Remarks", align: "left" as const },
    { h: "Year & Month", align: "left" as const },
    { h: "Details Report", align: "left" as const },
  ];
  return (
    <div
      className="overflow-x-auto"
      style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
    >
      <table className="w-full text-[12.5px]" style={{ minWidth: 1040 }}>
        <thead>
          <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
            {headers.map((c) => (
              <th
                key={c.h}
                className="px-3 py-2 text-[11px] font-semibold uppercase"
                style={{
                  textAlign: c.align,
                  letterSpacing: "0.08em",
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
            <ProceedRow key={r.code + i} idx={i + 1} row={r} />
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={headers.length}
                className="px-3 py-6 text-center text-[12.5px]"
                style={{ color: "var(--text-secondary)" }}
              >
                No entries match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ProceedRow({ idx, row }: { idx: number; row: Row }) {
  const [month, setMonth] = useState(row.months[0] ?? "");
  return (
    <tr
      style={{
        borderTop: "1px solid var(--line)",
        background: idx % 2 === 0 ? "rgba(0,0,0,0.018)" : "transparent",
      }}
    >
      <td className="px-3 py-2 tnum" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{idx}</td>
      <td className="px-3 py-2 font-semibold">
        <Link
          to="/company/$ticker"
          params={{ ticker: row.code }}
          target="_blank"
          className="hover:underline"
          style={{ color: "var(--brand-600)" }}
        >
          {row.code}
        </Link>
      </td>
      <td className="px-3 py-2 tnum" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{row.received}</td>
      <td className="px-3 py-2 tnum" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{row.lastAsPerProspectus}</td>
      <td className="px-3 py-2 tnum" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{row.actualLast}</td>
      <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{row.remarks}</td>
      <td className="px-3 py-2">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="h-7 px-2 text-[12px] outline-none"
          style={{
            border: "1px solid var(--line)",
            background: "var(--surface)",
            color: "var(--ink)",
            fontFamily: "var(--font-mono)",
            borderRadius: 2,
          }}
        >
          {row.months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </td>
      <td className="px-3 py-2">
        <a
          href="#"
          className="inline-flex items-center h-7 px-2.5 text-[11.5px] font-semibold text-white"
          style={{ background: "var(--brand-600)", borderRadius: 2 }}
          aria-label={`View report for ${row.code} ${month}`}
        >
          View Report
        </a>
      </td>
    </tr>
  );
}
