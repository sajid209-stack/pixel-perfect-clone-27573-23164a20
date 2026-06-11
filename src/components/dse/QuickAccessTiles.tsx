import { Link } from "@tanstack/react-router";
import {
  LineChart,
  Building2,
  FileText,
  Rocket,
  FolderOpen,
  Globe,
} from "lucide-react";

const tiles = [
  { Icon: LineChart, label: "Markets", desc: "Live equities & indices", to: "/markets" },
  { Icon: Building2, label: "Companies", desc: "750+ listed", to: "/companies" },
  { Icon: FileText, label: "Disclosures", desc: "47 filed today", to: "/news" },
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
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {tiles.map((t, i) => (
            <Link
              key={t.label}
              to={t.to}
              className="flex items-center gap-2.5 px-3.5 py-4 transition hover:bg-[var(--surface-2)]"
              style={{
                borderLeft: i > 0 ? "1px solid var(--line)" : "none",
              }}
            >
              <t.Icon
                className="w-[18px] h-[18px] shrink-0"
                strokeWidth={1.6}
                style={{ color: "var(--brand-600, var(--brand))" }}
              />
              <div className="min-w-0">
                <div
                  className="text-[13.5px] font-semibold leading-tight"
                  style={{ color: "var(--ink)" }}
                >
                  {t.label}
                </div>
                <div
                  className="text-[11.5px] mt-0.5 leading-tight"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
