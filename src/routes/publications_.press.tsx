import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, ChevronDown } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/publications_/press")({
  head: () => ({
    meta: [
      { title: "Press Release | Dhaka Stock Exchange" },
      { name: "description", content: "Press releases issued by the Dhaka Stock Exchange." },
      { property: "og:title", content: "Press Release — DSE" },
      { property: "og:description", content: "DSE press releases archive." },
    ],
  }),
  component: PressPage,
});

type Item = { title: string; date: string };
type Year = { year: number; items: Item[] };

const YEARS: Year[] = [
  {
    year: 2026,
    items: [
      { title: "DSE announces Q1 2026 market performance highlights", date: "Apr 18, 2026" },
      { title: "DSE inaugurates investor education program for NRBs", date: "Mar 02, 2026" },
      { title: "DSE signs MoU with regional exchange on data sharing", date: "Feb 11, 2026" },
    ],
  },
  {
    year: 2025,
    items: [
      { title: "DSE concludes annual general meeting for FY 2024-25", date: "Dec 20, 2025" },
      { title: "DSE launches new SME board listing initiative", date: "Aug 06, 2025" },
      { title: "DSE hosts workshop on sustainable green bonds", date: "May 14, 2025" },
    ],
  },
  {
    year: 2024,
    items: [
      { title: "DSE reports record annual turnover", date: "Dec 28, 2024" },
      { title: "DSE expands TREC holder training program", date: "Sep 10, 2024" },
    ],
  },
];

function YearBlock({ y }: { y: Year }) {
  const { t } = useLang();
  const [open, setOpen] = useState(y.year === 2026);
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-4 p-4 text-left">
        <span className="text-[15px] font-semibold" style={{ color: "var(--ink)" }}>{y.year}</span>
        <ChevronDown className="w-4 h-4 shrink-0 transition-transform" style={{ color: "var(--brand-600)", transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {open && (
        <div>
          {y.items.map((it) => (
            <a
              key={it.title}
              href="#"
              data-cms={`press.${y.year}.${it.title}`}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:opacity-80 transition"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
                <span className="text-[14px] truncate" style={{ color: "var(--ink)" }}>{t(it.title)}</span>
              </div>
              <span className="text-[12px] tnum shrink-0" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                {it.date}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function PressPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <TopBar />
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>{t("Publications")}</div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>{t("Press Release")}</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-3">
        {YEARS.map((y) => <YearBlock key={y.year} y={y} />)}
      </section>
      <Footer />
    </div>
  );
}
