import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
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

// SAMPLE — replace with real document registry
const ENTRIES: string[] = [
  "Regarding the Revised Electricity Transmission Tariff (Wheeling Charge) of POWERGRID",
  "Clarification of Deshbandhu Polymer Limited on recent news published in the daily newspapers",
  "Board Meeting Decision of British American Tobacco Bangladesh Company Limited regarding recommendation of 600% cash dividend for the year ended 31 December 2025",
  "Dividend Disbursement Notice of Square Pharmaceuticals PLC for the year ended 31 March 2026",
  "Credit Rating Report of Grameenphone Limited reaffirmed at 'AAA' in the long term and 'ST-1' in the short term",
  "Spot Trading Notice of BRAC Bank PLC for the period 01 July 2026 to 03 July 2026",
  "Board Meeting Decision of Renata Limited regarding establishment of a new biologics manufacturing facility",
  "Notice of 32nd Annual General Meeting of Beximco Limited to be held on 28 July 2026 through digital platform",
  "Un-audited Quarterly Financial Statements of Robi Axiata Limited for the second quarter ended 30 June 2026",
  "Record Date Notice of Walton Hi-Tech Industries PLC for entitlement of 250% cash dividend for the year ended 30 June 2025",
  "Board Meeting Decision of The City Bank PLC regarding issuance of BDT 600 crore Tier-II Subordinated Bond",
  "Notice regarding scheduled annual maintenance shutdown of Olympic Industries Limited manufacturing unit-1",
  "Board Meeting Decision of LafargeHolcim Bangladesh Limited regarding acquisition of an aggregates and ready-mix business",
  "Notice of Extraordinary General Meeting of BSRM Limited regarding capacity expansion of the rolling mill",
  "Clarification of Beximco Pharmaceuticals Limited on recent price movement of its shares",
  "Un-audited Half Yearly Financial Statements of Islami Bank Bangladesh PLC for the half year ended 30 June 2026",
  "Board Meeting Decision of United Commercial Bank PLC regarding recommendation of 10% cash and 5% stock dividend",
  "Notice regarding change of registered office address of Bangladesh Shipping Corporation",
  "Credit Rating Report of Prime Bank PLC reaffirmed at 'AA+' in the long term and 'ST-2' in the short term",
  "Board Meeting Decision of Titas Gas Transmission and Distribution Company Limited regarding revised gas tariff structure",
  "Notice of Record Date of Meghna Petroleum Limited for entitlement of proposed cash dividend",
  "Un-audited Quarterly Financial Statements of Dutch-Bangla Bank PLC for the quarter ended 30 June 2026",
  "Board Meeting Decision of BSCCL regarding submission of Repeat Public Offering (RPO) proposal to BSEC",
  "Clarification of Jamuna Oil Company Limited on recent news published in the daily newspapers",
  "Board Meeting Decision of Aman Cotton Fibrous PLC regarding change of statutory auditor for the year 2026",
  "Notice regarding retirement of the Managing Director & CEO of Southeast Bank PLC",
  "Board Meeting Decision of Bata Shoe Company (Bangladesh) Limited regarding declaration of interim cash dividend",
  "Un-audited Quarterly Financial Statements of Berger Paints Bangladesh Limited for the quarter ended 30 June 2026",
  "Clarification of Fortune Shoes Limited on recent unusual price movement of its shares",
  "Notice regarding change of statutory auditor of ACI Limited for the financial year 2026-2027",
];

const PAGE_SIZE = 15;

function PsiPage() {
  const [q, setQ] = useState("");
  const [count, setCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ENTRIES;
    return ENTRIES.filter((e) => e.toLowerCase().includes(needle));
  }, [q]);

  const visible = filtered.slice(0, count);
  const hasMore = count < filtered.length;

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
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setCount(PAGE_SIZE);
          }}
          placeholder="Search disclosures…"
          className="h-9 px-3 text-[13px] outline-none w-full max-w-[420px] mb-4"
          style={{
            border: "1px solid var(--line)",
            background: "var(--surface)",
            color: "var(--ink)",
            borderRadius: 2,
          }}
        />

        <div style={{ border: "1px solid var(--line)", background: "var(--surface)", borderRadius: 2 }}>
          <ul>
            {visible.map((text, i) => (
              <li
                key={i}
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
              >
                <a
                  href="#"
                  className="flex items-start gap-2.5 px-3 py-2.5 group"
                >
                  <FileText
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: "var(--brand-600)" }}
                  />
                  <span
                    className="text-[13px] leading-[1.55] group-hover:underline"
                    style={{ color: "var(--ink)" }}
                  >
                    {text}
                  </span>
                </a>
              </li>
            ))}
            {visible.length === 0 && (
              <li className="px-3 py-6 text-center text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
                No disclosures match your search.
              </li>
            )}
          </ul>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
            Showing {visible.length} of {filtered.length}
          </div>
          {hasMore && (
            <button
              onClick={() => setCount((c) => c + PAGE_SIZE)}
              className="h-8 px-3 text-[12px] font-semibold"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--ink)",
                borderRadius: 2,
              }}
            >
              Load more
            </button>
          )}
        </div>

        <p className="mt-4 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Sample entries for demonstration — document PDFs will be linked from the DSE registry.
        </p>
      </section>
      <Footer />
    </div>
  );
}
