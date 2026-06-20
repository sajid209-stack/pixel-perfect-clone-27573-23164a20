import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/listing_/why-list")({
  head: () => ({
    meta: [
      { title: "Why List with DSE | Dhaka Stock Exchange" },
      { name: "description", content: "Reasons to list your company on the Dhaka Stock Exchange and the available listing methods." },
      { property: "og:title", content: "Why List with DSE" },
      { property: "og:description", content: "Benefits and methods of listing with DSE." },
    ],
  }),
  component: WhyListPage,
});

const BULLETS = [
  "DSE is premier bourse of the country.",
  "DSE offers companies a recognised listing and capital raising venue.",
  "DSE provides deepest market liquidity available in the country.",
  "You can unlock your potential with more than 500 listed securities.",
  "DSE is committed to ensure orderly and fair markets and that risks are managed prudently, consistent with the public interest and the interests of the investing public.",
  "DSE is able to offer a transparent and well-regulated market for companies of all types and sizes to list their shares.",
  "Investors can participate in the growth of both local and foreign companies listed on the Exchange in the confident knowledge that they are investing in a market that meets international standards.",
  "DSE provides an efficient trading platform designed and developed by NASDAQOMX and FlexTrade.",
  "Simple and clear requirements for listings.",
  "Cost effective listing destination.",
  "Swift time-to-market.",
  "Strong investor protection regime under a sound regulatory framework.",
  "Transparent and fully automated marketplace.",
];

function WhyListPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <TopBar />
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("Listing")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Why List with DSE")}
          </h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-8">
        <ul className="space-y-2 list-disc pl-5 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          {BULLETS.map((b) => <li key={b}>{t(b)}</li>)}
        </ul>
        <div>
          <h2 className="text-[18px] font-semibold mb-3" style={{ color: "var(--ink)" }}>
            {t("Methods of Listing")}
          </h2>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            {t("There are two possible ways to get listed with DSE:")}
          </p>
          <ol className="mt-3 space-y-3 list-decimal pl-5 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            <li>
              {t("Listing through Initial Public Offer (IPO) — Fixed price method (shares may be offered at par, premium, or discount depending on the issuer's eligibility) or Book-building method (shares offered at the cut-off price).")}
            </li>
            <li>
              {t("Offloading of Shares through direct listing — applicable for Government-Owned Companies only.")}
            </li>
          </ol>
        </div>
      </section>
      <Footer />
    </div>
  );
}
