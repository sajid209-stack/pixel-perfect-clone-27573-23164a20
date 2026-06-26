import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { FileText, Download } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Download | Dhaka Stock Exchange" },
      { name: "description", content: "Document centre for DSE — regulations, methodologies, reports and data services." },
      { property: "og:title", content: "Download | DSE" },
      { property: "og:description", content: "Document centre for DSE." },
    ],
  }),
  component: DownloadsPage,
});

type Doc = { title: string; category: string };
type Group = { id: string; label: string; docs: Doc[] };

const GROUPS: Group[] = [
  {
    id: "regulations",
    label: "Regulations",
    docs: [
      { title: "Memorandum & Articles of Association", category: "Regulation" },
      { title: "The Exchanges Demutualization Act 2013", category: "Legislation" },
      { title: "Demutualization Scheme", category: "Scheme Document" },
      { title: "Settlement Guarantee Fund Regulations-2013", category: "Regulation" },
      { title: "Short-Sale Regulations-2006", category: "Regulation" },
      { title: "Automated Trading Regulations-1999", category: "Regulation" },
    ],
  },
  {
    id: "index-methodology",
    label: "Index Methodology",
    docs: [
      { title: "DSEX & DS30 Index Methodology (S&P)", category: "Index Methodology" },
      { title: "DSEX Shariah Index Methodology", category: "Index Methodology" },
    ],
  },
  {
    id: "foreign-investors",
    label: "Foreign Investors",
    docs: [
      { title: "Opportunity for Foreign Investors", category: "Investor Guide" },
      { title: "Facilities for Non-resident Bangladeshis", category: "Investor Guide" },
    ],
  },
  {
    id: "data-services",
    label: "Data Services",
    docs: [
      { title: "Introduction to DSE Data Sale Services", category: "Data Services" },
      { title: "Market Data Service (MDS)", category: "Data Services" },
      { title: "End-of-Day Data (EOD)", category: "Data Services" },
      { title: "API for BHOMS", category: "Data Services" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    docs: [
      { title: "Weekly Market Report", category: "Report" },
    ],
  },
  {
    id: "sustainability",
    label: "Sustainability",
    docs: [
      { title: "DSE and GRI Collaboration", category: "Collaboration" },
      { title: "Guidance Document for Sustainability Reporting (GRI)", category: "Reporting Guide" },
      { title: "Bangladesh Bank Sustainable Finance Policy", category: "Policy" },
    ],
  },
];

function DownloadsPage() {
  const [active, setActive] = useState<string>(GROUPS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );
    GROUPS.forEach((g) => {
      const el = document.getElementById(g.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const totalDocs = useMemo(() => GROUPS.reduce((a, g) => a + g.docs.length, 0), []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Document Centre
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Download
          </h1>
          <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            {totalDocs} documents · Document links will be connected to live files when CMS is configured.
          </p>
        </div>
      </section>

      <div
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ background: "color-mix(in srgb, var(--bg) 92%, transparent)", borderColor: "var(--line)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-2 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            {GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="px-3 py-1.5 text-[12px] font-medium border transition"
                style={{
                  borderRadius: 2,
                  borderColor: active === g.id ? "#0C2C53" : "var(--line)",
                  background: active === g.id ? "#0C2C53" : "transparent",
                  color: active === g.id ? "#fff" : "var(--ink)",
                }}
              >
                {g.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-10">
        {GROUPS.map((g) => (
          <div key={g.id} id={g.id} className="scroll-mt-24">
            <h2 className="text-[18px] md:text-[20px] font-semibold mb-3" style={{ color: "var(--ink)" }}>
              {g.label}
            </h2>
            <div className="divide-y border" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
              {g.docs.map((d) => (
                <a
                  key={d.title}
                  href="#"
                  className="flex items-center gap-4 px-4 py-3 hover:bg-muted/40 transition-colors group"
                >
                  <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium truncate" style={{ color: "var(--ink)" }}>{d.title}</div>
                    <div className="text-[11px] uppercase tracking-[0.12em] mt-0.5" style={{ color: "var(--muted)" }}>{d.category}</div>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold border transition"
                    style={{ borderColor: "var(--line)", color: "var(--ink)", borderRadius: 2 }}
                  >
                    Download
                    <Download className="w-3.5 h-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
