import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, ChevronDown } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/publications_/monthly")({
  head: () => ({
    meta: [
      { title: "Monthly Reviews & Graphs | Dhaka Stock Exchange" },
      { name: "description", content: "Monthly market reviews and graphs published by the Dhaka Stock Exchange." },
      { property: "og:title", content: "Monthly Reviews & Graphs — DSE" },
      { property: "og:description", content: "Monthly reviews archive." },
    ],
  }),
  component: MonthlyPage,
});

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const YEARS: { year: number; through?: number }[] = [
  { year: 2026, through: 6 },
  { year: 2025 },
  { year: 2024 },
];

function YearBlock({ y }: { y: { year: number; through?: number } }) {
  const { t } = useLang();
  const [open, setOpen] = useState(y.year === 2026);
  const months = MONTHS.slice(0, y.through ?? 12);
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-4 p-4 text-left">
        <span className="text-[15px] font-semibold" style={{ color: "var(--ink)" }}>{y.year}</span>
        <ChevronDown className="w-4 h-4 shrink-0 transition-transform" style={{ color: "var(--brand-600)", transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {open && (
        <div className="border-t" style={{ borderColor: "var(--line)" }}>
          {months.map((m) => (
            <a
              key={m}
              href="#"
              data-cms={`monthly.${y.year}.${m.toLowerCase()}`}
              className="flex items-center gap-3 px-4 py-3 hover:opacity-80 transition"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
              <span className="text-[14px]" style={{ color: "var(--ink)" }}>
                {t("Monthly Review")} {m} {y.year}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MonthlyPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>{t("Publications")}</div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>{t("Monthly Reviews & Graphs")}</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-3">
        {YEARS.map((y) => <YearBlock key={y.year} y={y} />)}
      </section>
      <Footer />
    </div>
  );
}
