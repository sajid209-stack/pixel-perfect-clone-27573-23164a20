import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, ChevronDown, CheckCircle2 } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/publications_/fortnightly")({
  head: () => ({
    meta: [
      { title: "Fortnightly Capital Market | Dhaka Stock Exchange" },
      { name: "description", content: "Fortnightly Capital Market publication issues from DSE and subscription form." },
      { property: "og:title", content: "Fortnightly Capital Market — DSE" },
      { property: "og:description", content: "Fortnightly issues and subscription." },
    ],
  }),
  component: FortnightlyPage,
});

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const YEARS: { year: number; through?: number }[] = [
  { year: 2026, through: 6 },
  { year: 2025 },
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
        <div>
          {months.map((m) => (
            <a
              key={m}
              href="#"
              data-cms={`fortnightly.${y.year}.${m.toLowerCase()}`}
              className="flex items-center gap-3 px-4 py-3 hover:opacity-80 transition"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
              <span className="text-[14px]" style={{ color: "var(--ink)" }}>
                {t("Fortnightly Capital Market")} - {m} {y.year}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function SubscriptionForm() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({ name: "", email: "", publication: "Fortnightly Capital Market" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) return;
    setSent(true);
  };
  if (sent) {
    return (
      <div
        className="p-6 flex items-start gap-3"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
      >
        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--brand-600)" }} />
        <div>
          <div className="text-[15px] font-semibold" style={{ color: "var(--ink)" }}>{t("Subscription received")}</div>
          <p className="text-[13.5px] mt-1" style={{ color: "var(--text-secondary)" }}>
            {t("We'll email you when the next issue is published.")}
          </p>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
      <h2 className="text-[18px] font-semibold" style={{ color: "var(--ink)" }}>{t("Subscription Form")}</h2>
      {(["name","email"] as const).map((f) => (
        <div key={f}>
          <label className="block text-[12px] font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: "var(--text-secondary)" }}>
            {t(f === "name" ? "Name" : "Email")}
          </label>
          <input
            required
            type={f === "email" ? "email" : "text"}
            maxLength={f === "email" ? 255 : 100}
            value={data[f]}
            onChange={(e) => setData({ ...data, [f]: e.target.value })}
            className="w-full px-3 py-2 text-[14px] outline-none"
            style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 2, color: "var(--ink)" }}
          />
        </div>
      ))}
      <div>
        <label className="block text-[12px] font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: "var(--text-secondary)" }}>
          {t("Publication")}
        </label>
        <select
          value={data.publication}
          onChange={(e) => setData({ ...data, publication: e.target.value })}
          className="w-full px-3 py-2 text-[14px] outline-none"
          style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 2, color: "var(--ink)" }}
        >
          <option>Fortnightly Capital Market</option>
          <option>Monthly Review</option>
          <option>Weekly Report</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
        style={{ background: "var(--brand)", color: "#fff", borderRadius: 2 }}
      >
        {t("Subscribe")}
      </button>
    </form>
  );
}

function FortnightlyPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <TopBar />
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>{t("Publications")}</div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>{t("Fortnightly Capital Market")}</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-6">
        <div className="space-y-3">
          {YEARS.map((y) => <YearBlock key={y.year} y={y} />)}
        </div>
        <SubscriptionForm />
      </section>
      <Footer />
    </div>
  );
}
