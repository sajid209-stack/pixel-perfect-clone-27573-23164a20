import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Command, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import dseLogo from "@/assets/dse-logo.png.asset.json";

type LinkItem = { label: string; menu?: { title: string; desc: string }[] };

const links: LinkItem[] = [
  {
    label: "Markets",
    menu: [
      { title: "Overview", desc: "Today's snapshot of the exchange" },
      { title: "Equities", desc: "Listed company shares" },
      { title: "Bonds", desc: "Government & corporate debt" },
      { title: "Mutual Funds", desc: "Open & closed-end funds" },
      { title: "SME Board", desc: "Small & medium enterprises" },
    ],
  },
  {
    label: "Companies",
    menu: [
      { title: "All listings", desc: "Browse 352 listed companies" },
      { title: "Disclosures", desc: "Latest filings & announcements" },
      { title: "Financials", desc: "Reports, ratios & history" },
    ],
  },
  { label: "Indices" },
  {
    label: "IPO",
    menu: [
      { title: "Subscription open", desc: "Currently raising capital" },
      { title: "Upcoming", desc: "Approved & scheduled offerings" },
      { title: "How to apply", desc: "Eligibility & process guide" },
    ],
  },
  { label: "News" },
  { label: "Learn" },
  { label: "Members" },
];

export function Nav() {
  const [active, setActive] = useState("Markets");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      onMouseLeave={() => setOpenMenu(null)}
      className="sticky top-8 z-40 transition-all"
      style={{
        background: scrolled ? "rgb(var(--surface-rgb) / 0.75)" : "rgb(var(--surface-rgb) / 0.4)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgb(var(--ov) / 0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1440px] mx-auto h-[64px] flex items-center px-6 gap-8">
        {/* Logo */}
        <a className="flex items-center gap-2.5 cursor-pointer group shrink-0">
          <img
            src={dseLogo.url}
            alt="Dhaka Stock Exchange"
            className="w-9 h-9 object-contain transition group-hover:scale-105"
            style={{ filter: "drop-shadow(0 0 10px rgba(16,240,160,0.25))" }}
          />
          <div className="hidden md:block leading-tight">
            <div className="font-semibold text-[14px] tracking-tight" style={{ color: "var(--text-primary)" }}>
              Dhaka Stock Exchange
            </div>
          </div>
        </a>

        {/* Primary nav — animated underline */}
        <nav className="hidden lg:flex items-center gap-1 ml-2 relative">
          {links.map((l) => (
            <div
              key={l.label}
              onMouseEnter={() => l.menu && setOpenMenu(l.label)}
              className="relative"
            >
              <button
                onClick={() => setActive(l.label)}
                className="relative px-3 py-2 text-[13.5px] font-medium transition flex items-center gap-1"
                style={{ color: active === l.label ? "var(--text-primary)" : "var(--text-secondary)" }}
              >
                {l.label}
                {l.menu && <ChevronDown className="w-3 h-3 opacity-50" />}
                {active === l.label && (
                  <motion.span
                    layoutId="navActive"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute left-3 right-3 -bottom-[18px] h-[2px] rounded-full"
                    style={{ background: "var(--green-up)", boxShadow: "0 0 8px var(--green-up)" }}
                  />
                )}
              </button>
            </div>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Search trigger (command bar style) */}
        <button
          className="hidden md:flex items-center gap-2.5 h-9 pl-3 pr-2 rounded-full text-[13px] transition group"
          style={{
            background: "rgb(var(--ov) / 0.03)",
            border: "1px solid rgb(var(--ov) / 0.06)",
            color: "var(--text-muted)",
          }}
        >
          <Search className="w-3.5 h-3.5" />
          <span className="w-32 text-left">Search ticker…</span>
          <kbd
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] tnum font-medium"
            style={{
              background: "rgb(var(--ov) / 0.06)",
              color: "var(--text-secondary)",
            }}
          >
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>

        {/* CTA */}
        <a
          className="hidden md:inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-semibold transition cursor-pointer hover:scale-[1.02]"
          style={{
            background: "var(--green-up)",
            color: "#07090A",
            boxShadow: "0 6px 20px -6px rgba(16,240,160,0.55)",
          }}
        >
          Open account
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg"
          style={{ color: "var(--text-primary)", background: "rgb(var(--ov) / 0.04)" }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {openMenu && links.find((l) => l.label === openMenu)?.menu && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full"
            style={{
              background: "rgb(var(--surface-rgb) / 0.92)",
              backdropFilter: "blur(28px) saturate(180%)",
              borderBottom: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <div className="max-w-[1440px] mx-auto px-6 py-8 grid md:grid-cols-3 gap-2">
              {links.find((l) => l.label === openMenu)?.menu!.map((item) => (
                <a
                  key={item.title}
                  className="group block p-4 rounded-xl transition cursor-pointer"
                  style={{ border: "1px solid transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgb(var(--ov) / 0.03)";
                    e.currentTarget.style.borderColor = "rgb(var(--ov) / 0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition"
                      style={{ color: "var(--green-up)" }}
                    />
                  </div>
                  <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    {item.desc}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.label}
                  className="text-left px-3 py-3 text-[15px] font-medium rounded-lg"
                  style={{ color: "var(--text-primary)" }}
                  onClick={() => {
                    setActive(l.label);
                    setMobileOpen(false);
                  }}
                >
                  {l.label}
                </button>
              ))}
              <a
                className="mt-3 inline-flex items-center justify-center gap-1.5 h-11 rounded-full text-sm font-semibold"
                style={{ background: "var(--green-up)", color: "#07090A" }}
              >
                Open account <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
