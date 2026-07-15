import { assetUrl } from "@/lib/asset-url";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import dseSealCoinAsset from "@/assets/dse-seal-coin.png.asset.json";
const dseLogoCoin = assetUrl(dseSealCoinAsset);
import { useLang } from "@/i18n/LanguageContext";

type FooterLink = { label: string; to: string; hash?: string };

const marketInformationLinks: FooterLink[] = [
  { label: "Latest Share Price", to: "/markets/latest-share-price" },
  { label: "Top Shares", to: "/markets/top-shares" },
  { label: "Market Statistics", to: "/markets" },
  { label: "Recent Market Information", to: "/recent-market-information" },
  { label: "DSEX", to: "/indices/DSEX" },
  { label: "DS30", to: "/indices/DS30" },
  { label: "P/E at a Glance", to: "/pe" },
  { label: "Circuit Breaker", to: "/circuit-breaker" },
  { label: "Debt Board", to: "/bonds" },
  { label: "G-Sec", to: "/bonds/government-securities" },
];

const companiesFilingsLinks: FooterLink[] = [
  { label: "Company Listing", to: "/companies" },
  { label: "Sector wise Company List", to: "/companies/sectors" },
  { label: "Corporate Actions", to: "/corporate-actions" },
  { label: "Financial Statement Status", to: "/financial-statement-status" },
  { label: "Right Offer Documents", to: "/companies/right-offers" },
  { label: "Direct Listing", to: "/companies/direct-listing" },
  { label: "Re-listing", to: "/companies/re-listing" },
  { label: "Proceeds Utilisation", to: "/filings/proceeds-utilisation" },
  { label: "Auditor's Opinion and Others", to: "/filings/auditors-opinion" },
  { label: "PSI and Material Information", to: "/filings/psi" },
];

const publicationsLinks: FooterLink[] = [
  { label: "News", to: "/news" },
  { label: "Weekly Report", to: "/publications/weekly" },
  { label: "Publications", to: "/publications" },
  { label: "Annual Reports", to: "/reports" },
  { label: "Picture Gallery", to: "/gallery" },
  { label: "Major Events", to: "/about/major-events" },
];

const investorServicesLinks: FooterLink[] = [
  { label: "Learn", to: "/learn" },
  { label: "Help Desk", to: "/help-desk" },
  { label: "NRB Help Desk", to: "/help-desk/nrb" },
  { label: "Foreign Investors", to: "/foreign-investors" },
  { label: "Complaints", to: "/complaints" },
  { label: "Investor Protection Fund", to: "/investor-protection" },
  { label: "CDBL", to: "/cdbl" },
  { label: "FAQ", to: "/faq" },
  { label: "Downloads", to: "/downloads" },
  { label: "DSE-Mobile", to: "/dse-mobile" },
];

const aboutDirectoryLinks: FooterLink[] = [
  { label: "About DSE", to: "/about" },
  { label: "TREC Holders' Directory", to: "/members" },
  { label: "Regulations", to: "/regulations" },
  { label: "Listing Requirements", to: "/listing" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Vendors", to: "/vendors" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
  { label: "Individual Blog page", to: "/news/x-1" },
];

const cols: { title: string; items: FooterLink[] }[] = [
  { title: "Market Information", items: marketInformationLinks },
  { title: "Companies & Filings", items: companiesFilingsLinks },
  { title: "Publications", items: publicationsLinks },
  { title: "Investor Services", items: investorServicesLinks },
  { title: "About & Directory", items: aboutDirectoryLinks },
];

const quickLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "BSEC", href: "https://sec.gov.bd/", external: true },
  { label: "Nationwide Financial Literacy", href: "http://www.finlitbd.com/bn/index.php", external: true },
  { label: "Customer Complaint Address Module", href: "https://www.cdbl.com.bd/complaints.sec.gov.bd/", external: true },
  { label: "Electronic Subscription System (ESS)", href: "https://www.essbangladesh.com/", external: true },
  { label: "DBA", href: "https://www.dba-bd.org/", external: true },
  { label: "V-Next", href: "https://www.v-next.cn/categories/getCountrySpecial?id=24&objectid=30", external: true },
  { label: "CDBL", href: "https://www.cdbl.com.bd/", external: true },
  { label: "BIDA", href: "https://www.boi.gov.bd/", external: true },
  { label: "Global Reporting Initiative (GRI)", href: "https://www.globalreporting.org/", external: true },
  { label: "Other Links", href: "/links" },
];

