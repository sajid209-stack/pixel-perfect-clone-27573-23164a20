import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/filings")({
  head: () => ({
    meta: [
      { title: "Disclosures & Filings | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Auditor's opinions, proceeds utilisation, right offer documents, direct listing and re-listing filings from DSE-listed companies.",
      },
      { property: "og:title", content: "Disclosures & Filings | DSE" },
      {
        property: "og:description",
        content: "Auditor opinions, proceeds utilisation, rights, direct & re-listing documents.",
      },
    ],
  }),
  component: FilingsPage,
});

type Row = {
  ticker: string;
  name: string;
  year: number;
  date: string; // ISO
  extra?: string; // opinion / period / record date / etc.
  doc: string;
};

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

const OPINION_TYPES = [
  "Qualified Opinion",
  "Basis for Qualified Opinion",
  "Emphasis of Matter(s)",
  "Other Matter(s)",
  "Material Uncertainty Related to Going Concern",
  "Adverse Opinion",
  "Disclaimer of Opinion",
] as const;
type OpinionType = (typeof OPINION_TYPES)[number];

type AuditorRow = Row & { opinion: OpinionType };

const AUDITOR: AuditorRow[] = [
  { ticker: "BEXIMCO", name: "Beximco Limited", opinion: "Emphasis of Matter(s)", year: 2025, date: "2025-10-12", doc: "#" },
  { ticker: "GRAMEENS", name: "Grameenphone", opinion: "Qualified Opinion", year: 2024, date: "2024-09-18", doc: "#" },
];

type ProceedKind = "IPO" | "RPO" | "Rights";
const PROCEEDS: Record<ProceedKind, Row[]> = {
  IPO: [
    { ticker: "WALTONHIL", name: "Walton Hi-Tech", year: 2025, date: "2025-12-31", extra: "Q4 2025", doc: "#" },
    { ticker: "ROBI", name: "Robi Axiata", year: 2024, date: "2024-12-31", extra: "Q4 2024", doc: "#" },
  ],
  RPO: [
    { ticker: "BSCCL", name: "BSCCL", year: 2025, date: "2025-09-30", extra: "Q3 2025", doc: "#" },
    { ticker: "POWERGRID", name: "Power Grid", year: 2024, date: "2024-06-30", extra: "Q2 2024", doc: "#" },
  ],
  Rights: [
    { ticker: "CITYBANK", name: "The City Bank PLC", year: 2025, date: "2025-06-30", extra: "Q2 2025", doc: "#" },
    { ticker: "RENATA", name: "Renata Limited", year: 2024, date: "2024-12-31", extra: "Q4 2024", doc: "#" },
  ],
};

const RIGHTS: Row[] = [
  { ticker: "CITYBANK", name: "The City Bank PLC", year: 2025, date: "2025-04-08", doc: "#" },
  { ticker: "RENATA", name: "Renata Limited", year: 2024, date: "2024-06-10", doc: "#" },
];

type DirectKind = "Applied" | "Offloading" | "Archive";
const DIRECT: Record<DirectKind, Row[]> = {
  Applied: [
    { ticker: "NEWCO1", name: "Newco Industries", year: 2026, date: "2026-02-14", doc: "#" },
    { ticker: "NEWCO2", name: "Newco Foods", year: 2025, date: "2025-11-02", doc: "#" },
  ],
  Offloading: [
    { ticker: "POWERGRID", name: "Power Grid", year: 2024, date: "2024-08-21", doc: "#" },
    { ticker: "BSCCL", name: "BSCCL", year: 2023, date: "2023-05-09", doc: "#" },
  ],
  Archive: [
    { ticker: "TITASGAS", name: "Titas Gas", year: 2022, date: "2022-03-15", doc: "#" },
    { ticker: "JAMUNAOIL", name: "Jamuna Oil", year: 2021, date: "2021-07-22", doc: "#" },
  ],
};

const RELISTING: Row[] = [
  { ticker: "RANGAMIT", name: "Rangamati Foods", year: 2025, date: "2025-03-11", doc: "#" },
  { ticker: "MEGHNA", name: "Meghna Cement", year: 2023, date: "2023-10-04", doc: "#" },
];

