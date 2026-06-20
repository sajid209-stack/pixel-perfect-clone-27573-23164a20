import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
  AlertCircle,
  Coins,
  Users,
  Landmark,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import dseSealAsset from "@/assets/dse-seal.png.asset.json";
import dseSealCoinAsset from "@/assets/dse-seal-coin.png.asset.json";
import heroTowerAsset from "@/assets/hero-dse-tower.jpg.asset.json";
import aboutDseMegaAsset from "@/assets/about-dse-mega.jpg.asset.json";
const dseLogo = dseSealAsset.url;
const dseLogoDark = dseSealCoinAsset.url;
import { ThemeToggle } from "./ThemeToggle";
import { companyIndex } from "./data";
import { useLang } from "@/i18n/LanguageContext";
import { openCommandPalette } from "./CommandPalette";

type NavItem = {
  label: string;
  to?: string;
  href?: string;
  mega?: keyof typeof megaPanels;
  activePaths?: string[];
};

const links: NavItem[] = [
  { label: "Markets", to: "/markets", mega: "markets", activePaths: ["/markets", "/products", "/bonds", "/funds", "/otc", "/filings"] },
  { label: "Companies", to: "/companies", mega: "companies", activePaths: ["/companies", "/company", "/corporate-actions"] },
  { label: "Indices", to: "/indices", mega: "indices", activePaths: ["/indices"] },
  { label: "IPO", to: "/ipo", mega: "ipo", activePaths: ["/ipo"] },
  { label: "News", to: "/news", mega: "news", activePaths: ["/news"] },
  { label: "Learn", to: "/learn", mega: "learn", activePaths: ["/learn"] },
  { label: "Investor Services", to: "/help-desk", mega: "investors", activePaths: ["/help-desk", "/complaints", "/faq", "/downloads"] },
  { label: "About DSE", to: "/about", mega: "about", activePaths: ["/about", "/listing", "/reports", "/members", "/foreign-investors", "/regulations"] },
];

/* ─────────────── SCB-style mega panel ─────────────── */

type MegaLink = { label: string; to?: string; hash?: string };
type MegaCol = { header: string; links: MegaLink[] };
type MegaContent = {
  intro: { title: string; desc: string; cta: { label: string; to: string } };
  columns: MegaCol[];
  promo: { tag: string; title: string; desc: string; to: string; image?: string };
};

