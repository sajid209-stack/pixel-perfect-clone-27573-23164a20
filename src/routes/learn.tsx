import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { PageHeroSlider, DEFAULT_HERO_SLIDES } from "@/components/dse/PageHeroSlider";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "DSE Training Academy | Dhaka Stock Exchange" },
      {
        name: "description",
        content: "Human resource development for Bangladesh's capital market — DSE Training Academy (DTA).",
      },
      { property: "og:title", content: "DSE Training Academy" },
      {
        property: "og:description",
        content: "Human resource development for Bangladesh's capital market.",
      },
    ],
  }),
  component: LearnPage,
});

const OBJECTIVES = [
  "To educate and develop professionals for the securities industry in Bangladesh",
  "To function as a center for creating investor awareness through research and training",
  "To contribute to the orderly and healthy development of the Capital Market",
  "To disseminate information about Local and International Capital Markets",
  "To offer training programs required for the registration of target groups of Capital Market professionals",
  "To offer intermediate-level and advanced training for stakeholders of the Capital Market",
  "To offer compliance and governance related training to Issuer firms",
  "To offer training for DSE Officials on skill development",
  "To review, revise and update qualification programs to ensure highest quality",
  "To establish a comprehensive database of instructors and participants",
  "To create alliances with international educational and regulatory institutions",
  "To develop and deliver high-quality short courses based on industry and regulatory needs",
];

const RELATED: { label: string; to: string }[] = [
  { label: "FAQ", to: "/faq" },
  { label: "Investors' Protection Fund", to: "/investor-protection" },
  { label: "Foreign Investor Guide", to: "/foreign-investors" },
];

// Driven by a Payload 'courses' collection: { title, description, duration, format, category }
const COURSES = [
  { title: "Certificate Programme on Basics of Stock Market", desc: "Fundamentals of the capital market, trading mechanics, regulatory framework and investor protection. Suitable for new entrants.", meta: "3 days · Classroom" },
  { title: "TREC Holder Compliance Training", desc: "Regulatory obligations for TREC-holding brokerage houses — reporting, margin, client KYC and BSEC directives.", meta: "2 days · Classroom" },
  { title: "Financial Statement Analysis", desc: "Reading and interpreting listed company financials — income statement, balance sheet, cash flow, and ratio analysis.", meta: "2 days · Classroom" },
  { title: "Corporate Governance for Listed Companies", desc: "Board responsibilities, disclosure obligations and the BSEC Corporate Governance Code for listed company officers.", meta: "1 day · Classroom" },
  { title: "Derivatives & Future Products", desc: "Introduction to derivative instruments, futures mechanics and their application in the Bangladeshi capital market context.", meta: "2 days · Classroom" },
  { title: "Portfolio Management & Asset Allocation", desc: "Modern portfolio theory, asset class selection, rebalancing strategies and performance measurement.", meta: "2 days · Classroom" },
  { title: "Mutual Fund Operations", desc: "Structure, regulation, NAV calculation, fund accounting and investor rights for mutual fund professionals.", meta: "2 days · Classroom" },
  { title: "Market Surveillance & Risk Management", desc: "Surveillance methodologies, circuit breaker mechanisms and risk management frameworks for exchange operations staff.", meta: "1 day · Classroom" },
  { title: "Fixed Income & Government Securities", desc: "G-Sec auction process, bond valuation, yield curves and the secondary market for debt instruments on DSE.", meta: "1 day · Classroom" },
  { title: "OTC Market Operations", desc: "Trading mechanics, settlement and compliance requirements for over-the-counter market participants.", meta: "1 day · Classroom" },
];

function LearnPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <PageHeroSlider slides={DEFAULT_HERO_SLIDES} />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Investor Education
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            DSE Training Academy
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Human resource development for Bangladesh's capital market.
          </p>
        </div>
      </section>

      <section className="max-w-[760px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="prose-like space-y-4 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }} data-cms="dta.intro">
          <p>
            DSE Training Academy (DTA) started its journey on September 10, 2007, inaugurated by the then Finance and Planning Adviser Dr. A.B. Mirza Md. Azizul Islam. Another training venue of DTA was inaugurated by Dr. Mashiur Rahman, the Economic Affairs Adviser to the Prime Minister, on February 02, 2010. The core mission of DSE Training Academy is Human Resource Development in the field of Capital Market.
          </p>
          <p>
            The academy has 2 different class rooms with capacity of 108 and 40 respectively, equipped with all modern amenities and set up with a prayer room, spacious lobby and a cafeteria. The class rooms are equipped with modern electronic tools, sound system, central AC and a generator for backup. DSE Training Academy has faculties and speakers drawn from the industry — a rich pool of professionals, practitioners and eminent personalities who mix theory with practical aspects through which participants get hands-on knowledge and experience.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-[20px] font-semibold mb-3" style={{ color: "var(--ink)" }}>Objectives</h2>
          <ul className="list-disc pl-5 space-y-2 text-[14px] leading-relaxed" style={{ color: "var(--ink)" }} data-cms="dta.objectives">
            {OBJECTIVES.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-[20px] font-semibold mb-3" style={{ color: "var(--ink)" }}>Related investor resources</h2>
          <ul className="grid sm:grid-cols-3 gap-3">
            {RELATED.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="block rounded-md p-4"
                  style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
                >
                  <div className="text-[14px] font-semibold" style={{ color: "var(--ink)" }}>{r.label}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--brand-600)" }}>Open →</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <h2 className="text-[20px] font-semibold mb-3" style={{ color: "var(--ink)" }}>DSE Training Academy (DTA)</h2>
        <p className="text-[14px] leading-relaxed max-w-[760px] mb-6" style={{ color: "var(--ink)" }}>
          The DSE Training Academy provides professional development programmes for capital market participants — TREC holders, listed company officers, fund managers, and market professionals. Courses are conducted at the DSE Tower and are certified by the exchange.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" data-cms="dta.courses">
          {COURSES.map((c) => (
            <li
              key={c.title}
              className="rounded-md p-4 hover:opacity-90 transition"
              style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
            >
              <div className="text-[14px] font-semibold" style={{ color: "var(--ink)" }}>{c.title}</div>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{c.desc}</p>
              <div className="mt-3 text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--brand-600)" }}>{c.meta}</div>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <p className="text-[14px]" style={{ color: "var(--ink)" }}>
            For registration and upcoming schedules, contact the DSE Training Academy.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2 text-[13px] font-semibold text-white"
            style={{ background: "#0C2C53", borderRadius: 2 }}
          >
            Contact DTA
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
