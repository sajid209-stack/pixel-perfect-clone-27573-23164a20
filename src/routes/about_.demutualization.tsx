import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Demutualization Scheme of DSE")}
          </h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-3">
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
      <Footer />
    </div>
  );
}
