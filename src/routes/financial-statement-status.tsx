import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/financial-statement-status")({
  head: () => ({
    meta: [
      { title: "Financial Statement Submission Status | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Submission status of audited financial statements by DSE-listed companies — searchable by company, period and status.",
      },
      { property: "og:title", content: "Financial Statement Submission Status | DSE" },
      { property: "og:description", content: "Track financial statement submissions on DSE." },
    ],
  }),
  component: FsStatusPage,
});

type Status = "In Process" | "Submitted" | "Delayed Submission" | "Non-Submission";

const SAMPLE: { company: string; code: string; fy: string; status: Status }[] = [
  { company: "Square Pharmaceuticals PLC", code: "SQURPHARMA", fy: "FY 2025-26", status: "Submitted" },
  { company: "Beximco Limited", code: "BEXIMCO", fy: "FY 2025-26", status: "In Process" },
  { company: "Renata PLC", code: "RENATA", fy: "FY 2024-25", status: "Delayed Submission" },
];

const STATUS_OPTIONS: ("All" | Status)[] = ["All", "In Process", "Submitted", "Delayed Submission", "Non-Submission"];

function FsStatusPage() {
  const { t } = useLang();
  const asOn = new Date().toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState<"All" | Status>("All");

  const rows = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return SAMPLE.filter((r) => {
      if (qq && !r.company.toLowerCase().includes(qq)) return false;
      if (status !== "All" && r.status !== status) return false;
      return true;
    });
  }, [q, status]);

  const fieldStyle = {
    background: "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: 2,
    color: "var(--ink)",
  } as const;

  const statusColor = (s: Status) =>
    s === "Submitted" ? "var(--green-up)"
    : s === "In Process" ? "var(--brand-600)"
    : s === "Delayed Submission" ? "#C97A1B"
    : "var(--red-down)";

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />

      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("Dhaka Stock Exchange")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Submission Status of Financial Statements as on")} {asOn}
          </h1>
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand-600)" }} />
            {t("as provided by DSE")}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <div className="grid gap-2 md:grid-cols-4">
          <div className="flex items-center gap-2 px-2.5 py-1.5" style={fieldStyle}>
            <Search className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("Search Company Name")}
              className="bg-transparent outline-none text-[13px] w-full"
              style={{ color: "var(--ink)" }}
            />
          </div>
          <label className="flex items-center gap-2 px-2.5 py-1.5 text-[13px]" style={fieldStyle}>
            <span className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{t("From")}</span>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="bg-transparent outline-none w-full" />
          </label>
          <label className="flex items-center gap-2 px-2.5 py-1.5 text-[13px]" style={fieldStyle}>
            <span className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{t("To")}</span>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="bg-transparent outline-none w-full" />
          </label>
          <label className="flex items-center gap-2 px-2.5 py-1.5 text-[13px]" style={fieldStyle}>
            <span className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{t("Status")}</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "All" | Status)}
              className="bg-transparent outline-none w-full"
              style={{ color: "var(--ink)" }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{t(s)}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="overflow-x-auto" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                {[t("Company"), t("Trade Code"), t("Financial Year"), t("Status")].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--line)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center" style={{ color: "var(--text-muted)" }}>
                    {t("No matching records.")}
                  </td>
                </tr>
              )}
              {rows.map((r, i) => (
                <tr key={r.code + r.fy} style={{
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                  borderTop: "1px solid var(--line)",
                }}>
                  <td className="px-3 py-2.5" style={{ color: "var(--ink)" }}>{r.company}</td>
                  <td className="px-3 py-2.5 tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>{r.code}</td>
                  <td className="px-3 py-2.5" style={{ color: "var(--text-secondary)" }}>{r.fy}</td>
                  <td className="px-3 py-2.5 font-semibold" style={{ color: statusColor(r.status) }}>{t(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
}
