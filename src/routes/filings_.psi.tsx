import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertCircle, Bell, FileText, Megaphone, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/filings_/psi")({
  head: () => ({
    meta: [
      { title: "PSI and Material Information | DSE" },
      { name: "description", content: "Price-sensitive and material information disclosures from listed companies." },
      { property: "og:title", content: "PSI and Material Information — DSE" },
      { property: "og:description", content: "Price-sensitive and material information disclosures from listed companies." },
    ],
  }),
  component: PsiPage,
});

type NoticeType = "PSI" | "Dividend" | "AGM" | "Notice";
type Notice = {
  code: string;
  company: string;
  type: NoticeType;
  title: string;
  body: string;
  date: string;
  time: string;
};

const NOTICES: Notice[] = [
  { code: "BATBC", company: "British American Tobacco BD", type: "PSI", title: "Board Meeting Decision · 600% Cash Dividend", body: "The Board recommended 600% cash dividend for FY2025, subject to shareholders' approval at the forthcoming AGM.", date: "30 Jun", time: "12:30" },
  { code: "SQURPHARMA", company: "Square Pharmaceuticals", type: "Dividend", title: "Dividend Disbursement Notice", body: "Disbursement of cash dividend for the year ended 31 March 2026 has been completed through BEFTN/cheque to entitled shareholders.", date: "30 Jun", time: "11:14" },
  { code: "GP", company: "Grameenphone", type: "PSI", title: "Credit Rating Reaffirmed at AAA", body: "Long term rating reaffirmed at AAA and short term at ST-1 by CRAB based on audited financials of 2025.", date: "29 Jun", time: "16:45" },
  { code: "BRACBANK", company: "BRAC Bank PLC", type: "Notice", title: "Spot Trading Notice", body: "Shares to be traded under 'Spot' category from 01–03 July 2026. Record date: 06 July 2026.", date: "29 Jun", time: "14:20" },
  { code: "RENATA", company: "Renata Limited", type: "PSI", title: "New Biologics Manufacturing Facility", body: "Board approved a BDT 1,200 Cr biologics plant, financed through internal sources and bank borrowing.", date: "28 Jun", time: "13:05" },
  { code: "BEXIMCO", company: "Beximco Limited", type: "AGM", title: "32nd AGM Notice", body: "32nd Annual General Meeting to be held on 28 July 2026 at 11:00 AM via digital platform.", date: "28 Jun", time: "10:30" },
  { code: "ROBI", company: "Robi Axiata", type: "PSI", title: "Q2 2026 Un-audited Financial Statements", body: "Board approved un-audited financials for the quarter ended 30 June 2026; EPS BDT 0.42 vs 0.31 in same quarter last year.", date: "27 Jun", time: "15:10" },
  { code: "WALTONHIL", company: "Walton Hi-Tech Industries", type: "Dividend", title: "Record Date for Cash Dividend", body: "Record date fixed on 14 July 2026 for entitlement of 250% cash dividend recommended for FY2025.", date: "27 Jun", time: "11:00" },
  { code: "CITYBANK", company: "The City Bank", type: "PSI", title: "Tier-II Subordinated Bond Issue", body: "Board approved issuance of BDT 600 Cr unsecured, non-convertible, floating-rate Tier-II subordinated bond, subject to regulatory approval.", date: "26 Jun", time: "16:00" },
  { code: "OLYMPIC", company: "Olympic Industries", type: "Notice", title: "Plant Shutdown for Annual Maintenance", body: "Manufacturing unit-1 will remain closed from 05–10 July 2026 for scheduled annual maintenance.", date: "26 Jun", time: "10:45" },
  { code: "LHBL", company: "LafargeHolcim BD", type: "PSI", title: "Acquisition of Aggregates Business", body: "Board approved acquisition of an aggregates and ready-mix business at a consideration of BDT 320 Cr, expected to complete in Q4 2026.", date: "25 Jun", time: "14:20" },
  { code: "BSRMLTD", company: "BSRM Limited", type: "AGM", title: "EGM Notice — Capacity Expansion", body: "EGM to consider capacity expansion of the rolling mill by 0.5 MTPA scheduled for 05 August 2026.", date: "25 Jun", time: "12:00" },
];

