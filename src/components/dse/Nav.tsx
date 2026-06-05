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
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import dseLogo from "@/assets/dse-logo.png";
import { ThemeToggle } from "./ThemeToggle";
import { companyIndex } from "./data";

type NavItem = {
  label: string;
  to?: string;
  href?: string;
  mega?: keyof typeof megaPanels;
  activePaths?: string[];
};

const links: NavItem[] = [
  { label: "Markets", to: "/", mega: "markets", activePaths: ["/"] },
  { label: "Companies", to: "/companies", mega: "companies", activePaths: ["/companies", "/company"] },
  { label: "Indices", to: "/indices", mega: "indices", activePaths: ["/indices"] },
  { label: "IPO", to: "/ipo", mega: "ipo", activePaths: ["/ipo"] },
  { label: "News", to: "/news", mega: "news", activePaths: ["/news"] },
  { label: "Learn", to: "/learn", mega: "learn", activePaths: ["/learn"] },
  { label: "About DSE", to: "/about", mega: "about", activePaths: ["/about", "/listing", "/reports", "/complaints", "/members"] },
  { label: "Contact", href: "#footer" },
];

/* ─────────────── shared dropdown atoms ─────────────── */

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
    { title: "Trading calendar", desc: "Sessions, holidays, market hours", to: "/reports", hash: "calendar" },
  ];
  const col2: Item[] = [
    { title: "Equities", desc: "All 356 listed companies", to: "/companies" },
    { title: "Bonds & sukuk", desc: "Corporate bonds, green bonds", to: "/companies", soon: true },
    { title: "Mutual funds", desc: "NAV table, fund directory", to: "/companies", soon: true },
    { title: "SME board", desc: "Small & medium enterprises", to: "/companies", soon: true },
  ];
  const col3: Item[] = [
    { title: "Circuit breaker list", desc: "Today's upper/lower limits", to: "/reports", soon: true },
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
          <span className="text-[12px] font-semibold" style={{ color: "#16A34A" }}>▲ 0.30%</span>
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
                  background: up ? "#DCFCE7" : "#FEE2E2",
                  color: up ? "#15803D" : "#B91C1C",
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
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#16A34A", boxShadow: "0 0 6px #16A34A" }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#16A34A" }}>Open</span>
        </div>
        <div className="text-[12px] font-medium mt-1.5" style={{ color: "#0F172A" }}>NRBC Bank PLC</div>
        <div className="text-[10px] mt-0.5" style={{ color: "#64748B" }}>৳ 30/share · Closes Jun 10</div>
        <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
          <div style={{ width: "73%", height: "100%", background: "#3B6D11" }} />
        </div>
        <div className="text-[10px] mt-1 font-semibold" style={{ color: "#16A34A" }}>73% subscribed</div>
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
    { icon: Coins, label: "Dividends", count: 11, color: "#16A34A", bg: "#DCFCE7", q: "dividends" },
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
        <Link to="/news" onClick={close} className="inline-block mt-2 text-[12px] font-semibold" style={{ color: "#0F172A" }}>
          All disclosures →
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
    { title: "BICM courses", desc: "Professional certification", to: "/about", hash: "bicm", soon: true },
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
    { title: "About DSE", desc: "History, Nasdaq technology", to: "/about" },
    { title: "Board of directors", desc: "Independent & shareholder directors", to: "/about", hash: "board" },
    { title: "Press releases", desc: "Official DSE announcements", to: "/about", hash: "press" },
  ];
  const col2: Item[] = [
    { title: "List on DSE", desc: "Main board, SME, bonds", to: "/listing" },
    { title: "Listing regulations", desc: "Full rulebook PDF downloads", to: "/listing", hash: "documents" },
    { title: "Broker directory", desc: "TREC licensed members", to: "/members" },
  ];
  const col3: Item[] = [
    { title: "Market reports", desc: "Daily, weekly, monthly PDFs", to: "/reports" },
    { title: "Sustainability & ESG", desc: "UN SSE signatory", to: "/about", hash: "sustainability" },
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

const megaPanels = {
  markets: MarketsPanel,
  companies: CompaniesPanel,
  indices: IndicesPanel,
  ipo: IpoPanel,
  news: NewsPanel,
  learn: LearnPanel,
  about: AboutPanel,
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
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
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
      className="sticky top-8 z-40 transition-all"
      style={{
        background: scrolled ? "rgb(var(--surface-rgb) / 0.75)" : "rgb(var(--surface-rgb) / 0.4)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgb(var(--ov) / 0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1440px] mx-auto h-[64px] flex items-center px-6 gap-8 relative">
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer group shrink-0">
          <img
            src={dseLogo}
            alt="Dhaka Stock Exchange"
            className="w-9 h-9 object-contain transition group-hover:scale-105"
            style={{ filter: "drop-shadow(0 0 10px rgba(16,240,160,0.25))" }}
          />
          <div className="hidden md:block leading-tight">
            <div className="font-semibold text-[14px] tracking-tight" style={{ color: "var(--text-primary)" }}>
              Dhaka Stock Exchange
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-2 relative">
          {links.map((l) => {
            const isActive = activeLabel === l.label;
            const inner = (
              <>
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="navActive"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute left-3 right-3 -bottom-[18px] h-[2px] rounded-full"
                    style={{ background: "var(--green-up)", boxShadow: "0 0 8px var(--green-up)" }}
                  />
                )}
              </>
            );
            const sharedClass = "relative px-3 py-2 text-[13.5px] font-medium transition flex items-center gap-1";
            const sharedStyle = { color: isActive ? "var(--text-primary)" : "var(--text-secondary)" };
            const Panel = l.mega ? megaPanels[l.mega] : null;
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
                <AnimatePresence>
                  {Panel && openMenu === l.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-1 z-50"
                    >
                      <div
                        style={{
                          background: "#FFFFFF",
                          border: "0.5px solid #E2E8F0",
                          borderRadius: 12,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                          padding: 20,
                          marginTop: 4,
                        }}
                      >
                        <Panel close={() => setOpenMenu(null)} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>


        <div className="flex-1" />

        {/* Search combobox */}
        <div className="relative hidden md:block" ref={searchRef}>
          <div
            className="flex items-center gap-2.5 h-9 pl-3 pr-2 rounded-full text-[13px] transition"
            style={{
              background: searchOpen ? "rgb(var(--surface-rgb) / 0.9)" : "rgb(var(--ov) / 0.03)",
              border: `1px solid ${searchOpen ? "rgba(127,217,176,0.4)" : "rgb(var(--ov) / 0.06)"}`,
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
              placeholder="Search ticker or company…"
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
                  {q ? `Results · ${results.length}` : "Trending"}
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
                  <span>Esc to close</span>
                  <span>↵ to open</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a
          href="#footer"
          className="hidden md:inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-semibold transition cursor-pointer hover:scale-[1.02]"
          style={{
            background: "var(--green-up)",
            color: "#07090A",
            boxShadow: "0 6px 20px -6px rgba(16,240,160,0.55)",
          }}
        >
          Contact
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg"
          style={{ color: "var(--text-primary)", background: "rgb(var(--ov) / 0.04)" }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>



      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: "rgb(var(--surface-rgb) / 0.95)", backdropFilter: "blur(20px)" }}
          >
            <div className="px-4 py-3 flex flex-col">
              {/* Live DSEX pill */}
              <div
                className="mb-3 flex items-center justify-between px-3 py-2 rounded-lg"
                style={{ background: "rgb(var(--ov) / 0.04)" }}
              >
                <span className="text-[12px] font-semibold tracking-wider" style={{ color: "var(--text-muted)" }}>
                  DSEX
                </span>
                <span className="text-[13px] tnum" style={{ color: "var(--text-primary)" }}>
                  6,241.30 <span style={{ color: "var(--green-up)" }}>▲ 0.30%</span>
                </span>
              </div>

              {links.map((l) => {
                const subs = mobileSubLinks[l.label];
                if (l.href || !subs) {
                  return l.href ? (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-3 text-[16px] font-medium rounded-lg"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.label}
                      to={l.to!}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-3 text-[16px] font-medium rounded-lg"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {l.label}
                    </Link>
                  );
                }
                return (
                  <MobileNavItem
                    key={l.label}
                    label={l.label}
                    to={l.to!}
                    subs={subs}
                    onNavigate={() => setMobileOpen(false)}
                  />
                );
              })}

              <div
                className="mt-3 flex items-center justify-between px-3 py-3 rounded-lg"
                style={{ background: "rgb(var(--ov) / 0.04)" }}
              >
                <span className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <a
                href="#footer"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-1.5 h-11 rounded-full text-sm font-semibold"
                style={{ background: "var(--green-up)", color: "#07090A" }}
              >
                Contact <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

const mobileSubLinks: Record<string, { label: string; to: string; hash?: string }[]> = {
  Markets: [
    { label: "Market overview", to: "/" },
    { label: "Equities screener", to: "/companies" },
    { label: "Market reports", to: "/reports" },
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
    { label: "Upcoming IPOs", to: "/ipo" },
    { label: "How to apply", to: "/ipo" },
  ],
  News: [
    { label: "All filings", to: "/news" },
    { label: "Price sensitive", to: "/news" },
    { label: "Dividends", to: "/news" },
  ],
  Learn: [
    { label: "Getting started", to: "/learn" },
    { label: "Investor glossary", to: "/learn" },
    { label: "How IPOs work", to: "/learn" },
  ],
  "About DSE": [
    { label: "About us", to: "/about" },
    { label: "Broker directory", to: "/members" },
    { label: "List on DSE", to: "/listing" },
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
          className="flex-1 px-3 py-3 text-[16px] font-medium rounded-lg"
          style={{ color: "var(--text-primary)" }}
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
            <div className="pl-6 pb-2">
              {subs.map((s) => (
                <Link
                  key={s.label}
                  to={s.to}
                  hash={s.hash}
                  onClick={onNavigate}
                  className="block py-2 text-[14px]"
                  style={{ color: "var(--text-secondary)" }}
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


