import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Download } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/regulations")({
  head: () => ({
    meta: [
      { title: "Regulations & Rulebook | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "DSE rules, listing regulations, trading rules and the circulars archive — the official DSE rulebook library.",
      },
      { property: "og:title", content: "Regulations & Rulebook | DSE" },
      {
        property: "og:description",
        content: "DSE rules, listing regulations, trading rules and the circulars archive.",
      },
    ],
  }),
  component: RegulationsPage,
});

/* ────────── categories ────────── */
const CATEGORIES = [
  { id: "rules", label: "Rules & Regulations" },
  { id: "listing", label: "Listing Regulations" },
  { id: "trading", label: "Trading & Settlement Rules" },
  { id: "circulars", label: "Circulars" },
  { id: "bsec", label: "BSEC Acts & Rules" },
  { id: "rulebook", label: "Rulebook (PDFs)" },
] as const;

type CatId = (typeof CATEGORIES)[number]["id"];

type Doc = {
  title: string;
  category: CatId;
  date: string;
  type: "PDF";
  href: string;
  external?: boolean;
};

const DOCS: Doc[] = [
  // Rules & Regulations
  { title: "DSE (Listing) Regulations, 2019", category: "rules", date: "2019-08-26", type: "PDF", href: "#" },
  { title: "DSE (Settlement of Transactions) Regulations, 2013", category: "rules", date: "2013-05-12", type: "PDF", href: "#" },
  { title: "DSE Members' Code of Conduct", category: "rules", date: "2017-03-04", type: "PDF", href: "#" },
  { title: "DSE Investors' Protection Fund Regulations", category: "rules", date: "2014-11-19", type: "PDF", href: "#" },

  // Listing Regulations
  { title: "Main Board Listing Requirements", category: "listing", date: "2024-02-15", type: "PDF", href: "#" },
  { title: "SME Platform Listing Rules, 2019", category: "listing", date: "2019-10-08", type: "PDF", href: "#" },
  { title: "Direct Listing Regulations, 2006", category: "listing", date: "2006-07-01", type: "PDF", href: "#" },
  { title: "Book Building Method Guidelines", category: "listing", date: "2015-04-22", type: "PDF", href: "#" },

  // Trading & Settlement
  { title: "Automated Trading System Rules", category: "trading", date: "2022-09-30", type: "PDF", href: "#" },
  { title: "Circuit Breaker Mechanism Notice", category: "trading", date: "2025-01-14", type: "PDF", href: "#" },
  { title: "Margin Rules for TREC Holders", category: "trading", date: "2021-06-17", type: "PDF", href: "#" },
  { title: "Block Market Operating Procedure", category: "trading", date: "2020-12-03", type: "PDF", href: "#" },
  { title: "Short Sale & Securities Lending Rules", category: "trading", date: "2023-08-11", type: "PDF", href: "#" },

  // Circulars
  { title: "Circular 2026/14 — Holiday calendar revision", category: "circulars", date: "2026-05-28", type: "PDF", href: "#" },
  { title: "Circular 2026/11 — Updated lot size policy", category: "circulars", date: "2026-04-09", type: "PDF", href: "#" },
  { title: "Circular 2026/07 — Foreign investor KYC update", category: "circulars", date: "2026-03-02", type: "PDF", href: "#" },
  { title: "Circular 2025/42 — Margin financing thresholds", category: "circulars", date: "2025-12-18", type: "PDF", href: "#" },
  { title: "Circular 2025/36 — Pre-open session extension", category: "circulars", date: "2025-11-05", type: "PDF", href: "#" },

  // BSEC Acts & Rules (external)
  { title: "Securities & Exchange Ordinance, 1969", category: "bsec", date: "1969-05-08", type: "PDF", href: "https://www.sec.gov.bd", external: true },
  { title: "Securities & Exchange Commission Act, 1993", category: "bsec", date: "1993-06-15", type: "PDF", href: "https://www.sec.gov.bd", external: true },
  { title: "BSEC (Public Issue) Rules, 2015", category: "bsec", date: "2015-10-12", type: "PDF", href: "https://www.sec.gov.bd", external: true },
  { title: "Exchanges Demutualization Act, 2013", category: "bsec", date: "2013-04-29", type: "PDF", href: "https://www.sec.gov.bd", external: true },

  // Rulebook
  { title: "DSE Rulebook — Consolidated (2024 ed.)", category: "rulebook", date: "2024-12-31", type: "PDF", href: "#" },
  { title: "DSE Rulebook — Amendments Index", category: "rulebook", date: "2025-09-10", type: "PDF", href: "#" },
];