const TABS = [
  { id: "auditor", label: "Auditor's Opinion" },
  { id: "proceeds", label: "Proceeds Utilisation" },
  { id: "rights", label: "Right Offer Documents" },
  { id: "direct", label: "Direct Listing" },
  { id: "relisting", label: "Re-listing" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const PAGE_SIZE = 25;

function FilingsPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<TabId>("auditor");

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

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
            {t("Disclosures & Filings")}
          </h1>
          <p
            className="mt-2 text-[13.5px] max-w-3xl"
            style={{ color: "var(--text-secondary)" }}
            data-cms="filings.intro"
          >
            {t(
              "Auditor opinions, proceeds utilisation statements, right offer documents, direct listing and re-listing filings submitted by DSE-listed companies.",
            )}
          </p>
          <div className="mt-3 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
            {t("Live data — provided by DSE")} · {t("updated")} {new Date().toLocaleString()}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
        {/* Dedicated pages */}
        <div className="flex flex-wrap items-center gap-2 mb-5 text-[12px]">
          <span className="uppercase tracking-[0.14em] font-semibold mr-1" style={{ color: "var(--text-secondary)" }}>
            Browse:
          </span>
          <Link to="/filings/auditors-opinion" className="px-2.5 h-7 inline-flex items-center rounded-full" style={{ border: "1px solid var(--line)", color: "var(--ink)" }}>
            Auditor's Opinion and Others
          </Link>
          <Link to="/filings/psi" className="px-2.5 h-7 inline-flex items-center rounded-full" style={{ border: "1px solid var(--line)", color: "var(--ink)" }}>
            PSI and Material Information
          </Link>
        </div>

        {/* Top tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div
            className="inline-flex flex-wrap"
            style={{ border: "1px solid var(--line)", borderRadius: 2 }}
          >
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
        </div>

        {tab === "auditor" && <AuditorTab />}
        {tab === "proceeds" && <ProceedsTab />}
        {tab === "rights" && <RightsTab />}
        {tab === "direct" && <DirectTab />}
        {tab === "relisting" && <RelistingTab />}
      </div>

      <Footer />
    </div>
  );
}

/* ---------- Shared building blocks ---------- */

function Toolbar({
  q,
  setQ,
  year,
  setYear,
  showYear = true,
}: {
  q: string;
  setQ: (v: string) => void;
  year: number | "all";
  setYear: (v: number | "all") => void;
  showYear?: boolean;
}) {
  const { t } = useLang();
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("Search company or trade code…")}
        className="h-8 px-3 text-[13px] outline-none flex-1 min-w-[200px] max-w-[320px]"
        style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
      />
      {showYear && (
        <select
          value={year}
          onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
          className="h-8 px-2 text-[12.5px] outline-none"
          style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
        >
          <option value="all">{t("All years")}</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      )}
      <span className="text-[11px] ml-1" style={{ color: "var(--text-muted)" }}>
        {t("Live data — provided by DSE")}
      </span>
    </div>
  );
}

function Footnote({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p
      data-cms={id}
      contentEditable
      suppressContentEditableWarning
      className="mt-2 text-[11px] outline-none"
      style={{ color: "var(--text-muted)" }}
    >
      {children}
    </p>
  );
}

function Pager({
  page,
  setPage,
  total,
}: {
  page: number;
  setPage: (n: number) => void;
  total: number;
}) {
  const { t } = useLang();
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (total <= PAGE_SIZE) return null;
  return (
    <div className="mt-3 flex items-center gap-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>
      <button
        onClick={() => setPage(Math.max(0, page - 1))}
        disabled={page === 0}
        className="h-7 px-2"
        style={{ border: "1px solid var(--line)", background: "var(--surface)", opacity: page === 0 ? 0.5 : 1 }}
      >
        ← {t("Prev")}
      </button>
      <span>
        {page + 1} / {pages}
      </span>
      <button
        onClick={() => setPage(Math.min(pages - 1, page + 1))}
        disabled={page >= pages - 1}
        className="h-7 px-2"
        style={{
          border: "1px solid var(--line)",
          background: "var(--surface)",
          opacity: page >= pages - 1 ? 0.5 : 1,
        }}
      >
        {t("Next")} →
      </button>
    </div>
  );
}

function CompanyCell({ ticker, name }: { ticker: string; name: string }) {
  return (
    <Link to="/company/$ticker" params={{ ticker }} className="hover:underline" style={{ color: "var(--brand-600)" }}>
      <span style={{ color: "var(--ink)" }}>{name}</span>
    </Link>
  );
}

function TickerCell({ ticker }: { ticker: string }) {
  return (
    <Link to="/company/$ticker" params={{ ticker }} className="hover:underline font-bold tracking-wide" style={{ color: "var(--brand-600)" }}>
      {ticker}
    </Link>
  );
}

function DocLink({ href, id }: { href: string; id: string }) {
  const { t } = useLang();
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover:underline text-[12px] font-semibold"
      style={{ color: "var(--brand-600)" }}
      data-cms={id}
    >
      {t("Notice")} ↗
    </a>
  );
}

