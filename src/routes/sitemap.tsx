import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Site Map | Dhaka Stock Exchange" },
      { name: "description", content: "Browse the full structure of the Dhaka Stock Exchange website." },
      { property: "og:title", content: "Site Map | DSE" },
      { property: "og:description", content: "Index of all sections on the DSE site." },
    ],
  }),
  component: SitemapPage,
});

type Item = { label: string; to: string; hash?: string };
type Group = { title: string; items: Item[] };

const GROUPS: Group[] = [
  {
    title: "Markets",
    items: [
      { label: "Latest Share Price", to: "/markets/latest-share-price" },
      { label: "Top Shares", to: "/markets/top-shares" },
      { label: "Market Depth", to: "/market-depth" },
      { label: "Circuit Breaker", to: "/circuit-breaker" },
      { label: "Recent Market Information", to: "/recent-market-information" },
      { label: "All Indices", to: "/indices" },
      { label: "DSEX", to: "/indices/DSEX" },
      { label: "DS30", to: "/indices/DS30" },
      { label: "DSES", to: "/indices/DSES" },
      { label: "Index Methodology", to: "/index-methodology" },
      { label: "Market Statistics", to: "/markets" },
      { label: "Performance at a Glance", to: "/markets/at-a-glance" },
      { label: "Comparison of Market", to: "/markets/comparison" },
      { label: "P/E at a Glance", to: "/pe" },
      { label: "Sectoral Median P/E", to: "/sectoral-pe" },
      { label: "Holidays & Trading Sessions", to: "/holidays" },
      { label: "Data Archives", to: "/data-archives" },
    ],
  },
  {
    title: "Companies & Filings",
    items: [
      { label: "Stock Screener", to: "/companies" },
      { label: "Sector wise Company List", to: "/companies/sectors" },
      { label: "Corporate Actions", to: "/corporate-actions" },
      { label: "Financial Statement Status", to: "/financial-statement-status" },
      { label: "Going Concern List", to: "/going-concern" },
      { label: "Actuarial Valuation", to: "/actuarial-valuation" },
      { label: "All Filings", to: "/filings" },
      { label: "Auditor's Opinion and Others", to: "/filings/auditors-opinion" },
      { label: "PSI and Material Information", to: "/filings/psi" },
      { label: "Proceeds Utilisation", to: "/filings/proceeds-utilisation" },
      { label: "Right Offer Documents", to: "/companies/right-offers" },
      { label: "Direct Listing", to: "/companies/direct-listing" },
      { label: "Re-listing", to: "/companies/re-listing" },
    ],
  },
  {
    title: "Instruments & Listing",
    items: [
      { label: "IPO Centre", to: "/ipo" },
      { label: "Bonds & Debt Board", to: "/bonds" },
      { label: "Government Securities", to: "/bonds/government-securities" },
      { label: "Mutual Funds & ETFs", to: "/funds" },
      { label: "OTC Market", to: "/otc" },
      { label: "Listing Requirements", to: "/listing" },
      { label: "Products & Data Services", to: "/products" },
    ],
  },
  {
    title: "News & Publications",
    items: [
      { label: "News & Announcements", to: "/news" },
      { label: "Weekly Report", to: "/publications/weekly" },
      { label: "Publications", to: "/publications" },
      { label: "Reports & Annual Reports", to: "/reports" },
      { label: "Picture Gallery", to: "/gallery" },
      { label: "Major Events", to: "/about/major-events" },
    ],
  },
  {
    title: "Investors",
    items: [
      { label: "Learn — Investor Education", to: "/learn" },
      { label: "FAQ", to: "/faq" },
      { label: "Investor Protection Fund", to: "/investor-protection" },
      { label: "Foreign Investor Guide", to: "/foreign-investors" },
      { label: "General Profile of Bangladesh", to: "/foreign-investors/general-profile" },
      { label: "Economy of Bangladesh", to: "/foreign-investors/economy" },
      { label: "Help Desk", to: "/help-desk" },
      { label: "NRB Help Desk", to: "/help-desk/nrb" },
      { label: "Complaints", to: "/complaints" },
      { label: "CDBL", to: "/cdbl" },
      { label: "Downloads", to: "/downloads" },
      { label: "DSE-Mobile", to: "/dse-mobile" },
    ],
  },
  {
    title: "About DSE",
    items: [
      { label: "About", to: "/about" },
      { label: "Introduction to DSE", to: "/about/introduction" },
      { label: "Mission & Vision", to: "/about/vision" },
      { label: "DSE at a Glance", to: "/about/at-a-glance" },
      { label: "Board of Directors", to: "/about/board" },
      { label: "Board Committees", to: "/about/committees" },
      { label: "DSE Management", to: "/about/management" },
      { label: "Presidents / Chairmen", to: "/about/chairmen" },
      { label: "Automation", to: "/about/automation" },
      { label: "Demutualization", to: "/about/demutualization" },
      { label: "Surveillance", to: "/about/surveillance" },
      { label: "TREC Holders' Directory", to: "/members" },
      { label: "Regulations & Rulebook", to: "/regulations" },
      { label: "Back-Office Software Vendors", to: "/vendors" },
      { label: "Sustainability", to: "/sustainability" },
      { label: "Careers", to: "/careers" },
      { label: "Citizen Charter", to: "/citizen-charter" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

function SitemapPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">{t("Home")}</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>{t("Site Map")}</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            {t("Site Map")}
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            {t("An overview of every section on the DSE website.")}
          </p>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GROUPS.map((g) => (
            <section
              key={g.title}
              className="rounded-2xl p-6"
              style={{
                background: "rgb(var(--surface-rgb) / 0.6)",
                border: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              <h2 className="text-[14px] font-semibold mb-3 uppercase tracking-[0.06em]" style={{ color: "var(--primary)" }}>
                {t(g.title)}
              </h2>
              <ul className="space-y-2 text-[13.5px]">
                {g.items.map((i) => (
                  <li key={i.label + i.to + (i.hash ?? "")}>
                    <Link
                      to={i.to}
                      hash={i.hash}
                      className="transition opacity-85 hover:opacity-100"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t(i.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
