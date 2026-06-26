import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";

const SCHEME_DOCS = [
  { title: "Demutualization Scheme", file: "Demutualization Schme.pdf", category: "Scheme Document" },
  { title: "The Exchanges Demutualization Act 2013", file: "DemuAct2013.pdf", category: "Legislation" },
  { title: "DSE Demutualization Act Submission to BSEC — 2025", file: "DSE-Submitted-the-Demutualization-Act_2025.pdf", category: "Submission" },
  { title: "DSE Demutualization Scheme Submission to BSEC — 2025", file: "DSE-submitted-the-Demutualization-Scheme-to-BSEC_2025.pdf", category: "Submission" },
];

function SchemeDocsSection() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-[960px] px-4 py-8 md:py-10">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">Scheme Documents</h2>
        <p className="text-xs text-muted-foreground mb-4">Payload CMS placeholder · documents to be wired to live data.</p>
        <div className="divide-y divide-border border border-border rounded-md bg-card">
          {SCHEME_DOCS.map((d) => (
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
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/demutualization")({
  head: () => ({
    meta: [
      { title: "Demutualization Scheme of DSE | Dhaka Stock Exchange" },
      { name: "description", content: "Demutualization Scheme of DSE and the Exchanges Demutualization Act 2013." },
      { property: "og:title", content: "Demutualization Scheme of DSE" },
      { property: "og:description", content: "Demutualization documents." },
    ],
  }),
  component: DemutualizationPage,
});

const DOCS = [
  { label: "Demutualization Scheme of DSE (PDF)", href: "#", cms: "demutualization.scheme" },
  { label: "Exchanges Demutualization Act 2013 (PDF)", href: "#", cms: "demutualization.act2013" },
];

function DemutualizationPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Demutualization Scheme of DSE")}
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            {t("The 2013 conversion of DSE from a mutual association of brokers into a for-profit, demutualised exchange.")}
          </p>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-3">
        {DOCS.map((d) => (
          <a
            key={d.label}
            href={d.href}
            data-cms={d.cms}
            className="flex items-center gap-3 p-4 hover:opacity-80 transition"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
          >
            <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
            <span className="text-[14px]" style={{ color: "var(--ink)" }}>{t(d.label)}</span>
          </a>
        ))}
      </section>
      <SchemeDocsSection />
      <Footer />
    </div>
  );
}