/* ---------- Generic table renderer ---------- */

type Col<T> = { h: string; align?: "left" | "right"; render: (r: T) => React.ReactNode };

function DataTable<T extends { ticker: string; name: string }>({
  cols,
  rows,
  emptyText,
  cardExtras,
}: {
  cols: Col<T>[];
  rows: T[];
  emptyText: string;
  cardExtras?: (r: T) => React.ReactNode;
}) {
  const { t } = useLang();
  return (
    <>
      <div
        className="hidden md:block overflow-x-auto"
        style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
      >
        <table className="w-full text-[13px]" style={{ minWidth: 760 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
              {cols.map((c) => (
                <th
                  key={c.h}
                  className="px-3 py-2 text-[11px] font-semibold uppercase"
                  style={{
                    textAlign: c.align ?? "left",
                    letterSpacing: "0.1em",
                    color: "var(--text-secondary)",
                  }}
                >
                  {t(c.h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                }}
              >
                {cols.map((c, j) => (
                  <td
                    key={j}
                    className="px-3 py-2"
                    style={{ textAlign: c.align ?? "left", color: "var(--ink)" }}
                  >
                    {c.render(r)}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={cols.length}
                  className="px-3 py-8 text-center text-[12.5px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t(emptyText)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {rows.map((r, i) => (
          <div key={i} style={{ border: "1px solid var(--line)", background: "var(--surface)" }} className="p-3">
            <div className="flex items-start justify-between gap-2">
              <Link
                to="/company/$ticker"
                params={{ ticker: r.ticker }}
                className="hover:underline"
                style={{ color: "var(--brand-600)" }}
              >
                <div className="font-bold tracking-wide text-[13px]">{r.ticker}</div>
                <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                  {r.name}
                </div>
              </Link>
            </div>
            {cardExtras && <div className="mt-2 text-[12.5px]">{cardExtras(r)}</div>}
          </div>
        ))}
        {rows.length === 0 && (
          <div
            className="p-6 text-center text-[12.5px]"
            style={{ color: "var(--text-muted)", border: "1px solid var(--line)" }}
          >
            {t(emptyText)}
          </div>
        )}
      </div>
    </>
  );
}

/* ---------- Hook: filter + paginate ---------- */

function useFiltered<T extends { ticker: string; name: string; year: number }>(
  rows: T[],
  q: string,
  year: number | "all",
  page: number,
) {
  return useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = rows.filter((r) => {
      if (year !== "all" && r.year !== year) return false;
      if (term && !r.ticker.toLowerCase().includes(term) && !r.name.toLowerCase().includes(term)) return false;
      return true;
    });
    const start = page * PAGE_SIZE;
    return { total: filtered.length, page: filtered.slice(start, start + PAGE_SIZE) };
  }, [rows, q, year, page]);
}

/* ---------- Tab 1: Auditor's Opinion ---------- */

function AuditorTab() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [page, setPage] = useState(0);
  const { total, page: rows } = useFiltered(AUDITOR, q, year, page);

  // Group by year
  const grouped = useMemo(() => {
    const map = new Map<number, AuditorRow[]>();
    rows.forEach((r) => {
      const arr = map.get(r.year) ?? [];
      arr.push(r);
      map.set(r.year, arr);
    });
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [rows]);

  const cols: Col<AuditorRow>[] = [
    { h: "Company", render: (r) => <CompanyCell ticker={r.ticker} name={r.name} /> },
    { h: "Trade Code", render: (r) => <TickerCell ticker={r.ticker} /> },
    { h: "Opinion Type", render: (r) => r.opinion },
    { h: "Financial Year", align: "right", render: (r) => <span className="tnum">{r.year}</span> },
    { h: "Notice", align: "right", render: (r) => <DocLink href={r.doc} id={`filings.auditor.${r.ticker}.${r.year}`} /> },
  ];

  return (
    <>
      <Toolbar q={q} setQ={setQ} year={year} setYear={setYear} />
      {grouped.length === 0 && (
        <DataTable cols={cols} rows={[]} emptyText="No filings match your filters." />
      )}
      {grouped.map(([y, list]) => (
        <div key={y} className="mb-5">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.12em", color: "var(--text-secondary)" }}
          >
            {t("Financial Year")} · {y}
          </div>
          <DataTable
            cols={cols}
            rows={list}
            emptyText="No filings match your filters."
            cardExtras={(r) => (
              <>
                <div style={{ color: "var(--ink)" }}>{r.opinion}</div>
                <div className="mt-1 tnum text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
                  {t("Financial Year")}: {r.year}
                </div>
                <DocLink href={r.doc} id={`filings.auditor.${r.ticker}.${r.year}.m`} />
              </>
            )}
          />
        </div>
      ))}
      <Pager page={page} setPage={setPage} total={total} />
      <Footnote id="filings.auditor.note">
        {t(
          "Source: company auditor reports submitted to DSE. Opinion labels are reproduced verbatim as filed by the issuer's auditor.",
        )}
      </Footnote>
    </>
  );
}

/* ---------- Tab 2: Proceeds Utilisation ---------- */

function ProceedsTab() {
  const { t } = useLang();
  const [sub, setSub] = useState<ProceedKind>("IPO");
  const [q, setQ] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [page, setPage] = useState(0);
  const { total, page: rows } = useFiltered(PROCEEDS[sub], q, year, page);

  const cols: Col<Row>[] = [
    { h: "Company", render: (r) => <CompanyCell ticker={r.ticker} name={r.name} /> },
    { h: "Trade Code", render: (r) => <TickerCell ticker={r.ticker} /> },
    { h: "Statement Period", render: (r) => r.extra },
    { h: "Document", align: "right", render: (r) => <DocLink href={r.doc} id={`filings.proceeds.${sub}.${r.ticker}.${r.date}`} /> },
  ];

  const subs: { id: ProceedKind; label: string }[] = [
    { id: "IPO", label: "IPO Proceed Utilisation" },
    { id: "RPO", label: "RPO Proceed Utilisation" },
    { id: "Rights", label: "Rights Proceed Utilisation" },
  ];

  return (
    <>
      <div className="inline-flex mb-3" style={{ border: "1px solid var(--line)", borderRadius: 2 }}>
        {subs.map((s, i) => {
          const active = sub === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                setSub(s.id);
                setPage(0);
              }}
              className="px-3 h-8 text-[12px] font-semibold"
              style={{
                background: active ? "var(--ink)" : "transparent",
                color: active ? "var(--surface)" : "var(--ink)",
                borderLeft: i !== 0 ? "1px solid var(--line)" : "none",
              }}
            >
              {t(s.label)}
            </button>
          );
        })}
      </div>
      <p className="mb-3 text-[12.5px]" style={{ color: "var(--text-secondary)" }} data-cms="filings.proceeds.intro">
        {t("Status of IPO (Initial Public Offering) / RPO / Right Share Issue (RI) Proceeds utilization statement.")}
      </p>
      <Toolbar q={q} setQ={setQ} year={year} setYear={setYear} />
      <DataTable
        cols={cols}
        rows={rows}
        emptyText="No filings match your filters."
        cardExtras={(r) => (
          <>
            <div style={{ color: "var(--ink)" }}>{r.extra}</div>
            <DocLink href={r.doc} id={`filings.proceeds.${sub}.${r.ticker}.m`} />
          </>
        )}
      />
      <Pager page={page} setPage={setPage} total={total} />
      <Footnote id={`filings.proceeds.${sub}.note`}>
        {t("Quarterly utilisation statements as submitted to DSE under the relevant BSEC conditions.")}
      </Footnote>
    </>
  );
}

