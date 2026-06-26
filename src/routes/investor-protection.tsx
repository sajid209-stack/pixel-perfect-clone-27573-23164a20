import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

const IP_REG_DOCS = [
  { title: "Investors Protection Fund Regulations — 1999", file: "inv_prot.pdf", category: "Regulation" },
  { title: "Investor Protection Fund Regulations — 2014", file: "ipf_2014.pdf", category: "Regulation" },
];

function RegulatoryDocsSection() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-[960px] px-4 py-8 md:py-10">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">Regulatory Documents</h2>
        <p className="text-xs text-muted-foreground mb-4">Payload CMS placeholder · documents to be wired to live data.</p>
        <div className="divide-y divide-border border border-border rounded-md bg-card">
          {IP_REG_DOCS.map((d) => (
            <a key={d.file} href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors group">
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{d.title}</div>
                <div className="text-xs text-muted-foreground">{d.category} · {d.file}</div>
              </div>
              <Download className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/investor-protection")({
  head: () => ({
    meta: [
      { title: "Investors' Protection Fund | DSE" },
      { name: "description", content: "DSE maintains an Investors' Protection Fund as per the Investors' Protection Fund Regulations." },
      { property: "og:title", content: "Investors' Protection Fund — DSE" },
      { property: "og:description", content: "DSE maintains an Investors' Protection Fund as per the Investors' Protection Fund Regulations." },
    ],
  }),
  component: InvestorProtectionPage,
});

const DOCS = [
  "Investors' Protection Fund Regulations-2014",
  "Investors' Protection Fund Regulations-1999",
];

function InvestorProtectionPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Investor Services
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Investors' Protection Fund
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            DSE maintains an Investors' Protection Fund as per the Investors' Protection Fund Regulations.
          </p>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <ul className="space-y-3" data-cms="investor-protection.docs">
          {DOCS.map((d) => (
            <li key={d}>
              <a
                href="#"
                className="flex items-center justify-between rounded-md p-4"
                style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
              >
                <span className="text-[14px] font-medium" style={{ color: "var(--ink)" }}>{d}</span>
                <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--brand-600)" }}>PDF →</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}