const typeMeta: Record<NoticeType, { color: string; bg: string; icon: typeof Bell }> = {
  PSI: { color: "var(--red-down, #c0392b)", bg: "rgba(192,57,43,0.10)", icon: AlertCircle },
  Dividend: { color: "var(--green-up, #1f7a3a)", bg: "rgba(31,122,58,0.10)", icon: FileText },
  AGM: { color: "var(--amber, #b8860b)", bg: "rgba(184,134,11,0.10)", icon: Bell },
  Notice: { color: "var(--brand-600, #0b4f8a)", bg: "rgba(11,79,138,0.08)", icon: Megaphone },
};

const FILTERS: ("All" | NoticeType)[] = ["All", "PSI", "Dividend", "AGM", "Notice"];

function PsiPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return NOTICES.filter((n) => {
      if (filter !== "All" && n.type !== filter) return false;
      if (!needle) return true;
      return (
        n.code.toLowerCase().includes(needle) ||
        n.company.toLowerCase().includes(needle) ||
        n.title.toLowerCase().includes(needle) ||
        n.body.toLowerCase().includes(needle)
      );
    });
  }, [q, filter]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Disclosures & Filings
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            PSI and Material Information
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Price-sensitive and material information disclosures from listed companies.
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div
          className="flex flex-col h-full"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
        >
          {/* Header */}
          <div
            className="px-4 py-2.5 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(180deg, var(--brand-700, #093d6b), var(--brand-600, #0b4f8a))",
              color: "#fff",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.25)" }}
              />
              <div className="text-[12.5px] font-semibold tracking-wider uppercase">
                Live PSI & Material Information
              </div>
              <span className="text-[10.5px] uppercase tracking-wider opacity-80">
                · {items.length} {items.length === 1 ? "notice" : "notices"}
              </span>
            </div>
            <Link
              to="/news"
              className="text-[11.5px] inline-flex items-center gap-1 opacity-90 hover:opacity-100"
              style={{ color: "#fff" }}
            >
              All notices
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Toolbar */}
          <div
            className="px-3 py-2 flex flex-wrap items-center gap-2 justify-between"
            style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}
          >
            <div className="flex items-center gap-1.5 flex-wrap">
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="text-[11.5px] font-semibold px-2.5 py-1 transition"
                    style={{
                      color: active ? "#fff" : "var(--text-secondary)",
                      background: active ? "var(--brand-600)" : "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: 2,
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter by company or notice…"
              className="h-8 px-3 text-[12.5px] outline-none w-full max-w-[280px]"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--ink)",
                borderRadius: 2,
              }}
            />
          </div>

          {/* List */}
          <div className="px-3 py-3 space-y-2">
            {items.length === 0 && (
              <div
                className="text-center text-[12.5px] py-10"
                style={{ color: "var(--text-secondary)" }}
              >
                No notices match the current filters.
              </div>
            )}
            {items.map((n, i) => {
              const meta = typeMeta[n.type];
              const Icon = meta.icon;
              return (
                <Link
                  key={i}
                  to="/news"
                  className="block group transition"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderLeft: `3px solid ${meta.color}`,
                    borderRadius: 2,
                    padding: "10px 12px",
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="inline-flex items-center justify-center"
                        style={{
                          width: 18,
                          height: 18,
                          background: meta.bg,
                          color: meta.color,
                          borderRadius: 2,
                        }}
                      >
                        <Icon className="w-3 h-3" />
                      </span>
                      <span
                        className="text-[10.5px] font-bold tracking-wider uppercase"
                        style={{ color: meta.color }}
                      >
                        {n.type}
                      </span>
                      <span
                        className="text-[12px] font-semibold truncate"
                        style={{ color: "var(--ink)" }}
                      >
                        {n.code}
                      </span>
                      <span
                        className="text-[11.5px] truncate hidden sm:inline"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        · {n.company}
                      </span>
                    </div>
                    <span
                      className="text-[10.5px] tnum whitespace-nowrap"
                      style={{ color: "var(--text-muted, var(--text-secondary))" }}
                    >
                      {n.date} · {n.time}
                    </span>
                  </div>
                  <div
                    className="text-[13px] font-semibold leading-snug group-hover:underline"
                    style={{ color: "var(--ink)" }}
                  >
                    {n.title}
                  </div>
                  <p
                    className="mt-0.5 text-[12px] leading-[1.45]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {n.body}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
        <p className="mt-4 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Sample data for demonstration. Reverse-chronological; live notices will be wired to the DSE feed.
        </p>
      </section>
      <Footer />
    </div>
  );
}
