import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/committees")({
  head: () => ({
    meta: [
      { title: "Board Committees | Dhaka Stock Exchange" },
      { name: "description", content: "Board committees of the Dhaka Stock Exchange PLC and their functions." },
      { property: "og:title", content: "Board Committees — DSE" },
      { property: "og:description", content: "DSE board committees." },
    ],
  }),
  component: CommitteesPage,
});

type Committee = { id: string; title: string; body: string };

const COMMITTEES: Committee[] = [
  {
    id: "nrc",
    title: "Nomination and Remuneration Committee (NRC)",
    body:
      "Functions as per Regulation 15(1) of the Dhaka Stock Exchange (Board and Administration) Regulations, 2013: scrutinize nomination papers of candidates for Director (including Independent Directors) per the \"Fit and Proper Criteria\"; recommend remuneration of Directors and of the Managing Director for shareholder approval through the board; search and short-list candidates for Managing Director; recommend appointment, compensation, succession and removal of the CRO in consultation with the RAC; recommend HR management, compensation and appraisal policies; recommend selection, evaluation and compensation of COO, CFO, CTO and Company Secretary; oversee implementation of HR policies; and submit written reports to the Board as requested.",
  },
  {
    id: "rac",
    title: "Regulatory Affairs Committee (RAC)",
    body:
      "Functions as per Regulation 15(2): acts as the vehicle for separation of business and regulatory activities; ensures the Regulatory Affairs Division (RAD) functions effectively; develops the regulatory plan and roles of each RAD department; approves annual plans/targets; recommends regulatory amendments to the Board; assesses RAD performance; conducts hearings of appeals against RAD enforcement/arbitration; identifies and manages conflicts of interest between commercial and regulatory functions; all RAD appointments/removals are subject to RAC approval; and establishes criteria for evaluating senior RAD management including the CRO.",
  },
  {
    id: "armc",
    title: "Audit and Risk Management Committee (ARMC)",
    body:
      "Functions as per Regulation 15(3): assist the Board in ensuring financial statements reflect a true and fair view and a good internal monitoring system; responsible for internal financial, cost and management audits; assess investment and financial-management risks; oversee the financial reporting process; monitor accounting policies and internal control/risk management; oversee external auditors; review annual, quarterly and half-yearly financial statements before board approval; review internal audit adequacy and significant related-party transactions; and report its activities to the Board and (in the annual report) to shareholders.",
  },
  {
    id: "ac",
    title: "Appeals Committee (AC)",
    body:
      "Functions as per Regulation 15(4): authority to decide on any appeal against decisions to take disciplinary action against officers/employees of the Exchange; no member shall be involved in the decision being appealed; and review the operations of the Disciplinary Procedures on a continuous basis.",
  },
  {
    id: "cmc",
    title: "Conflict Mitigation Committee (CMC)",
    body:
      "Functions as per Regulation 15(5): satisfy the Board that any perceived or actual conflict between the Exchange's regulatory responsibilities and commercial interests is addressed; review arrangements for dealing with conflicts (including those arising from listing the Exchange's own shares); supervise Director disclosures under the Code of Conduct; notify BSEC of relevant facts; and review regulatory implications and reputational risks of strategic initiatives.",
  },
  {
    id: "ita-sdc",
    title: "IT Advisory and Strategy Development Committee (ITA&SDC)",
    body: "Listed; details forthcoming.",
  },
];

function Row({ c }: { c: Committee }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left"
      >
        <span className="text-[15px] font-semibold" style={{ color: "var(--ink)" }}>{t(c.title)}</span>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform"
          style={{ color: "var(--brand-600)", transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && (
        <div className="px-4 pb-5 -mt-1">
          <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {c.body}
          </p>
        </div>
      )}
    </div>
  );
}

function CommitteesPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <TopBar />
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Board Committees")}
          </h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-3">
        {COMMITTEES.map((c) => <Row key={c.id} c={c} />)}
      </section>
      <Footer />
    </div>
  );
}
