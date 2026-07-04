import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

const searchSchema = z.object({
  view: fallback(z.enum(["applied", "offloading", "archive"]), "applied").default("applied"),
});

export const Route = createFileRoute("/companies_/direct-listing")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Direct Listing | DSE" },
      { name: "description", content: "Companies listed by direct listing on the Dhaka Stock Exchange." },
      { property: "og:title", content: "Direct Listing — DSE" },
      { property: "og:description", content: "Companies listed by direct listing." },
    ],
  }),
  component: DirectListingPage,
});

type Attr =
  | "Listing process"
  | "Nature of Business"
  | "Listing Date"
  | "Trading Date"
  | "Offer Price (Tk.)"
  | "Face Value (Tk.)"
  | "Market lot (Share)"
  | "Total share"
  | "Offloading share"
  | "Total Paid up Capital"
  | "EPS"
  | "NAV"
  | "Manager to the Issue"
  | "Web/E-mail";

const ATTR_ORDER: Attr[] = [
  "Listing process",
  "Nature of Business",
  "Listing Date",
  "Trading Date",
  "Offer Price (Tk.)",
  "Face Value (Tk.)",
  "Market lot (Share)",
  "Total share",
  "Offloading share",
  "Total Paid up Capital",
  "EPS",
  "NAV",
  "Manager to the Issue",
  "Web/E-mail",
];

type Company = { name: string; attrs: Partial<Record<Attr, string>> };
type YearBucket = { year: string; companies: Company[] };

// SAMPLE — replace at wiring
const ARCHIVE: YearBucket[] = [
  {
    year: "Direct Listing 2010",
    companies: [
      {
        // SAMPLE — fill from mirror
        name: "United Airways (BD) Limited",
        attrs: {
          "Listing process": "Direct Listing",
          "Nature of Business": "Airlines / Aviation",
          "Listing Date": "22 August 2010",
          "Trading Date": "05 September 2010",
          "Offer Price (Tk.)": "45.00",
          "Face Value (Tk.)": "10.00",
          "Market lot (Share)": "100",
          "Total share": "428,571,428",
          "Offloading share": "42,857,142",
          "Total Paid up Capital": "4,285,714,280",
          EPS: "2.10",
          NAV: "14.60",
          "Manager to the Issue": "ICB Capital Management Ltd.",
          "Web/E-mail": "info@united-airways.com",
        },
      },
    ],
  },
  {
    year: "Direct Listing 2009",
    companies: [
      {
        // SAMPLE — fill from mirror
        name: "Titas Gas Transmission and Distribution Company Ltd.",
        attrs: {
          "Listing process": "Direct Listing",
          "Nature of Business": "Fuel & Power (Gas transmission)",
          "Listing Date": "20 April 2009",
          "Trading Date": "04 May 2009",
          "Offer Price (Tk.)": "68.00",
          "Face Value (Tk.)": "10.00",
          "Market lot (Share)": "50",
          "Total share": "988,050,000",
          "Offloading share": "98,805,000",
          "Total Paid up Capital": "9,880,500,000",
          EPS: "6.42",
          NAV: "40.18",
          "Manager to the Issue": "ICB Capital Management Ltd.",
          "Web/E-mail": "info@titasgas.org.bd",
        },
      },
    ],
  },
  {
    year: "Direct Listing 2008",
    companies: [
      {
        // SAMPLE — fill from mirror
        name: "Navana CNG Limited",
        attrs: {
          "Listing process": "Direct Listing",
          "Nature of Business": "Fuel & Power (CNG conversion & refuelling)",
          "Listing Date": "18 December 2008",
          "Trading Date": "04 January 2009",
          "Offer Price (Tk.)": "112.00",
          "Face Value (Tk.)": "100.00",
          "Market lot (Share)": "10",
          "Total share": "6,000,000",
          "Offloading share": "600,000",
          "Total Paid up Capital": "600,000,000",
          EPS: "18.44",
          NAV: "138.20",
          "Manager to the Issue": "ICB Capital Management Ltd.",
          "Web/E-mail": "info@navanacng.com",
        },
      },
    ],
  },
  {
    year: "Direct Listing 2007",
    companies: [
      {
        name: "Jamuna Oil Company Limited",
        attrs: {
          "Listing process": "Direct Listing",
          "Nature of Business": "Marketing of petroleum products",
          "Listing Date": "27 December 2007",
          "Trading Date": "10 January 2008",
          "Offer Price (Tk.)": "160.00",
          "Face Value (Tk.)": "100.00",
          "Market lot (Share)": "5",
          "Total share": "8,232,000",
          "Offloading share": "823,200",
          "Total Paid up Capital": "823,200,000",
          EPS: "26.10",
          NAV: "182.44",
          "Manager to the Issue": "ICB Capital Management Ltd.",
          "Web/E-mail": "info@jamunaoil.org",
        },
      },
      {
        // legacy spelling of "Petrolium" — keep verbatim
        name: "Meghna Petrolium Limited",
        attrs: {
          "Listing process": "Direct Listing",
          "Nature of Business": "Marketing of petroleum products",
          "Listing Date": "27 December 2007",
          "Trading Date": "10 January 2008",
          "Offer Price (Tk.)": "155.00",
          "Face Value (Tk.)": "100.00",
          "Market lot (Share)": "5",
          "Total share": "9,624,000",
          "Offloading share": "962,400",
          "Total Paid up Capital": "962,400,000",
          EPS: "24.82",
          NAV: "176.11",
          "Manager to the Issue": "ICB Capital Management Ltd.",
          "Web/E-mail": "info@mpl.gov.bd",
        },
      },
    ],
  },
  {
    year: "Direct Listing 2006",
    companies: [
      {
        name: "Power Grid Company of Bangladesh Ltd.",
        attrs: {
          "Listing process": "Direct Listing",
          "Nature of Business": "Electricity transmission",
          "Listing Date": "19 December 2006",
          "Trading Date": "02 January 2007",
          "Offer Price (Tk.)": "128.00",
          "Face Value (Tk.)": "100.00",
          "Market lot (Share)": "5",
          "Total share": "34,182,000",
          "Offloading share": "3,418,200",
          "Total Paid up Capital": "3,418,200,000",
          EPS: "8.72",
          NAV: "126.44",
          "Manager to the Issue": "ICB Capital Management Ltd.",
          "Web/E-mail": "info@pgcb.org.bd",
        },
      },
      {
        name: "Dhaka Electric Supply Company Ltd.",
        attrs: {
          "Listing process": "Direct Listing",
          "Nature of Business": "Electricity distribution",
          "Listing Date": "05 October 2006",
          "Trading Date": "19 October 2006",
          "Offer Price (Tk.)": "148.00",
          "Face Value (Tk.)": "100.00",
          "Market lot (Share)": "5",
          "Total share": "34,000,000",
          "Offloading share": "3,400,000",
          "Total Paid up Capital": "3,400,000,000",
          EPS: "10.14",
          NAV: "141.88",
          "Manager to the Issue": "ICB Capital Management Ltd.",
          "Web/E-mail": "info@desco.org.bd",
        },
      },
    ],
  },
];

