import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Weekly, monthly, and fortnightly publications, annual reports and major events from the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "Publications | DSE" },
      {
        property: "og:description",
        content: "DSE downloadable publications and reports archive.",
      },
    ],
  }),
  component: PublicationsPage,
});

type Item = { title: string; date: string; size: string; url?: string };
type Section = { key: string; title: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    key: "weekly",
    title: "Weekly review",
    items: [
      { title: "Weekly Market Review — Week 24, 2026", date: "Jun 12, 2026", size: "1.8 MB" },
      { title: "Weekly Market Review — Week 23, 2026", date: "Jun 05, 2026", size: "1.7 MB" },
      { title: "Weekly Market Review — Week 22, 2026", date: "May 29, 2026", size: "1.9 MB" },
      { title: "Weekly Market Review — Week 21, 2026", date: "May 22, 2026", size: "1.6 MB" },
    ],
  },
  {
    key: "monthly",
    title: "Monthly review",
    items: [
      { title: "Monthly Review — May 2026", date: "Jun 03, 2026", size: "4.2 MB" },
      { title: "Monthly Review — April 2026", date: "May 04, 2026", size: "4.0 MB" },
      { title: "Monthly Review — March 2026", date: "Apr 02, 2026", size: "3.9 MB" },
    ],
  },
  {
    key: "fortnightly",
    title: "Fortnightly Capital Market magazine",
    items: [
      { title: "Capital Market — Vol 18, Issue 12", date: "Jun 15, 2026", size: "6.1 MB" },
      { title: "Capital Market — Vol 18, Issue 11", date: "Jun 01, 2026", size: "5.8 MB" },
      { title: "Capital Market — Vol 18, Issue 10", date: "May 15, 2026", size: "5.9 MB" },
    ],
  },
  {
    key: "events",
    title: "Major events",
    items: [
      { title: "DSE Investor Awareness Programme 2026", date: "May 20, 2026", size: "2.4 MB" },
      { title: "Listed Companies Conference 2026", date: "Apr 12, 2026", size: "3.1 MB" },
      { title: "Bond Market Roundtable Proceedings", date: "Feb 25, 2026", size: "2.0 MB" },
    ],
  },
  {
    key: "annual",
    title: "Annual reports",
    items: [
      { title: "DSE Annual Report 2025", date: "Mar 30, 2026", size: "18.4 MB" },
      { title: "DSE Annual Report 2024", date: "Mar 28, 2025", size: "17.6 MB" },
      { title: "DSE Annual Report 2023", date: "Mar 30, 2024", size: "16.9 MB" },
    ],
  },
];

function PublicationsPage() {
  const { t } = useLang();
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <TopBar />
      <Nav />

      <main className="flex-1">
        <section className="max-w-[1180px] mx-auto px-4 pt-8 pb-4">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.12em", color: "var(--text-secondary)" }}
          >
            {t("Publications")}
          </div>
          <h1
            className="text-[28px] md:text-[34px] font-semibold tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            {t("DSE publications & archive")}
          </h1>
          <p
            className="mt-3 max-w-[760px] text-[14px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            data-cms="publications.intro"
          >
            {t(
              "Browse the Dhaka Stock Exchange's weekly and monthly market reviews, the fortnightly Capital Market magazine, proceedings from major events, and historical annual reports. All documents are free to download.",
            )}
          </p>
          <div
            className="mt-3 text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            {t("Documents managed by DSE Research & Publications")}
          </div>
        </section>

        <section className="max-w-[1180px] mx-auto px-4 pb-10 grid gap-5 md:grid-cols-2">
          {SECTIONS.map((s) => (
            <PublicationCard key={s.key} section={s} />
          ))}
        </section>

        <section className="max-w-[1180px] mx-auto px-4 pb-16">
          <SubscribeCard />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PublicationCard({ section }: { section: Section }) {
  const { t } = useLang();
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid var(--line)",
      }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}
      >
        <h2 className="text-[14px] font-semibold" style={{ color: "var(--ink)" }}>
          {t(section.title)}
        </h2>
        <span className="text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
          {section.items.length} {t("items")}
        </span>
      </div>
      <ul>
        {section.items.map((it, i) => (
          <li
            key={it.title}
            className="px-4 py-3 flex items-start gap-3 hover:bg-[var(--surface-2)] transition"
            style={{ borderTop: i > 0 ? "1px solid var(--line)" : "none" }}
            data-cms={`publications.${section.key}.${i}`}
          >
            <FileText className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--brand)" }} />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium" style={{ color: "var(--ink)" }}>
                {t(it.title)}
              </div>
              <div className="text-[11px] mt-0.5 tnum" style={{ color: "var(--text-muted)" }}>
                {it.date} · PDF · {it.size}
              </div>
            </div>
            <a
              href={it.url ?? "#"}
              className="shrink-0 inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold"
              style={{
                background: "var(--surface-2)",
                color: "var(--brand)",
                border: "1px solid var(--line)",
              }}
            >
              <Download className="w-3 h-3" /> {t("Download")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubscribeCard() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pub, setPub] = useState("weekly");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = t("Please enter your name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = t("Please enter a valid email");
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="px-6 py-8 flex items-start gap-3"
        style={{
          background: "#ffffff",
          border: "1px solid var(--line)",
        }}
      >
        <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--green-up)" }} />
        <div>
          <div className="text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
            {t("You're subscribed")}
          </div>
          <div className="text-[13px] mt-1" style={{ color: "var(--text-secondary)" }}>
            {t("We'll email new DSE publications to")} <strong>{email}</strong>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="px-5 py-6 md:px-6 md:py-7"
      style={{
        background: "#ffffff",
        border: "1px solid var(--line)",
      }}
    >
      <div
        className="text-[11px] font-semibold uppercase mb-1"
        style={{ letterSpacing: "0.12em", color: "var(--text-secondary)" }}
      >
        {t("Stay updated")}
      </div>
      <h2 className="text-[18px] font-semibold" style={{ color: "var(--ink)" }}>
        {t("Subscribe to publication alerts")}
      </h2>
      <p className="text-[12px] mt-1 mb-5" style={{ color: "var(--text-muted)" }}>
        {t("Get an email when a new edition is published.")}
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label={t("Name")} error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="w-full px-3 py-2 text-[13px] outline-none focus:border-[var(--brand)]"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)" }}
          />
        </Field>
        <Field label={t("Email")} error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            className="w-full px-3 py-2 text-[13px] outline-none focus:border-[var(--brand)]"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)" }}
          />
        </Field>
        <Field label={t("Publication")}>
          <select
            value={pub}
            onChange={(e) => setPub(e.target.value)}
            className="w-full px-3 py-2 text-[13px] outline-none focus:border-[var(--brand)]"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)" }}
          >
            <option value="weekly">{t("Weekly review")}</option>
            <option value="monthly">{t("Monthly review")}</option>
            <option value="fortnightly">{t("Fortnightly Capital Market magazine")}</option>
            <option value="annual">{t("Annual reports")}</option>
            <option value="all">{t("All publications")}</option>
          </select>
        </Field>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 text-[13px] font-semibold"
          style={{ background: "var(--brand)", color: "#ffffff" }}
        >
          {t("Subscribe")}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-[11px] font-semibold uppercase mb-1" style={{ letterSpacing: "0.08em", color: "var(--text-secondary)" }}>
        {label}
      </div>
      {children}
      {error && (
        <div className="text-[11px] mt-1" style={{ color: "var(--red-down)" }}>
          {error}
        </div>
      )}
    </label>
  );
}