function RegulationsPage() {
  const [active, setActive] = useState<CatId | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DOCS.filter(
      (d) =>
        (active === "all" || d.category === active) &&
        (!term || d.title.toLowerCase().includes(term)),
    );
  }, [active, q]);

  const catLabel = (id: CatId) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

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
            Regulations & Rulebook
          </h1>
          <p className="mt-2 text-[13.5px]" style={{ color: "var(--text-secondary)" }}>
            DSE rules, listing regulations, trading rules and the circulars archive.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 grid lg:grid-cols-[220px_minmax(0,1fr)] gap-8">
        {/* Left rail (desktop) */}
        <aside className="hidden lg:block">
          <nav
            className="sticky top-[120px] text-[13px]"
            style={{ borderLeft: "1px solid var(--line)" }}
          >
            <button
              onClick={() => setActive("all")}
              className="block w-full text-left px-4 py-2 hover:bg-[var(--surface-2)]"
              style={{
                color: active === "all" ? "var(--brand-600)" : "var(--text-secondary)",
                fontWeight: active === "all" ? 600 : 400,
                background: active === "all" ? "var(--surface-2)" : "transparent",
              }}
            >
              All documents
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className="block w-full text-left px-4 py-2 hover:bg-[var(--surface-2)]"
                style={{
                  color: active === c.id ? "var(--brand-600)" : "var(--text-secondary)",
                  fontWeight: active === c.id ? 600 : 400,
                  background: active === c.id ? "var(--surface-2)" : "transparent",
                }}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          {/* Filter chips (mobile) + search */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="lg:hidden flex flex-wrap gap-1.5">
              {[{ id: "all" as const, label: "All" }, ...CATEGORIES].map((c) => {
                const isActive = active === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActive(c.id as CatId | "all")}
                    className="px-2.5 h-7 text-[11.5px] font-semibold uppercase"
                    style={{
                      background: isActive ? "var(--brand-600)" : "transparent",
                      color: isActive ? "#fff" : "var(--text-secondary)",
                      border: "1px solid " + (isActive ? "var(--brand-600)" : "var(--line)"),
                      borderRadius: 2,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search documents by title…"
              className="w-full md:w-96 h-9 px-3 text-[13px] outline-none"
              style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
            />
          </div>

          <p className="text-[12px] mb-3" style={{ color: "var(--text-muted)" }}>
            Documents are indicative placeholders pending live feed.
          </p>

          {/* Document table */}
          <div
            className="overflow-x-auto"
            style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
          >
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
                  {["Title", "Category", "Date", "Type", "Download"].map((h, i) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-[11px] font-semibold uppercase"
                      style={{
                        textAlign: i === 2 || i === 4 ? "right" : "left",
                        letterSpacing: "0.1em",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr
                    key={d.title}
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid var(--line)",
                      background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                    }}
                  >
                    <td className="px-3 py-2" style={{ color: "var(--ink)" }}>
                      <a
                        href={d.href}
                        target={d.external ? "_blank" : undefined}
                        rel={d.external ? "noopener noreferrer" : undefined}
                        className="hover:underline inline-flex items-center gap-1"
                        style={{ color: "var(--brand-600)", fontWeight: 500 }}
                      >
                        {d.title}
                        {d.external && <ExternalLink className="w-3 h-3" />}
                      </a>
                    </td>
                    <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>
                      {catLabel(d.category)}
                    </td>
                    <td
                      className="px-3 py-2 tnum text-right"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {d.date}
                    </td>
                    <td className="px-3 py-2 text-[12px]">
                      <span
                        className="px-1.5 py-0.5 font-semibold"
                        style={{
                          color: "var(--brand-600)",
                          background: "var(--surface-2)",
                          border: "1px solid var(--line)",
                        }}
                      >
                        {d.type}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <a
                        href={d.href}
                        target={d.external ? "_blank" : undefined}
                        rel={d.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center justify-end gap-1 hover:underline"
                        style={{ color: "var(--brand-600)" }}
                        aria-label={`Download ${d.title}`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="text-[12px] font-semibold uppercase" style={{ letterSpacing: "0.05em" }}>
                          {d.external ? "Open" : "Get"}
                        </span>
                      </a>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-8 text-center text-[12.5px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      No documents match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {active === "bsec" || active === "all" ? (
            <p className="mt-3 text-[12px]" style={{ color: "var(--text-muted)" }}>
              BSEC Acts & Rules link out to the Bangladesh Securities and Exchange Commission website.
            </p>
          ) : null}
        </div>
      </div>

      {/* Additional regulatory sub-sections */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-12 space-y-6">
        <DocSection
          id="ipf"
          title="Investors' Protection Fund Regulations"
          docs={[
            { title: "Investors' Protection Fund Regulations-2014 (Reference)", href: "#" },
            { title: "Investors' Protection Fund Regulations-1999", href: "#" },
          ]}
        />

        <DocSection
          id="cg"
          title="Corporate Governance"
          docs={[
            { title: "Corporate Governance Code", href: "#" },
            { title: "Amendments to the Corporate Governance Code-2018 (November 20, 2023)", href: "#" },
            { title: "Clarification to the Corporate Governance Code-2018 (February 05, 2020)", href: "#" },
            { title: "Corporate Governance Code (Reference)", href: "#" },
            {
              title:
                "Corporate Governance Guidelines (Repealed) — Corporate Governance Guideline issued by the Bangladesh Securities and Exchange Commission on 07 August, 2012",
              href: "#",
            },
          ]}
        />

        <DocSection
          id="margin"
          title="Margin Rules"
          docs={[
            { title: "Margin Rules 2025", href: "#" },
            { title: "Margin Rules 1999 (Repealed)", href: "#" },
          ]}
        />

        <ClearingSettlementSection />
      </section>



      <Footer />
    </div>
  );
}

/* ────────── Sub-section helpers ────────── */
type SubDoc = { title: string; href: string };

function DocSection({ id, title, docs }: { id: string; title: string; docs: SubDoc[] }) {
  return (
    <section id={id} style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
      <header
        className="px-4 md:px-5 py-3"
        style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}
      >
        <h2
          className="text-[15px] md:text-[16px] font-semibold tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          {title}
        </h2>
      </header>
      <ul>
        {docs.map((d, i) => (
          <li
            key={d.title}
            style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
          >
            <a
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 text-[13px] hover:bg-[var(--surface-2)]"
            >
              <span
                className="inline-flex items-center gap-2 min-w-0"
                style={{ color: "var(--brand-600)", fontWeight: 500 }}
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{d.title}</span>
              </span>
              <span
                className="px-1.5 py-0.5 text-[11px] font-semibold uppercase shrink-0"
                style={{
                  color: "var(--brand-600)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--line)",
                  letterSpacing: "0.05em",
                }}
              >
                PDF
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ClearingSettlementSection() {
  return (
    <section
      id="clearing"
      style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
    >
      <header
        className="px-4 md:px-5 py-3"
        style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}
      >
        <h2
          className="text-[15px] md:text-[16px] font-semibold tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          Clearing & Settlement
        </h2>
      </header>
      <div className="px-4 md:px-5 py-4 space-y-3 text-[13px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
        <p>
          The Automated Clearing and Settlement System (CnS) is developed to automate all post
          trade activities regarding clearing and settlement. Its main stakeholders are Brokerage
          houses, CDBL, Clearing Banks and DSE Finance Division.
        </p>
        <p>
          <span className="font-semibold" style={{ color: "var(--ink)" }}>Settlement:</span>{" "}
          In settlement process DSE receives all charges and AIT from buying and selling brokers.
          DSE also receives receivable amount from buying brokers and earmark selling shares in
          selling broker clearing account through CDBL settlement schedule. Regulation 4 of the
          DHAKA STOCK EXCHANGE (SETTLEMENT OF TRANSACTIONS) REGULATIONS, 2013 has been given
          effect time to time.
        </p>
        <p>
          <span className="font-semibold" style={{ color: "var(--ink)" }}>Clearing:</span>{" "}
          In clearing process DSE make payment by credit instruction and deliver share through
          CDBL clearing schedule to buying broker.
        </p>
      </div>
      <ul style={{ borderTop: "1px solid var(--line)" }}>
        {[
          { title: "Settlement Regulations", href: "#" },
          { title: "DSE (Settlement of Transactions) Regulations, 2013", href: "#" },
        ].map((d, i) => (
          <li key={d.title} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
            <a
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 text-[13px] hover:bg-[var(--surface-2)]"
            >
              <span
                className="inline-flex items-center gap-2 min-w-0"
                style={{ color: "var(--brand-600)", fontWeight: 500 }}
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{d.title}</span>
              </span>
              <span
                className="px-1.5 py-0.5 text-[11px] font-semibold uppercase shrink-0"
                style={{
                  color: "var(--brand-600)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--line)",
                  letterSpacing: "0.05em",
                }}
              >
                PDF
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
