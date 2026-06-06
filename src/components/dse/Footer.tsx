import { Facebook, Twitter, Linkedin, Youtube, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dseLogo from "@/assets/dse-logo.png";

type FooterLink = { label: string; to: string; hash?: string; soon?: boolean };

const marketsLinks: FooterLink[] = [
  { label: "Equities", to: "/companies" },
  { label: "Bonds", to: "/companies" },
  { label: "Mutual Funds", to: "/companies" },
  { label: "SME Board", to: "/companies" },
  { label: "Indices", to: "/indices" },
  { label: "Historical data", to: "/reports" },
];

const aboutLinks: FooterLink[] = [
  { label: "About us", to: "/about" },
  { label: "Board of directors", to: "/about", hash: "board" },
  { label: "Press releases", to: "/about", hash: "press" },
  { label: "Careers", to: "/about", hash: "careers", soon: true },
  { label: "Sustainability", to: "/about", hash: "sustainability", soon: true },
  { label: "Annual reports", to: "/reports" },
];

const servicesLinks: FooterLink[] = [
  { label: "Broker directory", to: "/members" },
  { label: "Listing requirements", to: "/listing" },
  { label: "BICM", to: "/about", hash: "bicm" },
  { label: "Investor education", to: "/learn" },
  { label: "Complaints portal", to: "/complaints", soon: true },
  { label: "Data API", to: "/about", hash: "api", soon: true },
];

const cols: { title: string; items: FooterLink[] }[] = [
  { title: "Markets", items: marketsLinks },
  { title: "About DSE", items: aboutLinks },
  { title: "Services", items: servicesLinks },
];

function FooterLinkItem({ item }: { item: FooterLink }) {
  return (
    <li>
      <Link
        to={item.to}
        hash={item.hash}
        className="transition hover:opacity-100 opacity-80 cursor-pointer inline-flex items-baseline gap-1.5"
      >
        <span>{item.label}</span>
        {item.soon && (
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            (coming soon)
          </span>
        )}
      </Link>
    </li>
  );
}

function FooterColumn({ col, defaultOpen }: { col: typeof cols[number]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="footer-col">
      {/* Desktop: always-visible heading + list */}
      <div className="hidden md:block">
        <div className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{col.title}</div>
        <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          {col.items.map((i) => <FooterLinkItem key={i.label} item={i} />)}
        </ul>
      </div>
      {/* Mobile: accordion */}
      <div className="md:hidden border-t" style={{ borderColor: "rgb(var(--ov) / 0.08)" }}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between py-4 text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
          aria-expanded={open}
        >
          <span>{col.title}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden space-y-2 text-sm pb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {col.items.map((i) => <FooterLinkItem key={i.label} item={i} />)}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: "rgb(var(--ov) / 0.04)",
        color: "var(--text-primary)",
        borderTop: "1px solid var(--border)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={dseLogo} alt="Dhaka Stock Exchange" className="w-12 h-12 object-contain bg-white rounded-lg p-1" />
            <div className="font-semibold">Dhaka Stock Exchange</div>
          </div>
          <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>Bangladesh's Premier Capital Market</p>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            DSE Tower, Plot 46, Road 21<br />Nikunja-2, Dhaka-1229<br />+880 2 5566 9100
          </p>
          <div className="flex gap-3 mt-4">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center transition"
                style={{ border: "1px solid rgb(var(--ov) / 0.15)", color: "var(--text-secondary)" }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c, idx) => (
          <FooterColumn key={c.title} col={c} defaultOpen={idx === 0} />
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgb(var(--ov) / 0.08)" }}>
        <div
          className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <div>© 2026 Dhaka Stock Exchange PLC. Regulated by Bangladesh Securities and Exchange Commission.</div>
          <div className="flex gap-4">
            <a className="cursor-pointer hover:opacity-100 opacity-80">Privacy policy</a>
            <a className="cursor-pointer hover:opacity-100 opacity-80">Terms</a>
            <a className="cursor-pointer hover:opacity-100 opacity-80">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