const megaContent: Record<string, MegaContent> = {
  markets: {
    intro: {
      title: "Markets",
      desc: "Live equities, instruments, sector heatmap and trading reports.",
      cta: { label: "Products & Services", to: "/products" },
    },
    columns: [
      {
        header: "Equity markets",
        links: [
          { label: "Market at a Glance", to: "/markets/at-a-glance" },
          { label: "Live equities", to: "/companies" },
          { label: "Main board", to: "/companies" },
          { label: "SME board", to: "/companies" },
          { label: "Block market", to: "/companies" },
          { label: "Odd lot", to: "/companies" },
          { label: "Bonds & debentures", to: "/bonds" },
          { label: "Mutual funds", to: "/funds" },
          { label: "ETFs", to: "/funds" },
          { label: "OTC Market", to: "/otc" },
          { label: "Disclosures & Filings", to: "/filings" },
        ],
      },
      {
        header: "OMS Services",
        links: [
          { label: "DSE-Mobile", to: "/dse-mobile" },
        ],
      },
    ],
    promo: { tag: "Featured", title: "Sector heatmap", desc: "Daily % change across all 10 sectors.", to: "/", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=70" },
  },
  companies: {
    intro: {
      title: "Companies",
      desc: "356 listed issuers — browse by sector, board or performance.",
      cta: { label: "Browse all companies", to: "/companies" },
    },
    columns: [
      {
        header: "Browse",
        links: [
          { label: "All listed companies", to: "/companies" },
          { label: "By sector", to: "/companies" },
          { label: "By board", to: "/companies" },
          { label: "Newly listed", to: "/companies" },
          { label: "Going Concern Threat List", to: "/going-concern" },
          { label: "Financial Statement Submission Status", to: "/financial-statement-status" },
          { label: "Sectoral Median P/E", to: "/sectoral-pe" },
          { label: "Actuarial Valuation Status", to: "/actuarial-valuation" },
        ],
      },
      {
        header: "Data",
        links: [
          { label: "Financials", to: "/companies" },
          { label: "Disclosures", to: "/news" },
          { label: "Dividends", to: "/news" },
          { label: "Corporate actions", to: "/corporate-actions" },
          { label: "Rights Offer Documents", to: "/companies/right-offers" },
          { label: "Re-listing", to: "/companies/re-listing" },
          { label: "Direct Listing", to: "/companies/direct-listing" },
        ],
      },
    ],
    promo: { tag: "Tool", title: "Company screener", desc: "Filter by sector, market cap and yield.", to: "/companies", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=70" },
  },
  indices: {
    intro: {
      title: "Indices",
      desc: "DSE benchmark indices, constituents and analytics.",
      cta: { label: "View index analytics", to: "/indices" },
    },
    columns: [
      {
        header: "Indices",
        links: [
          { label: "DSEX", to: "/indices" },
          { label: "DS30", to: "/indices" },
          { label: "DSES", to: "/indices" },
          { label: "Shariah", to: "/indices" },
        ],
      },
      {
        header: "Analytics",
        links: [
          { label: "Historical data", to: "/reports" },
          { label: "Constituents", to: "/indices" },
          { label: "Methodology", to: "/indices" },
        ],
      },
    ],
    promo: { tag: "Featured", title: "Index analytics", desc: "Trend, breadth and constituent weights.", to: "/indices", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=70" },
  },
  ipo: {
    intro: {
      title: "IPO",
      desc: "Subscription pipeline, application guidance and prospectuses.",
      cta: { label: "Open the IPO desk", to: "/ipo" },
    },
    columns: [
      {
        header: "Pipeline",
        links: [
          { label: "Subscription open", to: "/ipo" },
          { label: "Upcoming", to: "/ipo" },
          { label: "Recently listed", to: "/ipo" },
        ],
      },
      {
        header: "Resources",
        links: [
          { label: "How to apply", to: "/ipo" },
          { label: "Prospectuses", to: "/ipo" },
        ],
      },
    ],
    promo: { tag: "Tool", title: "IPO calendar", desc: "Open and upcoming subscription windows.", to: "/ipo", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=70" },
  },
  news: {
    intro: {
      title: "News",
      desc: "Market news, price-sensitive disclosures and official notices.",
      cta: { label: "Visit the newsroom", to: "/news" },
    },
    columns: [
      {
        header: "Newsroom",
        links: [
          { label: "Latest news", to: "/news" },
          { label: "Price-sensitive", to: "/news" },
          { label: "Market commentary", to: "/news" },
        ],
      },
      {
        header: "Media",
        links: [
          { label: "Press releases", to: "/news" },
          { label: "Notices", to: "/news" },
          { label: "Gallery", to: "/gallery" },
        ],
      },
    ],
    promo: { tag: "Stay informed", title: "Subscribe to alerts", desc: "Daily summary and PSI alerts by email.", to: "/news", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=70" },
  },
  learn: {
    intro: {
      title: "Learn",
      desc: "Investor education for beginners and active market participants.",
      cta: { label: "Open the learning hub", to: "/learn" },
    },
    columns: [
      {
        header: "Beginners",
        links: [
          { label: "What is a stock?", to: "/learn" },
          { label: "Open a BO account", to: "/learn" },
          { label: "Glossary", to: "/learn" },
        ],
      },
      {
        header: "Active traders",
        links: [
          { label: "Screener", to: "/companies" },
          { label: "Heatmap", to: "/" },
          { label: "Analytics", to: "/indices" },
        ],
      },
    ],
    promo: { tag: "Featured", title: "Investor education", desc: "BICM-curated courses and primers.", to: "/learn", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=70" },
  },
  about: {
    intro: {
      title: "About DSE",
      desc: "Organisation, governance, listing rules and member directory.",
      cta: { label: "About the exchange", to: "/about" },
    },
    columns: [
      {
        header: "Organisation",
        links: [
          { label: "Introduction to DSE", to: "/about/introduction" },
          { label: "Mission & Vision", to: "/about/vision" },
          { label: "Board of directors", to: "/about/board" },
          { label: "DSE Management", to: "/about/management" },
          { label: "DSE Presidents / Chairmen", to: "/about/chairmen" },
          { label: "Members", to: "/members" },
          { label: "Major Events", to: "/about/major-events" },
          { label: "Citizen Charter", to: "/citizen-charter" },
          { label: "Holidays & Trading Sessions", to: "/holidays" },
        ],
      },
      {
        header: "Governance",
        links: [
          { label: "Demutualization", to: "/about/demutualization" },
          { label: "Regulations & Rulebook", to: "/regulations" },
          { label: "Annual reports", to: "/reports" },
          { label: "Foreign investors", to: "/foreign-investors" },
          { label: "Share Transfer Process", to: "/listing/share-transfer" },
          { label: "New Automation System", to: "/about/automation" },
        ],
      },
      {
        header: "Indices",
        links: [
          { label: "Algorithm of DSE Indices", to: "/index-methodology" },
          { label: "DSEX Index", to: "/indices/DSEX" },
          { label: "DS30 Index", to: "/indices/DS30" },
        ],
      },
    ],
    promo: { tag: "Heritage", title: "Our history", desc: "From the 1954 founding to today.", to: "/about/introduction", image: aboutDseMegaAsset.url },

  },
  investors: {
    intro: {
      title: "Investor Services",
      desc: "Help desks, complaints, downloads and FAQs for DSE investors.",
      cta: { label: "Open Help Desk", to: "/help-desk" },
    },
    columns: [
      {
        header: "Help & support",
        links: [
          { label: "Help Desk", to: "/help-desk" },
          { label: "NRB Help Desk", to: "/help-desk/nrb" },
          { label: "Complaints", to: "/complaints" },
        ],
      },
      {
        header: "Resources",
        links: [
          { label: "FAQ", to: "/faq" },
          { label: "Downloads", to: "/downloads" },
          { label: "Quick Links", to: "/links" },
        ],
      },
    ],
    promo: { tag: "For NRB", title: "NRB Help Desk", desc: "Dedicated assistance for Non-Resident Bangladeshi investors.", to: "/help-desk/nrb", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=70" },
  },
};

function MegaPanel({ content, close }: { content: MegaContent; close: () => void }) {
  const image = content.promo.image ?? heroTowerAsset.url;
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `minmax(200px,1fr) repeat(${content.columns.length}, minmax(160px,1fr)) minmax(260px,1.2fr)`,
        gap: 28,
      }}
    >
      {/* Intro */}
      <div>
        <div className="text-[17px] font-semibold tracking-tight" style={{ color: "var(--ink)" }}>
          {content.intro.title}
        </div>
        <p
          className="mt-1.5 text-[12.5px] leading-[1.55]"
          style={{ color: "var(--text-secondary)", maxWidth: 230 }}
        >
          {content.intro.desc}
        </p>
        <Link
          to={content.intro.cta.to}
          onClick={close}
          className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold"
          style={{ color: "var(--brand-600)" }}
        >
          {content.intro.cta.label} →
        </Link>
      </div>

      {/* Category columns */}
      {content.columns.map((col) => (
        <div key={col.header}>
          <div
            className="text-[10px] font-semibold uppercase"
            style={{ letterSpacing: "0.14em", color: "var(--text-muted)", marginBottom: 8 }}
          >
            {col.header}
          </div>
          <ul>
            {col.links.map((l, idx) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  hash={l.hash}
                  onClick={close}
                  className="block text-[13px] mega-link"
                  style={{
                    color: "var(--ink)",
                    paddingTop: 6,
                    paddingBottom: 6,
                    borderTop: idx === 0 ? "none" : "1px solid var(--line)",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Promo tile w/ image */}
      <Link
        to={content.promo.to}
        onClick={close}
        className="flex flex-col group overflow-hidden"
        style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}
      >
        <div
          style={{
            height: 180,
            backgroundImage: `linear-gradient(135deg, rgba(24,95,165,0.35), rgba(24,95,165,0.05)), url("${image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="px-3 py-2">
          <div
            className="text-[10px] font-semibold uppercase mb-0.5"
            style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}
          >
            {content.promo.tag}
          </div>
          <div className="text-[13px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {content.promo.title}
          </div>
          <p className="mt-0.5 text-[11px] leading-[1.4]" style={{ color: "var(--text-secondary)" }}>
            {content.promo.desc}
          </p>
        </div>
      </Link>

      <style>{`
        .mega-link:hover { color: var(--brand-600) !important; }
      `}</style>
    </div>
  );
}

type Item = { title: string; desc: string; to?: string; hash?: string; soon?: boolean };

function SoonBadge() {
  return (
    <span
      className="ml-1.5 inline-flex items-center px-1.5 py-px rounded-full text-[9px] font-semibold uppercase tracking-wider"
      style={{ background: "#FEF3C7", color: "#92400E" }}
    >
      soon
    </span>
  );
}

function MenuLink({ item, onClick }: { item: Item; onClick?: () => void }) {
  const content = (
    <>
      <div className="flex items-center mb-0.5">
        <span className="text-[13px] font-semibold" style={{ color: "#0F172A" }}>
          {item.title}
        </span>
        {item.soon && <SoonBadge />}
      </div>
      <div className="text-[11.5px] leading-snug" style={{ color: "#64748B" }}>
        {item.desc}
      </div>
    </>
  );
  const cls = "block py-2 px-2.5 -mx-2.5 rounded-md transition cursor-pointer hover:bg-slate-50";
  const style = { opacity: item.soon ? 0.55 : 1 } as React.CSSProperties;
  return item.to ? (
    <Link to={item.to} hash={item.hash} onClick={onClick} className={cls} style={style}>
      {content}
    </Link>
  ) : (
    <a className={cls} style={style} onClick={onClick}>
      {content}
    </a>
  );
}

function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-2.5"
      style={{ color: "#94A3B8" }}
    >
      {children}
    </div>
  );
}

/* ─────────────── individual mega panels ─────────────── */

function MarketsPanel({ close }: { close: () => void }) {
  const col1: Item[] = [
    { title: "Market overview", desc: "DSEX live, sector heatmap, top movers", to: "/" },
    { title: "Sector heatmap", desc: "All 10 sectors, daily % change", to: "/", hash: "heatmap" },
    { title: "Market reports", desc: "Daily, weekly, monthly PDFs", to: "/reports" },
    { title: "Trading calendar", desc: "Sessions, holidays, market hours", to: "/holidays" },
  ];
  const col2: Item[] = [
    { title: "Products & Services", desc: "All instruments and how trading works", to: "/products" },
    { title: "Equities", desc: "All 356 listed companies", to: "/companies" },
    { title: "Bonds & GSec", desc: "Corporate, treasury and sukuk", to: "/bonds" },
    { title: "Mutual funds & ETFs", desc: "NAV table, fund directory", to: "/funds" },
  ];
  const col3: Item[] = [
    { title: "Circuit Breaker", desc: "Today's upper/lower limits per instrument", to: "/circuit-breaker" },
    { title: "Recent Market Information", desc: "Recent and record market figures", to: "/recent-market-information" },
    { title: "Historical data", desc: "OHLV archives, downloadable", to: "/reports" },
  ];
  return (
    <div style={{ width: 560 }}>
      <div className="grid grid-cols-3 gap-5">
        <div>
          <ColHeader>Overview</ColHeader>
          {col1.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
        </div>
        <div>
          <ColHeader>Instruments</ColHeader>
          {col2.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
        </div>
        <div>
          <ColHeader>Tools</ColHeader>
          {col3.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
        </div>
      </div>
      <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid #E2E8F0" }}>
        <div className="flex items-baseline gap-2">
          <span className="text-[11px]" style={{ color: "#94A3B8" }}>DSEX</span>
          <span className="text-[16px] font-semibold tnum" style={{ color: "#0F172A" }}>6,241.30</span>
          <span className="text-[12px] font-semibold" style={{ color: "var(--green-up)" }}>▲ 0.30%</span>
        </div>
        <span className="text-[10px] italic" style={{ color: "#94A3B8" }}>Sample data</span>
      </div>
    </div>
  );
}

function CompaniesPanel({ close }: { close: () => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = q.trim()
    ? companyIndex
        .filter((c) =>
          c.code.toLowerCase().includes(q.toLowerCase()) ||
          c.name.toLowerCase().includes(q.toLowerCase())
        )
        .slice(0, 6)
    : [];
  const quick = ["BATBC", "GRAMEENS", "WALTONHIL", "SQPHARMA", "RENATA"];

  const col1: Item[] = [
    { title: "All companies", desc: "Filter by sector, board, performance", to: "/companies" },
    { title: "By sector", desc: "Banking · Pharma · Telecom · +7 more", to: "/companies" },
    { title: "Top by market cap", desc: "DSE's 20 largest by market cap", to: "/companies" },
  ];
  const col2: Item[] = [
    { title: "Top gainers", desc: "Best performers today", to: "/companies" },
    { title: "Top losers", desc: "Biggest declines today", to: "/companies" },
    { title: "Most active", desc: "Highest volume", to: "/companies" },
  ];

  return (
    <div style={{ width: 480 }} className="flex gap-5">
      <div className="flex-1 grid grid-cols-2 gap-5">
        <div>
          <ColHeader>Browse</ColHeader>
          {col1.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
        </div>
        <div>
          <ColHeader>Today</ColHeader>
          {col2.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
        </div>
      </div>
      <div style={{ width: 160, borderLeft: "1px solid #E2E8F0" }} className="pl-4 relative">
        <ColHeader>Quick search</ColHeader>
        <input
          autoFocus={false}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ticker or name…"
          className="w-full h-8 px-2 rounded-md text-[12px] outline-none"
          style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
        />
        {results.length > 0 ? (
          <div
            className="absolute left-4 right-0 mt-1 rounded-md overflow-hidden z-10"
            style={{ background: "#fff", border: "1px solid #E2E8F0", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
          >
            {results.map((r) => (
              <button
                key={r.code}
                onClick={() => {
                  close();
                  setQ("");
                  navigate({ to: "/company/$ticker", params: { ticker: r.code } });
                }}
                className="w-full text-left px-2.5 py-1.5 text-[11.5px] hover:bg-slate-50"
                style={{ color: "#0F172A" }}
              >
                <span className="font-semibold">{r.code}</span>
                <span className="ml-1.5" style={{ color: "#64748B" }}>{r.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <ul className="mt-3 space-y-1.5">
            {quick.map((code) => (
              <li key={code}>
                <Link
                  to="/company/$ticker"
                  params={{ ticker: code }}
                  onClick={close}
                  className="text-[12px] font-semibold hover:underline"
                  style={{ color: "#0F172A" }}
                >
                  {code}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function IndicesPanel({ close }: { close: () => void }) {
  const cards = [
    { name: "DSEX", value: "6,241.30", change: 0.30, desc: "Broad market · 286 stocks" },
    { name: "DS30", value: "2,118.40", change: 0.18, desc: "Blue chips · 30 stocks" },
    { name: "DSES", value: "1,340.20", change: -0.05, desc: "Shariah · 78 stocks" },
  ];
  return (
    <div style={{ width: 400 }}>
      <div className="grid grid-cols-3 gap-2.5">
        {cards.map((c) => {
          const up = c.change >= 0;
          return (
            <div
              key={c.name}
              className="p-2.5 rounded-lg"
              style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
            >
              <div className="text-[13px] font-medium" style={{ color: "#0F172A" }}>{c.name}</div>
              <div className="text-[22px] font-semibold tnum mt-0.5" style={{ color: "#0F172A" }}>
                {c.value}
              </div>
              <span
                className="inline-flex items-center mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold"
                style={{
                  background: up ? "var(--green-up-light)" : "var(--red-down-light)",
                  color: up ? "var(--green-up)" : "var(--red-down)",

                }}
              >
                {up ? "▲" : "▼"} {Math.abs(c.change).toFixed(2)}%
              </span>
              <div className="text-[11px] mt-1.5 leading-snug" style={{ color: "#64748B" }}>{c.desc}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Link
          to="/indices"
          onClick={close}
          className="text-[12px] font-semibold"
          style={{ color: "#0F172A" }}
        >
          View full index analytics →
        </Link>
        <span className="text-[10px] italic" style={{ color: "#94A3B8" }}>Sample data</span>
      </div>
    </div>
  );
}

function IpoPanel({ close }: { close: () => void }) {
  const col1: Item[] = [
    { title: "Open subscriptions", desc: "Live IPOs open for application", to: "/ipo" },
    { title: "Upcoming IPOs", desc: "SEC approved & filed", to: "/ipo", hash: "pipeline" },
    { title: "Prospectus library", desc: "All IPO documents archived", to: "/ipo", soon: true },
  ];
  const col2: Item[] = [
    { title: "Recent listings", desc: "Listing price & day-1 return", to: "/ipo", hash: "results" },
    { title: "How to apply", desc: "5-step broker application guide", to: "/ipo", hash: "guide" },
    { title: "IPO FAQ", desc: "Eligibility, allotment, refunds", to: "/ipo", soon: true },
  ];
  return (
    <div style={{ width: 480 }} className="flex gap-5">
      <div className="flex-1 grid grid-cols-2 gap-5">
        <div>
          <ColHeader>Current</ColHeader>
          {col1.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
        </div>
        <div>
          <ColHeader>Results & guide</ColHeader>
          {col2.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
        </div>
      </div>
      <div style={{ width: 150, borderLeft: "1px solid #E2E8F0" }} className="pl-4">
        <ColHeader>Live now</ColHeader>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green-up)", boxShadow: "0 0 6px var(--green-up)" }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--green-up)" }}>Open</span>
        </div>
        <div className="text-[12px] font-medium mt-1.5" style={{ color: "#0F172A" }}>NRBC Bank PLC</div>
        <div className="text-[10px] mt-0.5" style={{ color: "#64748B" }}>৳ 30/share · Closes Jun 10</div>
        <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
          <div style={{ width: "73%", height: "100%", background: "var(--primary)" }} />
        </div>
        <div className="text-[10px] mt-1 font-semibold" style={{ color: "var(--primary)" }}>73% subscribed</div>

        <Link to="/ipo" onClick={close} className="block text-[10px] mt-2 font-semibold" style={{ color: "#0F172A" }}>
          Apply via your broker →
        </Link>
      </div>
    </div>
  );
}

function NewsPanel({ close }: { close: () => void }) {
  const types = [
    { icon: AlertCircle, label: "Price sensitive", count: 10, color: "#2563EB", bg: "#DBEAFE", q: "price-sensitive" },
    { icon: Coins, label: "Dividends", count: 11, color: "var(--green-up)", bg: "var(--green-up-light)", q: "dividends" },
    { icon: Users, label: "AGM / EGM", count: 8, color: "#D97706", bg: "#FEF3C7", q: "agm-egm" },
    { icon: Landmark, label: "Regulatory", count: 2, color: "#DC2626", bg: "#FEE2E2", q: "regulatory" },
  ];
  return (
    <div style={{ width: 440 }}>
      <div className="grid grid-cols-2 gap-2">
        {types.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.label}
              to="/news"
              onClick={close}
              className="flex items-center gap-2.5 p-2.5 rounded-lg transition hover:bg-slate-50"
              style={{ border: "1px solid #E2E8F0" }}
            >

              <div
                className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
                style={{ background: t.bg, color: t.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-semibold truncate" style={{ color: "#0F172A" }}>{t.label}</div>
                <div className="text-[10px]" style={{ color: "#64748B" }}>
                  <span className="font-semibold" style={{ color: t.color }}>{t.count}</span> today
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-3 pt-3" style={{ borderTop: "1px solid #E2E8F0" }}>
        <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>
          Latest filing
        </div>
        <div className="text-[12px] font-bold mt-1" style={{ color: "#0F172A" }}>
          ACMELAB · ACME Laboratories
        </div>
        <div className="text-[12px] truncate" style={{ color: "#334155" }}>
          Transmission of shares following death of Managing Director
        </div>
        <div className="text-[10px] mt-0.5" style={{ color: "#94A3B8" }}>Jun 04 · 14:22</div>
        <Link to="/news" onClick={close} className="inline-block mt-2 mr-3 text-[12px] font-semibold" style={{ color: "#0F172A" }}>
          All disclosures →
        </Link>
        <Link to="/gallery" onClick={close} className="inline-block mt-2 text-[12px] font-semibold" style={{ color: "var(--brand-600)" }}>
          Gallery →
        </Link>
      </div>
    </div>
  );
}

function LearnPanel({ close }: { close: () => void }) {
  const col1: Item[] = [
    { title: "Getting started", desc: "Open a BO account, first trade", to: "/learn" },
    { title: "Investor glossary", desc: "80 terms A–Z", to: "/learn", hash: "glossary" },
    { title: "Investor rights", desc: "Protection fund, complaint routes", to: "/learn", hash: "rights" },
  ];
  const col2: Item[] = [
    { title: "Reading financials", desc: "Income statement, balance sheet", to: "/learn", hash: "financials" },
    { title: "How IPOs work", desc: "Prospectus to listing day", to: "/learn", hash: "ipo" },
    { title: "BICM courses", desc: "Professional certification", to: "/regulations", soon: true },
  ];
  return (
    <div style={{ width: 400 }} className="grid grid-cols-2 gap-5">
      <div>
        <ColHeader>Start here</ColHeader>
        {col1.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
      </div>
      <div>
        <ColHeader>Go deeper</ColHeader>
        {col2.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
      </div>
    </div>
  );
}

function AboutPanel({ close }: { close: () => void }) {
  const col1: Item[] = [
    { title: "About DSE", desc: "Hub of all About sections", to: "/about" },
    { title: "Board of directors", desc: "Independent & shareholder directors", to: "/about/board" },
    { title: "Press releases", desc: "Official DSE announcements", to: "/news" },
  ];
  const col2: Item[] = [
    { title: "List on DSE", desc: "Main board, SME, bonds", to: "/listing" },
    { title: "Regulations & Rulebook", desc: "Rules, circulars & PDFs", to: "/regulations" },
    { title: "Broker directory", desc: "TREC licensed members", to: "/members" },
  ];
  const col3: Item[] = [
    { title: "Foreign investors", desc: "Rules, tax & repatriation", to: "/foreign-investors" },
    { title: "Market reports", desc: "Daily, weekly, monthly PDFs", to: "/reports" },
    { title: "Complaints portal", desc: "Investor protection process", to: "/complaints" },
  ];
  return (
    <div style={{ width: 520 }} className="grid grid-cols-3 gap-5">
      <div>
        <ColHeader>The exchange</ColHeader>
        {col1.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
      </div>
      <div>
        <ColHeader>For companies</ColHeader>
        {col2.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
      </div>
      <div>
        <ColHeader>Resources</ColHeader>
        {col3.map((i) => <MenuLink key={i.title} item={i} onClick={close} />)}
      </div>
    </div>
  );
}

const megaPanels: Record<string, React.ComponentType<{ close: () => void }>> = {
  markets: ({ close }) => <MegaPanel content={megaContent.markets} close={close} />,
  companies: ({ close }) => <MegaPanel content={megaContent.companies} close={close} />,
  indices: ({ close }) => <MegaPanel content={megaContent.indices} close={close} />,
  ipo: ({ close }) => <MegaPanel content={megaContent.ipo} close={close} />,
  news: ({ close }) => <MegaPanel content={megaContent.news} close={close} />,
  learn: ({ close }) => <MegaPanel content={megaContent.learn} close={close} />,
  investors: ({ close }) => <MegaPanel content={megaContent.investors} close={close} />,
  about: ({ close }) => <MegaPanel content={megaContent.about} close={close} />,
};

/* ─────────────── main Nav ─────────────── */

export function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { lang, toggle, t } = useLang();

  const activeLabel = useMemo(() => {
    const match = links.find((l) =>
      l.activePaths?.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)))
    );
    return match?.label ?? null;
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const openWith = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const q = query.trim().toLowerCase();
  const results = q
    ? companyIndex
        .filter((c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q))
        .slice(0, 8)
    : companyIndex.slice(0, 6);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="sticky z-40 transition-all"
      style={{
        top: 66,
        background: "var(--surface)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-[1440px] mx-auto h-[56px] flex items-center px-6 gap-8 relative">
        <Link to="/" className="flex items-center gap-3 cursor-pointer group shrink-0">
          <img
            src={dseLogo}
            alt="Dhaka Stock Exchange seal"
            className="object-contain shrink-0 nav-logo-light"
            style={{ width: 38, height: 38 }}
          />
          <img
            src={dseLogoDark}
            alt=""
            aria-hidden="true"
            className="object-contain shrink-0 nav-logo-dark"
            style={{ width: 38, height: 38 }}
          />
          <div className="hidden md:block leading-tight">
            <div className="font-semibold text-[16px] tracking-tight" style={{ color: "var(--ink)" }}>
              {t("Dhaka Stock Exchange")}
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              Bangladesh's Premier Capital Market
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-2 relative">
          {links.map((l) => {
            const isActive = activeLabel === l.label;
            const inner = (
              <>
                {t(l.label)}
                {isActive && (
                  <motion.span
                    layoutId="navActive"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute left-3 right-3 -bottom-[20px] h-[3px]"
                    style={{ background: "var(--brand-600)" }}
                  />
                )}
              </>
            );
            const sharedClass = "relative px-3 py-2 text-[15px] font-medium transition flex items-center gap-1";
            const sharedStyle = { color: isActive ? "var(--brand-600)" : "var(--ink)" };
            return (
              <div
                key={l.label}
                onMouseEnter={() => l.mega && openWith(l.label)}
                onMouseLeave={() => l.mega && scheduleClose()}
                className="relative"
              >
                {l.href ? (
                  <a href={l.href} className={sharedClass} style={sharedStyle}>
                    {inner}
                  </a>
                ) : l.to ? (
                  <Link to={l.to} className={sharedClass} style={sharedStyle}>
                    {inner}
                  </Link>
                ) : (
                  <button className={sharedClass} style={sharedStyle}>{inner}</button>
                )}
              </div>
            );
          })}
        </nav>

        <style>{`
          .nav-logo-dark { display: none; }
          .dark .nav-logo-light { display: none; }
          .dark .nav-logo-dark { display: block; }
        `}</style>



        <div className="flex-1" />

        {/* Search combobox */}
        <div className="relative hidden md:block" ref={searchRef}>
          <div
            className="flex items-center gap-2.5 h-9 pl-3 pr-2 rounded-full text-[13px] transition"
            style={{
              background: searchOpen ? "rgb(var(--surface-rgb) / 0.9)" : "rgb(var(--ov) / 0.03)",
              border: `1px solid ${searchOpen ? "rgb(var(--brand-tint) / 0.4)" : "rgb(var(--ov) / 0.06)"}`,
              color: "var(--text-secondary)",
            }}
          >
            <Search className="w-3.5 h-3.5" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder={t("Search ticker or company…")}
              className="w-44 bg-transparent outline-none placeholder:opacity-60"
              style={{ color: "var(--text-primary)" }}
            />
            <kbd
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] tnum font-medium"
              style={{ background: "rgb(var(--ov) / 0.06)", color: "var(--text-secondary)" }}
            >
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </div>

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-full mt-2 w-[360px] rounded-xl overflow-hidden"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.96)",
                  backdropFilter: "blur(28px) saturate(180%)",
                  border: "1px solid rgb(var(--ov) / 0.08)",
                  boxShadow: "0 24px 60px -20px rgba(0,0,0,0.4)",
                }}
              >
                <div className="px-4 pt-3 pb-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
                  {q ? `${lang === "bn" ? "ফলাফল" : "Results"} · ${results.length}` : t("Trending")}
                </div>
                {results.length === 0 ? (
                  <div className="px-4 py-6 text-[13px] text-center" style={{ color: "var(--text-muted)" }}>
                    No companies match “{query}”
                  </div>
                ) : (
                  <ul className="max-h-[340px] overflow-auto">
                    {results.map((c) => (
                      <li key={c.code}>
                        <button
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery("");
                            navigate({ to: "/company/$ticker", params: { ticker: c.code } });
                          }}
                          className="w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition"
                          style={{ color: "var(--text-primary)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgb(var(--ov) / 0.04)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-semibold truncate">{c.code}</div>
                            <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{c.name}</div>
                          </div>
                          <div className="text-[13px] tnum" style={{ color: "var(--text-secondary)" }}>
                            ৳ {c.price.toLocaleString()}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div
                  className="px-4 py-2 text-[10px] flex justify-between"
                  style={{ color: "var(--text-muted)", borderTop: "1px solid rgb(var(--ov) / 0.06)" }}
                >
                  <span>{t("Esc to close")}</span>
                  <span>{t("↵ to open")}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={openCommandPalette}
          aria-label="Search (press / or Ctrl+K)"
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full transition"
          style={{ background: "rgb(var(--ov) / 0.04)", border: "1px solid rgb(var(--ov) / 0.06)", color: "var(--text-secondary)" }}
        >
          <Search className="w-4 h-4" />
        </button>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-1.5 h-9 px-4 text-[13px] font-semibold transition cursor-pointer"
          style={{
            background: "transparent",
            color: "var(--brand-600, var(--brand))",
            border: "1px solid var(--brand-600, var(--brand))",
            borderRadius: 2,
          }}
        >
          {t("Contact")}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg"
          style={{ color: "var(--text-primary)", background: "rgb(var(--ov) / 0.04)" }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Full-viewport-width mega panel (SCB style) */}
      <AnimatePresence>
        {openMenu && megaContent[links.find((l) => l.label === openMenu)?.mega ?? ""] && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="hidden lg:block absolute left-0 right-0 top-full z-50"
            style={{
              background: "var(--surface)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
              boxShadow: "0 18px 32px rgba(0,0,0,0.14)",
            }}
            onMouseEnter={() => openWith(openMenu)}
            onMouseLeave={scheduleClose}
          >
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>
              <MegaPanel
                content={megaContent[links.find((l) => l.label === openMenu)!.mega!]}
                close={() => setOpenMenu(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.4)" }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 flex flex-col"
              style={{
                width: "min(85vw, 320px)",
                background: "rgb(var(--surface-rgb) / 0.98)",
                backdropFilter: "blur(20px)",
                boxShadow: "-10px 0 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Header: logo + close */}
              <div
                className="flex items-center justify-between px-4"
                style={{ height: 64, borderBottom: "1px solid rgb(var(--ov) / 0.08)" }}
              >
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <img src={dseLogo} alt="DSE" className="w-8 h-8 object-contain" />
                  <span className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    DSE
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg"
                  style={{ color: "var(--text-primary)", background: "rgb(var(--ov) / 0.04)" }}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-3 py-3">
                {/* DSEX pill */}
                <div
                  className="flex items-center justify-between px-3 mb-3 rounded-lg"
                  style={{
                    background: "#0F172A",
                    color: "#fff",
                    height: 40,
                    fontSize: 12,
                  }}
                >
                  <span className="font-semibold tracking-wider">DSEX</span>
                  <span className="tnum">
                    6,241.30 <span style={{ color: "var(--green-up)" }}>▲ 0.30%</span>
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "rgb(var(--ov) / 0.08)" }} className="mb-2" />

                {/* Nav links */}
                {links.map((l) => {
                  const subs = mobileSubLinks[l.label];
                  if (l.href || !subs) {
                    return l.href ? (
                      <a
                        key={l.label}
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-3 rounded-lg"
                        style={{
                          height: 52,
                          fontSize: 16,
                          fontWeight: 500,
                          color: "var(--text-primary)",
                        }}
                      >
                        {t(l.label)}
                      </a>
                    ) : (
                      <Link
                        key={l.label}
                        to={l.to!}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-3 rounded-lg"
                        style={{
                          height: 52,
                          fontSize: 16,
                          fontWeight: 500,
                          color: "var(--text-primary)",
                        }}
                      >
                        {t(l.label)}
                      </Link>
                    );
                  }
                  return (
                    <MobileNavItem
                      key={l.label}
                      label={t(l.label)}
                      to={l.to!}
                      subs={subs}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  );
                })}

                {/* Divider */}
                <div style={{ height: 1, background: "rgb(var(--ov) / 0.08)" }} className="my-2" />

                {/* Dark mode row */}
                <div
                  className="flex items-center justify-between px-3 rounded-lg"
                  style={{ height: 52 }}
                >
                  <span
                    className="text-[15px] font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("Dark mode")}
                  </span>
                  <ThemeToggle />
                </div>

                {/* Language row */}
                <button
                  onClick={toggle}
                  className="w-full flex items-center justify-between px-3 rounded-lg text-left"
                  style={{ height: 52, color: "var(--text-primary)" }}
                >
                  <span className="text-[15px] font-medium">{t("Language")}</span>
                  <span className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
                    <span style={{ color: lang === "en" ? "var(--text-primary)" : undefined, fontWeight: lang === "en" ? 600 : 400 }}>EN</span>
                    <span className="opacity-40"> / </span>
                    <span className="bengali" style={{ color: lang === "bn" ? "var(--text-primary)" : undefined, fontWeight: lang === "bn" ? 600 : 400 }}>বাং</span>
                  </span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>,
        document.body
      )}
    </motion.header>
  );
}

const mobileSubLinks: Record<string, { label: string; to: string; hash?: string }[]> = {
  Markets: [
    { label: "Market overview", to: "/" },
    { label: "Equities", to: "/companies" },
    { label: "Reports", to: "/reports" },
    { label: "Holidays & Trading Sessions", to: "/holidays" },
  ],
  Companies: [
    { label: "All companies", to: "/companies" },
    { label: "Top gainers", to: "/companies" },
    { label: "Most active", to: "/companies" },
  ],
  Indices: [
    { label: "DSEX", to: "/indices" },
    { label: "DS30", to: "/indices" },
    { label: "DSES", to: "/indices" },
  ],
  IPO: [
    { label: "Open subscriptions", to: "/ipo" },
    { label: "Upcoming", to: "/ipo" },
    { label: "How to apply", to: "/ipo" },
  ],
  News: [
    { label: "All filings", to: "/news" },
    { label: "Price sensitive", to: "/news" },
    { label: "Dividends", to: "/news" },
  ],
  Learn: [
    { label: "Getting started", to: "/learn" },
    { label: "Glossary", to: "/learn" },
    { label: "How IPOs work", to: "/learn" },
  ],
  "About DSE": [
    { label: "Introduction to DSE", to: "/about/introduction" },
    { label: "About us", to: "/about" },
    { label: "DSE Presidents / Chairmen", to: "/about/chairmen" },
    { label: "Regulations & Rulebook", to: "/regulations" },
    { label: "Broker directory", to: "/members" },
    { label: "List on DSE", to: "/listing" },
    { label: "Major Events", to: "/about/major-events" },
    { label: "DSE-Mobile", to: "/dse-mobile" },
    { label: "New Automation System", to: "/about/automation" },
    { label: "Citizen Charter", to: "/citizen-charter" },
  ],
};

function MobileNavItem({
  label,
  to,
  subs,
  onNavigate,
}: {
  label: string;
  to: string;
  subs: { label: string; to: string; hash?: string }[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-stretch">
        <Link
          to={to}
          onClick={onNavigate}
          className="flex-1 flex items-center px-3 rounded-lg"
          style={{ height: 52, fontSize: 16, fontWeight: 500, color: "var(--text-primary)" }}
        >
          {label}
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="px-3 flex items-center"
          style={{ color: "var(--text-secondary)" }}
          aria-label={`Expand ${label}`}
          aria-expanded={open}
        >
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.18 }}>
            <ChevronRight className="w-4 h-4" />
          </motion.span>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="pb-2" style={{ paddingLeft: 24 }}>
              {subs.map((s) => (
                <Link
                  key={s.label}
                  to={s.to}
                  hash={s.hash}
                  onClick={onNavigate}
                  className="flex items-center"
                  style={{ minHeight: 44, fontSize: 14, color: "var(--text-secondary)" }}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


