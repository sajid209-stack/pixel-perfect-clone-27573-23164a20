import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

const links = ["Markets", "Companies", "Indices", "IPO", "News", "Learn", "Members"];
const subNav = ["Overview", "Equities", "Bonds", "Mutual Funds", "SME Board"];

export function Nav() {
  const [active, setActive] = useState("Markets");
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="sticky top-9 z-40 bg-white border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="h-[60px] flex items-center px-6 gap-6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "var(--navy-mid)" }}
          >
            DSE
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-bold text-[15px]" style={{ color: "var(--navy-deep)" }}>
              Dhaka Stock Exchange
            </div>
            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>PLC</div>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => setActive(l)}
              className="relative px-3 py-1.5 text-sm rounded-lg transition"
              style={
                active === l
                  ? { background: "var(--navy-mid)", color: "#fff" }
                  : { color: "var(--text-secondary)" }
              }
            >
              {l}
            </button>
          ))}
        </nav>
        <div className="flex-1" />
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <input
            placeholder="Search company, ticker…"
            className="w-[220px] h-9 pl-9 pr-3 rounded-full border text-sm bg-white outline-none focus:border-[var(--navy-mid)]"
            style={{ borderColor: "var(--border)" }}
          />
        </div>
      </div>
      <div className="px-6 h-10 flex items-center gap-2 border-t" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {subNav.map((s, i) => (
          <button
            key={s}
            className="px-3 py-1 rounded-full text-xs transition"
            style={
              i === 0
                ? { background: "var(--sky-50)", color: "var(--navy-deep)", fontWeight: 600 }
                : { color: "var(--text-secondary)" }
            }
          >
            {s}
          </button>
        ))}
      </div>
    </motion.header>
  );
}
