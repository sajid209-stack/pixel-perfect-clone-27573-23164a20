import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/filings_/auditors-opinion")({
  head: () => ({
    meta: [
      { title: "Auditor's Opinion and Others | DSE" },
      { name: "description", content: "Auditor's report notices and IPO/RPO/Rights proceeds-utilisation statements by year." },
      { property: "og:title", content: "Auditor's Opinion and Others — DSE" },
      { property: "og:description", content: "Auditor's report notices and proceeds-utilisation statements by year." },
    ],
  }),
  component: AuditorsOpinionPage,
});

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021] as const;

const CATEGORIES = [
  "Qualified Opinion",
  "Basis for Qualified Opinion",
  "Emphasis of Matter",
  "Other Matter",
  "Material Uncertainty Related to Going Concern",
  "Adverse Opinion",
  "Disclaimer of Opinion",
] as const;

function AuditorsOpinionPage() {
  const [year, setYear] = useState<(typeof YEARS)[number]>(2026);
  const [cat, setCat] = useState<string>("All");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Disclosures & Filings
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Auditor's Opinion and Others
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Auditor's report notices and IPO/RPO/Rights proceeds-utilisation statements by year.
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="inline-flex flex-wrap" style={{ border: "1px solid var(--line)", borderRadius: 2 }}>
          {YEARS.map((y, i) => {
            const active = y === year;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                className="px-3 h-8 text-[12px] font-semibold"
                style={{
                  background: active ? "var(--brand-600)" : "transparent",
                  color: active ? "#fff" : "var(--ink)",
                  borderLeft: i !== 0 ? "1px solid var(--line)" : "none",
                }}
              >
                {y}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="px-2.5 h-7 text-[11.5px] rounded-full"
                style={{
                  border: "1px solid var(--line)",
                  background: active ? "var(--brand-600)" : "var(--surface)",
                  color: active ? "#fff" : "var(--ink)",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div
          className="mt-5 rounded-md overflow-hidden"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
          data-cms={`filings.auditors-opinion.${year}`}
        >
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ background: "var(--bg)" }}>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Date</th>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Company</th>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Category</th>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Notice</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="px-3 py-2 tnum" style={{ color: "var(--ink)" }}>—</td>
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>—</td>
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>—</td>
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Placeholder rows shown. Notices will be wired to the official DSE feed.
        </p>
      </section>
      <Footer />
    </div>
  );
}