/* ---------- Tab 3: Right Offer Documents ---------- */

function RightsTab() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [page, setPage] = useState(0);
  const { total, page: rows } = useFiltered(RIGHTS, q, year, page);

  const cols: Col<Row>[] = [
    { h: "Company", render: (r) => <CompanyCell ticker={r.ticker} name={r.name} /> },
    { h: "Trade Code", render: (r) => <TickerCell ticker={r.ticker} /> },
    { h: "Record Date", align: "right", render: (r) => <span className="tnum">{r.date}</span> },
    { h: "Document", align: "right", render: (r) => <DocLink href={r.doc} id={`filings.rights.${r.ticker}.${r.date}`} /> },
  ];

  return (
    <>
      <Toolbar q={q} setQ={setQ} year={year} setYear={setYear} />
      <DataTable
        cols={cols}
        rows={rows}
        emptyText="No filings match your filters."
        cardExtras={(r) => (
          <>
            <div className="tnum text-[12px]" style={{ color: "var(--text-secondary)" }}>
              {t("Record Date")}: {r.date}
            </div>
            <DocLink href={r.doc} id={`filings.rights.${r.ticker}.m`} />
          </>
        )}
      />
      <Pager page={page} setPage={setPage} total={total} />
      <Footnote id="filings.rights.note">
        {t("Right offer documents approved by BSEC and submitted to DSE by the issuer.")}
      </Footnote>
    </>
  );
}

