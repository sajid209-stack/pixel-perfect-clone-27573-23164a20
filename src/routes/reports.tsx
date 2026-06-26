import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Market reports & calendar | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Daily summaries, weekly bulletins, monthly digests, research and the trading calendar of the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "Market reports & calendar | DSE" },
      { property: "og:description", content: "Daily, weekly, monthly reports and trading calendar." },
    ],
  }),
  component: ReportsPage,
});

type ReportType = "Daily" | "Weekly" | "Monthly" | "Research";

const reports: { date: string; title: string; type: ReportType; size: string }[] = [
  { date: "Jun 04, 2026", title: "Daily market summary", type: "Daily", size: "1.2 MB" },
  { date: "Jun 03, 2026", title: "Daily market summary", type: "Daily", size: "1.1 MB" },
  { date: "Jun 02, 2026", title: "Daily market summary", type: "Daily", size: "0.9 MB" },
  { date: "May 30, 2026", title: "Weekly bulletin — Week 22", type: "Weekly", size: "3.8 MB" },
  { date: "May 23, 2026", title: "Weekly bulletin — Week 21", type: "Weekly", size: "3.4 MB" },
  { date: "May 31, 2026", title: "Monthly digest — May 2026", type: "Monthly", size: "6.4 MB" },
  { date: "May 25, 2026", title: "Sector outlook — Q2 2026", type: "Research", size: "4.1 MB" },
  { date: "Apr 30, 2026", title: "Monthly digest — April 2026", type: "Monthly", size: "5.8 MB" },
  { date: "Apr 25, 2026", title: "Weekly bulletin — Week 17", type: "Weekly", size: "3.2 MB" },
  { date: "Mar 31, 2026", title: "Monthly digest — March 2026", type: "Monthly", size: "6.1 MB" },
  { date: "Mar 20, 2026", title: "DSE Market Report Q1 2026", type: "Research", size: "9.2 MB" },
  { date: "Jan 31, 2026", title: "Annual Statistical Bulletin 2025", type: "Research", size: "18.4 MB" },
];

const filters: ("All" | ReportType)[] = ["All", "Daily", "Weekly", "Monthly", "Research"];

const typeStyles: Record<ReportType, { bg: string; fg: string; border: string }> = {
  Daily: { bg: "rgba(59,130,246,0.12)", fg: "#3b82f6", border: "rgba(59,130,246,0.30)" },
  Weekly: { bg: "rgba(245,158,11,0.12)", fg: "#f59e0b", border: "rgba(245,158,11,0.30)" },
  Monthly: { bg: "rgba(15,27,61,0.12)", fg: "#1e3a5f", border: "rgba(30,58,95,0.35)" },
  Research: { bg: "rgb(var(--brand-tint) / 0.12)", fg: "var(--primary)", border: "rgb(var(--brand-tint) / 0.30)" },
};

type SessionKind = "Trading day" | "Holiday" | "Weekend";

const calendar: { date: string; kind: SessionKind; note?: string }[] = [
  { date: "Fri Jun 6", kind: "Weekend" },
  { date: "Sat Jun 7", kind: "Holiday", note: "Eid ul-Adha" },
  { date: "Sun Jun 8", kind: "Trading day" },
  { date: "Mon Jun 9", kind: "Trading day" },
  { date: "Tue Jun 10", kind: "Trading day" },
  { date: "Wed Jun 11", kind: "Trading day" },
  { date: "Thu Jun 12", kind: "Trading day" },
  { date: "Fri Jun 13", kind: "Weekend" },
  { date: "Sat Jun 14", kind: "Weekend" },
  { date: "Sun Jun 15", kind: "Trading day" },
  { date: "Mon Jun 16", kind: "Trading day" },
  { date: "Tue Jun 17", kind: "Trading day" },
  { date: "Wed Jun 18", kind: "Trading day" },
  { date: "Thu Jun 19", kind: "Trading day" },
];

const kindStyles: Record<SessionKind, { bg: string; fg: string; border: string }> = {
  "Trading day": { bg: "rgb(var(--brand-tint) / 0.12)", fg: "var(--navy-light)", border: "rgb(var(--brand-tint) / 0.30)" },
  Holiday: { bg: "rgba(245,158,11,0.12)", fg: "#f59e0b", border: "rgba(245,158,11,0.30)" },
  Weekend: { bg: "rgb(var(--ov) / 0.08)", fg: "var(--text-muted)", border: "rgb(var(--ov) / 0.10)" },
};

function ReportsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const filtered = useMemo(
    () => (filter === "All" ? reports : reports.filter((r) => r.type === filter)),
    [filter],
  );

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      {/* Header */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>Resources</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            Market reports<br />& calendar
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            Daily summaries, weekly bulletins, monthly digests, and the trading calendar.
          </p>
          <div className="text-[11px] mt-3" style={{ color: "var(--text-secondary)" }}>
            Sample data for demonstration — live data will connect to the DSE API
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 py-10 grid lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Reports archive */}
        <div>
          <div className="flex flex-wrap gap-2 mb-5">
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 h-8 rounded-full text-[12px] font-medium transition"
                  style={{
                    background: active ? "var(--primary)" : "rgb(var(--ov) / 0.04)",
                    color: active ? "var(--primary-foreground)" : "var(--text-secondary)",
                    border: active ? "1px solid var(--primary)" : "1px solid rgb(var(--ov) / 0.08)",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgb(var(--surface-rgb) / 0.6)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            {filtered.map((r, i) => {
              const ts = typeStyles[r.type];
              return (
                <div
                  key={`${r.date}-${r.title}`}
                  className="flex items-center gap-4 px-5 py-4 flex-wrap"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgb(var(--ov) / 0.06)" }}
                >
                  <span
                    className="text-[11px] tnum px-2 h-6 inline-flex items-center rounded-full shrink-0"
                    style={{ background: "rgb(var(--ov) / 0.05)", color: "var(--text-muted)" }}
                  >
                    {r.date}
                  </span>
                  <div className="flex-1 min-w-[160px] text-[13.5px]">{r.title}</div>
                  <span
                    className="text-[10.5px] uppercase tracking-[0.14em] px-2 h-6 inline-flex items-center rounded-full font-medium"
                    style={{ background: ts.bg, color: ts.fg, border: `1px solid ${ts.border}` }}
                  >
                    {r.type}
                  </span>
                  <span className="text-[12px] tnum w-[60px] text-right" style={{ color: "var(--text-muted)" }}>
                    {r.size}
                  </span>
                  <a
                    href="#"
                    className="text-[12px] font-medium px-3 h-8 inline-flex items-center rounded-full"
                    style={{
                      border: "1px solid rgb(var(--ov) / 0.15)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Download PDF
                  </a>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-[12px]" style={{ color: "var(--text-muted)" }}>
            All reports are published by DSE and subject to copyright. For bulk data access see About
            › Data API.
          </div>
        </div>

        {/* Trading calendar */}
        <aside>
          <div className="mb-5">
            <h2 className="text-[20px] font-semibold tracking-tight">Trading calendar</h2>
            <div className="text-[12.5px] mt-1" style={{ color: "var(--text-secondary)" }}>
              Sunday to Thursday · 10:00 AM – 2:30 PM BST
            </div>
          </div>

          <div
            className="rounded-2xl p-5 mb-5"
            style={{
              background: "rgb(var(--surface-rgb) / 0.6)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: "var(--text-muted)" }}>
              Market hours
            </div>
            <dl className="space-y-2 text-[12.5px]">
              {[
                ["Pre-open", "09:30 – 10:00 AM"],
                ["Continuous trading", "10:00 AM – 2:00 PM"],
                ["Closing session", "2:00 – 2:30 PM"],
                ["Post-close", "2:30 – 3:00 PM"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3">
                  <dt style={{ color: "var(--text-secondary)" }}>{k}</dt>
                  <dd className="tnum font-medium" style={{ color: "var(--text-primary)" }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgb(var(--surface-rgb) / 0.6)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            {calendar.map((d, i) => {
              const ks = kindStyles[d.kind];
              return (
                <div
                  key={d.date}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgb(var(--ov) / 0.06)" }}
                >
                  <div className="text-[12.5px] tnum">{d.date}</div>
                  <div className="flex items-center gap-2">
                    {d.note && (
                      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                        {d.note}
                      </span>
                    )}
                    <span
                      className="text-[10.5px] px-2 h-6 inline-flex items-center rounded-full font-medium"
                      style={{ background: ks.bg, color: ks.fg, border: `1px solid ${ks.border}` }}
                    >
                      {d.kind}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
            Public holidays are subject to official gazette notification. DSE reserves the right to
            declare emergency market closures.
          </div>
        </aside>
      </main>

      <ReportArchiveSection />

      <Footer />
    </div>
  );
}

/* ────────── Report Archive ──────────
 * NOTE: This list is a placeholder. It will be driven by a Payload CMS
 * 'reports' collection with fields: title, year, category, file_url, language.
 */
type ArchiveDoc = {
  title: string;
  file: string;
  year: number;
  category: string;
  language?: "English" | "বাংলা";
};
type ArchiveGroup = { id: string; title: string; items: ArchiveDoc[] };

const MONTHS: { m: string; y: number }[] = [
  { m: "June", y: 2026 }, { m: "May", y: 2026 }, { m: "April", y: 2026 },
  { m: "March", y: 2026 }, { m: "February", y: 2026 }, { m: "January", y: 2026 },
  { m: "December", y: 2025 }, { m: "November", y: 2025 }, { m: "October", y: 2025 },
  { m: "September", y: 2025 }, { m: "August", y: 2025 }, { m: "July", y: 2025 },
  { m: "June", y: 2025 }, { m: "May", y: 2025 }, { m: "April", y: 2025 },
  { m: "March", y: 2025 }, { m: "February", y: 2025 }, { m: "January", y: 2025 },
  { m: "December", y: 2024 }, { m: "November", y: 2024 }, { m: "October", y: 2024 },
  { m: "September", y: 2024 }, { m: "August", y: 2024 }, { m: "July", y: 2024 },
  { m: "June", y: 2024 }, { m: "May", y: 2024 }, { m: "April", y: 2024 },
  { m: "March", y: 2024 }, { m: "February", y: 2024 }, { m: "January", y: 2024 },
];

const ARCHIVE_GROUPS: ArchiveGroup[] = [
  {
    id: "archive-annual",
    title: "Annual Reports",
    items: [
      { title: "DSE Annual Report 2024–2025 (English)", file: "Annual_Report_2024-2025.pdf", year: 2025, category: "Annual Report", language: "English" },
      { title: "DSE Annual Report 2023–2024", file: "Annual_Report_2023-2024.pdf", year: 2024, category: "Annual Report" },
      { title: "DSE Annual Report 2022–2023", file: "Annual_Report_2022-2023.pdf", year: 2023, category: "Annual Report" },
      { title: "DSE Annual Report 2021–2022 (English)", file: "Annual_Report_2021-2022_EN.pdf", year: 2022, category: "Annual Report", language: "English" },
      { title: "DSE Annual Report 2021–2022 (বাংলা)", file: "Annual_Report_2021-2022_BN.pdf", year: 2022, category: "Annual Report", language: "বাংলা" },
      { title: "DSE Annual Report 2020–2021", file: "Annual_Report_2020-2021.pdf", year: 2021, category: "Annual Report" },
    ],
  },
  {
    id: "archive-monthly",
    title: "Monthly Market Review Archive",
    items: MONTHS.map((mm) => ({
      title: `Monthly Review — ${mm.m} ${mm.y}`,
      file: `monthly_${mm.m.toLowerCase()}_${mm.y}.pdf`,
      year: mm.y,
      category: "Monthly Review",
    })),
  },
];

const ARCHIVE_YEARS = [2026, 2025, 2024] as const;

function ReportArchiveSection() {
  const [year, setYear] = useState<number | "all">("all");

  return (
    <section
      id="report-archive"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pb-16 pt-4"
      data-cms-collection="reports"
    >
      <h2
        className="text-[22px] font-bold tracking-[-0.01em] mb-2"
        style={{ color: "#0B2545" }}
      >
        Report Archive
      </h2>
      <p className="text-[13px] mb-4" style={{ color: "#586068" }}>
        Monthly, weekly and annual reports. Document links will be connected to live files when the CMS is configured.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {(["all", ...ARCHIVE_YEARS] as const).map((y) => {
          const active = year === y;
          return (
            <button
              key={String(y)}
              onClick={() => setYear(y as number | "all")}
              className="px-3 py-1.5 text-[12px] font-semibold transition"
              style={{
                background: active ? "#0B2545" : "transparent",
                color: active ? "#ffffff" : "#586068",
                border: "1px solid " + (active ? "#0B2545" : "#E0E5EA"),
              }}
            >
              {y === "all" ? "All" : y}
            </button>
          );
        })}
      </div>

      <div className="space-y-10">
        {ARCHIVE_GROUPS.map((g) => {
          const items = year === "all" ? g.items : g.items.filter((it) => it.year === year);
          if (items.length === 0) return null;
          return (
            <div key={g.id} id={g.id} data-cms-group={g.id}>
              <h3
                className="text-[15px] font-semibold uppercase mb-3"
                style={{ color: "#0B2545", letterSpacing: "0.06em" }}
              >
                {g.title}
              </h3>
              <div style={{ border: "1px solid #E0E5EA", background: "#ffffff" }}>
                {items.map((it, i) => (
                  <div
                    key={it.file + it.title}
                    data-cms-record={it.file}
                    data-year={it.year}
                    className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-[#F4F7FA]"
                    style={{ borderTop: i === 0 ? "none" : "1px solid #E0E5EA" }}
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-[11px] font-semibold"
                      style={{ background: "#F4F7FA", color: "#0B2545" }}
                    >
                      PDF
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium" style={{ color: "#161A1F" }}>
                        {it.title}
                      </div>
                      <div className="text-[12px] mt-0.5" style={{ color: "#586068" }}>
                        {it.category} · {it.year}{it.language ? ` · ${it.language}` : ""}
                      </div>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 transition hover:bg-white"
                      style={{
                        color: "#185FA5",
                        border: "1px solid #E0E5EA",
                        background: "transparent",
                      }}
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

