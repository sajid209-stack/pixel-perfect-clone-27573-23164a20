import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/corporate-actions")({
  head: () => ({
    meta: [
      { title: "Corporate Actions | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "AGM/EGM schedules, record dates, and declared dividends, rights and bonus issues on the DSE.",
      },
      { property: "og:title", content: "Corporate Actions | DSE" },
      {
        property: "og:description",
        content: "AGM/EGM, record dates, dividends, rights and bonus issues.",
      },
    ],
  }),
  component: CorporateActionsPage,
});

type EventType = "AGM" | "EGM" | "Record Date" | "Dividend" | "Rights" | "Bonus";
type Tab = "upcoming" | "week" | "past";

type Action = {
  ticker: string;
  name: string;
  event: EventType;
  date: string; // ISO
  recordDate: string;
  detail: string;
};

const EVENT_TYPES: EventType[] = ["AGM", "EGM", "Record Date", "Dividend", "Rights", "Bonus"];

const ACTIONS: Action[] = [
  { ticker: "BATBC", name: "British American Tobacco BD", event: "AGM", date: "2026-06-20", recordDate: "2026-05-28", detail: "Krishibid Inst., Farmgate · 10:00" },
  { ticker: "GRAMEENS", name: "Grameenphone", event: "Dividend", date: "2026-06-18", recordDate: "2026-05-15", detail: "Cash 105% (final)" },
  { ticker: "SQPHARMA", name: "Square Pharmaceuticals", event: "AGM", date: "2026-06-25", recordDate: "2026-06-01", detail: "ICCB, Bashundhara · 11:00" },
  { ticker: "WALTONHIL", name: "Walton Hi-Tech", event: "Bonus", date: "2026-06-22", recordDate: "2026-06-02", detail: "10% stock dividend" },
  { ticker: "RENATA", name: "Renata Limited", event: "Rights", date: "2026-07-04", recordDate: "2026-06-10", detail: "1R:2 at ৳120 (premium ৳110)" },
  { ticker: "BRACBANK", name: "BRAC Bank PLC", event: "EGM", date: "2026-06-30", recordDate: "2026-06-05", detail: "Raowa Convention · 11:00" },
  { ticker: "BEXIMCO", name: "Beximco Limited", event: "Record Date", date: "2026-06-15", recordDate: "2026-06-15", detail: "For interim dividend" },
  { ticker: "ROBI", name: "Robi Axiata", event: "Dividend", date: "2026-06-16", recordDate: "2026-05-20", detail: "Cash 5% (interim)" },
  { ticker: "LHBL", name: "LafargeHolcim BD", event: "AGM", date: "2026-06-17", recordDate: "2026-05-22", detail: "Virtual platform · 11:00" },
  { ticker: "ACMELAB", name: "ACME Laboratories", event: "Dividend", date: "2026-06-19", recordDate: "2026-05-30", detail: "Cash 30%, Stock 5%" },
  // Past
  { ticker: "OLYMPIC", name: "Olympic Industries", event: "AGM", date: "2026-05-28", recordDate: "2026-05-05", detail: "Dhaka Club · 11:00" },
  { ticker: "MARICO", name: "Marico Bangladesh", event: "Dividend", date: "2026-05-22", recordDate: "2026-04-30", detail: "Cash 500% (final)" },
  { ticker: "BERGERPBL", name: "Berger Paints", event: "Bonus", date: "2026-05-18", recordDate: "2026-04-25", detail: "5% stock dividend" },
  { ticker: "DUTCHBANGL", name: "Dutch-Bangla Bank", event: "AGM", date: "2026-05-12", recordDate: "2026-04-18", detail: "RAOWA · 11:00" },
  { ticker: "CITYBANK", name: "The City Bank PLC", event: "Rights", date: "2026-04-30", recordDate: "2026-04-08", detail: "1R:3 at ৳18" },
];

const TODAY = new Date("2026-06-13");
const WEEK_END = new Date(TODAY.getTime() + 7 * 86400000);

function eventColor(e: EventType) {
  switch (e) {
    case "AGM":
    case "EGM":
      return { bg: "#DBEAFE", color: "#1E40AF" };
    case "Dividend":
      return { bg: "var(--green-up-light)", color: "var(--green-up)" };
    case "Bonus":
      return { bg: "#FEF3C7", color: "#92400E" };
    case "Rights":
      return { bg: "#FCE7F3", color: "#9D174D" };
    case "Record Date":
    default:
      return { bg: "var(--surface-2)", color: "var(--text-secondary)" };
  }
}