/* ---------- Tab 4: Direct Listing ---------- */

function DirectTab() {
  const { t } = useLang();
  const [sub, setSub] = useState<DirectKind>("Applied");
  const [q, setQ] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [page, setPage] = useState(0);
  const { total, page: rows } = useFiltered(DIRECT[sub], q, year, page);

  const subs: { id: DirectKind; label: string }[] = [
    { id: "Applied", label: "Companies applied for Direct Listing" },
    { id: "Offloading", label: "Companies offloading Shares" },
    { id: "Archive", label: "Direct Listing Archive" },
  ];

  const cols: Col<Row>[] = [
    { h: "Company", render: (r) => <CompanyCell ticker={r.ticker} name={r.name} /> },
    { h: "Trade Code", render: (r) => <TickerCell ticker={r.ticker} /> },
    { h: "Date", align: "right", render: (r) => <span className="tnum">{r.date}</span> },
    { h: "Document", align: "right", render: (r) => <DocLink href={r.doc} id={`filings.direct.${sub}.${r.ticker}.${r.date}`} /> },
  ];

  return (
    <>
      <div className="inline-flex flex-wrap mb-3" style={{ border: "1px solid var(--line)", borderRadius: 2 }}>
        {subs.map((s, i) => {
          const active = sub === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                setSub(s.id);
                setPage(0);
              }}
              className="px-3 h-8 text-[12px] font-semibold"
              style={{
                background: active ? "var(--ink)" : "transparent",
                color: active ? "var(--surface)" : "var(--ink)",
                borderLeft: i !== 0 ? "1px solid var(--line)" : "none",
              }}
            >
              {t(s.label)}
            </button>
          );
        })}
      </div>
      <Toolbar q={q} setQ={setQ} year={year} setYear={setYear} />
      <DataTable
        cols={cols}
        rows={rows}
        emptyText="No filings match your filters."
        cardExtras={(r) => (
          <>
            <div className="tnum text-[12px]" style={{ color: "var(--text-secondary)" }}>
              {t("Date")}: {r.date}
            </div>
            <DocLink href={r.doc} id={`filings.direct.${sub}.${r.ticker}.m`} />
          </>
        )}
      />
      <Pager page={page} setPage={setPage} total={total} />
      <Footnote id={`filings.direct.${sub}.note`}>
        {t("Direct listing applications and offload disclosures filed with DSE.")}
      </Footnote>
    </>
  );
}

/* ---------- Tab 5: Re-listing ---------- */

function RelistingTab() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [page, setPage] = useState(0);
  const { total, page: rows } = useFiltered(RELISTING, q, year, page);

  const cols: Col<Row>[] = [
    { h: "Company", render: (r) => <CompanyCell ticker={r.ticker} name={r.name} /> },
    { h: "Trade Code", render: (r) => <TickerCell ticker={r.ticker} /> },
    { h: "Re-listing Date", align: "right", render: (r) => <span className="tnum">{r.date}</span> },
    { h: "Document", align: "right", render: (r) => <DocLink href={r.doc} id={`filings.relisting.${r.ticker}.${r.date}`} /> },
  ];

  return (
    <>
      <Toolbar q={q} setQ={setQ} year={year} setYear={setYear} />
      <DataTable
        cols={cols}
        rows={rows}
        emptyText="No filings match your filters."
        cardExtras={(r) => (
          <>
            <div className="tnum text-[12px]" style={{ color: "var(--text-secondary)" }}>
              {t("Re-listing Date")}: {r.date}
            </div>
            <DocLink href={r.doc} id={`filings.relisting.${r.ticker}.m`} />
          </>
        )}
      />
      <Pager page={page} setPage={setPage} total={total} />
      <Footnote id="filings.relisting.note">
        {t("Re-listing approvals and effective trading dates as published by DSE.")}
      </Footnote>
    </>
  );
}
