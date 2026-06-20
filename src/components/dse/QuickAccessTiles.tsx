import { Link } from "@tanstack/react-router";
import {
  LineChart,
  Building2,
  FileText,
  Rocket,
  FolderOpen,
  Globe,
  ChevronRight,
} from "lucide-react";

const tiles = [
  { Icon: LineChart, label: "Markets", desc: "Live equities & indices", to: "/markets" },
  { Icon: Building2, label: "Companies", desc: "Browse all listed companies", to: "/companies" },
  { Icon: FileText, label: "Disclosures", desc: "Today's filings", to: "/news" },
  { Icon: Rocket, label: "IPO Pipeline", desc: "Open & upcoming", to: "/ipo" },
  { Icon: FolderOpen, label: "Reports", desc: "Daily · weekly", to: "/reports" },
  { Icon: Globe, label: "Foreign Investment", desc: "NITA · repatriation", to: "/foreign-investors" },
] as const;

export function QuickAccessTiles() {
  return (
    <section
      className="w-full"
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-[1180px] mx-auto md:px-7">
        <div className="qa-rail grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {tiles.map((t, i) => (
            <Link
              key={t.label}
              to={t.to}
              className="qa-tile group flex items-center gap-2.5 px-3.5 py-4 transition tap44"
              style={{
                borderLeft: i > 0 ? "1px solid var(--line)" : "none",
              }}
            >
              <t.Icon
                className="w-[18px] h-[18px] shrink-0"
                strokeWidth={1.6}
                style={{ color: "var(--brand-600, var(--brand))" }}
              />
              <div className="min-w-0 flex-1">
                <div
                  className="qa-title text-[16px] font-semibold leading-tight"
                  style={{ color: "var(--ink)" }}
                >
                  {t.label}
                </div>
                <div
                  className="text-[12px] mt-0.5 leading-tight truncate"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t.desc}
                </div>
              </div>
              <ChevronRight
                className="qa-chev w-[14px] h-[14px] shrink-0 opacity-0 transition-opacity hidden md:inline-block"
                strokeWidth={1.8}
                style={{ color: "var(--brand-600, var(--brand))" }}
              />
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .qa-tile:hover { background: var(--surface-2); }
        .qa-tile:hover .qa-title { color: var(--brand-600); }
        .qa-tile:hover .qa-chev { opacity: 1; }
      `}</style>
    </section>
  );
}
