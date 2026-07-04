import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
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

type YearKey = "2026" | "2025" | "2024" | "2023" | "2022" | "2017-2021";

const YEAR_TABS: { key: YearKey; label: string }[] = [
  { key: "2026", label: "Auditor's Opinion and Others: 2026" },
  { key: "2025", label: "Auditor's Opinion and Others: 2025" },
  { key: "2024", label: "Auditor's Opinion and Others: 2024" },
  { key: "2023", label: "Auditor's Opinion and Others: 2023" },
  { key: "2022", label: "Auditor's Opinion and Others: 2022" },
  { key: "2017-2021", label: "Auditor's Opinion and Others: 2017 - 2021" },
];

// SAMPLE — replace with real document registry
const ENTRIES: Record<YearKey, string[]> = {
  "2026": [
    `Status of IPO (Initial Public Offering) Proceeds utilization statement of Aman Cotton Fibrous PLC. for the month of 30th April, 2026.`,
    `Status of RPO (Repeat Public Offering) Proceeds utilization statement of BSCCL for the quarter ended on 31st March, 2026.`,
    `"Qualified Opinion" and "Emphasis of Matter" paragraph of Uttara Finance and Investments Limited for the year ended on 31 December 2025.`,
    `"Emphasis of Matter" paragraph of Beximco Limited for the year ended on 30 June 2025.`,
    `"Material Uncertainty Related to Going Concern" paragraph of Apex Weaving & Finishing Mills Limited for the year ended on 30 June 2025.`,
    `Status of Rights Share Proceeds utilization statement of The City Bank PLC for the quarter ended on 31st March, 2026.`,
    `"Other Matter" paragraph of ICB Islamic Bank Limited for the year ended on 31 December 2025.`,
    `"Qualified Opinion" paragraph of Meghna Petroleum Limited for the year ended on 30 June 2025.`,
    `Status of IPO Proceeds utilization statement of Walton Hi-Tech Industries PLC. for the month of 31st March, 2026.`,
    `"Emphasis of Matter" paragraph of Renata Limited for the year ended on 31 December 2025.`,
    `Status of Rights Share Proceeds utilization statement of Southeast Bank PLC for the quarter ended on 31st March, 2026.`,
    `"Disclaimer of Opinion" paragraph of Familytex (BD) Limited for the year ended on 30 June 2025.`,
    `"Adverse Opinion" paragraph of Jute Spinners Limited for the year ended on 30 June 2025.`,
    `Status of RPO Proceeds utilization statement of Grameenphone Limited for the quarter ended on 31st March, 2026.`,
    `"Qualified Opinion" paragraph of Rangpur Foundry Limited for the year ended on 30 June 2025.`,
    `Status of IPO Proceeds utilization statement of Robi Axiata Limited for the month of 31st March, 2026.`,
    `"Emphasis of Matter" paragraph of Square Pharmaceuticals PLC for the year ended on 31 March 2026.`,
    `Status of IPO Proceeds utilization statement of Energypac Power Generation PLC. for the quarter ended on 31st March, 2026.`,
  ],
  "2025": [
    `"Qualified Opinion" and "Emphasis of Matter" paragraph of Uttara Finance and Investments Limited for the year ended on 31 December 2024.`,
    `Status of IPO Proceeds utilization statement of Walton Hi-Tech Industries PLC. for the month of 31st December, 2025.`,
    `"Emphasis of Matter" paragraph of Beximco Limited for the year ended on 30 June 2024.`,
    `Status of Rights Share Proceeds utilization statement of The City Bank PLC for the quarter ended on 31st December, 2025.`,
    `"Adverse Opinion" paragraph of Familytex (BD) Limited for the year ended on 30 June 2024.`,
    `Status of RPO Proceeds utilization statement of BSCCL for the quarter ended on 31st December, 2025.`,
    `"Qualified Opinion" paragraph of Meghna Petroleum Limited for the year ended on 30 June 2024.`,
    `Status of IPO Proceeds utilization statement of Energypac Power Generation PLC. for the quarter ended on 31st December, 2025.`,
  ],
  "2024": [
    `"Qualified Opinion" paragraph of ICB Islamic Bank Limited for the year ended on 31 December 2023.`,
    `Status of IPO Proceeds utilization statement of Robi Axiata Limited for the quarter ended on 30th September, 2024.`,
    `"Emphasis of Matter" paragraph of Renata Limited for the year ended on 31 December 2023.`,
    `Status of Rights Share Proceeds utilization statement of Southeast Bank PLC for the quarter ended on 30th September, 2024.`,
    `"Material Uncertainty Related to Going Concern" paragraph of Apex Weaving & Finishing Mills Limited for the year ended on 30 June 2023.`,
    `Status of RPO Proceeds utilization statement of Grameenphone Limited for the quarter ended on 30th September, 2024.`,
    `"Disclaimer of Opinion" paragraph of Jute Spinners Limited for the year ended on 30 June 2023.`,
    `"Qualified Opinion" paragraph of Rangpur Foundry Limited for the year ended on 30 June 2023.`,
  ],
  "2023": [
    `"Qualified Opinion" and "Emphasis of Matter" paragraph of Uttara Finance and Investments Limited for the year ended on 31 December 2022.`,
    `Status of IPO Proceeds utilization statement of Walton Hi-Tech Industries PLC. for the quarter ended on 30th September, 2023.`,
    `"Emphasis of Matter" paragraph of Beximco Limited for the year ended on 30 June 2022.`,
    `Status of Rights Share Proceeds utilization statement of The City Bank PLC for the quarter ended on 30th September, 2023.`,
    `"Adverse Opinion" paragraph of Familytex (BD) Limited for the year ended on 30 June 2022.`,
    `Status of RPO Proceeds utilization statement of BSCCL for the quarter ended on 30th September, 2023.`,
    `"Qualified Opinion" paragraph of Meghna Petroleum Limited for the year ended on 30 June 2022.`,
    `Status of IPO Proceeds utilization statement of Energypac Power Generation PLC. for the quarter ended on 30th September, 2023.`,
  ],
  "2022": [
    `"Qualified Opinion" paragraph of ICB Islamic Bank Limited for the year ended on 31 December 2021.`,
    `Status of IPO Proceeds utilization statement of Robi Axiata Limited for the quarter ended on 30th September, 2022.`,
    `"Emphasis of Matter" paragraph of Renata Limited for the year ended on 31 December 2021.`,
    `Status of Rights Share Proceeds utilization statement of Southeast Bank PLC for the quarter ended on 30th September, 2022.`,
    `"Material Uncertainty Related to Going Concern" paragraph of Apex Weaving & Finishing Mills Limited for the year ended on 30 June 2021.`,
    `Status of RPO Proceeds utilization statement of Grameenphone Limited for the quarter ended on 30th September, 2022.`,
    `"Disclaimer of Opinion" paragraph of Jute Spinners Limited for the year ended on 30 June 2021.`,
    `"Qualified Opinion" paragraph of Rangpur Foundry Limited for the year ended on 30 June 2021.`,
  ],
  "2017-2021": [
    `"Qualified Opinion" paragraph of Uttara Finance and Investments Limited for the year ended on 31 December 2020.`,
    `Status of IPO Proceeds utilization statement of Walton Hi-Tech Industries PLC. for the quarter ended on 31st December, 2020.`,
    `"Emphasis of Matter" paragraph of Beximco Limited for the year ended on 30 June 2019.`,
    `Status of Rights Share Proceeds utilization statement of The City Bank PLC for the quarter ended on 31st December, 2019.`,
    `"Adverse Opinion" paragraph of Familytex (BD) Limited for the year ended on 30 June 2018.`,
    `Status of RPO Proceeds utilization statement of BSCCL for the quarter ended on 31st December, 2018.`,
    `"Qualified Opinion" paragraph of Meghna Petroleum Limited for the year ended on 30 June 2017.`,
    `Status of IPO Proceeds utilization statement of Energypac Power Generation PLC. for the quarter ended on 31st December, 2017.`,
  ],
};

