import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Download, FileText } from "lucide-react";
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
  { title: "TREC Regulations", category: "rules", date: "—", type: "PDF", href: "#" },
  { title: "Corporate Governance Code", category: "rules", date: "—", type: "PDF", href: "#" },
  { title: "Investors' Protection Fund Regulations", category: "rules", date: "—", type: "PDF", href: "#" },
  { title: "Margin Rules", category: "rules", date: "—", type: "PDF", href: "#" },
  { title: "TREC Holder Margin Regulations", category: "rules", date: "—", type: "PDF", href: "#" },
  { title: "Board and Administration Regulations", category: "rules", date: "—", type: "PDF", href: "#" },
  { title: "Demutualization Scheme", category: "rules", date: "—", type: "PDF", href: "#" },
  { title: "Memorandum and Articles of Association", category: "rules", date: "—", type: "PDF", href: "#" },

  // Listing Regulations
  { title: "Listing Regulations", category: "listing", date: "—", type: "PDF", href: "#" },

  // Trading & Settlement
  { title: "Settlement Regulations", category: "trading", date: "—", type: "PDF", href: "#" },
  { title: "Settlement Guarantee Fund Regulations, 2013", category: "trading", date: "—", type: "PDF", href: "#" },
  { title: "Settlement of Dispute Regulations, 2026", category: "trading", date: "—", type: "PDF", href: "#" },
  { title: "Short-Sale Regulations, 2006", category: "trading", date: "—", type: "PDF", href: "#" },
  { title: "Automated Trading Regulations, 1999", category: "trading", date: "—", type: "PDF", href: "#" },

  // BSEC Acts & Rules (external)
  { title: "The Exchanges Demutualization Act, 2013", category: "bsec", date: "—", type: "PDF", href: "https://www.sec.gov.bd", external: true },
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
                      {active === "circulars"
                        ? "Circulars will be published from DSE."
                        : "No documents match your search."}
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

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-10">
        <div className="mt-6 rounded-md p-5" style={{ background: "var(--surface)", border: "1px solid var(--line)" }} data-cms="regulations.index">
          <h2 className="text-[16px] font-semibold mb-3" style={{ color: "var(--ink)" }}>All Regulations</h2>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[13px]">
            {[
              { label: "TREC Regulations", href: "#trec" },
              { label: "Listing Regulations", href: "#listing" },
              { label: "Corporate Governance Code", href: "#cg" },
              { label: "Settlement Regulations", href: "#clearing-settlement" },
              { label: "Settlement Guarantee Fund Regulations", href: "#sgf" },
              { label: "Settlement of Dispute Regulations", href: "#dispute" },
              { label: "Short-Sale Regulations", href: "#short-sale" },
              { label: "Automated Trading Regulations", href: "#ats" },
              { label: "Investors' Protection Fund Regulations", href: "#ipf" },
              { label: "Margin Rules", href: "#margin" },
              { label: "TREC Holder Margin Regulations", href: "#trec-margin" },
              { label: "Board & Administration Regulations", href: "#board-admin" },
              { label: "The Exchanges Demutualization Act 2013", href: "#demut-act" },
              { label: "Demutualization Scheme", href: "#demut-scheme" },
              { label: "Memorandum & Articles of Association", href: "#moa" },
              { label: "Securities Related Laws", href: "https://www.sec.gov.bd", external: true },
            ].map((i) => (
              <li key={i.label}>
                <a
                  href={i.href}
                  target={i.external ? "_blank" : undefined}
                  rel={i.external ? "noopener noreferrer" : undefined}
                  id={i.href.startsWith("#") ? i.href.slice(1) : undefined}
                  className="hover:underline"
                  style={{ color: "var(--brand-600)" }}
                >
                  {i.label}{i.external ? " ↗" : ""}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RulebooksSection />

      <Footer />
    </div>
  );
}

/* ────────── Rulebooks & Regulatory Documents ────────── */
type RuleDoc = { title: string; file: string };
type RuleGroup = { id: string; title: string; items: RuleDoc[] };

const RULEBOOK_GROUPS: RuleGroup[] = [
  {
    id: "rb-membership",
    title: "Membership & Trading",
    items: [
      { title: "TREC Regulations — 2020", file: "trecregulations_2020.pdf" },
      { title: "TREC Regulations — 2013 — Repealed", file: "TRECRegulations2013.pdf" },
      { title: "TREC Holders' Margin Regulations 2013", file: "TREC-MarginRegulations-2013.pdf" },
      { title: "Stock-Dealer / Broker / AR Regulation — 2000", file: "membership.pdf" },
      { title: "Automated Trading Regulations-1999", file: "auto_trade.pdf" },
      { title: "Short-Sale Regulations-2006", file: "shortSaleReg.pdf" },
      { title: "Board and Administration Regulations 2013", file: "BoardandAdminRegulations2013.pdf" },
    ],
  },
  {
    id: "rb-listing",
    title: "Listing",
    items: [
      { title: "Listing Regulations 2015", file: "listing_reg_2015.pdf" },
      { title: "Listing Regulations — Repealed", file: "listing_reg_Repealed.pdf" },
    ],
  },
  {
    id: "rb-settlement",
    title: "Settlement",
    items: [
      { title: "Settlement Regulations — 2013", file: "SettlementRegulations2013.pdf" },
      { title: "Settlement of Stock Exchange Transactions Regulations-1998", file: "set_stock.pdf" },
      { title: "Settlement of Dispute Regulations, 2026", file: "—" },
      { title: "Settlement Guarantee Fund Regulations-2013", file: "SGF-27082014130507.pdf" },
      { title: "Z Category T+3 Settlement Order", file: "Order_08_01.09.20201-Z Group.pdf" },
      { title: "Z-Category Conditions", file: "Z-category-Condition.pdf" },
    ],
  },
  {
    id: "rb-margin",
    title: "Margin",
    items: [
      { title: "Margin Rules — 1999", file: "margin_rules.pdf" },
      { title: "Margin Rule 2025", file: "06.11.2025_Margin Rule 2025.pdf" },
      { title: "Members Margin Regulation — 2000", file: "members_margin.pdf" },
    ],
  },
  {
    id: "rb-cg",
    title: "Corporate Governance",
    items: [
      { title: "Corporate Governance Code 2018", file: "Corporate_Governance_Code_10.06.2018.pdf" },
      { title: "CG Notification — Amended", file: "Notification_on_CG-07.8.12-Amended.pdf" },
    ],
  },
  {
    id: "rb-corporate",
    title: "Corporate Documents",
    items: [
      { title: "Memorandum & Articles of Association", file: "MandA.pdf" },
      { title: "The Exchanges Demutualization Act 2013", file: "DemuAct2013.pdf" },
      { title: "Demutualization Scheme", file: "Demutualization Schme.pdf" },
      { title: "Securities Related Laws", file: "blaws.pdf" },
    ],
  },
  {
    id: "rb-otc",
    title: "OTC Market",
    items: [
      { title: "OTC Market Rules", file: "sec_otc_rules.pdf" },
      { title: "OTC Market Rules — Amendment", file: "OTC_Amendment4OTCRules2001.pdf" },
    ],
  },
];

function RulebooksSection() {
  return (
    <section
      id="rulebooks"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pb-16 pt-4"
      data-cms-collection="rulebooks"
    >
      <h2
        className="text-[22px] font-bold tracking-[-0.01em] mb-2"
        style={{ color: "#0B2545" }}
      >
        Rulebooks & Regulatory Documents
      </h2>
      <p className="text-[13px] mb-6" style={{ color: "#586068" }}>
        Official DSE regulations, grouped by subject. Document links will be connected to live files when the CMS is configured.
      </p>

      <div className="space-y-10">
        {RULEBOOK_GROUPS.map((g) => (
          <div key={g.id} id={g.id} data-cms-group={g.id}>
            <h3
              className="text-[15px] font-semibold uppercase mb-3"
              style={{ color: "#0B2545", letterSpacing: "0.06em" }}
            >
              {g.title}
            </h3>
            <div style={{ border: "1px solid #E0E5EA", background: "#ffffff" }}>
              {g.items.map((it, i) => (
                <div
                  key={it.file + it.title}
                  data-cms-record={it.file}
                  className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-[#F4F7FA]"
                  style={{ borderTop: i === 0 ? "none" : "1px solid #E0E5EA" }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ background: "#F4F7FA", color: "#0B2545" }}
                  >
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium" style={{ color: "#161A1F" }}>
                      {it.title}
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: "#586068" }}>
                      {g.title}
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 transition hover:bg-white"
                    style={{
                      color: "#185FA5",
                      border: "1px solid #E0E5EA",
                      background: "transparent",
                    }}
                  >
                    Download
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
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
      id="clearing-settlement"
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
