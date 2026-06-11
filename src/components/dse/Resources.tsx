import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const reports = [
  { date: "Jun 04", title: "Daily market summary", size: "1.2 MB", tag: "Daily" },
  { date: "May 30", title: "Weekly bulletin · Wk 22", size: "3.8 MB", tag: "Weekly" },
  { date: "May 31", title: "Monthly digest · May 2026", size: "6.4 MB", tag: "Monthly" },
  { date: "May 28", title: "Quarterly review · Q1 2026", size: "8.1 MB", tag: "Quarterly" },
  { date: "May 15", title: "Foreign investor flow report", size: "2.4 MB", tag: "Special" },
];

export function Resources() {
  const { t } = useLang();
  return (
    <section className="home-section">
      <div className="max-w-[1180px] mx-auto">
        <div
          className="flex items-center justify-between gap-4 mb-3 pb-2 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div
            className="text-[11px] font-semibold uppercase"
            style={{ letterSpacing: "0.12em", color: "var(--text-secondary)" }}
          >
            {t("Reports & tools")}
          </div>
          <Link
            to="/reports"
            className="text-[11px] font-semibold inline-flex items-center gap-1"
            style={{ color: "var(--brand)" }}
          >
            {t("Browse archive")} <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--line)",
          }}
        >
          <table className="w-full text-[13px]">
            <thead>
              <tr
                style={{
                  background: "var(--brand)",
                  color: "#ffffff",
                }}
              >
                <th className="text-left px-3 py-2 font-semibold text-[11px] uppercase tracking-wider w-[80px]">{t("Date")}</th>
                <th className="text-left px-3 py-2 font-semibold text-[11px] uppercase tracking-wider">{t("Document")}</th>
                <th className="text-left px-3 py-2 font-semibold text-[11px] uppercase tracking-wider w-[100px]">{t("Type")}</th>
                <th className="text-right px-3 py-2 font-semibold text-[11px] uppercase tracking-wider w-[100px]">{t("Size")}</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <tr
                  key={r.title}
                  style={{
                    borderTop: i > 0 ? "1px solid var(--line)" : "none",
                  }}
                  className="hover:bg-[var(--surface-2)] transition"
                >
                  <td className="px-3 py-2.5 tnum text-[12px]" style={{ color: "var(--text-muted)" }}>{r.date}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2" style={{ color: "var(--ink)" }}>
                      <FileText className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--brand)" }} />
                      <span className="font-medium">{t(r.title)}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[12px]" style={{ color: "var(--text-secondary)" }}>{t(r.tag)}</td>
                  <td className="px-3 py-2.5 text-right">
                    <span
                      className="inline-block px-2 py-0.5 text-[11px] tnum font-semibold"
                      style={{
                        background: "var(--surface-2)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      PDF · {r.size}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