function CorporateActionsPage() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [q, setQ] = useState("");
  const [activeTypes, setActiveTypes] = useState<Set<EventType>>(new Set());

  const filtered = useMemo(() => {
    return ACTIONS.filter((a) => {
      const d = new Date(a.date);
      if (tab === "upcoming" && d < TODAY) return false;
      if (tab === "past" && d >= TODAY) return false;
      if (tab === "week" && (d < TODAY || d > WEEK_END)) return false;
      if (activeTypes.size > 0 && !activeTypes.has(a.event)) return false;
      const term = q.trim().toLowerCase();
      if (term && !a.ticker.toLowerCase().includes(term) && !a.name.toLowerCase().includes(term)) {
        return false;
      }
      return true;
    }).sort((a, b) => (a.date < b.date ? (tab === "past" ? 1 : -1) : tab === "past" ? -1 : 1));
  }, [tab, q, activeTypes]);

  const toggleType = (t: EventType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "upcoming", label: "Upcoming" },
    { id: "week", label: "This week" },
    { id: "past", label: "Past" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <TopBar />
      <Nav />

      {/* Header */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}
          >
            Dhaka Stock Exchange
          </div>
          <h1
            className="text-[28px] md:text-[34px] font-semibold tracking-tight leading-[1.1]"
            style={{ color: "var(--ink)" }}
          >
            Corporate Actions
          </h1>
          <p className="mt-2 text-[13.5px]" style={{ color: "var(--text-secondary)" }}>
            AGM/EGM schedules, record dates, and declared dividends, rights and bonus issues.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="inline-flex" style={{ border: "1px solid var(--line)", borderRadius: 2 }}>
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="px-3 h-8 text-[12px] font-semibold"
                  style={{
                    background: active ? "var(--brand-600)" : "transparent",
                    color: active ? "#fff" : "var(--ink)",
                    borderLeft: t.id !== "upcoming" ? "1px solid var(--line)" : "none",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by ticker or company…"
            className="h-8 px-3 text-[13px] outline-none flex-1 min-w-[200px] max-w-[320px]"
            style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
          />
        </div>

        {/* Event-type chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {EVENT_TYPES.map((t) => {
            const active = activeTypes.has(t);
            const c = eventColor(t);
            return (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className="px-2.5 h-7 text-[11.5px] font-semibold uppercase"
                style={{
                  background: active ? c.color : "transparent",
                  color: active ? "#fff" : c.color,
                  border: "1px solid " + (active ? c.color : "var(--line)"),
                  borderRadius: 2,
                  letterSpacing: "0.05em",
                }}
              >
                {t}
              </button>
            );
          })}
          {activeTypes.size > 0 && (
            <button
              onClick={() => setActiveTypes(new Set())}
              className="px-2.5 h-7 text-[11.5px] font-semibold uppercase"
              style={{ color: "var(--text-muted)", letterSpacing: "0.05em" }}
            >
              Clear
            </button>
          )}
        </div>

        <p className="text-[12px] mb-3" style={{ color: "var(--text-muted)" }}>
          Rows are indicative placeholders pending live feed.
        </p>

        {/* Table */}
        <div
          className="overflow-x-auto"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          <table className="w-full text-[13px]" style={{ minWidth: 720 }}>
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
                {[
                  { h: "Company", align: "left" as const },
                  { h: "Event", align: "left" as const },
                  { h: "Date", align: "right" as const },
                  { h: "Record date", align: "right" as const },
                  { h: "Details / Venue", align: "left" as const },
                ].map((c) => (
                  <th
                    key={c.h}
                    className="px-3 py-2 text-[11px] font-semibold uppercase"
                    style={{
                      textAlign: c.align,
                      letterSpacing: "0.1em",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {c.h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const c = eventColor(a.event);
                return (
                  <tr
                    key={`${a.ticker}-${a.event}-${a.date}`}
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
                        style={{
                          background: c.bg,
                          color: c.color,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {a.event}
                      </span>
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
                    <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>
                      {a.detail}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-8 text-center text-[12.5px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No corporate actions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}
