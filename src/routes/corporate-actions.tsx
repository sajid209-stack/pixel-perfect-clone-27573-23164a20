import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/corporate-actions")({
  head: () => ({
    meta: [
      { title: "Corporate Actions | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Dividends, AGM/EGM schedules, rights and bonus issues, record dates and disclosure documents.",
      },
      { property: "og:title", content: "Corporate Actions | DSE" },
      {
        property: "og:description",
        content: "Dividends, AGM/EGM, rights, bonus and record dates.",
      },
    ],
  }),
  component: CorporateActionsPage,
});

type ActionType = "Dividend" | "AGM/EGM" | "Rights" | "Record Date" | "Bonus/Split";
type TabId = "all" | ActionType;

type Action = {
  ticker: string;
  name: string;
  type: ActionType;
  figure: string; // dividend %, ratio etc.
  date: string; // primary event date
  recordDate: string;
  doc: string; // disclosure document URL (CMS-managed)
};

const ACTIONS: Action[] = [
  { ticker: "GRAMEENS", name: "Grameenphone", type: "Dividend", figure: "Cash 105% (final)", date: "2026-06-18", recordDate: "2026-05-15", doc: "#" },
  { ticker: "SQPHARMA", name: "Square Pharmaceuticals", type: "AGM/EGM", figure: "AGM · ICCB, Bashundhara · 11:00", date: "2026-06-25", recordDate: "2026-06-01", doc: "#" },
  { ticker: "RENATA", name: "Renata Limited", type: "Rights", figure: "1R:2 @ ৳120 (premium ৳110)", date: "2026-07-04", recordDate: "2026-06-10", doc: "#" },
  { ticker: "WALTONHIL", name: "Walton Hi-Tech", type: "Bonus/Split", figure: "10% stock dividend", date: "2026-06-22", recordDate: "2026-06-02", doc: "#" },
  { ticker: "BEXIMCO", name: "Beximco Limited", type: "Record Date", figure: "For interim dividend", date: "2026-06-15", recordDate: "2026-06-15", doc: "#" },
  { ticker: "BATBC", name: "British American Tobacco BD", type: "AGM/EGM", figure: "AGM · Krishibid Inst. · 10:00", date: "2026-06-20", recordDate: "2026-05-28", doc: "#" },
  { ticker: "BRACBANK", name: "BRAC Bank PLC", type: "AGM/EGM", figure: "EGM · Raowa Convention · 11:00", date: "2026-06-30", recordDate: "2026-06-05", doc: "#" },
  { ticker: "ROBI", name: "Robi Axiata", type: "Dividend", figure: "Cash 5% (interim)", date: "2026-06-16", recordDate: "2026-05-20", doc: "#" },
  { ticker: "ACMELAB", name: "ACME Laboratories", type: "Dividend", figure: "Cash 30%, Stock 5%", date: "2026-06-19", recordDate: "2026-05-30", doc: "#" },
  { ticker: "CITYBANK", name: "The City Bank PLC", type: "Rights", figure: "1R:3 @ ৳18", date: "2026-04-30", recordDate: "2026-04-08", doc: "#" },
  { ticker: "BERGERPBL", name: "Berger Paints", type: "Bonus/Split", figure: "5% stock dividend", date: "2026-05-18", recordDate: "2026-04-25", doc: "#" },
  { ticker: "MARICO", name: "Marico Bangladesh", type: "Dividend", figure: "Cash 500% (final)", date: "2026-05-22", recordDate: "2026-04-30", doc: "#" },
  { ticker: "OLYMPIC", name: "Olympic Industries", type: "AGM/EGM", figure: "AGM · Dhaka Club · 11:00", date: "2026-05-28", recordDate: "2026-05-05", doc: "#" },
  { ticker: "LHBL", name: "LafargeHolcim BD", type: "AGM/EGM", figure: "AGM · Virtual · 11:00", date: "2026-06-17", recordDate: "2026-05-22", doc: "#" },
  { ticker: "DUTCHBANGL", name: "Dutch-Bangla Bank", type: "Dividend", figure: "Cash 35% (final)", date: "2026-05-12", recordDate: "2026-04-18", doc: "#" },
];

function tagColor(t: ActionType) {
  switch (t) {
    case "Dividend":
      return { bg: "var(--green-up-light)", color: "var(--green-up)" };
    case "AGM/EGM":
      return { bg: "#DBEAFE", color: "#1E40AF" };
    case "Rights":
      return { bg: "#FCE7F3", color: "#9D174D" };
    case "Bonus/Split":
      return { bg: "#FEF3C7", color: "#92400E" };
    case "Record Date":
    default:
      return { bg: "var(--surface-2)", color: "var(--text-secondary)" };
  }
}

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Dividend", label: "Dividends" },
  { id: "AGM/EGM", label: "AGM / EGM" },
  { id: "Rights", label: "Right offers" },
  { id: "Record Date", label: "Record dates" },
  { id: "Bonus/Split", label: "Bonus / splits" },
];

function CorporateActionsPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<TabId>("all");
  const [q, setQ] = useState("");
  const [dir, setDir] = useState<"desc" | "asc">("desc");

  const rows = useMemo(() => {
    return ACTIONS.filter((a) => {
      if (tab !== "all" && a.type !== tab) return false;
      const term = q.trim().toLowerCase();
      if (term && !a.ticker.toLowerCase().includes(term) && !a.name.toLowerCase().includes(term)) return false;
      return true;
    }).sort((a, b) => (dir === "desc" ? (a.date < b.date ? 1 : -1) : a.date < b.date ? -1 : 1));
  }, [tab, q, dir]);

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      {/* Header */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}
          >
            {t("Dhaka Stock Exchange")}
          </div>
          <h1
            className="text-[28px] md:text-[34px] font-semibold tracking-tight leading-[1.1]"
            style={{ color: "var(--ink)" }}
          >
            {t("Corporate Actions")}
          </h1>
          <p
            className="mt-2 text-[13.5px] max-w-3xl"
            style={{ color: "var(--text-secondary)" }}
            data-cms="corporate-actions.intro"
          >
            {t(
              "Declared dividends, AGM/EGM schedules, rights and bonus issues, and record dates for all DSE-listed securities. Disclosure documents are linked where available.",
            )}
          </p>
          <div className="mt-3 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
            {t("Data as provided by DSE")} · {t("updated")} {new Date().toLocaleString()}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="inline-flex flex-wrap" style={{ border: "1px solid var(--line)", borderRadius: 2 }}>
            {TABS.map((tb, i) => {
              const active = tab === tb.id;
              return (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  className="px-3 h-8 text-[12px] font-semibold"
                  style={{
                    background: active ? "var(--brand-600)" : "transparent",
                    color: active ? "#fff" : "var(--ink)",
                    borderLeft: i !== 0 ? "1px solid var(--line)" : "none",
                  }}
                >
                  {t(tb.label)}
                </button>
              );
            })}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search by ticker or company…")}
            className="h-8 px-3 text-[13px] outline-none flex-1 min-w-[200px] max-w-[320px]"
            style={{
              border: "1px solid var(--line)",
              background: "var(--surface)",
              color: "var(--ink)",
            }}
          />
          <button
            onClick={() => setDir(dir === "desc" ? "asc" : "desc")}
            className="h-8 px-3 text-[12px] font-semibold"
            style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
          >
            {t("Date")} {dir === "desc" ? "↓" : "↑"}
          </button>
        </div>

        {/* Desktop table */}
        <div
          className="hidden md:block overflow-x-auto"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          <table className="w-full text-[13px]" style={{ minWidth: 820 }}>
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
                {[
                  { h: t("Company"), align: "left" as const },
                  { h: t("Action"), align: "left" as const },
                  { h: t("Key figures"), align: "left" as const },
                  { h: t("Date"), align: "right" as const },
                  { h: t("Record date"), align: "right" as const },
                  { h: t("Document"), align: "right" as const },
                ].map((c) => (
                  <th
                    key={c.h}
                    className="px-3 py-2 text-[11px] font-semibold uppercase"
                    style={{ textAlign: c.align, letterSpacing: "0.1em", color: "var(--text-secondary)" }}
                  >
                    {c.h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((a, i) => {
                const c = tagColor(a.type);
                return (
                  <tr
                    key={`${a.ticker}-${a.type}-${a.date}`}
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid var(--line)",
                      background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                    }}
                  >
                    <td className="px-3 py-2">
                      <Link
                        to="/company/$ticker"
                        params={{ ticker: a.ticker }}
                        className="hover:underline"
                        style={{ color: "var(--brand-600)" }}
                      >
                        <span className="font-bold tracking-wide">{a.ticker}</span>
                        <span className="ml-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>
                          {a.name}
                        </span>
                      </Link>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className="px-1.5 py-0.5 text-[11px] font-semibold uppercase"
                        style={{ background: c.bg, color: c.color, letterSpacing: "0.05em" }}
                      >
                        {a.type}
                      </span>
                    </td>
                    <td className="px-3 py-2" style={{ color: "var(--ink)" }}>
                      {a.figure}
                    </td>
                    <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>
                      {a.date}
                    </td>
                    <td
                      className="px-3 py-2 tnum text-right"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {a.recordDate}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <a
                        href={a.doc}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-[12px] font-semibold"
                        style={{ color: "var(--brand-600)" }}
                        data-cms={`corporate-actions.doc.${a.ticker}.${a.date}`}
                      >
                        {t("Disclosure")} ↗
                      </a>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-8 text-center text-[12.5px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("No corporate actions match your filters.")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-2">
          {rows.map((a) => {
            const c = tagColor(a.type);
            return (
              <div
                key={`${a.ticker}-${a.type}-${a.date}-m`}
                style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
                className="p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to="/company/$ticker"
                    params={{ ticker: a.ticker }}
                    className="hover:underline"
                    style={{ color: "var(--brand-600)" }}
                  >
                    <div className="font-bold tracking-wide text-[13px]">{a.ticker}</div>
                    <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                      {a.name}
                    </div>
                  </Link>
                  <span
                    className="px-1.5 py-0.5 text-[10.5px] font-semibold uppercase shrink-0"
                    style={{ background: c.bg, color: c.color, letterSpacing: "0.05em" }}
                  >
                    {a.type}
                  </span>
                </div>
                <div className="mt-2 text-[12.5px]" style={{ color: "var(--ink)" }}>
                  {a.figure}
                </div>
                <div
                  className="mt-2 grid grid-cols-2 gap-2 text-[11.5px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <div>
                    <div style={{ color: "var(--text-muted)" }}>{t("Date")}</div>
                    <div className="tnum" style={{ color: "var(--ink)" }}>{a.date}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)" }}>{t("Record date")}</div>
                    <div className="tnum">{a.recordDate}</div>
                  </div>
                </div>
                <a
                  href={a.doc}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-[12px] font-semibold hover:underline"
                  style={{ color: "var(--brand-600)" }}
                >
                  {t("Disclosure")} ↗
                </a>
              </div>
            );
          })}
          {rows.length === 0 && (
            <div
              className="p-6 text-center text-[12.5px]"
              style={{ color: "var(--text-muted)", border: "1px solid var(--line)" }}
            >
              {t("No corporate actions match your filters.")}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
