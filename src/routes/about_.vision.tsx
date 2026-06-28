import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { PageHero } from "@/components/dse/PageHero";
import { useLang } from "@/i18n/LanguageContext";
import heroAsset from "@/assets/dse-automation-1.jpg.asset.json";

export const Route = createFileRoute("/about_/vision")({
  head: () => ({
    meta: [
      { title: "Mission and Vision | Dhaka Stock Exchange" },
      { name: "description", content: "Mission and Vision of the Dhaka Stock Exchange (DSE)." },
      { property: "og:title", content: "Mission and Vision — DSE" },
      { property: "og:description", content: "DSE's mission and vision." },
    ],
  }),
  component: VisionPage,
});

function VisionPage() {
  const { t } = useLang();
  const missions = [
    "Proactive approach to keep pace with continuous technological advancement, and providing highest standard of service through efficiency improvement and introduction of new products.",
    "Contributing to country's economic growth through creation of wealth, facilitating access to capital and penetrating untapped market.",
    "Superior corporate governance to enhance confidence of investors, regulators, issuers and intermediaries.",
  ];
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Mission and Vision")}
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            {t("What DSE stands for, and the principles that guide our service to issuers, investors and the wider market.")}
          </p>
        </div>
      </section>
      <PageHero src={heroAsset} alt="DSE trading floor" />
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "var(--brand-600)" }}>
            {t("VISION")}
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            {t("To be the leading exchange in the region and a key driver of economic growth with state-of-art technology and world class service to ensure highest level of confidence among stakeholders.")}
          </p>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "var(--brand-600)" }}>
            {t("MISSION")}
          </div>
          <ul className="space-y-3 list-disc pl-5 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            {missions.map((m) => <li key={m}>{t(m)}</li>)}
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}
