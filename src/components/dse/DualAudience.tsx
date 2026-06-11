import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageContext";

type Column = {
  eyebrow: string;
  title: string;
  links: { label: string; sub: string; to: string }[];
};

const columns: Column[] = [
  {
    eyebrow: "For first-time investors",
    title: "Begin with the basics",
    links: [
      { label: "What is a stock?", sub: "5 min read", to: "/learn" },
      { label: "How to open a BO account", sub: "Step-by-step", to: "/learn" },
      { label: "Choosing a broker", sub: "TREC directory", to: "/members" },
      { label: "Investor glossary", sub: "80 terms A–Z", to: "/learn" },
      { label: "Investor protection fund", sub: "Your rights", to: "/learn" },
    ],
  },
  {
    eyebrow: "For active traders",
    title: "Go deeper into the data",
    links: [
      { label: "Equities screener", sub: "All listed companies", to: "/companies" },
      { label: "Sector heatmap", sub: "Updated daily", to: "/" },
      { label: "Index analytics", sub: "DSEX · DS30 · DSES", to: "/indices" },
      { label: "Historical OHLV", sub: "Downloadable archive", to: "/reports" },
      { label: "Circuit breaker list", sub: "Today's limits", to: "/reports" },
    ],
  },
];

export function DualAudience() {
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
            {t("Getting started")}
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {columns.map((col, i) => (
            <div
              key={col.eyebrow}
              className="p-5"
              style={{
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderLeft: i > 0 ? "none" : "1px solid var(--line)",
              }}
            >
              <div
                className="text-[10px] font-semibold uppercase mb-1"
                style={{ letterSpacing: "0.14em", color: "var(--brand)" }}
              >
                {t(col.eyebrow)}
              </div>
              <h3
                className="text-[16px] font-semibold mb-3"
                style={{ color: "var(--ink)" }}
              >
                {t(col.title)}
              </h3>

              <ul>
                {col.links.map((l, idx) => (
                  <li
                    key={l.label}
                    style={{
                      borderTop: idx === 0 ? "1px solid var(--line)" : "1px solid var(--line)",
                    }}
                  >
                    <Link
                      to={l.to}
                      className="flex items-center justify-between py-2 group"
                    >
                      <div>
                        <div className="text-[13px] font-medium" style={{ color: "var(--ink)" }}>
                          {t(l.label)}
                        </div>
                        <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                          {t(l.sub)}
                        </div>
                      </div>
                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        style={{ color: "var(--text-muted)" }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
