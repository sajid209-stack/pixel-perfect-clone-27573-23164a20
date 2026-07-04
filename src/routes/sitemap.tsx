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
    title: "Market",
    items: [
      { label: "Share Prices", to: "/markets" },
      { label: "Indices", to: "/indices" },
      { label: "Circuit Breaker", to: "/circuit-breaker" },
      { label: "Recent Market Information", to: "/recent-market-information" },
      { label: "P/E Ratio", to: "/pe" },
      { label: "Sectoral Median P/E", to: "/sectoral-pe" },
      { label: "Market Depth", to: "/market-depth" },
      { label: "Block Transactions", to: "/markets", hash: "block" },
      { label: "Foreign Trade", to: "/foreign-investors" },
      { label: "Margin Financeable Securities", to: "/markets", hash: "margin" },
      { label: "Market Statistics", to: "/markets" },
      { label: "Performance of DSE at a Glance", to: "/markets/at-a-glance" },
      { label: "Comparison of Market", to: "/markets/comparison" },
      { label: "Latest Share Price", to: "/markets/latest-share-price" },
      { label: "Top Shares", to: "/markets/top-shares" },
      { label: "Holidays & Trading Sessions", to: "/holidays" },
      { label: "Going Concern List", to: "/going-concern" },
      { label: "Financial Statement Status", to: "/financial-statement-status" },
      { label: "Actuarial Valuation Status", to: "/actuarial-valuation" },
      { label: "DSE-Mobile", to: "/dse-mobile" },
    ],
  },
  {
    title: "Companies",
    items: [
      { label: "Listed Companies", to: "/companies" },
      { label: "Sector-wise Company List", to: "/companies/sectors" },
      { label: "By Industry", to: "/companies", hash: "industry" },
      { label: "By Category", to: "/companies", hash: "category" },
      { label: "Company Profile", to: "/companies" },
      { label: "Direct Listing", to: "/companies/direct-listing" },
      { label: "Re-listing", to: "/companies/re-listing" },
      { label: "Right Offer Documents", to: "/companies/right-offers" },
    ],
  },
  {
    title: "Disclosures & Filings",
    items: [
      { label: "Auditor's Opinion", to: "/filings/auditors-opinion" },
      { label: "Proceeds Utilisation", to: "/filings/proceeds-utilisation" },
      { label: "Right Offer Documents", to: "/companies/right-offers" },
      { label: "Direct Listing", to: "/companies/direct-listing" },
      { label: "Re-listing", to: "/companies/re-listing" },
      { label: "PSI & Material Information", to: "/filings/psi" },
    ],
  },
  {
    title: "IPO",
    items: [
      { label: "Fixed Price", to: "/ipo" },
      { label: "Book Building", to: "/ipo" },
      { label: "Bond/Sukuk", to: "/bonds" },
      { label: "Draft Prospectus", to: "/ipo" },
      { label: "IPO Archive", to: "/ipo" },
      { label: "IPO Lottery Result", to: "/ipo" },
    ],
  },
  {
    title: "Bonds & G-Sec",
    items: [
      { label: "Bond/Sukuk", to: "/bonds" },
      { label: "Government Securities (G-Sec)", to: "/bonds/government-securities" },
    ],
  },
  {
    title: "Mutual Funds & ETFs",
    items: [{ label: "Mutual Funds & ETFs", to: "/funds" }],
  },
  {
    title: "OTC Market",
    items: [
      { label: "About OTC", to: "/otc" },
      { label: "Company Listing", to: "/otc" },
      { label: "Instruments", to: "/otc" },
      { label: "Order Forms", to: "/otc" },
      { label: "Trading Manuals", to: "/otc" },
      { label: "OTC Circuit Breaker", to: "/otc" },
      { label: "OTC News", to: "/otc" },
    ],
  },
  {
    title: "Corporate Actions",
    items: [
      { label: "Dividends", to: "/corporate-actions" },
      { label: "AGM/EGM & Record Date", to: "/corporate-actions" },
      { label: "Rights", to: "/corporate-actions" },
      { label: "Bonus", to: "/corporate-actions" },
    ],
  },
  {
    title: "Publications",
    items: [
      { label: "Weekly Review", to: "/publications/weekly" },
      { label: "Monthly Reviews & Graphs", to: "/publications" },
      { label: "Fortnightly Capital Market", to: "/publications" },
      { label: "Annual Report", to: "/reports" },
      { label: "Major Events", to: "/publications" },
      { label: "Press Releases", to: "/news" },
    ],
  },
  {
    title: "Members",
    items: [
      { label: "TREC Holder Directory", to: "/members" },
      { label: "By Location", to: "/members" },
      { label: "Margin Regulations", to: "/regulations" },
    ],
  },
  {
    title: "Regulations",
    items: [
      { label: "Rulebook", to: "/regulations" },
      { label: "Listing Regulations", to: "/listing" },
      { label: "Settlement Regulations", to: "/regulations" },
    ],
  },
  {
    title: "About DSE",
    items: [
      { label: "Vision & Mission", to: "/about/vision" },
      { label: "Board of Directors", to: "/about/board" },
      { label: "Management", to: "/about/management" },
      { label: "Committees", to: "/about/committees" },
      { label: "Demutualization", to: "/about/demutualization" },
      { label: "Divisions & Departments", to: "/about/departments" },
      { label: "DSE at a Glance", to: "/about/at-a-glance" },
      { label: "Major Events", to: "/about/major-events" },
      { label: "DSE New Automation System", to: "/about/automation" },
      { label: "Citizen Charter", to: "/citizen-charter" },
    ],
  },
  {
    title: "Investor Services",
    items: [
      { label: "Help Desk", to: "/help-desk" },
      { label: "NRB Help Desk", to: "/help-desk/nrb" },
      { label: "Complaints", to: "/complaints" },
      { label: "Investor Protection Fund", to: "/investor-protection" },
      { label: "CDBL", to: "/cdbl" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "More",
    items: [
      { label: "Downloads", to: "/downloads" },
      { label: "Quick Links", to: "/links" },
      { label: "Contact Us", to: "/contact" },
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