function FooterLinkItem({ item }: { item: FooterLink }) {
  const { t } = useLang();
  return (
    <li>
      <Link
        to={item.to}
        hash={item.hash}
        className="transition hover:opacity-100 opacity-80 cursor-pointer"
      >
        {t(item.label)}
      </Link>
    </li>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer
      id="footer"
      style={{
        background: "var(--brand)",
        color: "#ffffff",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={dseLogoCoin}
              alt="Dhaka Stock Exchange seal"
              className="object-contain"
              style={{ width: 64, height: 64 }}
            />
            <div className="font-semibold" style={{ color: "#ffffff" }}>{t("Dhaka Stock Exchange PLC.")}</div>
          </div>
          <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.75)" }}>{t("Bangladesh's Premier Capital Market")}</p>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            DSE Tower, Plot 46, Road 21<br />Nikunja-2, Dhaka-1229<br />+880 2 5566 9100
          </p>
          <div className="flex gap-3 mt-4">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center transition"
                style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div className="footer-col" key={c.title}>
            <div className="text-sm font-semibold mb-3" style={{ color: "#ffffff" }}>{t(c.title)}</div>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              {c.items.map((i) => <FooterLinkItem key={i.label} item={i} />)}
            </ul>
          </div>
        ))}
      </div>

      {/* Quick Links band */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-baseline justify-between mb-3">
            <div className="text-sm font-semibold" style={{ color: "#ffffff" }}>{t("Quick Links")}</div>
            <Link to="/links" className="text-[12px] hover:opacity-100 opacity-80" style={{ color: "rgba(255,255,255,0.85)" }}>
              {t("View all")} →
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px]" style={{ color: "rgba(255,255,255,0.78)" }}>
            {quickLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-85"
              >
                {t(l.label)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Utility band (unchanged) */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div
          className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-[12px]"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/circuit-breaker" className="hover:opacity-100 opacity-85">{t("Circuit breakers")}</Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <Link to="/marginable-securities" className="hover:opacity-100 opacity-85">{t("Margin securities")}</Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <Link to="/pe" className="hover:opacity-100 opacity-85">{t("P/E at a glance")}</Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <Link to="/holidays" className="hover:opacity-100 opacity-85">{t("Holiday calendar")}</Link>
          </div>
          <div className="text-[11.5px] uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.6)" }}>
            {t("Regulated by BSEC")}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div
          className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <div>{t("© 2026 Dhaka Stock Exchange PLC. Regulated by Bangladesh Securities and Exchange Commission.")}</div>
          <div className="flex gap-4 items-center flex-wrap">
            <Link to="/" className="cursor-pointer hover:opacity-100 opacity-80">{t("Home")}</Link>
            <Link to="/sitemap" className="cursor-pointer hover:opacity-100 opacity-80">{t("Site Map")}</Link>
            <Link to="/faq" className="cursor-pointer hover:opacity-100 opacity-80">{t("FAQ")}</Link>
            <Link to="/downloads" className="cursor-pointer hover:opacity-100 opacity-80">{t("Download")}</Link>
            <Link to="/data-archives" className="cursor-pointer hover:opacity-100 opacity-80">{t("Data Archives")}</Link>
            <Link to="/careers" className="cursor-pointer hover:opacity-100 opacity-80">{t("Career")}</Link>
            <Link to="/feedback" className="cursor-pointer hover:opacity-100 opacity-80">{t("Feedback")}</Link>
            <Link to="/terms" className="cursor-pointer hover:opacity-100 opacity-80">{t("Terms & Condition")}</Link>
            <Link to="/disclaimer" className="cursor-pointer hover:opacity-100 opacity-80">{t("Disclaimer")}</Link>
            <Link to="/copyright" className="cursor-pointer hover:opacity-100 opacity-80">{t("Copyright")}</Link>
            <Link to="/404" className="cursor-pointer hover:opacity-100 opacity-80">{t("404")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
