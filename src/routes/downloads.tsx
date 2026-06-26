import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Regulations, index methodologies, investor guides, data service brochures and forms — all official DSE reference documents in one place.",
      },
      { property: "og:title", content: "Downloads | DSE" },
      {
        property: "og:description",
        content:
          "Regulations, index methodologies, investor guides, data service brochures and forms — all official DSE reference documents in one place.",
      },
    ],
  }),
  component: DownloadsPage,
});

type Doc = { title: string; file: string; category: string };
type Group = { id: string; title: string; items: Doc[] };

const GROUPS: Group[] = [
  {
    id: "regulations",
    title: "Regulations",
    items: [
      { title: "Memorandum & Articles of Association", file: "MandA.pdf", category: "Regulations" },
      { title: "The Exchanges Demutualization Act 2013", file: "DemuAct2013.pdf", category: "Regulations" },
      { title: "Demutualization Scheme", file: "Demutualization Schme.pdf", category: "Regulations" },
      { title: "Settlement Guarantee Fund Regulations-2013", file: "SGF-27082014130507.pdf", category: "Regulations" },
      { title: "Short-Sale Regulations-2006", file: "shortSaleReg.pdf", category: "Regulations" },
      { title: "Automated Trading Regulations-1999", file: "auto_trade.pdf", category: "Regulations" },
    ],
  },
  {
    id: "index-methodology",
    title: "Index Methodology",
    items: [
      { title: "DSEX & DS30 Index Methodology — developed by S&P", file: "DSEX_DS30.pdf", category: "Index Methodology" },
      { title: "DSEX Shariah Index Methodology", file: "DSES.pdf", category: "Index Methodology" },
    ],
  },
  {
    id: "foreign-investors",
    title: "Foreign Investors",
    items: [
      { title: "Opportunity for Foreign Investors", file: "facilitiesForForeignInvestors.pdf", category: "Foreign Investors" },
      { title: "Facilities for Non-resident Bangladeshis", file: "facilitiesForNRB.pdf", category: "Foreign Investors" },
    ],
  },
  {
    id: "data-services",
    title: "Data Services",
    items: [
      { title: "Introduction to DSE Data Sale Services", file: "Introduction of DSE Data Sale Services.pdf", category: "Data Services" },
      { title: "Market Data Service — MDS", file: "iMDS.pdf", category: "Data Services" },
      { title: "End-of-Day Data — EOD", file: "EOD.pdf", category: "Data Services" },
      { title: "API for BHOMS", file: "BHOMS_Brochure_v1.1.pdf", category: "Data Services" },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    items: [
      { title: "Weekly Market Report", file: "weekly_report.pdf", category: "Reports" },
    ],
  },
  {
    id: "sustainability",
    title: "Sustainability",
    items: [
      { title: "DSE and GRI Collaboration", file: "DSE-&-GRI-Collaborations.pdf", category: "Sustainability" },
      { title: "Guidance Document for Sustainability Reporting — GRI", file: "Guidance-Document-for-Sustainability-Reporting-Based-On-GRI.pdf", category: "Sustainability" },
      { title: "Bangladesh Bank Sustainable Finance Policy", file: "dec312020sfd05.pdf", category: "Sustainability" },
    ],
  },
];

function DownloadsPage() {
  const [activeId, setActiveId] = useState(GROUPS[0].id);

  useEffect(() => {
    const sections = GROUPS.map((g) => document.getElementById(g.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "#ffffff", color: "#161A1F" }} className="min-h-screen">
      <Nav />

      <section className="border-b" style={{ borderColor: "#E0E5EA" }}>
        <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-8">
          <div className="text-[11px] mb-3" style={{ color: "#586068" }}>
            <Link to="/" className="hover:opacity-80">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>Downloads</span>
          </div>
          <h1
            className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]"
            style={{ color: "#0B2545" }}
          >
            Downloads
          </h1>
          <p className="mt-4 text-[15px] max-w-[760px]" style={{ color: "#586068" }}>
            Regulations, index methodologies, investor guides, data service brochures
            and forms — all official DSE reference documents in one place.
          </p>
          <p
            className="mt-4 text-[12px] inline-block px-3 py-1.5"
            style={{
              background: "#F4F7FA",
              color: "#586068",
              border: "1px solid #E0E5EA",
            }}
          >
            Document links will be connected to live files when the CMS is configured.
          </p>
        </div>
      </section>

      <div
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ borderColor: "#E0E5EA", background: "rgba(255,255,255,0.92)" }}
      >
        <div className="max-w-[1100px] mx-auto px-6 py-2.5 flex gap-1 overflow-x-auto">
          {GROUPS.map((g) => {
            const active = activeId === g.id;
            return (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="text-[12px] font-medium px-3 py-1.5 whitespace-nowrap transition"
                style={{
                  color: active ? "#185FA5" : "#586068",
                  borderBottom: active ? "2px solid #185FA5" : "2px solid transparent",
                }}
              >
                {g.title}
              </a>
            );
          })}
        </div>
      </div>

      <main className="max-w-[1100px] mx-auto px-6 py-12 space-y-12">
        {GROUPS.map((g) => (
          <section key={g.id} id={g.id} data-cms-collection="documents" data-cms-group={g.id}>
            <h2
              className="text-[22px] font-bold tracking-[-0.01em] mb-4"
              style={{ color: "#0B2545" }}
            >
              {g.title}
            </h2>
            <div style={{ border: "1px solid #E0E5EA", background: "#ffffff" }}>
              {g.items.map((it, i) => (
                <div
                  key={it.file}
                  data-cms-record={it.file}
                  className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-[#F4F7FA]"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid #E0E5EA",
                  }}
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
                      {it.category}
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
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
