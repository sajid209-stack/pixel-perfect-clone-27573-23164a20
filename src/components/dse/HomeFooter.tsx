import { assetUrl } from "@/lib/asset-url";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import dseSealCoinAsset from "@/assets/dse-seal-coin.png.asset.json";
const dseLogoCoin = assetUrl(dseSealCoinAsset);
import { useLang } from "@/i18n/LanguageContext";

type Item =
  | { label: string; to: string; hash?: string; external?: false }
  | { label: string; href: string; external: true }
  | { label: string; group: Item[] };

const col1: Item[] = [
  { label: "Recent Market Information", to: "/recent-market-information" },
  { label: "Top 20 Shares", to: "/companies" },
  { label: "DSEX", to: "/indices/DSEX" },
  { label: "DS30", to: "/indices/DS30" },
  {
    label: "Latest Share Price",
    group: [
      { label: "By Last Trade Price", to: "/companies" },
      { label: "By % Change", to: "/companies" },
      { label: "By Category", to: "/companies" },
      { label: "By Value", to: "/companies" },
      { label: "By Volume", to: "/companies" },
      { label: "By Trade Code", to: "/companies" },
      { label: "By Alphabetic Order", to: "/companies" },
      { label: "DEBT Board", to: "/companies" },
      { label: "G-Sec", to: "/bonds" },
    ],
  },
  { label: "P/E at a Glance", to: "/pe" },
  { label: "Sectoral Median P/E", to: "/sectoral-pe" },
  { label: "Circuit Breaker", to: "/circuit-breaker" },
];

const col2: Item[] = [
  { label: "Press Release", to: "/news" },
  { label: "Picture Gallery", to: "/gallery" },
  { label: "Major Events", to: "/about/major-events" },
  { label: "DSE Tower", href: "#", external: true },
  { label: "Weekly", to: "/reports" },
  { label: "Monthly Review", to: "/reports" },
  { label: "Fortnightly Capital Market", to: "/reports" },
  { label: "Subscription Form", to: "/reports" },
  { label: "Annual Report", to: "/reports" },
];

const col3: Item[] = [
  {
    label: "TREC Holders Directory",
    group: [
      { label: "By Alphabetic Order", to: "/members" },
      { label: "By Location", to: "/members" },
      { label: "By Authorized Representative", to: "/members" },
    ],
  },
  { label: "TREC Regulations", to: "/regulations" },
  { label: "TREC Holders' Web Links", to: "/members" },
  { label: "TREC Holder Search", to: "/members" },
];

const col4: Item[] = [
  { label: "Company Listing", to: "/companies" },
  { label: "Sector-wise Company List", to: "/companies" },
  { label: "Companies by Category", to: "/companies" },
  { label: "AGM/EGM and Record Date", to: "/corporate-actions" },
  { label: "Right Offer Documents", to: "/companies/right-offers" },
  { label: "Re-listing", to: "/companies/re-listing" },
  { label: "Direct Listing", to: "/companies/direct-listing" },
  { label: "IPO/RPO/Rights Proceeds Utilisation", to: "/filings" },
  { label: "Auditor's Opinion and Others", to: "/filings" },
  { label: "PSI and Material Information", to: "/filings" },
  { label: "Actuarial Valuation Status", to: "/actuarial-valuation" },
];

const col5: Item[] = [
  { label: "DSE New Automation System", to: "/about/automation" },
  { label: "Demutualization Scheme", to: "/about/demutualization" },
  { label: "Complaint Cell", to: "/complaints" },
  { label: "Help Desk for NRB", to: "/help-desk/nrb" },
  { label: "Help Desk", to: "/help-desk" },
  { label: "Investor Protection Fund", to: "/investor-protection" },
  { label: "DSE-Mobile Service", to: "/dse-mobile" },
  { label: "Back-Office Software Vendors", href: "#", external: true },
  {
    label: "Quick Links",
    group: [
      { label: "BSEC", to: "/links" },
      { label: "Nationwide Financial Literacy", to: "/links" },
      { label: "Customer Complaint Address Module (CCAM)", to: "/links" },
      { label: "Electronic Subscription System (ESS)", to: "/links" },
      { label: "DBA", to: "/links" },
      { label: "V-Next", to: "/links" },
      { label: "CDBL", to: "/cdbl" },
      { label: "BIDA", to: "/links" },
      { label: "Global Reporting Initiative (GRI)", to: "/links" },
      { label: "Other Links", to: "/links" },
    ],
  },
];

const COLUMNS: { title: string; items: Item[] }[] = [
  { title: "Market Information", items: col1 },
  { title: "DSE Publication", items: col2 },
  { title: "DSE TREC Holders", items: col3 },
  { title: "Company Information", items: col4 },
  { title: "Others", items: col5 },
];

function Leaf({ item }: { item: Item }) {
  const { t } = useLang();
  if ("group" in item) {
    return (
      <li>
        <div className="text-[12.5px] font-semibold mt-2 mb-1" style={{ color: "#ffffff" }}>
          {t(item.label)}
        </div>
        <ul className="space-y-1 pl-3" style={{ borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
          {item.group.map((g) => <Leaf key={g.label} item={g} />)}
        </ul>
      </li>
    );
  }
  if ("external" in item && item.external) {
    return (
      <li>
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-80 cursor-pointer">
          {t(item.label)}
        </a>
      </li>
    );
  }
  const it = item as { label: string; to: string; hash?: string };
  return (
    <li>
      <Link to={it.to} hash={it.hash} className="hover:opacity-100 opacity-80 cursor-pointer">
        {t(it.label)}
      </Link>
    </li>
  );
}

export function HomeFooter() {
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <img src={dseLogoCoin} alt="Dhaka Stock Exchange seal" className="object-contain" style={{ width: 56, height: 56 }} />
          <div>
            <div className="font-semibold" style={{ color: "#ffffff" }}>{t("Dhaka Stock Exchange PLC.")}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{t("Bangladesh's Premier Capital Market")}</div>
          </div>
          <div className="ml-auto flex gap-3">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold mb-3 pb-2" style={{ color: "#ffffff", borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
                {t(c.title)}
              </div>
              <ul className="space-y-2 text-[13px]" style={{ color: "rgba(255,255,255,0.8)" }}>
                {c.items.map((i) => <Leaf key={i.label} item={i} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div
          className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-[12px]"
          style={{ color: "rgba(255,255,255,0.78)" }}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {[
              { label: "Disclaimer", to: "/disclaimer" as const },
              { label: "Home", to: "/" as const },
              { label: "Download", to: "/downloads" as const },
              { label: "Data Archives", to: "/data-archives" as const },
              { label: "Career at DSE", to: "/careers" as const },
              { label: "FAQ", to: "/faq" as const },
              { label: "WUF", to: "/links" as const },
              { label: "Site Map", to: "/sitemap" as const },
              { label: "Link", to: "/links" as const },
              { label: "Terms & Condition", to: "/terms" as const },
            ].map((l, idx, arr) => (
              <span key={l.label} className="flex items-center gap-3">
                <Link to={l.to} hash={(l as { hash?: string }).hash} className="hover:opacity-100 opacity-85">
                  {t(l.label)}
                </Link>
                {idx < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>}
              </span>
            ))}
          </div>
          <div className="text-[11.5px]" style={{ color: "rgba(255,255,255,0.7)" }}>
            {t("© Dhaka Stock Exchange 2020")}
          </div>
        </div>
      </div>
    </footer>
  );
}
