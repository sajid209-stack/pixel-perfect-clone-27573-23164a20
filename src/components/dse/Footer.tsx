import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import dseSealCoinAsset from "@/assets/dse-seal-coin.png.asset.json";
const dseLogoCoin = dseSealCoinAsset.url;
import { useLang } from "@/i18n/LanguageContext";

type FooterLink = { label: string; to: string; hash?: string };

const marketsLinks: FooterLink[] = [
  { label: "Products & Services", to: "/products" },
  { label: "Equities", to: "/companies" },
  { label: "Bonds & GSec", to: "/bonds" },
  { label: "Mutual Funds & ETFs", to: "/funds" },
  { label: "OTC Market", to: "/otc" },
  { label: "Disclosures & Filings", to: "/filings" },
  { label: "Indices", to: "/indices" },
  { label: "Corporate actions", to: "/corporate-actions" },
  { label: "Historical data", to: "/reports" },
  { label: "DSE-Mobile", to: "/dse-mobile" },
];

type FooterLinkExt = FooterLink & { href?: string; external?: boolean };

const aboutLinks: FooterLinkExt[] = [
  { label: "About us", to: "/about" },
  { label: "Board of directors", to: "/about/board" },
  { label: "Press releases", to: "/news" },
  { label: "Gallery", to: "/gallery" },
  { label: "Careers", to: "/careers" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Annual reports", to: "/reports" },
  { label: "Major Events", to: "/about/major-events" },
  { label: "DSE New Automation System", to: "/about/automation" },
  { label: "Citizen Charter", to: "/citizen-charter" },
  { label: "Back-Office Software Vendors", to: "/vendors" },
  { label: "DSE Tower", to: "/", href: "https://dse.bd/", external: true },
];

const servicesLinks: FooterLinkExt[] = [
  { label: "Broker directory", to: "/members" },
  { label: "Listing requirements", to: "/listing" },
  { label: "Regulations & Rulebook", to: "/regulations" },
  { label: "BICM", to: "/", href: "https://www.bicm.ac.bd/", external: true },
  { label: "Investor education", to: "/learn" },
  { label: "Complaints portal", to: "/complaints" },
  { label: "Data API", to: "/products" },
];

const investorServicesLinks: FooterLink[] = [
  { label: "Help Desk", to: "/help-desk" },
  { label: "NRB Help Desk", to: "/help-desk/nrb" },
  { label: "Foreign investors", to: "/foreign-investors" },
  { label: "General Profile of Bangladesh", to: "/foreign-investors/general-profile" },
  { label: "Complaints", to: "/complaints" },
  { label: "FAQ", to: "/faq" },
  { label: "Downloads", to: "/downloads" },
];

const marketInfoLinks: FooterLink[] = [
  { label: "Holidays & Trading Sessions", to: "/holidays" },
  { label: "Going Concern List", to: "/going-concern" },
  { label: "Financial Statement Status", to: "/financial-statement-status" },
];

const cols: { title: string; items: FooterLink[] }[] = [
  { title: "Markets", items: marketsLinks },
  { title: "Market Information", items: marketInfoLinks },
  { title: "About DSE", items: aboutLinks },
  { title: "Services", items: servicesLinks },
  { title: "Investor Services", items: investorServicesLinks },
];

function FooterLinkItem({ item }: { item: FooterLinkExt }) {
  const { t } = useLang();
  if (item.external && item.href) {
    return (
      <li>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:opacity-100 opacity-80 cursor-pointer"
        >
          {t(item.label)}
        </a>
      </li>
    );
  }
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

function FooterColumn({ col }: { col: typeof cols[number] }) {
  const { t } = useLang();
  return (
    <div className="footer-col">
      <div className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
        {t(col.title)}
      </div>
      <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        {col.items.map((i) => <FooterLinkItem key={i.label} item={i} />)}
      </ul>
    </div>
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
            <div className="font-semibold" style={{ color: "#ffffff" }}>{t("Dhaka Stock Exchange")}</div>
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
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-baseline justify-between mb-3">
            <div className="text-sm font-semibold" style={{ color: "#ffffff" }}>{t("Quick Links")}</div>
            <Link to="/links" className="text-[12px] hover:opacity-100 opacity-80" style={{ color: "rgba(255,255,255,0.85)" }}>
              {t("View all")} →
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px]" style={{ color: "rgba(255,255,255,0.78)" }}>
            {[
              { label: "BSEC", href: "https://www.sec.gov.bd" },
              { label: "Nationwide Financial Literacy", href: "https://nfls.gov.bd" },
              { label: "Customer Complaint Address Module", href: "https://ccam.sec.gov.bd" },
              { label: "Electronic Subscription System (ESS)", href: "https://ess.sec.gov.bd" },
              { label: "DBA", href: "https://dsebd.com.bd" },
              { label: "V-Next", href: "https://vnext.com.bd" },
              { label: "CDBL", href: "https://www.cdbl.com.bd" },
              { label: "BIDA", href: "https://bida.gov.bd" },
              { label: "Global Reporting Initiative (GRI)", href: "https://www.globalreporting.org" },
              { label: "Other Links", href: "/links" },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-85">
                {t(l.label)}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div

          className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-[12px]"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/markets" hash="circuit" className="hover:opacity-100 opacity-85">{t("Circuit breakers")}</Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <Link to="/markets" hash="margin" className="hover:opacity-100 opacity-85">{t("Margin securities")}</Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <Link to="/pe" className="hover:opacity-100 opacity-85">{t("P/E at a glance")}</Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <Link to="/markets" hash="sessions" className="hover:opacity-100 opacity-85">{t("Holiday calendar")}</Link>
          </div>
          <div className="text-[11.5px] uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.6)" }}>
            {t("Regulated by BSEC")}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div
          className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <div>{t("© 2026 Dhaka Stock Exchange PLC. Regulated by Bangladesh Securities and Exchange Commission.")}</div>
          <div className="flex gap-4 items-center flex-wrap">
            <Link to="/sitemap" className="cursor-pointer hover:opacity-100 opacity-80">{t("Site Map")}</Link>
            <Link to="/links" className="cursor-pointer hover:opacity-100 opacity-80">{t("Quick Links")}</Link>
            <Link to="/faq" className="cursor-pointer hover:opacity-100 opacity-80">{t("FAQ")}</Link>
            <Link to="/downloads" className="cursor-pointer hover:opacity-100 opacity-80">{t("Download")}</Link>
            <Link to="/careers" className="cursor-pointer hover:opacity-100 opacity-80">{t("Career")}</Link>
            <Link to="/terms" className="cursor-pointer hover:opacity-100 opacity-80">{t("Terms & Condition")}</Link>
            <Link to="/disclaimer" className="cursor-pointer hover:opacity-100 opacity-80">{t("Disclaimer")}</Link>
            <Link to="/copyright" className="cursor-pointer hover:opacity-100 opacity-80">{t("Copyright")}</Link>
            <Link to="/data-archives" className="cursor-pointer hover:opacity-100 opacity-80">{t("Data Archives")}</Link>
            <Link to="/feedback" className="cursor-pointer hover:opacity-100 opacity-80">{t("Feedback")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