function AuditorsOpinionPage() {
  const [year, setYear] = useState<YearKey>("2026");
  const [q, setQ] = useState("");

  const entries = useMemo(() => {
    const list = ENTRIES[year];
    const needle = q.trim().toLowerCase();
    if (!needle) return list;
    return list.filter((e) => e.toLowerCase().includes(needle));
  }, [year, q]);

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
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Mobile pills */}
        <div className="md:hidden flex flex-wrap gap-1.5 mb-4">
          {YEAR_TABS.map((t) => {
            const active = t.key === year;
            return (
              <button
                key={t.key}
                onClick={() => setYear(t.key)}
                className="px-2.5 h-7 text-[11.5px] rounded-full"
                style={{
                  border: "1px solid var(--line)",
                  background: active ? "var(--brand-600)" : "var(--surface)",
                  color: active ? "#fff" : "var(--ink)",
                }}
              >
                {t.label.replace("Auditor's Opinion and Others: ", "")}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-6">
          {/* Desktop vertical tab list */}
          <aside
            className="hidden md:block h-fit"
            style={{ border: "1px solid var(--line)", background: "var(--surface)", borderRadius: 2 }}
          >
            <ul>
              {YEAR_TABS.map((t, i) => {
                const active = t.key === year;
                return (
                  <li key={t.key}>
                    <button
                      onClick={() => setYear(t.key)}
                      className="w-full text-left px-3 py-2 text-[12.5px]"
                      style={{
                        borderTop: i === 0 ? "none" : "1px solid var(--line)",
                        background: active ? "var(--brand-600)" : "transparent",
                        color: active ? "#fff" : "var(--ink)",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {t.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search within this year…"
              className="h-9 px-3 text-[13px] outline-none w-full max-w-[420px] mb-4"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--ink)",
                borderRadius: 2,
              }}
            />

            <div
              style={{ border: "1px solid var(--line)", background: "var(--surface)", borderRadius: 2 }}
            >
              <ul>
                {entries.map((text, i) => (
                  <li
                    key={i}
                    style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
                  >
                    <a
                      href="#"
                      className="flex items-start gap-2.5 px-3 py-2.5 group"
                      style={{ color: "var(--ink)" }}
                    >
                      <FileText
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: "var(--brand-600)" }}
                      />
                      <span
                        className="text-[13px] leading-[1.55] group-hover:underline"
                        style={{ color: "var(--ink)" }}
                      >
                        {text}
                      </span>
                    </a>
                  </li>
                ))}
                {entries.length === 0 && (
                  <li className="px-3 py-6 text-center text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
                    No documents match your search.
                  </li>
                )}
              </ul>
            </div>

            <p className="mt-3 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
              Sample entries for demonstration — document PDFs will be linked from the DSE registry.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