const VIEWS = [
  { key: "applied", label: "Companies applied for Direct Listing" },
  { key: "offloading", label: "Companies offloading Shares" },
  { key: "archive", label: "Direct Listing Archive" },
] as const;

function DirectListingPage() {
  const { view } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Companies
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Direct Listing
          </h1>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-6">
          <aside
            className="h-fit"
            style={{ border: "1px solid var(--line)", background: "var(--surface)", borderRadius: 2 }}
          >
            <ul>
              {VIEWS.map((v, i) => {
                const active = v.key === view;
                return (
                  <li key={v.key}>
                    <button
                      onClick={() => navigate({ search: { view: v.key } })}
                      className="w-full text-left px-3 py-2.5 text-[13px]"
                      style={{
                        borderTop: i === 0 ? "none" : "1px solid var(--line)",
                        background: active ? "var(--brand-600)" : "transparent",
                        color: active ? "#fff" : "var(--ink)",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {v.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div>
            {view === "applied" && (
              <EmptyView heading="Companies applied for Direct Listing" />
            )}
            {view === "offloading" && (
              <EmptyView heading="Companies offloading Shares" />
            )}
            {view === "archive" && <ArchiveView />}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function EmptyView({ heading }: { heading: string }) {
  return (
    <div>
      <h2 className="text-[18px] font-semibold mb-3" style={{ color: "var(--ink)" }}>
        {heading}
      </h2>
      <div
        className="px-4 py-10 text-center text-[13px]"
        style={{
          border: "1px solid var(--line)",
          background: "var(--surface)",
          color: "var(--text-secondary)",
          borderRadius: 2,
        }}
      >
        No companies are currently listed under this section.
      </div>
    </div>
  );
}

function ArchiveView() {
  const [open, setOpen] = useState<string | null>(ARCHIVE[0]?.year ?? null);
  return (
    <div>
      <h2 className="text-[18px] font-semibold mb-3" style={{ color: "var(--ink)" }}>
        Direct Listing Archive
      </h2>
      <div
        style={{ border: "1px solid var(--line)", background: "var(--surface)", borderRadius: 2 }}
      >
        {ARCHIVE.map((y, i) => {
          const isOpen = open === y.year;
          return (
            <div key={y.year} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
              <button
                onClick={() => setOpen(isOpen ? null : y.year)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left"
                style={{
                  background: isOpen ? "var(--surface-2)" : "transparent",
                  color: "var(--ink)",
                }}
              >
                <span className="text-[13.5px] font-semibold">{y.year}</span>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4" style={{ color: "var(--brand-600)" }} />
                ) : (
                  <ChevronRight className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                )}
              </button>
              {isOpen && (
                <div className="px-3 pb-4 pt-1 space-y-4" style={{ background: "var(--surface-2)" }}>
                  {y.companies.map((c) => (
                    <CompanyTable key={c.name} company={c} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompanyTable({ company }: { company: Company }) {
  const numStyle: React.CSSProperties = {
    color: "var(--ink)",
    fontFamily: "var(--font-mono)",
  };
  return (
    <div style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
      <div
        className="px-3 py-2 text-[13px] font-semibold"
        style={{
          background: "var(--brand-600)",
          color: "#fff",
        }}
      >
        {company.name}
      </div>
      <table className="w-full text-[12.5px]">
        <tbody>
          {ATTR_ORDER.map((k, i) => (
            <tr
              key={k}
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--line)",
              }}
            >
              <td
                className="px-3 py-1.5 w-[45%]"
                style={{ color: "var(--text-secondary)", background: "var(--surface-2)" }}
              >
                {k}
              </td>
              <td className="px-3 py-1.5 tnum" style={numStyle}>
                {company.attrs[k] ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
