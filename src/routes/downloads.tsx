import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Download | Dhaka Stock Exchange" },
      { name: "description", content: "Download listing application forms and general DSE documents." },
      { property: "og:title", content: "Download | DSE" },
      { property: "og:description", content: "CMS-managed downloadable forms and documents." },
    ],
  }),
  component: DownloadsPage,
});

type Item = { title: string; date: string; href: string };
type Group = { title: string; items: Item[] };

const today = "2026-06-20";

const GROUPS: Group[] = [
  {
    title: "Listing Application Forms",
    items: [
      { title: "Equity Securities", date: today, href: "#" },
      { title: "Mutual Fund or Collective Investment Scheme", date: today, href: "#" },
      { title: "Debt Securities", date: today, href: "#" },
      { title: "Direct Listing or re-listing", date: today, href: "#" },
    ],
  },
  {
    title: "General Downloads",
    items: [
      "Required enclosures for Eligible Investors",
      "Required enclosures for Qualified Investors",
      "Initial and Annual Listing Fees",
      "Market Statistics",
      "Companies AGM/EGM & Record Date",
      "Board of Directors",
      "DSE Management",
      "Departments of DSE",
      "All TREC Holders Info.",
      "Memorandum & Articles of Association",
      "Annual Reports",
      "Forms Regarding Gift / Transfer / Buy / Sell of Shares / Units",
      "Form Regarding Investor Complaint against TREC Holder Company of DSE (English)",
      "Form Regarding Investor Complaint against TREC Holder Company of DSE (Bangla)",
      "Exit Plan of Savar Refractories Limited",
      "Transfer Request Form 14-1",
      "Offer Acceptance Form",
    ].map((t) => ({ title: t, date: today, href: "#" })),
  },
];

function DownloadsPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1000px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>Download</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            Download
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            Application forms, regulatory documents and reference materials. All items are
            CMS-managed — click any row to download the PDF.
          </p>
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-6 py-12 space-y-10">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-[20px] font-semibold tracking-[-0.01em]">{g.title}</h2>
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                {g.items.length} items
              </span>
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgb(var(--surface-rgb) / 0.6)",
                border: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              {g.items.map((it, i) => (
                <a
                  key={it.title}
                  href={it.href}
                  className="flex items-center gap-4 px-5 py-3.5 transition hover:opacity-90"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid rgb(var(--ov) / 0.06)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgb(var(--brand-tint) / 0.10)", color: "var(--primary)" }}
                  >
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium truncate">{it.title}</div>
                    <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      PDF · Updated {it.date}
                    </div>
                  </div>
                  <Download className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
