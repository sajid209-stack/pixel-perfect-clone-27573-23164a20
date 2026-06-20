import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability | Dhaka Stock Exchange" },
      { name: "description", content: "Sustainability at the Dhaka Stock Exchange — SSE, GRI, IFC partnerships, media, publications and training." },
      { property: "og:title", content: "Sustainability — DSE" },
      { property: "og:description", content: "DSE sustainability initiatives." },
    ],
  }),
  component: SustainabilityPage,
});

type TabId =
  | "about" | "sse" | "gri" | "ifc" | "bb-policy" | "media" | "publications" | "training";

const TABS: { id: TabId; label: string }[] = [
  { id: "about", label: "About (GRI)" },
  { id: "sse", label: "SSE Initiative Members" },
  { id: "gri", label: "GRI" },
  { id: "ifc", label: "IFC" },
  { id: "bb-policy", label: "Bangladesh Bank Policy" },
  { id: "media", label: "Media Coverage" },
  { id: "publications", label: "Publications" },
  { id: "training", label: "Training" },
];

const ABOUT =
  "The sustainability of stock exchanges is increasingly recognized as a critical factor in the global economy. As environmental, social, and governance (ESG) issues gain prominence, stock exchanges are adapting their operations to promote sustainable investment practices… The Dhaka Stock Exchange PLC (DSE) is working to enhance sustainability practices by executing collaborative agreements with various institutions… DSE has signed a collaboration agreement with the Global Reporting Initiative and the International Finance Corporation (IFC) to promote sustainability practices among listed companies. DSE also has a partnership agreement with the Sustainable Stock Exchanges (SSE) Initiative…";

const SSE_INTRO =
  "Dhaka Stock Exchange PLC (DSE) is a premier exchange in Bangladesh… As part of its commitment to sustainable development and responsible investment, DSE is proud to be a member of the Sustainable Stock Exchanges (SSE) Initiative…";

const GRI_INTRO =
  "The Global Reporting Initiative (GRI) is the independent, international standards organisation for sustainability reporting. DSE's partnership with GRI promotes consistent, comparable ESG disclosure among listed companies in Bangladesh.";

const IFC_INTRO =
  "Under the DSE–IFC Cooperation Agreement, the two institutions work together in three areas: workshops on climate and non-financial disclosures; TCFD trainings; and Sustainable Green Bonds training.";

const MEDIA: string[] = [
  "DSE signs cooperation agreement with IFC",
  "DSE partners with GRI to promote sustainability reporting",
  "DSE joins the Sustainable Stock Exchanges (SSE) Initiative",
  "DSE hosts workshop on climate disclosures",
  "DSE training on TCFD recommendations concluded",
];

const PUBLICATIONS: { label: string }[] = [
  { label: "DSE & GRI Bangladesh Flyer (English)" },
  { label: "DSE & GRI Bangladesh Flyer (Bangla)" },
];

const TRAININGS: string[] = [
  "Technical Series 01 — Introduction to Sustainability Reporting",
  "Technical Series 02 — GRI Standards Overview",
  "Technical Series 03 — Climate-related Financial Disclosures (TCFD)",
  "Technical Series 04 — Sustainable Green Bonds",
  "Technical Series 05 — ESG for Listed Companies",
];

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>{children}</p>
  );
}

function DocCard({ label, href, icon: Icon = FileText, cms }: { label: string; href?: string; icon?: typeof FileText; cms?: string }) {
  const { t } = useLang();
  return (
    <a
      href={href ?? "#"}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      data-cms={cms}
      className="flex items-center gap-3 p-4 hover:opacity-80 transition"
      style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
    >
      <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
      <span className="text-[14px]" style={{ color: "var(--ink)" }}>{t(label)}</span>
    </a>
  );
}

function SustainabilityPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<TabId>("about");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Sustainability")}
          </h1>
        </div>
      </section>

      <div className="sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {TABS.map((tb) => {
              const active = tb.id === tab;
              return (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  className="px-4 py-3 text-[13px] font-semibold whitespace-nowrap"
                  style={{
                    color: active ? "var(--brand-600)" : "var(--text-secondary)",
                    borderBottom: `2px solid ${active ? "var(--brand-600)" : "transparent"}`,
                  }}
                >
                  {t(tb.label)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-5">
        {tab === "about" && <Paragraph>{t(ABOUT)}</Paragraph>}

        {tab === "sse" && (
          <>
            <Paragraph>{t(SSE_INTRO)}</Paragraph>
            <a
              href="https://sseinitiative.org/stock-exchange/dse_bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-semibold"
              style={{ color: "var(--brand-600)" }}
            >
              {t("View DSE on the SSE Initiative")}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </>
        )}

        {tab === "gri" && (
          <>
            <Paragraph>{t(GRI_INTRO)}</Paragraph>
            <a
              href="https://www.globalreporting.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-semibold"
              style={{ color: "var(--brand-600)" }}
            >
              {t("Visit GRI")} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </>
        )}

        {tab === "ifc" && (
          <>
            <Paragraph>{t(IFC_INTRO)}</Paragraph>
            <a
              href="https://www.ifc.org/en/home"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-semibold"
              style={{ color: "var(--brand-600)" }}
            >
              {t("Visit IFC")} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </>
        )}

        {tab === "bb-policy" && (
          <Paragraph>
            {t("Bangladesh Bank's sustainable finance and ESG policy framework for banks and financial institutions, applicable to listed issuers.")}
          </Paragraph>
        )}

        {tab === "gri" && (
          <div className="mt-6" data-cms="sustainability.gri.subsections">
            <h3 className="text-[14px] font-semibold mb-2" style={{ color: "var(--ink)" }}>GRI sub-sections</h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13px]" style={{ color: "var(--text-secondary)" }}>
              {["Collaboration","Guidance on Reporting","Training & Seminars","Publications","Media Coverage"].map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
        )}

        {tab === "media" && (
          <div className="space-y-3">
            {MEDIA.map((m) => <DocCard key={m} label={m} cms="sustainability.media" />)}
          </div>
        )}

        {tab === "publications" && (
          <div className="space-y-3">
            {PUBLICATIONS.map((p) => <DocCard key={p.label} label={p.label} cms="sustainability.publication" />)}
          </div>
        )}

        {tab === "training" && (
          <div className="space-y-3">
            {TRAININGS.map((tr) => <DocCard key={tr} label={tr} cms="sustainability.training" />)}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
