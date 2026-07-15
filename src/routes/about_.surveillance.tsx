import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { PageHero } from "@/components/dse/PageHero";
import { useLang } from "@/i18n/LanguageContext";
import heroAsset from "@/assets/about-dse-mega.jpg.asset.json";

export const Route = createFileRoute("/about_/surveillance")({
  head: () => ({
    meta: [
      { title: "Surveillance at DSE | Dhaka Stock Exchange" },
      { name: "description", content: "Market surveillance function at the Dhaka Stock Exchange." },
      { property: "og:title", content: "Surveillance at DSE" },
      { property: "og:description", content: "How DSE oversees market integrity." },
    ],
  }),
  component: SurveillancePage,
});

const PARAS = [
  "Market Surveillance ensures orderly market in light of regulatory compliance and detects manipulative and abuse trading pattern. Surveillance Department of Dhaka Stock Exchanges (DSE) plays a vital role in ensuring safety and integrity of the markets. The Department has been set up with a view to keep a proactive oversight on the surveillance activities of DSE. All the instruments traded in the market come under the Surveillance umbrella of DSE.",
  "The main objective of the Surveillance function of the Exchange is to promote market integrity in the following ways: By monitoring price and volume movements (volatility) as well as by detecting potential market abuses at a nascent stage, with a view to minimizing the ability of the market participants to influence the price of the scrip/scrips in the absence of any meaningful information. By managing default risk by taking necessary actions timely.",
  "Market Abuse is a broad term which includes abnormal price/volume movement, artificial transactions, false or misleading impressions, insider trading, etc. In order to detect aberrant behavior/movement, it is necessary to know the normal market behavior. The department carries out investigation, if necessary, based on the preliminary examination/analysis and suitable actions are taken against members involved based on the investigation.",
  "Surveillance activities are divided broadly into two major segments: 1. Price Monitoring — related to the price movement/abnormal fluctuation in prices or volumes (On-line Real Time Surveillance and Off-Line Surveillance). 2. Position Monitoring — relates to abnormal positions of members, Dealers, Institutions and General Investors in order to manage default risk; the Surveillance Department closely monitors outstanding exposure of members on a daily basis.",
  "Others — Rumor Verification: liaising with Compliance Officers of companies to obtain comments on price-sensitive corporate news; Review Media Information; Market Intelligence: rumors floating in the market are verified with data available with DSE, Newspapers, Television news channels & Reuters to ascertain national & global factors affecting the market sentiments.",
];

function SurveillancePage() {
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
            {t("Surveillance at DSE")}
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            {t("How DSE monitors trading activity to detect manipulation, ensure fair price discovery and protect investor interest.")}
          </p>
        </div>
      </section>
      <PageHero src={heroAsset} alt="DSE surveillance" />
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-5">
        {PARAS.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            {t(p)}
          </p>
        ))}
      </section>
      <Footer />
    </div>
  );
}
